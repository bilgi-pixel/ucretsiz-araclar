// Kuvvet Hesaplama (F = m·a) — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let F, m, a;
    if (v.bul === 'kutle') {
      F = h.num(v.kuvvet, 'Kuvvet (N)');
      a = h.num(v.ivme, 'İvme (m/s²)');
      if (a === 0) h.err('İvme sıfırken kütle hesaplanamaz; sıfırdan farklı bir ivme yazın.');
      m = F / a;
      if (!(m > 0)) h.err('Kuvvet ile ivme aynı yönde (aynı işaretli) ve sıfırdan farklı olmalı; aksi hâlde kütle pozitif çıkmaz.');
    } else if (v.bul === 'ivme') {
      F = h.num(v.kuvvet, 'Kuvvet (N)');
      m = h.pos(v.kutle, 'Kütle (kg)');
      a = F / m;
    } else {
      m = h.pos(v.kutle, 'Kütle (kg)');
      a = h.num(v.ivme, 'İvme (m/s²)');
      F = m * a;
    }
    const satirF = ['Kuvvet', h.fmt(F, 4) + ' N'];
    const satirM = ['Kütle', h.fmt(m, 4) + ' kg'];
    const satirA = ['İvme', h.fmt(a, 4) + ' m/s²'];
    const sirali = v.bul === 'kutle' ? [satirM, satirF, satirA] : v.bul === 'ivme' ? [satirA, satirF, satirM] : [satirF, satirM, satirA];
    return {
      rows: [
        ...sirali,
        ['Kuvvet (kgf)', h.fmt(F / 9.80665, 4) + ' kgf'],
        ['İvme (g)', h.fmt(a / 9.80665, 4) + ' g'],
      ],
      note: 'F = m·a bağıntısındaki F, cisme etkiyen net (bileşke) kuvvettir. 1 kgf = 9,80665 N ve 1 g = 9,80665 m/s² alınmıştır.',
    };
  }
