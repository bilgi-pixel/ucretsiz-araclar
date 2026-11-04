// Satranç bulmacaları: Lichess veritabanından (CC0) süzülmüş 1.500 bulmaca, yerel Elo benzeri derece, günün bulmacası.
// Kurallar chess.js (BSD-2) ile denetlenir. Ağ isteği yok (puzzles.json aynı siteden yüklenir); yalnızca localStorage'a yazılır.
import { Chess } from '../../vendor/chess.js@1.4.0/chess.js';

const $ = (id) => document.getElementById(id);
const boxEl = $('bu-box');
const boardEl = $('bu-board');
const ranksEl = $('bu-ranks');
const filesEl = $('bu-files');
const statusEl = $('bu-status');
const msgEl = $('bu-msg');
const infoEl = $('bu-info');
const levelEl = $('bu-level');
const themeEl = $('bu-theme');
const nextBtn = $('bu-next');
const dailyBtn = $('bu-daily');
const hintBtn = $('bu-hint');
const solBtn = $('bu-solution');
const retryBtn = $('bu-retry');
const fsBtn = $('bu-full');
const promoEl = $('bu-promo');
const promoList = $('bu-promo-list');
const loadEl = $('bu-loading');
const errEl = $('bu-error');
const playEl = $('bu-play');
const resetBtn = $('bu-reset');

const KEY = 'ba-oyun-satranc-bulmacalari';
const FILES = 'abcdefgh';
const NAMES = { p: 'piyon', n: 'at', b: 'fil', r: 'kale', q: 'vezir', k: 'şah' };
const SIDE = { w: 'Beyaz', b: 'Siyah' };
const PROMO_ORDER = ['q', 'r', 'b', 'n'];

// Tema adları (Lichess etiketlerinin Türkçesi)
const THEME_TR = {
  mateIn1: 'Tek hamlede mat', mateIn2: 'İki hamlede mat', mateIn3: 'Üç hamlede mat', mateIn4: 'Dört hamlede mat',
  fork: 'Çatal', pin: 'Bağlama', skewer: 'Şiş', endgame: 'Oyun sonu', middlegame: 'Oyun ortası', opening: 'Açılış',
  discoveredAttack: 'Açma saldırısı', backRankMate: 'Son sıra matı', hangingPiece: 'Korumasız taş', deflection: 'Saptırma',
  sacrifice: 'Fedakârlık', attraction: 'Çekme', trappedPiece: 'Kapana kısılmış taş', promotion: 'Piyon terfisi',
  defensiveMove: 'Savunma hamlesi', quietMove: 'Sessiz hamle', clearance: 'Yol açma', intermezzo: 'Ara hamle',
  smotheredMate: 'Boğma matı', doubleCheck: 'Çifte şah', zugzwang: 'Zugzwang', exposedKing: 'Açıktaki şah',
  kingsideAttack: 'Şah kanadı saldırısı', queensideAttack: 'Vezir kanadı saldırısı', advancedPawn: 'İlerlemiş piyon',
  capturingDefender: 'Savunanı alma', xRayAttack: 'X-ray saldırısı', interference: 'Araya girme',
  rookEndgame: 'Kale oyun sonu', pawnEndgame: 'Piyon oyun sonu', bishopEndgame: 'Fil oyun sonu',
  knightEndgame: 'At oyun sonu', queenEndgame: 'Vezir oyun sonu',
};
const themeName = (t) => THEME_TR[t] || t;

const LEVELS = {
  adaptif: { label: 'Seviyeme göre' },
  kolay: { label: 'Kolay (1000 altı)', lo: 0, hi: 1000 },
  orta: { label: 'Orta (1000–1599)', lo: 1000, hi: 1600 },
  zor: { label: 'Zor (1600–1999)', lo: 1600, hi: 2000 },
  uzman: { label: 'Uzman (2000+)', lo: 2000, hi: 9999 },
  hepsi: { label: 'Hepsi', lo: 0, hi: 9999 },
};

