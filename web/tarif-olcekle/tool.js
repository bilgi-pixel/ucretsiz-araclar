// Tarif Ölçekle — tamamı tarayıcıda çalışır; tarif metni sunucuya gitmez, hiçbir yerde saklanmaz.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

/* ---------- Metin yardımcıları ---------- */
const FOLD = { 'ğ': 'g', 'Ğ': 'g', 'ı': 'i', 'İ': 'i', 'I': 'i', 'ş': 's', 'Ş': 's', 'ö': 'o', 'Ö': 'o', 'ü': 'u', 'Ü': 'u', 'ç': 'c', 'Ç': 'c' };
/** Türkçe karakterleri sadeleştirip küçültür; uzunluk korunur, böylece indeksler orijinal metinle eşleşir. */
export const fold = (s) => s.replace(/[ğĞıİIşŞöÖüÜçÇ]/g, (c) => FOLD[c]).toLowerCase();

const nfCache = new Map();
function nf(min, max) {
  const k = `${min}-${max}`;
  if (!nfCache.has(k)) nfCache.set(k, new Intl.NumberFormat('tr-TR', { minimumFractionDigits: min, maximumFractionDigits: max }));
  return nfCache.get(k);
}
/** En fazla 2 ondalık, sondaki sıfırlar atılır: 3,5 / 0,88 / 12. */
export const fmtDec = (v) => nf(0, 2).format(Math.abs(v) < 1e-9 ? 0 : v);
const fmtFactor = (v) => nf(0, 3).format(v);

/* ---------- Sayı ayrıştırma (porsiyon, çarpan, kalıp ölçüsü alanları) ---------- */
const UNI = { '½': 0.5, '⅓': 1 / 3, '⅔': 2 / 3, '¼': 0.25, '¾': 0.75, '⅛': 0.125, '⅜': 0.375, '⅝': 0.625, '⅞': 0.875 };

function parseDecimal(s) {
  const lc = s.lastIndexOf(','); const ld = s.lastIndexOf('.');
  if (lc >= 0 && ld >= 0) s = lc > ld ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  else if (lc >= 0) s = (s.match(/,/g) || []).length > 1 ? s.replace(/,/g, '') : s.replace(',', '.');
  else if (ld >= 0) {
    if ((s.match(/\./g) || []).length > 1) s = s.replace(/\./g, '');
    // 1.500 → binlik ayracı; 0.500 ve 1.5 ondalıktır
    else if (/^[1-9]\d{0,2}\.\d{3}$/.test(s)) s = s.replace('.', '');
  }
  return Number(s);
}

/** Pozitif sayı bekler (1,5 / 1.5 / 1/2 / 1 1/2 / ½). Boşsa null; hatalıysa Türkçe hata fırlatır. */
export function parseAmount(raw, label) {
  const s = String(raw ?? '').trim().replace(/\s+/g, ' ');
  if (!s) return null;
  const bad = () => new Error(`${label} yalnızca rakam içermeli (örn. 6, 1,5 veya 1/2). Harf ve sembolleri silip tekrar deneyin.`);
  let v = NaN; let m;
  if ((m = s.match(/^(\d+)?\s*([½⅓⅔¼¾⅛⅜⅝⅞])$/))) v = Number(m[1] || 0) + UNI[m[2]];
  else if ((m = s.match(/^(\d+) (\d+)\/(\d+)$/))) { if (!Number(m[3])) throw bad(); v = Number(m[1]) + Number(m[2]) / Number(m[3]); }
  else if ((m = s.match(/^(\d+)\/(\d+)$/))) { if (!Number(m[2])) throw bad(); v = Number(m[1]) / Number(m[2]); }
  else {
    if (/[^0-9.,]/.test(s)) throw bad();
    v = parseDecimal(s);
  }
  if (!Number.isFinite(v)) throw bad();
  if (!(v > 0)) throw new Error(`${label} sıfırdan büyük olmalı. Pozitif bir sayı yazın.`);
  if (v > 1e6) throw new Error(`${label} çok büyük. Makul bir değer yazın.`);
  return v;
}

