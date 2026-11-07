// Işık Söndür: 5×5 ızgarada bir kareye basınca kendisi ve dört komşusu yön değiştirir; hepsini söndür.
// Seviyeler tohumlu, baştan çözülebilir üretilir (söndürülmüş tahtada rastgele hamleler yapılır).
// Ses yok, ağ isteği yok. Seviye ve rekor yalnızca localStorage'da (ba-oyun-isik-sondur).

const $ = (id) => document.getElementById(id);
const KEY = 'ba-oyun-isik-sondur';
const N = 5;

/* ---------- Kayıt ---------- */
const store = { best: 0, level: 1 };
const clampInt = (v, lo, hi, d) => (Number.isInteger(v) && v >= lo && v <= hi ? v : d);
function loadStore() {
  try {
    const o = JSON.parse(localStorage.getItem(KEY));
    if (o && typeof o === 'object' && !Array.isArray(o)) {
      store.best = clampInt(o.best, 0, 9999, 0);
      store.level = clampInt(o.level, 1, 9999, 1);
    }
  } catch (e) { /* bozuk ya da kapalı depolama: varsayılanlarla devam */ }
}
function saveStore() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* depolama kapalı */ } }

/* ---------- Üretici ---------- */
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
/** Seviyeye göre karıştırma hamlesi sayısı (aynı zamanda hedef hamle sayısı). */
const parFor = (level) => Math.min(2 + level, 14);

function applyPress(grid, r, c) {
  for (const [dr, dc] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const rr = r + dr;
    const cc = c + dc;
    if (rr >= 0 && rr < N && cc >= 0 && cc < N) grid[rr][cc] = !grid[rr][cc];
  }
}
function generate(level) {
  const par = parFor(level);
  for (let attempt = 0; attempt < 50; attempt++) {
    const rand = rng(level * 104729 + 7 + attempt * 31);
    const cells = Array.from({ length: N * N }, (_, i) => i);
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [cells[i], cells[j]] = [cells[j], cells[i]];
    }
    const grid = Array.from({ length: N }, () => Array(N).fill(false));
    for (let k = 0; k < par; k++) applyPress(grid, Math.floor(cells[k] / N), cells[k] % N);
    if (grid.some((row) => row.some(Boolean))) return { grid, par };
  }
  const grid = Array.from({ length: N }, () => Array(N).fill(false));
  applyPress(grid, 2, 2);
  return { grid, par: 1 };
}

/* ---------- Durum ---------- */
const state = { level: 1, grid: [], par: 0, moves: 0, undo: [], won: false };

const boardEl = $('is-board');
const msgEl = $('is-msg');
const boxEl = $('oyun');
let focusR = 0;
let focusC = 0;

const say = (text) => { msgEl.textContent = text; };
const litCount = () => state.grid.reduce((s, row) => s + row.filter(Boolean).length, 0);
const rowsAsText = () => state.grid.map((row) => row.map((x) => (x ? '#' : '.')).join(''));

function press(r, c) {
  if (state.won || r < 0 || r >= N || c < 0 || c >= N) return { ok: false };
  applyPress(state.grid, r, c);
  state.undo.push([r, c]);
  state.moves++;
  render();
  if (litCount() === 0) win();
  else say(`${r + 1}. satır, ${c + 1}. sütuna bastınız; ${litCount()} ışık yanıyor.`);
  return { ok: true, lit: litCount() };
}
function undo() {
  if (state.won || !state.undo.length) { say('Geri alınacak hamle yok.'); return false; }
  const [r, c] = state.undo.pop();
  applyPress(state.grid, r, c);
  state.moves = Math.max(0, state.moves - 1);
  render();
  say('Son hamle geri alındı.');
  return true;
}
const starsFor = () => (state.moves <= state.par ? 3 : state.moves <= state.par + 3 ? 2 : 1);

