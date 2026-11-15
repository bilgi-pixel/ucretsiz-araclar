// Kitap Okuma Süresi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const sayfa = h.pos(v.sayfa, 'Sayfa sayısı');
    const ks = h.pos(v.kelimeSayfa, 'Sayfa başına kelime');
    const hiz = h.pos(v.hiz, 'Okuma hızı');
    const gunluk = h.pos(v.gunluk, 'Günlük okuma süresi');
    if (gunluk > 1440) h.err('Günlük okuma süresi 1440 dakikadan (24 saat) fazla olamaz.');
    const kelime = sayfa * ks;
    const dk = kelime / hiz;
    const tamDk = Math.max(1, Math.round(dk));
    const saat = Math.floor(tamDk / 60);
    const kalan = tamDk - saat * 60;
    const gun = Math.max(1, Math.ceil(dk / gunluk - 1e-9));
    const gunlukSayfa = (gunluk * hiz) / ks;
    return {
      rows: [
        ['Toplam okuma süresi', `${saat} saat ${kalan} dakika`],
        ['Bitirme süresi', `${h.fmt(gun, 0)} gün`],
        ['Günde okunan sayfa', `${h.fmt(gunlukSayfa, 2)} sayfa`],
        ['Toplam kelime', `${h.fmt(kelime, 0)} kelime`],
        ['Bir sayfanın okunma süresi', `${h.fmt(ks / hiz, 2)} dakika`],
      ],
      note: 'Süre, molasız ve sabit hızla okuma varsayımıyla bulunur; gün sayısı yukarı yuvarlanır.',
    };
  }
