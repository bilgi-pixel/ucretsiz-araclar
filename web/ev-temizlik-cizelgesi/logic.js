// Ev Temizlik Çizelgesi Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ilk = h.dateOrToday(v.baslangic, 'Başlangıç tarihi');
    const n = h.posint(v.hafta, 'Hafta sayısı');
    if (n > 12) h.err('Hafta sayısı en fazla 12 olabilir; daha uzun dönem için başlangıç tarihini ilerletip aracı yeniden çalıştırın.');
    const baslik = (v.baslik || '').trim() || 'Ev Temizlik Çizelgesi';
    if (baslik.length > 30) h.err('Sayfa başlığı en fazla 30 karakter olabilir.');
    let gun = h.lines(v.gunluk), haf = h.lines(v.haftalik);
    if (!gun.length) gun = ['Yatakları toplamak', 'Bulaşıkları yıkamak', 'Tezgâh ve ocağı silmek', 'Çöpü çıkarmak', 'Yerleri süpürmek', 'Çamaşır yıkamak ya da katlamak', 'Lavabo ve aynayı silmek', 'Ortalığı toplamak'];
    if (!haf.length) haf = ['Çarşafları değiştirmek', 'Banyo ve tuvaleti ovmak', 'Toz almak', 'Yerleri silmek', 'Buzdolabını gözden geçirmek', 'Cam ve aynaları silmek', 'Halıları süpürmek', 'Çöp kovalarını yıkamak'];
    if (gun.length > 12) h.err('En fazla 12 günlük iş yazabilirsiniz; benzer işleri tek satırda birleştirin.');
    if (haf.length > 12) h.err('En fazla 12 haftalık iş yazabilirsiniz; benzer işleri tek satırda birleştirin.');
    if ([...gun, ...haf].some((s) => s.length > 30)) h.err('İş adları en fazla 30 karakter olabilir; uzun satırı kısaltın.');
    const a5 = v.boyut === 'a5';
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, m = a5 ? 9 : 12;
    const hh = a5 ? 8 : 9, ara = a5 ? 4 : 5, pt = a5 ? 8 : 9.5, kare = a5 ? 3 : 3.6;
    const ust = m + 15, tw = W - 2 * m, iw = tw * 0.44, gw = (tw - iw) / 7;
    const rh = Math.min(8.5, (H - m - ust - 2 * hh - ara) / (gun.length + haf.length));
    const pzt = h.gunEkle(ilk, -((ilk.getUTCDay() + 6) % 7));
    const KISA = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
    const sayfalar = [];
    for (let i = 0; i < n; i++) {
      const b = h.gunEkle(pzt, i * 7), ops = [];
      ops.push(['yazi', baslik, m, m + 7, a5 ? 14 : 18, { kalin: true }]);
      ops.push(['yazi', `${h.fmtDate(b)} – ${h.fmtDate(h.gunEkle(b, 6))}`, W - m, m + 7, a5 ? 8.5 : 10, { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10.5, W - m, m + 10.5, { kalinlik: 0.6, ton: 0.2 }]);
      // Günlük işler tablosu
      let y = ust;
      ops.push(['kutu', m, y, tw, hh, { dolgu: 0.86, cizgi: 0.5 }]);
      ops.push(['yazi', 'Günlük işler', m + 2, y + hh / 2 + pt * 0.13, pt, { kalin: true }]);
      for (let g = 0; g < 7; g++) {
        const x = m + iw + g * gw + gw / 2, d = h.gunEkle(b, g);
        ops.push(['yazi', KISA[g], x, y + hh * 0.45, pt - 1, { kalin: true, hiza: 'orta' }]);
        ops.push(['yazi', String(d.getUTCDate()), x, y + hh - 1.2, pt - 2.5, { hiza: 'orta', ton: 0.35 }]);
      }
      y += hh;
      gun.forEach((ad, r) => {
        ops.push(['kutu', m, y, tw, rh, r % 2 ? { dolgu: 0.965, cizgi: 0.55 } : { cizgi: 0.55 }]);
        ops.push(['yazi', ad, m + 2, y + rh / 2 + pt * 0.12, pt]);
        for (let g = 0; g < 7; g++) ops.push(['kutu', m + iw + g * gw + (gw - kare) / 2, y + (rh - kare) / 2, kare, kare, { dolgu: 1, cizgi: 0.35 }]);
        y += rh;
      });
      for (let g = 0; g < 7; g++) ops.push(['cizgi', m + iw + g * gw, ust, m + iw + g * gw, y, { kalinlik: 0.2, ton: g === 5 ? 0.35 : 0.7 }]);
      // Haftalık işler tablosu
      y += ara;
      const y2 = y, sw = tw * 0.22, dw = tw * 0.2, yw = tw - iw - sw - dw;
      ops.push(['kutu', m, y, tw, hh, { dolgu: 0.86, cizgi: 0.5 }]);
      ops.push(['yazi', 'Haftalık işler', m + 2, y + hh / 2 + pt * 0.13, pt, { kalin: true }]);
      ops.push(['yazi', 'Sorumlu', m + iw + sw / 2, y + hh / 2 + pt * 0.13, pt - 1, { kalin: true, hiza: 'orta' }]);
      ops.push(['yazi', 'Gün', m + iw + sw + dw / 2, y + hh / 2 + pt * 0.13, pt - 1, { kalin: true, hiza: 'orta' }]);
      ops.push(['yazi', 'Yapıldı', m + iw + sw + dw + yw / 2, y + hh / 2 + pt * 0.13, pt - 1, { kalin: true, hiza: 'orta' }]);
      y += hh;
      haf.forEach((ad, r) => {
        ops.push(['kutu', m, y, tw, rh, r % 2 ? { dolgu: 0.965, cizgi: 0.55 } : { cizgi: 0.55 }]);
        ops.push(['yazi', ad, m + 2, y + rh / 2 + pt * 0.12, pt]);
        ops.push(['kutu', m + iw + sw + dw + (yw - kare) / 2, y + (rh - kare) / 2, kare, kare, { dolgu: 1, cizgi: 0.35 }]);
        y += rh;
      });
      for (const x of [m + iw, m + iw + sw, m + iw + sw + dw]) ops.push(['cizgi', x, y2, x, y, { kalinlik: 0.2, ton: 0.7 }]);
      // Kalan yer yeterliyse aylık işler ve notlar alanı
      y += ara;
      if (H - m - y >= 16) {
        ops.push(['kutu', m, y, tw, H - m - y, { cizgi: 0.55 }]);
        ops.push(['yazi', 'Ayda bir yapılacak büyük işler ve notlar', m + 2, y + 5.2, pt - 0.5, { kalin: true }]);
        for (let yy = y + 13; yy < H - m - 2; yy += 7.5) ops.push(['cizgi', m + 2.5, yy, W - m - 2.5, yy, { kalinlik: 0.2, ton: 0.78 }]);
      }
      sayfalar.push(ops);
    }
    const son = h.gunEkle(pzt, n * 7 - 1);
    return {
      rows: [
        ['Sayfa sayısı', `${n} sayfa`],
        ['İlk hafta', `${h.fmtDate(pzt)} – ${h.fmtDate(h.gunEkle(pzt, 6))}`],
        ['Son gün', `${h.fmtDate(son)} ${h.gunAdi(son)}`],
        ['Günlük iş', `${gun.length} satır`],
        ['Haftalık iş', `${haf.length} satır`],
        ['Haftalık onay kutusu', `${gun.length * 7 + haf.length} kutu`],
        ['Kâğıt', a5 ? 'A5 dikey (148 × 210 mm)' : 'A4 dikey (210 × 297 mm)'],
      ],
      note: 'Yazdırırken ölçeği "gerçek boyut" (%100) seçin. Sorumlu ve gün hücreleri elle doldurulmak üzere boş basılır.',
      pdf: { ad: 'ev-temizlik-cizelgesi', baslik, boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  }
