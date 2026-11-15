// JavaScript Dizgi Kaçış Karakteri Dönüştürme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.metin ?? '');
    if (s === '') h.err('"Metin" alanına dönüştürülecek metni yazın.');
    const hex = (n, w) => n.toString(16).toUpperCase().padStart(w, '0');
    let out = '';
    let degisen = 0;
    if (v.yon === 'geri') {
      let t = s;
      // Baştaki ve sondaki aynı tırnak varsa at
      const m = /^\s*(['"`])([\s\S]*)\1\s*;?\s*$/.exec(t);
      if (m) t = m[2];
      const basit = { n: '\n', r: '\r', t: '\t', b: '\b', f: '\f', v: '\v', '0': '\0' };
      for (let i = 0; i < t.length; i++) {
        const c = t[i];
        if (c !== '\\') { out += c; continue; }
        const d = t[i + 1];
        if (d === undefined) h.err('Metin tek başına bir ters eğik çizgiyle bitiyor; sondaki \\ işaretini silin ya da \\\\ olarak yazın.');
        degisen++;
        if (d === 'x') {
          const hx = t.slice(i + 2, i + 4);
          if (!/^[0-9a-fA-F]{2}$/.test(hx)) h.err(`${i + 1}. karakterdeki \\x dizisi geçersiz; \\x ardından iki onaltılık basamak gelmelidir (örn. \\x41).`);
          out += String.fromCharCode(parseInt(hx, 16)); i += 3; continue;
        }
        if (d === 'u') {
          if (t[i + 2] === '{') {
            const son = t.indexOf('}', i + 3);
            const hx = son < 0 ? '' : t.slice(i + 3, son);
            if (!/^[0-9a-fA-F]{1,6}$/.test(hx) || parseInt(hx, 16) > 0x10FFFF) h.err(`${i + 1}. karakterdeki \\u{…} dizisi geçersiz; süslü parantez içinde 10FFFF değerini aşmayan onaltılık bir kod noktası olmalıdır.`);
            out += String.fromCodePoint(parseInt(hx, 16)); i = son; continue;
          }
          const hx = t.slice(i + 2, i + 6);
          if (!/^[0-9a-fA-F]{4}$/.test(hx)) h.err(`${i + 1}. karakterdeki \\u dizisi geçersiz; \\u ardından dört onaltılık basamak gelmelidir (örn. \\u00E7).`);
          out += String.fromCharCode(parseInt(hx, 16)); i += 5; continue;
        }
        if (d === '0' && /[0-9]/.test(t[i + 2] || '')) h.err(`${i + 1}. karakterdeki sekizlik kaçış (\\0 ardından rakam) desteklenmiyor; \\x ya da \\u biçimini kullanın.`);
        if (/[1-9]/.test(d)) h.err(`${i + 1}. karakterdeki \\${d} dizisi geçerli bir JavaScript kaçışı değil; sekizlik kaçışlar yerine \\x ya da \\u biçimini kullanın.`);
        if (d === '\r') { i += t[i + 2] === '\n' ? 2 : 1; continue; } // satır devamı
        if (d === '\n' || d === '\u2028' || d === '\u2029') { i += 1; continue; }
        out += Object.prototype.hasOwnProperty.call(basit, d) ? basit[d] : d;
        i += 1;
      }
    } else {
      const q = v.tirnak === 'cift' ? '"' : v.tirnak === 'backtick' ? '`' : '\'';
      for (let i = 0; i < s.length; i++) {
        const c = s[i];
        const k = s.charCodeAt(i);
        let e = null;
        if (c === '\\') e = '\\\\';
        else if (c === q) e = '\\' + q;
        else if (c === '\n') e = '\\n';
        else if (c === '\r') e = '\\r';
        else if (c === '\t') e = '\\t';
        else if (c === '\b') e = '\\b';
        else if (c === '\f') e = '\\f';
        else if (c === '\v') e = '\\v';
        else if (k === 0) e = /[0-9]/.test(s[i + 1] || '') ? '\\x00' : '\\0';
        else if (k < 0x20 || k === 0x7F) e = '\\x' + hex(k, 2);
        else if (k === 0x2028 || k === 0x2029) e = '\\u' + hex(k, 4);
        else if (q === '`' && c === '$' && s[i + 1] === '{') e = '\\$';
        else if (k > 0x7E && v.ascii === 'kacis') e = '\\u' + hex(k, 4);
        if (e === null) out += c; else { out += e; degisen++; }
      }
      if (v.sarmala === 'evet') out = q + out + q;
    }
    return {
      rows: [
        [v.yon === 'geri' ? 'Çözülen kaçış dizisi' : 'Kaçışlanan karakter', String(degisen)],
        ['Girdi uzunluğu', `${s.length} karakter`],
        ['Çıktı uzunluğu', `${out.length} karakter`],
      ],
      text: out,
      note: v.yon === 'geri' ? 'Baştaki ve sondaki eşleşen tırnak işaretleri varsa atılır. Uzunluklar UTF-16 kod birimi olarak sayılır.' : 'Uzunluklar JavaScript\'in length değeri gibi UTF-16 kod birimi olarak sayılır.',
    };
  }
