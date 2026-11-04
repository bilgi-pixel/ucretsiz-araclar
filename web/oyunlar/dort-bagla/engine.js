// Dört Bağla motoru: kurallar + minimax/alfa-beta yapay zekâsı. Saf mantık, DOM yok.
// Hem oyun arayüzü, hem Web Worker hem de testler içe aktarır.
// Tahta: 42 elemanlı dizi, indeks = satır * 7 + sütun; satır 0 en üst, satır 5 en alt.
// Değerler: 0 boş, 1 birinci oyuncu, 2 ikinci oyuncu.

export const COLS = 7;
export const ROWS = 6;
export const CELLS = COLS * ROWS;

export const other = (p) => (p === 1 ? 2 : 1);
export const rowOf = (i) => Math.floor(i / COLS);
export const colOf = (i) => i % COLS;

/** Tohumlu rastgele sayı üreteci (mulberry32). */
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function rnd() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createBoard() { return new Array(CELLS).fill(0); }

/** Altı satırlık metinden tahta kurar (üstten alta). '1' ve '2' taş, diğer her karakter boş. Testler için. */
export function boardFromRows(rows) {
  const b = createBoard();
  rows.forEach((row, r) => {
    for (let c = 0; c < COLS; c++) {
      const ch = row[c];
      b[r * COLS + c] = ch === '1' ? 1 : ch === '2' ? 2 : 0;
    }
  });
  return b;
}

export function boardToRows(b) {
  const rows = [];
  for (let r = 0; r < ROWS; r++) rows.push(b.slice(r * COLS, r * COLS + COLS).map((v) => (v ? String(v) : '.')).join(''));
  return rows;
}

/** Sütuna atılan taşın duracağı satır (en alttaki boş hücre); sütun doluysa ya da geçersizse -1. */
export function dropRow(b, col) {
  if (!Number.isInteger(col) || col < 0 || col >= COLS) return -1;
  for (let r = ROWS - 1; r >= 0; r--) if (!b[r * COLS + col]) return r;
  return -1;
}

export const isValidMove = (b, col) => dropRow(b, col) >= 0;

/** Oynanabilir sütunlar (soldan sağa). */
export function validMoves(b) {
  const out = [];
  for (let c = 0; c < COLS; c++) if (b[c] === 0) out.push(c);
  return out;
}

/** Hamle uygular; yeni tahta ve düşen satırı döndürür. Sütun doluysa ya da oyuncu geçersizse null. */
export function applyMove(b, col, player) {
  if (player !== 1 && player !== 2) return null;
  const row = dropRow(b, col);
  if (row < 0) return null;
  const next = b.slice();
  next[row * COLS + col] = player;
  return { board: next, row, index: row * COLS + col };
}

const DIRS = [[0, 1], [1, 0], [1, 1], [1, -1]];
const inb = (r, c) => r >= 0 && r < ROWS && c >= 0 && c < COLS;

/**
 * `idx` hücresindeki taşın bulunduğu, en az dört taşlık kazanan dizinin hücre indeksleri (uçtan uca sıralı).
 * Kazanan dizi yoksa ya da hücre boşsa null.
 */
export function winLineAt(b, idx) {
  const p = b[idx];
  if (!p) return null;
  const r = rowOf(idx); const c = colOf(idx);
  for (const [dr, dc] of DIRS) {
    const back = []; const fwd = [];
    let rr = r + dr; let cc = c + dc;
    while (inb(rr, cc) && b[rr * COLS + cc] === p) { fwd.push(rr * COLS + cc); rr += dr; cc += dc; }
    rr = r - dr; cc = c - dc;
    while (inb(rr, cc) && b[rr * COLS + cc] === p) { back.push(rr * COLS + cc); rr -= dr; cc -= dc; }
    const run = [...back.reverse(), idx, ...fwd];
    if (run.length >= 4) return run;
  }
  return null;
}

/** Tüm tahtayı tarar: { player, line } ya da null. */
export function findWin(b) {
  for (let i = 0; i < CELLS; i++) {
    if (!b[i]) continue;
    const line = winLineAt(b, i);
    if (line) return { player: b[i], line };
  }
  return null;
}

export const isFull = (b) => b.every((v) => v !== 0);
/** Tahta dolu ve kimse dört yapmamışsa beraberlik. */
export const isDraw = (b) => isFull(b) && !findWin(b);

// ---------- Yapay zekâ: negamax + alfa-beta ----------

const WIN = 100000;
const INF = 1e9;
const ORDER = [3, 2, 4, 1, 5, 0, 6]; // merkezden dışa: daha iyi budama

// 69 adet dörtlü pencere (yatay 24, dikey 21, çapraz 24).
const WINDOWS = (() => {
  const w = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      for (const [dr, dc] of DIRS) {
        const er = r + dr * 3; const ec = c + dc * 3;
        if (!inb(er, ec)) continue;
        w.push([r * COLS + c, (r + dr) * COLS + c + dc, (r + dr * 2) * COLS + c + dc * 2, er * COLS + ec]);
      }
    }
  }
  return w;
})();

/** Sezgisel değerlendirme: sırası gelen oyuncu (`me`) açısından. Üçlüler, ikililer ve merkez sütun. */
export function evaluate(b, me) {
  const opp = other(me);
  let s = 0;
  for (const w of WINDOWS) {
    let m = 0; let o = 0;
    for (let k = 0; k < 4; k++) { const v = b[w[k]]; if (v === me) m++; else if (v === opp) o++; }
    if (m && o) continue;
    if (m === 3) s += 50; else if (m === 2) s += 8; else if (m === 1) s += 1;
    else if (o === 3) s -= 60; else if (o === 2) s -= 9; else if (o === 1) s -= 1;
  }
  for (let r = 0; r < ROWS; r++) {
    const v = b[r * COLS + 3];
    if (v === me) s += 6; else if (v === opp) s -= 6;
  }
  return s;
}

