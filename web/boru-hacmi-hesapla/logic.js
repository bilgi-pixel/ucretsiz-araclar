// Boru İçi Su Hacmi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const cap = h.pos(v.cap, 'Boru çapı');
    const et = h.opt(v.et, 0, 'Et kalınlığı');
    if (et < 0) h.err('"Et kalınlığı" negatif olamaz.');
    const ic = cap - 2 * et;
    if (!(ic > 0)) h.err('Et kalınlığının iki katı dış çaptan küçük olmalı; değerleri milimetre olarak kontrol edin.');
    const L = h.pos(v.uzunluk, 'Boru uzunluğu');
    const kesitMm2 = Math.PI * ic * ic / 4;
    const litreMetre = kesitMm2 / 1000;
    const litre = litreMetre * L;
    return {
      rows: [
        ['Su hacmi', h.fmt(litre, 3) + ' litre'],
        ['Metreküp karşılığı', h.fmt(litre / 1000, 6) + ' m³'],
        ['Metre başına hacim', h.fmt(litreMetre, 4) + ' litre/m'],
        ['Suyun ağırlığı (yaklaşık)', h.fmt(litre, 3) + ' kg'],
        ['İç çap', h.fmt(ic, 2) + ' mm'],
        ['İç kesit alanı', h.fmt(kesitMm2 / 100, 4) + ' cm²'],
      ],
      note: 'Suyun yoğunluğu 1 kg/litre kabul edilmiştir. Dirsek, vana ve kolektör gibi parçaların hacmi hesaba dahil değildir.',
    };
  }