/* ---------- Taş çizimleri (kendi SVG'miz) ---------- */
const SHAPES = {
  p: '<path d="M42 46h16c1 8 7 14 9 22l3 10H30l3-10c2-8 8-14 9-22z"/><path d="M37 41h26v7H37z"/><circle cx="50" cy="30" r="10"/><path d="M26 78h48v10H26z"/>',
  r: '<path d="M34 78l3-34h26l3 34z"/><path d="M30 44V22h9v6h7v-6h8v6h7v-6h9v22z"/><path d="M26 78h48v10H26z"/><path class="d" d="M38 54h24"/>',
  n: '<path d="M30 78c0-10 5-17 11-23l-15-1c-3-3-4-7-2-10l9-9 2-13 8 8c14-3 30 7 31 28 0 7-1 13 0 20z"/><path d="M26 78h48v10H26z"/><circle class="dot" cx="42" cy="36" r="2.8"/><circle class="dot" cx="25.5" cy="46" r="1.6"/><path class="d" d="M52 34c9 4 13 14 11 30"/>',
  b: '<path d="M34 78c1-10 6-16 8-22h16c2 6 7 12 8 22z"/><path d="M50 15c10 8 17 20 12 33-1 4-3 7-6 8H44c-3-1-5-4-6-8-5-13 2-25 12-33z"/><path d="M37 55h26v7H37z"/><circle cx="50" cy="12" r="4.5"/><path d="M26 78h48v10H26z"/><path class="d" d="M50 26v12M44 32h12"/>',
  q: '<path d="M30 78L25 38l9 18 4-24 6 20 6-26 6 26 6-20 4 24 9-18-5 40z"/><circle cx="25" cy="35" r="4.5"/><circle cx="38" cy="29" r="4.5"/><circle cx="50" cy="23" r="4.5"/><circle cx="62" cy="29" r="4.5"/><circle cx="75" cy="35" r="4.5"/><path d="M26 78h48v10H26z"/><path class="d" d="M33 66h34"/>',
  k: '<path d="M30 78c-2-12 2-22 10-26-5-8-1-18 10-18s15 10 10 18c8 4 12 14 10 26z"/><path d="M47 9h6v7h7v6h-7v8h-6v-8h-7v-6h7z"/><path d="M26 78h48v10H26z"/><path class="d" d="M36 64h28"/>',
};
const svgFor = (t) => `<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">${SHAPES[t]}</svg>`;

/* ---------- Kayıt (localStorage; bozuk veriye karşı korumalı) ---------- */
const num = (v, d, lo, hi) => (typeof v === 'number' && Number.isFinite(v) ? Math.min(hi, Math.max(lo, Math.round(v))) : d);
function defaultStore() {
  return { rating: 1200, peak: 1200, solved: 0, failed: 0, streak: 0, best: 0, played: [], daily: null, level: 'adaptif', theme: 'hepsi' };
}
function loadStore() {
  const s = defaultStore();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return s;
    const o = JSON.parse(raw);
    if (!o || typeof o !== 'object' || Array.isArray(o)) return s;
    s.rating = num(o.rating, 1200, 100, 3200);
    s.peak = Math.max(s.rating, num(o.peak, s.rating, 100, 3200));
    s.solved = num(o.solved, 0, 0, 1e7);
    s.failed = num(o.failed, 0, 0, 1e7);
    s.streak = num(o.streak, 0, 0, 1e7);
    s.best = Math.max(s.streak, num(o.best, 0, 0, 1e7));
    if (Array.isArray(o.played)) s.played = o.played.filter((x) => typeof x === 'string' && x.length < 12).slice(-3000);
    if (o.daily && typeof o.daily === 'object' && typeof o.daily.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(o.daily.date)
      && (o.daily.status === 'solved' || o.daily.status === 'failed')) s.daily = { date: o.daily.date, status: o.daily.status };
    if (typeof o.level === 'string' && LEVELS[o.level]) s.level = o.level;
    if (typeof o.theme === 'string' && o.theme.length < 40) s.theme = o.theme;
  } catch (e) { /* bozuk kayıt: varsayılana dön */ }
  return s;
}
let store = loadStore();
function saveStore() {
  try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* depolama kapalı: sessizce geç */ }
}

