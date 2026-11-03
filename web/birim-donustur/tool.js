// Birim Dönüştürücü — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez.
// Her kategori ortak bir taban birime çevrilir (uzunluk: metre, ağırlık: gram, ...); sıcaklık özel işlenir.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

/* ---------- Birim tanımları: id, görünen ad, tabana çarpan ---------- */
function dataUnits(base) {
  // Taban birim bayt; bit = 1/8 bayt.
  return [
    ['bit', 'bit', 1 / 8], ['bayt', 'bayt', 1], ['kb', 'KB', base], ['mb', 'MB', base ** 2], ['gb', 'GB', base ** 3], ['tb', 'TB', base ** 4],
  ];
}

const CATS = {
  uzunluk: { ad: 'Uzunluk', def: ['m', 'km'], units: [['mm', 'mm', 0.001], ['cm', 'cm', 0.01], ['m', 'm', 1], ['km', 'km', 1000], ['inc', 'inç', 0.0254], ['ft', 'feet', 0.3048], ['yd', 'yard', 0.9144], ['mi', 'mil', 1609.344]] },
  agirlik: { ad: 'Ağırlık', def: ['kg', 'lb'], units: [['mg', 'mg', 0.001], ['g', 'g', 1], ['kg', 'kg', 1000], ['ton', 'ton', 1e6], ['oz', 'ons', 28.349523125], ['lb', 'libre', 453.59237]] },
  hacim: { ad: 'Hacim', def: ['l', 'gal'], units: [['ml', 'ml', 0.001], ['l', 'l', 1], ['m3', 'm³', 1000], ['gal', 'galon (ABD)', 3.785411784], ['bardak', 'bardak (200 ml)', 0.2]] },
  alan: { ad: 'Alan', def: ['m2', 'donum'], units: [['m2', 'm²', 1], ['donum', 'dönüm', 1000], ['ha', 'hektar', 10000], ['ar', 'ar', 100], ['akre', 'akre', 4046.8564224], ['ft2', 'ft²', 0.09290304]] },
  sicaklik: { ad: 'Sıcaklık', def: ['c', 'f'], units: [['c', '°C'], ['f', '°F'], ['k', 'K']] },
  veri: { ad: 'Veri', def: ['gb', 'mb'], units: null },
  hiz: { ad: 'Hız', def: ['kmh', 'ms'], units: [['kmh', 'km/s', 1 / 3.6], ['ms', 'm/s', 1], ['mph', 'mil/s (mph)', 0.44704], ['knot', 'knot', 1852 / 3600]] },
  zaman: { ad: 'Zaman', def: ['saat', 'dk'], units: [['sn', 'sn', 1], ['dk', 'dk', 60], ['saat', 'saat', 3600], ['gun', 'gün', 86400], ['hafta', 'hafta', 604800]] },
};

const state = { k: 'uzunluk', a: 'm', b: 'km', base: 1024, v: '1' };

function unitsOf(k) { return k === 'veri' ? dataUnits(state.base) : CATS[k].units; }

/* ---------- Sayı işleme ---------- */
/** Türkçe/düz sayı metni → sayı. Binlik noktası yalnızca "1.234.567" kalıbında; "2.54" ondalık sayılır. Geçersizse NaN. */
export function parseNum(s) {
  let t = String(s ?? '').trim().replace(/\s/g, '');
  let neg = false;
  if (t.startsWith('-') || t.startsWith('−')) { neg = true; t = t.slice(1); }
  if (!t || !/^[0-9.,]+$/.test(t)) return NaN;
  if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  if (!/^\d*\.?\d+$/.test(t)) return NaN;
  return neg ? -Number(t) : Number(t);
}

/** Anlamlı basamağa yuvarlayıp Türkçe biçimler; çok büyük/küçük değerler bilimsel gösterilir. */
export function formatNum(n, sig) {
  if (n === 0 || Object.is(n, -0)) return '0';
  const abs = Math.abs(n);
  if (abs >= 1e15 || abs < 1e-6) return Number(n.toPrecision(sig)).toExponential(Math.max(0, sig - 1)).replace(/\.?0+e/, 'e').replace('.', ',');
  const r = Number(n.toPrecision(sig));
  return r.toLocaleString('tr-TR', { maximumFractionDigits: 20 });
}

