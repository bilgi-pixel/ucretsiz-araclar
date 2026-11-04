// Sudoku çekirdeği: DOM kullanmayan saf fonksiyonlar (üretici, çözücü, zorluk denetimi).
// Tüm rastgelelik tohumlu (mulberry32) olduğundan aynı tohum aynı bulmacayı üretir;
// günlük bulmaca bu sayede herkes için aynıdır. Zaman değil düğüm bütçesi kullanılır (deterministik).

export const LEVELS = {
  // mode: kolay = yalnızca "tek aday" ile çözülür; orta = tek aday + gizli tek; zor/uzman = benzersiz çözüm yeterli
  kolay: { label: 'Kolay', givens: 40, mode: 'naked' },
  orta: { label: 'Orta', givens: 32, mode: 'singles' },
  zor: { label: 'Zor', givens: 28, mode: 'unique' },
  uzman: { label: 'Uzman', givens: 22, mode: 'unique' },
};

const NODE_BUDGET = 40000;

// Hücre -> satır / sütun / kutu indeksleri
const ROW = new Uint8Array(81);
const COL = new Uint8Array(81);
const BOX = new Uint8Array(81);
for (let i = 0; i < 81; i++) {
  ROW[i] = Math.floor(i / 9);
  COL[i] = i % 9;
  BOX[i] = Math.floor(ROW[i] / 3) * 3 + Math.floor(COL[i] / 3);
}

// 27 birim (9 satır, 9 sütun, 9 kutu): hücre indeks listeleri
const UNITS = [];
for (let u = 0; u < 9; u++) {
  UNITS.push(Array.from({ length: 81 }, (_, i) => i).filter((i) => ROW[i] === u));
  UNITS.push(Array.from({ length: 81 }, (_, i) => i).filter((i) => COL[i] === u));
  UNITS.push(Array.from({ length: 81 }, (_, i) => i).filter((i) => BOX[i] === u));
}

const POP = new Uint8Array(512);
for (let m = 1; m < 512; m++) POP[m] = POP[m >> 1] + (m & 1);

export const peersOf = (i) => {
  const out = [];
  for (let j = 0; j < 81; j++) if (j !== i && (ROW[j] === ROW[i] || COL[j] === COL[i] || BOX[j] === BOX[i])) out.push(j);
  return out;
};
export const rowOf = (i) => ROW[i];
export const colOf = (i) => COL[i];
export const boxOf = (i) => BOX[i];

