// Dama oyunu arayüzü: tahta çizimi, tıklama/klavye ile oynama, bilgisayar sırası, geri al, geçmiş.
// Kurallar ve yapay zekâ engine.js içindedir. Ağ isteği yok; yalnızca localStorage'a istatistik yazılır.
import {
  initialBoard, legalMoves, applyMove, notation, gameStatus, chooseMove, countPieces,
  sideOf, isKing, other, squareName, boardFromRows, boardToRows,
} from './engine.js';

const $ = (id) => document.getElementById(id);
const boardEl = $('dm-board');
const statusEl = $('dm-status');
const modeEl = $('dm-mode');
const levelEl = $('dm-level');
const colorEl = $('dm-color');
const hintsEl = $('dm-hints');
const newBtn = $('dm-new');
const undoBtn = $('dm-undo');
const historyEl = $('dm-history');
const statsEl = $('dm-stats');
const ranksEl = $('dm-ranks');
const filesEl = $('dm-files');

const STATS_KEY = 'ba-oyun-dama-istatistik';
const CROWN = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3.5 18.5h17l1-11-5.2 4.2L12 5 7.7 11.7 2.5 7.5z" fill="currentColor"/><rect x="4" y="19.5" width="16" height="2" rx="1" fill="currentColor"/></svg>';

let state; // { board, turn, noProgress, over, result }
let stack = []; // geri alma anlık görüntüleri
let log = []; // { side, text }
let selected = null;
let partial = null; // { from, path } — çok adımlı almada yarım kalan hamle
let legal = [];
let lastMove = null;
let thinking = false;
let aiToken = 0;
let flip = false;
let rovingDom = 56; // klavye odağındaki kare (DOM sırası)
let statsRecorded = false;

const cells = []; // DOM sırasına göre 64 düğme
const rankEls = [];
const fileEls = [];

/* ---------- Ayarlar ---------- */
const mode = () => modeEl.value; // 'cpu' | 'two'
const human = () => colorEl.value; // 'w' | 'b'
const isHumanTurn = () => mode() === 'two' || state.turn === human();
const sideName = (s) => (s === 'w' ? 'Beyaz' : 'Siyah');

