// Online Metronom — WebAudio "lookahead" zamanlayıcı. Tıklamalar ses saatine (AudioContext.currentTime)
// göre önceden planlanır; zamanlayıcı yalnızca "bir sonraki vuruşları planla" tetiğidir (setTimeout
// zinciri, setInterval değil). Bu yüzden zamanlama sayfa yoğun olsa bile örnekleme hassasiyetinde kalır.
// Ses dosyası yok, ağ isteği yok.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const STORE_KEY = 'ba-metronom';
export const MIN_BPM = 30;
export const MAX_BPM = 300;

/** Ölçü tanımları: vuruş sayısı ve vurgu düzeyleri (0 = ilk vuruş). 6/8 ve 7/8'de BPM sekizlik vuruşu sayar. */
const METERS = {
  '2/4': { beats: 2, accents: { 0: 'strong' } },
  '3/4': { beats: 3, accents: { 0: 'strong' } },
  '4/4': { beats: 4, accents: { 0: 'strong' } },
  '5/4': { beats: 5, accents: { 0: 'strong', 3: 'medium' } }, // 3+2
  '6/8': { beats: 6, accents: { 0: 'strong', 3: 'medium' } }, // 3+3
  '7/8': { beats: 7, accents: { 0: 'strong', 2: 'medium', 4: 'medium' } }, // 2+2+3
};
const SUBS = { '1': 1, '2': 2, '3': 3, '4': 4 }; // yok, sekizlik, üçleme, onaltılık
const SOUNDS = ['click', 'wood', 'beep'];

/** Tempo işaretleri (çakışmayan sınırlar; kaynaklara göre birkaç BPM oynar). */
export const TEMPOS = [
  { name: 'Grave', min: 0, max: 39 },
  { name: 'Largo', min: 40, max: 59 },
  { name: 'Larghetto', min: 60, max: 65 },
  { name: 'Adagio', min: 66, max: 75 },
  { name: 'Andante', min: 76, max: 107 },
  { name: 'Moderato', min: 108, max: 119 },
  { name: 'Allegro', min: 120, max: 155 },
  { name: 'Vivace', min: 156, max: 167 },
  { name: 'Presto', min: 168, max: 199 },
  { name: 'Prestissimo', min: 200, max: 999 },
];
export function tempoName(bpm) {
  const t = TEMPOS.find((x) => bpm >= x.min && bpm <= x.max);
  return t ? t.name : '';
}

/* ---------- Ayarlar (localStorage) ---------- */
const DEFAULTS = { bpm: 120, meter: '4/4', sub: '1', sound: 'click', volume: 80, accent: true, visual: true };
const state = { ...DEFAULTS };

function loadState() {
  try {
    const o = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (!o || typeof o !== 'object') return;
    if (Number.isFinite(o.bpm)) state.bpm = Math.min(MAX_BPM, Math.max(MIN_BPM, Math.round(o.bpm)));
    if (METERS[o.meter]) state.meter = o.meter;
    if (SUBS[o.sub]) state.sub = o.sub;
    if (SOUNDS.includes(o.sound)) state.sound = o.sound;
    if (Number.isFinite(o.volume)) state.volume = Math.min(100, Math.max(0, Math.round(o.volume)));
    if (typeof o.accent === 'boolean') state.accent = o.accent;
    if (typeof o.visual === 'boolean') state.visual = o.visual;
  } catch { /* bozuk kayıt: varsayılanlarla devam */ }
}
function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch { /* gizli sekme/dolu depo: sessizce geç */ }
}

/* ---------- Ses motoru ---------- */
let ctx = null;
let master = null;
let noiseBuf = null;

function ensureAudio() {
  if (ctx) return true;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return false;
  ctx = new AC({ latencyHint: 'interactive' });
  master = ctx.createGain();
  master.connect(ctx.destination);
  applyVolume();
  // Tık sesi için 50 ms'lik beyaz gürültü tamponu
  noiseBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.05), ctx.sampleRate);
  const ch = noiseBuf.getChannelData(0);
  for (let i = 0; i < ch.length; i++) ch[i] = Math.random() * 2 - 1;
  return true;
}
function applyVolume() {
  if (master) master.gain.value = Math.pow(state.volume / 100, 1.6) * 0.9;
}

