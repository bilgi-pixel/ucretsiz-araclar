// Roma Rakamı Çevirici — saf JS, tamamı tarayıcıda çalışır; girdiler sunucuya gitmez.
import { showError } from '../assets/js/ba.js';

const OVERLINE = '̅'; // birleşik üst çizgi (binler için)
const SYMBOLS = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
const VALUES = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
const STRICT = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

/** 1–3999 arası sayıyı standart Roma rakamına çevirir; aralık dışıysa null. */
export function toRoman(n) {
  if (!Number.isInteger(n) || n < 1 || n > 3999) return null;
  let out = '';
  for (const [v, s] of SYMBOLS) while (n >= v) { out += s; n -= v; }
  return out;
}

/** Her harfin ardına üst çizgi ekler (binler katı). */
export const overline = (s) => [...s].map((c) => c + OVERLINE).join('');

/** 1–3.999.999 arası: binler kısmı üst çizgili, kalan standart. */
export function toRomanBig(n) {
  if (!Number.isInteger(n) || n < 1 || n > 3999999) return null;
  if (n <= 3999) return toRoman(n);
  const th = Math.floor(n / 1000), rest = n % 1000;
  return overline(toRoman(th)) + (rest ? toRoman(rest) : '');
}

/** Gevşek değer (hata açıklaması ve öneri için): soldan sağa, küçük büyükten önce ise çıkarır. */
function looseValue(s) {
  let t = 0;
  for (let i = 0; i < s.length; i++) { const a = VALUES[s[i]], b = VALUES[s[i + 1]] || 0; t += a < b ? -a : a; }
  return t;
}

const ALLOWED_SUB = new Set(['IV', 'IX', 'XL', 'XC', 'CD', 'CM']);
const FOUR_FIX = { I: 'IIII yerine IV (4)', X: 'XXXX yerine XL (40)', C: 'CCCC yerine CD (400)' };

/** Geçersiz dizilim için Türkçe, çözüm öneren açıklama üretir. */
export function explainInvalid(s) {
  const bad = s.match(/[^IVXLCDM]/);
  if (bad) return `"${bad[0]}" bir Roma rakamı değil. Yalnızca I, V, X, L, C, D ve M harfleri kullanılır; boşluk ve noktalama bırakmayın.`;
  const run = s.match(/([IXCM])\1{3,}/);
  if (run) {
    const c = run[1];
    if (c === 'M') return '"MMMM" geçersiz: M en fazla üç kez yazılır (en büyük standart sayı 3999 = MMMCMXCIX). 4000 ve üstü için harflerin üstüne çizgi çekin; "Sayı → Roma" modunda bu gösterimi görebilirsiniz.';
    return `"${run[0]}" geçersiz: ${c} harfi art arda en fazla üç kez yazılır. ${FOUR_FIX[c]} yazın.`;
  }
  const rep = s.match(/([VLD])\1+/);
  if (rep) return `"${rep[0]}" geçersiz: ${rep[1]} harfi tekrar edilemez. ${rep[1]}${rep[1]} yerine ${rep[1] === 'V' ? 'X (10)' : rep[1] === 'L' ? 'C (100)' : 'M (1000)'} yazın.`;
  for (let i = 0; i < s.length - 1; i++) {
    const a = s[i], b = s[i + 1];
    if (VALUES[a] < VALUES[b] && !ALLOWED_SUB.has(a + b)) {
      const why = 'VLD'.includes(a) ? `${a} harfi çıkarma için kullanılamaz` : `${a} yalnızca kendinden en fazla on kat büyük harfin önüne yazılabilir`;
      return `"${a}${b}" geçersiz: ${why}. Çıkarma yalnızca şu çiftlerle yapılır: IV, IX, XL, XC, CD, CM.`;
    }
  }
  const lv = looseValue(s);
  const fix = toRoman(lv);
  return `"${s}" standart kurallara uymuyor (harfler büyükten küçüğe dizilir; çıkarma çiftleri tekrarlanmaz)${fix ? `. Kastedilen değer büyük olasılıkla şu yazımdır: ${fix}` : '.'}`;
}

