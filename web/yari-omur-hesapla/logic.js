// Yarı Ömür Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const bul = ['kalan', 'sure', 'yari', 'baslangic'].includes(v.bul) ? v.bul : 'kalan';
    let N0, N, T, t;
    if (bul !== 'baslangic') N0 = h.pos(v.baslangic, 'Başlangıç miktarı');
    if (bul !== 'kalan') N = h.pos(v.kalan, 'Kalan miktar');
    if (bul !== 'yari') T = h.pos(v.yariOmur, 'Yarı ömür');
    if (bul !== 'sure') t = bul === 'yari' ? h.pos(v.sure, 'Geçen süre') : h.nonneg(v.sure, 'Geçen süre');
    if ((bul === 'sure' || bul === 'yari') && N > N0) h.err('Kalan miktar başlangıç miktarından büyük olamaz; iki değeri kontrol edin.');
    if (bul === 'kalan') N = N0 * Math.pow(0.5, t / T);
    else if (bul === 'baslangic') N0 = N * Math.pow(2, t / T);
    else if (bul === 'sure') t = T * Math.log(N0 / N) / Math.LN2;
    else {
      if (N === N0) h.err('Kalan miktar başlangıç miktarına eşitse bozunma olmamıştır; yarı ömür bu verilerden bulunamaz.');
      T = t * Math.LN2 / Math.log(N0 / N);
    }
    if (![N0, N, T, t].every(Number.isFinite)) h.err('Sonuç hesaplanamayacak kadar büyük; değerleri kontrol edin.');
    const satir = {
      kalan: ['Kalan miktar', h.sig(N, 6)],
      sure: ['Geçen süre', h.sig(t, 6)],
      yari: ['Yarı ömür', h.sig(T, 6)],
      baslangic: ['Başlangıç miktarı', h.sig(N0, 6)],
    };
    const rows = [satir[bul]];
    for (const k of ['baslangic', 'kalan', 'yari', 'sure']) if (k !== bul) rows.push(satir[k]);
    rows.push(['Kalan oran', '%' + h.sig(N / N0 * 100, 6)]);
    rows.push(['Bozunan miktar', h.sig(N0 - N, 6)]);
    rows.push(['Geçen yarı ömür sayısı', h.sig(t / T, 6)]);
    rows.push(['Bozunma sabiti (λ)', h.sig(Math.LN2 / T, 6) + ' (1/zaman birimi)']);
    rows.push(['Ortalama ömür (τ)', h.sig(T / Math.LN2, 6)]);
    return { rows, note: 'Miktarlar girdiğiniz birimde, süreler girdiğiniz zaman birimindedir. Yarı ömür ile geçen süre aynı birimde yazılmalıdır.' };
  }
