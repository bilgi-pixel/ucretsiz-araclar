// Pascal Üçgeni Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const n = h.posint(v.satir, 'Satır sayısı');
    if (n > 40) h.err('Satır sayısı en fazla 40 olabilir; daha küçük bir değer yazın.');
    const satirlar = [];
    let onceki = [];
    for (let i = 0; i < n; i++) {
      const s = [];
      for (let j = 0; j <= i; j++) s.push(j === 0 || j === i ? 1 : onceki[j - 1] + onceki[j]);
      satirlar.push(s);
      onceki = s;
    }
    const yazi = satirlar.map((s) => s.join(' '));
    const gen = yazi[n - 1].length;
    const text = (v.bicim === 'ortali' ? yazi.map((t) => ' '.repeat(Math.floor((gen - t.length) / 2)) + t) : yazi).join('\n');
    const son = satirlar[n - 1];
    return {
      rows: [
        ['Satır sayısı', String(n)],
        ['Son satır', `n = ${n - 1} (${n} terim)`],
        ['Son satırın toplamı', h.fmt(son.reduce((a, b) => a + b, 0), 0)],
        ['En büyük sayı', h.fmt(Math.max(...son), 0)],
        ['Üçgendeki sayı adedi', h.fmt((n * (n + 1)) / 2, 0)],
      ],
      text,
      note: 'Satırlar n = 0\'dan başlayarak numaralanır: ilk satır (a + b)⁰, ikinci satır (a + b)¹ açılımının katsayılarıdır.',
    };
  }
