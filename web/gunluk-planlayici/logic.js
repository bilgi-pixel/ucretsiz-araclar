// Günlük Planlayıcı Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ilk = h.dateOrToday(v.baslangic, 'Başlangıç tarihi');
    if (ilk.getUTCFullYear() < 1900 || ilk.getUTCFullYear() > 2200) h.err('Başlangıç tarihi 1900 ile 2200 yılları arasında olmalı.');
    const n = h.posint(v.gun, 'Gün sayısı');
    if (n > 31) h.err('Gün sayısı en fazla 31 olabilir; daha uzun dönem için aracı yeni bir başlangıç tarihiyle tekrar çalıştırın.');
    const baslik = (v.baslik || '').trim() || 'Günlük Plan';
    if (baslik.length > 40) h.err('Sayfa başlığı en fazla 40 karakter olabilir.');
    const a5 = v.boyut === 'a5';
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, k = a5 ? 0.7 : 1, m = a5 ? 9 : 12;
    const f = (p) => Math.max(5, p * k);
    const atla = v.haftasonu === 'atla';
    // Sayfası basılacak günlerin listesi
    const gunler = [];
    let d = ilk;
    while (gunler.length < n) {
      const g = d.getUTCDay();
      if (!(atla && (g === 0 || g === 6))) gunler.push(d);
      d = h.gunEkle(d, 1);
    }
    // Başlıklı kutu çizer; ilk yazı satırının y değerini döndürür
    const bolum = (ops, x, y, w, yuk, ad) => {
      ops.push(['kutu', x, y, w, yuk, { cizgi: 0.5 }]);
      ops.push(['kutu', x, y, w, 7 * k, { dolgu: 0.92, cizgi: 0.5 }]);
      ops.push(['yazi', ad, x + 2 * k, y + 5 * k, f(8.5), { kalin: true }]);
      return y + 7 * k;
    };
    const sayfalar = gunler.map((t) => {
      const ops = [];
      ops.push(['yazi', baslik, m, m + 7 * k, f(17), { kalin: true }]);
      ops.push(['yazi', `${t.getUTCDate()} ${h.ayAdi(t.getUTCMonth() + 1)} ${t.getUTCFullYear()}`, W - m, m + 4 * k, f(11), { hiza: 'sag', kalin: true }]);
      ops.push(['yazi', h.gunAdi(t), W - m, m + 9 * k, f(9), { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 12 * k, W - m, m + 12 * k, { kalinlik: 0.6, ton: 0.2 }]);
      const ust = m + 16 * k, bosluk = 4 * k, altYuk = 44 * k;
      const altY = H - m - altYuk, ustYuk = altY - bosluk - ust;
      const tw = W - 2 * m, lw = tw * 0.56, rw = tw - lw - bosluk, rx = m + lw + bosluk;
      const sat = 8 * k;
      // Sol üst: üç öncelik
      const onYuk = 7 * k + 3 * sat + 3 * k;
      let y = bolum(ops, m, ust, lw, onYuk, 'Günün üç önceliği');
      for (let i = 0; i < 3; i++) {
        const yy = y + (i + 1) * sat;
        ops.push(['yazi', `${i + 1}.`, m + 2.5 * k, yy - 1 * k, f(10), { kalin: true, ton: 0.3 }]);
        ops.push(['cizgi', m + 8 * k, yy, m + lw - 2.5 * k, yy, { kalinlik: 0.2, ton: 0.7 }]);
      }
      // Sol alt: yapılacaklar
      const yapY = ust + onYuk + bosluk, yapYuk = ustYuk - onYuk - bosluk;
      y = bolum(ops, m, yapY, lw, yapYuk, 'Yapılacaklar');
      for (let yy = y + sat; yy < yapY + yapYuk - 1.5 * k; yy += sat) {
        ops.push(['kutu', m + 2.5 * k, yy - 4 * k, 3.6 * k, 3.6 * k, { cizgi: 0.4 }]);
        ops.push(['cizgi', m + 8 * k, yy, m + lw - 2.5 * k, yy, { kalinlik: 0.2, ton: 0.7 }]);
      }
      // Sağ: randevular (saat sütunu boş, kullanıcı doldurur)
      y = bolum(ops, rx, ust, rw, ustYuk, 'Randevular ve saatli işler');
      ops.push(['cizgi', rx + 13 * k, y, rx + 13 * k, ust + ustYuk, { kalinlik: 0.2, ton: 0.7 }]);
      ops.push(['yazi', 'Saat', rx + 2 * k, y + 4.5 * k, f(6.5), { ton: 0.45 }]);
      for (let yy = y + sat; yy < ust + ustYuk - 3 * k; yy += sat) ops.push(['cizgi', rx, yy, rx + rw, yy, { kalinlik: 0.2, ton: 0.75 }]);
      // Alt: notlar ve yarına devredenler
      const nw = tw * 0.6, dw = tw - nw - bosluk, dx = m + nw + bosluk;
      y = bolum(ops, m, altY, nw, altYuk, 'Notlar');
      for (let yy = y + sat; yy < altY + altYuk - 1.5 * k; yy += sat) ops.push(['cizgi', m + 2.5 * k, yy, m + nw - 2.5 * k, yy, { kalinlik: 0.2, ton: 0.75 }]);
      y = bolum(ops, dx, altY, dw, altYuk, 'Yarına devreden');
      for (let yy = y + sat; yy < altY + altYuk - 1.5 * k; yy += sat) ops.push(['cizgi', dx + 2.5 * k, yy, dx + dw - 2.5 * k, yy, { kalinlik: 0.2, ton: 0.75 }]);
      return ops;
    });
    const bas = gunler[0], son = gunler[gunler.length - 1];
    return {
      rows: [
        ['Sayfa sayısı', `${n} sayfa`],
        ['İlk gün', `${h.fmtDate(bas)} ${h.gunAdi(bas)}`],
        ['Son gün', `${h.fmtDate(son)} ${h.gunAdi(son)}`],
        ['Hafta sonları', atla ? 'Atlandı' : 'Dahil'],
        ['Kâğıt', a5 ? 'A5 dikey (148 × 210 mm)' : 'A4 dikey (210 × 297 mm)'],
      ],
      note: 'Yazdırırken kâğıt yönünü dikey, ölçeği "gerçek boyut" (%100) seçin.',
      pdf: { ad: 'gunluk-planlayici', baslik, boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  }
