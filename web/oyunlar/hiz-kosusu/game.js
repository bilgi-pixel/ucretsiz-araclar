// Hız Koşusu — sonsuz koşu oyunu: kedi karakteri, canvas çizimi, requestAnimationFrame döngüsü.
// Mantık "mantıksal koordinatlarda" (640×320) işler; çizim devicePixelRatio ve ekran genişliğine göre ölçeklenir.
// Dış kütüphane, görsel, ses ve ağ isteği yok. En yüksek skor yalnızca bu tarayıcının localStorage alanında durur.

const W = 640; // mantıksal genişlik
const H = 320; // mantıksal yükseklik
const GROUND_Y = 262; // zemin çizgisi
const PLAYER_X = 80;
const STORE_KEY = 'ba-hiz-kosusu';

const GRAVITY = 2600; // px/sn²
const JUMP_V = 860; // zıplama ilk hızı
const JUMP_CUT_V = 480; // tuş erken bırakılınca yükseliş hızı bu değerle sınırlanır (en az ~44 px'lik kısa zıplama)
const FAST_FALL = 2.3; // havadayken aşağı tuşu: yerçekimi çarpanı
const JUMP_BUFFER_S = 0.12; // inişten hemen önce basılan zıplama hatırlanır
const BASE_SPEED = 300;
const MAX_SPEED = 720;
const SPEED_PER_POINT = 0.3; // her skor puanı hızı bu kadar artırır
const POINT_PX = 20; // 20 px koşu = 1 puan
const FIRST_GAP_PX = 520; // ilk engele kadar mesafe (ilk saniyeler güvenli)
const DAY_LENGTH = 500; // her 500 puanda gündüz/gece değişir
const FLYER_FROM = 150; // uçan engeller bu skordan sonra çıkar
const HIGH_FLYER_FROM = 400;

// Çarpışma kutuları (görselden biraz küçük: oyuncu lehine)
const STAND = { dx: 8, w: 30, h: 38 };
const DUCK = { dx: 4, w: 42, h: 20 };

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
const elScore = $('score');
const elBest = $('best');
const elSpeed = $('speedx');
const elStatus = $('status');

/* ---------- Kalıcı veri (yalnızca localStorage) ---------- */

const toInt = (v) => (Number.isFinite(v) && v > 0 ? Math.floor(v) : 0);

function loadStore() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (raw && typeof raw === 'object') return { best: toInt(raw.best) };
  } catch (_) { /* localStorage kapalı ya da bozuk: oyun yine çalışır, skor saklanmaz */ }
  return { best: 0 };
}
const store = loadStore();
function saveStore() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (_) { /* özel gezinme modu */ }
}

/* ---------- Renkler: gündüz ↔ gece karışımı ---------- */

const PAL = {
  skyTop: ['#f8f5f0', '#141826'],
  skyBottom: ['#ece5dc', '#272e47'],
  hillFar: ['#e2d9ce', '#20273d'],
  hillNear: ['#d3c8bb', '#2b3450'],
  ground: ['#e3dbd1', '#1c2133'],
  groundLine: ['#4a4d54', '#a4a9bd'],
  groundDash: ['#9d9186', '#4b5370'],
  cat: ['#3b3f46', '#f3dde3'],
  catAccent: ['#c25a72', '#e58aa0'],
  catEye: ['#f8f5f0', '#141826'],
  rock: ['#6e7078', '#a3a6b3'],
  rockLight: ['#9a9ca4', '#c9cbd6'],
  crate: ['#7b2331', '#cf6a82'],
  crateLine: ['#d9a3ae', '#4a1a26'],
  flyer: ['#a5475a', '#f09ab0'],
  flyerWing: ['#7b2331', '#d96f8a'],
  cloud: ['#ffffff', '#3a4262'],
  sun: ['#f2b84b', '#f2b84b'],
  moon: ['#f4efe0', '#f4efe0'],
};
const hex = (s) => [parseInt(s.slice(1, 3), 16), parseInt(s.slice(3, 5), 16), parseInt(s.slice(5, 7), 16)];
function mix(pair, t) {
  const a = hex(pair[0]);
  const b = hex(pair[1]);
  return `rgb(${Math.round(a[0] + (b[0] - a[0]) * t)},${Math.round(a[1] + (b[1] - a[1]) * t)},${Math.round(a[2] + (b[2] - a[2]) * t)})`;
}

