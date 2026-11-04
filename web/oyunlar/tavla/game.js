// Tavla oyunu arayüzü: SVG tahta, zarlar, tıkla-tıkla / sürükle-bırak / klavye ile oynama, bilgisayar sırası (Web Worker),
// sıra içi geri al, otomatik pas, maç skoru ve istatistik. Kurallar engine.js, yapay zekâ ai.js içindedir.
// Ağ isteği yok; yalnızca localStorage'a istatistik yazılır. Ses yok.
import {
  BAR, OFF, initialState, stateFrom, describe, firstMoves, applyMove, expandDice, gameResult, pips, other,
  mulberry32, barOf, offOf,
} from './engine.js';

const $ = (id) => document.getElementById(id);
const boxEl = $('tv-box');
const svgEl = $('tv-board');
const statusEl = $('tv-status');
const msgEl = $('tv-msg');
const diceEl = $('tv-dice');
const rollBtn = $('tv-roll');
const undoBtn = $('tv-undo');
const newBtn = $('tv-new');
const fsBtn = $('tv-full');
const modeEl = $('tv-mode');
const levelEl = $('tv-level');
const colorEl = $('tv-color');
const matchEl = $('tv-match');
const hintsEl = $('tv-hints');
const resultEl = $('tv-result');
const nextBtn = $('tv-next');
const statsEl = $('tv-stats');

const STATS_KEY = 'ba-oyun-tavla';
const NS = 'http://www.w3.org/2000/svg';

/* ---------- Tahta ölçüleri (SVG kullanıcı birimi) ---------- */
const PW = 40; // hane genişliği
const BW = 40; // orta çubuk genişliği
const TW = 52; // toplama alanı genişliği
const LM = 10; // sol boşluk
const LBL = 18; // numara şeridi yüksekliği
const PH = 170; // hane yüksekliği
const MID = 64; // orta boşluk
const R = 18; // taş yarıçapı
const BOT = LBL + PH + MID; // alt hanelerin üst kenarı
const TRAY_X = LM + 12 * PW + BW + 8;
const W = TRAY_X + TW + LM;
const H = LBL + PH + MID + PH + LBL;
const BAR_X = LM + 6 * PW;
const CY = LBL + PH + MID / 2;

/* ---------- Rastgelelik ---------- */
const params = new URLSearchParams(location.search);
const seedParam = parseInt(params.get('seed') || '', 10);
function randomSeed() {
  try { return crypto.getRandomValues(new Uint32Array(1))[0]; } catch { return (Date.now() ^ (Math.random() * 4294967296)) >>> 0; }
}
let rng = mulberry32(Number.isFinite(seedParam) ? seedParam : randomSeed());
const forced = []; // test kancasıyla sabitlenen zarlar
function rollDie() {
  if (forced.length) { const v = forced.shift() | 0; if (v >= 1 && v <= 6) return v; }
  return 1 + Math.floor(rng() * 6);
}

/* ---------- Durum ---------- */
let G = { st: initialState(), turn: 'w', phase: 'roll', dice: [], rem: [], moves: [] };
let undoStack = [];
let turnMoves = [];
let selected = null; // seçili kaynak: 0..23 ya da BAR
let thinking = false;
let passing = false;
let gen = 0; // oyun/sıra numarası: eski zamanlayıcıları ve yanıtları geçersiz kılar
let endTimer = null;
let flip = false;
let builtFlip = null;
let noteText = '';
let lastMoves = [];
let rolling = false;
let score = { w: 0, b: 0 };
let outcome = null; // { winner, mars, points, matchOver }
let focusId = '6';
let navPos = { row: 1, col: 7 };
let statsRecorded = false;
let drag = null;
let suppressClickUntil = 0;
let worker = null;
let workerBroken = false;
let reqId = 0;
let cancelPending = null;

const ptEls = {}; // n (1..24) → g
const nav = [[], []];
let barEl = null;
const trayEls = {};

const mode = () => modeEl.value;
const human = () => colorEl.value;
const target = () => Number(matchEl.value) || 1;
const humanTurn = () => mode() === 'two' || G.turn === human();
const sideName = (s) => (s === 'w' ? 'Beyaz' : 'Siyah');
const label = (n) => (flip ? 25 - n : n);
const canAct = () => G.phase === 'move' && !thinking && !passing && humanTurn();

function after(ms, fn) {
  const g = gen;
  return setTimeout(() => { if (g === gen) fn(); }, ms);
}

