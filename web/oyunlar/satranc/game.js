// Satranç oyunu arayüzü: tahta çizimi, tıklama / sürükle-bırak / klavye ile oynama, bilgisayar sırası (Web Worker),
// geri al, hamle listesi, FEN/PGN, skor tablosu. Kurallar chess.js (BSD-2) ile denetlenir; yapay zekâ ai.js içindedir.
// Ağ isteği yok; yalnızca localStorage'a skor yazılır.
import { Chess } from '../../vendor/chess.js@1.4.0/chess.js';

const $ = (id) => document.getElementById(id);
const boxEl = $('sa-box');
const boardEl = $('sa-board');
const statusEl = $('sa-status');
const msgEl = $('sa-msg');
const modeEl = $('sa-mode');
const levelEl = $('sa-level');
const colorEl = $('sa-color');
const autoflipEl = $('sa-autoflip');
const newBtn = $('sa-new');
const undoBtn = $('sa-undo');
const flipBtn = $('sa-flip');
const fsBtn = $('sa-full');
const thinkEl = $('sa-think');
const historyEl = $('sa-history');
const ranksEl = $('sa-ranks');
const filesEl = $('sa-files');
const promoEl = $('sa-promo');
const promoList = $('sa-promo-list');
const ioText = $('sa-io-text');
const ioMsg = $('sa-io-msg');
const ioDetails = $('sa-io');

const STATS_KEY = 'ba-oyun-satranc';
const LEVEL_KEYS = ['kolay', 'orta', 'zor'];
const FILES = 'abcdefgh';
const NAMES = { p: 'piyon', n: 'at', b: 'fil', r: 'kale', q: 'vezir', k: 'şah' };
const SIDE = { w: 'Beyaz', b: 'Siyah' };

/* ---------- Taş çizimleri (kendi SVG'miz; dolgu/çizgi renkleri CSS değişkenlerinden gelir) ---------- */
const SHAPES = {
  p: '<path d="M42 46h16c1 8 7 14 9 22l3 10H30l3-10c2-8 8-14 9-22z"/><path d="M37 41h26v7H37z"/><circle cx="50" cy="30" r="10"/><path d="M26 78h48v10H26z"/>',
  r: '<path d="M34 78l3-34h26l3 34z"/><path d="M30 44V22h9v6h7v-6h8v6h7v-6h9v22z"/><path d="M26 78h48v10H26z"/><path class="d" d="M38 54h24"/>',
  n: '<path d="M30 78c0-10 5-17 11-23l-15-1c-3-3-4-7-2-10l9-9 2-13 8 8c14-3 30 7 31 28 0 7-1 13 0 20z"/><path d="M26 78h48v10H26z"/><circle class="dot" cx="42" cy="36" r="2.8"/><circle class="dot" cx="25.5" cy="46" r="1.6"/><path class="d" d="M52 34c9 4 13 14 11 30"/>',
  b: '<path d="M34 78c1-10 6-16 8-22h16c2 6 7 12 8 22z"/><path d="M50 15c10 8 17 20 12 33-1 4-3 7-6 8H44c-3-1-5-4-6-8-5-13 2-25 12-33z"/><path d="M37 55h26v7H37z"/><circle cx="50" cy="12" r="4.5"/><path d="M26 78h48v10H26z"/><path class="d" d="M50 26v12M44 32h12"/>',
  q: '<path d="M30 78L25 38l9 18 4-24 6 20 6-26 6 26 6-20 4 24 9-18-5 40z"/><circle cx="25" cy="35" r="4.5"/><circle cx="38" cy="29" r="4.5"/><circle cx="50" cy="23" r="4.5"/><circle cx="62" cy="29" r="4.5"/><circle cx="75" cy="35" r="4.5"/><path d="M26 78h48v10H26z"/><path class="d" d="M33 66h34"/>',
  k: '<path d="M30 78c-2-12 2-22 10-26-5-8-1-18 10-18s15 10 10 18c8 4 12 14 10 26z"/><path d="M47 9h6v7h7v6h-7v8h-6v-8h-7v-6h7z"/><path d="M26 78h48v10H26z"/><path class="d" d="M36 64h28"/>',
};
const svgFor = (t) => `<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">${SHAPES[t]}</svg>`;

