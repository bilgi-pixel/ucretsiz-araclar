// Su Tüketimi ve Maliyeti Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ilk = h.nonneg(v.ilkEndeks, 'İlk endeks');
    const son = h.nonneg(v.sonEndeks, 'Son endeks');
    if (son < ilk) h.err('Son endeks ilk endeksten küçük olamaz. Değerlerin yerini kontrol edin.');
    const gun = h.posint(v.gun, 'Gün sayısı');
    const kisi = h.posint(v.kisi, 'Kişi sayısı');
    const fiyat = h.opt(v.fiyat, null, 'Birim fiyat');
    if (fiyat !== null && fiyat < 0) h.err('"Birim fiyat" negatif olamaz.');
    const m3 = son - ilk;
    const litre = m3 * 1000;
    const gunluk = litre / gun;
    const rows = [
      ['Dönem tüketimi', h.fmt(m3, 3) + ' m³'],
      ['Litre karşılığı', h.fmt(litre, 0) + ' L'],
      ['Günlük ortalama', h.fmt(gunluk, 1) + ' L/gün'],
      ['Kişi başı günlük', h.fmt(gunluk / kisi, 1) + ' L/kişi/gün'],
      ['30 günlük karşılığı', h.fmt(m3 / gun * 30, 2) + ' m³'],
      ['Yıllık karşılığı', h.fmt(m3 / gun * 365, 1) + ' m³'],
    ];
    if (fiyat !== null) {
      rows.push(['Dönem tutarı', h.para(m3 * fiyat)]);
      rows.push(['30 günlük tutar', h.para(m3 / gun * 30 * fiyat)]);
    }
    return {
      rows,
      note: fiyat !== null
        ? 'Tutar, tüketimin tek bir birim fiyatla çarpımıdır; kademeli tarife, sabit bedeller ve yuvarlamalar nedeniyle faturanız farklı çıkabilir.'
        : 'Tutarı görmek için faturanızdaki m³ birim fiyatını girin. 1 m³ = 1.000 litre.',
    };
  }
