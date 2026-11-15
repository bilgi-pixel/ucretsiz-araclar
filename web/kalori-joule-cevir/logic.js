// Kalori Joule Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const k = v.tanim === 'it' ? 4.1868 : 4.184;
    const j = v.yon === 'j' ? x : x * k;
    const cal = j / k;
    const jRow = ['Joule', h.sig(j, 8) + ' J'];
    const calRow = ['Kalori', h.sig(cal, 8) + ' cal'];
    return {
      rows: [
        ...(v.yon === 'j' ? [calRow, jRow] : [jRow, calRow]),
        ['Kilojoule', h.sig(j / 1000, 8) + ' kJ'],
        ['Kilokalori', h.sig(cal / 1000, 8) + ' kcal'],
      ],
      note: `Kullanılan eşitlik: 1 cal = ${h.fmt(k, 4)} J. Binlik ayraç nokta, ondalık ayraç virgüldür.`,
    };
  }
