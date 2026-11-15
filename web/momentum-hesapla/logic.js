// Momentum Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let m, hiz, p;
    if (v.bul === 'm') {
      p = h.num(v.momentum, 'Momentum');
      hiz = h.num(v.hiz, 'Hız');
      if (hiz === 0) h.err('Hız sıfırken kütle bulunamaz; sıfırdan farklı bir hız yazın.');
      m = p / hiz;
      if (!(m > 0)) h.err('Momentum ile hız aynı işaretli olmalı; aksi halde kütle negatif çıkar.');
    } else if (v.bul === 'v') {
      p = h.num(v.momentum, 'Momentum');
      m = h.pos(v.kutle, 'Kütle');
      hiz = p / m;
    } else {
      m = h.pos(v.kutle, 'Kütle');
      hiz = h.num(v.hiz, 'Hız');
      p = m * hiz;
    }
    const ek = 0.5 * m * hiz * hiz;
    const satirlar = {
      p: ['Momentum', h.fmt(p, 4) + ' kg·m/s'],
      m: ['Kütle', h.fmt(m, 4) + ' kg'],
      v: ['Hız', h.fmt(hiz, 4) + ' m/s'],
    };
    const sira = v.bul === 'm' ? ['m', 'p', 'v'] : v.bul === 'v' ? ['v', 'p', 'm'] : ['p', 'm', 'v'];
    return {
      rows: [
        ...sira.map((k) => satirlar[k]),
        ['Hız (km/sa)', h.fmt(hiz * 3.6, 2) + ' km/sa'],
        ['Kinetik enerji', h.fmt(ek, 4) + ' J'],
      ],
      note: 'Momentum vektörel bir büyüklüktür; eksi işaret, seçtiğiniz pozitif yönün tersini gösterir. 1 kg·m/s = 1 N·s.',
    };
  }
