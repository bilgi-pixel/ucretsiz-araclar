// Ses Şiddeti Düzeyi (Desibel) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const I0 = 1e-12;
    const bil = (x) => {
      if (x === 0) return '0';
      const [m, e] = x.toExponential(4).split('e');
      if (Number(e) >= -3 && Number(e) <= 5) return h.sig(x, 5);
      return `${String(Number(m)).replace('.', ',')} × 10^${Number(e)}`;
    };
    const benzet = (L) => {
      if (L < 0) return 'İşitme eşiğinin altında';
      if (L < 20) return 'İşitme eşiğine yakın, çok sessiz';
      if (L < 40) return 'Fısıltı, sessiz oda';
      if (L < 60) return 'Sakin ofis, alçak sesle konuşma';
      if (L < 80) return 'Normal konuşma, kalabalık ortam';
      if (L < 100) return 'Yoğun trafik, gürültülü atölye';
      if (L < 120) return 'Çok yüksek; uzun süre rahatsız edici';
      return 'Acı eşiği ve üzeri';
    };
    if (v.mod === 'topla') {
      const d = h.nums(v.liste, 'Kaynakların düzeyleri');
      if (d.length < 2) h.err('Toplam düzey için en az iki kaynağın desibel değerini boşlukla ayırarak yazın.');
      if (d.length > 50) h.err('En fazla 50 kaynak girebilirsiniz.');
      for (const x of d) if (x < -50 || x > 250) h.err('Desibel değerleri -50 ile 250 arasında olmalı.');
      const I = d.reduce((a, x) => a + I0 * Math.pow(10, x / 10), 0);
      const L = 10 * Math.log10(I / I0);
      const enBuyuk = Math.max(...d);
      return {
        rows: [
          ['Toplam ses düzeyi', h.fmt(L, 2) + ' dB'],
          ['Toplam ses şiddeti', bil(I) + ' W/m²'],
          ['Kaynak sayısı', String(d.length)],
          ['En gürültülü kaynağa göre artış', h.fmt(L - enBuyuk, 2) + ' dB'],
          ['Yaklaşık karşılık', benzet(L)],
        ],
        note: 'Kaynakların birbirinden bağımsız (uyumsuz) olduğu ve düzeylerin aynı noktada ölçüldüğü varsayılır. Desibeller doğrudan toplanmaz; şiddetler toplanır.',
      };
    }
    if (v.mod === 'siddet') {
      const L = h.num(v.deger, 'Ses düzeyi');
      if (L < -50 || L > 250) h.err('Ses düzeyi -50 ile 250 dB arasında olmalı.');
      const I = I0 * Math.pow(10, L / 10);
      return {
        rows: [
          ['Ses şiddeti', bil(I) + ' W/m²'],
          ['Ses düzeyi', h.fmt(L, 2) + ' dB'],
          ['İşitme eşiğinin katı (I/I₀)', bil(I / I0)],
          ['Yaklaşık karşılık', benzet(L)],
        ],
        note: 'Referans şiddet I₀ = 10^-12 W/m² (1000 Hz için işitme eşiği) alınmıştır.',
      };
    }
    const I = h.pos(v.deger, 'Ses şiddeti');
    const L = 10 * Math.log10(I / I0);
    return {
      rows: [
        ['Ses düzeyi', h.fmt(L, 2) + ' dB'],
        ['Ses şiddeti', bil(I) + ' W/m²'],
        ['İşitme eşiğinin katı (I/I₀)', bil(I / I0)],
        ['Yaklaşık karşılık', benzet(L)],
      ],
      note: 'Referans şiddet I₀ = 10^-12 W/m² (1000 Hz için işitme eşiği) alınmıştır.',
    };
  }
