// Online Piyano — Web Audio ile sentez; ses dosyası, kütüphane ve ağ isteği yok.
// Ayarlar yalnızca bu tarayıcının localStorage alanında durur; kayıtlar yalnızca bellekte tutulur.

const STORE_KEY = 'ba-oyun-online-piyano';

const NAMES_INTL = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NAMES_SOL = ['Do', 'Do#', 'Re', 'Re#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si'];
const IS_BLACK = [false, true, false, true, false, false, true, false, true, false, true, false];

// Bilgisayar klavyesi: fiziksel tuş konumu (e.code) → seçili oktavın C notasından yarım ses uzaklığı.
// Alt sıra beyaz, üst sıra siyah tuşlardır (A S D F G H J K L ; ve W E T Y U O P).
const KEY_MAP = {
  KeyA: 0, KeyW: 1, KeyS: 2, KeyE: 3, KeyD: 4, KeyF: 5, KeyT: 6, KeyG: 7, KeyY: 8,
  KeyH: 9, KeyU: 10, KeyJ: 11, KeyK: 12, KeyO: 13, KeyL: 14, KeyP: 15, Semicolon: 16,
};
const KEY_HINT = ['A', 'W', 'S', 'E', 'D', 'F', 'T', 'G', 'Y', 'H', 'U', 'J', 'K', 'O', 'L', 'P', ';'];

const MIN_BASE = 1;
const MAX_TOP_OCT = 7;
const MAX_VOICES = 24;

// Kendi yazdığımız kısa melodiler: hepsi kamu malı ezgi ya da alıştırma dizisi.
const MELODIES = [
  { id: 'gam', name: 'Do majör gam', notes: 'C4 D4 E4 F4 G4 A4 B4 C5 B4 A4 G4 F4 E4 D4 C4' },
  { id: 'arpej', name: 'Do majör arpej', notes: 'C4 E4 G4 C5 E5 C5 G4 E4 C4 F4 A4 C5 A4 F4 G4 B4 D5 B4 G4 C4 E4 G4 C5' },
  { id: 'twinkle', name: 'Twinkle, Twinkle, Little Star', notes: 'C4 C4 G4 G4 A4 A4 G4 F4 F4 E4 E4 D4 D4 C4 G4 G4 F4 F4 E4 E4 D4 G4 G4 F4 F4 E4 E4 D4 C4 C4 G4 G4 A4 A4 G4 F4 F4 E4 E4 D4 D4 C4' },
  { id: 'ode', name: 'Neşeye Övgü (Beethoven)', notes: 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4 E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 D4 C4 C4' },
  { id: 'mary', name: 'Mary Had a Little Lamb', notes: 'E4 D4 C4 D4 E4 E4 E4 D4 D4 D4 E4 G4 G4 E4 D4 C4 D4 E4 E4 E4 E4 D4 D4 E4 D4 C4' },
];

const $ = (id) => document.getElementById(id);
const box = $('game-box');
const board = $('board');
const keysEl = $('keys');
const elLast = $('hud-last');
const elRange = $('hud-range');
const elRec = $('hud-rec');
const elStatus = $('status');
const elAudioNote = $('audio-note');

/* ---------- Nota yardımcıları ---------- */

const midiToFreq = (m) => 440 * Math.pow(2, (m - 69) / 12);
const octOf = (m) => Math.floor(m / 12) - 1;
const noteName = (m) => `${NAMES_INTL[m % 12]}${octOf(m)}`; // C#4 gibi (test ve kod için)
const solName = (m) => `${NAMES_SOL[m % 12]}${octOf(m)}`;
function parseNote(s) {
  const mt = /^([A-G]#?)(\d)$/.exec(s);
  return mt ? (Number(mt[2]) + 1) * 12 + NAMES_INTL.indexOf(mt[1]) : 0;
}
const pretty = (s) => s.replace('#', '♯');
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
MELODIES.forEach((m) => { m.midi = m.notes.split(' ').map(parseNote); });

/* ---------- Kalıcı ayarlar (yalnızca localStorage) ---------- */

const SOUNDS = ['piano', 'organ', 'sine'];
const LABELS = ['none', 'intl', 'sol', 'keys'];

function loadStore() {
  const def = { sound: 'piano', labels: 'intl', octaves: 2, base: 4, sustain: false, volume: 0.7 };
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (!raw || typeof raw !== 'object') return def;
    const octaves = raw.octaves === 3 ? 3 : 2;
    return {
      sound: SOUNDS.includes(raw.sound) ? raw.sound : def.sound,
      labels: LABELS.includes(raw.labels) ? raw.labels : def.labels,
      octaves,
      base: Number.isInteger(raw.base) ? clamp(raw.base, MIN_BASE, MAX_TOP_OCT - octaves + 1) : def.base,
      sustain: raw.sustain === true,
      volume: Number.isFinite(raw.volume) ? clamp(raw.volume, 0, 1) : def.volume,
    };
  } catch (_) {
    return def; // localStorage kapalı ya da bozuk: piyano yine çalışır
  }
}
const store = loadStore();
function saveStore() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (_) { /* özel gezinme modu */ }
}

