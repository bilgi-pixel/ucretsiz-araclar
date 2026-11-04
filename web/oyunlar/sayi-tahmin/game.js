// Sayı Tahmin Oyunu — iki mod:
//  1) "Ben tahmin edeyim": bilgisayar sayı tutar, sen "daha büyük / daha küçük" ipuçlarıyla bulursun.
//  2) "Bilgisayar tahmin etsin": sen sayı tutarsın, bilgisayar ikili aramayla bulur.
// Tamamen istemci tarafı; en iyi skorlar yalnızca bu cihazdaki localStorage'a yazılır, dış istek yoktur.

const STORE_KEY = 'ba-oyun-sayi-tahmin';
const LIMIT = 1_000_000_000;   // özel aralıkta izin verilen en büyük mutlak değer

// ---------- Kalıcı veri ----------
function defaultData() {
  return {
    v: 1,
    best: {},                  // "1-100" -> en az deneme (ben tahmin edeyim modu)
    played: 0, won: 0, timeouts: 0, reverseGames: 0,
    settings: { mode: 'guess', range: '100', min: '1', max: '500', timed: false, time: '60' },
  };
}

function loadData() {
  const base = defaultData();
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (!raw || raw.v !== 1) return base;
    return { ...base, ...raw, best: { ...(raw.best || {}) }, settings: { ...base.settings, ...(raw.settings || {}) } };
  } catch (e) {
    return base; // bozuk kayıt veya depolama kapalı: sıfırdan başla
  }
}

const data = loadData();

function saveData() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (e) { /* özel gezinti: yazılamaz, oyun yine çalışır */ }
}

// ---------- Yardımcılar ----------
const $ = (id) => document.getElementById(id);
const el = {
  modeRadios: document.querySelectorAll('input[name="sy-mode"]'),
  rangeRadios: document.querySelectorAll('input[name="sy-range"]'),
  custom: $('sy-custom'), min: $('sy-min'), max: $('sy-max'),
  timedWrap: $('sy-timed-wrap'), timed: $('sy-timed'), time: $('sy-time'),
  newBtn: $('sy-new'), error: $('sy-error'), info: $('sy-info'),
  guessPanel: $('sy-guess-panel'), revPanel: $('sy-reverse-panel'),
  rangeInfo: $('sy-range-info'), bar: $('sy-bar'), form: $('sy-form'), input: $('sy-input'), submit: $('sy-submit'),
  hint: $('sy-hint'), attempts: $('sy-attempts'), best: $('sy-best'), timerBox: $('sy-timer-box'), timer: $('sy-timer'),
  history: $('sy-history'),
  revIntro: $('sy-rev-intro'), revStart: $('sy-rev-start'), revPlay: $('sy-rev-play'), revGuess: $('sy-cpu-guess'),
  revHigher: $('sy-higher'), revLower: $('sy-lower'), revCorrect: $('sy-correct'), revUndo: $('sy-undo'),
  revAttempts: $('sy-rv-attempts'), revRange: $('sy-rv-range'), revBar: $('sy-rv-bar'), revMsg: $('sy-rv-msg'), revHistory: $('sy-rv-history'),
};

/** Aralıktaki sayı adedine göre ikili aramanın en kötü durumdaki deneme sayısı. */
function maxBinaryGuesses(count) {
  return Math.floor(Math.log2(count)) + 1;
}

const fmt = (n) => n.toLocaleString('tr-TR');

function rangeKey(min, max) {
  return min + '-' + max;
}

function showError(msg) {
  el.error.textContent = msg;
  el.error.classList.add('is-active');
}

function clearError() {
  el.error.textContent = '';
  el.error.classList.remove('is-active');
}

function setBar(bar, min, max, lo, hi) {
  const span = max - min + 1;
  const left = Math.max(0, ((lo - min) / span) * 100);
  const width = Math.max(1.5, ((hi - lo + 1) / span) * 100);
  bar.style.setProperty('--left', left.toFixed(2) + '%');
  bar.style.setProperty('--width', Math.min(100 - left, width).toFixed(2) + '%');
}

// ---------- Durum ----------
const state = {
  mode: data.settings.mode,
  min: 1, max: 100,
  // "Ben tahmin edeyim"
  secret: 0, guesses: [], over: false, timerId: null, deadline: 0, timeLimit: 0,
  // "Bilgisayar tahmin etsin"
  rvStarted: false, rvHistory: [], rvOver: false, rvStuck: false,
};

