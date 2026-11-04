// Kutu kapmaca (dots and boxes) motoru: saf mantık, DOM yok. Arayüz ve testler içe aktarır.
// Izgara n x n kutudur (n+1) x (n+1) nokta vardır. Çizgi (kenar) numaraları:
//   yatay çizgi h(r,c) = r*n + c            (r: 0..n, c: 0..n-1)  -> toplam (n+1)*n
//   dikey çizgi v(r,c) = H + r*(n+1) + c    (r: 0..n-1, c: 0..n)  -> toplam n*(n+1)
// Kutu b = r*n + c; dört kenarı: üst h(r,c), alt h(r+1,c), sol v(r,c), sağ v(r,c+1).
// Oyuncular 1 ve 2'dir. Kutuyu tamamlayan çizgiyi çeken oyuncu kutuyu alır ve tekrar oynar.

export const SIZES = [3, 5, 7];
export const other = (p) => (p === 1 ? 2 : 1);
export const edgeCount = (n) => 2 * n * (n + 1);
const hCount = (n) => (n + 1) * n;

const adjCache = new Map();
/** Kutu -> kenarlar ve kenar -> kutular komşuluk tabloları (boyut başına bir kez hesaplanır). */
export function adjacency(n) {
  if (adjCache.has(n)) return adjCache.get(n);
  const H = hCount(n);
  const E = edgeCount(n);
  const boxEdges = [];
  const edgeBoxes = Array.from({ length: E }, () => []);
  for (let b = 0; b < n * n; b++) {
    const r = Math.floor(b / n);
    const c = b % n;
    const es = [r * n + c, (r + 1) * n + c, H + r * (n + 1) + c, H + r * (n + 1) + c + 1];
    boxEdges.push(es);
    for (const e of es) edgeBoxes[e].push(b);
  }
  const a = { boxEdges, edgeBoxes, H, E };
  adjCache.set(n, a);
  return a;
}

/** Kenar numarasından { type: 'h' | 'v', r, c } (nokta ızgarasındaki konum). */
export function edgeInfo(n, e) {
  const H = hCount(n);
  if (e < H) return { type: 'h', r: Math.floor(e / n), c: e % n };
  const k = e - H;
  return { type: 'v', r: Math.floor(k / (n + 1)), c: k % (n + 1) };
}

export function edgeName(n, e) {
  const i = edgeInfo(n, e);
  return i.type === 'h' ? `yatay çizgi, ${i.r + 1}. nokta satırı, ${i.c + 1}. kutu sütunu` : `dikey çizgi, ${i.r + 1}. kutu satırı, ${i.c + 1}. nokta sütunu`;
}

/** Yeni oyun durumu. `edges[e]` çizgiyi çeken oyuncu (0 = çizilmemiş), `owners[b]` kutuyu alan oyuncu. */
export function createState(n, first = 1) {
  return { n, edges: new Array(edgeCount(n)).fill(0), owners: new Array(n * n).fill(0), scores: [0, 0], turn: first };
}

export function cloneState(s) {
  return { n: s.n, edges: s.edges.slice(), owners: s.owners.slice(), scores: s.scores.slice(), turn: s.turn };
}

/** Kutunun çizilmiş kenar sayısı. */
export function sidesOf(state, b) {
  let k = 0;
  for (const e of adjacency(state.n).boxEdges[b]) if (state.edges[e]) k++;
  return k;
}

export const isOver = (state) => state.scores[0] + state.scores[1] === state.n * state.n;

/**
 * Çizgiyi çeker. { state, completed: [kutular], extraTurn } döndürür (girdiyi değiştirmez).
 * Kutu tamamlandıysa sıra aynı oyuncuda kalır.
 */
export function play(state, e) {
  if (e < 0 || e >= state.edges.length || state.edges[e]) throw new Error('Geçersiz çizgi: ' + e);
  const s = cloneState(state);
  const p = s.turn;
  s.edges[e] = p;
  const completed = [];
  for (const b of adjacency(s.n).edgeBoxes[e]) {
    if (sidesOf(s, b) === 4) { s.owners[b] = p; s.scores[p - 1]++; completed.push(b); }
  }
  const extraTurn = completed.length > 0 && !isOver(s);
  if (!completed.length) s.turn = other(p);
  return { state: s, completed, extraTurn };
}

/** Oyun sonucu: { winner: 1 | 2 | null, scores }. */
export function result(state) {
  const [a, b] = state.scores;
  return { winner: a > b ? 1 : b > a ? 2 : null, scores: [a, b] };
}

export function undrawn(state) {
  const out = [];
  for (let e = 0; e < state.edges.length; e++) if (!state.edges[e]) out.push(e);
  return out;
}

