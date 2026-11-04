// Mic Test (EN) — getUserMedia + Web Audio (AnalyserNode) + MediaRecorder.
// Ses hiçbir yere gönderilmez; kayıt yalnızca bellekte tutulur (kullanıcı indirmedikçe dosyaya yazılmaz).
import { downloadBlob, showError, formatBytes } from '../../assets/js/ba.js';

const MAX_REC_SEC = 10;          // kayıt üst sınırı (saniye)
const SILENCE_DB = -55;          // bu değerin altı "ses yok" sayılır (dBFS)
const SILENCE_MS = 3000;         // bu kadar süre sessizlikte uyarı verilir
const SOUND_HOLD_MS = 1200;      // "Sound detected" rozeti son sesten sonra bu kadar açık kalır
const CLIP_LEVEL = 0.97;         // |örnek| bu değerin üstü kırpılma sayılır

// ---- Saf yardımcılar (testlerde bilinen değerlerle doğrulanır) ----------------------
/** Örnek dizisinden RMS, dBFS, tepe dBFS ve 0..1 çubuk seviyesini hesaplar (-60 dB → 0, 0 dB → 1). */
export function levelStats(samples) {
  let sum = 0, peakAbs = 0;
  for (let i = 0; i < samples.length; i++) {
    const v = samples[i];
    sum += v * v;
    const a = Math.abs(v);
    if (a > peakAbs) peakAbs = a;
  }
  const rms = samples.length ? Math.sqrt(sum / samples.length) : 0;
  const db = 20 * Math.log10(Math.max(rms, 1e-5));
  const peakDb = 20 * Math.log10(Math.max(peakAbs, 1e-5));
  const level = Math.max(0, Math.min(1, (db + 60) / 60));
  return { rms, db, peakAbs, peakDb, level };
}

/** dBFS değerini metne çevirir; çok düşük değerler "< -90 dBFS" olur. */
export function fmtDb(db) {
  if (!(db > -90)) return '< -90 dBFS';
  const r = Math.round(db);
  return `${r === 0 ? 0 : r} dBFS`; // "-0" yazılmasın
}

/** Örnekleme hızını ABD sayı biçiminde yazar: 48000 → "48,000 Hz". */
export function fmtRate(hz) {
  if (!(hz > 0)) return 'Not reported';
  return `${Math.round(hz).toLocaleString('en-US')} Hz`;
}

/** Kanal sayısını okunur metne çevirir. */
export function fmtChannels(n) {
  if (n === 1) return '1 (mono)';
  if (n === 2) return '2 (stereo)';
  if (typeof n === 'number' && n > 0) return `${n} channels`;
  return 'Not reported';
}

/** MIME türünden dosya uzantısı. */
export function extFor(type) {
  if (/mp4|aac/.test(type || '')) return 'm4a';
  if (/ogg/.test(type || '')) return 'ogg';
  return 'webm';
}

/** Cihaz adı veya düşük örnekleme hızı Bluetooth el serbest (hands-free) profilini düşündürüyor mu? */
export function isBluetoothLike(label, sampleRate) {
  if (/bluetooth|hands-?free|airpods|\bbuds\d*\b|\bbt\b/i.test(label || '')) return true;
  return typeof sampleRate === 'number' && sampleRate > 0 && sampleRate <= 16000;
}

// ---- Sayfa ------------------------------------------------------------------------
const $ = (id) => document.getElementById(id);
const els = {
  support: $('support'),
  device: $('mic-device'), optEcho: $('opt-echo'), optNoise: $('opt-noise'), optAgc: $('opt-agc'),
  start: $('mic-start'), stop: $('mic-stop'),
  error: $('mic-error'), permHelp: $('perm-help'),
  meter: $('mic-canvas'), level: $('mic-level'), sound: $('mic-sound'), hint: $('mic-hint'),
  btWarn: $('bt-warn'), paused: $('mic-paused'), wave: $('wave-canvas'),
  recToggle: $('rec-toggle'), recDownload: $('rec-download'), recStatus: $('rec-status'),
  recResult: $('rec-result'), recAudio: $('rec-audio'),
  infoDevice: $('info-device'), infoRate: $('info-rate'), infoChannels: $('info-channels'), infoProcessing: $('info-processing'),
};

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
let starting = false;
let restartQueued = false;       // açılış sürerken gelen cihaz/işleme değişikliği; açılış bitince uygulanır

