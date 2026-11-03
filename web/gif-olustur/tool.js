// GIF Oluşturucu — videodan (ekran kaydı dahil) ve resimlerden GIF. Tüm iş tarayıcıda;
// kareler <video>/<canvas> ile yakalanır, kodlama Web Worker'da (yoksa ana iş parçacığında parçalı) yapılır.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, makeSortable, moveItem, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;   // 50 MB üstü video için uyarı
const MAX_SEC = 15;                  // önerilen en uzun GIF süresi
const BIG_GIF = 3 * 1024 * 1024;     // 3 MB üstü GIF için küçültme ipucu

/* ===================== Sekmeler ===================== */
const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
function activateTab(tab) {
  for (const t of tabs) {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    $(t.getAttribute('aria-controls')).hidden = !on;
  }
  resetOutput();
  if (location.hash !== `#${tab.dataset.tab}`) history.replaceState(null, '', `#${tab.dataset.tab}`);
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => activateTab(t));
  t.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      next.focus(); activateTab(next);
    }
  });
});

/* ===================== Ortak: kodlayıcı ===================== */
/**
 * Worker tabanlı kodlayıcı; module worker desteklenmiyorsa ana iş parçacığında çalışır.
 * Dönen nesne: addFrame(imageData, delayMs), finish() → {bytes, frames}, abort()
 */
async function startEncoder(opts) {
  try {
    const w = new Worker(new URL('./gif-worker.js', import.meta.url), { type: 'module' });
    const once = (expect) => new Promise((res, rej) => {
      w.onmessage = (e) => (e.data.type === expect ? res(e.data) : rej(new Error(e.data.message || 'worker')));
      w.onerror = (e) => rej(new Error(e.message || 'worker'));
    });
    const ready = once('ready');
    w.postMessage({ type: 'start', ...opts });
    await Promise.race([ready, new Promise((_, rej) => setTimeout(() => rej(new Error('worker-timeout')), 6000))]);
    return {
      addFrame(imageData, delay) {
        const p = once('frame-done');
        const buffer = imageData.data.buffer;
        w.postMessage({ type: 'frame', buffer, delay }, [buffer]);
        return p;
      },
      async finish() {
        const p = once('done');
        w.postMessage({ type: 'finish' });
        const r = await p;
        w.terminate();
        return r;
      },
      abort() { w.terminate(); },
    };
  } catch {
    // Yedek yol: aynı çekirdek ana iş parçacığında, her kare arasında nefes alarak
    const { createGifEncoder } = await import('./gif-core.js');
    const enc = createGifEncoder(opts);
    return {
      async addFrame(imageData, delay) { enc.addFrame(imageData.data, delay); await tick(); },
      async finish() { return enc.finish(); },
      abort() {},
    };
  }
}

/* ===================== Ortak: sonuç ===================== */
let resultUrl = null;
let resultBlob = null;
let resultName = 'animasyon.gif';
let busy = false;

function resetOutput() {
  showError($('error'), '');
  setProgress($('progress'), null);
  $('result').classList.remove('is-active');
  $('size-hint').hidden = true;
  if (resultUrl) { URL.revokeObjectURL(resultUrl); resultUrl = null; }
  resultBlob = null;
}

function showResult({ bytes, frames, width, height, seconds, name }) {
  resultBlob = new Blob([bytes], { type: 'image/gif' });
  resultName = name;
  resultUrl = URL.createObjectURL(resultBlob);
  const img = $('gif-preview');
  img.src = resultUrl;
  img.width = width; img.height = height;
  $('result-info').textContent = `${formatBytes(resultBlob.size)} · ${width}×${height} px · ${frames} kare · ${seconds.toFixed(1)} sn`;
  $('size-hint').hidden = resultBlob.size < BIG_GIF;
  $('result').classList.add('is-active');
  $('result').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}
$('download').addEventListener('click', () => { if (resultBlob) downloadBlob(resultBlob, resultName); });

function setBusy(on) {
  busy = on;
  for (const b of document.querySelectorAll('#make-video, #make-img')) b.disabled = on;
}

