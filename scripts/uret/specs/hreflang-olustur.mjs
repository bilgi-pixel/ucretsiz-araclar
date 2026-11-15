export default {
  slug: 'hreflang-olustur',
  title: 'Hreflang Etiketi Oluşturma',
  h1Tail: 'çok dilli siteler için',
  pageTitle: 'Hreflang Etiketi Oluşturma – Çok Dilli Site İçin HTML ve Sitemap',
  description: 'Çok dilli sayfalarınız için hreflang etiketlerini HTML, XML site haritası ya da HTTP başlığı biçiminde oluşturun. Dil ve bölge kodları denetlenir, x-default eklenir.',
  card: 'Sayfanın dil sürümlerini yazın; hreflang etiketlerini HTML, site haritası ya da HTTP başlığı olarak alın.',
  category: 'gelistirici',
  keywords: ['hreflang oluşturma', 'hreflang etiketi', 'çok dilli site seo', 'x-default nedir', 'hreflang tr', 'hreflang sitemap', 'dil etiketi oluşturma', 'rel alternate hreflang'],
  lead: 'Aynı sayfanın Türkçe, İngilizce, Almanca gibi farklı dil sürümleri varsa arama motorlarına hangisinin kime gösterileceğini <strong>hreflang</strong> etiketleriyle bildirirsiniz. Her satıra bir dil kodu ve adres yazın; araç kodları denetler ve etiketleri seçtiğiniz biçimde üretir.',
  button: 'Oluştur',
  inputs: [
    { id: 'satirlar', label: 'Dil kodu ve adres (her satıra bir sürüm)', type: 'textarea', placeholder: 'tr ornek.com/\nen ornek.com/en/\nde-AT ornek.com/at/', hint: 'Önce dil kodu, boşluk, sonra sayfanın tam adresi. Protokol yazmazsanız https eklenir.', rows: 5 },
    { id: 'varsayilan', label: 'x-default adresi', type: 'text', placeholder: 'İsteğe bağlı; eşleşmeyen diller için', wide: true },
    { id: 'bicim', label: 'Çıktı biçimi', type: 'select', options: [['html', 'HTML (head içine link etiketleri)'], ['xml', 'XML site haritası (xhtml:link)'], ['http', 'HTTP Link başlığı']] },
  ],
  compute(v, h) {
    const adresDuzelt = (u, yer) => {
      let a = u.trim();
      const sema = /^([a-z][a-z0-9+.-]*):\/\//i.exec(a);
      if (sema && !/^https?$/i.test(sema[1])) h.err(`${yer}: adres http ya da https ile başlamalı.`);
      if (!sema) a = 'https://' + a.replace(/^\/+/, '');
      const host = a.replace(/^https?:\/\//i, '').split(/[/?#]/)[0];
      if (!host || !host.includes('.') || /\s/.test(a)) h.err(`${yer}: "${u}" tam bir adres değil. Hreflang için alan adını içeren tam adres gerekir (örn. ornek.com/en/).`);
      return a;
    };
    const kodDuzelt = (k, yer) => {
      const t = k.replace(/_/g, '-');
      if (/^x-default$/i.test(t)) return 'x-default';
      const m = /^([a-z]{2,3})(?:-([a-z]{4}))?(?:-([a-z]{2}))?$/i.exec(t);
      if (!m) h.err(`${yer}: "${k}" geçerli bir hreflang kodu değil. Dil kodu (tr, en) ya da dil-bölge (en-GB, de-AT) biçiminde yazın.`);
      const bolge = m[3] ? m[3].toUpperCase() : '';
      if (bolge === 'UK') h.err(`${yer}: Birleşik Krallık için bölge kodu UK değil GB olmalı (ör. en-GB).`);
      const yazi = m[2] ? m[2][0].toUpperCase() + m[2].slice(1).toLowerCase() : '';
      return [m[1].toLowerCase(), yazi, bolge].filter(Boolean).join('-');
    };
    const satirlar = h.lines(v.satirlar);
    if (!satirlar.length) h.err('En az iki dil sürümü yazın; her satıra bir dil kodu ve adres gelir.');
    const liste = [], gorulen = new Set();
    satirlar.forEach((s, i) => {
      const yer = `${i + 1}. satır`;
      const m = /^(\S+?)[\s,;=|]+(\S+)$/.exec(s);
      if (!m) h.err(`${yer}: dil kodu ve adresi boşlukla ayırarak yazın (örn. "tr ornek.com/").`);
      const kod = kodDuzelt(m[1], yer);
      if (gorulen.has(kod)) h.err(`${yer}: "${kod}" kodu birden fazla kez yazılmış. Her dil kodu yalnızca bir adrese işaret edebilir.`);
      gorulen.add(kod);
      liste.push([kod, adresDuzelt(m[2], yer)]);
    });
    const xd = String(v.varsayilan ?? '').trim();
    if (xd) {
      if (gorulen.has('x-default')) h.err('x-default hem satırlarda hem ayrı alanda yazılmış; yalnızca birini kullanın.');
      liste.push(['x-default', adresDuzelt(xd, 'x-default adresi')]);
    }
    if (liste.filter(([k]) => k !== 'x-default').length < 2) h.err('Hreflang en az iki dil sürümü olduğunda anlamlıdır; ikinci bir dil satırı ekleyin.');
    const escH = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    let text;
    if (v.bicim === 'xml') text = liste.map(([k, u]) => `<xhtml:link rel="alternate" hreflang="${k}" href="${escH(u)}"/>`).join('\n');
    else if (v.bicim === 'http') text = 'Link: ' + liste.map(([k, u]) => `<${u}>; rel="alternate"; hreflang="${k}"`).join(', ');
    else text = liste.map(([k, u]) => `<link rel="alternate" hreflang="${k}" href="${escH(u)}">`).join('\n');
    return {
      rows: [
        ['Etiket sayısı', String(liste.length)],
        ['Dil kodları', liste.map(([k]) => k).join(', ')],
        ['x-default', liste.some(([k]) => k === 'x-default') ? 'Var' : 'Yok'],
      ],
      text,
      note: v.bicim === 'xml' ? 'Bu satırları site haritasındaki her dil sürümünün url öğesinin içine ekleyin; urlset öğesinde xhtml ad alanı tanımlı olmalıdır.' : v.bicim === 'http' ? 'Başlığı listedeki her adresin sunucu yanıtına ekleyin (PDF gibi HTML olmayan dosyalar için uygundur).' : 'Aynı etiket kümesini listedeki her dil sürümünün head bölümüne ekleyin.',
    };
  },
  cases: [
    { in: { satirlar: 'tr https://ornek.com/\nen https://ornek.com/en/' }, out: { 'Etiket sayısı': '2', 'Dil kodları': 'tr, en', 'x-default': 'Yok' }, text: '<link rel="alternate" hreflang="tr" href="https://ornek.com/">\n<link rel="alternate" hreflang="en" href="https://ornek.com/en/">' },
    { in: { satirlar: 'TR ornek.com/\nen_gb ornek.com/uk/\nde-at ornek.com/at/', varsayilan: 'ornek.com/' }, out: { 'Etiket sayısı': '4', 'Dil kodları': 'tr, en-GB, de-AT, x-default', 'x-default': 'Var' }, text: '<link rel="alternate" hreflang="tr" href="https://ornek.com/">\n<link rel="alternate" hreflang="en-GB" href="https://ornek.com/uk/">\n<link rel="alternate" hreflang="de-AT" href="https://ornek.com/at/">\n<link rel="alternate" hreflang="x-default" href="https://ornek.com/">' },
    { in: { satirlar: 'tr https://ornek.com/urun?id=5&renk=mavi\nen https://ornek.com/en/product?id=5&color=blue', bicim: 'xml' }, text: '<xhtml:link rel="alternate" hreflang="tr" href="https://ornek.com/urun?id=5&amp;renk=mavi"/>\n<xhtml:link rel="alternate" hreflang="en" href="https://ornek.com/en/product?id=5&amp;color=blue"/>' },
    { in: { satirlar: 'tr https://ornek.com/katalog.pdf\nen https://ornek.com/en/catalog.pdf', bicim: 'http' }, text: 'Link: <https://ornek.com/katalog.pdf>; rel="alternate"; hreflang="tr", <https://ornek.com/en/catalog.pdf>; rel="alternate"; hreflang="en"' },
    { in: { satirlar: 'zh-hans ornek.com/zh/\nzh-HANT-tw ornek.com/tw/\nx-default ornek.com/' }, out: { 'Dil kodları': 'zh-Hans, zh-Hant-TW, x-default', 'Etiket sayısı': '3' } },
    { in: { satirlar: 'tr, ornek.com/\nku = ornek.com/ku/' }, out: { 'Dil kodları': 'tr, ku' } },
    { in: { satirlar: 'tr https://ornek.com/\nen-UK https://ornek.com/uk/' }, error: true },
    { in: { satirlar: 'tr https://ornek.com/' }, error: true },
    { in: { satirlar: 'tr https://ornek.com/\ntr https://ornek.com/tr/' }, error: true },
    { in: { satirlar: 'tr /anasayfa\nen /en/' }, error: true },
    { in: { satirlar: 'türkçe https://ornek.com/\nen https://ornek.com/en/' }, error: true },
  ],
  howto: [
    'Metin kutusunda her satıra bir dil sürümü yazın: önce dil kodu, bir boşluk, ardından o dildeki sayfanın tam adresi.',
    'Belirli bir ülkeyi hedefliyorsanız dil kodunun yanına bölge kodunu ekleyin (ör. <code>en-GB</code>, <code>de-AT</code>). Büyük-küçük harf ve alt çizgi farklarını araç düzeltir.',
    'Listelenen dillerin hiçbirine uymayan ziyaretçilere gösterilecek genel sayfanız varsa adresini "x-default adresi" alanına yazın.',
    'Çıktı biçimini seçip "Oluştur" düğmesine basın.',
    'Üretilen kümenin tamamını, listedeki her dil sürümüne ayrı ayrı ekleyin; yalnızca bir sayfaya koymak yeterli değildir.',
  ],
  sections: [
    { h: 'Hreflang ne işe yarar?', p: [
      'Bir sitenin aynı içeriği birden fazla dilde ya da farklı ülkelere göre uyarlanmış sürümlerde sunması yaygındır: Türkçe ana sayfa, İngilizce çevirisi, Almanya ve Avusturya için ayrı fiyatlı Almanca sayfalar gibi. Arama motoru bu sayfaları birbirinden bağımsız görürse yanlış sürümü gösterebilir; Almanya\'dan arama yapan kişiye Türkçe sayfa çıkabilir ya da birbirine çok benzeyen iki İngilizce sayfa yinelenen içerik gibi değerlendirilebilir.',
      'Hreflang, "bu sayfanın şu dildeki karşılığı şu adrestedir" bilgisini taşıyan bir işarettir. Arama motoru bu bilgiyi kullanarak arama yapan kişinin dil ve bölge ayarına en uygun sürümü sonuçlarda gösterir. Sıralamayı doğrudan yükselten bir etken değildir; doğru sayfanın doğru kişiye gitmesini sağlar.',
    ] },
    { h: 'Dil ve bölge kodları nasıl yazılır?', p: [
      'Kodun ilk parçası dildir ve iki harfli ISO 639-1 kodu kullanılır: Türkçe <code>tr</code>, İngilizce <code>en</code>, Almanca <code>de</code>, Arapça <code>ar</code>, Kürtçe <code>ku</code>, Rusça <code>ru</code>. İsteğe bağlı ikinci parça bölgedir ve iki harfli ISO 3166-1 ülke kodudur: <code>en-GB</code> Birleşik Krallık İngilizcesi, <code>de-AT</code> Avusturya Almancasıdır. Çince gibi birden fazla yazı sistemi olan dillerde araya dört harfli yazı kodu girebilir (<code>zh-Hans</code>, <code>zh-Hant</code>).',
      'Kural olarak dil tek başına yazılabilir ama bölge tek başına yazılamaz. <code>de</code> geçerlidir ve tüm Almanca konuşanları kapsar; yalnızca <code>AT</code> yazmak ise geçersizdir. Türkiye\'yi hedefleyen Türkçe sayfa için <code>tr</code> çoğu zaman yeterlidir; <code>tr-TR</code> ancak Kıbrıs ya da Almanya\'daki Türkçe konuşanlar için ayrı sayfanız varsa anlam kazanır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Üç sürümlü bir site düşünelim: Türkçe ana sayfa kök adreste, Birleşik Krallık için İngilizce sürüm <code>/uk/</code> altında, Avusturya için Almanca sürüm <code>/at/</code> altında. Kutuya <code>TR</code>, <code>en_gb</code> ve <code>de-at</code> kodlarıyla üç satır yazıp x-default alanına ana sayfayı girdiğinizde araç dört etiket üretir. Kodlar <code>tr</code>, <code>en-GB</code> ve <code>de-AT</code> olarak düzeltilir, dördüncü etiket <code>x-default</code> değerini taşır ve sonuç tablosunda etiket sayısı 4 görünür.',
      'Bu dört satırlık küme Türkçe sayfanın da, İngilizce sayfanın da, Almanca sayfanın da başlık bölümüne aynen eklenir. Her sayfa hem kendisini hem diğer sürümleri listeler.',
    ] },
    { h: 'En sık yapılan hatalar', ul: [
      '<strong>Karşılıklı bağlantı eksikliği:</strong> Türkçe sayfa İngilizceyi gösteriyor ama İngilizce sayfa Türkçeyi göstermiyorsa etiketler yok sayılabilir. Küme tüm sürümlerde aynı olmalıdır.',
      '<strong>Kendine referansı atlamak:</strong> her sayfa kendi dil kodunu ve adresini de listelemelidir.',
      '<strong>Yanlış bölge kodu:</strong> Birleşik Krallık\'ın kodu UK değil <code>GB</code>\'dir. Araç bu hatayı yakalar ve uyarır.',
      '<strong>Göreli adres kullanmak:</strong> <code>/en/</code> gibi yollar geçersizdir; protokol ve alan adını içeren tam adres gerekir.',
      '<strong>Canonical ile çelişki:</strong> hreflang\'de gösterilen adres, o sayfanın canonical adresiyle aynı olmalıdır. Canonical başka bir dile işaret ediyorsa iki sinyal birbirini bozar.',
      '<strong>Yönlenen ya da açılmayan adresler:</strong> etiketlerdeki her adres doğrudan açılan, dizine eklenebilir bir sayfa olmalıdır.',
    ] },
    { h: 'Üç yerleştirme yöntemi', p: [
      'En yaygın yöntem, etiketleri her sayfanın <code>head</code> bölümüne yazmaktır; az sayıda dili olan siteler için en kolayıdır. Dil sayısı arttıkça her sayfaya onlarca satır eklemek sayfayı şişirir. Bu durumda aynı bilgi XML site haritasında verilebilir: her adresin <code>url</code> öğesinin içine tüm sürümler <code>xhtml:link</code> satırlarıyla yazılır. Üçüncü yöntem HTTP yanıtındaki <code>Link</code> başlığıdır ve başlık bölümü olmayan PDF gibi dosyalar için kullanılır. Üç yöntemden yalnızca birini seçin; aynı bilgiyi birden fazla yerde tutmak, biri güncellenip diğeri unutulduğunda çelişkiye yol açar.',
    ] },
    { h: 'x-default ne zaman eklenir?', p: [
      '<code>x-default</code> bir dil kodu değil, "listedeki hiçbir dil uymuyorsa bunu göster" anlamına gelen özel bir değerdir. Genellikle dil seçim sayfasına ya da en geniş kitleye hitap eden sürüme, çoğu sitede İngilizce ya da ana dildeki ana sayfaya verilir. Zorunlu değildir ama önerilir; Türkçe ve İngilizce sürümü olan bir sitede Fransızca arama yapan kullanıcıya hangi sayfanın gösterileceğini bu etiket belirler.',
      'Araç adreslerin açılıp açılmadığını ve karşılıklı bağlantıların sitenizde gerçekten bulunduğunu denetleyemez; yalnızca biçimi doğrular. Yayına aldıktan sonra arama motorlarının web yöneticisi araçlarındaki uluslararası hedefleme raporlarını kontrol edin.',
    ] },
  ],
  faq: [
    ['Hreflang etiketi nereye eklenir?', 'HTML biçiminde her dil sürümünün <code>head</code> bölümüne eklenir. Alternatif olarak XML site haritasına ya da sunucunun HTTP yanıt başlığına yazılabilir. Üç yöntemden yalnızca birini kullanmanız yeterlidir.'],
    ['Türkçe için hreflang kodu tr mi, tr-TR mi olmalı?', 'Yalnızca tek bir Türkçe sürümünüz varsa <code>tr</code> yeterlidir ve tüm Türkçe konuşanları kapsar. <code>tr-TR</code> kodunu, başka bir ülkedeki Türkçe konuşanlar için ayrı sayfanız olduğunda kullanın.'],
    ['x-default zorunlu mu?', 'Hayır, zorunlu değildir. Ancak listelediğiniz dillerin hiçbirine uymayan kullanıcılara hangi sayfanın gösterileceğini belirttiği için eklenmesi önerilir.'],
    ['Tek dilli sitede hreflang gerekir mi?', 'Gerekmez. Hreflang, aynı içeriğin birden fazla dil ya da bölge sürümü olduğunda işe yarar. Bu yüzden araç en az iki dil satırı ister.'],
    ['Her sayfaya aynı etiketleri mi eklemeliyim?', 'Evet. Bir sayfa grubunun tüm sürümleri aynı etiket kümesini taşımalı; her sürüm hem kendisini hem diğerlerini göstermelidir. Tek yönlü bağlantılar dikkate alınmayabilir.'],
    ['Hreflang ile canonical birlikte kullanılır mı?', 'Evet, birlikte kullanılır. Her dil sürümünün canonical etiketi kendisini göstermeli, hreflang etiketleri ise diğer sürümleri listelemelidir. Canonical\'ı başka dildeki sayfaya yönlendirmek hreflang\'i etkisiz kılar.'],
    ['Dil kodunda büyük-küçük harf önemli mi?', 'Arama motorları büyük-küçük harfe duyarsız okur, ancak yaygın yazım dilin küçük, bölgenin büyük harfle yazılmasıdır (<code>en-GB</code>). Araç girdiğiniz kodları bu biçime çevirir, alt çizgiyi tireye dönüştürür.'],
    ['Yazdığım adresler bir yere gönderiliyor mu?', 'Hayır. Etiketler tarayıcınızda oluşturulur; adresler ve dil kodları sunucuya iletilmez. Araç sayfalarınıza bağlanmaz, yalnızca metin üretir.'],
  ],
  related: ['canonical-olustur', 'sitemap-xml-olustur', 'meta-etiket-olustur', 'robots-txt-olustur', 'yonlendirme-meta-olustur'],
};
