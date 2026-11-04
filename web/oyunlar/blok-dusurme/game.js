// Düşen Bloklar arayüzü: canvas çizimi, zamanlama (requestAnimationFrame), klavye, dokunma ve ekran düğmeleri.
// Kurallar engine.js içindedir. Ağ isteği yok; yalnızca en yüksek skor localStorage'a yazılır.
import {
  COLS, ROWS, COLORS, createBoard, spawn, cellsOf, collides, tryMove, tryRotate, dropped,
  lockPiece, clearLines, scoreFor, levelFor, dropInterval, createBag, mulberry32, filledCount,
} from './engine.js';

const $ = (id) => document.getElementById(id);
const canvas = $('bd-canvas');
const ctx = canvas.getContext('2d');
const holdCv = $('bd-hold');
const nextCv = $('bd-next');
const stage = $('bd-stage');
const overlay = $('bd-overlay');
const ovTitle = $('bd-ov-title');
const ovText = $('bd-ov-text');
const ovBtn = $('bd-ov-btn');
const pauseBtn = $('bd-pause');
const restartBtn = $('bd-restart');
const live = $('bd-live');

const HIGH_KEY = 'ba-oyun-blok-dusurme-en-yuksek';
const LOCK_DELAY = 450; // ms: yere değen parçanın sabitlenmeden önceki bekleme süresi
const MAX_RESETS = 12; // yere değerken hareketle sıfırlanabilecek en çok sayı
const NEXT_COUNT = 3;

// Tohum yalnızca testlerin tekrarlanabilir olması için (?seed=123); normalde rastgele.
const seedParam = Number(new URLSearchParams(location.search).get('seed'));
const rng = Number.isFinite(seedParam) && seedParam > 0 ? mulberry32(seedParam) : Math.random;

let board;
let piece;
let holdType;
let canHold;
let queue;
let nextType;
let score;
let lines;
let level;
let high = readHigh();
let status = 'idle'; // idle | playing | paused | over
let dropAcc = 0;
let lockAcc = 0;
let resets = 0;
let lastTs = 0;
let rafId = 0;
let cell = 30; // canvas hücre boyutu (piksel)
let newRecord = false;
let infoKey = '';

/* ---------- Depolama ---------- */
function readHigh() {
  try { return Number(localStorage.getItem(HIGH_KEY)) || 0; } catch { return 0; }
}
function saveHigh() {
  try { localStorage.setItem(HIGH_KEY, String(high)); } catch { /* depolama kapalı olabilir */ }
}
function addScore(n) {
  score += n;
  if (score > high) { high = score; newRecord = true; saveHigh(); }
}

/* ---------- Oyun akışı ---------- */
function reset() {
  board = createBoard();
  nextType = createBag(rng);
  queue = [];
  while (queue.length < NEXT_COUNT + 1) queue.push(nextType());
  holdType = null;
  canHold = true;
  score = 0; lines = 0; level = 1;
  newRecord = false;
  dropAcc = 0; lockAcc = 0; resets = 0;
  piece = spawn(queue.shift());
  queue.push(nextType());
}

function start() {
  reset();
  status = 'playing';
  lastTs = performance.now();
  hideOverlay();
  stage.focus({ preventScroll: true });
  announce('Oyun başladı');
  loop(lastTs);
  syncUI();
}

function spawnNext() {
  piece = spawn(queue.shift());
  queue.push(nextType());
  canHold = true;
  dropAcc = 0; lockAcc = 0; resets = 0;
  if (collides(board, piece)) gameOver();
}

function gameOver() {
  status = 'over';
  cancelAnimationFrame(rafId);
  // Odak düğmeye taşınmaz: Boşluk tuşuna basmaya devam eden oyuncu yanlışlıkla yeniden başlatmasın.
  showOverlay('Oyun bitti', `Skor: ${score} · Satır: ${lines} · Seviye: ${level}${newRecord ? ' · Yeni rekor!' : ''}`, 'Tekrar oyna', false);
  announce(`Oyun bitti. Skor ${score}. Yeniden oynamak için Enter tuşuna ya da Tekrar oyna düğmesine basın.`);
  syncUI();
  draw();
}

function pause() {
  if (status !== 'playing') return;
  status = 'paused';
  cancelAnimationFrame(rafId);
  showOverlay('Duraklatıldı', 'Devam etmek için düğmeye ya da P tuşuna basın.', 'Devam et', true);
  syncUI();
  draw();
}

function resume() {
  if (status !== 'paused') return;
  status = 'playing';
  lastTs = performance.now();
  hideOverlay();
  stage.focus({ preventScroll: true });
  loop(lastTs);
  syncUI();
  draw();
}