/* ---------- Oyun durumu ---------- */

let state = 'hazir'; // hazir | oynuyor | duraklatildi | bitti
let dist = 0; // koşulan mantıksal piksel
let score = 0;
let bestAtStart = 0;
let y = 0; // zeminden yükseklik (px, yukarı pozitif)
let vy = 0;
let grounded = true;
let jumpBuffer = 0;
let animT = 0;
let night = 0; // 0 gündüz … 1 gece (yumuşak geçiş)
let obstacles = [];
let gapLeft = FIRST_GAP_PX;
let dead = false;
let calm = false; // yalnızca test kancası açar: kendiliğinden engel doğmaz
let unlockAt = 0; // oyun sonunda kazara yeniden başlamayı önleyen kısa kilit
const jumpHeld = new Set(); // basılı zıplama kaynakları: key:Space, ptr, btn …
const duckHeld = new Set();
const clouds = [
  { x: 90, y: 60, s: 1 }, { x: 300, y: 38, s: 0.8 }, { x: 470, y: 82, s: 1.2 }, { x: 600, y: 52, s: 0.9 },
];
// Sabit yıldız dizisi (rastgele ama her açılışta aynı görünür)
const stars = [];
{
  let seed = 7;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  for (let i = 0; i < 34; i++) stars.push({ x: rnd() * W, y: 8 + rnd() * 150, r: 0.6 + rnd() * 1.1, p: rnd() * 6.28 });
}

const speedNow = () => Math.min(MAX_SPEED, BASE_SPEED + score * SPEED_PER_POINT);
const isNightTarget = () => Math.floor(score / DAY_LENGTH) % 2 === 1;
const ducking = () => duckHeld.size > 0 && grounded && !dead;

function resetGame() {
  dist = 0;
  score = 0;
  bestAtStart = store.best;
  y = 0; vy = 0; grounded = true;
  jumpBuffer = 0;
  animT = 0;
  night = 0;
  obstacles = [];
  gapLeft = FIRST_GAP_PX;
  dead = false;
}

/* ---------- Engeller ---------- */

function makeGround(kind, x) {
  if (kind === 'tas') {
    const w = 22 + Math.floor(Math.random() * 14);
    const h = 20 + Math.floor(Math.random() * 14);
    return { kind, x, w, h, yb: 0, extra: 0 };
  }
  const s = 30 + Math.floor(Math.random() * 10);
  return { kind: 'kutu', x, w: s, h: s, yb: 0, extra: 0 };
}

function makeFlyer(high, x) {
  // Alçak uçan engel: ayakta çarpar, eğilince altından geçilir. Yüksek olan: ayakta altından geçilir, zıplayınca çarpar.
  return { kind: 'kus', x, w: 46, h: 26, yb: high ? 86 : 26, extra: 70, high };
}

function spawnNext() {
  const sp = speedNow();
  let groupW = 0;
  const flyerChance = score >= HIGH_FLYER_FROM ? 0.34 : 0.22;
  if (score >= FLYER_FROM && Math.random() < flyerChance) {
    const high = score >= HIGH_FLYER_FROM && Math.random() < 0.4;
    obstacles.push(makeFlyer(high, W + 30));
    groupW = 80;
  } else {
    const count = score >= 300 ? 1 + Math.floor(Math.random() * 3) : score >= 100 ? 1 + Math.floor(Math.random() * 2) : 1;
    const kind = Math.random() < 0.5 ? 'tas' : 'kutu';
    let x = W + 30;
    for (let i = 0; i < count; i++) {
      const o = makeGround(kind, x);
      obstacles.push(o);
      x += o.w + 6;
      groupW += o.w + 6;
    }
  }
  // Aralık: zıplama mesafesi + engel genişliği + tepki payı; hız arttıkça açılır
  gapLeft = sp * 0.7 + 190 + groupW + Math.random() * sp * 0.55;
}

