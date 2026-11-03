// Word'den PDF'e — .docx dosyasını mammoth ile HTML'e çevirir, A4 baskı şablonunda önizler.
// Yol 1: iframe.print() → "PDF olarak kaydet". Yol 2 (beta): pdf-lib ile yalnızca metin içeren PDF.
// Hiçbir veri ağa gitmez; tüm kütüphaneler ve yazı tipi aynı origin'deki vendor/ klasöründen yüklenir.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, getPdfLib, loadScript, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const VENDOR = new URL('../vendor/', import.meta.url).href;
const BIG_FILE = 50 * 1024 * 1024;

let current = null; // { file, html, messages }
let resultBlob = null;
let resultName = 'belge.pdf';
let fontCache = null; // { regular: ArrayBuffer, bold: ArrayBuffer }

createDropzone({ el: $('drop'), accept: '.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document', multiple: false, onFiles: (files) => openFile(files[0]) });

async function getMammoth() {
  await loadScript(`${VENDOR}mammoth@1.13.0/mammoth.browser.min.js`);
  return window.mammoth;
}

async function getFontkit() {
  await loadScript(`${VENDOR}pdf-lib-fontkit@1.1.1/fontkit.umd.min.js`);
  return window.fontkit;
}

/** Dosyanın ilk baytlarına bakarak anlaşılır bir hata mesajı üretir. */
function sniffError(bytes, name) {
  const b = bytes.subarray(0, 4);
  if (b[0] === 0xd0 && b[1] === 0xcf && b[2] === 0x11 && b[3] === 0xe0) {
    return 'Bu dosya eski .doc biçiminde ya da parolayla şifrelenmiş. Word\'de "Farklı Kaydet → Word Belgesi (.docx)" yapın; parolalıysa önce parolayı kaldırın.';
  }
  if (b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46) {
    return 'Bu zaten bir PDF dosyası. Word belgesi (.docx) seçin; PDF\'i düzenlemek için diğer PDF araçlarına bakın.';
  }
  if (!(b[0] === 0x50 && b[1] === 0x4b)) {
    return `"${name}" bir Word (.docx) belgesi değil. Yalnızca .docx dosyaları desteklenir; .doc, .odt veya .rtf dosyalarını önce .docx olarak kaydedin.`;
  }
  return null;
}

async function openFile(file) {
  reset();
  if (!/\.docx$/i.test(file.name) && file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    showError($('error'), `"${file.name}" bir .docx dosyası değil. Yalnızca Word 2007 ve sonrası (.docx) belgeleri desteklenir.`);
    return;
  }
  if (file.size > BIG_FILE) {
    showError($('error'), `Dosya ${formatBytes(file.size)}; 50 MB üzerindeki belgeler tarayıcıyı yavaşlatabilir. Word'de görselleri sıkıştırıp tekrar deneyin ya da işlemin bitmesini bekleyin.`);
  }
  setProgress($('progress'), 10, 'Belge okunuyor…');
  await tick();
  try {
    const buf = await file.arrayBuffer();
    const sniff = sniffError(new Uint8Array(buf), file.name);
    if (sniff) throw new Error(`SNIFF:${sniff}`);
    const mammoth = await getMammoth();
    setProgress($('progress'), 40, 'Word içeriği HTML\'e çevriliyor…');
    await tick();
    const res = await mammoth.convertToHtml({ arrayBuffer: buf }, {
      styleMap: ['p[style-name=\'Title\'] => h1.title:fresh', 'p[style-name=\'Subtitle\'] => p.subtitle:fresh'],
      ignoreEmptyParagraphs: false,
    });
    if (!res.value || !res.value.trim()) throw new Error('EMPTY');
    current = { file, html: sanitize(res.value), messages: res.messages || [] };
    $('file-meta').textContent = `${file.name} · ${formatBytes(file.size)}`;
    renderWarnings(current.messages);
    renderPreview();
    $('preview').classList.add('is-active');
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), docxError(err));
  }
}

