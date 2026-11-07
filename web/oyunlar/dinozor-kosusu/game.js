// Dinozor Koşusu: sonsuz koşu. Kaktüslerin üzerinden zıpla, alçak uçan kuşların altından eğil.
// Sabit adımlı (1/60 sn) benzetim; çizim canvas ile. Ses yok, ağ isteği yok.
// Rekor yalnızca localStorage'da tutulur (ba-oyun-dinozor-kosusu).

const $ = (id) => document.getElementById(id);
const KEY = 'ba-oyun-dinozor-kosusu';
const W = 600;
const H = 200;
const GROUND = 168; // zemin çizgisinin y değeri
const DINO_X = 50;
const GRAVITY = 0.62;
const JUMP_V = 11.5;
const START_SPEED = 5;
const MAX_SPEED = 11;
const STEP_MS = 1000 / 60;

/* ---------- Kayıt ---------- */
const store = { best: 0 };
function loadStore() {
  try {
    const o = JSON.parse(localStorage.getItem(KEY));
    if (o && typeof o === 'object' && !Array.isArray(o) && Number.isInteger(o.best) && o.best >= 0 && o.best <= 9999999) store.best = o.best;
  } catch (e) { /* bozuk ya da kapalı depolama: varsayılanlarla devam */ }
}
function saveStore() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* depolama kapalı */ } }

/* ---------- Durum ---------- */
// phase: hazir | oyun | durdu | bitti
const g = {
  phase: 'hazir', dist: 0, speed: START_SPEED, y: 0, vy: 0, duck: false, held: false,
  obs: [], nextGap: 300, frames: 0, manual: false, newRecord: false, overAt: 0,
};
const canvas = $('dn-canvas');
const ctx = canvas.getContext('2d');
const dpr = Math.min(window.devicePixelRatio || 1, 2);
canvas.width = W * dpr;
canvas.height = H * dpr;
ctx.scale(dpr, dpr);

const score = () => Math.floor(g.dist / 10);
const say = (t) => { $('dn-msg').textContent = t; };
const dinoBox = () => (g.duck && g.y === 0 ? { x: DINO_X, w: 52, h: 26, bottom: 0 } : { x: DINO_X, w: 38, h: 44, bottom: g.y });

function setPhase(p) {
  g.phase = p;
  $('oyun').dataset.phase = p;
  $('dn-pause').textContent = p === 'durdu' ? 'Devam (P)' : 'Duraklat (P)';
  $('dn-pause').disabled = p !== 'oyun' && p !== 'durdu';
}

function reset() {
  g.dist = 0; g.speed = START_SPEED; g.y = 0; g.vy = 0; g.duck = false; g.obs = []; g.nextGap = 320; g.frames = 0; g.newRecord = false;
  const s = $('sonuc');
  s.hidden = true;
  s.classList.remove('is-active');
}
function start() {
  reset();
  setPhase('oyun');
  say('Koştu! Zıplamak için boşluk ya da yukarı ok, eğilmek için aşağı ok.');
  hud();
  draw();
}
function jump() {
  if (g.phase === 'hazir' || g.phase === 'bitti') {
    if (g.phase === 'bitti' && performance.now() - g.overAt < 350) return; // yanlışlıkla yeniden başlamayı önle
    start();
  }
  if (g.phase !== 'oyun') return;
  if (g.y === 0) { g.vy = JUMP_V; g.duck = false; }
}
function setDuck(on) {
  g.held = on;
  g.duck = on;
  if (on && g.y > 0) g.vy = Math.min(g.vy, -6); // havada eğilince hızlı in
}
function togglePause() {
  if (g.phase === 'oyun') { setPhase('durdu'); say('Duraklatıldı. Devam etmek için P tuşuna ya da düğmeye basın.'); draw(); }
  else if (g.phase === 'durdu') { setPhase('oyun'); last = performance.now(); say('Devam.'); }
}

/* ---------- Benzetim ---------- */
function spawn() {
  const bird = score() >= 150 && Math.random() < 0.3;
  if (bird) {
    const high = Math.random() < 0.5;
    g.obs.push({ type: 'kus', x: W + 20, w: 34, h: 24, bottom: high ? 30 : 8 });
  } else {
    const kind = Math.floor(Math.random() * 3);
    const w = [18, 30, 46][kind];
    const h = [38, 44, 40][kind];
    g.obs.push({ type: 'kaktus', x: W + 20, w, h, bottom: 0 });
  }
  g.nextGap = 230 + Math.random() * 260 + g.speed * 22;
}

function hits(a, b) {
  const m = 5; // kenar payı: ufak değmeler çarpma sayılmaz
  return a.x + m < b.x + b.w && a.x + a.w - m > b.x && a.bottom + m < b.bottom + b.h && a.bottom + a.h - m > b.bottom;
}

