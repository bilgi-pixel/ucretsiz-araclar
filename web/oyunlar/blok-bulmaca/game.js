// Blok Bulmaca: 8×8 tahtaya üçer üçer gelen parçaları yerleştir; dolan satır ve sütunlar aynı anda temizlenir.
// Klasik modda döndürme yok, Kolay modda serbest. Tohumlanabilir üretici (?seed=…) ve isteğe bağlı adil üretim.
// Her şey tarayıcıda çalışır, ağ isteği yoktur; en yüksek skor ve ayarlar yalnızca localStorage'da (ba-oyun-blok-bulmaca).

const $ = (id) => document.getElementById(id);
const KEY = 'ba-oyun-blok-bulmaca';
const N = 8;
const SLOTS = 3;
const LIFT = 28; // dokunmatikte parça parmağın bu kadar üstünde gösterilir (px)
const DRAG_START = 6; // sürükleme eşiği (px)
const COMBO_CAP = 10;
const motionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
const reducedMotion = () => !!(motionQuery && motionQuery.matches);

/* ---------- Parça seti ---------- */
// [kimlik, aile, ağırlık, çizim, ad] — çizimde '#' dolu, '.' boş hücredir. Set döndürmeye göre kapalıdır.
const SHAPE_DEFS = [
  ['dot', 'dot', 2, ['#'], 'Tek kare (1×1)'],
  ['line2h', 'line', 2, ['##'], "Yatay 2'li çubuk"],
  ['line2v', 'line', 2, ['#', '#'], "Dikey 2'li çubuk"],
  ['line3h', 'line', 2, ['###'], "Yatay 3'lü çubuk"],
  ['line3v', 'line', 2, ['#', '#', '#'], "Dikey 3'lü çubuk"],
  ['line4h', 'line', 1.5, ['####'], "Yatay 4'lü çubuk"],
  ['line4v', 'line', 1.5, ['#', '#', '#', '#'], "Dikey 4'lü çubuk"],
  ['line5h', 'line', 1, ['#####'], "Yatay 5'li çubuk"],
  ['line5v', 'line', 1, ['#', '#', '#', '#', '#'], "Dikey 5'li çubuk"],
  ['sq2', 'sq2', 2, ['##', '##'], '2×2 kare'],
  ['sq3', 'sq3', 1, ['###', '###', '###'], '3×3 kare'],
  ['rect23', 'rect', 1, ['###', '###'], '2×3 yatay dikdörtgen'],
  ['rect32', 'rect', 1, ['##', '##', '##'], '3×2 dikey dikdörtgen'],
  ['l3-0', 'l3', 1, ['#.', '##'], "3'lü L, boşluk sağ üstte"],
  ['l3-1', 'l3', 1, ['##', '#.'], "3'lü L, boşluk sağ altta"],
  ['l3-2', 'l3', 1, ['##', '.#'], "3'lü L, boşluk sol altta"],
  ['l3-3', 'l3', 1, ['.#', '##'], "3'lü L, boşluk sol üstte"],
  ['l4-0', 'l4', 0.6, ['#.', '#.', '##'], "4'lü L, dikey, ayak sağ altta"],
  ['l4-1', 'l4', 0.6, ['###', '#..'], "4'lü L, yatay, ayak sol altta"],
  ['l4-2', 'l4', 0.6, ['##', '.#', '.#'], "4'lü L, dikey, ayak sol üstte"],
  ['l4-3', 'l4', 0.6, ['..#', '###'], "4'lü L, yatay, ayak sağ üstte"],
  ['j4-0', 'l4', 0.6, ['.#', '.#', '##'], "4'lü ters L, dikey, ayak sol altta"],
  ['j4-1', 'l4', 0.6, ['#..', '###'], "4'lü ters L, yatay, ayak sol üstte"],
  ['j4-2', 'l4', 0.6, ['##', '#.', '#.'], "4'lü ters L, dikey, ayak sağ üstte"],
  ['j4-3', 'l4', 0.6, ['###', '..#'], "4'lü ters L, yatay, ayak sağ altta"],
  ['t-0', 't', 0.7, ['###', '.#.'], 'T, uç aşağıda'],
  ['t-1', 't', 0.7, ['.#', '##', '.#'], 'T, uç solda'],
  ['t-2', 't', 0.7, ['.#.', '###'], 'T, uç yukarıda'],
  ['t-3', 't', 0.7, ['#.', '##', '#.'], 'T, uç sağda'],
  ['s-h', 'sz', 0.7, ['.##', '##.'], 'Yatay S'],
  ['s-v', 'sz', 0.7, ['#.', '##', '.#'], 'Dikey S'],
  ['z-h', 'sz', 0.7, ['##.', '.##'], 'Yatay Z'],
  ['z-v', 'sz', 0.7, ['.#', '##', '#.'], 'Dikey Z'],
  ['corner-0', 'corner', 0.6, ['#..', '#..', '###'], 'Büyük köşe, köşe sol altta'],
  ['corner-1', 'corner', 0.6, ['###', '#..', '#..'], 'Büyük köşe, köşe sol üstte'],
  ['corner-2', 'corner', 0.6, ['###', '..#', '..#'], 'Büyük köşe, köşe sağ üstte'],
  ['corner-3', 'corner', 0.6, ['..#', '..#', '###'], 'Büyük köşe, köşe sağ altta'],
];
const FAMILY_COLOR = { dot: 0, line: 1, sq2: 2, sq3: 3, rect: 4, l3: 5, l4: 6, t: 7, sz: 8, corner: 9 };

