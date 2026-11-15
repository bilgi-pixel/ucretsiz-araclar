// Sarkaç Periyodu Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let L, T, g;
    if (v.bul === 'uzunluk') {
      T = h.pos(v.periyot, 'Periyot'); g = h.pos(v.g, 'Yerçekimi ivmesi');
      L = g * T * T / (4 * Math.PI * Math.PI);
    } else if (v.bul === 'g') {
      L = h.pos(v.uzunluk, 'İp uzunluğu'); T = h.pos(v.periyot, 'Periyot');
      g = 4 * Math.PI * Math.PI * L / (T * T);
    } else {
      L = h.pos(v.uzunluk, 'İp uzunluğu'); g = h.pos(v.g, 'Yerçekimi ivmesi');
      T = 2 * Math.PI * Math.sqrt(L / g);
    }
    const pS = ['Periyot', h.fmt(T, 4) + ' s'];
    const lS = ['İp uzunluğu', h.fmt(L, 4) + ' m'];
    const gS = ['Yerçekimi ivmesi', h.fmt(g, 4) + ' m/s²'];
    const ilk = v.bul === 'uzunluk' ? [lS, pS, gS] : v.bul === 'g' ? [gS, pS, lS] : [pS, lS, gS];
    return {
      rows: [
        ...ilk,
        ['Frekans', h.fmt(1 / T, 4) + ' Hz'],
        ['Açısal frekans', h.fmt(2 * Math.PI / T, 4) + ' rad/s'],
        ['Dakikadaki salınım sayısı', h.fmt(60 / T, 2)],
      ],
      note: 'Küçük açılı salınım (yaklaşık 15° altı), ağırlıksız ip ve sürtünmesiz ortam varsayılır. Periyot kütleye bağlı değildir.',
    };
  }
