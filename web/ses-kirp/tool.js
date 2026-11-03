// Ses Kesme ve Birleştirme — Web Audio decodeAudioData + saf JS WAV yazıcı + MediaRecorder (WebM/Opus).
// Tüm işlem tarayıcıda yapılır; ses dosyası hiçbir sunucuya gönderilmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, makeSortable, moveItem, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;
const ACCEPT = 'audio/*,.mp3,.wav,.ogg,.oga,.opus,.m4a,.aac,.flac,.webm';

// ---- Ortak ses bağlamı ---------------------------------------------------------------
let ctx = null;
function getCtx() {
  if (!ctx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) throw new Error('no-audio');
    ctx = new Ctx();
  }
  return ctx;
}

const DECODE_ERROR = 'Bu dosya çözülemedi ya da bir ses dosyası değil. mp3, wav, ogg, m4a veya webm seçin; dosya açılmıyorsa başka bir programla WAV olarak kaydedip tekrar deneyin.';

/** Dosyayı AudioBuffer'a çözer; bozuksa Türkçe hata fırlatır. */
async function decodeFile(file) {
  if (!file.size) throw new Error(`"${file.name}" boş bir dosya. Dosyanın tam indiğinden emin olup yeniden seçin.`);
  let bytes;
  try { bytes = await file.arrayBuffer(); } catch { throw new Error(`"${file.name}" okunamadı. Dosyayı yeniden seçin.`); }
  try {
    return await getCtx().decodeAudioData(bytes);
  } catch {
    throw new Error(`"${file.name}": ${DECODE_ERROR}`);
  }
}

// ---- Yardımcılar: işleme, WAV, WebM ------------------------------------------------
const fmtSec = (s) => {
  const m = Math.floor(s / 60);
  const r = s - m * 60;
  return `${m}:${r.toFixed(2).padStart(5, '0')}`;
};

/** [start,end] aralığını alır; kazanç ve giriş/çıkış yumuşatma uygular. Döndürülen kanallar Float32Array. */
function renderRange(buf, start, end, gain, fadeIn, fadeOut) {
  const sr = buf.sampleRate;
  const s0 = Math.max(0, Math.floor(start * sr));
  const s1 = Math.min(buf.length, Math.ceil(end * sr));
  const len = Math.max(0, s1 - s0);
  const channels = [];
  for (let c = 0; c < buf.numberOfChannels; c++) channels.push(buf.getChannelData(c).slice(s0, s1));
  applyGainFade(channels, sr, gain, fadeIn, fadeOut);
  return { channels, sampleRate: sr, length: len };
}

function applyGainFade(channels, sr, gain, fadeIn, fadeOut) {
  const len = channels[0].length;
  const fi = Math.min(len, Math.round(fadeIn * sr));
  const fo = Math.min(len, Math.round(fadeOut * sr));
  for (const ch of channels) {
    for (let i = 0; i < len; i++) {
      let g = gain;
      if (fi && i < fi) g *= i / fi;
      if (fo && i >= len - fo) g *= (len - 1 - i) / fo;
      ch[i] *= g;
    }
  }
}