function docxError(err) {
  const m = String(err && err.message || err || '');
  if (m.startsWith('SNIFF:')) return m.slice(6);
  if (m === 'EMPTY') return 'Belgede okunabilir metin bulunamadı. Belge yalnızca görsel içeriyorsa önce görselleri kaydedip "Resimden PDF\'e" aracını kullanın.';
  if (/end of central directory|zip|Corrupted|not a valid/i.test(m)) return 'Dosya bozuk görünüyor ya da tamamı indirilmemiş. Word\'de açabildiğinizi kontrol edip yeniden kaydedin, sonra tekrar deneyin.';
  if (/body element|document.xml|Could not find/i.test(m)) return 'Bu .docx dosyasının içinde Word belgesi bulunamadı. Dosya başka bir uygulamadan yanlış uzantıyla kaydedilmiş olabilir; Word ya da LibreOffice\'te açıp yeniden .docx olarak kaydedin.';
  if (/memory|allocation/i.test(m)) return 'Belge tarayıcı belleği için fazla büyük. Görselleri küçültün ya da belgeyi bölümlere ayırıp deneyin.';
  return 'Belge okunurken beklenmeyen bir hata oluştu. Dosyayı Word\'de açıp yeniden .docx olarak kaydedin ve tekrar deneyin.';
}

function renderWarnings(messages) {
  const ul = $('warnings');
  ul.innerHTML = '';
  const seen = new Set();
  for (const msg of messages) {
    const text = translateMessage(msg.message);
    if (!text || seen.has(text)) continue;
    seen.add(text);
    const li = document.createElement('li');
    li.textContent = text;
    ul.appendChild(li);
  }
}

/** mammoth uyarılarını kısa Türkçe açıklamalara çevirir; bilinmeyenleri gizler. */
function translateMessage(m) {
  if (/Unrecognised paragraph style/i.test(m)) return 'Belgedeki bazı özel paragraf stilleri düz paragraf olarak aktarıldı.';
  if (/Unrecognised run style/i.test(m)) return 'Belgedeki bazı özel karakter stilleri düz metin olarak aktarıldı.';
  if (/image|picture/i.test(m)) return 'Bazı görseller okunamadı ve atlandı.';
  if (/table/i.test(m)) return 'Bazı tablo özellikleri (birleşik hücre, renk) sadeleştirildi.';
  return null;
}

/** mammoth çıktısında script/olay/javascript: olmaz ama belge güvenilmez kaynak sayılır: temizle. */
function sanitize(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc.querySelectorAll('script, iframe, object, embed, link, meta, style, form, input, button').forEach((el) => el.remove());
  for (const el of doc.body.querySelectorAll('*')) {
    for (const attr of Array.from(el.attributes)) {
      const n = attr.name.toLowerCase();
      if (n.startsWith('on')) el.removeAttribute(attr.name);
      else if ((n === 'href' || n === 'src') && /^\s*(javascript|vbscript):/i.test(attr.value)) el.removeAttribute(attr.name);
      else if (n === 'src' && !/^(data:|blob:)/i.test(attr.value)) el.removeAttribute(attr.name); // dış görsel adresi = ağ isteği; izin yok
    }
  }
  return doc.body.innerHTML;
}

/** Önizleme/yazdırma için A4 baskı şablonu. Yazı tipi listesi Türkçe karakterli sistem fontlarını önceliklendirir. */
function buildDocument(html, { margin, fontSize }) {
  return `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: blob:; style-src 'unsafe-inline'"><title>Belge</title><style>
    @page { size: A4; margin: ${margin}mm; }
    html { background: #fff; }
    body { margin: 0; padding: ${margin}mm; font-family: "Segoe UI", Calibri, Arial, "Helvetica Neue", "DejaVu Sans", "Liberation Sans", sans-serif; font-size: ${fontSize}pt; line-height: 1.45; color: #111; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    @media print { body { padding: 0; } }
    h1, h2, h3, h4, h5, h6 { line-height: 1.25; margin: 1.1em 0 .45em; page-break-after: avoid; }
    h1 { font-size: 1.9em; } h2 { font-size: 1.5em; } h3 { font-size: 1.25em; } h4, h5, h6 { font-size: 1.05em; }
    h1.title { text-align: center; margin-top: 0; } p.subtitle { text-align: center; color: #444; }
    p { margin: 0 0 .7em; orphans: 2; widows: 2; }
    ul, ol { margin: 0 0 .7em; padding-left: 1.6em; }
    img { max-width: 100%; height: auto; page-break-inside: avoid; }
    table { border-collapse: collapse; width: 100%; margin: 0 0 1em; page-break-inside: auto; }
    td, th { border: 1px solid #999; padding: 4px 6px; vertical-align: top; }
    tr { page-break-inside: avoid; }
    a { color: inherit; }
    pre, code { font-family: Consolas, "DejaVu Sans Mono", monospace; font-size: .95em; white-space: pre-wrap; }
    .page-break { page-break-before: always; }
  </style></head><body>${html}</body></html>`;
}

