// Tavla (backgammon) kural motoru. DOM yok; yalnızca saf mantık (Web Worker ve testlerde de çalışır).
//
// KONVANSİYON (engine.js, ai.js, game.js ve testlerde aynıdır):
// - Durum "st" 28 sayılık düz bir dizidir.
//     st[0..23]  hane içeriği; idx = hane numarası - 1. Beyaz taş pozitif, siyah taş negatif sayıdır.
//     st[24]     beyaz kırık (çubukta bekleyen) taş sayısı
//     st[25]     siyah kırık taş sayısı
//     st[26]     beyazın topladığı (tahtadan çıkardığı) taş sayısı
//     st[27]     siyahın topladığı taş sayısı
// - Beyaz idx 23 → 0 yönünde ilerler; evi idx 0..5 (1-6. haneler). Siyah idx 0 → 23 yönünde ilerler; evi idx 18..23.
// - Kırık taşın girişi: beyaz idx 24 - zar, siyah idx zar - 1.
// - Hamle (tek zarlık): { from, to, die, hit }. from: 0..23 ya da BAR (24); to: 0..23 ya da OFF (-1).
// - Türk tavlası: çift küp yok; mars (rakip hiç taş toplayamadan oyun biter) 2 puan, normal galibiyet 1 puan.

export const BAR = 24;
export const OFF = -1;
const BAR_W = 24;
const BAR_B = 25;
const OFF_W = 26;
const OFF_B = 27;
export const CHECKERS = 15;

export const other = (side) => (side === 'w' ? 'b' : 'w');

/** Başlangıç dizilimi: beyaz 24:2, 13:5, 8:3, 6:5 — siyah 1:2, 12:5, 17:3, 19:5 (beyazın hane numaralarıyla). */
export function initialState() {
  const st = new Array(28).fill(0);
  st[23] = 2; st[12] = 5; st[7] = 3; st[5] = 5;
  st[0] = -2; st[11] = -5; st[16] = -3; st[18] = -5;
  return st;
}

/** Test/hata ayıklama kancası için: {points, bar, off} nesnesinden temiz bir durum dizisi kurar. */
export function stateFrom(obj) {
  const st = new Array(28).fill(0);
  const pts = Array.isArray(obj && obj.points) ? obj.points : [];
  for (let i = 0; i < 24; i++) st[i] = Math.max(-CHECKERS, Math.min(CHECKERS, Number(pts[i]) | 0));
  const bar = (obj && obj.bar) || {};
  const off = (obj && obj.off) || {};
  st[BAR_W] = Math.max(0, Number(bar.w) | 0);
  st[BAR_B] = Math.max(0, Number(bar.b) | 0);
  st[OFF_W] = Math.max(0, Number(off.w) | 0);
  st[OFF_B] = Math.max(0, Number(off.b) | 0);
  return st;
}

/** Durumu okunur nesneye çevirir (stateFrom'un tersi). */
export function describe(st) {
  return {
    points: st.slice(0, 24),
    bar: { w: st[BAR_W], b: st[BAR_B] },
    off: { w: st[OFF_W], b: st[OFF_B] },
  };
}

export const barOf = (st, side) => st[side === 'w' ? BAR_W : BAR_B];
export const offOf = (st, side) => st[side === 'w' ? OFF_W : OFF_B];

/** Bir tarafın tahtadaki (kırık dahil) taş sayısı. */
export function onBoard(st, side) {
  let n = barOf(st, side);
  for (let i = 0; i < 24; i++) {
    const c = st[i];
    if (side === 'w' ? c > 0 : c < 0) n += Math.abs(c);
  }
  return n;
}

/** Toplam taş: tahta + kırık + toplanan (her iki taraf için 15 olmalı). */
export const checkerTotal = (st, side) => onBoard(st, side) + offOf(st, side);

/** Pip sayısı: tüm taşların eve girmek için gereken toplam zar noktası. Kırık taş 25 sayılır. */
export function pips(st, side) {
  let p = 0;
  if (side === 'w') {
    for (let i = 0; i < 24; i++) if (st[i] > 0) p += (i + 1) * st[i];
    p += 25 * st[BAR_W];
  } else {
    for (let i = 0; i < 24; i++) if (st[i] < 0) p += (24 - i) * -st[i];
    p += 25 * st[BAR_B];
  }
  return p;
}

/** Tüm taşlar ev bölgesinde mi (kırık taş yok, evin dışında taş yok)? Toplama (bear-off) yalnızca bu durumda başlar. */
export function allHome(st, side) {
  if (side === 'w') {
    if (st[BAR_W] > 0) return false;
    for (let i = 6; i < 24; i++) if (st[i] > 0) return false;
    return true;
  }
  if (st[BAR_B] > 0) return false;
  for (let i = 0; i < 18; i++) if (st[i] < 0) return false;
  return true;
}