/** 16-bit PCM WAV (RIFF) yazar. */
function encodeWav(channels, sampleRate) {
  const nch = channels.length;
  const len = channels[0].length;
  const dataSize = len * nch * 2;
  const ab = new ArrayBuffer(44 + dataSize);
  const v = new DataView(ab);
  const str = (o, t) => { for (let i = 0; i < t.length; i++) v.setUint8(o + i, t.charCodeAt(i)); };
  str(0, 'RIFF'); v.setUint32(4, 36 + dataSize, true); str(8, 'WAVE');
  str(12, 'fmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, nch, true);
  v.setUint32(24, sampleRate, true); v.setUint32(28, sampleRate * nch * 2, true);
  v.setUint16(32, nch * 2, true); v.setUint16(34, 16, true);
  str(36, 'data'); v.setUint32(40, dataSize, true);
  let o = 44;
  for (let i = 0; i < len; i++) {
    for (let c = 0; c < nch; c++) {
      const x = Math.max(-1, Math.min(1, channels[c][i]));
      v.setInt16(o, x < 0 ? Math.round(x * 0x8000) : Math.round(x * 0x7fff), true);
      o += 2;
    }
  }
  return new Blob([ab], { type: 'audio/wav' });
}

const WEBM_MIME = (() => {
  if (typeof window.MediaRecorder !== 'function' || typeof MediaRecorder.isTypeSupported !== 'function') return '';
  return ['audio/webm;codecs=opus', 'audio/webm'].find((m) => MediaRecorder.isTypeSupported(m)) || '';
})();

function makeAudioBuffer(data) {
  const ab = getCtx().createBuffer(data.channels.length, data.channels[0].length, data.sampleRate);
  data.channels.forEach((ch, i) => ab.copyToChannel(ch, i));
  return ab;
}

/** AudioContext hedefinden gerçek zamanlı kayıtla WebM/Opus üretir; süre kadar bekler. */
async function encodeWebm(data, onProgress) {
  const c = getCtx();
  await c.resume();
  const ab = makeAudioBuffer(data);
  const dest = c.createMediaStreamDestination();
  const src = c.createBufferSource();
  src.buffer = ab;
  src.connect(dest); // hoparlöre bağlanmaz: kayıt sessiz yapılır
  const rec = new MediaRecorder(dest.stream, { mimeType: WEBM_MIME });
  const parts = [];
  rec.ondataavailable = (e) => { if (e.data && e.data.size) parts.push(e.data); };
  const done = new Promise((resolve, reject) => {
    rec.onstop = () => resolve(new Blob(parts, { type: 'audio/webm' }));
    rec.onerror = () => reject(new Error('rec'));
  });
  const total = ab.duration;
  rec.start(250);
  const t0 = c.currentTime;
  src.start();
  const timer = setInterval(() => onProgress(Math.min(99, ((c.currentTime - t0) / total) * 100), total), 200);
  await new Promise((r) => { src.onended = r; });
  await new Promise((r) => setTimeout(r, 150));
  clearInterval(timer);
  rec.stop();
  return done;
}

/** Seçilen biçime göre Blob üretir ve ilerleme gösterir. */
async function encodeOutput(data, format) {
  const dur = data.channels[0].length / data.sampleRate;
  if (format === 'webm') {
    setProgress($('progress'), 0, `WebM kaydediliyor (${fmtSec(dur)} sürecek, sekmeyi açık tutun)…`);
    const blob = await encodeWebm(data, (p, total) => setProgress($('progress'), p, `WebM kaydediliyor: %${Math.round(p)} (toplam ${fmtSec(total)})`));
    return { blob, ext: 'webm' };
  }
  setProgress($('progress'), 30, 'WAV yazılıyor…');
  await tick();
  const blob = encodeWav(data.channels, data.sampleRate);
  setProgress($('progress'), 100, 'Hazır');
  return { blob, ext: 'wav' };
}

function showResult(blob, name, dur) {
  $('result-info').textContent = `${name} · ${fmtSec(dur)} · ${formatBytes(blob.size)}`;
  const box = $('downloads');
  box.textContent = '';
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'ba-btn ba-btn-success';
  b.textContent = `İndir (${name})`;
  b.addEventListener('click', () => downloadBlob(blob, name));
  box.appendChild(b);
  $('result').classList.add('is-active');
  downloadBlob(blob, name);
}

function bigWarning(file) {
  if (file.size >= BIG_FILE) {
    $('warning').textContent = `"${file.name}" ${formatBytes(file.size)}; 50 MB üstü seste çözme belleği zorlar, telefonda sekme çökebilir. Mümkünse bilgisayarda deneyin ya da önce dosyayı kısaltın.`;
    $('warning').classList.add('is-active');
  }
}

// ---- Sekmeler ---------------------------------------------------------------------------
function selectTab(name) {
  for (const t of ['cut', 'merge']) {
    const on = t === name;
    $(`tab-${t}`).setAttribute('aria-selected', String(on));
    $(`tab-${t}`).tabIndex = on ? 0 : -1;
    $(`tab-${t}`).classList.toggle('ba-btn-primary', on);
    $(`panel-${t}`).hidden = !on;
  }
  stopPreview();
  showError($('error'), null);
  $('result').classList.remove('is-active');
  setProgress($('progress'), null);
}
$('tab-cut').addEventListener('click', () => selectTab('cut'));
$('tab-merge').addEventListener('click', () => selectTab('merge'));
for (const id of ['tab-cut', 'tab-merge']) {
  $(id).addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const next = id === 'tab-cut' ? 'merge' : 'cut';
      selectTab(next);
      $(`tab-${next}`).focus();
    }
  });
}