function readSettings() {
  const checked = (name) => document.querySelector('input[name="' + name + '"]:checked');
  state.mode = checked('sy-mode').value;
  const range = checked('sy-range').value;
  data.settings = {
    mode: state.mode, range,
    min: el.min.value, max: el.max.value,
    timed: el.timed.checked, time: el.time.value,
  };
}

/** Seçili aralığı okur; geçersizse Türkçe hata gösterip null döner. */
function resolveRange() {
  const range = data.settings.range;
  if (range === '100') return { min: 1, max: 100 };
  if (range === '1000') return { min: 1, max: 1000 };
  const a = el.min.value.trim();
  const b = el.max.value.trim();
  const ok = (s) => /^-?\d+$/.test(s) && Math.abs(Number(s)) <= LIMIT;
  if (!ok(a) || !ok(b)) {
    showError('Özel aralık için iki tam sayı girin (en çok ±' + fmt(LIMIT) + '). Örneğin alt sınır 1, üst sınır 500.');
    return null;
  }
  const min = Number(a);
  const max = Number(b);
  if (min >= max) {
    showError('Alt sınır üst sınırdan küçük olmalı. Örneğin 1 ve 500 yazın ya da sınırların yerini değiştirin.');
    return null;
  }
  return { min, max };
}

// ---------- Mod 1: ben tahmin edeyim ----------
function stopTimer() {
  if (state.timerId) { clearInterval(state.timerId); state.timerId = null; }
}

function renderTimer() {
  const left = Math.max(0, state.deadline - Date.now());
  el.timer.textContent = Math.ceil(left / 1000) + ' sn';
  return left;
}

function startTimer() {
  state.deadline = Date.now() + state.timeLimit * 1000;
  renderTimer();
  state.timerId = setInterval(() => {
    if (renderTimer() > 0) return;
    stopTimer();
    if (state.over) return;
    state.over = true;
    data.played += 1;
    data.timeouts += 1;
    saveData();
    el.newBtn.focus();
    setHint('Süre doldu! Aranan sayı ' + fmt(state.secret) + ' idi. Yeni bir oyun için "Yeni oyun" düğmesine bas.', 'lose');
    lockGuessInput(true);
  }, 250);
}

function lockGuessInput(locked) {
  el.input.disabled = locked;
  el.submit.setAttribute('aria-disabled', locked ? 'true' : 'false');
}

function setHint(text, dir) {
  el.hint.textContent = text;
  el.hint.dataset.dir = dir || '';
}

/** Tahminlerden kalan aralığı çıkar: "büyük" ipucu alt sınırı, "küçük" ipucu üst sınırı daraltır. */
function guessBounds() {
  let lo = state.min;
  let hi = state.max;
  for (const g of state.guesses) {
    if (g.dir === 'up' && g.value + 1 > lo) lo = g.value + 1;
    if (g.dir === 'down' && g.value - 1 < hi) hi = g.value - 1;
  }
  return { lo, hi };
}

function renderGuess() {
  const { lo, hi } = guessBounds();
  el.attempts.textContent = String(state.guesses.length);
  const best = data.best[rangeKey(state.min, state.max)];
  el.best.textContent = best ? best + ' deneme' : 'henüz yok';
  el.rangeInfo.textContent = state.over && state.guesses.length && state.guesses[state.guesses.length - 1].dir === 'win'
    ? 'Sayı bulundu: ' + fmt(state.secret)
    : 'Sayı ' + fmt(lo) + ' ile ' + fmt(hi) + ' arasında (' + fmt(hi - lo + 1) + ' olasılık)';
  setBar(el.bar, state.min, state.max, lo, hi);
  el.history.innerHTML = '';
  state.guesses.forEach((g) => {
    const li = document.createElement('li');
    li.textContent = fmt(g.value) + (g.dir === 'up' ? ' → daha büyük' : g.dir === 'down' ? ' → daha küçük' : ' → doğru!');
    el.history.appendChild(li);
  });
}

function newGuessGame() {
  stopTimer();
  clearError();
  const r = resolveRange();
  if (!r) return false;
  state.min = r.min;
  state.max = r.max;
  state.secret = r.min + Math.floor(Math.random() * (r.max - r.min + 1));
  state.guesses = [];
  state.over = false;
  state.timeLimit = data.settings.timed ? Number(data.settings.time) : 0;
  el.timerBox.hidden = !state.timeLimit;
  if (state.timeLimit) el.timer.textContent = state.timeLimit + ' sn';
  el.input.value = '';
  lockGuessInput(false);
  setHint('Aklımdan ' + fmt(r.min) + ' ile ' + fmt(r.max) + ' arasında bir sayı tuttum. İlk tahminini yaz.', '');
  const n = r.max - r.min + 1;
  el.info.textContent = 'İkili arama stratejisiyle bu aralıkta sayı en fazla ' + maxBinaryGuesses(n) + ' denemede bulunur: her tahmini kalan aralığın ortasından yap.'
    + (state.timeLimit ? ' Süre ilk tahminle başlar.' : '');
  renderGuess();
  return true;
}

