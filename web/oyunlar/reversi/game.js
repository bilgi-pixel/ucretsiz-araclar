// Reversi arayüzü: tahta çizimi, tıklama/klavye ile oynama, bilgisayar sırası (Web Worker), geri al, geçmiş.
// Kurallar ve yapay zekâ engine.js içindedir. Ağ isteği yok; yalnızca localStorage'a istatistik yazılır.
import {
  initialBoard, legalMoves, applyMove, nextTurn, settleTurn, gameResult, countDiscs, other,
  squareName, boardFromRows, boardToRows, chooseMove,
} from './engine.js';

const $ = (id) => document.getElementById(id);
const boardEl = $('rv-board');
const statusEl = $('rv-status');
const modeEl = $('rv-mode');
const levelEl = $('rv-level');
const colorEl = $('rv-color');
const hintsEl = $('rv-hints');
const countsEl = $('rv-counts');
const newBtn = $('rv-new');
const undoBtn = $('rv-undo');
const fullBtn = $('rv-full');
const historyEl = $('rv-history');
const statsEl = $('rv-stats');
const ranksEl = $('rv-ranks');
const filesEl = $('rv-files');
const overEl = $('rv-over');
const boxEl = document.querySelector('.game-box');

const STATS_KEY = 'ba-oyun-reversi';
const reduceMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let state; // { board, turn, over, result, passNote }
let stack = []; // geri alma anlık görüntüleri
let log = []; // { side, idx, flips }
let legal = [];
let lastMove = null;
let thinking = false;
let aiToken = 0;
let rovingDom = 19;
let statsRecorded = false;
let flipSet = new Set();
let flipTimer = 0;
let placed = -1;

const cells = [];

/* ---------- Ayarlar ---------- */
const mode = () => modeEl.value; // 'cpu' | 'two'
const human = () => colorEl.value; // 'b' | 'w'
const isHumanTurn = () => mode() === 'two' || state.turn === human();
const sideName = (s) => (s === 'b' ? 'Siyah' : 'Beyaz');

/* ---------- İstatistik (yalnızca bu cihazda; bozuk veri sıfır sayılır) ---------- */
function readStats() {
  try {
    const s = JSON.parse(localStorage.getItem(STATS_KEY) || '{}');
    if (!s || typeof s !== 'object') return { w: 0, l: 0, d: 0 };
    return { w: s.w | 0, l: s.l | 0, d: s.d | 0 };
  } catch { return { w: 0, l: 0, d: 0 }; }
}
function bumpStats(kind) {
  const s = readStats();
  s[kind]++;
  try { localStorage.setItem(STATS_KEY, JSON.stringify(s)); } catch { /* depolama kapalı olabilir */ }
}
function renderStats() {
  const s = readStats();
  statsEl.textContent = `Bilgisayara karşı: ${s.w} galibiyet · ${s.l} yenilgi · ${s.d} beraberlik`;
}

/* ---------- Tahta DOM'u ---------- */
function buildBoard() {
  boardEl.textContent = '';
  for (let r = 0; r < 8; r++) {
    const row = document.createElement('div');
    row.className = 'rv-row';
    row.setAttribute('role', 'row');
    for (let c = 0; c < 8; c++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'sq';
      b.setAttribute('role', 'gridcell');
      b.tabIndex = -1;
      b.dataset.dom = String(r * 8 + c);
      b.innerHTML = '<span class="disc"></span><span class="hint"></span>';
      row.appendChild(b);
      cells.push(b);
    }
    boardEl.appendChild(row);
  }
  for (let k = 0; k < 8; k++) {
    const r = document.createElement('span'); r.textContent = String(8 - k); ranksEl.appendChild(r);
    const f = document.createElement('span'); f.textContent = 'abcdefgh'[k]; filesEl.appendChild(f);
  }
}

const discLabel = (p) => (p === '.' ? 'boş' : p === 'b' ? 'siyah taş' : 'beyaz taş');

