// Kilovatsaat Kilokalori Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const kj = v.yon === 'kcal' ? x * 4.184 : x * 3600;
    const kcalRow = ['Kilokalori', h.fmt(kj / 4.184, 2) + ' kcal'];
    const kwhRow = ['Kilovatsaat', h.fmt(kj / 3600, 4) + ' kWh'];
    return {
      rows: [
        ...(v.yon === 'kcal' ? [kwhRow, kcalRow] : [kcalRow, kwhRow]),
        ['Megajoule', h.fmt(kj / 1000, 4) + ' MJ'],
        ['Kilojoule', h.fmt(kj, 1) + ' kJ'],
      ],
      note: '1 kWh = 3600 kJ ve 1 kcal = 4,184 kJ alınmıştır. Sonuç yalnızca enerji eşdeğeridir; cihaz verimi hesaba katılmaz.',
    };
  }