/* ---------- Durum ---------- */

let sound = store.sound;
let labelMode = store.labels;
let octaves = store.octaves;
let baseOct = store.base;
let sustainToggle = store.sustain;
let spaceHeld = false;
let volume = store.volume;

let lastMidi = 0;
let lastSource = '';
let playedCount = 0;

const voices = new Map(); // kaynak kimliği → { midi, voice, user, ev }
const sustained = new Set(); // sustain nedeniyle bırakılmayı bekleyen sesler
const visual = new Map(); // midi → basılı sayısı (tuş görünümü için)

const announce = (msg) => { elStatus.textContent = msg; };

/* ---------- Ses motoru (Web Audio) ---------- */

let actx = null;
let master = null;
let audioFailed = false;

// AudioContext yalnızca kullanıcı etkileşimiyle oluşturulur; askıdaysa resume() çağrılır.
function ensureAudio() {
  if (audioFailed) return null;
  try {
    if (!actx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) throw new Error('no-webaudio');
      actx = new AC();
      master = actx.createGain();
      master.gain.value = volume;
      const comp = actx.createDynamicsCompressor(); // çok parmaklı basışta bozulmayı önler
      comp.threshold.value = -14;
      comp.ratio.value = 6;
      master.connect(comp);
      comp.connect(actx.destination);
    }
    if (actx.state === 'suspended') actx.resume().catch(() => {});
    return actx;
  } catch (_) {
    audioFailed = true;
    if (elAudioNote) {
      elAudioNote.hidden = false;
      elAudioNote.textContent = 'Bu tarayıcıda ses motoru açılamadı. Tuşlar görsel olarak çalışır; sesi duymak için güncel bir tarayıcı deneyin.';
    }
    return null;
  }
}

// Ses tipleri: [harmonik çarpanı, bağıl yükseklik, dalga biçimi]
const PROFILES = {
  piano: {
    partials: [[1, 1, 'triangle'], [1.003, 0.55, 'sine'], [2, 0.36, 'sine'], [3, 0.2, 'sine'], [4, 0.1, 'sine'], [6, 0.04, 'sine']],
    attack: 0.006,
    release: 0.24,
  },
  organ: {
    partials: [[0.5, 0.4, 'sine'], [1, 1, 'sine'], [2, 0.55, 'sine'], [3, 0.3, 'sine'], [4, 0.22, 'sine']],
    attack: 0.02,
    release: 0.1,
  },
  sine: {
    partials: [[1, 1, 'sine']],
    attack: 0.012,
    release: 0.18,
  },
};

