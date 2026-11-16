export default {
  slug: "ideal-gaz-denklemi-pv-nrt",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "İdeal Gaz Denklemi PV=nRT Nedir? Gaz Yasaları ve Örnek Soru Çözümü",
  pageTitle: "İdeal Gaz Denklemi PV=nRT: R Değeri, Gaz Yasaları ve Örnekler",
  description: "PV = nRT; basınç, hacim, mol sayısı ve mutlak sıcaklığı bağlar. R = 0,082 L·atm/(mol·K) = 8,314 J/(mol·K). Boyle, Charles, Gay-Lussac yasaları ve çözümlü sorular.",
  keywords: ["ideal gaz denklemi", "pv=nrt", "gaz yasaları", "r gaz sabiti", "boyle mariotte yasası", "birleşik gaz yasası", "normal koşullarda 1 mol gaz kaç litre", "gaz yoğunluğu formülü"],
  lead: "İdeal gaz denklemi <strong>PV = nRT</strong>, bir gazın basıncını (P), hacmini (V), mol sayısını (n) ve mutlak sıcaklığını (T) tek bir eşitlikte birleştirir; R ise evrensel gaz sabitidir ve birimlere göre <strong>0,082 L·atm/(mol·K)</strong> ya da <strong>8,314 J/(mol·K)</strong> değerini alır. Üç büyüklüğü bilinen bir gazın dördüncüsü bu denklemle hesaplanır. Bu rehberde R'nin hangi birimle kullanılacağını, Boyle, Charles ve Gay-Lussac yasalarının denklemden nasıl çıktığını, normal koşullarda 1 molün neden 22,4 litre olduğunu, yoğunluk hesabını ve adım adım çözümlü soruları bulacaksınız.",
  kisaCevap: [
    "İdeal gaz denklemi: P × V = n × R × T; T her zaman Kelvin cinsindendir (T = °C + 273,15).",
    "R = 0,082057 L·atm/(mol·K) = 8,314 J/(mol·K) = 62,36 L·mmHg/(mol·K); soruda verilen birimlere uygun R seçilir.",
    "Boyle: sabit sıcaklıkta P₁V₁ = P₂V₂. Charles: sabit basınçta V₁/T₁ = V₂/T₂. Gay-Lussac: sabit hacimde P₁/T₁ = P₂/T₂.",
    "Birleşik gaz yasası: P₁V₁/T₁ = P₂V₂/T₂ (mol sayısı sabit).",
    "Normal koşullarda (0 °C, 1 atm) 1 mol ideal gaz 22,4 L hacim kaplar.",
    "Gaz yoğunluğu: d = P × M ÷ (R × T); M mol kütlesidir (g/mol)."
  ],
  figure: {
    alt: "PV = nRT denkleminin dört değişkeni ve R sabitinin üç birim karşılığı; altında sabit tutulan büyüklüğe göre Boyle, Charles ve Gay-Lussac yasalarının denklemden nasıl türediğini gösteren üç kutu.",
    caption: "Ortadaki denklem dört değişkeni bağlar. Değişkenlerden biri ve mol sayısı sabit tutulduğunda klasik gaz yasaları ortaya çıkar: sıcaklık sabitse Boyle, basınç sabitse Charles, hacim sabitse Gay-Lussac. R'nin değeri basınç ve hacim için seçilen birime bağlıdır.",
    svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">PV = nRT ve gaz yasaları</text>
  <rect x="200" y="50" width="320" height="76" rx="12" class="p"/>
  <text x="360" y="100" class="xl mid sf">P · V = n · R · T</text>
  <g class="sm mid">
    <rect x="20" y="52" width="160" height="34" rx="6" class="sf sb"/><text x="100" y="74"><tspan class="b">P</tspan> basınç (atm, kPa)</text>
    <rect x="20" y="92" width="160" height="34" rx="6" class="sf sb"/><text x="100" y="114"><tspan class="b">V</tspan> hacim (L)</text>
    <rect x="540" y="52" width="160" height="34" rx="6" class="sf sb"/><text x="620" y="74"><tspan class="b">n</tspan> mol sayısı</text>
    <rect x="540" y="92" width="160" height="34" rx="6" class="sf sb"/><text x="620" y="114"><tspan class="b">T</tspan> sıcaklık (K)</text>
  </g>
  <rect x="20" y="146" width="680" height="64" rx="8" class="ps"/>
  <text x="360" y="170" class="b mid">R evrensel gaz sabiti</text>
  <text x="360" y="196" class="mid">0,082057 L·atm/(mol·K) · 8,314 J/(mol·K) · 62,36 L·mmHg/(mol·K)</text>
  <g class="mid">
    <rect x="20" y="232" width="216" height="130" rx="10" class="sf sb"/>
    <text x="128" y="258" class="b">Boyle–Mariotte</text>
    <text x="128" y="280" class="sm mu">T ve n sabit</text>
    <text x="128" y="312" class="lg b p">P₁V₁ = P₂V₂</text>
    <text x="128" y="342" class="sm">basınç artar, hacim azalır</text>
    <rect x="252" y="232" width="216" height="130" rx="10" class="sf sb"/>
    <text x="360" y="258" class="b">Charles</text>
    <text x="360" y="280" class="sm mu">P ve n sabit</text>
    <text x="360" y="312" class="lg b p">V₁/T₁ = V₂/T₂</text>
    <text x="360" y="342" class="sm">ısınan gaz genleşir</text>
    <rect x="484" y="232" width="216" height="130" rx="10" class="sf sb"/>
    <text x="592" y="258" class="b">Gay-Lussac</text>
    <text x="592" y="280" class="sm mu">V ve n sabit</text>
    <text x="592" y="312" class="lg b p">P₁/T₁ = P₂/T₂</text>
    <text x="592" y="342" class="sm">ısınan kapta basınç artar</text>
  </g>
  <rect x="20" y="378" width="680" height="40" rx="8" class="oks"/>
  <text x="360" y="403" class="mid b">Birleşik yasa: P₁V₁/T₁ = P₂V₂/T₂ · Sıcaklık daima Kelvin</text>
</svg>`
  },
  sections: [
    {
      h: "İdeal gaz denklemi nedir?",
      p: [
        "İdeal gaz, tanecikleri arasında çekim ya da itme kuvveti bulunmayan, taneciklerin kendi hacmi kabın hacmi yanında ihmal edilebilecek kadar küçük olan ve çarpışmaları tamamen esnek kabul edilen kuramsal bir gazdır. Gerçek gazlar düşük basınç ve yüksek sıcaklıkta bu modele çok yaklaşır; bu yüzden ideal gaz denklemi günlük koşullardaki hava, oksijen, azot, karbondioksit gibi gazlar için oldukça doğru sonuç verir.",
        "Denklem, 17. ve 19. yüzyıllar arasında deneylerle bulunan ayrı gaz yasalarının (Boyle, Charles, Gay-Lussac ve Avogadro) tek bir ifadede birleşmiş hâlidir. Dört değişkenden üçünü biliyorsanız dördüncüsünü bulabilirsiniz: P × V = n × R × T."
      ],
      table: {
        head: ["Sembol", "Büyüklük", "Yaygın birim", "Dikkat edilecek nokta"],
        rows: [
          ["P", "Basınç", "atm, kPa, mmHg, Pa", "1 atm = 101,325 kPa = 760 mmHg"],
          ["V", "Hacim", "L (dm³), m³", "1 m³ = 1.000 L; 1 mL = 0,001 L"],
          ["n", "Mol sayısı", "mol", "n = kütle (g) ÷ mol kütlesi (g/mol)"],
          ["R", "Evrensel gaz sabiti", "L·atm/(mol·K) ya da J/(mol·K)", "Birimi P ve V birimleriyle uyumlu olmalı"],
          ["T", "Mutlak sıcaklık", "K (Kelvin)", "T = °C + 273,15; Celsius asla doğrudan kullanılmaz"]
        ]
      },
      after: [
        "Mol kavramı ve mol kütlesi hesabı bu denklemin ön koşuludur; konuyu tazelemek isterseniz [[bilgi:mol-nedir-nasil-hesaplanir|mol nedir]] yazısına bakabilirsiniz. Basıncın birimleri ve anlamı ise [[bilgi:basinc-nedir-nasil-hesaplanir|basınç nedir]] yazısında anlatılıyor."
      ]
    },
    {
      h: "PV=nRT'de R değeri kaçtır?",
      p: [
        "R'nin sayısal değeri hangi birim sisteminde çalıştığınıza göre değişir; fiziksel anlamı aynıdır. Doğru R'yi seçmenin kuralı basittir: soruda basınç ve hacim hangi birimlerle verilmişse, onlarla uyumlu R'yi kullanın ya da önce birimleri dönüştürün."
      ],
      table: {
        head: ["R değeri", "Birim", "Ne zaman kullanılır?"],
        rows: [
          ["0,082057 (okulda 0,082)", "L·atm/(mol·K)", "Basınç atm, hacim litre"],
          ["8,314", "J/(mol·K) = Pa·m³/(mol·K)", "SI birimleri: basınç Pa, hacim m³; enerji hesapları"],
          ["8,314", "kPa·L/(mol·K)", "Basınç kPa, hacim litre"],
          ["62,36", "L·mmHg/(mol·K)", "Basınç mmHg (torr), hacim litre"],
          ["0,08314", "L·bar/(mol·K)", "Basınç bar, hacim litre"]
        ],
        caption: "R = 8,314462618 J/(mol·K), Avogadro sayısı ile Boltzmann sabitinin çarpımıdır ve 2019'dan beri SI'da tam değer olarak tanımlıdır."
      },
      after: [
        "Lise kimyasında ve sınav sorularında R genellikle 0,082 ya da 22,4/273 olarak verilir. 22,4 ÷ 273 = 0,08205 olduğu için ikisi aynı şeydir; sorular bu kesirle kolay sadeleşecek şekilde hazırlanır."
      ]
    },
    {
      h: "Sıcaklık neden Kelvin olarak alınır?",
      p: [
        "Gaz yasalarında hacim ve basınç sıcaklıkla <strong>doğru orantılıdır</strong>; ancak bu orantı yalnızca sıfır noktası gerçek bir sıfır olan ölçekte geçerlidir. Celsius ölçeğinde 0 °C suyun donma noktasıdır, gazın enerjisinin sıfır olduğu nokta değildir. 10 °C'den 20 °C'ye ısınan bir gazın hacmi iki katına çıkmaz; Kelvin'e çevirdiğinizde 283,15 K'den 293,15 K'e, yani yalnızca %3,5 kadar bir artış olduğunu görürsünüz.",
        "Kelvin ölçeğinin sıfırı (0 K = −273,15 °C) mutlak sıfırdır; bu noktada ideal bir gazın basıncı ve hacmi kuramsal olarak sıfıra iner. Bu yüzden denklemde sıcaklık her zaman T = °C + 273,15 ile Kelvin'e çevrilir; sınav sorularında çoğunlukla 273 kullanılır. Dönüşüm için [[arac:celsius-kelvin-cevir|Celsius Kelvin Çevirici]] işinizi görür; ısı ile sıcaklık kavramlarının farkı ise [[bilgi:isi-ve-sicaklik-farki|ısı ve sıcaklık farkı]] yazısında."
      ]
    },
    {
      h: "Boyle, Charles ve Gay-Lussac yasaları nedir?",
      p: [
        "Bu üç yasa, ideal gaz denkleminde mol sayısı ve bir değişken daha sabit tutulduğunda ortaya çıkan özel durumlardır. Hepsi aynı denklemin farklı görünümleridir; ezberlemek yerine \"hangi büyüklük sabit?\" sorusunu sormak yeterlidir."
      ],
      ul: [
        "<strong>Boyle–Mariotte yasası (T ve n sabit):</strong> P × V = sabit, yani P₁V₁ = P₂V₂. Şırınganın ucunu kapatıp pistonu ittiğinizde hacim yarıya inerse basınç iki katına çıkar. Basınç ile hacim ters orantılıdır.",
        "<strong>Charles yasası (P ve n sabit):</strong> V ÷ T = sabit, yani V₁/T₁ = V₂/T₂. Ağzı balonla kapatılmış bir şişe ılık suya konduğunda balon şişer; ısınan gaz genleşir. Hacim mutlak sıcaklıkla doğru orantılıdır.",
        "<strong>Gay-Lussac yasası (V ve n sabit):</strong> P ÷ T = sabit, yani P₁/T₁ = P₂/T₂. Kapalı bir sprey kutusunun ateşe atılmaması bundandır: hacim değişemediği için ısınan gazın basıncı yükselir. Basınç mutlak sıcaklıkla doğru orantılıdır.",
        "<strong>Avogadro yasası (P ve T sabit):</strong> V ÷ n = sabit. Aynı koşullarda eşit hacimdeki gazlar eşit sayıda tanecik içerir; molar hacim kavramı buradan gelir."
      ]
    },
    {
      h: "Birleşik gaz yasası nasıl kullanılır?",
      p: [
        "Mol sayısı sabit kalırken basınç, hacim ve sıcaklık aynı anda değişiyorsa üç yasa tek bir eşitlikte birleştirilir. Bu eşitlikte R'ye ihtiyaç yoktur; yalnızca başlangıç ve son durumu karşılaştırırsınız. Basınç ve hacim birimleri iki tarafta aynı olduğu sürece hangi birimi kullandığınız önemli değildir, ama sıcaklık yine Kelvin olmalıdır."
      ],
      formula: "P₁ × V₁ ÷ T₁ = P₂ × V₂ ÷ T₂\nV₂ = V₁ × (P₁ ÷ P₂) × (T₂ ÷ T₁)",
      after: [
        "<strong>Çözümlü örnek:</strong> 27 °C'de ve 1 atm basınçta 20 L hacim kaplayan bir gaz, 127 °C'ye ısıtılıp basıncı 2 atm'ye çıkarılıyor. Son hacim kaçtır? Sıcaklıkları Kelvin'e çevirin: T₁ = 300 K, T₂ = 400 K. V₂ = 20 × (1 ÷ 2) × (400 ÷ 300) = 20 × 0,5 × 1,333 = <strong>13,3 L</strong>. Basıncın iki katına çıkması hacmi yarıya indirirken sıcaklık artışı onu üçte bir oranında büyütmüştür. Bu tür soruları [[arac:birlesik-gaz-yasasi-hesapla|Birleşik Gaz Yasası Hesaplama]] aracıyla kontrol edebilirsiniz."
      ]
    },
    {
      h: "Örnek soru çözümleri: PV=nRT",
      p: [
        "<strong>Soru 1 – Basınç bulma:</strong> 10 L'lik kapalı bir kapta 27 °C'de 2 mol gaz bulunuyor. Basınç kaç atm'dir?"
      ],
      ol: [
        "Sıcaklığı Kelvin'e çevirin: T = 27 + 273 = 300 K.",
        "Denklemi P için düzenleyin: P = n × R × T ÷ V.",
        "Değerleri yerleştirin: P = 2 × 0,082 × 300 ÷ 10.",
        "Sonuç: P = 49,2 ÷ 10 = <strong>4,92 atm</strong>."
      ],
      after: [
        "<strong>Soru 2 – Mol sayısı bulma:</strong> 5 atm basınçta ve 27 °C'de 10 L hacim kaplayan oksijen gazı kaç moldür, kaç gramdır? n = P × V ÷ (R × T) = 5 × 10 ÷ (0,082 × 300) = 50 ÷ 24,6 ≈ <strong>2,03 mol</strong>. Oksijenin (O₂) mol kütlesi 32 g/mol olduğundan kütle 2,03 × 32 ≈ <strong>65 g</strong> eder.",
        "<strong>Soru 3 – Sıcaklık bulma:</strong> 0,5 mol gaz 2 atm basınçta 6,15 L hacim kaplıyor. Sıcaklık kaç °C'dir? T = P × V ÷ (n × R) = 2 × 6,15 ÷ (0,5 × 0,082) = 12,3 ÷ 0,041 = 300 K, yani <strong>27 °C</strong>.",
        "Kendi değerlerinizle hesap yapmak ya da sonucu kontrol etmek için [[arac:ideal-gaz-denklemi-hesapla|İdeal Gaz Denklemi Hesaplama]] aracını kullanın; araç bilinmeyeni seçmenize, basıncı atm, kPa, bar ya da mmHg, sıcaklığı °C ya da K olarak girmenize izin verir."
      ]
    },
    {
      h: "Normal koşullarda 1 mol gaz kaç litredir?",
      p: [
        "Denklemi V = n × R × T ÷ P olarak yazıp n = 1 mol, T = 273,15 K ve P = 1 atm koyduğunuzda V = 0,082057 × 273,15 ≈ <strong>22,4 L</strong> bulunur. Bu, gazın türünden bağımsızdır: 1 mol hidrojen de 1 mol karbondioksit de bu koşullarda yaklaşık 22,4 L hacim kaplar."
      ],
      table: {
        head: ["Koşul", "Sıcaklık", "Basınç", "1 mol ideal gazın hacmi"],
        rows: [
          ["Normal koşullar (NK)", "0 °C (273,15 K)", "1 atm", "22,41 L"],
          ["IUPAC standart sıcaklık ve basınç", "0 °C", "1 bar (100 kPa)", "22,71 L"],
          ["Oda koşulları (25 °C, 1 atm)", "25 °C (298,15 K)", "1 atm", "24,47 L"],
          ["Standart ortam koşulları (SATP)", "25 °C", "1 bar", "24,79 L"]
        ],
        caption: "Türkiye'deki lise müfredatında ve sınavlarda normal koşullar 0 °C ve 1 atm, molar hacim 22,4 L olarak alınır; oda koşulları için 24,5 L kullanılır."
      }
    },
    {
      h: "Gaz yoğunluğu nasıl hesaplanır?",
      p: [
        "Yoğunluk kütlenin hacme bölümüdür. İdeal gaz denkleminde n yerine kütle ÷ mol kütlesi (m ÷ M) yazılıp düzenlendiğinde gaz yoğunluğu için kullanışlı bir formül elde edilir. Bu formül, bir gazın havadan ağır mı hafif mi olduğunu anlamak için de kullanılır; havanın ortalama mol kütlesi yaklaşık 28,97 g/mol'dür."
      ],
      formula: "P × V = (m ÷ M) × R × T\nd = m ÷ V = P × M ÷ (R × T)",
      after: [
        "Örnek: 25 °C ve 1 atm'de karbondioksitin (M = 44 g/mol) yoğunluğu d = 1 × 44 ÷ (0,082057 × 298,15) ≈ <strong>1,80 g/L</strong>'dir. Havanın aynı koşullardaki yoğunluğu yaklaşık 1,18 g/L olduğundan karbondioksit havadan ağırdır ve kapalı, alçak yerlerde birikir. Normal koşullarda oksijenin yoğunluğu ise 32 ÷ 22,41 ≈ 1,43 g/L'dir. Bu hesapları [[arac:gaz-yogunlugu-hesapla|Gaz Yoğunluğu Hesaplama]] aracıyla yapabilir, yoğunluk kavramının genel anlatımını [[bilgi:yogunluk-nedir-nasil-hesaplanir|yoğunluk nedir]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Gerçek gazlar ideal gazdan neden sapar?",
      p: [
        "İdeal gaz modelinin iki varsayımı gerçekte tam doğru değildir. Birincisi, gaz taneciklerinin kendi hacmi vardır; yüksek basınçta tanecikler birbirine yaklaştığında bu hacim kabın hacmine göre önemsiz olmaktan çıkar. İkincisi, tanecikler arasında zayıf çekim kuvvetleri bulunur; düşük sıcaklıkta tanecikler yavaşladığında bu çekim belirginleşir ve gaz beklenenden düşük basınç gösterir, sonunda sıvılaşır.",
        "Bu yüzden gerçek gazlar <strong>yüksek sıcaklık ve düşük basınçta</strong> ideale yaklaşır, düşük sıcaklık ve yüksek basınçta sapar. Taneciklerin büyük ve polar olduğu gazlar (ör. su buharı, amonyak) daha fazla, küçük ve apolar olanlar (helyum, hidrojen) daha az sapar. Sapmaları hesaba katmak için van der Waals denklemi gibi düzeltilmiş denklemler kullanılır; bu denklemde basınca çekim kuvvetlerini, hacme ise tanecik hacmini temsil eden düzeltme terimleri eklenir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Celsius ile hesap yapmak:</strong> En yaygın hatadır; sıcaklığı mutlaka Kelvin'e çevirin.",
        "<strong>R ile birimleri uyumsuz kullanmak:</strong> Basınç kPa iken 0,082 kullanmak sonucu yaklaşık 100 kat hatalı çıkarır.",
        "<strong>Mililitreyi litreye çevirmemek:</strong> 500 mL = 0,5 L'dir.",
        "<strong>Kütleyi mol yerine koymak:</strong> n her zaman mol sayısıdır; gram verildiyse mol kütlesine bölün.",
        "<strong>Birleşik yasada mol değişirken formülü kullanmak:</strong> Kaba gaz eklenip çıkarılıyorsa PV = nRT'yi iki durum için ayrı ayrı yazın."
      ]
    }
  ],
  faq: [
    ["İdeal gaz denklemi nedir?", "İdeal gaz denklemi PV = nRT eşitliğidir ve bir gazın basıncını, hacmini, mol sayısını ve mutlak sıcaklığını birbirine bağlar. Dört büyüklükten üçü bilindiğinde dördüncüsü hesaplanır; düşük basınç ve yüksek sıcaklıktaki gerçek gazlar için de iyi sonuç verir."],
    ["PV=nRT'de R değeri kaçtır?", "R, basınç atm ve hacim litre iken 0,082057 L·atm/(mol·K), SI birimlerinde 8,314 J/(mol·K), basınç mmHg iken 62,36 L·mmHg/(mol·K) değerini alır. Soruda kullanılan birimlerle uyumlu R seçilmelidir."],
    ["Boyle, Charles ve Gay-Lussac yasaları nedir?", "Boyle yasası sabit sıcaklıkta basınç ile hacmin ters orantılı olduğunu, Charles yasası sabit basınçta hacmin mutlak sıcaklıkla, Gay-Lussac yasası sabit hacimde basıncın mutlak sıcaklıkla doğru orantılı olduğunu söyler. Üçü de ideal gaz denkleminin özel hâlleridir."],
    ["Birleşik gaz yasası nasıl kullanılır?", "Mol sayısı sabitken P₁V₁/T₁ = P₂V₂/T₂ eşitliğinde beş değer yerine konur ve altıncısı bulunur. Basınç ve hacim birimleri iki tarafta aynı olmalı, sıcaklıklar ise mutlaka Kelvin cinsinden yazılmalıdır."],
    ["Sıcaklık neden Kelvin olarak alınır?", "Gaz yasalarındaki doğru orantılar yalnızca sıfırı mutlak sıfır olan bir ölçekte geçerlidir. Celsius'ta 0 derece suyun donma noktasıdır; Kelvin ölçeğinde 0 K mutlak sıfırdır. Bu yüzden sıcaklığa 273,15 eklenerek Kelvin'e çevrilir."],
    ["Gaz yoğunluğu nasıl hesaplanır?", "Gaz yoğunluğu d = P × M ÷ (R × T) formülüyle bulunur; M gazın mol kütlesidir. Örneğin 25 °C ve 1 atm'de karbondioksitin yoğunluğu yaklaşık 1,80 g/L'dir ve havadan ağırdır."],
    ["Normal koşullarda 1 mol gaz kaç litredir?", "Normal koşullarda, yani 0 °C ve 1 atm basınçta, 1 mol ideal gaz 22,4 litre hacim kaplar. Oda koşullarında (25 °C, 1 atm) bu değer yaklaşık 24,5 litreye çıkar; gazın türü sonucu değiştirmez."],
    ["Gerçek gazlar ideal gazdan neden sapar?", "Gerçek gaz taneciklerinin kendi hacmi vardır ve aralarında çekim kuvvetleri bulunur. Yüksek basınçta tanecik hacmi, düşük sıcaklıkta çekim kuvvetleri önem kazandığı için sapma artar; van der Waals denklemi bu etkileri düzeltir."],
    ["R sabiti 22,4/273 ile 0,082 aynı mı?", "Evet. 22,4'ün 273'e bölümü yaklaşık 0,08205'tir ve bu, L·atm/(mol·K) birimindeki R değeridir. Sınav soruları hesabı kolaylaştırmak için R'yi çoğunlukla 22,4/273 kesri olarak verir."]
  ],
  tools: ["ideal-gaz-denklemi-hesapla", "birlesik-gaz-yasasi-hesapla", "celsius-kelvin-cevir", "gaz-yogunlugu-hesapla"],
  related: ["mol-nedir-nasil-hesaplanir", "basinc-nedir-nasil-hesaplanir", "yogunluk-nedir-nasil-hesaplanir", "isi-ve-sicaklik-farki"],
  sources: [
    ["BIPM – SI Broşürü (tanımlı sabitler)", "https://www.bipm.org/en/publications/si-brochure"],
    ["NIST – Molar gaz sabiti R", "https://physics.nist.gov/cgi-bin/cuu/Value?r"]
  ]
};
