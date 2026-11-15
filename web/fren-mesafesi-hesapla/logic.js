// Fren ve Duruş Mesafesi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const G = 9.81;
    const kmh = h.pos(v.hiz, 'Hız');
    const t = h.nonneg(v.reaksiyon, 'Reaksiyon süresi');
    if (kmh > 400) h.err('"Hız" en fazla 400 km/sa olabilir.');
    if (t > 10) h.err('"Reaksiyon süresi" saniye cinsinden girilmeli; en fazla 10 olabilir.');
    const tablo = { kuru: 0.7, islak: 0.4, kar: 0.2, buz: 0.1 };
    let mu = tablo[v.zemin] ?? 0.7;
    if (String(v.ozel ?? '').trim() !== '') {
      mu = h.pos(v.ozel, 'Özel sürtünme katsayısı');
      if (mu > 1.5) h.err('"Özel sürtünme katsayısı" en fazla 1,5 olabilir; binek araçlar için olağan aralık 0,1–1 arasıdır.');
    }
    const ms = kmh / 3.6;
    const dR = ms * t;
    const dF = ms * ms / (2 * mu * G);
    const tF = ms / (mu * G);
    return {
      rows: [
        ['Toplam duruş mesafesi', h.fmt(dR + dF, 1) + ' m'],
        ['Reaksiyon mesafesi', h.fmt(dR, 1) + ' m'],
        ['Fren mesafesi', h.fmt(dF, 1) + ' m'],
        ['Toplam duruş süresi', h.fmt(t + tF, 2) + ' sn'],
        ['Hız', h.fmt(ms, 2) + ' m/sn'],
        ['Kullanılan sürtünme katsayısı', h.fmt(mu, 2)],
        ['Yavaşlama ivmesi', h.fmt(mu * G, 2) + ' m/sn²'],
      ],
      note: 'Düz yolda, tekerlekler kilitlenmeden tam frenleme varsayılmıştır. Sürtünme katsayıları yaklaşık tipik değerlerdir; gerçek mesafe lastik, fren, yük ve yol durumuna göre değişir.',
    };
  }
