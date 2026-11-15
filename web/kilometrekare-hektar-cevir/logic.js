// Kilometrekare Hektar Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Alan');
    const ha = v.yon === 'h' ? x : x * 100;
    const km2 = v.yon === 'h' ? x / 100 : x;
    const rows = v.yon === 'h'
      ? [['Kilometrekare', h.fmt(km2, 6) + ' km²'], ['Hektar', h.fmt(ha, 4) + ' ha']]
      : [['Hektar', h.fmt(ha, 4) + ' ha'], ['Kilometrekare', h.fmt(km2, 6) + ' km²']];
    rows.push(['Metrekare', h.fmt(ha * 10000, 2) + ' m²']);
    rows.push(['Dönüm', h.fmt(ha * 10, 3) + ' dönüm']);
    return { rows, note: '1 km² = 100 ha = 1.000.000 m². Dönüm, 1.000 m² olan metrik dönüm (dekar) olarak alınmıştır.' };
  }