function playerRect() {
  const k = ducking() ? DUCK : STAND;
  const bottom = GROUND_Y - y;
  return { l: PLAYER_X + k.dx, r: PLAYER_X + k.dx + k.w, t: bottom - k.h, b: bottom };
}

function obstacleRect(o) {
  const bottom = GROUND_Y - o.yb;
  const padX = o.kind === 'kus' ? 5 : 3;
  const padTop = o.kind === 'kus' ? 4 : 4;
  return { l: o.x + padX, r: o.x + o.w - padX, t: bottom - o.h + padTop, b: bottom - (o.kind === 'kus' ? 3 : 0) };
}

function collides() {
  const p = playerRect();
  for (const o of obstacles) {
    if (o.x > PLAYER_X + 80 || o.x + o.w < PLAYER_X - 10) continue;
    const q = obstacleRect(o);
    if (p.l < q.r && p.r > q.l && p.t < q.b && p.b > q.t) return o;
  }
  return null;
}

/* ---------- Güncelleme ---------- */

function tryJump() {
  if (grounded && !dead) {
    vy = JUMP_V;
    grounded = false;
    jumpBuffer = 0;
  }
}

function update(dt) {
  const sp = speedNow();
  animT += dt;
  dist += sp * dt;
  score = Math.floor(dist / POINT_PX);

  // Oyuncu fiziği
  if (jumpBuffer > 0) {
    jumpBuffer -= dt;
    if (grounded) tryJump();
  }
  if (!grounded) {
    const g = duckHeld.size ? GRAVITY * FAST_FALL : GRAVITY;
    vy -= g * dt;
    y += vy * dt;
    // Yalnızca düşerken iner: ilk karede dt = 0 ise yükselen kedi yere "inmiş" sayılıp zıplama yutulmasın
    if (y <= 0 && vy <= 0) {
      y = 0; vy = 0; grounded = true;
      if (jumpBuffer > 0) tryJump(); // inişten hemen önce basılan zıplama burada çalışır
    }
  }

  // Engeller
  for (const o of obstacles) o.x -= (sp + o.extra) * dt;
  obstacles = obstacles.filter((o) => o.x + o.w > -30);
  if (!calm) {
    gapLeft -= sp * dt;
    if (gapLeft <= 0) spawnNext();
  }

  // Bulutlar ve gece-gündüz
  for (const c of clouds) {
    c.x -= sp * 0.12 * dt;
    if (c.x < -80) c.x = W + 40 + Math.random() * 120;
  }
  night += ((isNightTarget() ? 1 : 0) - night) * Math.min(1, dt * 1.6);

  if (score > store.best) store.best = score;

  const hitObj = collides();
  if (hitObj) endGame(hitObj.kind === 'kus' ? 'Uçan nesneye çarptın.' : 'Engele çarptın.');
}

/* ---------- Döngü ---------- */

let rafId = 0;
let lastTs = 0;