/* ---------- Durum ---------- */
let chess = new Chess();
let log = []; // { san, color, from, to, num }
let selected = null; // seçili kare adı
let targets = new Map(); // hedef kare → { capture }
let pending = null; // terfi seçimi bekleyen hamle { from, to }
let result = null; // { winner, kind, text } ya da null
let flip = false;
let thinking = false;
let aiToken = 0;
let worker = null;
let workerBroken = false;
let cancelPending = null;
let reqId = 0;
let rovingDom = 52; // klavye odağındaki kare (DOM sırası)
let statsRecorded = false;
let drag = null;
let suppressClickUntil = 0;
let thinkInfo = '';

const cells = []; // DOM sırasına göre 64 düğme
const rankEls = [];
const fileEls = [];

/* ---------- Ayarlar ---------- */
const mode = () => modeEl.value; // 'cpu' | 'two'
const human = () => colorEl.value; // 'w' | 'b'
const canInteract = () => !result && !thinking && !pending && (mode() === 'two' || chess.turn() === human());

/* ---------- Skor tablosu (yalnızca bu cihazda) ---------- */
function readStats() {
  const out = {};
  for (const k of LEVEL_KEYS) out[k] = { w: 0, l: 0, d: 0 };
  try {
    const raw = JSON.parse(localStorage.getItem(STATS_KEY) || 'null');
    if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
      for (const k of LEVEL_KEYS) {
        const s = raw[k];
        if (s && typeof s === 'object') {
          for (const f of ['w', 'l', 'd']) {
            const n = Number(s[f]);
            out[k][f] = Number.isFinite(n) && n > 0 ? Math.min(Math.floor(n), 999999) : 0;
          }
        }
      }
    }
  } catch { /* bozuk ya da erişilemeyen veri: sıfırdan başla */ }
  return out;
}
function writeStats(s) {
  try { localStorage.setItem(STATS_KEY, JSON.stringify(s)); } catch { /* depolama kapalı olabilir */ }
}
function bumpStats(kind) {
  const s = readStats();
  const lv = LEVEL_KEYS.includes(levelEl.value) ? levelEl.value : 'orta';
  s[lv][kind]++;
  writeStats(s);
  renderStats();
}
function renderStats() {
  const s = readStats();
  for (const k of LEVEL_KEYS) {
    const row = document.querySelector(`#sa-stats-wrap tr[data-level="${k}"]`);
    if (!row) continue;
    row.querySelector('.w').textContent = String(s[k].w);
    row.querySelector('.l').textContent = String(s[k].l);
    row.querySelector('.d').textContent = String(s[k].d);
  }
}

/* ---------- Kare ↔ DOM eşlemesi ---------- */
function squareOfDom(d) {
  const r = d >> 3;
  const c = d & 7;
  return flip ? FILES[7 - c] + (r + 1) : FILES[c] + (8 - r);
}
function domOfSquare(sq) {
  const f = FILES.indexOf(sq[0]);
  const rank = Number(sq[1]);
  return flip ? (rank - 1) * 8 + (7 - f) : (8 - rank) * 8 + f;
}

/* ---------- Tahta DOM'u ---------- */
function buildBoard() {
  boardEl.textContent = '';
  for (let dr = 0; dr < 8; dr++) {
    const row = document.createElement('div');
    row.className = 'sa-row';
    row.setAttribute('role', 'row');
    for (let dc = 0; dc < 8; dc++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'sq';
      b.setAttribute('role', 'gridcell');
      b.tabIndex = -1;
      b.dataset.dom = String(dr * 8 + dc);
      b.dataset.piece = '';
      b.innerHTML = '<span class="sa-pc"></span>';
      row.appendChild(b);
      cells.push(b);
    }
    boardEl.appendChild(row);
  }
  for (let k = 0; k < 8; k++) {
    const r = document.createElement('span'); ranksEl.appendChild(r); rankEls.push(r);
    const f = document.createElement('span'); filesEl.appendChild(f); fileEls.push(f);
  }
}

