// PSI Kilopascal Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.num(v.basinc, 'Basınç');
    const PSI = 6.894757293168361; // 1 lbf/in² = 4,4482216152605 N ÷ 6,4516 cm² = 6,894757… kPa
    const kpa = v.yon === 'kpa' ? x : x * PSI;
    const psi = v.yon === 'kpa' ? x / PSI : x;
    const f = (n) => h.sig(n, 7);
    return {
      rows: [
        v.yon === 'kpa' ? ['PSI', f(psi) + ' psi'] : ['Kilopascal', f(kpa) + ' kPa'],
        v.yon === 'kpa' ? ['Kilopascal', f(kpa) + ' kPa'] : ['PSI', f(psi) + ' psi'],
        ['Bar', f(kpa / 100) + ' bar'],
        ['Atmosfer', f(kpa / 101.325) + ' atm'],
        ['Milimetre cıva', f(kpa / 0.133322387415) + ' mmHg'],
        ['kg/cm²', f(kpa / 98.0665) + ' kgf/cm²'],
      ],
      note: '1 psi = 6,894757 kPa; 1 kPa = 0,1450377 psi. Negatif değerler vakum (atmosfer altı gösterge basıncı) olarak çevrilir.',
    };
  }