/** Roma rakamı metnini sayıya çevirir. {value} ya da {error} döner. Üst çizgili (birleşik U+0305) binleri destekler. */
export function fromRoman(input) {
  const raw = String(input || '').replace(/\s+/g, '').replace(/İ/g, 'I').toUpperCase();
  if (!raw) return { error: 'Bir Roma rakamı yazın (örneğin MCMLXXXVII).' };
  let big = '', small = '', afterSmall = false, mixed = false;
  const chars = [...raw];
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    if (c === OVERLINE) continue;
    if (chars[i + 1] === OVERLINE) { big += c; if (afterSmall) mixed = true; } else { small += c; afterSmall = true; }
  }
  // Üst çizgili kısım yalnızca başta olabilir
  if (mixed) return { error: 'Üst çizgili harfler (binler) yazımın başında olmalı; çizgisiz harfler onun ardından gelir.' };
  if (big && !STRICT.test(big)) return { error: explainInvalid(big) };
  if (small && !STRICT.test(small)) return { error: explainInvalid(small) };
  const bigVal = big ? looseValue(big) * 1000 : 0;
  const smallVal = small ? looseValue(small) : 0;
  const value = bigVal + smallVal;
  if (value < 1) return { error: 'Sonuç sıfır çıktı; Roma rakamlarında sıfır yoktur. En az bir geçerli harf yazın.' };
  if (big && small && smallVal > 999) return { error: 'Üst çizgisiz kısım 3999 sınırını aşıyor; binlik harfleri üst çizgiyle yazın.' };
  return { value };
}

/** Ayrıştırma açıklaması: 1987 → M + CM + LXXX + VII. */
export function breakdown(n) {
  if (!Number.isInteger(n) || n < 1 || n > 3999) return '';
  const parts = [];
  let rest = n;
  for (const place of [1000, 100, 10, 1]) {
    const q = Math.floor(rest / place) * place;
    rest -= q;
    if (q) parts.push(`${q} = ${toRoman(q)}`);
  }
  return parts.join(' + ');
}

/** Tarih → Roma ("gün.ay.yıl"). Yıl 1–3999. */
export function dateToRoman(y, m, d) {
  const r = (v) => toRoman(v);
  if (!r(y)) return null;
  return { full: `${r(d)}.${r(m)}.${r(y)}`, mixed: `${d}.${r(m)}.${y}`, mixedYear: `${d}.${m}.${r(y)}` };
}

export const POPULAR_YEARS = [
  [1071, 'Malazgirt Zaferi'], [1299, 'Osmanlı Devleti\'nin kuruluşu (geleneksel)'], [1453, 'İstanbul\'un fethi'], [1881, 'Atatürk\'ün doğum yılı'],
  [1919, '19 Mayıs 1919'], [1923, 'Cumhuriyet\'in ilanı'], [1938, 'Atatürk\'ün vefat yılı'], [1950, ''], [1980, ''], [1999, ''], [2000, ''],
  [2010, ''], [2020, ''], [2024, ''], [2025, ''], [2026, 'Bu yıl'], [2027, ''], [2030, ''], [2050, ''],
];

