// A WebGL filter is "broken" on this device if the filtered part renders far
// fewer pixels than the same part without the filter (e.g. 0% vs 13%).
// Percentages are the share of the canvas drawn (see coverage() in index.html).
function filterBroken(withFilterPct, withoutFilterPct) {
  if (typeof withFilterPct !== 'number' || typeof withoutFilterPct !== 'number') return false;
  if (isNaN(withFilterPct) || isNaN(withoutFilterPct)) return false;
  if (withoutFilterPct < 1) return false;            // too little drawn to judge
  return withFilterPct < withoutFilterPct * 0.3;
}
if (typeof module !== 'undefined') module.exports = { filterBroken: filterBroken };
