// Yazdırılabilir Kağıt — çizgili, kareli, noktalı, izometrik, porte, Cornell, yazı öğrenme ve milimetrik
// kağıtları PDF olarak üretir. Tamamı vektörel çizgilerdir (pdf-lib drawLine); ilk sayfa bir kez çizilir,
// sonraki sayfalar aynı içeriğin gömülü kopyası olduğundan dosya çok küçük kalır.
// Hiçbir veri ağa gitmez; kütüphane ve yazı tipi aynı origin'deki vendor/ klasöründen yüklenir.
import { setProgress, downloadBlob, formatBytes, showError, getPdfLib, getPdfJs, loadScript, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const VENDOR = new URL('../vendor/', import.meta.url).href;
const MM = 72 / 25.4;
const SIZES = { a4: [595.28, 841.89], a5: [419.53, 595.28], letter: [612, 792] };
const SIZE_LABEL = { a4: 'A4', a5: 'A5', letter: 'Letter' };

// Tür başına varsayılan aralık (mm), izin verilen aralık, etiket ve ipucu.
const TYPES = {
  cizgili: { name: 'cizgili', def: 8, min: 3, max: 30, label: 'Satır aralığı (mm)', hint: 'Okul defterlerinde yaklaşık 7-8 mm kullanılır.' },
  kareli: { name: 'kareli', def: 5, min: 2, max: 30, label: 'Kare boyutu (mm)', hint: 'Standart kareli defter 5 mm\'dir.' },
  noktali: { name: 'noktali', def: 5, min: 2, max: 30, label: 'Nokta aralığı (mm)', hint: 'Bullet journal için 5 mm yaygındır.' },
  izometrik: { name: 'izometrik', def: 5, min: 3, max: 30, label: 'Üçgen kenarı (mm)', hint: 'Teknik çizim ve 3B eskizler için 5-10 mm uygundur.' },
  muzik: { name: 'muzik', def: 1.8, min: 1.2, max: 3, label: 'Porte çizgi aralığı (mm)', hint: 'Porte yüksekliği bu değerin 4 katıdır; 1,6-2 mm yaygındır.' },
  cornell: { name: 'cornell', def: 8, min: 4, max: 15, label: 'Not satırı aralığı (mm)', hint: 'Sol sütun anahtar sözcük, sağ geniş alan not, alt bölüm özet içindir.' },
  ilkokul: { name: 'ilkokul', def: 7, min: 4, max: 15, label: 'Çizgi aralığı (mm)', hint: 'Üst çizgi, kesik orta çizgi ve taban çizgisinden oluşan kılavuz; iki çizgi arası 7 mm.' },
  dik: { name: 'dik', def: 6, min: 4, max: 12, label: 'Çizgi aralığı (mm)', hint: 'Dik temel harfler için dört çizgili düzen; çizgiler arası 6 mm.' },
  milimetrik: { name: 'milimetrik', def: 1, min: 1, max: 1, label: '', hint: '' },
};

let lastBytes = null;
let lastName = 'kagit.pdf';
let buildToken = 0;
let pending = Promise.resolve();
let timer = 0;
let timerActive = false;
let fontCache = null;

/** "#rrggbb" değerini 0-1 aralığında RGB dizisine çevirir. */
function hexToRgb(hex) {
  const m = /^#([0-9a-f]{6})$/i.exec(hex || '');
  if (!m) return [0.6, 0.65, 0.7];
  const n = parseInt(m[1], 16);
  return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255].map((v) => Math.round(v * 1000) / 1000);
}

