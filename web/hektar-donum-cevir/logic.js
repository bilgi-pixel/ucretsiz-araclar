// Hektar Dönüm Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Alan');
    const ha = v.yon === 'd' ? x / 10 : x;
    const donum = v.yon === 'd' ? x : x * 10;
    const m2 = ha * 10000;
    const rows = v.yon === 'd'
      ? [['Hektar', h.fmt(ha, 4) + ' ha'], ['Dönüm', h.fmt(donum, 4) + ' dönüm']]
      : [['Dönüm', h.fmt(donum, 4) + ' dönüm'], ['Hektar', h.fmt(ha, 4) + ' ha']];
    rows.push(['Metrekare', h.fmt(m2, 2) + ' m²']);
    rows.push(['Kilometrekare', h.fmt(ha / 100, 6) + ' km²']);
    rows.push(['Eski dönüm (919,3 m²)', h.fmt(m2 / 919.3, 4) + ' eski dönüm']);
    return { rows, note: 'Dönüm, 1.000 m² olan metrik dönüm (dekar) olarak alınmıştır. Eski dönüm satırı yaklaşık 919,3 m² üzerinden hesaplanır.' };
  }
