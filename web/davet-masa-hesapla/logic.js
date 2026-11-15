// Davetli Sayısına Göre Salon ve Masa Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const davetli = h.posint(v.davetli, 'Davetli sayısı');
    const kisiMasa = h.posint(v.kisiMasa, 'Masa başına kişi');
    if (kisiMasa > 30) h.err('"Masa başına kişi" en fazla 30 olabilir; uzun masaları parçalara bölerek girin.');
    const yedek = h.nonneg(v.yedek === '' ? '0' : v.yedek, 'Yedek sandalye payı');
    if (yedek > 100) h.err('"Yedek sandalye payı" 0 ile 100 arasında olmalı.');
    const TABLO = { yemek: 1.2, pist: 1.5, kokteyl: 0.7, tiyatro: 0.8 };
    const varsayilan = TABLO[v.duzen] || 1.2;
    const alanKisi = String(v.kisiAlan || '').trim() === '' ? varsayilan : h.pos(v.kisiAlan, 'Kişi başı alan');
    const koltuk = Math.ceil(davetli * (1 + yedek / 100) - 1e-9);
    const masa = Math.ceil(koltuk / kisiMasa - 1e-9);
    const kapasite = masa * kisiMasa;
    const alan = koltuk * alanKisi;
    const sonMasa = koltuk - (masa - 1) * kisiMasa;
    const masasiz = v.duzen === 'kokteyl' || v.duzen === 'tiyatro';
    return {
      rows: [
        ['Gereken masa sayısı', `${h.fmt(masa, 0)} masa`],
        ['Planlanan sandalye', `${h.fmt(koltuk, 0)} sandalye`],
        ['Masaların toplam kapasitesi', `${h.fmt(kapasite, 0)} kişi`],
        ['Boş kalan sandalye', `${h.fmt(kapasite - davetli, 0)} sandalye`],
        ['Son masadaki kişi sayısı', `${h.fmt(sonMasa, 0)} kişi`],
        ['Yaklaşık salon alanı', `${h.fmt(alan, 1)} m²`],
        ['Kişi başı alan', `${h.fmt(alanKisi, 2)} m²`],
      ],
      note: (masasiz ? 'Bu düzende masa sayısı, aynı kişi sayısını oturtmak isteseydiniz gerekecek adedi gösterir. ' : '') + 'Alan değeri pratik bir tahmindir; kolon, servis koridoru, büfe ve acil çıkış payları salona göre değişir. Kesin kapasite için salon işletmesinin onaylı yerleşim planını esas alın.',
    };
  }