/* ---------- Durum ---------- */
let puzzles = [];
let byId = new Map();
let chess = new Chess();
let cur = null; // { p, mode, solver, idx, tainted, done, flip, last, hintSq, selected, targets, busy }
const cells = [];
const rankEls = [];
const fileEls = [];
let timer = 0;
let pendingPromo = null;
let focusIdx = 0;

const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
const sqName = (dom, flip) => {
  const r = Math.floor(dom / 8), c = dom % 8;
  return flip ? FILES[7 - c] + (r + 1) : FILES[c] + (8 - r);
};
const domOf = (sq, flip) => {
  const f = FILES.indexOf(sq[0]), rank = +sq[1];
  return flip ? (rank - 1) * 8 + (7 - f) : (8 - rank) * 8 + f;
};

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

function render() {
  const flip = cur ? cur.flip : false;
  for (let k = 0; k < 8; k++) {
    rankEls[k].textContent = String(flip ? k + 1 : 8 - k);
    fileEls[k].textContent = FILES[flip ? 7 - k : k];
  }
  let kingSq = null;
  if (chess.inCheck()) {
    const t = chess.turn();
    for (const row of chess.board()) for (const c of row) if (c && c.type === 'k' && c.color === t) kingSq = c.square;
  }
  for (let i = 0; i < 64; i++) {
    const el = cells[i];
    const sq = sqName(i, flip);
    el.dataset.sq = sq;
    const p = chess.get(sq);
    const pc = el.firstChild;
    const key = p ? p.color + p.type : '';
    if (el.dataset.piece !== key) {
      el.dataset.piece = key;
      pc.className = 'sa-pc' + (p ? ' is-' + p.color : '');
      pc.innerHTML = p ? svgFor(p.type) : '';
    }
    el.setAttribute('aria-label', p ? `${sq}, ${p.color === 'w' ? 'beyaz' : 'siyah'} ${NAMES[p.type]}` : `${sq}, boş`);
    const c = el.classList;
    c.toggle('is-last', !!cur && !!cur.last && (cur.last[0] === sq || cur.last[1] === sq));
    c.toggle('is-selected', !!cur && cur.selected === sq);
    c.toggle('is-dest', !!cur && cur.targets.some((m) => m.to === sq && !m.captured));
    c.toggle('is-dest-cap', !!cur && cur.targets.some((m) => m.to === sq && !!m.captured));
    c.toggle('is-check', sq === kingSq);
    c.toggle('is-hint', !!cur && cur.hintSq === sq);
    el.tabIndex = i === focusIdx ? 0 : -1;
  }
}

function setStatus(text, kind) {
  statusEl.textContent = text;
  statusEl.className = 'bu-status' + (kind ? ' is-' + kind : '');
}
function setMsg(text) { msgEl.textContent = text; }

/* ---------- Kayıt güncelleme ve istatistik ---------- */
function updateStatsView() {
  $('bu-s-rating').textContent = String(store.rating);
  $('bu-s-solved').textContent = String(store.solved);
  const tot = store.solved + store.failed;
  $('bu-s-rate').textContent = tot ? `%${Math.round((store.solved / tot) * 100)}` : '—';
  $('bu-s-streak').textContent = String(store.streak);
  $('bu-s-best').textContent = String(store.best);
  $('bu-s-peak').textContent = String(store.peak);
}

// Elo benzeri derece: beklenen sonuç = 1 / (1 + 10^((bulmaca - ben) / 400)), K = 32
function applyRating(score) {
  const E = 1 / (1 + Math.pow(10, (cur.p.rating - store.rating) / 400));
  const before = store.rating;
  store.rating = Math.max(100, Math.round(store.rating + 32 * (score - E)));
  store.peak = Math.max(store.peak, store.rating);
  return store.rating - before;
}

