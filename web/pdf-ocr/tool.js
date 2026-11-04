// PDF OCR — taranmış PDF'i aranabilir yapar: pdf.js sayfayı çizer, tesseract.js (vendor, tur/eng) kelimeleri
// ve kutularını bulur, pdf-lib orijinal sayfanın ÜZERİNE görünmez metin katmanı (render mode 3) ekler.
// Orijinal sayfa görüntüsü değişmez. Hiçbir dosya ya da dil verisi dış sunucuya gitmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, friendlyError, baseName, getPdfLib, getPdfJs, loadScript, parsePageRanges, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;
const MAX_SIDE = 3500;       // tanıma için en uzun kenar (px)
const PDF_SCALE = 3;         // 72 dpi × 3 ≈ 216 dpi
const MIN_TEXT_CHARS = 20;   // bir sayfada bu kadar karakter metin varsa "zaten metinli" sayılır
const CAP_RATIO = 0.73;      // DejaVu Sans büyük harf yüksekliği / em (yazı boyutu tahmini için)

const VENDOR = new URL('../vendor/', import.meta.url).href;
const PATHS = {
  lib: `${VENDOR}tesseract.js@7.0.0/tesseract.esm.min.js`,
  worker: `${VENDOR}tesseract.js@7.0.0/worker.min.js`,
  coreDir: `${VENDOR}tesseract.js-core@7.0.0/`,
  lang: `${VENDOR}tessdata_fast@4.1.0/`,
  font: `${VENDOR}fonts/dejavu-sans@2.37/DejaVuSans.ttf`,
  fontkit: `${VENDOR}pdf-lib-fontkit@1.1.1/fontkit.umd.min.js`,
};

let file = null;          // seçilen PDF
let pdf = null;           // pdf.js belgesi (sayfa çizimi ve metin kontrolü için)
let pageCount = 0;
let worker = null;        // tesseract worker (aynı dil için yeniden kullanılır)
let workerLangs = '';
let busy = false;
let stopRequested = false;
let outBase = 'belge';
let resultBlob = null;

createDropzone({
  el: $('drop'),
  accept: 'application/pdf,.pdf',
  multiple: false,
  onFiles: ([f]) => openFile(f),
});

/* ---------- Dosya açma ---------- */
async function openFile(f) {
  if (busy) return;
  reset();
  if (!(f.type === 'application/pdf' || /\.pdf$/i.test(f.name))) {
    showError($('error'), 'Bu araç yalnızca PDF alır. Fotoğraf ya da resimdeki yazıyı okumak için Resimden Yazıya aracını kullanın; Word dosyası için önce PDF\'e çevirin.');
    return;
  }
  if (!f.size) {
    showError($('error'), 'Dosya boş görünüyor. İndirmenin tam bittiğinden emin olup yeniden seçin.');
    return;
  }
  $('warn-size').hidden = f.size < BIG_FILE;
  try {
    const bytes = await f.arrayBuffer();
    const pdfjs = await getPdfJs();
    // pdf.js veriyi kendi işçisine devreder; pdf-lib için ayrı bir kopya verilir.
    pdf = await pdfjs.getDocument({ data: new Uint8Array(bytes.slice(0)) }).promise;
    pageCount = pdf.numPages;
    // pdf-lib ile erken doğrulama: şifreli ya da bozuk dosya işlem ortasında değil, burada yakalanır.
    const PDFLib = await getPdfLib();
    await PDFLib.PDFDocument.load(bytes, { updateMetadata: false });
  } catch (err) {
    const m = String(err && (err.name + ' ' + err.message) || err);
    if (pdf) { try { pdf.destroy(); } catch { /* yok say */ } }
    pdf = null; pageCount = 0;
    showError($('error'), /PasswordException|password|encrypted/i.test(m)
      ? 'Bu PDF şifreli görünüyor. Önce PDF Şifre Kaldır aracıyla şifreyi kaldırıp (parolayı biliyorsanız) tekrar deneyin.'
      : 'Dosya bozuk ya da geçerli bir PDF değil. Dosyayı başka bir programda açabildiğinizi kontrol edip "Farklı kaydet" ile PDF olarak yeniden kaydedin, sonra tekrar seçin.');
    return;
  }
  file = f;
  outBase = baseName(f.name) || 'belge';
  $('files').innerHTML = '<li><span class="name"></span><span class="meta"></span></li>';
  $('files').querySelector('.name').textContent = f.name;
  $('files').querySelector('.meta').textContent = `${pageCount} sayfa · ${formatBytes(f.size)}`;
  $('pages-total').textContent = String(pageCount);
  $('options').hidden = false;
  $('actions').hidden = false;
}

