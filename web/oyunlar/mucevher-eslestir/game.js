// Mücevher Eşleştir: komşu iki mücevheri değiştir, 3+ aynı mücevheri sıraya diz.
// 8x8 tahta, 25 hamle, zincirleme (kaskad) çarpanı. Ses yok, ağ isteği yok.
// Rekor yalnızca localStorage'da tutulur (ba-oyun-mucevher-eslestir).

const $ = (id) => document.getElementById(id);
const KEY = 'ba-oyun-mucevher-eslestir';
const N = 8;
const TYPES = 6;
const START_MOVES = 25;
const SYMBOLS = ['●', '▲', '■', '◆', '★', '♥'];
const COLORS = ['#e8554d', '#4a9be8', '#58c46a', '#f2b134', '#a07ce8', '#e05fb0'];
const NAMES = ['kırmızı daire', 'mavi üçgen', 'yeşil kare', 'sarı baklava', 'mor yıldız', 'pembe kalp'];

/* ---------- Kayıt ---------- */
const store = { best: 0 };
function loadStore() {
  try {
    const o = JSON.parse(localStorage.getItem(KEY));
    if (o && typeof o === 'object' && !Array.isArray(o) && Number.isInteger(o.best) && o.best >= 0 && o.best <= 9999999) store.best = o.best;
  } catch (e) { /* bozuk ya da kapalı depolama: varsayılanlarla devam */ }
}
function saveStore() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* depolama kapalı */ } }

/* ---------- Mantık ---------- */
const state = { board: [], score: 0, moves: START_MOVES, over: false, sel: -1, cur: 0, newRecord: false };
const rnd = () => Math.floor(Math.random() * TYPES);
const idx = (r, c) => r * N + c;
let refillQueue = [];
const nextGem = () => (refillQueue.length ? refillQueue.shift() : rnd());

/** Başlangıçta hazır eşleşme olmayan tahta üretir. */
function freshBoard() {
  const b = new Array(N * N);
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      let v;
      do {
        v = rnd();
      } while (
        (c >= 2 && b[idx(r, c - 1)] === v && b[idx(r, c - 2)] === v) ||
        (r >= 2 && b[idx(r - 1, c)] === v && b[idx(r - 2, c)] === v)
      );
      b[idx(r, c)] = v;
    }
  }
  return b;
}

/** 3 ve üstü yatay/dikey sıralardaki hücre indekslerini döndürür. */
function findMatches(b) {
  const hit = new Set();
  for (let r = 0; r < N; r++) {
    let run = 1;
    for (let c = 1; c <= N; c++) {
      if (c < N && b[idx(r, c)] !== null && b[idx(r, c)] === b[idx(r, c - 1)]) run++;
      else {
        if (run >= 3) for (let k = 1; k <= run; k++) hit.add(idx(r, c - k));
        run = 1;
      }
    }
  }
  for (let c = 0; c < N; c++) {
    let run = 1;
    for (let r = 1; r <= N; r++) {
      if (r < N && b[idx(r, c)] !== null && b[idx(r, c)] === b[idx(r - 1, c)]) run++;
      else {
        if (run >= 3) for (let k = 1; k <= run; k++) hit.add(idx(r - k, c));
        run = 1;
      }
    }
  }
  return hit;
}

const adjacent = (a, b) => {
  const ra = Math.floor(a / N), ca = a % N, rb = Math.floor(b / N), cb = b % N;
  return Math.abs(ra - rb) + Math.abs(ca - cb) === 1;
};

/** Eşleşme yaratan ilk hamleyi bulur: [a, b] ya da null. */
function findMove(b) {
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      for (const [dr, dc] of [[0, 1], [1, 0]]) {
        const r2 = r + dr, c2 = c + dc;
        if (r2 >= N || c2 >= N) continue;
        const a = idx(r, c), d = idx(r2, c2);
        [b[a], b[d]] = [b[d], b[a]];
        const ok = findMatches(b).size > 0;
        [b[a], b[d]] = [b[d], b[a]];
        if (ok) return [a, d];
      }
    }
  }
  return null;
}

/** Eşleşmeleri temizle, düşür, doldur; zincir bitene kadar tekrarla. */
function resolve() {
  let chain = 0, gained = 0, cleared = 0;
  for (;;) {
    const m = findMatches(state.board);
    if (!m.size) break;
    chain++;
    cleared += m.size;
    gained += m.size * 10 * chain + Math.max(0, m.size - 3) * 10;
    m.forEach((i) => { state.board[i] = null; });
    for (let c = 0; c < N; c++) {
      let write = N - 1;
      for (let r = N - 1; r >= 0; r--) {
        const v = state.board[idx(r, c)];
        if (v !== null) { state.board[idx(write, c)] = v; write--; }
      }
      for (let r = write; r >= 0; r--) state.board[idx(r, c)] = nextGem();
    }
  }
  state.score += gained;
  return { chain, gained, cleared };
}

/** Hamle kalmadıysa tahtayı eşleşmesiz ve hamleli yeniden karıştırır. */
function ensureMove() {
  let tries = 0;
  while (!findMove(state.board) && tries < 200) { state.board = freshBoard(); tries++; }
  return tries > 0;
}

