// Offsets from the cat's pivot (250,320) in mesmercat.png texture px (500x333).
// Pupils are at (199,103) and (271,96).
var EYE_OFFSETS = [[-51, -217], [21, -224]];
function getEyePositions(cat) {
  var cos = Math.cos(cat.rotation), sin = Math.sin(cat.rotation);
  return EYE_OFFSETS.map(function(o) {
    var ox = o[0] * cat.scale.x, oy = o[1] * cat.scale.y;
    return { x: cat.position.x + ox * cos - oy * sin, y: cat.position.y + ox * sin + oy * cos };
  });
}
if (typeof module !== 'undefined') module.exports = { getEyePositions: getEyePositions, EYE_OFFSETS: EYE_OFFSETS };
