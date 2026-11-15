// Kamera Lens Görüş Açısı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const S = { ff: [36, 24], apsc: [23.5, 15.6], apscc: [22.3, 14.9], mft: [17.3, 13], bir: [13.2, 8.8] };
    const f = h.pos(v.odak, 'Odak uzaklığı');
    let w, y;
    if (v.sensor === 'ozel') {
      w = h.pos(v.sensorEn, 'Özel sensör eni');
      y = h.pos(v.sensorBoy, 'Özel sensör boyu');
    } else {
      [w, y] = S[v.sensor] || S.ff;
    }
    const kosegen = Math.sqrt(w * w + y * y);
    const aci = (d) => 2 * Math.atan(d / (2 * f)) * 180 / Math.PI;
    const crop = Math.sqrt(36 * 36 + 24 * 24) / kosegen;
    const rows = [
      ['Yatay görüş açısı', h.fmt(aci(w), 2) + '°'],
      ['Dikey görüş açısı', h.fmt(aci(y), 2) + '°'],
      ['Köşegen görüş açısı', h.fmt(aci(kosegen), 2) + '°'],
      ['Sensör', h.fmt(w, 2) + ' × ' + h.fmt(y, 2) + ' mm (köşegen ' + h.fmt(kosegen, 2) + ' mm)'],
      ['Crop faktörü', h.fmt(crop, 2)],
      ['Tam kare eşdeğeri odak', h.fmt(f * crop, 1) + ' mm'],
    ];
    if (String(v.mesafe ?? '').trim() !== '') {
      const m = h.pos(v.mesafe, 'Çekim mesafesi');
      rows.push(['Kadraj genişliği', h.fmt(m * w / f, 2) + ' m']);
      rows.push(['Kadraj yüksekliği', h.fmt(m * y / f, 2) + ' m']);
    }
    return {
      rows,
      note: 'Açı = 2 × arctan(sensör ölçüsü ÷ (2 × odak uzaklığı)). Sonsuza odaklanmış, bozulmasız (rektilineer) lens varsayılır; balık gözü lenslerde geçerli değildir.',
    };
  }
