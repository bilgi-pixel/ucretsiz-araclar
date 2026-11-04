// Kelime avı çekirdeği — saf mantık, DOM'a dokunmaz (tarayıcıda ve testlerde içe aktarılabilir).
// Türkçe büyük/küçük harf kuralı için her yerde toLocaleUpperCase('tr') kullanılır: i → İ, ı → I.

/** Türkçe alfabenin 29 harfi (Q, W, X yok). Izgaraya yalnızca bu harfler girer. */
export const ALPHABET = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ';

/** Sık kullanılan harfleri öne çıkaran doldurma havuzu (dolgu harfleri gerçek kelimelere benzesin). */
const FILL_FREQ = 'AAAAAAAAEEEEEEIIIİİİKKKKLLLLNNNNRRRRDDDMMMUUUYYYSSSTTTBBBOOÜÜŞŞZZGGCÇÇHHPPVÖĞFJ';

/** Sekiz yön: [satır adımı, sütun adımı]. */
export const DIRS = {
  E: [0, 1], S: [1, 0], SE: [1, 1], NE: [-1, 1],
  W: [0, -1], N: [-1, 0], NW: [-1, -1], SW: [1, -1],
};

/** Zorluk düzeyi → izin verilen yönler. Kolayda ters (sağdan sola, aşağıdan yukarı) yön yoktur. */
export const LEVELS = {
  kolay: ['E', 'S', 'SE'],
  orta: ['E', 'S', 'SE', 'NE', 'W'],
  zor: ['E', 'S', 'SE', 'NE', 'W', 'N', 'NW', 'SW'],
};

/** Yön kısaltması → ok işareti ve Türkçe ad (cevap anahtarı ve erişilebilirlik metni için). */
export const DIR_INFO = {
  E: { arrow: '→', ad: 'soldan sağa' },
  S: { arrow: '↓', ad: 'yukarıdan aşağı' },
  SE: { arrow: '↘', ad: 'sol üstten sağ alta' },
  NE: { arrow: '↗', ad: 'sol alttan sağ üste' },
  W: { arrow: '←', ad: 'sağdan sola' },
  N: { arrow: '↑', ad: 'aşağıdan yukarı' },
  NW: { arrow: '↖', ad: 'sağ alttan sol üste' },
  SW: { arrow: '↙', ad: 'sağ üstten sol alta' },
};

/** Izgara boyutu → gizlenecek kelime sayısı. */
export const SIZES = { 10: 8, 12: 12, 15: 16 };

export const trUpper = (s) => String(s).toLocaleUpperCase('tr');
export const reverseStr = (s) => Array.from(s).reverse().join('');

/** Rastgele sayı üreteci (test ve tekrarlanabilir bulmacalar için tohumlu). */
export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleInPlace(a, rng) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Listeyi büyük harfe çevirir; alfabe dışı harf içeren, çok kısa, yinelenen ve ters okunuşu kendisi olan kelimeleri eler. */
export function cleanWords(list) {
  const seen = new Set();
  const out = [];
  for (const raw of list || []) {
    const w = trUpper(String(raw).trim());
    if (w.length < 3 || seen.has(w)) continue;
    if (Array.from(w).some((ch) => !ALPHABET.includes(ch))) continue;
    if (w === reverseStr(w)) continue; // palindromda yön belirsiz kalır
    seen.add(w);
    out.push(w);
  }
  return out;
}

/** Bir kelime ötekinin içinde (düz ya da ters) geçiyorsa ikisi aynı bulmacada olmaz. */
function conflicts(a, b) {
  return a.includes(b) || b.includes(a) || a.includes(reverseStr(b)) || reverseStr(b).includes(a);
}