const SHAPES = SHAPE_DEFS.map(([id, family, weight, art, name]) => {
  const cells = [];
  art.forEach((row, r) => [...row].forEach((ch, c) => { if (ch === '#') cells.push([r, c]); }));
  return { id, family, weight, art, name, h: art.length, w: art[0].length, cells, color: FAMILY_COLOR[family], key: art.join('/'), rot: null };
});
const BY_ID = new Map(SHAPES.map((s) => [s.id, s]));
const BY_KEY = new Map(SHAPES.map((s) => [s.key, s]));
// Saat yönünde 90° döndürme: yeni[r][c] = eski[h-1-c][r]
function rotateArt(art) {
  const h = art.length;
  const w = art[0].length;
  const out = [];
  for (let r = 0; r < w; r++) {
    let row = '';
    for (let c = 0; c < h; c++) row += art[h - 1 - c][r];
    out.push(row);
  }
  return out;
}
SHAPES.forEach((s) => { s.rot = BY_KEY.get(rotateArt(s.art).join('/')) || s; });
const TOTAL_WEIGHT = SHAPES.reduce((sum, s) => sum + s.weight, 0);

/* ---------- Tohumlanabilir rastgelelik ---------- */
function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
// "?seed=42" → 42; sayı değilse metin FNV-1a ile sayıya çevrilir; boşsa null (rastgele tohum).
function parseSeed(raw) {
  if (raw == null) return null;
  const s = String(raw).trim().slice(0, 64);
  if (!s) return null;
  if (/^\d{1,10}$/.test(s)) return Number(s) >>> 0;
  let h = 2166136261;
  for (const ch of s) { h ^= ch.codePointAt(0); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function randomSeed() {
  try {
    const a = new Uint32Array(1);
    crypto.getRandomValues(a);
    return a[0] % 1000000000;
  } catch (e) {
    return Math.floor(Math.random() * 1000000000);
  }
}
function readUrlSeed() {
  try { const p = new URLSearchParams(location.search); return p.has('seed') ? parseSeed(p.get('seed')) : null; } catch (e) { return null; }
}
function pickShape(rng, list) {
  const total = list === SHAPES ? TOTAL_WEIGHT : list.reduce((sum, s) => sum + s.weight, 0);
  let x = rng() * total;
  for (const s of list) { x -= s.weight; if (x < 0) return s; }
  return list[list.length - 1];
}

/* ---------- Saf oyun mantığı ---------- */
function canPlace(board, s, r, c) {
  if (r < 0 || c < 0 || r + s.h > N || c + s.w > N) return false;
  for (const [dr, dc] of s.cells) if (board[(r + dr) * N + c + dc]) return false;
  return true;
}
function fitsAnywhere(board, s) {
  for (let r = 0; r + s.h <= N; r++) for (let c = 0; c + s.w <= N; c++) if (canPlace(board, s, r, c)) return true;
  return false;
}
// Kolay modda dört yönden biri sığıyorsa parça "sığar" sayılır
function fitsSomehow(board, s, easy) {
  if (!easy) return fitsAnywhere(board, s);
  let x = s;
  for (let i = 0; i < 4; i++) { if (fitsAnywhere(board, x)) return true; x = x.rot; }
  return false;
}
// Parçayı koyar, dolu satır ve sütunları AYNI ANDA bulup temizler; kesişen hücre bir kez sayılır.
function applyPlacement(board, s, r, c) {
  const b = board.slice();
  for (const [dr, dc] of s.cells) b[(r + dr) * N + c + dc] = s.color + 1;
  const rows = [];
  const cols = [];
  for (let i = 0; i < N; i++) {
    let fullRow = true;
    let fullCol = true;
    for (let j = 0; j < N; j++) {
      if (!b[i * N + j]) fullRow = false;
      if (!b[j * N + i]) fullCol = false;
    }
    if (fullRow) rows.push(i);
    if (fullCol) cols.push(i);
  }
  const cleared = new Map();
  rows.forEach((i) => { for (let j = 0; j < N; j++) cleared.set(i * N + j, b[i * N + j]); });
  cols.forEach((i) => { for (let j = 0; j < N; j++) cleared.set(j * N + i, b[j * N + i]); });
  cleared.forEach((_, k) => { b[k] = 0; });
  return { board: b, rows, cols, cleared };
}
// Puan: yerleşen hücre başına 1 + hat başına 10 × (aynı hamledeki hat sayısı) × kombo çarpanı.
// Kombo: art arda temizleme yapan her hamle sayacı 1 artırır; temizlemeyen hamle sıfırlar.
function scoreMove(placed, lines, comboBefore) {
  if (!lines) return { combo: 0, mult: 0, linePoints: 0, points: placed };
  const combo = comboBefore + 1;
  const mult = Math.min(combo, COMBO_CAP);
  const linePoints = 10 * lines * lines * mult;
  return { combo, mult, linePoints, points: placed + linePoints };
}
function clampCursor(s, r, c) {
  return { r: Math.max(0, Math.min(N - s.h, r)), c: Math.max(0, Math.min(N - s.w, c)) };
}
// Tıklanan/üzerine gelinen hücre parçanın ortasına denk gelsin
function anchorAt(s, r, c) {
  return clampCursor(s, r - Math.floor((s.h - 1) / 2), c - Math.floor((s.w - 1) / 2));
}

/* ---------- Kayıt (bozuk veriye ve kapalı depolamaya karşı korumalı) ---------- */
const clampInt = (v, lo, hi) => (typeof v === 'number' && Number.isFinite(v) ? Math.min(hi, Math.max(lo, Math.round(v))) : lo);
function defaultStore() { return { best: { klasik: 0, kolay: 0 }, games: 0, sound: false, easy: false, fair: true }; }
function loadStore() {
  const s = defaultStore();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return s;
    const o = JSON.parse(raw);
    if (!o || typeof o !== 'object' || Array.isArray(o)) return s;
    if (o.best && typeof o.best === 'object' && !Array.isArray(o.best)) {
      s.best.klasik = clampInt(o.best.klasik, 0, 1e9);
      s.best.kolay = clampInt(o.best.kolay, 0, 1e9);
    }
    s.games = clampInt(o.games, 0, 1e9);
    if (typeof o.sound === 'boolean') s.sound = o.sound;
    if (typeof o.easy === 'boolean') s.easy = o.easy;
    if (typeof o.fair === 'boolean') s.fair = o.fair;
  } catch (e) { /* bozuk kayıt: varsayılana dön */ }
  return s;
}
const store = loadStore();
function saveStore() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* depolama kapalı */ } }

