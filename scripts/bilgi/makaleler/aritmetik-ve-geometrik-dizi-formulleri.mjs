export default {
  slug: "aritmetik-ve-geometrik-dizi-formulleri",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Aritmetik ve Geometrik Dizi Formülleri: Genel Terim ve Toplam",
  pageTitle: "Aritmetik ve Geometrik Dizi Formülleri: Genel Terim, Toplam",
  description: "Aritmetik dizide aₙ = a₁ + (n−1)d, geometrik dizide aₙ = a₁·rⁿ⁻¹. İlk n terim toplamı, 1'den 100'e toplamın 5050 olması, sonsuz geometrik toplam ve çözümlü örnekler.",
  keywords: ["aritmetik dizi formülü", "geometrik dizi formülü", "aritmetik dizi genel terim", "geometrik dizi toplamı", "ortak fark nedir", "ortak çarpan nedir", "1'den 100'e kadar sayıların toplamı", "sonsuz geometrik dizi toplamı"],
  lead: "Aritmetik dizide her terim bir öncekine sabit bir <strong>ortak fark (d)</strong> eklenerek bulunur ve genel terim <strong>aₙ = a₁ + (n − 1)·d</strong> formülüyle hesaplanır; geometrik dizide ise her terim bir öncekinin sabit bir <strong>ortak çarpan (r)</strong> ile çarpımıdır ve <strong>aₙ = a₁·rⁿ⁻¹</strong> geçerlidir. İlk n terimin toplamı aritmetik dizide n·(a₁ + aₙ)/2, geometrik dizide a₁·(rⁿ − 1)/(r − 1) formülüyle bulunur. Bu sayfada iki diziyi ayırt etmeyi, 1'den 100'e kadar sayıların toplamının neden 5.050 olduğunu, sonsuz geometrik toplamı ve günlük hayattan çözümlü örnekleri bulacaksınız.",
  kisaCevap: [
    "Aritmetik dizi: ardışık terimlerin farkı sabittir; d = a₂ − a₁ ve aₙ = a₁ + (n − 1)·d.",
    "Aritmetik dizide ilk n terimin toplamı Sₙ = n·(a₁ + aₙ) / 2'dir; 1 + 2 + … + 100 = 100 · 101 / 2 = 5.050.",
    "Geometrik dizi: ardışık terimlerin oranı sabittir; r = a₂ / a₁ ve aₙ = a₁·rⁿ⁻¹.",
    "Geometrik dizide ilk n terimin toplamı (r ≠ 1 için) Sₙ = a₁·(rⁿ − 1) / (r − 1)'dir.",
    "|r| < 1 ise sonsuz geometrik dizinin toplamı vardır ve S = a₁ / (1 − r)'dir; 8 + 4 + 2 + … = 16.",
    "Aritmetik dizi doğrusal, geometrik dizi üstel büyür; faiz, nüfus ve kopya sayısı geometrik davranır."
  ],
  figure: {
    alt: "Aritmetik ve geometrik dizinin karşılaştırma grafiği: 5, 8, 11, 14 diye 3'er artan çubuklar ile 3, 6, 12, 24 diye ikiye katlanan çubuklar yan yana; altında iki dizinin genel terim ve toplam formülleri.",
    caption: "Aritmetik dizi (d = 3) her adımda aynı miktar büyür, geometrik dizi (r = 2) her adımda iki katına çıkar. İlk iki terimde geride olan geometrik dizi 3. terimde aritmetik diziyi geçer; 6. terimde fark 96 − 20 = 76 olur.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Doğrusal ve üstel büyüme: ilk 6 terim</text>
  <line x1="60" y1="300" x2="700" y2="300" class="st" fill="none"/>
  <line x1="60" y1="60" x2="60" y2="300" class="st" fill="none"/>
  <text x="54" y="304" class="sm end mu">0</text><text x="54" y="204" class="sm end mu">40</text><text x="54" y="104" class="sm end mu">80</text>
  <line x1="60" y1="200" x2="700" y2="200" class="sb dash" fill="none"/><line x1="60" y1="100" x2="700" y2="100" class="sb dash" fill="none"/>
  <g>
    <rect x="80" y="287.5" width="34" height="12.5" class="p"/><rect x="118" y="292.5" width="34" height="7.5" class="ok"/>
    <rect x="186" y="280" width="34" height="20" class="p"/><rect x="224" y="285" width="34" height="15" class="ok"/>
    <rect x="292" y="272.5" width="34" height="27.5" class="p"/><rect x="330" y="270" width="34" height="30" class="ok"/>
    <rect x="398" y="265" width="34" height="35" class="p"/><rect x="436" y="240" width="34" height="60" class="ok"/>
    <rect x="504" y="257.5" width="34" height="42.5" class="p"/><rect x="542" y="180" width="34" height="120" class="ok"/>
    <rect x="610" y="250" width="34" height="50" class="p"/><rect x="648" y="60" width="34" height="240" class="ok"/>
  </g>
  <g class="sm mid">
    <text x="97" y="282">5</text><text x="135" y="287">3</text>
    <text x="203" y="274">8</text><text x="241" y="279">6</text>
    <text x="309" y="266">11</text><text x="347" y="264">12</text>
    <text x="415" y="259">14</text><text x="453" y="234">24</text>
    <text x="521" y="251">17</text><text x="559" y="174">48</text>
    <text x="627" y="244">20</text><text x="665" y="80" class="sf b">96</text>
  </g>
  <g class="sm mid mu">
    <text x="116" y="318">1. terim</text><text x="222" y="318">2.</text><text x="328" y="318">3.</text><text x="434" y="318">4.</text><text x="540" y="318">5.</text><text x="646" y="318">6.</text>
  </g>
  <rect x="80" y="68" width="14" height="14" class="p"/><text x="100" y="80" class="sm">aritmetik: a₁ = 5, d = 3</text>
  <rect x="280" y="68" width="14" height="14" class="ok"/><text x="300" y="80" class="sm">geometrik: a₁ = 3, r = 2</text>
  <rect x="20" y="336" width="335" height="92" rx="10" class="ps"/>
  <text x="36" y="362" class="b">Aritmetik</text>
  <text x="36" y="388">aₙ = a₁ + (n − 1)·d</text>
  <text x="36" y="414">Sₙ = n·(a₁ + aₙ) / 2</text>
  <rect x="365" y="336" width="335" height="92" rx="10" class="oks"/>
  <text x="381" y="362" class="b">Geometrik</text>
  <text x="381" y="388">aₙ = a₁·rⁿ⁻¹</text>
  <text x="381" y="414">Sₙ = a₁·(rⁿ − 1) / (r − 1)</text>
</svg>`
  },
  sections: [
    {
      h: "Dizi nedir? Terim, sıra ve genel terim",
      p: [
        "Matematikte <strong>dizi</strong>, belirli bir kurala göre sıralanmış sayılar listesidir. Dizinin her elemanına <strong>terim</strong> denir; ilk terim a₁, ikinci terim a₂, n'inci terim aₙ diye gösterilir. Dizinin herhangi bir terimini sırasını bilerek doğrudan bulmamızı sağlayan formüle <strong>genel terim</strong> denir. Örneğin aₙ = 2n − 1 genel terimi 1, 3, 5, 7, … tek sayılar dizisini verir.",
        "Lise matematiğinde ve AYT'de en çok iki dizi türü öne çıkar: terimleri sabit bir miktar artan ya da azalan <strong>aritmetik dizi</strong> ve terimleri sabit bir oranla büyüyen ya da küçülen <strong>geometrik dizi</strong>. İkisinin de genel terim ve toplam formülleri birkaç mantıklı adımdan türetilir; formülü ezberlemek yerine nereden geldiğini anlamak, sınavda farklı soru tiplerine uyum sağlamayı kolaylaştırır."
      ]
    },
    {
      h: "Aritmetik dizi nedir, genel terimi nasıl bulunur?",
      p: [
        "Ardışık iki terim arasındaki farkın her zaman aynı olduğu diziye aritmetik dizi denir. Bu sabit farka <strong>ortak fark</strong> (d) denir. 5, 8, 11, 14, … dizisinde her terim bir öncekinden 3 fazladır; d = 3'tür. d negatifse dizi azalır (20, 17, 14, …), d = 0 ise bütün terimler eşittir.",
        "Birinci terimden n'inci terime gitmek için (n − 1) kez d eklenir. Genel terim formülü buradan gelir. Herhangi iki terim biliniyorsa aradaki fark, sıra farkına bölünerek d bulunur: aₘ − aₖ = (m − k)·d."
      ],
      formula: "Ortak fark: d = aₙ₊₁ − aₙ\nGenel terim: aₙ = a₁ + (n − 1)·d\nİki terimden: d = (aₘ − aₖ) / (m − k)",
      ol: [
        "<strong>Soru:</strong> 5, 8, 11, … dizisinin 20. terimi kaçtır?",
        "Ortak farkı bulun: d = 8 − 5 = 3.",
        "Formülü uygulayın: a₂₀ = 5 + (20 − 1) × 3 = 5 + 57 = 62.",
        "<strong>Ters soru:</strong> Bu dizide 101 kaçıncı terimdir? 101 = 5 + (n − 1) × 3 → (n − 1) = 32 → n = 33.",
        "<strong>İki terimden:</strong> a₄ = 17 ve a₁₀ = 41 ise d = (41 − 17) / (10 − 4) = 4, a₁ = 17 − 3 × 4 = 5 olur."
      ],
      after: [
        "Aritmetik dizinin güzel bir özelliği daha vardır: herhangi bir terim, kendisine eşit uzaklıktaki iki terimin aritmetik ortalamasıdır. Örneğin a₅ = (a₃ + a₇) / 2. Bu yüzden üç sayı aritmetik dizi oluşturuyorsa ortadaki sayı diğer ikisinin ortalamasıdır; ortalama kavramının istatistikteki karşılığı için [[bilgi:ortalama-medyan-mod-nedir|ortalama, medyan ve mod]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "İlk n terimin toplamı ve 1'den 100'e kadar sayıların toplamı",
      p: [
        "Rivayete göre küçük Carl Friedrich Gauss'tan sınıfta 1'den 100'e kadar sayıları toplaması istendiğinde, sayıları baştan ve sondan eşleştirmiştir: 1 + 100 = 101, 2 + 99 = 101, 3 + 98 = 101… Toplam 50 çift oluşur ve her çiftin toplamı 101'dir; sonuç 50 × 101 = <strong>5.050</strong>. Bu fikir bütün aritmetik dizilere uygulanır, çünkü baştan ve sondan eşit uzaklıktaki terimlerin toplamı her zaman a₁ + aₙ'ye eşittir."
      ],
      formula: "Sₙ = n·(a₁ + aₙ) / 2\nya da Sₙ = n·[2a₁ + (n − 1)·d] / 2\n1 + 2 + … + n = n·(n + 1) / 2",
      table: {
        head: ["Toplam", "Formül", "Sonuç"],
        rows: [
          ["1 + 2 + 3 + … + 100", "100 × 101 / 2", "5.050"],
          ["1 + 2 + … + 1.000", "1.000 × 1.001 / 2", "500.500"],
          ["2 + 4 + 6 + … + 100 (çift sayılar)", "50 × (2 + 100) / 2", "2.550"],
          ["1 + 3 + 5 + … + 99 (tek sayılar)", "50²", "2.500"],
          ["5 + 8 + 11 + … + 62 (ilk 20 terim)", "20 × (5 + 62) / 2", "670"],
          ["51 + 52 + … + 100", "50 × (51 + 100) / 2", "3.775"]
        ],
        caption: "İlk n tek sayının toplamının her zaman n² olması, aritmetik toplam formülünün özel bir sonucudur: n·(1 + 2n − 1)/2 = n²."
      },
      after: [
        "Ardışık sayıların toplamını herhangi bir aralık için anında görmek isterseniz [[arac:ardisik-sayi-toplami|Ardışık Sayı Toplamı]] aracını, bütün terimleri listelemek ve toplamı bulmak için [[arac:aritmetik-dizi-hesapla|Aritmetik Dizi Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Geometrik dizi nedir, ortak çarpan nasıl hesaplanır?",
      p: [
        "Ardışık iki terimin oranının her zaman aynı olduğu diziye geometrik dizi denir. Bu sabit orana <strong>ortak çarpan</strong> ya da ortak oran (r) denir. 3, 6, 12, 24, … dizisinde her terim bir öncekinin 2 katıdır; r = 2'dir. r, 0 ile 1 arasındaysa dizi küçülür (80, 40, 20, …), negatifse terimlerin işareti sırayla değişir (1, −2, 4, −8, …).",
        "Birinci terimden n'inci terime gitmek için (n − 1) kez r ile çarpılır. Bu yüzden genel terimde r'nin üssü n değil n − 1'dir; en sık yapılan hata bu üssü yanlış yazmaktır."
      ],
      formula: "Ortak çarpan: r = aₙ₊₁ / aₙ\nGenel terim: aₙ = a₁·rⁿ⁻¹\nİki terimden: rᵐ⁻ᵏ = aₘ / aₖ",
      ol: [
        "<strong>Soru:</strong> 3, 6, 12, … dizisinin 8. terimi kaçtır?",
        "Ortak çarpanı bulun: r = 6 / 3 = 2.",
        "Formülü uygulayın: a₈ = 3 × 2⁷ = 3 × 128 = 384.",
        "<strong>İki terimden:</strong> a₂ = 6 ve a₅ = 162 ise r³ = 162 / 6 = 27, r = 3 ve a₁ = 6 / 3 = 2 olur.",
        "<strong>Ortadaki terim:</strong> Geometrik dizide bir terimin karesi, eşit uzaklıktaki iki terimin çarpımına eşittir: a₄² = a₂ × a₆. 4, x, 9 geometrik dizi ise x² = 36, x = 6 (ya da −6)."
      ]
    },
    {
      h: "Geometrik dizide ilk n terimin toplamı",
      p: [
        "Toplamı bulmak için Sₙ'yi yazıp r ile çarpar ve iki ifadeyi birbirinden çıkarırız. Ortadaki bütün terimler sadeleşir, geriye yalnızca ilk ve son kısım kalır. Bu kısa türetme, formülü unuttuğunuzda yeniden kurmanızı sağlar."
      ],
      formula: "Sₙ = a₁ + a₁r + a₁r² + … + a₁rⁿ⁻¹\nr·Sₙ = a₁r + a₁r² + … + a₁rⁿ\nr·Sₙ − Sₙ = a₁rⁿ − a₁  →  Sₙ = a₁·(rⁿ − 1) / (r − 1)   (r ≠ 1)",
      ol: [
        "<strong>Soru:</strong> 3 + 6 + 12 + … dizisinin ilk 8 teriminin toplamı kaçtır?",
        "a₁ = 3, r = 2, n = 8 değerlerini yerleştirin: S₈ = 3 × (2⁸ − 1) / (2 − 1).",
        "2⁸ = 256 olduğundan S₈ = 3 × 255 / 1 = <strong>765</strong>.",
        "Kontrol: 3 + 6 + 12 + 24 + 48 + 96 + 192 + 384 = 765.",
        "r = 1 ise bütün terimler eşittir ve toplam basitçe n·a₁'dir."
      ],
      after: [
        "Satranç tahtası efsanesi bu formülün en çarpıcı örneğidir: ilk kareye 1, ikincisine 2, üçüncüsüne 4 buğday tanesi konup her karede iki katına çıkılırsa 64 karedeki toplam 2⁶⁴ − 1, yani yaklaşık 18,4 kentilyon tane olur. Büyük üsleri elle hesaplamak yerine [[arac:geometrik-dizi-hesapla|Geometrik Dizi Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Sonsuz geometrik dizinin toplamı var mı?",
      p: [
        "Ortak çarpanın mutlak değeri 1'den küçükse (|r| < 1) terimler gittikçe küçülür ve sıfıra yaklaşır. Bu durumda rⁿ, n büyüdükçe 0'a yaklaştığı için toplam formülündeki rⁿ terimi kaybolur ve sonsuz sayıda terimin toplamı sonlu bir sayıya eşit olur. |r| ≥ 1 ise toplam sonsuza gider ya da salınır; sonlu bir değeri yoktur."
      ],
      formula: "|r| < 1 ise S∞ = a₁ / (1 − r)\nÖrnek: 8 + 4 + 2 + 1 + … → a₁ = 8, r = 1/2 → S = 8 / (1/2) = 16",
      after: [
        "Bu fikir, devirli ondalık sayıların kesre çevrilmesinin de temelidir: 0,333… = 3/10 + 3/100 + 3/1.000 + … sonsuz geometrik toplamıdır; a₁ = 3/10 ve r = 1/10 olduğundan toplam (3/10) / (9/10) = 1/3 çıkar. Aynı yöntemle 0,999…'un tam olarak 1'e eşit olduğu da gösterilir; ayrıntısı [[bilgi:devirli-ondalik-sayi-kesre-cevirme|devirli ondalık sayılar]] yazısındadır."
      ]
    },
    {
      h: "Aritmetik ve geometrik dizi nasıl ayırt edilir?",
      p: [
        "Verilen ilk birkaç terimin önce farklarına, sonra oranlarına bakın. Farklar sabitse aritmetik, oranlar sabitse geometrik dizidir. İkisi de sabit değilse dizi bu iki türden biri değildir; Fibonacci dizisi (1, 1, 2, 3, 5, 8, …) gibi her terimin önceki iki terimin toplamı olduğu özel diziler de vardır."
      ],
      table: {
        head: ["Özellik", "Aritmetik dizi", "Geometrik dizi"],
        rows: [
          ["Sabit olan", "Ardışık terimlerin farkı (d)", "Ardışık terimlerin oranı (r)"],
          ["Örnek", "5, 8, 11, 14, …", "3, 6, 12, 24, …"],
          ["Genel terim", "a₁ + (n − 1)·d", "a₁·rⁿ⁻¹"],
          ["İlk n terim toplamı", "n·(a₁ + aₙ) / 2", "a₁·(rⁿ − 1) / (r − 1)"],
          ["Ortadaki terim", "Komşularının aritmetik ortalaması", "Komşularının geometrik ortalaması"],
          ["Büyüme biçimi", "Doğrusal, grafikte düz çizgi", "Üstel, grafikte eğri"],
          ["Sonsuz toplam", "d ≠ 0 ise yok", "|r| < 1 ise a₁ / (1 − r)"]
        ]
      },
      after: [
        "Fibonacci dizisi ne aritmetik ne geometriktir ama ardışık terimlerinin oranı büyüdükçe [[bilgi:altin-oran-nedir|altın oran]] olan 1,618…'e yaklaşır; terimleri [[arac:fibonacci-hesapla|Fibonacci Hesaplama]] aracıyla üretebilirsiniz."
      ]
    },
    {
      h: "Diziler günlük hayatta nerede kullanılır?",
      ul: [
        "<strong>Düzenli artan birikim (aritmetik):</strong> İlk ay 500 TL biriktirip her ay 100 TL artırırsanız 12. ay 500 + 11 × 100 = 1.600 TL yatırırsınız; yıl sonunda toplam 12 × (500 + 1.600) / 2 = 12.600 TL birikir (faiz hariç, örnek tutar).",
        "<strong>Basamak ve oturma düzeni (aritmetik):</strong> Bir amfide ilk sırada 20, her sırada 2 fazla koltuk varsa 15. sırada 48 koltuk bulunur, 15 sıranın toplamı 15 × (20 + 48) / 2 = 510 koltuktur.",
        "<strong>Bileşik faiz ve enflasyon (geometrik):</strong> Her dönem aynı oranda büyüyen tutar geometrik dizidir; yıllık %10 büyüyen 1.000 TL, 5 yıl sonra 1.000 × 1,1⁵ ≈ 1.610,51 TL olur. Konu [[bilgi:bilesik-faiz-nedir|bileşik faiz]] yazısında ayrıntılıdır.",
        "<strong>Hücre bölünmesi ve kopya sayısı (geometrik):</strong> Her 20 dakikada ikiye bölünen bir hücre kültürü 3 saatte 9 kez bölünür ve 1 hücreden 2⁹ = 512 hücre oluşur.",
        "<strong>Değer kaybı (geometrik, r < 1):</strong> Her yıl değerinin %20'sini kaybeden bir cihaz, r = 0,8 olan azalan bir geometrik dizi izler."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Üssü n yazmak:</strong> Geometrik genel terimde üs n − 1'dir; a₈ için r⁷ kullanılır.",
        "<strong>Terim sayısını yanlış saymak:</strong> 5'ten 62'ye 3'er artan dizide terim sayısı (62 − 5) / 3 + 1 = 20'dir; sondaki +1 unutulmamalıdır.",
        "<strong>r = 1 için toplam formülünü kullanmak:</strong> Payda sıfır olur; bu durumda toplam n·a₁'dir.",
        "<strong>|r| ≥ 1 iken sonsuz toplam yazmak:</strong> 1 + 2 + 4 + … dizisinin sonlu toplamı yoktur.",
        "<strong>Negatif çarpanı gözden kaçırmak:</strong> x² = 36 gibi denklemlerde ortadaki terim −6 da olabilir; soruda pozitiflik şartına bakın."
      ]
    }
  ],
  faq: [
    ["Aritmetik dizi nedir?", "Aritmetik dizi, ardışık iki terim arasındaki farkın her zaman aynı olduğu sayı dizisidir. Bu sabit farka ortak fark denir; örneğin 5, 8, 11, 14 dizisinde her terim bir öncekinden 3 fazladır ve ortak fark 3'tür."],
    ["Aritmetik dizinin genel terimi nasıl bulunur?", "Genel terim aₙ = a₁ + (n − 1)·d formülüyle bulunur. İlk terime ortak fark n − 1 kez eklenir; 5, 8, 11 dizisinin 20. terimi 5 + 19 × 3 = 62 olarak hesaplanır."],
    ["Geometrik dizinin ortak çarpanı nasıl hesaplanır?", "Herhangi bir terim bir önceki terime bölünerek ortak çarpan bulunur: r = a₂ / a₁. Ardışık olmayan iki terim biliniyorsa, terimlerin oranı r'nin sıra farkı kadar kuvvetine eşittir ve kök alınarak r bulunur."],
    ["İlk n terimin toplamı formülü nedir?", "Aritmetik dizide Sₙ = n·(a₁ + aₙ) / 2, geometrik dizide r birden farklıysa Sₙ = a₁·(rⁿ − 1) / (r − 1) formülü kullanılır. Örneğin 3, 6, 12 dizisinin ilk 8 teriminin toplamı 765'tir."],
    ["1'den 100'e kadar sayıların toplamı kaçtır?", "1'den 100'e kadar sayıların toplamı 5.050'dir. Formül n·(n + 1) / 2 olup 100 × 101 / 2 işlemiyle bulunur; baştan ve sondan eşleştirilen her sayı çiftinin toplamı 101'dir ve 50 çift vardır."],
    ["Aritmetik ve geometrik dizi nasıl ayırt edilir?", "Ardışık terimlerin önce farkına, sonra oranına bakılır. Fark sabitse dizi aritmetik, oran sabitse geometriktir. İkisi de sabit değilse dizi bu türlerden biri değildir, Fibonacci gibi farklı bir kurala uyar."],
    ["Sonsuz geometrik dizinin toplamı var mı?", "Ortak çarpanın mutlak değeri 1'den küçükse sonsuz toplam vardır ve a₁ / (1 − r) formülüyle bulunur. 8 + 4 + 2 + 1 dizisinde toplam 16'dır; ortak çarpan 1 ya da daha büyükse sonlu toplam yoktur."],
    ["Diziler günlük hayatta nerede kullanılır?", "Her ay sabit miktar artırılan birikim aritmetik, bileşik faiz, enflasyon, nüfus artışı ve hücre bölünmesi geometrik dizidir. Değer kaybı gibi sabit oranlı azalmalar da ortak çarpanı 1'den küçük geometrik dizilerle modellenir."],
    ["Bir aritmetik dizide terim sayısı nasıl bulunur?", "Terim sayısı, son terimden ilk terim çıkarılıp ortak farka bölünerek ve sonuca 1 eklenerek bulunur. 5'ten başlayıp 3'er artarak 62'ye ulaşan dizide (62 − 5) / 3 + 1 = 20 terim vardır."]
  ],
  tools: ["aritmetik-dizi-hesapla", "geometrik-dizi-hesapla", "ardisik-sayi-toplami", "fibonacci-hesapla"],
  related: ["bilesik-faiz-nedir", "altin-oran-nedir", "devirli-ondalik-sayi-kesre-cevirme", "logaritma-nasil-hesaplanir"],
  sources: [
    ["MEB – Ortaöğretim matematik öğretim programı", "https://tymm.meb.gov.tr/"],
    ["ÖSYM – YKS sınav bilgileri", "https://www.osym.gov.tr/"]
  ]
};
