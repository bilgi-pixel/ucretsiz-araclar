// Mutfak Ölçü Dönüştürücü — tamamı tarayıcıda çalışır; hiçbir veri sunucuya gitmez.
// Hacim ölçüleri (bardak, kaşık, cup) kesin; gram karşılıkları malzemeler.json'daki yaklaşık yoğunluklara dayanır.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

/** Standart Türk su bardağı (ml). Tablodaki gram değerleri bu hacim içindir. */
export const CUP_ML = 200;

/** Birimler: kind 'vol' → f mililitre, 'wt' → f gram. frac: kesir ipucu (¼, ½) gösterilsin mi. */
export const UNITS = {
  sb: { name: 'Su bardağı (200 ml)', kind: 'vol', f: 200, frac: true, word: 'su bardağı' },
  cb: { name: 'Çay bardağı (100 ml)', kind: 'vol', f: 100, frac: true, word: 'çay bardağı' },
  kf: { name: 'Kahve fincanı (60 ml)', kind: 'vol', f: 60, frac: true, word: 'kahve fincanı' },
  yk: { name: 'Yemek kaşığı (15 ml)', kind: 'vol', f: 15, frac: true, word: 'yemek kaşığı' },
  tk: { name: 'Tatlı kaşığı (10 ml)', kind: 'vol', f: 10, frac: true, word: 'tatlı kaşığı' },
  ck: { name: 'Çay kaşığı (5 ml)', kind: 'vol', f: 5, frac: true, word: 'çay kaşığı' },
  cup: { name: 'ABD cup (240 ml)', kind: 'vol', f: 240, frac: true, word: 'ABD cup' },
  tbsp: { name: 'tbsp, ABD yemek kaşığı (15 ml)', kind: 'vol', f: 15, frac: true, word: 'tbsp' },
  tsp: { name: 'tsp, ABD çay kaşığı (5 ml)', kind: 'vol', f: 5, frac: true, word: 'tsp' },
  floz: { name: 'fl oz, sıvı ons (29,57 ml)', kind: 'vol', f: 29.5735, frac: false, word: 'fl oz' },
  ml: { name: 'Mililitre (ml)', kind: 'vol', f: 1, frac: false, word: 'ml' },
  l: { name: 'Litre (l)', kind: 'vol', f: 1000, frac: false, word: 'litre' },
  g: { name: 'Gram (g)', kind: 'wt', f: 1, frac: false, word: 'g' },
  kg: { name: 'Kilogram (kg)', kind: 'wt', f: 1000, frac: false, word: 'kg' },
  oz: { name: 'oz, ağırlık onsu (28,35 g)', kind: 'wt', f: 28.3495, frac: false, word: 'oz' },
  lb: { name: 'lb, libre (453,6 g)', kind: 'wt', f: 453.592, frac: false, word: 'lb' },
};

/* ---------- Sayı ayrıştırma: 1,5 / 1.5 / 1.250,5 / 1/2 / 1 1/2 / ½ / 1½ ---------- */
const UNI = { '½': 0.5, '⅓': 1 / 3, '⅔': 2 / 3, '¼': 0.25, '¾': 0.75, '⅛': 0.125, '⅜': 0.375, '⅝': 0.625, '⅞': 0.875 };

function parseDecimal(s) {
  let neg = false;
  if (/^[+-]/.test(s)) { neg = s[0] === '-'; s = s.slice(1); }
  const lc = s.lastIndexOf(','); const ld = s.lastIndexOf('.');
  if (lc >= 0 && ld >= 0) s = lc > ld ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  else if (lc >= 0) s = (s.match(/,/g) || []).length > 1 ? s.replace(/,/g, '') : s.replace(',', '.');
  else if (ld >= 0) {
    if ((s.match(/\./g) || []).length > 1) s = s.replace(/\./g, '');
    // 1.500 → binlik ayracı; ama 0.500 ondalıktır
    else if (/^[1-9]\d{0,2}\.\d{3}$/.test(s)) s = s.replace('.', '');
  }
  const n = Number(s);
  return Number.isFinite(n) ? (neg ? -n : n) : NaN;
}

