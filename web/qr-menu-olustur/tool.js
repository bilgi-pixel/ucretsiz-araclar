// QR Menü ve Fiyat Listesi Oluşturucu — fiyat listesi PDF (pdf-lib + DejaVu), masa kartı PDF (QR vektörel),
// sosyal medya PNG (canvas) ve JSON kaydet/yükle. Hiçbir veri ağa gitmez; kütüphane ve yazı tipleri aynı origin'den okunur.
import { createDropzone, downloadBlob, showError, getPdfLib, loadScript, setProgress, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const VENDOR = new URL('../vendor/', import.meta.url).href;
const A4 = [595.28, 841.89];
const MM = 72 / 25.4;

// Temalar: bg (sayfa zemini), ink (ana yazı), muted (açıklama), accent (başlık/çizgi), band (üst bant), bandInk (bant yazısı)
const THEMES = {
  bordo: { bg: '#ffffff', ink: '#2a1a1d', muted: '#6b5a5d', accent: '#7b2331', band: '#7b2331', bandInk: '#ffffff' },
  koyu: { bg: '#17161a', ink: '#f4efe6', muted: '#b9b2a6', accent: '#d9b25f', band: '#0e0d10', bandInk: '#d9b25f' },
  sade: { bg: '#ffffff', ink: '#111111', muted: '#555555', accent: '#111111', band: '#ffffff', bandInk: '#111111' },
};

const state = {
  name: '', tagline: '', currency: '₺', theme: 'bordo', menuUrl: '', logo: null, // logo: PNG data URL
  cats: [],
};
let uid = 0;
const newItem = (n = '', d = '', p = '') => ({ id: ++uid, name: n, desc: d, price: p });
const newCat = (n = '') => ({ id: ++uid, name: n, items: [newItem()] });

const SAMPLE = {
  name: 'Çınar Kafe', tagline: 'Taze çekirdek, ev yapımı tatlılar', currency: '₺', theme: 'bordo', menuUrl: '',
  cats: [
    { name: 'Sıcak İçecekler', items: [['Türk Kahvesi', 'Közde, orta şekerli', '85'], ['Çay', 'İnce belli bardakta', '25'], ['Sahlep', 'Tarçınlı', '95']] },
    { name: 'Tatlılar', items: [['Şekerpare', 'Fıstıklı, ev yapımı', '110'], ['Künefe', 'Dondurma ile servis edilir', '165,50']] },
  ],
};

/* ---------- Yardımcılar ---------- */
function formatPrice(raw) {
  const s = String(raw || '').trim();
  if (!s) return '';
  const n = Number(s.replace(/\./g, '').replace(',', '.'));
  const sym = state.currency;
  if (/^[\d.,\s]+$/.test(s) && Number.isFinite(n)) {
    const txt = n.toLocaleString('tr-TR', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 });
    return sym ? `${txt} ${sym}` : txt;
  }
  return s; // "120/150" gibi serbest metin olduğu gibi
}
const hexToRgb = (hex) => { const n = parseInt(hex.slice(1), 16); return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]; };
const slug = (s) => (s || 'menu').toLocaleLowerCase('tr').replace(/[\\/:*?"<>|]+/g, ' ').trim().replace(/\s+/g, '-').slice(0, 40) || 'menu';

/** Boş satırları atar. */
function cleanData() {
  return state.cats
    .map((c) => ({ name: c.name.trim(), items: c.items.filter((i) => i.name.trim() || i.price.trim()) }))
    .filter((c) => c.items.length);
}
/** Doğrulama: hata metni döner, sorun yoksa null. */
function validate() {
  if (!state.name.trim()) return 'İşletme adını yazın; menünün başlığında görünür.';
  const cats = cleanData();
  const items = cats.reduce((a, c) => a + c.items.length, 0);
  if (!items) return 'En az bir ürün ekleyin: kategori altındaki "Ürün adı" ve "Fiyat" alanlarını doldurun.';
  for (const c of cats) for (const i of c.items) if (!i.name.trim()) return 'Fiyatı olan ama adı boş bir ürün var. Ürün adını yazın ya da satırı silin.';
  return null;
}
function validUrl() {
  const u = state.menuUrl.trim();
  if (!u) return 'Masa kartı için menü bağlantısını girin. Menünüzü kendi sitenize ya da Drive/Dropbox gibi bir yere koyup bağlantısını buraya yapıştırın.';
  if (!/^https?:\/\/[^\s.]+\.[^\s]+$/i.test(u)) return 'Bağlantı https:// ile başlayan geçerli bir adres olmalı (örn. https://firmaniz.com/menu).';
  return null;
}

/* ---------- Form (kategori / ürün listesi) ---------- */
const catsEl = $('cats');
function iconBtn(label, text, onClick, disabled) {
  const b = document.createElement('button');
  b.type = 'button'; b.className = 'ba-btn qm-ib'; b.textContent = text; b.setAttribute('aria-label', label); b.title = label;
  if (disabled) b.disabled = true;
  b.addEventListener('click', onClick);
  return b;
}
function field(label, value, onInput, opts = {}) {
  const w = document.createElement('div'); w.className = 'ba-field ' + (opts.cls || '');
  const l = document.createElement('label'); const id = `f${++uid}`; l.htmlFor = id; l.textContent = label;
  const i = document.createElement('input'); i.type = 'text'; i.id = id; i.value = value; i.autocomplete = 'off';
  if (opts.placeholder) i.placeholder = opts.placeholder;
  if (opts.mode) i.inputMode = opts.mode;
  i.addEventListener('input', () => onInput(i.value));
  w.append(l, i);
  return w;
}
function move(arr, idx, dir) {
  const j = idx + dir; if (j < 0 || j >= arr.length) return;
  [arr[idx], arr[j]] = [arr[j], arr[idx]]; renderForm(); schedulePreview();
}
function renderForm() {
  catsEl.textContent = '';
  state.cats.forEach((cat, ci) => {
    const sec = document.createElement('section'); sec.className = 'qm-cat'; sec.setAttribute('aria-label', `Kategori ${ci + 1}`);
    const head = document.createElement('div'); head.className = 'qm-cat-head';
    head.append(field(`Kategori ${ci + 1} adı`, cat.name, (v) => { cat.name = v; schedulePreview(); }, { placeholder: 'Örn. Sıcak İçecekler', cls: 'qm-grow qm-cname' }));
    const tools = document.createElement('div'); tools.className = 'qm-tools';
    tools.append(
      iconBtn(`Kategori ${ci + 1} yukarı taşı`, '↑', () => move(state.cats, ci, -1), ci === 0),
      iconBtn(`Kategori ${ci + 1} aşağı taşı`, '↓', () => move(state.cats, ci, 1), ci === state.cats.length - 1),
      iconBtn(`Kategori ${ci + 1} sil`, '✕', () => { state.cats.splice(ci, 1); renderForm(); schedulePreview(); }),
    );
    head.append(tools); sec.append(head);
    cat.items.forEach((it, ii) => {
      const row = document.createElement('div'); row.className = 'qm-item';
      const fields = document.createElement('div'); fields.className = 'qm-item-f';
      fields.append(
        field(`Ürün adı (${ci + 1}.${ii + 1})`, it.name, (v) => { it.name = v; schedulePreview(); }, { placeholder: 'Türk Kahvesi', cls: 'qm-name' }),
        field(`Fiyat (${ci + 1}.${ii + 1})`, it.price, (v) => { it.price = v; schedulePreview(); }, { placeholder: '85', mode: 'decimal', cls: 'qm-price' }),
        field(`Açıklama (${ci + 1}.${ii + 1}, isteğe bağlı)`, it.desc, (v) => { it.desc = v; schedulePreview(); }, { placeholder: 'Közde, orta şekerli', cls: 'qm-desc' }),
      );
      const t = document.createElement('div'); t.className = 'qm-tools';
      t.append(
        iconBtn(`Ürün ${ci + 1}.${ii + 1} yukarı taşı`, '↑', () => move(cat.items, ii, -1), ii === 0),
        iconBtn(`Ürün ${ci + 1}.${ii + 1} aşağı taşı`, '↓', () => move(cat.items, ii, 1), ii === cat.items.length - 1),
        iconBtn(`Ürün ${ci + 1}.${ii + 1} sil`, '✕', () => { cat.items.splice(ii, 1); renderForm(); schedulePreview(); }),
      );
      row.append(fields, t); sec.append(row);
    });
    const add = document.createElement('button'); add.type = 'button'; add.className = 'ba-btn'; add.textContent = '+ Ürün ekle';
    add.addEventListener('click', () => {
      cat.items.push(newItem()); renderForm(); schedulePreview();
      const inputs = catsEl.querySelectorAll('.qm-cat')[ci].querySelectorAll('.qm-name input'); inputs[inputs.length - 1].focus();
    });
    sec.append(add);
    catsEl.append(sec);
  });
}
$('cat-add').addEventListener('click', () => {
  state.cats.push(newCat()); renderForm(); schedulePreview();
  const c = catsEl.querySelectorAll('.qm-cat'); c[c.length - 1].querySelector('input').focus();
});
$('sample').addEventListener('click', () => { loadState(SAMPLE); showError($('error'), null); });

/* ---------- Genel ayarlar ---------- */
const bind = (id, key) => $(id).addEventListener('input', () => { state[key] = $(id).value; schedulePreview(); });
bind('biz-name', 'name'); bind('biz-tagline', 'tagline'); bind('menu-url', 'menuUrl');
$('currency').addEventListener('change', () => { state.currency = $('currency').value; schedulePreview(); });
$('theme').addEventListener('change', () => { state.theme = $('theme').value; schedulePreview(); });

function loadImage(src) {
  return new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('IMG')); i.src = src; });
}
// Logoyu canvas üzerinden 600 px'e küçültüp PNG data URL yapar (JPG/SVG/WebP de olur).
createDropzone({
  el: $('logo-drop'), accept: 'image/*', multiple: false,
  onFiles: async ([file]) => {
    showError($('error'), null);
    try {
      const img = await loadImage(URL.createObjectURL(file));
      const iw = img.naturalWidth || 600, ih = img.naturalHeight || 600;
      const k = Math.min(1, 600 / Math.max(iw, ih));
      const c = document.createElement('canvas');
      c.width = Math.max(1, Math.round(iw * k)); c.height = Math.max(1, Math.round(ih * k));
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      state.logo = c.toDataURL('image/png');
      $('logo-name').textContent = file.name; $('logo-remove').hidden = false;
      schedulePreview();
    } catch { showError($('error'), 'Logo okunamadı. PNG, JPG, WebP ya da SVG biçiminde bir görsel seçin.'); }
  },
});
$('logo-remove').addEventListener('click', () => { state.logo = null; $('logo-name').textContent = ''; $('logo-remove').hidden = true; schedulePreview(); });