const LEVEL_GAIN = { strong: 1, medium: 0.8, normal: 0.62, sub: 0.34 };
const FREQ = {
  beep: { strong: 1320, medium: 1100, normal: 880, sub: 660 },
  wood: { strong: 1050, medium: 900, normal: 760, sub: 620 },
  click: { strong: 3000, medium: 2500, normal: 2100, sub: 1700 },
};

/** Tek bir vuruşu `time` anına planlar (sesi anında değil, ses saatinde çalar). */
function voice(time, level) {
  const g = ctx.createGain();
  const peak = LEVEL_GAIN[level];
  g.connect(master);
  const kind = state.sound;
  const f = FREQ[kind][level];
  if (kind === 'beep') {
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(f, time);
    g.gain.setValueAtTime(0.0001, time);
    g.gain.linearRampToValueAtTime(peak * 0.8, time + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, time + 0.075);
    o.connect(g); o.start(time); o.stop(time + 0.09);
  } else if (kind === 'wood') {
    // Ahşap blok: hızla alçalan sinüs + kısa tiz üst ton
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(f, time);
    o.frequency.exponentialRampToValueAtTime(f * 0.6, time + 0.06);
    const o2 = ctx.createOscillator();
    o2.type = 'triangle';
    o2.frequency.setValueAtTime(f * 2.4, time);
    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(0.35, time);
    g2.gain.exponentialRampToValueAtTime(0.0001, time + 0.03);
    g.gain.setValueAtTime(0.0001, time);
    g.gain.linearRampToValueAtTime(peak, time + 0.002);
    g.gain.exponentialRampToValueAtTime(0.0001, time + 0.1);
    o.connect(g); o2.connect(g2); g2.connect(g);
    o.start(time); o.stop(time + 0.12); o2.start(time); o2.stop(time + 0.05);
  } else {
    // Tık: bant geçiren gürültü patlaması
    const src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass'; bp.frequency.value = f; bp.Q.value = 1.4;
    g.gain.setValueAtTime(0.0001, time);
    g.gain.linearRampToValueAtTime(peak * 2.2, time + 0.001);
    g.gain.exponentialRampToValueAtTime(0.0001, time + 0.03);
    src.connect(bp); bp.connect(g);
    src.start(time); src.stop(time + 0.04);
  }
}

/* ---------- Zamanlayıcı (lookahead) ---------- */
const LOOKAHEAD_S = 0.12; // ne kadar ilerisini planla
const TICK_MS = 25; // tetik aralığı
let running = false;
let nextTime = 0;
let beatIdx = 0;
let subIdx = 0;
let beatCount = 0;
let mainTimer = 0;
let worker = null;
let workerUrl = '';
let rafId = 0;
const queue = []; // { time, beat, sub }: görsel göstergeyi ses saatine göre sürmek için

/** Arka plan sekmelerinde ana iş parçacığı zamanlayıcıları kısıtlanır; tetiği Worker'dan almak bunu aşar. */
function startTicker(fn) {
  try {
    const code = 'let t=0;self.onmessage=function(e){clearTimeout(t);if(e.data!==1)return;const loop=function(){postMessage(0);t=setTimeout(loop,' + TICK_MS + ');};loop();};';
    workerUrl = URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
    worker = new Worker(workerUrl);
    worker.onmessage = fn;
    worker.onerror = () => { stopTicker(); fallbackTicker(fn); };
    worker.postMessage(1);
  } catch {
    fallbackTicker(fn);
  }
}
function fallbackTicker(fn) {
  const loop = () => { fn(); mainTimer = setTimeout(loop, document.hidden ? 200 : TICK_MS); };
  loop();
}
function stopTicker() {
  clearTimeout(mainTimer); mainTimer = 0;
  if (worker) { worker.postMessage(0); worker.terminate(); worker = null; }
  if (workerUrl) { URL.revokeObjectURL(workerUrl); workerUrl = ''; }
}

