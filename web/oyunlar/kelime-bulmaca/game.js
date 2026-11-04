// Kelime Bulmaca — 5 harfli günlük Türkçe kelime oyunu.
// Tüm oyun mantığı tarayıcıda çalışır; ağ isteği yalnızca aynı kökendeki iki metin dosyasına yapılır:
//   ../../kelime-bulucu/kelimeler.txt  → geçerli tahmin sözlüğü (MIT, LICENSE-kelimeler.txt)
//   cevaplar.txt                       → günlük/sınırsız kelime havuzu (sözlükten elle süzülmüş yaygın kelimeler)
// Çerez, analitik veya sunucuya veri gönderimi yoktur; istatistikler yalnızca localStorage'da durur.

const WORD_LEN = 5;
const MAX_TRIES = 6;
const STORE_KEY = 'ba-kelime-bulmaca-v1';
const SHARE_URL = 'https://araclar.bilisimajans.com/oyunlar/kelime-bulmaca/';
const DICT_URL = '../../kelime-bulucu/kelimeler.txt';
const ANSWERS_URL = 'cevaplar.txt';
// Günlük kelime formülü (tek yerde; test dosyasında da aynen kullanılır):
//   n = Math.floor((Date.UTC(yıl, ay, gün) - Date.UTC(2026, 0, 1)) / 86400000)   (yıl/ay/gün: yerel tarih)
//   kelime = cevaplar[((n % N) + N) % N]   — cevaplar.txt dosyası tohumla önceden karıştırılmıştır.
const EPOCH = Date.UTC(2026, 0, 1);
const DAY_MS = 86400000;

// Türkçe Q klavye düzeni (Türk alfabesinde olmayan Q, W, X tuşları yok).
const KEY_ROWS = [[...'ertyuıopğü'], [...'asdfghjklşi'], ['enter', ...'zcvbnmöç', 'del']];
const LETTERS = new Set([...'abcçdefgğhıijklmnoöprsştuüvyz']);
const STATE_LABEL = { correct: 'doğru yerde', present: 'kelimede var, yeri yanlış', absent: 'kelimede yok' };
const STATE_RANK = { absent: 1, present: 2, correct: 3 };
const EMOJI = { correct: '🟩', present: '🟨', absent: '⬛' };

const $ = (id) => document.getElementById(id);
const up = (s) => s.toLocaleUpperCase('tr');
const low = (s) => s.toLocaleLowerCase('tr');
const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
const REVEAL_MS = reduceMotion ? 0 : 1350; // satır çevirme animasyonunun süresi

/** Yerel takvim gününü, başlangıç tarihinden bu yana gün sayısına çevirir. */
export function dayNumber(date = new Date()) {
  return Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - EPOCH) / DAY_MS);
}

/** İki geçişli renklendirme: önce yeşiller, sonra kalan harf sayısına göre sarılar. */
export function evaluate(guess, answer) {
  const g = [...guess];
  const a = [...answer];
  const res = Array(g.length).fill('absent');
  const left = {};
  for (let i = 0; i < a.length; i++) {
    if (g[i] === a[i]) res[i] = 'correct';
    else left[a[i]] = (left[a[i]] || 0) + 1;
  }
  for (let i = 0; i < g.length; i++) {
    if (res[i] === 'correct') continue;
    if (left[g[i]] > 0) { res[i] = 'present'; left[g[i]]--; }
  }
  return res;
}

/* ---------- Kayıt (localStorage) ---------- */
const emptyStats = () => ({ played: 0, won: 0, streak: 0, maxStreak: 0, lastWinDay: null, dist: [0, 0, 0, 0, 0, 0] });
function loadStore() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
    return {
      stats: { ...emptyStats(), ...(raw.stats || {}) },
      free: { played: 0, won: 0, ...(raw.free || {}) },
      daily: raw.daily || null,
    };
  } catch (_) {
    return { stats: emptyStats(), free: { played: 0, won: 0 }, daily: null };
  }
}
let store = loadStore();
function saveStore() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (_) { /* gizli sekme: kayıt atlanır */ }
}