/* ---------- PDF: ortak kurulum ---------- */
let fontCache = null;
async function loadFonts() {
  if (fontCache) return fontCache;
  const base = `${VENDOR}fonts/dejavu-sans@2.37/`;
  const get = (n) => fetch(`${base}${n}`).then((r) => { if (!r.ok) throw new Error('FONT'); return r.arrayBuffer(); });
  const [regular, bold] = await Promise.all([get('DejaVuSans.ttf'), get('DejaVuSans-Bold.ttf')]);
  fontCache = { regular, bold };
  return fontCache;
}
async function pdfSetup() {
  const PDFLib = await getPdfLib();
  await loadScript(`${VENDOR}pdf-lib-fontkit@1.1.1/fontkit.umd.min.js`);
  const fd = await loadFonts();
  const doc = await PDFLib.PDFDocument.create();
  doc.registerFontkit(window.fontkit);
  doc.setProducer('Bilişim Ajans Ücretsiz Araçlar'); doc.setCreator('araclar.bilisimajans.com');
  const reg = await doc.embedFont(fd.regular, { subset: true });
  const bold = await doc.embedFont(fd.bold, { subset: true });
  let charset = null; try { charset = new Set(reg.getCharacterSet()); } catch { charset = null; }
  // Yazı tipinde olmayan karakterleri (emoji vb.) çıkarır; ₺ yoksa "TL" yazar
  const T = (s) => {
    let out = String(s).replace(/[\r\n\t]+/g, ' ');
    if (charset && !charset.has(0x20ba)) out = out.replace(/₺/g, 'TL');
    if (charset) out = Array.from(out).filter((ch) => charset.has(ch.codePointAt(0))).join('');
    return out;
  };
  return { PDFLib, doc, reg, bold, T };
}
function wrap(font, text, size, maxW) {
  const words = text.split(/\s+/).filter(Boolean); const lines = []; let cur = '';
  for (const w of words) {
    const t = cur ? `${cur} ${w}` : w;
    if (font.widthOfTextAtSize(t, size) <= maxW || !cur) cur = t; else { lines.push(cur); cur = w; }
  }
  if (cur) lines.push(cur);
  return lines;
}
async function embedLogo(doc) {
  if (!state.logo) return null;
  const bytes = Uint8Array.from(atob(state.logo.split(',')[1]), (c) => c.charCodeAt(0));
  return doc.embedPng(bytes);
}

