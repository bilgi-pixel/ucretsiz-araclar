// Renk Eşleştirme — Stroop tarzı refleks oyunu + "farklı tonu bul" modu.
// Tamamen istemci tarafı: dış istek, çerez ve izleme yok. Skorlar yalnızca bu cihazın localStorage alanına yazılır.
// Süre Date.now() ile ölçülür; setInterval yalnızca ekranı günceller (testlerde sahte saat kullanılabilir).

const STORE_KEY = 'ba-oyun-renk-eslestir';

// Renkler koyu zeminde (#1b1d21) okunur; sıra zorluk düzeyine göre dilimlenir (2 / 4 / 6).
const COLORS = [
  { id: 'kirmizi', name: 'Kırmızı', hex: '#ff5a5a' },
  { id: 'mavi', name: 'Mavi', hex: '#5aa8ff' },
  { id: 'yesil', name: 'Yeşil', hex: '#3fdc7e' },
  { id: 'sari', name: 'Sarı', hex: '#ffd83d' },
  { id: 'mor', name: 'Mor', hex: '#c58bff' },
  { id: 'turuncu', name: 'Turuncu', hex: '#ff9a3c' },
];
const COLOR_COUNT = { kolay: 2, orta: 4, zor: 6 };

// "Farklı tonu bul" için başlangıç farkı (açıklık yüzdesi), küçülme çarpanı ve alt sınır.
const TONE_PRESET = {
  kolay: { start: 22, factor: 0.9, min: 3 },
  orta: { start: 18, factor: 0.88, min: 2.5 },
  zor: { start: 14, factor: 0.85, min: 2 },
};

const WRONG_PENALTY = 5;
const FLASH_MS = 160;

const $ = (id) => document.getElementById(id);
const el = {
  box: $('oyun-kutusu'),
  stage: $('rk-stage'),
  word: $('rk-word'),
  grid: $('rk-grid'),
  bar: $('rk-bar'),
  task: $('rk-task'),
  answers: $('rk-answers'),
  start: $('rk-start'),
  pause: $('rk-pause'),
  full: $('rk-full'),
  time: $('rk-time'),
  score: $('rk-score'),
  acc: $('rk-acc'),
  rt: $('rk-rt'),
  best: $('rk-best'),
  live: $('rk-live'),
  result: $('rk-result'),
  resultTitle: $('rk-result-title'),
  resultText: $('rk-result-text'),
  rScore: $('rk-r-score'),
  rCount: $('rk-r-count'),
  rAcc: $('rk-r-acc'),
  rRt: $('rk-r-rt'),
  rBest: $('rk-r-best'),
  rExtraT: $('rk-r-extra-t'),
  rExtra: $('rk-r-extra'),
  sets: ['rk-set-mode', 'rk-set-duration', 'rk-set-diff'].map($),
};

/* ---------- Kalıcı depo (hata verirse sessizce yok sayılır) ---------- */

function loadStore() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
    return { best: raw.best && typeof raw.best === 'object' ? raw.best : {}, settings: raw.settings || {} };
  } catch (e) {
    return { best: {}, settings: {} };
  }
}
function saveStore() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) { /* özel gezinti vb. */ }
}
const store = loadStore();

/* ---------- Durum ---------- */

const S = {
  phase: 'idle', // idle | playing | paused | done
  mode: 'renk', // renk | anlam | ton
  duration: 30,
  diff: 'orta',
  score: 0,
  correct: 0,
  wrong: 0,
  streak: 0,
  bestStreak: 0,
  rtSum: 0,
  level: 1,
  endAt: 0,
  remaining: 0,
  pausedAt: 0,
  shownAt: 0,
  cur: null, // geçerli soru: { word, ink, correctId } ya da { n, odd }
  prev: null,
  timer: 0,
  flashTimer: 0,
  focusIdx: 0,
};

const radio = (name) => document.querySelector('input[name="' + name + '"]:checked');
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const upper = (s) => s.toLocaleUpperCase('tr-TR');
const fmtSec = (ms) => (ms / 1000).toFixed(2).replace('.', ',') + ' sn';
const configKey = () => S.mode + '|' + S.duration + '|' + S.diff;
const activeColors = () => COLORS.slice(0, COLOR_COUNT[S.diff]);

function announce(text) { el.live.textContent = text; }

/* ---------- Ayarlar ---------- */

