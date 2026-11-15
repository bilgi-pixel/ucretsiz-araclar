// Her Kelimenin İlk Harfini Büyütme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('İlk harflerini büyütmek için "Metin" alanına bir metin yazın.');
    const tr = v.dil !== 'en';
    const kucuk = (x) => (tr ? x.replace(/I/g, 'ı').replace(/İ/g, 'i') : x.replace(/İ/g, 'i')).toLowerCase();
    const buyuk = (x) => (tr ? x.replace(/i/g, 'İ').replace(/ı/g, 'I') : x.replace(/ı/g, 'I')).toUpperCase();
    const KUCUK_KALAN = tr
      ? new Set(['ve', 'ile', 'veya', 'ya', 'da', 'de', 'ki', 'için', 'gibi', 'ama', 'fakat', 'ancak', 'mi', 'mı', 'mu', 'mü', 'ise', 'yahut', 'veyahut', 'hem', 'ne'])
      : new Set(['a', 'an', 'the', 'and', 'or', 'but', 'nor', 'for', 'of', 'in', 'on', 'at', 'to', 'by', 'as', 'vs']);
    let kelime = 0, degisen = 0;
    const cikti = s.split('\n').map((satir) => {
      let ilk = true;
      return satir.split(/(\s+)/).map((parca) => {
        if (parca === '' || /^\s+$/.test(parca)) return parca;
        if (!/\p{L}/u.test(parca)) return parca; // yalnızca rakam ya da noktalama
        kelime++;
        const taban = v.kalan === 'koru' ? parca : kucuk(parca);
        const yalin = kucuk(parca).replace(/[^\p{L}]/gu, '');
        let yeni;
        if (v.baglac === 'evet' && !ilk && KUCUK_KALAN.has(yalin)) yeni = kucuk(parca);
        else {
          // İlk harfi ve kısa çizgiden sonraki harfi büyüt; kesme işaretinden sonraki eke dokunma
          let bekle = true;
          yeni = '';
          for (const c of Array.from(taban)) {
            if (/\p{L}/u.test(c)) { yeni += bekle ? buyuk(c) : c; bekle = false; }
            else { yeni += c; if (c === '-' || c === '/') bekle = true; else if (/\p{N}/u.test(c) || c === '\'' || c === '’') bekle = false; }
          }
        }
        ilk = false;
        if (yeni !== parca) degisen++;
        return yeni;
      }).join('');
    });
    return {
      rows: [
        ['Kelime sayısı', h.fmt(kelime, 0)],
        ['Değişen kelime', h.fmt(degisen, 0)],
        ['Harf kuralı', tr ? 'Türkçe' : 'İngilizce'],
      ],
      text: cikti.join('\n'),
      note: v.baglac === 'evet' ? 'Satırın ilk kelimesi bağlaç olsa bile büyük harfle başlatıldı; aradaki bağlaç ve edatlar küçük bırakıldı.' : 'Kesme işaretinden sonraki ekler küçük bırakıldı; kısa çizgiyle birleşen kelimelerin her parçası büyük harfle başlatıldı.',
    };
  }
