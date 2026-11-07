// Asteroit Avcısı: uzay boşluğunda küçük bir gemiyle kayaları vur; büyük kayalar parçalanır.
// Sabit adımlı (1/60 sn) mantık; çizim canvas'ta (kendi vektör çizimimiz). Ses yok, ağ isteği yok.
// Rekor yalnızca localStorage'da (ba-oyun-asteroit-avcisi); bozuk kayıt varsayılana döner.

const $ = (id) => document.getElementById(id);
const KEY = 'ba-oyun-asteroit-avcisi';
const W = 320;
const H = 420;
const ROT = 0.07; // dönüş hızı (rad/adım)
const THRUST = 0.12;
const MAX_SPEED = 5;
const BULLET_SPEED = 6.5;
const BULLET_LIFE = 52;
const MAX_BULLETS = 5;
const COOLDOWN = 11;
const SHIP_R = 8;
const RADII = [0, 10, 18, 30]; // boyut 1, 2, 3 yarıçapları
const POINTS = [0, 100, 50, 20];

/* ---------- Kayıt ---------- */
const store = { best: 0 };
function loadStore() {
  try {
    const o = JSON.parse(localStorage.getItem(KEY));
    if (o && typeof o === 'object' && !Array.isArray(o) && Number.isInteger(o.best) && o.best >= 0 && o.best <= 9999999) store.best = o.best;
  } catch (e) { /* bozuk ya da kapalı depolama: varsayılanlarla devam */ }
}
function saveStore() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* depolama kapalı */ } }

