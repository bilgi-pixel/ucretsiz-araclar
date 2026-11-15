// Ruh Hali Takip Çizelgesi Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ilk = h.dateOrToday(v.baslangic, 'Başlangıç ayı');
    const n = h.posint(v.ay, 'Ay sayısı');
    if (n > 12) h.err('Ay sayısı en fazla 12 olabilir.');
    const baslik = (v.baslik || '').trim() || 'Ruh Hali Takip Çizelgesi';
    if (baslik.length > 36) h.err('Sayfa başlığı en fazla 36 karakter olabilir.');
    const L = v.olcek === '3' ? 3 : 5, grafik = v.grafik !== 'hayir';
    const a5 = v.boyut === 'a5';
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, k = a5 ? 0.7 : 1, m = a5 ? 8 : 12;
    const F = (p) => Math.max(5, p * k);
    const iw = W - 2 * m;
    const KISA = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
    const ACIKLAMA = L === 5 ? '1 Çok kötü  ·  2 Kötü  ·  3 Orta  ·  4 İyi  ·  5 Çok iyi' : '1 Kötü  ·  2 Orta  ·  3 İyi';
    const yil = ilk.getUTCFullYear(), ay0 = ilk.getUTCMonth();
    const aylar = [];
    for (let i = 0; i < n; i++) {
      const b = new Date(Date.UTC(yil, ay0 + i, 1));
      aylar.push({ b, gun: new Date(Date.UTC(yil, ay0 + i + 1, 0)).getUTCDate(), ad: `${h.ayAdi(b.getUTCMonth() + 1)} ${b.getUTCFullYear()}` });
    }
    const sayfalar = aylar.map(({ b, gun, ad }) => {
      const ops = [];
      ops.push(['yazi', baslik, m, m + 7 * k, F(17), { kalin: true }]);
      ops.push(['yazi', ad, W - m, m + 7 * k, F(12), { hiza: 'sag', ton: 0.3, kalin: true }]);
      ops.push(['cizgi', m, m + 10 * k, W - m, m + 10 * k, { kalinlik: 0.6, ton: 0.2 }]);
      ops.push(['yazi', ACIKLAMA, m, m + 15.5 * k, F(8.5), { ton: 0.3 }]);
      ops.push(['yazi', 'Her akşam bir daire işaretleyin.', W - m, m + 15.5 * k, F(7), { hiza: 'sag', ton: 0.45 }]);
      const y0 = m + 19 * k, bh = 9 * k, altH = grafik ? 44 * k : 10 * k, rh = (H - m - altH - y0 - bh) / 31;
      const cG = 24 * k, cR = L * 8 * k, cU = 18 * k, xR = m + cG, xU = xR + cR, xN = xU + cU, th = bh + gun * rh;
      ops.push(['kutu', m, y0, iw, bh, { dolgu: 0.9, cizgi: 0.55 }]);
      ops.push(['yazi', 'Gün', m + 2 * k, y0 + 5.8 * k, F(8), { kalin: true }]);
      ops.push(['yazi', 'Ruh hali', xR + cR / 2, y0 + 3.8 * k, F(7.5), { kalin: true, hiza: 'orta' }]);
      for (let j = 0; j < L; j++) ops.push(['yazi', String(j + 1), xR + (j + 0.5) * 8 * k, y0 + 7.8 * k, F(6.5), { hiza: 'orta', ton: 0.35 }]);
      ops.push(['yazi', 'Uyku', xU + cU / 2, y0 + 3.8 * k, F(7.5), { kalin: true, hiza: 'orta' }]);
      ops.push(['yazi', '(saat)', xU + cU / 2, y0 + 7.8 * k, F(6.5), { hiza: 'orta', ton: 0.35 }]);
      ops.push(['yazi', 'Günü ne etkiledi? / Not', xN + 2 * k, y0 + 5.8 * k, F(8), { kalin: true }]);
      for (let d = 1; d <= gun; d++) {
        const hg = (b.getUTCDay() + d - 1) % 7;
        if (hg === 0 || hg === 6) ops.push(['kutu', m, y0 + bh + (d - 1) * rh, iw, rh, { dolgu: 0.94, cizgi: 0.94, kalinlik: 0.1 }]);
      }
      ops.push(['kutu', m, y0 + bh, iw, th - bh, { cizgi: 0.55 }]);
      for (const x of [xR, xU, xN]) ops.push(['cizgi', x, y0, x, y0 + th, { kalinlik: 0.25, ton: 0.55 }]);
      const r = Math.min(2 * k, rh * 0.36);
      for (let d = 1; d <= gun; d++) {
        const ry = y0 + bh + (d - 1) * rh, hg = (b.getUTCDay() + d - 1) % 7, cy = ry + rh / 2;
        if (d > 1) ops.push(['cizgi', m, ry, m + iw, ry, { kalinlik: 0.2, ton: 0.7 }]);
        ops.push(['yazi', String(d), m + 9 * k, cy + 1.1 * k, F(8.5), { kalin: true, hiza: 'sag' }]);
        ops.push(['yazi', KISA[hg], m + 12 * k, cy + 1.1 * k, F(7.5), { ton: 0.4 }]);
        for (let j = 0; j < L; j++) ops.push(['daire', xR + (j + 0.5) * 8 * k, cy, r, { cizgi: 0.35, kalinlik: 0.3 }]);
      }
      if (grafik) {
        // Ay grafiği: 31 gün × L düzey, işaretlenecek noktalar
        const gy = H - m - 40 * k, x0 = m + 8 * k, cw = (iw - 8 * k) / 31, ust = gy + 10 * k, alt = H - m - 8 * k, adim = (alt - ust) / (L - 1);
        ops.push(['yazi', 'Ay grafiği', m, gy + 4 * k, F(8.5), { kalin: true }]);
        ops.push(['yazi', 'Her günün puanını noktanın üstüne işaretleyip noktaları birleştirin.', W - m, gy + 4 * k, F(7), { hiza: 'sag', ton: 0.45 }]);
        ops.push(['kutu', x0, ust - 3 * k, iw - 8 * k, alt - ust + 6 * k, { cizgi: 0.55 }]);
        for (let j = 0; j < L; j++) {
          const y = alt - j * adim;
          ops.push(['yazi', String(j + 1), m + 5 * k, y + 1 * k, F(7), { hiza: 'sag', ton: 0.35 }]);
          ops.push(['cizgi', x0, y, x0 + iw - 8 * k, y, { kalinlik: 0.15, ton: 0.85 }]);
          for (let d = 1; d <= gun; d++) ops.push(['daire', x0 + (d - 0.5) * cw, y, 0.35 * k, { dolgu: 0.55, cizgi: 0.55, kalinlik: 0.1 }]);
        }
        for (let d = 1; d <= gun; d += 2) ops.push(['yazi', String(d), x0 + (d - 0.5) * cw, H - m - 1 * k, F(5.5), { hiza: 'orta', ton: 0.4 }]);
      } else {
        ops.push(['yazi', 'Ayın geneli için bir cümle:', m, H - m - 3 * k, F(8.5), { kalin: true }]);
        ops.push(['cizgi', m + 50 * k, H - m - 2.4 * k, W - m, H - m - 2.4 * k, { kalinlik: 0.2, ton: 0.6 }]);
      }
      return ops;
    });
    const toplam = aylar.reduce((a, x) => a + x.gun, 0), son = aylar[n - 1];
    return {
      rows: [
        ['Sayfa sayısı', `${n} sayfa`],
        ['İlk ay', `${aylar[0].ad} (${aylar[0].gun} gün)`],
        ['Son ay', `${son.ad} (${son.gun} gün)`],
        ['Toplam gün', `${toplam} gün`],
        ['Puan ölçeği', `${L} kademeli`],
        ['Ay grafiği', grafik ? 'Var' : 'Yok'],
        ['Kâğıt', a5 ? 'A5 dikey (148 × 210 mm)' : 'A4 dikey (210 × 297 mm)'],
      ],
      note: 'Bu çizelge kişisel kayıt içindir; tıbbi tavsiye ya da tanı aracı değildir. Uzun süren ya da ağırlaşan sıkıntılarda bir ruh sağlığı uzmanına başvurun.',
      pdf: { ad: 'ruh-hali-takip-cizelgesi', baslik, boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  }