function frame(ts) {
  rafId = 0;
  if (state !== 'oynuyor') return;
  const dt = Math.min(Math.max((ts - lastTs) / 1000, 0), 0.05); // sekme uyuyunca ani atlama olmasın
  lastTs = ts;
  update(dt);
  draw();
  sync();
  if (state === 'oynuyor') rafId = requestAnimationFrame(frame);
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

function announce(msg) { elStatus.textContent = msg; }

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

function clearInputs() {
  jumpHeld.clear();
  duckHeld.clear();
}

function toReady() {
  stopLoop();
  clearInputs();
  resetGame();
  state = 'hazir';
  showOverlay('Hız Koşusu', 'Başlat düğmesine basın ya da ekrana dokunun. Boşluk, ↑ veya dokunma: zıpla. ↓ basılı tut: eğil.', 'Başlat', false);
  draw();
  sync();
}

function startGame() {
  clearInputs();
  resetGame();
  state = 'oynuyor';
  overlay.hidden = true;
  announce('Koşu başladı.');
  draw();
  sync();
  startLoop();
  stage.focus({ preventScroll: true });
}

function pauseGame() {
  if (state !== 'oynuyor') return;
  stopLoop();
  clearInputs();
  state = 'duraklatildi';
  showOverlay('Duraklatıldı', 'Devam etmek için P tuşuna ya da düğmeye basın.', 'Devam et', true);
  announce('Oyun duraklatıldı.');
  sync();
}

function resumeGame() {
  if (state !== 'duraklatildi') return;
  state = 'oynuyor';
  overlay.hidden = true;
  announce('Koşu devam ediyor.');
  sync();
  startLoop();
  stage.focus({ preventScroll: true });
}

function endGame(reason) {
  if (state !== 'oynuyor') return;
  stopLoop();
  dead = true;
  state = 'bitti';
  clearInputs();
  const record = score > bestAtStart;
  if (score > store.best) store.best = score;
  saveStore();
  const text = `${reason} Skor: ${score} · En yüksek: ${store.best}.${record && score > 0 ? ' Yeni rekor!' : ''}`;
  showOverlay('Oyun bitti', text, 'Tekrar oyna', true, 500);
  announce(`Oyun bitti. ${text}`);
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
  setData('state', state);
  setData('score', score);
  setData('y', Math.round(y));
  setData('duck', ducking() ? '1' : '0');
  setData('night', night > 0.5 ? '1' : '0');
  setData('speed', Math.round(speedNow()));
  setData('obstacles', obstacles.length);
  elScore.textContent = String(score);
  elBest.textContent = String(Math.max(store.best, score));
  elSpeed.textContent = `${(speedNow() / BASE_SPEED).toFixed(1).replace('.', ',')}×`;
  btnMain.textContent = { hazir: 'Başlat', oynuyor: 'Duraklat', duraklatildi: 'Devam et', bitti: 'Tekrar oyna' }[state];
}

/* ---------- Çizim ---------- */

function fit() {
  const rect = canvas.getBoundingClientRect();
  const cssW = Math.max(1, Math.round(rect.width));
  const cssH = Math.max(1, Math.round(rect.height));
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  const pw = Math.round(cssW * dpr);
  const ph = Math.round(cssH * dpr);
  if (canvas.width !== pw || canvas.height !== ph) {
    canvas.width = pw;
    canvas.height = ph; // boyut değişince bağlam sıfırlanır
  }
  ctx.setTransform(pw / W, 0, 0, ph / H, 0, 0); // mantıksal 640×320 uzayı → gerçek piksel
  draw();
}

function cloud(c, alpha) {
  ctx.globalAlpha = alpha;
  ctx.fillStyle = mix(PAL.cloud, night);
  const s = c.s;
  ctx.beginPath();
  ctx.arc(c.x, c.y, 13 * s, 0, Math.PI * 2);
  ctx.arc(c.x + 16 * s, c.y - 7 * s, 16 * s, 0, Math.PI * 2);
  ctx.arc(c.x + 34 * s, c.y, 13 * s, 0, Math.PI * 2);
  ctx.rect(c.x, c.y, 34 * s, 13 * s);
  ctx.fill();
  ctx.globalAlpha = 1;
}

function hills(offset, baseY, amp, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, GROUND_Y);
  for (let x = 0; x <= W; x += 16) {
    const yy = baseY - amp * (0.55 + 0.45 * Math.sin((x + offset) * 0.011)) - amp * 0.35 * Math.sin((x + offset) * 0.029 + 1);
    ctx.lineTo(x, yy);
  }
  ctx.lineTo(W, GROUND_Y);
  ctx.closePath();
  ctx.fill();
}

