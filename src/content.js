(function attachYouTubeWatchlistManager(globalObject) {
  'use strict';

  const TOOLBAR_ID = 'ytwm-toolbar';
  const CHECKBOX_CLASS = 'ytwm-checkbox';
  const ROW_CLASS = 'ytwm-row';
  const SORTED_ROW_CLASS = 'ytwm-sorted-row';
  const MANAGED_ATTR = 'data-ytwm-managed';
  const VIDEO_ROW_SELECTOR = 'ytd-playlist-video-renderer';
  const MENU_TEXT_REMOVE = 'Remove from Watch later';

  function isWatchLaterUrl(urlValue) {
    try {
      const url = new URL(urlValue);
      const host = url.hostname.replace(/^www\./, '');

      return host === 'youtube.com' && url.pathname === '/playlist' && url.searchParams.get('list') === 'WL';
    } catch (_error) {
      return false;
    }
  }

  function buildWatchedSortGroups(rows) {
    return rows
      .map((row, index) => ({
        row,
        index,
        progress: getSortableProgress(row)
      }))
      .sort((left, right) => {
        if (right.progress !== left.progress) {
          return right.progress - left.progress;
        }

        return left.index - right.index;
      })
      .map((item) => item.row);
  }

  function getSortableProgress(row) {
    if (typeof row.progressPercent === 'number' && Number.isFinite(row.progressPercent)) {
      return Math.max(0, Math.min(100, row.progressPercent));
    }

    return row.watched ? 100 : -1;
  }

  function parseProgressPercent(styleValue) {
    const match = String(styleValue || '').match(/width:\s*(\d+(?:\.\d+)?)%/i);
    if (!match) {
      return null;
    }

    const percent = Number(match[1]);
    if (!Number.isFinite(percent)) {
      return null;
    }

    return Math.max(0, Math.min(100, percent));
  }

  function buildWatchedVisualOrderPlan(rows) {
    const sortedRows = buildWatchedSortGroups(rows);
    const orderByRow = new Map(sortedRows.map((row, index) => [row, index]));

    return rows.map((row) => ({
      row,
      order: orderByRow.get(row)
    }));
  }

  function buildTransformSortPlan(rows) {
    const sortedRows = buildWatchedSortGroups(rows);
    let nextTop = rows.length > 0 ? Math.min(...rows.map((row) => row.top)) : 0;
    const targetTopByRow = new Map();

    sortedRows.forEach((row) => {
      targetTopByRow.set(row, nextTop);
      nextTop += row.height;
    });

    return rows.map((row) => ({
      row,
      translateY: Math.round((targetTopByRow.get(row) ?? row.top) - row.top)
    }));
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      isWatchLaterUrl,
      buildWatchedSortGroups,
      buildWatchedVisualOrderPlan,
      buildTransformSortPlan,
      parseProgressPercent
    };
  }

  if (!globalObject || !globalObject.document) {
    return;
  }

  const { document, MutationObserver } = globalObject;
  let scheduled = false;
  let busy = false;

  function getCurrentRows() {
    return Array.from(document.querySelectorAll(VIDEO_ROW_SELECTOR))
      .filter((row) => row.isConnected)
      .filter((row) => row.querySelector('a[href*="/watch?"]'));
  }

  function getSelectedRows() {
    return getCurrentRows().filter((row) => {
      const checkbox = row.querySelector(`.${CHECKBOX_CLASS}`);
      return checkbox && checkbox.checked;
    });
  }

  function getVideoTitle(row) {
    const titleLink = row.querySelector('#video-title, a#video-title, a[href*="/watch?"]');
    const title = titleLink?.textContent?.trim();

    return title || 'video';
  }

  function hasWatchedProgress(row) {
    return readWatchProgressPercent(row) !== null || hasWatchedText(row);
  }

  function hasWatchedText(row) {
    const text = row.textContent || '';
    return /\bwatched\b/i.test(text);
  }

  function readWatchProgressPercent(row) {
    const progressSelectors = [
      '.ytThumbnailOverlayProgressBarHostWatchedProgressBarSegment',
      'ytd-thumbnail-overlay-resume-playback-renderer #progress',
      '#progress'
    ];

    for (const selector of progressSelectors) {
      const progressElement = row.querySelector(selector);
      if (!progressElement) continue;

      const inlinePercent = parseProgressPercent(progressElement.getAttribute('style'));
      if (inlinePercent !== null) {
        return inlinePercent;
      }

      const parentWidth = progressElement.parentElement?.getBoundingClientRect().width || 0;
      const progressWidth = progressElement.getBoundingClientRect().width || 0;
      if (parentWidth > 0 && progressWidth > 0) {
        return Math.max(0, Math.min(100, (progressWidth / parentWidth) * 100));
      }
    }

    return hasWatchedText(row) ? 100 : null;
  }

  function setStatus(message) {
    const status = document.querySelector('#ytwm-status');

    if (status) {
      status.textContent = message;
    }
  }

  function updateToolbarState() {
    const toolbar = document.getElementById(TOOLBAR_ID);
    if (!toolbar) return;

    const selectedCount = getSelectedRows().length;
    const allRows = getCurrentRows();
    const countText = selectedCount === 1 ? '1 selected' : `${selectedCount} selected`;

    toolbar.querySelector('[data-ytwm-action="clear"]').disabled = selectedCount === 0 || busy;
    toolbar.querySelector('[data-ytwm-action="remove"]').disabled = selectedCount === 0 || busy;
    toolbar.querySelector('[data-ytwm-action="select-all"]').disabled = allRows.length === 0 || busy;
    toolbar.querySelector('[data-ytwm-action="sort-watched"]').disabled = allRows.length === 0 || busy;
    setStatus(busy ? 'Working...' : countText);
  }

  function createButton(label, action, extraClass) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = extraClass ? `ytwm-button ${extraClass}` : 'ytwm-button';
    button.dataset.ytwmAction = action;
    button.textContent = label;

    return button;
  }

  function ensureToolbar() {
    let toolbar = document.getElementById(TOOLBAR_ID);
    if (toolbar) return toolbar;

    toolbar = document.createElement('div');
    toolbar.id = TOOLBAR_ID;

    const selectAll = createButton('Select all', 'select-all');
    const clear = createButton('Clear', 'clear');
    const sortWatched = createButton('Watched first', 'sort-watched');
    const remove = createButton('Remove selected', 'remove', 'ytwm-button-danger');
    const status = document.createElement('span');
    status.id = 'ytwm-status';
    status.className = 'ytwm-status';
    status.textContent = '0 selected';

    toolbar.append(selectAll, clear, sortWatched, remove, status);
    document.documentElement.append(toolbar);

    selectAll.addEventListener('click', selectAllRows);
    clear.addEventListener('click', clearSelection);
    sortWatched.addEventListener('click', sortWatchedRowsFirst);
    remove.addEventListener('click', removeSelectedRows);

    return toolbar;
  }

  function enhanceRow(row) {
    if (row.hasAttribute(MANAGED_ATTR)) {
      return;
    }

    row.setAttribute(MANAGED_ATTR, 'true');
    row.classList.add(ROW_CLASS);

    const picker = document.createElement('label');
    picker.className = 'ytwm-picker';
    picker.title = `Select ${getVideoTitle(row)}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = CHECKBOX_CLASS;
    checkbox.setAttribute('aria-label', picker.title);
    checkbox.addEventListener('change', updateToolbarState);

    picker.append(checkbox);
    row.prepend(picker);
  }

  function enhancePage() {
    if (!isWatchLaterUrl(globalObject.location.href)) {
      document.getElementById(TOOLBAR_ID)?.remove();
      return;
    }

    ensureToolbar();
    getCurrentRows().forEach(enhanceRow);
    updateToolbarState();
  }

  function scheduleEnhance() {
    if (scheduled) return;

    scheduled = true;
    globalObject.requestAnimationFrame(() => {
      scheduled = false;
      enhancePage();
    });
  }

  function selectAllRows() {
    getCurrentRows().forEach((row) => {
      const checkbox = row.querySelector(`.${CHECKBOX_CLASS}`);
      if (checkbox) checkbox.checked = true;
    });
    updateToolbarState();
  }

  function clearSelection() {
    getCurrentRows().forEach((row) => {
      const checkbox = row.querySelector(`.${CHECKBOX_CLASS}`);
      if (checkbox) checkbox.checked = false;
    });
    updateToolbarState();
  }

  function sortWatchedRowsFirst() {
    clearVisualSort();

    const rows = getCurrentRows().map((element) => {
      const progressPercent = readWatchProgressPercent(element);
      const rect = element.getBoundingClientRect();

      return {
        element,
        top: rect.top,
        height: rect.height,
        progressPercent,
        watched: progressPercent !== null || hasWatchedProgress(element)
      };
    });
    const watchedCount = rows.filter((row) => row.watched).length;
    const progressCount = rows.filter((row) => row.progressPercent !== null).length;
    const rowsByParent = new Map();

    rows.forEach((row) => {
      const parent = row.element.parentElement;
      if (!parent) return;

      if (!rowsByParent.has(parent)) {
        rowsByParent.set(parent, []);
      }
      rowsByParent.get(parent).push(row);
    });

    rowsByParent.forEach((parentRows, parent) => {
      const transformPlan = buildTransformSortPlan(parentRows);

      transformPlan.forEach(({ row, translateY }, index) => {
        row.element.classList.add(SORTED_ROW_CLASS);
        row.element.style.transform = translateY === 0 ? '' : `translateY(${translateY}px)`;
        row.element.style.zIndex = String(parentRows.length - index);
      });
    });

    setStatus(`${progressCount || watchedCount} rows sorted by progress`);
    updateToolbarState();
  }

  function clearVisualSort() {
    getCurrentRows().forEach((row) => {
      row.classList.remove(SORTED_ROW_CLASS);
      row.style.transform = '';
      row.style.zIndex = '';
    });
  }

  function findMenuButton(row) {
    const candidates = [
      'button[aria-label*="Action menu"]',
      'button[aria-label*="More actions"]',
      'button[aria-label*="More"]',
      'ytd-menu-renderer button',
      '#button button'
    ];

    for (const selector of candidates) {
      const button = row.querySelector(selector);
      if (button) return button;
    }

    return null;
  }

  function findVisibleMenuItem(labelText) {
    const items = Array.from(document.querySelectorAll('ytd-menu-service-item-renderer, tp-yt-paper-item, [role="menuitem"]'));

    return items.find((item) => {
      const text = item.textContent?.replace(/\s+/g, ' ').trim() || '';
      const rect = item.getBoundingClientRect();
      return text.includes(labelText) && rect.width > 0 && rect.height > 0;
    }) || null;
  }

  function wait(ms) {
    return new Promise((resolve) => {
      globalObject.setTimeout(resolve, ms);
    });
  }

  async function waitForMenuItem(labelText) {
    const startedAt = Date.now();

    while (Date.now() - startedAt < 2500) {
      const item = findVisibleMenuItem(labelText);
      if (item) return item;
      await wait(100);
    }

    return null;
  }

  async function removeOneRow(row) {
    const menuButton = findMenuButton(row);
    if (!menuButton) {
      throw new Error(`No menu button found for ${getVideoTitle(row)}`);
    }

    row.scrollIntoView({ block: 'center' });
    menuButton.click();

    const removeItem = await waitForMenuItem(MENU_TEXT_REMOVE);
    if (!removeItem) {
      throw new Error(`Remove action not found for ${getVideoTitle(row)}`);
    }

    removeItem.click();
    await wait(500);
  }

  async function removeSelectedRows() {
    if (busy) return;

    const rows = getSelectedRows();
    if (rows.length === 0) return;

    clearVisualSort();
    busy = true;
    updateToolbarState();

    try {
      for (let index = 0; index < rows.length; index += 1) {
        const row = rows[index];
        if (!row.isConnected) continue;

        setStatus(`Removing ${index + 1} of ${rows.length}`);
        await removeOneRow(row);
      }

      setStatus('Remove complete');
    } catch (error) {
      setStatus(error.message || 'Remove stopped');
    } finally {
      busy = false;
      scheduleEnhance();
      updateToolbarState();
    }
  }

  function start() {
    enhancePage();

    const observer = new MutationObserver(scheduleEnhance);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });

    document.addEventListener('yt-navigate-finish', scheduleEnhance);
    globalObject.addEventListener('popstate', scheduleEnhance);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