/* ---------- Ses (varsayılan kapalı, WebAudio ile basit ton) ---------- */
let audioCtx = null;
function ensureAudio() {
  if (!store.sound) return null;
  try {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      audioCtx = new AC();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
  } catch (e) { return null; }
  return audioCtx;
}
function tone(freq, ms, type, delay, vol) {
  const ctx = ensureAudio();
  if (!ctx) return;
  try {
    const t0 = ctx.currentTime + (delay || 0);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol || 0.07, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + ms / 1000);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + ms / 1000 + 0.02);
  } catch (e) { /* ses yoksa sessiz devam */ }
}
function sfx(kind) {
  if (!store.sound) return;
  if (kind === 'place') tone(520, 70, 'triangle');
  else if (kind === 'clear') [660, 880, 1100].forEach((f, i) => tone(f, 110, 'triangle', i * 0.07));
  else if (kind === 'bad') tone(150, 140, 'square', 0, 0.04);
  else if (kind === 'over') [440, 330, 220].forEach((f, i) => tone(f, 200, 'sine', i * 0.16));
}

/* ---------- DOM ---------- */
const boxEl = $('oyun');
const boardEl = $('bb-board');
const stageEl = $('bb-stage');
const slotEls = [...document.querySelectorAll('#bb-tray .bb-slot')];
const floatEl = $('bb-float');
const popEl = $('bb-pop');
const overEl = $('bb-over');
const msgEl = $('bb-msg');
const easyEl = $('bb-easy');
const fairEl = $('bb-fair');
const rotateBtn = $('bb-rotate');
const soundBtn = $('bb-sound');
const fsBtn = $('tam-ekran');
const resultEl = $('sonuc');
const againBtn = $('bb-again');
const cellEls = [];
for (let k = 0; k < N * N; k++) {
  const el = document.createElement('div');
  el.className = 'bb-cell';
  el.dataset.r = String(Math.floor(k / N));
  el.dataset.c = String(k % N);
  boardEl.appendChild(el);
  cellEls.push(el);
}

/* ---------- Durum ---------- */
const urlSeed = readUrlSeed();
const game = {
  board: new Array(N * N).fill(0), tray: [null, null, null], score: 0, combo: 0, maxCombo: 0, lines: 0, moves: 0,
  over: false, seed: 0, easy: false, fair: true, rng: null, fairRng: null, generated: [], fixes: 0, last: null, startBest: 0,
};
const view = { selected: -1, cursor: { r: 3, c: 3 }, ghost: false, fx: null };
let fxTimer = 0;
let popTimer = 0;
let drag = null;
let dragEndAt = -1e9;
let boardPointerType = 'mouse';

const modeKey = () => (game.easy ? 'kolay' : 'klasik');
const currentBest = () => store.best[modeKey()] || 0;
const nextSeed = () => (urlSeed != null ? urlSeed : randomSeed());

