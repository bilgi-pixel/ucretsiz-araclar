// Kondansatör Enerjisi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const carpanlar = { pF: 1e-12, nF: 1e-9, uF: 1e-6, mF: 1e-3, F: 1 };
    const c = h.pos(v.kapasite, 'Kapasite') * (carpanlar[v.birim] || 1e-6);
    const u = h.pos(v.gerilim, 'Gerilim');
    const enerji = 0.5 * c * u * u;
    const yuk = c * u;
    const olcekle = (x, birim) => {
      if (x < 0.9999999e-6) return h.sig(x * 1e9, 6) + ' n' + birim;
      if (x < 0.9999999e-3) return h.sig(x * 1e6, 6) + ' µ' + birim;
      if (x < 0.9999999) return h.sig(x * 1e3, 6) + ' m' + birim;
      if (x < 999.99995) return h.sig(x, 6) + ' ' + birim;
      return h.sig(x / 1000, 6) + ' k' + birim;
    };
    return {
      rows: [
        ['Depolanan enerji', olcekle(enerji, 'J')],
        ['Enerji (joule)', h.sig(enerji, 6) + ' J'],
        ['Depolanan yük', olcekle(yuk, 'C')],
        ['Watt-saat karşılığı', h.sig(enerji / 3600, 6) + ' Wh'],
        ['Gerilim yarıya inince kalan enerji', olcekle(enerji / 4, 'J')],
      ],
      note: 'İdeal kondansatör varsayılmıştır. Enerji gerilimin karesiyle değişir; gerilim yarıya indiğinde enerjinin dörtte üçü harcanmış olur.',
    };
  }
