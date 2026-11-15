// Kilovatsaat Joule Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const j = v.yon === 'j' ? x : x * 3.6e6;
    const kwh = j / 3.6e6;
    const jRow = ['Joule', h.sig(j, 8) + ' J'];
    const kwhRow = ['Kilovatsaat', h.sig(kwh, 8) + ' kWh'];
    return {
      rows: [
        ...(v.yon === 'j' ? [kwhRow, jRow] : [jRow, kwhRow]),
        ['Kilojoule', h.sig(j / 1e3, 8) + ' kJ'],
        ['Megajoule', h.sig(j / 1e6, 8) + ' MJ'],
        ['Watt-saat', h.sig(kwh * 1000, 8) + ' Wh'],
      ],
      note: '1 kWh = 3.600.000 J (tam). Sonuçlar sekiz anlamlı basamağa yuvarlanır; çok küçük ya da çok büyük değerler 10 üssüyle gösterilir.',
    };
  }
