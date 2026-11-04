// Balon Vurma — altıgen ızgara üzerinde renkli balon atma oyunu (canvas).
// Sabit adımlı fizik (1/120 sn) + requestAnimationFrame ile çizim. Dış kütüphane ve ağ isteği yok.
// En yüksek skor yalnızca bu tarayıcının localStorage alanında durur.
// Mantıksal alan 360 x 540 birimdir; ekranda CSS ile ölçeklenir.

const W = 360;
const H = 540;
const R = 18; // balon yarıçapı
const ROWH = R * Math.sqrt(3); // altıgen ızgarada sıra yüksekliği
const COLS = 10;
const SX = W / 2; // atıcı konumu
const SY = H - 40;
const LOSE_ROW = 13; // bu sıraya (ve altına) balon yerleşirse oyun biter
const LINE_Y = R + LOSE_ROW * ROWH - R;
const SPEED = 640; // birim/sn
const DT = 1 / 120;
const MAX_AIM = 1.35; // radyan (~77°)
const AIM_SPEED = 1.6; // klavyeyle nişan dönüş hızı (rad/sn)
const DESCENT_EVERY = 6;
const STORE_KEY = 'ba-oyun-balon-vurma';
const COLORS = ['#e5484d', '#3b82f6', '#22a559', '#f5a623', '#9b5de5'];
const COLOR_NAMES = ['kırmızı', 'mavi', 'yeşil', 'sarı', 'mor'];

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
const btnSwap = $('btn-swap');
const btnRestart = $('btn-restart');
const btnFull = $('btn-full');
const elScore = $('score');
const elBest = $('best');
const elLevel = $('level');
const elDescent = $('descent');
const elStatus = $('status');

/* ---------- Kalıcı veri ---------- */

function loadBest() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    const n = raw && Number(raw.best);
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
  } catch (_) {
    return 0; // localStorage kapalı ya da bozuk: oyun yine çalışır
  }
}
let best = loadBest();
function saveBest() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify({ best })); } catch (_) { /* özel gezinme modu */ }
}

/* ---------- Tohumlu rastgelelik ---------- */

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const seedParam = new URLSearchParams(location.search).get('seed');
const fixedSeed = seedParam !== null && /^\d{1,9}$/.test(seedParam);
let baseSeed = fixedSeed ? Number(seedParam) : Math.floor(Math.random() * 1e9);
let rng = mulberry32(baseSeed);

/* ---------- Durum ---------- */

let state = 'hazir'; // hazir | oynuyor | duraklatildi | seviye | bitti
let level = 1;
let score = 0;
let grid = [];
let shift = 0; // sıra paritesi: tavan inince değişir
let shotsLeft = DESCENT_EVERY;
let cur = 0;
let next = 0;
let aim = 0;
let ball = null; // uçan balon
let falling = [];
let fx = [];
let nColors = 4;
let unlockAt = 0;
const keys = { left: false, right: false };

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const emptyRow = () => new Array(COLS).fill(null);
const par = (r) => (r + shift) & 1;
const rowLen = (r) => COLS - par(r);
const cx = (r, c) => R + c * 2 * R + par(r) * R;
const cy = (r) => R + r * ROWH;
const get = (r, c) => (grid[r] && c >= 0 && c < rowLen(r) ? grid[r][c] : null);

/** Altıgen ızgarada bir hücrenin geçerli komşuları. */
function neighbors(r, c) {
  const out = [];
  const add = (a, b) => { if (a >= 0 && a < grid.length && b >= 0 && b < rowLen(a)) out.push([a, b]); };
  add(r, c - 1); add(r, c + 1);
  const d = par(r) ? [c, c + 1] : [c - 1, c];
  for (const b of d) { add(r - 1, b); add(r + 1, b); }
  return out;
}

function bubbleCount() {
  let n = 0;
  for (const row of grid) for (const v of row) if (v != null) n++;
  return n;
}
function presentColors() {
  const set = new Set();
  for (const row of grid) for (const v of row) if (v != null) set.add(v);
  return [...set].sort();
}
function pickColor() {
  const list = presentColors();
  const pool = list.length ? list : [0];
  return pool[Math.floor(rng() * pool.length)];
}
function trim() {
  while (grid.length > 1 && grid[grid.length - 1].every((v) => v == null)) grid.pop();
}

