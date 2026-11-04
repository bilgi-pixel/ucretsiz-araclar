// Araba Yarışı — 3 şeritli dikey kaçış oyunu. Canvas, sabit adımlı fizik (1/60 sn), requestAnimationFrame.
// Ses yok, dış kütüphane ve ağ isteği yok. Rekor ve ayarlar yalnızca bu tarayıcının localStorage alanında durur.

const W = 360;
const H = 540;
const ROAD_L = 30;
const LANE_W = 100;
const LANES = 3;
const LANE_X = [0, 1, 2].map((i) => ROAD_L + LANE_W * i + LANE_W / 2);
const PLAYER_Y = 450;
const PLAYER_W = 44;
const PLAYER_H = 78;
const STEP = 1 / 60;
const PX_PER_M = 18; // 18 piksel = 1 metre
const STORE_KEY = 'ba-oyun-araba-yarisi';
const STAR_POINTS = 25;
const SWIPE_MIN_PX = 24;

// v0: başlangıç hızı, vmax: tavan, accel: px/sn² artış, gap: yeni sıra aralığı çarpanı, dbl: iki şerit kapanma olasılığı tavanı
const DIFF = {
  easy: { v0: 240, vmax: 480, accel: 4, gap: 1.25, dbl: 0 },
  normal: { v0: 280, vmax: 620, accel: 5.5, gap: 1, dbl: 0.4 },
  hard: { v0: 320, vmax: 720, accel: 7, gap: 0.85, dbl: 0.55 },
};
const KIND = {
  car: { w: 44, h: 78, factor: 1.25 }, // karşı yönden gelen araç biraz daha hızlı yaklaşır
  cone: { w: 32, h: 36, factor: 1 },
  barrier: { w: 78, h: 24, factor: 1 },
  star: { w: 30, h: 30, factor: 1 },
};
const CAR_COLORS = ['#2f8fb5', '#e0b030', '#d9d9d9', '#4a9a5b', '#8f5fc0'];

const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

const $ = (id) => document.getElementById(id);
const box = $('game-box');
const stage = $('stage');
const canvas = $('road');
const ctx = canvas.getContext('2d');
const overlay = $('overlay');
const ovTitle = $('overlay-title');
const ovText = $('overlay-text');
const ovBtn = $('overlay-btn');
const btnMain = $('btn-main');
const btnRestart = $('btn-restart');
const btnFull = $('btn-full');
const btnNight = $('btn-night');
const selDiff = $('opt-diff');
const elScore = $('hud-score');
const elDist = $('hud-dist');
const elSpeed = $('hud-speed');
const elBest = $('hud-best');
const elStatus = $('status');

/* ---------- Kalıcı veri ---------- */

const toInt = (v) => (Number.isFinite(v) && v > 0 ? Math.floor(v) : 0);
function loadStore() {
  const def = { best: { easy: 0, normal: 0, hard: 0 }, diff: 'normal', night: false };
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (!raw || typeof raw !== 'object') return def;
    const b = raw.best && typeof raw.best === 'object' ? raw.best : {};
    return {
      best: { easy: toInt(b.easy), normal: toInt(b.normal), hard: toInt(b.hard) },
      diff: typeof raw.diff === 'string' && Object.hasOwn(DIFF, raw.diff) ? raw.diff : 'normal',
      night: raw.night === true,
    };
  } catch (_) {
    return def; // localStorage kapalı ya da bozuk
  }
}
const store = loadStore();
function saveStore() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (_) { /* özel gezinme */ }
}

/* ---------- Durum ---------- */

let state = 'hazir'; // hazir | oynuyor | duraklatildi | bitti
let cfg = DIFF[store.diff];
let diffName = store.diff;
let night = store.night;
let lane = 1; // hedef şerit
let px = LANE_X[1]; // arabanın çizilen x konumu
let speed = cfg.v0;
let distPx = 0;
let stars = 0;
let objects = [];
let spawnIn = 1.6;
let prevFree = [1];
let rowCount = 0;
let bestAtStart = 0;
let frozen = 0; // 0: kapalı; >0: sabit hız ve kendiliğinden engel yok (yalnızca test kancası)
let crash = null;
let unlockAt = 0;
let roadOff = 0;
let treeOff = 0;

