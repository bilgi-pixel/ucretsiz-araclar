// Split PDF (EN): pdf-lib ile sayfalar kopyalanır; hiçbir dosya sunucuya gitmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, getPdfLib, tick, parsePageRanges } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;
let file = null;
let srcDoc = null;
let pageCount = 0;
let results = []; // { blob, name }

/** İngilizce hata mesajları (ba.js'teki ortak mesajlar Türkçe). */
function friendlyError(err) {
  const m = String((err && err.message) || err);
  if (/encrypted|password/i.test(m)) return 'This PDF looks password-protected. Remove the password first, then try again.';
  if (/Failed to parse|Invalid PDF|No PDF header|Unexpected|corrupt|XRef|Expected/i.test(m)) return 'This file is damaged or is not a valid PDF. Check that you can open it, then select it again.';
  if (/memory|allocation/i.test(m)) return 'The file is too large for your browser memory. Try a smaller PDF.';
  return 'Something went wrong while splitting. Reload the page and try again.';
}

/** ba.js'teki sayfa aralığı ayrıştırıcısının Türkçe hatalarını İngilizceye çevirir. */
function parseRanges(expr, total) {
  try {
    return parsePageRanges(expr, total);
  } catch (e) {
    throw new Error(`Invalid page range: "${String(expr).trim()}". Example: 1-3, 5, 8-10`);
  }
}

createDropzone({ el: $('drop'), accept: 'application/pdf,.pdf', multiple: false, onFiles: ([f]) => openFile(f) });

async function openFile(f) {
  reset();
  if (!(f.type === 'application/pdf' || /\.pdf$/i.test(f.name))) { showError($('error'), 'Please select a PDF file.'); return; }
  file = f;
  try {
    const PDFLib = await getPdfLib();
    srcDoc = await PDFLib.PDFDocument.load(await f.arrayBuffer());
    pageCount = srcDoc.getPageCount();
    if (pageCount < 1) throw new Error('Failed to parse: no pages');
  } catch (err) {
    file = null; srcDoc = null;
    // Açılışta yükleme başarısızsa şifreli değilse dosya bozuk sayılır.
    showError($('error'), /encrypted|password/i.test(String(err && err.message)) ? friendlyError(err) : 'This file is damaged or is not a valid PDF. Check that you can open it, then select it again.');
    return;
  }
  $('files').innerHTML = `<li><span class="name"></span><span class="meta"></span></li>`;
  $('files').querySelector('.name').textContent = f.name;
  $('files').querySelector('.meta').textContent = `${pageCount} ${pageCount === 1 ? 'page' : 'pages'} · ${formatBytes(f.size)}`;
  $('page-count').textContent = String(pageCount);
  $('opt-range').value = pageCount > 1 ? `1-${Math.min(pageCount, 2)}` : '1';
  if (f.size >= BIG_FILE) $('warning').textContent = `This file is ${formatBytes(f.size)}. Splitting works, but a phone browser may run out of memory; use a computer if it stalls.`;
  $('warning').classList.toggle('is-active', f.size >= BIG_FILE);
  $('options').hidden = false;
  $('actions').hidden = false;
}

function reset() {
  file = null; srcDoc = null; pageCount = 0; results = [];
  $('files').innerHTML = '';
  $('options').hidden = true; $('actions').hidden = true;
  $('result').classList.remove('is-active');
  $('warning').classList.remove('is-active'); $('warning').textContent = '';
  $('downloads').innerHTML = '';
  showError($('error'), null);
}
$('clear').addEventListener('click', reset);

$('opt-mode').addEventListener('change', () => {
  const m = $('opt-mode').value;
  $('f-range').hidden = !(m === 'extract' || m === 'delete');
  $('f-every').hidden = m !== 'every';
  $('opt-range').placeholder = m === 'delete' ? 'pages to delete, e.g. 1, 4-5' : 'e.g. 1-3, 5, 8-10';
});