/* ---------- Seviye kurulumu ---------- */

function startLevel(n) {
  level = n;
  rng = mulberry32(baseSeed + n * 7919);
  nColors = Math.min(5, 3 + n);
  shift = 0;
  shotsLeft = DESCENT_EVERY;
  const rows = Math.min(4 + n, 8);
  grid = [];
  for (let r = 0; r < rows; r++) {
    const row = emptyRow();
    for (let c = 0; c < rowLen(r); c++) {
      row[c] = c > 0 && rng() < 0.4 ? row[c - 1] : Math.floor(rng() * nColors);
    }
    grid.push(row);
  }
  ball = null; falling = []; fx = [];
  cur = pickColor();
  next = pickColor();
  aim = 0;
}

function descend() {
  shift += 1;
  const row = emptyRow();
  const list = presentColors();
  const pool = list.length ? list : [0];
  for (let c = 0; c < COLS - par(0); c++) row[c] = pool[Math.floor(rng() * pool.length)];
  grid.unshift(row);
}

/* ---------- Eşleşme, düşme, atış çözümü ---------- */

function cluster(r, c) {
  const color = get(r, c);
  const seen = new Set([r * 100 + c]);
  const stack = [[r, c]];
  const out = [];
  while (stack.length) {
    const [a, b] = stack.pop();
    out.push([a, b]);
    for (const [x, y] of neighbors(a, b)) {
      const k = x * 100 + y;
      if (!seen.has(k) && get(x, y) === color) { seen.add(k); stack.push([x, y]); }
    }
  }
  return out;
}

/** Tavana bağlı olmayan balonları bulur, ızgaradan siler, düşme animasyonuna ekler. */
function dropOrphans() {
  const seen = new Set();
  const stack = [];
  for (let c = 0; c < rowLen(0); c++) if (get(0, c) != null) { seen.add(c); stack.push([0, c]); }
  while (stack.length) {
    const [a, b] = stack.pop();
    for (const [x, y] of neighbors(a, b)) {
      const k = x * 100 + y;
      if (!seen.has(k) && get(x, y) != null) { seen.add(k); stack.push([x, y]); }
    }
  }
  let n = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < rowLen(r); c++) {
      if (grid[r][c] != null && !seen.has(r * 100 + c)) {
        falling.push({ x: cx(r, c), y: cy(r), vy: 0, vx: (rng() - 0.5) * 60, color: grid[r][c] });
        grid[r][c] = null;
        n++;
      }
    }
  }
  return n;
}

/** Bir balonu (r, c) hücresine yerleştirir ve tüm sonuçları (patlama, düşme, tavan, bitiş) işler. */
function resolveShot(r, c, color) {
  while (grid.length <= r) grid.push(emptyRow());
  grid[r][c] = color;
  let popped = 0;
  let fallen = 0;
  const grp = cluster(r, c);
  if (grp.length >= 3) {
    for (const [a, b] of grp) {
      fx.push({ x: cx(a, b), y: cy(a), color, age: 0 });
      grid[a][b] = null;
    }
    popped = grp.length;
    fallen = dropOrphans();
    score += popped * 10 + Math.max(0, popped - 3) * 5 + fallen * 20;
  }
  trim();
  shotsLeft -= 1;
  let cleared = false;
  if (bubbleCount() === 0) {
    cleared = true;
  } else if (shotsLeft <= 0) {
    descend();
    shotsLeft = DESCENT_EVERY;
  }
  if (score > best) { best = score; saveBest(); }
  const present = presentColors();
  if (present.length) {
    if (!present.includes(cur)) cur = pickColor();
    if (!present.includes(next)) next = pickColor();
  }
  if (cleared) {
    score += 100 * level;
    if (score > best) { best = score; saveBest(); }
    state = 'seviye';
    unlockAt = performance.now() + 500;
  } else if (grid.some((row, i) => i >= LOSE_ROW && row.some((v) => v != null))) {
    state = 'bitti';
    unlockAt = performance.now() + 700;
  }
  refresh();
  return { popped, fallen, cleared, over: state === 'bitti', score };
}

