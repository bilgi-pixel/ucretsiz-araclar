// Kule Yığma — kayan bloğu doğru anda bırak, taşan kısım kesilsin, kule yükselsin.
// Tamamen istemci tarafı: bloklar, arka plan ve kamera canvas ile çizilir; dış istek, çerez ve izleme yok.
// En yüksek skor yalnızca bu cihazın localStorage alanına yazılır.

const STORE_KEY = 'ba-oyun-kule-yigma';

// Mantıksal tuval ölçüleri (CSS boyutundan bağımsız; çizim ölçeklenir).
const W = 300;
const H = 400;
const BH = 22; // blok yüksekliği
const GROUND = 24; // zemin şeridi
const BASE_W = 150; // zemin bloğunun ve en geniş bloğun genişliği
const PERFECT_TOL = 4; // bu kadar veya daha az kayma "mükemmel"
const MIN_OVERLAP = 1; // bundan az üst üste binme = kaçırma
const REGROW = 6; // 3+ mükemmel seride blok genişleme miktarı
const SPEED0 = 130; // başlangıç hızı (birim/sn)
const SPEED_STEP = 6; // her katta hız artışı
const SPEED_MAX = 360;
const BASE_POINTS = 10;
const PERFECT_BONUS_STEP = 10;
const PERFECT_BONUS_MAX = 50;
const RESTART_GUARD_MS = 700; // oyun bitince Boşluk ile anında yeniden başlamayı önler

const reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

const $ = (id) => document.getElementById(id);
const el = {
  box: $('oyun-kutusu'),
  stage: $('kl-stage'),
  canvas: $('kl-canvas'),
  start: $('kl-start'),
  pause: $('kl-pause'),
  full: $('kl-full'),
  score: $('kl-score'),
  floors: $('kl-floors'),
  perfect: $('kl-perfect'),
  bestNum: $('kl-best-num'),
  best: $('kl-best'),
  live: $('kl-live'),
  result: $('kl-result'),
  resultTitle: $('kl-result-title'),
  resultText: $('kl-result-text'),
  rScore: $('kl-r-score'),
  rFloors: $('kl-r-floors'),
  rPerfect: $('kl-r-perfect'),
  rBest: $('kl-r-best'),
};
const ctx = el.canvas.getContext('2d');

/* ---------- Kalıcı depo ---------- */

function loadStore() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
    return { best: Number(raw.best) > 0 ? Number(raw.best) : 0, bestFloors: Number(raw.bestFloors) > 0 ? Number(raw.bestFloors) : 0 };
  } catch (e) {
    return { best: 0, bestFloors: 0 };
  }
}
function saveStore() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) { /* özel gezinti vb. */ }
}
const store = loadStore();

/* ---------- Durum ---------- */

const G = {
  state: 'idle', // idle | playing | paused | over
  blocks: [], // yerleşmiş bloklar { x, w }, 0 = zemin bloğu
  cur: null, // kayan blok { x, w, dir }
  debris: [], // düşen parçalar
  rings: [], // mükemmel yerleştirme halkaları
  popups: [], // yüzen yazılar
  score: 0,
  floors: 0,
  perfectCount: 0, // oyun boyunca mükemmel sayısı
  perfectStreak: 0, // ardışık mükemmel
  camY: 0,
  camTarget: 0,
  scale: 1,
  scaleTarget: 1,
  frozen: false, // yalnızca test kancası kullanır
  overAt: 0,
  last: 0,
  raf: 0,
};

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const hueFor = (i) => (200 + i * 14) % 360;
const speed = () => Math.min(SPEED_MAX, SPEED0 + SPEED_STEP * G.floors);
function announce(text) { el.live.textContent = text; }

// Sabit yıldız alanı (rastgele ama oyun boyunca aynı).
const STARS = Array.from({ length: 36 }, (_, i) => ({
  x: (i * 97) % W,
  y: (i * 61 + 13) % H,
  r: 0.6 + ((i * 7) % 5) * 0.25,
  k: 0.04 + ((i * 3) % 4) * 0.03,
}));

/* ---------- Oyun mantığı ---------- */

function reset() {
  G.blocks = [{ x: (W - BASE_W) / 2, w: BASE_W }];
  G.debris = [];
  G.rings = [];
  G.popups = [];
  G.score = 0;
  G.floors = 0;
  G.perfectCount = 0;
  G.perfectStreak = 0;
  G.frozen = false;
  G.camTarget = 0;
  G.scaleTarget = 1;
  spawn();
  renderStats();
}

