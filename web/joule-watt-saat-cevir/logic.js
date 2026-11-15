// Joule Watt-saat Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Enerji');
    const j = v.yon === 'wh' ? x * 3600 : x;
    const wh = v.yon === 'wh' ? x : x / 3600;
    const satirWh = ['Watt-saat', h.sig(wh, 8) + ' Wh'];
    const satirJ = ['Joule', h.sig(j, 8) + ' J'];
    return {
      rows: [
        v.yon === 'wh' ? satirJ : satirWh,
        v.yon === 'wh' ? satirWh : satirJ,
        ['Kilojoule', h.sig(j / 1000, 8) + ' kJ'],
        ['Kilowatt-saat', h.sig(wh / 1000, 8) + ' kWh'],
      ],
      note: '1 Wh = 3.600 J, 1 kWh = 3.600.000 J = 3,6 MJ (tam değer). Sonuçlar sekiz anlamlı basamağa kadar gösterilir.',
    };
  }
