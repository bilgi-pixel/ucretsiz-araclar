// İnşaat Demiri Ağırlığı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const d = h.pos(v.cap, 'Demir çapı');
    const L = h.pos(v.uzunluk, 'Çubuk boyu');
    const n = h.posint(v.adet, 'Adet');
    if (d < 4 || d > 60) h.err('Demir çapı milimetre olarak 4 ile 60 arasında olmalı (örn. 8, 12, 16).');
    const kesit = Math.PI / 4 * d * d;
    const birim = kesit * 7850 / 1e6;
    const cubuk = birim * L;
    const toplam = cubuk * n;
    const rows = [
      ['Toplam ağırlık', h.fmt(toplam, 2) + ' kg'],
      ['Birim ağırlık', h.fmt(birim, 3) + ' kg/m'],
      ['Bir çubuğun ağırlığı', h.fmt(cubuk, 2) + ' kg'],
      ['Toplam uzunluk', h.fmt(L * n, 2) + ' m'],
      ['Toplam (ton)', h.fmt(toplam / 1000, 3) + ' ton'],
      ['1 tondaki çubuk sayısı', h.fmt(Math.floor(1000 / cubuk + 1e-9), 0) + ' adet'],
      ['Kesit alanı', h.fmt(kesit, 1) + ' mm²'],
    ];
    if (String(v.fiyat ?? '').trim() !== '') {
      const f = h.nonneg(v.fiyat, 'Kilogram fiyatı');
      rows.push(['Tutar', h.para(toplam * f)]);
    }
    return { rows, note: 'Çelik yoğunluğu 7.850 kg/m³ alınmıştır. Kantar ağırlığı, üretim toleransı nedeniyle teorik değerden birkaç puan farklı olabilir.' };
  }
