// Dikdörtgenler Prizması Hacmi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.pos(v.en, 'En');
    const b2 = h.pos(v.boy, 'Boy');
    const c = h.pos(v.yukseklik, 'Yükseklik');
    const b = v.birim === 'm' || v.birim === 'mm' ? v.birim : 'cm';
    const litreKat = b === 'm' ? 1000 : b === 'mm' ? 1e-6 : 1e-3;
    const hacim = a * b2 * c;
    const yuzey = 2 * (a * b2 + a * c + b2 * c);
    const yanal = 2 * c * (a + b2);
    const kosegen = Math.sqrt(a * a + b2 * b2 + c * c);
    return {
      rows: [
        ['Hacim', `${h.fmt(hacim, 4)} ${b}³`],
        ['Litre karşılığı', `${h.fmt(hacim * litreKat, 4)} L`],
        ['Toplam yüzey alanı', `${h.fmt(yuzey, 4)} ${b}²`],
        ['Taban alanı', `${h.fmt(a * b2, 4)} ${b}²`],
        ['Yanal alan', `${h.fmt(yanal, 4)} ${b}²`],
        ['Cisim köşegeni', `${h.fmt(kosegen, 4)} ${b}`],
      ],
      note: 'Bütün köşelerin dik açılı olduğu kabul edilir. Kap kapasitesi için iç ölçüleri girin.',
    };
  }
