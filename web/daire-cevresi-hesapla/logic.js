// Daire Çevresi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.pos(v.deger, 'Ölçü');
    let r;
    if (v.tur === 'd') r = x / 2;
    else if (v.tur === 'a') r = Math.sqrt(x / Math.PI);
    else r = x;
    const cevre = 2 * Math.PI * r;
    const rows = [
      ['Çevre', h.fmt(cevre, 4) + ' birim'],
      ['Yarıçap', h.fmt(r, 4) + ' birim'],
      ['Çap', h.fmt(2 * r, 4) + ' birim'],
      ['Alan', h.fmt(Math.PI * r * r, 4) + ' birim²'],
    ];
    if (String(v.devir ?? '').trim() !== '') {
      const n = h.pos(v.devir, 'Tur sayısı');
      rows.push(['Bu tur sayısında alınan yol', h.fmt(cevre * n, 4) + ' birim']);
    }
    return { rows, note: 'Ç = 2·π·r = π·d. Çevre, ölçüyü yazdığınız uzunluk birimiyle aynı birimdedir.' };
  }