/* ---------- Sonuç ---------- */
function computeResult() {
  if (chess.isCheckmate()) {
    const winner = chess.turn() === 'w' ? 'b' : 'w';
    let text;
    if (mode() === 'cpu') text = winner === human() ? 'Şah mat! Tebrikler, kazandınız.' : 'Şah mat! Bilgisayar kazandı.';
    else text = `Şah mat! ${SIDE[winner]} kazandı.`;
    return { winner, kind: 'mat', text };
  }
  if (chess.isStalemate()) return { winner: null, kind: 'pat', text: 'Pat: sıradaki tarafın şahı tehdit altında değil ama yasal hamlesi de yok. Oyun berabere bitti.' };
  if (chess.isInsufficientMaterial()) return { winner: null, kind: 'yetersiz', text: 'Berabere: yetersiz malzeme, iki taraf da mat yapamaz.' };
  if (chess.isThreefoldRepetition()) return { winner: null, kind: 'tekrar', text: 'Berabere: aynı konum üçüncü kez tekrarlandı.' };
  if (chess.isDrawByFiftyMoves()) return { winner: null, kind: 'elli', text: 'Berabere: elli hamle kuralı (taş alınmadı, piyon oynanmadı).' };
  return null;
}

function checkEnd() {
  result = computeResult();
  if (result && mode() === 'cpu' && !statsRecorded) {
    statsRecorded = true;
    bumpStats(result.winner === null ? 'd' : result.winner === human() ? 'w' : 'l');
  }
}

/* ---------- Çizim ---------- */
function kingSquare(color) {
  const grid = chess.board();
  for (let r = 0; r < 8; r++) for (let f = 0; f < 8; f++) {
    const p = grid[r][f];
    if (p && p.type === 'k' && p.color === color) return FILES[f] + (8 - r);
  }
  return null;
}

function render() {
  const grid = chess.board();
  const last = log.length ? log[log.length - 1] : null;
  const inCheck = chess.isCheck();
  const checkSq = inCheck ? kingSquare(chess.turn()) : null;
  const interact = canInteract();

  for (let k = 0; k < 8; k++) {
    rankEls[k].textContent = String(flip ? k + 1 : 8 - k);
    fileEls[k].textContent = FILES[flip ? 7 - k : k];
  }
  cells.forEach((el, d) => {
    const sq = squareOfDom(d);
    const f = FILES.indexOf(sq[0]);
    const p = grid[8 - Number(sq[1])][f];
    const key = p ? p.color + p.type.toUpperCase() : '';
    el.dataset.sq = sq;
    if (el.dataset.piece !== key) {
      el.dataset.piece = key;
      const pc = el.firstChild;
      pc.className = 'sa-pc' + (p ? ` is-${p.color}` : '');
      pc.innerHTML = p ? svgFor(p.type) : '';
    }
    const isSel = selected === sq;
    const dest = targets.get(sq);
    el.classList.toggle('is-selected', isSel);
    el.classList.toggle('is-dest', !!dest && !dest.capture);
    el.classList.toggle('is-dest-cap', !!dest && dest.capture);
    el.classList.toggle('is-last', !!last && (sq === last.from || sq === last.to));
    el.classList.toggle('is-check', sq === checkSq);
    el.classList.toggle('is-dragsrc', !!drag && drag.active && drag.sq === sq);
    el.tabIndex = d === rovingDom ? 0 : -1;
    let label = `${sq}, ${p ? `${SIDE[p.color].toLowerCase()} ${NAMES[p.type]}` : 'boş'}`;
    if (isSel) label += ', seçili';
    if (dest) label += dest.capture ? ', alma hamlesi' : ', gidilebilir';
    if (sq === checkSq) label += ', şah tehdidi altında';
    el.setAttribute('aria-label', label);
  });

  // Durum satırı
  statusEl.className = 'sa-status';
  let msg;
  if (result) {
    msg = result.text;
    statusEl.classList.add('is-over');
  } else if (thinking) {
    msg = 'Bilgisayar düşünüyor…';
  } else {
    msg = mode() === 'cpu' ? `Sıra sizde (${SIDE[chess.turn()]}).` : `Sıra: ${SIDE[chess.turn()]}.`;
    if (inCheck) { msg += ' Şah!'; statusEl.classList.add('is-check'); }
  }
  if (statusEl.textContent !== msg) statusEl.textContent = msg;

  const canUndo = mode() === 'two' ? log.length > 0 : log.some((e) => e.color === human());
  undoBtn.disabled = !canUndo;
  thinkEl.textContent = mode() === 'cpu' ? thinkInfo : '';
  flipBtn.setAttribute('aria-pressed', flip ? 'true' : 'false');

  boardEl.setAttribute('aria-busy', thinking ? 'true' : 'false');
  boardEl.dataset.turn = chess.turn();
  boardEl.dataset.over = result ? '1' : '0';
  boardEl.dataset.result = result ? result.kind : '';
  boardEl.dataset.thinking = thinking ? '1' : '0';
  boardEl.dataset.flip = flip ? '1' : '0';
  boardEl.dataset.interactive = interact ? '1' : '0';
  renderHistory();
}

