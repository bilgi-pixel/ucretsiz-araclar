export default {
  slug: "boylam-farki-yerel-saat-hesabi",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Boylam Farkından Yerel Saat Nasıl Hesaplanır? 4 Dakika Kuralı ve Örnek",
  pageTitle: "Yerel Saat Hesaplama: Boylam Farkı ve 4 Dakika Kuralı",
  description: "Her 1° boylam farkı 4 dakika, 15° fark 1 saat yerel saat farkı yaratır. Doğudaki yerin saati ileridedir. İzmir–Van, ulusal saat ve tarih çizgisi çözümlü örneklerle.",
  keywords: ["yerel saat hesaplama", "boylam farkı", "4 dakika kuralı", "ulusal saat", "saat dilimi nedir", "türkiye kaçıncı saat dilimi", "yerel saat ulusal saat farkı", "tarih değiştirme çizgisi"],
  lead: "İki yer arasındaki yerel saat farkı, boylam farkının 4 dakikayla çarpılmasıyla bulunur; çünkü Dünya 24 saatte 360° döner ve her 1° için 4 dakika, her 15° için 1 saat geçer. Doğudaki yer güneşi önce gördüğü için yerel saati her zaman ileridedir. Örneğin yaklaşık 27° doğu boylamındaki İzmir ile 43° doğu boylamındaki Van arasında 16° fark vardır; bu da 64 dakikalık yerel saat farkı eder. Bu sayfada kuralın nedenini, yerel ve ulusal saat farkını ve sınav tipi soruları çözümlü olarak anlatıyoruz.",
  kisaCevap: [
    "Dünya 1 saatte 15°, 4 dakikada 1°, 4 saniyede 1 yay dakikası (1') döner.",
    "Yerel saat farkı (dakika) = boylam farkı (derece) × 4.",
    "Doğudaki yerin yerel saati ileri, batıdaki yerin yerel saati geridir.",
    "Aynı yarımküredeki iki yer için boylamlar çıkarılır, farklı yarımkürelerdeki (doğu–batı) yerler için toplanır.",
    "Türkiye'nin ulusal saati 2016'dan beri 45° doğu boylamının yerel saatidir (UTC+3)."
  ],
  figure: {
    alt: "Türkiye haritası şeması üzerinde İzmir 27° doğu ve Van 43° doğu boylamları. Aralarında 16 derece fark ve 64 dakika yerel saat farkı. İzmir'de yerel saat 10.00 iken Van'da 11.04. Sağda 45° doğu ulusal saat boylamı.",
    caption: "Güneş doğudan doğduğu için Van'da öğle İzmir'den 64 dakika önce yaşanır. Ulusal saat 45° D'ye göre ayarlıdır; bu boylam Türkiye'nin doğu ucuna denk gelir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="t2"/></marker></defs>
  <text x="360" y="30" class="lg b mid">Boylam farkı → yerel saat farkı</text>
  <polygon points="90,150 150,118 240,124 330,110 430,118 520,108 610,122 640,160 600,200 500,214 400,206 300,214 200,206 120,196" class="ps"/>
  <text x="360" y="170" class="sm mid t2">Türkiye (şematik)</text>
  <line x1="110" y1="70" x2="110" y2="250" class="st dash" fill="none"/>
  <line x1="190" y1="70" x2="190" y2="250" class="sp sw" fill="none"/>
  <line x1="510" y1="70" x2="510" y2="250" class="sp sw" fill="none"/>
  <line x1="550" y1="70" x2="550" y2="250" class="sa sw dash" fill="none"/>
  <text x="110" y="64" class="sm mid">26° D</text>
  <text x="190" y="64" class="sm mid b">27° D</text>
  <text x="510" y="64" class="sm mid b">43° D</text>
  <text x="560" y="64" class="sm b">45° D</text>
  <circle cx="190" cy="168" r="7" class="p"/><text x="200" y="190" class="b">İzmir</text>
  <circle cx="510" cy="160" r="7" class="p"/><text x="500" y="184" class="b end">Van</text>
  <text x="560" y="240" class="sm b">ulusal saat</text>
  <line x1="196" y1="232" x2="504" y2="232" class="st" fill="none" marker-end="url(#ok)"/>
  <text x="350" y="226" class="sm mid b">16° × 4 dk = 64 dk</text>
  <rect x="20" y="270" width="320" height="130" rx="10" class="sf sb"/>
  <text x="180" y="298" class="b mid">İzmir yerel saati</text>
  <text x="180" y="346" class="xl mid">10.00</text>
  <text x="180" y="384" class="sm mid t2">batıda: saat geride</text>
  <rect x="380" y="270" width="320" height="130" rx="10" class="p"/>
  <text x="540" y="298" class="b mid sf">Van yerel saati</text>
  <text x="540" y="346" class="xl mid sf">11.04</text>
  <text x="540" y="384" class="sm mid sf">doğuda: saat ileride</text>
</svg>`
  },
  sections: [
    {
      h: "Yerel saat nedir?",
      p: [
        "Yerel saat, bir yerde güneşin gökyüzündeki konumuna göre belirlenen saattir. Güneşin bir yerin tam üzerinden, yani o yerin boylamı üzerinden geçtiği an o yerde <strong>yerel saat 12.00</strong> kabul edilir. Bu ana güneş öğlesi de denir; gün içinde gölgelerin en kısa olduğu andır.",
        "Aynı boylam üzerindeki bütün yerlerde güneş öğlesi aynı anda yaşanır; bu nedenle aynı boylamdaki yerlerin yerel saati aynıdır. Kuzeyde ya da güneyde olmaları, yani enlemleri, yerel saati değiştirmez. Farklı boylamlardaki yerlerin yerel saati ise farklıdır ve bu fark doğrudan boylam farkından hesaplanır. Boylamın ne olduğunu ve derece, dakika, saniye biçiminde nasıl okunduğunu [[bilgi:enlem-boylam-derece-dakika-saniye-nasil-okunur|enlem ve boylam nasıl okunur]] yazısında anlatıyoruz."
      ]
    },
    {
      h: "Her boylam farkı neden 4 dakikaya karşılık gelir?",
      p: [
        "Dünya kendi ekseni etrafındaki bir turunu, yani 360°'yi, yaklaşık 24 saatte tamamlar. Bu dönüş hızını farklı birimlerle yazdığımızda kuralın kendisi ortaya çıkar. 24 saat 1.440 dakika eder; 1.440 dakika ÷ 360° = 4 dakika. Yani Dünya her 4 dakikada 1° döner. Bir saatte döndüğü açı ise 360° ÷ 24 = 15°'dir."
      ],
      formula: "360° = 24 saat = 1.440 dakika\n15° = 1 saat\n1° = 4 dakika\n1' (yay dakikası) = 4 saniye",
      table: {
        head: ["Boylam farkı", "Yerel saat farkı"],
        rows: [
          ["1'", "4 saniye"],
          ["15'", "1 dakika"],
          ["1°", "4 dakika"],
          ["15°", "1 saat"],
          ["90°", "6 saat"],
          ["180°", "12 saat"]
        ]
      },
      after: [
        "Dünya batıdan doğuya doğru döndüğü için güneş doğudaki yerlerde önce doğar, önce tepeye çıkar ve önce batar. Bu yüzden doğudaki yerin yerel saati her zaman batıdakinden ileridedir. Sınavlarda yön karışıklığını önlemek için şu cümleyi akılda tutmak işe yarar: \"Doğu ileri, batı geri.\""
      ]
    },
    {
      h: "İki şehir arasındaki yerel saat farkı nasıl hesaplanır?",
      p: [
        "Hesap üç adımdan oluşur: boylam farkını bulmak, bu farkı 4 ile çarpmak ve sonucu doğru yöne eklemek ya da çıkarmak. İki yer aynı yarımküredeyse, yani ikisi de doğu ya da ikisi de batı boylamındaysa boylamlar çıkarılır. Biri doğu, diğeri batı boylamındaysa boylamlar toplanır, çünkü aralarında başlangıç meridyeni (0°) vardır."
      ],
      ol: [
        "<strong>Boylamları yazın:</strong> İzmir yaklaşık 27° D, Van yaklaşık 43° D.",
        "<strong>Farkı bulun:</strong> ikisi de doğu boylamında olduğu için çıkarın: 43 − 27 = 16°.",
        "<strong>Dakikaya çevirin:</strong> 16 × 4 = 64 dakika = 1 saat 4 dakika.",
        "<strong>Yönü belirleyin:</strong> Van daha doğuda olduğu için yerel saati ileridedir.",
        "<strong>Sonucu yazın:</strong> İzmir'de yerel saat 10.00 iken Van'da 10.00 + 1.04 = 11.04'tür."
      ],
      after: [
        "Boylam derece ve dakikayla verildiğinde iki birimi ayrı ayrı çevirmek kolaylık sağlar. İstanbul yaklaşık 28°58' D, Ankara yaklaşık 32°52' D boylamındadır. Fark 3°54'tür: 3° × 4 = 12 dakika, 54' × 4 = 216 saniye = 3 dakika 36 saniye. Toplam yerel saat farkı 15 dakika 36 saniyedir. Ondalık derece ile derece–dakika–saniye arasında dönüşüm için [[arac:dms-ondalik-derece-cevir|DMS Ondalık Derece Çevirici]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Farklı yarımkürelerdeki yerler için çözümlü örnek",
      p: [
        "Biri doğu, diğeri batı boylamında olan iki yer arasındaki boylam farkı, iki boylamın toplamıdır. İstanbul yaklaşık 29° D, New York ise yaklaşık 74° B boylamındadır. Aralarındaki boylam farkı 29 + 74 = 103°'dir."
      ],
      ol: [
        "Boylam farkı: 29° + 74° = 103°.",
        "Yerel saat farkı: 103 × 4 = 412 dakika = 6 saat 52 dakika.",
        "Yön: İstanbul doğuda olduğu için ileridedir.",
        "Sonuç: New York'ta yerel saat 08.00 iken İstanbul'da yerel saat 14.52'dir."
      ],
      after: [
        "Bu sonuç saat dilimine göre bulunan ulusal saat farkından farklıdır. Türkiye UTC+3, New York kışın UTC−5 kullandığı için ulusal saat farkı kışın 8 saattir. Gerçek hayattaki saat farkını bulmak için yerel saat değil, ulusal saat ve yaz saati uygulaması dikkate alınır; bunu [[arac:zaman-dilimi-cevirici|Zaman Dilimi Çevirici]] aracı tarih seçerek gösterir."
      ]
    },
    {
      h: "Ulusal saat ile yerel saat farkı nedir?",
      p: [
        "Her yerin kendi yerel saatini kullanması günlük hayatta karmaşaya yol açardı: Ankara ile İstanbul arasında 15 dakikadan fazla fark olur, tren ve uçak tarifeleri, okul ve iş saatleri şehirden şehre değişirdi. Bu yüzden ülkeler belirli bir boylamın yerel saatini bütün ülke için ortak saat olarak kabul eder. Buna <strong>ulusal saat</strong> (ortak saat) denir.",
        "Türkiye 2016'dan beri 45° doğu boylamının yerel saatini ulusal saat olarak kullanır; bu UTC+3'e karşılık gelir. Daha önceki yıllarda kış aylarında 30° doğu boylamının yerel saati kullanılıyordu ve eski ders kitaplarında Türkiye'nin ulusal saati için 30° D boylamı geçer. Güncel durumu ve Avrupa ile saat farkının nasıl değiştiğini [[bilgi:turkiye-yaz-saati-kis-saati-uygulamasi|Türkiye'de yaz saati]] yazısında ayrıntılı anlatıyoruz."
      ],
      formula: "Yerel saat = ulusal saat ± (45° − yerin boylamı) × 4 dakika\nİzmir (27° D): ulusal saat 12.00 → (45 − 27) × 4 = 72 dk geri → yerel saat 10.48\nVan (43° D): ulusal saat 12.00 → (45 − 43) × 4 = 8 dk geri → yerel saat 11.52",
      after: [
        "Türkiye yaklaşık 26° ile 45° doğu boylamları arasında uzandığı için ülkenin en batısı ile en doğusu arasında yaklaşık 19 × 4 = 76 dakikalık yerel saat farkı vardır. Ulusal saat ülkenin doğu ucundaki boylama göre ayarlandığından, Türkiye'nin hemen her yerinde yerel saat ulusal saatin gerisindedir; batıya gidildikçe bu fark büyür."
      ]
    },
    {
      h: "Türkiye hangi saat dilimini kullanır? Saat dilimi nedir?",
      p: [
        "Saat dilimi, ortak saat kullanan bölgedir. Teorik olarak Dünya 15°'lik 24 dilime ayrılır ve her dilim, ortasından geçen boylamın yerel saatini kullanır. Başlangıç dilimi 0° boylamı merkez alır; doğuya doğru her dilim bir saat ileri, batıya doğru bir saat geridir. Bu sisteme göre 45° D boylamı 3. saat diliminin orta boylamıdır ve UTC+3'e karşılık gelir.",
        "Türkiye'nin toprakları coğrafi olarak iki dilime yayılır: yaklaşık 37,5° D boylamının batısı 2. saat dilimine, doğusu 3. saat dilimine düşer. Ancak ülke tek bir ulusal saat kullanır ve bu saat 3. saat diliminin, yani UTC+3'ün saatidir."
      ]
    },
    {
      h: "Doğudaki şehirde güneş neden daha erken doğar? Saat dilimi sınırları neden düz değildir?",
      p: [
        "Güneş doğudaki şehirlerde önce doğar, çünkü Dünya batıdan doğuya döner ve doğudaki yerler güneşe önce yönelir. Aynı enlemde, aynı gün, doğudaki bir şehirde güneş boylam farkı × 4 dakika kadar önce doğar. Bu yüzden ulusal saatle aynı anda başlayan okul ve iş saatleri, doğu illerinde daha aydınlık, batı illerinde daha karanlık bir sabaha denk gelir. Gün doğumu saatleri yalnızca boylama değil enleme ve mevsime de bağlıdır; yukarıdaki kural aynı enlemdeki yerleri karşılaştırırken tam geçerlidir.",
        "Haritalarda saat dilimi sınırları teorideki düz çizgiler gibi değil, zikzaklı görünür. Bunun nedeni, ülkelerin sınırlarını, ekonomik ilişkilerini ve günlük yaşam düzenini dikkate alarak saat seçmeleridir. Bir ülkenin topraklarını iki dilime bölmek yerine tek saat kullanması, ticaret ortaklarıyla aynı saati seçmesi ya da yarım saatlik dilimler kullanması bu düzensizliği yaratır. Bazı ülkeler UTC'ye göre 30 ya da 45 dakikalık farklarla saat kullanır."
      ]
    },
    {
      h: "Tarih değiştirme çizgisi nedir?",
      p: [
        "180° boylamı, başlangıç meridyeninin Dünya'nın tam öbür yüzündeki karşılığıdır. Başlangıç meridyeninden doğuya giden biri her 15°'de saatini bir saat ileri alır ve 180°'ye vardığında 12 saat ileridedir. Batıya giden biri ise aynı noktaya 12 saat geride ulaşır. İki yol aynı yerde buluştuğu için arada tam 24 saatlik, yani bir günlük fark oluşur. Bu farkı çözmek için 180° boylamının yakınından geçen bir <strong>tarih değiştirme çizgisi</strong> kabul edilmiştir."
      ],
      ul: [
        "Çizgiyi doğudan batıya (Amerika'dan Asya'ya doğru) geçen yolcu takvimde bir gün ileri gider.",
        "Batıdan doğuya (Asya'dan Amerika'ya doğru) geçen yolcu takvimde bir gün geri gelir.",
        "Çizgi, ülkelerin ve ada gruplarının bölünmemesi için okyanusta kırılarak çizilmiştir; tam olarak 180° boylamı üzerinde değildir."
      ],
      after: [
        "Sınavlarda tarih değiştirme çizgisi genellikle \"bir gün kazanılır mı kaybedilir mi\" sorusu olarak gelir. Doğuya doğru giderken saat ileri alındığı için çizgide bir gün geri gelinir; batıya giderken saat geri alındığı için çizgide bir gün ileri gidilir. İki saat arasındaki farkı hesaplamak için [[arac:saat-hesapla|Saat Hesaplama]] aracını, açı ve zaman ilişkisini görmek için [[bilgi:akrep-yelkovan-arasindaki-aci|akrep ile yelkovan arasındaki açı]] yazısını inceleyebilirsiniz."
      ]
    }
  ],
  faq: [
    ["Yerel saat nedir?", "Yerel saat, güneşin bir yerin boylamı üzerinden geçtiği anın 12.00 kabul edilmesiyle belirlenen saattir. Aynı boylamdaki bütün yerlerin yerel saati aynıdır; farklı boylamlardaki yerlerin yerel saati boylam farkına göre değişir."],
    ["Her boylam farkı neden 4 dakikaya karşılık gelir?", "Dünya 360 dereceyi 24 saatte, yani 1.440 dakikada döner. 1.440 dakikayı 360'a böldüğünüzde her 1 derece için 4 dakika bulursunuz; bu yüzden 15 derece 1 saate karşılık gelir."],
    ["İki şehir arasındaki yerel saat farkı nasıl hesaplanır?", "Boylam farkını bulup 4 ile çarpın; sonuç dakika cinsinden yerel saat farkıdır. Aynı yarımküredeki yerlerde boylamlar çıkarılır, doğu ve batı yarımkürelerdeki yerlerde toplanır; doğudaki yerin saati ileridedir."],
    ["Ulusal saat ile yerel saat farkı nedir?", "Yerel saat her boylamda farklıdır, ulusal saat ise bir ülkenin bütün topraklarında kullandığı ortak saattir. Türkiye ulusal saat olarak 45 derece doğu boylamının yerel saatini, yani UTC+3'ü kullanır."],
    ["Türkiye hangi saat dilimini kullanır?", "Türkiye 2016'dan beri tüm yıl UTC+3 saat dilimini kullanır. Bu, 45 derece doğu boylamını merkez alan 3. saat dilimidir; eski kaynaklarda geçen 30 derece doğu boylamı kış saatinin kullanıldığı döneme aittir."],
    ["Doğudaki şehirde güneş neden daha erken doğar?", "Dünya batıdan doğuya döndüğü için doğudaki yerler güneşe önce yönelir. Aynı enlemdeki iki şehirden doğudakinde güneş, boylam farkı çarpı 4 dakika kadar önce doğar ve önce batar."],
    ["Tarih değiştirme çizgisi nedir?", "180 derece boylamı yakınından geçen ve takvim gününün değiştiği kabul edilen çizgidir. Doğudan batıya geçen yolcu bir gün ileri, batıdan doğuya geçen yolcu bir gün geri gider; çizgi ülkeleri bölmemek için kırıklıdır."],
    ["Saat dilimi sınırları neden düz değildir?", "Ülkeler saatlerini sınırlarına, ekonomik ilişkilerine ve günlük yaşam düzenine göre seçer. Bir ülkenin tek saat kullanması ya da komşularıyla aynı saati seçmesi, teorideki düz dilim sınırlarını zikzaklı hale getirir."],
    ["Boylam derece ve dakikayla verilirse yerel saat farkı nasıl bulunur?", "Dereceleri 4 dakikayla, yay dakikalarını 4 saniyeyle çarpıp toplayın. Örneğin 3 derece 54 dakikalık fark 12 dakika artı 216 saniye, yani toplam 15 dakika 36 saniye eder."]
  ],
  tools: ["zaman-dilimi-cevirici", "dms-ondalik-derece-cevir", "saat-hesapla"],
  related: ["enlem-boylam-derece-dakika-saniye-nasil-okunur", "turkiye-yaz-saati-kis-saati-uygulamasi", "akrep-yelkovan-arasindaki-aci"]
};
