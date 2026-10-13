// URL switches: ?debug shows a diagnostics overlay, ?nofx disables all WebGL filters.
function parseFlags(search) {
  var params = new URLSearchParams(search || '');
  function on(name) {
    if (!params.has(name)) return false;
    var v = params.get(name);
    return v !== '0' && v !== 'false';
  }
  return { debug: on('debug'), nofx: on('nofx') };
}
if (typeof module !== 'undefined') module.exports = { parseFlags: parseFlags };