/* ---------- Arayüz ---------- */
if (typeof document !== 'undefined') {
  const $ = (id) => document.getElementById(id);
  const mode = () => document.querySelector('input[name="mode"]:checked').value;
  const nf = new Intl.NumberFormat('tr-TR');
  let copyText = '';

  const hide = () => { $('result').hidden = true; $('result').classList.remove('is-active'); copyText = ''; };
  function show(big, rows, note) {
    $('r-main').textContent = big;
    copyText = big;
    const dl = $('r-rows');
    dl.textContent = '';
    for (const [k, v] of rows) {
      const row = document.createElement('div'); row.className = 'kdv-row';
      const dt = document.createElement('dt'); dt.textContent = k;
      const dd = document.createElement('dd'); dd.textContent = v; dd.style.whiteSpace = 'normal'; dd.style.textAlign = 'right';
      row.append(dt, dd); dl.append(row);
    }
    $('r-note').textContent = note || '';
    $('result').hidden = false; $('result').classList.add('is-active');
  }

  function compute() {
    showError($('error'), '');
    $('copy-status').textContent = '';
    const m = mode();
    $('box-n').hidden = m !== 'n2r'; $('box-r').hidden = m !== 'r2n'; $('box-d').hidden = m !== 'd2r';
    if (m === 'n2r') {
      const txt = $('num').value.trim().replace(/[.\s]/g, '');
      if (!txt) return hide();
      if (!/^\d+$/.test(txt)) { hide(); return showError($('error'), 'Yalnızca tam sayı yazın (örneğin 1987). Ondalık, eksi işareti ya da harf kullanılamaz.'); }
      const n = parseInt(txt, 10);
      if (n < 1) { hide(); return showError($('error'), 'Roma rakamlarında sıfır ve eksi sayı yoktur. 1 ile 3999 arasında bir sayı yazın.'); }
      if (n > 3999999) { hide(); return showError($('error'), 'En fazla 3.999.999 desteklenir. Daha küçük bir sayı yazın.'); }
      const r = toRomanBig(n);
      if (n <= 3999) show(r, [['Sayı', nf.format(n)], ['Ayrıştırma', breakdown(n)]], '');
      else show(r, [['Sayı', nf.format(n)], ['Binler', `${nf.format(Math.floor(n / 1000))} × 1000`]], 'Standart Roma rakamları 3999\'a kadar gider. 4000 ve üstünde harflerin üstüne çizgi çekmek o harfi 1000 ile çarpar (vinculum). Üst çizgi birleşik karakterle yazıldığından kopyaladığınızda korunur.');
    } else if (m === 'r2n') {
      const txt = $('rom').value;
      if (!txt.trim()) return hide();
      const r = fromRoman(txt);
      if (r.error) { hide(); return showError($('error'), r.error); }
      const canon = r.value <= 3999999 ? toRomanBig(r.value) : '';
      show(nf.format(r.value), [['Standart yazım', canon]], '');
      copyText = String(r.value);
    } else {
      const mt = /^(\d{4,6})-(\d{2})-(\d{2})$/.exec($('ddate').value);
      if (!mt) return hide();
      const y = +mt[1], mo = +mt[2], d = +mt[3];
      const res = y >= 1 && y <= 3999 ? dateToRoman(y, mo, d) : null;
      if (!res) { hide(); return showError($('error'), 'Yıl 1 ile 3999 arasında olmalı. Tarihi takvimden yeniden seçin.'); }
      show(res.full, [['Gün Arap, ay Roma', res.mixed], ['Yalnızca yıl Roma', res.mixedYear], ['Tarih', `${d}.${mo}.${y}`]], '');
    }
  }

  function renderTables() {
    const grid = $('grid100');
    for (let i = 1; i <= 100; i++) {
      const li = document.createElement('li');
      const a = document.createElement('b'); a.textContent = i;
      li.append(a, ' ', toRoman(i));
      grid.append(li);
    }
    const pop = $('popular');
    for (const [y, label] of POPULAR_YEARS) {
      const li = document.createElement('li');
      li.textContent = `${y} = ${toRoman(y)}${label ? ' (' + label + ')' : ''}`;
      pop.append(li);
    }
  }

  for (const id of ['num', 'rom', 'ddate']) $(id).addEventListener('input', compute);
  for (const r of document.querySelectorAll('input[name="mode"]')) r.addEventListener('change', compute);
  $('form').addEventListener('submit', (e) => { e.preventDefault(); compute(); });
  $('copy').addEventListener('click', async () => {
    if (!copyText) return;
    const st = $('copy-status');
    try { await navigator.clipboard.writeText(copyText); st.textContent = 'Sonuç panoya kopyalandı.'; }
    catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
  });
  renderTables();
  compute();
  document.documentElement.dataset.ready = '1';
}
