---
title: Work Changelog
description: Dated notes on changed files, deliverables, tooling, checks, and verification.
doc_type: work_log
status: active
created: 2026-06-17
updated: 2026-06-22
tags:
  - project-memory
  - changelog
  - work-log
  - verification
audience:
  - agent
  - maintainer
related:
  - PROJECT_CONTEXT.md
  - DECISIONS.md
  - TASKS.md
---

# Work Changelog

## 2026-06-22

Interface polish pass (committed as `89079d8` and pushed):
- `site/styles.css`: added `-webkit-font-smoothing: antialiased` on `body`; `text-wrap: balance` on `h1`/`h2`; `text-wrap: pretty` on `p`; `:active` press feedback with `scale(0.96)` on `.header-cta`/`.button`/`.demo-small`/`.demo-danger`; raised demo control `min-height` to 40px; added transition on demo controls; added thumbnail `outline`; added hidden `.demo-swipe-cue` base rule and visible `display: flex` inside `@media (max-width: 680px)`; removed `min-height: 32px` from the `@media (max-width: 1100px)` demo-control override.
- `site/index.html`: added `<p class="demo-swipe-cue">` below the demo panel inside the hero section.
- `src/content.css`: raised `.ytwm-button` `min-height` to 40px; added `transition` and `:active` press feedback with `scale(0.96)`.
- `tests/dom-logic.test.js`: added source-contract test `interface polish keeps public and extension controls easy to use` covering all new style contracts.
- `dist/youtube-watchlist-manager.zip`: rebuilt with the updated `src/content.css`.
- Verified: `node tests/run-tests.js` passed with 14 tests, 0 failures. Manifest JSON parses. ZIP contains `src/content.css`.

Landing-page SEO, accessibility, and performance pass (uncommitted):
- `site/index.html`: added `og:url`, `canonical`, `robots`, absolute `og:image`/`twitter:image`; converted logo and demo thumbnails to `<picture>` with WebP + PNG fallback, explicit dimensions, `loading="lazy"`/`decoding="async"`; added skip-to-main link, `aria-label="Primary"`, `tabindex="-1"` on `<main>`.
- `site/privacy.html`: added `robots`, `og:*`, `canonical`; same `<picture>`/skip-link/`tabindex`/`aria-label` treatment.
- `site/404.html`: new branded 404 page with `noindex`, skip link, `<picture>` logo, `aria-label="Primary"`, `tabindex="-1"` on `<main>`.
- `site/robots.txt` and `site/sitemap.xml`: new, pointing at the GitHub Pages canonical URLs.
- `site/styles.css`: added skip-link styles, `:focus-visible` indicators, larger checkbox click target, `prefers-reduced-motion` handling, `scroll-padding-top: 80px` for the sticky header, and `#main:focus { outline: none }` for the skip-link target.
- `site/assets/logo.png`, `logo.webp`, `thumbs/thumb-{1..5}.webp`: new optimized image assets.
- `.gitignore`: added `.playwright-cli/`; removed empty `site/assets/thumbs-webp/` directory.
- Verified locally: all pages and referenced assets return HTTP 200 on a `0.0.0.0:8765` test server; new meta tags and a11y attributes confirmed in served HTML; no `Primary navigation` label remains.

Public release cleanup (committed as `cee9bdb`):
- Added MIT `LICENSE` file for public repo.
- Updated `.gitignore` to exclude internal dev files: `AGENTS.md`, `design-qa.md`, `dist/`, and internal `docs/*.md` (keeping only `docs/PRIVACY_POLICY.md`).
- Untracked from git: `AGENTS.md`, `design-qa.md`, `dist/youtube-watchlist-manager.zip`, `docs/CHANGELOG_WORK.md`, `docs/DECISIONS.md`, `docs/PROJECT_CONTEXT.md`, `docs/TASKS.md`, `docs/THREAD_MIGRATION_2026-06-11.md`, `docs/WEB_STORE_READINESS.md`.
- Committed and pushed as `cee9bdb` — "Clean up for public release".
- Verified tests pass (0 failures) and manifest JSON parses after cleanup.

## 2026-06-21

