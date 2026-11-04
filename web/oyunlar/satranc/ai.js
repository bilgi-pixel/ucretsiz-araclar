// Satranç yapay zekâsı: malzeme + kare tabloları değerlendirmesi, alfa-beta budamalı negamax,
// yinelemeli derinleştirme ve süre sınırı. Web Worker (worker.js) içinde çalışır; UI donmaz.
//
// Hız için chess.js'in iç (alt çizgili) yöntemleri kullanılır: _moves, _makeMove, _undoMove,
// _isKingAttacked, _board, _turn. Bunlar herkese açık API değildir; bu yüzden kütüphane
// web/vendor/chess.js@1.4.0 altında SABİTLENMİŞTİR ve perft() ile her testte doğrulanır.
// Sürüm yükseltilirse perft testi (tests/oyun-satranc.spec.ts) bozulursa burası güncellenmelidir.
import { Chess } from '../../vendor/chess.js@1.4.0/chess.js';

/** Seviye ayarları: derinlik, süre sınırı (ms), sessiz arama derinliği, "yeterince iyi" hamle toleransı (cp). */
export const LEVELS = {
  kolay: { depth: 1, limitMs: 1200, qDepth: 0, tolerance: 70, randomMove: 0.08 },
  orta: { depth: 2, limitMs: 2200, qDepth: 2, tolerance: 14, randomMove: 0 },
  zor: { depth: 3, limitMs: 2800, qDepth: 4, tolerance: 6, randomMove: 0 },
};

const MATE = 100000;
const VALUE = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };

// Kare tabloları: beyaz bakış açısı, ilk satır 8. sıra (a8..h8). Siyah için dikey aynalanır.
const PST = {
  p: [
    0, 0, 0, 0, 0, 0, 0, 0,
    50, 50, 50, 50, 50, 50, 50, 50,
    10, 10, 20, 30, 30, 20, 10, 10,
    5, 5, 10, 25, 25, 10, 5, 5,
    0, 0, 0, 20, 20, 0, 0, 0,
    5, -5, -10, 0, 0, -10, -5, 5,
    5, 10, 10, -20, -20, 10, 10, 5,
    0, 0, 0, 0, 0, 0, 0, 0,
  ],
  n: [
    -50, -40, -30, -30, -30, -30, -40, -50,
    -40, -20, 0, 0, 0, 0, -20, -40,
    -30, 0, 10, 15, 15, 10, 0, -30,
    -30, 5, 15, 20, 20, 15, 5, -30,
    -30, 0, 15, 20, 20, 15, 0, -30,
    -30, 5, 10, 15, 15, 10, 5, -30,
    -40, -20, 0, 5, 5, 0, -20, -40,
    -50, -40, -30, -30, -30, -30, -40, -50,
  ],
  b: [
    -20, -10, -10, -10, -10, -10, -10, -20,
    -10, 0, 0, 0, 0, 0, 0, -10,
    -10, 0, 5, 10, 10, 5, 0, -10,
    -10, 5, 5, 10, 10, 5, 5, -10,
    -10, 0, 10, 10, 10, 10, 0, -10,
    -10, 10, 10, 10, 10, 10, 10, -10,
    -10, 5, 0, 0, 0, 0, 5, -10,
    -20, -10, -10, -10, -10, -10, -10, -20,
  ],
  r: [
    0, 0, 0, 0, 0, 0, 0, 0,
    5, 10, 10, 10, 10, 10, 10, 5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    0, 0, 0, 5, 5, 0, 0, 0,
  ],
  q: [
    -20, -10, -10, -5, -5, -10, -10, -20,
    -10, 0, 0, 0, 0, 0, 0, -10,
    -10, 0, 5, 5, 5, 5, 0, -10,
    -5, 0, 5, 5, 5, 5, 0, -5,
    0, 0, 5, 5, 5, 5, 0, -5,
    -10, 5, 5, 5, 5, 5, 0, -10,
    -10, 0, 5, 0, 0, 0, 0, -10,
    -20, -10, -10, -5, -5, -10, -10, -20,
  ],
  kMid: [
    -30, -40, -40, -50, -50, -40, -40, -30,
    -30, -40, -40, -50, -50, -40, -40, -30,
    -30, -40, -40, -50, -50, -40, -40, -30,
    -30, -40, -40, -50, -50, -40, -40, -30,
    -20, -30, -30, -40, -40, -30, -30, -20,
    -10, -20, -20, -20, -20, -20, -20, -10,
    20, 20, 0, 0, 0, 0, 20, 20,
    20, 30, 10, 0, 0, 10, 30, 20,
  ],
  kEnd: [
    -50, -40, -30, -20, -20, -30, -40, -50,
    -30, -20, -10, 0, 0, -10, -20, -30,
    -30, -10, 20, 30, 30, 20, -10, -30,
    -30, -10, 30, 40, 40, 30, -10, -30,
    -30, -10, 30, 40, 40, 30, -10, -30,
    -30, -10, 20, 30, 30, 20, -10, -30,
    -30, -30, 0, 0, 0, 0, -30, -30,
    -50, -30, -30, -30, -30, -30, -30, -50,
  ],
};

