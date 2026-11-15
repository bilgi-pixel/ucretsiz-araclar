export default {
  slug: "kesirlerle-islemler",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Kesirlerle İşlemler: Toplama, Çıkarma, Sadeleştirme ve Bileşik Kesir",
  pageTitle: "Kesirlerle İşlemler: Toplama, Çıkarma, Çarpma, Bölme",
  description: "Kesirlerde toplama-çıkarmada paydalar eşitlenir, çarpmada paylar ve paydalar çarpılır, bölmede ikinci kesir ters çevrilir. Sadeleştirme ve bileşik kesir örnekleri.",
  keywords: ["kesirlerle toplama", "kesir sadeleştirme", "bileşik kesir tam sayılı kesir", "kesirlerde çarpma bölme", "payda eşitleme", "kesir karşılaştırma", "kesirlerle çıkarma", "ondalık sayıyı kesre çevirme"],
  lead: "Kesirlerle toplama ve çıkarma yapmak için önce <strong>paydalar eşitlenir</strong>, sonra paylar toplanır ya da çıkarılır ve payda aynen yazılır: 2/3 + 3/4 = 8/12 + 9/12 = 17/12. Çarpmada paylar kendi arasında, paydalar kendi arasında çarpılır; bölmede ise birinci kesir ikinci kesrin tersiyle çarpılır. Sonuç her zaman pay ve paydanın en büyük ortak bölenine bölünerek sadeleştirilir. Bu sayfada dört işlemi, sadeleştirmeyi, bileşik ve tam sayılı kesir dönüşümünü, sıralamayı ve ondalık sayıyı kesre çevirmeyi ortaokul müfredatına uygun çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Toplama-çıkarma: paydaları EKOK ile eşitleyin, payları toplayın ya da çıkarın, paydayı aynen yazın.",
    "Çarpma: a/b × c/d = (a × c)/(b × d); işlemden önce çapraz sadeleştirme yapılabilir.",
    "Bölme: a/b ÷ c/d = a/b × d/c; ikinci kesir ters çevrilip çarpılır.",
    "Sadeleştirme: pay ve payda EBOB'larına bölünür; 18/24 = 3/4.",
    "Bileşik kesir → tam sayılı kesir: pay paydaya bölünür; bölüm tam kısım, kalan yeni paydır (17/5 = 3 2/5).",
    "Sıralama: paydalar ya da paylar eşitlenip karşılaştırılır; aynı paydada payı büyük olan büyüktür."
  ],
  figure: {
    alt: "Kesir şeritleriyle 2/3 + 3/4 toplamı: on iki eşit parçaya bölünmüş şeritlerde 8 parça ve 9 parça boyalı; toplam 17 parça, yani bir bütün ve 5/12, sonuç 17/12 = 1 tam 5/12.",
    caption: "Paydalar eşitlenince iki kesir aynı büyüklükte parçalarla ifade edilir: üçte ikilik ve dörtte üçlük parçalar on ikide birlik parçalara bölünür. Sonra yalnızca parçalar sayılır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="34" class="lg b mid">2/3 + 3/4 kesir şeritleriyle</text>
  <text x="360" y="62" class="sm mid t2">EKOK(3, 4) = 12 olduğu için her bütün 12 eşit parçaya bölünür</text>
<text x="40" y="114" class="b">2/3 = 8/12</text><rect x="180" y="90" width="38" height="36" class="ps"/><rect x="220" y="90" width="38" height="36" class="ps"/><rect x="260" y="90" width="38" height="36" class="ps"/><rect x="300" y="90" width="38" height="36" class="ps"/><rect x="340" y="90" width="38" height="36" class="ps"/><rect x="380" y="90" width="38" height="36" class="ps"/><rect x="420" y="90" width="38" height="36" class="ps"/><rect x="460" y="90" width="38" height="36" class="ps"/><rect x="500" y="90" width="38" height="36" class="sf sb"/><rect x="540" y="90" width="38" height="36" class="sf sb"/><rect x="580" y="90" width="38" height="36" class="sf sb"/><rect x="620" y="90" width="38" height="36" class="sf sb"/>
<text x="40" y="174" class="b">3/4 = 9/12</text><rect x="180" y="150" width="38" height="36" class="oks"/><rect x="220" y="150" width="38" height="36" class="oks"/><rect x="260" y="150" width="38" height="36" class="oks"/><rect x="300" y="150" width="38" height="36" class="oks"/><rect x="340" y="150" width="38" height="36" class="oks"/><rect x="380" y="150" width="38" height="36" class="oks"/><rect x="420" y="150" width="38" height="36" class="oks"/><rect x="460" y="150" width="38" height="36" class="oks"/><rect x="500" y="150" width="38" height="36" class="oks"/><rect x="540" y="150" width="38" height="36" class="sf sb"/><rect x="580" y="150" width="38" height="36" class="sf sb"/><rect x="620" y="150" width="38" height="36" class="sf sb"/>
<text x="40" y="264" class="b">Toplam</text><rect x="180" y="240" width="38" height="36" class="p"/><rect x="220" y="240" width="38" height="36" class="p"/><rect x="260" y="240" width="38" height="36" class="p"/><rect x="300" y="240" width="38" height="36" class="p"/><rect x="340" y="240" width="38" height="36" class="p"/><rect x="380" y="240" width="38" height="36" class="p"/><rect x="420" y="240" width="38" height="36" class="p"/><rect x="460" y="240" width="38" height="36" class="p"/><rect x="500" y="240" width="38" height="36" class="p"/><rect x="540" y="240" width="38" height="36" class="p"/><rect x="580" y="240" width="38" height="36" class="p"/><rect x="620" y="240" width="38" height="36" class="p"/>
<text x="40" y="314" class="b"></text><rect x="180" y="290" width="38" height="36" class="p"/><rect x="220" y="290" width="38" height="36" class="p"/><rect x="260" y="290" width="38" height="36" class="p"/><rect x="300" y="290" width="38" height="36" class="p"/><rect x="340" y="290" width="38" height="36" class="p"/><rect x="380" y="290" width="38" height="36" class="sf sb"/><rect x="420" y="290" width="38" height="36" class="sf sb"/><rect x="460" y="290" width="38" height="36" class="sf sb"/><rect x="500" y="290" width="38" height="36" class="sf sb"/><rect x="540" y="290" width="38" height="36" class="sf sb"/><rect x="580" y="290" width="38" height="36" class="sf sb"/><rect x="620" y="290" width="38" height="36" class="sf sb"/>
  <text x="400" y="222" class="mid lg">8 + 9 = 17 parça</text>
  <text x="40" y="314" class="sm t2">5/12</text>
  <rect x="180" y="350" width="478" height="50" rx="8" class="sf sb"/>
  <text x="419" y="382" class="mid b">17/12 = 1 tam 5/12 (bileşik kesir → tam sayılı kesir)</text>
</svg>`
  },
  sections: [
    {
      h: "Kesir nedir? Pay, payda ve kesir türleri",
      p: [
        "Kesir, bir bütünün eşit parçalarından kaç tanesinin alındığını gösteren sayıdır. 3/4 kesrinde alttaki <strong>payda</strong> (4) bütünün kaç eşit parçaya bölündüğünü, üstteki <strong>pay</strong> (3) bu parçalardan kaçının alındığını gösterir. Aradaki çizgiye kesir çizgisi denir ve bölme işlemi anlamına gelir: 3/4 = 3 ÷ 4 = 0,75.",
        "Payı paydasından küçük kesirlere <strong>basit kesir</strong> (2/5), payı paydasına eşit ya da büyük olanlara <strong>bileşik kesir</strong> (7/4, 5/5) denir. Bir tam sayı ile bir basit kesrin birlikte yazıldığı 1 3/4 gibi gösterimlere ise <strong>tam sayılı kesir</strong> adı verilir. Bileşik kesirler ile tam sayılı kesirler aynı değeri iki farklı biçimde gösterir.",
        "Paydası 0 olan kesir tanımsızdır, çünkü bir bütünü sıfır parçaya bölmek anlamsızdır. Payı 0 olan kesrin değeri ise sıfırdır: 0/7 = 0."
      ]
    },
    {
      h: "Kesir sadeleştirme ve genişletme",
      p: [
        "Bir kesrin payı ve paydası aynı sıfırdan farklı sayıyla çarpılır ya da bölünürse kesrin değeri değişmez. Çarpmaya <strong>genişletme</strong>, bölmeye <strong>sadeleştirme</strong> denir. 3/4 = 6/8 = 9/12 kesirleri birbirine denktir."
      ],
      formula: "Sadeleştirme: a/b = (a ÷ k)/(b ÷ k)   (k, a ve b'nin ortak böleni)\nEn sade hâl için k = EBOB(a, b)\nÖrnek: 18/24 → EBOB(18, 24) = 6 → 18 ÷ 6 / 24 ÷ 6 = 3/4",
      after: [
        "Sadeleştirmeyi adım adım da yapabilirsiniz: 18/24 önce 2'ye (9/12), sonra 3'e (3/4) bölünür. Pay ve payda artık aralarında asal olduğu için daha fazla sadeleşmez. EBOB'u bulmakta zorlanıyorsanız [[bilgi:ebob-ekok-nasil-bulunur|EBOB ve EKOK nasıl bulunur]] yazısı yöntemleri anlatır; sonucu hızlıca kontrol etmek için [[arac:kesir-sadelestir|Kesir Sadeleştirme]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Kesirlerle toplama ve çıkarma",
      p: [
        "<strong>Paydaları eşit kesirlerde</strong> paylar toplanır ya da çıkarılır, payda aynen yazılır: 2/7 + 3/7 = 5/7, 5/9 − 2/9 = 3/9 = 1/3. Parçalar aynı büyüklükte olduğu için yalnızca parça sayısını toplamak yeterlidir.",
        "<strong>Paydaları farklı kesirlerde</strong> önce paydalar eşitlenir. Bunun için paydaların en küçük ortak katı (EKOK) bulunur ve her kesir bu ortak paydaya genişletilir. Paydaları çarpmak da ortak payda verir, ancak sayılar gereksiz yere büyür ve sonunda daha çok sadeleştirme gerekir."
      ],
      ol: [
        "<strong>2/3 + 3/4:</strong> EKOK(3, 4) = 12. 2/3 = 8/12, 3/4 = 9/12. Toplam 8/12 + 9/12 = 17/12 = 1 5/12.",
        "<strong>5/6 − 1/4:</strong> EKOK(6, 4) = 12. 5/6 = 10/12, 1/4 = 3/12. Fark 10/12 − 3/12 = 7/12.",
        "<strong>1/2 + 1/3 + 1/6:</strong> EKOK = 6. 3/6 + 2/6 + 1/6 = 6/6 = 1.",
        "<strong>Tam sayılı kesirlerde:</strong> 1 1/2 + 2 2/3 için tam kısımlar ayrı toplanır (1 + 2 = 3), kesirler ortak paydada toplanır (3/6 + 4/6 = 7/6 = 1 1/6). Sonuç 3 + 1 1/6 = 4 1/6.",
        "<strong>Ödünç alarak çıkarma:</strong> 3 1/4 − 1 3/4 için 1/4'ten 3/4 çıkmaz. 3 1/4'ü 2 5/4 olarak yazın: 2 5/4 − 1 3/4 = 1 2/4 = 1 1/2."
      ],
      after: [
        "Paydalardan biri diğerinin katıysa EKOK büyük paydadır: 1/3 + 5/6 işleminde ortak payda 6'dır ve 2/6 + 5/6 = 7/6 bulunur. İşlemlerinizi kontrol etmek için [[arac:kesir-hesapla|Kesir Hesaplama]] aracı payda eşitleme adımlarını da gösterir."
      ]
    },
    {
      h: "Kesirlerde çarpma ve bölme",
      p: [
        "Çarpmada payda eşitlemeye gerek yoktur: paylar kendi arasında, paydalar kendi arasında çarpılır. İşlemi kolaylaştırmak için çarpmadan önce bir kesrin payı ile diğer kesrin paydası arasında <strong>çapraz sadeleştirme</strong> yapılabilir.",
        "Bölmede ise birinci kesir aynen yazılır, bölme işareti çarpmaya çevrilir ve ikinci kesir ters çevrilir. Bir kesrin tersi, pay ile paydanın yer değiştirmesiyle bulunur; 2/5'in tersi 5/2'dir."
      ],
      formula: "Çarpma: a/b × c/d = (a × c)/(b × d)\nBölme: a/b ÷ c/d = a/b × d/c = (a × d)/(b × c)\nTam sayı ile: 3 × 2/7 = 6/7  ·  2/7 ÷ 3 = 2/7 × 1/3 = 2/21",
      ol: [
        "<strong>2/3 × 9/10:</strong> Çapraz sadeleştirme: 2 ile 10 ikiye bölünür (1 ve 5), 9 ile 3 üçe bölünür (3 ve 1). Sonuç 1/1 × 3/5 = 3/5. Sadeleştirmeden yapsaydınız 18/30 = 3/5 bulurdunuz.",
        "<strong>3/4 ÷ 2/5:</strong> 3/4 × 5/2 = 15/8 = 1 7/8.",
        "<strong>2 1/2 × 1 1/3:</strong> Önce bileşik kesre çevirin: 5/2 × 4/3 = 20/6 = 10/3 = 3 1/3. Tam sayılı kesirlerde tam kısımları ayrı çarpmak yanlış sonuç verir.",
        "<strong>Bir sayının kesri:</strong> 60'ın 3/5'i = 60 × 3/5 = 180/5 = 36. Önce 60 ÷ 5 = 12, sonra 12 × 3 = 36 diye düşünmek daha hızlıdır."
      ]
    },
    {
      h: "Bileşik kesri tam sayılı kesre çevirme",
      p: [
        "Bileşik kesir, değeri 1 ya da 1'den büyük olan kesirdir ve tam sayılı kesir olarak da yazılabilir. Dönüşüm bölme işlemiyle yapılır."
      ],
      formula: "Bileşik → tam sayılı: a/b için a ÷ b = q kalan r → q r/b\nÖrnek: 17/5 → 17 ÷ 5 = 3 kalan 2 → 3 2/5\nTam sayılı → bileşik: q r/b = (q × b + r)/b\nÖrnek: 2 3/4 = (2 × 4 + 3)/4 = 11/4",
      after: [
        "Kalan 0 ise kesir bir tam sayıya eşittir: 12/4 = 3. Toplama ve çıkarmada tam sayılı kesirlerle çalışmak, çarpma ve bölmede ise bileşik kesirlerle çalışmak genellikle daha az hata yaptırır. İki biçim arasında hızlı dönüşüm için [[arac:bilesik-kesir-cevir|Bileşik Kesir ve Tam Sayılı Kesir Çevirme]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Kesirler nasıl sıralanır?",
      p: [
        "Kesirleri karşılaştırmanın üç yolu vardır. <strong>Paydalar eşitse</strong> payı büyük olan büyüktür: 5/9, 4/9'dan büyüktür. <strong>Paylar eşitse</strong> paydası küçük olan büyüktür, çünkü bütün daha az parçaya bölünmüş ve her parça daha büyüktür: 3/5, 3/8'den büyüktür. Hiçbiri eşit değilse paydalar (ya da paylar) eşitlenir."
      ],
      table: {
        head: ["Kesir", "Payda 120'ye genişletme", "Ondalık karşılık", "Sıra"],
        rows: [
          ["2/3", "80/120", "0,667", "3. (en büyük)"],
          ["5/8", "75/120", "0,625", "2."],
          ["3/5", "72/120", "0,600", "1. (en küçük)"]
        ],
        caption: "EKOK(3, 8, 5) = 120. Küçükten büyüğe sıralama: 3/5 < 5/8 < 2/3."
      },
      after: [
        "Bir başka pratik yol, her kesri 1'e olan uzaklığına göre düşünmektir: 2/3 bütünden 1/3, 5/8 bütünden 3/8, 3/5 bütünden 2/5 eksiktir. Eksik kısmı en küçük olan en büyük kesirdir. İki kesri hızla karşılaştırmak için [[arac:kesir-karsilastir|Kesir Karşılaştırma]] aracı ortak paydayı ve aradaki farkı gösterir."
      ]
    },
    {
      h: "Ondalık sayı kesre nasıl çevrilir?",
      p: [
        "Sonlu ondalık sayılar, virgülden sonraki basamak sayısı kadar sıfırı olan bir paydayla kesre çevrilir ve sadeleştirilir. Ters yönde ise pay paydaya bölünür."
      ],
      table: {
        head: ["Ondalık", "Kesir", "Sade hâl", "Yüzde"],
        rows: [
          ["0,5", "5/10", "1/2", "%50"],
          ["0,25", "25/100", "1/4", "%25"],
          ["0,75", "75/100", "3/4", "%75"],
          ["0,125", "125/1000", "1/8", "%12,5"],
          ["1,6", "16/10", "8/5 = 1 3/5", "%160"],
          ["0,333…", "3/9", "1/3", "%33,3…"]
        ],
        caption: "Devirli ondalıkta, devreden tek basamak dokuzda bir olarak yazılır: 0,333… = 3/9 = 1/3."
      },
      after: [
        "Kesirler ile oran-orantı ve yüzde arasındaki bağlantıyı görmek için [[bilgi:oran-oranti-nasil-cozulur|oran ve orantı nasıl çözülür]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Kesir problemleri: günlük hayattan çözümlü örnekler",
      p: [
        "Okul sınavlarında ve LGS'de kesirler çoğu zaman sözel problem içinde karşınıza çıkar. Bu sorularda önce bütünün ne olduğunu belirlemek, sonra hangi işlemin gerektiğine karar vermek gerekir: \"kalanın\" ifadesi çıkarma ve çarpmayı, \"eşit paylaştırma\" ifadesi bölmeyi işaret eder."
      ],
      ol: [
        "<strong>Harçlık problemi:</strong> Ayşe harçlığının 1/4'ünü kitaba, 1/3'ünü sinemaya harcıyor. Harcanan kısım 3/12 + 4/12 = 7/12, kalan kısım 1 − 7/12 = 5/12'dir. Harçlık 600 TL ise kalan para 600 × 5/12 = 250 TL olur.",
        "<strong>Kalanın kesri:</strong> Bir depodaki suyun önce 1/3'ü, sonra kalanın 1/4'ü kullanılıyor. İlk kullanımdan sonra 2/3 kalır; kalanın 1/4'ü 2/3 × 1/4 = 2/12 = 1/6'dır. Toplam kullanılan 1/3 + 1/6 = 1/2, depoda yarısı kalır.",
        "<strong>Paylaştırma:</strong> 3/4 kilogram peynir 6 kişiye eşit paylaştırılıyor. Kişi başına 3/4 ÷ 6 = 3/4 × 1/6 = 3/24 = 1/8 kilogram, yani 125 gram düşer.",
        "<strong>Tarif ölçekleme:</strong> 4 kişilik tarifte 2/3 su bardağı süt varsa 6 kişi için 2/3 × 6/4 = 12/12 = 1 su bardağı süt gerekir."
      ],
      after: [
        "\"Kalanın\" ifadesini görmezden gelip ikinci kesri bütüne uygulamak, bu tür sorularda en sık yapılan hatadır. Her adımda kesrin neyin kesri olduğunu yazmak hatayı önler."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Payları ve paydaları ayrı ayrı toplamak:</strong> 1/2 + 1/3 ≠ 2/5. Doğrusu 3/6 + 2/6 = 5/6'dır.",
        "<strong>Bölmede birinci kesri ters çevirmek:</strong> Ters çevrilen her zaman ikinci kesirdir (bölen).",
        "<strong>Toplamada sadeleştirmeyi işlem ortasında yanlış yapmak:</strong> Çapraz sadeleştirme yalnızca çarpmada geçerlidir; toplamada yapılmaz.",
        "<strong>Tam sayılı kesirleri doğrudan çarpmak:</strong> 2 1/2 × 1 1/3 ≠ 2 1/6. Önce bileşik kesre çevirin.",
        "<strong>Sonucu sadeleştirmemek:</strong> 6/8 yerine 3/4 yazılmalıdır; sınavlarda sade olmayan cevap çoğu zaman eksik sayılır."
      ]
    }
  ],
  faq: [
    ["Kesirler nasıl toplanır?", "Paydalar eşitse paylar toplanır ve payda aynen yazılır. Paydalar farklıysa önce EKOK bulunarak ortak paydaya genişletilir, sonra paylar toplanır. Örneğin 2/3 + 3/4 = 8/12 + 9/12 = 17/12 = 1 5/12 olur."],
    ["Paydası farklı kesirler nasıl çıkarılır?", "Paydaların EKOK'u bulunur ve her iki kesir bu ortak paydaya genişletilir. Ardından paylar çıkarılır, payda aynen yazılır ve sonuç sadeleştirilir. Örneğin 5/6 − 1/4 = 10/12 − 3/12 = 7/12 bulunur."],
    ["Kesir nasıl sadeleştirilir?", "Pay ve payda, ikisini de tam bölen ortak bir sayıya bölünür. En sade hâl için pay ve paydanın en büyük ortak böleni kullanılır. 18/24 kesrinde EBOB 6 olduğu için kesir 3/4'e sadeleşir."],
    ["Bileşik kesir tam sayılı kesre nasıl çevrilir?", "Pay paydaya bölünür; bölüm tam kısım, kalan yeni pay olur ve payda aynı kalır. Örneğin 17/5 için 17 bölü 5 eşittir 3 kalan 2 olduğundan 17/5 = 3 2/5 şeklinde yazılır."],
    ["Kesirlerde bölme nasıl yapılır?", "Birinci kesir aynen yazılır, bölme işareti çarpmaya çevrilir ve ikinci kesir ters çevrilerek çarpılır. Örneğin 3/4 ÷ 2/5 = 3/4 × 5/2 = 15/8 = 1 7/8 sonucu bulunur."],
    ["Kesirler nasıl sıralanır?", "Paydalar eşitse payı büyük olan, paylar eşitse paydası küçük olan kesir büyüktür. İkisi de farklıysa paydalar EKOK ile eşitlenip paylar karşılaştırılır; 3/5, 5/8 ve 2/3 küçükten büyüğe bu sırayla dizilir."],
    ["Payda eşitlemede EKOK neden kullanılır?", "EKOK, paydaların hepsine tam bölünen en küçük sayıdır; bu yüzden ortak payda olarak kullanıldığında sayılar gereğinden büyümez. Paydaları çarpmak da çalışır ama daha büyük sayılar ve sonunda daha fazla sadeleştirme gerektirir."],
    ["Ondalık sayı kesre nasıl çevrilir?", "Virgül kaldırılarak sayı paya yazılır, paydaya virgülden sonraki basamak sayısı kadar sıfırı olan 10'un kuvveti yazılır ve kesir sadeleştirilir. Örneğin 0,75 = 75/100 = 3/4 olur."]
  ],
  tools: ["kesir-hesapla", "kesir-sadelestir", "bilesik-kesir-cevir", "kesir-karsilastir"],
  related: ["ebob-ekok-nasil-bulunur", "oran-oranti-nasil-cozulur", "asal-sayilar-nedir"],
  sources: [
    ["MEB – Matematik dersi öğretim programı", "https://www.meb.gov.tr/"],
    ["MEB EBA – Eğitim içerikleri", "https://www.eba.gov.tr/"]
  ]
};
