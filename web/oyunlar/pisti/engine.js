// Pişti motoru — saf mantık (DOM yok), tarayıcıda ve testlerde import edilebilir.
// Kart numarası: id = takım * 13 + (değer - 1); takım 0 ♠, 1 ♥, 2 ♦, 3 ♣; değer 1 (As) … 11 (Vale) … 13 (Papaz).
// Oyuncular: 0 = insan, 1 = bilgisayar.

export const SUITS = ['♠', '♥', '♦', '♣'];
export const SUIT_NAMES = ['Maça', 'Kupa', 'Karo', 'Sinek'];
export const RANK_NAMES = ['', 'As', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Vale', 'Kız', 'Papaz'];

export const suitOf = (id) => Math.floor(id / 13);
export const rankOf = (id) => (id % 13) + 1;
export const cardName = (id) => `${SUIT_NAMES[suitOf(id)]} ${RANK_NAMES[rankOf(id)]}`;

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

export const makeDeck = () => Array.from({ length: 52 }, (_, i) => i);

/** Kart puanı: sinek 2 = 2, karo 10 = 3, as ve vale = 1 (diğerleri 0). */
export function cardPoints(id) {
  const s = suitOf(id);
  const r = rankOf(id);
  if (s === 3 && r === 2) return 2;
  if (s === 2 && r === 10) return 3;
  if (r === 1 || r === 11) return 1;
  return 0;
}

export const pointsOf = (ids) => ids.reduce((t, id) => t + cardPoints(id), 0);

/** Bu kart yerdeki kartları toplar mı? (aynı değer veya vale; yer boşsa toplanmaz) */
export function captures(table, card) {
  if (!table.length) return false;
  return rankOf(card) === 11 || rankOf(card) === rankOf(table[table.length - 1]);
}

/** Toplama anında pişti puanı: yerde tek kart varken aynı değerle 10, vale üstüne vale 20; vale ile başka kart 0. */
export function pistiBonus(table, card) {
  if (table.length !== 1) return 0;
  if (rankOf(table[0]) !== rankOf(card)) return 0;
  return rankOf(card) === 11 ? 20 : 10;
}

/** El sonu puanı: kart puanları + pişti + çoğunluk (3). Eşit sayıda kartta çoğunluk puanı yok. */
export function scoreHand(captured, pistiPts) {
  const counts = [captured[0].length, captured[1].length];
  const cardPts = [pointsOf(captured[0]), pointsOf(captured[1])];
  const majority = [0, 0];
  if (counts[0] > counts[1]) majority[0] = 3;
  else if (counts[1] > counts[0]) majority[1] = 3;
  const pts = [0, 1].map((p) => cardPts[p] + pistiPts[p] + majority[p]);
  return { counts, cardPts, pistiPts: pistiPts.slice(), majority, pts };
}

// ---------------------------------------------------------------------------
// Oyun durumu
// ---------------------------------------------------------------------------

export function newGame({ target = 151, level = 'orta', rng = Math.random } = {}) {
  const state = {
    target: target === 101 ? 101 : 151,
    level: ['kolay', 'orta', 'zor'].includes(level) ? level : 'orta',
    total: [0, 0],
    handNo: 0,
    winner: null,
    rng,
  };
  startHand(state);
  return state;
}

/** Yeni el: deste karışır, yere 4 kart (alttaki 3'ü kapalı), herkese 4 kart. İlk eli insan, sonra sırayla başlar. */
export function startHand(state) {
  const deck = shuffle(makeDeck(), state.rng);
  state.table = deck.splice(0, 4);
  state.hiddenIds = state.table.slice(0, 3);
  state.hands = [[], []];
  state.deck = deck;
  state.captured = [[], []];
  state.pistiPts = [0, 0];
  state.pistiCount = [0, 0];
  state.lastCapturer = -1;
  state.turn = state.handNo % 2;
  state.phase = 'play';
  state.lastHand = null;
  dealRound(state);
  return state;
}

export function dealRound(state) {
  for (let i = 0; i < 4; i++) {
    state.hands[0].push(state.deck.shift());
    state.hands[1].push(state.deck.shift());
  }
}

/** Kartı oynar. Dönüş: { player, card, captured: [ids], pisti, dealt, handOver, result } */
export function play(state, card) {
  if (state.phase !== 'play') throw new Error('El bitti');
  const p = state.turn;
  const hand = state.hands[p];
  const idx = hand.indexOf(card);
  if (idx < 0) throw new Error('Bu kart elde yok');
  hand.splice(idx, 1);
  const ev = { player: p, card, captured: [], pisti: 0, dealt: false, handOver: false, result: null };
  if (captures(state.table, card)) {
    ev.pisti = pistiBonus(state.table, card);
    ev.captured = state.table.concat(card);
    state.captured[p].push(...ev.captured);
    state.table = [];
    state.hiddenIds = [];
    state.lastCapturer = p;
    if (ev.pisti) { state.pistiPts[p] += ev.pisti; state.pistiCount[p] += 1; }
  } else {
    state.table.push(card);
  }
  state.turn = 1 - p;
  if (!state.hands[0].length && !state.hands[1].length) {
    if (state.deck.length) {
      dealRound(state);
      ev.dealt = true;
    } else {
      ev.handOver = true;
      ev.result = finishHand(state);
    }
  }
  return ev;
}

/** Elin sonunda yerde kalan kartlar son toplayana gider; puanlar toplama eklenir. */
export function finishHand(state) {
  if (state.table.length && state.lastCapturer >= 0) {
    state.captured[state.lastCapturer].push(...state.table);
    state.table = [];
    state.hiddenIds = [];
  }
  const res = scoreHand(state.captured, state.pistiPts);
  state.total[0] += res.pts[0];
  state.total[1] += res.pts[1];
  state.lastHand = res;
  state.handNo += 1;
  const [a, b] = state.total;
  if ((a >= state.target || b >= state.target) && a !== b) {
    state.winner = a > b ? 0 : 1;
    state.phase = 'gameover';
  } else {
    state.phase = 'handover';
  }
  return res;
}

// ---------------------------------------------------------------------------
// Bilgisayar
// ---------------------------------------------------------------------------

/** Oyuncunun p gözüyle görülen kartlar: toplananlar, görünen yer kartları, kendi eli. */
export function seenCards(state, p) {
  const hidden = new Set(state.hiddenIds);
  return [...state.captured[0], ...state.captured[1], ...state.table.filter((c) => !hidden.has(c)), ...state.hands[p]];
}

/** Rakibin elinde en az bir kartın bulunma olasılığı (k aday kart, U bilinmeyen kart, h kartlık el). */
export function chanceHolds(k, U, h) {
  if (k <= 0 || h <= 0 || U <= 0) return 0;
  if (k >= U) return 1;
  let none = 1;
  for (let i = 0; i < h; i++) {
    const num = U - k - i;
    if (num <= 0) { none = 0; break; }
    none *= num / (U - i);
  }
  return 1 - none;
}

export function chooseCard(state, p, level = 'orta', rng = Math.random) {
  const hand = state.hands[p];
  if (!hand.length) return null;
  if (level === 'kolay') return hand[Math.floor(rng() * hand.length)];
  if (level === 'orta') return chooseMedium(state, p, rng);
  return chooseHard(state, p, rng);
}

const rankValue = (id) => (rankOf(id) === 11 ? 5 : cardPoints(id) ? 3 : 0);

function chooseMedium(state, p, rng) {
  const { table } = state;
  const hand = state.hands[p];
  const caps = hand.filter((c) => captures(table, c));
  if (caps.length) {
    const same = caps.filter((c) => rankOf(c) !== 11);
    // Pişti fırsatı önce, sonra normal eşleşme
    const pisti = caps.filter((c) => pistiBonus(table, c) > 0);
    if (pisti.length) return pisti[0];
    if (same.length) return same[0];
    // Yalnızca vale var: yerde değerli kart ya da birkaç kart varsa kullan
    if (table.length >= 3 || pointsOf(table) > 0) return caps[0];
  }
  // Atılacak kart: puansız ve vale olmayan, en düşük değerli
  const sorted = hand.slice().sort((a, b) => rankValue(a) - rankValue(b) || rng() - 0.5);
  return sorted[0];
}

function chooseHard(state, p, rng) {
  const { table } = state;
  const hand = state.hands[p];
  const seen = new Set(seenCards(state, p));
  const unseen = [];
  for (let c = 0; c < 52; c++) if (!seen.has(c)) unseen.push(c);
  const U = unseen.length;
  const oppHand = state.hands[1 - p].length;
  const remainingToDeal = state.deck.length;
  let best = null;
  let bestVal = -Infinity;
  for (const card of hand) {
    let val;
    if (captures(table, card)) {
      const gain = pointsOf(table) + cardPoints(card) + pistiBonus(table, card) + 0.15 * (table.length + 1);
      // Vale esnek bir karttır; küçük kazançta saklamak daha iyi
      val = gain - (rankOf(card) === 11 && rankOf(card) !== rankOf(table[table.length - 1]) ? 1.3 : 0) + 0.5;
    } else {
      const after = table.concat(card);
      const pts = pointsOf(after) + 0.15 * after.length;
      const kSame = unseen.filter((c) => rankOf(c) === rankOf(card)).length;
      const kJack = rankOf(card) === 11 ? 0 : unseen.filter((c) => rankOf(c) === 11).length;
      const pAny = chanceHolds(kSame + kJack, U, oppHand);
      let loss = pAny * pts;
      if (after.length === 1) {
        const pSame = chanceHolds(kSame, U, oppHand);
        loss += pSame * (rankOf(card) === 11 ? 20 : 10);
      }
      // Eli bitirirken atılan son kartlar tehlikesizdir; ayrıca vale ve puanlı kartı elde tutmak değerlidir
      val = -loss - (rankOf(card) === 11 ? 1.5 : 0) - cardPoints(card) * 0.4;
      if (!remainingToDeal && hand.length === 1) val = -loss;
    }
    val += (rng() - 0.5) * 0.01;
    if (val > bestVal) { bestVal = val; best = card; }
  }
  return best;
}