/* ---------- Pratik kesir yuvarlama ---------- */
/** x'i en yakın pratik kesre (⅛ ¼ ⅓ ½ ⅔ ¾) yuvarlar. Çok küçükse tiny: true döner. */
export function snapFraction(x) {
  let whole = Math.floor(x + 1e-9);
  const f = Math.max(0, x - whole);
  if (whole === 0 && f < 1 / 16) return { value: 0, text: '', tiny: true };
  const cands = whole === 0 ? [] : [[0, '']];
  if (whole === 0 && f < 0.2) cands.push([1 / 8, '⅛']);
  cands.push([1 / 4, '¼'], [1 / 3, '⅓'], [1 / 2, '½'], [2 / 3, '⅔'], [3 / 4, '¾'], [1, '']);
  let best = cands[0];
  for (const c of cands) if (Math.abs(c[0] - f) < Math.abs(best[0] - f)) best = c;
  if (best[0] === 1) { whole += 1; best = [0, '']; }
  const text = whole === 0 ? best[1] : (best[1] ? `${whole} ${best[1]}` : String(whole));
  return { value: whole + best[0], text, tiny: false };
}

/* ---------- Birimler ve satır ayrıştırma ---------- */
// type: frac (kesirle yuvarlanır), metric (g/ml pratik yuvarlama), count (adet), fixed (süre/sıcaklık: ölçeklenmez)
const UNIT_TABLE = [
  ['frac', ['su bardagi', 'cay bardagi', 'kahve fincani', 'yemek kasigi', 'corba kasigi', 'tatli kasigi', 'cay kasigi', 'bardak', 'fincan', 'kasik', 'kase', 'tutam', 'avuc', 'cups', 'cup', 'tbsp', 'tsp', 'kg', 'kilo', 'litre', 'lt', 'l', 'oz', 'lb']],
  ['metric', ['gram', 'gr', 'g', 'ml', 'cl', 'dl']],
  ['count', ['adet', 'tane', 'dis', 'dilim', 'yaprak', 'dal', 'paket', 'bas', 'demet', 'kutu', 'kavanoz', 'parca', 'bag']],
  ['fixed', ['derece', '°c', '°', 'dakika', 'dk', 'saat', 'saniye', 'sn', 'cm', 'mm', 'gun', 'kisilik', 'porsiyon']],
];
const ALIASES = UNIT_TABLE.flatMap(([type, list]) => list.map((a) => ({ a, type }))).sort((x, y) => y.a.length - x.a.length);
// Bölünemeyen sayılan birimler: yalnızca tam sayıya yuvarlanır
const INT_UNITS = new Set(['dis', 'dilim', 'yaprak', 'paket', 'bas', 'demet', 'kutu', 'kavanoz', 'dal', 'parca', 'bag']);

const WORD_NUM = { bir: 1, iki: 2, uc: 3, dort: 4, bes: 5, alti: 6, yedi: 7, sekiz: 8, dokuz: 9, on: 10 };
const UNI_CLASS = '½⅓⅔¼¾⅛⅜⅝⅞';

/** Satırın başındaki miktarı okur: {qty, qty2, len} ya da null. */
function readQuantity(s) {
  let m; const fs = fold(s);
  const num = (t) => parseDecimal(t);
  if ((m = s.match(/^(\d+(?:[.,]\d+)?)\s*[-–—]\s*(\d+(?:[.,]\d+)?)(?![\d/])/))) return { qty: num(m[1]), qty2: num(m[2]), len: m[0].length };
  if ((m = s.match(/^(\d+)\s+(\d+)\/(\d+)(?!\d)/))) { if (!Number(m[3])) return null; return { qty: Number(m[1]) + Number(m[2]) / Number(m[3]), qty2: null, len: m[0].length }; }
  if ((m = s.match(new RegExp(`^(\\d+)?\\s*([${UNI_CLASS}])`)))) return { qty: Number(m[1] || 0) + UNI[m[2]], qty2: null, len: m[0].length };
  if ((m = s.match(/^(\d+)\/(\d+)(?!\d)/))) { if (!Number(m[2])) return null; return { qty: Number(m[1]) / Number(m[2]), qty2: null, len: m[0].length }; }
  if ((m = s.match(/^\d+(?:[.,]\d+)*/))) {
    let qty = num(m[0]); let len = m[0].length;
    const after = fs.slice(len);
    const b = after.match(/^\s+bucuk(?![a-z])/); // "1 buçuk" → 1,5
    if (b) { qty += 0.5; len += b[0].length; }
    if (!Number.isFinite(qty)) return null;
    return { qty, qty2: null, len };
  }
  if ((m = fs.match(/^(yarim|ceyrek)(?![a-z])/))) return { qty: m[1] === 'yarim' ? 0.5 : 0.25, qty2: null, len: m[0].length };
  if ((m = fs.match(/^(bir|iki|uc|dort|bes|alti|yedi|sekiz|dokuz|on)(?![a-z])(\s+bucuk(?![a-z]))?\s+(?=\S)/))) {
    return { qty: WORD_NUM[m[1]] + (m[2] ? 0.5 : 0), qty2: null, len: m[0].length };
  }
  return null;
}

