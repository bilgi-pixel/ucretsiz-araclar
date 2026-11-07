// Yol Geçişi: sonsuz yollardan araçlara çarpmadan karşıya geç, ağaçlara takılma, geride kalma.
// Izgara tabanlı sıçrama; araçlar sabit adımlı (1/60 sn) güncellenir. Ses yok, ağ isteği yok.
// Rekor yalnızca localStorage'da (ba-oyun-yol-gecisi); bozuk kayıt varsayılana döner.

const $ = (id) => document.getElementById(id);
const KEY = 'ba-oyun-yol-gecisi';
const COLS = 9;
const ROWS = 12; // ekranda görünen satır
const CELL = 32;
const W = COLS * CELL; // 288
const H = ROWS * CELL; // 384
const LOOP = COLS + 8; // araç döngü uzunluğu (hücre)
const START_ROW = 1;
const START_COL = 4;

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
let seed = (Date.now() & 0xffffff) + 3;
function rand() {
  seed = (seed + 0x6d2b79f5) >>> 0;
  let t = seed;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/* ---------- Durum ---------- */
const canvas = $('yg-canvas');
const ctx = canvas.getContext('2d');
const boxEl = $('oyun');
const msgEl = $('yg-msg');
const CAR_COLORS = ['#e8554d', '#4a90d9', '#f2b134', '#9b59b6', '#2fb5a4', '#ec7ab8'];
const state = {
  phase: 'hazir', // hazir | oyun | duraklat | bitti
  row: START_ROW, col: START_COL, maxRow: START_ROW, cam: 0, score: 0, hops: 0, tick: 0, lanes: new Map(), cause: '',
};
const vis = { row: START_ROW, col: START_COL }; // yumuşak görsel konum
let raf = 0;
let lastT = 0;
let acc = 0;
const say = (t) => { msgEl.textContent = t; };

function makeLane(r) {
  if (r <= 2) return { row: r, type: 'grass', trees: [], cars: [] };
  const prev1 = state.lanes.get(r - 1);
  const prev2 = state.lanes.get(r - 2);
  const prev3 = state.lanes.get(r - 3);
  const roads = [prev1, prev2, prev3].filter((l) => l && l.type === 'road').length;
  const road = roads >= 3 ? false : (prev1 && prev1.type === 'grass' ? rand() < 0.7 : rand() < 0.55);
  if (!road) {
    const trees = [];
    const n = Math.floor(rand() * 4); // en çok 3 ağaç
    for (let i = 0; i < n; i++) { const c = Math.floor(rand() * COLS); if (!trees.includes(c)) trees.push(c); }
    return { row: r, type: 'grass', trees, cars: [] };
  }
  const dir = rand() < 0.5 ? -1 : 1;
  const speed = 0.018 + rand() * 0.028 + Math.min(0.03, r * 0.0003);
  const n = rand() < 0.5 ? 2 : 3;
  const cars = [];
  const color = CAR_COLORS[Math.floor(rand() * CAR_COLORS.length)];
  for (let i = 0; i < n; i++) {
    const truck = rand() < 0.3;
    cars.push({ x: -4 + (i * LOOP) / n + rand() * 0.8, w: truck ? 2.6 : 1.7, color });
  }
  return { row: r, type: 'road', dir, speed, trees: [], cars };
}
function lane(r) {
  let l = state.lanes.get(r);
  if (!l) { l = makeLane(r); state.lanes.set(r, l); }
  return l;
}
function ensureLanes() {
  const lo = Math.max(0, Math.floor(state.cam) - 2);
  for (let r = lo; r <= Math.floor(state.cam) + ROWS + 3; r++) lane(r);
  for (const k of state.lanes.keys()) if (k < lo - 4) state.lanes.delete(k);
}
function reset() {
  state.lanes = new Map();
  state.row = START_ROW; state.col = START_COL; state.maxRow = START_ROW;
  state.cam = 0; state.score = 0; state.hops = 0; state.tick = 0; state.cause = '';
  vis.row = START_ROW; vis.col = START_COL;
  ensureLanes();
}

function hitByCar() {
  const l = state.lanes.get(state.row);
  if (!l || l.type !== 'road') return false;
  const p0 = state.col + 0.14;
  const p1 = state.col + 0.86;
  return l.cars.some((c) => p1 > c.x && p0 < c.x + c.w);
}

/** Bir mantık adımı (1/60 sn): araçlar ilerler, kamera yavaşça yukarı kayar. Test kancası da bunu çağırır. */
function step() {
  state.tick++;
  for (const l of state.lanes.values()) {
    if (l.type !== 'road') continue;
    for (const c of l.cars) {
      c.x += l.dir * l.speed;
      if (l.dir > 0 && c.x > COLS + 4) c.x -= LOOP;
      else if (l.dir < 0 && c.x < -4) c.x += LOOP;
    }
  }
  if (state.hops > 0) {
    const creep = 0.0035 + Math.min(0.004, state.maxRow * 0.00005);
    const target = state.maxRow - 4;
    state.cam += creep;
    if (target > state.cam) state.cam += (target - state.cam) * 0.08;
  }
  ensureLanes();
  if (hitByCar()) { gameOver('Araç çarptı.'); return; }
  if (state.row + 0.6 < state.cam) gameOver('Ekranın gerisinde kaldınız.');
}

/** dir: 'up' | 'down' | 'left' | 'right' */
function hop(dir) {
  if (state.phase === 'hazir' || state.phase === 'bitti') { if (state.phase === 'hazir') start(); else return; }
  if (state.phase !== 'oyun') return false;
  let r = state.row;
  let c = state.col;
  if (dir === 'up') r++;
  else if (dir === 'down') r--;
  else if (dir === 'left') c--;
  else if (dir === 'right') c++;
  if (c < 0 || c >= COLS || r < 0) return false;
  if (r < state.cam - 0.5) return false;
  const target = lane(r);
  if (target.type === 'grass' && target.trees.includes(c)) return false; // ağaç yolu kapatır
  state.row = r; state.col = c; state.hops++;
  if (r > state.maxRow) { state.maxRow = r; state.score = r - START_ROW; }
  ensureLanes();
  if (hitByCar()) { gameOver('Araç çarptı.'); return true; }
  return true;
}

function gameOver(why) {
  state.phase = 'bitti';
  state.cause = why;
  boxEl.dataset.phase = 'bitti';
  cancelAnimationFrame(raf);
  raf = 0;
  const record = state.score > store.best;
  if (record) { store.best = state.score; saveStore(); }
  $('sonuc-skor').textContent = String(state.score);
  $('sonuc-neden').textContent = why;
  $('sonuc-rekor').hidden = !record;
  const box = $('sonuc');
  box.hidden = false;
  box.classList.add('is-active');
  say(`${why} Skor ${state.score}${record ? ' (yeni rekor)' : ''}.`);
  updateUi();
  draw();
  $('yg-again').focus();
}

/* ---------- Çizim ---------- */
const yOf = (r) => H - (r - state.cam + 1) * CELL;
function draw() {
  vis.row += (state.row - vis.row) * 0.45;
  vis.col += (state.col - vis.col) * 0.45;
  if (Math.abs(vis.row - state.row) < 0.01) vis.row = state.row;
  if (Math.abs(vis.col - state.col) < 0.01) vis.col = state.col;
  ctx.fillStyle = '#4e9a4f';
  ctx.fillRect(0, 0, W, H);
  const first = Math.floor(state.cam) - 1;
  for (let r = first; r <= first + ROWS + 2; r++) {
    const l = state.lanes.get(r);
    if (!l) continue;
    const y = yOf(r);
    if (l.type === 'grass') {
      ctx.fillStyle = r % 2 ? '#5aa85c' : '#4e9a4f';
      ctx.fillRect(0, y, W, CELL);
      for (const c of l.trees) {
        ctx.fillStyle = '#6b4a2b';
        ctx.fillRect(c * CELL + 13, y + 18, 6, 11);
        ctx.fillStyle = '#2f7a3a';
        ctx.beginPath(); ctx.arc(c * CELL + 16, y + 14, 12, 0, Math.PI * 2); ctx.fill();
      }
    } else {
      ctx.fillStyle = '#3d4350';
      ctx.fillRect(0, y, W, CELL);
      ctx.fillStyle = 'rgba(255,255,255,.35)';
      for (let x = 6; x < W; x += 36) ctx.fillRect(x, y + CELL / 2 - 1, 18, 2);
      for (const c of l.cars) {
        const x = c.x * CELL;
        ctx.fillStyle = c.color;
        if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(x, y + 5, c.w * CELL, CELL - 10, 5); ctx.fill(); } else ctx.fillRect(x, y + 5, c.w * CELL, CELL - 10);
        ctx.fillStyle = 'rgba(255,255,255,.7)';
        const wx = l.dir > 0 ? x + c.w * CELL - 11 : x + 3;
        ctx.fillRect(wx, y + 9, 8, CELL - 18);
      }
    }
  }
  // oyuncu: sarı civciv benzeri kare
  const px = vis.col * CELL;
  const py = yOf(vis.row);
  ctx.fillStyle = '#ffd75e';
  if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(px + 6, py + 6, CELL - 12, CELL - 12, 5); ctx.fill(); } else ctx.fillRect(px + 6, py + 6, CELL - 12, CELL - 12);
  ctx.fillStyle = '#e8554d';
  ctx.fillRect(px + 13, py + 3, 6, 4);
  ctx.fillStyle = '#222';
  ctx.fillRect(px + 10, py + 12, 3, 3);
  ctx.fillRect(px + 19, py + 12, 3, 3);
  ctx.fillStyle = '#f2994a';
  ctx.fillRect(px + 14, py + 17, 4, 3);
  if (state.phase === 'hazir' || state.phase === 'duraklat') {
    ctx.fillStyle = 'rgba(0,0,0,.5)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#fff';
    ctx.font = '700 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(state.phase === 'hazir' ? 'Başlamak için dokunun' : 'Duraklatıldı', W / 2, H / 2);
    ctx.font = '14px sans-serif';
    ctx.fillText(state.phase === 'hazir' ? 'ya da Boşluk / yukarı ok' : 'Devam için P ya da Boşluk', W / 2, H / 2 + 26);
  }
}
function updateUi() {
  $('yg-score').textContent = String(state.score);
  $('yg-best').textContent = String(store.best);
  $('yg-start').textContent = state.phase === 'oyun' ? 'Duraklat (P)' : state.phase === 'duraklat' ? 'Devam et (P)' : 'Başla';
  $('yg-start').hidden = state.phase === 'bitti';
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
  say('Oyun başladı. Yukarı ok ya da dokunma ileri sıçratır; araçlara dikkat edin.');
  updateUi();
  startLoop();
}
function pause() {
  if (state.phase !== 'oyun') return;
  state.phase = 'duraklat';
  boxEl.dataset.phase = 'duraklat';
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
const KEYS = {
  ArrowUp: 'up', w: 'up', W: 'up', ArrowDown: 'down', s: 'down', S: 'down',
  ArrowLeft: 'left', a: 'left', A: 'left', ArrowRight: 'right', d: 'right', D: 'right',
};
boxEl.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const dir = KEYS[e.key];
  if (dir) {
    e.preventDefault();
    if (!e.repeat && state.phase !== 'duraklat') hop(dir);
    return;
  }
  if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
    if (state.phase === 'oyun' || state.phase === 'duraklat') { e.preventDefault(); toggle(); }
  } else if ((e.key === ' ' || e.key === 'Enter') && e.target === canvas) {
    e.preventDefault();
    if (state.phase === 'oyun' && e.key === ' ') hop('up');
    else toggle();
  } else if (e.key === 'r' || e.key === 'R') {
    start();
  }
});
window.addEventListener('blur', pause);
document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });

