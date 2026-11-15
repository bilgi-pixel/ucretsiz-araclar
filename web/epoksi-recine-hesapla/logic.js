// Epoksi Reçine Miktarı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const en = h.pos(v.en, 'En');
    const boy = h.pos(v.boy, 'Boy');
    const kal = h.pos(v.kalinlik, 'Döküm kalınlığı');
    const a = h.pos(v.oranA, 'Reçine payı');
    const b = h.pos(v.oranB, 'Sertleştirici payı');
    const yog = h.pos(v.yogunluk, 'Karışım yoğunluğu');
    const fire = h.nonneg(h.opt(v.fire, 0, 'Fire payı'), 'Fire payı');
    if (yog < 0.8 || yog > 2.5) h.err('Karışım yoğunluğu 0,8 ile 2,5 g/cm³ arasında olmalı; bilmiyorsanız 1,1 yazın.');
    if (fire > 100) h.err('Fire payı %100\'den büyük olamaz.');
    const net = en * boy * (kal / 10); // cm³ = ml
    const ml = net * (1 + fire / 100);
    const g = ml * yog;
    const rows = [
      ['Gerekli toplam epoksi', `${h.fmt(g / 1000, 2)} kg (${h.fmt(ml / 1000, 2)} litre)`],
    ];
    if (v.tur === 'hacim') {
      rows.push(['Reçine (A)', h.fmt(ml * a / (a + b), 0) + ' ml']);
      rows.push(['Sertleştirici (B)', h.fmt(ml * b / (a + b), 0) + ' ml']);
    } else {
      rows.push(['Reçine (A)', h.fmt(g * a / (a + b), 0) + ' g']);
      rows.push(['Sertleştirici (B)', h.fmt(g * b / (a + b), 0) + ' g']);
    }
    rows.push(['Net hacim (firesiz)', h.fmt(net / 1000, 3) + ' litre']);
    rows.push(['Yüzey alanı', h.fmt(en * boy / 10000, 3) + ' m²']);
    rows.push(['Karışım oranı', `${h.fmt(a, 2)} : ${h.fmt(b, 2)} (${v.tur === 'hacim' ? 'hacimce' : 'ağırlıkça'})`]);
    return {
      rows,
      note: 'Karışım oranını ve oranın ağırlıkça mı hacimce mi olduğunu mutlaka ürününüzün etiketinden alın. Tek seferde dökülebilecek en fazla kalınlık ürüne göre değişir.',
    };
  }
