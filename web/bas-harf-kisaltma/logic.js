// Baş Harflerden Kısaltma Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const satirlar = h.lines(v.metin);
    if (!satirlar.length) h.err('Kısaltma oluşturmak için "Ad ya da ifade" alanına en az bir satır yazın.');
    const atlanacak = new Set(['ve', 'ile', 'veya', 'ya', 'da', 'de', 'için', 'ki', 'and', 'of', 'the', 'for', 'in', 'to']);
    const ilkHarf = (k) => { const m = /[\p{L}\p{N}]/u.exec(k); return m ? m[0] : ''; };
    let atlanan = 0;
    const sonuc = [];
    for (const satir of satirlar) {
      const kelimeler = satir.split(/[\s\-–—/]+/).filter((k) => ilkHarf(k) !== '');
      if (!kelimeler.length) continue;
      let secilen = kelimeler;
      if (v.baglac !== 'dahil') {
        const suz = kelimeler.filter((k) => !atlanacak.has(k.replace(/[^\p{L}\p{N}]/gu, '').toLocaleLowerCase('tr-TR')));
        if (suz.length) { atlanan += kelimeler.length - suz.length; secilen = suz; }
      }
      let harfler = secilen.map(ilkHarf);
      if (v.bicim === 'kucuk') harfler = harfler.map((x) => x.toLocaleLowerCase('tr-TR'));
      else if (v.bicim !== 'asil') harfler = harfler.map((x) => x.toLocaleUpperCase('tr-TR'));
      const kisa = v.bicim === 'noktali' ? harfler.map((x) => x + '.').join('') : harfler.join('');
      sonuc.push({ kisa, satir, adet: harfler.length });
    }
    if (!sonuc.length) h.err('Yazdığınız satırlarda harf ya da rakam bulunamadı. Kelimelerden oluşan bir ad yazın.');
    return {
      rows: [
        ['Kısaltma', sonuc[0].kisa],
        ['Harf sayısı', String(sonuc[0].adet)],
        ['İşlenen satır', String(sonuc.length)],
        ['Atlanan bağlaç', String(atlanan)],
      ],
      text: sonuc.map((s) => (v.cikti === 'acilim' ? `${s.kisa} = ${s.satir}` : s.kisa)).join('\n'),
      note: 'Araç baş harfleri mekanik olarak birleştirir; kurumların resmî kısaltmaları bundan farklı olabilir.',
    };
  }
