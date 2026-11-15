// Kalori Kilokalori Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    // Taban birim joule; termokimyasal kalori: 1 cal = 4,184 J (tam tanım).
    const birimler = {
      cal: [4.184, 'cal'],
      kcal: [4184, 'kcal'],
      j: [1, 'J'],
      kj: [1000, 'kJ'],
    };
    const x = h.nonneg(v.deger, 'Enerji değeri');
    const k = birimler[v.kaynak] || birimler.kcal;
    const t = birimler[v.hedef] || birimler.cal;
    const joule = Number((x * k[0]).toPrecision(12));
    const yaz = (b) => h.sig(joule / b[0], 9) + ' ' + b[1];
    return {
      rows: [
        ['Sonuç', yaz(t)],
        ['Kalori', yaz(birimler.cal)],
        ['Kilokalori', yaz(birimler.kcal)],
        ['Joule', yaz(birimler.j)],
        ['Kilojoule', yaz(birimler.kj)],
        ['Watt-saat', h.sig(joule / 3600, 6) + ' Wh'],
      ],
      note: '1 kcal = 1.000 cal = 4,184 kJ (termokimyasal kalori). Besin etiketlerinde "kalori" diye anılan değer kilokaloridir.',
    };
  }
