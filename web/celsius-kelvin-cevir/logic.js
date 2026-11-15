// Celsius Kelvin Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.num(v.deger, 'Sıcaklık');
    let c, k;
    if (v.yon === 'k') {
      if (x < 0) h.err('Kelvin ölçeğinde negatif sıcaklık yoktur; 0 ya da daha büyük bir değer yazın.');
      k = x; c = x - 273.15;
    } else {
      if (x < -273.15 - 1e-9) h.err('Sıcaklık mutlak sıfırın (−273,15 °C) altında olamaz; daha yüksek bir değer yazın.');
      c = x; k = x + 273.15;
    }
    const f = c * 9 / 5 + 32;
    const rows = v.yon === 'k'
      ? [['Celsius', h.fmt(c, 4) + ' °C'], ['Kelvin', h.fmt(k, 4) + ' K']]
      : [['Kelvin', h.fmt(k, 4) + ' K'], ['Celsius', h.fmt(c, 4) + ' °C']];
    rows.push(['Fahrenheit', h.fmt(f, 4) + ' °F']);
    return { rows, note: 'K = °C + 273,15. Kelvin değerleri "derece" sözcüğü ve ° işareti olmadan yazılır.' };
  }
