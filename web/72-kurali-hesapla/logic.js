// 72 Kuralı: Paranın İkiye Katlanma Süresi — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.pos(v.deger, v.mod === 'oran' ? 'Süre' : 'Yıllık oran');
    if (v.mod === 'oran') {
      if (x > 1000) h.err('Süre en fazla 1.000 yıl olabilir.');
      const kural = 72 / x;
      const kesin = (Math.pow(2, 1 / x) - 1) * 100;
      return {
        rows: [
          ['Gereken yıllık oran (72 kuralı)', '%' + h.fmt(kural, 2)],
          ['Gereken yıllık oran (kesin)', '%' + h.fmt(kesin, 4)],
          ['72 kuralının sapması', h.fmt(kural - kesin, 4) + ' puan'],
          ['Hedef süre', h.fmt(x, 2) + ' yıl'],
        ],
        note: 'Kesin oran = 2^(1 ÷ yıl) − 1. Getirinin her yıl aynı oranda gerçekleştiği ve yeniden yatırıldığı varsayılır.',
      };
    }
    if (x > 10000) h.err('Yıllık oran %10.000\'den büyük olamaz; değeri kontrol edin.');
    const r = x / 100;
    const kural = 72 / x;
    const kat = (k) => Math.log(k) / Math.log(1 + r);
    const kesin = kat(2);
    const ayTop = Math.round(kesin * 12);
    return {
      rows: [
        ['İkiye katlanma süresi (72 kuralı)', h.fmt(kural, 2) + ' yıl'],
        ['İkiye katlanma süresi (kesin)', h.fmt(kesin, 2) + ' yıl'],
        ['Kesin süre, yıl ve ay', Math.floor(ayTop / 12) + ' yıl ' + (ayTop % 12) + ' ay'],
        ['72 kuralının sapması', h.fmt(kural - kesin, 2) + ' yıl'],
        ['Üçe katlanma süresi (kesin)', h.fmt(kat(3), 2) + ' yıl'],
        ['Dörde katlanma süresi (kesin)', h.fmt(kat(4), 2) + ' yıl'],
      ],
      note: 'Kesin süre = ln 2 ÷ ln(1 + oran). Yıllık bileşik getiri ve sabit oran varsayılmıştır; vergi ve enflasyon hesaba katılmaz.',
    };
  }
