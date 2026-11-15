// Potansiyel Enerji Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const g = h.pos(v.g, 'Yer çekimi ivmesi');
    let m, y, e;
    if (v.bul === 'm') {
      e = h.pos(v.enerji, 'Potansiyel enerji');
      y = h.pos(v.yukseklik, 'Yükseklik');
      m = e / (g * y);
    } else if (v.bul === 'y') {
      e = h.nonneg(v.enerji, 'Potansiyel enerji');
      m = h.pos(v.kutle, 'Kütle');
      y = e / (m * g);
    } else {
      m = h.pos(v.kutle, 'Kütle');
      y = h.nonneg(v.yukseklik, 'Yükseklik');
      e = m * g * y;
    }
    const satirlar = {
      e: ['Potansiyel enerji', h.fmt(e, 4) + ' J'],
      m: ['Kütle', h.fmt(m, 4) + ' kg'],
      y: ['Yükseklik', h.fmt(y, 4) + ' m'],
    };
    const sira = v.bul === 'm' ? ['m', 'e', 'y'] : v.bul === 'y' ? ['y', 'e', 'm'] : ['e', 'm', 'y'];
    return {
      rows: [
        ...sira.map((k) => satirlar[k]),
        ['Enerji (kJ)', h.fmt(e / 1000, 4) + ' kJ'],
        ['Cismin ağırlığı', h.fmt(m * g, 4) + ' N'],
        ['Serbest bırakılırsa yere çarpma hızı', h.fmt(Math.sqrt(2 * g * y), 4) + ' m/s'],
      ],
      note: `g = ${h.fmt(g, 4)} m/s² alındı. Çarpma hızı hava direnci yok sayılarak √(2·g·h) ile bulunur.`,
    };
  }