function swap(a, b) {
  if (state.over) return { ok: false, reason: 'bitti' };
  if (!(a >= 0 && a < N * N && b >= 0 && b < N * N) || !adjacent(a, b)) return { ok: false, reason: 'uzak' };
  const B = state.board;
  [B[a], B[b]] = [B[b], B[a]];
  if (!findMatches(B).size) {
    [B[a], B[b]] = [B[b], B[a]];
    state.sel = -1;
    render();
    say('Bu değişim eşleşme oluşturmadı; hamle harcanmadı.');
    return { ok: false, reason: 'eşleşme yok' };
  }
  state.moves--;
  state.sel = -1;
  const res = resolve();
  let shuffled = false;
  if (state.moves > 0) shuffled = ensureMove();
  if (state.score > store.best) { store.best = state.score; state.newRecord = true; }
  if (state.moves <= 0) finish();
  render();
  if (!state.over) {
    say(`${res.cleared} mücevher temizlendi${res.chain > 1 ? `, ${res.chain} zincir` : ''}, +${res.gained} puan.${shuffled ? ' Hamle kalmadığı için tahta karıştırıldı.' : ''}`);
  }
  return { ok: true, ...res };
}

function finish() {
  state.over = true;
  saveStore();
  $('oyun').dataset.phase = 'bitti';
  $('sonuc-skor').textContent = String(state.score);
  $('sonuc-rekor').hidden = !state.newRecord;
  const s = $('sonuc');
  s.hidden = false;
  s.classList.add('is-active');
  say(`Oyun bitti: ${state.score} puan.`);
  render();
  $('mu-new').focus();
}

function newGame(board) {
  state.board = board ? board.slice() : freshBoard();
  if (!board) ensureMove();
  state.score = 0;
  state.moves = START_MOVES;
  state.over = false;
  state.sel = -1;
  state.newRecord = false;
  $('oyun').dataset.phase = 'oyun';
  const s = $('sonuc');
  s.hidden = true;
  s.classList.remove('is-active');
  render();
  say('Yeni oyun: 25 hamleniz var. Komşu iki mücevheri değiştirin.');
}

/* ---------- Çizim ---------- */
const gridEl = $('mu-grid');
const msgEl = $('mu-msg');
function say(t) { msgEl.textContent = t; }

function syncTab() {
  Array.prototype.forEach.call(gridEl.children, (b, i) => { b.tabIndex = i === state.cur ? 0 : -1; });
}
function buildGrid() {
  for (let i = 0; i < N * N; i++) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'mu-cell';
    b.dataset.i = String(i);
    b.addEventListener('click', () => choose(i));
    b.addEventListener('focus', () => { state.cur = i; syncTab(); });
    gridEl.appendChild(b);
  }
}
function render() {
  Array.prototype.forEach.call(gridEl.children, (b, i) => {
    const v = state.board[i];
    b.style.background = COLORS[v];
    b.textContent = SYMBOLS[v];
    b.classList.toggle('is-sel', state.sel === i);
    b.setAttribute('aria-pressed', String(state.sel === i));
    b.setAttribute('aria-label', `Satır ${Math.floor(i / N) + 1}, sütun ${(i % N) + 1}: ${NAMES[v]}${state.sel === i ? ' (seçili)' : ''}`);
    b.disabled = state.over;
    b.classList.remove('is-hint');
  });
  syncTab();
  $('mu-score').textContent = String(state.score);
  $('mu-moves').textContent = String(state.moves);
  $('mu-best').textContent = String(store.best);
}

function choose(i) {
  if (state.over) return;
  state.cur = i;
  if (state.sel < 0) { state.sel = i; render(); say('Seçildi. Komşu bir mücevhere tıklayın ya da yön tuşuna basın.'); return; }
  if (state.sel === i) { state.sel = -1; render(); say('Seçim iptal edildi.'); return; }
  if (!adjacent(state.sel, i)) { state.sel = i; render(); say('Yalnızca yan yana ya da alt alta olanlar değişir; yeni mücevher seçildi.'); return; }
  swap(state.sel, i);
}

function hint() {
  if (state.over) return;
  const m = findMove(state.board);
  if (!m) { say('Uygun hamle yok.'); return; }
  m.forEach((i) => gridEl.children[i].classList.add('is-hint'));
  say(`İpucu: satır ${Math.floor(m[0] / N) + 1} sütun ${(m[0] % N) + 1} ile satır ${Math.floor(m[1] / N) + 1} sütun ${(m[1] % N) + 1} yer değiştirebilir.`);
}

/* ---------- Klavye ---------- */
$('oyun').addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const k = e.key;
  const dirs = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
  if (dirs[k]) {
    if (state.over) return;
    e.preventDefault();
    const [dr, dc] = dirs[k];
    const r = Math.floor(state.cur / N) + dr, c = (state.cur % N) + dc;
    if (r < 0 || r >= N || c < 0 || c >= N) return;
    const to = idx(r, c);
    if (state.sel >= 0 && state.sel === state.cur) {
      swap(state.sel, to);
    }
    gridEl.children[to].focus();
  } else if (k === 'Escape') {
    if (state.sel >= 0) { state.sel = -1; render(); say('Seçim iptal edildi.'); }
  } else if (k === 'h' || k === 'H') hint();
  else if (k === 'r' || k === 'R') { newGame(); gridEl.children[state.cur].focus(); }
});

$('mu-hint').addEventListener('click', hint);
$('mu-restart').addEventListener('click', () => { newGame(); gridEl.children[0].focus(); });
$('mu-new').addEventListener('click', () => { newGame(); gridEl.children[0].focus(); });

/* ---------- Tam ekran ---------- */
const boxEl = $('oyun');
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
  board: state.board.slice(), score: state.score, moves: state.moves, over: state.over,
  sel: state.sel, cur: state.cur, best: store.best,
});
window.__mucevherTest = Object.assign(snapshot, {
  swap,
  findMatches: (b) => Array.from(findMatches(b)).sort((x, y) => x - y),
  findMove: () => findMove(state.board),
  setBoard: (b, queue) => { refillQueue = (queue || []).slice(); newGame(b); return snapshot(); },
  setMoves: (n) => { state.moves = n; render(); },
  freshBoard,
});

loadStore();
buildGrid();
newGame();
