// Matematik Yarışı: zihinden dört işlem, 60/120 sn süre veya 20 soru, günlük mod, tohumlu soru üretimi.
// Tamamen istemci tarafı; en iyi skorlar yalnızca bu cihazdaki localStorage'a yazılır, dış istek yoktur.

const STORE_KEY = 'ba-oyun-matematik-yarisi';
const MODES = ['t60', 't120', 'q20', 'daily'];
const SYMBOL = { add: '+', sub: '−', mul: '×', div: '÷' };

const $ = (id) => document.getElementById(id);
const show = (id, on) => { $(id).hidden = !on; };

// ---- Kayıt (bozuk veriye dayanıklı) ----
function loadBest() {
  const best = {};
  MODES.forEach((m) => { best[m] = 0; });
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return best;
    MODES.forEach((m) => {
      const v = raw[m];
      best[m] = Number.isFinite(v) && v > 0 && v < 1e7 ? Math.floor(v) : 0;
    });
  } catch (e) { /* bozuk JSON: sıfırdan başla */ }
  return best;
}
function saveBest(best) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(best)); } catch (e) { /* özel gezinti: yazılamaz, oyun yine çalışır */ }
}

// ---- Tohumlu rastgele sayı üreteci (mulberry32) ----
function hashSeed(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function makeRng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function urlSeed() {
  try {
    const v = new URLSearchParams(location.search).get('seed');
    if (v !== null && v !== '' && v.length <= 40) return String(v);
  } catch (e) { /* adres okunamadı: rastgele tohum */ }
  return null;
}

function todayKey() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
}

// ---- Durum ----
const state = {
  running: false,
  opts: { op: 'mix', level: 2, mode: 't60' },
  rng: Math.random,
  seedLabel: '',
  q: null,
  asked: 0,
  answered: 0,
  score: 0,
  streak: 0,
  bestStreak: 0,
  correct: 0,
  wrong: 0,
  wrongList: [],
  startAt: 0,
  endAt: 0,
  limit: 0, // saniye (süre modları) ya da 0
  maxQ: 0, // soru sayısı (20 soru modları) ya da 0
  tick: null,
  best: loadBest(),
};

// ---- Soru üretimi ----
const pick = (min, max) => Math.floor(state.rng() * (max - min + 1)) + min;

function genQuestion(op, level) {
  let a;
  let b;
  let answer;
  if (op === 'add') {
    const lo = level === 1 ? 1 : Math.pow(10, level - 1);
    const hi = Math.pow(10, level) - 1;
    a = pick(lo, hi); b = pick(lo, hi); answer = a + b;
  } else if (op === 'sub') {
    const lo = level === 1 ? 1 : Math.pow(10, level - 1);
    const hi = Math.pow(10, level) - 1;
    a = pick(lo, hi); b = pick(lo, hi);
    if (b > a) [a, b] = [b, a];
    answer = a - b;
  } else if (op === 'mul') {
    if (level === 1) { a = pick(2, 9); b = pick(2, 9); }
    else if (level === 2) { a = pick(11, 99); b = pick(2, 9); }
    else { a = pick(11, 99); b = pick(11, 99); }
    answer = a * b;
  } else {
    let q;
    if (level === 1) { b = pick(2, 9); q = pick(2, 9); }
    else if (level === 2) { b = pick(2, 9); q = pick(11, 99); }
    else { b = pick(11, 25); q = pick(11, 99); }
    a = b * q; answer = q;
  }
  return { op, a, b, answer, text: a + ' ' + SYMBOL[op] + ' ' + b };
}

function nextQuestion() {
  const ops = ['add', 'sub', 'mul', 'div'];
  const op = state.opts.op === 'mix' ? ops[pick(0, 3)] : state.opts.op;
  state.q = genQuestion(op, state.opts.level);
  state.asked += 1;
  $('mt-q').textContent = state.q.text + ' = ?';
  const input = $('mt-input');
  input.value = '';
  input.focus();
  if (state.maxQ) $('mt-progress').textContent = state.asked + ' / ' + state.maxQ;
}

