// Günlük Protein İhtiyacı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kilo = h.pos(v.kilo, 'Kilo');
    if (kilo < 30 || kilo > 300) h.err('Kilo 30 ile 300 kg arasında olmalı; bu araç yetişkinler içindir.');
    const ogun = h.posint(v.ogun, 'Günlük öğün sayısı');
    if (ogun > 10) h.err('Öğün sayısı en fazla 10 olabilir.');
    const tablo = {
      sedanter: [0.8, 0.8], hafif: [1.0, 1.2], dayaniklilik: [1.2, 1.6],
      kuvvet: [1.6, 2.2], kiloverme: [1.6, 2.4], ileriyas: [1.0, 1.2],
    };
    const [alt, ust] = tablo[v.duzey] || tablo.sedanter;
    const a = kilo * alt, b = kilo * ust;
    const aralik = (x, y, d, birim, on = '') => (Math.abs(x - y) < 1e-9 ? `${on}${h.fmt(x, d)}${birim}` : `${on}${h.fmt(x, d)} – ${on}${h.fmt(y, d)}${birim}`);
    const rows = [
      ['Günlük protein', aralik(a, b, 0, ' g')],
      ['Öğün başına', aralik(a / ogun, b / ogun, 1, ' g')],
      ['Proteinden gelen kalori', aralik(a * 4, b * 4, 0, ' kcal')],
      ['Kullanılan aralık', aralik(alt, ust, 1, ' g/kg')],
    ];
    if (String(v.kalori ?? '').trim() !== '') {
      const kal = h.pos(v.kalori, 'Günlük kalori');
      if (kal < 800 || kal > 10000) h.err('Günlük kalori 800 ile 10.000 kcal arasında olmalı.');
      rows.push(['Günlük kalorideki payı', aralik(a * 4 / kal * 100, b * 4 / kal * 100, 1, '', '%')]);
    }
    return {
      rows,
      note: 'Böbrek hastalığı, gebelik, emzirme ya da özel bir diyet durumunda protein miktarını hekiminiz ya da diyetisyeniniz belirlemelidir.',
    };
  }