// ---- Destek kontrolü ------------------------------------------------------------
const hasMedia = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
const hasRecorder = typeof window.MediaRecorder !== 'undefined';
if (!hasMedia) {
  els.support.textContent = window.isSecureContext === false
    ? 'The microphone only works over a secure (https) connection. Open this page at https://araclar.bilisimajans.com/en/mic-test/ and try again.'
    : 'This browser does not support microphone access. Use a current version of Chrome, Edge, Firefox or Safari.';
  els.support.hidden = false;
  els.start.disabled = true;
}

const isPermissionError = (n) => n === 'NotAllowedError' || n === 'SecurityError' || n === 'PermissionDeniedError';

/** getUserMedia hatalarını çözüm öneren İngilizce mesaja çevirir. */
function mediaErrorMessage(err) {
  const name = err && err.name;
  if (isPermissionError(name)) {
    return 'Microphone permission was not granted. Click the lock (or site settings) icon to the left of the address bar, set "Microphone" to "Allow" and reload the page. Also check that access is switched on in Windows Settings > Privacy & security > Microphone, or in macOS System Settings > Privacy & Security > Microphone.';
  }
  if (name === 'OverconstrainedError' || name === 'ConstraintNotSatisfiedError') {
    return 'The selected microphone is no longer available (it may have been unplugged). Choose another microphone from the list and start again.';
  }
  if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
    return 'No microphone was found. Make sure the microphone or headset is plugged in, or unplug the USB cable and plug it back in. Check that the device appears in Windows Settings > System > Sound > Input, or in macOS System Settings > Sound > Input.';
  }
  if (name === 'NotReadableError' || name === 'TrackStartError' || name === 'AbortError') {
    return 'The microphone is being used by another app, or its driver is not responding. Close video-call and chat apps and any other tab that uses the microphone, then try again. If the problem continues, restart the computer.';
  }
  return 'The microphone could not be started. Reload the page and try again; if the problem continues, restart the browser.';
}

/** Mikrofon listesini doldurur (izin verildikten sonra cihaz adları görünür). */
async function fillDevices() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return;
  const list = await navigator.mediaDevices.enumerateDevices();
  const keep = els.device.value;
  els.device.textContent = '';
  const first = document.createElement('option');
  first.value = ''; first.textContent = 'Default microphone';
  els.device.appendChild(first);
  // Chrome "default" ve "communications" adlı yinelenen girişler ekler; gerçek cihaz varsa onları gizle.
  let inputs = list.filter((d) => d.kind === 'audioinput' && d.deviceId);
  const real = inputs.filter((d) => d.deviceId !== 'default' && d.deviceId !== 'communications');
  if (real.length) inputs = real;
  inputs.forEach((d, i) => {
    const o = document.createElement('option');
    o.value = d.deviceId;
    o.textContent = d.label || `Microphone ${i + 1}`;
    els.device.appendChild(o);
  });
  if ([...els.device.options].some((o) => o.value === keep)) els.device.value = keep;
}
if (hasMedia) {
  fillDevices().catch(() => {});
  if (navigator.mediaDevices.addEventListener) navigator.mediaDevices.addEventListener('devicechange', () => fillDevices().catch(() => {}));
}

// ---- Çizim ----------------------------------------------------------------------
// Tepe işaretçisi temanın --ba-primary rengini kullanır: sabit #7b2331 koyu temada zeminle ~1,3:1 kalıp kayboluyordu.
let peakColor = '#7b2331';
function readThemeColors() {
  const v = getComputedStyle(els.meter).getPropertyValue('--ba-primary').trim();
  if (v) peakColor = v;
}

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
  ctx.fillStyle = peakColor;
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
  idle: 'Start the microphone and this box will explain what your level means.',
  wait: 'Listening… say a few words or clap your hands.',
  ok: 'Sound is coming through. While you speak, the bar should reach the middle to upper part.',
  silent: 'No sound for the last few seconds. Check that the right microphone is selected, that it is not muted and that the input volume in your system settings is turned up.',
  clipping: 'The sound is clipping (too loud). Lower the microphone gain, move a little further away, or turn off automatic gain control and try again.',
};
function setHint(state) {
  if (els.hint.dataset.state === state) return;
  els.hint.dataset.state = state;
  els.hint.textContent = HINTS[state];
}

