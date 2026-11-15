// Efektif Faiz Oranı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const nom = h.nonneg(v.nominal, 'Nominal yıllık faiz oranı');
    if (nom > 10000) h.err('Nominal oran %10.000\'den büyük olamaz; değeri kontrol edin.');
    const r = nom / 100;
    const adlar = { 1: 'yıllık', 2: 'altı aylık', 4: 'üç aylık', 12: 'aylık', 52: 'haftalık', 365: 'günlük' };
    let ear, donem, donemAd, m;
    if (v.siklik === 'surekli') {
      ear = Math.exp(r) - 1;
      donem = null;
    } else {
      m = Number(v.siklik);
      if (!adlar[m]) h.err('Listeden geçerli bir bileşiklenme sıklığı seçin.');
      donem = r / m;
      donemAd = adlar[m];
      ear = Math.pow(1 + donem, m) - 1;
    }
    const rows = [
      ['Yıllık efektif faiz oranı', '%' + h.fmt(ear * 100, 4)],
      ['Nominal yıllık oran', '%' + h.fmt(nom, 4)],
      ['Fark (efektif − nominal)', h.fmt((ear - r) * 100, 4) + ' puan'],
    ];
    if (donem !== null) rows.push(['Dönem faiz oranı (' + donemAd + ')', '%' + h.fmt(donem * 100, 4)]);
    rows.push(['100.000 TL\'nin bir yıl sonraki değeri', h.para(100000 * (1 + ear))]);
    return {
      rows,
      note: v.siklik === 'surekli'
        ? 'Sürekli bileşik: efektif oran = e^r − 1. Vergi ve masraflar hesaba katılmamıştır.'
        : 'Efektif oran = (1 + nominal ÷ m)^m − 1. Vergi ve masraflar hesaba katılmamıştır.',
    };
  }
