export default {
  slug: "json-nedir-nasil-okunur",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "JSON Nedir, Nasıl Okunur? JSON Formatı, Örnekleri ve Sık Yapılan Hatalar",
  pageTitle: "JSON Nedir, Nasıl Okunur? Format, Örnek ve Hata Çözümleri",
  description: "JSON, veriyi anahtar–değer çiftleri ve dizilerle taşıyan metin biçimidir. Nesne ve dizi farkı, 6 veri türü, Unexpected token hatası, kaçış karakterleri ve YAML/CSV.",
  keywords: ["json nedir", "json dosyası nasıl açılır", "json formatı örneği", "json hatası nasıl düzeltilir", "json yaml farkı", "json csv çevirme", "json biçimlendirme", "unexpected token json"],
  lead: "JSON (JavaScript Object Notation), verileri <strong>anahtar–değer çiftleri</strong> ve sıralı listeler hâlinde düz metinle taşıyan, insanın da makinenin de okuyabildiği bir veri biçimidir. Süslü parantez <code>{ }</code> bir nesneyi, köşeli parantez <code>[ ]</code> bir diziyi gösterir; anahtarlar her zaman çift tırnak içinde yazılır. Bu sayfada JSON'un altı veri türünü, bir dosyayı adım adım okumayı, \"Unexpected token\" hatasının nedenlerini, kaçış karakterlerini ve JSON'u YAML, XML ya da CSV ile karşılaştırmayı örneklerle bulacaksınız.",
  kisaCevap: [
    "JSON bir veri biçimidir; standardı RFC 8259 ve ECMA-404'tür, dosya uzantısı .json, MIME türü application/json'dur.",
    "Altı veri türü vardır: metin (string), sayı, true/false, null, nesne { } ve dizi [ ].",
    "Nesne, anahtarla erişilen sırasız alanlardan; dizi, sırayla dizilmiş değerlerden oluşur.",
    "Anahtarlar ve metin değerleri yalnızca çift tırnakla yazılır; tek tırnak, sondaki virgül ve yorum satırı geçersizdir.",
    "Metin içindeki çift tırnak \\\", satır sonu \\n, ters eğik çizgi \\\\ biçiminde kaçışlanır.",
    "Sistemler arası JSON alışverişinde metin UTF-8 ile kodlanmalıdır; Türkçe karakterler doğrudan yazılabilir."
  ],
  figure: {
    alt: "Bir JSON örneğinin parçalarına ayrılmış şeması: süslü parantezle açılan nesne, çift tırnaklı anahtarlar, metin, sayı, true ve null değerleri, köşeli parantezli dizi ve iç içe nesne; altta sondaki virgül hatası işaretleniyor.",
    caption: "Bir JSON belgesinin anatomisi. Her anahtar çift tırnaklıdır, anahtar ile değer iki nokta ile, alanlar virgülle ayrılır. En sık hata, son alandan sonra bırakılan virgüldür.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Bir JSON belgesinin parçaları</text>
  <rect x="20" y="48" width="400" height="300" rx="10" class="sf sb"/>
  <g class="sm">
    <text x="40" y="80" class="p b">{</text>
    <text x="60" y="108"><tspan class="p b">"ad"</tspan>: "Ayşe Yılmaz",</text>
    <text x="60" y="136"><tspan class="p b">"yas"</tspan>: 34,</text>
    <text x="60" y="164"><tspan class="p b">"aktif"</tspan>: true,</text>
    <text x="60" y="192"><tspan class="p b">"telefon"</tspan>: null,</text>
    <text x="60" y="220"><tspan class="p b">"etiketler"</tspan>: ["müşteri", "toptan"],</text>
    <text x="60" y="248"><tspan class="p b">"adres"</tspan>: {</text>
    <text x="84" y="276"><tspan class="p b">"il"</tspan>: "Diyarbakır"</text>
    <text x="60" y="304">}</text>
    <text x="40" y="332" class="p b">}</text>
  </g>
  <g class="sm">
    <rect x="440" y="62" width="260" height="34" rx="6" class="p"/><text x="452" y="84" class="sf b">{ } nesne: anahtar → değer</text>
    <rect x="440" y="100" width="260" height="30" rx="6" class="ps"/><text x="452" y="120">metin: çift tırnak içinde</text>
    <rect x="440" y="134" width="260" height="30" rx="6" class="ps"/><text x="452" y="154">sayı: tırnaksız, nokta ondalık</text>
    <rect x="440" y="168" width="260" height="30" rx="6" class="ps"/><text x="452" y="188">mantıksal: true / false</text>
    <rect x="440" y="202" width="260" height="30" rx="6" class="ps"/><text x="452" y="222">boş değer: null</text>
    <rect x="440" y="236" width="260" height="34" rx="6" class="oks"/><text x="452" y="258" class="b">[ ] dizi: sıralı liste</text>
    <rect x="440" y="274" width="260" height="34" rx="6" class="oks"/><text x="452" y="296" class="b">iç içe nesne</text>
  </g>
  <line x1="300" y1="132" x2="436" y2="150" class="sb dash" fill="none"/>
  <line x1="360" y1="216" x2="436" y2="252" class="sb dash" fill="none"/>
  <rect x="20" y="362" width="680" height="64" rx="8" class="dgs"/>
  <text x="36" y="388" class="b dg">Geçersiz: "il": "Diyarbakır",  }  ← sondaki virgül</text>
  <text x="36" y="412" class="sm">Ayrıca geçersiz: 'tek tırnak', // yorum, 01 gibi başında sıfır olan sayı</text>
</svg>`
  },
  sections: [
    {
      h: "JSON nedir, nerelerde kullanılır?",
      p: [
        "JSON, 2000'lerin başında web uygulamalarında sunucu ile tarayıcı arasında veri taşımak için yaygınlaşan, adını JavaScript'in nesne yazımından alan bir veri biçimidir. Bugün dilden bağımsızdır: neredeyse her programlama dili JSON okuyup yazabilir. Biçimin kuralları internet standardı RFC 8259 ve ECMA-404 belgelerinde tanımlanır; kurallar o kadar azdır ki tamamı birkaç sayfaya sığar.",
        "Günlük hayatta JSON'u doğrudan görmeseniz de sürekli kullanırsınız. Mobil uygulamanın hava durumunu çekmesi, e-ticaret sitesinin sepeti güncellemesi, e-fatura entegrasyonları, banka ve kargo firmalarının API servisleri, yapay zekâ servislerinin yapılandırılmış yanıtları ve birçok programın ayar dosyası JSON ile çalışır. Bir yazılımcıdan \"JSON çıktısını gönderir misiniz?\" mesajı aldıysanız istenen şey bu düz metin dosyasıdır.",
        "JSON'un gücü sadeliğindedir. Biçimlendirme, renk, yazı tipi taşımaz; yalnızca veriyi ve verinin yapısını taşır. Bu yüzden boyutu küçüktür, hızlı işlenir ve bir metin düzenleyicide açıldığında insan tarafından da okunabilir."
      ]
    },
    {
      h: "JSON'un altı veri türü ve yazım kuralları",
      p: [
        "Bir JSON belgesindeki her değer aşağıdaki altı türden biridir. Tarih, para birimi ya da resim gibi ayrı bir tür yoktur; bunlar genellikle metin olarak (<code>\"2026-11-15\"</code>) ya da sayı olarak saklanır ve anlamını okuyan program belirler."
      ],
      table: {
        head: ["Tür", "Örnek", "Kural"],
        rows: [
          ["Metin (string)", "<code>\"Kadıköy\"</code>", "Yalnızca çift tırnak; içindeki çift tırnak kaçışlanır"],
          ["Sayı (number)", "<code>42</code>, <code>-3.75</code>, <code>1.2e5</code>", "Ondalık ayracı nokta; baştaki sıfır, NaN ve Infinity yok"],
          ["Mantıksal (boolean)", "<code>true</code>, <code>false</code>", "Küçük harf, tırnaksız"],
          ["Boş değer", "<code>null</code>", "Küçük harf, tırnaksız; değerin olmadığını gösterir"],
          ["Nesne (object)", "<code>{\"il\": \"Van\"}</code>", "Anahtarlar çift tırnaklı metin; alanlar virgülle ayrılır"],
          ["Dizi (array)", "<code>[1, 2, 3]</code>", "Değerler sıralı; farklı türler bir arada olabilir"]
        ],
        caption: "Türkiye'de ondalık virgül kullanılsa da JSON sayılarında ayraç her zaman noktadır: 1.250,50 TL, JSON'da 1250.5 olarak yazılır."
      },
      after: [
        "Boşluklar, sekmeler ve satır sonları değerlerin arasında serbesttir; okunurluk için kullanılır, anlam taşımaz. Bu yüzden aynı JSON hem okunur biçimde (girintili) hem de tek satıra sıkıştırılmış (küçültülmüş) hâlde yazılabilir. Dosyanın en dış katmanında genellikle bir nesne ya da dizi bulunur; güncel standart tek başına bir metin ya da sayıyı da geçerli JSON kabul eder."
      ]
    },
    {
      h: "Nesne ile dizi arasındaki fark nedir?",
      p: [
        "<strong>Nesne</strong>, bir şeyin özelliklerini anahtarlarla tarif eder: bir müşterinin adı, telefonu, adresi gibi. Değere sıra numarasıyla değil adıyla ulaşırsınız; <code>musteri.ad</code> gibi. Aynı nesne içinde bir anahtarı iki kez kullanmak standartta yasak değildir ama programlar farklı davrandığı için kaçınılması gereken bir hatadır.",
        "<strong>Dizi</strong> ise aynı türden birden çok öğeyi sırayla listeler: bir siparişteki ürünler, bir aydaki günlük satışlar gibi. Öğelere sıra numarasıyla ulaşılır ve sayım sıfırdan başlar; ilk ürün <code>urunler[0]</code>'dır. Gerçek verilerde ikisi iç içe kullanılır: bir sipariş nesnesinin içinde ürünler dizisi, her ürün de kendi içinde bir nesnedir."
      ],
      formula: "{\n  \"siparisNo\": \"S-1042\",\n  \"urunler\": [\n    { \"kod\": \"TN-01\", \"adet\": 2, \"fiyat\": 450.0 },\n    { \"kod\": \"DR-07\", \"adet\": 1, \"fiyat\": 1290.0 }\n  ],\n  \"teslimEdildi\": false\n}",
      after: [
        "Bu örneği okurken dıştan içe gidin: en dışta bir sipariş nesnesi var; içinde sipariş numarası (metin), ürünler (iki öğeli dizi) ve teslim durumu (mantıksal) bulunuyor. Siparişin toplam tutarı JSON'da yazmıyor; okuyan program 2 × 450 + 1 × 1290 = 2.190 TL olarak hesaplar."
      ]
    },
    {
      h: "JSON dosyası nasıl açılır ve okunur?",
      p: [
        "<code>.json</code> dosyası düz metindir; işletim sisteminin not defteri, herhangi bir kod düzenleyicisi ya da tarayıcı ile açılabilir. Sorun genellikle dosyanın açılması değil, tek satıra sıkıştırılmış binlerce karakterlik metnin okunmasıdır. Bu durumda dosyayı bir biçimlendiriciye verip girintili hâle getirmek okumayı kolaylaştırır."
      ],
      ol: [
        "Dosyayı ya da metni [[arac:json-bicimlendir|JSON Biçimlendir ve Doğrula]] aracına yapıştırın; girintili görünümü ve ağaç yapısını görün.",
        "En dış parantezden başlayın: süslü parantezse bir nesne, köşeli parantezse bir liste okuyorsunuz demektir.",
        "Ağaç görünümünde dalları açıp kapatarak aradığınız alana inin; dizilerde kaç öğe olduğunu kontrol edin.",
        "Araç bir hata gösterirse satır ve sütun numarasına gidin; hata çoğunlukla gösterilen noktanın hemen öncesindedir.",
        "Dosyayı başka bir sisteme göndermeden önce gerekirse [[arac:json-kucult|JSON Küçültme]] aracıyla tek satıra indirip boyutu azaltın."
      ],
      after: [
        "Tarayıcının kendi görüntüleyicisi de çoğu zaman JSON'u renklendirerek gösterir. Ancak içinde müşteri bilgisi ya da API anahtarı bulunan dosyaları çevrim içi bir hizmete yüklemeden önce iki kez düşünün; tarayıcıda yerel çalışan bir araç bu riski ortadan kaldırır."
      ]
    },
    {
      h: "\"Unexpected token\" JSON hatası neden çıkar?",
      p: [
        "\"Unexpected token\" (beklenmeyen karakter) ya da \"JSON parse error\" iletisi, okuyucunun kurala uymayan bir karakterle karşılaştığını söyler. İleti çoğunlukla hatanın konumunu da verir: \"position 57\" gibi. Aşağıdaki tablo, bu hatanın neredeyse tamamını oluşturan nedenleri özetler."
      ],
      table: {
        head: ["Hatalı yazım", "Sorun", "Doğrusu"],
        rows: [
          ["<code>{'ad': 'Ali'}</code>", "Tek tırnak", "<code>{\"ad\": \"Ali\"}</code>"],
          ["<code>{ad: \"Ali\"}</code>", "Anahtar tırnaksız", "<code>{\"ad\": \"Ali\"}</code>"],
          ["<code>[1, 2, 3,]</code>", "Sondaki virgül", "<code>[1, 2, 3]</code>"],
          ["<code>{\"fiyat\": 12,5}</code>", "Ondalık virgül", "<code>{\"fiyat\": 12.5}</code>"],
          ["<code>{\"kod\": 007}</code>", "Başında sıfır olan sayı", "<code>{\"kod\": \"007\"}</code>"],
          ["<code>// açıklama</code> satırı", "Yorum desteklenmez", "Yorumu silin ya da bir alana yazın"],
          ["Yanıt <code><</code> ile başlıyor", "Gelen şey HTML hata sayfası", "Adresi ve sunucu yanıtını kontrol edin"]
        ],
        caption: "Son satır özellikle önemlidir: \"Unexpected token\" hatası 0. konumda büyüktür-küçüktür işaretiyle çıkıyorsa, sunucu JSON yerine bir HTML sayfası (çoğunlukla 404 ya da 500 hata sayfası) döndürüyordur."
      },
      after: [
        "Görünmez karakterler de bu hataya yol açar. Bazı düzenleyiciler dosyanın başına bayt sırası işareti (BOM) ekler; kelime işlemciden kopyalanan metinde düz tırnak yerine kıvrık tırnak bulunur. Hata satırında göze bir sorun görünmüyorsa tırnakları silip klavyeden yeniden yazmak çoğu zaman sorunu çözer. Sunucu tarafındaki hata kodlarının anlamını [[bilgi:http-durum-kodlari-404-500-nedir|HTTP durum kodları rehberinde]] bulabilirsiniz."
      ]
    },
    {
      h: "JSON'da özel karakterler nasıl kaçırılır?",
      p: [
        "Metin değerlerinin içinde çift tırnak, ters eğik çizgi ve kontrol karakterleri (satır sonu, sekme gibi) doğrudan yazılamaz; önlerine ters eğik çizgi konarak kaçışlanır. Türkçe harfler, € işareti ve diğer Unicode karakterleri ise UTF-8 ile kodlanmış bir dosyada olduğu gibi yazılabilir. İsterseniz <code>\\u00e7</code> (ç) gibi Unicode kaçışı da kullanabilirsiniz; ikisi okunduğunda aynı metni verir."
      ],
      table: {
        head: ["Karakter", "JSON kaçışı", "Örnek"],
        rows: [
          ["Çift tırnak", "<code>\\\"</code>", "<code>\"15\\\" ekran\"</code>"],
          ["Ters eğik çizgi", "<code>\\\\</code>", "<code>\"C:\\\\Belgeler\"</code>"],
          ["Satır sonu", "<code>\\n</code>", "<code>\"1. satır\\n2. satır\"</code>"],
          ["Sekme", "<code>\\t</code>", "<code>\"Ad\\tSoyad\"</code>"],
          ["Herhangi bir karakter", "<code>\\uXXXX</code>", "<code>\"\\u0130stanbul\"</code> = İstanbul"]
        ]
      },
      after: [
        "Bir metni elle kaçışlamak hataya açıktır; özellikle Windows dosya yollarında her ters eğik çizginin ikilenmesi gerekir. [[arac:json-kacis|JSON Kaçış aracı]] metni JSON değerine çevirir ya da kaçışlı bir dizgiyi okunur hâle geri getirir. Unicode kaçışlarının mantığı için [[bilgi:base64-nedir-ne-ise-yarar|Base64]] ve benzeri kodlamalardan farklı olarak karakter tablosuna bakılır; Türkçe harflerin bozulmasıyla uğraşıyorsanız [[bilgi:turkce-karakter-sorunu-nasil-duzeltilir|Türkçe karakter sorunu]] yazısı yol gösterir."
      ]
    },
    {
      h: "JSON, XML, YAML ve CSV karşılaştırması",
      p: [
        "JSON tek veri biçimi değildir. Hangisinin seçileceği, verinin yapısına ve onu kimin okuyacağına bağlıdır. Aşağıdaki karşılaştırma en sık karşılaşılan dört biçimi özetler."
      ],
      table: {
        head: ["Özellik", "JSON", "XML", "YAML", "CSV"],
        rows: [
          ["Yapı", "Nesne ve dizi", "Etiket ağacı", "Girintiyle ağaç", "Düz tablo"],
          ["İç içe veri", "Evet", "Evet", "Evet", "Hayır"],
          ["Yorum satırı", "Yok", "Var", "Var", "Yok"],
          ["Veri türü", "Metin, sayı, mantıksal, null", "Hepsi metin (şema ile tür)", "JSON türleri ve fazlası", "Hepsi metin"],
          ["Tipik kullanım", "API, web uygulaması", "e-belge, eski kurumsal sistemler", "Ayar dosyaları", "Elektronik tablo, toplu aktarım"],
          ["Boyut", "Küçük", "Büyük (açılış ve kapanış etiketleri)", "Küçük", "En küçük"]
        ]
      },
      after: [
        "YAML, JSON'un neredeyse tamamını kapsayan bir üst kümedir; bu yüzden geçerli bir JSON çoğu YAML okuyucusu tarafından doğrudan okunur. Ayar dosyalarında okunurluk ve yorum desteği için YAML, makineler arası veri alışverişinde katılığı ve hızı için JSON tercih edilir. Dönüşüm için [[arac:json-yaml-donustur|JSON YAML Dönüştürücü]] iki yönde de çalışır.",
        "Elektronik tablodaki bir listeyi JSON'a çevirmek için önce tabloyu CSV olarak kaydedin, ardından [[arac:csv-json-donustur|CSV JSON Dönüştürücü]] ile her satırı bir nesneye dönüştürün. Başlık satırındaki sütun adları anahtar olur. Türkçe Excel CSV'lerinde ayraç noktalı virgül olduğu için aracın ayracı otomatik algılaması bu noktada işe yarar."
      ]
    },
    {
      h: "JSON ile çalışırken iyi uygulamalar",
      ul: [
        "<strong>Anahtar adlarında tutarlı olun:</strong> <code>musteriAdi</code> ya da <code>musteri_adi</code> biçimlerinden birini seçip her yerde kullanın; Türkçe karakter ve boşluk içermeyen adlar sorun çıkarmaz.",
        "<strong>Tarihleri ISO biçiminde saklayın:</strong> <code>\"2026-11-15\"</code> ya da saat dilimiyle <code>\"2026-11-15T14:30:00+03:00\"</code>; <code>15.11.2026</code> biçimi farklı ülkelerde farklı okunur.",
        "<strong>Para tutarlarında dikkatli olun:</strong> Kuruş hassasiyeti gereken yerlerde tutarı kuruş cinsinden tam sayı (<code>125050</code>) ya da metin olarak saklamak yuvarlama hatalarını önler.",
        "<strong>Büyük sayıları metin yapın:</strong> 16 haneyi aşan kimlik numaraları bazı dillerde hassasiyet kaybına uğrar; bu tür değerleri tırnak içinde yazın.",
        "<strong>Gizli bilgiyi JSON'a gömmeyin:</strong> Ayar dosyalarındaki şifre ve API anahtarları, dosya paylaşıldığında açığa çıkar; ayrı ve korunan bir yerde tutun."
      ]
    }
  ],
  faq: [
    ["JSON nedir?", "JSON (JavaScript Object Notation), verileri anahtar–değer çiftleri ve sıralı listeler hâlinde düz metinle saklayan ve taşıyan bir veri biçimidir. Programlama dilinden bağımsızdır; API'ler, web uygulamaları ve ayar dosyaları yaygın olarak kullanır."],
    ["JSON dosyası nasıl açılır ve okunur?", "JSON dosyası düz metin olduğu için not defteri, kod düzenleyici ya da tarayıcı ile açılır. Tek satıra sıkıştırılmış dosyaları okumak için bir JSON biçimlendiriciye yapıştırıp girintili görünüme ya da ağaç görünümüne geçmek en pratik yoldur."],
    ["JSON'da nesne ve dizi farkı nedir?", "Nesne süslü parantezle yazılır ve değerlere adlarıyla (anahtarla) ulaşılır. Dizi köşeli parantezle yazılır, değerleri sırayla tutar ve öğelere sıfırdan başlayan sıra numarasıyla ulaşılır. Gerçek verilerde ikisi iç içe kullanılır."],
    ["'Unexpected token' JSON hatası neden çıkar?", "Okuyucu kurala uymayan bir karakterle karşılaştığında çıkar. En sık nedenler tek tırnak, tırnaksız anahtar, sondaki virgül, ondalık virgül, yorum satırı ve sunucunun JSON yerine HTML hata sayfası döndürmesidir. Hata konumunun hemen öncesine bakın."],
    ["JSON ile XML arasındaki fark nedir?", "JSON nesne ve dizilerle, XML açılış ve kapanış etiketleriyle veri tarif eder. JSON daha kısa ve hızlı işlenir, sayı ve mantıksal türleri doğrudan destekler. XML yorum, öznitelik ve şema doğrulama sunar; e-belge gibi kurumsal sistemlerde hâlâ yaygındır."],
    ["JSON YAML'a nasıl çevrilir?", "JSON'u bir JSON YAML dönüştürücüsüne yapıştırdığınızda süslü ve köşeli parantezler girintili YAML yapısına çevrilir. YAML, JSON'un üst kümesi olduğu için veri kaybı olmaz. Ters yönde YAML'daki yorum satırları JSON'a aktarılamaz."],
    ["Excel/CSV verisi JSON'a nasıl dönüştürülür?", "Tabloyu CSV olarak kaydedin ve bir CSV JSON dönüştürücüsüne yükleyin. Başlık satırındaki sütun adları anahtar, sonraki her satır bir nesne olur ve tüm satırlar bir dizi içinde toplanır. Ayraç noktalı virgülse aracın bunu tanıdığından emin olun."],
    ["JSON'da özel karakterler nasıl kaçırılır?", "Metin içindeki çift tırnak \\\" , ters eğik çizgi \\\\ , satır sonu \\n ve sekme \\t olarak yazılır. Herhangi bir karakter \\u ve dört haneli onaltılık kodla da gösterilebilir. Türkçe harfler UTF-8 dosyada kaçışsız yazılabilir."],
    ["JSON dosyasına yorum yazılabilir mi?", "Standart JSON yorum satırını desteklemez; // ya da /* */ eklemek dosyayı geçersiz kılar. Açıklama gerekiyorsa \"_not\" gibi ayrı bir alan ekleyebilir ya da yorum destekleyen YAML biçimini tercih edebilirsiniz."]
  ],
  tools: ["json-bicimlendir", "json-kucult", "json-kacis", "json-yaml-donustur", "csv-json-donustur"],
  related: ["base64-nedir-ne-ise-yarar", "http-durum-kodlari-404-500-nedir", "turkce-karakter-sorunu-nasil-duzeltilir"],
  sources: [
    ["IETF – RFC 8259: The JSON Data Interchange Format", "https://www.rfc-editor.org/rfc/rfc8259"],
    ["Ecma International – ECMA-404 JSON standardı", "https://ecma-international.org/publications-and-standards/standards/ecma-404/"]
  ]
};
