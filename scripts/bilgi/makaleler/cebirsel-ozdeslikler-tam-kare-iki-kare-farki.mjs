export default {
  slug: "cebirsel-ozdeslikler-tam-kare-iki-kare-farki",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Cebirsel Özdeşlikler: Tam Kare ve İki Kare Farkı Nasıl Açılır?",
  pageTitle: "Cebirsel Özdeşlikler: Tam Kare ve İki Kare Farkı Açılımı",
  description: "(a+b)², (a−b)² ve iki kare farkı özdeşlikleri nasıl açılır? Alan modeliyle ispat, 99² gibi zihinden hesap, çarpanlara ayırma ve LGS tipi çözümlü örnekler.",
  keywords: ["özdeşlikler", "tam kare özdeşliği", "iki kare farkı", "(a+b)² açılımı", "(a-b)² açılımı", "8. sınıf özdeşlikler", "çarpanlara ayırma", "özdeşlik ile denklem farkı", "lgs özdeşlik soruları"],
  lead: "Tam kare özdeşliği (a + b)<sup>2</sup> = a<sup>2</sup> + 2ab + b<sup>2</sup>, iki kare farkı özdeşliği ise a<sup>2</sup> − b<sup>2</sup> = (a − b)(a + b) biçimindedir; bu eşitlikler değişkenlere hangi sayıyı verirseniz verin doğrudur. Özdeşlikler 8. sınıf \"Cebirsel İfadeler ve Özdeşlikler\" ünitesinin ve LGS matematiğinin temel araçlarıdır. Bu sayfada özdeşliğin denklemden farkını, açılımların alan modeliyle nereden geldiğini, 99<sup>2</sup> ya da 51 · 49 gibi işlemleri zihinden yapmayı ve çarpanlara ayırmayı çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Özdeşlik, değişkenin her değeri için doğru olan eşitliktir; denklem ise yalnızca bazı değerler için doğrudur.",
    "(a + b)<sup>2</sup> = a<sup>2</sup> + 2ab + b<sup>2</sup>: birincinin karesi, iki katı çarpım, ikincinin karesi.",
    "(a − b)<sup>2</sup> = a<sup>2</sup> − 2ab + b<sup>2</sup>: yalnızca ortadaki terim eksidir, son terim her zaman artıdır.",
    "a<sup>2</sup> − b<sup>2</sup> = (a − b)(a + b): iki karenin farkı, toplam ile farkın çarpımıdır.",
    "Zihinden hesap: 99<sup>2</sup> = (100 − 1)<sup>2</sup> = 9.801; 51 · 49 = 50<sup>2</sup> − 1<sup>2</sup> = 2.499.",
    "(a + b)<sup>2</sup> ≠ a<sup>2</sup> + b<sup>2</sup>; aradaki fark tam olarak 2ab'dir."
  ],
  figure: {
    alt: "Alan modeli: kenarı a+b olan büyük kare; içinde a kare, b kare ve iki tane ab dikdörtgeni. Yanında iki kare farkının kesilip yeniden dizilerek (a−b)(a+b) dikdörtgenine dönüşmesi.",
    caption: "Solda (a + b)² karesi dört parçaya ayrılır: a², b² ve iki tane ab. Sağda a² karesinden b² çıkarılınca kalan L biçimli parça kesilip yan yana konur ve kenarları (a − b) ile (a + b) olan dikdörtgen elde edilir. Sayısal örnek: a = 7, b = 3.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="180" y="30" class="lg b mid">(a + b)² alan modeli</text>
  <rect x="40" y="56" width="196" height="196" class="ps sb"/>
  <text x="138" y="160" class="xl mid">a²</text>
  <rect x="236" y="56" width="84" height="196" class="oks sb"/>
  <text x="278" y="160" class="lg b mid">ab</text>
  <rect x="40" y="252" width="196" height="84" class="oks sb"/>
  <text x="138" y="300" class="lg b mid">ab</text>
  <rect x="236" y="252" width="84" height="84" class="sf sb"/>
  <text x="278" y="300" class="lg b mid">b²</text>
  <text x="138" y="48" class="sm mid b p">a = 7</text>
  <text x="278" y="48" class="sm mid b p">b = 3</text>
  <text x="180" y="364" class="mid b">(7 + 3)² = 49 + 21 + 21 + 9 = 100</text>
  <text x="180" y="390" class="sm mid t2">a² + 2ab + b²: iki tane ab dikdörtgeni vardır</text>
  <line x1="360" y1="50" x2="360" y2="400" class="sb dash" fill="none"/>
  <text x="540" y="30" class="lg b mid">İki kare farkı</text>
  <rect x="400" y="56" width="140" height="140" class="ps sb"/>
  <rect x="480" y="136" width="60" height="60" class="dgs sb"/>
  <text x="510" y="172" class="sm b mid">−b²</text>
  <text x="440" y="100" class="lg b mid">a² − b²</text>
  <text x="470" y="216" class="sm mid t2">a² karesinden b² kesilir</text>
  <polyline points="560,126 600,126" class="st sw" fill="none"/>
  <polygon points="600,120 612,126 600,132" class="t2"/>
  <rect x="400" y="244" width="200" height="80" class="oks sb"/>
  <line x1="540" y1="244" x2="540" y2="324" class="st dash" fill="none"/>
  <text x="500" y="290" class="b mid">(a − b)(a + b)</text>
  <text x="500" y="238" class="sm mid b p">uzun kenar: a + b = 10</text>
  <text x="620" y="290" class="sm b p">a − b = 4</text>
  <text x="540" y="364" class="mid b">49 − 9 = 4 · 10 = 40</text>
  <text x="540" y="390" class="sm mid t2">L parçası yeniden dizilince dikdörtgen olur</text>
</svg>`
  },
  sections: [
    {
      h: "Özdeşlik nedir, denklemden farkı ne?",
      p: [
        "İçinde değişken bulunan her eşitlik aynı türden değildir. <strong>Denklem</strong>, değişkenin yalnızca belirli değerleri için doğru olan eşitliktir: 2x + 1 = 7 eşitliği yalnızca x = 3 için sağlanır. <strong>Özdeşlik</strong> ise değişkenlere hangi gerçek sayıyı verirseniz verin doğru kalan eşitliktir: 2(x + 3) = 2x + 6 eşitliği x yerine 0, 5 ya da −100 yazsanız da sağlanır.",
        "Bir eşitliğin özdeşlik olup olmadığını anlamanın kısa yolu iki tarafı sadeleştirip karşılaştırmaktır. İki taraf aynı ifadeye dönüşüyorsa eşitlik özdeşliktir. Bir değer bulup denemek ise yalnızca tersini kanıtlamaya yarar: tek bir değer için yanlış çıkan eşitlik özdeşlik olamaz.",
        "Okulda en çok kullanılan üç özdeşlik iki terimin toplamının karesi, farkının karesi ve iki kare farkıdır. Bu üçü hem cebirsel ifadeleri sadeleştirmede hem çarpanlara ayırmada hem de zihinden hızlı hesap yapmada kullanılır."
      ]
    },
    {
      h: "(a + b)² nasıl açılır? Tam kare özdeşliği",
      p: [
        "(a + b)<sup>2</sup> ifadesi (a + b) · (a + b) demektir. Dağılma özelliğiyle her terimi diğer parantezdeki her terimle çarparsanız a · a + a · b + b · a + b · b elde edersiniz. Ortadaki iki terim aynı olduğu için toplanır ve sonuç a<sup>2</sup> + 2ab + b<sup>2</sup> olur.",
        "Ezberlemek için şu cümle yeterlidir: <em>birincinin karesi, artı birinci ile ikincinin çarpımının iki katı, artı ikincinin karesi.</em> Örneğin (x + 5)<sup>2</sup> = x<sup>2</sup> + 10x + 25, (2x + 3)<sup>2</sup> = 4x<sup>2</sup> + 12x + 9 olur. İkinci örnekte birinci terim 2x olduğu için karesi 4x<sup>2</sup>'dir; katsayının karesini almayı unutmayın."
      ],
      formula: "(a + b)² = a² + 2ab + b²\n(a − b)² = a² − 2ab + b²\na² − b² = (a − b)(a + b)",
      after: [
        "Alan modeli bu açılımı görsel olarak ispatlar. Kenarı a + b olan bir kare çizip kenarları a ve b uzunluğunda bölerseniz içinde dört parça oluşur: alanı a<sup>2</sup> olan bir kare, alanı b<sup>2</sup> olan bir kare ve alanı ab olan iki dikdörtgen. Büyük karenin alanı parçaların toplamına eşit olduğu için (a + b)<sup>2</sup> = a<sup>2</sup> + 2ab + b<sup>2</sup>'dir. Sayısal kontrol: a = 7, b = 3 için (7 + 3)<sup>2</sup> = 100 ve 49 + 42 + 9 = 100."
      ]
    },
    {
      h: "(a − b)² açılımında orta terim neden eksidir?",
      p: [
        "(a − b)<sup>2</sup> = (a − b)(a − b) çarpımını açtığınızda a · a = a<sup>2</sup>, a · (−b) = −ab, (−b) · a = −ab ve (−b) · (−b) = +b<sup>2</sup> çıkar. Ortadaki iki terim −2ab olarak birleşir, son terim ise iki negatif sayının çarpımı olduğu için artıdır. Sonuç a<sup>2</sup> − 2ab + b<sup>2</sup>'dir.",
        "Bu yüzden farkın karesinde eksi işareti yalnızca ortadaki terimde görünür. (x − 4)<sup>2</sup> = x<sup>2</sup> − 8x + 16 doğrudur; x<sup>2</sup> − 8x − 16 yazmak en sık rastlanan hatadır. Bir sayının karesi negatif olamayacağı için açılımın son terimi her zaman pozitiftir.",
        "Pratik bir gözlem: (a − b)<sup>2</sup> ile (b − a)<sup>2</sup> aynıdır, çünkü b − a = −(a − b) ve negatif bir sayının karesi pozitifin karesine eşittir. (3 − x)<sup>2</sup> ifadesini (x − 3)<sup>2</sup> = x<sup>2</sup> − 6x + 9 olarak açabilirsiniz."
      ]
    },
    {
      h: "İki kare farkı özdeşliği",
      p: [
        "a<sup>2</sup> − b<sup>2</sup> = (a − b)(a + b) eşitliği, iki tam karenin farkının bu sayıların farkı ile toplamının çarpımına eşit olduğunu söyler. Sağ tarafı açarak doğrulayabilirsiniz: (a − b)(a + b) = a<sup>2</sup> + ab − ab − b<sup>2</sup> = a<sup>2</sup> − b<sup>2</sup>. Ortadaki terimler birbirini götürür.",
        "Alan modelinde kenarı a olan karenin bir köşesinden kenarı b olan kare kesilir. Geriye kalan L biçimli parça iki dikdörtgene ayrılıp yan yana dizildiğinde kenarları (a − b) ve (a + b) olan tek bir dikdörtgen oluşur. a = 7, b = 3 için 49 − 9 = 40 ve 4 · 10 = 40'tır.",
        "Bu özdeşlik özellikle çarpanlara ayırmada güçlüdür: x<sup>2</sup> − 9 = (x − 3)(x + 3), 4x<sup>2</sup> − 25 = (2x − 5)(2x + 5), x<sup>4</sup> − 1 = (x<sup>2</sup> − 1)(x<sup>2</sup> + 1) = (x − 1)(x + 1)(x<sup>2</sup> + 1). Toplam biçimindeki a<sup>2</sup> + b<sup>2</sup> ise gerçek sayılarda bu şekilde çarpanlarına ayrılmaz."
      ]
    },
    {
      h: "Özdeşliklerle zihinden hesap: 99², 51 · 49 ve benzerleri",
      p: [
        "Özdeşliklerin günlük hayattaki en eğlenceli kullanımı büyük sayıları kâğıt kalem olmadan çarpmaktır. Yöntem, sayıyı kolay bir yuvarlak sayıya yakın yazmaktır."
      ],
      table: {
        head: ["İşlem", "Özdeşlik yazımı", "Ara adım", "Sonuç"],
        rows: [
          ["99<sup>2</sup>", "(100 − 1)<sup>2</sup>", "10.000 − 200 + 1", "9.801"],
          ["103<sup>2</sup>", "(100 + 3)<sup>2</sup>", "10.000 + 600 + 9", "10.609"],
          ["47<sup>2</sup>", "(50 − 3)<sup>2</sup>", "2.500 − 300 + 9", "2.209"],
          ["998<sup>2</sup>", "(1.000 − 2)<sup>2</sup>", "1.000.000 − 4.000 + 4", "996.004"],
          ["51 · 49", "(50 + 1)(50 − 1)", "2.500 − 1", "2.499"],
          ["1.001 · 999", "(1.000 + 1)(1.000 − 1)", "1.000.000 − 1", "999.999"],
          ["2.025<sup>2</sup> − 2.024<sup>2</sup>", "(2.025 − 2.024)(2.025 + 2.024)", "1 · 4.049", "4.049"]
        ],
        caption: "Tüm sonuçlar doğrudan çarpma ile de kontrol edilmiştir."
      },
      after: [
        "Son satırdaki soru tipi sınavlarda çok sık gelir: iki ardışık sayının karelerinin farkı, bu iki sayının toplamına eşittir. Sonuçlarınızı [[arac:kare-kup-tablosu|Kare ve Küp Tablosu]] ile karşılaştırabilir, kare değerlerini ezberlemek için kendi tablonuzu oluşturabilirsiniz."
      ]
    },
    {
      h: "Çarpanlara ayırma ile özdeşlik ilişkisi",
      p: [
        "Özdeşliği soldan sağa okumak <strong>açmak</strong>, sağdan sola okumak <strong>çarpanlarına ayırmak</strong>tır. x<sup>2</sup> + 6x + 9 ifadesini gördüğünüzde ilk ve son terimin tam kare (x<sup>2</sup> ve 3<sup>2</sup>), ortadaki terimin de 2 · x · 3 olduğunu fark ederseniz ifadenin (x + 3)<sup>2</sup> olduğunu söyleyebilirsiniz.",
        "Bir üç terimlinin tam kare olup olmadığını denetlemek için şu adımları izleyin:"
      ],
      ol: [
        "İlk ve son terimin karekökünü bulun: 4x<sup>2</sup> − 20x + 25 için 2x ve 5.",
        "Bu iki kökün çarpımının iki katını hesaplayın: 2 · 2x · 5 = 20x.",
        "Ortadaki terim bu değere eşitse ifade tam karedir; işaret ortadaki terimin işaretidir: (2x − 5)<sup>2</sup>.",
        "Eşit değilse ifade tam kare değildir; başka çarpanlara ayırma yöntemi denenir."
      ],
      after: [
        "Çarpanlara ayırma denklemleri çözmede de işe yarar. x<sup>2</sup> − 9 = 0 denklemi (x − 3)(x + 3) = 0 biçimine gelir ve çarpanlardan biri sıfır olmak zorunda olduğu için x = 3 ya da x = −3 bulunur. İkinci derece denklemlerin genel çözüm yolu için [[bilgi:diskriminant-ikinci-derece-denklem|diskriminant yazısına]], adım adım kontrol için [[arac:denklem-cozucu|Denklem Çözücü]] aracına bakabilirsiniz."
      ]
    },
    {
      h: "LGS'de özdeşlik soruları nasıl gelir?",
      p: [
        "LGS'de özdeşlikler çoğunlukla günlük hayat bağlamında, alan modeli ya da sayı örüntüsüyle sorulur. Doğrudan açılım sorusundan çok, verilen bir şekildeki alanı cebirsel ifadeyle yazma veya bir ifadenin değerini özdeşlik kullanarak bulma istenir. Aşağıdaki çözümlü örnekler tipik soru yapılarını gösterir."
      ],
      ol: [
        "<strong>Örnek 1:</strong> a + b = 7 ve a · b = 10 ise a<sup>2</sup> + b<sup>2</sup> kaçtır? (a + b)<sup>2</sup> = a<sup>2</sup> + 2ab + b<sup>2</sup> olduğundan 49 = a<sup>2</sup> + b<sup>2</sup> + 20; buradan a<sup>2</sup> + b<sup>2</sup> = 29.",
        "<strong>Örnek 2:</strong> a − b = 3 ve a + b = 11 ise a<sup>2</sup> − b<sup>2</sup> kaçtır? İki kare farkından 3 · 11 = 33. a ile b'yi ayrı ayrı bulmaya gerek yoktur.",
        "<strong>Örnek 3:</strong> Kenarı (x + 4) cm olan kare biçimli bir bahçenin alanını açık biçimde yazınız. Alan (x + 4)<sup>2</sup> = x<sup>2</sup> + 8x + 16 cm<sup>2</sup>; x = 6 için 100 cm<sup>2</sup> çıkar.",
        "<strong>Örnek 4:</strong> Kenarı 15 m olan kare bir arsanın köşesinden kenarı 5 m olan kare bir bölüm satılıyor. Kalan alan kaç m<sup>2</sup>'dir? 15<sup>2</sup> − 5<sup>2</sup> = (15 − 5)(15 + 5) = 10 · 20 = 200 m<sup>2</sup>.",
        "<strong>Örnek 5:</strong> (2x + 3)<sup>2</sup> − (2x − 3)<sup>2</sup> ifadesinin en sade hâli nedir? İki kare farkı ile (2x + 3 − 2x + 3)(2x + 3 + 2x − 3) = 6 · 4x = 24x."
      ],
      after: [
        "Bulduğunuz açılımı bir sayı vererek kontrol etmek iyi bir alışkanlıktır: x = 5 için (2x + 3)<sup>2</sup> = 169 ve 4x<sup>2</sup> + 12x + 9 = 100 + 60 + 9 = 169. Bu tür sayısal kontrolleri [[arac:polinom-deger-hesapla|Polinom Değeri Hesaplama]] aracıyla hızlıca yapabilirsiniz."
      ]
    },
    {
      h: "Özdeşliklerde sık yapılan hatalar",
      ul: [
        "<strong>Toplamın karesini dağıtmak:</strong> (a + b)<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup> yazmak. Eksik kalan 2ab terimidir; a = 7, b = 3 için fark 42'dir.",
        "<strong>Farkın karesinde son terimi eksi yazmak:</strong> (x − 4)<sup>2</sup> = x<sup>2</sup> − 8x + 16'dır, −16 değil.",
        "<strong>Katsayının karesini almamak:</strong> (3x)<sup>2</sup> = 9x<sup>2</sup>'dir, 3x<sup>2</sup> değil.",
        "<strong>İki kare toplamını çarpanlara ayırmaya çalışmak:</strong> x<sup>2</sup> + 9 ifadesi (x + 3)(x − 3) değildir; bu çarpım x<sup>2</sup> − 9 verir.",
        "<strong>Ortak çarpanı gözden kaçırmak:</strong> 2x<sup>2</sup> − 18 ifadesinde önce 2 parantezine alın: 2(x<sup>2</sup> − 9) = 2(x − 3)(x + 3).",
        "<strong>Üslü sayı kurallarını karıştırmak:</strong> Kuvvet kuralları çarpma için geçerlidir; toplamada kullanılmaz. Konunun temeli için [[bilgi:uslu-sayilar-kurallari|üslü sayılar kuralları]] yazısına göz atabilirsiniz."
      ]
    },
    {
      h: "Konuyu kalıcı öğrenmek için öneriler",
      p: [
        "Özdeşlikleri ezberlemek yerine en az bir kez alan modeliyle kendiniz çizin. Bir kâğıda kare çizip kenarları a ve b olarak bölmek, açılımın neden iki tane ab terimi içerdiğini unutulmaz kılar. Sınav sırasında formülü hatırlayamazsanız küçük bir çizim bile sizi doğru sonuca götürür.",
        "Sonra 1'den 30'a kadar sayıların karelerini çalışın ve 99<sup>2</sup>, 101<sup>2</sup>, 49 · 51 gibi işlemleri günlük olarak zihinden yapmayı deneyin. Bu pratik, hem hesap hızınızı artırır hem de soruda gizlenen özdeşliği tanımanızı kolaylaştırır. Konunun sayı tarafını güçlendirmek isterseniz [[bilgi:karekok-nasil-alinir|karekök yazısı]] tam kare sayıları tanımaya yardımcı olur."
      ]
    }
  ],
  faq: [
    ["Özdeşlik nedir, denklemden farkı ne?", "Özdeşlik, değişkenlere verilen her değer için doğru olan eşitliktir. Denklem ise yalnızca belirli değerler için doğrudur; 2x + 1 = 7 sadece x = 3 için sağlanırken 2(x + 3) = 2x + 6 her x için doğrudur."],
    ["(a+b)² nasıl açılır?", "(a + b)<sup>2</sup> = a<sup>2</sup> + 2ab + b<sup>2</sup> biçiminde açılır: birincinin karesi, iki terimin çarpımının iki katı ve ikincinin karesi toplanır. Örneğin (x + 5)<sup>2</sup> = x<sup>2</sup> + 10x + 25 olur."],
    ["(a−b)² açılımında orta terim neden eksidir?", "Çarpım açıldığında a ile −b iki kez çarpılır ve −2ab terimi oluşur. Son terim ise (−b) · (−b) = +b<sup>2</sup> olduğu için her zaman artıdır; yani yalnızca ortadaki terim eksi işaretlidir."],
    ["İki kare farkı özdeşliği nedir?", "İki kare farkı özdeşliği a<sup>2</sup> − b<sup>2</sup> = (a − b)(a + b) eşitliğidir. İki karenin farkı, sayıların farkı ile toplamının çarpımına eşittir; x<sup>2</sup> − 9 = (x − 3)(x + 3) bunun tipik örneğidir."],
    ["Özdeşlikler zihinden hesapta nasıl kullanılır?", "Sayıyı yuvarlak bir sayıya yakın yazıp özdeşliği uygularsınız. 99<sup>2</sup> = (100 − 1)<sup>2</sup> = 10.000 − 200 + 1 = 9.801 ve 51 · 49 = 50<sup>2</sup> − 1 = 2.499 gibi işlemler bu yolla saniyeler içinde yapılır."],
    ["Çarpanlara ayırma ile özdeşlik ilişkisi nedir?", "Özdeşliği soldan sağa okumak açmak, sağdan sola okumak çarpanlarına ayırmaktır. x<sup>2</sup> + 6x + 9 ifadesinin (x + 3)<sup>2</sup>, x<sup>2</sup> − 16 ifadesinin (x − 4)(x + 4) olduğunu özdeşlikler sayesinde görürüz."],
    ["Özdeşlikler modelle nasıl gösterilir?", "Kenarı a + b olan bir kare çizilip kenarları a ve b olarak bölünür. İçinde bir a<sup>2</sup> karesi, bir b<sup>2</sup> karesi ve iki ab dikdörtgeni oluşur; bu dört alanın toplamı büyük karenin alanına, yani (a + b)<sup>2</sup>'ye eşittir."],
    ["LGS'de özdeşlik soruları nasıl gelir?", "LGS'de genellikle alan modeli, bahçe ya da arsa gibi günlük hayat bağlamıyla sorulur. Verilen toplam ve çarpımdan kareler toplamını bulma veya bir şeklin kalan alanını iki kare farkıyla hesaplama sık görülen soru tipleridir."],
    ["a + b = 7 ve ab = 10 ise a² + b² kaçtır?", "Tam kare özdeşliğinden (a + b)<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup> + 2ab yazılır. 49 = a<sup>2</sup> + b<sup>2</sup> + 20 olduğundan a<sup>2</sup> + b<sup>2</sup> = 29 bulunur; a ve b'yi ayrıca bulmaya gerek yoktur."]
  ],
  tools: ["polinom-deger-hesapla", "kare-kup-tablosu", "denklem-cozucu"],
  related: ["uslu-sayilar-kurallari", "diskriminant-ikinci-derece-denklem", "karekok-nasil-alinir", "polinomlarda-kalan-teoremi-ve-p-x-degeri"],
  sources: [
    ["MEB – Ortaokul Matematik Dersi Öğretim Programı", "https://mufredat.meb.gov.tr/"],
    ["MEB – Ölçme, Değerlendirme ve Sınav Hizmetleri (LGS)", "https://odsgm.meb.gov.tr/"]
  ]
};
