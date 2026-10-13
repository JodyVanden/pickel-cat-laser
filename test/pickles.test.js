const test = require('node:test');
const assert = require('node:assert');
const { pickleX } = require('../pickles.js');

const W = 1024, COUNT = 5;
const xs = (t) => Array.from({ length: COUNT }, (_, i) => pickleX(t, i, COUNT, W));

test('pickles stay evenly spaced at any time (no clusters)', () => {
  for (const t of [0, 1234, 987654, 1.7e12, 1.7e12 + 31337]) {
    const sorted = xs(t).sort((a, b) => a - b);
    const gaps = sorted.map((x, i) => (sorted[(i + 1) % COUNT] - x + (W + 400)) % (W + 400));
    const expected = (W + 400) / COUNT;
    gaps.forEach(g => assert.ok(Math.abs(g - expected) < 1, `t=${t} gap ${g} vs ${expected}`));
  }
});

test('x stays within the wrap range', () => {
  for (const t of [0, 5e3, 1.7e12]) {
    xs(t).forEach(x => assert.ok(x >= -200 && x < W + 200, `x=${x}`));
  }
});

test('pickles move rightward over time', () => {
  const a = pickleX(1000, 0, COUNT, W), b = pickleX(1500, 0, COUNT, W);
  assert.ok(b > a || a > W); // allow a wrap
});