/* ---------- Uçuş ---------- */

function hitsBubble(x, y) {
  const lim = (2 * R - 3) * (2 * R - 3);
  const rMid = Math.round((y - R) / ROWH);
  for (let r = Math.max(0, rMid - 2); r <= Math.min(grid.length - 1, rMid + 2); r++) {
    for (let c = 0; c < rowLen(r); c++) {
      if (grid[r][c] == null) continue;
      const dx = cx(r, c) - x;
      const dy = cy(r) - y;
      if (dx * dx + dy * dy < lim) return true;
    }
  }
  return false;
}
const attached = (r, c) => r === 0 || neighbors(r, c).some(([a, b]) => get(a, b) != null);

function snapCell(x, y) {
  const rMid = Math.round((y - R) / ROWH);
  let bestD = Infinity;
  let pick = null;
  for (let r = Math.max(0, rMid - 2); r <= rMid + 2; r++) {
    for (let c = 0; c < rowLen(r); c++) {
      if (get(r, c) != null || !attached(r, c)) continue;
      const d = (cx(r, c) - x) ** 2 + (cy(r) - y) ** 2;
      if (d < bestD) { bestD = d; pick = [r, c]; }
    }
  }
  return pick || [Math.max(0, rMid), 0];
}

function stepBall() {
  if (!ball) return;
  ball.x += ball.vx * DT;
  ball.y += ball.vy * DT;
  if (ball.x < R) { ball.x = R; ball.vx = Math.abs(ball.vx); }
  else if (ball.x > W - R) { ball.x = W - R; ball.vx = -Math.abs(ball.vx); }
  if (ball.y <= R || hitsBubble(ball.x, ball.y)) {
    const [r, c] = snapCell(ball.x, Math.max(ball.y, R));
    const color = ball.color;
    ball = null;
    resolveShot(r, c, color);
  }
}

function fire() {
  if (state !== 'oynuyor' || ball) return false;
  ball = { x: SX, y: SY, vx: Math.sin(aim) * SPEED, vy: -Math.cos(aim) * SPEED, color: cur };
  cur = next;
  next = pickColor();
  refresh();
  return true;
}

function swapBalls() {
  if (state !== 'oynuyor') return;
  [cur, next] = [next, cur];
  refresh();
}

/** Nişan çizgisinin noktaları: duvardan sekmeleri de izler. */
function aimPoints() {
  const pts = [];
  let x = SX;
  let y = SY;
  let vx = Math.sin(aim);
  let vy = -Math.cos(aim);
  const step = 4;
  for (let i = 0; i < 260; i++) {
    x += vx * step; y += vy * step;
    if (x < R) { x = R; vx = Math.abs(vx); }
    else if (x > W - R) { x = W - R; vx = -Math.abs(vx); }
    if (y <= R || hitsBubble(x, y)) break;
    if (i % 3 === 0) pts.push([x, y]);
  }
  return pts;
}

/* ---------- Çizim ---------- */

function drawGlyph(color, x, y) {
  ctx.fillStyle = 'rgba(255,255,255,.9)';
  ctx.strokeStyle = 'rgba(255,255,255,.9)';
  ctx.lineWidth = 2;
  const s = 5;
  ctx.beginPath();
  switch (color) {
    case 0: ctx.arc(x, y, 3.2, 0, Math.PI * 2); ctx.fill(); break;
    case 1: ctx.rect(x - 3.5, y - 3.5, 7, 7); ctx.fill(); break;
    case 2: ctx.moveTo(x, y - s); ctx.lineTo(x + s, y + s * 0.8); ctx.lineTo(x - s, y + s * 0.8); ctx.closePath(); ctx.fill(); break;
    case 3: ctx.moveTo(x, y - s); ctx.lineTo(x + s, y); ctx.lineTo(x, y + s); ctx.lineTo(x - s, y); ctx.closePath(); ctx.fill(); break;
    default: ctx.moveTo(x - s, y); ctx.lineTo(x + s, y); ctx.moveTo(x, y - s); ctx.lineTo(x, y + s); ctx.stroke();
  }
}
function drawBubble(x, y, color, r = R, alpha = 1) {
  ctx.globalAlpha = alpha;
  const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.1, x, y, r);
  g.addColorStop(0, '#ffffff');
  g.addColorStop(0.25, COLORS[color]);
  g.addColorStop(1, COLORS[color]);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r - 1, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,.35)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  if (r >= 12) drawGlyph(color, x + r * 0.05, y + r * 0.1);
  ctx.globalAlpha = 1;
}

