// LED Ampul Tasarrufu Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const eski = h.pos(v.eski, 'Eski ampulün gücü');
    const led = h.pos(v.led, 'LED ampulün gücü');
    if (led >= eski) h.err('LED ampulün gücü eski ampulden küçük olmalı; aksi halde tasarruf oluşmaz.');
    const adet = String(v.adet ?? '').trim() === '' ? 1 : h.posint(v.adet, 'Ampul adedi');
    const saat = h.pos(v.saat, 'Günlük yanma süresi');
    if (saat > 24) h.err('"Günlük yanma süresi" en fazla 24 saat olabilir.');
    const fiyat = h.nonneg(v.fiyat, 'Birim fiyat');
    const yilSaat = saat * 365;
    const eskiKwh = eski * adet * yilSaat / 1000;
    const ledKwh = led * adet * yilSaat / 1000;
    const kwh = eskiKwh - ledKwh;
    const tl = kwh * fiyat;
    const rows = [
      ['Yıllık tasarruf', h.para(tl)],
      ['Yıllık enerji tasarrufu', h.fmt(kwh, 2) + ' kWh'],
      ['Eski ampullerin yıllık tüketimi', h.fmt(eskiKwh, 2) + ' kWh'],
      ['LED ampullerin yıllık tüketimi', h.fmt(ledKwh, 2) + ' kWh'],
      ['Tasarruf oranı', '%' + h.fmt((1 - led / eski) * 100, 2)],
      ['Aylık tasarruf', h.para(tl / 12)],
    ];
    if (String(v.ledFiyat ?? '').trim() !== '') {
      const lf = h.nonneg(v.ledFiyat, 'Bir LED ampulün fiyatı');
      rows.push(['LED yatırımı', h.para(lf * adet)]);
      rows.push(['Geri ödeme süresi', tl > 0 ? h.fmt(lf * adet / (tl / 12), 1) + ' ay' : 'Hesaplanamadı (birim fiyat 0)']);
    }
    return { rows, note: 'Yıl 365 gün alınmıştır. Hesap yalnızca elektrik tüketimi farkını gösterir; LED\'in daha uzun ömrü sayesinde azalan ampul değiştirme masrafı dâhil değildir.' };
  }
