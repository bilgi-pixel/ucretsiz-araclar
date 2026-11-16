export default {
  slug: "collatz-sanisi-nedir-3n-1-problemi",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Collatz Sanısı Nedir? 3n + 1 Problemi, Dizi Uzunluğu ve Örnekler",
  pageTitle: "Collatz Sanısı Nedir? 3n + 1 Problemi ve Çözümlü Örnekler",
  description: "Collatz sanısı: sayı çiftse ikiye böl, tekse 3 ile çarpıp 1 ekle; her pozitif tam sayı sonunda 1'e ulaşır mı? 27'nin 111 adımı ve kanıt durumu.",
  keywords: ["collatz sanısı", "3n+1 problemi", "collatz dizisi", "çözülmemiş matematik problemleri", "collatz 27", "dolu tanesi sayıları", "collatz kanıtlandı mı", "4 2 1 döngüsü"],
  lead: "Collatz sanısı, herhangi bir pozitif tam sayıyla başlayıp <strong>sayı çiftse ikiye bölme, tekse 3 ile çarpıp 1 ekleme</strong> kuralını tekrarladığınızda her zaman sonunda 1'e ulaşacağınızı söyleyen, 1937'de Lothar Collatz'ın ortaya attığı bir iddiadır. Kural ilkokul düzeyinde basittir, ama iddia bugüne kadar kanıtlanamamıştır. Bilgisayarlar 2<sup>71</sup>'e (yaklaşık 2,36 × 10<sup>21</sup>) kadar bütün sayıları denemiş ve hepsinin 1'e ulaştığını görmüştür; yine de bu bir kanıt değildir. Bu sayfada kuralı çözümlü örneklerle, 27 sayısının şaşırtıcı uzun dizisini ve problemin neden bu kadar zor olduğunu anlatıyoruz.",
  kisaCevap: [
    "Kural: n çiftse n ÷ 2, n tekse 3n + 1; 1'e ulaşınca dizi 4 → 2 → 1 döngüsüne girer.",
    "7 sayısı 16 adımda 1'e ulaşır ve yolda en fazla 52'ye çıkar.",
    "27 sayısı 111 adım sürer ve yolda 9.232'ye kadar yükselir.",
    "Sanı 2<sup>71</sup> ≈ 2,36 × 10<sup>21</sup>'e kadar bilgisayarla doğrulanmıştır, ama kanıtlanmamıştır.",
    "Diziler yükselip alçaldığı ve dolu tanesi gibi sonunda düştüğü için \"dolu tanesi sayıları\" diye de anılır."
  ],
  figure: {
    alt: "7 sayısının Collatz dizisinin grafiği: 7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1. Dizi 52'de zirve yapar ve 16 adımda 1'e iner.",
    caption: "Koyu noktalar tek sayılar (3n + 1 uygulanır), açık noktalar çift sayılardır (ikiye bölünür). 16'ya ulaşan dizi, 2'nin kuvvetleri boyunca doğrudan 1'e iner.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">7 sayısının Collatz dizisi (16 adım)</text>
  <line x1="30" y1="330" x2="700" y2="330" class="sb" fill="none"/>
  <line x1="30" y1="70" x2="700" y2="70" class="sb dash" fill="none"/>
  <text x="696" y="62" class="sm end mu">zirve 52</text>
  <polyline points="40,295 80,220 120,275 160,160 200,245 240,70 280,200 320,265 360,130 400,230 440,280 480,305 520,250 560,290 600,310 640,320 680,325" class="sp sw" fill="none"/>
  <circle cx="40" cy="295" r="6" class="p"/><circle cx="80" cy="220" r="4" class="ps"/><circle cx="120" cy="275" r="6" class="p"/><circle cx="160" cy="160" r="4" class="ps"/><circle cx="200" cy="245" r="6" class="p"/><circle cx="240" cy="70" r="5" class="ps"/><circle cx="280" cy="200" r="4" class="ps"/><circle cx="320" cy="265" r="6" class="p"/><circle cx="360" cy="130" r="4" class="ps"/><circle cx="400" cy="230" r="4" class="ps"/><circle cx="440" cy="280" r="4" class="ps"/><circle cx="480" cy="305" r="6" class="p"/><circle cx="520" cy="250" r="4" class="ps"/><circle cx="560" cy="290" r="4" class="ps"/><circle cx="600" cy="310" r="4" class="ps"/><circle cx="640" cy="320" r="4" class="ps"/><circle cx="680" cy="325" r="6" class="p"/>
  <g class="sm mid">
    <text x="40" y="350">7</text><text x="80" y="350">22</text><text x="120" y="350">11</text><text x="160" y="350">34</text><text x="200" y="350">17</text><text x="240" y="350" class="b p">52</text><text x="280" y="350">26</text><text x="320" y="350">13</text><text x="360" y="350">40</text><text x="400" y="350">20</text><text x="440" y="350">10</text><text x="480" y="350">5</text><text x="520" y="350">16</text><text x="560" y="350">8</text><text x="600" y="350">4</text><text x="640" y="350">2</text><text x="680" y="350" class="b">1</text>
  </g>
  <rect x="20" y="364" width="680" height="30" rx="6" class="sf sb"/>
  <text x="360" y="384" class="sm mid">Tek: 3n + 1 (koyu) · Çift: n ÷ 2 (açık) · 27 sayısı ise 111 adımda 9.232'ye kadar çıkar</text>
</svg>`
  },
  sections: [
    {
      h: "Collatz sanısı nedir?",
      p: [
        "Alman matematikçi Lothar Collatz 1937'de çok basit bir kural tanımladı: bir pozitif tam sayı seçin; çiftse ikiye bölün, tekse 3 ile çarpıp 1 ekleyin. Elde ettiğiniz sayıya aynı kuralı uygulamaya devam edin. Collatz'ın iddiası, hangi sayıyla başlarsanız başlayın, sonunda mutlaka 1'e ulaşacağınızdır. Bu iddiaya <strong>Collatz sanısı</strong> ya da kuraldaki işlemden dolayı <strong>3n + 1 problemi</strong> denir.",
        "Sanı, matematikte \"doğru olduğuna inanılan ama kanıtlanmamış önerme\" anlamına gelir. Collatz sanısı, açıklaması bir dakikadan kısa süren ama yaklaşık doksan yıldır çözülemeyen problemlerin en ünlülerindendir. Farklı ülkelerde başka adlarla da bilinir; Syracuse problemi, Ulam problemi ve Kakutani problemi bu adlardan bazılarıdır.",
        "Problemin cazibesi, herkesin elle deneyebilmesinden gelir. Bir kâğıt ve kalemle birkaç dakikada onlarca dizi yazabilirsiniz; ama ne kadar çok dizi yazarsanız yazın, bir sonraki sayının da 1'e ulaşacağını garanti eden bir düzen bulmak çok zordur. Bu yüzden Collatz sanısı hem amatör meraklıların hem de profesyonel sayı kuramcılarının ilgisini çekmeye devam eder ve popüler matematik kitaplarında sık sık yer alır."
      ]
    },
    {
      h: "3n + 1 kuralı nasıl uygulanır?",
      formula: "f(n) = n ÷ 2       (n çiftse)\nf(n) = 3n + 1    (n tekse)\nDizi: n, f(n), f(f(n)), … 1'e ulaşınca durulur",
      p: [
        "Kuralı küçük bir sayıyla deneyelim. 6 ile başlayalım: 6 çifttir, ikiye bölünce 3. 3 tektir, 3 × 3 + 1 = 10. 10 çifttir, 5. 5 tektir, 16. Ardından 8, 4, 2 ve 1 gelir. Dizi şöyledir: 6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1. Toplam 8 adımda 1'e ulaştık. Adım sayısı, ilk sayıdan 1'e kadar yapılan işlem sayısıdır; başlangıç sayısı adım olarak sayılmaz."
      ],
      table: {
        head: ["Başlangıç", "Dizi", "Adım", "En yüksek değer"],
        rows: [
          ["6", "6, 3, 10, 5, 16, 8, 4, 2, 1", "8", "16"],
          ["7", "7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1", "16", "52"],
          ["9", "9, 28, 14, 7, … (7'nin dizisi)", "19", "52"],
          ["11", "11, 34, 17, 52, … (7'nin dizisinin devamı)", "14", "52"],
          ["16", "16, 8, 4, 2, 1", "4", "16"],
          ["27", "27, 82, 41, 124, 62, 31, … 9.232 … 1", "111", "9.232"]
        ],
        caption: "Değerler hesaplanmıştır. 9'un dizisi üç adım sonra 7'ye ulaşır ve oradan 7'nin yolunu izler; diziler bu şekilde birbirine bağlanır."
      },
      after: [
        "Kendi seçtiğiniz bir sayının dizisini görmek için [[arac:collatz-dizisi-hesapla|Collatz Dizisi Hesaplama]] aracına sayıyı girin; araç tüm terimleri, adım sayısını ve dizinin en yüksek değerini gösterir."
      ]
    },
    {
      h: "27 sayısı neden bu kadar uzun bir dizi üretir?",
      p: [
        "27 küçük bir sayıdır, ama Collatz dizisi tam 111 adım sürer ve yolda 9.232'ye kadar yükselir; bu, başlangıç değerinin 340 katından fazladır. Zirveye 77. adımda ulaşılır, ardından dizi iniş yoluna geçer. 111 adımın 41'inde 3n + 1, 70'inde ikiye bölme işlemi uygulanır.",
        "Bunun nedeni, 27'den sonra gelen sayıların ikiye bölündükten sonra sık sık yeniden tek sayıya düşmesidir: 27 → 82 → 41 → 124 → 62 → 31 → 94 → 47 → 142 → 71 → 214 → 107 … Her tek sayıda değer yaklaşık üç katına çıkar, yalnızca bir kez yarıya iner. Uzun süre bu düzende kalan diziler yükselir. Çok sayıda ikiye bölmenin art arda gelmesi ise (örneğin 2'nin bir kuvvetine ulaşıldığında) diziyi hızla düşürür. 100'ün altındaki sayılar arasında en uzun diziyi 97 (118 adım), 1.000'in altında ise 871 (178 adım) üretir."
      ]
    },
    {
      h: "Dizi neden hep 4-2-1 döngüsüne düşer?",
      p: [
        "1'e ulaşan bir diziye kuralı uygulamaya devam ederseniz 1 tek olduğu için 3 × 1 + 1 = 4 bulursunuz, sonra 2 ve yeniden 1. Yani 1'e ulaşan her dizi 4 → 2 → 1 → 4 döngüsüne girer. Bu yüzden diziler 1'e ulaşınca durdurulur. Sanının asıl iddiası iki parçalıdır: hiçbir dizi sonsuza kadar büyümez ve pozitif sayılarda 4-2-1 dışında başka bir döngü yoktur.",
        "Negatif tam sayılarda durum farklıdır: −1, −5 ve −17 ile başlayan diziler 1'e değil, kendi küçük döngülerine düşer. Bu, kuralın her sayı kümesinde aynı davranmadığını ve pozitif sayılardaki düzenin hiç de kendiliğinden olmadığını gösterir. 2'nin kuvvetleri (2, 4, 8, 16, 32 …) ise en kısa yoldan iner: 2<sup>k</sup> ile başlayan dizi tam k adımda 1'e ulaşır."
      ]
    },
    {
      h: "Collatz sanısı kanıtlandı mı?",
      p: [
        "Hayır. 2026 itibarıyla Collatz sanısı ne kanıtlanmış ne de bir karşı örnekle çürütülmüştür. Problem üzerine çok sayıda kısmi sonuç elde edilmiştir. 2019'da matematikçi Terence Tao, \"neredeyse tüm\" başlangıç sayılarının dizilerinin, istatistiksel anlamda, başlangıç değerinden çok daha küçük değerlere indiğini gösterdi. Bu, bugüne kadarki en güçlü sonuçlardan biridir, ama her sayının 1'e ulaştığını kanıtlamaz.",
        "Daha önce de John Conway, Collatz'a benzer genelleştirilmiş kuralların bazılarının davranışını önceden söylemenin mantıksal olarak imkânsız olabileceğini gösterdi. Bu, Collatz sanısının da kanıtlanamaz olduğu anlamına gelmez, ama problemin neden bu kadar dirençli olduğunu açıklayan ipuçlarından biridir. İnternette ara sıra \"Collatz kanıtlandı\" iddiaları görülür; bunlar uzman matematikçilerin hakem incelemesinden geçmedikçe kabul edilmez."
      ]
    },
    {
      h: "Hangi sayılara kadar bilgisayarla denendi?",
      p: [
        "Bilgisayarlar onlarca yıldır sanıyı giderek büyüyen sayılar için denetliyor. Bugün bilinen en geniş doğrulama, 2<sup>71</sup>'e, yani yaklaşık 2,36 × 10<sup>21</sup>'e kadar olan bütün pozitif tam sayıların dizisinin 1'e ulaştığını göstermiştir. Bu sınır, 2025 başında tamamlanan ve dağıtık hesaplamayla yürütülen bir projeyle ulaşılan değerdir."
      ],
      formula: "2^71 = 2.361.183.241.434.822.606.848 ≈ 2,36 × 10^21",
      after: [
        "Bu kadar büyük bir aralıkta karşı örnek bulunmaması sanının doğru olduğuna dair güçlü bir işarettir, ama matematiksel kanıt değildir. Matematikte bazı sanıların çok büyük sayılarda ilk kez yanlış çıktığı örnekler bilinir; bu yüzden sayısal deney ne kadar geniş olursa olsun, kesin sonuç için genel bir kanıt gerekir. Benzer bir durumu [[bilgi:asal-sayilar-nedir|asal sayılar]] üzerine sanılarda da görürsünüz."
      ]
    },
    {
      h: "Collatz problemi neden \"dolu tanesi\" diye anılır?",
      p: [
        "Collatz dizileri inişli çıkışlı bir yol izler: tek sayılarda yükselir, çift sayılarda alçalır ve bazen başlangıç değerinin çok üstüne çıkar. Bu davranış, bulutun içinde rüzgârla defalarca yukarı aşağı savrulduktan sonra sonunda yere düşen dolu tanelerine benzetilir. Bu yüzden İngilizce kaynaklarda bu sayılara \"hailstone numbers\" (dolu tanesi sayıları) denir.",
        "Benzetme, problemin çekirdeğini de anlatır: dolu tanesinin bir gün düşeceğini biliriz, ama her taneyi tek tek izlemeden ne kadar yükseğe çıkacağını ya da ne zaman düşeceğini kestiremeyiz. Collatz dizilerinde de dizi uzunluğunu ve zirvesini önceden veren basit bir formül bilinmez."
      ]
    },
    {
      h: "Bu problem okulda nasıl etkinliğe dönüştürülür?",
      ol: [
        "Her öğrenci 1 ile 30 arasında bir sayı seçer ve dizisini kâğıt üzerinde yazar; adım sayısını ve en yüksek değeri not eder.",
        "Sonuçlar tahtada bir tabloda toplanır: hangi sayı en uzun sürdü, hangisi en yükseğe çıktı?",
        "Öğrenciler dizilerin birleştiği noktaları arar (ör. 9, 11 ve 7'nin dizilerinin 52'de buluşması) ve bir \"ağaç\" çizer.",
        "2'nin kuvvetlerinin neden doğrudan 1'e indiği tartışılır; bu, [[bilgi:uslu-sayilar-kurallari|üslü sayılar]] konusuna doğal bir köprüdür.",
        "Son olarak 27 bilgisayarda denenir ve 111 adımlık dizi grafikle gösterilir; öğrenciler elle hesap ile bilgisayar arasındaki farkı görür."
      ],
      after: [
        "Etkinlik tek–çift ayrımını, çarpma ve bölmeyi, tablo ve grafik okumayı birlikte çalıştırır. Benzer şekilde kural tabanlı diziler için [[arac:fibonacci-hesapla|Fibonacci Hesaplama]] aracı ve [[bilgi:sayi-dizisi-sorulari-nasil-cozulur|sayı dizisi soruları]] makalesi iyi bir devam olur. Dizide geçen sayıların asal olup olmadığını merak eden öğrenciler [[arac:asal-sayi-sorgula|Asal Sayı Sorgulama]] aracını kullanabilir."
      ]
    }
  ],
  faq: [
    ["Collatz sanısı nedir?", "Collatz sanısı, bir pozitif tam sayıya çiftse ikiye bölme, tekse 3 ile çarpıp 1 ekleme kuralını tekrar tekrar uyguladığınızda her zaman sonunda 1'e ulaşacağınızı söyleyen, 1937'de ortaya atılmış ve hâlâ kanıtlanmamış bir iddiadır."],
    ["3n + 1 kuralı nasıl uygulanır?", "Sayı çiftse ikiye bölünür, tekse 3 ile çarpılıp 1 eklenir ve aynı işlem elde edilen yeni sayıya uygulanır. Örneğin 6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1 dizisi 8 adımda 1'e ulaşır."],
    ["27 sayısı neden bu kadar uzun bir dizi üretir?", "27'den sonraki sayılar ikiye bölündükten sonra sık sık yeniden tek sayıya düşer ve her tek sayıda değer yaklaşık üç katına çıkar. Bu yüzden dizi 111 adım sürer ve 77. adımda 9.232'ye kadar yükselir."],
    ["Collatz sanısı kanıtlandı mı?", "Hayır, 2026 itibarıyla ne kanıtlanmış ne de çürütülmüştür. 2019'da Terence Tao neredeyse tüm sayıların dizilerinin çok küçük değerlere indiğini gösterdi, ancak bu her sayının 1'e ulaştığının kanıtı değildir."],
    ["Hangi sayılara kadar bilgisayarla denendi?", "Sanı, 2025'te tamamlanan bir hesaplamayla 2 üzeri 71'e, yani yaklaşık 2,36 × 10 üzeri 21'e kadar bütün pozitif tam sayılar için doğrulanmıştır. Bu güçlü bir işarettir ama matematiksel kanıt yerine geçmez."],
    ["Dizi neden hep 4-2-1 döngüsüne düşer?", "1'e ulaşıldığında kural 1'i 4'e, 4'ü 2'ye, 2'yi yeniden 1'e çevirir. Sanıya göre pozitif sayılarda bundan başka döngü yoktur; negatif sayılarda ise −1, −5 ve −17 ile başlayan başka döngüler vardır."],
    ["Collatz problemi neden \"dolu tanesi\" diye anılır?", "Diziler tek sayılarda yükselip çift sayılarda alçalarak inişli çıkışlı bir yol izler ve sonunda 1'e düşer. Bu, bulutta savrulup sonunda yere düşen dolu tanelerine benzetildiği için dolu tanesi sayıları adı verilmiştir."],
    ["Bu problem okulda nasıl etkinliğe dönüştürülür?", "Öğrenciler seçtikleri sayıların dizilerini yazar, adım sayısı ve zirveleri tabloda karşılaştırır, birleşen dizilerden bir ağaç çizer. Ardından 27 gibi uzun diziler bilgisayarla incelenir ve grafikle gösterilir."],
    ["Collatz aracı hangi büyüklükte sayıları hesaplayabilir?", "Collatz Dizisi Hesaplama aracı tarayıcınızda çalışır ve tipik okul ile merak düzeyindeki sayıları anında hesaplar. Çok büyük sayılarda terim sayısı ve hesap süresi artabilir; girdiğiniz değerler hiçbir yere gönderilmez."]
  ],
  tools: ["collatz-dizisi-hesapla", "fibonacci-hesapla", "asal-sayi-sorgula"],
  related: ["asal-sayilar-nedir", "sayi-dizisi-sorulari-nasil-cozulur", "uslu-sayilar-kurallari"]
};