/** Taşın 0x88 karesi → cebirsel ad (örn. 0x64 → "e2"). */
const FILES = 'abcdefgh';
const sqName = (s) => FILES[s & 7] + (8 - (s >> 4));

/** Beyaz bakış açısıyla statik değerlendirme (santipiyon). */
function evaluateWhite(chess) {
  const board = chess._board;
  let score = 0;
  let nonPawn = 0;
  let wBishops = 0;
  let bBishops = 0;
  let wKing = -1;
  let bKing = -1;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const sq = row * 16 + col;
      const pc = board[sq];
      if (!pc) continue;
      const t = pc.type;
      const base = VALUE[t];
      if (t === 'k') {
        if (pc.color === 'w') wKing = row * 8 + col; else bKing = (7 - row) * 8 + col;
        continue;
      }
      if (t !== 'p') nonPawn += base;
      if (pc.color === 'w') {
        score += base + PST[t][row * 8 + col];
        if (t === 'b') wBishops++;
      } else {
        score -= base + PST[t][(7 - row) * 8 + col];
        if (t === 'b') bBishops++;
      }
    }
  }
  const endgame = nonPawn <= 2600;
  const kt = endgame ? PST.kEnd : PST.kMid;
  if (wKing >= 0) score += kt[wKing];
  if (bKing >= 0) score -= kt[bKing];
  if (wBishops >= 2) score += 30;
  if (bBishops >= 2) score -= 30;
  return score;
}

/** Sıradaki oyuncunun bakış açısıyla değerlendirme (negamax için). */
const evaluate = (chess) => (chess._turn === 'w' ? evaluateWhite(chess) : -evaluateWhite(chess));

/** Hamle sıralama puanı: değerli taşı küçük taşla almak ve terfi önce denenir. */
function orderScore(m, killers) {
  let s = 0;
  if (m.captured) s += 10 * VALUE[m.captured] - VALUE[m.piece] / 10 + 10000;
  if (m.promotion) s += 8000 + VALUE[m.promotion];
  if (killers) {
    const k0 = killers[0];
    const k1 = killers[1];
    if (k0 && k0.from === m.from && k0.to === m.to) s += 6000;
    else if (k1 && k1.from === m.from && k1.to === m.to) s += 5000;
  }
  return s;
}

class Abort extends Error {}

function sortMoves(moves, killers) {
  const keyed = moves.map((m) => ({ m, s: orderScore(m, killers) }));
  keyed.sort((a, b) => b.s - a.s);
  return keyed.map((k) => k.m);
}

function checkTime(ctx) {
  if ((++ctx.nodes & 255) === 0 && performance.now() > ctx.deadline) throw new Abort();
}

