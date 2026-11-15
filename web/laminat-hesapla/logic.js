// Laminat Paket Sayısı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const en = h.pos(v.en, 'Oda eni');
    const boy = h.pos(v.boy, 'Oda boyu');
    const paket = h.pos(v.paket, 'Bir paketin kapladığı alan');
    const fire = h.opt(v.fire, 10, 'Fire payı');
    if (fire < 0 || fire > 100) h.err('"Fire payı" 0 ile 100 arasında bir yüzde olmalı (örn. 10).');
    const alan = en * boy;
    const fireli = alan * (1 + fire / 100);
    const adet = Math.max(1, Math.ceil(fireli / paket - 1e-9));
    const toplam = adet * paket;
    const rows = [
      ['Gerekli paket sayısı', h.fmt(adet, 0) + ' paket'],
      ['Zemin alanı', h.fmt(alan, 2) + ' m²'],
      ['Fire dahil gereken alan', h.fmt(fireli, 2) + ' m²'],
      ['Alınacak toplam alan', h.fmt(toplam, 2) + ' m²'],
      ['Fire ve yedek için kalan', h.fmt(toplam - alan, 2) + ' m²'],
    ];
    if (String(v.fiyat ?? '').trim() !== '') {
      const f = h.nonneg(v.fiyat, 'Paket fiyatı');
      rows.push(['Toplam tutar', h.para(adet * f)]);
      rows.push(['Zemin metrekaresi başına maliyet', h.para(adet * f / alan)]);
    }
    return {
      rows,
      note: 'Paket sayısı her zaman yukarı yuvarlanır. Şilte, süpürgelik, geçiş profili ve işçilik bu hesaba dahil değildir.',
    };
  }
