// Akort Aleti — mikrofondan perde (pitch) tespiti. Ses yalnızca bu sekmede, AnalyserNode üzerinden
// çözümlenir; kaydedilmez, hiçbir yere gönderilmez ve hoparlöre bağlanmaz (geri besleme olmaz).
import { showError } from '../assets/js/ba.js';
import { detectPitch, rms, freqToMidi, midiToFreq, centsBetween, noteName } from './yin.js';

const $ = (id) => document.getElementById(id);
const STORE_KEY = 'ba-akort';

/**
 * Enstrüman ön ayarları. `midi`: oktavı belli tel (C4 = 60). `pc`: yalnızca nota adı (0 = Do … 11 = Si);
 * bu tellerde duyulan sese en yakın oktav hedef alınır (bağlamada oktav sap boyuna göre değişir).
 * `refMidi`: referans ton çalarken kullanılan oktav.
 */
const INSTRUMENTS = {
  gitar: { label: 'Gitar', strings: [40, 45, 50, 55, 59, 64].map((midi) => ({ midi })) },
  'bagl-bozuk': { label: 'Bağlama – bozuk düzen', strings: [{ pc: 9, refMidi: 57 }, { pc: 2, refMidi: 62 }, { pc: 7, refMidi: 55 }] },
  'bagl-duzen': { label: 'Bağlama – bağlama düzeni', strings: [{ pc: 9, refMidi: 57 }, { pc: 2, refMidi: 62 }, { pc: 4, refMidi: 64 }] },
  keman: { label: 'Keman', strings: [55, 62, 69, 76].map((midi) => ({ midi })) },
  ukulele: { label: 'Ukulele', strings: [67, 60, 64, 69].map((midi) => ({ midi })) }, // G4 C4 E4 A4 (G tizde)
  kromatik: { label: 'Kromatik', strings: [] },
};

const state = { instrument: 'gitar', a4: 440, target: null };

function loadState() {
  try {
    const o = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (!o || typeof o !== 'object') return;
    if (INSTRUMENTS[o.instrument]) state.instrument = o.instrument;
    if (o.a4 === 440 || o.a4 === 442) state.a4 = o.a4;
  } catch { /* bozuk kayıt: varsayılanlar */ }
}
function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify({ instrument: state.instrument, a4: state.a4 })); } catch { /* yoksay */ }
}

const els = {
  box: $('ak-box'), instrument: $('ak-instrument'), ref: $('ak-ref'), strings: $('ak-strings'),
  gauge: $('ak-gauge'), display: $('ak-display'), note: $('ak-note'), noteEn: $('ak-note-en'),
  freq: $('ak-freq'), cents: $('ak-cents'), heard: $('ak-heard'), status: $('ak-status'),
  start: $('ak-start'), play: $('ak-play'), playInfo: $('ak-play-info'), error: $('ak-error'),
};

/* ---------- Biçimleme ---------- */
const fmt1 = (n) => n.toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const signed = (n) => { const r = Math.round(n); return (r > 0 ? '+' : r < 0 ? '−' : '±') + Math.abs(r); };
const median = (arr) => { const s = [...arr].sort((a, b) => a - b); return s[Math.floor(s.length / 2)]; };

/** Tel etiketi: oktavı belliyse "Mi (E2)", yalnızca nota adıysa "La (A)". */
function stringLabel(st) {
  if (st.midi != null) { const n = noteName(st.midi); return `${n.tr} (${n.en}${n.octave})`; }
  const n = noteName(st.pc); return `${n.tr} (${n.en})`;
}

/* ---------- Tel düğmeleri ---------- */
function buildStrings() {
  const inst = INSTRUMENTS[state.instrument];
  els.strings.textContent = '';
  const mk = (label, idx, auto) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'ba-btn ak-str';
    b.textContent = label;
    b.dataset.idx = auto ? 'auto' : String(idx);
    b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', () => { state.target = auto ? null : idx; markTarget(); });
    els.strings.appendChild(b);
    return b;
  };
  mk('Otomatik', -1, true);
  inst.strings.forEach((st, i) => mk(stringLabel(st), i, false));
  els.strings.hidden = false;
  state.target = null;
  markTarget();
}
function markTarget() {
  els.strings.querySelectorAll('.ak-str').forEach((b) => {
    const on = state.target == null ? b.dataset.idx === 'auto' : b.dataset.idx === String(state.target);
    b.setAttribute('aria-pressed', String(on));
    b.classList.toggle('is-target', on);
  });
  recent.length = 0; // hedef değişince eski ölçümler karışmasın
}
function markNear(noteMidi) {
  const inst = INSTRUMENTS[state.instrument];
  els.strings.querySelectorAll('.ak-str').forEach((b) => {
    const i = b.dataset.idx === 'auto' ? -1 : Number(b.dataset.idx);
    const st = inst.strings[i];
    const near = !!st && noteMidi != null && (st.midi != null ? st.midi === noteMidi : st.pc === ((noteMidi % 12) + 12) % 12);
    b.classList.toggle('is-near', near);
  });
}

