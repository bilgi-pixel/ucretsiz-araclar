// Resimden Yazıya (OCR, beta): tesseract.js + tessdata_fast (tur/eng) tamamen vendor/ altından
// yüklenir; PDF sayfaları pdf.js ile çizilip tanınır. Hiçbir dosya ya da dil verisi dış sunucuya gitmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, friendlyError, baseName, getPdfJs, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const BIG_FILE = 50 * 1024 * 1024;
const MAX_SIDE = 3500;        // tanıma için en uzun kenar (px); daha büyükler küçültülür
const MIN_SIDE = 1200;        // küçük görseller bu genişliğe kadar büyütülür (OCR doğruluğu artar)
const PDF_SCALE = 3;          // 72 dpi × 3 ≈ 216 dpi; tarama PDF'leri için yeterli

const VENDOR = new URL('../vendor/', import.meta.url).href;
const PATHS = {
  lib: `${VENDOR}tesseract.js@7.0.0/tesseract.esm.min.js`,
  worker: `${VENDOR}tesseract.js@7.0.0/worker.min.js`,
  coreDir: `${VENDOR}tesseract.js-core@7.0.0/`,
  lang: `${VENDOR}tessdata_fast@4.1.0/`,
};

let file = null;          // seçilen dosya
let pdf = null;           // pdf.js belgesi (PDF seçildiyse)
let imageBitmap = null;   // çözülmüş resim (resim seçildiyse)
let worker = null;        // tesseract worker
let workerLangs = '';     // worker'ın yüklü dil anahtarı ("tur", "eng", "tur+eng")
let resultText = '';
let resultBase = 'metin';

createDropzone({
  el: $('drop'),
  accept: 'image/jpeg,image/png,image/webp,application/pdf,.jpg,.jpeg,.png,.webp,.pdf',
  multiple: false,
  onFiles: ([f]) => openFile(f),
});

/* ---------- Dosya açma ---------- */
async function openFile(f) {
  reset();
  const isPdf = f.type === 'application/pdf' || /\.pdf$/i.test(f.name);
  const isImage = /^image\/(jpeg|png|webp)$/.test(f.type) || /\.(jpe?g|png|webp)$/i.test(f.name);
  if (!isPdf && !isImage) {
    showError($('error'), 'Bu dosya biçimi desteklenmiyor. JPG, PNG, WebP resim ya da PDF seçin; HEIC fotoğrafları telefonunuzdan JPG olarak dışa aktarın.');
    return;
  }
  $('warn-size').hidden = f.size < BIG_FILE;
  let meta = '';
  try {
    if (isPdf) {
      const pdfjs = await getPdfJs();
      pdf = await pdfjs.getDocument({ data: await f.arrayBuffer() }).promise;
      meta = `${pdf.numPages} sayfa · ${formatBytes(f.size)}`;
      $('opt-pages').max = String(Math.min(pdf.numPages, 50));
      $('opt-pages').value = String(Math.min(pdf.numPages, 5));
      $('field-pages').hidden = false;
      $('pages-total').textContent = String(pdf.numPages);
    } else {
      imageBitmap = await createImageBitmap(f);
      meta = `${imageBitmap.width}×${imageBitmap.height} px · ${formatBytes(f.size)}`;
      $('field-pages').hidden = true;
    }
  } catch (err) {
    pdf = null; imageBitmap = null;
    if (isPdf) {
      showError($('error'), /PasswordException|password/i.test(String(err && (err.name + err.message)))
        ? 'Bu PDF şifreli görünüyor. Önce PDF şifresini kaldırıp (ör. Adobe Reader → Yazdır → PDF olarak kaydet) tekrar deneyin.'
        : friendlyError(err));
    } else {
      showError($('error'), 'Resim açılamadı; dosya bozuk ya da desteklenmeyen bir biçimde olabilir. Resmi bir görüntüleyicide açıp JPG veya PNG olarak yeniden kaydedin.');
    }
    return;
  }
  file = f;
  $('files').innerHTML = '<li><span class="name"></span><span class="meta"></span></li>';
  $('files').querySelector('.name').textContent = f.name;
  $('files').querySelector('.meta').textContent = meta;
  $('options').hidden = false;
  $('actions').hidden = false;
}

function reset() {
  file = null; pdf = null; resultText = '';
  if (imageBitmap) { try { imageBitmap.close(); } catch { /* yok say */ } }
  imageBitmap = null;
  $('files').innerHTML = '';
  $('options').hidden = true; $('actions').hidden = true; $('warn-size').hidden = true;
  $('result').classList.remove('is-active');
  $('out').value = '';
  setProgress($('progress'), null);
  showError($('error'), null);
}
$('clear').addEventListener('click', reset);