/* ---------- Dönüşüm ---------- */
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

/** Değeri birimden birime çevirir (kategori, kaynak id, hedef id). */
export function convert(k, from, to, v, base = 1024) {
  if (k === 'sicaklik') {
    const c = toTemp(from, v);
    if (c < -273.15 - 1e-9) throw new Error('Bu sıcaklık mutlak sıfırın (−273,15 °C) altında olamaz. Daha yüksek bir değer girin.');
    return fromTemp(to, c);
  }
  const list = k === 'veri' ? dataUnits(base) : CATS[k].units;
  const f = list.find((u) => u[0] === from)[2];
  const t = list.find((u) => u[0] === to)[2];
  return (v * f) / t;
}

/* ---------- Arayüz ---------- */
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

const label = (id) => unitsOf(state.k).find((u) => u[0] === id)[1];

/** dir: 'a' → B'yi hesapla, 'b' → A'yı hesapla. */
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
    showError(el.error, 'Değer sayı olarak okunamadı. Yalnızca rakam, ondalık için virgül kullanın (örneğin 2,5); harf ve simge yazmayın.');
    return;
  }
  if (v < 0 && state.k !== 'sicaklik') {
    dst.value = ''; el.line.textContent = '';
    showError(el.error, 'Bu kategoride negatif değer olmaz. Sıfır ya da pozitif bir sayı girin.');
    return;
  }
  try {
    const out = convert(state.k, sUnit, dUnit, v, state.base);
    const sig = Number(el.sig.value);
    dst.value = formatNum(out, sig);
    const left = dir === 'a' ? `${formatNum(v, sig)} ${label(sUnit)}` : `${dst.value} ${label(dUnit)}`;
    const right = dir === 'a' ? `${dst.value} ${label(dUnit)}` : `${formatNum(v, sig)} ${label(sUnit)}`;
    el.line.textContent = `${left} = ${right}`;
  } catch (err) {
    dst.value = ''; el.line.textContent = '';
    showError(el.error, err.message);
  }
}

function syncUrl(push) {
  const p = new URLSearchParams({ k: state.k, a: state.a, b: state.b });
  if (state.k === 'veri') p.set('t', String(state.base));
  const url = `?${p.toString()}`;
  if (push) history.pushState(null, '', url); else history.replaceState(null, '', url);
}

function applyState(push) {
  el.cat.value = state.k;
  el.baseBox.hidden = state.k !== 'veri';
  document.querySelectorAll('input[name="base"]').forEach((r) => { r.checked = Number(r.value) === state.base; });
  fillUnits();
  el.a.value = state.v;
  document.querySelectorAll('.cat-links a').forEach((a) => a.setAttribute('aria-current', a.dataset.k === state.k ? 'true' : 'false'));
  recalc('a');
  syncUrl(push);
}

function readParams(search) {
  const p = new URLSearchParams(search);
  const k = p.get('k');
  state.k = CATS[k] ? k : 'uzunluk';
  state.base = p.get('t') === '1000' ? 1000 : 1024;
  const list = unitsOf(state.k);
  const has = (id) => list.some((u) => u[0] === id);
  state.a = has(p.get('a')) ? p.get('a') : CATS[state.k].def[0];
  state.b = has(p.get('b')) ? p.get('b') : CATS[state.k].def[1];
  const v = p.get('v');
  state.v = v && !Number.isNaN(parseNum(v)) ? v : '1';
}

/* Olaylar */
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
  if (!text) { el.status.textContent = 'Kopyalanacak bir sonuç yok. Önce bir değer yazın.'; return; }
  try { await navigator.clipboard.writeText(text); el.status.textContent = 'Sonuç kopyalandı.'; }
  catch { el.status.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});

// Sayfa içi "sık kullanılan dönüşümler" bağlantıları: yeniden yükleme yapmadan durumu değiştirir.
document.querySelectorAll('.common-links a, .cat-links a').forEach((a) => a.addEventListener('click', (e) => {
  e.preventDefault();
  readParams(new URL(a.href).search);
  applyState(true);
  el.a.focus();
}));
window.addEventListener('popstate', () => { readParams(location.search); applyState(false); });

readParams(location.search);
applyState(false);
