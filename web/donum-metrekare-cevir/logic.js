// Dönüm Metrekare Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Alan');
    const birim = v.tur === 'eski' ? 919.3 : 1000;
    const m2 = v.yon === 'm' ? x : x * birim;
    const donum = v.yon === 'm' ? x / birim : x;
    const tam = Math.floor(donum + 1e-9);
    const kalan = Math.max(0, m2 - tam * birim);
    const rows = v.yon === 'm'
      ? [['Dönüm', h.fmt(donum, 4) + ' dönüm'], ['Metrekare', h.fmt(m2, 2) + ' m²']]
      : [['Metrekare', h.fmt(m2, 2) + ' m²'], ['Dönüm', h.fmt(donum, 4) + ' dönüm']];
    rows.push(['Dönüm ve metrekare', `${h.fmt(tam, 0)} dönüm ${h.fmt(kalan, 2)} m²`]);
    rows.push(['Dekar', h.fmt(m2 / 1000, 4) + ' daa']);
    rows.push(['Hektar', h.fmt(m2 / 10000, 4) + ' ha']);
    return {
      rows,
      note: v.tur === 'eski'
        ? 'Eski dönüm yaklaşık 919,3 m² alınmıştır; yöresel dönümler bundan farklı olabilir. Dekar ve hektar metrik birimlerdir.'
        : 'Yeni (metrik) dönüm 1.000 m² alınmıştır ve dekarla aynı büyüklüktedir.',
    };
  }
