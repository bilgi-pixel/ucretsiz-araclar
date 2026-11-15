// JSON Kaçış (Escape) ve Geri Alma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.metin ?? '');
    if (s === '') h.err('"Metin" alanına dönüştürülecek metni yazın.');
    const hex4 = (n) => n.toString(16).toUpperCase().padStart(4, '0');
    let out = '';
    let adet = 0;
    if (v.yon === 'geri') {
      let t = s;
      const kirp = t.trim();
      if (kirp.length >= 2 && kirp[0] === '"' && kirp[kirp.length - 1] === '"') {
        // Sondaki tırnak kaçışlı mı? Öncesindeki ters eğik çizgileri say
        let n = 0;
        for (let i = kirp.length - 2; i >= 1 && kirp[i] === '\\'; i--) n++;
        if (n % 2 === 0) t = kirp.slice(1, -1);
      }
      const basit = { '"': '"', '\\': '\\', '/': '/', b: '\b', f: '\f', n: '\n', r: '\r', t: '\t' };
      for (let i = 0; i < t.length; i++) {
        const c = t[i];
        if (c === '"') h.err(`${i + 1}. karakterde kaçışlanmamış çift tırnak var; JSON dizgisinin içinde tırnak \\" olarak yazılmalıdır.`);
        if (c !== '\\') { out += c; continue; }
        const d = t[i + 1];
        if (d === undefined) h.err('Metin tek başına bir ters eğik çizgiyle bitiyor; sondaki \\ işaretini silin ya da \\\\ olarak yazın.');
        adet++;
        if (d === 'u') {
          const hx = t.slice(i + 2, i + 6);
          if (!/^[0-9a-fA-F]{4}$/.test(hx)) h.err(`${i + 1}. karakterdeki \\u dizisi geçersiz; \\u ardından dört onaltılık basamak gelmelidir (örn. \\u00E7).`);
          out += String.fromCharCode(parseInt(hx, 16)); i += 5; continue;
        }
        if (!Object.prototype.hasOwnProperty.call(basit, d)) h.err(`${i + 1}. karakterdeki \\${d} dizisi JSON'da geçerli değil. Geçerli kaçışlar: \\" \\\\ \\/ \\b \\f \\n \\r \\t ve \\uXXXX.`);
        out += basit[d]; i += 1;
      }
    } else {
      for (let i = 0; i < s.length; i++) {
        const c = s[i];
        const k = s.charCodeAt(i);
        let e = null;
        if (c === '"') e = '\\"';
        else if (c === '\\') e = '\\\\';
        else if (c === '\n') e = '\\n';
        else if (c === '\r') e = '\\r';
        else if (c === '\t') e = '\\t';
        else if (c === '\b') e = '\\b';
        else if (c === '\f') e = '\\f';
        else if (k < 0x20) e = '\\u' + hex4(k);
        else if (c === '/' && v.egik === 'kacis') e = '\\/';
        else if (k > 0x7E && v.ascii === 'kacis') e = '\\u' + hex4(k);
        if (e === null) out += c; else { out += e; adet++; }
      }
      if (v.sarmala === 'evet') out = '"' + out + '"';
    }
    return {
      rows: [
        [v.yon === 'geri' ? 'Çözülen kaçış dizisi' : 'Kaçışlanan karakter', String(adet)],
        ['Girdi uzunluğu', `${s.length} karakter`],
        ['Çıktı uzunluğu', `${out.length} karakter`],
      ],
      text: out,
      note: v.yon === 'geri' ? 'Metin çift tırnakla başlayıp bitiyorsa dış tırnaklar atılır. Gerçek satır sonları hoşgörüyle olduğu gibi aktarılır.' : 'Çıktı, JSON belgesinde iki çift tırnak arasına yazılmaya hazırdır.',
    };
  }
