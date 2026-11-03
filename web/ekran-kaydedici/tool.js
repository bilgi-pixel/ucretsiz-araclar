// Ekran Kaydedici — getDisplayMedia + MediaRecorder, kütüphane yok.
// Görüntü ve ses yalnızca tarayıcı belleğinde parça parça tutulur; hiçbir yere gönderilmez.
import { setProgress, downloadBlob, formatBytes, showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const els = {
  support: $('support'), supportText: $('support-text'), options: $('options'),
  sysAudio: $('opt-sysaudio'), mic: $('opt-mic'), res: $('opt-res'), fps: $('opt-fps'), countdown: $('opt-countdown'),
  start: $('start'), pause: $('pause'), stop: $('stop'), controls: $('controls'),
  live: $('live-panel'), liveVideo: $('live'), timer: $('timer'), sizeLive: $('size-live'), state: $('rec-state'),
  countdownBox: $('countdown'), memWarn: $('mem-warn'), micWarn: $('mic-warn'),
  progress: $('progress'), error: $('error'),
  result: $('result'), preview: $('preview'), resMeta: $('result-meta'), download: $('download'), again: $('again'),
};

const MEM_WARN_BYTES = 2 * 1024 * 1024 * 1024; // 2 GB: tarayıcı belleği için üst sınır uyarısı
const TIMESLICE_MS = 1000;

// Tercih sırasına göre ilk desteklenen MIME türü; Chrome/Edge/Firefox → WebM, Safari → MP4.
const MIME_CANDIDATES = [
  'video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm;codecs=vp9', 'video/webm;codecs=vp8',
  'video/webm', 'video/mp4;codecs=avc1,mp4a.40.2', 'video/mp4',
];
function pickMime() {
  if (!window.MediaRecorder || typeof MediaRecorder.isTypeSupported !== 'function') return '';
  return MIME_CANDIDATES.find((m) => MediaRecorder.isTypeSupported(m)) || '';
}

let rec = null;           // MediaRecorder
let displayStream = null; // ekran akışı
let micStream = null;     // mikrofon akışı
let audioCtx = null;      // iki ses kaynağını karıştırmak için
let chunks = [];
let totalBytes = 0;
let startedAt = 0;        // kayıt (duraklamalar hariç) toplam süre hesabı için
let elapsedBefore = 0;    // duraklamadan önce biriken süre (ms)
let timerId = null;
let lastBlobUrl = null;
let outMime = '';
let countdownAbort = null;

function fmtTime(ms) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60;
  const p = (n) => String(n).padStart(2, '0');
  return h ? `${p(h)}:${p(m)}:${p(x)}` : `${p(m)}:${p(x)}`;
}
function elapsedMs() { return elapsedBefore + (startedAt ? Date.now() - startedAt : 0); }

function setState(text, cls) {
  els.state.textContent = text;
  els.state.className = `ek-state ${cls || ''}`.trim();
}

// ---- Destek kontrolü --------------------------------------------------------
function checkSupport() {
  const hasDisplay = !!(navigator.mediaDevices && typeof navigator.mediaDevices.getDisplayMedia === 'function');
  const hasRecorder = typeof window.MediaRecorder === 'function';
  const mobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  if (hasDisplay && hasRecorder) {
    outMime = pickMime();
    if (!outMime) {
      els.supportText.textContent = 'Tarayıcınız ekranı paylaşabiliyor ama kaydı dosyaya yazamıyor (MediaRecorder biçim desteği yok). Güncel Chrome, Edge veya Firefox ile deneyin.';
      els.support.hidden = false; els.start.disabled = true; return false;
    }
    if (!/webm/.test(outMime)) {
      // Safari: WebM yazamaz, MP4 üretir. Dürüstçe söyleyelim.
      els.supportText.textContent = 'Bu tarayıcı WebM yazamadığı için kayıt MP4 olarak kaydedilecek. Sistem sesi Safari\'de alınamaz; mikrofon çalışır.';
      els.support.hidden = false;
    }
    return true;
  }
  els.supportText.textContent = mobile
    ? 'Telefon ve tablet tarayıcıları ekran paylaşımına izin vermiyor; bu araç mobilde çalışmaz. Android\'de bildirim panelindeki "Ekran kaydı", iPhone\'da Denetim Merkezi\'ndeki ekran kaydı düğmesini kullanın. Bilgisayarda Chrome, Edge veya Firefox ile bu sayfayı açarsanız kayıt yapabilirsiniz.'
    : 'Bu tarayıcı ekran kaydını desteklemiyor (getDisplayMedia ya da MediaRecorder yok). Güncel Chrome, Edge veya Firefox kullanın ve sayfayı https ile açtığınızdan emin olun. Internet Explorer ve eski Safari sürümleri desteklenmez.';
  els.support.hidden = false;
  els.start.disabled = true;
  els.options.hidden = true;
  return false;
}

