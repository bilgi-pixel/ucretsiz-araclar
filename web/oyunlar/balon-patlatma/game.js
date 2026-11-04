// Balon Patlatma — oyun mantığı ve çizim. Saf canvas, kütüphane yok, ses yok, ağ isteği yok.
// Kodda Türkçe yorum, İngilizce tanımlayıcı. Skorlar yalnızca bu cihazın localStorage'ında durur.

const W = 480;              // mantıksal tuval genişliği (CSS ile ölçeklenir)
const H = 600;              // mantıksal tuval yüksekliği
const TIMED_SECONDS = 60;   // süreli mod süresi
const MAX_TIME = 99;        // bonus balonlarla çıkılabilecek en uzun süre
const STORAGE_KEYS = { timed: 'ba-oyun-balon-en-yuksek-sureli', calm: 'ba-oyun-balon-en-yuksek-sakin' };

const $ = (id) => document.getElementById(id);
const canvas = $('game-canvas');
const ctx = canvas.getContext('2d');
const box = $('oyun-kutusu');
const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

// Keskin görüntü için yoğunluk ölçeği (en fazla 2); mantıksal koordinatlar hep W×H.
const dpr = Math.min(2, window.devicePixelRatio || 1);
canvas.width = Math.round(W * dpr);
canvas.height = Math.round(H * dpr);

/* ---------- Depolama (özel sekmede localStorage kapalı olabilir) ---------- */
function readBest(mode) {
  try { return Math.max(0, parseInt(localStorage.getItem(STORAGE_KEYS[mode]) || '0', 10) || 0); } catch { return 0; }
}
function writeBest(mode, value) {
  try { localStorage.setItem(STORAGE_KEYS[mode], String(value)); } catch { /* sessizce geç */ }
}

/* ---------- Oyun durumu ---------- */
const PALETTE = [
  { base: '#e53935', light: '#ff8a80' },
  { base: '#1e88e5', light: '#90caf9' },
  { base: '#43a047', light: '#a5d6a7' },
  { base: '#fbc02d', light: '#fff59d' },
  { base: '#8e24aa', light: '#ce93d8' },
  { base: '#fb8c00', light: '#ffcc80' },
  { base: '#d81b60', light: '#f8bbd0' },
];
const SPECIAL = {
  time:   { base: '#f9a825', light: '#ffe082' },
  shield: { base: '#00838f', light: '#80deea' },
  bomb:   { base: '#263238', light: '#78909c' },
};

let mode = 'timed';          // 'timed' | 'calm'
let state = 'idle';          // 'idle' | 'playing' | 'paused' | 'over'
let balloons = [];
let particles = [];
let floaters = [];
let score = 0;
let combo = 0;
let bestCombo = 0;
let popped = 0;
let timeLeft = TIMED_SECONDS;
let elapsed = 0;
let shield = false;
let spawnTimer = 0;
let shake = 0;
let clock = 0;               // süs balonları ve bulutlar için sürekli zaman
const bests = { timed: readBest('timed'), calm: readBest('calm') };
const kb = { active: false, x: W / 2, y: H / 2 };   // klavye nişangâhı

// Başlangıç ekranındaki süs balonları (etkileşimsiz, test kancasında görünmez).
const decor = [
  { x: 90, y: 330, r: 40, c: 0 }, { x: 200, y: 250, r: 34, c: 1 }, { x: 310, y: 360, r: 44, c: 3 },
  { x: 400, y: 270, r: 36, c: 4 }, { x: 150, y: 450, r: 32, c: 2 }, { x: 350, y: 480, r: 38, c: 5 },
];

const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const speedFactor = () => (mode === 'timed' ? Math.min(2.2, 1 + elapsed / 50) : 1);
const multiplier = () => (mode === 'timed' ? Math.min(5, 1 + Math.floor(combo / 5)) : 1);

