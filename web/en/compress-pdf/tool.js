// Compress PDF (EN): pdf.js ile sayfalar görsele çevrilir (ya da pdf-lib ile yeniden paketlenir); hiçbir dosya sunucuya gitmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, getPdfJs, getPdfLib, tick } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024; // 50 MB üstünde uyarı
const MB = 1024 * 1024;

// Boyut hedefli ön ayarlar için denenecek (dpi, kalite) merdiveni; yukarıdan aşağıya küçülür.
const LADDER = [[150, 0.8], [110, 0.75], [110, 0.6], [96, 0.6], [96, 0.5], [72, 0.5], [72, 0.35], [72, 0.25]];
const PRESETS = {
  upload2: { target: 2 * MB },
  email5: { target: 5 * MB },
  balanced: { dpi: 110, quality: 0.7 },
  smallest: { dpi: 72, quality: 0.45 },
  custom: {},
};

let file = null;
let pdf = null; // pdf.js belgesi
let resultBlob = null;
let resultName = 'compressed.pdf';

/** İngilizce hata mesajları (ba.js'teki ortak mesajlar Türkçe). */
function friendlyError(err) {
  const m = String((err && err.message) || err);
  if (/encrypted|password/i.test(m)) return 'This PDF looks password-protected. Remove the password first, then try again.';
  if (/Failed to parse|Invalid PDF|No PDF header|Unexpected|corrupt|XRef|Expected/i.test(m)) return 'This file is damaged or is not a valid PDF. Check that you can open it, then select it again.';
  if (/memory|allocation/i.test(m)) return 'The file is too large for your browser memory. Split it into smaller parts and compress each one.';
  return 'Something went wrong while compressing. Reload the page and try again.';
}

createDropzone({ el: $('drop'), accept: 'application/pdf,.pdf', multiple: false, onFiles: ([f]) => openFile(f) });

// ?target=2mb / ?target=5mb ile ön ayar seçilebilir (derin bağlantı için).
{
  const target = new URLSearchParams(location.search).get('target');
  if (target === '2mb') $('opt-preset').value = 'upload2';
  if (target === '5mb') $('opt-preset').value = 'email5';
}

async function openFile(f) {
  reset();
  if (!(f.type === 'application/pdf' || /\.pdf$/i.test(f.name))) { showError($('error'), 'Please select a PDF file. To shrink pictures, use an image tool first.'); return; }
  file = f;
  try {
    const pdfjs = await getPdfJs();
    pdf = await pdfjs.getDocument({ data: await f.arrayBuffer() }).promise;
  } catch (err) {
    file = null; pdf = null;
    showError($('error'), /PasswordException|password/i.test(String(err && (err.name + err.message))) ? 'This PDF looks password-protected. Remove the password first, then try again.' : friendlyError(err));
    return;
  }
  $('files').innerHTML = `<li><span class="name"></span><span class="meta"></span></li>`;
  $('files').querySelector('.name').textContent = f.name;
  $('files').querySelector('.meta').textContent = `${pdf.numPages} ${pdf.numPages === 1 ? 'page' : 'pages'} · ${formatBytes(f.size)}`;
  if (f.size >= BIG_FILE) $('warning').textContent = `This file is ${formatBytes(f.size)}. Files over 50 MB can take several minutes and a phone browser may run out of memory. Use a computer if you can, or split the PDF into parts first.`;
  $('warning').classList.toggle('is-active', f.size >= BIG_FILE);
  $('options').hidden = false;
  $('actions').hidden = false;
  syncOptionVisibility();
}

function reset() {
  file = null; pdf = null; resultBlob = null;
  $('files').innerHTML = '';
  $('options').hidden = true; $('actions').hidden = true;
  $('result').classList.remove('is-active');
  $('warning').classList.remove('is-active'); $('warning').textContent = '';
  showError($('error'), null);
}
$('clear').addEventListener('click', reset);

/** Mod ve ön ayara göre hangi alanların görüneceğini belirler. */
function syncOptionVisibility() {
  const lossless = $('opt-mode').value === 'lossless';
  const custom = $('opt-preset').value === 'custom';
  $('field-preset').hidden = lossless;
  $('field-dpi').hidden = lossless || !custom;
  $('field-quality').hidden = lossless || !custom;
  $('mode-hint').textContent = lossless
    ? 'Text stays selectable; savings are usually 5–20%.'
    : 'Pages are turned into images: the biggest saving, but text can no longer be selected or searched.';
}
$('opt-mode').addEventListener('change', syncOptionVisibility);
$('opt-preset').addEventListener('change', syncOptionVisibility);