function readOptions() {
  const type = $('opt-type').value;
  const T = TYPES[type];
  if (!T) throw new Error('Kağıt türü anlaşılamadı. Listeden bir tür seçin.');
  const size = $('opt-size').value;
  if (!SIZES[size]) throw new Error('Sayfa boyutu anlaşılamadı. A4, A5 ya da Letter seçin.');
  const num = (id) => (String($(id).value).trim() === '' ? NaN : Number(String($(id).value).replace(',', '.')));
  const pages = num('opt-pages');
  if (!Number.isInteger(pages) || pages < 1 || pages > 100) throw new Error('Sayfa sayısı 1 ile 100 arasında bir tam sayı olmalı. Örneğin 10 yazın.');
  const margin = num('opt-margin');
  if (!Number.isFinite(margin) || margin < 5 || margin > 30) throw new Error('Kenar boşluğu 5 ile 30 mm arasında olmalı. Yazıcıların çoğu 5 mm\'den dar boşluğu basamaz; 10 mm iyi bir başlangıçtır.');
  const width = num('opt-width');
  if (!Number.isFinite(width) || width < 0.1 || width > 3) throw new Error('Çizgi kalınlığı 0,1 ile 3 pt arasında olmalı. İnce kalem hissi için 0,4, belirgin çizgi için 1 deneyin.');
  let spacing = T.def;
  if (type !== 'milimetrik') {
    spacing = num('opt-spacing');
    if (!Number.isFinite(spacing) || spacing < T.min || spacing > T.max) {
      throw new Error(`${T.label.replace(' (mm)', '')} ${String(T.min).replace('.', ',')} ile ${String(T.max).replace('.', ',')} mm arasında olmalı. Varsayılan değer ${String(T.def).replace('.', ',')} mm'dir.`);
    }
  }
  const title = $('opt-title').value.trim();
  if (title.length > 80) throw new Error('Başlık en fazla 80 karakter olabilir. Metni kısaltın.');
  const landscape = $('opt-orient').value === 'landscape';
  const [w, h] = SIZES[size];
  const o = {
    type, size, pages, margin: margin * MM, width, spacing: spacing * MM, title, date: $('opt-date').checked,
    bold5: $('opt-bold5').checked, color: hexToRgb($('opt-color').value),
    pw: landscape ? h : w, ph: landscape ? w : h,
  };
  const headH = (title || o.date) ? 14 * MM : 0;
  o.headH = headH;
  o.areaW = o.pw - 2 * o.margin;
  o.areaH = o.ph - 2 * o.margin - headH;
  if (o.areaW < 60 * MM || o.areaH < 60 * MM) throw new Error('Kenar boşlukları sayfaya göre çok geniş; çizim alanı kalmadı. Kenar boşluğunu küçültün (örneğin 10 mm).');
  return o;
}

async function loadFonts() {
  if (fontCache) return fontCache;
  const base = `${VENDOR}fonts/dejavu-sans@2.37/`;
  const get = (n) => fetch(`${base}${n}`).then((r) => { if (!r.ok) throw new Error('FONT'); return r.arrayBuffer(); });
  const [regular, bold] = await Promise.all([get('DejaVuSans.ttf'), get('DejaVuSans-Bold.ttf')]);
  fontCache = { regular, bold };
  return fontCache;
}

/** Doğru parçayı (x1,y1)-(x2,y2) dikdörtgene [0,w]x[0,h] kırpar (Liang–Barsky); görünmüyorsa null. */
function clip(x1, y1, x2, y2, w, h) {
  let t0 = 0, t1 = 1;
  const dx = x2 - x1, dy = y2 - y1;
  for (const [p, q] of [[-dx, x1], [dx, w - x1], [-dy, y1], [dy, h - y1]]) {
    if (p === 0) { if (q < 0) return null; continue; }
    const r = q / p;
    if (p < 0) { if (r > t1) return null; if (r > t0) t0 = r; } else { if (r < t0) return null; if (r < t1) t1 = r; }
  }
  return [x1 + t0 * dx, y1 + t0 * dy, x1 + t1 * dx, y1 + t1 * dy];
}