function levelFor(beat, sub) {
  if (sub > 0) return 'sub';
  if (!state.accent) return 'normal';
  return METERS[state.meter].accents[beat] || 'normal';
}

function schedule() {
  if (!running) return;
  // Ana iş parçacığı arka planda yavaşlarsa (Worker yoksa) daha uzun planla
  const ahead = !worker && document.hidden ? 1.0 : LOOKAHEAD_S;
  const subs = SUBS[state.sub];
  const beats = METERS[state.meter].beats;
  while (nextTime < ctx.currentTime + ahead) {
    voice(nextTime, levelFor(beatIdx, subIdx));
    queue.push({ time: nextTime, beat: beatIdx, sub: subIdx });
    nextTime += 60 / state.bpm / subs; // BPM değişimi bir sonraki tıkta devreye girer
    subIdx++;
    if (subIdx >= subs) { subIdx = 0; beatIdx = (beatIdx + 1) % beats; }
  }
}

/* ---------- Görsel gösterge ---------- */
const light = $('mt-light');
const dotsEl = $('mt-dots');
let dots = [];
let flashTimer = 0;

function buildDots() {
  const m = METERS[state.meter];
  dotsEl.textContent = '';
  dots = [];
  for (let i = 0; i < m.beats; i++) {
    const d = document.createElement('span');
    d.className = 'mt-dot' + (m.accents[i] === 'strong' ? ' is-strong' : m.accents[i] === 'medium' ? ' is-medium' : '');
    dotsEl.appendChild(d);
    dots.push(d);
  }
}
function clearVisual() {
  dots.forEach((d) => d.classList.remove('is-active', 'is-accent'));
  light.classList.remove('is-on', 'is-accent');
}
function showBeat(ev) {
  if (ev.sub !== 0) return; // yalnızca ana vuruşlar ışığı yakar
  const accent = state.accent && METERS[state.meter].accents[ev.beat] === 'strong';
  dots.forEach((d, i) => {
    d.classList.toggle('is-active', i === ev.beat);
    d.classList.toggle('is-accent', i === ev.beat && accent);
  });
  beatCount++;
  light.dataset.beat = String(beatCount);
  light.classList.toggle('is-accent', accent);
  light.classList.add('is-on');
  clearTimeout(flashTimer);
  flashTimer = setTimeout(() => light.classList.remove('is-on'), 110);
}
function frame() {
  if (!running) return;
  // Zamanı gelen vuruşlardan yalnızca sonuncusunu göster (sekme donarsa ışık yağmuru olmasın)
  let due = null;
  while (queue.length && queue[0].time <= ctx.currentTime) due = queue.shift();
  if (due) showBeat(due);
  rafId = requestAnimationFrame(frame);
}

/* ---------- Başlat / durdur ---------- */
const startBtn = $('mt-start');
const statusEl = $('mt-status');
const errorEl = $('error');

async function start() {
  showError(errorEl, '');
  if (!ensureAudio()) {
    showError(errorEl, 'Bu tarayıcı ses üretimini (Web Audio) desteklemiyor. Chrome, Edge, Firefox veya Safari\'nin güncel sürümünü kullanın.');
    return;
  }
  try { await ctx.resume(); } catch { /* aşağıda durum kontrol edilir */ }
  if (ctx.state !== 'running') {
    showError(errorEl, 'Tarayıcı sesi başlatmaya izin vermedi. Sayfada bir yere dokunup "Başlat"a yeniden basın; cihazın sesi kısık ya da sessizde olmasın.');
    return;
  }
  running = true;
  beatIdx = 0; subIdx = 0; beatCount = 0;
  queue.length = 0;
  nextTime = ctx.currentTime + 0.06;
  startBtn.textContent = 'Durdur';
  startBtn.dataset.running = 'true';
  startBtn.setAttribute('aria-pressed', 'true');
  statusEl.textContent = `Çalıyor: ${state.bpm} BPM, ${state.meter}.`;
  startTicker(schedule);
  rafId = requestAnimationFrame(frame);
}
function stop() {
  if (!running) return;
  running = false;
  stopTicker();
  cancelAnimationFrame(rafId);
  queue.length = 0;
  clearVisual();
  startBtn.textContent = 'Başlat';
  startBtn.dataset.running = 'false';
  startBtn.setAttribute('aria-pressed', 'false');
  statusEl.textContent = 'Durduruldu.';
  if (ctx) ctx.suspend().catch(() => {}); // boşta ses motorunu uyut: pil ve "ses çalıyor" simgesi
}
const toggle = () => (running ? stop() : start());

