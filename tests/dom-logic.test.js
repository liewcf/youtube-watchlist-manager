const test = require('node:test');
const assert = require('node:assert/strict');

const {
  isWatchLaterUrl,
  buildWatchedSortGroups,
  buildWatchedVisualOrderPlan,
  buildTransformSortPlan,
  parseProgressPercent,
  scrollPageToTop
} = require('../src/content.js');

test('isWatchLaterUrl only accepts YouTube Watch Later playlist URLs', () => {
  assert.equal(isWatchLaterUrl('https://www.youtube.com/playlist?list=WL'), true);
  assert.equal(isWatchLaterUrl('https://youtube.com/playlist?list=WL&index=10'), true);
  assert.equal(isWatchLaterUrl('https://www.youtube.com/playlist?list=LL'), false);
  assert.equal(isWatchLaterUrl('https://www.youtube.com/watch?v=abc123'), false);
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