async function makePdf(PDFLib, indices) {
  const out = await PDFLib.PDFDocument.create();
  out.setProducer('Bilişim Ajans Free Tools');
  const pages = await out.copyPages(srcDoc, indices);
  pages.forEach((p) => out.addPage(p));
  return new Blob([await out.save()], { type: 'application/pdf' });
}

$('run').addEventListener('click', async () => {
  if (!srcDoc) return;
  const btn = $('run');
  btn.disabled = true;
  results = [];
  $('downloads').innerHTML = '';
  $('result').classList.remove('is-active');
  showError($('error'), null);
  const mode = $('opt-mode').value;
  const base = baseName(file.name);
  try {
    const PDFLib = await getPdfLib();
    const all = Array.from({ length: pageCount }, (_, i) => i);
    const groups = []; // [{ indices, name }]
    if (mode === 'extract') {
      // Yazılış sırası korunur (sıralama aracı olarak da kullanılabilsin).
      const nums = parsePageRangesOrdered($('opt-range').value, pageCount);
      if (!nums.length) throw new Error('Invalid page range. Example: 1-3, 5, 8-10');
      groups.push({ indices: nums.map((n) => n - 1), name: `${base}-pages.pdf` });
    } else if (mode === 'delete') {
      const del = new Set(parseRanges($('opt-range').value, pageCount));
      const keep = all.filter((i) => !del.has(i + 1));
      if (!keep.length) throw new Error('You cannot delete every page; at least one page must remain.');
      groups.push({ indices: keep, name: `${base}-edited.pdf` });
    } else if (mode === 'every') {
      const n = Math.max(1, Number($('opt-every').value) || 1);
      for (let i = 0, k = 1; i < pageCount; i += n, k++) groups.push({ indices: all.slice(i, i + n), name: `${base}-${k}.pdf` });
    } else {
      all.forEach((i) => groups.push({ indices: [i], name: `${base}-${i + 1}.pdf` }));
    }
    for (let g = 0; g < groups.length; g++) {
      setProgress($('progress'), (g / groups.length) * 100, `Preparing ${g + 1}/${groups.length}…`);
      await tick();
      results.push({ blob: await makePdf(PDFLib, groups[g].indices), name: groups[g].name });
    }
    setProgress($('progress'), null);
    renderDownloads();
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), /Invalid page range|cannot delete/.test(err.message) ? err.message : friendlyError(err));
  } finally {
    btn.disabled = false;
  }
});

function parsePageRangesOrdered(expr, total) {
  const out = [];
  for (const part of String(expr || '').split(/[,\s;]+/).filter(Boolean)) {
    const nums = parseRanges(part, total);
    nums.forEach((n) => { if (!out.includes(n)) out.push(n); });
  }
  return out;
}

function renderDownloads() {
  const box = $('downloads');
  const total = results.reduce((s, r) => s + r.blob.size, 0);
  $('result-info').textContent = results.length === 1 ? `${results[0].name} · ${formatBytes(total)}` : `${results.length} files · ${formatBytes(total)} in total`;
  results.forEach((r, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `ba-btn ${results.length === 1 ? 'ba-btn-success ba-btn-lg' : ''}`;
    b.textContent = results.length === 1 ? 'Download PDF' : `Download part ${i + 1}`;
    b.dataset.download = String(i);
    b.addEventListener('click', () => downloadBlob(r.blob, r.name));
    box.appendChild(b);
  });
  if (results.length > 1) {
    const all = document.createElement('button');
    all.type = 'button';
    all.className = 'ba-btn ba-btn-success ba-btn-lg';
    all.textContent = 'Download all';
    all.addEventListener('click', async () => {
      for (const r of results) { downloadBlob(r.blob, r.name); await new Promise((res) => setTimeout(res, 400)); }
    });
    box.prepend(all);
  }
  $('result').classList.add('is-active');
}
