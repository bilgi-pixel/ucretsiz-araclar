export default {
  slug: "alt-alta-listeyi-virgulle-ayirma",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Alt Alta Listeyi Virgülle Ayırma: Satırları Tek Satırda Birleştirme",
  pageTitle: "Alt Alta Listeyi Virgülle Ayırma ve Satırları Birleştirme",
  description: "Alt alta liste tek satırda virgülle nasıl birleştirilir? Satır başına ve sonuna ek ekleme, SQL için tırnaklama, Excel sütunu birleştirme, sayı ayıklama, satır sayma.",
  keywords: ["alt alta listeyi virgülle ayırma", "satırları birleştirme", "listeyi tek satır yapma", "satır başına ek ekleme", "excel sütunu virgülle birleştirme", "sql in listesi tırnak", "metinden sayı ayıklama", "satır sayısı sayma"],
  lead: "Alt alta yazılmış bir listeyi virgülle ayırmak için her satır sonunu (satır başı karakterini) virgül ve boşlukla değiştirmeniz yeterlidir; Satırları Birleştir aracına listeyi yapıştırıp ayraç olarak \", \" seçtiğinizde sonuç tek satırda çıkar. Aynı mantıkla her değeri tırnak içine alabilir, SQL sorgusu için IN listesi hazırlayabilir, Excel sütununu tek hücreye dökebilir ya da virgüllü listeyi tekrar alt alta açabilirsiniz. Bu rehber, ofiste ve yazılımda en sık gereken liste dönüşümlerini örnekleriyle anlatıyor.",
  kisaCevap: [
    "Alt alta listeyi virgülle ayırmak = her satır sonunu \", \" ile değiştirmek; boş satırlar önceden temizlenmelidir.",
    "Her satırı tırnak içine almak için önce ön ek ve son ek olarak ' ekleyin, sonra virgülle birleştirin.",
    "SQL IN listesi: 'elma', 'armut', 'kiraz' biçiminde, metin değerleri tek tırnakla, sayılar tırnaksız yazılır.",
    "Excel'de METİNBİRLEŞTİR işlevi bir aralığı tek hücrede birleştirir: =METİNBİRLEŞTİR(\", \";DOĞRU;A1:A10).",
    "Virgüllü listeyi tekrar alt alta açmak için \", \" ayracını satır sonuyla değiştirmek yeterlidir.",
    "Satır sayısı = satır sonu sayısı + 1; son satırdan sonra boş satır varsa sayaç bunu ayrıca gösterir."
  ],
  figure: {
    alt: "Alt alta dört satırlık bir liste, ön ek ve son ek eklenerek tırnaklanıyor, ardından virgülle tek satırda birleşiyor; sonuç SQL IN listesine dönüşüyor.",
    caption: "Üç adımlı dönüşüm: liste temizlenir, her satıra tırnak eklenir, satırlar virgülle birleştirilir. Ters yönde ayraç satır sonuyla değiştirilerek liste yeniden açılır.",
    svg: `<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Alt alta listeden virgüllü satıra</text>
  <rect x="20" y="56" width="180" height="200" rx="8" class="sf sb"/>
  <text x="110" y="82" class="b mid">1. Ham liste</text>
  <g class="sm"><text x="40" y="112">elma</text><text x="40" y="138">armut</text><text x="40" y="164" class="mu">(boş satır)</text><text x="40" y="190">kiraz </text><text x="40" y="216">erik</text></g>
  <text x="110" y="244" class="sm mid t2">5 satır, 1 boş</text>
  <line x1="204" y1="156" x2="246" y2="156" class="sp sw" fill="none"/><polygon points="246,149 258,156 246,163" class="p"/>
  <rect x="262" y="56" width="180" height="200" rx="8" class="ps"/>
  <text x="352" y="82" class="b mid">2. Temizle + tırnak</text>
  <g class="sm"><text x="282" y="112">'elma'</text><text x="282" y="138">'armut'</text><text x="282" y="164">'kiraz'</text><text x="282" y="190">'erik'</text></g>
  <text x="352" y="244" class="sm mid t2">boş satır ve boşluk silindi</text>
  <line x1="446" y1="156" x2="488" y2="156" class="sp sw" fill="none"/><polygon points="488,149 500,156 488,163" class="p"/>
  <rect x="504" y="56" width="196" height="200" rx="8" class="oks"/>
  <text x="602" y="82" class="b mid">3. Virgülle birleştir</text>
  <text x="602" y="130" class="sm mid">'elma', 'armut',</text>
  <text x="602" y="152" class="sm mid">'kiraz', 'erik'</text>
  <text x="602" y="200" class="sm mid t2">ayraç: virgül + boşluk</text>
  <text x="602" y="220" class="sm mid t2">4 değer, tek satır</text>
  <rect x="20" y="276" width="680" height="88" rx="8" class="sf sb"/>
  <rect x="20" y="276" width="8" height="88" class="p"/>
  <text x="44" y="302" class="b">Sonuç SQL sorgusunda</text>
  <text x="44" y="328" class="sm"><tspan class="b">WHERE</tspan> urun <tspan class="b">IN</tspan> ('elma', 'armut', 'kiraz', 'erik')</text>
  <text x="44" y="352" class="sm t2">Ters yön: ", " ayracını satır sonuyla değiştirince liste yeniden alt alta açılır.</text>
</svg>`
  },
  sections: [
    {
      h: "Alt alta liste neden virgülle birleştirilir?",
      p: [
        "Excel sütunundan kopyalanan müşteri numaraları, bir e-postaya alt alta yazılmış ürün kodları ya da bir sistemden dışa aktarılan etiketler genellikle her değer ayrı satırda gelir. Oysa bu listeleri kullanacağınız yer çoğu zaman tek satır ister: bir arama kutusu, bir SQL sorgusunun IN ifadesi, bir web formundaki \"virgülle ayırarak yazın\" alanı ya da bir e-posta alıcı satırı.",
        "Teknik olarak alt alta liste, değerlerin arasına görünmeyen bir <strong>satır sonu karakteri</strong> konmuş metindir. Windows'ta bu karakter çoğunlukla iki karakterlik CR LF, macOS ve Linux'ta tek karakterlik LF'dir. Virgülle ayırmak, bu satır sonlarını seçtiğiniz ayraçla değiştirmekten ibarettir. Satır sonu gibi görünmeyen karakterleri [[bilgi:kacis-karakteri-nedir-n-t-ters-egik-cizgi|kaçış karakteri yazısında]] ayrıntılı bulabilirsiniz."
      ]
    },
    {
      h: "Adım adım: listeyi tek satırda virgülle birleştirme",
      ol: [
        "Listenizi kopyalayın ve [[arac:satirlari-birlestir|Satırları Birleştir]] aracındaki metin alanına yapıştırın.",
        "Ayraç olarak virgül ve boşluk (\", \") seçin. Yalnızca virgül gerekiyorsa boşluksuz \",\" kullanın; noktalı virgül, dikey çizgi ya da kendi ayracınızı da yazabilirsiniz.",
        "\"Boş satırları sil\" seçeneğini açın; aksi hâlde iki virgül arasında boş bir değer oluşur (\"elma, , armut\").",
        "Satır başı ve sonundaki boşlukları kırpın. \"kiraz \" ile \"kiraz\" bir veritabanı için farklı değerlerdir.",
        "Sonucu kopyalayın ve kullanacağınız yere yapıştırın. Değer sayısını doğrulamak için birleştirmeden önce [[arac:satir-sayaci|Satır Sayacı]] ile dolu satırları sayabilirsiniz."
      ],
      after: [
        "Bu işlem metninizi hiçbir sunucuya göndermeden, tarayıcınızda yapılır. Müşteri listesi, telefon numarası ya da iç kodlar gibi hassas verilerde bu önemli bir avantajdır."
      ]
    },
    {
      h: "Her satırın başına ve sonuna metin ekleme",
      p: [
        "Birçok durumda değerlerin yalnızca virgülle ayrılması yetmez; her birinin tırnak içinde, parantezde ya da bir etiketin içinde olması gerekir. [[arac:onek-sonek-ekle|Ön Ek ve Son Ek Ekle]] aracı her satıra aynı metni topluca ekler. Önce ekleme, sonra birleştirme yapılır."
      ],
      table: {
        head: ["İhtiyaç", "Ön ek", "Son ek", "Örnek satır sonucu"],
        rows: [
          ["Tek tırnaklı değer (SQL)", "'", "'", "'elma'"],
          ["Çift tırnaklı değer (JSON dizisi)", "\"", "\"", "\"elma\""],
          ["Madde işaretli liste", "- ", "(boş)", "- elma"],
          ["Numara önüne ülke kodu", "+90", "(boş)", "+905xx..."],
          ["Etiket (hashtag)", "#", "(boş)", "#elma"],
          ["Dosya adına uzantı", "(boş)", ".jpg", "elma.jpg"],
          ["Satır sonuna noktalı virgül", "(boş)", ";", "elma;"]
        ],
        caption: "Ön ek ve son ek her satıra aynen eklenir. Ardından satırları birleştirirseniz tırnaklı ve virgüllü tek satır elde edersiniz."
      },
      after: [
        "JSON dizisi hazırlıyorsanız çift tırnaklı değerleri virgülle birleştirip başa \"[\" sona \"]\" koymanız yeterlidir. Sonucun geçerli olup olmadığını [[bilgi:json-nedir-nasil-okunur|JSON yazısında]] anlatılan kurallarla kontrol edebilirsiniz."
      ]
    },
    {
      h: "SQL sorgusu için değerler tırnak içine nasıl alınır?",
      p: [
        "Bir veritabanında belirli kayıtları aramak için en sık kullanılan kalıp <code>WHERE alan IN (...)</code> ifadesidir. Metin değerleri tek tırnak içinde, sayısal değerler tırnaksız yazılır. Elinizdeki 4 ürün adıyla dönüşüm şöyle ilerler:"
      ],
      formula: "Girdi:  elma / armut / kiraz / erik  (alt alta)\nÖn ek ', son ek '   →  'elma' / 'armut' / 'kiraz' / 'erik'\nAyraç \", \" ile birleştir →  'elma', 'armut', 'kiraz', 'erik'\nSorgu: SELECT * FROM urunler WHERE ad IN ('elma', 'armut', 'kiraz', 'erik');",
      ul: [
        "<strong>Değerin içinde tırnak varsa:</strong> SQL'de tek tırnak iki kez yazılarak kaçırılır: \"Ali'nin\" değeri <code>'Ali''nin'</code> olur. Bu satırları birleştirmeden önce düzeltin.",
        "<strong>Sayısal kimlikler:</strong> 1024, 2048 gibi müşteri numaraları için tırnak eklemeyin; doğrudan virgülle birleştirin.",
        "<strong>Çok uzun listeler:</strong> Bazı veritabanları IN listesindeki öğe sayısını sınırlar. Binlerce değerde geçici bir tabloya aktarmak daha sağlıklıdır.",
        "<strong>Uygulama kodunda:</strong> Kullanıcıdan gelen değerleri sorguya elle birleştirmek SQL enjeksiyonuna yol açar; uygulamalarda parametreli sorgu kullanın. Elle birleştirme yalnızca kendi yazdığınız tek seferlik sorgular içindir."
      ],
      after: [
        "Temel SQL komutlarına giriş için [[bilgi:sql-nedir-temel-sorgular|SQL nedir yazısına]] göz atabilirsiniz."
      ]
    },
    {
      h: "Excel sütunu virgüllü listeye nasıl çevrilir?",
      p: [
        "Excel'de iki yol vardır. Birincisi formüldür: Türkçe Excel'de <code>=METİNBİRLEŞTİR(\", \";DOĞRU;A1:A10)</code> yazdığınızda A1:A10 aralığı tek hücrede virgülle birleşir; ikinci bağımsız değişkendeki DOĞRU boş hücreleri atlar. İngilizce arayüzde aynı işlevin adı TEXTJOIN'dir ve bağımsız değişkenler virgülle ayrılır.",
        "İkinci yol daha pratiktir: sütunu seçip kopyalayın ve doğrudan Satırları Birleştir aracına yapıştırın. Excel'den kopyalanan her hücre ayrı satır olarak gelir. Bu yöntem formül bilgisi gerektirmez ve sonucu başka bir programa aktarırken hücre sınırı sorununu ortadan kaldırır.",
        "Tersi de mümkündür: virgüllü bir listeyi Excel'de sütunlara ayırmak için Veri sekmesindeki \"Metni Sütunlara Dönüştür\" komutunu kullanabilirsiniz. Değerleri satırlara dağıtmak istiyorsanız önce aşağıda anlatılan yöntemle listeyi alt alta açıp sonra yapıştırmak daha kolaydır. Dosya düzeyinde virgüllü veri için [[bilgi:csv-dosyasi-nedir-excelde-nasil-acilir|CSV yazısı]] Türkçe Excel'deki noktalı virgül ayracı sorununu da açıklar."
      ]
    },
    {
      h: "Virgüllü liste tekrar alt alta nasıl açılır?",
      p: [
        "Birleştirmenin tersi, ayracı satır sonuyla değiştirmektir. Virgülden sonra boşluk varsa ayraç olarak \", \" (virgül ve boşluk) kullanılmalıdır; yalnızca virgülü değiştirirseniz her satırın başında bir boşluk kalır. Ayracı bilmiyorsanız önce yalnızca virgülle ayırıp ardından satır başı boşluklarını kırpmak en güvenli yoldur.",
        "Değerlerin içinde de virgül geçiyorsa (örneğin \"İstanbul, Kadıköy\") basit değiştirme işlemi değeri ikiye böler. Bu tür verilerde değerler genellikle çift tırnak içinde gelir; CSV kurallarına göre tırnak içindeki virgül ayraç sayılmaz. Karmaşık desenler için [[bilgi:regex-nedir-duzenli-ifade-ornekleri|düzenli ifade (regex)]] kullanmak gerekir."
      ]
    },
    {
      h: "Metindeki sayıları ayıklama, satır sayma ve uzunluğa göre sıralama",
      p: [
        "Liste düzenlemenin diğer sık işleri de aynı mantıkla tek tıkla yapılabilir. Bir e-postada geçen tutarları toplamak, bir listenin kaç kalemden oluştuğunu bulmak ya da en uzun ürün adını görmek bunlara örnektir."
      ],
      ul: [
        "<strong>Sayı ayıklama:</strong> \"Fatura 1.250,50 TL, iade 300 TL, kargo 89,90 TL\" metnini [[arac:sayi-ayikla|Metinden Sayı Ayıklama]] aracına verdiğinizde 1.250,50, 300 ve 89,90 değerleri listelenir; toplam 1.640,40 olarak hesaplanır. Türkçe ondalık virgül desteklenir.",
        "<strong>Satır sayma:</strong> Satır Sayacı toplam, dolu ve boş satır sayısını ayrı ayrı verir. 120 satırlık listede 3 boş satır varsa birleştirme sonucu 117 değer içermelidir.",
        "<strong>Uzunluğa göre sıralama:</strong> [[arac:satir-sirala-uzunluk|Satırları Uzunluğa Göre Sırala]] aracı ürün adlarını kısadan uzuna dizer; karakter sınırı olan bir alana sığmayan satırları hemen görürsünüz.",
        "<strong>Tekrarları silme:</strong> Birleştirmeden önce aynı değerin iki kez geçmediğinden emin olmak için [[bilgi:tekrar-eden-satirlari-silme-liste-duzenleme|tekrar eden satırları silme]] yöntemini kullanın."
      ]
    },
    {
      h: "Hangi ayraç ne zaman kullanılır?",
      p: [
        "Ayraç seçimi, listeyi yapıştıracağınız yerin beklediği biçime bağlıdır. Yanlış ayraç, değerlerin tek bir uzun değer gibi okunmasına ya da bir sayının ikiye bölünmesine yol açar. Aşağıdaki tablo en sık karşılaşılan hedefleri özetler."
      ],
      table: {
        head: ["Hedef", "Önerilen ayraç", "Not"],
        rows: [
          ["E-posta alıcı satırı", "; ya da , ", "Programa göre değişir; birini deneyip doğrulayın"],
          ["SQL IN listesi", ", ", "Metin değerleri tek tırnakla"],
          ["Etiket ya da anahtar kelime alanı", ", ", "Çoğu form virgülü ayraç sayar"],
          ["Türkçe Excel'e yapıştırılacak CSV", ";", "Ondalık virgülle karışmaz"],
          ["Arama motorunda VEYA araması", " OR ", "Büyük harfle yazılır"],
          ["Düz metin cümlesi", ", ve son öğeden önce \"ve\"", "Son ayracı elle düzeltin"]
        ]
      }
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Boş satırları bırakmak:</strong> Sonda ya da arada kalan boş satırlar \"elma, , armut,\" gibi boş değerler ve sonda fazladan virgül üretir.",
        "<strong>Görünmeyen boşluklar:</strong> Excel'den gelen değerlerin sonunda boşluk ya da bölünemez boşluk olabilir; kırpma seçeneğini açın.",
        "<strong>Yanlış ayraç:</strong> Türkçe sistemlerde ondalık ayraç virgül olduğu için sayısal listelerde virgül karışıklık yaratabilir; böyle durumlarda noktalı virgül tercih edin.",
        "<strong>Tırnakları sonradan eklemeye çalışmak:</strong> Önce birleştirip sonra tırnak eklemek elle düzeltme gerektirir. Sıra her zaman: temizle, ek ekle, birleştir.",
        "<strong>Kontrol etmeden yapıştırmak:</strong> Birleştirilmiş değer sayısını satır sayısıyla karşılaştırın; fark varsa boş ya da tekrarlanan satır vardır."
      ]
    }
  ],
  faq: [
    ["Alt alta yazılmış bir liste tek satırda virgülle nasıl birleştirilir?", "Listeyi Satırları Birleştir aracına yapıştırın, ayraç olarak virgül ve boşluk seçin, boş satırları silme ve kırpma seçeneklerini açın. Sonuç tek satırda virgülle ayrılmış olarak çıkar ve kopyalanabilir."],
    ["Her satırın başına ve sonuna metin nasıl eklenir?", "Ön Ek ve Son Ek Ekle aracına listeyi yapıştırın, başa eklenecek metni ön ek, sona eklenecek metni son ek alanına yazın. Araç her satıra aynı metni ekler; tırnak, madde işareti ya da uzantı eklemek için kullanılır."],
    ["Excel sütunu virgüllü listeye nasıl çevrilir?", "Türkçe Excel'de =METİNBİRLEŞTİR(\", \";DOĞRU;A1:A10) formülü aralığı tek hücrede birleştirir. Formül kullanmak istemiyorsanız sütunu kopyalayıp Satırları Birleştir aracına yapıştırmanız da aynı sonucu verir."],
    ["SQL sorgusu için değerler tırnak içine nasıl alınır?", "Önce her satıra ön ek ve son ek olarak tek tırnak ekleyin, sonra satırları virgül ve boşlukla birleştirin. Sonucu IN parantezinin içine koyun. Sayısal değerlere tırnak eklenmez, değer içindeki tek tırnak iki kez yazılır."],
    ["Metindeki sayılar nasıl ayıklanıp toplanır?", "Metni Metinden Sayı Ayıklama aracına yapıştırın. Araç metindeki tüm sayıları bulur, liste hâlinde gösterir ve adet, toplam, ortalama, en küçük ve en büyük değeri hesaplar. Türkçe ondalık virgülü doğru tanır."],
    ["Listede kaç satır olduğu nasıl sayılır?", "Satır Sayacı aracı toplam satır sayısını, dolu ve boş satırları ayrı ayrı, ayrıca benzersiz satır sayısını gösterir. Birleştirme sonrasındaki değer sayısının dolu satır sayısıyla eşit olması gerekir."],
    ["Satırlar uzunluğa göre nasıl sıralanır?", "Satırları Uzunluğa Göre Sırala aracı satırları karakter sayısına göre kısadan uzuna ya da uzundan kısaya dizer. Eşit uzunluktaki satırlar özgün sırasında kalabilir ya da alfabetik sıralanabilir."],
    ["Virgüllü liste tekrar alt alta nasıl açılır?", "Ayracı, yani virgül ve boşluğu, satır sonu karakteriyle değiştirin. Değerlerin içinde virgül geçiyorsa basit değiştirme değeri böler; bu durumda tırnak içindeki virgülleri koruyan bir yöntem ya da düzenli ifade gerekir."],
    ["Birleştirdiğim liste bir sunucuya gönderiliyor mu?", "Hayır. Satırları Birleştir, Ön Ek ve Son Ek Ekle ve diğer metin araçları tamamen tarayıcınızda çalışır. Yapıştırdığınız metin hiçbir sunucuya iletilmez ve sayfayı kapattığınızda silinir."],
    ["Birleştirilmiş listenin sonunda neden fazladan virgül çıkıyor?", "Listenin son satırından sonra boş bir satır kalmışsa birleştirme o boş satırı da bir değer sayar ve sona virgül ekler. Boş satırları silme seçeneğini açarsanız ya da son satır sonunu silerseniz fazladan virgül oluşmaz."]
  ],
  tools: ["satirlari-birlestir", "onek-sonek-ekle", "sayi-ayikla", "satir-sayaci", "satir-sirala-uzunluk"],
  related: ["tekrar-eden-satirlari-silme-liste-duzenleme", "csv-dosyasi-nedir-excelde-nasil-acilir", "sql-nedir-temel-sorgular"]
};
