// GIF kodlama çekirdeği: hem Web Worker'da hem (worker yoksa) ana iş parçacığında kullanılır.
// gifenc (MIT) renk azaltma + LZW yapar; dithering burada eklenir (gifenc'te yok).
import { GIFEncoder, quantize, applyPalette } from '../vendor/gifenc@1.0.3/gifenc.esm.js';

// 4x4 Bayer matrisi; ordered dithering için (0..15 → -0.5..+0.5 aralığına ölçeklenir)
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

/** RGBA verisine hafif ordered dithering uygular (yeni dizi döner). */
function ditherRgba(rgba, width, height, strength = 24) {
  const out = new Uint8ClampedArray(rgba.length);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const t = (BAYER[(y & 3) * 4 + (x & 3)] / 16 - 0.5) * strength;
      out[i] = rgba[i] + t;
      out[i + 1] = rgba[i + 1] + t;
      out[i + 2] = rgba[i + 2] + t;
      out[i + 3] = 255;
    }
  }
  return out;
}

/**
 * Akış tabanlı GIF kodlayıcı. Kareler teker teker eklenir, bellek birikmez.
 * opts: { width, height, repeat (0 sonsuz, -1 bir kez, n adet), maxColors (2..256), dither (bool) }
 */
export function createGifEncoder(opts) {
  const { width, height, repeat = 0, maxColors = 256, dither = false } = opts;
  const gif = GIFEncoder({ initialCapacity: 1 << 20 });
  let count = 0;
  return {
    /** rgba: Uint8ClampedArray (width*height*4), delay: ms */
    addFrame(rgba, delay) {
      // Yarı saydam pikselleri beyaz zemine indir (GIF'te alfa yok)
      for (let i = 3; i < rgba.length; i += 4) {
        const a = rgba[i];
        if (a < 255) {
          const k = a / 255;
          rgba[i - 3] = rgba[i - 3] * k + 255 * (1 - k);
          rgba[i - 2] = rgba[i - 2] * k + 255 * (1 - k);
          rgba[i - 1] = rgba[i - 1] * k + 255 * (1 - k);
          rgba[i] = 255;
        }
      }
      const palette = quantize(rgba, maxColors, { format: 'rgb565' });
      const src = dither ? ditherRgba(rgba, width, height) : rgba;
      const index = applyPalette(src, palette, 'rgb565');
      // Her kare kendi paletini taşır (yerel renk tablosu): video için daha doğru renk.
      gif.writeFrame(index, width, height, { palette, delay, repeat, dispose: 1 });
      count++;
    },
    finish() {
      gif.finish();
      return { bytes: gif.bytes(), frames: count };
    },
  };
}