/** Rakiple temas sürüyor mu? Taşlar birbirini geçtiyse yarış başlamıştır (vuruş artık mümkün değil). */
export function hasContact(st) {
  if (st[BAR_W] > 0 || st[BAR_B] > 0) return true;
  let highestW = -1;
  let lowestB = 24;
  for (let i = 0; i < 24; i++) {
    if (st[i] > 0) highestW = i;
    if (st[i] < 0 && i < lowestB) lowestB = i;
  }
  return highestW > lowestB;
}

/** Tek bir zarla oynanabilecek tüm hamleler (zorunluluk kuralları burada değil, firstMoves içinde uygulanır). */
export function singleMoves(st, side, die) {
  const out = [];
  if (side === 'w') {
    if (st[BAR_W] > 0) {
      // Kırık taş varsa başka hiçbir taş oynanamaz; yalnızca çubuktan giriş.
      const to = 24 - die;
      const t = st[to];
      if (t >= -1) out.push({ from: BAR, to, die, hit: t === -1 });
      return out;
    }
    const home = allHome(st, 'w');
    let farthest = -1; // beyazın en uzak (en yüksek idx) taşı
    for (let i = 23; i >= 0; i--) if (st[i] > 0) { farthest = i; break; }
    for (let from = 0; from < 24; from++) {
      if (st[from] <= 0) continue;
      const to = from - die;
      if (to >= 0) {
        const t = st[to];
        if (t >= -1) out.push({ from, to, die, hit: t === -1 });
      } else if (home && (to === -1 || from === farthest)) {
        // Tam zar ya da en uzak taştan büyük zarla toplama
        out.push({ from, to: OFF, die, hit: false });
      }
    }
    return out;
  }
  if (st[BAR_B] > 0) {
    const to = die - 1;
    const t = st[to];
    if (t <= 1) out.push({ from: BAR, to, die, hit: t === 1 });
    return out;
  }
  const home = allHome(st, 'b');
  let farthest = 24; // siyahın en uzak (en düşük idx) taşı
  for (let i = 0; i < 24; i++) if (st[i] < 0) { farthest = i; break; }
  for (let from = 0; from < 24; from++) {
    if (st[from] >= 0) continue;
    const to = from + die;
    if (to <= 23) {
      const t = st[to];
      if (t <= 1) out.push({ from, to, die, hit: t === 1 });
    } else if (home && (to === 24 || from === farthest)) {
      out.push({ from, to: OFF, die, hit: false });
    }
  }
  return out;
}

/** Hamleyi uygular, yeni durum döndürür (girdi değişmez). Vuruş (kırma) durumdan türetilir. */
export function applyMove(st, side, m) {
  const n = st.slice();
  const w = side === 'w';
  if (m.from === BAR) n[w ? BAR_W : BAR_B]--;
  else n[m.from] += w ? -1 : 1;
  if (m.to === OFF) {
    n[w ? OFF_W : OFF_B]++;
  } else {
    if (w ? n[m.to] === -1 : n[m.to] === 1) { n[m.to] = 0; n[w ? BAR_B : BAR_W]++; }
    n[m.to] += w ? 1 : -1;
  }
  return n;
}

export function applySequence(st, side, seq) {
  let cur = st;
  for (const m of seq) cur = applyMove(cur, side, m);
  return cur;
}

/** Durum için kısa, benzersiz metin anahtarı (tekrarlı konumları ayıklamak için). */
export function stateKey(st) {
  let s = '';
  for (let i = 0; i < 28; i++) s += String.fromCharCode(st[i] + 64);
  return s;
}

/** Çift zarda 4 hamle: [3,3] → [3,3,3,3]. */
export function expandDice(dice) {
  return dice.length === 2 && dice[0] === dice[1] ? [dice[0], dice[0], dice[0], dice[0]] : dice.slice();
}

// Kalan zarlardan bir tanesini çıkarır (yeni dizi).
function removeOne(arr, v) {
  const i = arr.indexOf(v);
  const c = arr.slice();
  if (i >= 0) c.splice(i, 1);
  return c;
}
const uniqAll = (arr) => Array.from(new Set(arr));

