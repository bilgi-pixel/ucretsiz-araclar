// Gökyüzü Zıplama: top platformlara değdikçe kendiliğinden zıplar; sola/sağa yönlendirip en yükseğe çık.
// Sabit adımlı (1/60 sn mantık) güncelleme; çizim canvas'ta. Ses yok, ağ isteği yok.
// Rekor yalnızca localStorage'da (ba-oyun-gokyuzu-ziplama); bozuk kayıt varsayılana döner.

const $ = (id) => document.getElementById(id);
const KEY = 'ba-oyun-gokyuzu-ziplama';
const W = 320;
const H = 480;
const R = 11; // top yarıçapı
const PW = 58; // platform genişliği
const PH = 10;
const GRAVITY = 0.3;
const JUMP = -9.2; // zıplama hızı (yaklaşık 141 px yükseklik)
const MAX_VX = 4.2;
const FOLLOW_Y = H * 0.42; // top bu çizginin üstüne çıkarsa dünya aşağı kayar

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
let seed = (Date.now() & 0xffffff) + 1;
function rand() {
  seed = (seed + 0x6d2b79f5) >>> 0;
  let t = seed;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/* ---------- Durum ---------- */
const canvas = $('gz-canvas');
const ctx = canvas.getContext('2d');
const boxEl = $('oyun');
const msgEl = $('gz-msg');
const state = {
  phase: 'hazir', // hazir | oyun | duraklat | bitti
  px: W / 2, py: H - 60, vx: 0, vy: 0,
  plats: [], climbed: 0, score: 0, jumps: 0, tick: 0,
};
const input = { left: false, right: false };
let raf = 0;
let lastT = 0;
let acc = 0;
const say = (t) => { msgEl.textContent = t; };

function addPlatform(y, forceStill) {
  const level = Math.min(1, state.score / 1500);
  const moving = !forceStill && state.score > 250 && rand() < 0.12 + level * 0.18;
  state.plats.push({ x: rand() * (W - PW), y, w: PW, dir: rand() < 0.5 ? -1 : 1, moving, speed: 0.8 + rand() * 0.8 });
}
function fillPlatforms() {
  let topY = state.plats.length ? Math.min(...state.plats.map((p) => p.y)) : H;
  const level = Math.min(1, state.score / 2000);
  while (topY > -30) {
    const gap = 48 + rand() * (36 + level * 40); // en çok 124 px; zıplama yüksekliğinden (141) küçük
    topY -= gap;
    addPlatform(topY, false);
  }
}
function reset() {
  state.px = W / 2;
  state.py = H - 60;
  state.vx = 0;
  state.vy = JUMP;
  state.plats = [];
  state.climbed = 0;
  state.score = 0;
  state.jumps = 0;
  state.tick = 0;
  addPlatform(H - 40, true);
  state.plats[0].x = W / 2 - PW / 2;
  state.plats[0].moving = false;
  fillPlatforms();
  input.left = false;
  input.right = false;
}

/** Bir mantık adımı (1/60 sn). Test kancası da bunu çağırır. */
function step() {
  state.tick++;
  const dir = (input.right ? 1 : 0) - (input.left ? 1 : 0);
  state.vx = dir ? Math.max(-MAX_VX, Math.min(MAX_VX, state.vx + dir * 0.7)) : state.vx * 0.82;
  if (Math.abs(state.vx) < 0.05) state.vx = 0;
  state.px += state.vx;
  if (state.px < -R) state.px = W + R; // kenardan çıkan karşıdan girer
  else if (state.px > W + R) state.px = -R;

  const prevY = state.py;
  state.vy += GRAVITY;
  state.py += state.vy;

  for (const p of state.plats) {
    if (!p.moving) continue;
    p.x += p.dir * p.speed;
    if (p.x < 0) { p.x = 0; p.dir = 1; } else if (p.x > W - p.w) { p.x = W - p.w; p.dir = -1; }
  }
  if (state.vy > 0) {
    for (const p of state.plats) {
      if (prevY + R <= p.y + 1 && state.py + R >= p.y && state.px + R * 0.6 >= p.x && state.px - R * 0.6 <= p.x + p.w) {
        state.vy = JUMP;
        state.py = p.y - R;
        state.jumps++;
        break;
      }
    }
  }
  if (state.py < FOLLOW_Y) {
    const d = FOLLOW_Y - state.py;
    state.py = FOLLOW_Y;
    for (const p of state.plats) p.y += d;
    state.climbed += d;
    state.score = Math.floor(state.climbed / 5);
    state.plats = state.plats.filter((p) => p.y < H + 40);
    fillPlatforms();
  }
  if (state.py - R > H) gameOver();
}

function gameOver() {
  state.phase = 'bitti';
  boxEl.dataset.phase = 'bitti';
  cancelAnimationFrame(raf);
  raf = 0;
  const record = state.score > store.best;
  if (record) { store.best = state.score; saveStore(); }
  $('sonuc-skor').textContent = String(state.score);
  $('sonuc-rekor').hidden = !record;
  const box = $('sonuc');
  box.hidden = false;
  box.classList.add('is-active');
  say(`Düştünüz. Skor ${state.score}${record ? ' (yeni rekor)' : ''}.`);
  updateUi();
  draw();
  $('gz-again').focus();
}

/* ---------- Çizim ---------- */
function draw() {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#16213a');
  g.addColorStop(1, '#3b5b8c');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  // yıldızlar (sabit desen, yükseklikle hafifçe kayar)
  ctx.fillStyle = 'rgba(255,255,255,.55)';
  for (let i = 0; i < 22; i++) {
    const x = (i * 97) % W;
    const y = ((i * 53 + state.climbed * 0.2) % H + H) % H;
    ctx.fillRect(x, y, 2, 2);
  }
  for (const p of state.plats) {
    ctx.fillStyle = p.moving ? '#f2b134' : '#58c46a';
    if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(p.x, p.y, p.w, PH, 5); ctx.fill(); } else ctx.fillRect(p.x, p.y, p.w, PH);
    ctx.fillStyle = 'rgba(255,255,255,.35)';
    ctx.fillRect(p.x + 4, p.y + 1, p.w - 8, 2);
  }
  // top (kenardan taşarken karşı tarafta da çiz)
  for (const ox of [0, -W, W]) {
    const x = state.px + ox;
    if (x < -R || x > W + R) continue;
    ctx.fillStyle = '#e8554d';
    ctx.beginPath();
    ctx.arc(x, state.py, R, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.8)';
    ctx.beginPath();
    ctx.arc(x - 4, state.py - 4, 3.2, 0, Math.PI * 2);
    ctx.fill();
  }
  if (state.phase === 'hazir' || state.phase === 'duraklat') {
    ctx.fillStyle = 'rgba(0,0,0,.45)';
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
  $('gz-score').textContent = String(state.score);
  $('gz-best').textContent = String(store.best);
  $('gz-start').textContent = state.phase === 'oyun' ? 'Duraklat (P)' : state.phase === 'duraklat' ? 'Devam et (P)' : 'Başla';
  $('gz-start').hidden = state.phase === 'bitti';
  canvas.setAttribute('aria-label', `Oyun alanı. Skor ${state.score}. Durum: ${{ hazir: 'hazır', oyun: 'oynanıyor', duraklat: 'duraklatıldı', bitti: 'bitti' }[state.phase]}.`);
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
  say('Oyun başladı. Sol ve sağ yön tuşlarıyla ya da ekran düğmeleriyle yönlendirin.');
  updateUi();
  startLoop();
}
function pause() {
  if (state.phase !== 'oyun') return;
  state.phase = 'duraklat';
  boxEl.dataset.phase = 'duraklat';
  input.left = false;
  input.right = false;
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
const KEYS = { ArrowLeft: 'left', a: 'left', A: 'left', ArrowRight: 'right', d: 'right', D: 'right' };
boxEl.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const dirKey = KEYS[e.key];
  if (dirKey) {
    e.preventDefault();
    if (state.phase === 'hazir') start(); // start() girdiyi sıfırlar; yönü sonra işle
    input[dirKey] = true;
    return;
  }
  if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
    if (state.phase === 'oyun' || state.phase === 'duraklat') { e.preventDefault(); toggle(); }
  } else if ((e.key === ' ' || e.key === 'Enter') && e.target === canvas) {
    e.preventDefault();
    toggle();
  } else if (e.key === 'r' || e.key === 'R') {
    start();
  }
});
boxEl.addEventListener('keyup', (e) => {
  const dirKey = KEYS[e.key];
  if (dirKey) input[dirKey] = false;
});
window.addEventListener('blur', () => { input.left = false; input.right = false; pause(); });
document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });

