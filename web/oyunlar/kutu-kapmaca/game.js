// Kutu kapmaca arayüzü: ızgara çizimi, çizgiye tıklama/klavye, bilgisayar sırası, geri al, skor, istatistik.
// Kurallar ve yapay zekâ engine.js içindedir. Ağ isteği yok; yalnızca localStorage'a istatistik yazılır.
import {
  createState, play, isOver, result, chooseEdge, edgeInfo, edgeName, edgeCount, adjacency, other,
} from './engine.js';

const $ = (id) => document.getElementById(id);
const boardEl = $('kk-board');
const statusEl = $('kk-status');
const modeEl = $('kk-mode');
const levelEl = $('kk-level');
const sizeEl = $('kk-size');
const firstEl = $('kk-first');
const newBtn = $('kk-new');
const undoBtn = $('kk-undo');
const fullBtn = $('kk-full');
const statsEl = $('kk-stats');
const overEl = $('kk-over');
const boxEl = document.querySelector('.game-box');

const STATS_KEY = 'ba-oyun-kutu-kapmaca';

let state;
let n = 3;
let stack = []; // geri alma anlık görüntüleri: { state, lastEdge }
let lastEdge = -1;
let note = '';
let thinking = false;
let aiToken = 0;
let statsRecorded = false;
let overDismissed = false;
let edgeEls = []; // kenar numarası -> düğme
let boxEls = []; // kutu numarası -> öğe

/* ---------- Ayarlar ---------- */
const mode = () => modeEl.value; // 'cpu' | 'two'
const isHumanTurn = () => mode() === 'two' || state.turn === 1;
const nameOf = (p) => (mode() === 'cpu' ? (p === 1 ? 'Siz' : 'Bilgisayar') : `${p}. oyuncu`);
const initialOf = (p) => (mode() === 'cpu' ? (p === 1 ? 'S' : 'B') : String(p));

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

/* ---------- Izgara DOM'u ---------- */
function buildBoard() {
  boardEl.textContent = '';
  edgeEls = new Array(edgeCount(n));
  boxEls = new Array(n * n);
  const H = (n + 1) * n;
  boardEl.style.setProperty('--n', String(n));
  boardEl.dataset.n = String(n);
  for (let gr = 0; gr <= 2 * n; gr++) {
    for (let gc = 0; gc <= 2 * n; gc++) {
      const evenR = gr % 2 === 0;
      const evenC = gc % 2 === 0;
      let el;
      if (evenR && evenC) {
        el = document.createElement('span');
        el.className = 'dot';
      } else if (!evenR && !evenC) {
        el = document.createElement('div');
        el.className = 'box';
        boxEls[((gr - 1) / 2) * n + (gc - 1) / 2] = el;
      } else {
        el = document.createElement('button');
        el.type = 'button';
        const e = evenR ? (gr / 2) * n + (gc - 1) / 2 : H + ((gr - 1) / 2) * (n + 1) + gc / 2;
        el.className = 'ed ' + (evenR ? 'h' : 'v');
        el.dataset.e = String(e);
        el.dataset.gr = String(gr);
        el.dataset.gc = String(gc);
        el.setAttribute('aria-label', edgeName(n, e));
        el.setAttribute('aria-pressed', 'false');
        edgeEls[e] = el;
      }
      boardEl.appendChild(el);
    }
  }
}

