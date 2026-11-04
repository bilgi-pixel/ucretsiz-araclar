// Webcam Test (EN) — getUserMedia ile canlı önizleme, gerçek çözünürlük, ölçülen FPS, parlaklık,
// kamera yetenekleri, PNG anlık görüntü ve kısa mikrofon seviye kontrolü.
// Görüntü ve ses hiçbir yere gönderilmez; anlık görüntü yalnızca bellekte tutulur (kullanıcı indirmedikçe diske yazılmaz).
import { downloadBlob, showError, formatBytes } from '../../assets/js/ba.js';

// ---- Saf yardımcılar (testlerde bilinen değerlerle doğrulanır) ------------------------
/** Çözünürlük ön ayarları: genişlik × yükseklik (yatay). */
export const PRESETS = {
  auto: null,
  480: { w: 640, h: 480, label: '480p' },
  720: { w: 1280, h: 720, label: '720p' },
  1080: { w: 1920, h: 1080, label: '1080p' },
  2160: { w: 3840, h: 2160, label: '4K' },
};
/** OverconstrainedError gelince inilecek basamaklar (yüksekten düşüğe). */
export const LADDER = ['2160', '1080', '720', '480', 'auto'];

/** Bir alt ön ayar; en alttaysa null. */
export function nextPreset(p) {
  const i = LADDER.indexOf(String(p));
  return i < 0 || i >= LADDER.length - 1 ? null : LADDER[i + 1];
}

/** Ön ayar adını okunur metne çevirir. */
export function presetLabel(p) {
  const x = PRESETS[p];
  return x ? x.label : 'the camera default';
}

/** getUserMedia için video kısıtları. Ön ayar yalnızca "ideal" verilir: kamera desteklemezse en yakın modu seçer. */
export function buildVideoConstraints(preset, { deviceId = '', facing = '' } = {}) {
  const v = {};
  const p = PRESETS[preset];
  if (p) { v.width = { ideal: p.w }; v.height = { ideal: p.h }; }
  if (deviceId) v.deviceId = { exact: deviceId };
  else if (facing) v.facingMode = { ideal: facing };
  return Object.keys(v).length ? v : true;
}

function gcd(a, b) { while (b) [a, b] = [b, a % b]; return a; }
const COMMON_RATIOS = [[16, 9], [4, 3], [3, 2], [16, 10], [5, 4], [1, 1], [21, 9], [9, 16], [3, 4], [2, 3], [10, 16], [4, 5]];

/** En-boy oranı: 640×480 → "4:3", 1366×768 → "≈16:9", 1920×1200 → "16:10". */
export function aspectRatio(w, h) {
  if (!(w > 0 && h > 0)) return '–';
  const g = gcd(w, h);
  const a = w / g, b = h / g;
  if (a === 8 && b === 5) return '16:10';
  if (a === 5 && b === 8) return '10:16';
  if (a <= 32 && b <= 32) return `${a}:${b}`;
  const r = w / h;
  let best = '', bestErr = Infinity;
  for (const [x, y] of COMMON_RATIOS) {
    const e = Math.abs(r - x / y) / (x / y);
    if (e < bestErr) { bestErr = e; best = `${x}:${y}`; }
  }
  return bestErr <= 0.02 ? `≈${best}` : `${r.toFixed(2)}:1`;
}

/** Kısa kenara göre sınıf: 640×480 → "480p (SD)", 1920×1080 → "1080p (Full HD)". Dikey görüntüde de doğru çalışır. */
export function resolutionClass(w, h) {
  if (!(w > 0 && h > 0)) return '–';
  const s = Math.min(w, h);
  const tier = s >= 2160 ? '4K UHD' : s >= 1440 ? 'QHD' : s >= 1080 ? 'Full HD' : s >= 720 ? 'HD' : s >= 480 ? 'SD' : 'low resolution';
  return `${s}p (${tier})`;
}