/** Hata nesnesini bu araca özgü Türkçe mesaja çevirir. */
function gifError(err) {
  const m = String(err && err.message || err || '');
  if (/decode|codec|açılamadı|MEDIA_ERR|DEMUXER|not supported/i.test(m)) return 'Video açılamadı. Tarayıcınız bu video kodeğini desteklemiyor olabilir (örn. HEVC/H.265, MKV, AV1). Videoyu MP4 (H.264) ya da WebM biçimine dönüştürüp tekrar deneyin.';
  if (/seek|timeout/i.test(m)) return 'Videoda kare konumlandırma yanıt vermedi. Dosya kısmen bozuk olabilir; daha kısa bir aralık seçin ya da videoyu MP4 (H.264) olarak yeniden kaydedip deneyin.';
  if (/memory|allocation|RangeError/i.test(m)) return 'Tarayıcı belleği yetmedi. Genişliği düşürün (ör. 320 px), kare hızını azaltın ya da daha kısa bir aralık seçin.';
  if (/worker/i.test(m)) return 'Arka plan işlemi başlatılamadı. Sayfayı yenileyip tekrar deneyin; sorun sürerse güncel bir Chrome, Edge ya da Firefox kullanın.';
  return 'GIF oluşturulurken beklenmeyen bir hata oluştu. Sayfayı yenileyip tekrar deneyin; sorun sürerse daha küçük bir genişlik seçin.';
}

/* ===================== Video modu ===================== */
const video = $('video');
let videoFile = null;
let videoUrl = null;

createDropzone({
  el: $('drop-video'),
  accept: 'video/*,.mp4,.webm,.mov,.m4v,.ogv,.mkv',
  multiple: false,
  onFiles: ([file]) => loadVideo(file),
});

const fmtSec = (s) => `${s.toFixed(1)} sn`;

function updateVideoSummary() {
  const start = Number($('v-start').value);
  const end = Number($('v-end').value);
  const fps = Number($('v-fps').value);
  const len = Math.max(0, end - start);
  $('v-start-val').textContent = fmtSec(start);
  $('v-end-val').textContent = fmtSec(end);
  $('v-width-val').textContent = `${$('v-width').value} px`;
  const frames = Math.max(1, Math.ceil(len * fps));
  $('v-summary').textContent = `Seçili aralık: ${fmtSec(len)} · ${fps} fps · yaklaşık ${frames} kare`;
  $('warn-length').hidden = len <= MAX_SEC;
  $('make-video').disabled = busy || len <= 0;
}

async function loadVideo(file) {
  resetOutput();
  const isVideo = /^video\//.test(file.type) || /\.(mp4|webm|mov|m4v|ogv|mkv)$/i.test(file.name);
  if (!isVideo) {
    clearVideo();
    showError($('error'), `"${file.name}" bir video dosyası değil. MP4 ya da WebM (ekran kaydı dosyaları da WebM'dir) seçin; fotoğraflardan GIF yapmak için "Resimlerden" sekmesini kullanın.`);
    return;
  }
  clearVideo();
  videoFile = file;
  videoUrl = URL.createObjectURL(file);
  $('warn-size').hidden = file.size < BIG_FILE;
  $('video-name').textContent = `${file.name} · ${formatBytes(file.size)}`;
  setProgress($('progress'), 5, 'Video açılıyor…');
  try {
    await new Promise((res, rej) => {
      video.onloadedmetadata = () => res();
      video.onerror = () => rej(new Error('Video açılamadı'));
      video.src = videoUrl;
    });
    // MediaRecorder ile üretilen WebM'lerde süre "Infinity" gelir; sona sararak öğrenilir.
    if (!Number.isFinite(video.duration)) {
      await new Promise((res) => {
        const t = setTimeout(res, 5000);
        video.ondurationchange = () => { if (Number.isFinite(video.duration)) { clearTimeout(t); res(); } };
        video.currentTime = 1e101;
      });
      video.ondurationchange = null;
      video.currentTime = 0;
    }
    if (!video.videoWidth) throw new Error('Video açılamadı');
    const dur = Number.isFinite(video.duration) ? video.duration : MAX_SEC;
    const s = $('v-start'), e = $('v-end');
    s.max = e.max = dur.toFixed(1);
    s.value = '0';
    e.value = Math.min(dur, MAX_SEC).toFixed(1);
    // Genişlik üst sınırı videonun kendi genişliği (büyütme GIF'i şişirir, kalite katmaz)
    const w = $('v-width');
    w.max = String(Math.max(240, Math.min(800, video.videoWidth)));
    if (Number(w.value) > Number(w.max)) w.value = w.max;
    $('video-wrap').hidden = false;
    $('options-video').hidden = false;
    $('actions-video').hidden = false;
    setProgress($('progress'), null);
    updateVideoSummary();
  } catch (err) {
    setProgress($('progress'), null);
    showError($('error'), gifError(err));
    clearVideo();
  }
}

function clearVideo() {
  video.pause();
  video.removeAttribute('src');
  video.load();
  if (videoUrl) { URL.revokeObjectURL(videoUrl); videoUrl = null; }
  videoFile = null;
  $('video-wrap').hidden = true;
  $('options-video').hidden = true;
  $('actions-video').hidden = true;
  $('warn-size').hidden = true;
  $('warn-length').hidden = true;
}

