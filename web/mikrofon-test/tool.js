// Mikrofon Testi — getUserMedia + Web Audio (AnalyserNode) + MediaRecorder.
// Ses hiçbir yere gönderilmez; kayıt yalnızca bellekte tutulur (kullanıcı indirmedikçe dosyaya yazılmaz).
import { downloadBlob, showError, formatBytes } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const els = {
  support: $('support'),
  device: $('mic-device'), processing: $('mic-processing'),
  start: $('mic-start'), stop: $('mic-stop'),
  error: $('mic-error'), permHelp: $('perm-help'),
  meter: $('mic-canvas'), level: $('mic-level'), hint: $('mic-hint'), wave: $('wave-canvas'),
  recToggle: $('rec-toggle'), recDownload: $('rec-download'), recStatus: $('rec-status'), recAudio: $('rec-audio'),
};

const MAX_REC_SEC = 10;          // kayıt üst sınırı (saniye)
const SILENCE_DB = -55;          // bu değerin altı "ses yok" sayılır (dBFS)
const SILENCE_MS = 3000;         // bu kadar süre sessizlikte uyarı verilir
const CLIP_LEVEL = 0.97;         // |örnek| bu değerin üstü kırpılma sayılır

let micStream = null;
let micCtx = null;
let micRaf = 0;
let recorder = null;
let recChunks = [];
let recTimer = 0;
let recStartedAt = 0;
let recBlob = null;
let recUrl = null;
let recMime = '';

// ---- Destek kontrolü ------------------------------------------------------------
const hasMedia = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
if (!hasMedia) {
  els.support.textContent = window.isSecureContext === false
    ? 'Mikrofon yalnızca güvenli (https) bağlantıda çalışır. Sayfayı https://araclar.bilisimajans.com adresinden açın.'
    : 'Bu tarayıcı mikrofon erişimini desteklemiyor. Güncel Chrome, Edge, Firefox veya Safari kullanın.';
  els.support.hidden = false;
  els.start.disabled = true;
}
const hasRecorder = typeof window.MediaRecorder !== 'undefined';

/** getUserMedia hatalarını çözüm öneren Türkçe mesaja çevirir. */
function mediaErrorMessage(err) {
  const name = err && err.name;
  if (name === 'NotAllowedError' || name === 'SecurityError' || name === 'PermissionDeniedError') {
    return 'Mikrofon izni verilmedi. Tarayıcı adres çubuğunun solundaki kilit (veya ayarlar) simgesine tıklayın, "Mikrofon" satırını "İzin ver" yapın ve sayfayı yenileyin. Windows\'ta Ayarlar → Gizlilik ve güvenlik → Mikrofon, macOS\'ta Sistem Ayarları → Gizlilik ve Güvenlik → Mikrofon bölümünden de erişimin açık olduğunu kontrol edin.';
  }
  if (name === 'OverconstrainedError' || name === 'ConstraintNotSatisfiedError') {
    return 'Seçili mikrofon artık kullanılamıyor (çıkarılmış olabilir). Listeden başka bir mikrofon seçip yeniden başlatın.';
  }
  if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
    return 'Mikrofon bulunamadı. Mikrofonun veya kulaklığın takılı olduğundan emin olun, USB kablosunu çıkarıp yeniden takın. Windows\'ta Ayarlar → Sistem → Ses → Giriş bölümünde cihazın göründüğünü, macOS\'ta Sistem Ayarları → Ses → Giriş sekmesinde listelendiğini kontrol edin.';
  }
  if (name === 'NotReadableError' || name === 'TrackStartError' || name === 'AbortError') {
    return 'Mikrofon şu an başka bir uygulama tarafından kullanılıyor ya da sürücüsü yanıt vermiyor. Zoom, Teams, Discord gibi uygulamaları ve mikrofonu kullanan diğer sekmeleri kapatıp tekrar deneyin; sorun sürerse bilgisayarı yeniden başlatın.';
  }
  return 'Mikrofon başlatılamadı. Sayfayı yenileyip tekrar deneyin; sorun sürerse tarayıcıyı yeniden başlatın.';
}

