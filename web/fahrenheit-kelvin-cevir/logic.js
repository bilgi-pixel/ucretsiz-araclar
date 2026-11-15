// Fahrenheit Kelvin Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.num(v.deger, 'Sıcaklık');
    let f, k;
    if (v.yon === 'k') {
      if (x < 0) h.err('Kelvin ölçeğinde negatif sıcaklık yoktur; 0 ya da daha büyük bir değer yazın.');
      k = x; f = x * 9 / 5 - 459.67;
    } else {
      if (x < -459.67 - 1e-9) h.err('Sıcaklık mutlak sıfırın (−459,67 °F) altında olamaz; daha yüksek bir değer yazın.');
      f = x; k = Math.max(0, (x + 459.67) * 5 / 9);
    }
    const c = k - 273.15;
    const rows = v.yon === 'k'
      ? [['Fahrenheit', h.fmt(f, 4) + ' °F'], ['Kelvin', h.fmt(k, 4) + ' K']]
      : [['Kelvin', h.fmt(k, 4) + ' K'], ['Fahrenheit', h.fmt(f, 4) + ' °F']];
    rows.push(['Celsius', h.fmt(c, 4) + ' °C']);
    return { rows, note: 'K = (°F + 459,67) × 5/9 ve °F = K × 9/5 − 459,67. Sonuçlar en fazla dört ondalık basamakla gösterilir.' };
  }