- Extension was published and is live on the Chrome Web Store: https://chromewebstore.google.com/detail/watch-later-manager-for-y/jleceiefdnhnjifpebbnlgjbmhijnmpn
- Set `chromeWebStoreUrl` in `site/script.js` to the live listing URL.
- Added Chrome Web Store install link to `README.md`.
- Updated `docs/WEB_STORE_READINESS.md` status to published with the live URL.
- Updated `design-qa.md` P3 follow-up note to mark the store URL as done.
- Updated `docs/TASKS.md` to mark the store URL task as complete.

## 2026-06-17

- Repaired `docs/TASKS.md` scanability by keeping active verification near the top and moving older setup, package, asset, and publishing checks into `Historical Verification Archive`.
- Ran the project-memory metadata repair checker; all four main memory docs were already valid and unchanged.
- Changed the `Watched first` toolbar action into a toggle that switches to `Normal order`, clears the visual sort on the second click, and exposes `aria-pressed` while active.
- Added active button styling for the watched-first mode.
- Added a helper regression test for the `Watched first` / `Normal order` label.
- Refreshed `dist/youtube-watchlist-manager.zip` after the toolbar toggle update.
- Verified `node tests/run-tests.js` and manifest JSON parsing after the toolbar toggle update.
- User manually confirmed the reloaded extension works with the `Watched first` / `Normal order` toggle on YouTube Watch Later.
- User manually confirmed `Remove` works on one disposable selected item and infinite scroll still works after removal.
- User filled the Chrome Web Store listing, privacy, and reviewer fields, then submitted the draft for review.
- Repaired project memory metadata by adding Project Memory Metadata v1 frontmatter to the four main memory files.
- Repaired `.gitignore` so top-level `docs/*.md` project memory and publish-readiness docs can be tracked while copied `docs/superpowers/` files stay ignored by default.
- Committed the project-memory repair as `e55854c`.
- Tried to proceed to GitHub publishing, but `gh auth status` reported the active `liewcf` token is invalid; the attempted web login was stopped after it hung before showing a device code.
- After GitHub CLI auth was restored, created the public GitHub repo at `https://github.com/liewcf/youtube-watchlist-manager` and pushed `main`.
- Enabled GitHub Pages in workflow mode, reran the Pages workflow, and confirmed deployment passed.
- Verified the public landing page and privacy policy returned HTTP 200 at `https://liewcf.github.io/youtube-watchlist-manager/` and `https://liewcf.github.io/youtube-watchlist-manager/privacy.html`.

## 2026-06-11

