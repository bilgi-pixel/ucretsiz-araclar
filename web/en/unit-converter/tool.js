// Unit Converter (EN) — runs entirely in the browser; inputs are never sent to a server.
// Every category converts through a common base unit (length: meter, weight: gram, ...); temperature is handled separately.
import { showError } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

/* ---------- Unit definitions: [id, option label, factor to base, symbol shown in the result line] ---------- */
function dataUnits(base) {
  // Base unit is the byte; 1 bit = 1/8 byte.
  return [
    ['bit', 'bit', 1 / 8, 'bit'], ['byte', 'byte (B)', 1, 'B'], ['kb', 'kilobyte (KB)', base, 'KB'], ['mb', 'megabyte (MB)', base ** 2, 'MB'],
    ['gb', 'gigabyte (GB)', base ** 3, 'GB'], ['tb', 'terabyte (TB)', base ** 4, 'TB'],
  ];
}

const CATS = {
  length: { def: ['m', 'ft'], units: [
    ['mm', 'millimeter (mm)', 0.001, 'mm'], ['cm', 'centimeter (cm)', 0.01, 'cm'], ['m', 'meter (m)', 1, 'm'], ['km', 'kilometer (km)', 1000, 'km'],
    ['in', 'inch (in)', 0.0254, 'in'], ['ft', 'foot (ft)', 0.3048, 'ft'], ['yd', 'yard (yd)', 0.9144, 'yd'], ['mi', 'mile (mi)', 1609.344, 'mi'],
    ['nmi', 'nautical mile (nmi)', 1852, 'nmi'],
  ] },
  weight: { def: ['kg', 'lb'], units: [
    ['mg', 'milligram (mg)', 0.001, 'mg'], ['g', 'gram (g)', 1, 'g'], ['kg', 'kilogram (kg)', 1000, 'kg'], ['tonne', 'metric tonne (t)', 1e6, 't'],
    ['oz', 'ounce (oz)', 28.349523125, 'oz'], ['lb', 'pound (lb)', 453.59237, 'lb'], ['st', 'stone (st)', 6350.29318, 'st'],
  ] },
  volume: { def: ['l', 'gal'], units: [
    ['ml', 'milliliter (ml)', 0.001, 'ml'], ['l', 'liter (l)', 1, 'l'], ['m3', 'cubic meter (m³)', 1000, 'm³'],
    ['tsp', 'teaspoon (US)', 0.00492892159375, 'tsp'], ['tbsp', 'tablespoon (US)', 0.01478676478125, 'tbsp'], ['floz', 'fluid ounce (US)', 0.0295735295625, 'fl oz'],
    ['cup', 'cup (US)', 0.2365882365, 'cup'], ['pint', 'pint (US)', 0.473176473, 'pt'], ['quart', 'quart (US)', 0.946352946, 'qt'],
    ['gal', 'gallon (US)', 3.785411784, 'gal'], ['galuk', 'gallon (UK imperial)', 4.54609, 'UK gal'],
  ] },
  area: { def: ['m2', 'ft2'], units: [
    ['cm2', 'square centimeter (cm²)', 0.0001, 'cm²'], ['m2', 'square meter (m²)', 1, 'm²'], ['ha', 'hectare (ha)', 10000, 'ha'], ['km2', 'square kilometer (km²)', 1e6, 'km²'],
    ['in2', 'square inch (in²)', 0.00064516, 'in²'], ['ft2', 'square foot (ft²)', 0.09290304, 'ft²'], ['yd2', 'square yard (yd²)', 0.83612736, 'yd²'],
    ['acre', 'acre', 4046.8564224, 'acre'], ['mi2', 'square mile (mi²)', 2589988.110336, 'mi²'],
  ] },
  temperature: { def: ['c', 'f'], units: [['c', 'Celsius (°C)', null, '°C'], ['f', 'Fahrenheit (°F)', null, '°F'], ['k', 'Kelvin (K)', null, 'K']] },
  data: { def: ['gb', 'mb'], units: null },
  speed: { def: ['kmh', 'mph'], units: [
    ['kmh', 'kilometers per hour (km/h)', 1 / 3.6, 'km/h'], ['ms', 'meters per second (m/s)', 1, 'm/s'], ['mph', 'miles per hour (mph)', 0.44704, 'mph'],
    ['knot', 'knot (kn)', 1852 / 3600, 'kn'], ['fps', 'feet per second (ft/s)', 0.3048, 'ft/s'],
  ] },
  time: { def: ['hour', 'min'], units: [
    ['ms', 'millisecond (ms)', 0.001, 'ms'], ['sec', 'second (s)', 1, 's'], ['min', 'minute (min)', 60, 'min'], ['hour', 'hour (h)', 3600, 'h'],
    ['day', 'day (d)', 86400, 'd'], ['week', 'week (wk)', 604800, 'wk'],
  ] },
};

