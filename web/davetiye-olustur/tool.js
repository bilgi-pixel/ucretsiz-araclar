// Davetiye ve Kutlama Kartı Oluşturucu — canvas ile çizer; PNG ve PDF (JPEG gömülü, 300 dpi) üretir.
// Şablonlar bu dosyadaki kendi çizim kodumuzdur (stok görsel yok). Hiçbir veri ağa gitmez; yazı tipleri aynı origin'den okunur.
import { downloadBlob, showError, getPdfLib, setProgress, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const FONT_BASE = new URL('../vendor/fonts/', import.meta.url).href;
const UR_LATIN = 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';
const UR_EXT = 'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF';

/* ---------- Yazı tipleri ---------- */
const FONTS = {
  vibes: { family: 'BA-GreatVibes', weights: '400', scale: 1.08, files: ['great-vibes/great-vibes-latin.woff2', 'great-vibes/great-vibes-latin-ext.woff2'] },
  dancing: { family: 'BA-Dancing', weights: '400 700', scale: 1, files: ['dancing-script/dancing-script-latin.woff2', 'dancing-script/dancing-script-latin-ext.woff2'] },
  pacifico: { family: 'BA-Pacifico', weights: '400', scale: 0.8, files: ['pacifico/pacifico-latin.woff2', 'pacifico/pacifico-latin-ext.woff2'] },
  caveat: { family: 'BA-Caveat', weights: '400 700', scale: 1.15, files: ['caveat/caveat-latin.woff2', 'caveat/caveat-latin-ext.woff2'] },
};
const fontLoads = {};
function loadFont(key) {
  if (!fontLoads[key]) {
    const f = FONTS[key];
    fontLoads[key] = Promise.all(f.files.map(async (file, i) => {
      const face = new FontFace(f.family, `url("${FONT_BASE + file}") format("woff2")`, { weight: f.weights, unicodeRange: i === 0 ? UR_LATIN : UR_EXT });
      await face.load(); document.fonts.add(face);
    })).catch(() => { /* yazı tipi yüklenemezse cursive yedeği kullanılır */ });
  }
  return fontLoads[key];
}

/* ---------- Türler ve boyutlar ---------- */
const TYPES = {
  dugun: { title: 'Düğünümüze Davetlisiniz', label: 'Gelin ve damat adları', ph: 'Ayşe & Mehmet' },
  nisan: { title: 'Nişanımıza Davetlisiniz', label: 'Nişanlıların adları', ph: 'Elif & Can' },
  sunnet: { title: 'Sünnet Düğünümüze Davetlisiniz', label: 'Çocuğun adı', ph: 'Yusuf Efe' },
  dogumgunu: { title: 'Doğum Günü Partisine Davetlisiniz', label: 'Doğum günü sahibinin adı', ph: 'Defne' },
  mezuniyet: { title: 'Mezuniyet Törenimize Davetlisiniz', label: 'Mezunun adı', ph: 'Zeynep Kaya' },
  acilis: { title: 'Açılışımıza Davetlisiniz', label: 'İşletme adı', ph: 'Çınar Kafe' },
  toplanti: { title: 'Etkinliğimize Davetlisiniz', label: 'Etkinlik adı', ph: 'Mahalle Buluşması' },
};
const SIZES = {
  a5: { w: 1748, h: 2480, ptW: 419.53, ptH: 595.28, label: 'A5' },
  '10x15': { w: 1181, h: 1772, ptW: 283.46, ptH: 425.2, label: '10x15' },
  kare: { w: 1080, h: 1080, ptW: 518.4, ptH: 518.4, label: 'instagram-kare' },
  hikaye: { w: 1080, h: 1920, ptW: 518.4, ptH: 921.6, label: 'hikaye' },
};

/* ---------- Süs çizimleri ---------- */
const LEAF = new Path2D('M0 0 C 20 -34 64 -34 90 0 C 64 34 20 34 0 0 Z');
function flower(ctx, x, y, r, petal, center) {
  ctx.save(); ctx.translate(x, y);
  ctx.fillStyle = petal;
  for (let i = 0; i < 6; i++) { ctx.rotate(Math.PI / 3); ctx.beginPath(); ctx.ellipse(0, -r * 0.55, r * 0.3, r * 0.55, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = center; ctx.beginPath(); ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}
function leaf(ctx, x, y, len, rot, color) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(len / 90, len / 90); ctx.fillStyle = color; ctx.fill(LEAF); ctx.restore();
}
function floralCorner(ctx, u) {
  // Sol üst köşe kümesi (diğer köşeler aynalanır)
  leaf(ctx, 0.02 * u, 0.02 * u, 0.2 * u, Math.PI * 0.12, '#7fa37a');
  leaf(ctx, 0.02 * u, 0.02 * u, 0.2 * u, Math.PI * 0.38, '#6c9068');
  leaf(ctx, 0.02 * u, 0.02 * u, 0.15 * u, Math.PI * 0.25, '#93b58d');
  flower(ctx, 0.1 * u, 0.1 * u, 0.1 * u, '#f2a5b5', '#c2415d');
  flower(ctx, 0.2 * u, 0.045 * u, 0.065 * u, '#f7c9a8', '#d9763a');
  flower(ctx, 0.045 * u, 0.21 * u, 0.065 * u, '#f7c9a8', '#d9763a');
  flower(ctx, 0.17 * u, 0.17 * u, 0.045 * u, '#fff', '#e0a63a');
}
function diamond(ctx, x, y, r, color) {
  ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(x, y - r); ctx.lineTo(x + r, y); ctx.lineTo(x, y + r); ctx.lineTo(x - r, y); ctx.closePath(); ctx.fill();
}
function rrect(ctx, x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}

/* ---------- Şablonlar ---------- */
const SERIF = 'Georgia, "Times New Roman", serif';
const SANS = '"IBM Plex Sans", "Segoe UI", system-ui, Arial, sans-serif';
const TEMPLATES = {
  bordo: {
    body: SERIF, title: '#7b2331', names: '#7b2331', text: '#3b2a2d', accent: '#b08a4a', inset: 0.11,
    draw(ctx, W, H, u) {
      ctx.fillStyle = '#fbf4ea'; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = '#7b2331'; ctx.lineWidth = 0.007 * u; ctx.strokeRect(0.05 * u, 0.05 * u, W - 0.1 * u, H - 0.1 * u);
      ctx.lineWidth = 0.0025 * u; ctx.strokeRect(0.07 * u, 0.07 * u, W - 0.14 * u, H - 0.14 * u);
      [[0.05, 0.05], [1, 0.05], [0.05, 1], [1, 1]].forEach(([fx, fy]) => diamond(ctx, fx === 1 ? W - 0.05 * u : fx * u, fy === 1 ? H - 0.05 * u : fy * u, 0.016 * u, '#b08a4a'));
    },
    divider(ctx, cx, y, u, color) { ctx.strokeStyle = color; ctx.lineWidth = 0.0025 * u; ctx.beginPath(); ctx.moveTo(cx - 0.18 * u, y); ctx.lineTo(cx - 0.03 * u, y); ctx.moveTo(cx + 0.03 * u, y); ctx.lineTo(cx + 0.18 * u, y); ctx.stroke(); diamond(ctx, cx, y, 0.012 * u, color); },
  },
  altin: {
    body: SERIF, title: '#7a5c12', names: '#7a5c12', text: '#2b2a28', accent: '#b8913b', inset: 0.12,
    draw(ctx, W, H, u) {
      ctx.fillStyle = '#fffdf7'; ctx.fillRect(0, 0, W, H);
      const g = ctx.createLinearGradient(0, 0, W, 0); g.addColorStop(0, '#9a7620'); g.addColorStop(0.5, '#e3c474'); g.addColorStop(1, '#9a7620');
      ctx.fillStyle = g;
      [0.06, 0.07].forEach((f, i) => { ctx.fillRect(0.06 * u, f * u + i * 0.002 * u, W - 0.12 * u, i ? 0.0025 * u : 0.008 * u); ctx.fillRect(0.06 * u, H - f * u - 0.008 * u - i * 0.002 * u, W - 0.12 * u, i ? 0.0025 * u : 0.008 * u); });
      ctx.strokeStyle = g; ctx.lineWidth = 0.004 * u;
      const L = 0.1 * u, o = 0.09 * u;
      [[o, o, 1, 1], [W - o, o, -1, 1], [o, H - o, 1, -1], [W - o, H - o, -1, -1]].forEach(([x, y, sx, sy]) => { ctx.beginPath(); ctx.moveTo(x, y + sy * L); ctx.lineTo(x, y); ctx.lineTo(x + sx * L, y); ctx.stroke(); });
    },
    divider(ctx, cx, y, u, color) { ctx.fillStyle = color; ctx.fillRect(cx - 0.16 * u, y - 0.001 * u, 0.13 * u, 0.003 * u); ctx.fillRect(cx + 0.03 * u, y - 0.001 * u, 0.13 * u, 0.003 * u); diamond(ctx, cx, y, 0.011 * u, color); },
  },
  pastel: {
    body: SANS, title: '#7a5a8a', names: '#a0456e', text: '#4d3a55', accent: '#e8a0bf', inset: 0.14,
    draw(ctx, W, H, u) {
      const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#fde4ec'); g.addColorStop(0.55, '#f0e6fb'); g.addColorStop(1, '#dff0fb');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      const dots = [[0.1, 0.12, 0.05, '#ffd1dc'], [0.9, 0.08, 0.035, '#c9e4f7'], [0.85, 0.9, 0.06, '#e5d4f5'], [0.08, 0.88, 0.04, '#ffe9b8'], [0.5, 0.04, 0.02, '#ffd1dc'], [0.95, 0.5, 0.025, '#ffe9b8'], [0.04, 0.5, 0.03, '#c9e4f7']];
      dots.forEach(([fx, fy, r, c]) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(fx * W, fy * H, r * u, 0, Math.PI * 2); ctx.fill(); });
      ctx.fillStyle = 'rgba(255,255,255,.72)'; rrect(ctx, 0.07 * u, 0.07 * u, W - 0.14 * u, H - 0.14 * u, 0.06 * u); ctx.fill();
    },
    divider(ctx, cx, y, u, color) { [-1, 0, 1].forEach((k) => { ctx.fillStyle = color; ctx.beginPath(); ctx.arc(cx + k * 0.04 * u, y, 0.008 * u, 0, Math.PI * 2); ctx.fill(); }); },
  },
  minimal: {
    body: SANS, title: '#111111', names: '#111111', text: '#222222', accent: '#111111', inset: 0.12,
    draw(ctx, W, H, u) {
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#111'; ctx.fillRect(W / 2 - 0.05 * u, 0.07 * u, 0.1 * u, 0.006 * u); ctx.fillRect(W / 2 - 0.05 * u, H - 0.07 * u, 0.1 * u, 0.006 * u);
    },
    divider(ctx, cx, y, u, color) { ctx.fillStyle = color; ctx.fillRect(cx - 0.03 * u, y, 0.06 * u, 0.003 * u); },
  },
  cicekli: {
    body: SERIF, title: '#9a3550', names: '#b0405a', text: '#4a3b3b', accent: '#7fa37a', inset: 0.2,
    draw(ctx, W, H, u) {
      ctx.fillStyle = '#fffaf5'; ctx.fillRect(0, 0, W, H);
      [[0, 0, 1, 1], [W, 0, -1, 1], [0, H, 1, -1], [W, H, -1, -1]].forEach(([x, y, sx, sy]) => { ctx.save(); ctx.translate(x, y); ctx.scale(sx, sy); floralCorner(ctx, u); ctx.restore(); });
    },
    divider(ctx, cx, y, u, color) { leaf(ctx, cx - 0.01 * u, y, 0.09 * u, Math.PI, color); leaf(ctx, cx + 0.01 * u, y, 0.09 * u, 0, color); flower(ctx, cx, y, 0.03 * u, '#f2a5b5', '#c2415d'); },
  },
  koyu: {
    body: SANS, title: '#d9b25f', names: '#f0d594', text: '#eae4d8', accent: '#d9b25f', inset: 0.12,
    draw(ctx, W, H, u) {
      const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#14121a'); g.addColorStop(1, '#241a2e');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = '#d9b25f'; ctx.lineWidth = 0.004 * u; ctx.strokeRect(0.05 * u, 0.05 * u, W - 0.1 * u, H - 0.1 * u);
      ctx.lineWidth = 0.0018 * u; ctx.strokeRect(0.065 * u, 0.065 * u, W - 0.13 * u, H - 0.13 * u);
    },
    divider(ctx, cx, y, u, color) { ctx.fillStyle = color; ctx.fillRect(cx - 0.12 * u, y, 0.09 * u, 0.002 * u); ctx.fillRect(cx + 0.03 * u, y, 0.09 * u, 0.002 * u); diamond(ctx, cx, y + 0.001 * u, 0.01 * u, color); },
  },
};

/* ---------- Veri ---------- */
function formatDate(v) {
  if (!v) return '';
  const [y, m, d] = v.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long', timeZone: 'UTC' }).format(dt);
}
function readData(forPreview) {
  const type = TYPES[$('inv-type').value];
  const names = $('f-names').value.trim();
  return {
    title: $('f-title').value.trim(),
    names: names || (forPreview ? type.ph : ''),
    date: formatDate($('f-date').value),
    time: $('f-time').value ? `Saat ${$('f-time').value}` : '',
    venue: $('f-venue').value.trim(), address: $('f-address').value.trim(), note: $('f-note').value.trim(),
    rsvp: $('f-rsvp').value.trim() ? `Katılım için: ${$('f-rsvp').value.trim()}` : '',
  };
}

/* ---------- Metin yerleşimi ---------- */
function wrapLines(ctx, text, maxW) {
  const out = [];
  for (const para of text.split(/\n+/)) {
    let cur = '';
    for (const w of para.split(/\s+/).filter(Boolean)) {
      const t = cur ? `${cur} ${w}` : w;
      if (ctx.measureText(t).width <= maxW || !cur) cur = t; else { out.push(cur); cur = w; }
    }
    if (cur) out.push(cur);
  }
  return out;
}

/** Davetiyeyi verilen tuvale çizer; ölçü birimi u = min(genişlik, yükseklik×0.75). */
function drawInvitation(cv, W, H, data) {
  const ctx = cv.getContext('2d');
  cv.width = W; cv.height = H;
  const tpl = TEMPLATES[$('inv-template').value];
  const font = FONTS[$('inv-font').value];
  const u = Math.min(W, H * 0.75);
  tpl.draw(ctx, W, H, u);
  const script = `"${font.family}", cursive`;
  const margin = tpl.inset * u;
  const boxW = W - margin * 2, availH = H - margin * 2;
  // Satır tanımları: [metin, yazı tipi, boyut(u), renk, satır aralığı, öncesinde boşluk(u), büyük harf, harf aralığı]
  const specs = [];
  if (data.title) specs.push({ t: data.title.toLocaleUpperCase('tr'), f: tpl.body, w: 600, s: 0.031, c: tpl.title, lh: 1.5, gap: 0, ls: 0.006 });
  specs.push({ t: data.names, f: script, w: 400, s: 0.125 * font.scale, c: tpl.names, lh: 1.12, gap: data.title ? 0.045 : 0, ls: 0 });
  specs.push({ divider: true, gap: 0.035 });
  if (data.date) specs.push({ t: data.date, f: tpl.body, w: 600, s: 0.044, c: tpl.text, lh: 1.4, gap: 0.035, ls: 0 });
  if (data.time) specs.push({ t: data.time, f: tpl.body, w: 400, s: 0.042, c: tpl.text, lh: 1.4, gap: 0.008, ls: 0 });
  if (data.venue) specs.push({ t: data.venue, f: tpl.body, w: 700, s: 0.042, c: tpl.title, lh: 1.35, gap: 0.035, ls: 0 });
  if (data.address) specs.push({ t: data.address, f: tpl.body, w: 400, s: 0.033, c: tpl.text, lh: 1.45, gap: 0.01, ls: 0 });
  if (data.note) specs.push({ t: data.note, f: tpl.body, w: 400, s: 0.033, c: tpl.text, lh: 1.5, gap: 0.04, ls: 0, italic: true });
  if (data.rsvp) specs.push({ t: data.rsvp, f: tpl.body, w: 600, s: 0.033, c: tpl.text, lh: 1.4, gap: 0.04, ls: 0 });

  const measure = (k) => {
    let total = 0; const rows = [];
    for (const sp of specs) {
      if (sp.divider) { total += sp.gap * u * k + 0.03 * u * k; rows.push({ sp, h: 0.03 * u * k, y: total - 0.015 * u * k }); continue; }
      const size = sp.s * u * k;
      ctx.font = `${sp.italic ? 'italic ' : ''}${sp.w} ${size}px ${sp.f}`;
      ctx.letterSpacing = `${sp.ls * u * k}px`;
      const lines = wrapLines(ctx, sp.t, boxW);
      total += sp.gap * u * k;
      rows.push({ sp, lines, size, start: total });
      total += lines.length * size * sp.lh;
    }
    return { total, rows };
  };
  let k = 1, m = measure(k);
  while (m.total > availH && k > 0.4) { k -= 0.04; m = measure(k); }
  let y0 = margin + (availH - m.total) / 2;
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
  for (const r of m.rows) {
    if (r.sp.divider) { tpl.divider(ctx, W / 2, y0 + r.y, u * k, tpl.accent); continue; }
    ctx.font = `${r.sp.italic ? 'italic ' : ''}${r.sp.w} ${r.size}px ${r.sp.f}`;
    ctx.letterSpacing = `${r.sp.ls * u * k}px`;
    ctx.fillStyle = r.sp.c;
    r.lines.forEach((ln, i) => ctx.fillText(ln, W / 2, y0 + r.start + (i + 0.82) * r.size * r.sp.lh, boxW));
  }
  ctx.letterSpacing = '0px';
}

/* ---------- Önizleme ---------- */
const prev = $('preview');
let prevTimer = 0;
async function renderPreview() {
  await loadFont($('inv-font').value);
  const sz = SIZES[$('inv-size').value];
  const pw = 540, ph = Math.round((pw * sz.h) / sz.w);
  drawInvitation(prev, pw, ph, readData(true));
  prev.dataset.ready = '1';
}
function schedule() { clearTimeout(prevTimer); prevTimer = setTimeout(renderPreview, 120); }

/* ---------- Tür seçimi ---------- */
const touched = new Set();
function applyType() {
  const t = TYPES[$('inv-type').value];
  $('lbl-names').textContent = t.label;
  $('f-names').placeholder = t.ph;
  if (!touched.has('title')) $('f-title').value = t.title;
  schedule();
}
$('f-title').addEventListener('input', () => touched.add('title'));
$('inv-type').addEventListener('change', applyType);
['f-title', 'f-names', 'f-date', 'f-time', 'f-venue', 'f-address', 'f-note', 'f-rsvp'].forEach((id) => { $(id).addEventListener('input', () => { showError($('error'), null); schedule(); }); });
['inv-template', 'inv-font', 'inv-size'].forEach((id) => $(id).addEventListener('change', schedule));
document.querySelectorAll('input[name="tpl"]').forEach((r) => r.addEventListener('change', () => { $('inv-template').value = r.value; schedule(); }));
$('inv-template').addEventListener('change', () => { const r = document.querySelector(`input[name="tpl"][value="${$('inv-template').value}"]`); if (r) r.checked = true; });

/* ---------- Dışa aktarma ---------- */
function validate() {
  const d = readData(false);
  if (!d.names) return `"${TYPES[$('inv-type').value].label}" alanını doldurun; davetiyenin ana başlığıdır.`;
  if (!$('f-date').value) return 'Etkinlik tarihini seçin; davetiyede tarih olmadan misafirler gün bilgisini alamaz.';
  return null;
}
async function renderFull() {
  await loadFont($('inv-font').value);
  const sz = SIZES[$('inv-size').value];
  const c = document.createElement('canvas');
  drawInvitation(c, sz.w, sz.h, readData(false));
  return { c, sz };
}
const fname = (ext) => {
  const base = ($('f-names').value || 'davetiye').toLocaleLowerCase('tr').replace(/[\\/:*?"<>|&]+/g, ' ').trim().replace(/\s+/g, '-').slice(0, 30) || 'davetiye';
  return `davetiye-${base}-${SIZES[$('inv-size').value].label}.${ext}`;
};
async function exportWith(label, fn) {
  showError($('error'), null);
  const err = validate();
  if (err) { showError($('error'), err); return; }
  try {
    setProgress($('progress'), 10, label); await tick();
    await fn();
    setProgress($('progress'), 100, 'Hazır'); setTimeout(() => setProgress($('progress'), null), 800);
  } catch (e) {
    console.error(e); setProgress($('progress'), null);
    showError($('error'), 'Dosya oluşturulamadı. Boyutu küçültüp (örn. 10x15) tekrar deneyin ya da sayfayı yenileyin.');
  }
}
$('btn-png').addEventListener('click', () => exportWith('PNG hazırlanıyor…', async () => {
  const { c } = await renderFull();
  const blob = await new Promise((r) => c.toBlob(r, 'image/png'));
  downloadBlob(blob, fname('png'));
}));
$('btn-pdf').addEventListener('click', () => exportWith('PDF hazırlanıyor…', async () => {
  const { c, sz } = await renderFull();
  setProgress($('progress'), 50, 'PDF hazırlanıyor…'); await tick();
  const jpg = await new Promise((r) => c.toBlob(r, 'image/jpeg', 0.95));
  const PDFLib = await getPdfLib();
  const doc = await PDFLib.PDFDocument.create();
  doc.setTitle(`Davetiye: ${$('f-names').value.trim()}`); doc.setProducer('Bilişim Ajans Ücretsiz Araçlar'); doc.setCreator('araclar.bilisimajans.com');
  const img = await doc.embedJpg(new Uint8Array(await jpg.arrayBuffer()));
  const page = doc.addPage([sz.ptW, sz.ptH]);
  page.drawImage(img, { x: 0, y: 0, width: sz.ptW, height: sz.ptH });
  const bytes = await doc.save();
  downloadBlob(new Blob([bytes], { type: 'application/pdf' }), fname('pdf'));
}));

/* ---------- Açılış ---------- */
applyType();
