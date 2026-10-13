const test = require('node:test');
const assert = require('node:assert');
const { loadErrorMessage } = require('../loaderror.js');

test('file:// page tells the user to use a local server', () => {
  const m = loadErrorMessage('file:');
  assert.match(m, /start_server\.sh/);
});

test('http(s) page asks to check connection and reload', () => {
  for (const p of ['http:', 'https:']) {
    const m = loadErrorMessage(p);
    assert.match(m, /reload/i);
    assert.doesNotMatch(m, /start_server/);
  }
});

test('always returns a non-empty string', () => {
  assert.ok(loadErrorMessage(undefined).length > 0);
});