/** Megapiksel: 1920×1080 → "2.07 MP". */
export function megapixels(w, h) {
  if (!(w > 0 && h > 0)) return '–';
  return `${(w * h / 1e6).toFixed(2)} MP`;
}

/** Kare hızı metni: 29.97 → "30.0 fps". */
export function fmtFps(n) {
  return n > 0 ? `${n.toFixed(1)} fps` : '–';
}

/** İstenen ön ayardan düşük çözünürlük geldiyse açıklama; değilse boş metin. */
export function deliveredNote(preset, w, h) {
  const p = PRESETS[preset];
  if (!p || !(w > 0 && h > 0)) return '';
  if (Math.min(w, h) >= p.h * 0.95) return '';
  return `You asked for ${p.label}, but the camera delivered ${w}×${h}. That is usually the highest mode this camera offers, or a limit of its USB connection.`;
}

/** Ortalama parlaklık (0..1) etiketi. */
export function lightLabel(l) {
  if (!(l >= 0)) return '–';
  const pct = `${Math.round(l * 100)}%`;
  if (l < 0.08) return `${pct} (almost black)`;
  if (l < 0.25) return `${pct} (dim)`;
  if (l > 0.85) return `${pct} (very bright)`;
  return `${pct} (good)`;
}

/** Ses örneklerinden dBFS ve 0..1 çubuk seviyesi (-60 dB → 0, 0 dB → 1). */
export function micLevel(samples) {
  let sum = 0;
  for (let i = 0; i < samples.length; i++) sum += samples[i] * samples[i];
  const rms = samples.length ? Math.sqrt(sum / samples.length) : 0;
  const db = 20 * Math.log10(Math.max(rms, 1e-5));
  return { db, level: Math.max(0, Math.min(1, (db + 60) / 60)) };
}

// ---- Sayfa ------------------------------------------------------------------------
const $ = (id) => document.getElementById(id);
const els = {
  support: $('support'), device: $('device'), res: $('res'),
  start: $('start'), stop: $('stop'), snap: $('snap'), mirror: $('mirror'), grid: $('grid'), flip: $('flip'),
  error: $('error'), help: $('help'), stage: $('stage'), video: $('video'), gridOverlay: $('grid-overlay'), note: $('note'),
  result: $('result'), rCamera: $('r-camera'), rRes: $('r-res'), rAspect: $('r-aspect'), rClass: $('r-class'), rMp: $('r-mp'),
  rReq: $('r-req'), rFpsSet: $('r-fps-set'), rFps: $('r-fps'), rLight: $('r-light'), rFacing: $('r-facing'),
  caps: $('caps'), capsNote: $('caps-note'), zoomBox: $('zoom-box'), zoom: $('zoom'), zoomVal: $('zoom-val'),
  torchBox: $('torch-box'), torch: $('torch'),
  shotBox: $('shot-box'), shotImg: $('shot-img'), shotInfo: $('shot-info'), shotDownload: $('shot-download'),
  micStart: $('mic-start'), micStop: $('mic-stop'), micError: $('mic-error'), micBar: $('mic-bar'), micFill: $('mic-fill'), micText: $('mic-level'),
};

let stream = null;
let busy = false;
let activePreset = '720';
let fallbackMsg = '';
let facing = 'user';
let fpsHandle = 0;
let fpsRaf = 0;
let lightTimer = 0;
let shotBlob = null;
let shotUrl = null;
let micStream = null;
let micCtx = null;
let micRaf = 0;
let micMax = 0;
const lightCanvas = document.createElement('canvas');
lightCanvas.width = 32; lightCanvas.height = 24;

const hasMedia = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
if (!hasMedia) {
  els.support.textContent = window.isSecureContext === false
    ? 'The camera only works on a secure (https) connection. Open this page at https://araclar.bilisimajans.com/en/webcam-test/.'
    : 'This browser does not support camera access. Use a current version of Chrome, Edge, Firefox or Safari.';
  els.support.hidden = false;
  [els.start, els.micStart].forEach((b) => { b.disabled = true; });
}