function tick() {
  g.frames++;
  g.speed = Math.min(MAX_SPEED, g.speed + 0.0008);
  g.dist += g.speed;
  if (g.y > 0 || g.vy > 0) {
    g.y += g.vy;
    g.vy -= GRAVITY;
    if (g.y <= 0) { g.y = 0; g.vy = 0; g.duck = g.held; }
  }
  g.obs.forEach((o) => { o.x -= g.speed; });
  g.obs = g.obs.filter((o) => o.x + o.w > -10);
  if (!g.manual) {
    g.nextGap -= g.speed;
    if (g.nextGap <= 0) spawn();
  }
  const d = dinoBox();
  if (g.obs.some((o) => hits(d, o))) gameOver();
}

function gameOver() {
  setPhase('bitti');
  g.overAt = performance.now();
  g.duck = false;
  const sc = score();
  if (sc > store.best) { store.best = sc; g.newRecord = true; }
  saveStore();
  $('sonuc-skor').textContent = String(sc);
  $('sonuc-rekor').hidden = !g.newRecord;
  const s = $('sonuc');
  s.hidden = false;
  s.classList.add('is-active');
  say(`Çarptınız. Skor: ${sc}.`);
  hud();
  draw();
}

function step(n = 1) {
  for (let i = 0; i < n && g.phase === 'oyun'; i++) tick();
  hud();
  draw();
}

/* ---------- Çizim ---------- */
function hud() {
  $('dn-score').textContent = String(score());
  $('dn-best').textContent = String(store.best);
  $('dn-speed').textContent = (g.speed / START_SPEED).toFixed(1) + '×';
}
function draw() {
  ctx.fillStyle = '#f3ecdd';
  ctx.fillRect(0, 0, W, H);
  // bulutlar (süs): mesafeye göre yavaşça kayar
  ctx.fillStyle = '#e1d8c4';
  for (let i = 0; i < 4; i++) {
    const cx = ((i * 190 + 80 - g.dist * 0.15) % (W + 120) + (W + 120)) % (W + 120) - 60;
    ctx.fillRect(cx, 34 + (i % 2) * 22, 54, 10);
    ctx.fillRect(cx + 12, 28 + (i % 2) * 22, 30, 8);
  }
  // zemin
  ctx.fillStyle = '#4a4033';
  ctx.fillRect(0, GROUND, W, 2);
  for (let i = 0; i < 14; i++) {
    const gx = ((i * 53 - g.dist) % W + W) % W;
    ctx.fillRect(gx, GROUND + 8 + (i % 3) * 6, 8 + (i % 4) * 4, 2);
  }
  // engeller
  g.obs.forEach((o) => {
    const top = GROUND - o.bottom - o.h;
    if (o.type === 'kaktus') {
      ctx.fillStyle = '#2f7d3d';
      const stem = Math.max(10, Math.floor(o.w / 3));
      ctx.fillRect(o.x + (o.w - stem) / 2, top, stem, o.h);
      if (o.w >= 30) {
        ctx.fillRect(o.x, top + 10, 8, 6);
        ctx.fillRect(o.x, top + 10, 5, 16);
        ctx.fillRect(o.x + o.w - 8, top + 16, 8, 6);
        ctx.fillRect(o.x + o.w - 5, top + 16, 5, 14);
      }
    } else {
      ctx.fillStyle = '#6b3a8a';
      const flap = Math.floor(g.frames / 8) % 2;
      ctx.fillRect(o.x, top + 9, o.w, 8);
      ctx.fillRect(o.x - 4, top + 11, 6, 4);
      ctx.fillRect(o.x + 9, flap ? top : top + 17, 14, 7);
    }
  });
  // dinozor
  const d = dinoBox();
  const top = GROUND - d.bottom - d.h;
  ctx.fillStyle = g.phase === 'bitti' ? '#a33a2f' : '#b4532a';
  if (d.h === 26) {
    ctx.fillRect(d.x, top + 4, 40, 16); // gövde
    ctx.fillRect(d.x + 36, top, 16, 14); // kafa
  } else {
    ctx.fillRect(d.x, top + 14, 28, 20); // gövde
    ctx.fillRect(d.x - 8, top + 22, 10, 6); // kuyruk
    ctx.fillRect(d.x + 22, top, 16, 16); // kafa
  }
  ctx.fillStyle = '#f3ecdd';
  ctx.fillRect(d.x + (d.h === 26 ? 44 : 31), top + (d.h === 26 ? 3 : 4), 4, 4); // göz
  ctx.fillStyle = g.phase === 'bitti' ? '#a33a2f' : '#b4532a';
  const legA = d.bottom === 0 && Math.floor(g.frames / 5) % 2;
  const baseY = GROUND - d.bottom;
  ctx.fillRect(d.x + 6, baseY - (d.h === 26 ? 6 : 10), 6, legA ? 6 : 10);
  ctx.fillRect(d.x + 18, baseY - (d.h === 26 ? 6 : 10), 6, legA ? 10 : 6);
  // bilgi yazıları
  ctx.fillStyle = '#4a4033';
  ctx.font = '700 16px sans-serif';
  ctx.textAlign = 'center';
  if (g.phase === 'hazir') ctx.fillText('Başlamak için boşluk tuşuna ya da ekrana dokunun', W / 2, 90);
  if (g.phase === 'durdu') ctx.fillText('Duraklatıldı', W / 2, 90);
  if (g.phase === 'bitti') ctx.fillText('Oyun bitti', W / 2, 90);
}