// Üç yeni parça: ana akış her zaman üç parça çeker (aynı tohum = aynı dizi).
// Adil üretim açıkken hiçbiri sığmıyorsa ayrı bir akıştan sığan bir parça biri yerine konur.
function refill() {
  const pieces = [];
  for (let i = 0; i < SLOTS; i++) {
    const s = pickShape(game.rng, SHAPES);
    pieces.push(s);
    game.generated.push(s.id);
  }
  if (game.fair && !pieces.some((s) => fitsSomehow(game.board, s, game.easy))) {
    const ok = SHAPES.filter((s) => fitsSomehow(game.board, s, game.easy));
    if (ok.length) {
      pieces[Math.floor(game.fairRng() * SLOTS)] = pickShape(game.fairRng, ok);
      game.fixes += 1;
    }
  }
  game.tray = pieces;
}
function isStuck() {
  const left = game.tray.filter(Boolean);
  return left.length > 0 && !left.some((s) => fitsSomehow(game.board, s, game.easy));
}

function newGame(seed) {
  game.seed = seed >>> 0;
  game.rng = mulberry32(game.seed);
  game.fairRng = mulberry32((game.seed ^ 0x9e3779b9) >>> 0);
  game.board = new Array(N * N).fill(0);
  Object.assign(game, { score: 0, combo: 0, maxCombo: 0, lines: 0, moves: 0, over: false, generated: [], fixes: 0, last: null });
  game.easy = easyEl.checked;
  game.fair = fairEl.checked;
  game.startBest = currentBest();
  view.selected = -1;
  view.ghost = false;
  view.fx = null;
  clearTimeout(fxTimer);
  refill();
  resultEl.hidden = true;
  resultEl.classList.remove('is-active');
  $('bb-seed').textContent = String(game.seed);
  render();
  setMsg('Yeni oyun başladı. Parçayı tahtaya sürükleyin ya da 1, 2, 3 tuşlarıyla seçip oklarla taşıyın.');
}

/* ---------- Yerleştirme ---------- */
function tryPlace(slot, r, c, source) {
  if (game.over) return { ok: false, reason: 'over' };
  const s = game.tray[slot];
  if (!s) return { ok: false, reason: 'empty' };
  if (!canPlace(game.board, s, r, c)) {
    sfx('bad');
    shake(slot);
    setMsg(r < 0 || c < 0 || r + s.h > N || c + s.w > N
      ? 'Parça tahtanın dışına taşıyor; tamamı tahtanın içinde kalacak biçimde bırakın.'
      : 'Bu parça oraya sığmıyor: dolu hücrelerle çakışıyor. Kırmızı olmayan, boş bir alan seçin.');
    return { ok: false, reason: 'blocked' };
  }
  const res = applyPlacement(game.board, s, r, c);
  const lines = res.rows.length + res.cols.length;
  const sc = scoreMove(s.cells.length, lines, game.combo);
  game.board = res.board;
  game.combo = sc.combo;
  game.maxCombo = Math.max(game.maxCombo, sc.combo);
  game.score += sc.points;
  game.lines += lines;
  game.moves += 1;
  game.tray[slot] = null;
  game.last = { id: s.id, slot, r, c, placed: s.cells.length, rows: res.rows, cols: res.cols, lines, cleared: res.cleared.size, combo: sc.combo, mult: sc.mult, points: sc.points };
  view.selected = -1;
  view.ghost = false;
  let refilled = false;
  if (game.tray.every((x) => !x)) { refill(); refilled = true; }
  // canlı en yüksek skor
  const key = modeKey();
  if (game.score > (store.best[key] || 0)) { store.best[key] = game.score; saveStore(); }
  // görsel efektler (hareket azaltma açıksa yok)
  clearTimeout(fxTimer);
  if (reducedMotion()) view.fx = null;
  else {
    view.fx = { placed: new Set(s.cells.map(([dr, dc]) => (r + dr) * N + c + dc)), clearing: res.cleared };
    fxTimer = setTimeout(() => { view.fx = null; render(); }, 360);
  }
  const over = isStuck();
  render();
  if (lines) {
    sfx('clear');
    showPop(`+${sc.points}` + (sc.mult > 1 ? ` · Kombo ×${sc.mult}` : ''));
  } else sfx('place');
  let msg = `Yerleştirildi: +${sc.points} puan.`;
  if (lines) msg += ` ${lines} hat temizlendi (${res.rows.length} satır, ${res.cols.length} sütun)${sc.mult > 1 ? `, kombo ×${sc.mult}` : ''}.`;
  if (refilled) msg += ' Yeni üç parça geldi.';
  setMsg(msg);
  if (over) endGame();
  else if (source === 'key') focusNextSlot(slot);
  return { ok: true, ...game.last };
}

function focusNextSlot(from) {
  for (let k = 1; k <= SLOTS; k++) {
    const i = (from + k) % SLOTS;
    if (game.tray[i]) {
      // Yerleştirme sonucunu ezmeden sıradaki parçayı seç; durum satırına ekle
      const result = msgEl.textContent;
      slotEls[i].focus({ preventScroll: true });
      selectSlot(i, false);
      setMsg(`${result} Sıradaki: parça ${i + 1} seçildi (${game.tray[i].name}).`);
      return;
    }
  }
}

