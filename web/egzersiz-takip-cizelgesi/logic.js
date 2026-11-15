// Egzersiz Takip Çizelgesi Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ilk = h.dateOrToday(v.baslangic, 'Başlangıç tarihi');
    const n = h.posint(v.hafta, 'Hafta sayısı');
    if (n > 12) h.err('Hafta sayısı en fazla 12 olabilir; daha uzun dönem için aracı ikinci kez çalıştırın.');
    const har = h.lines(v.hareketler);
    if (har.length > 10) h.err('En fazla 10 egzersiz yazabilirsiniz; benzer hareketleri tek satırda birleştirin.');
    for (const e of har) if (e.length > 28) h.err(`"${e.slice(0, 18)}…" 28 karakterden uzun; kısaltın.`);
    const baslik = (v.baslik || '').trim() || 'Egzersiz Takip Çizelgesi';
    if (baslik.length > 40) h.err('Sayfa başlığı en fazla 40 karakter olabilir.');
    const satir = Math.max(['6', '8', '10'].includes(v.satir) ? Number(v.satir) : 8, har.length);
    const a5 = v.boyut === 'a5';
    const W = a5 ? 210 : 297, H = a5 ? 148 : 210, k = a5 ? 0.7 : 1, m = a5 ? 8 : 12;
    const F = (p) => Math.max(5, p * k);
    const iw = W - 2 * m;
    const pzt = h.gunEkle(ilk, -((ilk.getUTCDay() + 6) % 7));
    const GUN = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
    const gg = (d) => `${String(d.getUTCDate()).padStart(2, '0')}.${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
    const sayfalar = [];
    for (let i = 0; i < n; i++) {
      const b = h.gunEkle(pzt, i * 7), ops = [];
      ops.push(['yazi', baslik, m, m + 7 * k, F(18), { kalin: true }]);
      ops.push(['yazi', `${h.fmtDate(b)} – ${h.fmtDate(h.gunEkle(b, 6))}  ·  ${i + 1}. hafta / ${n}`, W - m, m + 7 * k, F(10), { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10 * k, W - m, m + 10 * k, { kalinlik: 0.6, ton: 0.2 }]);
      const y0 = m + 14 * k, bh = 9 * k, altH = 26 * k, alt = H - m - altH - 4 * k;
      const cE = 58 * k, gw = (iw - cE) / 7, rh = (alt - y0 - bh) / (satir + 2);
      // Başlık satırı
      ops.push(['kutu', m, y0, cE, bh, { dolgu: 0.9, cizgi: 0.55 }]);
      ops.push(['yazi', 'Egzersiz', m + 2 * k, y0 + 6 * k, F(8.5), { kalin: true }]);
      for (let g = 0; g < 7; g++) {
        const x = m + cE + g * gw;
        ops.push(['kutu', x, y0, gw, bh, { dolgu: g >= 5 ? 0.84 : 0.9, cizgi: 0.55 }]);
        ops.push(['yazi', GUN[g], x + 1.5 * k, y0 + 6 * k, F(8), { kalin: true }]);
        ops.push(['yazi', gg(h.gunEkle(b, g)), x + gw - 1.5 * k, y0 + 6 * k, F(7), { hiza: 'sag', ton: 0.35 }]);
      }
      // Özet satırlarının zemini (son iki satır)
      const oy = y0 + bh + satir * rh;
      ops.push(['kutu', m, oy, iw, 2 * rh, { dolgu: 0.95, cizgi: 0.95, kalinlik: 0.1 }]);
      ops.push(['kutu', m, y0 + bh, iw, alt - y0 - bh, { cizgi: 0.55 }]);
      for (let g = 0; g < 7; g++) { const x = m + cE + g * gw; ops.push(['cizgi', x, y0 + bh, x, alt, { kalinlik: 0.25, ton: 0.55 }]); }
      for (let j = 0; j < satir + 2; j++) {
        const ry = y0 + bh + j * rh;
        if (j) ops.push(['cizgi', m, ry, m + iw, ry, { kalinlik: j === satir ? 0.4 : 0.2, ton: j === satir ? 0.45 : 0.7 }]);
        const ty = ry + rh / 2 + 1.1 * k;
        if (j < satir) { if (har[j]) ops.push(['yazi', har[j], m + 2 * k, ty, F(8)]); }
        else ops.push(['yazi', j === satir ? 'Toplam süre (dk)' : 'Zorlanma (1–5)', m + 2 * k, ty, F(8), { kalin: true }]);
      }
      // Alt bölüm
      const ay = alt + 4 * k, w1 = iw * 0.3, w2 = (iw - w1 - 6 * k) / 2;
      ops.push(['kutu', m, ay, w1, altH, { cizgi: 0.55 }]);
      ops.push(['yazi', 'Haftalık özet', m + 2 * k, ay + 5.2 * k, F(8.5), { kalin: true }]);
      ops.push(['yazi', 'Egzersiz yapılan gün: ______ / 7', m + 2 * k, ay + 13 * k, F(8)]);
      ops.push(['yazi', 'Toplam süre: __________ dk', m + 2 * k, ay + 21 * k, F(8)]);
      const kutu2 = (x, etiket) => {
        ops.push(['kutu', x, ay, w2, altH, { cizgi: 0.55 }]);
        ops.push(['yazi', etiket, x + 2 * k, ay + 5.2 * k, F(8.5), { kalin: true }]);
        for (let j = 1; j <= 3; j++) ops.push(['cizgi', x + 2 * k, ay + 6 * k + j * 6.2 * k, x + w2 - 2 * k, ay + 6 * k + j * 6.2 * k, { kalinlik: 0.2, ton: 0.75 }]);
      };
      kutu2(m + w1 + 3 * k, 'Bu hafta nasıl geçti?');
      kutu2(m + w1 + w2 + 6 * k, 'Gelecek hafta için not');
      sayfalar.push(ops);
    }
    const son = h.gunEkle(pzt, n * 7 - 1);
    return {
      rows: [
        ['Sayfa sayısı', `${n} sayfa`],
        ['İlk hafta', `${h.fmtDate(pzt)} – ${h.fmtDate(h.gunEkle(pzt, 6))}`],
        ['Son gün', `${h.fmtDate(son)} ${h.gunAdi(son)}`],
        ['Egzersiz satırı', `${satir} satır`],
        ['Kâğıt', a5 ? 'A5 yatay (210 × 148 mm)' : 'A4 yatay (297 × 210 mm)'],
      ],
      note: 'Bu çizelge yalnızca kayıt tutmak içindir; tıbbi tavsiye ya da antrenman programı değildir. Yazdırırken yatay yön ve %100 ölçek seçin.',
      pdf: { ad: 'egzersiz-takip-cizelgesi', baslik, boyut: a5 ? 'a5' : 'a4', yatay: true, sayfalar },
    };
  }