['v-start', 'v-end'].forEach((id) => $(id).addEventListener('input', () => {
  const s = $('v-start'), e = $('v-end');
  if (id === 'v-start' && Number(s.value) >= Number(e.value)) e.value = Math.min(Number(s.max), Number(s.value) + 0.5).toFixed(1);
  if (id === 'v-end' && Number(e.value) <= Number(s.value)) s.value = Math.max(0, Number(e.value) - 0.5).toFixed(1);
  // Kaydırıcı önizlemesi: videoyu o ana götür
  try { video.currentTime = Number($(id).value); } catch { /* yoksay */ }
  updateVideoSummary();
}));
['v-fps', 'v-width'].forEach((id) => $(id).addEventListener('input', updateVideoSummary));
$('clear-video').addEventListener('click', () => { clearVideo(); resetOutput(); });

/** Videoyu belirli saniyeye götürüp "seeked" bekler. */
function seekTo(t) {
  return new Promise((res, rej) => {
    const timer = setTimeout(() => rej(new Error('seek-timeout')), 10_000);
    video.onseeked = () => { clearTimeout(timer); video.onseeked = null; res(); };
    video.currentTime = t;
  });
}

$('make-video').addEventListener('click', async () => {
  if (!videoFile || busy) return;
  resetOutput();
  setBusy(true);
  video.pause();
  const start = Number($('v-start').value);
  const end = Number($('v-end').value);
  const fps = Number($('v-fps').value);
  const maxColors = Number($('v-colors').value);
  const dither = $('v-dither').checked;
  const width = Math.min(Number($('v-width').value), video.videoWidth);
  const height = Math.max(2, Math.round(width * video.videoHeight / video.videoWidth / 2) * 2);
  const total = Math.max(1, Math.ceil((end - start) * fps));
  const delay = Math.round(1000 / fps);
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  let enc = null;
  try {
    setProgress($('progress'), 1, 'Kodlayıcı hazırlanıyor…');
    enc = await startEncoder({ width, height, repeat: 0, maxColors, dither });
    for (let i = 0; i < total; i++) {
      const t = Math.min(start + i / fps, Math.max(start, end - 0.001));
      await seekTo(t);
      ctx.drawImage(video, 0, 0, width, height);
      await enc.addFrame(ctx.getImageData(0, 0, width, height), delay);
      setProgress($('progress'), ((i + 1) / total) * 95, `Kare ${i + 1}/${total} işleniyor…`);
    }
    setProgress($('progress'), 97, 'GIF yazılıyor…');
    const { bytes, frames } = await enc.finish();
    setProgress($('progress'), null);
    showResult({ bytes, frames, width, height, seconds: frames * delay / 1000, name: `${baseName(videoFile.name)}.gif` });
  } catch (err) {
    enc && enc.abort();
    setProgress($('progress'), null);
    showError($('error'), gifError(err));
  } finally {
    setBusy(false);
    updateVideoSummary();
  }
});

/* ===================== Resim modu ===================== */
const list = $('files-img');
let items = []; // { file, url }
makeSortable(list, syncOrder);

createDropzone({
  el: $('drop-img'),
  accept: 'image/*',
  multiple: true,
  onFiles: addImages,
});

function addImages(files) {
  showError($('error'), '');
  const ok = files.filter((f) => /^image\/(jpeg|png|webp|gif|bmp|avif)$/.test(f.type) || /\.(jpe?g|png|webp|gif|bmp|avif)$/i.test(f.name));
  if (ok.length !== files.length) {
    showError($('error'), ok.length
      ? 'Yalnızca resim dosyaları (JPG, PNG, WebP) eklenebilir; diğerleri atlandı.'
      : 'Seçtiğiniz dosya bir resim değil. JPG, PNG ya da WebP seçin; videodan GIF yapmak için "Videodan" sekmesini kullanın.');
  }
  for (const file of ok) {
    const url = URL.createObjectURL(file);
    items.push({ file, url });
    const li = document.createElement('li');
    li.dataset.url = url;
    li.innerHTML = `<span class="ba-handle" aria-hidden="true">⠿</span><img class="thumb" alt="" src="${url}"><span class="name"></span><span class="meta"></span>
      <button class="ba-icon-btn" type="button" data-act="up" aria-label="Yukarı taşı">↑</button>
      <button class="ba-icon-btn" type="button" data-act="down" aria-label="Aşağı taşı">↓</button>
      <button class="ba-icon-btn" type="button" data-act="remove" aria-label="Kaldır">✕</button>`;
    li.querySelector('.name').textContent = file.name;
    li.querySelector('.meta').textContent = formatBytes(file.size);
    list.appendChild(li);
  }
  refreshImages();
}

