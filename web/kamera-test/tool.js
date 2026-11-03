// Kamera ve Mikrofon Testi — getUserMedia + Web Audio. Hiçbir veri cihazdan çıkmaz, hiçbir şey kaydedilmez.
import { downloadBlob, showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const els = {
  support: $('support'),
  camDevice: $('cam-device'), camMirror: $('cam-mirror'), camStart: $('cam-start'), camPhoto: $('cam-photo'), camStop: $('cam-stop'),
  camError: $('cam-error'), camStage: $('cam-stage'), camVideo: $('cam-video'), camInfo: $('cam-info'),
  photoBox: $('photo-box'), photoImg: $('photo-img'), photoDownload: $('photo-download'),
  micDevice: $('mic-device'), micStart: $('mic-start'), micStop: $('mic-stop'), micError: $('mic-error'),
  micCanvas: $('mic-canvas'), micLevel: $('mic-level'),
  spkLeft: $('spk-left'), spkRight: $('spk-right'), spkBoth: $('spk-both'), spkInfo: $('spk-info'),
};

let camStream = null;
let micStream = null;
let micCtx = null;
let micRaf = 0;
let photoBlob = null;
let photoUrl = null;
let spkCtx = null;

// ---- Destek kontrolü ------------------------------------------------------------
const hasMedia = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
if (!hasMedia) {
  els.support.textContent = window.isSecureContext === false
    ? 'Kamera ve mikrofon yalnızca güvenli (https) bağlantıda çalışır. Sayfayı https://araclar.bilisimajans.com adresinden açın.'
    : 'Bu tarayıcı kamera ve mikrofon erişimini desteklemiyor. Güncel Chrome, Edge, Firefox veya Safari kullanın.';
  els.support.hidden = false;
  [els.camStart, els.micStart].forEach((b) => { b.disabled = true; });
}

/** getUserMedia hatalarını çözüm öneren Türkçe mesaja çevirir. */
function mediaErrorMessage(err, what) {
  const name = err && err.name;
  const cihaz = what === 'cam' ? 'Kamera' : 'Mikrofon';
  if (name === 'NotAllowedError' || name === 'SecurityError' || name === 'PermissionDeniedError') {
    return `${cihaz} izni verilmedi. Tarayıcı adres çubuğunun solundaki kilit (veya ayarlar) simgesine tıklayın, "${cihaz}" satırını "İzin ver" yapın ve sayfayı yenileyin. Windows'ta Ayarlar → Gizlilik ve güvenlik bölümünden ${cihaz.toLowerCase()} erişiminin açık olduğunu da kontrol edin.`;
  }
  if (name === 'NotFoundError' || name === 'DevicesNotFoundError' || name === 'OverconstrainedError') {
    return `${cihaz} bulunamadı. Cihazın takılı olduğundan emin olun, listeden başka bir cihaz seçin ya da USB kablosunu çıkarıp yeniden takın.`;
  }
  if (name === 'NotReadableError' || name === 'TrackStartError' || name === 'AbortError') {
    return `${cihaz} şu an başka bir uygulama tarafından kullanılıyor olabilir. Zoom, Teams gibi uygulamaları ve ${cihaz.toLowerCase()} kullanan diğer sekmeleri kapatıp tekrar deneyin.`;
  }
  return `${cihaz} başlatılamadı. Sayfayı yenileyip tekrar deneyin; sorun sürerse tarayıcıyı yeniden başlatın.`;
}

/** Cihaz listesini doldurur (izin verildikten sonra adlar görünür). */
async function fillDevices() {
  if (!navigator.mediaDevices.enumerateDevices) return;
  const list = await navigator.mediaDevices.enumerateDevices();
  const fill = (select, kind, fallback) => {
    const keep = select.value;
    select.textContent = '';
    const first = document.createElement('option');
    first.value = ''; first.textContent = fallback;
    select.appendChild(first);
    list.filter((d) => d.kind === kind).forEach((d, i) => {
      const o = document.createElement('option');
      o.value = d.deviceId;
      o.textContent = d.label || `${kind === 'videoinput' ? 'Kamera' : 'Mikrofon'} ${i + 1}`;
      select.appendChild(o);
    });
    if ([...select.options].some((o) => o.value === keep)) select.value = keep;
  };
  fill(els.camDevice, 'videoinput', 'Varsayılan kamera');
  fill(els.micDevice, 'audioinput', 'Varsayılan mikrofon');
}
if (hasMedia) fillDevices().catch(() => {});

// ---- Kamera ---------------------------------------------------------------------
function stopStream(s) { if (s) s.getTracks().forEach((t) => t.stop()); }

function updateCamInfo() {
  const v = els.camVideo;
  const track = camStream && camStream.getVideoTracks()[0];
  if (!track) return;
  const st = track.getSettings ? track.getSettings() : {};
  const w = v.videoWidth || st.width || 0, h = v.videoHeight || st.height || 0;
  const fps = st.frameRate ? `${Math.round(st.frameRate)} kare/sn` : 'kare hızı bilinmiyor';
  els.camInfo.textContent = `${track.label || 'Kamera'} · ${w}×${h} · ${fps}`;
  els.camInfo.dataset.width = String(w);
}

async function startCamera() {
  showError(els.camError, '');
  stopCamera();
  els.camStart.disabled = true;
  try {
    const id = els.camDevice.value;
    const video = id ? { deviceId: { exact: id } } : true;
    camStream = await navigator.mediaDevices.getUserMedia({ video, audio: false });
    els.camVideo.srcObject = camStream;
    els.camStage.hidden = false;
    await els.camVideo.play().catch(() => {});
    updateCamInfo();
    els.camVideo.addEventListener('loadedmetadata', updateCamInfo, { once: true });
    els.camPhoto.disabled = false;
    els.camStop.disabled = false;
    await fillDevices();
    const cur = camStream.getVideoTracks()[0].getSettings().deviceId;
    if (cur && [...els.camDevice.options].some((o) => o.value === cur)) els.camDevice.value = cur;
  } catch (err) {
    showError(els.camError, mediaErrorMessage(err, 'cam'));
  } finally {
    els.camStart.disabled = false;
  }
}
function stopCamera() {
  stopStream(camStream); camStream = null;
  els.camVideo.srcObject = null;
  els.camStage.hidden = true;
  els.camPhoto.disabled = true; els.camStop.disabled = true;
}

function takePhoto() {
  const v = els.camVideo;
  if (!v.videoWidth) { showError(els.camError, 'Görüntü henüz hazır değil. Bir iki saniye bekleyip tekrar deneyin.'); return; }
  const c = document.createElement('canvas');
  c.width = v.videoWidth; c.height = v.videoHeight;
  const ctx = c.getContext('2d');
  if (els.camMirror.checked) { ctx.translate(c.width, 0); ctx.scale(-1, 1); }
  ctx.drawImage(v, 0, 0);
  c.toBlob((blob) => {
    if (!blob) { showError(els.camError, 'Fotoğraf oluşturulamadı. Tarayıcıyı güncelleyip tekrar deneyin.'); return; }
    photoBlob = blob;
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    photoUrl = URL.createObjectURL(blob);
    els.photoImg.src = photoUrl;
    els.photoBox.hidden = false;
  }, 'image/png');
}

els.camStart.addEventListener('click', startCamera);
els.camStop.addEventListener('click', stopCamera);
els.camPhoto.addEventListener('click', takePhoto);
els.camMirror.addEventListener('change', () => els.camVideo.classList.toggle('is-mirror', els.camMirror.checked));
els.photoDownload.addEventListener('click', () => {
  if (!photoBlob) return;
  const d = new Date(); const p = (n) => String(n).padStart(2, '0');
  downloadBlob(photoBlob, `kamera-testi-${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}.png`);
});

// ---- Mikrofon seviye göstergesi ---------------------------------------------------
function drawMeter(level, peak) {
  const c = els.micCanvas, ctx = c.getContext('2d');
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

async function startMic() {
  showError(els.micError, '');
  stopMic();
  els.micStart.disabled = true;
  try {
    const id = els.micDevice.value;
    micStream = await navigator.mediaDevices.getUserMedia({ audio: id ? { deviceId: { exact: id } } : true, video: false });
    const Ctx = window.AudioContext || window.webkitAudioContext;
    micCtx = new Ctx();
    if (micCtx.state === 'suspended') await micCtx.resume();
    const src = micCtx.createMediaStreamSource(micStream);
    const analyser = micCtx.createAnalyser();
    analyser.fftSize = 1024;
    src.connect(analyser); // hoparlöre bağlanmaz: geri besleme (ıslık) olmaz
    const buf = new Uint8Array(analyser.fftSize);
    let peak = 0, maxSeen = 0;
    const loop = () => {
      analyser.getByteTimeDomainData(buf);
      let sum = 0;
      for (let i = 0; i < buf.length; i++) { const v = (buf[i] - 128) / 128; sum += v * v; }
      const rms = Math.sqrt(sum / buf.length);
      // dB ölçeği: -60 dB .. 0 dB → 0..1
      const db = 20 * Math.log10(Math.max(rms, 1e-5));
      const level = Math.max(0, Math.min(1, (db + 60) / 60));
      peak = Math.max(level, peak - 0.01);
      maxSeen = Math.max(maxSeen, level);
      drawMeter(level, peak);
      els.micLevel.textContent = `Seviye: ${Math.round(level * 100)} / 100 · en yüksek: ${Math.round(maxSeen * 100)}`;
      els.micCanvas.dataset.max = String(maxSeen.toFixed(3));
      micRaf = requestAnimationFrame(loop);
    };
    loop();
    els.micStop.disabled = false;
    await fillDevices();
  } catch (err) {
    showError(els.micError, mediaErrorMessage(err, 'mic'));
  } finally {
    els.micStart.disabled = false;
  }
}
function stopMic() {
  cancelAnimationFrame(micRaf);
  stopStream(micStream); micStream = null;
  if (micCtx) { micCtx.close().catch(() => {}); micCtx = null; }
  els.micStop.disabled = true;
  drawMeter(0, 0);
  els.micLevel.textContent = 'Mikrofon kapalı. Başlatınca konuşun; çubuk sesinize göre dolmalı.';
}
els.micStart.addEventListener('click', startMic);
els.micStop.addEventListener('click', stopMic);
drawMeter(0, 0);

// ---- Hoparlör testi ------------------------------------------------------------------
async function playTone(pan, label) {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) { els.spkInfo.textContent = 'Bu tarayıcı ses üretimini (Web Audio) desteklemiyor. Tarayıcınızı güncelleyin.'; return; }
  if (!spkCtx) spkCtx = new Ctx();
  if (spkCtx.state === 'suspended') await spkCtx.resume();
  const t = spkCtx.currentTime;
  const osc = spkCtx.createOscillator();
  const gain = spkCtx.createGain();
  osc.type = 'sine'; osc.frequency.value = 440;
  // Tık sesi olmasın diye kısa yükselme/sönme
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.25, t + 0.04);
  gain.gain.setValueAtTime(0.25, t + 0.7);
  gain.gain.linearRampToValueAtTime(0, t + 0.8);
  osc.connect(gain);
  if (spkCtx.createStereoPanner) {
    const p = spkCtx.createStereoPanner(); p.pan.value = pan;
    gain.connect(p); p.connect(spkCtx.destination);
  } else {
    gain.connect(spkCtx.destination); // eski tarayıcı: kanal ayrımı yapılamaz
  }
  osc.start(t); osc.stop(t + 0.85);
  els.spkInfo.textContent = `${label} çalındı. Sesi duymadıysanız cihaz ses düzeyini ve çıkış cihazını kontrol edin.`;
  els.spkInfo.dataset.played = String((Number(els.spkInfo.dataset.played) || 0) + 1);
}
els.spkLeft.addEventListener('click', () => playTone(-1, 'Sol kanal'));
els.spkRight.addEventListener('click', () => playTone(1, 'Sağ kanal'));
els.spkBoth.addEventListener('click', () => playTone(0, 'İki kanal'));

// Sayfadan çıkarken cihazları serbest bırak
window.addEventListener('pagehide', () => { stopCamera(); stopMic(); });