function reset() {
  file = null; resultBlob = null;
  if (pdf) { try { pdf.destroy(); } catch { /* yok say */ } }
  pdf = null; pageCount = 0;
  $('files').innerHTML = '';
  $('options').hidden = true; $('actions').hidden = true; $('warn-size').hidden = true;
  $('result').classList.remove('is-active');
  $('out').value = '';
  $('opt-range').value = '';
  setProgress($('progress'), null);
  showError($('error'), null);
}
$('clear').addEventListener('click', () => {
  if (busy) return;
  reset();
  if (worker) { worker.terminate().catch(() => {}); worker = null; workerLangs = ''; } // belleği bırak
});
$('stop').addEventListener('click', () => {
  stopRequested = true;
  $('stop').disabled = true;
  $('stop').textContent = 'Durduruluyor…';
});

/* ---------- Kütüphaneler ---------- */
let tessPromise = null;
function getTesseract() {
  if (!tessPromise) tessPromise = import(PATHS.lib).then((m) => m.default || m);
  return tessPromise;
}

/** WebAssembly SIMD desteği var mı? */
function hasWasmSimd() {
  try {
    return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11]));
  } catch { return false; }
}

async function getWorker(langs, logger) {
  const { createWorker } = await getTesseract();
  if (worker && workerLangs === langs) return worker;
  if (worker) { await worker.terminate(); worker = null; }
  const corePath = `${PATHS.coreDir}${hasWasmSimd() ? 'tesseract-core-simd-lstm.wasm.js' : 'tesseract-core-lstm.wasm.js'}`;
  worker = await createWorker(langs, 1, {
    workerPath: PATHS.worker,
    corePath,
    langPath: PATHS.lang,
    workerBlobURL: false,   // worker doğrudan kendi origin'imizden
    gzip: true,
    logger,
    errorHandler: (e) => console.error(e),
  });
  workerLangs = langs;
  return worker;
}

/* ---------- Sayfa çizimi ve metin kontrolü ---------- */
async function renderPage(page) {
  const base = page.getViewport({ scale: 1 });
  const scale = Math.min(PDF_SCALE, MAX_SIDE / Math.max(base.width, base.height));
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: ctx, viewport }).promise;
  return { canvas, viewport, scale };
}

/** Sayfada zaten seçilebilir metin var mı? (metinli PDF'e ikinci katman eklenmesin) */
async function pageHasText(page) {
  try {
    const content = await page.getTextContent();
    let n = 0;
    for (const it of content.items) n += (it.str || '').replace(/\s+/g, '').length;
    return n >= MIN_TEXT_CHARS;
  } catch { return false; }
}

/* ---------- Görünmez metin katmanı ---------- */
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/** Yazı tipinde olmayan ya da denetim karakterlerini atar; kelimenin boş kalması mümkündür. */
function cleanWord(s, charset) {
  let out = '';
  for (const ch of String(s || '').normalize('NFC')) {
    const cp = ch.codePointAt(0);
    if (cp < 32 || (cp >= 0x7f && cp <= 0x9f) || (cp >= 0x200b && cp <= 0x200f) || cp === 0xfeff || cp === 0xfffd) continue;
    if (cp === 0xa0) { out += ' '; continue; }
    if (charset && !charset.has(cp)) continue;
    out += ch;
  }
  return out.trim();
}

/** Tesseract çıktısındaki satırları düzleştirir. */
function collectLines(data) {
  const lines = [];
  for (const b of (data && data.blocks) || []) {
    for (const p of b.paragraphs || []) for (const l of p.lines || []) lines.push(l);
  }
  return lines;
}

