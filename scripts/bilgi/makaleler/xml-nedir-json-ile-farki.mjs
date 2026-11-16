export default {
  slug: "xml-nedir-json-ile-farki",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "XML Nedir, Nasıl Okunur? JSON ile XML Arasındaki Fark ve Dönüştürme",
  pageTitle: "XML Nedir, Nasıl Açılır? JSON ile XML Farkı ve Dönüştürme",
  description: "XML nedir, XML dosyası nasıl açılır ve okunur? e-Fatura neden XML (UBL-TR)? Etiket ve öznitelik farkı, JSON ve YAML karşılaştırması, dönüştürmede kaybolanlar.",
  keywords: ["xml nedir", "xml dosyası nasıl açılır", "json xml farkı", "xml biçimlendirme", "e-fatura xml", "xml json dönüştürme", "yaml nedir", "xml öznitelik nedir"],
  lead: "XML (Extensible Markup Language, genişletilebilir işaretleme dili), veriyi açılış ve kapanış etiketleri arasında, ağaç yapısında saklayan <strong>düz metin tabanlı bir veri biçimidir</strong>. Bir XML dosyasını herhangi bir metin düzenleyiciyle ya da tarayıcıyla açabilirsiniz; tek satıra sıkıştırılmışsa bir XML biçimlendiriciyle girintili hâle getirip okumak çok kolaylaşır. Bu sayfada XML'in yapısını, e-Fatura dosyalarının neden XML olduğunu, JSON ve YAML ile farklarını ve XML'i JSON'a çevirirken nelerin kaybolabileceğini örneklerle bulacaksınız.",
  kisaCevap: [
    "XML, veriyi etiketlerle işaretleyen düz metin biçimidir; her açılan etiket kapanmalı ve tek bir kök öğe bulunmalıdır.",
    "XML dosyası metin düzenleyiciyle ya da tarayıcıyla açılır; okunur hâle getirmek için biçimlendirici kullanılır.",
    "e-Fatura ve e-Arşiv faturaları, GİB'in UBL 2.1 standardına dayanan UBL-TR biçiminde XML olarak düzenlenir.",
    "JSON aynı veriyi daha kısa yazar ve sayı, mantıksal değer, dizi gibi veri türlerini doğrudan taşır; XML'de her değer metindir.",
    "XML'in öznitelik, ad alanı, yorum ve şema doğrulaması gibi özellikleri JSON'da birebir karşılık bulmaz; dönüştürmede bilgi kaybolabilir.",
    "YAML daha çok yapılandırma dosyalarında, JSON web API'lerinde, XML ise belge ve resmî veri alışverişinde tercih edilir."
  ],
  figure: {
    alt: "Aynı müşteri kaydının XML ve JSON gösterimi yan yana; XML'de etiket ve öznitelik, JSON'da anahtar ve değer çiftleri işaretlenmiş.",
    caption: "Aynı veri iki biçimde. XML'de no bir özniteliktir, ad ve sehir alt öğelerdir; JSON'a çevrilirken öznitelik sıradan bir anahtara dönüşür ve aradaki ayrım kaybolur.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Aynı kayıt: XML ve JSON</text>
  <rect x="20" y="52" width="330" height="230" rx="8" class="sf sb"/>
  <rect x="20" y="52" width="330" height="34" rx="8" class="p"/>
  <text x="185" y="75" class="b mid sf">XML (etiketli ağaç)</text>
  <g class="sm">
    <text x="36" y="114">&lt;musteri <tspan class="p b">no="1024"</tspan>&gt;</text>
    <text x="56" y="140">&lt;ad&gt;Ayşe Yılmaz&lt;/ad&gt;</text>
    <text x="56" y="166">&lt;sehir&gt;Ankara&lt;/sehir&gt;</text>
    <text x="56" y="192">&lt;bakiye&gt;1250.50&lt;/bakiye&gt;</text>
    <text x="36" y="218">&lt;/musteri&gt;</text>
    <text x="36" y="256" class="t2">boşluksuz 94 karakter · değerler metin</text>
  </g>
  <rect x="370" y="52" width="330" height="230" rx="8" class="sf sb"/>
  <rect x="370" y="52" width="330" height="34" rx="8" class="ok"/>
  <text x="535" y="75" class="b mid sf">JSON (anahtar: değer)</text>
  <g class="sm">
    <text x="386" y="114">{ "musteri": {</text>
    <text x="406" y="140"><tspan class="p b">"no": "1024"</tspan>,</text>
    <text x="406" y="166">"ad": "Ayşe Yılmaz",</text>
    <text x="406" y="192">"sehir": "Ankara",</text>
    <text x="406" y="218">"bakiye": 1250.50 } }</text>
    <text x="386" y="256" class="t2">boşluksuz 77 karakter · sayı türü korunur</text>
  </g>
  <rect x="20" y="300" width="680" height="84" rx="8" class="ps"/>
  <text x="40" y="326" class="b">Dönüştürmede dikkat</text>
  <text x="40" y="350" class="sm">Öznitelik (no) JSON'da sıradan anahtar olur; geri çevirince öğe mi öznitelik mi bilinmez.</text>
  <text x="40" y="372" class="sm">Tek öğe nesne, iki öğe dizi olabilir; yorumlar ve ad alanları çoğu zaman kaybolur.</text>
</svg>`
  },
  sections: [
    {
      h: "XML nedir, ne için kullanılır?",
      p: [
        "XML, verinin ne anlama geldiğini etiketlerle anlatan bir işaretleme dilidir. Bir müşteri kaydında \"ad\", \"şehir\" ve \"bakiye\" gibi alanlar, her biri kendi açılış ve kapanış etiketi arasına yazılarak saklanır. Açılış etiketi küçüktür işareti, etiket adı ve büyüktür işaretinden oluşur; kapanış etiketinde etiket adından önce eğik çizgi bulunur. Etiket adlarını veriyi üreten taraf belirler; \"genişletilebilir\" sözcüğü buradan gelir.",
        "XML insan tarafından okunabilir, ama asıl amacı farklı programların veriyi aynı kurallarla değiş tokuş edebilmesidir. Bankalar arası mesajlaşma, e-Fatura, ofis belgelerinin iç yapısı, site haritaları, RSS haber akışları ve birçok kurumsal sistemin dışa aktarım dosyası XML'dir. SVG görselleri de birer XML belgesidir; bu sayfadaki infografik bile XML kurallarıyla yazılmıştır.",
        "XML'de veri, tek bir <strong>kök öğenin</strong> altında iç içe geçen öğelerden oluşan bir ağaçtır. Her öğenin bir adı, isteğe bağlı öznitelikleri ve içeriği vardır. İçerik düz metin ya da başka öğeler olabilir."
      ]
    },
    {
      h: "İyi biçimli XML'in temel kuralları",
      ul: [
        "<strong>Tek kök öğe:</strong> Belgedeki her şey tek bir dış öğenin içinde olmalıdır. Yan yana iki kök öğe hata verir.",
        "<strong>Her etiket kapanmalı:</strong> Açılan her öğenin kapanış etiketi olmalı ya da içeriksiz öğe kendini kapatan biçimde yazılmalıdır.",
        "<strong>Doğru iç içe geçme:</strong> İçteki öğe dıştakinden önce kapanmalıdır; etiketler çaprazlanamaz.",
        "<strong>Büyük-küçük harf duyarlılığı:</strong> Fatura ile fatura iki farklı etikettir; açılış ve kapanış aynı yazılmalıdır.",
        "<strong>Öznitelik değerleri tırnak içinde:</strong> no=\"1024\" doğru, tırnaksız yazım hatadır.",
        "<strong>Özel karakterler kaçırılmalı:</strong> Metin içindeki küçüktür işareti ve ampersand (ve işareti) doğrudan yazılamaz; lt ve amp gibi önceden tanımlı varlıklarla ya da CDATA bölümüyle yazılır.",
        "<strong>Karakter kodlaması:</strong> Belgenin başındaki bildirim genellikle UTF-8 kodlamasını belirtir. Türkçe karakterler bozuk görünüyorsa kodlama yanlış okunuyordur; ayrıntı için [[bilgi:ascii-unicode-utf8-farki|ASCII, Unicode ve UTF-8 farkı]] yazısına bakın."
      ],
      after: [
        "Bu kurallara uyan belge <strong>iyi biçimli</strong> (well-formed) sayılır. Bir de <strong>geçerli</strong> (valid) olma vardır: belge, XSD gibi bir şemada tanımlı öğe adlarına, sıralamaya ve veri türlerine de uyuyorsa geçerlidir. e-Fatura gibi resmî sistemler yalnızca iyi biçimliliğe değil, şemaya uygunluğa da bakar."
      ]
    },
    {
      h: "XML dosyası nasıl açılır ve okunur?",
      p: [
        "XML düz metin olduğu için özel bir programa ihtiyaç yoktur. Ancak sistemlerden gelen XML dosyaları çoğu zaman tek satıra sıkıştırılmış hâlde gelir ve binlerce karakterlik bir satırda aradığınızı bulmak zordur."
      ],
      ol: [
        "Dosyaya sağ tıklayıp \"Birlikte aç\" ile Not Defteri ya da herhangi bir kod düzenleyiciyle açın; tarayıcıya sürüklemek de içeriği ağaç biçiminde gösterir.",
        "İçerik tek satırsa metni kopyalayıp [[arac:xml-bicimlendir|XML Biçimlendirici]] aracına yapıştırın; araç girintili ve okunur hâle getirir.",
        "Hata varsa araç satır numarasıyla gösterir: kapanmamış etiket, çaprazlanmış öğe ya da kaçırılmamış özel karakter en sık nedenlerdir.",
        "Aradığınız alanı tarayıcının ya da düzenleyicinin arama özelliğiyle (Ctrl + F) etiket adına göre bulun.",
        "Veriyi başka bir sistemde kullanacaksanız JSON'a çevirmek için [[arac:json-xml-donustur|JSON XML Dönüştürücü]] aracından yararlanın."
      ],
      after: [
        "Bu araçlar tamamen tarayıcınızda çalışır; fatura gibi ticari bilgi içeren XML dosyalarınız sunucuya yüklenmez."
      ]
    },
    {
      h: "e-Fatura neden XML (UBL-TR) formatındadır?",
      p: [
        "Gelir İdaresi Başkanlığı'nın e-Fatura ve e-Arşiv Fatura uygulamalarında fatura, kâğıt görüntüsü değil yapılandırılmış veri olarak düzenlenir. Bunun için uluslararası UBL (Universal Business Language) 2.1 standardının Türkiye'ye uyarlanmış hâli olan <strong>UBL-TR</strong> kullanılır. Faturadaki satıcı, alıcı, mal kalemleri, KDV oranları ve toplamlar ayrı ayrı XML öğelerinde tutulur.",
        "Bu yaklaşımın birkaç avantajı vardır. Alıcının muhasebe programı faturayı elle girmeden okuyabilir; GİB sistemi şemaya uymayan faturaları reddederek hatalı veriyi daha baştan engeller; fatura e-imza ya da mali mühürle imzalandığında içerikteki her değişiklik fark edilir. Ekranda gördüğünüz düzenli fatura görüntüsü ise XML'e bağlı bir XSLT şablonuyla üretilir.",
        "Bir e-Fatura XML'ini açtığınızda aynı bilginin hem öğe adlarıyla hem de cbc ve cac gibi ön eklerle (ad alanı) yazıldığını görürsünüz. Bunlar UBL standardındaki ortak bileşenleri gösterir. e-Arşiv faturanın kesilme süreci için [[bilgi:e-arsiv-fatura-nedir-nasil-kesilir|e-Arşiv fatura yazısını]] okuyabilirsiniz."
      ],
      note: "Muhasebe kayıtlarınızda e-Faturanın XML dosyasını saklayın. PDF görüntüsü yalnızca görseldir; yasal belge olan e-Faturanın aslı XML'dir."
    },
    {
      h: "XML'de etiket (öğe) ve öznitelik farkı",
      p: [
        "XML'de bir bilgiyi iki şekilde yazabilirsiniz: ayrı bir alt öğe olarak ya da bir öğenin açılış etiketine eklenen öznitelik olarak. Görseldeki örnekte müşterinin numarası öznitelik (no=\"1024\"), adı ve şehri ise alt öğedir."
      ],
      table: {
        head: ["Konu", "Öğe (etiket)", "Öznitelik"],
        rows: [
          ["Yazıldığı yer", "Açılış ve kapanış etiketi arasında", "Açılış etiketinin içinde, ad=\"değer\" biçiminde"],
          ["İç içe yapı", "Başka öğeler içerebilir", "Yalnızca düz metin değer"],
          ["Tekrar", "Aynı adla birden çok kez yazılabilir", "Bir öğede aynı ad bir kez"],
          ["Sıra", "Sırası anlamlıdır", "Sırası anlamsızdır"],
          ["Tipik kullanım", "Asıl veri: ad, tutar, açıklama", "Üst bilgi: kimlik, birim, para birimi, dil"]
        ]
      },
      after: [
        "e-Faturada tutarın kendisi öğe içeriği, para birimi ise öznitelik olarak yazılır: tutar öğesinin currencyID özniteliği \"TRY\" değerini taşır. Bu ayrım, XML'i JSON'a çevirirken ilk kaybolan bilgidir."
      ]
    },
    {
      h: "JSON ile XML arasındaki temel farklar",
      p: [
        "JSON (JavaScript Object Notation), veriyi anahtar-değer çiftleri ve dizilerle yazan daha yeni ve daha sade bir biçimdir. Web API'lerinin büyük çoğunluğu bugün JSON kullanır. JSON'un temel kurallarını [[bilgi:json-nedir-nasil-okunur|JSON nedir yazısında]] bulabilirsiniz; aşağıdaki tablo iki biçimi karşılaştırır."
      ],
      table: {
        head: ["Özellik", "XML", "JSON"],
        rows: [
          ["Yapı", "Etiketli öğe ağacı", "Nesne ve dizi"],
          ["Veri türleri", "Her değer metin; tür şemayla belirlenir", "Metin, sayı, true/false, null, dizi, nesne"],
          ["Dizi", "Aynı adlı tekrar eden öğeler", "Köşeli parantezle açık dizi"],
          ["Öznitelik", "Var", "Yok"],
          ["Yorum satırı", "Var", "Yok (standartta yok)"],
          ["Ad alanı", "Var (ön ekler)", "Yok"],
          ["Şema doğrulama", "XSD ile güçlü ve yaygın", "JSON Schema ile mümkün"],
          ["Boyut", "Kapanış etiketleri nedeniyle daha uzun", "Genellikle belirgin biçimde daha kısa"],
          ["Yaygın kullanım", "e-Fatura, ofis belgeleri, SVG, site haritası", "Web ve mobil API'ler, yapılandırma"]
        ],
        caption: "Boyut farkı veriye göre değişir; görseldeki örnek boşluksuz yazıldığında XML 94, JSON 77 karakterdir (yaklaşık yüzde 18 fark)."
      }
    },
    {
      h: "XML JSON'a çevrilirken neler kaybolabilir?",
      p: [
        "İki biçim aynı şeyi anlatmadığı için çeviri her zaman birebir değildir. Dönüştürücüler bazı uzlaşmalar kullanır; örneğin öznitelikleri başına @ işareti eklenmiş anahtarlarla, öğe metnini ise #text gibi özel bir anahtarla gösterebilir. Bu uzlaşmalar programdan programa değişir."
      ],
      ul: [
        "<strong>Öznitelik-öğe ayrımı:</strong> JSON'da ikisi de anahtar olur; geri çevirirken hangisinin öznitelik olduğu bilinmeyebilir.",
        "<strong>Tek öğe ya da dizi belirsizliği:</strong> Bir faturada tek kalem varsa JSON'da nesne, iki kalem varsa dizi olarak çıkabilir. Bunu okuyan kodun iki durumu da beklemesi gerekir.",
        "<strong>Veri türü:</strong> XML'de 1250.50 bir metindir. Dönüştürücü sayı yapabilir ya da metin bırakabilir; 00123 gibi baştaki sıfırlı kodlar sayıya çevrilirse sıfırlar kaybolur.",
        "<strong>Yorumlar ve işlem talimatları:</strong> JSON'da yorum olmadığı için genellikle atılır.",
        "<strong>Ad alanları:</strong> cbc:, cac: gibi ön ekler anahtar adına eklenir ya da tamamen düşer.",
        "<strong>Karışık içerik ve sıra:</strong> Metin ile alt öğelerin iç içe geçtiği yapılarda sıra ve boşluklar korunamayabilir."
      ],
      after: [
        "Bu nedenle resmî belgelerde aslı her zaman XML olarak saklanmalı, JSON yalnızca uygulama içi kullanım için üretilmelidir. JSON çıktısını kontrol etmek için [[arac:json-bicimlendir|JSON Biçimlendir]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "YAML, JSON ve XML'den hangisi ne zaman tercih edilir?",
      p: [
        "YAML, girintiyle yapı kuran, tırnak ve parantez kullanımını en aza indiren bir biçimdir. İnsanların elle yazdığı yapılandırma dosyalarında yaygındır, çünkü yorum satırı destekler ve okunması kolaydır. Ancak girinti hatası anlamı değiştirebilir; bir boşluk fazlası bir ayarı başka bir bölümün altına taşır. JSON ile YAML arasında [[arac:json-yaml-donustur|JSON YAML Dönüştürücü]] ile geçiş yapabilirsiniz."
      ],
      ul: [
        "<strong>XML'i seçin:</strong> resmî ya da kurumlar arası veri alışverişinde, şema doğrulama ve imza gerektiğinde, belge niteliğindeki verilerde.",
        "<strong>JSON'u seçin:</strong> web ve mobil uygulamaların API'lerinde, tarayıcıda işlenecek verilerde, hız ve kısalık önemli olduğunda.",
        "<strong>YAML'ı seçin:</strong> insanların düzenleyeceği yapılandırma dosyalarında, yorum yazmak gerektiğinde.",
        "<strong>CSV'yi seçin:</strong> veri tamamen tablo biçimindeyse ve Excel'de açılacaksa; iç içe yapı gerekmez. Ayrıntı için [[bilgi:csv-dosyasi-nedir-excelde-nasil-acilir|CSV yazısına]] bakın."
      ]
    }
  ],
  faq: [
    ["XML nedir, ne için kullanılır?", "XML, veriyi etiketlerle işaretleyip ağaç yapısında saklayan düz metin biçimidir. e-Fatura, ofis belgelerinin iç yapısı, site haritaları, RSS akışları ve kurumlar arası veri alışverişinde yaygın olarak kullanılır."],
    ["XML dosyası nasıl açılır ve okunur?", "XML düz metin olduğu için Not Defteri, bir kod düzenleyici ya da tarayıcıyla açılabilir. Tek satıra sıkıştırılmış dosyaları XML Biçimlendirici aracına yapıştırarak girintili ve okunur hâle getirebilir, hataları satır numarasıyla görebilirsiniz."],
    ["JSON ile XML arasındaki temel farklar nelerdir?", "XML etiketli öğe ağacı kullanır, öznitelik, yorum ve ad alanı destekler ve her değeri metin olarak tutar. JSON nesne ve dizilerle daha kısa yazılır, sayı ve mantıksal değer gibi türleri doğrudan taşır ama öznitelik ve yorum içermez."],
    ["e-Fatura neden XML (UBL) formatındadır?", "GİB, faturanın makinece okunabilmesi, şemayla doğrulanabilmesi ve imzayla değişmezliğinin korunması için uluslararası UBL 2.1 standardına dayanan UBL-TR XML biçimini kullanır. PDF görüntüsü yalnızca bu verinin görsel karşılığıdır."],
    ["XML'de etiket ve öznitelik farkı nedir?", "Öğe, açılış ve kapanış etiketi arasındaki içeriktir ve başka öğeler barındırabilir. Öznitelik ise açılış etiketine ad ve tırnaklı değer olarak yazılan düz metin bilgidir; genellikle kimlik, birim ya da para birimi gibi üst bilgiler için kullanılır."],
    ["Bozuk XML nasıl doğrulanır?", "XML Biçimlendirici aracına yapıştırdığınızda iyi biçimlilik kuralları denetlenir ve hata satır numarasıyla gösterilir. Kapanmamış etiket, çaprazlanmış öğe, tırnaksız öznitelik ve kaçırılmamış özel karakter en sık hatalardır. Şema uygunluğu için ayrıca XSD doğrulaması gerekir."],
    ["XML JSON'a çevrilirken neler kaybolabilir?", "Öznitelik ile öğe ayrımı, yorumlar, ad alanı ön ekleri, öğe sırası ve veri türü bilgisi kaybolabilir. Tek öğe nesne, birden çok öğe dizi olarak çıkabileceği için JSON'u okuyan kodun iki durumu da hesaba katması gerekir."],
    ["YAML, JSON ve XML'den hangisi ne zaman tercih edilir?", "Resmî veri alışverişi ve şema doğrulama gerektiğinde XML, web ve mobil API'lerde JSON, insanların elle düzenlediği yapılandırma dosyalarında YAML tercih edilir. Düz tablo verisinde ise CSV en pratik seçenektir."],
    ["XML dosyam bir sunucuya yükleniyor mu?", "Hayır. XML Biçimlendirici, JSON XML Dönüştürücü ve diğer veri araçları tamamen tarayıcınızda çalışır. Fatura gibi ticari bilgi içeren dosyalarınız hiçbir sunucuya gönderilmez ve sayfayı kapattığınızda bellekten silinir."]
  ],
  tools: ["json-xml-donustur", "xml-bicimlendir", "json-bicimlendir", "json-yaml-donustur"],
  related: ["json-nedir-nasil-okunur", "e-arsiv-fatura-nedir-nasil-kesilir", "csv-dosyasi-nedir-excelde-nasil-acilir"],
  sources: [
    ["W3C – Extensible Markup Language (XML) 1.0", "https://www.w3.org/TR/xml/"],
    ["Gelir İdaresi Başkanlığı – e-Fatura uygulaması", "https://ebelge.gib.gov.tr/"]
  ]
};
