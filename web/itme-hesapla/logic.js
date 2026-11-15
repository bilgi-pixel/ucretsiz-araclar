// İtme (İmpuls) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const bos = (s) => String(s ?? '').trim() === '';
    let I, rows;
    if (v.yontem === 'mv') {
      const m = h.pos(v.kutle, 'Kütle');
      const v1 = h.num(v.ilkHiz, 'İlk hız');
      const v2 = h.num(v.sonHiz, 'Son hız');
      I = m * (v2 - v1);
      rows = [
        ['İtme', h.fmt(I, 4) + ' N·s'],
        ['Momentum değişimi', h.fmt(I, 4) + ' kg·m/s'],
        ['İlk momentum', h.fmt(m * v1, 4) + ' kg·m/s'],
        ['Son momentum', h.fmt(m * v2, 4) + ' kg·m/s'],
        ['Hız değişimi', h.fmt(v2 - v1, 4) + ' m/s'],
      ];
      if (!bos(v.sure)) {
        const t = h.pos(v.sure, 'Etki süresi');
        rows.push(['Ortalama kuvvet', h.fmt(I / t, 4) + ' N']);
      }
    } else {
      const F = h.num(v.kuvvet, 'Kuvvet');
      const t = h.pos(v.sure, 'Etki süresi');
      I = F * t;
      rows = [
        ['İtme', h.fmt(I, 4) + ' N·s'],
        ['Momentum değişimi', h.fmt(I, 4) + ' kg·m/s'],
      ];
      if (!bos(v.kutle)) {
        const m = h.pos(v.kutle, 'Kütle');
        rows.push(['Hız değişimi', h.fmt(I / m, 4) + ' m/s']);
      }
    }
    return { rows, note: 'İtme vektörel bir büyüklüktür; eksi işaret, itmenin pozitif kabul ettiğiniz yöne zıt olduğunu gösterir. 1 N·s = 1 kg·m/s.' };
  }
