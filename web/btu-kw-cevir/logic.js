// BTU Kilovat Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Kapasite');
    const W_BTUH = 1055.05585262 / 3600; // 1 BTU/h kaç watt
    const w = v.yon === 'kw' ? x * 1000 : x * W_BTUH;
    const btu = w / W_BTUH;
    const kwRow = ['Kilovat', h.fmt(w / 1000, 3) + ' kW'];
    const btuRow = ['BTU/saat', h.fmt(btu, 1) + ' BTU/h'];
    return {
      rows: [
        ...(v.yon === 'kw' ? [btuRow, kwRow] : [kwRow, btuRow]),
        ['Watt', h.fmt(w, 2) + ' W'],
        ['Kilokalori/saat', h.fmt(w * 3.6 / 4.1868, 0) + ' kcal/h'],
        ['Soğutma tonu', h.fmt(btu / 12000, 3) + ' RT'],
      ],
      note: 'Sonuç ısıl kapasitedir; cihazın şebekeden çektiği elektrik gücü değildir. 1 BTU = 1055,056 J alınmıştır.',
    };
  }