const meters = () => Math.floor(distPx / PX_PER_M);
const scoreNow = () => meters() + stars * STAR_POINTS;
const bestNow = () => store.best[diffName] || 0;

function resetGame() {
  cfg = DIFF[diffName];
  lane = 1; px = LANE_X[1];
  speed = cfg.v0; distPx = 0; stars = 0;
  objects = []; spawnIn = 1.6; prevFree = [1]; rowCount = 0;
  frozen = 0; crash = null; roadOff = 0; treeOff = 0;
  bestAtStart = bestNow();
}

/* ---------- Engel üretimi ---------- */

function makeObject(kind, ln, y) {
  const k = KIND[kind];
  return { kind, lane: ln, x: LANE_X[ln], y, w: k.w, h: k.h, color: CAR_COLORS[Math.floor(Math.random() * CAR_COLORS.length)] };
}

// Her sıra en az bir şerit açık bırakır; açık şerit bir önceki sıradaki açık şeride en çok 1 şerit uzaktadır.
function spawnRow() {
  const dblP = Math.min(cfg.dbl, distPx / PX_PER_M / 2500);
  const blockN = Math.random() < dblP ? 2 : 1;
  let blocked = null;
  for (let t = 0; t < 14 && !blocked; t++) {
    const set = [];
    while (set.length < blockN) {
      const l = Math.floor(Math.random() * LANES);
      if (!set.includes(l)) set.push(l);
    }
    const free = [0, 1, 2].filter((l) => !set.includes(l));
    if (free.some((a) => prevFree.some((p) => Math.abs(a - p) <= 1))) blocked = set;
  }
  if (!blocked) blocked = [prevFree[0] === 1 ? 0 : 1];
  const free = [0, 1, 2].filter((l) => !blocked.includes(l));
  prevFree = free;
  for (const l of blocked) {
    const r = Math.random();
    objects.push(makeObject(r < 0.6 ? 'car' : r < 0.8 ? 'barrier' : 'cone', l, -60));
  }
  rowCount += 1;
  if (Math.random() < 0.35) objects.push(makeObject('star', free[Math.floor(Math.random() * free.length)], -60));
}

/* ---------- Fizik (sabit adım) ---------- */

function step() {
  const dt = STEP;
  if (frozen) speed = frozen;
  else speed = Math.min(cfg.vmax, speed + cfg.accel * dt);
  distPx += speed * dt;
  roadOff = (roadOff + speed * dt) % 60;
  treeOff = (treeOff + speed * dt) % 90;

  // Şerit değiştirme: yumuşak kayma (hareketi azalt açıksa anında)
  const tx = LANE_X[lane];
  if (reduceMotion || Math.abs(tx - px) < 0.5) px = tx;
  else px += (tx - px) * Math.min(1, 14 * dt);

  for (const o of objects) o.y += speed * KIND[o.kind].factor * dt;

  // Çarpışma ve bonus toplama
  const pl = px - PLAYER_W / 2 + 5, pr = px + PLAYER_W / 2 - 5;
  const pt = PLAYER_Y - PLAYER_H / 2 + 6, pb = PLAYER_Y + PLAYER_H / 2 - 6;
  for (let i = objects.length - 1; i >= 0; i--) {
    const o = objects[i];
    const shrink = o.kind === 'star' ? 0 : 3;
    const hit = pr > o.x - o.w / 2 + shrink && pl < o.x + o.w / 2 - shrink && pb > o.y - o.h / 2 + shrink && pt < o.y + o.h / 2 - shrink;
    if (!hit) continue;
    if (o.kind === 'star') { stars += 1; objects.splice(i, 1); } else { crash = { x: o.x, y: o.y }; endGame('Çarpıştın!'); return; }
  }
  objects = objects.filter((o) => o.y < H + 80);

  if (!frozen) {
    spawnIn -= dt;
    if (spawnIn <= 0) {
      spawnRow();
      spawnIn = Math.max(0.6, 1.25 - 0.0012 * (speed - 280)) * cfg.gap;
    }
  }
}

