export default {
  slug: "jpg-png-svg-farki",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "JPG, PNG ve SVG Farkı Nedir? Hangi Resim Formatı Ne Zaman Kullanılır",
  pageTitle: "JPG, PNG ve SVG Farkı: Hangi Resim Formatı Ne Zaman?",
  description: "JPG kayıplı sıkıştırır ve fotoğrafta küçük dosya verir; PNG kayıpsızdır, şeffaflığı destekler; SVG vektördür, logo büyütülünce bozulmaz. Seçim tablosu.",
  keywords: ["jpg png farkı", "svg nedir", "png şeffaf arka plan", "hangi resim formatı", "jpg mi png mi", "svg png çevirme", "logo için svg mi png mi", "jpg neden kalite kaybeder"],
  lead: "Kısaca: <strong>JPG fotoğraflar için, PNG şeffaf arka planlı ya da keskin kenarlı görseller için, SVG ise logo ve ikon gibi büyütülünce bozulmaması gereken çizimler için</strong> uygundur. JPG kayıplı sıkıştırmayla küçük dosya üretir ama her kayıtta biraz kalite kaybeder; PNG kayıpsızdır ve saydamlığı destekler ama fotoğrafta büyük dosya oluşturur; SVG ise pikselden değil matematiksel çizgilerden oluşur. Bu sayfada üç formatın nasıl çalıştığını, boyut karşılaştırmalarını ve hangi durumda hangisini seçeceğinizi örneklerle bulacaksınız.",
  kisaCevap: [
    "JPG (JPEG): kayıplı sıkıştırma, şeffaflık yok; fotoğraflarda en küçük dosyayı verir.",
    "PNG: kayıpsız sıkıştırma, tam şeffaflık (alfa kanalı) desteği; ekran görüntüsü, metin içeren görsel ve şeffaf logo için uygundur.",
    "SVG: vektör format; şekiller matematiksel olarak tanımlanır, her boyutta keskin kalır; fotoğraf için uygun değildir.",
    "Şeffaf arka plan için PNG, WebP ya da SVG kullanılır; JPG şeffaflığı desteklemez, saydam alanlar beyaz ya da siyaha döner.",
    "1920 × 1080 bir fotoğraf sıkıştırılmadan yaklaşık 6,2 MB eder; JPG'de genellikle birkaç yüz KB, PNG'de birkaç MB tutar.",
    "Logo için ana dosya SVG olmalı; SVG kabul etmeyen yerler için gereken boyutta PNG üretilir."
  ],
  figure: {
    alt: "Aynı daire kenarının yakın plan görünümü: JPG'de bloklu sıkıştırma izleri, PNG'de keskin ama basamaklı pikseller ve şeffaf arka plan, SVG'de her büyütmede pürüzsüz eğri. Altında her formatın en uygun kullanım alanı.",
    caption: "Raster formatlar (JPG, PNG) görüntüyü piksel ızgarası olarak saklar; büyütüldüğünde pikseller görünür. SVG ise şekli bir eğri denklemiyle tarif ettiği için ekran ne kadar büyük olursa olsun yeniden çizilir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Aynı kenar, 8 kat büyütülmüş</text>
  <rect x="20" y="52" width="216" height="216" rx="10" class="sf sb"/>
  <rect x="252" y="52" width="216" height="216" rx="10" class="sf sb"/>
  <rect x="484" y="52" width="216" height="216" rx="10" class="sf sb"/>
  <g class="ps">
    <rect x="40" y="148" width="40" height="40"/><rect x="80" y="108" width="40" height="80"/><rect x="120" y="88" width="40" height="100"/>
    <rect x="40" y="188" width="160" height="60"/><rect x="160" y="88" width="40" height="100"/>
  </g>
  <g class="p">
    <rect x="80" y="148" width="40" height="40"/><rect x="120" y="128" width="40" height="60"/><rect x="40" y="208" width="160" height="40"/>
  </g>
  <g class="sb" fill="none">
    <line x1="80" y1="72" x2="80" y2="248"/><line x1="120" y1="72" x2="120" y2="248"/><line x1="160" y1="72" x2="160" y2="248"/>
    <line x1="40" y1="108" x2="200" y2="108"/><line x1="40" y1="148" x2="200" y2="148"/><line x1="40" y1="188" x2="200" y2="188"/>
  </g>
  <text x="128" y="70" class="sm mid dg">8×8 blok izleri</text>
  <g>
    <rect x="272" y="72" width="22" height="22" class="sf sb"/><rect x="294" y="72" width="22" height="22" class="ps"/>
    <rect x="272" y="94" width="22" height="22" class="ps"/><rect x="294" y="94" width="22" height="22" class="sf sb"/>
    <rect x="316" y="72" width="22" height="22" class="sf sb"/><rect x="316" y="94" width="22" height="22" class="ps"/>
  </g>
  <g class="p">
    <rect x="352" y="94" width="22" height="22"/><rect x="374" y="94" width="22" height="22"/><rect x="396" y="94" width="22" height="22"/><rect x="418" y="94" width="22" height="22"/>
    <rect x="330" y="116" width="110" height="22"/><rect x="308" y="138" width="132" height="22"/>
    <rect x="286" y="160" width="154" height="22"/><rect x="286" y="182" width="154" height="22"/>
    <rect x="272" y="204" width="168" height="44"/>
  </g>
  <text x="340" y="70" class="sm mid ok">şeffaf zemin</text>
  <path d="M504,248 L504,200 C504,130 560,84 680,84 L680,248 Z" class="p"/>
  <text x="592" y="70" class="sm mid ok">pürüzsüz eğri</text>
  <g class="mid">
    <text x="128" y="296" class="xl">JPG</text><text x="360" y="296" class="xl">PNG</text><text x="592" y="296" class="xl">SVG</text>
  </g>
  <g class="sm mid">
    <text x="128" y="322">kayıplı · şeffaflık yok</text><text x="360" y="322">kayıpsız · şeffaflık var</text><text x="592" y="322">vektör · ölçeklenir</text>
    <text x="128" y="346" class="b">Fotoğraf</text><text x="360" y="346" class="b">Ekran görüntüsü, şeffaf logo</text><text x="592" y="346" class="b">Logo, ikon, çizim</text>
    <text x="128" y="370" class="mu">1080p fotoğraf ~400 KB</text><text x="360" y="370" class="mu">aynı fotoğraf ~3 MB</text><text x="592" y="370" class="mu">logo ~5 KB</text>
  </g>
  <text x="360" y="406" class="sm mid t2">Boyutlar örnek değerlerdir; içerik ve ayarlarla değişir.</text>
</svg>`
  },
  sections: [
    {
      h: "Raster ve vektör: iki farklı görüntü dünyası",
      p: [
        "Resim formatlarını anlamanın ilk adımı, görüntünün nasıl saklandığını bilmektir. <strong>Raster</strong> (bitmap) formatlar görüntüyü küçük renkli karelerden, yani piksellerden oluşan bir ızgara olarak saklar. JPG, PNG, GIF, WebP ve BMP raster formatlardır. 1920 × 1080 bir görüntü yaklaşık 2,07 milyon pikselden oluşur ve her pikselin rengi ayrı ayrı kayıtlıdır.",
        "<strong>Vektör</strong> formatlar ise görüntüyü piksel olarak değil, \"şu noktadan şu noktaya bu kalınlıkta bir çizgi çiz, bu alanı bu renkle doldur\" gibi geometrik komutlar olarak saklar. SVG en yaygın vektör formatıdır. Vektör bir logo 16 piksellik site simgesinde de 10 metrelik bir afişte de aynı keskinlikle görünür; çünkü her seferinde hedef boyuta göre yeniden çizilir.",
        "Bu temel fark, her formatın güçlü ve zayıf yönlerini belirler. Fotoğraf gibi milyonlarca rengin karmaşık geçişlerle dağıldığı görüntüler raster ile, düz renkli ve net kenarlı çizimler vektörle daha verimli saklanır."
      ]
    },
    {
      h: "JPG nedir, neden kalite kaybeder?",
      p: [
        "JPG (ya da JPEG, Joint Photographic Experts Group), fotoğraflar için tasarlanmış kayıplı bir sıkıştırma yöntemidir. Görüntüyü 8 × 8 piksellik bloklara böler, insan gözünün az fark ettiği ince ayrıntıları ve renk farklarını atar. Bu sayede bir fotoğraf, sıkıştırılmamış hâlinin onda biri, hatta yirmide biri boyuta inebilir.",
        "\"Kayıplı\" ifadesi, atılan bilginin geri gelmeyeceği anlamına gelir. Kalite ayarı düşürüldükçe dosya küçülür ama blok sınırlarında kareli desenler, keskin kenarlarda ve yazıların çevresinde bulanık halkalar (artefakt) belirir. Aynı JPG'yi açıp düzenleyip yeniden JPG olarak kaydetmek her seferinde yeni bir kayıp ekler; bu yüzden düzenleme sürecinde orijinal dosyayı saklamak önemlidir.",
        "JPG şeffaflığı desteklemez. Saydam arka planlı bir görseli JPG'ye çevirdiğinizde saydam alanlar beyaz, siyah ya da başka bir düz renge dönüşür. Ayrıca JPG, ekran görüntüsü ve metin içeren görsellerde harflerin çevresinde lekelenme yaratabildiği için bu tür görseller için iyi bir seçim değildir."
      ]
    },
    {
      h: "PNG nedir, PNG dosyası neden büyük olur?",
      p: [
        "PNG (Portable Network Graphics) kayıpsız sıkıştırma kullanır: dosyayı açtığınızda her piksel kaydedildiği hâliyle geri gelir. Bu özellik, ekran görüntüleri, arayüz tasarımları, grafikler, metin içeren görseller ve keskin kenarlı çizimler için idealdir. PNG ayrıca <strong>alfa kanalı</strong> adı verilen, her piksel için 256 kademeli saydamlık bilgisini destekler; yumuşak gölgeli, yarı saydam bir logo ancak bu sayede düzgün görünür.",
        "Kayıpsızlığın bedeli dosya boyutudur. PNG, aynı renkteki geniş alanları çok iyi sıkıştırır; ama fotoğraftaki gibi her pikselin komşusundan az da olsa farklı olduğu görüntülerde sıkıştıracak tekrar bulamaz. Bu yüzden bir telefon fotoğrafını PNG olarak kaydetmek, JPG'ye göre 5–10 kat büyük dosya üretebilir."
      ],
      formula: "Sıkıştırılmamış boyut (bayt) = genişlik × yükseklik × piksel başına bayt\n1920 × 1080 × 3 (RGB) = 6.220.800 bayt ≈ 6,2 MB\n1920 × 1080 × 4 (RGBA, şeffaf) = 8.294.400 bayt ≈ 8,3 MB",
      after: [
        "Bu sıkıştırılmamış boyut, formatların ne kadar küçülttüğünü anlamak için iyi bir ölçüdür. Aynı fotoğraf %80 kalitede JPG olarak genellikle 300–600 KB, PNG olarak 2–4 MB civarında tutar. Düz renkli bir ekran görüntüsünde ise PNG çoğu zaman JPG'den daha küçük ve çok daha net çıkar. Boyut birimleri için [[bilgi:gb-kac-mb-veri-birimleri|veri birimleri]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "SVG nedir? Logo için SVG mi PNG mi?",
      p: [
        "SVG (Scalable Vector Graphics, ölçeklenebilir vektör grafiği), metin tabanlı bir vektör formatıdır. Bir SVG dosyasını not defteriyle açtığınızda dairelerin merkezini, yolların koordinatlarını ve renk kodlarını içeren okunabilir satırlar görürsünüz. Tarayıcılar SVG'yi doğrudan gösterir; bu sayfadaki infografik de bir SVG'dir.",
        "Logo için ana dosyanızın SVG olması önerilir. SVG her boyutta keskindir, dosya boyutu genellikle birkaç KB'dır, renkleri ve yazıları kolayca düzenlenebilir. Ancak bazı platformlar, ofis programları ve sosyal medya profil alanları SVG kabul etmez. Bu durumda SVG'den, ihtiyaç duyulan piksel boyutunda (örneğin 512 × 512 ya da 1024 × 1024) şeffaf arka planlı PNG üretilir."
      ],
      ul: [
        "<strong>SVG'nin uygun olduğu yerler:</strong> logo, ikon, harita ve şema, basit illüstrasyon, web sitesi arayüz öğeleri, kesim ve lazer makineleri için çizimler.",
        "<strong>SVG'nin uygun olmadığı yerler:</strong> fotoğraflar ve karmaşık gölge-doku içeren görseller; bunlar vektöre dönüştürüldüğünde ya çok büyük dosya oluşur ya da ayrıntı kaybolur.",
        "<strong>Güvenlik notu:</strong> SVG metin tabanlı olduğu için içine komut dosyası yerleştirilebilir. Kaynağını bilmediğiniz SVG'leri sitenize doğrudan yüklemek yerine PNG'ye çevirerek kullanmak daha güvenlidir."
      ]
    },
    {
      h: "Karşılaştırma tablosu: JPG, PNG, SVG ve diğerleri",
      table: {
        head: ["Özellik", "JPG", "PNG", "SVG", "WebP"],
        rows: [
          ["Tür", "Raster", "Raster", "Vektör", "Raster"],
          ["Sıkıştırma", "Kayıplı", "Kayıpsız", "Metin (çizim komutları)", "Kayıplı veya kayıpsız"],
          ["Şeffaflık", "Yok", "Var (alfa)", "Var", "Var"],
          ["Büyütünce", "Pikselleşir", "Pikselleşir", "Keskin kalır", "Pikselleşir"],
          ["En iyi kullanım", "Fotoğraf", "Ekran görüntüsü, şeffaf görsel", "Logo, ikon", "Web'de fotoğraf ve grafik"],
          ["Uyumluluk", "Her yerde", "Her yerde", "Tarayıcılar, tasarım programları", "Güncel tarayıcılar, bazı eski programlar açmaz"]
        ],
        caption: "GIF yalnızca 256 renk destekler; bugün daha çok kısa animasyonlar için kullanılır."
      },
      after: [
        "Web siteleri için WebP ve AVIF gibi yeni formatlar, JPG'ye göre aynı kalitede daha küçük dosya üretebilir. Ancak her program bu formatları açamadığı için resmî başvurular, e-posta ekleri ve baskı işleri için JPG ve PNG hâlâ en güvenli seçeneklerdir. WebP dosyalarıyla ilgili ayrıntılar [[rehber:webp-jpg-cevirme|WebP JPG çevirme rehberinde]] yer alır."
      ]
    },
    {
      h: "Hangi durumda hangi format? Pratik örnekler",
      table: {
        head: ["Kullanım", "Önerilen format", "Neden"],
        rows: [
          ["Telefon fotoğrafını e-postayla göndermek", "JPG", "Küçük dosya, her cihazda açılır"],
          ["e-Devlet veya sınav başvurusu için vesikalık", "JPG", "Sistemler genellikle JPG ve KB sınırı ister"],
          ["Ekran görüntüsü ve hata mesajı paylaşmak", "PNG", "Yazılar net kalır"],
          ["Şeffaf arka planlı logo (ofis belgesi için)", "PNG", "Saydamlık ve geniş uyumluluk"],
          ["Web sitesi logosu ve ikonları", "SVG", "Her ekran yoğunluğunda keskin, küçük dosya"],
          ["Matbaaya giden logo", "SVG ya da vektör PDF", "Baskı boyutunda kalite kaybı olmaz"],
          ["Web sitesindeki ürün fotoğrafları", "WebP ya da JPG", "Hızlı açılış için küçük dosya"]
        ]
      },
      after: [
        "Başvuru sistemleri çoğu zaman hem format hem dosya boyutu sınırı koyar. Bu tür durumlarda fotoğrafı JPG'ye çevirip [[arac:resim-kucult|Resim Küçültme aracıyla]] istenen KB değerine indirebilirsiniz. Çözünürlük ve baskı kalitesi arasındaki ilişki için [[bilgi:dpi-ve-cozunurluk-nedir|DPI ve çözünürlük]] yazısına göz atın."
      ]
    },
    {
      h: "Formatlar arasında dönüştürme nasıl yapılır?",
      p: [
        "Dönüştürmenin yönü, kazanacaklarınızı ve kaybedeceklerinizi belirler. PNG'den JPG'ye geçerken dosya küçülür ama şeffaflık kaybolur. JPG'den PNG'ye geçmek dosyayı büyütür, ancak JPG'de zaten kaybolmuş ayrıntıyı geri getirmez. SVG'den PNG'ye geçerken siz bir piksel boyutu seçersiniz; PNG'den SVG'ye ise doğrudan \"dönüştürme\" yoktur, görüntünün yeniden çizilmesi ya da izlenmesi (trace) gerekir."
      ],
      ol: [
        "JPG ile PNG arasında çift yönlü dönüşüm için [[arac:jpg-png-donustur|JPG PNG Dönüştürme aracını]] kullanın; şeffaf alanlar için arka plan rengini seçebilirsiniz.",
        "Logonuz SVG ise [[arac:svg-png|SVG PNG Dönüştürme aracında]] 1x–8x ölçek ya da tam piksel genişliği seçerek şeffaf PNG alın.",
        "WebP, GIF, BMP, AVIF gibi diğer formatlardan JPG ya da PNG'ye geçmek için [[arac:resim-donustur|Resim Dönüştürme aracını]] kullanın.",
        "Dönüştürülmüş dosyayı orijinal boyutunda açıp özellikle yazıların ve kenarların netliğini kontrol edin."
      ],
      after: [
        "Tüm bu araçlar dosyayı sunucuya göndermeden tarayıcınızda işler. Fotoğraf paylaşmadan önce içindeki konum bilgisini temizlemeyi de düşünebilirsiniz; ayrıntılar [[bilgi:fotograftaki-konum-bilgisi-nasil-silinir|fotoğraftaki konum bilgisi]] yazısında."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Logoyu JPG kaydetmek:</strong> Arka plan beyaz kutuya döner, kenarlarda leke oluşur.",
        "<strong>Fotoğrafı PNG ile göndermek:</strong> Dosya gereksiz yere birkaç MB büyür, yükleme sınırlarına takılır.",
        "<strong>Küçük PNG'yi büyütüp kullanmak:</strong> 200 piksellik bir logoyu afişe basmak bulanık sonuç verir; vektör kaynağa dönün.",
        "<strong>JPG'yi defalarca düzenleyip kaydetmek:</strong> Her kayıtta kalite biraz daha düşer; düzenlemeleri kayıpsız bir kopya üzerinde yapın.",
        "<strong>Uzantıyı elle değiştirmek:</strong> Dosya adındaki .png'yi .jpg yapmak formatı değiştirmez; gerçek dönüşüm için bir araç kullanın."
      ]
    }
  ],
  faq: [
    ["JPG ile PNG arasındaki fark nedir?", "JPG kayıplı sıkıştırır ve fotoğraflarda küçük dosya üretir, ancak şeffaflığı desteklemez. PNG kayıpsızdır, saydamlığı destekler ve metinli ya da keskin kenarlı görsellerde daha net sonuç verir; fotoğrafta ise dosya büyür."],
    ["Şeffaf arka plan için hangi format kullanılır?", "Şeffaf arka plan için PNG en yaygın ve uyumlu seçenektir. WebP ve SVG de şeffaflığı destekler. JPG şeffaflığı desteklemediği için saydam alanlar kaydedilirken beyaz ya da başka bir düz renge dönüşür."],
    ["SVG nedir?", "SVG, görüntüyü piksel yerine çizgi, eğri ve şekil komutlarıyla tanımlayan metin tabanlı bir vektör formatıdır. Her boyutta keskin kalır, logo ve ikonlar için idealdir ve tarayıcılar tarafından doğrudan gösterilir."],
    ["Logo için SVG mi PNG mi?", "Ana logo dosyanız SVG olmalıdır, çünkü her boyutta keskindir ve kolay düzenlenir. SVG kabul etmeyen platformlar ve ofis belgeleri için SVG'den gereken boyutta şeffaf arka planlı PNG üretmek en doğru yoldur."],
    ["Web sitesi için en uygun format hangisi?", "Fotoğraflar için WebP ya da iyi sıkıştırılmış JPG, logo ve ikonlar için SVG, şeffaflık gereken grafikler için PNG ya da WebP uygundur. Amaç görsel kaliteyi koruyarak sayfa açılış hızını artırmaktır."],
    ["JPG neden kalite kaybeder?", "JPG, dosyayı küçültmek için gözün az fark ettiği ayrıntıları kalıcı olarak atar. Kalite ayarı düştükçe ve dosya her yeniden kaydedildiğinde bu kayıp artar; blok desenleri ve kenarlarda bulanıklık belirginleşir."],
    ["PNG dosyası neden büyük olur?", "PNG kayıpsız sıkıştırdığı için hiçbir ayrıntıyı atmaz. Fotoğraf gibi her pikselin farklı olduğu görüntülerde sıkıştırılacak tekrar az olduğundan dosya JPG'ye göre birkaç kat büyük çıkar."],
    ["SVG dosyası nasıl PNG'ye çevrilir?", "SVG PNG Dönüştürme aracına dosyayı bırakıp ölçek ya da hedef piksel genişliğini seçmeniz yeterlidir. Araç şeffaf arka planı korur, birden fazla dosyayı aynı anda çevirebilir ve dosyayı bilgisayarınızdan dışarı göndermez."],
    ["PNG'yi SVG'ye çevirmek mümkün mü?", "Doğrudan ve kayıpsız bir dönüşüm yoktur, çünkü PNG piksel, SVG çizim komutu saklar. Basit logolar izleme (trace) yöntemiyle vektöre çevrilebilir, ancak sonuç genellikle elle düzeltme gerektirir; fotoğraflarda bu yöntem uygun değildir."]
  ],
  tools: ["jpg-png-donustur", "svg-png", "resim-donustur", "resim-kucult"],
  related: ["dpi-ve-cozunurluk-nedir", "fotograftaki-konum-bilgisi-nasil-silinir", "cmyk-ve-rgb-farki-baski", "gb-kac-mb-veri-birimleri"],
  sources: [
    ["W3C – SVG standardı", "https://www.w3.org/Graphics/SVG/"],
    ["W3C – PNG spesifikasyonu", "https://www.w3.org/TR/png/"]
  ]
};
