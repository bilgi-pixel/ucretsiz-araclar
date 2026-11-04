// Taş eşleştirme (solitaire) motoru — saf mantık (DOM yok), tarayıcıda ve testlerde import edilebilir.
// Koordinatlar yarım taş birimindedir: bir taş x..x+2 ve y..y+2 aralığını kaplar; z katman numarasıdır.
// Serbest taş: üzerinde taş yok VE sol ya da sağ kenarı açık.

export const FACE_COUNT = 42;
// Yüz numaraları: 0-8 nokta, 9-17 bambu, 18-26 sayı, 27-30 yön, 31-33 ejder, 34-37 çiçek, 38-41 mevsim.
// Çiçekler kendi aralarında, mevsimler kendi aralarında eşleşir; diğerleri yalnızca aynı yüzle.
export const groupOf = (face) => (face >= 38 ? 101 : face >= 34 ? 100 : face);
export const matches = (a, b) => groupOf(a) === groupOf(b);

/** Tohumlu rastgele sayı üreteci (mulberry32). */
export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle(arr, rng = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------------------------------------------------------------------------
// Yerleşimler
// ---------------------------------------------------------------------------
const range = (from, to, step = 2) => {
  const out = [];
  for (let v = from; v <= to; v += step) out.push(v);
  return out;
};
const rows = (list, z = 0) => list.flatMap(([y, x0, x1]) => range(x0, x1).map((x) => [x, y, z]));

function turtle() {
  const p = rows([[0, 2, 24], [2, 6, 20], [4, 4, 22], [6, 2, 24], [8, 2, 24], [10, 4, 22], [12, 6, 20], [14, 2, 24]], 0);
  p.push([0, 7, 0], [26, 7, 0], [28, 7, 0]);
  p.push(...rows(range(2, 12).map((y) => [y, 8, 18]), 1));
  p.push(...rows(range(4, 10).map((y) => [y, 10, 16]), 2));
  p.push(...rows([[6, 12, 14], [8, 12, 14]], 3));
  p.push([13, 7, 4]);
  return p;
}
function pyramid() {
  return [
    ...rows(range(0, 10).map((y) => [y, 0, 14]), 0),
    ...rows(range(2, 8).map((y) => [y, 2, 12]), 1),
    ...rows([[4, 4, 10], [6, 4, 10]], 2),
  ];
}
function fort() {
  return [
    ...rows(range(0, 6).map((y) => [y, 0, 18]), 0),
    ...rows([[2, 2, 16], [4, 2, 16]], 1),
    ...rows([[3, 6, 12]], 2),
  ];
}

export const LAYOUTS = {
  kaplumbaga: { name: 'Kaplumbağa (klasik)', positions: turtle() },
  piramit: { name: 'Piramit', positions: pyramid() },
  kale: { name: 'Kale', positions: fort() },
};
export const LAYOUT_KEYS = Object.keys(LAYOUTS);

// ---------------------------------------------------------------------------
// Tahta: komşuluk listeleri
// ---------------------------------------------------------------------------
export function makeBoard(positions) {
  const n = positions.length;
  const cover = Array.from({ length: n }, () => []); // bu taşın üstünü kapatanlar
  const under = Array.from({ length: n }, () => []); // bu taşın altında kalanlar
  const left = Array.from({ length: n }, () => []);
  const right = Array.from({ length: n }, () => []);
  for (let i = 0; i < n; i++) {
    const [xi, yi, zi] = positions[i];
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      const [xj, yj, zj] = positions[j];
      const dx = xj - xi;
      const dy = yj - yi;
      if (zj === zi + 1 && Math.abs(dx) < 2 && Math.abs(dy) < 2) { cover[i].push(j); under[j].push(i); }
      if (zj === zi && Math.abs(dy) < 2) {
        if (dx === -2) left[i].push(j);
        else if (dx === 2) right[i].push(j);
      }
    }
  }
  return { positions, n, cover, under, left, right };
}

