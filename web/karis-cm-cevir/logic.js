// Karış ve Kulaç Santimetre Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const karis = h.pos(v.karisBoy, 'Bir karış kaç cm?');
    const kulac = h.pos(v.kulacBoy, 'Bir kulaç kaç cm?');
    if (karis > 40) h.err('Karış boyu 40 cm\'den büyük olamaz; değeri santimetre olarak yazdığınızdan emin olun.');
    if (kulac > 300) h.err('Kulaç boyu 300 cm\'den büyük olamaz; değeri santimetre olarak yazdığınızdan emin olun.');
    const kat = { karis, kulac, cm: 1, metre: 100 };
    if (!kat[v.birim]) h.err('Listeden geçerli bir birim seçin.');
    const cm = x * kat[v.birim];
    const s = {
      cm: ['Santimetre', h.fmt(cm, 2) + ' cm'],
      metre: ['Metre', h.fmt(cm / 100, 4) + ' m'],
      karis: ['Karış', h.fmt(cm / karis, 4) + ' karış'],
      kulac: ['Kulaç', h.fmt(cm / kulac, 4) + ' kulaç'],
    };
    const sira = v.birim === 'karis' || v.birim === 'kulac' ? ['cm', 'metre', 'karis', 'kulac'] : ['karis', 'kulac', 'cm', 'metre'];
    return {
      rows: sira.filter((k) => k !== v.birim).map((k) => s[k]),
      note: `Hesapta 1 karış = ${h.fmt(karis, 2)} cm, 1 kulaç = ${h.fmt(kulac, 2)} cm alındı. Bu ölçüler kişiye göre değişir; kesin iş için şerit metre kullanın.`,
    };
  }