function startVoice(midi) {
  const c = ensureAudio();
  if (!c || !master) return null;
  try {
    const t = c.currentTime;
    const f = midiToFreq(midi);
    const prof = PROFILES[sound] || PROFILES.piano;
    const rel = c.createGain(); // bırakma zarfı (yalnızca bırakınca değişir)
    rel.gain.value = 1;
    rel.connect(master);
    const env = c.createGain(); // vuruş / sönme zarfı
    env.connect(rel);
    const peak = 0.3;
    env.gain.setValueAtTime(0.0001, t);
    env.gain.linearRampToValueAtTime(peak, t + prof.attack);
    // Piyanoda alçak sesler daha uzun yankılanır; tuş basılı olsa da ses zamanla söner.
    const tau = clamp(1.9 - (midi - 40) * 0.022, 0.45, 2);
    if (sound === 'piano') env.gain.setTargetAtTime(0, t + prof.attack, tau);
    const total = prof.partials.reduce((s, p) => s + p[1], 0);
    const oscs = prof.partials.map((p, i) => {
      const o = c.createOscillator();
      o.type = p[2];
      o.frequency.value = f * p[0];
      const g = c.createGain();
      const lvl = p[1] / total;
      g.gain.setValueAtTime(lvl, t);
      // Üst harmonikler daha çabuk söner: ses zamanla yumuşar
      if (sound === 'piano' && i > 1) g.gain.setTargetAtTime(lvl * 0.12, t + prof.attack, tau / (1 + 0.5 * i));
      o.connect(g);
      g.connect(env);
      o.start(t);
      if (sound === 'piano') o.stop(t + Math.min(9, tau * 6));
      return o;
    });
    oscs[0].onended = () => { try { rel.disconnect(); } catch (_) { /* zaten ayrılmış */ } };
    return { c, rel, oscs, prof };
  } catch (_) {
    return null;
  }
}

function releaseVoice(v) {
  if (!v) return;
  try {
    const t = v.c.currentTime;
    v.rel.gain.setTargetAtTime(0, t, v.prof.release / 4);
    v.oscs.forEach((o) => { try { o.stop(t + v.prof.release + 0.06); } catch (_) { /* bitmiş */ } });
  } catch (_) { /* ses bağlamı kapalı */ }
}

/* ---------- Klavye görünümü ---------- */

function keyEl(midi) { return keysEl.querySelector(`[data-midi="${midi}"]`); }
function setKeyClass(midi, cls, on) {
  const el = keyEl(midi);
  if (el) el.classList.toggle(cls, on);
}
function flashKey(midi, cls) {
  const el = keyEl(midi);
  if (!el) return;
  el.classList.add(cls);
  setTimeout(() => el.classList.remove(cls), 260);
}

function labelFor(midi) {
  if (labelMode === 'intl') return pretty(noteName(midi));
  if (labelMode === 'sol') return pretty(solName(midi));
  if (labelMode === 'keys') {
    const off = midi - (baseOct + 1) * 12;
    return off >= 0 && off < KEY_HINT.length ? KEY_HINT[off] : '';
  }
  return '';
}

function updateLabels() {
  keysEl.querySelectorAll('.pn-key').forEach((el) => {
    el.querySelector('.pn-lab').textContent = labelFor(Number(el.dataset.midi));
  });
}

function buildKeys() {
  keysEl.textContent = '';
  const first = (baseOct + 1) * 12;
  const last = first + octaves * 12 - 1;
  const whiteCount = octaves * 7;
  keysEl.style.setProperty('--n', String(whiteCount));
  const whites = document.createElement('div');
  whites.className = 'pn-whites';
  const blacks = document.createElement('div');
  blacks.className = 'pn-blacks';
  const bw = (0.62 / whiteCount) * 100;
  let wi = 0;
  for (let m = first; m <= last; m++) {
    const black = IS_BLACK[m % 12];
    const b = document.createElement('button');
    b.type = 'button';
    b.tabIndex = -1;
    b.className = `pn-key ${black ? 'black' : 'white'}`;
    b.dataset.midi = String(m);
    b.setAttribute('aria-label', `${pretty(solName(m))} (${pretty(noteName(m))})`);
    const lab = document.createElement('span');
    lab.className = 'pn-lab';
    b.appendChild(lab);
    if (black) {
      b.style.left = `${((wi / whiteCount) * 100 - bw / 2).toFixed(4)}%`;
      b.style.width = `${bw.toFixed(4)}%`;
      blacks.appendChild(b);
    } else {
      whites.appendChild(b);
      wi++;
    }
  }
  keysEl.appendChild(whites);
  keysEl.appendChild(blacks);
  updateLabels();
  visual.forEach((n, m) => { if (n > 0) setKeyClass(m, 'is-down', true); });
  markTarget();
  elRange.textContent = `${pretty(noteName(first))} – ${pretty(noteName(last))}`;
  syncUi();
}

