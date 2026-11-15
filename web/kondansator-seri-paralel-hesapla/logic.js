// Kondansatör Seri Paralel Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const carpanlar = { pF: 1e-12, nF: 1e-9, uF: 1e-6, mF: 1e-3, F: 1 };
    const adlar = { pF: 'pF', nF: 'nF', uF: 'µF', mF: 'mF', F: 'F' };
    const birim = carpanlar[v.birim] ? v.birim : 'uF';
    const liste = h.nums(v.degerler, 'Kapasite değerleri');
    if (liste.some((x) => !(x > 0))) h.err('Kapasite değerleri sıfırdan büyük olmalı.');
    if (liste.length < 2) h.err('Hesap için en az iki kapasite değeri yazın.');
    if (liste.length > 50) h.err('En fazla 50 değer yazabilirsiniz.');
    const paralel = liste.reduce((a, b) => a + b, 0);
    const seri = 1 / liste.reduce((a, c) => a + 1 / c, 0);
    const uygun = (x) => {
      const f = x * carpanlar[birim];
      if (f < 0.9999999e-9) return h.sig(f / 1e-12, 6) + ' pF';
      if (f < 0.9999999e-6) return h.sig(f / 1e-9, 6) + ' nF';
      if (f < 0.9999999e-3) return h.sig(f / 1e-6, 6) + ' µF';
      if (f < 0.9999999) return h.sig(f / 1e-3, 6) + ' mF';
      return h.sig(f, 6) + ' F';
    };
    const seriMi = v.baglanti === 'seri';
    const sonuc = seriMi ? seri : paralel;
    return {
      rows: [
        ['Eşdeğer kapasite', h.fmt(sonuc, 4) + ' ' + adlar[birim]],
        ['Uygun birimle', uygun(sonuc)],
        ['Bağlantı türü', seriMi ? 'Seri' : 'Paralel'],
        ['Kondansatör sayısı', String(liste.length)],
        seriMi ? ['Paralel bağlansaydı', uygun(paralel)] : ['Seri bağlansaydı', uygun(seri)],
      ],
      note: seriMi
        ? 'Seri bağlantıda eşdeğer kapasite en küçük kondansatörden küçüktür; toplam gerilim dayanımı artar ancak gerilim eşit paylaşılmayabilir.'
        : 'Paralel bağlantıda kapasiteler toplanır; grubun gerilim dayanımı en düşük anma gerilimli kondansatör kadardır.',
    };
  }
