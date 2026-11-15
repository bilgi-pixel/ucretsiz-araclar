// Yüzdeyi Kesre ve Ondalığa Çevirme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ham = String(v.yuzde ?? '').replace(/%/g, '').trim();
    const n = h.num(ham, 'Yüzde değeri');
    if (Math.abs(n) > 1e6) h.err('Yüzde değeri en fazla 1.000.000 olabilir; daha küçük bir değer yazın.');
    // Altı ondalığa sabitle, sondaki sıfırları at: tam pay/payda elde etmek için
    let s = Math.abs(n).toFixed(6);
    s = s.replace(/0+$/, '').replace(/\.$/, '');
    const nokta = s.indexOf('.');
    const k = nokta < 0 ? 0 : s.length - nokta - 1;
    const hamPay = BigInt(s.replace('.', ''));
    const hamPayda = 100n * 10n ** BigInt(k);
    let x = hamPay, y = hamPayda;
    while (y) { const t = x % y; x = y; y = t; }
    const g = x === 0n ? 1n : x;
    const p = hamPay / g, q = hamPay === 0n ? 1n : hamPayda / g;
    const isaret = n < 0 && hamPay !== 0n ? '-' : '';
    const rows = [
      ['Kesir (sade)', q === 1n ? `${isaret}${p}` : `${isaret}${p}/${q}`],
      ['Ondalık sayı', h.fmt(n / 100, 8)],
      ['Sadeleşmemiş kesir', `${isaret}${hamPay}/${hamPayda}`],
    ];
    if (q !== 1n && p > q) rows.push(['Tam sayılı kesir', `${isaret}${p / q} tam ${p % q}/${q}`]);
    rows.push(['Binde karşılığı', '‰' + h.fmt(n * 10, 5)]);
    return {
      rows,
      note: `%${h.fmt(n, 6)}, 100 parçanın ${h.fmt(n, 6)} tanesi demektir. Kesir, pay ve payda ${g} sayısına bölünerek sadeleştirildi.`,
    };
  }