/* ---------- Sustain (pedal) ---------- */

const sustainActive = () => sustainToggle || spaceHeld;
function syncSustain() {
  if (!sustainActive() && sustained.size) {
    sustained.forEach((v) => releaseVoice(v.voice));
    sustained.clear();
  }
  const btn = $('btn-sustain');
  btn.setAttribute('aria-pressed', sustainActive() ? 'true' : 'false');
  btn.classList.toggle('on', sustainActive());
}

/* ---------- Kayıt ---------- */

const rec = { on: false, t0: 0, events: [] }; // events: [{ midi, at, dur }] (ms)

function startRecording() {
  stopPlayback();
  rec.on = true;
  rec.t0 = performance.now();
  rec.events = [];
  announce('Kayıt başladı. Çaldığınız notalar belleğe kaydediliyor.');
  syncUi();
}
function stopRecording() {
  if (!rec.on) return;
  rec.on = false;
  announce(rec.events.length ? `Kayıt durdu: ${rec.events.length} nota kaydedildi.` : 'Kayıt durdu: hiç nota çalınmadı.');
  syncUi();
}
function recDuration() {
  return rec.events.reduce((m, e) => Math.max(m, e.at + e.dur), 0);
}

/* ---------- Oynatma (kayıt ve melodi dinleme) ---------- */

let playback = null; // { kind: 'rec' | 'demo', timers: [] }

function stopPlayback() {
  if (!playback) return;
  playback.timers.forEach(clearTimeout);
  playback = null;
  [...voices.keys()].filter((k) => k.startsWith('seq:')).forEach((k) => noteOff(k, true));
  syncUi();
}

function playEvents(events, kind) {
  ensureAudio();
  stopPlayback();
  if (!events.length) return;
  const pb = { kind, timers: [] };
  playback = pb;
  let end = 0;
  events.forEach((ev, i) => {
    pb.timers.push(setTimeout(() => noteOn(`seq:${i}`, ev.midi, { seq: true }), ev.at));
    pb.timers.push(setTimeout(() => noteOff(`seq:${i}`, true), ev.at + ev.dur));
    end = Math.max(end, ev.at + ev.dur);
  });
  pb.timers.push(setTimeout(() => { if (playback === pb) stopPlayback(); }, end + 250));
  syncUi();
}

/* ---------- Melodi öğren modu ---------- */

let lesson = null; // { idx, pos, wrong, done }
let targetMidi = 0;

function markTarget() {
  if (targetMidi) setKeyClass(targetMidi, 'is-target', false);
  targetMidi = lesson && !lesson.done ? MELODIES[lesson.idx].midi[lesson.pos] : 0;
  if (targetMidi) setKeyClass(targetMidi, 'is-target', true);
}

function revealTarget() {
  // Dar ekranda yatay kaydırılan klavyede hedef tuşu görünür alana getirir
  if (!targetMidi || board.scrollWidth <= board.clientWidth) return;
  const el = keyEl(targetMidi);
  if (!el) return;
  const mid = el.offsetLeft + el.offsetWidth / 2;
  board.scrollLeft = Math.max(0, mid - board.clientWidth / 2);
}

