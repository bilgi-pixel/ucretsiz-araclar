// Parsek Işık Yılı Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const AB_KM = 149597870.7;                    // astronomik birim, km (tam)
    const PC_KM = (648000 / Math.PI) * AB_KM;     // parsek tanımı: 648000/π AB
    const IY_KM = 9460730472580.8;                // ışık yılı: 299.792,458 km/s × 365,25 gün
    const birimler = {
      pc: [PC_KM, 'pc'],
      iy: [IY_KM, 'ışık yılı'],
      kpc: [PC_KM * 1e3, 'kpc'],
      mpc: [PC_KM * 1e6, 'Mpc'],
      ab: [AB_KM, 'AB'],
    };
    const x = h.pos(v.deger, 'Uzaklık');
    const k = birimler[v.kaynak] || birimler.pc;
    const t = birimler[v.hedef] || birimler.iy;
    const km = x * k[0];
    const yaz = (b) => h.sig(km / b[0], 6) + ' ' + b[1];
    return {
      rows: [
        ['Sonuç', yaz(t)],
        ['Parsek', yaz(birimler.pc)],
        ['Işık yılı', yaz(birimler.iy)],
        ['Astronomik birim', yaz(birimler.ab)],
        ['Kilometre', h.sig(km, 6) + ' km'],
        ['Paralaks açısı', h.sig(PC_KM / km, 6) + ' yay saniyesi'],
      ],
      note: '1 pc = 648000/π AB ≈ 3,26156 ışık yılı. Sonuçlar altı anlamlı basamağa yuvarlanır. Paralaks açısı, yay saniyesi cinsinden 1 ÷ uzaklık (parsek) bağıntısıyla bulunur.',
    };
  }