function drawSky() {
  const grad = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
  grad.addColorStop(0, mix(PAL.skyTop, night));
  grad.addColorStop(1, mix(PAL.skyBottom, night));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Güneş (gündüz) ve ay + yıldızlar (gece)
  if (night < 0.6) {
    ctx.globalAlpha = 1 - night / 0.6; // güneş geceye doğru çabuk silinir
    ctx.fillStyle = mix(PAL.sun, 0);
    ctx.beginPath(); ctx.arc(540, 64 + night * 40, 22, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
  }
  if (night > 0.02) {
    ctx.globalAlpha = night;
    // Hilal: dış daireye kırpılmış alan, iç daire çıkarılarak (gökyüzü renginden bağımsız) doldurulur
    const my = 64 + (1 - night) * 40;
    ctx.save();
    ctx.beginPath(); ctx.arc(540, my, 20, 0, Math.PI * 2); ctx.clip();
    ctx.fillStyle = mix(PAL.moon, 0);
    ctx.beginPath(); ctx.rect(500, my - 30, 80, 60); ctx.arc(549, my - 5, 17, 0, Math.PI * 2); ctx.fill('evenodd');
    ctx.restore();
    for (const s of stars) {
      ctx.globalAlpha = night * (0.55 + 0.45 * Math.sin(animT * 2 + s.p));
      ctx.fillStyle = '#f4efe0';
      ctx.fillRect(s.x, s.y, s.r * 1.6, s.r * 1.6);
    }
    ctx.globalAlpha = 1;
  }

  for (const c of clouds) cloud(c, 0.9 - night * 0.55);
  hills(dist * 0.08, GROUND_Y - 4, 46, mix(PAL.hillFar, night));
  hills(dist * 0.16 + 200, GROUND_Y, 30, mix(PAL.hillNear, night));
}

function drawGround() {
  ctx.fillStyle = mix(PAL.ground, night);
  ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y);
  ctx.fillStyle = mix(PAL.groundLine, night);
  ctx.fillRect(0, GROUND_Y, W, 3);
  // Akan zemin çizgileri: hızı hissettirir
  ctx.fillStyle = mix(PAL.groundDash, night);
  const period = 70;
  const shift = dist % period;
  for (let x = -shift; x < W; x += period) {
    ctx.fillRect(x + 10, GROUND_Y + 14, 22, 2);
    ctx.fillRect(x + 44, GROUND_Y + 28, 10, 2);
    ctx.fillRect(x + 4, GROUND_Y + 40, 14, 2);
  }
}

function drawRock(o) {
  const x = o.x;
  const b = GROUND_Y;
  ctx.fillStyle = mix(PAL.rock, night);
  ctx.beginPath();
  ctx.moveTo(x, b);
  ctx.lineTo(x + o.w * 0.12, b - o.h * 0.62);
  ctx.lineTo(x + o.w * 0.38, b - o.h);
  ctx.lineTo(x + o.w * 0.72, b - o.h * 0.82);
  ctx.lineTo(x + o.w, b - o.h * 0.3);
  ctx.lineTo(x + o.w, b);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = mix(PAL.rockLight, night);
  ctx.beginPath();
  ctx.moveTo(x + o.w * 0.2, b - o.h * 0.55);
  ctx.lineTo(x + o.w * 0.38, b - o.h * 0.9);
  ctx.lineTo(x + o.w * 0.52, b - o.h * 0.55);
  ctx.closePath();
  ctx.fill();
}

function drawCrate(o) {
  const x = o.x;
  const top = GROUND_Y - o.h;
  ctx.fillStyle = mix(PAL.crate, night);
  ctx.fillRect(x, top, o.w, o.h);
  ctx.strokeStyle = mix(PAL.crateLine, night);
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 3, top + 3, o.w - 6, o.h - 6);
  ctx.beginPath();
  ctx.moveTo(x + 3, top + 3); ctx.lineTo(x + o.w - 3, top + o.h - 3);
  ctx.moveTo(x + o.w - 3, top + 3); ctx.lineTo(x + 3, top + o.h - 3);
  ctx.stroke();
}

