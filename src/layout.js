// Scale a baseW x baseH canvas to fit the window, keeping aspect ratio, centered.
function fitToWindow(winW, winH, baseW, baseH) {
  var scale = Math.min(winW / baseW, winH / baseH);
  var width = Math.round(baseW * scale), height = Math.round(baseH * scale);
  return { width: width, height: height,
           left: Math.round((winW - width) / 2), top: Math.round((winH - height) / 2) };
}
if (typeof module !== 'undefined') module.exports = { fitToWindow: fitToWindow };
