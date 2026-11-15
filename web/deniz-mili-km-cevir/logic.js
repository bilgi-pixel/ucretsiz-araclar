// Deniz Mili Kilometre Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Mesafe');
    const km = v.yon === 'km' ? x : x * 1.852;
    const nmi = v.yon === 'km' ? x / 1.852 : x;
    return {
      rows: [
        v.yon === 'km' ? ['Deniz mili', h.fmt(nmi, 4) + ' nmi'] : ['Kilometre', h.fmt(km, 4) + ' km'],
        v.yon === 'km' ? ['Kilometre', h.fmt(km, 4) + ' km'] : ['Deniz mili', h.fmt(nmi, 4) + ' nmi'],
        ['Metre', h.fmt(km * 1000, 2) + ' m'],
        ['Kara mili', h.fmt(km / 1.609344, 4) + ' mil'],
        ['Gomina', h.fmt(nmi * 10, 3) + ' gomina'],
      ],
      note: '1 deniz mili = 1,852 km (tam tanım). 1 gomina = deniz milinin onda biri = 185,2 m. Kara mili 1,609344 km alınır.',
    };
  }
