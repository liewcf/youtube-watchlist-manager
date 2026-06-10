# Watch Later Manager for YouTube

A small Chrome Manifest V3 extension for the YouTube Watch Later page.

## What it does

- Adds checkboxes to visible Watch Later videos.
- Adds Select all and Clear controls.
- Adds a Remove selected button.
- Adds a Watched first button that sorts loaded rows by watch progress.

## What it does not do

- It does not use the YouTube API.
- It does not make private YouTube network requests.
- It does not read or store account credentials.
- It does not permanently reorder the playlist.
- It does not batch Save to playlist in this version.

## Install for local testing

1. Open `chrome://extensions`.
2. Turn on Developer mode.
3. Click Load unpacked.
4. Choose this `youtube-watchlist-manager` folder.
5. Open `https://www.youtube.com/playlist?list=WL`.

## Package for Chrome Web Store

Run:

```sh
sh scripts/package-extension.sh
```

Upload `dist/youtube-watchlist-manager.zip`.

## Notes

Batch remove uses YouTube's visible row menu and clicks "Remove from Watch later". If YouTube changes the menu text or page structure, the action may stop and show a status message.

Watched first sorts only videos already loaded in the page. It reads YouTube's visible progress bar, places higher progress first, and puts rows with no visible progress at the bottom. If a row says `WATCHED` but has no visible progress bar, it is treated as fully watched.

The sort uses CSS visual order and does not move YouTube's internal DOM nodes. Scroll more videos into view before sorting if you want more rows included.

Version `0.1.3` avoids changing YouTube's list container layout. This keeps YouTube's normal infinite scroll loader available after sorting and removing selected rows.

YouTube is a trademark of Google LLC. This extension is not made by or endorsed by Google or YouTube.
