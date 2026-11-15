// Tekne Gövde Hızı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const boy = h.pos(v.boy, 'Su hattı boyu');
    const k = h.opt(v.katsayi, 1.34, 'Hız/boy katsayısı');
    if (k < 0.5 || k > 3) h.err('Hız/boy katsayısı 0,5 ile 3 arasında olmalı; klasik değer 1,34\'tür.');
    const ft = v.birim === 'ft' ? boy : boy / 0.3048;
    const m = ft * 0.3048;
    if (m > 500) h.err('Su hattı boyu 500 metreyi aşamaz; değeri ve birimi kontrol edin.');
    const knot = k * Math.sqrt(ft);
    const rows = [
      ['Gövde hızı', h.fmt(knot, 2) + ' knot'],
      ['Gövde hızı (km/sa)', h.fmt(knot * 1.852, 2) + ' km/sa'],
      ['Gövde hızı (m/sn)', h.fmt((knot * 1852) / 3600, 2) + ' m/sn'],
      ['Su hattı boyu', `${h.fmt(m, 2)} m (${h.fmt(ft, 2)} ft)`],
    ];
    if (String(v.mesafe ?? '').trim() !== '') {
      const mil = h.pos(v.mesafe, 'Seyir mesafesi');
      const dk = Math.round((mil / knot) * 60 + 1e-9);
      rows.push(['Gövde hızında seyir süresi', `${Math.floor(dk / 60)} sa ${dk % 60} dk`]);
    }
    return {
      rows,
      note: 'Gövde hızı deplasman tipi tekneler için kuramsal bir üst sınırdır; kayıcı (planing) tekneler, katamaranlar ve çok dar gövdeler bu sınırı aşabilir. Gerçek seyir hızı rüzgâra, denize ve yüke göre daha düşüktür.',
    };
  }