/* ---------- Ses grafiği ---------- */
let ctx = null;
let analyser = null;
let buf = null;
let micStream = null;
let micSource = null;
let testOsc = null;
const FFT = 4096;

function ensureAudio() {
  if (ctx) return true;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return false;
  ctx = new AC();
  analyser = ctx.createAnalyser();
  analyser.fftSize = FFT;
  analyser.smoothingTimeConstant = 0;
  buf = new Float32Array(FFT);
  return true;
}

/** Tarayıcı hata adını çözüm öneren Türkçe mesaja çevirir. */
function micErrorMessage(err) {
  const name = err && err.name;
  if (name === 'NotAllowedError' || name === 'SecurityError' || name === 'PermissionDeniedError') {
    return 'Mikrofon izni verilmedi. Adres çubuğunun solundaki kilit (veya ayarlar) simgesine tıklayın, "Mikrofon" satırını "İzin ver" yapıp sayfayı yenileyin. Ses cihazınızdan çıkmaz; yalnızca bu sekmede çözümlenir. Windows\'ta Ayarlar → Gizlilik ve güvenlik → Mikrofon bölümünden erişimin açık olduğunu da kontrol edin.';
  }
  if (name === 'NotFoundError' || name === 'DevicesNotFoundError' || name === 'OverconstrainedError') {
    return 'Mikrofon bulunamadı. Bir mikrofonun (ya da mikrofonlu kulaklığın) takılı ve açık olduğundan emin olun, sonra "Mikrofonu başlat"a yeniden basın.';
  }
  if (name === 'NotReadableError' || name === 'TrackStartError' || name === 'AbortError') {
    return 'Mikrofon şu an başka bir uygulama tarafından kullanılıyor olabilir. Zoom, Teams gibi uygulamaları ve mikrofon kullanan diğer sekmeleri kapatıp tekrar deneyin.';
  }
  return 'Mikrofon başlatılamadı. Sayfayı yenileyip tekrar deneyin; sorun sürerse tarayıcıyı yeniden başlatın.';
}

/* ---------- Çözümleme döngüsü ---------- */
let running = false;
let rafId = 0;
let lastRun = 0;
let lastHit = 0;
let frames = 0;
const recent = [];
let lastMidi = null; // son duyulan en yakın nota (referans ton için)
let lastMidiAt = 0;
let needle = 0; // ekranda gösterilen ibre (cent)
let needleTarget = null; // null: ses yok
let statusKey = '';

function startLoop() {
  if (running) return;
  running = true;
  lastRun = 0;
  rafId = requestAnimationFrame(loop);
}
function stopLoop() {
  running = false;
  cancelAnimationFrame(rafId);
}
function loop(now) {
  if (!running) return;
  rafId = requestAnimationFrame(loop);
  if (now - lastRun >= 40) { lastRun = now; analyse(); }
  // İbre hedefe yumuşakça yaklaşır
  const goal = needleTarget == null ? 0 : Math.max(-50, Math.min(50, needleTarget));
  needle += (goal - needle) * 0.3;
  drawGauge();
}

function analyse() {
  analyser.getFloatTimeDomainData(buf);
  frames++;
  els.display.dataset.frames = String(frames);
  const level = rms(buf);
  let res = null;
  if (level >= 0.008) {
    res = detectPitch(buf, ctx.sampleRate, { minHz: 60, maxHz: 1400, threshold: 0.15 });
    if (res && res.clarity < 0.8) res = null;
  }
  const now = performance.now();
  if (res) {
    recent.push(res.freq);
    if (recent.length > 5) recent.shift();
    lastHit = now;
    showPitch(median(recent));
  } else if (now - lastHit > 600) {
    recent.length = 0;
    showWaiting(level < 0.008);
  }
}

/** Hedef telin frekansını hesaplar; yalnızca nota adı bilinen tellerde duyulan sese en yakın oktavı seçer. */
function targetMidiFor(st, heardMidi) {
  if (st.midi != null) return st.midi;
  return st.pc + 12 * Math.round((heardMidi - st.pc) / 12);
}

