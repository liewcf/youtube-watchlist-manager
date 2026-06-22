const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const manifest = require('../manifest.json');

const {
  isWatchLaterUrl,
  buildWatchedSortGroups,
  buildWatchedVisualOrderPlan,
  buildTransformSortPlan,
  parseProgressPercent,
  scrollPageToTop,
  getSortWatchedButtonLabel
} = require('../src/content.js');

test('isWatchLaterUrl only accepts YouTube Watch Later playlist URLs', () => {
  assert.equal(isWatchLaterUrl('https://www.youtube.com/playlist?list=WL'), true);
  assert.equal(isWatchLaterUrl('https://youtube.com/playlist?list=WL&index=10'), true);
  assert.equal(isWatchLaterUrl('https://www.youtube.com/playlist?list=LL'), false);
  assert.equal(isWatchLaterUrl('https://www.youtube.com/watch?v=abc123'), false);
});

test('manifest injects on YouTube pages so SPA navigation can show the toolbar', () => {
  const [contentScript] = manifest.content_scripts;

  assert.ok(contentScript.matches.includes('https://www.youtube.com/*'));
  assert.ok(contentScript.matches.includes('https://youtube.com/*'));
});

test('toolbar remove button uses concise copy beside the selected count', () => {
  const source = fs.readFileSync(path.join(__dirname, '../src/content.js'), 'utf8');

  assert.match(source, /createButton\('Remove', 'remove', 'ytwm-button-danger'\)/);
  assert.doesNotMatch(source, /createButton\('Remove selected', 'remove', 'ytwm-button-danger'\)/);
});

test('toolbar status text does not reserve extra end space', () => {
  const styles = fs.readFileSync(path.join(__dirname, '../src/content.css'), 'utf8');

  assert.doesNotMatch(styles, /\.ytwm-status\s*\{[^}]*min-width:\s*120px/i);
  assert.match(styles, /\.ytwm-status\s*\{[^}]*white-space:\s*nowrap/i);
});

test('sort watched button label changes to normal order when active', () => {
  assert.equal(getSortWatchedButtonLabel(false), 'Watched first');
  assert.equal(getSortWatchedButtonLabel(true), 'Normal order');
});

test('buildWatchedSortGroups separates watched rows before unwatched rows', () => {
  const rows = [
    { id: 'a', watched: false },
    { id: 'b', watched: true },
    { id: 'c', watched: false },
    { id: 'd', watched: true }
  ];

  assert.deepEqual(buildWatchedSortGroups(rows).map((row) => row.id), ['b', 'd', 'a', 'c']);
});

test('buildWatchedSortGroups keeps original order inside each group', () => {
  const rows = [
    { id: 'first', watched: true },
    { id: 'second', watched: true },
    { id: 'third', watched: false }
  ];

  assert.deepEqual(buildWatchedSortGroups(rows).map((row) => row.id), ['first', 'second', 'third']);
});

test('buildWatchedVisualOrderPlan assigns CSS order without reordering input rows', () => {
  const rows = [
    { id: 'a', watched: false },
    { id: 'b', watched: true },
    { id: 'c', watched: false }
  ];

  const plan = buildWatchedVisualOrderPlan(rows);

  assert.deepEqual(plan.map((item) => item.row.id), ['a', 'b', 'c']);
  assert.deepEqual(plan.map((item) => item.order), [1, 0, 2]);
});

test('parseProgressPercent reads inline width percentages', () => {
  assert.equal(parseProgressPercent('width: 10%;'), 10);
  assert.equal(parseProgressPercent('width: 87.5%; height: 4px;'), 87.5);
  assert.equal(parseProgressPercent('width: 150%;'), 100);
  assert.equal(parseProgressPercent('width: -10%;'), null);
  assert.equal(parseProgressPercent('height: 100%;'), null);
});