function render() {
  const humanTurn = !state.over && isHumanTurn() && !thinking;
  const legalMap = new Map();
  if (humanTurn) for (const m of legal) legalMap.set(m.idx, m.flips.length);
  const showCounts = countsEl.checked;

  cells.forEach((el, i) => {
    const p = state.board[i];
    el.dataset.sq = squareName(i);
    el.dataset.piece = p === '.' ? '' : p;
    const disc = el.firstChild;
    let cls = 'disc' + (p === '.' ? '' : ` d-${p}`);
    if (flipSet.has(i) && !reduceMotion()) cls += ` is-flip from-${other(p)}`;
    if (placed === i && !reduceMotion()) cls += ' is-placed';
    if (disc.className !== cls) disc.className = cls;
    const isLegal = legalMap.has(i);
    el.classList.toggle('is-legal', isLegal);
    el.classList.toggle('is-last', !!lastMove && i === lastMove);
    const hint = el.lastChild;
    const t = isLegal && showCounts ? String(legalMap.get(i)) : '';
    if (hint.textContent !== t) hint.textContent = t;
    el.tabIndex = i === rovingDom ? 0 : -1;
    let label = `${squareName(i)}, ${discLabel(p)}`;
    if (isLegal) label += `, geçerli hamle, ${legalMap.get(i)} taş çevirir`;
    el.setAttribute('aria-label', label);
  });

  const n = countDiscs(state.board);
  $('rv-count-b').textContent = String(n.b);
  $('rv-count-w').textContent = String(n.w);

  statusEl.className = 'rv-status';
  let msg;
  if (state.over) {
    const r = state.result;
    if (r.winner === null) msg = `Oyun berabere bitti. ${r.reason}.`;
    else if (mode() === 'cpu') msg = r.winner === human() ? `Tebrikler, kazandınız! ${r.reason}.` : `Bilgisayar kazandı. ${r.reason}.`;
    else msg = `${sideName(r.winner)} kazandı. ${r.reason}.`;
    statusEl.classList.add('is-over');
  } else if (thinking) {
    msg = (state.passNote || '') + 'Bilgisayar düşünüyor…';
  } else {
    msg = (state.passNote || '') + (mode() === 'cpu' ? `Sıra sizde (${sideName(state.turn)}).` : `Sıra: ${sideName(state.turn)}.`);
    msg += ` ${legal.length} geçerli hamle var.`;
    if (state.passNote) statusEl.classList.add('is-pass');
  }
  if (statusEl.textContent !== msg) statusEl.textContent = msg;

  const canUndo = mode() === 'cpu' ? stack.some((s) => s.turn === human()) : stack.length > 0;
  undoBtn.disabled = !canUndo || thinking;
  boardEl.classList.toggle('rv-hints', hintsEl.checked);
  boardEl.classList.toggle('rv-counts', showCounts);
  boardEl.setAttribute('aria-busy', thinking ? 'true' : 'false');
  boardEl.dataset.turn = state.turn || '';
  boardEl.dataset.over = state.over ? '1' : '0';
  renderOver();
  renderHistory();
}

let overDismissed = false;
function renderOver() {
  const show = state.over && !overDismissed;
  overEl.hidden = !show;
  if (!show) return;
  const r = state.result;
  let title;
  if (r.winner === null) title = 'Berabere!';
  else if (mode() === 'cpu') title = r.winner === human() ? 'Kazandınız!' : 'Bilgisayar kazandı';
  else title = `${sideName(r.winner)} kazandı!`;
  $('rv-over-title').textContent = title;
  $('rv-over-text').textContent = `Siyah ${r.b} – Beyaz ${r.w}` + (r.empty ? ` (${r.empty} kare boş kaldı)` : '');
}

function renderHistory() {
  if (historyEl.dataset.count === String(log.length)) return;
  historyEl.dataset.count = String(log.length);
  historyEl.textContent = '';
  for (const e of log) {
    const li = document.createElement('li');
    li.textContent = `${sideName(e.side)} ${squareName(e.idx)} (+${e.flips})`;
    historyEl.appendChild(li);
  }
  if (!log.length) {
    const li = document.createElement('li');
    li.className = 'is-empty';
    li.textContent = 'Henüz hamle yok.';
    historyEl.appendChild(li);
  }
  historyEl.scrollTop = historyEl.scrollHeight;
}

