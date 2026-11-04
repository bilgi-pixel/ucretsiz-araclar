// Türk Daması motoru: saf mantık, DOM yok. Hem oyun arayüzü hem testler içe aktarır.
// Tahta: 64 elemanlı dizi, indeks = satır * 8 + sütun, satır 0 en üst (8. sıra).
// Taşlar: 'w' beyaz taş, 'W' beyaz dama, 'b' siyah taş, 'B' siyah dama, '.' boş.
// Beyaz aşağıdan yukarı (satır azalır), siyah yukarıdan aşağı (satır artar) ilerler.

export const SIZE = 8;
export const FILES = 'abcdefgh';

export const other = (side) => (side === 'w' ? 'b' : 'w');
export const sideOf = (p) => (p === '.' ? null : p.toLowerCase());
export const isKing = (p) => p === 'W' || p === 'B';
export const rowOf = (i) => i >> 3;
export const colOf = (i) => i & 7;
export const squareName = (i) => FILES[colOf(i)] + String(8 - rowOf(i));

/** "c3" gibi adı indekse çevirir. */
export function squareIndex(name) {
  const c = FILES.indexOf(name[0]);
  const r = 8 - Number(name[1]);
  return r * 8 + c;
}

/** Başlangıç dizilimi: beyaz 2. ve 3. sırada, siyah 6. ve 7. sırada (16 + 16 taş). */
export function initialBoard() {
  const b = new Array(64).fill('.');
  for (let c = 0; c < 8; c++) {
    b[5 * 8 + c] = 'w'; b[6 * 8 + c] = 'w';
    b[1 * 8 + c] = 'b'; b[2 * 8 + c] = 'b';
  }
  return b;
}

/** Sekiz satırlık metinden tahta kurar (testler ve hata ayıklama için). */
export function boardFromRows(rows) {
  return rows.join('').split('').map((ch) => (ch === ' ' ? '.' : ch));
}

export function boardToRows(board) {
  const rows = [];
  for (let r = 0; r < 8; r++) rows.push(board.slice(r * 8, r * 8 + 8).join(''));
  return rows;
}

export function countPieces(board) {
  const n = { w: 0, b: 0, wKing: 0, bKing: 0 };
  for (const p of board) {
    if (p === '.') continue;
    n[sideOf(p)]++;
    if (isKing(p)) n[sideOf(p) + 'King']++;
  }
  return n;
}

const DIRS = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // yukarı, aşağı, sol, sağ
const inb = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;

/** Taşın (dama olmayan) gidebileceği yönler: ileri ve yanlar; geri yok. */
function manDirs(side) {
  return side === 'w' ? [[-1, 0], [0, -1], [0, 1]] : [[1, 0], [0, -1], [0, 1]];
}
const lastRow = (side) => (side === 'w' ? 0 : 7);

/**
 * Bir taşın tüm alma dizilerini üretir. Alınan taş hemen tahtadan kalkar; aynı taş iki kez alınamaz.
 * Dama, aldığı yönün tersine hemen dönemez. Alma sırasında son sıraya ulaşan taş dama olur ve
 * zincire dama gibi devam eder.
 */
