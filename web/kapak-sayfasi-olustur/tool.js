// Kapak Sayfası Oluşturucu — ödev, rapor ve tez kapağı: canlı önizleme, PDF (pdf-lib + DejaVu) ve DOCX (docx).
// Tek bir yerleşim fonksiyonu (buildOps) hem önizlemeyi hem PDF'i çizer. Hiçbir veri ağa gitmez, hiçbir şey saklanmaz.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, getPdfLib, loadScript, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const VENDOR = new URL('../vendor/', import.meta.url).href;
const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const PW = 595.28, PH = 841.89; // A4 dikey (pt)
const ACCENT = '#7b2331';
const SCALES = { kucuk: 0.9, orta: 1, buyuk: 1.12 };
const MAX_LOGO_BYTES = 10 * 1024 * 1024;

let fontCache = null;
let docxPromise = null;
let logo = null;          // { bytes: Uint8Array (PNG), w, h, url }
let measureCtx = null;
let renderQueued = false;

const upperTr = (s) => s.toLocaleUpperCase('tr-TR');

function collect() {
  const v = (id) => $(id).value.trim();
  const iso = $('f-date').value;
  const date = /^\d{4}-\d{2}-\d{2}$/.test(iso) ? iso.split('-').reverse().join('.') : '';
  return {
    school: v('f-school'), faculty: v('f-faculty'), course: v('f-course'), kind: $('f-kind').value,
    title: v('f-title'), student: v('f-student'), number: v('f-number'), teacher: v('f-teacher'),
    city: v('f-city'), date, layout: $('opt-layout').value, scale: SCALES[$('opt-size').value] || 1,
  };
}

/** Zorunlu alanları denetler; eksik varsa Türkçe hata fırlatır ve ilk eksik alana odaklanır. */
function validate(d) {
  const missing = [];
  if (!d.school) missing.push(['f-school', 'Okul / üniversite adı']);
  if (!d.title) missing.push(['f-title', 'Başlık']);
  if (!d.student) missing.push(['f-student', 'Öğrenci adı soyadı']);
  for (const id of ['f-school', 'f-title', 'f-student']) $(id).removeAttribute('aria-invalid');
  if (missing.length) {
    missing.forEach(([id]) => $(id).setAttribute('aria-invalid', 'true'));
    $(missing[0][0]).focus();
    throw new Error(`Zorunlu alanlar boş: ${missing.map((m) => m[1]).join(', ')}. Boş alanları doldurup tekrar deneyin.`);
  }
  if (d.title.length > 200) throw new Error('Başlık 200 karakteri geçemez. Başlığı kısaltın; ayrıntıyı alt başlık olarak ders alanına yazabilirsiniz.');
}

// ---------- Yazı tipi ve ölçüm ----------

async function loadFonts() {
  if (fontCache) return fontCache;
  const base = `${VENDOR}fonts/dejavu-sans@2.37/`;
  const get = (n) => fetch(`${base}${n}`).then((r) => { if (!r.ok) throw new Error('FONT'); return r.arrayBuffer(); });
  const [regular, bold] = await Promise.all([get('DejaVuSans.ttf'), get('DejaVuSans-Bold.ttf')]);
  fontCache = { regular, bold };
  return fontCache;
}

/** Önizleme için DejaVu'yu sayfaya tanıtır; ölçüm PDF ile aynı olsun diye. */
async function registerPreviewFont() {
  try {
    const fd = await loadFonts();
    const a = new FontFace('BA DejaVu', fd.regular);
    const b = new FontFace('BA DejaVu', fd.bold, { weight: 'bold' });
    await Promise.all([a.load(), b.load()]);
    document.fonts.add(a); document.fonts.add(b);
  } catch { /* sistem yazı tipiyle devam */ }
  queueRender();
}

function canvasMeasure(s, size, bold) {
  if (!measureCtx) measureCtx = document.createElement('canvas').getContext('2d');
  measureCtx.font = `${bold ? 'bold ' : ''}${size}px "BA DejaVu", "DejaVu Sans", sans-serif`;
  return measureCtx.measureText(s).width;
}

// ---------- Yerleşim ----------