/* ---------- Oyun durumu ---------- */
let dict = null;      // Set: geçerli 5 harfli kelimeler
let answers = [];     // günlük / sınırsız havuz
let ready = false;
const state = { mode: 'daily', day: 0, answer: '', guesses: [], current: '', status: 'playing', counted: false };
let msgTimer = 0;
let panelTimer = 0;

const boardEl = $('board');
const keysEl = $('keyboard');
const rows = [];

function buildBoard() {
  for (let r = 0; r < MAX_TRIES; r++) {
    const row = document.createElement('div');
    row.className = 'kb-row';
    row.setAttribute('role', 'row');
    const tiles = [];
    for (let c = 0; c < WORD_LEN; c++) {
      const t = document.createElement('div');
      t.className = 'kb-tile';
      t.setAttribute('role', 'gridcell');
      t.setAttribute('aria-label', `${r + 1}. deneme, ${c + 1}. harf, boş`);
      row.appendChild(t);
      tiles.push(t);
    }
    boardEl.appendChild(row);
    rows.push({ el: row, tiles });
  }
}

function buildKeyboard() {
  for (const keys of KEY_ROWS) {
    const row = document.createElement('div');
    row.className = 'kb-keyrow';
    for (const k of keys) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'kb-key';
      b.dataset.key = k;
      if (k === 'enter') { b.textContent = 'Gir'; b.setAttribute('aria-label', 'Tahmini gönder'); b.classList.add('is-wide'); }
      else if (k === 'del') { b.textContent = '⌫'; b.setAttribute('aria-label', 'Son harfi sil'); b.classList.add('is-wide'); }
      else { b.textContent = up(k); b.setAttribute('aria-label', up(k)); }
      row.appendChild(b);
    }
    keysEl.appendChild(row);
  }
}

function setMsg(text, isError = false, keepMs = 2600) {
  const el = $('msg');
  clearTimeout(msgTimer);
  el.textContent = text;
  el.classList.toggle('is-error', !!isError && !!text);
  if (text && keepMs) msgTimer = setTimeout(() => { el.textContent = ''; el.classList.remove('is-error'); }, keepMs);
}

function shake(rowIdx) {
  const el = rows[rowIdx]?.el;
  if (!el || reduceMotion) return;
  el.classList.remove('is-shake');
  void el.offsetWidth; // animasyonu yeniden başlat
  el.classList.add('is-shake');
}

function paintRow(r, guess, res, animate) {
  const { tiles } = rows[r];
  [...guess].forEach((ch, i) => {
    const t = tiles[i];
    t.textContent = up(ch);
    t.dataset.state = res[i];
    t.setAttribute('aria-label', `${r + 1}. deneme, ${i + 1}. harf ${up(ch)}, ${STATE_LABEL[res[i]]}`);
    t.classList.remove('is-flip');
    if (animate && !reduceMotion) {
      t.style.setProperty('--d', `${i * 0.2}s`);
      void t.offsetWidth;
      t.classList.add('is-flip');
    }
  });
}

function paintCurrent() {
  const r = state.guesses.length;
  if (r >= MAX_TRIES) return;
  const { tiles } = rows[r];
  tiles.forEach((t, i) => {
    const ch = [...state.current][i];
    t.textContent = ch ? up(ch) : '';
    t.classList.remove('is-flip');
    if (ch) { t.dataset.state = 'typing'; t.setAttribute('aria-label', `${r + 1}. deneme, ${i + 1}. harf ${up(ch)}`); }
    else { delete t.dataset.state; t.setAttribute('aria-label', `${r + 1}. deneme, ${i + 1}. harf, boş`); }
  });
}

