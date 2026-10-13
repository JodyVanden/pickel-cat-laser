const test = require('node:test');
const assert = require('node:assert');
const { parseFlags } = require('../src/flags.js');

const none = { stage: false, bg: false, pickle: false, cat: false };
const all  = { stage: true,  bg: true,  pickle: true,  cat: true  };

test('no query string: everything off', () => {
  assert.deepStrictEqual(parseFlags(''), { debug: false, nofx: false, off: none });
  assert.deepStrictEqual(parseFlags(undefined), { debug: false, nofx: false, off: none });
});

test('?debug is detected on its own and with others', () => {
  assert.strictEqual(parseFlags('?debug').debug, true);
  assert.strictEqual(parseFlags('?debug&nofx').debug, true);
  assert.strictEqual(parseFlags('?debug=0').debug, false);
});

test('bare ?nofx or ?nofx=1 disables every filter group', () => {
  for (const q of ['?nofx', '?nofx=1', '?nofx=true']) {
    assert.deepStrictEqual(parseFlags(q), { debug: false, nofx: true, off: all });
  }
});

test('?nofx=stage,bg disables only the listed groups', () => {
  const f = parseFlags('?nofx=stage,bg');
  assert.deepStrictEqual(f.off, { stage: true, bg: true, pickle: false, cat: false });
  assert.strictEqual(f.nofx, false);
  assert.deepStrictEqual(parseFlags('?nofx=cat,pickle').off, { stage: false, bg: false, pickle: true, cat: true });
});

test('unknown groups and =0/=false are ignored', () => {
  assert.deepStrictEqual(parseFlags('?nofx=bogus').off, none);
  assert.deepStrictEqual(parseFlags('?nofx=0').off, none);
  assert.deepStrictEqual(parseFlags('?nofx=false&x=1').off, none);
});
