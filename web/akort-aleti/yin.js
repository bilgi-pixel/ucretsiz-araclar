// YIN perde (pitch) tespiti: de Cheveigné & Kawahara (2002) algoritmasının sade bir uygulaması.
// Saf fonksiyon: DOM veya WebAudio'ya bağlı değildir; Node'da da sınanabilir.

/** Tamponun RMS (etkin) genliğini döndürür. */
export function rms(buf) {
  let s = 0;
  for (let i = 0; i < buf.length; i++) s += buf[i] * buf[i];
  return Math.sqrt(s / buf.length);
}

/**
 * Temel frekansı (Hz) bulur.
 * @param {Float32Array} buf zaman alanı örnekleri
 * @param {number} sampleRate örnekleme hızı
 * @param {{minHz?:number,maxHz?:number,threshold?:number}} [opt]
 * @returns {{freq:number, clarity:number}|null} bulunamazsa null
 */
export function detectPitch(buf, sampleRate, opt = {}) {
  const minHz = opt.minHz || 50;
  const maxHz = opt.maxHz || 1500;
  const threshold = opt.threshold || 0.15;
  const half = Math.floor(buf.length / 2);
  const tauMax = Math.min(half - 1, Math.floor(sampleRate / minHz));
  const tauMin = Math.max(2, Math.floor(sampleRate / maxHz));
  if (tauMax <= tauMin + 2) return null;

  // 1) Fark fonksiyonu d(tau) ve 2) kümülatif ortalama normalize fark (CMNDF)
  const d = new Float32Array(tauMax + 1);
  for (let tau = 1; tau <= tauMax; tau++) {
    let sum = 0;
    for (let j = 0; j < half; j++) {
      const diff = buf[j] - buf[j + tau];
      sum += diff * diff;
    }
    d[tau] = sum;
  }
  const cmnd = new Float32Array(tauMax + 1);
  cmnd[0] = 1;
  let running = 0;
  for (let tau = 1; tau <= tauMax; tau++) {
    running += d[tau];
    cmnd[tau] = running === 0 ? 1 : (d[tau] * tau) / running;
  }

  // 3) Eşiğin altına inen ilk çukuru bul (yerel minimuma kadar in)
  let tauEst = -1;
  for (let tau = tauMin; tau <= tauMax; tau++) {
    if (cmnd[tau] < threshold) {
      while (tau + 1 <= tauMax && cmnd[tau + 1] < cmnd[tau]) tau++;
      tauEst = tau;
      break;
    }
  }
  if (tauEst === -1) {
    // Eşik geçilemediyse genel minimuma bak; yeterince belirgin değilse "perde yok".
    let best = tauMin;
    for (let tau = tauMin; tau <= tauMax; tau++) if (cmnd[tau] < cmnd[best]) best = tau;
    if (cmnd[best] > 0.3) return null;
    tauEst = best;
  }

  // 4) Parabolik ara değerleme: örnek aralığından ince doğruluk (cent altı)
  let refined = tauEst;
  if (tauEst > 1 && tauEst < tauMax) {
    const a = cmnd[tauEst - 1], b = cmnd[tauEst], c = cmnd[tauEst + 1];
    const den = a - 2 * b + c;
    if (den !== 0) refined = tauEst + (a - c) / (2 * den);
  }
  const freq = sampleRate / refined;
  if (!(freq >= minHz && freq <= maxHz)) return null;
  return { freq, clarity: Math.max(0, Math.min(1, 1 - cmnd[tauEst])) };
}

/** Frekanstan MIDI nota numarası (ondalıklı). a4: referans la frekansı. */
export function freqToMidi(freq, a4 = 440) {
  return 69 + 12 * Math.log2(freq / a4);
}
/** MIDI nota numarasından frekans. */
export function midiToFreq(midi, a4 = 440) {
  return a4 * Math.pow(2, (midi - 69) / 12);
}
/** İki frekans arasındaki fark (cent). Pozitif: f, hedeften tiz. */
export function centsBetween(f, target) {
  return 1200 * Math.log2(f / target);
}

const TR = ['Do', 'Do♯', 'Re', 'Re♯', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯', 'La', 'La♯', 'Si'];
const EN = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
/** MIDI numarasından nota adları. midi 60 = Do4 (C4). */
export function noteName(midi) {
  const n = Math.round(midi);
  const pc = ((n % 12) + 12) % 12;
  return { tr: TR[pc], en: EN[pc], octave: Math.floor(n / 12) - 1, pc };
}
