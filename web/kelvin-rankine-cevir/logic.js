// Kelvin Rankine Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.num(v.deger, 'Sıcaklık');
    if (x < 0) h.err('Kelvin ve Rankine mutlak ölçeklerdir; sıcaklık 0\'dan küçük olamaz. Celsius ya da Fahrenheit değeri çevirmek istiyorsanız ilgili çeviriciyi kullanın.');
    const k = v.yon === 'r' ? x / 1.8 : x;
    const r = v.yon === 'r' ? x : x * 1.8;
    const satirR = ['Rankine', h.fmt(r, 4) + ' °R'];
    const satirK = ['Kelvin', h.fmt(k, 4) + ' K'];
    return {
      rows: [
        v.yon === 'r' ? satirK : satirR,
        v.yon === 'r' ? satirR : satirK,
        ['Celsius', h.fmt(k - 273.15, 4) + ' °C'],
        ['Fahrenheit', h.fmt(r - 459.67, 4) + ' °F'],
      ],
      note: '°R = K × 9/5. Mutlak sıfır her iki ölçekte de 0\'dır (−273,15 °C, −459,67 °F).',
    };
  }
