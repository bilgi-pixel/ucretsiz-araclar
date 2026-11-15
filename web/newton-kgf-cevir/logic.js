// Newton Kilogram-Kuvvet Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Kuvvet değeri');
    const KGF = 9.80665;
    const LBF = 4.4482216152605;
    const carpan = { n: 1, kgf: KGF, kn: 1000, dan: 10, lbf: LBF };
    const n = x * (carpan[v.birim] || 1);
    const satirlar = {
      n: ['Newton', h.fmt(n, 5) + ' N'],
      kgf: ['Kilogram-kuvvet', h.fmt(n / KGF, 5) + ' kgf'],
      kn: ['Kilonewton', h.fmt(n / 1000, 6) + ' kN'],
      dan: ['Dekanewton', h.fmt(n / 10, 6) + ' daN'],
      lbf: ['Pound-kuvvet', h.fmt(n / LBF, 5) + ' lbf'],
    };
    const sira = v.birim === 'n' || !satirlar[v.birim] ? ['kgf', 'n', 'kn', 'dan', 'lbf'] : ['n', 'kgf', 'kn', 'dan', 'lbf'];
    return {
      rows: sira.map((k) => satirlar[k]),
      note: '1 kgf = 9,80665 N (standart yerçekimi ivmesine dayalı tam tanım), 1 lbf = 4,4482216152605 N alınır.',
    };
  }
