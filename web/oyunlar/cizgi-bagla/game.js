// Çizgi Bağla — aynı renkli uç noktalarını kesişmeyen yollarla birleştirip ızgaranın tamamını doldurma
// bulmacası. DOM + SVG tabanlı; dış kütüphane ve ağ isteği yok. Bulmacalar bulmacalar.js, tek çözüm
// denetimi cozucu.js içindedir. İlerleme yalnızca bu tarayıcının localStorage alanında durur.
import { BULMACALAR } from './bulmacalar.js';
import { decodePuzzle, areAdjacent } from './cozucu.js';

const STORE_KEY = 'ba-oyun-cizgi-bagla';
const SIZES = [5, 6, 7, 8, 9];
const UNDO_MAX = 60;
const SVG_NS = 'http://www.w3.org/2000/svg';

// Renkler: koyu ve açık temada ayırt edilebilir; uçlarda ayrıca harf yazar (renk körlüğü için).
// Harf/zemin kontrastı her renkte en az 4.5:1 (küçük ızgarada harf ~12px). Açık renkli nokta ve yolların
// zeminden ayrılması için CSS'te ince bir kontur (cb-dot, cb-case) çizilir.
const COLORS = [
  { name: 'Kırmızı', hex: '#dc2626', ink: '#ffffff' },
  { name: 'Mavi', hex: '#2563eb', ink: '#ffffff' },
  { name: 'Yeşil', hex: '#16a34a', ink: '#1e2126' },
  { name: 'Sarı', hex: '#eab308', ink: '#1e2126' },
  { name: 'Turuncu', hex: '#f97316', ink: '#1e2126' },
  { name: 'Camgöbeği', hex: '#06b6d4', ink: '#1e2126' },
  { name: 'Eflatun', hex: '#c026d3', ink: '#ffffff' },
  { name: 'Kahverengi', hex: '#8b4513', ink: '#ffffff' },
  { name: 'Mor', hex: '#7c3aed', ink: '#ffffff' },
  { name: 'Fıstık yeşili', hex: '#84cc16', ink: '#1e2126' },
  { name: 'Pembe', hex: '#f472b6', ink: '#1e2126' },
  { name: 'Gri', hex: '#64748b', ink: '#ffffff' },
];
const LETTERS = 'ABCDEFGHIJKL';
const colorLabel = (c) => `${COLORS[c].name} (${LETTERS[c]})`;

// Seviye listesi: boyut içinde 1'den başlayan numara; kimlik "boyut-numara"
const LEVELS = [];
{
  const perSize = {};
  for (const raw of BULMACALAR) {
    perSize[raw.n] = (perSize[raw.n] || 0) + 1;
    LEVELS.push({ id: `${raw.n}-${perSize[raw.n]}`, n: raw.n, no: perSize[raw.n], raw });
  }
}
const levelIndex = (id) => LEVELS.findIndex((l) => l.id === id);

const $ = (id) => document.getElementById(id);
const box = $('game-box');
const wrap = $('board-wrap');
const board = $('board');
const svg = $('board-svg');
const grid = $('board-grid');
const elMsg = $('msg');
const elLevel = $('st-level');
const elFlows = $('st-flows');
const elFill = $('st-fill');
const elMoves = $('st-moves');
const result = $('result');
const resultTitle = $('result-title');
const resultText = $('result-text');
const btnNext = $('btn-next');
const btnHint = $('btn-hint');
const btnUndo = $('btn-undo');
const btnReset = $('btn-reset');
const btnPrev = $('btn-prev');
const btnFwd = $('btn-fwd');
const btnFull = $('btn-full');
const selSize = $('opt-size');
const levelGrid = $('levels');
const elProgress = $('progress-text');

/* ---------- Kalıcı veri (yalnızca localStorage) ---------- */

const toInt = (v, min, max, def) => (Number.isInteger(v) && v >= min && v <= max ? v : def);

function defaultStore() {
  return { cur: LEVELS[0].id, solved: {}, game: null };
}

