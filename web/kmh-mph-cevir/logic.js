// km/s Mil/s (km/h – mph) Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.hiz, 'Hız');
    const MIL = 1.609344; // 1 kara mili = 1,609344 km (tam tanım)
    const kmh = v.yon === 'mph' ? x * MIL : x;
    const mph = kmh / MIL;
    const f = (n) => h.sig(n, 7);
    return {
      rows: [
        v.yon === 'mph' ? ['Kilometre/saat', f(kmh) + ' km/h'] : ['Mil/saat', f(mph) + ' mph'],
        v.yon === 'mph' ? ['Mil/saat', f(mph) + ' mph'] : ['Kilometre/saat', f(kmh) + ' km/h'],
        ['Metre/saniye', f(kmh / 3.6) + ' m/s'],
        ['Knot', f(kmh / 1.852) + ' kn'],
      ],
      note: '1 mil = 1,609344 km (uluslararası kara mili). Sonuçlar yedi anlamlı basamağa yuvarlanır.',
    };
  }