function renderLesson() {
  const status = $('lesson-status');
  const bar = $('lesson-bar');
  const wrap = $('lesson-progress');
  document.querySelectorAll('[data-melody]').forEach((b) => {
    b.setAttribute('aria-pressed', lesson && Number(b.dataset.melody) === lesson.idx ? 'true' : 'false');
  });
  const has = !!lesson;
  $('btn-listen').disabled = !has;
  $('btn-lesson-reset').disabled = !has;
  $('btn-lesson-off').disabled = !has;
  if (!has) {
    status.textContent = 'Bir melodi seçin: sıradaki tuş yanar, doğru tuşa basınca ilerlersiniz. Seçmezseniz serbest çalarsınız.';
    bar.style.width = '0%';
    wrap.setAttribute('aria-valuenow', '0');
    return;
  }
  const m = MELODIES[lesson.idx];
  const total = m.midi.length;
  bar.style.width = `${(lesson.pos / total) * 100}%`;
  wrap.setAttribute('aria-valuenow', String(lesson.pos));
  wrap.setAttribute('aria-valuemax', String(total));
  if (lesson.done) {
    status.textContent = `Tebrikler! "${m.name}" tamamlandı. Yanlış basış: ${lesson.wrong}. Baştan başlayabilir ya da başka bir melodi seçebilirsiniz.`;
  } else {
    const next = m.midi[lesson.pos];
    const first = (baseOct + 1) * 12;
    const visible = next >= first && next < first + octaves * 12;
    status.textContent = `Adım ${lesson.pos + 1} / ${total} · Sıradaki nota: ${pretty(noteName(next))} (${pretty(solName(next))}) · Yanlış basış: ${lesson.wrong}${visible ? '' : ' · Hedef tuş görünmüyor, oktavı değiştirin.'}`;
  }
}

function startLesson(idx) {
  stopPlayback();
  if (baseOct !== 4) { baseOct = 4; store.base = 4; saveStore(); buildKeys(); }
  lesson = { idx, pos: 0, wrong: 0, done: false };
  markTarget();
  renderLesson();
  revealTarget();
  announce(`${MELODIES[idx].name} seçildi. Yanan tuşlara sırayla basın.`);
}

function stopLesson() {
  stopPlayback();
  lesson = null;
  markTarget();
  renderLesson();
}

function lessonPress(midi) {
  if (!lesson || lesson.done) return;
  const m = MELODIES[lesson.idx];
  if (midi === m.midi[lesson.pos]) {
    lesson.pos += 1;
    flashKey(midi, 'is-ok');
    if (lesson.pos >= m.midi.length) {
      lesson.done = true;
      announce(`Tebrikler, ${m.name} tamamlandı.`);
    }
  } else {
    lesson.wrong += 1;
    flashKey(midi, 'is-wrong');
  }
  markTarget();
  renderLesson();
  revealTarget();
}

function listenLesson() {
  if (!lesson) return;
  const m = MELODIES[lesson.idx];
  const events = m.midi.map((midi, i) => ({ midi, at: i * 420, dur: 360 }));
  playEvents(events, 'demo');
}

/* ---------- Nota çalma ---------- */

function noteOn(id, midi, opts = {}) {
  if (voices.has(id)) noteOff(id, true); // aynı kaynak yeniden basarsa öncekini bırak
  const voice = startVoice(midi);
  const entry = { midi, voice, user: !opts.seq, ev: null };
  voices.set(id, entry);
  if (voices.size > MAX_VOICES) {
    const oldest = voices.keys().next().value;
    if (oldest !== id) noteOff(oldest, true);
  }
  visual.set(midi, (visual.get(midi) || 0) + 1);
  setKeyClass(midi, 'is-down', true);
  lastMidi = midi;
  lastSource = opts.seq ? 'seq' : 'user';
  playedCount += 1;
  syncUi();
  if (!opts.seq) {
    if (rec.on && rec.events.length < 2000) {
      entry.ev = { midi, at: Math.round(performance.now() - rec.t0), dur: 120 };
      rec.events.push(entry.ev);
      syncUi();
    }
    lessonPress(midi);
  }
}

