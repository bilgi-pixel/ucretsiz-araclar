// Etiket ve Fiyat Etiketi Oluşturucu — A4 etiket kâğıdı ızgarası, vektörel PDF (pdf-lib + DejaVu).
// Barkod: JsBarcode (MIT) kodlaması, QR: qrcode (MIT) matrisi; ikisi de PDF'e çubuk/kare olarak çizilir.
// Tek yerleşim fonksiyonu (pageOps) hem canlı önizleme hem PDF için çizim komutları üretir.
// Hiçbir veri ağa gitmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, getPdfLib, loadScript, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const VENDOR = new URL('../vendor/', import.meta.url).href;
const PW = 595.28, PH = 841.89; // A4 dikey (pt)
const MM = 72 / 25.4;
const MAX_LABELS = 2000;

// Hazır ölçüler (mm): cols × rows, etiket w × h, üst/sol boşluk, aralıklar.
const PRESETS = {
  '3x8': { cols: 3, rows: 8, w: 70, h: 37, top: 0.5, left: 0, gx: 0, gy: 0 },
  '2x7': { cols: 2, rows: 7, w: 99.1, h: 38.1, top: 15.15, left: 4.65, gx: 2.5, gy: 0 },
  '4x10': { cols: 4, rows: 10, w: 48.5, h: 25.4, top: 21.5, left: 8, gx: 0, gy: 0 },
  '2x6': { cols: 2, rows: 6, w: 105, h: 48, top: 4.5, left: 0, gx: 0, gy: 0 },
  '4x9': { cols: 4, rows: 9, w: 52, h: 30, top: 13.5, left: 1, gx: 0, gy: 0 },
  '2x4': { cols: 2, rows: 4, w: 105, h: 74.25, top: 0, left: 0, gx: 0, gy: 0 },
};
const FIELDS = { cols: 'p-cols', rows: 'p-rows', w: 'p-w', h: 'p-h', top: 'p-top', left: 'p-left', gx: 'p-gx', gy: 'p-gy' };

let JB = null, QR = null;
let fontCache = null;
let logo = null; // { bytes, type, img, w, h }
let previewTimer = 0;

const hexToRgb01 = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
const num = (id) => Number(String($(id).value).replace(',', '.'));

// ---------- Kütüphaneler ----------
async function ensureLibs() {
  if (!JB) { await loadScript(`${VENDOR}jsbarcode@3.12.1/JsBarcode.all.min.js`); JB = window.JsBarcode; }
  if (!QR) { await loadScript(`${VENDOR}qrcode@1.5.1/qrcode.min.js`); QR = window.QRCode; }
}

async function loadFonts() {
  if (fontCache) return fontCache;
  const base = `${VENDOR}fonts/dejavu-sans@2.37/`;
  const get = (n) => fetch(`${base}${n}`).then((r) => { if (!r.ok) throw new Error('FONT'); return r.arrayBuffer(); });
  const [regular, bold] = await Promise.all([get('DejaVuSans.ttf'), get('DejaVuSans-Bold.ttf')]);
  fontCache = { regular, bold };
  try {
    const f1 = new FontFace('BA DejaVu', regular);
    const f2 = new FontFace('BA DejaVu', bold, { weight: 'bold' });
    await Promise.all([f1.load(), f2.load()]);
    document.fonts.add(f1); document.fonts.add(f2);
  } catch { /* sistem yazı tipiyle devam */ }
  return fontCache;
}