// Ekran düğmeleri (basılı tutulur) ve tuvale dokunma: sol yarı = sola, sağ yarı = sağa
function hold(el, dir) {
  const on = (e) => { e.preventDefault(); if (state.phase === 'hazir') start(); input[dir] = true; };
  const off = () => { input[dir] = false; };
  el.addEventListener('pointerdown', on);
  el.addEventListener('pointerup', off);
  el.addEventListener('pointercancel', off);
  el.addEventListener('pointerleave', off);
  el.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); input[dir] = true; } });
  el.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') input[dir] = false; });
}
hold($('gz-left'), 'left');
hold($('gz-right'), 'right');
canvas.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  canvas.focus({ preventScroll: true });
  if (state.phase === 'hazir' || state.phase === 'duraklat') { toggle(); return; }
  if (state.phase !== 'oyun') return;
  const r = canvas.getBoundingClientRect();
  const left = e.clientX - r.left < r.width / 2;
  input.left = left;
  input.right = !left;
});
const release = () => { if (state.phase === 'oyun') { input.left = false; input.right = false; } };
canvas.addEventListener('pointerup', release);
canvas.addEventListener('pointercancel', release);
canvas.addEventListener('pointerleave', release);

$('gz-start').addEventListener('click', () => { toggle(); canvas.focus({ preventScroll: true }); });
$('gz-again').addEventListener('click', () => { start(); canvas.focus({ preventScroll: true }); });
$('gz-reset').addEventListener('click', () => {
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
  phase: state.phase, score: state.score, best: store.best, px: state.px, py: state.py, vx: state.vx, vy: state.vy,
  jumps: state.jumps, platforms: state.plats.map((p) => ({ x: p.x, y: p.y, w: p.w, moving: p.moving })),
});
window.__gokyuzuTest = Object.assign(snapshot, {
  /** n adım ilerletir (oyun duraklatılmış olsa da). */
  step: (n = 1) => { for (let i = 0; i < n && state.phase !== 'bitti'; i++) step(); draw(); updateUi(); return snapshot(); },
  setInput: (left, right) => { input.left = !!left; input.right = !!right; },
  patch: (o) => { Object.assign(state, o); return snapshot(); },
  setPlatforms: (list) => { state.plats = list.map((p) => ({ x: p.x, y: p.y, w: PW, dir: 1, moving: !!p.moving, speed: 1 })); },
  setSeed: (s) => { seed = s >>> 0; },
});

loadStore();
reset();
draw();
updateUi();
