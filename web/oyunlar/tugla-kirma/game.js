// Tuğla Kırma — canvas, sabit adımlı fizik (1/120 sn) + requestAnimationFrame ile çizim.
// Dış kütüphane ve ağ isteği yok. En yüksek skor yalnızca bu tarayıcının localStorage alanında durur.
// Oyun alanı sabit bir "mantıksal" 480 x 600 birimdir; ekranda CSS ile ölçeklenir, canvas
// devicePixelRatio kadar yüksek çözünürlükte çizilir.

const W = 480;
const H = 600;
const COLS = 10;
const BRICK_W = 42;
const BRICK_H = 20;
const GAP = 3;
const TOP = 56;
const LEFT = (W - (COLS * BRICK_W + (COLS - 1) * GAP)) / 2;
const PADDLE_Y = H - 40;
const PADDLE_H = 12;
const PADDLE_W = 84;
const PADDLE_W_WIDE = 140;
const PADDLE_SPEED = 520; // klavye ile birim/sn
const BALL_R = 7;
const MAX_BOUNCE_DEG = 62; // raketin ucuna çarpınca en fazla bu kadar sapar
const DT = 1 / 120;
const START_LIVES = 3;
const POWERUP_CHANCE = 0.18;
const POWERUP_FALL = 130;
const WIDE_SECONDS = 15;
const MAX_BALLS = 6;
const STORE_KEY = 'ba-tugla-kirma';

// Seviyeler: her satır 10 karakter. '.' boş, '1' tek vuruş, '2' iki vuruş, '3' üç vuruşluk tuğla.
// (Testler bu dizinin başına küçük bir deneme seviyesi ekleyebilsin diye ifade tek satırda başlar.)
const LEVELS = [
  // 1. Düz sıra
  ['1111111111', '1111111111', '1111111111', '1111111111'],
  // 2. Dama
  ['2222222222', '1111111111', '1.1.1.1.1.', '.1.1.1.1.1', '1.1.1.1.1.'],
  // 3. Piramit
  ['....11....', '...1221...', '..122221..', '.12222221.', '1111111111'],
  // 4. Koridorlar
  ['3333333333', '2.2.2.2.2.', '2.2.2.2.2.', '2.2.2.2.2.', '1.1.1.1.1.'],
  // 5. Kale
  ['3222222223', '2111111112', '2113333112', '2111111112', '3222222223'],
  // 6. Kalp
  ['.11....11.', '1221..1221', '1223223221', '1222222221', '.12222221.', '..122221..', '...1221...', '....11....'],
];
const LEVEL_NAMES = ['Düz sıra', 'Dama', 'Piramit', 'Koridorlar', 'Kale', 'Kalp'];

