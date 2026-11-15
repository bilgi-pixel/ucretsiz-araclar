// Anten Boyu ve Dalga Boyu Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const boy = (m) => {
      if (m >= 1 - 1e-9) return h.fmt(m, 3) + ' m';
      if (m >= 0.01 - 1e-12) return h.fmt(m * 100, 2) + ' cm';
      return h.fmt(m * 1000, 2) + ' mm';
    };
    const carpan = v.birim === 'kHz' ? 1e3 : v.birim === 'GHz' ? 1e9 : 1e6;
    const f = h.pos(v.frekans, 'Frekans') * carpan;
    const k = h.pos(v.k, 'Kısalma katsayısı');
    if (k > 1 || k < 0.5) h.err('"Kısalma katsayısı" 0,5 ile 1 arasında olmalı (tipik değer 0,95).');
    const c = 299792458;
    const lambda = c / f;
    return {
      rows: [
        ['Dalga boyu (boşlukta)', boy(lambda)],
        ['Yarım dalga dipol (toplam)', boy(lambda / 2 * k)],
        ['Dipolün her bir kolu', boy(lambda / 4 * k)],
        ['Çeyrek dalga anten', boy(lambda / 4 * k)],
        ['5/8 dalga anten', boy(lambda * 0.625 * k)],
      ],
      note: 'λ = c ÷ f, c = 299 792 458 m/s. Anten boyları kısalma katsayısıyla çarpılmıştır; son ayar SWR ölçümüyle yapılmalıdır.',
    };
  }
