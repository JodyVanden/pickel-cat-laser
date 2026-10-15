const test = require('node:test');
const assert = require('node:assert');
const { filterBroken } = require('../src/heal.js');

test('a filter that draws nothing while the plain part draws something is broken', () => {
  assert.strictEqual(filterBroken(0, 13), true);     // the Mali-T760 cat case
  assert.strictEqual(filterBroken(3, 13), true);
});

test('a filter that draws about as much as the plain part is healthy', () => {
  assert.strictEqual(filterBroken(13, 13), false);
  assert.strictEqual(filterBroken(100, 100), false);
  assert.strictEqual(filterBroken(9, 13), false);    // some shrinkage is normal (warping)
});

test('nothing to judge when the plain part draws (almost) nothing', () => {
  assert.strictEqual(filterBroken(0, 0), false);
  assert.strictEqual(filterBroken(0, 0.4), false);
});

test('a filter that draws MORE than the plain part is not broken', () => {
  assert.strictEqual(filterBroken(20, 13), false);
});

test('non-numeric input is never treated as broken', () => {
  assert.strictEqual(filterBroken(undefined, 13), false);
  assert.strictEqual(filterBroken(NaN, 13), false);
});