// Bordo / gri palet. Dayanıklılık rengi ve desenle ayrışır (yalnızca renge bağlı değil).
const COLOR = {
  bgTop: '#24272c',
  bgBottom: '#1a1c1f',
  hp1: '#c25a72',
  hp2: '#a9adb4',
  hp3: '#e6e4e1',
  line: 'rgba(26, 28, 31, .6)',
  paddle: '#e6e4e1',
  paddleCap: '#c25a72',
  ball: '#f3f4f6',
  capsule: '#7b2331',
  capsuleEdge: '#e8a0b3',
  text: '#d7d8db',
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
const elScore = $('score');
const elBest = $('best');
const elLevel = $('level');
const elLives = $('lives');
const elBuff = $('buff');
const elStatus = $('status');

/* ---------- Kalıcı veri (yalnızca localStorage) ---------- */

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

/* ---------- Oyun durumu ---------- */

let state = 'hazir'; // hazir | oynuyor | duraklatildi | seviye | bitti
let levelIdx = 0;
let score = 0;
let lives = START_LIVES;
let bricks = [];
let totalBricks = 1;
let remaining = 0;
let balls = [];
let pups = [];
let serving = true;
let launches = 0;
let wideLeft = 0;
let bestAtStart = 0;
let unlockAt = 0; // oyun sonu / seviye geçişi ekranında kazara tuşla geçmeyi önleyen kısa kilit
const paddle = { x: W / 2, w: PADDLE_W };
const keys = { left: false, right: false };

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

function buildLevel(idx) {
  bricks = [];
  const rows = LEVELS[idx];
  rows.forEach((row, r) => {
    for (let c = 0; c < COLS; c++) {
      const hp = Number(row[c]);
      if (!hp) continue;
      bricks.push({ x: LEFT + c * (BRICK_W + GAP), y: TOP + r * (BRICK_H + GAP), w: BRICK_W, h: BRICK_H, hp, maxHp: hp });
    }
  });
  totalBricks = bricks.length;
  remaining = bricks.length;
}

// Top hızı: seviye ilerledikçe ve tuğlalar azaldıkça biraz artar.
function ballSpeed() {
  const base = Math.min(500, 340 + levelIdx * 24);
  const progress = 1 - remaining / totalBricks;
  return base * (1 + 0.12 * progress);
}

function serveBall() {
  balls = [{ x: paddle.x, y: PADDLE_Y - BALL_R - 1, vx: 0, vy: 0 }];
  serving = true;
}

function loadLevel(idx) {
  levelIdx = idx;
  buildLevel(idx);
  pups = [];
  wideLeft = 0;
  paddle.w = PADDLE_W;
  paddle.x = W / 2;
  serveBall();
}

function addScore(n) {
  score += n;
  if (score > best) { best = score; saveBest(); }
}

// Fırlatma açısı deterministiktir: sırayla sağa ve sola 14 derece.
function launch() {
  if (state !== 'oynuyor' || !serving || !balls.length) return;
  const sign = launches % 2 === 0 ? 1 : -1;
  launches += 1;
  const a = (14 * Math.PI) / 180;
  const sp = ballSpeed();
  balls[0].vx = sign * sp * Math.sin(a);
  balls[0].vy = -sp * Math.cos(a);
  serving = false;
  announce('Top fırlatıldı.');
}

function normalize(b) {
  const sp = ballSpeed();
  const minVy = 0.22 * sp; // top yataya yakın sonsuz sekmesin
  let vy = b.vy;
  if (Math.abs(vy) < minVy) vy = (vy >= 0 ? 1 : -1) * minVy;
  const vx = (b.vx >= 0 ? 1 : -1) * Math.sqrt(Math.max(0, sp * sp - vy * vy));
  b.vx = vx;
  b.vy = vy;
}

function movePaddleTo(x) {
  paddle.x = clamp(x, paddle.w / 2, W - paddle.w / 2);
}

function dropPowerup(br) {
  if (Math.random() >= POWERUP_CHANCE) return;
  pups.push({ x: br.x + br.w / 2, y: br.y + br.h / 2, type: Math.random() < 0.5 ? 'wide' : 'multi' });
}

function spawnMultiBall() {
  const src = balls[0];
  if (!src) return;
  const sp = ballSpeed();
  const ang = Math.atan2(src.vy, src.vx);
  for (const off of [-0.38, 0.38]) {
    if (balls.length >= MAX_BALLS) break;
    const a = ang + off;
    balls.push({ x: src.x, y: src.y, vx: sp * Math.cos(a), vy: sp * Math.sin(a) });
  }
  balls.forEach(normalize);
}

function hitBrick(b) {
  for (const br of bricks) {
    if (br.hp <= 0) continue;
    const cx = clamp(b.x, br.x, br.x + br.w);
    const cy = clamp(b.y, br.y, br.y + br.h);
    const dx = b.x - cx;
    const dy = b.y - cy;
    if (dx * dx + dy * dy > BALL_R * BALL_R) continue;

    // Çarpışma yüzeyi: en yakın noktaya göre; merkez içerideyse en az gömülen kenara göre
    if (dx === 0 && dy === 0) {
      const fromLeft = b.x - br.x;
      const fromRight = br.x + br.w - b.x;
      const fromTop = b.y - br.y;
      const fromBottom = br.y + br.h - b.y;
      const m = Math.min(fromLeft, fromRight, fromTop, fromBottom);
      if (m === fromTop) { b.vy = -Math.abs(b.vy); b.y = br.y - BALL_R; }
      else if (m === fromBottom) { b.vy = Math.abs(b.vy); b.y = br.y + br.h + BALL_R; }
      else if (m === fromLeft) { b.vx = -Math.abs(b.vx); b.x = br.x - BALL_R; }
      else { b.vx = Math.abs(b.vx); b.x = br.x + br.w + BALL_R; }
    } else if (Math.abs(dx) > Math.abs(dy)) {
      b.vx = Math.abs(b.vx) * Math.sign(dx);
      b.x = cx + Math.sign(dx) * BALL_R;
    } else {
      b.vy = Math.abs(b.vy) * Math.sign(dy);
      b.y = cy + Math.sign(dy) * BALL_R;
    }

    br.hp -= 1;
    if (br.hp <= 0) {
      remaining -= 1;
      addScore(10 * br.maxHp);
      dropPowerup(br);
    } else {
      addScore(5);
    }
    normalize(b);
    return; // bir adımda tek tuğla: çift yansımayı önler
  }
}

function moveBall(b, dt) {
  b.x += b.vx * dt;
  b.y += b.vy * dt;
  let bounced = false;
  if (b.x - BALL_R < 0) { b.x = BALL_R; b.vx = Math.abs(b.vx); bounced = true; }
  else if (b.x + BALL_R > W) { b.x = W - BALL_R; b.vx = -Math.abs(b.vx); bounced = true; }
  if (b.y - BALL_R < 0) { b.y = BALL_R; b.vy = Math.abs(b.vy); bounced = true; }
  if (bounced) normalize(b);

  // Raket: temas noktası açıyı belirler (ortası dik, uçları geniş açı)
  if (b.vy > 0 && b.y + BALL_R >= PADDLE_Y && b.y < PADDLE_Y + 4 && Math.abs(b.x - paddle.x) <= paddle.w / 2 + BALL_R * 0.6) {
    const rel = clamp((b.x - paddle.x) / (paddle.w / 2 + BALL_R * 0.6), -1, 1);
    const ang = (rel * MAX_BOUNCE_DEG * Math.PI) / 180;
    const sp = ballSpeed();
    b.vx = sp * Math.sin(ang);
    b.vy = -sp * Math.cos(ang);
    b.y = PADDLE_Y - BALL_R;
  }
  hitBrick(b);
}

function update(dt) {
  const dirKey = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
  if (dirKey) movePaddleTo(paddle.x + dirKey * PADDLE_SPEED * dt);

  // Geniş raket süresi ve yumuşak boyut geçişi
  if (wideLeft > 0) wideLeft = Math.max(0, wideLeft - dt);
  const wantW = wideLeft > 0 ? PADDLE_W_WIDE : PADDLE_W;
  paddle.w += clamp(wantW - paddle.w, -280 * dt, 280 * dt);
  movePaddleTo(paddle.x);

  if (serving) {
    if (balls[0]) balls[0].x = paddle.x;
    return;
  }

  for (const b of balls) moveBall(b, dt);
  balls = balls.filter((b) => b.y - BALL_R <= H);

  // Düşen güçlendirmeler
  for (const p of pups) p.y += POWERUP_FALL * dt;
  pups = pups.filter((p) => {
    const caught = p.y + 8 >= PADDLE_Y && p.y - 8 <= PADDLE_Y + PADDLE_H && Math.abs(p.x - paddle.x) <= paddle.w / 2 + 18;
    if (caught) {
      if (p.type === 'wide') { wideLeft = WIDE_SECONDS; announce('Geniş raket kazandın.'); }
      else { spawnMultiBall(); addScore(20); announce('Çoklu top kazandın.'); }
      return false;
    }
    return p.y - 8 <= H;
  });

  if (!balls.length) { lifeLost(); return; }
  if (remaining <= 0) levelComplete();
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
      if (focusBtn && !overlay.hidden && (state === 'seviye' || state === 'bitti')) overlayBtn.focus({ preventScroll: true });
    }, lockMs);
  } else if (focusBtn) {
    overlayBtn.focus({ preventScroll: true });
  }
}