/**
 * Bir sayfaya görünmez metin ekler. Koordinat dönüşümü pdf.js viewport'una bırakılır:
 * sayfa döndürmesi (/Rotate), kırpma kutusu ve ölçek tek çağrıda doğru çözülür.
 * @returns {number} eklenen kelime sayısı
 */
function overlayText({ PDFLib, libPage, font, charset, lines, viewport, scale }) {
  const { pushGraphicsState, popGraphicsState, beginText, endText, setFontAndSize, setTextMatrix, showText, setCharacterSqueeze, setTextRenderingMode, TextRenderingMode } = PDFLib;
  const fontKey = libPage.node.newFontDictionary(font.name, font.ref);
  const ops = [pushGraphicsState(), beginText(), setTextRenderingMode(TextRenderingMode.Invisible)];
  let count = 0;

  for (const line of lines) {
    const words = (line.words || [])
      .map((w) => ({ text: cleanWord(w.text, charset), bbox: w.bbox }))
      .filter((w) => w.text && w.bbox && w.bbox.x1 > w.bbox.x0);
    if (!words.length) continue;

    // Taban çizgisi: tesseract satır tabanını verir; yoksa ya da tutarsızsa kutu altına yaklaşılır.
    const lb = line.bbox || { x0: words[0].bbox.x0, x1: words[words.length - 1].bbox.x1, y0: Math.min(...words.map((w) => w.bbox.y0)), y1: Math.max(...words.map((w) => w.bbox.y1)) };
    const bl = line.baseline;
    const fallbackY = lb.y1 - 0.2 * (lb.y1 - lb.y0);
    const blOk = bl && bl.x1 > bl.x0 && Number.isFinite(bl.y0) && Number.isFinite(bl.y1)
      && bl.y0 >= lb.y0 && bl.y0 <= lb.y1 + 3 && bl.y1 >= lb.y0 && bl.y1 <= lb.y1 + 3;
    const baselineY = (x) => (blOk ? bl.y0 + (bl.y1 - bl.y0) * ((x - bl.x0) / (bl.x1 - bl.x0)) : fallbackY);

    // Yazı boyutu: her kelimenin (taban çizgisi − üst kenar) yüksekliği ≈ büyük harf boyu. Tek bir
    // aksanlı kelime (Ü, İ noktaları) satırı şişirmesin diye yüzde 70'lik dilim alınır.
    const heights = words.map((w) => baselineY((w.bbox.x0 + w.bbox.x1) / 2) - w.bbox.y0).sort((a, b) => a - b);
    const capPx = Math.max(2, heights[Math.floor(0.7 * (heights.length - 1))]);
    const fontPx = clamp(capPx / CAP_RATIO, 4, Math.max(6, (lb.y1 - lb.y0) * 1.4));
    const fontPt = fontPx / scale;
    ops.push(setFontAndSize(fontKey, fontPt));

    for (let k = 0; k < words.length; k++) {
      const w = words[k];
      const x0 = w.bbox.x0;
      let text = w.text;
      let widthPx = w.bbox.x1 - w.bbox.x0;
      const next = words[k + 1];
      if (next && next.bbox.x0 > w.bbox.x1) { text += ' '; widthPx = next.bbox.x0 - x0; } // kopyalarken kelime arası boşluk
      const x1 = x0 + widthPx;
      const [ax, ay] = viewport.convertToPdfPoint(x0, baselineY(x0));
      const [bx, by] = viewport.convertToPdfPoint(x1, baselineY(x1));
      const widthPt = Math.hypot(bx - ax, by - ay);
      const natural = font.widthOfTextAtSize(text, fontPt);
      if (!(widthPt > 0) || !(natural > 0)) continue;
      const angle = Math.atan2(by - ay, bx - ax);
      const cos = Math.cos(angle), sin = Math.sin(angle);
      ops.push(
        setCharacterSqueeze(clamp((widthPt / natural) * 100, 25, 400)),
        setTextMatrix(cos, sin, -sin, cos, ax, ay),
        showText(font.encodeText(text)),
      );
      count++;
    }
  }
  ops.push(endText(), popGraphicsState());
  if (count) libPage.pushOperators(...ops);
  return count;
}

