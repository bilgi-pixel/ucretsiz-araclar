// PDF to JPG (EN): pdf.js (Apache-2.0) draws each PDF page on a canvas, the canvas is encoded as
// JPG or PNG, and fflate (MIT) packs the images into a ZIP. Everything happens in the browser;
// the PDF never leaves the device and the page makes no network request.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, getPdfJs, tick } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;
const DPI_MIN = 36;
const DPI_MAX = 600;
const THUMB = 220; // longest side of the result previews, in px

// Tarayıcı canvas sınırları: masaüstünde kenar başına 16384 px / ~268 MP; iOS Safari ~16,7 MP.
const IS_IOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const limits = { side: 16384, area: IS_IOS ? 16_777_216 : 268_435_456 };

const num = (n) => Number(n).toLocaleString('en-US');
const plural = (n, word) => `${num(n)} ${word}${n === 1 ? '' : 's'}`;

let pdfjs = null;
let worker = null;       // tek pdf.js worker'ı tüm belgeler paylaşır
let fflate = null;
let docs = [];           // { id, file, base, doc, numPages, w, h }
let results = [];        // { blob, thumbUrl, name, page, docName, w, h, dpi }
let busy = false;
let cancelRequested = false;
let currentRender = null;
let opening = Promise.resolve();
let pwResolve = null;
let refocusAfterPassword = false; // parola kutusu odaktayken kapandıysa odağı geri taşı
let nextId = 1;

createDropzone({
  el: $('drop'),
  accept: 'application/pdf,.pdf',
  multiple: true,
  onFiles: (list) => { opening = opening.then(() => addFiles(list)).catch((e) => console.error(e)); },
});

/* ---------- Helpers ---------- */

/** Library errors → English messages with a suggested fix (ba.js messages are Turkish). */
function englishError(err, label = 'This file') {
  const m = String(err && (err.name + ' ' + err.message));
  if (/PasswordException|password|encrypted/i.test(m)) return `${label} is password-protected and could not be opened. Check the password and try again, or remove the protection first with Unlock PDF.`;
  if (/memory|allocation/i.test(m)) return `${label} is too large for the browser's memory. Close other tabs, choose a lower resolution or split the PDF into smaller parts first.`;
  return `${label} is damaged or is not a valid PDF. Check that it opens in another PDF reader, or download it again, then select it once more.`;
}

async function getFflate() {
  if (!fflate) fflate = await import(new URL('../../vendor/fflate@0.8.3/fflate.browser.mjs', import.meta.url).href);
  return fflate;
}

/** "1-3,5,8-" → [1,2,3,5,8,…,total]. Empty → every page. Throws RangeError(part) on bad input. */
function parseRanges(expr, total) {
  const clean = String(expr || '').replace(/[–—]/g, '-').replace(/\s*-\s*/g, '-').trim();
  if (!clean || /^all$/i.test(clean)) return Array.from({ length: total }, (_, i) => i + 1);
  const out = new Set();
  for (const part of clean.split(/[,;\s]+/).filter(Boolean)) {
    const m = part.match(/^(\d*)-(\d*)$/);
    if (m && (m[1] || m[2])) {
      const a = m[1] ? Number(m[1]) : 1;
      const b = m[2] ? Number(m[2]) : total;
      if (!m[2] && a > total) continue; // "8-" on a 3-page PDF matches nothing
      const lo = Math.max(1, Math.min(a, b));
      const hi = Math.min(total, Math.max(a, b));
      for (let i = lo; i <= hi; i++) out.add(i);
    } else if (/^\d+$/.test(part)) {
      const n = Number(part);
      if (n >= 1 && n <= total) out.add(n);
    } else {
      throw new RangeError(part);
    }
  }
  return Array.from(out).sort((x, y) => x - y);
}

/**
 * Pixel size of a page (in PDF points) at a given DPI, scaled down when the browser's canvas
 * limits (longest side, total area) would be exceeded.
 */