/* ---------- BPM ---------- */
const bpmInput = $('mt-bpm');
const slider = $('mt-slider');
const tempoEl = $('mt-tempo');

function setBpm(value) {
  const v = Math.min(MAX_BPM, Math.max(MIN_BPM, Math.round(value)));
  state.bpm = v;
  bpmInput.value = String(v);
  slider.value = String(v);
  const name = tempoName(v);
  slider.setAttribute('aria-valuetext', `${v} BPM, ${name}`);
  tempoEl.textContent = name;
  document.querySelectorAll('#mt-tempo-table tbody tr').forEach((tr) => {
    const on = tr.dataset.name === name;
    tr.classList.toggle('is-current', on);
    if (on) tr.setAttribute('aria-current', 'true'); else tr.removeAttribute('aria-current');
  });
  if (running) statusEl.textContent = `Çalıyor: ${v} BPM, ${state.meter}.`;
  saveState();
}
const step = (d) => { showError(errorEl, ''); setBpm(state.bpm + d); };

bpmInput.addEventListener('input', () => {
  const n = Number(bpmInput.value);
  if (bpmInput.value !== '' && Number.isFinite(n) && n >= MIN_BPM && n <= MAX_BPM) { showError(errorEl, ''); setBpm(n); }
});
bpmInput.addEventListener('change', () => {
  const n = Number(bpmInput.value);
  if (bpmInput.value === '' || !Number.isFinite(n)) {
    showError(errorEl, `BPM değeri geçersiz. ${MIN_BPM} ile ${MAX_BPM} arasında bir sayı yazın; önceki değer (${state.bpm}) korundu.`);
    setBpm(state.bpm);
  } else if (n < MIN_BPM || n > MAX_BPM) {
    showError(errorEl, `BPM ${MIN_BPM} ile ${MAX_BPM} arasında olmalı. ${n} yerine ${Math.min(MAX_BPM, Math.max(MIN_BPM, Math.round(n)))} kullanıldı.`);
    setBpm(n);
  } else {
    showError(errorEl, '');
    setBpm(n);
  }
});
slider.addEventListener('input', () => { showError(errorEl, ''); setBpm(Number(slider.value)); });
$('mt-minus').addEventListener('click', () => step(-1));
$('mt-plus').addEventListener('click', () => step(1));
$('mt-minus5').addEventListener('click', () => step(-5));
$('mt-plus5').addEventListener('click', () => step(5));

/* ---------- Tap tempo ---------- */
const taps = [];
const tapInfo = $('mt-tap-info');
function tap() {
  const now = performance.now();
  if (taps.length && now - taps[taps.length - 1] > 2000) taps.length = 0; // 2 sn'den uzun ara: yeni ölçüm
  taps.push(now);
  if (taps.length > 8) taps.shift();
  if (taps.length < 2) { tapInfo.textContent = 'Ritmi tutmaya devam edin; en az 2 dokunuş gerekir.'; return; }
  const avg = (taps[taps.length - 1] - taps[0]) / (taps.length - 1); // ms
  const bpm = 60000 / avg;
  if (bpm < MIN_BPM || bpm > MAX_BPM) {
    tapInfo.textContent = `Ölçülen tempo ${Math.round(bpm)} BPM; desteklenen aralık ${MIN_BPM}–${MAX_BPM}. Biraz daha yavaş ya da hızlı dokunun.`;
    setBpm(bpm);
    return;
  }
  showError(errorEl, '');
  setBpm(bpm);
  tapInfo.textContent = `${taps.length} dokunuştan hesaplandı: ${state.bpm} BPM. Durursanız 2 saniye sonra ölçüm sıfırlanır.`;
}
$('mt-tap').addEventListener('click', tap);