function renderHistory() {
  const sig = `${log.length}:${log.length ? log[log.length - 1].san : ''}`;
  if (historyEl.dataset.sig === sig) return;
  historyEl.dataset.sig = sig;
  historyEl.dataset.count = String(log.length);
  historyEl.textContent = '';
  const rows = [];
  for (const e of log) {
    if (e.color === 'w') rows.push({ n: e.num, w: e.san, b: '' });
    else {
      const lastRow = rows[rows.length - 1];
      if (lastRow && lastRow.n === e.num && !lastRow.b) lastRow.b = e.san;
      else rows.push({ n: e.num, w: '…', b: e.san });
    }
  }
  for (const r of rows) {
    const li = document.createElement('li');
    for (const [cls, text] of [['n', `${r.n}.`], ['', r.w], ['', r.b]]) {
      const s = document.createElement('span');
      if (cls) s.className = cls;
      s.textContent = text;
      li.appendChild(s);
    }
    historyEl.appendChild(li);
  }
  if (!rows.length) {
    const li = document.createElement('li');
    li.className = 'is-empty';
    li.textContent = 'Henüz hamle yok.';
    historyEl.appendChild(li);
  }
  historyEl.scrollTop = historyEl.scrollHeight;
}

const setMsg = (t) => { if (msgEl.textContent !== t) msgEl.textContent = t; };

/* ---------- Oyun akışı ---------- */
function cancelAI() {
  aiToken++;
  thinking = false;
  if (cancelPending) { cancelPending(); cancelPending = null; }
}

function buildLog(c) {
  return c.history({ verbose: true }).map((m) => ({
    san: m.san, color: m.color, from: m.from, to: m.to, num: Number(String(m.before).split(' ')[5]) || 1,
  }));
}

/** Verilen Chess nesnesiyle (yeni oyun, FEN ya da PGN) oyunu baştan kurar. */
function startFrom(c, loaded) {
  cancelAI();
  closePromo(false, true);
  chess = c;
  log = buildLog(c);
  selected = null;
  targets = new Map();
  thinkInfo = '';
  setMsg('');
  flip = mode() === 'cpu' ? human() === 'b' : (autoflipEl.checked && chess.turn() === 'b');
  rovingDom = domOfSquare(flip ? 'e7' : 'e2');
  statsRecorded = !!loaded && c.isGameOver();
  historyEl.dataset.sig = '';
  checkEnd();
  render();
  maybeComputer();
}

function newGame() { startFrom(new Chess(), false); }

function doMove(from, to, promotion) {
  let m;
  try {
    m = chess.move({ from, to, promotion });
  } catch {
    rejectMove();
    return false;
  }
  log.push({ san: m.san, color: m.color, from: m.from, to: m.to, num: Number(String(m.before).split(' ')[5]) || 1 });
  selected = null;
  targets = new Map();
  setMsg('');
  if (mode() === 'two' && autoflipEl.checked) flip = chess.turn() === 'b';
  checkEnd();
  render();
  maybeComputer();
  return true;
}

function rejectMove() {
  selected = null;
  targets = new Map();
  setMsg(chess.isCheck()
    ? 'Şahınız tehdit altında: şahı kurtaran bir hamle seçin.'
    : 'Bu hamle geçerli değil. Işıklı karelerden birini seçin.');
  render();
}

function computeTargets(sq) {
  const t = new Map();
  try {
    for (const m of chess.moves({ square: sq, verbose: true })) {
      t.set(m.to, { capture: !!m.captured || String(m.flags).includes('e') });
    }
  } catch { /* geçersiz kare: hedef yok */ }
  return t;
}

function selectSquare(sq) {
  selected = sq;
  targets = computeTargets(sq);
}

function attemptMove(from, to) {
  let cands = [];
  try { cands = chess.moves({ square: from, verbose: true }).filter((m) => m.to === to); } catch { cands = []; }
  if (!cands.length) { rejectMove(); return false; }
  if (cands[0].promotion) { openPromo(from, to); return true; }
  return doMove(from, to);
}