// Dokunmatik cihazlarda ön/arka kamera düğmesi
const coarse = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
els.flip.hidden = !coarse;

// İzin yardım kutusunda kullanıcının sistemini işaretle
(function markOs() {
  const ua = navigator.userAgent || '';
  const os = /Android/i.test(ua) ? 'android'
    : (/iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) ? 'ios'
      : /Windows/i.test(ua) ? 'windows' : /Mac OS X|Macintosh/i.test(ua) ? 'macos' : '';
  const li = os && els.help.querySelector(`[data-os="${os}"]`);
  if (li) {
    li.classList.add('is-current');
    const tag = document.createElement('span');
    tag.className = 'wt-you';
    tag.textContent = ' (your system)';
    li.querySelector('strong').appendChild(tag);
  }
})();

/** getUserMedia hatasını çözüm öneren İngilizce mesaja çevirir. */
function mediaErrorMessage(err, what = 'camera') {
  const name = err && err.name;
  const Dev = what === 'camera' ? 'Camera' : 'Microphone';
  if (name === 'NotAllowedError' || name === 'SecurityError' || name === 'PermissionDeniedError') {
    // Kamera için ayrıntılı yardım kutusu açılır; mikrofonun sistem ayarı doğrudan mesajda (kutu kamera adımlarını anlatır)
    const sys = what === 'camera'
      ? 'If the browser already allows it, check the system privacy settings below.'
      : 'If the browser already allows it, turn on microphone access in Windows Settings → Privacy & security → Microphone, or in macOS System Settings → Privacy & Security → Microphone, then restart the browser.';
    return `${Dev} access was blocked. Click the lock or site settings icon to the left of the address bar, set ${Dev} to "Allow" and reload the page. ${sys}`;
  }
  if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
    return `No ${what} was found. Check that it is plugged in (try another USB port) and that a laptop ${what} is not switched off with a function key${what === 'camera' ? ', then pick another device from the list' : ''}.`;
  }
  if (name === 'NotReadableError' || name === 'TrackStartError' || name === 'AbortError') {
    return `The ${what} could not be started. It is probably in use by another app or browser tab (a video-call app, streaming software or another tab), or it is turned off by a privacy switch. Close the other apps and tabs, then try again.`;
  }
  if (name === 'OverconstrainedError' || name === 'ConstraintNotSatisfiedError') {
    return `The ${what} could not deliver any of the requested settings. Choose "Camera default" and try again.`;
  }
  return `The ${what} could not be started. Reload the page and try again; if it keeps failing, restart the browser.`;
}

function isPermissionError(err) {
  const n = err && err.name;
  return n === 'NotAllowedError' || n === 'SecurityError' || n === 'PermissionDeniedError';
}

/** Kamera listesini doldurur (izin verildikten sonra adlar görünür). */
async function fillDevices() {
  if (!hasMedia || !navigator.mediaDevices.enumerateDevices) return;
  const list = await navigator.mediaDevices.enumerateDevices();
  const keep = els.device.value;
  els.device.textContent = '';
  const first = document.createElement('option');
  first.value = ''; first.textContent = 'Default camera';
  els.device.appendChild(first);
  list.filter((d) => d.kind === 'videoinput' && d.deviceId).forEach((d, i) => {
    const o = document.createElement('option');
    o.value = d.deviceId;
    o.textContent = d.label || `Camera ${i + 1}`;
    els.device.appendChild(o);
  });
  if ([...els.device.options].some((o) => o.value === keep)) els.device.value = keep;
}
if (hasMedia) {
  fillDevices().catch(() => {});
  if (navigator.mediaDevices.addEventListener) navigator.mediaDevices.addEventListener('devicechange', () => fillDevices().catch(() => {}));
}

function setNote(msg) {
  els.note.textContent = msg;
  els.note.hidden = !msg;
}
const HIDDEN_NOTE = 'The camera and microphone were stopped because the tab was hidden, so they do not keep running in the background. Press "Start camera" to continue.';