/* ---------- Rastgelelik (tohumlu) ---------- */
let seed = (Date.now() & 0xffffff) + 7;
function rand() {
  seed = (seed + 0x6d2b79f5) >>> 0;
  let t = seed;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/* ---------- Durum ---------- */
const canvas = $('as-canvas');
const ctx = canvas.getContext('2d');
const boxEl = $('oyun');
const msgEl = $('as-msg');
const state = {
  phase: 'hazir', // hazir | oyun | duraklat | bitti
  x: W / 2, y: H / 2, a: -Math.PI / 2, vx: 0, vy: 0,
  bullets: [], rocks: [], score: 0, lives: 3, level: 1, invuln: 0, cooldown: 0, tick: 0, thrusting: false, kills: 0,
};
const input = { left: false, right: false, up: false, fire: false };
let raf = 0;
let lastT = 0;
let acc = 0;
const say = (t) => { msgEl.textContent = t; };

function makeRock(x, y, size, speed) {
  const ang = rand() * Math.PI * 2;
  const pts = [];
  const n = 9;
  for (let i = 0; i < n; i++) pts.push(0.78 + rand() * 0.3);
  return { x, y, size, r: RADII[size], vx: Math.cos(ang) * speed, vy: Math.sin(ang) * speed, rot: rand() * 6, spin: (rand() - 0.5) * 0.04, pts };
}
function spawnWave() {
  const count = Math.min(9, 2 + state.level);
  for (let i = 0; i < count; i++) {
    let x = 0; let y = 0; let tries = 0;
    do {
      if (rand() < 0.5) { x = rand() * W; y = rand() < 0.5 ? 0 : H; } else { x = rand() < 0.5 ? 0 : W; y = rand() * H; }
      tries++;
    } while (Math.hypot(x - state.x, y - state.y) < 110 && tries < 30);
    state.rocks.push(makeRock(x, y, 3, 0.35 + state.level * 0.07 + rand() * 0.45));
  }
}
function resetShip() {
  state.x = W / 2; state.y = H / 2; state.a = -Math.PI / 2; state.vx = 0; state.vy = 0; state.invuln = 120;
}
function reset() {
  state.bullets = [];
  state.rocks = [];
  state.score = 0; state.lives = 3; state.level = 1; state.cooldown = 0; state.tick = 0; state.kills = 0; state.thrusting = false;
  resetShip();
  state.invuln = 90;
  spawnWave();
  input.left = false; input.right = false; input.up = false; input.fire = false;
}

const wrap = (o, pad) => {
  if (o.x < -pad) o.x = W + pad; else if (o.x > W + pad) o.x = -pad;
  if (o.y < -pad) o.y = H + pad; else if (o.y > H + pad) o.y = -pad;
};

function splitRock(i) {
  const rk = state.rocks[i];
  state.rocks.splice(i, 1);
  state.score += POINTS[rk.size];
  state.kills++;
  if (rk.size > 1) {
    const sp = Math.hypot(rk.vx, rk.vy) + 0.45;
    state.rocks.push(makeRock(rk.x, rk.y, rk.size - 1, sp), makeRock(rk.x, rk.y, rk.size - 1, sp + 0.2));
  }
}

/** Bir mantık adımı (1/60 sn). Test kancası da bunu çağırır. */
function step() {
  state.tick++;
  state.a += ((input.right ? 1 : 0) - (input.left ? 1 : 0)) * ROT;
  state.thrusting = input.up;
  if (input.up) { state.vx += Math.cos(state.a) * THRUST; state.vy += Math.sin(state.a) * THRUST; }
  const sp = Math.hypot(state.vx, state.vy);
  if (sp > MAX_SPEED) { state.vx *= MAX_SPEED / sp; state.vy *= MAX_SPEED / sp; }
  state.vx *= 0.992; state.vy *= 0.992;
  state.x += state.vx; state.y += state.vy;
  wrap(state, SHIP_R);

  if (state.cooldown > 0) state.cooldown--;
  if (input.fire && state.cooldown <= 0 && state.bullets.length < MAX_BULLETS) {
    state.bullets.push({
      x: state.x + Math.cos(state.a) * 12, y: state.y + Math.sin(state.a) * 12,
      vx: state.vx * 0.3 + Math.cos(state.a) * BULLET_SPEED, vy: state.vy * 0.3 + Math.sin(state.a) * BULLET_SPEED, life: BULLET_LIFE,
    });
    state.cooldown = COOLDOWN;
  }
  for (const b of state.bullets) { b.x += b.vx; b.y += b.vy; b.life--; wrap(b, 2); }
  state.bullets = state.bullets.filter((b) => b.life > 0);
  for (const r of state.rocks) { r.x += r.vx; r.y += r.vy; r.rot += r.spin; wrap(r, r.r); }

  // mermi - kaya
  for (let bi = state.bullets.length - 1; bi >= 0; bi--) {
    const b = state.bullets[bi];
    for (let ri = 0; ri < state.rocks.length; ri++) {
      const r = state.rocks[ri];
      if (Math.hypot(b.x - r.x, b.y - r.y) < r.r + 2) {
        state.bullets.splice(bi, 1);
        splitRock(ri);
        break;
      }
    }
  }
  // gemi - kaya
  if (state.invuln > 0) state.invuln--;
  else {
    for (const r of state.rocks) {
      if (Math.hypot(state.x - r.x, state.y - r.y) < r.r * 0.9 + SHIP_R * 0.7) {
        state.lives--;
        if (state.lives <= 0) { gameOver(); return; }
        resetShip();
        say(`Gemi çarptı. Kalan can: ${state.lives}.`);
        break;
      }
    }
  }
  if (state.rocks.length === 0) {
    state.level++;
    state.invuln = Math.max(state.invuln, 60);
    spawnWave();
    say(`Seviye ${state.level}.`);
  }
}

function gameOver() {
  state.phase = 'bitti';
  boxEl.dataset.phase = 'bitti';
  cancelAnimationFrame(raf);
  raf = 0;
  const record = state.score > store.best;
  if (record) { store.best = state.score; saveStore(); }
  $('sonuc-skor').textContent = String(state.score);
  $('sonuc-seviye').textContent = String(state.level);
  $('sonuc-rekor').hidden = !record;
  const box = $('sonuc');
  box.hidden = false;
  box.classList.add('is-active');
  say(`Oyun bitti. Skor ${state.score}${record ? ' (yeni rekor)' : ''}.`);
  updateUi();
  draw();
  $('as-again').focus();
}

/* ---------- Çizim ---------- */
function draw() {
  ctx.fillStyle = '#0b1020';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(255,255,255,.5)';
  for (let i = 0; i < 28; i++) ctx.fillRect((i * 71) % W, (i * 113) % H, 1.5, 1.5);
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.strokeStyle = '#b9c7e6';
  for (const r of state.rocks) {
    ctx.beginPath();
    for (let i = 0; i < r.pts.length; i++) {
      const ang = r.rot + (i / r.pts.length) * Math.PI * 2;
      const px = r.x + Math.cos(ang) * r.r * r.pts[i];
      const py = r.y + Math.sin(ang) * r.r * r.pts[i];
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();
  }
  ctx.fillStyle = '#ffd75e';
  for (const b of state.bullets) { ctx.beginPath(); ctx.arc(b.x, b.y, 2.2, 0, Math.PI * 2); ctx.fill(); }
  const blink = state.invuln > 0 && Math.floor(state.invuln / 6) % 2 === 0;
  if (!blink && state.phase !== 'bitti') {
    ctx.save();
    ctx.translate(state.x, state.y);
    ctx.rotate(state.a);
    ctx.strokeStyle = '#7fe3a0';
    ctx.beginPath();
    ctx.moveTo(12, 0); ctx.lineTo(-8, 7); ctx.lineTo(-4, 0); ctx.lineTo(-8, -7); ctx.closePath();
    ctx.stroke();
    if (state.thrusting) {
      ctx.strokeStyle = '#f2b134';
      ctx.beginPath(); ctx.moveTo(-5, 3); ctx.lineTo(-13 - (state.tick % 3) * 2, 0); ctx.lineTo(-5, -3); ctx.stroke();
    }
    ctx.restore();
  }
  if (state.phase === 'hazir' || state.phase === 'duraklat') {
    ctx.fillStyle = 'rgba(0,0,0,.5)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#fff';
    ctx.font = '700 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(state.phase === 'hazir' ? 'Başlamak için dokunun' : 'Duraklatıldı', W / 2, H / 2);
    ctx.font = '14px sans-serif';
    ctx.fillText(state.phase === 'hazir' ? 'ya da Boşluk / Enter' : 'Devam için P ya da Boşluk', W / 2, H / 2 + 26);
  }
}
function updateUi() {
  $('as-score').textContent = String(state.score);
  $('as-best').textContent = String(store.best);
  $('as-lives').textContent = String(state.lives);
  $('as-level').textContent = String(state.level);
  $('as-start').textContent = state.phase === 'oyun' ? 'Duraklat (P)' : state.phase === 'duraklat' ? 'Devam et (P)' : 'Başla';
  $('as-start').hidden = state.phase === 'bitti';
  canvas.setAttribute('aria-label', `Oyun alanı. Skor ${state.score}, can ${state.lives}, seviye ${state.level}. Durum: ${{ hazir: 'hazır', oyun: 'oynanıyor', duraklat: 'duraklatıldı', bitti: 'bitti' }[state.phase]}.`);
}

/* ---------- Döngü ---------- */
function frame(t) {
  raf = requestAnimationFrame(frame);
  const dt = Math.min(100, t - lastT);
  lastT = t;
  acc += dt;
  let guard = 0;
  while (acc >= 1000 / 60 && guard++ < 6) {
    acc -= 1000 / 60;
    step();
    if (state.phase !== 'oyun') return;
  }
  draw();
  updateUi();
}
function startLoop() {
  cancelAnimationFrame(raf);
  lastT = performance.now();
  acc = 0;
  raf = requestAnimationFrame(frame);
}
function start() {
  reset();
  state.phase = 'oyun';
  boxEl.dataset.phase = 'oyun';
  const box = $('sonuc');
  box.hidden = true;
  box.classList.remove('is-active');
  say('Oyun başladı. Yön tuşlarıyla döndürün ve ilerleyin, boşlukla ateş edin.');
  updateUi();
  startLoop();
}
function pause() {
  if (state.phase !== 'oyun') return;
  state.phase = 'duraklat';
  boxEl.dataset.phase = 'duraklat';
  input.left = false; input.right = false; input.up = false; input.fire = false;
  cancelAnimationFrame(raf);
  raf = 0;
  say('Duraklatıldı.');
  updateUi();
  draw();
}
function resume() {
  if (state.phase !== 'duraklat') return;
  state.phase = 'oyun';
  boxEl.dataset.phase = 'oyun';
  say('Devam ediyor.');
  updateUi();
  startLoop();
}
function toggle() {
  if (state.phase === 'oyun') pause();
  else if (state.phase === 'duraklat') resume();
  else start();
}

/* ---------- Girdi ---------- */
const KEYS = { ArrowLeft: 'left', a: 'left', A: 'left', ArrowRight: 'right', d: 'right', D: 'right', ArrowUp: 'up', w: 'up', W: 'up' };
boxEl.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const dirKey = KEYS[e.key];
  if (dirKey) {
    e.preventDefault();
    if (state.phase === 'hazir') start();
    input[dirKey] = true;
    return;
  }
  if (e.key === ' ' || e.key === 'Enter') {
    if (e.target.tagName === 'BUTTON') return; // düğmeler kendi davranışını korur (ekran düğmeleri hold() içinde)
    e.preventDefault();
    if (state.phase === 'oyun' && e.key === ' ') input.fire = true;
    else if (state.phase !== 'oyun') toggle();
    return;
  }
  if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
    if (state.phase === 'oyun' || state.phase === 'duraklat') { e.preventDefault(); toggle(); }
  } else if (e.key === 'r' || e.key === 'R') {
    start();
  }
});
boxEl.addEventListener('keyup', (e) => {
  const dirKey = KEYS[e.key];
  if (dirKey) input[dirKey] = false;
  if (e.key === ' ' && e.target.tagName !== 'BUTTON') input.fire = false;
});
window.addEventListener('blur', () => { input.left = false; input.right = false; input.up = false; input.fire = false; pause(); });
document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });

// Ekran düğmeleri (basılı tutulur)
function hold(el, dir) {
  const on = (e) => { e.preventDefault(); if (state.phase === 'hazir') start(); if (state.phase === 'oyun') input[dir] = true; };
  const off = () => { input[dir] = false; };
  el.addEventListener('pointerdown', on);
  el.addEventListener('pointerup', off);
  el.addEventListener('pointercancel', off);
  el.addEventListener('pointerleave', off);
  el.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); input[dir] = true; } });
  el.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') input[dir] = false; });
}
hold($('as-left'), 'left');
hold($('as-right'), 'right');
hold($('as-up'), 'up');
hold($('as-fire'), 'fire');
canvas.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  canvas.focus({ preventScroll: true });
  if (state.phase === 'hazir' || state.phase === 'duraklat') toggle();
});

$('as-start').addEventListener('click', () => { toggle(); canvas.focus({ preventScroll: true }); });
$('as-again').addEventListener('click', () => { start(); canvas.focus({ preventScroll: true }); });
$('as-reset').addEventListener('click', () => {
  store.best = 0;
  saveStore();
  updateUi();
  say('Rekor sıfırlandı.');
});

/* ---------- Tam ekran ---------- */
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
  phase: state.phase, score: state.score, best: store.best, lives: state.lives, level: state.level, x: state.x, y: state.y, a: state.a,
  vx: state.vx, vy: state.vy, invuln: state.invuln, kills: state.kills,
  bullets: state.bullets.map((b) => ({ x: b.x, y: b.y })),
  rocks: state.rocks.map((r) => ({ x: r.x, y: r.y, size: r.size, r: r.r })),
});
window.__asteroitTest = Object.assign(snapshot, {
  /** n adım ilerletir (oyun duraklatılmış olsa da). */
  step: (n = 1) => { for (let i = 0; i < n && state.phase !== 'bitti'; i++) step(); draw(); updateUi(); return snapshot(); },
  setInput: (left, right, up, fire) => { input.left = !!left; input.right = !!right; input.up = !!up; input.fire = !!fire; },
  patch: (o) => { Object.assign(state, o); return snapshot(); },
  setRocks: (list) => { state.rocks = list.map((r) => { const k = makeRock(r.x, r.y, r.size, 0); k.vx = r.vx || 0; k.vy = r.vy || 0; k.spin = 0; return k; }); },
  setSeed: (s) => { seed = s >>> 0; },
});

loadStore();
reset();
draw();
updateUi();
