export default {
  slug: 'html-etiket-temizle',
  title: 'HTML Etiketlerini Temizleme',
  h1Tail: 'HTML kodunu düz metne çevir',
  pageTitle: 'HTML Etiketlerini Temizleme – HTML Kodunu Düz Metne Çevirme',
  description: 'HTML kodundaki etiketleri silip yalnızca okunabilir metni alın. Paragraf ve liste satırları korunur, karakter varlıkları çözülür, betik ve stil blokları atılır.',
  card: 'HTML kodundaki etiketleri temizleyip düz metni alın; satır yapısı korunur, özel karakter kodları çözülür.',
  category: 'metin',
  keywords: ['html etiket temizleme', 'html kodunu metne çevirme', 'html temizleyici', 'etiketleri silme', 'strip tags', 'html to text', 'html kodlarını kaldırma', 'düz metne çevirme'],
  lead: `HTML kodunu yapıştırın; araç bütün etiketleri kaldırıp geriye <strong>yalnızca okunabilir metni</strong> bıraksın. Paragraflar, başlıklar ve liste maddeleri ayrı satırlarda kalır, özel karakter kodları gerçek karakterlere çevrilir, betik ve stil bloklarının içeriği atılır.`,
  button: 'Temizle',
  inputs: [
    { id: 'kod', label: 'HTML kodu', type: 'textarea', placeholder: 'Etiketlerinden arındırılacak HTML kodunu buraya yapıştırın' },
    { id: 'satir', label: 'Satır yapısı', type: 'select', options: [['koru', 'Paragraf, başlık ve liste maddelerini ayrı satıra yaz'], ['tek', 'Her şeyi tek satırda birleştir']] },
    { id: 'varlik', label: 'Karakter varlıkları', type: 'select', options: [['coz', 'Gerçek karaktere çevir'], ['ayni', 'Olduğu gibi bırak']] },
  ],
  compute(v, h) {
    const ham = String(v.kod ?? '');
    if (ham.trim() === '') h.err('"HTML kodu" alanına temizlenecek kodu yapıştırın.');
    const etiketRe = /<\/?[a-zA-Z][^<>]*>|<![^<>]*>/g;
    let t = ham.replace(/<!--[\s\S]*?-->/g, ' ');
    const etiketSayisi = (t.match(etiketRe) || []).length;
    t = t.replace(/<(script|style|noscript|template)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, ' ');
    t = t.replace(/\s+/g, ' ');
    const kir = v.satir === 'tek' ? ' ' : '\n';
    t = t.replace(/<br\s*\/?>/gi, kir);
    t = t.replace(/<\/?(p|div|h[1-6]|li|ul|ol|tr|table|thead|tbody|blockquote|section|article|header|footer|nav|aside|main|pre|hr|dt|dd|dl|figure|figcaption|form|option|title)\b[^<>]*>/gi, kir);
    t = t.replace(/<\/(td|th)\s*>/gi, ' ');
    t = t.replace(etiketRe, '');
    let cozulen = 0;
    if (v.varlik !== 'ayni') {
      const adlar = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', copy: '©', reg: '®', trade: '™', hellip: '…', mdash: '—', ndash: '–', laquo: '«', raquo: '»', lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”', euro: '€', pound: '£', deg: '°', times: '×', divide: '÷', middot: '·', bull: '•', sect: '§', para: '¶', plusmn: '±', frac12: '½', ccedil: 'ç', Ccedil: 'Ç', ouml: 'ö', Ouml: 'Ö', uuml: 'ü', Uuml: 'Ü', scedil: 'ş', Scedil: 'Ş', gbreve: 'ğ', Gbreve: 'Ğ', inodot: 'ı', imath: 'ı', Idot: 'İ', acirc: 'â', Acirc: 'Â', icirc: 'î', Icirc: 'Î', ucirc: 'û', Ucirc: 'Û' };
      t = t.replace(/&(#[xX][0-9a-fA-F]{1,6}|#\d{1,7}|[a-zA-Z][a-zA-Z0-9]{1,10});/g, (tam, ad) => {
        if (ad[0] === '#') {
          const kod = /^#x/i.test(ad) ? parseInt(ad.slice(2), 16) : parseInt(ad.slice(1), 10);
          if (!(kod > 0 && kod <= 0x10ffff) || (kod >= 0xd800 && kod <= 0xdfff)) return tam;
          cozulen++;
          return String.fromCodePoint(kod);
        }
        if (Object.prototype.hasOwnProperty.call(adlar, ad)) { cozulen++; return adlar[ad]; }
        return tam;
      });
    }
    const satirlar = t.split('\n').map((s) => s.replace(/[ \t ]+/g, ' ').trim()).filter((s) => s !== '');
    const sonuc = satirlar.join('\n');
    if (sonuc === '') h.err('Etiketler kaldırıldığında geriye metin kalmadı. Kod yalnızca etiket, betik ya da görsel içeriyor olabilir.');
    return {
      rows: [
        ['Temiz metin uzunluğu', `${Array.from(sonuc).length} karakter`],
        ['Özgün kod uzunluğu', `${Array.from(ham).length} karakter`],
        ['Kaldırılan etiket', String(etiketSayisi)],
        ['Çözülen karakter varlığı', String(cozulen)],
        ['Satır sayısı', String(satirlar.length)],
      ],
      text: sonuc,
      note: 'Art arda boşluklar teke indirilir, boş satırlar atılır. Yorumlar ile betik ve stil bloklarının içeriği sonuca alınmaz.',
    };
  },
  cases: [
    { in: { kod: '<p>Merhaba <b>dünya</b>!</p>' }, out: { 'Temiz metin uzunluğu': '14 karakter', 'Özgün kod uzunluğu': '28 karakter', 'Kaldırılan etiket': '4', 'Satır sayısı': '1' }, text: 'Merhaba dünya!' },
    { in: { kod: '<h1>Başlık</h1>\n<p>İlk paragraf.</p>\n<ul>\n  <li>Bir</li>\n  <li>İki</li>\n</ul>' }, out: { 'Kaldırılan etiket': '10', 'Satır sayısı': '4' }, text: 'Başlık\nİlk paragraf.\nBir\nİki' },
    { in: { kod: '<p>Fiyat &lt; 100 TL &amp; kargo &uuml;cretsiz&nbsp;!</p>' }, out: { 'Çözülen karakter varlığı': '4' }, text: 'Fiyat < 100 TL & kargo ücretsiz !' },
    { in: { kod: 'A &amp; B<br>C', varlik: 'ayni' }, out: { 'Çözülen karakter varlığı': '0', 'Kaldırılan etiket': '1' }, text: 'A &amp; B\nC' },
    { in: { kod: '<div>bir</div><div>iki</div>', satir: 'tek' }, out: { 'Satır sayısı': '1' }, text: 'bir iki' },
    { in: { kod: '<style>p{color:red}</style><p>Görünen</p><script>alert(1)</script><!-- <b>yorum</b> -->' }, out: { 'Kaldırılan etiket': '6' }, text: 'Görünen' },
    { in: { kod: '5 < 6 ve 7 > 3' }, out: { 'Kaldırılan etiket': '0' }, text: '5 < 6 ve 7 > 3' },
    { in: { kod: '&#199;ay &#x131;l&#305;k &amp;lt;' }, out: { 'Çözülen karakter varlığı': '4' }, text: 'Çay ılık &lt;' },
    { in: { kod: '<br><img src="a.png">' }, error: true },
    { in: { kod: '' }, error: true },
  ],
  howto: [
    `Temizlemek istediğiniz HTML kodunu "HTML kodu" kutusuna yapıştırın. Bir sayfanın tamamı, bir e-posta şablonu ya da tek bir paragraf olabilir.`,
    `Satır yapısını seçin: paragrafların ve liste maddelerinin alt alta kalmasını istiyorsanız ilk seçeneği, tek parça metin istiyorsanız ikinci seçeneği kullanın.`,
    `Özel karakter kodlarının gerçek karakterlere çevrilmesini istemiyorsanız "Olduğu gibi bırak" seçeneğine geçin.`,
    `"Temizle" düğmesine basın. Düz metin alttaki kutuda görünür; üstteki satırlar kaç etiketin kaldırıldığını ve metnin uzunluğunu gösterir.`,
    `Sonucu kopyalayıp belgenize, mesajınıza ya da içerik yönetim panelinize yapıştırın.`,
  ],
  sections: [
    { h: 'HTML etiketi nedir, neden temizlenir?', p: [
      `Web sayfaları, metnin nasıl görüneceğini ve nasıl yapılandırılacağını tarayıcıya bildiren etiketlerle yazılır. Etiketler küçüktür ve büyüktür işaretleri arasına alınır: <code><p></code> bir paragraf başlatır, <code><b></code> kalın yazı açar, <code><li></code> bir liste maddesini gösterir. Tarayıcı bu etiketleri ekranda göstermez, yalnızca yorumlar. Ancak kodu bir metin düzenleyiciye, bir hesap tablosuna ya da bir mesaj kutusuna yapıştırdığınızda etiketler olduğu gibi görünür ve asıl metni okunmaz hale getirir.`,
      `Etiket temizleme, kodun içinden yalnızca insanın okuyacağı metni çekip almaktır. Bir veritabanından dışa aktarılmış ürün açıklamalarını sadeleştirmek, bir e-posta şablonundaki yazıyı düzenlemek üzere almak, bir sayfanın kelime sayısını ölçmek ya da biçimlendirmesi bozulmuş bir içeriği sıfırdan düzenlemek için bu işlem gerekir.`,
    ] },
    { h: 'Araç adım adım ne yapar?', ol: [
      `Kod içindeki yorumları kaldırır; yorumlar sayfada görünmediği için metne dahil edilmez.`,
      `Betik (script) ve stil (style) bloklarını içerikleriyle birlikte atar. Bunların arasındaki program kodu ve biçim kuralları okunacak metin değildir.`,
      `Kaynak koddaki girinti ve satır sonlarını tek boşluğa indirir; tarayıcılar da aynı şekilde davranır.`,
      `Paragraf, başlık, liste maddesi, tablo satırı ve satır sonu etiketlerinin yerine satır sonu koyar. Kalın, italik, bağlantı ve span gibi satır içi etiketleri iz bırakmadan siler.`,
      `Karakter varlıklarını gerçek karakterlere çevirir.`,
      `Fazla boşlukları ve boş satırları temizleyip sonucu verir.`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `Kutuya <code><p>Merhaba <b>dünya</b>!</p></code> kodunu yapıştırdığınızı düşünün. Kod 28 karakterdir ve içinde dört etiket vardır: paragrafın açılış ve kapanış etiketleri ile kalın yazının açılış ve kapanış etiketleri. Paragraf etiketleri satır sonuna dönüşür, kalın etiketleri doğrudan silinir, baştaki ve sondaki boş satırlar atılır.`,
      `Sonuç <strong>Merhaba dünya!</strong> olur: 14 karakter, tek satır. Kaldırılan etiket sayısı 4 görünür. Bir başlık, bir paragraf ve iki maddelik bir listeden oluşan daha uzun bir kodda ise on etiket kaldırılır ve sonuç dört satır olur: başlık, paragraf ve iki madde alt alta yazılır.`,
    ] },
    { h: 'Karakter varlıkları ne demek?', p: [
      `HTML içinde bazı karakterler doğrudan yazılamaz ya da yazılması sakıncalıdır. Küçüktür ve büyüktür işaretleri etiket başlangıcı sanılacağı için, ve işareti (&) de özel anlam taşıdığı için kodla yazılır. Bu kodlara karakter varlığı denir; ve işaretiyle başlar, noktalı virgülle biter. Arada ya kısa bir ad ya da diyez işaretiyle birlikte karakterin sayısal kodu bulunur. Örneğin <code>&uuml;</code> ü harfini, <code>&copy;</code> telif işaretini, sayısal kodu 199 olarak yazılmış varlık ise Ç harfini gösterir.`,
      `Eski sistemlerden aktarılmış Türkçe içeriklerde ç, ğ, ı, ö, ş, ü harflerinin bu biçimde kodlanmış olması sık rastlanan bir durumdur ve metni okunmaz kılar. Araç yaygın adlı varlıkları ve bütün sayısal kodları çözer. Bölünemez boşluk varlığı sıradan boşluğa çevrilir. Tanınmayan bir ad olduğu gibi bırakılır. Çözme işlemi tek geçişte yapılır; iki kez kodlanmış bir varlık yalnızca bir kat açılır, böylece metinde bilerek gösterilmek istenen kodlar bozulmaz.`,
    ] },
    { h: 'Satır yapısı seçenekleri', p: [
      `"Ayrı satıra yaz" seçeneğinde blok düzeyindeki öğeler, yani sayfada kendi satırını kaplayan paragraflar, başlıklar, liste maddeleri, alıntılar ve tablo satırları sonuçta da ayrı satırlara düşer. Tablo hücreleri aynı satırda boşlukla ayrılır. Bu seçenek metnin okunabilir düzenini korur ve çoğu iş için doğru tercihtir.`,
      `"Tek satırda birleştir" seçeneğinde bütün öğeler aralarına birer boşluk konarak art arda yazılır. Meta açıklama hazırlarken, bir özet alanını doldururken ya da metni tek hücreye sığdırmanız gerektiğinde bu seçenek kullanışlıdır.`,
    ] },
    { h: 'Sınırlar ve güvenlik notu', p: [
      `Araç kodu bir tarayıcı gibi çalıştırmaz, yalnızca metin olarak işler. Bu nedenle stil kurallarıyla gizlenmiş bölümler de sonuçta görünür; görsellerin açıklama metinleri ve bağlantıların hedef adresleri ise etiketin içinde yer aldığı için sonuca alınmaz. Bağlantı adreslerine ihtiyacınız varsa bağlantı ayıklama aracını kullanın. Önceden biçimlendirilmiş (pre) blokların içindeki girinti ve satır düzeni korunmaz.`,
      `Küçüktür işaretinden hemen sonra harf gelmiyorsa bu bir etiket sayılmaz; "5 < 6" gibi ifadeler bozulmadan kalır. Buna karşılık küçüktür işaretine bitişik yazılmış bir kelime etiket sanılıp silinebilir. Son olarak, bu araç bir güvenlik süzgeci değildir: kullanıcıdan gelen içeriği bir web sayfasında zararsız hale getirmek için etiket silmek yeterli olmaz; bunun için sunucu tarafında bu işe özel olarak yazılmış ve güncel tutulan kitaplıklar kullanılmalıdır.`,
    ] },
  ],
  faq: [
    [`HTML kodunu düz metne nasıl çeviririm?`, `Kodu kutuya yapıştırıp "Temizle" düğmesine basın. Bütün etiketler kaldırılır, geriye yalnızca sayfada görünen metin kalır.`],
    [`Paragraflar ve liste maddeleri birbirine yapışır mı?`, `Hayır. Varsayılan ayarda paragraflar, başlıklar, liste maddeleri ve satır sonu etiketleri ayrı satırlara dönüştürülür. Tek parça metin isterseniz "Her şeyi tek satırda birleştir" seçeneğini kullanın.`],
    [`Betik ve stil kodları sonuçta görünür mü?`, `Hayır. Betik ve stil bloklarının hem etiketleri hem de içerikleri atılır. Kod içindeki yorumlar da sonuca alınmaz.`],
    [`Türkçe karakterler kod olarak görünüyorsa düzelir mi?`, `Evet. Adlı ya da sayısal karakter varlığı olarak yazılmış ç, ğ, ı, ö, ş, ü harfleri gerçek harflere çevrilir.`],
    [`Bağlantıların adresleri metne ekleniyor mu?`, `Hayır. Yalnızca bağlantının görünen yazısı kalır; hedef adres etiketin içinde olduğu için silinir. Adresleri ayrıca listelemek için bağlantı ayıklama aracını kullanabilirsiniz.`],
    [`Word ya da e-posta programından gelen karmaşık kodu temizler mi?`, `Evet. Bu tür programların ürettiği iç içe ve uzun nitelikli etiketler de aynı kurallarla kaldırılır. Çok dağınık kodlarda sonuçtaki satır bölünmelerini gözden geçirmeniz yararlı olur.`],
    [`Bu araçla kullanıcı girdisini güvenli hale getirebilir miyim?`, `Hayır. Araç okunabilir metin elde etmek için tasarlanmıştır, güvenlik süzgeci değildir. Web uygulamalarında zararlı kodlara karşı koruma için sunucu tarafında bu amaca özel kitaplıklar kullanılmalıdır.`],
    [`Yapıştırdığım kod bir yere gönderiliyor mu?`, `Hayır. Temizleme işlemi tarayıcınızda yapılır. Kod çalıştırılmaz, sunucuya iletilmez ve saklanmaz.`],
  ],
  related: ['url-ayikla', 'bosluk-temizle', 'bos-satirlari-sil', 'emoji-temizle', 'karakter-sayaci', 'satirlari-birlestir'],
};
