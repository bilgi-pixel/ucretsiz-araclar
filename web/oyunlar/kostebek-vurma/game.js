// Köstebek Vurma — DOM tabanlı refleks oyunu (canvas gerekmez).
// Dış kütüphane ve ağ isteği yok. Skor ve ayarlar yalnızca bu tarayıcının localStorage alanında durur.

const STORE_KEY = 'ba-oyun-kostebek-vurma';
const MODES = {
  '60': { seconds: 60, bombs: true },
  '30': { seconds: 30, bombs: true },
  calm: { seconds: 0, bombs: false },
};
const BOMB_PENALTY = 5;
const BASE_POINTS = { normal: 1, gold: 3 };

// Sayı tuş takımı fiziksel düzeni izler (7-8-9 üst sıra); 4×4'te sayı ve harf blokları kullanılır.
const KEYS_3 = ['Numpad7', 'Numpad8', 'Numpad9', 'Numpad4', 'Numpad5', 'Numpad6', 'Numpad1', 'Numpad2', 'Numpad3'];
const KEYS_3_ALT = ['KeyQ', 'KeyW', 'KeyE', 'KeyA', 'KeyS', 'KeyD', 'KeyZ', 'KeyX', 'KeyC'];
const KEYS_4 = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyZ', 'KeyX', 'KeyC', 'KeyV'];
const LABEL_3 = ['7', '8', '9', '4', '5', '6', '1', '2', '3'];
const LABEL_4 = ['1', '2', '3', '4', 'Q', 'W', 'E', 'R', 'A', 'S', 'D', 'F', 'Z', 'X', 'C', 'V'];

const TYPE_NAME = { normal: 'köstebek', gold: 'altın köstebek', bomb: 'bomba' };

const svg = (cls, inner) => `<svg class="kv-svg kv-svg-${cls}" viewBox="0 0 100 100" aria-hidden="true" focusable="false">${inner}</svg>`;
const SVG_NORMAL = svg('normal',
  '<ellipse cx="50" cy="62" rx="34" ry="40" fill="#7a5640"/><ellipse cx="50" cy="76" rx="22" ry="20" fill="#a87c5f"/>' +
  '<circle cx="39" cy="50" r="5" fill="#1d1416"/><circle cx="61" cy="50" r="5" fill="#1d1416"/>' +
  '<circle cx="40.5" cy="48.5" r="1.6" fill="#fff"/><circle cx="62.5" cy="48.5" r="1.6" fill="#fff"/>' +
  '<ellipse cx="50" cy="61" rx="9" ry="6.5" fill="#e8a0ab"/><rect x="47" y="69" width="6" height="8" rx="1.5" fill="#fff"/>');
const SVG_GOLD = svg('gold',
  '<ellipse cx="50" cy="62" rx="34" ry="40" fill="#e2a91b"/><ellipse cx="50" cy="76" rx="22" ry="20" fill="#f6d46a"/>' +
  '<circle cx="39" cy="52" r="5" fill="#1d1416"/><circle cx="61" cy="52" r="5" fill="#1d1416"/>' +
  '<circle cx="40.5" cy="50.5" r="1.6" fill="#fff"/><circle cx="62.5" cy="50.5" r="1.6" fill="#fff"/>' +
  '<ellipse cx="50" cy="63" rx="9" ry="6.5" fill="#e8a0ab"/><rect x="47" y="71" width="6" height="8" rx="1.5" fill="#fff"/>' +
  '<path d="M36 34L34 16L44 25L50 14L56 25L66 16L64 34Z" fill="#fff1a8" stroke="#8a5d00" stroke-width="2" stroke-linejoin="round"/>');
const SVG_BOMB = svg('bomb',
  '<circle cx="50" cy="62" r="32" fill="#2a2d33"/><circle cx="40" cy="52" r="7" fill="#4a4e57"/>' +
  '<rect x="44" y="26" width="12" height="9" rx="2" fill="#53575f"/>' +
  '<path d="M56 28q10-6 14-16" fill="none" stroke="#d2b27a" stroke-width="3" stroke-linecap="round"/>' +
  '<circle cx="72" cy="11" r="6" fill="#f59e0b"/><circle cx="72" cy="11" r="3" fill="#fff3b0"/>' +
  '<path d="M50 52v13M50 73v1" stroke="#ff8a8a" stroke-width="7" stroke-linecap="round"/>');