/* ---------- Çizim ---------- */

let cssW = 0;
let cssH = 0;
function fit() {
  const rect = canvas.getBoundingClientRect();
  cssW = Math.max(1, Math.round(rect.width));
  cssH = Math.max(1, Math.round(rect.height));
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  const pw = Math.round(cssW * dpr);
  const ph = Math.round(cssH * dpr);
  if (canvas.width !== pw || canvas.height !== ph) { canvas.width = pw; canvas.height = ph; }
  draw();
}

function rr(x, y, w, h, r) {
  const q = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + q, y);
  ctx.arcTo(x + w, y, x + w, y + h, q);
  ctx.arcTo(x + w, y + h, x, y + h, q);
  ctx.arcTo(x, y + h, x, y, q);
  ctx.arcTo(x, y, x + w, y, q);
  ctx.closePath();
}

// facingDown: karşı yönden gelen araç (ön kısmı aşağıda)
function drawCar(cx, cy, w, h, color, facingDown) {
  ctx.save();
  ctx.translate(cx, cy);
  if (facingDown) ctx.scale(1, -1);
  const x = -w / 2, y = -h / 2;
  ctx.fillStyle = '#15171b';
  for (const wy of [y + h * 0.14, y + h * 0.62]) {
    ctx.fillRect(x - 3, wy, 6, h * 0.24);
    ctx.fillRect(x + w - 3, wy, 6, h * 0.24);
  }
  ctx.fillStyle = color;
  rr(x, y, w, h, 9); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.18)';
  rr(x + w * 0.2, y + h * 0.04, w * 0.6, h * 0.1, 3); ctx.fill();
  ctx.fillStyle = '#1d2a36'; // ön cam
  rr(x + w * 0.14, y + h * 0.2, w * 0.72, h * 0.22, 4); ctx.fill();
  ctx.fillStyle = '#26394a'; // arka cam
  rr(x + w * 0.16, y + h * 0.66, w * 0.68, h * 0.14, 3); ctx.fill();
  ctx.fillStyle = 'rgba(0,0,0,.14)'; // tavan
  rr(x + w * 0.16, y + h * 0.44, w * 0.68, h * 0.2, 3); ctx.fill();
  ctx.fillStyle = '#fff7c2'; // farlar (ön)
  ctx.fillRect(x + 4, y + 1, 9, 4); ctx.fillRect(x + w - 13, y + 1, 9, 4);
  ctx.fillStyle = '#ff4a4a'; // stop lambaları (arka)
  ctx.fillRect(x + 4, y + h - 5, 9, 4); ctx.fillRect(x + w - 13, y + h - 5, 9, 4);
  ctx.restore();
}

function drawStar(cx, cy, r) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rad = i % 2 ? r * 0.45 : r;
    ctx.lineTo(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad);
  }
  ctx.closePath();
  ctx.fillStyle = '#ffd23f'; ctx.fill();
  ctx.lineWidth = 2; ctx.strokeStyle = '#8a5d00'; ctx.stroke();
}

function drawObject(o) {
  if (o.kind === 'car') {
    drawCar(o.x, o.y, o.w, o.h, o.color, true);
  } else if (o.kind === 'cone') {
    ctx.fillStyle = '#ff7a1a';
    ctx.beginPath(); ctx.moveTo(o.x, o.y - o.h / 2); ctx.lineTo(o.x + o.w / 2, o.y + o.h / 2 - 5); ctx.lineTo(o.x - o.w / 2, o.y + o.h / 2 - 5); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.fillRect(o.x - 8, o.y - 2, 16, 5);
    ctx.fillStyle = '#c85a00'; ctx.fillRect(o.x - o.w / 2 - 2, o.y + o.h / 2 - 6, o.w + 4, 6);
  } else if (o.kind === 'barrier') {
    ctx.fillStyle = '#fff'; rr(o.x - o.w / 2, o.y - o.h / 2, o.w, o.h, 4); ctx.fill();
    ctx.save(); rr(o.x - o.w / 2, o.y - o.h / 2, o.w, o.h, 4); ctx.clip();
    ctx.fillStyle = '#d6322e';
    for (let sx = o.x - o.w / 2 - 20; sx < o.x + o.w / 2; sx += 22) {
      ctx.beginPath(); ctx.moveTo(sx, o.y + o.h / 2); ctx.lineTo(sx + 10, o.y + o.h / 2); ctx.lineTo(sx + 22, o.y - o.h / 2); ctx.lineTo(sx + 12, o.y - o.h / 2); ctx.closePath(); ctx.fill();
    }
    ctx.restore();
  } else {
    drawStar(o.x, o.y, 15);
  }
}

