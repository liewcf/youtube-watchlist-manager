# YouTube Watchlist Manager Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Chrome MV3 extension that adds checkboxes, batch remove, and watched-first visual sorting to YouTube Watch Later without using YouTube APIs.

**Architecture:** One content script runs on YouTube Watch Later pages. Pure helper functions are exported for Node tests while browser-only code attaches controls and works with YouTube DOM.

**Tech Stack:** Chrome Manifest V3, plain JavaScript, CSS, Node built-in test runner.

---

### Task 1: Extension Skeleton And Pure Helpers

**Files:**
- Create: `youtube-watchlist-manager/manifest.json`
- Create: `youtube-watchlist-manager/src/content.js`
- Create: `youtube-watchlist-manager/src/content.css`
- Create: `youtube-watchlist-manager/tests/dom-logic.test.js`
- Create: `youtube-watchlist-manager/tests/run-tests.js`
- Create: `youtube-watchlist-manager/README.md`

- [ ] **Step 1: Write failing tests**

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { isWatchLaterUrl, buildWatchedSortGroups } = require('../src/content.js');

test('isWatchLaterUrl only accepts YouTube Watch Later playlist URLs', () => {
  assert.equal(isWatchLaterUrl('https://www.youtube.com/playlist?list=WL'), true);
  assert.equal(isWatchLaterUrl('https://www.youtube.com/playlist?list=LL'), false);
});

test('buildWatchedSortGroups separates watched rows before unwatched rows', () => {
  const rows = [
    { id: 'a', watched: false },
    { id: 'b', watched: true },
    { id: 'c', watched: false }
  ];

  assert.deepEqual(buildWatchedSortGroups(rows).map((row) => row.id), ['b', 'a', 'c']);
});
```

- [ ] **Step 2: Run tests and verify failure**

Run: `node youtube-watchlist-manager/tests/run-tests.js`

Expected: failure because `src/content.js` does not exist yet.

- [ ] **Step 3: Implement minimal extension files**

Create the MV3 manifest, content script, CSS, tests, and README. The content script exports helpers under Node and runs browser code only when `window` and `document` exist.

- [ ] **Step 4: Run tests and manifest validation**

Run:

```bash
node youtube-watchlist-manager/tests/run-tests.js
node -e "JSON.parse(require('node:fs').readFileSync('youtube-watchlist-manager/manifest.json', 'utf8')); console.log('manifest ok')"
```

Expected: tests pass and `manifest ok`.

### Task 2: Package Check

**Files:**
- Verify: `youtube-watchlist-manager/*`

- [ ] **Step 1: Inspect package files**

Run: `find youtube-watchlist-manager -maxdepth 3 -type f | sort`

Expected: manifest, README, source, and tests are present. No missing icon files are referenced.
