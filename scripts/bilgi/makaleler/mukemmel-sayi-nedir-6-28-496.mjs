export default {
  slug: "mukemmel-sayi-nedir-6-28-496",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Mükemmel Sayı Nedir? 6, 28, 496 ve Bölenler Toplamıyla Bulma",
  pageTitle: "Mükemmel Sayı Nedir? 6, 28, 496 ve Has Bölenler Toplamı",
  description: "Mükemmel sayı, kendisi hariç pozitif bölenlerinin toplamına eşit olan sayıdır: 6 = 1+2+3. 28, 496, 8128, eksik ve artık sayı, Mersenne asalı ve dost sayılar.",
  keywords: ["mükemmel sayı nedir", "mükemmel sayılar", "6 neden mükemmel sayı", "has bölenler toplamı", "eksik ve artık sayı", "mersenne asalı", "dost sayılar", "28 mükemmel sayı mı"],
  lead: "Mükemmel sayı, kendisi dışındaki pozitif bölenlerinin (has bölenlerinin) toplamı kendisine eşit olan doğal sayıdır. En küçüğü 6'dır, çünkü 6'nın has bölenleri 1, 2 ve 3'tür ve 1 + 2 + 3 = 6 eder. Sonraki mükemmel sayılar 28, 496 ve 8128'dir. Bu sayfada has bölenlerin nasıl bulunduğunu, eksik ve artık (bol) sayı kavramlarını, mükemmel sayıların Mersenne asallarıyla ilişkisini, tek mükemmel sayı sorusunu ve dost sayıları çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Has bölenler toplamı sayıya eşitse mükemmel, küçükse eksik, büyükse artık (bol) sayıdır.",
    "İlk dört mükemmel sayı 6, 28, 496 ve 8128'dir; beşincisi 33.550.336'dır.",
    "Çift mükemmel sayıların hepsi 2<sup>p−1</sup> × (2<sup>p</sup> − 1) biçimindedir; burada 2<sup>p</sup> − 1 asal olmalıdır.",
    "2<sup>p</sup> − 1 biçimindeki asallara Mersenne asalı denir; bilinen her Mersenne asalı bir mükemmel sayı verir.",
    "Tek mükemmel sayı olup olmadığı bugün hâlâ çözülmemiş bir matematik problemidir.",
    "Dost sayılar, birinin has bölenleri toplamı diğerine eşit olan sayı çiftleridir: 220 ve 284."
  ],
  figure: {
    alt: "28 sayısının bölen çiftleri: 1 ve 28, 2 ve 14, 4 ve 7. Has bölenler 1, 2, 4, 7, 14 toplanınca 28 eder. Altta eksik, mükemmel ve artık sayı örnekleri: 8, 28 ve 12.",
    caption: "Has bölenleri bulmanın kısa yolu bölen çiftlerini karekök sınırına kadar aramaktır. 28 için 5'e kadar bakmak yeter, çünkü 5 × 5 = 25 < 28 < 36 = 6 × 6.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">28 neden mükemmel sayı?</text>
  <text x="20" y="66" class="b">Bölen çiftleri (√28 ≈ 5,3'e kadar)</text>
  <g class="mid">
    <rect x="20" y="80" width="200" height="56" rx="8" class="sf sb"/><text x="120" y="114" class="lg b">1 × 28</text>
    <rect x="260" y="80" width="200" height="56" rx="8" class="sf sb"/><text x="360" y="114" class="lg b">2 × 14</text>
    <rect x="500" y="80" width="200" height="56" rx="8" class="sf sb"/><text x="600" y="114" class="lg b">4 × 7</text>
  </g>
  <text x="20" y="170" class="b">Has bölenler (28 hariç)</text>
  <g class="mid">
    <circle cx="80" cy="214" r="28" class="ps"/><text x="80" y="221" class="lg b">1</text>
    <text x="130" y="221" class="lg b">+</text>
    <circle cx="180" cy="214" r="28" class="ps"/><text x="180" y="221" class="lg b">2</text>
    <text x="230" y="221" class="lg b">+</text>
    <circle cx="280" cy="214" r="28" class="ps"/><text x="280" y="221" class="lg b">4</text>
    <text x="330" y="221" class="lg b">+</text>
    <circle cx="380" cy="214" r="28" class="ps"/><text x="380" y="221" class="lg b">7</text>
    <text x="430" y="221" class="lg b">+</text>
    <circle cx="480" cy="214" r="28" class="ps"/><text x="480" y="221" class="lg b">14</text>
    <text x="530" y="221" class="lg b">=</text>
    <rect x="560" y="186" width="140" height="56" rx="8" class="p"/><text x="630" y="223" class="xl sf">28</text>
  </g>
  <g class="mid">
    <rect x="20" y="276" width="214" height="108" rx="8" class="dgs"/>
    <text x="127" y="302" class="b">Eksik: 8</text>
    <text x="127" y="330" class="sm">1 + 2 + 4 = 7</text>
    <text x="127" y="356" class="sm b dg">7 &lt; 8</text>
    <rect x="253" y="276" width="214" height="108" rx="8" class="p"/>
    <text x="360" y="302" class="b sf">Mükemmel: 28</text>
    <text x="360" y="330" class="sm sf">1+2+4+7+14 = 28</text>
    <text x="360" y="356" class="sm b sf">28 = 28</text>
    <rect x="486" y="276" width="214" height="108" rx="8" class="oks"/>
    <text x="593" y="302" class="b">Artık (bol): 12</text>
    <text x="593" y="330" class="sm">1+2+3+4+6 = 16</text>
    <text x="593" y="356" class="sm b ok">16 &gt; 12</text>
  </g>
</svg>`
  },
  sections: [
    {
      h: "Mükemmel sayı nedir?",
      p: [
        "Bir doğal sayının <strong>bölenleri</strong>, onu kalansız bölen pozitif tam sayılardır. Sayının kendisi hariç tutulduğunda kalan bölenlere <strong>has bölen</strong> (öz bölen) denir. Örneğin 12'nin bölenleri 1, 2, 3, 4, 6 ve 12'dir; has bölenleri ise 1, 2, 3, 4 ve 6'dır. Mükemmel sayı, has bölenlerinin toplamı kendisine tam olarak eşit olan sayıdır.",
        "Kavram antik Yunan matematiğine kadar uzanır ve Öklid'in Elemanlar adlı eserinde mükemmel sayı üretmenin bir yolu anlatılır. Sayıların \"mükemmel\" diye adlandırılması, eski çağlarda bu eşitliğe yüklenen anlamdan gelir; matematiksel olarak bir üstünlük ifade etmez, yalnızca bölenler toplamıyla ilgili özel bir durumu adlandırır."
      ],
      formula: "Has bölenler toplamı s(n) = (n'nin tüm bölenlerinin toplamı) − n\ns(n) = n → mükemmel · s(n) < n → eksik · s(n) > n → artık (bol)"
    },
    {
      h: "6 ve 28 neden mükemmel sayıdır?",
      p: [
        "6'nın bölenleri 1, 2, 3 ve 6'dır. 6'yı çıkardığımızda kalan has bölenler 1, 2 ve 3'tür ve toplamları 1 + 2 + 3 = 6 eder. Toplam sayının kendisine eşit olduğu için 6 mükemmel sayıdır. 6'dan küçük hiçbir doğal sayı bu özelliği taşımaz; bu yüzden 6 en küçük mükemmel sayıdır.",
        "28'in bölenleri 1, 2, 4, 7, 14 ve 28'dir. Has bölenlerin toplamı 1 + 2 + 4 + 7 + 14 = 28'dir; yani 28 de mükemmeldir. Üçüncü mükemmel sayı olan 496'nın has bölenleri 1, 2, 4, 8, 16, 31, 62, 124 ve 248'dir. Bunları topladığınızda 1 + 2 + 4 + 8 + 16 = 31, 31 + 62 + 124 + 248 = 465 ve 31 + 465 = 496 sonucunu bulursunuz."
      ],
      table: {
        head: ["Sıra", "Mükemmel sayı", "Has bölenler", "Basamak sayısı"],
        rows: [
          ["1", "6", "1, 2, 3", "1"],
          ["2", "28", "1, 2, 4, 7, 14", "2"],
          ["3", "496", "1, 2, 4, 8, 16, 31, 62, 124, 248", "3"],
          ["4", "8.128", "1, 2, 4, …, 127, 254, …, 4.064 (13 has bölen)", "4"],
          ["5", "33.550.336", "25 has bölen", "8"]
        ],
        caption: "Dördüncü mükemmel sayıdan beşincisine geçerken basamak sayısının 4'ten 8'e sıçradığına dikkat edin; mükemmel sayılar çok hızlı seyrekleşir."
      }
    },
    {
      h: "Has bölenler nasıl bulunur?",
      p: [
        "Has bölenleri bulmanın en pratik yolu, bölenleri çiftler halinde aramaktır. Bir sayı a'ya bölünüyorsa n ÷ a da bir bölendir; bu iki bölen bir çift oluşturur. Çiftlerden biri her zaman sayının kareköküne eşit ya da ondan küçüktür. Bu yüzden 1'den √n'ye kadar olan sayıları denemek, bütün bölenleri bulmak için yeterlidir."
      ],
      ol: [
        "Sayının karekökünü bulun: √28 ≈ 5,29. 1'den 5'e kadar deneyeceksiniz.",
        "Her sayıyla bölmeyi deneyin: 28 ÷ 1 = 28, 28 ÷ 2 = 14, 28 ÷ 3 kalanlı, 28 ÷ 4 = 7, 28 ÷ 5 kalanlı.",
        "Bulduğunuz çiftleri yazın: (1, 28), (2, 14), (4, 7).",
        "Sayının kendisini (28) çıkarın; kalan has bölenler 1, 2, 4, 7, 14'tür.",
        "Toplayın ve sayıyla karşılaştırın: 1 + 2 + 4 + 7 + 14 = 28. Sayı mükemmeldir."
      ],
      after: [
        "Büyük sayılarda asal çarpanlara ayırma daha hızlıdır. 496 = 2<sup>4</sup> × 31 olduğu için tüm bölenlerin toplamı (1 + 2 + 4 + 8 + 16) × (1 + 31) = 31 × 32 = 992 bulunur; has bölenler toplamı 992 − 496 = 496'dır. Asal çarpanlara ayırma için [[arac:asal-carpan-hesapla|Asal Çarpan Hesaplama]], bütün bölenleri listelemek için [[arac:bolen-hesapla|Bölen Hesaplama]] aracını kullanabilirsiniz. Bölünebilme kurallarını hatırlamak isterseniz [[bilgi:bolunebilme-kurallari|bölünebilme kuralları]] yazısı yardımcı olur."
      ]
    },
    {
      h: "Eksik sayı ve artık (bol) sayı nedir?",
      p: [
        "Doğal sayıların büyük çoğunluğu mükemmel değildir. Has bölenler toplamı sayıdan küçükse sayıya <strong>eksik sayı</strong>, büyükse <strong>artık</strong> ya da <strong>bol sayı</strong> denir. Bütün asal sayılar eksiktir, çünkü tek has bölenleri 1'dir. 2'nin bütün kuvvetleri de eksiktir: 8'in has bölenleri 1, 2 ve 4'tür ve toplamları 7'dir, yani 8'den bir eksiktir."
      ],
      table: {
        head: ["Sayı", "Has bölenler", "Toplam", "Tür"],
        rows: [
          ["8", "1, 2, 4", "7", "Eksik"],
          ["9", "1, 3", "4", "Eksik"],
          ["12", "1, 2, 3, 4, 6", "16", "Artık (bol)"],
          ["18", "1, 2, 3, 6, 9", "21", "Artık (bol)"],
          ["20", "1, 2, 4, 5, 10", "22", "Artık (bol)"],
          ["28", "1, 2, 4, 7, 14", "28", "Mükemmel"],
          ["945", "1, 3, 5, 7, 9, …, 315", "975", "Artık; en küçük tek artık sayı"]
        ]
      },
      after: [
        "12 en küçük artık sayıdır. Artık sayıların çoğu çifttir; en küçük tek artık sayı 945'tir. Bir sayının türünü elle hesaplamadan görmek için [[arac:mukemmel-sayi-kontrol|Mükemmel Sayı Kontrol]] aracı has bölenleri, toplamı ve sayının eksik, mükemmel ya da artık olduğunu adım adım gösterir."
      ]
    },
    {
      h: "Mükemmel sayılar Mersenne asallarıyla nasıl ilişkilidir?",
      p: [
        "Öklid, 2<sup>p</sup> − 1 biçimindeki bir sayı asalsa, 2<sup>p−1</sup> × (2<sup>p</sup> − 1) sayısının mükemmel olduğunu gösterdi. Yaklaşık iki bin yıl sonra Euler bunun tersini kanıtladı: her çift mükemmel sayı bu biçimdedir. Bu yüzden kurala Öklid–Euler teoremi denir. 2<sup>p</sup> − 1 biçimindeki asal sayılara, bu sayıları inceleyen 17. yüzyıl matematikçisinin adıyla <strong>Mersenne asalı</strong> denir."
      ],
      formula: "Çift mükemmel sayı = 2^(p−1) × (2^p − 1),  2^p − 1 asal olmalı\np = 2 → 2 × 3 = 6\np = 3 → 4 × 7 = 28\np = 5 → 16 × 31 = 496\np = 7 → 64 × 127 = 8.128\np = 11 → 2^11 − 1 = 2.047 = 23 × 89 asal değil → mükemmel sayı çıkmaz\np = 13 → 4.096 × 8.191 = 33.550.336",
      after: [
        "2<sup>p</sup> − 1'in asal olması için p'nin de asal olması gerekir, ama bu yeterli değildir: p = 11 asal olduğu halde 2.047 = 23 × 89 asal değildir. Kurala uyan sayının neden mükemmel olduğunu görmek için bölenleri iki gruba ayırabilirsiniz: 1, 2, 4, …, 2<sup>p−1</sup> toplamı geometrik dizi formülüyle 2<sup>p</sup> − 1 eder; aynı kuvvetlerin (2<sup>p</sup> − 1) katları da toplandığında has bölenler toplamı tam olarak sayının kendisine eşit çıkar. Geometrik dizi toplamını [[bilgi:aritmetik-ve-geometrik-dizi-formulleri|aritmetik ve geometrik dizi formülleri]] yazısında, asal sayıların özelliklerini [[bilgi:asal-sayilar-nedir|asal sayılar nedir]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Bilinen kaç mükemmel sayı var?",
      p: [
        "Her yeni Mersenne asalı yeni bir mükemmel sayı demektir. Bu nedenle bilinen mükemmel sayıların sayısı, bilinen Mersenne asallarının sayısına eşittir. Ekim 2024'te bulunan ve 41 milyondan fazla basamağı olan 2<sup>136.279.841</sup> − 1 sayısıyla bilinen Mersenne asalı sayısı 52'ye ulaştı; dolayısıyla bilinen mükemmel sayı da 52'dir. Bu en büyük mükemmel sayı 80 milyondan fazla basamak içerir.",
        "Yeni Mersenne asalları, dünyanın dört bir yanındaki gönüllülerin bilgisayarlarını birleştiren dağıtık hesaplama projeleriyle aranır. Mersenne asallarının sonsuz sayıda olup olmadığı bilinmediği için mükemmel sayıların da sonsuz olup olmadığı bilinmemektedir."
      ],
      ul: [
        "Bilinen her çift mükemmel sayı 6 ya da 8 ile biter: 6, 28, 496, 8128, 33550336…",
        "6 dışındaki her çift mükemmel sayı, ardışık tek sayıların küplerinin toplamıdır: 28 = 1<sup>3</sup> + 3<sup>3</sup>.",
        "Mükemmel bir sayının tüm bölenlerinin terslerinin toplamı 2'dir: 1/1 + 1/2 + 1/3 + 1/6 = 2.",
        "Her çift mükemmel sayı aynı zamanda bir üçgensel sayıdır: 28 = 1 + 2 + 3 + 4 + 5 + 6 + 7."
      ]
    },
    {
      h: "Tek mükemmel sayı var mı?",
      p: [
        "Bu, matematiğin en eski çözülmemiş sorularından biridir. Bugüne kadar bulunan bütün mükemmel sayılar çifttir ve hiçbir tek mükemmel sayı bilinmemektedir. Ama tek mükemmel sayının olmadığı da kanıtlanmamıştır. Matematikçiler, eğer böyle bir sayı varsa sağlaması gereken pek çok koşul bulmuştur: çok büyük olmalı, çok sayıda farklı asal çarpana sahip olmalı ve belirli bölünebilme kurallarına uymalıdır.",
        "Bilgisayar destekli kanıtlarla 10<sup>1500</sup>'den küçük tek mükemmel sayı olmadığı gösterilmiştir. Bu sınır çok büyük olsa da sonsuza göre küçüktür; bu yüzden soru açık kalmaya devam ediyor. Okul düzeyinde bilinmesi gereken sonuç şudur: tek mükemmel sayı bilinmiyor, olup olmadığı da henüz bilinmiyor."
      ]
    },
    {
      h: "Dost sayılar (220–284) nedir?",
      p: [
        "Mükemmel sayı kavramının yakın akrabası dost sayılardır. İki sayıdan birinin has bölenleri toplamı diğerine, diğerinin has bölenleri toplamı da birincisine eşitse bu iki sayıya <strong>dost sayılar</strong> denir. En küçük dost sayı çifti 220 ve 284'tür ve antik çağlardan beri bilinir."
      ],
      ol: [
        "220'nin has bölenleri: 1, 2, 4, 5, 10, 11, 20, 22, 44, 55, 110. Toplamı 284'tür.",
        "284'ün has bölenleri: 1, 2, 4, 71, 142. Toplamı 220'dir.",
        "Her biri diğerini \"ürettiği\" için 220 ve 284 dost sayıdır.",
        "Mükemmel sayılar kendi kendisinin dostu gibi düşünülebilir: 6'nın has bölenleri toplamı yine 6'dır."
      ],
      after: [
        "Sonraki dost sayı çiftleri arasında 1.184 ile 1.210 ve 2.620 ile 2.924 bulunur. Bölenler toplamı konusu, okulda [[bilgi:ebob-ekok-nasil-bulunur|EBOB ve EKOK]] konularıyla birlikte işlenen bölen ve kat kavramlarının doğal bir uzantısıdır ve matematik olimpiyatı hazırlıklarında sık karşılaşılan bir sorudur."
      ]
    }
  ],
  faq: [
    ["Mükemmel sayı nedir?", "Mükemmel sayı, kendisi dışındaki pozitif bölenlerinin toplamı kendisine eşit olan doğal sayıdır. En küçük mükemmel sayı 6'dır; ardından 28, 496 ve 8128 gelir."],
    ["6 ve 28 neden mükemmel sayıdır?", "6'nın has bölenleri 1, 2 ve 3'tür ve toplamları 6 eder. 28'in has bölenleri 1, 2, 4, 7 ve 14'tür ve toplamları 28 eder. Her iki sayıda da has bölenler toplamı sayının kendisine eşittir."],
    ["Has bölenler nasıl bulunur?", "1'den sayının kareköküne kadar olan sayılarla bölmeyi deneyin ve kalansız bölen her sayıyı eşiyle birlikte yazın. Bulduğunuz bölenlerden sayının kendisini çıkarırsanız has bölenler kalır."],
    ["Eksik sayı ve artık (bol) sayı nedir?", "Has bölenler toplamı sayıdan küçükse eksik, büyükse artık ya da bol sayı denir. 8 eksiktir çünkü 1 + 2 + 4 = 7; 12 artıktır çünkü 1 + 2 + 3 + 4 + 6 = 16 eder."],
    ["Mükemmel sayılar Mersenne asallarıyla nasıl ilişkilidir?", "2 üzeri p eksi 1 asal olduğunda, 2 üzeri p eksi 1 çarpı bu asal sayı mükemmeldir ve her çift mükemmel sayı bu biçimdedir. Bu yüzden her Mersenne asalı tam olarak bir çift mükemmel sayıya karşılık gelir."],
    ["Tek mükemmel sayı var mı?", "Bugüne kadar hiçbir tek mükemmel sayı bulunamadı, ama olmadığı da kanıtlanamadı. Varsa 10 üzeri 1500'den büyük olması gerektiği gösterildi; soru matematiğin çözülmemiş problemleri arasındadır."],
    ["Dost sayılar (220–284) nedir?", "Birinin has bölenleri toplamı diğerine eşit olan sayı çiftleridir. 220'nin has bölenleri toplamı 284, 284'ün has bölenleri toplamı ise 220'dir; bu en küçük dost sayı çiftidir."],
    ["Bilinen kaç mükemmel sayı var?", "Bilinen mükemmel sayı sayısı bilinen Mersenne asalı sayısına eşittir. Ekim 2024'te bulunan Mersenne asalıyla bu sayı 52'ye ulaştı; yeni asallar bulundukça liste uzayabilir."],
    ["1 mükemmel sayı mıdır?", "Değildir. 1'in kendisi dışında pozitif böleni yoktur, bu yüzden has bölenler toplamı 0'dır ve 1'den küçüktür. Tanıma göre 1 eksik sayı kabul edilir; en küçük mükemmel sayı 6'dır."]
  ],
  tools: ["mukemmel-sayi-kontrol", "bolen-hesapla", "asal-carpan-hesapla", "asal-sayi-sorgula"],
  related: ["asal-sayilar-nedir", "bolunebilme-kurallari", "ebob-ekok-nasil-bulunur", "aritmetik-ve-geometrik-dizi-formulleri"]
};
