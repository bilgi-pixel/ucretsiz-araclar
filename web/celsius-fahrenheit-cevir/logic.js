// Celsius Fahrenheit Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.num(v.deger, 'Sıcaklık');
    const c = v.yon === 'f' ? (x - 32) * 5 / 9 : x;
    const f = v.yon === 'f' ? x : x * 9 / 5 + 32;
    if (c < -273.15 - 1e-9) h.err('Bu sıcaklık mutlak sıfırın (−273,15 °C = −459,67 °F) altında; daha yüksek bir değer yazın.');
    const k = c + 273.15;
    const rows = v.yon === 'f'
      ? [['Celsius', h.fmt(c, 4) + ' °C'], ['Fahrenheit', h.fmt(f, 4) + ' °F']]
      : [['Fahrenheit', h.fmt(f, 4) + ' °F'], ['Celsius', h.fmt(c, 4) + ' °C']];
    rows.push(['Kelvin', h.fmt(k, 4) + ' K']);
    return { rows, note: '°F = °C × 9/5 + 32 ve °C = (°F − 32) × 5/9. Sonuçlar en fazla dört ondalık basamakla gösterilir.' };
  }
