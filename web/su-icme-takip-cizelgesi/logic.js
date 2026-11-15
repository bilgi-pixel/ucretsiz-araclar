// Su İçme Takip Çizelgesi Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ilk = h.dateOrToday(v.baslangic, 'Başlangıç ayı');
    const n = h.posint(v.ay, 'Ay sayısı');
    if (n > 12) h.err('Ay sayısı en fazla 12 olabilir.');
    const bardak = ['6', '8', '10', '12'].includes(v.bardak) ? Number(v.bardak) : 8;
    const hacim = h.pos(v.hacim, 'Bardak hacmi');
    if (hacim < 50 || hacim > 1000) h.err('Bardak hacmi 50 ile 1000 ml arasında olmalı. Litre değil mililitre yazın (1 litre = 1000 ml).');
    const baslik = (v.baslik || '').trim() || 'Su İçme Takip Çizelgesi';
    if (baslik.length > 36) h.err('Sayfa başlığı en fazla 36 karakter olabilir.');
    const litre = bardak * hacim / 1000;
    const a5 = v.boyut === 'a5';
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, k = a5 ? 0.7 : 1, m = a5 ? 8 : 12;
    const F = (p) => Math.max(5, p * k);
    const iw = W - 2 * m;
    const KISA = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
    const y0yil = ilk.getUTCFullYear(), ay0 = ilk.getUTCMonth();
    const aylar = [];
    for (let i = 0; i < n; i++) {
      const b = new Date(Date.UTC(y0yil, ay0 + i, 1));
      aylar.push({ b, gun: new Date(Date.UTC(y0yil, ay0 + i + 1, 0)).getUTCDate(), ad: `${h.ayAdi(b.getUTCMonth() + 1)} ${b.getUTCFullYear()}` });
    }
    const sayfalar = aylar.map(({ b, gun, ad }) => {
      const ops = [];
      ops.push(['yazi', baslik, m, m + 7 * k, F(17), { kalin: true }]);
      ops.push(['yazi', ad, W - m, m + 7 * k, F(12), { hiza: 'sag', ton: 0.3, kalin: true }]);
      ops.push(['cizgi', m, m + 10 * k, W - m, m + 10 * k, { kalinlik: 0.6, ton: 0.2 }]);
      ops.push(['yazi', `Bardak: ${h.fmt(hacim, 0)} ml  ·  Günlük hedef: ${bardak} bardak (${h.fmt(litre, 2)} L)`, m, m + 15.5 * k, F(8.5), { ton: 0.3 }]);
      ops.push(['yazi', 'İçtiğiniz her bardak için bir daire boyayın.', W - m, m + 15.5 * k, F(7), { hiza: 'sag', ton: 0.45 }]);
      const y0 = m + 19 * k, bh = 7 * k, altH = 14 * k, rh = (H - m - altH - y0 - bh) / 31;
      const cG = 26 * k, cT = 22 * k, cH = 14 * k, cB = iw - cG - cT - cH, slot = cB / bardak, r = Math.min(rh * 0.36, slot * 0.4);
      const th = bh + gun * rh;
      ops.push(['kutu', m, y0, iw, bh, { dolgu: 0.9, cizgi: 0.55 }]);
      ops.push(['yazi', 'Gün', m + 2 * k, y0 + 4.9 * k, F(8), { kalin: true }]);
      ops.push(['yazi', 'Bardaklar', m + cG + cB / 2, y0 + 4.9 * k, F(8), { kalin: true, hiza: 'orta' }]);
      ops.push(['yazi', 'Toplam', m + cG + cB + cT / 2, y0 + 4.9 * k, F(8), { kalin: true, hiza: 'orta' }]);
      ops.push(['yazi', 'Hedef', m + iw - cH / 2, y0 + 4.9 * k, F(8), { kalin: true, hiza: 'orta' }]);
      for (let d = 1; d <= gun; d++) {
        const ry = y0 + bh + (d - 1) * rh, hg = (b.getUTCDay() + d - 1) % 7;
        if (hg === 0 || hg === 6) ops.push(['kutu', m, ry, iw, rh, { dolgu: 0.94, cizgi: 0.94, kalinlik: 0.1 }]);
      }
      ops.push(['kutu', m, y0 + bh, iw, th - bh, { cizgi: 0.55 }]);
      for (const x of [m + cG, m + cG + cB, m + cG + cB + cT]) ops.push(['cizgi', x, y0, x, y0 + th, { kalinlik: 0.25, ton: 0.55 }]);
      for (let d = 1; d <= gun; d++) {
        const ry = y0 + bh + (d - 1) * rh, hg = (b.getUTCDay() + d - 1) % 7, cy = ry + rh / 2;
        if (d > 1) ops.push(['cizgi', m, ry, m + iw, ry, { kalinlik: 0.2, ton: 0.7 }]);
        ops.push(['yazi', String(d), m + 9 * k, cy + 1.1 * k, F(8.5), { kalin: true, hiza: 'sag' }]);
        ops.push(['yazi', KISA[hg], m + 12 * k, cy + 1.1 * k, F(7.5), { ton: 0.4 }]);
        for (let j = 0; j < bardak; j++) ops.push(['daire', m + cG + (j + 0.5) * slot, cy, r, { cizgi: 0.35, kalinlik: 0.3 }]);
        const s = Math.min(3.8 * k, rh * 0.6);
        ops.push(['kutu', m + iw - cH / 2 - s / 2, cy - s / 2, s, s, { cizgi: 0.4 }]);
      }
      // Ay özeti
      const fy = H - m - 3 * k;
      ops.push(['yazi', `Hedefe ulaşılan gün: ______ / ${gun}`, m, fy, F(8.5), { kalin: true }]);
      ops.push(['yazi', 'Ay ortalaması: ______ bardak / gün', W - m, fy, F(8.5), { hiza: 'sag', kalin: true }]);
      return ops;
    });
    const toplam = aylar.reduce((a, x) => a + x.gun, 0), son = aylar[n - 1];
    return {
      rows: [
        ['Günlük hedef', `${bardak} bardak × ${h.fmt(hacim, 0)} ml = ${h.fmt(litre, 2)} L`],
        ['Sayfa sayısı', `${n} sayfa`],
        ['İlk ay', `${aylar[0].ad} (${aylar[0].gun} gün)`],
        ['Son ay', `${son.ad} (${son.gun} gün)`],
        ['Toplam gün', `${toplam} gün`],
        ['Kâğıt', a5 ? 'A5 dikey (148 × 210 mm)' : 'A4 dikey (210 × 297 mm)'],
      ],
      note: (litre > 4 ? 'Seçtiğiniz günlük miktar yüksek; hedefinizi hekiminize danışarak belirlemeniz yerinde olur. ' : '') + 'Bu çizelge kayıt tutmak içindir, tıbbi tavsiye değildir; günlük su ihtiyacı kişiden kişiye değişir.',
      pdf: { ad: 'su-icme-takip-cizelgesi', baslik, boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  }