/** Yeni kayan blok: kenarın dışından girer, yönü her katta değişir. */
function spawn() {
  const top = G.blocks[G.blocks.length - 1];
  const w = top.w;
  const fromLeft = G.blocks.length % 2 === 1;
  G.cur = { x: fromLeft ? -w / 2 : W - w / 2, w, dir: fromLeft ? 1 : -1 };
  G.frozen = false;
}

function rowY(i) { return -(i + 1) * BH; } // i. bloğun üst kenarı (dünya y, yukarı eksi)

function start() {
  reset();
  G.state = 'playing';
  G.last = 0;
  el.result.classList.remove('is-active');
  el.start.disabled = true;
  el.start.textContent = 'Başla';
  el.pause.disabled = false;
  el.pause.textContent = 'Duraklat';
  updateCameraTarget();
  announce('Oyun başladı.');
  el.canvas.focus({ preventScroll: true });
  ensureLoop();
}

function togglePause() {
  if (G.state === 'playing') {
    G.state = 'paused';
    el.pause.textContent = 'Devam et';
    el.start.disabled = false;
    el.start.textContent = 'Yeniden başlat';
    announce('Oyun duraklatıldı.');
    draw();
  } else if (G.state === 'paused') {
    G.state = 'playing';
    G.last = 0;
    el.pause.textContent = 'Duraklat';
    el.start.disabled = true;
    el.start.textContent = 'Başla';
    announce('Oyun devam ediyor.');
    el.canvas.focus({ preventScroll: true });
    ensureLoop();
  }
}

/** Kamera hedefi: kayan blok ekranın yaklaşık %45 yüksekliğinde kalır. */
function updateCameraTarget() {
  G.camTarget = Math.max(0, (G.blocks.length + 1) * BH - (0.55 * H - GROUND));
}

function place() {
  if (G.state !== 'playing' || !G.cur) return;
  const top = G.blocks[G.blocks.length - 1];
  const c = G.cur;
  const row = G.blocks.length;
  const dx = c.x - top.x;
  const overlap = Math.min(c.x + c.w, top.x + top.w) - Math.max(c.x, top.x);

  if (overlap <= MIN_OVERLAP) { // kaçırma: blok tamamen düşer, oyun biter
    G.debris.push(makeDebris(c.x, rowY(row), c.w, row, c.dir));
    G.cur = null;
    gameOver();
    return;
  }

  let nx;
  let nw;
  let points = BASE_POINTS;
  let label = '';
  if (Math.abs(dx) <= PERFECT_TOL) { // mükemmel: kesme yok
    G.perfectStreak += 1;
    G.perfectCount += 1;
    nx = top.x;
    nw = top.w;
    if (G.perfectStreak >= 3 && nw < BASE_W) { // 3+ seride genişleme (merkez korunur)
      const grow = Math.min(REGROW, BASE_W - nw);
      nx -= grow / 2;
      nw += grow;
    }
    const bonus = Math.min(PERFECT_BONUS_MAX, PERFECT_BONUS_STEP * G.perfectStreak);
    points += bonus;
    label = 'Mükemmel! +' + points;
    if (!reduceMotion) G.rings.push({ x: nx, y: rowY(row), w: nw, t: 0 });
  } else { // kesik: taşan kısım düşer
    G.perfectStreak = 0;
    nx = Math.max(c.x, top.x);
    nw = overlap;
    if (c.x < top.x) G.debris.push(makeDebris(c.x, rowY(row), top.x - c.x, row, -1));
    else G.debris.push(makeDebris(top.x + top.w, rowY(row), c.x + c.w - (top.x + top.w), row, 1));
  }

  G.blocks.push({ x: nx, w: nw });
  G.floors += 1;
  G.score += points;
  if (label && !reduceMotion) G.popups.push({ text: label, x: nx + nw / 2, y: rowY(row) - 4, t: 0 });
  spawn();
  updateCameraTarget();
  renderStats();
  announce((label ? 'Mükemmel. ' : '') + 'Kat ' + G.floors + ', skor ' + G.score + '.');
}

function makeDebris(x, y, w, row, dir) {
  return { x, y, w, row, vx: dir * 30, vy: 0, rot: 0, vr: dir * 1.4, alpha: 1 };
}

