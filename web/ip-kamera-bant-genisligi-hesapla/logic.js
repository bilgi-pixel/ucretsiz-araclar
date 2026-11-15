// IP Kamera Bant Genişliği Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const n = h.posint(v.kamera, 'Kamera sayısı');
    const pay = h.nonneg(v.pay, 'Yedek pay');
    const bilinen = h.opt(v.bilinen, 0, 'Bilinen bit hızı');
    if (bilinen < 0) h.err('Bilinen bit hızı negatif olamaz; boş bırakabilir ya da pozitif bir değer yazabilirsiniz.');
    let per, yontem;
    if (bilinen > 0) {
      per = bilinen;
      yontem = 'Girilen bit hızı kullanıldı';
    } else {
      const fps = h.pos(v.fps, 'Kare hızı');
      if (fps > 120) h.err('Kare hızı 120 fps\'den büyük olamaz; güvenlik kameralarında genellikle 10–30 fps kullanılır.');
      const piksel = { 720: 1280 * 720, 1080: 1920 * 1080, 1440: 2560 * 1440, 1944: 2592 * 1944, 2160: 3840 * 2160 }[v.cozunurluk || '1080'];
      if (!piksel) h.err('Listeden bir çözünürlük seçin.');
      const hareket = { dusuk: 1, orta: 2, yuksek: 4 }[v.hareket || 'dusuk'];
      if (!hareket) h.err('Listeden bir hareket düzeyi seçin.');
      const codec = v.codec === 'h265' ? 0.5 : 1;
      per = piksel * fps * hareket * 0.07 * codec / 1e6;
      yontem = 'Tahmin: piksel × fps × hareket katsayısı × 0,07' + (codec < 1 ? ' × 0,5 (H.265)' : '');
    }
    const toplam = per * n;
    const gerekli = toplam * (1 + pay / 100);
    return {
      rows: [
        ['Gereken bant genişliği', h.fmt(gerekli, 2) + ' Mbps'],
        ['Kameraların toplam bit hızı', h.fmt(toplam, 2) + ' Mbps'],
        ['Kamera başına bit hızı', h.fmt(per, 2) + ' Mbps'],
        ['Kamera başına (kbps)', h.fmt(per * 1000, 0) + ' kbps'],
        ['Günlük veri (24 saat)', h.fmt(toplam * 10.8, 2) + ' GB'],
        ['Yöntem', yontem],
      ],
      note: 'Tahmini değerler yaygın bir yaklaşık formüle dayanır; gerçek bit hızı kamera modeline, ayarlara ve sahneye göre değişir. Kesin değer için kameranın ayar ekranındaki bit hızını "Bilinen bit hızı" alanına yazın.',
    };
  }
