// Bar Atmosfer Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.basinc, 'Basınç');
    const ATM = 101325; // 1 atm = 101.325 Pa (tam tanım)
    const pa = v.yon === 'atm' ? x * ATM : x * 100000;
    const bar = pa / 100000;
    const atm = pa / ATM;
    const f = (n) => h.sig(n, 7);
    return {
      rows: [
        v.yon === 'atm' ? ['Bar', f(bar) + ' bar'] : ['Atmosfer', f(atm) + ' atm'],
        v.yon === 'atm' ? ['Atmosfer', f(atm) + ' atm'] : ['Bar', f(bar) + ' bar'],
        ['Kilopascal', f(pa / 1000) + ' kPa'],
        ['PSI', f(pa / 6894.757293168361) + ' psi'],
        ['Torr (≈ mmHg)', f(atm * 760) + ' Torr'],
        ['Metre su sütunu', f(pa / 9806.65) + ' mSS'],
      ],
      note: '1 atm = 101.325 Pa = 1,01325 bar = 760 Torr (tam tanımlar). Buradaki atm, standart atmosferdir; teknik atmosfer (at) değildir.',
    };
  }
