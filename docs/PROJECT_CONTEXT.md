# Project Context

## Overview

- Project purpose: Chrome extension to manage YouTube Watch Later from the visible page, without using the YouTube API.
- Primary users: The extension owner testing and managing their own YouTube Watch Later list in Chrome.
- Current status: Migrated extension source, tests, docs, packaged zip, and Chrome Web Store assets are present. The extension was renamed to `Watch Later Manager for YouTube(TM)` for Chrome Web Store trademark clarity. A local git repository was initialized on 2026-06-11. Local Node tests, manifest parse, package integrity, package root layout, and icon dimensions were verified on 2026-06-11.

## Project Structure

- `AGENTS.md`: agent instructions and project memory requirement.
- `manifest.json`: Chrome Manifest V3 config.
- `README.md`: local install notes and feature summary.
- `src/content.js`: YouTube Watch Later content script.
- `src/content.css`: toolbar, checkbox, and visual-sort styles.
- `assets/logo-variants/`: generated logo concept PNGs.
- `assets/store/`: Chrome Web Store screenshot and small promotional image assets.
- `icons/`: Chrome extension icons exported from `assets/logo-variants/progress-sort-ring.png`.
- `tests/dom-logic.test.js`: Node tests for pure helper behavior.
- `tests/run-tests.js`: Node test runner.
- `scripts/package-extension.sh`: rebuilds the Chrome Web Store zip with `manifest.json` at the ZIP root.
- `dist/youtube-watchlist-manager.zip`: packaged extension zip for upload.
- `docs/WEB_STORE_READINESS.md`: Chrome Web Store readiness notes, listing draft, privacy answers, and manual test checklist.
- `docs/PRIVACY_POLICY.md`: draft privacy policy text to host before submission.
- `docs/THREAD_MIGRATION_2026-06-11.md`: migration summary from the original Codex thread.
- `docs/PROJECT_CONTEXT.md`: stable project facts and constraints.
- `docs/DECISIONS.md`: dated decisions and rationale.
- `docs/TASKS.md`: current tasks, blockers, verification state, and next actions.
- `docs/CHANGELOG_WORK.md`: dated work notes.
- `docs/superpowers/specs/`: copied design spec from the original thread.
- `docs/superpowers/plans/`: copied implementation plan from the original thread.

## Key Workflows

- Important command: `node tests/run-tests.js`.
- Manifest check: `node -e "JSON.parse(require('node:fs').readFileSync('manifest.json','utf8')); console.log('manifest ok')"`.
- Package command: `sh scripts/package-extension.sh`.
- Package check: `unzip -l dist/youtube-watchlist-manager.zip`.
- Manual test: load unpacked extension in Chrome, open `https://www.youtube.com/playlist?list=WL`, then test selection, progress sorting, removal, and infinite scroll.
- Store assets: use `assets/store/screenshot-watch-later-toolbar.png` for the screenshot field and `assets/store/promo-small.png` for the small promotional image field.
- Acceptance criteria: no YouTube API/private requests, no credentials, batch remove works through visible YouTube menu, progress sorting does not break infinite scroll.

## Constraints

- This folder was not a git repository at setup time. It became a local git repository on 2026-06-11.
- Do not use YouTube API or private YouTube request calls.
- Do not store account tokens, credentials, cookies, or sensitive browser data.
- The extension only works on Watch Later rows that YouTube has loaded into the page.
- Keep changes small and test pure helper logic with Node.
