// DPI / PPI hesaplayıcı — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez.
// Üç mod: piksel → cm/inç, cm/mm/inç → piksel, ekran PPI. Ayrıca "fotoğrafım kaç cm basılır?" hızlı cevabı.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const CM_PER_INCH = 2.54;
const MAX_PX = 1_000_000;

/* ---------- Veri ---------- */
// Baskı boyutları: [ad, kısa kenar cm, uzun kenar cm]
const PAPERS = [
  ['A3', 29.7, 42],
  ['A4', 21, 29.7],
  ['A5', 14.8, 21],
  ['10 × 15 cm', 10, 15],
  ['13 × 18 cm', 13, 18],
  ['Vesikalık 4,5 × 6 cm', 4.5, 6],
  ['Biyometrik 5 × 6 cm', 5, 6],
];

// Ekran örnekleri: [ad, genişlik px, yükseklik px, köşegen inç]
const DEVICES = [
  ['Monitör 21,5″ Full HD', 1920, 1080, 21.5],
  ['Monitör 24″ Full HD', 1920, 1080, 24],
  ['Monitör 27″ Full HD', 1920, 1080, 27],
  ['Monitör 27″ QHD', 2560, 1440, 27],
  ['Monitör 27″ 4K', 3840, 2160, 27],
  ['Monitör 32″ 4K', 3840, 2160, 32],
  ['Dizüstü 15,6″ Full HD', 1920, 1080, 15.6],
  ['Dizüstü 13,3″ 2560 × 1600', 2560, 1600, 13.3],
  ['TV 55″ 4K', 3840, 2160, 55],
  ['Tablet 10,9″', 2360, 1640, 10.9],
  ['Telefon 6,1″', 2556, 1179, 6.1],
  ['Telefon 6,7″', 2796, 1290, 6.7],
];

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

/** Türkçe biçim: virgül ondalık, binlik ayırıcı yok (piksel sayıları karışmasın). */
function fmt(n, maxFrac = 2) {
  if (!Number.isFinite(n)) return '–';
  return n.toLocaleString('tr-TR', { maximumFractionDigits: maxFrac, useGrouping: false });
}
const px = (n) => String(Math.round(n));

class InputError extends Error {}

/** Alanı okur: boşsa null, geçersizse Türkçe hata fırlatır. */
function readPositive(id, label, example, { max = MAX_PX } = {}) {
  const raw = $(id).value.trim();
  if (!raw) return null;
  const v = parseNum(raw);
  if (Number.isNaN(v)) {
    throw new InputError(`${label} sayı olarak okunamadı. Yalnızca rakam yazın, ondalık için virgül kullanın (örneğin ${example}); harf ve birim yazmayın.`);
  }
  if (v <= 0) throw new InputError(`${label} sıfırdan büyük olmalı. Örneğin ${example} yazın.`);
  if (v > max) throw new InputError(`${label} çok büyük görünüyor (en fazla ${fmt(max, 0)}). Değeri kontrol edin; birimi yanlış seçmiş olabilirsiniz.`);
  return v;
}

function gcd(a, b) { while (b) { [a, b] = [b, a % b]; } return a; }

/* ---------- Modlar ---------- */
function computeA() {
  const w = readPositive('a-w', 'Genişlik (piksel)', '3000');
  const h = readPositive('a-h', 'Yükseklik (piksel)', '2000');
  const dpi = readPositive('a-dpi', 'DPI', '300', { max: 100000 });
  if (w == null || dpi == null) return null;
  const size = (p) => { const inch = p / dpi; return { inch, cm: inch * CM_PER_INCH, mm: inch * CM_PER_INCH * 10 }; };
  const sw = size(w);
  const line = (s) => `${fmt(s.cm)} cm · ${fmt(s.mm)} mm · ${fmt(s.inch)} inç`;
  const rows = [['Genişlik', line(sw), true]];
  let summary = `${px(w)} px, ${fmt(dpi)} DPI'da ${fmt(sw.cm)} cm (${fmt(sw.inch)} inç) genişliğinde basılır.`;
  if (h != null) {
    const sh = size(h);
    rows.push(['Yükseklik', line(sh), true]);
    rows.push(['Görsel boyutu', `${fmt((w * h) / 1e6)} megapiksel`, false]);
    summary = `${px(w)} × ${px(h)} px, ${fmt(dpi)} DPI'da ${fmt(sw.cm)} × ${fmt(sh.cm)} cm (${fmt(sw.inch)} × ${fmt(sh.inch)} inç) basılır.`;
  }
  rows.push(['Baskı yoğunluğu', `${fmt(dpi / CM_PER_INCH)} piksel / cm`, false]);
  return { title: 'Baskı boyutu', rows, summary };
}

