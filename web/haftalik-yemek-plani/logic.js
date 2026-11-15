// Haftalık Yemek Planı Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ilk = h.dateOrToday(v.baslangic, 'Başlangıç tarihi');
    const n = h.posint(v.hafta, 'Hafta sayısı');
    if (n > 8) h.err('Hafta sayısı en fazla 8 olabilir; daha uzun dönem için başlangıç tarihini ilerletip aracı yeniden çalıştırın.');
    const baslik = (v.baslik || '').trim() || 'Haftalık Yemek Planı';
    if (baslik.length > 40) h.err('Sayfa başlığı en fazla 40 karakter olabilir.');
    const OGUN = { 1: ['Akşam yemeği'], 2: ['Öğle', 'Akşam'], 3: ['Kahvaltı', 'Öğle', 'Akşam'], 4: ['Kahvaltı', 'Öğle', 'Akşam', 'Ara öğün'] }[v.ogun] || ['Kahvaltı', 'Öğle', 'Akşam'];
    const liste = v.alisveris !== 'yok';
    const a5 = v.boyut === 'a5';
    const W = a5 ? 210 : 297, H = a5 ? 148 : 210, k = a5 ? 0.7 : 1, m = a5 ? 8 : 12;
    const pzt = h.gunEkle(ilk, -((ilk.getUTCDay() + 6) % 7));
    const GUN = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
    const sayfalar = [];
    for (let i = 0; i < n; i++) {
      const b = h.gunEkle(pzt, i * 7), s = h.gunEkle(b, 6), ops = [];
      ops.push(['yazi', baslik, m, m + 7 * k, 18 * k, { kalin: true }]);
      ops.push(['yazi', `${h.fmtDate(b)} – ${h.fmtDate(s)}`, W - m, m + 7 * k, 10 * k, { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10 * k, W - m, m + 10 * k, { kalinlik: 0.6, ton: 0.2 }]);
      const ust = m + 14 * k, alt = H - m, bh = 8 * k;
      const lw = liste ? 58 * k : 0, bosluk = liste ? 4 * k : 0;
      const tw = W - 2 * m - lw - bosluk, gw = 30 * k, ow = (tw - gw) / OGUN.length, rh = (alt - ust - bh) / 7;
      // Sütun başlıkları
      ops.push(['kutu', m, ust, gw, bh, { dolgu: 0.86, cizgi: 0.5 }]);
      ops.push(['yazi', 'Gün', m + 2 * k, ust + 5.6 * k, 9 * k, { kalin: true }]);
      OGUN.forEach((ad, j) => {
        const x = m + gw + j * ow;
        ops.push(['kutu', x, ust, ow, bh, { dolgu: 0.86, cizgi: 0.5 }]);
        ops.push(['yazi', ad, x + ow / 2, ust + 5.6 * k, 9 * k, { kalin: true, hiza: 'orta' }]);
      });
      // Gün satırları
      for (let g = 0; g < 7; g++) {
        const y = ust + bh + g * rh, d = h.gunEkle(b, g);
        ops.push(['kutu', m, y, gw, rh, { dolgu: g >= 5 ? 0.9 : 0.96, cizgi: 0.5 }]);
        ops.push(['yazi', GUN[g], m + 2 * k, y + 6.5 * k, 9.5 * k, { kalin: true }]);
        ops.push(['yazi', `${d.getUTCDate()} ${h.ayAdi(d.getUTCMonth() + 1)}`, m + 2 * k, y + 11.5 * k, 7.5 * k, { ton: 0.35 }]);
        for (let j = 0; j < OGUN.length; j++) {
          const x = m + gw + j * ow;
          ops.push(['kutu', x, y, ow, rh, { cizgi: 0.5 }]);
          ops.push(['cizgi', x + 2 * k, y + rh / 2, x + ow - 2 * k, y + rh / 2, { kalinlik: 0.2, ton: 0.82, kesik: true }]);
        }
      }
      // Alışveriş notları
      if (liste) {
        const x = W - m - lw;
        ops.push(['kutu', x, ust, lw, bh, { dolgu: 0.86, cizgi: 0.5 }]);
        ops.push(['yazi', 'Alışveriş notları', x + 2 * k, ust + 5.6 * k, 9 * k, { kalin: true }]);
        ops.push(['kutu', x, ust + bh, lw, alt - ust - bh, { cizgi: 0.5 }]);
        const adim = a5 ? 6.2 : 7.5, kare = a5 ? 2.8 : 3.4;
        for (let y = ust + bh + adim; y < alt - 1.5; y += adim) {
          ops.push(['kutu', x + 2, y - kare - 0.3, kare, kare, { cizgi: 0.45 }]);
          ops.push(['cizgi', x + 3.5 + kare, y, x + lw - 2, y, { kalinlik: 0.2, ton: 0.78 }]);
        }
      }
      sayfalar.push(ops);
    }
    const son = h.gunEkle(pzt, n * 7 - 1);
    return {
      rows: [
        ['Sayfa sayısı', `${n} sayfa`],
        ['İlk hafta', `${h.fmtDate(pzt)} – ${h.fmtDate(h.gunEkle(pzt, 6))}`],
        ['Son gün', `${h.fmtDate(son)} ${h.gunAdi(son)}`],
        ['Öğün sütunları', OGUN.join(', ')],
        ['Planlanacak öğün', `${n * 7 * OGUN.length} öğün`],
        ['Kâğıt', a5 ? 'A5 yatay (210 × 148 mm)' : 'A4 yatay (297 × 210 mm)'],
      ],
      note: 'Yazdırırken kâğıt yönünü yatay, ölçeği "gerçek boyut" (%100) seçin.',
      pdf: { ad: 'haftalik-yemek-plani', baslik, boyut: a5 ? 'a5' : 'a4', yatay: true, sayfalar },
    };
  }