/** Sayfanın mevcut içeriğini q…Q ile sarar; dengesiz (bozuk) içerik katmanımızı kaydırmasın. */
function isolateExistingContent(PDFLib, libPage) {
  libPage.node.normalize();
  const start = libPage.createContentStream(PDFLib.pushGraphicsState());
  const end = libPage.createContentStream(PDFLib.popGraphicsState());
  libPage.node.wrapContentStreams(libPage.doc.context.register(start), libPage.doc.context.register(end));
}

/* ---------- Çalıştır ---------- */
$('run').addEventListener('click', run);

async function run() {
  if (!file || !pdf || busy) return;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  resultBlob = null;

  let pages;
  try {
    const expr = $('opt-range').value.trim();
    pages = expr ? parsePageRanges(expr, pageCount) : Array.from({ length: pageCount }, (_, i) => i + 1);
  } catch (err) {
    showError($('error'), `${err.message} Sayfa aralığını "1-3, 5, 8-10" biçiminde yazın ya da boş bırakıp tüm sayfaları seçin.`);
    $('opt-range').focus();
    return;
  }
  if (!pages.length) {
    showError($('error'), `Yazdığınız aralıkta sayfa yok; bu belgede ${pageCount} sayfa var. Aralığı düzeltin ya da boş bırakın.`);
    $('opt-range').focus();
    return;
  }

  busy = true;
  stopRequested = false;
  $('run').disabled = true; $('clear').disabled = true;
  $('stop').hidden = false; $('stop').disabled = false; $('stop').textContent = 'Durdur ve şimdiye kadarını kaydet';
  const progress = $('progress');
  const langs = $('opt-lang').value;
  const skipExisting = $('opt-skip').checked;

  let loadPhase = true;
  const logger = (m) => {
    if (!loadPhase || !m || typeof m.progress !== 'number') return;
    const label = /core/.test(m.status) ? 'OCR motoru yükleniyor (yalnızca bu siteden)…'
      : /traineddata/.test(m.status) ? 'Dil verisi yükleniyor…'
        : /initializing/.test(m.status) ? 'OCR başlatılıyor…' : 'Hazırlanıyor…';
    setProgress(progress, Math.min(9, m.progress * 9), label);
  };

  try {
    setProgress(progress, 0, 'OCR motoru hazırlanıyor (ilk seferde birkaç MB indirilir, yalnızca bu siteden)…');
    await tick();
    const w = await getWorker(langs, logger);
    loadPhase = false;

    const PDFLib = await getPdfLib();
    await loadScript(PATHS.fontkit);
    const doc = await PDFLib.PDFDocument.load(await file.arrayBuffer(), { updateMetadata: false });
    doc.registerFontkit(window.fontkit);
    const libPages = doc.getPages();

    let font = null;
    let charset = null;
    const ensureFont = async () => {
      if (font) return;
      const res = await fetch(PATHS.font);
      if (!res.ok) throw new Error('FONT');
      font = await doc.embedFont(await res.arrayBuffer(), { subset: true });
      try { charset = new Set(font.getCharacterSet()); } catch { charset = null; }
    };

    const textParts = [];
    const skipped = [];
    let totalWords = 0;
    let done = 0;
    let stopped = false;

    for (let i = 0; i < pages.length; i++) {
      if (stopRequested) { stopped = true; break; }
      const n = pages[i];
      const from = 10 + (88 * i) / pages.length;
      const span = 88 / pages.length;
      const tag = `Sayfa ${n} (${i + 1}/${pages.length})`;
      setProgress(progress, from, `${tag} hazırlanıyor…`);
      await tick();
      const page = await pdf.getPage(n);
      let rendered = null;
      try {
        if (skipExisting && await pageHasText(page)) { skipped.push(n); done++; continue; }
        setProgress(progress, from + span * 0.1, `${tag} çiziliyor ve okunuyor…`);
        rendered = await renderPage(page);
        const { data } = await w.recognize(rendered.canvas, {}, { text: true, blocks: true });
        setProgress(progress, from + span * 0.85, `${tag} metin katmanı ekleniyor…`);
        await tick();
        const lines = collectLines(data);
        await ensureFont();
        const libPage = libPages[n - 1];
        isolateExistingContent(PDFLib, libPage);
        const count = overlayText({ PDFLib, libPage, font, charset, lines, viewport: rendered.viewport, scale: rendered.scale });
        totalWords += count;
        const text = String(data && data.text || '').replace(/\r/g, '').trim();
        if (text) textParts.push(`— Sayfa ${n} —\n\n${text}`);
        done++;
      } finally {
        if (rendered) { rendered.canvas.width = rendered.canvas.height = 0; } // belleği bırak
        page.cleanup();
      }
    }

    if (!totalWords) {
      setProgress(progress, null);
      showError($('error'), stopped && !done
        ? 'İşlem hiçbir sayfa tamamlanmadan durduruldu. Yeniden başlatın.'
        : (skipped.length === done && skipped.length
          ? 'Seçtiğiniz sayfalarda zaten seçilebilir metin var; üstüne ikinci bir katman eklenmedi. Yine de taramak isterseniz "metni olan sayfaları atla" kutusunun işaretini kaldırın.'
          : 'Hiç metin bulunamadı. Tarama çok bulanık, çok küçük ya da el yazısı olabilir; belgeyi daha yüksek çözünürlükte (en az 200–300 dpi) tarayın, yan yatan sayfaları önce PDF Döndür ile düzeltin ve doğru dili seçtiğinizden emin olun.'));
      return;
    }

    setProgress(progress, 98, 'PDF kaydediliyor…');
    await tick();
    const out = await doc.save();
    resultBlob = new Blob([out], { type: 'application/pdf' });
    $('out').value = textParts.join('\n\n');

    const bits = [`${done - skipped.length} sayfa okundu`, `yaklaşık ${totalWords} kelime bulundu`];
    if (skipped.length) bits.push(`${skipped.length} sayfa zaten metinli olduğu için atlandı`);
    if (stopped) bits.push(`işlem durduruldu; kalan ${pages.length - done} sayfa değiştirilmedi`);
    $('result-info').textContent = `${bits.join(' · ')}. Dosya boyutu ${formatBytes(file.size)} → ${formatBytes(resultBlob.size)}. Metin kalitesi tarama kalitesine bağlıdır; önemli belgelerde sonucu gözden geçirin.`;
    $('result').classList.add('is-active');
    setProgress(progress, null);
  } catch (err) {
    console.error(err);
    setProgress(progress, null);
    showError($('error'), friendlyOcrError(err));
  } finally {
    busy = false;
    $('run').disabled = false; $('clear').disabled = false;
    $('stop').hidden = true;
  }
}