function keyStates() {
  const map = {};
  for (const g of state.guesses) {
    const res = evaluate(g, state.answer);
    [...g].forEach((ch, i) => {
      if (!map[ch] || STATE_RANK[res[i]] > STATE_RANK[map[ch]]) map[ch] = res[i];
    });
  }
  return map;
}

function paintKeyboard() {
  const map = keyStates();
  keysEl.querySelectorAll('.kb-key').forEach((b) => {
    const k = b.dataset.key;
    if (map[k]) {
      b.dataset.state = map[k];
      b.setAttribute('aria-label', `${up(k)}, ${STATE_LABEL[map[k]]}`);
    } else if (k.length === 1) {
      delete b.dataset.state;
      b.setAttribute('aria-label', up(k));
    }
  });
}

/* ---------- Oyun akışı ---------- */
function resetBoardDom() {
  rows.forEach(({ tiles }, r) => tiles.forEach((t, c) => {
    t.textContent = '';
    delete t.dataset.state;
    t.classList.remove('is-flip');
    t.setAttribute('aria-label', `${r + 1}. deneme, ${c + 1}. harf, boş`);
  }));
}

function renderAll() {
  clearTimeout(panelTimer);
  resetBoardDom();
  state.guesses.forEach((g, r) => paintRow(r, g, evaluate(g, state.answer), false));
  paintCurrent();
  paintKeyboard();
  $('result').hidden = true;
  $('puzzle-label').textContent = state.mode === 'daily' ? `Günlük bulmaca #${state.day + 1}` : 'Sınırsız mod';
  $('mode-daily').setAttribute('aria-pressed', String(state.mode === 'daily'));
  $('mode-free').setAttribute('aria-pressed', String(state.mode === 'free'));
  $('new-word').hidden = state.mode !== 'free';
  boardEl.dataset.mode = state.mode;
  boardEl.dataset.status = state.status;
  if (state.status !== 'playing') showResult(false);
  renderStats();
}

function startMode(mode) {
  if (!ready) return;
  state.mode = mode;
  state.current = '';
  state.guesses = [];
  state.status = 'playing';
  state.counted = false;
  state.day = dayNumber();
  if (mode === 'daily') {
    state.answer = answers[((state.day % answers.length) + answers.length) % answers.length];
    const saved = store.daily;
    if (saved && saved.day === state.day && Array.isArray(saved.guesses)
      && saved.guesses.every((g) => typeof g === 'string' && [...g].length === WORD_LEN)) {
      state.guesses = saved.guesses.slice(0, MAX_TRIES);
      state.counted = !!saved.counted;
      if (state.guesses.includes(state.answer)) state.status = 'won';
      else if (state.guesses.length >= MAX_TRIES) state.status = 'lost';
    }
  } else {
    state.answer = answers[Math.floor(Math.random() * answers.length)];
  }
  renderAll();
  setMsg(mode === 'daily' ? `6 denemede ${WORD_LEN} harfli kelimeyi bulun.` : 'Sınırsız mod: istediğiniz kadar yeni kelime oynayın.', false, 3500);
}

function persistDaily() {
  if (state.mode !== 'daily') return;
  store.daily = { day: state.day, guesses: state.guesses, counted: state.counted };
  saveStore();
}

function typeLetter(ch) {
  if (!ready || state.status !== 'playing') return;
  if ([...state.current].length >= WORD_LEN) return;
  state.current += ch;
  paintCurrent();
}

function deleteLetter() {
  if (!ready || state.status !== 'playing') return;
  state.current = [...state.current].slice(0, -1).join('');
  paintCurrent();
}