function endGame() {
  game.over = true;
  view.selected = -1;
  view.ghost = false;
  const key = modeKey();
  const record = game.score > game.startBest && game.score > 0;
  store.best[key] = Math.max(store.best[key] || 0, game.score);
  store.games += 1;
  saveStore();
  $('sonuc-puan').textContent = String(game.score);
  $('sonuc-en-yuksek').textContent = String(store.best[key]);
  $('sonuc-mod').textContent = game.easy ? 'Kolay mod' : 'Klasik mod';
  $('sonuc-rekor').hidden = !record;
  $('sonuc-ozet').textContent = `${game.moves} parça yerleştirdiniz, ${game.lines} hat temizlediniz; ${game.maxCombo > 0 ? `en uzun kombo ×${Math.min(game.maxCombo, COMBO_CAP)}` : 'kombo yapılmadı'}.`;
  $('sonuc-tohum').textContent = String(game.seed);
  resultEl.hidden = false;
  resultEl.classList.add('is-active');
  sfx('over');
  render();
  setMsg(`Oyun bitti: kalan parçaların hiçbiri tahtaya sığmıyor. Puanınız ${game.score}.`);
  againBtn.focus({ preventScroll: true });
  againBtn.scrollIntoView({ block: 'nearest', behavior: reducedMotion() ? 'auto' : 'smooth' });
}

/* ---------- Seçim, imleç, döndürme ---------- */
function selectSlot(i, announce) {
  const s = game.tray[i];
  if (!s || game.over) return;
  view.selected = i;
  view.ghost = true;
  view.cursor = clampCursor(s, view.cursor.r, view.cursor.c);
  render();
  if (announce) announcePos(`Parça ${i + 1} seçildi: ${s.name}.`);
}
function deselect(text) {
  view.selected = -1;
  view.ghost = false;
  render();
  if (text) setMsg(text);
}
function rotateSelected() {
  if (!game.easy || view.selected < 0 || game.over) return;
  const s = game.tray[view.selected].rot;
  game.tray[view.selected] = s;
  view.cursor = clampCursor(s, view.cursor.r, view.cursor.c);
  view.ghost = true;
  render();
  announcePos(`Döndürüldü: ${s.name}.`);
}
function announcePos(prefix) {
  const s = game.tray[view.selected];
  if (!s) return;
  const { r, c } = view.cursor;
  const ok = canPlace(game.board, s, r, c);
  setMsg(`${prefix ? prefix + ' ' : ''}Konum: satır ${r + 1}, sütun ${c + 1} – ${ok ? 'buraya sığar, Enter ile yerleştirin' : 'dolu hücrelerle çakışıyor'}.`);
}
function setMsg(text) { msgEl.textContent = text; }

/* ---------- Çizim ---------- */
function ghostInfo() {
  if (!view.ghost || view.selected < 0 || game.over) return null;
  const s = game.tray[view.selected];
  if (!s) return null;
  const { r, c } = view.cursor;
  const cells = new Set();
  for (const [dr, dc] of s.cells) {
    const rr = r + dr;
    const cc = c + dc;
    if (rr >= 0 && rr < N && cc >= 0 && cc < N) cells.add(rr * N + cc);
  }
  const valid = canPlace(game.board, s, r, c);
  const lineCells = valid ? applyPlacement(game.board, s, r, c).cleared : new Map();
  return { cells, valid, lineCells, color: s.color };
}

function buildMini(s, cls) {
  const g = document.createElement('span');
  g.className = cls;
  g.style.setProperty('--w', String(s.w));
  g.style.setProperty('--h', String(s.h));
  g.setAttribute('aria-hidden', 'true');
  for (const row of s.art) {
    for (const ch of row) {
      const i = document.createElement('i');
      if (ch === '#') i.className = 'on c' + s.color;
      g.appendChild(i);
    }
  }
  return g;
}

