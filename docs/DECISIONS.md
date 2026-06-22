---
title: Decisions
description: Important project, product, technical, process, or content decisions with rationale and consequences.
doc_type: decision_log
status: active
created: 2026-06-17
updated: 2026-06-22
tags:
  - project-memory
  - decisions
  - rationale
audience:
  - agent
  - maintainer
related:
  - PROJECT_CONTEXT.md
  - TASKS.md
  - CHANGELOG_WORK.md
---

# Decisions

## 2026-06-22

- Landing-page SEO/a11y/perf pass: add `canonical`, `robots`, absolute `og:image`, `og:url` on `index.html`, plus `robots.txt` and `sitemap.xml`. Rationale: the public GitHub Pages site had relative OG images and no canonical/sitemap, so social previews and indexing were weak.
- Add a branded `404.html` with `noindex`. Rationale: GitHub Pages auto-serves `404.html`; a themed error page is better than the generic host 404.
- Serve logo and demo thumbnails as WebP via `<picture>` with PNG fallback, explicit `width`/`height`, and `decoding="async"`. Rationale: smaller payload for modern browsers, PNG fallback for older ones, and explicit dimensions prevent layout shift.
- Add a keyboard skip-to-main-content link, `:focus-visible` indicators, larger click-target checkboxes, and `prefers-reduced-motion` handling. Rationale: baseline accessibility for keyboard and motion-sensitive users.
- Use `aria-label="Primary"` (not `Primary navigation`) and `tabindex="-1"` on the `<main>` skip-link target. Rationale: including the role name in the label reads as "Primary navigation navigation"; a focusable skip target is needed so focus actually moves in Safari.
- Add `scroll-padding-top: 80px` on `html` and suppress the outline on `#main:focus`. Rationale: the sticky header overlapped in-page anchor targets; the skip target does not need a full-width outline box because content below exposes its own focus indicators.
- Keep demo thumbnails on `loading="lazy"`. Rationale: the LCP element is the `<h1>` text, not an image, and on mobile the demo panel sits below the fold, so lazy loading does not harm LCP.
- Add a mobile swipe cue below the demo panel instead of compressing demo rows on narrow screens. Rationale: the demo layout uses a fixed minimum width to stay readable; a cue tells visitors they can swipe horizontally without shrinking rows below a usable size.
- Use 40px minimum height on site demo controls and extension toolbar buttons. Rationale: 40px matches common touch-target guidance and keeps controls easy to tap on touch screens without changing labels or layout.

## 2026-06-17

- Make `Watched first` act as a toggle and change its active label to `Normal order`. Rationale: one button keeps the toolbar compact and makes reset behavior clear without adding another control.
- Keep top-level `docs/*.md` files trackable in git while leaving copied `docs/superpowers/` files ignored by default. Rationale: project memory, readiness, privacy, and migration docs are useful durable project context; copied Superpowers specs/plans are local historical support unless explicitly needed.
- Use a public GitHub repository and GitHub Pages site at `liewcf/youtube-watchlist-manager`. Rationale: Chrome Web Store needs a public privacy policy URL, and the repository already includes a static `site/` folder plus Pages workflow.

## 2026-06-11

- Initialized project memory for this project folder.
- Build as a DOM-only Chrome Manifest V3 extension. Rationale: user explicitly did not want API usage.
- Keep batch Save to playlist out of scope for the first migrated version. Rationale: reliable no-API batch save would depend on YouTube's changing dialog UI.
- Use YouTube's visible row menu for the Remove action. Rationale: avoids API/private requests while still performing the user's chosen visible action.
- Use visible progress-bar data for Watched first sorting. Rationale: supports better sorting without API access.
- Use transform-based visual sorting instead of changing YouTube's list container layout. Rationale: parent flex/order sorting broke infinite scroll after sorting/removal.
- Keep the project as plain JavaScript without package manager config for now. Rationale: current checks work with Node built-ins and no dependency install is needed.
- Keep generated logo variants based on generic video, watchlist, checkbox, progress, and remove symbols instead of official YouTube or Chrome marks. Rationale: make the extension distinguishable and reduce brand confusion.
- Use `progress-sort-ring.png` as the extension logo source. Rationale: it is the simplest generated variant at small Chrome icon sizes and represents watched-first sorting.
- Use `progress-sort-ring-transparent.png` as the final exported icon source. Rationale: it keeps the same mark while removing the outer app-tile background.
- Rename the public extension name from `YouTube Watchlist Manager` to `Watch Later Manager for YouTube(TM)`. Rationale: this uses compatibility wording for the YouTube trademark and names the actual Watch Later feature.
- Load the content script on YouTube pages while keeping the `list=WL` URL guard. Rationale: YouTube can navigate to Watch Later as a single-page app; playlist-only manifest matches require a refresh because the script is not present yet.
- Keep the upload ZIP at `dist/youtube-watchlist-manager.zip` but rebuild it from `manifest.json`, `src/`, and `icons/` only. Rationale: Chrome Web Store packages need `manifest.json` at the ZIP root and do not need tests or docs.
- Initialize a local git repository and commit the current publish-prep state. Rationale: this gives the project a clean baseline before Chrome Web Store submission.
- Use the selected Product Design mockup as the GitHub Pages landing page direction. Rationale: it explains the Watch Later pain point faster and makes the page feel closer to a Chrome Web Store product page.
- Use real Watch Later screenshot crops in the landing page demo. Rationale: the user asked to use the real screenshot, and real playlist thumbnails make the product preview more credible.