function fitScale(wPt, hPt, dpi) {
  const base = dpi / 72;
  const w = wPt * base;
  const h = hPt * base;
  const k = Math.min(1, limits.side / Math.max(w, h), Math.sqrt(limits.area / (w * h)));
  const scale = base * k;
  const reduced = k < 1;
  const width = Math.max(1, reduced ? Math.floor(w * k) : Math.round(w));
  const height = Math.max(1, reduced ? Math.floor(h * k) : Math.round(h));
  return { scale, width, height, reduced, dpi: Math.round(scale * 72 * 10) / 10 };
}

function safeBase(name) {
  const b = baseName(name).replace(/[\\/:*?"<>|\u0000-\u001f]+/g, '-').trim() || 'document';
  let out = b; let i = 2;
  while (docs.some((d) => d.base === out)) out = `${b}-${i++}`;
  return out;
}

const pad = (n, total) => String(n).padStart(Math.max(3, String(total).length), '0');
const toBlob = (canvas, type, q) => new Promise((r) => { try { canvas.toBlob(r, type, q); } catch { r(null); } });
const release = (canvas) => { if (canvas) { canvas.width = 0; canvas.height = 0; } };

/* ---------- Writing the DPI into the image ---------- */
let CRC_TABLE = null;
function crc32(buf) {
  if (!CRC_TABLE) {
    CRC_TABLE = new Uint32Array(256);
    for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; CRC_TABLE[n] = c >>> 0; }
  }
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 255] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

/** JFIF APP0 yoğunluğunu DPI'a çevirir (yoksa ekler) — baskıda sayfa gerçek boyutunda çıkar. */
function jpegWithDpi(b, dpi) {
  if (b[0] !== 0xff || b[1] !== 0xd8) return b;
  const d = Math.max(1, Math.min(65535, Math.round(dpi)));
  if (b[2] === 0xff && b[3] === 0xe0 && b[6] === 0x4a && b[7] === 0x46 && b[8] === 0x49 && b[9] === 0x46 && b[10] === 0) {
    b[13] = 1; b[14] = d >> 8; b[15] = d & 255; b[16] = d >> 8; b[17] = d & 255;
    return b;
  }
  const app0 = new Uint8Array([0xff, 0xe0, 0, 16, 0x4a, 0x46, 0x49, 0x46, 0, 1, 1, 1, d >> 8, d & 255, d >> 8, d & 255, 0, 0]);
  const out = new Uint8Array(b.length + app0.length);
  out.set(b.subarray(0, 2), 0); out.set(app0, 2); out.set(b.subarray(2), 2 + app0.length);
  return out;
}

/** PNG'ye IHDR'den hemen sonra pHYs (piksel/metre) parçası ekler. */
function pngWithDpi(b, dpi) {
  if (b.length < 33 || b[12] !== 0x49 || b[13] !== 0x48 || b[14] !== 0x44 || b[15] !== 0x52) return b;
  const dv = new DataView(b.buffer, b.byteOffset, b.byteLength);
  for (let pos = 8; pos + 8 <= b.length;) {
    const type = String.fromCharCode(b[pos + 4], b[pos + 5], b[pos + 6], b[pos + 7]);
    if (type === 'pHYs') return b;
    if (type === 'IDAT') break;
    pos += 12 + dv.getUint32(pos);
  }
  const ppm = Math.round(dpi / 0.0254);
  const chunk = new Uint8Array(21);
  const cv = new DataView(chunk.buffer);
  cv.setUint32(0, 9);
  chunk.set([0x70, 0x48, 0x59, 0x73], 4);
  cv.setUint32(8, ppm); cv.setUint32(12, ppm); chunk[16] = 1;
  cv.setUint32(17, crc32(chunk.subarray(4, 17)));
  const at = 33;
  const out = new Uint8Array(b.length + chunk.length);
  out.set(b.subarray(0, at), 0); out.set(chunk, at); out.set(b.subarray(at), at + chunk.length);
  return out;
}

async function withDpi(blob, format, dpi) {
  try {
    const b = new Uint8Array(await blob.arrayBuffer());
    return new Blob([format === 'png' ? pngWithDpi(b, dpi) : jpegWithDpi(b, dpi)], { type: blob.type });
  } catch {
    return blob;
  }
}

/* ---------- Opening PDFs ---------- */
async function addFiles(list) {
  if (busy) { showError($('error'), 'Wait for the current conversion to finish, or press Cancel, before adding more files.'); return; }
  showError($('error'), null);
  const before = docs.length;
  const problems = [];
  for (const f of list) {
    const msg = await openOne(f);
    if (msg) problems.push(msg);
    if (docs.length !== before) clearResults(); // listeye PDF eklendiyse eski sonuçlar artık eksik
    renderFileList();
  }
  setProgress($('progress'), null);
  renderFileList();
  if (problems.length) showError($('error'), problems.join(' '));
  // Parola kutusu gizlenince odak <body>'ye düşer; klavye kullanıcısını mantıklı bir yere taşı.
  if (refocusAfterPassword) {
    refocusAfterPassword = false;
    const a = document.activeElement;
    // Gizlenen kutudaki öğe, tarayıcı odağı düzeltene kadar activeElement olarak kalabilir.
    if (!a || a === document.body || $('pw-box').contains(a)) (docs.length ? $('run') : $('drop')).focus({ preventScroll: true });
  }
}

async function openOne(f) {
  const label = `“${f.name}”`;
  if (!(f.type === 'application/pdf' || /\.pdf$/i.test(f.name))) return `${label} is not a PDF. Choose a file that ends in .pdf; to turn pictures into a PDF, use Image to PDF instead.`;
  if (!f.size) return `${label} is empty (0 bytes). Download or export it again, then select the new copy.`;
  if (docs.some((d) => d.file.name === f.name && d.file.size === f.size && d.file.lastModified === f.lastModified)) return `${label} is already in the list.`;
  setProgress($('progress'), 10, `Opening ${f.name}…`);
  await tick();
  let data;
  try { data = new Uint8Array(await f.arrayBuffer()); } catch {
    return `${label} could not be read. Select it again; if it sits on a network drive or in cloud storage, copy it to your device first.`;
  }
  try {
    pdfjs = pdfjs || await getPdfJs();
    if (!worker) worker = new pdfjs.PDFWorker();
  } catch (err) {
    console.error(err);
    return 'The PDF engine could not be loaded. Reload the page and try again.';
  }
  const task = pdfjs.getDocument({ data, worker });
  let skipped = false;
  task.onPassword = (update, reason) => {
    setProgress($('progress'), null);
    askPassword(f.name, reason).then((pw) => {
      if (pw === null) { skipped = true; update(new Error('skipped')); return; }
      setProgress($('progress'), 30, 'Checking the password…');
      update(pw);
    });
  };
  try {
    const doc = await task.promise;
    hidePassword();
    if (!doc.numPages) { doc.destroy().catch(() => {}); return `${label} contains no pages. Check that it opens in another PDF reader, then select it again.`; }
    const p1 = await doc.getPage(1);
    const vp = p1.getViewport({ scale: 1 });
    p1.cleanup();
    docs.push({ id: nextId++, file: f, base: safeBase(f.name), doc, numPages: doc.numPages, w: vp.width, h: vp.height });
    getFflate().catch(() => {}); // ZIP modülünü önceden yükle (aynı origin; çevrimdışı önbelleğe de girer)
    return null;
  } catch (err) {
    hidePassword();
    task.destroy().catch(() => {});
    if (skipped) return `${label} was skipped because no password was entered. Add it again when you have the password, or remove the protection first with Unlock PDF.`;
    console.error(err);
    return englishError(err, label);
  } finally {
    setProgress($('progress'), null);
  }
}

function askPassword(name, reason) {
  $('pw-box').hidden = false;
  const msg = $('pw-msg');
  msg.textContent = '';
  const strong = document.createElement('strong');
  strong.textContent = reason === 2 ? 'Incorrect password.' : 'This PDF is password-protected.';
  msg.append(strong, document.createTextNode(reason === 2
    ? ` Type the correct password for “${name}” and try again, or skip this file.`
    : ` Type the password to open “${name}”. It is used only inside your browser and is never sent anywhere.`));
  $('pw').value = '';
  $('pw').focus();
  return new Promise((resolve) => { pwResolve = resolve; });
}
function hidePassword() {
  if (!$('pw-box').hidden && $('pw-box').contains(document.activeElement)) refocusAfterPassword = true;
  $('pw-box').hidden = true; $('pw').value = ''; pwResolve = null;
}
$('pw-box').addEventListener('submit', (e) => {
  e.preventDefault();
  if (!pwResolve) return;
  const v = $('pw').value;
  if (!v) { $('pw').focus(); return; }
  const r = pwResolve; pwResolve = null; r(v);
});
$('pw-skip').addEventListener('click', () => { if (pwResolve) { const r = pwResolve; pwResolve = null; r(null); } });

function renderFileList() {
  const ul = $('files');
  ul.innerHTML = '';
  for (const d of docs) {
    const li = document.createElement('li');
    li.innerHTML = '<span class="name"></span><span class="meta"></span><button type="button" class="ba-icon-btn">×</button>';
    li.querySelector('.name').textContent = d.file.name;
    li.querySelector('.name').title = d.file.name;
    li.querySelector('.meta').textContent = `${plural(d.numPages, 'page')} · ${formatBytes(d.file.size)}`;
    const b = li.querySelector('button');
    b.setAttribute('aria-label', `Remove ${d.file.name}`);
    b.addEventListener('click', () => removeDoc(d.id));
    ul.appendChild(li);
  }
  const has = docs.length > 0;
  $('options').hidden = !has;
  $('actions').hidden = !has;
  $('warn-big').hidden = !docs.some((d) => d.file.size > BIG_FILE);
  updateEstimate();
}

function removeDoc(id) {
  if (busy) return;
  const d = docs.find((x) => x.id === id);
  if (!d) return;
  d.doc.destroy().catch(() => {});
  docs = docs.filter((x) => x.id !== id);
  clearResults();
  showError($('error'), null);
  renderFileList();
  if (!docs.length) $('drop').focus();
}

/* ---------- Options ---------- */
function readSettings() {
  const format = $('opt-format').value === 'png' ? 'png' : 'jpeg';
  const custom = $('opt-dpi').value === 'custom';
  const dpi = Number(custom ? $('opt-dpi-custom').value : $('opt-dpi').value);
  if (!Number.isFinite(dpi) || dpi < DPI_MIN || dpi > DPI_MAX) {
    throw new Error(`Enter a resolution between ${DPI_MIN} and ${DPI_MAX} DPI, or pick one of the presets (72, 150 or 300 DPI).`);
  }
  const quality = Math.min(0.95, Math.max(0.6, Number($('opt-quality').value) || 0.85));
  const white = format === 'jpeg' || $('opt-bg').checked;
  return { format, dpi: Math.round(dpi), quality, white, ext: format === 'png' ? 'png' : 'jpg' };
}

function syncOptions() {
  const png = $('opt-format').value === 'png';
  $('quality-field').hidden = png;
  $('opt-bg').disabled = !png;
  if (!png) $('opt-bg').checked = true;
  $('bg-hint').textContent = png
    ? 'Untick to keep transparent areas transparent in the PNG files.'
    : 'JPG cannot store transparency, so the background is always white.';
  $('dpi-custom-field').hidden = $('opt-dpi').value !== 'custom';
  $('opt-quality-out').textContent = `${Math.round(Number($('opt-quality').value) * 100)}%`;
  $('run').textContent = `Convert to ${png ? 'PNG' : 'JPG'}`;
  updateEstimate();
}
['opt-format', 'opt-dpi', 'opt-bg'].forEach((id) => $(id).addEventListener('change', syncOptions));
['opt-quality', 'opt-dpi-custom', 'opt-range'].forEach((id) => $(id).addEventListener('input', syncOptions));
$('opt-dpi').addEventListener('change', () => { if ($('opt-dpi').value === 'custom') $('opt-dpi-custom').focus(); });
$('opt-range').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); run(); } });
$('opt-dpi-custom').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); run(); } });

