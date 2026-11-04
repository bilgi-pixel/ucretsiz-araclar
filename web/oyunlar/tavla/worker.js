// Tavla hesaplama işçisi: ağır arama ana iş parçacığından ayrı çalışır, böylece arayüz donmaz.
// Mesaj: { id, st, side, dice, level, seed } → yanıt: { id, ok: true, result } ya da { id, ok: false, error }.
// Ağ isteği yok; yalnızca aynı klasördeki engine.js ve ai.js yüklenir.
import { chooseSequence } from './ai.js';

self.onmessage = (e) => {
  const { id, st, side, dice, level, seed } = e.data || {};
  try {
    self.postMessage({ id, ok: true, result: chooseSequence(st, side, dice, level, seed) });
  } catch (err) {
    self.postMessage({ id, ok: false, error: String((err && err.message) || err) });
  }
};
