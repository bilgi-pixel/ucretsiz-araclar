export default {
  slug: "hiz-yol-zaman-formulu",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Hız, Yol ve Zaman Formülü: Ortalama Hız ve İvmeli Hareket Problemleri",
  pageTitle: "Hız Yol Zaman Formülü: x = v·t, Ortalama Hız ve İvme",
  description: "Yol = hız × zaman (x = v·t). Ortalama hız toplam yolun toplam süreye bölümüdür. km/sa-m/s çevirme, ivmeli hareket formülleri, karşılaşma ve yetişme problemleri.",
  keywords: ["hız formülü", "hız yol zaman", "ortalama hız nasıl hesaplanır", "sürat ve hız farkı", "ivmeli hareket formülleri", "km/s m/s çevirme", "karşılaşma problemleri", "hareket problemleri"],
  lead: "Sabit hızlı harekette <strong>yol = hız × zaman</strong> (x = v · t) formülü geçerlidir; buradan hız = yol ÷ zaman ve zaman = yol ÷ hız da elde edilir. Örneğin 90 km/sa hızla 2,5 saat giden araç 225 km yol alır. Hız değişiyorsa ortalama hız, hızların ortalaması değil, <strong>toplam yolun toplam süreye bölümüdür</strong>. Bu sayfada km/sa ile m/s dönüşümünü, sürat ile hızın farkını, düzgün hızlanan hareketin üç formülünü ve TYT'de sık çıkan karşılaşma ile yetişme problemlerini çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "x = v · t; v = x ÷ t; t = x ÷ v. Birimler uyumlu olmalıdır (km–saat ya da metre–saniye).",
    "Ortalama hız = toplam yer değiştirme ÷ toplam süre; ortalama sürat = toplam yol ÷ toplam süre.",
    "km/sa → m/s için 3,6'ya bölün; m/s → km/sa için 3,6 ile çarpın (72 km/sa = 20 m/s).",
    "Düzgün hızlanan hareket: v = v<sub>0</sub> + a·t, x = v<sub>0</sub>·t + ½·a·t², v² = v<sub>0</sub>² + 2·a·x.",
    "Karşılaşma süresi = aradaki mesafe ÷ (hızların toplamı); yetişme süresi = aradaki mesafe ÷ (hızların farkı).",
    "Hız-zaman grafiğinin altındaki alan alınan yolu verir."
  ],
  figure: {
    alt: "Solda hız-yol-zaman üçgeni: üstte yol x, altta hız v ve zaman t. Sağda hız-zaman grafiği: 0'dan 2 m/s² ivmeyle 5 saniyede 10 m/s hıza çıkan cisim; grafiğin altındaki üçgen alan 25 metre yolu gösteriyor.",
    caption: "Üçgende bulmak istediğiniz büyüklüğü kapatın: kalanlar yan yanaysa çarpılır (x = v·t), alt alta ise bölünür (v = x ÷ t). Sağdaki grafikte ivmeli hareketin yolu, hız çizgisinin altındaki alandır: ½ · 5 · 10 = 25 m.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Hız, yol ve zaman ilişkisi</text>
  <polygon points="150,60 40,280 260,280" class="ps sp"/>
  <line x1="75" y1="190" x2="225" y2="190" class="sp sw" fill="none"/>
  <line x1="150" y1="190" x2="150" y2="280" class="sp sw" fill="none"/>
  <text x="150" y="160" class="xl mid">x</text>
  <text x="105" y="250" class="xl mid">v</text>
  <text x="195" y="250" class="xl mid">t</text>
  <text x="150" y="314" class="b mid">x = v · t</text>
  <text x="150" y="338" class="sm mid">v = x ÷ t · t = x ÷ v</text>
  <text x="150" y="366" class="sm mid t2">90 km/sa × 2,5 sa = 225 km</text>
  <line x1="360" y1="280" x2="690" y2="280" class="st" fill="none"/>
  <line x1="360" y1="60" x2="360" y2="280" class="st" fill="none"/>
  <text x="352" y="84" class="sm end mu">10</text>
  <text x="352" y="184" class="sm end mu">5</text>
  <text x="352" y="284" class="sm end mu">0</text>
  <text x="372" y="66" class="sm">hız (m/s)</text>
  <g class="sm mid mu"><text x="420" y="298">1</text><text x="480" y="298">2</text><text x="540" y="298">3</text><text x="600" y="298">4</text><text x="660" y="298">5</text></g>
  <text x="690" y="318" class="sm end">zaman (s)</text>
  <polygon points="360,280 660,80 660,280" class="oks"/>
  <line x1="360" y1="280" x2="660" y2="80" class="sok sw" fill="none"/>
  <line x1="360" y1="80" x2="660" y2="80" class="sb dash" fill="none"/>
  <text x="590" y="250" class="b mid">Alan = yol</text>
  <text x="590" y="272" class="sm mid">½ · 5 · 10 = 25 m</text>
  <text x="470" y="150" class="sm mid ok b">a = 2 m/s²</text>
  <rect x="360" y="336" width="330" height="56" rx="10" class="p"/>
  <text x="525" y="360" class="mid b sf">v = 0 + 2 · 5 = 10 m/s</text>
  <text x="525" y="382" class="sm mid sf">x = ½ · 2 · 5² = 25 m</text>
</svg>`
  },
  sections: [
    {
      h: "Hız formülü nedir?",
      p: [
        "Hız, bir cismin birim zamanda ne kadar yer değiştirdiğini gösteren büyüklüktür. Sabit hızla hareket eden bir cisim için hız, alınan yolun bu yolu almak için geçen süreye bölünmesiyle bulunur. Aynı formül düzenlenerek yol ve zaman da hesaplanabilir; bu üç formül aslında tek bir ilişkinin üç farklı yazılışıdır."
      ],
      formula: "Yol: x = v · t\nHız: v = x ÷ t\nZaman: t = x ÷ v",
      after: [
        "Hesapta en önemli kural birimlerin uyumlu olmasıdır. Hız km/sa ise yol kilometre, süre saat olmalı; hız m/s ise yol metre, süre saniye olmalıdır. 45 dakikayı formüle 45 diye yazarsanız sonuç 60 kat hatalı çıkar; 45 dakika 0,75 saattir.",
        "Örnekler: 90 km/sa hızla 2,5 saat giden araç 90 × 2,5 = 225 km yol alır. 150 km'lik yolu 2 saatte alan aracın hızı 150 ÷ 2 = 75 km/sa'dır. 360 km'yi 80 km/sa hızla giden araç 360 ÷ 80 = 4,5 saatte, yani 4 saat 30 dakikada varır. Bu hesapları hızlıca yapmak için [[arac:hiz-hesapla|Hız, Yol ve Süre Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "km/sa m/s'ye nasıl çevrilir?",
      p: [
        "1 km 1.000 metre, 1 saat 3.600 saniyedir. Bu yüzden 1 km/sa = 1.000 ÷ 3.600 = 1/3,6 m/s eder. Kural kısaca şöyledir: km/sa'dan m/s'ye geçmek için 3,6'ya bölün, m/s'den km/sa'ya geçmek için 3,6 ile çarpın."
      ],
      table: {
        head: ["km/sa", "m/s", "Günlük karşılık"],
        rows: [
          ["5", "1,39", "Yürüme"],
          ["18", "5", "Rahat bisiklet"],
          ["36", "10", "Şehir içi araç, 100 m koşu rekorcusu yaklaşık"],
          ["50", "13,89", "Yerleşim yeri hız sınırı örneği"],
          ["72", "20", "Hızlı şehir yolu"],
          ["90", "25", "Şehirlerarası yol"],
          ["108", "30", "Otoyol"],
          ["120", "33,33", "Otoyol"]
        ],
        caption: "Fizik sorularında 36, 72 ve 108 km/sa gibi 3,6'nın katı olan hızlar, hesap kolaylığı için sık kullanılır."
      },
      after: [
        "Birim dönüşümünü hızla yapmak için [[arac:ms-kmh-cevir|m/s km/h Çevirici]] aracı mil/sa ve knot karşılıklarını da gösterir."
      ]
    },
    {
      h: "Sürat ile hız farkı nedir?",
      p: [
        "Günlük dilde aynı anlamda kullanılsa da fizikte iki kavram farklıdır. <strong>Sürat</strong> skaler bir büyüklüktür ve yalnızca birim zamanda alınan yolu gösterir; yönü yoktur. <strong>Hız</strong> ise vektörel bir büyüklüktür; birim zamandaki yer değiştirmeyi gösterir ve büyüklüğünün yanında yönü de vardır.",
        "Fark en iyi kapalı yollarda görülür. 400 metrelik bir atletizm pistinde bir turu 50 saniyede koşan sporcunun ortalama sürati 400 ÷ 50 = 8 m/s'dir. Ancak sporcu başladığı noktaya döndüğü için yer değiştirmesi sıfırdır ve ortalama hızı da sıfırdır. Düz bir yolda tek yönde hareket edildiğinde sürat ile hızın büyüklüğü aynıdır."
      ],
      table: {
        head: ["Özellik", "Sürat", "Hız"],
        rows: [
          ["Büyüklük türü", "Skaler", "Vektörel"],
          ["Dayandığı kavram", "Alınan yol", "Yer değiştirme"],
          ["Yön bilgisi", "Yok", "Var"],
          ["Negatif olabilir mi?", "Hayır", "Seçilen yöne göre evet"],
          ["Pist turu örneği (400 m, 50 s)", "8 m/s", "0 m/s"]
        ]
      }
    },
    {
      h: "Ortalama hız nasıl hesaplanır?",
      p: [
        "Bir yolculuk boyunca hız sürekli değişir; trafikte yavaşlar, açık yolda hızlanırsınız. Bu durumda yolculuğun tamamını tek bir hızla özetlemek için ortalama hız kullanılır. Ortalama hız, <strong>toplam yer değiştirmenin toplam süreye bölümüdür</strong>; hızların aritmetik ortalaması değildir."
      ],
      formula: "Ortalama hız = Toplam yer değiştirme ÷ Toplam süre\nOrtalama sürat = Toplam yol ÷ Toplam süre",
      ol: [
        "<strong>Soru:</strong> Bir araç 120 km'lik yolu 60 km/sa hızla gidiyor, aynı yolu 40 km/sa hızla geri dönüyor. Ortalama sürati nedir?",
        "<strong>Gidiş süresi:</strong> 120 ÷ 60 = 2 saat.",
        "<strong>Dönüş süresi:</strong> 120 ÷ 40 = 3 saat.",
        "<strong>Toplam:</strong> 240 km yol, 5 saat süre. Ortalama sürat 240 ÷ 5 = 48 km/sa.",
        "<strong>Tuzak:</strong> Hızların ortalaması (60 + 40) ÷ 2 = 50 km/sa yanlıştır, çünkü araç yavaş hızda daha uzun süre kalmıştır. Gidiş-dönüş başlangıç noktasında bittiği için ortalama hız (vektörel) ise sıfırdır."
      ],
      after: [
        "Eşit yollar farklı hızlarla gidiliyorsa kısa yol formülü vardır: ortalama sürat = 2 · v<sub>1</sub> · v<sub>2</sub> ÷ (v<sub>1</sub> + v<sub>2</sub>) = 2 · 60 · 40 ÷ 100 = 48 km/sa. Eşit süreler farklı hızlarla gidiliyorsa ise hızların aritmetik ortalaması doğru sonucu verir."
      ]
    },
    {
      h: "Düzgün hızlanan hareket formülleri",
      p: [
        "İvme, hızın birim zamandaki değişimidir: a = Δv ÷ Δt. İvmenin sabit olduğu harekete düzgün değişen (düzgün hızlanan ya da düzgün yavaşlayan) hareket denir. Bu hareketi üç temel formül tanımlar; problemde verilen üç büyüklükten bilinmeyeni bulmak için uygun olan seçilir."
      ],
      formula: "v = v<sub>0</sub> + a · t\nx = v<sub>0</sub> · t + ½ · a · t²\nv² = v<sub>0</sub>² + 2 · a · x\nv<sub>0</sub>: ilk hız · v: son hız · a: ivme · t: süre · x: yer değiştirme",
      ol: [
        "<strong>Hızlanma:</strong> Durgun hâlden 2 m/s² ivmeyle hızlanan cisim 5 saniye sonra v = 0 + 2 · 5 = 10 m/s hıza ulaşır ve x = ½ · 2 · 5² = 25 m yol alır. Bu, görseldeki grafiğin altındaki üçgenin alanıdır.",
        "<strong>Frenleme:</strong> 72 km/sa (20 m/s) hızla giden araç 5 m/s² yavaşlamayla fren yapıyor. Durma süresi t = 20 ÷ 5 = 4 s, durma mesafesi x = 20² ÷ (2 · 5) = 40 m'dir.",
        "<strong>Hız iki katına çıkarsa:</strong> Aynı frenle 144 km/sa (40 m/s) hızdan durma mesafesi 40² ÷ 10 = 160 m olur. Hız iki katına çıkınca fren mesafesi dört katına çıkar; trafikte hız sınırlarının önemi buradan gelir."
      ],
      after: [
        "Bu formüllerle bilinen üç büyüklükten dördüncüsünü bulmak için [[arac:duzgun-hizlanan-hareket-hesapla|Düzgün Hızlanan Hareket Hesaplama]] aracını kullanabilirsiniz. İvmeye neden olan kuvvetler ve F = m·a ilişkisi için [[bilgi:newtonun-hareket-yasalari|Newton'un hareket yasaları]] yazısına bakın."
      ]
    },
    {
      h: "Karşılaşma ve yetişme problemleri nasıl çözülür?",
      p: [
        "İki hareketlinin aynı anda yola çıktığı problemlerde aradaki mesafenin ne kadar hızla kapandığını düşünmek çözümü kolaylaştırır. Birbirine doğru gelen araçlar arasındaki mesafe hızlarının toplamı kadar, aynı yönde giden araçlar arasındaki mesafe ise hızlarının farkı kadar hızla kapanır."
      ],
      formula: "Karşılaşma süresi = Aradaki mesafe ÷ (v<sub>1</sub> + v<sub>2</sub>)\nYetişme süresi = Aradaki mesafe ÷ (v<sub>hızlı</sub> − v<sub>yavaş</sub>)",
      ol: [
        "<strong>Karşılaşma:</strong> Aralarında 300 km bulunan iki şehirden aynı anda birbirine doğru yola çıkan araçların hızları 70 ve 80 km/sa'dır. Mesafe saatte 150 km kapanır; 300 ÷ 150 = 2 saat sonra karşılaşırlar. Birinci araç bu sürede 140 km, ikincisi 160 km yol almıştır.",
        "<strong>Yetişme:</strong> Bir kamyon 75 km/sa hızla gidiyor ve 60 km arkasındaki otomobil 90 km/sa hızla aynı yönde ilerliyor. Aradaki mesafe saatte 15 km kapanır; 60 ÷ 15 = 4 saat sonra otomobil kamyona yetişir. Bu sürede otomobil 360 km yol alır.",
        "<strong>Farklı saatte çıkış:</strong> Biri 1 saat önce çıktıysa önce o 1 saatte aldığı yolu bulun, aradaki yeni mesafeyle aynı formülü uygulayın."
      ],
      after: [
        "Hareket problemlerinde şekil çizmek, araçların konumlarını ve yönlerini bir doğru üzerinde göstermek hatayı büyük ölçüde azaltır. Koşu ve yürüyüş için dakika/km cinsinden tempo hesabını [[bilgi:kosu-temposu-nasil-hesaplanir|koşu temposu nasıl hesaplanır]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Konum-zaman ve hız-zaman grafikleri nasıl okunur?",
      p: [
        "Fizik sorularında hareket çoğu zaman grafikle verilir. <strong>Konum-zaman grafiğinde</strong> doğrunun eğimi hızı verir: eğim sabitse hız sabittir, eğim arttıkça hız artar, yatay doğru cismin durduğunu gösterir. <strong>Hız-zaman grafiğinde</strong> ise eğim ivmeyi, grafiğin zaman ekseniyle arasında kalan alan yer değiştirmeyi verir.",
        "Yukarıdaki görselde hız 5 saniyede 0'dan 10 m/s'ye düzgün olarak çıkıyor; doğrunun eğimi 10 ÷ 5 = 2 m/s² ivmeyi, altındaki üçgenin alanı 25 m yolu gösteriyor. Sabit 10 m/s hızla 5 saniye gidilseydi grafik yatay bir doğru, alan ise 10 × 5 = 50 m'lik bir dikdörtgen olurdu. Zaman ekseninin altında kalan alanlar ters yöndeki yer değiştirmeyi gösterir ve toplamda çıkarılır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Dakikayı saate çevirmemek:</strong> 20 dakika 1/3 saattir; 0,20 saat değildir.",
        "<strong>Hızların ortalamasını almak:</strong> Ortalama hız her zaman toplam yol bölü toplam süredir.",
        "<strong>km/sa ile m/s'yi karıştırmak:</strong> İvme soruları genellikle m/s ve m/s² ister; önce dönüştürün.",
        "<strong>Yavaşlamada ivmenin işaretini unutmak:</strong> Fren yapan araçta ivme hareket yönüne zıttır; formülde negatif alınır.",
        "<strong>Karşılaşmada hızları çıkarmak:</strong> Birbirine doğru gelen araçlarda hızlar toplanır, aynı yönde gidenlerde çıkarılır."
      ]
    }
  ],
  faq: [
    ["Hız formülü nedir?", "Sabit hızlı harekette hız, alınan yolun geçen süreye bölümüdür: v = x ÷ t. Aynı ilişkiden yol x = v · t ve zaman t = x ÷ v olarak bulunur. Hesapta birimlerin uyumlu olması, örneğin km ile saatin birlikte kullanılması gerekir."],
    ["Ortalama hız nasıl hesaplanır?", "Ortalama hız, toplam yer değiştirmenin toplam süreye bölünmesiyle bulunur; ortalama sürat ise toplam yolun toplam süreye bölümüdür. Hızların aritmetik ortalamasını almak, farklı sürelerde gidilen yollarda yanlış sonuç verir."],
    ["Sürat ile hız farkı nedir?", "Sürat birim zamanda alınan yoldur ve yönü olmayan skaler bir büyüklüktür. Hız ise birim zamandaki yer değiştirmedir ve yönü olan vektörel bir büyüklüktür. Pistte tam tur atan koşucunun sürati pozitif, ortalama hızı sıfırdır."],
    ["km/sa m/s'ye nasıl çevrilir?", "km/sa cinsinden hız 3,6'ya bölünerek m/s'ye çevrilir, çünkü 1 km 1.000 metre ve 1 saat 3.600 saniyedir. Örneğin 72 km/sa 20 m/s eder; tersine çevirmek için m/s değeri 3,6 ile çarpılır."],
    ["Düzgün hızlanan harekette yol nasıl bulunur?", "Yol, x = v₀·t + ½·a·t² formülüyle bulunur. Durgun hâlden 2 m/s² ivmeyle hızlanan bir cisim 5 saniyede 25 metre yol alır. Son hız biliniyorsa v² = v₀² + 2·a·x formülü de kullanılabilir."],
    ["Hareket problemleri nasıl çözülür?", "Önce bilinenler ve istenen yazılır, birimler uyumlu hâle getirilir ve hareket bir doğru üzerinde çizilir. Sabit hızda x = v·t, ivmeli harekette üç temel formülden uygun olanı seçilir; birden fazla hareketli varsa mesafenin kapanma hızı düşünülür."],
    ["Karşılaşma problemi nasıl çözülür?", "Birbirine doğru hareket eden iki aracın karşılaşma süresi, aradaki mesafenin hızların toplamına bölünmesiyle bulunur. 300 km mesafe ve 70 ile 80 km/sa hızlarla araçlar 2 saat sonra karşılaşır."],
    ["İvme ve hız arasındaki fark nedir?", "Hız, konumun birim zamandaki değişimidir ve m/s ile ölçülür. İvme ise hızın birim zamandaki değişimidir ve m/s² ile ölçülür. Sabit hızla giden bir aracın hızı yüksek olabilir ama ivmesi sıfırdır."]
  ],
  tools: ["hiz-hesapla", "duzgun-hizlanan-hareket-hesapla", "ms-kmh-cevir", "ivme-hesapla"],
  related: ["newtonun-hareket-yasalari", "kosu-temposu-nasil-hesaplanir", "serbest-dusme-formulu"],
  sources: [
    ["MEB – Ortaöğretim fizik dersi öğretim programı", "https://www.meb.gov.tr/"],
    ["BIPM – SI birimleri (metre, saniye)", "https://www.bipm.org/"]
  ]
};
