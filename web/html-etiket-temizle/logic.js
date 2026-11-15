// HTML Etiketlerini Temizleme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ham = String(v.kod ?? '');
    if (ham.trim() === '') h.err('"HTML kodu" alanına temizlenecek kodu yapıştırın.');
    const etiketRe = /<\/?[a-zA-Z][^<>]*>|<![^<>]*>/g;
    let t = ham.replace(/<!--[\s\S]*?-->/g, ' ');
    const etiketSayisi = (t.match(etiketRe) || []).length;
    t = t.replace(/<(script|style|noscript|template)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, ' ');
    t = t.replace(/\s+/g, ' ');
    const kir = v.satir === 'tek' ? ' ' : '\n';
    t = t.replace(/<br\s*\/?>/gi, kir);
    t = t.replace(/<\/?(p|div|h[1-6]|li|ul|ol|tr|table|thead|tbody|blockquote|section|article|header|footer|nav|aside|main|pre|hr|dt|dd|dl|figure|figcaption|form|option|title)\b[^<>]*>/gi, kir);
    t = t.replace(/<\/(td|th)\s*>/gi, ' ');
    t = t.replace(etiketRe, '');
    let cozulen = 0;
    if (v.varlik !== 'ayni') {
      const adlar = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', copy: '©', reg: '®', trade: '™', hellip: '…', mdash: '—', ndash: '–', laquo: '«', raquo: '»', lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”', euro: '€', pound: '£', deg: '°', times: '×', divide: '÷', middot: '·', bull: '•', sect: '§', para: '¶', plusmn: '±', frac12: '½', ccedil: 'ç', Ccedil: 'Ç', ouml: 'ö', Ouml: 'Ö', uuml: 'ü', Uuml: 'Ü', scedil: 'ş', Scedil: 'Ş', gbreve: 'ğ', Gbreve: 'Ğ', inodot: 'ı', imath: 'ı', Idot: 'İ', acirc: 'â', Acirc: 'Â', icirc: 'î', Icirc: 'Î', ucirc: 'û', Ucirc: 'Û' };
      t = t.replace(/&(#[xX][0-9a-fA-F]{1,6}|#\d{1,7}|[a-zA-Z][a-zA-Z0-9]{1,10});/g, (tam, ad) => {
        if (ad[0] === '#') {
          const kod = /^#x/i.test(ad) ? parseInt(ad.slice(2), 16) : parseInt(ad.slice(1), 10);
          if (!(kod > 0 && kod <= 0x10ffff) || (kod >= 0xd800 && kod <= 0xdfff)) return tam;
          cozulen++;
          return String.fromCodePoint(kod);
        }
        if (Object.prototype.hasOwnProperty.call(adlar, ad)) { cozulen++; return adlar[ad]; }
        return tam;
      });
    }
    const satirlar = t.split('\n').map((s) => s.replace(/[ \t ]+/g, ' ').trim()).filter((s) => s !== '');
    const sonuc = satirlar.join('\n');
    if (sonuc === '') h.err('Etiketler kaldırıldığında geriye metin kalmadı. Kod yalnızca etiket, betik ya da görsel içeriyor olabilir.');
    return {
      rows: [
        ['Temiz metin uzunluğu', `${Array.from(sonuc).length} karakter`],
        ['Özgün kod uzunluğu', `${Array.from(ham).length} karakter`],
        ['Kaldırılan etiket', String(etiketSayisi)],
        ['Çözülen karakter varlığı', String(cozulen)],
        ['Satır sayısı', String(satirlar.length)],
      ],
      text: sonuc,
      note: 'Art arda boşluklar teke indirilir, boş satırlar atılır. Yorumlar ile betik ve stil bloklarının içeriği sonuca alınmaz.',
    };
  }
