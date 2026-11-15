// Daire Alanı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.pos(v.deger, 'Ölçü');
    let r;
    if (v.tur === 'd') r = x / 2;
    else if (v.tur === 'c') r = x / (2 * Math.PI);
    else r = x;
    const alan = Math.PI * r * r;
    return {
      rows: [
        ['Alan', h.fmt(alan, 4) + ' birim²'],
        ['Yarıçap', h.fmt(r, 4) + ' birim'],
        ['Çap', h.fmt(2 * r, 4) + ' birim'],
        ['Çevre', h.fmt(2 * Math.PI * r, 4) + ' birim'],
      ],
      note: 'A = π·r², π ≈ 3,14159265. Sonuç, ölçüyü yazdığınız birimin karesidir (cm için cm², m için m²).',
    };
  }