/** Sessiz arama: yalnızca almalar ve terfiler; ufuk etkisini azaltır. */
function quiesce(chess, alpha, beta, qd, ctx) {
  checkTime(ctx);
  const stand = evaluate(chess);
  if (qd <= 0) return stand;
  if (stand >= beta) return stand;
  if (stand > alpha) alpha = stand;
  const us = chess._turn;
  const loud = chess._moves({ legal: false }).filter((m) => m.captured || m.promotion);
  if (!loud.length) return stand;
  let best = stand;
  for (const m of sortMoves(loud, null)) {
    chess._makeMove(m);
    if (chess._isKingAttacked(us)) { chess._undoMove(); continue; }
    const score = -quiesce(chess, -beta, -alpha, qd - 1, ctx);
    chess._undoMove();
    if (score > best) best = score;
    if (score > alpha) alpha = score;
    if (alpha >= beta) break;
  }
  return best;
}

function negamax(chess, depth, alpha, beta, ply, ctx) {
  checkTime(ctx);
  if (chess._halfMoves >= 100) return 0; // 50 hamle kuralı
  const us = chess._turn;
  if (depth <= 0) {
    // Şah çekilmişse bir yarım hamle uzat: matı (cevapsız kalmayı) görebilmek için.
    if (ply < ctx.maxPly && chess._isKingAttacked(us)) depth = 1;
    else return quiesce(chess, alpha, beta, ctx.qDepth, ctx);
  }
  const moves = sortMoves(chess._moves({ legal: false }), ctx.killers[ply]);
  let best = -Infinity;
  let legalCount = 0;
  for (const m of moves) {
    chess._makeMove(m);
    if (chess._isKingAttacked(us)) { chess._undoMove(); continue; }
    legalCount++;
    const score = -negamax(chess, depth - 1, -beta, -alpha, ply + 1, ctx);
    chess._undoMove();
    if (score > best) best = score;
    if (score > alpha) alpha = score;
    if (alpha >= beta) {
      // Sessiz (almasız) bir hamle kesme yaptıysa "katil hamle" olarak hatırla.
      if (!m.captured) {
        const k = ctx.killers[ply] || (ctx.killers[ply] = []);
        if (!k[0] || k[0].from !== m.from || k[0].to !== m.to) { k[1] = k[0]; k[0] = m; }
      }
      break;
    }
  }
  if (legalCount === 0) return chess._isKingAttacked(us) ? -MATE + ply : 0; // mat ya da pat
  return best;
}

/** Kök arama: her hamle için puan döndürür. window: alfa alt sınırı toleransla genişletilir. */
// "Hemen kazanç" önceliği: ufuk etkisiyle terfi ya da taş almayı sonsuza dek ertelemesin diye
// eşit puanlı hamleler arasında terfi/alma küçük bir ek puan alır (yalnızca seçimde, aramada değil).
const PROMO_BONUS = 60; // vezire terfi (diğer terfiler 10)
const CAPTURE_BONUS = 8;
const rootBonus = (m) => (m.promotion ? (m.promotion === 'q' ? PROMO_BONUS : 10) : 0) + (m.captured ? CAPTURE_BONUS : 0);

function searchRoot(chess, rootMoves, depth, ctx, tolerance) {
  let bestScore = -Infinity;
  const scored = [];
  let alpha = -Infinity;
  for (const m of rootMoves) {
    const alphaUsed = alpha;
    chess._makeMove(m);
    const score = -negamax(chess, depth - 1, -MATE * 2, -alpha, 1, ctx);
    chess._undoMove();
    // exact: pencere içinde kalan puan kesindir; pencere altına düşenler yalnızca üst sınırdır.
    scored.push({ m, score, adj: score + rootBonus(m), exact: score > alphaUsed });
    if (score > bestScore) {
      bestScore = score;
      // Toleranslı pencere: en iyiye yakın hamleler de kesin puan alır (ek puan payı dahil).
      alpha = bestScore - tolerance - PROMO_BONUS - CAPTURE_BONUS;
    }
  }
  return { scored, bestScore };
}