const state = { k: 'length', a: 'm', b: 'ft', base: 1024, v: '1' };

function unitsOf(k) { return k === 'data' ? dataUnits(state.base) : CATS[k].units; }

/* ---------- Number handling ---------- */
/** Plain number text → number. Commas are thousands separators ("1,234.5"); a lone "2,5" is read as a decimal comma. NaN if invalid. */
export function parseNum(s) {
  let t = String(s ?? '').trim().replace(/[\s ]/g, '');
  let neg = false;
  if (t.startsWith('-') || t.startsWith('−')) { neg = true; t = t.slice(1); }
  if (!t || !/^[0-9.,]+$/.test(t)) return NaN;
  if (t.includes(',') && t.includes('.')) {
    t = t.lastIndexOf(',') > t.lastIndexOf('.') ? t.replace(/\./g, '').replace(',', '.') : t.replace(/,/g, '');
  } else if (t.includes(',')) {
    t = /^\d{1,3}(,\d{3})+$/.test(t) || (t.match(/,/g) || []).length > 1 ? t.replace(/,/g, '') : t.replace(',', '.');
  } else if ((t.match(/\./g) || []).length > 1) {
    t = /^\d{1,3}(\.\d{3})+$/.test(t) ? t.replace(/\./g, '') : '';
  }
  if (!/^\d*\.?\d+$/.test(t) && !/^\d+\.$/.test(t)) return NaN;
  return neg ? -Number(t) : Number(t);
}

/** Rounds to significant digits and formats with US separators; very large or tiny values use scientific notation. */
export function formatNum(n, sig) {
  if (n === 0 || Object.is(n, -0)) return '0';
  const abs = Math.abs(n);
  if (abs >= 1e15 || abs < 1e-6) return Number(n.toPrecision(sig)).toExponential(Math.max(0, sig - 1)).replace(/\.?0+e/, 'e');
  const r = Number(n.toPrecision(sig));
  return r.toLocaleString('en-US', { maximumFractionDigits: 20 });
}

/* ---------- Conversion ---------- */
function toTemp(unit, v) { // → °C
  if (unit === 'f') return ((v - 32) * 5) / 9;
  if (unit === 'k') return v - 273.15;
  return v;
}
function fromTemp(unit, c) {
  if (unit === 'f') return (c * 9) / 5 + 32;
  if (unit === 'k') return c + 273.15;
  return c;
}

/** Converts a value between units (category, source id, target id). */
export function convert(k, from, to, v, base = 1024) {
  if (k === 'temperature') {
    const c = toTemp(from, v);
    if (c < -273.15 - 1e-9) throw new Error('This temperature is below absolute zero (−273.15 °C). Enter a higher value.');
    return fromTemp(to, c);
  }
  const list = k === 'data' ? dataUnits(base) : CATS[k].units;
  const f = list.find((u) => u[0] === from)[2];
  const t = list.find((u) => u[0] === to)[2];
  return (v * f) / t;
}

/* ---------- UI ---------- */
const el = {
  cat: $('cat'), a: $('val-a'), b: $('val-b'), ua: $('unit-a'), ub: $('unit-b'), sig: $('sig'),
  error: $('error'), line: $('result-line'), status: $('copy-status'), baseBox: $('base-box'),
};

function fillUnits() {
  const list = unitsOf(state.k);
  for (const sel of [el.ua, el.ub]) {
    sel.replaceChildren(...list.map(([id, label]) => new Option(label, id)));
  }
  if (!list.some((u) => u[0] === state.a)) state.a = CATS[state.k].def[0];
  if (!list.some((u) => u[0] === state.b)) state.b = CATS[state.k].def[1];
  el.ua.value = state.a; el.ub.value = state.b;
}

const symbol = (id) => unitsOf(state.k).find((u) => u[0] === id)[3];