/* ---------- İstatistik (yalnızca bu cihazda) ---------- */
const num = (v) => (Number.isFinite(v) && v >= 0 ? Math.min(Math.floor(v), 1e9) : 0);
function readStats() {
  try {
    const s = JSON.parse(localStorage.getItem(STATS_KEY) || '{}');
    if (!s || typeof s !== 'object' || Array.isArray(s)) throw new Error('bozuk');
    return { w: num(s.w), l: num(s.l), mw: num(s.mw), ml: num(s.ml) };
  } catch { return { w: 0, l: 0, mw: 0, ml: 0 }; }
}
function writeStats(s) { try { localStorage.setItem(STATS_KEY, JSON.stringify(s)); } catch { /* depolama kapalı olabilir */ } }
function renderStats() {
  const s = readStats();
  statsEl.textContent = `Bilgisayara karşı: ${s.w} galibiyet · ${s.l} yenilgi · ${s.mw} mars attınız · ${s.ml} mars yediniz`;
}

/* ---------- SVG yardımcıları ---------- */
function el(name, attrs, parent) {
  const e = document.createElementNS(NS, name);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}
const slotX = (slot) => LM + (slot < 6 ? slot * PW : 6 * PW + BW + (slot - 6) * PW);
function posOf(n) {
  let row = n >= 13 ? 0 : 1;
  let slot = n >= 13 ? n - 13 : 12 - n;
  if (flip) { row = 1 - row; slot = 11 - slot; }
  return { row, slot };
}
const rowOfSide = (s) => (s === 'w' ? (flip ? 0 : 1) : (flip ? 1 : 0));

function buildBoard() {
  builtFlip = flip;
  svgEl.textContent = '';
  svgEl.setAttribute('viewBox', `0 0 ${W} ${H}`);
  nav[0] = []; nav[1] = [];
  el('rect', { x: 0, y: 0, width: W, height: H, rx: 12, class: 'tv-frame' }, svgEl);
  el('rect', { x: LM, y: LBL, width: 6 * PW, height: 2 * PH + MID, class: 'tv-field' }, svgEl);
  el('rect', { x: BAR_X + BW, y: LBL, width: 6 * PW, height: 2 * PH + MID, class: 'tv-field' }, svgEl);
  el('rect', { x: BAR_X, y: LBL, width: BW, height: 2 * PH + MID, class: 'tv-bar' }, svgEl);
  for (let n = 1; n <= 24; n++) {
    const { row, slot } = posOf(n);
    const x = slotX(slot);
    const y = row === 0 ? LBL : BOT;
    const g = el('g', { class: 'pt', 'data-pt': String(n), role: 'button', tabindex: '-1' }, svgEl);
    const pts = row === 0
      ? `${x},${y} ${x + PW},${y} ${x + PW / 2},${y + PH}`
      : `${x},${y + PH} ${x + PW},${y + PH} ${x + PW / 2},${y}`;
    el('polygon', { points: pts, class: (slot + row) % 2 ? 'tri tri-b' : 'tri tri-a' }, g);
    el('polygon', { points: pts, class: 'hl' }, g);
    g.appendChild(el('g', { class: 'stack' }));
    const t = el('text', { x: x + PW / 2, y: row === 0 ? 13 : H - 5, class: 'tv-num', 'text-anchor': 'middle', 'aria-hidden': 'true' }, g);
    t.textContent = String(label(n));
    el('rect', { x, y, width: PW, height: PH, class: 'hit' }, g);
    const col = slot < 6 ? slot : slot + 1;
    g.dataset.row = String(row); g.dataset.col = String(col);
    nav[row][col] = g;
    ptEls[n] = g;
  }
  barEl = el('g', { class: 'pt bar', 'data-pt': 'bar', role: 'button', tabindex: '-1' }, svgEl);
  barEl.appendChild(el('g', { class: 'stack' }));
  el('rect', { x: BAR_X, y: LBL, width: BW, height: 2 * PH + MID, class: 'hit' }, barEl);
  nav[0][6] = barEl; nav[1][6] = barEl;
  for (const s of ['w', 'b']) {
    const row = rowOfSide(s);
    const g = el('g', { class: 'pt tray', 'data-pt': `off-${s}`, role: 'button', tabindex: '-1' }, svgEl);
    const y = row === 0 ? LBL : BOT;
    el('rect', { x: TRAY_X, y, width: TW, height: PH, rx: 6, class: 'tray-bg' }, g);
    el('rect', { x: TRAY_X, y, width: TW, height: PH, rx: 6, class: 'hl' }, g);
    g.appendChild(el('g', { class: 'stack' }));
    el('rect', { x: TRAY_X, y, width: TW, height: PH, class: 'hit' }, g);
    g.dataset.row = String(row); g.dataset.col = '13';
    nav[row][13] = g;
    trayEls[s] = g;
  }
}