function draw() {
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#24272c');
  bg.addColorStop(1, '#1a1c1f');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  // Kaybetme çizgisi
  ctx.strokeStyle = 'rgba(232,160,179,.5)';
  ctx.setLineDash([6, 6]);
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, LINE_Y); ctx.lineTo(W, LINE_Y); ctx.stroke();
  ctx.setLineDash([]);
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < rowLen(r); c++) if (grid[r][c] != null) drawBubble(cx(r, c), cy(r), grid[r][c]);
  }
  for (const f of falling) drawBubble(f.x, f.y, f.color);
  for (const f of fx) {
    const t = f.age / 0.3;
    ctx.strokeStyle = COLORS[f.color];
    ctx.globalAlpha = 1 - t;
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(f.x, f.y, R * (0.8 + t * 0.9), 0, Math.PI * 2); ctx.stroke();
    ctx.globalAlpha = 1;
  }
  if (state === 'oynuyor' && !ball) {
    ctx.fillStyle = 'rgba(255,255,255,.55)';
    for (const [x, y] of aimPoints()) { ctx.beginPath(); ctx.arc(x, y, 2.2, 0, Math.PI * 2); ctx.fill(); }
  }
  // Atıcı
  ctx.save();
  ctx.translate(SX, SY);
  ctx.rotate(aim);
  ctx.fillStyle = '#4a4d52';
  ctx.fillRect(-5, -R - 16, 10, 22);
  ctx.restore();
  ctx.fillStyle = '#3a3d42';
  ctx.beginPath(); ctx.arc(SX, SY, R + 6, 0, Math.PI * 2); ctx.fill();
  drawBubble(SX, SY, cur);
  // Sıradaki balon
  ctx.fillStyle = '#d7d8db';
  ctx.font = '600 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Sıradaki', 48, H - 18);
  drawBubble(48, H - 42, next, 13);
  if (ball) drawBubble(ball.x, ball.y, ball.color);
}

/* ---------- HUD, katman, durum ---------- */

function announce(msg) { elStatus.textContent = msg; }

function refresh() {
  elScore.textContent = String(score);
  elBest.textContent = String(best);
  elLevel.textContent = String(level);
  elDescent.textContent = String(shotsLeft);
  stage.dataset.state = state;
  stage.dataset.score = String(score);
  stage.dataset.best = String(best);
  stage.dataset.level = String(level);
  stage.dataset.shotsLeft = String(shotsLeft);
  stage.dataset.bubbles = String(bubbleCount());
  stage.dataset.rows = String(grid.length);
  stage.dataset.flying = ball ? '1' : '0';
  stage.dataset.seed = String(baseSeed);
  stage.dataset.cur = String(cur);
  stage.dataset.next = String(next);
  stage.dataset.aim = (aim * 180 / Math.PI).toFixed(1);
  btnMain.textContent = state === 'oynuyor' ? 'Duraklat' : state === 'duraklatildi' ? 'Devam et' : state === 'seviye' ? 'Sonraki seviye' : state === 'bitti' ? 'Yeniden oyna' : 'Başlat';
  btnSwap.disabled = state !== 'oynuyor';
  const show = state !== 'oynuyor';
  overlay.hidden = !show;
  if (state === 'hazir') {
    overlayTitle.textContent = 'Balon Vurma';
    overlayText.textContent = 'Aynı renkten 3 balonu patlatın. Başlat düğmesine basın.';
    overlayBtn.textContent = 'Başlat';
  } else if (state === 'duraklatildi') {
    overlayTitle.textContent = 'Duraklatıldı';
    overlayText.textContent = 'Devam etmek için düğmeye ya da P tuşuna basın.';
    overlayBtn.textContent = 'Devam et';
  } else if (state === 'seviye') {
    overlayTitle.textContent = `Seviye ${level} tamamlandı`;
    overlayText.textContent = `Skor: ${score}. Sıradaki dizilim daha kalabalık.`;
    overlayBtn.textContent = 'Sonraki seviye';
  } else if (state === 'bitti') {
    overlayTitle.textContent = 'Oyun bitti';
    overlayText.textContent = `Skor: ${score} · En yüksek: ${best}`;
    overlayBtn.textContent = 'Yeniden oyna';
  }
}

