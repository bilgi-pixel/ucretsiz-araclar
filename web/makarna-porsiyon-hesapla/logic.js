// Makarna Porsiyon Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const PORSIYON = { kuru: { ana: 100, yan: 60 }, taze: { ana: 130, yan: 80 } };
    const yet = h.int(v.yetiskin, 'Yetişkin sayısı');
    const coc = h.int(v.cocuk === '' ? '0' : v.cocuk, 'Çocuk sayısı');
    if (yet < 0 || coc < 0) h.err('Kişi sayıları negatif olamaz.');
    if (yet + coc < 1) h.err('En az bir kişi girin.');
    if (yet + coc > 2000) h.err('En fazla 2.000 kişi için hesap yapılır.');
    const paket = h.pos(v.paket === '' ? '500' : v.paket, 'Paket ağırlığı');
    const tur = v.tur === 'taze' ? 'taze' : 'kuru';
    const ogun = v.ogun === 'yan' ? 'yan' : 'ana';
    const por = PORSIYON[tur][ogun];
    const toplam = yet * por + coc * por * 0.6;
    const su = toplam / 100;
    const tuz = su * 10;
    const rows = [
      ['Toplam makarna', h.fmt(toplam, 0) + ' g'],
      ['Yetişkin porsiyonu', h.fmt(por, 0) + ' g'],
      ['Çocuk porsiyonu', h.fmt(por * 0.6, 0) + ' g'],
      ['Gereken paket', Math.ceil(toplam / paket - 1e-9) + ' paket (' + h.fmt(toplam / paket, 2) + ' paket karşılığı)'],
      ['Haşlama suyu', h.fmt(su, 1) + ' litre'],
      ['Suya atılacak tuz', h.fmt(tuz, 0) + ' g'],
    ];
    if (tur === 'kuru') rows.push(['Pişmiş ağırlık (yaklaşık)', h.fmt(toplam * 2.25, 0) + ' g']);
    return {
      rows,
      note: 'Su ve tuz, 100 g makarnaya 1 litre su ve 10 g tuz kuralıyla hesaplanır. Pişmiş ağırlık kuru makarnanın yaklaşık 2,25 katıdır; şekle ve pişirme süresine göre değişir.',
    };
  }
