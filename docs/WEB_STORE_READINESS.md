# Chrome Web Store Readiness

## Current Status

The source, package, listing assets, public privacy policy, and manual Watch Later retest were ready for Chrome Web Store submission. The draft was submitted for review on 2026-06-17.

The extension was published and is live on the Chrome Web Store: https://chromewebstore.google.com/detail/watch-later-manager-for-y/jleceiefdnhnjifpebbnlgjbmhijnmpn

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

Open your YouTube Watch Later playlist and the extension adds a small toolbar at the bottom of the page. Choose the videos you want, then use Select all, Clear, Watched first, or Remove.

Remove works through YouTube's visible row menu. Watched first reads the progress shown on the page and visually sorts only the videos that are already loaded. It does not permanently reorder your playlist.

Privacy-friendly by design:

The extension does not use the YouTube API, private YouTube requests, account credentials, cookies, analytics, ads, external servers, or remote code. It processes visible Watch Later page content locally in your browser. Nothing is sent to the developer or any external server.

Important note:

Because this extension works with YouTube's visible page, it may need updates if YouTube changes its page layout or menu wording.

YouTube is a trademark of Google LLC. Use of this trademark is subject to Google Permissions. This extension is not affiliated with, endorsed by, or sponsored by Google or YouTube.
```

## Privacy Answers

- Single purpose: Manage the visible YouTube Watch Later page by adding selection, batch remove, and watched-first sorting.
- Data handled locally: Visible website content on the Watch Later page, including video rows, titles, watched progress, menu item text, and checkbox selections.
- Data collection by developer: None. The extension does not transmit page content, user activity, account data, or personal information to the developer or any external server.
- Local processing: It reads visible page content locally to identify video rows, titles, menu items, and watched progress.
- Limited use: Data handled locally is used only for the extension's single user-facing Watch Later cleanup purpose.
- Data sharing: None.
- Remote code: None.
- Ads or analytics: None.

Chrome Web Store privacy disclosures should match this policy. If the dashboard asks for user data categories handled by the extension, disclose website content because the content script processes visible Watch Later page content locally.

Use this public privacy policy URL in the Chrome Web Store Developer Dashboard:

```text
https://liewcf.github.io/youtube-watchlist-manager/privacy.html
```

## Reviewer Notes Draft

```text
This extension has no popup or background service worker. It loads as a content script on YouTube pages so it can handle YouTube single-page navigation, but it activates only on https://www.youtube.com/playlist?list=WL.

To test it, sign in to a YouTube account with items in Watch Later, open https://www.youtube.com/playlist?list=WL, and look for the toolbar at the bottom right. The toolbar lets the user select visible rows, clear selection, sort loaded rows by watched progress, and remove selected rows through YouTube's visible row menu.

The extension does not use YouTube APIs, private YouTube requests, account credentials, cookies, analytics, ads, external servers, or remote code. It processes visible Watch Later page content locally only and does not transmit page content or user activity.
```

## Manual Test Before Submit

- Load this folder as an unpacked extension in Chrome.
- Open `https://www.youtube.com/playlist?list=WL`.
- Check that the toolbar appears only on Watch Later.
- Test Select all and Clear.
- Test Watched first with loaded rows that have progress.
- Test Remove on one disposable selected Watch Later item first.
- Scroll after sorting and after removal to confirm YouTube's infinite scroll still loads more rows.
- Use `assets/store/screenshot-watch-later-toolbar.png` for the Store listing screenshot.