function newGame() {
  if (!fixedSeed) baseSeed = Math.floor(Math.random() * 1e9);
  score = 0;
  startLevel(1);
  state = 'oynuyor';
  refresh();
  announce('Oyun başladı.');
  stage.focus({ preventScroll: true });
}
function pauseGame() {
  if (state !== 'oynuyor') return;
  state = 'duraklatildi';
  refresh();
  announce('Duraklatıldı.');
}
function resumeGame() {
  if (state !== 'duraklatildi') return;
  state = 'oynuyor';
  refresh();
  stage.focus({ preventScroll: true });
}
function primaryAction() {
  if (performance.now() < unlockAt) return;
  if (state === 'hazir' || state === 'bitti') newGame();
  else if (state === 'seviye') { startLevel(level + 1); state = 'oynuyor'; refresh(); stage.focus({ preventScroll: true }); }
  else if (state === 'oynuyor') pauseGame();
  else resumeGame();
}

/* ---------- Döngü ---------- */

let last = 0;
let acc = 0;
function frame(t) {
  requestAnimationFrame(frame);
  const dt = Math.min(0.1, (t - last) / 1000 || 0);
  last = t;
  if (state === 'oynuyor') {
    acc += dt;
    while (acc >= DT) {
      acc -= DT;
      if (keys.left) aim -= AIM_SPEED * DT;
      if (keys.right) aim += AIM_SPEED * DT;
      aim = clamp(aim, -MAX_AIM, MAX_AIM);
      stepBall();
      if (state !== 'oynuyor') break;
    }
    stage.dataset.aim = (aim * 180 / Math.PI).toFixed(1);
    stage.dataset.flying = ball ? '1' : '0';
  }
  // Animasyonlar durum ne olursa olsun akar (seviye/bitiş ekranında düşen balonlar tamamlanır)
  for (const f of falling) { f.vy += 900 * dt; f.y += f.vy * dt; f.x += f.vx * dt; }
  falling = falling.filter((f) => f.y < H + R);
  for (const f of fx) f.age += dt;
  fx = fx.filter((f) => f.age < 0.3);
  draw();
}

/* ---------- Girdiler ---------- */

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const k = e.key;
  const onGame = e.target === document.body || e.target === stage;
  if (!onGame) return;
  if (k === 'ArrowLeft' || k === 'a' || k === 'A') { keys.left = true; if (state === 'oynuyor') e.preventDefault(); }
  else if (k === 'ArrowRight' || k === 'd' || k === 'D') { keys.right = true; if (state === 'oynuyor') e.preventDefault(); }
  else if (k === ' ' || k === 'ArrowUp' || k === 'Enter') {
    if (state === 'oynuyor') { e.preventDefault(); if (!e.repeat) fire(); }
  } else if (k === 'ArrowDown' || k === 'x' || k === 'X') {
    if (state === 'oynuyor') { e.preventDefault(); swapBalls(); }
  } else if (k === 'p' || k === 'P') {
    if (state === 'oynuyor') pauseGame(); else if (state === 'duraklatildi') resumeGame();
  }
});
document.addEventListener('keyup', (e) => {
  const k = e.key;
  if (k === 'ArrowLeft' || k === 'a' || k === 'A') keys.left = false;
  else if (k === 'ArrowRight' || k === 'd' || k === 'D') keys.right = false;
});
window.addEventListener('blur', () => { keys.left = false; keys.right = false; });

