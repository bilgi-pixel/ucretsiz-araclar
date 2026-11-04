// Nonogram (resim bulmaca) — DOM tabanlı ızgara. Dış kütüphane ve ağ isteği yok.
// Hazır desenler desenler.js, tek çözüm denetimi solver.js içindedir. İlerleme, en iyi süreler ve
// ayarlar yalnızca bu tarayıcının localStorage alanında durur; hiçbir yere gönderilmez.
import { DESENLER } from './desenler.js';
import { runsOf, computeClues, tryRandomPuzzle, isLineSolvable } from './solver.js';

const STORE_KEY = 'ba-nonogram';
const SIZES = [5, 10, 15];
const HINT_PENALTY_MS = 30000; // her ipucu süreye 30 sn ekler (en iyi süre dürüst kalsın)
const LONG_PRESS_MS = 450;
const MOVE_CANCEL_PX = 10;
const MIN_CELL = 14;
const CELL_CAP = { 5: 56, 10: 40, 15: 34 };
const EMPTY = 0;
const FILLED = 1;
const CROSS = 2;

const $ = (id) => document.getElementById(id);
const board = $('board');
const wrap = $('board-wrap');
const elTime = $('time');
const elBest = $('best');
const elHints = $('hints');
const elErrors = $('errors');
const elMsg = $('msg');
const result = $('result');
const resultTitle = $('result-title');
const resultText = $('result-text');
const btnNew = $('btn-new');
const btnNext = $('btn-next');
const btnHint = $('btn-hint');
const btnReset = $('btn-reset');
const toolFill = $('tool-fill');
const toolCross = $('tool-cross');
const selSize = $('opt-size');
const selSource = $('opt-source');
const chkErrors = $('opt-errors');

/* ---------- Kalıcı veri (yalnızca localStorage) ---------- */

const isGridStrings = (rows, n, re) =>
  Array.isArray(rows) && rows.length === n && rows.every((s) => typeof s === 'string' && s.length === n && re.test(s));
const toMs = (v) => (Number.isFinite(v) && v > 0 ? Math.floor(v) : 0);

function loadStore() {
  const def = { best: {}, solved: {}, opts: { size: 5, source: 'hazir', errors: false, tool: 'fill' }, game: null };
  for (const s of SIZES) { def.best[s] = 0; def.solved[s] = []; }
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (!raw || typeof raw !== 'object') return def;
    const o = raw.opts || {};
    const out = {
      best: {}, solved: {},
      opts: {
        size: SIZES.includes(o.size) ? o.size : 5,
        source: o.source === 'rastgele' ? 'rastgele' : 'hazir',
        errors: o.errors === true,
        tool: o.tool === 'cross' ? 'cross' : 'fill',
      },
      game: raw.game && typeof raw.game === 'object' ? raw.game : null,
    };
    for (const s of SIZES) {
      out.best[s] = toMs(raw.best && raw.best[s]);
      const list = raw.solved && raw.solved[s];
      out.solved[s] = Array.isArray(list) ? list.filter((x) => typeof x === 'string').slice(0, 60) : [];
    }
    return out;
  } catch (_) {
    return def; // localStorage kapalı ya da bozuk: oyun yine çalışır, ilerleme saklanmaz
  }
}
const store = loadStore();
function saveStore() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (_) { /* özel gezinme modu */ }
}

/* ---------- Oyun durumu ---------- */

// g: { size, source, id, name, sol, rows, cols, cells, hintSet, hints, base, runStart, phase }
// phase: hazir (süre işlemiyor) | oynuyor | bitti
let g = null;
let busy = false;
let buildToken = 0;
let cursor = { r: 0, c: 0 };
let cellEls = [];
let rowEls = [];
let colEls = [];
let cellKey = [];
let rowDone = [];
let colDone = [];

const sameArr = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);
const zeroGrid = (n) => Array.from({ length: n }, () => new Array(n).fill(EMPTY));