function noteOff(id, force = false) {
  const entry = voices.get(id);
  if (!entry) return;
  voices.delete(id);
  const n = (visual.get(entry.midi) || 1) - 1;
  if (n > 0) visual.set(entry.midi, n); else visual.delete(entry.midi);
  setKeyClass(entry.midi, 'is-down', n > 0);
  if (entry.ev) entry.ev.dur = Math.max(80, Math.round(performance.now() - rec.t0 - entry.ev.at));
  if (entry.user && !force && sustainActive()) sustained.add(entry);
  else releaseVoice(entry.voice);
}

function releaseAll() {
  [...voices.keys()].forEach((k) => noteOff(k, true));
  sustained.forEach((v) => releaseVoice(v.voice));
  sustained.clear();
  pointers.clear();
  pointerMidi.clear();
}

/* ---------- Ekran bilgileri ---------- */

function syncUi() {
  elLast.textContent = lastMidi ? pretty(noteName(lastMidi)) : '—';
  elRec.textContent = rec.events.length ? String(rec.events.length) : '—';
  board.dataset.last = lastMidi ? noteName(lastMidi) : '';
  board.dataset.octave = String(baseOct);
  const btnRec = $('btn-rec');
  btnRec.textContent = rec.on ? 'Kaydı durdur' : 'Kaydı başlat';
  btnRec.setAttribute('aria-pressed', rec.on ? 'true' : 'false');
  btnRec.classList.toggle('rec-on', rec.on);
  const btnPlay = $('btn-play');
  const playingRec = !!playback && playback.kind === 'rec';
  btnPlay.textContent = playingRec ? 'Oynatmayı durdur' : 'Kaydı oynat';
  btnPlay.disabled = !rec.events.length && !playingRec;
  $('btn-clear').disabled = !rec.events.length;
  const info = $('rec-info');
  info.textContent = rec.events.length
    ? `${rec.events.length} nota · yaklaşık ${(recDuration() / 1000).toFixed(1).replace('.', ',')} sn bellekte (sayfayı kapatınca silinir).`
    : 'Henüz kayıt yok. "Kaydı başlat"a basıp çalın; kayıt yalnızca bu sayfanın belleğinde tutulur.';
  const listening = !!playback && playback.kind === 'demo';
  $('btn-listen').textContent = listening ? 'Dinlemeyi durdur' : 'Melodiyi dinle';
}

function setSeg(attr, value) {
  document.querySelectorAll(`[data-${attr}]`).forEach((b) => {
    b.setAttribute('aria-pressed', b.dataset[attr] === String(value) ? 'true' : 'false');
  });
}

function syncSettings() {
  setSeg('sound', sound);
  setSeg('labels', labelMode);
  setSeg('octaves', octaves);
  $('opt-volume').value = String(Math.round(volume * 100));
  $('volume-val').textContent = `%${Math.round(volume * 100)}`;
  syncSustain();
}

function persist() {
  store.sound = sound;
  store.labels = labelMode;
  store.octaves = octaves;
  store.base = baseOct;
  store.sustain = sustainToggle;
  store.volume = volume;
  saveStore();
}

/* ---------- Girdiler ---------- */

function shiftOctave(delta) {
  const next = clamp(baseOct + delta, MIN_BASE, MAX_TOP_OCT - octaves + 1);
  if (next === baseOct) return;
  baseOct = next;
  persist();
  buildKeys();
  renderLesson();
  announce(`Oktav kaydırıldı: ${elRange.textContent}.`);
}

function setOctaves(n) {
  octaves = n;
  baseOct = clamp(baseOct, MIN_BASE, MAX_TOP_OCT - octaves + 1);
  persist();
  buildKeys();
  syncSettings();
  renderLesson();
}

