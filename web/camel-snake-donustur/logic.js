// camelCase snake_case Dönüştürücü — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Dönüştürmek için en az bir değişken ya da sütun adı yazın.');
    const HARITA = { ç: 'c', Ç: 'C', ğ: 'g', Ğ: 'G', ı: 'i', İ: 'I', ö: 'o', Ö: 'O', ş: 's', Ş: 'S', ü: 'u', Ü: 'U', â: 'a', Â: 'A', î: 'i', Î: 'I', û: 'u', Û: 'U' };
    const sade = v.turkce !== 'koru';
    const kucuk = (x) => x.replace(/İ/g, 'i').toLowerCase();
    const buyuk = (x) => x.toUpperCase();
    const bas = (x) => { const a = Array.from(x); return buyuk(a[0]) + a.slice(1).join(''); };
    const kelimeler = (satir) => {
      const t = sade ? satir.replace(/[çÇğĞıİöÖşŞüÜâÂîÎûÛ]/g, (c) => HARITA[c]) : satir;
      const o = [];
      // Önce harf/rakam olmayan her şeyden böl, sonra büyük-küçük harf geçişlerinden ayır (HTTPServer → HTTP + Server)
      for (const parca of t.split(/[^\p{L}\p{N}]+/u)) {
        if (!parca) continue;
        const m = parca.match(/\p{Lu}+(?=\p{Lu}\p{Ll})|\p{Lu}?\p{Ll}+\p{N}*|\p{Lu}+\p{N}*|\p{N}+|\p{L}+/gu);
        if (m) for (const k of m) o.push(kucuk(k));
      }
      return o;
    };
    const birlestir = (k) => {
      if (v.hedef === 'camel') return k.map((x, i) => (i === 0 ? x : bas(x))).join('');
      if (v.hedef === 'pascal') return k.map(bas).join('');
      if (v.hedef === 'sabit') return k.map(buyuk).join('_');
      if (v.hedef === 'kebab') return k.join('-');
      return k.join('_');
    };
    let adet = 0, toplamKelime = 0;
    const cikti = s.split('\n').map((satir) => {
      if (satir.trim() === '') return '';
      const k = kelimeler(satir);
      if (!k.length) return satir.trim();
      adet++; toplamKelime += k.length;
      return birlestir(k);
    });
    if (adet === 0) h.err('Girdide harf ya da rakam bulunamadı. "kullanici_adi" ya da "toplamTutar" gibi bir ad yazın.');
    const ADLAR = { snake: 'snake_case', camel: 'camelCase', pascal: 'PascalCase', sabit: 'SABIT_YAZIM', kebab: 'kebab-case' };
    return {
      rows: [
        ['Dönüştürülen ad', h.fmt(adet, 0)],
        ['Bulunan kelime', h.fmt(toplamKelime, 0)],
        ['Hedef biçim', ADLAR[v.hedef] || 'snake_case'],
      ],
      text: cikti.join('\n'),
      note: 'Rakamla başlayan adlar çoğu dilde geçerli tanımlayıcı değildir; sonuç rakamla başlıyorsa başına bir harf ya da alt çizgi ekleyin.',
    };
  }
