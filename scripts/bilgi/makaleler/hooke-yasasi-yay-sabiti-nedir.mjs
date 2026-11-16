export default {
  slug: "hooke-yasasi-yay-sabiti-nedir",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Hooke Yasası Nedir? Yay Sabiti, F = k·x ve Seri–Paralel Yaylar",
  pageTitle: "Hooke Yasası Nedir? Yay Sabiti F = k·x, Seri ve Paralel Yay",
  description: "Hooke yasası: yaydaki kuvvet uzama ile doğru orantılıdır, F = k·x. Yay sabitinin birimi N/m; seri–paralel yay, esneklik sınırı ve yay enerjisi örnekleri.",
  keywords: ["hooke yasası", "yay sabiti nedir", "f=kx", "yay kuvveti", "seri bağlı yaylar", "paralel bağlı yaylar", "esneklik sınırı", "yayda depolanan enerji"],
  lead: "Hooke yasası, esneklik sınırı aşılmadığı sürece bir yayı geren ya da sıkıştıran kuvvetin <strong>uzama miktarıyla doğru orantılı</strong> olduğunu söyler: <strong>F = k·x</strong>. Buradaki k yay sabitidir ve yayın ne kadar \"sert\" olduğunu gösterir; birimi newton bölü metredir (N/m). Örneğin yay sabiti 200 N/m olan bir yay 5 cm uzatıldığında 10 N kuvvet uygular. Bu sayfada formülü, birim dönüşümlerini, seri ve paralel bağlı yaylarda eşdeğer yay sabitini, esneklik sınırını, dinamometreyi ve yayda depolanan enerjiyi çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Hooke yasası: F = k·x; F kuvvet (N), k yay sabiti (N/m), x uzama ya da sıkışma miktarı (m).",
    "Yay sabiti büyükse yay serttir: aynı kuvvet daha az uzama yaratır.",
    "Seri bağlı yaylarda 1/k<sub>eş</sub> = 1/k<sub>1</sub> + 1/k<sub>2</sub>; 200 ve 300 N/m'lik yaylar seri bağlanınca 120 N/m olur.",
    "Paralel bağlı yaylarda k<sub>eş</sub> = k<sub>1</sub> + k<sub>2</sub>; aynı yaylar paralel bağlanınca 500 N/m olur.",
    "Yayda depolanan esneklik potansiyel enerjisi E = ½·k·x²'dir; 200 N/m'lik yay 10 cm uzatılınca 1 J enerji depolar."
  ],
  figure: {
    alt: "Hooke yasası grafiği ve yay bağlantıları: kuvvet–uzama doğrusu esneklik sınırına kadar düz; altta 200 ve 300 N/m'lik yaylar seri bağlanınca 120, paralel bağlanınca 500 N/m eşdeğer sabit veriyor.",
    caption: "Esneklik sınırına kadar kuvvet–uzama grafiği bir doğrudur ve eğimi yay sabitini verir. 20 N'luk yük altında seri bağlı yaylar toplam 16,7 cm, paralel bağlı yaylar yalnızca 4 cm uzar.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">F = k·x ve yay bağlantıları</text>
  <line x1="60" y1="250" x2="330" y2="250" class="st" fill="none"/>
  <line x1="60" y1="250" x2="60" y2="60" class="st" fill="none"/>
  <text x="330" y="272" class="sm end">uzama x (cm)</text>
  <text x="66" y="66" class="sm">F (N)</text>
  <line x1="60" y1="250" x2="240" y2="110" class="sp sw" fill="none"/>
  <path d="M240 110 Q275 92 310 96" class="sdg sw dash" fill="none"/>
  <circle cx="240" cy="110" r="5" class="p"/>
  <text x="246" y="134" class="sm p b">esneklik sınırı</text>
  <text x="150" y="226" class="sm mid">eğim = k</text>
  <line x1="150" y1="250" x2="150" y2="180" class="sb dash" fill="none"/>
  <text x="150" y="268" class="sm mid">5</text>
  <text x="54" y="184" class="sm end">10</text>
  <line x1="60" y1="180" x2="150" y2="180" class="sb dash" fill="none"/>
  <rect x="370" y="56" width="330" height="88" rx="8" class="sf sb"/>
  <rect x="370" y="56" width="8" height="88" class="p"/>
  <text x="390" y="82" class="b">Örnek: k = 200 N/m, x = 5 cm</text>
  <text x="390" y="106" class="sm">F = 200 × 0,05 = 10 N</text>
  <text x="390" y="128" class="sm">E = ½ × 200 × 0,05² = 0,25 J</text>
  <rect x="370" y="160" width="160" height="104" rx="8" class="ps"/>
  <text x="450" y="186" class="mid b">Seri</text>
  <text x="450" y="210" class="sm mid">200 ve 300 N/m</text>
  <text x="450" y="236" class="lg mid b p">120 N/m</text>
  <text x="450" y="256" class="sm mid">20 N → 16,7 cm</text>
  <rect x="540" y="160" width="160" height="104" rx="8" class="oks"/>
  <text x="620" y="186" class="mid b">Paralel</text>
  <text x="620" y="210" class="sm mid">200 ve 300 N/m</text>
  <text x="620" y="236" class="lg mid b ok">500 N/m</text>
  <text x="620" y="256" class="sm mid">20 N → 4 cm</text>
  <rect x="20" y="296" width="680" height="104" rx="8" class="sf sb"/>
  <text x="40" y="324" class="b">Formüller</text>
  <text x="40" y="350" class="sm">Seri: 1/k = 1/k₁ + 1/k₂ → yaylar yumuşar (k küçülür)</text>
  <text x="40" y="372" class="sm">Paralel: k = k₁ + k₂ → yaylar sertleşir (k büyür)</text>
  <text x="40" y="392" class="sm mu">Dirençlerin seri–paralel kuralının tersidir.</text>
</svg>`
  },
  sections: [
    {
      h: "Hooke yasası nedir?",
      p: [
        "İngiliz bilim insanı Robert Hooke 17. yüzyılda, yayların ve esnek cisimlerin davranışını inceleyerek basit bir ilişki buldu: bir yayı ne kadar çok uzatırsanız, yay sizi o kadar güçlü geri çeker ve bu ilişki doğrusaldır. Uzamayı iki katına çıkarırsanız kuvvet de iki katına çıkar. Bu ilişkiye <strong>Hooke yasası</strong> denir ve fizik derslerinde F = k·x biçiminde yazılır.",
        "Yayın uyguladığı kuvvet her zaman yayı eski boyuna döndürmeye çalışır; bu yüzden yay kuvveti bazı kitaplarda eksi işaretiyle F = −k·x olarak yazılır. Eksi işareti yönü gösterir: yayı sağa çekerseniz yay sizi sola çeker. Kuvvetin büyüklüğünü hesaplarken işareti göz ardı edip F = k·x kullanmak yeterlidir. Kuvvetin ne olduğunu ve Newton'un yasalarıyla bağlantısını [[bilgi:newtonun-hareket-yasalari|Newton'un hareket yasaları]] makalesinde bulabilirsiniz."
      ],
      formula: "F = k · x\nF: yay kuvveti (N) · k: yay sabiti (N/m) · x: uzama ya da sıkışma (m)\nk = F ÷ x · x = F ÷ k"
    },
    {
      h: "Yay sabiti k neyi gösterir, birimi nedir?",
      p: [
        "Yay sabiti, yayı 1 metre uzatmak için gereken kuvveti gösterir. Birimi <strong>newton bölü metre (N/m)</strong>'dir. Yay sabiti büyük olan yay serttir: aynı kuvvetle daha az uzar. Bir tükenmez kalemin yayı birkaç yüz N/m, bir aracın amortisör yayı on binlerce N/m mertebesindedir.",
        "Okul problemlerinde yay sabiti bazen N/cm olarak verilir. Dönüşüm basittir: 1 N/cm = 100 N/m, çünkü 1 metrede 100 santimetre vardır. Hesapta birimlerin uyumlu olması şarttır; uzama santimetreyle verilip yay sabiti N/m ise uzamayı önce metreye çevirin. En sık yapılan hatalardan biri 5 cm'yi 0,05 m yerine 5 m olarak yazmaktır."
      ],
      table: {
        head: ["Verilen", "Çevirme", "Örnek"],
        rows: [
          ["Uzama cm, k N/m", "x (m) = x (cm) ÷ 100", "5 cm → 0,05 m"],
          ["Uzama mm, k N/m", "x (m) = x (mm) ÷ 1.000", "40 mm → 0,04 m"],
          ["k N/cm", "k (N/m) = k (N/cm) × 100", "2 N/cm → 200 N/m"],
          ["Kütle verilmiş (asılı cisim)", "F = m · g", "0,5 kg → 0,5 × 9,81 = 4,9 N"]
        ]
      }
    },
    {
      h: "Çözümlü örnekler: kuvvet, uzama ve yay sabiti",
      ol: [
        "<strong>Kuvveti bulma:</strong> Yay sabiti 200 N/m olan bir yay 5 cm uzatılıyor. x = 0,05 m → F = 200 × 0,05 = <strong>10 N</strong>.",
        "<strong>Yay sabitini bulma:</strong> Bir yaya 0,5 kg'lık cisim asıldığında yay 4 cm uzuyor. Cismin ağırlığı F = 0,5 × 9,81 = 4,905 N. k = 4,905 ÷ 0,04 ≈ <strong>122,6 N/m</strong>. Sınav sorularında g = 10 m/s² alınırsa sonuç 5 ÷ 0,04 = 125 N/m olur.",
        "<strong>Uzamayı bulma:</strong> Yay sabiti 300 N/m olan yaya 20 N kuvvet uygulanıyor. x = 20 ÷ 300 ≈ 0,0667 m = <strong>6,7 cm</strong>.",
        "<strong>Sıkışma:</strong> Aynı kural sıkıştırmada da geçerlidir. 200 N/m'lik yay 3 cm sıkıştırılırsa 200 × 0,03 = 6 N'luk kuvvetle geri iter."
      ],
      after: [
        "Bu hesapları [[arac:yay-sabiti-hesapla|Yay Sabiti Hesaplama]] aracıyla da yapabilirsiniz; araç yay sabitini, yay kuvvetini ya da uzamayı bulur, esneklik potansiyel enerjisini ve kütle girilirse salınım periyodunu da gösterir. Asılı cismin ağırlığını hesaplarken kütle ile ağırlık arasındaki farkı [[bilgi:kutle-ve-agirlik-farki|kütle ve ağırlık]] makalesi açıklar; F = m·a hesabı için [[arac:kuvvet-hesapla|Kuvvet Hesaplama]] aracı kullanılabilir."
      ]
    },
    {
      h: "Seri bağlı yayların eşdeğer sabiti nasıl bulunur?",
      p: [
        "Yaylar uç uca eklendiğinde seri bağlanmış olur. Bu durumda her iki yaya da aynı kuvvet etki eder, toplam uzama ise iki yayın uzamalarının toplamıdır. Sonuç olarak seri bağlı yaylar tek bir yaydan daha yumuşaktır; eşdeğer yay sabiti en küçük yayın sabitinden bile küçüktür."
      ],
      formula: "1 / k_eş = 1 / k₁ + 1 / k₂  →  iki yay için k_eş = (k₁ · k₂) ÷ (k₁ + k₂)\nÖrnek: k₁ = 200 N/m, k₂ = 300 N/m → k_eş = 60.000 ÷ 500 = 120 N/m\n20 N yükte: x₁ = 20 ÷ 200 = 10 cm, x₂ = 20 ÷ 300 = 6,7 cm, toplam 16,7 cm = 20 ÷ 120",
      after: [
        "Özel bir durum: aynı sabitli n tane yay seri bağlanırsa eşdeğer sabit k ÷ n olur. Bunun tersi de doğrudur; bir yayı tam ortasından ikiye keserseniz her yarının yay sabiti 2k olur, çünkü aynı kuvvet altında her yarı yarım uzama verir."
      ]
    },
    {
      h: "Paralel bağlı yaylarda yay sabiti nasıl değişir?",
      p: [
        "Yaylar yan yana bağlanıp yükü birlikte taşıdığında paralel bağlanmış olur. Burada her yay aynı miktarda uzar, toplam kuvvet ise yayların kuvvetlerinin toplamıdır. Paralel bağlı yaylar tek bir yaydan daha serttir ve eşdeğer sabit yay sabitlerinin toplamıdır."
      ],
      formula: "k_eş = k₁ + k₂\nÖrnek: 200 + 300 = 500 N/m\n20 N yükte: x = 20 ÷ 500 = 0,04 m = 4 cm; 1. yay 8 N, 2. yay 12 N taşır",
      table: {
        head: ["Özellik", "Seri bağlama", "Paralel bağlama"],
        rows: [
          ["Her yaydaki kuvvet", "Aynı", "Yay sabitine göre paylaşılır"],
          ["Her yaydaki uzama", "Yay sabitine göre farklı", "Aynı"],
          ["Eşdeğer sabit", "1/k = 1/k₁ + 1/k₂", "k = k₁ + k₂"],
          ["200 ve 300 N/m için", "120 N/m", "500 N/m"],
          ["20 N yükte uzama", "16,7 cm", "4 cm"],
          ["Sonuç", "Daha yumuşak", "Daha sert"]
        ]
      },
      after: [
        "Bu kurallar elektrikteki dirençlerin tam tersidir: dirençler seri bağlanınca toplanır, paralel bağlanınca ters toplanır. Karşılaştırmayı [[bilgi:seri-ve-paralel-direnc-hesaplama|seri ve paralel direnç]] makalesinde görebilirsiniz; ezberlemek yerine \"seri yay yumuşar, paralel yay sertleşir\" diye düşünmek hatayı önler."
      ]
    },
    {
      h: "Esneklik sınırı aşılırsa ne olur?",
      p: [
        "Hooke yasası sınırsız geçerli değildir. Her yayın ve esnek malzemenin bir <strong>esneklik sınırı</strong> vardır. Bu sınıra kadar kuvvet kaldırıldığında yay tam olarak eski boyuna döner ve kuvvet–uzama grafiği bir doğrudur. Sınır aşıldığında malzemenin iç yapısı kalıcı olarak değişir: yay kuvvet kaldırılınca eski boyuna dönmez, uzamış kalır. Buna kalıcı (plastik) şekil değişimi denir.",
        "Kuvvet daha da artırılırsa malzeme sonunda kopar. Bu yüzden gerçek hayatta yaylar, beklenen en büyük yükün esneklik sınırının oldukça altında kalacağı şekilde seçilir. Laboratuvarda ya da evde yay denemesi yaparken yayı aşırı germekten kaçının; kopan bir yay ya da fırlayan bir ağırlık yaralanmaya neden olabilir. Deneylerde koruyucu gözlük kullanmak ve yükleri yere yakın tutmak iyi bir alışkanlıktır."
      ]
    },
    {
      h: "Dinamometre Hooke yasasıyla nasıl çalışır?",
      p: [
        "Dinamometre (yaylı kuvvet ölçer), içinde yay sabiti bilinen bir yay ve bunun yanında bir ölçek bulunan basit bir alettir. Kancaya bir cisim asıldığında ya da kanca çekildiğinde yay uzar; uzama kuvvetle doğru orantılı olduğu için ölçek doğrudan newton cinsinden işaretlenebilir. Ölçek çizgileri eşit aralıklıdır, çünkü F = k·x doğrusaldır.",
        "Mutfak ve bavul tartılarının bir kısmı da aynı ilkeyle çalışır, ama ölçeklerini kilogram olarak gösterir; bunun için kuvveti yer çekimi ivmesine böler. Dinamometrenin ölçüm aralığı, yayının esneklik sınırına göre belirlenir; aralığın üstünde yük asmak yayı kalıcı olarak bozar ve alet yanlış ölçmeye başlar."
      ]
    },
    {
      h: "Yayda depolanan enerji nasıl hesaplanır?",
      p: [
        "Bir yayı uzatmak ya da sıkıştırmak için iş yapılır ve bu iş yayda <strong>esneklik potansiyel enerjisi</strong> olarak depolanır. Kuvvet uzamayla birlikte sıfırdan k·x'e doğrusal arttığı için ortalama kuvvet ½·k·x'tir; iş de ortalama kuvvet ile yolun çarpımıdır."
      ],
      formula: "E = ½ · k · x²\nk = 200 N/m, x = 0,05 m → E = 0,5 × 200 × 0,0025 = 0,25 J\nk = 200 N/m, x = 0,10 m → E = 1 J (uzama 2 katı, enerji 4 katı)",
      after: [
        "Enerjinin uzamanın karesiyle artması önemlidir: yayı iki kat germek dört kat enerji depolar. Okçuluk yaylarından oyuncak tabancalara ve araç süspansiyonlarına kadar birçok sistem bu enerjiyi kullanır. Yaydaki enerji, kütleli bir cisim bağlandığında kinetik enerjiye dönüşerek salınım hareketi yaratır; bu salınımın periyodu T = 2π√(m/k) formülüyle bulunur. 0,5 kg'lık cisim 125 N/m'lik yaya bağlanırsa T = 2π√(0,5 ÷ 125) ≈ 0,40 s olur. Enerji dönüşümlerinin genel mantığı [[bilgi:kinetik-ve-potansiyel-enerji|kinetik ve potansiyel enerji]] makalesinde, yükseklikten kaynaklanan enerji ise [[arac:potansiyel-enerji-hesapla|Potansiyel Enerji Hesaplama]] aracında anlatılıyor."
      ]
    }
  ],
  faq: [
    ["Hooke yasası nedir?", "Hooke yasası, esneklik sınırı aşılmadığı sürece bir yaya uygulanan kuvvetin yayın uzama ya da sıkışma miktarıyla doğru orantılı olduğunu söyler. Formülü F = k·x'tir; uzama iki katına çıkarsa kuvvet de iki katına çıkar."],
    ["Yay sabiti k neyi gösterir?", "Yay sabiti, yayı 1 metre uzatmak için gereken kuvveti gösterir ve yayın sertliğinin ölçüsüdür. Büyük k değerine sahip yay serttir ve aynı kuvvet altında daha az uzar."],
    ["Yay sabitinin birimi nedir?", "Yay sabitinin SI birimi newton bölü metredir (N/m). Okul problemlerinde N/cm de kullanılır; 1 N/cm 100 N/m'ye eşittir, bu yüzden hesaptan önce birimleri uyumlu hâle getirmek gerekir."],
    ["Seri bağlı yayların eşdeğer sabiti nasıl bulunur?", "Seri bağlı yaylarda eşdeğer sabitin tersi, sabitlerin terslerinin toplamıdır: 1/k = 1/k₁ + 1/k₂. 200 ve 300 N/m'lik yaylar seri bağlanınca eşdeğer sabit 120 N/m olur."],
    ["Paralel bağlı yaylarda yay sabiti nasıl değişir?", "Paralel bağlı yaylarda eşdeğer sabit, yay sabitlerinin toplamıdır: k = k₁ + k₂. 200 ve 300 N/m'lik yaylar paralel bağlanınca 500 N/m olur ve sistem daha sert davranır."],
    ["Esneklik sınırı aşılırsa ne olur?", "Esneklik sınırı aşıldığında yay kuvvet kaldırılınca eski boyuna dönmez ve kalıcı olarak uzar; Hooke yasası artık geçerli değildir. Kuvvet artmaya devam ederse malzeme kopar."],
    ["Dinamometre Hooke yasasıyla nasıl çalışır?", "Dinamometrede yay sabiti bilinen bir yay vardır ve uzama kuvvetle doğru orantılı olduğu için eşit aralıklı bir ölçek doğrudan newton cinsinden kuvveti gösterir."],
    ["Yayda depolanan enerji nasıl hesaplanır?", "Yayda depolanan esneklik potansiyel enerjisi E = ½·k·x² formülüyle bulunur. 200 N/m'lik yay 5 cm uzatıldığında 0,25 J, 10 cm uzatıldığında 1 J enerji depolar."],
    ["Bir yay ikiye kesilirse yay sabiti ne olur?", "Bir yay tam ortasından ikiye kesildiğinde her parçanın yay sabiti iki katına çıkar. Çünkü aynı kuvvet altında her yarı, tüm yayın uzamasının yarısı kadar uzar."]
  ],
  tools: ["yay-sabiti-hesapla", "kuvvet-hesapla", "potansiyel-enerji-hesapla"],
  related: ["newtonun-hareket-yasalari", "kinetik-ve-potansiyel-enerji", "seri-ve-paralel-direnc-hesaplama", "basit-sarkac-periyodu-formulu"]
};
