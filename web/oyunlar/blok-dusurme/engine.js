// Düşen Bloklar motoru: saf mantık, DOM ve zamanlayıcı yok. Arayüz (game.js) ve testler içe aktarır.
// Tahta: ROWS satır, her satır COLS hücre; hücre 0 (boş) ya da parça harfidir ('I','O',...).

export const COLS = 10;
export const ROWS = 20;
export const TYPES = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];

// Her parçanın başlangıç (0°) matrisi.
const SHAPES = {
  I: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  O: [[1, 1], [1, 1]],
  T: [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
  S: [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
  Z: [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
  J: [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
  L: [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
};

export const COLORS = {
  I: '#3ec8e8', O: '#f2d33c', T: '#a866e8', S: '#4ccf6a', Z: '#ef5350', J: '#5b7df0', L: '#f09a36',
};

export function createBoard() {
  return Array.from({ length: ROWS }, () => new Array(COLS).fill(0));
}

/** Matrisi saat yönünde (dir=1) ya da tersine (dir=-1) 90° döndürür. */
export function rotateMatrix(m, dir) {
  const n = m.length;
  const out = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (dir > 0) out[c][n - 1 - r] = m[r][c];
      else out[n - 1 - c][r] = m[r][c];
    }
  }
  return out;
}

/** Yeni parça: yatayda ortada, en üst dolu hücre 0. satırda. */
export function spawn(type) {
  const m = SHAPES[type].map((row) => row.slice());
  const n = m.length;
  let top = 0;
  while (top < n && m[top].every((v) => v === 0)) top++;
  return { type, rot: 0, m, x: Math.floor((COLS - n) / 2), y: -top };
}

/** Parçanın tahtadaki hücreleri: [[x, y], ...]. */
export function cellsOf(p) {
  const out = [];
  for (let r = 0; r < p.m.length; r++) {
    for (let c = 0; c < p.m.length; c++) if (p.m[r][c]) out.push([p.x + c, p.y + r]);
  }
  return out;
}

/** Duvara, tabana ya da dolu hücreye çarpıyor mu? Tavanın üstü (y < 0) serbesttir. */
export function collides(board, p) {
  for (const [x, y] of cellsOf(p)) {
    if (x < 0 || x >= COLS || y >= ROWS) return true;
    if (y >= 0 && board[y][x]) return true;
  }
  return false;
}

export function tryMove(board, p, dx, dy) {
  const q = { ...p, x: p.x + dx, y: p.y + dy };
  return collides(board, q) ? null : q;
}

// Basit duvar tekmesi: döndürme çarparsa sağa/sola/yukarı kaydırılmış konumlar denenir.
const KICKS = [[0, 0], [-1, 0], [1, 0], [-2, 0], [2, 0], [0, -1], [-1, -1], [1, -1]];

export function tryRotate(board, p, dir) {
  if (p.type === 'O') return p; // kare dönmez
  const m = rotateMatrix(p.m, dir);
  const rot = (p.rot + (dir > 0 ? 1 : 3)) % 4;
  for (const [kx, ky] of KICKS) {
    const q = { ...p, m, rot, x: p.x + kx, y: p.y + ky };
    if (!collides(board, q)) return q;
  }
  return null;
}

/** Parçayı olabildiğince aşağı indirir (gölge ve sert düşürme için). */
export function dropped(board, p) {
  let q = p;
  for (;;) {
    const n = tryMove(board, q, 0, 1);
    if (!n) return q;
    q = n;
  }
}

/** Parçayı tahtaya yerleştirir. Tavanın üstünde kalan hücre varsa true (oyun biter). */
export function lockPiece(board, p) {
  let above = false;
  for (const [x, y] of cellsOf(p)) {
    if (y < 0) above = true; else board[y][x] = p.type;
  }
  return above;
}

/** Dolu satırları siler, silinen satır sayısını döndürür. */
export function clearLines(board) {
  let cleared = 0;
  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r].every((v) => v !== 0)) {
      board.splice(r, 1);
      board.unshift(new Array(COLS).fill(0));
      cleared++;
      r++; // aynı indeksi yeniden kontrol et
    }
  }
  return cleared;
}

/** Satır başına puan (1/2/3/4 satır) × seviye. */
export const LINE_POINTS = [0, 100, 300, 500, 800];
export const scoreFor = (lines, level) => (LINE_POINTS[lines] || 0) * level;

/** Her 10 satırda bir seviye atlanır. */
export const levelFor = (totalLines) => 1 + Math.floor(totalLines / 10);

/** Seviyeye göre bir hücre düşme süresi (ms): seviye yükseldikçe hızlanır. */
export const dropInterval = (level) => Math.max(70, Math.round(900 * Math.pow(0.8, level - 1)));

/** Tohumlu rastgele sayı üreteci (mulberry32). */
export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 7'li torba: her yedi parçada her tür bir kez gelir. */
export function createBag(rng = Math.random) {
  let bag = [];
  return () => {
    if (!bag.length) {
      bag = TYPES.slice();
      for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
      }
    }
    return bag.pop();
  };
}

/** Tahtadaki dolu hücre sayısı (test ve bilgi amaçlı). */
export function filledCount(board) {
  let n = 0;
  for (const row of board) for (const v of row) if (v) n++;
  return n;
}
