// Standart Sapma Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.nums(v.sayilar, 'Sayılar');
    const n = a.length;
    const orneklem = v.tur !== 'anakutle';
    if (orneklem && n < 2) h.err('Örneklem standart sapması için en az iki sayı gerekir. Tek değeriniz varsa "Anakütle" türünü seçin ya da veri ekleyin.');
    const toplam = a.reduce((s, x) => s + x, 0);
    const ort = toplam / n;
    const kt = a.reduce((s, x) => s + (x - ort) * (x - ort), 0);
    const bolen = orneklem ? n - 1 : n;
    const varyans = kt / bolen;
    const ss = Math.sqrt(varyans);
    const rows = [
      [orneklem ? 'Standart sapma (s)' : 'Standart sapma (σ)', h.fmt(ss, 4)],
      ['Varyans', h.fmt(varyans, 4)],
      ['Aritmetik ortalama', h.fmt(ort, 4)],
      ['Sapma kareleri toplamı', h.fmt(kt, 4)],
      ['Veri sayısı (n)', String(n)],
      ['Bölen', orneklem ? `n − 1 = ${bolen}` : `n = ${bolen}`],
      ['Ortalama ± 1 standart sapma', `${h.fmt(ort - ss, 4)} ile ${h.fmt(ort + ss, 4)} arası`],
    ];
    if (Math.abs(ort) > 1e-12) rows.push(['Değişim katsayısı', '% ' + h.fmt((ss / Math.abs(ort)) * 100, 2)]);
    return {
      rows,
      note: orneklem
        ? 'Örneklem formülü kullanıldı: sapma kareleri toplamı n − 1\'e bölündü.'
        : 'Anakütle formülü kullanıldı: sapma kareleri toplamı n\'ye bölündü.',
    };
  }
