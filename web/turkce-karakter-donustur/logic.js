// Türkçe Karakterleri İngilizce Karaktere Çevirme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const metin = String(v.metin ?? '');
    if (metin.trim() === '') h.err('Çevrilecek metni yazın.');
    if (metin.length > 2000000) h.err('Metin 2.000.000 karakterden uzun; parçalara bölerek deneyin.');
    const TR = { 'ç': 'c', 'Ç': 'C', 'ğ': 'g', 'Ğ': 'G', 'ı': 'i', 'İ': 'I', 'ö': 'o', 'Ö': 'O', 'ş': 's', 'Ş': 'S', 'ü': 'u', 'Ü': 'U', 'â': 'a', 'Â': 'A', 'î': 'i', 'Î': 'I', 'û': 'u', 'Û': 'U' };
    const EK = { 'ß': 'ss', 'ẞ': 'SS', 'æ': 'ae', 'Æ': 'AE', 'œ': 'oe', 'Œ': 'OE', 'ø': 'o', 'Ø': 'O', 'đ': 'd', 'Đ': 'D', 'ð': 'd', 'Ð': 'D', 'ł': 'l', 'Ł': 'L', 'þ': 'th', 'Þ': 'Th', 'ħ': 'h', 'Ħ': 'H' };
    const tum = v.kapsam === 'tum';
    let sonuc = '', adet = 0;
    // Önce birleşik biçime getir ki "o + ayrı iki nokta" yazımı da tek harf olarak tanınsın
    for (const c of metin.normalize('NFC')) {
      let y = c;
      if (TR[c] !== undefined) y = TR[c];
      else if (tum) {
        if (EK[c] !== undefined) y = EK[c];
        else if (/\p{Script=Latin}/u.test(c)) y = c.normalize('NFD').replace(/\p{M}/gu, '') || c;
      }
      if (y !== c) adet++;
      sonuc += y;
    }
    const asciiDisi = Array.from(sonuc).filter((c) => c.codePointAt(0) > 127).length;
    return {
      rows: [
        ['Değiştirilen harf', h.fmt(adet, 0)],
        ['Toplam karakter', h.fmt(sonuc.length, 0)],
        ['Kalan ASCII dışı karakter', h.fmt(asciiDisi, 0)],
      ],
      text: sonuc,
      note: asciiDisi > 0 ? 'Sonuçta hâlâ temel Latin (ASCII) dışında karakter var: kıvrık tırnak, uzun tire, emoji ya da başka alfabelerin harfleri olabilir.' : undefined,
    };
  }