function readOptions() {
  S.mode = radio('rk-mode').value;
  S.duration = Number(radio('rk-duration').value);
  S.diff = radio('rk-diff').value;
}

function applyStoredSettings() {
  const s = store.settings;
  const set = (name, val) => {
    const input = document.querySelector('input[name="' + name + '"][value="' + val + '"]');
    if (input) input.checked = true;
  };
  if (s.mode) set('rk-mode', s.mode);
  if (s.duration) set('rk-duration', String(s.duration));
  if (s.diff) set('rk-diff', s.diff);
}

function setLocked(locked) {
  el.sets.forEach((fs) => { fs.disabled = locked; });
}

/** Seçilen mod/zorluğa göre cevap düğmelerini yeniden kurar. */
function buildAnswers() {
  el.answers.textContent = '';
  const colors = activeColors();
  el.answers.dataset.n = String(colors.length);
  colors.forEach((c, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'rk-ans';
    b.dataset.id = c.id;
    const k = document.createElement('kbd');
    k.textContent = String(i + 1);
    b.append(k, document.createTextNode(c.name));
    el.answers.appendChild(b);
  });
}

function refreshIdleView() {
  readOptions();
  const isTone = S.mode === 'ton';
  el.answers.hidden = isTone;
  if (!isTone) buildAnswers();
  el.time.textContent = String(S.duration);
  el.bar.style.width = '100%';
  el.task.textContent = isTone ? 'Izgaradaki tek farklı kareyi bulun'
    : (S.mode === 'renk' ? 'Yazının RENGİ hangisi?' : 'Kelimenin ANLAMI hangisi?');
  showMessage(isTone ? 'Başla düğmesine basın; ızgaradaki farklı tonu bulun' : 'Başla düğmesine basın');
  renderBest();
  setAnswersDisabled(true);
}

function setAnswersDisabled(disabled) {
  el.answers.querySelectorAll('button').forEach((b) => { b.disabled = disabled; });
}

/* ---------- Ekran güncelleme ---------- */

function showMessage(text) {
  el.grid.hidden = true;
  el.word.hidden = false;
  el.word.classList.add('is-msg');
  el.word.style.color = '';
  el.word.textContent = text;
  el.word.removeAttribute('role');
  el.word.removeAttribute('aria-label');
}

function renderBest() {
  const b = store.best[configKey()];
  el.best.textContent = 'En yüksek skor (bu ayar): ' + (b ? b : 'henüz yok');
}

function accuracy() {
  const total = S.correct + S.wrong;
  return total ? Math.round((S.correct / total) * 100) : null;
}

function renderStats() {
  el.score.textContent = String(S.score);
  const a = accuracy();
  el.acc.textContent = a === null ? '–' : '%' + a;
  el.rt.textContent = S.correct ? fmtSec(S.rtSum / S.correct) : '–';
}

function flash(ok) {
  clearTimeout(S.flashTimer);
  el.stage.classList.remove('is-ok', 'is-bad');
  el.stage.classList.add(ok ? 'is-ok' : 'is-bad');
  S.flashTimer = setTimeout(() => el.stage.classList.remove('is-ok', 'is-bad'), FLASH_MS);
}

/* ---------- Sorular ---------- */

function newStroop() {
  const act = activeColors();
  let word;
  let ink;
  do {
    word = pick(act);
    // Çoğu soruda kelime ve renk çelişir; ara sıra aynıdır.
    ink = Math.random() < 0.8 ? pick(act.filter((c) => c !== word)) : word;
  } while (S.prev && S.prev.word === word && S.prev.ink === ink);
  S.prev = { word, ink };
  S.cur = { word, ink, correctId: S.mode === 'renk' ? ink.id : word.id };
  el.grid.hidden = true;
  el.word.hidden = false;
  el.word.classList.remove('is-msg');
  el.word.textContent = upper(word.name);
  el.word.style.color = ink.hex;
  el.word.setAttribute('role', 'img');
  el.word.setAttribute('aria-label', 'Kelime: ' + word.name + '. Yazı rengi: ' + ink.name.toLocaleLowerCase('tr-TR') + '.');
  S.shownAt = Date.now();
}

function gridSize(level) {
  if (level <= 2) return 2;
  if (level <= 4) return 3;
  if (level <= 6) return 4;
  if (level <= 9) return 5;
  if (level <= 13) return 6;
  return 7;
}

function toneDelta(level) {
  const p = TONE_PRESET[S.diff];
  return Math.max(p.min, p.start * Math.pow(p.factor, level - 1));
}