/** Bytes per pixel for the rough size estimate before conversion (refined while converting). */
const bytesPerPixel = (s) => (s.format === 'png' ? (s.white ? 0.3 : 0.35) : 0.04 + (s.quality - 0.6) * 0.4);

function updateEstimate() {
  const out = $('estimate');
  $('big-job').hidden = true;
  if (!docs.length) { out.textContent = ''; return; }
  let s;
  try { s = readSettings(); } catch { out.textContent = `Enter a resolution between ${DPI_MIN} and ${DPI_MAX} DPI to see the estimate.`; return; }
  let count = 0; let px = 0;
  try {
    for (const d of docs) {
      const c = parseRanges($('opt-range').value, d.numPages).length;
      const f = fitScale(d.w, d.h, s.dpi);
      count += c; px += c * f.width * f.height;
    }
  } catch { out.textContent = 'Check the page range (for example 1-3,5,8-) to see the estimate.'; return; }
  if (!count) { out.textContent = 'The page range does not match any page.'; return; }
  const f1 = fitScale(docs[0].w, docs[0].h, s.dpi);
  out.textContent = `${plural(count, 'image')} · ${num(f1.width)} × ${num(f1.height)} px per page (based on page 1${docs.length > 1 ? ' of the first PDF' : ''}) · roughly ${formatBytes(Math.round(px * bytesPerPixel(s)))} in total (estimate; the real size depends on the content)`;
  $('big-job').hidden = count < 200 && px < 400_000_000;
}

