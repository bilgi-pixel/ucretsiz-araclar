// Kilogram Stone Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const LB = 0.45359237;
    const x = h.nonneg(v.deger, 'Değer');
    let lb;
    if (v.yon === 'st') {
      const ek = h.opt(v.ekPound, 0, 'Ek pound');
      if (ek < 0) h.err('"Ek pound" negatif olamaz.');
      lb = x * 14 + ek;
    } else {
      if (String(v.ekPound ?? '').trim() !== '') h.err('"Ek pound" alanı yalnızca Stone → Kilogram yönünde kullanılır; bu alanı boşaltın ya da yönü değiştirin.');
      lb = x / LB;
    }
    const kg = v.yon === 'st' ? lb * LB : x;
    const st = lb / 14;
    let tam = Math.floor(st + 1e-9);
    let kalan = Math.round((lb - tam * 14) * 100) / 100;
    if (kalan < 0) kalan = 0;
    if (kalan >= 14) { tam += 1; kalan = 0; }
    const ana = v.yon === 'st'
      ? [['Kilogram', h.fmt(kg, 4) + ' kg'], ['Stone', h.fmt(st, 4) + ' st']]
      : [['Stone', h.fmt(st, 4) + ' st'], ['Kilogram', h.fmt(kg, 4) + ' kg']];
    return {
      rows: [
        ...ana,
        ['Stone ve pound', `${h.fmt(tam, 0)} st ${h.fmt(kalan, 2)} lb`],
        ['Pound', h.fmt(lb, 4) + ' lb'],
      ],
      note: '1 st = 14 lb = 6,35029318 kg (tam tanım). Sonuçlar en fazla dört ondalık basamakla gösterilir.',
    };
  }