function lifeLost() {
  lives -= 1;
  pups = [];
  wideLeft = 0;
  if (lives <= 0) { endGame(false); return; }
  serveBall();
  announce(`Can kaybettin. Kalan can: ${lives}. Topu fırlatmak için Boşluk tuşuna basın ya da ekrana dokunun.`);
}

function levelComplete() {
  const bonus = 100 * (levelIdx + 1);
  addScore(bonus);
  saveBest();
  if (levelIdx >= LEVELS.length - 1) { endGame(true); return; }
  state = 'seviye';
  stopLoop();
  showOverlay(`Seviye ${levelIdx + 1} tamamlandı`, `${LEVEL_NAMES[levelIdx] || 'Seviye'} bitti. +${bonus} bonus puan. Skor: ${score}. Sıradaki: ${LEVEL_NAMES[levelIdx + 1] || 'yeni seviye'}.`, 'Sonraki seviye', true, 600);
  announce(`Seviye ${levelIdx + 1} tamamlandı. ${bonus} bonus puan.`);
  draw();
  sync();
}

function nextLevel() {
  if (state !== 'seviye') return;
  loadLevel(levelIdx + 1);
  state = 'oynuyor';
  overlay.hidden = true;
  announce(`Seviye ${levelIdx + 1}: ${LEVEL_NAMES[levelIdx] || ''}. Topu fırlatmak için Boşluk tuşuna basın.`);
  draw();
  sync();
  startLoop();
  stage.focus({ preventScroll: true });
}