function createGame(size, sol, meta) {
  const { rows, cols } = computeClues(sol);
  return {
    size, source: meta.source, id: meta.id, name: meta.name,
    sol, rows, cols, cells: zeroGrid(size),
    hintSet: new Set(), hints: 0, base: 0, runStart: null, phase: 'hazir',
  };
}

function restoreGame(sg) {
  if (!sg || !SIZES.includes(sg.size)) return null;
  const n = sg.size;
  if (!isGridStrings(sg.sol, n, /^[01]+$/) || !isGridStrings(sg.cells, n, /^[012]+$/)) return null;
  const sol = sg.sol.map((s) => [...s].map(Number));
  if (!isLineSolvable(sol)) return null; // bozulmuş kayıt: hata kontrolü yanlış sonuç vermesin
  const game = createGame(n, sol, {
    source: sg.source === 'rastgele' ? 'rastgele' : 'hazir',
    id: typeof sg.id === 'string' ? sg.id.slice(0, 20) : '',
    name: typeof sg.name === 'string' ? sg.name.slice(0, 40) : '',
  });
  game.cells = sg.cells.map((s) => [...s].map(Number));
  game.base = toMs(sg.elapsed);
  game.hints = Math.min(toMs(sg.hints), 99);
  if (Array.isArray(sg.hintCells)) {
    for (const x of sg.hintCells) if (Number.isInteger(x) && x >= 0 && x < n * n) game.hintSet.add(x);
  }
  return game;
}

function elapsedMs() {
  return g.base + (g.runStart != null ? performance.now() - g.runStart : 0);
}
function pauseRun() {
  if (g && g.runStart != null) { g.base += performance.now() - g.runStart; g.runStart = null; }
}
function resumeRun() {
  if (g && g.phase === 'oynuyor' && g.runStart == null) g.runStart = performance.now();
}
function startRun() {
  if (g.phase !== 'hazir') return;
  g.phase = 'oynuyor';
  g.runStart = performance.now();
}

function persist() {
  if (!g || g.phase === 'bitti') return;
  const n = g.size;
  store.game = {
    size: n, source: g.source, id: g.id, name: g.name,
    sol: g.sol.map((r) => r.join('')),
    cells: g.cells.map((r) => r.join('')),
    elapsed: Math.floor(elapsedMs()),
    hints: g.hints,
    hintCells: [...g.hintSet],
  };
  store.opts.size = n;
  store.opts.source = g.source;
  saveStore();
}

/* ---------- Bulmaca seçimi ---------- */

function pickPreset(size) {
  const list = DESENLER.map((d, i) => ({ ...d, id: `${d.boyut}-${i}` })).filter((d) => d.boyut === size);
  const done = store.solved[size] || [];
  const fresh = list.filter((d) => !done.includes(d.id));
  const pool = fresh.length ? fresh : list;
  const d = pool[Math.floor(Math.random() * pool.length)];
  return { sol: d.satirlar.map((s) => [...s].map((ch) => (ch === '#' ? 1 : 0))), id: d.id, name: d.ad, allDone: !fresh.length };
}

const nextFrame = () => new Promise((res) => setTimeout(res, 0));

// Rastgele bulmaca: tek çözümlü çıkana dek dener; arayüzü dondurmamak için aralıklarla nefes verir.
async function makeRandom(size) {
  const t0 = performance.now();
  for (let i = 0; ; i++) {
    const grid = tryRandomPuzzle(size);
    if (grid) return grid;
    if (i % 20 === 19) {
      await nextFrame();
      if (performance.now() - t0 > 2500) return null;
    }
  }
}

