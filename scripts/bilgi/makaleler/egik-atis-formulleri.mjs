export default {
  slug: "egik-atis-formulleri",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Eğik Atış Formülleri: Menzil, Maksimum Yükseklik ve Uçuş Süresi Hesabı",
  pageTitle: "Eğik Atış Formülleri: Menzil, Maksimum Yükseklik, Uçuş Süresi",
  description: "Eğik atışta menzil R = v₀²·sin2θ/g, maksimum yükseklik h = v₀²·sin²θ/2g, uçuş süresi t = 2v₀·sinθ/g. 45° neden en uzak menzili verir, yatay atış farkı ve örnekler.",
  keywords: ["eğik atış formülleri", "eğik atış menzil", "maksimum yükseklik formülü", "uçuş süresi eğik atış", "45 derece menzil", "yatay atış", "eğik atış soru çözümü", "hız bileşenleri"],
  lead: "Eğik atış, yatayla θ açısı yapacak şekilde v₀ hızıyla fırlatılan bir cismin hava direnci olmadan yaptığı harekettir; aynı seviyeye düşen bir cisim için <strong>menzil R = v₀² · sin 2θ ÷ g</strong>, <strong>maksimum yükseklik h = v₀² · sin²θ ÷ 2g</strong> ve <strong>uçuş süresi t = 2 · v₀ · sin θ ÷ g</strong> formülleriyle hesaplanır. Örneğin 20 m/s hızla 30°'lik açıyla atılan bir cisim (g = 10 m/s²) 2 saniye havada kalır, 5 m yükselir ve 34,6 m uzağa düşer. Bu rehberde hızın bileşenlere ayrılmasını, formüllerin nereden geldiğini, 45° kuralını, yatay atışı ve sık yapılan hataları çözümlü örneklerle bulacaksınız.",
  kisaCevap: [
    "Hız bileşenleri: yatay v<sub>x</sub> = v₀ · cos θ (sabit kalır), düşey v<sub>y</sub> = v₀ · sin θ (g ile azalır).",
    "Tepe noktasına çıkış süresi t<sub>ç</sub> = v₀ · sin θ ÷ g; toplam uçuş süresi bunun iki katıdır.",
    "Maksimum yükseklik h<sub>max</sub> = (v₀ · sin θ)² ÷ (2g).",
    "Menzil R = v₀² · sin 2θ ÷ g; aynı hızla en uzak menzil 45°'de elde edilir ve R<sub>max</sub> = v₀² ÷ g olur.",
    "Toplamı 90° olan iki açı (ör. 30° ve 60°) aynı menzili verir; yüksek açıda cisim daha uzun süre havada kalır.",
    "Tepe noktasında hız sıfır değildir; düşey hız sıfırdır, yatay hız v₀ · cos θ olarak sürer."
  ],
  figure: {
    alt: "Eğik atışın parabol yörüngesi: 20 m/s ilk hız ve 30 derece açıyla atılan cismin hız bileşenleri 17,3 ve 10 m/s, tepe noktası 5 metre yükseklikte ve 1 saniyede, menzil 34,6 metre ve uçuş süresi 2 saniye olarak işaretli.",
    caption: "Cisim parabol çizer. Yatay hız (17,3 m/s) yol boyunca değişmez; düşey hız 10 m/s'den başlayıp tepe noktasında sıfıra iner, sonra aşağı yönde 10 m/s'ye ulaşır. Tepeye çıkış 1 s, iniş de 1 s sürer.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">v₀ = 20 m/s, θ = 30°, g = 10 m/s²</text>
  <line x1="60" y1="330" x2="680" y2="330" class="st sw" fill="none"/>
  <path d="M 70 330 Q 360 30 650 330" class="sp sw" fill="none"/>
  <line x1="70" y1="330" x2="190" y2="330" class="sa sw" fill="none"/>
  <polygon points="190,324 202,330 190,336" class="a"/>
  <line x1="70" y1="330" x2="70" y2="262" class="sok sw" fill="none"/>
  <polygon points="64,262 70,250 76,262" class="ok"/>
  <line x1="70" y1="330" x2="186" y2="263" class="sdg sw" fill="none"/>
  <polygon points="180,258 196,257 188,270" class="dg"/>
  <text x="200" y="350" class="sm b">vₓ = 17,3 m/s</text>
  <text x="22" y="246" class="sm ok b">v_y = 10</text>
  <text x="196" y="252" class="sm dg b">v₀ = 20</text>
  <path d="M 110 330 A 40 40 0 0 0 104 311" class="st" fill="none"/>
  <text x="118" y="320" class="sm b">30°</text>
  <circle cx="360" cy="180" r="7" class="p"/>
  <line x1="360" y1="180" x2="360" y2="330" class="sb dash" fill="none"/>
  <line x1="360" y1="180" x2="440" y2="180" class="sa" fill="none"/>
  <polygon points="440,175 450,180 440,185" class="a"/>
  <text x="372" y="168" class="sm b">tepe: v_y = 0, v = 17,3 m/s</text>
  <text x="368" y="262" class="sm">h = 5 m</text>
  <text x="368" y="280" class="sm">t = 1 s</text>
  <line x1="70" y1="374" x2="650" y2="374" class="sp" fill="none"/>
  <polygon points="78,368 66,374 78,380" class="p"/>
  <polygon points="642,368 654,374 642,380" class="p"/>
  <text x="360" y="398" class="b mid p">Menzil R = 34,6 m · Uçuş süresi 2 s</text>
  <rect x="520" y="56" width="180" height="96" rx="8" class="sf sb"/>
  <text x="610" y="80" class="sm mid b">Formüller</text>
  <text x="610" y="102" class="sm mid">R = v₀² sin2θ / g</text>
  <text x="610" y="122" class="sm mid">h = v₀² sin²θ / 2g</text>
  <text x="610" y="142" class="sm mid">t = 2 v₀ sinθ / g</text>
</svg>`
  },
  sections: [
    {
      h: "Eğik atış nedir?",
      p: [
        "Eğik atış, bir cismin yatayla 0° ile 90° arasında bir açı yapacak şekilde fırlatıldığı ve ardından yalnızca yer çekiminin etkisiyle hareket ettiği durumdur. Futbolda uzun bir pas, basketbolda şut, bir taşın göle atılması ya da bahçe hortumundan çıkan su eğik atışın günlük örnekleridir. Hava direnci ihmal edildiğinde cismin yörüngesi bir <strong>paraboldür</strong>.",
        "Eğik atışı çözmenin anahtarı, hareketi birbirinden bağımsız iki hareketin toplamı olarak görmektir. <strong>Yatay doğrultuda</strong> hiçbir kuvvet olmadığı için cisim sabit hızla ilerler (düzgün doğrusal hareket). <strong>Düşey doğrultuda</strong> ise yer çekimi ivmesi g etkisiyle önce yavaşlayarak yükselir, sonra hızlanarak düşer (düzgün değişen hareket). İki hareket aynı süre boyunca birlikte gerçekleşir; ortak değişken zamandır.",
        "Bu ilkeler Newton'un hareket yasalarına dayanır; temel kavramları tazelemek için [[bilgi:newtonun-hareket-yasalari|Newton'un hareket yasaları]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Hız bileşenleri sinüs ve kosinüsle nasıl ayrılır?",
      p: [
        "İlk hız vektörü v₀, yatay ve düşey iki bileşene ayrılır. Hız vektörü bir dik üçgenin hipotenüsü, bileşenler ise dik kenarlarıdır. Açıya komşu kenar (yatay) kosinüsle, karşı kenar (düşey) sinüsle bulunur."
      ],
      formula: "vₓ = v₀ · cos θ   (yol boyunca sabit)\nv_y(0) = v₀ · sin θ\nv_y(t) = v₀ · sin θ − g · t\nx(t) = v₀ · cos θ · t\ny(t) = v₀ · sin θ · t − ½ · g · t²",
      table: {
        head: ["Açı", "sin θ", "cos θ", "v₀ = 20 m/s için vₓ", "v₀ = 20 m/s için v_y"],
        rows: [
          ["30°", "0,5", "0,866", "17,32 m/s", "10 m/s"],
          ["37°", "0,6", "0,8", "16 m/s", "12 m/s"],
          ["45°", "0,707", "0,707", "14,14 m/s", "14,14 m/s"],
          ["53°", "0,8", "0,6", "12 m/s", "16 m/s"],
          ["60°", "0,866", "0,5", "10 m/s", "17,32 m/s"]
        ],
        caption: "37° ve 53° değerleri 3-4-5 üçgeninden gelen yaklaşık değerlerdir ve sınav sorularında sık kullanılır."
      },
      after: [
        "Açıların sinüs ve kosinüs değerlerini [[arac:sinus-hesapla|Sinüs Hesaplama]] ve [[arac:kosinus-hesapla|Kosinüs Hesaplama]] araçlarıyla bulabilir, özel açılar tablosunu [[bilgi:trigonometri-sin-cos-tan-tablosu|trigonometri tablosu]] yazısında görebilirsiniz. Bileşenlerden bileşke hızı bulmak için [[arac:vektor-hesapla|Vektör Toplama ve Büyüklük Hesaplama]] aracı kullanılabilir."
      ]
    },
    {
      h: "Uçuş süresi nasıl bulunur?",
      p: [
        "Cisim tepe noktasına ulaştığında düşey hızı sıfır olur. v<sub>y</sub> = v₀ · sin θ − g · t = 0 eşitliğinden tepeye çıkış süresi t<sub>ç</sub> = v₀ · sin θ ÷ g bulunur. Cisim atıldığı seviyeye geri düşüyorsa iniş süresi çıkış süresine eşittir; çünkü düşey hareket simetriktir. Toplam uçuş süresi bu yüzden çıkış süresinin iki katıdır."
      ],
      formula: "t_çıkış = v₀ · sin θ ÷ g\nt_uçuş = 2 · v₀ · sin θ ÷ g",
      after: [
        "Örnek: v₀ = 20 m/s, θ = 30°, g = 10 m/s² için t<sub>ç</sub> = 20 × 0,5 ÷ 10 = 1 s ve uçuş süresi 2 s'dir. Uçuş süresinin yalnızca <strong>düşey bileşene</strong> bağlı olduğuna dikkat edin; yatay hız ne olursa olsun, aynı düşey hızla atılan cisimler aynı sürede yere düşer.",
        "Cisim atıldığı noktadan daha alçak bir zemine düşüyorsa simetri bozulur ve süre y(t) = v₀ · sin θ · t − ½ · g · t² = −h denklemi çözülerek bulunur. Örneğin 20 m/s ve 30° ile 15 m yükseklikteki bir platformdan atılan cisim için 10t − 5t² = −15 eşitliğinden t² − 2t − 3 = 0 ve t = 3 s elde edilir. Cisim düz zemindeki 2 saniye yerine 3 saniye havada kalır ve 17,32 × 3 ≈ 52 m uzağa düşer."
      ]
    },
    {
      h: "Maksimum yükseklik formülü nedir?",
      p: [
        "Maksimum yükseklik, düşey hareketin tepe noktasına kadar aldığı yoldur. Düşey doğrultuda ilk hızı v₀ · sin θ olan ve g ile yavaşlayan bir cisim için zamansız hız denklemi (v² = v₀² − 2gh) kullanılır; son hız sıfır konduğunda formül elde edilir."
      ],
      formula: "h_max = (v₀ · sin θ)² ÷ (2 · g)\nYa da: h_max = ½ · g · t_çıkış²",
      after: [
        "Örnek: h<sub>max</sub> = (20 × 0,5)² ÷ (2 × 10) = 100 ÷ 20 = <strong>5 m</strong>. Aynı sonuç ½ × 10 × 1² = 5 m ile de bulunur. Yüksekliği enerji yoluyla da düşünebilirsiniz: tepe noktasında düşey hıza ait kinetik enerji tamamen potansiyel enerjiye dönüşmüştür. Bu yaklaşım için [[bilgi:kinetik-ve-potansiyel-enerji|kinetik ve potansiyel enerji]] yazısına bakın."
      ]
    },
    {
      h: "Eğik atışta menzil nasıl hesaplanır?",
      p: [
        "Menzil, cismin atıldığı seviyeye geri düştüğü noktanın yatay uzaklığıdır. Yatay hız sabit olduğundan menzil, yatay hız ile toplam uçuş süresinin çarpımıdır. 2 sin θ cos θ = sin 2θ özdeşliği kullanılarak formül sadeleştirilir."
      ],
      formula: "R = vₓ · t_uçuş = v₀ · cos θ · (2 · v₀ · sin θ ÷ g)\nR = v₀² · sin 2θ ÷ g",
      ol: [
        "v₀ = 20 m/s ve θ = 30° için yatay hız 20 × 0,866 = 17,32 m/s.",
        "Uçuş süresi 2 s (yukarıda bulundu).",
        "Menzil = 17,32 × 2 = <strong>34,64 m</strong>.",
        "Kontrol: R = 20² × sin 60° ÷ 10 = 400 × 0,866 ÷ 10 = 34,64 m."
      ]
    },
    {
      h: "En uzak menzil neden 45 derecede elde edilir?",
      p: [
        "Menzil formülünde açıya bağlı tek terim sin 2θ'dır. Sinüs fonksiyonu en büyük değerini (1) 90°'de alır; 2θ = 90° olması için θ = <strong>45°</strong> olmalıdır. Bu açıda menzil R<sub>max</sub> = v₀² ÷ g olur. 20 m/s hız için bu 400 ÷ 10 = 40 m'dir.",
        "Sezgisel açıklama şudur: açı küçükse cisim hızlı ilerler ama çabuk yere düşer; açı büyükse uzun süre havada kalır ama yavaş ilerler. 45° bu iki etkiyi dengeler. Ayrıca sin 2θ = sin (180° − 2θ) olduğu için birbirini 90°'ye tamamlayan açılar aynı menzili verir."
      ],
      table: {
        head: ["Açı", "sin 2θ", "Menzil (v₀ = 20 m/s, g = 10)", "Maks. yükseklik", "Uçuş süresi"],
        rows: [
          ["15°", "0,5", "20,0 m", "1,34 m", "1,04 s"],
          ["30°", "0,866", "34,6 m", "5,0 m", "2,0 s"],
          ["45°", "1", "40,0 m", "10,0 m", "2,83 s"],
          ["60°", "0,866", "34,6 m", "15,0 m", "3,46 s"],
          ["75°", "0,5", "20,0 m", "18,66 m", "3,86 s"]
        ],
        caption: "30° ve 60° aynı menzili verir; 60°'de cisim üç kat daha yükseğe çıkar ve daha uzun süre havada kalır."
      },
      after: [
        "Gerçek hayatta hava direnci nedeniyle en uzak menzil açısı genellikle 45°'nin biraz altındadır. Atış yerden yüksek bir noktadan yapılıyorsa (ör. gülle atmada sporcunun omuz yüksekliği) en iyi açı yine 45°'nin altına kayar."
      ]
    },
    {
      h: "Yatay atış ile eğik atış farkı nedir?",
      p: [
        "Yatay atış, eğik atışın θ = 0° olduğu özel hâlidir: cisim h yüksekliğinden yalnızca yatay hızla fırlatılır, ilk düşey hızı sıfırdır. Düşey hareket serbest düşmeyle aynıdır, yatay hareket yine sabit hızlıdır."
      ],
      formula: "Düşme süresi t = √(2h ÷ g)\nYatay uzaklık x = v₀ · t\nYere çarpma hızı v = √(v₀² + (g · t)²)",
      after: [
        "Örnek: 45 m yükseklikteki bir binanın çatısından 10 m/s hızla yatay atılan top (g = 10 m/s²) t = √(2 × 45 ÷ 10) = √9 = 3 s'de yere düşer ve binadan 10 × 3 = <strong>30 m</strong> uzağa çarpar. Çarpma anında düşey hızı 30 m/s, bileşke hızı √(10² + 30²) ≈ 31,6 m/s'dir. Aynı yükseklikten serbest bırakılan bir top da 3 s'de yere düşer; yatay hız düşme süresini değiştirmez. Yüksekten yapılan eğik atışları [[arac:egik-atis-hesapla|Eğik Atış Hesaplama]] aracındaki atış yüksekliği alanıyla çözebilirsiniz."
      ]
    },
    {
      h: "Tepe noktasında hız sıfır mıdır?",
      p: [
        "Hayır, bu sınavlarda en sık düşülen tuzaktır. Tepe noktasında yalnızca <strong>düşey hız sıfırdır</strong>. Yatay hız v₀ · cos θ değerini hareket boyunca koruduğu için cismin tepe noktasındaki hızı yatay hıza eşittir; 20 m/s ve 30° örneğinde bu 17,32 m/s'dir. Hız yalnızca θ = 90° olduğunda, yani cisim dik yukarı atıldığında tepe noktasında sıfır olur.",
        "Benzer şekilde ivme de tepe noktasında sıfır değildir; yer çekimi ivmesi hareketin her anında aşağı yönde g büyüklüğündedir. Cismin hızının en küçük olduğu nokta tepe noktası, en büyük olduğu noktalar ise atış ve düşüş anlarıdır."
      ]
    },
    {
      h: "Sık yapılan hatalar ve aracı kullanma",
      ul: [
        "<strong>sin 2θ ile 2 sin θ'yı karıştırmak:</strong> sin 60° = 0,866'dır, 2 × sin 30° = 1'dir; menzil formülünde sin 2θ kullanılır.",
        "<strong>Hesap makinesini radyanda bırakmak:</strong> Açı derece olarak verilmişse hesap makinesinin derece modunda olduğundan emin olun.",
        "<strong>Simetriyi her durumda varsaymak:</strong> Cisim farklı bir yüksekliğe düşüyorsa uçuş süresi 2 · t<sub>ç</sub> değildir; düşey konum denklemini çözmek gerekir.",
        "<strong>g'yi yanlış almak:</strong> Sınavlar çoğunlukla g = 10 m/s² verir; gerçek değer yaklaşık 9,81 m/s²'dir ve sonucu %2 kadar değiştirir.",
        "<strong>Hava direncini unutmak:</strong> Formüller ideal durum içindir; hafif ve hızlı cisimlerde gerçek menzil belirgin biçimde kısadır."
      ],
      after: [
        "[[arac:egik-atis-hesapla|Eğik Atış Hesaplama]] aracına ilk hızı, açıyı, varsa atış yüksekliğini ve g değerini girin; araç menzili, maksimum yüksekliği, uçuş süresini, tepeye çıkış süresini, hız bileşenlerini ve yere çarpma hızını birlikte gösterir. Hız, yol ve zaman ilişkisinin temelleri için [[bilgi:hiz-yol-zaman-formulu|hız-yol-zaman formülü]] yazısına da göz atabilirsiniz."
      ]
    }
  ],
  faq: [
    ["Eğik atış nedir?", "Eğik atış, bir cismin yatayla belirli bir açı yapacak şekilde fırlatılıp yalnızca yer çekimi etkisiyle hareket etmesidir. Hava direnci ihmal edildiğinde yörünge paraboldür; hareket yatayda sabit hızlı, düşeyde düzgün yavaşlayan ve hızlanan iki hareketin birleşimidir."],
    ["Eğik atışta menzil nasıl hesaplanır?", "Menzil R = v₀² · sin 2θ ÷ g formülüyle bulunur; bu, yatay hız ile toplam uçuş süresinin çarpımıdır. 20 m/s hız ve 30 derece açıda g = 10 için menzil 400 × 0,866 ÷ 10 = 34,6 metredir."],
    ["Maksimum yükseklik formülü nedir?", "Maksimum yükseklik h = (v₀ · sin θ)² ÷ 2g formülüyle hesaplanır. 20 m/s hız ve 30 derece açıda düşey ilk hız 10 m/s olduğundan yükseklik 100 ÷ 20 = 5 metre bulunur."],
    ["Uçuş süresi nasıl bulunur?", "Cisim atıldığı seviyeye düşüyorsa uçuş süresi t = 2 · v₀ · sin θ ÷ g'dir; tepeye çıkış süresinin iki katıdır. Uçuş süresi yalnızca düşey hız bileşenine ve yer çekimine bağlıdır."],
    ["En uzak menzil neden 45 derecede elde edilir?", "Menzil formülündeki sin 2θ terimi en büyük değeri olan 1'i 2θ = 90 derece, yani θ = 45 derece olduğunda alır. Bu açıda menzil v₀² ÷ g olur; birbirini 90 dereceye tamamlayan açılar ise aynı menzili verir."],
    ["Yatay atış ile eğik atış farkı nedir?", "Yatay atışta cisim bir yükseklikten yalnızca yatay hızla fırlatılır ve ilk düşey hızı sıfırdır. Düşme süresi √(2h ÷ g) ile bulunur ve yatay hızdan bağımsızdır; eğik atışta ise başlangıçta düşey hız bileşeni de vardır."],
    ["Hız bileşenleri sinüs ve kosinüsle nasıl ayrılır?", "İlk hız dik üçgenin hipotenüsü kabul edilir: yatay bileşen v₀ · cos θ, düşey bileşen v₀ · sin θ'dır. 20 m/s ve 30 derecede yatay bileşen 17,32 m/s, düşey bileşen 10 m/s olur."],
    ["Tepe noktasında hız sıfır mıdır?", "Hayır. Tepe noktasında yalnızca düşey hız sıfırdır; yatay hız v₀ · cos θ değerini korur. Hız ancak cisim dik yukarı atıldığında tepe noktasında sıfır olur; ivme ise her noktada g'dir."],
    ["Eğik atışta g kaç alınır?", "Gerçek yer çekimi ivmesi yaklaşık 9,81 m/s²'dir, ancak sınav soruları hesabı kolaylaştırmak için çoğunlukla 10 m/s² verir. İkisi arasındaki fark sonuçları yaklaşık yüzde 2 değiştirir; soruda verilen değeri kullanmak gerekir."]
  ],
  tools: ["egik-atis-hesapla", "vektor-hesapla", "sinus-hesapla", "kosinus-hesapla"],
  related: ["newtonun-hareket-yasalari", "kinetik-ve-potansiyel-enerji", "trigonometri-sin-cos-tan-tablosu", "hiz-yol-zaman-formulu"],
  sources: [
    ["MEB – Ortaöğretim fizik dersi öğretim programı", "https://www.meb.gov.tr/"]
  ]
};