function gameOver() {
  G.state = 'over';
  G.overAt = performance.now();
  const prevBest = store.best;
  const isRecord = G.score > prevBest;
  if (isRecord) {
    store.best = G.score;
    store.bestFloors = Math.max(store.bestFloors, G.floors);
    saveStore();
  } else if (G.floors > store.bestFloors) {
    store.bestFloors = G.floors;
    saveStore();
  }
  // Oyun bitince kule tamamen görünecek şekilde uzaklaş.
  G.camTarget = 0;
  // Üstte skor yazısı ve sonuç şeridi için yer bırakılır.
  G.scaleTarget = clamp((H - GROUND - 140) / ((G.blocks.length + 1) * BH), 0.25, 1);

  el.start.disabled = false;
  el.start.textContent = 'Yeniden başla';
  el.pause.disabled = true;
  el.pause.textContent = 'Duraklat';
  el.resultTitle.textContent = 'Kule yıkıldı!';
  el.resultText.textContent = isRecord
    ? 'Yeni rekor! ' + G.floors + ' katlık kuleyle en yüksek skorunuzu geçtiniz.'
    : G.floors + ' katlık bir kule yaptınız. En yüksek skorunuz ' + prevBest + '; bir tur daha deneyin.';
  el.rScore.textContent = String(G.score);
  el.rFloors.textContent = String(G.floors);
  el.rPerfect.textContent = String(G.perfectCount);
  el.rBest.textContent = String(store.best);
  el.result.classList.add('is-active');
  renderStats();
  announce('Oyun bitti. Skor ' + G.score + ', ' + G.floors + ' kat.' + (isRecord ? ' Yeni rekor.' : ''));
}

/* ---------- Ekran bilgileri ---------- */

function renderStats() {
  el.score.textContent = String(G.score);
  el.floors.textContent = String(G.floors);
  el.perfect.textContent = String(G.perfectCount);
  el.bestNum.textContent = String(store.best);
  el.best.textContent = store.best
    ? 'En yüksek skor: ' + store.best + ' (' + store.bestFloors + ' kat)'
    : 'En yüksek skor: henüz yok';
}

/* ---------- Güncelleme ve çizim ---------- */

function update(dt) {
  if (G.state === 'playing' || G.state === 'idle') {
    const c = G.cur;
    if (c && !G.frozen) {
      c.x += c.dir * speed() * dt;
      const min = -c.w / 2;
      const max = W - c.w / 2;
      if (c.x >= max) { c.x = max; c.dir = -1; } else if (c.x <= min) { c.x = min; c.dir = 1; }
    }
  }
  // Düşen parçalar
  for (const d of G.debris) {
    d.vy += 900 * dt;
    d.x += d.vx * dt;
    d.y += d.vy * dt;
    d.rot += d.vr * dt;
    if (d.vy > 250) d.alpha = Math.max(0, d.alpha - dt * 1.6);
  }
  G.debris = G.debris.filter((d) => d.alpha > 0 && d.y < 900);
  for (const r of G.rings) r.t += dt;
  G.rings = G.rings.filter((r) => r.t < 0.45);
  for (const p of G.popups) p.t += dt;
  G.popups = G.popups.filter((p) => p.t < 0.9);
  // Kamera
  const kc = reduceMotion ? 1 : 1 - Math.exp(-dt * 5);
  const ks = reduceMotion ? 1 : 1 - Math.exp(-dt * 3.5);
  G.camY += (G.camTarget - G.camY) * kc;
  G.scale += (G.scaleTarget - G.scale) * ks;
}

function isSettled() {
  return Math.abs(G.camY - G.camTarget) < 0.3 && Math.abs(G.scale - G.scaleTarget) < 0.002
    && !G.debris.length && !G.rings.length && !G.popups.length;
}

function drawBlock(x, y, w, hue) {
  const g = ctx.createLinearGradient(x, 0, x + w, 0);
  g.addColorStop(0, 'hsl(' + hue + ' 72% 62%)');
  g.addColorStop(1, 'hsl(' + ((hue + 28) % 360) + ' 72% 48%)');
  ctx.fillStyle = g;
  ctx.fillRect(x, y, w, BH);
  ctx.fillStyle = 'rgba(255,255,255,.28)';
  ctx.fillRect(x, y, w, 3);
  ctx.fillStyle = 'rgba(0,0,0,.18)';
  ctx.fillRect(x, y + BH - 3, w, 3);
  ctx.strokeStyle = 'rgba(0,0,0,.28)';
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y + 0.5, w - 1, BH - 1);
}