// ---- Arayüz ----
function renderBest() {
  const b = state.best;
  $('mt-best').textContent = b[state.opts.mode] ? String(b[state.opts.mode]) : 'henüz yok';
}
function renderStats() {
  const total = state.correct + state.wrong;
  $('mt-score').textContent = String(state.score);
  $('mt-streak').textContent = String(state.streak);
  $('mt-correct').textContent = String(state.correct);
  $('mt-wrong').textContent = String(state.wrong);
  $('mt-acc').textContent = total ? '%' + Math.round((state.correct / total) * 100) : '—';
}
function setFeedback(text, kind) {
  const el = $('mt-fb');
  el.textContent = text;
  el.dataset.kind = kind || '';
}
function renderClock() {
  if (state.limit) {
    $('mt-clock-label').textContent = 'Kalan';
    $('mt-clock').textContent = Math.max(0, Math.ceil((state.endAt - Date.now()) / 1000)) + ' sn';
  } else {
    $('mt-clock-label').textContent = 'Geçen';
    $('mt-clock').textContent = Math.floor((Date.now() - state.startAt) / 1000) + ' sn';
  }
}

function readOptions() {
  const val = (name) => document.querySelector('input[name="' + name + '"]:checked').value;
  const mode = val('mt-mode');
  state.opts = { op: val('mt-op'), level: Number(val('mt-level')), mode: MODES.includes(mode) ? mode : 't60' };
  if (state.opts.mode === 'daily') { state.opts.op = 'mix'; state.opts.level = 2; }
}

function startGame() {
  if (state.tick) clearInterval(state.tick);
  readOptions();
  const { mode } = state.opts;
  // Tohum önceliği: günlük mod > ?seed= > rastgele
  const forced = urlSeed();
  let seed;
  if (mode === 'daily') seed = 'gunluk-' + todayKey();
  else if (forced !== null) seed = forced;
  else seed = String(Math.floor(Math.random() * 4294967296));
  state.seedLabel = seed;
  state.rng = makeRng(hashSeed(seed + '|' + state.opts.op + '|' + state.opts.level));
  Object.assign(state, {
    running: true, q: null, asked: 0, answered: 0, score: 0, streak: 0, bestStreak: 0,
    correct: 0, wrong: 0, wrongList: [],
    limit: mode === 't60' ? 60 : mode === 't120' ? 120 : 0,
    maxQ: mode === 'q20' || mode === 'daily' ? 20 : 0,
  });
  state.startAt = Date.now();
  state.endAt = state.startAt + state.limit * 1000;
  show('mt-setup', false);
  show('mt-result', false);
  show('mt-game', true);
  show('mt-progress-box', Boolean(state.maxQ));
  $('mt-mode-note').textContent = mode === 'daily'
    ? 'Günlük meydan okuma (' + todayKey() + '): bugün herkes aynı 20 soruyu çözer.'
    : state.limit ? state.limit + ' saniyede olabildiğince çok soru çöz.' : '20 soruyu en hızlı ve doğru şekilde bitir.';
  setFeedback('', '');
  renderStats();
  renderClock();
  renderBest();
  state.tick = setInterval(onTick, 200);
  nextQuestion();
}

function onTick() {
  if (!state.running) return;
  renderClock();
  if (state.limit && Date.now() >= state.endAt) finishGame();
}