list.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-act]');
  if (!btn) return;
  const li = btn.closest('li');
  if (btn.dataset.act === 'remove') { URL.revokeObjectURL(li.dataset.url); li.remove(); }
  else moveItem(li, btn.dataset.act === 'up' ? -1 : 1);
  syncOrder();
});

function syncOrder() {
  const order = Array.from(list.children).map((li) => li.dataset.url);
  items = order.map((u) => items.find((it) => it.url === u)).filter(Boolean);
  refreshImages();
}

function refreshImages() {
  const n = items.length;
  $('options-img').hidden = n === 0;
  $('actions-img').hidden = n === 0;
  $('i-width-val').textContent = `${$('i-width').value} px`;
  const delay = Math.max(20, Number($('i-delay').value) || 500);
  $('i-summary').textContent = n ? `${n} kare · her kare ${delay} ms · toplam ${(n * delay / 1000).toFixed(1)} sn` : '';
  $('make-img').disabled = busy || n < 1;
}
['i-width', 'i-delay'].forEach((id) => $(id).addEventListener('input', refreshImages));
$('clear-img').addEventListener('click', () => {
  for (const it of items) URL.revokeObjectURL(it.url);
  items = []; list.innerHTML = '';
  refreshImages(); resetOutput();
});

/** Dosyayı ImageBitmap/Image olarak çözer. */
async function decodeImage(file) {
  if ('createImageBitmap' in window) {
    try { return await createImageBitmap(file); } catch { /* aşağıdaki yola düş */ }
  }
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = () => rej(new Error('decode'));
    img.src = URL.createObjectURL(file);
  });
}

$('make-img').addEventListener('click', async () => {
  if (!items.length || busy) return;
  resetOutput();
  setBusy(true);
  const delay = Math.max(20, Number($('i-delay').value) || 500);
  const repeat = Number($('i-loop').value); // 0 sonsuz, -1 bir kez, n adet
  const maxColors = Number($('i-colors').value);
  const dither = $('i-dither').checked;
  let enc = null;
  try {
    setProgress($('progress'), 1, 'Resimler okunuyor…');
    const first = await decodeImage(items[0].file);
    const fw = first.width || first.naturalWidth, fh = first.height || first.naturalHeight;
    const width = Math.min(Number($('i-width').value), fw);
    const height = Math.max(2, Math.round(width * fh / fw / 2) * 2);
    const canvas = document.createElement('canvas');
    canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    enc = await startEncoder({ width, height, repeat, maxColors, dither });
    for (let i = 0; i < items.length; i++) {
      let img;
      try { img = i === 0 ? first : await decodeImage(items[i].file); }
      catch { throw new Error(`"${items[i].file.name}" çözülemedi (decode)`); }
      const iw = img.width || img.naturalWidth, ih = img.height || img.naturalHeight;
      // Farklı boyutlu resimler beyaz zemine "sığdır" ile ortalanır
      const k = Math.min(width / iw, height / ih);
      const dw = Math.round(iw * k), dh = Math.round(ih * k);
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, Math.round((width - dw) / 2), Math.round((height - dh) / 2), dw, dh);
      if (img.close) img.close();
      await enc.addFrame(ctx.getImageData(0, 0, width, height), delay);
      setProgress($('progress'), ((i + 1) / items.length) * 95, `Kare ${i + 1}/${items.length} işleniyor…`);
    }
    setProgress($('progress'), 97, 'GIF yazılıyor…');
    const { bytes, frames } = await enc.finish();
    setProgress($('progress'), null);
    const name = items.length === 1 ? `${baseName(items[0].file.name)}.gif` : 'animasyon.gif';
    showResult({ bytes, frames, width, height, seconds: frames * delay / 1000, name });
  } catch (err) {
    enc && enc.abort();
    setProgress($('progress'), null);
    const m = String(err && err.message || '');
    showError($('error'), /decode/.test(m)
      ? `${m.replace(' (decode)', '')}: dosya bozuk ya da tarayıcı bu resim biçimini açamıyor. Resmi PNG ya da JPG olarak kaydedip yeniden ekleyin.`
      : gifError(err));
  } finally {
    setBusy(false);
    refreshImages();
  }
});

// Sayfa #resim ile açıldıysa ikinci sekmeyle başla (tüm tanımlar hazır olduktan sonra)
if (location.hash === '#resim') activateTab(tabs[1]);
