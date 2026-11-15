// Harf Frekansı Analizi — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const metin = String(v.metin ?? '');
    if (metin.trim() === '') h.err('Analiz edilecek metni yazın.');
    if (metin.length > 2000000) h.err('Metin 2.000.000 karakterden uzun; parçalara bölerek deneyin.');
    const rakamDahil = v.kapsam === 'rakam';
    const sayac = new Map();
    let toplam = 0;
    for (const c of metin.normalize('NFC')) {
      const harfMi = /\p{L}/u.test(c);
      if (!harfMi && !(rakamDahil && /\p{Nd}/u.test(c))) continue;
      let k = c;
      if (harfMi && v.harf !== 'ayir') k = c === 'I' ? 'ı' : c === 'İ' ? 'i' : c.toLowerCase();
      sayac.set(k, (sayac.get(k) || 0) + 1);
      toplam++;
    }
    if (!toplam) h.err(rakamDahil ? 'Metinde harf ya da rakam bulunamadı.' : 'Metinde harf bulunamadı; harf içeren bir metin yazın ya da rakamları da saymayı seçin.');
    const sikSirali = [...sayac.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'tr'));
    const liste = v.sira === 'alfabe' ? [...sayac.entries()].sort((a, b) => a[0].localeCompare(b[0], 'tr') || (a[0] < b[0] ? -1 : 1)) : sikSirali;
    const yuzde = (n) => '%' + h.fmt((n / toplam) * 100, 1);
    const enCok = sikSirali[0], enAz = sikSirali[sikSirali.length - 1];
    const rows = [
      [rakamDahil ? 'Toplam harf ve rakam' : 'Toplam harf', h.fmt(toplam, 0)],
      [rakamDahil ? 'Farklı karakter' : 'Farklı harf', h.fmt(sayac.size, 0)],
      ['En sık', `${enCok[0]} (${h.fmt(enCok[1], 0)} kez)`],
      ['En seyrek', `${enAz[0]} (${h.fmt(enAz[1], 0)} kez)`],
    ];
    liste.slice(0, 100).forEach(([k, n]) => rows.push([k, `${h.fmt(n, 0)} kez (${yuzde(n)})`]));
    return {
      rows,
      text: ['Harf\tAdet\tYüzde'].concat(liste.map(([k, n]) => `${k}\t${n}\t${yuzde(n)}`)).join('\n'),
      note: 'Boşluk ve noktalama işaretleri sayılmaz; yüzdeler sayılan karakterlerin toplamına göredir.',
    };
  }