/** Çizim komutları üretir; koordinatlar sol üst köşeye göre pt cinsindendir. */
function buildOps(d, measure, hasLogo) {
  const ops = [];
  const S = d.scale;
  const M = 60;
  const W = PW - 2 * M;
  const modern = d.layout === 'modern';
  const left = modern || d.layout === 'sade';
  const ax = left ? M : PW / 2;
  const align = left ? 'l' : 'c';
  const wrap = (text, size, bold, maxW) => {
    const lines = [];
    for (const para of text.split('\n')) {
      let cur = '';
      for (const w of para.split(/\s+/).filter(Boolean)) {
        const t = cur ? `${cur} ${w}` : w;
        if (!cur || measure(t, size, bold) <= maxW) cur = t; else { lines.push(cur); cur = w; }
      }
      if (cur) lines.push(cur);
    }
    return lines;
  };
  let y = 0;
  /** Metin bloğu: y imlecinden başlar, yazılan satırlarla ilerler. */
  const block = (text, size, bold, color, o = {}) => {
    const sz = size * S;
    const x = o.x ?? ax;
    const al = o.align ?? align;
    const maxW = o.w ?? W;
    const lh = sz * (o.lh ?? 1.3);
    const start = y;
    for (const l of wrap(text, sz, bold, maxW)) {
      ops.push({ t: 'text', s: l, x, y: y + sz * 0.92, size: sz, bold, color, align: al });
      y += lh;
    }
    return { top: start, bottom: y };
  };
  const rule = (yy, lw, color = '#222222', x1 = M, x2 = PW - M) => ops.push({ t: 'line', x1, y1: yy, x2, y2: yy, color, lw });
  const logoSize = 84;
  const placeLogo = (x, yy) => { if (hasLogo) ops.push({ t: 'image', x, y: yy, w: logo.w >= logo.h ? logoSize : logoSize * logo.w / logo.h, h: logo.w >= logo.h ? logoSize * logo.h / logo.w : logoSize }); };
  const logoW = hasLogo ? (logo.w >= logo.h ? logoSize : logoSize * logo.w / logo.h) : 0;
  const logoH = hasLogo ? (logo.w >= logo.h ? logoSize * logo.h / logo.w : logoSize) : 0;

  // Dekorasyon (arka plan)
  if (d.layout === 'kutulu') {
    ops.push({ t: 'rect', x: 30, y: 30, w: PW - 60, h: PH - 60, fill: null, stroke: '#111111', lw: 2.2 });
    ops.push({ t: 'rect', x: 38, y: 38, w: PW - 76, h: PH - 76, fill: null, stroke: '#111111', lw: 0.6 });
  }
  if (modern) {
    ops.push({ t: 'rect', x: 0, y: 0, w: PW, h: 190, fill: ACCENT, stroke: null, lw: 0 });
    ops.push({ t: 'rect', x: 0, y: PH - 14, w: PW, h: 14, fill: ACCENT, stroke: null, lw: 0 });
  }

  // 1) Üst bölüm: logo, okul, fakülte
  let textX = ax;
  if (modern) {
    y = 48;
    if (hasLogo) {
      ops.push({ t: 'rect', x: M, y: 48, w: logoW + 12, h: logoH + 12, fill: '#ffffff', stroke: null, lw: 0 });
      placeLogo(M + 6, 54);
      textX = M + logoW + 30;
    }
    const sch = block(upperTr(d.school), 17, true, '#ffffff', { x: textX, w: PW - M - textX });
    if (d.faculty) block(d.faculty, 12.5, false, '#ffffff', { x: textX, w: PW - M - textX });
    y = Math.max(y, 190);
    void sch;
  } else {
    y = d.layout === 'kutulu' ? 70 : 60;
    if (hasLogo) { placeLogo(left ? M : (PW - logoW) / 2, y); y += logoH + 16; }
    block(upperTr(d.school), 17, true, '#111111');
    if (d.faculty) block(d.faculty, 13, false, '#222222');
    if (d.layout === 'cizgili') { y += 8; rule(y, 2); rule(y + 4, 0.6); y += 8; }
    if (d.layout === 'sade') { y += 8; rule(y, 0.8, '#000000'); }
  }
  const topEnd = y;

  // 2) Orta bölüm: ders, tür, başlık
  y = Math.max(topEnd + 50, PH * 0.33);
  if (modern) y = Math.max(topEnd + 60, 260);
  const midTop = y;
  if (d.layout === 'cizgili') { rule(y, 1.2); y += 22; }
  if (d.layout === 'kutulu') y += 20;
  if (d.course) { block(d.course, 14, false, '#333333'); y += 8; }
  block(upperTr(d.kind), 12.5, true, modern ? ACCENT : '#111111');
  if (modern) { y += 6; ops.push({ t: 'rect', x: M, y, w: 64, h: 4, fill: ACCENT, stroke: null, lw: 0 }); y += 18; } else y += 10;
  block(d.title, 23, true, '#111111', { lh: 1.35 });
  y += 14;
  if (d.layout === 'cizgili') { rule(y, 1.2); y += 8; }
  if (d.layout === 'kutulu') { y += 20; ops.push({ t: 'rect', x: M - 14, y: midTop, w: W + 28, h: y - midTop, fill: null, stroke: '#111111', lw: 1.1 }); }
  const midEnd = y;

  // 3) Alt bölüm: hazırlayan, öğretim üyesi
  y = Math.max(midEnd + 50, PH * 0.62);
  const person = (label, name, extra, x, w, al) => {
    block(label, 9.5, false, '#666666', { x, w, align: al });
    block(name, 13.5, true, '#111111', { x, w, align: al });
    if (extra) block(extra, 11, false, '#333333', { x, w, align: al });
  };
  if (modern) {
    const col = (W - 20) / 2;
    const y0 = y;
    person('HAZIRLAYAN', d.student, d.number ? `Öğrenci No: ${d.number}` : '', M, col, 'l');
    const yA = y;
    y = y0;
    if (d.teacher) person('ÖĞRETİM ÜYESİ', d.teacher, '', M + col + 20, col, 'l');
    y = Math.max(y, yA);
  } else {
    person('HAZIRLAYAN', d.student, d.number ? `Öğrenci No: ${d.number}` : '', ax, W, align);
    if (d.teacher) { y += 14; person('ÖĞRETİM ÜYESİ', d.teacher, '', ax, W, align); }
  }

  // 4) Şehir ve tarih
  const where = [d.city, d.date].filter(Boolean).join(', ');
  if (where) {
    y = Math.max(y + 40, PH - 100);
    if (d.layout === 'cizgili') { rule(y - 12, 0.6); }
    block(where, 12, false, '#222222');
  }
  return ops;
}

