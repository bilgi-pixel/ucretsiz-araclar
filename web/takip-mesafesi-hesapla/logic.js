// Takip Mesafesi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kmh = h.pos(v.hiz, 'Hız');
    const sure = h.pos(v.sure, 'Takip süresi');
    const boy = h.opt(v.boy, 4.5, 'Araç boyu');
    if (kmh > 400) h.err('"Hız" en fazla 400 km/sa olabilir.');
    if (sure > 20) h.err('"Takip süresi" saniye cinsinden girilmeli; en fazla 20 olabilir.');
    if (!(boy > 0) || boy > 30) h.err('"Araç boyu" 0 ile 30 metre arasında olmalı.');
    const ms = kmh / 3.6;
    const d = ms * sure;
    const yari = kmh / 2;
    return {
      rows: [
        ['Takip mesafesi (süre kuralı)', h.fmt(d, 1) + ' m'],
        ['Hızın yarısı kuralı', h.fmt(yari, 1) + ' m'],
        ['Saniyede gidilen yol', h.fmt(ms, 2) + ' m'],
        ['Araç boyu karşılığı', h.fmt(d / boy, 1) + ' araç boyu'],
        ['Hızın yarısı kuralının süre karşılığı', h.fmt(yari / ms, 1) + ' sn'],
        ['Kötü hava için (sürenin iki katı)', h.fmt(d * 2, 1) + ' m'],
      ],
      note: 'Takip mesafesi = hız (m/sn) × süre. Bu değerler alt sınırdır; yağış, sis, kar, yorgunluk ve ağır yükte mesafeyi artırın.',
    };
  }
