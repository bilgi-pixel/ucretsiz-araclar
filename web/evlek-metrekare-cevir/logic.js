// Evlek Metrekare Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Alan');
    const donumM2 = v.tur === 'eski' ? 919.3 : 1000;
    const evlekM2 = donumM2 / 4;
    const m2 = v.yon === 'm' ? x : x * evlekM2;
    const evlek = v.yon === 'm' ? x / evlekM2 : x;
    const rows = v.yon === 'm'
      ? [['Evlek', h.fmt(evlek, 4) + ' evlek'], ['Metrekare', h.fmt(m2, 3) + ' m²']]
      : [['Metrekare', h.fmt(m2, 3) + ' m²'], ['Evlek', h.fmt(evlek, 4) + ' evlek']];
    rows.push(['Dönüm', h.fmt(evlek / 4, 4) + (v.tur === 'eski' ? ' eski dönüm' : ' dönüm')]);
    rows.push(['Dekar', h.fmt(m2 / 1000, 4) + ' daa']);
    return {
      rows,
      note: v.tur === 'eski'
        ? 'Eski dönüm yaklaşık 919,3 m², evlek bunun dörtte biri (yaklaşık 229,825 m²) alınmıştır. Yöresel kullanımlar farklı olabilir.'
        : 'Evlek, 1.000 m²\'lik dönümün dörtte biri, yani 250 m² alınmıştır.',
    };
  }