/** Bir hanedeki taş yığınını çizer (5'ten fazla taşta üst üste biner, sayı yazılır). */
function drawStack(g, side, count, row, cx, extraDot) {
  const stack = g.querySelector('.stack');
  stack.textContent = '';
  const dir = row === 0 ? 1 : -1;
  const base = row === 0 ? LBL + R + 1 : BOT + PH - R - 1;
  const step = count > 1 ? Math.min(2 * R, (PH - 2 * R - 6) / (count - 1)) : 0;
  for (let i = 0; i < count; i++) {
    const cy = base + dir * i * step;
    el('circle', { cx, cy, r: R, class: `ck ck-${side}` }, stack);
    el('circle', { cx, cy, r: R * 0.62, class: `ck-in ck-in-${side}` }, stack);
  }
  if (count >= 6) {
    const t = el('text', { x: cx, y: base + dir * (count - 1) * step + 5, class: `ck-n ck-n-${side}`, 'text-anchor': 'middle' }, stack);
    t.textContent = String(count);
  }
  if (extraDot !== undefined) {
    el('circle', { cx, cy: base + dir * extraDot * step, r: 7, class: 'dest-dot' }, stack);
  }
}

function drawBar(side, count) {
  const stack = barEl.querySelector('.stack');
  const up = rowOfSide(side) === 0;
  const step = count > 1 ? Math.min(2 * R, 120 / (count - 1)) : 0;
  const cx = BAR_X + BW / 2;
  for (let i = 0; i < count; i++) {
    const cy = up ? CY - R - 4 - i * step : CY + R + 4 + i * step;
    el('circle', { cx, cy, r: R, class: `ck ck-${side}` }, stack);
    el('circle', { cx, cy, r: R * 0.62, class: `ck-in ck-in-${side}` }, stack);
  }
}

function drawTray(side, count) {
  const stack = trayEls[side].querySelector('.stack');
  stack.textContent = '';
  const row = rowOfSide(side);
  for (let i = 0; i < count; i++) {
    const y = row === 0 ? LBL + 4 + i * 10 : BOT + PH - 4 - (i + 1) * 10;
    el('rect', { x: TRAY_X + 6, y, width: TW - 12, height: 9, rx: 2, class: `ck ck-${side}` }, stack);
  }
}

/* ---------- Zarlar ---------- */
const PIPS = {
  1: [[18, 18]], 2: [[10, 10], [26, 26]], 3: [[10, 10], [18, 18], [26, 26]],
  4: [[10, 10], [26, 10], [10, 26], [26, 26]], 5: [[10, 10], [26, 10], [18, 18], [10, 26], [26, 26]],
  6: [[10, 10], [26, 10], [10, 18], [26, 18], [10, 26], [26, 26]],
};
function dieSvg(v) {
  const dots = PIPS[v].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2"/>`).join('');
  return `<svg viewBox="0 0 36 36" aria-hidden="true" focusable="false"><rect x="1.5" y="1.5" width="33" height="33" rx="7"/>${dots}</svg>`;
}
function renderDice() {
  const left = G.rem.slice();
  const html = G.dice.length
    ? expandDice(G.dice).map((v) => {
      const i = left.indexOf(v);
      const used = i < 0;
      if (!used) left.splice(i, 1);
      return `<span class="tv-die${used ? ' is-used' : ''}" data-v="${v}">${dieSvg(v)}</span>`;
    }).join('')
    : '<span class="tv-die-empty">Zar henüz atılmadı</span>';
  if (diceEl.dataset.html !== html) { diceEl.innerHTML = html; diceEl.dataset.html = html; }
  diceEl.classList.toggle('is-rolling', rolling);
  diceEl.setAttribute('aria-label', G.dice.length ? `Zarlar: ${G.dice.join(' ve ')}. Kalan: ${G.rem.length ? G.rem.join(', ') : 'yok'}` : 'Zarlar atılmadı');
}

/* ---------- Çizim ---------- */
function moveText(m) {
  const f = m.from === BAR ? 'kırık' : String(label(m.from + 1));
  const t = m.to === OFF ? 'toplama' : String(label(m.to + 1));
  return `${f}→${t}${m.hit ? '*' : ''}`;
}