/* ---------- PDF: fiyat listesi ---------- */
async function buildMenuPdf() {
  const { PDFLib, doc, reg, bold, T } = await pdfSetup();
  const { rgb } = PDFLib;
  const th = THEMES[state.theme];
  const C = (hex) => rgb(...hexToRgb(hex));
  const logo = await embedLogo(doc);
  const cats = cleanData();
  doc.setTitle(`${state.name} fiyat listesi`);
  const M = 50, W = A4[0], H = A4[1], colW = W - 2 * M;
  let page, y;
  const pages = [];
  const newPage = (first) => {
    page = doc.addPage(A4); pages.push(page);
    if (th.bg !== '#ffffff') page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: C(th.bg) });
    if (first) {
      const bandH = 130;
      if (state.theme !== 'sade') page.drawRectangle({ x: 0, y: H - bandH, width: W, height: bandH, color: C(th.band) });
      let tx = M;
      if (logo) {
        const k = Math.min(80 / logo.width, 80 / logo.height);
        page.drawImage(logo, { x: M, y: H - bandH / 2 - (logo.height * k) / 2, width: logo.width * k, height: logo.height * k });
        tx = M + logo.width * k + 18;
      }
      page.drawText(T(state.name.trim()), { x: tx, y: H - bandH / 2 + 2, size: 28, font: bold, color: C(th.bandInk), maxWidth: W - tx - M });
      if (state.tagline.trim()) page.drawText(T(state.tagline.trim()), { x: tx, y: H - bandH / 2 - 20, size: 12, font: reg, color: C(th.bandInk), maxWidth: W - tx - M });
      if (state.theme === 'sade') page.drawLine({ start: { x: M, y: H - bandH }, end: { x: W - M, y: H - bandH }, thickness: 1.5, color: C(th.accent) });
      y = H - bandH - 40;
    } else {
      page.drawText(T(state.name.trim()), { x: M, y: H - 38, size: 11, font: bold, color: C(th.accent) });
      page.drawLine({ start: { x: M, y: H - 46 }, end: { x: W - M, y: H - 46 }, thickness: 0.7, color: C(th.accent) });
      y = H - 80;
    }
  };
  newPage(true);
  let n = 0; const total = cats.reduce((a, c) => a + c.items.length, 0);
  for (const cat of cats) {
    if (y < 120) newPage(false);
    page.drawText(T((cat.name || 'Menü').toLocaleUpperCase('tr')), { x: M, y, size: 15, font: bold, color: C(th.accent) });
    page.drawLine({ start: { x: M, y: y - 6 }, end: { x: W - M, y: y - 6 }, thickness: 1, color: C(th.accent) });
    y -= 28;
    for (const it of cat.items) {
      const priceTxt = T(formatPrice(it.price)); const pw = priceTxt ? bold.widthOfTextAtSize(priceTxt, 12) : 0;
      const nameLines = wrap(bold, T(it.name.trim()), 12, colW - pw - 16);
      const descLines = it.desc.trim() ? wrap(reg, T(it.desc.trim()), 9.5, colW - pw - 16) : [];
      const need = nameLines.length * 15 + descLines.length * 12 + 12;
      if (y - need < 50) newPage(false);
      nameLines.forEach((ln, k) => { page.drawText(ln, { x: M, y: y - k * 15, size: 12, font: bold, color: C(th.ink) }); });
      if (priceTxt) page.drawText(priceTxt, { x: W - M - pw, y, size: 12, font: bold, color: C(th.accent) });
      y -= nameLines.length * 15;
      descLines.forEach((ln) => { page.drawText(ln, { x: M, y: y + 2, size: 9.5, font: reg, color: C(th.muted) }); y -= 12; });
      y -= 12;
      n++; if (n % 8 === 0) { setProgress($('progress'), 10 + (n / total) * 80, 'Sayfalar hazırlanıyor…'); await tick(); }
    }
    y -= 10;
  }
  pages.forEach((p, i) => p.drawText(T(`${i + 1} / ${pages.length}`), { x: W - M - 30, y: 24, size: 8, font: reg, color: C(th.muted) }));
  return doc.save();
}

