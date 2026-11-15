// Binde Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    if (v.islem === 'oran') {
      const s = h.num(v.sayi, 'Ana sayı (tutar)');
      const a = h.num(v.deger, 'Karşılaştırılan sayı');
      if (s === 0) h.err('Ana sayı sıfır olamaz; bir sayının sıfıra oranı hesaplanamaz. Sıfırdan farklı bir ana sayı yazın.');
      const o = a / s;
      return {
        rows: [
          ['Binde oranı', '‰' + h.fmt(o * 1000, 4)],
          ['Yüzde karşılığı', '%' + h.fmt(o * 100, 5)],
          ['Ondalık oran', h.fmt(o, 8)],
        ],
        note: `İşlem: ${h.fmt(a, 6)} ÷ ${h.fmt(s, 6)} × 1000.`,
      };
    }
    const s = h.num(v.sayi, 'Ana sayı (tutar)');
    const x = h.nonneg(v.deger, 'Binde oranı');
    const pay = (s * x) / 1000;
    const yuzde = ['Yüzde karşılığı', '%' + h.fmt(x / 10, 5)];
    if (v.islem === 'ekle') {
      return {
        rows: [['Sonuç', h.fmt(s + pay, 4)], ['Eklenen tutar', h.fmt(pay, 4)], yuzde],
        note: `İşlem: ${h.fmt(s, 6)} × (1 + ${h.fmt(x, 6)} ÷ 1000).`,
      };
    }
    if (v.islem === 'cikar') {
      return {
        rows: [['Sonuç', h.fmt(s - pay, 4)], ['Çıkarılan tutar', h.fmt(pay, 4)], yuzde],
        note: `İşlem: ${h.fmt(s, 6)} × (1 − ${h.fmt(x, 6)} ÷ 1000).`,
      };
    }
    return {
      rows: [['Sonuç', h.fmt(pay, 4)], yuzde, ['Ondalık çarpan', h.fmt(x / 1000, 8)]],
      note: `İşlem: ${h.fmt(s, 6)} × ${h.fmt(x, 6)} ÷ 1000.`,
    };
  }