const $ = (id) => document.getElementById(id);
const box = $('game-box');
const stage = $('stage');
const grid = $('kv-grid');
const overlay = $('overlay');
const ovTitle = $('overlay-title');
const ovText = $('overlay-text');
const ovBtn = $('overlay-btn');
const btnMain = $('btn-main');
const btnRestart = $('btn-restart');
const btnFinish = $('btn-finish');
const btnFull = $('btn-full');
const elScore = $('hud-score');
const elTime = $('hud-time');
const elBest = $('hud-best');
const elCombo = $('hud-combo');
const elStatus = $('status');
const modeBtns = Array.from(document.querySelectorAll('button[data-mode]'));
const sizeBtns = Array.from(document.querySelectorAll('button[data-size]'));

/* ---------- Kalıcı veri ---------- */

const toInt = (v) => (Number.isFinite(v) && v > 0 ? Math.floor(v) : 0);

function loadStore() {
  const def = { best: {}, mode: '60', size: 3 };
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (!raw || typeof raw !== 'object') return def;
    const best = {};
    if (raw.best && typeof raw.best === 'object') {
      for (const k of Object.keys(raw.best)) if (/^(60|30|calm)-(3|4)$/.test(k)) best[k] = toInt(raw.best[k]);
    }
    return { best, mode: typeof raw.mode === 'string' && Object.hasOwn(MODES, raw.mode) ? raw.mode : '60', size: raw.size === 4 ? 4 : 3 };
  } catch (_) {
    return def; // localStorage kapalı ya da bozuk: oyun yine çalışır
  }
}
const store = loadStore();
function saveStore() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (_) { /* özel gezinme */ }
}
const bestKey = () => `${cfg.mode}-${cfg.size}`;
const bestNow = () => store.best[bestKey()] || 0;

/* ---------- Durum ---------- */

let state = 'hazir'; // hazir | oynuyor | duraklatildi | bitti
let cfg = { mode: store.mode, size: store.size, seconds: MODES[store.mode].seconds, bombs: MODES[store.mode].bombs };
let holes = []; // { el, mole: null | { type, age, ttl } }
let score = 0;
let combo = 0;
let hits = 0;
let timeLeft = 0;
let elapsed = 0;
let spawnIn = 0;
let lastSpawn = -1;
let bestAtStart = 0;
let hold = false; // yalnızca test kancası: köstebekler kendiliğinden çıkmaz ve geri çekilmez
let unlockAt = 0;

const progress = () => (cfg.seconds ? Math.min(1, elapsed / cfg.seconds) : 0);
const stayFor = (p) => (cfg.seconds ? 1.3 - 0.7 * p : 1.9);
const intervalFor = (p) => (cfg.seconds ? 0.95 - 0.5 * p : 1.2);
const maxActive = () => (cfg.size === 3 ? (cfg.seconds ? 2 : 1) : (cfg.seconds ? 3 : 2));
const activeCount = () => holes.reduce((n, h) => n + (h.mole ? 1 : 0), 0);

function holeLabel(i, type) {
  return `Delik ${i + 1}${type ? `, ${TYPE_NAME[type]}` : ''}`;
}

function setMole(i, mole) {
  const h = holes[i];
  h.mole = mole;
  if (mole) h.el.setAttribute('data-mole', mole.type);
  else h.el.removeAttribute('data-mole');
  h.el.setAttribute('aria-label', holeLabel(i, mole ? mole.type : ''));
}

function buildGrid() {
  grid.textContent = '';
  grid.dataset.size = String(cfg.size);
  const labels = cfg.size === 3 ? LABEL_3 : LABEL_4;
  holes = [];
  for (let i = 0; i < cfg.size * cfg.size; i++) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'kv-hole';
    b.dataset.index = String(i);
    b.setAttribute('aria-label', holeLabel(i, ''));
    b.innerHTML = `<span class="kv-clip"><span class="kv-mole">${SVG_NORMAL}${SVG_GOLD}${SVG_BOMB}</span></span><span class="kv-key" aria-hidden="true">${labels[i]}</span>`;
    grid.appendChild(b);
    holes.push({ el: b, mole: null });
  }
}

