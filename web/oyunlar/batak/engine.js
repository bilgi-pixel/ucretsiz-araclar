// İhaleli batak motoru — saf mantık (DOM yok), tarayıcıda ve testlerde import edilebilir.
// Kart numarası: id = takım * 13 + (değer - 1); takım 0 ♠, 1 ♥, 2 ♦, 3 ♣; değer 1 (As) … 13 (Papaz).
// Batak sıralaması: As en yüksek (güç 14), sonra 13 … 2.
// Oyuncular saat yönünde: 0 = insan, 1 = sol, 2 = karşı, 3 = sağ.

export const SUITS = ['♠', '♥', '♦', '♣'];
export const SUIT_NAMES = ['Maça', 'Kupa', 'Karo', 'Sinek'];
export const RANK_NAMES = ['', 'As', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Vale', 'Kız', 'Papaz'];
export const MIN_BID = 5;
export const MAX_BID = 13;
export const MAX_ROUNDS = 11;

export const suitOf = (id) => Math.floor(id / 13);
export const rankOf = (id) => (id % 13) + 1;
/** Batak gücü: As = 14. */
export const power = (id) => (rankOf(id) === 1 ? 14 : rankOf(id));
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

/** Eli takıma göre grupla, her takımı güce göre büyükten küçüğe sırala. */
export function sortHand(hand) {
  return hand.slice().sort((a, b) => suitOf(a) - suitOf(b) || power(b) - power(a));
}

/** Yeni oyun: skorlar sıfır, ilk el dağıtılır. target: 0 = yalnız 11 el, aksi halde ilk ulaşılan puan. */
export function newGame({ rng = Math.random, target = 0 } = {}) {
  const st = { scores: [0, 0, 0, 0], roundNo: 0, dealer: 3, target, history: [], over: false, winner: -1 };
  dealRound(st, rng);
  return st;
}

/** Yeni el dağıt: 13'er kart, ihale aşaması, ilk söz dağıtıcının solundaki oyuncuda. */
export function dealRound(st, rng = Math.random) {
  const deck = shuffle(makeDeck(), rng);
  st.hands = [0, 1, 2, 3].map((p) => sortHand(deck.slice(p * 13, p * 13 + 13)));
  st.roundNo += 1;
  st.dealer = (st.dealer + 1) % 4;
  st.phase = 'bid';
  st.bids = [null, null, null, null]; // null = henüz konuşmadı, 0 = pas, sayı = ihale
  st.highBid = 0;
  st.bidder = -1;
  st.bidTurn = (st.dealer + 1) % 4;
  st.bidSpoken = 0;
  st.forced = false;
  st.trump = -1;
  st.trick = [];
  st.lastTrick = null;
  st.tricks = [0, 0, 0, 0];
  st.trickNo = 0;
  st.leader = -1;
  st.turn = st.bidTurn;
  st.result = null;
  st.played = [];
  return st;
}

// ---------------------------------------------------------------------------
// İhale
// ---------------------------------------------------------------------------

/** Verilebilecek ihale sayıları (mevcut en yüksekten fazla, en az 5, en çok 13). */
export function legalBids(st) {
  const out = [];
  for (let b = Math.max(MIN_BID, st.highBid + 1); b <= MAX_BID; b++) out.push(b);
  return out;
}

/** İhale ver (amount sayı) ya da pas geç (0). Herkes bir kez konuşur; 13 ihaleyi hemen bitirir. */
export function bid(st, p, amount) {
  if (st.phase !== 'bid' || p !== st.bidTurn) return { ok: false, reason: 'sıra' };
  if (amount !== 0) {
    if (!Number.isInteger(amount) || amount < MIN_BID || amount > MAX_BID || amount <= st.highBid) return { ok: false, reason: 'geçersiz' };
    st.highBid = amount;
    st.bidder = p;
  }
  st.bids[p] = amount;
  st.bidSpoken += 1;
  if (amount === MAX_BID || st.bidSpoken >= 4) {
    // Herkes pas geçtiyse son söz sahibi (dağıtıcı) en düşük ihaleyi almak zorundadır.
    if (st.bidder < 0) {
      st.bidder = st.dealer;
      st.highBid = MIN_BID;
      st.bids[st.dealer] = MIN_BID;
      st.forced = true;
    }
    st.phase = 'trump';
    st.turn = st.bidder;
    return { ok: true, done: true, bidder: st.bidder, highBid: st.highBid, forced: st.forced };
  }
  st.bidTurn = (st.bidTurn + 1) % 4;
  st.turn = st.bidTurn;
  return { ok: true, done: false };
}

/** İhaleyi alan koz seçer ve ilk eli açar. */
export function chooseTrump(st, suit) {
  if (st.phase !== 'trump' || !(suit >= 0 && suit <= 3)) return { ok: false };
  st.trump = suit;
  st.phase = 'play';
  st.leader = st.bidder;
  st.turn = st.bidder;
  return { ok: true };
}

// ---------------------------------------------------------------------------
// Oyun kuralları: renge uyma, kozla kesme, büyük atma
// ---------------------------------------------------------------------------

/** Eli alan kart: varsa en yüksek koz, yoksa açılış rengindeki en yüksek kart. */
export function trickWinner(trick, trump) {
  let best = trick[0];
  for (const t of trick.slice(1)) {
    const s = suitOf(t.card);
    const bs = suitOf(best.card);
    if (s === bs) {
      if (power(t.card) > power(best.card)) best = t;
    } else if (s === trump && bs !== trump) best = t;
    // açılış rengi ve koz dışındaki kart eli alamaz
  }
  return best.p;
}

/** Oyuncunun atabileceği kartlar.
 *  1) Açılış rengi varsa o renkten atmak zorunludur; masadaki en yüksek açılış rengi kartını geçebiliyorsa
 *     geçmek zorundadır (büyük atma). Masada kesme (koz) varsa renk kartlarından herhangi biri atılır.
 *  2) Açılış rengi yoksa ve koz varsa koz atmak zorunludur (kesme); masada koz varsa onu geçen koz atılır,
 *     geçemiyorsa herhangi bir koz.
 *  3) İkisi de yoksa her kart serbesttir. */
export function legalCards(st, p) {
  const hand = st.hands[p];
  if (!st.trick.length) return hand.slice();
  const lead = suitOf(st.trick[0].card);
  const trump = st.trump;
  const leadCards = hand.filter((c) => suitOf(c) === lead);
  const trumpsOnTable = lead === trump ? [] : st.trick.filter((t) => suitOf(t.card) === trump);
  const topTrump = trumpsOnTable.length ? Math.max(...trumpsOnTable.map((t) => power(t.card))) : 0;
  if (leadCards.length) {
    if (topTrump) return leadCards; // masada kesilmiş: renk kartlarından herhangi biri
    const top = Math.max(...st.trick.filter((t) => suitOf(t.card) === lead).map((t) => power(t.card)));
    const higher = leadCards.filter((c) => power(c) > top);
    return higher.length ? higher : leadCards;
  }
  const trumps = hand.filter((c) => suitOf(c) === trump);
  if (trumps.length) {
    if (topTrump) {
      const higher = trumps.filter((c) => power(c) > topTrump);
      return higher.length ? higher : trumps;
    }
    return trumps;
  }
  return hand.slice();
}

/** Kart oyna. Sonuç: { ok, trickDone, winner, roundDone, over }. */
export function playCard(st, p, card) {
  if (st.phase !== 'play' || p !== st.turn) return { ok: false, reason: 'sıra' };
  if (!legalCards(st, p).includes(card)) return { ok: false, reason: 'kural' };
  st.hands[p] = st.hands[p].filter((c) => c !== card);
  st.trick.push({ p, card });
  st.played.push(card);
  if (st.trick.length < 4) {
    st.turn = (p + 1) % 4;
    return { ok: true, trickDone: false };
  }
  const winner = trickWinner(st.trick, st.trump);
  st.tricks[winner] += 1;
  st.trickNo += 1;
  st.lastTrick = { cards: st.trick.slice(), winner };
  st.trick = [];
  st.leader = winner;
  st.turn = winner;
  const ev = { ok: true, trickDone: true, winner, roundDone: false, over: false };
  if (st.trickNo >= 13) {
    st.result = scoreRound(st);
    for (let i = 0; i < 4; i++) st.scores[i] += st.result.delta[i];
    st.history.push({ round: st.roundNo, bidder: st.bidder, bid: st.highBid, trump: st.trump, tricks: st.tricks.slice(), delta: st.result.delta.slice() });
    st.phase = 'roundover';
    ev.roundDone = true;
    st.over = isGameOver(st);
    if (st.over) {
      st.phase = 'over';
      st.winner = leaderOf(st.scores);
      ev.over = true;
    }
  }
  return ev;
}

/** El puanı: ihaleyi tutturan aldığı el kadar artı alır; tutturamayan ihale kadar eksi alır;
 *  diğer oyuncular aldıkları el sayısı kadar artı alır. */
export function scoreRound(st) {
  const made = st.tricks[st.bidder] >= st.highBid;
  const delta = st.tricks.map((t, p) => (p === st.bidder ? (made ? t : -st.highBid) : t));
  return { made, delta, bidder: st.bidder, bid: st.highBid };
}

export function isGameOver(st) {
  if (st.roundNo >= MAX_ROUNDS) return true;
  return st.target > 0 && st.scores.some((s) => s >= st.target);
}

export function leaderOf(scores) {
  let best = 0;
  for (let i = 1; i < scores.length; i++) if (scores[i] > scores[best]) best = i;
  return best;
}

/** Sonraki ele geç (oyun bitmediyse). */
export function nextRound(st, rng = Math.random) {
  if (st.phase !== 'roundover') return false;
  dealRound(st, rng);
  return true;
}

// ---------------------------------------------------------------------------
// Bilgisayar oyuncu
// ---------------------------------------------------------------------------

/** El gücü tahmini: üst kartlar, uzun koz ve kısa takımlarla kesme imkânı. En iyi koz ve beklenen el sayısı döner. */
export function estimateHand(hand) {
  const len = [0, 1, 2, 3].map((s) => hand.filter((c) => suitOf(c) === s).length);
  let best = null;
  for (let t = 0; t < 4; t++) {
    if (len[t] < 3) continue;
    let est = 0;
    const tr = hand.filter((c) => suitOf(c) === t).map(power).sort((a, b) => b - a);
    tr.forEach((pw, i) => {
      if (pw === 14) est += 1;
      else if (pw === 13) est += i <= 1 ? 0.95 : 0.6;
      else if (pw === 12) est += i <= 2 ? 0.8 : 0.5;
      else if (pw === 11) est += i <= 3 ? 0.6 : 0.4;
      else if (i >= 3) est += 0.5; // dördüncü ve sonraki koz küçük bile olsa el getirir
    });
    for (let s = 0; s < 4; s++) {
      if (s === t) continue;
      const cs = hand.filter((c) => suitOf(c) === s).map(power).sort((a, b) => b - a);
      if (cs[0] === 14) est += 1;
      else if (cs[0] === 13 && cs.length >= 2) est += 0.6;
      if (cs[0] === 14 && cs[1] === 13) est += 0.8;
      // kısa takım, koz ile kesme imkânı verir
      if (len[t] >= 4) {
        if (cs.length === 0) est += 1;
        else if (cs.length === 1 && cs[0] < 13) est += 0.4;
      }
    }
    if (!best || est > best.tricks) best = { trump: t, tricks: est };
  }
  if (!best) {
    // üç kartlı koz bile yok (nadir): en uzun takımı koz say
    best = { trump: len.indexOf(Math.max(...len)), tricks: hand.filter((c) => power(c) === 14).length };
  }
  return best;
}

/** Bilgisayarın ihale kararı: 0 = pas, aksi halde ihale sayısı (mevcut en yüksekten bir fazla). */
export function aiBid(st, p) {
  const est = estimateHand(st.hands[p]).tricks;
  const want = Math.floor(est + 0.7); // hafif iddialı yuvarla
  const next = Math.max(MIN_BID, st.highBid + 1);
  return want >= next ? Math.min(MAX_BID, next) : 0;
}

export function aiTrump(st, p) {
  return estimateHand(st.hands[p]).trump;
}

/** Düşük atarken koz kartlar daha değerli sayılır. */
const worth = (st, c) => power(c) + (suitOf(c) === st.trump ? 20 : 0);

/** Bilgisayar kart seçimi: yasal kartlar arasından basit sezgi. */
export function aiPlay(st, p) {
  const legal = legalCards(st, p);
  if (legal.length === 1) return legal[0];
  const byLow = legal.slice().sort((a, b) => worth(st, a) - worth(st, b));
  const lowest = byLow[0];
  const isBidder = p === st.bidder;
  const needs = isBidder ? st.highBid - st.tricks[p] : 0;

  if (!st.trick.length) {
    // Açılış: önce koz olmayan en yüksek (artık yenilemeyecek) kartlar; ihale sahibi gerekirse koz çeker.
    const playedSet = new Set(st.played);
    const isTop = (c) => {
      for (let r = 14; r > power(c); r--) {
        const id = suitOf(c) * 13 + (r === 14 ? 0 : r - 1);
        if (!playedSet.has(id) && !st.hands[p].includes(id)) return false;
      }
      return true;
    };
    const tops = legal.filter((c) => suitOf(c) !== st.trump && isTop(c));
    if (tops.length) return tops.sort((a, b) => power(b) - power(a))[0];
    if (isBidder && needs > 0) {
      const trumps = legal.filter((c) => suitOf(c) === st.trump).sort((a, b) => power(b) - power(a));
      if (trumps.length && (isTop(trumps[0]) || trumps.length >= 4)) return trumps[0];
    }
    const nonTrump = byLow.filter((c) => suitOf(c) !== st.trump);
    return (nonTrump.length ? nonTrump : byLow)[0];
  }

  // Takip: yasal kartlar kuralı zaten belirler. Alabiliyorsa en küçük alan kartı oynar.
  const winners = byLow.filter((c) => trickWinner(st.trick.concat([{ p, card: c }]), st.trump) === p);
  const curWinner = trickWinner(st.trick, st.trump);
  // Savunmada eli zaten bir savunmacı alıyorsa ve ihale sahibi oynadıysa fazla harcama.
  const bidderPlayed = st.trick.some((t) => t.p === st.bidder);
  if (!isBidder && curWinner !== st.bidder && bidderPlayed && st.trick.length === 3) return lowest;
  return winners.length ? winners[0] : lowest;
}
