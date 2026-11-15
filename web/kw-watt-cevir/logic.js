// Kilovat Watt Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Güç');
    const w = v.yon === 'w' ? x : x * 1000;
    const wRow = ['Watt', h.sig(w, 10) + ' W'];
    const kwRow = ['Kilovat', h.sig(w / 1000, 10) + ' kW'];
    return {
      rows: [
        ...(v.yon === 'w' ? [kwRow, wRow] : [wRow, kwRow]),
        ['Megavat', h.sig(w / 1e6, 10) + ' MW'],
        ['Bir saatte harcanan enerji', h.sig(w / 1000, 10) + ' kWh'],
      ],
      note: '1 kW = 1000 W. Enerji satırı, cihazın bu güçte kesintisiz bir saat çalıştığı varsayımıyla hesaplanır.',
    };
  }
