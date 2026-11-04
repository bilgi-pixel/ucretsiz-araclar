// Yılan Oyunu — canvas ızgara, requestAnimationFrame ile sabit adımlı döngü.
// Dış kütüphane ve ağ isteği yok. En yüksek skor ve ayarlar yalnızca bu tarayıcının
// localStorage alanında durur; hiçbir yere gönderilmez.

const COLS = 20;
const ROWS = 20;
const STORE_KEY = 'ba-yilan-oyunu';
const POINTS_PER_FOOD = 10;
// Adım süresi (ms): küçük değer = hızlı yılan.
const BASE_STEP_MS = { slow: 170, normal: 115, fast: 75 };
const MIN_STEP_MS = 45;
const ACCEL_FACTOR = 0.96; // "Yendikçe hızlan" açıkken her yemde adım süresi bu çarpanla kısalır
const REF_STEP_MS = 115; // ekranda gösterilen hız çarpanı için kıyas (normal = 1,0×)
const SWIPE_MIN_PX = 22;

const DIRS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};
const KEY_DIR = {
  ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
  w: 'up', s: 'down', a: 'left', d: 'right',
};

// Bordo / gri palet (koyu tahta, açık bordo yılan; tahta üzerinde en az 3:1 karşıtlık)
const COLOR = {
  cellA: '#24272c',
  cellB: '#292c32',
  body: '#c25a72',
  bodyAlt: '#b44f68',
  head: '#f0b6c4',
  eye: '#24272c',
  food: '#f3f4f6',
  foodCore: '#7b2331',
  wall: '#c25a72',
  wrapLine: '#8e9096',
};

const $ = (id) => document.getElementById(id);
const box = $('game-box');
const stage = $('stage');
const canvas = $('board');
const ctx = canvas.getContext('2d');
const overlay = $('overlay');
const overlayTitle = $('overlay-title');
const overlayText = $('overlay-text');
const overlayBtn = $('overlay-btn');
const btnMain = $('btn-main');
const btnRestart = $('btn-restart');
const btnFull = $('btn-full');
const selSpeed = $('opt-speed');
const chkAccel = $('opt-accel');
const selMode = $('opt-mode');
const elScore = $('score');
const elBest = $('best');
const elLen = $('length');
const elSpeed = $('speedx');
const elStatus = $('status');

/* ---------- Kalıcı veri (yalnızca localStorage) ---------- */

const toInt = (v) => (Number.isFinite(v) && v > 0 ? Math.floor(v) : 0);

function loadStore() {
  const def = { best: { wall: 0, wrap: 0 }, speed: 'normal', accel: false, mode: 'wall' };
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (!raw || typeof raw !== 'object') return def;
    return {
      best: { wall: toInt(raw.best && raw.best.wall), wrap: toInt(raw.best && raw.best.wrap) },
      speed: BASE_STEP_MS[raw.speed] ? raw.speed : def.speed,
      accel: raw.accel === true,
      mode: raw.mode === 'wrap' ? 'wrap' : 'wall',
    };
  } catch (_) {
    return def; // localStorage kapalı ya da bozuk: oyun yine çalışır, skor saklanmaz
  }
}
const store = loadStore();
function saveStore() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (_) { /* özel gezinme modu */ }
}

/* ---------- Oyun durumu ---------- */

let state = 'hazir'; // hazir | oynuyor | duraklatildi | bitti
let cfg = { speed: 'normal', accel: false, wrap: false };
let snake = [];
let dirName = 'right';
let queue = [];
let food = null;
let score = 0;
let eaten = 0;
let bestAtStart = 0;
let unlockAt = 0; // oyun sonu ekranında kazara tuşla yeniden başlamayı önleyen kısa kilit

function readSettings() {
  return { speed: selSpeed.value, accel: chkAccel.checked, wrap: selMode.value === 'wrap' };
}
const modeKey = () => (cfg.wrap ? 'wrap' : 'wall');