async function startNew(size, source) {
  const token = ++buildToken;
  busy = true;
  setBusyUi(true);
  board.dataset.state = 'hazirlaniyor';
  showMsg(source === 'rastgele' ? 'Rastgele bulmaca hazırlanıyor…' : 'Desen seçiliyor…');
  await nextFrame();
  let puzzle = null;
  let note = '';
  if (source === 'rastgele') {
    const grid = await makeRandom(size);
    if (token !== buildToken) return;
    if (grid) puzzle = { sol: grid, id: '', name: 'Rastgele desen', allDone: false };
    else note = 'Rastgele bulmaca üretilemedi; hazır bir desen seçildi. ';
  }
  if (!puzzle) {
    puzzle = pickPreset(size);
    if (puzzle.allDone) note += 'Bu boyuttaki tüm hazır desenleri çözdünüz; desenler tekrar ediyor. ';
  }
  if (token !== buildToken) return;
  g = createGame(size, puzzle.sol, { source: puzzle.id ? 'hazir' : 'rastgele', id: puzzle.id, name: puzzle.name });
  store.opts.size = size;
  store.opts.source = source;
  mountGame();
  busy = false;
  setBusyUi(false);
  showMsg(`${note}${size}×${size} bulmaca hazır. İlk hamlenizde süre başlar.`);
  persist();
}

/* ---------- Tahta kurulumu ---------- */

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}

function mountGame() {
  const n = g.size;
  board.textContent = '';
  board.classList.remove('won');
  board.style.setProperty('--n', String(n));
  cellEls = []; rowEls = []; colEls = []; cellKey = []; rowDone = new Array(n).fill(null); colDone = new Array(n).fill(null);

  const head = el('div');
  head.setAttribute('role', 'row');
  head.className = 'ng-row';
  const corner = el('div', 'ng-corner');
  corner.setAttribute('role', 'presentation');
  head.appendChild(corner);
  for (let c = 0; c < n; c++) {
    const cc = el('div', `ng-cc${c % 5 === 4 && c < n - 1 ? ' bR' : ''}${Math.floor(c / 5) % 2 ? ' alt' : ''}`);
    cc.setAttribute('role', 'columnheader');
    for (const v of g.cols[c]) cc.appendChild(el('span', '', String(v)));
    head.appendChild(cc);
    colEls.push(cc);
  }
  board.appendChild(head);

  for (let r = 0; r < n; r++) {
    const row = el('div', 'ng-row');
    row.setAttribute('role', 'row');
    const rc = el('div', `ng-rc${r % 5 === 4 && r < n - 1 ? ' bB' : ''}${Math.floor(r / 5) % 2 ? ' alt' : ''}`);
    rc.setAttribute('role', 'rowheader');
    for (const v of g.rows[r]) rc.appendChild(el('span', '', String(v)));
    row.appendChild(rc);
    rowEls.push(rc);
    const line = [];
    for (let c = 0; c < n; c++) {
      const cell = el('div', 'ng-cell');
      cell.setAttribute('role', 'gridcell');
      cell.tabIndex = r === 0 && c === 0 ? 0 : -1;
      cell.dataset.r = String(r);
      cell.dataset.c = String(c);
      if (c % 5 === 4) cell.dataset.br = '1'; // 5'li grup çizgisi
      if (r % 5 === 4) cell.dataset.bb = '1';
      row.appendChild(cell);
      line.push(cell);
    }
    cellEls.push(line);
    cellKey.push(new Array(n).fill(-1));
    board.appendChild(row);
  }
  board.setAttribute('aria-label', `${n} satır ${n} sütunlu nonogram tahtası`);
  cursor = { r: 0, c: 0 };
  result.hidden = true;
  fit();
  renderAll();
}

// Kenar uzunluğuna göre hücre ve ipucu yazı boyutunu hesaplar; dar ekranda taşmayı önler.
function clueMetrics(font) {
  let rw = 0;
  for (const clue of g.rows) rw = Math.max(rw, clue.reduce((a, v) => a + String(v).length * font * 0.62 + 5, 0) + 8);
  let ch = 0;
  for (const clue of g.cols) ch = Math.max(ch, clue.length * font * 1.25 + 6);
  return { rw: Math.ceil(rw), ch: Math.ceil(ch) };
}

