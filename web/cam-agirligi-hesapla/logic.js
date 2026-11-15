// Cam Ağırlığı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const en = h.pos(v.en, 'En');
    const boy = h.pos(v.boy, 'Boy');
    const kal = h.pos(v.kalinlik, 'Tek cam kalınlığı');
    const adet = h.posint(v.adet, 'Adet');
    const katman = Number(v.katman);
    if (![1, 2, 3].includes(katman)) h.err('Cam katmanını listeden seçin.');
    if (kal > 100) h.err('Cam kalınlığı milimetre olarak yazılmalı (örn. 4, 6, 10).');
    const YOGUNLUK = 2500; // kg/m³
    const alan = (en / 100) * (boy / 100);
    const toplamKal = kal * katman;
    const m2 = toplamKal / 1000 * YOGUNLUK;
    const tek = alan * m2;
    return {
      rows: [
        ['Toplam ağırlık', h.fmt(tek * adet, 2) + ' kg'],
        ['Tek parça ağırlığı', h.fmt(tek, 2) + ' kg'],
        ['m² ağırlığı', h.fmt(m2, 2) + ' kg/m²'],
        ['Tek parça alanı', h.fmt(alan, 3) + ' m²'],
        ['Toplam cam kalınlığı', h.fmt(toplamKal, 2) + ' mm'],
      ],
      note: 'Cam yoğunluğu 2.500 kg/m³ alınmıştır. Isıcamda ara boşluk, çıta ve dolgu malzemesinin ağırlığı hesaba katılmaz; gerçek ünite biraz daha ağır olabilir.',
    };
  }
