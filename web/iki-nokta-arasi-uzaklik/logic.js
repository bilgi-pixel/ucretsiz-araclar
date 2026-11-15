// İki Nokta Arası Uzaklık Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x1 = h.num(v.x1, 'x₁'), y1 = h.num(v.y1, 'y₁');
    const x2 = h.num(v.x2, 'x₂'), y2 = h.num(v.y2, 'y₂');
    const z1Bos = String(v.z1 ?? '').trim() === '', z2Bos = String(v.z2 ?? '').trim() === '';
    if (z1Bos !== z2Bos) h.err('Üç boyutlu hesap için z₁ ve z₂ alanlarının ikisini de doldurun; düzlemde hesap için ikisini de boş bırakın.');
    const ucBoyut = !z1Bos;
    const dx = x2 - x1, dy = y2 - y1;
    const dz = ucBoyut ? h.num(v.z2, 'z₂') - h.num(v.z1, 'z₁') : 0;
    const uzaklik = Math.hypot(dx, dy, dz);
    const s = (x) => h.fmt(x, 6);
    const rows = [
      ['Uzaklık', s(uzaklik) + ' birim'],
      ['Uzaklığın karesi', s(dx * dx + dy * dy + dz * dz)],
      ['Δx', s(dx)],
      ['Δy', s(dy)],
    ];
    if (ucBoyut) rows.push(['Δz', s(dz)]);
    rows.push(['Eksenler boyunca toplam yol', s(Math.abs(dx) + Math.abs(dy) + Math.abs(dz)) + ' birim']);
    return {
      rows,
      note: ucBoyut
        ? 'd = √(Δx² + Δy² + Δz²). Üç eksenin de aynı birimde olduğu varsayılır.'
        : 'd = √(Δx² + Δy²). İki eksenin de aynı birimde olduğu varsayılır.',
    };
  }
