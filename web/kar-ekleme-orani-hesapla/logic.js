// Kâr Ekleme Oranı (Markup) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const mod = v.mod || 'oran';
    let maliyet, satis, oran;
    if (mod === 'satis') {
      maliyet = h.pos(v.maliyet, 'Maliyet');
      oran = h.num(v.oran, 'Kâr ekleme oranı');
      if (oran < -100) h.err('Kâr ekleme oranı −%100\'den küçük olamaz; satış fiyatı sıfırın altına düşer.');
      satis = maliyet * (1 + oran / 100);
    } else if (mod === 'maliyet') {
      satis = h.pos(v.satis, 'Satış fiyatı');
      oran = h.num(v.oran, 'Kâr ekleme oranı');
      if (oran <= -100) h.err('Maliyeti bulmak için kâr ekleme oranı −%100\'den büyük olmalı.');
      maliyet = satis / (1 + oran / 100);
    } else {
      maliyet = h.pos(v.maliyet, 'Maliyet');
      satis = h.nonneg(v.satis, 'Satış fiyatı');
      oran = ((satis - maliyet) / maliyet) * 100;
    }
    const kar = satis - maliyet;
    const yuzde = (x) => (x < -5e-7 ? '−' : '') + '%' + h.fmt(Math.abs(x), 2);
    const sOran = ['Kâr ekleme oranı', yuzde(oran)];
    const sSatis = ['Satış fiyatı', h.para(satis)];
    const sMaliyet = ['Maliyet', h.para(maliyet)];
    const ilk = mod === 'satis' ? [sSatis, sOran, sMaliyet] : mod === 'maliyet' ? [sMaliyet, sOran, sSatis] : [sOran, sMaliyet, sSatis];
    return {
      rows: [
        ...ilk,
        [kar < -0.005 ? 'Zarar tutarı' : 'Kâr tutarı', h.para(Math.abs(kar))],
        ['Kâr marjı (satışa göre)', satis > 0 ? yuzde((kar / satis) * 100) : '—'],
        ['Fiyat çarpanı', maliyet > 0 ? h.fmt(satis / maliyet, 4) : '—'],
      ],
      note: 'Kâr ekleme oranı kârı maliyete, kâr marjı ise satış fiyatına böler. Maliyet ve satış fiyatını aynı esasla (ikisi de KDV hariç) yazın.',
    };
  }