function togglePause() {
  if (status === 'playing') pause(); else if (status === 'paused') resume();
}

function lockNow() {
  const out = lockPiece(board, piece);
  const n = clearLines(board);
  if (n) {
    addScore(scoreFor(n, level));
    lines += n;
    level = levelFor(lines);
    announce(`${n} satır temizlendi. Skor ${score}, seviye ${level}.`);
  }
  if (out) { piece = null; gameOver(); return; }
  spawnNext();
}

/** Yatay hareket: dx = -1 sol, +1 sağ. */
function moveSide(dx) {
  if (status !== 'playing') return;
  const q = tryMove(board, piece, dx, 0);
  if (!q) return;
  piece = q;
  touchedGround();
  draw();
}

/** Yumuşak düşürme: bir hücre aşağı, hücre başına 1 puan. */
function softDrop() {
  if (status !== 'playing') return;
  const q = tryMove(board, piece, 0, 1);
  if (!q) return;
  piece = q;
  dropAcc = 0;
  addScore(1);
  syncUI();
  draw();
}

/** Sert düşürme: en alta bırakır ve hemen sabitler; hücre başına 2 puan. */
function hardDrop() {
  if (status !== 'playing') return;
  const q = dropped(board, piece);
  addScore((q.y - piece.y) * 2);
  piece = q;
  lockNow();
  syncUI();
  draw();
}

function rotate(dir) {
  if (status !== 'playing') return;
  const q = tryRotate(board, piece, dir);
  if (!q) return;
  piece = q;
  touchedGround();
  draw();
}

function hold() {
  if (status !== 'playing' || !canHold) return;
  const cur = piece.type;
  if (holdType) {
    piece = spawn(holdType);
  } else {
    piece = spawn(queue.shift());
    queue.push(nextType());
  }
  holdType = cur;
  canHold = false;
  dropAcc = 0; lockAcc = 0; resets = 0;
  if (collides(board, piece)) { gameOver(); return; }
  syncUI();
  draw();
}

/** Yere değen parça hareket ederse sabitlenme sayacı sınırlı sayıda sıfırlanır. */
function touchedGround() {
  if (tryMove(board, piece, 0, 1)) { lockAcc = 0; return; }
  if (resets < MAX_RESETS) { lockAcc = 0; resets++; }
}

/* ---------- Döngü ---------- */
function loop(ts) {
  rafId = requestAnimationFrame(loop);
  const dt = Math.min(ts - lastTs, 100);
  lastTs = ts;
  if (status !== 'playing') return;
  const grounded = !tryMove(board, piece, 0, 1);
  if (grounded) {
    dropAcc = 0;
    lockAcc += dt;
    if (lockAcc >= LOCK_DELAY) { lockNow(); syncUI(); }
  } else {
    lockAcc = 0;
    dropAcc += dt;
    if (dropAcc >= dropInterval(level)) {
      dropAcc = 0;
      piece = tryMove(board, piece, 0, 1);
    }
  }
  draw();
}

/* ---------- Çizim ---------- */
function drawCell(c, x, y, size, color, alpha = 1) {
  c.globalAlpha = alpha;
  c.fillStyle = color;
  c.fillRect(x, y, size, size);
  c.fillStyle = 'rgba(255,255,255,.28)';
  c.fillRect(x, y, size, Math.max(2, size * 0.14));
  c.fillRect(x, y, Math.max(2, size * 0.14), size);
  c.fillStyle = 'rgba(0,0,0,.28)';
  c.fillRect(x, y + size - Math.max(2, size * 0.14), size, Math.max(2, size * 0.14));
  c.fillRect(x + size - Math.max(2, size * 0.14), y, Math.max(2, size * 0.14), size);
  c.globalAlpha = 1;
}

function draw() {
  const w = canvas.width; const h = canvas.height;
  ctx.fillStyle = '#14161a';
  ctx.fillRect(0, 0, w, h);
  // Izgara
  ctx.strokeStyle = 'rgba(255,255,255,.06)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let c = 1; c < COLS; c++) { ctx.moveTo(c * cell + .5, 0); ctx.lineTo(c * cell + .5, h); }
  for (let r = 1; r < ROWS; r++) { ctx.moveTo(0, r * cell + .5); ctx.lineTo(w, r * cell + .5); }
  ctx.stroke();
  // Yerleşmiş hücreler
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const t = board[r][c];
      if (t) drawCell(ctx, c * cell, r * cell, cell, COLORS[t]);
    }
  }
  if (piece && status !== 'idle') {
    // Gölge parça: düşeceği yeri gösterir
    const g = dropped(board, piece);
    if (g.y !== piece.y) {
      ctx.strokeStyle = COLORS[piece.type];
      ctx.globalAlpha = 0.75;
      ctx.lineWidth = Math.max(2, cell * 0.08);
      for (const [x, y] of cellsOf(g)) {
        if (y >= 0) ctx.strokeRect(x * cell + 2, y * cell + 2, cell - 4, cell - 4);
      }
      ctx.globalAlpha = 1;
    }
    for (const [x, y] of cellsOf(piece)) {
      if (y >= 0) drawCell(ctx, x * cell, y * cell, cell, COLORS[piece.type]);
    }
  }
  drawMini(holdCv, holdType ? [holdType] : [], !canHold);
  drawMini(nextCv, queue.slice(0, NEXT_COUNT), false);
  syncInfo();
}

