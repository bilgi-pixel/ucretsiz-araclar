// Doğa Yürüyüşü Süresi (Naismith Kuralı) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const km = h.pos(v.mesafe, 'Parkur uzunluğu');
    const cikis = h.nonneg(v.cikis, 'Toplam tırmanış');
    const hiz = h.pos(h.opt(v.hiz, 5, 'Yürüyüş hızı') + '', 'Yürüyüş hızı');
    const oran = h.pos(h.opt(v.oran, 600, 'Saatte tırmanış') + '', 'Saatte tırmanış');
    const mola = h.opt(v.mola, 0, 'Toplam mola');
    if (mola < 0) h.err('"Toplam mola" negatif olamaz.');
    if (km > 1000) h.err('Parkur uzunluğu en fazla 1000 km olabilir; uzun rotaları günlük etaplara bölerek hesaplayın.');
    if (cikis > 20000) h.err('Toplam tırmanış en fazla 20.000 m olabilir; değeri metre cinsinden yazdığınızdan emin olun.');
    if (hiz > 12) h.err('Yürüyüş hızı 12 km/sa değerini aşamaz; koşu için koşu temposu aracını kullanın.');
    const sure = (dk) => {
      const t = Math.round(dk + 1e-9);
      return `${Math.floor(t / 60)} sa ${t % 60} dk`;
    };
    const yatayDk = (km / hiz) * 60;
    const cikisDk = (cikis / oran) * 60;
    const yuruyusDk = yatayDk + cikisDk;
    const toplamDk = yuruyusDk + mola;
    const esdeger = km + (cikis / oran) * hiz;
    const egim = (cikis / (km * 1000)) * 100;
    return {
      rows: [
        ['Tahmini toplam süre', sure(toplamDk)],
        ['Yürüyüş süresi (molasız)', sure(yuruyusDk)],
        ['Yatay mesafenin payı', sure(yatayDk)],
        ['Tırmanışın payı', sure(cikisDk)],
        ['Eşdeğer düz mesafe', h.fmt(esdeger, 1) + ' km'],
        ['Ortalama hız (molasız)', h.fmt(km / (yuruyusDk / 60), 1) + ' km/sa'],
        ['Parkurun ortalama çıkış eğimi', '%' + h.fmt(egim, 1)],
      ],
      note: 'Naismith kuralı iniş, zemin, yük, hava ve kondisyon etkisini içermez; sonuç formda bir yürüyüşçü için alt sınıra yakın bir tahmindir. Plan yaparken güvenlik payı bırakın.',
    };
  }