function getOptions() {
  return { margin: Number($('opt-margin').value), fontSize: Number($('opt-font').value) };
}

function renderPreview() {
  if (!current) return;
  const frame = $('frame');
  frame.srcdoc = buildDocument(current.html, getOptions());
  frame.onload = () => {
    try {
      const doc = frame.contentDocument;
      const h = doc && doc.documentElement ? doc.documentElement.scrollHeight : 0;
      frame.style.height = `${Math.max(420, Math.min(h + 20, 2400))}px`;
    } catch { /* yükseklik ölçülemezse varsayılan kalır */ }
  };
}

['opt-margin', 'opt-font'].forEach((id) => $(id).addEventListener('change', renderPreview));

$('print').addEventListener('click', () => {
  if (!current) return;
  showError($('error'), null);
  const win = $('frame').contentWindow;
  try {
    win.focus();
    win.print();
  } catch (err) {
    console.error(err);
    showError($('error'), 'Yazdırma penceresi açılamadı. Tarayıcınızın açılır pencere engelini kontrol edin ya da "Doğrudan PDF üret" seçeneğini deneyin.');
  }
});

$('clear').addEventListener('click', () => { reset(); $('drop').focus(); });

function reset() {
  current = null; resultBlob = null;
  $('preview').classList.remove('is-active');
  $('result').classList.remove('is-active');
  $('frame').srcdoc = '';
  $('warnings').innerHTML = '';
  setProgress($('progress'), null);
  showError($('error'), null);
}

/* ---------- Doğrudan PDF (beta): HTML DOM → pdf-lib metin düzeni ---------- */

async function loadFonts() {
  if (fontCache) return fontCache;
  const base = `${VENDOR}fonts/dejavu-sans@2.37/`;
  const [regular, bold] = await Promise.all([
    fetch(`${base}DejaVuSans.ttf`).then((r) => { if (!r.ok) throw new Error('FONT'); return r.arrayBuffer(); }),
    fetch(`${base}DejaVuSans-Bold.ttf`).then((r) => { if (!r.ok) throw new Error('FONT'); return r.arrayBuffer(); }),
  ]);
  fontCache = { regular, bold };
  return fontCache;
}

