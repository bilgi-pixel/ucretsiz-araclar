export default {
  slug: "boyle-charles-gay-lussac-gaz-yasalari",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Boyle, Charles ve Gay-Lussac Yasaları: Gazlarda Basınç, Hacim, Sıcaklık",
  pageTitle: "Boyle, Charles ve Gay-Lussac Gaz Yasaları: Formüller, Örnekler",
  description: "Boyle (P₁V₁ = P₂V₂), Charles (V/T sabit) ve Gay-Lussac (P/T sabit) yasaları, birleşik gaz yasası, Kelvin zorunluluğu ve lastik, şırınga, dalgıç örnekleri çözümlü.",
  keywords: ["boyle yasası", "charles yasası", "gay lussac yasası", "birleşik gaz yasası", "gaz yasaları formülleri", "basınç hacim ilişkisi", "p1v1 p2v2", "gazlarda sıcaklık kelvin"],
  lead: "Boyle yasası sabit sıcaklıkta bir gazın basıncı ile hacminin ters orantılı olduğunu (P₁V₁ = P₂V₂), Charles yasası sabit basınçta hacmin mutlak sıcaklıkla doğru orantılı olduğunu (V₁/T₁ = V₂/T₂), Gay-Lussac yasası ise sabit hacimde basıncın mutlak sıcaklıkla doğru orantılı olduğunu (P₁/T₁ = P₂/T₂) söyler. Üçü birleşik gaz yasasında P₁V₁/T₁ = P₂V₂/T₂ olarak buluşur. Bu yazıda her yasayı çözümlü örneklerle, sıcaklığın neden Kelvin olması gerektiğini ve günlük hayattaki karşılıklarını anlatıyoruz.",
  kisaCevap: [
    "Boyle: n ve T sabitken P₁V₁ = P₂V₂; basınç iki katına çıkarsa hacim yarıya iner.",
    "Charles: n ve P sabitken V₁/T₁ = V₂/T₂; mutlak sıcaklık yüzde 20 artarsa hacim de yüzde 20 artar.",
    "Gay-Lussac: n ve V sabitken P₁/T₁ = P₂/T₂; kapalı kapta ısıtılan gazın basıncı artar.",
    "Birleşik gaz yasası: P₁V₁/T₁ = P₂V₂/T₂; gaz miktarı sabitken üç değişken birlikte değişebilir.",
    "Sıcaklık her zaman Kelvin olmalıdır: T(K) = t(°C) + 273,15.",
    "Lastik basıncı gibi gösterge basınçları hesaptan önce mutlak basınca çevrilir (gösterge + yaklaşık 1,013 bar).",
    "Bu yasalar ideal gaz denklemi PV = nRT'nin özel hâlleridir."
  ],
  figure: {
    alt: "Üç gaz yasası panosu: Boyle'da basınç arttıkça hacmin azaldığı hiperbol, Charles'ta hacmin Kelvin sıcaklıkla doğrusal arttığı çizgi, Gay-Lussac'ta basıncın Kelvin sıcaklıkla doğrusal arttığı çizgi ve sabit tutulan değişkenler.",
    caption: "Her yasada bir değişken sabit tutulur. Boyle'da eğri ters orantıyı, Charles ve Gay-Lussac'ta doğrular mutlak sıfırdan geçen doğru orantıyı gösterir. Örnek değerler yazıdaki çözümlü örneklerle aynıdır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Üç gaz yasası, üç sabit değişken</text>
  <g>
    <rect x="20" y="46" width="220" height="300" rx="10" class="sf sb"/>
    <text x="130" y="72" class="b mid">Boyle (T sabit)</text>
    <line x1="50" y1="260" x2="220" y2="260" class="st" fill="none"/><line x1="50" y1="260" x2="50" y2="90" class="st" fill="none"/>
    <path d="M62,100 Q90,220 210,245" class="sp sw" fill="none"/>
    <text x="135" y="280" class="sm mid">hacim V</text><text x="44" y="96" class="sm end">P</text>
    <circle cx="96" cy="182" r="5" class="p"/><text x="104" y="176" class="sm">6 L, 2 atm</text>
    <circle cx="74" cy="134" r="5" class="p"/><text x="82" y="128" class="sm">4 L, 3 atm</text>
    <text x="130" y="310" class="b mid">P₁V₁ = P₂V₂</text>
    <text x="130" y="332" class="sm mid t2">ters orantı</text>
  </g>
  <g>
    <rect x="250" y="46" width="220" height="300" rx="10" class="sf sb"/>
    <text x="360" y="72" class="b mid">Charles (P sabit)</text>
    <line x1="280" y1="260" x2="450" y2="260" class="st" fill="none"/><line x1="280" y1="260" x2="280" y2="90" class="st" fill="none"/>
    <line x1="280" y1="260" x2="440" y2="100" class="sok sw" fill="none"/>
    <text x="365" y="280" class="sm mid">sıcaklık T (K)</text><text x="274" y="96" class="sm end">V</text>
    <circle cx="380" cy="160" r="5" class="ok"/><text x="388" y="168" class="sm">300 K, 3 L</text>
    <circle cx="400" cy="140" r="5" class="ok"/><text x="348" y="130" class="sm">360 K, 3,6 L</text>
    <text x="360" y="310" class="b mid">V₁/T₁ = V₂/T₂</text>
    <text x="360" y="332" class="sm mid t2">doğru orantı</text>
  </g>
  <g>
    <rect x="480" y="46" width="220" height="300" rx="10" class="sf sb"/>
    <text x="590" y="72" class="b mid">Gay-Lussac (V sabit)</text>
    <line x1="510" y1="260" x2="680" y2="260" class="st" fill="none"/><line x1="510" y1="260" x2="510" y2="90" class="st" fill="none"/>
    <line x1="510" y1="260" x2="670" y2="110" class="sdg sw" fill="none"/>
    <text x="595" y="280" class="sm mid">sıcaklık T (K)</text><text x="504" y="96" class="sm end">P</text>
    <circle cx="610" cy="166" r="5" class="dg"/><text x="618" y="174" class="sm">283 K</text>
    <circle cx="634" cy="144" r="5" class="dg"/><text x="578" y="134" class="sm">323 K</text>
    <text x="590" y="310" class="b mid">P₁/T₁ = P₂/T₂</text>
    <text x="590" y="332" class="sm mid t2">doğru orantı</text>
  </g>
  <rect x="20" y="358" width="680" height="48" rx="8" class="p"/>
  <text x="360" y="380" class="b mid sf">Birleşik gaz yasası: P₁V₁ / T₁ = P₂V₂ / T₂</text>
  <text x="360" y="398" class="sm mid sf">Sıcaklık daima Kelvin: T = t + 273,15</text>
</svg>`
  },
  sections: [
    {
      h: "Gaz yasaları neyi anlatır?",
      p: [
        "Gazların davranışı dört büyüklükle tanımlanır: basınç (P), hacim (V), sıcaklık (T) ve gaz miktarı (n, mol). 17. ve 18. yüzyıllarda yapılan deneyler, bunlardan ikisi sabit tutulduğunda diğer ikisi arasında basit bir ilişki olduğunu gösterdi. Bu ilişkiler, onları bulan bilim insanlarının adıyla anılır: Boyle, Charles ve Gay-Lussac yasaları.",
        "Üç yasa da gaz moleküllerinin kendi hacminin ve aralarındaki çekimin ihmal edilebildiği \"ideal gaz\" varsayımıyla geçerlidir. Oda sıcaklığına yakın sıcaklıklarda ve birkaç atmosfere kadar basınçlarda hava, azot, oksijen ve helyum gibi gazlar bu varsayıma çok iyi uyar. Çok yüksek basınç ve çok düşük sıcaklıkta gerçek gazlar ideal davranıştan sapar."
      ]
    },
    {
      h: "Boyle yasası (P₁V₁ = P₂V₂) neyi anlatır?",
      p: [
        "Boyle yasasına göre sabit sıcaklıkta belirli miktardaki bir gazın basıncı ile hacmi ters orantılıdır. Gazı sıkıştırıp hacmini yarıya indirirseniz basıncı iki katına çıkar. Matematiksel olarak basınç ile hacmin çarpımı sabittir: P × V = sabit, yani P₁V₁ = P₂V₂.",
        "<strong>Çözümlü örnek:</strong> Bir pistonlu silindirde 2 atm basınçta 6 L hava var. Sıcaklık değişmeden piston itilerek hacim 4 L'ye indiriliyor. Yeni basınç P₂ = P₁V₁ ÷ V₂ = 2 × 6 ÷ 4 = 3 atm olur. Hacim üçte bir azaldı, basınç yüzde 50 arttı."
      ],
      formula: "P₁V₁ = P₂V₂   (n ve T sabit)\nP₂ = P₁V₁ ÷ V₂ = 2 atm × 6 L ÷ 4 L = 3 atm",
      after: [
        "Boyle yasasında sıcaklık hesaba girmediği için sıcaklık birimi önemli değildir; ama basınç ve hacim için her iki tarafta aynı birim kullanılmalıdır. Basınç birimleri arasında dönüşüm gerekiyorsa [[arac:bar-atm-cevir|Bar Atm Çevirici]]yi kullanabilir, birimlerin tamamı için [[bilgi:basinc-birimleri-bar-kpa-atm-psi|basınç birimleri]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Charles yasasına göre hacim sıcaklıkla nasıl değişir?",
      p: [
        "Charles yasası, sabit basınçta belirli miktardaki bir gazın hacminin mutlak sıcaklıkla doğru orantılı olduğunu söyler. Gaz ısıtıldığında molekülleri daha hızlı hareket eder, kabın çeperlerine daha sık ve güçlü çarpar; basınç sabit kalacaksa gaz genişlemek zorundadır. Bu yüzden sıcak hava balonları havalanır, güneşte bırakılan şişik bir balon gerilir.",
        "<strong>Çözümlü örnek:</strong> Hareketli pistonlu bir kapta 27 °C'de 3 L gaz var. Basınç sabitken gaz 87 °C'ye ısıtılıyor. Önce sıcaklıklar Kelvine çevrilir: 27 + 273 = 300 K, 87 + 273 = 360 K. V₂ = V₁ × T₂ ÷ T₁ = 3 × 360 ÷ 300 = 3,6 L. Mutlak sıcaklık yüzde 20 arttı, hacim de yüzde 20 arttı."
      ],
      formula: "V₁ ÷ T₁ = V₂ ÷ T₂   (n ve P sabit)\nV₂ = 3 L × 360 K ÷ 300 K = 3,6 L",
      after: [
        "Aynı hesabı Celsius ile yapsaydık 3 × 87 ÷ 27 = 9,67 L gibi tamamen yanlış bir sonuç bulurduk. Charles yasasının grafiği uzatıldığında hacmin sıfıra indiği nokta −273,15 °C'dir; bu nokta mutlak sıfırdır. Ayrıntı için [[bilgi:mutlak-sifir-nedir-kelvin-rankine|mutlak sıfır nedir]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Gay-Lussac yasası basınç ve sıcaklığı nasıl ilişkilendirir?",
      p: [
        "Gay-Lussac yasasına göre sabit hacimde belirli miktardaki gazın basıncı mutlak sıcaklıkla doğru orantılıdır. Kapalı ve esnemeyen bir kaptaki gaz ısıtıldığında hacim artamadığı için basınç artar. Düdüklü tencerenin içindeki basıncın ısıyla yükselmesi, sprey kutularının ateşe atılmaması uyarısı bu yasayla açıklanır.",
        "<strong>Çözümlü örnek (lastik basıncı):</strong> Sabah 10 °C'de bir lastiğin gösterge basıncı 2,2 bar ölçülüyor. Güneşli bir öğleden sonra uzun yolculuktan sonra lastik içi 50 °C'ye çıkıyor. Lastik hacmi yaklaşık sabit kabul edilir. Gösterge basıncı mutlak basınca çevrilir: 2,2 + 1,013 = 3,213 bar. Sıcaklıklar: 283,15 K ve 323,15 K. P₂ = 3,213 × 323,15 ÷ 283,15 ≈ 3,667 bar mutlak, yani yaklaşık 2,65 bar gösterge basıncı."
      ],
      formula: "P₁ ÷ T₁ = P₂ ÷ T₂   (n ve V sabit)\nP₂ (mutlak) = 3,213 bar × 323,15 K ÷ 283,15 K ≈ 3,667 bar\nGösterge = 3,667 − 1,013 ≈ 2,65 bar",
      after: [
        "Bu örnek, lastik basıncının neden soğukken ölçülmesi gerektiğini gösterir: aynı lastik sıcakken yaklaşık 0,45 bar daha yüksek okunur. Sıcakken hava indirmek, lastik soğuduğunda basıncın gerekenin altına düşmesine yol açar. Doğru değerler için [[bilgi:lastik-basinci-kac-bar-psi-olmali|lastik basıncı kaç bar olmalı]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Birleşik gaz yasası nasıl kullanılır?",
      p: [
        "Gerçek hayatta basınç, hacim ve sıcaklık çoğu zaman birlikte değişir. Gaz miktarı sabit kaldığı sürece üç yasa tek denklemde birleştirilebilir: P₁V₁/T₁ = P₂V₂/T₂. Bilinmeyen tek bir büyüklük kaldığında denklem ondan yana çözülür."
      ],
      ol: [
        "Verilenleri listeleyin: P₁ = 1 atm, V₁ = 10 L, t₁ = 27 °C; P₂ = 2 atm, t₂ = 127 °C; V₂ = ?",
        "Sıcaklıkları Kelvine çevirin: T₁ = 300 K, T₂ = 400 K (273 ile yuvarlanmıştır).",
        "Denklemi V₂ için düzenleyin: V₂ = P₁V₁T₂ ÷ (T₁P₂).",
        "Değerleri yerine koyun: V₂ = 1 × 10 × 400 ÷ (300 × 2) = 6,67 L.",
        "Sonucu yorumlayın: basıncın iki katına çıkması hacmi yarıya indirirdi (5 L), ama sıcaklığın üçte bir artması hacmi büyüttü; net sonuç 6,67 L."
      ],
      after: [
        "Bu tür hesapları [[arac:birlesik-gaz-yasasi-hesapla|Birleşik Gaz Yasası aracında]] ilk ve son durumu girerek doğrulayabilirsiniz. Sıcaklıkları çevirmek için [[arac:celsius-kelvin-cevir|Celsius Kelvin Çevirici]] kullanılabilir."
      ]
    },
    {
      h: "Hesaplamalarda sıcaklık neden Kelvin olmalıdır?",
      p: [
        "Charles ve Gay-Lussac yasaları oransal ilişkilerdir: sıcaklık iki katına çıkınca hacim ya da basınç iki katına çıkar. Bu oranın anlamlı olması için sıcaklık ölçeğinin sıfır noktasının gerçek bir sıfır, yani moleküler hareketin en düşük olduğu mutlak sıfır olması gerekir. Celsius ölçeğinin sıfırı ise suyun donma noktasıdır ve fiziksel olarak \"sıcaklığın yokluğu\" anlamına gelmez.",
        "10 °C'den 20 °C'ye çıkmak sıcaklığı iki katına çıkarmaz; Kelvin olarak 283,15 K'den 293,15 K'ye, yani yaklaşık yüzde 3,5 artıştır. Celsius ile hesap yapan biri bu durumda gazın hacminin iki katına çıktığını sanır. Negatif Celsius sıcaklıklarda ise hacim ya da basınç negatif çıkar, ki bu fiziksel olarak imkânsızdır. Bu yüzden gaz yasalarında her zaman T(K) = t(°C) + 273,15 dönüşümü yapılır."
      ]
    },
    {
      h: "Bu yasalar ideal gaz denkleminden nasıl türetilir?",
      p: [
        "İdeal gaz denklemi PV = nRT, dört büyüklüğü tek ifadede bağlar; R evrensel gaz sabitidir (8,314 J/(mol·K) ya da 0,08206 L·atm/(mol·K)). Gaz miktarı n sabit tutulduğunda PV/T = nR sabit olur; bu, birleşik gaz yasasıdır. Ek olarak T sabit tutulursa PV = sabit (Boyle), P sabit tutulursa V/T = sabit (Charles), V sabit tutulursa P/T = sabit (Gay-Lussac) elde edilir.",
        "Avogadro yasası da aynı denklemin bir sonucudur: P ve T sabitken hacim mol sayısıyla doğru orantılıdır. Mol sayısının da değiştiği ya da mol sayısının sorulduğu problemlerde doğrudan PV = nRT kullanılır. Bu denklemin ayrıntılı kullanımı için [[bilgi:ideal-gaz-denklemi-pv-nrt|ideal gaz denklemi]] yazısına, hesaplama için [[arac:ideal-gaz-denklemi-hesapla|İdeal Gaz Denklemi aracına]] bakabilirsiniz."
      ],
      table: {
        head: ["Yasa", "Sabit tutulan", "İlişki", "Formül"],
        rows: [
          ["Boyle", "n, T", "P ile V ters orantılı", "P₁V₁ = P₂V₂"],
          ["Charles", "n, P", "V ile T doğru orantılı", "V₁/T₁ = V₂/T₂"],
          ["Gay-Lussac", "n, V", "P ile T doğru orantılı", "P₁/T₁ = P₂/T₂"],
          ["Avogadro", "P, T", "V ile n doğru orantılı", "V₁/n₁ = V₂/n₂"],
          ["Birleşik", "n", "Üçü birlikte", "P₁V₁/T₁ = P₂V₂/T₂"],
          ["İdeal gaz", "—", "Dört büyüklük", "PV = nRT"]
        ]
      }
    },
    {
      h: "Şırınga, dalgıç tüpü ve diğer günlük örnekler",
      ul: [
        "<strong>Şırınga (Boyle):</strong> Ucu kapatılmış şırınganın pistonunu ittiğinizde hacim azalır ve basınç artar; pistonu bıraktığınızda geri iter.",
        "<strong>Dalış (Boyle):</strong> Suda her 10 metre yaklaşık 1 atm basınç ekler. Yüzeyde 1 atm'de 6 L olan akciğerdeki hava 10 m'de 2 atm basınçta 3 L'ye sıkışır. Yükselirken tersine genişler; bu yüzden dalgıçlara nefeslerini tutarak yükselmemeleri öğretilir.",
        "<strong>Kulak tıkanması (Boyle):</strong> Uçak alçalırken kabin basıncı arttığında orta kulaktaki hava sıkışır ve kulak zarı içe doğru itilir.",
        "<strong>Sıcak hava balonu (Charles):</strong> Isıtılan hava genişler, yoğunluğu düşer ve balon yükselir.",
        "<strong>Buzdolabından çıkan şişe (Charles/Gay-Lussac):</strong> Soğukta kapağı kapatılan şişe ısındığında içerideki basınç artar.",
        "<strong>Düdüklü tencere ve sprey kutusu (Gay-Lussac):</strong> Sabit hacimde ısınan gazın basıncı yükselir; bu yüzden sprey kutuları ısı kaynağından uzak tutulur."
      ],
      after: [
        "Basınçlı kaplar, tüpler ve kimyasal gazlarla yapılan deneyler yalnızca uygun güvenlik önlemleri ve yetişkin gözetiminde yapılmalıdır. Kapalı bir kabı ısıtmak patlamaya yol açabilir."
      ]
    },
    {
      h: "Bar, atm ve kPa birimleri nasıl çevrilir? Sık yapılan hatalar",
      p: [
        "Gaz yasalarında her iki tarafta aynı basınç birimi kullanıldığı sürece birim seçimi sonucu değiştirmez. Ancak verilen değerler farklı birimlerdeyse önce aynı birime çevrilmelidir: 1 atm = 101,325 kPa = 1,01325 bar = 760 mmHg; 1 bar = 100 kPa."
      ],
      ul: [
        "<strong>Celsius ile hesaplamak:</strong> Charles, Gay-Lussac ve birleşik yasada sıcaklık mutlaka Kelvin olmalıdır.",
        "<strong>Gösterge basıncını mutlak sanmak:</strong> Lastik ve tüp göstergeleri atmosfer basıncının üstünü gösterir; hesaptan önce yaklaşık 1,013 bar ekleyin, sonuçtan tekrar çıkarın.",
        "<strong>Birimleri karıştırmak:</strong> P₁ bar, P₂ atm olarak yazılırsa sonuç yaklaşık yüzde 1,3 sapar; litre ile mililitre karışırsa sonuç 1.000 kat yanlış olur.",
        "<strong>Gaz miktarının değiştiğini gözden kaçırmak:</strong> Lastiğe hava eklendiyse ya da kaptan gaz kaçtıysa birleşik yasa değil ideal gaz denklemi kullanılmalıdır.",
        "<strong>Sabit tutulanı karıştırmak:</strong> Esnek bir balon için hacim sabit değildir; sert bir tüp için hacim sabittir. Hangi yasanın uygulanacağı buna göre seçilir."
      ]
    }
  ],
  faq: [
    ["Boyle yasası (P₁V₁ = P₂V₂) neyi anlatır?", "Boyle yasası, sabit sıcaklıkta belirli miktardaki bir gazın basıncı ile hacminin ters orantılı olduğunu söyler. Basınç ile hacmin çarpımı sabittir; 2 atm ve 6 litrelik gaz 4 litreye sıkıştırılırsa basınç 3 atm olur."],
    ["Charles yasasına göre hacim sıcaklıkla nasıl değişir?", "Sabit basınçta gazın hacmi mutlak sıcaklıkla doğru orantılıdır. 27 °C'de 3 litre olan gaz 87 °C'ye ısıtılırsa sıcaklık 300 K'den 360 K'ye çıktığı için hacim 3,6 litre olur."],
    ["Gay-Lussac yasası basınç ve sıcaklığı nasıl ilişkilendirir?", "Sabit hacimde gazın basıncı mutlak sıcaklıkla doğru orantılıdır. Kapalı ve sert bir kaptaki gaz ısıtılırsa basıncı artar; düdüklü tencere ve sıcakta artan lastik basıncı bu yasayla açıklanır."],
    ["Birleşik gaz yasası nasıl kullanılır?", "Gaz miktarı sabitken P₁V₁/T₁ = P₂V₂/T₂ denklemi kullanılır. Bilinen beş değeri aynı birimlerle ve sıcaklığı Kelvin olarak yerine koyup bilinmeyen tek büyüklüğü çekersiniz."],
    ["Hesaplamalarda sıcaklık neden Kelvin olmalıdır?", "Gaz yasaları oransal ilişkiler olduğu için sıcaklık ölçeğinin sıfırı gerçek bir sıfır, yani mutlak sıfır olmalıdır. Celsius ile hesap yapmak yanlış oranlar ve negatif sıcaklıklarda imkânsız sonuçlar verir."],
    ["Bu yasalar ideal gaz denkleminden nasıl türetilir?", "PV = nRT denkleminde n sabit tutulursa PV/T sabit olur. Ayrıca T sabitse Boyle, P sabitse Charles, V sabitse Gay-Lussac yasası elde edilir; yani üç yasa ideal gaz denkleminin özel hâlleridir."],
    ["Lastik basıncı sıcaklıkla neden değişir?", "Lastiğin hacmi yaklaşık sabit kaldığı için içindeki havanın basıncı Gay-Lussac yasasına göre mutlak sıcaklıkla artar. 10 °C'de 2,2 bar olan lastik 50 °C'de yaklaşık 2,65 bar gösterir; bu yüzden basınç soğukken ölçülür."],
    ["Dalgıç tüpü ve şırınga örnekleri hangi yasayla açıklanır?", "İkisi de Boyle yasasıyla açıklanır. Ucu kapalı şırınga sıkıştırıldığında basınç artar; dalgıç 10 metre indiğinde basınç iki katına çıkar ve akciğerdeki hava yarı hacme sıkışır."],
    ["Bar, atm ve kPa birimleri nasıl çevrilir?", "1 atm 101,325 kPa ve 1,01325 bar eder; 1 bar 100 kPa'dır. Gaz yasalarında her iki tarafta aynı birim kullanıldığı sürece sonuç değişmez, ancak karışık birimler önce aynı birime çevrilmelidir."]
  ],
  tools: ["birlesik-gaz-yasasi-hesapla", "ideal-gaz-denklemi-hesapla", "celsius-kelvin-cevir", "bar-atm-cevir"],
  related: ["ideal-gaz-denklemi-pv-nrt", "mutlak-sifir-nedir-kelvin-rankine", "basinc-birimleri-bar-kpa-atm-psi"]
};
