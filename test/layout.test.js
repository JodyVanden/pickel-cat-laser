const test = require('node:test');
const assert = require('node:assert');
const { fitToWindow } = require('../layout.js');

test('wide window: height-limited, centered horizontally, aspect kept', () => {
  const r = fitToWindow(2560, 1080, 1024, 768);
  assert.strictEqual(r.height, 1080);
  assert.strictEqual(r.width, 1440);
  assert.strictEqual(r.left, 560);
  assert.strictEqual(r.top, 0);
});

test('tall window: width-limited, centered vertically', () => {
  const r = fitToWindow(800, 1200, 1024, 768);
  assert.strictEqual(r.width, 800);
  assert.strictEqual(r.height, 600);
  assert.strictEqual(r.top, 300);
  assert.strictEqual(r.left, 0);
});

test('exact aspect fills window', () => {
  const r = fitToWindow(1024, 768, 1024, 768);
  assert.deepStrictEqual(r, { width: 1024, height: 768, left: 0, top: 0 });
});