/* ---------- Conversion ---------- */
async function renderPage(d, n, s) {
  const page = await d.doc.getPage(n);
  try {
    const base = page.getViewport({ scale: 1 });
    let fit = fitScale(base.width, base.height, s.dpi);
    let shrunk = false;
    for (let attempt = 0; ; attempt++) {
      const canvas = document.createElement('canvas');
      canvas.width = fit.width; canvas.height = fit.height;
      const ctx = canvas.getContext('2d', { alpha: !s.white });
      let blob = null;
      if (ctx) {
        const viewport = page.getViewport({ scale: fit.scale });
        currentRender = page.render({ canvasContext: ctx, viewport, background: s.white ? '#ffffff' : 'rgba(0,0,0,0)' });
        try { await currentRender.promise; } catch (err) { release(canvas); throw err; } finally { currentRender = null; }
        if (cancelRequested) { release(canvas); throw Object.assign(new Error('cancelled'), { name: 'RenderingCancelledException' }); }
        blob = await toBlob(canvas, s.format === 'png' ? 'image/png' : 'image/jpeg', s.quality);
      }
      if (blob) {
        // Önizleme: büyük canvas'ı küçük bir kopyaya indir, sonra büyük canvas'ı hemen boşalt.
        const k = Math.min(1, THUMB / Math.max(canvas.width, canvas.height));
        const tc = document.createElement('canvas');
        tc.width = Math.max(1, Math.round(canvas.width * k)); tc.height = Math.max(1, Math.round(canvas.height * k));
        const tctx = tc.getContext('2d');
        if (s.white) { tctx.fillStyle = '#fff'; tctx.fillRect(0, 0, tc.width, tc.height); }
        tctx.drawImage(canvas, 0, 0, tc.width, tc.height);
        const thumb = await toBlob(tc, s.white ? 'image/jpeg' : 'image/png', 0.75);
        const w = canvas.width; const h = canvas.height;
        release(tc); release(canvas);
        const out = await withDpi(blob, s.format, fit.dpi);
        return { blob: out, thumbUrl: thumb ? URL.createObjectURL(thumb) : '', w, h, dpi: fit.dpi, reduced: fit.reduced || shrunk };
      }
      release(canvas);
      // Tarayıcı bu boyutta canvas'ı reddetti: alanı yarıya indirip tekrar dene.
      if (attempt >= 3) throw new Error('canvas allocation failed (memory)');
      shrunk = true;
      const k = Math.SQRT1_2;
      fit = { scale: fit.scale * k, width: Math.max(1, Math.floor(fit.width * k)), height: Math.max(1, Math.floor(fit.height * k)), reduced: true, dpi: Math.round(fit.scale * k * 72 * 10) / 10 };
    }
  } finally {
    page.cleanup();
  }
}