function render() {
  const humanTurn = !state.over && isHumanTurn() && !thinking;
  for (let e = 0; e < edgeEls.length; e++) {
    const el = edgeEls[e];
    const p = state.edges[e];
    const cls = 'ed ' + el.classList[1] + (p ? ` p${p}` : '') + (e === lastEdge ? ' is-last' : '') + (!p && humanTurn ? ` t${state.turn}` : '');
    if (el.className !== cls) el.className = cls;
    el.setAttribute('aria-pressed', p ? 'true' : 'false');
    const label = edgeName(n, e) + (p ? `, çizildi (${nameOf(p)})` : ', boş');
    if (el.getAttribute('aria-label') !== label) el.setAttribute('aria-label', label);
  }
  for (let b = 0; b < boxEls.length; b++) {
    const o = state.owners[b];
    const el = boxEls[b];
    const cls = 'box' + (o ? ` o${o}` : '');
    if (el.className !== cls) el.className = cls;
    const t = o ? initialOf(o) : '';
    if (el.textContent !== t) el.textContent = t;
    el.dataset.owner = String(o);
  }
  $('kk-score-1').textContent = String(state.scores[0]);
  $('kk-score-2').textContent = String(state.scores[1]);
  $('kk-name-1').textContent = nameOf(1);
  $('kk-name-2').textContent = nameOf(2);
  $('kk-card-1').classList.toggle('is-turn', !state.over && state.turn === 1);
  $('kk-card-2').classList.toggle('is-turn', !state.over && state.turn === 2);

  statusEl.className = 'kk-status';
  let msg;
  if (state.over) {
    const r = result(state);
    const tally = `${r.scores[0]} – ${r.scores[1]}`;
    if (r.winner === null) msg = `Oyun berabere bitti (${tally}).`;
    else if (mode() === 'cpu') msg = r.winner === 1 ? `Tebrikler, kazandınız! (${tally})` : `Bilgisayar kazandı (${tally}).`;
    else msg = `${nameOf(r.winner)} kazandı (${tally}).`;
    statusEl.classList.add('is-over');
  } else if (thinking) {
    msg = (note ? note + ' ' : '') + 'Bilgisayar düşünüyor…';
  } else {
    msg = (note ? note + ' ' : '') + (mode() === 'cpu' ? 'Sıra sizde.' : `Sıra: ${nameOf(state.turn)}.`);
    if (note) statusEl.classList.add('is-bonus');
  }
  if (statusEl.textContent !== msg) statusEl.textContent = msg;

  const canUndo = mode() === 'cpu' ? stack.some((s) => s.state.turn === 1) : stack.length > 0;
  undoBtn.disabled = !canUndo || thinking;
  boardEl.setAttribute('aria-busy', thinking ? 'true' : 'false');
  boardEl.dataset.turn = String(state.turn);
  boardEl.dataset.over = state.over ? '1' : '0';
  boardEl.dataset.moves = String(stack.length);
  renderOver();
}

function renderOver() {
  const show = state.over && !overDismissed;
  overEl.hidden = !show;
  if (!show) return;
  const r = result(state);
  let title;
  if (r.winner === null) title = 'Berabere!';
  else if (mode() === 'cpu') title = r.winner === 1 ? 'Kazandınız!' : 'Bilgisayar kazandı';
  else title = `${nameOf(r.winner)} kazandı!`;
  $('kk-over-title').textContent = title;
  $('kk-over-text').textContent = `${nameOf(1)} ${r.scores[0]} – ${nameOf(2)} ${r.scores[1]}`;
}

/* ---------- Oyun akışı ---------- */
function startState(s) {
  aiToken++;
  thinking = false;
  state = s;
  state.over = isOver(s);
  stack = [];
  lastEdge = -1;
  note = '';
  statsRecorded = false;
  overDismissed = false;
  render();
  maybeComputer();
}

function newGame() {
  n = Number(sizeEl.value) || 3;
  buildBoard();
  const first = mode() === 'cpu' && firstEl.value === 'cpu' ? 2 : 1;
  startState(createState(n, first));
}

function commit(e) {
  stack.push({ state, lastEdge });
  const mover = state.turn;
  const r = play(state, e);
  state = r.state;
  lastEdge = e;
  state.over = isOver(state);
  note = r.completed.length
    ? (mode() === 'cpu' ? (mover === 1 ? `Siz ${r.completed.length} kutu aldınız` : `Bilgisayar ${r.completed.length} kutu aldı`) : `${nameOf(mover)} ${r.completed.length} kutu aldı`) + (state.over ? '.' : ' ve yeniden oynuyor.')
    : '';
  if (state.over && mode() === 'cpu' && !statsRecorded) {
    statsRecorded = true;
    const w = result(state).winner;
    bumpStats(w === null ? 'd' : w === 1 ? 'w' : 'l');
    renderStats();
  }
  render();
  maybeComputer();
}

