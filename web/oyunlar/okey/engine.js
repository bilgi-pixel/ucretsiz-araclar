// Okey motoru — saf mantık (DOM yok), tarayıcıda ve testlerde import edilebilir.
// Taş numarası (0–105):
//   0–103: kopya * 52 + renk * 13 + (sayı - 1)   (kopya 0/1, renk 0–3, sayı 1–13)
//   104, 105: sahte okey
// Renkler: 0 sarı, 1 mavi, 2 siyah, 3 kırmızı.
// Oyuncular: 0 = insan (alt), 1 = sağ, 2 = karşı, 3 = sol. Sıra 0 → 1 → 2 → 3 yönünde ilerler;
// oyuncu p yandan çekerken bir önceki oyuncunun (p + 3) % 4 attığı son taşı alır.

export const COLORS = ['sarı', 'mavi', 'siyah', 'kırmızı'];
export const FAKE_A = 104;
export const FAKE_B = 105;

export const isFake = (id) => id >= 104;
export const colorOf = (id) => Math.floor((id % 52) / 13);
export const numOf = (id) => (id % 13) + 1;
export const tileId = (color, num, copy = 0) => copy * 52 + color * 13 + (num - 1);

export function tileName(id) {
  return isFake(id) ? 'Sahte okey' : `${COLORS[colorOf(id)][0].toUpperCase()}${COLORS[colorOf(id)].slice(1)} ${numOf(id)}`;
}

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

export const makeTiles = () => Array.from({ length: 106 }, (_, i) => i);

/** Göstergeden okey belirleme: aynı renk, bir sonraki sayı (13'ten sonra 1). */
export function okeyFromIndicator(indicatorId) {
  if (isFake(indicatorId)) throw new Error('Gösterge sahte okey olamaz');
  const n = numOf(indicatorId);
  return { color: colorOf(indicatorId), num: n === 13 ? 1 : n + 1 };
}

/** Gerçek okey (joker) mi? Okeyin kendisi olan iki taş jokerdir. */
export const isJoker = (id, okey) => !isFake(id) && colorOf(id) === okey.color && numOf(id) === okey.num;

/** Taşın oyundaki yüzü: sahte okey, okey taşının yüzünü taşır; gerçek okey joker olur. */
export function faceOf(id, okey) {
  if (isFake(id)) return { c: okey.color, n: okey.num, joker: false };
  if (isJoker(id, okey)) return { c: -1, n: 0, joker: true };
  return { c: colorOf(id), n: numOf(id), joker: false };
}

// ---------------------------------------------------------------------------
// Per kontrolü ve en iyi dizilim
// ---------------------------------------------------------------------------

/**
 * Taşları perlere böler. Per: aynı renkte ardışık ≥3 (1, 13'ten sonra gelebilir: 12-13-1; 13-1-2 olmaz)
 * ya da farklı renklerde aynı sayı 3–4 taş. Joker (gerçek okey) her taşın yerine geçer.
 * opts.allowSkip: perde olmayan taşları atlayarak en çok taşı kapsayan dizilimi arar.
 * Dönüş: { covered, groups: [{ type: 'run'|'set', ids }], rest: [ids] }
 */
