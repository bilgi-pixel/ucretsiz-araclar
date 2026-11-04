// Amiral Battı motoru: saf mantık, DOM yok. Hem oyun arayüzü hem testler içe aktarır.
// Tahta: 10×10, indeks = satır * 10 + sütun (satır 0 = A, sütun 0 = 1).
// Gemi: { id, name, len, r, c, horiz }  (r, c geminin ilk hücresi; yatayda sağa, dikeyde aşağı uzanır).
// Filo durumu (fleet state): { ships: [...], shots: number[100] }  — shots, bu filonun aldığı atışlardır:
//   0 = atış yok, 1 = ıska, 2 = isabet.

export const SIZE = 10;

/** Klasik filo: 5-4-3-3-2 (17 hücre). */
export const FLEET = [
  { id: 'amiral', name: 'Amiral gemisi', len: 5 },
  { id: 'kruvazor', name: 'Kruvazör', len: 4 },
  { id: 'muhrip1', name: 'Muhrip', len: 3 },
  { id: 'muhrip2', name: 'Muhrip', len: 3 },
  { id: 'denizalti', name: 'Denizaltı', len: 2 },
];
export const FLEET_CELLS = FLEET.reduce((a, s) => a + s.len, 0);

/** Tohumlu rastgele sayı üreteci (mulberry32). Aynı tohum aynı diziyi verir. */
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

export const rowOf = (i) => Math.floor(i / SIZE);
export const colOf = (i) => i % SIZE;
/** Hücre adı: 0 → "A1", 99 → "J10". */
export const cellName = (i) => 'ABCDEFGHIJ'[rowOf(i)] + String(colOf(i) + 1);
/** "C5" gibi adı indekse çevirir; geçersizse -1. */
export function cellIndex(name) {
  const m = /^([A-J])(10|[1-9])$/i.exec(String(name).trim());
  if (!m) return -1;
  return 'ABCDEFGHIJ'.indexOf(m[1].toUpperCase()) * SIZE + (Number(m[2]) - 1);
}

/** Geminin kapladığı hücre indeksleri (sınır kontrolü yapmaz). */
export function shipCells(r, c, len, horiz) {
  const out = [];
  for (let k = 0; k < len; k++) out.push((horiz ? r : r + k) * SIZE + (horiz ? c + k : c));
  return out;
}

/**
 * Gemi yerleştirilebilir mi? Sınır dışı ve çakışma ayrı nedenlerle bildirilir.
 * `ships` mevcut yerleşik gemilerdir; `ignoreId` verilirse o gemi çakışmada yok sayılır (taşıma için).
 * Dönüş: { ok: true } ya da { ok: false, reason: 'sinir' | 'cakisma' }.
 */
export function canPlace(ships, len, r, c, horiz, ignoreId) {
  if (!Number.isInteger(r) || !Number.isInteger(c) || r < 0 || c < 0 || r >= SIZE || c >= SIZE) return { ok: false, reason: 'sinir' };
  if ((horiz ? c + len : r + len) > SIZE) return { ok: false, reason: 'sinir' };
  const taken = new Set();
  for (const s of ships) {
    if (s.id === ignoreId) continue;
    for (const i of shipCells(s.r, s.c, s.len, s.horiz)) taken.add(i);
  }
  for (const i of shipCells(r, c, len, horiz)) if (taken.has(i)) return { ok: false, reason: 'cakisma' };
  return { ok: true };
}

/** Filoya gemi ekler (yeni dizi döndürür); geçersizse { ok:false, reason } döndürür. */
export function placeShip(ships, def, r, c, horiz) {
  const res = canPlace(ships, def.len, r, c, horiz, def.id);
  if (!res.ok) return res;
  const next = ships.filter((s) => s.id !== def.id);
  next.push({ id: def.id, name: def.name, len: def.len, r, c, horiz });
  return { ok: true, ships: next };
}