// ---------- Ölçü alanları ----------
function readGeometry() {
  const g = {};
  for (const [k, id] of Object.entries(FIELDS)) g[k] = num(id);
  if (Object.values(g).some((v) => !Number.isFinite(v))) throw new Error('Ölçü alanlarından biri sayı değil. Milimetre cinsinden rakam yazın (örn. 70 ya da 37,5).');
  if (!Number.isInteger(g.cols) || !Number.isInteger(g.rows) || g.cols < 1 || g.rows < 1 || g.cols > 10 || g.rows > 20) throw new Error('Sütun sayısı 1–10, satır sayısı 1–20 arasında tam sayı olmalı.');
  if (g.w < 10 || g.h < 8) throw new Error('Etiket en az 10 × 8 mm olmalı. Genişlik ve yüksekliği büyütün.');
  if (g.top < 0 || g.left < 0 || g.gx < 0 || g.gy < 0) throw new Error('Kenar boşluğu ve aralık değerleri negatif olamaz.');
  const totalW = g.left + g.cols * g.w + (g.cols - 1) * g.gx;
  const totalH = g.top + g.rows * g.h + (g.rows - 1) * g.gy;
  if (totalW > 210.2) throw new Error(`Izgara A4 genişliğini (210 mm) aşıyor: ${totalW.toFixed(1)} mm. Sütun sayısını azaltın, etiketi daraltın ya da sol boşluğu küçültün.`);
  if (totalH > 297.2) throw new Error(`Izgara A4 yüksekliğini (297 mm) aşıyor: ${totalH.toFixed(1)} mm. Satır sayısını azaltın, etiketi kısaltın ya da üst boşluğu küçültün.`);
  return g;
}

function applyPreset(key) {
  const p = PRESETS[key];
  if (!p) return;
  for (const [k, id] of Object.entries(FIELDS)) $(id).value = String(p[k]);
}

// ---------- Barkod / QR hazırlığı ----------
function gs1CheckDigit(body) {
  let sum = 0;
  for (let i = 0; i < body.length; i++) sum += (body.charCodeAt(body.length - 1 - i) - 48) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10;
}

/** Barkod/QR değerini doğrular; Türkçe hata fırlatır. */
function prepareCode(type, raw, lineNo) {
  const where = `${lineNo}. satır: `;
  if (type === 'ean13') {
    const v = raw.replace(/[\s-]/g, '');
    if (!/^\d+$/.test(v)) throw new Error(`${where}EAN-13 yalnızca rakam kabul eder. Harf içeren kodlar için "Code 128" seçin.`);
    let full = v;
    if (v.length === 12) full = v + gs1CheckDigit(v);
    else if (v.length === 13) {
      const cd = gs1CheckDigit(v.slice(0, 12));
      if (cd !== Number(v[12])) throw new Error(`${where}EAN-13 kontrol basamağı hatalı: son rakam ${v[12]} yazılmış, doğrusu ${cd}. Son rakamı silerseniz otomatik hesaplanır.`);
    } else throw new Error(`${where}EAN-13 için 12 rakam (13. rakam otomatik eklenir) ya da 13 rakam girin; ${v.length} rakam var.`);
    const o = {};
    JB(o, full, { format: 'EAN13', displayValue: false, flat: true });
    return { kind: 'bars', value: full, bits: o.encodings.map((e) => e.data).join('') };
  }
  if (type === 'code128') {
    if (!/^[\x20-\x7E]+$/.test(raw)) throw new Error(`${where}Code 128 yalnızca ASCII karakter destekler; ç, ğ, ı, ö, ş, ü yerine c, g, i, o, s, u yazın.`);
    if (raw.length > 40) throw new Error(`${where}Code 128 değeri 40 karakteri geçemez; etikete sığmaz. Kodu kısaltın.`);
    const o = {};
    JB(o, raw, { format: 'CODE128', displayValue: false, flat: true });
    return { kind: 'bars', value: raw, bits: o.encodings.map((e) => e.data).join('') };
  }
  // QR
  if (raw.length > 300) throw new Error(`${where}QR içeriği 300 karakteri geçemez. Metni kısaltın.`);
  let q;
  try { q = QR.create(raw, { errorCorrectionLevel: 'M' }); } catch { throw new Error(`${where}QR kodu üretilemedi; içeriği kısaltın.`); }
  return { kind: 'qr', value: raw, size: q.modules.size, get: (r, c) => q.modules.get(r, c) };
}

// ---------- Listeyi etiketlere çevir ----------
function splitLine(line) {
  if (line.includes('\t')) return line.split('\t').map((s) => s.trim());
  if (line.includes(';')) return line.split(';').map((s) => s.trim());
  return [line.trim()];
}

