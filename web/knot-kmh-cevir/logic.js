// Knot km/h Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.hiz, 'Hız');
    const DM = 1.852; // 1 deniz mili = 1,852 km (tam tanım)
    const kmh = v.yon === 'kmh' ? x : x * DM;
    const kn = v.yon === 'kmh' ? x / DM : x;
    const f = (n) => h.sig(n, 7);
    return {
      rows: [
        v.yon === 'kmh' ? ['Knot', f(kn) + ' kn'] : ['Kilometre/saat', f(kmh) + ' km/h'],
        v.yon === 'kmh' ? ['Kilometre/saat', f(kmh) + ' km/h'] : ['Knot', f(kn) + ' kn'],
        ['Metre/saniye', f(kmh / 3.6) + ' m/s'],
        ['Mil/saat', f(kmh / 1.609344) + ' mph'],
      ],
      note: '1 knot = 1 deniz mili/saat = 1,852 km/h (tam tanım). Sonuçlar yedi anlamlı basamağa yuvarlanır.',
    };
  }
