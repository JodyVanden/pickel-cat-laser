const test = require('node:test');
const assert = require('node:assert');
const { getEyePositions } = require('../eyes.js');

// mesmercat.png is 500x333; pupils measured at (199,103) and (271,96); pivot (250,320)
const TEX_EYES = [[199, 103], [271, 96]];
const PIVOT = [250, 320];

function expected(cat, tex) {
  const ox = (tex[0] - PIVOT[0]) * cat.scale.x;
  const oy = (tex[1] - PIVOT[1]) * cat.scale.y;
  const c = Math.cos(cat.rotation), s = Math.sin(cat.rotation);
  return { x: cat.position.x + ox * c - oy * s, y: cat.position.y + ox * s + oy * c };
}

test('eyes sit on the pupils when unrotated', () => {
  const cat = { position: { x: 512, y: 768 }, scale: { x: 1.2288, y: 1.384 }, rotation: 0 };
  const eyes = getEyePositions(cat);
  TEX_EYES.forEach((t, i) => {
    const e = expected(cat, t);
    assert.ok(Math.abs(eyes[i].x - e.x) < 3, `eye ${i} x ${eyes[i].x} vs ${e.x}`);
    assert.ok(Math.abs(eyes[i].y - e.y) < 3, `eye ${i} y ${eyes[i].y} vs ${e.y}`);
  });
});

test('eyes follow cat rotation', () => {
  const cat = { position: { x: 512, y: 768 }, scale: { x: 1.2288, y: 1.384 }, rotation: 0.04 };
  const eyes = getEyePositions(cat);
  TEX_EYES.forEach((t, i) => {
    const e = expected(cat, t);
    assert.ok(Math.abs(eyes[i].x - e.x) < 3 && Math.abs(eyes[i].y - e.y) < 3);
  });
});
