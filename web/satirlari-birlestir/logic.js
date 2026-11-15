// Satırları Birleştirme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ham = String(v.metin ?? '');
    if (ham.trim() === '') h.err('"Satırlar" alanına birleştirilecek metni yazın.');
    const ayraclar = { bosluk: ' ', yok: '', virgul: ', ', noktalivirgul: '; ', dikey: ' | ', sekme: '\t' };
    let ayr;
    if (v.ayrac === 'ozel') {
      ayr = String(v.ozelAyrac ?? '');
      if (ayr === '') h.err('"Özel ayraç" alanına satırların arasına konacak ifadeyi yazın ya da listeden hazır bir ayraç seçin.');
    } else ayr = ayraclar[v.ayrac] ?? ' ';
    let satirlar = ham.replace(/\r\n?/g, '\n').split('\n');
    while (satirlar.length && satirlar[satirlar.length - 1].trim() === '') satirlar.pop();
    while (satirlar.length && satirlar[0].trim() === '') satirlar.shift();
    const toplam = satirlar.length;
    if (v.kirp !== 'hayir') satirlar = satirlar.map((s) => s.trim());
    const bos = satirlar.filter((s) => s.trim() === '').length;
    let sonuc, cikisSatir = 1;
    if (v.bosSatir === 'paragraf') {
      const paragraflar = [];
      let grup = [];
      for (const s of satirlar) {
        if (s.trim() === '') { if (grup.length) { paragraflar.push(grup.join(ayr)); grup = []; } }
        else grup.push(s);
      }
      if (grup.length) paragraflar.push(grup.join(ayr));
      sonuc = paragraflar.join('\n');
      cikisSatir = paragraflar.length;
    } else if (v.bosSatir === 'koru') {
      sonuc = satirlar.map((s) => (s.trim() === '' ? '' : s)).join(ayr);
    } else {
      sonuc = satirlar.filter((s) => s.trim() !== '').join(ayr);
    }
    return {
      rows: [
        ['Birleştirilen satır', String(toplam - bos)],
        ['Boş satır', String(bos)],
        ['Sonuçtaki satır sayısı', String(cikisSatir)],
        ['Sonuç uzunluğu', `${Array.from(sonuc).length} karakter`],
      ],
      text: sonuc,
      note: v.bosSatir === 'paragraf' ? 'Boş satırla ayrılmış her paragraf kendi içinde birleştirildi; paragraflar ayrı satırlarda kaldı.'
        : 'Baştaki ve sondaki boş satırlar her durumda atılır.',
    };
  }
