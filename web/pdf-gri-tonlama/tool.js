// PDF Gri Tonlama / Siyah-Beyaz — pdf.js her sayfayı kanvasa çizer, pikseller gri ya da eşikli
// siyah-beyaza çevrilir, JPEG olarak pdf-lib ile yeni PDF'e gömülür. Sonuçta metin seçilemez olur.
// Hiçbir veri ağa gitmez; kütüphaneler aynı origin'deki vendor/ klasöründen yüklenir.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, friendlyError, baseName, getPdfLib, getPdfJs, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;
const MAX_PIXELS = 36_000_000; // tek sayfa için kanvas üst sınırı (bellek koruması)

let file = null;
let srcBytes = null;
let numPages = 0;
let resultBlob = null;
let resultName = 'gri.pdf';

createDropzone({ el: $('drop'), accept: 'application/pdf,.pdf', multiple: false, onFiles: ([f]) => openFile(f) });

async function openFile(f) {
  reset();
  if (!(f.type === 'application/pdf' || /\.pdf$/i.test(f.name))) {
    showError($('error'), `"${f.name}" bir PDF değil. Resimleri gri yapmak için önce "Resimden PDF'e" aracıyla PDF oluşturun.`);
    return;
  }
  setProgress($('progress'), 5, 'PDF okunuyor…');
  await tick();
  try {
    const pdfjs = await getPdfJs();
    srcBytes = await f.arrayBuffer();
    const doc = await pdfjs.getDocument({ data: srcBytes.slice(0) }).promise;
    numPages = doc.numPages;
    await doc.destroy();
  } catch (err) {
    srcBytes = null;
    setProgress($('progress'), null);
    const s = String(err && (err.name + ' ' + err.message));
    showError($('error'), /PasswordException|password|encrypted/i.test(s)
      ? 'Bu PDF şifreli görünüyor. Önce PDF şifresini kaldırıp (PDF Şifre Kaldır aracı ya da okuyucuda Yazdır → "PDF olarak kaydet") tekrar deneyin.'
      : /Failed to parse|Invalid PDF|No PDF header|Unexpected|corrupt|XRef|Expected|trailer/i.test(s)
        ? 'Dosya bozuk ya da geçerli bir PDF değil. Dosyayı bir PDF okuyucuda açabildiğinizi kontrol edip yeniden seçin.'
        : friendlyError(err));
    return;
  }
  setProgress($('progress'), null);
  file = f;
  $('warn').hidden = f.size < BIG_FILE;
  $('files').innerHTML = '<li><span class="name"></span><span class="meta"></span></li>';
  $('files').querySelector('.name').textContent = f.name;
  $('files').querySelector('.meta').textContent = `${numPages} sayfa · ${formatBytes(f.size)}`;
  $('options').hidden = false;
  $('actions').hidden = false;
}

function reset() {
  file = null; srcBytes = null; numPages = 0; resultBlob = null;
  $('files').innerHTML = '';
  $('options').hidden = true; $('actions').hidden = true; $('warn').hidden = true;
  $('result').classList.remove('is-active');
  setProgress($('progress'), null);
  showError($('error'), null);
}
$('clear').addEventListener('click', reset);

function syncOptions() {
  $('field-threshold').hidden = $('opt-mode').value !== 'bw';
  $('opt-threshold-out').textContent = $('opt-threshold').value;
  $('opt-quality-out').textContent = `%${Math.round(Number($('opt-quality').value) * 100)}`;
}
['opt-mode', 'opt-threshold', 'opt-quality'].forEach((id) => $(id).addEventListener('input', syncOptions));
syncOptions();

/** Kanvas piksellerini yerinde gri tonlamaya ya da eşikli siyah-beyaza çevirir. */
function applyTone(data, mode, threshold) {
  for (let i = 0; i < data.length; i += 4) {
    // Algısal parlaklık (Rec. 601)
    let g = (data[i] * 299 + data[i + 1] * 587 + data[i + 2] * 114) / 1000;
    if (mode === 'bw') g = g < threshold ? 0 : 255;
    data[i] = data[i + 1] = data[i + 2] = g;
    data[i + 3] = 255;
  }
}

$('convert').addEventListener('click', async () => {
  if (!file || !srcBytes) return;
  const btn = $('convert');
  btn.disabled = true;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const mode = $('opt-mode').value;
  const threshold = Number($('opt-threshold').value);
  const dpi = Number($('opt-dpi').value);
  const quality = Number($('opt-quality').value);
  setProgress($('progress'), 2, 'Kütüphaneler yükleniyor…');
  await tick();
  let pdf = null;
  try {
    const [pdfjs, PDFLib] = await Promise.all([getPdfJs(), getPdfLib()]);
    pdf = await pdfjs.getDocument({ data: srcBytes.slice(0) }).promise;
    const out = await PDFLib.PDFDocument.create();
    out.setProducer('Bilişim Ajans Ücretsiz Araçlar');
    out.setCreator('araclar.bilisimajans.com');
    const canvas = document.createElement('canvas');
    for (let n = 1; n <= pdf.numPages; n++) {
      setProgress($('progress'), 5 + ((n - 1) / pdf.numPages) * 90, `Sayfa ${n} / ${pdf.numPages} işleniyor…`);
      await tick();
      const page = await pdf.getPage(n);
      const base = page.getViewport({ scale: 1 }); // punto cinsinden sayfa ölçüsü (dönüklük dahil)
      let scale = dpi / 72;
      if (base.width * scale * base.height * scale > MAX_PIXELS) scale = Math.sqrt(MAX_PIXELS / (base.width * base.height));
      const vp = page.getViewport({ scale });
      canvas.width = Math.max(1, Math.floor(vp.width));
      canvas.height = Math.max(1, Math.floor(vp.height));
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: ctx, viewport: vp }).promise;
      const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
      applyTone(img.data, mode, threshold);
      ctx.putImageData(img, 0, 0);
      const blob = await new Promise((r) => canvas.toBlob(r, 'image/jpeg', quality));
      if (!blob) throw new Error('memory: canvas export failed');
      const jpg = await out.embedJpg(new Uint8Array(await blob.arrayBuffer()));
      const p = out.addPage([base.width, base.height]);
      p.drawImage(jpg, { x: 0, y: 0, width: base.width, height: base.height });
      page.cleanup();
    }
    canvas.width = canvas.height = 0;
    setProgress($('progress'), 97, 'PDF yazılıyor…');
    await tick();
    const bytes = await out.save({ useObjectStreams: false });
    resultBlob = new Blob([bytes], { type: 'application/pdf' });
    resultName = `${baseName(file.name)}-${mode === 'bw' ? 'siyah-beyaz' : 'gri'}.pdf`;
    const diff = resultBlob.size <= file.size ? 'daha küçük' : 'daha büyük';
    $('result-info').textContent = `${pdf.numPages} sayfa · ${formatBytes(file.size)} → ${formatBytes(resultBlob.size)} (${diff}) · ${resultName}. Hatırlatma: sayfalar görüntü olduğundan metin seçilemez.`;
    $('result').classList.add('is-active');
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), /memory|allocation|canvas/i.test(String(err && err.message))
      ? 'Sayfa tarayıcı belleği için fazla büyük. Çözünürlüğü 100 dpi\'a düşürün ya da PDF\'i PDF Böl aracıyla parçalayıp tekrar deneyin.'
      : friendlyError(err));
  } finally {
    if (pdf) pdf.destroy();
    btn.disabled = false;
  }
});

$('download').addEventListener('click', () => { if (resultBlob) downloadBlob(resultBlob, resultName); });
