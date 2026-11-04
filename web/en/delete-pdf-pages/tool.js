// Delete PDF pages (EN) — thumbnails with pdf.js, remaining pages copied into a new document with pdf-lib.
// The file never leaves the device; everything happens in the browser.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, getPdfLib, getPdfJs, parsePageRanges, tick } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const grid = $('pages');
const EAGER_THUMBS = 60;      // thumbnails up to this count are drawn at once, the rest when visible
const BIG_FILE = 50 * 1024 * 1024;

let file = null;
let srcBytes = null;
let pdfjsDoc = null;
let pages = [];               // { n (1-based), selected, rendered }
let resultBlob = null;
let resultName = '';
let observer = null;

createDropzone({ el: $('drop'), accept: 'application/pdf,.pdf', multiple: false, onFiles: ([f]) => openFile(f) });

/** Maps library errors to English messages that suggest a fix (ba.js messages are Turkish). */
function englishError(err) {
  const m = String(err && (err.name + ' ' + err.message));
  if (/PasswordException|password|encrypted/i.test(m)) return 'This PDF looks password-protected. Remove the password first, then try again.';
  if (/memory|allocation/i.test(m)) return 'The file is too large for the browser\'s memory. Split it into smaller parts first and try again.';
  return 'The file is damaged or is not a valid PDF. Check that you can open it, then select it again; if the problem continues, try repacking it with the Compress PDF tool first.';
}

/* ---------- Opening the file and thumbnails ---------- */
async function openFile(f) {
  reset();
  if (!(f.type === 'application/pdf' || /\.pdf$/i.test(f.name))) {
    showError($('error'), 'This is not a PDF file. Please choose a file ending in .pdf; you can convert a Word or image file to PDF first.');
    return;
  }
  file = f;
  if (f.size > BIG_FILE) $('warn-big').hidden = false;
  let count = 0;
  try {
    setProgress($('progress'), 5, 'Opening the PDF…');
    await tick();
    srcBytes = await f.arrayBuffer();
    const pdfjs = await getPdfJs();
    pdfjsDoc = await pdfjs.getDocument({ data: srcBytes.slice(0) }).promise;
    count = pdfjsDoc.numPages;
    if (!count) throw new Error('no pages');
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    const s = String(err && (err.name + ' ' + err.message));
    showError($('error'), /no pages/.test(s) ? 'No pages were found in this PDF. Check that you can open the file, then select it again.' : englishError(err));
    file = null; srcBytes = null; pdfjsDoc = null;
    return;
  }
  $('files').innerHTML = '<li><span class="name"></span><span class="meta"></span></li>';
  $('files').querySelector('.name').textContent = f.name;
  $('files').querySelector('.meta').textContent = `${count} page${count === 1 ? '' : 's'} · ${formatBytes(f.size)}`;
  pages = Array.from({ length: count }, (_, i) => ({ n: i + 1, selected: false, rendered: false }));
  $('editor').hidden = false;
  $('actions').hidden = false;
  buildCards();
  updateSummary();
  await renderThumbs();
}

function buildCards() {
  grid.innerHTML = '';
  for (const p of pages) {
    const li = document.createElement('li');
    li.className = 'pg-card';
    li.dataset.n = String(p.n);
    li.innerHTML = `<label>
      <span class="pg-top"><input type="checkbox" aria-label="Delete page ${p.n}"><span class="pg-num">Page ${p.n}</span></span>
      <span class="pg-thumb"><canvas aria-hidden="true"></canvas><span class="pg-mark" hidden>Will be deleted</span></span>
    </label>`;
    grid.appendChild(li);
  }
}

function syncCards() {
  for (const li of grid.children) {
    const p = pages[Number(li.dataset.n) - 1];
    li.classList.toggle('is-selected', p.selected);
    li.querySelector('input').checked = p.selected;
    li.querySelector('.pg-mark').hidden = !p.selected;
  }
  updateSummary();
}

async function renderThumbs() {
  const eager = pages.slice(0, EAGER_THUMBS);
  for (let k = 0; k < eager.length; k++) {
    if (!pdfjsDoc) return;
    setProgress($('progress'), ((k + 1) / eager.length) * 100, `Preparing previews ${k + 1}/${eager.length}`);
    await drawThumb(eager[k]);
    if (k % 4 === 3) await tick();
  }
  setProgress($('progress'), null);
  if (pages.length > EAGER_THUMBS) {
    $('lazy-note').hidden = false;
    observer = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const p = pages[Number(en.target.dataset.n) - 1];
        if (p && !p.rendered) drawThumb(p);
        observer.unobserve(en.target);
      });
    }, { rootMargin: '300px' });
    pages.slice(EAGER_THUMBS).forEach((p) => observer.observe(grid.children[p.n - 1]));
  }
}

async function drawThumb(p) {
  if (p.rendered || !pdfjsDoc) return;
  p.rendered = true;
  const li = grid.children[p.n - 1];
  if (!li) return;
  const canvas = li.querySelector('canvas');
  try {
    const page = await pdfjsDoc.getPage(p.n);
    const base = page.getViewport({ scale: 1 });
    const vp = page.getViewport({ scale: 150 / Math.max(base.width, base.height) });
    canvas.width = Math.ceil(vp.width); canvas.height = Math.ceil(vp.height);
    await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
    canvas.dataset.ready = '1';
  } catch (err) {
    console.error(err);
    li.querySelector('.pg-thumb').classList.add('is-failed');
  }
}

