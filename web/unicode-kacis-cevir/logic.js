// Unicode Kaçış Dizisi Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.metin ?? '');
    if (s === '') h.err('"Metin" alanına çevrilecek metni yazın.');
    const hex = (n, w) => n.toString(16).toUpperCase().padStart(w, '0');
    let out = '';
    let adet = 0;
    if (v.yon === 'geri') {
      const nokta = (hx, taban, ham) => {
        const n = parseInt(hx, taban);
        if (!(n >= 0 && n <= 0x10FFFF)) h.err(`"${ham}" dizisi Unicode aralığının dışında; en büyük kod noktası 10FFFF'tir.`);
        adet++;
        return String.fromCodePoint(n);
      };
      let t = s;
      if (v.bicim === 'css') {
        t = t.replace(/\\([0-9a-fA-F]{1,6})(\r\n|[ \t\n\r\f])?/g, (m, hx) => nokta(hx, 16, m.trim()));
      } else {
        t = t.replace(/\\u\{([0-9a-fA-F]+)\}|\\u([0-9a-fA-F]{4})|U\+([0-9a-fA-F]{4,6})(?![0-9a-fA-F])|&#[xX]([0-9a-fA-F]+);|&#([0-9]+);/g, (m, a, b, c, d, e) => {
          if (a !== undefined) return nokta(a, 16, m);
          if (b !== undefined) { adet++; return String.fromCharCode(parseInt(b, 16)); }
          if (c !== undefined) return nokta(c, 16, m);
          if (d !== undefined) return nokta(d, 16, m);
          return nokta(e, 10, m);
        });
      }
      if (adet === 0) h.err('Metinde tanınan bir kaçış dizisi bulunamadı. \\u00E7, \\u{E7}, U+00E7 ya da &#xE7; gibi bir dizi yazın; CSS kaçışları için biçim listesinden CSS\'i seçin.');
      out = t;
    } else {
      const hepsi = v.kapsam === 'hepsi';
      const parcalar = [];
      for (const ch of s) {
        const cp = ch.codePointAt(0);
        if (!hepsi && cp < 0x80) { parcalar.push(ch); continue; }
        adet++;
        if (v.bicim === 'es6') parcalar.push('\\u{' + hex(cp, 1) + '}');
        else if (v.bicim === 'uplus') parcalar.push('U+' + hex(cp, 4));
        else if (v.bicim === 'htmlhex') parcalar.push('&#x' + hex(cp, 1) + ';');
        else if (v.bicim === 'htmldec') parcalar.push('&#' + cp + ';');
        else if (v.bicim === 'css') parcalar.push('\\' + hex(cp, 1) + ' ');
        else {
          let e = '';
          for (let i = 0; i < ch.length; i++) e += '\\u' + hex(ch.charCodeAt(i), 4);
          parcalar.push(e);
        }
      }
      out = v.bicim === 'uplus' && hepsi ? parcalar.join(' ') : parcalar.join('');
      if (v.bicim === 'css') out = out.replace(/ $/, '');
    }
    const kodNoktasi = [...(v.yon === 'geri' ? out : s)].length;
    return {
      rows: [
        [v.yon === 'geri' ? 'Çözülen kaçış dizisi' : 'Kaçışlanan karakter', String(adet)],
        ['Metindeki karakter sayısı', String(kodNoktasi)],
        ['Çıktı uzunluğu', `${out.length} karakter`],
      ],
      text: out,
      note: v.yon === 'geri' ? 'Kaçış olmayan kısımlar değiştirilmeden aktarılır.' : '\\uXXXX biçiminde temel düzlem dışındaki karakterler iki kod birimi (vekil çifti) olarak yazılır.',
    };
  }