function markPlayed(id) {
  if (!store.played.includes(id)) store.played.push(id);
  if (store.played.length > 3000) store.played = store.played.slice(-3000);
}

// İlk hata / ipucu / çözümü gösterme: bulmaca "başarısız" sayılır, derece bir kez düşer
function taint(reason) {
  if (!cur || cur.tainted) return;
  cur.tainted = true;
  store.failed += 1;
  store.streak = 0;
  markPlayed(cur.p.id);
  let delta = 0;
  if (!(cur.mode === 'daily' && store.daily && store.daily.date === todayStr())) delta = applyRating(0);
  if (cur.mode === 'daily' && !(store.daily && store.daily.date === todayStr())) store.daily = { date: todayStr(), status: 'failed' };
  saveStore();
  updateStatsView();
  cur.delta = delta;
  cur.reason = reason;
}

function solvedNow() {
  cur.done = true;
  cur.hintSq = null;
  cur.selected = null;
  cur.targets = [];
  let text = 'Doğru! Bulmacayı çözdün.';
  if (!cur.tainted) {
    store.solved += 1;
    store.streak += 1;
    store.best = Math.max(store.best, store.streak);
    markPlayed(cur.p.id);
    let delta = 0;
    const dailyDone = cur.mode === 'daily' && store.daily && store.daily.date === todayStr();
    if (!dailyDone) delta = applyRating(1);
    if (cur.mode === 'daily' && !dailyDone) store.daily = { date: todayStr(), status: 'solved' };
    saveStore();
    updateStatsView();
    text += delta ? ` Derecen ${delta > 0 ? '+' : ''}${delta} → ${store.rating}.` : ` Derecen ${store.rating}.`;
  } else {
    text += ' Hata ya da ipucu kullandığın için derecene puan eklenmedi.';
  }
  setStatus(text, 'ok');
  showThemes();
  finishUi();
}

function showThemes() {
  const th = cur.p.themes ? cur.p.themes.split(' ').filter(Boolean).map(themeName).join(' · ') : '';
  setMsg(`Bulmaca derecesi ${cur.p.rating}${th ? ' · Temalar: ' + th : ''}`);
}

function finishUi() {
  hintBtn.disabled = true;
  solBtn.disabled = true;
  retryBtn.hidden = !cur.tainted || cur.solutionShown;
  render();
  nextBtn.focus({ preventScroll: true });
}

/* ---------- Bulmaca seçimi ---------- */
function filtered(level, theme) {
  let list = puzzles;
  if (level === 'adaptif') {
    const r = store.rating;
    for (let w = 150; w <= 1500; w += 150) {
      const l = puzzles.filter((p) => Math.abs(p.rating - r) <= w);
      if (l.length >= 30) { list = l; break; }
      list = l.length ? l : puzzles;
    }
  } else {
    const lv = LEVELS[level] || LEVELS.hepsi;
    list = puzzles.filter((p) => p.rating >= lv.lo && p.rating < lv.hi);
  }
  if (theme && theme !== 'hepsi') list = list.filter((p) => p.themes.split(' ').includes(theme));
  return list;
}

function pickRandom() {
  let list = filtered(levelEl.value, themeEl.value);
  if (!list.length) list = puzzles;
  const fresh = list.filter((p) => !store.played.includes(p.id) && (!cur || cur.p.id !== p.id));
  if (!fresh.length) {
    // Süzgeçteki tüm bulmacalar çözüldü: bu gruptakileri listeden çıkar, baştan başla
    const ids = new Set(list.map((p) => p.id));
    store.played = store.played.filter((id) => !ids.has(id));
    saveStore();
    setMsg('Bu süzgeçteki tüm bulmacaları gördün; liste baştan başlıyor.');
    return list[Math.floor(Math.random() * list.length)];
  }
  return fresh[Math.floor(Math.random() * fresh.length)];
}