function fit() {
  if (!g) return;
  const n = g.size;
  const avail = Math.max(200, wrap.clientWidth - 2);
  const cap = CELL_CAP[n] || 34;
  let cell = Math.min(cap, Math.floor((avail - 90) / n));
  let font = 12;
  let m = clueMetrics(font);
  for (let i = 0; i < 3; i++) {
    font = Math.max(10, Math.min(15, Math.round(cell * 0.6)));
    m = clueMetrics(font);
    cell = Math.max(MIN_CELL, Math.min(cap, Math.floor((avail - m.rw - 2) / n)));
  }
  board.style.setProperty('--cell', `${cell}px`);
  board.style.setProperty('--font', `${font}px`);
  board.style.setProperty('--rw', `${m.rw}px`);
  board.style.setProperty('--ch', `${m.ch}px`);
}

/* ---------- Çizim / durum eşitleme ---------- */

const CELL_WORD = ['boş', 'dolu', 'çarpı'];

function isWrong(r, c) {
  if (!store.opts.errors) return false;
  const v = g.cells[r][c];
  const want = g.sol[r][c];
  return (v === FILLED && want === 0) || (v === CROSS && want === 1);
}

function lineFill(line) { return line.map((v) => (v === FILLED ? 1 : 0)); }

function renderCells() {
  const n = g.size;
  const won = g.phase === 'bitti';
  let wrongCount = 0;
  let filled = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const v = g.cells[r][c];
      const wrong = isWrong(r, c);
      const hint = g.hintSet.has(r * n + c);
      if (wrong) wrongCount += 1;
      if (v === FILLED) filled += 1;
      const key = v + (wrong ? 4 : 0) + (hint ? 8 : 0) + (won ? 16 : 0);
      if (cellKey[r][c] === key) continue;
      cellKey[r][c] = key;
      const cell = cellEls[r][c];
      let cls = 'ng-cell';
      if (v === FILLED) cls += ' f';
      else if (v === CROSS && !won) cls += ' x';
      if (wrong) cls += ' wrong';
      if (hint) cls += ' hint';
      cell.className = cls;
      cell.setAttribute('aria-label',
        `Satır ${r + 1}, sütun ${c + 1}: ${CELL_WORD[v]}${wrong ? ', hatalı' : ''}${hint ? ', ipucuyla açıldı' : ''}`);
    }
  }
  return { wrongCount, filled };
}

function renderClues() {
  const n = g.size;
  for (let r = 0; r < n; r++) {
    const done = sameArr(runsOf(lineFill(g.cells[r])), g.rows[r]);
    if (rowDone[r] === done) continue;
    rowDone[r] = done;
    rowEls[r].classList.toggle('done', done);
    rowEls[r].setAttribute('aria-label', `Satır ${r + 1} ipucu: ${g.rows[r].join(' ')}${done ? ', tamamlandı' : ''}`);
  }
  for (let c = 0; c < n; c++) {
    const done = sameArr(runsOf(lineFill(g.cells.map((row) => row[c]))), g.cols[c]);
    if (colDone[c] === done) continue;
    colDone[c] = done;
    colEls[c].classList.toggle('done', done);
    colEls[c].setAttribute('aria-label', `Sütun ${c + 1} ipucu: ${g.cols[c].join(' ')}${done ? ', tamamlandı' : ''}`);
  }
}

function fmtTime(ms) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = String(s % 60).padStart(2, '0');
  return h ? `${h}:${String(m).padStart(2, '0')}:${sec}` : `${m}:${sec}`;
}

let lastTime = '';
function renderTime() {
  if (!g) return;
  const t = fmtTime(elapsedMs());
  if (t !== lastTime) { lastTime = t; elTime.textContent = t; }
}

function renderAll() {
  const { wrongCount, filled } = renderCells();
  renderClues();
  renderTime();
  const best = store.best[g.size];
  elBest.textContent = best ? fmtTime(best) : '–';
  elHints.textContent = String(g.hints);
  elErrors.textContent = store.opts.errors ? String(wrongCount) : '–';
  board.dataset.state = g.phase;
  board.dataset.size = String(g.size);
  board.dataset.source = g.source;
  board.dataset.filled = String(filled);
  board.dataset.errors = store.opts.errors ? String(wrongCount) : '-1';
  board.dataset.hints = String(g.hints);
  board.dataset.cursor = `${cursor.r},${cursor.c}`;
  btnHint.disabled = g.phase === 'bitti' || busy;
  btnReset.disabled = busy;
}

