// Ağırlıklı Ortalama Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nums(v.degerler, 'Değerler');
    const w = h.nums(v.agirliklar, 'Ağırlıklar');
    if (x.length !== w.length) h.err(`Değer sayısı (${x.length}) ile ağırlık sayısı (${w.length}) eşit olmalı. Her değerin karşısına bir ağırlık yazın.`);
    if (w.some((a) => a < 0)) h.err('Ağırlıklar negatif olamaz. Hesaba katmak istemediğiniz değerin ağırlığını 0 yazın.');
    const wt = w.reduce((s, a) => s + a, 0);
    if (!(wt > 0)) h.err('Ağırlıkların toplamı sıfırdan büyük olmalı; en az bir ağırlık pozitif olsun.');
    const carpimlar = x.map((a, i) => a * w[i]);
    const at = carpimlar.reduce((s, a) => s + a, 0);
    const basit = x.reduce((s, a) => s + a, 0) / x.length;
    const satirlar = x.slice(0, 200).map((a, i) => `${h.fmt(a, 4)}\t${h.fmt(w[i], 4)}\t${h.fmt(carpimlar[i], 4)}\t% ${h.fmt((w[i] / wt) * 100, 2)}`);
    return {
      rows: [
        ['Ağırlıklı ortalama', h.fmt(at / wt, 4)],
        ['Ağırlıklı toplam (Σ değer × ağırlık)', h.fmt(at, 4)],
        ['Ağırlıkların toplamı', h.fmt(wt, 4)],
        ['Basit (ağırlıksız) ortalama', h.fmt(basit, 4)],
        ['Değer sayısı', String(x.length)],
      ],
      text: 'Değer\tAğırlık\tÇarpım\tPay\n' + satirlar.join('\n') + (x.length > 200 ? '\n…' : ''),
      note: 'Ağırlıkların toplamının 1 ya da 100 olması gerekmez; araç ağırlıklı toplamı ağırlıkların toplamına böler.',
    };
  }