function dailyPuzzle() {
  const d = new Date();
  const day = Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
  return puzzles[(day * 7919 + 13) % puzzles.length];
}

/* ---------- Bulmaca akışı ---------- */
function startPuzzle(p, mode) {
  clearTimeout(timer);
  closePromo();
  chess = new Chess(p.fen);
  const solver = chess.turn() === 'w' ? 'b' : 'w'; // Lichess: ilk hamleyi rakip yapar
  cur = { p, mode, solver, idx: 0, tainted: false, done: false, flip: solver === 'b', last: null, hintSq: null, selected: null, targets: [], busy: true, delta: 0, solutionShown: false, reason: '' };
  boardEl.dataset.puzzle = p.id;
  focusIdx = 0;
  hintBtn.disabled = true;
  solBtn.disabled = true;
  retryBtn.hidden = true;
  infoEl.textContent = mode === 'daily' ? `Günün bulmacası · ${todayStr()}` : 'Bulmaca';
  setMsg('');
  setStatus('Rakip hamle yapıyor…');
  render();
  const mv = p.moves.split(' ');
  timer = setTimeout(() => {
    applyUci(mv[0]);
    cur.idx = 1;
    cur.busy = false;
    hintBtn.disabled = false;
    solBtn.disabled = false;
    setStatus(turnText());
    setMsg(mode === 'daily' && store.daily && store.daily.date === todayStr() ? 'Günün bulmacasını bugün zaten denedin; sonuç derecene tekrar yansımaz.' : 'Hamleni seçmek için bir taşa, sonra hedef kareye dokun.');
    render();
  }, 450);
}

const turnText = () => `${SIDE[cur.solver]} oynuyor: en iyi hamleyi bul.`;

function applyUci(uci) {
  const m = chess.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] });
  cur.last = [m.from, m.to];
  return m;
}

function selectSquare(sq) {
  const moves = chess.moves({ square: sq, verbose: true });
  cur.selected = moves.length ? sq : null;
  cur.targets = moves;
}

function onSquare(sq, idx) {
  focusIdx = idx;
  if (!cur || cur.busy || cur.done) return;
  const piece = chess.get(sq);
  if (cur.selected) {
    const cand = cur.targets.filter((m) => m.to === sq);
    if (cand.length) { attempt(cur.selected, sq, cand); return; }
    if (sq === cur.selected) { cur.selected = null; cur.targets = []; render(); return; }
  }
  if (piece && piece.color === cur.solver) selectSquare(sq);
  else { cur.selected = null; cur.targets = []; }
  render();
}

function attempt(from, to, cand) {
  if (cand.some((m) => m.promotion)) { openPromo(from, to); return; }
  tryMove(from, to, undefined);
}

function tryMove(from, to, promo) {
  const mv = cur.p.moves.split(' ');
  const uci = from + to + (promo || '');
  const expected = mv[cur.idx];
  cur.selected = null;
  cur.targets = [];
  let ok = uci === expected;
  if (!ok) {
    // Aynı konumda başka bir hamle de mat veriyorsa çözüm sayılır
    try {
      const t = new Chess(chess.fen());
      t.move({ from, to, promotion: promo });
      ok = t.isCheckmate();
    } catch (e) { ok = false; }
  }
  if (ok) {
    cur.hintSq = null;
    applyUci(uci);
    cur.idx += 1;
    if (cur.idx >= mv.length || chess.isCheckmate()) { solvedNow(); return; }
    cur.busy = true;
    setStatus('Doğru hamle! Rakip cevap veriyor…', 'ok');
    render();
    timer = setTimeout(() => {
      applyUci(mv[cur.idx]);
      cur.idx += 1;
      cur.busy = false;
      setStatus(turnText());
      setMsg('Güzel gidiyorsun, devam et.');
      render();
    }, 450);
    return;
  }
  // Yanlış hamle: tahtada kalmaz; ipucu olarak oynanması gereken taşın karesi işaretlenir
  taint('hata');
  cur.hintSq = expected.slice(0, 2);
  setStatus('Bu hamle çözüm değil. Tekrar dene: işaretli taşı oynaman gerekiyor.', 'bad');
  setMsg(`Hamle ${from}-${to} bulmacanın çözümü değil. Bu bulmaca başarısız sayıldı (derece ${cur.delta > 0 ? '+' : ''}${cur.delta}); yine de çözüme ulaşabilirsin.`);
  boardEl.classList.remove('is-shake');
  void boardEl.offsetWidth;
  boardEl.classList.add('is-shake');
  render();
}