// ---------- Önizleme ----------

function renderPreview() {
  renderQueued = false;
  const host = $('cover');
  const d = collect();
  const ops = buildOps(d, canvasMeasure, !!logo);
  host.textContent = '';
  const px = (n) => `calc(${n.toFixed(2)} * var(--u))`;
  for (const o of ops) {
    const el = document.createElement('div');
    el.className = 'cv-el';
    if (o.t === 'rect') {
      el.style.cssText = `left:${px(o.x)};top:${px(o.y)};width:${px(o.w)};height:${px(o.h)};`;
      if (o.fill) el.style.background = o.fill;
      if (o.stroke) el.style.border = `${px(o.lw)} solid ${o.stroke}`;
      el.style.boxSizing = 'border-box';
    } else if (o.t === 'line') {
      el.style.cssText = `left:${px(o.x1)};top:${px(o.y1 - o.lw / 2)};width:${px(o.x2 - o.x1)};height:${px(o.lw)};background:${o.color};`;
    } else if (o.t === 'image') {
      const img = document.createElement('img');
      img.src = logo.url; img.alt = 'Yüklediğiniz logo';
      el.style.cssText = `left:${px(o.x)};top:${px(o.y)};width:${px(o.w)};height:${px(o.h)};`;
      img.style.cssText = 'width:100%;height:100%;display:block;';
      el.appendChild(img);
    } else {
      el.textContent = o.s;
      el.style.cssText = `left:${px(o.x)};top:${px(o.y - o.size * 0.846)};font-size:${px(o.size)};color:${o.color};font-weight:${o.bold ? 700 : 400};white-space:nowrap;line-height:1;${o.align === 'c' ? 'transform:translateX(-50%);' : ''}`;
    }
    host.appendChild(el);
  }
}

function queueRender() {
  if (renderQueued) return;
  renderQueued = true;
  requestAnimationFrame(renderPreview);
}

// ---------- Logo ----------

async function setLogo(file) {
  showError($('error'), null);
  try {
    if (file.size > MAX_LOGO_BYTES) throw new Error('BIG');
    const bmp = await createImageBitmap(file);
    const k = Math.min(1, 600 / Math.max(bmp.width, bmp.height));
    const w = Math.max(1, Math.round(bmp.width * k)), h = Math.max(1, Math.round(bmp.height * k));
    const cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    cv.getContext('2d').drawImage(bmp, 0, 0, w, h);
    const blob = await new Promise((res, rej) => cv.toBlob((b) => (b ? res(b) : rej(new Error('PNG'))), 'image/png'));
    if (logo) URL.revokeObjectURL(logo.url);
    logo = { bytes: new Uint8Array(await blob.arrayBuffer()), w, h, url: URL.createObjectURL(blob) };
    $('logo-name').textContent = file.name;
    $('logo-clear').hidden = false;
    queueRender();
  } catch (e) {
    showError($('error'), e.message === 'BIG'
      ? 'Logo dosyası 10 MB\'tan büyük. Daha küçük bir PNG ya da JPG seçin.'
      : 'Logo dosyası okunamadı. PNG veya JPG biçiminde, bozuk olmayan bir görsel seçin.');
  }
}