const SOUND_TEXT = { off: 'Microphone off', sound: 'Sound detected', silence: 'No sound' };
function setSound(state) {
  if (els.sound.dataset.state === state) return;
  els.sound.dataset.state = state;
  els.sound.textContent = SOUND_TEXT[state];
}

/** Bağlantı ayrıntıları kutusunu doldurur ya da (track yoksa) sıfırlar. */
function showInfo(track, ctxRate) {
  if (!track) {
    els.infoDevice.textContent = els.infoRate.textContent = els.infoChannels.textContent = els.infoProcessing.textContent = '–';
    delete els.infoRate.dataset.rate;
    delete els.infoChannels.dataset.channels;
    els.btWarn.hidden = true;
    return;
  }
  const s = typeof track.getSettings === 'function' ? (track.getSettings() || {}) : {};
  els.infoDevice.textContent = track.label || 'Default microphone';
  const devRate = s.sampleRate > 0 ? s.sampleRate : 0;
  const rate = devRate || ctxRate;
  els.infoRate.textContent = fmtRate(rate) + (!devRate && rate > 0 ? ' (audio engine rate; the browser does not report the device rate)' : '');
  if (rate > 0) els.infoRate.dataset.rate = String(Math.round(rate));
  els.infoChannels.textContent = fmtChannels(s.channelCount);
  if (s.channelCount > 0) els.infoChannels.dataset.channels = String(s.channelCount);
  const on = (v) => (v === true ? 'on' : v === false ? 'off' : 'not reported');
  els.infoProcessing.textContent = `Echo cancellation ${on(s.echoCancellation)} · noise suppression ${on(s.noiseSuppression)} · auto gain ${on(s.autoGainControl)}`;
  // Hands-free tahmini yalnızca cihazın bildirdiği hızla yapılır (ses motoru hızı cihazı yansıtmaz).
  els.btWarn.hidden = !isBluetoothLike(track.label, devRate || undefined);
}

// ---- Mikrofon -------------------------------------------------------------------
function stopStream(s) { if (s) s.getTracks().forEach((t) => t.stop()); }

