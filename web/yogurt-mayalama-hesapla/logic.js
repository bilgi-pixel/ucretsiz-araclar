// Yoğurt Mayalama Oranı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const L = h.pos(v.sut, 'Süt miktarı');
    if (L > 1000) h.err('Süt miktarı en fazla 1000 litre olabilir.');
    const p = h.pos(v.mayaOran, 'Maya oranı');
    if (p > 10) h.err('Maya oranı 10\'dan büyük olamaz. Fazla maya yoğurdu ekşitir ve sulandırır; yaygın değerler 1 ile 3 arasındadır.');
    const maya = L * 10 * p;
    const sutG = L * 1030;
    return {
      rows: [
        ['Gereken maya', h.fmt(maya, 1) + ' g'],
        ['Yaklaşık yemek kaşığı', h.fmt(maya / 15, 1) + ' kaşık'],
        ['1 litre süte düşen maya', h.fmt(p * 10, 1) + ' g'],
        ['Yaklaşık yoğurt miktarı', h.fmt(sutG + maya, 0) + ' g'],
        ['Mayanın karışımdaki payı', '%' + h.fmt(maya / (sutG + maya) * 100, 2)],
      ],
      note: 'Bir yemek kaşığı yoğurt 15 g, bir litre süt 1.030 g kabul edilmiştir. Süt kaynatılırken suyu azaldığı için gerçek yoğurt miktarı biraz daha düşük olabilir.',
    };
  }
