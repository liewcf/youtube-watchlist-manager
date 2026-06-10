# Chrome Web Store Readiness

## Current Status

The source, package, and listing assets are close to publish-ready. Before submitting, confirm `Remove selected` on one disposable item and infinite scroll after removal if that was not already covered in manual retest.

## Package

- Upload `dist/youtube-watchlist-manager.zip`.
- The package should contain `manifest.json`, `src/`, and `icons/` at the ZIP root.
- Rebuild it with `sh scripts/package-extension.sh` after every source or manifest change.

## Store Assets

- Screenshot: `assets/store/screenshot-watch-later-toolbar.png` (`1280x800`).
- Small promotional image: `assets/store/promo-small.png` (`440x280`).
- Source files are kept beside the final assets for future recrops.

## Name

Recommended public name: `Watch Later Manager for YouTube(TM)`.

Reason: the old name, `YouTube Watchlist Manager`, started with the YouTube trademark and used `Watchlist`, while the feature is for YouTube's Watch Later playlist. The new name uses compatibility wording and is clearer.

Manifest uses `YouTube\u2122`, so Chrome and the Web Store should display the trademark symbol.

Use this attribution in the Store long description:

```text
YouTube is a trademark of Google LLC. Use of this trademark is subject to Google Permissions. This extension is not affiliated with, endorsed by, or sponsored by Google or YouTube.
```

## Store Listing Draft

Short description:

```text
Clean up YouTube Watch Later faster with checkboxes, batch remove, and watched-first sorting.
```

Long description:

```text
Your Watch Later list is easy to fill and hard to clean.

Watch Later Manager for YouTube adds simple cleanup tools directly to your Watch Later page, so you can deal with old videos faster without opening each one.

What it helps with:

- Select multiple visible Watch Later videos with checkboxes.
- Remove selected videos in one run.
- Sort loaded videos so watched or higher-progress videos move to the top.
- Clear your selection when you change your mind.
- Keep using YouTube's normal page, menus, and scrolling.

How it works:

Open your YouTube Watch Later playlist and the extension adds a small toolbar at the bottom of the page. Choose the videos you want, then use Select all, Clear, Watched first, or Remove selected.

Remove selected works through YouTube's visible row menu. Watched first reads the progress shown on the page and visually sorts only the videos that are already loaded. It does not permanently reorder your playlist.

Privacy-friendly by design:

The extension does not use the YouTube API, private YouTube requests, account credentials, cookies, analytics, ads, external servers, or remote code. It runs locally in your browser and only uses what is visible on the Watch Later page.

Important note:

Because this extension works with YouTube's visible page, it may need updates if YouTube changes its page layout or menu wording.

YouTube is a trademark of Google LLC. Use of this trademark is subject to Google Permissions. This extension is not affiliated with, endorsed by, or sponsored by Google or YouTube.
```

## Privacy Answers

- Single purpose: Manage the visible YouTube Watch Later page by adding selection, batch remove, and watched-first sorting.
- Data collection: The extension does not collect or transmit user data.
- Local processing: It reads visible page content locally to identify video rows, titles, menu items, and watched progress.
- Data sharing: None.
- Remote code: None.
- Ads or analytics: None.

Host `docs/PRIVACY_POLICY.md` somewhere public and use that URL in the Chrome Web Store Developer Dashboard.

## Reviewer Notes Draft

```text
This extension has no popup or background service worker. It runs as a content script on YouTube playlist pages and activates only on https://www.youtube.com/playlist?list=WL.

To test it, sign in to a YouTube account with items in Watch Later, open https://www.youtube.com/playlist?list=WL, and look for the toolbar at the bottom right. The toolbar lets the user select visible rows, clear selection, sort loaded rows by watched progress, and remove selected rows through YouTube's visible row menu.

The extension does not use YouTube APIs, private YouTube requests, account credentials, cookies, analytics, ads, external servers, or remote code.
```

## Manual Test Before Submit

- Load this folder as an unpacked extension in Chrome.
- Open `https://www.youtube.com/playlist?list=WL`.
- Check that the toolbar appears only on Watch Later.
- Test Select all and Clear.
- Test Watched first with loaded rows that have progress.
- Test Remove selected on one disposable Watch Later item first.
- Scroll after sorting and after removal to confirm YouTube's infinite scroll still loads more rows.
- Use `assets/store/screenshot-watch-later-toolbar.png` for the Store listing screenshot.