/** Üç kenarı çizili, alınabilir kutular: [{ box, edge }] (edge = eksik kenar). */
export function capturable(state) {
  const adj = adjacency(state.n);
  const out = [];
  for (let b = 0; b < state.n * state.n; b++) {
    if (state.owners[b]) continue;
    let k = 0;
    let missing = -1;
    for (const e of adj.boxEdges[b]) { if (state.edges[e]) k++; else missing = e; }
    if (k === 3) out.push({ box: b, edge: missing });
  }
  return out;
}

/** Güvenli çizgiler: çizilince hiçbir kutu üçüncü kenarına ulaşmayan (rakibe kutu vermeyen) çizgiler. */
export function safeEdges(state) {
  const adj = adjacency(state.n);
  const sides = boxSides(state);
  const out = [];
  for (let e = 0; e < state.edges.length; e++) {
    if (state.edges[e]) continue;
    if (adj.edgeBoxes[e].every((b) => sides[b] < 2)) out.push(e);
  }
  return out;
}

function boxSides(state) {
  const adj = adjacency(state.n);
  const sides = new Uint8Array(state.n * state.n);
  for (let b = 0; b < sides.length; b++) for (const e of adj.boxEdges[b]) if (state.edges[e]) sides[b]++;
  return sides;
}

/** Çizgi çekip arkadan gelen bütün alınabilir kutuları hemen alan benzetim; alınan kutu sayısını döndürür. */
function simulateGreedy(n, edges, sides, first) {
  const adj = adjacency(n);
  let count = 0;
  const draw = (e) => {
    edges[e] = 1;
    for (const b of adj.edgeBoxes[e]) if (++sides[b] === 4) count++;
  };
  draw(first);
  let found = true;
  while (found) {
    found = false;
    for (let b = 0; b < sides.length; b++) {
      if (sides[b] !== 3) continue;
      for (const e of adj.boxEdges[b]) if (!edges[e]) { draw(e); found = true; break; }
    }
  }
  return count;
}

/** Çizgi `e` çekilirse rakibin hemen alabileceği kutu sayısı (kendi alınanlar dahil değil, yalnızca verilenler). */
function handoutCost(state, e, sides) {
  const edges = Uint8Array.from(state.edges, (x) => (x ? 1 : 0));
  return simulateGreedy(state.n, edges, Uint8Array.from(sides), e);
}

const pick = (arr, rng) => arr[Math.floor(rng() * arr.length)];

/** Boş (alınmamış) kutulardan, iki kenarı çizili olanların zincir uzunlukları (kavşaksız bileşenler). */
function chainLengths(n, edges, sides, owners) {
  const adj = adjacency(n);
  const seen = new Uint8Array(n * n);
  const lens = [];
  for (let b = 0; b < n * n; b++) {
    if (seen[b] || owners[b] || sides[b] !== 2) continue;
    let size = 0;
    const stack = [b];
    seen[b] = 1;
    while (stack.length) {
      const x = stack.pop();
      size++;
      for (const e of adj.boxEdges[x]) {
        if (edges[e]) continue;
        for (const y of adj.edgeBoxes[e]) if (y !== x && !seen[y] && !owners[y] && sides[y] === 2) { seen[y] = 1; stack.push(y); }
      }
    }
    lens.push(size);
  }
  return lens;
}

/** Tam çözüm: kalan çizgi azsa oyunu sonuna kadar hesaplar. Sıradaki oyuncu için { edge, value } (kutu farkı). */
export function solveExact(state) {
  const n = state.n;
  const adj = adjacency(n);
  const U = undrawn(state);
  const k = U.length;
  const sides = boxSides(state);
  const memo = new Int8Array(1 << k).fill(-128);
  const full = (1 << k) - 1;
  const step = (i) => {
    const e = U[i];
    let c = 0;
    for (const b of adj.edgeBoxes[e]) if (++sides[b] === 4) c++;
    return c;
  };
  const unstep = (i) => { for (const b of adj.edgeBoxes[U[i]]) sides[b]--; };
  const f = (mask) => {
    if (mask === full) return 0;
    const m = memo[mask];
    if (m !== -128) return m;
    let best = -127;
    for (let i = 0; i < k; i++) {
      if ((mask >> i) & 1) continue;
      const c = step(i);
      const v = c > 0 ? c + f(mask | (1 << i)) : -f(mask | (1 << i));
      unstep(i);
      if (v > best) best = v;
    }
    memo[mask] = best;
    return best;
  };
  let bestEdge = U[0];
  let bestV = -127;
  let bestCaptures = false;
  for (let i = 0; i < k; i++) {
    const c = step(i);
    const v = c > 0 ? c + f(1 << i) : -f(1 << i);
    unstep(i);
    // Eşit değerde kutu tamamlayan çizgi tercih edilir.
    if (v > bestV || (v === bestV && c > 0 && !bestCaptures)) { bestV = v; bestEdge = U[i]; bestCaptures = c > 0; }
  }
  return { edge: bestEdge, value: bestV };
}

