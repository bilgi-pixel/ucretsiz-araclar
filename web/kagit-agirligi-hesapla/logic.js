// Kâğıt Ağırlığı (Gramaj) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const en = h.pos(v.en, 'En');
    const boy = h.pos(v.boy, 'Boy');
    const g = h.pos(v.gramaj, 'Gramaj');
    const adet = h.posint(v.adet, 'Yaprak sayısı');
    const alan = en * boy / 1e6;
    const tek = alan * g;
    const toplam = tek * adet;
    return {
      rows: [
        ['Toplam ağırlık', h.fmt(toplam / 1000, 3) + ' kg'],
        ['Toplam ağırlık (gram)', h.fmt(toplam, 1) + ' g'],
        ['Tek yaprak ağırlığı', h.fmt(tek, 3) + ' g'],
        ['Tek yaprak alanı', h.fmt(alan, 5) + ' m²'],
        ['Toplam alan', h.fmt(alan * adet, 3) + ' m²'],
      ],
      note: 'Ağırlık = en × boy × gramaj. Ambalaj, nem ve üretim toleransı hesaba katılmamıştır; gerçek paket birkaç yüzde farklı gelebilir.',
    };
  }