const BLOCK_TAGS = new Set(['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'UL', 'OL', 'LI', 'TABLE', 'DIV', 'BLOCKQUOTE', 'PRE', 'HR', 'BR', 'IMG', 'FIGURE', 'SECTION', 'ARTICLE']);

/**
 * mammoth HTML'ini blok listesine indirger:
 * { type: 'heading'|'para'|'list'|'table'|'break', level, runs: [{text, bold}], indent, prefix, rows }
 */
function extractBlocks(html, stats) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const blocks = [];

  const runsOf = (el, bold = false, out = []) => {
    for (const node of el.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        const t = node.nodeValue.replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ');
        if (t) out.push({ text: t, bold });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const tag = node.tagName;
        if (tag === 'IMG') { stats.images++; continue; }
        if (tag === 'BR') { out.push({ text: '\n', bold }); continue; }
        if (tag === 'SUP' || tag === 'SUB') { runsOf(node, bold, out); continue; }
        const b = bold || tag === 'STRONG' || tag === 'B' || /^H[1-6]$/.test(tag);
        runsOf(node, b, out);
      }
    }
    return out;
  };

  const walk = (el, ctx) => {
    for (const node of el.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.nodeValue.trim()) blocks.push({ type: 'para', runs: [{ text: node.nodeValue.replace(/\s+/g, ' ').trim(), bold: false }], indent: ctx.indent });
        continue;
      }
      if (node.nodeType !== Node.ELEMENT_NODE) continue;
      const tag = node.tagName;
      if (/^H[1-6]$/.test(tag)) {
        blocks.push({ type: 'heading', level: Number(tag[1]), runs: runsOf(node, true), indent: ctx.indent, center: node.classList.contains('title') });
      } else if (tag === 'P' || tag === 'BLOCKQUOTE' || tag === 'PRE') {
        blocks.push({ type: 'para', runs: runsOf(node), indent: ctx.indent + (tag === 'BLOCKQUOTE' ? 18 : 0), center: node.classList.contains('subtitle') });
      } else if (tag === 'UL' || tag === 'OL') {
        let n = Number(node.getAttribute('start') || 1);
        for (const li of node.children) {
          if (li.tagName !== 'LI') continue;
          const prefix = tag === 'OL' ? `${n++}.` : '•';
          const inline = []; const nested = [];
          for (const c of li.childNodes) {
            if (c.nodeType === Node.ELEMENT_NODE && (c.tagName === 'UL' || c.tagName === 'OL' || c.tagName === 'TABLE')) nested.push(c);
            else if (c.nodeType === Node.ELEMENT_NODE && c.tagName === 'P') inline.push(...runsOf(c), { text: ' ', bold: false });
            else if (c.nodeType === Node.ELEMENT_NODE && c.tagName === 'IMG') stats.images++;
            else if (c.nodeType === Node.TEXT_NODE) { const t = c.nodeValue.replace(/\s+/g, ' '); if (t) inline.push({ text: t, bold: false }); }
            else if (c.nodeType === Node.ELEMENT_NODE) inline.push(...runsOf(c));
          }
          blocks.push({ type: 'list', runs: inline, indent: ctx.indent, prefix });
          const wrapper = document.createElement('div');
          nested.forEach((x) => wrapper.appendChild(x.cloneNode(true)));
          walk(wrapper, { indent: ctx.indent + 18 });
        }
      } else if (tag === 'TABLE') {
        const rows = [];
        for (const tr of node.querySelectorAll('tr')) {
          const cells = [];
          for (const td of tr.children) {
            if (td.tagName !== 'TD' && td.tagName !== 'TH') continue;
            const runs = [];
            for (const c of td.childNodes) {
              if (c.nodeType === Node.ELEMENT_NODE && BLOCK_TAGS.has(c.tagName)) { runs.push(...runsOf(c, td.tagName === 'TH'), { text: '\n', bold: false }); }
              else if (c.nodeType === Node.TEXT_NODE) { const t = c.nodeValue.replace(/\s+/g, ' '); if (t) runs.push({ text: t, bold: td.tagName === 'TH' }); }
              else if (c.nodeType === Node.ELEMENT_NODE) runs.push(...runsOf(c, td.tagName === 'TH'));
            }
            stats.images += td.querySelectorAll('img').length;
            cells.push(runs);
          }
          if (cells.length) rows.push(cells);
        }
        if (rows.length) blocks.push({ type: 'table', rows, indent: ctx.indent });
      } else if (tag === 'IMG') {
        stats.images++;
      } else if (tag === 'HR') {
        blocks.push({ type: 'rule', indent: ctx.indent });
      } else if (tag === 'BR') {
        blocks.push({ type: 'para', runs: [], indent: ctx.indent });
      } else {
        walk(node, ctx); // div, section, span vb. — içine in
      }
    }
  };
  walk(doc.body, { indent: 0 });
  return blocks;
}