function render() {
  const st = G.st;
  const mover = G.turn;
  const act = canAct();
  const dests = new Map(); // idx | 'off' → vuruş mu
  const sources = new Set();
  if (act) {
    for (const m of G.moves) {
      sources.add(m.from);
      if (selected !== null && m.from === selected) dests.set(m.to === OFF ? 'off' : m.to, !!m.hit);
    }
  }
  const lastSet = new Set();
  for (const m of lastMoves) { if (m.from !== BAR) lastSet.add(m.from); if (m.to !== OFF) lastSet.add(m.to); }

  for (let n = 1; n <= 24; n++) {
    const idx = n - 1;
    const g = ptEls[n];
    const c = st[idx];
    const side = c > 0 ? 'w' : c < 0 ? 'b' : '';
    const count = Math.abs(c);
    const { row, slot } = posOf(n);
    const cx = slotX(slot) + PW / 2;
    const isDest = dests.has(idx);
    let dot;
    if (isDest) dot = side === mover ? count : 0;
    drawStack(g, side || 'w', count, row, cx, dot);
    g.dataset.count = String(count);
    g.dataset.side = side;
    g.classList.toggle('is-sel', selected === idx);
    g.classList.toggle('is-dest', isDest && !dests.get(idx));
    g.classList.toggle('is-hit', isDest && dests.get(idx));
    g.classList.toggle('is-src', sources.has(idx) && selected === null);
    g.classList.toggle('is-last', lastSet.has(idx));
    let lb = `Hane ${label(n)}, ${count ? `${count} ${side === 'w' ? 'beyaz' : 'siyah'} taş` : 'boş'}`;
    if (selected === idx) lb += ', seçili';
    else if (isDest) lb += dests.get(idx) ? ', rakip taşı kırılır' : ', gidilebilir';
    else if (sources.has(idx)) lb += ', oynanabilir';
    g.setAttribute('aria-label', lb);
    g.setAttribute('tabindex', focusId === String(n) ? '0' : '-1');
  }
  // Orta çubuk
  const bs = barEl.querySelector('.stack');
  bs.textContent = '';
  drawBar('w', st[24]);
  drawBar('b', st[25]);
  barEl.dataset.w = String(st[24]);
  barEl.dataset.b = String(st[25]);
  barEl.classList.toggle('is-sel', selected === BAR);
  barEl.classList.toggle('is-src', sources.has(BAR) && selected === null);
  barEl.setAttribute('aria-label', `Orta çubuk: ${st[24]} beyaz, ${st[25]} siyah kırık taş${sources.has(BAR) ? ', oynanabilir' : ''}`);
  barEl.setAttribute('tabindex', focusId === 'bar' ? '0' : '-1');
  // Toplama alanları
  for (const s of ['w', 'b']) {
    const g = trayEls[s];
    const cnt = s === 'w' ? st[26] : st[27];
    drawTray(s, cnt);
    g.dataset.count = String(cnt);
    g.classList.toggle('is-dest', s === mover && dests.has('off'));
    g.setAttribute('aria-label', `${sideName(s)} toplama alanı: ${cnt} taş${s === mover && dests.has('off') ? ', toplanabilir' : ''}`);
    g.setAttribute('tabindex', focusId === `off-${s}` ? '0' : '-1');
  }

  // Zarlar, düğmeler
  renderDice();
  rollBtn.disabled = !(G.phase === 'roll' && humanTurn() && !thinking);
  undoBtn.disabled = !(canAct() && undoStack.length);
  svgEl.classList.toggle('tv-hints', hintsEl.checked);
  svgEl.dataset.turn = G.turn;
  svgEl.dataset.phase = G.phase;

  // Skor ve pip sayıları
  $('tv-score-w').textContent = String(score.w);
  $('tv-score-b').textContent = String(score.b);
  $('tv-pips-w').textContent = String(pips(st, 'w'));
  $('tv-pips-b').textContent = String(pips(st, 'b'));
  $('tv-match-info').textContent = target() === 1 ? 'Tek oyun' : `${target()} puanlık maç`;

  // Durum satırı
  statusEl.className = 'tv-status';
  const cpu = mode() === 'cpu';
  const who = cpu ? (humanTurn() ? 'Sıra sizde' : 'Bilgisayarın sırası') : `Sıra: ${sideName(G.turn)}`;
  let msg;
  if (G.phase === 'over' && outcome) {
    msg = $('tv-result-title').textContent;
    statusEl.classList.add('is-over');
  } else if (passing) {
    msg = `${sideName(G.turn)} için geçerli hamle yok: sıra rakibe geçiyor.`;
    statusEl.classList.add('is-warn');
  } else if (G.phase === 'roll') {
    msg = cpu && !humanTurn() ? 'Bilgisayar zar atıyor…' : `${who} (${sideName(G.turn)}): zarları atın (Z tuşu).`;
  } else if (thinking) {
    msg = 'Bilgisayar düşünüyor…';
  } else if (!humanTurn()) {
    msg = 'Bilgisayar oynuyor…';
  } else if (!G.rem.length || !G.moves.length) {
    msg = 'Tüm zarlar oynandı; sıra geçiyor. (Geri al için U tuşu.)';
  } else {
    msg = `${who} (${sideName(G.turn)}): kalan zar ${G.rem.join(', ')}. `;
    if (barOf(st, G.turn) > 0) { msg += 'Kırık taşınızı içeri sokun.'; statusEl.classList.add('is-warn'); } else msg += selected === null ? 'Bir taş seçin.' : 'Işıklı hedefe dokunun.';
  }
  if (statusEl.textContent !== msg) statusEl.textContent = msg;
  msgEl.textContent = noteText;
}

