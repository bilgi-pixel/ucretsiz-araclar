export default {
  slug: "e-mc2-nedir-kutle-enerji",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "E=mc² Nedir? Kütle-Enerji Eşdeğerliği Basitçe ve Örneklerle",
  pageTitle: "E=mc² Nedir? Kütle-Enerji Eşdeğerliği ve 1 Gram Kaç Joule",
  description: "E=mc², kütlenin bir enerji biçimi olduğunu ve 1 gramın yaklaşık 9 × 10¹³ joule'e eşit olduğunu söyler. Işık hızının karesi, nükleer enerji, Güneş ve elektronvolt.",
  keywords: ["e=mc2 nedir", "kütle enerji eşdeğerliği", "einstein formülü", "1 gram kütle kaç joule", "elektronvolt nedir", "nükleer enerji kütle kaybı", "ışık hızının karesi", "foton enerjisi"],
  lead: "E=mc², Albert Einstein'ın 1905'te özel görelilik kuramından çıkardığı ve <strong>kütlenin enerjinin bir biçimi olduğunu</strong> söyleyen eşitliktir: bir cismin durgun hâldeki enerjisi (E), kütlesi (m) ile ışık hızının karesinin (c²) çarpımına eşittir. c² yaklaşık 9 × 10¹⁶ m²/s² gibi devasa bir sayı olduğu için <strong>1 gram kütle yaklaşık 9 × 10¹³ joule</strong>, yani yaklaşık 25 milyon kilovatsaat enerjiye karşılık gelir. Bu sayfada formülün anlamını, ışık hızının neden karesiyle yer aldığını, nükleer santrallerde ve Güneş'te kütlenin enerjiye nasıl dönüştüğünü, elektronvoltu ve foton enerjisini örneklerle anlatıyoruz.",
  kisaCevap: [
    "E = m · c²; E joule, m kilogram, c = 299.792.458 m/s (boşlukta ışık hızı) olarak alınır.",
    "c² ≈ 8,99 × 10¹⁶ m²/s²; bu yüzden çok küçük kütle çok büyük enerjiye karşılık gelir.",
    "1 gram kütle ≈ 8,99 × 10¹³ J ≈ 24,97 milyon kWh ≈ 21,5 kiloton TNT eşdeğeri.",
    "Nükleer fisyon ve füzyonda tepkimeye giren kütlenin binde biri ile yüzde biri arasında bir kısmı enerjiye dönüşür; kimyasal yanmada bu oran milyarda bir düzeyindedir.",
    "1 elektronvolt (eV) = 1,602176634 × 10⁻¹⁹ J; bir elektronun durgun kütle enerjisi yaklaşık 0,511 MeV'tur.",
    "Foton enerjisi E = h · f ile bulunur; 500 nm yeşil ışık fotonu yaklaşık 2,48 eV taşır."
  ],
  figure: {
    alt: "E eşittir m c kare formülünün açıklaması ve 1 gram kütlenin enerji karşılıkları: 89,9 terajoule, yaklaşık 25 milyon kilovatsaat ve 21,5 kiloton TNT; altta kimyasal yanma, fisyon ve füzyondaki kütle kaybı oranlarının logaritmik karşılaştırması.",
    caption: "1 gramın tamamı enerjiye dönüşseydi yaklaşık 89,9 TJ açığa çıkardı. Gerçek süreçlerde kütlenin yalnızca küçük bir kesri dönüşür: benzin yakmada yaklaşık milyarda yarım, uranyum fisyonunda yaklaşık binde bir, hidrojen füzyonunda yaklaşık binde yedi.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="44" width="250" height="140" rx="12" class="p"/>
  <text x="145" y="112" class="xl mid sf">E = m · c²</text>
  <text x="145" y="140" class="sm mid sf">c = 299.792.458 m/s</text>
  <text x="145" y="160" class="sm mid sf">c² ≈ 8,99 × 10¹⁶ m²/s²</text>
  <text x="300" y="36" class="b">m = 1 gram = 0,001 kg ise</text>
  <rect x="290" y="50" width="410" height="40" rx="8" class="sf sb"/>
  <text x="306" y="76">Enerji</text><text x="690" y="76" class="b end">8,99 × 10¹³ J ≈ 89,9 TJ</text>
  <rect x="290" y="96" width="410" height="40" rx="8" class="sf sb"/>
  <text x="306" y="122">Elektrik karşılığı</text><text x="690" y="122" class="b end">≈ 24,97 milyon kWh</text>
  <rect x="290" y="142" width="410" height="40" rx="8" class="sf sb"/>
  <text x="306" y="168">Patlayıcı karşılığı</text><text x="690" y="168" class="b end">≈ 21,5 kiloton TNT</text>
  <text x="20" y="226" class="b">Gerçek süreçlerde enerjiye dönüşen kütle oranı (logaritmik)</text>
  <line x1="200" y1="246" x2="200" y2="400" class="st" fill="none"/>
  <rect x="200" y="252" width="40" height="30" class="dgs"/>
  <text x="190" y="272" class="sm end">Benzin yakma</text><text x="250" y="272" class="sm">≈ 5 × 10⁻¹⁰ (1 kg'da 0,5 µg)</text>
  <rect x="200" y="292" width="300" height="30" class="ps"/>
  <text x="190" y="312" class="sm end">Uranyum fisyonu</text><text x="510" y="312" class="sm">≈ %0,09</text>
  <rect x="200" y="332" width="380" height="30" class="p"/>
  <text x="190" y="352" class="sm end">Hidrojen füzyonu</text><text x="590" y="352" class="sm">≈ %0,7</text>
  <rect x="200" y="372" width="500" height="22" class="oks"/>
  <text x="190" y="388" class="sm end">Madde-karşıt madde</text><text x="690" y="388" class="sm end b">%100</text>
</svg>`
  },
  sections: [
    {
      h: "E=mc² ne anlama gelir?",
      p: [
        "Formül üç harften oluşur: <strong>E</strong> enerji, <strong>m</strong> kütle, <strong>c</strong> ışığın boşluktaki hızıdır. Söylediği şey, kütle ile enerjinin birbirinden bağımsız iki şey olmadığı, aynı büyüklüğün iki farklı görünüşü olduğudur. Durgun hâldeki bir cisim, hiç hareket etmese ve sıcaklığı değişmese bile kütlesi kadar \"durgun kütle enerjisi\" taşır.",
        "Bu eşdeğerliğin iki yönü vardır. Bir sistemden enerji çıktığında kütlesi azalır; sisteme enerji girdiğinde kütlesi artar. Sıcak bir fincan çay, soğuduğunda ölçülemeyecek kadar az da olsa hafifler; kurulan bir yay, gevşek hâlinden çok çok az daha ağırdır. Günlük hayatta bu farkları göremeyiz, çünkü enerjiyi kütleye çevirirken c² gibi devasa bir sayıya böleriz.",
        "Formül çoğu zaman \"madde enerjiye dönüşür\" diye özetlenir; daha doğru ifade, bir süreçte açığa çıkan enerjinin, sistemin kütlesindeki azalmaya c² ile çarpılarak eşit olduğudur. Toplam enerji (kütle enerjisi dahil) her zaman korunur."
      ]
    },
    {
      h: "1 gram madde kaç joule enerjiye eşittir?",
      p: [
        "Hesap için kütleyi mutlaka kilogram, ışık hızını metre/saniye cinsinden yazmak gerekir; sonuç joule çıkar. Işık hızı SI'da tanım gereği tam olarak 299.792.458 m/s'dir."
      ],
      formula: "m = 1 g = 0,001 kg\nc² = (299.792.458)² ≈ 8,98755 × 10¹⁶ m²/s²\nE = 0,001 × 8,98755 × 10¹⁶ ≈ 8,99 × 10¹³ J ≈ 89,9 terajoule",
      ol: [
        "<strong>Kilovatsaate çevirme:</strong> 1 kWh = 3,6 × 10⁶ J olduğundan 8,99 × 10¹³ ÷ 3,6 × 10⁶ ≈ 24,97 milyon kWh, yani yaklaşık 25 GWh bulunur.",
        "<strong>Ev tüketimiyle karşılaştırma:</strong> Yılda 2.500 kWh elektrik kullanan bir hane (örnek tüketim) bu enerjiyle yaklaşık 10.000 yıl idare ederdi.",
        "<strong>TNT eşdeğeri:</strong> 1 ton TNT 4,184 × 10⁹ J kabul edilir; 8,99 × 10¹³ ÷ 4,184 × 10⁹ ≈ 21.500 ton, yani yaklaşık 21,5 kiloton.",
        "<strong>Ters yön:</strong> 1 kWh enerjinin kütle karşılığı 3,6 × 10⁶ ÷ 8,99 × 10¹⁶ ≈ 4 × 10⁻¹¹ kg, yani yaklaşık 0,04 mikrogramdır."
      ],
      after: [
        "Bu sonuçlar kütlenin <strong>tamamının</strong> enerjiye dönüştüğü varsayımına dayanır; bu yalnızca madde ile karşıt maddenin karşılaşmasında olur. Hesapları farklı kütlelerle denemek için [[arac:kutle-enerji-hesapla|Kütle Enerji Hesaplama]] aracını, joule ile kilovatsaat arasında geçiş için [[arac:kwh-joule-cevir|kWh Joule Çevirici]]yi kullanabilirsiniz."
      ]
    },
    {
      h: "Formülde neden ışık hızının karesi var?",
      p: [
        "Birim analizi ilk ipucunu verir: enerjinin birimi joule, 1 J = 1 kg · m²/s²'dir. Kütleyi (kg) enerjiye çevirmek için hız biriminin karesine (m²/s²) ihtiyaç vardır. Kinetik enerji formülündeki ½ · m · v² de aynı yapıdadır.",
        "Fiziksel neden ise özel göreliliktedir. Einstein, bir cismin ışık yaydığında kütlesinin yayılan enerjinin c²'ye bölümü kadar azaldığını gösterdi. Görelilikte ışık hızı, uzay ve zamanı birbirine bağlayan evrensel bir hız sınırıdır; kütle ile enerji arasındaki dönüşüm katsayısı da bu sınırdan gelir. Işık hızının bu kadar büyük olması, çok küçük bir kütlenin bile devasa bir enerjiye karşılık gelmesinin nedenidir.",
        "Formülün tam hâli hareket eden cisimler için E² = (m · c²)² + (p · c)²'dir; burada p momentumdur. Cisim durgunken p = 0 olur ve bilinen E = m · c² kalır. Kütlesi olmayan foton için ise m = 0 ve E = p · c'dir. Momentum kavramını [[bilgi:momentum-ve-itme-nedir|momentum ve itme]] yazısında, klasik enerji türlerini [[bilgi:kinetik-ve-potansiyel-enerji|kinetik ve potansiyel enerji]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Nükleer santrallerde kütle enerjiye nasıl dönüşür?",
      p: [
        "Atom çekirdekleri proton ve nötronlardan oluşur; ama bir çekirdeğin kütlesi, onu oluşturan parçacıkların ayrı ayrı kütleleri toplamından biraz azdır. Bu farka <strong>kütle eksikliği</strong> denir ve parçacıkları bir arada tutan bağlanma enerjisine karşılık gelir.",
        "<strong>Fisyon</strong> (bölünme) tepkimesinde uranyum-235 gibi ağır bir çekirdek nötron yutarak iki orta büyüklükte çekirdeğe ve birkaç nötrona bölünür. Ürünlerin toplam kütlesi başlangıçtakinden azdır; her bölünmede yaklaşık 200 MeV, yani yaklaşık 3,2 × 10⁻¹¹ J enerji açığa çıkar. Bu, uranyum çekirdeğinin kütlesinin yaklaşık binde biri kadardır. Açığa çıkan enerji ısı olarak suya aktarılır, buhar türbinleri döndürür ve elektrik üretilir.",
        "Kimyasal tepkimelerle karşılaştırınca fark çarpıcıdır: 1 kg benzin yakıldığında yaklaşık 46 MJ ısı çıkar ve bu yalnızca yaklaşık 0,5 mikrogramlık kütle kaybına karşılık gelir. Aynı kütlede nükleer yakıtın verdiği enerji milyonlarca kat fazladır. Radyoaktif bozunmanın hızını anlatan [[bilgi:yari-omur-nedir-nasil-hesaplanir|yarı ömür]] kavramı da nükleer enerjiyle yakından ilişkilidir."
      ],
      note: "Nükleer tepkimeler ve radyoaktif maddeler yalnızca yetkili tesislerde, sıkı güvenlik kurallarıyla kullanılır. Bu bölüm yalnızca genel fizik bilgisidir."
    },
    {
      h: "Güneş enerjisini nasıl üretir?",
      p: [
        "Güneş'in merkezinde sıcaklık yaklaşık 15 milyon kelvin, basınç ise son derece yüksektir. Bu koşullarda hidrojen çekirdekleri birleşerek helyum oluşturur; buna <strong>füzyon</strong> (kaynaşma) denir. Dört hidrojen çekirdeğinden bir helyum çekirdeği oluştuğunda kütlenin yaklaşık %0,7'si enerjiye dönüşür.",
        "Güneş'in yaydığı toplam güç yaklaşık 3,8 × 10²⁶ watt'tır. Bunu c²'ye böldüğünüzde Güneş'in her saniye yaklaşık 4,26 milyar kilogram, yani yaklaşık 4,3 milyon ton kütle kaybettiğini bulursunuz. Bu sayı çok büyük görünse de Güneş'in toplam kütlesi o kadar büyüktür ki milyarlarca yıl boyunca parlamaya devam edebilir.",
        "Dünya'ya ulaşan güneş ışığı, fotosentez, rüzgâr ve yağmur gibi enerji kaynaklarının büyük kısmının kökeni bu füzyondur. Yeryüzünde kontrollü füzyonla elektrik üretmek için deneysel reaktörler üzerinde çalışılmaktadır."
      ]
    },
    {
      h: "Elektronvolt nedir?",
      p: [
        "Atom ve parçacık fiziğinde joule çok büyük bir birim olduğu için <strong>elektronvolt (eV)</strong> kullanılır. 1 eV, bir elektronun 1 voltluk potansiyel farkı boyunca hızlandırıldığında kazandığı enerjidir ve 2019'dan bu yana SI tanımları gereği tam olarak 1,602176634 × 10⁻¹⁹ J'dür. Katları keV (bin), MeV (milyon), GeV (milyar) ve TeV (trilyon) elektronvolttur.",
        "E=mc² sayesinde parçacık kütleleri de çoğu zaman enerji birimiyle verilir: MeV/c² ya da kısaca MeV."
      ],
      table: {
        head: ["Parçacık ya da olay", "Enerji (yaklaşık)", "Joule karşılığı (yaklaşık)"],
        rows: [
          ["Görünür ışık fotonu", "1,7 – 3,1 eV", "2,7 – 5,0 × 10⁻¹⁹ J"],
          ["Kimyasal bağ", "birkaç eV", "≈ 10⁻¹⁹ – 10⁻¹⁸ J"],
          ["Elektronun durgun kütle enerjisi", "0,511 MeV", "8,19 × 10⁻¹⁴ J"],
          ["Protonun durgun kütle enerjisi", "938,27 MeV", "1,50 × 10⁻¹⁰ J"],
          ["Bir uranyum-235 fisyonu", "≈ 200 MeV", "≈ 3,2 × 10⁻¹¹ J"]
        ],
        caption: "Kimyasal tepkimeler eV düzeyinde, nükleer tepkimeler MeV düzeyinde enerji alışverişi yapar; aradaki milyon katlık fark nükleer yakıtın enerji yoğunluğunu açıklar."
      },
      after: [
        "eV ile joule arasında çeviri için [[arac:elektronvolt-joule-cevir|Elektronvolt Joule Çevirici]]yi kullanabilirsiniz."
      ]
    },
    {
      h: "Foton enerjisi nasıl hesaplanır?",
      p: [
        "Işık, foton denen enerji paketlerinden oluşur. Fotonun durgun kütlesi yoktur, ama enerjisi ve momentumu vardır. Enerjisi frekansıyla doğru, dalga boyuyla ters orantılıdır. Burada h, tanım gereği tam olarak 6,62607015 × 10⁻³⁴ J·s olan Planck sabitidir."
      ],
      formula: "E = h · f = h · c / λ\nÖrnek: λ = 500 nm (yeşil ışık)\nE = 6,626 × 10⁻³⁴ × 2,998 × 10⁸ / 500 × 10⁻⁹ ≈ 3,97 × 10⁻¹⁹ J ≈ 2,48 eV",
      after: [
        "Kısa yol: E (eV) ≈ 1.240 / λ (nm). Mor ışık (400 nm) yaklaşık 3,1 eV, kırmızı ışık (700 nm) yaklaşık 1,77 eV taşır. Morötesi ışınların cildi daha fazla etkilemesinin nedeni, fotonlarının daha yüksek enerjili olmasıdır. Hesap için [[arac:foton-enerjisi-hesapla|Foton Enerjisi Hesaplama]] aracını, dalga boyu ile frekans ilişkisi için [[bilgi:dalga-boyu-ve-frekans-iliskisi|dalga boyu ve frekans]] yazısını kullanabilirsiniz."
      ]
    },
    {
      h: "E=mc² günlük hayatta görülür mü?",
      ul: [
        "<strong>Doğrudan hissedilmez:</strong> Bir pilin dolu ve boş hâli arasındaki kütle farkı terazilerin ölçemeyeceği kadar küçüktür.",
        "<strong>Elektriğin bir kısmı:</strong> Nükleer santrallerin ürettiği elektrik, çekirdeklerdeki kütle eksikliğinden gelir.",
        "<strong>Tıbbi görüntüleme:</strong> Pozitron emisyon tomografisinde (PET) pozitron ile elektron karşılaşıp yok olur ve her biri 0,511 MeV'luk iki foton oluşur; cihaz bu fotonları algılar.",
        "<strong>Güneş ışığı:</strong> Yüzünüze vuran her ışın, Güneş'in kaybettiği kütlenin enerjiye dönüşmüş hâlidir.",
        "<strong>Uydu konumlama:</strong> Konum sistemleri göreliliğin zaman etkilerini hesaba katar; bu E=mc² ile aynı kuramdan gelir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Kütleyi gram olarak koymak:</strong> SI'da kütle kilogram olmalıdır; 1 g yerine 1 yazarsanız sonuç bin kat büyük çıkar.",
        "<strong>c'yi km/s yazmak:</strong> 300.000 km/s kullanılırsa sonuç joule çıkmaz; 3 × 10⁸ m/s kullanın.",
        "<strong>Karesini almayı unutmak:</strong> m · c ile m · c² arasında 3 × 10⁸ katlık fark vardır.",
        "<strong>Her tepkimede tüm kütlenin dönüştüğünü sanmak:</strong> Fisyon ve füzyonda yalnızca küçük bir kesir enerjiye dönüşür.",
        "<strong>Formülü yalnızca nükleer olaylara özgü sanmak:</strong> Eşdeğerlik bütün enerji değişimleri için geçerlidir; kimyasal tepkimelerde etki yalnızca çok küçüktür."
      ]
    }
  ],
  faq: [
    ["E=mc² ne anlama gelir?", "E=mc², bir cismin durgun hâldeki enerjisinin kütlesi ile ışık hızının karesinin çarpımına eşit olduğunu söyler. Kütle ve enerji aynı büyüklüğün iki görünüşüdür; bir sistem enerji verdiğinde kütlesi azalır, enerji aldığında artar."],
    ["1 gram madde kaç joule enerjiye eşittir?", "1 gram, yani 0,001 kilogram kütle, ışık hızının karesiyle çarpıldığında yaklaşık 8,99 × 10¹³ joule eder. Bu yaklaşık 25 milyon kilovatsaat ya da 21,5 kiloton TNT enerjisine karşılık gelir."],
    ["Formülde neden ışık hızının karesi var?", "Enerjinin birimi kilogram çarpı metre kare bölü saniye karedir; kütleyi enerjiye çevirmek için hızın karesi gerekir. Fiziksel olarak da özel görelilik, kütle ile enerji arasındaki dönüşüm katsayısının evrensel hız sınırı olan ışık hızının karesi olduğunu gösterir."],
    ["Nükleer santrallerde kütle enerjiye nasıl dönüşür?", "Uranyum-235 çekirdeği bölündüğünde oluşan ürünlerin toplam kütlesi başlangıçtakinden biraz azdır. Bu kütle farkı c² ile çarpılarak bulunan enerji, her bölünmede yaklaşık 200 MeV olarak ısıya dönüşür ve buhar türbinleriyle elektrik üretilir."],
    ["Elektronvolt nedir?", "Elektronvolt, bir elektronun 1 voltluk gerilim altında kazandığı enerjidir ve tam olarak 1,602176634 × 10⁻¹⁹ joule eder. Atom ve parçacık fiziğinde kullanılır; elektronun durgun kütle enerjisi yaklaşık 0,511 MeV'tur."],
    ["Güneş enerjisini nasıl üretir?", "Güneş'in merkezinde hidrojen çekirdekleri birleşip helyuma dönüşür ve bu füzyonda kütlenin yaklaşık yüzde 0,7'si enerjiye dönüşür. Güneş bu yolla saniyede yaklaşık 4,3 milyon ton kütle kaybederek ışık ve ısı yayar."],
    ["E=mc² günlük hayatta görülür mü?", "Kütle değişimleri günlük olaylarda ölçülemeyecek kadar küçüktür, ama sonuçları her yerdedir. Güneş ışığı, nükleer santrallerin elektriği ve hastanelerdeki PET görüntüleme, kütlenin enerjiye dönüşmesine dayanır."],
    ["Foton enerjisi nasıl hesaplanır?", "Foton enerjisi Planck sabiti ile frekansın çarpımıdır: E = h·f ya da E = h·c/λ. 500 nanometre dalga boylu yeşil ışık fotonu yaklaşık 3,97 × 10⁻¹⁹ joule, yani 2,48 elektronvolt enerji taşır."],
    ["Benzin yakmak da kütle kaybına yol açar mı?", "Evet, ama çok az. Bir kilogram benzin yanınca açığa çıkan yaklaşık 46 megajoule enerji, ürünlerin toplam kütlesinde yaklaşık 0,5 mikrogramlık azalmaya karşılık gelir; bu fark terazilerle ölçülemez."]
  ],
  tools: ["kutle-enerji-hesapla", "elektronvolt-joule-cevir", "foton-enerjisi-hesapla", "kwh-joule-cevir"],
  related: ["kinetik-ve-potansiyel-enerji", "yari-omur-nedir-nasil-hesaplanir", "dalga-boyu-ve-frekans-iliskisi", "isik-yili-nedir-kac-km"],
  sources: [
    ["NIST – Fiziksel sabitler (c, h, e)", "https://physics.nist.gov/cuu/Constants/"],
    ["BIPM – SI birimleri ve tanımları", "https://www.bipm.org/en/measurement-units"]
  ]
};