const toResult = (m, extra) => ({
  from: sqName(m.from),
  to: sqName(m.to),
  promotion: m.promotion || null,
  ...extra,
});

/**
 * Verilen konumda (FEN) sıradaki taraf için hamle seçer.
 * Dönüş: { from, to, promotion, depth, nodes, ms, score } veya hamle yoksa null.
 */
export function chooseMove(fen, level = 'orta', options = {}) {
  const cfg = { ...(LEVELS[level] || LEVELS.orta), ...options };
  const t0 = performance.now();
  const chess = new Chess(fen);
  let rootMoves = chess._moves(); // yasal hamleler
  if (!rootMoves.length) return null;
  if (rootMoves.length === 1) return toResult(rootMoves[0], { depth: 0, nodes: 0, ms: 0, score: 0 });

  // Kolay seviye: ara sıra rastgele (yasal) hamle.
  if (cfg.randomMove && Math.random() < cfg.randomMove) {
    const m = rootMoves[Math.floor(Math.random() * rootMoves.length)];
    return toResult(m, { depth: 0, nodes: 0, ms: 0, score: 0 });
  }

  const ctx = { nodes: 0, deadline: t0 + cfg.limitMs, qDepth: cfg.qDepth, killers: [], maxPly: cfg.depth + 3 };
  rootMoves = sortMoves(rootMoves, null);
  let pick = null;
  let reached = 0;
  for (let d = 1; d <= cfg.depth; d++) {
    let out;
    try {
      out = searchRoot(chess, rootMoves, d, ctx, cfg.tolerance);
    } catch (e) {
      if (!(e instanceof Abort)) throw e;
      break; // süre doldu: önceki derinliğin sonucu geçerli kalır
    }
    reached = d;
    // Tolerans içindeki hamleler arasından rastgele seç; mat bulunduysa en iyisini al.
    const exact = out.scored.filter((s) => s.exact);
    let near;
    if (out.bestScore > MATE / 2) {
      near = exact.filter((s) => s.score === out.bestScore); // mat: en kısa yolu al
    } else {
      const bestAdj = Math.max(...exact.map((s) => s.adj));
      near = exact.filter((s) => s.adj >= bestAdj - cfg.tolerance);
    }
    pick = near[Math.floor(Math.random() * near.length)];
    // Sonraki yineleme için en iyi hamleler öne alınır.
    rootMoves = out.scored.slice().sort((a, b) => b.score - a.score).map((s) => s.m);
    pick.best = out.bestScore;
    // Bir sonraki derinlik kalan sürenin çok üstündeyse hiç başlama.
    const elapsed = performance.now() - t0;
    if (d < cfg.depth && elapsed > cfg.limitMs * 0.35) break;
  }
  if (!pick) {
    // Hiçbir derinlik bitmediyse (çok yavaş cihaz): sıralamadaki ilk hamle.
    return toResult(rootMoves[0], { depth: 0, nodes: ctx.nodes, ms: Math.round(performance.now() - t0), score: 0 });
  }
  return toResult(pick.m, {
    depth: reached,
    nodes: ctx.nodes,
    ms: Math.round(performance.now() - t0),
    score: pick.best,
  });
}

/** Doğrulama: belirli derinlikte yasal hamle ağacı büyüklüğü (iç yöntemlerin doğru çalıştığını gösterir). */
export function perft(fen, depth) {
  const chess = new Chess(fen);
  const walk = (d) => {
    if (d === 0) return 1;
    let n = 0;
    for (const m of chess._moves()) {
      chess._makeMove(m);
      n += walk(d - 1);
      chess._undoMove();
    }
    return n;
  };
  return walk(depth);
}
