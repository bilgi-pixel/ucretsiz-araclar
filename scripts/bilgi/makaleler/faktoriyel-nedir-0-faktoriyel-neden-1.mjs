export default {
  slug: "faktoriyel-nedir-0-faktoriyel-neden-1",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Faktöriyel Nedir? 0! Neden 1'dir, Faktöriyel Nasıl Hesaplanır?",
  pageTitle: "Faktöriyel Nedir? 0! Neden 1, Sadeleştirme ve Sondaki Sıfırlar",
  description: "n!, 1'den n'ye kadar tam sayıların çarpımıdır: 5! = 120, 10! = 3.628.800. 0! neden 1, faktöriyelli ifade sadeleştirme, sondaki sıfır sayısı ve Pascal üçgeni.",
  keywords: ["faktöriyel nedir", "0 faktöriyel neden 1", "5 faktöriyel kaç", "10 faktöriyel kaç", "faktöriyel sadeleştirme", "faktöriyel sondaki sıfır sayısı", "negatif sayının faktöriyeli", "faktöriyel pascal üçgeni"],
  lead: "Faktöriyel, bir doğal sayı ile ondan küçük tüm pozitif tam sayıların çarpımıdır ve ünlem işaretiyle gösterilir: <strong>n! = n × (n − 1) × … × 2 × 1</strong>. \"n faktöriyel\" diye okunur; 5! = 120, 6! = 720, 10! = 3.628.800'dür. 0! ise tanım gereği 1'dir; bu seçim keyfi değildir, n! = n × (n − 1)! kuralının ve \"hiç eleman yokken bir tane sıralama vardır\" fikrinin doğal sonucudur. Bu yazıda faktöriyelli ifadelerin nasıl sadeleştirildiğini, sondaki sıfırların nasıl sayıldığını, negatif sayıların durumunu ve Pascal üçgeniyle ilişkiyi çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Tanım: n! = 1 × 2 × 3 × … × n; örneğin 4! = 1 × 2 × 3 × 4 = 24.",
    "Özyinelemeli kural: n! = n × (n − 1)!; bu kural 1! = 1 × 0! olduğundan 0! = 1 sonucunu verir.",
    "5! = 120, 6! = 720, 7! = 5.040, 8! = 40.320, 9! = 362.880, 10! = 3.628.800.",
    "Sadeleştirmede büyük faktöriyel küçüğe kadar açılır: 10! ÷ 8! = 10 × 9 = 90.",
    "n! sonundaki sıfır sayısı, n'nin içinde kaç tane 5 çarpanı olduğuyla bulunur: 100! sonunda 20 + 4 = 24 sıfır vardır.",
    "Negatif tam sayıların faktöriyeli tanımsızdır; kesirli sayılar için faktöriyel gama fonksiyonuyla genelleştirilir."
  ],
  figure: {
    alt: "Faktöriyelin hızlı büyümesini gösteren basamak şeması: 1! = 1, 3! = 6, 5! = 120, 7! = 5.040, 10! = 3.628.800, 13! = 6,2 milyar, 52! yaklaşık 8,07 × 10 üzeri 67; ayrıca 0! = 1 türetmesi.",
    caption: "Her basamakta bir önceki sonuç yeni sayıyla çarpılır; bu yüzden faktöriyel üstel fonksiyonlardan da hızlı büyür. Sağdaki zincir, n! = n × (n − 1)! kuralını geriye doğru yürüterek 0! = 1 sonucuna ulaşır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Faktöriyel ne kadar hızlı büyür?</text>
  <g class="sm">
    <rect x="30" y="56" width="380" height="36" rx="6" class="sf sb"/><text x="46" y="79" class="b">1! = 1</text>
    <rect x="30" y="98" width="380" height="36" rx="6" class="sf sb"/><text x="46" y="121" class="b">3! = 6</text>
    <rect x="30" y="140" width="380" height="36" rx="6" class="sf sb"/><text x="46" y="163" class="b">5! = 120</text>
    <rect x="30" y="182" width="380" height="36" rx="6" class="ps"/><text x="46" y="205" class="b">7! = 5.040</text>
    <rect x="30" y="224" width="380" height="36" rx="6" class="ps"/><text x="46" y="247" class="b">10! = 3.628.800</text>
    <rect x="30" y="266" width="380" height="36" rx="6" class="p"/><text x="46" y="289" class="b sf">13! = 6.227.020.800 (6,2 milyar)</text>
    <rect x="30" y="308" width="380" height="36" rx="6" class="p"/><text x="46" y="331" class="b sf">52! ≈ 8,07 × 10^67 (68 basamak)</text>
  </g>
  <rect x="30" y="356" width="380" height="50" rx="8" class="sf sb"/>
  <text x="46" y="378" class="sm">52 kartlık bir destenin farklı dizilişleri</text>
  <text x="46" y="398" class="sm t2">100! ise 158 basamaklıdır</text>
  <rect x="440" y="56" width="250" height="350" rx="12" class="oks"/>
  <text x="565" y="86" class="b mid">0! neden 1?</text>
  <text x="565" y="112" class="sm mid">Kural: n! = n × (n − 1)!</text>
  <g class="sm mid">
    <text x="565" y="150">4! = 24</text>
    <text x="565" y="176">3! = 24 ÷ 4 = 6</text>
    <text x="565" y="202">2! = 6 ÷ 3 = 2</text>
    <text x="565" y="228">1! = 2 ÷ 2 = 1</text>
    <text x="565" y="262" class="b ok">0! = 1 ÷ 1 = 1</text>
  </g>
  <line x1="470" y1="282" x2="660" y2="282" class="sb" fill="none"/>
  <text x="565" y="310" class="sm mid">Her adımda bir önceki</text>
  <text x="565" y="330" class="sm mid">sayıya bölünür</text>
  <text x="565" y="366" class="sm mid b">0 eleman: tek bir sıralama</text>
  <text x="565" y="386" class="sm mid">(hiçbir şey yapmamak)</text>
</svg>`
  },
  sections: [
    {
      h: "Faktöriyel nedir, n! nasıl okunur?",
      p: [
        "Faktöriyel, n bir doğal sayı olmak üzere 1'den n'ye kadar bütün tam sayıların çarpımıdır. Gösterimde sayının sağına ünlem işareti konur ve \"n faktöriyel\" diye okunur: 4! \"dört faktöriyel\" demektir. Gösterim 19. yüzyılda yaygınlaştı; amacı, sıralama ve seçme sorularında sürekli karşılaşılan uzun çarpımları kısa yazmaktı.",
        "Faktöriyelin temel anlamı saymadır: n farklı nesne bir sıraya kaç farklı biçimde dizilebilir? İlk yere n nesneden biri, ikinci yere kalan (n − 1) nesneden biri konabilir ve böyle devam eder. Çarpma ilkesine göre toplam diziliş sayısı n × (n − 1) × … × 1 = n!'dir. Örneğin 4 kitap rafa 4! = 24 farklı sırayla dizilebilir."
      ],
      formula: "n! = n × (n − 1) × (n − 2) × … × 2 × 1\nn! = n × (n − 1)!   (n ≥ 1)\n0! = 1"
    },
    {
      h: "5!, 6!, 10! kaç eder? Faktöriyel tablosu",
      p: [
        "Küçük faktöriyelleri ezbere bilmek, sınavlarda zaman kazandırır. Her satırdaki değer, bir önceki satırın değeri ile satır numarasının çarpımıdır; yani 6! = 6 × 5! = 6 × 120 = 720."
      ],
      table: {
        head: ["n", "n!", "Hesap", "Basamak sayısı"],
        rows: [
          ["0", "1", "tanım", "1"],
          ["1", "1", "1", "1"],
          ["2", "2", "2 × 1", "1"],
          ["3", "6", "3 × 2", "1"],
          ["4", "24", "4 × 6", "2"],
          ["5", "120", "5 × 24", "3"],
          ["6", "720", "6 × 120", "3"],
          ["7", "5.040", "7 × 720", "4"],
          ["8", "40.320", "8 × 5.040", "5"],
          ["9", "362.880", "9 × 40.320", "6"],
          ["10", "3.628.800", "10 × 362.880", "7"],
          ["12", "479.001.600", "12 × 11!", "9"],
          ["15", "1.307.674.368.000", "15 × 14!", "13"],
          ["20", "2.432.902.008.176.640.000", "20 × 19!", "19"]
        ],
        caption: "Değerler tam sayı aritmetiğiyle hesaplanmıştır. Daha büyük değerleri tam olarak görmek için Faktöriyel Hesapla aracını kullanabilirsiniz."
      },
      after: [
        "Hesap makinelerinin çoğu 20!'den sonra sonucu bilimsel gösterimle yuvarlar. [[arac:faktoriyel-hesapla|Faktöriyel Hesapla]] aracı 5000'e kadar faktöriyelleri tam değeriyle, basamak sayısı ve sondaki sıfır sayısıyla birlikte verir."
      ]
    },
    {
      h: "0! neden 1 kabul edilir?",
      p: [
        "İlk bakışta \"hiçbir sayıyı çarpmadık, sonuç sıfır olmalı\" diye düşünülebilir. Oysa matematikte hiç terimi olmayan çarpımın değeri 1'dir, tıpkı hiç terimi olmayan toplamın 0 olması gibi. Çarpmanın etkisiz elemanı 1'dir: bir sayıyı 1 ile çarpmak onu değiştirmez. Boş çarpımın 1 kabul edilmesi bu yüzden tutarlıdır.",
        "İkinci gerekçe özyinelemeli kuraldır. n! = n × (n − 1)! kuralı her n ≥ 1 için geçerlidir. n = 1 yazıldığında 1! = 1 × 0! elde edilir. 1! = 1 olduğuna göre 0! = 1 olmak zorundadır. Görseldeki zincir bunu tersten gösterir: 4!'den başlayıp her adımda o sayıya bölündüğünde sıra 0!'a geldiğinde sonuç 1'dir.",
        "Üçüncü gerekçe saymanın anlamıdır. Sıfır nesneyi sıralamanın kaç yolu vardır? Bir: hiçbir şey yapmamak. Kombinasyon formülü de bunu gerektirir: n nesneden hepsini seçmenin tek yolu vardır, yani C(n, n) = n! ÷ (n! × 0!) = 1 olmalıdır; bu ancak 0! = 1 ise sağlanır."
      ]
    },
    {
      h: "Faktöriyelli ifadeler nasıl sadeleştirilir?",
      p: [
        "Kesirli faktöriyel ifadelerde iki faktöriyeli ayrı ayrı hesaplamak gereksizdir. Büyük faktöriyeli, küçük faktöriyele ulaşana kadar açıp ortak kısmı sadeleştirmek yeterlidir: 10! = 10 × 9 × 8!."
      ],
      ol: [
        "10! ÷ 8! = (10 × 9 × 8!) ÷ 8! = 10 × 9 = <strong>90</strong>.",
        "8! ÷ 6! = 8 × 7 = <strong>56</strong>.",
        "7! ÷ (5! × 2!) = (7 × 6 × 5!) ÷ (5! × 2) = 42 ÷ 2 = <strong>21</strong>.",
        "(n + 1)! ÷ n! = n + 1 ve n! ÷ (n − 2)! = n × (n − 1) genel sonuçlarını akılda tutun.",
        "Denklem örneği: (n + 1)! = 20 × (n − 1)! ise (n + 1) × n × (n − 1)! = 20 × (n − 1)!, yani n × (n + 1) = 20 ve n = 4 bulunur. Kontrol: 5! = 120 ve 20 × 3! = 20 × 6 = 120."
      ],
      after: [
        "Toplama içeren ifadelerde ortak çarpan parantezine alma kullanılır: 6! + 5! = 6 × 5! + 5! = 5! × (6 + 1) = 120 × 7 = 840. Faktöriyeli toplama üzerinde dağıtmak yanlıştır: (2 + 3)! = 120 ama 2! + 3! = 8'dir."
      ]
    },
    {
      h: "Faktöriyel permütasyon ve kombinasyonda nasıl kullanılır?",
      p: [
        "Faktöriyel, sayma problemlerinin yapı taşıdır. n nesneden r tanesini sıralı seçmek permütasyon, sırasız seçmek kombinasyondur ve ikisi de faktöriyelle yazılır. Bu yazıda formüllerin ayrıntısına girmiyoruz; permütasyon ile kombinasyonun farkı ve çözümlü örnekler için [[bilgi:permutasyon-ve-kombinasyon-farki|permütasyon ve kombinasyon farkı]] yazısına bakabilirsiniz."
      ],
      formula: "P(n, r) = n! ÷ (n − r)!     ör. P(10, 3) = 10 × 9 × 8 = 720\nC(n, r) = n! ÷ (r! × (n − r)!)   ör. C(10, 3) = 720 ÷ 6 = 120",
      after: [
        "52 kartlık bir desteden 5 kartlık el sayısı C(52, 5) = 2.598.960'tır. Bu tür hesapları [[arac:kombinasyon-permutasyon|Kombinasyon Permütasyon Hesapla]] aracıyla adım adım görebilirsiniz. Kombinasyonlar olasılığın da temelidir; konu [[bilgi:olasilik-nasil-hesaplanir|olasılık nasıl hesaplanır]] yazısında anlatılır."
      ]
    },
    {
      h: "Faktöriyel neden bu kadar hızlı büyür?",
      p: [
        "Üstel bir fonksiyonda, örneğin 2<sup>n</sup>'de, her adımda aynı sayıyla çarparsınız. Faktöriyelde ise her adımda çarpan bir artar. Bu yüzden n büyüdükçe faktöriyel, sabit tabanlı her üstel fonksiyonu geçer. 13! = 6.227.020.800 eder; 14! ise 87.178.291.200'dür. 52 kartlık bir destenin farklı dizilişlerinin sayısı 52! ≈ 8,07 × 10<sup>67</sup>'dir ve 68 basamaklıdır; iyi karıştırılmış bir destenin daha önce hiç oluşmamış bir dizilişte olması neredeyse kesindir.",
        "Büyük n için faktöriyelin yaklaşık değeri Stirling formülüyle bulunur: n! ≈ √(2πn) × (n ÷ e)<sup>n</sup>. 10! için formül yaklaşık 3.598.696 verir; gerçek değer 3.628.800 olduğundan hata yalnızca yaklaşık %0,83'tür ve n büyüdükçe oransal hata küçülür. Üslü ve logaritmik büyümeyi karşılaştırmak için [[bilgi:uslu-sayilar-kurallari|üslü sayılar kuralları]] ve [[bilgi:logaritma-nasil-hesaplanir|logaritma]] yazılarına bakabilirsiniz."
      ]
    },
    {
      h: "Faktöriyelin sonundaki sıfır sayısı nasıl bulunur?",
      p: [
        "Bir sayının sonundaki her sıfır, bir 10 çarpanından, yani bir 2 ile bir 5 çarpımından gelir. n!'de 2 çarpanları her zaman 5 çarpanlarından çoktur; bu yüzden sondaki sıfır sayısı, n!'in içindeki 5 çarpanlarının sayısına eşittir. 25 = 5 × 5 gibi sayılar iki, 125 gibi sayılar üç tane 5 çarpanı taşır; bu yüzden n'yi 5'in kuvvetlerine bölüp tam kısımları toplarız."
      ],
      formula: "Sondaki sıfır = ⌊n ÷ 5⌋ + ⌊n ÷ 25⌋ + ⌊n ÷ 125⌋ + …\n100!: 20 + 4 = 24 sıfır\n25!: 5 + 1 = 6 sıfır · 30!: 6 + 1 = 7 sıfır\n1000!: 200 + 40 + 8 + 1 = 249 sıfır",
      after: [
        "Bu yöntem, Legendre formülünün 5 asal sayısına uygulanmış hâlidir. Aynı mantıkla n! içinde herhangi bir asalın kaç kez geçtiği bulunabilir. Asal çarpanlar ve bölünebilme konusunda [[bilgi:asal-sayilar-nedir|asal sayılar]] ve [[bilgi:bolunebilme-kurallari|bölünebilme kuralları]] yazıları tamamlayıcıdır."
      ]
    },
    {
      h: "Negatif sayıların ve kesirlerin faktöriyeli var mı?",
      p: [
        "Negatif tam sayıların faktöriyeli tanımlı değildir. n! = n × (n − 1)! kuralı geriye işletilirse 0! = 0 × (−1)! eşitliği gerekir; 0! = 1 iken bu eşitliği sağlayan bir (−1)! değeri yoktur. Sınavlarda (−3)! gibi bir ifade görürseniz \"tanımsız\" cevabı doğrudur.",
        "Kesirli ve gerçel sayılar için faktöriyel, <strong>gama fonksiyonu</strong> ile genelleştirilir: pozitif tam sayılarda Γ(n + 1) = n! olur. Bu genelleme sayesinde örneğin (1/2)! = Γ(3/2) = √π ÷ 2 ≈ 0,886 gibi değerler hesaplanabilir. Gama fonksiyonu negatif tam sayılarda da tanımsızdır, ama diğer negatif kesirlerde değer alır. Bu konu lise müfredatının dışındadır; üniversite matematiğinde ve istatistikte karşınıza çıkar."
      ]
    },
    {
      h: "Pascal üçgeni ile faktöriyel arasındaki ilişki",
      p: [
        "Pascal üçgeninde n. satırın k. elemanı (satır ve sıra 0'dan sayılır) tam olarak C(n, k) = n! ÷ (k! × (n − k)!) kombinasyonudur. 5. satır 1, 5, 10, 10, 5, 1'dir; örneğin C(5, 2) = 120 ÷ (2 × 6) = 10. Üçgendeki her sayının üstündeki iki sayının toplamı olması, faktöriyelli formülle de kanıtlanabilir: C(n, k) = C(n − 1, k − 1) + C(n − 1, k).",
        "Satır toplamları 2<sup>n</sup>'dir ve bu katsayılar (a + b)<sup>n</sup> açılımının katsayılarıdır; buna binom açılımı denir. Kendi üçgeninizi Pascal Üçgeni Oluştur aracıyla çizebilir, katsayıların olasılıktaki kullanımını Binom Dağılımı Hesapla aracıyla görebilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>0! = 0 sanmak:</strong> Tanım gereği 0! = 1'dir.",
        "<strong>Faktöriyeli dağıtmak:</strong> (a + b)! ≠ a! + b! ve (2n)! ≠ 2 × n!.",
        "<strong>Kesirli ifadeyi açmadan hesaplamak:</strong> 100! ÷ 98! için iki dev sayıyı hesaplamak yerine 100 × 99 = 9.900 yazın.",
        "<strong>Sondaki sıfırları yalnızca n ÷ 5 ile saymak:</strong> 25, 125 gibi kuvvetler ek 5 çarpanı taşır.",
        "<strong>Negatif faktöriyele değer vermek:</strong> Negatif tam sayıların faktöriyeli tanımsızdır."
      ]
    }
  ],
  faq: [
    ["Faktöriyel nedir, n! nasıl okunur?", "Faktöriyel, 1'den n'ye kadar bütün pozitif tam sayıların çarpımıdır ve ünlem işaretiyle gösterilir. n! \"n faktöriyel\" diye okunur; örneğin 4! = 4 × 3 × 2 × 1 = 24'tür ve 4 nesnenin farklı sıralanış sayısını verir."],
    ["5!, 6! ve 10! kaç eder?", "5! = 120, 6! = 720 ve 10! = 3.628.800'dür. Her değer bir öncekinin yeni sayıyla çarpımıdır: 6! = 6 × 120 = 720, 10! = 10 × 362.880 = 3.628.800."],
    ["0! neden 1 kabul edilir?", "Hiç terimi olmayan çarpımın değeri 1'dir ve n! = n × (n − 1)! kuralı n = 1 için 1! = 1 × 0! verdiğinden 0! = 1 olmak zorundadır. Ayrıca sıfır nesneyi sıralamanın tek bir yolu vardır."],
    ["Faktöriyelli ifadeler nasıl sadeleştirilir?", "Büyük faktöriyel, küçük faktöriyele ulaşana kadar açılır ve ortak kısım sadeleştirilir. Örneğin 10! ÷ 8! = 10 × 9 × 8! ÷ 8! = 90 ve 7! ÷ (5! × 2!) = 42 ÷ 2 = 21 olur."],
    ["Faktöriyel permütasyon ve kombinasyonda nasıl kullanılır?", "Sıralı seçim P(n, r) = n! ÷ (n − r)!, sırasız seçim C(n, r) = n! ÷ (r! × (n − r)!) formülleriyle hesaplanır. Örneğin 10 kişiden 3 kişilik sıralı seçim 720, sırasız seçim 120 farklı biçimde yapılır."],
    ["Faktöriyel neden çok hızlı büyür?", "Her adımda çarpan bir arttığı için faktöriyel, sabit tabanlı üstel fonksiyonlardan da hızlı büyür. 13! yaklaşık 6,2 milyar, 52! ise yaklaşık 8,07 × 10 üzeri 67'dir ve 68 basamaklıdır."],
    ["Negatif sayıların faktöriyeli var mı?", "Negatif tam sayıların faktöriyeli tanımsızdır, çünkü 0! = 0 × (−1)! eşitliğini sağlayan bir değer yoktur. Kesirli sayılar için faktöriyel gama fonksiyonuyla genelleştirilir; örneğin (1/2)! yaklaşık 0,886'dır."],
    ["Faktöriyelin sonundaki sıfır sayısı nasıl bulunur?", "n sayısı 5'e, 25'e, 125'e ve 5'in diğer kuvvetlerine bölünür, tam kısımlar toplanır. 100! için 20 + 4 = 24, 1000! için 200 + 40 + 8 + 1 = 249 sıfır bulunur."],
    ["Pascal üçgeni ile faktöriyel arasındaki ilişki nedir?", "Pascal üçgeninin n. satırındaki k. sayı, C(n, k) = n! ÷ (k! × (n − k)!) kombinasyonudur. Örneğin 5. satır 1, 5, 10, 10, 5, 1'dir ve C(5, 2) = 120 ÷ 12 = 10'dur."]
  ],
  tools: ["faktoriyel-hesapla", "kombinasyon-permutasyon", "pascal-ucgeni-olustur", "binom-dagilimi-hesapla"],
  related: ["permutasyon-ve-kombinasyon-farki", "olasilik-nasil-hesaplanir", "uslu-sayilar-kurallari", "asal-sayilar-nedir"],
  sources: [
    ["MEB – Ortaöğretim matematik dersi öğretim programı", "https://www.meb.gov.tr/"],
    ["NIST Digital Library of Mathematical Functions – Gamma fonksiyonu", "https://dlmf.nist.gov/5"]
  ]
};
