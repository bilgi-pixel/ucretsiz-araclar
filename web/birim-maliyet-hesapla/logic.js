// Birim Maliyet Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ham = h.nonneg(v.hammadde, 'Hammadde ve malzeme gideri');
    const isc = h.opt(v.iscilik, 0, 'Direkt işçilik gideri');
    const gen = h.opt(v.genel, 0, 'Genel üretim giderleri');
    if (isc < 0) h.err('"Direkt işçilik gideri" negatif olamaz.');
    if (gen < 0) h.err('"Genel üretim giderleri" negatif olamaz.');
    const miktar = h.pos(v.miktar, 'Üretilen miktar');
    const fire = h.opt(v.fire, 0, 'Fire / satılamayan miktar');
    if (fire < 0) h.err('"Fire / satılamayan miktar" negatif olamaz.');
    if (fire >= miktar) h.err('Fire miktarı üretilen miktardan küçük olmalı; satılabilir en az bir miktar kalmalıdır.');
    const toplam = ham + isc + gen;
    if (!(toplam > 0)) h.err('Toplam maliyet sıfır olamaz; en az bir gider kalemine tutar yazın.');
    const saglam = miktar - fire;
    const birim = toplam / saglam;
    const firesiz = toplam / miktar;
    const rows = [
      ['Birim maliyet', h.para(birim)],
      ['Toplam maliyet', h.para(toplam)],
      ['Satılabilir miktar', h.fmt(saglam, 3)],
      ['Birim hammadde payı', h.para(ham / saglam)],
      ['Birim işçilik payı', h.para(isc / saglam)],
      ['Birim genel gider payı', h.para(gen / saglam)],
    ];
    if (fire > 0) {
      rows.push(['Fire oranı', '%' + h.fmt((fire / miktar) * 100, 2)]);
      rows.push(['Firenin birim maliyete etkisi', h.para(birim - firesiz)]);
    }
    if (String(v.kar ?? '').trim() !== '') {
      const kar = h.nonneg(v.kar, 'Maliyet üzerine kâr oranı');
      const satis = birim * (1 + kar / 100);
      rows.push(['Satış fiyatı (KDV hariç)', h.para(satis)]);
      rows.push(['Birim kâr', h.para(satis - birim)]);
      rows.push(['Satış fiyatı üzerinden kâr marjı', '%' + h.fmt(((satis - birim) / satis) * 100, 2)]);
    }
    return {
      rows,
      note: 'Birim maliyet = toplam maliyet ÷ satılabilir miktar. Tutarlar KDV hariç girilmelidir; sonuç bilgilendirme amaçlıdır.',
    };
  }