async function startMic() {
  // Çift tıklamada iki akış açılmasın; açılış sürerken gelen değişiklik kaybolmasın, sonra yeniden başlatılsın.
  if (starting) { restartQueued = true; return; }
  starting = true;
  restartQueued = false;
  showError(els.error, '');
  els.permHelp.hidden = true;
  els.paused.hidden = true;
  stopMic();
  els.start.disabled = true;
  try {
    const id = els.device.value;
    const audio = {
      echoCancellation: els.optEcho.checked,
      noiseSuppression: els.optNoise.checked,
      autoGainControl: els.optAgc.checked,
    };
    if (id) audio.deviceId = { exact: id };
    micStream = await navigator.mediaDevices.getUserMedia({ audio, video: false });
    // İzin/açılış beklenirken sekme gizlendiyse mikrofon arka planda açık kalmasın.
    if (document.hidden) { stopMic(); els.paused.hidden = false; return; }
    const Ctx = window.AudioContext || window.webkitAudioContext;
    micCtx = new Ctx();
    if (micCtx.state === 'suspended') await micCtx.resume();
    if (!micCtx) return; // beklerken durduruldu (ör. sekme gizlendi)
    const src = micCtx.createMediaStreamSource(micStream);
    const analyser = micCtx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0;
    src.connect(analyser); // hoparlöre bağlanmaz: geri besleme (ıslık) olmaz
    const f32 = new Float32Array(analyser.fftSize);
    const u8 = new Uint8Array(analyser.fftSize);
    const hasFloat = typeof analyser.getFloatTimeDomainData === 'function';

    const t0 = performance.now();
    let lastLoud = t0, lastClipEvent = -1e9, lastText = 0, everLoud = false;
    const clipEvents = []; // ayrı kırpılma olaylarının zamanları
    let peakHold = 0, maxSeen = 0, maxDb = -100;
    setHint('wait');
    setSound('silence');

    const loop = (now) => {
      if (hasFloat) analyser.getFloatTimeDomainData(f32);
      else { analyser.getByteTimeDomainData(u8); for (let i = 0; i < u8.length; i++) f32[i] = (u8[i] - 128) / 128; }
      const { db, peakAbs, peakDb, level } = levelStats(f32);
      peakHold = Math.max(level, peakHold - 0.008);
      maxSeen = Math.max(maxSeen, level);
      maxDb = Math.max(maxDb, db);
      drawMeter(level, peakHold);
      drawWave(f32);
      els.meter.dataset.max = maxSeen.toFixed(3);

      // Sessizlik ve kırpılma değerlendirmesi
      if (db > SILENCE_DB) { lastLoud = now; everLoud = true; }
      // Çakışan analiz pencereleri aynı tepeyi birkaç kez görür; 150 ms içindekileri tek olay say.
      if (peakAbs >= CLIP_LEVEL && now - lastClipEvent > 150) { clipEvents.push(now); lastClipEvent = now; }
      while (clipEvents.length && now - clipEvents[0] > 3000) clipEvents.shift();
      if (clipEvents.length >= 3) setHint('clipping');
      else if (now - lastLoud >= SILENCE_MS) setHint('silent');
      else if (now - t0 >= 300 && everLoud) setHint('ok');
      setSound(everLoud && now - lastLoud < SOUND_HOLD_MS ? 'sound' : 'silence');

      // Metin güncellemesi saniyede ~10 kez (ekran okuyucuyu ve DOM'u yormasın)
      if (now - lastText >= 100) {
        lastText = now;
        els.level.textContent = `Level: ${fmtDb(db)} · peak: ${fmtDb(peakDb)} · highest: ${fmtDb(maxDb)}`;
        els.level.dataset.db = db.toFixed(1);
        els.level.dataset.maxdb = maxDb.toFixed(1);
      }
      micRaf = requestAnimationFrame(loop);
    };
    micRaf = requestAnimationFrame(loop);

    els.stop.disabled = false;
    if (hasRecorder) { els.recToggle.disabled = false; if (!recBlob) setRecStatus('idle', 'Ready. Press "Start recording" and speak for a few seconds.'); }
    const track = micStream.getAudioTracks()[0];
    showInfo(track, micCtx.sampleRate);
    await fillDevices();
    const cur = track && typeof track.getSettings === 'function' && track.getSettings().deviceId;
    if (cur && [...els.device.options].some((o) => o.value === cur)) els.device.value = cur;
  } catch (err) {
    stopMic();
    showError(els.error, mediaErrorMessage(err));
    const n = err && err.name;
    if (isPermissionError(n)) els.permHelp.hidden = false;
    if (n === 'OverconstrainedError' || n === 'ConstraintNotSatisfiedError') { els.device.value = ''; fillDevices().catch(() => {}); }
  } finally {
    els.start.disabled = !hasMedia;
    starting = false;
    if (restartQueued && micStream) startMic(); // açılış sırasında cihaz/işleme değiştiyse yeni ayarlarla yeniden aç
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
  els.level.textContent = 'Microphone off. Start it and speak; the bar should follow your voice.';
  delete els.level.dataset.db;
  setHint('idle');
  setSound('off');
  showInfo(null);
  if (!recBlob && els.recStatus.dataset.state !== 'recording') setRecStatus('idle', 'Start the microphone above first.');
}

els.start.addEventListener('click', startMic);
els.stop.addEventListener('click', stopMic);
// Yeniden başlatma sürerken micStream boştur; o anki değişiklik de (starting) kuyruğa alınır.
els.device.addEventListener('change', () => { if (micStream || starting) startMic(); });
for (const box of [els.optEcho, els.optNoise, els.optAgc]) box.addEventListener('change', () => { if (micStream || starting) startMic(); });
readThemeColors();
if (window.matchMedia) {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  if (mq.addEventListener) mq.addEventListener('change', () => { readThemeColors(); if (!micStream) drawMeter(0, 0); });
}
drawMeter(0, 0);
drawWave(null);

// Sekme gizlenince mikrofonu serbest bırak (tarayıcının mikrofon simgesi boşuna yanmasın).
document.addEventListener('visibilitychange', () => {
  if (document.hidden && micStream) {
    stopMic();
    els.paused.hidden = false;
  }
});

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
  // Önceki kayıt hâlâ kapanıyorsa (stop olayı gelmeden, ör. çift tıklama) yenisi başlamasın:
  // aksi hâlde eski kaydın son parçası yeni kayda karışır ve ikinci kaydedici sahipsiz kalır.
  if (!micStream || !hasRecorder || recorder) return;
  try {
    const mime = pickMime();
    recorder = mime ? new MediaRecorder(micStream, { mimeType: mime }) : new MediaRecorder(micStream);
    recChunks = [];
    recMime = recorder.mimeType || '';
    recorder.addEventListener('dataavailable', (e) => { if (e.data && e.data.size) recChunks.push(e.data); });
    recorder.addEventListener('stop', finishRecording);
    recorder.start(250);
  } catch (err) {
    recorder = null;
    setRecStatus('idle', 'This browser could not start recording. The level test still works; update the browser and try again.');
    return;
  }
  recStartedAt = performance.now();
  els.recToggle.textContent = 'Stop recording';
  els.recResult.classList.remove('is-active');
  els.recResult.hidden = true;
  els.recAudio.pause();
  // #rec-status canlı bölge: ekran okuyucu yalnızca "Recording…" duyar; her 100 ms değişen süre aria-hidden.
  setRecStatus('recording', 'Recording… ');
  const counter = document.createElement('span');
  counter.setAttribute('aria-hidden', 'true');
  els.recStatus.appendChild(counter);
  const tick = () => {
    const s = (performance.now() - recStartedAt) / 1000;
    counter.textContent = `${Math.min(s, MAX_REC_SEC).toFixed(1)} / ${MAX_REC_SEC} s`;
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
  els.recToggle.textContent = 'Start recording';
}

function finishRecording() {
  const secs = (recorder && recorder.recordedMs ? recorder.recordedMs : 0) / 1000;
  recBlob = new Blob(recChunks, { type: recMime || 'audio/webm' });
  recorder = null;
  if (!recBlob.size) { recBlob = null; setRecStatus('idle', 'The recording came out empty. Check that the microphone is on and try again.'); return; }
  if (recUrl) URL.revokeObjectURL(recUrl);
  recUrl = URL.createObjectURL(recBlob);
  els.recAudio.src = recUrl;
  els.recToggle.textContent = 'Start recording';
  setRecStatus('ready', `Recording ready · ${secs.toFixed(1)} s · ${formatBytes(recBlob.size)} · ${extFor(recBlob.type)}`);
  els.recResult.hidden = false;
  els.recResult.classList.add('is-active');
  // Kullanıcı etkileşimi sonrası otomatik dinletme; tarayıcı engellerse oynatıcıdan başlatılır.
  els.recAudio.play().catch(() => {});
}

els.recToggle.addEventListener('click', () => {
  if (recorder && recorder.state === 'recording') stopRecording();
  else startRecording();
});
els.recDownload.addEventListener('click', () => {
  if (!recBlob) return;
  const d = new Date(); const p = (n) => String(n).padStart(2, '0');
  downloadBlob(recBlob, `mic-test-recording-${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}.${extFor(recBlob.type)}`);
});
if (!hasRecorder) {
  els.recToggle.disabled = true;
  setRecStatus('idle', 'This browser cannot record audio, but the level test still works. Try a current version of Chrome, Edge, Firefox or Safari.');
}

// Sayfadan çıkarken mikrofonu serbest bırak
window.addEventListener('pagehide', () => { stopMic(); });
