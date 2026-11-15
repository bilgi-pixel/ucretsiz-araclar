// Temel Betonu Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const L = h.pos(v.uzunluk, 'Uzunluk');
    const W = h.pos(v.genislik, 'Genişlik');
    const kal = h.pos(v.kalinlik, 'Kalınlık');
    const adet = h.posint(v.adet, 'Adet');
    const gro = h.nonneg(v.grobeton, 'Grobeton kalınlığı');
    const fire = h.nonneg(v.fire, 'Fire payı');
    if (kal > 500) h.err('Kalınlık santimetre olarak yazılmalı (örn. 50).');
    if (gro > 100) h.err('Grobeton kalınlığı santimetre olarak yazılmalı (örn. 10).');
    const adlar = { radye: 'Radye temel', surekli: 'Sürekli temel', tekil: 'Tekil temel' };
    const ad = adlar[v.tur];
    if (!ad) h.err('Temel türünü listeden seçin.');
    const k = 1 + fire / 100;
    const alan = L * W * adet;
    const net = alan * (kal / 100);
    const rows = [
      ['Gerekli temel betonu', h.fmt(net * k, 2) + ' m³'],
      ['Fire hariç hacim', h.fmt(net, 3) + ' m³'],
      ['Taban alanı', h.fmt(alan, 2) + ' m²'],
    ];
    if (adet > 1) rows.push(['Tek temel hacmi', h.fmt(net / adet, 3) + ' m³']);
    if (gro > 0) rows.push(['Gerekli grobeton', h.fmt(alan * (gro / 100) * k, 2) + ' m³']);
    rows.push(['Yaklaşık beton ağırlığı', h.fmt(net * k * 2.4, 2) + ' ton']);
    rows.push(['Temel türü', ad]);
    return {
      rows,
      note: 'Grobeton, temel taban alanı kadar bir yüzeye döküldüğü varsayılarak hesaplanır; taşma payı bırakılıyorsa gerçek miktar biraz daha fazladır. Ağırlık 2.400 kg/m³ üzerinden verilmiştir.',
    };
  }