/** Rastgele, kurallara uygun tam filo üretir (gemiler birbirine değebilir ama çakışamaz). */
export function randomFleet(rnd = Math.random) {
  for (let attempt = 0; attempt < 200; attempt++) {
    let ships = [];
    let ok = true;
    // Uzun gemiler önce: yerleşme olasılığı artar.
    for (const def of FLEET) {
      let placed = false;
      for (let t = 0; t < 400 && !placed; t++) {
        const horiz = rnd() < 0.5;
        const r = Math.floor(rnd() * (horiz ? SIZE : SIZE - def.len + 1));
        const c = Math.floor(rnd() * (horiz ? SIZE - def.len + 1 : SIZE));
        const res = placeShip(ships, def, r, c, horiz);
        if (res.ok) { ships = res.ships; placed = true; }
      }
      if (!placed) { ok = false; break; }
    }
    if (ok) return FLEET.map((d) => ships.find((s) => s.id === d.id));
  }
  // Pratikte buraya gelinmez; yine de güvenli, çakışmasız bir düzen döndür.
  return FLEET.map((d, k) => ({ id: d.id, name: d.name, len: d.len, r: k * 2, c: 0, horiz: true }));
}

/** Filonun geçerliliğini denetler (testler ve test kancası için): 5 gemi, doğru uzunluk, sınır ve çakışma yok. */
export function validateFleet(ships) {
  if (!Array.isArray(ships) || ships.length !== FLEET.length) return false;
  let placed = [];
  for (const def of FLEET) {
    const s = ships.find((x) => x && x.id === def.id);
    if (!s || s.len !== def.len) return false;
    const res = placeShip(placed, def, s.r, s.c, !!s.horiz);
    if (!res.ok) return false;
    placed = res.ships;
  }
  return true;
}

export function createFleetState(ships) {
  return { ships: ships.map((s) => ({ ...s })), shots: new Array(SIZE * SIZE).fill(0) };
}

/** Hücre → gemi kimliği haritası. */
export function shipAt(state, idx) {
  for (const s of state.ships) if (shipCells(s.r, s.c, s.len, s.horiz).includes(idx)) return s;
  return null;
}

/** Gemi battı mı? (tüm hücreleri isabet almış) */
export function isSunk(state, ship) {
  return shipCells(ship.r, ship.c, ship.len, ship.horiz).every((i) => state.shots[i] === 2);
}

export function sunkShips(state) { return state.ships.filter((s) => isSunk(state, s)); }
export function remainingShips(state) { return state.ships.filter((s) => !isSunk(state, s)); }
export function allSunk(state) { return state.ships.length > 0 && state.ships.every((s) => isSunk(state, s)); }
export function shotCount(state) { return state.shots.reduce((a, v) => a + (v ? 1 : 0), 0); }
export function hitCount(state) { return state.shots.reduce((a, v) => a + (v === 2 ? 1 : 0), 0); }

/**
 * `state` filosuna ateş eder (durumu yerinde günceller).
 * Dönüş: { result: 'miss' | 'hit' | 'sunk' | 'invalid', ship?, win?: boolean }
 */
export function fire(state, idx) {
  if (!Number.isInteger(idx) || idx < 0 || idx >= SIZE * SIZE || state.shots[idx]) return { result: 'invalid' };
  const ship = shipAt(state, idx);
  if (!ship) { state.shots[idx] = 1; return { result: 'miss', win: false }; }
  state.shots[idx] = 2;
  if (isSunk(state, ship)) return { result: 'sunk', ship, win: allSunk(state) };
  return { result: 'hit', ship, win: false };
}

/**
 * Atış yapanın gördüğü görünüm: '' bilinmiyor, 'm' ıska, 'h' isabet (gemi henüz batmadı), 's' batmış geminin hücresi.
 * Bilgisayar yapay zekâsı yalnızca bu görünümü ve kalan gemi uzunluklarını kullanır (hile yok).
 */
export function viewOf(state) {
  const sunkCells = new Set();
  for (const s of sunkShips(state)) for (const i of shipCells(s.r, s.c, s.len, s.horiz)) sunkCells.add(i);
  return state.shots.map((v, i) => (v === 0 ? '' : v === 1 ? 'm' : sunkCells.has(i) ? 's' : 'h'));
}