/* ---------- PDF: masa kartı ---------- */
async function buildCardPdf(layout) {
  const { PDFLib, doc, reg, bold, T } = await pdfSetup();
  const { rgb } = PDFLib;
  const th = THEMES[state.theme]; const C = (hex) => rgb(...hexToRgb(hex));
  const logo = await embedLogo(doc);
  await loadScript(`${VENDOR}qrcode@1.5.1/qrcode.min.js`);
  const qr = window.QRCode.create(state.menuUrl.trim(), { errorCorrectionLevel: 'M' });
  const size = qr.modules.size, data = qr.modules.data;
  doc.setTitle(`${state.name} masa kartı`);
  // Hücre ölçüleri: tek/4'lü = A6 (105×148,5 mm); 6'lı = A4'te 2×3, hücre 105×99 mm
  const cellW = 105 * MM, cellH = layout === 'six' ? 99 * MM : 148.5 * MM;
  const cols = layout === 'single' ? 1 : 2, rows = layout === 'single' ? 1 : layout === 'six' ? 3 : 2;
  const pageSize = layout === 'single' ? [cellW, cellH] : A4;
  const page = doc.addPage(pageSize);
  const ox = (pageSize[0] - cols * cellW) / 2, oy = (pageSize[1] - rows * cellH) / 2;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const x0 = ox + c * cellW, y0 = pageSize[1] - oy - (r + 1) * cellH;
    if (th.bg !== '#ffffff') page.drawRectangle({ x: x0, y: y0, width: cellW, height: cellH, color: C(th.bg) });
    page.drawRectangle({ x: x0 + 8, y: y0 + 8, width: cellW - 16, height: cellH - 16, borderColor: C(th.accent), borderWidth: 1.2 });
    let top = y0 + cellH - 26;
    if (logo) {
      const k = Math.min(34 / logo.width, 34 / logo.height);
      page.drawImage(logo, { x: x0 + cellW / 2 - (logo.width * k) / 2, y: top - logo.height * k, width: logo.width * k, height: logo.height * k });
      top -= logo.height * k + 8;
    }
    const nm = T(state.name.trim()); const fs = 15;
    const nameSize = Math.min(fs, ((cellW - 36) / bold.widthOfTextAtSize(nm, fs)) * fs);
    page.drawText(nm, { x: x0 + cellW / 2 - bold.widthOfTextAtSize(nm, nameSize) / 2, y: top - 12, size: nameSize, font: bold, color: C(th.accent) });
    const sub = 'Menü için kameranızı okutun'; const sw = reg.widthOfTextAtSize(sub, 9);
    page.drawText(sub, { x: x0 + cellW / 2 - sw / 2, y: top - 28, size: 9, font: reg, color: C(th.muted) });
    const avail = top - 40 - (y0 + 30); const qrSize = Math.min(avail, cellW - 60);
    const qx = x0 + cellW / 2 - qrSize / 2, qy = y0 + 30 + (avail - qrSize) / 2;
    const quiet = 3, unit = qrSize / (size + quiet * 2);
    page.drawRectangle({ x: qx, y: qy, width: qrSize, height: qrSize, color: rgb(1, 1, 1) });
    for (let i = 0; i < size; i++) for (let j = 0; j < size; j++) {
      if (data[i * size + j]) page.drawRectangle({ x: qx + (j + quiet) * unit, y: qy + qrSize - (i + quiet + 1) * unit, width: unit + 0.05, height: unit + 0.05, color: rgb(0, 0, 0) });
    }
    const u = T(state.menuUrl.trim().replace(/^https?:\/\//i, ''));
    const us = Math.min(7.5, ((cellW - 30) / reg.widthOfTextAtSize(u, 7.5)) * 7.5);
    page.drawText(u, { x: x0 + cellW / 2 - reg.widthOfTextAtSize(u, us) / 2, y: y0 + 16, size: us, font: reg, color: C(th.muted) });
  }
  // Kesim çizgileri (kesikli)
  if (layout !== 'single') {
    const dash = { thickness: 0.4, color: rgb(0.6, 0.6, 0.6), dashArray: [3, 3] };
    for (let c = 0; c <= cols; c++) page.drawLine({ start: { x: ox + c * cellW, y: oy }, end: { x: ox + c * cellW, y: pageSize[1] - oy }, ...dash });
    for (let r = 0; r <= rows; r++) page.drawLine({ start: { x: ox, y: oy + r * cellH }, end: { x: pageSize[0] - ox, y: oy + r * cellH }, ...dash });
  }
  return doc.save();
}

/* ---------- PNG: 1080×1920 sosyal medya görseli ---------- */
const FONT_STACK = '"IBM Plex Sans", "Segoe UI", system-ui, Arial, sans-serif';
let logoImgCache = { src: null, img: null };
async function getLogoImg() {
  if (!state.logo) return null;
  if (logoImgCache.src !== state.logo) logoImgCache = { src: state.logo, img: await loadImage(state.logo) };
  return logoImgCache.img;
}
/** Canvas'a menüyü çizer; sığmazsa ölçeği küçültür. Dönüş: { cut } sığmayan ürün sayısı. */
async function drawStory(cv, W, H, withQr) {
  const th = THEMES[state.theme]; const ctx = cv.getContext('2d');
  const logo = await getLogoImg();
  const cats = cleanData();
  const qrOk = withQr && !validUrl();
  const qrBlock = qrOk ? 330 : 0;
  const limit = H - 90 - qrBlock;
  const pass = (s, dry) => {
    const pad = 80; const colW = W - pad * 2; let y = 90;
    if (!dry) { ctx.fillStyle = th.bg; ctx.fillRect(0, 0, W, H); if (state.theme !== 'sade') { ctx.fillStyle = th.band; ctx.fillRect(0, 0, W, 330); } }
    ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'center';
    if (logo) {
      const k = Math.min(150 / logo.naturalWidth, 150 / logo.naturalHeight);
      if (!dry) ctx.drawImage(logo, W / 2 - (logo.naturalWidth * k) / 2, y - 30, logo.naturalWidth * k, logo.naturalHeight * k);
      y += 130;
    } else y += 30;
    ctx.fillStyle = th.bandInk; ctx.font = `700 64px ${FONT_STACK}`;
    if (!dry) ctx.fillText(state.name.trim() || 'İşletme Adı', W / 2, y + 50, W - 120);
    y += 60;
    if (state.tagline.trim()) { ctx.font = `400 30px ${FONT_STACK}`; if (!dry) ctx.fillText(state.tagline.trim(), W / 2, y + 30, W - 120); y += 40; }
    y = Math.max(y + 50, 390);
    let cut = 0;
    ctx.textAlign = 'left';
    for (const cat of cats) {
      if (y + 140 * s > limit) { cut += cat.items.length; continue; }
      if (!dry) { ctx.font = `700 ${44 * s}px ${FONT_STACK}`; ctx.fillStyle = th.accent; ctx.fillText((cat.name || 'Menü').toLocaleUpperCase('tr'), pad, y + 44 * s); ctx.fillRect(pad, y + 56 * s, colW, 3); }
      y += 90 * s;
      for (const it of cat.items) {
        const need = (it.desc.trim() ? 90 : 60) * s;
        if (y + need > limit) { cut++; continue; }
        const price = formatPrice(it.price);
        ctx.font = `700 ${38 * s}px ${FONT_STACK}`;
        const pw = ctx.measureText(price).width;
        if (!dry) {
          ctx.fillStyle = th.ink; ctx.fillText(it.name.trim(), pad, y + 36 * s, colW - pw - 30);
          ctx.fillStyle = th.accent; ctx.textAlign = 'right'; ctx.fillText(price, W - pad, y + 36 * s); ctx.textAlign = 'left';
        }
        y += 46 * s;
        if (it.desc.trim()) { if (!dry) { ctx.font = `400 ${27 * s}px ${FONT_STACK}`; ctx.fillStyle = th.muted; ctx.fillText(it.desc.trim(), pad, y + 22 * s, colW - pw - 30); } y += 34 * s; }
        y += 18 * s;
      }
      y += 24 * s;
    }
    return { y, cut };
  };
  let s = 1;
  while (s > 0.55) { const r = pass(s, true); if (!r.cut) break; s -= 0.05; }
  const res = pass(s, false);
  if (qrOk) {
    await loadScript(`${VENDOR}qrcode@1.5.1/qrcode.min.js`);
    const qr = window.QRCode.create(state.menuUrl.trim(), { errorCorrectionLevel: 'M' });
    const sz = qr.modules.size, quiet = 3, box = 250, unit = box / (sz + quiet * 2);
    const bx = W / 2 - box / 2, by = H - 90 - box;
    ctx.fillStyle = '#fff'; ctx.fillRect(bx, by, box, box); ctx.fillStyle = '#000';
    for (let i = 0; i < sz; i++) for (let j = 0; j < sz; j++) if (qr.modules.data[i * sz + j]) ctx.fillRect(bx + (j + quiet) * unit, by + (i + quiet) * unit, unit + 0.5, unit + 0.5);
    ctx.textAlign = 'center'; ctx.fillStyle = th.muted; ctx.font = `400 28px ${FONT_STACK}`;
    ctx.fillText('Güncel menü için okutun', W / 2, by - 16);
  }
  return res;
}

/* ---------- Önizleme ---------- */
let prevTimer = 0, prevToken = 0;
function schedulePreview() { clearTimeout(prevTimer); prevTimer = setTimeout(renderPreview, 250); }
async function renderPreview() {
  const token = ++prevToken; const cv = $('preview');
  const ok = state.name.trim() && cleanData().length;
  $('preview-hint').hidden = !!ok; cv.hidden = !ok;
  if (!ok) { cv.dataset.ready = '0'; $('story-warn').hidden = true; return; }
  const c = document.createElement('canvas'); c.width = 1080; c.height = 1920;
  const r = await drawStory(c, 1080, 1920, $('story-qr').checked);
  if (token !== prevToken) return;
  const pc = cv.getContext('2d'); pc.clearRect(0, 0, cv.width, cv.height); pc.drawImage(c, 0, 0, cv.width, cv.height);
  cv.dataset.ready = '1';
  $('story-warn').hidden = !r.cut;
  if (r.cut) $('story-warn').textContent = `Görsele ${r.cut} ürün sığmadı. Tam liste için PDF'i kullanın ya da menüyü iki ayrı dosyaya bölün.`;
}
$('story-qr').addEventListener('change', schedulePreview);

/* ---------- Düğmeler ---------- */
async function run(label, fn, extra) {
  showError($('error'), null);
  const err = validate() || (extra ? extra() : null);
  if (err) { showError($('error'), err); return; }
  try {
    setProgress($('progress'), 5, label); await tick(); await fn();
    setProgress($('progress'), 100, 'Hazır'); setTimeout(() => setProgress($('progress'), null), 800);
  } catch (e) {
    console.error(e); setProgress($('progress'), null);
    showError($('error'), 'Dosya oluşturulamadı. Sayfayı yenileyip tekrar deneyin; sorun sürerse logoyu kaldırarak deneyin.');
  }
}
$('btn-pdf').addEventListener('click', () => run('Fiyat listesi PDF hazırlanıyor…', async () => {
  const bytes = await buildMenuPdf();
  downloadBlob(new Blob([bytes], { type: 'application/pdf' }), `${slug(state.name)}-fiyat-listesi.pdf`);
}));
$('btn-card').addEventListener('click', () => run('Masa kartı hazırlanıyor…', async () => {
  const bytes = await buildCardPdf($('card-layout').value);
  downloadBlob(new Blob([bytes], { type: 'application/pdf' }), `${slug(state.name)}-masa-karti.pdf`);
}, validUrl));
$('btn-png').addEventListener('click', () => run('Görsel hazırlanıyor…', async () => {
  const c = document.createElement('canvas'); c.width = 1080; c.height = 1920;
  await drawStory(c, 1080, 1920, $('story-qr').checked);
  const blob = await new Promise((r) => c.toBlob(r, 'image/png'));
  downloadBlob(blob, `${slug(state.name)}-menu-1080x1920.png`);
}, () => ($('story-qr').checked ? validUrl() && `${validUrl()} Ya da "Görsele QR ekle" kutusunun işaretini kaldırın.` : null)));

/* ---------- JSON kaydet / yükle ---------- */
function snapshot() {
  return {
    format: 'bilisim-ajans-menu', version: 1, name: state.name, tagline: state.tagline, currency: state.currency, theme: state.theme,
    menuUrl: state.menuUrl, logo: state.logo, cats: state.cats.map((c) => ({ name: c.name, items: c.items.map((i) => [i.name, i.desc, i.price]) })),
  };
}
function loadState(d) {
  state.name = String(d.name || ''); state.tagline = String(d.tagline || ''); state.menuUrl = String(d.menuUrl || '');
  state.currency = ['₺', '$', '€', '£', ''].includes(d.currency) ? d.currency : '₺';
  state.theme = THEMES[d.theme] ? d.theme : 'bordo';
  state.logo = typeof d.logo === 'string' && d.logo.startsWith('data:image/') ? d.logo : null;
  state.cats = d.cats.map((c) => ({ id: ++uid, name: String(c.name || ''), items: (c.items || []).map((i) => newItem(String(i[0] || ''), String(i[1] || ''), String(i[2] || ''))) }));
  if (!state.cats.length) state.cats = [newCat()];
  $('biz-name').value = state.name; $('biz-tagline').value = state.tagline; $('menu-url').value = state.menuUrl;
  $('currency').value = state.currency; $('theme').value = state.theme;
  $('logo-name').textContent = state.logo ? 'Kayıtlı logo' : ''; $('logo-remove').hidden = !state.logo;
  renderForm(); schedulePreview();
}
$('btn-save').addEventListener('click', () => {
  showError($('error'), null);
  if (!state.name.trim() && !cleanData().length) { showError($('error'), 'Kaydedilecek bir şey yok. Önce işletme adını ve en az bir ürünü girin.'); return; }
  downloadBlob(new Blob([JSON.stringify(snapshot())], { type: 'application/json' }), `${slug(state.name)}-menu.json`);
});
$('json-input').addEventListener('change', async () => {
  const f = $('json-input').files[0]; $('json-input').value = ''; if (!f) return;
  showError($('error'), null);
  try {
    const d = JSON.parse(await f.text());
    if (d.format !== 'bilisim-ajans-menu' || !Array.isArray(d.cats)) throw new Error('FORMAT');
    loadState(d);
  } catch { showError($('error'), 'Bu dosya bir menü dosyası gibi görünmüyor. Bu araçtan "Menüyü kaydet" ile indirdiğiniz .json dosyasını seçin.'); }
});

/* ---------- Açılış ---------- */
state.cats = [newCat()]; renderForm(); renderPreview();
