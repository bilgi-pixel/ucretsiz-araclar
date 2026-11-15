// Yatay Silindirik Tank Doluluk Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const d = h.pos(v.cap, 'Tank iç çapı');
    const L = h.pos(v.uzunluk, 'Tank iç uzunluğu');
    const s = h.nonneg(v.seviye, 'Sıvı yüksekliği');
    if (s > d + 1e-9) h.err('Sıvı yüksekliği tank çapından büyük olamaz; ölçüleri santimetre olarak kontrol edin.');
    const r = d / 2;
    const y = Math.min(s, d);
    const oran = Math.max(-1, Math.min(1, (r - y) / r));
    const kesit = r * r * Math.acos(oran) - (r - y) * Math.sqrt(Math.max(0, 2 * r * y - y * y));
    const tam = Math.PI * r * r;
    const litre = kesit * L / 1000;
    const toplam = tam * L / 1000;
    return {
      rows: [
        ['Mevcut sıvı hacmi', h.fmt(litre, 2) + ' litre'],
        ['Doluluk oranı', '%' + h.fmt(kesit / tam * 100, 2)],
        ['Toplam kapasite', h.fmt(toplam, 2) + ' litre'],
        ['Boş hacim', h.fmt(toplam - litre, 2) + ' litre'],
        ['Mevcut sıvı (metreküp)', h.fmt(litre / 1000, 4) + ' m³'],
      ],
      note: 'Hesap düz kapaklı, tam yatay duran silindirik tank içindir. Bombeli kapaklarda ve eğimli duran tanklarda gerçek hacim bir miktar farklı olur.',
    };
  }