// ---------- Bilgisayar yapay zekâsı: av / hedef modu ----------

const NEIGH = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const inBoard = (r, c) => r >= 0 && r < SIZE && c >= 0 && c < SIZE;

/**
 * Bir sonraki atışı seçer.
 * - Hedef modu: batmamış isabet varsa önce hizalı isabetlerin uçlarını, yoksa isabetin dört komşusunu dener.
 * - Av modu: isabet yokken, kalan en küçük geminin uzunluğuna göre parite (dama deseni) hücrelerini rastgele tarar.
 * `level` 'easy' ise yalnızca rastgele atar. Daha önce atılmış hücreye asla atmaz.
 */
export function chooseShot(view, remainingLens, rnd = Math.random, level = 'hard') {
  const unknown = [];
  view.forEach((v, i) => { if (v === '') unknown.push(i); });
  if (!unknown.length) return -1;
  const pick = (arr) => arr[Math.floor(rnd() * arr.length) % arr.length];
  if (level === 'easy') return pick(unknown);

  const hits = [];
  view.forEach((v, i) => { if (v === 'h') hits.push(i); });
  if (hits.length) {
    // 1) Hizalı isabet dizilerinin uçları (aynı satır ya da sütunda ardışık isabetler).
    const ends = new Set();
    for (const i of hits) {
      const r = rowOf(i); const c = colOf(i);
      for (const [dr, dc] of [[0, 1], [1, 0]]) {
        // Yalnızca dizinin başlangıcından say: bir önceki hücre isabet değilse.
        if (inBoard(r - dr, c - dc) && view[(r - dr) * SIZE + (c - dc)] === 'h') continue;
        let len = 1;
        while (inBoard(r + dr * len, c + dc * len) && view[(r + dr * len) * SIZE + (c + dc * len)] === 'h') len++;
        if (len < 2) continue;
        const before = [r - dr, c - dc];
        const after = [r + dr * len, c + dc * len];
        for (const [rr, cc] of [before, after]) if (inBoard(rr, cc) && view[rr * SIZE + cc] === '') ends.add(rr * SIZE + cc);
      }
    }
    if (ends.size) return pick([...ends].sort((a, b) => a - b));
    // 2) Tek isabetlerin komşuları.
    const around = new Set();
    for (const i of hits) {
      for (const [dr, dc] of NEIGH) {
        const rr = rowOf(i) + dr; const cc = colOf(i) + dc;
        if (inBoard(rr, cc) && view[rr * SIZE + cc] === '') around.add(rr * SIZE + cc);
      }
    }
    if (around.size) return pick([...around].sort((a, b) => a - b));
  }

  // Av modu: kalan en küçük gemi kadar aralıklı tara (2 → dama deseni).
  const step = Math.max(2, Math.min(...(remainingLens.length ? remainingLens : [2])));
  const parity = unknown.filter((i) => (rowOf(i) + colOf(i)) % step === 0);
  // Ayrıca hücrenin, kalan gemilerden en az birinin sığabileceği bir boşlukta olması gerekir.
  const fits = (i) => {
    const r = rowOf(i); const c = colOf(i);
    return remainingLens.some((len) => [[0, 1], [1, 0]].some(([dr, dc]) => {
      for (let off = 0; off < len; off++) {
        // Gemi bu hücreyi `off`. parçası olarak kapsayacak biçimde dizilebilir mi?
        let ok = true;
        for (let k = 0; k < len; k++) {
          const rr = r + dr * (k - off); const cc = c + dc * (k - off);
          if (!inBoard(rr, cc) || (view[rr * SIZE + cc] !== '' && view[rr * SIZE + cc] !== 'h')) { ok = false; break; }
        }
        if (ok) return true;
      }
      return false;
    }));
  };
  const good = parity.filter(fits);
  if (good.length) return pick(good);
  const anyFit = unknown.filter(fits);
  if (anyFit.length) return pick(anyFit);
  return pick(unknown);
}