function friendlyOcrError(err) {
  const m = String(err && err.message || err || '');
  if (m === 'FONT') return 'Metin katmanı için gereken yazı tipi yüklenemedi. Sayfayı yenileyip tekrar deneyin.';
  if (/Network error|fetch|Failed to load|importScripts/i.test(m)) return 'OCR motoru ya da dil dosyası yüklenemedi. İlk kullanımda birkaç MB bu siteden indirilir; bağlantınızı kontrol edip sayfayı yenileyin.';
  if (/WebAssembly|wasm/i.test(m)) return 'Tarayıcınız WebAssembly desteklemiyor ya da engelliyor. Güncel Chrome, Edge, Firefox veya Safari ile tekrar deneyin.';
  if (/memory|allocation|out of/i.test(m)) return 'Tarayıcı belleği yetmedi. Sayfa aralığını daraltıp (ör. 1-10) parça parça işleyin ya da PDF Böl ile dosyayı küçültün.';
  return friendlyError(err);
}

/* ---------- Çıktılar ---------- */
$('download-pdf').addEventListener('click', () => {
  if (resultBlob) downloadBlob(resultBlob, `${outBase}-aranabilir.pdf`);
});

$('download-txt').addEventListener('click', () => {
  const text = $('out').value;
  if (!text) { showError($('error'), 'İndirilecek metin yok.'); return; }
  // UTF-8 BOM: Windows Not Defteri Türkçe karakterleri doğru açsın
  downloadBlob(new Blob(['﻿', text.replace(/\n/g, '\r\n')], { type: 'text/plain;charset=utf-8' }), `${outBase}-metin.txt`);
});
