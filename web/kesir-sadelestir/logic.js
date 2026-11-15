// Kesir Sadeleştirme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let a = h.int(v.pay, 'Pay');
    let b = h.int(v.payda, 'Payda');
    if (b === 0) h.err('Payda sıfır olamaz; sıfıra bölme tanımsızdır. Sıfırdan farklı bir payda yazın.');
    if (Math.abs(a) > 1e15 || Math.abs(b) > 1e15) h.err('Pay ve payda en fazla 15 basamaklı olabilir; daha küçük sayılar yazın.');
    if (b < 0) { a = -a; b = -b; }
    let x = Math.abs(a), y = b;
    while (y) { const t = x % y; x = y; y = t; }
    const g = x;
    const p = a / g, q = b / g;
    const isaret = p < 0 ? '-' : '';
    const m = Math.abs(p);
    const sade = q === 1 ? `${isaret}${m}` : `${isaret}${m}/${q}`;
    let tamli;
    if (q === 1) tamli = 'Sonuç tam sayı';
    else if (m < q) tamli = 'Yok (basit kesir)';
    else tamli = `${isaret}${Math.floor(m / q)} tam ${m % q}/${q}`;
    return {
      rows: [
        ['Sade kesir', sade],
        ['EBOB', String(g)],
        ['Tam sayılı gösterim', tamli],
        ['Ondalık değer', h.fmt(p / q, 6)],
        ['Yüzde', '%' + h.fmt((p / q) * 100, 4)],
      ],
      note: g === 1 ? 'Pay ve payda aralarında asal olduğu için kesir zaten en sade hâlindedir.' : `Pay ve payda ${g} sayısına bölünerek sadeleştirildi.`,
    };
  }
