// Parke Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const en = h.pos(v.en, 'Oda eni');
    const boy = h.pos(v.boy, 'Oda boyu');
    const te = h.pos(v.tahtaEn, 'Tahta eni');
    const tb = h.pos(v.tahtaBoy, 'Tahta boyu');
    const adet = h.posint(v.paketAdet, 'Paketteki tahta adedi');
    const fire = h.nonneg(v.fire, 'Fire payı');
    if (fire > 100) h.err('"Fire payı" en fazla 100 olabilir.');
    const alan = en * boy;
    const gereken = alan * (1 + fire / 100);
    const tahtaAlan = te * tb / 10000;
    const paketAlan = tahtaAlan * adet;
    const paket = Math.ceil(gereken / paketAlan - 1e-9);
    const tahta = Math.ceil(gereken / tahtaAlan - 1e-9);
    return {
      rows: [
        ['Paket sayısı', h.fmt(paket, 0) + ' paket'],
        ['Oda alanı', h.fmt(alan, 2) + ' m²'],
        ['Fire dahil gereken alan', h.fmt(gereken, 2) + ' m²'],
        ['Tahta adedi', h.fmt(tahta, 0) + ' adet'],
        ['Bir paketin kapladığı alan', h.fmt(paketAlan, 3) + ' m²'],
        ['Satın alınan alan', h.fmt(paket * paketAlan, 2) + ' m²'],
        ['Oda çevresi (süpürgelik için)', h.fmt(2 * (en + boy), 2) + ' m'],
      ],
      note: 'Paket sayısı yukarı yuvarlanır. Girintili çıkıntılı odalarda alanı parçalara bölüp toplayın; kapı boşlukları çevreden düşülmemiştir.',
    };
  }
