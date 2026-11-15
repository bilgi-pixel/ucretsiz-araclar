// CSS Küçültme (Minify) — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.css ?? '');
    if (s.trim() === '') h.err('Küçültülecek CSS kodunu "CSS kodu" alanına yapıştırın.');
    const koru = v.yorum === 'koru';
    const ONCE = new Set(['{', '}', ';', ',', ')', '!']);   // kendisinden önceki boşluk gereksiz
    const SONRA = new Set(['{', '}', ';', ',', '(', ':']);  // kendisinden sonraki boşluk gereksiz
    const BAG = new Set(['>', '~', '+']);                   // seçici birleştiricileri (yalnızca parantez dışında)
    let o = '', bosluk = false, yorumSonu = false, derinlik = 0, ac = 0, kapa = 0, i = 0;
    const n = s.length;
    const yaz = (parca) => {
      const c = parca[0];
      const son = o[o.length - 1];
      if (bosluk && !yorumSonu && o !== '' && !SONRA.has(son) && !ONCE.has(c) && !(derinlik === 0 && (BAG.has(son) || BAG.has(c)))) o += ' ';
      bosluk = false; yorumSonu = false;
      if (c === '}' && son === ';') o = o.slice(0, -1);
      o += parca;
    };
    while (i < n) {
      const c = s[i];
      if (c === '/' && s[i + 1] === '*') {
        let j = s.indexOf('*/', i + 2);
        if (j < 0) j = n - 2;
        const yrm = s.slice(i, j + 2);
        if (koru && s[i + 2] === '!') { bosluk = false; yorumSonu = true; o += yrm; }
        i = j + 2;
        continue;
      }
      if (c === '"' || c === '\'') {
        let j = i + 1;
        while (j < n && s[j] !== c) { if (s[j] === '\\') j++; j++; }
        yaz(s.slice(i, Math.min(j + 1, n)));
        i = j + 1;
        continue;
      }
      if (/\s/.test(c)) { bosluk = true; i++; continue; }
      yaz(c);
      if (c === '(') derinlik++;
      else if (c === ')') derinlik = Math.max(0, derinlik - 1);
      else if (c === '{') ac++;
      else if (c === '}') kapa++;
      i++;
    }
    if (o === '') h.err('Kodda yalnızca yorum ya da boşluk var; küçültülecek bir CSS kuralı bulunamadı.');
    const bayt = (t) => new TextEncoder().encode(t).length;
    const b1 = bayt(s), b2 = bayt(o);
    const kazanc = b1 > 0 ? (b1 - b2) / b1 * 100 : 0;
    return {
      rows: [
        ['Küçültülmüş boyut', h.fmt(b2, 0) + ' bayt'],
        ['Özgün boyut', h.fmt(b1, 0) + ' bayt'],
        ['Kazanç', '%' + h.fmt(kazanc, 1) + ' (' + h.fmt(b1 - b2, 0) + ' bayt)'],
      ],
      text: o,
      note: ac !== kapa
        ? `Uyarı: ${ac} açılış ve ${kapa} kapanış süslü parantezi var; sayılar eşit değil. Kodda eksik ya da fazla parantez olabilir.`
        : 'Yalnızca yorum ve boşluklar silindi; renkler, sayılar ve seçiciler olduğu gibi bırakıldı.',
    };
  }