// ---- Geri sayım (gerçek, iptal edilebilir) -------------------------------------
function runCountdown(seconds) {
  return new Promise((resolve) => {
    let n = seconds;
    els.countdownBox.hidden = false;
    els.countdownBox.textContent = String(n);
    const id = setInterval(() => {
      n -= 1;
      if (n <= 0) { clearInterval(id); els.countdownBox.hidden = true; countdownAbort = null; resolve(true); return; }
      els.countdownBox.textContent = String(n);
    }, 1000);
    countdownAbort = () => { clearInterval(id); els.countdownBox.hidden = true; countdownAbort = null; resolve(false); };
  });
}

// ---- Akışları hazırlama ----------------------------------------------------------
function displayConstraints() {
  const res = els.res.value; // auto | 1080 | 720
  const fps = Number(els.fps.value) || 30;
  const video = { frameRate: { ideal: fps, max: 60 } };
  if (res === '1080') { video.width = { ideal: 1920 }; video.height = { ideal: 1080 }; }
  if (res === '720') { video.width = { ideal: 1280 }; video.height = { ideal: 720 }; }
  return {
    video,
    audio: els.sysAudio.checked, // sistem/sekme sesi; tarayıcı izin iletişim kutusunda ayrıca onay ister
    selfBrowserSurface: 'exclude',
    surfaceSwitching: 'include',
    systemAudio: els.sysAudio.checked ? 'include' : 'exclude',
  };
}
function bitrateFor() {
  const res = els.res.value, fps = Number(els.fps.value) || 30;
  if (res === '720') return fps >= 60 ? 4_000_000 : 2_500_000;
  return fps >= 60 ? 8_000_000 : 5_000_000;
}

/** Ekran sesi + mikrofonu tek ses parçasında birleştirir; biri yoksa olanı döndürür. */
function mixAudio(displayTracks, micTracks) {
  if (!displayTracks.length && !micTracks.length) return [];
  if (!micTracks.length) return displayTracks;
  if (!displayTracks.length) return micTracks;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return micTracks;
  audioCtx = new Ctx();
  const dest = audioCtx.createMediaStreamDestination();
  audioCtx.createMediaStreamSource(new MediaStream(displayTracks)).connect(dest);
  audioCtx.createMediaStreamSource(new MediaStream(micTracks)).connect(dest);
  return dest.stream.getAudioTracks();
}

function displayErrorMessage(err) {
  const name = err && err.name;
  if (name === 'NotAllowedError' || name === 'SecurityError') return 'Ekran paylaşımına izin verilmedi. "Kaydı başlat"a tekrar basıp açılan pencerede bir ekran, pencere ya da sekme seçin ve "Paylaş"ı onaylayın. Tarayıcı ya da işletim sistemi paylaşımı engelliyorsa (macOS: Sistem Ayarları → Gizlilik → Ekran Kaydı) izni açın.';
  if (name === 'NotFoundError') return 'Paylaşılacak ekran bulunamadı. Başka bir pencere seçin ya da tarayıcıyı yeniden başlatın.';
  if (name === 'NotReadableError' || name === 'AbortError') return 'Ekran görüntüsü alınamadı; başka bir uygulama ekranı kilitlemiş olabilir. Diğer kayıt/toplantı uygulamalarını kapatıp tekrar deneyin.';
  if (name === 'OverconstrainedError') return 'Seçtiğiniz çözünürlük ya da kare hızı bu ekranda sağlanamıyor. Çözünürlüğü "Otomatik" yapıp tekrar deneyin.';
  if (name === 'InvalidStateError') return 'Sayfa etkin değilken paylaşım başlatılamaz. Sayfaya tıklayıp "Kaydı başlat"a yeniden basın.';
  return 'Ekran paylaşımı başlatılamadı. Sayfayı yenileyip tekrar deneyin; sorun sürerse Chrome ya da Edge ile açın.';
}

