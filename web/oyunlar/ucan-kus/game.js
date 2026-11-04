// Uçan Kuş — canvas çizim, sabit zaman adımlı (dt) fizik, requestAnimationFrame döngüsü.
// Dış kütüphane, görsel, ses ve ağ isteği yok. En yüksek skor ve ayarlar yalnızca bu tarayıcının
// localStorage alanında durur; hiçbir yere gönderilmez.

const STORE_KEY = 'ba-oyun-ucan-kus';

// Mantıksal dünya ölçüleri (canvas bunun ölçeklenmiş hâlidir; fizik ekran boyutundan bağımsızdır)
const W = 360;
const H = 540;
const GROUND_H = 64;
const GROUND_Y = H - GROUND_H;
const BIRD_X = 96;
const BIRD_R = 14; // çizim yarıçapı
const HIT_R = 11; // çarpışma yarıçapı: görünenden biraz küçük, oyuncu lehine
const PIPE_W = 58;
const CAP_H = 22;
const CAP_OVER = 4;
const GAP_MARGIN = 52; // boru aralığı tavana ve zemine bu kadar yaklaşabilir
const DT = 1 / 120; // sabit fizik adımı (saniye)

// Zorluk: boru aralığı, boru hızı ve iki boru arası mesafe
const LEVELS = {
  slow: { label: 'Yavaş', speed: 105, gap: 190, spacing: 220, jump: 120 },
  normal: { label: 'Normal', speed: 135, gap: 160, spacing: 205, jump: 105 },
  fast: { label: 'Hızlı', speed: 170, gap: 138, spacing: 195, jump: 92 },
};
const PHYS = { gravity: 1500, flap: 430, maxFall: 640 };

const THEMES = {
  gunduz: {
    skyTop: '#6fb8e8', skyBottom: '#d6eefb', far: '#9fd3c9', near: '#6db69b', cloud: 'rgba(255,255,255,.92)',
    ground: '#d9c48c', groundTop: '#78a557', stripe: '#c9b277', pipe: '#2f8f83', pipeDark: '#1f6b62', pipeLight: '#5ec0b0',
    celestial: '#ffe48a', celestialGlow: 'rgba(255,228,138,.35)',
  },
  gece: {
    skyTop: '#0d1330', skyBottom: '#2c3a6e', far: '#2a3868', near: '#1d2950', cloud: 'rgba(120,132,176,.35)',
    ground: '#3d3b4d', groundTop: '#2d6a58', stripe: '#33323f', pipe: '#2a7280', pipeDark: '#1b4d58', pipeLight: '#4aa3b2',
    celestial: '#f4f1d8', celestialGlow: 'rgba(244,241,216,.22)',
  },
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
const selLevel = $('opt-level');
const selTheme = $('opt-theme');
const elScore = $('score');
const elBest = $('best');
const elLevel = $('levelx');
const elStatus = $('status');

/* ---------- Kalıcı veri (yalnızca localStorage) ---------- */

const toInt = (v) => (Number.isFinite(v) && v > 0 ? Math.floor(v) : 0);

function loadStore() {
  const def = { best: { slow: 0, normal: 0, fast: 0 }, level: 'normal', theme: 'gunduz' };
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (!raw || typeof raw !== 'object') return def;
    const b = raw.best && typeof raw.best === 'object' ? raw.best : {};
    return {
      best: { slow: toInt(b.slow), normal: toInt(b.normal), fast: toInt(b.fast) },
      level: LEVELS[raw.level] ? raw.level : def.level,
      theme: THEMES[raw.theme] ? raw.theme : def.theme,
    };
  } catch (_) {
    return def; // localStorage kapalı ya da bozuk: oyun yine çalışır, skor saklanmaz
  }
}
const store = loadStore();
function saveStore() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (_) { /* özel gezinme modu */ }
}

/* ---------- Hareket azaltma tercihi ---------- */

const motionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
let reduced = !!(motionQuery && motionQuery.matches); // true: arka plan kaydırması (parallax) kapalı
if (motionQuery && motionQuery.addEventListener) {
  motionQuery.addEventListener('change', (e) => { reduced = e.matches; draw(); sync(); });
}

