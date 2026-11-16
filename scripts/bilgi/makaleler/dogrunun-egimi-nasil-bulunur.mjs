export default {
  slug: "dogrunun-egimi-nasil-bulunur",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Doğrunun Eğimi Nasıl Bulunur? İki Noktadan Doğru Denklemi ve Uzaklık",
  pageTitle: "Doğrunun Eğimi Nasıl Bulunur? Formül, Denklem ve Örnekler",
  description: "Doğrunun eğimi m = (y₂ − y₁) ÷ (x₂ − x₁) ile bulunur. İki noktadan doğru denklemi, eğim açısı, paralel ve dik doğrular, uzaklık ve orta nokta çözümlü örneklerle.",
  keywords: ["doğrunun eğimi", "eğim nasıl bulunur", "iki noktadan geçen doğru denklemi", "eğim formülü", "iki nokta arası uzaklık", "orta nokta formülü", "paralel ve dik doğruların eğimi", "analitik geometri"],
  lead: "İki noktası bilinen bir doğrunun eğimi, y değerlerindeki değişimin x değerlerindeki değişime bölünmesiyle bulunur: <strong>m = (y₂ − y₁) ÷ (x₂ − x₁)</strong>. Eğim, x bir birim arttığında y'nin ne kadar değiştiğini gösterir; pozitifse doğru sağa doğru yükselir, negatifse alçalır. Bu sayfada eğim formülünü, iki noktadan doğru denklemi yazmayı, eğim açısını, paralel ve dik doğruları, iki nokta arası uzaklığı ve orta noktayı adım adım çözümlü örneklerle bulacaksınız.",
  kisaCevap: [
    "Eğim formülü: m = (y₂ − y₁) ÷ (x₂ − x₁); A(2, 3) ve B(6, 11) için m = 8 ÷ 4 = 2.",
    "İki noktadan geçen doğru: y − y₁ = m(x − x₁); örnekte y = 2x − 1.",
    "y = mx + n denkleminde m eğimi, n doğrunun y eksenini kestiği noktanın ordinatını gösterir.",
    "Eğim açısı α ile eğim arasında m = tan α ilişkisi vardır; m = 1 ise α = 45°'dir.",
    "Paralel doğruların eğimleri eşittir; dik doğruların eğimleri çarpımı −1'dir.",
    "İki nokta arası uzaklık √((x₂ − x₁)² + (y₂ − y₁)²), orta nokta ((x₁ + x₂) ÷ 2, (y₁ + y₂) ÷ 2) formülüyle bulunur."
  ],
  figure: {
    alt: "Koordinat düzleminde A(2, 3) ve B(6, 11) noktalarından geçen y = 2x − 1 doğrusu; yatay değişim 4, düşey değişim 8 olarak dik üçgenle gösteriliyor, orta nokta M(4, 7) işaretli.",
    caption: "Eğim, dik üçgenin düşey kenarının yatay kenarına oranıdır: 8 ÷ 4 = 2. Aynı üçgenin hipotenüsü iki nokta arasındaki uzaklığı (√80 ≈ 8,94), doğru parçasının ortası orta noktayı verir.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ucx" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="t2"/></marker></defs>
  <g class="sb" fill="none">
    <line x1="95" y1="60" x2="95" y2="410"/><line x1="120" y1="60" x2="120" y2="410"/><line x1="145" y1="60" x2="145" y2="410"/>
    <line x1="170" y1="60" x2="170" y2="410"/><line x1="195" y1="60" x2="195" y2="410"/><line x1="220" y1="60" x2="220" y2="410"/>
    <line x1="245" y1="60" x2="245" y2="410"/><line x1="270" y1="60" x2="270" y2="410"/>
    <line x1="40" y1="345" x2="300" y2="345"/><line x1="40" y1="295" x2="300" y2="295"/><line x1="40" y1="245" x2="300" y2="245"/>
    <line x1="40" y1="195" x2="300" y2="195"/><line x1="40" y1="145" x2="300" y2="145"/><line x1="40" y1="95" x2="300" y2="95"/>
  </g>
  <line x1="40" y1="370" x2="305" y2="370" class="st" fill="none" marker-end="url(#ucx)"/>
  <line x1="70" y1="415" x2="70" y2="50" class="st" fill="none" marker-end="url(#ucx)"/>
  <text x="300" y="390" class="sm">x</text><text x="78" y="56" class="sm">y</text>
  <g class="sm mid mu"><text x="120" y="388">2</text><text x="170" y="388">4</text><text x="220" y="388">6</text></g>
  <g class="sm end mu"><text x="62" y="299">3</text><text x="62" y="199">7</text><text x="62" y="99">11</text></g>
  <line x1="70" y1="395" x2="232" y2="70" class="sp sw" fill="none"/>
  <line x1="120" y1="295" x2="220" y2="295" class="sok sw" fill="none"/>
  <line x1="220" y1="295" x2="220" y2="95" class="sdg sw" fill="none"/>
  <text x="170" y="316" class="sm mid ok b">Δx = 4</text>
  <text x="228" y="200" class="sm dg b">Δy = 8</text>
  <circle cx="120" cy="295" r="6" class="p"/><text x="92" y="284" class="sm b">A(2, 3)</text>
  <circle cx="220" cy="95" r="6" class="p"/><text x="150" y="88" class="sm b">B(6, 11)</text>
  <circle cx="170" cy="195" r="5" class="a"/><text x="110" y="190" class="sm b">M(4, 7)</text>
  <text x="80" y="408" class="sm mu">n = −1</text>
  <rect x="340" y="40" width="360" height="74" rx="10" class="p"/>
  <text x="520" y="68" class="sm mid sf">Eğim</text>
  <text x="520" y="100" class="lg b mid sf">m = (11 − 3) ÷ (6 − 2) = 2</text>
  <rect x="340" y="126" width="360" height="74" rx="10" class="ps"/>
  <text x="520" y="154" class="sm mid">Doğru denklemi</text>
  <text x="520" y="186" class="lg b mid">y − 3 = 2(x − 2) → y = 2x − 1</text>
  <rect x="340" y="212" width="360" height="74" rx="10" class="sf sb"/>
  <text x="520" y="240" class="sm mid mu">Uzaklık |AB|</text>
  <text x="520" y="272" class="lg b mid">√(4² + 8²) = √80 ≈ 8,94</text>
  <rect x="340" y="298" width="360" height="74" rx="10" class="sf sb"/>
  <text x="520" y="326" class="sm mid mu">Orta nokta ve eğim açısı</text>
  <text x="520" y="358" class="lg b mid">M(4, 7) · tan α = 2 → α ≈ 63,4°</text>
  <text x="520" y="404" class="sm mid t2">Paralel doğru eğimi 2 · dik doğru eğimi −1/2</text>
</svg>`
  },
  sections: [
    {
      h: "Eğim nedir, neyi gösterir?",
      p: [
        "Analitik geometride bir doğrunun <strong>eğimi</strong>, doğrunun ne kadar dik olduğunu ve hangi yöne yöneldiğini gösteren sayıdır. Doğru üzerinde bir noktadan diğerine giderken x bir birim arttığında y'nin kaç birim değiştiğini anlatır. Genellikle <strong>m</strong> harfiyle gösterilir.",
        "Eğim pozitifse doğru soldan sağa yükselir; negatifse alçalır. Eğim sıfırsa doğru yataydır, yani x eksenine paraleldir. Düşey doğrularda ise x değişmediği için payda sıfır olur ve eğim <strong>tanımsızdır</strong>. Eğimin mutlak değeri büyüdükçe doğru dikleşir: eğimi 5 olan doğru, eğimi 1 olan doğrudan çok daha diktir."
      ],
      table: {
        head: ["Eğim değeri", "Doğrunun görünümü", "Örnek denklem"],
        rows: [
          ["m > 0", "Sağa doğru yükselir", "y = 2x − 1"],
          ["m < 0", "Sağa doğru alçalır", "y = −1,5x + 2,5"],
          ["m = 0", "Yatay doğru", "y = 4"],
          ["Tanımsız", "Düşey doğru", "x = 3"],
          ["m = 1", "45° açıyla yükselir", "y = x"]
        ]
      }
    },
    {
      h: "Doğrunun eğimi nasıl bulunur? Formül",
      p: [
        "Doğru üzerindeki iki noktanın koordinatları A(x₁, y₁) ve B(x₂, y₂) olarak biliniyorsa eğim, düşey değişimin yatay değişime oranıdır. Bu oran, iki nokta arasında çizilen dik üçgenin düşey kenarının yatay kenarına bölünmesine karşılık gelir."
      ],
      formula: "m = (y₂ − y₁) ÷ (x₂ − x₁) = Δy ÷ Δx\nax + by + c = 0 biçimindeki doğruda m = −a ÷ b\ny = mx + n biçimindeki doğruda eğim doğrudan m'dir",
      after: [
        "Noktaların hangisini birinci, hangisini ikinci aldığınız sonucu değiştirmez; yeter ki pay ve paydada aynı sırayı kullanın. (11 − 3) ÷ (6 − 2) ile (3 − 11) ÷ (2 − 6) aynı sonucu, yani 2'yi verir. Payda ile payın sırasını karıştırmak ise en sık yapılan hatadır: (6 − 2) ÷ (11 − 3) = 0,5 yanlış sonuçtur.",
        "Bu hesabı ve eğim açısını, yüzde eğimi ve yatay ya da düşey doğru olup olmadığını [[arac:egim-hesapla|Eğim Hesaplama aracı]] tek adımda gösterir."
      ]
    },
    {
      h: "Çözümlü örnek 1: A(2, 3) ve B(6, 11) noktalarından geçen doğru",
      ol: [
        "Eğimi bulun: m = (11 − 3) ÷ (6 − 2) = 8 ÷ 4 = 2. Doğru sağa doğru yükselir; x bir arttığında y iki artar.",
        "Nokta-eğim formülünü A noktasıyla yazın: y − 3 = 2(x − 2).",
        "Parantezi açın: y − 3 = 2x − 4, buradan y = 2x − 1.",
        "Kontrol için B noktasını yerine koyun: 2 × 6 − 1 = 11. Sonuç B'nin ordinatına eşit, denklem doğru.",
        "Genel biçime çevirin: 2x − y − 1 = 0. Buradan da m = −a ÷ b = −2 ÷ (−1) = 2 bulunur.",
        "Eksenleri kestiği noktalar: x = 0 için y = −1, yani (0, −1); y = 0 için x = 0,5, yani (0,5; 0)."
      ],
      after: [
        "Görseldeki dik üçgen bu örneği gösterir: yatay kenar 4, düşey kenar 8 birimdir. Denklemi iki noktadan doğrudan bulmak ve genel biçimi görmek için [[arac:dogru-denklemi-bul|Doğru Denklemi Bulma aracı]] kullanılabilir."
      ]
    },
    {
      h: "Çözümlü örnek 2: negatif eğimli doğru",
      p: [
        "A(−1, 4) ve B(3, −2) noktalarından geçen doğruyu bulalım. Negatif koordinatlarda işaret hatası yapmamak için çıkarma işlemlerini parantezle yazmak işinizi kolaylaştırır."
      ],
      ol: [
        "Eğim: m = (−2 − 4) ÷ (3 − (−1)) = −6 ÷ 4 = −3/2 = −1,5. Doğru sağa doğru alçalır.",
        "Nokta-eğim formülü: y − 4 = −1,5 (x − (−1)) = −1,5 (x + 1).",
        "Düzenleyin: y − 4 = −1,5x − 1,5, buradan y = −1,5x + 2,5.",
        "Kontrol: x = 3 için y = −4,5 + 2,5 = −2. B noktası doğrunun üzerinde.",
        "Kesirden kurtulmak için her tarafı 2 ile çarpıp genel biçime getirin: 3x + 2y − 5 = 0."
      ]
    },
    {
      h: "y = mx + n denkleminde m ve n neyi gösterir?",
      p: [
        "y = mx + n, doğru denkleminin en çok kullanılan biçimidir ve \"eğim-kesim biçimi\" olarak da bilinir. Burada <strong>m</strong> doğrunun eğimidir, <strong>n</strong> ise doğrunun y eksenini kestiği noktanın ordinatıdır. Yani doğru her zaman (0, n) noktasından geçer. Örnekteki y = 2x − 1 doğrusu y eksenini (0, −1) noktasında keser.",
        "Bu biçim, grafiği çizmeyi çok kolaylaştırır: önce y eksenindeki (0, n) noktasını işaretler, sonra eğim kadar \"bir sağa, m yukarı\" giderek ikinci noktayı bulursunuz. n = 0 ise doğru orijinden geçer ve y = mx biçimini alır; bu doğrular doğru orantıyı temsil eder."
      ]
    },
    {
      h: "Eğim açısı ile eğim arasındaki ilişki nedir?",
      p: [
        "Doğrunun x ekseninin pozitif yönüyle yaptığı açıya <strong>eğim açısı</strong> denir ve α ile gösterilir. Eğim, bu açının tanjantına eşittir: <strong>m = tan α</strong>. Eğim açısı 0° ile 180° arasında olur; dar açılarda eğim pozitif, geniş açılarda negatiftir. 90°'de tanjant tanımsız olduğu için düşey doğrunun eğimi de tanımsızdır."
      ],
      table: {
        head: ["Eğim açısı α", "tan α (eğim)", "Yorum"],
        rows: [
          ["0°", "0", "Yatay doğru"],
          ["30°", "√3/3 ≈ 0,577", "Hafif yükselen"],
          ["45°", "1", "x ile y eşit artar"],
          ["60°", "√3 ≈ 1,732", "Dik yükselen"],
          ["90°", "Tanımsız", "Düşey doğru"],
          ["135°", "−1", "45° ile alçalan"]
        ]
      },
      after: [
        "Örnek 1'deki doğrunun eğimi 2 olduğu için eğim açısı tan α = 2 eşitliğinden α ≈ 63,43° bulunur. Tanjant değerlerinin tamamı için [[bilgi:trigonometri-sin-cos-tan-tablosu|trigonometri tablosu]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Paralel ve dik doğruların eğimleri nasıldır?",
      p: [
        "İki doğru <strong>paralelse</strong> aynı açıyla eğildikleri için eğimleri eşittir: m₁ = m₂. Örneğin y = 2x − 1 ile y = 2x + 5 paraleldir; hiç kesişmezler. Eğimleri eşit ve n değerleri de aynıysa iki denklem aynı doğruyu gösterir, yani doğrular çakışıktır.",
        "İki doğru <strong>dikse</strong>, yani 90° açıyla kesişiyorsa eğimlerinin çarpımı −1'dir: m₁ × m₂ = −1. Buna göre y = 2x − 1 doğrusuna dik olan bir doğrunun eğimi −1/2'dir. Dik doğrunun eğimini bulmanın kısa yolu, eğimi ters çevirip işaretini değiştirmektir: 2 → −1/2, −3/4 → 4/3. Yatay ve düşey doğrular bu kuralın özel durumudur; birinin eğimi 0, diğerininki tanımsızdır ama yine de birbirlerine diktirler."
      ],
      ol: [
        "Soru: A(2, 3) noktasından geçen ve y = 2x − 1 doğrusuna dik olan doğruyu bulun.",
        "Dik doğrunun eğimi: m = −1/2.",
        "Nokta-eğim formülü: y − 3 = −1/2 (x − 2).",
        "Düzenleyin: y = −0,5x + 4. Kontrol: 2 × (−0,5) = −1, eğimlerin çarpımı −1'dir."
      ]
    },
    {
      h: "İki nokta arası uzaklık ve orta nokta formülü",
      p: [
        "İki nokta arasındaki uzaklık, Pisagor teoreminin koordinat düzlemindeki uygulamasıdır. Yatay değişim ve düşey değişim bir dik üçgenin dik kenarlarını, iki nokta arasındaki doğru parçası ise hipotenüsü oluşturur. Teoremin kendisi için [[bilgi:pisagor-teoremi-nedir|Pisagor teoremi]] yazısına göz atabilirsiniz."
      ],
      formula: "|AB| = √((x₂ − x₁)² + (y₂ − y₁)²)\nOrta nokta M = ((x₁ + x₂) ÷ 2, (y₁ + y₂) ÷ 2)",
      after: [
        "Örnek 1'de |AB| = √(4² + 8²) = √(16 + 64) = √80 = 4√5 ≈ 8,94 birimdir. Orta nokta ise ((2 + 6) ÷ 2, (3 + 11) ÷ 2) = (4, 7) olur. Orta noktanın doğru denklemini sağladığını kontrol edebilirsiniz: 2 × 4 − 1 = 7.",
        "Kök sadeleştirme için [[bilgi:karekok-nasil-alinir|karekök nasıl alınır]] yazısı yardımcı olur. Uzaklığı düzlemde ya da üç boyutlu uzayda [[arac:iki-nokta-arasi-uzaklik|İki Nokta Arası Uzaklık aracı]], orta noktayı ya da bir uç ile orta noktadan diğer ucu [[arac:orta-nokta-hesapla|Orta Nokta Hesaplama aracı]] bulur."
      ]
    },
    {
      h: "Eğim yüzdesi ile matematikteki eğim aynı mı?",
      p: [
        "Yol, rampa ve çatı gibi gündelik uygulamalarda eğim genellikle yüzde olarak verilir. Yüzde eğim, matematiksel eğimin 100 ile çarpılmasıdır: <strong>%8 eğimli yol</strong>, yatayda 100 metre ilerlediğinizde 8 metre yükselen yol demektir ve matematiksel eğimi 0,08'dir. Bu yolun eğim açısı tan α = 0,08 eşitliğinden yaklaşık 4,57° bulunur.",
        "Yüzde eğim ile açı birbirine karıştırılmamalıdır. %100 eğim 45°'ye karşılık gelir, 90° değil; çünkü %100, yatay ve düşey değişimin eşit olduğu durumdur. Örnek 1'deki doğrunun eğimi 2 olduğu için yüzde eğimi %200'dür."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Payı ve paydayı ters yazmak:</strong> Eğim Δy ÷ Δx'tir; Δx ÷ Δy değil.",
        "<strong>Sırayı karıştırmak:</strong> Paya (y₂ − y₁) yazıp paydada (x₁ − x₂) kullanmak işaret hatası doğurur.",
        "<strong>Negatif sayıyı çıkarırken parantez unutmak:</strong> 3 − (−1) = 4'tür, 2 değil.",
        "<strong>Düşey doğruya eğim vermek:</strong> x₁ = x₂ ise payda sıfırdır; eğim tanımsızdır, sonsuz ya da sıfır değildir.",
        "<strong>Dik doğruda yalnızca işareti değiştirmek:</strong> 2'ye dik doğrunun eğimi −2 değil, −1/2'dir.",
        "<strong>Genel biçimde işareti kaçırmak:</strong> ax + by + c = 0 için eğim −a ÷ b'dir; eksi işareti unutulmamalıdır."
      ]
    }
  ],
  faq: [
    ["Doğrunun eğimi nasıl bulunur?", "İki noktanın y değerleri farkı, x değerleri farkına bölünür: m = (y₂ − y₁) ÷ (x₂ − x₁). Örneğin A(2, 3) ve B(6, 11) noktaları için eğim 8 ÷ 4 = 2'dir. Denklem y = mx + n biçimindeyse eğim doğrudan m katsayısıdır."],
    ["İki noktası bilinen doğrunun denklemi nasıl yazılır?", "Önce eğim bulunur, sonra noktalardan biriyle y − y₁ = m(x − x₁) formülü yazılıp düzenlenir. A(2, 3) ve eğim 2 için y − 3 = 2(x − 2) yazılır ve y = 2x − 1 elde edilir. Diğer noktayı yerine koyarak kontrol yapılır."],
    ["Eğim açısı ile eğim arasındaki ilişki nedir?", "Eğim, doğrunun x ekseninin pozitif yönüyle yaptığı açının tanjantına eşittir: m = tan α. Eğim 1 ise açı 45°, eğim 0 ise açı 0°'dir. Açı 90° olduğunda tanjant tanımsız olduğu için düşey doğrunun eğimi de tanımsızdır."],
    ["Paralel ve dik doğruların eğimleri nasıldır?", "Paralel doğruların eğimleri birbirine eşittir. Dik doğruların eğimlerinin çarpımı −1'dir; bu yüzden bir doğrunun eğimi 2 ise ona dik doğrunun eğimi −1/2 olur. Yatay ve düşey doğrular bu kuralın özel durumu olarak birbirine diktir."],
    ["İki nokta arası uzaklık formülü nedir?", "Uzaklık, koordinat farklarının kareleri toplamının kareköküdür: √((x₂ − x₁)² + (y₂ − y₁)²). A(2, 3) ve B(6, 11) için √(16 + 64) = √80 ≈ 8,94 birim bulunur. Formül Pisagor teoreminin koordinat düzlemindeki karşılığıdır."],
    ["Orta nokta nasıl bulunur?", "İki noktanın x koordinatlarının ortalaması ile y koordinatlarının ortalaması alınır: M = ((x₁ + x₂) ÷ 2, (y₁ + y₂) ÷ 2). A(2, 3) ve B(6, 11) noktalarının orta noktası (4, 7)'dir ve doğru denklemini sağlar."],
    ["y = mx + n denkleminde m ve n neyi gösterir?", "m doğrunun eğimini, n ise doğrunun y eksenini kestiği noktanın ordinatını gösterir; doğru her zaman (0, n) noktasından geçer. n sıfırsa doğru orijinden geçer. y = 2x − 1 doğrusunun eğimi 2'dir ve y eksenini −1'de keser."],
    ["Eğim yüzdesi ile matematikteki eğim aynı mı?", "Aynı oranı farklı biçimde ifade ederler. Yüzde eğim, matematiksel eğimin 100 ile çarpımıdır; %8 eğim 0,08'e ve yaklaşık 4,57° açıya karşılık gelir. %100 eğim ise 90° değil 45° demektir, çünkü yatay ve düşey değişim eşittir."],
    ["Düşey doğrunun eğimi neden tanımsızdır?", "Düşey doğru üzerindeki tüm noktaların x koordinatı aynıdır, bu yüzden eğim formülünün paydası sıfır olur. Sıfıra bölme tanımsız olduğu için eğim de tanımsızdır. Bu doğrular x = 3 gibi tek bir x değeriyle yazılır."]
  ],
  tools: ["egim-hesapla", "dogru-denklemi-bul", "iki-nokta-arasi-uzaklik", "orta-nokta-hesapla"],
  related: ["pisagor-teoremi-nedir", "trigonometri-sin-cos-tan-tablosu", "karekok-nasil-alinir"],
  sources: [
    ["MEB – Ortaöğretim matematik dersi öğretim programı", "https://www.meb.gov.tr/"]
  ]
};
