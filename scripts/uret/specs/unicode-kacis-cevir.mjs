export default {
  slug: 'unicode-kacis-cevir',
  title: 'Unicode Kaçış Dizisi Çevirici',
  h1Tail: '\\uXXXX ↔ metin',
  pageTitle: 'Unicode Kaçış Dizisi Çevirici – \\uXXXX, U+ ve HTML Kodu Dönüştürme',
  description: 'Metni \\uXXXX, \\u{…}, U+XXXX, HTML sayısal karakter kodu ya da CSS kaçışına çevirin; kaçış dizilerini yeniden okunur metne dönüştürün. Türkçe harf desteği.',
  card: 'Türkçe harfleri ve özel karakterleri \\uXXXX, U+XXXX, HTML ya da CSS kaçışına çevirin; kaçışları metne geri alın.',
  category: 'gelistirici',
  keywords: ['unicode kaçış', 'unicode escape', '\\u00e7 çevir', 'unicode çevirici', 'türkçe karakter unicode kodu', 'html karakter kodu', 'unicode decode', 'u+ kod noktası'],
  lead: 'Günlük dosyasında ya da API yanıtında <code>T\\u00FCrk\\u00E7e</code> gibi bir yazı gördüyseniz bu, "Türkçe" sözcüğünün Unicode kaçışlı hâlidir. Bu araç metni altı farklı kaçış biçimine çevirir ve bu biçimlerde yazılmış dizileri <strong>okunur metne</strong> geri döndürür.',
  button: 'Çevir',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Örn. Türkçe ya da T\\u00FCrk\\u00E7e' },
    { id: 'yon', label: 'İşlem', type: 'select', options: [['kacis', 'Metin → kaçış dizisi'], ['geri', 'Kaçış dizisi → metin']] },
    { id: 'bicim', label: 'Kaçış biçimi', type: 'select', options: [['ju', '\\uXXXX (JavaScript, JSON, Java, C#)'], ['es6', '\\u{X} (ES2015+, kod noktası)'], ['uplus', 'U+XXXX (Unicode gösterimi)'], ['htmlhex', '&#xHHHH; (HTML onaltılık)'], ['htmldec', '&#NNNN; (HTML ondalık)'], ['css', '\\HHHH (CSS)']], hint: 'Geri çevirirken CSS dışındaki biçimler kendiliğinden tanınır; CSS kaçışları için bu listeden CSS\'i seçin.' },
    { id: 'kapsam', label: 'Hangi karakterler kaçışlansın?', type: 'select', options: [['disi', 'Yalnızca ASCII dışı karakterler'], ['hepsi', 'Tüm karakterler']] },
  ],
  compute(v, h) {
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
  },
  cases: [
    { in: { metin: 'Türkçe', yon: 'kacis', bicim: 'ju' }, out: { 'Kaçışlanan karakter': '2', 'Metindeki karakter sayısı': '6' }, text: 'T\\u00FCrk\\u00E7e' },
    { in: { metin: '\\u015Eehir \\u0130stanbul, U+011F ve &#x131;', yon: 'geri' }, out: { 'Çözülen kaçış dizisi': '4' }, text: 'Şehir İstanbul, ğ ve ı' },
    { in: { metin: 'ığüşöç', yon: 'kacis', bicim: 'uplus', kapsam: 'hepsi' }, text: 'U+0131 U+011F U+00FC U+015F U+00F6 U+00E7' },
    { in: { metin: 'Ağ', yon: 'kacis', bicim: 'htmldec', kapsam: 'hepsi' }, text: '&#65;&#287;' },
    { in: { metin: 'ş', yon: 'kacis', bicim: 'htmlhex' }, text: '&#x15F;' },
    { in: { metin: '\u{1D11E}', yon: 'kacis', bicim: 'ju' }, out: { 'Kaçışlanan karakter': '1', 'Metindeki karakter sayısı': '1' }, text: '\\uD834\\uDD1E' },
    { in: { metin: '\u{1D11E}', yon: 'kacis', bicim: 'es6' }, text: '\\u{1D11E}' },
    { in: { metin: '\\uD834\\uDD1E = \\u{1D11E} = &#119070;', yon: 'geri' }, text: '\u{1D11E} = \u{1D11E} = \u{1D11E}' },
    { in: { metin: 'içerik', yon: 'kacis', bicim: 'css' }, text: 'i\\E7 erik' },
    { in: { metin: '\\E7 ay \\131', yon: 'geri', bicim: 'css' }, text: 'çay ı' },
    { in: { metin: 'düz yazı, kaçış yok', yon: 'geri' }, error: true },
    { in: { metin: '\\u{110000}', yon: 'geri' }, error: true },
    { in: { metin: '', yon: 'kacis' }, error: true },
  ],
  howto: [
    'Çevirmek istediğiniz metni ya da kaçış dizilerini "Metin" kutusuna yapıştırın.',
    '"İşlem" listesinden yönü seçin: okunur metinden kaçış dizisi üretmek ya da kaçış dizisini metne çevirmek.',
    'Kaçış üretirken hedef ortama uygun biçimi seçin: kaynak kod ve JSON için <code>\\uXXXX</code>, belgelendirme için <code>U+XXXX</code>, HTML için sayısal karakter kodu, stil dosyaları için CSS kaçışı.',
    'Yalnızca Türkçe harfler gibi ASCII dışı karakterlerin mi, yoksa bütün karakterlerin mi kaçışlanacağını belirleyin.',
    '"Çevir" düğmesine basın. Sonuç kutusundaki metni kopyalayın; kaç karakterin dönüştürüldüğü üst satırda yazar.',
  ],
  sections: [
    { h: 'Unicode kaçış dizisi nedir?', p: [
      'Unicode, dünyadaki yazı sistemlerinin her karakterine <strong>kod noktası</strong> denen bir sayı verir. Küçük "ç" harfinin kod noktası onaltılık E7, "ş" harfininki 15F, "ğ" harfininki 11F\'dir. Kaçış dizisi, karakterin kendisini yazmak yerine bu sayıyı yalnızca ASCII karakterlerle ifade etmenin yoludur. Böylece karakter kodlamasını bozan bir kanaldan geçse bile metin kaybolmaz; karşı taraf sayıyı okuyup doğru harfi yeniden üretir.',
      'Türkiye\'de yazılım geliştirenlerin bu dizilerle tanışması genellikle bir sorunla olur: sunucu yanıtında "Türkçe" yerine <code>T\\u00FCrk\\u00E7e</code> görünür, Java <code>.properties</code> dosyasındaki çeviriler okunmaz hâldedir ya da veritabanı dökümünde harfler sayılara dönüşmüştür. Bu yazımlar bozuk değildir; yalnızca çözülmeyi bekler.',
    ] },
    { h: 'Altı biçim ve kullanıldıkları yerler', ul: [
      '<code>\\uXXXX</code>: dört onaltılık basamak. JavaScript, JSON, Java, C#, Python ve pek çok dilde ortak yazım. "ç" için <code>\\u00E7</code>.',
      '<code>\\u{X}</code>: süslü parantez içinde kod noktası; basamak sayısı serbesttir. ES2015 sonrası JavaScript ve bazı dillerde. "ç" için <code>\\u{E7}</code>.',
      '<code>U+XXXX</code>: Unicode belgelerinde ve karakter tablolarında kullanılan gösterim; en az dört basamak yazılır. "ç" için <code>U+00E7</code>.',
      '<code>&#xHHHH;</code>: HTML ve XML\'de onaltılık sayısal karakter başvurusu. "ç" için <code>&#xE7;</code>.',
      'HTML ondalık sayısal karakter başvurusu: ve işareti ile kare işaretinden sonra ondalık kod, sonda noktalı virgül. "ç" harfinin ondalık kodu 231\'dir.',
      'CSS kaçışı: ters eğik çizgi ve en çok altı onaltılık basamak, ardından ayırıcı bir boşluk. <code>content</code> özelliğinde ve seçicilerde kullanılır. "ç" için <code>\\E7</code>.',
    ] },
    { h: 'Türkçe harflerin kodları', ul: [
      '<strong>ç</strong> U+00E7 (231) · <strong>Ç</strong> U+00C7 (199)',
      '<strong>ğ</strong> U+011F (287) · <strong>Ğ</strong> U+011E (286)',
      '<strong>ı</strong> U+0131 (305) · <strong>İ</strong> U+0130 (304)',
      '<strong>ö</strong> U+00F6 (246) · <strong>Ö</strong> U+00D6 (214)',
      '<strong>ş</strong> U+015F (351) · <strong>Ş</strong> U+015E (350)',
      '<strong>ü</strong> U+00FC (252) · <strong>Ü</strong> U+00DC (220)',
      '<strong>â</strong> U+00E2 (226) · <strong>î</strong> U+00EE (238) · <strong>û</strong> U+00FB (251)',
    ] },
    { h: 'Çözümlü örnek', p: [
      '"Türkçe" sözcüğünü <code>\\uXXXX</code> biçimine çevirelim ve yalnızca ASCII dışı karakterleri kaçışlayalım. Altı harften ikisi ASCII dışındadır: ü (U+00FC) ve ç (U+00E7). T, r, k ve e olduğu gibi kalır; sonuç <code>T\\u00FCrk\\u00E7e</code> olur. "Tüm karakterler" seçilseydi T harfi de <code>\\u0054</code> olarak yazılırdı.',
      'Ters yönde araç farklı biçimleri aynı metinde bir arada tanır. <code>\\u015Eehir \\u0130stanbul, U+011F ve &#x131;</code> girdisinde dört kaçış vardır ve sonuç "Şehir İstanbul, ğ ve ı" olur. Kaçış olmayan harfler, boşluklar ve noktalama değişmeden aktarılır.',
    ] },
    { h: 'Vekil çiftleri: neden bazen iki dizi çıkıyor?', p: [
      '<code>\\uXXXX</code> biçimi dört basamakla en çok FFFF değerine kadar yazabilir. Oysa Unicode 10FFFF\'e kadar uzanır; müzik işaretleri, eski yazılar ve emojiler bu üst bölgededir. UTF-16 bu karakterleri "vekil çifti" denen iki kod birimiyle saklar ve kaçış dizisi de buna uygun olarak iki parça hâlinde yazılır. Sol anahtarı işareti (U+1D11E) bu biçimde <code>\\uD834\\uDD1E</code> olur.',
      'Süslü parantezli biçim, <code>U+</code> gösterimi ve HTML başvuruları kod noktasını tek parça yazar: aynı karakter <code>\\u{1D11E}</code> olarak ifade edilir. Araç geri çevirirken her iki yazımı da doğru birleştirir; ardışık iki vekil tek bir karaktere dönüşür.',
    ] },
    { h: 'CSS kaçışlarında boşluk kuralı', p: [
      'CSS\'te kaçış dizisinin basamak sayısı sabit değildir, bu yüzden dizinin nerede bittiği belirsiz olabilir. "içerik" sözcüğünde ç harfini kaçışladığınızda <code>\\E7</code> dizisinden sonra gelen "e" de geçerli bir onaltılık basamaktır; boşluk bırakılmazsa tarayıcı <code>\\E7e</code> dizisini tek bir karakter (U+0E7E) sanar. Kural gereği kaçıştan sonraki tek bir boşluk ayırıcı sayılır ve metne dâhil edilmez. Araç bu yüzden her CSS kaçışının ardına bir boşluk koyar ve sonuç <code>i\\E7 erik</code> olur.',
      'Aynı belirsizlik nedeniyle CSS kaçışları geri çevirmede kendiliğinden tanınmaz: düz bir metindeki <code>\\b</code> ya da <code>\\f</code> hem başka dillerde kaçış hem de CSS\'te geçerli bir onaltılık dizidir. CSS kaçışı çözmek için biçim listesinden CSS\'i seçmeniz gerekir.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç adlandırılmış HTML varlıklarını (telif işareti ya da kesintisiz boşluk için kullanılan ad temelli yazımlar gibi) çözmez; yalnızca sayısal başvuruları tanır. Yüzde işaretiyle yazılan URL kodlaması ve Punycode da farklı düzenlerdir ve ayrı araçlarla çözülür. Geçerli aralığın dışındaki bir kod noktası (10FFFF\'ten büyük) yazıldığında araç hata verir.',
    ] },
  ],
  faq: [
    ['\\u00E7 ne demek?', 'Küçük "ç" harfinin Unicode kaçışıdır. Ters eğik çizgi ve u harfinden sonra gelen dört onaltılık basamak (00E7) karakterin kod noktasını verir. Benzer biçimde \\u015F "ş", \\u011F "ğ", \\u0131 "ı" harfidir.'],
    ['API yanıtımda Türkçe harfler neden \\u ile geliyor?', 'Bazı JSON kitaplıkları ASCII dışı karakterleri varsayılan olarak kaçışlar. Veri bozuk değildir; standart bir JSON ayrıştırıcısı bu dizileri kendiliğinden harfe çevirir. Çıktıyı gözle okumak istiyorsanız bu araçla çözebilir ya da kitaplığın ilgili ayarını kapatabilirsiniz.'],
    ['Büyük ve küçük harfli onaltılık yazım fark eder mi?', 'Hayır. \\u00e7 ile \\u00E7 aynı karakterdir; araç iki yazımı da kabul eder. Ürettiği dizilerde okunabilirlik için büyük harf kullanır.'],
    ['HTML\'de sayısal kod mu yoksa harfin kendisi mi kullanılmalı?', 'Sayfa UTF-8 olarak sunuluyorsa harfi doğrudan yazmak en temiz yoldur. Sayısal başvurular, kodlamayı denetleyemediğiniz e-posta şablonları ya da eski sistemler gibi ortamlarda işe yarar.'],
    ['U+ gösterimi kodda çalışır mı?', 'Hayır, U+00E7 yazımı bir programlama dili sözdizimi değil, belgelerde karakteri adlandırmanın standart yoludur. Kodda kullanmak için aynı sayıyı \\u00E7 ya da dilinizin kabul ettiği başka bir biçimde yazın.'],
    ['Bir emoji neden iki \\u dizisine dönüşüyor?', 'Kod noktası FFFF değerinden büyük olan karakterler UTF-16\'da iki kod birimiyle saklanır. \\uXXXX biçimi kod birimi yazdığı için iki dizi çıkar. Tek parça görmek için süslü parantezli biçimi seçin.'],
    ['Karakter sayısı ile çıktı uzunluğu neden farklı?', '"Metindeki karakter sayısı" kod noktalarını sayar; "Çıktı uzunluğu" ise kaçışlı metnin kaç ASCII karakter tuttuğunu gösterir. Tek bir ç harfi \\u00E7 olduğunda altı karakter yer kaplar.'],
    ['Yazdığım metin kaydediliyor mu?', 'Hayır. Çeviri tamamen tarayıcınızda yapılır; metin sunucuya gönderilmez ve saklanmaz. Sayfa yüklendikten sonra internet bağlantısı olmadan da çalışır.'],
  ],
  related: ['unicode-kod-noktasi', 'js-kacis-karakteri', 'json-kacis', 'html-kodla-coz', 'url-kodla', 'punycode-cevir'],
};