/* ---------- Balon üretimi ---------- */
function spawn(centerY) {
  const timed = mode === 'timed';
  let type = 'normal';
  // Özel balonlar ilk saniyelerde çıkmaz; oyuncu önce temel akışı görür.
  if (timed && elapsed > 6) {
    const roll = Math.random();
    const bombChance = Math.min(0.16, 0.06 + elapsed * 0.002);
    if (roll < bombChance) type = 'bomb';
    else if (roll < bombChance + 0.035) type = 'time';
    else if (roll < bombChance + 0.07) type = 'shield';
  }
  const r = rand(30, 44);
  const amp = rand(6, 16);
  const pad = r + amp + 4;
  const colors = type === 'normal' ? PALETTE[Math.floor(Math.random() * PALETTE.length)] : SPECIAL[type];
  const b = {
    type, r, ry: r * 1.22,
    x0: rand(pad, W - pad), x: 0, y: centerY ?? H + r * 1.22 + 8,
    vy: timed ? rand(85, 140) : rand(50, 80),
    amp, sway: rand(1, 2.4), phase: rand(0, Math.PI * 2), t: 0,
    color: colors, pts: r < 36 ? 15 : 10,
  };
  b.x = b.x0 + Math.sin(b.phase) * amp;
  balloons.push(b);
}

function nextSpawnDelay() {
  if (mode === 'calm') return rand(0.9, 1.3);
  return Math.max(0.38, 0.9 - elapsed * 0.009) * rand(0.8, 1.2);
}

/* ---------- Efektler ---------- */
function burst(x, y, color, count) {
  const n = reduceMotion ? Math.min(4, count) : count;
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const s = rand(60, 220);
    particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 40, life: 0, max: rand(0.35, 0.7), size: rand(2.5, 5.5), color });
  }
}
function floater(x, y, text, color) {
  floaters.push({ x, y, text, color, life: 0, max: 0.9 });
}

/* ---------- Patlatma ---------- */
function popBalloon(b) {
  balloons.splice(balloons.indexOf(b), 1);
  burst(b.x, b.y, b.color.base, 14);
  if (b.type === 'bomb') {
    // Bomba "patlatılan balon" sayısına girmez; kalkan varsa tek seferlik korur.
    if (shield) {
      shield = false;
      floater(b.x, b.y, 'Kalkan korudu!', '#00838f');
    } else {
      const loss = Math.min(30, score);
      score -= loss;
      combo = 0;
      if (mode === 'timed') timeLeft = Math.max(0, timeLeft - 3);
      if (!reduceMotion) shake = 0.35;
      floater(b.x, b.y, '−30 puan, −3 sn', '#b71c1c');
    }
    return;
  }
  popped++;
  const mult = multiplier();
  combo++;
  bestCombo = Math.max(bestCombo, combo);
  if (b.type === 'time') {
    timeLeft = Math.min(MAX_TIME, timeLeft + 5);
    score += 10 * mult;
    floater(b.x, b.y, '+5 sn', '#e65100');
  } else if (b.type === 'shield') {
    shield = true;
    score += 10 * mult;
    floater(b.x, b.y, 'Kalkan hazır', '#006064');
  } else {
    const gain = b.pts * mult;
    score += gain;
    floater(b.x, b.y, `+${gain}`, '#1b5e20');
  }
}

// Mantıksal koordinatta (x, y) bir dokunuş/tıklama: en üstteki balonu patlatır.
function tapAt(x, y) {
  if (state !== 'playing') return false;
  const tol = 10; // parmakla isabeti kolaylaştıran pay
  for (let i = balloons.length - 1; i >= 0; i--) {
    const b = balloons[i];
    const dx = (x - b.x) / (b.r + tol);
    const dy = (y - b.y) / (b.ry + tol);
    if (dx * dx + dy * dy <= 1) { popBalloon(b); return true; }
  }
  // Iskalama: yalnızca süreli modda seriyi bozar; sakin modda ceza yok.
  if (mode === 'timed' && combo > 0) { combo = 0; floater(x, y, 'ıska', '#5f6368'); }
  return false;
}