/** Mikrofon listesini doldurur (izin verildikten sonra cihaz adları görünür). */
async function fillDevices() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return;
  const list = await navigator.mediaDevices.enumerateDevices();
  const keep = els.device.value;
  els.device.textContent = '';
  const first = document.createElement('option');
  first.value = ''; first.textContent = 'Varsayılan mikrofon';
  els.device.appendChild(first);
  // Chrome "default" ve "communications" adlı yinelenen girişler ekler; gerçek cihaz varsa onları gizle.
  let inputs = list.filter((d) => d.kind === 'audioinput');
  const real = inputs.filter((d) => d.deviceId !== 'default' && d.deviceId !== 'communications');
  if (real.length) inputs = real;
  inputs.forEach((d, i) => {
    const o = document.createElement('option');
    o.value = d.deviceId;
    o.textContent = d.label || `Mikrofon ${i + 1}`;
    els.device.appendChild(o);
  });
  if ([...els.device.options].some((o) => o.value === keep)) els.device.value = keep;
}
if (hasMedia) {
  fillDevices().catch(() => {});
  if (navigator.mediaDevices.addEventListener) navigator.mediaDevices.addEventListener('devicechange', () => fillDevices().catch(() => {}));
}

// ---- Çizim ----------------------------------------------------------------------
/** Segmentli seviye çubuğu: yeşil → sarı → kırmızı, tepe işaretçisi markaya göre. */
function drawMeter(level, peak) {
  const c = els.meter, ctx = c.getContext('2d');
  const w = c.width, h = c.height;
  ctx.clearRect(0, 0, w, h);
  const bars = 40, gap = 3, bw = (w - gap * (bars - 1)) / bars;
  const lit = Math.round(level * bars);
  for (let i = 0; i < bars; i++) {
    const r = i / bars;
    ctx.fillStyle = i < lit ? (r < 0.6 ? '#2e9e5b' : r < 0.85 ? '#e0a21b' : '#c8372d') : 'rgba(128,128,128,.25)';
    ctx.fillRect(i * (bw + gap), 4, bw, h - 8);
  }
  const px = Math.min(bars - 1, Math.round(peak * bars)) * (bw + gap);
  ctx.fillStyle = '#7b2331';
  ctx.fillRect(px, 0, 3, h);
}

/** Dalga formu: her sütun için o aralığın en küçük/en büyük örneğini dikey çizgiyle çizer. */
function drawWave(samples) {
  const c = els.wave, ctx = c.getContext('2d');
  const w = c.width, h = c.height, mid = h / 2;
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = 'rgba(128,128,128,.4)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, mid + .5); ctx.lineTo(w, mid + .5); ctx.stroke();
  if (!samples) return;
  ctx.strokeStyle = '#2e9e5b';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  const step = samples.length / w;
  for (let x = 0; x < w; x++) {
    let mn = 1, mx = -1;
    const a = Math.floor(x * step), b = Math.max(a + 1, Math.floor((x + 1) * step));
    for (let i = a; i < b && i < samples.length; i++) { const v = samples[i]; if (v < mn) mn = v; if (v > mx) mx = v; }
    if (mn > mx) { mn = mx = 0; }
    ctx.moveTo(x + .5, mid - mx * (mid - 3));
    ctx.lineTo(x + .5, mid - mn * (mid - 3) + 1);
  }
  ctx.stroke();
}

const HINTS = {
  idle: 'Mikrofon başlatılınca ses seviyeniz burada yorumlanır.',
  wait: 'Dinleniyor… birkaç kelime söyleyin ya da el çırpın.',
  ok: 'Ses algılanıyor. Konuşurken çubuğun orta ve üst bölgede dolması idealdir.',
  silent: 'Son birkaç saniyedir ses algılanmıyor. Doğru mikrofonu seçtiğinizden, mikrofonun sessize alınmadığından ve işletim sistemindeki giriş düzeyinin açık olduğundan emin olun.',
  clipping: 'Ses kırpılıyor (çok yüksek). Mikrofon kazancını düşürün, mikrofondan biraz uzaklaşın ya da otomatik kazancı kapatıp tekrar deneyin.',
};
function setHint(state) {
  if (els.hint.dataset.state === state) return;
  els.hint.dataset.state = state;
  els.hint.textContent = HINTS[state];
}

// ---- Mikrofon -------------------------------------------------------------------
function stopStream(s) { if (s) s.getTracks().forEach((t) => t.stop()); }

function fmtDb(db) { return db <= -90 ? '< -90 dB' : `${Math.round(db)} dB`; }

