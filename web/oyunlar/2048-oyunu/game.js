// 2048 Oyunu — Bilişim Ajans.
// Tamamı istemci tarafıdır: ağ isteği yok, çerez yok. Tek kalıcı veri localStorage'daki
// en yüksek skor ve kayıtlı oyun durumudur (yalnızca bu tarayıcıda kalır).

const PREFIX = 'ba-oyun-2048';
export const SIZES = [3, 4, 5, 6];
// 3×3 tahtada 2048 teorik olarak bile mümkün değildir; hedef 256'dır.
export const targetFor = (n) => (n === 3 ? 256 : 2048);

const VECTORS = { left: [0, -1], right: [0, 1], up: [-1, 0], down: [1, 0] };

// ---------------------------------------------------------------------------
// Saf oyun mantığı (DOM'a dokunmaz; Node içinde de içe aktarılabilir)
// ---------------------------------------------------------------------------

/** Kafes değerlerinden (0 = boş) taş listesi üretir. */
export function tilesFromGrid(grid, startId = 1) {
  const tiles = [];
  let id = startId;
  grid.forEach((row, r) => row.forEach((v, c) => { if (v) tiles.push({ id: id++, v, r, c }); }));
  return { tiles, nextId: id };
}

/** Taş listesinden n×n değer kafesi üretir. */
export function toGrid(tiles, n) {
  const grid = Array.from({ length: n }, () => Array(n).fill(0));
  tiles.forEach((t) => { grid[t.r][t.c] = t.v; });
  return grid;
}

/**
 * Taşları bir yöne kaydırır. Birleşen iki taşın yerine yeni bir (2v) taş konur;
 * eski iki taş `gone` listesine hedef konumuyla girer (animasyon için hedefe kayıp silinirler).
 */
export function moveTiles(tiles, n, dir, nextId) {
  const [dr, dc] = VECTORS[dir];
  const horizontal = dr === 0;
  const out = [];
  const gone = [];
  let gained = 0;
  let moved = false;
  let id = nextId;

  for (let line = 0; line < n; line++) {
    // Bu satır/sütundaki taşlar, hareket yönündeki kenara en yakın olandan başlayarak sıralanır.
    const inLine = tiles.filter((t) => (horizontal ? t.r === line : t.c === line));
    inLine.sort((a, b) => {
      const pa = horizontal ? a.c : a.r;
      const pb = horizontal ? b.c : b.r;
      return (horizontal ? dc : dr) < 0 ? pa - pb : pb - pa;
    });
    let slot = 0;
    let last = null; // en son yerleştirilen çıktı taşı
    for (const t of inLine) {
      if (last && last.v === t.v && !last.merged) {
        // Birleşme: önceki taşın yeri yeni taşın yeri olur.
        gone.push({ id: last.id, r: last.r, c: last.c });
        gone.push({ id: t.id, r: last.r, c: last.c });
        last.id = id++;
        last.v *= 2;
        last.merged = true;
        gained += last.v;
        moved = true;
        continue;
      }
      const s = slot++;
      const r = horizontal ? line : (dr < 0 ? s : n - 1 - s);
      const c = horizontal ? (dc < 0 ? s : n - 1 - s) : line;
      if (r !== t.r || c !== t.c) moved = true;
      last = { id: t.id, v: t.v, r, c, merged: false };
      out.push(last);
    }
  }
  return { tiles: out, gone, gained, moved, nextId: id };
}

/** Boş kare var mı ya da komşu iki taş eşit mi? */
export function canMove(tiles, n) {
  if (tiles.length < n * n) return true;
  const g = toGrid(tiles, n);
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (c + 1 < n && g[r][c] === g[r][c + 1]) return true;
      if (r + 1 < n && g[r][c] === g[r + 1][c]) return true;
    }
  }
  return false;
}

/** Rastgele boş kareye 2 (%90) ya da 4 (%10) koyar. Yer yoksa null döner. */
export function spawnTile(tiles, n, nextId, rng = Math.random) {
  const used = new Set(tiles.map((t) => t.r * n + t.c));
  const free = [];
  for (let i = 0; i < n * n; i++) if (!used.has(i)) free.push(i);
  if (!free.length) return null;
  const cell = free[Math.floor(rng() * free.length)];
  return { id: nextId, v: rng() < 0.9 ? 2 : 4, r: Math.floor(cell / n), c: cell % n, merged: false };
}