/** idx hücresine az önce konan `p` taşı dört yaptı mı? (hızlı, dizi oluşturmaz) */
function winsAt(b, idx, p) {
  const r = (idx / COLS) | 0; const c = idx % COLS;
  for (let d = 0; d < 4; d++) {
    const dr = DIRS[d][0]; const dc = DIRS[d][1];
    let n = 1;
    for (let k = 1; k < 4; k++) { const rr = r + dr * k; const cc = c + dc * k; if (!inb(rr, cc) || b[rr * COLS + cc] !== p) break; n++; }
    for (let k = 1; k < 4; k++) { const rr = r - dr * k; const cc = c - dc * k; if (!inb(rr, cc) || b[rr * COLS + cc] !== p) break; n++; }
    if (n >= 4) return true;
  }
  return false;
}

/** Zaman aşımı kontrolü: her ~1000 düğümde bir saate bakar. */
function expired(ctx) {
  if (!ctx.deadline) return false;
  if ((++ctx.nodes & 1023) === 0 && Date.now() > ctx.deadline) ctx.timeout = true;
  return ctx.timeout;
}

function negamax(b, top, player, depth, alpha, beta, ply, ctx) {
  if (expired(ctx)) return 0;
  if (depth === 0) return evaluate(b, player);
  let best = -INF;
  let any = false;
  for (let k = 0; k < COLS; k++) {
    const col = ORDER[k];
    const row = top[col];
    if (row < 0) continue;
    any = true;
    const idx = row * COLS + col;
    b[idx] = player; top[col] = row - 1; ctx.filled++;
    let score;
    if (winsAt(b, idx, player)) score = WIN - ply;
    else if (ctx.filled === CELLS) score = 0;
    else score = -negamax(b, top, other(player), depth - 1, -beta, -alpha, ply + 1, ctx);
    b[idx] = 0; top[col] = row; ctx.filled--;
    if (ctx.timeout) return 0;
    if (score > best) best = score;
    if (best > alpha) alpha = best;
    if (alpha >= beta) break;
  }
  return any ? best : 0;
}

/**
 * Kök arama: her sütun için puan döndürür (oynanamayanlar null).
 * Kök hamleler tam doğrulukla (en iyiyle eşit olanlar dahil) puanlanır; böylece eşitler arasından rastgele seçilebilir.
 * Zaman dolarsa `complete: false` döner ve puanlar kullanılmamalıdır.
 */
function searchRoot(board, player, depth, ctx) {
  const b = board.slice();
  const top = new Array(COLS).fill(-1);
  for (let c = 0; c < COLS; c++) top[c] = dropRow(b, c);
  ctx.filled = b.reduce((a, v) => a + (v ? 1 : 0), 0);
  const scores = new Array(COLS).fill(null);
  let best = -INF;
  for (let k = 0; k < COLS; k++) {
    const col = ORDER[k];
    const row = top[col];
    if (row < 0) continue;
    const idx = row * COLS + col;
    b[idx] = player; top[col] = row - 1; ctx.filled++;
    let score;
    if (winsAt(b, idx, player)) score = WIN;
    else if (ctx.filled === CELLS) score = 0;
    else score = -negamax(b, top, other(player), depth - 1, -INF, -(best - 1), 1, ctx);
    b[idx] = 0; top[col] = row; ctx.filled--;
    if (ctx.timeout) return { complete: false, scores };
    scores[col] = score;
    if (score > best) best = score;
    if (score >= WIN) break; // hemen kazanan hamle bulundu
  }
  return { complete: true, scores, best };
}

/** Seviye → arama derinliği ve süre sınırı. */
export const LEVELS = {
  easy: { depth: 2, timeMs: 0 },
  medium: { depth: 4, timeMs: 0 },
  hard: { depth: 7, timeMs: 1500 },
};

/**
 * Bilgisayarın hamlesi: { col, scores, depth }.
 * `depth` verilmezse seviyeye göre seçilir. Derin aramalarda yinelemeli derinleşme kullanılır;
 * süre sınırı dolarsa son tamamlanan derinliğin sonucu döner (en az derinlik 1 her zaman tamamlanır).
 * Eşit puanlı hamleler arasından `rnd` ile seçilir; rnd null ise ilk (merkeze en yakın) hamle alınır.
 */
export function bestMove(board, player, level = 'hard', rnd = Math.random, override = {}) {
  const cfg = { ...(LEVELS[level] || LEVELS.hard), ...override };
  const moves = validMoves(board);
  if (!moves.length) return { col: -1, scores: [], depth: 0 };
  let result = null;
  let usedDepth = 0;
  const deadline = cfg.timeMs ? Date.now() + cfg.timeMs : 0;
  for (let d = 1; d <= cfg.depth; d++) {
    const ctx = { deadline: d > 1 ? deadline : 0, nodes: 0, timeout: false, filled: 0 };
    const res = searchRoot(board, player, d, ctx);
    if (!res.complete) break;
    result = res;
    usedDepth = d;
    if (res.best >= WIN - 50 && d >= 2) break; // kesin kazanç bulundu
    if (res.best <= -(WIN - 50) && d >= 4) break; // kesin kayıp: daha derine bakmak değişmez
  }
  const best = result.best;
  // Kök aramada en iyiden kötü hamlelerin puanı sınır değeridir; yalnızca en iyiye eşit olanlar aday.
  const ties = [];
  for (const c of ORDER) if (result.scores[c] !== null && result.scores[c] === best) ties.push(c);
  const col = rnd ? ties[Math.floor(rnd() * ties.length) % ties.length] : ties[0];
  return { col, scores: result.scores, depth: usedDepth };
}