async function buildPdf(o) {
  const PDFLib = await getPdfLib();
  const { rgb, LineCapStyle } = PDFLib;
  const doc = await PDFLib.PDFDocument.create();
  doc.setProducer('Bilişim Ajans Ücretsiz Araçlar');
  doc.setCreator('araclar.bilisimajans.com');
  doc.setTitle(`${o.title || 'Yazdırılabilir kağıt'} – ${o.type}`);
  const col = rgb(o.color[0], o.color[1], o.color[2]);
  const dark = rgb(o.color[0] * 0.55, o.color[1] * 0.55, o.color[2] * 0.55);
  const lw = o.width;

  const needFont = Boolean(o.title) || o.date || o.type === 'cornell';
  let reg = null, bold = null;
  if (needFont) {
    await loadScript(`${VENDOR}pdf-lib-fontkit@1.1.1/fontkit.umd.min.js`);
    const fd = await loadFonts();
    doc.registerFontkit(window.fontkit);
    reg = await doc.embedFont(fd.regular, { subset: true });
    bold = await doc.embedFont(fd.bold, { subset: true });
  }

  const first = doc.addPage([o.pw, o.ph]);
  const ax = o.margin, ay = o.margin, aw = o.areaW, ah = o.areaH; // çizim alanı (sol-alt köşe, genişlik, yükseklik)
  const gray = rgb(0.4, 0.4, 0.4);

  /** Alan koordinatında (0,0 = sol alt) çizgi çizer. */
  const L = (x1, y1, x2, y2, w = lw, color = col, dash) => first.drawLine({
    start: { x: ax + x1, y: ay + y1 }, end: { x: ax + x2, y: ay + y2 }, thickness: w, color,
    ...(dash ? { dashArray: dash, dashPhase: 0 } : {}),
  });
  const s = o.spacing;

  // ---- Başlık alanı ----
  if (o.headH) {
    const hy = o.ph - o.margin;
    const maxTitle = o.date ? o.areaW * 0.6 : o.areaW;
    if (o.title) {
      let t = o.title;
      while (t.length > 1 && bold.widthOfTextAtSize(t, 14) > maxTitle) t = t.slice(0, -1);
      first.drawText(t, { x: o.margin, y: hy - 12, size: 14, font: bold, color: rgb(0.1, 0.1, 0.1) });
    }
    if (o.date) {
      const lab = 'Tarih:';
      const lwid = reg.widthOfTextAtSize(lab, 10);
      const lineW = Math.min(110, o.areaW * 0.3);
      const x2 = o.pw - o.margin;
      first.drawText(lab, { x: x2 - lineW - lwid - 4, y: hy - 12, size: 10, font: reg, color: gray });
      first.drawLine({ start: { x: x2 - lineW, y: hy - 13 }, end: { x: x2, y: hy - 13 }, thickness: 0.6, color: gray });
    }
    first.drawLine({ start: { x: o.margin, y: hy - o.headH + 6 }, end: { x: o.pw - o.margin, y: hy - o.headH + 6 }, thickness: 0.6, color: rgb(0.7, 0.7, 0.7) });
  }

  // ---- Türe göre çizim ----
  switch (o.type) {
    case 'cizgili': {
      for (let y = ah - s; y >= -0.01; y -= s) L(0, y, aw, y);
      break;
    }
    case 'kareli': {
      const cols = Math.floor(aw / s), rows = Math.floor(ah / s);
      const gw = cols * s, gh = rows * s, ox = (aw - gw) / 2, oy = (ah - gh) / 2;
      for (let i = 0; i <= cols; i++) L(ox + i * s, oy, ox + i * s, oy + gh, o.bold5 && i % 5 === 0 ? lw * 2 : lw);
      for (let j = 0; j <= rows; j++) L(ox, oy + j * s, ox + gw, oy + j * s, o.bold5 && j % 5 === 0 ? lw * 2 : lw);
      break;
    }
    case 'noktali': {
      const cols = Math.floor(aw / s), rows = Math.floor(ah / s);
      const ox = (aw - cols * s) / 2, oy = (ah - rows * s) / 2;
      const d = Math.max(0.8, lw * 2.4);
      for (let i = 0; i <= cols; i++) for (let j = 0; j <= rows; j++) {
        const x = ox + i * s, y = oy + j * s;
        // Sıfır uzunluklu yuvarlak uçlu çizgi = nokta; dosya boyutu küçük kalır.
        first.drawLine({ start: { x: ax + x, y: ay + y }, end: { x: ax + x + 0.01, y: ay + y }, thickness: d, color: col, lineCap: LineCapStyle.Round });
      }
      break;
    }
    case 'izometrik': {
      const dx = s * Math.sqrt(3) / 2, t = 1 / Math.sqrt(3);
      for (let x = 0; x <= aw + 0.01; x += dx) L(x, 0, x, ah);
      // +30° çizgiler: y = x·t + k·s
      for (let k = Math.ceil(-aw * t / s); k <= Math.floor(ah / s); k++) {
        const seg = clip(0, k * s, aw, aw * t + k * s, aw, ah);
        if (seg) L(seg[0], seg[1], seg[2], seg[3]);
      }
      // −30° çizgiler: y = −x·t + k·s
      for (let k = 0; k <= Math.ceil((ah + aw * t) / s); k++) {
        const seg = clip(0, k * s, aw, -aw * t + k * s, aw, ah);
        if (seg) L(seg[0], seg[1], seg[2], seg[3]);
      }
      break;
    }
    case 'muzik': {
      const g = s, staffH = 4 * g, pitch = 10 * g;
      const n = Math.max(1, Math.floor((ah + 6 * g) / pitch));
      const used = n * staffH + (n - 1) * 6 * g;
      const off = (ah - used) / 2;
      for (let i = 0; i < n; i++) {
        const top = ah - off - i * pitch;
        for (let j = 0; j < 5; j++) L(0, top - j * g, aw, top - j * g);
        L(0, top, 0, top - staffH, lw * 1.6, dark);
      }
      break;
    }
    case 'cornell': {
      const cue = aw * 0.3, sumH = ah * 0.2;
      const strong = lw * 2;
      L(0, 0, aw, 0, strong, dark); L(0, ah, aw, ah, strong, dark); L(0, 0, 0, ah, strong, dark); L(aw, 0, aw, ah, strong, dark);
      L(cue, sumH, cue, ah, strong, dark); L(0, sumH, aw, sumH, strong, dark);
      for (let y = ah - s; y > sumH + 0.5; y -= s) L(cue, y, aw, y);
      for (let y = sumH - s; y > 0.5; y -= s) L(0, y, aw, y);
      first.drawText('Anahtar sözcükler / sorular', { x: ax + 5, y: ay + ah - 11, size: 7.5, font: reg, color: gray });
      first.drawText('Notlar', { x: ax + cue + 5, y: ay + ah - 11, size: 7.5, font: reg, color: gray });
      first.drawText('Özet', { x: ax + 5, y: ay + sumH - 11, size: 7.5, font: reg, color: gray });
      break;
    }
    case 'ilkokul': {
      // Her satır: üst çizgi, kesik orta çizgi, taban çizgisi (kalın). Satırlar arası boşluk 1,2 aralık.
      const rowH = 2 * s, pitch = rowH + 1.2 * s;
      for (let top = ah; top - rowH >= -0.01; top -= pitch) {
        L(0, top, aw, top, lw);
        L(0, top - s, aw, top - s, lw, col, [3, 3]);
        L(0, top - rowH, aw, top - rowH, lw * 1.6, dark);
      }
      break;
    }
    case 'dik': {
      // Dik temel harfler: üst, kesik orta, taban (kalın) ve alt çizgi; hepsi eşit aralıklı.
      const rowH = 3 * s, pitch = rowH + 1.4 * s;
      for (let top = ah; top - rowH >= -0.01; top -= pitch) {
        L(0, top, aw, top, lw);
        L(0, top - s, aw, top - s, lw, col, [3, 3]);
        L(0, top - 2 * s, aw, top - 2 * s, lw * 1.6, dark);
        L(0, top - 3 * s, aw, top - 3 * s, lw);
      }
      break;
    }
    case 'milimetrik': {
      const cols = Math.floor(aw / MM / 10) * 10, rows = Math.floor(ah / MM / 10) * 10;
      const gw = cols * MM, gh = rows * MM, ox = (aw - gw) / 2, oy = (ah - gh) / 2;
      const wd = (i) => (i % 10 === 0 ? lw * 1.8 : i % 5 === 0 ? lw : lw * 0.4);
      for (let i = 0; i <= cols; i++) L(ox + i * MM, oy, ox + i * MM, oy + gh, wd(i));
      for (let j = 0; j <= rows; j++) L(ox, oy + j * MM, ox + gw, oy + j * MM, wd(j));
      break;
    }
    default:
      throw new Error('TYPE');
  }

  // Diğer sayfalar ilk sayfanın gömülü kopyasıdır.
  if (o.pages > 1) {
    const [emb] = await doc.embedPages([first]);
    for (let i = 1; i < o.pages; i++) {
      doc.addPage([o.pw, o.ph]).drawPage(emb, { x: 0, y: 0, width: o.pw, height: o.ph });
      if (i % 20 === 0) { setProgress($('progress'), 20 + (i / o.pages) * 70, `Sayfalar ekleniyor… (${i}/${o.pages})`); await tick(); }
    }
  }
  return { bytes: await doc.save({ useObjectStreams: false }), pages: o.pages };
}