function endGame(win) {
  stopLoop();
  state = 'bitti';
  saveBest();
  const title = win ? 'Tebrikler, hepsini kırdın!' : 'Oyun bitti';
  const text = `Skor: ${score} · En yüksek: ${best}.${win ? ' Tüm seviyeleri tamamladın.' : ` ${levelIdx + 1}. seviyede kaldın.`}${score > bestAtStart ? ' Yeni rekor!' : ''}`;
  showOverlay(title, text, 'Yeniden oyna', true, 600);
  announce(`${title} ${text}`);
  draw();
  sync();
}

function toReady() {
  stopLoop();
  score = 0;
  lives = START_LIVES;
  launches = 0;
  loadLevel(0);
  state = 'hazir';
  showOverlay('Tuğla Kırma', 'Raketi fare, parmak ya da ← → tuşlarıyla kaydırın; topu Boşluk ya da dokunuşla fırlatın. Tüm tuğlaları kırın!', 'Başlat', false);
  draw();
  sync();
}

function startGame() {
  bestAtStart = best;
  score = 0;
  lives = START_LIVES;
  launches = 0;
  loadLevel(0);
  state = 'oynuyor';
  overlay.hidden = true;
  announce('Oyun başladı. Topu fırlatmak için Boşluk tuşuna basın ya da ekrana dokunun.');
  draw();
  sync();
  startLoop();
  stage.focus({ preventScroll: true });
}

function pauseGame() {
  if (state !== 'oynuyor') return;
  stopLoop();
  keys.left = keys.right = false;
  state = 'duraklatildi';
  showOverlay('Duraklatıldı', 'Devam etmek için Boşluk ya da P tuşuna basın.', 'Devam et', true);
  announce('Oyun duraklatıldı.');
  sync();
}

function resumeGame() {
  if (state !== 'duraklatildi') return;
  state = 'oynuyor';
  overlay.hidden = true;
  announce('Oyun devam ediyor.');
  sync();
  startLoop();
  stage.focus({ preventScroll: true });
}

function primaryAction() {
  if ((state === 'seviye' || state === 'bitti') && performance.now() < unlockAt) return;
  if (state === 'hazir' || state === 'bitti') startGame();
  else if (state === 'oynuyor') pauseGame();
  else if (state === 'duraklatildi') resumeGame();
  else if (state === 'seviye') nextLevel();
}

/* ---------- Döngü ---------- */

let rafId = 0;
let lastTs = 0;
let acc = 0;