/** Miktar alanını sayıya çevirir; boşsa null, hatalıysa Türkçe hata fırlatır. */
export function parseAmount(raw, label = 'Miktar') {
  const s = String(raw ?? '').trim().replace(/\s+/g, ' ');
  if (!s) return null;
  const bad = () => new Error(`${label} okunamadı. Rakam, kesir (1/2) veya ondalık (1,5) yazın; harf ve sembolleri silip tekrar deneyin.`);
  let v = NaN;
  let m;
  if ((m = s.match(/^(\d+)?\s*([½⅓⅔¼¾⅛⅜⅝⅞])$/))) v = Number(m[1] || 0) + UNI[m[2]];
  else if ((m = s.match(/^(\d+) (\d+)\/(\d+)$/))) { if (Number(m[3]) === 0) throw bad(); v = Number(m[1]) + Number(m[2]) / Number(m[3]); }
  else if ((m = s.match(/^(\d+)\/(\d+)$/))) { if (Number(m[2]) === 0) throw bad(); v = Number(m[1]) / Number(m[2]); }
  else {
    if (/[^0-9.,+\- ]/.test(s)) throw bad();
    v = parseDecimal(s.replace(/ /g, ''));
  }
  if (!Number.isFinite(v)) throw bad();
  if (v <= 0) throw new Error(`${label} sıfırdan büyük olmalı. Pozitif bir sayı yazın (örn. 1,5).`);
  if (v > 1e9) throw new Error(`${label} çok büyük. Mutfak ölçüsü olarak makul bir değer yazın.`);
  return v;
}

/* ---------- Biçimleme ---------- */
const nfCache = new Map();
function nf(d) {
  if (!nfCache.has(d)) nfCache.set(d, new Intl.NumberFormat('tr-TR', { maximumFractionDigits: d }));
  return nfCache.get(d);
}
/** Büyüklüğe göre makul basamak: 250 → "250", 45,5 → "45,5", 2,27 → "2,27". */
export function fmtNum(v) {
  const a = Math.abs(v);
  const d = a >= 100 ? 0 : a >= 10 ? 1 : a >= 1 ? 2 : 3;
  return nf(d).format(v);
}

const FRACS = [[0, ''], [1 / 4, '¼'], [1 / 3, '⅓'], [1 / 2, '½'], [2 / 3, '⅔'], [3 / 4, '¾'], [1, '']];
/** Değeri en yakın pratik kesre yuvarlar: 2,27 → "2 ¼". Çok küçükse null. */
export function toFraction(x) {
  if (!(x >= 0.125)) return null;
  let whole = Math.floor(x);
  const frac = x - whole;
  let best = FRACS[0];
  for (const c of FRACS) if (Math.abs(c[0] - frac) < Math.abs(best[0] - frac)) best = c;
  if (best[0] === 1) { whole += 1; best = FRACS[0]; }
  const text = whole === 0 ? best[1] : (best[1] ? `${whole} ${best[1]}` : String(whole));
  // Yuvarlama payı %5'ten büyükse kesir yanıltıcı olur (örn. 0,833 → ¾); ipucu verilmez.
  return Math.abs(whole + best[0] - x) / x <= 0.05 ? text : null;
}

/* ---------- Dönüşüm çekirdeği ---------- */
/**
 * value birimdeki miktarı ml ve g cinsine çevirir.
 * ing yoksa gram↔ml bilinmez (null). ing.g: 1 su bardağı (200 ml) için gram.
 */
export function convert(value, unitKey, ing) {
  const u = UNITS[unitKey];
  const dens = ing ? ing.g / CUP_ML : null; // g/ml
  let ml = null; let g = null;
  if (u.kind === 'vol') { ml = value * u.f; if (dens) g = ml * dens; }
  else { g = value * u.f; if (dens) ml = g / dens; }
  return { ml, g };
}

/** Tüm birimler için satır listesi: [{key, unit, value}] (hesaplanamayanlar atlanır). */
export function allRows(ml, g) {
  const rows = [];
  for (const [key, unit] of Object.entries(UNITS)) {
    const base = unit.kind === 'vol' ? ml : g;
    if (base == null) continue;
    rows.push({ key, unit, value: base / unit.f });
  }
  return rows;
}

const lower = (s) => s.toLocaleLowerCase('tr');

/** Saf hesap: ham giriş → sonuç nesnesi ya da null (miktar boşsa). */
export function compute(rawAmount, unitKey, ing) {
  const value = parseAmount(rawAmount, 'Miktar');
  if (value === null) return null;
  const u = UNITS[unitKey];
  const { ml, g } = convert(value, unitKey, ing);
  const rows = allRows(ml, g);
  const amountTxt = fmtNum(value);
  const ingTxt = ing ? ` ${lower(ing.ad)}` : '';
  let headline; let range = '';
  if (u.kind === 'vol') {
    if (ing) {
      headline = `${amountTxt} ${u.word}${ingTxt} ≈ ${fmtNum(g)} g`;
      if (ing.max > ing.min) {
        const k = ml / CUP_ML;
        range = `Yaklaşık değerdir: kaynaklara ve markaya göre bu miktar ${fmtNum(ing.min * k)}–${fmtNum(ing.max * k)} g arasında değişebilir.`;
      } else range = 'Su için 1 ml = 1 g kabul edilir.';
    } else {
      headline = `${amountTxt} ${u.word} = ${fmtNum(ml)} ml`;
      range = 'Gram karşılığını görmek için "Malzeme" listesinden bir malzeme seçin.';
    }
  } else if (ing) {
    headline = `${amountTxt} ${u.word}${ingTxt} ≈ ${fmtNum(ml / CUP_ML)} su bardağı (${fmtNum(ml)} ml)`;
    range = 'Yaklaşık değerdir: malzemenin yoğunluğu eleme, sıkıştırma ve markaya göre değişir.';
  } else {
    headline = `${amountTxt} ${u.word} = ${fmtNum(g)} g`;
    range = 'Hacim ölçülerine (bardak, kaşık) çevirmek için "Malzeme" listesinden bir malzeme seçin.';
  }
  return { value, ml, g, rows, headline, range, approx: Boolean(ing) };
}