function newTone() {
  const n = gridSize(S.level);
  const hue = Math.floor(Math.random() * 360);
  const sat = 62;
  const base = 52;
  const delta = toneDelta(S.level);
  const oddL = base + (Math.random() < 0.5 ? -delta : delta);
  const odd = Math.floor(Math.random() * n * n);
  const hadFocus = el.grid.contains(document.activeElement);
  S.cur = { n, odd, hue, delta };
  el.grid.style.setProperty('--n', String(n));
  el.grid.textContent = '';
  S.focusIdx = clamp(S.focusIdx, 0, n * n - 1);
  for (let i = 0; i < n * n; i++) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'rk-cell';
    b.dataset.i = String(i);
    b.tabIndex = i === S.focusIdx ? 0 : -1;
    b.setAttribute('aria-label', 'Kare ' + (Math.floor(i / n) + 1) + '-' + ((i % n) + 1));
    b.style.background = 'hsl(' + hue + ' ' + sat + '% ' + (i === odd ? oddL : base).toFixed(2) + '%)';
    el.grid.appendChild(b);
  }
  el.word.hidden = true;
  el.grid.hidden = false;
  if (hadFocus) el.grid.children[S.focusIdx].focus({ preventScroll: true });
  el.task.textContent = 'Seviye ' + S.level + ' · ' + n + '×' + n + ' ızgara — farklı kareyi seçin';
  S.shownAt = Date.now();
}

function nextRound() {
  if (S.mode === 'ton') newTone(); else newStroop();
}

/* ---------- Oyun akışı ---------- */

function start() {
  readOptions();
  clearInterval(S.timer);
  Object.assign(S, {
    phase: 'playing', score: 0, correct: 0, wrong: 0, streak: 0, bestStreak: 0, rtSum: 0,
    level: 1, prev: null, cur: null, focusIdx: 0,
  });
  store.settings = { mode: S.mode, duration: S.duration, diff: S.diff };
  saveStore();
  el.result.classList.remove('is-active');
  setLocked(true);
  el.answers.hidden = S.mode === 'ton';
  if (S.mode !== 'ton') { buildAnswers(); setAnswersDisabled(false); }
  el.start.disabled = true;
  el.start.textContent = 'Başla';
  el.pause.disabled = false;
  el.pause.textContent = 'Duraklat';
  el.task.textContent = S.mode === 'renk' ? 'Yazının RENGİ hangisi?'
    : (S.mode === 'anlam' ? 'Kelimenin ANLAMI hangisi?' : '');
  renderBest();
  renderStats();
  S.endAt = Date.now() + S.duration * 1000;
  el.time.textContent = String(S.duration);
  el.bar.style.width = '100%';
  nextRound();
  S.timer = setInterval(tick, 100);
  announce('Oyun başladı.');
}

function tick() {
  if (S.phase !== 'playing') return;
  const left = S.endAt - Date.now();
  if (left <= 0) { finish(); return; }
  el.time.textContent = String(Math.ceil(left / 1000));
  el.bar.style.width = (left / (S.duration * 1000)) * 100 + '%';
}

function togglePause() {
  if (S.phase === 'playing') {
    S.phase = 'paused';
    clearInterval(S.timer);
    S.pausedAt = Date.now();
    S.remaining = Math.max(0, S.endAt - S.pausedAt);
    setAnswersDisabled(true);
    el.grid.hidden = true;
    el.word.hidden = false;
    el.word.classList.add('is-msg');
    el.word.style.color = '';
    el.word.textContent = 'Duraklatıldı';
    el.word.removeAttribute('role');
    el.word.removeAttribute('aria-label');
    el.pause.textContent = 'Devam et';
    el.start.disabled = false;
    el.start.textContent = 'Yeniden başlat';
    announce('Oyun duraklatıldı.');
  } else if (S.phase === 'paused') {
    S.phase = 'playing';
    const gap = Date.now() - S.pausedAt;
    S.endAt = Date.now() + S.remaining;
    S.shownAt += gap;
    el.start.disabled = true;
    el.start.textContent = 'Başla';
    el.pause.textContent = 'Duraklat';
    if (S.mode !== 'ton') setAnswersDisabled(false);
    restoreRound();
    S.timer = setInterval(tick, 100);
    announce('Oyun devam ediyor.');
  }
}