// WebM desteği yoksa seçenekleri kapat
if (!WEBM_MIME) {
  for (const sel of [$('cut-format'), $('merge-format')]) {
    const o = [...sel.options].find((x) => x.value === 'webm');
    if (o) { o.disabled = true; o.textContent = 'WebM/Opus (bu tarayıcıda desteklenmiyor)'; }
  }
}

// ================================ KES SEKMESİ ======================================
let cut = null; // { file, buffer, peaks, start, end }
let playing = null; // { src }

createDropzone({ el: $('drop'), accept: ACCEPT, multiple: false, onFiles: async ([file]) => {
  showError($('error'), null);
  $('warning').classList.remove('is-active');
  $('result').classList.remove('is-active');
  stopPreview();
  bigWarning(file);
  try {
    setProgress($('progress'), 40, 'Ses çözülüyor…');
    const buffer = await decodeFile(file);
    cut = { file, buffer, peaks: computePeaks(buffer, 1000), start: 0, end: buffer.duration };
    $('cut-info').textContent = `${file.name} · ${fmtSec(buffer.duration)} · ${buffer.numberOfChannels === 1 ? 'mono' : 'stereo'} · ${buffer.sampleRate} Hz · ${formatBytes(file.size)}`;
    $('cut-editor').hidden = false;
    syncCutUi();
    drawWave();
  } catch (err) {
    cut = null;
    $('cut-editor').hidden = true;
    showError($('error'), err.message === 'no-audio' ? 'Bu tarayıcı Web Audio desteklemiyor. Güncel Chrome, Edge, Firefox veya Safari kullanın.' : err.message);
  } finally {
    setProgress($('progress'), null);
  }
} });

/** Dalga formu için sütun başına min/max değerleri (küçültülmüş örnek). */
function computePeaks(buf, cols) {
  const n = buf.length;
  const peaks = new Float32Array(cols * 2);
  const chs = [];
  for (let c = 0; c < buf.numberOfChannels; c++) chs.push(buf.getChannelData(c));
  const step = n / cols;
  for (let x = 0; x < cols; x++) {
    const a = Math.floor(x * step), b = Math.max(a + 1, Math.floor((x + 1) * step));
    let mn = 1, mx = -1;
    const stride = Math.max(1, Math.floor((b - a) / 64));
    for (let i = a; i < b && i < n; i += stride) {
      let s = 0;
      for (const ch of chs) s += ch[i];
      s /= chs.length;
      if (s < mn) mn = s;
      if (s > mx) mx = s;
    }
    peaks[x * 2] = mn > mx ? 0 : mn;
    peaks[x * 2 + 1] = mn > mx ? 0 : mx;
  }
  return peaks;
}

