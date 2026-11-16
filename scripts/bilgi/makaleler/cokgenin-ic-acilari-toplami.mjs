export default {
  slug: "cokgenin-ic-acilari-toplami",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Çokgenin İç Açıları Toplamı Formülü: Köşegen Sayısı ve Düzgün Çokgenler",
  pageTitle: "Çokgenin İç Açıları Toplamı: (n−2)·180 Formülü ve Örnekler",
  description: "Çokgenin iç açıları toplamı (n−2)·180° formülüyle bulunur. Dış açılar toplamı, köşegen sayısı, düzgün çokgenin iç açısı ve alanı için çözümlü sınav örnekleri.",
  keywords: ["çokgenin iç açıları toplamı", "iç açılar toplamı formülü", "altıgenin iç açıları", "beşgenin iç açıları toplamı", "köşegen sayısı formülü", "dış açılar toplamı", "düzgün çokgen alanı", "düzgün çokgenin bir iç açısı"],
  lead: "n kenarlı bir çokgenin iç açıları toplamı <strong>(n − 2) · 180°</strong> formülüyle bulunur: beşgende 540°, altıgende 720°, sekizgende 1080°'dir. Formül, çokgenin bir köşesinden çizilen köşegenlerin onu n − 2 üçgene ayırmasından gelir. Dış açılar toplamı ise kenar sayısından bağımsız olarak her zaman 360°'dir. Bu sayfada formüllerin nereden geldiğini, düzgün çokgenin iç ve dış açısını, köşegen sayısını ve alanı çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "İç açılar toplamı = (n − 2) · 180°; n kenar sayısıdır.",
    "Düzgün çokgenin bir iç açısı = (n − 2) · 180° ÷ n; düzgün altıgende 120°'dir.",
    "Dışbükey bir çokgenin dış açılar toplamı her zaman 360°'dir; düzgün çokgenin bir dış açısı 360° ÷ n'dir.",
    "Köşegen sayısı = n · (n − 3) ÷ 2; bir köşeden n − 3 köşegen çıkar.",
    "Bir iç açısı verilen düzgün çokgenin kenar sayısı: n = 360° ÷ (180° − iç açı).",
    "Düzgün çokgenin alanı = çevre × apotem ÷ 2; düzgün altıgende alan = (3√3 ÷ 2) · a²."
  ],
  figure: {
    alt: "Düzgün altıgenin bir köşesinden çizilen üç köşegen altıgeni dört üçgene ayırıyor; her üçgen 180° olduğu için iç açılar toplamı 4 × 180 = 720°. Yanda formüller ve beşgenden ongene iç açı tablosu var.",
    caption: "Altıgenin bir köşesinden 6 − 3 = 3 köşegen çizilir ve altıgen 6 − 2 = 4 üçgene bölünür. Üçgenlerin açıları altıgenin iç açılarını tam olarak oluşturduğu için toplam 4 × 180° = 720° olur.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="32" class="lg b mid">Neden (n − 2) · 180°?</text>
  <polygon points="350,215 275,85 125,85 50,215 125,345 275,345" class="ps"/>
  <polygon points="350,215 275,85 125,85 50,215 125,345 275,345" class="sp sw" fill="none"/>
  <line x1="350" y1="215" x2="125" y2="85" class="sp dash" fill="none"/>
  <line x1="350" y1="215" x2="50" y2="215" class="sp dash" fill="none"/>
  <line x1="350" y1="215" x2="125" y2="345" class="sp dash" fill="none"/>
  <circle cx="350" cy="215" r="7" class="p"/>
  <g class="b mid">
    <text x="250" y="134">1</text><text x="175" y="177">2</text><text x="175" y="264">3</text><text x="250" y="307">4</text>
  </g>
  <text x="200" y="380" class="b mid">Altıgen: 4 üçgen × 180° = 720°</text>
  <text x="200" y="404" class="sm mid t2">Bir iç açı: 720° ÷ 6 = 120°</text>
  <rect x="400" y="60" width="300" height="116" rx="8" class="p"/>
  <text x="550" y="90" class="b mid sf">İç açılar toplamı</text>
  <text x="550" y="122" class="xl mid sf">(n − 2) · 180°</text>
  <text x="550" y="154" class="sm mid sf">Dış açılar toplamı: her zaman 360°</text>
  <g class="sm">
    <rect x="400" y="192" width="300" height="214" rx="8" class="sf sb"/>
    <text x="420" y="218" class="b">Çokgen</text><text x="560" y="218" class="b mid">Toplam</text><text x="670" y="218" class="b mid">Bir iç açı</text>
    <line x1="410" y1="228" x2="690" y2="228" class="sb" fill="none"/>
    <text x="420" y="252">Beşgen (5)</text><text x="560" y="252" class="mid">540°</text><text x="670" y="252" class="mid">108°</text>
    <text x="420" y="278">Altıgen (6)</text><text x="560" y="278" class="mid p b">720°</text><text x="670" y="278" class="mid p b">120°</text>
    <text x="420" y="304">Sekizgen (8)</text><text x="560" y="304" class="mid">1080°</text><text x="670" y="304" class="mid">135°</text>
    <text x="420" y="330">Dokuzgen (9)</text><text x="560" y="330" class="mid">1260°</text><text x="670" y="330" class="mid">140°</text>
    <text x="420" y="356">Ongen (10)</text><text x="560" y="356" class="mid">1440°</text><text x="670" y="356" class="mid">144°</text>
    <text x="420" y="382">On ikigen (12)</text><text x="560" y="382" class="mid">1800°</text><text x="670" y="382" class="mid">150°</text>
  </g>
</svg>`
  },
  sections: [
    {
      h: "Çokgen nedir? Temel kavramlar",
      p: [
        "Çokgen, en az üç doğru parçasının uç uca eklenmesiyle oluşan kapalı düzlemsel şekildir. Doğru parçalarına <strong>kenar</strong>, iki kenarın birleştiği noktalara <strong>köşe</strong> denir. Bir çokgenin kenar sayısı ile köşe sayısı her zaman eşittir ve genellikle n harfiyle gösterilir. En az kenarlı çokgen üçgendir (n = 3).",
        "Çokgenin içinde, iki komşu kenar arasında kalan açıya <strong>iç açı</strong>; bir kenarın uzantısıyla komşu kenar arasında kalan açıya <strong>dış açı</strong> denir. Aynı köşedeki iç açı ile dış açı bütünlerdir, yani toplamları 180°'dir. Komşu olmayan iki köşeyi birleştiren doğru parçasına ise <strong>köşegen</strong> denir.",
        "Bütün kenar uzunlukları ve bütün iç açıları eşit olan çokgene <strong>düzgün çokgen</strong> denir: eşkenar üçgen, kare, düzgün beşgen ve düzgün altıgen bunlara örnektir. Tüm iç açıları 180°'den küçük olan çokgene dışbükey, en az bir iç açısı 180°'den büyük olan çokgene içbükey çokgen denir."
      ]
    },
    {
      h: "(n − 2) · 180 formülü nereden gelir?",
      p: [
        "Formülün ispatı üçgenin iç açıları toplamının 180° olmasına dayanır. Çokgenin herhangi bir köşesini seçin ve bu köşeden komşu olmayan bütün köşelere köşegen çizin. Seçtiğiniz köşe kendisine ve iki komşusuna köşegen çizemeyeceği için n − 3 köşegen çizilir ve bu köşegenler çokgeni <strong>n − 2 üçgene</strong> ayırır.",
        "Oluşan üçgenlerin açıları birlikte çokgenin iç açılarını tam olarak kaplar; ne eksik ne fazla açı kalır. Her üçgenin açıları toplamı 180° olduğuna göre çokgenin iç açıları toplamı (n − 2) · 180° olur. Örneğin beşgende bir köşeden 2 köşegen çizilir, beşgen 3 üçgene ayrılır ve toplam 3 · 180° = 540° bulunur."
      ],
      formula: "İç açılar toplamı: S = (n − 2) · 180°\nBir köşeden çizilen köşegen: n − 3\nOluşan üçgen sayısı: n − 2",
      after: [
        "Bu formül yalnızca dışbükey çokgenlerde değil, kenarları birbirini kesmeyen içbükey çokgenlerde de geçerlidir. Üçgenin açılarıyla ilgili temel kurallar için [[bilgi:ucgende-acilar|üçgende açılar]] yazısına göz atabilirsiniz."
      ]
    },
    {
      h: "Düzgün çokgende bir iç açı ve bir dış açı",
      p: [
        "Düzgün çokgenin bütün iç açıları eşit olduğu için bir iç açıyı bulmak için toplamı kenar sayısına bölmeniz yeterlidir. Dış açı ise iç açının bütünleridir. Daha kısa yol, dış açıyı doğrudan 360° ÷ n ile hesaplamaktır."
      ],
      formula: "Bir iç açı = (n − 2) · 180° ÷ n\nBir dış açı = 360° ÷ n\nİç açı + dış açı = 180°",
      table: {
        head: ["Kenar sayısı (n)", "Çokgen", "İç açılar toplamı", "Bir iç açı", "Bir dış açı", "Köşegen sayısı"],
        rows: [
          ["3", "Eşkenar üçgen", "180°", "60°", "120°", "0"],
          ["4", "Kare", "360°", "90°", "90°", "2"],
          ["5", "Düzgün beşgen", "540°", "108°", "72°", "5"],
          ["6", "Düzgün altıgen", "720°", "120°", "60°", "9"],
          ["7", "Düzgün yedigen", "900°", "≈ 128,57°", "≈ 51,43°", "14"],
          ["8", "Düzgün sekizgen", "1080°", "135°", "45°", "20"],
          ["10", "Düzgün ongen", "1440°", "144°", "36°", "35"],
          ["12", "Düzgün on ikigen", "1800°", "150°", "30°", "54"],
          ["20", "Düzgün yirmigen", "3240°", "162°", "18°", "170"]
        ],
        caption: "Kenar sayısı arttıkça bir iç açı 180°'ye yaklaşır, dış açı küçülür ve çokgen daireye benzemeye başlar."
      }
    },
    {
      h: "Dış açılar toplamı neden her zaman 360°?",
      p: [
        "Dışbükey bir çokgende her köşedeki iç açı ile dış açının toplamı 180°'dir. n köşe olduğuna göre bütün iç ve dış açıların toplamı n · 180° eder. Bundan iç açılar toplamını çıkarırsanız dış açılar toplamı kalır: n · 180° − (n − 2) · 180° = 360°. Görüldüğü gibi n sadeleşir ve sonuç kenar sayısından bağımsızdır.",
        "Sezgisel bir açıklama da vardır: Çokgenin çevresinde yürüdüğünüzü düşünün. Her köşede dış açı kadar dönersiniz ve başladığınız noktaya geldiğinizde tam bir tur, yani 360° dönmüş olursunuz. Üçgen de olsa yüz kenarlı bir çokgen de olsa bu tur değişmez."
      ]
    },
    {
      h: "Köşegen sayısı formülü",
      p: [
        "Her köşeden kendisine ve iki komşu köşeye köşegen çizilemez; bu yüzden her köşeden n − 3 köşegen çıkar. n köşe için bu n · (n − 3) eder. Ancak her köşegen iki ucundan iki kez sayıldığı için sonucu 2'ye bölmek gerekir."
      ],
      formula: "Köşegen sayısı: K = n · (n − 3) ÷ 2\nAltıgen: 6 · 3 ÷ 2 = 9 · Sekizgen: 8 · 5 ÷ 2 = 20 · Ongen: 10 · 7 ÷ 2 = 35",
      after: [
        "Ters soru da sık sorulur: \"Köşegen sayısı 54 olan çokgen kaç kenarlıdır?\" n · (n − 3) = 108 denklemini çözeriz. 12 · 9 = 108 olduğu için n = 12'dir; çokgen on ikigendir. Kenar sayısını yazarak iç açılar toplamını, bir iç ve dış açıyı ve köşegen sayısını birlikte görmek için [[arac:cokgen-ic-aci-hesapla|Çokgen İç Açı ve Köşegen Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Çözümlü sınav örnekleri",
      ol: [
        "<strong>Beşgenin iç açıları toplamı kaçtır?</strong> n = 5 → (5 − 2) · 180° = 3 · 180° = <strong>540°</strong>.",
        "<strong>Düzgün altıgenin bir iç açısı kaç derecedir?</strong> Toplam (6 − 2) · 180° = 720°; bir iç açı 720° ÷ 6 = <strong>120°</strong>. Kontrol: dış açı 360° ÷ 6 = 60°, 120° + 60° = 180°.",
        "<strong>İç açıları toplamı 1260° olan çokgen kaç kenarlıdır?</strong> (n − 2) · 180 = 1260 → n − 2 = 7 → <strong>n = 9</strong>; çokgen dokuzgendir.",
        "<strong>Bir iç açısı 140° olan düzgün çokgen kaç kenarlıdır?</strong> Dış açı 180° − 140° = 40°; n = 360° ÷ 40° = <strong>9</strong>.",
        "<strong>Bir iç açısı, bir dış açısının 4 katı olan düzgün çokgen kaç kenarlıdır?</strong> Dış açıya x dersek iç açı 4x olur: 4x + x = 180° → x = 36°. n = 360° ÷ 36° = <strong>10</strong>; çokgen ongendir.",
        "<strong>Bir beşgenin dört iç açısı 100°, 110°, 120° ve 95° ise beşinci açı kaçtır?</strong> Toplam 540° olmalı: 540 − (100 + 110 + 120 + 95) = 540 − 425 = <strong>115°</strong>."
      ],
      after: [
        "Bu tür sorularda önce iç açılar toplamını, sonra dış açıyı düşünmek çoğu zaman en kısa yoldur. Düzgün çokgen sorularında dış açı formülü (360° ÷ n) hesap yükünü belirgin biçimde azaltır."
      ]
    },
    {
      h: "Düzgün çokgenin alanı nasıl hesaplanır?",
      p: [
        "Düzgün bir çokgen, merkezinden köşelerine çizilen doğru parçalarıyla n tane eş ikizkenar üçgene ayrılır. Merkezin bir kenara olan dik uzaklığına <strong>apotem</strong> denir. Her küçük üçgenin alanı kenar × apotem ÷ 2 olduğundan çokgenin alanı çevre × apotem ÷ 2'dir. Apotem bilinmiyorsa trigonometri yardımıyla yalnızca kenar uzunluğundan hesaplanabilir."
      ],
      formula: "Alan = çevre × apotem ÷ 2 = n · a · r ÷ 2\nApotem: r = a ÷ (2 · tan(180° ÷ n))\nKenardan alan: A = n · a² ÷ (4 · tan(180° ÷ n))\nDüzgün altıgen: A = (3√3 ÷ 2) · a²",
      ul: [
        "<strong>Kenarı 6 cm olan düzgün altıgen:</strong> A = (3√3 ÷ 2) · 36 = 54√3 ≈ 93,53 cm². Altıgen 6 eşkenar üçgenden oluştuğu için 6 · (√3 ÷ 4) · 36 hesabı da aynı sonucu verir.",
        "<strong>Kenarı 10 cm olan düzgün beşgen:</strong> apotem 10 ÷ (2 · tan 36°) ≈ 6,88 cm; alan 50 · 6,88 ÷ 2 ≈ 172,05 cm².",
        "<strong>Kenarı 4 cm olan düzgün sekizgen:</strong> apotem 4 ÷ (2 · tan 22,5°) ≈ 4,83 cm; alan 32 · 4,83 ÷ 2 ≈ 77,25 cm²."
      ],
      after: [
        "Bu hesapları elle yapmak yerine [[arac:duzgun-cokgen-alani-hesapla|Düzgün Çokgen Alanı Hesaplama]] aracına kenar sayısını ve uzunluğunu yazabilirsiniz; altıgene özel hesaplar için [[arac:altigen-alani-hesapla|Altıgen Alanı Hesaplama]] aracı da var. Tangant değerlerini hatırlamak için [[bilgi:trigonometri-sin-cos-tan-tablosu|trigonometri tablosu]], diğer şekillerin alan formülleri için [[bilgi:alan-ve-hacim-formulleri|alan ve hacim formülleri]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Günlük hayatta çokgenler",
      p: [
        "Bal peteklerindeki altıgen hücreler, düzgün altıgenlerin düzlemi boşluksuz kaplayabilen az sayıdaki düzgün çokgenden biri olmasının güzel bir örneğidir. Bir noktada birleşen açıların toplamı 360° olmalıdır: altıgenin 120°'lik üç açısı (3 × 120° = 360°), karenin dört 90°'lik açısı ve eşkenar üçgenin altı 60°'lik açısı bu koşulu sağlar. Düzgün beşgenin 108°'lik açısı 360°'yi tam bölmediği için beşgenlerle boşluksuz döşeme yapılamaz.",
        "Dur levhasının sekizgen, futbol topunun beşgen ve altıgen parçalardan oluşması, yer karolarının ve parke desenlerinin tasarımı da aynı açı hesabına dayanır. Bir zemini altıgen karo ile kaplarken kaç karo gerektiğini bulmak için önce bir karonun alanını hesaplamanız gerekir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>n · 180 yazmak:</strong> Formül (n − 2) · 180'dir; n · 180 iç ve dış açıların birlikte toplamıdır.",
        "<strong>Düzgün olmayan çokgende tek açı hesaplamak:</strong> (n − 2) · 180 ÷ n yalnızca bütün açıları eşit olan düzgün çokgenlerde geçerlidir.",
        "<strong>Köşegen formülünde 2'ye bölmeyi unutmak:</strong> Her köşegen iki kez sayılır.",
        "<strong>Dış açıyı iç açıyla karıştırmak:</strong> Düzgün altıgende dış açı 60°, iç açı 120°'dir.",
        "<strong>Hesap makinesini radyanda bırakmak:</strong> tan 36° hesaplanırken makine derece modunda olmalıdır."
      ]
    }
  ],
  faq: [
    ["Çokgenin iç açıları toplamı nasıl bulunur?", "Kenar sayısından 2 çıkarılıp 180° ile çarpılır: (n − 2) · 180°. Örneğin altıgende (6 − 2) · 180° = 720°, sekizgende (8 − 2) · 180° = 1080° bulunur. Formül dışbükey ve kenarları kesişmeyen içbükey çokgenlerde geçerlidir."],
    ["(n−2)·180 formülü nereden gelir?", "Çokgenin bir köşesinden çizilen n − 3 köşegen onu n − 2 üçgene ayırır. Bu üçgenlerin açıları çokgenin iç açılarını tam olarak oluşturur ve her üçgenin açıları toplamı 180° olduğu için toplam (n − 2) · 180° olur."],
    ["Düzgün altıgenin bir iç açısı kaç derecedir?", "Düzgün altıgenin iç açıları toplamı 720°'dir ve altı açının hepsi eşit olduğu için bir iç açı 720° ÷ 6 = 120°'dir. Bir dış açısı ise 360° ÷ 6 = 60°'dir ve iki açının toplamı 180° eder."],
    ["Dış açılar toplamı neden her zaman 360°?", "Her köşede iç ve dış açı toplamı 180° olduğu için tüm açıların toplamı n · 180° eder. Bundan iç açılar toplamı (n − 2) · 180° çıkarılınca n sadeleşir ve 360° kalır; sonuç kenar sayısından bağımsızdır."],
    ["Köşegen sayısı formülü nedir?", "Köşegen sayısı n · (n − 3) ÷ 2 formülüyle bulunur. Her köşeden n − 3 köşegen çıkar ve her köşegen iki kez sayıldığı için 2'ye bölünür. Altıgende 9, sekizgende 20, ongende 35 köşegen vardır."],
    ["Düzgün çokgenin alanı nasıl hesaplanır?", "Alan, çevre ile apotemin çarpımının yarısıdır. Apotem bilinmiyorsa kenardan A = n · a² ÷ (4 · tan(180° ÷ n)) formülü kullanılır. Düzgün altıgende bu formül (3√3 ÷ 2) · a² biçimine sadeleşir."],
    ["Beşgenin iç açıları toplamı kaçtır?", "Beşgenin iç açıları toplamı (5 − 2) · 180° = 540°'dir. Beşgen düzgünse her bir iç açısı 540° ÷ 5 = 108°, her bir dış açısı 360° ÷ 5 = 72° olur."],
    ["Bir iç açısı verilen düzgün çokgenin kenar sayısı nasıl bulunur?", "Önce dış açı bulunur: 180° eksi iç açı. Sonra 360° bu dış açıya bölünür. Bir iç açısı 150° olan düzgün çokgenin dış açısı 30°'dir ve kenar sayısı 360° ÷ 30° = 12 olur."],
    ["Dörtgenin iç açıları toplamı neden 360°?", "Dörtgenin bir köşegeni onu iki üçgene ayırır ve iki üçgenin açıları toplamı 2 · 180° = 360° eder. Bu sonuç formülle de aynıdır: (4 − 2) · 180° = 360°. Kare, dikdörtgen ve yamuk için de geçerlidir."]
  ],
  tools: ["cokgen-ic-aci-hesapla", "duzgun-cokgen-alani-hesapla", "altigen-alani-hesapla"],
  related: ["ucgende-acilar", "alan-ve-hacim-formulleri", "trigonometri-sin-cos-tan-tablosu", "pisagor-teoremi-nedir"],
  sources: [
    ["Millî Eğitim Bakanlığı – Matematik dersi öğretim programı", "https://www.meb.gov.tr/"],
    ["MEB Eğitim Bilişim Ağı (EBA)", "https://www.eba.gov.tr/"]
  ]
};
