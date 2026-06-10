# YouTube Watchlist Manager Design

## Goal

Create a Chrome Manifest V3 extension that improves the YouTube Watch Later page without using any YouTube API.

## Approved Scope

- Add checkboxes to visible Watch Later videos.
- Add toolbar actions for Select all, Clear, Sort watched first, and Remove selected.
- Keep Save to playlist manual for this first version.
- Run only on `youtube.com/playlist?list=WL`.

## Architecture

The extension uses one content script injected on YouTube playlist pages. The script detects Watch Later video rows, adds selection checkboxes, and keeps a small floating toolbar visible on the page. It stores no YouTube data and does not call external services.

Batch remove uses YouTube's own visible row menu. For each selected video, the script opens the row action menu, clicks "Remove from Watch later", waits briefly, then moves to the next selected row. If YouTube changes the menu or a row cannot be removed, the script stops and shows a status message.

Sort watched first is a visual page reorder only. The script looks for watched progress markers in visible video rows and moves watched rows above unwatched rows in the current loaded DOM. It does not permanently reorder the YouTube playlist.

## Components

- `manifest.json`: MV3 extension config, permissions, and content script target.
- `src/content.js`: DOM detection, selection state, toolbar behavior, batch remove, and sorting.
- `src/content.css`: checkbox and toolbar styles.
- `tests/dom-logic.test.js`: small Node test for pure helper logic.
- `tests/run-tests.js`: test runner using Node's built-in test module.

## Constraints

- No YouTube API.
- No private YouTube request calls.
- No account tokens or credentials.
- No network calls from the extension.
- Keep behavior conservative when selectors fail.

## Verification

- Run the Node tests.
- Validate `manifest.json` parses as JSON.
- Inspect package file list.
- Manual install step is still needed in Chrome because loading unpacked extensions needs browser UI access.