/* ---------- Oyun durumu ---------- */

let state = 'hazir'; // hazir | bekle | oynuyor | duraklatildi | bitti
let pausedFrom = 'oynuyor';
let level = store.level;
let theme = store.theme;
let overrides = {}; // yalnızca test kancası doldurur
let tune = computeTune();

const bird = { y: GROUND_Y / 2, vy: 0, wing: 0 };
let pipes = [];
let score = 0;
let bestAtStart = 0;
let lastCenter = GROUND_Y / 2;
let reason = '';
let bobT = 0;
let scrollFar = 0;
let scrollNear = 0;
let scrollGround = 0;
let scrollCloud = 0;
let unlockAt = 0; // oyun sonu ekranında kazara tuşla yeniden başlamayı önleyen kısa kilit

function computeTune() {
  const lv = LEVELS[level] || LEVELS.normal;
  return { ...PHYS, ...lv, hover: false, gapCenter: null, ...overrides };
}

function resetGame() {
  level = selLevel.value;
  tune = computeTune();
  bird.y = GROUND_Y / 2 - 10;
  bird.vy = 0;
  bird.wing = 0;
  pipes = [];
  score = 0;
  reason = '';
  bobT = 0;
  bestAtStart = store.best[level];
  lastCenter = GROUND_Y / 2;
}

function rand(min, max) { return min + Math.random() * (max - min); }

function spawnPipe() {
  const half = tune.gap / 2;
  const lo = GAP_MARGIN + half;
  const hi = GROUND_Y - GAP_MARGIN - half;
  let center;
  if (Number.isFinite(tune.gapCenter)) center = tune.gapCenter;
  else center = Math.min(hi, Math.max(lo, lastCenter + rand(-tune.jump, tune.jump)));
  lastCenter = center;
  pipes.push({ x: W + 24, top: center - half, bottom: center + half, passed: false });
}

/* ---------- Fizik adımı ---------- */

function flap() {
  if (state === 'bekle') {
    state = 'oynuyor';
    lockSettings(true);
    announce('Oyun başladı.');
  }
  if (state !== 'oynuyor') return;
  bird.vy = tune.hover ? 0 : -tune.flap;
  bird.wing = 0;
}

function update(dt) {
  bobT += dt;
  bird.wing += dt * (state === 'oynuyor' ? 20 : 9);
  if (!reduced) {
    scrollFar += tune.speed * 0.12 * dt;
    scrollNear += tune.speed * 0.35 * dt;
    scrollGround += tune.speed * dt;
    scrollCloud += tune.speed * 0.05 * dt;
  }
  if (state === 'bekle') {
    bird.y = GROUND_Y / 2 - 10 + Math.sin(bobT * 5) * 6;
    bird.vy = 0;
    return;
  }

  // Kuş: yerçekimi + zıplama (yarı örtük Euler)
  if (tune.hover) {
    bird.vy = 0;
  } else {
    bird.vy = Math.min(bird.vy + tune.gravity * dt, tune.maxFall);
    bird.y += bird.vy * dt;
  }
  if (bird.y < HIT_R) { bird.y = HIT_R; if (bird.vy < 0) bird.vy = 0; } // tavan

  // Borular
  for (const p of pipes) p.x -= tune.speed * dt;
  if (!pipes.length || pipes[pipes.length - 1].x <= W + 24 - tune.spacing) spawnPipe();
  while (pipes.length && pipes[0].x + PIPE_W < -CAP_OVER - 4) pipes.shift();

  // Skor: boru kuşun arkasına geçince
  for (const p of pipes) {
    if (!p.passed && p.x + PIPE_W < BIRD_X - HIT_R) {
      p.passed = true;
      score += 1;
      if (score > store.best[level]) { store.best[level] = score; saveStore(); }
    }
  }

  // Çarpışma
  if (bird.y + HIT_R >= GROUND_Y) { endGame('Yere düştün.'); return; }
  for (const p of pipes) {
    if (BIRD_X + HIT_R > p.x && BIRD_X - HIT_R < p.x + PIPE_W && (bird.y - HIT_R < p.top || bird.y + HIT_R > p.bottom)) {
      endGame('Boruya çarptın.');
      return;
    }
  }
}

