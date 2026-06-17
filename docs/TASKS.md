---
title: Current Tasks
description: Current tasks, blockers, verification state, and recommended next actions.
doc_type: task_state
status: active
created: 2026-06-17
updated: 2026-06-17
tags:
  - project-memory
  - tasks
  - current-state
audience:
  - agent
  - maintainer
related:
  - PROJECT_CONTEXT.md
  - DECISIONS.md
  - CHANGELOG_WORK.md
---

# Tasks

## Recommended Next Action

- Re-authenticate GitHub CLI with `gh auth login -h github.com`, push the repository to GitHub, enable Pages with GitHub Actions, then use the public `site/privacy.html` URL in the Chrome Web Store listing.

## Current

- [ ] Confirm `Remove` on one disposable selected item and infinite scroll after removal if not already confirmed in manual retest.
- [ ] Publish the GitHub Pages site and add the public `site/privacy.html` URL in the Developer Dashboard.
- [ ] After Chrome Web Store publish, paste the listing URL into `chromeWebStoreUrl` in `site/script.js`.
- [ ] Use `docs/WEB_STORE_READINESS.md` to fill Store listing, privacy, and reviewer test instruction fields.

## Verification

- Confirmed the project folder was empty before setup.
- Confirmed the folder was not a git repository at setup time.
- Initialized a local git repository on 2026-06-11.
- Local `node tests/run-tests.js` passed on 2026-06-11: 8 tests, 8 pass, 0 fail.
- Local `node tests/run-tests.js` passed on 2026-06-11 after the SPA navigation injection fix: 10 tests, 10 pass, 0 fail.
- Local `node tests/run-tests.js` passed on 2026-06-11 after the Remove button copy update: 11 tests, 11 pass, 0 fail.
- Local `node tests/run-tests.js` passed on 2026-06-11 after the toolbar end-spacing update: 12 tests, 12 pass, 0 fail.
- Local manifest parse check passed on 2026-06-11.
- `dist/youtube-watchlist-manager.zip` listing was verified on 2026-06-11 and contains 9 files.
- Current manifest version is `0.1.4`.
- Generated logo variants were visually inspected and saved under `assets/logo-variants/` on 2026-06-11.
- `progress-sort-ring-transparent.png` was exported to `icons/icon-16.png`, `icons/icon-32.png`, `icons/icon-48.png`, and `icons/icon-128.png` on 2026-06-11.
- Chrome Web Store audit on 2026-06-11 found no runtime `fetch`, `chrome.*`, storage, cookies, tokens, eval, or private YouTube API strings.
- Manifest content-script matches were broadened to YouTube pages on 2026-06-11 so Watch Later SPA navigation works without refresh.
- `dist/youtube-watchlist-manager.zip` was rebuilt on 2026-06-11 with `manifest.json` at the ZIP root and only runtime files.
- Chrome Web Store listing, privacy, and reviewer notes drafts were added on 2026-06-11.
- User supplied a cleaner real Watch Later screenshot on 2026-06-11.
- Store screenshot `assets/store/screenshot-watch-later-toolbar.png` was created at `1280x800`.
- Store small promotional image `assets/store/promo-small.png` was generated and resized to `440x280`.
- GitHub Pages landing page and privacy page were rebuilt from the selected Product Design reference on 2026-06-11.
- Browser QA passed on 2026-06-11 for the landing page and privacy page at desktop, mockup-width, and mobile sizes.
- `design-qa.md` was added on 2026-06-11 with `final result: passed`.
- Install CTAs were prepared on 2026-06-11 to switch from local install fallback to the Chrome Web Store URL after publish.
- Temporary local install instructions were removed from the public landing page on 2026-06-11.
- Privacy policy content was reviewed against Chrome Web Store privacy guidance on 2026-06-11 and expanded to cover local website-content handling, limited use, transfer, retention, and permission scope.
- `dist/youtube-watchlist-manager.zip` was refreshed on 2026-06-11 after the SPA navigation injection fix.
- `dist/youtube-watchlist-manager.zip` was refreshed on 2026-06-11 after the Remove button copy update.
- `dist/youtube-watchlist-manager.zip` was refreshed on 2026-06-11 after the toolbar end-spacing update.
- Logo/icon PNGs were re-generated from `assets/logo-variants/progress-sort-ring-transparent.png` on 2026-06-11 and verified with alpha channels.
- Project memory metadata was repaired on 2026-06-17.
- Top-level `docs/*.md` files were made trackable in git on 2026-06-17 while `docs/superpowers/` remains ignored by default.
- Local project-memory repair was committed on 2026-06-17 as `e55854c`.
- `gh auth status` on 2026-06-17 reported the active `liewcf` GitHub token is invalid, blocking repo creation and push.

## Blockers

- GitHub CLI auth is invalid for `liewcf`; run `gh auth login -h github.com` before creating/pushing the GitHub repo.

## Done

- [x] Initialize project memory files.
- [x] Migrate extension source from Codex thread.
- [x] Migrate packaged extension zip.
- [x] Migrate Superpowers spec and plan.
- [x] Add thread migration summary.
- [x] Generate three logo variants for the extension.
- [x] Pick `progress-sort-ring.png`, export Chrome icon sizes, wire `manifest.json`, and refresh the package ZIP.
- [x] Generate a transparent-background `progress-sort-ring` variant and re-export the Chrome icon files from it.
- [x] Re-generate extension and site logo/icon assets from the transparent logo source.
- [x] Add Chrome Web Store readiness notes, privacy policy draft, and repeatable package script.
- [x] Load unpacked extension and retest visible Watch Later UI in Chrome.
- [x] Capture Chrome Web Store screenshot from the real Watch Later page.
- [x] Initialize local git repository.
- [x] Repair project memory metadata and docs tracking rules.
