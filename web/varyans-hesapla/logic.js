// Varyans Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.nums(v.sayilar, 'Sayılar');
    const n = a.length;
    const orneklem = v.tur !== 'anakutle';
    if (orneklem && n < 2) h.err('Örneklem varyansı için en az iki sayı gerekir. Veri ekleyin ya da "Anakütle varyansı" türünü seçin.');
    const toplam = a.reduce((s, x) => s + x, 0);
    const ort = toplam / n;
    const kareToplam = a.reduce((s, x) => s + x * x, 0);
    const kt = a.reduce((s, x) => s + (x - ort) * (x - ort), 0);
    const bolen = orneklem ? n - 1 : n;
    const varyans = kt / bolen;
    const satirlar = a.slice(0, 100).map((x) => `${h.fmt(x, 4)}\t${h.fmt(x - ort, 4)}\t${h.fmt((x - ort) * (x - ort), 4)}`);
    return {
      rows: [
        [orneklem ? 'Varyans (s²)' : 'Varyans (σ²)', h.fmt(varyans, 4)],
        ['Standart sapma', h.fmt(Math.sqrt(varyans), 4)],
        ['Aritmetik ortalama', h.fmt(ort, 4)],
        ['Sapma kareleri toplamı', h.fmt(kt, 4)],
        ['Değerlerin kareleri toplamı (Σx²)', h.fmt(kareToplam, 4)],
        ['Veri sayısı (n)', String(n)],
        ['Bölen', orneklem ? `n − 1 = ${bolen}` : `n = ${bolen}`],
      ],
      text: 'Değer\tSapma\tSapma karesi\n' + satirlar.join('\n') + (n > 100 ? '\n…' : '') + `\nToplam\t0\t${h.fmt(kt, 4)}`,
      note: 'Varyansın birimi, verinin biriminin karesidir. Veriyle aynı birimde bir yayılım ölçüsü için standart sapma satırına bakın.',
    };
  }
