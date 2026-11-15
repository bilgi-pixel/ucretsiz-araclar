// Zincirleme İndirim Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const fiyat = h.pos(v.fiyat, 'Başlangıç fiyatı');
    const ham = String(v.oranlar ?? '').replace(/[%+]/g, ' ');
    const oranlar = h.nums(ham, 'İndirim oranları');
    if (oranlar.length > 10) h.err('En fazla 10 indirim oranı girebilirsiniz.');
    for (const o of oranlar) if (o < 0 || o > 100) h.err('Her indirim oranı 0 ile 100 arasında olmalı.');
    let f = fiyat;
    const satirlar = [`Başlangıç fiyatı: ${h.para(fiyat)}`];
    oranlar.forEach((o, i) => {
      const ind = f * o / 100;
      f -= ind;
      satirlar.push(`${i + 1}. indirim (%${h.fmt(o, 2)}): −${h.para(ind)} → ${h.para(f)}`);
    });
    const carpan = f / fiyat;
    const toplam = oranlar.reduce((a, b) => a + b, 0);
    const esdeger = (1 - carpan) * 100;
    return {
      rows: [
        ['Son fiyat', h.para(f)],
        ['Toplam indirim tutarı', h.para(fiyat - f)],
        ['Tek indirime eşdeğer oran', '%' + h.fmt(esdeger, 2)],
        ['Oranların düz toplamı', '%' + h.fmt(toplam, 2)],
        ['Aradaki fark', h.fmt(toplam - esdeger, 2) + ' puan'],
        ['Fiyat çarpanı', h.fmt(carpan, 4)],
      ],
      text: satirlar.join('\n'),
      note: 'Her indirim, bir önceki indirimden sonra kalan fiyata uygulanır. Oranların sırası son fiyatı değiştirmez.',
    };
  }
