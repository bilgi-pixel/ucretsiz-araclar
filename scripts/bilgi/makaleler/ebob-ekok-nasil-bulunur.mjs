export default {
  slug: "ebob-ekok-nasil-bulunur",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "EBOB ve EKOK Nedir, Nasıl Bulunur? Yöntemler ve Örnek Sorular",
  pageTitle: "EBOB ve EKOK Nasıl Bulunur? Asal Çarpan, Öklid ve Problemler",
  description: "EBOB, sayıların ortak bölenlerinin en büyüğü; EKOK, ortak katlarının en küçüğüdür. Asal çarpan, bölme ve Öklid yöntemleri, EBOB × EKOK kuralı ve çözümlü problemler.",
  keywords: ["ebob ekok", "ebob nasıl bulunur", "ekok nasıl bulunur", "asal çarpanlara ayırma", "ebob ekok problemleri", "bölen sayısı", "aralarında asal sayılar", "öklid algoritması"],
  lead: "<strong>EBOB</strong> (en büyük ortak bölen), iki ya da daha fazla sayının hepsini kalansız bölen en büyük sayıdır; <strong>EKOK</strong> (en küçük ortak kat) ise bu sayıların hepsinin katı olan en küçük pozitif sayıdır. Örneğin 12 ile 18'in EBOB'u 6, EKOK'u 36'dır. İkisi de en kolay sayıları asal çarpanlarına ayırarak bulunur: EBOB için ortak çarpanların küçük üslüleri, EKOK için tüm çarpanların büyük üslüleri çarpılır. Bu sayfada üç yöntemi, EBOB × EKOK kuralını ve LGS-TYT tarzı problemleri çözümleriyle bulacaksınız.",
  kisaCevap: [
    "EBOB: sayıların hepsini kalansız bölen en büyük sayı; EKOK: hepsinin katı olan en küçük pozitif sayı.",
    "Asal çarpan yöntemi: EBOB = ortak asal çarpanların en küçük üslüleri çarpımı; EKOK = tüm asal çarpanların en büyük üslüleri çarpımı.",
    "İki sayı için her zaman EBOB(a, b) × EKOK(a, b) = a × b geçerlidir.",
    "EBOB'u 1 olan sayılara aralarında asal denir; bu durumda EKOK sayıların çarpımına eşittir.",
    "\"En büyük parça, en az sayıda eşit bölme\" soruları EBOB; \"tekrar ne zaman buluşur, en az kaç\" soruları EKOK ile çözülür.",
    "Bölen sayısı = asal çarpanların üslerinin birer fazlasının çarpımı; 120 = 2³ · 3 · 5 için (3+1)(1+1)(1+1) = 16."
  ],
  figure: {
    alt: "84 ve 120 sayılarının asal çarpanlarını gösteren kesişen iki küme: ortak bölgede 2, 2 ve 3; yalnız 84'te 7; yalnız 120'de 2 ve 5. Ortak bölgenin çarpımı EBOB 12, tüm çarpanların çarpımı EKOK 840.",
    caption: "İki sayının asal çarpanlarını kesişen kümelere yerleştirin. Kesişimdeki çarpanların çarpımı EBOB'u, bütün çarpanların (kesişim bir kez sayılarak) çarpımı EKOK'u verir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">84 ve 120'nin asal çarpanları</text>
  <text x="250" y="66" class="b mid">84 = 2² · 3 · 7</text>
  <text x="470" y="66" class="b mid">120 = 2³ · 3 · 5</text>
  <ellipse cx="290" cy="180" rx="150" ry="100" class="ps"/>
  <ellipse cx="430" cy="180" rx="150" ry="100" class="oks"/>
  <ellipse cx="290" cy="180" rx="150" ry="100" class="sp sw" fill="none"/>
  <ellipse cx="430" cy="180" rx="150" ry="100" class="sok sw" fill="none"/>
  <text x="200" y="190" class="xl mid">7</text>
  <text x="360" y="160" class="xl mid">2  2</text>
  <text x="360" y="204" class="xl mid">3</text>
  <text x="520" y="160" class="xl mid">2</text>
  <text x="520" y="204" class="xl mid">5</text>
  <text x="190" y="262" class="sm mid mu">yalnız 84</text>
  <text x="360" y="262" class="sm mid b">ortak</text>
  <text x="530" y="262" class="sm mid mu">yalnız 120</text>
  <rect x="20" y="300" width="330" height="104" rx="10" class="sf sb"/>
  <text x="40" y="330" class="b">EBOB = ortak çarpanlar</text>
  <text x="40" y="358" class="t2">2 · 2 · 3</text>
  <text x="40" y="388" class="xl p">EBOB = 12</text>
  <rect x="370" y="300" width="330" height="104" rx="10" class="p"/>
  <text x="390" y="330" class="b sf">EKOK = hepsi (ortak bir kez)</text>
  <text x="390" y="358" class="sf">7 · 2 · 2 · 3 · 2 · 5</text>
  <text x="390" y="388" class="xl sf">EKOK = 840</text>
</svg>`
  },
  sections: [
    {
      h: "EBOB ve EKOK nedir?",
      p: [
        "Bir sayıyı kalansız bölen sayılara o sayının <strong>bölenleri</strong> denir. 12'nin bölenleri 1, 2, 3, 4, 6 ve 12'dir; 18'in bölenleri 1, 2, 3, 6, 9 ve 18'dir. İki listede ortak olan sayılar 1, 2, 3 ve 6'dır. Bunların en büyüğü olan 6, 12 ile 18'in <strong>en büyük ortak böleni (EBOB)</strong>'dür.",
        "Bir sayının tam sayı katlarına o sayının <strong>katları</strong> denir. 12'nin katları 12, 24, 36, 48, 60, 72…; 18'in katları 18, 36, 54, 72… diye gider. İki listede ilk ortak sayı 36'dır; bu da 12 ile 18'in <strong>en küçük ortak katı (EKOK)</strong>'dur.",
        "Liste yazma yöntemi küçük sayılarda kavramı anlamak için iyidir, ancak sayılar büyüdükçe zahmetli hâle gelir. Bu yüzden pratikte asal çarpanlara ayırma, bölme (merdiven) ya da Öklid yöntemi kullanılır."
      ]
    },
    {
      h: "Yöntem 1: Asal çarpanlara ayırma",
      p: [
        "Her pozitif tam sayı, asal sayıların çarpımı olarak tek bir şekilde yazılabilir. Bir sayıyı asal çarpanlarına ayırmak için onu en küçük asal sayıdan (2) başlayarak bölebildiğiniz kadar bölün, sonra 3, 5, 7… ile devam edin; bölüm 1 olana kadar sürdürün."
      ],
      ol: [
        "<strong>84'ü ayırın:</strong> 84 ÷ 2 = 42, 42 ÷ 2 = 21, 21 ÷ 3 = 7, 7 ÷ 7 = 1. Sonuç 84 = 2² · 3 · 7.",
        "<strong>120'yi ayırın:</strong> 120 ÷ 2 = 60, 60 ÷ 2 = 30, 30 ÷ 2 = 15, 15 ÷ 3 = 5, 5 ÷ 5 = 1. Sonuç 120 = 2³ · 3 · 5.",
        "<strong>EBOB:</strong> Her iki sayıda ortak olan asal çarpanları, <em>küçük</em> üsleriyle alın: 2² ve 3¹. EBOB = 4 · 3 = 12.",
        "<strong>EKOK:</strong> Sayılarda geçen bütün asal çarpanları, <em>büyük</em> üsleriyle alın: 2³, 3¹, 5¹, 7¹. EKOK = 8 · 3 · 5 · 7 = 840."
      ],
      formula: "EBOB = ortak asal çarpanların en küçük üslülerinin çarpımı\nEKOK = tüm asal çarpanların en büyük üslülerinin çarpımı",
      after: [
        "Bir sayının asal çarpanlarını adım adım görmek için [[arac:asal-carpan-hesapla|Asal Çarpan Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Yöntem 2: Bölme (merdiven) yöntemi",
      p: [
        "Okullarda en çok öğretilen yöntemdir. Sayılar yan yana yazılır, sağ tarafa dikey bir çizgi çekilir ve sayılar en küçük asal sayıdan başlayarak bölünür. Bölünebilen sayının altına bölüm yazılır, bölünemeyen sayı aynen aşağı indirilir. Bütün sayılar 1 olunca işlem biter."
      ],
      table: {
        head: ["84", "120", "Bölen", "Not"],
        rows: [
          ["42", "60", "2", "İkisi de bölündü (ortak)"],
          ["21", "30", "2", "İkisi de bölündü (ortak)"],
          ["21", "15", "2", "Yalnız 120 bölündü"],
          ["7", "5", "3", "İkisi de bölündü (ortak)"],
          ["7", "1", "5", "Yalnız 120 bölündü"],
          ["1", "1", "7", "Yalnız 84 bölündü"]
        ],
        caption: "Sağ sütundaki bütün bölenlerin çarpımı EKOK'u verir: 2 · 2 · 2 · 3 · 5 · 7 = 840. Yalnızca iki sayıyı birlikte bölen satırların çarpımı EBOB'u verir: 2 · 2 · 3 = 12."
      }
    },
    {
      h: "Yöntem 3: Öklid algoritması",
      p: [
        "Büyük sayıların EBOB'unu bulmanın en hızlı yolu, iki bin yılı aşkın süredir bilinen Öklid algoritmasıdır. Büyük sayı küçüğe bölünür; ardından küçük sayı kalana bölünür ve bu işlem kalan sıfır olana kadar sürdürülür. Sıfırdan önceki son kalan EBOB'tur."
      ],
      formula: "120 = 84 × 1 + 36\n84 = 36 × 2 + 12\n36 = 12 × 3 + 0  →  EBOB(84, 120) = 12",
      ul: [
        "Algoritma asal çarpanlara ayırma gerektirmediği için 6–7 basamaklı sayılarda bile birkaç adımda sonuca ulaşır.",
        "EBOB bulunduktan sonra EKOK, aşağıdaki kuralla tek işlemde hesaplanır: 84 × 120 ÷ 12 = 840.",
        "İki ya da daha fazla sayının EBOB ve EKOK'unu Öklid adımlarıyla birlikte görmek için [[arac:ebob-ekok|EBOB EKOK Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "EBOB × EKOK = a × b kuralı ve aralarında asal sayılar",
      p: [
        "İki pozitif tam sayı için EBOB ile EKOK'un çarpımı her zaman sayıların çarpımına eşittir. Bunun nedeni, asal çarpanlara ayırmada EBOB'un küçük üsleri, EKOK'un ise büyük üsleri almasıdır; ikisi birlikte her asal çarpanın iki sayıdaki üslerinin toplamını verir.",
        "Kural yalnızca <strong>iki sayı</strong> için geçerlidir. Üç sayıda EBOB × EKOK genellikle sayıların çarpımına eşit değildir; örneğin 2, 4 ve 8 için EBOB 2, EKOK 8 olup çarpımları 16'dır, oysa 2 · 4 · 8 = 64 eder."
      ],
      formula: "EBOB(a, b) × EKOK(a, b) = a × b\nÖrnek: 12 × 840 = 10.080 = 84 × 120",
      after: [
        "EBOB'u 1 olan sayılara <strong>aralarında asal</strong> denir. 8 ile 15 asal sayı değildir ama ortak bölenleri yalnızca 1 olduğu için aralarında asaldır; bu yüzden EKOK(8, 15) = 8 × 15 = 120'dir. Ardışık iki doğal sayı her zaman aralarında asaldır. Bir sayının asal olup olmadığını hızla kontrol etmek için [[arac:asal-sayi-sorgula|Asal Sayı Sorgulama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Bir sayının bölen sayısı nasıl bulunur?",
      p: [
        "Bölenleri tek tek yazmadan bir sayının kaç pozitif böleni olduğunu bulmak mümkündür. Sayıyı asal çarpanlarına ayırın, her asal çarpanın üssüne 1 ekleyin ve bu sayıları çarpın. Bu kural, her bölenin her asal çarpandan 0'dan üssüne kadar kaç tane içerebileceğinin seçimine dayanır."
      ],
      formula: "n = p₁^a · p₂^b · p₃^c ise\npozitif bölen sayısı = (a + 1)(b + 1)(c + 1)",
      table: {
        head: ["Sayı", "Asal çarpanları", "Bölen sayısı"],
        rows: [
          ["12", "2² · 3", "(2+1)(1+1) = 6"],
          ["36", "2² · 3²", "(2+1)(2+1) = 9"],
          ["84", "2² · 3 · 7", "(2+1)(1+1)(1+1) = 12"],
          ["120", "2³ · 3 · 5", "(3+1)(1+1)(1+1) = 16"],
          ["360", "2³ · 3² · 5", "(3+1)(2+1)(1+1) = 24"]
        ],
        caption: "Tam sayı bölen sayısı, pozitif bölen sayısının iki katıdır (negatif bölenler de sayılırsa). Tüm bölenleri listelemek için [[arac:bolen-hesapla|Bölen Hesaplama]] aracını kullanabilirsiniz."
      }
    },
    {
      h: "EBOB ve EKOK problemleri: hangisi ne zaman kullanılır?",
      p: [
        "Problemlerde ilk iş, sorunun bölmeyi mi yoksa tekrarlanan olayların buluşmasını mı sorduğunu anlamaktır. \"En büyük parça\", \"en az sayıda eşit parça\", \"eşit aralıklarla\" gibi ifadeler EBOB'a; \"en az kaç\", \"tekrar ne zaman\", \"aynı anda\" gibi ifadeler EKOK'a işaret eder."
      ],
      ol: [
        "<strong>Kare parsel (EBOB):</strong> 24 m × 36 m'lik bir bahçe, hiç artmayacak şekilde en büyük eş karelere bölünecek. Karenin kenarı EBOB(24, 36) = 12 m'dir; (24 ÷ 12) × (36 ÷ 12) = 2 × 3 = 6 parsel oluşur.",
        "<strong>Eşit aralıkla ağaç (EBOB):</strong> 60 m × 84 m'lik dikdörtgen bir arsanın çevresine, köşelerde de birer ağaç olacak şekilde eşit aralıklarla en az sayıda ağaç dikilecek. Aralık EBOB(60, 84) = 12 m'dir. Çevre 2 × (60 + 84) = 288 m olduğundan 288 ÷ 12 = 24 ağaç gerekir.",
        "<strong>Otobüslerin buluşması (EKOK):</strong> Biri 12, diğeri 18 dakikada bir kalkan iki otobüs saat 08.00'de birlikte kalkıyor. Tekrar birlikte kalkmaları EKOK(12, 18) = 36 dakika sonra, yani saat 08.36'dadır.",
        "<strong>Kalanlı sayma (EKOK):</strong> Bir kutudaki kalemler 3'er, 4'er ve 5'er sayıldığında her seferinde 2 kalem artıyor. Kutuda en az kaç kalem vardır? EKOK(3, 4, 5) = 60 olduğundan sayı 60 + 2 = 62'dir.",
        "<strong>Kesir sadeleştirme (EBOB):</strong> 84/120 kesrini en sade hâline getirmek için pay ve paydayı EBOB'a bölün: 84 ÷ 12 = 7, 120 ÷ 12 = 10; sonuç 7/10."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Üsleri karıştırmak:</strong> EBOB'da küçük, EKOK'ta büyük üs alınır. Tersini yapmak sonucu tamamen değiştirir.",
        "<strong>EBOB'a ortak olmayan çarpanı katmak:</strong> Yalnızca bir sayıda bulunan asal çarpan (örnekteki 7 ve 5) EBOB'a girmez.",
        "<strong>EKOK'ta ortak çarpanı iki kez saymak:</strong> 12 ve 18 için EKOK 12 × 18 = 216 değil, 36'dır; çarpım ancak sayılar aralarında asalsa EKOK'a eşittir.",
        "<strong>1'i asal saymak:</strong> 1 asal sayı değildir; asal çarpanlara ayırmada kullanılmaz.",
        "<strong>Problem türünü yanlış seçmek:</strong> \"En büyük\" kelimesi her zaman EBOB, \"en küçük\" her zaman EKOK demek değildir. Sorunun bölme mi buluşma mı istediğine bakın.",
        "<strong>Üç sayıda EBOB × EKOK kuralını kullanmak:</strong> Kural yalnızca iki sayı için geçerlidir."
      ]
    }
  ],
  faq: [
    ["EBOB nedir?", "EBOB, en büyük ortak bölen demektir ve iki ya da daha fazla sayının hepsini kalansız bölen en büyük pozitif tam sayıdır. Örneğin 12 ile 18'i bölen en büyük sayı 6 olduğu için EBOB(12, 18) = 6'dır."],
    ["EKOK nedir?", "EKOK, en küçük ortak kat demektir ve verilen sayıların hepsinin katı olan en küçük pozitif tam sayıdır. Örneğin 12 ve 18'in ilk ortak katı 36 olduğu için EKOK(12, 18) = 36'dır."],
    ["EBOB ve EKOK nasıl bulunur?", "Sayılar asal çarpanlarına ayrılır. EBOB için her iki sayıda da bulunan asal çarpanlar küçük üsleriyle, EKOK için bütün asal çarpanlar büyük üsleriyle çarpılır. Bölme (merdiven) ve Öklid yöntemleri de aynı sonucu verir."],
    ["Asal çarpanlara ayırma nasıl yapılır?", "Sayı en küçük asal sayı olan 2'den başlanarak bölünebildiği kadar bölünür, sonra 3, 5, 7 gibi sıradaki asallarla devam edilir. Bölüm 1 olunca durulur ve kullanılan bölenler üslü biçimde yazılır."],
    ["EBOB × EKOK = a × b kuralı nedir?", "İki pozitif tam sayının EBOB'u ile EKOK'unun çarpımı, sayıların kendi çarpımına eşittir. Örneğin 84 ve 120 için 12 × 840 = 84 × 120 = 10.080'dir; kural üç ve daha fazla sayıda geçerli değildir."],
    ["EBOB-EKOK problemleri nasıl çözülür?", "Önce sorunun türü belirlenir: bir bütünü en büyük eşit parçalara bölmek EBOB, tekrarlanan olayların aynı anda gerçekleşeceği en erken zamanı bulmak EKOK gerektirir. Ardından ilgili değer hesaplanıp sorunun istediği adet ya da zamana dönüştürülür."],
    ["Aralarında asal sayı ne demek?", "Ortak bölenleri yalnızca 1 olan, yani EBOB'u 1 olan sayılara aralarında asal sayılar denir. Sayıların kendilerinin asal olması gerekmez; 8 ve 15 aralarında asaldır ve EKOK'ları çarpımları olan 120'dir."],
    ["Bir sayının bölen sayısı nasıl bulunur?", "Sayı asal çarpanlarına ayrılır, her asal çarpanın üssüne 1 eklenir ve bu sayılar çarpılır. Örneğin 120 = 2³ · 3 · 5 olduğu için pozitif bölen sayısı (3+1)(1+1)(1+1) = 16'dır."],
    ["Öklid algoritması nedir?", "Büyük sayının küçük sayıya, ardından küçük sayının kalana tekrar tekrar bölündüğü bir EBOB bulma yöntemidir. Kalan sıfır olduğunda bir önceki kalan EBOB'tur; büyük sayılarda asal çarpanlara ayırmaktan çok daha hızlıdır."]
  ],
  tools: ["ebob-ekok", "asal-carpan-hesapla", "bolen-hesapla", "asal-sayi-sorgula"],
  related: ["pisagor-teoremi-nedir", "alan-ve-hacim-formulleri"]
};