function showMsg(text) { elMsg.textContent = text; }

function setBusyUi(on) {
  btnNew.disabled = on;
  btnHint.disabled = on;
  btnReset.disabled = on;
  btnNext.disabled = on;
  board.setAttribute('aria-busy', on ? 'true' : 'false');
}

/* ---------- Hamleler ---------- */

function solved() {
  const n = g.size;
  for (let r = 0; r < n; r++) if (!sameArr(runsOf(lineFill(g.cells[r])), g.rows[r])) return false;
  for (let c = 0; c < n; c++) if (!sameArr(runsOf(lineFill(g.cells.map((row) => row[c]))), g.cols[c])) return false;
  return true;
}

function win() {
  pauseRun();
  g.phase = 'bitti';
  const ms = Math.floor(elapsedMs());
  const prev = store.best[g.size];
  const record = !prev || ms < prev;
  if (record) store.best[g.size] = ms;
  if (g.id && !store.solved[g.size].includes(g.id)) store.solved[g.size].push(g.id);
  store.game = null;
  saveStore();
  board.classList.add('won');
  renderAll();
  const hintNote = g.hints ? ` (${g.hints} ipucu, +${(g.hints * HINT_PENALTY_MS) / 1000} sn dahil)` : '';
  resultTitle.textContent = 'Tebrikler, bulmacayı çözdünüz!';
  resultText.textContent = `Desen: ${g.name || 'Rastgele desen'}. Süre: ${fmtTime(ms)}${hintNote}.${record ? ' Yeni en iyi süre!' : ` En iyi süre: ${fmtTime(store.best[g.size])}.`}`;
  result.hidden = false;
  showMsg(`${resultTitle.textContent} ${resultText.textContent}`);
  btnNext.focus({ preventScroll: false });
}

function afterChange() {
  renderAll();
  if (solved()) win();
  else persist();
}

function setCell(r, c, v) {
  if (!g || busy || g.phase === 'bitti') return;
  if (g.cells[r][c] === v) return;
  startRun();
  g.cells[r][c] = v;
  afterChange();
}

function toggleCell(r, c, target) {
  if (!g || busy || g.phase === 'bitti') return;
  setCell(r, c, g.cells[r][c] === target ? EMPTY : target);
}

const toolValue = () => (store.opts.tool === 'cross' ? CROSS : FILLED);

function giveHint() {
  if (!g || busy || g.phase === 'bitti') return;
  const n = g.size;
  const mistakes = [];
  const missing = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const v = g.cells[r][c];
      const want = g.sol[r][c];
      if (v === FILLED && want === 0) mistakes.push([r, c, CROSS]);
      else if (v === CROSS && want === 1) mistakes.push([r, c, FILLED]);
      else if (v === EMPTY && want === 1) missing.push([r, c, FILLED]);
    }
  }
  // Önce yanlış işaretlenmiş hücreyi düzelt; yoksa doğru bir dolu hücreyi aç
  const pool = mistakes.length ? mistakes : missing;
  if (!pool.length) return;
  const [r, c, v] = pool[Math.floor(Math.random() * pool.length)];
  startRun();
  g.cells[r][c] = v;
  g.hintSet.add(r * n + c);
  g.hints += 1;
  g.base += HINT_PENALTY_MS;
  moveCursor(r, c, false);
  showMsg(`İpucu: satır ${r + 1}, sütun ${c + 1} ${v === FILLED ? 'dolu olmalı' : 'boş olmalı (çarpı kondu)'}. Süreye ${HINT_PENALTY_MS / 1000} sn eklendi.`);
  afterChange();
}

