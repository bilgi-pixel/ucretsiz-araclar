// Eşkenar Dörtgen Alanı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let a, d1, d2;
    if (v.yontem === 'yuk') {
      a = h.pos(v.kenar, 'Kenar');
      const y = h.pos(v.yukseklik, 'Yükseklik');
      if (y > a * (1 + 1e-12)) h.err('Yükseklik kenardan uzun olamaz; en fazla kenara eşit olabilir (bu durumda şekil karedir).');
      const t = Math.asin(Math.min(1, y / a));
      d1 = 2 * a * Math.sin(t / 2);
      d2 = 2 * a * Math.cos(t / 2);
    } else if (v.yontem === 'aci') {
      a = h.pos(v.kenar, 'Kenar');
      const aci = h.pos(v.aci, 'İç açı');
      if (aci >= 180) h.err('İç açı 0 ile 180 derece arasında olmalı.');
      const t = aci * Math.PI / 180;
      d1 = 2 * a * Math.sin(t / 2);
      d2 = 2 * a * Math.cos(t / 2);
    } else {
      d1 = h.pos(v.kosegen1, 'Birinci köşegen');
      d2 = h.pos(v.kosegen2, 'İkinci köşegen');
      a = Math.sqrt(d1 * d1 + d2 * d2) / 2;
    }
    const kisa = Math.min(d1, d2);
    const uzun = Math.max(d1, d2);
    const alan = d1 * d2 / 2;
    const dar = 2 * Math.atan2(kisa, uzun) * 180 / Math.PI;
    return {
      rows: [
        ['Alan', h.fmt(alan, 4) + ' birim²'],
        ['Kenar', h.fmt(a, 4) + ' birim'],
        ['Çevre', h.fmt(4 * a, 4) + ' birim'],
        ['Yükseklik', h.fmt(alan / a, 4) + ' birim'],
        ['Kısa köşegen', h.fmt(kisa, 4) + ' birim'],
        ['Uzun köşegen', h.fmt(uzun, 4) + ' birim'],
        ['Dar açı', h.fmt(dar, 2) + '°'],
      ],
      note: 'Alan = köşegenlerin çarpımı ÷ 2 = kenar × yükseklik = kenar² × sin(açı). Dar açı 90° ise şekil karedir.',
    };
  }