function showPitch(freq) {
  const heardMidi = freqToMidi(freq, state.a4);
  const heardNote = noteName(heardMidi);
  const st = state.target != null ? INSTRUMENTS[state.instrument].strings[state.target] : null;
  let noteMidi, cents;
  if (st) {
    noteMidi = targetMidiFor(st, heardMidi);
    cents = centsBetween(freq, midiToFreq(noteMidi, state.a4));
  } else {
    noteMidi = Math.round(heardMidi);
    cents = (heardMidi - noteMidi) * 100;
  }
  const n = noteName(noteMidi);
  lastMidi = noteMidi; lastMidiAt = performance.now();
  needleTarget = cents;
  els.note.textContent = n.tr;
  els.noteEn.textContent = st && st.midi == null ? n.en : `${n.en}${n.octave}`;
  els.freq.textContent = `${fmt1(freq)} Hz`;
  els.cents.textContent = `${signed(cents)} cent`;
  els.heard.textContent = st ? `Duyulan: ${heardNote.tr} (${heardNote.en}${heardNote.octave}) · hedef: ${n.tr}` : 'En yakın nota gösteriliyor';
  const d = els.display.dataset;
  d.state = 'detected'; d.note = n.tr; d.noteEn = n.en; d.octave = String(n.octave);
  d.cents = cents.toFixed(1); d.freq = freq.toFixed(2);
  markNear(noteMidi);
  const ok = Math.abs(cents) <= 5;
  els.display.classList.toggle('is-ok', ok);
  let key, text;
  if (ok) { key = 'ok:' + n.tr; text = `Akort tamam: ${n.tr}.`; }
  else if (cents > 0) { key = 'sharp:' + n.tr; text = `${n.tr} için ses tiz: teli biraz gevşetin.`; }
  else { key = 'flat:' + n.tr; text = `${n.tr} için ses pes: teli biraz sıkın.`; }
  setStatus(key, text);
}

function showWaiting(silent) {
  needleTarget = null;
  els.display.dataset.state = 'listening';
  els.display.classList.remove('is-ok');
  els.cents.textContent = '— cent';
  els.freq.textContent = '— Hz';
  markNear(null);
  setStatus(silent ? 'silent' : 'noisy', silent
    ? 'Dinliyorum. Bir teli çalın ya da notayı mırıldanın.'
    : 'Net bir ses duyulmadı. Tek bir teli çalın, çalgıyı mikrofona yaklaştırın ve ortamı sessiz tutun.');
}
/** Ekran okuyucu her karede konuşmasın diye durum metni yalnızca durum değişince güncellenir. */
function setStatus(key, text) {
  if (key === statusKey) return;
  statusKey = key;
  els.status.textContent = text;
}

/* ---------- İbre (canvas) ---------- */
let colors = null;
let colorsAt = 0;
function readColors() {
  const now = performance.now();
  if (colors && now - colorsAt < 1000) return colors;
  const cs = getComputedStyle(document.documentElement);
  const g = (n, f) => cs.getPropertyValue(n).trim() || f;
  colors = {
    text: g('--ba-text', '#1e2126'), muted: g('--ba-text-muted', '#63666c'), line: g('--ba-border-hover', '#cbc7c4'),
    ok: g('--ba-success', '#1f7a4d'), bad: g('--ba-primary', '#7b2331'), surface: g('--ba-surface-2', '#f6f5f3'),
  };
  colorsAt = now;
  return colors;
}
function drawGauge() {
  const c = els.gauge;
  const w = c.width, h = c.height;
  const g = c.getContext('2d');
  const col = readColors();
  g.clearRect(0, 0, w, h);
  const cx = w / 2, cy = h - 64, r = Math.min(w / 2 - 70, cy - 110);
  const ang = (cents) => Math.PI + ((cents + 50) / 100) * Math.PI; // -50 → 180°, +50 → 360°
  // Yeşil bölge (±5 cent)
  g.lineWidth = 22; g.lineCap = 'butt';
  g.strokeStyle = col.line; g.globalAlpha = 0.4; // zemin yayı (kutu rengiyle karışmasın diye çizgi renginin soluğu)
  g.beginPath(); g.arc(cx, cy, r, Math.PI, 2 * Math.PI); g.stroke();
  g.globalAlpha = 1;
  g.strokeStyle = col.ok;
  g.beginPath(); g.arc(cx, cy, r, ang(-5), ang(5)); g.stroke();
  // Çentikler (her 10 cent)
  g.strokeStyle = col.line; g.fillStyle = col.muted;
  g.font = '700 36px "IBM Plex Sans", system-ui, sans-serif';
  g.textAlign = 'center'; g.textBaseline = 'middle';
  for (let t = -50; t <= 50; t += 10) {
    const a = ang(t), long = t % 50 === 0 || t === 0;
    const r1 = r + 18, r2 = r + (long ? 52 : 36);
    g.lineWidth = long ? 6 : 4;
    g.beginPath(); g.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); g.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2); g.stroke();
  }
  g.fillText('♭ pes', cx - r + 10, cy + 36);
  g.fillText('tiz ♯', cx + r - 10, cy + 36);
  g.fillText('0', cx, cy - r - 72);
  // İbre
  const live = needleTarget != null;
  const abs = Math.abs(needle);
  g.strokeStyle = !live ? col.line : abs <= 5 ? col.ok : abs <= 15 ? '#c98a00' : col.bad;
  g.lineWidth = 10; g.lineCap = 'round';
  const a = ang(needle);
  g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(a) * (r - 8), cy + Math.sin(a) * (r - 8)); g.stroke();
  g.fillStyle = live ? g.strokeStyle : col.line;
  g.beginPath(); g.arc(cx, cy, 16, 0, 2 * Math.PI); g.fill();
}

