// Elips Alanı ve Çevresi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let p = h.pos(v.eksen1, 'Birinci eksen ölçüsü');
    let q = h.pos(v.eksen2, 'İkinci eksen ölçüsü');
    if (v.tur === 'tam') { p /= 2; q /= 2; }
    const a = Math.max(p, q);
    const b = Math.min(p, q);
    // Çevre: aritmetik-geometrik ortalama (AGM) ile ikinci tür tam eliptik integral
    let an = a, bn = b, cn2 = a * a - b * b, toplam = cn2 / 2, kat = 1;
    for (let i = 0; i < 40 && Math.abs(an - bn) > 1e-15 * an; i++) {
      const c = (an - bn) / 2;
      const yeniA = (an + bn) / 2;
      bn = Math.sqrt(an * bn);
      an = yeniA;
      toplam += kat * c * c;
      kat *= 2;
    }
    const cevre = 2 * Math.PI / an * (a * a - toplam);
    const c = Math.sqrt(Math.max(0, a * a - b * b));
    return {
      rows: [
        ['Alan', h.fmt(Math.PI * a * b, 4) + ' birim²'],
        ['Çevre', h.fmt(cevre, 4) + ' birim'],
        ['Büyük yarı eksen (a)', h.fmt(a, 4) + ' birim'],
        ['Küçük yarı eksen (b)', h.fmt(b, 4) + ' birim'],
        ['Dış merkezlik (e)', h.fmt(c / a, 4)],
        ['Odağın merkeze uzaklığı (c)', h.fmt(c, 4) + ' birim'],
      ],
      note: 'Alan = π·a·b. Çevre, eliptik integralin sayısal çözümüyle hesaplanır. İki eksen eşitse şekil dairedir.',
    };
  }