- Initialized project memory files.
- Added confirmed setup context: empty folder, not a git repository, and memory file roles.
- Added project agent instructions supplied for this folder to `AGENTS.md`.
- Migrated YouTube Watchlist Manager extension source from the Codex thread workspace.
- Added `manifest.json`, `README.md`, `src/content.js`, `src/content.css`, `tests/dom-logic.test.js`, and `tests/run-tests.js`.
- Added packaged extension zip at `dist/youtube-watchlist-manager.zip`.
- Copied Superpowers design and implementation plan into `docs/superpowers/`.
- Added `docs/THREAD_MIGRATION_2026-06-11.md` with source-thread summary, version, verification, and limits.
- Updated project context, decisions, tasks, and changelog for the migrated extension.
- Studied the migrated project files and refreshed memory with current local verification.
- Verified `node tests/run-tests.js`, manifest JSON parsing, and `dist/youtube-watchlist-manager.zip` listing.
- Added project-specific future-agent guidance to `AGENTS.md`.
- Generated three Chrome extension logo concept PNGs under `assets/logo-variants/`.
- Updated project memory docs to record the logo variants and the next step to export final Chrome icon sizes.
- Exported `progress-sort-ring.png` to Chrome icon sizes under `icons/`.
- Added the `icons` field to `manifest.json`.
- Refreshed `dist/youtube-watchlist-manager.zip` so the package includes the new icon files.
- Generated `assets/logo-variants/progress-sort-ring-transparent.png` with an alpha background.
- Re-exported the Chrome icon files from the transparent source and refreshed the package ZIP again.
- Audited the extension for Chrome Web Store readiness.
- Renamed the public extension name to `Watch Later Manager for YouTube(TM)`.
- Narrowed manifest content-script matches to YouTube playlist pages.
- Added `scripts/package-extension.sh` to rebuild the upload ZIP with `manifest.json` at the ZIP root.
- Added Chrome Web Store readiness notes at `docs/WEB_STORE_READINESS.md`.
- Added draft privacy policy text at `docs/PRIVACY_POLICY.md`.
- Added Chrome Web Store reviewer notes draft for the no-popup Watch Later flow.
- Created Chrome Web Store screenshot asset from the user's real Watch Later screenshot at `assets/store/screenshot-watch-later-toolbar.png`.
- Generated and resized a small promotional image at `assets/store/promo-small.png`.
- Rewrote the Chrome Web Store long description to better explain the Watch Later cleanup pain point, feature flow, and privacy-friendly behavior.
- Updated the Chrome Web Store short description and manifest description to use more benefit-led wording.
- Initialized a local git repository for the project.
- Added `.gitignore` to keep `.DS_Store` files out of commits.
- Updated `README.md` with clearer user benefits, feature behavior, privacy boundaries, local testing, package steps, and Chrome Web Store asset references.
- Added the extension logo and Store screenshot preview to `README.md`.
- Added a static GitHub Pages landing page under `site/`.
- Added `site/privacy.html` as the public privacy policy page.
- Added `.github/workflows/pages.yml` to deploy the `site/` folder with GitHub Actions.
- Updated `README.md` with the GitHub Pages site location and deployment note.
- Rebuilt the GitHub Pages landing page to match the selected Product Design reference mockup.
- Added an interactive Watch Later demo to the landing page using real screenshot thumbnails.
- Added `site/script.js` for demo selection, clear, select all, and remove interactions.
- Updated the public privacy page to share the landing page header, footer, icon system, and dark visual style.
- Added `design-qa.md` with Product Design QA result `passed`.
- Verified the landing page and privacy page in Browser at desktop, mockup-width, and mobile sizes.
- Prepared the landing page and privacy page install CTAs for the future Chrome Web Store listing URL through `chromeWebStoreUrl` in `site/script.js`.
- Removed the temporary local install instruction section from the public landing page.
- Changed install CTAs to stay pending when no Chrome Web Store URL has been added yet, instead of linking to removed local install instructions.
- Strengthened the public privacy policy page and markdown draft for Chrome Web Store review by disclosing local website-content handling, limited use, no transfer, retention, and permission scope.
- Updated Chrome Web Store readiness notes so dashboard privacy disclosures match the policy and actual content-script behavior.
- Updated the landing page benefits and workflow copy to explicitly mention sorting loaded videos so watched or higher-progress videos move to the top.
- Removed inaccurate landing page claims about filtering hidden/unavailable videos and aligned hero/demo/benefit copy with README features.
- Removed the cramped top control group from the landing page demo panel and kept the interactive demo actions in the bottom bar.
- Switched landing page and privacy page brand images to the actual extension icon used by the manifest and README.
- Added scroll-to-top behavior after clicking `Watched first` and covered it with a helper regression test.
- Refreshed `dist/youtube-watchlist-manager.zip` after the source change.
- Updated the footer Links privacy item to point to the on-page privacy section while keeping the full privacy policy link under Support.
- Renamed the footer Support privacy link from `Privacy details` to `Privacy Policy`.
- Added a footer Support `Contact` link to `https://liewcf.org`.
- Switched the public site header and footer brand images to the transparent progress-sort-ring logo asset.
- Added a manifest regression test for YouTube single-page navigation into Watch Later.
- Broadened content-script matches to YouTube pages while keeping the `list=WL` runtime guard.
- Bumped the manifest version to `0.1.4`.
- Refreshed `dist/youtube-watchlist-manager.zip` after the SPA navigation injection fix.
- Shortened the toolbar danger button label from `Remove selected` to `Remove`, keeping the selected count as separate status text.
- Added a helper regression test for the shorter Remove button copy and refreshed `dist/youtube-watchlist-manager.zip`.
- Removed the fixed selected-count status width so the toolbar no longer keeps extra blank space at the end.
- Added a helper regression test for the toolbar status spacing and refreshed `dist/youtube-watchlist-manager.zip`.
- Re-generated all extension and site logo/icon PNGs from `assets/logo-variants/progress-sort-ring-transparent.png` so the logo assets keep a transparent background.