function render() {
  const g = ghostInfo();
  let filled = 0;
  for (let k = 0; k < N * N; k++) {
    const v = game.board[k];
    if (v) filled += 1;
    let cls = 'bb-cell';
    if (v) cls += ' is-filled c' + (v - 1);
    if (view.fx) {
      if (!v && view.fx.clearing.has(k)) cls += ' is-clearing c' + (view.fx.clearing.get(k) - 1);
      if (v && view.fx.placed.has(k)) cls += ' is-new';
    }
    if (g && g.cells.has(k)) cls += g.valid ? ' is-ghost c' + g.color : ' is-bad';
    if (g && g.lineCells.has(k)) cls += ' is-line';
    if (cellEls[k].className !== cls) cellEls[k].className = cls;
  }
  boardEl.setAttribute('aria-label', `Oyun tahtası, 8 satır 8 sütun; ${filled} hücre dolu.`);
  slotEls.forEach((btn, i) => {
    const s = game.tray[i];
    const id = s ? s.id : '';
    if (btn.dataset.piece !== id) {
      btn.textContent = '';
      if (s) btn.appendChild(buildMini(s, 'bb-mini'));
      btn.dataset.piece = id;
    }
    const stuck = !!s && !game.over && !fitsSomehow(game.board, s, game.easy);
    btn.disabled = !s || game.over;
    btn.setAttribute('aria-pressed', String(view.selected === i));
    btn.classList.toggle('is-stuck', stuck);
    btn.classList.toggle('is-dragging', !!drag && drag.moved && drag.slot === i);
    btn.setAttribute('aria-label', s
      ? `Parça ${i + 1}: ${s.name}, ${s.h} satır × ${s.w} sütun, ${s.cells.length} hücre${stuck ? '; şu an hiçbir yere sığmıyor' : ''}`
      : `Parça ${i + 1}: kullanıldı`);
  });
  $('bb-score').textContent = String(game.score);
  $('bb-best').textContent = String(Math.max(currentBest(), game.score));
  $('bb-combo').textContent = game.combo > 0 ? `×${Math.min(game.combo, COMBO_CAP)}` : '–';
  boxEl.dataset.phase = game.over ? 'bitti' : 'oyun';
  overEl.hidden = !game.over;
  rotateBtn.hidden = !game.easy;
  rotateBtn.disabled = view.selected < 0 || game.over;
}

function showPop(text) {
  popEl.textContent = text;
  popEl.hidden = false;
  popEl.classList.remove('is-anim');
  void popEl.offsetWidth; // animasyonu yeniden başlat
  if (!reducedMotion()) popEl.classList.add('is-anim');
  clearTimeout(popTimer);
  popTimer = setTimeout(() => { popEl.hidden = true; }, 950);
}
function shake(slot) {
  const el = slotEls[slot];
  if (!el || reducedMotion()) return;
  el.classList.remove('is-shake');
  void el.offsetWidth;
  el.classList.add('is-shake');
  setTimeout(() => el.classList.remove('is-shake'), 320);
}

/* ---------- Sürükle-bırak (Pointer Events) ---------- */
function boardMetrics() {
  const a = cellEls[0].getBoundingClientRect();
  const b = cellEls[1].getBoundingClientRect();
  const pitch = b.left - a.left;
  return { left: a.left, top: a.top, size: a.width, pitch, gap: pitch - a.width };
}
function showFloat(s, m) {
  floatEl.textContent = '';
  const mini = buildMini(s, 'bb-mini bb-float-grid');
  mini.style.setProperty('--t', m.size + 'px');
  mini.style.setProperty('--gap', m.gap + 'px');
  floatEl.appendChild(mini);
  floatEl.hidden = false;
}
function hideFloat() { floatEl.hidden = true; floatEl.textContent = ''; }
function positionFloat(x, y) {
  const br = boxEl.getBoundingClientRect();
  const left = x - br.left - boxEl.clientLeft + boxEl.scrollLeft;
  const top = y - br.top - boxEl.clientTop + boxEl.scrollTop;
  floatEl.style.transform = `translate(${Math.round(left)}px, ${Math.round(top)}px)`;
}
function dragTo(x, y) {
  const s = game.tray[drag.slot];
  const m = (drag.m = boardMetrics());
  const wPx = s.w * m.pitch - m.gap;
  const hPx = s.h * m.pitch - m.gap;
  let fx;
  let fy;
  if (drag.type === 'touch') { fx = x - wPx / 2; fy = y - hPx - LIFT; } else { fx = x - drag.relX * wPx; fy = y - drag.relY * hPx; }
  positionFloat(fx, fy);
  const c = Math.round((fx - m.left) / m.pitch);
  const r = Math.round((fy - m.top) / m.pitch);
  // Bir hücreden fazla taşarsa önizleme yok; az taşarsa kenara yaslanır
  if (r < -1 || c < -1 || r + s.h > N + 1 || c + s.w > N + 1) view.ghost = false;
  else { view.cursor = clampCursor(s, r, c); view.ghost = true; }
  render();
}
function onSlotDown(e) {
  dragEndAt = -1e9; // yeni dokunuş/tıklama: önceki sürüklemenin tıklama bastırması bunu yutmasın
  const btn = e.currentTarget;
  const i = Number(btn.dataset.slot);
  if (game.over || !game.tray[i] || drag) return;
  if (e.pointerType === 'mouse' && e.button !== 0) return;
  const mini = btn.querySelector('.bb-mini');
  const pr = (mini || btn).getBoundingClientRect();
  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  drag = {
    slot: i, pid: e.pointerId, x0: e.clientX, y0: e.clientY, type: e.pointerType, moved: false, m: null,
    relX: clamp01((e.clientX - pr.left) / (pr.width || 1)), relY: clamp01((e.clientY - pr.top) / (pr.height || 1)),
  };
  try { btn.setPointerCapture(e.pointerId); } catch (err) { /* yakalama desteklenmiyor */ }
}
function onSlotMove(e) {
  if (!drag || e.pointerId !== drag.pid) return;
  if (!drag.moved) {
    if (Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) < DRAG_START) return;
    drag.moved = true;
    drag.m = boardMetrics();
    view.selected = drag.slot;
    showFloat(game.tray[drag.slot], drag.m);
  }
  e.preventDefault();
  dragTo(e.clientX, e.clientY);
}
function onSlotUp(e) {
  if (!drag || e.pointerId !== drag.pid) return;
  const d = drag;
  drag = null;
  hideFloat();
  if (!d.moved) { render(); return; } // basit tıklama: seçimi click olayı yapar
  dragEndAt = performance.now();
  if (view.ghost) {
    const res = tryPlace(d.slot, view.cursor.r, view.cursor.c, 'pointer');
    if (!res.ok) deselect();
  } else {
    deselect('Parça tahtanın dışına bırakıldı; yeniden sürükleyip tahtanın üzerine bırakın.');
  }
}
function onSlotCancel(e) {
  if (!drag || e.pointerId !== drag.pid) return;
  drag = null;
  hideFloat();
  deselect();
}