// ---------- PDF ----------

async function buildPdf(d) {
  const PDFLib = await getPdfLib();
  await loadScript(`${VENDOR}pdf-lib-fontkit@1.1.1/fontkit.umd.min.js`);
  const fd = await loadFonts();
  const doc = await PDFLib.PDFDocument.create();
  doc.registerFontkit(window.fontkit);
  doc.setProducer('Bilişim Ajans Ücretsiz Araçlar');
  doc.setCreator('araclar.bilisimajans.com');
  doc.setTitle(d.title);
  const reg = await doc.embedFont(fd.regular, { subset: true });
  const bold = await doc.embedFont(fd.bold, { subset: true });
  const page = doc.addPage([PW, PH]);
  const { rgb } = PDFLib;
  const col = (h) => rgb(...[1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255));
  const img = logo ? await doc.embedPng(logo.bytes) : null;
  const ops = buildOps(d, (s, size, b) => (b ? bold : reg).widthOfTextAtSize(s, size), !!logo);
  for (const o of ops) {
    if (o.t === 'rect') {
      const opt = { x: o.x, y: PH - o.y - o.h, width: o.w, height: o.h };
      if (o.fill) opt.color = col(o.fill);
      if (o.stroke) { opt.borderColor = col(o.stroke); opt.borderWidth = o.lw; }
      page.drawRectangle(opt);
    } else if (o.t === 'line') {
      page.drawLine({ start: { x: o.x1, y: PH - o.y1 }, end: { x: o.x2, y: PH - o.y2 }, thickness: o.lw, color: col(o.color) });
    } else if (o.t === 'image') {
      if (img) page.drawImage(img, { x: o.x, y: PH - o.y - o.h, width: o.w, height: o.h });
    } else {
      const f = o.bold ? bold : reg;
      const w = f.widthOfTextAtSize(o.s, o.size);
      page.drawText(o.s, { x: o.align === 'c' ? o.x - w / 2 : o.x, y: PH - o.y, size: o.size, font: f, color: col(o.color) });
    }
  }
  return new Blob([await doc.save()], { type: 'application/pdf' });
}

// ---------- DOCX ----------

function getDocx() {
  if (!docxPromise) docxPromise = import(new URL('../vendor/docx@9.15.1/docx.mjs', import.meta.url).href);
  return docxPromise;
}