function stepMs() {
  const base = BASE_STEP_MS[cfg.speed] || BASE_STEP_MS.normal;
  return Math.max(MIN_STEP_MS, cfg.accel ? base * Math.pow(ACCEL_FACTOR, eaten) : base);
}

function spawnFood() {
  const taken = new Set(snake.map((c) => c.y * COLS + c.x));
  const free = [];
  for (let i = 0; i < COLS * ROWS; i++) if (!taken.has(i)) free.push(i);
  if (!free.length) return null; // tahta doldu
  const pick = free[Math.floor(Math.random() * free.length)];
  return { x: pick % COLS, y: Math.floor(pick / COLS) };
}

function resetGame() {
  cfg = readSettings();
  const cx = Math.floor(COLS / 2);
  const cy = Math.floor(ROWS / 2);
  snake = [{ x: cx, y: cy }, { x: cx - 1, y: cy }, { x: cx - 2, y: cy }];
  dirName = 'right';
  queue = [];
  score = 0;
  eaten = 0;
  bestAtStart = store.best[modeKey()];
  food = spawnFood();
}

// Bir yön isteği ekler: geri dönüş ve aynı yön yok; en fazla 2 hamle kuyrukta bekler.
function turn(name) {
  const d = DIRS[name];
  if (!d) return;
  const last = DIRS[queue.length ? queue[queue.length - 1] : dirName];
  if (d.x === -last.x && d.y === -last.y) return;
  if (d.x === last.x && d.y === last.y) return;
  if (queue.length < 2) queue.push(name);
}

function step() {
  if (queue.length) dirName = queue.shift();
  const d = DIRS[dirName];
  const head = snake[0];
  let nx = head.x + d.x;
  let ny = head.y + d.y;
  if (cfg.wrap) {
    nx = (nx + COLS) % COLS;
    ny = (ny + ROWS) % ROWS;
  } else if (nx < 0 || ny < 0 || nx >= COLS || ny >= ROWS) {
    endGame('Duvara çarptın.');
    return;
  }
  const willEat = !!food && nx === food.x && ny === food.y;
  // Yemek yenmiyorsa kuyruk ucu bu adımda boşalır; oraya girmek ölümcül değildir.
  const solid = willEat ? snake : snake.slice(0, -1);
  if (solid.some((c) => c.x === nx && c.y === ny)) {
    endGame('Kendi gövdene çarptın.');
    return;
  }
  snake.unshift({ x: nx, y: ny });
  if (willEat) {
    score += POINTS_PER_FOOD;
    eaten += 1;
    if (score > store.best[modeKey()]) { store.best[modeKey()] = score; saveStore(); }
    food = spawnFood();
    if (!food) endGame('Tahtayı tamamen doldurdun!', true);
  } else {
    snake.pop();
  }
}

/* ---------- Döngü: sabit adım + requestAnimationFrame ---------- */

let rafId = 0;
let lastTs = 0;
let acc = 0;

function frame(ts) {
  rafId = 0;
  if (state !== 'oynuyor') return;
  acc += Math.min(Math.max(ts - lastTs, 0), 250); // sekme uyuyunca ani atlama olmasın
  lastTs = ts;
  let guard = 0;
  while (state === 'oynuyor' && acc >= stepMs() && guard++ < 8) {
    acc -= stepMs();
    step();
  }
  draw();
  sync();
  if (state === 'oynuyor') rafId = requestAnimationFrame(frame);
}
function startLoop() {
  lastTs = performance.now();
  acc = 0;
  if (!rafId) rafId = requestAnimationFrame(frame);
}
function stopLoop() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = 0;
}

/* ---------- Durum geçişleri ---------- */

function announce(msg) { elStatus.textContent = msg; }

