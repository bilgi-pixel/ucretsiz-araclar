export default {
  slug: "korelasyon-ve-regresyon-farki",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Korelasyon ve Regresyon Arasındaki Fark: Pearson r ve En Küçük Kareler",
  pageTitle: "Korelasyon ve Regresyon Farkı: Pearson r, R² ve Regresyon",
  description: "Korelasyon iki değişkenin birlikte değişme gücünü, regresyon birinden ötekini tahmin eden doğruyu verir. Pearson r, R², en küçük kareler ve çözümlü örnek.",
  keywords: ["korelasyon nedir", "regresyon nedir", "pearson korelasyon katsayısı", "korelasyon regresyon farkı", "doğrusal regresyon", "r kare nedir", "korelasyon nedensellik", "en küçük kareler"],
  lead: "Korelasyon, iki sayısal değişkenin birlikte ne kadar ve hangi yönde değiştiğini −1 ile +1 arasındaki tek bir sayıyla (Pearson r) özetler; <strong>regresyon</strong> ise bir değişkenden ötekini tahmin etmeye yarayan denklemi (ŷ = a + b·x) bulur. Korelasyon simetriktir ve birimsizdir, regresyonda ise bağımlı ve bağımsız değişken ayrımı vardır ve eğim birim taşır. 7 öğrencinin çalışma saati ile sınav puanı verisinde r ≈ 0,92, R² ≈ 0,85 ve regresyon doğrusu ŷ = 47,31 + 2,86·x çıkar. Bu sayfada iki yöntemi adım adım hesaplayıp yorumlamayı bulacaksınız.",
  kisaCevap: [
    "Pearson r = Σ(x − x̄)(y − ȳ) ÷ √[Σ(x − x̄)² · Σ(y − ȳ)²]; değeri −1 ile +1 arasındadır.",
    "r'nin işareti yönü, mutlak değeri ilişkinin gücünü gösterir; 0'a yakın değer doğrusal ilişki olmadığını anlatır.",
    "Basit doğrusal regresyon: eğim b = Σ(x − x̄)(y − ȳ) ÷ Σ(x − x̄)², kesişim a = ȳ − b·x̄.",
    "R² (belirlilik katsayısı) basit regresyonda r²'ye eşittir ve y'deki değişimin yüzde kaçının x ile açıklandığını gösterir.",
    "Örnek veri: r ≈ 0,921, R² ≈ 0,849, ŷ = 47,31 + 2,86·x; 7 saat çalışan için tahmin yaklaşık 67,3 puan.",
    "Korelasyon nedensellik göstermez; iki değişkeni birlikte etkileyen üçüncü bir etken olabilir."
  ],
  figure: {
    alt: "Çalışma saati ile sınav puanı saçılım grafiği: yedi nokta, en küçük kareler doğrusu ŷ = 47,31 + 2,86x, r = 0,92 ve R² = 0,85 değerleri; noktaların doğrudan dikey uzaklıkları artık olarak gösterilmiş.",
    caption: "Yedi öğrencinin haftalık çalışma saati ve sınav puanı. Kırmızı kesikli çizgiler artıklardır; en küçük kareler doğrusu bu artıkların karelerinin toplamını en küçük yapan doğrudur.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Çalışma saati ve sınav puanı</text>
  <line x1="70" y1="360" x2="480" y2="360" class="st" fill="none"/>
  <line x1="70" y1="60" x2="70" y2="360" class="st" fill="none"/>
  <g class="sm mid t2">
    <text x="70" y="380">0</text><text x="140" y="380">2</text><text x="210" y="380">4</text><text x="280" y="380">6</text><text x="350" y="380">8</text><text x="420" y="380">10</text>
  </g>
  <g class="sm end t2">
    <text x="62" y="364">40</text><text x="62" y="289">50</text><text x="62" y="214">60</text><text x="62" y="139">70</text><text x="62" y="64">80</text>
  </g>
  <text x="275" y="404" class="sm mid">haftalık çalışma (saat)</text>
  <text x="24" y="210" class="sm mid">puan</text>
  <line x1="70" y1="305" x2="455" y2="69" class="sp sw" fill="none"/>
  <g>
    <line x1="140" y1="248" x2="140" y2="262" class="sdg dash" fill="none"/><circle cx="140" cy="248" r="6" class="p"/>
    <line x1="175" y1="270" x2="175" y2="241" class="sdg dash" fill="none"/><circle cx="175" cy="270" r="6" class="p"/>
    <line x1="245" y1="172" x2="245" y2="198" class="sdg dash" fill="none"/><circle cx="245" cy="172" r="6" class="p"/>
    <line x1="280" y1="210" x2="280" y2="176" class="sdg dash" fill="none"/><circle cx="280" cy="210" r="6" class="p"/>
    <line x1="350" y1="120" x2="350" y2="134" class="sdg dash" fill="none"/><circle cx="350" cy="120" r="6" class="p"/>
    <line x1="385" y1="75" x2="385" y2="112" class="sdg dash" fill="none"/><circle cx="385" cy="75" r="6" class="p"/>
    <line x1="455" y1="98" x2="455" y2="69" class="sdg dash" fill="none"/><circle cx="455" cy="98" r="6" class="p"/>
  </g>
  <rect x="500" y="60" width="200" height="96" rx="8" class="p"/>
  <text x="600" y="88" class="sm mid sf">Korelasyon</text>
  <text x="600" y="120" class="xl mid sf">r = 0,92</text>
  <text x="600" y="144" class="sm mid sf">güçlü, pozitif</text>
  <rect x="500" y="170" width="200" height="96" rx="8" class="sf sb"/>
  <text x="600" y="198" class="sm mid t2">Regresyon doğrusu</text>
  <text x="600" y="228" class="b mid">ŷ = 47,31 + 2,86x</text>
  <text x="600" y="252" class="sm mid">her saat ≈ +2,86 puan</text>
  <rect x="500" y="280" width="200" height="80" rx="8" class="oks"/>
  <text x="600" y="308" class="b mid">R² = 0,85</text>
  <text x="600" y="330" class="sm mid">değişimin %85'i</text>
  <text x="600" y="348" class="sm mid">x ile açıklanıyor</text>
</svg>`
  },
  sections: [
    {
      h: "Korelasyon nedir, Pearson r nasıl yorumlanır?",
      p: [
        "Korelasyon, iki değişkenin birlikte değişme eğilimidir. Bir değişken artarken öteki de artıyorsa <strong>pozitif</strong>, öteki azalıyorsa <strong>negatif</strong> korelasyon vardır. En yaygın ölçü Pearson korelasyon katsayısıdır (r) ve iki değişken arasındaki <strong>doğrusal</strong> ilişkinin gücünü ölçer.",
        "r her zaman −1 ile +1 arasındadır. +1, tüm noktaların yükselen bir doğru üzerinde olduğunu; −1, düşen bir doğru üzerinde olduğunu; 0 ise doğrusal bir ilişki bulunmadığını gösterir. r birimsizdir: boyları santimetre ya da inç cinsinden ölçmeniz sonucu değiştirmez. Ayrıca simetriktir: x ile y arasındaki r, y ile x arasındaki r'ye eşittir."
      ],
      table: {
        head: ["|r| aralığı", "Yaygın yorum", "Not"],
        rows: [
          ["0,00–0,10", "Önemsiz", "Doğrusal ilişki yok denecek kadar az"],
          ["0,10–0,30", "Zayıf", "Saçılım grafiğinde eğilim zor seçilir"],
          ["0,30–0,50", "Orta", "Belirgin ama dağınık eğilim"],
          ["0,50–0,70", "Güçlü", "Noktalar bir doğru çevresinde toplanır"],
          ["0,70–1,00", "Çok güçlü", "Noktalar doğruya oldukça yakın"]
        ],
        caption: "Sınırlar alana göre değişir; sosyal bilimlerde 0,5 güçlü sayılırken fizik ölçümlerinde 0,9 bile yetersiz görülebilir. Raporda hangi ölçütü kullandığınızı belirtin."
      }
    },
    {
      h: "Pearson r adım adım nasıl hesaplanır?",
      p: [
        "Örnek veri: yedi öğrencinin haftalık çalışma saati (x) ve sınav puanı (y). x = 2, 3, 5, 6, 8, 9, 11; y = 55, 52, 65, 60, 72, 78, 75."
      ],
      formula: "r = Σ(x − x̄)(y − ȳ) ÷ √[ Σ(x − x̄)² × Σ(y − ȳ)² ]",
      ol: [
        "Ortalamaları bulun: x̄ = 44 ÷ 7 ≈ 6,286; ȳ = 457 ÷ 7 ≈ 65,286.",
        "Her gözlem için sapmaları hesaplayın. İlk öğrenci: x − x̄ = −4,29, y − ȳ = −10,29.",
        "Sapma çarpımlarını toplayın: Σ(x − x̄)(y − ȳ) ≈ 181,43. Bu, kovaryansın pay kısmıdır.",
        "Sapma karelerini ayrı ayrı toplayın: Σ(x − x̄)² ≈ 63,43; Σ(y − ȳ)² ≈ 611,43.",
        "Formülde yerine koyun: r = 181,43 ÷ √(63,43 × 611,43) = 181,43 ÷ 196,93 ≈ <strong>0,921</strong>.",
        "Yorum: çalışma saati ile sınav puanı arasında çok güçlü, pozitif bir doğrusal ilişki vardır."
      ],
      after: [
        "Aynı veriyi [[arac:korelasyon-hesapla|Korelasyon Katsayısı Hesaplama]] aracına girdiğinizde r, r², kovaryans ve ilişkinin yönü ile gücü otomatik gösterilir. Sapma karelerinin mantığı, standart sapma hesabıyla aynıdır; ayrıntı için [[bilgi:standart-sapma-nasil-hesaplanir|standart sapma yazısına]] bakabilirsiniz."
      ]
    },
    {
      h: "Regresyon analizi nedir? En küçük kareler doğrusu",
      p: [
        "Regresyon, bir bağımsız değişkenin (x) değerinden bağımlı değişkeni (y) tahmin eden bir model kurar. Basit doğrusal regresyonda bu model bir doğrudur: <strong>ŷ = a + b·x</strong>. Burada b eğim, a ise x = 0 iken tahmin edilen değerdir (kesişim).",
        "Bir veri kümesinden geçen sonsuz sayıda doğru çizilebilir. <strong>En küçük kareler yöntemi</strong>, her noktanın doğruya dikey uzaklığının (artığın) karesini alıp toplar ve bu toplamı en küçük yapan doğruyu seçer. Karelerin kullanılması, pozitif ve negatif artıkların birbirini götürmesini önler ve büyük sapmaları daha çok cezalandırır."
      ],
      formula: "b = Σ(x − x̄)(y − ȳ) ÷ Σ(x − x̄)²\na = ȳ − b · x̄\nÖrnek: b = 181,43 ÷ 63,43 ≈ 2,860\na = 65,286 − 2,860 × 6,286 ≈ 47,31\nDoğru: ŷ = 47,31 + 2,86 · x",
      ol: [
        "Eğim yorumu: her ek çalışma saati, sınav puanında ortalama 2,86 puanlık artışla ilişkilidir.",
        "Tahmin: haftada 7 saat çalışan bir öğrenci için ŷ = 47,31 + 2,86 × 7 ≈ 67,3 puan.",
        "10 saat için ŷ ≈ 75,9 puan.",
        "Kesişim yorumu: a = 47,31, hiç çalışmayan öğrenci için tahmindir; ancak veride x = 0 olmadığı için bu değer dikkatle yorumlanmalıdır.",
        "Uç değer uyarısı: verideki en yüksek x 11'dir. 30 saat için tahmin 133 puan çıkar, bu da sınavın 100 üzerinden olduğu düşünülürse anlamsızdır. Regresyon, veri aralığının dışına taşındığında güvenilmezdir."
      ],
      after: [
        "Doğrunun eğimi kavramını [[bilgi:dogrunun-egimi-nasil-bulunur|doğrunun eğimi yazısında]], hesaplamanın kendisini [[arac:dogrusal-regresyon-hesapla|Doğrusal Regresyon Hesaplama]] aracında bulabilirsiniz. Araç eğim, kesişim, R² ve standart hatayı verir ve istediğiniz x için tahmin yapar."
      ]
    },
    {
      h: "Korelasyon ile regresyon arasındaki fark nedir?",
      table: {
        head: ["Özellik", "Korelasyon", "Regresyon"],
        rows: [
          ["Amaç", "İlişkinin gücünü ve yönünü ölçmek", "Bir değişkenden ötekini tahmin etmek"],
          ["Sonuç", "Tek sayı: r", "Denklem: ŷ = a + b·x"],
          ["Değişken rolleri", "Simetrik; x ve y eşit", "Bağımsız (x) ve bağımlı (y) ayrımı var"],
          ["Birim", "Birimsiz, −1 ile +1 arası", "Eğim y birimi / x birimi (puan/saat)"],
          ["x ve y yer değiştirirse", "r aynı kalır", "Farklı bir doğru çıkar"],
          ["Örnek sonuç", "r = 0,921", "ŷ = 47,31 + 2,86·x"]
        ]
      },
      after: [
        "İkisi birbirine bağlıdır: basit regresyonda eğim b = r × (s<sub>y</sub> ÷ s<sub>x</sub>) eşitliğini sağlar. Örnekte s<sub>x</sub> ≈ 3,25 ve s<sub>y</sub> ≈ 10,09 olduğundan b = 0,921 × 10,09 ÷ 3,25 ≈ 2,86 çıkar. Korelasyon ilişkinin varlığını ve gücünü söyler; regresyon bu ilişkiyi kullanılabilir bir tahmin aracına dönüştürür."
      ]
    },
    {
      h: "R² (belirlilik katsayısı) ne anlatır?",
      p: [
        "R², bağımlı değişkendeki toplam değişimin ne kadarının model tarafından açıklandığını gösterir ve 0 ile 1 arasındadır. Basit doğrusal regresyonda R² = r²'dir: örnekte 0,921² ≈ 0,849. Yani sınav puanlarındaki farklılıkların yaklaşık yüzde 85'i çalışma saatiyle açıklanmaktadır; kalan yüzde 15 ise başka etkenlerden ve rastlantıdan kaynaklanır.",
        "R² artıklardan da hesaplanabilir: R² = 1 − (artık kareler toplamı ÷ toplam kareler toplamı). Örnekte artık kareler toplamı ≈ 92,48, toplam kareler toplamı ≈ 611,43 olduğundan R² = 1 − 92,48 ÷ 611,43 ≈ 0,849 bulunur. Tahminin standart hatası ise √(92,48 ÷ 5) ≈ 4,30 puandır; tahminlerin tipik olarak bu kadar şaşabileceğini gösterir."
      ],
      note: "r = 0,8 güçlü bir ilişki midir sorusuna cevap: çoğu alanda evet. Ancak r = 0,8 iken R² = 0,64'tür; yani değişimin üçte birinden fazlası hâlâ açıklanmamış durumdadır."
    },
    {
      h: "Korelasyon neden nedensellik göstermez?",
      p: [
        "Güçlü bir korelasyon, iki değişkenin birlikte hareket ettiğini gösterir; birinin ötekine neden olduğunu kanıtlamaz. Bunun üç yaygın nedeni vardır."
      ],
      ul: [
        "<strong>Üçüncü değişken (karıştırıcı):</strong> Yaz aylarında hem dondurma satışı hem boğulma vakaları artar. İkisi arasında korelasyon vardır ama ortak neden sıcak havadır.",
        "<strong>Ters yönlü neden:</strong> Çok çalışan öğrenci yüksek puan alıyor olabilir; ama konuyu sevdiği ve başarılı olduğu için daha çok çalışıyor da olabilir.",
        "<strong>Rastlantı:</strong> Çok sayıda değişken karşılaştırıldığında, aralarında gerçek bağ olmayan bazı çiftler tesadüfen yüksek korelasyon gösterebilir. Küçük örneklemlerde bu risk büyüktür."
      ],
      after: [
        "Nedensellik iddiası için kontrollü deney, zaman sıralaması, karıştırıcı değişkenlerin denetlenmesi ve kuramsal bir açıklama gerekir. Ayrıca Pearson r yalnızca doğrusal ilişkiyi ölçer: U biçimli güçlü bir ilişkide r sıfıra yakın çıkabilir. Bu yüzden hesaplamadan önce her zaman bir saçılım grafiği çizin."
      ]
    },
    {
      h: "Tez ve ödevlerde korelasyon sonucu nasıl raporlanır?",
      p: [
        "Akademik metinlerde korelasyon sonucu katsayı, serbestlik derecesi ve anlamlılık düzeyiyle birlikte verilir. Pearson r için serbestlik derecesi n − 2'dir. Örnekte n = 7 olduğu için sd = 5'tir. Anlamlılık testi için t = r × √(n − 2) ÷ √(1 − r²) ≈ 0,921 × √5 ÷ √(1 − 0,849) ≈ 5,30 bulunur; sd = 5 için iki yönlü %1 kritik değeri yaklaşık 4,03 olduğundan sonuç p < 0,01 düzeyinde anlamlıdır."
      ],
      ul: [
        "<strong>Korelasyon:</strong> \"Haftalık çalışma süresi ile sınav puanı arasında güçlü ve pozitif bir ilişki bulunmuştur, r(5) = 0,92; p < 0,01.\"",
        "<strong>Regresyon:</strong> \"Çalışma süresi sınav puanını anlamlı biçimde yordamıştır, b = 2,86; R² = 0,85.\" Eğimin standart hatası ve güven aralığı da eklenmelidir.",
        "<strong>Örneklem büyüklüğü:</strong> 7 gözlem öğretici bir örnektir; gerçek araştırmalarda güvenilir sonuç için genellikle çok daha büyük örneklem gerekir. Örneklem ve hata payı ilişkisi [[bilgi:guven-araligi-hata-payi-ve-orneklem|güven aralığı yazısında]] anlatılır.",
        "<strong>Biçim:</strong> Kaynakça ve sayı yazım kuralları için [[rehber:tez-kaynakca-apa-nasil-yazilir|APA kaynakça rehberine]] bakın; Türkçe metinlerde ondalık ayraç olarak virgül kullanılır."
      ],
      after: [
        "Verinin dağılımını özetlemek için ortalama ve standart sapmayı da raporlayın; [[arac:standart-sapma-hesapla|Standart Sapma Hesaplama]] aracı örneklem ve anakütle formüllerini ayrı ayrı verir."
      ]
    }
  ],
  faq: [
    ["Korelasyon nedir, Pearson r nasıl yorumlanır?", "Korelasyon iki değişkenin birlikte değişme eğilimidir. Pearson r −1 ile +1 arasında bir değer alır; işareti ilişkinin yönünü, mutlak değeri gücünü gösterir. 0'a yakın değer doğrusal ilişki olmadığını, 1'e yakın değer güçlü ilişkiyi anlatır."],
    ["Regresyon analizi nedir?", "Regresyon, bir ya da daha fazla bağımsız değişkenden bağımlı değişkeni tahmin eden bir model kurar. Basit doğrusal regresyonda bu model ŷ = a + b·x doğrusudur ve en küçük kareler yöntemiyle, artıkların kareleri toplamını en küçük yapacak biçimde bulunur."],
    ["Korelasyon ile regresyon arasındaki fark nedir?", "Korelasyon ilişkinin gücünü ve yönünü tek, birimsiz bir sayıyla verir ve değişkenler arasında ayrım yapmaz. Regresyon ise bağımlı ve bağımsız değişkeni ayırır, birim taşıyan bir eğimle tahmin denklemi üretir; x ile y yer değiştirirse farklı doğru çıkar."],
    ["r = 0,8 güçlü bir ilişki midir?", "Çoğu alanda r = 0,8 güçlü bir ilişki kabul edilir. Ancak R² = 0,64 olduğu için bağımlı değişkendeki değişimin yaklaşık yüzde 36'sı hâlâ açıklanmamıştır. Güç yorumu alana göre değişir; ölçüm hassasiyeti yüksek alanlarda daha yüksek değer beklenir."],
    ["R² (belirlilik katsayısı) ne anlatır?", "R², bağımlı değişkendeki toplam değişimin modelce açıklanan oranıdır ve 0 ile 1 arasındadır. Basit doğrusal regresyonda r'nin karesine eşittir. Örnekte R² = 0,849, puan farklılıklarının yaklaşık yüzde 85'inin çalışma süresiyle açıklandığını gösterir."],
    ["Korelasyon neden nedensellik göstermez?", "İki değişkeni birlikte etkileyen üçüncü bir etken olabilir, neden-sonuç yönü ters olabilir ya da ilişki rastlantısal çıkabilir. Nedensellik için kontrollü deney, zaman sıralaması ve karıştırıcı değişkenlerin denetlenmesi gerekir."],
    ["En küçük kareler doğrusu nasıl bulunur?", "Eğim b = Σ(x − x̄)(y − ȳ) ÷ Σ(x − x̄)², kesişim a = ȳ − b·x̄ formülleriyle hesaplanır. Örnek veride b ≈ 2,86 ve a ≈ 47,31 bulunur; doğru ŷ = 47,31 + 2,86·x olur ve 7 saat için yaklaşık 67,3 puan tahmin eder."],
    ["Tez ve ödevlerde korelasyon sonucu nasıl raporlanır?", "Katsayı, serbestlik derecesi (n − 2) ve anlamlılık düzeyi birlikte verilir: r(5) = 0,92; p < 0,01 gibi. Regresyon için eğim, standart hatası ve R² raporlanır. Örneklem büyüklüğü ve hangi güç ölçütünün kullanıldığı da belirtilmelidir."],
    ["Korelasyon katsayısı sıfır çıkarsa ilişki yok mudur?", "Yalnızca doğrusal ilişki yok demektir. U ya da ters U biçimli güçlü bir ilişkide Pearson r sıfıra yakın çıkabilir. Bu yüzden hesaplamadan önce saçılım grafiği çizilmeli, gerekirse doğrusal olmayan yöntemler ya da sıra korelasyonu kullanılmalıdır."]
  ],
  tools: ["korelasyon-hesapla", "dogrusal-regresyon-hesapla", "standart-sapma-hesapla"],
  related: ["standart-sapma-nasil-hesaplanir", "dogrunun-egimi-nasil-bulunur", "guven-araligi-hata-payi-ve-orneklem"]
};