function currentTrack() { return stream ? stream.getVideoTracks()[0] : null; }

function updateStats() {
  const track = currentTrack();
  if (!track) return;
  const st = track.getSettings ? track.getSettings() : {};
  const w = els.video.videoWidth || st.width || 0;
  const h = els.video.videoHeight || st.height || 0;
  els.rCamera.textContent = track.label || 'Camera';
  els.rRes.textContent = w && h ? `${w}×${h}` : 'Waiting for the first frame…';
  els.rRes.dataset.width = String(w);
  els.rRes.dataset.height = String(h);
  els.rAspect.textContent = aspectRatio(w, h);
  els.rClass.textContent = resolutionClass(w, h);
  els.rMp.textContent = megapixels(w, h);
  const p = PRESETS[activePreset];
  els.rReq.textContent = p ? `${p.label} (${p.w}×${p.h})` : 'Camera default';
  els.rFpsSet.textContent = st.frameRate ? fmtFps(st.frameRate) : 'Not reported';
  els.rFacing.textContent = st.facingMode === 'user' ? 'Front (user)' : st.facingMode === 'environment' ? 'Back (environment)' : (st.facingMode || 'Not reported');
  setNote([fallbackMsg, deliveredNote(activePreset, w, h)].filter(Boolean).join(' '));
}

// ---- Kare hızı ölçümü -------------------------------------------------------------------
function reportFps(fps, method) {
  els.rFps.textContent = `${fmtFps(fps)} · ${method}`;
  els.rFps.dataset.fps = fps.toFixed(2);
}
function startFpsMeter() {
  stopFpsMeter();
  const v = els.video;
  els.rFps.textContent = 'Measuring…';
  els.rFps.dataset.fps = '0';
  if (typeof v.requestVideoFrameCallback === 'function') {
    // Tarayıcının gösterdiği gerçek kareleri sayar (presentedFrames)
    let f0 = null, t0 = 0;
    const cb = (now, meta) => {
      if (!stream) return;
      if (f0 === null) { f0 = meta.presentedFrames; t0 = now; }
      else if (now - t0 >= 1000) {
        reportFps((meta.presentedFrames - f0) * 1000 / (now - t0), 'measured from frames shown');
        f0 = meta.presentedFrames; t0 = now;
      }
      fpsHandle = v.requestVideoFrameCallback(cb);
    };
    fpsHandle = v.requestVideoFrameCallback(cb);
  } else {
    // Yedek: görüntü zamanının değiştiği ekran karelerini sayar (tahmini)
    let last = -1, frames = 0, t0 = performance.now();
    const loop = (now) => {
      if (!stream) return;
      if (v.currentTime !== last) { last = v.currentTime; frames++; }
      if (now - t0 >= 1000) { reportFps(frames * 1000 / (now - t0), 'estimate'); frames = 0; t0 = now; }
      fpsRaf = requestAnimationFrame(loop);
    };
    fpsRaf = requestAnimationFrame(loop);
  }
}
function stopFpsMeter() {
  if (fpsHandle && typeof els.video.cancelVideoFrameCallback === 'function') els.video.cancelVideoFrameCallback(fpsHandle);
  fpsHandle = 0;
  cancelAnimationFrame(fpsRaf); fpsRaf = 0;
}

// ---- Parlaklık (ortalama ışık) ------------------------------------------------------------
function sampleLight() {
  const v = els.video;
  if (!stream || !v.videoWidth) return;
  try {
    const ctx = lightCanvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(v, 0, 0, lightCanvas.width, lightCanvas.height);
    const d = ctx.getImageData(0, 0, lightCanvas.width, lightCanvas.height).data;
    let sum = 0;
    for (let i = 0; i < d.length; i += 4) sum += 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
    const l = sum / (d.length / 4) / 255;
    els.rLight.textContent = lightLabel(l);
    els.rLight.dataset.luma = l.toFixed(3);
  } catch { /* bazı tarayıcılar karesiz anda çizim yapamaz */ }
}