/* ---------- Olaylar ---------- */
slotEls.forEach((btn, i) => {
  btn.addEventListener('pointerdown', onSlotDown);
  btn.addEventListener('pointermove', onSlotMove);
  btn.addEventListener('pointerup', onSlotUp);
  btn.addEventListener('pointercancel', onSlotCancel);
  btn.addEventListener('lostpointercapture', (e) => { if (drag && drag.pid === e.pointerId) { drag = null; hideFloat(); deselect(); } });
  btn.addEventListener('click', (e) => {
    if (performance.now() - dragEndAt < 350) return; // sürüklemenin ardından gelen tıklama
    if (!game.tray[i] || game.over) return;
    if (e.detail > 0 && view.selected === i) { deselect('Seçim kaldırıldı.'); return; }
    selectSlot(i, true);
  });
  // Tab ile parçaya gelmek parçayı seçer (yalnızca klavye odağında)
  btn.addEventListener('focus', () => {
    let kb = false;
    try { kb = btn.matches(':focus-visible'); } catch (err) { kb = false; }
    if (kb && !drag && game.tray[i] && !game.over && view.selected !== i) selectSlot(i, true);
  });
});

boardEl.addEventListener('pointerdown', (e) => { boardPointerType = e.pointerType || 'mouse'; });
boardEl.addEventListener('pointermove', (e) => {
  if (drag || view.selected < 0 || game.over || e.pointerType !== 'mouse') return;
  const cell = e.target.closest('.bb-cell');
  const s = game.tray[view.selected];
  if (!cell || !s) return;
  const next = anchorAt(s, Number(cell.dataset.r), Number(cell.dataset.c));
  if (!view.ghost || next.r !== view.cursor.r || next.c !== view.cursor.c) { view.cursor = next; view.ghost = true; render(); }
});
boardEl.addEventListener('click', (e) => {
  if (game.over) return;
  const s = view.selected >= 0 ? game.tray[view.selected] : null;
  if (!s) { setMsg('Önce aşağıdan bir parça seçin ya da parçayı tahtaya sürükleyin.'); return; }
  const cell = e.target.closest('.bb-cell');
  if (!cell) return;
  const next = anchorAt(s, Number(cell.dataset.r), Number(cell.dataset.c));
  if (boardPointerType !== 'mouse' && (!view.ghost || next.r !== view.cursor.r || next.c !== view.cursor.c)) {
    view.cursor = next;
    view.ghost = true;
    render();
    announcePos('Önizleme. Yerleştirmek için aynı yere tekrar dokunun.');
    return;
  }
  view.cursor = next;
  tryPlace(view.selected, next.r, next.c, 'pointer');
});

const ARROWS = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return;
  const t = e.target instanceof Element ? e.target : null;
  if (t && t.closest('input, select, textarea, [contenteditable="true"]')) return;
  const inGame = !t || t === document.body || t === document.documentElement || boxEl.contains(t);
  if (!inGame) return;
  const k = e.key;
  if (k === '1' || k === '2' || k === '3') {
    const i = Number(k) - 1;
    if (game.over) return;
    e.preventDefault();
    if (!game.tray[i]) { setMsg(`Parça ${i + 1} bu turda kullanıldı; kalan parçalardan birini seçin.`); return; }
    slotEls[i].focus({ preventScroll: true });
    selectSlot(i, true);
    return;
  }
  if (k === 'Escape') {
    if (view.selected >= 0) { e.preventDefault(); deselect('Seçim iptal edildi.'); }
    return;
  }
  if (view.selected < 0 || game.over) return;
  if (k === 'r' || k === 'R') {
    if (game.easy) { e.preventDefault(); rotateSelected(); } else setMsg('Klasik modda döndürme yok; döndürmek için Kolay modu açın.');
    return;
  }
  if (ARROWS[k]) {
    e.preventDefault();
    const s = game.tray[view.selected];
    view.cursor = clampCursor(s, view.cursor.r + ARROWS[k][0], view.cursor.c + ARROWS[k][1]);
    view.ghost = true;
    render();
    announcePos('');
    return;
  }
  if (k === 'Enter') {
    const slotBtn = t ? t.closest('.bb-slot') : null;
    if (slotBtn && Number(slotBtn.dataset.slot) !== view.selected) return; // başka parçanın düğmesi: onu seçsin
    if (!slotBtn && t && t !== document.body && t.closest('button, a, summary')) return; // diğer düğmeler normal çalışsın
    e.preventDefault();
    tryPlace(view.selected, view.cursor.r, view.cursor.c, 'key');
  }
});

