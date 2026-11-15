// Alan Derinliği (DOF) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const f = h.pos(v.odak, 'Odak uzaklığı');
    const N = h.pos(v.diyafram, 'Diyafram');
    const sm = h.pos(v.mesafe, 'Konu mesafesi');
    const c = Number(v.coc) > 0 ? Number(v.coc) : 0.03;
    const s = sm * 1000;
    if (s <= f) h.err('Konu mesafesi odak uzaklığından büyük olmalı. Mesafeyi metre, odak uzaklığını milimetre olarak yazdığınızdan emin olun.');
    const H = f * f / (N * c) + f;
    const yakin = s * (H - f) / (H + s - 2 * f);
    const sonsuz = s >= H - 1e-9;
    const uzak = sonsuz ? Infinity : s * (H - f) / (H - s);
    const uz = (mm) => (mm >= 1000 ? h.fmt(mm / 1000, 2) + ' m' : h.fmt(mm / 10, 1) + ' cm');
    return {
      rows: [
        ['Toplam alan derinliği', sonsuz ? 'Sonsuz' : uz(uzak - yakin)],
        ['Yakın netlik sınırı', uz(yakin)],
        ['Uzak netlik sınırı', sonsuz ? 'Sonsuz' : uz(uzak)],
        ['Konunun önündeki net alan', uz(s - yakin)],
        ['Konunun arkasındaki net alan', sonsuz ? 'Sonsuz' : uz(uzak - s)],
        ['Hiperfokal mesafe', uz(H)],
        ['Bulanıklık dairesi', h.fmt(c, 3) + ' mm'],
      ],
      note: 'H = f² ÷ (N × c) + f. Mesafeler sensör düzleminden ölçülür. Netlik sınırı keskin bir çizgi değil, kabul edilebilir bulanıklığa göre tanımlanan bir eşiktir.',
    };
  }
