// mmHg Kilopascal Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.basinc, 'Basınç');
    const MMHG = 0.133322387415; // 1 mmHg = 133,322387415 Pa (geleneksel tanım)
    const kpa = v.yon === 'kpa' ? x : x * MMHG;
    const mmhg = v.yon === 'kpa' ? x / MMHG : x;
    const f = (n) => h.sig(n, 7);
    return {
      rows: [
        v.yon === 'kpa' ? ['Milimetre cıva', f(mmhg) + ' mmHg'] : ['Kilopascal', f(kpa) + ' kPa'],
        v.yon === 'kpa' ? ['Kilopascal', f(kpa) + ' kPa'] : ['Milimetre cıva', f(mmhg) + ' mmHg'],
        ['Hektopascal (milibar)', f(kpa * 10) + ' hPa'],
        ['Atmosfer', f(kpa / 101.325) + ' atm'],
        ['PSI', f(kpa / 6.894757293168361) + ' psi'],
        ['Santimetre su', f(kpa * 1000 / 98.0665) + ' cmH₂O'],
      ],
      note: '1 mmHg = 133,322387415 Pa kabul edilmiştir. Sonuçlar birim çevirisidir; tıbbi değerlendirme yerine geçmez.',
    };
  }
