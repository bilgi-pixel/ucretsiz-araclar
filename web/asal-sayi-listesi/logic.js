// Asal Sayı Listesi Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const alt = h.int(v.alt, 'Alt sınır');
    const ust = h.int(v.ust, 'Üst sınır');
    if (alt < 0 || ust < 0) h.err('Sınırlar negatif olamaz; asal sayılar pozitif tam sayılardır.');
    if (alt > ust) h.err('Alt sınır üst sınırdan büyük olamaz; iki değerin yerini değiştirin.');
    if (ust > 10000000) h.err('Üst sınır en fazla 10.000.000 olabilir; daha küçük bir değer yazın.');
    if (ust - alt > 1000000) h.err('Aralık çok geniş; alt ve üst sınır arasındaki fark en fazla 1.000.000 olabilir.');
    // Eratosten kalburu: bilesik[i] = 1 ise i asal değildir
    const bilesik = new Uint8Array(ust + 1);
    for (let i = 2; i * i <= ust; i++) {
      if (bilesik[i]) continue;
      for (let j = i * i; j <= ust; j += i) bilesik[j] = 1;
    }
    const liste = [];
    let toplam = 0, ikiz = 0;
    for (let i = Math.max(alt, 2); i <= ust; i++) {
      if (bilesik[i]) continue;
      if (liste.length && i - liste[liste.length - 1] === 2) ikiz++;
      liste.push(i);
      toplam += i;
    }
    const f = (x) => h.fmt(x, 0);
    const aralik = `${f(alt)} – ${f(ust)}`;
    if (!liste.length) {
      return {
        rows: [['Asal sayı adedi', '0'], ['Aralık', aralik]],
        note: 'Bu aralıkta hiç asal sayı yok. Aralığı genişleterek yeniden deneyin.',
      };
    }
    const ayir = v.ayrac === 'satir' ? '\n' : v.ayrac === 'bosluk' ? ' ' : ', ';
    return {
      rows: [
        ['Asal sayı adedi', f(liste.length)],
        ['Aralık', aralik],
        ['En küçük asal', f(liste[0])],
        ['En büyük asal', f(liste[liste.length - 1])],
        ['Asal sayıların toplamı', f(toplam)],
        ['İkiz asal çifti sayısı', f(ikiz)],
      ],
      text: liste.join(ayir),
      note: 'Sınır değerleri aralığa dahildir. Listedeki sayılar kopyalamaya uygun olsun diye binlik ayraçsız yazılır.',
    };
  }