// ---- Yetenekler (getCapabilities) -------------------------------------------------------
function addCap(dt, dd) {
  const a = document.createElement('dt'); a.textContent = dt;
  const b = document.createElement('dd'); b.textContent = dd;
  els.caps.append(a, b);
}
function renderCaps(track) {
  els.caps.textContent = '';
  els.zoomBox.hidden = true; els.torchBox.hidden = true;
  const caps = track && typeof track.getCapabilities === 'function' ? track.getCapabilities() : null;
  if (!caps || !Object.keys(caps).length) {
    els.capsNote.textContent = 'Your browser does not report camera capabilities. Chrome and Edge show the most detail.';
    return;
  }
  els.capsNote.textContent = 'Reported by your browser for this camera. Not every camera or browser reports every field.';
  if (caps.width && caps.height && caps.width.max && caps.height.max) addCap('Maximum resolution', `${caps.width.max}×${caps.height.max}`);
  if (caps.frameRate && caps.frameRate.max) addCap('Maximum frame rate', fmtFps(caps.frameRate.max));
  if (caps.facingMode && caps.facingMode.length) addCap('Facing', caps.facingMode.join(', '));
  if (caps.focusMode && caps.focusMode.length) addCap('Focus modes', caps.focusMode.join(', '));
  if (caps.exposureMode && caps.exposureMode.length) addCap('Exposure modes', caps.exposureMode.join(', '));
  if (caps.whiteBalanceMode && caps.whiteBalanceMode.length) addCap('White balance modes', caps.whiteBalanceMode.join(', '));
  if (caps.zoom && caps.zoom.max > caps.zoom.min) addCap('Zoom', `${caps.zoom.min}× – ${caps.zoom.max}×`);
  if ('torch' in caps) addCap('Torch (flash light)', caps.torch ? 'Yes' : 'No');
  if (!els.caps.children.length) els.capsNote.textContent = 'Your browser did not report any details for this camera.';
  const st = track.getSettings ? track.getSettings() : {};
  if (caps.zoom && caps.zoom.max > caps.zoom.min) {
    els.zoom.min = String(caps.zoom.min);
    els.zoom.max = String(caps.zoom.max);
    els.zoom.step = String(caps.zoom.step || 0.1);
    els.zoom.value = String(st.zoom || caps.zoom.min);
    els.zoomVal.textContent = `${Number(els.zoom.value).toFixed(1)}×`;
    els.zoomBox.hidden = false;
  }
  if (caps.torch === true || (Array.isArray(caps.torch) && caps.torch.includes(true))) {
    els.torch.checked = !!st.torch;
    els.torchBox.hidden = false;
  }
}

// ---- Kamera ---------------------------------------------------------------------------
function stopStream(s) { if (s) s.getTracks().forEach((t) => t.stop()); }

function stopCamera() {
  stopFpsMeter();
  clearInterval(lightTimer); lightTimer = 0;
  stopStream(stream); stream = null;
  els.video.srcObject = null;
  els.stage.hidden = true;
  els.result.hidden = true;
  els.result.classList.remove('is-active');
  els.snap.disabled = true;
  els.stop.disabled = true;
}