/* ---------- Selection ---------- */
grid.addEventListener('change', (e) => {
  const cb = e.target.closest('input[type="checkbox"]');
  if (!cb) return;
  const p = pages[Number(cb.closest('li').dataset.n) - 1];
  p.selected = cb.checked;
  invalidate();
  syncCards();
});

function applyRange() {
  const expr = $('range-input').value.trim();
  if (!expr) { showError($('error'), 'Type the pages to delete first, for example 2,5-7 (page 2 and pages 5 to 7).'); return; }
  let nums;
  try {
    nums = parsePageRanges(expr, pages.length);
  } catch (err) {
    // parsePageRanges messages are Turkish; show an English one that names the bad part.
    const bad = (String(err.message).match(/"([^"]*)"/) || [])[1] || expr;
    showError($('error'), `Invalid page range: "${bad}". Separate pages with commas and ranges with a dash, for example 1-3,5,8-10.`);
    return;
  }
  if (!nums.length) {
    showError($('error'), `There are no pages in that range. This document has ${pages.length} page${pages.length === 1 ? '' : 's'}; type a number between 1 and ${pages.length}.`);
    return;
  }
  showError($('error'), null);
  nums.forEach((n) => { pages[n - 1].selected = true; });
  invalidate();
  syncCards();
}
$('range-apply').addEventListener('click', applyRange);
$('range-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); applyRange(); } });

$('sel-all').addEventListener('click', () => {
  const all = pages.every((p) => p.selected);
  pages.forEach((p) => { p.selected = !all; });
  invalidate(); syncCards();
});
$('sel-invert').addEventListener('click', () => { pages.forEach((p) => { p.selected = !p.selected; }); invalidate(); syncCards(); });
$('sel-none').addEventListener('click', () => { pages.forEach((p) => { p.selected = false; }); invalidate(); syncCards(); });

function updateSummary() {
  const del = pages.filter((p) => p.selected).length;
  $('summary').textContent = `${pages.length} page${pages.length === 1 ? '' : 's'} · ${pages.length - del} will stay · ${del} will be deleted`;
}

function invalidate() {
  resultBlob = null;
  $('result').classList.remove('is-active');
}

/* ---------- Delete and save ---------- */
$('run').addEventListener('click', async () => {
  if (!srcBytes) return;
  const del = pages.filter((p) => p.selected);
  if (!del.length) { showError($('error'), 'Mark the pages you want to delete first, or type a range such as 2,5-7 and press "Select range".'); return; }
  const keep = pages.filter((p) => !p.selected);
  if (!keep.length) { showError($('error'), 'You selected every page, but a PDF needs at least one page left. Untick the pages you want to keep.'); return; }
  const btn = $('run');
  btn.disabled = true;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  try {
    const PDFLib = await getPdfLib();
    setProgress($('progress'), 5, 'Reading the source PDF…');
    await tick();
    let src;
    try {
      src = await PDFLib.PDFDocument.load(srcBytes, { ignoreEncryption: false });
    } catch (err) {
      if (/encrypted/i.test(String(err))) throw new Error('encrypted');
      throw new Error(`unreadable: ${err && err.message}`);
    }
    const out = await PDFLib.PDFDocument.create();
    out.setProducer('Bilişim Ajans Free Tools');
    out.setCreator('araclar.bilisimajans.com');
    // Only the remaining pages are copied; the content of deleted pages is not in the output.
    for (let k = 0; k < keep.length; k += 20) {
      const chunk = keep.slice(k, k + 20);
      const copied = await out.copyPages(src, chunk.map((p) => p.n - 1));
      copied.forEach((pg) => out.addPage(pg));
      setProgress($('progress'), 10 + (Math.min(k + 20, keep.length) / keep.length) * 80, `Copying pages ${Math.min(k + 20, keep.length)}/${keep.length}`);
      await tick();
    }
    setProgress($('progress'), 95, 'Writing the PDF…');
    await tick();
    const bytes = await out.save();
    resultBlob = new Blob([bytes], { type: 'application/pdf' });
    resultName = `${baseName(file.name)}-pages-deleted.pdf`;
    $('result-info').textContent = `${del.length} page${del.length === 1 ? '' : 's'} deleted · ${keep.length} left · ${formatBytes(resultBlob.size)} · ${resultName}`;
    $('result').hidden = false;
    $('result').classList.add('is-active');
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    const m = String(err && err.message);
    showError($('error'), /^encrypted/.test(m)
      ? 'This PDF looks password-protected. Remove the password first, then try again.'
      : /^unreadable/.test(m)
        ? 'The file is damaged or is not a valid PDF. Check that you can open it, then select it again; if the problem continues, try repacking it with the Compress PDF tool first.'
        : englishError(err));
  } finally {
    btn.disabled = false;
  }
});

$('download').addEventListener('click', () => {
  if (resultBlob) downloadBlob(resultBlob, resultName);
});

/* ---------- Clear ---------- */
function reset() {
  if (observer) { observer.disconnect(); observer = null; }
  if (pdfjsDoc) pdfjsDoc.destroy().catch(() => {});
  file = null; srcBytes = null; pdfjsDoc = null; pages = []; resultBlob = null; resultName = '';
  $('files').innerHTML = ''; grid.innerHTML = '';
  $('editor').hidden = true; $('actions').hidden = true; $('warn-big').hidden = true; $('lazy-note').hidden = true;
  $('range-input').value = '';
  $('result').classList.remove('is-active');
  setProgress($('progress'), null);
  showError($('error'), null);
}
$('clear').addEventListener('click', reset);