/** Run listesini verilen genişliğe göre satırlara böler. Her satır: [{text,bold,width}] */
function wrapRuns(runs, fonts, size, maxWidth) {
  const lines = [];
  let line = []; let lineW = 0;
  const push = () => { lines.push(line); line = []; lineW = 0; };
  const widthOf = (t, bold) => (bold ? fonts.bold : fonts.regular).widthOfTextAtSize(t, size);
  for (const run of runs) {
    const parts = run.text.split('\n');
    parts.forEach((part, pi) => {
      if (pi > 0) push();
      const words = part.split(' ');
      words.forEach((w, wi) => {
        let token = wi < words.length - 1 ? `${w} ` : w;
        if (!token) return;
        let tw = widthOf(token, run.bold);
        if (lineW + tw > maxWidth && line.length) { push(); if (token === ' ') return; }
        // Tek kelime satıra sığmıyorsa karakter bazında kır
        while (tw > maxWidth && token.length > 1) {
          let cut = token.length - 1;
          while (cut > 1 && widthOf(token.slice(0, cut), run.bold) > maxWidth) cut--;
          line.push({ text: token.slice(0, cut), bold: run.bold, width: widthOf(token.slice(0, cut), run.bold) });
          push();
          token = token.slice(cut); tw = widthOf(token, run.bold);
        }
        line.push({ text: token, bold: run.bold, width: tw });
        lineW += tw;
      });
    });
  }
  if (line.length || !lines.length) lines.push(line);
  // Satır sonundaki boşlukları genişlikten düş (hizalama için)
  return lines.map((l) => { if (l.length) { const last = l[l.length - 1]; if (/ $/.test(last.text)) { last.text = last.text.replace(/ +$/, ''); last.width = widthOf(last.text, last.bold); } } return l; });
}

async function buildDirectPdf() {
  const { margin, fontSize } = getOptions();
  const stats = { images: 0 };
  const blocks = extractBlocks(current.html, stats);
  const PDFLib = await getPdfLib();
  const fontkit = await getFontkit();
  const fontData = await loadFonts();
  const doc = await PDFLib.PDFDocument.create();
  doc.registerFontkit(fontkit);
  doc.setProducer('Bilişim Ajans Ücretsiz Araçlar');
  doc.setCreator('araclar.bilisimajans.com');
  doc.setTitle(baseName(current.file.name));
  const fonts = {
    regular: await doc.embedFont(fontData.regular, { subset: true }),
    bold: await doc.embedFont(fontData.bold, { subset: true }),
  };
  const PW = 595.28, PH = 841.89, M = margin * 72 / 25.4;
  const contentW = PW - 2 * M;
  const black = PDFLib.rgb(0.07, 0.07, 0.07), grey = PDFLib.rgb(0.55, 0.55, 0.55);
  let page = null; let y = 0; let pageNo = 0;
  const newPage = () => { page = doc.addPage([PW, PH]); y = PH - M; pageNo++; };
  const ensure = (h) => { if (!page || y - h < M) newPage(); };
  newPage();

  const drawLines = (lines, { size, x, width, center = false, lineH }) => {
    for (const line of lines) {
      ensure(lineH);
      const lw = line.reduce((s, r) => s + r.width, 0);
      let cx = center ? x + (width - lw) / 2 : x;
      for (const r of line) {
        page.drawText(r.text, { x: cx, y: y - size, size, font: r.bold ? fonts.bold : fonts.regular, color: black });
        cx += r.width;
      }
      y -= lineH;
    }
  };

  for (let i = 0; i < blocks.length; i++) {
    if (i % 40 === 0) { setProgress($('progress'), 30 + (i / blocks.length) * 60, `Sayfa ${pageNo} yazılıyor…`); await tick(); }
    const b = blocks[i];
    const x = M + (b.indent || 0);
    const w = contentW - (b.indent || 0);
    if (b.type === 'heading') {
      const size = [fontSize * 1.9, fontSize * 1.5, fontSize * 1.25, fontSize * 1.1, fontSize * 1.05, fontSize][b.level - 1];
      const lineH = size * 1.25;
      const lines = wrapRuns(b.runs, fonts, size, w);
      ensure(lineH * Math.min(lines.length, 2) + size * 0.6);
      if (y < PH - M - 1) y -= size * 0.6;
      drawLines(lines, { size, x, width: w, center: b.center, lineH });
      y -= size * 0.35;
    } else if (b.type === 'para') {
      const lineH = fontSize * 1.45;
      if (!b.runs.length) { y -= lineH * 0.7; continue; }
      drawLines(wrapRuns(b.runs, fonts, fontSize, w), { size: fontSize, x, width: w, center: b.center, lineH });
      y -= fontSize * 0.7;
    } else if (b.type === 'list') {
      const lineH = fontSize * 1.45;
      const pw = fonts.regular.widthOfTextAtSize(b.prefix, fontSize);
      const gap = Math.max(14, pw + 6);
      const lines = wrapRuns(b.runs, fonts, fontSize, w - gap);
      ensure(lineH);
      page.drawText(b.prefix, { x, y: y - fontSize, size: fontSize, font: fonts.regular, color: black });
      drawLines(lines, { size: fontSize, x: x + gap, width: w - gap, lineH });
      y -= fontSize * 0.3;
    } else if (b.type === 'table') {
      const cols = Math.max(...b.rows.map((r) => r.length));
      const cw = w / cols;
      const size = Math.max(8, fontSize - 1);
      const lineH = size * 1.35;
      const pad = 4;
      for (const row of b.rows) {
        const cellLines = row.map((runs) => wrapRuns(runs, fonts, size, cw - pad * 2));
        const rowH = Math.max(...cellLines.map((l) => l.length)) * lineH + pad * 2;
        ensure(Math.min(rowH, PH - 2 * M));
        const top = y;
        cellLines.forEach((lines, ci) => {
          const cx = x + ci * cw;
          page.drawRectangle({ x: cx, y: top - rowH, width: cw, height: rowH, borderColor: grey, borderWidth: 0.6 });
          y = top - pad;
          for (const line of lines) {
            let tx = cx + pad;
            for (const r of line) { page.drawText(r.text, { x: tx, y: y - size, size, font: r.bold ? fonts.bold : fonts.regular, color: black }); tx += r.width; }
            y -= lineH;
          }
        });
        y = top - rowH;
      }
      y -= fontSize * 0.8;
    } else if (b.type === 'rule') {
      ensure(10);
      page.drawLine({ start: { x, y: y - 4 }, end: { x: x + w, y: y - 4 }, thickness: 0.8, color: grey });
      y -= 12;
    }
  }

  // Sayfa numaraları
  const pages = doc.getPages();
  pages.forEach((p, i) => {
    const label = `${i + 1} / ${pages.length}`;
    const lw = fonts.regular.widthOfTextAtSize(label, 8);
    p.drawText(label, { x: (PW - lw) / 2, y: M / 2, size: 8, font: fonts.regular, color: grey });
  });
  // Nesne akışı kapalı: eski görüntüleyicilerle uyum daha iyi, dosya farkı birkaç KB.
  return { bytes: await doc.save({ useObjectStreams: false }), pages: pages.length, images: stats.images };
}

