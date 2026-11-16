export default {
  slug: "enlem-boylam-derece-dakika-saniye-nasil-okunur",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Enlem ve Boylam Nasıl Okunur? Derece-Dakika-Saniye ve Ondalık Koordinat",
  pageTitle: "Enlem ve Boylam Nasıl Okunur? DMS ve Ondalık Koordinat",
  description: "Enlem ekvatordan kuzey-güney, boylam başlangıç meridyeninden doğu-batı açısıdır. DMS'yi ondalığa çevirme, harita koordinatı okuma, 1 derece kaç km ve hassasiyet.",
  keywords: ["enlem boylam nedir", "koordinat nasıl okunur", "derece dakika saniye", "ondalık derece çevirme", "dms ondalık çevirme", "gps koordinatı", "harita koordinatı", "1 derece kaç km", "grad nedir"],
  lead: "Enlem, bir noktanın ekvatorun ne kadar kuzeyinde ya da güneyinde olduğunu, boylam ise başlangıç (Greenwich) meridyeninin ne kadar doğusunda ya da batısında olduğunu gösteren <strong>açıdır</strong>; ikisi birlikte yeryüzündeki her noktanın adresini verir. Koordinatlar iki biçimde yazılır: derece-dakika-saniye (39° 55′ 12″ K) ya da ondalık derece (39,92). Dönüşüm basittir: ondalık derece = derece + dakika ÷ 60 + saniye ÷ 3.600. Bu sayfada işaretlerin anlamını, harita uygulamalarındaki gösterimi, 1 derecenin kaç kilometre ettiğini, Türkiye'nin koordinat aralığını ve grad birimini örneklerle bulacaksınız.",
  kisaCevap: [
    "Enlem 0° (ekvator) ile 90° (kutuplar) arasındadır; kuzey için K (N), güney için G (S) yazılır.",
    "Boylam 0° (Greenwich) ile 180° arasındadır; doğu için D (E), batı için B (W) yazılır.",
    "Ondalık biçimde kuzey ve doğu artı, güney ve batı eksi işaretlidir: 39,92, 32,85 Ankara civarıdır.",
    "DMS → ondalık: derece + dakika ÷ 60 + saniye ÷ 3.600; 39° 55′ 12″ = 39,92°.",
    "1 derece enlem yaklaşık 111 km'dir; 1 derece boylam ekvatorda 111,3 km, 39° enlemde yaklaşık 86,5 km'dir.",
    "Türkiye yaklaşık 36°–42° kuzey enlemleri ile 26°–45° doğu boylamları arasında yer alır."
  ],
  figure: {
    alt: "Dünya üzerinde enlem ve boylam çizgileri: ekvator 0 derece enlem, Greenwich 0 derece boylam. Sağda 39 derece 55 dakika 12 saniyenin ondalık dereceye çevrilmesi ve ondalık basamak sayısına göre hassasiyet.",
    caption: "Enlem ekvatordan kuzey-güney yönündeki açıdır, boylam başlangıç meridyeninden doğu-batı yönündeki açıdır. Sağdaki kart, derece-dakika-saniye biçimindeki bir enlemin ondalığa çevrilmesini ve ondalık basamak sayısının konum hassasiyetine etkisini gösterir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Enlem, boylam ve koordinat yazımı</text>
  <circle cx="180" cy="220" r="150" class="sf sb"/>
  <line x1="30" y1="220" x2="330" y2="220" class="sp sw" fill="none"/>
  <text x="180" y="240" class="sm mid p b">Ekvator 0°</text>
  <ellipse cx="180" cy="160" rx="138" ry="16" class="st dash" fill="none"/>
  <text x="330" y="160" class="sm">40° K</text>
  <ellipse cx="180" cy="280" rx="138" ry="16" class="st dash" fill="none"/>
  <text x="330" y="284" class="sm">40° G</text>
  <ellipse cx="180" cy="220" rx="18" ry="150" class="sok sw" fill="none"/>
  <text x="180" y="62" class="sm mid ok b">Greenwich 0°</text>
  <ellipse cx="180" cy="220" rx="90" ry="150" class="st dash" fill="none"/>
  <text x="270" y="110" class="sm">D (+)</text><text x="62" y="110" class="sm">B (−)</text>
  <circle cx="238" cy="160" r="6" class="p"/>
  <text x="246" y="150" class="sm b">Ankara</text>
  <text x="180" y="400" class="sm mid mu">K ve D artı, G ve B eksi</text>
  <rect x="380" y="56" width="320" height="170" rx="10" class="sf sb"/>
  <text x="396" y="82" class="b">DMS → ondalık derece</text>
  <text x="396" y="112" class="lg b">39° 55′ 12″ K</text>
  <text x="396" y="140" class="sm">= 39 + 55 ÷ 60 + 12 ÷ 3.600</text>
  <text x="396" y="164" class="sm">= 39 + 0,91667 + 0,00333</text>
  <rect x="390" y="176" width="300" height="38" rx="6" class="ps"/>
  <text x="540" y="201" class="lg b mid p">= 39,92000°</text>
  <rect x="380" y="240" width="320" height="164" rx="10" class="sf sb"/>
  <text x="396" y="266" class="b">Ondalık basamak ve hassasiyet</text>
  <g class="sm">
    <text x="396" y="294">2 basamak (0,01°)</text><text x="684" y="294" class="end">≈ 1,1 km</text>
    <text x="396" y="320">3 basamak (0,001°)</text><text x="684" y="320" class="end">≈ 111 m</text>
    <text x="396" y="346">4 basamak (0,0001°)</text><text x="684" y="346" class="end">≈ 11 m</text>
    <text x="396" y="372" class="b">5 basamak (0,00001°)</text><text x="684" y="372" class="end b">≈ 1,1 m</text>
  </g>
  <text x="396" y="396" class="sm mu">Enlem yönünde; boylamda cos(enlem) ile küçülür</text>
</svg>`
  },
  sections: [
    {
      h: "Enlem ve boylam nedir?",
      p: [
        "Yeryüzündeki bir noktanın yerini tarif etmek için Dünya'nın merkezinden ölçülen iki açı kullanılır. <strong>Enlem</strong> (latitude), noktanın ekvator düzleminden ne kadar yukarıda ya da aşağıda olduğunu gösterir. Ekvator 0°, Kuzey Kutbu 90° K, Güney Kutbu 90° G'dir. Aynı enleme sahip noktaları birleştiren çizgilere <strong>paralel</strong> denir; paraleller birbirine paraleldir ve kutuplara yaklaştıkça küçülen daireler oluşturur.",
        "<strong>Boylam</strong> (longitude), noktanın başlangıç meridyeninden ne kadar doğuda ya da batıda olduğunu gösterir. 1884'teki uluslararası konferanstan beri başlangıç meridyeni olarak Londra'daki Greenwich Gözlemevi'nden geçen meridyen kabul edilir. Boylam 0° ile 180° D ya da 180° B arasında değişir; 180° meridyeni Pasifik Okyanusu'ndan geçer. Aynı boylamdaki noktaları birleştiren yarım dairelere <strong>meridyen</strong> denir ve hepsi kutuplarda birleşir.",
        "Enlem ve boylam birlikte, adres gibi her noktaya eşsiz bir konum verir. GPS cihazları, harita uygulamaları, tapu ve kadastro kayıtları, deprem bildirimleri ve deniz-hava seyrüseferi bu sistemle çalışır."
      ]
    },
    {
      h: "Koordinat yazım biçimleri: DMS, DM ve ondalık derece",
      p: [
        "Aynı koordinat üç farklı biçimde yazılabilir. Hepsi aynı açıyı anlatır; fark yalnızca derecenin kesirli kısmının nasıl ifade edildiğindedir. Bir derece 60 dakikaya (′), bir dakika 60 saniyeye (″) bölünür; bu, saatin bölümlenmesiyle aynı altmışlık mantıktır."
      ],
      table: {
        head: ["Biçim", "Örnek (Ankara civarı)", "Nerede kullanılır?"],
        rows: [
          ["Derece-dakika-saniye (DMS)", "39° 55′ 15″ K, 32° 51′ 15″ D", "Atlaslar, ders kitapları, tapu belgeleri"],
          ["Derece-ondalık dakika (DM)", "39° 55,25′ K, 32° 51,25′ D", "Denizcilik, havacılık, bazı GPS cihazları"],
          ["Ondalık derece (DD)", "39,92083, 32,85417", "Harita uygulamaları, yazılımlar, veri dosyaları"]
        ],
        caption: "Örnek koordinatlar yuvarlanmış yaklaşık değerlerdir."
      },
      after: [
        "Ondalık biçimde harf yerine işaret kullanılır: kuzey enlemi ve doğu boylamı artı (+), güney enlemi ve batı boylamı eksi (−) yazılır. Sıra her zaman önce enlem, sonra boylamdır. Bu sırayı karıştırmak, Türkiye'deki bir noktayı Somali açıklarına ya da Antarktika'ya taşıyabilir."
      ]
    },
    {
      h: "Derece-dakika-saniye ondalığa nasıl çevrilir?",
      formula: "Ondalık derece = derece + dakika ÷ 60 + saniye ÷ 3.600\nG ve B için sonucun önüne eksi işareti konur",
      ol: [
        "Örnek: 39° 55′ 12″ K.",
        "Dakikayı 60'a bölün: 55 ÷ 60 = 0,916667.",
        "Saniyeyi 3.600'e bölün: 12 ÷ 3.600 = 0,003333.",
        "Topla: 39 + 0,916667 + 0,003333 = <strong>39,92°</strong>. Kuzey olduğu için işaret artıdır."
      ],
      after: [
        "Ters yönde, yani ondalık dereceden DMS'ye çevirmek için tam kısım derecedir; kalan kesir 60 ile çarpılıp tam kısmı dakika olarak alınır; yeniden kalan kesir 60 ile çarpılıp saniye bulunur. Örnek: 32,85411° → 32° ve 0,85411 × 60 = 51,2466′ → 51′ ve 0,2466 × 60 ≈ 14,80″. Sonuç: 32° 51′ 14,80″ D. Bu işlemleri [[arac:dms-ondalik-derece-cevir|Derece Dakika Saniye – Ondalık Derece Çevirici]] ile iki yönde yapabilirsiniz. Saat ve dakika için aynı mantıkla yapılan dönüşüm [[bilgi:ondalik-saat-dakikaya-cevirme|ondalık saati dakikaya çevirme]] yazısında anlatılıyor."
      ]
    },
    {
      h: "Harita uygulamalarında koordinat nasıl gösterilir?",
      p: [
        "Yaygın harita uygulamalarında haritada bir noktaya uzun basıldığında ya da sağ tıklandığında koordinat genellikle ondalık derece olarak, \"39.92077, 32.85411\" gibi gösterilir. Uygulamalar İngilizce yazım geleneğiyle ondalık ayırıcı olarak nokta, iki değer arasında virgül kullanır; Türkçe metinlerde ise ondalık virgül yazıldığı için karışıklık olmaması adına iki değerin arasına noktalı virgül ya da boşluk koymak daha anlaşılırdır.",
        "Bu uygulamaların arama kutusuna DMS biçiminde (39°55'15\"N 32°51'15\"E) ya da ondalık biçimde koordinat yazarak doğrudan o noktaya gidebilirsiniz. Koordinatı bir mesajla paylaşırken ondalık biçim en az hataya yol açar. QR kodla konum paylaşmak isterseniz konum QR kodu da aynı ondalık değerleri kullanır."
      ]
    },
    {
      h: "Kuzey-güney ve doğu-batı işaretleri nasıl yazılır?",
      table: {
        head: ["Yarıküre", "Harf (TR / EN)", "Ondalık işaret", "Örnek"],
        rows: [
          ["Kuzey enlemi", "K / N", "+", "41,01 (İstanbul)"],
          ["Güney enlemi", "G / S", "−", "−33,87 (Sidney)"],
          ["Doğu boylamı", "D / E", "+", "28,98 (İstanbul)"],
          ["Batı boylamı", "B / W", "−", "−74,01 (New York)"]
        ]
      },
      after: [
        "Harfli yazımda işaret kullanılmaz; harf yönü zaten belirtir. \"−39° K\" gibi hem eksi hem harf içeren yazımlar çelişkilidir ve kaçınılmalıdır. Türkçe belgelerde K/G/D/B, uluslararası belgelerde N/S/E/W harfleri kullanılır; özellikle \"D\" (doğu) ile İngilizce bir belgede görülebilecek başka kısaltmaları karıştırmamaya dikkat edin."
      ]
    },
    {
      h: "1 derece enlem ve boylam kaç km eder?",
      p: [
        "Meridyenler boyunca paraleller arasındaki uzaklık hemen hemen sabittir: 1 derece enlem yaklaşık <strong>111 km</strong>'dir (Dünya hafif basık olduğu için ekvatorda yaklaşık 110,6 km, kutuplarda 111,7 km). 1 dakika enlem yaklaşık 1,85 km'dir; bu, deniz milinin tanımıdır. 1 saniye enlem yaklaşık 31 metredir.",
        "Boylamda durum farklıdır, çünkü meridyenler kutuplara doğru birbirine yaklaşır. 1 derece boylamın uzunluğu yaklaşık 111,32 × cos(enlem) km'dir. Ekvatorda 111,3 km olan bu değer, Türkiye'nin enlemlerinde belirgin biçimde küçülür."
      ],
      table: {
        head: ["Enlem", "1° boylam ≈", "Örnek yer"],
        rows: [
          ["0°", "111,3 km", "Ekvator"],
          ["36° K", "90,1 km", "Türkiye'nin güney kıyıları"],
          ["39° K", "86,5 km", "İç Anadolu"],
          ["42° K", "82,7 km", "Karadeniz kıyıları"],
          ["60° K", "55,7 km", "İskandinavya"],
          ["90° K", "0 km", "Kuzey Kutbu"]
        ],
        caption: "Değerler küre yaklaşımıyla hesaplanmıştır; hassas ölçmede elipsoit formülleri kullanılır."
      },
      after: [
        "Bu fark, boylam farkından mesafe hesaplarken neden enlemin de hesaba katılması gerektiğini açıklar. Uzak noktalar arasındaki gerçek en kısa mesafe ise büyük daire formülüyle bulunur; uygulamalı bir örnek [[bilgi:kible-yonu-nasil-bulunur|kıble yönü nasıl bulunur]] yazısında, Dünya'nın eğriliğinin görüşe etkisi [[bilgi:ufuk-ne-kadar-uzakta-dunyanin-egriligi|ufuk mesafesi]] yazısında anlatılıyor."
      ]
    },
    {
      h: "Türkiye hangi enlem ve boylamlar arasındadır?",
      p: [
        "Türkiye yaklaşık olarak <strong>36°–42° kuzey enlemleri</strong> ile <strong>26°–45° doğu boylamları</strong> arasında yer alır. Kuzey yarıküre ve doğu yarıküredeki bu konum, Türkiye'nin orta kuşakta bulunmasını ve dört mevsimin belirgin yaşanmasını açıklar.",
        "Boylam farkı yaklaşık 19 derecedir. Dünya 24 saatte 360 derece döndüğü için her 1 derece boylam 4 dakikalık yerel saat farkı yaratır; Türkiye'nin en doğusu ile en batısı arasında güneşin doğuş zamanı yaklaşık 76 dakika fark eder. Ülke tek bir saat dilimi (UTC+3) kullandığı için doğu illerinde güneş daha erken doğar, batı illerinde daha geç batar.",
        "Enlem farkı yaklaşık 6 derecedir; bu da kuzey ile güney sınırı arasında yaklaşık 6 × 111 ≈ 666 km'lik bir uzaklığa karşılık gelir. Bu bilgiler 9. sınıf coğrafya dersinin \"matematik konum\" konusunun temelidir."
      ]
    },
    {
      h: "Grad (gon) ölçü birimi nedir, nerede kullanılır?",
      p: [
        "Grad ya da gon, tam çemberi 360 yerine <strong>400 eşit parçaya</strong> bölen bir açı birimidir. Böylece dik açı tam 100 grad olur ve ondalık sistemle hesap kolaylaşır. 1 grad = 0,9°, 1° ≈ 1,1111 grad'dır.",
        "Grad, Türkiye'de ve birçok Avrupa ülkesinde ölçme ve haritacılık işlerinde, total station gibi ölçme aletlerinde ve bazı eski kadastro kayıtlarında kullanılır. Hesap makinelerindeki DEG, RAD ve GRAD tuşları bu üç birimi seçer; yanlış modda yapılan trigonometri hesabı tamamen yanlış sonuç verir. Dönüşüm için [[arac:derece-grad-cevir|Derece Grad Çevirici]] DMS ve radyan karşılıklarını da gösterir."
      ],
      table: {
        head: ["Açı", "Derece", "Grad", "Radyan"],
        rows: [
          ["Tam çember", "360°", "400 grad", "2π ≈ 6,2832"],
          ["Dik açı", "90°", "100 grad", "π/2 ≈ 1,5708"],
          ["Yarım dik açı", "45°", "50 grad", "π/4 ≈ 0,7854"],
          ["1 grad", "0,9°", "1 grad", "≈ 0,0157"]
        ]
      }
    },
    {
      h: "Koordinattaki ondalık basamak sayısı hassasiyeti nasıl etkiler?",
      p: [
        "Ondalık dereceyle yazılan bir koordinatta her basamak, konumu yaklaşık 10 kat daha hassas belirtir. 0,00001° enlem yaklaşık 1,1 metreye karşılık gelir. Günlük kullanım için 5 basamak, yani metre düzeyi hassasiyet yeterlidir; bir evin kapısını ya da bir park yerini gösterir."
      ],
      ul: [
        "<strong>2 basamak (≈ 1,1 km):</strong> Şehir ya da ilçe düzeyi.",
        "<strong>3 basamak (≈ 111 m):</strong> Mahalle ya da büyük bir yapı.",
        "<strong>4 basamak (≈ 11 m):</strong> Bina, arsa.",
        "<strong>5 basamak (≈ 1,1 m):</strong> Kapı, ağaç, araç park yeri.",
        "<strong>6 ve üstü (≈ 11 cm ve daha az):</strong> Mühendislik ölçmeleri; sıradan telefon GPS'i bu hassasiyeti vermez."
      ],
      after: [
        "Telefon GPS'inin tipik doğruluğu açık alanda birkaç metredir; bu yüzden 7–8 basamaklı koordinatlar yanıltıcı bir hassasiyet izlenimi verir. Koordinatı paylaşırken 5–6 basamak hem yeterli hem dürüsttür. Fotoğraflarınızın içinde bu hassasiyette konum bilgisi saklanıyor olabilir; paylaşmadan önce [[bilgi:fotograftaki-konum-bilgisi-nasil-silinir|fotoğraftaki konum bilgisini silmek]] isteyebilirsiniz."
      ]
    }
  ],
  faq: [
    ["Enlem ve boylam nedir?", "Enlem, bir noktanın ekvatorun ne kadar kuzeyinde ya da güneyinde olduğunu; boylam ise başlangıç meridyeninin ne kadar doğusunda ya da batısında olduğunu gösteren açıdır. İkisi birlikte yeryüzündeki her noktanın konumunu belirler."],
    ["Derece-dakika-saniye koordinatı ondalığa nasıl çevrilir?", "Ondalık derece, derece artı dakikanın 60'a bölümü artı saniyenin 3.600'e bölümüdür. Örneğin 39° 55′ 12″ = 39 + 0,9167 + 0,0033 = 39,92 derece eder; güney ve batı için sonuç eksi yazılır."],
    ["Google Haritalar'da koordinat hangi biçimde gösterilir?", "Yaygın harita uygulamaları koordinatı genellikle ondalık derece olarak, önce enlem sonra boylam olmak üzere 39.92077, 32.85411 gibi gösterir. Arama kutusuna hem ondalık hem derece-dakika-saniye biçiminde koordinat yazılabilir."],
    ["Kuzey-güney ve doğu-batı işaretleri nasıl yazılır?", "Harfli yazımda kuzey K (N), güney G (S), doğu D (E), batı B (W) ile gösterilir. Ondalık yazımda kuzey ve doğu artı, güney ve batı eksi işaretlidir; harf ve eksi işareti birlikte kullanılmaz."],
    ["1 derece enlem kaç km eder?", "1 derece enlem yaklaşık 111 kilometredir; ekvatorda 110,6, kutuplarda 111,7 km civarındadır. 1 dakika enlem yaklaşık 1,85 km, 1 saniye enlem yaklaşık 31 metredir."],
    ["Türkiye hangi enlem ve boylamlar arasındadır?", "Türkiye yaklaşık 36° ile 42° kuzey enlemleri ve 26° ile 45° doğu boylamları arasındadır. Boylam farkı yaklaşık 19 derece olduğu için doğu ile batı arasında yerel saat farkı yaklaşık 76 dakikadır."],
    ["Grad (gon) ölçü birimi nedir, nerede kullanılır?", "Grad, tam çemberi 400 parçaya bölen açı birimidir; dik açı 100 grad, 1 grad 0,9 derecedir. Ölçme ve haritacılık işlerinde, ölçme aletlerinde ve bazı kadastro kayıtlarında kullanılır."],
    ["Koordinattaki ondalık basamak sayısı hassasiyeti nasıl etkiler?", "Her ondalık basamak konumu yaklaşık 10 kat daha hassas belirtir. 4 basamak yaklaşık 11 metre, 5 basamak yaklaşık 1,1 metre hassasiyet verir; günlük kullanım için 5 basamak yeterlidir."],
    ["1 derece boylam neden her yerde aynı uzunlukta değildir?", "Meridyenler kutuplarda birleştiği için kutuplara yaklaştıkça aralarındaki mesafe azalır. 1 derece boylam yaklaşık 111,32 × cos(enlem) km'dir; 39° enlemde yaklaşık 86,5 km, kutupta sıfırdır."]
  ],
  tools: ["dms-ondalik-derece-cevir", "derece-grad-cevir", "kible-yonu-bul"],
  related: ["kible-yonu-nasil-bulunur", "deniz-mili-kac-km-knot-nedir", "ufuk-ne-kadar-uzakta-dunyanin-egriligi"],
  sources: [
    ["MEB – Ortaöğretim Coğrafya dersi öğretim programı", "https://www.meb.gov.tr/"],
    ["Harita Genel Müdürlüğü", "https://www.harita.gov.tr/"]
  ]
};