/* ---------- Mikrofon başlat / durdur ---------- */
async function startMic() {
  showError(els.error, '');
  if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
    showError(els.error, window.isSecureContext === false
      ? 'Mikrofon yalnızca güvenli (https) bağlantıda çalışır. Sayfayı https://araclar.bilisimajans.com adresinden açın.'
      : 'Bu tarayıcı mikrofon erişimini desteklemiyor. Güncel Chrome, Edge, Firefox veya Safari kullanın.');
    return;
  }
  if (!ensureAudio()) {
    showError(els.error, 'Bu tarayıcı ses çözümlemeyi (Web Audio) desteklemiyor. Tarayıcınızı güncelleyin.');
    return;
  }
  els.start.disabled = true;
  try {
    // Gürültü bastırma, yankı engelleme ve otomatik kazanç perde ölçümünü bozar; kapalı istenir.
    micStream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false }, video: false });
    await ctx.resume();
    micSource = ctx.createMediaStreamSource(micStream);
    // Test kancası sentetik ses veriyorsa mikrofon araya girmez (izin penceresi yavaş kapanırsa yarış olmasın)
    if (!testOsc) micSource.connect(analyser); // hoparlöre bağlanmaz: geri besleme (ıslık) olmaz
    els.start.textContent = 'Mikrofonu durdur';
    els.start.dataset.running = 'true';
    els.start.setAttribute('aria-pressed', 'true');
    els.display.dataset.state = 'listening';
    statusKey = '';
    startLoop();
  } catch (err) {
    showError(els.error, micErrorMessage(err));
  } finally {
    els.start.disabled = false;
  }
}
function stopMic() {
  stopLoop();
  if (micStream) { micStream.getTracks().forEach((t) => t.stop()); micStream = null; }
  if (micSource) { try { micSource.disconnect(); } catch { /* zaten kopuk */ } micSource = null; }
  detachTest();
  stopRef();
  needleTarget = null; needle = 0; recent.length = 0;
  els.start.textContent = 'Mikrofonu başlat';
  els.start.dataset.running = 'false';
  els.start.setAttribute('aria-pressed', 'false');
  els.display.dataset.state = 'idle';
  els.display.classList.remove('is-ok');
  els.note.textContent = '—'; els.noteEn.textContent = ''; els.freq.textContent = '— Hz'; els.cents.textContent = '— cent';
  els.heard.textContent = '';
  markNear(null);
  statusKey = 'idle';
  els.status.textContent = 'Mikrofon kapalı. Başlatınca bir teli çalın.';
  drawGauge();
  if (ctx) ctx.suspend().catch(() => {});
}
els.start.addEventListener('click', () => (micStream || testOsc ? stopMic() : startMic()));

/* ---------- Referans ton ---------- */
let refNodes = null;
let refTimer = 0;
let playedCount = 0;

