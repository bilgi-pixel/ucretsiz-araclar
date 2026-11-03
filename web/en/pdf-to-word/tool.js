// PDF to Word (beta, EN): pdf.js ile metin çıkarılır, satır/paragraf/başlık olarak gruplanır,
// docx kütüphanesiyle .docx üretilir. Tümü tarayıcıda; hiçbir dosya sunucuya gitmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, getPdfJs, tick } from '../../assets/js/ba.js';

/** İngilizce hata mesajları (ba.js'teki ortak mesajlar Türkçe). */
function friendlyError(err) {
  const m = String((err && err.message) || err);
  if (/encrypted|password/i.test(m)) return 'This PDF looks password-protected. Remove the password first, then try again.';
  if (/Failed to parse|Invalid PDF|No PDF header|Unexpected|corrupt|XRef|Expected/i.test(m)) return 'This file is damaged or is not a valid file of this type. Check that you can open it, then select it again.';
  if (/Unsupported|not supported|Unable to decode|decode/i.test(m)) return 'This file format is not supported. Please choose a JPG, PNG or WebP image.';
  if (/memory|allocation/i.test(m)) return 'The file is too large for your browser memory. Try smaller parts.';
  return 'Something went wrong. Reload the page and try again.';
}

const $ = (id) => document.getElementById(id);
const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const BIG_FILE = 50 * 1024 * 1024;
let file = null;
let pdf = null;
let resultBlob = null;
let resultName = 'document.docx';

createDropzone({ el: $('drop'), accept: 'application/pdf,.pdf', multiple: false, onFiles: ([f]) => openFile(f) });

async function openFile(f) {
  reset();
  if (!(f.type === 'application/pdf' || /\.pdf$/i.test(f.name))) { showError($('error'), 'Please select a PDF file.'); return; }
  file = f;
  $('warn').hidden = f.size < BIG_FILE;
  try {
    const pdfjs = await getPdfJs();
    pdf = await pdfjs.getDocument({ data: await f.arrayBuffer() }).promise;
  } catch (err) {
    file = null; pdf = null;
    showError($('error'), /PasswordException|password/i.test(String(err && (err.name + err.message))) ? 'This PDF looks password-protected. Remove the password first, then try again.' : friendlyError(err));
    return;
  }
  $('files').innerHTML = '<li><span class="name"></span><span class="meta"></span></li>';
  $('files').querySelector('.name').textContent = f.name;
  $('files').querySelector('.meta').textContent = `${pdf.numPages} ${pdf.numPages === 1 ? 'page' : 'pages'} · ${formatBytes(f.size)}`;
  $('options').hidden = false;
  $('actions').hidden = false;
}

function reset() {
  file = null; pdf = null; resultBlob = null;
  $('files').innerHTML = '';
  $('options').hidden = true; $('actions').hidden = true; $('warn').hidden = true;
  $('result').classList.remove('is-active');
  setProgress($('progress'), null);
  showError($('error'), null);
}
$('clear').addEventListener('click', reset);

/** vendor/ altındaki docx kütüphanesini (ES module) bir kez yükler. */
let docxPromise = null;
function getDocx() {
  if (!docxPromise) docxPromise = import(new URL('../../vendor/docx@9.15.1/docx.mjs', import.meta.url).href);
  return docxPromise;
}

/** Yazı tipi adı/özelliklerinden kalınlık tahmini. */
function isBoldFont(page, styles, fontName) {
  let name = '';
  try {
    if (page.commonObjs.has(fontName)) {
      const f = page.commonObjs.get(fontName);
      if (f && f.bold) return true;
      name = (f && f.name) || '';
    }
  } catch { /* yazı tipi henüz yüklenmemiş olabilir; ad üzerinden devam */ }
  const fam = (styles[fontName] && styles[fontName].fontFamily) || '';
  return /bold|black|heavy|semibold|demibold|extrabold/i.test(`${name} ${fam} ${fontName}`);
}

/**
 * Bir sayfanın metin öğelerini satırlara, satırları paragraflara ayırır.
 * Dönüş: [{ lines: [{ runs:[{text,bold}], x, y, size }], size, bold, x }]
 */