export function arrange(ids, okey, opts = {}) {
  const allowSkip = opts.allowSkip !== false;
  const limit = opts.limit || 40000;
  const total = ids.length;
  const grid = Array.from({ length: 4 }, () => Array.from({ length: 14 }, () => []));
  const jokers = [];
  for (const id of ids) {
    const f = faceOf(id, okey);
    if (f.joker) jokers.push(id); else grid[f.c][f.n].push(id);
  }
  let remaining = total; // henüz karara bağlanmamış taş sayısı (jokerler dahil)
  let covered = 0;
  let nodes = 0;
  let done = false;
  const groups = [];
  const skipped = [];
  let best = { covered: -1, groups: [], rest: ids.slice() };

  const numAt = (p) => (p > 13 ? 1 : p);

  function finalize() {
    // Artan jokerleri uygun bir pere ekle
    const gs = groups.map((g) => ({ type: g.type, ids: g.ids.slice(), hi: g.hi }));
    const spare = jokers.slice();
    let extra = 0;
    for (const g of gs) {
      while (spare.length) {
        const room = g.type === 'set' ? g.ids.length < 4 : g.ids.length < 13;
        if (!room) break;
        if (g.type === 'run' && g.hi >= 14) g.ids.unshift(spare.pop()); else { g.ids.push(spare.pop()); if (g.type === 'run') g.hi++; }
        extra++;
      }
      if (!spare.length) break;
    }
    const cov = covered + extra;
    if (cov > best.covered) {
      best = { covered: cov, groups: gs.map((g) => ({ type: g.type, ids: g.ids })), rest: skipped.concat(spare) };
      if (cov === total) done = true;
    }
  }

  function rec() {
    if (done || ++nodes > limit) return;
    if (covered + remaining <= best.covered) return;
    let fc = -1;
    let fn = -1;
    outer: for (let c = 0; c < 4; c++) {
      for (let n = 1; n <= 13; n++) if (grid[c][n].length) { fc = c; fn = n; break outer; }
    }
    if (fc < 0) { finalize(); return; }
    const cell = grid[fc][fn];
    const mine = cell[cell.length - 1];

    // 1) Seri (run) seçenekleri: bu taşı içeren, uzun olandan kısaya
    const poses = fn === 1 ? [1, 14] : [fn];
    for (let L = 13; L >= 3 && !done; L--) {
      for (const pos of poses) {
        for (let s = pos - L + 1; s <= pos && !done; s++) {
          const e = s + L - 1;
          if (s < 1 || e > 14) continue;
          // gerekli joker sayısı
          let need = 0;
          for (let p = s; p <= e; p++) {
            if (p === pos) continue;
            if (!grid[fc][numAt(p)].length) need++;
          }
          if (need > jokers.length) continue;
          // uygula
          const taken = [];
          const gids = [];
          cell.pop();
          for (let p = s; p <= e; p++) {
            if (p === pos) { gids.push(mine); continue; }
            const cl = grid[fc][numAt(p)];
            if (cl.length) { const id = cl.pop(); gids.push(id); taken.push([cl, id]); } else { const j = jokers.pop(); gids.push(j); taken.push([null, j]); }
          }
          groups.push({ type: 'run', ids: gids, hi: e });
          covered += L; remaining -= L;
          rec();
          covered -= L; remaining += L;
          groups.pop();
          for (let i = taken.length - 1; i >= 0; i--) { const [cl, id] = taken[i]; if (cl) cl.push(id); else jokers.push(id); }
          cell.push(mine);
        }
      }
    }

    // 2) Aynı sayı, farklı renk (set)
    const others = [0, 1, 2, 3].filter((c) => c !== fc);
    for (const mask of [7, 3, 5, 6]) {
      const cols = others.filter((_, i) => mask & (1 << i));
      let need = 0;
      for (const c of cols) if (!grid[c][fn].length) need++;
      if (need > jokers.length) continue;
      const taken = [];
      const gids = [mine];
      cell.pop();
      for (const c of cols) {
        const cl = grid[c][fn];
        if (cl.length) { const id = cl.pop(); gids.push(id); taken.push([cl, id]); } else { const j = jokers.pop(); gids.push(j); taken.push([null, j]); }
      }
      groups.push({ type: 'set', ids: gids, hi: 0 });
      covered += gids.length; remaining -= gids.length;
      rec();
      covered -= gids.length; remaining += gids.length;
      groups.pop();
      for (let i = taken.length - 1; i >= 0; i--) { const [cl, id] = taken[i]; if (cl) cl.push(id); else jokers.push(id); }
      cell.push(mine);
      if (done) return;
    }

    // 3) Bu taşı perde kullanmadan bırak
    if (allowSkip && !done) {
      cell.pop();
      skipped.push(mine);
      remaining -= 1;
      rec();
      remaining += 1;
      skipped.pop();
      cell.push(mine);
    }
  }

  rec();
  if (best.covered < 0) best = { covered: 0, groups: [], rest: ids.slice() };
  return best;
}

/** Seçilen taşlar tek bir geçerli per mi? 'run' | 'set' | null */
export function groupType(ids, okey) {
  if (ids.length < 3) return null;
  const r = arrange(ids, okey, { allowSkip: false, limit: 20000 });
  return r.covered === ids.length && r.groups.length === 1 ? r.groups[0].type : null;
}