/** Küçük önizleme tuvali: parçaları üst üste, ortalayarak çizer. */
function drawMini(cv, types, dim) {
  const c = cv.getContext('2d');
  c.clearRect(0, 0, cv.width, cv.height);
  c.fillStyle = '#14161a';
  c.fillRect(0, 0, cv.width, cv.height);
  const size = 18;
  const slotH = cv.height / Math.max(1, cv === nextCv ? NEXT_COUNT : 1);
  types.forEach((type, i) => {
    const p = spawn(type);
    const cs = cellsOf({ ...p, x: 0, y: 0 });
    const minX = Math.min(...cs.map((v) => v[0])); const maxX = Math.max(...cs.map((v) => v[0]));
    const minY = Math.min(...cs.map((v) => v[1])); const maxY = Math.max(...cs.map((v) => v[1]));
    const pw = (maxX - minX + 1) * size; const ph = (maxY - minY + 1) * size;
    const ox = (cv.width - pw) / 2 - minX * size;
    const oy = i * slotH + (slotH - ph) / 2 - minY * size;
    for (const [x, y] of cs) drawCell(c, ox + x * size, oy + y * size, size, COLORS[type], dim ? 0.35 : 1);
  });
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  const cssW = Math.max(100, Math.round(rect.width));
  canvas.width = Math.round(cssW * dpr / COLS) * COLS;
  canvas.height = canvas.width * 2;
  cell = canvas.width / COLS;
  draw();
}

/* ---------- Arayüz ---------- */
function syncUI() {
  $('bd-score').textContent = String(score);
  $('bd-high').textContent = String(Math.max(high, score));
  $('bd-lines').textContent = String(lines);
  $('bd-level').textContent = String(level);
  pauseBtn.disabled = status !== 'playing' && status !== 'paused';
  pauseBtn.textContent = status === 'paused' ? 'Devam et' : 'Duraklat';
  pauseBtn.setAttribute('aria-pressed', status === 'paused' ? 'true' : 'false');
}

/** Testler ve erişilebilirlik için canvas üzerine durum özellikleri yazar (yalnızca değişince). */
function syncInfo() {
  const cur = piece && status !== 'idle' ? piece : null;
  const rows = board ? board : [];
  const key = [status, cur && cur.type, cur && cur.x, cur && cur.y, cur && cur.rot, holdType, level, lines, score, rows.length ? filledCount(board) : 0].join('|');
  if (key === infoKey) return;
  infoKey = key;
  const d = canvas.dataset;
  d.state = status;
  d.type = cur ? cur.type : '';
  d.x = cur ? String(cur.x) : '';
  d.y = cur ? String(cur.y) : '';
  d.rot = cur ? String(cur.rot) : '';
  d.hold = holdType || '';
  d.next = queue ? queue.slice(0, NEXT_COUNT).join('') : '';
  d.level = String(level || 1);
  d.lines = String(lines || 0);
  d.score = String(score || 0);
  d.filled = String(board ? filledCount(board) : 0);
  d.bottom = String(board ? board[ROWS - 1].filter(Boolean).length : 0);
}

function showOverlay(title, text, btn, focusBtn = false) {
  ovTitle.textContent = title;
  ovText.textContent = text;
  ovBtn.textContent = btn;
  overlay.hidden = false;
  stage.classList.add('is-covered');
  if (focusBtn) ovBtn.focus({ preventScroll: true });
}

function hideOverlay() {
  overlay.hidden = true;
  stage.classList.remove('is-covered');
}

function announce(msg) {
  live.textContent = msg;
}