const isCancel = (err) => cancelRequested || (err && err.name === 'RenderingCancelledException');

function setBusy(on) {
  busy = on;
  $('run').disabled = on;
  $('clear').disabled = on;
  $('options').querySelectorAll('input, select').forEach((el) => { el.disabled = on; });
  $('files').querySelectorAll('button').forEach((b) => { b.disabled = on; });
  $('drop').setAttribute('aria-disabled', on ? 'true' : 'false');
  $('cancel').hidden = !on;
  $('cancel').disabled = false;
  $('cancel').textContent = 'Cancel';
  if (!on) syncOptions(); // PNG dışında arka plan kutusu kilitli kalmalı
}

$('run').addEventListener('click', run);

async function run() {
  if (busy || !docs.length) return;
  showError($('error'), null);
  let s;
  try { s = readSettings(); } catch (err) { showError($('error'), err.message); $('opt-dpi-custom').focus(); return; }
  const jobs = [];
  try {
    for (const d of docs) for (const n of parseRanges($('opt-range').value, d.numPages)) jobs.push({ d, n });
  } catch (err) {
    showError($('error'), `Invalid page range: “${err.message}”. Separate pages with commas and ranges with a dash, for example 1-3,5,8- (8- means page 8 to the end). Leave the box empty to convert every page.`);
    $('opt-range').focus();
    return;
  }
  if (!jobs.length) {
    const max = Math.max(...docs.map((d) => d.numPages));
    showError($('error'), `That range contains no pages. ${docs.length === 1 ? `“${docs[0].file.name}” has ${plural(max, 'page')}` : `The longest PDF has ${plural(max, 'page')}`}; use numbers between 1 and ${num(max)}, or leave the box empty to convert every page.`);
    $('opt-range').focus();
    return;
  }

  clearResults();
  cancelRequested = false;
  setBusy(true);
  const notes = [];
  const unmatched = docs.filter((d) => !jobs.some((j) => j.d === d));
  if (unmatched.length) notes.push(`No pages of ${unmatched.map((d) => `“${d.file.name}”`).join(', ')} matched the range, so ${unmatched.length === 1 ? 'that file was' : 'those files were'} skipped.`);
  const reduced = [];
  const failed = [];
  let stoppedByMemory = '';
  let bytes = 0;
  try {
    for (let k = 0; k < jobs.length; k++) {
      if (cancelRequested) break;
      const { d, n } = jobs[k];
      const est = results.length ? ` · about ${formatBytes(Math.round((bytes / results.length) * jobs.length))} in total` : '';
      setProgress($('progress'), (k / jobs.length) * 100, `Page ${num(n)} of ${num(d.numPages)}${docs.length > 1 ? ` in ${d.file.name}` : ''} · image ${num(k + 1)} of ${num(jobs.length)}${est}`);
      await tick();
      let r;
      try {
        r = await renderPage(d, n, s);
      } catch (err) {
        if (isCancel(err)) break;
        console.error(err);
        if (/memory|allocation/i.test(String(err && err.message))) { stoppedByMemory = `Stopped at page ${num(n)} of “${d.file.name}” because the browser ran out of memory. Choose a lower resolution or a smaller page range, close other tabs and try again.`; break; }
        failed.push(`${n} (${d.file.name})`);
        continue;
      }
      const name = `${d.base}-page-${pad(n, d.numPages)}.${s.ext}`;
      results.push({ ...r, name, page: n, docName: d.file.name });
      bytes += r.blob.size;
      if (r.reduced) reduced.push({ n, d, r });
      appendCard(results.length - 1);
      if (k % 10 === 9) await tick();
    }
  } finally {
    setProgress($('progress'), null);
    setBusy(false);
  }
  showError($('error'), null); // iş sürerken eklenmeye çalışılan dosyanın "bekleyin" uyarısı artık geçersiz

  if (cancelRequested) notes.unshift(`Cancelled after ${plural(results.length, 'image')} of ${num(jobs.length)}. The finished images are below; press Convert again to start over.`);
  if (stoppedByMemory) notes.unshift(stoppedByMemory);
  if (reduced.length) {
    if (reduced.length <= 5) {
      reduced.forEach(({ n, d, r }) => notes.push(`Page ${num(n)} of “${d.file.name}” was too large for the browser's canvas at ${s.dpi} DPI, so it was rendered at ${r.dpi} DPI (${num(r.w)} × ${num(r.h)} px).`));
    } else {
      const low = Math.min(...reduced.map((x) => x.r.dpi));
      notes.push(`${plural(reduced.length, 'page')} were too large for the browser's canvas at ${s.dpi} DPI and were rendered at a lower resolution (down to ${low} DPI).`);
    }
  }
  if (failed.length) notes.push(`These pages could not be drawn and were skipped: ${failed.slice(0, 10).join(', ')}${failed.length > 10 ? '…' : ''}. Try a lower resolution, or open the PDF in another reader to check those pages.`);

  if (!results.length) {
    showError($('error'), cancelRequested
      ? 'Conversion cancelled before any page was finished. Press Convert to start again.'
      : (notes.join(' ') || 'No page could be converted. Try a lower resolution or check that the PDF opens in another reader.'));
    $('run').focus();
    return;
  }
  showResult(s, notes);
}