export const EXACT_LIMIT = 16;
export const LEVELS = ['kolay', 'orta', 'zor'];

/**
 * Bilgisayarın çizgisini seçer (tek çizgi; kutu alırsa arayüz yeniden sorar).
 * kolay: rastgele. orta: kutu alabiliyorsa alır, yoksa güvenli çizgi, o da yoksa en az kutu verir.
 * zor: orta + zincir stratejisi: zinciri yerken son iki kutuyu çift-çapraz ile bırakıp kontrolü korur,
 * zorunlu açılışta en küçük zinciri verir, kalan çizgi azsa oyunu sonuna kadar hesaplar.
 */
export function chooseEdge(state, level = 'orta', rng = Math.random) {
  const free = undrawn(state);
  if (!free.length) return -1;
  if (level === 'kolay') return pick(free, rng);

  const n = state.n;
  const adj = adjacency(n);
  const caps = capturable(state);

  if (level === 'zor' && free.length <= EXACT_LIMIT) return solveExact(state).edge;

  if (caps.length) {
    if (level === 'zor') {
      const dd = doubleDealEdge(state, caps);
      if (dd !== -1) return dd;
    }
    return caps[0].edge;
  }

  const safe = safeEdges(state);
  if (safe.length) return pick(safe, rng);

  // Güvenli çizgi kalmadı: rakibe en az kutu veren çizgiyi aç.
  const sides = boxSides(state);
  let bestCost = Infinity;
  let pool = [];
  for (const e of free) {
    const cost = handoutCost(state, e, sides);
    // Eşit maliyette: 2'lik zincirde ortadan kes (iki ayrı kutu verir, rakip çift-çapraz yapamaz).
    const hard = level === 'zor' ? adj.edgeBoxes[e].filter((b) => sides[b] === 2).length : 0;
    const key = cost * 10 - hard;
    if (key < bestCost) { bestCost = key; pool = [e]; } else if (key === bestCost) pool.push(e);
  }
  return pick(pool, rng);
}

/**
 * Çift-çapraz (double-dealing): zincirin son iki kutusunu almayıp uç çizgiyi çekerek rakibe tek hamlelik iki kutu
 * verir ve sırayı rakibe geçirir. Yalnızca kalan oyunda uzun zincir varsa ve kutuları sonuna kadar almak bizi
 * zorunlu açılışa mecbur bırakacaksa yapılır. Uygun değilse -1.
 */
function doubleDealEdge(state, caps) {
  const n = state.n;
  const adj = adjacency(n);
  const sides = boxSides(state);
  // Hepsini alırsak ne kalır?
  const edges = Uint8Array.from(state.edges, (x) => (x ? 1 : 0));
  const sim = Uint8Array.from(sides);
  const owners = state.owners.slice();
  let restFree = edges.length - edges.reduce((a, x) => a + x, 0);
  if (restFree === 0) return -1;
  // Her alınabilir kutuyu tek tek al (benzetim).
  const draw = (e) => { edges[e] = 1; restFree--; for (const b of adj.edgeBoxes[e]) { if (++sim[b] === 4) owners[b] = 9; } };
  let found = true;
  while (found) {
    found = false;
    for (let b = 0; b < sim.length; b++) {
      if (sim[b] !== 3 || owners[b]) continue;
      for (const e of adj.boxEdges[b]) if (!edges[e]) { draw(e); found = true; break; }
    }
  }
  if (restFree === 0) return -1;
  // Alım sonrası güvenli çizgi varsa kontrol zaten bizdedir.
  for (let e = 0; e < edges.length; e++) {
    if (!edges[e] && adj.edgeBoxes[e].every((b) => sim[b] < 2)) return -1;
  }
  const lens = chainLengths(n, edges, sim, owners);
  if (!lens.some((l) => l >= 3)) return -1;
  // Çift-çapraz adayı: Y üç kenarlı, eksik kenarı Z'ye gidiyor; Z'nin iki kenarı çizili.
  if (caps.length !== 1) return -1;
  const { box: Y, edge: mY } = caps[0];
  const Z = adj.edgeBoxes[mY].find((b) => b !== Y);
  if (Z === undefined || state.owners[Z] || sides[Z] !== 2) return -1;
  const eZ = adj.boxEdges[Z].find((e) => !state.edges[e] && e !== mY);
  if (eZ === undefined) return -1;
  // eZ başka bir kutuyu üçüncü kenara taşımamalı.
  for (const b of adj.edgeBoxes[eZ]) if (b !== Z && sides[b] + 1 >= 3) return -1;
  return eZ;
}