/** Kayıtlı kafesin geçerli olup olmadığını denetler (bozuk/elle değiştirilmiş veriye karşı). */
export function validGrid(grid, n) {
  if (!Array.isArray(grid) || grid.length !== n) return false;
  return grid.every((row) => Array.isArray(row) && row.length === n
    && row.every((v) => Number.isInteger(v) && v >= 0 && v <= 1 << 20 && (v === 0 || (v >= 2 && (v & (v - 1)) === 0))));
}

// ---------------------------------------------------------------------------
// Arayüz
// ---------------------------------------------------------------------------

const DIR_LABEL = { left: 'sol', right: 'sağ', up: 'yukarı', down: 'aşağı' };
const KEYS = {
  ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down',
  a: 'left', d: 'right', w: 'up', s: 'down', A: 'left', D: 'right', W: 'up', S: 'down',
};

function lsGet(key) { try { return window.localStorage.getItem(key); } catch { return null; } }
function lsSet(key, value) { try { window.localStorage.setItem(key, value); } catch { /* özel gezinme modunda yazılamaz; oyun yine çalışır */ } }

function init() {
  const $ = (id) => document.getElementById(id);
  const box = $('game-box');
  const board = $('board');
  const cellsEl = $('cells');
  const tilesEl = $('tiles');
  const overlay = $('overlay');
  const els = new Map(); // taş kimliği -> DOM öğesi

  let n = 4;
  let tiles = [];
  let nextId = 1;
  let score = 0;
  let best = 0;
  let keepGoing = false;
  let status = 'playing'; // playing | won | over
  let prev = null; // geri al için tek adımlık anlık görüntü

  const savedSize = Number(lsGet(`${PREFIX}:size`));
  if (SIZES.includes(savedSize)) n = savedSize;

  const target = () => targetFor(n);
  const bestKey = () => `${PREFIX}:best:${n}`;
  const stateKey = () => `${PREFIX}:state:${n}`;

  // --- Kayıt ---------------------------------------------------------------
  function save() {
    lsSet(stateKey(), JSON.stringify({ grid: toGrid(tiles, n), score, keepGoing }));
  }

  function loadBest() {
    const v = Number(lsGet(bestKey()));
    best = Number.isFinite(v) && v > 0 ? Math.floor(v) : 0;
  }

  function loadState() {
    try {
      const data = JSON.parse(lsGet(stateKey()) || 'null');
      if (data && validGrid(data.grid, n) && Number.isInteger(data.score) && data.score >= 0) {
        const t = tilesFromGrid(data.grid);
        if (t.tiles.length) {
          tiles = t.tiles; nextId = t.nextId; score = data.score; keepGoing = !!data.keepGoing;
          return true;
        }
      }
    } catch { /* bozuk kayıt yok sayılır */ }
    return false;
  }

  // --- Çizim ---------------------------------------------------------------
  function buildCells() {
    board.style.setProperty('--n', String(n));
    cellsEl.textContent = '';
    for (let i = 0; i < n * n; i++) cellsEl.appendChild(document.createElement('div'));
  }

  function place(el, t) {
    el.style.setProperty('--r', String(t.r));
    el.style.setProperty('--c', String(t.c));
    el.dataset.r = String(t.r);
    el.dataset.c = String(t.c);
  }

  function mount(t, cls) {
    const e = document.createElement('div');
    e.className = cls ? `tile ${cls}` : 'tile';
    e.dataset.v = String(t.v);
    e.dataset.len = String(String(t.v).length);
    const span = document.createElement('span');
    span.textContent = String(t.v);
    e.appendChild(span);
    place(e, t);
    tilesEl.appendChild(e);
    els.set(t.id, e);
    return e;
  }

  function rebuild(animate) {
    tilesEl.textContent = '';
    els.clear();
    tiles.forEach((t) => mount(t, animate ? 'appear' : ''));
  }

  function describe() {
    const g = toGrid(tiles, n);
    return `${n} satır ${n} sütunluk tahta. ` + g.map((row, i) => `Satır ${i + 1}: ${row.map((v) => v || 'boş').join(', ')}.`).join(' ');
  }

  function textEl(tag, text) { const e = document.createElement(tag); e.textContent = text; return e; }
  function makeBtn(label, cls, id, fn) {
    const b = document.createElement('button');
    b.type = 'button'; b.className = cls; b.id = id; b.textContent = label;
    b.addEventListener('click', fn);
    return b;
  }

  // Üstteki katman: hedefe ulaşıldığında ve oyun bittiğinde gösterilir.
  function setOverlay() {
    if (status === 'won') {
      overlay.textContent = '';
      overlay.dataset.kind = 'won';
      overlay.append(
        textEl('strong', `${target()} taşına ulaştınız!`),
        textEl('span', `Skorunuz ${score}. İsterseniz devam edip daha büyük taşlar yapabilirsiniz.`),
      );
      const row = document.createElement('div');
      row.className = 'ov-actions';
      row.append(
        makeBtn('Devam et', 'ba-btn ba-btn-primary', 'btn-continue', () => { keepGoing = true; status = evalStatus(); save(); update(); }),
        makeBtn('Yeni oyun', 'ba-btn', 'btn-ov-new', () => newGame()),
      );
      overlay.append(row);
      overlay.hidden = false;
      overlay.querySelector('button')?.focus({ preventScroll: true });
    } else if (status === 'over') {
      overlay.textContent = '';
      overlay.dataset.kind = 'over';
      overlay.append(
        textEl('strong', 'Oyun bitti'),
        textEl('span', `Hamle kalmadı. Skorunuz ${score}${score >= best && score > 0 ? ' (en yüksek skor!)' : ''}. Son hamleyi geri alabilir ya da yeniden başlayabilirsiniz.`),
      );
      const row = document.createElement('div');
      row.className = 'ov-actions';
      row.append(makeBtn('Tekrar dene', 'ba-btn ba-btn-primary', 'btn-retry', () => newGame()));
      overlay.append(row);
      overlay.hidden = false;
      overlay.querySelector('button')?.focus({ preventScroll: true });
    } else {
      if (!overlay.hidden && overlay.contains(document.activeElement)) board.focus({ preventScroll: true });
      overlay.hidden = true;
      overlay.dataset.kind = '';
    }
  }

  function update() {
    $('score').textContent = String(score);
    $('best').textContent = String(best);
    $('target').textContent = String(target());
    $('btn-undo').disabled = !prev;
    board.dataset.cells = toGrid(tiles, n).flat().join(',');
    board.dataset.status = status;
    board.dataset.size = String(n);
    $('board-desc').textContent = describe();
    document.querySelectorAll('[data-size-btn]').forEach((b) => {
      b.setAttribute('aria-pressed', String(Number(b.dataset.sizeBtn) === n));
    });
    $('hint-3').hidden = n !== 3;
    setOverlay();
  }

  function announce(msg) { $('live').textContent = msg; }

  function evalStatus() {
    if (!keepGoing && tiles.some((t) => t.v >= target())) return 'won';
    if (!canMove(tiles, n)) return 'over';
    return 'playing';
  }

  // --- Oyun akışı ----------------------------------------------------------
  function newGame() {
    tiles = []; nextId = 1; score = 0; keepGoing = false; prev = null;
    for (let i = 0; i < 2; i++) {
      const t = spawnTile(tiles, n, nextId);
      if (t) { nextId++; tiles.push(t); }
    }
    status = 'playing';
    rebuild(true);
    save();
    update();
    announce(`Yeni oyun başladı. ${n} çarpı ${n} tahta, hedef ${target()}.`);
  }

  function startOrRestore() {
    loadBest();
    buildCells();
    if (loadState()) {
      status = evalStatus();
      prev = null;
      rebuild(false);
      update();
    } else {
      newGame();
    }
  }

  function setSize(next) {
    if (next === n || !SIZES.includes(next)) return;
    n = next;
    lsSet(`${PREFIX}:size`, String(n));
    startOrRestore();
    announce(`${n} çarpı ${n} tahta seçildi.`);
  }

  function bumpScore(gain) {
    if (!gain) return;
    const plus = textEl('span', `+${gain}`);
    plus.className = 'plus';
    plus.setAttribute('aria-hidden', 'true');
    $('score-box').appendChild(plus);
    setTimeout(() => plus.remove(), 700);
  }

  function doMove(dir) {
    if (status !== 'playing') return false;
    const res = moveTiles(tiles, n, dir, nextId);
    if (!res.moved) return false;
    prev = { grid: toGrid(tiles, n), score, keepGoing };
    nextId = res.nextId;
    score += res.gained;
    const mergedIds = new Set(res.tiles.filter((t) => t.merged).map((t) => t.id));
    tiles = res.tiles;

    // Sönen taşlar hedef kareye kayıp silinir.
    res.gone.forEach((g) => {
      const e = els.get(g.id);
      if (!e) return;
      els.delete(g.id);
      place(e, g);
      e.classList.add('gone');
      setTimeout(() => e.remove(), 160);
    });

    const spawned = spawnTile(tiles, n, nextId);
    if (spawned) { nextId++; tiles.push(spawned); }

    tiles.forEach((t) => {
      const e = els.get(t.id);
      if (e) { place(e, t); return; }
      mount(t, mergedIds.has(t.id) ? 'pop' : (spawned && t.id === spawned.id ? 'appear' : ''));
    });

    if (score > best) { best = score; lsSet(bestKey(), String(best)); }
    status = evalStatus();
    save();
    update();
    bumpScore(res.gained);
    if (status === 'playing') announce(`${DIR_LABEL[dir]}. Skor ${score}.`);
    else if (status === 'won') announce(`${target()} taşına ulaştınız. Devam edebilir ya da yeni oyun başlatabilirsiniz.`);
    else announce(`Oyun bitti. Skorunuz ${score}.`);
    return true;
  }

  function undo() {
    if (!prev) return;
    const t = tilesFromGrid(prev.grid, nextId);
    tiles = t.tiles; nextId = t.nextId; score = prev.score; keepGoing = prev.keepGoing;
    prev = null;
    status = evalStatus();
    rebuild(false);
    save();
    update();
    announce(`Son hamle geri alındı. Skor ${score}.`);
  }

  // --- Girdi: klavye, kaydırma, ekran okları -------------------------------
  function boardInView() {
    const r = board.getBoundingClientRect();
    return r.bottom > 0 && r.top < window.innerHeight;
  }

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || (e.target && e.target.isContentEditable)) return;
    const dir = KEYS[e.key];
    if (!dir || !boardInView()) return;
    e.preventDefault();
    doMove(dir);
  });

  let swipe = null;
  board.addEventListener('pointerdown', (e) => {
    swipe = { x: e.clientX, y: e.clientY, id: e.pointerId };
    try { board.setPointerCapture(e.pointerId); } catch { /* yok say */ }
  });
  board.addEventListener('pointerup', (e) => {
    if (!swipe || swipe.id !== e.pointerId) return;
    const dx = e.clientX - swipe.x;
    const dy = e.clientY - swipe.y;
    swipe = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    doMove(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
  });
  board.addEventListener('pointercancel', () => { swipe = null; });

  document.querySelectorAll('[data-dir]').forEach((b) => {
    b.addEventListener('click', () => doMove(b.dataset.dir));
  });
  $('btn-new').addEventListener('click', () => newGame());
  $('btn-undo').addEventListener('click', undo);
  document.querySelectorAll('[data-size-btn]').forEach((b) => {
    b.addEventListener('click', () => setSize(Number(b.dataset.sizeBtn)));
  });

  // Tam ekran: reklam alanları oyun kutusunun dışında olduğundan tam ekranda görünmez.
  const fsBtn = $('btn-full');
  if (document.fullscreenEnabled && box.requestFullscreen) {
    fsBtn.hidden = false;
    fsBtn.addEventListener('click', () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else box.requestFullscreen().catch(() => {});
    });
    document.addEventListener('fullscreenchange', () => {
      fsBtn.textContent = document.fullscreenElement ? 'Tam ekrandan çık' : 'Tam ekran';
    });
  }

  startOrRestore();
}

if (typeof document !== 'undefined' && document.getElementById('board')) init();
