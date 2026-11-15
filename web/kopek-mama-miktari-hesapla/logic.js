// Köpek Mama Miktarı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kg = h.pos(v.kilo, 'Köpeğin ağırlığı');
    if (kg > 120) h.err('Köpeğin ağırlığı 120 kg\'dan büyük olamaz. Ağırlığı kilogram olarak yazdığınızdan emin olun.');
    const e = h.pos(v.enerji, 'Mamanın enerjisi');
    if (e < 20 || e > 700) h.err('Mamanın enerjisi 20 ile 700 kcal/100 g arasında olmalı. Paketteki değer kcal/kg ise 10\'a bölerek yazın.');
    const ogun = h.posint(v.ogun, 'Günlük öğün sayısı');
    if (ogun > 12) h.err('Günlük öğün sayısı en fazla 12 olabilir.');
    const kats = { kisir: 1.6, normal: 1.8, hareketsiz: 1.4, zayiflama: 1.0, aktif: 2.5, yavru1: 3.0, yavru2: 2.0 };
    const k = kats[v.durum] || 1.6;
    const rer = 70 * Math.pow(kg, 0.75);
    const kcal = rer * k;
    const gram = kcal / e * 100;
    return {
      rows: [
        ['Günlük mama miktarı', h.fmt(gram, 0) + ' g'],
        ['Öğün başına', h.fmt(gram / ogun, 0) + ' g'],
        ['Günlük enerji ihtiyacı', h.fmt(kcal, 0) + ' kcal'],
        ['Dinlenme enerji ihtiyacı (RER)', h.fmt(rer, 0) + ' kcal'],
        ['Kullanılan çarpan', '× ' + h.fmt(k, 1)],
      ],
      note: 'Sonuç ortalama bir tahmindir; ırk, yaş ve hareketliliğe göre gerçek ihtiyaç belirgin biçimde değişebilir. Köpeğinizi düzenli tartıp miktarı ayarlayın. Hastalık, gebelik ve emzirme dönemlerinde veteriner hekime danışın.',
    };
  }