function resetBoard() {
  if (!g || busy) return;
  g.cells = zeroGrid(g.size);
  g.hintSet = new Set();
  g.hints = 0;
  g.base = 0;
  g.runStart = null;
  g.phase = 'hazir';
  cellKey = cellKey.map((row) => row.map(() => -1));
  result.hidden = true;
  board.classList.remove('won');
  showMsg('Tahta temizlendi; süre sıfırlandı. İlk hamlenizde süre yeniden başlar.');
  renderAll();
  persist();
}

/* ---------- İmleç ve girdiler ---------- */

function moveCursor(r, c, focus = true) {
  const old = cellEls[cursor.r] && cellEls[cursor.r][cursor.c];
  if (old) old.tabIndex = -1;
  cursor = { r, c };
  const now = cellEls[r][c];
  now.tabIndex = 0;
  board.dataset.cursor = `${r},${c}`;
  if (focus) now.focus({ preventScroll: true });
}

const cellFrom = (t) => (t instanceof Element ? t.closest('.ng-cell') : null);

let drag = null; // fare/kalem ile sürükleyerek boyama
let touch = null; // dokunma: kısa dokunuş = seçili araç, uzun basış = çarpı

function paintCell(r, c, first) {
  const cur = g.cells[r][c];
  if (!first && (drag.erase ? cur !== drag.target : cur !== EMPTY)) return;
  if (cur === drag.value) return;
  setCell(r, c, drag.value);
}

function endTouch() {
  if (touch) clearTimeout(touch.timer);
  touch = null;
}

board.addEventListener('pointerdown', (e) => {
  const cell = cellFrom(e.target);
  if (!cell || !g || busy || g.phase === 'bitti') return;
  const r = Number(cell.dataset.r);
  const c = Number(cell.dataset.c);
  moveCursor(r, c, false);
  if (e.pointerType === 'touch') {
    endTouch();
    const t = { r, c, id: e.pointerId, x: e.clientX, y: e.clientY, fired: false, cancelled: false, timer: 0 };
    t.timer = setTimeout(() => {
      if (touch !== t || t.cancelled) return;
      t.fired = true;
      toggleCell(r, c, CROSS);
      if (navigator.vibrate) { try { navigator.vibrate(15); } catch (_) { /* desteklenmiyor */ } }
    }, LONG_PRESS_MS);
    touch = t;
    return;
  }
  if (e.button !== 0 && e.button !== 2) return;
  const target = e.button === 2 || e.shiftKey ? CROSS : toolValue();
  const erase = g.cells[r][c] === target;
  drag = { value: erase ? EMPTY : target, target, erase };
  paintCell(r, c, true);
});

board.addEventListener('pointermove', (e) => {
  if (touch && touch.id === e.pointerId) {
    if (Math.hypot(e.clientX - touch.x, e.clientY - touch.y) > MOVE_CANCEL_PX) touch.cancelled = true;
    return;
  }
  if (!drag || !g || e.buttons === 0) return;
  const cell = cellFrom(e.target);
  if (cell) paintCell(Number(cell.dataset.r), Number(cell.dataset.c), false);
});

const releasePointer = (e) => {
  drag = null;
  if (touch && touch.id === e.pointerId) {
    const t = touch;
    endTouch();
    if (e.type === 'pointerup' && !t.fired && !t.cancelled) toggleCell(t.r, t.c, toolValue());
  }
};
document.addEventListener('pointerup', releasePointer);
document.addEventListener('pointercancel', releasePointer);

// Sağ tık menüsü ve dokunmatik uzun basış menüsü tahtada açılmasın
board.addEventListener('contextmenu', (e) => e.preventDefault());