async function startCamera() {
  if (busy || !hasMedia) return;
  busy = true;
  showError(els.error, '');
  els.help.hidden = true;
  setNote('');
  stopCamera();
  els.start.disabled = true;
  const requested = els.res.value;
  let preset = requested;
  let deviceId = els.device.value;
  const notes = [];
  try {
    for (;;) {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: buildVideoConstraints(preset, { deviceId, facing: coarse ? facing : '' }), audio: false });
        break;
      } catch (err) {
        if (!err || err.name !== 'OverconstrainedError') throw err;
        if (deviceId && err.constraint === 'deviceId') {
          // Seçilen kamera artık yok: varsayılan kamerayla dene
          deviceId = '';
          notes.push('The selected camera is no longer available, so the default camera was used.');
          continue;
        }
        const next = nextPreset(preset);
        if (!next) throw err;
        preset = next;
      }
    }
    // İzin penceresi beklenirken sekme gizlendiyse kamera arka planda açık kalmasın
    if (document.visibilityState === 'hidden') { stopCamera(); setNote(HIDDEN_NOTE); return; }
    if (preset !== requested) notes.push(`Your camera could not deliver ${presetLabel(requested)}, so the test fell back to ${presetLabel(preset)}.`);
    activePreset = preset;
    fallbackMsg = notes.join(' ');
    els.video.srcObject = stream;
    els.video.classList.toggle('is-mirror', els.mirror.getAttribute('aria-pressed') === 'true');
    els.stage.hidden = false;
    await els.video.play().catch(() => {});
    if (!stream) return; // oynatma beklenirken durduruldu (ör. sekme gizlendi): sonuç kutusunu açma
    els.result.hidden = false;
    els.result.classList.add('is-active');
    els.snap.disabled = false;
    els.stop.disabled = false;
    updateStats();
    renderCaps(currentTrack());
    startFpsMeter();
    els.rLight.textContent = 'Measuring…';
    lightTimer = setInterval(sampleLight, 1000);
    const track = currentTrack();
    if (track) {
      track.addEventListener('ended', () => {
        if (currentTrack() !== track) return;
        stopCamera();
        setNote('The camera was disconnected or turned off. Plug it back in and press "Start camera".');
      });
    }
    await fillDevices().catch(() => {});
    const cur = track && track.getSettings ? track.getSettings().deviceId : '';
    if (cur && [...els.device.options].some((o) => o.value === cur)) els.device.value = cur;
  } catch (err) {
    stopCamera();
    showError(els.error, mediaErrorMessage(err, 'camera'));
    if (isPermissionError(err)) els.help.hidden = false;
  } finally {
    els.start.disabled = !hasMedia;
    busy = false;
  }
}

els.video.addEventListener('loadedmetadata', updateStats);
els.video.addEventListener('resize', updateStats);

function restartIfRunning() { if (stream) startCamera(); }
els.start.addEventListener('click', startCamera);
els.stop.addEventListener('click', () => { stopCamera(); setNote(''); });
els.device.addEventListener('change', restartIfRunning);
els.res.addEventListener('change', restartIfRunning);

function setPressed(btn, on) { btn.setAttribute('aria-pressed', on ? 'true' : 'false'); }
els.mirror.addEventListener('click', () => {
  const on = els.mirror.getAttribute('aria-pressed') !== 'true';
  setPressed(els.mirror, on);
  els.video.classList.toggle('is-mirror', on);
});
els.grid.addEventListener('click', () => {
  const on = els.grid.getAttribute('aria-pressed') !== 'true';
  setPressed(els.grid, on);
  // SVG öğelerinde .hidden özelliği yok; özniteliği doğrudan değiştir
  els.gridOverlay.toggleAttribute('hidden', !on);
});
els.flip.addEventListener('click', () => {
  facing = facing === 'user' ? 'environment' : 'user';
  els.device.value = '';
  // Arka kamera aynalanmaz; ön kamera ayna görüntüsüyle açılır
  setPressed(els.mirror, facing === 'user');
  els.video.classList.toggle('is-mirror', facing === 'user');
  if (stream) startCamera();
});

els.zoom.addEventListener('input', () => {
  els.zoomVal.textContent = `${Number(els.zoom.value).toFixed(1)}×`;
  const t = currentTrack();
  if (t && t.applyConstraints) t.applyConstraints({ advanced: [{ zoom: Number(els.zoom.value) }] }).catch(() => {});
});
els.torch.addEventListener('change', () => {
  const t = currentTrack();
  if (t && t.applyConstraints) t.applyConstraints({ advanced: [{ torch: els.torch.checked }] }).catch(() => { els.torch.checked = false; });
});

