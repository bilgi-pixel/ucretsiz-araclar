// Online Ses Kaydedici — getUserMedia + MediaRecorder + saf JS WAV yazıcı. Ses yalnızca tarayıcı belleğinde tutulur.
import { downloadBlob, formatBytes, showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const els = {
  support: $('support'), device: $('opt-device'), ns: $('opt-ns'), echo: $('opt-echo'), agc: $('opt-agc'),
  start: $('rec-start'), pause: $('rec-pause'), stop: $('rec-stop'),
  error: $('error'), wave: $('wave'), state: $('rec-state'), timer: $('timer'),
  list: $('rec-list'), empty: $('empty'),
};

// Tercih sırasına göre ilk desteklenen ses türü (Chrome/Firefox: webm/ogg, Safari: mp4)
const MIME_CANDIDATES = ['audio/webm;codecs=opus', 'audio/ogg;codecs=opus', 'audio/webm', 'audio/ogg', 'audio/mp4'];
function pickMime() {
  if (!window.MediaRecorder || typeof MediaRecorder.isTypeSupported !== 'function') return '';
  return MIME_CANDIDATES.find((m) => MediaRecorder.isTypeSupported(m)) || '';
}
const extFor = (mime) => (/ogg/.test(mime) ? 'ogg' : /mp4/.test(mime) ? 'm4a' : 'webm');

let stream = null, rec = null, chunks = [], mime = '';
let ctx = null, analyser = null, raf = 0;
let startedAt = 0, elapsedBefore = 0, timerId = null;
let counter = 0, lastDur = 0;
const urls = [];

const hasMedia = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
if (!hasMedia || typeof window.MediaRecorder !== 'function') {
  els.support.textContent = window.isSecureContext === false
    ? 'Mikrofon yalnızca güvenli (https) bağlantıda çalışır. Sayfayı https://araclar.bilisimajans.com adresinden açın.'
    : 'Bu tarayıcı ses kaydını (MediaRecorder) desteklemiyor. Güncel Chrome, Edge, Firefox veya Safari kullanın.';
  els.support.hidden = false;
  els.start.disabled = true;
} else {
  mime = pickMime();
}

function fmtTime(ms) {
  const s = Math.floor(ms / 1000);
  const p = (n) => String(n).padStart(2, '0');
  const h = Math.floor(s / 3600);
  return h ? `${p(h)}:${p(Math.floor((s % 3600) / 60))}:${p(s % 60)}` : `${p(Math.floor(s / 60))}:${p(s % 60)}`;
}
const elapsedMs = () => elapsedBefore + (startedAt ? Date.now() - startedAt : 0);
function setState(text, rec) { els.state.textContent = text; els.state.className = `sk-state${rec ? ' is-rec' : ''}`; }

function errorMessage(err) {
  const n = err && err.name;
  if (n === 'NotAllowedError' || n === 'SecurityError') return 'Mikrofon izni verilmedi. Adres çubuğunun solundaki kilit simgesine tıklayın, "Mikrofon" satırını "İzin ver" yapın ve sayfayı yenileyin. Windows ve macOS gizlilik ayarlarında tarayıcının mikrofon erişimi de açık olmalıdır.';
  if (n === 'NotFoundError' || n === 'OverconstrainedError') return 'Mikrofon bulunamadı. Mikrofonun takılı olduğundan emin olun ya da listeden başka bir cihaz seçin.';
  if (n === 'NotReadableError' || n === 'AbortError') return 'Mikrofon başka bir uygulama tarafından kullanılıyor olabilir. Toplantı ve kayıt uygulamalarını kapatıp tekrar deneyin.';
  return 'Kayıt başlatılamadı. Sayfayı yenileyip tekrar deneyin; sorun sürerse tarayıcıyı yeniden başlatın.';
}

async function fillDevices() {
  if (!navigator.mediaDevices.enumerateDevices) return;
  const keep = els.device.value;
  const devs = (await navigator.mediaDevices.enumerateDevices()).filter((d) => d.kind === 'audioinput');
  els.device.textContent = '';
  const first = document.createElement('option'); first.value = ''; first.textContent = 'Varsayılan mikrofon';
  els.device.appendChild(first);
  devs.forEach((d, i) => {
    const o = document.createElement('option'); o.value = d.deviceId; o.textContent = d.label || `Mikrofon ${i + 1}`;
    els.device.appendChild(o);
  });
  if ([...els.device.options].some((o) => o.value === keep)) els.device.value = keep;
}
if (hasMedia) fillDevices().catch(() => {});

// ---- Canlı dalga ------------------------------------------------------------------
function drawWave(buf) {
  const c = els.wave, g = c.getContext('2d');
  const w = c.width, h = c.height;
  g.clearRect(0, 0, w, h);
  g.lineWidth = 2; g.strokeStyle = '#7b2331'; g.beginPath();
  if (!buf) { g.moveTo(0, h / 2); g.lineTo(w, h / 2); g.stroke(); return; }
  for (let i = 0; i < buf.length; i++) {
    const x = (i / (buf.length - 1)) * w, y = (buf[i] / 255) * h;
    i ? g.lineTo(x, y) : g.moveTo(x, y);
  }
  g.stroke();
}
drawWave(null);

function startWave() {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;
  ctx = new Ctx();
  analyser = ctx.createAnalyser(); analyser.fftSize = 1024;
  ctx.createMediaStreamSource(stream).connect(analyser); // hoparlöre bağlanmaz
  const buf = new Uint8Array(analyser.fftSize);
  const loop = () => { analyser.getByteTimeDomainData(buf); drawWave(buf); raf = requestAnimationFrame(loop); };
  loop();
}
function stopWave() {
  cancelAnimationFrame(raf);
  if (ctx) { ctx.close().catch(() => {}); ctx = null; }
  drawWave(null);
}

// ---- Kayıt ---------------------------------------------------------------------------
async function startRecording() {
  showError(els.error, '');
  els.start.disabled = true;
  try {
    const audio = {
      noiseSuppression: els.ns.checked, echoCancellation: els.echo.checked, autoGainControl: els.agc.checked,
    };
    if (els.device.value) audio.deviceId = { exact: els.device.value };
    stream = await navigator.mediaDevices.getUserMedia({ audio, video: false });
  } catch (err) {
    showError(els.error, errorMessage(err));
    els.start.disabled = false;
    return;
  }
  try {
    rec = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
  } catch (err) {
    showError(els.error, 'Tarayıcı bu mikrofonla kayıt başlatamadı. Başka bir mikrofon seçin ya da tarayıcıyı güncelleyin.');
    releaseStream(); els.start.disabled = false; return;
  }
  chunks = [];
  rec.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
  rec.onstop = finishRecording;
  rec.onerror = () => showError(els.error, 'Kayıt sırasında bir hata oluştu. Kaydı bitirip yeniden başlatın.');
  rec.start(500);
  elapsedBefore = 0; startedAt = Date.now();
  timerId = setInterval(() => { els.timer.textContent = fmtTime(elapsedMs()); }, 250);
  startWave();
  fillDevices().catch(() => {});
  setState('Kayıt sürüyor', true);
  els.pause.disabled = false; els.stop.disabled = false; els.pause.textContent = 'Duraklat';
}

function togglePause() {
  if (!rec) return;
  if (rec.state === 'recording') {
    rec.pause(); elapsedBefore = elapsedMs(); startedAt = 0;
    setState('Duraklatıldı', false); els.pause.textContent = 'Devam et';
  } else if (rec.state === 'paused') {
    rec.resume(); startedAt = Date.now();
    setState('Kayıt sürüyor', true); els.pause.textContent = 'Duraklat';
  }
}

function stopRecording() {
  if (!rec || rec.state === 'inactive') return;
  const dur = elapsedMs();
  lastDur = dur;
  rec.stop();
}

function releaseStream() {
  if (stream) stream.getTracks().forEach((t) => t.stop());
  stream = null;
}

function finishRecording() {
  const dur = lastDur;
  clearInterval(timerId); startedAt = 0;
  stopWave(); releaseStream();
  const type = (rec && rec.mimeType) || mime || 'audio/webm';
  const blob = new Blob(chunks, { type });
  chunks = []; rec = null;
  els.pause.disabled = true; els.stop.disabled = true; els.start.disabled = false;
  setState('Hazır', false);
  if (!blob.size) { showError(els.error, 'Kayıt boş çıktı. Mikrofonun çalıştığından emin olup en az bir saniye kayıt yapın.'); return; }
  addItem(blob, type, dur);
}

// ---- Kayıt listesi ----------------------------------------------------------------------
function stamp() {
  const d = new Date(); const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
}
function addItem(blob, type, dur) {
  counter += 1;
  const name = `ses-kaydi-${stamp()}-${counter}`;
  const url = URL.createObjectURL(blob); urls.push(url);
  const li = document.createElement('li');
  li.dataset.bytes = String(blob.size);
  const title = document.createElement('strong'); title.textContent = `Kayıt ${counter}`;
  const meta = document.createElement('div'); meta.className = 'meta';
  meta.textContent = `${fmtTime(dur)} · ${extFor(type).toUpperCase()} · ${formatBytes(blob.size)}`;
  const audio = document.createElement('audio'); audio.controls = true; audio.src = url; audio.preload = 'metadata';
  audio.setAttribute('aria-label', `Kayıt ${counter} oynatıcı`);
  const actions = document.createElement('div'); actions.className = 'ba-actions';
  const b1 = document.createElement('button'); b1.type = 'button'; b1.className = 'ba-btn ba-btn-success dl-native';
  b1.textContent = `İndir (.${extFor(type)})`;
  b1.addEventListener('click', () => downloadBlob(blob, `${name}.${extFor(type)}`));
  const b2 = document.createElement('button'); b2.type = 'button'; b2.className = 'ba-btn dl-wav';
  b2.textContent = 'WAV olarak indir';
  b2.addEventListener('click', async () => {
    b2.disabled = true; const old = b2.textContent; b2.textContent = 'Dönüştürülüyor…';
    try {
      const wav = await blobToWav(blob);
      downloadBlob(wav, `${name}.wav`);
    } catch (e) {
      showError(els.error, 'Kayıt WAV\'a çevrilemedi. Tarayıcı bu sesi çözemiyor olabilir; "İndir" ile özgün biçimi kaydedip bir ses programında çevirin.');
    } finally { b2.disabled = false; b2.textContent = old; }
  });
  const b3 = document.createElement('button'); b3.type = 'button'; b3.className = 'ba-btn';
  b3.textContent = 'Sil';
  b3.addEventListener('click', () => { li.remove(); URL.revokeObjectURL(url); els.empty.hidden = els.list.children.length > 0; });
  actions.append(b1, b2, b3);
  li.append(title, meta, audio, actions);
  els.list.prepend(li);
  els.empty.hidden = true;
}

// ---- WAV yazıcı (AudioBuffer → PCM 16 bit) -----------------------------------------------
async function blobToWav(blob) {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  const c = new Ctx();
  try {
    const arr = await blob.arrayBuffer();
    const buf = await new Promise((res, rej) => c.decodeAudioData(arr, res, rej));
    return encodeWav(buf);
  } finally { c.close().catch(() => {}); }
}

/** AudioBuffer'ı 16 bit PCM WAV Blob'una yazar (kanallar iç içe). */
export function encodeWav(buffer) {
  const ch = buffer.numberOfChannels, rate = buffer.sampleRate, len = buffer.length;
  const dataSize = len * ch * 2;
  const out = new DataView(new ArrayBuffer(44 + dataSize));
  const str = (off, s) => { for (let i = 0; i < s.length; i++) out.setUint8(off + i, s.charCodeAt(i)); };
  str(0, 'RIFF'); out.setUint32(4, 36 + dataSize, true); str(8, 'WAVE');
  str(12, 'fmt '); out.setUint32(16, 16, true); out.setUint16(20, 1, true); out.setUint16(22, ch, true);
  out.setUint32(24, rate, true); out.setUint32(28, rate * ch * 2, true); out.setUint16(32, ch * 2, true); out.setUint16(34, 16, true);
  str(36, 'data'); out.setUint32(40, dataSize, true);
  const chans = [];
  for (let c = 0; c < ch; c++) chans.push(buffer.getChannelData(c));
  let off = 44;
  for (let i = 0; i < len; i++) {
    for (let c = 0; c < ch; c++) {
      const s = Math.max(-1, Math.min(1, chans[c][i]));
      out.setInt16(off, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      off += 2;
    }
  }
  return new Blob([out], { type: 'audio/wav' });
}

els.start.addEventListener('click', startRecording);
els.pause.addEventListener('click', togglePause);
els.stop.addEventListener('click', stopRecording);
window.addEventListener('pagehide', () => { releaseStream(); urls.forEach((u) => URL.revokeObjectURL(u)); });
