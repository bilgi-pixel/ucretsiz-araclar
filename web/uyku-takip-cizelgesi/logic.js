// Uyku Takip Çizelgesi Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ilk = h.dateOrToday(v.baslangic, 'İlk gece');
    const n = h.posint(v.hafta, 'Takip süresi');
    if (n > 12) h.err('Takip süresi en fazla 12 hafta olabilir; daha uzun dönem için aracı ikinci kez çalıştırın.');
    const baslik = (v.baslik || '').trim() || 'Uyku Takip Çizelgesi';
    if (baslik.length > 40) h.err('Sayfa başlığı en fazla 40 karakter olabilir.');
    const izgara = v.duzen !== 'tablo';
    const a5 = v.boyut === 'a5';
    const W = a5 ? 210 : 297, H = a5 ? 148 : 210, k = a5 ? 0.7 : 1, m = a5 ? 8 : 12;
    const F = (p) => Math.max(5, p * k);
    const iw = W - 2 * m;
    const KISA = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
    const gg = (d) => `${String(d.getUTCDate()).padStart(2, '0')}.${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
    const gece = n * 7, sayfaSay = Math.ceil(gece / 14);
    const sayfalar = [];
    for (let s = 0; s < sayfaSay; s++) {
      const adet = Math.min(14, gece - s * 14), b = h.gunEkle(ilk, s * 14), ops = [];
      ops.push(['yazi', baslik, m, m + 7 * k, F(18), { kalin: true }]);
      ops.push(['yazi', `${h.fmtDate(b)} – ${h.fmtDate(h.gunEkle(b, adet - 1))}  ·  sayfa ${s + 1} / ${sayfaSay}`, W - m, m + 7 * k, F(10), { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10 * k, W - m, m + 10 * k, { kalinlik: 0.6, ton: 0.2 }]);
      const y0 = m + 14 * k, bh = 10 * k, altH = 22 * k, rh = (H - m - altH - 4 * k - y0 - bh) / 14, th = bh + adet * rh;
      const cG = 30 * k, cK = 30 * k, xK = m + iw - cK;
      ops.push(['kutu', m, y0, iw, bh, { dolgu: 0.9, cizgi: 0.55 }]);
      ops.push(['yazi', 'Gece', m + 2 * k, y0 + 6.3 * k, F(8), { kalin: true }]);
      ops.push(['yazi', 'Kalite', xK + cK / 2, y0 + 4.2 * k, F(7.5), { kalin: true, hiza: 'orta' }]);
      for (let j = 0; j < 5; j++) ops.push(['yazi', String(j + 1), xK + (j + 0.5) * cK / 5, y0 + 8.6 * k, F(6.5), { hiza: 'orta', ton: 0.35 }]);
      // Hafta sonu geceleri hafif gri
      for (let j = 0; j < adet; j++) {
        const hg = h.gunEkle(b, j).getUTCDay();
        if (hg === 0 || hg === 6) ops.push(['kutu', m, y0 + bh + j * rh, iw, rh, { dolgu: 0.95, cizgi: 0.95, kalinlik: 0.1 }]);
      }
      ops.push(['kutu', m, y0 + bh, iw, th - bh, { cizgi: 0.55 }]);
      ops.push(['cizgi', m + cG, y0, m + cG, y0 + th, { kalinlik: 0.25, ton: 0.5 }]);
      ops.push(['cizgi', xK, y0, xK, y0 + th, { kalinlik: 0.25, ton: 0.5 }]);
      if (izgara) {
        // 20:00 → 12:00, 16 saat, 32 yarım saatlik kutu
        const cS = 16 * k, xS = xK - cS, gw = (xS - m - cG) / 32;
        ops.push(['cizgi', xS, y0, xS, y0 + th, { kalinlik: 0.25, ton: 0.5 }]);
        ops.push(['yazi', 'Süre', xS + cS / 2, y0 + 4.2 * k, F(7.5), { kalin: true, hiza: 'orta' }]);
        ops.push(['yazi', '(saat)', xS + cS / 2, y0 + 8.6 * k, F(6.5), { hiza: 'orta', ton: 0.35 }]);
        for (let c = 0; c < 32; c++) {
          const x = m + cG + c * gw, saat = (20 + c / 2) % 24;
          if (c % 2 === 0) {
            ops.push(['yazi', String(saat).padStart(2, '0'), x + gw, y0 + 6.3 * k, F(7), { hiza: 'orta', kalin: saat === 0 }]);
            if (c) ops.push(['cizgi', x, y0 + bh, x, y0 + th, { kalinlik: saat === 0 ? 0.5 : 0.25, ton: saat === 0 ? 0.25 : 0.55 }]);
          } else ops.push(['cizgi', x, y0 + bh, x, y0 + th, { kalinlik: 0.15, ton: 0.82 }]);
        }
      } else {
        const AD = ['Yatağa girdim', 'Uyudum', 'Uyandım', 'Kalktım', 'Toplam uyku', 'Gece uyanma'], cw = 24 * k;
        for (let c = 0; c < 6; c++) {
          const x = m + cG + c * cw;
          if (c) ops.push(['cizgi', x, y0, x, y0 + th, { kalinlik: 0.25, ton: 0.55 }]);
          ops.push(['yazi', AD[c], x + cw / 2, y0 + 6.3 * k, F(7), { kalin: true, hiza: 'orta' }]);
          if (c < 4) for (let j = 0; j < adet; j++) ops.push(['yazi', ':', x + cw / 2, y0 + bh + j * rh + rh / 2 + 1 * k, F(8), { hiza: 'orta', ton: 0.6 }]);
        }
        const xN = m + cG + 6 * cw;
        ops.push(['cizgi', xN, y0, xN, y0 + th, { kalinlik: 0.25, ton: 0.55 }]);
        ops.push(['yazi', 'Not', xN + 2 * k, y0 + 6.3 * k, F(7), { kalin: true }]);
      }
      for (let j = 0; j < adet; j++) {
        const ry = y0 + bh + j * rh, d = h.gunEkle(b, j), cy = ry + rh / 2;
        if (j) ops.push(['cizgi', m, ry, m + iw, ry, { kalinlik: j === 7 ? 0.45 : 0.2, ton: j === 7 ? 0.4 : 0.7 }]);
        ops.push(['yazi', gg(d), m + 2 * k, cy + 1.1 * k, F(8.5), { kalin: true }]);
        ops.push(['yazi', KISA[d.getUTCDay()], m + cG - 2 * k, cy + 1.1 * k, F(7.5), { hiza: 'sag', ton: 0.4 }]);
        const r = Math.min(2 * k, rh * 0.3);
        for (let q = 0; q < 5; q++) ops.push(['daire', xK + (q + 0.5) * cK / 5, cy, r, { cizgi: 0.35, kalinlik: 0.3 }]);
      }
      // Alt bölüm: açıklama + özet kutusu
      const ay = H - m - altH, ow = iw * 0.34, ox = m + iw - ow;
      const AC = [
        izgara ? 'Uyuduğunuz yarım saatlik kutuları boyayın; yatağa girdiğiniz anı Y, kalktığınız anı K ile işaretleyin.' : 'Saatleri sabah kalkınca yazın; yaklaşık değerler yeterlidir. "Gece uyanma" sütununa kaç kez uyandığınızı yazın.',
        'Satırdaki tarih, gecenin başladığı akşamı gösterir. Kalite: 1 çok kötü – 5 çok iyi.',
        'Bu çizelge kayıt tutmak içindir; tıbbi tavsiye ya da tanı aracı değildir.',
      ];
      AC.forEach((t, j) => ops.push(['yazi', t, m, ay + (5 + j * 6) * k, F(7.5), { ton: j === 2 ? 0.45 : 0.3 }]));
      ops.push(['kutu', ox, ay, ow, altH, { cizgi: 0.55 }]);
      ops.push(['yazi', 'Bu sayfanın özeti', ox + 2 * k, ay + 5.2 * k, F(8.5), { kalin: true }]);
      ops.push(['yazi', 'Ortalama uyku süresi: ________ saat', ox + 2 * k, ay + 12.5 * k, F(8)]);
      ops.push(['yazi', 'Ortalama kalite: ________ / 5', ox + 2 * k, ay + 19 * k, F(8)]);
      sayfalar.push(ops);
    }
    const son = h.gunEkle(ilk, gece - 1);
    return {
      rows: [
        ['Sayfa sayısı', `${sayfaSay} sayfa`],
        ['Takip süresi', `${n} hafta (${gece} gece)`],
        ['İlk gece', `${h.fmtDate(ilk)} ${h.gunAdi(ilk)}`],
        ['Son gece', `${h.fmtDate(son)} ${h.gunAdi(son)}`],
        ['Düzen', izgara ? 'Saat ızgarası (20.00–12.00)' : 'Saat yazmalı tablo'],
        ['Kâğıt', a5 ? 'A5 yatay (210 × 148 mm)' : 'A4 yatay (297 × 210 mm)'],
      ],
      note: 'Bu çizelge kayıt tutmak içindir, tıbbi tavsiye değildir. Yazdırırken yatay yön ve %100 ölçek seçin.',
      pdf: { ad: 'uyku-takip-cizelgesi', baslik, boyut: a5 ? 'a5' : 'a4', yatay: true, sayfalar },
    };
  }
