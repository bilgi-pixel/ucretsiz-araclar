// Kinetik Enerji Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kat = v.hizBirim === 'kmh' ? 1 / 3.6 : 1;
    let m, hiz, e;
    if (v.bul === 'm') {
      e = h.pos(v.enerji, 'Kinetik enerji');
      hiz = h.pos(v.hiz, 'Hız') * kat;
      m = (2 * e) / (hiz * hiz);
    } else if (v.bul === 'v') {
      e = h.nonneg(v.enerji, 'Kinetik enerji');
      m = h.pos(v.kutle, 'Kütle');
      hiz = Math.sqrt((2 * e) / m);
    } else {
      m = h.pos(v.kutle, 'Kütle');
      hiz = h.nonneg(v.hiz, 'Hız') * kat;
      e = 0.5 * m * hiz * hiz;
    }
    const satirlar = {
      e: ['Kinetik enerji', h.fmt(e, 4) + ' J'],
      m: ['Kütle', h.fmt(m, 4) + ' kg'],
      v: ['Hız', h.fmt(hiz, 4) + ' m/s'],
    };
    const sira = v.bul === 'm' ? ['m', 'e', 'v'] : v.bul === 'v' ? ['v', 'e', 'm'] : ['e', 'm', 'v'];
    return {
      rows: [
        ...sira.map((k) => satirlar[k]),
        ['Hız (km/sa)', h.fmt(hiz * 3.6, 2) + ' km/sa'],
        ['Enerji (kJ)', h.fmt(e / 1000, 4) + ' kJ'],
        ['Momentum', h.fmt(m * hiz, 4) + ' kg·m/s'],
      ],
      note: 'Klasik mekanik bağıntısı kullanılır; ışık hızına yakın hızlar için geçerli değildir. 1 kJ = 1000 J.',
    };
  }
