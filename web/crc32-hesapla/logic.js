// CRC32 Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ham = String(v.veri ?? '');
    let bytes;
    if (v.tur === 'hex') {
      const t = ham.replace(/0x/gi, '').replace(/[\s,;:-]/g, '');
      if (t === '') h.err('Onaltılık baytları yazın (örn. 31 32 33).');
      if (!/^[0-9a-fA-F]+$/.test(t)) h.err('Onaltılık kipte yalnızca 0–9 ve A–F haneleri kullanılabilir. Düz metin için girdi türünü "Metin" seçin.');
      if (t.length % 2) h.err('Onaltılık hane sayısı çift olmalıdır; her bayt iki haneyle yazılır (örn. 0A).');
      bytes = new Uint8Array(t.length / 2);
      for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(t.slice(i * 2, i * 2 + 2), 16);
    } else {
      if (ham === '') h.err('CRC32 değeri hesaplanacak metni yazın.');
      bytes = new TextEncoder().encode(ham);
    }
    const tablo = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      tablo[i] = c >>> 0;
    }
    let crc = 0xffffffff;
    for (const b of bytes) crc = tablo[(crc ^ b) & 0xff] ^ (crc >>> 8);
    crc = (crc ^ 0xffffffff) >>> 0;
    const hex = crc.toString(16).toUpperCase().padStart(8, '0');
    const ikili = crc.toString(2).padStart(32, '0').replace(/(.{8})(?=.)/g, '$1 ');
    return {
      rows: [
        ['CRC32 (onaltılık)', hex],
        ['CRC32 (küçük harf)', hex.toLowerCase()],
        ['CRC32 (ondalık)', String(crc)],
        ['CRC32 (ikili)', ikili],
        ['Girdi uzunluğu', `${h.fmt(bytes.length, 0)} bayt`],
      ],
      note: 'CRC-32 (ISO-HDLC): polinom 0x04C11DB7, yansıtılmış işlem, başlangıç ve son XOR değeri 0xFFFFFFFF.',
    };
  }