function draw() {
  if (!cssW) return;
  ctx.setTransform(canvas.width / W, 0, 0, canvas.height / H, 0, 0);
  const P = night
    ? { grass: '#15301f', road: '#1e2026', dash: '#9a9ca3', edge: '#d8b84a', tree: '#0d2a17', trunk: '#2a1d12' }
    : { grass: '#5b8c4a', road: '#4a4d55', dash: '#ececec', edge: '#ffffff', tree: '#2f6b3a', trunk: '#6b4a2f' };
  ctx.fillStyle = P.grass; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = P.road; ctx.fillRect(ROAD_L, 0, LANE_W * LANES, H);
  ctx.fillStyle = P.edge;
  ctx.fillRect(ROAD_L - 3, 0, 3, H); ctx.fillRect(ROAD_L + LANE_W * LANES, 0, 3, H);
  ctx.fillStyle = P.dash;
  for (let i = 1; i < LANES; i++) {
    for (let y = -60 + roadOff; y < H; y += 60) ctx.fillRect(ROAD_L + LANE_W * i - 2, y, 4, 30);
  }
  // Yol kenarı ağaçları
  for (let y = -90 + treeOff; y < H + 20; y += 90) {
    for (const tx of [14, W - 14]) {
      ctx.fillStyle = P.trunk; ctx.fillRect(tx - 2, y + 8, 4, 10);
      ctx.fillStyle = P.tree; ctx.beginPath(); ctx.arc(tx, y, 12, 0, Math.PI * 2); ctx.fill();
    }
  }
  // Gece: far ışık huzmeleri
  if (night) {
    const g = ctx.createLinearGradient(0, PLAYER_Y - 40, 0, PLAYER_Y - 230);
    g.addColorStop(0, 'rgba(255,247,194,.35)'); g.addColorStop(1, 'rgba(255,247,194,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(px - 18, PLAYER_Y - 40); ctx.lineTo(px + 18, PLAYER_Y - 40); ctx.lineTo(px + 56, PLAYER_Y - 230); ctx.lineTo(px - 56, PLAYER_Y - 230); ctx.closePath(); ctx.fill();
  }
  for (const o of objects) drawObject(o);
  drawCar(px, PLAYER_Y, PLAYER_W, PLAYER_H, '#c0394f', false);
  if (crash) {
    ctx.strokeStyle = '#ffd23f'; ctx.lineWidth = 4;
    for (let i = 0; i < 10; i++) {
      const a = (i * Math.PI) / 5;
      ctx.beginPath(); ctx.moveTo(crash.x + Math.cos(a) * 16, crash.y + Math.sin(a) * 16); ctx.lineTo(crash.x + Math.cos(a) * 34, crash.y + Math.sin(a) * 34); ctx.stroke();
    }
    ctx.fillStyle = 'rgba(214,50,46,.25)'; ctx.fillRect(0, 0, W, H);
  }
}

/* ---------- Döngü ---------- */

let rafId = 0;
let lastTs = 0;
let acc = 0;
function frame(ts) {
  rafId = 0;
  if (state !== 'oynuyor') return;
  acc += Math.min(Math.max(ts - lastTs, 0), 250) / 1000;
  lastTs = ts;
  let guard = 0;
  while (state === 'oynuyor' && acc >= STEP && guard++ < 10) { acc -= STEP; step(); }
  draw();
  sync();
  if (state === 'oynuyor') rafId = requestAnimationFrame(frame);
}
function startLoop() {
  lastTs = performance.now(); acc = 0;
  if (!rafId) rafId = requestAnimationFrame(frame);
}
function stopLoop() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = 0;
}