function captureSequences(board, from) {
  const piece = board[from];
  const side = sideOf(piece);
  const enemy = other(side);
  const out = [];
  board[from] = '.'; // hareket eden taş çıkış karesini boşaltır
  const path = [];
  const caps = [];

  const dfs = (pos, king, promoted, lastDir) => {
    const pr = rowOf(pos); const pc = colOf(pos);
    let extended = false;
    const dirs = king ? DIRS : manDirs(side);
    for (const d of dirs) {
      if (lastDir && d[0] === -lastDir[0] && d[1] === -lastDir[1]) continue;
      if (!king) {
        const mr = pr + d[0]; const mc = pc + d[1];
        const lr = mr + d[0]; const lc = mc + d[1];
        if (!inb(lr, lc)) continue;
        const mi = mr * 8 + mc; const li = lr * 8 + lc;
        if (sideOf(board[mi]) !== enemy || board[li] !== '.') continue;
        extended = true;
        const victim = board[mi];
        board[mi] = '.'; caps.push(mi); path.push(li);
        const becomes = lr === lastRow(side);
        dfs(li, becomes, promoted || becomes, d);
        path.pop(); caps.pop(); board[mi] = victim;
      } else {
        let r = pr + d[0]; let c = pc + d[1];
        while (inb(r, c) && board[r * 8 + c] === '.') { r += d[0]; c += d[1]; }
        if (!inb(r, c)) continue;
        const mi = r * 8 + c;
        if (sideOf(board[mi]) !== enemy) continue;
        let lr = r + d[0]; let lc = c + d[1];
        if (!inb(lr, lc) || board[lr * 8 + lc] !== '.') continue;
        extended = true;
        const victim = board[mi];
        board[mi] = '.'; caps.push(mi);
        while (inb(lr, lc) && board[lr * 8 + lc] === '.') {
          const li = lr * 8 + lc;
          path.push(li);
          dfs(li, true, promoted, d);
          path.pop();
          lr += d[0]; lc += d[1];
        }
        caps.pop(); board[mi] = victim;
      }
    }
    if (!extended && path.length) {
      out.push({ from, path: path.slice(), captured: caps.slice(), promote: promoted, capture: true });
    }
  };

  dfs(from, isKing(piece), false, null);
  board[from] = piece;
  return out;
}

/** Alma yapmayan (sade) hamleler. */
function quietMoves(board, from) {
  const piece = board[from];
  const side = sideOf(piece);
  const out = [];
  const pr = rowOf(from); const pc = colOf(from);
  if (!isKing(piece)) {
    for (const d of manDirs(side)) {
      const r = pr + d[0]; const c = pc + d[1];
      if (!inb(r, c) || board[r * 8 + c] !== '.') continue;
      out.push({ from, path: [r * 8 + c], captured: [], promote: r === lastRow(side), capture: false });
    }
  } else {
    for (const d of DIRS) {
      let r = pr + d[0]; let c = pc + d[1];
      while (inb(r, c) && board[r * 8 + c] === '.') {
        out.push({ from, path: [r * 8 + c], captured: [], promote: false, capture: false });
        r += d[0]; c += d[1];
      }
    }
  }
  return out;
}

/**
 * Bir tarafın geçerli hamleleri. Alma zorunludur; birden çok alma yolu varsa
 * yalnızca en çok taş alan yollar geçerlidir.
 */
export function legalMoves(board, side) {
  const work = board.slice();
  let caps = [];
  for (let i = 0; i < 64; i++) {
    if (sideOf(work[i]) === side) caps = caps.concat(captureSequences(work, i));
  }
  if (caps.length) {
    let max = 0;
    for (const m of caps) if (m.captured.length > max) max = m.captured.length;
    return caps.filter((m) => m.captured.length === max);
  }
  let quiet = [];
  for (let i = 0; i < 64; i++) {
    if (sideOf(work[i]) === side) quiet = quiet.concat(quietMoves(work, i));
  }
  return quiet;
}

/** Hamleyi uygular, yeni tahta döndürür (girdi değişmez). */
export function applyMove(board, move) {
  const nb = board.slice();
  const piece = nb[move.from];
  const to = move.path[move.path.length - 1];
  nb[move.from] = '.';
  for (const i of move.captured) nb[i] = '.';
  const side = sideOf(piece);
  const becomesKing = isKing(piece) || move.promote || rowOf(to) === lastRow(side);
  nb[to] = becomesKing ? side.toUpperCase() : side;
  return nb;
}

/** Hamle metni: "c3-c4" ya da "c3xc5xe5". */
export function notation(move) {
  const sep = move.capture ? 'x' : '-';
  return [move.from, ...move.path].map(squareName).join(sep);
}

