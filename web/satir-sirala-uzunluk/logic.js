// Satırları Uzunluğa Göre Sıralama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let satirlar = String(v.metin ?? '').replace(/\r\n?/g, '\n').split('\n').map((s) => s.replace(/\s+$/, ''));
    if (v.bos !== 'tut') satirlar = satirlar.filter((s) => s.trim() !== '');
    else while (satirlar.length && satirlar[satirlar.length - 1] === '') satirlar.pop();
    if (!satirlar.length) h.err('Sıralanacak satırları yazın; her satıra bir öğe gelmeli.');
    if (satirlar.length > 200000) h.err('En fazla 200.000 satır sıralanabilir; listeyi parçalara bölün.');
    const carpan = v.yon === 'azalan' ? -1 : 1;
    const alfabe = v.esit === 'alfabe';
    const kayit = satirlar.map((s, i) => ({ s, i, n: Array.from(s).length }));
    kayit.sort((a, b) => {
      if (a.n !== b.n) return (a.n - b.n) * carpan;
      if (alfabe) { const c = a.s.localeCompare(b.s, 'tr'); if (c) return c; }
      return a.i - b.i;
    });
    let enKisa = Infinity, enUzun = 0, toplam = 0;
    for (const k of kayit) { if (k.n < enKisa) enKisa = k.n; if (k.n > enUzun) enUzun = k.n; toplam += k.n; }
    return {
      rows: [
        ['Satır sayısı', h.fmt(kayit.length, 0)],
        ['En kısa satır', h.fmt(enKisa, 0) + ' karakter'],
        ['En uzun satır', h.fmt(enUzun, 0) + ' karakter'],
        ['Ortalama uzunluk', h.fmt(toplam / kayit.length, 1) + ' karakter'],
      ],
      text: kayit.map((k) => k.s).join('\n'),
      note: 'Uzunluk, boşluk ve noktalama dahil karakter sayısıdır; satır sonundaki boşluklar sayılmaz.',
    };
  }