/* ---------- Döngü: sabit adım + requestAnimationFrame ---------- */

let rafId = 0;
let lastTs = 0;
let acc = 0;
const running = () => state === 'oynuyor' || state === 'bekle';

function frame(ts) {
  rafId = 0;
  if (!running()) return;
  acc += Math.min(Math.max((ts - lastTs) / 1000, 0), 0.1); // sekme uyuyunca ani atlama olmasın
  lastTs = ts;
  let guard = 0;
  while (acc >= DT && guard++ < 24) {
    acc -= DT;
    update(DT);
    if (!running()) break;
  }
  if (guard >= 24) acc = 0;
  draw();
  sync();
  if (running()) rafId = requestAnimationFrame(frame);
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

// lockMs > 0: düğme kısa süre kapalı kalır (oyuncu Boşluk'a basarken ekranı kazara geçmesin).
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
  selLevel.disabled = lock;
}

function toReady() {
  stopLoop();
  resetGame();
  state = 'hazir';
  lockSettings(false);
  showOverlay('Uçan Kuş', 'Başlat düğmesine basın. Zıplamak için tıklayın, dokunun ya da Boşluk tuşuna basın; borular arasındaki boşluktan geçin.', 'Başlat', false);
  draw();
  sync();
}

function startGame() {
  resetGame();
  state = 'bekle';
  overlay.hidden = true;
  lockSettings(false);
  announce('Hazır. Zıplamak için Boşluk tuşuna basın, tıklayın ya da dokunun.');
  draw();
  sync();
  startLoop();
  stage.focus({ preventScroll: true });
}

function pauseGame() {
  if (!running()) return;
  stopLoop();
  pausedFrom = state;
  state = 'duraklatildi';
  lockSettings(false);
  showOverlay('Duraklatıldı', 'Devam etmek için P tuşuna basın ya da düğmeyi kullanın. Zorluğu değiştirirseniz oyun yeniden başlar.', 'Devam et', true);
  announce('Oyun duraklatıldı.');
  draw();
  sync();
}

function resumeGame() {
  if (state !== 'duraklatildi') return;
  state = pausedFrom;
  overlay.hidden = true;
  lockSettings(state === 'oynuyor');
  announce('Oyun devam ediyor.');
  sync();
  startLoop();
  stage.focus({ preventScroll: true });
}

function endGame(why) {
  stopLoop();
  state = 'bitti';
  reason = why;
  lockSettings(false);
  const record = score > bestAtStart;
  if (score > store.best[level]) store.best[level] = score;
  saveStore();
  const best = store.best[level];
  const text = `${why} Skor: ${score} · En yüksek: ${best}.${record && score > 0 ? ' Yeni rekor!' : ''}`;
  showOverlay('Oyun bitti', text, 'Tekrar oyna', true, 700);
  announce(`Oyun bitti. ${text}`);
  draw();
  sync();
}

function primaryAction() {
  if (state === 'bitti' && performance.now() < unlockAt) return;
  if (state === 'hazir' || state === 'bitti') startGame();
  else if (running()) pauseGame();
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
  setData('level', level);
  setData('theme', theme);
  setData('parallax', reduced ? 'off' : 'on');
  const bestNow = String(Math.max(store.best[level], score));
  if (elScore.textContent !== String(score)) elScore.textContent = String(score);
  if (elBest.textContent !== bestNow) elBest.textContent = bestNow;
  elLevel.textContent = (LEVELS[level] || LEVELS.normal).label;
  btnMain.textContent = { hazir: 'Başlat', bekle: 'Duraklat', oynuyor: 'Duraklat', duraklatildi: 'Devam et', bitti: 'Tekrar oyna' }[state];
}

/* ---------- Çizim (mantıksal W×H dünya, ölçeklenir) ---------- */

let cssW = 0;
let cssH = 0;
let dpr = 1;

