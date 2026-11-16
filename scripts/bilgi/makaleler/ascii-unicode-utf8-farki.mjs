export default {
  slug: "ascii-unicode-utf8-farki",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "ASCII, Unicode ve UTF-8 Nedir? Karakter Kodlaması Farkları Basitçe",
  pageTitle: "ASCII, Unicode ve UTF-8 Farkı: Karakter Kodlaması Nedir",
  description: "ASCII 128 karakterlik 7 bitlik tablodur; Unicode tüm yazıların karakter listesi, UTF-8 ise bu listeyi 1–4 baytla kaydetme yöntemidir. ANSI farkı ve Türkçe harfler.",
  keywords: ["ascii nedir", "unicode nedir", "utf-8 nedir", "ascii tablosu", "karakter kodlaması nedir", "utf-8 ile ansi farkı", "unicode kaçış dizisi", "emoji kaç bayt"],
  lead: "ASCII, İngiliz alfabesi, rakamlar ve temel işaretlerden oluşan <strong>128 karakterlik, 7 bitlik</strong> bir kod tablosudur; Unicode dünyadaki tüm yazı sistemlerinin karakterlerine birer numara veren evrensel listedir; UTF-8 ise bu numaraları <strong>1 ile 4 bayt</strong> arasında değişen uzunlukta kaydetmenin en yaygın yoludur. Kısacası ASCII eski ve dar bir tablo, Unicode karakterlerin kataloğu, UTF-8 o kataloğun dosyaya yazılma biçimidir. Bu sayfada farkları, Türkçe harflerin bayt karşılıklarını, ANSI sorununu ve kaçış dizilerini örneklerle bulacaksınız.",
  kisaCevap: [
    "ASCII 0–127 arası 128 kod içerir: 0–31 ve 127 kontrol karakteri, 32 boşluk, 48–57 rakamlar, 65–90 büyük, 97–122 küçük harflerdir.",
    "Unicode her karaktere U+0041 (A) ya da U+00E7 (ç) gibi bir kod noktası verir; kapasitesi U+0000–U+10FFFF arası 1.114.112 noktadır.",
    "UTF-8, ASCII karakterlerini 1 baytla, Türkçe harfleri 2 baytla, € ve ₺ gibi işaretleri 3 baytla, emojileri 4 baytla yazar.",
    "UTF-8 ASCII ile geriye uyumludur: yalnızca ASCII içeren bir dosya UTF-8 olarak da aynen okunur.",
    "Windows'taki \"ANSI\" Türkçe için genellikle Windows-1254 kod sayfasıdır; her karakter tek bayttır ve yalnızca 256 karakter tutar.",
    "Ã§ ve ÅŸ gibi bozuk görünüm, UTF-8 metnin tek baytlık bir kod sayfasıyla okunmasından kaynaklanır."
  ],
  figure: {
    alt: "UTF-8 bayt merdiveni: A harfi 1 bayt (41), ç harfi 2 bayt (C3 A7), Türk lirası işareti 3 bayt (E2 82 BA) ve gülen yüz emojisi 4 bayt (F0 9F 98 80) olarak kodlanıyor; her satırda kod noktası ve bit kalıbı gösteriliyor.",
    caption: "Unicode kod noktası büyüdükçe UTF-8'de kullanılan bayt sayısı artar. İlk baytın baştaki bitleri karakterin kaç bayt süreceğini söyler; devam baytları her zaman 10 ile başlar.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">UTF-8: bir karakter kaç bayt?</text>
  <g class="sm b mu">
    <text x="30" y="62">Karakter</text><text x="150" y="62">Kod noktası</text><text x="290" y="62">UTF-8 baytları</text><text x="560" y="62">İlk bayt kalıbı</text>
  </g>
  <rect x="20" y="74" width="680" height="64" rx="8" class="sf sb"/>
  <text x="56" y="114" class="xl mid">A</text>
  <text x="150" y="112">U+0041</text>
  <rect x="290" y="90" width="56" height="32" rx="5" class="oks"/><text x="318" y="112" class="mid b">41</text>
  <text x="560" y="112" class="sm">0xxxxxxx · 1 bayt</text>
  <rect x="20" y="146" width="680" height="64" rx="8" class="sf sb"/>
  <text x="56" y="186" class="xl mid">ç</text>
  <text x="150" y="184">U+00E7</text>
  <rect x="290" y="162" width="56" height="32" rx="5" class="ps"/><text x="318" y="184" class="mid b">C3</text>
  <rect x="354" y="162" width="56" height="32" rx="5" class="ps"/><text x="382" y="184" class="mid b">A7</text>
  <text x="560" y="184" class="sm">110xxxxx · 2 bayt</text>
  <rect x="20" y="218" width="680" height="64" rx="8" class="sf sb"/>
  <text x="56" y="258" class="xl mid">₺</text>
  <text x="150" y="256">U+20BA</text>
  <rect x="290" y="234" width="56" height="32" rx="5" class="ps"/><text x="318" y="256" class="mid b">E2</text>
  <rect x="354" y="234" width="56" height="32" rx="5" class="ps"/><text x="382" y="256" class="mid b">82</text>
  <rect x="418" y="234" width="56" height="32" rx="5" class="ps"/><text x="446" y="256" class="mid b">BA</text>
  <text x="560" y="256" class="sm">1110xxxx · 3 bayt</text>
  <rect x="20" y="290" width="680" height="64" rx="8" class="sf sb"/>
  <circle cx="56" cy="322" r="18" class="y"/><circle cx="50" cy="316" r="2.5" class="t"/><circle cx="62" cy="316" r="2.5" class="t"/>
  <path d="M47 326 Q56 336 65 326" class="st" fill="none"/>
  <text x="150" y="328">U+1F600</text>
  <rect x="290" y="306" width="56" height="32" rx="5" class="p"/><text x="318" y="328" class="mid b sf">F0</text>
  <rect x="354" y="306" width="56" height="32" rx="5" class="p"/><text x="382" y="328" class="mid b sf">9F</text>
  <rect x="418" y="306" width="56" height="32" rx="5" class="p"/><text x="446" y="328" class="mid b sf">98</text>
  <rect x="482" y="306" width="56" height="32" rx="5" class="p"/><text x="510" y="328" class="mid b sf">80</text>
  <text x="560" y="328" class="sm">11110xxx · 4 bayt</text>
  <text x="20" y="386" class="sm">Devam baytları hep 10xxxxxx biçimindedir. ASCII (0–127) UTF-8'de değişmeden kalır.</text>
  <text x="20" y="408" class="sm t2">Örnek: \"Çağrı\" 5 harf ama UTF-8'de 8 bayttır (Ç, ğ, ı 2'şer bayt).</text>
</svg>`
  },
  sections: [
    {
      h: "Karakter kodlaması nedir?",
      p: [
        "Bilgisayar harf tanımaz; yalnızca sayıları, daha doğrusu 0 ve 1'lerden oluşan baytları saklar. Ekranda gördüğünüz her harfin arkasında, \"bu sayı şu karakter demektir\" diyen bir anlaşma vardır. Bu anlaşmaya <strong>karakter kodlaması</strong> denir. Metni yazan program ile okuyan program aynı anlaşmayı kullanmazsa, aynı baytlar farklı harflere dönüşür ve metin bozuk görünür.",
        "Konuyu anlamak için iki kavramı ayırmak gerekir. <strong>Karakter kümesi</strong> hangi karakterlerin var olduğunu ve her birinin numarasını belirler. <strong>Kodlama</strong> ise bu numaraların bayt olarak nasıl yazılacağını belirler. ASCII'de ikisi aynı şeydir; Unicode dünyasında ise Unicode karakter kümesi, UTF-8, UTF-16 ve UTF-32 de onun kodlamalarıdır."
      ]
    },
    {
      h: "ASCII nedir? 128 karakterlik tablo",
      p: [
        "ASCII (American Standard Code for Information Interchange), 1963'te yayımlanan ve 7 bit kullandığı için 2<sup>7</sup> = 128 karakter tanımlayan bir kod tablosudur. Tablonun mantığı bugün de işinize yarar: rakamlar, büyük harfler ve küçük harfler ardışık bloklar hâlinde dizilmiştir. Büyük ve küçük harf arasındaki fark tam 32'dir; A 65, a 97'dir."
      ],
      table: {
        head: ["Aralık (ondalık)", "Onaltılık", "İçerik", "Örnek"],
        rows: [
          ["0–31 ve 127", "00–1F, 7F", "Kontrol karakterleri (görünmez)", "10 = satır sonu, 9 = sekme"],
          ["32", "20", "Boşluk", "Adreslerde %20 olarak görünür"],
          ["33–47", "21–2F", "Noktalama ve işaretler", "33 = !, 46 = ."],
          ["48–57", "30–39", "Rakamlar 0–9", "48 = 0, 57 = 9"],
          ["65–90", "41–5A", "Büyük harfler A–Z", "65 = A, 90 = Z"],
          ["97–122", "61–7A", "Küçük harfler a–z", "97 = a, 122 = z"]
        ],
        caption: "ASCII'de ç, ğ, ı, İ, ö, ş, ü yoktur. Bu harfler 128'in üzerindeki kodlara, yani ASCII dışına düşer."
      },
      after: [
        "Bir harfin ASCII kodunu bulmak için tabloya bakabilir ya da [[arac:ascii-tablosu|ASCII Tablosu Sorgulama]] aracına harfi yazıp ondalık, onaltılık, sekizlik ve ikili karşılığını görebilirsiniz. Ters yönde, elinizdeki sayının hangi karaktere denk geldiğini de aynı araç gösterir. Adreslerdeki <code>%20</code> gibi ifadelerin ASCII ile bağlantısı [[bilgi:url-kodlama-yuzde-20-nedir|URL kodlama rehberinde]] anlatılıyor."
      ]
    },
    {
      h: "Genişletilmiş ASCII ve \"ANSI\": Türkçe neden sorun çıkarıyordu?",
      p: [
        "Bir bayt 8 bit olduğu için ASCII'nin kullanmadığı 128–255 aralığı boş kalıyordu. Her ülke ve üretici bu aralığı kendi harfleriyle doldurdu. Türkçe için iki yaygın tablo ortaya çıktı: <strong>ISO-8859-9</strong> (Latin-5) ve Windows'un <strong>Windows-1254</strong> kod sayfası. Windows arayüzünde \"ANSI\" diye görünen kodlama, Türkçe bir sistemde çoğunlukla Windows-1254'tür.",
        "Sorun, aynı bayt değerinin farklı tablolarda farklı harf anlamına gelmesidir. Örneğin 0xF0 baytı Türkçe tabloda ğ, Batı Avrupa tablosunda (Windows-1252) ð harfidir. Türkçe bir sistemde yazılan dosya başka dilde ayarlı bir bilgisayarda açıldığında ğ yerine ð, ı yerine ý, ş yerine þ görünmesinin nedeni budur. Tek bir metinde hem Türkçe hem Yunanca harf kullanmak ise bu sistemde mümkün değildi."
      ]
    },
    {
      h: "Unicode nedir? Her karaktere bir numara",
      p: [
        "Unicode, kod sayfası karmaşasını bitirmek için 1991'den itibaren geliştirilen evrensel karakter standardıdır. Latin, Arap, Çin, Kiril, Ermeni ve Göktürk alfabeleri dahil yaşayan ve tarihî yazıların, matematik ve para birimi işaretlerinin ve emojilerin her birine tekil bir numara verir. Bu numaraya <strong>kod noktası</strong> denir ve <code>U+</code> önekiyle onaltılık yazılır: A için U+0041, ç için U+00E7, İ için U+0130, ₺ için U+20BA.",
        "Unicode'un kod alanı U+0000 ile U+10FFFF arasındadır; bu 1.114.112 olası kod noktası demektir. Bunların 150.000'i aşkın kısmına bugün karakter atanmıştır ve standart her yıl yeni sürümle genişler. İlk 128 kod noktası ASCII ile, ilk 256'sı ISO-8859-1 ile aynıdır; bu sayede eski metinler kolayca Unicode'a taşınabilir."
      ],
      table: {
        head: ["Türkçe harf", "Unicode", "UTF-8 baytları", "Windows-1254"],
        rows: [
          ["ç / Ç", "U+00E7 / U+00C7", "C3 A7 / C3 87", "E7 / C7"],
          ["ğ / Ğ", "U+011F / U+011E", "C4 9F / C4 9E", "F0 / D0"],
          ["ı / İ", "U+0131 / U+0130", "C4 B1 / C4 B0", "FD / DD"],
          ["ö / Ö", "U+00F6 / U+00D6", "C3 B6 / C3 96", "F6 / D6"],
          ["ş / Ş", "U+015F / U+015E", "C5 9F / C5 9E", "FE / DE"],
          ["ü / Ü", "U+00FC / U+00DC", "C3 BC / C3 9C", "FC / DC"]
        ],
        caption: "Türkçeye özgü 12 harfin tamamı UTF-8'de 2 bayt, Windows-1254'te 1 bayt yer kaplar."
      }
    },
    {
      h: "UTF-8 nedir, neden standart oldu?",
      p: [
        "UTF-8, Unicode kod noktalarını değişken uzunlukta, 1 ile 4 bayt arasında yazan bir kodlamadır. 1992'de tasarlandı ve bugün web sayfalarının, e-postaların, JSON verilerinin ve çoğu işletim sisteminin varsayılan kodlamasıdır. Başarısının üç nedeni vardır.",
        "Birincisi <strong>ASCII uyumluluğudur</strong>: 0–127 arası karakterler UTF-8'de tek bayttır ve ASCII ile birebir aynıdır. İkincisi <strong>verimliliktir</strong>: Latin harfli metinler için UTF-16 ya da UTF-32'den daha az yer kaplar. Üçüncüsü <strong>sağlamlıktır</strong>: her baytın ilk bitlerinden onun bir karakterin başı mı yoksa devamı mı olduğu anlaşılır; bozulan bir bayt yalnızca o karakteri etkiler, metnin geri kalanı okunabilir kalır."
      ],
      formula: "U+0000 – U+007F   → 1 bayt: 0xxxxxxx\nU+0080 – U+07FF   → 2 bayt: 110xxxxx 10xxxxxx\nU+0800 – U+FFFF   → 3 bayt: 1110xxxx 10xxxxxx 10xxxxxx\nU+10000 – U+10FFFF → 4 bayt: 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx",
      after: [
        "Çözümlü örnek: ç harfi U+00E7'dir, ikili olarak 000 1110 0111 eder. Bu 11 bit iki baytlık kalıba yerleştirilir: ilk 5 bit (00011) 110 ile birleşip 11000011 = C3, son 6 bit (100111) 10 ile birleşip 10100111 = A7 olur. Böylece ç, UTF-8'de C3 A7 baytlarıyla saklanır. Bu dönüşümü elle yapmak yerine [[arac:hex-metin-cevir|Metni Hex Koda Çevirme]] aracına bir kelime yazarak her harfin baytlarını görebilirsiniz."
      ]
    },
    {
      h: "ANSI ve UTF-8 farkı: bozuk karakterler nasıl oluşur?",
      p: [
        "UTF-8 ile kaydedilmiş bir metin, tek baytlık bir kod sayfasıyla okunursa her Türkçe harfin iki baytı ayrı ayrı iki karakter olarak görünür. ç harfinin C3 A7 baytları Windows-1254 tablosunda Ã ve § karşılığına denk gelir; ekranda \"Ã§\" görürsünüz. Ters durumda, Windows-1254 ile kaydedilmiş bir dosya UTF-8 olarak açılırsa tek baytlık Türkçe harfler geçersiz dizi sayılır ve yerlerinde soru işaretli kutular (U+FFFD) belirir."
      ],
      table: {
        head: ["Doğru metin", "UTF-8 baytları", "Windows-1254 ile okununca"],
        rows: [
          ["ç", "C3 A7", "Ã§"],
          ["ş", "C5 9F", "ÅŸ"],
          ["ı", "C4 B1", "Ä±"],
          ["ü", "C3 BC", "Ã¼"],
          ["ğ", "C4 9F", "ÄŸ"]
        ],
        caption: "Bu kalıpları tanırsanız sorunun ne olduğunu hemen anlarsınız: Ã ve Ä ile başlayan çift karakterler, UTF-8 metnin yanlış kodlamayla açıldığını gösterir."
      },
      after: [
        "Çözüm, dosyayı doğru kodlamayla yeniden açmak ve UTF-8 olarak kaydetmektir; metni bozuk hâliyle elle düzeltmeye çalışmak çoğu zaman bilgi kaybına yol açar. Elektronik tablolardan alınan CSV dosyalarında, eski muhasebe programlarının dışa aktarımlarında ve e-posta eklerinde bu sorun sık görülür. Adım adım düzeltme için [[bilgi:turkce-karakter-sorunu-nasil-duzeltilir|Türkçe karakter sorunu nasıl düzeltilir]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Unicode kaçış dizisi (\\u00e7) ne demek?",
      p: [
        "Bazı ortamlarda karakterin kendisini yazmak yerine kod noktasını yazmak gerekir: yalnızca ASCII kabul eden bir ayar dosyası, kaynak kodundaki bir dizgi ya da JSON verisi gibi. <code>\\u00e7</code> ifadesi \"U+00E7 kod noktalı karakter\", yani ç demektir. Ters eğik çizgi ve u harfinden sonra dört onaltılık rakam gelir."
      ],
      ul: [
        "<strong>JavaScript ve JSON:</strong> <code>\\u0130stanbul</code> = İstanbul; dört haneden büyük kod noktaları iki parçalı (vekil çift) yazılır.",
        "<strong>HTML:</strong> <code>&#231;</code> (ondalık) ya da <code>&#xE7;</code> (onaltılık) = ç.",
        "<strong>CSS:</strong> <code>\\E7</code> ya da <code>\\0000E7</code> = ç.",
        "<strong>Unicode gösterimi:</strong> <code>U+00E7</code>; belgelerde karakterden bahsetmek için kullanılır."
      ],
      after: [
        "Bu biçimler arasında elle çeviri yapmak yorucudur. [[arac:unicode-kacis-cevir|Unicode Kaçış Dizisi Çevirici]] Türkçe harfleri ve özel karakterleri bu biçimlerin herhangi birine dönüştürür, kaçışlı metni de okunur hâle geri getirir."
      ]
    },
    {
      h: "Emoji kaç bayt yer kaplar, metin ikili koda nasıl çevrilir?",
      p: [
        "Emojilerin çoğu U+1F300 ile U+1FAFF arasındaki kod noktalarındadır ve UTF-8'de <strong>4 bayt</strong> yer kaplar; gülen yüz U+1F600, F0 9F 98 80 baytlarıyla saklanır. Ten rengi seçilmiş ya da aile, bayrak gibi birleşik emojiler birden çok kod noktasının birleşimidir ve 8, 14, hatta 25 bayta çıkabilir. SMS ve sosyal medya karakter sınırlarında emojinin \"iki karakter\" sayılmasının nedeni, UTF-16'da 4 bayt yani iki birim tutmasıdır; bunun SMS'e etkisini [[bilgi:sms-kac-karakter|SMS kaç karakter]] yazısında bulabilirsiniz.",
        "Bir metni ikili koda çevirmek için önce her karakterin UTF-8 baytları bulunur, sonra her bayt 8 bitlik ikili sayıya yazılır. \"Ali\" kelimesi 01000001 01101100 01101001 olur; \"Çay\" ise Ç harfi iki bayt olduğu için 11000011 10000111 01100001 01111001, yani 4 bayttır. Bu işlemi [[arac:ikili-metin-cevir|Metni İkili Koda Çevirme]] aracı Türkçe harfleri doğru kodlayarak yapar; ikili sayıların mantığı için [[bilgi:ikilik-sayi-sistemi-nasil-cevrilir|ikilik sayı sistemi]] yazısına göz atabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar ve pratik öneriler",
      ul: [
        "<strong>Karakter sayısını bayt sayısı sanmak:</strong> Veritabanı alanı 50 bayt ise Türkçe harf yoğun bir metin 50 karaktere sığmayabilir; alan sınırını karakter cinsinden tanımlayın.",
        "<strong>Dosyayı kodlamasız kaydetmek:</strong> Yeni bir metin, CSV ya da HTML dosyası oluştururken kodlamayı açıkça UTF-8 seçin; HTML sayfalarında charset bildirimini unutmayın.",
        "<strong>BOM'u göz ardı etmek:</strong> Bazı düzenleyiciler UTF-8 dosyanın başına EF BB BF baytlarını (BOM) ekler; elektronik tablolar Türkçeyi doğru göstermek için bunu isteyebilir, bazı programlar ise bu yüzden hata verir.",
        "<strong>Büyük-küçük harf dönüşümünde dili unutmak:</strong> Türkçede i'nin büyüğü İ, ı'nın büyüğü I'dır; dil ayarı olmadan yapılan dönüşüm \"istanbul\" kelimesini \"ISTANBUL\" yapar.",
        "<strong>Bozuk metni üst üste dönüştürmek:</strong> Ã§ görünen bir metni tekrar UTF-8'e çevirmek bozulmayı katlar; önce hangi kodlamayla yazıldığını tespit edin."
      ]
    }
  ],
  faq: [
    ["ASCII nedir?", "ASCII, 1963'te yayımlanan ve 7 bit kullanarak 128 karakter tanımlayan kod tablosudur. İngiliz alfabesinin büyük ve küçük harflerini, rakamları, noktalama işaretlerini ve satır sonu gibi kontrol karakterlerini içerir; Türkçe harfler ASCII'de yoktur."],
    ["Unicode ile ASCII arasındaki fark nedir?", "ASCII yalnızca 128 karakter içerir. Unicode ise dünyadaki tüm yazı sistemlerini kapsayan, 1.114.112 kod noktalık bir karakter standardıdır. Unicode'un ilk 128 karakteri ASCII ile aynıdır, yani ASCII Unicode'un küçük bir alt kümesidir."],
    ["UTF-8 nedir, neden standart oldu?", "UTF-8, Unicode karakterlerini 1 ile 4 bayt arasında değişen uzunlukta kaydeden kodlamadır. ASCII ile geriye uyumlu, Latin harfli metinlerde yer tasarruflu ve hatalara dayanıklı olduğu için web, e-posta ve modern yazılımlarda varsayılan kodlama hâline gelmiştir."],
    ["ANSI ve UTF-8 farkı nedir?", "Windows'taki ANSI, Türkçe sistemlerde çoğunlukla Windows-1254 kod sayfasıdır ve her karakteri tek baytla yazar, yalnızca 256 karakter tutar. UTF-8 ise tüm Unicode karakterlerini destekler; Türkçe harfleri 2 baytla yazar. Biri diğeriyle okunursa karakterler bozulur."],
    ["Bir harfin ASCII kodu nasıl bulunur?", "ASCII tablosunda harfin satırına bakarak ya da bir ASCII sorgulama aracına harfi yazarak bulunur. Örneğin A 65, a 97, 0 rakamı 48'dir. Büyük ve küçük harf arasındaki fark her zaman 32'dir. Türkçe harflerin ASCII kodu yoktur."],
    ["Emoji kaç bayt yer kaplar?", "Tek kod noktalı emojilerin çoğu UTF-8'de 4 bayt, UTF-16'da da 4 bayt yer kaplar. Ten rengi, cinsiyet ya da aile gibi birleşik emojiler birden çok kod noktasından oluştuğu için 8 ile 25 bayt arasına çıkabilir."],
    ["Unicode kaçış dizisi (\\u00e7) ne demek?", "\\u00e7, U+00E7 kod noktalı karakteri yani ç harfini gösteren kaçış dizisidir. Ters eğik çizgi ve u harfinden sonra dört onaltılık rakam gelir. JavaScript ve JSON gibi ortamlarda karakteri doğrudan yazmadan göstermek için kullanılır."],
    ["Metin ikili koda nasıl çevrilir?", "Önce her karakterin UTF-8 bayt karşılığı bulunur, ardından her bayt 8 haneli ikili sayıya çevrilir. Örneğin A harfi 65'tir ve 01000001 olarak yazılır. Türkçe harfler iki bayt olduğu için 16 bitlik iki grup hâlinde görünür."],
    ["Türkçe karakterler neden Ã§ ya da ÅŸ şeklinde görünür?", "UTF-8 ile kaydedilmiş metin tek baytlık bir kod sayfasıyla açıldığında her Türkçe harfin iki baytı ayrı karakter olarak okunur; ç harfi Ã§, ş harfi ÅŸ hâline gelir. Dosyayı UTF-8 olarak yeniden açmak sorunu çözer."]
  ],
  tools: ["ascii-tablosu", "unicode-kacis-cevir", "hex-metin-cevir", "ikili-metin-cevir"],
  related: ["turkce-karakter-sorunu-nasil-duzeltilir", "ikilik-sayi-sistemi-nasil-cevrilir", "url-kodlama-yuzde-20-nedir", "sms-kac-karakter"],
  sources: [
    ["Unicode Consortium – Unicode Standardı", "https://www.unicode.org/standard/standard.html"],
    ["IETF – RFC 3629: UTF-8 kodlaması", "https://www.rfc-editor.org/rfc/rfc3629"]
  ]
};