// ---- Kayıt ----------------------------------------------------------------------
async function startRecording() {
  showError(els.error, '');
  els.memWarn.hidden = true; els.micWarn.hidden = true;
  els.result.classList.remove('is-active');
  els.start.disabled = true;

  // 1) Ekran seçimi — tarayıcının kendi iletişim kutusu (ekran / pencere / sekme) açılır.
  try {
    displayStream = await navigator.mediaDevices.getDisplayMedia(displayConstraints());
  } catch (err) {
    els.start.disabled = false;
    showError(els.error, displayErrorMessage(err));
    return;
  }

  // 2) Mikrofon ayrı izinle; reddedilirse kayıt mikrofon olmadan sürer.
  micStream = null;
  if (els.mic.checked) {
    try {
      micStream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    } catch {
      els.micWarn.hidden = false;
    }
  }
  if (els.sysAudio.checked && !displayStream.getAudioTracks().length) {
    // Kullanıcı "sesi paylaş" kutusunu işaretlemedi ya da sistem desteklemiyor.
    els.micWarn.hidden = false;
    els.micWarn.textContent = micStream
      ? 'Sistem sesi alınamadı (paylaşım penceresinde "Sesi paylaş" işaretlenmemiş olabilir). Kayıt yalnızca mikrofonla sürüyor.'
      : 'Sistem sesi alınamadı: paylaşım penceresinde "Sesi paylaş / Share audio" kutusu işaretlenmemiş olabilir ya da tarayıcınız bu ekran türünde sesi vermiyor (Chrome tüm ekranda sesi yalnızca Windows\'ta, sekme paylaşımında her sistemde verir). Kayıt sessiz sürüyor; sesli istiyorsanız durdurup yeniden başlatın.';
  }

  // 3) Geri sayım (gerçek; iptal edilebilir — sahte aciliyet değil, hazırlanma payı).
  els.controls.hidden = false; els.live.hidden = false;
  els.liveVideo.srcObject = displayStream;
  els.liveVideo.play().catch(() => {});
  const vTrack = displayStream.getVideoTracks()[0];
  vTrack.addEventListener('ended', () => { if (rec && rec.state !== 'inactive') stopRecording(); else cleanupStreams(); });

  if (els.countdown.checked) {
    setState('Geri sayım…', 'is-wait');
    els.stop.disabled = false; els.pause.disabled = true;
    const ok = await runCountdown(3);
    if (!ok || !displayStream) { cleanupStreams(); resetUi(); return; }
  }

  // 4) MediaRecorder
  const audioTracks = mixAudio(displayStream.getAudioTracks(), micStream ? micStream.getAudioTracks() : []);
  const recStream = new MediaStream([vTrack, ...audioTracks]);
  chunks = []; totalBytes = 0; elapsedBefore = 0;
  try {
    rec = new MediaRecorder(recStream, { mimeType: outMime, videoBitsPerSecond: bitrateFor(), audioBitsPerSecond: 128_000 });
  } catch (err) {
    cleanupStreams(); resetUi();
    showError(els.error, 'Kayıt başlatılamadı: tarayıcı bu biçimi yazamıyor. Çözünürlüğü "Otomatik" yapıp tekrar deneyin ya da güncel Chrome/Edge kullanın.');
    return;
  }
  rec.addEventListener('dataavailable', (e) => {
    if (!e.data || !e.data.size) return;
    chunks.push(e.data);
    totalBytes += e.data.size;
    els.sizeLive.textContent = formatBytes(totalBytes);
    if (totalBytes > MEM_WARN_BYTES) els.memWarn.hidden = false;
  });
  rec.addEventListener('error', (e) => {
    showError(els.error, 'Kayıt sırasında hata oluştu; o ana kadarki kısım kaydedildi. ' + (e.error && e.error.message ? '' : 'Daha kısa parçalar hâlinde kaydetmeyi deneyin.'));
    stopRecording();
  });
  rec.addEventListener('stop', finalize);
  rec.start(TIMESLICE_MS);
  startedAt = Date.now();
  timerId = setInterval(() => { els.timer.textContent = fmtTime(elapsedMs()); }, 250);
  setState('Kayıt sürüyor', 'is-rec');
  els.pause.disabled = false; els.stop.disabled = false; els.pause.textContent = 'Duraklat';
  window.addEventListener('beforeunload', warnUnload);
}

function togglePause() {
  if (!rec) return;
  if (rec.state === 'recording') {
    rec.pause(); elapsedBefore += Date.now() - startedAt; startedAt = 0;
    els.pause.textContent = 'Devam et'; setState('Duraklatıldı', 'is-pause');
  } else if (rec.state === 'paused') {
    rec.resume(); startedAt = Date.now();
    els.pause.textContent = 'Duraklat'; setState('Kayıt sürüyor', 'is-rec');
  }
}