/* ---------- Kütüphaneler ---------- */
let tessPromise = null;
function getTesseract() {
  // ESM derlemesi tek varsayılan dışa aktarım verir: { createWorker, ... }
  if (!tessPromise) tessPromise = import(PATHS.lib).then((m) => m.default || m);
  return tessPromise;
}
let docxPromise = null;
function getDocx() {
  if (!docxPromise) docxPromise = import(new URL('../vendor/docx@9.15.1/docx.mjs', import.meta.url).href);
  return docxPromise;
}

/** WebAssembly SIMD desteği var mı? (wasm-feature-detect ile aynı mini modül) */
function hasWasmSimd() {
  try {
    return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11]));
  } catch { return false; }
}

/** Seçilen dil(ler) için worker'ı hazırlar; dil değiştiyse yeniden başlatır. */
async function getWorker(langs, onProgress) {
  const { createWorker } = await getTesseract();
  if (worker && workerLangs === langs) return worker;
  if (worker) { await worker.terminate(); worker = null; }
  const corePath = `${PATHS.coreDir}${hasWasmSimd() ? 'tesseract-core-simd-lstm.wasm.js' : 'tesseract-core-lstm.wasm.js'}`;
  worker = await createWorker(langs, 1, {
    workerPath: PATHS.worker,
    corePath,
    langPath: PATHS.lang,
    workerBlobURL: false,   // worker doğrudan kendi origin'imizden; blob dolaylaması yok
    gzip: true,
    logger: onProgress,
    errorHandler: (e) => console.error(e),
  });
  workerLangs = langs;
  return worker;
}

/* ---------- Görüntü hazırlama ---------- */
/** Bitmap'i uygun ölçekte tuvale çizer (çok büyükse küçültür, küçükse büyütür). */
function bitmapToCanvas(bmp) {
  const longest = Math.max(bmp.width, bmp.height);
  let scale = 1;
  if (longest > MAX_SIDE) scale = MAX_SIDE / longest;
  else if (bmp.width < MIN_SIDE) scale = Math.min(2, MIN_SIDE / bmp.width);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height); // şeffaf PNG'ler siyah zemine düşmesin
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  return canvas;
}

async function renderPdfPage(n) {
  const page = await pdf.getPage(n);
  const base = page.getViewport({ scale: 1 });
  const scale = Math.min(PDF_SCALE, MAX_SIDE / Math.max(base.width, base.height));
  const vp = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(vp.width); canvas.height = Math.ceil(vp.height);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: ctx, viewport: vp }).promise;
  page.cleanup();
  return canvas;
}