/* ---------- Terfi penceresi ---------- */
function openPromo(from, to) {
  pending = { from, to };
  promoList.textContent = '';
  const color = chess.turn();
  for (const [t, label] of [['q', 'Vezir'], ['r', 'Kale'], ['b', 'Fil'], ['n', 'At']]) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `sa-promo-btn is-${color}`;
    b.id = `sa-promo-${t}`;
    b.dataset.promo = t;
    b.innerHTML = `<span class="pic">${svgFor(t)}</span><span>${label}</span>`;
    b.addEventListener('click', () => choosePromo(t));
    promoList.appendChild(b);
  }
  promoEl.hidden = false;
  boardEl.inert = true;
  render();
  promoList.firstChild.focus();
}

function closePromo(cancel, silent) {
  if (!pending && promoEl.hidden) return;
  promoEl.hidden = true;
  boardEl.inert = false;
  pending = null;
  if (cancel) {
    selected = null;
    targets = new Map();
    setMsg('Terfi iptal edildi; başka bir hamle seçebilirsiniz.');
  }
  if (!silent) { render(); cells[rovingDom].focus(); }
}

function choosePromo(t) {
  if (!pending) return;
  const { from, to } = pending;
  pending = null;
  promoEl.hidden = true;
  boardEl.inert = false;
  doMove(from, to, t);
  cells[rovingDom].focus();
}

promoEl.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { e.preventDefault(); closePromo(true); return; }
  const btns = [...promoList.querySelectorAll('button')];
  const i = btns.indexOf(document.activeElement);
  if (e.key === 'Tab') {
    e.preventDefault();
    btns[(i + (e.shiftKey ? btns.length - 1 : 1)) % btns.length].focus();
  } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    e.preventDefault();
    btns[(i + (e.key === 'ArrowRight' ? 1 : btns.length - 1)) % btns.length].focus();
  }
});
promoEl.addEventListener('click', (e) => { if (e.target === promoEl) closePromo(true); });

