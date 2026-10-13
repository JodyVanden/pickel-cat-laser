const test = require('node:test');
const assert = require('node:assert');
const { toCanvasPoint } = require('../src/pointer.js');

const rect = { left: 100, top: 50, width: 512, height: 384 }; // half-size canvas, offset
test('maps a client point inside the canvas to canvas coordinates', () => {
  assert.deepStrictEqual(toCanvasPoint(100 + 256, 50 + 192, rect, 1024, 768), { x: 512, y: 384 });
  assert.deepStrictEqual(toCanvasPoint(100, 50, rect, 1024, 768), { x: 0, y: 0 });
});

test('points in the letterbox map outside the canvas (caller can still aim there)', () => {
  const p = toCanvasPoint(50, 50, rect, 1024, 768);
  assert.ok(p.x < 0);
});

test('returns null for a zero-sized canvas', () => {
  assert.strictEqual(toCanvasPoint(10, 10, { left: 0, top: 0, width: 0, height: 0 }, 1024, 768), null);
});
