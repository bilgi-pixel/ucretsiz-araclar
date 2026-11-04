// Dört Bağla arayüzü: sütuna tıkla / dokun / 1–7 tuşları, taş düşme animasyonu, kazanma çizgisi,
// bilgisayar rakip (Web Worker'da minimax + alfa-beta), iki kişilik mod, geri al ve skor tablosu.
// Tamamen istemci tarafı; dış istek yok. Skorlar yalnızca localStorage'a yazılır. Saf mantık ./engine.js içindedir.
import { COLS, ROWS, createBoard, applyMove, winLineAt, isFull, other, bestMove, mulberry32 } from './engine.js';

const STORE_KEY = 'ba-oyun-dort-bagla';
const MIN_THINK = 450; // bilgisayar hamlesi en az bu kadar gecikir ki oyuncu ne olduğunu görsün (ms)
const MODES = ['cpu', 'two'];
const LEVELS = ['easy', 'medium', 'hard'];
const COLORS = { 1: 'kırmızı', 2: 'sarı' };

// ---------- Depolama (bozuk veriye dayanıklı) ----------
function loadStore() {
  let raw = null;
  try { raw = JSON.parse(localStorage.getItem(STORE_KEY)); } catch { raw = null; }
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) raw = {};
  const scores = raw.scores && typeof raw.scores === 'object' && !Array.isArray(raw.scores) ? raw.scores : {};
  const prefs = raw.prefs && typeof raw.prefs === 'object' ? raw.prefs : {};
  return { scores, prefs };
}
function saveStore(data) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch { /* özel gezinti vb. */ }
}
const num = (v) => (Number.isFinite(v) && v >= 0 ? Math.floor(v) : 0);

// ---------- Bilgisayar hesabı: Web Worker, olmazsa ana iş parçacığı ----------
let worker = null;
let workerBroken = false;
let reqId = 0;
let cancelPending = null;
function requestMove(board, player, level) {
  const seed = Math.floor(Math.random() * 4294967296);
  return new Promise((resolve, reject) => {
    const fallback = () => {
      const t = setTimeout(() => { try { resolve(bestMove(board, player, level, mulberry32(seed)).col); } catch (e) { reject(e); } }, 30);
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
      if (e.data.ok) resolve(e.data.col); else reject(new Error(e.data.error));
    };
    const onErr = () => { done(); drop(); workerBroken = true; fallback(); };
    w.addEventListener('message', onMsg);
    w.addEventListener('error', onErr);
    cancelPending = () => { done(); drop(); }; // iptal: bayat sonuç gelmesin
    w.postMessage({ id, board, player, level, seed });
  });
}

