// URL switches:
//   ?debug            diagnostics overlay
//   ?nofx             disable every WebGL filter
//   ?nofx=stage,bg    disable only some groups: stage | bg | pickle | cat
var FX_GROUPS = ['stage', 'bg', 'pickle', 'cat'];
function parseFlags(search) {
  var params = new URLSearchParams(search || '');
  function on(name) {
    if (!params.has(name)) return false;
    var v = params.get(name);
    return v !== '0' && v !== 'false';
  }
  var off = {};
  var raw = params.has('nofx') ? params.get('nofx') : null;
  var all = raw !== null && raw !== '0' && raw !== 'false' && (raw === '' || raw === '1' || raw === 'true');
  var listed = raw && !all ? raw.split(',') : [];
  FX_GROUPS.forEach(function(g) { off[g] = all || listed.indexOf(g) !== -1; });
  return { debug: on('debug'), nofx: all, off: off };
}
if (typeof module !== 'undefined') module.exports = { parseFlags: parseFlags };
