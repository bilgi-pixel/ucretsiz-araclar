// Klima BTU Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const alan = h.pos(v.alan, 'Oda alanı');
    const kats = { 300: 300, 350: 350, 400: 400, 450: 450 }[v.iklim] ?? 350;
    const tavan = h.opt(v.tavan, 2.7, 'Tavan yüksekliği');
    if (!(tavan > 0)) h.err('"Tavan yüksekliği" sıfırdan büyük olmalı.');
    if (tavan > 10) h.err('"Tavan yüksekliği" metre cinsinden olmalı (örn. 2,7).');
    const carpan = v.gunes === 'gunesli' ? 1.1 : v.gunes === 'golge' ? 0.9 : 1;
    const kisi = String(v.kisi ?? '').trim() === '' ? 2 : h.posint(v.kisi, 'Odadaki kişi sayısı');
    const ek = Math.max(0, kisi - 2) * 600;
    const btu = alan * kats * (tavan / 2.7) * carpan + ek;
    const siniflar = [9000, 12000, 18000, 24000, 36000, 48000];
    const sinif = siniflar.find((s) => s >= btu - 1e-6);
    return {
      rows: [
        ['Gerekli kapasite', h.fmt(btu, 0) + ' BTU/saat'],
        ['Önerilen kapasite sınıfı', sinif ? h.fmt(sinif, 0) + ' BTU' : '48.000 BTU üzeri (birden fazla cihaz ya da merkezi sistem)'],
        ['Soğutma gücü', h.fmt(btu * 0.00029307107, 2) + ' kW'],
        ['Kişi kaynaklı ek yük', h.fmt(ek, 0) + ' BTU/saat'],
      ],
      note: 'Bu bir ön tahmindir. Yalıtım, cam alanı, çatı katı, mutfak ve elektronik cihaz ısısı gibi etkenler gerçek ihtiyacı değiştirir; satın almadan önce yerinde keşif yaptırın.',
    };
  }