function submit(skip) {
  if (!state.running || !state.q) return;
  const q = state.q;
  let value = null;
  if (!skip) {
    const text = $('mt-input').value.trim();
    if (!/^-?\d{1,8}$/.test(text)) { setFeedback('Cevap için bir sayı yaz, sonra Enter\'a bas.', 'warn'); return; }
    value = Number(text);
  }
  state.answered += 1;
  if (value === q.answer) {
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    state.correct += 1;
    state.score += 10 * state.opts.level + 2 * Math.min(state.streak - 1, 5);
    setFeedback('Doğru! ' + q.text + ' = ' + q.answer, 'ok');
  } else {
    state.streak = 0;
    state.wrong += 1;
    state.wrongList.push(q);
    setFeedback((skip ? 'Geçildi. ' : 'Yanlış. ') + 'Doğrusu: ' + q.text + ' = ' + q.answer, 'bad');
  }
  renderStats();
  if (state.maxQ && state.answered >= state.maxQ) { finishGame(); return; }
  nextQuestion();
}

function finishGame() {
  if (!state.running) return;
  state.running = false;
  if (state.tick) { clearInterval(state.tick); state.tick = null; }
  const elapsed = Math.max(1, (Math.min(Date.now(), state.limit ? state.endAt : Date.now()) - state.startAt) / 1000);
  const mode = state.opts.mode;
  let newBest = false;
  if (state.score > state.best[mode]) { state.best[mode] = state.score; newBest = true; saveBest(state.best); }
  show('mt-game', false);
  show('mt-result', true);
  const total = state.correct + state.wrong;
  const pct = total ? Math.round((state.correct / total) * 100) : 0;
  const avg = total ? (elapsed / total).toFixed(1) : '—';
  $('mt-res-score').textContent = String(state.score);
  $('mt-res-summary').textContent = total
    ? total + ' sorudan ' + state.correct + ' doğru (doğruluk %' + pct + '). Soru başına ortalama ' + avg + ' sn. En uzun seri: ' + state.bestStreak + '.'
    : 'Henüz soru cevaplamadın.';
  $('mt-res-best').textContent = newBest ? 'Yeni en iyi skor!' : '';
  const list = $('mt-wrong-list');
  list.innerHTML = '';
  state.wrongList.slice(0, 30).forEach((q) => {
    const li = document.createElement('li');
    li.textContent = q.text + ' = ' + q.answer;
    list.appendChild(li);
  });
  show('mt-wrong-block', state.wrongList.length > 0);
  renderBest();
}

function backToSetup() {
  state.running = false;
  if (state.tick) { clearInterval(state.tick); state.tick = null; }
  show('mt-game', false);
  show('mt-result', false);
  show('mt-setup', true);
}

function syncSetup() {
  const daily = document.querySelector('input[name="mt-mode"]:checked').value === 'daily';
  document.querySelectorAll('input[name="mt-op"], input[name="mt-level"]').forEach((el) => { el.disabled = daily; });
  $('mt-setup-note').textContent = daily ? 'Günlük modda işlem karışık ve zorluk 2 basamaklıdır; sorular tarihe göre sabittir.' : '';
  state.opts.mode = document.querySelector('input[name="mt-mode"]:checked').value;
  renderBest();
}

function bind() {
  $('mt-start').addEventListener('click', startGame);
  $('mt-form').addEventListener('submit', (e) => { e.preventDefault(); submit(false); });
  $('mt-skip').addEventListener('click', () => submit(true));
  $('mt-finish').addEventListener('click', finishGame);
  $('mt-again').addEventListener('click', startGame);
  $('mt-menu').addEventListener('click', backToSetup);
  document.querySelectorAll('input[name="mt-mode"]').forEach((el) => el.addEventListener('change', syncSetup));
}

bind();
syncSetup();

// Test kancası: mevcut durumu ve soruyu okur (oyun mantığını değiştirmez).
window.__matTest = () => ({
  running: state.running,
  op: state.q ? state.q.op : null,
  a: state.q ? state.q.a : null,
  b: state.q ? state.q.b : null,
  text: state.q ? state.q.text : null,
  answer: state.q ? state.q.answer : null,
  score: state.score,
  streak: state.streak,
  correct: state.correct,
  wrong: state.wrong,
  answered: state.answered,
  seed: state.seedLabel,
});