/** Oyun bitince kulenin görünmesi için tuvali kapatmayan üst şerit. */
function banner(title, sub) {
  ctx.fillStyle = 'rgba(8,12,28,.72)';
  ctx.fillRect(20, 70, W - 40, 64);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff';
  ctx.font = '700 22px "IBM Plex Sans", "Segoe UI", system-ui, sans-serif';
  ctx.fillText(title, W / 2, 98);
  ctx.font = '500 14px "IBM Plex Sans", "Segoe UI", system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,.92)';
  ctx.fillText(sub, W / 2, 120);
}

function overlay(title, sub) {
  ctx.fillStyle = 'rgba(8,12,28,.55)';
  ctx.fillRect(0, 0, W, H);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff';
  ctx.font = '700 24px "IBM Plex Sans", "Segoe UI", system-ui, sans-serif';
  ctx.fillText(title, W / 2, H / 2 - 6);
  if (sub) {
    ctx.font = '500 14px "IBM Plex Sans", "Segoe UI", system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,.9)';
    ctx.fillText(sub, W / 2, H / 2 + 20);
  }
}

function draw() {
  const n = G.blocks.length;
  // Arka plan: yükseldikçe ton kayar
  const bg = (215 + n * 3) % 360;
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, 'hsl(' + bg + ' 55% 14%)');
  grad.addColorStop(1, 'hsl(' + ((bg + 35) % 360) + ' 50% 30%)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(255,255,255,.55)';
  for (const s of STARS) {
    const y = (((s.y + G.camY * s.k) % H) + H) % H;
    ctx.beginPath();
    ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Dünya: zemin merkezli, kamera ve ölçek uygulanır
  ctx.save();
  ctx.translate(W / 2, H - GROUND);
  ctx.scale(G.scale, G.scale);
  ctx.translate(-W / 2, G.camY);
  ctx.fillStyle = '#1b1e26';
  ctx.fillRect(-W * 2, 0, W * 5, 700);
  ctx.fillStyle = 'hsl(' + ((bg + 160) % 360) + ' 60% 55%)';
  ctx.fillRect(-W * 2, 0, W * 5, 3);

  // Ekran dışındaki blokları çizme (yüksek kulelerde hız için)
  const onScreen = (i) => {
    const sy = H - GROUND + (rowY(i) + G.camY) * G.scale;
    return sy < H + BH && sy > -BH * 2;
  };
  G.blocks.forEach((b, i) => { if (onScreen(i)) drawBlock(b.x, rowY(i), b.w, hueFor(i)); });
  if (G.cur) drawBlock(G.cur.x, rowY(n), G.cur.w, hueFor(n));

  for (const d of G.debris) {
    ctx.save();
    ctx.globalAlpha = d.alpha;
    ctx.translate(d.x + d.w / 2, d.y + BH / 2);
    ctx.rotate(d.rot);
    drawBlock(-d.w / 2, -BH / 2, d.w, hueFor(d.row));
    ctx.restore();
  }
  for (const r of G.rings) {
    const k = r.t / 0.45;
    ctx.strokeStyle = 'rgba(255,255,255,' + (1 - k).toFixed(2) + ')';
    ctx.lineWidth = 2;
    const e = k * 14;
    ctx.strokeRect(r.x - e, r.y - e / 2, r.w + e * 2, BH + e);
  }
  ctx.textAlign = 'center';
  ctx.font = '700 15px "IBM Plex Sans", "Segoe UI", system-ui, sans-serif';
  for (const p of G.popups) {
    const k = p.t / 0.9;
    ctx.globalAlpha = 1 - k;
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = 'rgba(0,0,0,.55)';
    ctx.lineWidth = 3;
    ctx.strokeText(p.text, p.x, p.y - k * 30);
    ctx.fillText(p.text, p.x, p.y - k * 30);
    ctx.globalAlpha = 1;
  }
  ctx.restore();

  // Üst skor yazısı
  ctx.textAlign = 'center';
  ctx.font = '700 40px "IBM Plex Sans", "Segoe UI", system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,.92)';
  ctx.strokeStyle = 'rgba(0,0,0,.35)';
  ctx.lineWidth = 4;
  ctx.strokeText(String(G.score), W / 2, 52);
  ctx.fillText(String(G.score), W / 2, 52);

  if (G.state === 'idle') overlay('Başlamak için dokunun', 'ya da Boşluk tuşuna basın');
  else if (G.state === 'paused') overlay('Duraklatıldı', 'Devam etmek için P veya dokunun');
  else if (G.state === 'over') banner('Kule yıkıldı!', G.floors + ' kat · ' + G.score + ' puan');
}

/* ---------- Döngü: yalnızca animasyon gerektiğinde çalışır ---------- */

function shouldAnimate() {
  if (G.state === 'playing' || G.state === 'idle') return true;
  if (G.state === 'over') return !isSettled();
  return false;
}

function frame(t) {
  G.raf = 0;
  const dt = G.last ? Math.min(0.05, (t - G.last) / 1000) : 0.016;
  G.last = t;
  update(dt);
  draw();
  if (shouldAnimate() && document.visibilityState !== 'hidden') G.raf = requestAnimationFrame(frame);
  else G.last = 0;
}

function ensureLoop() {
  if (!G.raf) G.raf = requestAnimationFrame(frame);
}

/* ---------- Boyutlandırma ---------- */

function fit() {
  const maxW = document.fullscreenElement ? 640 : 420;
  const avail = Math.floor(el.stage.clientWidth || maxW);
  const byHeight = Math.floor(Math.max(300, window.innerHeight * (document.fullscreenElement ? 0.8 : 0.72)) * (W / H));
  const cssW = clamp(Math.min(avail, maxW, byHeight), 200, maxW);
  const cssH = Math.round(cssW * (H / W));
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  el.canvas.style.width = cssW + 'px';
  el.canvas.style.height = cssH + 'px';
  el.canvas.width = Math.round(cssW * dpr);
  el.canvas.height = Math.round(cssH * dpr);
  ctx.setTransform(el.canvas.width / W, 0, 0, el.canvas.height / H, 0, 0);
  draw();
}

/* ---------- Girdi ---------- */

/** Tek eylem: boşta başlat, oyunda bırak, duraklıyken sürdür. */
function act() {
  if (G.state === 'idle') start();
  else if (G.state === 'playing') place();
  else if (G.state === 'paused') togglePause();
}

el.canvas.addEventListener('pointerdown', (e) => {
  if (e.button > 0) return;
  e.preventDefault();
  act();
});

el.start.addEventListener('click', start);
el.pause.addEventListener('click', togglePause);

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  const tag = e.target && e.target.tagName;
  if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || tag === 'SUMMARY' || tag === 'A') return;
  const isSpace = e.key === ' ' || e.code === 'Space';
  if (e.key === 'p' || e.key === 'P') {
    if (G.state === 'playing' || G.state === 'paused') { e.preventDefault(); togglePause(); }
    return;
  }
  if (!isSpace && e.key !== 'Enter') return;
  // Odak bir düğmedeyse düğmenin kendi davranışı geçerli kalır (çift tetiklenme olmaz).
  if (tag === 'BUTTON') return;
  const inBox = el.box.contains(e.target);
  const live = G.state === 'playing' || G.state === 'paused';
  // Oyun sürerken Boşluk her yerde bırakır; boştayken/bitince yalnızca oyun kutusundaki odakta çalışır
  // (sayfayı Boşluk ile kaydıran okuyucu yanlışlıkla oyunu başlatmasın).
  if (!live && !inBox) return;
  e.preventDefault();
  if (e.repeat) return;
  if (G.state === 'over') {
    if (performance.now() - G.overAt > RESTART_GUARD_MS) start();
  } else {
    act();
  }
});