/* ---------- Güncelleme ---------- */
function update(dt) {
  elapsed += dt;
  if (mode === 'timed') {
    timeLeft -= dt;
    if (timeLeft <= 0) { timeLeft = 0; endGame('time'); return; }
  }
  spawnTimer -= dt;
  while (spawnTimer <= 0 && balloons.length < 40) { spawn(); spawnTimer += nextSpawnDelay(); }
  if (spawnTimer < -1) spawnTimer = 0;

  const sf = speedFactor();
  for (let i = balloons.length - 1; i >= 0; i--) {
    const b = balloons[i];
    b.t += dt;
    b.y -= b.vy * sf * dt;
    b.x = b.x0 + Math.sin(b.t * b.sway + b.phase) * b.amp;
    if (b.y + b.ry + 40 < 0) {
      // Kaçan sıradan balon süreli modda seriyi bozar; bomba ve özel balonlar sessizce gider.
      if (b.type === 'normal' && mode === 'timed' && combo > 0) combo = 0;
      balloons.splice(i, 1);
    }
  }
  tickEffects(dt);
}

function tickEffects(dt) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.life += dt;
    if (p.life >= p.max) { particles.splice(i, 1); continue; }
    p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 420 * dt;
  }
  for (let i = floaters.length - 1; i >= 0; i--) {
    const f = floaters[i];
    f.life += dt;
    if (f.life >= f.max) { floaters.splice(i, 1); continue; }
    f.y -= 46 * dt;
  }
  if (shake > 0) shake = Math.max(0, shake - dt);
}