function resetGame() {
  score = 0; combo = 0; hits = 0; elapsed = 0; hold = false; lastSpawn = -1;
  timeLeft = cfg.seconds;
  spawnIn = 0.5;
  bestAtStart = bestNow();
  holes.forEach((_, i) => setMole(i, null));
}

function applyMode(mode, size) {
  cfg = { mode, size, seconds: MODES[mode].seconds, bombs: MODES[mode].bombs };
  store.mode = mode; store.size = size;
  saveStore();
  modeBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)));
  sizeBtns.forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.size) === size)));
  buildGrid();
}

/* ---------- Oyun mantığı ---------- */

function pickType() {
  const r = Math.random();
  const p = progress();
  if (cfg.bombs && elapsed >= 4 && r < 0.1 + 0.1 * p) return 'bomb';
  if (elapsed >= 2 && r > 0.91) return 'gold';
  return 'normal';
}

function spawn(forceIndex, forceType) {
  let idx = forceIndex;
  if (idx === undefined) {
    const free = [];
    holes.forEach((h, i) => { if (!h.mole && i !== lastSpawn) free.push(i); });
    if (!free.length) return false;
    idx = free[Math.floor(Math.random() * free.length)];
  }
  if (!holes[idx] || holes[idx].mole) return false;
  const type = forceType || pickType();
  if (type === 'bomb' && !cfg.bombs) return false;
  const stay = stayFor(progress()) * (type === 'gold' ? 0.85 : 1);
  lastSpawn = idx;
  setMole(idx, { type, age: 0, ttl: stay });
  return true;
}

function leave(i) {
  const m = holes[i].mole;
  if (!m) return;
  if (m.type !== 'bomb' && cfg.seconds) combo = 0; // kaçan köstebek seriyi bozar
  setMole(i, null);
}

function floatText(i, text, good) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const s = document.createElement('span');
  s.className = `kv-float ${good ? 'good' : 'bad'}`;
  s.textContent = text;
  s.setAttribute('aria-hidden', 'true');
  holes[i].el.appendChild(s);
  setTimeout(() => s.remove(), 700);
}

function flash(i, cls) {
  const el = holes[i].el;
  el.classList.add(cls);
  setTimeout(() => el.classList.remove(cls), 220);
}

function whack(i) {
  if (state !== 'oynuyor' || !holes[i]) return;
  const m = holes[i].mole;
  if (!m) {
    if (cfg.seconds) combo = 0; // boşa vuruş (yalnızca süreli modda seriyi bozar)
    return;
  }
  if (m.type === 'bomb') {
    score = Math.max(0, score - BOMB_PENALTY);
    combo = 0;
    floatText(i, `−${BOMB_PENALTY}`, false);
    flash(i, 'is-bad');
  } else {
    const bonus = Math.min(3, Math.floor(combo / 5));
    const gain = BASE_POINTS[m.type] + bonus;
    score += gain;
    combo += 1;
    hits += 1;
    floatText(i, `+${gain}`, true);
    flash(i, 'is-good');
    if (score > bestNow()) { store.best[bestKey()] = score; saveStore(); }
  }
  setMole(i, null);
  sync();
}

function update(dt) {
  elapsed += dt;
  if (cfg.seconds) timeLeft = Math.max(0, timeLeft - dt);
  if (!hold) {
    holes.forEach((h, i) => {
      if (!h.mole) return;
      h.mole.age += dt;
      if (h.mole.age >= h.mole.ttl) leave(i);
    });
    spawnIn -= dt;
    if (spawnIn <= 0) {
      if (activeCount() < maxActive() && spawn()) {
        const p = progress();
        spawnIn = intervalFor(p) * (0.8 + Math.random() * 0.5);
      } else {
        spawnIn = 0.1;
      }
    }
  }
  if (cfg.seconds && timeLeft <= 0) endGame('Süre doldu!');
}

/* ---------- Döngü ---------- */

let rafId = 0;
let lastTs = 0;
function frame(ts) {
  rafId = 0;
  if (state !== 'oynuyor') return;
  const dt = Math.min(Math.max((ts - lastTs) / 1000, 0), 0.1);
  lastTs = ts;
  update(dt);
  if (state === 'oynuyor') {
    sync();
    rafId = requestAnimationFrame(frame);
  }
}
function startLoop() {
  lastTs = performance.now();
  if (!rafId) rafId = requestAnimationFrame(frame);
}
function stopLoop() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = 0;
}