/* ---------- Türkçe son işlem (isteğe bağlı) ---------- */
const TR_LOWER = 'a-zçğıöşü';
export function fixTurkish(text) {
  return text
    .replace(/ﬁ/g, 'fi').replace(/ﬂ/g, 'fl')
    .replace(/Ġ/g, 'İ').replace(/ġ/g, 'ğ') // eski tessdata kalıntıları
    // Küçük harfli kelimenin içinde büyük I → ı  (kIsa → kısa)
    .replace(new RegExp(`(?<=[${TR_LOWER}])I(?=[${TR_LOWER}])`, 'g'), 'ı')
    .replace(new RegExp(`(?<=[${TR_LOWER}]{2})I\\b`, 'g'), 'ı')
    // Rakamların arasında l/I → 1, O → 0  (2O26 → 2026, 1l0 → 110)
    .replace(/(?<=\d)[lI](?=\d)/g, '1').replace(/(?<=\d)O(?=\d)/g, '0')
    .replace(/\b[lI](?=\d{2,})/g, '1')
    // Satır sonu tire bölmesi: "kelime-\nler" → "kelimeler"
    .replace(new RegExp(`([${TR_LOWER}])-\\n([${TR_LOWER}])`, 'g'), '$1$2')
    // Noktalama önündeki fazla boşluk ve çoklu boşluklar
    .replace(/ +([,.;:!?])/g, '$1')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/* ---------- Çalıştır ---------- */
$('run').addEventListener('click', async () => {
  if (!file) return;
  const btn = $('run');
  btn.disabled = true;
  resultText = '';
  $('result').classList.remove('is-active');
  showError($('error'), null);
  const langs = $('opt-lang').value;
  const pageCount = pdf ? Math.max(1, Math.min(pdf.numPages, Number($('opt-pages').value) || 1)) : 1;
  const progress = $('progress');
  let loadPhase = true;
  let currentPage = 1;
  const onLog = (m) => {
    if (!m || typeof m.progress !== 'number') return;
    if (loadPhase) {
      const label = /core/.test(m.status) ? 'OCR motoru yükleniyor (yalnızca bu siteden)…'
        : /traineddata/.test(m.status) ? 'Dil verisi yükleniyor…'
          : /initializing/.test(m.status) ? 'OCR başlatılıyor…' : 'Hazırlanıyor…';
      setProgress(progress, Math.min(20, m.progress * 20), label);
    } else if (m.status === 'recognizing text') {
      const per = 80 / pageCount;
      setProgress(progress, 20 + per * (currentPage - 1) + per * m.progress, pageCount > 1 ? `Sayfa ${currentPage}/${pageCount} okunuyor… %${Math.round(m.progress * 100)}` : `Metin tanınıyor… %${Math.round(m.progress * 100)}`);
    }
  };
  try {
    setProgress(progress, 0, 'OCR motoru hazırlanıyor…');
    await tick();
    const w = await getWorker(langs, onLog);
    loadPhase = false;
    const parts = [];
    let words = 0;
    for (let n = 1; n <= pageCount; n++) {
      currentPage = n;
      setProgress(progress, 20 + (80 / pageCount) * (n - 1), pdf ? `Sayfa ${n}/${pageCount} çiziliyor…` : 'Görüntü hazırlanıyor…');
      await tick();
      const canvas = pdf ? await renderPdfPage(n) : bitmapToCanvas(imageBitmap);
      const { data } = await w.recognize(canvas);
      let text = (data && data.text || '').replace(/\r/g, '').trim();
      canvas.width = canvas.height = 0; // belleği bırak
      if ($('opt-fix').checked) text = fixTurkish(text);
      words += text ? text.split(/\s+/).filter(Boolean).length : 0;
      parts.push(pageCount > 1 ? `— Sayfa ${n} —\n\n${text}` : text);
    }
    resultText = parts.join('\n\n').trim();
    resultBase = baseName(file.name) || 'metin';
    $('out').value = resultText;
    $('result-info').textContent = words
      ? `${pageCount} ${pdf ? 'sayfa' : 'görsel'} · yaklaşık ${words} kelime · dil: ${$('opt-lang').selectedOptions[0].textContent}. Metni kontrol edip aşağıda düzenleyebilirsiniz.`
      : 'Metin bulunamadı. Görüntü bulanık, çok küçük ya da el yazısı olabilir; daha net bir tarama deneyin.';
    $('result').classList.add('is-active');
    setProgress(progress, null);
    $('out').focus();
  } catch (err) {
    console.error(err);
    setProgress(progress, null);
    showError($('error'), friendlyOcrError(err));
  } finally {
    btn.disabled = false;
  }
});

function friendlyOcrError(err) {
  const m = String(err && err.message || err || '');
  if (/Network error|fetch|Failed to load|importScripts/i.test(m)) return 'OCR motoru ya da dil dosyası yüklenemedi. İlk kullanımda birkaç MB bu siteden indirilir; bağlantınızı kontrol edip sayfayı yenileyin.';
  if (/WebAssembly|wasm/i.test(m)) return 'Tarayıcınız WebAssembly desteklemiyor ya da engelliyor. Güncel Chrome, Edge, Firefox veya Safari ile tekrar deneyin.';
  if (/memory|allocation|out of/i.test(m)) return 'Görüntü tarayıcı belleği için fazla büyük. Daha küçük bir resim seçin ya da PDF için sayfa sayısını azaltın.';
  return friendlyError(err);
}

/* ---------- Çıktılar ---------- */
$('out').addEventListener('input', () => { resultText = $('out').value; });

$('copy').addEventListener('click', async () => {
  const status = $('copy-status');
  try {
    await navigator.clipboard.writeText($('out').value);
    status.textContent = 'Metin panoya kopyalandı.';
  } catch {
    $('out').select();
    status.textContent = 'Otomatik kopyalama engellendi; metin seçildi, Ctrl+C ile kopyalayın.';
  }
  setTimeout(() => { status.textContent = ''; }, 5000);
});

$('download-txt').addEventListener('click', () => {
  const text = $('out').value;
  if (!text) return;
  // UTF-8 BOM: Windows Not Defteri ve Excel Türkçe karakterleri doğru açsın
  downloadBlob(new Blob(['﻿', text.replace(/\n/g, '\r\n')], { type: 'text/plain;charset=utf-8' }), `${resultBase}.txt`);
});

$('download-docx').addEventListener('click', async () => {
  const text = $('out').value;
  if (!text) return;
  try {
    const { Document, Packer, Paragraph, TextRun } = await getDocx();
    const children = text.split(/\n{2,}/).map((block) => {
      const lines = block.split('\n');
      const runs = [];
      lines.forEach((line, i) => runs.push(new TextRun({ text: line, break: i > 0 ? 1 : undefined })));
      return new Paragraph({ spacing: { after: 160 }, children: runs });
    });
    const doc = new Document({
      creator: 'Bilişim Ajans Ücretsiz Araçlar',
      title: resultBase,
      description: 'araclar.bilisimajans.com Resimden Yazıya (OCR) ile üretildi',
      sections: [{ children }],
    });
    let blob = await Packer.toBlob(doc);
    if (blob.type !== DOCX_MIME) blob = new Blob([blob], { type: DOCX_MIME });
    downloadBlob(blob, `${resultBase}.docx`);
  } catch (err) {
    console.error(err);
    showError($('error'), 'Word dosyası oluşturulamadı. ".txt indir" ile metni kaydedip Word\'e yapıştırabilirsiniz.');
  }
});
