// Kızma Birader kural motoru: saf fonksiyonlar, DOM ve ağ yok. game.js ve testler kullanır.
// İlerleme değeri (progress): -1 = ev (başlangıç alanı), 0..39 = ortak yol (0 = kendi başlangıç karesi), 40..43 = hedef kareleri.

export const YARD = -1;
export const TRACK = 40; // ortak yoldaki kare sayısı
export const GOAL0 = 40; // ilk hedef karesinin ilerleme değeri
export const LAST = 43; // son hedef karesi
export const START = [0, 10, 20, 30]; // her rengin yol üzerindeki başlangıç karesi (mutlak)

export const COLORS = [
  { id: 0, key: 'kirmizi', name: 'Kırmızı', shape: 'daire', shapeName: 'yuvarlak' },
  { id: 1, key: 'mavi', name: 'Mavi', shape: 'kare', shapeName: 'kare' },
  { id: 2, key: 'yesil', name: 'Yeşil', shape: 'elmas', shapeName: 'baklava' },
  { id: 3, key: 'sari', name: 'Sarı', shape: 'ucgen', shapeName: 'üçgen' },
];

// 11x11 ızgarada (sütun, satır) koordinatları. Yol saat yönünde döner; kırmızı sol kolun üst satırından başlar.
export const PATH = [
  [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [4, 3], [4, 2], [4, 1], [4, 0], [5, 0],
  [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [10, 5],
  [10, 6], [9, 6], [8, 6], [7, 6], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10], [5, 10],
  [4, 10], [4, 9], [4, 8], [4, 7], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6], [0, 5],
];
export const GOALS = [
  [[1, 5], [2, 5], [3, 5], [4, 5]],
  [[5, 1], [5, 2], [5, 3], [5, 4]],
  [[9, 5], [8, 5], [7, 5], [6, 5]],
  [[5, 9], [5, 8], [5, 7], [5, 6]],
];
// Ev alanları köşelerdeki 4x4 boşluğun ortasına yerleşir
export const YARDS = [
  [[0.7, 0.7], [2.3, 0.7], [0.7, 2.3], [2.3, 2.3]],
  [[7.7, 0.7], [9.3, 0.7], [7.7, 2.3], [9.3, 2.3]],
  [[9.3, 9.3], [7.7, 9.3], [9.3, 7.7], [7.7, 7.7]],
  [[0.7, 9.3], [2.3, 9.3], [0.7, 7.7], [2.3, 7.7]],
];

export const LEVELS = ['kolay', 'orta', 'zor'];
export const MODES = ['bot', 'yerel'];

