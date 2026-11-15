// Kilokalori Kilojoule Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const kj = v.yon === 'kj' ? x : x * 4.184;
    const kcal = kj / 4.184;
    const kjRow = ['Kilojoule', h.fmt(kj, 3) + ' kJ'];
    const kcalRow = ['Kilokalori', h.fmt(kcal, 3) + ' kcal'];
    return {
      rows: [
        ...(v.yon === 'kj' ? [kcalRow, kjRow] : [kjRow, kcalRow]),
        ['Joule', h.fmt(kj * 1000, 0) + ' J'],
        ['Megajoule', h.fmt(kj / 1000, 4) + ' MJ'],
        ['Watt-saat', h.fmt(kj / 3.6, 3) + ' Wh'],
      ],
      note: '1 kcal = 4,184 kJ (termokimyasal tanım). Sonuçlar en fazla üç ondalık basamakla gösterilir.',
    };
  }
