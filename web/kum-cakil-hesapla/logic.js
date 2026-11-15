// Kum Çakıl Miktarı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.pos(v.boy, 'Alanın boyu');
    const b = h.pos(v.en, 'Alanın eni');
    const k = h.pos(v.kalinlik, 'Serim kalınlığı');
    const p = h.nonneg(v.pay, 'Sıkışma ve fire payı');
    const ro = String(v.ozel ?? '').trim() === '' ? Number(v.malzeme) : h.pos(v.ozel, 'Özel yoğunluk');
    if (k > 300) h.err('Serim kalınlığı santimetre olarak yazılmalı; 300 cm üzeri değerler için ölçüyü kontrol edin.');
    const alan = a * b;
    const net = alan * k / 100;
    const siparis = net * (1 + p / 100);
    const ton = siparis * ro / 1000;
    return {
      rows: [
        ['Gerekli miktar', h.fmt(ton, 2) + ' ton'],
        ['Sipariş hacmi (paylı)', h.fmt(siparis, 2) + ' m³'],
        ['Net hacim', h.fmt(net, 2) + ' m³'],
        ['Alan', h.fmt(alan, 2) + ' m²'],
        ['Metrekareye düşen miktar', h.fmt(ton * 1000 / alan, 1) + ' kg/m²'],
      ],
      note: 'Yoğunluklar gevşek (dökme) malzeme için yaklaşık değerlerdir; nem ve tane boyutu ağırlığı belirgin biçimde değiştirir.',
    };
  }
