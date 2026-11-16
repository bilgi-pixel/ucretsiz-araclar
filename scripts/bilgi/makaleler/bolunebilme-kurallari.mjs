export default {
  slug: "bolunebilme-kurallari",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Bölünebilme Kuralları: 2, 3, 4, 5, 6, 8, 9, 10 ve 11 ile Bölünebilme",
  pageTitle: "Bölünebilme Kuralları: 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ile",
  description: "Bölünebilme kuralları: 3 ve 9 için basamak toplamı, 4 ve 8 için son basamaklar, 11 için sıralı fark, 7 için kural. Kalan bulma ve bölen sayısı çözümlü örneklerle.",
  keywords: ["bölünebilme kuralları", "3 ile bölünebilme kuralı", "4 ile bölünebilme", "9 ile bölünebilme", "11 ile bölünebilme", "7 ile bölünebilme", "bölünebilme kuralları 6. sınıf", "kalan nasıl bulunur"],
  lead: "Bölünebilme kuralları, bir sayının başka bir sayıya kalansız bölünüp bölünmediğini bölme işlemi yapmadan anlamanızı sağlar: <strong>2</strong> için son basamak çift, <strong>3</strong> ve <strong>9</strong> için basamak toplamı 3'ün ya da 9'un katı, <strong>4</strong> için son iki basamak, <strong>8</strong> için son üç basamak 4'ün ya da 8'in katı, <strong>5</strong> için son basamak 0 ya da 5, <strong>10</strong> için 0 olmalıdır. 11 için basamaklar sağdan başlayarak sırayla toplanıp çıkarılır. Bu sayfada her kuralı nedeniyle, 7 ile bölünebilmenin pratik yollarını, kalan bulmayı ve bir sayının tüm bölenlerini bulmayı çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "2 ile: son basamak 0, 2, 4, 6 ya da 8 ise; 5 ile: son basamak 0 ya da 5 ise; 10 ile: son basamak 0 ise.",
    "3 ile: basamakların toplamı 3'ün katıysa; 9 ile: basamakların toplamı 9'un katıysa bölünür (4.725 → 18).",
    "4 ile: son iki basamağın oluşturduğu sayı 4'ün katıysa; 8 ile: son üç basamağın oluşturduğu sayı 8'in katıysa.",
    "6 ile: sayı hem 2 hem 3 ile bölünüyorsa; 12 ile hem 3 hem 4, 15 ile hem 3 hem 5 ile bölünmelidir.",
    "11 ile: birler basamağından başlayıp basamaklar sırayla +, −, +, − işaretiyle toplanır; sonuç 0 ya da 11'in katıysa bölünür.",
    "7 ile: son basamağın 2 katı kalan sayıdan çıkarılır; sonuç 7'nin katıysa sayı da 7 ile bölünür."
  ],
  figure: {
    alt: "Bölünebilme kuralları kartı: 2, 5 ve 10 için son basamak; 4 için son iki, 8 için son üç basamak; 3 ve 9 için basamak toplamı; 11 için sağdan işaretli toplam; her biri örnek sayıyla.",
    caption: "Kurallar sayının hangi kısmına bakıldığına göre üç gruba ayrılır: sondaki basamaklar (2, 4, 5, 8, 10), basamakların toplamı (3, 9) ve işaretli toplam (11). 6, 12, 15 gibi sayılar bu kuralların birleşimidir.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Hangi kural sayının neresine bakar?</text>
  <rect x="20" y="50" width="220" height="170" rx="10" class="sf sb"/>
  <rect x="20" y="50" width="220" height="36" rx="10" class="p"/>
  <text x="130" y="74" class="b mid sf">Sondaki basamaklar</text>
  <text x="36" y="110" class="sm"><tspan class="b">2:</tspan> son basamak çift</text>
  <text x="36" y="132" class="sm"><tspan class="b">5:</tspan> son basamak 0 ya da 5</text>
  <text x="36" y="154" class="sm"><tspan class="b">10:</tspan> son basamak 0</text>
  <text x="36" y="176" class="sm"><tspan class="b">4:</tspan> son iki basamak 4'ün katı</text>
  <text x="36" y="198" class="sm"><tspan class="b">8:</tspan> son üç basamak 8'in katı</text>
  <rect x="250" y="50" width="220" height="170" rx="10" class="sf sb"/>
  <rect x="250" y="50" width="220" height="36" rx="10" class="ok"/>
  <text x="360" y="74" class="b mid sf">Basamak toplamı</text>
  <text x="360" y="118" class="lg b mid">4.725</text>
  <text x="360" y="146" class="mid">4 + 7 + 2 + 5 = 18</text>
  <text x="360" y="174" class="sm mid ok b">18, 3'ün ve 9'un katı</text>
  <text x="360" y="198" class="sm mid">4.725 ÷ 9 = 525</text>
  <rect x="480" y="50" width="220" height="170" rx="10" class="sf sb"/>
  <rect x="480" y="50" width="220" height="36" rx="10" class="a"/>
  <text x="590" y="74" class="b mid">11: işaretli toplam</text>
  <text x="590" y="118" class="lg b mid">9.163</text>
  <text x="590" y="146" class="mid">+3 − 6 + 1 − 9 = −11</text>
  <text x="590" y="174" class="sm mid ok b">−11, 11'in katı</text>
  <text x="590" y="198" class="sm mid">9.163 ÷ 11 = 833</text>
  <text x="20" y="256" class="b">Son basamaklara bakan kurallar: 5.128</text>
  <rect x="20" y="268" width="60" height="52" rx="6" class="sf sb"/><text x="50" y="302" class="xl mid">5</text>
  <rect x="86" y="268" width="60" height="52" rx="6" class="ps"/><text x="116" y="302" class="xl mid">1</text>
  <rect x="152" y="268" width="60" height="52" rx="6" class="ps"/><text x="182" y="302" class="xl mid">2</text>
  <rect x="218" y="268" width="60" height="52" rx="6" class="ps"/><text x="248" y="302" class="xl mid">8</text>
  <line x1="152" y1="332" x2="278" y2="332" class="sa sw" fill="none"/>
  <text x="215" y="352" class="sm mid">28 → 4'ün katı</text>
  <line x1="86" y1="368" x2="278" y2="368" class="sp sw" fill="none"/>
  <text x="182" y="388" class="sm mid">128 → 8'in katı</text>
  <rect x="320" y="256" width="380" height="164" rx="10" class="sf sb"/>
  <text x="336" y="282" class="b">Birleşik kurallar</text>
  <text x="336" y="310" class="sm"><tspan class="b">6</tspan> = 2 ve 3 · 4.326: çift, toplam 15 → 721</text>
  <text x="336" y="336" class="sm"><tspan class="b">12</tspan> = 3 ve 4 · <tspan class="b">15</tspan> = 3 ve 5</text>
  <text x="336" y="362" class="sm"><tspan class="b">7</tspan>: 2.156 → 215 − 12 = 203</text>
  <text x="336" y="384" class="sm">203 → 20 − 6 = 14, 7'nin katı</text>
  <text x="336" y="408" class="sm t2">Bölenler aralarında asal olmalı (6 = 2 × 3)</text>
</svg>`
  },
  sections: [
    {
      h: "Bölünebilme kuralları nedir, ne işe yarar?",
      p: [
        "Bir doğal sayı başka bir doğal sayıya kalansız bölünüyorsa \"bölünebilir\" deriz. Örneğin 36 sayısı 4'e bölünür, çünkü 36 = 4 × 9 ve kalan 0'dır. Bölünebilme kuralları, bu sonuca uzun bölme yapmadan, yalnızca sayının basamaklarına bakarak ulaşmanın kısa yollarıdır.",
        "Bu kurallar ortaokul matematiğinin, özellikle 6. sınıfın çarpanlar ve katlar konusunun temelidir; KPSS, ALES, DGS ve YKS'de de sık soru çıkan konulardandır. Günlük hayatta da işe yarar: 144 çikolatayı 6 kişiye eşit bölüp bölemeyeceğinizi ya da bir toplantı salonundaki 252 sandalyeyi 9'lu sıralara dizip dizemeyeceğinizi saniyeler içinde anlarsınız. Kesir sadeleştirme ([[bilgi:kesirlerle-islemler|kesirlerle işlemler]]), [[bilgi:ebob-ekok-nasil-bulunur|EBOB-EKOK bulma]] ve [[bilgi:asal-sayilar-nedir|asal sayıları]] ayıklama da bu kurallara dayanır."
      ]
    },
    {
      h: "2, 5 ve 10 ile bölünebilme: son basamağa bakın",
      p: [
        "Onluk sistemde her basamak 10'un kuvvetidir ve 10, hem 2'ye hem 5'e bölünür. Bu yüzden bir sayının onlar ve daha büyük basamakları her zaman 2, 5 ve 10'a bölünür; belirleyici olan yalnızca birler basamağıdır."
      ],
      ul: [
        "<strong>2 ile:</strong> Son basamak 0, 2, 4, 6 ya da 8 ise sayı çifttir ve 2 ile bölünür. 3.578 bölünür, 3.577 bölünmez (kalan 1).",
        "<strong>5 ile:</strong> Son basamak 0 ya da 5 ise bölünür. 7.345 bölünür; 7.348'in 5 ile bölümünden kalan, son basamağın 5'e bölümünden kalandır: 8'den 3 kalır.",
        "<strong>10 ile:</strong> Son basamak 0 ise bölünür. 10 ile bölümden kalan her zaman birler basamağıdır: 4.567'nin kalanı 7'dir.",
        "<strong>100 ve 1.000 ile:</strong> Aynı mantıkla son iki basamak 00 ise 100'e, son üç basamak 000 ise 1.000'e bölünür.",
        "<strong>25 ile:</strong> Son iki basamak 00, 25, 50 ya da 75 ise bölünür; 7.350 bu yüzden 25'e bölünür ve sonuç 294'tür."
      ]
    },
    {
      h: "4 ve 8 ile bölünebilme: son iki ve son üç basamak",
      p: [
        "100 sayısı 4'e bölündüğü için yüzler ve üstü basamaklar 4 ile bölünebilmeyi etkilemez; bakmanız gereken son iki basamaktır. 1.000 sayısı 8'e bölündüğü için de 8 ile bölünebilmede son üç basamak yeterlidir."
      ],
      ol: [
        "<strong>4 ile örnek:</strong> 1.236 sayısının son iki basamağı 36'dır. 36 = 4 × 9 olduğu için 1.236 de 4 ile bölünür: 1.236 ÷ 4 = 309.",
        "<strong>Kısa yol:</strong> Son iki basamakta onlar basamağının 2 katına birler basamağını ekleyin; sonuç 4'ün katıysa sayı 4'e bölünür. 36 için 3 × 2 + 6 = 12, 4'ün katı.",
        "<strong>8 ile örnek:</strong> 5.128 sayısının son üç basamağı 128'dir. 128 = 8 × 16 olduğu için 5.128 de 8'e bölünür: 5.128 ÷ 8 = 641.",
        "<strong>Kalan:</strong> 5.130'un 8 ile bölümünden kalan, 130'un 8 ile bölümünden kalanla aynıdır: 130 = 8 × 16 + 2, kalan 2."
      ],
      after: [
        "Aynı mantık 16 ile bölünebilmeye de uzanır: 10.000 sayısı 16'ya bölündüğü için son dört basamağa bakmak yeter. Ancak sınavlarda genellikle 2, 4 ve 8 sorulur."
      ]
    },
    {
      h: "3 ve 9 ile bölünebilme: basamak toplamı ne işe yarar?",
      p: [
        "10'un her kuvveti, 9'a bölündüğünde 1 kalanını verir: 10 = 9 + 1, 100 = 99 + 1, 1.000 = 999 + 1. Bu yüzden bir sayının 9'a bölümünden kalan, basamaklarının toplamının 9'a bölümünden kalanla aynıdır. 9 da 3'ün katı olduğu için aynı kural 3 için de geçerlidir. <strong>Basamak toplamı</strong> bu yüzden sayının \"özeti\" gibi çalışır."
      ],
      formula: "4.725 → 4 + 7 + 2 + 5 = 18\n18, 3'ün de 9'un da katı → 4.725 hem 3'e hem 9'a bölünür\n4.725 ÷ 3 = 1.575 · 4.725 ÷ 9 = 525",
      ol: [
        "<strong>3 ile örnek:</strong> 123.456 için 1 + 2 + 3 + 4 + 5 + 6 = 21. 21, 3'ün katıdır, 9'un katı değildir. Sayı 3'e bölünür (41.152), 9'a bölünmez.",
        "<strong>Kalan bulma:</strong> 4.727 için basamak toplamı 20'dir. 20'nin 9'a bölümünden kalan 2'dir; dolayısıyla 4.727'nin de 9'a bölümünden kalan 2'dir (4.727 = 9 × 525 + 2).",
        "<strong>Büyük toplamları küçültme:</strong> Toplam hâlâ büyükse işlemi tekrarlayın: 99.999.999 için toplam 72, 72 için toplam 9; sayı 9'a bölünür.",
        "<strong>Eksik basamak sorusu:</strong> 52A4 sayısı 9 ile bölünüyorsa 5 + 2 + A + 4 = 11 + A, 9'un katı olmalı; A = 7 bulunur (5.274 ÷ 9 = 586)."
      ],
      after: [
        "Basamak toplamını uzun sayılarda hızlıca bulmak için [[arac:basamak-toplami-hesapla|Basamak Toplamı Hesaplama]] aracını kullanabilirsiniz; araç tek basamağa inene kadar tekrar edilen toplamı (sayı kökünü) de gösterir."
      ]
    },
    {
      h: "6, 12, 15 ve diğer birleşik kurallar",
      p: [
        "Bir sayı birbirleriyle aralarında asal olan iki sayıya ayrı ayrı bölünüyorsa onların çarpımına da bölünür. 6 = 2 × 3 olduğundan 6 ile bölünebilmek için sayının hem çift olması hem de basamak toplamının 3'ün katı olması gerekir. Önemli nokta, çarpanların ortak böleni olmamasıdır: 4 ve 6'ya bölünen 12 her zaman 24'e bölünmez, çünkü 4 ile 6 aralarında asal değildir."
      ],
      table: {
        head: ["Bölen", "Koşul", "Örnek", "Sonuç"],
        rows: [
          ["6", "2 ve 3 ile bölünmeli", "4.326: çift, toplam 15", "4.326 ÷ 6 = 721"],
          ["12", "3 ve 4 ile bölünmeli", "2.484: son iki 84, toplam 18", "2.484 ÷ 12 = 207"],
          ["15", "3 ve 5 ile bölünmeli", "1.365: son 5, toplam 15", "1.365 ÷ 15 = 91"],
          ["18", "2 ve 9 ile bölünmeli", "3.258: çift, toplam 18", "3.258 ÷ 18 = 181"],
          ["36", "4 ve 9 ile bölünmeli", "5.436: son iki 36, toplam 18", "5.436 ÷ 36 = 151"],
          ["45", "5 ve 9 ile bölünmeli", "6.345: son 5, toplam 18", "6.345 ÷ 45 = 141"]
        ],
        caption: "Her satırdaki iki koşul aralarında asal bölenlere aittir; bu yüzden birlikte sağlanmaları çarpıma bölünebilmeyi garanti eder."
      }
    },
    {
      h: "11 ile bölünebilme kuralı nasıl uygulanır?",
      p: [
        "10 sayısı 11'e bölündüğünde −1 kalanını verir; bu yüzden 100 → +1, 1.000 → −1 diye işaret değişerek devam eder. Uygulamada birler basamağından başlayarak basamaklara sırayla +, −, +, − işareti verilir ve toplanır. Sonuç 0 ya da 11'in bir katıysa (negatif katlar dahil) sayı 11 ile bölünür."
      ],
      ol: [
        "<strong>Örnek 1:</strong> 9.163 → sağdan: +3 − 6 + 1 − 9 = −11. −11, 11'in katıdır; 9.163 ÷ 11 = 833.",
        "<strong>Örnek 2:</strong> 2.156 → +6 − 5 + 1 − 2 = 0. Sayı 11'e bölünür; 2.156 ÷ 11 = 196.",
        "<strong>Kalan bulma:</strong> 9.170 → +0 − 7 + 1 − 9 = −15. −15'in 11'e göre kalanını bulmak için 11'in katını ekleyin: −15 + 22 = 7. Kalan 7'dir (9.170 = 11 × 833 + 7).",
        "<strong>Dikkat:</strong> İşaretlere soldan başlarsanız basamak sayısı çift olan sayılarda sonucun yalnızca işareti değişir; bölünebilme kararı değişmez ama kalan yanlış çıkar. Kalan soruluyorsa sağdan başlayın."
      ]
    },
    {
      h: "7 ile bölünebilmenin kuralı var mı?",
      p: [
        "7 için 3 ya da 9 kadar kısa bir kural yoktur ama iki pratik yöntem işinizi görür. Birincisi <strong>son basamağı ikiyle çarpıp çıkarma</strong> yöntemidir: sayının son basamağı silinir, bu basamağın 2 katı kalan sayıdan çıkarılır. Sonuç 7'nin katıysa (0 dahil) asıl sayı da 7'ye bölünür. Sonuç hâlâ büyükse işlem tekrarlanır.",
        "İkinci yöntem <strong>1-3-2 yöntemidir</strong>: birler basamağından başlayarak basamaklar sırayla 1, 3, 2, −1, −3, −2 ile çarpılır ve toplanır. Toplam 7'nin katıysa sayı 7'ye bölünür ve toplamın 7'ye bölümünden kalan, sayının kalanını da verir."
      ],
      formula: "Yöntem 1: 2.156 → 215 − 2 × 6 = 203 → 20 − 2 × 3 = 14 → 14 = 7 × 2 (bölünür)\nYöntem 2: 2.156 → 6×1 + 5×3 + 1×2 + 2×(−1) = 6 + 15 + 2 − 2 = 21 (bölünür)\n2.156 ÷ 7 = 308",
      after: [
        "İlginç bir ayrıntı: 1.001 = 7 × 11 × 13'tür. Bu yüzden abcabc biçimindeki her altı basamaklı sayı (ör. 345.345) 7, 11 ve 13'e aynı anda bölünür. 7 kuralının ikinci yöntemi uzun sayılarda daha hızlıdır ama ezberlemek isterseniz birinci yöntem daha akılda kalıcıdır."
      ]
    },
    {
      h: "Kalan nasıl bulunur? Mod alma",
      p: [
        "Bölünebilme kuralları yalnızca \"bölünür mü?\" sorusuna değil, \"kalan kaç?\" sorusuna da cevap verir. Matematikte bu işleme <strong>mod alma</strong> denir: 4.727 mod 9 = 2 yazımı, 4.727'nin 9'a bölümünden kalanın 2 olduğunu gösterir. Kalan her zaman 0 ile bölenin bir eksiği arasındadır."
      ],
      table: {
        head: ["Bölen", "Kalanı neye bakarak bulursunuz?", "Örnek: 4.727"],
        rows: [
          ["2", "Son basamağın 2'ye bölümü", "7 → kalan 1"],
          ["3", "Basamak toplamının 3'e bölümü", "20 → kalan 2"],
          ["4", "Son iki basamağın 4'e bölümü", "27 → kalan 3"],
          ["5", "Son basamağın 5'e bölümü", "7 → kalan 2"],
          ["8", "Son üç basamağın 8'e bölümü", "727 → kalan 7"],
          ["9", "Basamak toplamının 9'a bölümü", "20 → kalan 2"],
          ["10", "Son basamak", "kalan 7"],
          ["11", "Sağdan işaretli toplam", "7 − 2 + 7 − 4 = 8 → kalan 8"]
        ]
      },
      after: [
        "Kalan hesabı saat ve takvim sorularında da kullanılır: bugün pazartesi ise 100 gün sonrası, 100 mod 7 = 2 olduğu için çarşambadır. Büyük sayılarda kalanı doğrudan görmek için [[arac:mod-alma-hesapla|Mod Alma Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Bir sayının tüm bölenleri nasıl bulunur?",
      p: [
        "Bölenleri tek tek denemek yerine sayıyı önce asal çarpanlarına ayırın. Asal çarpanların kuvvetlerine birer ekleyip çarparsanız pozitif bölen sayısını bulursunuz; bölenlerin kendisi de bu asal çarpanların olası bütün çarpımlarıdır."
      ],
      formula: "72 = 2³ × 3²\nPozitif bölen sayısı = (3 + 1) × (2 + 1) = 12\nBölenler: 1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72",
      ol: [
        "Bölünebilme kurallarıyla en küçük asal bölenden başlayın: 72 çift → 2'ye bölün: 36, 18, 9.",
        "9'un basamak toplamı 9 → 3'e bölün: 3, 1. Asal çarpanlar 2, 2, 2, 3, 3 bulunur.",
        "Kuvvetleri yazın: 2³ × 3². Bölen sayısı için kuvvetlere 1 ekleyip çarpın: 4 × 3 = 12.",
        "Bölenleri çiftler hâlinde yazın: 1 × 72, 2 × 36, 3 × 24, 4 × 18, 6 × 12, 8 × 9. Karekökü geçince durabilirsiniz."
      ],
      after: [
        "Asal çarpanları otomatik bulmak için [[arac:asal-carpan-hesapla|Asal Çarpan Hesaplama]], bütün bölenleri listelemek için [[arac:bolen-hesapla|Bölen Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>3 ile 9'u karıştırmak:</strong> Basamak toplamı 3'ün katı olan her sayı 9'a bölünmez; 21 toplamlı 123.456 bunun örneğidir.",
        "<strong>4 için yalnızca son basamağa bakmak:</strong> 14'ün son basamağı çifttir ama 14, 4'e bölünmez; son iki basamağa bakın.",
        "<strong>Ortak çarpanlı bölenleri birleştirmek:</strong> 4 ve 6'ya bölünen sayı 24'e değil, EKOK'ları olan 12'ye bölünür.",
        "<strong>11 kuralında işaretleri kaydırmak:</strong> Kalan istendiğinde işaretlere birler basamağından başlayın.",
        "<strong>Negatif sonucu yanlış yorumlamak:</strong> 11 ve 7 kurallarında çıkan negatif sonuç, 7'nin ya da 11'in katıysa sayı yine bölünür."
      ]
    }
  ],
  faq: [
    ["Bölünebilme kuralları nelerdir?", "En sık kullanılanlar şunlardır: 2 için son basamak çift, 5 için 0 ya da 5, 10 için 0 olmalı; 3 ve 9 için basamak toplamına, 4 için son iki, 8 için son üç basamağa bakılır; 11 için sağdan işaretli toplam alınır."],
    ["3 ve 9 ile bölünebilme kuralı nedir?", "Sayının basamakları toplanır. Toplam 3'ün katıysa sayı 3'e, 9'un katıysa 9'a bölünür. Örneğin 4.725'in basamak toplamı 18 olduğu için sayı hem 3'e hem 9'a kalansız bölünür."],
    ["4 ve 8 ile bölünebilme nasıl anlaşılır?", "4 için son iki basamağın oluşturduğu sayıya, 8 için son üç basamağın oluşturduğu sayıya bakılır. 1.236'nın son iki basamağı 36 olduğu için 4'e, 5.128'in son üç basamağı 128 olduğu için 8'e bölünür."],
    ["11 ile bölünebilme kuralı nasıl uygulanır?", "Birler basamağından başlayarak basamaklar sırayla artı ve eksi işaretle toplanır. Sonuç 0 ya da 11'in katıysa sayı 11'e bölünür; 9.163 için 3 − 6 + 1 − 9 = −11 bulunduğundan sayı bölünür."],
    ["6 ile bölünebilmek için ne gerekir?", "Sayının hem 2 hem 3 ile bölünmesi gerekir, yani son basamağı çift ve basamak toplamı 3'ün katı olmalıdır. 4.326 çifttir ve basamak toplamı 15'tir, bu yüzden 6'ya bölünür ve sonuç 721'dir."],
    ["7 ile bölünebilmenin kuralı var mı?", "Pratik bir kural vardır: son basamağın iki katı kalan sayıdan çıkarılır ve sonuç 7'nin katıysa sayı 7'ye bölünür. 2.156 için 215 − 12 = 203, sonra 20 − 6 = 14 bulunur ve 14 yedinin katıdır."],
    ["Basamak toplamı ne işe yarar?", "Basamak toplamı, sayının 3 ve 9 ile bölümünden kalanı verir, çünkü 10'un her kuvveti 9'a bölündüğünde 1 kalır. Bu sayede büyük sayıların 3 ya da 9 ile bölünüp bölünmediğini ve kalanını hızla bulabilirsiniz."],
    ["Kalan nasıl bulunur?", "Her bölen için kuralın baktığı kısım aynı kalanı verir: 9 için basamak toplamının 9'a, 4 için son iki basamağın 4'e, 10 için son basamağın kendisi kalandır. 4.727'nin 9'a bölümünden kalan basamak toplamı 20'den 2 bulunur."],
    ["Bir sayının tüm bölenleri nasıl bulunur?", "Sayı önce asal çarpanlarına ayrılır. Kuvvetlere birer eklenip çarpılarak bölen sayısı bulunur; 72 = 2³ × 3² için 4 × 3 = 12 bölen vardır. Bölenler, çarpımı sayıyı veren çiftler hâlinde yazılarak listelenir."]
  ],
  tools: ["basamak-toplami-hesapla", "bolen-hesapla", "mod-alma-hesapla", "asal-carpan-hesapla"],
  related: ["asal-sayilar-nedir", "ebob-ekok-nasil-bulunur", "kesirlerle-islemler"],
  sources: [
    ["MEB – Öğretim programları (matematik)", "https://tymm.meb.gov.tr/"]
  ]
};