/** Hedef telin (ya da otomatik modda son duyulan notanın) MIDI numarası. */
function refMidi() {
  const inst = INSTRUMENTS[state.instrument];
  if (state.target != null) { const st = inst.strings[state.target]; return st.midi != null ? st.midi : st.refMidi; }
  if (lastMidi != null && performance.now() - lastMidiAt < 5000) return lastMidi;
  if (inst.strings.length) { const st = inst.strings[0]; return st.midi != null ? st.midi : st.refMidi; }
  return 69; // kromatik: La4
}
function stopRef() {
  clearTimeout(refTimer);
  if (refNodes) {
    const { oscs, gain } = refNodes;
    try {
      const t = ctx.currentTime;
      gain.gain.cancelScheduledValues(t);
      gain.gain.setValueAtTime(gain.gain.value, t);
      gain.gain.linearRampToValueAtTime(0, t + 0.05);
      oscs.forEach((o) => o.stop(t + 0.08));
    } catch { /* yoksay */ }
    refNodes = null;
  }
  els.play.setAttribute('aria-pressed', 'false');
  els.play.textContent = 'Referans tonu çal';
}
async function playRef() {
  showError(els.error, '');
  if (!ensureAudio()) {
    showError(els.error, 'Bu tarayıcı ses üretimini (Web Audio) desteklemiyor. Tarayıcınızı güncelleyin.');
    return;
  }
  try { await ctx.resume(); } catch { /* aşağıda durum kontrol edilir */ }
  if (ctx.state !== 'running') {
    showError(els.error, 'Tarayıcı sesi başlatmaya izin vermedi. Sayfada bir yere dokunup düğmeye yeniden basın; cihazın sesi kısık ya da sessizde olmasın.');
    return;
  }
  stopRef();
  const midi = refMidi();
  const f = midiToFreq(midi, state.a4);
  const t = ctx.currentTime;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.28, t + 0.04);
  gain.gain.setValueAtTime(0.28, t + 3.0);
  gain.gain.linearRampToValueAtTime(0, t + 3.3);
  // Temel ses + zayıf ikinci harmonik: saf sinüsten daha kolay duyulur
  const o1 = ctx.createOscillator(); o1.type = 'sine'; o1.frequency.value = f;
  const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.value = f * 2;
  const g2 = ctx.createGain(); g2.gain.value = 0.18;
  o1.connect(gain); o2.connect(g2); g2.connect(gain); gain.connect(ctx.destination);
  o1.start(t); o2.start(t); o1.stop(t + 3.35); o2.stop(t + 3.35);
  refNodes = { oscs: [o1, o2], gain };
  const n = noteName(midi);
  const octaveNote = state.target != null && INSTRUMENTS[state.instrument].strings[state.target].midi == null ? ' (oktav yaklaşıktır)' : '';
  els.playInfo.textContent = `Çalan referans: ${n.tr} (${n.en}${n.octave}) · ${fmt1(f)} Hz${octaveNote}`;
  els.play.setAttribute('aria-pressed', 'true');
  els.play.textContent = 'Referans tonu durdur';
  playedCount++;
  els.play.dataset.played = String(playedCount);
  refTimer = setTimeout(stopRef, 3400);
}
els.play.addEventListener('click', () => (refNodes ? stopRef() : playRef()));

/* ---------- Ayar değişimleri ---------- */
els.instrument.addEventListener('change', () => {
  state.instrument = els.instrument.value;
  buildStrings(); saveState();
});
els.ref.addEventListener('change', () => {
  state.a4 = Number(els.ref.value) === 442 ? 442 : 440;
  recent.length = 0; saveState();
  if (refNodes) playRef();
});

/* ---------- Test kancası ---------- */
// Testlerde (ve geliştirmede) mikrofon yerine sentetik bir sinüsü AnalyserNode'a besler: window.__akortTest(440).
// freq verilmezse (ya da 0) sentetik ses kesilir. Hoparlöre bağlanmaz.
function detachTest() {
  if (testOsc) { try { testOsc.stop(); testOsc.disconnect(); } catch { /* yoksay */ } testOsc = null; }
}
window.__akortTest = async function (freq) {
  if (!ensureAudio()) throw new Error('Web Audio yok');
  await ctx.resume();
  detachTest();
  if (micSource) { try { micSource.disconnect(analyser); } catch { /* yoksay */ } }
  if (!freq) { if (micSource) micSource.connect(analyser); return; }
  testOsc = ctx.createOscillator();
  testOsc.type = 'sine';
  testOsc.frequency.value = freq;
  testOsc.connect(analyser);
  testOsc.start();
  if (!running) {
    els.start.textContent = 'Mikrofonu durdur';
    els.start.dataset.running = 'true';
    els.display.dataset.state = 'listening';
    statusKey = '';
    startLoop();
  }
};

/* ---------- Başlangıç ---------- */
loadState();
els.instrument.value = state.instrument;
els.ref.value = String(state.a4);
buildStrings();
els.display.dataset.state = 'idle';
els.display.dataset.frames = '0';
drawGauge();
window.addEventListener('pagehide', () => { stopMic(); });
