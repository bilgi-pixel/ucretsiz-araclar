// Hedef Planlayıcı Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const adlar = h.lines(v.hedefler);
    if (adlar.length > 12) h.err('En fazla 12 hedef yazabilirsiniz; fazlası için aracı ikinci kez çalıştırın.');
    for (const a of adlar) if (a.length > 60) h.err(`"${a.slice(0, 25)}…" hedefi 60 karakterden uzun; kısaltıp ayrıntıyı sayfadaki alanlara elle yazın.`);
    let n = adlar.length;
    if (!n) {
      n = h.posint(v.adet, 'Hedef sayısı');
      if (n > 12) h.err('Hedef sayısı en fazla 12 olabilir.');
    }
    const adim = ['6', '8', '10', '12'].includes(v.adim) ? Number(v.adim) : 8;
    const baslik = (v.baslik || '').trim() || 'Hedef Planı';
    if (baslik.length > 40) h.err('Sayfa başlığı en fazla 40 karakter olabilir.');
    const a5 = v.boyut === 'a5';
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, k = a5 ? 0.7 : 1, m = a5 ? 8 : 12;
    const F = (p) => Math.max(5, p * k);
    const iw = W - 2 * m;
    // Etiketli, içi yazı çizgili kutu
    const alan = (ops, x, y, w, hh, etiket, satir) => {
      ops.push(['kutu', x, y, w, hh, { cizgi: 0.55 }]);
      ops.push(['yazi', etiket, x + 2 * k, y + 5.2 * k, F(8.5), { kalin: true }]);
      const ara = (hh - 7 * k) / satir;
      for (let j = 1; j <= satir; j++) ops.push(['cizgi', x + 2 * k, y + 7 * k + j * ara - 1.2 * k, x + w - 2 * k, y + 7 * k + j * ara - 1.2 * k, { kalinlik: 0.2, ton: 0.75 }]);
    };
    const sayfalar = [];
    for (let i = 0; i < n; i++) {
      const ops = [];
      ops.push(['yazi', baslik, m, m + 7 * k, F(18), { kalin: true }]);
      ops.push(['yazi', `Hedef ${i + 1} / ${n}`, W - m, m + 7 * k, F(10), { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10 * k, W - m, m + 10 * k, { kalinlik: 0.6, ton: 0.2 }]);
      let y = m + 14 * k;
      // Hedef
      if (adlar[i]) {
        ops.push(['kutu', m, y, iw, 20 * k, { cizgi: 0.55, dolgu: 0.95 }]);
        ops.push(['yazi', 'Hedefim', m + 2 * k, y + 5.2 * k, F(8.5), { kalin: true, ton: 0.3 }]);
        ops.push(['yazi', adlar[i], m + 2 * k, y + 14 * k, F(12), { kalin: true }]);
      } else alan(ops, m, y, iw, 20 * k, 'Hedefim', 2);
      y += 23 * k;
      alan(ops, m, y, iw, 18 * k, 'Bu hedef benim için neden önemli?', 2);
      y += 21 * k;
      // Tarihler ve ölçüt
      const tw = iw * 0.24, ow = iw - 2 * tw - 6 * k;
      alan(ops, m, y, tw, 14 * k, 'Başlangıç tarihi', 1);
      alan(ops, m + tw + 3 * k, y, tw, 14 * k, 'Hedef tarih', 1);
      alan(ops, m + 2 * tw + 6 * k, y, ow, 14 * k, 'Başardığımı nasıl anlayacağım?', 1);
      y += 17 * k;
      // Adım tablosu (esnek yükseklik)
      const altYuk = 65 * k, tabloH = H - m - altYuk - y, bh = 7 * k, rh = (tabloH - bh) / adim;
      const cNo = 8 * k, cTar = 26 * k, cOk = 16 * k, cAd = iw - cNo - cTar - cOk;
      ops.push(['kutu', m, y, iw, bh, { dolgu: 0.9, cizgi: 0.55 }]);
      ops.push(['yazi', 'No', m + cNo / 2, y + 4.9 * k, F(8), { kalin: true, hiza: 'orta' }]);
      ops.push(['yazi', 'Atılacak adım', m + cNo + 2 * k, y + 4.9 * k, F(8), { kalin: true }]);
      ops.push(['yazi', 'Son tarih', m + cNo + cAd + cTar / 2, y + 4.9 * k, F(8), { kalin: true, hiza: 'orta' }]);
      ops.push(['yazi', 'Tamam', m + iw - cOk / 2, y + 4.9 * k, F(8), { kalin: true, hiza: 'orta' }]);
      ops.push(['kutu', m, y + bh, iw, tabloH - bh, { cizgi: 0.55 }]);
      for (const x of [m + cNo, m + cNo + cAd, m + cNo + cAd + cTar]) ops.push(['cizgi', x, y, x, y + tabloH, { kalinlik: 0.25, ton: 0.55 }]);
      for (let j = 0; j < adim; j++) {
        const ry = y + bh + j * rh;
        if (j) ops.push(['cizgi', m, ry, m + iw, ry, { kalinlik: 0.2, ton: 0.7 }]);
        ops.push(['yazi', String(j + 1), m + cNo / 2, ry + rh / 2 + 1.2 * k, F(8), { hiza: 'orta', ton: 0.4 }]);
        const s = Math.min(4.2 * k, rh * 0.55);
        ops.push(['kutu', m + iw - cOk / 2 - s / 2, ry + rh / 2 - s / 2, s, s, { cizgi: 0.4 }]);
      }
      y += tabloH + 3 * k;
      // Engeller ve çözümler
      const yw = (iw - 3 * k) / 2;
      alan(ops, m, y, yw, 26 * k, 'Karşıma çıkabilecek engeller', 3);
      alan(ops, m + yw + 3 * k, y, yw, 26 * k, 'Engel çıkarsa ne yapacağım?', 3);
      y += 29 * k;
      // İlerleme şeridi
      const ew = 22 * k, kw = (iw - ew) / 10;
      ops.push(['yazi', 'İlerleme', m, y + 7.5 * k, F(8.5), { kalin: true }]);
      for (let j = 0; j < 10; j++) {
        ops.push(['kutu', m + ew + j * kw, y, kw, 12 * k, { cizgi: 0.5 }]);
        ops.push(['yazi', `%${(j + 1) * 10}`, m + ew + j * kw + kw / 2, y + 10.6 * k, F(6.5), { hiza: 'orta', ton: 0.5 }]);
      }
      y += 15 * k;
      alan(ops, m, y, iw, 18 * k, 'Sonunda ne öğrendim?', 2);
      sayfalar.push(ops);
    }
    return {
      rows: [
        ['Sayfa sayısı', `${n} sayfa`],
        ['Hedef başına adım satırı', `${adim} satır`],
        ['Hedef adları', adlar.length ? 'Sayfalara yazıldı' : 'Elle doldurulacak'],
        ['Kâğıt', a5 ? 'A5 dikey (148 × 210 mm)' : 'A4 dikey (210 × 297 mm)'],
      ],
      note: 'Yazdırırken kâğıt yönünü dikey, ölçeği "gerçek boyut" (%100) seçin.',
      pdf: { ad: 'hedef-planlayici', baslik, boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  }