function loadStore() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return defaultStore();
    const out = defaultStore();
    if (typeof raw.cur === 'string' && levelIndex(raw.cur) >= 0) out.cur = raw.cur;
    if (raw.solved && typeof raw.solved === 'object' && !Array.isArray(raw.solved)) {
      for (const L of LEVELS) {
        const s = raw.solved[L.id];
        if (s && typeof s === 'object') out.solved[L.id] = { m: toInt(s.m, 0, 9999, 0), h: toInt(s.h, 0, 99, 0) };
      }
    }
    if (raw.game && typeof raw.game === 'object' && !Array.isArray(raw.game)) out.game = raw.game;
    return out;
  } catch (_) {
    return defaultStore(); // bozuk kayıt ya da kapalı depolama: oyun yine çalışır
  }
}
const store = loadStore();
function saveStore() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (_) { /* özel gezinme modu */ }
}

/* ---------- Oyun durumu ---------- */

// g: { li, id, n, N, K, sol, pairs, endAt, paths, moves, hints, hinted, lastColor, phase, undo }
// phase: oynuyor | bitti
let g = null;
let stroke = null; // { c, base, source: 'pointer' | 'key' }
let pointerId = null;
let cursor = 0;
let cellEls = [];

const snapshot = () => g.paths.map((p) => p.slice());
const samePaths = (a, b) => a.length === b.length && a.every((p, i) => p.length === b[i].length && p.every((x, k) => x === b[i][k]));

function isConnected(c) {
  const p = g.paths[c];
  return p.length >= 2 && g.endAt[p[0]] === c && g.endAt[p[p.length - 1]] === c;
}

function ownerArray() {
  const own = new Int16Array(g.N).fill(-1);
  for (let c = 0; c < g.K; c++) for (const x of g.paths[c]) own[x] = c;
  for (let i = 0; i < g.N; i++) if (g.endAt[i] >= 0) own[i] = g.endAt[i];
  return own;
}

// Doluluk: uç noktası olmayan hücrelerin yüzde kaçı bir yolla kaplı
function stats() {
  let connected = 0;
  for (let c = 0; c < g.K; c++) if (isConnected(c)) connected++;
  let covered = 0;
  for (let c = 0; c < g.K; c++) {
    if (g.paths[c].length < 2) continue;
    for (const x of g.paths[c]) if (g.endAt[x] < 0) covered++;
  }
  const inner = g.N - 2 * g.K;
  const fill = inner ? Math.floor((covered * 100) / inner) : 100;
  return { connected, covered, inner, fill, empty: inner - covered };
}

function makeGame(li) {
  const L = LEVELS[li];
  const P = decodePuzzle(L.raw);
  const N = P.n * P.n;
  const endAt = new Int16Array(N).fill(-1);
  P.pairs.forEach(([a, b], c) => { endAt[a] = c; endAt[b] = c; });
  return {
    li, id: L.id, n: P.n, N, K: P.pairs.length, sol: P.paths, pairs: P.pairs, endAt,
    paths: P.pairs.map(() => []), moves: 0, hints: 0, hinted: new Set(), lastColor: -1, phase: 'oynuyor', undo: [],
  };
}

// Kayıtlı yolları doğrular: her yol kendi ucundan başlar, adımlar komşu, hücreler çakışmaz
function validSavedPaths(sp) {
  if (!Array.isArray(sp) || sp.length !== g.K) return null;
  const used = new Uint8Array(g.N);
  const out = [];
  for (let c = 0; c < g.K; c++) {
    const p = sp[c];
    if (!Array.isArray(p) || p.length > g.N) return null;
    if (!p.length) { out.push([]); continue; }
    for (let k = 0; k < p.length; k++) {
      const x = p[k];
      if (!Number.isInteger(x) || x < 0 || x >= g.N || used[x]) return null;
      used[x] = 1;
      if (k === 0 && g.endAt[x] !== c) return null;
      if (k > 0) {
        if (!areAdjacent(g.n, p[k - 1], x)) return null;
        if (g.endAt[x] >= 0 && (g.endAt[x] !== c || k !== p.length - 1)) return null;
      }
    }
    out.push(p.slice());
  }
  return out;
}

