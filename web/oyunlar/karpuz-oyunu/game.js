// Karpuz Oyunu — aynı meyveleri çarpıştır, birleşip büyüsünler; kirazdan karpuza ulaş.
// Tamamen istemci tarafı: fizik fizik.js'te (kütüphanesiz), meyveler canvas ile bizim çizimimiz; dış istek, çerez, izleme yok.
// En yüksek skor ve ses tercihi yalnızca bu cihazın localStorage alanına yazılır (ba-oyun-karpuz-oyunu).
import {
  W, H, LEFT, RIGHT, FLOOR, BOX_TOP, LINE_Y, DROP_Y, STEP, FRUITS, MAX_LVL, OVER_LIMIT, IMMUNITY, KARPUZ_BONUS, DROP_COOLDOWN,
  createWorld, dropFruit, canDrop, stepWorld, advance, spawnBody, fruitSequence, mulberry32, boundsViolations,
} from './fizik.js';

const KEY = 'ba-oyun-karpuz-oyunu';
const TAU = Math.PI * 2;
const DROPPER_SPEED = 330; // ok tuşu/ekran düğmesi basılıyken bırakıcı hızı (birim/sn)
const NUDGE = 8; // tek tuş vuruşunda kayma
const MAX_FRAME = 0.1; // sekme takılırsa en fazla bu kadar zaman işlenir
const RESTART_GUARD_MS = 700; // oyun bitince Boşluk ile anında yeniden başlamayı önler
const FONT = '"IBM Plex Sans", "Segoe UI", system-ui, sans-serif';
const motionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
const reduceMotion = () => !!(motionQuery && motionQuery.matches);
const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

const $ = (id) => document.getElementById(id);
const el = {
  box: $('oyun-kutusu'),
  stage: $('ko-stage'),
  canvas: $('ko-canvas'),
  next: $('ko-next-canvas'),
  nextName: $('ko-next'),
  cur: $('ko-cur'),
  score: $('ko-score'),
  best: $('ko-best'),
  biggest: $('ko-biggest'),
  start: $('ko-start'),
  pause: $('ko-pause'),
  sound: $('ko-sound'),
  full: $('ko-full'),
  left: $('ko-left'),
  right: $('ko-right'),
  drop: $('ko-drop'),
  live: $('ko-live'),
  warn: $('ko-warn'),
  seed: $('ko-seed'),
  seedLink: $('ko-seed-link'),
  result: $('ko-result'),
  rTitle: $('ko-r-title'),
  rText: $('ko-r-text'),
  rScore: $('ko-r-score'),
  rBest: $('ko-r-best'),
  rBiggest: $('ko-r-biggest'),
  rMerges: $('ko-r-merges'),
  again: $('ko-again'),
};
const ctx = el.canvas.getContext('2d');
const nctx = el.next.getContext('2d');

/* ---------- Kalıcı depo (bozuk veriye karşı korumalı) ---------- */
const safeInt = (v, max) => (typeof v === 'number' && Number.isFinite(v) && v > 0 ? Math.min(max, Math.floor(v)) : 0);
function loadStore() {
  const s = { best: 0, games: 0, biggest: 0, sound: false };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return s;
    const o = JSON.parse(raw);
    if (!o || typeof o !== 'object' || Array.isArray(o)) return s;
    s.best = safeInt(o.best, 1e9);
    s.games = safeInt(o.games, 1e7);
    s.biggest = Math.min(MAX_LVL, safeInt(o.biggest, MAX_LVL));
    s.sound = o.sound === true;
  } catch (e) { /* bozuk kayıt ya da depolama kapalı: varsayılana dön */ }
  return s;
}
const store = loadStore();
function saveStore() {
  try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* özel gezinti vb. */ }
}

/* ---------- Tohum (isteğe bağlı ?tohum= bağlantısı) ---------- */
function randomSeed() {
  try {
    const a = new Uint32Array(1);
    crypto.getRandomValues(a);
    return a[0];
  } catch (e) {
    return Math.floor(Math.random() * 4294967296) >>> 0;
  }
}
function parseUrlSeed() {
  let raw = null;
  try { raw = new URLSearchParams(window.location.search).get('tohum'); } catch (e) { raw = null; }
  if (raw === null) return { seed: null, invalid: false };
  const s = raw.trim();
  if (/^\d{1,10}$/.test(s) && Number(s) <= 4294967295) return { seed: Number(s), invalid: false };
  return { seed: null, invalid: true };
}
const urlSeed = parseUrlSeed();

/* ---------- Durum ---------- */
const G = {
  phase: 'idle', // idle | playing | paused | over
  w: createWorld(urlSeed.seed !== null ? urlSeed.seed : randomSeed()),
  dropX: W / 2,
  frozen: false, // test kancası: gerçek zamanlı ilerlemeyi durdurur
  silent: false, // uzun simülasyonda ses/efekt/kayıt yok
  acc: 0,
  last: 0,
  raf: 0,
  keyDir: 0,
  btnDir: 0,
  aiming: null,
  overAt: 0,
  scale: 0,
  sprites: [],
  shades: [],
  particles: [],
  rings: [],
  popups: [],
  shownNext: 0,
  stageW: 0,
};

/* ---------- Ses (WebAudio, varsayılan kapalı; dışarıdan dosya yüklenmez) ---------- */
let audioCtx = null;
function ensureAudio() {
  try {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      audioCtx = new AC();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
  } catch (e) { return null; }
  return audioCtx;
}
function tone(freq, dur, type, vol, delay) {
  if (!store.sound || G.silent) return;
  const ac = ensureAudio();
  if (!ac) return;
  try {
    const t0 = ac.currentTime + (delay || 0);
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = type || 'sine';
    o.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol || 0.06, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(ac.destination);
    o.start(t0);
    o.stop(t0 + dur + 0.02);
  } catch (e) { /* ses kapalı kalır */ }
}
function sfx(kind, lvl) {
  if (kind === 'drop') tone(180, 0.06, 'triangle', 0.035);
  else if (kind === 'merge') tone(240 * Math.pow(2, (lvl - 2) / 5), 0.14, 'sine', 0.07);
  else if (kind === 'karpuz') { [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.16, 'triangle', 0.06, i * 0.09)); }
  else if (kind === 'over') { tone(300, 0.2, 'sawtooth', 0.04); tone(200, 0.32, 'sawtooth', 0.04, 0.18); }
}