// lockMs > 0: düğme kısa süre kapalı kalır (oyuncu tuşa basarken ekranı kazara geçmesin).
function showOverlay(title, text, btnLabel, focusBtn, lockMs = 0) {
  overlayTitle.textContent = title;
  overlayText.textContent = text;
  overlayBtn.textContent = btnLabel;
  overlay.hidden = false;
  unlockAt = performance.now() + lockMs;
  overlayBtn.disabled = lockMs > 0;
  if (lockMs > 0) {
    setTimeout(() => {
      overlayBtn.disabled = false;
      if (focusBtn && !overlay.hidden && state === 'bitti') overlayBtn.focus({ preventScroll: true });
    }, lockMs);
  } else if (focusBtn) {
    overlayBtn.focus({ preventScroll: true });
  }
}

function lockSettings(lock) {
  selSpeed.disabled = lock;
  chkAccel.disabled = lock;
  selMode.disabled = lock;
}

function toReady() {
  stopLoop();
  resetGame();
  state = 'hazir';
  lockSettings(false);
  showOverlay('Yılan Oyunu', 'Başlat düğmesine basın ya da tahtaya bir yön tuşuyla dokunun. Ok tuşları, W A S D veya kaydırma ile yönlendirin.', 'Başlat', false);
  draw();
  sync();
}

function startGame() {
  resetGame();
  state = 'oynuyor';
  overlay.hidden = true;
  lockSettings(true);
  announce('Oyun başladı.');
  draw();
  sync();
  startLoop();
  stage.focus({ preventScroll: true });
}

function pauseGame() {
  if (state !== 'oynuyor') return;
  stopLoop();
  state = 'duraklatildi';
  lockSettings(false);
  showOverlay('Duraklatıldı', 'Devam etmek için Boşluk ya da P tuşuna basın. Ayarı değiştirirseniz oyun yeniden başlar.', 'Devam et', true);
  announce('Oyun duraklatıldı.');
  sync();
}

function resumeGame() {
  if (state !== 'duraklatildi') return;
  state = 'oynuyor';
  overlay.hidden = true;
  lockSettings(true);
  announce('Oyun devam ediyor.');
  sync();
  startLoop();
  stage.focus({ preventScroll: true });
}

function endGame(reason, win = false) {
  stopLoop();
  state = 'bitti';
  lockSettings(false);
  const record = score > bestAtStart;
  if (score > store.best[modeKey()]) store.best[modeKey()] = score;
  saveStore();
  const best = store.best[modeKey()];
  const title = win ? 'Tebrikler!' : 'Oyun bitti';
  const text = `${reason} Skor: ${score} · En yüksek: ${best}.${record && score > 0 ? ' Yeni rekor!' : ''}`;
  showOverlay(title, text, 'Tekrar oyna', true, 500);
  announce(`${title} ${text}`);
  draw();
  sync();
}

function primaryAction() {
  if (state === 'bitti' && performance.now() < unlockAt) return;
  if (state === 'hazir' || state === 'bitti') startGame();
  else if (state === 'oynuyor') pauseGame();
  else if (state === 'duraklatildi') resumeGame();
}

/* ---------- Ekran bilgileri ---------- */

const lastData = {};
function setData(key, value) {
  const v = String(value);
  if (lastData[key] !== v) { lastData[key] = v; stage.dataset[key] = v; }
}

function sync() {
  const head = snake[0];
  setData('state', state);
  setData('head', `${head.x},${head.y}`);
  setData('food', food ? `${food.x},${food.y}` : '');
  setData('dir', dirName);
  setData('score', score);
  setData('length', snake.length);
  setData('mode', modeKey());
  setData('speed', cfg.speed);
  elScore.textContent = String(score);
  elBest.textContent = String(Math.max(store.best[modeKey()], score));
  elLen.textContent = String(snake.length);
  elSpeed.textContent = `${(REF_STEP_MS / stepMs()).toFixed(1).replace('.', ',')}×`;
  btnMain.textContent = { hazir: 'Başlat', oynuyor: 'Duraklat', duraklatildi: 'Devam et', bitti: 'Tekrar oyna' }[state];
}

/* ---------- Çizim (CSS pikseli koordinatları; devicePixelRatio ile ölçeklenir) ---------- */

