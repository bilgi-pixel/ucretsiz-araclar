// Fiyat/Kazanç (F/K) Oranı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const f = h.pos(v.fiyat, 'Hisse fiyatı');
    const k = h.num(v.kar, 'Hisse başına kâr');
    if (k === 0) h.err('Kâr sıfır olduğunda F/K oranı tanımsızdır; sıfırdan farklı bir kâr ya da zarar değeri yazın.');
    const g = String(v.buyume ?? '').trim() === '' ? null : h.num(v.buyume, 'Beklenen yıllık kâr büyümesi');
    const verim = (k / f) * 100;
    const verimYazi = (verim < 0 && h.fmt(Math.abs(verim), 2) !== '0' ? '-%' : '%') + h.fmt(Math.abs(verim), 2);
    if (k < 0) {
      return {
        rows: [
          ['F/K oranı', 'Anlamsız (şirket zararda)'],
          ['Kazanç verimi', verimYazi],
        ],
        note: 'Zarar eden şirketlerde F/K oranı yorumlanmaz. Bu durumda piyasa değeri/defter değeri ya da fiyat/satış gibi başka çarpanlara bakılır.',
      };
    }
    const fk = f / k;
    const rows = [
      ['F/K oranı', h.fmt(fk, 2)],
      ['Kazanç verimi', verimYazi],
      ['Kâr sabit kalırsa fiyatı karşılama süresi', h.fmt(fk, 1) + ' yıl'],
    ];
    if (g !== null) rows.push(['PEG oranı', g > 0 ? h.fmt(fk / g, 2) : 'Hesaplanamaz (büyüme sıfır ya da negatif)']);
    return { rows, note: 'F/K = fiyat ÷ hisse başına kâr. Oran tek başına ucuzluk ya da pahalılık göstergesi değildir; sektör ortalaması ve şirketin kendi geçmişiyle karşılaştırılmalıdır.' };
  }
