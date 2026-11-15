// Mum Yapımı Mum ve Esans Miktarı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const hacim = h.pos(v.hacim, 'Bir kabın dolum hacmi');
    const adet = h.posint(v.adet, 'Kap sayısı');
    const oran = h.nonneg(v.oran, 'Esans oranı');
    const yog = h.pos(v.yogunluk, 'Mum yoğunluğu');
    const fire = h.nonneg(h.opt(v.fire, 0, 'Fire payı'), 'Fire payı');
    if (oran > 15) h.err('Esans oranı %15\'i aşamaz; mumların çoğu %6–10 arasında esans taşır. Oranı düşürün.');
    if (yog < 0.7 || yog > 1.2) h.err('Mum yoğunluğu 0,7 ile 1,2 g/ml arasında olmalı; soya ve parafin için 0,9 yazabilirsiniz.');
    if (fire > 50) h.err('Fire payı %50\'den büyük olamaz.');
    const kapKarisim = hacim * yog;
    const toplam = kapKarisim * adet * (1 + fire / 100);
    const mum = toplam / (1 + oran / 100);
    const esans = toplam - mum;
    return {
      rows: [
        ['Eritilecek mum', h.fmt(mum, 1) + ' g'],
        ['Eklenecek esans', h.fmt(esans, 1) + ' g'],
        ['Toplam karışım', h.fmt(toplam, 1) + ' g'],
        ['Bir kaba düşen karışım', h.fmt(kapKarisim, 1) + ' g'],
        ['Bir kaba düşen esans', h.fmt(kapKarisim - kapKarisim / (1 + oran / 100), 1) + ' g'],
        ['Toplam dolum hacmi', h.fmt(hacim * adet, 0) + ' ml'],
      ],
      note: 'Esans oranı mum ağırlığına göre hesaplanır (100 g muma %8 esans = 8 g). Yoğunluk mum türüne ve markasına göre biraz değişir; ilk dökümde sonucu tartarak kendi katsayınızı bulun.',
    };
  }
