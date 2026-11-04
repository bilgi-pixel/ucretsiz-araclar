// Satranç hesaplama işçisi: ağır arama ana iş parçacığından ayrı çalışır, böylece arayüz donmaz.
// Mesaj: { id, fen, level } → yanıt: { id, ok: true, result } ya da { id, ok: false, error }.
// Ağ isteği yok; yalnızca aynı klasördeki ai.js ve vendor/chess.js yüklenir.
import { chooseMove } from './ai.js';

self.onmessage = (e) => {
  const { id, fen, level } = e.data || {};
  try {
    self.postMessage({ id, ok: true, result: chooseMove(fen, level) });
  } catch (err) {
    self.postMessage({ id, ok: false, error: String((err && err.message) || err) });
  }
};
