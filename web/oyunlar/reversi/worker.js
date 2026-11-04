// Reversi hesaplama işçisi: arama ana iş parçacığından ayrı çalışır, arayüz donmaz.
// Mesaj: { id, board, side, level } → yanıt: { id, ok: true, idx } ya da { id, ok: false, error }.
// Ağ isteği yok; yalnızca aynı klasördeki engine.js yüklenir.
import { chooseMove } from './engine.js';

self.onmessage = (e) => {
  const { id, board, side, level } = e.data || {};
  try {
    const m = chooseMove(board, side, level);
    self.postMessage({ id, ok: true, idx: m ? m.idx : -1 });
  } catch (err) {
    self.postMessage({ id, ok: false, error: String((err && err.message) || err) });
  }
};