/* ---------- Döngü ---------- */
let last = performance.now();
let acc = 0;
function loop(now) {
  const dt = Math.min(100, now - last);
  last = now;
  if (g.phase === 'oyun' && !g.manual) {
    acc += dt;
    let n = 0;
    while (acc >= STEP_MS && n < 6 && g.phase === 'oyun') { tick(); acc -= STEP_MS; n++; }
    hud();
    draw();
  } else acc = 0;
  requestAnimationFrame(loop);
}

/* ---------- Girdi ---------- */
const JUMP_KEYS = [' ', 'ArrowUp', 'w', 'W'];
const interactive = (t) => t instanceof Element && !!t.closest('button, summary, a, input, select, textarea');
window.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const inBox = $('oyun').contains(e.target);
  if (interactive(e.target) && !(e.target === canvas)) {
    // düğmelerde Enter/Boşluk kendi tıklamasını yapsın; yalnızca P ve R kısayolları sürsün
    if (!inBox) return;
    if (e.key === 'p' || e.key === 'P') togglePause();
    return;
  }
  if (JUMP_KEYS.includes(e.key)) {
    e.preventDefault();
    if (!e.repeat) jump();
  } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
    e.preventDefault();
    setDuck(true);
  } else if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
    if (g.phase === 'oyun' || g.phase === 'durdu') togglePause();
  } else if (e.key === 'Enter' && g.phase === 'bitti') {
    jump();
  } else if (e.key === 'r' || e.key === 'R') {
    if (inBox || e.target === document.body) { start(); }
  }
});
window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') setDuck(false);
});

canvas.addEventListener('pointerdown', (e) => { e.preventDefault(); jump(); });
const bindHold = (id, on, off) => {
  const b = $(id);
  b.addEventListener('pointerdown', (e) => { e.preventDefault(); on(); });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach((t) => b.addEventListener(t, off));
  b.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (!e.repeat) on(); } });
  b.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') off(); });
};
bindHold('dn-jump', jump, () => {});
bindHold('dn-duck', () => { if (g.phase === 'oyun') setDuck(true); }, () => setDuck(false));
$('dn-pause').addEventListener('click', togglePause);
$('dn-restart').addEventListener('click', start);
$('dn-again').addEventListener('click', start);
document.addEventListener('visibilitychange', () => { if (document.hidden && g.phase === 'oyun') togglePause(); });
window.addEventListener('blur', () => { if (g.phase === 'oyun' && !g.manual) togglePause(); });

/* ---------- Tam ekran ---------- */
const boxEl = $('oyun');
const fsBtn = $('tam-ekran');
if (document.fullscreenEnabled && boxEl.requestFullscreen) {
  fsBtn.hidden = false;
  fsBtn.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else boxEl.requestFullscreen().catch(() => {});
  });
  document.addEventListener('fullscreenchange', () => {
    fsBtn.setAttribute('aria-pressed', String(!!document.fullscreenElement));
    fsBtn.textContent = document.fullscreenElement ? 'Tam ekrandan çık' : 'Tam ekran';
  });
}

/* ---------- Test kancası ---------- */
const snapshot = () => ({
  phase: g.phase, score: score(), best: store.best, y: g.y, duck: g.duck, speed: g.speed, frames: g.frames,
  obstacles: g.obs.map((o) => ({ ...o })), manual: g.manual,
});
window.__dinozorTest = Object.assign(snapshot, {
  step,
  setManual: (b) => { g.manual = !!b; },
  setObstacles: (list) => { g.obs = list.map((o) => ({ ...o })); draw(); },
  jump,
  start,
  hitsTest: (a, b) => hits(a, b),
});

loadStore();
setPhase('hazir');
hud();
draw();
requestAnimationFrame(loop);
