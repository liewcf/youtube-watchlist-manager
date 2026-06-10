const chromeWebStoreUrl = '';
const pendingStoreTitle = 'Chrome Web Store link will be added after publish';
const demoList = document.querySelector('[data-demo-list]');
const countTargets = Array.from(document.querySelectorAll('[data-demo-count]'));
const masterToggle = document.querySelector('[data-demo-master]');

function prepareStoreLinks() {
  const links = Array.from(document.querySelectorAll('[data-store-link]'));

  links.forEach((link) => {
    if (!chromeWebStoreUrl) {
      link.href = link.dataset.fallbackHref || '#';
      link.removeAttribute('target');
      link.removeAttribute('rel');
      link.setAttribute('aria-disabled', 'true');
      link.setAttribute('title', pendingStoreTitle);
      return;
    }

    link.href = chromeWebStoreUrl;
    link.target = '_blank';
    link.rel = 'noopener';
    link.removeAttribute('aria-disabled');
    link.removeAttribute('title');
  });
}

function getRows() {
  return Array.from(document.querySelectorAll('.demo-row'));
}

function updateDemoState() {
  const rows = getRows();
  const selectedRows = rows.filter((row) => row.querySelector('input')?.checked);

  rows.forEach((row) => {
    row.classList.toggle('is-selected', row.querySelector('input')?.checked);
  });

  countTargets.forEach((target) => {
    target.textContent = String(selectedRows.length);
  });

  if (masterToggle) {
    masterToggle.checked = rows.length > 0 && selectedRows.length === rows.length;
    masterToggle.indeterminate = selectedRows.length > 0 && selectedRows.length < rows.length;
  }
}

document.addEventListener('change', (event) => {
  if (event.target.matches('.demo-row input')) {
    updateDemoState();
  }

  if (event.target.matches('[data-demo-master]')) {
    getRows().forEach((row) => {
      row.querySelector('input').checked = event.target.checked;
    });
    updateDemoState();
  }
});

document.addEventListener('click', (event) => {
  const pendingStoreLink = event.target.closest('[data-store-link][aria-disabled="true"]');
  const selectButton = event.target.closest('[data-demo-select]');
  const clearButton = event.target.closest('[data-demo-clear]');
  const removeButton = event.target.closest('[data-demo-remove]');

  if (pendingStoreLink) {
    event.preventDefault();
    return;
  }

  if (selectButton) {
    getRows().forEach((row) => {
      row.querySelector('input').checked = true;
    });
    updateDemoState();
  }

  if (clearButton) {
    getRows().forEach((row) => {
      row.querySelector('input').checked = false;
    });
    updateDemoState();
  }

  if (removeButton && demoList) {
    const selectedRows = getRows().filter((row) => row.querySelector('input')?.checked);
    selectedRows.forEach((row) => row.remove());
    updateDemoState();
  }
});

prepareStoreLinks();
updateDemoState();