/** Duraklatmadan dönünce aynı soruyu yeniden gösterir (süreyi sıfırlamadan). */
function restoreRound() {
  const keepShown = S.shownAt;
  if (S.mode === 'ton') {
    el.word.hidden = true;
    el.grid.hidden = false;
  } else if (S.cur) {
    const { word, ink } = S.cur;
    el.grid.hidden = true;
    el.word.hidden = false;
    el.word.classList.remove('is-msg');
    el.word.textContent = upper(word.name);
    el.word.style.color = ink.hex;
    el.word.setAttribute('role', 'img');
    el.word.setAttribute('aria-label', 'Kelime: ' + word.name + '. Yazı rengi: ' + ink.name.toLocaleLowerCase('tr-TR') + '.');
  }
  S.shownAt = keepShown;
}

function finish() {
  if (S.phase !== 'playing' && S.phase !== 'paused') return;
  clearInterval(S.timer);
  S.phase = 'done';
  setLocked(false);
  setAnswersDisabled(true);
  el.start.disabled = false;
  el.start.textContent = 'Tekrar oyna';
  el.pause.disabled = true;
  el.pause.textContent = 'Duraklat';
  el.time.textContent = '0';
  el.bar.style.width = '0%';
  el.task.textContent = '';
  showMessage('Süre doldu!');

  const key = configKey();
  const prevBest = store.best[key] || 0;
  const isRecord = S.score > prevBest;
  if (isRecord) { store.best[key] = S.score; saveStore(); }

  const a = accuracy();
  el.resultTitle.textContent = 'Süre doldu!';
  el.resultText.textContent = isRecord
    ? 'Yeni rekor! Bu ayardaki en yüksek skorunuzu geçtiniz.'
    : 'Bu ayardaki en yüksek skorunuz ' + prevBest + '. Bir tur daha deneyin.';
  el.rScore.textContent = String(S.score);
  el.rCount.textContent = S.correct + ' / ' + S.wrong;
  el.rAcc.textContent = a === null ? '–' : '%' + a;
  el.rRt.textContent = S.correct ? fmtSec(S.rtSum / S.correct) : '–';
  el.rBest.textContent = String(store.best[key] || 0);
  if (S.mode === 'ton') {
    el.rExtraT.textContent = 'Ulaşılan seviye';
    el.rExtra.textContent = String(S.level);
  } else {
    el.rExtraT.textContent = 'En uzun seri';
    el.rExtra.textContent = String(S.bestStreak);
  }
  el.result.classList.add('is-active');
  renderBest();
  renderStats();
  announce('Süre doldu. Skorunuz ' + S.score + (isRecord ? '. Yeni rekor.' : '.'));
  // Klavye kullanıcısı Enter/Boşluk ile hemen tekrar oynayabilsin.
  el.start.focus({ preventScroll: true });
}

/* ---------- Cevap işleme ---------- */

function applyCorrect(points) {
  S.correct += 1;
  S.streak += 1;
  S.bestStreak = Math.max(S.bestStreak, S.streak);
  S.rtSum += Date.now() - S.shownAt;
  S.score += points;
  flash(true);
}

function applyWrong() {
  S.wrong += 1;
  S.streak = 0;
  S.score = Math.max(0, S.score - WRONG_PENALTY);
  flash(false);
}

function onAnswer(id) {
  if (S.phase !== 'playing' || !S.cur || S.mode === 'ton') return;
  if (Date.now() >= S.endAt) { finish(); return; }
  if (id === S.cur.correctId) {
    const rt = Date.now() - S.shownAt;
    let points = 10 + clamp(Math.round((2000 - rt) / 200), 0, 10);
    if ((S.streak + 1) % 5 === 0) points += 10; // her 5 doğruda seri bonusu
    applyCorrect(points);
    announce('Doğru. Skor ' + S.score + '.');
  } else {
    applyWrong();
    announce('Yanlış. Skor ' + S.score + '.');
  }
  renderStats();
  nextRound();
}

function onCell(i) {
  if (S.phase !== 'playing' || !S.cur || S.mode !== 'ton') return;
  if (Date.now() >= S.endAt) { finish(); return; }
  S.focusIdx = i;
  if (i === S.cur.odd) {
    const rt = Date.now() - S.shownAt;
    const points = 10 + clamp(Math.round((4000 - rt) / 400), 0, 10) + Math.floor(S.level / 2);
    applyCorrect(points);
    S.level += 1;
    announce('Doğru. Seviye ' + S.level + '. Skor ' + S.score + '.');
  } else {
    applyWrong();
    announce('Yanlış kare. Skor ' + S.score + '.');
  }
  renderStats();
  newTone();
}