function fit() {
  const rect = canvas.getBoundingClientRect();
  cssW = Math.max(1, Math.round(rect.width));
  cssH = Math.max(1, Math.round(rect.height));
  dpr = Math.min(window.devicePixelRatio || 1, 3);
  const pw = Math.round(cssW * dpr);
  const ph = Math.round(cssH * dpr);
  if (canvas.width !== pw || canvas.height !== ph) {
    canvas.width = pw;
    canvas.height = ph; // boyut değişince bağlam sıfırlanır
  }
  draw();
}

// Yıldızlar: sabit tohumlu sahte rastgele, her çizimde aynı yerde
const STARS = (() => {
  let s = 12345;
  const r = () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; };
  return Array.from({ length: 38 }, () => ({ x: r() * W, y: r() * (GROUND_Y - 160), r: 0.6 + r() * 1.1 }));
})();
const CLOUDS = [
  { x: 40, y: 90, s: 1 }, { x: 190, y: 150, s: 0.8 }, { x: 300, y: 60, s: 1.15 }, { x: 120, y: 210, s: 0.7 },
];

function hills(offset, baseY, amp, wavelength, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, GROUND_Y);
  for (let x = 0; x <= W + 8; x += 8) {
    const y = baseY - (Math.sin((x + offset) / wavelength) * amp + Math.sin((x + offset) / (wavelength * 0.43)) * amp * 0.4);
    ctx.lineTo(x, y);
  }
  ctx.lineTo(W, GROUND_Y);
  ctx.closePath();
  ctx.fill();
}

function cloud(x, y, s, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 16 * s, 0, Math.PI * 2);
  ctx.arc(x + 18 * s, y - 8 * s, 20 * s, 0, Math.PI * 2);
  ctx.arc(x + 40 * s, y, 15 * s, 0, Math.PI * 2);
  ctx.rect(x, y, 40 * s, 15 * s);
  ctx.fill();
}

function drawPipe(p, th) {
  const grad = ctx.createLinearGradient(p.x, 0, p.x + PIPE_W, 0);
  grad.addColorStop(0, th.pipeDark);
  grad.addColorStop(0.35, th.pipeLight);
  grad.addColorStop(0.7, th.pipe);
  grad.addColorStop(1, th.pipeDark);
  ctx.fillStyle = grad;
  // Üst boru + başlık
  if (p.top - CAP_H > 0) ctx.fillRect(p.x, 0, PIPE_W, p.top - CAP_H);
  ctx.fillRect(p.x - CAP_OVER, p.top - CAP_H, PIPE_W + CAP_OVER * 2, CAP_H);
  // Alt boru + başlık
  if (GROUND_Y - p.bottom - CAP_H > 0) ctx.fillRect(p.x, p.bottom + CAP_H, PIPE_W, GROUND_Y - p.bottom - CAP_H);
  ctx.fillRect(p.x - CAP_OVER, p.bottom, PIPE_W + CAP_OVER * 2, CAP_H);
  ctx.strokeStyle = th.pipeDark;
  ctx.lineWidth = 2;
  ctx.strokeRect(p.x - CAP_OVER + 1, p.top - CAP_H + 1, PIPE_W + CAP_OVER * 2 - 2, CAP_H - 2);
  ctx.strokeRect(p.x - CAP_OVER + 1, p.bottom + 1, PIPE_W + CAP_OVER * 2 - 2, CAP_H - 2);
}