/** 14 taşın tamamı perlere bölünebilir mi? */
export function allInGroups(ids, okey) {
  return arrange(ids, okey, { allowSkip: false, limit: 200000 }).covered === ids.length;
}

/** Çifte bitme: 14 taş yedi çift (aynı renk ve sayı; joker eşleşmeyen taşı tamamlar). */
export function isPairs(ids, okey) {
  if (ids.length !== 14) return false;
  const count = new Map();
  let jokers = 0;
  for (const id of ids) {
    const f = faceOf(id, okey);
    if (f.joker) { jokers++; continue; }
    const k = f.c * 20 + f.n;
    count.set(k, (count.get(k) || 0) + 1);
  }
  let singles = 0;
  for (const v of count.values()) if (v % 2) singles++;
  return jokers >= singles && (jokers - singles) % 2 === 0;
}

/** Bu 14 taşla el bitirilebilir mi? Dönüş: null | 'normal' | 'cifte' */
export function finishKind(ids14, okey) {
  if (ids14.length !== 14) return null;
  if (allInGroups(ids14, okey)) return 'normal';
  if (isPairs(ids14, okey)) return 'cifte';
  return null;
}

/** 15 taşlı elde bitirmek için atılabilecek taş var mı? (yoksa null). Dönüş: { tile, kind } */
export function findFinishingTile(hand15, okey) {
  if (hand15.length !== 15) return null;
  const best = arrange(hand15, okey, { allowSkip: true, limit: 60000 });
  const tryOrder = best.rest.concat(hand15.filter((t) => !best.rest.includes(t)));
  const pairable = isPairsPossible15(hand15, okey);
  if (best.covered < 14 && !pairable) return null;
  for (const t of tryOrder) {
    const rem = hand15.filter((x) => x !== t);
    const kind = finishKind(rem, okey);
    if (kind) return { tile: t, kind };
  }
  return null;
}

function isPairsPossible15(hand15, okey) {
  // Hızlı eleme: çift sayısı en az 6 olmalı (jokerler dahil)
  const count = new Map();
  let j = 0;
  for (const id of hand15) {
    const f = faceOf(id, okey);
    if (f.joker) { j++; continue; }
    const k = f.c * 20 + f.n;
    count.set(k, (count.get(k) || 0) + 1);
  }
  let pairs = 0;
  let singles = 0;
  for (const v of count.values()) { pairs += Math.floor(v / 2); singles += v % 2; }
  return pairs + Math.min(j, singles) >= 6;
}

/** Bitiş puanı çarpanı: çifte bitme ×2, okey atarak bitme ×2. */
export function roundMultiplier(kind, okeyFinish) {
  return (kind === 'cifte' ? 2 : 1) * (okeyFinish ? 2 : 1);
}

// ---------------------------------------------------------------------------
// Dizilim (ıstaka düzeni)
// ---------------------------------------------------------------------------

export const ROW = 15;
export const SLOTS = 30;

const sortTiles = (ids, okey) => ids.slice().sort((a, b) => {
  const fa = faceOf(a, okey);
  const fb = faceOf(b, okey);
  return (fa.joker ? 99 : fa.c) - (fb.joker ? 99 : fb.c) || fa.n - fb.n || a - b;
});

/** Parçaları (segment) iki satırlık ıstakaya, aralarında bir boşlukla yerleştirir. */
export function layoutSegments(segments) {
  const slots = new Array(SLOTS).fill(null);
  let row = 0;
  let col = 0;
  for (const seg of segments) {
    if (!seg.length) continue;
    if (col > 0 && col + seg.length > ROW) { row++; col = 0; }
    if (row >= 2) { // taşmayı önle: kalan boş yerlere sırayla yaz
      for (const id of seg) { const k = slots.indexOf(null); if (k >= 0) slots[k] = id; }
      continue;
    }
    for (const id of seg) { slots[row * ROW + col] = id; col++; }
    col++; // aralık
    if (col >= ROW) { row++; col = 0; }
  }
  return slots;
}