/* ---------- Durum geçişleri ---------- */

const announce = (m) => { elStatus.textContent = m; };

function showOverlay(title, text, label, focus, lockMs = 0) {
  ovTitle.textContent = title; ovText.textContent = text; ovBtn.textContent = label;
  overlay.hidden = false;
  unlockAt = performance.now() + lockMs;
  ovBtn.disabled = lockMs > 0;
  if (lockMs > 0) {
    setTimeout(() => {
      ovBtn.disabled = false;
      if (focus && !overlay.hidden && state === 'bitti') ovBtn.focus({ preventScroll: true });
    }, lockMs);
  } else if (focus) ovBtn.focus({ preventScroll: true });
}

function toReady() {
  stopLoop();
  resetGame();
  state = 'hazir';
  selDiff.disabled = false;
  showOverlay('Araba Yarışı', 'Başlat düğmesine basın ya da yolun üzerinde bir ok tuşuna basın. Sol ve sağ ok tuşları, A ve D ya da parmak kaydırmasıyla şerit değiştirin.', 'Başlat', false);
  draw(); sync();
}
function startGame() {
  resetGame();
  state = 'oynuyor';
  overlay.hidden = true;
  selDiff.disabled = true;
  announce('Yarış başladı.');
  draw(); sync(); startLoop();
  stage.focus({ preventScroll: true });
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
  overlay.hidden = true;
  announce('Oyun devam ediyor.');
  sync(); startLoop();
  stage.focus({ preventScroll: true });
}
function endGame(reason) {
  stopLoop();
  state = 'bitti';
  selDiff.disabled = false;
  const sc = scoreNow();
  const record = sc > bestAtStart;
  if (sc > bestNow()) { store.best[diffName] = sc; }
  saveStore();
  const text = `${reason} Skor: ${sc} · Mesafe: ${meters()} m · En yüksek: ${bestNow()}.${record && sc > 0 ? ' Yeni rekor!' : ''}`;
  showOverlay('Oyun bitti', text, 'Tekrar oyna', true, 500);
  announce(text);
  draw(); sync();
}
function primaryAction() {
  if (state === 'bitti' && performance.now() < unlockAt) return;
  if (state === 'hazir' || state === 'bitti') startGame();
  else if (state === 'oynuyor') pauseGame();
  else if (state === 'duraklatildi') resumeGame();
}

/* ---------- Ekran bilgileri ---------- */

const lastData = {};
function setData(k, v) { const s = String(v); if (lastData[k] !== s) { lastData[k] = s; stage.dataset[k] = s; } }
function sync() {
  const sc = scoreNow();
  setData('state', state); setData('lane', lane); setData('score', sc);
  setData('dist', meters()); setData('speed', Math.round(speed / 5)); setData('night', night); setData('diff', diffName);
  elScore.textContent = String(sc);
  elDist.textContent = `${meters()} m`;
  elSpeed.textContent = `${Math.round(speed / 5)} km/s`;
  elBest.textContent = String(Math.max(bestNow(), sc));
  btnMain.textContent = { hazir: 'Başlat', oynuyor: 'Duraklat', duraklatildi: 'Devam et', bitti: 'Tekrar oyna' }[state];
}

/* ---------- Girdiler ---------- */