/* ---------- Bilgisayar sırası ---------- */
/** Aramayı Web Worker'a gönderir; worker yoksa ya da bozulursa ana iş parçacığında çalıştırır. */
function requestMove(fen, level) {
  return new Promise((resolve, reject) => {
    const fallback = () => {
      import('./ai.js').then((ai) => {
        const t = setTimeout(() => { try { resolve(ai.chooseMove(fen, level)); } catch (e) { reject(e); } }, 30);
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
    cancelPending = () => { done(); drop(); }; // hesaplama iptal: bayat sonuç gelmesin, işçi bir sonraki istek için temiz başlasın
    w.postMessage({ id, fen, level });
  });
}

function maybeComputer() {
  if (result || mode() !== 'cpu' || chess.turn() === human()) return;
  thinking = true;
  render();
  const token = ++aiToken;
  const t0 = performance.now();
  requestMove(chess.fen(), levelEl.value).then(async (res) => {
    if (token !== aiToken) return;
    // Hamle anında belirmesin: en az ~350 ms bekle ki oyuncu ne olduğunu görsün.
    const wait = 350 - (performance.now() - t0);
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    if (token !== aiToken) return;
    thinking = false;
    if (!res) { checkEnd(); render(); return; }
    thinkInfo = res.depth > 0
      ? `Bilgisayar hesabı: ${res.depth} yarım hamle derinlik, ${(res.ms / 1000).toFixed(1).replace('.', ',')} sn.`
      : '';
    if (!doMove(res.from, res.to, res.promotion || undefined)) { thinking = false; render(); }
  }).catch(() => {
    if (token !== aiToken) return;
    thinking = false;
    setMsg('Bilgisayar hamle üretemedi. Sayfayı yenileyin ya da iki kişilik moda geçin.');
    render();
  });
}

function undo() {
  const canUndo = mode() === 'two' ? log.length > 0 : log.some((e) => e.color === human());
  if (!canUndo) return;
  cancelAI();
  closePromo(false, true);
  do {
    if (!chess.undo()) break;
    log.pop();
  } while (mode() === 'cpu' && chess.turn() !== human() && log.length);
  selected = null;
  targets = new Map();
  thinkInfo = '';
  setMsg('');
  if (mode() === 'two' && autoflipEl.checked) flip = chess.turn() === 'b';
  checkEnd();
  render();
  maybeComputer();
}

/* ---------- Tıklama ---------- */
function onSquare(d) {
  rovingDom = d;
  if (!canInteract()) { render(); return; }
  const sq = squareOfDom(d);
  const p = chess.get(sq);
  if (selected && selected !== sq && targets.has(sq)) { attemptMove(selected, sq); return; }
  if (p && p.color === chess.turn()) {
    if (selected === sq) { selected = null; targets = new Map(); setMsg(''); } else {
      selectSquare(sq);
      setMsg(targets.size ? '' : 'Bu taşın gidebileceği kare yok. Başka bir taş seçin.');
    }
    render();
    return;
  }
  if (selected) { rejectMove(); return; }
  render();
}

boardEl.addEventListener('click', (e) => {
  if (performance.now() < suppressClickUntil) return; // sürükleme sonrası gelen tıklamayı yoksay
  const btn = e.target.closest('button.sq');
  if (btn) onSquare(Number(btn.dataset.dom));
});

/* ---------- Sürükle-bırak (fare + dokunmatik, pointer events) ---------- */
boardEl.addEventListener('pointerdown', (e) => {
  if (e.pointerType === 'mouse' && e.button !== 0) return;
  const btn = e.target.closest('button.sq');
  if (!btn || !canInteract()) return;
  const sq = btn.dataset.sq;
  const p = chess.get(sq);
  if (!p || p.color !== chess.turn()) return;
  drag = { sq, id: e.pointerId, x0: e.clientX, y0: e.clientY, active: false, ghost: null, btn, ox: 0, oy: 0, w: 0 };
});

function startDrag() {
  const rect = drag.btn.getBoundingClientRect();
  const p = chess.get(drag.sq);
  drag.active = true;
  selectSquare(drag.sq);
  setMsg('');
  const g = document.createElement('div');
  g.className = `sa-ghost is-${p.color}`;
  g.style.width = `${rect.width * 0.96}px`;
  g.style.height = `${rect.height * 0.96}px`;
  g.innerHTML = svgFor(p.type);
  // Tam ekranda yalnızca tam ekran öğesinin çocukları görünür; değilse body'ye eklenir.
  (document.fullscreenElement || document.body).appendChild(g);
  g.style.transform = 'translate(0px, 0px)';
  const o = g.getBoundingClientRect(); // üst öğenin ofsetini ölç (dönüşümlü atalar için)
  drag.ox = o.left; drag.oy = o.top; drag.w = rect.width * 0.96;
  drag.ghost = g;
  render();
}

function moveGhost(x, y) {
  drag.ghost.style.transform = `translate(${x - drag.w / 2 - drag.ox}px, ${y - drag.w / 2 - drag.oy}px)`;
}

function endDrag(e, drop) {
  const d = drag;
  drag = null;
  if (!d) return;
  if (!d.active) return; // basit tıklama: click olayı işler
  if (d.ghost) d.ghost.remove();
  suppressClickUntil = performance.now() + 120;
  let toSq = null;
  if (drop && e) {
    const under = document.elementFromPoint(e.clientX, e.clientY);
    const btn = under && under.closest ? under.closest('button.sq') : null;
    if (btn && boardEl.contains(btn)) toSq = btn.dataset.sq;
  }
  if (toSq && toSq !== d.sq) {
    attemptMove(d.sq, toSq);
    return;
  }
  render(); // aynı kareye bırakıldı ya da iptal: seçim kalır
}

window.addEventListener('pointermove', (e) => {
  if (!drag || e.pointerId !== drag.id) return;
  if (!drag.active) {
    if (Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) < 6) return;
    startDrag();
  }
  moveGhost(e.clientX, e.clientY);
});
window.addEventListener('pointerup', (e) => { if (drag && e.pointerId === drag.id) endDrag(e, true); });
window.addEventListener('pointercancel', (e) => { if (drag && e.pointerId === drag.id) endDrag(e, false); });

/* ---------- Klavye: ok tuşlarıyla kare gez, Enter/Boşluk (düğme tıklaması) seç/oyna, Esc iptal ---------- */
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
    if (drag && drag.active) { endDrag(null, false); return; }
    if (selected) { selected = null; targets = new Map(); setMsg(''); render(); }
    return;
  } else return;
  e.preventDefault();
  rovingDom = nd;
  render();
  cells[nd].focus();
});
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (drag && drag.active) endDrag(null, false);
  else if (selected && !pending && !boardEl.contains(e.target)) { selected = null; targets = new Map(); render(); }
});