/** dir: 'a' → compute B, 'b' → compute A. */
function recalc(dir) {
  showError(el.error, '');
  el.status.textContent = '';
  const src = dir === 'a' ? el.a : el.b;
  const dst = dir === 'a' ? el.b : el.a;
  const sUnit = dir === 'a' ? el.ua.value : el.ub.value;
  const dUnit = dir === 'a' ? el.ub.value : el.ua.value;
  state.a = el.ua.value; state.b = el.ub.value;
  const raw = src.value.trim();
  if (!raw) { dst.value = ''; el.line.textContent = ''; return; }
  const v = parseNum(raw);
  if (Number.isNaN(v)) {
    dst.value = ''; el.line.textContent = '';
    showError(el.error, 'The value could not be read as a number. Use digits only and a dot for decimals (for example 2.5); do not type letters or symbols.');
    return;
  }
  if (v < 0 && state.k !== 'temperature') {
    dst.value = ''; el.line.textContent = '';
    showError(el.error, 'Negative values are not allowed in this category. Enter zero or a positive number.');
    return;
  }
  try {
    const out = convert(state.k, sUnit, dUnit, v, state.base);
    const sig = Number(el.sig.value);
    dst.value = formatNum(out, sig);
    const left = dir === 'a' ? `${formatNum(v, sig)} ${symbol(sUnit)}` : `${dst.value} ${symbol(dUnit)}`;
    const right = dir === 'a' ? `${dst.value} ${symbol(dUnit)}` : `${formatNum(v, sig)} ${symbol(sUnit)}`;
    el.line.textContent = `${left} = ${right}`;
  } catch (err) {
    dst.value = ''; el.line.textContent = '';
    showError(el.error, err.message);
  }
}

function syncUrl(push) {
  const p = new URLSearchParams({ k: state.k, a: state.a, b: state.b });
  if (state.k === 'data') p.set('t', String(state.base));
  const url = `?${p.toString()}`;
  if (push) history.pushState(null, '', url); else history.replaceState(null, '', url);
}

function applyState(push) {
  el.cat.value = state.k;
  el.baseBox.hidden = state.k !== 'data';
  document.querySelectorAll('input[name="base"]').forEach((r) => { r.checked = Number(r.value) === state.base; });
  fillUnits();
  el.a.value = state.v;
  recalc('a');
  syncUrl(push);
}

function readParams(search) {
  const p = new URLSearchParams(search);
  const k = p.get('k');
  state.k = CATS[k] ? k : 'length';
  state.base = p.get('t') === '1000' ? 1000 : 1024;
  const list = unitsOf(state.k);
  const has = (id) => list.some((u) => u[0] === id);
  state.a = has(p.get('a')) ? p.get('a') : CATS[state.k].def[0];
  state.b = has(p.get('b')) ? p.get('b') : CATS[state.k].def[1];
  const v = p.get('v');
  state.v = v && !Number.isNaN(parseNum(v)) ? v : '1';
}

/* Events */
el.a.addEventListener('input', () => recalc('a'));
el.b.addEventListener('input', () => recalc('b'));
el.ua.addEventListener('change', () => { recalc('a'); syncUrl(false); });
el.ub.addEventListener('change', () => { recalc('a'); syncUrl(false); });
el.sig.addEventListener('change', () => recalc('a'));
el.cat.addEventListener('change', () => {
  state.k = el.cat.value;
  state.a = CATS[state.k].def[0]; state.b = CATS[state.k].def[1];
  state.v = el.a.value || '1';
  applyState(true);
});
document.querySelectorAll('input[name="base"]').forEach((r) => r.addEventListener('change', () => {
  state.base = Number(r.value);
  state.v = el.a.value || '1';
  applyState(false);
}));
$('swap').addEventListener('click', () => {
  const ua = el.ua.value;
  el.ua.value = el.ub.value; el.ub.value = ua;
  recalc('a'); syncUrl(false);
});
$('copy').addEventListener('click', async () => {
  const text = el.line.textContent;
  if (!text) { el.status.textContent = 'There is no result to copy. Type a value first.'; return; }
  try { await navigator.clipboard.writeText(text); el.status.textContent = 'Result copied.'; }
  catch { el.status.textContent = 'Could not copy automatically; select the result and copy it by hand.'; }
});

// "Popular conversions" links: change the state without reloading the page.
document.querySelectorAll('.common-links a').forEach((a) => a.addEventListener('click', (e) => {
  e.preventDefault();
  readParams(new URL(a.href).search);
  applyState(true);
  el.a.focus();
}));
window.addEventListener('popstate', () => { readParams(location.search); applyState(false); });

readParams(location.search);
applyState(false);