/** Havuzdan size ızgarasına sığan, birbirini kapsamayan count kelime seçer. */
export function pickWords(pool, size, count, rng = Math.random) {
  const all = cleanWords(pool).filter((w) => w.length <= size);
  const long = shuffleInPlace(all.filter((w) => w.length >= 4), rng);
  const short = shuffleInPlace(all.filter((w) => w.length < 4), rng);
  const budget = Math.floor(size * size * 0.55); // toplam harf sayısı izgaranın yarısını biraz geçmesin
  const picked = [];
  let total = 0;
  for (const w of [...long, ...short]) {
    if (picked.length >= count) break;
    // Geri kalan her kelimeye en az 4 harflik yer bırak; uzun kelimeler bütçeyi tüketmesin.
    const reserve = (count - picked.length - 1) * 4;
    if (total + w.length + reserve > budget) continue;
    if (picked.some((p) => conflicts(p, w))) continue;
    picked.push(w);
    total += w.length;
  }
  return picked;
}

/** Yerleşimin hücre listesi: [[satır, sütun], …]. */
export function cellsOf(p) {
  return Array.from({ length: p.word.length }, (_, i) => [p.r + p.dr * i, p.c + p.dc * i]);
}

/** Iki hücre aynı doğru üzerindeyse (yatay, dikey, çapraz) aradaki hücreleri verir; değilse null. */
export function lineCells(a, b) {
  const dr = b[0] - a[0];
  const dc = b[1] - a[1];
  if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return null;
  const len = Math.max(Math.abs(dr), Math.abs(dc));
  const sr = Math.sign(dr);
  const sc = Math.sign(dc);
  return Array.from({ length: len + 1 }, (_, i) => [a[0] + sr * i, a[1] + sc * i]);
}

/** Sürükleme sırasında işaretçi hücresini (p) başlangıca (a) göre en yakın 8 yöne oturtur; sınır içinde kalır. */
export function snapEnd(a, p, size) {
  const dr = p[0] - a[0];
  const dc = p[1] - a[1];
  if (dr === 0 && dc === 0) return [a[0], a[1]];
  const ang = Math.atan2(dr, dc); // satır aşağı +, sütun sağa +
  const k = Math.round(ang / (Math.PI / 4));
  const table = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];
  const [sr, sc] = table[((k % 8) + 8) % 8];
  // İşaretçinin yön üzerindeki izdüşümü kadar uzunluk
  const proj = Math.round((dr * sr + dc * sc) / (sr * sr + sc * sc));
  let len = Math.max(0, proj);
  // Sınırdan taşmasın
  const room = (s, x) => (s === 0 ? Infinity : s > 0 ? size - 1 - x : x);
  len = Math.min(len, room(sr, a[0]), room(sc, a[1]));
  return [a[0] + sr * len, a[1] + sc * len];
}

/** Seçilen hücrelerdeki harfleri birleştirir. */
export function wordAt(grid, cells) {
  return cells.map(([r, c]) => grid[r][c]).join('');
}

/** Seçim kalan kelimelerden birine (düz ya da ters okunuşla) uyuyorsa o kelimeyi döndürür. */
export function matchSelection(grid, cells, words) {
  if (cells.length < 2) return null;
  const s = wordAt(grid, cells);
  const r = reverseStr(s);
  return words.find((w) => w === s || w === r) || null;
}

/** Bir kelimenin ızgarada sekiz yönde geçtiği tüm yerler: [{r, c, dr, dc}]. */
export function occurrences(grid, word) {
  const size = grid.length;
  const letters = Array.from(word);
  const found = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] !== letters[0]) continue;
      for (const [dr, dc] of Object.values(DIRS)) {
        const er = r + dr * (letters.length - 1);
        const ec = c + dc * (letters.length - 1);
        if (er < 0 || ec < 0 || er >= size || ec >= size) continue;
        let ok = true;
        for (let i = 1; i < letters.length; i++) {
          if (grid[r + dr * i][c + dc * i] !== letters[i]) { ok = false; break; }
        }
        if (ok) found.push({ r, c, dr, dc });
      }
    }
  }
  return found;
}