/** Tek satırı ayrıştırır: {orig, qty, qty2, unit, unitText, type, name} ya da miktarsız satır için {orig, qty: null}. */
export function parseLine(line) {
  const orig = line.trim();
  const s = orig.replace(/^[\s\-–•*·]+/, '');
  const q = readQuantity(s);
  if (!q) return { orig, qty: null };
  const rest = s.slice(q.len).replace(/^[\s.:)]+/, '');
  const fr = fold(rest);
  let unit = ''; let unitText = ''; let type = 'count'; let name = rest;
  for (const { a, type: t } of ALIASES) {
    if (!fr.startsWith(a)) continue;
    const next = fr.charAt(a.length);
    if (/[a-z]/.test(next)) continue; // sözcüğün ortası: "gül" ≠ "g"
    unit = a; unitText = rest.slice(0, a.length); type = t;
    name = rest.slice(a.length).replace(/^[\s.:)]+/, '');
    break;
  }
  return { orig, qty: q.qty, qty2: q.qty2, unit, unitText, type, name };
}

const SPICE_RE = /\b(tuz|karabiber|kimyon|pul biber|toz biber|kirmizi biber|isot|baharat|kekik|nane|tarcin|zencefil|zerdecal|sumak|kori|kisnis)\b/;
const LEAVEN_RE = /(kabartma|karbonat|soda|maya)/;

/** Bir satırı çarpanla ölçekler. opts.decimal: kesir yerine ondalık. Dönüş: {text, approx, notes[], scaled} */
export function scaleLine(p, factor, opts = {}) {
  const notes = [];
  if (p.qty === null) return { text: p.orig, approx: false, notes: ['miktar yok; olduğu gibi bırakıldı'], scaled: false };
  if (p.type === 'fixed') return { text: p.orig, approx: false, notes: ['süre, sıcaklık veya ölçü; ölçeklenmedi'], scaled: false };
  const nameFold = fold(p.name);
  const isEgg = /yumurta/.test(nameFold);
  const intOnly = isEgg || INT_UNITS.has(p.unit);

  const one = (q) => {
    const x = q * factor;
    let value; let text; let tiny = false;
    if (p.type === 'frac') {
      if (opts.decimal) { value = Math.round(x * 100) / 100; text = fmtDec(value); }
      else { const r = snapFraction(x); value = r.value; text = r.text; tiny = r.tiny; }
    } else if (p.type === 'metric') {
      value = x >= 100 ? Math.round(x / 5) * 5 : x >= 10 ? Math.round(x) : x >= 1 ? Math.round(x * 2) / 2 : Math.round(x * 10) / 10;
      if (value <= 0) value = 0.1;
      text = fmtDec(value);
    } else { // count
      value = intOnly ? Math.round(x) : Math.round(x * 2) / 2;
      if (value <= 0) value = intOnly ? 1 : 0.5;
      text = opts.decimal ? fmtDec(value) : snapFraction(value).text;
    }
    const approx = !tiny && x > 0 && Math.abs(value - x) / x > 0.02;
    return { x, value, text, tiny, approx };
  };

  const a = one(p.qty);
  const b = p.qty2 != null ? one(p.qty2) : null;
  const parts = [a, b].filter(Boolean);
  const approx = parts.some((r) => r.approx);
  let qtyText = parts.map((r) => r.text).join(' – ');
  let unitPart = p.unitText;
  if (a.tiny && !b) { qtyText = 'bir tutam'; unitPart = ''; notes.push(`çok az (hesaplanan ${fmtDec(a.x)}): bir tutam kullanın`); }
  if (approx) {
    const calc = parts.map((r) => fmtDec(r.x)).join(' – ');
    if (intOnly) notes.push(isEgg ? `yaklaşık: yumurta bölünemez, tam sayıya yuvarlandı (hesaplanan ${calc}). Yumurtayı çırpıp ölçerek tam oranı yakalayabilirsiniz` : `yaklaşık: tam sayıya yuvarlandı (hesaplanan ${calc})`);
    else notes.push(`yaklaşık (hesaplanan ${calc})`);
  }
  if (factor !== 1) {
    if (SPICE_RE.test(nameFold)) notes.push('tuz ve baharatı tadarak ayarlayın');
    if (LEAVEN_RE.test(nameFold)) notes.push('kabartıcıyı dikkatle ölçün; büyük çarpanlarda tarifi iki parti yapmayı düşünün');
  }
  const text = [qtyText, unitPart, p.name].filter(Boolean).join(' ');
  return { text, approx, notes, scaled: true };
}