function buildParagraphs(page, content) {
  const styles = content.styles || {};
  const boldCache = new Map();
  const items = [];
  for (const it of content.items) {
    if (typeof it.str !== 'string' || !it.str.trim()) continue;
    const [a, b, , d, x, y] = it.transform;
    const size = Math.max(1, Math.abs(d) || Math.hypot(a, b) || it.height || 10);
    if (!boldCache.has(it.fontName)) boldCache.set(it.fontName, isBoldFont(page, styles, it.fontName));
    items.push({ text: it.str, x, y, w: it.width || 0, size, bold: boldCache.get(it.fontName) });
  }
  if (!items.length) return [];
  // Üstten alta, soldan sağa sırala; aynı satırda sayılanları birleştir.
  items.sort((p, q) => (q.y - p.y) || (p.x - q.x));
  const lines = [];
  for (const it of items) {
    const line = lines[lines.length - 1];
    if (line && Math.abs(line.y - it.y) <= Math.max(line.size, it.size) * 0.45) line.items.push(it);
    else lines.push({ y: it.y, size: it.size, items: [it] });
  }
  for (const line of lines) {
    line.items.sort((p, q) => p.x - q.x);
    line.size = Math.max(...line.items.map((i) => i.size));
    line.x = line.items[0].x;
    line.runs = [];
    let prev = null;
    for (const it of line.items) {
      let text = it.text;
      if (prev) {
        const gap = it.x - (prev.x + prev.w);
        const needSpace = gap > prev.size * 0.15 && !/\s$/.test(prev.text) && !/^\s/.test(text);
        if (needSpace) text = ` ${text}`;
      }
      const last = line.runs[line.runs.length - 1];
      if (last && last.bold === it.bold) last.text += text;
      else line.runs.push({ text, bold: it.bold });
      prev = it;
    }
    line.bold = line.items.every((i) => i.bold);
    line.text = line.runs.map((r) => r.text).join('');
  }
  // Satırları paragraflara ayır: büyük dikey boşluk, belirgin punto değişimi, kalınlık değişimi.
  const paras = [];
  for (const line of lines) {
    const para = paras[paras.length - 1];
    if (para) {
      const prevLine = para.lines[para.lines.length - 1];
      const gap = prevLine.y - line.y;
      const sizeJump = Math.abs(line.size - para.size) > para.size * 0.15;
      const bigGap = gap > Math.max(prevLine.size, line.size) * 1.7;
      const boldFlip = line.bold !== prevLine.bold && line.text.length < 120;
      if (!bigGap && !sizeJump && !boldFlip) { para.lines.push(line); continue; }
    }
    paras.push({ lines: [line], size: line.size, bold: line.bold, x: line.x });
  }
  return paras;
}

/** Belge genelinde gövde yazı boyutunu (karakter ağırlıklı mod) bulur. */
function bodySize(allParas) {
  const hist = new Map();
  for (const p of allParas) for (const l of p.lines) {
    const k = Math.round(l.size);
    hist.set(k, (hist.get(k) || 0) + l.text.length);
  }
  let best = 11, bestN = -1;
  for (const [k, n] of hist) if (n > bestN) { best = k; bestN = n; }
  return best;
}

/** Paragraf satırlarını tek metne/çalışmalara indirger; satır sonu tirelerini birleştirir. */
function mergeRuns(para) {
  const runs = [];
  para.lines.forEach((line, idx) => {
    const lineRuns = line.runs.map((r) => ({ ...r }));
    if (idx > 0) {
      const last = runs[runs.length - 1];
      const next = lineRuns[0];
      if (last && /[A-Za-zÇĞİÖŞÜçğıöşü]-$/.test(last.text) && next && /^[a-zçğıöşü]/.test(next.text)) last.text = last.text.slice(0, -1);
      else if (last && !/\s$/.test(last.text)) last.text += ' ';
    }
    for (const r of lineRuns) {
      const last = runs[runs.length - 1];
      if (last && last.bold === r.bold) last.text += r.text; else runs.push(r);
    }
  });
  return runs;
}

async function renderPageImage(page) {
  const vp = page.getViewport({ scale: 1.5 });
  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(vp.width); canvas.height = Math.ceil(vp.height);
  await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
  const blob = await new Promise((r) => canvas.toBlob(r, 'image/png'));
  const data = new Uint8Array(await blob.arrayBuffer());
  const maxW = 600; // ~6,25 inç içerik genişliği (96 dpi)
  const scale = Math.min(1, maxW / canvas.width);
  return { data, width: Math.round(canvas.width * scale), height: Math.round(canvas.height * scale) };
}

