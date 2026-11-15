// Art Arda Tekrarlanan Kelimeleri Bulma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const metin = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (metin.trim() === '') h.err('Tekrarları aramak için "Metin" alanına bir metin yapıştırın.');
    const re = /[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu;
    const kelimeler = [];
    let m;
    while ((m = re.exec(metin))) kelimeler.push({ k: m[0], b: m.index, s: m.index + m[0].length });
    if (!kelimeler.length) h.err('Metinde kelime bulunamadı. Harf içeren bir metin yapıştırın.');
    const anahtar = (k) => (v.harf === 'ayirt' ? k : k.toLocaleLowerCase('tr-TR'));
    const bulgular = [], sayac = new Map(), silinecek = [];
    for (let i = 1; i < kelimeler.length; i++) {
      const a = kelimeler[i - 1], b = kelimeler[i];
      if (anahtar(a.k) !== anahtar(b.k)) continue;
      const ara = metin.slice(a.s, b.b);
      if (ara === '' || /\S/.test(ara)) continue; // araya noktalama girmişse tekrar sayılmaz
      const satir = metin.slice(0, b.b).split('\n').length;
      bulgular.push(`Satır ${satir}: ${a.k} ${b.k}`);
      const ad = anahtar(a.k);
      sayac.set(ad, (sayac.get(ad) || 0) + 1);
      silinecek.push([a.s, b.s]);
    }
    const rows = [
      ['Art arda tekrar', String(bulgular.length)],
      ['Tekrarlanan kelimeler', sayac.size ? [...sayac].map(([k, n]) => `${k} (${n})`).join(', ') : '—'],
      ['Toplam kelime', h.fmt(kelimeler.length, 0)],
    ];
    let text;
    if (v.islem === 'duzelt') {
      let s = '', konum = 0;
      for (const [x, y] of silinecek) { s += metin.slice(konum, x); konum = y; }
      text = s + metin.slice(konum);
    } else if (bulgular.length) text = bulgular.join('\n');
    return {
      rows,
      text,
      note: bulgular.length
        ? 'Türkçedeki ikilemeler (yavaş yavaş, koşa koşa) bilinçli tekrardır; listeyi gözden geçirip yalnızca hatalı olanları düzeltin.'
        : 'Art arda tekrarlanan kelime bulunamadı.',
    };
  }
