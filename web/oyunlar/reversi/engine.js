// Reversi motoru: saf mantık, DOM yok. Hem oyun arayüzü, hem Web Worker, hem testler içe aktarır.
// Tahta: 64 elemanlı dizi, indeks = satır * 8 + sütun, satır 0 en üst (8. sıra), sütun 0 = a.
// Taşlar: 'b' siyah, 'w' beyaz, '.' boş. Siyah önce başlar.

export const SIZE = 8;
export const FILES = 'abcdefgh';

export const other = (side) => (side === 'b' ? 'w' : 'b');
export const rowOf = (i) => i >> 3;
export const colOf = (i) => i & 7;
export const squareName = (i) => FILES[i & 7] + String(8 - (i >> 3));

/** "d3" gibi adı indekse çevirir. */
export function squareIndex(name) {
  return (8 - Number(name[1])) * 8 + FILES.indexOf(name[0]);
}

/** Başlangıç dizilimi: d4 ve e5 beyaz, d5 ve e4 siyah. */
export function initialBoard() {
  const b = new Array(64).fill('.');
  b[squareIndex('d4')] = 'w';
  b[squareIndex('e5')] = 'w';
  b[squareIndex('d5')] = 'b';
  b[squareIndex('e4')] = 'b';
  return b;
}

/** Sekiz satırlık metinden tahta kurar (testler ve hata ayıklama için). Boşluk = boş kare. */
export function boardFromRows(rows) {
  return rows.join('').split('').map((ch) => (ch === 'b' || ch === 'w' ? ch : '.'));
}

export function boardToRows(board) {
  const rows = [];
  for (let r = 0; r < 8; r++) rows.push(board.slice(r * 8, r * 8 + 8).join(''));
  return rows;
}

const DIRS = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

/** Bir kareye `side` taşı konursa çevrilecek taşların indeksleri; geçersizse boş dizi. */
export function flipsFor(board, idx, side) {
  if (board[idx] !== '.') return [];
  const opp = other(side);
  const r0 = idx >> 3;
  const c0 = idx & 7;
  const out = [];
  for (const [dr, dc] of DIRS) {
    let r = r0 + dr;
    let c = c0 + dc;
    const line = [];
    while (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r * 8 + c] === opp) {
      line.push(r * 8 + c);
      r += dr;
      c += dc;
    }
    if (line.length && r >= 0 && r < 8 && c >= 0 && c < 8 && board[r * 8 + c] === side) {
      for (const x of line) out.push(x);
    }
  }
  return out;
}

/** Geçerli hamleler: { idx, flips: [...] } listesi. */
export function legalMoves(board, side) {
  const out = [];
  for (let i = 0; i < 64; i++) {
    if (board[i] !== '.') continue;
    const flips = flipsFor(board, i, side);
    if (flips.length) out.push({ idx: i, flips });
  }
  return out;
}

/** En az bir geçerli hamle var mı (erken çıkışlı, aramada hızlı). */
export function hasMove(board, side) {
  for (let i = 0; i < 64; i++) {
    if (board[i] === '.' && flipsFor(board, i, side).length) return true;
  }
  return false;
}

/** Hamleyi uygular, yeni tahta döndürür. `move` indeks ya da { idx } olabilir; geçersizse hata fırlatır. */
export function applyMove(board, move, side) {
  const idx = typeof move === 'number' ? move : move.idx;
  const flips = flipsFor(board, idx, side);
  if (!flips.length) throw new Error('Geçersiz hamle: ' + squareName(idx));
  const next = board.slice();
  next[idx] = side;
  for (const f of flips) next[f] = side;
  return next;
}

export function countDiscs(board) {
  const n = { b: 0, w: 0, empty: 0 };
  for (const p of board) {
    if (p === 'b') n.b++;
    else if (p === 'w') n.w++;
    else n.empty++;
  }
  return n;
}

/**
 * Hamleden sonra sıra kimde? `justMoved` az önce oynayan taraftır.
 * Rakibin hamlesi varsa sıra ona geçer; yoksa ve oynayanın hamlesi varsa rakip pas geçer, sıra yine oynayandadır;
 * ikisinin de hamlesi yoksa oyun biter. (Tahta dolu ya da bir renk tükenmişse de ikisinin hamlesi kalmaz.)
 */
export function nextTurn(board, justMoved) {
  const opp = other(justMoved);
  if (hasMove(board, opp)) return { turn: opp, passed: false, passedSide: null, over: false };
  if (hasMove(board, justMoved)) return { turn: justMoved, passed: true, passedSide: opp, over: false };
  return { turn: null, passed: false, passedSide: null, over: true };
}

/**
 * Sırası gelen tarafın hamlesi yoksa düzeltir (başlangıç konumları ve kurulan konumlar için).
 * { turn, passed, passedSide, over } döndürür.
 */
export function settleTurn(board, turn) {
  if (hasMove(board, turn)) return { turn, passed: false, passedSide: null, over: false };
  const opp = other(turn);
  if (hasMove(board, opp)) return { turn: opp, passed: true, passedSide: turn, over: false };
  return { turn: null, passed: false, passedSide: null, over: true };
}

/** Oyun sonu sayımı: yalnızca tahtadaki taşlar sayılır, boş kareler kimseye yazılmaz. */
export function gameResult(board) {
  const n = countDiscs(board);
  let winner = null;
  if (n.b > n.w) winner = 'b';
  else if (n.w > n.b) winner = 'w';
  return { winner, b: n.b, w: n.w, empty: n.empty, reason: `Siyah ${n.b}, Beyaz ${n.w}` };
}

/* ---------- Yapay zekâ ---------- */

