// Horizontal position of pickle i of count. All pickles share one speed and are
// evenly spaced around a loop wider than the screen, so they never bunch up.
var PICKLE_SPEED = 0.04;   // px per ms
var PICKLE_MARGIN = 200;   // how far off-screen a pickle travels before wrapping
function pickleX(t, i, count, w) {
  var span = w + PICKLE_MARGIN * 2;
  return ((t * PICKLE_SPEED + i * span / count) % span) - PICKLE_MARGIN;
}
if (typeof module !== 'undefined') module.exports = { pickleX: pickleX };