function init() {
  const $ = (id) => document.getElementById(id);
  const el = {
    box: $('oyun-kutusu'), board: $('dk-board'), mode: $('dk-mode'), level: $('dk-level'), first: $('dk-first'),
    levelField: $('dk-level-field'), firstField: $('dk-first-field'), status: $('dk-status'), hint: $('dk-hint'),
    result: $('dk-result'), resultTitle: $('dk-result-title'), resultText: $('dk-result-text'),
    chip1: $('dk-chip-1'), chip2: $('dk-chip-2'), la: $('dk-la'), lb: $('dk-lb'), sa: $('dk-sa'), sb: $('dk-sb'), sd: $('dk-sd'),
    undo: $('dk-undo'),
  };

  const store = loadStore();
  const prefs = store.prefs;
  if (MODES.includes(prefs.mode)) el.mode.value = prefs.mode;
  if (LEVELS.includes(prefs.level)) el.level.value = prefs.level;
  if (['me', 'cpu'].includes(prefs.first)) el.first.value = prefs.first;

  let mode = 'cpu'; let level = 'medium';
  let human = 1; let cpu = 2;
  let board = createBoard();
  let moves = []; // { col, player, index }
  let turn = 1; let over = false; let busy = false; let aiToken = 0; let gen = 0;
  let focusCol = 3;
  let cols = []; let slots = []; let svg = null;

  const scoreKey = () => (mode === 'two' ? 'two' : 'cpu|' + level);
  function getScore() {
    const s = store.scores[scoreKey()];
    const o = s && typeof s === 'object' ? s : {};
    const v = { a: num(o.a), b: num(o.b), d: num(o.d) };
    store.scores[scoreKey()] = v;
    return v;
  }
  const nameOf = (p) => (mode === 'two' ? 'Oyuncu ' + p : p === human ? 'Sen' : 'Bilgisayar');
  const roleOf = (p) => (mode === 'two' ? (p === 1 ? 'a' : 'b') : p === human ? 'a' : 'b');
  const playerOfRole = (role) => (mode === 'two' ? (role === 'a' ? 1 : 2) : role === 'a' ? human : cpu);
  const reduced = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setStatus(t) { el.status.textContent = t; }

  // ----- Tahta kurulumu -----
  function buildBoard() {
    el.board.textContent = '';
    cols = []; slots = [];
    for (let c = 0; c < COLS; c++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'dk-col';
      b.dataset.c = String(c);
      b.tabIndex = c === focusCol ? 0 : -1;
      for (let r = 0; r < ROWS; r++) {
        const s = document.createElement('span');
        s.className = 'dk-slot';
        s.dataset.i = String(r * COLS + c);
        b.appendChild(s);
        slots[r * COLS + c] = s;
      }
      b.addEventListener('click', () => { setFocus(c, false); onColumn(c); });
      el.board.appendChild(b);
      cols.push(b);
    }
    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'dk-line');
    svg.setAttribute('viewBox', '0 0 ' + COLS + ' ' + ROWS);
    svg.setAttribute('aria-hidden', 'true');
    el.board.appendChild(svg);
  }

  function setFocus(c, move) {
    focusCol = Math.max(0, Math.min(COLS - 1, c));
    cols.forEach((b, k) => { b.tabIndex = k === focusCol ? 0 : -1; });
    if (move) cols[focusCol].focus();
  }

  /** Tahtadaki taşları durumdan çizer. animIdx verilirse yalnızca o taş düşme animasyonuyla gelir. */
  function renderBoard(animIdx = -1) {
    const anim = animIdx >= 0 && !reduced();
    slots.forEach((s, i) => {
      const v = board[i];
      let disc = s.firstChild;
      if (!v) { if (disc) disc.remove(); return; }
      if (!disc) { disc = document.createElement('span'); s.appendChild(disc); }
      disc.className = 'dk-disc';
      disc.dataset.p = String(v);
      if (i === animIdx && anim) {
        disc.classList.add('is-drop');
        disc.style.setProperty('--fall', String(Math.floor(i / COLS) + 1));
      } else disc.style.removeProperty('--fall');
    });
    cols.forEach((b, c) => {
      let free = 0;
      for (let r = 0; r < ROWS; r++) if (!board[r * COLS + c]) free++;
      b.setAttribute('aria-label', 'Sütun ' + (c + 1) + ', ' + (free ? free + ' boş yer' : 'dolu'));
      b.setAttribute('aria-disabled', over || !free ? 'true' : 'false');
    });
  }

  function renderScore() {
    const s = getScore();
    el.la.textContent = nameOf(playerOfRole('a')) + ' (' + COLORS[playerOfRole('a')] + ')';
    el.lb.textContent = nameOf(playerOfRole('b')) + ' (' + COLORS[playerOfRole('b')] + ')';
    el.sa.textContent = String(s.a);
    el.sb.textContent = String(s.b);
    el.sd.textContent = String(s.d);
  }

  function renderTurn() {
    el.chip1.querySelector('span').textContent = nameOf(1) + ' · ' + COLORS[1];
    el.chip2.querySelector('span').textContent = nameOf(2) + ' · ' + COLORS[2];
    el.chip1.setAttribute('aria-current', !over && turn === 1 ? 'true' : 'false');
    el.chip2.setAttribute('aria-current', !over && turn === 2 ? 'true' : 'false');
    el.undo.disabled = over || !(mode === 'two' ? moves.length > 0 : moves.some((m) => m.player === human));
  }

  function turnStatus() {
    if (mode === 'cpu' && turn === cpu) return 'Bilgisayar düşünüyor…';
    if (mode === 'two') return 'Sıra: ' + nameOf(turn) + ' (' + COLORS[turn] + ').';
    return 'Sıra sende (' + COLORS[turn] + ').';
  }

  function drawLine(run) {
    const a = run[0]; const z = run[run.length - 1];
    const x0 = (a % COLS) + 0.5; const y0 = Math.floor(a / COLS) + 0.5;
    const x1 = (z % COLS) + 0.5; const y1 = Math.floor(z / COLS) + 0.5;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x0.toFixed(3)); line.setAttribute('y1', y0.toFixed(3));
    line.setAttribute('x2', x1.toFixed(3)); line.setAttribute('y2', y1.toFixed(3));
    line.setAttribute('stroke-width', '0.14');
    line.style.setProperty('--len', Math.hypot(x1 - x0, y1 - y0).toFixed(3));
    svg.textContent = '';
    svg.appendChild(line);
  }

  function finish(winner, run) {
    over = true;
    busy = false;
    const s = getScore();
    let title; let text;
    if (run) {
      s[roleOf(winner)]++;
      if (mode === 'two') {
        title = nameOf(winner) + ' (' + COLORS[winner] + ') kazandı!';
        text = 'Dört taş yan yana geldi. Yeni oyun için düğmeye basın.';
      } else if (winner === human) {
        title = 'Tebrikler, kazandınız!';
        text = 'Skor tablosu güncellendi.';
      } else {
        title = 'Bilgisayar kazandı.';
        text = level === 'hard' ? 'Zor seviye yaklaşık yedi hamle ilerisini hesaplar; aynı anda iki tehdit kurmaya çalışın.' : 'Bir sonraki oyunda merkez sütundan başlamayı deneyin.';
      }
    } else {
      s.d++;
      title = 'Berabere!';
      text = 'Tahta doldu ve kimse dört taşı birleştiremedi.';
    }
    saveStore(store);
    renderScore();
    renderTurn();
    renderBoard();
    if (run) { run.forEach((i) => slots[i].firstChild && slots[i].firstChild.classList.add('is-win')); drawLine(run); }
    el.resultTitle.textContent = title;
    el.resultText.textContent = text;
    el.result.classList.add('is-active');
    setStatus(title);
  }

  /** Taşı bırakır (oyuncu ya da bilgisayar). Geçerliyse true. */
  function play(col, player) {
    const res = applyMove(board, col, player);
    if (!res) return false;
    board = res.board;
    moves.push({ col, player, index: res.index });
    renderBoard(res.index);
    const run = winLineAt(board, res.index);
    if (run) { finish(player, run); return true; }
    if (isFull(board)) { finish(null, null); return true; }
    turn = other(player);
    renderTurn();
    setStatus(nameOf(player) + ' ' + (col + 1) + '. sütuna bıraktı. ' + turnStatus());
    maybeCpu();
    return true;
  }

  function onColumn(col) {
    if (over || busy) return;
    if (mode === 'cpu' && turn === cpu) return;
    if (!play(col, turn)) setStatus('Sütun ' + (col + 1) + ' dolu; başka bir sütun seçin.');
  }

  function maybeCpu() {
    if (over || mode !== 'cpu' || turn !== cpu) return;
    busy = true;
    const token = ++aiToken;
    const g = gen;
    const t0 = performance.now();
    requestMove(board.slice(), cpu, level).then(async (col) => {
      const wait = MIN_THINK - (performance.now() - t0);
      if (wait > 0) await new Promise((r) => setTimeout(r, wait));
      if (token !== aiToken || g !== gen || over) return;
      busy = false;
      if (!play(col, cpu)) {
        // Beklenmeyen: geçersiz hamle gelirse ilk boş sütuna oyna.
        const alt = [0, 1, 2, 3, 4, 5, 6].find((c) => board[c] === 0);
        if (alt !== undefined) play(alt, cpu);
      }
    }).catch(() => {
      if (token !== aiToken) return;
      busy = false;
      const alt = [3, 2, 4, 1, 5, 0, 6].find((c) => board[c] === 0);
      if (alt !== undefined) play(alt, cpu);
    });
  }

  function undo() {
    if (over) return;
    if (busy) { aiToken++; if (cancelPending) cancelPending(); busy = false; }
    if (!moves.length) return;
    let popped = moves.pop();
    if (mode === 'cpu' && popped.player === cpu && moves.length) popped = moves.pop();
    // Tahtayı hamle listesinden yeniden kur.
    board = createBoard();
    for (const m of moves) board = applyMove(board, m.col, m.player).board;
    turn = popped.player;
    renderBoard();
    renderTurn();
    setStatus('Hamle geri alındı. ' + turnStatus());
    maybeCpu();
  }

  function newGame() {
    gen++;
    aiToken++;
    if (cancelPending) cancelPending();
    mode = MODES.includes(el.mode.value) ? el.mode.value : 'cpu';
    level = LEVELS.includes(el.level.value) ? el.level.value : 'medium';
    human = mode === 'cpu' && el.first.value === 'cpu' ? 2 : 1;
    cpu = mode === 'cpu' ? other(human) : 0;
    el.levelField.hidden = mode === 'two';
    el.firstField.hidden = mode === 'two';
    el.hint.textContent = 'Sütuna tıklayın, dokunun ya da 1–7 tuşlarına basın. Taş en alttaki boş kareye düşer; yatay, dikey veya çapraz dört taşı birleştiren kazanır.';
    board = createBoard();
    moves = [];
    turn = 1;
    over = false;
    busy = false;
    el.result.classList.remove('is-active');
    buildBoard();
    renderBoard();
    renderScore();
    renderTurn();
    setStatus(turnStatus());
    store.prefs = { mode, level, first: el.first.value === 'cpu' ? 'cpu' : 'me' };
    saveStore(store);
    maybeCpu();
  }

  // Klavye: sütunlar arasında oklar, 1–7 doğrudan sütuna bırakır.
  el.board.addEventListener('keydown', (e) => {
    const cur = Number(e.target.closest('.dk-col')?.dataset.c ?? focusCol);
    let to = null;
    if (e.key === 'ArrowRight') to = Math.min(COLS - 1, cur + 1);
    else if (e.key === 'ArrowLeft') to = Math.max(0, cur - 1);
    else if (e.key === 'Home') to = 0;
    else if (e.key === 'End') to = COLS - 1;
    else return;
    e.preventDefault();
    setFocus(to, true);
  });
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const tag = e.target && e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if (/^[1-7]$/.test(e.key)) {
      const c = Number(e.key) - 1;
      setFocus(c, false);
      onColumn(c);
    }
  });

  [el.mode, el.level, el.first].forEach((s) => s.addEventListener('change', newGame));
  $('dk-restart').addEventListener('click', newGame);
  $('dk-again').addEventListener('click', () => { newGame(); setFocus(focusCol, true); });
  el.undo.addEventListener('click', undo);
  $('dk-reset-score').addEventListener('click', () => {
    store.scores[scoreKey()] = { a: 0, b: 0, d: 0 };
    saveStore(store);
    renderScore();
  });

  // Tam ekran: yalnızca oyun kutusu gösterilir (reklam alanları kutunun dışındadır).
  const fsBtn = $('dk-full');
  if (!document.fullscreenEnabled) {
    fsBtn.hidden = true;
  } else {
    fsBtn.addEventListener('click', () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else el.box.requestFullscreen().catch(() => {});
    });
    document.addEventListener('fullscreenchange', () => {
      fsBtn.textContent = document.fullscreenElement ? 'Tam ekrandan çık' : 'Tam ekran';
    });
  }

  newGame();
}

if (typeof document !== 'undefined' && document.getElementById('dk-board')) init();