// ---- Anlık görüntü ---------------------------------------------------------------------
function takeSnapshot() {
  const v = els.video;
  if (!v.videoWidth) { showError(els.error, 'The picture is not ready yet. Wait a second and try again.'); return; }
  const c = document.createElement('canvas');
  c.width = v.videoWidth; c.height = v.videoHeight;
  const ctx = c.getContext('2d');
  // Önizlemede ne görülüyorsa o kaydedilir (ayna açıksa ayna görüntüsü)
  if (els.mirror.getAttribute('aria-pressed') === 'true') { ctx.translate(c.width, 0); ctx.scale(-1, 1); }
  ctx.drawImage(v, 0, 0);
  c.toBlob((blob) => {
    if (!blob) { showError(els.error, 'The snapshot could not be created. Update your browser and try again.'); return; }
    shotBlob = blob;
    if (shotUrl) URL.revokeObjectURL(shotUrl);
    shotUrl = URL.createObjectURL(blob);
    els.shotImg.src = shotUrl;
    els.shotInfo.textContent = `${c.width}×${c.height} PNG · ${formatBytes(blob.size)} · kept in this tab only`;
    els.shotBox.hidden = false;
  }, 'image/png');
}
els.snap.addEventListener('click', takeSnapshot);
els.shotDownload.addEventListener('click', () => {
  if (!shotBlob) return;
  const d = new Date(); const p = (n) => String(n).padStart(2, '0');
  downloadBlob(shotBlob, `webcam-test-${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}.png`);
});

// ---- Mikrofon kısa kontrolü ---------------------------------------------------------------
function stopMic() {
  cancelAnimationFrame(micRaf); micRaf = 0;
  stopStream(micStream); micStream = null;
  if (micCtx) { micCtx.close().catch(() => {}); micCtx = null; }
  els.micStop.disabled = true;
  els.micFill.style.width = '0%';
  els.micText.textContent = 'Microphone off. Start it and speak; the bar should follow your voice.';
}
async function startMic() {
  if (!hasMedia) return;
  showError(els.micError, '');
  stopMic();
  els.micStart.disabled = true;
  try {
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    // İzin penceresi beklenirken sekme gizlendiyse mikrofon arka planda açık kalmasın
    if (document.visibilityState === 'hidden') { stopMic(); setNote(HIDDEN_NOTE); return; }
    const Ctx = window.AudioContext || window.webkitAudioContext;
    micCtx = new Ctx();
    if (micCtx.state === 'suspended') await micCtx.resume().catch(() => {});
    if (!micStream) return; // beklerken durduruldu (ör. sekme gizlendi)
    const src = micCtx.createMediaStreamSource(micStream);
    const analyser = micCtx.createAnalyser();
    analyser.fftSize = 1024;
    src.connect(analyser); // hoparlöre bağlanmaz: geri besleme olmaz
    const buf = new Float32Array(analyser.fftSize);
    micMax = 0;
    const loop = () => {
      analyser.getFloatTimeDomainData(buf);
      const { db, level } = micLevel(buf);
      micMax = Math.max(micMax, level);
      els.micFill.style.width = `${Math.round(level * 100)}%`;
      els.micText.textContent = `Level: ${db > -90 ? Math.round(db) : '< -90'} dBFS · loudest so far: ${Math.round(micMax * 100)} / 100`;
      els.micBar.dataset.max = micMax.toFixed(3);
      micRaf = requestAnimationFrame(loop);
    };
    loop();
    els.micStop.disabled = false;
  } catch (err) {
    stopMic();
    showError(els.micError, mediaErrorMessage(err, 'microphone'));
  } finally {
    els.micStart.disabled = !hasMedia;
  }
}
els.micStart.addEventListener('click', startMic);
els.micStop.addEventListener('click', stopMic);

// Sekme gizlenince kamera ve mikrofon arka planda açık kalmasın
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState !== 'hidden') return;
  const had = !!stream || !!micStream;
  stopCamera();
  stopMic();
  if (had) setNote(HIDDEN_NOTE);
});
window.addEventListener('pagehide', () => { stopCamera(); stopMic(); });