/** "Seri diz": perleri yan yana, perde olmayanları sonda toplar. */
export function autoSeries(ids, okey) {
  const r = arrange(ids, okey, { allowSkip: true, limit: 60000 });
  const segs = r.groups.map((g) => g.ids);
  const rest = sortTiles(r.rest, okey);
  if (rest.length) segs.push(rest);
  return layoutSegments(segs);
}

/** "Çift diz": aynı taşları çift olarak yan yana koyar; tek kalanlar sonda. */
export function autoPairs(ids, okey) {
  const byFace = new Map();
  const jokers = [];
  for (const id of ids) {
    const f = faceOf(id, okey);
    if (f.joker) { jokers.push(id); continue; }
    const k = f.c * 20 + f.n;
    if (!byFace.has(k)) byFace.set(k, []);
    byFace.get(k).push(id);
  }
  const pairs = [];
  const singles = [];
  for (const k of [...byFace.keys()].sort((a, b) => a - b)) {
    const list = byFace.get(k);
    while (list.length >= 2) pairs.push([list.pop(), list.pop()]);
    if (list.length) singles.push(list[0]);
  }
  // Jokerler tek kalan taşları tamamlar
  const rest = [];
  for (const s of singles) {
    if (jokers.length) pairs.push([s, jokers.pop()]); else rest.push(s);
  }
  while (jokers.length >= 2) pairs.push([jokers.pop(), jokers.pop()]);
  rest.push(...jokers);
  const segs = pairs.slice();
  if (rest.length) segs.push(sortTiles(rest, okey));
  return layoutSegments(segs);
}

// ---------------------------------------------------------------------------
// El durumu
// ---------------------------------------------------------------------------

/** Yeni el: 106 taş karışır, gösterge açılır, başlayan 15, diğerleri 14 taş alır. */
export function newRound({ rng = Math.random, starter = 0 } = {}) {
  const tiles = shuffle(makeTiles(), rng);
  const iIdx = tiles.findIndex((t) => !isFake(t));
  const indicator = tiles.splice(iIdx, 1)[0];
  const okey = okeyFromIndicator(indicator);
  const hands = [[], [], [], []];
  for (let p = 0; p < 4; p++) {
    const n = p === starter ? 15 : 14;
    hands[p] = tiles.splice(0, n);
  }
  return {
    indicator,
    okey,
    hands,
    pile: tiles,                 // ortadaki taşlar (48)
    discards: [[], [], [], []],  // her oyuncunun attığı taşlar
    turn: starter,
    starter,
    phase: 'discard',            // 'draw' | 'discard' | 'over'
    result: null,
  };
}

export const prevSeat = (p) => (p + 3) % 4;
export const nextSeat = (p) => (p + 1) % 4;

/** Taş çek: source 'pile' (ortadan) veya 'side' (soldaki oyuncunun attığı son taş). */
export function draw(state, p, source) {
  if (state.phase !== 'draw' || state.turn !== p) throw new Error('Şimdi taş çekilemez');
  let t;
  if (source === 'side') {
    const list = state.discards[prevSeat(p)];
    if (!list.length) throw new Error('Yanda taş yok');
    t = list.pop();
  } else {
    if (!state.pile.length) throw new Error('Ortada taş kalmadı');
    t = state.pile.pop();
  }
  state.hands[p].push(t);
  state.phase = 'discard';
  return t;
}

/** Taş at; sıra bir sonraki oyuncuya geçer. Ortadaki taşlar bittiyse el berabere biter. */
export function discard(state, p, tile) {
  if (state.phase !== 'discard' || state.turn !== p) throw new Error('Şimdi taş atılamaz');
  const i = state.hands[p].indexOf(tile);
  if (i < 0) throw new Error('Bu taş elde yok');
  state.hands[p].splice(i, 1);
  state.discards[p].push(tile);
  state.turn = nextSeat(p);
  state.phase = 'draw';
  if (!state.pile.length) {
    state.phase = 'over';
    state.result = { winner: null, kind: 'berabere', okeyFinish: false, mult: 0, deltas: [0, 0, 0, 0] };
  }
  return state.result;
}