function maybeComputer() {
  if (state.over || mode() !== 'cpu' || state.turn !== 2) return;
  thinking = true;
  render();
  const token = ++aiToken;
  setTimeout(() => {
    if (token !== aiToken) return;
    thinking = false;
    const e = chooseEdge(state, levelEl.value);
    if (e >= 0) commit(e); else render();
  }, 450);
}

function undo() {
  if (undoBtn.disabled) return;
  aiToken++;
  thinking = false;
  do {
    const s = stack.pop();
    state = s.state;
    lastEdge = s.lastEdge;
  } while (mode() === 'cpu' && state.turn !== 1 && stack.length);
  state.over = false;
  note = '';
  overDismissed = false;
  render();
  maybeComputer();
}

/* ---------- Tıklama ve klavye ---------- */
boardEl.addEventListener('click', (ev) => {
  const btn = ev.target.closest('button.ed');
  if (!btn) return;
  const e = Number(btn.dataset.e);
  if (state.over || thinking || !isHumanTurn()) return;
  if (state.edges[e]) { statusEl.textContent = 'Bu çizgi zaten çizildi. Boş bir çizgi seçin.'; return; }
  commit(e);
});

// Ok tuşları aynı yöndeki komşu çizgiye geçer; Tab tüm çizgileri sırayla dolaşır.
boardEl.addEventListener('keydown', (ev) => {
  const btn = ev.target.closest('button.ed');
  if (!btn) return;
  const gr = Number(btn.dataset.gr);
  const gc = Number(btn.dataset.gc);
  let tr = gr;
  let tc = gc;
  if (ev.key === 'ArrowLeft') tc -= 2;
  else if (ev.key === 'ArrowRight') tc += 2;
  else if (ev.key === 'ArrowUp') tr -= 2;
  else if (ev.key === 'ArrowDown') tr += 2;
  else return;
  ev.preventDefault();
  const target = boardEl.querySelector(`button.ed[data-gr="${tr}"][data-gc="${tc}"]`);
  if (target) target.focus();
});

/* ---------- Kontroller ---------- */
function syncControls() {
  const cpu = mode() === 'cpu';
  levelEl.closest('.kk-field').hidden = !cpu;
  firstEl.closest('.kk-field').hidden = !cpu;
  statsEl.hidden = !cpu;
}

modeEl.addEventListener('change', () => { syncControls(); newGame(); });
sizeEl.addEventListener('change', () => newGame());
firstEl.addEventListener('change', () => newGame());
levelEl.addEventListener('change', () => render());
newBtn.addEventListener('click', () => newGame());
undoBtn.addEventListener('click', () => undo());
$('kk-over-new').addEventListener('click', () => newGame());
$('kk-over-close').addEventListener('click', () => { overDismissed = true; render(); });

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
syncControls();
renderStats();
newGame();

// Test ve hata ayıklama kancası: gizli bilgi taşımaz, yalnızca konumu kurar/okur.
window.__kutuKapmacaDebug = {
  /** n x n oyun kurar; `drawn` çizili kenarlar. Tamamlanmış kutular 1. oyuncuya yazılır. */
  setPosition(size, drawn, turn = 1) {
    sizeEl.value = String(size);
    n = size;
    buildBoard();
    const s = createState(size, turn);
    const adj = adjacency(size);
    drawn.forEach((e) => { s.edges[e] = 1; });
    for (let b = 0; b < size * size; b++) {
      if (adj.boxEdges[b].every((e) => s.edges[e])) { s.owners[b] = 1; s.scores[0]++; }
    }
    startState(s);
  },
  getState() { return JSON.parse(JSON.stringify(state)); },
  info(e) { return edgeInfo(n, e); },
  other,
};
