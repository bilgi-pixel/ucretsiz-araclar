export default {
  slug: "kacis-hizi-nedir",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Kaçış Hızı Nedir? Dünya'dan Kaçmak İçin Gereken Hız ve Yörünge Hızı",
  pageTitle: "Kaçış Hızı Nedir? Dünya'nın Kaçış Hızı ve Formülü",
  description: "Kaçış hızı v = √(2GM/r) ile hesaplanır; Dünya için yaklaşık 11,2 km/s. Yörünge hızı farkı, Ay ve Mars değerleri, Kepler'in 3. yasası ve kara delik örneği.",
  keywords: ["kaçış hızı nedir", "dünyanın kaçış hızı", "kaçış hızı formülü", "yörünge hızı", "yörünge periyodu", "kepler yasaları", "uydu yörüngesi", "birinci kozmik hız"],
  lead: "Kaçış hızı, bir cismin itme gücü olmadan, yalnızca başlangıç hızıyla bir gök cisminin çekiminden tamamen kurtulması için gereken en küçük hızdır ve <strong>v = √(2GM/r)</strong> formülüyle hesaplanır. Dünya yüzeyinde bu değer yaklaşık <strong>11,2 km/s</strong>, yani saatte 40.000 km'nin üzerindedir. Yüzeye yakın dairesel yörüngede kalmak içinse yaklaşık 7,9 km/s yeterlidir; kaçış hızı her zaman yörünge hızının √2 katıdır. Bu sayfada formülün nereden geldiğini, gezegenlerin değerlerini, yörünge periyodunu ve kara deliklerin neden ışığı bile tuttuğunu anlatıyoruz.",
  kisaCevap: [
    "Kaçış hızı: v<sub>k</sub> = √(2GM/r); G = 6,674 × 10<sup>-11</sup> N·m²/kg².",
    "Dünya yüzeyinde kaçış hızı ≈ 11,19 km/s; Ay'da ≈ 2,38 km/s, Mars'ta ≈ 5,03 km/s.",
    "Dairesel yörünge hızı: v<sub>y</sub> = √(GM/r); Dünya yüzeyine yakın ≈ 7,91 km/s.",
    "Kaçış hızı = yörünge hızı × √2 ≈ 1,414 × yörünge hızı.",
    "Kaçış hızı cismin kendi kütlesine bağlı değildir; bir toz tanesi de bir roket de aynı hıza ihtiyaç duyar.",
    "Kepler'in 3. yasası: T² = 4π²r³ ÷ (GM); 400 km yükseklikteki bir uydu Dünya'yı yaklaşık 92 dakikada dolanır."
  ],
  figure: {
    alt: "Dünya'dan farklı hızlarla fırlatılan cisimlerin yolları: 7,9 km/s'nin altında yere düşer, 7,9 km/s'de dairesel yörünge, 7,9 ile 11,2 arasında elips, 11,2 km/s ve üzerinde kaçış. Sağda Ay, Mars, Dünya, Jüpiter kaçış hızı çubukları.",
    caption: "Yatay fırlatma hızı arttıkça cisim önce yere düşer, sonra yörüngeye girer, kaçış hızına ulaşınca bir daha geri dönmez. Çubuklar yüzeydeki kaçış hızlarını karşılaştırır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Fırlatma hızına göre cismin yolu</text>
  <circle cx="200" cy="230" r="70" class="ps"/>
  <text x="200" y="236" class="b mid">Dünya</text>
  <circle cx="200" cy="230" r="110" class="sok sw" fill="none"/>
  <ellipse cx="250" cy="230" rx="160" ry="128" class="sp dash" fill="none"/>
  <path d="M200 120 Q240 122 262 170" class="sdg sw" fill="none"/>
  <path d="M200 120 C330 105 420 70 470 48" class="sa sw" fill="none"/>
  <circle cx="200" cy="120" r="6" class="p"/>
  <text x="270" y="190" class="sm dg b">7,9 km/s altı düşer</text>
  <text x="70" y="370" class="sm ok b">7,9 km/s dairesel yörünge</text>
  <text x="300" y="380" class="sm p b">7,9–11,2 elips</text>
  <text x="400" y="80" class="sm b">≥ 11,2 km/s kaçış</text>
  <rect x="490" y="56" width="210" height="340" rx="10" class="sf sb"/>
  <text x="595" y="82" class="b mid">Yüzeyde kaçış hızı</text>
  <g class="sm">
    <text x="506" y="112">Ay</text><rect x="560" y="100" width="10" height="16" class="ps"/><text x="576" y="113">2,38 km/s</text>
    <text x="506" y="146">Mars</text><rect x="560" y="134" width="22" height="16" class="ps"/><text x="588" y="147">5,03 km/s</text>
    <text x="506" y="180">Dünya</text><rect x="560" y="168" width="48" height="16" class="p"/><text x="614" y="181" class="b">11,19 km/s</text>
    <text x="506" y="214">Jüpiter</text><rect x="560" y="202" width="128" height="16" class="ps"/><text x="600" y="236">≈ 59,5 km/s</text>
  </g>
  <line x1="506" y1="260" x2="684" y2="260" class="sb" fill="none"/>
  <text x="595" y="286" class="b mid">v = √(2GM/r)</text>
  <text x="595" y="312" class="sm mid">kütle M büyüdükçe artar</text>
  <text x="595" y="334" class="sm mid">yarıçap r büyüdükçe azalır</text>
  <text x="595" y="364" class="sm mid t2">kaçış = yörünge × √2</text>
</svg>`
  },
  sections: [
    {
      h: "Kaçış hızı nedir?",
      p: [
        "Yukarı doğru attığınız bir top yavaşlar, durur ve geri düşer. Daha hızlı atarsanız daha yükseğe çıkar. Peki öyle bir hız var mı ki top hiç geri dönmesin? Var: bu hıza <strong>kaçış hızı</strong> denir. Kaçış hızıyla fırlatılan bir cisim, hava direnci ve itme olmadığı varsayımıyla, kütle çekimine karşı sürekli yavaşlasa da hızı hiçbir zaman sıfıra inmez ve sonsuz uzaklığa kadar gider.",
        "Önemli bir ayrıntı: kaçış hızı \"tek seferlik başlangıç hızı\" için tanımlanır. Roketler sürekli itme ürettikleri için kaçış hızına ulaşmadan da yavaş yavaş yükselebilir; teorik olarak saatte 10 km hızla, yeterince yakıtla Ay'a bile gidilebilir. Yine de pratikte uzay araçları yakıt verimliliği nedeniyle yörüngeye çıkıp oradan hızlanarak kaçış hızına ulaşır.",
        "Kaçış hızı, fırlatılan cismin kütlesinden bağımsızdır. Bir uydu da, bir molekül de aynı yerden kaçmak için aynı hıza ihtiyaç duyar. Bu durum, gezegenlerin atmosferini neden tutabildiğini de açıklar: hafif gaz molekülleri (hidrojen, helyum) yüksek sıcaklıkta kaçış hızına daha kolay ulaşır, bu yüzden küçük cisimler atmosferlerini zamanla kaybeder."
      ]
    },
    {
      h: "Kaçış hızı formülü nereden gelir?",
      p: [
        "Formül, enerjinin korunumundan çıkar. m kütleli bir cismin M kütleli gezegenin merkezinden r uzaklıktaki kütle çekim potansiyel enerjisi −GMm/r'dir; sonsuzda bu enerji sıfır olur. Cismin sonsuza ulaştığında hızı tam sıfır olacak kadar kinetik enerjiyle fırlatılması gerekir. Kinetik ve potansiyel enerji kavramlarını [[bilgi:kinetik-ve-potansiyel-enerji|kinetik ve potansiyel enerji yazısında]] ayrıntılı bulabilirsiniz."
      ],
      formula: "½ m v² − G M m ÷ r = 0\nv² = 2 G M ÷ r\nv_kaçış = √(2GM ÷ r)\nYüzey çekim ivmesiyle: v_kaçış = √(2 g r)",
      after: [
        "Denklemdeki m her iki tarafta da bulunduğu için sadeleşir; bu yüzden kaçış hızı cismin kütlesine bağlı değildir. Yüzeydeki çekim ivmesi g = GM/r² olduğundan formül √(2gr) olarak da yazılabilir. Dünya için g = 9,81 m/s² ve r = 6.371 km alınırsa √(2 × 9,81 × 6.371.000) ≈ 11.180 m/s bulunur.",
        "İki kütle arasındaki çekim kuvvetinin kendisini hesaplamak için [[arac:kutle-cekim-kuvveti-hesapla|Kütle Çekim Kuvveti Hesaplama]] aracı F = Gm₁m₂/r² formülünü kullanır."
      ]
    },
    {
      h: "Dünya'nın kaçış hızı kaç km/s? Çözümlü hesap",
      ol: [
        "Değerler: G = 6,674 × 10<sup>-11</sup> N·m²/kg², Dünya'nın kütlesi M = 5,972 × 10<sup>24</sup> kg, ortalama yarıçapı r = 6,371 × 10<sup>6</sup> m.",
        "2GM = 2 × 6,674 × 10<sup>-11</sup> × 5,972 × 10<sup>24</sup> ≈ 7,971 × 10<sup>14</sup> m³/s².",
        "2GM ÷ r ≈ 7,971 × 10<sup>14</sup> ÷ 6,371 × 10<sup>6</sup> ≈ 1,251 × 10<sup>8</sup> m²/s².",
        "Karekök: √(1,251 × 10<sup>8</sup>) ≈ 11.186 m/s ≈ <strong>11,19 km/s</strong>.",
        "Saatlik hız: 11,19 × 3.600 ≈ 40.270 km/sa. Bu, sesin havadaki hızının yaklaşık 33 katıdır."
      ],
      after: [
        "Aynı yöntemle farklı gök cisimleri için hesap yapmak isterseniz [[arac:kacis-hizi-hesapla|Kaçış Hızı Hesaplama]] aracı Dünya, Ay, Mars, Jüpiter ve Güneş değerlerini hazır sunar, kendi kütle ve yarıçap değerlerinizi de kabul eder. Sesin havadaki hızı yaklaşık 343 m/s olduğundan kaçış hızı sesten 30 kattan fazla hızlıdır."
      ]
    },
    {
      h: "Yörünge hızı ile kaçış hızı farkı",
      p: [
        "Bir uydunun dairesel yörüngede kalması için kütle çekiminin, cismi çember üzerinde tutan merkezcil kuvvete tam eşit olması gerekir: GMm/r² = mv²/r. Buradan <strong>dairesel yörünge hızı</strong> v = √(GM/r) çıkar. Kaçış hızı formülüyle karşılaştırınca aradaki farkın yalnızca √2 katsayısı olduğu görülür.",
        "Dünya yüzeyine çok yakın (hava direnci yok sayılarak) dairesel yörünge hızı yaklaşık 7,91 km/s'dir; buna birinci kozmik hız da denir. 7,91 ile 11,19 km/s arasındaki hızlarda cisim kapalı ama giderek uzayan elips yörüngelerde döner. 11,19 km/s'ye ulaşıldığında yörünge açılır ve cisim geri dönmez. Merkezcil kuvvet ve açısal hız ilişkisini [[bilgi:merkezcil-kuvvet-ve-acisal-hiz|merkezcil kuvvet yazısında]] bulabilirsiniz."
      ],
      after: [
        "Fizik kitaplarında bu hızlar \"kozmik hızlar\" diye de sıralanır. Birinci kozmik hız yörünge hızı (≈ 7,9 km/s), ikinci kozmik hız Dünya'dan kaçış hızıdır (≈ 11,2 km/s). Üçüncü kozmik hız ise Dünya'dan fırlatılan bir cismin Güneş'in çekiminden de kurtulup Güneş Sistemi'ni terk etmesi için gereken hızdır ve Dünya'nın yörünge hareketinden yararlanıldığında yaklaşık 16,7 km/s olarak verilir. Güneş'in Dünya yörüngesindeki çekiminden kaçış hızı yaklaşık 42,1 km/s'dir; Dünya zaten Güneş etrafında yaklaşık 29,8 km/s ile döndüğü için fırlatma yönü doğru seçilirse bu hızın önemli bir kısmı hazır kazanılmış olur."
      ],
      table: {
        head: ["Hız", "Formül", "Dünya yüzeyinde", "Ne olur"],
        rows: [
          ["Yörünge hızı", "√(GM/r)", "≈ 7,91 km/s", "Dairesel yörüngede döner"],
          ["Ara hızlar", "–", "7,91–11,19 km/s", "Eliptik yörünge"],
          ["Kaçış hızı", "√(2GM/r)", "≈ 11,19 km/s", "Çekimden kurtulur"]
        ]
      }
    },
    {
      h: "Bir uydunun yörünge periyodu nasıl bulunur? Kepler'in üçüncü yasası",
      p: [
        "Kepler'in üçüncü yasası, bir yörüngenin periyodunun karesinin yarıçapın (elipste büyük yarı eksenin) küpüyle orantılı olduğunu söyler. Newton'un kütle çekim yasası bu orantının katsayısını verir: T² = 4π²r³ ÷ (GM). Yani yörünge ne kadar büyükse dolanım o kadar uzun sürer ve uydu o kadar yavaş gider."
      ],
      formula: "T = 2π √(r³ ÷ GM)\nv = √(GM ÷ r)\nr = Dünya yarıçapı + yükseklik",
      ol: [
        "Uluslararası Uzay İstasyonu yaklaşık 400 km yükseklikte döner; r = 6.371 + 400 = 6.771 km.",
        "Hız: √(GM ÷ r) ≈ 7,67 km/s.",
        "Periyot: 2πr ÷ v ≈ 2π × 6.771.000 ÷ 7.672 ≈ 5.545 s ≈ <strong>92 dakika</strong>. İstasyon günde yaklaşık 15,5 tur atar.",
        "Yer eşzamanlı (jeosenkron) yörüngede periyot bir yıldız günü (yaklaşık 23 sa 56 dk) olmalıdır; formül tersine çözülünce r ≈ 42.164 km, yani yüzeyden yaklaşık 35.790 km yükseklik bulunur."
      ],
      after: [
        "Bu hesapları [[arac:yorunge-periyodu-hesapla|Yörünge Periyodu Hesaplama]] aracıyla yükseklik ya da yörünge yarıçapı girerek yapabilirsiniz. Hareketin temel yasalarını tazelemek için [[bilgi:newtonun-hareket-yasalari|Newton'un hareket yasaları yazısı]] uygun bir başlangıçtır."
      ]
    },
    {
      h: "Ay ve Mars'ın kaçış hızı neden daha düşük?",
      p: [
        "Formülde kütle payda, yarıçap paydadadır. Ay'ın kütlesi Dünya'nın yaklaşık %1,2'si, yarıçapı ise yaklaşık %27'sidir. Kütledeki büyük azalma yarıçaptaki azalmadan çok daha etkili olduğu için Ay'ın kaçış hızı yaklaşık 2,38 km/s'ye düşer. Apollo görevlerinde Ay'dan kalkan modüllerin çok daha küçük motorlarla yörüngeye çıkabilmesinin nedeni budur."
      ],
      table: {
        head: ["Gök cismi", "Kütle (kg)", "Yarıçap (km)", "Kaçış hızı"],
        rows: [
          ["Ay", "7,342 × 10<sup>22</sup>", "1.737", "≈ 2,38 km/s"],
          ["Mars", "6,417 × 10<sup>23</sup>", "3.390", "≈ 5,03 km/s"],
          ["Dünya", "5,972 × 10<sup>24</sup>", "6.371", "≈ 11,19 km/s"],
          ["Jüpiter", "1,898 × 10<sup>27</sup>", "71.492 (ekvator)", "≈ 59,5 km/s"],
          ["Güneş", "1,989 × 10<sup>30</sup>", "695.700", "≈ 617,7 km/s"]
        ],
        caption: "Kütle ve yarıçap değerleri yuvarlanmıştır; sonuçlar yüzey için ve dönme etkisi hesaba katılmadan verilmiştir."
      },
      after: [
        "Mars'ın kaçış hızının düşük olması, gezegenin milyarlarca yıl içinde atmosferinin önemli bir bölümünü kaybetmesinin nedenlerinden biridir. Aynı kütlenizin farklı gezegenlerde ne kadar ağırlık oluşturacağını görmek için [[arac:gezegen-agirligi-hesapla|Gezegen Ağırlığı Hesaplama]] aracını deneyebilirsiniz; kütle ile ağırlık farkı [[bilgi:kutle-ve-agirlik-farki|kütle ve ağırlık yazısında]] anlatılır."
      ]
    },
    {
      h: "Kara delikten neden ışık bile kaçamaz?",
      p: [
        "Kaçış hızı formülünde r küçüldükçe hız büyür. Belirli bir kütle yeterince küçük bir hacme sıkıştırılırsa, yüzeydeki kaçış hızı ışık hızına (yaklaşık 299.792 km/s) ulaşır. Bu sınır yarıçapa <strong>Schwarzschild yarıçapı</strong> denir: r<sub>s</sub> = 2GM ÷ c². Bu yarıçapın içinden hiçbir şey, ışık bile dışarı çıkamaz ve buna olay ufku adı verilir.",
        "Dünya'nın tüm kütlesi bir kara deliğe dönüşseydi Schwarzschild yarıçapı yalnızca yaklaşık 8,9 mm olurdu; Güneş için yaklaşık 3 km'dir. Burada klasik kaçış hızı formülüyle Einstein'ın genel görelilik kuramı aynı sonucu verir; ancak kara deliklerin doğru tanımı göreliliğe dayanır, çünkü ışık hızına yaklaşan hızlarda Newton mekaniği geçerliliğini yitirir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Yüksekliği yarıçap sanmak:</strong> Yörünge hesabında r, gezegenin merkezinden uzaklıktır; yüzeyden yüksekliğe gezegenin yarıçapı eklenmelidir.",
        "<strong>Birimleri karıştırmak:</strong> G SI birimindedir; kütle kg, uzaklık metre olmalıdır. km kullanılırsa sonuç √1.000 kat hatalı çıkar.",
        "<strong>Kaçış hızını roket için zorunlu sanmak:</strong> Sürekli itmeyle yükselen bir araç daha düşük hızlarla da uzaklaşabilir; kaçış hızı tek seferlik fırlatma içindir.",
        "<strong>Kütlenin etkisini sanmak:</strong> Ağır cisimlerin daha yüksek kaçış hızına ihtiyaç duyduğu düşünülür; oysa cismin kütlesi formülde sadeleşir.",
        "<strong>Hava direncini unutmak:</strong> Gerçek fırlatmalarda atmosfer sürtünmesi ve yerçekimi kaybı nedeniyle roketlerin toplam hız bütçesi teorik değerden yüksektir."
      ]
    }
  ],
  faq: [
    ["Kaçış hızı nedir?", "Kaçış hızı, bir cismin itme gücü olmadan, yalnızca başlangıç hızıyla bir gök cisminin kütle çekiminden tamamen kurtulması için gereken en küçük hızdır. Karekök iki çarpı G çarpı M bölü r formülüyle hesaplanır."],
    ["Dünya'nın kaçış hızı kaç km/s?", "Dünya yüzeyinde kaçış hızı yaklaşık 11,2 km/s'dir; daha hassas hesapla 11,19 km/s bulunur. Bu, saatte yaklaşık 40.270 kilometreye ve sesin havadaki hızının 33 katına karşılık gelir."],
    ["Kaçış hızı nasıl hesaplanır?", "Gök cisminin kütlesi M ve merkezden uzaklık r ile v eşittir karekök iki G M bölü r formülü kullanılır. G evrensel çekim sabiti olup 6,674 çarpı 10 üzeri eksi 11 değerindedir; tüm birimler SI olmalıdır."],
    ["Yörünge hızı ile kaçış hızı farkı nedir?", "Yörünge hızı cismin dairesel yörüngede kalması için gereken hızdır ve karekök G M bölü r ile bulunur. Kaçış hızı bunun karekök iki katıdır; Dünya yüzeyine yakın yörünge hızı 7,9, kaçış hızı 11,2 km/s'dir."],
    ["Bir uydunun yörünge periyodu nasıl bulunur?", "Periyot, iki pi çarpı karekök r küp bölü G M formülüyle bulunur; r gezegen yarıçapı ile yüksekliğin toplamıdır. 400 km yükseklikteki bir uydu Dünya'yı yaklaşık 92 dakikada bir dolanır."],
    ["Kepler'in üçüncü yasası ne söyler?", "Kepler'in üçüncü yasası, yörünge periyodunun karesinin yörünge yarıçapının ya da büyük yarı eksenin küpüyle orantılı olduğunu söyler. Bu nedenle uzak gezegenler ve yüksek uydular hem daha yavaş gider hem daha uzun sürede dolanır."],
    ["Ay ve Mars'ın kaçış hızı neden daha düşük?", "Kaçış hızı kütleyle artar, yarıçapla azalır. Ay ve Mars'ın kütleleri Dünya'ya göre çok daha küçük olduğu için kaçış hızları sırasıyla yaklaşık 2,38 ve 5,03 km/s'ye düşer."],
    ["Kara delikten neden ışık bile kaçamaz?", "Bir kütle Schwarzschild yarıçapından daha küçük bir hacme sıkıştığında yüzeydeki kaçış hızı ışık hızını aşar. Bu sınır olan olay ufkunun içinden ışık dahil hiçbir şey dışarı çıkamaz."],
    ["Kaçış hızı cismin kütlesine bağlı mıdır?", "Bağlı değildir. Enerji denkleminde cismin kütlesi her iki tarafta da yer aldığı için sadeleşir; bu yüzden bir toz tanesi de büyük bir uzay aracı da aynı noktadan kaçmak için aynı hıza ihtiyaç duyar."]
  ],
  tools: ["kacis-hizi-hesapla", "yorunge-periyodu-hesapla", "kutle-cekim-kuvveti-hesapla", "gezegen-agirligi-hesapla"],
  related: ["kinetik-ve-potansiyel-enerji", "merkezcil-kuvvet-ve-acisal-hiz", "newtonun-hareket-yasalari", "kutle-ve-agirlik-farki"],
  sources: [
    ["NASA – Planetary Fact Sheet", "https://nssdc.gsfc.nasa.gov/planetary/factsheet/"],
    ["NIST – Newtonian constant of gravitation (CODATA)", "https://physics.nist.gov/cgi-bin/cuu/Value?bg"]
  ]
};