/* ---------- Oyun akışı ---------- */
function applySettle(r) {
  if (r.over) {
    state.over = true;
    state.result = gameResult(state.board);
    state.turn = null;
    state.passNote = '';
    if (mode() === 'cpu' && !statsRecorded) {
      statsRecorded = true;
      const w = state.result.winner;
      bumpStats(w === null ? 'd' : w === human() ? 'w' : 'l');
      renderStats();
    }
  } else {
    state.over = false;
    state.result = null;
    state.turn = r.turn;
    state.passNote = r.passed ? `${sideName(r.passedSide)} oynayacak hamle bulamadı, pas geçti. ` : '';
  }
  legal = state.over ? [] : legalMoves(state.board, state.turn);
}

function newGame(rows, turn) {
  aiToken++;
  cancelPending && cancelPending();
  thinking = false;
  state = { board: rows ? boardFromRows(rows) : initialBoard(), turn: turn || 'b', over: false, result: null, passNote: '' };
  stack = [];
  log = [];
  lastMove = null;
  placed = -1;
  flipSet = new Set();
  statsRecorded = false;
  overDismissed = false;
  rovingDom = 19;
  historyEl.dataset.count = '';
  applySettle(settleTurn(state.board, state.turn));
  state.passNote = '';
  render();
  maybeComputer();
}

function commit(move) {
  const side = state.turn;
  stack.push({ board: state.board, turn: side, logLen: log.length, lastMove, passNote: state.passNote });
  log.push({ side, idx: move.idx, flips: move.flips.length });
  state.board = applyMove(state.board, move, side);
  lastMove = move.idx;
  placed = move.idx;
  flipSet = new Set(move.flips);
  clearTimeout(flipTimer);
  flipTimer = setTimeout(() => { flipSet = new Set(); placed = -1; if (state) render(); }, 700);
  applySettle(nextTurn(state.board, side));
  render();
  maybeComputer();
}

/* ---------- Bilgisayar: Web Worker, olmazsa ana iş parçacığı ---------- */
let worker = null;
let workerBroken = false;
let reqId = 0;
let cancelPending = null;

function requestMove(board, side, level) {
  return new Promise((resolve, reject) => {
    const fallback = () => {
      const t = setTimeout(() => {
        try { const m = chooseMove(board, side, level); resolve(m ? m.idx : -1); } catch (e) { reject(e); }
      }, 30);
      cancelPending = () => clearTimeout(t);
    };
    if (workerBroken || typeof Worker === 'undefined') { fallback(); return; }
    let w;
    try {
      if (!worker) worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });
      w = worker;
    } catch { workerBroken = true; worker = null; fallback(); return; }
    const id = ++reqId;
    const done = () => { w.removeEventListener('message', onMsg); w.removeEventListener('error', onErr); cancelPending = null; };
    const drop = () => { try { w.terminate(); } catch { /* zaten kapalı */ } if (worker === w) worker = null; };
    const onMsg = (e) => {
      if (!e.data || e.data.id !== id) return;
      done();
      if (e.data.ok) resolve(e.data.idx); else reject(new Error(e.data.error));
    };
    const onErr = () => { done(); drop(); workerBroken = true; fallback(); };
    w.addEventListener('message', onMsg);
    w.addEventListener('error', onErr);
    cancelPending = () => { done(); drop(); }; // iptal: bayat sonuç gelmesin
    w.postMessage({ id, board, side, level });
  });
}