/* ---------- Çizim ---------- */
function drawBackground() {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#8fd3fe');
  g.addColorStop(1, '#eaf7ff');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  // Yavaş akan bulutlar
  ctx.fillStyle = 'rgba(255,255,255,.75)';
  for (let i = 0; i < 4; i++) {
    const cx = ((i * 190 + clock * (6 + i * 3)) % (W + 160)) - 80;
    const cy = 70 + i * 120 + (i % 2) * 24;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 52, 17, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 28, cy - 12, 32, 15, 0, 0, Math.PI * 2);
    ctx.ellipse(cx - 26, cy - 8, 26, 12, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawBalloon(b) {
  const { x, y, r, ry } = b;
  const sway = Math.sin(clock * 3 + b.phase) * 6;
  // İp
  ctx.strokeStyle = 'rgba(55,60,70,.6)';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(x, y + ry + 6);
  ctx.bezierCurveTo(x + sway, y + ry + 16, x - sway, y + ry + 28, x + sway * 0.5, y + ry + 42);
  ctx.stroke();
  // Gövde
  const g = ctx.createRadialGradient(x - r * 0.35, y - ry * 0.4, r * 0.1, x, y, ry);
  g.addColorStop(0, b.color.light);
  g.addColorStop(1, b.color.base);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.ellipse(x, y, r, ry, 0, 0, Math.PI * 2);
  ctx.fill();
  if (b.type === 'bomb') {
    ctx.strokeStyle = '#ff5252';
    ctx.lineWidth = 3;
    ctx.setLineDash([6, 5]);
    ctx.stroke();
    ctx.setLineDash([]);
  }
  // Düğüm
  ctx.fillStyle = b.color.base;
  ctx.beginPath();
  ctx.moveTo(x, y + ry - 2);
  ctx.lineTo(x - 7, y + ry + 8);
  ctx.lineTo(x + 7, y + ry + 8);
  ctx.closePath();
  ctx.fill();
  // Parlama
  ctx.fillStyle = 'rgba(255,255,255,.42)';
  ctx.beginPath();
  ctx.ellipse(x - r * 0.4, y - ry * 0.42, r * 0.15, ry * 0.26, -0.5, 0, Math.PI * 2);
  ctx.fill();
  // Türü belirten simge (yalnızca renge bağlı kalmasın diye)
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  if (b.type === 'time') {
    ctx.fillStyle = '#3b2a00';
    ctx.font = '700 22px system-ui, sans-serif';
    ctx.fillText('+5', x, y - 3);
    ctx.font = '700 11px system-ui, sans-serif';
    ctx.fillText('SN', x, y + 15);
  } else if (b.type === 'shield') {
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(x, y - 15);
    ctx.lineTo(x + 12, y - 10);
    ctx.lineTo(x + 12, y + 2);
    ctx.quadraticCurveTo(x + 12, y + 12, x, y + 18);
    ctx.quadraticCurveTo(x - 12, y + 12, x - 12, y + 2);
    ctx.lineTo(x - 12, y - 10);
    ctx.closePath();
    ctx.stroke();
  } else if (b.type === 'bomb') {
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 30px system-ui, sans-serif';
    ctx.fillText('!', x, y + 1);
    // Fitil kıvılcımı
    ctx.strokeStyle = '#ffb300';
    ctx.lineWidth = 2;
    const fl = (Math.sin(clock * 20 + b.phase) + 1) * 2;
    ctx.beginPath();
    ctx.moveTo(x, y - ry);
    ctx.lineTo(x + 4, y - ry - 8);
    ctx.stroke();
    ctx.fillStyle = '#ff6d00';
    ctx.beginPath();
    ctx.arc(x + 4, y - ry - 10, 3 + fl * 0.4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawPill(x, y, w, color, text) {
  ctx.fillStyle = color;
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(x, y, w, 28, 14); else ctx.rect(x, y, w, 28); // eski tarayıcılarda düz dikdörtgen
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = '700 14px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x + w / 2, y + 15);
}

function drawHud() {
  // Süre çubuğu (süreli mod)
  if (mode === 'timed') {
    const ratio = clamp(timeLeft / TIMED_SECONDS, 0, 1);
    ctx.fillStyle = 'rgba(0,0,0,.18)';
    ctx.fillRect(0, 0, W, 8);
    ctx.fillStyle = ratio > 0.25 ? '#2e7d32' : '#c62828';
    ctx.fillRect(0, 0, W * ratio, 8);
  }
  if (shield) drawPill(10, 16, 112, 'rgba(0,96,100,.94)', 'Kalkan hazır');
  const m = multiplier();
  if (state !== 'idle' && m > 1) drawPill(W - 100, 16, 90, 'rgba(183,28,28,.94)', `Kombo ×${m}`);
}

function drawKeyboardCursor() {
  if (!kb.active || state !== 'playing') return;
  ctx.beginPath();
  ctx.arc(kb.x, kb.y, 16, 0, Math.PI * 2);
  ctx.moveTo(kb.x - 24, kb.y); ctx.lineTo(kb.x - 8, kb.y);
  ctx.moveTo(kb.x + 8, kb.y); ctx.lineTo(kb.x + 24, kb.y);
  ctx.moveTo(kb.x, kb.y - 24); ctx.lineTo(kb.x, kb.y - 8);
  ctx.moveTo(kb.x, kb.y + 8); ctx.lineTo(kb.x, kb.y + 24);
  ctx.strokeStyle = '#1e2126';
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.6;
  ctx.stroke();
}

function draw() {
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.save();
  if (shake > 0) ctx.translate(rand(-5, 5) * (shake / 0.35), rand(-5, 5) * (shake / 0.35));
  drawBackground();
  if (state === 'idle') {
    for (const d of decor) {
      const y = d.y + Math.sin(clock * 1.4 + d.x) * 8;
      drawBalloon({ type: 'normal', x: d.x, y, r: d.r, ry: d.r * 1.22, phase: d.x, color: PALETTE[d.c] });
    }
  }
  for (const b of balloons) drawBalloon(b);
  for (const p of particles) {
    ctx.globalAlpha = 1 - p.life / p.max;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '800 22px system-ui, sans-serif';
  for (const f of floaters) {
    ctx.globalAlpha = 1 - f.life / f.max;
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(255,255,255,.9)';
    ctx.strokeText(f.text, clamp(f.x, 70, W - 70), f.y);
    ctx.fillStyle = f.color;
    ctx.fillText(f.text, clamp(f.x, 70, W - 70), f.y);
  }
  ctx.globalAlpha = 1;
  ctx.restore();
  drawHud();
  drawKeyboardCursor();
}

/* ---------- Arayüz (DOM) ---------- */
const el = {
  score: $('hud-score'), time: $('hud-time'), best: $('hud-best'), combo: $('hud-combo'),
  overlay: $('overlay'), ovTitle: $('ov-title'), ovText: $('ov-text'), ovPrimary: $('ov-primary'),
  pause: $('btn-pause'), restart: $('btn-restart'), finish: $('btn-finish'), full: $('btn-full'),
  modeTimed: $('mode-timed'), modeCalm: $('mode-calm'), live: $('live'),
};
const shown = {}; // DOM'u gereksiz yere yazmamak için son değerler

function setText(key, value) {
  if (shown[key] !== value) { shown[key] = value; el[key].textContent = value; }
}

function renderHud() {
  setText('score', String(score));
  setText('time', mode === 'calm' ? 'Sakin' : String(Math.ceil(timeLeft)));
  setText('best', String(Math.max(bests[mode], score)));
  const m = multiplier();
  setText('combo', mode === 'calm' ? String(combo) : `${combo}${m > 1 ? ` ×${m}` : ''}`);
}

function announce(msg) { el.live.textContent = msg; }

function showOverlay(title, text, primaryLabel) {
  el.ovTitle.textContent = title;
  el.ovText.textContent = text;
  el.ovPrimary.textContent = primaryLabel;
  el.overlay.hidden = false;
}

function setState(next) {
  state = next;
  const active = next === 'playing' || next === 'paused';
  canvas.classList.toggle('is-playing', next === 'playing');
  box.dataset.state = next;
  el.pause.disabled = !active;
  el.pause.textContent = next === 'paused' ? 'Devam et' : 'Duraklat';
  el.finish.disabled = !active;
  el.restart.disabled = next === 'idle';
  el.modeTimed.disabled = active;
  el.modeCalm.disabled = active;
  if (next === 'playing') el.overlay.hidden = true;
}

function setMode(next) {
  if (state === 'playing' || state === 'paused') return;
  mode = next;
  el.modeTimed.setAttribute('aria-pressed', String(next === 'timed'));
  el.modeCalm.setAttribute('aria-pressed', String(next === 'calm'));
  balloons = []; particles = []; floaters = []; score = 0; combo = 0; timeLeft = TIMED_SECONDS;
  setState('idle');
  showOverlay('Balon Patlatma',
    next === 'timed'
      ? '60 saniyede olabildiğince çok balon patlat. Bombalardan kaç, bonus balonları kaçırma.'
      : 'Sakin mod: süre, bomba ve ceza yok. İstediğin kadar balon patlat, bitirmek için “Bitir”e bas.',
    'Oyunu başlat');
}

function startGame() {
  balloons = []; particles = []; floaters = [];
  score = 0; combo = 0; bestCombo = 0; popped = 0; elapsed = 0; shield = false; shake = 0;
  timeLeft = TIMED_SECONDS;
  // Ekran boş görünmesin: birkaç balon hazır başlasın
  for (let i = 0; i < 5; i++) spawn(H * (0.3 + 0.13 * i));
  spawnTimer = 0.5;
  setState('playing');
  announce(mode === 'timed' ? 'Oyun başladı. 60 saniyen var.' : 'Sakin mod başladı.');
  canvas.focus({ preventScroll: true });
}

function togglePause() {
  if (state === 'playing') {
    setState('paused');
    showOverlay('Duraklatıldı', `Skor: ${score}. Hazır olunca devam et.`, 'Devam et');
    announce('Oyun duraklatıldı.');
  } else if (state === 'paused') {
    setState('playing');
    announce('Oyun devam ediyor.');
    canvas.focus({ preventScroll: true });
  }
}

function endGame(reason) {
  if (state !== 'playing' && state !== 'paused') return;
  let record = false;
  if (score > bests[mode]) { bests[mode] = score; writeBest(mode, score); record = true; }
  setState('over');
  const title = reason === 'time' ? 'Süre doldu!' : 'Oyun bitti';
  const text = `Skorun ${score}. ${popped} balon patlattın, en uzun serin ${bestCombo}. `
    + (record ? 'Yeni en yüksek skor!' : `En yüksek skor: ${bests[mode]}.`);
  showOverlay(title, text, 'Tekrar oyna');
  announce(`${title} ${text}`);
  el.ovPrimary.focus({ preventScroll: true });
}

/* ---------- Olaylar ---------- */
function toLogical(e) {
  const rect = canvas.getBoundingClientRect();
  return { x: ((e.clientX - rect.left) * W) / rect.width, y: ((e.clientY - rect.top) * H) / rect.height };
}

canvas.addEventListener('pointerdown', (e) => {
  if (state !== 'playing') return;
  e.preventDefault();
  kb.active = false;
  const p = toLogical(e);
  tapAt(p.x, p.y);
});

canvas.addEventListener('keydown', (e) => {
  if (state !== 'playing') return;
  const step = e.shiftKey ? 48 : 18;
  let handled = true;
  switch (e.key) {
    case 'ArrowLeft': kb.x = clamp(kb.x - step, 0, W); break;
    case 'ArrowRight': kb.x = clamp(kb.x + step, 0, W); break;
    case 'ArrowUp': kb.y = clamp(kb.y - step, 0, H); break;
    case 'ArrowDown': kb.y = clamp(kb.y + step, 0, H); break;
    case 'Enter': case ' ': kb.active = true; tapAt(kb.x, kb.y); break;
    default: handled = false;
  }
  if (handled) { kb.active = true; e.preventDefault(); }
});

window.addEventListener('keydown', (e) => {
  if ((e.key === 'p' || e.key === 'P') && !e.ctrlKey && !e.metaKey && !e.altKey) togglePause();
});

// Sekme gizlenirse ya da pencere odağı giderse oyun kendiliğinden duraklar.
document.addEventListener('visibilitychange', () => { if (document.hidden && state === 'playing') togglePause(); });
window.addEventListener('blur', () => { if (state === 'playing') togglePause(); });
window.addEventListener('pagehide', () => { if (score > bests[mode]) writeBest(mode, score); });

el.ovPrimary.addEventListener('click', () => {
  if (state === 'paused') togglePause();
  else startGame();
});
el.pause.addEventListener('click', togglePause);
el.restart.addEventListener('click', startGame);
el.finish.addEventListener('click', () => endGame('manual'));
el.modeTimed.addEventListener('click', () => setMode('timed'));
el.modeCalm.addEventListener('click', () => setMode('calm'));

// Tam ekran: yalnızca oyun kutusu büyür, sayfadaki reklam alanları görünmez olur.
if (document.fullscreenEnabled && box.requestFullscreen) {
  el.full.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else box.requestFullscreen().catch(() => {});
  });
} else {
  el.full.hidden = true;
}

/* ---------- Döngü ---------- */
let last = performance.now();
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  clock += dt;
  if (state === 'playing') update(dt);
  draw();
  renderHud();
  requestAnimationFrame(frame);
}

/* ---------- Test kancası: balonların sayfa (viewport) koordinatları ---------- */
// Playwright testi buradan bir balonun ekran koordinatını okuyup tıklar.
// shorten() yalnızca süreyi KISALTIR; kalan süreyi uzatarak hile yapılamaz.
window.__balonTest = Object.assign(() => {
  const rect = canvas.getBoundingClientRect();
  const sx = rect.width / W;
  const sy = rect.height / H;
  return {
    state, mode, score, combo, timeLeft, shield, best: bests[mode],
    kb: { active: kb.active, x: kb.x, y: kb.y },
    canvas: { left: rect.left, top: rect.top, width: rect.width, height: rect.height },
    balloons: balloons.map((b) => ({ type: b.type, cx: rect.left + b.x * sx, cy: rect.top + b.y * sy, r: b.r * sx, y: b.y })),
  };
}, {
  shorten(seconds) { if (mode === 'timed' && state === 'playing') timeLeft = Math.min(timeLeft, Math.max(0.05, seconds)); },
});

setMode('timed');
requestAnimationFrame(frame);