/* ---------- Meyve çizimleri (kendi çizimimiz; dönen doku + dönmeyen gölge) ---------- */
function disc(c, x, y, r, col) {
  c.fillStyle = col;
  c.beginPath();
  c.arc(x, y, r, 0, TAU);
  c.fill();
}
function leaf(c, x, y, len, wid, ang, col) {
  c.save();
  c.translate(x, y);
  c.rotate(ang);
  c.fillStyle = col;
  c.beginPath();
  c.moveTo(0, 0);
  c.quadraticCurveTo(len * 0.5, -wid, len, 0);
  c.quadraticCurveTo(len * 0.5, wid, 0, 0);
  c.fill();
  c.strokeStyle = 'rgba(0,0,0,.2)';
  c.lineWidth = Math.max(0.5, wid * 0.14);
  c.beginPath();
  c.moveTo(0, 0);
  c.lineTo(len * 0.85, 0);
  c.stroke();
  c.restore();
}
function stem(c, x0, y0, cx, cy, x1, y1, w, col) {
  c.strokeStyle = col;
  c.lineWidth = w;
  c.lineCap = 'round';
  c.beginPath();
  c.moveTo(x0, y0);
  c.quadraticCurveTo(cx, cy, x1, y1);
  c.stroke();
}
function speckle(c, rnd, r, count, size, col, avoidTop) {
  c.fillStyle = col;
  for (let i = 0; i < count; i++) {
    const ang = rnd() * TAU;
    const d = Math.sqrt(rnd()) * r * 0.95;
    const x = Math.cos(ang) * d;
    const y = Math.sin(ang) * d;
    const s = size * (0.7 + rnd() * 0.6);
    if (avoidTop && y < -0.55 * r && Math.abs(x) < 0.45 * r) continue;
    c.beginPath();
    c.ellipse(x, y, s, s * 0.75, ang, 0, TAU);
    c.fill();
  }
}