async function buildDocx(d) {
  const { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, ShadingType, ImageRun, PageBorderDisplay, PageBorderOffsetFrom } = await getDocx();
  const FONT = 'Times New Roman';
  const S = d.scale;
  const modern = d.layout === 'modern';
  const left = modern || d.layout === 'sade';
  const al = left ? AlignmentType.LEFT : AlignmentType.CENTER;
  const children = [];
  const line = (color, sz) => ({ style: BorderStyle.SINGLE, size: sz, color, space: 6 });
  const para = (text, o = {}) => new Paragraph({
    alignment: o.align || al,
    spacing: { before: o.before ?? 0, after: o.after ?? 60 },
    border: o.border,
    shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill, color: 'auto' } : undefined,
    children: text === '' ? [] : [new TextRun({ text, font: FONT, size: Math.round((o.size || 12) * S * 2), bold: !!o.bold, color: o.color })],
  });
  const head = modern ? { fill: '7B2331', color: 'FFFFFF' } : { color: '111111' };
  if (logo) {
    const k = logo.w >= logo.h ? 84 / logo.w : 84 / logo.h;
    children.push(new Paragraph({
      alignment: al, spacing: { after: 160 },
      children: [new ImageRun({ type: 'png', data: logo.bytes, transformation: { width: Math.round(logo.w * k), height: Math.round(logo.h * k) }, altText: { title: 'Logo', description: 'Kurum logosu', name: 'logo' } })],
    }));
  }
  children.push(para(upperTr(d.school), { size: 17, bold: true, color: head.color, fill: head.fill, before: modern ? 120 : 0, after: d.faculty ? 0 : 120 }));
  if (d.faculty) children.push(para(d.faculty, { size: 13, color: head.color, fill: head.fill, after: 120 }));
  if (d.layout === 'cizgili') children.push(para('', { border: { bottom: line('222222', 12) }, after: 0 }));
  if (d.layout === 'sade') children.push(para('', { border: { bottom: line('000000', 6) }, after: 0 }));
  const midBorder = d.layout === 'cizgili' ? { top: line('222222', 10), bottom: line('222222', 10) } : d.layout === 'kutulu' ? { top: line('111111', 8), bottom: line('111111', 8), left: line('111111', 8), right: line('111111', 8) } : undefined;
  let first = true;
  const mid = (text, o) => { children.push(para(text, { ...o, before: first ? 2200 : o.before, border: midBorder })); first = false; };
  if (d.course) mid(d.course, { size: 14, color: '333333', after: 120 });
  mid(upperTr(d.kind), { size: 12.5, bold: true, color: modern ? '7B2331' : '111111', after: 120 });
  mid(d.title, { size: 23, bold: true, color: '111111', after: 160 });
  const person = (label, name, extra, before) => {
    children.push(para(label, { size: 9.5, color: '666666', before, after: 0 }));
    children.push(para(name, { size: 13.5, bold: true, color: '111111', after: 0 }));
    if (extra) children.push(para(extra, { size: 11, color: '333333', after: 0 }));
  };
  person('HAZIRLAYAN', d.student, d.number ? `Öğrenci No: ${d.number}` : '', 2000);
  if (d.teacher) person('ÖĞRETİM ÜYESİ', d.teacher, '', 300);
  const where = [d.city, d.date].filter(Boolean).join(', ');
  if (where) children.push(para(where, { size: 12, color: '222222', before: 1500, after: 0 }));
  const borderSide = { style: BorderStyle.SINGLE, size: 18, color: '111111', space: 24 };
  const doc = new Document({
    creator: 'Bilişim Ajans Ücretsiz Araçlar',
    title: d.title,
    description: 'araclar.bilisimajans.com ile hazırlandı',
    styles: { default: { document: { run: { font: FONT, size: 24 } } } },
    sections: [{
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1418, bottom: 1134, left: 1418, right: 1418 },
          borders: d.layout === 'kutulu' ? {
            pageBorders: { display: PageBorderDisplay.ALL_PAGES, offsetFrom: PageBorderOffsetFrom.PAGE },
            pageBorderTop: borderSide, pageBorderBottom: borderSide, pageBorderLeft: borderSide, pageBorderRight: borderSide,
          } : undefined,
        },
      },
      children,
    }],
  });
  const blob = await Packer.toBlob(doc);
  return blob.type === DOCX_MIME ? blob : new Blob([blob], { type: DOCX_MIME });
}

// ---------- Eylemler ----------

function fileName(d, ext) {
  const raw = d.title.toLocaleLowerCase('tr-TR').replace(/[^a-z0-9çğıöşüâîû]+/gi, '-').replace(/^-+|-+$/g, '').slice(0, 40);
  return `kapak-${raw || 'sayfasi'}.${ext}`;
}

async function run(btnId, label, ext, maker) {
  const btn = $(btnId);
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const d = collect();
  try { validate(d); } catch (e) { showError($('error'), e.message); return; }
  btn.disabled = true;
  setProgress($('progress'), 30, `${label} hazırlanıyor…`);
  await tick();
  try {
    const blob = await maker(d);
    const name = fileName(d, ext);
    downloadBlob(blob, name);
    $('result-info').textContent = `${formatBytes(blob.size)} · ${name}`;
    $('result').classList.add('is-active');
  } catch (err) {
    console.error(err);
    showError($('error'), String(err && err.message) === 'FONT'
      ? 'Yazı tipi dosyası yüklenemedi. Sayfayı yenileyip tekrar deneyin.'
      : `${label} oluşturulurken bir hata oluştu. Sayfayı yenileyip tekrar deneyin; sorun sürerse logoyu kaldırıp deneyin.`);
  } finally { setProgress($('progress'), null); btn.disabled = false; }
}

$('make-pdf').addEventListener('click', () => run('make-pdf', 'PDF', 'pdf', buildPdf));
$('make-docx').addEventListener('click', () => run('make-docx', 'Word belgesi', 'docx', buildDocx));
$('logo-clear').addEventListener('click', () => {
  if (logo) URL.revokeObjectURL(logo.url);
  logo = null; $('logo-name').textContent = 'Logo seçilmedi'; $('logo-clear').hidden = true; queueRender();
});
createDropzone({ el: $('logo-drop'), accept: 'image/png,image/jpeg,image/webp', multiple: false, onFiles: ([f]) => setLogo(f) });
document.querySelectorAll('#form input, #form select').forEach((el) => el.addEventListener('input', queueRender));
$('form').addEventListener('submit', (e) => e.preventDefault());

renderPreview();
registerPreviewFont();