/* ---------- Kalıp alanı ---------- */
/** Kalıp alanı (cm²). shape: yuvarlak (d1=çap) | kare (d1=kenar) | dikdortgen (d1=en, d2=boy). unit: cm | inc */
export function panArea(shape, d1, d2, unit) {
  const k = unit === 'inc' ? 2.54 : 1;
  const a = d1 * k; const b = (d2 ?? d1) * k;
  if (shape === 'yuvarlak') return Math.PI * (a / 2) ** 2;
  if (shape === 'kare') return a * a;
  return a * b;
}

/** Fırın süresi notu: süre orantılı DEĞİLDİR. */
export function ovenNote(mode, factor) {
  const base = 'Fırın süresi orantılı değildir; süreyi çarpanla çarpmayın. ';
  const check = ' Tarifteki sürenin yaklaşık %75–80\'ine gelince kontrol edin; kekte kürdan, ekmekte alt kısmın sesi ve rengiyle doğrulayın.';
  if (Math.abs(factor - 1) < 1e-9) return 'Çarpan 1: tarifteki süre ve sıcaklık geçerlidir.' + check;
  if (mode === 'kalip') return base + 'Malzeme kalıp alanıyla orantılı çarpıldığı için hamur katmanı yaklaşık aynı kalınlıkta kalır; süre çoğu zaman benzer olur, birkaç dakika sapabilir. Kalıbın yüksekliği farklıysa kalınlık da değişir, bu durumda süre uzar ya da kısalır.' + check;
  if (factor > 1) return base + 'Aynı kalıpta hamur kalınlaşırsa süre uzar ve üstü yanmasın diye sıcaklığı 10–15 °C düşürmek gerekebilir; daha büyük bir kalıba yayarsanız süre kısalır.' + check;
  return base + 'Aynı kalıpta hamur incelirse süre kısalır; daha küçük bir kalıp kullanırsanız süre yaklaşık aynı kalabilir.' + check;
}