// Ekran düğmeleri: dokunuşta hemen sıçrar; klavyeyle Enter/Boşluk "click" olarak gelir
for (const [id, dir] of [['yg-up', 'up'], ['yg-down', 'down'], ['yg-left', 'left'], ['yg-right', 'right']]) {
  const el = $(id);
  el.addEventListener('pointerdown', (e) => { e.preventDefault(); if (state.phase !== 'duraklat') hop(dir); });
  el.addEventListener('click', (e) => { if (e.detail === 0 && state.phase !== 'duraklat') hop(dir); });
}
// Tuvalde dokunma = ileri; kaydırma = o yöne sıçra
let swipe = null;
canvas.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  canvas.focus({ preventScroll: true });
  swipe = { x: e.clientX, y: e.clientY };
  if (state.phase === 'hazir' || state.phase === 'duraklat') { swipe = null; toggle(); }
});
canvas.addEventListener('pointerup', (e) => {
  if (!swipe || state.phase !== 'oyun') { swipe = null; return; }
  const dx = e.clientX - swipe.x;
  const dy = e.clientY - swipe.y;
  swipe = null;
  if (Math.abs(dx) < 14 && Math.abs(dy) < 14) hop('up');
  else if (Math.abs(dx) > Math.abs(dy)) hop(dx > 0 ? 'right' : 'left');
  else hop(dy > 0 ? 'down' : 'up');
});
canvas.addEventListener('pointercancel', () => { swipe = null; });