function submitGuess() {
  if (state.over) return;
  clearError();
  const raw = el.input.value.trim();
  if (!/^-?\d+$/.test(raw) || Number(raw) < state.min || Number(raw) > state.max) {
    showError('Lütfen ' + fmt(state.min) + ' ile ' + fmt(state.max) + ' arasında bir tam sayı gir. Harf, ondalık sayı veya boş giriş kabul edilmez; deneme sayına eklenmedi.');
    el.input.focus();
    return;
  }
  const value = Number(raw);
  if (state.guesses.some((g) => g.value === value)) {
    showError(fmt(value) + ' sayısını zaten denedin. Farklı bir sayı dene; bu giriş deneme sayına eklenmedi.');
    el.input.select();
    return;
  }
  if (state.timeLimit && !state.timerId && !state.guesses.length) startTimer();
  const dir = value === state.secret ? 'win' : value < state.secret ? 'up' : 'down';
  state.guesses.push({ value, dir });
  el.input.value = '';

  if (dir === 'win') {
    state.over = true;
    stopTimer();
    const tries = state.guesses.length;
    const key = rangeKey(state.min, state.max);
    const prev = data.best[key];
    let text = 'Tebrikler! ' + fmt(value) + ' sayısını ' + tries + ' denemede buldun.';
    if (!prev || tries < prev) { data.best[key] = tries; text += prev ? ' Yeni rekor!' : ' İlk skorun kaydedildi.'; }
    text += ' İkili aramayla bu aralıkta en fazla ' + maxBinaryGuesses(state.max - state.min + 1) + ' deneme yeterdi.';
    data.played += 1;
    data.won += 1;
    saveData();
    setHint(text, 'win');
    lockGuessInput(true);
    renderGuess();
    el.newBtn.focus();
    return;
  }
  setHint(dir === 'up'
    ? 'Daha büyük. Aranan sayı ' + fmt(value) + '\'den büyük.'
    : 'Daha küçük. Aranan sayı ' + fmt(value) + '\'den küçük.', dir);
  renderGuess();
  el.input.focus();
}

// ---------- Mod 2: bilgisayar tahmin etsin ----------
/** Geçmiş cevaplardan kalan aralığı yeniden hesapla (geri alma bu sayede basit). */
function revBounds() {
  let lo = state.min;
  let hi = state.max;
  for (const h of state.rvHistory) {
    if (h.answer === 'higher') lo = h.guess + 1;
    else if (h.answer === 'lower') hi = h.guess - 1;
  }
  return { lo, hi };
}

function renderReverse() {
  el.revIntro.hidden = state.rvStarted;
  el.revPlay.hidden = !state.rvStarted;
  if (!state.rvStarted) return;
  const { lo, hi } = revBounds();
  const n = state.rvHistory.length;
  el.revHistory.innerHTML = '';
  state.rvHistory.forEach((h) => {
    const li = document.createElement('li');
    li.textContent = fmt(h.guess) + (h.answer === 'higher' ? ' → senin sayın daha büyük' : ' → senin sayın daha küçük');
    el.revHistory.appendChild(li);
  });
  el.revUndo.hidden = state.rvHistory.length === 0 || state.rvOver;
  const done = state.rvOver;
  const stuck = lo > hi;
  state.rvStuck = stuck;
  // Deneme sayacı: şu an sorulan tahminin sırası (çelişkide yalnızca verilen cevap sayısı).
  el.revAttempts.textContent = String(n + (stuck ? 0 : 1));
  [el.revHigher, el.revLower, el.revCorrect].forEach((b) => b.setAttribute('aria-disabled', done || stuck ? 'true' : 'false'));
  if (stuck) {
    el.revGuess.textContent = '?';
    el.revRange.textContent = 'Kalan aralık: boş';
    setBar(el.revBar, state.min, state.max, state.min, state.min);
    showError('Cevaplar birbiriyle çelişiyor: bu aralıkta tutabileceğin bir sayı kalmadı. Muhtemelen yanlış düğmeye bastın; "Son cevabı geri al" ile düzeltebilir ya da "Yeni oyun" ile baştan başlayabilirsin.');
    el.revMsg.textContent = '';
    return;
  }
  clearError();
  const guess = Math.floor((lo + hi) / 2);
  state.rvGuess = guess;
  el.revGuess.textContent = fmt(guess);
  el.revRange.textContent = 'Kalan aralık: ' + fmt(lo) + ' – ' + fmt(hi) + ' (' + fmt(hi - lo + 1) + ' olasılık)';
  setBar(el.revBar, state.min, state.max, lo, hi);
  if (!done) {
    el.revMsg.textContent = lo === hi
      ? 'Tek aday kaldı: sayın bu olmalı. "Doğru" de!'
      : 'Tuttuğun sayı bu mu? Daha büyükse "Daha büyük", daha küçükse "Daha küçük", bulduysa "Doğru" de.';
  }
}