function readOptions() {
  return {
    mode: $('mode').value, codeType: $('code-type').value,
    repeat: Math.round(num('repeat')), skip: Math.round(num('skip')),
    cut: $('cut').checked, border: $('border').checked, header: $('hdr').checked,
  };
}

/** Listeyi doğrular; { labels, perPage } döner. Hata varsa Türkçe mesajla fırlatır. */
function buildLabels(o, g) {
  let lines = $('list').value.split(/\r?\n/).map((l) => l.replace(/\s+$/, '')).filter((l) => l.trim());
  if (o.header && lines.length) lines = lines.slice(1);
  if (!lines.length) throw new Error('EMPTY');
  if (!Number.isInteger(o.repeat) || o.repeat < 1 || o.repeat > 500) throw new Error('"Her etiketten kaç adet" 1 ile 500 arasında olmalı.');
  const perPage = g.cols * g.rows;
  if (!Number.isInteger(o.skip) || o.skip < 0 || o.skip >= perPage) throw new Error(`Boş geçilecek etiket sayısı 0 ile ${perPage - 1} arasında olmalı (bir sayfadaki etiket sayısı ${perPage}).`);
  const base = [];
  lines.forEach((line, i) => {
    const f = splitLine(line);
    const lab = { mode: o.mode, f };
    if (o.mode === 'fiyat') {
      lab.name = f[0] || ''; lab.price = f[1] || ''; lab.desc = f[2] || '';
      if (o.codeType !== 'none' && f[3]) lab.code = prepareCode(o.codeType, f[3], i + 1 + (o.header ? 1 : 0));
    } else {
      lab.name = f[0] || ''; lab.rows = f.slice(1).filter(Boolean);
    }
    base.push(lab);
  });
  const labels = Array(o.skip).fill(null);
  for (const lab of base) for (let r = 0; r < o.repeat; r++) labels.push(lab);
  if (labels.length > MAX_LABELS) throw new Error(`En fazla ${MAX_LABELS} etiket üretilebilir; ${labels.length} etiket istediniz. Listeyi ya da adet sayısını azaltın.`);
  return { labels, perPage };
}