function paintFruit(c, lvl, r) {
  const rnd = mulberry32(lvl * 7919 + 13); // doku hep aynı görünsün
  c.save();
  c.beginPath();
  c.arc(0, 0, r, 0, TAU);
  c.clip();
  const base = (col) => { c.fillStyle = col; c.fillRect(-r - 1, -r - 1, 2 * r + 2, 2 * r + 2); };
  switch (lvl) {
    case 1: // kiraz
      base('#cf1530');
      disc(c, 0, -0.74 * r, 0.16 * r, '#8c0a1e');
      stem(c, 0, -0.72 * r, 0.05 * r, -0.95 * r, 0.32 * r, -1.1 * r, 0.16 * r, '#5d3a1a');
      leaf(c, 0.1 * r, -0.86 * r, 0.62 * r, 0.24 * r, -0.45, '#3f9b3a');
      break;
    case 2: // çilek
      base('#e3263a');
      speckle(c, rnd, r, 22, 0.06 * r, '#ffd966', true);
      for (let k = 0; k < 6; k++) leaf(c, 0, -0.78 * r, 0.5 * r, 0.17 * r, k * (TAU / 6) + 0.25, k % 2 ? '#2f8f3a' : '#3fa34a');
      disc(c, 0, -0.78 * r, 0.12 * r, '#2a7a33');
      break;
    case 3: { // üzüm salkımı
      base('#3e1a63');
      const pts = [[0, 0.05]];
      for (let k = 0; k < 6; k++) pts.push([Math.cos(k * (TAU / 6) + Math.PI / 6) * 0.6, 0.05 + Math.sin(k * (TAU / 6) + Math.PI / 6) * 0.6]);
      for (const [px, py] of pts) {
        disc(c, px * r, py * r, 0.36 * r, '#8a47c4');
        disc(c, px * r - 0.1 * r, py * r - 0.12 * r, 0.1 * r, 'rgba(255,255,255,.3)');
      }
      stem(c, 0, -0.5 * r, -0.05 * r, -0.8 * r, 0.06 * r, -1.05 * r, 0.11 * r, '#6b8e23');
      break;
    }
    case 4: // mandalina
      base('#f26a1b');
      speckle(c, rnd, r, 34, 0.035 * r, '#d4520c', false);
      leaf(c, 0.04 * r, -0.82 * r, 0.6 * r, 0.22 * r, -0.4, '#3d8b37');
      leaf(c, -0.02 * r, -0.82 * r, 0.42 * r, 0.16 * r, -2.7, '#4c9e3f');
      disc(c, 0, -0.82 * r, 0.1 * r, '#4d7a26');
      break;
    case 5: // portakal
      base('#ff9f1c');
      speckle(c, rnd, r, 50, 0.03 * r, '#e58307', false);
      disc(c, 0, -0.8 * r, 0.08 * r, '#a86a0a');
      leaf(c, 0.04 * r, -0.84 * r, 0.48 * r, 0.17 * r, -0.75, '#4a8f2f');
      break;
    case 6: // elma
      base('#d42a2a');
      c.strokeStyle = 'rgba(240,110,100,.45)';
      c.lineWidth = 0.05 * r;
      for (let k = -3; k <= 3; k++) {
        c.beginPath();
        c.moveTo(k * 0.18 * r, -0.7 * r);
        c.quadraticCurveTo(k * 0.32 * r, 0, k * 0.2 * r, 0.9 * r);
        c.stroke();
      }
      disc(c, -0.35 * r, 0.3 * r, 0.5 * r, 'rgba(255,200,80,.22)');
      c.fillStyle = '#9b1219';
      c.beginPath();
      c.ellipse(0, -0.78 * r, 0.2 * r, 0.08 * r, 0, 0, TAU);
      c.fill();
      stem(c, 0, -0.78 * r, 0.02 * r, -0.95 * r, 0.1 * r, -1.1 * r, 0.07 * r, '#5d3a1a');
      leaf(c, 0.05 * r, -0.9 * r, 0.46 * r, 0.17 * r, -0.35, '#4caf50');
      break;
    case 7: // armut
      base('#c3d43f');
      disc(c, 0.3 * r, 0.35 * r, 0.55 * r, 'rgba(240,160,60,.3)');
      disc(c, 0, -0.85 * r, 0.45 * r, 'rgba(120,150,30,.35)');
      speckle(c, rnd, r, 46, 0.025 * r, 'rgba(110,100,40,.7)', true);
      stem(c, 0, -0.74 * r, -0.02 * r, -0.95 * r, -0.1 * r, -1.1 * r, 0.06 * r, '#5d3a1a');
      leaf(c, -0.05 * r, -0.88 * r, 0.4 * r, 0.15 * r, -2.5, '#5aa63a');
      break;
    case 8: // şeftali
      base('#ffb38a');
      disc(c, 0.3 * r, -0.05 * r, 0.75 * r, 'rgba(255,90,80,.42)');
      disc(c, 0.42 * r, 0.12 * r, 0.4 * r, 'rgba(230,60,60,.22)');
      c.strokeStyle = 'rgba(226,114,91,.75)';
      c.lineWidth = 0.045 * r;
      c.lineCap = 'round';
      c.beginPath();
      c.moveTo(0, -r);
      c.quadraticCurveTo(-0.28 * r, -0.2 * r, 0.06 * r, 0.6 * r);
      c.stroke();
      leaf(c, 0.02 * r, -0.9 * r, 0.45 * r, 0.17 * r, -0.6, '#5a9e3a');
      break;
    case 9: { // ananas
      base('#f2b21b');
      const s = 0.3 * r;
      c.strokeStyle = 'rgba(176,112,0,.75)';
      c.lineWidth = 0.04 * r;
      for (let m = -9; m <= 9; m++) {
        c.beginPath(); c.moveTo(m * s - 2 * r, -2 * r); c.lineTo(m * s + 2 * r, 2 * r); c.stroke();
        c.beginPath(); c.moveTo(m * s + 2 * r, -2 * r); c.lineTo(m * s - 2 * r, 2 * r); c.stroke();
      }
      c.fillStyle = '#8a5200';
      for (let i = -8; i <= 8; i++) {
        for (let j = -8; j <= 8; j++) {
          if ((i + j) % 2 === 0) continue;
          c.beginPath();
          c.arc((i * s) / 2, (j * s) / 2, 0.035 * r, 0, TAU);
          c.fill();
        }
      }
      disc(c, 0, -0.66 * r, 0.16 * r, '#2a7a33');
      for (let k = 0; k < 7; k++) leaf(c, 0, -0.6 * r, 0.52 * r, 0.12 * r, -Math.PI / 2 + (k - 3) * 0.3, k % 2 ? '#2e8b3a' : '#4caf50');
      break;
    }
    case 10: { // kavun
      base('#e3d97a');
      c.strokeStyle = 'rgba(190,178,70,.6)';
      c.lineWidth = 0.03 * r;
      for (let k = -3; k <= 3; k++) meridian(c, r, k * 0.3, 0);
      // ağ deseni
      const sp = 0.22 * r;
      const n = Math.ceil(r / sp) + 1;
      const pts = [];
      for (let i = -n; i <= n; i++) {
        const row = [];
        for (let j = -n; j <= n; j++) row.push([j * sp + (rnd() - 0.5) * sp * 0.6, i * sp + (rnd() - 0.5) * sp * 0.6]);
        pts.push(row);
      }
      c.strokeStyle = 'rgba(250,246,214,.9)';
      c.lineWidth = 0.022 * r;
      c.beginPath();
      for (let i = 0; i < pts.length; i++) {
        for (let j = 0; j < pts[i].length; j++) {
          const p = pts[i][j];
          if (j + 1 < pts[i].length) { c.moveTo(p[0], p[1]); c.lineTo(pts[i][j + 1][0], pts[i][j + 1][1]); }
          if (i + 1 < pts.length) { c.moveTo(p[0], p[1]); c.lineTo(pts[i + 1][j][0], pts[i + 1][j][1]); }
        }
      }
      c.stroke();
      disc(c, 0, -0.95 * r, 0.06 * r, '#8a7a2a');
      break;
    }
    default: { // karpuz
      base('#3f9d3f');
      c.strokeStyle = '#1d5c22';
      c.lineWidth = 0.11 * r;
      c.lineJoin = 'round';
      for (let k = -4; k <= 4; k++) meridian(c, r, k * 0.24, k);
      disc(c, 0, -0.94 * r, 0.05 * r, '#7a5a2a');
      break;
    }
  }
  c.restore();
}
// Küre üzerinde boylam çizgisi gibi kıvrımlı şerit (karpuz ve kavun)
function meridian(c, r, x0, phase) {
  c.beginPath();
  for (let i = 0; i <= 40; i++) {
    const y = -r + (2 * r * i) / 40;
    const k = Math.sqrt(Math.max(0, 1 - (y / r) * (y / r)));
    const x = x0 * r * k + Math.sin((y / r) * 9 + phase) * 0.035 * r;
    if (i === 0) c.moveTo(x, y); else c.lineTo(x, y);
  }
  c.stroke();
}
// Dönmeyen ışık/gölge ve kenar çizgisi (ışık hep sol üstten gelir)
function paintShade(c, lvl, r) {
  c.save();
  c.beginPath();
  c.arc(0, 0, r, 0, TAU);
  c.clip();
  const g = c.createRadialGradient(-0.35 * r, -0.4 * r, 0.05 * r, 0, 0, r * 1.05);
  g.addColorStop(0, 'rgba(255,255,255,.38)');
  g.addColorStop(0.35, 'rgba(255,255,255,0)');
  g.addColorStop(0.78, 'rgba(0,0,0,.04)');
  g.addColorStop(1, 'rgba(0,0,0,.3)');
  c.fillStyle = g;
  c.fillRect(-r, -r, 2 * r, 2 * r);
  c.restore();
  c.save();
  c.translate(-0.38 * r, -0.46 * r);
  c.rotate(-0.6);
  c.fillStyle = 'rgba(255,255,255,.45)';
  c.beginPath();
  c.ellipse(0, 0, 0.2 * r, 0.1 * r, 0, 0, TAU);
  c.fill();
  c.restore();
  const lw = Math.min(2.2, Math.max(1, r * 0.05));
  c.lineWidth = lw;
  c.strokeStyle = 'rgba(60,30,10,.42)';
  c.beginPath();
  c.arc(0, 0, r - lw / 2, 0, TAU);
  c.stroke();
}
function makeSprite(lvl, fn) {
  const r = FRUITS[lvl].r;
  const pad = r + 2;
  const px = Math.max(4, Math.ceil(pad * 2 * G.scale));
  const cv = document.createElement('canvas');
  cv.width = px;
  cv.height = px;
  const c = cv.getContext('2d');
  c.setTransform(px / (pad * 2), 0, 0, px / (pad * 2), px / 2, px / 2);
  fn(c, lvl, r);
  return cv;
}
function buildSprites() {
  G.sprites = [null];
  G.shades = [null];
  for (let l = 1; l <= MAX_LVL; l++) {
    G.sprites.push(makeSprite(l, paintFruit));
    G.shades.push(makeSprite(l, paintShade));
  }
}
// c: hedef bağlam (dünya birimi ölçekli); k: görsel ölçek (büyüme animasyonu, önizleme)
function drawFruitAt(c, lvl, x, y, angle, k) {
  const pad = (FRUITS[lvl].r + 2) * k;
  c.save();
  c.translate(x, y);
  if (angle) c.rotate(angle);
  c.drawImage(G.sprites[lvl], -pad, -pad, pad * 2, pad * 2);
  if (angle) c.rotate(-angle);
  c.drawImage(G.shades[lvl], -pad, -pad, pad * 2, pad * 2);
  c.restore();
}

