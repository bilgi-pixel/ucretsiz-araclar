// kg/cm² Bar Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Basınç değeri');
    const KGF = 98.0665; // 1 kgf/cm² = 98,0665 kPa (tam tanım)
    const kpa = v.yon === 'bar' ? x * 100 : x * KGF;
    const bar = kpa / 100;
    const kg = kpa / KGF;
    const rows = [
      v.yon === 'bar' ? ['kg/cm²', h.sig(kg, 6) + ' kg/cm²'] : ['Bar', h.sig(bar, 6) + ' bar'],
      ['Kilopascal', h.sig(kpa, 6) + ' kPa'],
      ['PSI', h.sig(kpa / 6.894757293168, 6) + ' psi'],
      ['Atmosfer', h.sig(kpa / 101.325, 6) + ' atm'],
      ['Metre su sütunu', h.sig(kpa / 9.80665, 6) + ' mSS'],
    ];
    return {
      rows,
      note: '1 kgf/cm² = 98,0665 kPa (standart yer çekimi ivmesi 9,80665 m/s² ile tanımlıdır). Manometreler çoğunlukla atmosfer basıncının üzerindeki gösterge basıncını okur.',
    };
  }
