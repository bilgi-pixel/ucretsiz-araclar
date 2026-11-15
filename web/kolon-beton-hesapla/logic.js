// Kolon Betonu Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const en = h.pos(v.en, 'Kesit eni ya da çap');
    const yuk = h.pos(v.yukseklik, 'Kolon yüksekliği');
    const adet = h.posint(v.adet, 'Kolon adedi');
    const fire = h.nonneg(v.fire, 'Fire payı');
    if (en > 1000) h.err('Kesit ölçüsü santimetre olarak yazılmalı (örn. 30).');
    if (yuk > 100) h.err('Kolon yüksekliği metre olarak yazılmalı (örn. 3).');
    let kesit;
    let tanim;
    if (v.sekil === 'daire') {
      kesit = Math.PI * (en / 200) * (en / 200);
      tanim = `Ø${h.fmt(en, 1)} cm dairesel`;
    } else {
      const der = h.pos(v.derinlik, 'Kesit boyu');
      if (der > 1000) h.err('Kesit ölçüsü santimetre olarak yazılmalı (örn. 60).');
      kesit = (en / 100) * (der / 100);
      tanim = `${h.fmt(en, 1)} × ${h.fmt(der, 1)} cm`;
    }
    const tek = kesit * yuk;
    const net = tek * adet;
    const toplam = net * (1 + fire / 100);
    return {
      rows: [
        ['Gerekli beton', h.fmt(toplam, 3) + ' m³'],
        ['Fire hariç toplam', h.fmt(net, 3) + ' m³'],
        ['Tek kolon hacmi', h.fmt(tek, 3) + ' m³'],
        ['Kesit', `${tanim} (${h.fmt(kesit, 4)} m²)`],
        ['Yaklaşık beton ağırlığı', h.fmt(toplam * 2.4, 2) + ' ton'],
      ],
      note: 'Ağırlık, taze betonun birim hacim ağırlığı 2.400 kg/m³ alınarak hesaplanmıştır. Donatının kapladığı hacim düşülmez.',
    };
  }