test('buildWatchedVisualOrderPlan sorts higher progress before lower progress', () => {
  const rows = [
    { id: 'forty', watched: true, progressPercent: 40 },
    { id: 'none', watched: false, progressPercent: null },
    { id: 'ninety-five', watched: true, progressPercent: 95 },
    { id: 'also-forty', watched: true, progressPercent: 40 }
  ];

  const plan = buildWatchedVisualOrderPlan(rows);

  assert.deepEqual(plan.map((item) => item.row.id), ['forty', 'none', 'ninety-five', 'also-forty']);
  assert.deepEqual(plan.map((item) => item.order), [1, 3, 0, 2]);
});

test('buildWatchedVisualOrderPlan treats watched rows without progress as fully watched', () => {
  const rows = [
    { id: 'half', watched: true, progressPercent: 50 },
    { id: 'watched-no-bar', watched: true, progressPercent: null },
    { id: 'unwatched', watched: false, progressPercent: null }
  ];

  const plan = buildWatchedVisualOrderPlan(rows);

  assert.deepEqual(plan.map((item) => item.order), [1, 0, 2]);
});

test('buildTransformSortPlan computes visual moves without reordering input rows', () => {
  const rows = [
    { id: 'forty', watched: true, progressPercent: 40, top: 0, height: 100 },
    { id: 'none', watched: false, progressPercent: null, top: 100, height: 100 },
    { id: 'ninety-five', watched: true, progressPercent: 95, top: 200, height: 100 }
  ];

  const plan = buildTransformSortPlan(rows);

  assert.deepEqual(plan.map((item) => item.row.id), ['forty', 'none', 'ninety-five']);
  assert.deepEqual(plan.map((item) => item.translateY), [100, 100, -200]);
});

test('scrollPageToTop jumps the page to the top-left corner', () => {
  const calls = [];
  const fakeWindow = {
    document: {
      body: { scrollTop: 456 },
      documentElement: { scrollTop: 123 }
    },
    scrollTo(left, top) {
      calls.push([left, top]);
    }
  };

  assert.equal(typeof scrollPageToTop, 'function');
  scrollPageToTop(fakeWindow);

  assert.deepEqual(calls, [[0, 0]]);
  assert.equal(fakeWindow.document.documentElement.scrollTop, 0);
  assert.equal(fakeWindow.document.body.scrollTop, 0);
});

test('interface polish keeps public and extension controls easy to use', () => {
  const siteStyles = fs.readFileSync(path.join(__dirname, '../site/styles.css'), 'utf8');
  const sitePage = fs.readFileSync(path.join(__dirname, '../site/index.html'), 'utf8');
  const toolbarStyles = fs.readFileSync(path.join(__dirname, '../src/content.css'), 'utf8');

  assert.match(siteStyles, /-webkit-font-smoothing:\s*antialiased/i);
  assert.match(siteStyles, /h1,\s*h2\s*\{[^}]*text-wrap:\s*balance/i);
  assert.match(siteStyles, /\.demo-small,[\s\S]*?\.demo-danger\s*\{[^}]*min-height:\s*40px/i);
  assert.match(siteStyles, /\.demo-row img\s*\{[^}]*outline:\s*1px solid rgba\(255, 255, 255, 0\.1\)/i);
  assert.match(siteStyles, /\.demo-swipe-cue\s*\{[^}]*display:\s*none/i);
  assert.match(siteStyles, /@media \(max-width: 680px\)[\s\S]*?\.demo-swipe-cue\s*\{[^}]*display:\s*flex/i);
  assert.match(siteStyles, /\.button:active[\s\S]*?scale\(0\.96\)/i);
  assert.match(sitePage, /<p class="demo-swipe-cue">/);
  assert.match(toolbarStyles, /\.ytwm-button\s*\{[^}]*min-height:\s*40px/i);
  assert.match(toolbarStyles, /\.ytwm-button:active\s*\{[^}]*scale\(0\.96\)/i);
});
