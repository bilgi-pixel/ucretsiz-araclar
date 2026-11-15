// Farad Mikrofarad Nanofarad Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    // Taban birim pikofarad: çarpanlar tam sayı kalır.
    const birimler = {
      f: [1e12, 'F', 'Farad'],
      mf: [1e9, 'mF', 'Milifarad'],
      uf: [1e6, 'µF', 'Mikrofarad'],
      nf: [1e3, 'nF', 'Nanofarad'],
      pf: [1, 'pF', 'Pikofarad'],
    };
    const x = h.nonneg(v.deger, 'Kapasite değeri');
    const k = birimler[v.kaynak] || birimler.nf;
    const t = birimler[v.hedef] || birimler.uf;
    const pf = Number((x * k[0]).toPrecision(12));
    const yaz = (b) => h.sig(pf / b[0], 9) + ' ' + b[1];
    // Üç haneli kod: iki anlamlı basamak + sıfır sayısı (pF cinsinden).
    let kod = 'Yok (değer iki anlamlı basamakla yazılamıyor)';
    if (pf >= 10) {
      let e = Math.floor(Math.log10(pf) + 1e-9) - 1;
      let m = pf / Math.pow(10, e);
      let mr = Math.round(m);
      if (mr === 100) { mr = 10; e += 1; }
      if (Math.abs(m - mr) < 1e-6 && e <= 9) kod = String(mr) + String(e);
    } else if (pf > 0) {
      kod = 'Yok (10 pF altı doğrudan yazılır)';
    }
    return {
      rows: [
        ['Sonuç', yaz(t)],
        ['Farad', yaz(birimler.f)],
        ['Milifarad', yaz(birimler.mf)],
        ['Mikrofarad', yaz(birimler.uf)],
        ['Nanofarad', yaz(birimler.nf)],
        ['Pikofarad', yaz(birimler.pf)],
        ['Üç haneli kod', kod],
      ],
      note: '1 µF = 1.000 nF = 1.000.000 pF. Üç haneli kodda ilk iki rakam değeri, üçüncü rakam eklenecek sıfır sayısını pF cinsinden gösterir.',
    };
  }
