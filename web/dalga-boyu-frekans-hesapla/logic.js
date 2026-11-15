// Dalga Boyu Frekans Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const fCarpan = Number(v.frekansBirim) || 1;
    const lCarpan = Number(v.dalgaBirim) || 1;
    const ortamHizi = () => {
      if (v.ortam === 'ses') return 343;
      if (v.ortam === 'ozel') return h.pos(v.hiz, 'Dalga hızı');
      return 299792458;
    };
    let hiz, f, l;
    if (v.bul === 'frekans') {
      hiz = ortamHizi(); l = h.pos(v.dalgaBoyu, 'Dalga boyu') * lCarpan; f = hiz / l;
    } else if (v.bul === 'hiz') {
      f = h.pos(v.frekans, 'Frekans') * fCarpan; l = h.pos(v.dalgaBoyu, 'Dalga boyu') * lCarpan; hiz = f * l;
    } else {
      hiz = ortamHizi(); f = h.pos(v.frekans, 'Frekans') * fCarpan; l = hiz / f;
    }
    const boy = (x) => {
      const b = [[1e3, 'km'], [1, 'm'], [1e-2, 'cm'], [1e-3, 'mm'], [1e-6, 'µm']];
      for (const [c, ad] of b) if (x >= c * (1 - 1e-12)) return h.sig(x / c, 6) + ' ' + ad;
      return h.sig(x / 1e-9, 6) + ' nm';
    };
    const frek = (x) => {
      const b = [[1e12, 'THz'], [1e9, 'GHz'], [1e6, 'MHz'], [1e3, 'kHz']];
      for (const [c, ad] of b) if (x >= c * (1 - 1e-12)) return h.sig(x / c, 6) + ' ' + ad;
      return h.sig(x, 6) + ' Hz';
    };
    const lS = ['Dalga boyu', boy(l)];
    const fS = ['Frekans', frek(f)];
    const vS = ['Dalga hızı', h.sig(hiz, 9) + ' m/s'];
    const ilk = v.bul === 'frekans' ? [fS, lS, vS] : v.bul === 'hiz' ? [vS, lS, fS] : [lS, fS, vS];
    return {
      rows: [
        ...ilk,
        ['Periyot', h.sig(1 / f, 6) + ' s'],
        ['Dalga boyu (metre)', h.sig(l, 6) + ' m'],
        ['Frekans (hertz)', h.sig(f, 6) + ' Hz'],
      ],
      note: 'λ = v ÷ f. Işık hızı boşluk için tam tanım değeridir; ses hızı 20 °C kuru hava için yaklaşık değerdir ve sıcaklıkla değişir.',
    };
  }