/** alive: i. konumda taş var mı. Serbest = üstü boş ve (sol ya da sağ boş). */
export function isFree(board, alive, i) {
  if (!alive[i]) return false;
  if (board.cover[i].some((j) => alive[j])) return false;
  const l = board.left[i].some((j) => alive[j]);
  const r = board.right[i].some((j) => alive[j]);
  return !(l && r);
}

export const freeTiles = (board, alive) => {
  const out = [];
  for (let i = 0; i < board.n; i++) if (isFree(board, alive, i)) out.push(i);
  return out;
};

/** Serbest ve eşleşen tüm çiftler [i, j] (i < j). */
export function freePairs(board, alive, faces) {
  const free = freeTiles(board, alive);
  const out = [];
  for (let a = 0; a < free.length; a++) {
    for (let b = a + 1; b < free.length; b++) {
      if (matches(faces[free[a]], faces[free[b]])) out.push([free[a], free[b]]);
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Çözülebilir dağıtım: ters inşa
// ---------------------------------------------------------------------------
// Taşlar, oynanışın tersi sırayla çiftler halinde yerleştirilir. Her çift yerleştirildiği anda (o ana kadarki
// taşlarla birlikte) serbest olmak zorundadır; üstteki taş altındakinden sonra konur. Böylece yerleştirme
// sırasının tersi, oyunda geçerli bir çözüm olur.

/** Tutulacak konumlar (indeks listesi) için çift yapısı üretir: [[a, b], …] (çözüm sırasının tersi). */
function buildPairs(board, indices, rng) {
  const inSet = new Uint8Array(board.n);
  indices.forEach((i) => { inSet[i] = 1; });
  for (let attempt = 0; attempt < 400; attempt++) {
    const filled = new Uint8Array(board.n);
    const remaining = new Set(indices);
    const pairs = [];
    // Bir konum, ancak altındaki bütün taşlar yerleştirildiyse eklenebilir; sol ve sağı birlikte dolu olmamalı.
    const placeable = (p, extra) => {
      for (const u of board.under[p]) if (inSet[u] && !filled[u] && u !== extra) return false;
      return true;
    };
    const freeNow = (p, extra) => {
      // p yerleştirildiğinde (filled + extra ile) serbest mi
      for (const c of board.cover[p]) if (filled[c] || c === extra) return false;
      const l = board.left[p].some((j) => filled[j] || j === extra);
      const r = board.right[p].some((j) => filled[j] || j === extra);
      return !(l && r);
    };
    // Boş kalan bir taşın solunda ve sağında (zincir boyunca) dolu taş varsa, o taş hiçbir zaman serbest yerleştirilemez.
    const reachFilled = (q, side) => {
      const seen = new Set([q]);
      const stack = [q];
      while (stack.length) {
        const cur = stack.pop();
        for (const j of board[side][cur]) {
          if (!inSet[j] || seen.has(j)) continue;
          if (filled[j]) return true;
          seen.add(j);
          stack.push(j);
        }
      }
      return false;
    };
    const makesDead = (a, b) => {
      filled[a] = 1; filled[b] = 1;
      let dead = false;
      const za = board.positions[a][2];
      const zb = board.positions[b][2];
      for (const q of remaining) {
        if (q === a || q === b) continue;
        const zq = board.positions[q][2];
        if (zq !== za && zq !== zb) continue;
        if (reachFilled(q, 'left') && reachFilled(q, 'right')) { dead = true; break; }
      }
      filled[a] = 0; filled[b] = 0;
      return dead;
    };
    let ok = true;
    while (remaining.size) {
      const cand = shuffle([...remaining].filter((p) => placeable(p, -1) && freeNow(p, -1)), rng);
      let found = null;
      for (let x = 0; x < cand.length && !found; x++) {
        for (let y = x + 1; y < cand.length; y++) {
          const a = cand[x];
          const b = cand[y];
          if (!placeable(a, b) || !placeable(b, a)) continue;
          if (!freeNow(a, b) || !freeNow(b, a)) continue;
          if (makesDead(a, b)) continue;
          found = [a, b];
          break;
        }
      }
      if (!found) { ok = false; break; }
      filled[found[0]] = 1;
      filled[found[1]] = 1;
      remaining.delete(found[0]);
      remaining.delete(found[1]);
      pairs.push(found);
    }
    if (ok) return pairs;
  }
  return null;
}

/** Eşleşen yüz çiftleri listesi (rastgele sırada): 34 normal yüz × 2 çift + çiçek ve mevsim çiftleri. */
export function allPairFaces(rng) {
  const out = [];
  for (let f = 0; f < 34; f++) out.push([f, f], [f, f]);
  const flowers = shuffle([34, 35, 36, 37], rng);
  const seasons = shuffle([38, 39, 40, 41], rng);
  out.push([flowers[0], flowers[1]], [flowers[2], flowers[3]], [seasons[0], seasons[1]], [seasons[2], seasons[3]]);
  return shuffle(out, rng);
}

/** Verilen konumlara çözülebilir bir yüz dağılımı yapar. faces: konum indeksine göre yüz dizisi (yoksa -1). */
export function dealFaces(board, indices, pairFaces, rng) {
  const pairs = buildPairs(board, indices, rng);
  if (!pairs) return null;
  const faces = new Array(board.n).fill(-1);
  const pf = shuffle(pairFaces, rng);
  pairs.forEach(([a, b], k) => {
    const [fa, fb] = pf[k];
    faces[a] = fa;
    faces[b] = fb;
  });
  faces.solution = pairs.slice().reverse(); // oynanış sırasıyla bilinen çözüm
  return faces;
}

// ---------------------------------------------------------------------------
// Oyun durumu
// ---------------------------------------------------------------------------
export function createGame(layoutKey, rng = Math.random) {
  const layout = LAYOUTS[layoutKey] || LAYOUTS.kaplumbaga;
  const board = makeBoard(layout.positions);
  const indices = board.positions.map((_, i) => i);
  const pf = allPairFaces(rng).slice(0, board.n / 2);
  let faces = dealFaces(board, indices, pf, rng);
  // Çok nadir: yapı kurulamadıysa (olmamalı) basit sürüm
  if (!faces) faces = dealFaces(board, indices, pf, rng) || indices.map((i) => Math.floor(i / 2) % 34);
  return {
    solution: faces.solution || null,
    key: LAYOUTS[layoutKey] ? layoutKey : 'kaplumbaga',
    board,
    faces,
    alive: new Uint8Array(board.n).fill(1),
    remaining: board.n,
    history: [],
    shuffles: 0,
    undos: 0,
  };
}

/** İki taşı kaldır (serbest ve eşleşiyorsa). */
export function removePair(g, i, j) {
  if (i === j || !isFree(g.board, g.alive, i) || !isFree(g.board, g.alive, j)) return false;
  if (!matches(g.faces[i], g.faces[j])) return false;
  g.alive[i] = 0;
  g.alive[j] = 0;
  g.remaining -= 2;
  g.history.push([i, j]);
  return true;
}

export function undo(g) {
  const last = g.history.pop();
  if (!last) return false;
  g.alive[last[0]] = 1;
  g.alive[last[1]] = 1;
  g.remaining += 2;
  g.undos += 1;
  return true;
}

export const isWon = (g) => g.remaining === 0;
export const hasMoves = (g) => g.remaining > 0 && freePairs(g.board, g.alive, g.faces).length > 0;
export const isStuck = (g) => g.remaining > 0 && !hasMoves(g);

/** Kalan taşları yeniden dağıt; sonuç yine çözülebilir. Geri alma geçmişi temizlenir. */
export function reshuffle(g, rng = Math.random) {
  const idx = [];
  for (let i = 0; i < g.board.n; i++) if (g.alive[i]) idx.push(i);
  if (!idx.length) return false;
  // Kalan yüzleri çift yap: çiçek ve mevsim grupları kendi içinde, diğerleri aynı yüzle
  const byGroup = new Map();
  for (const i of idx) {
    const k = groupOf(g.faces[i]);
    if (!byGroup.has(k)) byGroup.set(k, []);
    byGroup.get(k).push(g.faces[i]);
  }
  const pairFaces = [];
  for (const list of byGroup.values()) {
    const s = shuffle(list, rng);
    for (let k = 0; k + 1 < s.length; k += 2) pairFaces.push([s[k], s[k + 1]]);
  }
  const faces = dealFaces(g.board, idx, pairFaces, rng);
  if (!faces) return false;
  for (const i of idx) g.faces[i] = faces[i];
  g.solution = faces.solution;
  g.history = [];
  g.shuffles += 1;
  return true;
}

// ---------------------------------------------------------------------------
// Çözücü: derinlik öncelikli arama, durum belleği ile
// ---------------------------------------------------------------------------
/** Geçerli konumdan tamamlanan bir çiftler dizisi bulur; bulamazsa (ya da sınır aşılırsa) null döner. */
export function solve(g, limit = 80000) {
  const { board, faces } = g;
  const alive = Uint8Array.from(g.alive);
  // Oyuncu bilinen çözümden sapmadıysa doğrudan onu ver
  if (g.solution) {
    const rest = g.solution.filter(([p, q]) => g.alive[p] && g.alive[q]);
    if (rest.length * 2 === g.remaining) return rest;
  }
  const dead = new Set();
  const path = [];
  let nodes = 0;
  let left = g.remaining;
  const z = (i) => board.positions[i][2];
  function rec() {
    if (left === 0) return true;
    if (++nodes > limit) return false;
    const key = alive.join('');
    if (dead.has(key)) return false;
    let pairs = freePairs(board, alive, faces);
    // Grubun kalan son iki taşı ise bu çift güvenlidir (başka seçenek yok); dallanmadan oyna
    const cnt = new Map();
    for (let i = 0; i < board.n; i++) if (alive[i]) cnt.set(groupOf(faces[i]), (cnt.get(groupOf(faces[i])) || 0) + 1);
    const safe = pairs.find(([p, q]) => cnt.get(groupOf(faces[p])) === 2);
    if (safe) pairs = [safe];
    else {
      // Çok taş serbest bırakan ve üst katmandaki çiftler önce denenir
      const score = ([p, q]) => {
        alive[p] = 0; alive[q] = 0;
        let free = 0;
        for (const t of [...board.under[p], ...board.under[q], ...board.left[p], ...board.right[p], ...board.left[q], ...board.right[q]]) if (isFree(board, alive, t)) free++;
        alive[p] = 1; alive[q] = 1;
        return free * 4 + z(p) + z(q);
      };
      pairs = pairs.map((pr) => [pr, score(pr)]).sort((u, v) => v[1] - u[1]).map((u) => u[0]);
    }
    for (const [a, b] of pairs) {
      alive[a] = 0; alive[b] = 0; left -= 2;
      path.push([a, b]);
      if (rec()) return true;
      path.pop();
      alive[a] = 1; alive[b] = 1; left += 2;
      if (nodes > limit) return false;
    }
    dead.add(key);
    return false;
  }
  return rec() ? path.slice() : null;
}

/** İpucu: çözüme götüren bir çift; çözücü sonuç veremezse herhangi bir serbest çift. */
export function hint(g) {
  const sol = solve(g, 30000);
  if (sol && sol.length) return sol[0];
  const pairs = freePairs(g.board, g.alive, g.faces);
  return pairs.length ? pairs[0] : null;
}