/** Tek bir (dpi, kalite) ayarıyla tüm sayfaları görsele çevirip yeni PDF üretir. */
async function buildImagePdf(dpi, quality, attemptLabel) {
  const PDFLib = await getPdfLib();
  const doc = await PDFLib.PDFDocument.create();
  doc.setProducer('Bilişim Ajans Free Tools');
  doc.setCreator('araclar.bilisimajans.com');
  const scale = dpi / 72;
  const total = pdf.numPages;
  for (let n = 1; n <= total; n++) {
    setProgress($('progress'), ((n - 1) / total) * 100, `${attemptLabel}Processing page ${n}/${total} (${dpi} dpi)`);
    await tick();
    const page = await pdf.getPage(n);
    const base = page.getViewport({ scale: 1 });
    const vp = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(vp.width));
    canvas.height = Math.max(1, Math.round(vp.height));
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport: vp }).promise;
    const blob = await new Promise((r) => canvas.toBlob(r, 'image/jpeg', quality));
    canvas.width = canvas.height = 0; // belleği hemen bırak
    page.cleanup();
    const img = await doc.embedJpg(new Uint8Array(await blob.arrayBuffer()));
    const out = doc.addPage([base.width, base.height]);
    out.drawImage(img, { x: 0, y: 0, width: base.width, height: base.height });
  }
  setProgress($('progress'), 100, 'Writing PDF…');
  await tick();
  return doc.save({ useObjectStreams: true });
}

/** Kayıpsız mod: belgeyi pdf-lib ile açıp nesne akışlarıyla yeniden paketler. */
async function buildLosslessPdf() {
  setProgress($('progress'), 30, 'Repacking the document…');
  await tick();
  const PDFLib = await getPdfLib();
  const doc = await PDFLib.PDFDocument.load(await file.arrayBuffer(), { updateMetadata: false });
  setProgress($('progress'), 70, 'Writing PDF…');
  await tick();
  return doc.save({ useObjectStreams: true, addDefaultPage: false });
}

$('run').addEventListener('click', async () => {
  if (!pdf || !file) return;
  const btn = $('run');
  btn.disabled = true;
  resultBlob = null;
  $('result').classList.remove('is-active');
  showError($('error'), null);
  const mode = $('opt-mode').value;
  const presetKey = $('opt-preset').value;
  const preset = PRESETS[presetKey] || PRESETS.balanced;
  try {
    let bytes;
    let note = '';
    if (mode === 'lossless') {
      bytes = await buildLosslessPdf();
    } else if (preset.target) {
      // Hedef boyut: merdiveni yukarıdan aşağıya dene, hedefin altına inince dur.
      let best = null;
      for (let i = 0; i < LADDER.length; i++) {
        const [dpi, q] = LADDER[i];
        bytes = await buildImagePdf(dpi, q, `Attempt ${i + 1}/${LADDER.length} · `);
        if (!best || bytes.length < best.length) best = bytes;
        if (bytes.length <= preset.target) { note = `Target reached at ${dpi} dpi with JPG quality ${Math.round(q * 100)}%.`; break; }
      }
      bytes = best;
      if (bytes.length > preset.target) note = `Even the lowest setting could not get under ${formatBytes(preset.target)} (${formatBytes(bytes.length)}). Try splitting the PDF into parts and compressing each part separately.`;
    } else {
      const dpi = presetKey === 'custom' ? Number($('opt-dpi').value) : preset.dpi;
      const q = presetKey === 'custom' ? Number($('opt-quality').value) : preset.quality;
      bytes = await buildImagePdf(dpi, q, '');
    }
    resultBlob = new Blob([bytes], { type: 'application/pdf' });
    resultName = `${baseName(file.name)}-compressed.pdf`;
    const before = file.size, after = resultBlob.size;
    const saved = Math.round((1 - after / before) * 100);
    $('size-before').textContent = formatBytes(before);
    $('size-after').textContent = formatBytes(after);
    $('size-saved').textContent = saved > 0 ? `${saved}% smaller` : 'not smaller';
    $('result-info').textContent = `${pdf.numPages} ${pdf.numPages === 1 ? 'page' : 'pages'} · ${resultName}`;
    if (after >= before) note = (note ? note + ' ' : '') + (mode === 'lossless'
      ? 'This document already looks well compressed, so lossless mode cannot save more. Try the "Compress images" method.'
      : 'This document is mostly text, so turning it into images made it bigger. Your original is the better file; you can still download the image version if you need it.');
    $('result-note').textContent = note;
    $('result-note').hidden = !note;
    $('result').classList.add('is-active');
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), friendlyError(err));
  } finally {
    btn.disabled = false;
  }
});

$('download').addEventListener('click', () => { if (resultBlob) downloadBlob(resultBlob, resultName); });
