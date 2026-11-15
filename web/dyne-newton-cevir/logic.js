// Dyne Newton Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.num(v.deger, 'Kuvvet');
    const n = v.yon === 'n' ? x : x / 100000;
    const dyn = v.yon === 'n' ? x * 100000 : x;
    const satirN = ['Newton', h.sig(n, 8) + ' N'];
    const satirDyn = ['Dyne', h.sig(dyn, 8) + ' dyn'];
    return {
      rows: [
        v.yon === 'n' ? satirDyn : satirN,
        v.yon === 'n' ? satirN : satirDyn,
        ['Milinewton', h.sig(n * 1000, 8) + ' mN'],
        ['Kilogram-kuvvet', h.sig(n / 9.80665, 6) + ' kgf'],
      ],
      note: '1 N = 10^5 dyn; 1 dyn = 10^-5 N = 10 µN (tam değer). 1 kgf = 9,80665 N alınmıştır.',
    };
  }
