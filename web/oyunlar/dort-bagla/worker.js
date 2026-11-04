// Dört Bağla hesaplama işçisi: ağır arama ana iş parçacığından ayrı çalışır, arayüz donmaz.
// Mesaj: { id, board, player, level, seed } → yanıt: { id, ok: true, col } ya da { id, ok: false, error }.
// Ağ isteği yok; yalnızca aynı klasördeki engine.js yüklenir.
import { bestMove, mulberry32 } from './engine.js';

self.onmessage = (e) => {
  const { id, board, player, level, seed } = e.data || {};
  try {
    const res = bestMove(board, player, level, mulberry32(seed || 1));
    self.postMessage({ id, ok: true, col: res.col });
  } catch (err) {
    self.postMessage({ id, ok: false, error: String((err && err.message) || err) });
  }
};