$('convert').addEventListener('click', async () => {
  if (!current) return;
  const btn = $('convert');
  btn.disabled = true; $('print').disabled = true;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  setProgress($('progress'), 5, 'Yazı tipi ve PDF kütüphanesi yükleniyor…');
  await tick();
  try {
    const { bytes, pages, images } = await buildDirectPdf();
    setProgress($('progress'), 100, 'PDF yazılıyor…');
    await tick();
    resultBlob = new Blob([bytes], { type: 'application/pdf' });
    resultName = `${baseName(current.file.name)}.pdf`;
    const note = images > 0 ? ` · ${images} görsel bu modda atlandı (görseller için "Yazdır" yolunu kullanın)` : '';
    $('result-info').textContent = `${pages} sayfa · ${formatBytes(resultBlob.size)} · ${resultName}${note}`;
    $('result').classList.add('is-active');
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    const m = String(err && err.message || '');
    showError($('error'), m === 'FONT' || /Yüklenemedi/.test(m)
      ? 'Yazı tipi dosyası yüklenemedi. Sayfayı yenileyip tekrar deneyin; sorun sürerse "Yazdır ve PDF olarak kaydet" yolunu kullanın.'
      : 'PDF üretilirken beklenmeyen bir hata oluştu. "Yazdır ve PDF olarak kaydet" yolunu deneyin ya da belgeyi Word\'de yeniden kaydedip tekrar seçin.');
  } finally {
    btn.disabled = false; $('print').disabled = false;
  }
});

$('download').addEventListener('click', () => { if (resultBlob) downloadBlob(resultBlob, resultName); });