/* ---------- Çizim ---------- */
function roundRect(c, x, y, w, h, r) {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}
function dropperX() {
  const r = FRUITS[G.w.cur].r;
  return clamp(G.dropX, LEFT + r, RIGHT - r);
}
function text(str, x, y, size, weight, col, align) {
  ctx.font = `${weight || 700} ${size}px ${FONT}`;
  ctx.textAlign = align || 'center';
  ctx.fillStyle = col;
  ctx.fillText(str, x, y);
}
function draw() {
  if (!G.sprites.length) return;
  const w = G.w;
  ctx.setTransform(el.canvas.width / W, 0, 0, el.canvas.height / H, 0, 0);
  // arka plan ve kap
  ctx.fillStyle = '#fff7e9';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#fdeccd';
  ctx.fillRect(LEFT, BOX_TOP, RIGHT - LEFT, FLOOR - BOX_TOP);
  ctx.fillStyle = '#b77a3f';
  roundRect(ctx, LEFT - 10, BOX_TOP - 4, 10, FLOOR - BOX_TOP + 14, 3); ctx.fill();
  roundRect(ctx, RIGHT, BOX_TOP - 4, 10, FLOOR - BOX_TOP + 14, 3); ctx.fill();
  roundRect(ctx, LEFT - 10, FLOOR, RIGHT - LEFT + 20, 10, 3); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.25)';
  ctx.fillRect(LEFT - 8, BOX_TOP - 2, 2, FLOOR - BOX_TOP);
  ctx.fillRect(RIGHT + 2, BOX_TOP - 2, 2, FLOOR - BOX_TOP);

  // bırakıcı rayı
  const live = G.phase === 'playing' || G.phase === 'paused';
  const dx = dropperX();
  const curR = FRUITS[w.cur].r;
  ctx.fillStyle = '#e3c9a3';
  ctx.fillRect(LEFT, 12, RIGHT - LEFT, 4);
  ctx.fillStyle = '#b77a3f';
  roundRect(ctx, dx - 12, 8, 24, 12, 4); ctx.fill();
  ctx.strokeStyle = '#b77a3f';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(dx, 20);
  ctx.lineTo(dx, DROP_Y - curR);
  ctx.stroke();

  // nişan çizgisi
  const ready = canDrop(w);
  if (live && ready) {
    ctx.save();
    ctx.setLineDash([4, 6]);
    ctx.strokeStyle = 'rgba(123,35,49,.28)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(dx, DROP_Y + curR + 2);
    ctx.lineTo(dx, FLOOR);
    ctx.stroke();
    ctx.restore();
  }

  // tehlike çizgisi
  const danger = w.overTimer > 0;
  const flash = danger && !reduceMotion() && Math.floor(performance.now() / 160) % 2 === 0;
  ctx.save();
  ctx.setLineDash(danger ? [] : [8, 6]);
  ctx.strokeStyle = danger ? (flash ? '#d0261b' : '#a3271f') : 'rgba(163,39,31,.55)';
  ctx.lineWidth = danger ? 3 : 2;
  ctx.beginPath();
  ctx.moveTo(LEFT, LINE_Y);
  ctx.lineTo(RIGHT, LINE_Y);
  ctx.stroke();
  ctx.restore();

  // meyveler
  for (const b of w.bodies) {
    const k = b.fresh < 1 ? 0.55 + 0.45 * (1 - (1 - b.fresh) * (1 - b.fresh)) : 1;
    drawFruitAt(ctx, b.lvl, b.x, b.y, b.a, k);
    if (b.over > 0) {
      ctx.strokeStyle = flash ? 'rgba(208,38,27,.9)' : 'rgba(208,38,27,.5)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r + 2, 0, TAU);
      ctx.stroke();
    }
  }

  // bırakıcıdaki meyve
  if (G.phase !== 'over') {
    ctx.save();
    ctx.globalAlpha = live && !ready ? 0.35 : 1;
    drawFruitAt(ctx, w.cur, dx, DROP_Y, 0, 1);
    ctx.restore();
  }

  // efektler
  for (const r of G.rings) {
    const t = r.t / 0.35;
    ctx.strokeStyle = `rgba(255,255,255,${(1 - t).toFixed(2)})`;
    ctx.lineWidth = 4 * (1 - t) + 1;
    ctx.beginPath();
    ctx.arc(r.x, r.y, r.r * (0.8 + t * 0.6), 0, TAU);
    ctx.stroke();
  }
  for (const p of G.particles) {
    ctx.globalAlpha = Math.max(0, p.life / p.max);
    disc(ctx, p.x, p.y, p.size, p.color);
  }
  ctx.globalAlpha = 1;
  for (const p of G.popups) {
    const t = p.t / 0.9;
    ctx.globalAlpha = 1 - t;
    ctx.font = `700 ${p.big ? 22 : 16}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(60,30,10,.6)';
    ctx.strokeText(p.text, p.x, p.y - t * 34);
    ctx.fillStyle = '#fff';
    ctx.fillText(p.text, p.x, p.y - t * 34);
  }
  ctx.globalAlpha = 1;

  if (danger && G.phase === 'playing') {
    // Açık kontur: yazının arkasında meyve olsa da okunur kalsın
    const msg = `Taşma: ${Math.max(0, OVER_LIMIT - w.overTimer).toFixed(1)} sn`;
    ctx.font = `700 13px ${FONT}`;
    ctx.textAlign = 'right';
    ctx.lineWidth = 4;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'rgba(255,247,233,.95)';
    ctx.strokeText(msg, RIGHT - 4, LINE_Y - 8);
    text(msg, RIGHT - 4, LINE_Y - 8, 13, 700, '#a3271f', 'right');
  }

  // katmanlar
  if (G.phase === 'idle') idleOverlay();
  else if (G.phase === 'paused') overlay('Duraklatıldı', 'Devam etmek için P tuşuna basın ya da dokunun');
  else if (G.phase === 'over') overlay('Oyun bitti', `${w.score} puan · yeniden başlamak için dokunun`);
}
// Katman koyuluğu: beyaz ve krem yazılar her zeminde AA kontrastı (≥ 4,5:1) sağlasın diye .7
function overlay(title, sub) {
  ctx.fillStyle = 'rgba(30, 20, 12, .7)';
  ctx.fillRect(0, 0, W, H);
  text(title, W / 2, H / 2 - 12, 30, 700, '#ffffff');
  text(sub, W / 2, H / 2 + 20, 15, 500, '#ffffff');
}
function idleOverlay() {
  ctx.fillStyle = 'rgba(30, 20, 12, .7)';
  ctx.fillRect(0, 0, W, H);
  text('Karpuz Oyunu', W / 2, 170, 32, 700, '#ffffff');
  text('Başlamak için dokunun ya da Boşluk tuşuna basın', W / 2, 202, 15, 500, '#ffffff');
  text('Meyve sırası (küçükten büyüğe)', W / 2, 270, 14, 600, '#f3e3c8');
  const rows = [[1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11]];
  rows.forEach((row, ri) => {
    const y = 330 + ri * 92;
    const gap = (RIGHT - LEFT) / row.length;
    row.forEach((lvl, i) => {
      const x = LEFT + gap * (i + 0.5);
      const k = (10 + lvl * 2.6) / FRUITS[lvl].r;
      drawFruitAt(ctx, lvl, x, y, 0, k);
      text(FRUITS[lvl].name, x, y + 46, 11, 600, '#ffffff');
    });
  });
}
function drawNext() {
  if (!G.sprites.length) return;
  const cv = el.next;
  const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
  const css = 40;
  if (cv.width !== Math.round(css * dpr)) { cv.width = Math.round(css * dpr); cv.height = Math.round(css * dpr); }
  nctx.setTransform(cv.width / css, 0, 0, cv.height / css, 0, 0);
  nctx.clearRect(0, 0, css, css);
  const lvl = G.w.next;
  drawFruitAt(nctx, lvl, css / 2, css / 2, 0, 17 / 32); // boyut oranı korunur: en büyük bırakılabilir meyve (portakal) kutuyu doldurur
  G.shownNext = lvl;
}

/* ---------- Efektler ---------- */
function burst(x, y, lvl, big) {
  if (G.silent) return;
  G.popups.push({ x, y, text: big ? `+${KARPUZ_BONUS} Karpuz bonusu!` : `+${(lvl * (lvl + 1)) / 2}`, t: 0, big: !!big });
  if (reduceMotion()) return;
  G.rings.push({ x, y, r: FRUITS[Math.min(lvl, MAX_LVL)].r, t: 0 });
  const n = big ? 40 : 8 + lvl;
  for (let i = 0; i < n && G.particles.length < 240; i++) {
    const a = Math.random() * TAU;
    const sp = 80 + Math.random() * (big ? 320 : 160);
    const life = 0.4 + Math.random() * 0.4;
    G.particles.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 60, life, max: life, size: 1.5 + Math.random() * 2.5, color: FRUITS[big ? 11 - (i % 3) : lvl].color });
  }
}
function updateFx(dt) {
  if (!dt) return;
  for (const p of G.particles) { p.vy += 700 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt; }
  G.particles = G.particles.filter((p) => p.life > 0);
  for (const r of G.rings) r.t += dt;
  G.rings = G.rings.filter((r) => r.t < 0.35);
  for (const p of G.popups) p.t += dt;
  G.popups = G.popups.filter((p) => p.t < 0.9);
  const k = reduceMotion() ? 1 : dt / 0.14;
  for (const b of G.w.bodies) if (b.fresh < 1) b.fresh = Math.min(1, b.fresh + k);
}
const hasFx = () => G.particles.length || G.rings.length || G.popups.length || G.w.bodies.some((b) => b.fresh < 1);

/* ---------- Arayüz ---------- */
function announce(msg) {
  if (!G.silent) el.live.textContent = msg;
}
function updateHud() {
  const w = G.w;
  el.score.textContent = String(w.score);
  el.best.textContent = String(Math.max(store.best, G.phase === 'over' ? 0 : w.score));
  el.biggest.textContent = w.biggest ? FRUITS[w.biggest].name : '—';
  el.nextName.textContent = FRUITS[w.next].name;
  el.cur.textContent = FRUITS[w.cur].name;
  el.seed.textContent = String(w.seed);
  el.seedLink.href = '?tohum=' + w.seed;
  if (G.shownNext !== w.next) drawNext();
}
function updateButtons() {
  const playing = G.phase === 'playing';
  el.start.textContent = G.phase === 'idle' ? 'Başla' : 'Yeniden başlat';
  el.pause.disabled = !(playing || G.phase === 'paused');
  el.pause.textContent = G.phase === 'paused' ? 'Devam et' : 'Duraklat';
  el.pause.setAttribute('aria-pressed', String(G.phase === 'paused'));
  el.left.disabled = !playing;
  el.right.disabled = !playing;
  el.drop.disabled = !playing;
  el.box.dataset.phase = G.phase;
}
function updateSoundBtn() {
  el.sound.setAttribute('aria-pressed', String(store.sound));
  el.sound.textContent = store.sound ? 'Ses: açık' : 'Ses: kapalı';
}
function hideResult() {
  el.result.hidden = true;
  el.result.classList.remove('is-active');
}

/* ---------- Oyun akışı ---------- */
// Yarıda bırakılan oyunun puanı da en yüksek skora yazılır: oyun sırasında "En yüksek" kutusu bu puanı
// gösterdiği için yeniden başlatınca ya da sayfadan çıkınca kaybolmamalı.
function keepBest() {
  if ((G.phase === 'playing' || G.phase === 'paused') && G.w.score > store.best) {
    store.best = G.w.score;
    saveStore();
  }
}
function newGame(seed) {
  keepBest();
  let s;
  if (typeof seed === 'number' && Number.isFinite(seed)) s = seed >>> 0;
  else if (urlSeed.seed !== null) s = urlSeed.seed;
  else s = randomSeed();
  G.w = createWorld(s);
  G.phase = 'playing';
  G.acc = 0;
  G.last = 0;
  G.keyDir = 0;
  G.btnDir = 0;
  G.aiming = null;
  G.particles = [];
  G.rings = [];
  G.popups = [];
  G.dropX = W / 2;
  G.shownNext = 0;
  hideResult();
  updateHud();
  updateButtons();
  ensureLoop();
}
function start() {
  // Boştayken ekranda görünen ilk meyveler korunsun diye aynı tohumla başlar
  newGame(G.phase === 'idle' ? G.w.seed : undefined);
  announce(`Oyun başladı. Bırakıcıda ${FRUITS[G.w.cur].name}, sıradaki ${FRUITS[G.w.next].name}.`);
  el.canvas.focus({ preventScroll: true });
}
function togglePause() {
  if (G.phase === 'playing') {
    G.phase = 'paused';
    G.keyDir = 0;
    G.btnDir = 0;
    G.aiming = null;
    announce('Oyun duraklatıldı.');
  } else if (G.phase === 'paused') {
    G.phase = 'playing';
    G.last = 0;
    G.acc = 0;
    announce('Oyun sürüyor.');
  } else {
    return;
  }
  updateButtons();
  ensureLoop();
}
function gameOver() {
  const w = G.w;
  G.phase = 'over';
  G.overAt = performance.now();
  G.keyDir = 0;
  G.btnDir = 0;
  G.aiming = null;
  store.games += 1;
  const record = w.score > store.best;
  if (record) store.best = w.score;
  if (w.biggest > store.biggest) store.biggest = w.biggest;
  saveStore();
  el.rTitle.textContent = record ? 'Yeni rekor!' : 'Oyun bitti';
  el.rText.textContent = `Bir meyve kırmızı çizginin üstünde ${OVER_LIMIT} saniyeden uzun kaldı. ${record ? 'Bu cihazdaki en yüksek puanınızı geçtiniz.' : 'Yeniden deneyin; büyük meyveleri kenarlarda toplamak alan kazandırır.'}`;
  el.rScore.textContent = String(w.score);
  el.rBest.textContent = String(store.best);
  el.rBiggest.textContent = w.biggest ? FRUITS[w.biggest].name : '—';
  el.rMerges.textContent = String(w.merges);
  el.result.hidden = false;
  el.result.classList.add('is-active');
  updateHud();
  updateButtons();
  sfx('over');
  announce(`Oyun bitti. Puanınız ${w.score}. En yüksek puan ${store.best}.`);
  ensureLoop();
}
function drainEvents() {
  const w = G.w;
  if (w.events.length) {
    let last = null;
    for (const e of w.events) {
      if (e.type === 'merge') { burst(e.x, e.y, e.lvl, false); sfx('merge', e.lvl); last = e; }
      else if (e.type === 'karpuz') { burst(e.x, e.y, MAX_LVL, true); sfx('karpuz'); last = e; }
      else if (e.type === 'drop') sfx('drop');
    }
    w.events.length = 0;
    if (last && G.phase === 'playing') {
      announce(last.type === 'karpuz'
        ? `İki karpuz birleşti! ${KARPUZ_BONUS} puan bonus. Toplam ${w.score}.`
        : `${FRUITS[last.lvl].name} oluştu, +${last.points} puan. Toplam ${w.score}.`);
    }
    updateHud();
  }
  if (w.state === 'over' && G.phase === 'playing') gameOver();
}
function tryDrop() {
  if (G.phase !== 'playing') return false;
  const b = dropFruit(G.w, G.dropX);
  if (!b) return false;
  drainEvents();
  updateHud();
  ensureLoop();
  return true;
}
function setDropX(x) {
  const r = FRUITS[G.w.cur].r;
  G.dropX = clamp(x, LEFT + r, RIGHT - r);
}
function nudge(dir) {
  if (G.phase !== 'playing') return;
  setDropX(dropperX() + dir * NUDGE);
  ensureLoop();
}
function moveDropper(dt) {
  const dir = G.keyDir || G.btnDir;
  if (dir && dt) setDropX(dropperX() + dir * DROPPER_SPEED * dt);
}

/* ---------- Döngü ---------- */
function frame(ts) {
  G.raf = 0;
  const dt = G.last ? Math.min(MAX_FRAME, (ts - G.last) / 1000) : 0;
  G.last = ts;
  if (G.phase === 'playing') {
    moveDropper(dt);
    if (!G.frozen) {
      G.acc += dt;
      let n = 0;
      while (G.acc >= STEP && n < 14 && G.w.state === 'playing') {
        stepWorld(G.w);
        G.acc -= STEP;
        n++;
      }
      if (G.acc > STEP * 2) G.acc = 0;
    }
    drainEvents();
  }
  if (G.phase !== 'paused') updateFx(dt);
  draw();
  const more = G.phase === 'playing' || (G.phase !== 'paused' && hasFx());
  if (more && document.visibilityState !== 'hidden') G.raf = requestAnimationFrame(frame);
  else G.last = 0;
}
function ensureLoop() {
  if (!G.raf) G.raf = requestAnimationFrame(frame);
}

/* ---------- Boyutlandırma (DPR ölçekli tuval) ---------- */
function fit() {
  const fs = !!document.fullscreenElement;
  const maxW = fs ? 560 : 440;
  const avail = Math.floor(el.stage.clientWidth || maxW);
  const byH = Math.floor(window.innerHeight * (fs ? 0.86 : 0.8) * (W / H));
  const cssW = Math.max(160, Math.min(avail, maxW, Math.max(260, byH)));
  const cssH = Math.round((cssW * H) / W);
  const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
  const pw = Math.round(cssW * dpr);
  const ph = Math.round(cssH * dpr);
  if (el.canvas.width !== pw || el.canvas.height !== ph) { el.canvas.width = pw; el.canvas.height = ph; }
  el.canvas.style.width = cssW + 'px';
  el.canvas.style.height = cssH + 'px';
  const s = pw / W;
  if (Math.abs(s - G.scale) > 1e-6 || !G.sprites.length) {
    G.scale = s;
    buildSprites();
    G.shownNext = 0;
  }
  draw();
  drawNext();
}

/* ---------- Girdi ---------- */
function worldX(e) {
  const r = el.canvas.getBoundingClientRect();
  return r.width ? ((e.clientX - r.left) / r.width) * W : G.dropX;
}
el.canvas.addEventListener('pointermove', (e) => {
  if (G.phase !== 'playing') return;
  if (e.pointerType === 'mouse' || G.aiming === e.pointerId) { setDropX(worldX(e)); ensureLoop(); }
});
el.canvas.addEventListener('pointerdown', (e) => {
  if (e.button > 0) return;
  e.preventDefault();
  el.canvas.focus({ preventScroll: true });
  if (G.phase === 'idle') { start(); return; }
  if (G.phase === 'over') { if (performance.now() - G.overAt > RESTART_GUARD_MS) start(); return; }
  if (G.phase === 'paused') { togglePause(); return; }
  G.aiming = e.pointerId;
  setDropX(worldX(e));
  try { el.canvas.setPointerCapture(e.pointerId); } catch (err) { /* desteklenmiyor */ }
});
el.canvas.addEventListener('pointerup', (e) => {
  if (G.aiming !== e.pointerId) return;
  G.aiming = null;
  if (G.phase !== 'playing') return;
  setDropX(worldX(e));
  tryDrop();
});
el.canvas.addEventListener('pointercancel', () => { G.aiming = null; });

// Ekran düğmeleri: basılı tutunca kayar; klavyeyle (Enter/Boşluk) etkinleştirilince bir adım kayar
function holdButton(btn, dir) {
  btn.addEventListener('pointerdown', (e) => {
    if (e.button > 0 || G.phase !== 'playing') return;
    G.btnDir = dir;
    nudge(dir);
    try { btn.setPointerCapture(e.pointerId); } catch (err) { /* desteklenmiyor */ }
  });
  const stop = () => { if (G.btnDir === dir) G.btnDir = 0; };
  btn.addEventListener('pointerup', stop);
  btn.addEventListener('pointercancel', stop);
  btn.addEventListener('lostpointercapture', stop);
  btn.addEventListener('click', (e) => { if (e.detail === 0) nudge(dir * 3); });
}
holdButton(el.left, -1);
holdButton(el.right, 1);
el.drop.addEventListener('click', () => { tryDrop(); });
el.start.addEventListener('click', () => start());
el.again.addEventListener('click', () => start());
el.pause.addEventListener('click', () => togglePause());
el.sound.addEventListener('click', () => {
  store.sound = !store.sound;
  saveStore();
  updateSoundBtn();
  if (store.sound) { ensureAudio(); tone(440, 0.08, 'sine', 0.05); }
});

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  const t = e.target;
  if (t instanceof Element && t.closest('input, select, textarea, [contenteditable="true"]')) return;
  const inBox = t instanceof Node && el.box.contains(t);
  const onPage = !t || t === document.body || t === document.documentElement;
  const k = e.key;
  if (k === 'p' || k === 'P') {
    if (G.phase === 'playing' || G.phase === 'paused') { e.preventDefault(); togglePause(); }
    return;
  }
  if (k === 'ArrowLeft' || k === 'ArrowRight') {
    if (G.phase !== 'playing' || !(inBox || onPage)) return;
    e.preventDefault();
    const dir = k === 'ArrowLeft' ? -1 : 1;
    if (!e.repeat) nudge(dir);
    G.keyDir = dir;
    ensureLoop();
    return;
  }
  const isSpace = k === ' ' || e.code === 'Space';
  if (!isSpace && k !== 'Enter') return;
  // Odak bir düğme ya da bağlantıdaysa onların kendi davranışı geçerli kalır (çift tetiklenme olmaz)
  if (t instanceof Element && t.closest('button, a, summary')) return;
  if (G.phase === 'playing') {
    if (!(inBox || (isSpace && onPage))) return;
    e.preventDefault();
    if (!e.repeat) tryDrop();
    return;
  }
  // Boşta/duraklatılmış/bitmiş: yalnızca oyun alanı odaktayken (sayfayı Boşlukla kaydıran okuyucu etkilenmesin)
  if (!inBox) return;
  e.preventDefault();
  if (e.repeat) return;
  if (G.phase === 'paused') togglePause();
  else if (G.phase === 'idle') start();
  else if (G.phase === 'over' && performance.now() - G.overAt > RESTART_GUARD_MS) start();
});
document.addEventListener('keyup', (e) => {
  if ((e.key === 'ArrowLeft' && G.keyDir < 0) || (e.key === 'ArrowRight' && G.keyDir > 0)) G.keyDir = 0;
});
window.addEventListener('blur', () => { G.keyDir = 0; G.btnDir = 0; });
window.addEventListener('pagehide', keepBest);

// Sekme gizlenince oyun kendiliğinden duraklar
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') { if (G.phase === 'playing') togglePause(); }
  else ensureLoop();
});

// Tam ekran: yalnızca destekleniyorsa görünür; oyun kutusu tam ekran olunca sayfadaki reklamlar görünmez
if (document.fullscreenEnabled && el.box.requestFullscreen) {
  el.full.hidden = false;
  el.full.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else el.box.requestFullscreen().catch(() => {});
  });
  document.addEventListener('fullscreenchange', () => {
    const on = !!document.fullscreenElement;
    el.full.textContent = on ? 'Tam ekrandan çık' : 'Tam ekran';
    el.full.setAttribute('aria-pressed', String(on));
    fit();
    el.canvas.focus({ preventScroll: true });
  });
}

window.addEventListener('resize', fit);
if (window.ResizeObserver) {
  new ResizeObserver(() => {
    const w = el.stage.clientWidth;
    if (w !== G.stageW) { G.stageW = w; fit(); }
  }).observe(el.stage);
}

/* ---------- Test kancası (yalnızca Playwright testleri kullanır; gizli bilgi taşımaz) ---------- */
const api = {
  bounds: { W, H, LEFT, RIGHT, FLOOR, LINE_Y, DROP_Y, OVER_LIMIT, IMMUNITY, KARPUZ_BONUS, DROP_COOLDOWN },
  fruits: FRUITS.slice(1).map((f) => ({ name: f.name, r: f.r })),
  snapshot() {
    const w = G.w;
    return {
      phase: G.phase, state: w.state, score: w.score, best: store.best, seed: w.seed,
      current: w.cur, next: w.next, dropX: dropperX(), t: w.t, overTimer: w.overTimer,
      drops: w.drops, merges: w.merges, karpuz: w.karpuz, biggest: w.biggest, ready: canDrop(w),
      frozen: G.frozen, sound: store.sound,
      bodies: w.bodies.map((b) => ({ id: b.id, lvl: b.lvl, x: b.x, y: b.y, r: b.r, asleep: b.asleep, fixed: b.fixed })),
    };
  },
  newGame(seed) { newGame(seed); return api.snapshot(); },
  freeze(on = true) { G.frozen = !!on; G.acc = 0; return G.frozen; },
  step(seconds) {
    if (G.phase !== 'playing') return 0;
    const n = advance(G.w, Number(seconds) || 0);
    drainEvents();
    draw();
    return n;
  },
  setQueue(cur, next) {
    const ok = (v) => Number.isInteger(v) && v >= 1 && v <= MAX_LVL;
    if (ok(cur)) G.w.cur = cur;
    if (ok(next)) G.w.next = next;
    updateHud();
    return [G.w.cur, G.w.next];
  },
  setDropX(x) { setDropX(Number(x) || 0); return dropperX(); },
  spawn(lvl, x, y, opts) { const b = spawnBody(G.w, lvl, x, y, opts || {}); updateHud(); draw(); return b.id; },
  sequence(seed, n) { return fruitSequence(seed >>> 0, n); },
  // Gerçek zamandan bağımsız uzun simülasyon: rastgele konumlardan düzenli bırakır, oyun biterse yenisini başlatır,
  // her adımda kabın dışına çıkan ya da sayısal olarak bozulan cisim sayar. Sonunda boş bir oyuna döner.
  simulate(seconds = 300, opts = {}) {
    const every = opts.dropEvery > 0 ? opts.dropEvery : 0.7;
    const seed = (opts.seed >>> 0) || 99;
    const pos = mulberry32(seed ^ 0x9e3779b9);
    const prevFrozen = G.frozen;
    G.frozen = true;
    G.silent = true;
    const t0 = performance.now();
    let w = createWorld(seed);
    const out = { seconds, steps: 0, games: 1, drops: 0, merges: 0, maxBodies: 0, violations: 0, maxScore: 0, biggest: 0, ms: 0 };
    let nextDrop = 0;
    const n = Math.round(seconds / STEP);
    for (let i = 0; i < n; i++) {
      if (w.state !== 'playing') {
        out.merges += w.merges;
        out.maxScore = Math.max(out.maxScore, w.score);
        out.biggest = Math.max(out.biggest, w.biggest);
        out.games++;
        w = createWorld(seed + out.games);
        nextDrop = 0;
      }
      if (w.t >= nextDrop) {
        if (dropFruit(w, LEFT + pos() * (RIGHT - LEFT))) out.drops++;
        nextDrop = w.t + every;
      }
      stepWorld(w);
      w.events.length = 0;
      out.steps++;
      out.violations += boundsViolations(w);
      if (w.bodies.length > out.maxBodies) out.maxBodies = w.bodies.length;
    }
    out.merges += w.merges;
    out.maxScore = Math.max(out.maxScore, w.score);
    out.biggest = Math.max(out.biggest, w.biggest);
    out.ms = Math.round(performance.now() - t0);
    G.silent = false;
    G.frozen = prevFrozen;
    G.w = createWorld(randomSeed());
    G.phase = 'idle';
    hideResult();
    updateHud();
    updateButtons();
    draw();
    return out;
  },
};
window.__karpuzOyunuTest = () => api;

/* ---------- Başlangıç ---------- */
if (urlSeed.invalid) {
  el.warn.classList.add('is-bad');
  el.warn.textContent ='Bağlantıdaki tohum değeri geçersiz (0 ile 4294967295 arasında bir tam sayı olmalı); rastgele bir meyve dizisiyle başlıyorsunuz.';
} else if (urlSeed.seed !== null) {
  el.warn.textContent = `Sabit tohumla oynuyorsunuz (${urlSeed.seed}): her yeni oyunda meyveler aynı sırayla gelir.`;
}
updateSoundBtn();
updateHud();
updateButtons();
fit();
G.stageW = el.stage.clientWidth;
ensureLoop();