// ---------- Yerleşim ----------
function layoutLabel(lab, bx, by, bw, bh, measure) {
  const ops = [];
  const pad = Math.max(3, Math.min(8, Math.min(bw, bh) * 0.08));
  const ix = bx + pad, iy = by + pad, iw = bw - 2 * pad, ih = bh - 2 * pad;
  let textW = iw, textH = ih;
  const fit = (text, size, bold, maxW) => {
    if (measure(text, size, bold) <= maxW) return text;
    let s = text;
    while (s.length > 1 && measure(`${s}…`, size, bold) > maxW) s = s.slice(0, -1);
    return `${s}…`;
  };
  const wrap = (text, size, bold, maxW) => {
    const out = []; let cur = '';
    for (const w of text.split(/\s+/).filter(Boolean)) {
      const t = cur ? `${cur} ${w}` : w;
      if (!cur || measure(t, size, bold) <= maxW) cur = t; else { out.push(cur); cur = w; }
    }
    if (cur) out.push(cur);
    return out;
  };
  // Barkod / QR alanı
  const code = lab.code;
  if (code && code.kind === 'qr') {
    const qs = Math.min(ih, iw * 0.4);
    const mod = qs / code.size;
    const qx = ix + iw - qs, qy = iy + (ih - qs) / 2;
    for (let r = 0; r < code.size; r++) {
      let c = 0;
      while (c < code.size) {
        if (!code.get(r, c)) { c++; continue; }
        let e = c; while (e < code.size && code.get(r, e)) e++;
        ops.push({ t: 'rect', x: qx + c * mod, y: qy + r * mod, w: (e - c) * mod + 0.05, h: mod + 0.05, fill: '#000000' });
        c = e;
      }
    }
    textW = iw - qs - 4;
  } else if (code && code.kind === 'bars') {
    const barH = Math.max(14, ih * 0.36);
    const mw = Math.min(1.0, iw / code.bits.length);
    const tw = mw * code.bits.length;
    const bxs = ix + (iw - tw) / 2, bys = iy + ih - barH, bars = barH - 8;
    let i = 0;
    while (i < code.bits.length) {
      if (code.bits[i] !== '1') { i++; continue; }
      let e = i; while (e < code.bits.length && code.bits[e] === '1') e++;
      ops.push({ t: 'rect', x: bxs + i * mw, y: bys, w: (e - i) * mw + 0.03, h: bars, fill: '#000000' });
      i = e;
    }
    ops.push({ t: 'text', s: fit(code.value, 7, false, iw), x: ix + iw / 2, y: bys + bars + 6.5, size: 7, bold: false, color: '#000000', align: 'c' });
    textH = ih - barH - 2;
  }
  // Logo (metin alanının sağ üstü)
  let nameW = textW;
  if (logo) {
    let lh = Math.min(ih * 0.3, 24), lw = lh * (logo.w / logo.h);
    if (lw > textW * 0.4) { lw = textW * 0.4; lh = lw * (logo.h / logo.w); }
    ops.push({ t: 'img', x: ix + textW - lw, y: iy, w: lw, h: lh });
    nameW = textW - lw - 3;
  }
  // Metin blokları: sığana kadar ölçekle
  const blocks = (k) => {
    const out = [];
    if (lab.mode === 'fiyat') {
      if (lab.name) { const sz = Math.max(6, 12 * k); out.push({ lines: wrap(lab.name, sz, true, nameW).slice(0, 2), size: sz, bold: true, color: '#000000' }); }
      if (lab.price) {
        let sz = Math.min(26, ih * 0.34) * k;
        while (sz > 7 && measure(lab.price, sz, true) > textW) sz -= 0.5;
        out.push({ lines: [fit(lab.price, sz, true, textW)], size: sz, bold: true, color: '#000000', gap: 2 });
      }
      if (lab.desc) { const sz = Math.max(5.5, 7.5 * k); out.push({ lines: wrap(lab.desc, sz, false, textW), size: sz, bold: false, color: '#333333', gap: 2 }); }
    } else {
      if (lab.name) { const sz = Math.max(6, 11 * k); out.push({ lines: wrap(lab.name, sz, true, nameW), size: sz, bold: true, color: '#000000' }); }
      for (const r of lab.rows) { const sz = Math.max(5.5, 9 * k); out.push({ lines: wrap(r, sz, false, textW), size: sz, bold: false, color: '#111111', gap: 1 }); }
    }
    return out;
  };
  const heightOf = (bl) => bl.reduce((s, b) => s + b.lines.length * b.size * 1.18 + (b.gap || 0), 0);
  let chosen = blocks(1);
  for (const k of [1, 0.9, 0.8, 0.7, 0.6, 0.5]) { chosen = blocks(k); if (heightOf(chosen) <= textH) break; }
  let y = iy;
  for (const b of chosen) {
    y += b.gap || 0;
    for (const line of b.lines) {
      const lh = b.size * 1.18;
      if (y + lh > iy + textH + 1) break; // sığmayan satır atlanır
      ops.push({ t: 'text', s: fit(line, b.size, b.bold, textW), x: ix, y: y + b.size * 0.9, size: b.size, bold: b.bold, color: b.color });
      y += lh;
    }
  }
  return ops;
}

/** Bir sayfanın çizim komutları (sol üst köşe, pt). */
function pageOps(pageIdx, labels, g, o, measure) {
  const ops = [];
  const perPage = g.cols * g.rows;
  const w = g.w * MM, h = g.h * MM;
  for (let i = 0; i < perPage; i++) {
    const r = Math.floor(i / g.cols), c = i % g.cols;
    const x = (g.left + c * (g.w + g.gx)) * MM, y = (g.top + r * (g.h + g.gy)) * MM;
    if (o.cut) ops.push({ t: 'rect', x, y, w, h, fill: null, stroke: '#888888', lw: 0.4, dash: true });
    else if (o.border) ops.push({ t: 'rect', x, y, w, h, fill: null, stroke: '#000000', lw: 0.5 });
    const lab = labels[pageIdx * perPage + i];
    if (lab) ops.push(...layoutLabel(lab, x, y, w, h, measure));
  }
  return ops;
}