let cssSize = 0;

function fit() {
  const rect = canvas.getBoundingClientRect();
  const size = Math.max(1, Math.round(rect.width));
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  const px = Math.round(size * dpr);
  if (canvas.width !== px || canvas.height !== px) {
    canvas.width = px;
    canvas.height = px; // boyut değişince bağlam sıfırlanır
  }
  cssSize = size;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  draw();
}

function roundedRect(x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function draw() {
  if (!cssSize || !snake.length) return;
  const s = cssSize;
  const c = s / COLS;
  const pad = Math.max(1, c * 0.08);
  ctx.clearRect(0, 0, s, s);

  // Zemin: ince dama deseni
  ctx.fillStyle = COLOR.cellA;
  ctx.fillRect(0, 0, s, s);
  ctx.fillStyle = COLOR.cellB;
  for (let y = 0; y < ROWS; y++) {
    for (let x = (y % 2); x < COLS; x += 2) ctx.fillRect(x * c, y * c, c, c);
  }

  // Yem
  if (food) {
    const fx = food.x * c + c / 2;
    const fy = food.y * c + c / 2;
    ctx.fillStyle = COLOR.food;
    ctx.beginPath(); ctx.arc(fx, fy, c * 0.36, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = COLOR.foodCore;
    ctx.beginPath(); ctx.arc(fx, fy, c * 0.16, 0, Math.PI * 2); ctx.fill();
  }

  // Gövde: kuyruktan başa doğru; ardışık parçalar bağlayıcıyla birleşir
  const inner = c - pad * 2;
  for (let i = snake.length - 1; i >= 0; i--) {
    const seg = snake[i];
    const x = seg.x * c + pad;
    const y = seg.y * c + pad;
    ctx.fillStyle = i === 0 ? COLOR.head : (i % 2 ? COLOR.body : COLOR.bodyAlt);
    roundedRect(x, y, inner, inner, c * 0.28);
    ctx.fill();
    const next = snake[i + 1];
    if (next && Math.abs(next.x - seg.x) + Math.abs(next.y - seg.y) === 1) {
      ctx.fillStyle = i % 2 ? COLOR.body : COLOR.bodyAlt;
      const ox = Math.min(seg.x, next.x) * c + pad;
      const oy = Math.min(seg.y, next.y) * c + pad;
      const horizontal = next.y === seg.y;
      ctx.fillRect(ox, oy, horizontal ? c + inner : inner, horizontal ? inner : c + inner);
    }
  }

  // Göz: gidilen yöne bakar
  const head = snake[0];
  const d = DIRS[dirName];
  const hx = head.x * c + c / 2;
  const hy = head.y * c + c / 2;
  ctx.fillStyle = COLOR.eye;
  for (const side of [-1, 1]) {
    const ex = hx + d.x * c * 0.16 + (-d.y) * side * c * 0.17;
    const ey = hy + d.y * c * 0.16 + d.x * side * c * 0.17;
    ctx.beginPath(); ctx.arc(ex, ey, Math.max(1.2, c * 0.075), 0, Math.PI * 2); ctx.fill();
  }

  // Çerçeve: duvarlı modda sürekli bordo, duvarsız modda kesikli gri
  ctx.lineWidth = 3;
  if (cfg.wrap) {
    ctx.strokeStyle = COLOR.wrapLine;
    ctx.setLineDash([c * 0.4, c * 0.3]);
  } else {
    ctx.strokeStyle = COLOR.wall;
    ctx.setLineDash([]);
  }
  ctx.strokeRect(1.5, 1.5, s - 3, s - 3);
  ctx.setLineDash([]);
}

/* ---------- Girdiler: klavye, kaydırma, ekran okları ---------- */

function isInBox(el) { return el instanceof Node && box.contains(el); }

function pressDirection(name) {
  if (state === 'hazir') {
    startGame();
    turn(name);
  } else if (state === 'oynuyor') {
    turn(name);
  }
}

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const t = e.target;
  // Form alanlarında (seçim kutuları vb.) oyun tuşları çalışmasın
  if (t instanceof Element && t.closest('select, input, textarea, [contenteditable="true"]')) return;
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  const dir = KEY_DIR[key];
  if (dir) {
    if (state === 'oynuyor') { turn(dir); e.preventDefault(); }
    else if (state === 'hazir' && isInBox(t)) { pressDirection(dir); e.preventDefault(); }
    else if (isInBox(t) && key.startsWith('Arrow')) e.preventDefault(); // kutu içinde sayfa kaymasın
    return;
  }
  const isSpace = e.key === ' ' || e.key === 'Spacebar';
  if (isSpace || key === 'p') {
    // Odaktaki düğme ya da bağlantı Boşluk'u kendi tıklaması için kullanır; ona karışma
    if (isSpace && t instanceof Element && t.closest('button, a, summary')) return;
    if (state === 'oynuyor') { pauseGame(); e.preventDefault(); }
    else if (state === 'duraklatildi') { resumeGame(); e.preventDefault(); }
    else if (isSpace && isInBox(t)) { primaryAction(); e.preventDefault(); }
  } else if (e.key === 'Enter' && isInBox(t) && !(t instanceof Element && t.closest('button, a, summary'))) {
    if (state === 'hazir' || state === 'bitti') { primaryAction(); e.preventDefault(); }
  }
});

