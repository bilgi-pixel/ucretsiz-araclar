// Metin SHA-256 Özeti Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const metin = String(v.metin ?? '');
    if (metin === '') h.err('Özeti hesaplanacak metni yazın. Boş metin için bir sonuç gösterilmez.');
    const bytes = new TextEncoder().encode(metin);
    const K = [
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
      0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
      0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
      0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
      0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
      0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
    ];
    const H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    const n = bytes.length;
    const toplam = Math.ceil((n + 9) / 64) * 64;
    const m = new Uint8Array(toplam);
    m.set(bytes); m[n] = 0x80;
    const dv = new DataView(m.buffer);
    dv.setUint32(toplam - 8, Math.floor((n * 8) / 4294967296));
    dv.setUint32(toplam - 4, (n * 8) >>> 0);
    const rotr = (x, k) => (x >>> k) | (x << (32 - k));
    const w = new Uint32Array(64);
    for (let o = 0; o < toplam; o += 64) {
      for (let i = 0; i < 16; i++) w[i] = dv.getUint32(o + i * 4);
      for (let i = 16; i < 64; i++) {
        const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
        const s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
        w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
      }
      let [a, b, c, d, e, f, g, hh] = H;
      for (let i = 0; i < 64; i++) {
        const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
        const ch = (e & f) ^ (~e & g);
        const t1 = (hh + S1 + ch + K[i] + w[i]) >>> 0;
        const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
        const maj = (a & b) ^ (a & c) ^ (b & c);
        const t2 = (S0 + maj) >>> 0;
        hh = g; g = f; f = e; e = (d + t1) >>> 0; d = c; c = b; b = a; a = (t1 + t2) >>> 0;
      }
      H[0] = (H[0] + a) >>> 0; H[1] = (H[1] + b) >>> 0; H[2] = (H[2] + c) >>> 0; H[3] = (H[3] + d) >>> 0;
      H[4] = (H[4] + e) >>> 0; H[5] = (H[5] + f) >>> 0; H[6] = (H[6] + g) >>> 0; H[7] = (H[7] + hh) >>> 0;
    }
    const ozet = new Uint8Array(32);
    const odv = new DataView(ozet.buffer);
    H.forEach((x, i) => odv.setUint32(i * 4, x));
    let hex = Array.from(ozet, (x) => x.toString(16).padStart(2, '0')).join('');
    const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let b64 = '';
    for (let i = 0; i < 32; i += 3) {
      const x = (ozet[i] << 16) | ((ozet[i + 1] ?? 0) << 8) | (ozet[i + 2] ?? 0);
      b64 += abc[(x >> 18) & 63] + abc[(x >> 12) & 63] + (i + 1 < 32 ? abc[(x >> 6) & 63] : '=') + (i + 2 < 32 ? abc[x & 63] : '=');
    }
    const rows = [
      ['SHA-256 özeti', v.harf === 'buyuk' ? hex.toUpperCase() : hex],
      ['Base64 gösterimi', b64],
      ['Girdi uzunluğu', `${h.fmt([...metin].length, 0)} karakter, ${h.fmt(n, 0)} bayt (UTF-8)`],
      ['Özet uzunluğu', '256 bit (64 onaltılık hane)'],
    ];
    const bek = String(v.beklenen ?? '').trim().replace(/[\s:-]/g, '').toLowerCase();
    if (bek !== '') {
      if (!/^[0-9a-f]{64}$/.test(bek)) h.err('Karşılaştırılacak özet 64 onaltılık haneden (0–9, a–f) oluşmalıdır. Değeri eksiksiz yapıştırdığınızdan emin olun.');
      rows.push(['Karşılaştırma', bek === hex ? 'Eşleşiyor' : 'Eşleşmiyor']);
    }
    return { rows, note: 'Metin UTF-8 olarak kodlanır. Satır sonları tek satır besleme (LF) karakteri olarak işlenir.' };
  }