/** İlk sayfayı pdf.js ile tuvale çizer. */
async function renderPreview(bytes) {
  const pdfjs = await getPdfJs();
  const d = await pdfjs.getDocument({ data: bytes.slice() }).promise;
  const pg = await d.getPage(1);
  const base = pg.getViewport({ scale: 1 });
  const vp = pg.getViewport({ scale: 760 / Math.max(base.width, base.height) * (base.width > base.height ? 1.15 : 1.25) });
  const cv = $('preview');
  cv.width = Math.floor(vp.width); cv.height = Math.floor(vp.height);
  const ctx = cv.getContext('2d');
  await pg.render({ canvasContext: ctx, viewport: vp }).promise;
  await d.destroy();
}

async function rebuild() {
  const token = ++buildToken;
  const cv = $('preview');
  cv.dataset.ready = '0';
  showError($('error'), null);
  let o;
  try { o = readOptions(); } catch (err) {
    lastBytes = null; $('download').disabled = true; $('info').textContent = '';
    showError($('error'), err.message);
    return;
  }
  setProgress($('progress'), 10, 'Kağıt çiziliyor…');
  await tick();
  try {
    const { bytes, pages } = await buildPdf(o);
    if (token !== buildToken) return;
    lastBytes = bytes;
    lastName = `${o.type}-kagit-${SIZE_LABEL[o.size].toLowerCase()}.pdf`;
    await renderPreview(bytes);
    if (token !== buildToken) return;
    $('info').textContent = `${pages} sayfa · ${SIZE_LABEL[o.size]} · ${formatBytes(bytes.length)} · ${lastName}`;
    $('download').disabled = false;
    cv.dataset.ready = '1';
    setProgress($('progress'), null);
  } catch (err) {
    if (token !== buildToken) return;
    console.error(err);
    setProgress($('progress'), null);
    lastBytes = null; $('download').disabled = true;
    const m = String(err && err.message);
    showError($('error'), m === 'FONT' || /Yüklenemedi/.test(m)
      ? 'Yazı tipi dosyası yüklenemedi. Sayfayı yenileyip tekrar deneyin ya da başlığı boş bırakın.'
      : 'Kağıt oluşturulurken beklenmeyen bir hata oldu. Sayfayı yenileyip tekrar deneyin; sorun sürerse aralığı büyütüp deneyin.');
  }
}

