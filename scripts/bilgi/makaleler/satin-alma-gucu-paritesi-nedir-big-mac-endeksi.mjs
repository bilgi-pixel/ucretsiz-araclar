export default {
  slug: "satin-alma-gucu-paritesi-nedir-big-mac-endeksi",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "Satın Alma Gücü Paritesi Nedir? Big Mac Endeksi ve Gerçek Alım Gücü",
  pageTitle: "Satın Alma Gücü Paritesi (SGP) Nedir? Big Mac Endeksi Mantığı",
  description: "Satın alma gücü paritesi, aynı mal sepetinin iki ülkede aynı fiyata gelmesini sağlayan kurdur. Hamburger endeksi, reel ücret ve ülkeler arası maaş karşılaştırması.",
  keywords: ["satın alma gücü paritesi", "big mac endeksi", "alım gücü nedir", "ppp nedir", "sgp kuru", "reel ücret nasıl hesaplanır", "ülkeler arası maaş karşılaştırma", "paranın aşırı değerli olması"],
  lead: "Satın alma gücü paritesi (SGP), aynı mal ve hizmet sepetinin iki ülkede aynı miktar paraya alınabilmesini sağlayacak <strong>teorik döviz kurudur</strong>: bir sepet Türkiye'de 25.000 TL, başka bir ülkede 1.000 dolarsa SGP kuru 25 TL'dir. Piyasa kuru bundan yüksekse yerel para görece ucuz sayılır. \"Big Mac endeksi\" bu fikri tek bir standart hamburgerin fiyatıyla anlatan basit bir göstergedir. Bu sayfada SGP'yi, hamburger endeksinin hesabını, reel ücreti ve maaşları ülkeler arasında karşılaştırmayı örneklerle anlatıyoruz.",
  kisaCevap: [
    "SGP kuru = yerel paradaki sepet fiyatı ÷ referans ülke parasındaki sepet fiyatı.",
    "Değerleme farkı = SGP kuru ÷ piyasa kuru − 1; sonuç negatifse yerel para piyasada SGP'ye göre ucuz (düşük değerli) sayılır.",
    "Hamburger endeksi tek ürünle yapılan basit bir SGP hesabıdır; geniş sepetli resmî SGP verileri uluslararası kuruluşlarca derlenir.",
    "Reel ücret = nominal ücret ÷ (1 + aynı dönemdeki enflasyon); maaş artışı enflasyonun altındaysa alım gücü düşer.",
    "Ülkeler arası maaş karşılaştırmasında piyasa kuru yerine SGP dönüşüm faktörü kullanmak yaşam maliyeti farkını hesaba katar."
  ],
  figure: {
    alt: "Hamburger endeksi örneği: hamburger Türkiye'de 250 TL, referans ülkede 6 dolar; SGP kuru 41,67 TL. Piyasa kuru 45 TL olduğunda Türk lirası yüzde 7,4 düşük değerli görünür.",
    caption: "Tek ürünle yapılan bu hesap öğretici bir yaklaşımdır. Örnek fiyatlar ve kur varsayımsaldır; resmî SGP verileri yüzlerce mal ve hizmetten oluşan sepetlerle hesaplanır.",
    svg: `<svg viewBox="0 0 720 390" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Hamburger endeksi: tek ürünle SGP</text>
  <rect x="40" y="60" width="270" height="90" rx="10" class="sf sb"/>
  <text x="175" y="90" class="b mid">Türkiye fiyatı</text><text x="175" y="126" class="xl mid">250 TL</text>
  <rect x="410" y="60" width="270" height="90" rx="10" class="sf sb"/>
  <text x="545" y="90" class="b mid">Referans ülke fiyatı</text><text x="545" y="126" class="xl mid">6 dolar</text>
  <text x="360" y="112" class="lg mid b">÷</text>
  <rect x="190" y="172" width="340" height="56" rx="10" class="p"/>
  <text x="360" y="206" class="b mid sf">SGP kuru = 250 ÷ 6 = 41,67 TL</text>
  <text x="60" y="262" class="b">Piyasa kuru (örnek) 45 TL</text>
  <rect x="60" y="272" width="600" height="22" class="ps"/>
  <text x="60" y="318" class="b">SGP kuru 41,67 TL</text>
  <rect x="60" y="326" width="556" height="22" class="oks"/>
  <text x="360" y="376" class="mid">41,67 ÷ 45 − 1 = <tspan class="b dg">−%7,4</tspan> · lira SGP'ye göre ucuz görünür</text>
</svg>`
  },
  sections: [
    {
      h: "Satın alma gücü paritesi (SGP) nedir?",
      p: [
        "Satın alma gücü paritesi, iktisattaki \"tek fiyat yasası\" fikrine dayanır: ticaret serbestse ve taşıma maliyeti yoksa, aynı malın farklı ülkelerde aynı para birimiyle ifade edildiğinde aynı fiyata satılması beklenir. Aksi hâlde ucuz olduğu yerden alınıp pahalı olduğu yerde satılır ve fiyatlar zamanla eşitlenir. SGP, bu eşitliği sağlayacak kur düzeyidir.",
        "Gerçek hayatta bu eşitlik tam olarak kurulmaz. Kira, berber, restoran hizmeti gibi ticareti yapılamayan kalemler, vergiler, gümrükler, ücret düzeyi farkları ve rekabet koşulları fiyatları ülkeden ülkeye farklılaştırır. Bu yüzden SGP bir \"olması gereken kur\" tahmini değil, bir <strong>karşılaştırma ölçüsü</strong> olarak kullanılır: farklı ülkelerdeki gelirleri ve üretimi, yaşam maliyeti farkından arındırarak karşılaştırmaya yarar.",
        "Uluslararası kuruluşlar SGP'yi geniş mal ve hizmet sepetleriyle hesaplar ve kişi başına gelir gibi göstergeleri \"SGP'ye göre\" yayımlar. Bu verilerde kullanılan ortak ölçü birimine genellikle \"uluslararası dolar\" denir."
      ]
    },
    {
      h: "Big Mac (hamburger) endeksi nasıl hesaplanır?",
      p: [
        "Hamburger endeksi, 1986'da bir ekonomi dergisinin SGP'yi okuyucularına anlaşılır kılmak için başlattığı, yarı şaka yarı ciddi bir göstergedir. Sepet yerine dünyanın pek çok ülkesinde aynı tarifle satılan standart bir hamburger kullanılır. Hesap üç adımdır."
      ],
      formula: "1) SGP kuru = yerel fiyat ÷ referans ülke fiyatı\n2) Piyasa kuruyla çevrilmiş fiyat = yerel fiyat ÷ piyasa kuru\n3) Değerleme farkı = SGP kuru ÷ piyasa kuru − 1",
      ol: [
        "Hamburger Türkiye'de 250 TL, referans ülkede 6 dolar olsun (örnek fiyatlar).",
        "SGP kuru: 250 ÷ 6 = 41,67 TL. Bu kurda hamburger iki ülkede aynı fiyata gelirdi.",
        "Piyasa kuru 45 TL ise hamburger Türkiye'de 250 ÷ 45 = 5,56 dolara denk gelir; referans ülkeden ucuzdur.",
        "Değerleme farkı: 41,67 ÷ 45 − 1 = −%7,4. Endeks mantığına göre lira, bu ürün açısından yaklaşık %7 düşük değerli görünür."
      ],
      after: [
        "Endeksin güçlü yanı basitliğidir: ürünün içeriği her yerde aynıdır ve fiyatı kolayca bulunur. Zayıf yanı ise tek bir ürünün fiyatında kira, işçilik ve yerel vergilerin büyük pay tutmasıdır. Ücretlerin düşük olduğu ülkelerde hizmet içeriği yüksek ürünler doğal olarak ucuzdur; bu yüzden gelişmekte olan ülkelerin paraları bu endekste neredeyse her zaman \"ucuz\" görünür. Bu nedenle endeks bir yatırım ya da kur tahmini aracı olarak kullanılmamalıdır."
      ]
    },
    {
      h: "Bir para biriminin aşırı değerli ya da ucuz olduğu nasıl anlaşılır?",
      p: [
        "SGP kuru piyasa kurundan düşükse, yerel para piyasada SGP'nin söylediğinden daha az değerlidir; yani yabancı bir ziyaretçi için ülke ucuzdur. SGP kuru piyasa kurundan yüksekse yerel para aşırı değerlidir; ülke dışarıdan gelen için pahalıdır."
      ],
      table: {
        head: ["Durum", "Hesap", "Yorum"],
        rows: [
          ["SGP kuru 41,67 · piyasa 45", "41,67 ÷ 45 − 1 = −%7,4", "Yerel para düşük değerli, ülke yabancıya ucuz"],
          ["SGP kuru 41,67 · piyasa 41,67", "%0", "Parite tutuyor"],
          ["SGP kuru 41,67 · piyasa 38", "41,67 ÷ 38 − 1 = +%9,7", "Yerel para aşırı değerli, ülke yabancıya pahalı"]
        ],
        caption: "Değerler örnektir. Sapmanın uzun yıllar sürmesi olağandır; SGP kısa vadede kurun nereye gideceğini söylemez."
      },
      after: [
        "Uzun dönemde yüksek enflasyonlu ülkelerin para birimleri, düşük enflasyonlu ülkelere karşı değer kaybetme eğilimindedir; bu \"göreli SGP\" fikridir. Örneğin bir yılda yurt içi enflasyon %30, referans ülkede %3 ise, reel kurun sabit kalması için kurun yaklaşık 1,30 ÷ 1,03 − 1 = %26 artması gerekir. Kur bundan az artarsa yerel para reel olarak değer kazanmış olur."
      ]
    },
    {
      h: "Döviz kuru ile SGP kuru neden farklıdır?",
      ul: [
        "<strong>Ticareti yapılamayan hizmetler:</strong> Kira, eğitim, sağlık, kişisel hizmetler ülke içinde üretilip tüketilir; fiyatları yerel ücretlerle belirlenir.",
        "<strong>Sermaye akımları:</strong> Piyasa kuru yalnızca mal ticaretine değil, faiz farkına, yatırımcı güvenine ve sermaye hareketlerine de tepki verir.",
        "<strong>Vergiler ve düzenlemeler:</strong> KDV, ÖTV, gümrük vergileri ve fiyat düzenlemeleri aynı malın fiyatını ülkeler arasında farklılaştırır.",
        "<strong>Verimlilik farkı:</strong> Verimliliği yüksek ülkelerde ücretler ve dolayısıyla hizmet fiyatları yüksektir; bu da SGP kurunu piyasa kurundan uzaklaştırır.",
        "<strong>Beklentiler:</strong> Kur, gelecekteki enflasyon ve politika beklentilerini bugünden fiyatlar; SGP ise geçmişte gerçekleşmiş fiyatlardan hesaplanır."
      ]
    },
    {
      h: "Nominal ve reel ücret: enflasyon alım gücünü nasıl eritir?",
      p: [
        "SGP ülkeler arasındaki alım gücünü, enflasyon ise bir ülke içinde zaman içindeki alım gücünü anlatır. Maaşınızın TL olarak artması (nominal artış), aynı dönemde fiyatlar daha hızlı arttıysa daha fazla şey alabileceğiniz anlamına gelmez. Asıl ölçü <strong>reel ücret</strong>tir: maaşın, fiyatlar genel düzeyindeki değişimden arındırılmış hâli."
      ],
      formula: "Reel ücret (eski yılın fiyatlarıyla) = bugünkü ücret ÷ (1 + dönemin toplam enflasyonu)\nReel değişim = (1 + nominal artış) ÷ (1 + enflasyon) − 1\nÖrnek: (1 + 0,50) ÷ (1 + 0,60) − 1 = −%6,25",
      after: [
        "Örnek: Maaşı 2024 başında 30.000 TL olan biri 2026 başında 45.000 TL alıyor olsun; nominal artış %50'dir. Aynı iki yılda tüketici fiyatlarının toplam %60 arttığını varsayalım. Reel ücret 45.000 ÷ 1,60 = 28.125 TL'dir; yani 2024 fiyatlarıyla bakıldığında maaş 30.000 TL'den 28.125 TL'ye inmiş, alım gücü %6,25 azalmıştır.",
        "Kendi maaşınızın alım gücünü TÜİK'in tüketici fiyat endeksiyle hesaplamak için [[arac:enflasyon-hesapla|Enflasyon Hesaplama]] aracını, belirli bir enflasyon oranıyla paranızın gelecekte ne kadar eriyeceğini görmek için [[arac:satin-alma-gucu-hesapla|Satın Alma Gücü Hesaplama]] aracını kullanabilirsiniz. Konunun ayrıntısı [[bilgi:enflasyona-gore-paranin-degeri|enflasyona göre paranın değeri]] yazısındadır."
      ]
    },
    {
      h: "Maaşın eski yıllara göre alım gücü nasıl hesaplanır?",
      ol: [
        "Karşılaştıracağınız iki tarihi seçin: örneğin eski maaşınızı aldığınız ay ve bugün.",
        "TÜİK'in tüketici fiyat endeksinden (TÜFE) iki ayın endeks değerini bulun.",
        "Eski maaşı bugünün fiyatlarına taşıyın: eski maaş × (bugünkü endeks ÷ eski endeks).",
        "Bulduğunuz tutarı bugünkü maaşınızla karşılaştırın. Bugünkü maaş daha yüksekse alım gücünüz artmış, düşükse azalmıştır.",
        "Hesabı aylık ya da yıllık ortalama endeksle değil, aynı ayların endeksiyle yapın; mevsimsel farklar sonucu saptırmasın."
      ],
      after: [
        "Bu yöntem genel fiyat düzeyini esas alır. Harcamanızın büyük kısmı kira ya da gıda gibi enflasyonun ortalamadan hızlı arttığı kalemlere gidiyorsa, kişisel alım gücü kaybınız resmî ortalamadan büyük olabilir. Faiz ve getiriyi de enflasyondan arındırmak için [[bilgi:reel-faiz-nedir-nasil-hesaplanir|reel faiz]] yazımıza bakabilirsiniz."
      ]
    },
    {
      h: "Maaşlar ülkeler arasında SGP ile nasıl karşılaştırılır?",
      p: [
        "Yurt dışındaki bir maaşı piyasa kuruyla TL'ye çevirmek, o paranın orada ne alacağını göstermez. Daha doğru karşılaştırma, her iki maaşı da kendi ülkesinin <strong>SGP dönüşüm faktörüne</strong> bölerek ortak bir birime (uluslararası dolar) çevirmektir. SGP dönüşüm faktörü, bir uluslararası doların o ülkede satın alabildiği sepetin yerel para cinsinden fiyatıdır ve uluslararası kuruluşların veri tabanlarında yayımlanır."
      ],
      table: {
        head: ["", "Türkiye", "Örnek ülke"],
        rows: [
          ["Aylık net maaş", "60.000 TL", "3.500 avro"],
          ["Piyasa kuruyla dolar (örnek kur)", "60.000 ÷ 45 = 1.333 $", "3.500 × 1,10 = 3.850 $"],
          ["SGP dönüşüm faktörü (örnek)", "15 TL", "0,75 avro"],
          ["SGP'ye göre uluslararası dolar", "60.000 ÷ 15 = 4.000", "3.500 ÷ 0,75 = 4.667"],
          ["Oran (örnek ülke ÷ Türkiye)", "Piyasa kuruyla 2,9 kat", "SGP ile 1,17 kat"]
        ],
        caption: "Tüm değerler örnektir; güncel SGP dönüşüm faktörlerini uluslararası kuruluşların resmî veri tabanlarından alın."
      },
      after: [
        "Örnekte piyasa kuruyla yurt dışı maaş neredeyse üç kat görünürken, yaşam maliyeti hesaba katıldığında fark %17'ye iner. Taşınma kararı verirken bu genel ölçüye ek olarak kira, vergi ve sosyal güvenlik kesintileri, sağlık ve eğitim masrafları ile tasarrufunuzu hangi para biriminde tutacağınız ayrıca değerlendirilmelidir. Döviz cinsinden birikimlerin kur değişimiyle değerini görmek için [[arac:doviz-kar-zarar-hesapla|Döviz Kâr-Zarar Hesaplama]] aracı kullanılabilir."
      ]
    },
    {
      h: "Yurt dışı yaşam maliyeti karşılaştırmasında nelere dikkat edilir?",
      ul: [
        "<strong>Kendi sepetinizi kullanın:</strong> Ülke ortalaması bir ailenin, öğrencinin ya da emeklinin harcama yapısını yansıtmayabilir; kira ve ulaşım payınızı ayrıca hesaplayın.",
        "<strong>Brüt değil net maaşı karşılaştırın:</strong> Vergi ve sosyal güvenlik kesintileri ülkeler arasında çok farklıdır.",
        "<strong>Şehir farkı:</strong> Aynı ülkede başkent ile küçük bir şehrin yaşam maliyeti arasındaki fark, iki ülke arasındaki farktan büyük olabilir.",
        "<strong>Kamu hizmetleri:</strong> Ücretsiz ya da düşük ücretli sağlık, eğitim ve kreş hizmetleri harcanabilir geliri önemli ölçüde değiştirir.",
        "<strong>Veri tarihi:</strong> Yüksek enflasyonlu dönemlerde birkaç ay önceki fiyat bile eskimiş olabilir; karşılaştırmayı aynı tarihli verilerle yapın."
      ],
      note: "Bu sayfa kavramı anlatmak içindir; döviz alım satımı ya da yatırım kararı için öneri değildir."
    }
  ],
  faq: [
    ["Satın alma gücü paritesi (SGP) nedir?", "Aynı mal ve hizmet sepetinin iki ülkede aynı miktar paraya alınabilmesini sağlayacak teorik döviz kurudur. Gelirleri ve üretimi yaşam maliyeti farkından arındırarak ülkeler arasında karşılaştırmak için kullanılır; kısa vadeli kur tahmini aracı değildir."],
    ["Big Mac endeksi nasıl hesaplanır?", "Standart bir hamburgerin yerel fiyatı referans ülkedeki fiyatına bölünerek SGP kuru bulunur. Bu kur piyasa kuruna bölünüp birden çıkarıldığında değerleme farkı elde edilir. 250 TL ve 6 dolar fiyatla SGP kuru 41,67 TL'dir."],
    ["Bir para biriminin aşırı değerli veya ucuz olduğu nasıl anlaşılır?", "SGP kuru piyasa kurundan düşükse yerel para düşük değerli, yüksekse aşırı değerli sayılır. 41,67 TL SGP kuru ve 45 TL piyasa kurunda fark yüzde eksi 7,4'tür; ülke yabancı ziyaretçiye ucuz görünür."],
    ["Maaşların ülkeler arasında karşılaştırılmasında SGP neden kullanılır?", "Piyasa kuru, paranın o ülkede ne satın aldığını göstermez. SGP dönüşüm faktörü yaşam maliyeti farkını hesaba kattığı için, iki maaşın gerçek alım gücünü ortak bir birimde, uluslararası dolar cinsinden karşılaştırmayı sağlar."],
    ["Enflasyon alım gücünü nasıl eritir?", "Fiyatlar genel düzeyi arttıkça aynı miktar parayla daha az mal ve hizmet alınır. Maaş artışı enflasyonun altında kalırsa reel ücret düşer. Yüzde 50 maaş artışına karşılık yüzde 60 enflasyon, alım gücünde yüzde 6,25 kayıp demektir."],
    ["Maaşın eski yıllara göre alım gücü nasıl hesaplanır?", "Eski maaş, TÜİK tüketici fiyat endeksinin bugünkü değeri ile eski değerinin oranıyla çarpılarak bugünün fiyatlarına taşınır. Bulunan tutar bugünkü maaştan yüksekse alım gücü azalmış, düşükse artmıştır."],
    ["Nominal ve reel ücret arasındaki fark nedir?", "Nominal ücret, bordroda yazan para tutarıdır. Reel ücret ise bu tutarın enflasyondan arındırılmış hâlidir ve gerçekte ne kadar mal ve hizmet alınabildiğini gösterir. Reel ücret, nominal ücretin bir artı enflasyon oranına bölünmesiyle bulunur."],
    ["Döviz kuru ile SGP kuru neden farklıdır?", "Piyasa kuru sermaye akımları, faiz farkları ve beklentilerle belirlenir. SGP ise fiyatlardan hesaplanır ve kira, kişisel hizmetler gibi ticareti yapılamayan kalemlerin yerel ücretlerle fiyatlanmasını yansıtır. Bu yüzden ikisi uzun süre farklı kalabilir."],
    ["Yurt dışı yaşam maliyeti karşılaştırmasında nelere dikkat edilir?", "Net maaşları, kendi harcama sepetinizi, şehirler arası farkı, kira ve kamu hizmetlerinin maliyetini aynı tarihli verilerle karşılaştırın. Ülke ortalaması tek başına aile, öğrenci ya da emekli gibi farklı grupların durumunu yansıtmayabilir."],
    ["Hamburger endeksi kur tahmini için kullanılabilir mi?", "Hayır. Endeks tek bir ürüne dayandığı için ücret, kira ve vergi farklarından güçlü biçimde etkilenir; gelişmekte olan ülkelerin paralarını sürekli ucuz gösterir. Kavramı anlatmak için iyi bir örnektir ama yatırım ya da kur tahmini aracı değildir."]
  ],
  tools: ["satin-alma-gucu-hesapla", "enflasyon-hesapla", "doviz-kar-zarar-hesapla", "zam-orani-hesapla"],
  related: ["enflasyona-gore-paranin-degeri", "reel-faiz-nedir-nasil-hesaplanir", "maas-zammi-nasil-hesaplanir"],
  sources: [
    ["TÜİK – Tüketici fiyat endeksi", "https://www.tuik.gov.tr/"],
    ["Dünya Bankası – Uluslararası Karşılaştırma Programı", "https://www.worldbank.org/"],
    ["OECD – Satın alma gücü pariteleri", "https://www.oecd.org/"]
  ]
};