/* ---------- Oyun akışı ---------- */
function clearTimers() {
  if (endTimer) { clearTimeout(endTimer); endTimer = null; }
}

function newGame() {
  gen++;
  if (cancelPending) cancelPending();
  clearTimers();
  thinking = false; passing = false; rolling = false;
  flip = mode() === 'cpu' && human() === 'b';
  if (builtFlip !== flip) buildBoard();
  G = { st: initialState(), turn: 'w', phase: 'roll', dice: [], rem: [], moves: [] };
  undoStack = []; turnMoves = []; selected = null; lastMoves = []; outcome = null; statsRecorded = false;
  noteText = '';
  resultEl.hidden = true;
  openingRoll();
}

/** Açılış: her oyuncu bir zar atar, büyük gelen başlar ve iki zarla ilk hamlesini oynar (eşitlikte yeniden). */
function openingRoll() {
  let wd; let bd;
  let tries = 0;
  do { wd = rollDie(); bd = rollDie(); tries++; } while (wd === bd && tries < 50);
  if (wd === bd) bd = wd === 6 ? 5 : wd + 1;
  G.turn = wd > bd ? 'w' : 'b';
  G.dice = [Math.max(wd, bd), Math.min(wd, bd)];
  G.rem = G.dice.slice();
  G.phase = 'move';
  turnMoves = [];
  noteText = `Açılış zarı: Beyaz ${wd}, Siyah ${bd}. ${sideName(G.turn)} başlıyor ve bu iki zarla oynuyor.`;
  beginMove();
}

function doRoll() {
  if (G.phase !== 'roll') return;
  G.dice = [rollDie(), rollDie()];
  G.rem = expandDice(G.dice);
  G.phase = 'move';
  turnMoves = []; undoStack = []; selected = null;
  rolling = true;
  const g = gen;
  setTimeout(() => { if (g === gen) { rolling = false; renderDice(); } }, 350);
  beginMove();
}

function beginMove() {
  G.moves = firstMoves(G.st, G.turn, G.rem);
  if (!G.moves.length) { passTurn(); return; }
  render();
  if (!humanTurn()) cpuPlay();
}

function passTurn() {
  passing = true;
  noteText = `${sideName(G.turn)} ${G.dice.join('-')} attı ama oynayabileceği hamle yok (pas).`;
  render();
  endTimer = after(1300, endTurn);
}

function endTurn() {
  endTimer = null;
  passing = false;
  if (turnMoves.length) {
    lastMoves = turnMoves.slice();
    noteText = `Son hamle (${sideName(G.turn)} ${G.dice.join('-')}): ${turnMoves.map(moveText).join(', ')}`;
  } else lastMoves = [];
  undoStack = []; turnMoves = []; selected = null;
  G.turn = other(G.turn);
  G.phase = 'roll';
  G.rem = []; G.moves = [];
  render();
  if (!humanTurn()) after(650, doRoll);
}