// Uçan nesne: kanat çırpan küçük bir kuş-drone
function drawFlyer(o) {
  const cx = o.x + o.w / 2;
  const cy = GROUND_Y - o.yb - o.h / 2;
  const flap = Math.sin(animT * 18 + o.x * 0.05);
  ctx.fillStyle = mix(PAL.flyer, night);
  ctx.beginPath(); ctx.ellipse(cx, cy, 16, 9, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); // gaga (sola bakar)
  ctx.moveTo(cx - 15, cy - 2); ctx.lineTo(cx - 25, cy + 1); ctx.lineTo(cx - 15, cy + 5); ctx.closePath(); ctx.fill();
  ctx.beginPath(); // kuyruk
  ctx.moveTo(cx + 14, cy); ctx.lineTo(cx + 24, cy - 6); ctx.lineTo(cx + 22, cy + 5); ctx.closePath(); ctx.fill();
  ctx.fillStyle = mix(PAL.flyerWing, night);
  ctx.beginPath(); // kanat
  ctx.moveTo(cx - 6, cy - 2);
  ctx.lineTo(cx + 8, cy - 2);
  ctx.lineTo(cx + 2, cy - 2 - 16 * flap);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = mix(PAL.catEye, night);
  ctx.beginPath(); ctx.arc(cx - 9, cy - 2, 1.8, 0, Math.PI * 2); ctx.fill();
}