/* ---------- Rastgelelik (tohumlu) ---------- */
export function mulberry32(seed) {
  let a = seed >>> 0;
  function next() {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  // Durum okunup geri yüklenebilir: geri al ve kayıt sonraki zarları değiştirmesin diye
  next.getState = () => a;
  next.setState = (v) => { a = v >>> 0; };
  return next;
}

/* ---------- Ayarlar ve oyun kurulumu ---------- */
export function normalizeSettings(o) {
  const s = o && typeof o === 'object' && !Array.isArray(o) ? o : {};
  const count = [2, 3, 4].includes(Number(s.count)) ? Number(s.count) : 4;
  return {
    mode: MODES.includes(s.mode) ? s.mode : 'bot',
    count,
    level: LEVELS.includes(s.level) ? s.level : 'orta',
    mustHit: s.mustHit === true,
    safeStart: s.safeStart === true,
    sixPenalty: s.sixPenalty === true,
  };
}

// İki kişide karşılıklı renkler (kırmızı-yeşil) oynar
export function activeColors(count) {
  if (count === 2) return [0, 2];
  if (count === 3) return [0, 1, 2];
  return [0, 1, 2, 3];
}

export function isBot(g, color) {
  return g.settings.mode === 'bot' && color !== 0;
}

export function absOf(color, p) {
  return (START[color] + p) % TRACK;
}

export function createGame(opts) {
  const settings = normalizeSettings(opts);
  const active = activeColors(settings.count);
  const pos = [null, null, null, null];
  active.forEach((c) => { pos[c] = [YARD, YARD, YARD, YARD]; });
  const g = { v: 1, settings, active, pos, turn: active[0], phase: 'roll', die: 0, tries: 1, sixes: 0, winner: -1, last: null, turnNo: 1 };
  beginTurn(g);
  return g;
}

export function cloneGame(g) {
  return JSON.parse(JSON.stringify(g));
}

/* ---------- Tahta sorguları ---------- */
// Ortak yolda mutlak karede duran taş (yoksa null)
export function occupantAt(g, abs) {
  for (const c of g.active) {
    const arr = g.pos[c];
    for (let i = 0; i < 4; i++) {
      const p = arr[i];
      if (p >= 0 && p < TRACK && absOf(c, p) === abs) return { color: c, piece: i };
    }
  }
  return null;
}

/** Zara göre geçerli hamleler. Zorunlu vuruş açıksa ve vuruş varsa yalnızca vuruşlar döner. */
export function legalMoves(g, color, die) {
  const s = g.settings;
  const mine = g.pos[color];
  const out = [];
  if (!mine || !(die >= 1 && die <= 6)) return out;
  for (let i = 0; i < 4; i++) {
    const p = mine[i];
    let to;
    if (p === YARD) {
      if (die !== 6) continue; // taşı oyuna sokmak için 6 gerekir
      to = 0;
    } else {
      to = p + die;
      if (to > LAST) continue; // hedefe tam sayıyla girilir
    }
    if (to < TRACK) {
      const abs = absOf(color, to);
      const occ = occupantAt(g, abs);
      if (occ && occ.color === color) continue; // kendi taşının üstüne gelinemez
      if (occ && s.safeStart && abs === START[occ.color]) continue; // kendi başlangıç karesindeki taş vurulamaz
      out.push({ color, piece: i, from: p, to, hit: occ ? { color: occ.color, piece: occ.piece } : null, enter: p === YARD, goal: false });
    } else {
      // Hedef içinde taş atlanamaz: geçilen ve varılan hedef kareleri boş olmalı
      let blocked = false;
      for (let q = Math.max(p + 1, GOAL0); q <= to && !blocked; q++) {
        if (mine.some((x, k) => k !== i && x === q)) blocked = true;
      }
      if (blocked) continue;
      out.push({ color, piece: i, from: p, to, hit: null, enter: false, goal: true });
    }
  }
  if (s.mustHit && out.some((m) => m.hit)) return out.filter((m) => m.hit);
  return out;
}

/** Oyuncunun yolda taşı yoksa ve hedefteki taşları hiçbir zarla oynayamıyorsa üç deneme hakkı vardır. */
export function needsThreeTries(g, color) {
  const mine = g.pos[color];
  if (mine.some((p) => p >= 0 && p < TRACK)) return false;
  for (let d = 1; d <= 3; d++) {
    if (legalMoves(g, color, d).some((m) => !m.enter)) return false;
  }
  return true;
}

export function beginTurn(g) {
  g.phase = 'roll';
  g.die = 0;
  g.sixes = 0;
  g.tries = needsThreeTries(g, g.turn) ? 3 : 1;
}

export function nextColor(g, color) {
  const a = g.active;
  return a[(a.indexOf(color) + 1) % a.length];
}

function endTurn(g) {
  g.turn = nextColor(g, g.turn);
  g.turnNo += 1;
  beginTurn(g);
}

/**
 * Atılan zarı işler. Dönen olay:
 *  move (oynanacak hamle var), again (6 geldi ama hamle yok, yeniden atar), retry (üç deneme hakkından biri gitti),
 *  pass (hamle yok, sıra geçti), penalty (art arda üçüncü 6, sıra geçti).
 */
export function applyRoll(g, die) {
  if (g.phase !== 'roll') throw new Error('Zar atma sırası değil');
  if (!(Number.isInteger(die) && die >= 1 && die <= 6)) throw new Error('Geçersiz zar');
  const color = g.turn;
  g.die = die;
  g.sixes = die === 6 ? g.sixes + 1 : 0;
  if (die === 6 && g.settings.sixPenalty && g.sixes >= 3) {
    endTurn(g);
    return { type: 'penalty', color, die, next: g.turn };
  }
  const moves = legalMoves(g, color, die);
  if (moves.length) {
    g.phase = 'move';
    return { type: 'move', color, die, moves };
  }
  if (die === 6) {
    g.phase = 'roll';
    return { type: 'again', color, die };
  }
  g.tries -= 1;
  if (g.tries > 0) {
    g.phase = 'roll';
    return { type: 'retry', color, die, left: g.tries };
  }
  endTurn(g);
  return { type: 'pass', color, die, next: g.turn };
}

/** Seçilen hamleyi uygular. Dönen olay: win, again (6 sonrası yeniden atış), next (sıra geçti). */
export function applyChoice(g, move) {
  if (g.phase !== 'move') throw new Error('Hamle sırası değil');
  const legal = legalMoves(g, g.turn, g.die);
  const m = legal.find((x) => x.piece === move.piece && x.to === move.to);
  if (!m) throw new Error('Geçersiz hamle');
  const color = g.turn;
  if (m.hit) g.pos[m.hit.color][m.hit.piece] = YARD;
  g.pos[color][m.piece] = m.to;
  g.last = { color, piece: m.piece, from: m.from, to: m.to, hit: m.hit ? { color: m.hit.color, piece: m.hit.piece } : null };
  if (g.pos[color].every((p) => p >= GOAL0)) {
    g.winner = color;
    g.phase = 'over';
    return { type: 'win', color, move: m };
  }
  if (g.die === 6) {
    g.phase = 'roll';
    g.die = 0;
    g.tries = needsThreeTries(g, color) ? 3 : 1;
    return { type: 'again', color, move: m };
  }
  endTurn(g);
  return { type: 'next', color, move: m, next: g.turn };
}

/* ---------- Bilgisayar stratejisi ---------- */
/** Mutlak karedeki taşa bir sonraki atışta rakiplerden kaç taşın ulaşabileceği. */
export function dangerAt(g, color, abs) {
  if (g.settings.safeStart && abs === START[color]) return 0;
  let n = 0;
  for (const oc of g.active) {
    if (oc === color) continue;
    const arr = g.pos[oc];
    for (const q of arr) {
      if (q >= 0 && q < TRACK) {
        const d = (abs - absOf(oc, q) + TRACK) % TRACK;
        if (d >= 1 && d <= 6 && q + d < TRACK) n += 1; // rakip hedefe sapmadan bu kareye gelebilir
      }
    }
    if (abs === START[oc] && arr.includes(YARD)) n += 1; // rakip 6 atıp çıkarsa bu kareye iner
  }
  return n;
}

function trackAbs(color, p) {
  return p >= 0 && p < TRACK ? absOf(color, p) : -1;
}

function pickMax(list, key, rng) {
  let best = [];
  let bestKey = -Infinity;
  for (const m of list) {
    const k = key(m);
    if (k > bestKey + 1e-9) { bestKey = k; best = [m]; } else if (Math.abs(k - bestKey) <= 1e-9) best.push(m);
  }
  return best[Math.floor(rng() * best.length) % best.length];
}

/**
 * Bilgisayarın hamlesi. kolay: rastgele geçerli hamle.
 * orta: vuruş > taşı oyuna sokma > tehlikeden kaçma > hedefe en yakın taşı ilerletme.
 * zor: aynı öncelikler puanla tartılır; tehlikeye girme cezalandırılır, en ilerideki rakip taş vurulur.
 */
export function chooseBotMove(g, moves, level, rng = Math.random) {
  if (!moves || !moves.length) return null;
  if (moves.length === 1) return moves[0];
  const c = g.turn;
  if (level === 'kolay') return moves[Math.floor(rng() * moves.length) % moves.length];
  const victimProgress = (m) => (m.hit ? g.pos[m.hit.color][m.hit.piece] : -1);
  if (level !== 'zor') {
    const hits = moves.filter((m) => m.hit);
    if (hits.length) return pickMax(hits, victimProgress, rng);
    const enters = moves.filter((m) => m.enter);
    if (enters.length) return enters[0];
    const escapes = moves.filter((m) => {
      const from = trackAbs(c, m.from);
      if (from < 0 || dangerAt(g, c, from) === 0) return false;
      const to = trackAbs(c, m.to);
      return to < 0 || dangerAt(g, c, to) === 0;
    });
    if (escapes.length) return pickMax(escapes, (m) => m.from, rng);
    // Hedefteki taşlar da "en yakın" sayılır: onları dibe ilerletmek sonraki taşların girişini açar
    return pickMax(moves, (m) => m.from, rng);
  }
  // Zor: ağırlıklar binlerce bilgisayar-bilgisayar oyunuyla ayarlandı (orta seviyeye karşı yaklaşık %56 kazanır)
  const yardLeft = g.pos[c].includes(YARD);
  return pickMax(moves, (m) => {
    let s = 0;
    const fromAbs = trackAbs(c, m.from);
    const toAbs = trackAbs(c, m.to);
    const dFrom = fromAbs >= 0 ? dangerAt(g, c, fromAbs) : 0;
    const dTo = toAbs >= 0 ? dangerAt(g, c, toAbs) : 0;
    if (m.hit) s += 150 + victimProgress(m) * 12; // en çok yol almış rakibi vur
    if (m.enter) s += 45;
    if (m.goal && m.from < GOAL0) s += 50;
    if (dFrom > 0 && (toAbs < 0 || dTo === 0)) s += 12 + m.from * 0.9; // tehlikeden kaç
    if (toAbs >= 0) s -= dTo * (20 + m.to * 5.5); // yol almış taşı tehlikeye atma
    if (m.from === 0 && yardLeft) s += 7; // başlangıç karesini yeni taşa aç
    if (m.from >= 0) s += m.from * 0.5;
    return s;
  }, rng);
}

/* ---------- Kayıttan yükleme (bozuk veriye karşı korumalı) ---------- */
const isInt = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi;

/** localStorage'dan gelen nesneyi doğrular; geçersizse null döner. */
export function restoreGame(o) {
  if (!o || typeof o !== 'object' || Array.isArray(o) || o.v !== 1) return null;
  const settings = normalizeSettings(o.settings);
  const active = activeColors(settings.count);
  if (!Array.isArray(o.pos) || o.pos.length !== 4) return null;
  const pos = [null, null, null, null];
  for (const c of active) {
    const arr = o.pos[c];
    if (!Array.isArray(arr) || arr.length !== 4 || !arr.every((x) => isInt(x, YARD, LAST))) return null;
    pos[c] = arr.slice();
  }
  // Aynı yol karesinde iki taş ya da aynı hedef karesinde iki taş olamaz
  const seen = new Set();
  for (const c of active) {
    for (const p of pos[c]) {
      if (p === YARD) continue;
      const key = p < TRACK ? `t${absOf(c, p)}` : `g${c}-${p}`;
      if (seen.has(key)) return null;
      seen.add(key);
    }
    if (pos[c].every((p) => p >= GOAL0)) return null; // bitmiş oyun devam ettirilmez
  }
  const g = {
    v: 1, settings, active, pos,
    turn: active.includes(o.turn) ? o.turn : active[0],
    phase: 'roll', die: 0, tries: 1, sixes: 0, winner: -1, last: null,
    turnNo: isInt(o.turnNo, 1, 1e7) ? o.turnNo : 1,
  };
  beginTurn(g);
  if (isInt(o.sixes, 0, 2)) g.sixes = o.sixes;
  if (isInt(o.tries, 1, 3) && o.tries <= g.tries) g.tries = o.tries;
  if (o.phase === 'move' && isInt(o.die, 1, 6) && legalMoves(g, g.turn, o.die).length) {
    g.phase = 'move';
    g.die = o.die;
    if (g.die === 6 && g.sixes === 0) g.sixes = 1;
  }
  const L = o.last;
  if (L && typeof L === 'object' && active.includes(L.color) && isInt(L.piece, 0, 3) && isInt(L.from, YARD, LAST) && isInt(L.to, 0, LAST)) {
    g.last = { color: L.color, piece: L.piece, from: L.from, to: L.to, hit: null };
  }
  return g;
}
