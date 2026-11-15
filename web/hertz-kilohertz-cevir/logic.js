// Hertz Kilohertz Megahertz Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const birimler = {
      hz: [1, 'Hz'],
      khz: [1e3, 'kHz'],
      mhz: [1e6, 'MHz'],
      ghz: [1e9, 'GHz'],
      thz: [1e12, 'THz'],
    };
    const x = h.pos(v.deger, 'Frekans değeri');
    const k = birimler[v.kaynak] || birimler.hz;
    const t = birimler[v.hedef] || birimler.khz;
    const hz = Number((x * k[0]).toPrecision(12));
    const yaz = (b) => h.sig(hz / b[0], 9) + ' ' + b[1];
    // Büyüklüğe en uygun alt birimi seçer (değer 1'in altına düşmeyen en büyük birim).
    const uygun = (deger, liste) => {
      for (const [olcek, ad] of liste) {
        if (deger / olcek >= 1 - 1e-9) return h.sig(deger / olcek, 6) + ' ' + ad;
      }
      const son = liste[liste.length - 1];
      return h.sig(deger / son[0], 6) + ' ' + son[1];
    };
    const periyot = 1 / hz;
    const dalga = 299792458 / hz;
    return {
      rows: [
        ['Sonuç', yaz(t)],
        ['Hertz', yaz(birimler.hz)],
        ['Kilohertz', yaz(birimler.khz)],
        ['Megahertz', yaz(birimler.mhz)],
        ['Gigahertz', yaz(birimler.ghz)],
        ['Terahertz', yaz(birimler.thz)],
        ['Periyot', uygun(periyot, [[1, 's'], [1e-3, 'ms'], [1e-6, 'µs'], [1e-9, 'ns'], [1e-12, 'ps'], [1e-15, 'fs']])],
        ['Dalga boyu (boşlukta)', uygun(dalga, [[1e3, 'km'], [1, 'm'], [1e-2, 'cm'], [1e-3, 'mm'], [1e-6, 'µm'], [1e-9, 'nm']])],
      ],
      note: 'Periyot T = 1 ÷ f. Dalga boyu, ışık hızı (299.792.458 m/s) frekansa bölünerek bulunur ve yalnızca elektromanyetik dalgalar için geçerlidir; ses dalgaları için kullanılmaz.',
    };
  }