/* ---------- FEN / PGN ---------- */
function pgnText() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const lv = { kolay: 'Kolay', orta: 'Orta', zor: 'Zor' }[levelEl.value] || 'Orta';
  const cpu = mode() === 'cpu';
  const you = 'Oyuncu';
  const bot = `Bilgisayar (${lv})`;
  chess.setHeader('Event', 'Bilisim Ajans online satranc');
  chess.setHeader('Site', 'araclar.bilisimajans.com');
  chess.setHeader('Date', `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`);
  chess.setHeader('White', cpu ? (human() === 'w' ? you : bot) : 'Beyaz');
  chess.setHeader('Black', cpu ? (human() === 'b' ? you : bot) : 'Siyah');
  chess.setHeader('Result', result ? (result.winner === 'w' ? '1-0' : result.winner === 'b' ? '0-1' : '1/2-1/2') : '*');
  return chess.pgn();
}

async function copyText(text, label) {
  ioText.value = text;
  try {
    await navigator.clipboard.writeText(text);
    ioMsg.textContent = `${label} panoya kopyalandı.`;
    setMsg(`${label} panoya kopyalandı.`);
  } catch {
    ioDetails.open = true;
    ioText.focus();
    ioText.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    ioMsg.textContent = ok ? `${label} panoya kopyalandı.` : `${label} aşağıdaki kutuya yazıldı; Ctrl+C ile kopyalayabilirsiniz.`;
  }
}

function loadFromText() {
  const text = ioText.value.trim();
  if (!text) { ioMsg.textContent = 'Önce kutuya bir FEN ya da PGN metni yapıştırın.'; return; }
  let c = new Chess();
  let ok = false;
  try { c.load(text); ok = true; } catch { /* FEN değil: PGN dene */ }
  if (!ok) {
    c = new Chess();
    try { c.loadPgn(text); ok = true; } catch { ok = false; }
  }
  if (!ok) {
    ioMsg.textContent = 'Metin geçerli bir FEN ya da PGN değil. FEN altı alandan oluşur (örnek: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1); PGN ise "1. e4 e5 2. Nf3" gibi hamle listesidir.';
    return;
  }
  ioMsg.textContent = 'Konum yüklendi.';
  startFrom(c, true);
}

/* ---------- Kontroller ---------- */
function syncControls() {
  const cpu = mode() === 'cpu';
  $('sa-level-field').hidden = !cpu;
  $('sa-color-field').hidden = !cpu;
  $('sa-stats-wrap').hidden = !cpu;
  $('sa-autoflip-field').hidden = cpu;
}

modeEl.addEventListener('change', () => { syncControls(); newGame(); });
colorEl.addEventListener('change', () => newGame());
levelEl.addEventListener('change', () => { thinkInfo = ''; render(); });
autoflipEl.addEventListener('change', () => { if (mode() === 'two') { flip = autoflipEl.checked && chess.turn() === 'b'; render(); } });
newBtn.addEventListener('click', () => newGame());
undoBtn.addEventListener('click', () => undo());
flipBtn.addEventListener('click', () => { flip = !flip; render(); });
$('sa-stats-reset').addEventListener('click', () => {
  const blank = {};
  for (const k of LEVEL_KEYS) blank[k] = { w: 0, l: 0, d: 0 };
  writeStats(blank);
  renderStats();
});
$('sa-copy-fen').addEventListener('click', () => copyText(chess.fen(), 'FEN'));
$('sa-copy-pgn').addEventListener('click', () => copyText(pgnText(), 'PGN'));
$('sa-load').addEventListener('click', loadFromText);

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
buildBoard();
syncControls();
renderStats();
newGame();

// Test ve hata ayıklama kancası: gizli bilgi taşımaz; konumu okur/yazar. Çağrı: window.__satrancTest() ya da __satrancTest(fen).
const api = {
  fen: () => chess.fen(),
  setFen(fen) { const c = new Chess(); c.load(fen); startFrom(c, true); return chess.fen(); },
  move(from, to, promotion) {
    if (!canInteract()) return false;
    try {
      if (!chess.moves({ square: from, verbose: true }).some((m) => m.to === to)) return false;
    } catch { return false; }
    return doMove(from, to, promotion);
  },
  history: () => log.map((e) => e.san),
  turn: () => chess.turn(),
  over: () => !!result,
  result: () => (result ? { winner: result.winner, kind: result.kind } : null),
  pendingPromotion: () => (pending ? { ...pending } : null),
  flipped: () => flip,
  thinking: () => thinking,
  pgn: () => pgnText(),
};
window.__satrancTest = (fen) => { if (typeof fen === 'string') api.setFen(fen); return api; };