function onSettingChange() {
  store.easy = easyEl.checked;
  store.fair = fairEl.checked;
  saveStore();
  if (game.moves === 0 && !game.over) {
    newGame(game.seed);
    setMsg(`Ayar uygulandı: ${easyEl.checked ? 'Kolay mod (R ile döndürme)' : 'Klasik mod (döndürme yok)'}, adil üretim ${fairEl.checked ? 'açık' : 'kapalı'}.`);
  } else {
    setMsg('Ayar kaydedildi; bir sonraki oyunda geçerli olur. Hemen denemek için "Yeni oyun" düğmesine basın.');
  }
}
easyEl.addEventListener('change', onSettingChange);
fairEl.addEventListener('change', onSettingChange);
rotateBtn.addEventListener('click', rotateSelected);
$('bb-new').addEventListener('click', () => newGame(nextSeed()));
againBtn.addEventListener('click', () => newGame(nextSeed()));
$('bb-same').addEventListener('click', () => newGame(game.seed));

function paintSound() {
  soundBtn.setAttribute('aria-pressed', String(store.sound));
  soundBtn.textContent = store.sound ? 'Ses: açık' : 'Ses: kapalı';
}
soundBtn.addEventListener('click', () => {
  store.sound = !store.sound;
  saveStore();
  paintSound();
  if (store.sound) tone(660, 90, 'triangle');
});

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

/* ---------- Başlangıç ---------- */
easyEl.checked = store.easy;
fairEl.checked = store.fair;
paintSound();
newGame(nextSeed());
if (urlSeed != null) setMsg(`Sabit oyun numarasıyla (${urlSeed}) başladı: her yeni oyun aynı parça dizisiyle açılır.`);

/* ---------- Test ve hata ayıklama kancası ----------
   Gizli bilgi taşımaz: tahtayı ve parçaları okur/yazar. Çağrı: window.__blokBulmacaTest() → anlık durum. */
function snapshot() {
  const rows = [];
  for (let r = 0; r < N; r++) {
    let row = '';
    for (let c = 0; c < N; c++) row += game.board[r * N + c] ? '#' : '.';
    rows.push(row);
  }
  return {
    board: rows, tray: game.tray.map((s) => (s ? s.id : null)), score: game.score, best: currentBest(), combo: game.combo,
    moves: game.moves, lines: game.lines, over: game.over, seed: game.seed, easy: game.easy, fair: game.fair, fixes: game.fixes,
    selected: view.selected, cursor: { ...view.cursor }, ghost: view.ghost, last: game.last ? { ...game.last } : null,
    generated: game.generated.slice(),
  };
}
window.__blokBulmacaTest = Object.assign(() => snapshot(), {
  newGame(opts = {}) {
    if (typeof opts.easy === 'boolean') easyEl.checked = opts.easy;
    if (typeof opts.fair === 'boolean') fairEl.checked = opts.fair;
    newGame(opts.seed != null ? parseSeed(opts.seed) ?? 0 : nextSeed());
    return snapshot();
  },
  // rows: 8 satırlık dizi; '#' ya da 1-9 dolu, '.' boş. Hat temizliği yapılmaz.
  setBoard(rows) {
    if (!Array.isArray(rows) || rows.length !== N || rows.some((x) => typeof x !== 'string' || x.length !== N)) throw new Error('8×8 tahta bekleniyor');
    game.board = rows.join('').split('').map((ch) => (ch === '.' ? 0 : /[1-9]/.test(ch) ? Math.min(10, Number(ch)) : 1));
    view.selected = -1;
    view.ghost = false;
    render();
    return snapshot();
  },
  // ids: 3 elemanlı dizi (parça kimliği ya da null). Ardından oyun sonu denetlenir.
  setTray(ids) {
    game.tray = [0, 1, 2].map((i) => (ids && ids[i] && BY_ID.get(ids[i])) || null);
    if (game.tray.every((x) => !x)) refill();
    view.selected = -1;
    view.ghost = false;
    render();
    if (!game.over && isStuck()) endGame();
    return snapshot();
  },
  place(slot, r, c) { const res = tryPlace(slot, r, c, 'test'); return { ...res, state: snapshot() }; },
  shapes() { return SHAPES.map((s) => ({ id: s.id, family: s.family, weight: s.weight, h: s.h, w: s.w, cells: s.cells.length, rot: s.rot.id, art: s.art.slice() })); },
});