function win() {
  state.won = true;
  if (state.level > store.best) store.best = state.level;
  store.level = state.level + 1;
  saveStore();
  boxEl.dataset.phase = 'bitti';
  render();
  const stars = starsFor();
  $('sonuc-seviye').textContent = String(state.level);
  $('sonuc-hamle').textContent = String(state.moves);
  $('sonuc-yildiz').textContent = '★'.repeat(stars) + '☆'.repeat(3 - stars) + ` (${stars}/3)`;
  $('sonuc-rekor').hidden = state.level < store.best;
  const box = $('sonuc');
  box.hidden = false;
  box.classList.add('is-active');
  say(`Tüm ışıklar söndü. Seviye ${state.level} ${state.moves} hamlede tamamlandı.`);
  $('is-next').focus();
}

function startLevel(level, rows) {
  const g = generate(level);
  state.level = level;
  state.par = g.par;
  state.grid = rows ? rows.map((row) => [...row].map((ch) => ch === '#')) : g.grid;
  state.moves = 0;
  state.undo = [];
  state.won = false;
  boxEl.dataset.phase = 'oyun';
  const box = $('sonuc');
  box.hidden = true;
  box.classList.remove('is-active');
  render();
  say(`Seviye ${level}: ${litCount()} ışık yanıyor. Hedef ${state.par} hamle.`);
}

/* ---------- Çizim ---------- */
function render() {
  if (boardEl.children.length !== N * N) {
    boardEl.textContent = '';
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'is-cell';
        b.dataset.r = String(r);
        b.dataset.c = String(c);
        b.addEventListener('click', () => press(r, c));
        b.addEventListener('focus', () => { focusR = r; focusC = c; });
        boardEl.appendChild(b);
      }
    }
  }
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const b = boardEl.children[r * N + c];
      const on = state.grid[r][c];
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-label', `${r + 1}. satır ${c + 1}. sütun, ışık ${on ? 'yanıyor' : 'sönük'}`);
      b.disabled = state.won;
      b.textContent = on ? '●' : '';
    }
  }
  $('is-level').textContent = String(state.level);
  $('is-moves').textContent = String(state.moves);
  $('is-best').textContent = String(store.best);
  $('is-lit').textContent = String(litCount());
  $('is-undo').disabled = state.won || !state.undo.length;
}

/* ---------- Klavye ---------- */
boxEl.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const k = e.key;
  const d = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] }[k];
  if (d) {
    if (state.won) return;
    e.preventDefault();
    const r = Math.min(N - 1, Math.max(0, focusR + d[0]));
    const c = Math.min(N - 1, Math.max(0, focusC + d[1]));
    boardEl.children[r * N + c].focus();
  } else if (k === 'u' || k === 'U') {
    undo();
  } else if (k === 'r' || k === 'R') {
    restart();
  }
});

function restart() {
  startLevel(state.level);
  say(`Seviye ${state.level} baştan başladı. ${litCount()} ışık yanıyor.`);
}
$('is-undo').addEventListener('click', undo);
$('is-restart').addEventListener('click', restart);
$('is-next').addEventListener('click', () => { startLevel(state.level + 1); boardEl.children[0].focus(); });
$('is-again').addEventListener('click', () => { restart(); boardEl.children[0].focus(); });
$('is-reset').addEventListener('click', () => {
  store.level = 1;
  saveStore();
  startLevel(1);
  say('İlk seviyeden başladınız; en yüksek seviyeniz korunur.');
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
  level: state.level, grid: rowsAsText(), moves: state.moves, par: state.par, won: state.won, best: store.best,
  lit: litCount(), canUndo: state.undo.length > 0,
});
window.__isikSondurTest = Object.assign(snapshot, {
  press,
  undo,
  newLevel: (n) => { startLevel(n); return snapshot(); },
  setGrid: (rows) => { startLevel(state.level, rows); return snapshot(); },
});

loadStore();
startLevel(store.level);