function drawWave() {
  if (!cut) return;
  const c = $('wave'), g = c.getContext('2d');
  const w = c.width, h = c.height;
  g.clearRect(0, 0, w, h);
  g.fillStyle = '#7b2331';
  const cols = cut.peaks.length / 2;
  for (let x = 0; x < w; x++) {
    const i = Math.min(cols - 1, Math.floor((x / w) * cols));
    const y1 = (1 - cut.peaks[i * 2 + 1]) * 0.5 * h;
    const y2 = (1 - cut.peaks[i * 2]) * 0.5 * h;
    g.fillRect(x, y1, 1, Math.max(1, y2 - y1));
  }
}

/** Tutamaç, seçim bölgesi ve sayısal girişleri durumla eşler. */
function syncCutUi(skipInputs) {
  const d = cut.buffer.duration;
  const ps = (cut.start / d) * 100, pe = (cut.end / d) * 100;
  $('h-start').style.left = `${ps}%`;
  $('h-end').style.left = `${pe}%`;
  $('sel').style.left = `${ps}%`;
  $('sel').style.width = `${pe - ps}%`;
  $('h-start').setAttribute('aria-valuenow', cut.start.toFixed(2));
  $('h-start').setAttribute('aria-valuemax', d.toFixed(2));
  $('h-start').setAttribute('aria-valuetext', `${cut.start.toFixed(2)} saniye`);
  $('h-end').setAttribute('aria-valuenow', cut.end.toFixed(2));
  $('h-end').setAttribute('aria-valuemax', d.toFixed(2));
  $('h-end').setAttribute('aria-valuetext', `${cut.end.toFixed(2)} saniye`);
  if (!skipInputs) {
    $('in-start').value = cut.start.toFixed(2);
    $('in-end').value = cut.end.toFixed(2);
  }
  $('cut-len').textContent = `Seçili süre: ${fmtSec(Math.max(0, cut.end - cut.start))}`;
}

const MIN_GAP = 0.01;
function setStart(t, skipInputs) {
  cut.start = Math.max(0, Math.min(t, cut.end - MIN_GAP));
  syncCutUi(skipInputs);
}
function setEnd(t, skipInputs) {
  cut.end = Math.min(cut.buffer.duration, Math.max(t, cut.start + MIN_GAP));
  syncCutUi(skipInputs);
}

// Sayısal girişler: yazarken geçerliyse uygula, bırakınca düzelt
for (const [id, apply] of [['in-start', setStart], ['in-end', setEnd]]) {
  $(id).addEventListener('input', () => {
    if (!cut) return;
    const v = parseFloat($(id).value.replace(',', '.'));
    if (Number.isFinite(v)) apply(v, true);
  });
  $(id).addEventListener('change', () => {
    if (!cut) return;
    const v = parseFloat($(id).value.replace(',', '.'));
    if (Number.isFinite(v)) apply(v, false); else syncCutUi(false);
    stopPreview();
  });
}

// Tutamaç sürükleme + klavye
for (const [id, apply, isEnd] of [['h-start', setStart, false], ['h-end', setEnd, true]]) {
  const h = $(id);
  h.addEventListener('pointerdown', (e) => { h.setPointerCapture(e.pointerId); h.dataset.drag = '1'; e.preventDefault(); });
  h.addEventListener('pointermove', (e) => {
    if (h.dataset.drag !== '1' || !cut) return;
    const r = $('wavebox').getBoundingClientRect();
    const t = ((e.clientX - r.left) / r.width) * cut.buffer.duration;
    apply(Math.max(0, Math.min(cut.buffer.duration, t)), false);
  });
  const stop = () => { h.dataset.drag = ''; stopPreview(); };
  h.addEventListener('pointerup', stop);
  h.addEventListener('pointercancel', stop);
  h.addEventListener('keydown', (e) => {
    if (!cut) return;
    const step = e.shiftKey ? 1 : 0.1;
    const cur = isEnd ? cut.end : cut.start;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { apply(cur - step, false); e.preventDefault(); }
    else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { apply(cur + step, false); e.preventDefault(); }
    else if (e.key === 'Home') { apply(0, false); e.preventDefault(); }
    else if (e.key === 'End') { apply(cut.buffer.duration, false); e.preventDefault(); }
  });
}