/* ---------- Arayüz ---------- */
if (typeof document !== 'undefined' && $('list')) {
  const SAMPLE = '2 su bardağı un\n1 su bardağı toz şeker\n3 yumurta\n1/2 su bardağı sıvı yağ\n1 paket kabartma tozu\n1 çay kaşığı tuz\n250 g tereyağı\n1,5 su bardağı süt';
  let lastText = '';

  /** Kalıp alanı alanlarını okur; boşsa null. */
  function readPan(i, label) {
    const shape = $(`p${i}-shape`).value; const unit = $(`p${i}-unit`).value;
    const d1 = parseAmount($(`p${i}-d1`).value, `${label} ${shape === 'yuvarlak' ? 'çapı' : shape === 'kare' ? 'kenarı' : 'eni'}`);
    const d2 = shape === 'dikdortgen' ? parseAmount($(`p${i}-d2`).value, `${label} boyu`) : null;
    if (d1 === null || (shape === 'dikdortgen' && d2 === null)) return null;
    return { shape, unit, d1, d2, area: panArea(shape, d1, d2, unit) };
  }

  function syncPanLabels() {
    for (const i of [0, 1]) {
      const shape = $(`p${i}-shape`).value;
      $(`p${i}-d1-label`).textContent = shape === 'yuvarlak' ? 'Çap' : shape === 'kare' ? 'Kenar' : 'En';
      $(`p${i}-d2-wrap`).hidden = shape !== 'dikdortgen';
    }
  }

  function syncMode() {
    const mode = $('mode').value;
    $('panel-porsiyon').hidden = mode !== 'porsiyon';
    $('panel-kalip').hidden = mode !== 'kalip';
    $('panel-elle').hidden = mode !== 'elle';
  }

  /** Seçili yönteme göre çarpanı ve başlığı bulur; eksik alan varsa null. */
  function getFactor() {
    const mode = $('mode').value;
    if (mode === 'porsiyon') {
      const p0 = parseAmount($('p-orig').value, 'Özgün porsiyon sayısı');
      const p1 = parseAmount($('p-target').value, 'Hedef porsiyon sayısı');
      if (p0 === null || p1 === null) return null;
      return { mode, factor: p1 / p0, title: `${fmtDec(p0)} porsiyonluk tarif → ${fmtDec(p1)} porsiyon`, how: `Çarpan = hedef porsiyon / özgün porsiyon = ${fmtDec(p1)} / ${fmtDec(p0)} = ${fmtFactor(p1 / p0)}` };
    }
    if (mode === 'elle') {
      const f = parseAmount($('f-manual').value, 'Çarpan');
      if (f === null) return null;
      return { mode, factor: f, title: `Tarif ${fmtFactor(f)} katına ölçekleniyor`, how: `Çarpan = ${fmtFactor(f)} (elle girildi)` };
    }
    const a = readPan(0, 'Özgün kalıp'); const b = readPan(1, 'Hedef kalıp');
    if (!a || !b) return null;
    const ratio = b.area / a.area;
    return { mode, factor: ratio, title: `Kalıp alanı ${nf(0, 0).format(a.area)} cm² → ${nf(0, 0).format(b.area)} cm²`, how: `Çarpan = hedef kalıp alanı / özgün kalıp alanı = ${nf(2, 2).format(ratio)}`, pan: { a, b, ratio } };
  }

  function update() {
    $('copy-status').textContent = '';
    syncPanLabels();
    try {
      const f = getFactor();
      // Kalıp özeti, tarif listesi boş olsa bile görünür
      if (f && f.pan) {
        $('pan-ratio').textContent = nf(2, 2).format(f.pan.ratio);
        $('pan-summary').hidden = false;
        $('pan-areas').textContent = `Özgün kalıp ${nf(0, 0).format(f.pan.a.area)} cm², hedef kalıp ${nf(0, 0).format(f.pan.b.area)} cm².`;
      } else $('pan-summary').hidden = true;

      const lines = $('list').value.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
      showError($('error'), '');
      if (!f || !lines.length) { $('result').classList.remove('is-active'); lastText = ''; return; }
      const parsed = lines.map(parseLine);
      if (!parsed.some((p) => p.qty !== null)) throw new Error('Hiçbir satırda miktar bulunamadı. Her satırı "2 su bardağı un" gibi bir sayıyla başlatın (kesir ve ondalık da olur).');

      const decimal = $('decimal').checked;
      const results = parsed.map((p) => ({ p, r: scaleLine(p, f.factor, { decimal }) }));
      $('r-title').textContent = f.title;
      $('r-how').textContent = f.how;
      const ul = $('r-list'); ul.replaceChildren();
      for (const { p, r } of results) {
        const li = document.createElement('li'); li.className = 'ts-item' + (r.approx ? ' is-approx' : '');
        const nw = document.createElement('span'); nw.className = 'ts-new'; nw.textContent = r.text;
        li.append(nw);
        if (r.scaled) { const old = document.createElement('span'); old.className = 'ts-old'; old.textContent = `özgün: ${p.orig}`; li.append(old); }
        if (r.notes.length) { const n = document.createElement('span'); n.className = 'ts-note'; n.textContent = r.notes.join('; '); li.append(n); }
        ul.append(li);
      }
      const oven = ovenNote(f.mode, f.factor);
      $('oven-text').textContent = oven;
      lastText = [`${f.title} (çarpan ${fmtFactor(f.factor)})`, ...results.map(({ r }) => `- ${r.text}${r.approx ? ' (yaklaşık)' : ''}`), '', oven, 'Bilişim Ajans – Tarif Ölçekle: https://araclar.bilisimajans.com/tarif-olcekle/'].join('\n');
      $('result').classList.add('is-active');
    } catch (e) {
      $('result').classList.remove('is-active'); lastText = '';
      $('pan-summary').hidden = true;
      showError($('error'), e.message);
    }
  }

  for (const el of document.querySelectorAll('#form input, #form select, #form textarea')) {
    el.addEventListener('input', update); el.addEventListener('change', update);
  }
  $('mode').addEventListener('change', syncMode);
  $('form').addEventListener('submit', (e) => { e.preventDefault(); update(); });
  $('sample').addEventListener('click', () => { $('list').value = SAMPLE; update(); $('list').focus(); });
  $('clear').addEventListener('click', () => { $('list').value = ''; update(); $('list').focus(); });
  $('copy').addEventListener('click', async () => {
    if (!lastText) { $('copy-status').textContent = 'Kopyalanacak sonuç yok; önce malzemeleri yazın.'; return; }
    try { await navigator.clipboard.writeText(lastText); $('copy-status').textContent = 'Ölçeklenmiş tarif kopyalandı.'; }
    catch { $('copy-status').textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayabilirsiniz.'; }
  });
  $('print').addEventListener('click', () => {
    if (!lastText) { $('copy-status').textContent = 'Yazdırılacak sonuç yok; önce malzemeleri yazın.'; return; }
    window.print();
  });

  syncMode(); syncPanLabels(); update();
}