function computeB() {
  const w = readPositive('b-w', 'Genişlik', '21', { max: 100000 });
  const h = readPositive('b-h', 'Yükseklik', '29,7', { max: 100000 });
  const dpi = readPositive('b-dpi', 'DPI', '300', { max: 100000 });
  if (w == null || dpi == null) return null;
  const unit = $('b-unit').value;
  const unitLabel = { cm: 'cm', mm: 'mm', in: 'inç' }[unit];
  const toInch = (v) => (unit === 'cm' ? v / CM_PER_INCH : unit === 'mm' ? v / (CM_PER_INCH * 10) : v);
  const pxW = toInch(w) * dpi;
  const exact = (p) => (Math.abs(p - Math.round(p)) < 1e-9 ? '' : ` (tam değer ${fmt(p)})`);
  const rows = [['Gereken genişlik', `${px(pxW)} piksel${exact(pxW)}`, true]];
  let summary = `${fmt(w)} ${unitLabel}, ${fmt(dpi)} DPI'da ${px(pxW)} piksel gerektirir.`;
  if (h != null) {
    const pxH = toInch(h) * dpi;
    rows.push(['Gereken yükseklik', `${px(pxH)} piksel${exact(pxH)}`, true]);
    rows.push(['Toplam', `${fmt((Math.round(pxW) * Math.round(pxH)) / 1e6)} megapiksel`, false]);
    summary = `${fmt(w)} × ${fmt(h)} ${unitLabel}, ${fmt(dpi)} DPI'da ${px(pxW)} × ${px(pxH)} piksel gerektirir.`;
  }
  rows.push(['Baskı yoğunluğu', `${fmt(dpi / CM_PER_INCH)} piksel / cm`, false]);
  return { title: 'Gereken piksel', rows, summary };
}

/** Kabaca keskinlik sınıfı (mesafeye göre değişir). */
function densityClass(ppi) {
  if (ppi < 100) return 'Düşük (yakından pikseller fark edilir)';
  if (ppi < 160) return 'Orta';
  if (ppi < 220) return 'Yüksek';
  return 'Çok yüksek (retina sınıfı)';
}

function computeC() {
  const w = readPositive('c-w', 'Genişlik (piksel)', '1920');
  const h = readPositive('c-h', 'Yükseklik (piksel)', '1080');
  const d = readPositive('c-d', 'Köşegen (inç)', '27', { max: 1000 });
  if (w == null || h == null || d == null) return null;
  const ppi = Math.hypot(w, h) / d;
  const wIn = w / ppi;
  const hIn = h / ppi;
  const g = gcd(Math.round(w), Math.round(h));
  const rows = [
    ['Ekran yoğunluğu', `${fmt(ppi)} PPI`, true],
    ['Piksel boyutu', `${fmt(CM_PER_INCH * 10 / ppi, 4)} mm`, false],
    ['Piksel yoğunluğu', `${fmt(ppi / CM_PER_INCH)} piksel / cm`, false],
    ['Ekran ölçüsü', `${fmt(wIn * CM_PER_INCH)} × ${fmt(hIn * CM_PER_INCH)} cm (${fmt(wIn)} × ${fmt(hIn)} inç)`, false],
    ['Çözünürlük', `${fmt((w * h) / 1e6)} megapiksel · ${Math.round(w / g)}:${Math.round(h / g)}`, false],
    ['Keskinlik (kabaca)', densityClass(ppi), false],
  ];
  return { title: 'Ekran PPI sonucu', rows, summary: `${px(w)} × ${px(h)} piksel, ${fmt(d)} inç köşegen: ${fmt(ppi)} PPI.` };
}

const MODES = { a: computeA, b: computeB, c: computeC };

/* ---------- Arayüz ---------- */
const el = {
  error: $('error'), result: $('result'), title: $('r-title'), rows: $('r-rows'), line: $('r-line'), status: $('copy-status'),
};

function currentMode() { return document.querySelector('input[name="mode"]:checked').value; }

/** Sonuç satırlarını (dl) çizer. */
function fillRows(dl, rows) {
  dl.replaceChildren(...rows.map(([k, v, strong]) => {
    const div = document.createElement('div');
    div.className = `dpi-row${strong ? ' is-strong' : ''}`;
    const dt = document.createElement('dt'); dt.textContent = k;
    const dd = document.createElement('dd'); dd.textContent = v;
    div.append(dt, dd);
    return div;
  }));
}

function render() {
  showError(el.error, '');
  el.status.textContent = '';
  try {
    const res = MODES[currentMode()]();
    if (!res) { el.result.hidden = true; el.line.textContent = ''; return; }
    el.title.textContent = res.title;
    fillRows(el.rows, res.rows);
    el.line.textContent = res.summary;
    el.result.hidden = false;
  } catch (err) {
    if (!(err instanceof InputError)) throw err;
    el.result.hidden = true; el.line.textContent = '';
    showError(el.error, err.message);
  }
}

function showMode() {
  const m = currentMode();
  for (const id of ['a', 'b', 'c']) $(`panel-${id}`).hidden = id !== m;
  $('devices-wrap').hidden = m !== 'c'; // örnek ekran tablosu yalnızca PPI modunda görünür
  render();
}