function step(m) {
  G.st = applyMove(G.st, G.turn, m);
  const i = G.rem.indexOf(m.die);
  if (i >= 0) G.rem.splice(i, 1);
  turnMoves.push(m);
  selected = null;
  const res = gameResult(G.st);
  if (res.over) { lastMoves = turnMoves.slice(); endGame(res); return; }
  G.moves = G.rem.length ? firstMoves(G.st, G.turn, G.rem) : [];
  if (!G.moves.length) endTimer = after(G.rem.length ? 1100 : 700, endTurn);
  render();
}

function play(m) {
  undoStack.push({ st: G.st, rem: G.rem.slice(), n: turnMoves.length });
  step(m);
}

function undo() {
  if (!canAct() || !undoStack.length) return;
  clearTimers();
  const s = undoStack.pop();
  G.st = s.st; G.rem = s.rem; turnMoves.length = s.n; selected = null;
  G.moves = firstMoves(G.st, G.turn, G.rem);
  render();
}

function endGame(res) {
  clearTimers();
  G.phase = 'over';
  score[res.winner] += res.points;
  const matchOver = score[res.winner] >= target();
  outcome = { winner: res.winner, mars: res.mars, points: res.points, matchOver };
  if (mode() === 'cpu' && !statsRecorded) {
    statsRecorded = true;
    const s = readStats();
    if (res.winner === human()) { s.w++; if (res.mars) s.mw++; } else { s.l++; if (res.mars) s.ml++; }
    writeStats(s);
    renderStats();
  }
  const cpu = mode() === 'cpu';
  const title = cpu ? (res.winner === human() ? 'Kazandınız!' : 'Bilgisayar kazandı') : `${sideName(res.winner)} kazandı!`;
  let text = res.mars ? `Mars! Rakip hiç taş toplayamadı: ${res.points} puan.` : `Rakip en az bir taş topladı: ${res.points} puan.`;
  text += ` Skor: Beyaz ${score.w} – Siyah ${score.b}.`;
  if (matchOver) text += ` Maçı ${cpu ? (res.winner === human() ? 'siz' : 'bilgisayar') : sideName(res.winner)} kazandı.`;
  $('tv-result-title').textContent = title;
  $('tv-result-text').textContent = text;
  nextBtn.textContent = matchOver ? (target() === 1 ? 'Yeni oyun' : 'Yeni maç') : 'Sonraki oyun';
  resultEl.hidden = false;
  render();
  nextBtn.focus({ preventScroll: true });
}

nextBtn.addEventListener('click', () => {
  if (outcome && outcome.matchOver) score = { w: 0, b: 0 };
  newGame();
});

/* ---------- Bilgisayar sırası ---------- */
/** Aramayı Web Worker'a gönderir; worker yoksa ya da bozulursa ana iş parçacığında çalıştırır. */
function requestMove(payload) {
  return new Promise((resolve, reject) => {
    const fallback = () => {
      import('./ai.js').then((ai) => {
        const t = setTimeout(() => {
          try { resolve(ai.chooseSequence(payload.st, payload.side, payload.dice, payload.level, payload.seed)); } catch (e) { reject(e); }
        }, 30);
        cancelPending = () => clearTimeout(t);
      }).catch(reject);
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
      if (e.data.ok) resolve(e.data.result); else reject(new Error(e.data.error));
    };
    const onErr = () => { done(); drop(); workerBroken = true; fallback(); };
    w.addEventListener('message', onMsg);
    w.addEventListener('error', onErr);
    cancelPending = () => { done(); drop(); };
    w.postMessage({ id, ...payload });
  });
}

function cpuPlay() {
  thinking = true;
  render();
  const g = gen;
  const t0 = performance.now();
  const seed = Math.floor(rng() * 4294967296) >>> 0; // her istekte tam bir değer tüketilir (tekrarlanabilirlik)
  requestMove({ st: G.st, side: G.turn, dice: G.dice.slice(), level: levelEl.value, seed }).then(async (res) => {
    if (g !== gen) return;
    const wait = 400 - (performance.now() - t0);
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    if (g !== gen) return;
    thinking = false;
    playSeq(res && res.seq ? res.seq : [], 0);
  }).catch(() => {
    if (g !== gen) return;
    thinking = false;
    playSeq([], 0); // yedek: ilk geçerli hamleyi oyna
  });
}

/** Bilgisayarın dizisini hamle hamle oynatır; geçersiz bir hamle gelirse ilk geçerli hamleye düşer. */
function playSeq(seq, i) {
  if (G.phase !== 'move') return;
  if (!G.moves.length) return;
  let m = seq[i];
  if (!m || !G.moves.some((x) => x.from === m.from && x.to === m.to && x.die === m.die)) m = G.moves[0];
  render();
  after(i === 0 ? 150 : 480, () => {
    if (G.phase !== 'move') return;
    step(m);
    if (G.phase === 'move' && G.moves.length) playSeq(seq, i + 1);
  });
}

