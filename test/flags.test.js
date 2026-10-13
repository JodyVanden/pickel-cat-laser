const test = require('node:test');
const assert = require('node:assert');
const { parseFlags } = require('../src/flags.js');

test('no query string: everything off', () => {
  assert.deepStrictEqual(parseFlags(''), { debug: false, nofx: false });
  assert.deepStrictEqual(parseFlags(undefined), { debug: false, nofx: false });
});

test('?debug and ?nofx are detected, alone or together', () => {
  assert.deepStrictEqual(parseFlags('?debug'), { debug: true, nofx: false });
  assert.deepStrictEqual(parseFlags('?nofx'), { debug: false, nofx: true });
  assert.deepStrictEqual(parseFlags('?debug&nofx'), { debug: true, nofx: true });
});

test('explicit =0 / =false turns a flag off; unknown params ignored', () => {
  assert.deepStrictEqual(parseFlags('?debug=0&nofx=false&x=1'), { debug: false, nofx: false });
  assert.deepStrictEqual(parseFlags('?nofx=1'), { debug: false, nofx: true });
});
