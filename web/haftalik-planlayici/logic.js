// Haftalık Planlayıcı Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ilk = h.dateOrToday(v.baslangic, 'Başlangıç tarihi');
    const n = h.posint(v.hafta, 'Hafta sayısı');
    if (n > 12) h.err('Hafta sayısı en fazla 12 olabilir; daha uzun dönem için aracı ikinci kez çalıştırın.');
    const baslik = (v.baslik || '').trim() || 'Haftalık Plan';
    if (baslik.length > 40) h.err('Sayfa başlığı en fazla 40 karakter olabilir.');
    const a5 = v.boyut === 'a5';
    const W = a5 ? 210 : 297, H = a5 ? 148 : 210, k = a5 ? 0.7 : 1;
    const m = a5 ? 8 : 12;
    // Seçilen günün haftasının pazartesisi (getUTCDay: 0 pazar … 6 cumartesi)
    const pzt = h.gunEkle(ilk, -((ilk.getUTCDay() + 6) % 7));
    const GUN = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
    const haftaNo = (d) => { // ISO 8601 hafta numarası
      const t = new Date(d.getTime()); t.setUTCDate(t.getUTCDate() + 3 - ((t.getUTCDay() + 6) % 7));
      const y1 = new Date(Date.UTC(t.getUTCFullYear(), 0, 4));
      return 1 + Math.round(((t - y1) / 86400000 - 3 + ((y1.getUTCDay() + 6) % 7)) / 7);
    };
    const sayfalar = [];
    for (let i = 0; i < n; i++) {
      const b = h.gunEkle(pzt, i * 7), s = h.gunEkle(b, 6), ops = [];
      // Başlık şeridi
      ops.push(['yazi', baslik, m, m + 7 * k, 18 * k, { kalin: true }]);
      ops.push(['yazi', `${h.fmtDate(b)} – ${h.fmtDate(s)}  ·  ${haftaNo(b)}. hafta`, W - m, m + 7 * k, 10 * k, { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10 * k, W - m, m + 10 * k, { kalinlik: 0.6, ton: 0.2 }]);
      // Yedi gün sütunu
      const ust = m + 14 * k, altYuk = 38 * k, alt = H - m - altYuk - 4 * k, gw = (W - 2 * m) / 7, bh = 9 * k;
      for (let g = 0; g < 7; g++) {
        const x = m + g * gw, d = h.gunEkle(b, g);
        ops.push(['kutu', x, ust, gw, bh, { dolgu: g >= 5 ? 0.86 : 0.93, cizgi: 0.55 }]);
        ops.push(['yazi', GUN[g], x + 2 * k, ust + 6.2 * k, 9 * k, { kalin: true }]);
        ops.push(['yazi', `${d.getUTCDate()} ${h.ayAdi(d.getUTCMonth() + 1)}`, x + gw - 2 * k, ust + 6.2 * k, 7.5 * k, { hiza: 'sag', ton: 0.35 }]);
        ops.push(['kutu', x, ust + bh, gw, alt - ust - bh, { cizgi: 0.55 }]);
        if (v.satir !== 'bos') for (let y = ust + bh + 8 * k; y < alt - 2; y += 8 * k) ops.push(['cizgi', x + 1.5 * k, y, x + gw - 1.5 * k, y, { kalinlik: 0.2, ton: 0.8 }]);
      }
      // Alt bölüm: öncelikler ve notlar
      const ay = alt + 4 * k, ow = (W - 2 * m) * 0.4, nw = (W - 2 * m) - ow - 4 * k;
      ops.push(['kutu', m, ay, ow, altYuk, { cizgi: 0.55 }]);
      ops.push(['yazi', 'Bu haftanın öncelikleri', m + 2 * k, ay + 5.5 * k, 8.5 * k, { kalin: true }]);
      for (let j = 0; j < 4; j++) {
        const y = ay + (12 + j * 7) * k;
        ops.push(['kutu', m + 2.5 * k, y - 3.2 * k, 3.6 * k, 3.6 * k, { cizgi: 0.4 }]);
        ops.push(['cizgi', m + 8 * k, y + 0.4 * k, m + ow - 2.5 * k, y + 0.4 * k, { kalinlik: 0.2, ton: 0.75 }]);
      }
      const nx = m + ow + 4 * k;
      ops.push(['kutu', nx, ay, nw, altYuk, { cizgi: 0.55 }]);
      ops.push(['yazi', 'Notlar', nx + 2 * k, ay + 5.5 * k, 8.5 * k, { kalin: true }]);
      for (let j = 0; j < 4; j++) { const y = ay + (12.4 + j * 7) * k; ops.push(['cizgi', nx + 2.5 * k, y, nx + nw - 2.5 * k, y, { kalinlik: 0.2, ton: 0.75 }]); }
      sayfalar.push(ops);
    }
    const son = h.gunEkle(pzt, n * 7 - 1);
    return {
      rows: [
        ['Sayfa sayısı', `${n} sayfa`],
        ['İlk hafta', `${h.fmtDate(pzt)} – ${h.fmtDate(h.gunEkle(pzt, 6))}`],
        ['Son gün', `${h.fmtDate(son)} ${h.gunAdi(son)}`],
        ['Kâğıt', a5 ? 'A5 yatay (210 × 148 mm)' : 'A4 yatay (297 × 210 mm)'],
      ],
      note: 'Yazdırırken kâğıt yönünü yatay, ölçeği "gerçek boyut" (%100) seçin.',
      pdf: { ad: 'haftalik-planlayici', baslik, boyut: a5 ? 'a5' : 'a4', yatay: true, sayfalar },
    };
  }
