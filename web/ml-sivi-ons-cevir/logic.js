// Mililitre Sıvı Ons (fl oz) Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ABD = 29.5735295625;
    const ING = 28.4130625;
    const x = h.nonneg(v.deger, 'Değer');
    const ing = v.tur === 'ing';
    const ml = v.yon === 'om' ? x * (ing ? ING : ABD) : x;
    const abdSatir = ['ABD sıvı onsu', h.fmt(ml / ABD, 4) + ' fl oz'];
    const ingSatir = ['İngiliz sıvı onsu', h.fmt(ml / ING, 4) + ' fl oz'];
    const mlSatir = ['Mililitre', h.fmt(ml, 3) + ' mL'];
    const rows = v.yon === 'om'
      ? [mlSatir, ing ? abdSatir : ingSatir, ing ? ingSatir : abdSatir]
      : [ing ? ingSatir : abdSatir, ing ? abdSatir : ingSatir, mlSatir];
    rows.push(['Litre', h.fmt(ml / 1000, 5) + ' L']);
    return {
      rows,
      note: '1 ABD sıvı onsu = 29,5735295625 mL, 1 İngiliz sıvı onsu = 28,4130625 mL. Sıvı ons hacim birimidir; ağırlık onsu (28,35 g) ile karıştırılmamalıdır.',
    };
  }
