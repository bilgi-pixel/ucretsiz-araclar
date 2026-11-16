export default {
  slug: "tam-sayilarla-islemler-isaret-kurallari",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Tam Sayılarla İşlemler: Eksi ile Eksi Neden Artı? İşaret Kuralları",
  pageTitle: "Tam Sayılarla İşlemler ve İşaret Kuralları: Eksi Çarpı Eksi",
  description: "Tam sayılarla toplama, çıkarma, çarpma ve bölme nasıl yapılır? Eksi çarpı eksi neden artı, sayı doğrusu, mutlak değer ve çözümlü 7. sınıf örnekleri.",
  keywords: ["tam sayılarla işlemler", "eksi çarpı eksi", "işaret kuralları", "negatif sayılarla toplama", "tam sayılarla çarpma bölme", "7. sınıf tam sayılar", "sayı doğrusu", "ters işaretli sayıların toplamı"],
  lead: "Tam sayılarla işlemlerde iki temel kural vardır: <strong>aynı işaretli sayılar toplanırken mutlak değerler toplanıp ortak işaret yazılır</strong>, ters işaretlilerde büyük mutlak değerden küçük çıkarılıp büyüğün işareti yazılır; çarpma ve bölmede ise aynı işaretler artı, farklı işaretler eksi verir. Eksi ile eksinin çarpımının artı olması bir ezber değil, sayı doğrusu ve dağılma özelliğinden çıkan bir sonuçtur. Bu sayfada kuralları gerekçeleriyle, çözümlü örneklerle ve öğrencilerin en sık yaptığı hatalarla anlatıyoruz.",
  kisaCevap: [
    "Tam sayılar; negatif tam sayılar, sıfır ve pozitif tam sayılardan oluşur: ..., −3, −2, −1, 0, 1, 2, 3, ...",
    "Aynı işaretli iki sayının toplamı: mutlak değerler toplanır, ortak işaret konur; (−4) + (−6) = −10.",
    "Ters işaretli iki sayının toplamı: büyük mutlak değerden küçük çıkarılır, büyüğün işareti konur; (−9) + 5 = −4.",
    "Çıkarma, çıkanın ters işaretlisini eklemektir: 3 − (−7) = 3 + 7 = 10.",
    "Çarpma ve bölmede aynı işaretler (+), farklı işaretler (−) verir; (−6) × (−2) = 12, (−12) ÷ 3 = −4.",
    "Çok çarpanlı işlemde eksi işaretli çarpan sayısı çiftse sonuç pozitif, tekse negatiftir."
  ],
  figure: {
    alt: "Sayı doğrusu üzerinde eksi üçten başlayıp sağa beş birim gidilerek artı ikiye ulaşılması ve altta çarpma-bölme işaret tablosu.",
    caption: "Toplama, sayı doğrusunda yürümektir: pozitif sayı eklemek sağa, negatif sayı eklemek sola gitmek demektir. Alttaki tablo çarpma ve bölmedeki dört işaret durumunu özetler.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ok1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="p"/></marker></defs>
  <text x="360" y="30" class="lg b mid">Sayı doğrusunda (−3) + 5 = 2</text>
  <line x1="40" y1="130" x2="680" y2="130" class="st sw" fill="none"/>
  <g class="sm mid">
    <line x1="80" y1="122" x2="80" y2="138" class="st" fill="none"/><text x="80" y="160">−5</text>
    <line x1="140" y1="122" x2="140" y2="138" class="st" fill="none"/><text x="140" y="160">−4</text>
    <line x1="200" y1="122" x2="200" y2="138" class="st" fill="none"/><text x="200" y="160" class="b p">−3</text>
    <line x1="260" y1="122" x2="260" y2="138" class="st" fill="none"/><text x="260" y="160">−2</text>
    <line x1="320" y1="122" x2="320" y2="138" class="st" fill="none"/><text x="320" y="160">−1</text>
    <line x1="380" y1="118" x2="380" y2="142" class="st sw" fill="none"/><text x="380" y="160" class="b">0</text>
    <line x1="440" y1="122" x2="440" y2="138" class="st" fill="none"/><text x="440" y="160">1</text>
    <line x1="500" y1="122" x2="500" y2="138" class="st" fill="none"/><text x="500" y="160" class="b ok">2</text>
    <line x1="560" y1="122" x2="560" y2="138" class="st" fill="none"/><text x="560" y="160">3</text>
    <line x1="620" y1="122" x2="620" y2="138" class="st" fill="none"/><text x="620" y="160">4</text>
  </g>
  <circle cx="200" cy="130" r="8" class="p"/>
  <circle cx="500" cy="130" r="8" class="ok"/>
  <path d="M200 110 Q350 40 496 108" class="sp sw" fill="none" marker-end="url(#ok1)"/>
  <text x="350" y="66" class="b mid p">+5: sağa 5 adım</text>
  <text x="200" y="196" class="sm mid t2">başlangıç</text>
  <text x="500" y="196" class="sm mid ok b">sonuç</text>
  <text x="380" y="196" class="sm mid mu">negatifler solda · pozitifler sağda</text>
  <rect x="40" y="222" width="640" height="180" rx="10" class="sf sb"/>
  <text x="360" y="252" class="b mid">Çarpma ve bölmede işaret kuralı</text>
  <g class="mid">
    <rect x="70" y="268" width="135" height="56" rx="8" class="oks"/><text x="137" y="294" class="b lg">(+)·(+)</text><text x="137" y="314" class="sm ok b">sonuç (+)</text>
    <rect x="220" y="268" width="135" height="56" rx="8" class="oks"/><text x="287" y="294" class="b lg">(−)·(−)</text><text x="287" y="314" class="sm ok b">sonuç (+)</text>
    <rect x="370" y="268" width="135" height="56" rx="8" class="dgs"/><text x="437" y="294" class="b lg">(+)·(−)</text><text x="437" y="314" class="sm dg b">sonuç (−)</text>
    <rect x="520" y="268" width="135" height="56" rx="8" class="dgs"/><text x="587" y="294" class="b lg">(−)·(+)</text><text x="587" y="314" class="sm dg b">sonuç (−)</text>
  </g>
  <text x="360" y="352" class="mid">Örnek: (−6) × (−2) = 12 · (−12) ÷ 3 = −4</text>
  <text x="360" y="380" class="sm mid t2">Eksi çarpan sayısı çift ise sonuç artı, tek ise eksi</text>
</svg>`
  },
  sections: [
    {
      h: "Tam sayı nedir, sayı doğrusunda nasıl sıralanır?",
      p: [
        "<strong>Tam sayılar</strong>, sayma sayılarına (1, 2, 3, ...) sıfırı ve bu sayıların negatif karşılıklarını eklediğimizde elde ettiğimiz kümedir. Matematikte bu küme <strong>Z</strong> harfiyle gösterilir. Kesirli ya da ondalıklı değerler (½, 0,75, −2,5) tam sayı değildir; tam sayılar sayı doğrusunda yalnızca eşit aralıklı noktalara karşılık gelir.",
        "Sayı doğrusunda sıfırın sağında pozitif, solunda negatif tam sayılar bulunur. Sağa gittikçe sayılar büyür, sola gittikçe küçülür. Bu nedenle −2, −8'den büyüktür; çünkü sayı doğrusunda daha sağdadır. Öğrencilerin ilk takıldığı yer burasıdır: \"8 büyük sayıdır, o hâlde −8 de büyüktür\" düşüncesi yanlıştır.",
        "Bir sayının sıfıra olan uzaklığına <strong>mutlak değer</strong> denir ve |a| biçiminde yazılır: |−7| = 7, |7| = 7. Mutlak değer her zaman sıfır ya da pozitiftir; işlem kurallarında sık sık \"mutlak değeri büyük olan\" ifadesini kullanacağımız için bu kavramı iyi oturtmak gerekir. Ayrıntısı için [[bilgi:mutlak-deger-nedir-nasil-cozulur|mutlak değer nedir yazımıza]] bakabilirsiniz."
      ],
      table: {
        head: ["Karşılaştırma", "Doğru sıralama", "Neden"],
        rows: [
          ["−2 ile −8", "−8 < −2", "−2 sıfıra daha yakın, daha sağda"],
          ["0 ile −1", "−1 < 0", "Her negatif sayı sıfırdan küçüktür"],
          ["−15 ile 3", "−15 < 3", "Her negatif sayı her pozitiften küçüktür"],
          ["−4, 6, −9, 0, 2", "−9 < −4 < 0 < 2 < 6", "Soldan sağa okunur"]
        ]
      }
    },
    {
      h: "Negatif sayılarla toplama: aynı ve ters işaret kuralı",
      p: [
        "Toplamayı sayı doğrusunda yürümek gibi düşünün. İlk sayı başlangıç noktanızdır; pozitif bir sayı eklemek sağa, negatif bir sayı eklemek sola o kadar adım atmak demektir. (−3) + 5 işleminde −3'ten başlayıp sağa 5 adım gidersiniz ve 2'ye varırsınız. Yukarıdaki görsel tam olarak bu yürüyüşü gösterir.",
        "Her seferinde sayı doğrusu çizmek pratik olmadığı için bu yürüyüş iki kurala dönüştürülür. Kuralların arkasındaki mantığı bilmek, ezberin unutulduğu sınav anında sizi kurtarır."
      ],
      formula: "Aynı işaretli: |a| + |b|, ortak işaret → (−4) + (−6) = −10\nTers işaretli: |büyük| − |küçük|, büyüğün işareti → (−9) + 5 = −4",
      ol: [
        "İki sayının işaretine bakın. Aynıysa mutlak değerleri toplayın ve ortak işareti başa yazın: (+7) + (+8) = +15, (−7) + (−8) = −15.",
        "İşaretler farklıysa mutlak değerleri karşılaştırın: (−9) + 5 için |−9| = 9 ve |5| = 5.",
        "Büyük mutlak değerden küçüğü çıkarın: 9 − 5 = 4.",
        "Sonuca mutlak değeri büyük olan sayının işaretini verin: 9 negatif sayıya ait olduğu için sonuç −4'tür."
      ],
      after: [
        "Ters işaretli iki sayı toplandığında sonucun neden büyüğün işaretini aldığını borç-alacak örneğiyle düşünebilirsiniz: 9 lira borcunuz ve 5 lira alacağınız varsa, hesap kapandığında hâlâ 4 lira borçlusunuzdur. Borç büyük olduğu için sonuç borç (negatif) tarafında kalır. Mutlak değerleri eşit ters işaretli iki sayının toplamı ise her zaman sıfırdır: (−6) + 6 = 0. Bu sayılara <strong>toplama işlemine göre ters</strong> sayılar denir."
      ]
    },
    {
      h: "Tam sayılarla çıkarma: çıkanın tersini eklemek",
      p: [
        "Çıkarma işlemi, tam sayılarda ayrı bir kural gerektirmez; her çıkarma bir toplamaya çevrilebilir. Kural şudur: <strong>eksilen aynen yazılır, çıkarma işareti toplamaya dönüşür ve çıkanın işareti değiştirilir.</strong> Bu dönüşümden sonra yukarıdaki toplama kuralları uygulanır.",
        "Neden böyle olduğunu sıcaklık örneğiyle görebilirsiniz. Sabah −7 °C, öğlen 3 °C ölçülmüşse sıcaklık farkı 3 − (−7) ile bulunur. Termometrede −7'den 3'e çıkmak için 10 derece yükselmek gerekir; demek ki 3 − (−7) = 10'dur. Bu da 3 + 7 işleminin sonucuyla aynıdır."
      ],
      table: {
        head: ["İşlem", "Toplamaya çevrilmiş hâli", "Sonuç"],
        rows: [
          ["8 − 12", "8 + (−12)", "−4"],
          ["−5 − 6", "(−5) + (−6)", "−11"],
          ["3 − (−7)", "3 + 7", "10"],
          ["−4 − (−9)", "(−4) + 9", "5"],
          ["−10 − (−3)", "(−10) + 3", "−7"]
        ],
        caption: "İki eksinin yan yana gelmesi (− (−)) artıya dönüşür; artı ile eksinin yan yana gelmesi (+ (−) ya da − (+)) eksi olur."
      }
    },
    {
      h: "Eksi ile eksinin çarpımı neden artıdır?",
      p: [
        "Çarpma, tekrarlı toplamadır: 3 × (−2), üç tane −2'nin toplamıdır ve −6 eder. Bu yüzden pozitif ile negatifin çarpımı negatiftir. Asıl merak edilen ise iki negatifin çarpımıdır; (−3) × (−2) için \"−3 tane −2\" demek anlamsız göründüğü için başka bir yoldan gitmek gerekir.",
        "En ikna edici gerekçe <strong>örüntü</strong> ve <strong>dağılma özelliği</strong>dir. Aşağıdaki diziyi yukarıdan aşağı okuyun: her satırda ilk çarpan bir azalırken sonuç 2 artar. Bu düzen bozulmadan devam ederse sıfırın altına indiğimizde sonuçlar pozitif olmak zorundadır."
      ],
      formula: "3 × (−2) = −6\n2 × (−2) = −4\n1 × (−2) = −2\n0 × (−2) = 0\n(−1) × (−2) = 2\n(−2) × (−2) = 4\n(−3) × (−2) = 6",
      after: [
        "Cebirsel gerekçe de aynı sonucu verir. (−3) × [2 + (−2)] ifadesinde köşeli parantezin içi sıfır olduğu için sonuç sıfırdır. Dağılma özelliğiyle açarsak (−3) × 2 + (−3) × (−2) = 0 olur. İlk terim −6 olduğuna göre ikinci terimin +6 olması gerekir; aksi hâlde toplam sıfır çıkmaz. Yani \"eksi çarpı eksi artıdır\" kuralı, sayıların bildiğimiz özelliklerini korumanın tek yoludur.",
        "Günlük dilde de benzer bir mantık vardır: \"Bir borcu silmek\" kazanç anlamına gelir. Negatif bir şeyi (borç) negatif yönde değiştirmek (silmek), sonucu pozitife çevirir."
      ]
    },
    {
      h: "Tam sayılarla çarpma ve bölmede işaret belirleme",
      p: [
        "Çarpma ve bölmede işaret kuralı aynıdır ve dört durumdan ibarettir: (+) ile (+) ve (−) ile (−) sonucu pozitif yapar; (+) ile (−) ya da (−) ile (+) negatif yapar. Önce işareti belirleyin, sonra sayıları işaretsiz hâlde çarpın ya da bölün. Bu sıra, işlem hatalarını büyük ölçüde azaltır.",
        "Bölme, çarpmanın tersi olduğu için ayrı bir ezber gerekmez: (−12) ÷ 3 = −4'tür, çünkü 3 × (−4) = −12. Sıfırın herhangi bir sayıya bölümü sıfırdır, ancak bir sayının sıfıra bölümü tanımsızdır; bu kural negatif sayılarda da geçerlidir."
      ],
      table: {
        head: ["İşlem", "İşaret", "Sayısal kısım", "Sonuç"],
        rows: [
          ["(−6) × (−2)", "(−)(−) = +", "6 × 2 = 12", "12"],
          ["(−7) × 4", "(−)(+) = −", "7 × 4 = 28", "−28"],
          ["(−36) ÷ (−9)", "(−)(−) = +", "36 ÷ 9 = 4", "4"],
          ["45 ÷ (−5)", "(+)(−) = −", "45 ÷ 5 = 9", "−9"],
          ["(−2) × (−3) × (−5)", "üç eksi, tek → −", "2 × 3 × 5 = 30", "−30"],
          ["(−1) × (−2) × 3 × (−4) × (−5)", "dört eksi, çift → +", "1 × 2 × 3 × 4 × 5 = 120", "120"]
        ]
      },
      after: [
        "Çok sayıda çarpan olduğunda işaret, eksi işaretli çarpanların sayısına bakılarak tek adımda bulunur: çift sayıda eksi birbirini götürür ve sonuç pozitif olur, tek sayıda eksi kalırsa sonuç negatiftir. Aynı mantık üslü sayılara da uygulanır: (−2)<sup>4</sup> = 16, (−2)<sup>3</sup> = −8. Dikkat: −2<sup>4</sup> yazımında üs yalnızca 2'ye aittir ve sonuç −16'dır; parantez farkı sınavlarda sık sorulur."
      ]
    },
    {
      h: "Çözümlü örnekler: işlem önceliğiyle birlikte",
      p: [
        "Karma işlemlerde önce parantez, sonra üs, sonra çarpma-bölme (soldan sağa), en son toplama-çıkarma (soldan sağa) yapılır. İşaret kuralları her adımda ayrı ayrı uygulanır. Aşağıdaki örnekler 6. ve 7. sınıf düzeyindedir."
      ],
      ol: [
        "<strong>(−8) + 3 × (−4)</strong>: Önce çarpma: 3 × (−4) = −12. Sonra toplama: (−8) + (−12) = −20.",
        "<strong>15 − (−5) ÷ 5</strong>: Önce bölme: (−5) ÷ 5 = −1. Sonra 15 − (−1) = 15 + 1 = 16.",
        "<strong>(−3 − 7) ÷ (−2)</strong>: Parantez: −3 − 7 = −10. Bölme: (−10) ÷ (−2) = 5.",
        "<strong>−4 × (6 − 9) + (−2)<sup>3</sup></strong>: Parantez: 6 − 9 = −3. Üs: (−2)<sup>3</sup> = −8. Çarpma: −4 × (−3) = 12. Toplama: 12 + (−8) = 4.",
        "<strong>Problem:</strong> Bir dalgıç deniz seviyesinin 18 metre altındadır ve her dakika 3 metre yükselmektedir. 4 dakika sonra konumu: −18 + 4 × 3 = −18 + 12 = −6, yani deniz seviyesinin 6 metre altıdır."
      ],
      after: [
        "Sonucunuzu kontrol etmek için [[arac:hesap-makinesi|online hesap makinesini]] kullanabilirsiniz; negatif sayıyı parantez içinde girmek, işaretin doğru yorumlanmasını sağlar. Bir dizi tam sayıyı küçükten büyüğe dizmek için de [[arac:sayi-siralama|sayı sıralama aracı]] negatif değerleri doğru sıralar."
      ]
    },
    {
      h: "Günlük hayatta negatif sayılar nerede kullanılır?",
      p: [
        "Negatif sayılar soyut bir kavram değildir; bir başlangıç noktasının \"altını\" ya da \"gerisini\" anlatmak gereken her yerde karşımıza çıkarlar. Bu örnekler, öğrencilerin işaret kurallarını anlamlandırmasına da yardım eder."
      ],
      ul: [
        "<strong>Sıcaklık:</strong> Kışın termometrenin −5 °C göstermesi, sıfırın 5 derece altını anlatır. Gündüz ile gece arasındaki fark çıkarma işlemiyle bulunur.",
        "<strong>Banka hesabı:</strong> Ek hesaptan kullanılan tutar bakiyede eksi olarak görünür. Borç kapandığında bakiye sıfıra döner.",
        "<strong>Deniz seviyesi ve kat numaraları:</strong> Bodrum katlar −1, −2 diye numaralanır; denizaltının derinliği negatif yükseklik olarak ifade edilir.",
        "<strong>Gol averajı:</strong> 12 gol atıp 15 gol yiyen takımın averajı −3'tür. Puan durumunda bu değer doğrudan sıralamayı etkiler.",
        "<strong>Zaman çizelgesi:</strong> Milattan önceki yıllar ve geri sayımlar, sıfır noktasından önceki anları gösterir."
      ]
    },
    {
      h: "Sık yapılan hatalar ve kontrol yolları",
      ul: [
        "<strong>Toplamada da \"eksi eksi artı\" demek:</strong> (−4) + (−6) sonucu +10 değil, −10'dur. \"Aynı işaret artı yapar\" kuralı yalnızca çarpma ve bölme içindir.",
        "<strong>Büyüğün işaretini değil, ilk sayının işaretini yazmak:</strong> 3 + (−8) sonucu −5'tir; sonuç ilk sayıya değil, mutlak değeri büyük olana göre işaret alır.",
        "<strong>Çıkarmada çıkanın işaretini değiştirmeyi unutmak:</strong> −2 − (−5) işleminde −5 artıya döner: −2 + 5 = 3.",
        "<strong>Parantezsiz üs:</strong> −3<sup>2</sup> = −9, (−3)<sup>2</sup> = 9. Üssün hangi sayıya ait olduğunu parantez belirler.",
        "<strong>Negatif sayıları sıralarken rakama bakmak:</strong> −12, −3'ten küçüktür. Sayı doğrusunu zihninizde canlandırmak en güvenli kontroldür.",
        "<strong>İşlem önceliğini atlamak:</strong> −6 + 4 × 2 işleminde önce çarpma yapılır: −6 + 8 = 2. Soldan sağa doğrudan gidip (−2) × 2 = −4 bulmak yanlıştır."
      ],
      after: [
        "Kesirli ve ondalıklı negatif sayılarda da aynı işaret kuralları geçerlidir; yalnızca sayısal kısım farklı hesaplanır. Bir sonraki adım için [[bilgi:kesirlerle-islemler|kesirlerle işlemler]] ve bilgisayarların negatif sayıları nasıl sakladığını merak edenler için [[bilgi:ikiye-tumleyen-negatif-sayilar-binary|ikiye tümleyen gösterimi]] yazılarımıza göz atabilirsiniz. İki sayı arasındaki uzaklığı |a − b| ile görmek isterseniz [[arac:mutlak-deger-hesapla|mutlak değer hesaplama aracı]] işinizi görür."
      ]
    }
  ],
  faq: [
    ["Tam sayı nedir?", "Tam sayılar; negatif tam sayılar, sıfır ve pozitif tam sayılardan oluşan kümedir ve Z harfiyle gösterilir. Kesirli ya da ondalıklı sayılar bu kümeye dahil değildir, örneğin −4, 0 ve 9 tam sayıdır ama 2,5 değildir."],
    ["Negatif sayılarla toplama nasıl yapılır?", "İşaretler aynıysa mutlak değerler toplanır ve ortak işaret yazılır; işaretler farklıysa büyük mutlak değerden küçük çıkarılır ve büyüğün işareti yazılır. Örneğin (−7) + (−2) = −9, (−7) + 2 = −5 olur."],
    ["Eksi ile eksinin çarpımı neden artıdır?", "Çünkü sayıların dağılma özelliğinin bozulmaması için böyle olmak zorundadır: (−3) × (2 + (−2)) sıfır olduğuna göre (−3) × 2 = −6 ise (−3) × (−2) mutlaka +6 olmalıdır. Örüntü yöntemi de aynı sonucu gösterir."],
    ["Tam sayılarda bölmede işaret nasıl belirlenir?", "Bölmede çarpmadaki kural aynen uygulanır: bölünen ve bölen aynı işaretliyse bölüm pozitif, farklı işaretliyse negatiftir. Önce işareti belirleyip sonra sayıları işaretsiz bölmek en kolay yoldur, örneğin (−48) ÷ 6 = −8."],
    ["Sayı doğrusunda tam sayılar nasıl sıralanır?", "Sıfırın sağında pozitif, solunda negatif sayılar bulunur ve sağa gidildikçe sayı büyür. Bu nedenle −1, −10'dan büyüktür. Sıralama yaparken sayının rakamına değil, sayı doğrusundaki konumuna bakmak gerekir."],
    ["Mutlak değer işlemlerde nasıl kullanılır?", "Mutlak değer, bir sayının sıfıra uzaklığıdır ve ters işaretli sayıları toplarken hangi sayının büyük olduğunu belirlemek için kullanılır. Sonucun sayısal kısmı mutlak değerlerin farkından, işareti ise mutlak değeri büyük olandan gelir."],
    ["Ters işaretli iki sayı toplanınca sonuç neden büyüğün işaretini alır?", "Çünkü küçük mutlak değerli sayı, büyüğün yalnızca bir kısmını götürür; geriye kalan kısım hâlâ büyük sayının yönündedir. 9 lira borç ile 5 lira alacak birleşince 4 lira borç kalması bu durumun günlük hayattaki karşılığıdır."],
    ["Günlük hayatta negatif sayılar nerede kullanılır?", "Sıfırın altındaki hava sıcaklıkları, banka hesabındaki eksi bakiye, bodrum kat numaraları, deniz seviyesinin altındaki derinlikler ve futboldaki gol averajı negatif sayıların en bilinen kullanım alanlarıdır."],
    ["Çıkarma işlemi toplamaya nasıl çevrilir?", "Eksilen aynen yazılır, çıkarma işareti toplamaya çevrilir ve çıkanın işareti değiştirilir. Örneğin −4 − (−9) işlemi (−4) + 9 biçimine dönüşür ve sonuç 5 olur; ardından normal toplama kuralları uygulanır."]
  ],
  tools: ["hesap-makinesi", "mutlak-deger-hesapla", "sayi-siralama"],
  related: ["mutlak-deger-nedir-nasil-cozulur", "kesirlerle-islemler", "ikiye-tumleyen-negatif-sayilar-binary"],
  sources: [
    ["MEB – Ortaokul Matematik Dersi Öğretim Programı", "https://www.meb.gov.tr/"]
  ]
};
