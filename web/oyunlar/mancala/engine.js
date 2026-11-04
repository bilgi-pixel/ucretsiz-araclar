// Mancala (Kalah kuralları) saf mantık ve yapay zekâ. DOM'a dokunmaz; Web Worker içinde de çalışır.
// Dizilim: 0-5 = oyuncu 0 çukurları, 6 = oyuncu 0 haznesi, 7-12 = oyuncu 1 çukurları, 13 = oyuncu 1 haznesi.
// Taşlar saat yönünün tersine (artan indeks) dağıtılır; rakibin haznesi atlanır.

export const STORE = [6, 13];
export const START_STONES = 4;

/** Yeni oyun durumu: her çukurda 4 taş, hazneler boş, oyuncu 0 başlar. */
export function newState(stones = START_STONES) {
  const pits = new Array(14).fill(stones);
  pits[6] = 0;
  pits[13] = 0;
  return { pits, turn: 0, over: false };
}

export function cloneState(s) {
  return { pits: s.pits.slice(), turn: s.turn, over: s.over };
}

/** Oyuncunun çukur indeksleri. */
export function ownPits(player) {
  return player === 0 ? [0, 1, 2, 3, 4, 5] : [7, 8, 9, 10, 11, 12];
}

export function ownerOf(pit) {
  if (pit === 6) return 0;
  if (pit === 13) return 1;
  return pit < 6 ? 0 : 1;
}

/** Karşı çukur: 0<->12, 1<->11 ... 5<->7. */
export function opposite(pit) {
  return 12 - pit;
}

/** Sırası gelen oyuncunun oynayabileceği (boş olmayan) çukurlar. */
export function legalMoves(s) {
  if (s.over) return [];
  return ownPits(s.turn).filter((i) => s.pits[i] > 0);
}

function sideEmpty(pits, player) {
  return ownPits(player).every((i) => pits[i] === 0);
}

/** Bir taraf boşaldıysa kalan taşları sahibine yazar ve oyunu bitirir. */
function settle(s) {
  if (sideEmpty(s.pits, 0) || sideEmpty(s.pits, 1)) {
    for (const p of [0, 1]) {
      for (const i of ownPits(p)) {
        s.pits[STORE[p]] += s.pits[i];
        s.pits[i] = 0;
      }
    }
    s.over = true;
  }
}

/**
 * Hamle uygular. Yeni durum ve ayrıntıları döndürür:
 * { state, path (taşın düştüğü indeksler), extra (tekrar oynama), captured (ele geçirilen taş sayısı), captureAt, swept (oyun sonu taşıma) }
 * Geçersiz hamlede null döner.
 */
export function applyMove(s, pit) {
  if (s.over || ownerOf(pit) !== s.turn || pit === 6 || pit === 13 || s.pits[pit] === 0) return null;
  const me = s.turn;
  const next = cloneState(s);
  const skip = STORE[1 - me];
  let hand = next.pits[pit];
  next.pits[pit] = 0;
  const path = [];
  let i = pit;
  while (hand > 0) {
    i = (i + 1) % 14;
    if (i === skip) continue;
    next.pits[i] += 1;
    path.push(i);
    hand -= 1;
  }
  const last = i;
  let captured = 0;
  let captureAt = -1;
  let extra = false;
  if (last === STORE[me]) {
    extra = true;
  } else if (ownerOf(last) === me && next.pits[last] === 1 && next.pits[opposite(last)] > 0) {
    // Boş kendi çukuruna düştü: karşı çukur ve son taş hazneye gider
    captured = next.pits[opposite(last)];
    captureAt = opposite(last);
    next.pits[STORE[me]] += captured + 1;
    next.pits[opposite(last)] = 0;
    next.pits[last] = 0;
  }
  const before = next.pits[6] + next.pits[13];
  settle(next);
  const swept = next.over;
  if (next.over) extra = false;
  else next.turn = extra ? me : 1 - me;
  // Sırası gelen oyuncunun hamlesi kalmadıysa settle zaten oyunu bitirir (taraf boş demektir)
  return { state: next, path, extra, captured, captureAt, swept, sweptStones: swept ? next.pits[6] + next.pits[13] - before : 0, last };
}

/** Oyun sonu sonucu: 0, 1 veya 'draw'. Bitmediyse null. */
export function winner(s) {
  if (!s.over) return null;
  if (s.pits[6] > s.pits[13]) return 0;
  if (s.pits[13] > s.pits[6]) return 1;
  return 'draw';
}

/** Değerlendirme: oyuncu `me` açısından hazne farkı + kendi taraftaki taş farkı (küçük ağırlık). */
export function evaluate(s, me) {
  const you = 1 - me;
  let diff = s.pits[STORE[me]] - s.pits[STORE[you]];
  if (s.over) return diff * 100;
  let mine = 0;
  let theirs = 0;
  for (const i of ownPits(me)) mine += s.pits[i];
  for (const i of ownPits(you)) theirs += s.pits[i];
  return diff * 10 + (mine - theirs) * 0.5;
}

// Hamle sıralaması: tekrar oynatanlar önce, sonra ele geçirenler (alfa-beta budamayı hızlandırır)
function orderedMoves(s) {
  const moves = legalMoves(s);
  const scored = moves.map((m) => {
    const r = applyMove(s, m);
    return { m, r, k: (r.extra ? 100 : 0) + r.captured * 2 };
  });
  scored.sort((a, b) => b.k - a.k);
  return scored;
}

function search(s, depth, alpha, beta, me) {
  if (s.over || depth === 0) return evaluate(s, me);
  const list = orderedMoves(s);
  if (s.turn === me) {
    let best = -Infinity;
    for (const { r } of list) {
      const v = search(r.state, depth - 1, alpha, beta, me);
      if (v > best) best = v;
      if (best > alpha) alpha = best;
      if (alpha >= beta) break;
    }
    return best;
  }
  let best = Infinity;
  for (const { r } of list) {
    const v = search(r.state, depth - 1, alpha, beta, me);
    if (v < best) best = v;
    if (best < beta) beta = best;
    if (alpha >= beta) break;
  }
  return best;
}

export const LEVEL_DEPTH = { kolay: 2, orta: 4, zor: 7 };

/** Sırası gelen oyuncu için en iyi çukuru seçer (eşit puanlarda rastgele). Hamle yoksa -1. */
export function chooseMove(s, depth, rng = Math.random) {
  const moves = legalMoves(s);
  if (moves.length === 0) return -1;
  if (moves.length === 1) return moves[0];
  const me = s.turn;
  let bestScore = -Infinity;
  let bestMoves = [];
  for (const { m, r } of orderedMoves(s)) {
    const v = search(r.state, depth - 1, -Infinity, Infinity, me);
    if (v > bestScore + 1e-9) {
      bestScore = v;
      bestMoves = [m];
    } else if (Math.abs(v - bestScore) <= 1e-9) bestMoves.push(m);
  }
  return bestMoves[Math.floor(rng() * bestMoves.length)];
}