/* ---------- Arayüz ---------- */
if (typeof document !== 'undefined' && $('amount')) {
  const unitSel = $('unit'); const ingSel = $('ing');
  let ingredients = [];
  let lastText = '';

  for (const [key, u] of Object.entries(UNITS)) unitSel.append(new Option(u.name, key));
  unitSel.value = 'sb';

  function renderRows(listEl, rows, inputKey, strongKeys) {
    listEl.replaceChildren();
    for (const r of rows) {
      const row = document.createElement('div');
      row.className = 'mo-row' + (strongKeys.includes(r.key) ? ' is-strong' : '') + (r.key === inputKey ? ' is-input' : '');
      row.dataset.unit = r.key;
      const dt = document.createElement('dt'); dt.textContent = r.unit.name;
      const dd = document.createElement('dd'); dd.textContent = fmtNum(r.value);
      if (r.unit.frac && Math.abs(r.value - Math.round(r.value)) > 0.02) {
        const f = toFraction(r.value);
        if (f) { const s = document.createElement('span'); s.className = 'mo-frac'; s.textContent = ` ≈ ${f}`; dd.append(s); }
      }
      row.append(dt, dd); listEl.append(row);
    }
  }

  function update() {
    $('copy-status').textContent = '';
    try {
      const ing = ingredients.find((i) => i.id === ingSel.value) || null;
      const r = compute($('amount').value, unitSel.value, ing);
      showError($('error'), '');
      if (!r) { $('result').classList.remove('is-active'); lastText = ''; return; }
      $('headline').textContent = r.headline;
      $('range').textContent = r.range;
      renderRows($('rows-vol'), r.rows.filter((x) => x.unit.kind === 'vol'), unitSel.value, ['ml']);
      renderRows($('rows-wt'), r.rows.filter((x) => x.unit.kind === 'wt'), unitSel.value, ['g']);
      $('grp-vol').hidden = !$('rows-vol').children.length;
      $('grp-wt').hidden = !$('rows-wt').children.length;
      const pick = (k) => { const x = r.rows.find((y) => y.key === k); return x ? `${x.unit.name}: ${fmtNum(x.value)}` : null; };
      lastText = [r.headline, ...['ml', 'sb', 'yk', 'tk', 'ck', 'g', 'oz'].map(pick).filter(Boolean), r.approx ? 'Gram değerleri yaklaşıktır.' : '', 'Bilişim Ajans – Mutfak Ölçü Dönüştürücü: https://araclar.bilisimajans.com/mutfak-olcu-donustur/']
        .filter(Boolean).join('\n');
      $('result').classList.add('is-active');
    } catch (e) {
      $('result').classList.remove('is-active'); lastText = '';
      showError($('error'), e.message);
    }
  }

  for (const el of [$('amount'), unitSel, ingSel]) { el.addEventListener('input', update); el.addEventListener('change', update); }
  $('form').addEventListener('submit', (e) => { e.preventDefault(); update(); });
  $('copy').addEventListener('click', async () => {
    if (!lastText) { $('copy-status').textContent = 'Kopyalanacak sonuç yok; önce bir miktar yazın.'; return; }
    try { await navigator.clipboard.writeText(lastText); $('copy-status').textContent = 'Sonuç kopyalandı.'; }
    catch { $('copy-status').textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayabilirsiniz.'; }
  });

  /** Malzeme tablosunu yükler ve listeyi gruplayarak doldurur. */
  async function init() {
    try {
      const res = await fetch(new URL('./malzemeler.json', import.meta.url));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      ingredients = await res.json();
      const groups = new Map();
      for (const it of ingredients) { if (!groups.has(it.grup)) groups.set(it.grup, []); groups.get(it.grup).push(it); }
      for (const [name, items] of groups) {
        const og = document.createElement('optgroup'); og.label = name;
        items.forEach((it) => og.append(new Option(it.ad, it.id)));
        ingSel.append(og);
      }
      ingSel.value = 'un';
    } catch {
      $('load-note').textContent = 'Malzeme tablosu yüklenemedi; hacim ölçüleri yine de çalışır. Sayfayı yenileyin veya bağlantınızı kontrol edin.';
    }
    ingSel.dataset.ready = '1';
    update();
  }
  init();
}