/* ---------- Seçim ve oynama ---------- */
function destKey(id) {
  if (id === 'bar') return null;
  if (id.startsWith('off-')) return id === `off-${G.turn}` ? 'off' : null;
  return Number(id) - 1;
}

function activate(id) {
  if (performance.now() < suppressClickUntil) return;
  if (!canAct()) { render(); return; }
  if (selected !== null) {
    const dk = destKey(id);
    if (dk !== null) {
      const cands = G.moves.filter((m) => m.from === selected && (dk === 'off' ? m.to === OFF : m.to === dk));
      if (cands.length) { cands.sort((a, b) => a.die - b.die); play(cands[0]); return; }
    }
  }
  const src = id === 'bar' ? BAR : /^\d+$/.test(id) ? Number(id) - 1 : null;
  if (src !== null && G.moves.some((m) => m.from === src)) {
    selected = selected === src ? null : src;
    render();
    return;
  }
  selected = null;
  render();
  if (barOf(G.st, G.turn) > 0) msgEl.textContent = 'Kırık taşınız var: önce orta çubuktaki taşı içeri sokmalısınız.';
  else if (src !== null) msgEl.textContent = 'Bu hanedeki taşlar şu an oynayamaz. Çerçeveli taşlardan birini seçin.';
}

svgEl.addEventListener('click', (e) => {
  const g = e.target.closest('[data-pt]');
  if (g) { focusId = g.dataset.pt; activate(g.dataset.pt); }
});

/* Sürükle-bırak (fare + dokunmatik, pointer events) */
svgEl.addEventListener('pointerdown', (e) => {
  if (e.pointerType === 'mouse' && e.button !== 0) return;
  const g = e.target.closest('[data-pt]');
  if (!g || !canAct()) return;
  const id = g.dataset.pt;
  const src = id === 'bar' ? BAR : /^\d+$/.test(id) ? Number(id) - 1 : null;
  if (src === null || !G.moves.some((m) => m.from === src)) return;
  drag = { src, id: e.pointerId, x0: e.clientX, y0: e.clientY, active: false, ghost: null, size: 30 };
});

function startDrag() {
  drag.active = true;
  selected = drag.src;
  const scale = svgEl.getBoundingClientRect().width / W;
  drag.size = 2 * R * scale;
  const gh = document.createElement('div');
  gh.className = `tv-ghost is-${G.turn}`;
  gh.style.width = `${drag.size}px`;
  gh.style.height = `${drag.size}px`;
  (document.fullscreenElement || document.body).appendChild(gh);
  gh.style.transform = 'translate(0px, 0px)';
  const o = gh.getBoundingClientRect();
  drag.ox = o.left; drag.oy = o.top;
  drag.ghost = gh;
  render();
}

window.addEventListener('pointermove', (e) => {
  if (!drag || e.pointerId !== drag.id) return;
  if (!drag.active) {
    if (Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) < 6) return;
    startDrag();
  }
  drag.ghost.style.transform = `translate(${e.clientX - drag.size / 2 - drag.ox}px, ${e.clientY - drag.size / 2 - drag.oy}px)`;
});

function endDrag(e, drop) {
  const d = drag;
  drag = null;
  if (!d || !d.active) return;
  if (d.ghost) d.ghost.remove();
  suppressClickUntil = performance.now() + 150;
  if (drop && e) {
    const under = document.elementFromPoint(e.clientX, e.clientY);
    const g = under && under.closest ? under.closest('[data-pt]') : null;
    if (g && svgEl.contains(g)) {
      const dk = destKey(g.dataset.pt);
      if (dk !== null) {
        const cands = G.moves.filter((m) => m.from === d.src && (dk === 'off' ? m.to === OFF : m.to === dk));
        if (cands.length) { cands.sort((a, b) => a.die - b.die); play(cands[0]); return; }
      }
    }
  }
  render();
}
window.addEventListener('pointerup', (e) => { if (drag && e.pointerId === drag.id) endDrag(e, true); });
window.addEventListener('pointercancel', (e) => { if (drag && e.pointerId === drag.id) endDrag(e, false); });