/* ---------- Diğer ayarlar ---------- */
const meterSel = $('mt-meter');
const subSel = $('mt-sub');
const soundSel = $('mt-sound');
const volSlider = $('mt-volume');
const accentChk = $('mt-accent');
const visualChk = $('mt-visual');
const meterNote = $('mt-meter-note');

function applyMeterNote() { meterNote.hidden = !/\/8$/.test(state.meter); }
function applyVisual() { light.classList.toggle('is-off', !state.visual); }

meterSel.addEventListener('change', () => {
  state.meter = meterSel.value;
  beatIdx = 0; subIdx = 0;
  buildDots(); applyMeterNote(); saveState();
  if (running) statusEl.textContent = `Çalıyor: ${state.bpm} BPM, ${state.meter}.`;
});
subSel.addEventListener('change', () => { state.sub = subSel.value; subIdx = 0; saveState(); });
soundSel.addEventListener('change', () => {
  state.sound = soundSel.value; saveState();
  if (!running && ensureAudio()) { // seçilen sesi tanıt (çalmıyorsa)
    ctx.resume()
      .then(() => voice(ctx.currentTime + 0.02, 'strong'))
      .then(() => setTimeout(() => { if (!running) ctx.suspend().catch(() => {}); }, 400))
      .catch(() => {});
  }
});
volSlider.addEventListener('input', () => { state.volume = Number(volSlider.value); applyVolume(); saveState(); });
accentChk.addEventListener('change', () => { state.accent = accentChk.checked; saveState(); });
visualChk.addEventListener('change', () => { state.visual = visualChk.checked; applyVisual(); saveState(); });

startBtn.addEventListener('click', toggle);

/* ---------- Klavye ---------- */
const box = $('mt-box');
/** Kısayollar yalnızca odak araç kutusundaysa ya da odak boşta iken araç ekrandaysa çalışır; böylece sayfa metnini okurken Boşluk/ok kaydırması bozulmaz. */
function keysActive(t) {
  if (box.contains(t)) return true;
  if (t !== document.body) return false;
  const r = box.getBoundingClientRect();
  const visible = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0); // ekrandaki yükseklik
  return visible >= 160;
}
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const t = e.target;
  if (!keysActive(t)) return;
  const tag = t && t.tagName;
  const isButton = tag === 'BUTTON' || tag === 'A' || tag === 'SUMMARY';
  const isRange = tag === 'INPUT' && t.type === 'range';
  const isCheck = tag === 'INPUT' && t.type === 'checkbox';
  const isField = tag === 'SELECT' || tag === 'TEXTAREA' || (tag === 'INPUT' && !isRange && !isCheck);
  if (e.key === ' ' || e.code === 'Space') {
    // Odaktaki düğme/onay kutusu Boşlukla zaten kendi işini yapar; çift tetiklenmesin
    if (isButton || isField || isCheck) return;
    e.preventDefault();
    toggle();
    return;
  }
  if (isField || isRange) return; // alanların kendi ok tuşu davranışı var
  const big = e.shiftKey ? 5 : 1;
  if (e.key === 'ArrowUp' || e.key === 'ArrowRight') { e.preventDefault(); step(big); }
  else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') { e.preventDefault(); step(-big); }
  else if ((e.key === 't' || e.key === 'T') && !isButton) { tap(); }
});

/* ---------- Başlangıç ---------- */
loadState();
meterSel.value = state.meter;
subSel.value = state.sub;
soundSel.value = state.sound;
volSlider.value = String(state.volume);
accentChk.checked = state.accent;
visualChk.checked = state.visual;
buildDots();
applyMeterNote();
applyVisual();
setBpm(state.bpm);
window.addEventListener('pagehide', stop);
