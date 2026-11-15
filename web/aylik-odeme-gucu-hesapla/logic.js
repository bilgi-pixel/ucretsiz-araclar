// Gelire Göre Aylık Ödeme Gücü Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const gelir = h.pos(v.gelir, 'Aylık net gelir');
    const gider = h.opt(v.gider, 0, 'Aylık sabit giderler');
    const mevcut = h.opt(v.mevcut, 0, 'Mevcut aylık borç ödemeleri');
    const oran = h.opt(v.oran, 40, 'Borç/gelir oranı sınırı');
    if (gider < 0 || mevcut < 0) h.err('Gider ve borç ödemesi alanları negatif olamaz.');
    if (!(oran > 0) || oran > 100) h.err('"Borç/gelir oranı sınırı" 0\'dan büyük ve en fazla 100 olmalı.');
    const sinir = gelir * oran / 100;
    const kalan = gelir - gider - mevcut;
    const orandan = sinir - mevcut;
    const yeni = Math.max(0, Math.min(orandan, kalan));
    let neden;
    if (yeni <= 1e-9) neden = kalan <= 1e-9 ? 'Yeni taksit için bütçede pay yok' : 'Borç/gelir sınırı zaten dolmuş';
    else neden = kalan < orandan - 1e-9 ? 'Giderlerden kalan bütçe' : 'Borç/gelir oranı sınırı';
    return {
      rows: [
        ['Üstlenilebilecek en yüksek yeni taksit', h.para(yeni)],
        ['Belirleyici sınır', neden],
        ['Toplam borç ödeme sınırı', h.para(sinir)],
        ['Mevcut borç/gelir oranı', '%' + h.fmt(mevcut / gelir * 100, 2)],
        ['Yeni taksitle borç/gelir oranı', '%' + h.fmt((mevcut + yeni) / gelir * 100, 2)],
        ['Gider ve mevcut borçlardan sonra kalan', h.para(kalan)],
        ['Yeni taksitten sonra kalan', h.para(kalan - yeni)],
      ],
      note: 'Bu tutar bir üst sınırdır; beklenmedik harcamalar ve birikim için pay bırakmak üzere daha düşük bir taksit seçmek güvenlidir. Kredi kuruluşları kendi ölçütlerini uygular.',
    };
  }