// ---------- Önizleme ----------
function drawOpsToCanvas(ops, canvas, k) {
  const ctx = canvas.getContext('2d');
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  const font = (size, b) => `${b ? 'bold ' : ''}${size * k}px "BA DejaVu", "DejaVu Sans", sans-serif`;
  for (const o of ops) {
    if (o.t === 'rect') {
      if (o.fill) { ctx.fillStyle = o.fill; ctx.fillRect(o.x * k, o.y * k, o.w * k, o.h * k); }
      if (o.stroke) {
        ctx.strokeStyle = o.stroke; ctx.lineWidth = Math.max(1, o.lw * k); ctx.setLineDash(o.dash ? [4 * k, 3 * k] : []);
        ctx.strokeRect(o.x * k, o.y * k, o.w * k, o.h * k); ctx.setLineDash([]);
      }
    } else if (o.t === 'img') {
      if (logo) ctx.drawImage(logo.img, o.x * k, o.y * k, o.w * k, o.h * k);
    } else {
      ctx.font = font(o.size, o.bold); ctx.fillStyle = o.color; ctx.textAlign = o.align === 'c' ? 'center' : 'left';
      ctx.fillText(o.s, o.x * k, o.y * k);
    }
  }
}

function makeCtxMeasure(k) {
  const ctx = document.createElement('canvas').getContext('2d');
  return (s, size, b) => { ctx.font = `${b ? 'bold ' : ''}${size * k}px "BA DejaVu", "DejaVu Sans", sans-serif`; return ctx.measureText(s).width / k; };
}

async function renderPreview() {
  const canvas = $('preview');
  const k = 1100 / PW;
  canvas.width = Math.round(PW * k); canvas.height = Math.round(PH * k);
  showError($('error'), null);
  $('preview-info').textContent = '';
  let g;
  try { g = readGeometry(); } catch (e) { showError($('error'), e.message); drawOpsToCanvas([], canvas, k); return; }
  const o = readOptions();
  try {
    await Promise.all([ensureLibs(), loadFonts()]);
    const { labels, perPage } = buildLabels(o, g);
    const pages = Math.ceil(labels.length / perPage);
    drawOpsToCanvas(pageOps(0, labels, g, o, makeCtxMeasure(k)), canvas, k);
    $('preview-info').textContent = `Önizleme: 1. sayfa · toplam ${labels.length - o.skip} etiket, ${pages} sayfa.`;
  } catch (e) {
    drawOpsToCanvas(pageOps(0, [], g, { ...o, cut: true }, makeCtxMeasure(k)), canvas, k);
    if (e.message === 'EMPTY') $('preview-info').textContent = 'Önizleme için listeye en az bir satır yazın ya da "Örnek doldur" düğmesine basın.';
    else showError($('error'), e.message);
  }
}
const schedulePreview = () => { clearTimeout(previewTimer); previewTimer = setTimeout(renderPreview, 200); };

