---
title: Performance Audit
description: Performance audit of the extension and the GitHub Pages site, with applied fixes and remaining notes.
doc_type: audit
status: active
created: 2026-09-22
updated: 2026-09-22
tags:
  - performance
  - audit
  - verification
audience:
  - agent
  - maintainer
related:
  - PROJECT_CONTEXT.md
  - DECISIONS.md
  - TASKS.md
  - CHANGELOG_WORK.md
---

# Performance Audit (2026-09-22)

Scope: content script (`src/content.js`, `src/content.css`), `manifest.json`, GitHub Pages site (`site/`), packaging.

Baseline: PageSpeed Insights mobile on the live site scored **95**, FCP 2.4 s, CLS 0, TBT 0 ms, 11 requests, 237 KB. The main flagged issue was render-blocking requests with an estimated 1,730 ms savings.

## Extension findings and fixes

1. **Unfiltered MutationObserver on every YouTube page (fixed).** The script matches all of `youtube.com` and observed `childList` changes on the whole document subtree. YouTube mutates constantly, so every mutation batch scheduled a rAF pass — even on non-Watch-Later pages, and even for the script's own toolbar text updates, which caused a rescan loop on the Watch Later page.
   Fix: the observer callback now returns immediately when the URL is not the Watch Later playlist, and only schedules a rescan when `isRelevantMutation()` finds a mutation that adds, removes, or touches a `ytd-playlist-video-renderer` row.

2. **Up to three full row scans per pass (fixed).** `enhancePage()` scanned rows once for enhancement, then `updateToolbarState()` scanned twice more (selected count + all-row count), each scan running `querySelectorAll` plus a per-row `querySelector`.
   Fix: one scan per pass; `updateToolbarState(rows)` accepts the rows and counts selection in a single loop. `selectAllRows`/`clearSelection`/sort reuse their row lists too.

3. **Sort read each row's progress state up to four times (fixed).** `sortWatchedRowsFirst()` called `readWatchProgressPercent()` directly and again through `hasWatchedProgress()`, each ending in a full `row.textContent` regex scan. The `hasWatchedProgress` fallback was dead logic: `readWatchProgressPercent()` returns `null` only when the watched-text check also fails.
   Fix: `watched: progressPercent !== null`; the redundant `hasWatchedProgress()` helper was removed.

4. **Menu polling left unchanged (accepted).** `waitForMenuItem()` polls the document every 100 ms for at most 2.5 s during an explicit Remove action. Bounded and user-triggered; scoping it to a menu container risks missing YouTube menu variants for little gain.

5. **Fixed 500 ms wait per removal left unchanged (accepted).** Batch removal speed is inherent to driving YouTube's visible menu without the API, which the project forbids.

## Site findings and fixes

1. **Render-blocking icon font from jsDelivr (fixed).** All three pages loaded `remixicon.css` and its `woff2` font in `<head>` for 12 icons; Lighthouse estimated 1,730 ms savings from removing render-blocking requests.
   Fix: replaced all `<i class="ri-*">` glyphs with inline SVG (`<symbol>` sprite + `<use>`), using the official Remix Icon 4.3.0 SVG sources. Removed the CDN stylesheet and `preconnect` from `index.html`, `privacy.html`, `404.html`, and dropped `https://cdn.jsdelivr.net` from each page CSP (`style-src`, `font-src`). Added a base rule for `svg[class^="ri-"]` in `styles.css` and switched the icon element selectors (`.button i`, `.trust-note i`, `.pain-grid i`, `.privacy-panel li i`, `.policy-list i`) to `svg`.

2. **~1.8 MB of unreferenced deployed images (fixed).** `site/assets/brand-mark.png` (644 KB), `site/assets/logo-variants/progress-sort-ring-transparent.png` (644 KB), and `site/assets/screenshot-watch-later-toolbar.png` (472 KB) were deployed to GitHub Pages but not referenced by any site file (the store/README copies live under root `assets/`, which is not deployed). Deleted from `site/assets/`.

3. **Unused CSS ~18 KB (mostly resolved).** Primarily the Remix Icon stylesheet, now gone.

4. **Cache lifetimes (accepted).** GitHub Pages default headers are not controllable; Lighthouse flagged ~48 KB of cacheable data.

## Not changed

- `script.js` stays a classic script at end of body (2.9 KB, local).
- Text uses the system font stack; no webfont text delay.
- Root `assets/` (6.4 MB) is repo-only; it is not deployed to Pages and not packaged into the extension ZIP.

## Verification

- `node tests/run-tests.js` passes (15 tests, including a new `isRelevantMutation` contract test).
Extension changes need manual browser testing per `AGENTS.md`: load unpacked, open `https://www.youtube.com/playlist?list=WL`, test select/sort/remove/infinite scroll, and confirm no toolbar appears on other YouTube pages.

## Results after fixes (2026-09-22, live site)

PageSpeed mobile re-run after the Pages deploy:

| Metric | Before | After |
|---|---|---|
| Performance score | 95 | **98** |
| FCP | 2.4 s | **0.8 s** |
| LCP | 2.4 s | **0.8 s** |
| TBT / CLS | 0 ms / 0 | 0 ms / 0 |
| Requests | 11 | 9 |
| Total bytes | 237 KB | 58 KB |
| Third-party requests | remixicon.css + woff2 | none |
| Render-blocking estimate | 1,730 ms | 420 ms (same-origin `styles.css`) |
