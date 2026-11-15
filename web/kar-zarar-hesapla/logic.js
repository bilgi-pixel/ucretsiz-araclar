// Kâr Zarar Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const alis = h.nonneg(v.alis, 'Birim alış fiyatı');
    const satis = h.nonneg(v.satis, 'Birim satış fiyatı');
    const adet = h.pos(h.opt(v.adet, 1, 'Adet') + '', 'Adet');
    const gider = h.opt(v.gider, 0, 'Toplam ek gider');
    if (gider < 0) h.err('"Toplam ek gider" negatif olamaz.');
    const maliyet = alis * adet + gider;
    const gelir = satis * adet;
    if (maliyet === 0 && gelir === 0) h.err('Alış ve satış fiyatının ikisi de sıfır olamaz; en az birini yazın.');
    const fark = gelir - maliyet;
    const yuzde = (x) => (x < -5e-7 ? '-' : '') + '%' + h.fmt(Math.abs(x), 2);
    const durum = Math.abs(fark) < 0.005 ? 'Başabaş' : fark > 0 ? 'Kâr' : 'Zarar';
    const sonuc = durum === 'Başabaş' ? 'Kâr da zarar da yok' : `${h.para(Math.abs(fark))} ${durum === 'Kâr' ? 'kâr' : 'zarar'}`;
    return {
      rows: [
        ['Sonuç', sonuc],
        ['Maliyete göre oran', maliyet > 0 ? yuzde((fark / maliyet) * 100) : '—'],
        ['Satışa göre oran (marj)', gelir > 0 ? yuzde((fark / gelir) * 100) : '—'],
        ['Toplam maliyet', h.para(maliyet)],
        ['Toplam satış geliri', h.para(gelir)],
        ['Birim başına kâr/zarar', h.para(fark / adet)],
      ],
      note: 'Oranlar girdiğiniz tutarlar üzerinden hesaplanır. Fiyatları KDV hariç ya da ikisini de KDV dahil yazın; karışık yazarsanız sonuç yanıltıcı olur.',
    };
  }