function newReverseGame() {
  clearError();
  const r = resolveRange();
  if (!r) return false;
  state.min = r.min;
  state.max = r.max;
  state.rvHistory = [];
  state.rvStarted = false;
  state.rvOver = false;
  state.rvStuck = false;
  el.revStart.textContent = fmt(r.min) + ' – ' + fmt(r.max) + ' arasında sayı tuttum, başla';
  el.info.textContent = 'Aklından ' + fmt(r.min) + ' ile ' + fmt(r.max) + ' arasında bir sayı tut ve kimseye söyleme. Bilgisayar her tahminde aralığı ikiye böler; en fazla '
    + maxBinaryGuesses(r.max - r.min + 1) + ' denemede bulur.';
  renderReverse();
  return true;
}

function revAnswer(answer) {
  if (!state.rvStarted || state.rvOver || state.rvStuck) return;
  if (answer === 'correct') {
    const tries = state.rvHistory.length + 1;
    state.rvOver = true;
    data.reverseGames += 1;
    saveData();
    renderReverse();
    el.revAttempts.textContent = String(tries);
    el.revMsg.textContent = 'Bilgisayar ' + tries + ' denemede buldu! İkili arama her tahminde aralığı yarıya indirir; '
      + fmt(state.max - state.min + 1) + ' sayılık aralıkta en fazla ' + maxBinaryGuesses(state.max - state.min + 1) + ' deneme yeter.';
    el.revMsg.dataset.dir = 'win';
    el.revHistory.dataset.done = 'true';
    el.newBtn.focus();
    return;
  }
  el.revMsg.dataset.dir = '';
  state.rvHistory.push({ guess: state.rvGuess, answer });
  renderReverse();
}

// ---------- Ekran düzeni ----------
function applyLayout() {
  const rev = state.mode === 'reverse';
  el.guessPanel.hidden = rev;
  el.revPanel.hidden = !rev;
  el.timedWrap.hidden = rev;
  el.custom.hidden = data.settings.range !== 'custom';
}

function restart() {
  readSettings();
  saveData();
  applyLayout();
  if (state.mode === 'reverse') { stopTimer(); newReverseGame(); } else { newGuessGame(); }
}

// ---------- Olaylar ----------
el.form.addEventListener('submit', (e) => { e.preventDefault(); submitGuess(); });
el.newBtn.addEventListener('click', restart);
el.revStart.addEventListener('click', () => {
  state.rvStarted = true;
  state.rvHistory = [];
  el.revMsg.dataset.dir = '';
  el.revHistory.dataset.done = '';
  renderReverse();
  el.revHigher.focus();
});
const guardedClick = (btn, answer) => btn.addEventListener('click', () => {
  if (btn.getAttribute('aria-disabled') === 'true') return;
  revAnswer(answer);
});
guardedClick(el.revHigher, 'higher');
guardedClick(el.revLower, 'lower');
guardedClick(el.revCorrect, 'correct');
el.revUndo.addEventListener('click', () => {
  if (!state.rvHistory.length || state.rvOver) return;
  state.rvHistory.pop();
  clearError();
  renderReverse();
});

el.modeRadios.forEach((r) => r.addEventListener('change', restart));
el.rangeRadios.forEach((r) => r.addEventListener('change', restart));
el.timed.addEventListener('change', restart);
el.time.addEventListener('change', restart);
el.min.addEventListener('change', restart);
el.max.addEventListener('change', restart);

// ---------- Başlangıç ----------
function init() {
  const s = data.settings;
  const check = (name, value) => {
    const r = document.querySelector('input[name="' + name + '"][value="' + value + '"]');
    if (r) r.checked = true;
  };
  check('sy-mode', s.mode);
  check('sy-range', s.range);
  el.min.value = s.min;
  el.max.value = s.max;
  el.timed.checked = !!s.timed;
  if ([...el.time.options].some((o) => o.value === String(s.time))) el.time.value = String(s.time);
  restart();
}

init();
