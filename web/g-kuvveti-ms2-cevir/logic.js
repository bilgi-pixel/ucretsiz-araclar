// G Kuvveti m/s² Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.num(v.deger, 'İvme değeri');
    const G0 = 9.80665;
    const ms2 = v.yon === 'ms2' ? x : x * G0;
    const g = v.yon === 'ms2' ? x / G0 : x;
    const satirMs2 = ['m/s²', h.fmt(ms2, 6) + ' m/s²'];
    const satirG = ['g', h.fmt(g, 5) + ' g'];
    return {
      rows: [
        v.yon === 'ms2' ? satirG : satirMs2,
        v.yon === 'ms2' ? satirMs2 : satirG,
        ['ft/s²', h.fmt(ms2 / 0.3048, 4) + ' ft/s²'],
        ['Gal (cm/s²)', h.fmt(ms2 * 100, 3) + ' Gal'],
      ],
      note: 'Standart yer çekimi ivmesi g₀ = 9,80665 m/s² (tam tanım) alınmıştır. Gerçek yer çekimi ivmesi enleme ve yüksekliğe göre biraz değişir.',
    };
  }
