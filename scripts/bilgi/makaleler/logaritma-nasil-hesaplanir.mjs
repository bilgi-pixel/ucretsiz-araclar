export default {
  slug: "logaritma-nasil-hesaplanir",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Logaritma Nasıl Hesaplanır? Log Kuralları, ln ve Hesap Makinesiz Çözüm",
  pageTitle: "Logaritma Nasıl Hesaplanır? Log Kuralları, ln ve Örnekler",
  description: "Logaritma bir sayıyı elde etmek için tabanın kaçıncı kuvvetinin alınacağını verir: log₂8 = 3. Log kuralları, log 2 ve log 3 değerleri, ln, taban değiştirme ve örnekler.",
  keywords: ["logaritma nasıl hesaplanır", "logaritma kuralları", "log 2 kaçtır", "ln nedir", "logaritma taban değiştirme", "üslü sayılar ve logaritma", "logaritma örnek soru", "hesap makinesinde logaritma"],
  lead: "Logaritma, <strong>bir sayıyı elde etmek için tabanın kaçıncı kuvvetinin alınması gerektiğini veren işlemdir</strong>: log<sub>a</sub>b = x ise a<sup>x</sup> = b'dir. Örneğin 2<sup>3</sup> = 8 olduğu için log<sub>2</sub>8 = 3, 10<sup>2</sup> = 100 olduğu için log 100 = 2'dir. Tabanı yazılmayan log 10 tabanlı, ln ise e ≈ 2,718 tabanlı doğal logaritmadır. Hesap makinesi olmadan çözüm için log 2 ≈ 0,3010 ve log 3 ≈ 0,4771 değerleri ile çarpım, bölüm ve kuvvet kurallarını bilmek yeterlidir. Bu yazıda tanımı, kuralları, taban değiştirmeyi ve günlük hayattaki kullanımları çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Tanım: log<sub>a</sub>b = x ⇔ a<sup>x</sup> = b; taban a > 0 ve a ≠ 1, sayı b > 0 olmalıdır.",
    "Çarpım: log(x·y) = log x + log y; bölüm: log(x ÷ y) = log x − log y; kuvvet: log x<sup>n</sup> = n · log x.",
    "Taban değiştirme: log<sub>a</sub>b = log b ÷ log a = ln b ÷ ln a.",
    "Ezberlenecek değerler: log 2 ≈ 0,3010, log 3 ≈ 0,4771, log 5 ≈ 0,6990, log 7 ≈ 0,8451.",
    "log yazılınca taban 10, ln yazılınca taban e ≈ 2,71828'dir; ln 2 ≈ 0,6931, ln 10 ≈ 2,3026.",
    "Her tabanda log<sub>a</sub>1 = 0 ve log<sub>a</sub>a = 1'dir; negatif sayının ve sıfırın reel logaritması yoktur."
  ],
  figure: {
    alt: "Logaritmik cetvel: 1, 10, 100 ve 1000 eşit aralıklarla yerleşmiş, altında log değerleri 0, 1, 2, 3; 2, 3 ve 5 sayılarının 0,301, 0,477 ve 0,699 konumları; üst kısımda 2 üzeri 3 eşittir 8 ve log2 8 eşittir 3 dönüşümü.",
    caption: "Logaritmik ölçekte her 10 kat büyüme aynı uzunlukta bir adımdır. 2, 3 ve 5 sayıları 1 ile 10 arasında log değerlerinin gösterdiği yere düşer. Üstteki kart, üslü ifade ile logaritmanın aynı ilişkinin iki yazımı olduğunu gösterir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Üs ile logaritma aynı ilişkidir</text>
  <rect x="80" y="50" width="250" height="80" rx="10" class="ps"/>
  <text x="205" y="84" class="xl mid">2³ = 8</text>
  <text x="205" y="114" class="sm mid">taban · üs · sonuç</text>
  <rect x="390" y="50" width="250" height="80" rx="10" class="oks"/>
  <text x="515" y="84" class="xl mid">log₂ 8 = 3</text>
  <text x="515" y="114" class="sm mid">"2'nin kaçıncı kuvveti 8?"</text>
  <line x1="334" y1="90" x2="380" y2="90" class="sp sw" fill="none"/>
  <polygon points="380,83 390,90 380,97" class="p"/>
  <text x="360" y="176" class="b mid">Logaritmik cetvel (10 tabanı)</text>
  <line x1="60" y1="240" x2="660" y2="240" class="st sw" fill="none"/>
  <g class="mid">
    <line x1="60" y1="226" x2="60" y2="254" class="st sw" fill="none"/><text x="60" y="216" class="b">1</text><text x="60" y="276" class="sm">log = 0</text>
    <line x1="260" y1="226" x2="260" y2="254" class="st sw" fill="none"/><text x="260" y="216" class="b">10</text><text x="260" y="276" class="sm">1</text>
    <line x1="460" y1="226" x2="460" y2="254" class="st sw" fill="none"/><text x="460" y="216" class="b">100</text><text x="460" y="276" class="sm">2</text>
    <line x1="660" y1="226" x2="660" y2="254" class="st sw" fill="none"/><text x="660" y="216" class="b">1000</text><text x="660" y="276" class="sm">3</text>
  </g>
  <circle cx="120" cy="240" r="6" class="p"/><circle cx="155" cy="240" r="6" class="p"/><circle cx="200" cy="240" r="6" class="p"/>
  <text x="120" y="306" class="sm mid p b">2</text><text x="155" y="306" class="sm mid p b">3</text><text x="200" y="306" class="sm mid p b">5</text>
  <rect x="60" y="322" width="600" height="60" rx="8" class="sf sb"/>
  <text x="80" y="346">log 2 ≈ 0,301 · log 3 ≈ 0,477 · log 5 ≈ 0,699</text>
  <text x="80" y="370" class="sm t2">log 6 = log 2 + log 3 ≈ 0,778 · log 50 = 2 − log 2 ≈ 1,699</text>
</svg>`
  },
  sections: [
    {
      h: "Logaritma nedir?",
      p: [
        "Üslü sayılarda tabanı ve üssü bilip sonucu ararız: 2<sup>5</sup> kaçtır? Cevap 32'dir. Logaritma bu sorunun tersini sorar: 2'nin kaçıncı kuvveti 32 eder? Cevap 5'tir ve log<sub>2</sub>32 = 5 diye yazılır. Kısacası logaritma, <strong>bilinmeyen üssü bulma işlemidir</strong>.",
        "log<sub>a</sub>b ifadesinde a'ya <strong>taban</strong>, b'ye logaritması alınan sayı denir. Tanımın anlamlı olması için taban pozitif olmalı ve 1'e eşit olmamalıdır (1'in her kuvveti 1'dir, başka sayı vermez); logaritması alınan sayı da pozitif olmalıdır. Bu yüzden log(−5) ve log 0 reel sayılarda tanımsızdır.",
        "Logaritma, 17. yüzyılda büyük sayılarla yapılan çarpmaları toplamaya, bölmeleri çıkarmaya dönüştürerek hesabı kolaylaştırmak için geliştirildi. Hesap makinesi öncesinde mühendisler ve gökbilimciler logaritma cetvelleri ve sürgülü hesap cetvelleriyle çalışıyordu. Bugün aynı fikir pH, desibel ve deprem büyüklüğü gibi ölçeklerde yaşıyor."
      ],
      formula: "log<sub>a</sub>b = x ⇔ a<sup>x</sup> = b\nKoşullar: a > 0, a ≠ 1, b > 0"
    },
    {
      h: "Logaritma nasıl hesaplanır? Tanımla çözüm",
      p: [
        "Sonucu tam sayı olan logaritmalar, sayıyı tabanın kuvveti olarak yazarak doğrudan bulunur. Bu tür sorular sınavların en temel basamağıdır."
      ],
      ol: [
        "log<sub>2</sub>64: 64 = 2<sup>6</sup> olduğu için sonuç <strong>6</strong>.",
        "log<sub>3</sub>81: 81 = 3<sup>4</sup> olduğu için sonuç <strong>4</strong>.",
        "log 1000: 1000 = 10<sup>3</sup> olduğu için sonuç <strong>3</strong>.",
        "log 0,01: 0,01 = 10<sup>−2</sup> olduğu için sonuç <strong>−2</strong>. 1'den küçük pozitif sayıların logaritması (taban 1'den büyükken) negatiftir.",
        "log<sub>4</sub>8: 4 = 2<sup>2</sup>, 8 = 2<sup>3</sup>. 4<sup>x</sup> = 8 ⇒ 2<sup>2x</sup> = 2<sup>3</sup> ⇒ x = <strong>3/2</strong>.",
        "log<sub>5</sub>√5: √5 = 5<sup>1/2</sup> olduğu için sonuç <strong>1/2</strong>.",
        "log<sub>1/2</sub>8: (1/2)<sup>x</sup> = 8 ⇒ 2<sup>−x</sup> = 2<sup>3</sup> ⇒ x = <strong>−3</strong>."
      ],
      after: [
        "Bu örneklerdeki ortak yöntem, iki tarafı da aynı tabanın kuvveti olarak yazmaktır. Üslü ifadelerin kurallarını tekrar etmek için [[bilgi:karekok-nasil-alinir|karekök ve üslü sayılar]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Logaritma kuralları",
      table: {
        head: ["Kural", "Formül", "Örnek"],
        rows: [
          ["Tabanın logaritması", "log<sub>a</sub>a = 1", "log 10 = 1, ln e = 1"],
          ["1'in logaritması", "log<sub>a</sub>1 = 0", "log<sub>7</sub>1 = 0"],
          ["Çarpım", "log<sub>a</sub>(x·y) = log<sub>a</sub>x + log<sub>a</sub>y", "log 6 = log 2 + log 3"],
          ["Bölüm", "log<sub>a</sub>(x ÷ y) = log<sub>a</sub>x − log<sub>a</sub>y", "log 5 = log 10 − log 2"],
          ["Kuvvet", "log<sub>a</sub>x<sup>n</sup> = n · log<sub>a</sub>x", "log 8 = 3 · log 2"],
          ["Tabanın kuvveti", "log<sub>a<sup>n</sup></sub>x = (1/n) · log<sub>a</sub>x", "log<sub>4</sub>x = ½ · log<sub>2</sub>x"],
          ["Taban değiştirme", "log<sub>a</sub>b = log<sub>c</sub>b ÷ log<sub>c</sub>a", "log<sub>2</sub>10 = 1 ÷ log 2"],
          ["Ters işlem", "a<sup>log<sub>a</sub>b</sup> = b", "10<sup>log 7</sup> = 7"],
          ["Ters çevirme", "log<sub>a</sub>b = 1 ÷ log<sub>b</sub>a", "log<sub>2</sub>8 = 1 ÷ log<sub>8</sub>2 = 3"]
        ]
      },
      after: [
        "En sık yapılan hata, çarpım kuralını toplama için de kullanmaktır: log(x + y) ≠ log x + log y. Benzer şekilde log x ÷ log y ifadesi log(x ÷ y) değildir; o bir taban değiştirme ifadesidir ve log<sub>y</sub>x'e eşittir."
      ]
    },
    {
      h: "log 2 ve log 3 değerleri kaçtır? Hesap makinesiz çözüm",
      p: [
        "Sınavlarda genellikle log 2 ≈ 0,3010 ve log 3 ≈ 0,4771 verilir ya da bilinmesi beklenir. Bu iki değer ve log 10 = 1 bilgisiyle, kurallar kullanılarak pek çok sayının logaritması hesaplanabilir."
      ],
      table: {
        head: ["Sayı", "Ayrıştırma", "Hesap", "log değeri"],
        rows: [
          ["4", "2²", "2 × 0,3010", "0,6021"],
          ["5", "10 ÷ 2", "1 − 0,3010", "0,6990"],
          ["6", "2 × 3", "0,3010 + 0,4771", "0,7782"],
          ["8", "2³", "3 × 0,3010", "0,9031"],
          ["9", "3²", "2 × 0,4771", "0,9542"],
          ["12", "2² × 3", "0,6021 + 0,4771", "1,0792"],
          ["15", "3 × 10 ÷ 2", "0,4771 + 1 − 0,3010", "1,1761"],
          ["0,04", "4 ÷ 100", "0,6021 − 2", "−1,3979"]
        ],
        caption: "Değerler dört ondalık basamağa yuvarlanmıştır; ara sonuçlar yuvarlandığı için son basamakta bir birimlik fark olabilir. log 7 ≈ 0,8451 ayrıca verilir, çünkü 2, 3 ve 5'ten elde edilemez."
      },
      after: [
        "Bir sayının basamak sayısını bulmak da logaritmanın pratik bir kullanımıdır: N pozitif bir tam sayıysa basamak sayısı, log N'nin tam kısmının bir fazlasıdır. 2<sup>100</sup> sayısı için log 2<sup>100</sup> = 100 × 0,30103 = 30,103; sayı <strong>31 basamaklıdır</strong>. Çok büyük ya da çok küçük sayıları bu yolla [[arac:bilimsel-gosterim-cevir|bilimsel gösterime]] çevirmek de kolaylaşır."
      ]
    },
    {
      h: "ln ile log arasındaki fark nedir?",
      p: [
        "<strong>log</strong> tabanı yazılmadan kullanıldığında 10 tabanlı (onluk) logaritma anlamına gelir. <strong>ln</strong> ise tabanı e sayısı olan <strong>doğal logaritmadır</strong>. e ≈ 2,71828 olan ve sürekli büyümeyi tanımlayan matematiksel sabittir; bileşik faizin sürekli hâle getirilmesi, nüfus artışı, radyoaktif bozunma ve ilaçların vücuttan atılması gibi süreçlerde doğal olarak ortaya çıkar.",
        "İki logaritma birbirine sabit bir çarpanla bağlıdır: ln x = log x ÷ log e ≈ 2,3026 × log x. Örneğin ln 100 = 2 × 2,3026 ≈ 4,6052'dir. Bilgisayar biliminde ise 2 tabanlı logaritma (log<sub>2</sub>) yaygındır: n elemanlı sıralı bir listede ikili arama en fazla yaklaşık log<sub>2</sub>n adımda sonuca ulaşır."
      ],
      table: {
        head: ["Gösterim", "Taban", "Nerede kullanılır?", "Örnek"],
        rows: [
          ["log x", "10", "pH, desibel, deprem ölçekleri, basamak sayısı", "log 1000 = 3"],
          ["ln x", "e ≈ 2,71828", "Sürekli büyüme ve azalma, kalkülüs, istatistik", "ln e² = 2"],
          ["log<sub>2</sub>x", "2", "Bilgisayar bilimi, bit sayısı, ikiye bölünme", "log<sub>2</sub>1024 = 10"]
        ]
      }
    },
    {
      h: "Taban değiştirme kuralı nasıl uygulanır?",
      p: [
        "Hesap makineleri genellikle yalnızca log (10 tabanı) ve ln (e tabanı) tuşları içerir. Başka bir tabanda logaritma almak için taban değiştirme kuralı kullanılır: istenen sayının logaritması tabanın logaritmasına bölünür. Hangi ortak tabanı (10 ya da e) seçtiğiniz sonucu değiştirmez."
      ],
      ol: [
        "log<sub>2</sub>10 = log 10 ÷ log 2 = 1 ÷ 0,3010 ≈ <strong>3,322</strong>.",
        "log<sub>2</sub>7 = log 7 ÷ log 2 = 0,8451 ÷ 0,3010 ≈ <strong>2,807</strong>. Kontrol: 2<sup>2,807</sup> ≈ 7.",
        "log<sub>3</sub>20 = ln 20 ÷ ln 3 ≈ 2,9957 ÷ 1,0986 ≈ <strong>2,727</strong>.",
        "<strong>Üstel denklem:</strong> 2<sup>x</sup> = 50 ise x = log 50 ÷ log 2 = (2 − 0,3010) ÷ 0,3010 ≈ <strong>5,644</strong>.",
        "<strong>Zincir kuralı:</strong> log<sub>2</sub>3 × log<sub>3</sub>8 = (log 3 ÷ log 2) × (log 8 ÷ log 3) = log 8 ÷ log 2 = <strong>3</strong>."
      ]
    },
    {
      h: "Logaritma günlük hayatta nerede kullanılır?",
      ul: [
        "<strong>pH ölçeği:</strong> pH = −log[H<sup>+</sup>]. Hidrojen iyonu derişimi 10 kat artınca pH 1 birim düşer. Ayrıntılar için [[bilgi:ph-nedir-nasil-hesaplanir|pH nedir]] yazısına bakabilirsiniz.",
        "<strong>Ses şiddeti (desibel):</strong> dB = 10 · log(I ÷ I<sub>0</sub>). Her 10 dB artış ses şiddetinin 10 katına çıkması demektir; 3 dB yaklaşık iki kattır (10 · log 2 ≈ 3,01).",
        "<strong>Deprem büyüklüğü:</strong> Büyüklük ölçekleri logaritmiktir; büyüklükteki 1 birimlik artış, sismograftaki genliğin yaklaşık 10, açığa çıkan enerjinin yaklaşık 32 katına çıkması demektir.",
        "<strong>Bileşik faizde süre:</strong> Paranın ikiye katlanma süresi n = ln 2 ÷ ln(1 + r) ile bulunur. Yıllık %40 bileşik getiride n = 0,6931 ÷ 0,3365 ≈ 2,06 yıldır. Kısa yol olan [[bilgi:72-kurali-nedir|72 kuralı]] bu formülün yaklaşığıdır.",
        "<strong>Bilgi miktarı:</strong> n farklı durumu kodlamak için log<sub>2</sub>n bit gerekir; 256 karakter için 8 bit.",
        "<strong>Fotoğrafçılıkta pozlama:</strong> Her \"stop\" ışık miktarının iki katı ya da yarısıdır; pozlama değerleri 2 tabanlı logaritmayla ifade edilir."
      ]
    },
    {
      h: "Hesap makinesinde logaritma nasıl alınır?",
      ol: [
        "10 tabanlı logaritma için <strong>log</strong> tuşuna basın, sayıyı girin ve eşittir tuşuna basın: log(50) ≈ 1,69897.",
        "Doğal logaritma için <strong>ln</strong> tuşunu kullanın: ln(50) ≈ 3,91202.",
        "Başka bir taban için taban değiştirme yapın: log<sub>2</sub>50 = log(50) ÷ log(2) ≈ 5,64386. Bazı bilimsel hesap makinelerinde doğrudan taban girilebilen ayrı bir log tuşu bulunur.",
        "Ters işlem için 10<sup>x</sup> ve e<sup>x</sup> tuşlarını kullanın: 10<sup>1,69897</sup> ≈ 50.",
        "Negatif sayı ya da sıfır girerseniz hesap makinesi hata verir; bu bir arıza değil, logaritmanın tanım koşuludur."
      ],
      after: [
        "Bilgisayarda hesap yapmak isterseniz [[arac:us-logaritma-hesapla|Üslü Sayı ve Logaritma Hesaplama]] aracı istediğiniz tabanda logaritmayı, log10, log2 ve ln değerlerini tek seferde gösterir. Dört işlem ve bilimsel fonksiyonlar için [[arac:hesap-makinesi|hesap makinesi]] de kullanılabilir. Excel'de LOG(sayı; taban), LOG10(sayı) ve LN(sayı) fonksiyonları aynı işi yapar."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Toplamın logaritmasını ayırmak:</strong> log(2 + 3) ≠ log 2 + log 3. Kural yalnızca çarpım içindir: log(2 × 3) = log 2 + log 3.",
        "<strong>Bölümleri karıştırmak:</strong> log 8 ÷ log 2 = 3'tür (taban değiştirme); log(8 ÷ 2) = log 4 ≈ 0,602'dir.",
        "<strong>Kuvveti yanlış yere almak:</strong> (log x)<sup>2</sup> ile log x<sup>2</sup> farklıdır; ikincisi 2 · log x'e eşittir.",
        "<strong>Tanım koşulunu unutmak:</strong> Logaritmalı denklemlerde bulunan köklerin, logaritması alınan ifadeyi pozitif yapıp yapmadığı mutlaka kontrol edilmelidir.",
        "<strong>log ile ln'yi karıştırmak:</strong> Hesap makinesinde ln tuşuyla bulunan değeri 10 tabanlı sanmak yaklaşık 2,3 kat hatalı sonuç verir."
      ]
    }
  ],
  faq: [
    ["Logaritma nedir?", "Logaritma, bir sayıyı elde etmek için tabanın kaçıncı kuvvetinin alınması gerektiğini veren işlemdir. 2'nin 3. kuvveti 8 olduğu için 8'in 2 tabanında logaritması 3'tür; logaritma üslü işlemin tersidir."],
    ["Logaritma nasıl hesaplanır?", "Sayı tabanın kuvveti olarak yazılabiliyorsa üs doğrudan sonuçtur: log₃81 = 4. Yazılamıyorsa log 2 ve log 3 gibi bilinen değerler ile çarpım, bölüm ve kuvvet kuralları kullanılır ya da hesap makinesinde taban değiştirilir."],
    ["Logaritma kuralları nelerdir?", "Temel kurallar şunlardır: çarpımın logaritması logaritmaların toplamı, bölümün logaritması farkı, kuvvetin logaritması üs çarpı logaritmadır. Ayrıca logaritma tabanında 1, 1'in logaritması 0'dır ve taban değiştirme kuralı geçerlidir."],
    ["log 2 ve log 3 değerleri kaçtır?", "10 tabanında log 2 yaklaşık 0,3010, log 3 yaklaşık 0,4771'dir. Bu iki değerle log 4, log 5, log 6, log 8, log 9 ve log 12 gibi pek çok değer hesap makinesi olmadan bulunabilir."],
    ["ln ile log arasındaki fark nedir?", "log tabanı yazılmadığında 10 tabanlı logaritmadır. ln ise tabanı yaklaşık 2,71828 olan e sayısı olan doğal logaritmadır. İkisi arasında ln x yaklaşık 2,3026 çarpı log x ilişkisi vardır."],
    ["Taban değiştirme kuralı nasıl uygulanır?", "Bir sayının istenen tabandaki logaritması, aynı sayının 10 ya da e tabanındaki logaritmasının tabanın logaritmasına bölünmesiyle bulunur. Örneğin log₂10, 1 bölü 0,3010 işlemiyle yaklaşık 3,322 çıkar."],
    ["Logaritma günlük hayatta nerede kullanılır?", "pH ölçeği, ses şiddetindeki desibel, deprem büyüklüğü ölçekleri, bileşik faizde paranın katlanma süresi, bilgisayardaki bit hesapları ve fotoğrafçılıktaki pozlama değerleri logaritmaya dayanır."],
    ["Hesap makinesinde logaritma nasıl alınır?", "10 tabanı için log, doğal logaritma için ln tuşu kullanılır. Başka bir taban için sayının logaritması tabanın logaritmasına bölünür; örneğin log₂50 için log 50 bölü log 2 işlemi yaklaşık 5,644 verir."],
    ["Negatif sayının logaritması alınır mı?", "Reel sayılarda alınamaz. Pozitif bir tabanın hiçbir kuvveti negatif sayı ya da sıfır vermediği için log(−5) ve log 0 tanımsızdır; hesap makinesi bu durumda hata mesajı gösterir."]
  ],
  tools: ["us-logaritma-hesapla", "bilimsel-gosterim-cevir", "hesap-makinesi", "karekok-hesapla"],
  related: ["ph-nedir-nasil-hesaplanir", "72-kurali-nedir", "karekok-nasil-alinir", "bilesik-faiz-nedir"],
  sources: [
    ["Millî Eğitim Bakanlığı – Ortaöğretim matematik dersi öğretim programı", "https://www.meb.gov.tr/"],
    ["ÖSYM – YKS sınav kılavuzu", "https://www.osym.gov.tr/"]
  ]
};