/* ---------- Klavye ---------- */
const typing = (el) => el && (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA' || el.isContentEditable);

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey || typing(e.target)) return;
  const onButton = e.target && (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.tagName === 'SUMMARY');
  const key = e.key;
  if (status === 'playing') {
    let handled = true;
    if (key === 'ArrowLeft') moveSide(-1);
    else if (key === 'ArrowRight') moveSide(1);
    else if (key === 'ArrowDown') softDrop();
    else if (key === 'ArrowUp' || key === 'x' || key === 'X') { if (!e.repeat) rotate(1); }
    else if (key === 'z' || key === 'Z') { if (!e.repeat) rotate(-1); }
    else if (key === ' ' || key === 'Spacebar') { if (onButton) return; if (!e.repeat) hardDrop(); }
    else if (key === 'c' || key === 'C' || key === 'Shift') { if (!e.repeat) hold(); }
    else if (key === 'p' || key === 'P' || key === 'Escape') { if (!e.repeat) togglePause(); }
    else handled = false;
    if (handled) e.preventDefault();
    return;
  }
  if (status === 'paused' && (key === 'p' || key === 'P' || key === 'Escape')) { e.preventDefault(); resume(); return; }
  if ((status === 'idle' || status === 'over') && key === 'Enter' && !onButton) { e.preventDefault(); start(); }
});

/* ---------- Dokunma: kaydırma, dokunarak döndürme, hızlı aşağı kaydırma ---------- */
let touch = null;
canvas.addEventListener('pointerdown', (e) => {
  if (status !== 'playing') return;
  touch = { x0: e.clientX, y0: e.clientY, t0: performance.now(), lx: e.clientX, ly: e.clientY, moved: false };
  try { canvas.setPointerCapture(e.pointerId); } catch { /* bazı tarayıcılarda gerekmez */ }
});
canvas.addEventListener('pointermove', (e) => {
  if (!touch || status !== 'playing') return;
  const px = canvas.clientWidth / COLS;
  while (e.clientX - touch.lx >= px) { moveSide(1); touch.lx += px; touch.moved = true; }
  while (touch.lx - e.clientX >= px) { moveSide(-1); touch.lx -= px; touch.moved = true; }
  while (e.clientY - touch.ly >= px) { softDrop(); touch.ly += px; touch.moved = true; }
});
function endTouch(e) {
  if (!touch) return;
  const dx = e.clientX - touch.x0; const dy = e.clientY - touch.y0;
  const dt = Math.max(1, performance.now() - touch.t0);
  const t = touch;
  touch = null;
  if (status !== 'playing') return;
  if (!t.moved && Math.hypot(dx, dy) < 12 && dt < 350) rotate(1); // kısa dokunuş: döndür
  else if (dy > 70 && dy / dt > 0.9 && Math.abs(dx) < dy) hardDrop(); // hızlı aşağı fırlatma: sert düşürme
}
canvas.addEventListener('pointerup', endTouch);
canvas.addEventListener('pointercancel', () => { touch = null; });

/* ---------- Ekran düğmeleri (mobil) ---------- */
const ACTIONS = {
  left: () => moveSide(-1),
  right: () => moveSide(1),
  down: () => softDrop(),
  rotate: () => rotate(1),
  drop: () => hardDrop(),
  hold: () => hold(),
};
const REPEATABLE = new Set(['left', 'right', 'down']);
document.querySelectorAll('[data-act]').forEach((btn) => {
  const act = btn.dataset.act;
  let timer = 0; let rep = 0;
  const stop = () => { clearTimeout(timer); clearInterval(rep); timer = 0; rep = 0; };
  btn.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    btn.dataset.fired = '1';
    ACTIONS[act]();
    if (REPEATABLE.has(act)) {
      stop();
      timer = setTimeout(() => { rep = setInterval(ACTIONS[act], 90); }, 220);
    }
  });
  ['pointerup', 'pointerleave', 'pointercancel', 'blur'].forEach((ev) => btn.addEventListener(ev, stop));
  btn.addEventListener('contextmenu', (e) => e.preventDefault());
  // Klavye ile (Enter/Boşluk) etkinleştirme: gerçek bir "click" olayı detail=0 gelir.
  btn.addEventListener('click', (e) => {
    if (btn.dataset.fired === '1' && e.detail !== 0) { btn.dataset.fired = ''; return; }
    if (e.detail === 0) ACTIONS[act]();
  });
});

ovBtn.addEventListener('click', () => {
  if (status === 'paused') resume(); else start();
});
pauseBtn.addEventListener('click', () => { togglePause(); if (status === 'playing') stage.focus({ preventScroll: true }); });
restartBtn.addEventListener('click', () => { cancelAnimationFrame(rafId); start(); });

// Sekme arka plana geçince oyun duraklar.
document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
window.addEventListener('pagehide', () => { if (score >= high && score > 0) saveHigh(); });
new ResizeObserver(() => resizeCanvas()).observe(canvas);

/* ---------- Başlangıç ---------- */
reset();
status = 'idle';
piece = null;
resizeCanvas();
syncUI();
showOverlay('Düşen Bloklar', 'Başlamak için düğmeye ya da Enter tuşuna basın.', 'Başlat');