// Kedi: sağa koşar. (px, py) = kutunun sol alt köşesi; pose: run | jump | duck | dead | idle
function drawCat(px, py, pose) {
  const body = mix(PAL.cat, night);
  const acc = mix(PAL.catAccent, night);
  const eye = mix(PAL.catEye, night);
  const cyc = dist * 0.085; // adım döngüsü hıza bağlı
  ctx.save();
  ctx.translate(px, py);
  ctx.fillStyle = body;
  ctx.strokeStyle = body;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (pose === 'duck') {
    // Yere yapışık, uzun gövde
    ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(6, -11); ctx.quadraticCurveTo(-10, -12, -8, -20); ctx.stroke(); // kuyruk
    ctx.beginPath(); ctx.ellipse(26, -11, 20, 8, 0, 0, Math.PI * 2); ctx.fill(); // gövde
    ctx.beginPath(); ctx.arc(46, -13, 8, 0, Math.PI * 2); ctx.fill(); // kafa
    ctx.beginPath(); ctx.moveTo(41, -19); ctx.lineTo(43, -27); ctx.lineTo(47, -20); ctx.fill();
    ctx.beginPath(); ctx.moveTo(48, -20); ctx.lineTo(52, -27); ctx.lineTo(53, -17); ctx.fill();
    const s1 = Math.sin(cyc * 1.6) * 4;
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(12, -6); ctx.lineTo(12 + s1, -1); ctx.moveTo(38, -6); ctx.lineTo(38 - s1, -1); ctx.stroke();
    ctx.fillStyle = eye;
    ctx.beginPath(); ctx.arc(49, -14, 1.7, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = acc;
    ctx.beginPath(); ctx.arc(54, -11, 1.5, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    return;
  }

  const air = pose === 'jump' || pose === 'dead';
  const sw = pose === 'run' ? Math.sin(cyc) * 9 : 0;
  // Kuyruk: koşarken sallanır
  const wag = pose === 'run' ? Math.sin(cyc * 0.9) * 5 : 3;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(8, -24);
  ctx.quadraticCurveTo(-10, -24 - wag, -7, -44 + wag);
  ctx.stroke();
  // Arka ve ön bacaklar
  ctx.lineWidth = 5;
  ctx.beginPath();
  if (air) {
    ctx.moveTo(13, -15); ctx.lineTo(3, -7); // arka bacak geriye
    ctx.moveTo(18, -15); ctx.lineTo(9, -5);
    ctx.moveTo(32, -15); ctx.lineTo(44, -9); // ön bacak ileri
    ctx.moveTo(37, -15); ctx.lineTo(48, -11);
  } else {
    ctx.moveTo(13, -15); ctx.lineTo(13 + sw, -2);
    ctx.moveTo(19, -15); ctx.lineTo(19 - sw, -2);
    ctx.moveTo(32, -15); ctx.lineTo(32 - sw, -2);
    ctx.moveTo(38, -15); ctx.lineTo(38 + sw, -2);
  }
  ctx.stroke();
  // Gövde ve kafa
  ctx.beginPath(); ctx.ellipse(25, -24, 18, 10, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(42, -32, 9, 0, Math.PI * 2); ctx.fill();
  // Kulaklar (içi vurgulu)
  ctx.beginPath(); ctx.moveTo(35, -38); ctx.lineTo(37, -49); ctx.lineTo(43, -39); ctx.fill();
  ctx.beginPath(); ctx.moveTo(43, -39); ctx.lineTo(48, -48); ctx.lineTo(50, -35); ctx.fill();
  ctx.fillStyle = acc;
  ctx.beginPath(); ctx.moveTo(37, -40); ctx.lineTo(38, -45); ctx.lineTo(41, -40); ctx.fill();
  // Göz, burun, bıyık
  if (pose === 'dead') {
    ctx.strokeStyle = eye;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(43, -36); ctx.lineTo(47, -32); ctx.moveTo(47, -36); ctx.lineTo(43, -32);
    ctx.stroke();
  } else {
    ctx.fillStyle = eye;
    ctx.beginPath(); ctx.arc(45.5, -33, 1.9, 0, Math.PI * 2); ctx.fill();
  }
  ctx.fillStyle = acc;
  ctx.beginPath(); ctx.arc(50.5, -30, 1.6, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = eye;
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(48, -29); ctx.lineTo(56, -31); ctx.moveTo(48, -28); ctx.lineTo(56, -27);
  ctx.stroke();
  ctx.restore();
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  drawSky();
  drawGround();
  for (const o of obstacles) {
    if (o.kind === 'tas') drawRock(o);
    else if (o.kind === 'kutu') drawCrate(o);
    else drawFlyer(o);
  }
  const pose = dead ? 'dead' : !grounded ? 'jump' : ducking() ? 'duck' : state === 'oynuyor' ? 'run' : 'idle';
  drawCat(PLAYER_X, GROUND_Y - y, pose);
}

/* ---------- Girdiler ---------- */

function isInBox(el) { return el instanceof Node && box.contains(el); }

function pressJump(src) {
  if (state === 'hazir') startGame();
  if (state !== 'oynuyor') return;
  jumpHeld.add(src);
  jumpBuffer = JUMP_BUFFER_S;
  if (grounded) tryJump();
}

function releaseJump(src) {
  if (!jumpHeld.delete(src)) return;
  // Hiçbir zıplama kaynağı basılı değilse yükseliş kesilir: kısa dokunuş = alçak zıplama
  if (!jumpHeld.size && !grounded && vy > JUMP_CUT_V) vy = JUMP_CUT_V;
}

const JUMP_KEYS = new Set([' ', 'ArrowUp', 'w']);
const DUCK_KEYS = new Set(['ArrowDown', 's']);

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const t = e.target;
  // Form alanlarında (seçim kutuları vb.) oyun tuşları çalışmasın
  if (t instanceof Element && t.closest('select, input, textarea, [contenteditable="true"]')) return;
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  const isSpace = e.key === ' ' || e.key === 'Spacebar';
  const k = isSpace ? ' ' : key;

  if (JUMP_KEYS.has(k)) {
    // Odaktaki düğme ya da bağlantı Boşluk'u kendi tıklaması için kullanır; ona karışma
    if (isSpace && t instanceof Element && t.closest('button, a, summary')) return;
    if (state === 'oynuyor') {
      e.preventDefault();
      if (!e.repeat) pressJump(`key:${k}`);
    } else if (state === 'duraklatildi') {
      if (isSpace && isInBox(t)) e.preventDefault();
    } else if (isInBox(t)) {
      e.preventDefault();
      if (state === 'bitti') primaryAction();
      else if (!e.repeat) pressJump(`key:${k}`); // hazır: oyunu başlatır ve zıplar
    }
    return;
  }
  if (DUCK_KEYS.has(k)) {
    if (state === 'oynuyor') { e.preventDefault(); duckHeld.add(`key:${k}`); }
    else if (isInBox(t) && key.startsWith('Arrow')) e.preventDefault(); // kutu içinde sayfa kaymasın
    return;
  }
  if (key === 'p') {
    if (state === 'oynuyor') { pauseGame(); e.preventDefault(); }
    else if (state === 'duraklatildi') { resumeGame(); e.preventDefault(); }
  } else if (e.key === 'Enter' && isInBox(t) && !(t instanceof Element && t.closest('button, a, summary'))) {
    if (state === 'hazir' || state === 'bitti') { primaryAction(); e.preventDefault(); }
  }
});

document.addEventListener('keyup', (e) => {
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  const k = e.key === ' ' || e.key === 'Spacebar' ? ' ' : key;
  if (JUMP_KEYS.has(k)) releaseJump(`key:${k}`);
  if (DUCK_KEYS.has(k)) duckHeld.delete(`key:${k}`);
});
window.addEventListener('blur', () => { clearInputs(); });

// Ekrana dokunma/tıklama: zıplar (basılı tutunca daha yükseğe)
stage.addEventListener('pointerdown', (e) => {
  if (e.target instanceof Element && e.target.closest('button')) return;
  if (state === 'oynuyor' || state === 'hazir') {
    pressJump(`ptr:${e.pointerId}`);
    try { stage.setPointerCapture(e.pointerId); } catch (_) { /* yapay olaylarda yakalama yok */ }
  }
});
const endPtr = (e) => releaseJump(`ptr:${e.pointerId}`);
stage.addEventListener('pointerup', endPtr);
stage.addEventListener('pointercancel', endPtr);

// Ekran düğmeleri: basılı tutma desteklenir; klavyeyle etkinleştirme click ile gelir (detail = 0).
document.querySelectorAll('[data-act]').forEach((btn) => {
  const act = btn.dataset.act;
  const src = `btn:${act}`;
  const down = (e) => {
    e.preventDefault();
    if (act === 'jump') { pressJump(src); return; }
    if (state === 'hazir') startGame();
    if (state === 'oynuyor') duckHeld.add(src);
  };
  const up = () => { if (act === 'jump') releaseJump(src); else duckHeld.delete(src); };
  btn.addEventListener('pointerdown', down);
  btn.addEventListener('pointerup', up);
  btn.addEventListener('pointercancel', up);
  btn.addEventListener('pointerleave', up);
  btn.addEventListener('click', (e) => {
    if (e.detail !== 0) return;
    if (act === 'jump') { pressJump(src); setTimeout(() => releaseJump(src), 200); }
    else { if (state === 'hazir') startGame(); duckHeld.add(src); setTimeout(() => duckHeld.delete(src), 700); }
  });
});

/* ---------- Düğmeler, tam ekran ---------- */

btnMain.addEventListener('click', primaryAction);
overlayBtn.addEventListener('click', primaryAction);
btnRestart.addEventListener('click', startGame);

document.addEventListener('visibilitychange', () => { if (document.hidden) pauseGame(); });
window.addEventListener('pagehide', () => { if (state === 'oynuyor' && score > 0) saveStore(); });

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

// Tarayıcı testleri için kanca (oyuncuya sunulan bir özellik değildir): çarpışma, engel ve skor üretir.
window.__kosuTest = {
  hit() { if (state === 'oynuyor') endGame('Engele çarptın.'); },
  // Kedinin hemen önüne engel koyar; kind: tas | kutu | kus-alcak | kus-yuksek
  spawn(kind) {
    if (state !== 'oynuyor') return;
    const x = PLAYER_X + 30;
    if (kind === 'tas' || kind === 'kutu') obstacles.push(makeGround(kind, x));
    else obstacles.push(makeFlyer(kind === 'kus-yuksek', x));
  },
  addScore(points) { dist += Math.max(0, Number(points) || 0) * POINT_PX; },
  // Yavaş makinelerde testlerin rastgele çarpışmaya takılmaması için kendiliğinden engel üretimini kapatır
  calm(on = true) { calm = !!on; },
  info() { return { state, score, y, vy, speed: speedNow(), night, obstacles: obstacles.map((o) => ({ kind: o.kind, x: o.x })) }; },
};

/* ---------- Başlangıç ---------- */

toReady();
if ('ResizeObserver' in window) new ResizeObserver(fit).observe(stage);
window.addEventListener('resize', fit);
fit();