function maybeComputer() {
  if (state.over || mode() !== 'cpu' || state.turn === human()) return;
  thinking = true;
  render();
  const token = ++aiToken;
  const t0 = performance.now();
  requestMove(state.board.slice(), state.turn, levelEl.value).then(async (idx) => {
    if (token !== aiToken) return;
    const wait = 420 - (performance.now() - t0);
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    if (token !== aiToken) return;
    thinking = false;
    const mv = legal.find((m) => m.idx === idx) || legal[0];
    if (mv) commit(mv); else render();
  }).catch(() => {
    if (token !== aiToken) return;
    thinking = false;
    // Hesaplama başarısızsa ilk geçerli hamleyi oyna; oyun kilitlenmesin.
    if (legal[0]) commit(legal[0]); else render();
  });
}

function undo() {
  if (undoBtn.disabled) return;
  aiToken++;
  cancelPending && cancelPending();
  thinking = false;
  do {
    const s = stack.pop();
    state.board = s.board; state.turn = s.turn;
    log.length = s.logLen; lastMove = s.lastMove;
  } while (mode() === 'cpu' && state.turn !== human() && stack.length);
  flipSet = new Set(); placed = -1;
  overDismissed = false;
  state.over = false; state.result = null;
  legal = legalMoves(state.board, state.turn);
  state.passNote = '';
  render();
  maybeComputer();
}

/* ---------- Tıklama ve klavye ---------- */
function onSquare(d) {
  rovingDom = d;
  if (state.over || thinking || !isHumanTurn()) { render(); return; }
  const mv = legal.find((m) => m.idx === d);
  if (mv) { commit(mv); return; }
  render();
  statusEl.textContent = 'Bu kareye taş koyamazsınız: en az bir rakip taşı çevirmelidir. İşaretli karelerden birini seçin.';
}

boardEl.addEventListener('click', (e) => {
  const btn = e.target.closest('button.sq');
  if (btn) onSquare(Number(btn.dataset.dom));
});

boardEl.addEventListener('keydown', (e) => {
  const btn = e.target.closest('button.sq');
  if (!btn) return;
  const d = Number(btn.dataset.dom);
  let nd = d;
  if (e.key === 'ArrowLeft') nd = d % 8 > 0 ? d - 1 : d;
  else if (e.key === 'ArrowRight') nd = d % 8 < 7 ? d + 1 : d;
  else if (e.key === 'ArrowUp') nd = d >= 8 ? d - 8 : d;
  else if (e.key === 'ArrowDown') nd = d < 56 ? d + 8 : d;
  else return;
  e.preventDefault();
  rovingDom = nd;
  render();
  cells[nd].focus();
});

/* ---------- Kontroller ---------- */
function syncControls() {
  const cpu = mode() === 'cpu';
  levelEl.closest('.rv-field').hidden = !cpu;
  colorEl.closest('.rv-field').hidden = !cpu;
  statsEl.hidden = !cpu;
}

modeEl.addEventListener('change', () => { syncControls(); newGame(); });
colorEl.addEventListener('change', () => newGame());
levelEl.addEventListener('change', () => render());
hintsEl.addEventListener('change', () => render());
countsEl.addEventListener('change', () => render());
newBtn.addEventListener('click', () => newGame());
undoBtn.addEventListener('click', () => undo());
$('rv-over-new').addEventListener('click', () => newGame());
$('rv-over-close').addEventListener('click', () => { overDismissed = true; render(); });

// Tam ekran: reklam alanları oyun kutusunun dışında olduğundan tam ekranda görünmez.
if (document.fullscreenEnabled && boxEl.requestFullscreen) {
  fullBtn.hidden = false;
  fullBtn.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else boxEl.requestFullscreen().catch(() => {});
  });
  document.addEventListener('fullscreenchange', () => {
    fullBtn.textContent = document.fullscreenElement ? 'Tam ekrandan çık' : 'Tam ekran';
  });
}

/* ---------- Başlat ---------- */
buildBoard();
syncControls();
renderStats();
newGame();

// Test ve hata ayıklama kancası: gizli bilgi taşımaz, yalnızca tahtayı kurar/okur.
window.__reversiDebug = {
  setPosition(rows, turn = 'b') { newGame(rows, turn); },
  getPosition() { return { rows: boardToRows(state.board), turn: state.turn, over: state.over }; },
  legal() { return legal.map((m) => squareName(m.idx)); },
};
