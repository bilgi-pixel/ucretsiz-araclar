// Kare ve Küp Tablosu Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.int(v.baslangic, 'Başlangıç sayısı');
    const b = h.int(v.bitis, 'Bitiş sayısı');
    const d = h.posint(String(v.adim ?? '').trim() === '' ? '1' : v.adim, 'Artış miktarı');
    if (b < a) h.err('Bitiş sayısı başlangıç sayısından küçük olamaz; iki değerin yerini değiştirin.');
    if (Math.abs(a) > 10000 || Math.abs(b) > 10000) h.err('Başlangıç ve bitiş sayıları −10.000 ile 10.000 arasında olmalı.');
    const adet = Math.floor((b - a) / d) + 1;
    if (adet > 1000) h.err('Tablo en fazla 1.000 satır olabilir; aralığı daraltın ya da artış miktarını büyütün.');
    const ay = v.ayirici === 'sekme' ? '\t' : ' | ';
    const satirlar = [['n', 'n²', 'n³'].join(ay)];
    let t1 = 0, t2 = 0, t3 = 0;
    for (let n = a; n <= b; n += d) {
      const k = n * n, p = k * n;
      t1 += n; t2 += k; t3 += p;
      satirlar.push([n, k, p].join(ay));
    }
    return {
      rows: [
        ['Sayı adedi', h.fmt(adet, 0)],
        ['Kareler toplamı', h.fmt(t2, 0)],
        ['Küpler toplamı', h.fmt(t3, 0)],
        ['Sayıların toplamı', h.fmt(t1, 0)],
      ],
      text: satirlar.join('\n'),
      note: 'Tablodaki sayılar kopyalamaya uygun olması için binlik ayırıcı olmadan yazılır. Negatif sayının karesi pozitif, küpü negatiftir.',
    };
  }