const isInBox = (el) => el instanceof Node && box.contains(el);
const pianoContext = (t) => t === document.body || t === document.documentElement || isInBox(t);

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const t = e.target;
  // Seçim kutusu ve metin alanlarında yazma/aramalı seçim bozulmasın
  if (t instanceof Element && t.closest('select, textarea, input:not([type="range"]):not([type="checkbox"])')) return;
  if (!pianoContext(t)) return;
  if (e.code === 'Space') {
    // Odaktaki düğme Boşluk'u kendi tıklaması için kullanır; ona karışma. Sayfa kaydırma da yalnızca kutu içinde engellenir.
    if (!isInBox(t) || (t instanceof Element && t.closest('button, a, summary'))) return;
    e.preventDefault();
    if (!e.repeat && !spaceHeld) { spaceHeld = true; syncSustain(); }
    return;
  }
  if (e.code === 'KeyZ' || e.code === 'KeyX') {
    e.preventDefault();
    if (!e.repeat) shiftOctave(e.code === 'KeyZ' ? -1 : 1);
    return;
  }
  const off = KEY_MAP[e.code];
  if (off === undefined) return;
  e.preventDefault();
  if (e.repeat) return;
  noteOn(`k:${e.code}`, (baseOct + 1) * 12 + off);
});

// Her tuş basıldığı notayla bırakılır; oktav kaydırılsa bile takılı nota kalmaz (kimlik tuşa bağlıdır).
document.addEventListener('keyup', (e) => {
  if (e.code === 'Space') {
    if (spaceHeld) { spaceHeld = false; syncSustain(); }
    return;
  }
  if (KEY_MAP[e.code] !== undefined) noteOff(`k:${e.code}`);
});

window.addEventListener('blur', () => { spaceHeld = false; releaseAll(); syncSustain(); });
document.addEventListener('visibilitychange', () => { if (document.hidden) { spaceHeld = false; releaseAll(); stopPlayback(); syncSustain(); } });

// Dokunmatik ve fare: her işaretçi (parmak) kendi sesini çalar; sürüklenince komşu tuşa geçer (glissando).
const pointers = new Map(); // pointerId → kaynak kimliği
const pointerMidi = new Map(); // pointerId → midi

keysEl.addEventListener('pointerdown', (e) => {
  const k = e.target instanceof Element ? e.target.closest('.pn-key') : null;
  if (!k) return;
  if (e.pointerType === 'mouse' && e.button !== 0) return;
  e.preventDefault();
  board.focus({ preventScroll: true });
  const midi = Number(k.dataset.midi);
  const id = `p:${e.pointerId}`;
  pointers.set(e.pointerId, id);
  pointerMidi.set(e.pointerId, midi);
  noteOn(id, midi);
});

function endPointer(e) {
  const id = pointers.get(e.pointerId);
  if (!id) return;
  pointers.delete(e.pointerId);
  pointerMidi.delete(e.pointerId);
  noteOff(id);
}
document.addEventListener('pointerup', endPointer);
document.addEventListener('pointercancel', endPointer);
document.addEventListener('pointermove', (e) => {
  if (!pointers.has(e.pointerId) || e.pointerType === 'touch') return;
  const under = document.elementFromPoint(e.clientX, e.clientY);
  const k = under instanceof Element ? under.closest('.pn-key') : null;
  if (!k) return;
  const midi = Number(k.dataset.midi);
  if (midi === pointerMidi.get(e.pointerId)) return;
  const id = pointers.get(e.pointerId);
  noteOff(id);
  pointerMidi.set(e.pointerId, midi);
  noteOn(id, midi);
});
keysEl.addEventListener('contextmenu', (e) => e.preventDefault());

/* ---------- Düğmeler ve ayarlar ---------- */

// Fareyle tıklanan düğmeden sonra odak kutuya döner: böylece Boşluk (sustain) ve harfler çalışmaya devam eder.
box.addEventListener('click', (e) => {
  const b = e.target instanceof Element ? e.target.closest('button') : null;
  if (b && e.detail > 0 && !b.classList.contains('pn-key')) board.focus({ preventScroll: true });
});

