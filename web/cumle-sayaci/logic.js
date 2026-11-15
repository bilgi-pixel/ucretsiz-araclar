// Cümle Sayacı — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.metin ?? '');
    if (s.trim() === '') h.err('Cümlelerini saymak için "Metin" alanına bir metin yazın ya da yapıştırın.');
    const kisaltma = new Set(['dr', 'prof', 'doç', 'yrd', 'av', 'sn', 'uzm', 'öğr', 'gör', 'müh', 'bkz', 'örn']);
    const re = /[.!?…]+["'”’»)\]]*(?=\s|$)/g;
    const kelimeSay = (t) => t.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
    const cumleler = [];
    let bas = 0, m;
    while ((m = re.exec(s)) !== null) {
      const son = m.index + m[0].length;
      const isaret = m[0];
      const kalan = s.slice(son);
      const sonraki = (/\S/.exec(kalan) || [''])[0];
      // Sonraki sözcük küçük harfle başlıyorsa cümle sürüyor demektir (3. sınıf, vb. gibi)
      if (sonraki && /\p{Ll}/u.test(sonraki)) continue;
      if (/^\.["'”’»)\]]*$/.test(isaret)) {
        const onceki = (/([\p{L}\p{N}]+)$/u.exec(s.slice(bas, m.index)) || ['', ''])[1];
        if (kisaltma.has(onceki.toLocaleLowerCase('tr'))) continue;
        if (onceki.length === 1 && /\p{Lu}/u.test(onceki)) continue; // ad baş harfi: A. Yılmaz
      }
      const parca = s.slice(bas, son).trim();
      bas = son;
      if (/[\p{L}\p{N}]/u.test(parca)) cumleler.push({ t: parca, tur: isaret.includes('?') ? 'soru' : isaret.includes('!') ? 'unlem' : 'duz' });
    }
    const artan = s.slice(bas).trim();
    if (/[\p{L}\p{N}]/u.test(artan)) cumleler.push({ t: artan, tur: 'duz' });
    if (!cumleler.length) h.err('Metinde harf ya da rakam bulunamadı. Sayılacak en az bir cümle yazın.');
    const uz = cumleler.map((c) => kelimeSay(c.t));
    const toplam = uz.reduce((a, b) => a + b, 0);
    const enUzun = Math.max(...uz), enKisa = Math.min(...uz);
    const say = (tur) => cumleler.filter((c) => c.tur === tur).length;
    return {
      rows: [
        ['Cümle sayısı', h.fmt(cumleler.length, 0)],
        ['Kelime sayısı', h.fmt(toplam, 0)],
        ['Cümle başına ortalama kelime', h.fmt(toplam / cumleler.length, 2)],
        ['En uzun cümle', `${h.fmt(enUzun, 0)} kelime (${uz.indexOf(enUzun) + 1}. cümle)`],
        ['En kısa cümle', `${h.fmt(enKisa, 0)} kelime (${uz.indexOf(enKisa) + 1}. cümle)`],
        ['Düz cümle', h.fmt(say('duz'), 0)],
        ['Soru cümlesi', h.fmt(say('soru'), 0)],
        ['Ünlem cümlesi', h.fmt(say('unlem'), 0)],
      ],
      note: 'Cümle sonu; nokta, soru işareti, ünlem ya da üç noktadan sonra boşluk gelmesiyle belirlenir. Ardından küçük harfle devam eden yerler ve yaygın unvan kısaltmaları cümle sonu sayılmaz.',
    };
  }