/* ---------- İstatistik (yalnızca bu cihazda) ---------- */
function readStats() {
  try {
    const s = JSON.parse(localStorage.getItem(STATS_KEY) || '{}');
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
  for (let dr = 0; dr < 8; dr++) {
    const row = document.createElement('div');
    row.className = 'dm-row';
    row.setAttribute('role', 'row');
    for (let dc = 0; dc < 8; dc++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'sq';
      b.setAttribute('role', 'gridcell');
      b.tabIndex = -1;
      b.dataset.dom = String(dr * 8 + dc);
      b.innerHTML = '<span class="pc"></span>';
      row.appendChild(b);
      cells.push(b);
    }
    boardEl.appendChild(row);
  }
  // Tahta dışındaki koordinat etiketleri (8-1 ve a-h); tahta çevrilince metinleri güncellenir.
  for (let k = 0; k < 8; k++) {
    const r = document.createElement('span'); ranksEl.appendChild(r); rankEls.push(r);
    const f = document.createElement('span'); filesEl.appendChild(f); fileEls.push(f);
  }
}

const domToBoard = (d) => (flip ? 63 - d : d);
const boardToDom = (i) => (flip ? 63 - i : i);

/** Ekranda gösterilecek tahta: yarım kalan almada taş ara karede, alınanlar soluk. */
function displayState() {
  const board = state.board.slice();
  const taken = new Set();
  if (partial) {
    const piece = board[partial.from];
    board[partial.from] = '.';
    board[partial.path[partial.path.length - 1]] = piece;
    const cand = candidates()[0];
    if (cand) cand.captured.slice(0, partial.path.length).forEach((i) => taken.add(i));
  }
  return { board, taken };
}

function candidates() {
  if (selected === null) return [];
  const path = partial ? partial.path : [];
  return legal.filter((m) => m.from === selected && path.every((p, i) => m.path[i] === p));
}

const pieceLabel = (p) => (p === '.' ? 'boş' : `${p.toLowerCase() === 'w' ? 'beyaz' : 'siyah'} ${isKing(p) ? 'dama' : 'taş'}`);

function render() {
  const { board, taken } = displayState();
  const cands = candidates();
  const nextStep = partial ? partial.path.length : 0;
  const dests = new Map(); // indeks → alma mı
  for (const m of cands) if (m.path.length > nextStep) dests.set(m.path[nextStep], m.capture);
  const humanTurn = !state.over && isHumanTurn() && !thinking;
  const movable = new Set();
  const must = new Set();
  if (humanTurn && !partial) {
    for (const m of legal) { movable.add(m.from); if (m.capture) must.add(m.from); }
  }
  const forced = legal.length && legal[0].capture;

  for (let k = 0; k < 8; k++) {
    rankEls[k].textContent = String(flip ? k + 1 : 8 - k);
    fileEls[k].textContent = 'abcdefgh'[flip ? 7 - k : k];
  }
  cells.forEach((el, d) => {
    const i = domToBoard(d);
    const p = board[i];
    el.dataset.sq = squareName(i);
    el.dataset.piece = p === '.' ? '' : p;
    const pc = el.firstChild;
    pc.className = 'pc' + (p === '.' ? '' : ` pc-${p.toLowerCase()}${isKing(p) ? ' pc-k' : ''}`) + (taken.has(i) ? ' is-taken' : '');
    pc.innerHTML = isKing(p) ? CROWN : '';
    const isSel = selected !== null && (partial ? i === partial.path[partial.path.length - 1] : i === selected);
    el.classList.toggle('is-selected', isSel);
    el.classList.toggle('is-dest', dests.has(i) && !dests.get(i));
    el.classList.toggle('is-dest-cap', dests.has(i) && dests.get(i));
    el.classList.toggle('is-movable', movable.has(i) && !must.has(i));
    el.classList.toggle('is-must', must.has(i));
    el.classList.toggle('is-last', !!lastMove && (i === lastMove.from || i === lastMove.to));
    el.tabIndex = d === rovingDom ? 0 : -1;
    let label = `${squareName(i)}, ${pieceLabel(p)}`;
    if (isSel) label += ', seçili';
    if (dests.has(i)) label += dests.get(i) ? ', alma hamlesi' : ', gidilebilir';
    if (must.has(i)) label += ', alma zorunlu';
    el.setAttribute('aria-label', label);
  });

  // Taş sayacı
  const n = countPieces(state.board);
  $('dm-count-w').textContent = `${n.w}`;
  $('dm-count-b').textContent = `${n.b}`;
  $('dm-king-w').textContent = `${n.wKing}`;
  $('dm-king-b').textContent = `${n.bKing}`;
  $('dm-lost-w').textContent = `${16 - n.w}`;
  $('dm-lost-b').textContent = `${16 - n.b}`;

  // Durum satırı
  statusEl.className = 'dm-status';
  let msg;
  if (state.over) {
    const r = state.result;
    if (r.winner === null) msg = `Oyun berabere bitti. ${r.reason}.`;
    else if (mode() === 'cpu') msg = r.winner === human() ? `Tebrikler, kazandınız! ${r.reason}.` : `Bilgisayar kazandı. ${r.reason}.`;
    else msg = `${sideName(r.winner)} kazandı. ${r.reason}.`;
    statusEl.classList.add('is-over');
  } else if (thinking) {
    msg = 'Bilgisayar düşünüyor…';
  } else if (partial) {
    msg = 'Almaya devam edin: işaretli kareye tıklayın (iptal için Esc).';
  } else {
    msg = mode() === 'cpu' ? `Sıra sizde (${sideName(state.turn)}).` : `Sıra: ${sideName(state.turn)}.`;
    if (forced) {
      const k = legal[0].captured.length;
      msg += ` Alma zorunlu: ${k} taş alan yolu oynamalısınız.`;
      statusEl.classList.add('is-forced');
    }
  }
  if (statusEl.textContent !== msg) statusEl.textContent = msg;

  undoBtn.disabled = stack.length === 0 || thinking;
  boardEl.classList.toggle('dm-hints', hintsEl.checked);
  boardEl.setAttribute('aria-busy', thinking ? 'true' : 'false');
  boardEl.dataset.turn = state.turn;
  boardEl.dataset.over = state.over ? '1' : '0';
  renderHistory();
}

function renderHistory() {
  if (historyEl.dataset.count === String(log.length)) return;
  historyEl.dataset.count = String(log.length);
  historyEl.textContent = '';
  for (let i = 0; i < log.length; i += 2) {
    const li = document.createElement('li');
    const a = document.createElement('span');
    a.textContent = log[i].text;
    li.appendChild(a);
    if (log[i + 1]) {
      const b = document.createElement('span');
      b.textContent = log[i + 1].text;
      li.appendChild(b);
    }
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
function refreshLegal() {
  legal = state.over ? [] : legalMoves(state.board, state.turn);
}

function newGame(rows, turn) {
  aiToken++;
  thinking = false;
  flip = mode() === 'cpu' && human() === 'b';
  state = { board: rows ? boardFromRows(rows) : initialBoard(), turn: turn || 'w', noProgress: 0, over: false, result: null };
  stack = [];
  log = [];
  selected = null;
  partial = null;
  lastMove = null;
  statsRecorded = false;
  rovingDom = flip ? 7 : 56;
  historyEl.dataset.count = '';
  checkEnd();
  refreshLegal();
  render();
  maybeComputer();
}

function checkEnd() {
  const r = gameStatus(state.board, state.turn, state.noProgress);
  if (r.over) {
    state.over = true;
    state.result = r;
    if (mode() === 'cpu' && !statsRecorded) {
      statsRecorded = true;
      bumpStats(r.winner === null ? 'd' : r.winner === human() ? 'w' : 'l');
      renderStats();
    }
  } else { state.over = false; state.result = null; }
}

function commit(move) {
  stack.push({
    board: state.board, turn: state.turn, noProgress: state.noProgress,
    logLen: log.length, lastMove,
  });
  const piece = state.board[move.from];
  const progress = move.capture || !isKing(piece);
  log.push({ side: state.turn, text: notation(move) });
  lastMove = { from: move.from, to: move.path[move.path.length - 1] };
  state.board = applyMove(state.board, move);
  state.noProgress = progress ? 0 : state.noProgress + 1;
  state.turn = other(state.turn);
  selected = null;
  partial = null;
  checkEnd();
  refreshLegal();
  render();
  maybeComputer();
}

function maybeComputer() {
  if (state.over || mode() !== 'cpu' || state.turn === human()) return;
  thinking = true;
  render();
  const token = ++aiToken;
  setTimeout(() => {
    if (token !== aiToken) return;
    const mv = chooseMove(state.board, state.turn, levelEl.value);
    thinking = false;
    if (mv) commit(mv); else { checkEnd(); render(); }
  }, 380);
}

function undo() {
  if (!stack.length || thinking) return;
  aiToken++;
  thinking = false;
  do {
    const s = stack.pop();
    state.board = s.board; state.turn = s.turn; state.noProgress = s.noProgress;
    log.length = s.logLen; lastMove = s.lastMove;
  } while (mode() === 'cpu' && state.turn !== human() && stack.length);
  state.over = false; state.result = null;
  selected = null; partial = null;
  checkEnd();
  refreshLegal();
  render();
  maybeComputer();
}

/* ---------- Tıklama ---------- */
function advance(idx) {
  const from = partial ? partial.from : selected;
  const path = partial ? partial.path.concat(idx) : [idx];
  const full = legal.find((m) => m.from === from && m.path.length === path.length && path.every((p, i) => m.path[i] === p));
  if (full) { commit(full); return; }
  partial = { from, path };
  selected = from;
  render();
}

function onSquare(d) {
  rovingDom = d;
  const idx = domToBoard(d);
  if (state.over || thinking || !isHumanTurn()) { render(); return; }
  const piece = state.board[idx];

  if (partial) {
    const step = partial.path.length;
    const hit = candidates().find((m) => m.path.length > step && m.path[step] === idx);
    if (hit) advance(idx);
    else if (idx === partial.from || idx === partial.path[step - 1]) { partial = null; selected = null; render(); } else statusEl.textContent = 'Almaya devam edin: işaretli kareye tıklayın (iptal için Esc).';
    return;
  }

  if (selected !== null && legal.some((m) => m.from === selected && m.path[0] === idx)) { advance(idx); return; }

  if (sideOf(piece) === state.turn) {
    if (legal.some((m) => m.from === idx)) {
      selected = selected === idx ? null : idx;
      render();
    } else {
      selected = null;
      render();
      statusEl.textContent = legal[0] && legal[0].capture
        ? 'Alma zorunlu: kırmızı halkalı taşlardan biriyle almalısınız.'
        : 'Bu taşın gidebileceği kare yok. Işıklı çerçeveli taşlardan birini seçin.';
    }
    return;
  }
  selected = null;
  render();
}

boardEl.addEventListener('click', (e) => {
  const btn = e.target.closest('button.sq');
  if (btn) onSquare(Number(btn.dataset.dom));
});

/* Klavye: ok tuşlarıyla kare gez, Enter/Boşluk seç, Esc iptal. */
boardEl.addEventListener('keydown', (e) => {
  const btn = e.target.closest('button.sq');
  if (!btn) return;
  const d = Number(btn.dataset.dom);
  let nd = d;
  if (e.key === 'ArrowLeft') nd = d % 8 > 0 ? d - 1 : d;
  else if (e.key === 'ArrowRight') nd = d % 8 < 7 ? d + 1 : d;
  else if (e.key === 'ArrowUp') nd = d >= 8 ? d - 8 : d;
  else if (e.key === 'ArrowDown') nd = d < 56 ? d + 8 : d;
  else if (e.key === 'Escape') {
    if (partial || selected !== null) { partial = null; selected = null; render(); }
    return;
  } else return;
  e.preventDefault();
  rovingDom = nd;
  render();
  cells[nd].focus();
});

/* ---------- Kontroller ---------- */
function syncControls() {
  const cpu = mode() === 'cpu';
  levelEl.closest('.dm-field').hidden = !cpu;
  colorEl.closest('.dm-field').hidden = !cpu;
  statsEl.hidden = !cpu;
}

modeEl.addEventListener('change', () => { syncControls(); newGame(); });
colorEl.addEventListener('change', () => newGame());
levelEl.addEventListener('change', () => render());
hintsEl.addEventListener('change', () => render());
newBtn.addEventListener('click', () => newGame());
undoBtn.addEventListener('click', () => undo());
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && (partial || selected !== null) && !boardEl.contains(e.target)) { partial = null; selected = null; render(); }
});

/* ---------- Başlat ---------- */
buildBoard();
syncControls();
renderStats();
newGame();

// Test ve hata ayıklama kancası: gizli bilgi taşımaz, yalnızca tahtayı kurar/okur.
window.__damaDebug = {
  setPosition(rows, turn = 'w') { newGame(rows, turn); },
  getPosition() { return { rows: boardToRows(state.board), turn: state.turn, over: state.over }; },
  legal() { return legal.map((m) => notation(m)); },
};
