// Bar PSI Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.num(v.basinc, 'Basınç');
    const PSI = 6.894757293168361; // 1 psi = 6,894757… kPa (lbf/in² tanımından)
    const kpa = v.yon === 'psi' ? x * PSI : x * 100;
    const bar = kpa / 100;
    const psi = kpa / PSI;
    const f = (n) => h.sig(n, 7);
    return {
      rows: [
        v.yon === 'psi' ? ['Bar', f(bar) + ' bar'] : ['PSI', f(psi) + ' psi'],
        v.yon === 'psi' ? ['PSI', f(psi) + ' psi'] : ['Bar', f(bar) + ' bar'],
        ['Kilopascal', f(kpa) + ' kPa'],
        ['Atmosfer', f(kpa / 101.325) + ' atm'],
        ['kg/cm²', f(kpa / 98.0665) + ' kgf/cm²'],
      ],
      note: '1 bar = 100 kPa; 1 psi = 6,894757 kPa. Negatif değerler vakum (atmosfer altı gösterge basıncı) olarak çevrilir.',
    };
  }