function loadLevel(li, { restore = false } = {}) {
  if (stroke) endStroke(true);
  g = makeGame(li);
  let restored = false;
  const sg = store.game;
  if (restore && sg && sg.id === g.id) {
    const paths = validSavedPaths(sg.paths);
    if (paths) {
      g.paths = paths;
      g.moves = toInt(sg.moves, 0, 9999, 0);
      g.hints = toInt(sg.hints, 0, 99, 0);
      if (Array.isArray(sg.hinted)) for (const c of sg.hinted) if (Number.isInteger(c) && c >= 0 && c < g.K) g.hinted.add(c);
      const s = stats();
      if (s.connected === g.K && s.empty === 0) g.paths = g.pairs.map(() => []); // kayıt zaten çözülmüş: temiz başla
      else restored = g.paths.some((p) => p.length > 1);
    }
  }
  store.cur = g.id;
  mountBoard();
  syncLevelUi();
  const L = LEVELS[li];
  showMsg(restored
    ? `Kayıtlı ilerlemeniz yüklendi: ${L.n}×${L.n}, seviye ${L.no}. Kaldığınız yerden devam edin.`
    : `${L.n}×${L.n}, seviye ${L.no}: ${g.K} renk çiftini birleştirin ve ızgaranın tamamını doldurun.`);
  persist();
}

/* ---------- Tahta kurulumu ---------- */