/** Bitir: tile elden çıkar, kalan 14 taş geçerliyse el biter. Geçersizse null döner ve durum değişmez. */
export function finish(state, p, tile) {
  if (state.phase !== 'discard' || state.turn !== p) return null;
  if (!state.hands[p].includes(tile)) return null;
  const rem = state.hands[p].filter((t) => t !== tile);
  const kind = finishKind(rem, state.okey);
  if (!kind) return null;
  const okeyFinish = isJoker(tile, state.okey);
  const mult = roundMultiplier(kind, okeyFinish);
  state.hands[p] = rem;
  state.discards[p].push(tile);
  state.phase = 'over';
  const deltas = [0, 1, 2, 3].map((q) => (q === p ? 2 * mult : -mult));
  state.result = { winner: p, kind, okeyFinish, mult, deltas };
  return state.result;
}

// ---------------------------------------------------------------------------
// Bilgisayar oyuncuları: basit sezgisel
// ---------------------------------------------------------------------------

/** Perde olmayan taşlar için potansiyel puanı (komşu / aynı sayı / çift). */
function looseScore(rest, okey) {
  let s = 0;
  const f = rest.map((id) => faceOf(id, okey));
  for (let i = 0; i < f.length; i++) {
    if (f[i].joker) { s += 6; continue; }
    for (let j = i + 1; j < f.length; j++) {
      if (f[j].joker) continue;
      if (f[i].c === f[j].c) {
        let d = Math.abs(f[i].n - f[j].n);
        if (d === 12) d = 1; // 13 ile 1 komşudur
        if (d === 1) s += 2; else if (d === 2) s += 1; else if (d === 0) s += 1.5;
      } else if (f[i].n === f[j].n) s += 1.5;
    }
  }
  return s;
}

/** Bir elin değeri: perde kapsanan taş sayısı ağırlıklı, artı bağlantı potansiyeli. */
export function handValue(ids, okey) {
  const r = arrange(ids, okey, { allowSkip: true, limit: 6000 });
  return r.covered * 10 + looseScore(r.rest, okey);
}

/** 15 taşlı elde atılacak en iyi taşı seçer (joker en son atılır). */
export function chooseDiscard(hand15, okey, rng = Math.random) {
  let best = null;
  let bestVal = -Infinity;
  for (const t of hand15) {
    const rem = hand15.filter((x) => x !== t);
    let v = handValue(rem, okey) + (rng() - 0.5) * 0.2;
    if (isJoker(t, okey)) v -= 1000;
    if (v > bestVal) { bestVal = v; best = t; }
  }
  return { tile: best, value: bestVal };
}

/** Yandan mı ortadan mı çekilecek? 'side' yalnızca yandaki taş eli belirgin iyileştiriyorsa. */
export function chooseDrawSource(state, p, rng = Math.random) {
  const side = state.discards[prevSeat(p)];
  if (!side.length) return 'pile';
  if (!state.pile.length) return 'side';
  const hand = state.hands[p];
  const sideTile = side[side.length - 1];
  const base = handValue(hand, state.okey);
  const withSide = hand.concat(sideTile);
  if (findFinishingTile(withSide, state.okey)) return 'side';
  const after = chooseDiscard(withSide, state.okey, rng);
  // Yandan alınan taşı geri atmak anlamsızdır; taşın kendisi atılacaksa ortadan çek
  if (after.tile === sideTile) return 'pile';
  return after.value > base + 5 ? 'side' : 'pile';
}

/**
 * Bilgisayarın tüm sırası: çek, mümkünse bitir, değilse at.
 * Dönüş: { source, drew, discarded, finished }
 */
export function aiPlay(state, p, rng = Math.random) {
  // Başlayan oyuncu 15 taşla açar: çekmeden yalnızca atar
  const source = state.phase === 'draw' ? chooseDrawSource(state, p, rng) : null;
  const drew = source ? draw(state, p, source) : null;
  const fin = findFinishingTile(state.hands[p], state.okey);
  if (fin) {
    const res = finish(state, p, fin.tile);
    if (res) return { source, drew, discarded: fin.tile, finished: res };
  }
  const { tile } = chooseDiscard(state.hands[p], state.okey, rng);
  discard(state, p, tile);
  return { source, drew, discarded: tile, finished: null };
}
