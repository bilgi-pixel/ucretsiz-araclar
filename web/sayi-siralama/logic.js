// Sayı Sıralama (Küçükten Büyüğe) — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let liste = h.nums(v.sayilar, 'Sayılar');
    if (liste.length > 20000) h.err('En fazla 20.000 sayı sıralanabilir; listeyi parçalara bölün.');
    const girilen = liste.length;
    if (v.tekrar === 'kaldir') liste = [...new Set(liste.map((x) => (x === 0 ? 0 : x)))];
    liste.sort((a, b) => a - b);
    const enKucuk = liste[0], enBuyuk = liste[liste.length - 1];
    if (v.yon === 'azalan') liste.reverse();
    const yaz = (x) => String(x === 0 ? 0 : x).replace('.', ',');
    const parcalar = liste.map(yaz);
    const rows = [
      ['Sıralı liste', parcalar.join('; ')],
      ['Sayı adedi', String(liste.length)],
      ['En küçük', yaz(enKucuk)],
      ['En büyük', yaz(enBuyuk)],
    ];
    if (v.tekrar === 'kaldir') rows.push(['Çıkarılan tekrar', String(girilen - liste.length)]);
    return {
      rows,
      text: parcalar.join('\n'),
      note: 'Alttaki kutuda aynı sıra, tabloya yapıştırmaya uygun biçimde her satırda bir sayı olacak şekilde verilir.',
    };
  }