// ---------- PDF ----------
async function buildPdf(labels, g, o) {
  const PDFLib = await getPdfLib();
  await loadScript(`${VENDOR}pdf-lib-fontkit@1.1.1/fontkit.umd.min.js`);
  const fd = await loadFonts();
  const doc = await PDFLib.PDFDocument.create();
  doc.registerFontkit(window.fontkit);
  doc.setProducer('Bilişim Ajans Ücretsiz Araçlar');
  doc.setCreator('araclar.bilisimajans.com');
  doc.setTitle('Etiketler');
  const reg = await doc.embedFont(fd.regular, { subset: true });
  const bold = await doc.embedFont(fd.bold, { subset: true });
  let logoImg = null;
  if (logo) logoImg = logo.type === 'png' ? await doc.embedPng(logo.bytes) : await doc.embedJpg(logo.bytes);
  const { rgb } = PDFLib;
  const col = (h) => { const [r, gg, b] = hexToRgb01(h); return rgb(r, gg, b); };
  const measure = (s, size, b) => (b ? bold : reg).widthOfTextAtSize(s, size);
  const perPage = g.cols * g.rows;
  const pages = Math.ceil(labels.length / perPage);
  for (let p = 0; p < pages; p++) {
    const page = doc.addPage([PW, PH]);
    for (const op of pageOps(p, labels, g, o, measure)) {
      if (op.t === 'rect') {
        const opt = { x: op.x, y: PH - op.y - op.h, width: op.w, height: op.h };
        if (op.fill) opt.color = col(op.fill);
        if (op.stroke) { opt.borderColor = col(op.stroke); opt.borderWidth = op.lw; if (op.dash) opt.borderDashArray = [3, 2]; }
        page.drawRectangle(opt);
      } else if (op.t === 'img') {
        if (logoImg) page.drawImage(logoImg, { x: op.x, y: PH - op.y - op.h, width: op.w, height: op.h });
      } else {
        const f = op.bold ? bold : reg;
        const w = f.widthOfTextAtSize(op.s, op.size);
        page.drawText(op.s, { x: op.align === 'c' ? op.x - w / 2 : op.x, y: PH - op.y, size: op.size, font: f, color: col(op.color) });
      }
    }
    if (p % 3 === 2) { setProgress($('progress'), 20 + (70 * (p + 1)) / pages, `Sayfa ${p + 1} / ${pages}`); await tick(); }
  }
  return new Blob([await doc.save()], { type: 'application/pdf' });
}

$('make-pdf').addEventListener('click', async () => {
  const btn = $('make-pdf');
  showError($('error'), null);
  $('result').classList.remove('is-active');
  let g, o, built;
  try {
    g = readGeometry(); o = readOptions();
    await ensureLibs();
    built = buildLabels(o, g);
  } catch (e) {
    showError($('error'), e.message === 'EMPTY' ? 'Etiket listesi boş. Her satıra bir etiket yazın (örn. "Zeytinyağı 1 L; 189,90 TL; Soğuk sıkım") ya da "Örnek doldur" düğmesini kullanın.'
      : (e.message === 'FONT' || /Yüklenemedi/.test(e.message)) ? 'Gerekli dosyalar yüklenemedi. Sayfayı yenileyip tekrar deneyin.' : e.message);
    return;
  }
  btn.disabled = true;
  setProgress($('progress'), 15, 'PDF hazırlanıyor…');
  await tick();
  try {
    const blob = await buildPdf(built.labels, g, o);
    const name = o.mode === 'adres' ? 'adres-etiketleri.pdf' : 'fiyat-etiketleri.pdf';
    downloadBlob(blob, name);
    const pages = Math.ceil(built.labels.length / built.perPage);
    $('result-info').textContent = `${formatBytes(blob.size)} · ${name} · ${pages} sayfa`;
    $('result').classList.add('is-active');
  } catch (err) {
    console.error(err);
    showError($('error'), String(err && err.message) === 'FONT'
      ? 'Yazı tipi dosyası yüklenemedi. Sayfayı yenileyip tekrar deneyin.'
      : 'PDF oluşturulurken bir hata oluştu. Logoyu küçültüp ya da etiket sayısını azaltıp tekrar deneyin.');
  } finally { setProgress($('progress'), null); btn.disabled = false; }
});

// ---------- Logo ----------
$('logo').addEventListener('change', async () => {
  const file = $('logo').files[0];
  showError($('error'), null);
  if (!file) return;
  try {
    if (file.size > 5 * 1024 * 1024) throw new Error('Logo 5 MB sınırını aşıyor. Önce "Resim küçült" aracıyla boyutunu azaltın.');
    const bytes = new Uint8Array(await file.arrayBuffer());
    const type = bytes[0] === 0x89 && bytes[1] === 0x50 ? 'png' : (bytes[0] === 0xff && bytes[1] === 0xd8 ? 'jpg' : '');
    if (!type) throw new Error('Logo PNG ya da JPG olmalı. Başka bir biçimdeyse önce "Resim dönüştür" aracıyla PNG yapın.');
    const url = URL.createObjectURL(new Blob([bytes], { type: type === 'png' ? 'image/png' : 'image/jpeg' }));
    const img = new Image();
    await new Promise((res, rej) => { img.onload = res; img.onerror = () => rej(new Error('Logo dosyası açılamadı; bozuk olabilir. Başka bir resim seçin.')); img.src = url; });
    logo = { bytes, type, img, w: img.naturalWidth, h: img.naturalHeight };
    $('logo-status').textContent = `Logo yüklendi: ${file.name}`;
    schedulePreview();
  } catch (e) {
    logo = null; $('logo').value = '';
    $('logo-status').textContent = '';
    showError($('error'), e.message);
  }
});
$('logo-clear').addEventListener('click', () => { logo = null; $('logo').value = ''; $('logo-status').textContent = 'Logo kaldırıldı.'; schedulePreview(); });

