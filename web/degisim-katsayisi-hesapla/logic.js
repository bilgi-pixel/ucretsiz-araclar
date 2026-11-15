// Değişim Katsayısı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nums(v.sayilar, 'Veriler');
    const n = x.length;
    if (n > 100000) h.err('En fazla 100.000 veri girebilirsiniz.');
    const orneklem = v.tur !== 'anakutle';
    if (orneklem && n < 2) h.err('Örneklem standart sapması için en az 2 veri girin.');
    let top = 0;
    for (const a of x) top += a;
    const ort = top / n;
    let kareTop = 0;
    for (const a of x) kareTop += (a - ort) * (a - ort);
    const varyans = kareTop / (orneklem ? n - 1 : n);
    const ss = Math.sqrt(varyans);
    if (Math.abs(ort) < 1e-12) h.err('Verilerin ortalaması sıfır olduğu için değişim katsayısı tanımsızdır (sıfıra bölme).');
    const cv = ss / Math.abs(ort) * 100;
    let note = 'Değişim katsayısı = standart sapma ÷ ortalama × 100. Yalnızca gerçek sıfır noktası olan (oran ölçeğindeki) pozitif büyüklüklerde anlamlıdır.';
    if (x.some((a) => a < 0)) note = 'Veride negatif değerler var; hesapta ortalamanın mutlak değeri kullanıldı, ancak böyle verilerde değişim katsayısının yorumu güvenilir değildir. ' + note;
    return {
      rows: [
        ['Değişim katsayısı', '%' + h.fmt(cv, 2)],
        ['Ortalama', h.fmt(ort, 4)],
        [orneklem ? 'Standart sapma (örneklem)' : 'Standart sapma (anakütle)', h.fmt(ss, 4)],
        ['Varyans', h.fmt(varyans, 4)],
        ['Oran olarak (ondalık)', h.fmt(cv / 100, 4)],
        ['Veri sayısı', h.fmt(n, 0)],
      ],
      note,
    };
  }
