// Pascal Bar Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.num(v.basinc, 'Basınç');
    const pa = v.yon === 'bar' ? x * 100000 : x;
    const bar = v.yon === 'bar' ? x : x / 100000;
    const f = (n) => h.sig(n, 9);
    return {
      rows: [
        v.yon === 'bar' ? ['Pascal', f(pa) + ' Pa'] : ['Bar', f(bar) + ' bar'],
        v.yon === 'bar' ? ['Bar', f(bar) + ' bar'] : ['Pascal', f(pa) + ' Pa'],
        ['Hektopascal (milibar)', f(pa / 100) + ' hPa'],
        ['Kilopascal', f(pa / 1000) + ' kPa'],
        ['Megapascal', f(pa / 1e6) + ' MPa'],
        ['PSI', h.sig(pa / 6894.757293168361, 7) + ' psi'],
      ],
      note: '1 bar = 100.000 Pa = 1.000 hPa = 100 kPa = 0,1 MPa (tam tanım). Negatif değerler atmosfer altı gösterge basıncı olarak çevrilir.',
    };
  }