$('cut-gain').addEventListener('input', () => { $('cut-gain-out').textContent = `%${$('cut-gain').value}`; });

function cutOptions() {
  const fadeIn = Math.max(0, parseFloat(String($('cut-fadein').value).replace(',', '.')) || 0);
  const fadeOut = Math.max(0, parseFloat(String($('cut-fadeout').value).replace(',', '.')) || 0);
  return { gain: Number($('cut-gain').value) / 100, fadeIn, fadeOut };
}

function stopPreview() {
  if (playing) {
    try { playing.src.onended = null; playing.src.stop(); } catch { /* zaten durmuş */ }
    playing = null;
  }
  $('cut-play').textContent = 'Seçili aralığı dinle';
}

$('cut-play').addEventListener('click', async () => {
  if (!cut) return;
  if (playing) { stopPreview(); return; }
  const o = cutOptions();
  const data = renderRange(cut.buffer, cut.start, cut.end, o.gain, o.fadeIn, o.fadeOut);
  const c = getCtx();
  await c.resume();
  const src = c.createBufferSource();
  src.buffer = makeAudioBuffer(data);
  src.connect(c.destination);
  src.onended = () => { if (playing && playing.src === src) { playing = null; $('cut-play').textContent = 'Seçili aralığı dinle'; } };
  playing = { src };
  $('cut-play').textContent = 'Durdur';
  src.start();
});

$('cut-run').addEventListener('click', async () => {
  if (!cut) return;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  stopPreview();
  if (!(cut.end > cut.start)) { showError($('error'), 'Bitiş zamanı başlangıçtan büyük olmalı. Tutamaçları ya da saniye kutularını düzeltin.'); return; }
  const o = cutOptions();
  const dur = cut.end - cut.start;
  if (o.fadeIn + o.fadeOut > dur) { showError($('error'), 'Giriş ve çıkış yumuşatma toplamı seçili süreden uzun. Değerleri küçültün.'); return; }
  $('cut-run').disabled = true;
  try {
    const data = renderRange(cut.buffer, cut.start, cut.end, o.gain, o.fadeIn, o.fadeOut);
    const { blob, ext } = await encodeOutput(data, $('cut-format').value);
    showResult(blob, `${baseName(cut.file.name)}-kesit.${ext}`, dur);
  } catch (err) {
    showError($('error'), 'Çıktı oluşturulamadı. Biçimi WAV yapıp tekrar deneyin; sorun sürerse sayfayı yenileyin.');
  } finally {
    $('cut-run').disabled = false;
    setTimeout(() => setProgress($('progress'), null), 600);
  }
});

// ============================== BİRLEŞTİR SEKMESİ ===================================
const mergeItems = new Map(); // id -> { file, buffer }

createDropzone({ el: $('drop-merge'), accept: ACCEPT, multiple: true, onFiles: async (files) => {
  showError($('error'), null);
  $('result').classList.remove('is-active');
  for (const file of files) {
    bigWarning(file);
    try {
      setProgress($('progress'), 40, `"${file.name}" çözülüyor…`);
      const buffer = await decodeFile(file);
      addMergeItem(file, buffer);
    } catch (err) {
      showError($('error'), err.message === 'no-audio' ? 'Bu tarayıcı Web Audio desteklemiyor. Güncel Chrome, Edge, Firefox veya Safari kullanın.' : err.message);
    }
  }
  setProgress($('progress'), null);
  refreshMerge();
} });