/** Panoya kopyalar; izin yoksa gizli bir alan üzerinden dener. */
async function copyText(text, statusEl) {
  if (!text) { statusEl.textContent = 'Kopyalanacak bir sonuç yok. Önce değerleri yazın.'; return; }
  try {
    await navigator.clipboard.writeText(text);
    statusEl.textContent = 'Sonuç kopyalandı.';
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    ta.remove();
    statusEl.textContent = ok ? 'Sonuç kopyalandı.' : 'Kopyalanamadı; sonucu elle seçip kopyalayın.';
  }
}

/* DPI hızlı seçenek düğmeleri (72 / 96 / 150 / 300) */
document.querySelectorAll('.dpi-chips').forEach((group) => {
  const input = $(group.dataset.target);
  const sync = () => {
    const v = parseNum(input.value);
    group.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.dpi) === v)));
  };
  group.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    input.value = b.dataset.dpi;
    sync(); render();
  });
  input.addEventListener('input', sync);
  sync();
});

document.querySelectorAll('input[name="mode"]').forEach((r) => r.addEventListener('change', showMode));
['a-w', 'a-h', 'a-dpi', 'b-w', 'b-h', 'b-dpi', 'c-w', 'c-h', 'c-d'].forEach((id) => $(id).addEventListener('input', render));
$('b-unit').addEventListener('change', render);
$('copy').addEventListener('click', () => copyText(el.line.textContent, el.status));

/* Ekran örnekleri tablosu */
const tbody = $('devices');
for (const [name, w, h, d] of DEVICES) {
  const tr = document.createElement('tr');
  const cells = [name, `${w} × ${h}`, `${fmt(d)}″`, fmt(Math.hypot(w, h) / d)];
  for (const text of cells) { const td = document.createElement('td'); td.textContent = text; tr.appendChild(td); }
  const td = document.createElement('td');
  const b = document.createElement('button');
  b.type = 'button'; b.className = 'ba-btn dpi-small'; b.textContent = 'Uygula';
  b.setAttribute('aria-label', `${name} değerlerini forma uygula`);
  b.addEventListener('click', () => {
    $('c-w').value = String(w); $('c-h').value = String(h); $('c-d').value = fmt(d);
    render();
    $('c-d').focus();
  });
  td.appendChild(b); tr.appendChild(td);
  tbody.appendChild(tr);
}

/* ---------- Hızlı cevap: fotoğrafım X piksel, kaç cm basılır? ---------- */
const qEl = { error: $('q-error'), box: $('q-result'), rows: $('q-rows'), papers: $('q-papers'), line: $('q-line'), status: $('q-status') };

function qualityLabel(dpi) {
  if (dpi >= 300) return 'çok iyi';
  if (dpi >= 200) return 'iyi';
  if (dpi >= 150) return 'kabul edilebilir';
  return 'düşük, pikselleşebilir';
}

/** Fotoğrafın kâğıdı kırparak doldurduğu etkin DPI (kısa/uzun kenarlar eşleştirilir). */
function coverDpi(pw, ph, shortCm, longCm) {
  const [ps, pl] = pw <= ph ? [pw, ph] : [ph, pw];
  return Math.min(ps / (shortCm / CM_PER_INCH), pl / (longCm / CM_PER_INCH));
}

function renderQuick() {
  showError(qEl.error, '');
  qEl.status.textContent = '';
  try {
    const w = readPositive('q-w', 'Genişlik (piksel)', '3000');
    const h = readPositive('q-h', 'Yükseklik (piksel)', '2000');
    if (w == null) { qEl.box.hidden = true; qEl.line.textContent = ''; return; }
    const dims = (dpi) => {
      const cw = (w / dpi) * CM_PER_INCH;
      return h == null ? `${fmt(cw)} cm` : `${fmt(cw)} × ${fmt((h / dpi) * CM_PER_INCH)} cm`;
    };
    const rows = [
      ['300 DPI (en keskin baskı)', dims(300), true],
      ['200 DPI (iyi)', dims(200), false],
      ['150 DPI (geniş izleme, kabul edilebilir)', dims(150), false],
    ];
    fillRows(qEl.rows, rows);
    if (h != null) {
      fillRows(qEl.papers, PAPERS.map(([name, s, l]) => {
        const dpi = coverDpi(w, h, s, l);
        return [name, `${Math.floor(dpi)} DPI · ${qualityLabel(dpi)}`, false];
      }));
      qEl.papers.parentElement.hidden = false;
    } else {
      qEl.papers.parentElement.hidden = true;
    }
    const size = h == null ? `${px(w)} px` : `${px(w)} × ${px(h)} px`;
    qEl.line.textContent = `${size} fotoğraf 300 DPI'da ${dims(300)}, 150 DPI'da ${dims(150)} basılır.`;
    qEl.box.hidden = false;
  } catch (err) {
    if (!(err instanceof InputError)) throw err;
    qEl.box.hidden = true; qEl.line.textContent = '';
    showError(qEl.error, err.message);
  }
}
['q-w', 'q-h'].forEach((id) => $(id).addEventListener('input', renderQuick));
$('q-copy').addEventListener('click', () => copyText(qEl.line.textContent, qEl.status));

showMode();
renderQuick();