/** En çok kaç zarın daha oynanabileceğini bulan, bellekli arama (aynı konuma farklı sıralarla gelmek tekrar hesaplanmaz). */
function makeDepth(side) {
  const memo = new Map();
  function depth(st, rem) {
    if (rem.length === 0) return 0;
    const key = stateKey(st) + rem.join('');
    const hit = memo.get(key);
    if (hit !== undefined) return hit;
    let best = 0;
    outer:
    for (const d of uniqAll(rem)) {
      const rest = removeOne(rem, d);
      for (const m of singleMoves(st, side, d)) {
        const v = 1 + depth(applyMove(st, side, m), rest);
        if (v > best) best = v;
        if (best === rem.length) break outer; // daha fazlası olamaz
      }
    }
    memo.set(key, best);
    return best;
  }
  return depth;
}

/**
 * Sıradaki geçerli ilk hamleler ve toplam oynanacak zar sayısı.
 * Zorunluluklar: (1) mümkünse tüm zarlar oynanmalı (maksimum sayıda zar), (2) yalnızca bir zar oynanabiliyorsa
 * ve iki zar farklıysa büyük zar oynanmalı. rem: kalan zarlar (çift zar için 4 elemanlı).
 */
export function movePlan(st, side, rem) {
  if (!rem.length) return { moves: [], total: 0 };
  const depth = makeDepth(side);
  const cand = [];
  let best = 0;
  for (const d of uniqAll(rem)) {
    const rest = removeOne(rem, d);
    for (const m of singleMoves(st, side, d)) {
      const v = 1 + depth(applyMove(st, side, m), rest);
      cand.push({ m, v });
      if (v > best) best = v;
    }
  }
  let moves = cand.filter((c) => c.v === best).map((c) => c.m);
  const dist = uniqAll(rem);
  if (best === 1 && dist.length === 2) {
    const big = Math.max(dist[0], dist[1]);
    if (moves.some((m) => m.die === big)) moves = moves.filter((m) => m.die === big);
  }
  return { moves, total: best };
}

export const firstMoves = (st, side, rem) => movePlan(st, side, rem).moves;

/**
 * Bir zar atışındaki tüm geçerli tam hamle dizileri (her biri tek zarlık hamle listesi).
 * Aynı sonuç konuma varan diziler tek sayılır. dice: [a, b] (çift zarda otomatik 4 hamle).
 * Geçerli hamle yoksa boş dizi döner (pas).
 */
export function legalSequences(st, side, dice) {
  const rem0 = expandDice(dice);
  const plan = movePlan(st, side, rem0);
  if (!plan.total) return [];
  const depth = makeDepth(side);
  const results = new Map();
  const seen = new Set();
  function walk(cur, rem, seq, left) {
    if (left === 0) {
      const k = stateKey(cur);
      if (!results.has(k)) results.set(k, seq);
      return;
    }
    const nk = stateKey(cur) + '|' + rem.join('') + '|' + left;
    if (seen.has(nk)) return;
    seen.add(nk);
    for (const d of uniqAll(rem)) {
      const rest = removeOne(rem, d);
      for (const m of singleMoves(cur, side, d)) {
        const nx = applyMove(cur, side, m);
        if (1 + depth(nx, rest) < left) continue; // en çok zarı oynatmayan yol geçersiz
        walk(nx, rest, seq.concat([m]), left - 1);
      }
    }
  }
  for (const m of plan.moves) walk(applyMove(st, side, m), removeOne(rem0, m.die), [m], plan.total - 1);
  return Array.from(results.values());
}

/** Oyun sonu: 15 taşını toplayan kazanır. Rakip hiç taş toplamadıysa mars (2 puan), değilse 1 puan. */
export function gameResult(st) {
  if (st[OFF_W] >= CHECKERS) {
    const mars = st[OFF_B] === 0;
    return { over: true, winner: 'w', mars, points: mars ? 2 : 1 };
  }
  if (st[OFF_B] >= CHECKERS) {
    const mars = st[OFF_W] === 0;
    return { over: true, winner: 'b', mars, points: mars ? 2 : 1 };
  }
  return { over: false, winner: null, mars: false, points: 0 };
}

/** Taraf kendi bakışıyla hane numarası: beyaz idx+1, siyah 24-idx (standart tavla notasyonu). */
export const pointNo = (side, idx) => (side === 'w' ? idx + 1 : 24 - idx);

/** Standart notasyon: "8/5", "bar/22*", "3/off". Hane numaraları hamle sahibinin kendi bakışındandır. */
export function notation(side, m) {
  const from = m.from === BAR ? 'bar' : String(pointNo(side, m.from));
  const to = m.to === OFF ? 'off' : String(pointNo(side, m.to));
  return `${from}/${to}${m.hit ? '*' : ''}`;
}
export const seqNotation = (side, seq) => seq.map((m) => notation(side, m)).join(' ');

/** Tohumlu rastgele sayı üreteci (mulberry32): aynı tohum aynı zar dizisini verir. */
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function rng() {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