function addMergeItem(file, buffer) {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  mergeItems.set(id, { file, buffer });
  const li = document.createElement('li');
  li.dataset.id = id;
  li.innerHTML = '<button class="ba-icon-btn ba-handle" type="button" aria-label="Sürükleyerek sırala" tabindex="-1">⠿</button><span class="name"></span><span class="meta"></span>'
    + '<button class="ba-icon-btn" type="button" data-act="up" aria-label="Yukarı taşı">↑</button><button class="ba-icon-btn" type="button" data-act="down" aria-label="Aşağı taşı">↓</button><button class="ba-icon-btn" type="button" data-act="remove" aria-label="Kaldır">✕</button>';
  li.querySelector('.name').textContent = file.name;
  li.querySelector('.meta').textContent = `${fmtSec(buffer.duration)} · ${formatBytes(file.size)}`;
  $('merge-list').appendChild(li);
}

makeSortable($('merge-list'), refreshMerge);
$('merge-list').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-act]');
  if (!btn) return;
  const li = btn.closest('li');
  if (btn.dataset.act === 'remove') { mergeItems.delete(li.dataset.id); li.remove(); }
  else moveItem(li, btn.dataset.act === 'up' ? -1 : 1);
  refreshMerge();
});

function orderedMerge() {
  return [...$('merge-list').children].map((li) => mergeItems.get(li.dataset.id)).filter(Boolean);
}

function refreshMerge() {
  const list = orderedMerge();
  $('merge-options').hidden = list.length === 0;
  $('merge-actions').hidden = list.length === 0;
  const total = list.reduce((a, x) => a + x.buffer.duration, 0);
  $('merge-total').textContent = list.length ? `${list.length} dosya · toplam ${fmtSec(total)}` : '';
  $('merge-run').disabled = list.length < 2;
  $('merge-hint').textContent = list.length === 1 ? 'Birleştirmek için en az iki ses dosyası ekleyin.' : '';
}

$('merge-gain').addEventListener('input', () => { $('merge-gain-out').textContent = `%${$('merge-gain').value}`; });

$('merge-clear').addEventListener('click', () => {
  mergeItems.clear();
  $('merge-list').textContent = '';
  $('result').classList.remove('is-active');
  showError($('error'), null);
  refreshMerge();
});

$('merge-run').addEventListener('click', async () => {
  const list = orderedMerge();
  if (list.length < 2) { showError($('error'), 'Birleştirmek için en az iki ses dosyası ekleyin.'); return; }
  showError($('error'), null);
  $('result').classList.remove('is-active');
  $('merge-run').disabled = true;
  try {
    // Hepsi aynı bağlamda çözüldüğü için örnekleme hızı eşittir; kanal sayısı en genişe yükseltilir.
    const sr = list[0].buffer.sampleRate;
    const nch = Math.min(2, Math.max(...list.map((x) => x.buffer.numberOfChannels)));
    const total = list.reduce((a, x) => a + x.buffer.length, 0);
    const channels = Array.from({ length: nch }, () => new Float32Array(total));
    let off = 0;
    for (let k = 0; k < list.length; k++) {
      const b = list[k].buffer;
      for (let c = 0; c < nch; c++) {
        channels[c].set(b.getChannelData(Math.min(c, b.numberOfChannels - 1)), off);
      }
      off += b.length;
      setProgress($('progress'), ((k + 1) / list.length) * 30, `Birleştiriliyor: ${k + 1}/${list.length}`);
      await tick();
    }
    const fadeOut = Math.max(0, parseFloat(String($('merge-fadeout').value).replace(',', '.')) || 0);
    applyGainFade(channels, sr, Number($('merge-gain').value) / 100, 0, fadeOut);
    const data = { channels, sampleRate: sr, length: total };
    const { blob, ext } = await encodeOutput(data, $('merge-format').value);
    showResult(blob, `birlesik-ses.${ext}`, total / sr);
  } catch (err) {
    showError($('error'), 'Birleştirme tamamlanamadı. Biçimi WAV yapıp tekrar deneyin; dosyalar çok büyükse daha az dosyayla deneyin.');
  } finally {
    $('merge-run').disabled = false;
    setTimeout(() => setProgress($('progress'), null), 600);
  }
});

refreshMerge();