function drawBird() {
  const tilt = state === 'bekle' || state === 'hazir' ? 0 : Math.max(-0.45, Math.min(1.15, bird.vy / 520));
  ctx.save();
  ctx.translate(BIRD_X, bird.y);
  ctx.rotate(tilt);
  // Kuyruk
  ctx.fillStyle = '#c47f1c';
  ctx.beginPath();
  ctx.moveTo(-11, -2); ctx.lineTo(-23, -7); ctx.lineTo(-21, 3); ctx.lineTo(-11, 5);
  ctx.closePath(); ctx.fill();
  // Gövde
  ctx.fillStyle = '#f2b134';
  ctx.beginPath(); ctx.ellipse(0, 0, 15, 12, 0, 0, Math.PI * 2); ctx.fill();
  // Karın
  ctx.fillStyle = '#fbe3a5';
  ctx.beginPath(); ctx.ellipse(3, 5, 9, 6, 0, 0, Math.PI * 2); ctx.fill();
  // Kanat: çırpma açısı zamana göre değişir
  const wingAngle = Math.sin(bird.wing) * 0.7;
  ctx.save();
  ctx.translate(-4, 1);
  ctx.rotate(wingAngle);
  ctx.fillStyle = '#d9902b';
  ctx.beginPath(); ctx.ellipse(-3, 2, 9, 5, -0.3, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
  // Gaga
  ctx.fillStyle = '#e8552f';
  ctx.beginPath();
  ctx.moveTo(12, -2); ctx.lineTo(23, 2); ctx.lineTo(12, 6);
  ctx.closePath(); ctx.fill();
  // Göz
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.arc(7, -5, 4.2, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#1e2126';
  ctx.beginPath(); ctx.arc(8.4, -4.6, 2, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function outlinedText(text, x, y, font, size) {
  ctx.font = `700 ${size}px ${font}`;
  ctx.textAlign = 'center';
  ctx.lineJoin = 'round';
  ctx.lineWidth = Math.max(4, size / 7);
  ctx.strokeStyle = 'rgba(20,22,26,.65)';
  ctx.strokeText(text, x, y);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(text, x, y);
}

function draw() {
  if (!cssW) return;
  const th = THEMES[theme] || THEMES.gunduz;
  const sx = (cssW * dpr) / W;
  const sy = (cssH * dpr) / H;
  ctx.setTransform(sx, 0, 0, sy, 0, 0);

  // Gökyüzü
  const sky = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
  sky.addColorStop(0, th.skyTop);
  sky.addColorStop(1, th.skyBottom);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  if (theme === 'gece') {
    ctx.fillStyle = 'rgba(255,255,255,.85)';
    for (const st of STARS) { ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2); ctx.fill(); }
  }
  // Güneş / ay
  ctx.fillStyle = th.celestialGlow;
  ctx.beginPath(); ctx.arc(286, 86, 44, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = th.celestial;
  ctx.beginPath(); ctx.arc(286, 86, 26, 0, Math.PI * 2); ctx.fill();
  if (theme === 'gece') {
    ctx.fillStyle = th.skyTop; // aya hilal şekli
    ctx.beginPath(); ctx.arc(296, 80, 22, 0, Math.PI * 2); ctx.fill();
  }

  // Bulutlar (parallax kapalıyken sabit)
  const span = W + 160;
  for (const c of CLOUDS) {
    const cx = (((c.x - scrollCloud) % span) + span) % span - 80;
    cloud(cx, c.y, c.s, th.cloud);
  }
  // Tepeler: uzak ve yakın katman
  hills(scrollFar, GROUND_Y - 70, 22, 58, th.far);
  hills(scrollNear + 120, GROUND_Y - 24, 16, 36, th.near);

  // Borular
  for (const p of pipes) drawPipe(p, th);

  // Zemin
  ctx.fillStyle = th.ground;
  ctx.fillRect(0, GROUND_Y, W, GROUND_H);
  ctx.fillStyle = th.groundTop;
  ctx.fillRect(0, GROUND_Y, W, 10);
  ctx.fillStyle = th.stripe;
  const off = scrollGround % 24;
  for (let x = -24 - off; x < W + 24; x += 24) {
    ctx.beginPath();
    ctx.moveTo(x, GROUND_Y + 10); ctx.lineTo(x + 12, GROUND_Y + 10); ctx.lineTo(x + 2, GROUND_Y + 24); ctx.lineTo(x - 10, GROUND_Y + 24);
    ctx.closePath(); ctx.fill();
  }

  drawBird();

  // Skor ve ipuçları
  const font = '"IBM Plex Mono", ui-monospace, Consolas, monospace';
  if (state !== 'hazir') outlinedText(String(score), W / 2, 70, font, 46);
  if (state === 'bekle') {
    outlinedText('Zıplamak için', W / 2, 300, '"IBM Plex Sans", system-ui, sans-serif', 20);
    outlinedText('dokun ya da Boşluk', W / 2, 326, '"IBM Plex Sans", system-ui, sans-serif', 20);
  }
}

/* ---------- Girdiler: klavye, tıklama/dokunma ---------- */

const isInBox = (el) => el instanceof Node && box.contains(el);

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const t = e.target;
  // Form alanlarında (seçim kutuları vb.) oyun tuşları çalışmasın
  if (t instanceof Element && t.closest('select, input, textarea, [contenteditable="true"]')) return;
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  const isSpace = e.key === ' ' || e.key === 'Spacebar';

  if (key === 'p') {
    if (running()) { pauseGame(); e.preventDefault(); }
    else if (state === 'duraklatildi') { resumeGame(); e.preventDefault(); }
    return;
  }
  if (isSpace || key === 'ArrowUp' || key === 'w') {
    // Odaktaki düğme ya da bağlantı Boşluk'u kendi tıklaması için kullanır; ona karışma
    if (isSpace && t instanceof Element && t.closest('button, a, summary')) return;
    if (running()) {
      if (!e.repeat) flap();
      e.preventDefault(); // oyun sürerken sayfa kaymasın
    } else if (isSpace && isInBox(t)) {
      if (state === 'hazir' || state === 'bitti') primaryAction();
      else if (state === 'duraklatildi') resumeGame();
      e.preventDefault();
    }
    return;
  }
  if (e.key === 'Enter' && isInBox(t) && !(t instanceof Element && t.closest('button, a, summary'))) {
    if (state === 'hazir' || state === 'bitti') { primaryAction(); e.preventDefault(); }
  }
});

// Sahada tıklama ya da dokunma = zıpla (düğmeler hariç)
stage.addEventListener('pointerdown', (e) => {
  if (e.target instanceof Element && e.target.closest('button')) return;
  if (!running()) return;
  e.preventDefault();
  stage.focus({ preventScroll: true });
  flap();
});

/* ---------- Düğmeler, ayarlar, tam ekran ---------- */

btnMain.addEventListener('click', primaryAction);
overlayBtn.addEventListener('click', primaryAction);
btnRestart.addEventListener('click', startGame);

selLevel.addEventListener('change', () => {
  store.level = selLevel.value;
  saveStore();
  if (state !== 'oynuyor') toReady(); // zorluk değişti: yeni ayarla temiz başlangıç
});
selTheme.addEventListener('change', () => {
  theme = THEMES[selTheme.value] ? selTheme.value : 'gunduz';
  store.theme = theme;
  saveStore();
  draw();
  sync();
});

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

/* ---------- Test kancası ---------- */

// Otomatik testler için: yama verilirse ayar geçersiz kılar (gap, gapCenter, hover, speed, gravity …),
// y ve vy kuşu doğrudan yerleştirir. Ağa ya da depoya yazmaz.
window.__kusTest = (patch) => {
  if (patch && typeof patch === 'object') {
    const { y, vy, ...rest } = patch;
    Object.entries(rest).forEach(([k, v]) => { if (v === null) delete overrides[k]; else overrides[k] = v; });
    tune = computeTune();
    if (Number.isFinite(y)) bird.y = y;
    if (Number.isFinite(vy)) bird.vy = vy;
  }
  return {
    state,
    paused: state === 'duraklatildi',
    y: bird.y,
    vy: bird.vy,
    score,
    best: store.best[level],
    level,
    theme,
    reason,
    parallax: !reduced,
    tune: { ...tune },
    pipes: pipes.map((p) => ({ x: p.x, top: p.top, bottom: p.bottom, passed: p.passed })),
  };
};

/* ---------- Başlangıç ---------- */

selLevel.value = level;
selTheme.value = theme;
toReady();
if ('ResizeObserver' in window) new ResizeObserver(fit).observe(stage);
window.addEventListener('resize', fit);
fit();
