// Proje Planlayıcı Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ilk = h.dateOrToday(v.baslangic, 'Proje başlangıç tarihi');
    const n = h.posint(v.hafta, 'Süre');
    if (n < 4 || n > 16) h.err('Süre 4 ile 16 hafta arasında olmalı; daha uzun projeleri aşamalara bölüp her aşama için ayrı çizelge oluşturun.');
    const gorev = h.lines(v.gorevler);
    if (gorev.length > 20) h.err('En fazla 20 görev yazabilirsiniz; fazlası için ikinci bir çizelge oluşturun.');
    for (const g of gorev) if (g.length > 32) h.err(`"${g.slice(0, 20)}…" görevi 32 karakterden uzun; kısaltın.`);
    const ad = (v.ad || '').trim() || 'Proje Planı';
    if (ad.length > 40) h.err('Proje adı en fazla 40 karakter olabilir.');
    const secili = ['8', '12', '16', '20'].includes(v.satir) ? Number(v.satir) : 12;
    const satir = Math.max(secili, gorev.length);
    const ozet = v.ozet !== 'hayir';
    const a5 = v.boyut === 'a5';
    const W = a5 ? 210 : 297, H = a5 ? 148 : 210, k = a5 ? 0.7 : 1, m = a5 ? 8 : 12;
    const F = (p) => Math.max(5, p * k);
    const iw = W - 2 * m;
    const pzt = h.gunEkle(ilk, -((ilk.getUTCDay() + 6) % 7));
    const son = h.gunEkle(pzt, n * 7 - 1);
    const gg = (d) => `${String(d.getUTCDate()).padStart(2, '0')}.${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
    const sayfalar = [];
    // 1. sayfa: zaman çizelgesi
    {
      const ops = [];
      ops.push(['yazi', ad, m, m + 7 * k, F(18), { kalin: true }]);
      ops.push(['yazi', `${h.fmtDate(pzt)} – ${h.fmtDate(son)}  ·  ${n} hafta`, W - m, m + 7 * k, F(10), { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10 * k, W - m, m + 10 * k, { kalinlik: 0.6, ton: 0.2 }]);
      const y0 = m + 14 * k, bh = 10 * k, alt = H - m - 9 * k, rh = (alt - y0 - bh) / satir;
      const cNo = 8 * k, cG = 62 * k, cS = 26 * k, x0 = m + cNo + cG + cS, ww = (iw - cNo - cG - cS) / n;
      ops.push(['kutu', m, y0, iw, bh, { dolgu: 0.9, cizgi: 0.55 }]);
      for (let j = 1; j < n; j += 2) ops.push(['kutu', x0 + j * ww, y0 + bh, ww, alt - y0 - bh, { dolgu: 0.96, cizgi: 0.96, kalinlik: 0.1 }]);
      ops.push(['kutu', m, y0 + bh, iw, alt - y0 - bh, { cizgi: 0.55 }]);
      ops.push(['yazi', 'No', m + cNo / 2, y0 + 6.3 * k, F(8), { kalin: true, hiza: 'orta' }]);
      ops.push(['yazi', 'Görev', m + cNo + 2 * k, y0 + 6.3 * k, F(8), { kalin: true }]);
      ops.push(['yazi', 'Sorumlu', m + cNo + cG + 2 * k, y0 + 6.3 * k, F(8), { kalin: true }]);
      for (const x of [m + cNo, m + cNo + cG]) ops.push(['cizgi', x, y0, x, alt, { kalinlik: 0.25, ton: 0.55 }]);
      for (let j = 0; j < n; j++) {
        const x = x0 + j * ww;
        ops.push(['cizgi', x, y0, x, alt, { kalinlik: 0.25, ton: 0.55 }]);
        ops.push(['yazi', `${j + 1}. hf`, x + ww / 2, y0 + 4.2 * k, F(6.5), { kalin: true, hiza: 'orta' }]);
        ops.push(['yazi', gg(h.gunEkle(pzt, j * 7)), x + ww / 2, y0 + 8.3 * k, F(6), { hiza: 'orta', ton: 0.35 }]);
      }
      for (let j = 0; j < satir; j++) {
        const ry = y0 + bh + j * rh;
        if (j) ops.push(['cizgi', m, ry, m + iw, ry, { kalinlik: 0.2, ton: 0.7 }]);
        ops.push(['yazi', String(j + 1), m + cNo / 2, ry + rh / 2 + 1.1 * k, F(7.5), { hiza: 'orta', ton: 0.4 }]);
        if (gorev[j]) ops.push(['yazi', gorev[j], m + cNo + 2 * k, ry + rh / 2 + 1.1 * k, F(8)]);
      }
      ops.push(['yazi', 'Planlanan haftaları çizgiyle, tamamlanan haftaları boyayarak işaretleyin.', m, H - m - 2 * k, F(7.5), { ton: 0.4 }]);
      ops.push(['yazi', 'Güncelleme tarihi: ____ / ____ / ________', W - m, H - m - 2 * k, F(7.5), { hiza: 'sag', ton: 0.4 }]);
      sayfalar.push(ops);
    }
    // 2. sayfa: proje özeti
    if (ozet) {
      const ops = [];
      ops.push(['yazi', 'Proje Özeti', m, m + 7 * k, F(18), { kalin: true }]);
      ops.push(['yazi', ad, W - m, m + 7 * k, F(10), { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10 * k, W - m, m + 10 * k, { kalinlik: 0.6, ton: 0.2 }]);
      const y0 = m + 14 * k, av = H - m - y0, lw = iw * 0.52, rx = m + lw + 4 * k, rw = iw - lw - 4 * k;
      const alan = (x, y, w, hh, etiket, sat) => {
        ops.push(['kutu', x, y, w, hh, { cizgi: 0.55 }]);
        ops.push(['yazi', etiket, x + 2 * k, y + 5.2 * k, F(8.5), { kalin: true }]);
        const ara = (hh - 7 * k) / sat;
        for (let j = 1; j <= sat; j++) ops.push(['cizgi', x + 2 * k, y + 7 * k + j * ara - 1.2 * k, x + w - 2 * k, y + 7 * k + j * ara - 1.2 * k, { kalinlik: 0.2, ton: 0.75 }]);
      };
      const a = av - 6 * k;
      alan(m, y0, lw, a * 0.3, 'Projenin amacı ve beklenen sonuç', 3);
      alan(m, y0 + a * 0.3 + 3 * k, lw, a * 0.3, 'Kapsam: neler dahil, neler değil?', 3);
      alan(m, y0 + a * 0.6 + 6 * k, lw, a * 0.4, 'Riskler ve alınacak önlemler', 4);
      const tablo = (y, hh, bas, sutun, sat, kutulu) => {
        const th = 6.5 * k, bb = 6.5 * k, rr = (hh - th - bb) / sat;
        ops.push(['kutu', rx, y, rw, hh, { cizgi: 0.55 }]);
        ops.push(['yazi', bas, rx + 2 * k, y + 4.7 * k, F(8.5), { kalin: true }]);
        ops.push(['kutu', rx, y + th, rw, bb, { dolgu: 0.9, cizgi: 0.55 }]);
        let x = rx;
        sutun.forEach(([etiket, oran], i) => {
          if (i) ops.push(['cizgi', x, y + th, x, y + hh, { kalinlik: 0.25, ton: 0.55 }]);
          ops.push(['yazi', etiket, x + 2 * k, y + th + 4.6 * k, F(7.5), { kalin: true }]);
          x += rw * oran;
        });
        for (let j = 0; j < sat; j++) {
          const ry = y + th + bb + j * rr;
          if (j) ops.push(['cizgi', rx, ry, rx + rw, ry, { kalinlik: 0.2, ton: 0.7 }]);
          if (kutulu) { const s = Math.min(3.8 * k, rr * 0.55); ops.push(['kutu', rx + rw * 0.925 - s / 2, ry + rr / 2 - s / 2, s, s, { cizgi: 0.4 }]); }
        }
      };
      const th2 = (av - 3 * k) / 2;
      tablo(y0, th2, 'Ekip ve görev dağılımı', [['Ad soyad', 0.45], ['Projedeki görevi', 0.55]], 6, false);
      tablo(y0 + th2 + 3 * k, th2, 'Kilometre taşları', [['Ulaşılacak nokta', 0.6], ['Tarih', 0.25], ['Tamam', 0.15]], 6, true);
      sayfalar.push(ops);
    }
    return {
      rows: [
        ['Zaman çizelgesi', `${n} hafta`],
        ['İlk hafta', `${h.fmtDate(pzt)} – ${h.fmtDate(h.gunEkle(pzt, 6))}`],
        ['Son gün', `${h.fmtDate(son)} ${h.gunAdi(son)}`],
        ['Görev satırı', `${satir} satır`],
        ['Sayfa sayısı', `${sayfalar.length} sayfa`],
        ['Kâğıt', a5 ? 'A5 yatay (210 × 148 mm)' : 'A4 yatay (297 × 210 mm)'],
      ],
      note: 'Yazdırırken kâğıt yönünü yatay, ölçeği "gerçek boyut" (%100) seçin.',
      pdf: { ad: 'proje-planlayici', baslik: ad, boyut: a5 ? 'a5' : 'a4', yatay: true, sayfalar },
    };
  }