function schedule() { clearTimeout(timer); timerActive = true; timer = setTimeout(() => { timerActive = false; pending = rebuild(); }, 200); }

/** Tür değişince aralık alanının etiketini, varsayılanını ve ilgili seçenekleri günceller. */
function applyType() {
  const T = TYPES[$('opt-type').value];
  if (!T) return;
  $('spacing-wrap').hidden = T.name === 'milimetrik';
  $('lbl-spacing').textContent = T.label;
  $('hint-spacing').textContent = T.hint;
  $('opt-spacing').value = String(T.def).replace('.', ',');
  $('bold5-wrap').hidden = T.name !== 'kareli';
}

$('opt-type').addEventListener('change', () => { applyType(); schedule(); });
['opt-size', 'opt-orient', 'opt-date', 'opt-bold5', 'opt-color'].forEach((id) => $(id).addEventListener('change', schedule));
['opt-margin', 'opt-spacing', 'opt-width', 'opt-pages', 'opt-title'].forEach((id) => $(id).addEventListener('input', schedule));
$('download').addEventListener('click', async () => {
  if (timerActive) { clearTimeout(timer); timerActive = false; pending = rebuild(); }
  await pending;
  if (lastBytes) downloadBlob(new Blob([lastBytes], { type: 'application/pdf' }), lastName);
});
applyType();
pending = rebuild();