// Dokunmatik kaydırma: parmak yeterince kayınca yön değişir, başlangıç noktası yenilenir.
let swipe = null;
stage.addEventListener('pointerdown', (e) => {
  if (e.pointerType === 'mouse') return;
  if (e.target instanceof Element && e.target.closest('button')) return;
  swipe = { id: e.pointerId, x: e.clientX, y: e.clientY };
  try { stage.setPointerCapture(e.pointerId); } catch (_) { /* yapay olaylarda yakalama yok */ }
});
stage.addEventListener('pointermove', (e) => {
  if (!swipe || swipe.id !== e.pointerId) return;
  const dx = e.clientX - swipe.x;
  const dy = e.clientY - swipe.y;
  if (Math.max(Math.abs(dx), Math.abs(dy)) < SWIPE_MIN_PX) return;
  pressDirection(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
  swipe.x = e.clientX;
  swipe.y = e.clientY;
});
const endSwipe = (e) => { if (swipe && swipe.id === e.pointerId) swipe = null; };
stage.addEventListener('pointerup', endSwipe);
stage.addEventListener('pointercancel', endSwipe);

// Ekran okları: dokunuşta hemen çalışır (pointerdown); klavyeyle etkinleştirme click ile gelir (detail = 0).
document.querySelectorAll('[data-pad]').forEach((btn) => {
  btn.addEventListener('pointerdown', (e) => { e.preventDefault(); pressDirection(btn.dataset.pad); });
  btn.addEventListener('click', (e) => { if (e.detail === 0) pressDirection(btn.dataset.pad); });
});

/* ---------- Düğmeler, ayarlar, tam ekran ---------- */

btnMain.addEventListener('click', primaryAction);
overlayBtn.addEventListener('click', primaryAction);
btnRestart.addEventListener('click', startGame);

[selSpeed, chkAccel, selMode].forEach((el) => el.addEventListener('change', () => {
  store.speed = selSpeed.value;
  store.accel = chkAccel.checked;
  store.mode = selMode.value;
  saveStore();
  if (state !== 'oynuyor') toReady(); // ayar değişti: yeni ayarlarla temiz tahta
}));

document.addEventListener('visibilitychange', () => { if (document.hidden) pauseGame(); });

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
    fit();
  });
}

/* ---------- Başlangıç ---------- */

selSpeed.value = store.speed;
chkAccel.checked = store.accel;
selMode.value = store.mode;
toReady();
if ('ResizeObserver' in window) new ResizeObserver(fit).observe(stage);
window.addEventListener('resize', fit);
fit();
