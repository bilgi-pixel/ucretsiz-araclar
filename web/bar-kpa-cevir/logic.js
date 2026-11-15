// Bar Kilopascal Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.num(v.basinc, 'Basınç');
    const kpa = v.yon === 'bar' ? x * 100 : x;
    const bar = v.yon === 'bar' ? x : x / 100;
    const f = (n) => h.sig(n, 7);
    return {
      rows: [
        v.yon === 'bar' ? ['Kilopascal', f(kpa) + ' kPa'] : ['Bar', f(bar) + ' bar'],
        v.yon === 'bar' ? ['Bar', f(bar) + ' bar'] : ['Kilopascal', f(kpa) + ' kPa'],
        ['Pascal', h.sig(kpa * 1000, 9) + ' Pa'],
        ['Megapascal', f(kpa / 1000) + ' MPa'],
        ['PSI', f(kpa / 6.894757293168361) + ' psi'],
        ['Atmosfer', f(kpa / 101.325) + ' atm'],
      ],
      note: '1 bar = 100 kPa = 100.000 Pa (tam tanım). Negatif değerler vakum (atmosfer altı gösterge basıncı) olarak çevrilir.',
    };
  }