/**
 * Verilen kelimeleri size×size ızgaraya yerleştirir ve kalan hücreleri doldurur.
 * Bir kelime yerleşemezse null döner (çağıran yeni kelime seçip tekrar dener).
 */
export function placeWords(words, size, dirs, rng = Math.random) {
  const grid = Array.from({ length: size }, () => Array(size).fill(''));
  const placements = [];
  const order = [...words].sort((a, b) => b.length - a.length);
  for (const word of order) {
    const letters = Array.from(word);
    const L = letters.length;
    let done = false;
    for (let attempt = 0; attempt < 400 && !done; attempt++) {
      const dir = dirs[Math.floor(rng() * dirs.length)];
      const [dr, dc] = DIRS[dir];
      const rMin = dr < 0 ? L - 1 : 0;
      const rMax = dr > 0 ? size - L : size - 1;
      const cMin = dc < 0 ? L - 1 : 0;
      const cMax = dc > 0 ? size - L : size - 1;
      if (rMax < rMin || cMax < cMin) continue;
      const r = rMin + Math.floor(rng() * (rMax - rMin + 1));
      const c = cMin + Math.floor(rng() * (cMax - cMin + 1));
      let ok = true;
      for (let i = 0; i < L; i++) {
        const cur = grid[r + dr * i][c + dc * i];
        if (cur !== '' && cur !== letters[i]) { ok = false; break; }
      }
      if (!ok) continue;
      for (let i = 0; i < L; i++) grid[r + dr * i][c + dc * i] = letters[i];
      placements.push({ word, r, c, dr, dc, dir });
      done = true;
    }
    if (!done) return null;
  }
  // Doldurma: yerleşen kelimelerin harfleri de havuza katılır, dolgu daha inandırıcı olur.
  const fillPool = Array.from(FILL_FREQ + words.join(''));
  const locked = grid.map((row) => row.map((v) => v !== ''));
  const randLetter = () => fillPool[Math.floor(rng() * fillPool.length)];
  for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) if (!locked[r][c]) grid[r][c] = randLetter();
  // Dolgu yüzünden ikinci kez oluşan kelimeleri bozmak için serbest hücreleri yeniden çek.
  for (let pass = 0; pass < 60; pass++) {
    let dirty = false;
    for (const p of placements) {
      for (const o of occurrences(grid, p.word)) {
        if (o.r === p.r && o.c === p.c && o.dr === p.dr && o.dc === p.dc) continue;
        for (let i = 0; i < p.word.length; i++) {
          const rr = o.r + o.dr * i;
          const cc = o.c + o.dc * i;
          if (!locked[rr][cc]) { grid[rr][cc] = randLetter(); dirty = true; }
        }
      }
    }
    if (!dirty) break;
  }
  placements.sort((a, b) => a.word.localeCompare(b.word, 'tr'));
  return { grid, placements };
}

/**
 * Bir bulmaca üretir: { size, level, grid, placements, words }.
 * Kelime listesi ile ızgara her zaman uyuşur; yerleşemeyen kelimeler listeye hiç girmez.
 */
export function makePuzzle({ pool, size, level, rng = Math.random, count }) {
  const dirs = LEVELS[level] || LEVELS.kolay;
  const want = count || SIZES[size] || 8;
  for (let attempt = 0; attempt < 120; attempt++) {
    const n = attempt < 60 ? want : Math.max(4, want - 1 - Math.floor((attempt - 60) / 15));
    const words = pickWords(pool, size, n, rng);
    // İlk denemelerde tam sayıya ulaşılamazsa yeniden seç; sonra azalan sayıyla devam et.
    if (words.length < (attempt < 60 ? n : Math.min(n, 4))) continue;
    const res = placeWords(words, size, dirs, rng);
    if (res) return { size, level, grid: res.grid, placements: res.placements, words: res.placements.map((p) => p.word) };
  }
  return null;
}
