# Decisions

## 2026-06-11

- Initialized project memory for this project folder.
- Build as a DOM-only Chrome Manifest V3 extension. Rationale: user explicitly did not want API usage.
- Keep batch Save to playlist out of scope for the first migrated version. Rationale: reliable no-API batch save would depend on YouTube's changing dialog UI.
- Use YouTube's visible row menu for Remove selected. Rationale: avoids API/private requests while still performing the user's chosen visible action.
- Use visible progress-bar data for Watched first sorting. Rationale: supports better sorting without API access.
- Use transform-based visual sorting instead of changing YouTube's list container layout. Rationale: parent flex/order sorting broke infinite scroll after sorting/removal.
- Keep the project as plain JavaScript without package manager config for now. Rationale: current checks work with Node built-ins and no dependency install is needed.
- Keep generated logo variants based on generic video, watchlist, checkbox, progress, and remove symbols instead of official YouTube or Chrome marks. Rationale: make the extension distinguishable and reduce brand confusion.
- Use `progress-sort-ring.png` as the extension logo source. Rationale: it is the simplest generated variant at small Chrome icon sizes and represents watched-first sorting.
- Rename the public extension name from `YouTube Watchlist Manager` to `Watch Later Manager for YouTube(TM)`. Rationale: this uses compatibility wording for the YouTube trademark and names the actual Watch Later feature.
- Narrow manifest content-script matches from all YouTube pages to YouTube playlist pages. Rationale: the extension only needs playlist pages, then the content script's URL guard limits behavior to `list=WL`.
- Keep the upload ZIP at `dist/youtube-watchlist-manager.zip` but rebuild it from `manifest.json`, `src/`, and `icons/` only. Rationale: Chrome Web Store packages need `manifest.json` at the ZIP root and do not need tests or docs.
- Initialize a local git repository and commit the current publish-prep state. Rationale: this gives the project a clean baseline before Chrome Web Store submission.