function changeLane(dir) {
  if (state === 'hazir') startGame();
  if (state !== 'oynuyor') return;
  lane = Math.min(LANES - 1, Math.max(0, lane + dir));
  sync();
}
const isInBox = (el) => el instanceof Node && box.contains(el);

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const t = e.target;
  if (t instanceof Element && t.closest('select, input, textarea, [contenteditable="true"]')) return;
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  const dir = key === 'ArrowLeft' || key === 'a' ? -1 : key === 'ArrowRight' || key === 'd' ? 1 : 0;
  if (dir) {
    if (state === 'oynuyor') { changeLane(dir); e.preventDefault(); }
    else if (state === 'hazir' && isInBox(t)) { changeLane(dir); e.preventDefault(); }
    return;
  }
  if ((key === 'ArrowUp' || key === 'ArrowDown') && state === 'oynuyor') { e.preventDefault(); return; }
  if (key === 'p') {
    if (state === 'oynuyor') { pauseGame(); e.preventDefault(); }
    else if (state === 'duraklatildi') { resumeGame(); e.preventDefault(); }
  }
});

// Dokunmatik kaydırma: yatay kayma yeterince uzunsa şerit değişir.
let swipe = null;
stage.addEventListener('pointerdown', (e) => {
  if (e.pointerType === 'mouse') return;
  if (e.target instanceof Element && e.target.closest('button')) return;
  swipe = { id: e.pointerId, x: e.clientX };
  try { stage.setPointerCapture(e.pointerId); } catch (_) { /* yapay olay */ }
});
stage.addEventListener('pointermove', (e) => {
  if (!swipe || swipe.id !== e.pointerId) return;
  const dx = e.clientX - swipe.x;
  if (Math.abs(dx) < SWIPE_MIN_PX) return;
  changeLane(dx > 0 ? 1 : -1);
  swipe.x = e.clientX;
});
const endSwipe = (e) => { if (swipe && swipe.id === e.pointerId) swipe = null; };
stage.addEventListener('pointerup', endSwipe);
stage.addEventListener('pointercancel', endSwipe);

// Ekran okları: dokunuşta hemen çalışır; klavyeyle etkinleştirme click ile gelir (detail = 0).
document.querySelectorAll('[data-pad]').forEach((b) => {
  const dir = b.dataset.pad === 'left' ? -1 : 1;
  b.addEventListener('pointerdown', (e) => { e.preventDefault(); changeLane(dir); });
  b.addEventListener('click', (e) => { if (e.detail === 0) changeLane(dir); });
});

btnMain.addEventListener('click', primaryAction);
ovBtn.addEventListener('click', primaryAction);
btnRestart.addEventListener('click', startGame);
selDiff.addEventListener('change', () => {
  diffName = selDiff.value; store.diff = diffName; saveStore();
  toReady();
});
btnNight.addEventListener('click', () => {
  night = !night; store.night = night; saveStore();
  btnNight.setAttribute('aria-pressed', String(night));
  btnNight.textContent = night ? 'Gündüz teması' : 'Gece teması';
  draw(); sync();
});
document.addEventListener('visibilitychange', () => { if (document.hidden) pauseGame(); });
window.addEventListener('blur', () => pauseGame());
window.addEventListener('pagehide', () => { if (scoreNow() > bestNow() && state !== 'hazir') { store.best[diffName] = scoreNow(); saveStore(); } });

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
    fit();
  });
}

/* ---------- Test kancası (oyuncuya sunulan bir özellik değildir) ---------- */
window.__arabaTest = Object.assign(() => ({
  state, lane, x: px, speed, dist: meters(), score: scoreNow(), best: bestNow(), night, frozen: frozen > 0, diff: diffName,
  objects: objects.map((o) => ({ kind: o.kind, lane: o.lane, y: o.y })),
}), {
  freeze(v = 280) { frozen = v; objects = []; },
  unfreeze() { frozen = 0; },
  clear() { objects = []; },
  spawn(kind = 'cone', ln = lane, y = PLAYER_Y - 170) { if (KIND[kind] && ln >= 0 && ln < LANES) objects.push(makeObject(kind, ln, y)); },
});

/* ---------- Başlangıç ---------- */
selDiff.value = diffName;
btnNight.setAttribute('aria-pressed', String(night));
btnNight.textContent = night ? 'Gündüz teması' : 'Gece teması';
toReady();
if ('ResizeObserver' in window) new ResizeObserver(fit).observe(stage);
window.addEventListener('resize', fit);
fit();