function showHint() {
  if (!cur || cur.busy || cur.done) return;
  const expected = cur.p.moves.split(' ')[cur.idx];
  taint('ipucu');
  cur.hintSq = expected.slice(0, 2);
  const p = chess.get(cur.hintSq);
  setStatus(`İpucu: ${cur.hintSq} karesindeki ${p ? NAMES[p.type] : 'taş'} ile oyna.`, 'bad');
  setMsg('İpucu kullandığın için bu bulmaca başarısız sayıldı; yine de çözmeye devam edebilirsin.');
  render();
}

function showSolution() {
  if (!cur || cur.busy || cur.done) return;
  taint('çözüm');
  cur.solutionShown = true;
  const mv = cur.p.moves.split(' ');
  cur.hintSq = null;
  cur.selected = null;
  cur.targets = [];
  cur.busy = true;
  hintBtn.disabled = true;
  solBtn.disabled = true;
  setStatus('Çözüm oynanıyor…');
  const step = () => {
    if (cur.idx >= mv.length) {
      cur.done = true;
      cur.busy = false;
      setStatus('Çözüm gösterildi. Yeni bir bulmacayla devam edebilirsin.', 'bad');
      showThemes();
      finishUi();
      return;
    }
    applyUci(mv[cur.idx]);
    cur.idx += 1;
    render();
    timer = setTimeout(step, 700);
  };
  step();
}

function retry() {
  if (cur) startPuzzle(cur.p, cur.mode);
}

/* ---------- Piyon terfisi penceresi ---------- */
function openPromo(from, to) {
  pendingPromo = { from, to };
  promoList.textContent = '';
  PROMO_ORDER.forEach((t) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'sa-promo-btn is-' + cur.solver;
    b.dataset.piece = t;
    b.innerHTML = `<span class="pic">${svgFor(t)}</span><span>${NAMES[t][0].toUpperCase() + NAMES[t].slice(1)}</span>`;
    b.addEventListener('click', () => {
      const pp = pendingPromo;
      closePromo();
      if (pp) tryMove(pp.from, pp.to, t);
    });
    promoList.appendChild(b);
  });
  promoEl.hidden = false;
  promoList.firstChild.focus();
}
function closePromo() {
  pendingPromo = null;
  promoEl.hidden = true;
}