/* ---------- Klavye ---------- */
svgEl.addEventListener('focusin', (e) => {
  const g = e.target.closest ? e.target.closest('[data-pt]') : null;
  if (!g) return;
  focusId = g.dataset.pt;
  if (g !== barEl) navPos = { row: Number(g.dataset.row), col: Number(g.dataset.col) };
  else navPos.col = 6;
});

svgEl.addEventListener('keydown', (e) => {
  const g = e.target.closest ? e.target.closest('[data-pt]') : null;
  if (!g) return;
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    activate(g.dataset.pt);
    return;
  }
  let { row, col } = navPos;
  if (e.key === 'ArrowLeft') col = Math.max(0, col - 1);
  else if (e.key === 'ArrowRight') col = Math.min(13, col + 1);
  else if (e.key === 'ArrowUp') row = 0;
  else if (e.key === 'ArrowDown') row = 1;
  else if (e.key === 'Escape') { if (drag && drag.active) endDrag(null, false); selected = null; render(); return; } else return;
  e.preventDefault();
  navPos = { row, col };
  const t = nav[row][col];
  if (t) {
    focusId = t.dataset.pt;
    render();
    t.focus();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const tag = e.target && e.target.tagName;
  if (tag === 'SELECT' || tag === 'INPUT' || tag === 'TEXTAREA') return;
  const k = e.key.toLowerCase();
  if (k === 'z') { if (!rollBtn.disabled) { e.preventDefault(); doRoll(); } } else if (k === 'u') { e.preventDefault(); undo(); }
});

/* ---------- Kontroller ---------- */
function syncControls() {
  const cpu = mode() === 'cpu';
  levelEl.closest('.tv-field').hidden = !cpu;
  colorEl.closest('.tv-field').hidden = !cpu;
  $('tv-stats-wrap').hidden = !cpu;
}
function restartMatch() { score = { w: 0, b: 0 }; syncControls(); newGame(); }

modeEl.addEventListener('change', restartMatch);
colorEl.addEventListener('change', restartMatch);
matchEl.addEventListener('change', restartMatch);
levelEl.addEventListener('change', () => render());
hintsEl.addEventListener('change', () => render());
newBtn.addEventListener('click', restartMatch);
rollBtn.addEventListener('click', () => doRoll());
undoBtn.addEventListener('click', () => undo());
$('tv-stats-reset').addEventListener('click', () => { writeStats({ w: 0, l: 0, mw: 0, ml: 0 }); renderStats(); });

// Tam ekran: yalnızca oyun kutusu gösterilir (reklam alanları kutunun dışındadır).
if (!document.fullscreenEnabled) {
  fsBtn.hidden = true;
} else {
  fsBtn.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else boxEl.requestFullscreen().catch(() => {});
  });
  document.addEventListener('fullscreenchange', () => {
    fsBtn.textContent = document.fullscreenElement ? 'Tam ekrandan çık' : 'Tam ekran';
  });
}

/* ---------- Başlat ---------- */
syncControls();
renderStats();
newGame();

// Test ve hata ayıklama kancası: gizli bilgi taşımaz. Çağrı: window.__tavlaTest() → api.
const api = {
  state() {
    const d = describe(G.st);
    return {
      ...d, turn: G.turn, phase: G.phase, dice: G.dice.slice(), rem: G.rem.slice(), score: { ...score }, target: target(),
      thinking, passing, outcome,
      moves: G.moves.map((m) => ({ from: m.from, to: m.to, die: m.die, hit: !!m.hit })),
    };
  },
  /** Sonraki atışlarda kullanılacak zarları sıraya koyar (açılışta çift çift: beyaz, siyah). */
  forceDice(list) { forced.push(...list); },
  /** Konum kurar: { points[24], bar:{w,b}, off:{w,b}, turn, dice?: [a,b] }. Zar verilmezse atış beklenir. */
  setPosition(p) {
    gen++;
    if (cancelPending) cancelPending();
    clearTimers();
    thinking = false; passing = false; rolling = false;
    G = { st: stateFrom(p), turn: p.turn === 'b' ? 'b' : 'w', phase: 'roll', dice: [], rem: [], moves: [] };
    undoStack = []; turnMoves = []; selected = null; lastMoves = []; outcome = null; statsRecorded = false; noteText = '';
    resultEl.hidden = true;
    if (Array.isArray(p.dice) && p.dice.length === 2) {
      G.dice = p.dice.slice(); G.rem = expandDice(G.dice); G.phase = 'move';
      beginMove();
    } else {
      render();
      if (!humanTurn()) after(650, doRoll);
    }
  },
};
window.__tavlaTest = () => api;