async function startMic() {
  showError(els.error, '');
  els.permHelp.hidden = true;
  stopMic();
  els.start.disabled = true;
  try {
    const id = els.device.value;
    const proc = els.processing.checked;
    const audio = { echoCancellation: proc, noiseSuppression: proc, autoGainControl: proc };
    if (id) audio.deviceId = { exact: id };
    micStream = await navigator.mediaDevices.getUserMedia({ audio, video: false });
    const Ctx = window.AudioContext || window.webkitAudioContext;
    micCtx = new Ctx();
    if (micCtx.state === 'suspended') await micCtx.resume();
    const src = micCtx.createMediaStreamSource(micStream);
    const analyser = micCtx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0;
    src.connect(analyser); // hoparlöre bağlanmaz: geri besleme (ıslık) olmaz
    const f32 = new Float32Array(analyser.fftSize);
    const u8 = new Uint8Array(analyser.fftSize);
    const hasFloat = typeof analyser.getFloatTimeDomainData === 'function';

    const t0 = performance.now();
    let lastLoud = t0, lastClipEvent = -1e9, lastText = 0;
    const clipEvents = []; // ayrı kırpılma olaylarının zamanları
    let peakHold = 0, maxSeen = 0, maxDb = -100;
    setHint('wait');

    const loop = (now) => {
      if (hasFloat) analyser.getFloatTimeDomainData(f32);
      else { analyser.getByteTimeDomainData(u8); for (let i = 0; i < u8.length; i++) f32[i] = (u8[i] - 128) / 128; }
      let sum = 0, peakAbs = 0;
      for (let i = 0; i < f32.length; i++) { const v = f32[i]; sum += v * v; const a = Math.abs(v); if (a > peakAbs) peakAbs = a; }
      const rms = Math.sqrt(sum / f32.length);
      const db = 20 * Math.log10(Math.max(rms, 1e-5));
      const level = Math.max(0, Math.min(1, (db + 60) / 60)); // -60 dB .. 0 dB → 0..1
      peakHold = Math.max(level, peakHold - 0.008);
      maxSeen = Math.max(maxSeen, level);
      maxDb = Math.max(maxDb, db);
      drawMeter(level, peakHold);
      drawWave(f32);
      els.meter.dataset.max = maxSeen.toFixed(3);

      // Sessizlik ve kırpılma değerlendirmesi
      if (db > SILENCE_DB) lastLoud = now;
      // Çakışan analiz pencereleri aynı tepeyi birkaç kez görür; 150 ms içindekileri tek olay say.
      if (peakAbs >= CLIP_LEVEL && now - lastClipEvent > 150) { clipEvents.push(now); lastClipEvent = now; }
      while (clipEvents.length && now - clipEvents[0] > 3000) clipEvents.shift();
      if (clipEvents.length >= 3) setHint('clipping');
      else if (now - lastLoud >= SILENCE_MS) setHint('silent');
      else if (now - t0 >= 300 && lastLoud > t0) setHint('ok');

      // Metin güncellemesi saniyede ~10 kez (ekran okuyucuyu ve DOM'u yormasın)
      if (now - lastText >= 100) {
        lastText = now;
        const peakDb = 20 * Math.log10(Math.max(peakAbs, 1e-5));
        els.level.textContent = `Seviye: ${fmtDb(db)} · tepe: ${fmtDb(peakDb)} · en yüksek: ${fmtDb(maxDb)}`;
        els.level.dataset.db = db.toFixed(1);
        els.level.dataset.maxdb = maxDb.toFixed(1);
      }
      micRaf = requestAnimationFrame(loop);
    };
    micRaf = requestAnimationFrame(loop);

    els.stop.disabled = false;
    if (hasRecorder) { els.recToggle.disabled = false; if (!recBlob) setRecStatus('idle', 'Hazır. Kaydı başlatıp birkaç saniye konuşun.'); }
    await fillDevices();
    const cur = micStream && micStream.getAudioTracks()[0] && micStream.getAudioTracks()[0].getSettings().deviceId;
    if (cur && [...els.device.options].some((o) => o.value === cur)) els.device.value = cur;
  } catch (err) {
    stopMic();
    showError(els.error, mediaErrorMessage(err));
    const n = err && err.name;
    if (n === 'NotAllowedError' || n === 'SecurityError' || n === 'PermissionDeniedError') els.permHelp.hidden = false;
    if (n === 'OverconstrainedError' || n === 'ConstraintNotSatisfiedError') { els.device.value = ''; fillDevices().catch(() => {}); }
  } finally {
    els.start.disabled = !hasMedia;
  }
}

function stopMic() {
  if (recorder && recorder.state === 'recording') stopRecording(); // kayıt varsa sonuçlansın
  cancelAnimationFrame(micRaf);
  stopStream(micStream); micStream = null;
  if (micCtx) { micCtx.close().catch(() => {}); micCtx = null; }
  els.stop.disabled = true;
  els.recToggle.disabled = true;
  drawMeter(0, 0);
  drawWave(null);
  els.level.textContent = 'Mikrofon kapalı. Başlatınca konuşun; çubuk sesinize göre dolmalı.';
  delete els.level.dataset.db;
  setHint('idle');
  if (!recBlob && els.recStatus.dataset.state !== 'recording') setRecStatus('idle', 'Kayıt için önce mikrofonu başlatın.');
}