/* ---------- Durum geçişleri ---------- */

const announce = (msg) => { elStatus.textContent = msg; };

function showOverlay(title, text, label, focus, lockMs = 0) {
  ovTitle.textContent = title;
  ovText.textContent = text;
  ovBtn.textContent = label;
  overlay.hidden = false;
  grid.inert = true;
  unlockAt = performance.now() + lockMs;
  ovBtn.disabled = lockMs > 0;
  if (lockMs > 0) {
    setTimeout(() => {
      ovBtn.disabled = false;
      if (focus && !overlay.hidden && state === 'bitti') ovBtn.focus({ preventScroll: true });
    }, lockMs);
  } else if (focus) {
    ovBtn.focus({ preventScroll: true });
  }
}
function hideOverlay() {
  overlay.hidden = true;
  grid.inert = false;
}
function lockSettings(lock) {
  modeBtns.forEach((b) => { b.disabled = lock; });
  sizeBtns.forEach((b) => { b.disabled = lock; });
}

function toReady() {
  stopLoop();
  resetGame();
  state = 'hazir';
  lockSettings(false);
  const calm = !cfg.seconds;
  showOverlay('Köstebek Vurma', calm
    ? 'Sakin mod: süre ve bomba yok. Başlat düğmesine basın, çıkan köstebeklere vurun; bitirmek için Bitir düğmesini kullanın.'
    : `${cfg.seconds} saniyen var. Köstebeklere vur, altın köstebeği kaçırma, bombaya dokunma. Başlat düğmesine bas.`, 'Başlat', false);
  sync();
}

function startGame() {
  resetGame();
  state = 'oynuyor';
  hideOverlay();
  lockSettings(true);
  announce('Oyun başladı.');
  sync();
  startLoop();
}

function pauseGame() {
  if (state !== 'oynuyor') return;
  stopLoop();
  state = 'duraklatildi';
  showOverlay('Duraklatıldı', 'Devam etmek için P tuşuna ya da Devam et düğmesine basın.', 'Devam et', true);
  announce('Oyun duraklatıldı.');
  sync();
}

function resumeGame() {
  if (state !== 'duraklatildi') return;
  state = 'oynuyor';
  hideOverlay();
  announce('Oyun devam ediyor.');
  sync();
  startLoop();
}

function endGame(title) {
  if (state !== 'oynuyor' && state !== 'duraklatildi') return;
  stopLoop();
  state = 'bitti';
  lockSettings(false);
  const record = score > bestAtStart;
  if (score > bestNow()) store.best[bestKey()] = score;
  saveStore();
  const text = `Skor: ${score} · Vurulan: ${hits} · En yüksek: ${bestNow()}.${record && score > 0 ? ' Yeni rekor!' : ''}`;
  holes.forEach((_, i) => setMole(i, null));
  showOverlay(title || 'Oyun bitti', text, 'Tekrar oyna', true, 500);
  announce(`${title || 'Oyun bitti'} ${text}`);
  sync();
}

function primaryAction() {
  if (state === 'bitti' && performance.now() < unlockAt) return;
  if (state === 'hazir' || state === 'bitti') startGame();
  else if (state === 'oynuyor') pauseGame();
  else if (state === 'duraklatildi') resumeGame();
}

/* ---------- Ekran ---------- */

const lastData = {};
function setData(key, value) {
  const v = String(value);
  if (lastData[key] !== v) { lastData[key] = v; stage.dataset[key] = v; }
}
function sync() {
  setData('state', state);
  setData('score', score);
  setData('combo', combo);
  setData('mode', cfg.mode);
  setData('size', cfg.size);
  setData('active', holes.map((h, i) => (h.mole ? i : -1)).filter((i) => i >= 0).join(','));
  elScore.textContent = String(score);
  elTime.textContent = cfg.seconds ? String(Math.ceil(timeLeft)) : '∞';
  elBest.textContent = String(Math.max(bestNow(), score));
  elCombo.textContent = String(combo);
  btnMain.textContent = { hazir: 'Başlat', oynuyor: 'Duraklat', duraklatildi: 'Devam et', bitti: 'Tekrar oyna' }[state];
  btnFinish.disabled = !(state === 'oynuyor' || state === 'duraklatildi');
}

