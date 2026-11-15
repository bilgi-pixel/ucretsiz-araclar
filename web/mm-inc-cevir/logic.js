// Milimetre İnç Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const mm = v.yon === 'inc' ? x * 25.4 : x;
    const inc = v.yon === 'inc' ? x : x / 25.4;
    // En yakın 1/16 inç: tam kısım + sadeleştirilmiş kesir
    const on6 = Math.round(inc * 16);
    const tam = Math.floor(on6 / 16);
    let pay = on6 - tam * 16;
    let payda = 16;
    while (pay > 0 && pay % 2 === 0) { pay /= 2; payda /= 2; }
    let kesir;
    if (pay === 0) kesir = `${h.fmt(tam, 0)} inç`;
    else if (tam === 0) kesir = `${pay}/${payda} inç`;
    else kesir = `${h.fmt(tam, 0)} ${pay}/${payda} inç`;
    const sapma = (on6 / 16) * 25.4 - mm;
    const sapmaMetni = Math.abs(sapma) < 0.0005 ? 'yok (tam karşılık)' : `${sapma > 0 ? '+' : '−'}${h.fmt(Math.abs(sapma), 3)} mm`;
    return {
      rows: [
        v.yon === 'inc' ? ['Milimetre', h.fmt(mm, 4) + ' mm'] : ['İnç', h.fmt(inc, 4) + ' inç'],
        v.yon === 'inc' ? ['İnç', h.fmt(inc, 4) + ' inç'] : ['Milimetre', h.fmt(mm, 4) + ' mm'],
        ['En yakın kesirli inç (1/16)', kesir],
        ['Kesrin sapması', sapmaMetni],
        ['Santimetre', h.fmt(mm / 10, 4) + ' cm'],
        ['Binde inç (thou)', h.fmt(inc * 1000, 2) + ' thou'],
      ],
      note: '1 inç = 25,4 mm (tam tanım). Kesirli karşılık en yakın 1/16 inçe yuvarlanır; sapma, kesrin gerçek ölçüden farkıdır.',
    };
  }