function submit() {
  if (!ready) { setMsg('Sözlük hâlâ yükleniyor, birkaç saniye bekleyin.', true); return; }
  if (state.status !== 'playing') return;
  const r = state.guesses.length;
  const g = state.current;
  if ([...g].length < WORD_LEN) {
    shake(r);
    setMsg(`Kelime ${WORD_LEN} harfli olmalı; ${[...g].length} harf yazdınız.`, true);
    return;
  }
  if (!dict.has(g)) {
    shake(r);
    setMsg(`“${up(g)}” sözlükte yok. Türkçe bir kelime yazın; harflerin yeri ve imlası (ğ, ı, ş…) önemlidir.`, true, 4000);
    return;
  }
  if (state.guesses.includes(g)) {
    shake(r);
    setMsg('Bu kelimeyi zaten denediniz. Başka bir kelime yazın.', true);
    return;
  }
  const res = evaluate(g, state.answer);
  state.guesses.push(g);
  state.current = '';
  paintRow(r, g, res, true);
  if (g === state.answer) state.status = 'won';
  else if (state.guesses.length >= MAX_TRIES) state.status = 'lost';
  boardEl.dataset.status = state.status;
  if (state.status !== 'playing') finalize();
  persistDaily();
  // Satır çevirme bitince klavye renkleri ve sonuç paneli gelsin.
  clearTimeout(panelTimer);
  panelTimer = setTimeout(() => { paintKeyboard(); if (state.status !== 'playing') showResult(true); }, REVEAL_MS);
}

/** Oyun bittiğinde istatistikleri bir kez işler. */
function finalize() {
  if (state.counted) return;
  state.counted = true;
  const won = state.status === 'won';
  if (state.mode === 'daily') {
    const s = store.stats;
    s.played++;
    if (won) {
      s.won++;
      s.dist[state.guesses.length - 1]++;
      s.streak = s.lastWinDay === state.day - 1 ? s.streak + 1 : 1;
      s.maxStreak = Math.max(s.maxStreak, s.streak);
      s.lastWinDay = state.day;
    } else {
      s.streak = 0;
    }
  } else {
    store.free.played++;
    if (won) store.free.won++;
  }
  saveStore();
  renderStats();
}

function shareText() {
  const label = state.mode === 'daily' ? `Kelime Bulmaca #${state.day + 1}` : 'Kelime Bulmaca (sınırsız)';
  const score = state.status === 'won' ? `${state.guesses.length}/${MAX_TRIES}` : `X/${MAX_TRIES}`;
  const grid = state.guesses.map((g) => evaluate(g, state.answer).map((s) => EMOJI[s]).join('')).join('\n');
  return `${label} ${score}\n\n${grid}\n\n${SHARE_URL}`;
}

function showResult(scroll) {
  const won = state.status === 'won';
  $('result-title').textContent = won
    ? `Tebrikler! ${state.guesses.length}. denemede buldunuz.`
    : `Olmadı. Doğru kelime: ${up(state.answer)}`;
  $('result').dataset.result = won ? 'won' : 'lost';
  $('share-text').textContent = shareText();
  $('copy-status').textContent = '';
  $('switch-mode').textContent = state.mode === 'daily' ? 'Sınırsız modda oyna' : 'Yeni kelime';
  $('result').hidden = false;
  if (state.mode === 'daily') {
    $('stats').hidden = false;
    $('stats-toggle').setAttribute('aria-expanded', 'true');
  }
  if (scroll && !reduceMotion) $('result').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

/** Güncel seri: dün veya bugün kazanılmadıysa seri bozulmuş sayılır. */
function currentStreak() {
  const s = store.stats;
  return s.lastWinDay !== null && s.lastWinDay >= dayNumber() - 1 ? s.streak : 0;
}

function renderStats() {
  const s = store.stats;
  const pct = s.played ? Math.round((s.won / s.played) * 100) : 0;
  $('st-played').textContent = String(s.played);
  $('st-pct').textContent = `%${pct}`;
  $('st-streak').textContent = String(currentStreak());
  $('st-max').textContent = String(s.maxStreak);
  const max = Math.max(1, ...s.dist);
  const list = $('st-dist');
  list.textContent = '';
  s.dist.forEach((n, i) => {
    const li = document.createElement('li');
    const label = document.createElement('span');
    label.textContent = String(i + 1);
    const bar = document.createElement('span');
    bar.className = 'kb-bar';
    bar.style.width = `${Math.max(8, Math.round((n / max) * 100))}%`;
    bar.textContent = String(n);
    if (state.status === 'won' && state.mode === 'daily' && state.guesses.length === i + 1) bar.classList.add('is-today');
    li.append(label, bar);
    list.appendChild(li);
  });
  $('st-free').textContent = `Sınırsız mod: ${store.free.played} oynanan, ${store.free.won} kazanılan.`;
}

async function copyShare() {
  const text = $('share-text').textContent;
  let ok = false;
  try { await navigator.clipboard.writeText(text); ok = true; } catch (_) { /* izin yok: yedek yönteme geç */ }
  if (!ok) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { ok = document.execCommand('copy'); } catch (_) { ok = false; }
    ta.remove();
  }
  $('copy-status').textContent = ok ? 'Sonuç panoya kopyalandı.' : 'Kopyalanamadı; kutudaki metni elle seçip kopyalayın.';
}