function aimAt(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const px = ((clientX - rect.left) / Math.max(1, rect.width)) * W;
  const py = ((clientY - rect.top) / Math.max(1, rect.height)) * H;
  const dy = Math.max(10, SY - py); // atıcının altındaki noktalar yatay sayılmasın
  aim = clamp(Math.atan2(px - SX, dy), -MAX_AIM, MAX_AIM);
  stage.dataset.aim = (aim * 180 / Math.PI).toFixed(1);
}
let pressId = null;
stage.addEventListener('pointerdown', (e) => {
  if (state !== 'oynuyor') return;
  if (e.target instanceof Element && e.target.closest('button')) return;
  if (e.pointerType === 'mouse' && e.button !== 0) return;
  pressId = e.pointerId;
  if (e.pointerType !== 'mouse') { try { stage.setPointerCapture(e.pointerId); } catch (_) { /* yapay olay */ } }
  aimAt(e.clientX, e.clientY);
});
stage.addEventListener('pointermove', (e) => {
  if (state !== 'oynuyor') return;
  if (e.pointerType === 'mouse' || pressId === e.pointerId) aimAt(e.clientX, e.clientY);
});
stage.addEventListener('pointerup', (e) => {
  if (pressId !== e.pointerId) return;
  pressId = null;
  if (state !== 'oynuyor') return;
  aimAt(e.clientX, e.clientY);
  fire();
});
stage.addEventListener('pointercancel', () => { pressId = null; });

/* ---------- Düğmeler, tam ekran ---------- */

btnMain.addEventListener('click', primaryAction);
overlayBtn.addEventListener('click', primaryAction);
btnSwap.addEventListener('click', swapBalls);
btnRestart.addEventListener('click', () => { unlockAt = 0; newGame(); });

document.addEventListener('visibilitychange', () => { if (document.hidden) pauseGame(); });
window.addEventListener('pagehide', saveBest);

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

function fit() {
  const rect = stage.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const cw = Math.max(1, Math.round(rect.width * dpr));
  canvas.width = cw;
  canvas.height = Math.round((cw * H) / W);
  ctx.setTransform(canvas.width / W, 0, 0, canvas.width / W, 0, 0);
  draw();
}

/* ---------- Test kancası ---------- */

// Testlerin fizik beklemeden mantığı doğrulayabilmesi için; oyun davranışını değiştirmez.
window.__balonVurmaTest = () => ({
  snapshot() {
    return {
      state, score, best, level, shotsLeft, cur, next, shift, seed: baseSeed,
      bubbles: bubbleCount(), rows: grid.length, flying: !!ball,
      grid: grid.map((row, r) => row.slice(0, rowLen(r)).map((v) => (v == null ? '.' : String(v))).join('')),
    };
  },
  /** Izgarayı metin satırlarından kurar: '.' boş, '0'-'4' renk. Sıra 0 çift paritelidir (10 hücre). */
  setGrid(rows) {
    shift = 0;
    grid = rows.map((s, r) => {
      const row = emptyRow();
      for (let c = 0; c < rowLen(r); c++) { const ch = s[c]; row[c] = ch && ch >= '0' && ch <= '4' ? Number(ch) : null; }
      return row;
    });
    if (!grid.length) grid = [emptyRow()];
    ball = null; falling = []; fx = [];
    refresh();
  },
  setShot(c, n) { cur = c; next = n; refresh(); },
  /** Fizik olmadan: balonu doğrudan (r, c) hücresine yerleştirip sonucu çözer. */
  drop(r, c, color) { return resolveShot(r, c, color); },
  /** Nişan açısını derece olarak ayarlayıp fırlatır. */
  fire(deg) { aim = clamp((deg * Math.PI) / 180, -MAX_AIM, MAX_AIM); return fire(); },
  cellX: cx,
  cellY: cy,
});

/* ---------- Başlangıç ---------- */

startLevel(1);
refresh();
if ('ResizeObserver' in window) new ResizeObserver(fit).observe(stage);
window.addEventListener('resize', fit);
fit();
requestAnimationFrame(frame);
