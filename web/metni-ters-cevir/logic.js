// Metni Ters Çevirme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Ters çevirmek için "Metin" alanına bir yazı yazın.');
    // Harf kümelerine böl: birleşik emoji ve aksanlı harfler parçalanmasın
    let seg = null;
    try { if (typeof Intl !== 'undefined' && Intl.Segmenter) seg = new Intl.Segmenter('tr', { granularity: 'grapheme' }); } catch (e) { seg = null; }
    const parcala = (t) => (seg ? Array.from(seg.segment(t), (x) => x.segment) : Array.from(t));
    const ters = (t) => parcala(t).reverse().join('');
    let cikti;
    if (v.mod === 'satir') cikti = s.split('\n').map(ters).join('\n');
    else if (v.mod === 'kelime') cikti = s.split(/(\s+)/).map((p) => (/^\s+$/.test(p) ? p : ters(p))).join('');
    else cikti = ters(s);
    const harfler = parcala(s.toLocaleLowerCase('tr')).filter((c) => /[\p{L}\p{N}]/u.test(c));
    const palindrom = harfler.length > 0 && harfler.join('') === harfler.slice().reverse().join('');
    return {
      rows: [
        ['Karakter sayısı', h.fmt(parcala(s).length, 0)],
        ['Harf ve rakam sayısı', h.fmt(harfler.length, 0)],
        ['Palindrom mu?', harfler.length === 0 ? 'Harf ya da rakam yok' : palindrom ? 'Evet' : 'Hayır'],
      ],
      text: cikti,
      note: 'Palindrom denetiminde boşluklar, noktalama işaretleri ve büyük-küçük harf farkı dikkate alınmaz.',
    };
  }