function stopRecording() {
  if (countdownAbort) { countdownAbort(); return; }
  if (!rec || rec.state === 'inactive') { cleanupStreams(); resetUi(); return; }
  els.stop.disabled = true; els.pause.disabled = true;
  if (startedAt) { elapsedBefore += Date.now() - startedAt; startedAt = 0; }
  clearInterval(timerId); timerId = null;
  setState('Dosya hazırlanıyor…', 'is-wait');
  setProgress(els.progress, 100, 'Kayıt dosyaya yazılıyor…');
  try { rec.stop(); } catch { finalize(); }
}

async function finalize() {
  window.removeEventListener('beforeunload', warnUnload);
  cleanupStreams();
  const blob = new Blob(chunks, { type: outMime.split(';')[0] || 'video/webm' });
  chunks = [];
  setProgress(els.progress, null);
  resetUi();
  if (!blob.size) {
    showError(els.error, 'Kayıt boş çıktı; paylaşım çok kısa sürmüş ya da ekran hiç kare üretmemiş olabilir. En az birkaç saniye kaydedip tekrar deneyin.');
    return;
  }
  if (lastBlobUrl) URL.revokeObjectURL(lastBlobUrl);
  lastBlobUrl = URL.createObjectURL(blob);
  els.preview.src = lastBlobUrl;
  // Chrome'un ürettiği WebM'de süre bilgisi başlıkta yoktur; sona sarıp geri alarak oynatıcıya hesaplatırız.
  els.preview.addEventListener('loadedmetadata', () => {
    if (els.preview.duration === Infinity) {
      const back = () => { els.preview.currentTime = 0; els.preview.removeEventListener('timeupdate', back); };
      els.preview.addEventListener('timeupdate', back);
      els.preview.currentTime = 1e6;
    }
  }, { once: true });
  const ext = /mp4/.test(outMime) ? 'mp4' : 'webm';
  const stamp = new Date();
  const p = (n) => String(n).padStart(2, '0');
  const name = `ekran-kaydi-${stamp.getFullYear()}-${p(stamp.getMonth() + 1)}-${p(stamp.getDate())}-${p(stamp.getHours())}${p(stamp.getMinutes())}.${ext}`;
  els.resMeta.textContent = `${fmtTime(elapsedBefore)} · ${formatBytes(blob.size)} · ${ext.toUpperCase()} (${outMime.split(';')[0]})`;
  els.result.dataset.mime = blob.type;
  els.result.dataset.bytes = String(blob.size);
  els.download.onclick = () => downloadBlob(blob, name);
  els.result.classList.add('is-active');
  els.result.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  elapsedBefore = 0;
}

function cleanupStreams() {
  [displayStream, micStream].forEach((s) => s && s.getTracks().forEach((t) => t.stop()));
  displayStream = null; micStream = null;
  if (audioCtx) { audioCtx.close().catch(() => {}); audioCtx = null; }
  els.liveVideo.srcObject = null;
}
function resetUi() {
  rec = null;
  clearInterval(timerId); timerId = null;
  els.controls.hidden = true; els.live.hidden = true; els.countdownBox.hidden = true;
  els.timer.textContent = '00:00'; els.sizeLive.textContent = '0 B';
  els.start.disabled = false; els.pause.disabled = true; els.stop.disabled = true;
  setState('', '');
}
function warnUnload(e) { e.preventDefault(); e.returnValue = ''; }

// ---- Bağlama ----------------------------------------------------------------------
els.start.addEventListener('click', startRecording);
els.pause.addEventListener('click', togglePause);
els.stop.addEventListener('click', stopRecording);
els.again.addEventListener('click', () => {
  els.result.classList.remove('is-active');
  if (lastBlobUrl) { URL.revokeObjectURL(lastBlobUrl); lastBlobUrl = null; }
  els.preview.removeAttribute('src'); els.preview.load();
  els.start.focus();
});
document.addEventListener('keydown', (e) => {
  // Klavye: kayıt sürerken Esc durdurur, Boşluk duraklatır (form alanlarında değilken).
  if (/^(INPUT|SELECT|TEXTAREA|BUTTON)$/.test(document.activeElement?.tagName || '')) return;
  if (!rec) return;
  if (e.key === 'Escape') { e.preventDefault(); stopRecording(); }
  if (e.key === ' ') { e.preventDefault(); togglePause(); }
});

if (checkSupport()) {
  const fmt = /mp4/.test(outMime) ? 'MP4' : 'WebM';
  $('format-note').textContent = `Çıktı biçimi: ${fmt} (${outMime}).`;
}
