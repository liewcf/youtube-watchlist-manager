---
title: Decisions
description: Important project, product, technical, process, or content decisions with rationale and consequences.
doc_type: decision_log
status: active
created: 2026-06-17
updated: 2026-06-17
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

## 2026-06-17

- Keep top-level `docs/*.md` files trackable in git while leaving copied `docs/superpowers/` files ignored by default. Rationale: project memory, readiness, privacy, and migration docs are useful durable project context; copied Superpowers specs/plans are local historical support unless explicitly needed.

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
