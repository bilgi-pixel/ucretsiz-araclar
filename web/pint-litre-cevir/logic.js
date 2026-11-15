// Pint Litre Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ABD = 0.473176473;
    const ING = 0.56826125;
    const x = h.nonneg(v.deger, 'Değer');
    const ing = v.tur === 'ing';
    const litre = v.yon === 'lp' ? x : x * (ing ? ING : ABD);
    const abdSatir = ['ABD pinti', h.fmt(litre / ABD, 4) + ' pt'];
    const ingSatir = ['İngiliz pinti', h.fmt(litre / ING, 4) + ' pt'];
    const lSatir = ['Litre', h.fmt(litre, 4) + ' L'];
    const rows = v.yon === 'lp'
      ? [ing ? ingSatir : abdSatir, ing ? abdSatir : ingSatir, lSatir]
      : [lSatir, ing ? abdSatir : ingSatir, ing ? ingSatir : abdSatir];
    rows.push(['Mililitre', h.fmt(litre * 1000, 2) + ' mL']);
    return {
      rows,
      note: '1 ABD sıvı pinti = 0,473176473 L (galonun sekizde biri), 1 İngiliz pinti = 0,56826125 L. ABD kuru pinti bu araçta yer almaz.',
    };
  }
