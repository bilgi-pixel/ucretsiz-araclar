// Polinom Değeri Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let k = h.nums(v.katsayilar, 'Katsayılar');
    if (k.length > 31) h.err('En fazla 30. dereceden polinom girebilirsiniz (31 katsayı).');
    const x = h.num(v.x, 'x değeri');
    while (k.length > 1 && k[0] === 0) k = k.slice(1);
    const n = k.length - 1;
    const sifirPol = n === 0 && k[0] === 0;
    const us = (d) => String(d).split('').map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+c]).join('');
    let pol = '';
    k.forEach((c, i) => {
      if (c === 0) return;
      const d = n - i, m = Math.abs(c);
      const govde = (d === 0 || m !== 1 ? h.fmt(m, 6) : '') + (d === 0 ? '' : d === 1 ? 'x' : 'x' + us(d));
      pol += pol === '' ? (c < 0 ? '-' : '') + govde : (c < 0 ? ' - ' : ' + ') + govde;
    });
    if (pol === '') pol = '0';
    const par = (s) => (s < 0 ? '(' + h.fmt(s, 6) + ')' : h.fmt(s, 6));
    let p = k[0], t = 0;
    const adimlar = [`Başlangıç: ${h.fmt(k[0], 6)}`];
    for (let i = 1; i <= n; i++) {
      t = t * x + p;
      const yeni = p * x + k[i];
      adimlar.push(`${par(p)} × ${par(x)} + ${par(k[i])} = ${h.fmt(yeni, 6)}`);
      p = yeni;
    }
    if (!Number.isFinite(p) || !Number.isFinite(t)) h.err('Sonuç gösterilemeyecek kadar büyük; daha küçük bir x değeri ya da daha düşük dereceli bir polinom deneyin.');
    return {
      rows: [
        ['P(x)', h.fmt(p, 6)],
        ['Polinom', 'P(x) = ' + pol],
        ['Derece', sifirPol ? 'tanımsız (sıfır polinomu)' : String(n)],
        ['Türev değeri P′(x)', h.fmt(t, 6)],
        ['Sabit terim P(0)', h.fmt(k[n], 6)],
        ['Katsayılar toplamı P(1)', h.fmt(k.reduce((a, c) => a + c, 0), 6)],
      ],
      text: `x = ${h.fmt(x, 6)} için Horner adımları\n` + adimlar.join('\n') + `\nP(${h.fmt(x, 6)}) = ${h.fmt(p, 6)}`,
      note: p === 0 ? 'P(x) = 0 çıktı: bu x değeri polinomun bir köküdür.' : 'Sonuçlar en fazla altı ondalık basamakla gösterilir.',
    };
  }
