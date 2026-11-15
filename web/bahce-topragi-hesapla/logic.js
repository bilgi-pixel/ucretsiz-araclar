// Bahçe Toprağı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const en = h.pos(v.en, 'Alanın eni');
    const boy = h.pos(v.boy, 'Alanın boyu');
    const d = h.pos(v.derinlik, 'Toprak derinliği');
    const torba = h.pos(v.torba, 'Torba hacmi');
    const yog = h.pos(v.yogunluk, 'Toprak yoğunluğu');
    const alan = en * boy;
    const hacim = alan * d / 100;
    const litre = hacim * 1000;
    const adet = Math.ceil(litre / torba - 1e-9);
    return {
      rows: [
        ['Gereken toprak hacmi', h.fmt(hacim, 3) + ' m³'],
        ['Litre karşılığı', h.fmt(litre, 0) + ' L'],
        ['Torba sayısı', h.fmt(adet, 0) + ' torba (' + h.fmt(torba, 1) + ' L\'lik)'],
        ['Yaklaşık ağırlık', h.fmt(hacim * yog, 2) + ' ton'],
        ['Alan', h.fmt(alan, 2) + ' m²'],
      ],
      note: 'Torba sayısı yukarı yuvarlanır. Toprak serildikten sonra oturacağı için %10–15 fazla almak yaygın bir uygulamadır; bu pay sonuca eklenmemiştir.',
    };
  }
