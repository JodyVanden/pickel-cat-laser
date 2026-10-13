// Map a viewport point to canvas (game) coordinates, given the canvas' on-screen rect.
function toCanvasPoint(clientX, clientY, rect, baseW, baseH) {
  if (!rect || !rect.width || !rect.height) return null;
  return {
    x: (clientX - rect.left) / rect.width * baseW,
    y: (clientY - rect.top) / rect.height * baseH
  };
}
if (typeof module !== 'undefined') module.exports = { toCanvasPoint: toCanvasPoint };
