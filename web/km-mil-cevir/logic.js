// Kilometre Mil Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Mesafe');
    const km = v.yon === 'mil' ? x * 1.609344 : x;
    const mil = v.yon === 'mil' ? x : x / 1.609344;
    return {
      rows: [
        v.yon === 'mil' ? ['Kilometre', h.fmt(km, 4) + ' km'] : ['Mil', h.fmt(mil, 4) + ' mil'],
        v.yon === 'mil' ? ['Mil', h.fmt(mil, 4) + ' mil'] : ['Kilometre', h.fmt(km, 4) + ' km'],
        ['Metre', h.fmt(km * 1000, 2) + ' m'],
        ['Feet', h.fmt(mil * 5280, 1) + ' ft'],
        ['Deniz mili', h.fmt(km / 1.852, 4) + ' nmi'],
      ],
      note: 'Kara mili (statute mile) esas alınır: 1 mil = 1,609344 km = 5.280 feet. Deniz mili farklı bir birimdir (1,852 km).',
    };
  }
