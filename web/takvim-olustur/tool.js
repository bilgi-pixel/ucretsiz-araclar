// Yazdırılabilir Takvim — aylık, yıllık ve haftalık planlayıcı PDF'i üretir (pdf-lib, vektörel çizim).
// Türkçe ay/gün adları için fontkit + DejaVu Sans gömülür. Hiçbir veri ağa gitmez;
// kütüphane, yazı tipi ve tatil listesi aynı origin'den okunur.
import { setProgress, downloadBlob, formatBytes, showError, getPdfLib, getPdfJs, loadScript, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const VENDOR = new URL('../vendor/', import.meta.url).href;
const PARAM_URL = new URL('parametreler.json', import.meta.url).href;
const PAGES = { portrait: [595.28, 841.89], landscape: [841.89, 595.28] };
const MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const DAYS = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
const INITIALS = ['P', 'S', 'Ç', 'P', 'C', 'C', 'P'];
// Her yıl aynı gününe denk gelen resmî tatiller (ay 1-12).
const FIXED = [
  [1, 1, 'Yılbaşı'], [4, 23, 'Ulusal Egemenlik ve Çocuk Bayramı'], [5, 1, 'Emek ve Dayanışma Günü'],
  [5, 19, "Atatürk'ü Anma, Gençlik ve Spor Bayramı"], [7, 15, 'Demokrasi ve Millî Birlik Günü'],
  [8, 30, 'Zafer Bayramı'], [10, 29, 'Cumhuriyet Bayramı'],
];
const THEMES = {
  bordo: { accent: [0.48, 0.14, 0.19], tint: [0.98, 0.9, 0.91], head: [0.48, 0.14, 0.19], headText: [1, 1, 1], holiday: [0.48, 0.14, 0.19] },
  gri: { accent: [0.25, 0.27, 0.3], tint: [0.9, 0.9, 0.9], head: [0.35, 0.37, 0.4], headText: [1, 1, 1], holiday: [0.35, 0.37, 0.4] },
  bw: { accent: [0, 0, 0], tint: [0.86, 0.86, 0.86], head: null, headText: [0, 0, 0], holiday: [0, 0, 0] },
};

let params = null;          // parametreler.json içeriği (2026 resmî tatilleri)
let paramsFailed = false;
let fontCache = null;
let lastBytes = null;
let lastName = 'takvim.pdf';
let buildToken = 0;
let pending = Promise.resolve();
let timer = 0;

const pad = (n) => String(n).padStart(2, '0');
const dateKey = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
const dim = (y, m) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
const mondayIndex = (y, m, d) => (new Date(Date.UTC(y, m, d)).getUTCDay() + 6) % 7;

/** ISO 8601 hafta numarası (Pazartesi başlar). */
function isoWeek(y, m, d) {
  const t = new Date(Date.UTC(y, m, d));
  t.setUTCDate(t.getUTCDate() - ((t.getUTCDay() + 6) % 7) + 3);
  const first = new Date(Date.UTC(t.getUTCFullYear(), 0, 4));
  return 1 + Math.round(((t - first) / 864e5 - 3 + ((first.getUTCDay() + 6) % 7)) / 7);
}

const holidayCache = new Map();
/** Yıl için tatil haritası: tarih anahtarı → ad. 2026 parametreden, diğer yıllar yalnızca sabit tatiller. */
function holidaysOf(year) {
  if (holidayCache.has(year)) return holidayCache.get(year);
  const map = new Map();
  if (params && params.yil === year) {
    for (const h of params.resmi_tatiller) map.set(h.tarih, h.ad);
  } else {
    for (const [m, d, ad] of FIXED) map.set(dateKey(year, m - 1, d), ad);
  }
  holidayCache.set(year, map);
  return map;
}

async function loadParams() {
  if (params || paramsFailed) return;
  try {
    const r = await fetch(PARAM_URL);
    if (!r.ok) throw new Error('PARAM');
    params = await r.json();
    const el = $('param-date');
    if (el && params.guncelleme) el.textContent = `Tatil listesi ${params.guncelleme.split('-').reverse().join('.')} tarihinde güncellendi.`;
  } catch {
    paramsFailed = true; // yalnızca sabit tatillerle devam edilir
  }
}

async function loadFonts() {
  if (fontCache) return fontCache;
  const base = `${VENDOR}fonts/dejavu-sans@2.37/`;
  const get = (n) => fetch(`${base}${n}`).then((r) => { if (!r.ok) throw new Error('FONT'); return r.arrayBuffer(); });
  const [regular, bold] = await Promise.all([get('DejaVuSans.ttf'), get('DejaVuSans-Bold.ttf')]);
  fontCache = { regular, bold };
  return fontCache;
}

function readOptions() {
  const year = Number($('opt-year').value);
  const type = $('opt-type').value;
  const orient = $('opt-orient').value;
  const theme = $('opt-theme').value;
  const title = $('opt-title').value.trim();
  if (!Number.isInteger(year) || year < 2025 || year > 2030) throw new Error('Yıl 2025 ile 2030 arasında olmalı. Listeden bir yıl seçin.');
  if (!['aylik', 'yillik', 'haftalik'].includes(type)) throw new Error('Takvim türü anlaşılamadı. Aylık, yıllık ya da haftalık seçeneklerinden birini seçin.');
  if (!THEMES[theme]) throw new Error('Renk teması anlaşılamadı. Listeden bir tema seçin.');
  if (title.length > 80) throw new Error('Başlık en fazla 80 karakter olabilir. Kurum adını kısaltın.');
  const [w, h] = PAGES[orient === 'landscape' ? 'landscape' : 'portrait'];
  return {
    year, type, theme: THEMES[theme], title,
    pw: w, ph: h, landscape: orient === 'landscape',
    weekNums: $('opt-weeknums').checked,
    holidays: $('opt-holidays').checked,
    notes: $('opt-notes').checked,
  };
}

/** Kelimeleri genişliğe göre satırlara böler. */
function wrapText(font, size, text, maxW) {
  const words = text.split(/\s+/); const lines = []; let cur = '';
  for (const w of words) {
    const t = cur ? `${cur} ${w}` : w;
    if (font.widthOfTextAtSize(t, size) <= maxW || !cur) cur = t; else { lines.push(cur); cur = w; }
  }
  if (cur) lines.push(cur);
  return lines;
}
/** Metni genişliğe sığdırır; taşarsa sonuna "…" koyar. */
function fit(font, size, text, maxW) {
  if (font.widthOfTextAtSize(text, size) <= maxW) return text;
  let s = text;
  while (s.length > 1 && font.widthOfTextAtSize(`${s}…`, size) > maxW) s = s.slice(0, -1);
  return `${s}…`;
}

async function buildPdf(o) {
  const PDFLib = await getPdfLib();
  await loadScript(`${VENDOR}pdf-lib-fontkit@1.1.1/fontkit.umd.min.js`);
  const fd = await loadFonts();
  const doc = await PDFLib.PDFDocument.create();
  doc.registerFontkit(window.fontkit);
  doc.setProducer('Bilişim Ajans Ücretsiz Araçlar');
  doc.setCreator('araclar.bilisimajans.com');
  doc.setTitle(`${o.title ? `${o.title} – ` : ''}Takvim ${o.year}`);
  const reg = await doc.embedFont(fd.regular, { subset: true });
  const bold = await doc.embedFont(fd.bold, { subset: true });
  const { rgb } = PDFLib;
  const c = (a) => rgb(a[0], a[1], a[2]);
  const T = o.theme;
  const accent = c(T.accent), grey = rgb(0.45, 0.45, 0.45), lineC = rgb(0.62, 0.62, 0.62), light = rgb(0.78, 0.78, 0.78), black = rgb(0.1, 0.1, 0.1);
  const { pw, ph } = o;
  const M = 36;
  const W = pw - 2 * M;
  const holidays = (y) => (o.holidays ? holidaysOf(y) : new Map());

  const text = (page, s, x, y, size, font, color) => page.drawText(s, { x, y, size, font, color });
  const textC = (page, s, cx, y, size, font, color) => text(page, s, cx - font.widthOfTextAtSize(s, size) / 2, y, size, font, color);

  /** Sayfa üst bilgisi (kurum/başlık) ve alt notu; içeriğin başlayacağı y'yi döndürür. */
  const frame = (page) => {
    let y = ph - M;
    if (o.title) { text(page, fit(bold, 10, o.title, W), M, y - 9, 10, bold, grey); y -= 16; }
    text(page, 'araclar.bilisimajans.com · Ücretsiz yazdırılabilir takvim', M, 22, 7, reg, grey);
    if (o.holidays && o.year !== (params && params.yil)) {
      const note = 'Dini bayramlar bu yıl için işaretlenmedi; tarihleri Diyanet takvimiyle kontrol edin.';
      text(page, note, pw - M - reg.widthOfTextAtSize(note, 7), 22, 7, reg, grey);
    }
    return y;
  };

  const monthWeeks = (y, m) => Math.ceil((mondayIndex(y, m, 1) + dim(y, m)) / 7);

  // ---- Aylık sayfa ----
  const drawMonth = (page, m) => {
    const y0 = frame(page);
    const y = o.year;
    const hol = holidays(y);
    text(page, `${MONTHS[m]} ${y}`, M, y0 - 26, 26, bold, accent);
    let top = y0 - 40;
    const notesH = o.notes ? (o.landscape ? 62 : 150) : 0;
    const bottom = M + (notesH ? notesH + 12 : 0);
    const weeks = monthWeeks(y, m);
    const headH = 18;
    const wcol = o.weekNums ? 22 : 0;
    const cw = (W - wcol) / 7;
    const ch = (top - bottom - headH) / weeks;
    // Gün adları satırı
    if (T.head) page.drawRectangle({ x: M, y: top - headH, width: W, height: headH, color: c(T.head) });
    else page.drawLine({ start: { x: M, y: top - headH }, end: { x: M + W, y: top - headH }, thickness: 1.2, color: black });
    if (wcol) textC(page, 'Hf', M + wcol / 2, top - 12.5, 8, bold, c(T.headText));
    for (let i = 0; i < 7; i++) textC(page, DAYS[i], M + wcol + cw * i + cw / 2, top - 12.5, 8.5, bold, c(T.headText));
    top -= headH;
    const first = mondayIndex(y, m, 1);
    for (let r = 0; r < weeks; r++) {
      const rowTop = top - r * ch;
      if (wcol) {
        const d0 = new Date(Date.UTC(y, m, 1 - first + r * 7));
        page.drawRectangle({ x: M, y: rowTop - ch, width: wcol, height: ch, borderColor: lineC, borderWidth: 0.5 });
        textC(page, String(isoWeek(d0.getUTCFullYear(), d0.getUTCMonth(), d0.getUTCDate())), M + wcol / 2, rowTop - 13, 8, reg, grey);
      }
      for (let k = 0; k < 7; k++) {
        const dt = new Date(Date.UTC(y, m, 1 - first + r * 7 + k));
        const inMonth = dt.getUTCMonth() === m;
        const name = inMonth ? hol.get(dateKey(y, m, dt.getUTCDate())) : null;
        const x = M + wcol + cw * k;
        page.drawRectangle({ x, y: rowTop - ch, width: cw, height: ch, borderColor: lineC, borderWidth: 0.5, color: name ? c(T.tint) : undefined });
        const numColor = !inMonth ? light : name ? c(T.holiday) : k === 6 ? accent : black;
        text(page, String(dt.getUTCDate()), x + 4, rowTop - 14, 12, bold, numColor);
        if (name) {
          const maxLines = Math.max(0, Math.floor((ch - 26) / 8));
          let lines = wrapText(reg, 6.5, name, cw - 8);
          if (lines.length > maxLines) { lines = lines.slice(0, maxLines); if (lines.length) lines[lines.length - 1] = fit(reg, 6.5, `${lines[lines.length - 1]} …`, cw - 8); }
          lines.forEach((l, i) => text(page, l, x + 4, rowTop - 25 - i * 8, 6.5, reg, c(T.holiday)));
        }
      }
    }
    // Not alanı
    if (notesH) {
      const ny = M + notesH;
      text(page, 'Notlar', M, ny - 8, 8, bold, grey);
      for (let yy = ny - 22; yy >= M - 0.5; yy -= 16) page.drawLine({ start: { x: M, y: yy }, end: { x: M + W, y: yy }, thickness: 0.4, color: lineC });
    }
  };

  // ---- Yıllık sayfa ----
  const drawYear = (page) => {
    const y0 = frame(page);
    const hol = holidays(o.year);
    text(page, String(o.year), M, y0 - 30, 32, bold, accent);
    const cols = o.landscape ? 4 : 3, rows = o.landscape ? 3 : 4;
    const gap = 14;
    const top = y0 - 46, bottom = M + 14;
    const bw = (W - gap * (cols - 1)) / cols, bh = (top - bottom - gap * (rows - 1)) / rows;
    for (let m = 0; m < 12; m++) {
      const x = M + (m % cols) * (bw + gap);
      const yTop = top - Math.floor(m / cols) * (bh + gap);
      text(page, MONTHS[m], x, yTop - 11, 11, bold, accent);
      page.drawLine({ start: { x, y: yTop - 15 }, end: { x: x + bw, y: yTop - 15 }, thickness: 0.8, color: accent });
      const wcol = o.weekNums ? 13 : 0;
      const cw = (bw - wcol) / 7;
      const rh = Math.min(15, (bh - 38) / 6);
      for (let i = 0; i < 7; i++) textC(page, INITIALS[i], x + wcol + cw * i + cw / 2, yTop - 26, 6.5, bold, i === 6 ? accent : grey);
      const first = mondayIndex(o.year, m, 1);
      const n = dim(o.year, m);
      for (let d = 1; d <= n; d++) {
        const idx = first + d - 1; const r = Math.floor(idx / 7), k = idx % 7;
        const cx = x + wcol + cw * k + cw / 2;
        const ty = yTop - 30 - (r + 1) * rh + (rh - 7) / 2 + 0.5;
        const name = hol.get(dateKey(o.year, m, d));
        if (name) {
          const bwid = Math.min(cw, rh) - 1;
          page.drawRectangle({ x: cx - bwid / 2, y: ty - 2.5, width: bwid, height: rh - 3, color: c(T.holiday) });
        }
        textC(page, String(d), cx, ty, 8, name ? bold : reg, name ? rgb(1, 1, 1) : k === 6 ? accent : black);
        if (wcol && (k === 0 || d === 1) && (k === 0)) textC(page, String(isoWeek(o.year, m, d)), x + wcol / 2 - 1, ty, 6, reg, grey);
      }
    }
    if (o.holidays) {
      page.drawRectangle({ x: M, y: M + 2, width: 8, height: 8, color: c(T.holiday) });
      text(page, 'Resmî tatil ve dini bayram günleri', M + 13, M + 3, 8, reg, black);
    }
  };

  // ---- Haftalık sayfa ----
  const drawWeek = (page, monday) => {
    const y0 = frame(page);
    const days = [];
    for (let i = 0; i < 7; i++) days.push(new Date(monday + i * 864e5));
    const a = days[0], b = days[6];
    const label = a.getUTCMonth() === b.getUTCMonth()
      ? `${a.getUTCDate()} – ${b.getUTCDate()} ${MONTHS[b.getUTCMonth()]} ${b.getUTCFullYear()}`
      : `${a.getUTCDate()} ${MONTHS[a.getUTCMonth()]}${a.getUTCFullYear() !== b.getUTCFullYear() ? ` ${a.getUTCFullYear()}` : ''} – ${b.getUTCDate()} ${MONTHS[b.getUTCMonth()]} ${b.getUTCFullYear()}`;
    text(page, label, M, y0 - 20, 18, bold, accent);
    if (o.weekNums) {
      const th = days[3];
      const wl = `Hafta ${isoWeek(th.getUTCFullYear(), th.getUTCMonth(), th.getUTCDate())}`;
      text(page, wl, pw - M - bold.widthOfTextAtSize(wl, 11), y0 - 18, 11, bold, grey);
    }
    const top = y0 - 34, bottom = M + 6, gap = 8;
    const bw = (W - gap) / 2, bh = (top - bottom - gap * 3) / 4;
    for (let i = 0; i < 8; i++) {
      const x = M + (i % 2) * (bw + gap);
      const yTop = top - Math.floor(i / 2) * (bh + gap);
      const dt = days[i];
      const name = dt ? holidays(dt.getUTCFullYear()).get(dateKey(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate())) : null;
      page.drawRectangle({ x, y: yTop - bh, width: bw, height: bh, borderColor: lineC, borderWidth: 0.6 });
      page.drawRectangle({ x, y: yTop - 18, width: bw, height: 18, color: c(name ? T.tint : [0.95, 0.95, 0.95]), borderColor: lineC, borderWidth: 0.6 });
      const head = dt ? `${DAYS[i]} ${dt.getUTCDate()} ${MONTHS[dt.getUTCMonth()]}` : 'Notlar';
      text(page, head, x + 6, yTop - 12.5, 9.5, bold, name ? c(T.holiday) : black);
      if (name) { const nm = fit(reg, 7, name, bw - 12 - bold.widthOfTextAtSize(head, 9.5) - 8); text(page, nm, x + bw - 6 - reg.widthOfTextAtSize(nm, 7), yTop - 12, 7, reg, c(T.holiday)); }
      for (let yy = yTop - 36; yy >= yTop - bh + 6; yy -= 17) page.drawLine({ start: { x: x + 6, y: yy }, end: { x: x + bw - 6, y: yy }, thickness: 0.4, color: lineC });
    }
  };

  let total = 1;
  if (o.type === 'aylik') {
    total = 12;
    for (let m = 0; m < 12; m++) {
      drawMonth(doc.addPage([pw, ph]), m);
      if (m % 3 === 2) { setProgress($('progress'), 10 + (m / 12) * 80, `Aylar çiziliyor… (${m + 1}/12)`); await tick(); }
    }
  } else if (o.type === 'yillik') {
    drawYear(doc.addPage([pw, ph]));
  } else {
    // Yılın ilk gününü içeren haftanın Pazartesi'sinden son günü içeren haftanın sonuna kadar.
    let mon = Date.UTC(o.year, 0, 1) - mondayIndex(o.year, 0, 1) * 864e5;
    const end = Date.UTC(o.year, 11, 31);
    total = 0;
    while (mon <= end) {
      drawWeek(doc.addPage([pw, ph]), mon); mon += 7 * 864e5; total++;
      if (total % 10 === 0) { setProgress($('progress'), 10 + Math.min(80, total * 1.5), `Haftalar çiziliyor… (${total})`); await tick(); }
    }
  }
  return { bytes: await doc.save({ useObjectStreams: false }), pages: total };
}

/** İlk sayfayı pdf.js ile tuvale çizer. */
async function renderPreview(bytes) {
  const pdfjs = await getPdfJs();
  const task = pdfjs.getDocument({ data: bytes.slice() });
  const d = await task.promise;
  const pg = await d.getPage(1);
  const base = pg.getViewport({ scale: 1 });
  const vp = pg.getViewport({ scale: 900 / base.width });
  const cv = $('preview');
  cv.width = Math.floor(vp.width); cv.height = Math.floor(vp.height);
  await pg.render({ canvasContext: cv.getContext('2d'), viewport: vp }).promise;
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
  $('note-year').hidden = !(o.holidays && o.year !== 2026);
  $('notes-wrap').hidden = o.type !== 'aylik';
  setProgress($('progress'), 5, 'Takvim hazırlanıyor…');
  await tick();
  try {
    await loadParams();
    holidayCache.clear();
    const { bytes, pages } = await buildPdf(o);
    if (token !== buildToken) return; // daha yeni bir istek var
    lastBytes = bytes;
    lastName = `takvim-${o.year}-${o.type}.pdf`;
    await renderPreview(bytes);
    if (token !== buildToken) return;
    $('info').textContent = `${pages} sayfa · ${formatBytes(bytes.length)} · ${lastName}`;
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
      ? 'Yazı tipi dosyası yüklenemedi. Sayfayı yenileyip tekrar deneyin.'
      : 'Takvim oluşturulurken beklenmeyen bir hata oldu. Sayfayı yenileyip tekrar deneyin; sorun sürerse farklı bir yıl veya tür seçin.');
  }
}

let timerActive = false;
function schedule() { clearTimeout(timer); timerActive = true; timer = setTimeout(() => { timerActive = false; pending = rebuild(); }, 150); }

['opt-year', 'opt-type', 'opt-orient', 'opt-theme', 'opt-weeknums', 'opt-holidays', 'opt-notes'].forEach((id) => $(id).addEventListener('change', schedule));
$('opt-title').addEventListener('input', schedule);
$('download').addEventListener('click', async () => {
  if (timerActive) { clearTimeout(timer); timerActive = false; pending = rebuild(); }
  await pending;
  if (lastBytes) downloadBlob(new Blob([lastBytes], { type: 'application/pdf' }), lastName);
});
$('opt-year').value = '2026';
pending = rebuild();
