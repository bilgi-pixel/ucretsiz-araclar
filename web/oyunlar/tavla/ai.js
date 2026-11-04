// Tavla yapay zekâsı: değerlendirme fonksiyonu ve hamle dizisi seçimi. DOM yok; Web Worker (worker.js) içinde çalışır.
// Kolay: rastgele geçerli dizi. Orta: tüm geçerli dizileri 1 katlı değerlendirir. Zor: 1 katlı sıralamadan sonra
// en iyi adaylar için rakibin 21 zar kombinasyonunu ve en iyi cevabını hesaplar (2 katlı beklenen değer), süre sınırıyla.
import { applySequence, legalSequences, other, pips, hasContact, mulberry32 } from './engine.js';

const WIN = 100000;
const TIME_BUDGET_MS = 1500; // zor seviyede toplam hesaplama sınırı (≤ 2 sn)
const TOP_CANDIDATES = 12; // 2 katlı hesaplanacak aday sayısı

const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now());

// 36 zar kombinasyonu (a,b) için "d noktalık uzaklıktaki taşa vurulur mu" maskeleri. Kombinasyon c = (a-1)*6 + (b-1).
// Mask iki parçaya bölünür (32 bit sınırı): c < 18 → LO, c >= 18 → HI. Ara hanelerin kapalı olması yok sayılır (yaklaşık).
const HIT_LO = new Array(25).fill(0);
const HIT_HI = new Array(25).fill(0);
for (let d = 1; d <= 24; d++) {
  for (let a = 1; a <= 6; a++) {
    for (let b = 1; b <= 6; b++) {
      const hits = a === d || b === d || a + b === d || (a === b && d % a === 0 && d / a <= 4);
      if (!hits) continue;
      const c = (a - 1) * 6 + (b - 1);
      if (c < 18) HIT_LO[d] |= 1 << c; else HIT_HI[d] |= 1 << (c - 18);
    }
  }
}
function popcount(x) {
  let n = 0;
  while (x) { x &= x - 1; n++; }
  return n;
}

/** Hane değeri: oyuncunun kendi bakışındaki hane numarasına (1..24) göre, orada kapı (2+ taş) tutmanın değeri. */
const POINT_VALUE = [0, 0.5, 2, 3, 4.5, 5.5, 5, 4.5, 3.5, 2, 1, 0.5, 0.5, 1, 0.2, 0.2, 0.3, 0.5, 2.5, 2, 3, 2.5, 1.5, 1, 1];
// Ardışık kapı uzunluğuna göre set (prime) bonusu
const PRIME_BONUS = [0, 0, 0, 3, 8, 16, 30];

/** idx hanesindeki defender taşına, rakibin bir sonraki atışında vurma kombinasyonu sayısı (36 üzerinden). */
function blotShots(st, defender, idx) {
  let lo = 0;
  let hi = 0;
  if (defender === 'w') {
    for (let y = 0; y < idx; y++) if (st[y] < 0) { lo |= HIT_LO[idx - y]; hi |= HIT_HI[idx - y]; }
    if (st[25] > 0) { lo |= HIT_LO[idx + 1]; hi |= HIT_HI[idx + 1]; }
  } else {
    for (let y = idx + 1; y < 24; y++) if (st[y] > 0) { lo |= HIT_LO[y - idx]; hi |= HIT_HI[y - idx]; }
    if (st[24] > 0) { lo |= HIT_LO[24 - idx]; hi |= HIT_HI[24 - idx]; }
  }
  return popcount(lo) + popcount(hi);
}

/**
 * Konum puanı (me açısından, yüksek = iyi). toMove: sırası gelen taraf; sırası gelen tarafın karşısındaki
 * taşlar hemen vurulabileceği için açık taş cezası/bonusu o yöne daha ağır uygulanır.
 */
