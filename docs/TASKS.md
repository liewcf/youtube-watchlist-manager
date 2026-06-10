# Tasks

## Recommended Next Action

- Host `docs/PRIVACY_POLICY.md` at a public URL, then fill the Chrome Web Store listing from `docs/WEB_STORE_READINESS.md`.

## Current

- [ ] Confirm `Remove selected` on one disposable item and infinite scroll after removal if not already confirmed in manual retest.
- [ ] Host `docs/PRIVACY_POLICY.md` at a public URL and add it in the Developer Dashboard.
- [ ] Use `docs/WEB_STORE_READINESS.md` to fill Store listing, privacy, and reviewer test instruction fields.

## Verification

- Confirmed the project folder was empty before setup.
- Confirmed the folder was not a git repository at setup time.
- Initialized a local git repository on 2026-06-11.
- Local `node tests/run-tests.js` passed on 2026-06-11: 8 tests, 8 pass, 0 fail.
- Local manifest parse check passed on 2026-06-11.
- `dist/youtube-watchlist-manager.zip` listing was verified on 2026-06-11 and contains 9 files.
- Current manifest version is `0.1.3`.
- Generated logo variants were visually inspected and saved under `assets/logo-variants/` on 2026-06-11.
- `progress-sort-ring.png` was exported to `icons/icon-16.png`, `icons/icon-32.png`, `icons/icon-48.png`, and `icons/icon-128.png` on 2026-06-11.
- Chrome Web Store audit on 2026-06-11 found no runtime `fetch`, `chrome.*`, storage, cookies, tokens, eval, or private YouTube API strings.
- Manifest content-script matches were narrowed to YouTube playlist pages on 2026-06-11.
- `dist/youtube-watchlist-manager.zip` was rebuilt on 2026-06-11 with `manifest.json` at the ZIP root and only runtime files.
- Chrome Web Store listing, privacy, and reviewer notes drafts were added on 2026-06-11.
- User supplied a cleaner real Watch Later screenshot on 2026-06-11.
- Store screenshot `assets/store/screenshot-watch-later-toolbar.png` was created at `1280x800`.
- Store small promotional image `assets/store/promo-small.png` was generated and resized to `440x280`.

## Blockers

- None recorded.

## Done

- [x] Initialize project memory files.
- [x] Migrate extension source from Codex thread.
- [x] Migrate packaged extension zip.
- [x] Migrate Superpowers spec and plan.
- [x] Add thread migration summary.
- [x] Generate three logo variants for the extension.
- [x] Pick `progress-sort-ring.png`, export Chrome icon sizes, wire `manifest.json`, and refresh the package ZIP.
- [x] Add Chrome Web Store readiness notes, privacy policy draft, and repeatable package script.
- [x] Load unpacked extension and retest visible Watch Later UI in Chrome.
- [x] Capture Chrome Web Store screenshot from the real Watch Later page.
- [x] Initialize local git repository.
