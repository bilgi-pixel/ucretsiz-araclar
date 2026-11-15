// Güvenlik Kamerası Kayıt Depolama Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kamera = h.posint(v.kamera, 'Kamera sayısı');
    const mbps = h.pos(v.bithizi, 'Kamera başına bit hızı');
    const saat = h.pos(v.saat, 'Günlük kayıt süresi');
    if (saat > 24) h.err('Günlük kayıt süresi 24 saatten fazla olamaz.');
    const gun = h.pos(v.gun, 'Saklama süresi');
    // Mbps → GB/saat: 1 Mbps × 3600 sn ÷ 8 = 450 MB = 0,45 GB
    const kameraGunluk = mbps * 0.45 * saat;
    const gunluk = kameraGunluk * kamera;
    const toplam = gunluk * gun;
    const tib = toplam * 1e9 / Math.pow(2, 40);
    return {
      rows: [
        ['Gereken depolama', h.fmt(toplam / 1000, 3) + ' TB'],
        ['Gigabayt karşılığı', h.fmt(toplam, 2) + ' GB'],
        ['İşletim sisteminde görünen', h.fmt(tib, 2) + ' TiB'],
        ['Günlük toplam kayıt', h.fmt(gunluk, 2) + ' GB/gün'],
        ['Kamera başına günlük kayıt', h.fmt(kameraGunluk, 2) + ' GB/gün'],
        ['Toplam bit hızı', h.fmt(mbps * kamera, 2) + ' Mbps'],
      ],
      note: '1 Mbps sürekli kayıt saatte 0,45 GB, günde 10,8 GB yer tutar (1 GB = 1.000 MB). Ses kaydı, alt akım ve dosya sistemi payı için sonuca yaklaşık %10–20 eklemek yerinde olur.',
    };
  }
