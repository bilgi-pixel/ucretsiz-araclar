// cc Mililitre Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    // 1 cc = 1 mL olduğundan sayısal değer değişmez; yön yalnızca satır sırasını belirler.
    const ml = x;
    const mlSatir = ['Mililitre', h.fmt(ml, 4) + ' mL'];
    const ccSatir = ['cc (cm³)', h.fmt(ml, 4) + ' cc'];
    return {
      rows: [
        v.yon === 'mc' ? ccSatir : mlSatir,
        v.yon === 'mc' ? mlSatir : ccSatir,
        ['Litre', h.fmt(ml / 1000, 6) + ' L'],
        ['Santilitre', h.fmt(ml / 10, 4) + ' cL'],
        ['Milimetreküp', h.fmt(ml * 1000, 1) + ' mm³'],
      ],
      note: '1 cc = 1 cm³ = 1 mL (tam eşitlik). Sayısal değer değişmez; yalnızca birimin adı farklıdır.',
    };
  }