// Sekme gizlenince oyun kendiliğinden duraklar; geri gelince çizim sürer.
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden' && G.state === 'playing') togglePause();
  else if (document.visibilityState === 'visible') ensureLoop();
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
    fit();
    el.canvas.focus({ preventScroll: true });
  });
}

window.addEventListener('resize', fit);
if (window.ResizeObserver) new ResizeObserver(() => fit()).observe(el.stage);

/* ---------- Test kancası (yalnızca Playwright testleri kullanır) ---------- */

// align(): kayan bloğu dondurup üst bloğa göre hizalar; bırakma gerçek girdiyle (tık/Boşluk) yapılır.
window.__kuleTest = () => {
  const top = G.blocks[G.blocks.length - 1];
  return {
    state: G.state,
    score: G.score,
    floors: G.floors,
    best: store.best,
    perfectStreak: G.perfectStreak,
    perfectCount: G.perfectCount,
    speed: speed(),
    top: { x: top.x, w: top.w },
    block: G.cur ? { x: G.cur.x, w: G.cur.w } : null,
    align(kind, offset) {
      if (!G.cur) return false;
      if (kind === 'perfect') G.cur.x = top.x;
      else if (kind === 'offset') G.cur.x = top.x + (offset || 0);
      else if (kind === 'miss') G.cur.x = top.x + top.w + 10;
      G.frozen = true;
      return true;
    },
  };
};

/* ---------- Başlangıç ---------- */

reset();
fit();
ensureLoop();