$('run').addEventListener('click', async () => {
  if (!pdf) return;
  const btn = $('run');
  btn.disabled = true;
  resultBlob = null;
  $('result').classList.remove('is-active');
  showError($('error'), null);
  const withImages = $('opt-images').checked;
  try {
    const docx = await getDocx();
    const { Document, Packer, Paragraph, TextRun, ImageRun, HeadingLevel } = docx;
    const pages = [];
    let totalChars = 0;
    for (let n = 1; n <= pdf.numPages; n++) {
      setProgress($('progress'), ((n - 1) / pdf.numPages) * 90, `Reading page ${n}/${pdf.numPages}…`);
      await tick();
      const page = await pdf.getPage(n);
      const content = await page.getTextContent();
      const paras = buildParagraphs(page, content);
      totalChars += paras.reduce((s, p) => s + p.lines.reduce((t, l) => t + l.text.length, 0), 0);
      const image = withImages ? await renderPageImage(page) : null;
      pages.push({ paras, image });
      page.cleanup();
    }
    if (!totalChars && !withImages) {
      throw new Error('NO_TEXT');
    }
    setProgress($('progress'), 92, 'Building the Word document…');
    await tick();
    const base = bodySize(pages.flatMap((p) => p.paras));
    const children = [];
    let paraCount = 0;
    pages.forEach((pg, idx) => {
      let first = idx > 0; // sonraki sayfalar sayfa sonuyla başlar
      if (pg.image) {
        children.push(new Paragraph({ pageBreakBefore: first, children: [new ImageRun({ type: 'png', data: pg.image.data, transformation: { width: pg.image.width, height: pg.image.height } })] }));
        first = false;
      }
      for (const p of pg.paras) {
        const runs = mergeRuns(p);
        const text = runs.map((r) => r.text).join('').trim();
        if (!text) continue;
        let heading;
        const ratio = p.size / base;
        if (ratio >= 1.6 && text.length < 160) heading = HeadingLevel.HEADING_1;
        else if (ratio >= 1.25 && text.length < 200) heading = HeadingLevel.HEADING_2;
        else if (p.bold && ratio >= 1.05 && text.length < 120) heading = HeadingLevel.HEADING_3;
        children.push(new Paragraph({
          heading,
          pageBreakBefore: first,
          spacing: { after: 160 },
          children: runs.map((r) => new TextRun({ text: r.text, bold: !heading && r.bold ? true : undefined, size: heading ? undefined : Math.round(p.size * 2) })),
        }));
        first = false;
        paraCount++;
      }
      if (first) children.push(new Paragraph({ pageBreakBefore: true, children: [] }));
    });
    const doc = new Document({
      creator: 'Bilişim Ajans Free Tools',
      title: baseName(file.name),
      description: 'Converted from PDF with araclar.bilisimajans.com',
      sections: [{ children }],
    });
    resultBlob = await Packer.toBlob(doc);
    if (resultBlob.type !== DOCX_MIME) resultBlob = new Blob([resultBlob], { type: DOCX_MIME });
    resultName = `${baseName(file.name)}.docx`;
    const note = totalChars ? '' : ' · Warning: no text found, only page images were added';
    $('result-info').textContent = `${pdf.numPages} ${pdf.numPages === 1 ? 'page' : 'pages'} · ${paraCount} ${paraCount === 1 ? 'paragraph' : 'paragraphs'} · ${formatBytes(resultBlob.size)} · ${resultName}${note}`;
    $('result').classList.add('is-active');
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    if (err && err.message === 'NO_TEXT') {
      showError($('error'), 'No selectable text was found in this PDF; it is most likely a scanned image. Extracting text from scans needs OCR, which this tool does not do. For now, tick "Include page images" to place the pages in Word as pictures.');
    } else {
      showError($('error'), friendlyError(err));
    }
  } finally {
    btn.disabled = false;
  }
});

$('download').addEventListener('click', () => { if (resultBlob) downloadBlob(resultBlob, resultName); });
