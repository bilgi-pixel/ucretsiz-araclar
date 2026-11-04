// En boy oranı hesaplayıcı — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez.
// Bölümler: oranı bul (EBOB), oran koruyarak yeni boyut, canlı önizleme, kırpma hesabı, hazır boyut tablosu.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const MAX = 1_000_000;

/* ---------- Veri ---------- */
// Bilinen oranlar: [a, b, görünen ad, kullanım alanı]
const STANDARD = [
  [16, 9, '16:9', 'Full HD, 4K, YouTube, TV'],
  [9, 16, '9:16', 'Story, Reels, TikTok, Shorts'],
  [4, 3, '4:3', 'eski TV, sunum, tablet'],
  [3, 4, '3:4', 'dikey fotoğraf, tablet'],
  [1, 1, '1:1', 'kare gönderi, profil görseli'],
  [21, 9, '21:9', 'ultra geniş ekran, sinema'],
  [3, 2, '3:2', '35 mm fotoğraf, DSLR'],
  [2, 3, '2:3', 'dikey fotoğraf, Pinterest'],
  [4, 5, '4:5', 'Instagram dikey gönderi'],
  [5, 4, '5:4', 'eski monitör, 8×10 baskı'],
  [16, 10, '16:10', 'dizüstü ekran'],
  [2, 1, '2:1', 'geniş banner'],
  [191, 100, '1,91:1', 'bağlantı önizleme görseli'],
];

// Sık kullanılan genişlik/yükseklik listesi (aktif orana göre hesaplanır)
const COMMON_SIDES = [3840, 2560, 1920, 1440, 1280, 1080, 720, 640];

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

/** Yazılan metindeki ondalık basamak sayısı (EBOB için tam sayıya ölçeklemekte kullanılır). */
function decimalsOf(raw) {
  const t = String(raw).trim().replace(/\s/g, '');
  if (t.includes(',')) return (t.split(',')[1] || '').length;
  if (/^\d{1,3}(\.\d{3})+$/.test(t)) return 0;
  const i = t.indexOf('.');
  return i < 0 ? 0 : t.length - i - 1;
}

/** Türkçe biçim: virgül ondalık, binlik ayırıcı yok. */
function fmt(n, maxFrac = 2) {
  if (!Number.isFinite(n)) return '–';
  return n.toLocaleString('tr-TR', { maximumFractionDigits: maxFrac, useGrouping: false });
}

function gcd(a, b) { while (b) { [a, b] = [b, a % b]; } return a; }

/** (w, h) → sadeleştirilmiş tam sayı çifti; ondalıklı girişler önce 10^k ile ölçeklenir. */
export function simplify(w, h, decimals = 0) {
  const k = 10 ** Math.min(4, decimals);
  const a = Math.round(w * k);
  const b = Math.round(h * k);
  const g = gcd(a, b) || 1;
  return [a / g, b / g];
}

class InputError extends Error {}

/** Alanı okur: boşsa null, geçersizse Türkçe hata fırlatır. */
function readDim(id, label, example) {
  const raw = $(id).value.trim();
  if (!raw) return null;
  const value = parseNum(raw);
  if (Number.isNaN(value)) {
    throw new InputError(`${label} sayı olarak okunamadı. Yalnızca rakam yazın, ondalık için virgül kullanın (örneğin ${example}); harf ve birim yazmayın.`);
  }
  if (value <= 0) throw new InputError(`${label} sıfırdan büyük olmalı. Örneğin ${example} yazın.`);
  if (value > MAX) throw new InputError(`${label} çok büyük görünüyor (en fazla ${MAX}). Değeri kontrol edin.`);
  return { value, decimals: decimalsOf(raw) };
}

/** Orana en yakın bilinen oran; fark göreli oran farkıdır. */
function nearestStandard(ratio) {
  let best = null;
  for (const [a, b, label, use] of STANDARD) {
    const diff = Math.abs(ratio - a / b) / (a / b);
    if (!best || diff < best.diff) best = { label, use, diff };
  }
  return best;
}