/* ---------- Olaylar ---------- */
function onKey(k) {
  if (k === 'enter') submit();
  else if (k === 'del') deleteLetter();
  else typeLetter(k);
}

keysEl.addEventListener('click', (e) => {
  const b = e.target.closest('.kb-key');
  if (!b) return;
  onKey(b.dataset.key);
  // Fare/dokunma sonrası odağı bırak: sonraki Enter tuşu aynı harfi yeniden yazmasın. Klavyeyle (detail 0) odak korunur.
  if (e.detail > 0) b.blur();
});

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const tag = (e.target && e.target.tagName) || '';
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
  if (e.key === 'Enter' || e.key === ' ') {
    // Odaktaki düğme (ekran klavyesi, mod düğmesi…) kendi tıklamasını yapsın.
    if (tag === 'BUTTON' || tag === 'A' || tag === 'SUMMARY') return;
    if (e.key === 'Enter') { e.preventDefault(); submit(); }
    return;
  }
  if (e.key === 'Backspace') { e.preventDefault(); deleteLetter(); return; }
  if (e.key.length !== 1) return;
  const ch = low(e.key);
  if (LETTERS.has(ch)) { e.preventDefault(); typeLetter(ch); }
});

$('mode-daily').addEventListener('click', () => { if (state.mode !== 'daily') startMode('daily'); });
$('mode-free').addEventListener('click', () => { if (state.mode !== 'free') startMode('free'); });
$('new-word').addEventListener('click', () => startMode('free'));
$('switch-mode').addEventListener('click', () => startMode('free'));
$('copy-share').addEventListener('click', copyShare);
$('stats-toggle').addEventListener('click', () => {
  const box = $('stats');
  box.hidden = !box.hidden;
  $('stats-toggle').setAttribute('aria-expanded', String(!box.hidden));
});
// Sayfa gece yarısını aşarak açık kaldıysa günlük kelimeyi tazele.
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && ready && state.mode === 'daily' && state.day !== dayNumber()) startMode('daily');
});

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(String(res.status));
  return res.text();
}

async function init() {
  buildBoard();
  buildKeyboard();
  renderStats();
  setMsg('Sözlük yükleniyor…', false, 0);
  try {
    const [dictText, ansText] = await Promise.all([fetchText(DICT_URL), fetchText(ANSWERS_URL)]);
    dict = new Set(dictText.split(/\r?\n/).map((w) => low(w.trim())).filter((w) => [...w].length === WORD_LEN));
    answers = ansText.split(/\r?\n/).map((w) => low(w.trim())).filter((w) => [...w].length === WORD_LEN && dict.has(w));
    if (!answers.length) throw new Error('boş havuz');
  } catch (_) {
    setMsg('Kelime listesi yüklenemedi. Sayfayı yenileyin; sorun sürerse bağlantınızı kontrol edip tekrar deneyin.', true, 0);
    return;
  }
  ready = true;
  boardEl.dataset.ready = '1';
  startMode('daily');
}

init();
