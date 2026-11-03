// GIF kodlama Web Worker'ı: ana iş parçacığı donmasın diye kareler burada işlenir.
// Hiçbir ağ isteği yapmaz; yalnızca aynı origin'deki vendor modülünü içe aktarır.
import { createGifEncoder } from './gif-core.js';

let enc = null;
self.onmessage = (e) => {
  const m = e.data;
  try {
    if (m.type === 'start') {
      enc = createGifEncoder(m);
      self.postMessage({ type: 'ready' });
    } else if (m.type === 'frame') {
      enc.addFrame(new Uint8ClampedArray(m.buffer), m.delay);
      self.postMessage({ type: 'frame-done' });
    } else if (m.type === 'finish') {
      const { bytes, frames } = enc.finish();
      enc = null;
      self.postMessage({ type: 'done', bytes, frames }, [bytes.buffer]);
    }
  } catch (err) {
    self.postMessage({ type: 'error', message: String(err && err.message || err) });
  }
};