// ---- Tohumlu rastgele sayı üreteci ----
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Metinden 32 bit tohum (FNV-1a)
export function hashString(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function shuffle(list, rng) {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

// Kullanım maskeleri (bit d-1 = d rakamı kullanılmış)
function usedMasks(grid) {
  const rows = new Int16Array(9);
  const cols = new Int16Array(9);
  const boxes = new Int16Array(9);
  for (let i = 0; i < 81; i++) {
    if (grid[i]) {
      const bit = 1 << (grid[i] - 1);
      rows[ROW[i]] |= bit; cols[COL[i]] |= bit; boxes[BOX[i]] |= bit;
    }
  }
  return { rows, cols, boxes };
}

/** Bir hücrenin aday rakamları (bit maskesi); hücre doluysa 0. */
export function candidates(grid, i) {
  if (grid[i]) return 0;
  const { rows, cols, boxes } = usedMasks(grid);
  return ~(rows[ROW[i]] | cols[COL[i]] | boxes[BOX[i]]) & 511;
}

/**
 * Çözüm sayar (en çok `limit` kadar). En az aday sezgisi (MRV) ile geri izleme.
 * Dönüş: { count, solution (ilk çözüm ya da null), aborted (bütçe aşıldı) }
 */
export function solve(puzzle, limit = 2, budget = NODE_BUDGET) {
  const g = Int8Array.from(puzzle);
  const { rows, cols, boxes } = usedMasks(g);
  let count = 0;
  let nodes = 0;
  let aborted = false;
  let solution = null;

  function rec() {
    let best = -1;
    let bestAvail = 0;
    let bestCnt = 10;
    for (let i = 0; i < 81; i++) {
      if (g[i]) continue;
      const avail = ~(rows[ROW[i]] | cols[COL[i]] | boxes[BOX[i]]) & 511;
      const cnt = POP[avail];
      if (cnt < bestCnt) {
        best = i; bestAvail = avail; bestCnt = cnt;
        if (cnt <= 1) break;
      }
    }
    if (best < 0) {
      count++;
      if (!solution) solution = Int8Array.from(g);
      return;
    }
    if (bestCnt === 0) return;
    for (let m = bestAvail; m; m &= m - 1) {
      const bit = m & -m;
      if (++nodes > budget) { aborted = true; return; }
      g[best] = 32 - Math.clz32(bit);
      rows[ROW[best]] |= bit; cols[COL[best]] |= bit; boxes[BOX[best]] |= bit;
      rec();
      g[best] = 0;
      rows[ROW[best]] &= ~bit; cols[COL[best]] &= ~bit; boxes[BOX[best]] &= ~bit;
      if (aborted || count >= limit) return;
    }
  }
  rec();
  return { count, solution, aborted };
}

/** Rastgele (tohumlu) eksiksiz geçerli bir Sudoku çözümü üretir. */
export function randomSolution(rng) {
  const g = new Int8Array(81);
  const { rows, cols, boxes } = usedMasks(g);
  function rec() {
    let best = -1;
    let bestAvail = 0;
    let bestCnt = 10;
    for (let i = 0; i < 81; i++) {
      if (g[i]) continue;
      const avail = ~(rows[ROW[i]] | cols[COL[i]] | boxes[BOX[i]]) & 511;
      const cnt = POP[avail];
      if (cnt < bestCnt) { best = i; bestAvail = avail; bestCnt = cnt; if (cnt <= 1) break; }
    }
    if (best < 0) return true;
    const list = [];
    for (let d = 0; d < 9; d++) if (bestAvail & (1 << d)) list.push(d);
    shuffle(list, rng);
    for (const d of list) {
      const bit = 1 << d;
      g[best] = d + 1;
      rows[ROW[best]] |= bit; cols[COL[best]] |= bit; boxes[BOX[best]] |= bit;
      if (rec()) return true;
      g[best] = 0;
      rows[ROW[best]] &= ~bit; cols[COL[best]] &= ~bit; boxes[BOX[best]] &= ~bit;
    }
    return false;
  }
  rec();
  return g;
}

/** Yalnızca "tek aday" (ve istenirse "gizli tek") ile çözülebiliyor mu? Çözülürse çözüm benzersizdir. */
export function solvableBySingles(puzzle, hidden) {
  const g = Int8Array.from(puzzle);
  const { rows, cols, boxes } = usedMasks(g);
  let empty = 0;
  for (let i = 0; i < 81; i++) if (!g[i]) empty++;
  const place = (i, bit) => {
    g[i] = 32 - Math.clz32(bit);
    rows[ROW[i]] |= bit; cols[COL[i]] |= bit; boxes[BOX[i]] |= bit;
    empty--;
  };
  while (empty > 0) {
    let progress = false;
    for (let i = 0; i < 81; i++) {
      if (g[i]) continue;
      const cand = ~(rows[ROW[i]] | cols[COL[i]] | boxes[BOX[i]]) & 511;
      if (!cand) return false;
      if ((cand & (cand - 1)) === 0) { place(i, cand); progress = true; }
    }
    if (!progress && hidden) {
      for (const unit of UNITS) {
        for (let d = 0; d < 9; d++) {
          const bit = 1 << d;
          let pos = -1;
          let cnt = 0;
          for (const i of unit) {
            if (!g[i] && !((rows[ROW[i]] | cols[COL[i]] | boxes[BOX[i]]) & bit)) { cnt++; pos = i; }
          }
          if (cnt === 1) { place(pos, bit); progress = true; }
        }
      }
    }
    if (!progress) return false;
  }
  return true;
}

// Seviyenin kuralına göre bulmaca kabul edilebilir mi? (hepsi benzersiz çözüm garantiler)
function acceptable(puzzle, mode) {
  if (mode === 'naked') return solvableBySingles(puzzle, false);
  if (mode === 'singles') return solvableBySingles(puzzle, true);
  const r = solve(puzzle, 2);
  return !r.aborted && r.count === 1;
}

/** Çözümden hücre kazıyarak bulmaca üretir; hedef ipucu sayısına ulaşamazsa ulaşabildiği kadarını bırakır. */
export function carve(solution, levelKey, rng) {
  const { givens: target, mode } = LEVELS[levelKey];
  const puzzle = Int8Array.from(solution);
  const order = shuffle(Array.from({ length: 81 }, (_, i) => i), rng);
  let left = 81;
  for (const idx of order) {
    if (left <= target) break;
    const keep = puzzle[idx];
    puzzle[idx] = 0;
    if (acceptable(puzzle, mode)) left--; else puzzle[idx] = keep;
  }
  return puzzle;
}

/** Tohumdan bulmaca üretir: { puzzle, solution } (Int8Array, 0 = boş). */
export function generate(levelKey, seed) {
  const rng = mulberry32(seed);
  // Uzman seviyede hedef ipucu sayısına ulaşmak için birkaç deneme yapılır; en seyrek tahta seçilir.
  const attempts = levelKey === 'uzman' ? 12 : 1;
  let best = null;
  let bestGivens = 82;
  for (let a = 0; a < attempts; a++) {
    const solution = randomSolution(rng);
    const puzzle = carve(solution, levelKey, rng);
    const givens = puzzle.reduce((sum, v) => sum + (v ? 1 : 0), 0);
    if (givens < bestGivens) { best = { puzzle, solution }; bestGivens = givens; }
    if (givens <= LEVELS[levelKey].givens) break;
  }
  return best;
}

/** Satır/sütun/kutu kuralına göre çakışan rakamı olan hücreler (yalnızca bilgi amaçlı yardımcı). */
export function conflicts(grid) {
  const bad = new Set();
  for (const unit of UNITS) {
    const seen = new Map();
    for (const i of unit) {
      const v = grid[i];
      if (!v) continue;
      if (seen.has(v)) { bad.add(i); bad.add(seen.get(v)); } else seen.set(v, i);
    }
  }
  return bad;
}
