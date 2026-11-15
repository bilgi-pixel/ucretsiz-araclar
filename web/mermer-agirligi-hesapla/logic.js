// Mermer ve Granit Ağırlığı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const en = h.pos(v.en, 'En');
    const boy = h.pos(v.boy, 'Boy');
    const kal = h.pos(v.kalinlik, 'Kalınlık');
    const adet = h.posint(v.adet, 'Adet');
    let yog;
    if (String(v.ozel ?? '').trim() !== '') {
      yog = h.pos(v.ozel, 'Özel yoğunluk');
      if (yog < 500 || yog > 5000) h.err('Özel yoğunluk kg/m³ olarak yazılmalı; doğal taşlarda yaklaşık 2.000–3.200 arasındadır (örn. 2650).');
    } else {
      yog = Number(v.tas);
      if (![2700, 2750, 2450, 2500, 2900, 2400].includes(yog)) h.err('Taş cinsini listeden seçin.');
    }
    const alan = (en / 100) * (boy / 100);
    const hacim = alan * (kal / 100);
    const tek = hacim * yog;
    const toplam = tek * adet;
    const rows = [
      ['Toplam ağırlık', h.fmt(toplam, 2) + ' kg'],
      ['Tek parça ağırlığı', h.fmt(tek, 2) + ' kg'],
      ['m² ağırlığı', h.fmt(yog * kal / 100, 2) + ' kg/m²'],
      ['Toplam alan', h.fmt(alan * adet, 3) + ' m²'],
      ['Toplam hacim', h.fmt(hacim * adet, 4) + ' m³'],
      ['Kullanılan yoğunluk', h.fmt(yog, 0) + ' kg/m³'],
    ];
    if (toplam >= 1000) rows.splice(1, 0, ['Ton olarak', h.fmt(toplam / 1000, 3) + ' ton']);
    return {
      rows,
      note: 'Yoğunluklar tipik ortalama değerlerdir; aynı cins taş ocaktan ocağa birkaç yüzde farklılık gösterebilir.',
    };
  }