// ---------- CSV / metin dosyası ----------
createDropzone({
  el: $('csv-drop'), accept: '.csv,.txt,text/csv,text/plain', multiple: false,
  onFiles: async ([file]) => {
    showError($('error'), null);
    if (file.size > 2 * 1024 * 1024) { showError($('error'), 'Dosya çok büyük (2 MB üstü). Listeyi parçalara bölüp tekrar deneyin.'); return; }
    let text = await file.text();
    if (text.includes('\u0000') || /[�]{3}/.test(text)) { showError($('error'), 'Dosya metin olarak okunamadı. CSV ya da TXT (UTF-8) olarak kaydedip tekrar seçin.'); return; }
    // Virgülle ayrılmış CSV'yi ";" ayracına çevir (tırnaklı alanlar korunur)
    if (!text.includes(';') && !text.includes('\t') && /,/.test(text) && file.name.toLowerCase().endsWith('.csv')) {
      text = text.split(/\r?\n/).map((l) => (l.match(/("([^"]|"")*"|[^,]*)(,|$)/g) || []).map((c) => c.replace(/,$/, '').replace(/^"|"$/g, '').replace(/""/g, '"')).join(';').replace(/;+$/, '')).join('\n');
    }
    $('list').value = text.replace(/^﻿/, '').trim();
    $('csv-status').textContent = `"${file.name}" yüklendi.`;
    schedulePreview();
  },
});

// ---------- Olaylar ----------
const SAMPLES = {
  fiyat: 'Zeytinyağı 1 L; 189,90 TL; Soğuk sıkım, naturel sızma; 869000000001\nÇiçek balı 450 g; 249,00 TL; Süzme, katkısız; 869000000002\nTürk kahvesi 250 g; 129,50 TL; Orta kavrulmuş; 869000000003',
  adres: 'Ayşe Yılmaz; Gül Mah. Çiçek Sok. No: 5/3; 21100 Sur / Diyarbakır\nMehmet Öztürk; Atatürk Cad. No: 12; 34000 Kadıköy / İstanbul',
};
$('sample').addEventListener('click', () => { $('list').value = SAMPLES[$('mode').value]; renderPreview(); });
$('preset').addEventListener('change', () => { applyPreset($('preset').value); schedulePreview(); });
Object.values(FIELDS).forEach((id) => $(id).addEventListener('input', () => { $('preset').value = 'ozel'; schedulePreview(); }));
['list', 'repeat', 'skip', 'hdr', 'cut', 'border', 'code-type'].forEach((id) => $(id).addEventListener('input', schedulePreview));
$('mode').addEventListener('change', () => {
  const adres = $('mode').value === 'adres';
  $('code-wrap').hidden = adres;
  $('list-hint').textContent = adres
    ? 'Her satır bir etiket: ad; adres satırı; adres satırı… (noktalı virgül ya da Tab ile ayırın).'
    : 'Her satır bir etiket: ürün adı; fiyat; açıklama; barkod değeri (noktalı virgül ya da Tab ile ayırın). Son iki alan isteğe bağlıdır.';
  schedulePreview();
});
$('form').addEventListener('submit', (e) => e.preventDefault());

applyPreset('3x8');
try { await Promise.all([ensureLibs(), loadFonts()]); } catch (e) { console.error(e); showError($('error'), 'Gerekli kütüphaneler yüklenemedi. Sayfayı yenileyin.'); }
await renderPreview();
document.documentElement.dataset.ready = '1';
