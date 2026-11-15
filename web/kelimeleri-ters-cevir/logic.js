// Kelime Sırasını Ters Çevirme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Kelime sırasını ters çevirmek için "Metin" alanına bir cümle ya da liste yazın.');
    let satirlar = s.split('\n');
    while (satirlar.length && satirlar[satirlar.length - 1].trim() === '') satirlar.pop();
    while (satirlar.length && satirlar[0].trim() === '') satirlar.shift();
    const virgul = v.ayirici === 'virgul';
    let adet = 0, dolu = 0;
    let cikti = satirlar.map((x) => {
      let t = x.trim(), ek = '';
      if (t === '') return '';
      if (v.sonNokta === 'sonda') {
        const m = /[.!?…]+$/.exec(t);
        if (m) { ek = m[0]; t = t.slice(0, m.index).trim(); }
      }
      const ogeler = virgul ? t.split(',').map((p) => p.trim()).filter((p) => p !== '') : t.split(/\s+/).filter((p) => p !== '');
      adet += ogeler.length;
      dolu++;
      return ogeler.reverse().join(virgul ? ', ' : ' ') + ek;
    });
    if (v.kapsam === 'tum') cikti = cikti.reverse();
    return {
      rows: [
        ['Ters çevrilen öğe sayısı', h.fmt(adet, 0)],
        ['Dolu satır sayısı', h.fmt(dolu, 0)],
      ],
      text: cikti.join('\n'),
      note: 'Harfler ve kelimelerin yazımı değişmez; yalnızca sıraları tersine döner. Öğeler arasındaki fazla boşluklar teke indirilir.',
    };
  }