/* ---------- Olaylar ---------- */

el.answers.addEventListener('click', (e) => {
  const b = e.target.closest('button[data-id]');
  if (b) onAnswer(b.dataset.id);
});

el.grid.addEventListener('click', (e) => {
  const b = e.target.closest('button[data-i]');
  if (b) onCell(Number(b.dataset.i));
});

// Izgarada ok tuşlarıyla gezinme (yuvarlanan tabindex).
el.grid.addEventListener('keydown', (e) => {
  const cell = e.target.closest('button[data-i]');
  if (!cell || !S.cur) return;
  const n = S.cur.n;
  const i = Number(cell.dataset.i);
  let j = i;
  if (e.key === 'ArrowRight') j = i + 1;
  else if (e.key === 'ArrowLeft') j = i - 1;
  else if (e.key === 'ArrowDown') j = i + n;
  else if (e.key === 'ArrowUp') j = i - n;
  else if (e.key === 'Home') j = 0;
  else if (e.key === 'End') j = n * n - 1;
  else return;
  e.preventDefault();
  j = clamp(j, 0, n * n - 1);
  S.focusIdx = j;
  Array.from(el.grid.children).forEach((c, k) => { c.tabIndex = k === j ? 0 : -1; });
  el.grid.children[j].focus({ preventScroll: true });
});

el.start.addEventListener('click', start);
el.pause.addEventListener('click', togglePause);

document.querySelectorAll('input[name="rk-mode"], input[name="rk-duration"], input[name="rk-diff"]').forEach((input) => {
  input.addEventListener('change', () => { if (S.phase === 'idle' || S.phase === 'done') refreshIdleView(); });
});

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  const t = e.target;
  const tag = t && t.tagName;
  if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || tag === 'SUMMARY') return;
  const isButton = tag === 'BUTTON';

  if (/^[1-6]$/.test(e.key) && S.phase === 'playing' && S.mode !== 'ton') {
    const colors = activeColors();
    const c = colors[Number(e.key) - 1];
    if (c) { e.preventDefault(); onAnswer(c.id); }
    return;
  }
  if ((e.key === 'p' || e.key === 'P') && (S.phase === 'playing' || S.phase === 'paused')) {
    e.preventDefault();
    togglePause();
    return;
  }
  // Boşluk/Enter: odak bir düğmedeyse düğmenin kendi davranışı geçerli kalır; oyun kutusu dışındaki
  // Boşluk sayfa kaydırması içindir, oyunu başlatmaz.
  if ((e.key === ' ' || e.key === 'Enter') && !isButton && el.box.contains(t) && (S.phase === 'idle' || S.phase === 'done')) {
    e.preventDefault();
    start();
  }
});

// Sekme gizlenince oyun kendiliğinden duraklar.
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden' && S.phase === 'playing') togglePause();
});

// Tam ekran: yalnızca destekleniyorsa görünür; oyun kutusu tam ekran olunca sayfadaki reklamlar görünmez.
if (document.fullscreenEnabled && el.box.requestFullscreen) {
  el.full.hidden = false;
  el.full.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else el.box.requestFullscreen().catch(() => {});
  });
  document.addEventListener('fullscreenchange', () => {
    el.full.textContent = document.fullscreenElement ? 'Tam ekrandan çık' : 'Tam ekran';
  });
}

/* ---------- Test kancası (yalnızca Playwright testleri kullanır) ---------- */

window.__renkTest = () => ({
  phase: S.phase,
  mode: S.mode,
  level: S.level,
  score: S.score,
  correct: S.cur && S.mode !== 'ton' ? S.cur.correctId : null,
  wrong: S.cur && S.mode !== 'ton' ? activeColors().find((c) => c.id !== S.cur.correctId).id : null,
  odd: S.cur && S.mode === 'ton' ? S.cur.odd : null,
  notOdd: S.cur && S.mode === 'ton' ? (S.cur.odd === 0 ? 1 : 0) : null,
  gridSize: S.cur && S.mode === 'ton' ? S.cur.n : null,
  delta: S.cur && S.mode === 'ton' ? S.cur.delta : null,
});

/* ---------- Başlangıç ---------- */

applyStoredSettings();
refreshIdleView();
