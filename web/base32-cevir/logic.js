// Base32 Kodlama ve Çözme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    const ham = String(v.girdi ?? '');
    const hexYaz = (bytes) => Array.from(bytes, (b) => b.toString(16).toUpperCase().padStart(2, '0')).join(' ');
    if (v.yon === 'coz') {
      const t = ham.replace(/\s/g, '').replace(/=+$/, '').toUpperCase();
      if (t === '') h.err('Çözülecek Base32 dizgisini yazın.');
      const kotu = t.match(/[^A-Z2-7]/);
      if (kotu) h.err(`Base32 dizgisinde geçersiz karakter var: "${kotu[0]}". Yalnızca A–Z harfleri ve 2–7 rakamları kullanılır; 0, 1, 8 ve 9 alfabede yoktur.`);
      const kalan = t.length % 8;
      if (kalan === 1 || kalan === 3 || kalan === 6) h.err('Base32 dizgisinin uzunluğu geçersiz; sonunda eksik ya da fazla karakter olabilir. Dizgiyi eksiksiz kopyaladığınızdan emin olun.');
      const bytes = [];
      let tampon = 0, bit = 0;
      for (const ch of t) {
        tampon = (tampon << 5) | ABC.indexOf(ch); bit += 5;
        if (bit >= 8) { bit -= 8; bytes.push((tampon >> bit) & 0xff); tampon &= (1 << bit) - 1; }
      }
      const u8 = new Uint8Array(bytes);
      let metin, gecerli = true;
      try { metin = new TextDecoder('utf-8', { fatal: true }).decode(u8); } catch { gecerli = false; metin = '(Baytlar geçerli bir UTF-8 metin değil; onaltılık satıra bakın.)'; }
      return {
        rows: [
          ['Çözülen metin', metin],
          ['Baytlar (onaltılık)', hexYaz(u8)],
          ['Uzunluk', `${h.fmt(t.length, 0)} Base32 karakteri → ${h.fmt(u8.length, 0)} bayt`],
        ],
        text: gecerli ? metin : hexYaz(u8),
        note: gecerli ? 'Baytlar UTF-8 metin olarak yorumlandı.' : 'Çözülen veri metin değil, ikili veri gibi görünüyor; baytlar onaltılık olarak verildi.',
      };
    }
    if (ham === '') h.err('Kodlanacak metni yazın.');
    const u8 = new TextEncoder().encode(ham);
    let out = '', tampon = 0, bit = 0;
    for (const b of u8) {
      tampon = (tampon << 8) | b; bit += 8;
      while (bit >= 5) { bit -= 5; out += ABC[(tampon >> bit) & 31]; tampon &= (1 << bit) - 1; }
    }
    if (bit > 0) out += ABC[(tampon << (5 - bit)) & 31];
    const dolgusuz = out.length;
    if (v.dolgu !== 'yok') while (out.length % 8) out += '=';
    return {
      rows: [
        ['Base32', out],
        ['Baytlar (onaltılık)', hexYaz(u8)],
        ['Uzunluk', `${h.fmt(u8.length, 0)} bayt → ${h.fmt(out.length, 0)} karakter`],
        ['Dolgu', out.length === dolgusuz ? 'Yok' : `${out.length - dolgusuz} adet =`],
      ],
      text: out,
      note: 'RFC 4648 Base32 alfabesi (A–Z, 2–7) kullanıldı; metin UTF-8 olarak kodlandı.',
    };
  }