/* ---------- Olaylar ---------- */
function bindEvents() {
  boardEl.addEventListener('click', (e) => {
    const b = e.target.closest('.sq');
    if (!b) return;
    onSquare(b.dataset.sq, +b.dataset.dom);
  });
  boardEl.addEventListener('keydown', (e) => {
    const b = e.target.closest('.sq');
    if (!b) return;
    let i = +b.dataset.dom;
    let r = Math.floor(i / 8), c = i % 8;
    if (e.key === 'ArrowUp') r = Math.max(0, r - 1);
    else if (e.key === 'ArrowDown') r = Math.min(7, r + 1);
    else if (e.key === 'ArrowLeft') c = Math.max(0, c - 1);
    else if (e.key === 'ArrowRight') c = Math.min(7, c + 1);
    else if (e.key === 'Escape') { if (cur) { cur.selected = null; cur.targets = []; render(); } return; }
    else return;
    e.preventDefault();
    focusIdx = r * 8 + c;
    cells.forEach((el, k) => { el.tabIndex = k === focusIdx ? 0 : -1; });
    cells[focusIdx].focus();
  });
  promoEl.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closePromo(); cells[focusIdx].focus(); }
  });
  nextBtn.addEventListener('click', () => { if (puzzles.length) startPuzzle(pickRandom(), 'free'); });
  dailyBtn.addEventListener('click', () => { if (puzzles.length) startPuzzle(dailyPuzzle(), 'daily'); });
  hintBtn.addEventListener('click', showHint);
  solBtn.addEventListener('click', showSolution);
  retryBtn.addEventListener('click', retry);
  levelEl.addEventListener('change', () => { store.level = levelEl.value; saveStore(); if (puzzles.length) startPuzzle(pickRandom(), 'free'); });
  themeEl.addEventListener('change', () => { store.theme = themeEl.value; saveStore(); if (puzzles.length) startPuzzle(pickRandom(), 'free'); });
  resetBtn.addEventListener('click', () => {
    if (!window.confirm('Derecen ve istatistiklerin silinsin mi? Bu işlem geri alınamaz.')) return;
    store = defaultStore();
    saveStore();
    levelEl.value = store.level;
    themeEl.value = 'hepsi';
    updateStatsView();
    setMsg('Kayıtlar sıfırlandı.');
  });
  if (document.fullscreenEnabled) {
    fsBtn.hidden = false;
    fsBtn.addEventListener('click', () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else boxEl.requestFullscreen().catch(() => {});
    });
    document.addEventListener('fullscreenchange', () => {
      fsBtn.setAttribute('aria-pressed', String(!!document.fullscreenElement));
      fsBtn.textContent = document.fullscreenElement ? 'Tam ekrandan çık' : 'Tam ekran';
    });
  }
}

/* ---------- Başlangıç ---------- */
function fillSelects() {
  levelEl.textContent = '';
  Object.keys(LEVELS).forEach((k) => {
    const o = document.createElement('option');
    o.value = k;
    o.textContent = LEVELS[k].label;
    levelEl.appendChild(o);
  });
  levelEl.value = store.level;
  const counts = {};
  puzzles.forEach((p) => p.themes.split(' ').filter(Boolean).forEach((t) => { counts[t] = (counts[t] || 0) + 1; }));
  themeEl.textContent = '';
  const all = document.createElement('option');
  all.value = 'hepsi';
  all.textContent = 'Tüm temalar';
  themeEl.appendChild(all);
  Object.keys(counts).filter((t) => counts[t] >= 15).sort((a, b) => themeName(a).localeCompare(themeName(b), 'tr')).forEach((t) => {
    const o = document.createElement('option');
    o.value = t;
    o.textContent = `${themeName(t)} (${counts[t]})`;
    themeEl.appendChild(o);
  });
  themeEl.value = [...themeEl.options].some((o) => o.value === store.theme) ? store.theme : 'hepsi';
}

function isValidPuzzle(p) {
  return p && typeof p.id === 'string' && typeof p.fen === 'string' && typeof p.moves === 'string'
    && typeof p.rating === 'number' && typeof p.themes === 'string' && p.moves.split(' ').length >= 2;
}

async function init() {
  buildBoard();
  bindEvents();
  updateStatsView();
  render();
  try {
    const res = await fetch('puzzles.json');
    if (!res.ok) throw new Error('http');
    const data = await res.json();
    puzzles = (Array.isArray(data) ? data : []).filter(isValidPuzzle);
    if (puzzles.length < 10) throw new Error('bos');
  } catch (e) {
    loadEl.hidden = true;
    errEl.hidden = false;
    return;
  }
  puzzles.forEach((p) => byId.set(p.id, p));
  fillSelects();
  loadEl.hidden = true;
  playEl.hidden = false;
  const qid = new URLSearchParams(location.search).get('id');
  if (qid && byId.has(qid)) startPuzzle(byId.get(qid), 'free');
  else startPuzzle(pickRandom(), 'free');
}

init();
