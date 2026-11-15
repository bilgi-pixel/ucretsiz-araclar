// Derz Dolgu Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const alan = h.pos(v.alan, 'Kaplanacak alan');
    const a = h.pos(v.karoEn, 'Karo eni') * 10; // mm
    const b = h.pos(v.karoBoy, 'Karo boyu') * 10;
    const c = h.pos(v.derzGen, 'Derz genişliği');
    const d = h.pos(v.derzDer, 'Derz derinliği');
    const yog = h.pos(v.yogunluk, 'Dolgu yoğunluğu');
    const fire = h.nonneg(v.fire, 'Fire payı');
    const torba = h.pos(v.torba, 'Torba ağırlığı');
    if (c >= a || c >= b) h.err('Derz genişliği karo ölçüsünden küçük olmalı. Karo ölçülerini santimetre, derzi milimetre olarak yazdığınızı kontrol edin.');
    if (yog > 5) h.err('Dolgu yoğunluğu kg/dm³ olarak yazılmalı (örn. 1,6).');
    const birim = ((a + b) / (a * b)) * c * d * yog; // kg/m²
    const net = birim * alan;
    const toplam = net * (1 + fire / 100);
    const adet = Math.ceil(toplam / torba - 1e-9);
    return {
      rows: [
        ['Gerekli derz dolgu', h.fmt(toplam, 2) + ' kg'],
        ['Torba sayısı', `${h.fmt(adet, 0)} adet (${h.fmt(torba, 1)} kg)`],
        ['m² başına tüketim', h.fmt(birim, 3) + ' kg/m²'],
        ['Fire hariç miktar', h.fmt(net, 2) + ' kg'],
      ],
      note: 'Tüketim, derz kanalının tamamen dolduğu varsayımıyla hesaplanır. Ürünün gerçek yoğunluğu için ambalajdaki teknik bilgiye bakın.',
    };
  }
