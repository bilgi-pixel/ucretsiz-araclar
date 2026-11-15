// Mangal Et Miktarı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const PORSIYON = { karisik: 300, kemiksiz: 250, kemikli: 400 };
    const KATSAYI = { normal: 1, az: 0.8, cok: 1.25 };
    const yet = h.int(v.yetiskin, 'Yetişkin sayısı');
    const coc = h.int(v.cocuk === '' ? '0' : v.cocuk, 'Çocuk sayısı');
    if (yet < 0 || coc < 0) h.err('Kişi sayıları negatif olamaz.');
    if (yet + coc < 1) h.err('En az bir kişi girin.');
    if (yet + coc > 5000) h.err('En fazla 5.000 kişi için hesap yapılır.');
    const por = (PORSIYON[v.tur] || 300) * (KATSAYI[v.istah] || 1);
    const gram = (yet + coc * 0.5) * por;
    const kg = gram / 1000;
    const rows = [
      ['Toplam çiğ et', h.fmt(kg, 2) + ' kg'],
      ['Yetişkin porsiyonu', h.fmt(por, 0) + ' g'],
      ['Çocuk porsiyonu', h.fmt(por / 2, 0) + ' g'],
      ['Mangal kömürü (yaklaşık)', h.fmt(Math.max(2, kg), 1) + ' kg'],
    ];
    if (String(v.fiyat || '').trim() !== '') {
      const f = h.pos(v.fiyat, 'Etin kilo fiyatı');
      rows.push(['Tahmini et tutarı', h.para(kg * f)]);
      rows.push(['Kişi başı tutar', h.para(kg * f / (yet + coc))]);
    }
    return {
      rows,
      note: 'Porsiyonlar çiğ ağırlıktır. Kömür tahmini, 1 kg et için yaklaşık 1 kg kömür ve en az 2 kg alt sınırıyla verilir; mangalın boyutu ve kömürün cinsi bu miktarı değiştirir.',
    };
  }
