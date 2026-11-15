// Kesir Karşılaştırma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const oku = (s, ad) => {
      const n = h.int(s, ad);
      if (Math.abs(n) > 1e12) h.err(`"${ad}" en fazla 12 basamaklı olabilir.`);
      return BigInt(n);
    };
    let a = oku(v.pay1, 'Birinci kesir – pay'), b = oku(v.payda1, 'Birinci kesir – payda');
    let c = oku(v.pay2, 'İkinci kesir – pay'), d = oku(v.payda2, 'İkinci kesir – payda');
    if (b === 0n || d === 0n) h.err('Payda sıfır olamaz; sıfıra bölme tanımsızdır. Her iki paydaya da sıfırdan farklı bir sayı yazın.');
    if (b < 0n) { a = -a; b = -b; }
    if (d < 0n) { c = -c; d = -d; }
    const mutlak = (x) => (x < 0n ? -x : x);
    const ebob = (x, y) => { x = mutlak(x); y = mutlak(y); while (y) { const t = x % y; x = y; y = t; } return x; };
    const ekok = (b / ebob(b, d)) * d;
    const g1 = a * (ekok / b), g2 = c * (ekok / d);
    const isaret = g1 > g2 ? '>' : g1 < g2 ? '<' : '=';
    const fp = mutlak(g1 - g2);
    const fg = fp === 0n ? 1n : ebob(fp, ekok);
    const fark = fp === 0n ? '0' : ekok / fg === 1n ? String(fp / fg) : `${fp / fg}/${ekok / fg}`;
    const k1 = `${a}/${b}`, k2 = `${c}/${d}`;
    const o1 = Number(a) / Number(b), o2 = Number(c) / Number(d);
    return {
      rows: [
        ['Sonuç', `${k1} ${isaret} ${k2}`],
        ['Ortak payda', String(ekok)],
        ['Eşit paydalı kesirler', `${g1}/${ekok} ve ${g2}/${ekok}`],
        ['Fark', fark],
        ['Ondalık değerler', `${h.fmt(o1, 6)} ve ${h.fmt(o2, 6)}`],
      ],
      note: isaret === '=' ? 'İki kesir denktir; aynı sayının farklı yazılışlarıdır.' : `Paydalar ${ekok} sayısında eşitlendi; payı büyük olan kesir daha büyüktür. Büyük olan: ${isaret === '>' ? k1 : k2}.`,
    };
  }