$('cancel').addEventListener('click', () => {
  if (!busy) return;
  cancelRequested = true;
  $('cancel').disabled = true;
  $('cancel').textContent = 'Cancelling…';
  try { currentRender && currentRender.cancel(); } catch { /* yok say */ }
});

/* ---------- Results ---------- */
function appendCard(i) {
  const r = results[i];
  const li = document.createElement('li');
  li.className = 'pj-card';
  li.dataset.w = String(r.w); li.dataset.h = String(r.h); li.dataset.name = r.name;
  const frame = document.createElement('span');
  frame.className = 'pj-thumb';
  if (r.thumbUrl) {
    const img = document.createElement('img');
    img.src = r.thumbUrl; img.alt = `Preview of page ${r.page}`; img.loading = 'lazy'; img.decoding = 'async';
    frame.appendChild(img);
  }
  const name = document.createElement('span'); name.className = 'pj-name'; name.textContent = r.name;
  const meta = document.createElement('span'); meta.className = 'pj-meta'; meta.textContent = `${num(r.w)} × ${num(r.h)} px · ${formatBytes(r.blob.size)}`;
  const btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'ba-btn pj-dl'; btn.textContent = 'Download';
  btn.dataset.download = String(i);
  btn.setAttribute('aria-label', `Download ${r.name}`);
  li.append(frame, name, meta, btn);
  $('thumbs').appendChild(li);
}