$('yg-start').addEventListener('click', () => { toggle(); canvas.focus({ preventScroll: true }); });
$('yg-again').addEventListener('click', () => { start(); canvas.focus({ preventScroll: true }); });
$('yg-reset').addEventListener('click', () => {
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
  phase: state.phase, score: state.score, best: store.best, row: state.row, col: state.col, maxRow: state.maxRow, cam: state.cam, hops: state.hops, cause: state.cause,
  lanes: [...state.lanes.values()].map((l) => ({ row: l.row, type: l.type, trees: l.trees.slice(), cars: l.cars.map((c) => ({ x: c.x, w: c.w })) })),
});
window.__yolTest = Object.assign(snapshot, {
  /** n adım ilerletir (oyun duraklatılmış olsa da). */
  step: (n = 1) => { for (let i = 0; i < n && state.phase !== 'bitti'; i++) step(); draw(); updateUi(); return snapshot(); },
  /** Duraklatılmış olsa da sıçratır (faz geçici olarak 'oyun' sayılır). */
  hop: (dir) => { const p = state.phase; if (p === 'duraklat') state.phase = 'oyun'; const ok = hop(dir); if (state.phase === 'oyun' && p === 'duraklat') state.phase = 'duraklat'; draw(); updateUi(); return ok; },
  patch: (o) => { Object.assign(state, o); return snapshot(); },
  /** Satırı elle kur: {type:'road'|'grass', dir, speed, trees, cars:[{x,w}]} */
  setLane: (r, o) => { state.lanes.set(r, { row: r, type: o.type, dir: o.dir || 1, speed: o.speed || 0, trees: o.trees || [], cars: (o.cars || []).map((c) => ({ x: c.x, w: c.w, color: '#e8554d' })) }); },
  setSeed: (s) => { seed = s >>> 0; },
});

loadStore();
reset();
draw();
updateUi();
