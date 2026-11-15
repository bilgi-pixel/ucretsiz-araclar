// BTU Kilokalori Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const KJ_BTU = 1.05505585262; // 1 BTU (IT) kaç kJ
    const KJ_KCAL = 4.1868; // 1 kcal (IT) kaç kJ
    const kj = v.yon === 'kcal' ? x * KJ_KCAL : x * KJ_BTU;
    const kcalRow = ['Kilokalori', h.fmt(kj / KJ_KCAL, 4) + ' kcal'];
    const btuRow = ['BTU', h.fmt(kj / KJ_BTU, 4) + ' BTU'];
    return {
      rows: [
        ...(v.yon === 'kcal' ? [btuRow, kcalRow] : [kcalRow, btuRow]),
        ['Kilojoule', h.fmt(kj, 4) + ' kJ'],
        ['Watt-saat', h.fmt(kj / 3.6, 4) + ' Wh'],
      ],
      note: 'Uluslararası tablo tanımları kullanılır: 1 BTU = 1055,056 J, 1 kcal = 4186,8 J. Aynı oran BTU/h ile kcal/h arasında da geçerlidir.',
    };
  }
