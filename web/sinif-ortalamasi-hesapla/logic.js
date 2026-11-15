// Sınıf Ortalaması Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nums(v.notlar, 'Notlar');
    if (x.some((n) => n < 0)) h.err('Notlar negatif olamaz; listeyi kontrol edin.');
    const gecme = h.nonneg(v.gecme, 'Geçme notu');
    const n = x.length;
    const ort = x.reduce((a, b) => a + b, 0) / n;
    const sirali = [...x].sort((a, b) => a - b);
    const ortanca = n % 2 ? sirali[(n - 1) / 2] : (sirali[n / 2 - 1] + sirali[n / 2]) / 2;
    const ss = Math.sqrt(x.reduce((a, b) => a + (b - ort) * (b - ort), 0) / n);
    const gecen = x.filter((k) => k >= gecme - 1e-9).length;
    return {
      rows: [
        ['Sınıf ortalaması', h.fmt(ort, 2)],
        ['Öğrenci sayısı', `${n}`],
        ['En yüksek not', h.fmt(sirali[n - 1], 2)],
        ['En düşük not', h.fmt(sirali[0], 2)],
        ['Ortanca (medyan)', h.fmt(ortanca, 2)],
        ['Standart sapma', h.fmt(ss, 2)],
        ['Geçen öğrenci', `${gecen} / ${n}`],
        ['Başarı oranı', `%${h.fmt((gecen / n) * 100, 2)}`],
        ['Ortalamanın üstündeki öğrenci', `${x.filter((k) => k > ort + 1e-9).length}`],
      ],
      note: 'Standart sapma, tüm sınıf girildiği varsayımıyla n\'e bölünerek (kitle formülü) hesaplanır.',
    };
  }
