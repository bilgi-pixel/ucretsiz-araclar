// Cihazın Elektrik Maliyeti Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const guc = h.pos(v.guc, 'Cihazın gücü');
    const saat = h.pos(v.saat, 'Günlük kullanım');
    if (saat > 24) h.err('"Günlük kullanım" en fazla 24 saat olabilir.');
    const gun = h.opt(v.gun, 30, 'Ayda kullanılan gün sayısı');
    if (!(gun > 0) || gun > 31) h.err('"Ayda kullanılan gün sayısı" 1 ile 31 arasında olmalı.');
    const fiyat = h.nonneg(v.fiyat, 'Birim fiyat');
    const adet = String(v.adet ?? '').trim() === '' ? 1 : h.posint(v.adet, 'Cihaz adedi');
    const gunluk = guc * adet * saat / 1000;
    const aylik = gunluk * gun;
    return {
      rows: [
        ['Aylık maliyet', h.para(aylik * fiyat)],
        ['Aylık tüketim', h.fmt(aylik, 2) + ' kWh'],
        ['Günlük tüketim', h.fmt(gunluk, 3) + ' kWh'],
        ['Günlük maliyet', h.para(gunluk * fiyat)],
        ['Yıllık tüketim', h.fmt(aylik * 12, 1) + ' kWh'],
        ['Yıllık maliyet', h.para(aylik * 12 * fiyat)],
        ['Saatlik maliyet', h.para(guc * adet / 1000 * fiyat)],
      ],
      note: 'Yıllık değerler aylık sonucun 12 katıdır. Hesap, cihazın çalıştığı süre boyunca etiket gücünü sürekli çektiğini varsayar; termostatlı cihazlarda gerçek tüketim daha düşüktür.',
    };
  }