export function evaluate(st, me, toMove) {
  const opp = other(me);
  const meW = me === 'w';
  const myOff = st[meW ? 26 : 27];
  const opOff = st[meW ? 27 : 26];
  if (myOff >= 15) return WIN + (opOff === 0 ? 2000 : 0);
  if (opOff >= 15) return -WIN - (myOff === 0 ? 2000 : 0);

  // Pip farkı: temel yarış değeri (1 pip = 1 puan)
  let score = (pips(st, opp) - pips(st, me)) + (myOff - opOff) * 1.5;
  if (!hasContact(st)) return score; // temas bitti: saf yarış

  let run = 0;
  let bestRun = 0;
  let myHomePoints = 0;
  let opHomePoints = 0;
  const myBlots = [];
  const opBlots = [];
  for (let p = 1; p <= 24; p++) {
    const idx = meW ? p - 1 : 24 - p;
    const c = meW ? st[idx] : -st[idx]; // + benim, - rakibin taşı
    if (c >= 2) {
      score += POINT_VALUE[p];
      if (c > 5) score -= (c - 5) * 1.2; // aşırı yığılma
      if (p <= 6) { score += 0.3 * c; myHomePoints++; } // ev bölgesindeki taşlar
      run++;
      if (run > bestRun) bestRun = run;
    } else {
      run = 0;
      if (c === 1) { myBlots.push(idx); if (p <= 6) score += 0.3; } else if (c === -1) opBlots.push(idx);
      if (c <= -2 && p >= 19) opHomePoints++; // rakibin ev bölgesindeki kapıları (kırık taşın girişini zorlaştırır)
    }
  }
  score += PRIME_BONUS[Math.min(bestRun, 6)];

  // Açık taş riski: sırası gelen taraf rakibinse benim açık taşlarım hemen risktedir
  const wMine = toMove === opp ? 1 : 0.35;
  const wOpp = toMove === me ? 0.9 : 0.35;
  for (const idx of myBlots) {
    const p = meW ? idx + 1 : 24 - idx;
    const loss = (25 - p) + 8 + 3 * opHomePoints;
    score -= (blotShots(st, me, idx) / 36) * loss * wMine;
  }
  for (const idx of opBlots) {
    const p = meW ? 24 - idx : idx + 1; // rakibin kendi bakışındaki hane
    const loss = (25 - p) + 8 + 3 * myHomePoints;
    score += (blotShots(st, opp, idx) / 36) * loss * wOpp;
  }

  // Kırık taşlar
  const myBar = st[meW ? 24 : 25];
  const opBar = st[meW ? 25 : 24];
  score -= myBar * (18 + 3 * opHomePoints);
  score += opBar * (18 + 3 * myHomePoints);
  return score;
}

/** Rakibin 21 farklı atışı için beklenen değer (her atış, olasılığıyla ağırlıklandırılır: çift 1/36, diğerleri 2/36). */
function expectation(after, me, deadline) {
  const opp = other(me);
  let total = 0;
  for (let a = 1; a <= 6; a++) {
    for (let b = a; b <= 6; b++) {
      if (now() > deadline) return null; // süre doldu: yarım kalan hesabı kullanma
      const w = a === b ? 1 : 2;
      const replies = legalSequences(after, opp, [a, b]);
      let v;
      if (!replies.length) v = evaluate(after, me, me);
      else {
        // Rakip kendi değerlendirmesine göre en iyi cevabı seçer; biz o konumu kendi puanımızla ölçeriz.
        let bestOpp = -Infinity;
        v = 0;
        for (const r of replies) {
          const s2 = applySequence(after, opp, r);
          const eo = evaluate(s2, opp, me);
          if (eo > bestOpp) { bestOpp = eo; v = evaluate(s2, me, me); }
        }
      }
      total += w * v;
    }
  }
  return total / 36;
}

/**
 * Bilgisayarın oynayacağı hamle dizisini seçer.
 * Dönüş: { seq: hamle listesi (boşsa pas), count: geçerli dizi sayısı, depth: 0|1|2, ms }.
 */
export function chooseSequence(st, side, dice, level, seed) {
  const t0 = now();
  const seqs = legalSequences(st, side, dice);
  const done = (seq, depth) => ({ seq, count: seqs.length, depth, ms: Math.round(now() - t0) });
  if (!seqs.length) return done([], 0);
  if (seqs.length === 1) return done(seqs[0], 0);
  if (level === 'kolay') {
    const rng = mulberry32(seed || 1);
    return done(seqs[Math.floor(rng() * seqs.length)], 0);
  }
  const opp = other(side);
  const scored = seqs.map((seq) => {
    const after = applySequence(st, side, seq);
    return { seq, after, score: evaluate(after, side, opp) };
  });
  scored.sort((x, y) => y.score - x.score);
  if (level !== 'zor' || scored[0].score >= WIN) return done(scored[0].seq, 1);

  // Zor: en iyi adaylar için 2 katlı beklenen değer; süre dolarsa o ana kadar tamamlananlar arasından seç.
  const deadline = t0 + TIME_BUDGET_MS;
  let best = scored[0];
  let bestVal = -Infinity;
  const top = Math.min(scored.length, TOP_CANDIDATES);
  let evaluated = 0;
  for (let k = 0; k < top; k++) {
    const cand = scored[k];
    if (cand.score >= WIN) return done(cand.seq, 1);
    const v = expectation(cand.after, side, deadline);
    if (v === null) break;
    evaluated++;
    if (v > bestVal) { bestVal = v; best = cand; }
  }
  return done(best.seq, evaluated ? 2 : 1);
}