$('thumbs').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-download]');
  if (!b) return;
  const r = results[Number(b.dataset.download)];
  if (r) downloadBlob(r.blob, r.name);
});

function showResult(s, notes) {
  const total = results.reduce((a, r) => a + r.blob.size, 0);
  const same = results.every((r) => r.w === results[0].w && r.h === results[0].h);
  $('result-info').textContent = `${plural(results.length, `${s.ext.toUpperCase()} image`)} · ${same ? `${num(results[0].w)} × ${num(results[0].h)} px · ` : ''}${s.dpi} DPI · ${formatBytes(total)} in total`;
  const ul = $('notes');
  ul.innerHTML = '';
  notes.forEach((t) => { const li = document.createElement('li'); li.textContent = t; ul.appendChild(li); });
  ul.hidden = !notes.length;
  $('download-zip').textContent = results.length === 1 ? 'Download as ZIP' : `Download all ${num(results.length)} as ZIP`;
  $('result').hidden = false;
  $('result').classList.add('is-active');
  $('result').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

function clearResults() {
  results.forEach((r) => { if (r.thumbUrl) URL.revokeObjectURL(r.thumbUrl); });
  results = [];
  $('thumbs').innerHTML = '';
  $('notes').innerHTML = '';
  $('result').classList.remove('is-active');
  $('result').hidden = true;
}

$('download-zip').addEventListener('click', async () => {
  if (!results.length || busy) return;
  const btn = $('download-zip');
  btn.disabled = true;
  try {
    const ff = await getFflate();
    const parts = [];
    let done;
    const finished = new Promise((resolve, reject) => { done = { resolve, reject }; });
    const zip = new ff.Zip((err, chunk, final) => {
      if (err) { done.reject(err); return; }
      parts.push(chunk);
      if (final) done.resolve();
    });
    // JPG/PNG zaten sıkıştırılmış: yeniden sıkıştırmadan (stored) eklenir.
    for (let i = 0; i < results.length; i++) {
      const r = results[i];
      setProgress($('progress'), (i / results.length) * 100, `Adding ${r.name} to the ZIP (${num(i + 1)}/${num(results.length)})`);
      const entry = new ff.ZipPassThrough(r.name);
      entry.mtime = new Date();
      zip.add(entry);
      entry.push(new Uint8Array(await r.blob.arrayBuffer()), true);
      if (i % 5 === 4) await tick();
    }
    zip.end();
    await finished;
    const bases = new Set(results.map((r) => r.docName));
    const ext = results[0].name.split('.').pop();
    const zipName = bases.size === 1 ? `${results[0].name.replace(/-page-\d+\.[a-z]+$/, '')}-${ext}.zip` : `pdf-to-${ext}-images.zip`;
    downloadBlob(new Blob(parts, { type: 'application/zip' }), zipName);
  } catch (err) {
    console.error(err);
    showError($('error'), 'The ZIP could not be created; the browser may have run out of memory. Download the images one by one, or convert fewer pages at a time.');
  } finally {
    setProgress($('progress'), null);
    btn.disabled = false;
  }
});

/* ---------- Clear ---------- */
function reset() {
  if (busy) return;
  if (pwResolve) { const r = pwResolve; pwResolve = null; r(null); }
  docs.forEach((d) => d.doc.destroy().catch(() => {}));
  docs = [];
  clearResults();
  $('opt-range').value = '';
  showError($('error'), null);
  setProgress($('progress'), null);
  renderFileList();
  $('drop').focus();
}
$('clear').addEventListener('click', reset);

syncOptions();

// Test kancası: saf hesap fonksiyonları ve canvas sınırlarını düşürme (yalnızca testlerde kullanılır).
window.__pdfToJpgTest = () => ({
  fitScale,
  parseRanges,
  limits: { ...limits },
  setLimits: (o) => Object.assign(limits, o),
});