board.addEventListener('keydown', (e) => {
  const cell = cellFrom(e.target);
  if (!cell || !g || e.ctrlKey || e.metaKey || e.altKey) return;
  const n = g.size;
  let r = Number(cell.dataset.r);
  let c = Number(cell.dataset.c);
  switch (e.key) {
    case 'ArrowUp': r = Math.max(0, r - 1); break;
    case 'ArrowDown': r = Math.min(n - 1, r + 1); break;
    case 'ArrowLeft': c = Math.max(0, c - 1); break;
    case 'ArrowRight': c = Math.min(n - 1, c + 1); break;
    case 'Home': c = 0; break;
    case 'End': c = n - 1; break;
    case 'PageUp': r = 0; break;
    case 'PageDown': r = n - 1; break;
    case ' ': case 'Enter':
      e.preventDefault();
      toggleCell(r, c, toolValue());
      return;
    case 'x': case 'X':
      e.preventDefault();
      toggleCell(r, c, CROSS);
      return;
    case 'f': case 'F':
      e.preventDefault();
      toggleCell(r, c, FILLED);
      return;
    case 'Backspace': case 'Delete': case '0':
      e.preventDefault();
      setCell(r, c, EMPTY);
      return;
    default:
      return;
  }
  e.preventDefault();
  moveCursor(r, c);
});

/* ---------- Düğmeler ve ayarlar ---------- */

function syncTool() {
  const cross = store.opts.tool === 'cross';
  toolFill.setAttribute('aria-pressed', cross ? 'false' : 'true');
  toolCross.setAttribute('aria-pressed', cross ? 'true' : 'false');
  toolFill.classList.toggle('on', !cross);
  toolCross.classList.toggle('on', cross);
}
toolFill.addEventListener('click', () => { store.opts.tool = 'fill'; saveStore(); syncTool(); });
toolCross.addEventListener('click', () => { store.opts.tool = 'cross'; saveStore(); syncTool(); });

btnNew.addEventListener('click', () => startNew(Number(selSize.value), selSource.value));
btnNext.addEventListener('click', () => startNew(Number(selSize.value), selSource.value));
btnHint.addEventListener('click', giveHint);
btnReset.addEventListener('click', resetBoard);
selSize.addEventListener('change', () => startNew(Number(selSize.value), selSource.value));
selSource.addEventListener('change', () => startNew(Number(selSize.value), selSource.value));
chkErrors.addEventListener('change', () => {
  store.opts.errors = chkErrors.checked;
  saveStore();
  if (g) {
    cellKey = cellKey.map((row) => row.map(() => -1));
    renderAll();
    showMsg(chkErrors.checked ? 'Hata kontrolü açık: yanlış işaretler kırmızı çerçeveyle gösterilir.' : 'Hata kontrolü kapalı.');
  }
});

document.addEventListener('visibilitychange', () => {
  if (!g) return;
  if (document.hidden) { pauseRun(); persist(); } else { resumeRun(); }
});
window.addEventListener('pagehide', () => { persist(); });
setInterval(renderTime, 250);
if ('ResizeObserver' in window) new ResizeObserver(fit).observe(wrap);
window.addEventListener('resize', fit);

// Tarayıcı testleri için kanca: geçerli bulmacanın çözümünü döndürür (oyuncuya sunulan bir özellik değildir).
window.__nonogramTest = () => (g ? {
  size: g.size, source: g.source, name: g.name, state: g.phase,
  solution: g.sol.map((r) => r.slice()), rows: g.rows, cols: g.cols,
} : null);

/* ---------- Başlangıç ---------- */

selSize.value = String(store.opts.size);
selSource.value = store.opts.source;
chkErrors.checked = store.opts.errors;
syncTool();

const saved = restoreGame(store.game);
if (saved) {
  g = saved;
  selSize.value = String(g.size);
  selSource.value = g.source;
  if (solved()) {
    g = null; // kayıtlı tahta zaten çözülmüş: yeni bulmaca başlat
    startNew(store.opts.size, store.opts.source);
  } else {
    mountGame();
    const started = g.base > 0 || g.cells.some((row) => row.some((v) => v !== EMPTY));
    showMsg(started
      ? 'Kayıtlı bulmacanız yüklendi. İlk hamlenizde süre kaldığı yerden devam eder.'
      : `${g.size}×${g.size} bulmaca hazır. İlk hamlenizde süre başlar.`);
  }
} else {
  store.game = null;
  startNew(store.opts.size, store.opts.source);
}