function frame(ts) {
  rafId = 0;
  if (state !== 'oynuyor') return;
  acc += clamp((ts - lastTs) / 1000, 0, 0.1); // sekme uyuyunca ani atlama olmasın
  lastTs = ts;
  let guard = 0;
  while (state === 'oynuyor' && acc >= DT && guard++ < 24) {
    update(DT);
    acc -= DT;
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

/* ---------- Ekran bilgileri ---------- */

const lastData = {};
function setData(key, value) {
  const v = String(value);
  if (lastData[key] !== v) { lastData[key] = v; stage.setAttribute(`data-${key}`, v); }
}
let lastBuff = '';
const lastText = new Map();
function setText(el, value) {
  const v = String(value);
  if (lastText.get(el) !== v) { lastText.set(el, v); el.textContent = v; }
}
function sync() {
  const b = balls[0];
  setData('state', state);
  setData('serve', serving ? '1' : '0');
  setData('level', levelIdx + 1);
  setData('score', score);
  setData('lives', lives);
  setData('bricks', remaining);
  setData('balls', balls.length);
  setData('ball-x', b ? b.x.toFixed(1) : '');
  setData('ball-y', b ? b.y.toFixed(1) : '');
  setData('paddle-x', paddle.x.toFixed(1));
  setData('paddle-w', Math.round(paddle.w));
  setData('wide', wideLeft > 0 ? '1' : '0');
  setData('pups', pups.length);
  setText(elScore, score);
  setText(elBest, Math.max(best, score));
  setText(elLevel, `${levelIdx + 1}/${LEVELS.length}`);
  setText(elLives, lives > 0 ? '♥'.repeat(lives) : '–');
  elLives.parentElement.setAttribute('aria-label', `Kalan can: ${lives}`);
  const buff = wideLeft > 0 ? `Geniş raket: ${Math.ceil(wideLeft)} sn` : '';
  if (buff !== lastBuff) { lastBuff = buff; elBuff.textContent = buff; elBuff.hidden = !buff; }
  setText(btnMain, { hazir: 'Başlat', oynuyor: 'Duraklat', duraklatildi: 'Devam et', seviye: 'Sonraki seviye', bitti: 'Yeniden oyna' }[state]);
}

/* ---------- Çizim ---------- */

let cssW = 0;
let cssH = 0;
let dprNow = 1;

function fit() {
  const rect = canvas.getBoundingClientRect();
  cssW = Math.max(1, Math.round(rect.width));
  cssH = Math.max(1, Math.round((cssW * H) / W));
  dprNow = Math.min(window.devicePixelRatio || 1, 3);
  const pw = Math.round(cssW * dprNow);
  const ph = Math.round(cssH * dprNow);
  if (canvas.width !== pw || canvas.height !== ph) {
    canvas.width = pw;
    canvas.height = ph; // boyut değişince bağlam sıfırlanır
  }
  draw();
}

function rr(x, y, w, h, r) {
  const k = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + k, y);
  ctx.arcTo(x + w, y, x + w, y + h, k);
  ctx.arcTo(x + w, y + h, x, y + h, k);
  ctx.arcTo(x, y + h, x, y, k);
  ctx.arcTo(x, y, x + w, y, k);
  ctx.closePath();
}

function draw() {
  if (!cssW) return;
  const s = (cssW / W) * dprNow;
  ctx.setTransform(s, 0, 0, s, 0, 0);
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, COLOR.bgTop);
  g.addColorStop(1, COLOR.bgBottom);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // Tuğlalar: renk + çizgi sayısı kalan dayanıklılığı gösterir (1: pembe, 2: gri çizgili, 3: açık çift çizgili)
  for (const br of bricks) {
    if (br.hp <= 0) continue;
    ctx.fillStyle = br.hp >= 3 ? COLOR.hp3 : br.hp === 2 ? COLOR.hp2 : COLOR.hp1;
    rr(br.x, br.y, br.w, br.h, 4);
    ctx.fill();
    if (br.hp >= 2) {
      ctx.strokeStyle = COLOR.line;
      ctx.lineWidth = 2;
      ctx.beginPath();
      const lines = br.hp - 1;
      for (let i = 1; i <= lines; i++) {
        const yy = br.y + (br.h * i) / (lines + 1);
        ctx.moveTo(br.x + 6, yy);
        ctx.lineTo(br.x + br.w - 6, yy);
      }
      ctx.stroke();
    }
  }

  // Güçlendirme kapsülleri
  ctx.font = '700 11px "IBM Plex Sans", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (const p of pups) {
    ctx.fillStyle = COLOR.capsule;
    rr(p.x - 18, p.y - 8, 36, 16, 8);
    ctx.fill();
    ctx.strokeStyle = COLOR.capsuleEdge;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.fillText(p.type === 'wide' ? 'G' : '×3', p.x, p.y + 0.5);
  }

  // Raket
  const px = paddle.x - paddle.w / 2;
  ctx.fillStyle = COLOR.paddle;
  rr(px, PADDLE_Y, paddle.w, PADDLE_H, 6);
  ctx.fill();
  ctx.fillStyle = COLOR.paddleCap;
  rr(px, PADDLE_Y, 12, PADDLE_H, 6);
  ctx.fill();
  rr(px + paddle.w - 12, PADDLE_Y, 12, PADDLE_H, 6);
  ctx.fill();

  // Toplar
  ctx.fillStyle = COLOR.ball;
  for (const b of balls) {
    ctx.beginPath();
    ctx.arc(b.x, b.y, BALL_R, 0, Math.PI * 2);
    ctx.fill();
  }

  if (state === 'oynuyor' && serving) {
    ctx.fillStyle = COLOR.text;
    ctx.font = '600 15px "IBM Plex Sans", system-ui, sans-serif';
    ctx.fillText('Fırlatmak için Boşluk veya dokun', W / 2, PADDLE_Y - 44);
  }
}

