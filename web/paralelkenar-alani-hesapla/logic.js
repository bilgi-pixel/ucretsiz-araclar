// Paralelkenar Alanı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.pos(v.taban, 'Taban');
    if (v.yontem === 'aci') {
      const b = h.pos(v.yanKenar, 'Yan kenar');
      const aci = h.pos(v.aci, 'Açı');
      if (aci >= 180) h.err('Açı 0 ile 180 derece arasında olmalı.');
      const rad = aci * Math.PI / 180;
      const alan = a * b * Math.sin(rad);
      const k1 = Math.sqrt(Math.max(0, a * a + b * b - 2 * a * b * Math.cos(rad)));
      const k2 = Math.sqrt(Math.max(0, a * a + b * b + 2 * a * b * Math.cos(rad)));
      return {
        rows: [
          ['Alan', h.fmt(alan, 4) + ' birim²'],
          ['Çevre', h.fmt(2 * (a + b), 4) + ' birim'],
          ['Tabana ait yükseklik', h.fmt(b * Math.sin(rad), 4) + ' birim'],
          ['Kısa köşegen', h.fmt(Math.min(k1, k2), 4) + ' birim'],
          ['Uzun köşegen', h.fmt(Math.max(k1, k2), 4) + ' birim'],
        ],
        note: 'Alan = a × b × sin(α). Köşegenler kosinüs teoremiyle bulunur. Açı 90° ise şekil dikdörtgendir.',
      };
    }
    const y = h.pos(v.yukseklik, 'Yükseklik');
    const rows = [['Alan', h.fmt(a * y, 4) + ' birim²']];
    if (String(v.yanKenar ?? '').trim() !== '') {
      const b = h.pos(v.yanKenar, 'Yan kenar');
      if (b < y * (1 - 1e-12)) h.err('Yan kenar yükseklikten kısa olamaz; yükseklik tabana dik olan en kısa uzaklıktır.');
      rows.push(['Çevre', h.fmt(2 * (a + b), 4) + ' birim']);
      rows.push(['Taban ile yan kenar arasındaki dar açı', h.fmt(Math.asin(Math.min(1, y / b)) * 180 / Math.PI, 2) + '°']);
    }
    return { rows, note: 'Alan = taban × yükseklik. Sonuç, uzunlukları yazdığınız birimin karesidir.' };
  }
