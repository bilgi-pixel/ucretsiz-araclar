// Elo Puanı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ra = h.nonneg(v.puan, 'Sizin puanınız');
    const rb = h.nonneg(v.rakip, 'Rakibin puanı');
    if (ra > 4000 || rb > 4000) h.err('Puan 4000\'den büyük olamaz; Elo puanını yazdığınızdan emin olun (örn. 1500).');
    const s = Number(v.sonuc);
    if (![0, 0.5, 1].includes(s)) h.err('Maç sonucunu listeden seçin.');
    const k = Number(v.k);
    if (!(k > 0 && k <= 100)) h.err('K katsayısını listeden seçin.');
    const beklenen = 1 / (1 + Math.pow(10, (rb - ra) / 400));
    const degisim = k * (s - beklenen);
    const isaretli = (x, d) => {
      const r = Number(x.toFixed(d));
      return (r > 0 ? '+' : r < 0 ? '-' : '') + h.fmt(Math.abs(r), d);
    };
    return {
      rows: [
        ['Yeni puanınız', h.fmt(ra + degisim, 1).replace(/\./g, '')],
        ['Puan değişimi', isaretli(degisim, 2)],
        ['Beklenen skorunuz', h.fmt(beklenen, 3) + ' (%' + h.fmt(beklenen * 100, 1) + ')'],
        ['Rakibin beklenen skoru', h.fmt(1 - beklenen, 3) + ' (%' + h.fmt((1 - beklenen) * 100, 1) + ')'],
        ['Puan farkı', isaretli(ra - rb, 0)],
        ['Kazanırsanız / berabere / kaybederseniz', isaretli(k * (1 - beklenen), 2) + ' / ' + isaretli(k * (0.5 - beklenen), 2) + ' / ' + isaretli(k * (0 - beklenen), 2)],
      ],
      note: 'Araç lojistik Elo formülünü yuvarlamadan uygular. Resmî listelerde beklenen skor tablodan okunur, büyük puan farkları sınırlandırılır ve değişimler dönem sonunda yuvarlanır; bu yüzden küçük farklar olabilir. Uluslararası federasyon kurallarında 400 puandan büyük farklar 400 sayılır ve bir dönemdeki oyun sayısı çok olduğunda K düşürülür; araç bu iki sınırı uygulamaz.',
    };
  }
