// Sosyal Medya Karakter Sınırı Sayacı — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const metin = String(v.metin ?? '').replace(/\r\n?/g, '\n').normalize('NFC');
    if (metin.trim() === '') h.err('Saymak için "Gönderi metni" alanına bir metin yazın.');
    const sinir = h.posint(v.sinir, 'Karakter sınırı');
    const parcala = (s) => {
      if (typeof Intl !== 'undefined' && Intl.Segmenter) return [...new Intl.Segmenter('tr', { granularity: 'grapheme' }).segment(s)].map((x) => x.segment);
      return Array.from(s);
    };
    const duz = parcala(metin).length;
    const agirlik = (s) => {
      let t = 0;
      for (const g of parcala(s)) {
        if (/\p{Extended_Pictographic}|[\u{1F1E6}-\u{1F1FF}]/u.test(g)) { t += 2; continue; }
        for (const ch of g) {
          const c = ch.codePointAt(0);
          t += (c <= 0x10FF || (c >= 0x2000 && c <= 0x200D) || (c >= 0x2010 && c <= 0x201F) || (c >= 0x2032 && c <= 0x2037)) ? 1 : 2;
        }
      }
      return t;
    };
    const urlRe = /https?:\/\/[^\s]+/gi;
    const baglantilar = metin.match(urlRe) || [];
    let sayi = duz;
    if (v.sayim === 'agirlikli') sayi = agirlik(metin.replace(urlRe, '')) + baglantilar.length * 23;
    const kalan = sinir - sayi;
    const etiket = (metin.match(/(^|[^\p{L}\p{N}_])#[\p{L}\p{N}_]+/gu) || []).length;
    const bahsetme = (metin.match(/(^|[^\p{L}\p{N}_])@[A-Za-z0-9_]+/g) || []).length;
    const kelime = metin.split(/\s+/).filter(Boolean).length;
    return {
      rows: [
        ['Durum', kalan >= 0 ? `Sınırın içinde: ${h.fmt(kalan, 0)} karakter kaldı` : `Sınır aşıldı: ${h.fmt(-kalan, 0)} karakter fazla`],
        ['Kullanılan / sınır', `${h.fmt(sayi, 0)} / ${h.fmt(sinir, 0)}`],
        ['Doluluk', `%${h.fmt(sayi / sinir * 100, 1)}`],
        ['Düz karakter sayısı', h.fmt(duz, 0)],
        ['Kelime', h.fmt(kelime, 0)],
        ['Etiket (#)', String(etiket)],
        ['Bahsetme (@)', String(bahsetme)],
        ['Bağlantı', String(baglantilar.length)],
        ['Bölünürse gereken gönderi', String(Math.ceil(sayi / sinir))],
      ],
      note: v.sayim === 'agirlikli'
        ? 'Ağırlıklı sayımda http:// ya da https:// ile başlayan her bağlantı 23, her emoji 2, diğer harfler 1 karakter sayılır. Platformlar kuralı değiştirebilir; son kontrolü paylaşım ekranında yapın.'
        : 'Basit sayımda boşluklar ve satır sonları dahil görünen her karakter 1 sayılır.',
    };
  }
