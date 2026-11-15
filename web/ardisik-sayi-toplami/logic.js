// Ardışık Sayıların Toplamı — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.int(v.bas, 'Başlangıç sayısı');
    const b = h.int(v.bit, 'Bitiş sayısı');
    if (Math.abs(a) > 1e12 || Math.abs(b) > 1e12) h.err('Sayılar en fazla 13 basamaklı olabilir; daha küçük bir aralık yazın.');
    if (a > b) h.err('Başlangıç sayısı bitiş sayısından büyük olamaz; iki değerin yerini değiştirin.');
    let ilk = BigInt(a), son = BigInt(b), adim = 1n;
    const mod2 = (x) => ((x % 2n) + 2n) % 2n;
    if (v.tur === 'tek' || v.tur === 'cift') {
      const hedef = v.tur === 'tek' ? 1n : 0n;
      adim = 2n;
      if (mod2(ilk) !== hedef) ilk += 1n;
      if (mod2(son) !== hedef) son -= 1n;
      if (ilk > son) h.err(v.tur === 'tek' ? 'Bu aralıkta tek sayı yok; aralığı genişletin.' : 'Bu aralıkta çift sayı yok; aralığı genişletin.');
    }
    const n = (son - ilk) / adim + 1n;
    const ikiKat = (ilk + son) * n; // toplamın iki katı; her zaman çifttir
    const toplam = ikiKat / 2n;
    const tr = (x) => x.toLocaleString('tr-TR');
    const us = ilk + son;
    const mutlak = us < 0n ? -us : us;
    const ort = us % 2n === 0n ? tr(us / 2n) : (us < 0n ? '-' : '') + tr(mutlak / 2n) + ',5';
    return {
      rows: [
        ['Toplam', tr(toplam)],
        ['Terim sayısı', tr(n)],
        ['İlk terim', tr(ilk)],
        ['Son terim', tr(son)],
        ['Ortalama', ort],
      ],
      note: 'Toplam = terim sayısı × (ilk terim + son terim) ÷ 2. Başlangıç ve bitiş sayıları toplama dahildir.',
    };
  }
