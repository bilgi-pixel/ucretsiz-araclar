export default {
  slug: "sap-nasil-hesaplanir-kac-cm-olmali",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Şap Nasıl Hesaplanır? Şap Kalınlığı Kaç Cm, Metrekareye Kaç Torba Çimento",
  pageTitle: "Şap Hesaplama: Şap Kalınlığı Kaç Cm, m²'ye Kaç Torba Çimento",
  description: "Şap hacmi = alan × kalınlık. 5 cm şapta 1:4 karışımla m² başına yaklaşık 19 kg çimento ve 0,05 m³ kum gerekir. Kalınlık önerileri, yerden ısıtma ve kuruma süresi.",
  keywords: ["şap hesaplama", "şap kalınlığı kaç cm", "şap için kaç torba çimento", "metrekareye şap malzemesi", "şap kum çimento oranı", "yerden ısıtma şap kalınlığı", "şap kaç günde kurur", "hazır şap mı karışım mı"],
  lead: "Şap hesabı, <strong>zemin alanını şap kalınlığıyla çarpıp hacmi bulmak, bu hacmi kuru malzemeye çevirip karışım oranına göre çimento ve kuma bölmektir</strong>. Konutlarda sık uygulanan 5 cm'lik şapta 1 ölçü çimentoya 4 ölçü kum karışımıyla metrekare başına yaklaşık 19 kg çimento ve 0,05 m³ kum gerekir; 40 m²'lik bir alan için %5 fireyle yaklaşık 17 torba (50 kg) çimento ve 2,2 m³ kum eder. Şap kalınlığı için tek bir yasal ölçü yoktur; zeminin düzgünlüğü, ısı yalıtımı ve yerden ısıtma gibi etkenlere göre belirlenir. Bu yazıda hesabı adım adım, kalınlık önerilerini ve kuruma süresini anlatıyoruz.",
  kisaCevap: [
    "Şap hacmi (m³) = alan (m²) × kalınlık (m) × (1 + fire oranı); 5 cm = 0,05 m.",
    "Kuru karışım hacmi, sıkışma ve boşluklar nedeniyle yaş hacmin yaklaşık 1,3 katı alınır.",
    "1:4 (çimento:kum) karışımla 1 m³ şap için yaklaşık 380 kg çimento ve 1,06 m³ kum gerekir.",
    "5 cm şapta m² başına yaklaşık 19 kg çimento (0,38 torba) ve 0,053 m³ kum; 1:3 karışımda çimento yaklaşık 24 kg'a çıkar.",
    "Uygulamada sık önerilen kalınlıklar: zemine yapışık şap 3–5 cm, yalıtım üzerine yüzer şap en az 4,5–5 cm, yerden ısıtmada borunun üstünde en az 4,5 cm.",
    "Çimento esaslı şapın kaplamaya hazır olması kalınlığa ve havalandırmaya bağlı olarak haftalar sürebilir; kaplama öncesi nem ölçülmelidir."
  ],
  figure: {
    alt: "Zemin döşemesi üzerinde katmanlar: betonarme döşeme, ısı yalıtımı ve naylon ayırıcı, 5 cm şap ve en üstte kaplama; yanda 1 metrekare 5 cm şap için 19 kg çimento ve 0,053 metreküp kum hesabı.",
    caption: "Yüzer şap uygulamasında şap, yalıtım tabakasının üzerine ayırıcı folyo serilerek dökülür ve duvar kenarlarına ince bir dilatasyon bandı konur. Sağdaki kart 1 m², 5 cm kalınlık ve 1:4 karışım için malzeme miktarlarını gösterir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Şap kesiti ve 1 m² malzeme hesabı</text>
  <rect x="40" y="96" width="380" height="20" class="p"/>
  <text x="430" y="111" class="sm">Kaplama (parke, seramik)</text>
  <rect x="40" y="116" width="380" height="100" class="ps"/>
  <text x="230" y="172" class="b mid">Şap · 5 cm</text>
  <line x1="40" y1="216" x2="420" y2="216" class="st dash" fill="none"/>
  <rect x="40" y="218" width="380" height="40" class="oks"/>
  <text x="230" y="243" class="sm mid">Isı yalıtımı + ayırıcı folyo (yüzer şapta)</text>
  <rect x="40" y="258" width="380" height="70" class="sf sb"/>
  <text x="230" y="298" class="sm mid">Betonarme döşeme</text>
  <rect x="30" y="96" width="10" height="162" class="a"/>
  <text x="30" y="350" class="sm t2">Kenarda dilatasyon bandı</text>
  <line x1="22" y1="116" x2="22" y2="216" class="sp sw" fill="none"/>
  <text x="14" y="170" class="sm end b p">5</text>
  <rect x="470" y="80" width="230" height="290" rx="10" class="sf sb"/>
  <rect x="470" y="80" width="230" height="42" rx="10" class="p"/>
  <text x="585" y="107" class="b mid sf">1 m² · 5 cm · 1:4</text>
  <text x="488" y="150">Yaş hacim: 0,050 m³</text>
  <text x="488" y="178">Kuru hacim: × 1,33</text>
  <text x="488" y="202" class="sm t2">= 0,0665 m³</text>
  <text x="488" y="234" class="b">Çimento: 0,0665 ÷ 5</text>
  <text x="488" y="258" class="lg b p">≈ 19,2 kg</text>
  <text x="488" y="290" class="b">Kum: 0,0665 × 4 ÷ 5</text>
  <text x="488" y="314" class="lg b p">≈ 0,053 m³</text>
  <text x="488" y="346" class="sm t2">Çimento yığın yoğunluğu 1.440 kg/m³</text>
</svg>`
  },
  sections: [
    {
      h: "Şap nedir, ne işe yarar?",
      p: [
        "Şap, kaba inşaatta betonarme döşemenin ya da zemin betonunun üzerine dökülen, yüzeyi düzleyen ve kaplamaya hazırlayan ince bir harç tabakasıdır. Geleneksel şap çimento, kum ve az miktarda suyla hazırlanan yarı kuru bir karışımdır; günümüzde torbada satılan hazır şaplar ve pompayla dökülen akışkan (kendiliğinden yayılan) şaplar da yaygın olarak kullanılır.",
        "Şapın üç temel görevi vardır: döşemedeki kot farklarını gidererek parke, laminat ya da seramik için düz bir yüzey oluşturmak; yerden ısıtma borularını sarıp ısıyı yüzeye yaymak; ve ısı ile ses yalıtımı levhalarının üzerinde yük dağıtan bir katman olmak. Yanlış kalınlıkta ya da yanlış oranda hazırlanan şap çatlar, tozur ya da kaplama altında kabarmalara yol açar."
      ]
    },
    {
      h: "Şap nasıl hesaplanır? Formül",
      formula: "Yaş şap hacmi (m³) = alan (m²) × kalınlık (cm) ÷ 100 × (1 + fire ÷ 100)\nKuru karışım hacmi = yaş hacim × 1,33\nÇimento (kg) = kuru hacim ÷ (1 + n) × 1.440\nKum (m³) = kuru hacim × n ÷ (1 + n)\n(n: karışımdaki kum oranı; 1:4 için n = 4)",
      p: [
        "Kuru malzemeler suyla karıştırılıp sıkıştırıldığında hacimleri azalır; kumun taneleri arasındaki boşlukları çimento ve su doldurur. Bu yüzden 1 m³ yaş şap elde etmek için 1 m³'ten fazla kuru malzeme gerekir. Hesaplarda bu fark genellikle 1,25–1,35 arası bir katsayıyla karşılanır; burada 1,33 kullanılmıştır.",
        "Çimento torbada ağırlıkla, kum ise kamyonla hacim ya da tonla satıldığı için çimento kilograma, kum metreküpe çevrilir. Gevşek çimentonun yığın yoğunluğu yaklaşık 1.440 kg/m³, nemli kumun yaklaşık 1.500–1.700 kg/m³ alınır."
      ]
    },
    {
      h: "Çözümlü örnek: 40 m² alan, 5 cm şap",
      ol: [
        "Yaş hacim: 40 × 0,05 = 2,0 m³. %5 fireyle 2,0 × 1,05 = <strong>2,1 m³</strong>.",
        "Kuru karışım hacmi: 2,1 × 1,33 = <strong>2,793 m³</strong>.",
        "1:4 karışımda toplam 5 ölçü vardır. Çimento hacmi 2,793 ÷ 5 = 0,5586 m³; kilogram olarak 0,5586 × 1.440 ≈ <strong>804 kg</strong>.",
        "50 kg'lık torbayla 804 ÷ 50 = 16,1 → <strong>17 torba</strong> çimento (yukarı yuvarlanır).",
        "Kum: 2,793 × 4 ÷ 5 ≈ <strong>2,23 m³</strong>; yaklaşık 1,6 t/m³ ile ≈ <strong>3,6 ton</strong>.",
        "Aynı alanı 1:3 karışımla yaparsanız çimento ≈ 1.005 kg (21 torba), kum ≈ 2,09 m³ olur."
      ],
      after: [
        "Bu hesabı [[arac:sap-hesapla|Şap Hesaplama]] aracıyla yapabilirsiniz. Alanı, kalınlığı, karışım oranını (1:3, 1:4, 1:5), fire payını ve torba ağırlığını girdiğinizde araç şap hacmini, çimento kilogramını, torba sayısını, kumu metreküp ve yaklaşık ton olarak, ayrıca m² başına çimento miktarını gösterir. Yalnızca çimento torbası hesabı için [[arac:cimento-hesapla|Çimento Torbası Hesaplama]], kum ve çakıl siparişi için [[arac:kum-cakil-hesapla|Kum Çakıl Miktarı Hesaplama]] aracı da kullanılabilir."
      ]
    },
    {
      h: "1 m² şap için kaç torba çimento gerekir?",
      p: [
        "Aşağıdaki tablo farklı kalınlıklar için metrekare başına yaklaşık malzeme miktarlarını gösterir. Değerler 1:4 karışım, 1,33 kuru hacim katsayısı ve fire hariç hesaplanmıştır; kendi sipariş miktarınıza %5–10 fire ekleyin."
      ],
      table: {
        head: ["Kalınlık", "Yaş hacim (m³/m²)", "Çimento (kg/m²)", "50 kg torba/m²", "Kum (m³/m²)"],
        rows: [
          ["3 cm", "0,030", "11,5", "0,23", "0,032"],
          ["4 cm", "0,040", "15,3", "0,31", "0,043"],
          ["5 cm", "0,050", "19,2", "0,38", "0,053"],
          ["6 cm", "0,060", "23,0", "0,46", "0,064"],
          ["7 cm", "0,070", "26,8", "0,54", "0,074"],
          ["8 cm", "0,080", "30,6", "0,61", "0,085"]
        ],
        caption: "Kabaca kural: 1:4 karışımda her 1 cm kalınlık metrekare başına yaklaşık 3,8 kg çimento ister. 10 m² ve 5 cm için ≈ 192 kg, yani 4 torba."
      },
      after: [
        "Usta hesaplarında sık duyulan \"metrekareye bir torbanın üçte biri\" ifadesi bu tablonun 5 cm satırına karşılık gelir. Ancak bu değer karışım oranına, kumun nemine ve sıkıştırma kalitesine göre değişir; şantiyede ilk birkaç metrekarede gerçek tüketimi gözlemlemek en güvenilir yoldur."
      ]
    },
    {
      h: "Şapta kum–çimento oranı nedir?",
      p: [
        "Geleneksel şap için en yaygın hacim oranları 1:3 ile 1:4 arasıdır (1 ölçü çimento, 3–4 ölçü kum). Daha zengin karışım (1:3) daha dayanıklı ama daha pahalıdır ve büzülme çatlağı riski biraz artar; daha fakir karışım (1:5) maliyeti düşürür ama yüzey dayanımını zayıflatır, tozumaya yol açabilir. Metreküp başına çimento miktarı (dozaj) olarak ifade edildiğinde konut şapları için genellikle 300–400 kg/m³ aralığı kullanılır."
      ],
      ul: [
        "<strong>Kum:</strong> Temiz, kil ve toprak içermeyen, iri ve ince tanelerin dengeli olduğu dere ya da kırma kum. Çok ince ve killi kum dayanımı düşürür.",
        "<strong>Su:</strong> Yarı kuru şap \"toprak nemi\" kıvamında olmalıdır: avuçta sıkıldığında dağılmadan top olmalı ama su bırakmamalıdır. Fazla su büzülmeyi ve çatlamayı artırır.",
        "<strong>Katkılar:</strong> Lif (polipropilen) katkısı kılcal çatlakları azaltır; akışkanlaştırıcılar daha az suyla işlenebilirlik sağlar. Dozajı üretici föyüne göre ayarlayın.",
        "<strong>Donatı:</strong> Yüzer şapta ve yerden ısıtmada hasır çelik ya da lif kullanımı tasarımcının ve üreticinin önerisine göre belirlenir."
      ]
    },
    {
      h: "Şap kalınlığı kaç cm olmalı?",
      p: [
        "Türkiye'de konut şapları için tek bir yasal kalınlık değeri yoktur. Kalınlık; altındaki zeminin düzgünlüğüne, şapın zemine yapışık mı yoksa yalıtım üzerinde \"yüzer\" mi olduğuna, yerden ısıtma bulunup bulunmadığına ve kullanılacak malzemenin teknik föyüne göre seçilir. Aşağıdaki değerler uygulamada sık başvurulan öneri aralıklarıdır; projeniz için mimar, mühendis ya da şap üreticisinin teknik dokümanını esas alın."
      ],
      table: {
        head: ["Uygulama türü", "Önerilen kalınlık (yaklaşık)", "Açıklama"],
        rows: [
          ["Zemine yapışık şap", "3–5 cm", "Döşemeye aderansla bağlanır; düzgün betonda ince olabilir"],
          ["Ayırıcı folyo üzerine şap", "4–5 cm ve üzeri", "Döşemeyle bağlantısı kesilir, kendi taşır"],
          ["Yalıtım üzerine yüzer şap", "En az 4,5–5 cm", "Isı ve ses yalıtımı levhalarının üzerinde yük dağıtır"],
          ["Yerden ısıtmalı şap", "Borunun üstünde en az 4,5 cm (toplam ≈ 6,5–7 cm)", "Boru çapı eklenir; ısıl genleşme derzleri gerekir"],
          ["Akışkan (anhidrit ya da çimento esaslı) şap", "Üretici föyüne göre, genellikle daha ince", "Kendiliğinden yayılır, sıkıştırma gerekmez"]
        ],
        caption: "Kot farkı fazla olan zeminlerde şapı çok kalınlaştırmak yerine önce dolgu betonu ya da hafif dolgu yapmak hem maliyeti hem kuruma süresini azaltır."
      },
      after: [
        "Kalınlık çok ince seçilirse şap kırılgan olur ve kenarlardan kalkabilir; gereğinden kalın seçilirse kuruma süresi ve döşemeye gelen ölü yük artar. 7 cm kalınlıktaki bir şap metrekareye yaklaşık 27 kg çimento ve 140–150 kg toplam ağırlık getirir."
      ]
    },
    {
      h: "Yerden ısıtmada şap kalınlığı ne kadar olmalı?",
      p: [
        "Yerden ısıtmada şap, borulardan gelen ısıyı yüzeye eşit dağıtan ve boruları mekanik yüklerden koruyan katmandır. Uygulamada çimento esaslı şap için borunun üst yüzeyinden itibaren en az yaklaşık 4,5 cm şap kalınlığı önerilir. 17 mm çaplı bir boruda bu, yalıtım levhasının üstünden ölçüldüğünde yaklaşık 6,5 cm toplam kalınlık demektir.",
        "Şap çok ince olursa yüzeyde sıcak ve soğuk şeritler oluşur, çatlak riski artar; çok kalın olursa sistemin ısınma ve soğuma süresi uzar. Isıtmalı şaplarda genleşme derzleri (dilatasyon) oda geçişlerinde ve büyük alanlarda belirli aralıklarla bırakılır; ilk ısıtma, şap yeterince kuruduktan sonra düşük sıcaklıktan başlayarak kademeli yapılır. Bu ayrıntılar ısıtma sistemi üreticisinin talimatlarında yer alır."
      ]
    },
    {
      h: "Şap kaç günde kurur?",
      p: [
        "Şapın üzerine yürünebilmesi ile kaplamaya hazır olması farklı şeylerdir. Geleneksel çimento esaslı şapın üzerinde genellikle 1–3 gün sonra dikkatle yürünebilir. Kaplamaya hazır olması ise kalınlığa, ortam sıcaklığına, nemine ve havalandırmaya bağlıdır; ince tabakalarda sık kullanılan kaba bir kural, ilk 4 cm için santimetre başına yaklaşık bir hafta, daha kalın kısımlarda ise daha uzun sürelerdir.",
        "İlk günlerde şapın hızla kuruması istenmez: doğrudan güneş, cereyan ve yüksek sıcaklık yüzeyin erken kurumasına ve çatlamasına neden olur. İlk 3–7 gün yüzeyi nemli tutmak (kür), dayanımın gelişmesine yardımcı olur. Parke ve laminat gibi neme duyarlı kaplamalardan önce şapın nem içeriği ölçülmeli ve kaplama üreticisinin öngördüğü sınırın altında olduğu doğrulanmalıdır. Hızlı kuruyan hazır şaplar bu süreyi birkaç güne indirebilir."
      ]
    },
    {
      h: "Hazır şap mı geleneksel şap mı?",
      table: {
        head: ["Konu", "Geleneksel (kum + çimento)", "Hazır torba şap", "Akışkan (pompalı) şap"],
        rows: [
          ["Malzeme maliyeti", "Düşük", "Orta-yüksek", "Orta-yüksek"],
          ["İşçilik", "Fazla; karıştırma, taşıma, mastarlama", "Daha az; suyla karıştırılır", "En az; pompayla dökülür"],
          ["Kalite tutarlılığı", "Ustaya ve kuma bağlı", "Fabrika reçetesi, tutarlı", "Tutarlı, çok düz yüzey"],
          ["Kuruma süresi", "Uzun", "Ürüne göre, bazıları hızlı", "Ürüne göre"],
          ["Uygun alan", "Geniş alan, düşük bütçe", "Küçük alan, tadilat", "Yerden ısıtma, geniş düz alan"]
        ]
      },
      after: [
        "Hazır şapların tüketimi genellikle \"her 1 mm kalınlık için m² başına yaklaşık 2 kg\" düzeyindedir; 5 cm kalınlıkta m² başına yaklaşık 100 kg, yani 25 kg'lık 4 torba anlamına gelir. Kesin değer ürüne göre değiştiği için ambalajdaki tüketim bilgisini kullanın."
      ]
    },
    {
      h: "Şap metrajı nasıl çıkarılır?",
      ol: [
        "Her odanın iç ölçülerini duvardan duvara ölçün; L biçimli ya da girintili odaları dikdörtgen parçalara ayırıp alanları toplayın.",
        "Banyo, kapı eşiği ve balkon gibi farklı kotları ayrı hesaplayın.",
        "Lazer nivo ya da hortum terazisiyle odanın birkaç noktasında kot alın; ortalama şap kalınlığını en çukur ve en yüksek noktaya göre belirleyin.",
        "Toplam alanı ortalama kalınlıkla çarpıp hacmi bulun ve %5–10 fire ekleyin.",
        "Malzemeyi tek seferde sipariş edin; farklı partilerden gelen kum ve çimento renk ve dayanım farkı yaratabilir."
      ],
      after: [
        "Alan hesabı için [[arac:metrekare-hesapla|Metrekare Hesaplama]] aracını, ev ve oda ölçüsünün nasıl çıkarılacağı için [[bilgi:ev-metrekaresi-nasil-hesaplanir|ev metrekaresi]] yazısını, betonla karşılaştırma için [[bilgi:1-m3-beton-icin-kac-torba-cimento|1 m³ beton için kaç torba çimento]] yazısını inceleyebilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Fazla su:</strong> Kolay yayılsın diye sulandırılan şap büzülür, çatlar ve yüzeyi tozur.",
        "<strong>Kenar bandını unutmak:</strong> Duvar diplerinde dilatasyon bandı olmayan yüzer şap genleşince çatlar ve ses köprüsü oluşturur.",
        "<strong>Erken kaplama:</strong> Nemi yüksek şap üzerine döşenen parke kabarır, yapıştırıcılar tutmaz.",
        "<strong>Kuru hacim katsayısını atlamak:</strong> Yaş hacimle doğrudan çimento hesaplamak malzemeyi yaklaşık %25–30 eksik gösterir.",
        "<strong>Fakir karışım:</strong> 1:6 gibi oranlar maliyeti düşürür ama özellikle trafiği yüksek alanlarda yüzey dayanımını yetersiz bırakır."
      ]
    }
  ],
  faq: [
    ["Şap nasıl hesaplanır?", "Zemin alanı metre cinsinden kalınlıkla çarpılarak yaş hacim bulunur, fire eklenir ve yaklaşık 1,33 ile çarpılarak kuru malzeme hacmine geçilir. Bu hacim karışım oranına göre çimento ve kuma bölünür; çimento kilograma çevrilip torba sayısı bulunur."],
    ["Şap kalınlığı kaç cm olmalı?", "Yasal tek bir ölçü yoktur. Uygulamada zemine yapışık şaplar için 3 ile 5 cm, yalıtım üzerine yüzer şaplar için en az 4,5 ile 5 cm sık önerilir. Kesin değer zemin, yalıtım ve üretici föyüne göre belirlenir."],
    ["1 m² şap için kaç torba çimento gerekir?", "1:4 karışımla 5 cm kalınlıkta metrekare başına yaklaşık 19 kg çimento, yani 50 kg'lık torbanın yaklaşık 0,38'i gerekir. Her 1 cm kalınlık metrekareye yaklaşık 3,8 kg çimento ekler."],
    ["Şapta kum–çimento oranı nedir?", "Geleneksel şapta en yaygın hacim oranları 1 ölçü çimentoya 3 ile 4 ölçü kumdur. Bu, metreküp başına yaklaşık 300 ile 400 kg çimentoya karşılık gelir; su ise toprak nemi kıvamında, az miktarda kullanılır."],
    ["Yerden ısıtmada şap kalınlığı ne kadar olmalı?", "Çimento esaslı şapta borunun üst yüzeyinden itibaren en az yaklaşık 4,5 cm şap önerilir. 17 mm'lik boruyla bu, yalıtım üzerinden ölçüldüğünde yaklaşık 6,5 ile 7 cm toplam kalınlık eder."],
    ["Şap kaç günde kurur?", "Geleneksel şapın üzerinde genellikle 1 ile 3 gün sonra dikkatle yürünebilir. Kaplamaya hazır olması ise kalınlık, sıcaklık ve havalandırmaya bağlı olarak haftalar sürebilir; parke öncesi nem ölçümü yapılmalıdır."],
    ["Hazır şap mı geleneksel şap mı tercih edilmeli?", "Geniş alan ve düşük bütçede geleneksel şap ekonomiktir. Küçük tadilatlarda ve tutarlı kalite istendiğinde hazır şap, yerden ısıtma ve çok düz yüzey gerektiğinde akışkan şap avantajlıdır."],
    ["Şap metrajı nasıl çıkarılır?", "Odalar dikdörtgen parçalara bölünüp alanlar toplanır, kot ölçümüyle ortalama kalınlık belirlenir. Toplam alan ortalama kalınlıkla çarpılıp yüzde 5 ile 10 fire eklenerek sipariş edilecek şap hacmi bulunur."],
    ["40 m² alana 5 cm şap için ne kadar malzeme gerekir?", "Yüzde 5 fire ve 1:4 karışımla yaklaşık 2,1 metreküp yaş şap gerekir. Bu da yaklaşık 804 kg, yani 17 torba çimento ve yaklaşık 2,23 metreküp kuma karşılık gelir."]
  ],
  tools: ["sap-hesapla", "cimento-hesapla", "kum-cakil-hesapla", "metrekare-hesapla"],
  related: ["1-m3-beton-icin-kac-torba-cimento", "ev-metrekaresi-nasil-hesaplanir", "kac-litre-boya-kac-m2-fayans", "mantolama-nedir-kac-cm-olmali"],
  sources: [
    ["Türk Standardları Enstitüsü – Şap harcı ve şaplar standardı", "https://www.tse.org.tr/"],
    ["Çevre, Şehircilik ve İklim Değişikliği Bakanlığı", "https://www.csb.gov.tr/"]
  ]
};