/**
 * Oyun durumu: devam, galibiyet ya da beraberlik.
 * noProgress: alma ve taş ilerlemesi olmayan ard arda yarım hamle sayısı.
 */
export function gameStatus(board, side, noProgress = 0) {
  const n = countPieces(board);
  if (n.w === 0) return { over: true, winner: 'b', reason: 'Beyazın taşı kalmadı' };
  if (n.b === 0) return { over: true, winner: 'w', reason: 'Siyahın taşı kalmadı' };
  const lm = legalMoves(board, side);
  if (!lm.length) {
    return { over: true, winner: other(side), reason: (side === 'w' ? 'Beyaz' : 'Siyah') + ' hamle yapamıyor' };
  }
  // Tek dama karşı tek dama: sıradaki taraf rakibi alabiliyorsa oyun bitmez.
  if (n.w === 1 && n.b === 1 && n.wKing === 1 && n.bKing === 1 && !lm[0].capture) {
    return { over: true, winner: null, reason: 'İki tarafta da yalnızca birer dama kaldı' };
  }
  if (noProgress >= 40) return { over: true, winner: null, reason: '20 hamledir alma ve taş ilerlemesi yok' };
  return { over: false };
}

/* ---------------- Yapay zekâ ---------------- */

const MAN = 100;
const KING = 350;
const MATE = 100000;

/** Değerlendirme: taş değeri, ilerleme ve dama değeri; sırası gelen tarafın gözünden. */
export function evaluate(board, side) {
  let score = 0;
  for (let i = 0; i < 64; i++) {
    const p = board[i];
    if (p === '.') continue;
    const s = sideOf(p);
    let v;
    if (isKing(p)) v = KING;
    else {
      const adv = s === 'w' ? 7 - rowOf(i) : rowOf(i); // 1..7 arası ilerleme
      v = MAN + adv * 6 + (adv >= 5 ? 10 : 0);
    }
    score += s === side ? v : -v;
  }
  return score;
}

function negamax(board, side, depth, alpha, beta, ext) {
  const moves = legalMoves(board, side);
  if (!moves.length) return -MATE - depth; // sırası gelen kaybetti; daha erken kayıp daha kötü
  if (depth <= 0) {
    // Ufuk etkisini azaltmak için zorunlu almalarda aramayı birkaç hamle uzat.
    if (moves[0].capture && ext < 4) { depth = 1; ext++; } else return evaluate(board, side);
  }
  let best = -Infinity;
  for (const m of moves) {
    const v = -negamax(applyMove(board, m), other(side), depth - 1, -beta, -alpha, ext);
    if (v > best) best = v;
    if (best > alpha) alpha = best;
    if (alpha >= beta) break;
  }
  return best;
}

export const LEVELS = { kolay: 1, orta: 2, zor: 3 };

/**
 * Bilgisayar hamlesi seçer: alfa-beta budamalı minimax (negamax).
 * Kolay seviyede bazen rastgele geçerli hamle oynar. rng test için verilebilir.
 */
export function chooseMove(board, side, level = 'orta', rng = Math.random) {
  const moves = legalMoves(board, side);
  if (!moves.length) return null;
  if (moves.length === 1) return moves[0];
  let depth = LEVELS[level] || 2;
  if (level === 'zor') {
    const n = countPieces(board);
    if (n.w + n.b <= 8) depth = 4; // az taş kaldıysa daha derin ara
  }
  if (level === 'kolay' && rng() < 0.3) return moves[Math.floor(rng() * moves.length)];
  // Kök hamleleri tam pencereyle değerlendirilir (eşit hamleleri ayırt edebilmek için budama yok).
  let bestScore = -Infinity;
  let bestMoves = [];
  for (const m of moves) {
    const v = -negamax(applyMove(board, m), other(side), depth - 1, -Infinity, Infinity, 0);
    if (v > bestScore) { bestScore = v; bestMoves = [m]; } else if (v === bestScore) bestMoves.push(m);
  }
  return bestMoves[Math.floor(rng() * bestMoves.length)];
}
