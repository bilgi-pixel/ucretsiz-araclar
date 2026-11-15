// Nakit Dönüşüm Süresi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const stok = h.nonneg(v.stok, 'Ortalama stok');
    const alacak = h.nonneg(v.alacak, 'Ortalama ticari alacak');
    const borc = h.nonneg(v.borc, 'Ortalama ticari borç');
    const satis = h.pos(v.satis, 'Dönem net satışları');
    const smm = h.pos(v.smm, 'Dönem satışların maliyeti');
    const donem = h.pos(v.donem, 'Dönem gün sayısı');
    if (donem > 3660) h.err('"Dönem gün sayısı" en fazla 3660 olabilir; yıllık tablo için 365 yazın.');
    const gunlukSatis = satis / donem;
    const gunlukSmm = smm / donem;
    const stokGun = stok / gunlukSmm;
    const alacakGun = alacak / gunlukSatis;
    const borcGun = borc / gunlukSmm;
    const dongu = stokGun + alacakGun;
    const nds = dongu - borcGun;
    const ihtiyac = nds * gunlukSmm;
    const rows = [
      ['Nakit dönüşüm süresi', h.fmt(nds, 1) + ' gün'],
      ['Stokta kalma süresi', h.fmt(stokGun, 1) + ' gün'],
      ['Alacak tahsil süresi', h.fmt(alacakGun, 1) + ' gün'],
      ['Borç ödeme süresi', h.fmt(borcGun, 1) + ' gün'],
      ['Faaliyet döngüsü', h.fmt(dongu, 1) + ' gün'],
    ];
    if (nds > 0) rows.push(['Finanse edilen tutar (yaklaşık)', h.para(ihtiyac)]);
    let note;
    if (nds > 0) note = 'Pozitif süre, satıcıya ödeme yaptıktan sonra müşteriden tahsilat gelene kadar geçen günleri kendi kaynağınızla ya da krediyle finanse ettiğiniz anlamına gelir. Tutar, günlük satış maliyeti × süre ile bulunan kaba bir göstergedir.';
    else if (nds < 0) note = 'Negatif süre, tahsilatın satıcıya ödemeden önce geldiğini gösterir; faaliyetler satıcı kredisiyle finanse ediliyor demektir.';
    else note = 'Süre sıfır: tahsilat ile satıcı ödemesi ortalamada aynı güne denk geliyor.';
    return { rows, note };
  }