document.querySelectorAll('[data-sound]').forEach((b) => b.addEventListener('click', () => {
  sound = b.dataset.sound;
  persist();
  syncSettings();
  ensureAudio();
}));
document.querySelectorAll('[data-labels]').forEach((b) => b.addEventListener('click', () => {
  labelMode = b.dataset.labels;
  persist();
  updateLabels();
  syncSettings();
}));
document.querySelectorAll('[data-octaves]').forEach((b) => b.addEventListener('click', () => setOctaves(Number(b.dataset.octaves))));
$('btn-oct-down').addEventListener('click', () => shiftOctave(-1));
$('btn-oct-up').addEventListener('click', () => shiftOctave(1));

$('btn-sustain').addEventListener('click', () => {
  sustainToggle = !sustainToggle;
  persist();
  syncSustain();
  announce(sustainToggle ? 'Sustain açık.' : 'Sustain kapalı.');
});

$('opt-volume').addEventListener('input', (e) => {
  volume = clamp(Number(e.target.value) / 100, 0, 1);
  if (master && actx) master.gain.setTargetAtTime(volume, actx.currentTime, 0.02);
  $('volume-val').textContent = `%${Math.round(volume * 100)}`;
  persist();
});

$('btn-rec').addEventListener('click', () => { if (rec.on) stopRecording(); else startRecording(); });
$('btn-play').addEventListener('click', () => {
  if (playback && playback.kind === 'rec') { stopPlayback(); return; }
  if (rec.on) stopRecording();
  playEvents(rec.events.map((ev) => ({ ...ev })), 'rec');
});
$('btn-clear').addEventListener('click', () => {
  stopPlayback();
  rec.on = false;
  rec.events = [];
  syncUi();
  announce('Kayıt silindi.');
});

const list = $('melody-list');
MELODIES.forEach((m, i) => {
  const b = document.createElement('button');
  b.type = 'button';
  b.dataset.melody = String(i);
  b.setAttribute('aria-pressed', 'false');
  b.textContent = m.name;
  list.appendChild(b);
  b.addEventListener('click', () => {
    if (lesson && lesson.idx === i && !lesson.done) stopLesson(); // aynı melodiye tekrar basınca kapanır
    else startLesson(i);
  });
});
$('btn-listen').addEventListener('click', () => {
  if (playback && playback.kind === 'demo') stopPlayback(); else listenLesson();
});
$('btn-lesson-reset').addEventListener('click', () => { if (lesson) startLesson(lesson.idx); });
$('btn-lesson-off').addEventListener('click', stopLesson);

const btnFull = $('btn-full');
if (!(document.fullscreenEnabled || document.webkitFullscreenEnabled) || !box.requestFullscreen) {
  btnFull.hidden = true; // iPhone Safari gibi tam ekranı desteklemeyen tarayıcılar
} else {
  btnFull.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else box.requestFullscreen().catch(() => {});
  });
  document.addEventListener('fullscreenchange', () => {
    const on = document.fullscreenElement === box;
    btnFull.textContent = on ? 'Tam ekrandan çık' : 'Tam ekran';
    btnFull.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
}

/* ---------- Test kancası ---------- */

// Otomatik testler için salt okunur özet (ağa ya da depoya yazmaz).
window.__piyanoTest = () => ({
  last: lastMidi ? noteName(lastMidi) : null,
  lastFreq: lastMidi ? midiToFreq(lastMidi) : null,
  lastSource,
  played: playedCount,
  ctxState: actx ? actx.state : null,
  octave: baseOct,
  octaves,
  sound,
  sustain: sustainActive(),
  recording: rec.on,
  recorded: rec.events.length,
  recordedNotes: rec.events.map((e) => noteName(e.midi)),
  playing: playback ? playback.kind : null,
  active: [...visual.keys()].map(noteName),
  lesson: lesson
    ? { name: MELODIES[lesson.idx].name, pos: lesson.pos, length: MELODIES[lesson.idx].midi.length, wrong: lesson.wrong, done: lesson.done, target: targetMidi ? noteName(targetMidi) : null }
    : null,
});

/* ---------- Başlangıç ---------- */

buildKeys();
syncSettings();
renderLesson();
syncUi();