/* ---------- Girdiler: klavye, fare, dokunma ---------- */

function isInBox(el) { return el instanceof Node && box.contains(el); }

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const t = e.target;
  if (t instanceof Element && t.closest('select, input, textarea, [contenteditable="true"]')) return;
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

  if (key === 'ArrowLeft' || key === 'ArrowRight' || key === 'a' || key === 'd') {
    if (state === 'oynuyor' || isInBox(t)) {
      if (key === 'ArrowLeft' || key === 'a') keys.left = true; else keys.right = true;
      e.preventDefault();
    }
    return;
  }
  if (key === 'ArrowUp' || key === 'w') {
    if (state === 'oynuyor') { launch(); e.preventDefault(); }
    return;
  }
  if ((key === 'ArrowDown' || key === 's') && (state === 'oynuyor' || isInBox(t))) {
    if (key === 'ArrowDown') e.preventDefault();
    return;
  }

  const isSpace = e.key === ' ' || e.key === 'Spacebar';
  if (isSpace || key === 'p') {
    // Odaktaki düğme ya da bağlantı Boşluk'u kendi tıklaması için kullanır; ona karışma
    if (isSpace && t instanceof Element && t.closest('button, a, summary')) return;
    if (state === 'oynuyor') {
      if (isSpace && serving) launch(); else pauseGame();
      e.preventDefault();
    } else if (state === 'duraklatildi') { resumeGame(); e.preventDefault(); }
    else if (isSpace && isInBox(t)) { primaryAction(); e.preventDefault(); }
  } else if (e.key === 'Enter' && isInBox(t) && !(t instanceof Element && t.closest('button, a, summary'))) {
    if (state === 'hazir' || state === 'bitti' || state === 'seviye') { primaryAction(); e.preventDefault(); }
  }
});

document.addEventListener('keyup', (e) => {
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (key === 'ArrowLeft' || key === 'a') keys.left = false;
  if (key === 'ArrowRight' || key === 'd') keys.right = false;
});
window.addEventListener('blur', () => { keys.left = keys.right = false; });

// Fare: raket imleci izler (basmaya gerek yok). Dokunma/kalem: sürükleme göreceli çalışır, parmak raketi örtmez.
// Kısa ve kımıldamayan dokunuş/tıklama topu fırlatır.
let press = null;
const toLogicalX = (clientX) => ((clientX - canvas.getBoundingClientRect().left) / Math.max(1, canvas.getBoundingClientRect().width)) * W;

stage.addEventListener('pointerdown', (e) => {
  if (e.target instanceof Element && e.target.closest('button')) return;
  press = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), paddleX: paddle.x, moved: false, type: e.pointerType };
  if (e.pointerType !== 'mouse') {
    try { stage.setPointerCapture(e.pointerId); } catch (_) { /* yapay olaylarda yakalama yok */ }
  }
});
stage.addEventListener('pointermove', (e) => {
  if (state !== 'oynuyor') return;
  if (e.pointerType === 'mouse') {
    movePaddleTo(toLogicalX(e.clientX));
    if (press && Math.hypot(e.clientX - press.x, e.clientY - press.y) > 12) press.moved = true;
    return;
  }
  if (!press || press.id !== e.pointerId) return;
  const dx = e.clientX - press.x;
  if (Math.abs(dx) > 8 || Math.abs(e.clientY - press.y) > 8) press.moved = true;
  const scale = W / Math.max(1, canvas.getBoundingClientRect().width);
  movePaddleTo(press.paddleX + dx * scale);
});
const endPress = (e) => {
  if (!press || press.id !== e.pointerId) return;
  const tap = !press.moved && performance.now() - press.t < 500 && Math.hypot(e.clientX - press.x, e.clientY - press.y) < 12;
  press = null;
  if (tap && e.type === 'pointerup' && state === 'oynuyor') launch();
};
stage.addEventListener('pointerup', endPress);
stage.addEventListener('pointercancel', endPress);

/* ---------- Düğmeler, tam ekran ---------- */

btnMain.addEventListener('click', primaryAction);
overlayBtn.addEventListener('click', primaryAction);
btnRestart.addEventListener('click', startGame);

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

/* ---------- Başlangıç ---------- */

toReady();
if ('ResizeObserver' in window) new ResizeObserver(fit).observe(stage);
window.addEventListener('resize', fit);
fit();
