// Sayı Biçimlendirme (Binlik Ayraç) — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let t = String(v.sayi ?? '').trim().replace(/[\s  '’_]/g, '').replace(/−/g, '-');
    if (t === '') h.err('"Sayı" alanına biçimlendirilecek sayıyı yazın (örn. 1234567,89).');
    let eksi = false;
    if (t[0] === '-' || t[0] === '+') { eksi = t[0] === '-'; t = t.slice(1); }
    if (!/^[\d.,]+$/.test(t) || !/\d/.test(t)) h.err('Sayıda yalnızca rakam, nokta, virgül ve baştaki eksi işareti bulunabilir.');
    if (t.length > 60) h.err('Sayı çok uzun. En fazla 60 karakterlik bir sayı yazın.');
    const nokta = (t.match(/\./g) || []).length, virgul = (t.match(/,/g) || []).length;
    let ond = '', belirsiz = false; // ond: ondalık ayraç karakteri ('' = yok)
    if (v.giris === 'tr') ond = virgul ? ',' : '';
    else if (v.giris === 'en') ond = nokta ? '.' : '';
    else if (nokta && virgul) ond = t.lastIndexOf(',') > t.lastIndexOf('.') ? ',' : '.';
    else if (nokta === 1) { ond = '.'; belirsiz = /^\d{1,3}\.\d{3}$/.test(t); }
    else if (virgul === 1) { ond = ','; belirsiz = /^\d{1,3},\d{3}$/.test(t); }
    const adet = ond === ',' ? virgul : ond === '.' ? nokta : 0;
    if (adet > 1) h.err('Ondalık ayraç sayıda yalnızca bir kez bulunabilir. Giriş yazımını kontrol edin.');
    let tam = t, kesir = '';
    if (ond) { const i = t.lastIndexOf(ond); tam = t.slice(0, i); kesir = t.slice(i + 1); }
    if (/[.,]/.test(kesir)) h.err('Ondalık kısımda binlik ayraç olamaz. Sayıyı ya da giriş yazımını kontrol edin.');
    tam = tam.replace(/[.,]/g, '');
    if (tam === '' && kesir === '') h.err('Geçerli bir sayı yazın (örn. 1234567,89).');
    tam = tam.replace(/^0+(?=\d)/, '') || '0';
    if (v.ondalik !== 'koru') {
      const n = Number(v.ondalik);
      if (kesir.length > n) {
        const yukari = kesir[n] >= '5';
        let b = BigInt(tam + kesir.slice(0, n));
        if (yukari) b += 1n;
        const s = b.toString().padStart(n + 1, '0');
        tam = s.slice(0, s.length - n);
        kesir = n ? s.slice(s.length - n) : '';
      } else kesir = kesir.padEnd(n, '0');
    }
    if (eksi && /^0+$/.test(tam) && /^0*$/.test(kesir)) eksi = false;
    const grupla = (s, ayrac) => s.replace(/\B(?=(\d{3})+(?!\d))/g, ayrac);
    const yaz = (bin, on) => (eksi ? '-' : '') + grupla(tam, bin) + (kesir ? on + kesir : '');
    const rows = [
      ['Türkçe yazım', yaz('.', ',')],
      ['İngilizce yazım', yaz(',', '.')],
      ['Boşluklu yazım', yaz(' ', ',')],
      ['Ayraçsız (virgüllü)', yaz('', ',')],
      ['Ayraçsız (noktalı, kod için)', yaz('', '.')],
      ['Tam kısmın basamak sayısı', String(tam.length)],
      ['Ondalık basamak sayısı', String(kesir.length)],
    ];
    return {
      rows,
      note: belirsiz
        ? 'Girdide tek ayraç ve ardından üç rakam var; bu ayraç ondalık sayıldı. Binlik ayraç kastettiyseniz "Giriş yazımı" alanından doğru yazımı seçin.'
        : 'Yuvarlama, yarım ve üzeri değerlerin büyütülmesi kuralıyla, rakamlar üzerinde kayıpsız yapılır.',
    };
  }