els.start.addEventListener('click', startMic);
els.stop.addEventListener('click', stopMic);
els.device.addEventListener('change', () => { if (micStream) startMic(); });
els.processing.addEventListener('change', () => { if (micStream) startMic(); });
drawMeter(0, 0);
drawWave(null);

// ---- Kayıt ve dinleme -----------------------------------------------------------
function setRecStatus(state, text) {
  els.recStatus.dataset.state = state;
  els.recStatus.textContent = text;
}

/** Tarayıcının desteklediği ilk kayıt biçimini seçer. */
function pickMime() {
  if (!hasRecorder || typeof MediaRecorder.isTypeSupported !== 'function') return '';
  const list = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'];
  return list.find((t) => MediaRecorder.isTypeSupported(t)) || '';
}

function startRecording() {
  if (!micStream || !hasRecorder) return;
  try {
    const mime = pickMime();
    recorder = mime ? new MediaRecorder(micStream, { mimeType: mime }) : new MediaRecorder(micStream);
  } catch (err) {
    setRecStatus('idle', 'Bu tarayıcı kaydı başlatamadı. Seviye testi yine de çalışır; tarayıcıyı güncelleyip tekrar deneyin.');
    return;
  }
  recChunks = [];
  recMime = recorder.mimeType || '';
  recorder.addEventListener('dataavailable', (e) => { if (e.data && e.data.size) recChunks.push(e.data); });
  recorder.addEventListener('stop', finishRecording);
  recorder.start(250);
  recStartedAt = performance.now();
  els.recToggle.textContent = 'Kaydı durdur';
  els.recDownload.hidden = true;
  els.recAudio.hidden = true;
  els.recAudio.pause();
  const tick = () => {
    const s = (performance.now() - recStartedAt) / 1000;
    setRecStatus('recording', `Kaydediliyor… ${s.toFixed(1).replace('.', ',')} / ${MAX_REC_SEC} sn`);
    if (s >= MAX_REC_SEC) stopRecording();
  };
  tick();
  recTimer = setInterval(tick, 100);
}

function stopRecording() {
  clearInterval(recTimer); recTimer = 0;
  if (recorder && recorder.state !== 'inactive') {
    recorder.recordedMs = performance.now() - recStartedAt;
    try { recorder.stop(); } catch (e) { /* kayıt zaten durmuş */ }
  }
  els.recToggle.textContent = 'Kaydı başlat';
}

function finishRecording() {
  const secs = (recorder && recorder.recordedMs ? recorder.recordedMs : 0) / 1000;
  recBlob = new Blob(recChunks, { type: recMime || 'audio/webm' });
  recorder = null;
  if (!recBlob.size) { recBlob = null; setRecStatus('idle', 'Kayıt boş çıktı. Mikrofonun açık olduğundan emin olup yeniden deneyin.'); return; }
  if (recUrl) URL.revokeObjectURL(recUrl);
  recUrl = URL.createObjectURL(recBlob);
  els.recAudio.src = recUrl;
  els.recAudio.hidden = false;
  els.recDownload.hidden = false;
  els.recToggle.textContent = 'Kaydı başlat';
  setRecStatus('ready', `Kayıt hazır · ${secs.toFixed(1).replace('.', ',')} sn · ${formatBytes(recBlob.size)} · ${extFor(recBlob.type)}`);
  // Kullanıcı etkileşimi sonrası otomatik dinletme; tarayıcı engellerse oynatıcıdan başlatılır.
  els.recAudio.play().catch(() => {});
}

function extFor(type) {
  if (/mp4|aac/.test(type)) return 'm4a';
  if (/ogg/.test(type)) return 'ogg';
  return 'webm';
}

els.recToggle.addEventListener('click', () => {
  if (recorder && recorder.state === 'recording') stopRecording();
  else startRecording();
});
els.recDownload.addEventListener('click', () => {
  if (!recBlob) return;
  const d = new Date(); const p = (n) => String(n).padStart(2, '0');
  downloadBlob(recBlob, `mikrofon-kaydi-${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}.${extFor(recBlob.type)}`);
});
if (!hasRecorder) {
  els.recToggle.disabled = true;
  setRecStatus('idle', 'Bu tarayıcı kayıt özelliğini desteklemiyor; seviye testi yine de çalışır. Güncel Chrome, Edge, Firefox veya Safari deneyin.');
}

// Sayfadan çıkarken mikrofonu serbest bırak
window.addEventListener('pagehide', () => { stopMic(); });
