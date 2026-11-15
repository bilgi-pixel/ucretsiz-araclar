// Aylık Bütçe Planlayıcı Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ilk = h.dateOrToday(v.ay, 'Başlangıç ayı');
    const n = h.posint(v.aySayisi, 'Ay sayısı');
    if (n > 12) h.err('Ay sayısı en fazla 12 olabilir; daha uzun dönem için aracı yeniden çalıştırın.');
    const baslik = (v.baslik || '').trim() || 'Aylık Bütçe';
    if (baslik.length > 30) h.err('Sayfa başlığı en fazla 30 karakter olabilir.');
    let gelir = h.lines(v.gelirler), gider = h.lines(v.giderler);
    if (!gelir.length) gelir = ['Maaş / ücret', 'Ek gelir', 'Diğer gelir'];
    if (!gider.length) gider = ['Kira / konut', 'Faturalar', 'Mutfak ve market', 'Ulaşım', 'İletişim', 'Eğitim', 'Sağlık', 'Giyim', 'Eğlence ve sosyal', 'Borç ve taksit', 'Birikim', 'Diğer'];
    if (gelir.length > 6) h.err('En fazla 6 gelir kalemi yazabilirsiniz; benzer gelirleri tek satırda birleştirin.');
    if (gider.length < 3 || gider.length > 20) h.err('Gider kalemi sayısı 3 ile 20 arasında olmalı.');
    if ([...gelir, ...gider].some((s) => s.length > 28)) h.err('Kalem adları en fazla 28 karakter olabilir; uzun satırı kısaltın.');
    const a5 = v.boyut === 'a5';
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, m = a5 ? 9 : 12;
    const hh = a5 ? 6 : 7, ara = a5 ? 4 : 5, ozet = a5 ? 20 : 24, pt = a5 ? 8 : 9.5;
    const ust = m + 15, tw = W - 2 * m;
    const rh = Math.min(9, (H - m - ust - 2 * hh - 2 * ara - ozet) / (gelir.length + gider.length + 2));
    if (rh < 5.6) h.err('Bu kadar kalem A5 sayfaya okunaklı biçimde sığmıyor. Kâğıt boyutunu A4 yapın ya da kalem sayısını azaltın.');
    const kw = tw * 0.46, sw = (tw - kw) / 3, SUTUN = ['Planlanan', 'Gerçekleşen', 'Fark'];
    const y0 = ilk.getUTCFullYear(), m0 = ilk.getUTCMonth();
    const ayYazi = (i) => `${h.ayAdi(((m0 + i) % 12) + 1)} ${y0 + Math.floor((m0 + i) / 12)}`;
    const sayfalar = [];
    for (let i = 0; i < n; i++) {
      const ops = [];
      ops.push(['yazi', baslik, m, m + 7, a5 ? 14 : 18, { kalin: true }]);
      ops.push(['yazi', ayYazi(i), W - m, m + 7, a5 ? 11 : 13, { hiza: 'sag', ton: 0.25, kalin: true }]);
      ops.push(['cizgi', m, m + 10.5, W - m, m + 10.5, { kalinlik: 0.6, ton: 0.2 }]);
      // Tablo çizici: başlık satırı + kalemler + toplam satırı; bittiği y değerini döndürür
      const tablo = (y, ad, kalemler, toplamAd) => {
        ops.push(['kutu', m, y, tw, hh, { dolgu: 0.85, cizgi: 0.5 }]);
        ops.push(['yazi', ad, m + 2, y + hh - 2, pt, { kalin: true }]);
        SUTUN.forEach((s, j) => ops.push(['yazi', s, m + kw + j * sw + sw / 2, y + hh - 2, pt - 1, { kalin: true, hiza: 'orta' }]));
        let yy = y + hh;
        kalemler.forEach((k) => {
          ops.push(['kutu', m, yy, tw, rh, { cizgi: 0.55 }]);
          ops.push(['yazi', k, m + 2, yy + rh / 2 + pt * 0.12, pt]);
          yy += rh;
        });
        ops.push(['kutu', m, yy, tw, rh, { dolgu: 0.93, cizgi: 0.5 }]);
        ops.push(['yazi', toplamAd, m + 2, yy + rh / 2 + pt * 0.12, pt, { kalin: true }]);
        yy += rh;
        for (let j = 0; j < 3; j++) ops.push(['cizgi', m + kw + j * sw, y, m + kw + j * sw, yy, { kalinlik: 0.25, ton: 0.5 }]);
        return yy;
      };
      let y = tablo(ust, 'Gelirler', gelir, 'Toplam gelir');
      y = tablo(y + ara, 'Giderler', gider, 'Toplam gider');
      // Ay sonu özeti: üç kutu
      y += ara;
      const ow = (tw - 2 * ara) / 3, OZET = ['Toplam gelir', 'Toplam gider', 'Kalan (gelir – gider)'];
      OZET.forEach((s, j) => {
        const x = m + j * (ow + ara);
        ops.push(['kutu', x, y, ow, ozet, { cizgi: 0.35, kalinlik: j === 2 ? 0.6 : 0.3 }]);
        ops.push(['yazi', s, x + 2, y + (a5 ? 4.6 : 5.4), pt - 1, { kalin: true, ton: 0.25 }]);
        ops.push(['cizgi', x + 3, y + ozet - 4.5, x + ow - 3, y + ozet - 4.5, { kalinlik: 0.2, ton: 0.75, kesik: true }]);
      });
      y += ozet + ara;
      // Kalan yer yeterliyse not alanı
      if (H - m - y >= 16) {
        ops.push(['kutu', m, y, tw, H - m - y, { cizgi: 0.55 }]);
        ops.push(['yazi', 'Notlar ve gelecek ayın hedefi', m + 2, y + 5.2, pt - 0.5, { kalin: true }]);
        for (let yy = y + 13; yy < H - m - 2; yy += 7.5) ops.push(['cizgi', m + 2.5, yy, W - m - 2.5, yy, { kalinlik: 0.2, ton: 0.78 }]);
      }
      sayfalar.push(ops);
    }
    return {
      rows: [
        ['Sayfa sayısı', `${n} sayfa`],
        ['İlk ay', ayYazi(0)],
        ['Son ay', ayYazi(n - 1)],
        ['Gelir kalemi', `${gelir.length} satır`],
        ['Gider kalemi', `${gider.length} satır`],
        ['Kâğıt', a5 ? 'A5 dikey (148 × 210 mm)' : 'A4 dikey (210 × 297 mm)'],
      ],
      note: 'Çizelge boş hücrelerle basılır; tutarları siz yazarsınız. Fark sütununa "planlanan − gerçekleşen" değerini not edebilirsiniz.',
      pdf: { ad: 'butce-planlayici', baslik, boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  }
