export default {
  slug: "mutlak-sifir-nedir-kelvin-rankine",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Mutlak Sıfır Nedir? Kelvin, Rankine ve Celsius Arasındaki İlişki",
  pageTitle: "Mutlak Sıfır Nedir, Kaç Derece? Kelvin, Rankine ve Celsius",
  description: "Mutlak sıfır 0 K = −273,15 °C = −459,67 °F = 0 °R'dir. Kelvin ve Rankine ölçekleri, dönüşüm formülleri, gaz yasalarında kelvin kullanımı ve çözümlü örnekler.",
  keywords: ["mutlak sıfır nedir", "mutlak sıfır kaç derece", "kelvin nedir", "rankine nedir", "0 kelvin kaç celsius", "sıcaklık ölçekleri", "termodinamik sıcaklık", "kelvin celsius dönüşümü"],
  lead: "Mutlak sıfır, ulaşılabilecek en düşük sıcaklık sınırıdır ve <strong>0 K = −273,15 °C = −459,67 °F = 0 °R</strong> değerine karşılık gelir. Bu sıcaklıkta bir sistemin ısı enerjisi alabileceği en küçük değere iner; bu yüzden Kelvin ve Rankine gibi mutlak ölçeklerde negatif sıcaklık yoktur. Kelvin'e geçmek için Celsius değerine 273,15 eklenir, Rankine'e geçmek için Fahrenheit değerine 459,67 eklenir ya da kelvin 1,8 ile çarpılır. Bu sayfada ölçeklerin ilişkisini, gaz yasalarında neden kelvin kullanıldığını ve çözümlü örnekleri bulacaksınız.",
  kisaCevap: [
    "Mutlak sıfır: 0 K = −273,15 °C = −459,67 °F = 0 °R.",
    "Kelvin ↔ Celsius: K = °C + 273,15 ve °C = K − 273,15; bir kelvinlik fark bir santigrat derecelik farka eşittir.",
    "Rankine ↔ Fahrenheit: °R = °F + 459,67; Rankine ↔ Kelvin: °R = K × 1,8.",
    "25 °C = 298,15 K = 77 °F = 536,67 °R.",
    "Termodinamiğin üçüncü yasasına göre mutlak sıfıra sonlu sayıda adımda ulaşılamaz; yalnızca çok yaklaşılabilir.",
    "Gaz yasalarında oranlar mutlak sıcaklıkla kurulur: 20 °C'tan 40 °C'a ısınan gazın hacmi 2 kat değil, yaklaşık 1,068 kat artar."
  ],
  figure: {
    alt: "Dört termometre yan yana: Kelvin, Celsius, Fahrenheit ve Rankine ölçeklerinde mutlak sıfır, suyun donma ve kaynama noktaları ile oda sıcaklığı değerleri.",
    caption: "Kelvin ve Rankine mutlak sıfırdan başlar. Kelvin ile Celsius'un derece aralığı aynıdır; Rankine ile Fahrenheit'in derece aralığı aynıdır ve Celsius aralığının 1,8'de biridir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Dört ölçekte aynı sıcaklıklar</text>
  <g class="mid b">
    <text x="190" y="58">Kelvin</text><text x="330" y="58">Celsius</text><text x="470" y="58">Fahrenheit</text><text x="610" y="58">Rankine</text>
  </g>
  <rect x="180" y="70" width="20" height="300" rx="10" class="sf sb"/>
  <rect x="320" y="70" width="20" height="300" rx="10" class="sf sb"/>
  <rect x="460" y="70" width="20" height="300" rx="10" class="sf sb"/>
  <rect x="600" y="70" width="20" height="300" rx="10" class="sf sb"/>
  <rect x="180" y="150" width="20" height="220" rx="10" class="ps"/>
  <rect x="320" y="150" width="20" height="220" rx="10" class="ps"/>
  <rect x="460" y="150" width="20" height="220" rx="10" class="ps"/>
  <rect x="600" y="150" width="20" height="220" rx="10" class="ps"/>
  <g class="sm">
    <text x="20" y="94" class="b">Su kaynar</text>
    <text x="20" y="156" class="b">Oda (25 °C)</text>
    <text x="20" y="190" class="b">Su donar</text>
    <text x="20" y="366" class="b dg">Mutlak sıfır</text>
  </g>
  <line x1="110" y1="90" x2="680" y2="90" class="sb dash" fill="none"/>
  <line x1="110" y1="152" x2="680" y2="152" class="sb dash" fill="none"/>
  <line x1="110" y1="186" x2="680" y2="186" class="sb dash" fill="none"/>
  <line x1="110" y1="362" x2="680" y2="362" class="sdg sw" fill="none"/>
  <g class="sm">
    <text x="206" y="86">373,15</text><text x="346" y="86">100</text><text x="486" y="86">212</text><text x="626" y="86">671,67</text>
    <text x="206" y="148">298,15</text><text x="346" y="148">25</text><text x="486" y="148">77</text><text x="626" y="148">536,67</text>
    <text x="206" y="182">273,15</text><text x="346" y="182">0</text><text x="486" y="182">32</text><text x="626" y="182">491,67</text>
    <text x="206" y="358" class="b dg">0</text><text x="346" y="358" class="b dg">−273,15</text><text x="486" y="358" class="b dg">−459,67</text><text x="626" y="358" class="b dg">0</text>
  </g>
  <rect x="20" y="384" width="680" height="30" rx="6" class="sf sb"/>
  <text x="360" y="404" class="sm mid">K = °C + 273,15 · °R = °F + 459,67 · °R = K × 1,8 · °F = °C × 1,8 + 32</text>
</svg>`
  },
  sections: [
    {
      h: "Mutlak sıfır nedir, kaç derecedir?",
      p: [
        "Sıcaklık, maddeyi oluşturan atom ve moleküllerin ortalama hareket enerjisiyle ilgilidir. Bir gaz soğudukça molekülleri yavaşlar, basıncı düşer. 18. ve 19. yüzyılda yapılan deneyler, sabit hacimdeki bir gazın basıncının sıcaklıkla doğrusal düştüğünü ve bu doğru uzatıldığında basıncın yaklaşık −273 °C'ta sıfıra ineceğini gösterdi. Bu nokta, sıcaklığın daha aşağı inemeyeceği <strong>mutlak sıfır</strong> olarak tanımlandı.",
        "Bugünkü kesin değer <strong>−273,15 °C</strong>, Fahrenheit ölçeğinde <strong>−459,67 °F</strong>, Kelvin ve Rankine ölçeklerinde ise tanım gereği <strong>0</strong>'dır. Kuantum fiziğine göre mutlak sıfırda bile parçacıklar tamamen durmaz; \"sıfır noktası enerjisi\" denen en küçük bir titreşim kalır. Bu yüzden mutlak sıfırı \"her şeyin durduğu nokta\" değil, sistemin en düşük enerji durumuna indiği sınır olarak düşünmek daha doğrudur.",
        "Sıcaklık ile ısının farkı burada önemlidir: sıcaklık bir durum ölçüsü, ısı ise sıcaklık farkı nedeniyle aktarılan enerjidir. Ayrıntı için [[bilgi:isi-ve-sicaklik-farki|ısı ve sıcaklık farkı yazısına]] bakabilirsiniz."
      ]
    },
    {
      h: "Kelvin ölçeğinde neden negatif değer yoktur?",
      p: [
        "Kelvin, SI birim sisteminin sıcaklık birimidir ve sıfır noktası doğrudan mutlak sıfıra yerleştirilmiştir. Mutlak sıfırın altında bir sıcaklık olmadığı için kelvinde negatif değer de yoktur. 2019'daki SI yeniden tanımlamasından beri kelvin, Boltzmann sabitinin tam değeri (k = 1,380649 × 10⁻²³ J/K) sabitlenerek tanımlanır; yani bir kelvinlik sıcaklık farkı, belirli bir miktar enerji değişimine karşılık gelir.",
        "Kelvin yazılırken \"derece\" kullanılmaz: \"300 kelvin\" ya da \"300 K\" yazılır, \"300 °K\" yazılmaz. Celsius ile Kelvin'in derece aralığı aynıdır; bu yüzden bir sıcaklık farkı her iki ölçekte de aynı sayıyla ifade edilir. 20 °C'tan 30 °C'a ısınan su 10 K ısınmıştır."
      ]
    },
    {
      h: "Kelvin ile Celsius arasındaki dönüşüm nasıl yapılır?",
      formula: "K = °C + 273,15\n°C = K − 273,15\nSıcaklık farkı: ΔK = Δ°C",
      ol: [
        "Oda sıcaklığı 25 °C: 25 + 273,15 = 298,15 K.",
        "Sıvı azotun kaynama noktası yaklaşık 77 K: 77 − 273,15 = −196,15 °C, yani yaklaşık −196 °C.",
        "Vücut sıcaklığı 37 °C: 310,15 K.",
        "Kaynar su (deniz seviyesinde) 100 °C: 373,15 K. Rakımın kaynama noktasını nasıl düşürdüğü [[bilgi:su-kac-derecede-kaynar-rakim|su kaç derecede kaynar yazısında]] anlatılır."
      ],
      after: [
        "Okul düzeyindeki hesaplarda 273,15 yerine çoğu zaman 273 kullanılır; bu, sonuçta en fazla 0,15 K'lik bir fark yaratır ve çoğu soruda kabul edilir. Hassas ölçümlerde 273,15 kullanılmalıdır. Dönüşümü hızlıca yapmak için [[arac:celsius-kelvin-cevir|Celsius Kelvin Çevirici]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Rankine ölçeği nedir, nerede kullanılır?",
      p: [
        "Rankine ölçeği, Fahrenheit'in mutlak karşılığıdır. Sıfır noktası Kelvin gibi mutlak sıfırdadır, ama derece aralığı Fahrenheit'inkiyle aynıdır: bir Rankine derecesi bir Fahrenheit derecesine, yani 1/1,8 kelvine eşittir. Adını 19. yüzyıl İskoç mühendisi William Rankine'den alır ve °R ya da Ra simgesiyle yazılır.",
        "Rankine ölçeği bugün ağırlıklı olarak Fahrenheit ve İngiliz birimlerinin kullanıldığı mühendislik alanlarında karşınıza çıkar: bazı termodinamik tablolar, buhar ve soğutma çevrimleri, havacılık ve roket motoru hesapları. Bir formülde mutlak sıcaklık gerekiyor ve veriler °F cinsindense Rankine'e geçilir."
      ],
      formula: "°R = °F + 459,67\n°R = K × 1,8\nK = °R ÷ 1,8",
      table: {
        head: ["Durum", "Kelvin", "Celsius", "Fahrenheit", "Rankine"],
        rows: [
          ["Mutlak sıfır", "0", "−273,15", "−459,67", "0"],
          ["Sıvı azot kaynama (yaklaşık)", "77", "−196", "−321", "139"],
          ["Su donma", "273,15", "0", "32", "491,67"],
          ["Oda sıcaklığı", "298,15", "25", "77", "536,67"],
          ["Vücut (yaklaşık)", "310,15", "37", "98,6", "558,27"],
          ["Su kaynama (1 atm)", "373,15", "100", "212", "671,67"]
        ]
      },
      after: [
        "Örnek: 100 °F kaç kelvindir? Önce Rankine'e geçin: 100 + 459,67 = 559,67 °R. Sonra 1,8'e bölün: 559,67 ÷ 1,8 ≈ 310,93 K, yani yaklaşık 37,78 °C. İki mutlak ölçek arasında geçiş için [[arac:kelvin-rankine-cevir|Kelvin Rankine Çevirici]] aracı aynı sıcaklığın Celsius ve Fahrenheit karşılığını da gösterir."
      ]
    },
    {
      h: "Fahrenheit ile Rankine ilişkisi nedir?",
      p: [
        "Fahrenheit ile Rankine arasındaki ilişki, Celsius ile Kelvin arasındaki ilişkinin aynısıdır: ölçekler arasında yalnızca sıfır noktası kayar, derece aralığı değişmez. Celsius'tan Kelvin'e 273,15 eklenir; Fahrenheit'ten Rankine'e 459,67 eklenir. Bu 459,67 değeri, mutlak sıfırın Fahrenheit karşılığının işaret değiştirmiş hâlidir.",
        "Celsius ile Fahrenheit arasındaki ilişki ise daha karmaşıktır, çünkü hem sıfır noktası hem derece aralığı farklıdır: °F = °C × 1,8 + 32. Bu dönüşümün ayrıntıları ve fırın, ateş, hava sıcaklığı tabloları [[bilgi:celsius-fahrenheit-cevirme|Celsius Fahrenheit yazısında]] bulunur. Hızlı çevirme için [[arac:celsius-fahrenheit-cevir|Celsius Fahrenheit Çevirici]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Gaz yasalarında neden kelvin kullanılır?",
      p: [
        "İdeal gaz denklemi PV = nRT ve ondan türeyen Charles, Gay-Lussac ve birleşik gaz yasaları, hacim ya da basıncın sıcaklıkla <strong>orantılı</strong> olduğunu söyler. Orantı ancak sıfır noktası gerçek bir sıfır olan ölçekle anlamlıdır. Celsius'ta 0 °C keyfî bir noktadır (suyun donması); 20 °C'tan 40 °C'a çıkmak sıcaklığı \"iki katına\" çıkarmaz."
      ],
      ol: [
        "Soru: Sabit basınçta 20 °C'taki 1,00 L gaz 40 °C'a ısıtılırsa hacmi ne olur?",
        "Yanlış yol: 40 ÷ 20 = 2 → 2,00 L. Bu sonuç fiziksel olarak hatalıdır.",
        "Doğru yol: Sıcaklıkları kelvine çevirin: 293,15 K ve 313,15 K.",
        "Charles yasası: V<sub>2</sub> = V<sub>1</sub> × T<sub>2</sub> ÷ T<sub>1</sub> = 1,00 × 313,15 ÷ 293,15 ≈ 1,068 L.",
        "Hacim yaklaşık yüzde 6,8 artar; iki kat değil."
      ],
      after: [
        "Aynı kural, sıcaklığın paydada ya da çarpan olarak geçtiği her termodinamik formül için geçerlidir: verim, ısıl ışınım, ses hızı ve kimyasal tepkime hızları. Gaz denkleminin ayrıntılı çözümlü örnekleri için [[bilgi:ideal-gaz-denklemi-pv-nrt|ideal gaz denklemi yazısına]] ve [[arac:ideal-gaz-denklemi-hesapla|İdeal Gaz Denklemi Hesaplama]] aracına bakabilirsiniz."
      ]
    },
    {
      h: "Mutlak sıfıra ulaşmak mümkün müdür? Uzayın sıcaklığı",
      p: [
        "Termodinamiğin üçüncü yasasına göre bir sistemi sonlu sayıda adımda mutlak sıfıra indirmek mümkün değildir. Her soğutma adımı kalan farkı küçültür ama hiçbir zaman sıfırlamaz. Bu nedenle laboratuvarlarda ulaşılan sıcaklıklar mutlak sıfıra son derece yakın, kelvinin milyarda biri mertebesinde olsa da tam sıfır değildir.",
        "Bu kadar düşük sıcaklıklarda madde alışılmadık davranışlar gösterir: bazı metaller elektrik direncini tamamen kaybeder (süperiletkenlik), bazı sıvılar sürtünmesiz akar (süperakışkanlık) ve atomların toplu olarak tek bir kuantum durumunda bulunduğu Bose-Einstein yoğuşması oluşur. Manyetik rezonans görüntüleme cihazlarındaki süperiletken mıknatıslar sıvı helyumla yaklaşık 4 K'de tutulur.",
        "Uzay ise sanıldığı kadar soğuk değildir: evreni dolduran kozmik mikrodalga arka plan ışınımı yaklaşık <strong>2,725 K</strong> (yaklaşık −270,4 °C) sıcaklığa karşılık gelir. Gölgede kalan bir uzay aracı bu değere yaklaşırken Güneş'e dönük yüzeyi yüzlerce dereceye ısınabilir; çünkü boşlukta sıcaklığı belirleyen şey ışınımla alınan ve verilen enerjidir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Kelvine derece işareti koymak:</strong> \"300 °K\" yanlış, \"300 K\" doğrudur. Rankine'de ise °R yazımı yaygındır.",
        "<strong>Oranları Celsius ile kurmak:</strong> Gaz yasalarında ve verim hesaplarında sıcaklık mutlaka kelvin ya da Rankine olmalıdır.",
        "<strong>Farkı dönüştürürken 273,15 eklemek:</strong> 10 °C'lik bir sıcaklık farkı 10 K'dir, 283,15 K değildir.",
        "<strong>Rankine'i Fahrenheit'le Celsius gibi dönüştürmek:</strong> °R = °F + 459,67'dir; 1,8 ile çarpma yalnızca kelvinden Rankine'e geçişte kullanılır.",
        "<strong>Negatif kelvin yazmak:</strong> Klasik anlamda negatif kelvin yoktur; hesapta negatif bir kelvin çıkıyorsa dönüşümde hata vardır."
      ]
    }
  ],
  faq: [
    ["Mutlak sıfır nedir, kaç derecedir?", "Mutlak sıfır, bir sistemin enerjisinin alabileceği en düşük değere indiği sıcaklık sınırıdır. Değeri 0 K, −273,15 °C, −459,67 °F ve 0 °R'dir. Kuantum etkileri nedeniyle parçacıklar bu noktada bile en küçük bir titreşimi korur."],
    ["Kelvin ölçeğinde neden negatif değer yoktur?", "Kelvin ölçeğinin sıfır noktası doğrudan mutlak sıfıra yerleştirilmiştir ve mutlak sıfırın altında bir sıcaklık bulunmaz. Bu yüzden kelvin değerleri her zaman sıfır ya da pozitiftir; hesapta negatif kelvin çıkıyorsa dönüşüm hatası vardır."],
    ["Kelvin ile Celsius arasındaki dönüşüm nasıl yapılır?", "Celsius değerine 273,15 eklenerek kelvin, kelvinden 273,15 çıkarılarak Celsius bulunur. 25 °C, 298,15 K eder. İki ölçeğin derece aralığı aynı olduğu için sıcaklık farkları her iki ölçekte de aynı sayıyla ifade edilir."],
    ["Rankine ölçeği nedir, nerede kullanılır?", "Rankine, Fahrenheit derece aralığına sahip mutlak sıcaklık ölçeğidir; sıfırı mutlak sıfırdadır. °R = °F + 459,67 ve °R = K × 1,8 bağıntılarıyla dönüştürülür. Fahrenheit kullanılan mühendislik alanlarında, termodinamik tablolar ve havacılık hesaplarında görülür."],
    ["Mutlak sıfıra ulaşmak mümkün müdür?", "Termodinamiğin üçüncü yasasına göre sonlu sayıda adımla mutlak sıfıra ulaşılamaz. Laboratuvarlarda kelvinin milyarda biri mertebesine kadar yaklaşılmıştır; bu sıcaklıklarda süperiletkenlik ve süperakışkanlık gibi kuantum olayları gözlenir."],
    ["Uzayın sıcaklığı kaç kelvindir?", "Evreni dolduran kozmik mikrodalga arka plan ışınımı yaklaşık 2,725 K'e, yani yaklaşık −270,4 °C'a karşılık gelir. Uzaydaki bir cismin sıcaklığı ise Güneş'e uzaklığına ve ışınımla aldığı ve verdiği enerjiye göre çok farklı olabilir."],
    ["Gaz yasalarında neden kelvin kullanılır?", "Gaz yasaları hacim ve basıncın sıcaklıkla orantılı olduğunu söyler ve orantı ancak gerçek sıfırdan başlayan bir ölçekle anlamlıdır. 20 °C'tan 40 °C'a ısınan gazın hacmi 2 kat değil, 313,15 ÷ 293,15 ≈ 1,068 kat artar."],
    ["Fahrenheit ile Rankine ilişkisi nedir?", "Rankine, Fahrenheit'in mutlak karşılığıdır; derece aralıkları aynıdır, yalnızca sıfır noktası kayar. Fahrenheit değerine 459,67 eklenerek Rankine bulunur: 32 °F suyun donma noktası 491,67 °R, 212 °F kaynama noktası 671,67 °R'dir."],
    ["Kelvin yazarken derece işareti kullanılır mı?", "Hayır. SI kurallarına göre kelvin derece işaretsiz yazılır: 300 K ya da 300 kelvin. Celsius ve Fahrenheit derece işaretiyle yazılır; Rankine'de ise °R gösterimi yaygın olarak kullanılır."],
    ["Sıvı azot kaç kelvindir?", "Sıvı azot normal atmosfer basıncında yaklaşık 77 K'de, yani yaklaşık −196 °C'ta kaynar. Bu değer Rankine ölçeğinde yaklaşık 139 °R, Fahrenheit'te yaklaşık −321 °F eder. Çok düşük sıcaklıkta olduğu için ciltle teması ciddi soğuk yanığına yol açabilir; yalnızca uygun koruyucu ekipmanla ve eğitimli kişilerce kullanılmalıdır."],
    ["Bir sıcaklık farkı kelvine nasıl çevrilir?", "Sıcaklık farkı dönüştürülürken 273,15 eklenmez, çünkü Kelvin ile Celsius'un derece aralığı aynıdır. 15 °C'lik bir ısınma 15 K'lik ısınmadır. Fahrenheit farkını kelvine çevirmek için ise fark 1,8'e bölünür: 18 °F'lik fark 10 K eder."]
  ],
  tools: ["kelvin-rankine-cevir", "celsius-kelvin-cevir", "celsius-fahrenheit-cevir", "ideal-gaz-denklemi-hesapla"],
  related: ["celsius-fahrenheit-cevirme", "ideal-gaz-denklemi-pv-nrt", "isi-ve-sicaklik-farki"],
  sources: [
    ["BIPM – SI temel birimleri: kelvin", "https://www.bipm.org/en/measurement-units/si-base-units"],
    ["NIST – Temel fiziksel sabitler (Boltzmann sabiti)", "https://physics.nist.gov/cuu/Constants/"]
  ]
};