// Konum tablosu (sol üst çeyrek, simetrik genişletilir): köşeler çok değerli, köşeye bitişik "X" ve "C" kareleri tehlikeli,
// kenarlar iyi, merkez nötr.
const QUADRANT = [
  [100, -25, 10, 5],
  [-25, -50, -2, -2],
  [10, -2, 1, 1],
  [5, -2, 1, 0],
];
export const WEIGHTS = (() => {
  const w = new Array(64);
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) w[r * 8 + c] = QUADRANT[Math.min(r, 7 - r)][Math.min(c, 7 - c)];
  }
  return w;
})();

// Köşe ve ona bitişik üç kare: köşe doluysa komşu karelerin cezası kalkar.
const CORNERS = [
  [0, [1, 8, 9]],
  [7, [6, 15, 14]],
  [56, [57, 48, 49]],
  [63, [62, 55, 54]],
];

const INF = 1e9;
const MOBILITY_WEIGHT = 7;
const CORNER_BONUS = 30;

/** `side` açısından konum puanı: konum tablosu + hareketlilik + köşe + oyun sonuna doğru taş farkı. */
export function evaluate(board, side) {
  const opp = other(side);
  const skip = new Set();
  let score = 0;
  for (const [corner, near] of CORNERS) {
    const p = board[corner];
    if (p !== '.') {
      score += p === side ? CORNER_BONUS : -CORNER_BONUS;
      for (const n of near) skip.add(n);
    }
  }
  let mine = 0;
  let theirs = 0;
  let empties = 0;
  for (let i = 0; i < 64; i++) {
    const p = board[i];
    if (p === '.') { empties++; continue; }
    const w = skip.has(i) ? 6 : WEIGHTS[i];
    if (p === side) { score += w; mine++; } else { score -= w; theirs++; }
  }
  let m1 = 0;
  let m2 = 0;
  for (let i = 0; i < 64; i++) {
    if (board[i] !== '.') continue;
    if (flipsFor(board, i, side).length) m1++;
    if (flipsFor(board, i, opp).length) m2++;
  }
  score += (m1 - m2) * MOBILITY_WEIGHT;
  // Erken oyunda az taşa sahip olmak hareketlilik sağlar; sona yaklaşırken taş farkı belirleyicidir.
  const diff = mine - theirs;
  score += diff * (empties < 14 ? 4 : empties < 40 ? 0.4 : -0.4);
  return score;
}

/** Oyun bitti: `side` açısından kesin sonuç puanı. */
function terminalScore(board, side) {
  let diff = 0;
  for (const p of board) { if (p === side) diff++; else if (p !== '.') diff--; }
  return diff > 0 ? 10000 + diff * 100 : diff < 0 ? -10000 + diff * 100 : 0;
}

/** Hamleleri sırala: köşeler ve yüksek konum puanlıları önce (alfa-beta budamasını artırır). */
function ordered(moves) {
  return moves.sort((a, b) => WEIGHTS[b.idx] - WEIGHTS[a.idx]);
}

/** Negamax + alfa-beta. Pas derinlik tüketmez; art arda iki pas oyun sonudur. */
function negamax(board, side, depth, alpha, beta, passed) {
  const moves = legalMoves(board, side);
  if (!moves.length) {
    if (passed) return terminalScore(board, side);
    return -negamax(board, other(side), depth, -beta, -alpha, true);
  }
  if (depth <= 0) return evaluate(board, side);
  ordered(moves);
  let best = -INF;
  for (const m of moves) {
    const next = board.slice();
    next[m.idx] = side;
    for (const f of m.flips) next[f] = side;
    const v = -negamax(next, other(side), depth - 1, -beta, -alpha, false);
    if (v > best) best = v;
    if (v > alpha) alpha = v;
    if (alpha >= beta) break;
  }
  return best;
}

export const DEPTH = { kolay: 1, orta: 3, zor: 5 };
// Zor seviyede tahtada bu kadar ya da daha az boş kare kalınca oyun sonuna kadar kesin hesaplanır.
const EXACT_EMPTIES = 7;

/**
 * Bilgisayarın hamlesini seçer. `level`: 'kolay' | 'orta' | 'zor'. Hamle yoksa null.
 * Kolay: 1 derinlik, bazen rastgele. Orta: 3 derinlik, eşite yakın hamleler arasından rastgele.
 * Zor: 5 derinlik, rastgelelik yok (deterministik).
 */
export function chooseMove(board, side, level = 'orta', rng = Math.random) {
  const moves = legalMoves(board, side);
  if (!moves.length) return null;
  if (moves.length === 1) return moves[0];
  const depth = DEPTH[level] || DEPTH.orta;

  if (level === 'kolay' && rng() < 0.2) return moves[Math.floor(rng() * moves.length)];

  ordered(moves);
  const empties = countDiscs(board).empty;
  const searchDepth = level === 'zor' && empties <= EXACT_EMPTIES ? empties + 2 : depth;
  const randomized = level !== 'zor';

  let bestMove = moves[0];
  let bestScore = -INF;
  const scored = [];
  for (const m of moves) {
    const next = board.slice();
    next[m.idx] = side;
    for (const f of m.flips) next[f] = side;
    // Rastgele seçim için tam pencere (kesin puan); zor seviyede alfa daralır.
    const v = randomized
      ? -negamax(next, other(side), searchDepth - 1, -INF, INF, false)
      : -negamax(next, other(side), searchDepth - 1, -INF, -bestScore, false);
    scored.push({ m, v });
    if (v > bestScore) { bestScore = v; bestMove = m; }
  }
  if (randomized) {
    const margin = level === 'kolay' ? 30 : 4;
    const pool = scored.filter((s) => s.v >= bestScore - margin).map((s) => s.m);
    return pool[Math.floor(rng() * pool.length)];
  }
  return bestMove;
}
