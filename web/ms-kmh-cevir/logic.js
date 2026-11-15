// m/s km/h Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.hiz, 'Hız');
    const ms = v.yon === 'kmh' ? x / 3.6 : x;
    const kmh = v.yon === 'kmh' ? x : x * 3.6;
    const f = (n) => h.sig(n, 7);
    return {
      rows: [
        v.yon === 'kmh' ? ['Metre/saniye', f(ms) + ' m/s'] : ['Kilometre/saat', f(kmh) + ' km/h'],
        v.yon === 'kmh' ? ['Kilometre/saat', f(kmh) + ' km/h'] : ['Metre/saniye', f(ms) + ' m/s'],
        ['Metre/dakika', f(ms * 60) + ' m/dk'],
        ['Mil/saat', f(kmh / 1.609344) + ' mph'],
        ['Knot', f(kmh / 1.852) + ' kn'],
      ],
      note: '1 m/s = 3,6 km/h (tam değer). Sonuçlar yedi anlamlı basamağa yuvarlanır.',
    };
  }