function svgEl(tag, attrs) {
  const e = document.createElementNS(SVG_NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  return e;
}

let layerTint = null;
let layerLines = null;
let endEls = [];

function mountBoard() {
  const n = g.n;
  board.style.setProperty('--n', String(n));
  board.classList.remove('won');
  result.hidden = true;

  // SVG katmanları: ızgara çizgileri, renk dolgusu, yollar, uç noktaları
  svg.textContent = '';
  svg.setAttribute('viewBox', `0 0 ${n} ${n}`);
  let d = '';
  for (let k = 1; k < n; k++) d += `M${k} 0V${n}M0 ${k}H${n}`;
  svg.appendChild(svgEl('path', { d, class: 'cb-gridline', 'vector-effect': 'non-scaling-stroke' }));
  layerTint = svgEl('g', { class: 'cb-tint' });
  layerLines = svgEl('g', { class: 'cb-lines' });
  const layerEnds = svgEl('g', { class: 'cb-ends' });
  svg.append(layerTint, layerLines, layerEnds);
  endEls = [];
  g.pairs.forEach((pair, c) => {
    for (const x of pair) {
      const cx = (x % n) + 0.5;
      const cy = Math.floor(x / n) + 0.5;
      const grp = svgEl('g', { 'data-c': String(c) });
      const halo = svgEl('circle', { cx, cy, r: 0.46, fill: COLORS[c].hex, class: 'cb-halo' });
      const dot = svgEl('circle', { cx, cy, r: 0.34, fill: COLORS[c].hex, class: 'cb-dot' });
      const txt = svgEl('text', { x: cx, y: cy, fill: COLORS[c].ink, class: 'cb-letter', 'font-size': '0.36', 'text-anchor': 'middle', 'dominant-baseline': 'central' });
      txt.textContent = LETTERS[c];
      grp.append(halo, dot, txt);
      layerEnds.appendChild(grp);
      endEls.push({ c, grp });
    }
  });

  // Etkileşim katmanı: her hücre klavyeyle odaklanabilir (gezici tabindex)
  grid.textContent = '';
  cellEls = [];
  for (let r = 0; r < n; r++) {
    const row = document.createElement('div');
    row.className = 'cb-row';
    row.setAttribute('role', 'row');
    for (let c = 0; c < n; c++) {
      const i = r * n + c;
      const cell = document.createElement('div');
      cell.className = 'cb-cell';
      cell.setAttribute('role', 'gridcell');
      cell.dataset.i = String(i);
      cell.dataset.r = String(r);
      cell.dataset.c = String(c);
      cell.tabIndex = -1;
      row.appendChild(cell);
      cellEls.push(cell);
    }
    grid.appendChild(row);
  }
  grid.setAttribute('aria-label', `${n} satır ${n} sütunlu Çizgi Bağla tahtası, ${g.K} renk çifti`);
  cursor = g.pairs[0][0];
  cellEls[cursor].tabIndex = 0;
  fit();
  render();
}

function fit() {
  if (!g) return;
  const fs = document.fullscreenElement === box;
  let avail = Math.max(180, wrap.clientWidth - 6);
  if (fs) avail = Math.min(avail, Math.max(220, window.innerHeight - 260));
  avail = Math.min(avail, 540);
  const cell = Math.max(24, Math.min(64, Math.floor(avail / g.n)));
  board.style.setProperty('--cell', `${cell}px`);
}

/* ---------- Çizim ---------- */

function cellWord(i, own) {
  const r = Math.floor(i / g.n) + 1;
  const c = (i % g.n) + 1;
  const e = g.endAt[i];
  if (e >= 0) return `Satır ${r}, sütun ${c}: ${colorLabel(e)} uç noktası${isConnected(e) ? ', bağlı' : ''}`;
  if (own[i] >= 0) return `Satır ${r}, sütun ${c}: ${colorLabel(own[i])} yolu${g.hinted.has(own[i]) ? ', ipucuyla gösterildi' : ''}`;
  return `Satır ${r}, sütun ${c}: boş`;
}

function render() {
  const n = g.n;
  const own = ownerArray();
  // Renk dolgusu ve yollar
  layerTint.textContent = '';
  layerLines.textContent = '';
  for (let c = 0; c < g.K; c++) {
    const p = g.paths[c];
    if (p.length < 2) continue;
    for (const x of p) {
      layerTint.appendChild(svgEl('rect', { x: x % n, y: Math.floor(x / n), width: 1, height: 1, fill: COLORS[c].hex }));
    }
    const pts = p.map((x) => `${(x % n) + 0.5},${Math.floor(x / n) + 0.5}`).join(' ');
    layerLines.appendChild(svgEl('polyline', { points: pts, class: 'cb-case' }));
    layerLines.appendChild(svgEl('polyline', { points: pts, stroke: COLORS[c].hex, class: g.hinted.has(c) ? 'is-hint' : '' }));
  }
  for (const { c, grp } of endEls) grp.classList.toggle('is-on', isConnected(c));

  const headCell = stroke ? g.paths[stroke.c][g.paths[stroke.c].length - 1] : -1;
  for (let i = 0; i < g.N; i++) {
    const el = cellEls[i];
    el.setAttribute('aria-label', cellWord(i, own));
    el.classList.toggle('is-head', i === headCell && stroke && stroke.source === 'key');
  }

  const s = stats();
  const L = LEVELS[g.li];
  elLevel.textContent = `${L.n}×${L.n}·${L.no}`;
  elFlows.textContent = `${s.connected}/${g.K}`;
  elFill.textContent = `%${s.fill}`;
  elMoves.textContent = String(g.moves);
  board.dataset.state = g.phase;
  board.dataset.level = g.id;
  board.dataset.size = String(n);
  board.dataset.connected = String(s.connected);
  board.dataset.fill = String(s.fill);
  board.dataset.moves = String(g.moves);
  board.dataset.hints = String(g.hints);
  board.dataset.cursor = String(cursor);
  board.dataset.drawing = stroke ? String(stroke.c) : '-1';
  btnHint.disabled = g.phase === 'bitti';
  btnUndo.disabled = g.phase === 'bitti' || !g.undo.length;
  btnReset.disabled = g.phase === 'bitti';
  return s;
}

function showMsg(text) { elMsg.textContent = text; }

// Etkin yol dışındaki yolları, çizime başlarken alınan kopyadan yeniden kurar: etkin yolun
// geçtiği hücrede kesilirler; etkin yol geri çekilince eski hâllerine döner.
function applyOthers() {
  const act = new Set(g.paths[stroke.c]);
  for (let k = 0; k < g.K; k++) {
    if (k === stroke.c) continue;
    const bp = stroke.base[k];
    let cut = bp.length;
    for (let i = 0; i < bp.length; i++) if (act.has(bp[i])) { cut = i; break; }
    g.paths[k] = bp.slice(0, cut);
  }
}

function beginStroke(cell, source) {
  if (!g || g.phase === 'bitti') return false;
  const base = snapshot();
  let c = g.endAt[cell];
  if (c >= 0) {
    g.paths[c] = [cell]; // uç noktasından başlamak o rengin yolunu yeniden çizer
  } else {
    for (let k = 0; k < g.K; k++) {
      const idx = g.paths[k].indexOf(cell);
      if (idx >= 0 && g.paths[k].length > 1) { c = k; g.paths[k] = g.paths[k].slice(0, idx + 1); break; }
    }
    if (c < 0) return false;
  }
  stroke = { c, base, source };
  applyOthers();
  return true;
}

// Etkin yolu komşu hücreye bir adım ilerletir ya da geri sarar. Dönüş: değişti mi
function stepTo(cell) {
  const c = stroke.c;
  const p = g.paths[c];
  const head = p[p.length - 1];
  if (cell < 0 || cell >= g.N || cell === head || !areAdjacent(g.n, head, cell)) return false;
  const idx = p.indexOf(cell);
  if (idx >= 0) { g.paths[c] = p.slice(0, idx + 1); applyOthers(); return true; }
  if (isConnected(c)) return false; // tamamlanmış yol yalnızca geri sarılabilir
  const e = g.endAt[cell];
  if (e >= 0 && e !== c) return false; // başka rengin ucu geçilemez
  p.push(cell);
  applyOthers();
  return true;
}

// Fare/dokunma hızlı hareket ettiğinde aradaki hücreleri sırayla dener
function dragTo(target) {
  const n = g.n;
  const c = stroke.c;
  const idx = g.paths[c].indexOf(target);
  if (idx >= 0) {
    if (idx === g.paths[c].length - 1) return false;
    g.paths[c] = g.paths[c].slice(0, idx + 1);
    applyOthers();
    return true;
  }
  let changed = false;
  for (let guard = 0; guard < 2 * n; guard++) {
    const p = g.paths[c];
    const head = p[p.length - 1];
    if (head === target) break;
    const dr = Math.floor(target / n) - Math.floor(head / n);
    const dc = (target % n) - (head % n);
    const vert = head + Math.sign(dr) * n;
    const horz = head + Math.sign(dc);
    const first = Math.abs(dr) >= Math.abs(dc) ? vert : horz;
    const second = first === vert ? horz : vert;
    if (stepTo(first)) { changed = true; continue; }
    if (dr !== 0 && dc !== 0 && stepTo(second)) { changed = true; continue; }
    break;
  }
  return changed;
}

function endStroke(cancel = false) {
  if (!stroke) return;
  const s = stroke;
  stroke = null;
  if (cancel) {
    g.paths = s.base;
    render();
    return;
  }
  if (!samePaths(s.base, g.paths)) {
    pushUndo(s.base);
    if (g.lastColor !== s.c) { g.moves++; g.lastColor = s.c; }
    if (isConnected(s.c)) showMsg(`${colorLabel(s.c)} bağlandı.`);
  }
  afterChange();
}

function pushUndo(paths) {
  g.undo.push(paths);
  if (g.undo.length > UNDO_MAX) g.undo.shift();
}

function afterChange() {
  // İpucu işareti yalnızca yol hâlâ gösterilen çözümle aynıysa kalır
  for (const h of [...g.hinted]) if (!matchesSolution(h)) g.hinted.delete(h);
  const s = render();
  if (s.connected === g.K && s.empty === 0) { win(); return; }
  if (s.connected === g.K) showMsg(`Tüm renkler bağlandı ama ${s.empty} boş hücre kaldı; yolları ızgaranın tamamını dolduracak şekilde uzatın.`);
  persist();
}

function win() {
  g.phase = 'bitti';
  const prev = store.solved[g.id];
  const perfect = g.moves <= g.K && g.hints === 0;
  const best = prev ? { m: Math.min(prev.m || g.moves, g.moves), h: Math.min(prev.h, g.hints) } : { m: g.moves, h: g.hints };
  store.solved[g.id] = best;
  store.game = null;
  store.cur = LEVELS[g.li === LEVELS.length - 1 ? 0 : g.li + 1].id; // yeniden açılışta sonraki seviyeden devam
  saveStore();
  board.classList.add('won');
  render();
  syncLevelUi();
  const L = LEVELS[g.li];
  const solvedCount = Object.keys(store.solved).length;
  resultTitle.textContent = perfect ? 'Kusursuz çözüm!' : 'Tebrikler, seviye tamam!';
  resultText.textContent = `${L.n}×${L.n}, seviye ${L.no}: ${g.moves} hamle${g.hints ? `, ${g.hints} ipucu` : ''}. `
    + `${perfect ? 'Her rengi tek seferde çizdiniz. ' : `Kusursuz çözüm için ${g.K} hamle yeterli. `}`
    + `Toplam çözülen seviye: ${solvedCount}/${LEVELS.length}.`;
  btnNext.textContent = g.li === LEVELS.length - 1 ? 'İlk seviyeye dön' : 'Sonraki seviye';
  result.hidden = false;
  showMsg(`${resultTitle.textContent} ${g.moves} hamle${g.hints ? `, ${g.hints} ipucu` : ''}.`);
  btnNext.focus({ preventScroll: false });
}

function persist() {
  if (!g || g.phase === 'bitti') return;
  store.cur = g.id;
  store.game = {
    id: g.id, paths: g.paths.map((p) => p.slice()), moves: g.moves, hints: g.hints, hinted: [...g.hinted],
  };
  saveStore();
}

/* ---------- İpucu, geri al, temizle ---------- */

function matchesSolution(c) {
  const p = g.paths[c];
  const s = g.sol[c];
  if (p.length !== s.length) return false;
  return p.every((x, k) => x === s[k]) || p.every((x, k) => x === s[s.length - 1 - k]);
}

function giveHint() {
  if (!g || g.phase === 'bitti') return;
  if (stroke) endStroke();
  if (g.phase === 'bitti') return;
  // Çözümle örtüşmeyen bir rengi seç: önce bağlanmamış olanlar
  const wrong = [];
  for (let c = 0; c < g.K; c++) if (!matchesSolution(c)) wrong.push(c);
  if (!wrong.length) return;
  wrong.sort((a, b) => Number(isConnected(a)) - Number(isConnected(b)) || a - b);
  const c = wrong[0];
  pushUndo(snapshot());
  const path = g.sol[c].slice();
  const set = new Set(path);
  g.paths[c] = path;
  for (let k = 0; k < g.K; k++) {
    if (k === c) continue;
    const p = g.paths[k];
    const cut = p.findIndex((x) => set.has(x));
    if (cut >= 0) g.paths[k] = p.slice(0, cut);
  }
  g.hinted.add(c);
  g.hints += 1;
  g.lastColor = -1;
  showMsg(`İpucu: ${colorLabel(c)} yolu gösterildi (${path.length} hücre). Çakışan yollar kesildi.`);
  afterChange();
}

function undo() {
  if (!g || g.phase === 'bitti') return;
  if (stroke) endStroke(true);
  if (!g.undo.length) return;
  g.paths = g.undo.pop();
  g.lastColor = -1;
  showMsg('Son değişiklik geri alındı.');
  afterChange();
}

function resetBoard() {
  if (!g || g.phase === 'bitti') return;
  if (stroke) endStroke(true);
  if (g.paths.some((p) => p.length > 1)) pushUndo(snapshot());
  g.paths = g.pairs.map(() => []);
  g.moves = 0;
  g.lastColor = -1;
  g.hinted.clear();
  showMsg('Tahta temizlendi. Hamle sayacı sıfırlandı; kullanılan ipuçları sayılmaya devam eder.');
  afterChange();
}

function clearColorAt(i) {
  const own = ownerArray();
  const c = own[i];
  if (c < 0 || g.paths[c].length < 2) { showMsg('Bu hücrede silinecek bir yol yok.'); return; }
  pushUndo(snapshot());
  g.paths[c] = [];
  g.hinted.delete(c);
  g.lastColor = -1;
  showMsg(`${colorLabel(c)} yolu silindi.`);
  afterChange();
}

/* ---------- Fare ve dokunma ---------- */

function cellAt(x, y) {
  const rect = grid.getBoundingClientRect();
  const size = rect.width / g.n;
  const c = Math.floor((x - rect.left) / size);
  const r = Math.floor((y - rect.top) / size);
  if (r < 0 || c < 0 || r >= g.n || c >= g.n) return -1;
  return r * g.n + c;
}

function moveCursor(i, focus = true) {
  if (cellEls[cursor]) cellEls[cursor].tabIndex = -1;
  cursor = i;
  cellEls[i].tabIndex = 0;
  board.dataset.cursor = String(i);
  if (focus) cellEls[i].focus({ preventScroll: true });
}

grid.addEventListener('pointerdown', (e) => {
  if (!g || g.phase === 'bitti') return;
  if (e.pointerType === 'mouse' && e.button !== 0) return;
  const cell = cellAt(e.clientX, e.clientY);
  if (cell < 0) return;
  e.preventDefault();
  if (stroke) endStroke();
  if (g.phase === 'bitti') return;
  moveCursor(cell);
  if (!beginStroke(cell, 'pointer')) {
    showMsg('Boş hücreden çizime başlanmaz: bir renkli uç noktasına ya da var olan bir yola dokunun.');
    return;
  }
  pointerId = e.pointerId;
  try { grid.setPointerCapture(e.pointerId); } catch (_) { /* desteklenmiyor */ }
  render();
});

grid.addEventListener('pointermove', (e) => {
  if (!stroke || stroke.source !== 'pointer' || e.pointerId !== pointerId) return;
  const cell = cellAt(e.clientX, e.clientY);
  if (cell < 0) return;
  if (dragTo(cell)) render();
});

const releasePointer = (e) => {
  if (!stroke || stroke.source !== 'pointer' || e.pointerId !== pointerId) return;
  pointerId = null;
  endStroke();
};
grid.addEventListener('pointerup', releasePointer);
grid.addEventListener('pointercancel', releasePointer);
grid.addEventListener('lostpointercapture', releasePointer);
grid.addEventListener('contextmenu', (e) => e.preventDefault());

/* ---------- Klavye ---------- */

function toggleKeyStroke(i) {
  if (stroke && stroke.source === 'key') {
    endStroke();
    return;
  }
  if (g.phase === 'bitti') return;
  if (!beginStroke(i, 'key')) {
    showMsg('Bu hücre boş. Çizime bir uç noktasından ya da var olan bir yolun hücresinden başlayın.');
    return;
  }
  render();
  showMsg(`${colorLabel(stroke.c)} çiziliyor: ok tuşlarıyla ilerleyin. Enter ya da Boşluk bitirir, Esc iptal eder, Backspace bir adım geri alır.`);
}

grid.addEventListener('keydown', (e) => {
  const el = e.target instanceof Element ? e.target.closest('.cb-cell') : null;
  if (!el || !g || e.ctrlKey || e.metaKey || e.altKey) return;
  const n = g.n;
  const i = Number(el.dataset.i);
  const r = Math.floor(i / n);
  const c = i % n;
  let to = -2;
  switch (e.key) {
    case 'ArrowUp': to = r > 0 ? i - n : -1; break;
    case 'ArrowDown': to = r < n - 1 ? i + n : -1; break;
    case 'ArrowLeft': to = c > 0 ? i - 1 : -1; break;
    case 'ArrowRight': to = c < n - 1 ? i + 1 : -1; break;
    case 'Home': if (stroke) return; to = r * n; break;
    case 'End': if (stroke) return; to = r * n + n - 1; break;
    case ' ': case 'Enter':
      e.preventDefault();
      if (g.phase !== 'bitti') toggleKeyStroke(i);
      return;
    case 'Escape':
      if (stroke && stroke.source === 'key') {
        e.preventDefault();
        endStroke(true);
        showMsg('Çizim iptal edildi; yollar önceki hâline döndü.');
      }
      return;
    case 'Backspace': case 'Delete':
      e.preventDefault();
      if (g.phase === 'bitti') return;
      if (stroke && stroke.source === 'key') {
        const p = g.paths[stroke.c];
        if (p.length > 1) { stepTo(p[p.length - 2]); moveCursor(p[p.length - 2]); render(); }
      } else {
        clearColorAt(i);
      }
      return;
    default:
      return;
  }
  e.preventDefault();
  if (to < 0) return; // kenar
  if (stroke && stroke.source === 'key') {
    const sc = stroke.c;
    if (stepTo(to)) {
      const p = g.paths[sc];
      moveCursor(p[p.length - 1]);
      if (isConnected(sc)) endStroke();
      else render();
    } else {
      showMsg(isConnected(sc)
        ? `${colorLabel(sc)} zaten bağlı. Geri sarmak için kendi yolunun üzerine dönün ya da Enter ile bitirin.`
        : 'Bu yöne çizilemez: orada başka bir rengin uç noktası var.');
    }
  } else {
    moveCursor(to);
  }
});

/* ---------- Seviye seçimi ---------- */

function syncLevelUi() {
  const size = g ? g.n : Number(selSize.value);
  selSize.value = String(size);
  // Düğmeler yeniden kurulurken odak düğmelerden birindeyse yeni seviyenin düğmesine taşınır
  const hadFocus = levelGrid.contains(document.activeElement);
  levelGrid.textContent = '';
  LEVELS.forEach((L, li) => {
    if (L.n !== size) return;
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'cb-lv';
    b.textContent = String(L.no);
    b.dataset.level = L.id;
    const s = store.solved[L.id];
    if (s) b.classList.add('is-solved');
    const cur = g && g.li === li;
    if (cur) b.setAttribute('aria-current', 'true');
    b.setAttribute('aria-label', `Seviye ${L.no}${s ? `, çözüldü (${s.m} hamle)` : ''}${cur ? ', şu an açık' : ''}`);
    b.addEventListener('click', () => { loadLevel(li); });
    levelGrid.appendChild(b);
  });
  if (hadFocus) { const curBtn = levelGrid.querySelector('[aria-current="true"]'); if (curBtn) curBtn.focus(); }
  const total = Object.keys(store.solved).length;
  const inSize = LEVELS.filter((L) => L.n === size && store.solved[L.id]).length;
  elProgress.textContent = `Bu boyutta çözülen: ${inSize}/${LEVELS.filter((L) => L.n === size).length} · Toplam: ${total}/${LEVELS.length}`;
  btnPrev.disabled = !g || g.li === 0;
  btnFwd.disabled = !g || g.li === LEVELS.length - 1;
}

function firstOpenLevel(size) {
  const list = LEVELS.map((L, li) => ({ L, li })).filter((x) => x.L.n === size);
  const open = list.find((x) => !store.solved[x.L.id]);
  return (open || list[0]).li;
}

selSize.addEventListener('change', () => {
  const size = Number(selSize.value);
  if (!SIZES.includes(size)) return;
  loadLevel(firstOpenLevel(size));
});
btnPrev.addEventListener('click', () => { if (g && g.li > 0) loadLevel(g.li - 1); });
btnFwd.addEventListener('click', () => { if (g && g.li < LEVELS.length - 1) loadLevel(g.li + 1); });
btnNext.addEventListener('click', () => {
  loadLevel(g.li === LEVELS.length - 1 ? 0 : g.li + 1);
  moveCursor(cursor);
});
btnHint.addEventListener('click', giveHint);
btnUndo.addEventListener('click', undo);
btnReset.addEventListener('click', resetBoard);

/* ---------- Tam ekran ---------- */

if (!(document.fullscreenEnabled || document.webkitFullscreenEnabled) || !box.requestFullscreen) {
  btnFull.hidden = true; // tam ekranı desteklemeyen tarayıcılar (ör. iPhone Safari)
} else {
  btnFull.hidden = false;
  btnFull.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else box.requestFullscreen().catch(() => {});
  });
  document.addEventListener('fullscreenchange', () => {
    const on = document.fullscreenElement === box;
    btnFull.textContent = on ? 'Tam ekrandan çık' : 'Tam ekran';
    btnFull.setAttribute('aria-pressed', on ? 'true' : 'false');
    fit();
  });
}

if ('ResizeObserver' in window) new ResizeObserver(fit).observe(wrap);
window.addEventListener('resize', fit);
window.addEventListener('pagehide', () => { if (g && !stroke) persist(); });

// Tarayıcı testleri için kanca: geçerli bulmacanın uçlarını, çözümünü ve durumunu döndürür
// (oyuncuya sunulan bir özellik değildir; ipucu düğmesi zaten yolları tek tek gösterir).
window.__cizgiBaglaTest = () => (g ? {
  id: g.id, n: g.n, k: g.K, state: g.phase, levels: LEVELS.length,
  pairs: g.pairs.map((p) => p.slice()), solution: g.sol.map((p) => p.slice()), paths: snapshot(),
  connected: stats().connected, fill: stats().fill, moves: g.moves, hints: g.hints,
} : null);

/* ---------- Başlangıç ---------- */

loadLevel(Math.max(0, levelIndex(store.cur)), { restore: true });