/* ---------- Girdiler ---------- */

// Fare ve dokunma: pointerdown anında vurur (köstebek tıklama bitmeden kaybolmasın).
grid.addEventListener('pointerdown', (e) => {
  if (e.button > 0) return;
  const b = e.target instanceof Element ? e.target.closest('.kv-hole') : null;
  if (b) whack(Number(b.dataset.index));
});
// Klavye (Enter/Boşluk) etkinleştirmesi click olayı olarak gelir (detail = 0).
grid.addEventListener('click', (e) => {
  if (e.detail !== 0) return;
  const b = e.target instanceof Element ? e.target.closest('.kv-hole') : null;
  if (b) whack(Number(b.dataset.index));
});

function keyIndex(code) {
  if (cfg.size === 3) {
    const a = KEYS_3.indexOf(code);
    return a >= 0 ? a : KEYS_3_ALT.indexOf(code);
  }
  return KEYS_4.indexOf(code);
}

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const t = e.target;
  if (t instanceof Element && t.closest('input, textarea, select, [contenteditable="true"]')) return;
  if (e.code === 'KeyP') {
    if (state === 'oynuyor') { pauseGame(); e.preventDefault(); }
    else if (state === 'duraklatildi') { resumeGame(); e.preventDefault(); }
    return;
  }
  // Delikler arasında ok tuşlarıyla gezinme
  if (t instanceof Element && t.classList.contains('kv-hole') && e.key.startsWith('Arrow')) {
    const i = Number(t.dataset.index);
    const n = cfg.size;
    const col = i % n; const row = Math.floor(i / n);
    const nc = Math.min(n - 1, Math.max(0, col + (e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0)));
    const nr = Math.min(n - 1, Math.max(0, row + (e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0)));
    holes[nr * n + nc].el.focus();
    e.preventDefault();
    return;
  }
  if (state !== 'oynuyor' || e.repeat) return;
  const idx = keyIndex(e.code);
  if (idx >= 0) { whack(idx); e.preventDefault(); }
});

btnMain.addEventListener('click', primaryAction);
ovBtn.addEventListener('click', primaryAction);
btnRestart.addEventListener('click', () => { toReady(); startGame(); });
btnFinish.addEventListener('click', () => endGame(cfg.seconds ? 'Oyun bitti' : 'Tebrikler!'));

modeBtns.forEach((b) => b.addEventListener('click', () => {
  if (state === 'oynuyor') return;
  applyMode(b.dataset.mode, cfg.size);
  toReady();
}));
sizeBtns.forEach((b) => b.addEventListener('click', () => {
  if (state === 'oynuyor') return;
  applyMode(cfg.mode, Number(b.dataset.size));
  toReady();
}));

document.addEventListener('visibilitychange', () => { if (document.hidden) pauseGame(); });
window.addEventListener('blur', () => pauseGame());

if (!(document.fullscreenEnabled || document.webkitFullscreenEnabled) || !box.requestFullscreen) {
  btnFull.hidden = true;
} else {
  btnFull.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else box.requestFullscreen().catch(() => {});
  });
  document.addEventListener('fullscreenchange', () => {
    const on = document.fullscreenElement === box;
    btnFull.textContent = on ? 'Tam ekrandan çık' : 'Tam ekran';
    btnFull.setAttribute('aria-pressed', String(on));
  });
}

/* ---------- Test kancası (oyuncuya sunulan bir özellik değildir) ---------- */
// shorten() yalnızca süreyi KISALTIR. hold(true) köstebek üretimini ve geri çekilmeyi durdurur.
window.__kostebekTest = Object.assign(() => ({
  state, mode: cfg.mode, size: cfg.size, score, combo, timeLeft, best: bestNow(), hold, bombs: cfg.bombs,
  active: holes.map((h, i) => (h.mole ? { index: i, type: h.mole.type } : null)).filter(Boolean),
}), {
  hold(on = true) { hold = !!on; },
  spawn(index, type = 'normal') { return state === 'oynuyor' ? spawn(index, type) : false; },
  shorten(seconds) { if (cfg.seconds && state === 'oynuyor') timeLeft = Math.min(timeLeft, Math.max(0.05, seconds)); },
});

/* ---------- Başlangıç ---------- */
applyMode(store.mode, store.size);
toReady();
