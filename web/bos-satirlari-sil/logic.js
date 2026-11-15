// Boş Satırları Silme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s === '') h.err('Boş satırları silmek için "Metin" alanına bir metin yapıştırın.');
    const satirlar = s.split('\n');
    if (satirlar.length > 1 && satirlar[satirlar.length - 1] === '') satirlar.pop();
    const bos = (x) => x.trim() === '';
    if (satirlar.every(bos)) h.err('Metinde dolu satır yok; yalnızca boş satırlardan oluşuyor. İçinde yazı bulunan bir metin yapıştırın.');
    const duzelt = (x) => (v.sonBosluk === 'sil' ? x.replace(/[ \t ]+$/, '') : x);
    const cikti = [];
    if (v.mod === 'tek') {
      let bekleyen = false;
      for (const x of satirlar) {
        if (bos(x)) { if (cikti.length) bekleyen = true; continue; }
        if (bekleyen) { cikti.push(''); bekleyen = false; }
        cikti.push(duzelt(x));
      }
    } else {
      for (const x of satirlar) if (!bos(x)) cikti.push(duzelt(x));
    }
    return {
      rows: [
        ['Silinen boş satır', h.fmt(satirlar.length - cikti.length, 0)],
        ['Kalan satır', h.fmt(cikti.length, 0)],
        ['Girdideki satır', h.fmt(satirlar.length, 0)],
      ],
      text: cikti.join('\n'),
      note: v.mod === 'tek' ? 'Paragraf aralarında birer boş satır bırakıldı; metnin başındaki ve sonundaki boş satırlar silindi.' : 'Yalnızca boşluk ya da sekme içeren satırlar da boş sayılıp silindi.',
    };
  }