/* ---------- Arayüz ---------- */
function fillRows(dl, rows) {
  dl.replaceChildren(...rows.map(([k, v, strong]) => {
    const div = document.createElement('div');
    div.className = `eb-row${strong ? ' is-strong' : ''}`;
    const dt = document.createElement('dt'); dt.textContent = k;
    const dd = document.createElement('dd'); dd.textContent = v;
    div.append(dt, dd);
    return div;
  }));
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

/* --- SVG önizleme --- */
const NS = 'http://www.w3.org/2000/svg';
const VB_W = 320;
const VB_H = 200;

function svgNode(name, attrs, text) {
  const n = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, String(v));
  if (text != null) n.textContent = text;
  return n;
}

/** Oranı (w/h) 300×170'lik kutuya sığdırır. */
function fit(ratio, boxW = 300, boxH = 170) {
  let w = boxW;
  let h = boxW / ratio;
  if (h > boxH) { h = boxH; w = boxH * ratio; }
  return { w: Math.max(w, 3), h: Math.max(h, 3) };
}

function drawRatio(svg, ratio, label) {
  svg.replaceChildren();
  if (!ratio) return;
  const { w, h } = fit(ratio);
  const x = (VB_W - w) / 2;
  const y = (VB_H - h) / 2;
  svg.append(svgNode('rect', { class: 'eb-outer', x, y, width: w, height: h, rx: 2 }));
  if (w >= 56 && h >= 24) svg.append(svgNode('text', { class: 'eb-text', x: VB_W / 2, y: VB_H / 2, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, label));
}

function drawCrop(svg, sw, sh, cw, ch, label) {
  svg.replaceChildren();
  const { w, h } = fit(sw / sh);
  const x = (VB_W - w) / 2;
  const y = (VB_H - h) / 2;
  svg.append(svgNode('rect', { class: 'eb-outer', x, y, width: w, height: h, rx: 2 }));
  const k = w / sw;
  const iw = Math.max(cw * k, 3);
  const ih = Math.max(ch * k, 3);
  svg.append(svgNode('rect', { class: 'eb-crop', x: x + (w - iw) / 2, y: y + (h - ih) / 2, width: iw, height: ih }));
  if (iw >= 56 && ih >= 24) svg.append(svgNode('text', { class: 'eb-text', x: VB_W / 2, y: VB_H / 2, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, label));
}

/* --- Bölüm 1: oranı bul --- */
const active = { w: null, h: null, label: '', from: null }; // aktif oran: yeni boyut ve önizleme bunu kullanır
let lastEdited = 'w';
const chips = Array.from(document.querySelectorAll('#chips button'));

function setActive(next) {
  Object.assign(active, next || { w: null, h: null, label: '', from: null });
  chips.forEach((b) => b.setAttribute('aria-pressed', String(active.from === 'preset' && active.label === `${b.dataset.a}:${b.dataset.b}`)));
  renderNew();
}

function orientation(ratio) {
  if (ratio > 1.0005) return 'Yatay (geniş)';
  if (ratio < 0.9995) return 'Dikey (uzun)';
  return 'Kare';
}

function renderRatio() {
  showError($('r-error'), '');
  $('r-copy-status').textContent = '';
  try {
    const w = readDim('r-w', 'Genişlik', '1920');
    const h = readDim('r-h', 'Yükseklik', '1080');
    if (!w || !h) {
      $('r-result').hidden = true; $('r-line').textContent = '';
      if (active.from === 'dimensions') setActive(null);
      return;
    }
    const [a, b] = simplify(w.value, h.value, Math.max(w.decimals, h.decimals));
    const ratio = w.value / h.value;
    const known = nearestStandard(ratio);
    const rows = [
      ['Ondalık oran (genişlik ÷ yükseklik)', fmt(ratio, 2), false],
      ['Tersi (yükseklik ÷ genişlik)', fmt(1 / ratio, 2), false],
      ['Yön', orientation(ratio), false],
    ];
    if (known.diff <= 0.0001) rows.push(['Bilinen oran', `${known.label} — ${known.use}`, false]);
    else if (known.diff <= 0.03) rows.push(['Bilinen oran', `Yaklaşık ${known.label} (%${fmt(known.diff * 100, 2)} fark) — ${known.use}`, false]);
    $('r-big').textContent = `${a}:${b}`;
    fillRows($('r-rows'), rows);
    $('r-line').textContent = `${fmt(w.value, 4)} × ${fmt(h.value, 4)} → ${a}:${b} (${fmt(ratio, 2)})`;
    $('r-result').hidden = false;
    setActive({ w: w.value, h: h.value, label: `${a}:${b}`, from: 'dimensions' });
  } catch (err) {
    if (!(err instanceof InputError)) throw err;
    $('r-result').hidden = true; $('r-line').textContent = '';
    showError($('r-error'), err.message);
  }
}

/* --- Bölüm 2: oran koruyarak yeni boyut --- */
function renderNew() {
  showError($('n-error'), '');
  const ratio = active.w ? active.w / active.h : null;
  drawRatio($('preview'), ratio, active.label);
  $('preview').setAttribute('aria-label', ratio ? `${active.label} oranlı dikdörtgen önizlemesi` : 'Önizleme yok');
  $('preview-cap').textContent = ratio ? `Önizleme: ${active.label} oranı, ${orientation(ratio).toLowerCase()}.` : 'Önizleme için bir oran belirleyin.';
  $('active-label').textContent = ratio
    ? `Kullanılan oran: ${active.label}${active.from === 'preset' ? ' (hazır oran)' : ' (yukarıda yazdığınız boyutlardan)'}`
    : 'Önce bir oran belirleyin: yukarıya genişlik ve yüksekliği yazın ya da hazır oranlardan birini seçin.';
  renderSizes(ratio);
  if (!ratio) { $('n-line').textContent = ''; return; }
  try {
    const fromW = lastEdited === 'w';
    const src = readDim(fromW ? 'n-w' : 'n-h', fromW ? 'Yeni genişlik' : 'Yeni yükseklik', fromW ? '1280' : '720');
    const dst = $(fromW ? 'n-h' : 'n-w');
    if (!src) { dst.value = ''; $('n-line').textContent = ''; return; }
    const out = fromW ? (src.value * active.h) / active.w : (src.value * active.w) / active.h;
    dst.value = fmt(out, 2);
    const w = fromW ? src.value : out;
    const h = fromW ? out : src.value;
    let line = `${fmt(w)} × ${fmt(h)} (${active.label})`;
    if (Math.abs(w - Math.round(w)) > 1e-9 || Math.abs(h - Math.round(h)) > 1e-9) {
      line += ` · piksel için yuvarlanmış: ${Math.round(w)} × ${Math.round(h)}`;
    }
    $('n-line').textContent = line;
  } catch (err) {
    if (!(err instanceof InputError)) throw err;
    ($(lastEdited === 'w' ? 'n-h' : 'n-w')).value = '';
    $('n-line').textContent = '';
    showError($('n-error'), err.message);
  }
}

/** Aktif orana göre sık kullanılan boyutlar listesi. */
function renderSizes(ratio) {
  const list = $('size-list');
  if (!ratio) { list.replaceChildren(); return; }
  const portrait = ratio < 1;
  const items = COMMON_SIDES.map((side) => {
    const other = portrait ? side * ratio : side / ratio;
    const w = portrait ? other : side;
    const h = portrait ? side : other;
    const exact = Math.abs(other - Math.round(other)) < 1e-9;
    const li = document.createElement('li');
    li.textContent = exact ? `${Math.round(w)} × ${Math.round(h)}` : `≈ ${Math.round(w)} × ${Math.round(h)}`;
    return li;
  });
  list.replaceChildren(...items);
}

/* --- Bölüm 3: kırpma hesabı --- */
function readTarget() {
  const v = $('k-preset').value;
  if (v === 'ozel') {
    const a = readDim('k-ra', 'Hedef oranın genişliği', '4');
    const b = readDim('k-rb', 'Hedef oranın yüksekliği', '5');
    if (!a || !b) return null;
    return { a: a.value, b: b.value, label: `${fmt(a.value, 4)}:${fmt(b.value, 4)}` };
  }
  const [a, b] = v.split(':').map(Number);
  return { a, b, label: v.replace('.', ',') };
}

function renderCrop() {
  showError($('k-error'), '');
  $('k-copy-status').textContent = '';
  $('k-custom').hidden = $('k-preset').value !== 'ozel';
  try {
    const w = readDim('k-w', 'Görsel genişliği', '4000');
    const h = readDim('k-h', 'Görsel yüksekliği', '3000');
    const t = readTarget();
    if (!w || !h || !t) { $('k-result').hidden = true; $('k-line').textContent = ''; $('crop-svg').replaceChildren(); return; }
    const sw = w.value;
    const sh = h.value;
    const sameRatio = Math.abs(sw * t.b - sh * t.a) / (sh * t.a) < 1e-4;
    if (sameRatio) {
      fillRows($('k-rows'), [['Durum', `Görsel zaten ${t.label} oranında; kırpmaya gerek yok.`, true]]);
      $('k-line').textContent = `${fmt(sw)} × ${fmt(sh)} görsel zaten ${t.label} oranında.`;
      drawCrop($('crop-svg'), sw, sh, sw, sh, t.label);
    } else {
      const wider = sw * t.b > sh * t.a; // kaynak hedeften daha geniş mi?
      // Küçük bir pay (1e-6) ondalık yuvarlama gürültüsünün tam sayıyı bir eksik bırakmasını önler.
      const cw = wider ? Math.floor((sh * t.a) / t.b + 1e-6) : sw;
      const ch = wider ? sh : Math.floor((sw * t.b) / t.a + 1e-6);
      const lost = wider ? sw - cw : sh - ch;
      const lostPct = (lost / (wider ? sw : sh)) * 100;
      const x = Math.floor((sw - cw) / 2);
      const y = Math.floor((sh - ch) / 2);
      const canvasW = wider ? sw : Math.ceil((sh * t.a) / t.b - 1e-6);
      const canvasH = wider ? Math.ceil((sw * t.b) / t.a - 1e-6) : sh;
      const pad = wider ? canvasH - sh : canvasW - sw;
      const side = wider ? 'üst ve alta' : 'sağa ve sola';
      fillRows($('k-rows'), [
        ['Kırpma sonrası boyut', `${fmt(cw, 0)} × ${fmt(ch, 0)} piksel`, true],
        ['Hedef oran', t.label, false],
        ['Kırpılan miktar', `${wider ? 'Genişlikten' : 'Yükseklikten'} ${fmt(lost, 0)} piksel (%${fmt(lostPct, 1)}); ortalı kırpmada her kenardan ${fmt(lost / 2, 1)} piksel`, false],
        ['Ortalı kırpma başlangıcı', `x = ${x}, y = ${y} piksel`, false],
        ['Kırpmadan sığdırma', `${fmt(canvasW, 0)} × ${fmt(canvasH, 0)} piksellik tuval (${side} toplam ${fmt(pad, 0)} piksel boşluk)`, false],
      ]);
      $('k-line').textContent = `${fmt(sw)} × ${fmt(sh)} görsel ${t.label} oranına kırpılınca ${fmt(cw, 0)} × ${fmt(ch, 0)} piksel kalır.`;
      drawCrop($('crop-svg'), sw, sh, cw, ch, t.label);
    }
    $('k-result').hidden = false;
  } catch (err) {
    if (!(err instanceof InputError)) throw err;
    $('k-result').hidden = true; $('k-line').textContent = '';
    showError($('k-error'), err.message);
  }
}

/* --- Olaylar --- */
['r-w', 'r-h'].forEach((id) => $(id).addEventListener('input', renderRatio));
chips.forEach((b) => b.addEventListener('click', () => {
  setActive({ w: Number(b.dataset.a), h: Number(b.dataset.b), label: `${b.dataset.a}:${b.dataset.b}`, from: 'preset' });
}));
$('n-w').addEventListener('input', () => { lastEdited = 'w'; renderNew(); });
$('n-h').addEventListener('input', () => { lastEdited = 'h'; renderNew(); });
['k-w', 'k-h', 'k-ra', 'k-rb'].forEach((id) => $(id).addEventListener('input', renderCrop));
$('k-preset').addEventListener('change', renderCrop);
$('r-copy').addEventListener('click', () => copyText($('r-line').textContent, $('r-copy-status')));
$('k-copy').addEventListener('click', () => copyText($('k-line').textContent, $('k-copy-status')));

// Hazır boyut tablosundaki "Hesapla" düğmeleri: boyutu oran bulucuya aktarır.
document.querySelectorAll('button[data-w]').forEach((b) => b.addEventListener('click', () => {
  $('r-w').value = b.dataset.w;
  $('r-h').value = b.dataset.h;
  renderRatio();
  $('r-w').focus({ preventScroll: true });
  $('r-w').scrollIntoView({ block: 'center', behavior: 'smooth' });
}));

renderRatio();
renderCrop();
