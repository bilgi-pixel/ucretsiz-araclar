// Bisiklet Kadro Boyu Bulma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const b = h.pos(v.bacak, 'İç bacak boyu');
    if (b < 45 || b > 110) h.err('İç bacak boyu 45 ile 110 cm arasında olmalı. Değeri santimetre olarak ve kasıktan yere ölçerek yazın.');
    const kats = { yol: 0.665, dag: 0.574, trekking: 0.66, sehir: 0.685 };
    const adlar = { yol: 'Yol bisikleti', dag: 'Dağ bisikleti', trekking: 'Trekking / tur bisikleti', sehir: 'Şehir bisikleti' };
    const k = kats[v.tur] || kats.yol;
    const cm = b * k;
    const inc = cm / 2.54;
    const sele = b * 0.883;
    return {
      rows: [
        ['Önerilen kadro boyu', h.fmt(cm, 1) + ' cm'],
        ['İnç karşılığı', h.fmt(inc, 1) + ' inç'],
        ['Uygun aralık', h.fmt(cm - 1, 1) + ' – ' + h.fmt(cm + 1, 1) + ' cm'],
        ['Sele yüksekliği (başlangıç)', h.fmt(sele, 1) + ' cm'],
        ['Kullanılan katsayı', (adlar[v.tur] || adlar.yol) + ': iç bacak × ' + h.fmt(k, 3)],
      ],
      note: 'Kadro boyu, orta göbek merkezinden sele borusunun üst ucuna kadar olan ölçüdür. Sele yüksekliği orta göbek merkezinden selenin üstüne kadardır. Değerler başlangıç önerisidir; üreticinin beden tablosunu da kontrol edin.',
    };
  }
