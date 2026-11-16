export default {
  slug: "esitsizlik-nasil-cozulur",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Eşitsizlik Nasıl Çözülür? Eşitsizlik Yön Değiştirme ve Sayı Doğrusu",
  pageTitle: "Eşitsizlik Nasıl Çözülür? Yön Değiştirme ve Sayı Doğrusu",
  description: "Eşitsizlik, denklem gibi çözülür; tek fark negatif sayıyla çarpıp bölünce işaret yön değiştirir. Sayı doğrusu, aralık, mutlak değerli ve çift eşitsizlik örnekli.",
  keywords: ["eşitsizlik nasıl çözülür", "birinci dereceden eşitsizlik", "eşitsizlik yön değiştirir mi", "eşitsizlik sayı doğrusu", "aralık gösterimi", "mutlak değerli eşitsizlik", "8. sınıf eşitsizlikler", "çözüm kümesi"],
  lead: "Birinci dereceden bir eşitsizlik, denklem çözer gibi bilinmeyeni yalnız bırakarak çözülür: her iki tarafa aynı sayı eklenebilir, çıkarılabilir ya da iki taraf aynı pozitif sayıyla çarpılıp bölünebilir. Tek önemli fark, iki taraf negatif bir sayıyla çarpıldığında ya da bölündüğünde eşitsizlik işaretinin yön değiştirmesidir. Örneğin −2x + 3 ≥ 11 eşitsizliğinde −2'ye bölünce sonuç x ≤ −4 olur. Bu sayfada sayı doğrusunda gösterimi, açık ve kapalı aralıkları, çift ve mutlak değerli eşitsizlikleri çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Eşitsizlik işaretleri: < küçüktür, > büyüktür, ≤ küçük ya da eşit, ≥ büyük ya da eşit.",
    "İki tarafa aynı sayıyı eklemek, çıkarmak ya da pozitif sayıyla çarpıp bölmek işaretin yönünü değiştirmez.",
    "Negatif bir sayıyla çarpıp bölmek işaretin yönünü ters çevirir: −2x > 6 ise x < −3.",
    "Sayı doğrusunda < ve > için içi boş daire, ≤ ve ≥ için içi dolu daire kullanılır.",
    "|x − a| < k eşitsizliği −k < x − a < k biçimine, |x − a| > k ise iki ayrı eşitsizliğe açılır."
  ],
  figure: {
    alt: "Üç sayı doğrusu: birincide x küçüktür 4 için 4'te içi boş daire ve sola ok; ikincide x küçük eşit eksi 4 için eksi 4'te içi dolu daire ve sola ok; üçüncüde eksi 2 küçüktür x küçük eşit 3 için eksi 2'de boş, 3'te dolu daire ve aradaki kalın çizgi.",
    caption: "Boş daire sınır değerin çözüme dahil olmadığını, dolu daire dahil olduğunu gösterir. Üçüncü doğrudaki aralık (−2, 3] olarak yazılır; içindeki tam sayılar −1, 0, 1, 2 ve 3'tür.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ok" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="p"/></marker></defs>
  <text x="360" y="30" class="lg b mid">Çözüm kümesini sayı doğrusunda göstermek</text>
  <text x="20" y="72" class="b">3x − 5 &lt; 7  →  x &lt; 4</text>
  <line x1="60" y1="104" x2="680" y2="104" class="st" fill="none"/>
  <line x1="476" y1="104" x2="70" y2="104" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <circle cx="490" cy="104" r="9" class="sf"/><circle cx="490" cy="104" r="9" class="sp sw" fill="none"/>
  <text x="490" y="132" class="sm mid b">4</text><text x="370" y="132" class="sm mid">0</text>
  <line x1="370" y1="98" x2="370" y2="110" class="st" fill="none"/>
  <text x="560" y="88" class="sm t2">boş daire: 4 dahil değil</text>
  <text x="20" y="182" class="b">−2x + 3 ≥ 11  →  x ≤ −4</text>
  <line x1="60" y1="214" x2="680" y2="214" class="st" fill="none"/>
  <line x1="250" y1="214" x2="70" y2="214" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <circle cx="250" cy="214" r="9" class="p"/>
  <text x="250" y="242" class="sm mid b">−4</text><text x="370" y="242" class="sm mid">0</text>
  <line x1="370" y1="208" x2="370" y2="220" class="st" fill="none"/>
  <text x="400" y="198" class="sm t2">dolu daire: −4 dahil</text>
  <text x="20" y="292" class="b">−1 &lt; 2x + 3 ≤ 9  →  −2 &lt; x ≤ 3  ·  (−2, 3]</text>
  <line x1="60" y1="324" x2="680" y2="324" class="st" fill="none"/>
  <line x1="310" y1="324" x2="460" y2="324" class="sp sw" fill="none"/>
  <circle cx="310" cy="324" r="9" class="sf"/><circle cx="310" cy="324" r="9" class="sp sw" fill="none"/>
  <circle cx="460" cy="324" r="9" class="p"/>
  <g class="sm mid">
    <text x="310" y="352" class="b">−2</text><text x="340" y="352">−1</text><text x="370" y="352">0</text><text x="400" y="352">1</text><text x="430" y="352">2</text><text x="460" y="352" class="b">3</text>
  </g>
  <rect x="500" y="300" width="200" height="72" rx="8" class="oks"/>
  <text x="600" y="326" class="sm mid b">Tam sayı çözümleri</text>
  <text x="600" y="352" class="sm mid">−1, 0, 1, 2, 3 (5 tane)</text>
</svg>`
  },
  sections: [
    {
      h: "Eşitsizlik nedir?",
      p: [
        "Eşitsizlik, iki ifadenin eşit olmadığını ve hangisinin büyük, hangisinin küçük olduğunu gösteren matematiksel cümledir. Denklem tek bir değeri ya da birkaç değeri arar; eşitsizlik ise genellikle bir değerler aralığını, yani sonsuz sayıda çözümü tarif eder. \"x + 2 = 5\" denkleminin tek çözümü 3'tür, ama \"x + 2 < 5\" eşitsizliğini 3'ten küçük bütün sayılar sağlar.",
        "Eşitsizliği sağlayan bütün değerlerin oluşturduğu kümeye <strong>çözüm kümesi</strong> denir. Çözüm kümesi aralık gösterimiyle, küme gösterimiyle ya da sayı doğrusunda çizilerek ifade edilebilir. Hangi sayı kümesinde çalışıldığı da önemlidir: aynı eşitsizliğin gerçek sayılardaki çözüm kümesi bir aralıkken, tam sayılardaki çözüm kümesi birkaç tane sayıdan oluşabilir."
      ],
      table: {
        head: ["İşaret", "Okunuşu", "Örnek", "Anlamı"],
        rows: [
          ["<", "küçüktür", "x < 4", "4'ten küçük, 4 dahil değil"],
          [">", "büyüktür", "x > −1", "−1'den büyük, −1 dahil değil"],
          ["≤", "küçük ya da eşittir", "x ≤ 7", "7 ve 7'den küçük"],
          ["≥", "büyük ya da eşittir", "x ≥ 0", "0 ve 0'dan büyük"],
          ["≠", "eşit değildir", "x ≠ 2", "2 dışındaki her sayı"]
        ]
      }
    },
    {
      h: "Birinci dereceden eşitsizlik nasıl çözülür?",
      p: [
        "Birinci dereceden eşitsizlikte bilinmeyenin üssü 1'dir. Çözüm, denklem çözerken kullandığınız adımlarla yapılır: önce bilinmeyenli terimler bir tarafta, sayılar diğer tarafta toplanır, sonra bilinmeyenin katsayısına bölünür. Tek ek kural, katsayı negatifse bölerken işaretin yön değiştirmesidir."
      ],
      ol: [
        "Eşitsizlik: 3x − 5 < 7.",
        "İki tarafa 5 ekleyin: 3x < 12. Eklemek işaretin yönünü değiştirmez.",
        "İki tarafı 3'e bölün: x < 4. 3 pozitif olduğu için işaret aynı kalır.",
        "Çözüm kümesi: 4'ten küçük bütün gerçek sayılar; aralık olarak (−∞, 4).",
        "Kontrol: 0 için 3 × 0 − 5 = −5 < 7, doğru. 4 için 3 × 4 − 5 = 7 < 7, yanlış; 4 çözüme dahil değil."
      ],
      after: [
        "Kontrol adımı çok değerlidir. Sınır değeri ve sınırın her iki yanından birer sayı denemek, hem işlem hatalarını hem de yanlış yöne çevrilmiş işaretleri hemen ortaya çıkarır. Denklem çözme adımlarını hatırlamak isterseniz [[arac:denklem-cozucu|Denklem Çözücü]] birinci dereceden denklemleri adım adım gösterir; eşitsizliği önce \"=\" işaretiyle çözüp sınır değeri bulmak, ardından yönü belirlemek de kullanışlı bir yoldur."
      ]
    },
    {
      h: "Negatif sayıyla çarpınca eşitsizlik neden yön değiştirir?",
      p: [
        "Bir sayıyı negatif bir sayıyla çarpmak, sayı doğrusunda onu sıfırın öbür tarafına yansıtmak demektir. Yansıma, sıralamayı tersine çevirir. 2 < 5 doğrudur; her iki tarafı −1 ile çarptığımızda −2 ve −5 elde ederiz. Sayı doğrusunda −2, −5'in sağındadır, yani −2 > −5'tir. Sıralama ters döndüğü için işaretin de ters çevrilmesi gerekir."
      ],
      ol: [
        "Eşitsizlik: −2x + 3 ≥ 11.",
        "İki taraftan 3 çıkarın: −2x ≥ 8.",
        "İki tarafı −2'ye bölün ve işaretin yönünü çevirin: x ≤ −4.",
        "Çözüm kümesi: (−∞, −4]. Köşeli parantez −4'ün çözüme dahil olduğunu gösterir.",
        "Kontrol: x = −4 için −2 × (−4) + 3 = 11 ≥ 11, doğru. x = 0 için 3 ≥ 11, yanlış; sağdaki değerler çözüm değil."
      ],
      after: [
        "Yön değiştirmeyi unutmamanın bir yolu, bilinmeyenli terimi pozitif katsayılı olacak tarafta toplamaktır. Aynı eşitsizlikte 2x'i sağa, 11'i sola taşırsanız 3 − 11 ≥ 2x, yani −8 ≥ 2x ve −4 ≥ x elde edersiniz. Bu, x ≤ −4 ile aynı sonuçtur ve hiçbir aşamada negatif sayıya bölmeniz gerekmez. İşaret kurallarını tazelemek için [[bilgi:tam-sayilarla-islemler-isaret-kurallari|tam sayılarla işlemler]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Çözüm kümesi sayı doğrusunda nasıl gösterilir? Açık ve kapalı aralık farkı",
      p: [
        "Sayı doğrusunda çözüm kümesi kalın bir çizgi ya da ok ile, sınır değerler ise dairelerle gösterilir. Sınır değer çözüme dahil değilse (< ve >) <strong>içi boş daire</strong>, dahilse (≤ ve ≥) <strong>içi dolu daire</strong> çizilir. Çözüm sonsuza kadar uzanıyorsa çizginin ucuna ok konur."
      ],
      table: {
        head: ["Eşitsizlik", "Aralık gösterimi", "Aralık türü", "Sayı doğrusu"],
        rows: [
          ["−2 < x < 3", "(−2, 3)", "Açık aralık", "İki uçta boş daire"],
          ["−2 ≤ x ≤ 3", "[−2, 3]", "Kapalı aralık", "İki uçta dolu daire"],
          ["−2 < x ≤ 3", "(−2, 3]", "Yarı açık aralık", "Solda boş, sağda dolu daire"],
          ["x ≥ 1", "[1, ∞)", "Sınırsız aralık", "1'de dolu daire, sağa ok"],
          ["x < 4", "(−∞, 4)", "Sınırsız aralık", "4'te boş daire, sola ok"]
        ],
        caption: "Sonsuz (∞) bir sayı değildir, ulaşılamaz; bu yüzden sonsuzun yanında her zaman normal parantez kullanılır."
      },
      after: [
        "Aralık gösterimi 9. sınıf matematiğinde ayrıntılı işlenir; 8. sınıfta ise çözümler daha çok sayı doğrusu üzerinde gösterilir. Bir aralıktaki tam sayıları saymak, sınavlarda sık sorulan bir ek adımdır: (−2, 3] aralığındaki tam sayılar −1, 0, 1, 2 ve 3'tür; −2 dahil değildir."
      ]
    },
    {
      h: "İki eşitsizlik aynı anda nasıl çözülür?",
      p: [
        "İki eşitsizliğin birlikte sağlanması istendiğinde iki yol vardır. Birincisi, çift eşitsizliği tek seferde çözmektir; bu durumda yapılan her işlem üç tarafa birden uygulanır. İkincisi, eşitsizlikleri ayrı ayrı çözüp çözüm kümelerinin ortak kısmını, yani kesişimini almaktır."
      ],
      ol: [
        "Çift eşitsizlik: −1 < 2x + 3 ≤ 9.",
        "Üç taraftan 3 çıkarın: −4 < 2x ≤ 6.",
        "Üç tarafı 2'ye bölün: −2 < x ≤ 3. Çözüm kümesi (−2, 3].",
        "Sistem örneği: x + 1 > 3 ve 2x − 1 ≤ 9. Birinciden x > 2, ikinciden 2x ≤ 10 yani x ≤ 5.",
        "Kesişimi alın: x hem 2'den büyük hem de 5'ten küçük ya da eşit olmalı; çözüm kümesi (2, 5]."
      ],
      after: [
        "\"Ve\" bağlacı kesişim, \"veya\" bağlacı birleşim demektir. \"x < −1 veya x > 4\" ifadesinin çözümü sayı doğrusunda iki ayrı parçadır ve arada çözüm olmayan bir boşluk kalır. Kesişim boş çıkarsa, örneğin x > 5 ve x < 2 gibi, iki eşitsizliği aynı anda sağlayan sayı yoktur ve çözüm kümesi boş kümedir."
      ]
    },
    {
      h: "Mutlak değerli eşitsizlik nasıl çözülür?",
      p: [
        "Bir sayının mutlak değeri, sayı doğrusunda sıfıra olan uzaklığıdır. |x − a| ise x'in a'ya olan uzaklığıdır. Bu yorum, mutlak değerli eşitsizlikleri çözmeyi kolaylaştırır: |x − 2| < 5 ifadesi \"x'in 2'ye uzaklığı 5'ten küçük\" demektir; yani x, 2'nin 5 birim solu ile 5 birim sağı arasındadır."
      ],
      formula: "|ifade| < k (k > 0)  →  −k < ifade < k\n|ifade| > k (k > 0)  →  ifade < −k  veya  ifade > k\nÖrnek 1: |x − 2| < 5 → −5 < x − 2 < 5 → −3 < x < 7\nÖrnek 2: |2x + 1| ≥ 3 → 2x + 1 ≤ −3 veya 2x + 1 ≥ 3 → x ≤ −2 veya x ≥ 1",
      after: [
        "Küçüktür durumu tek bir aralık, büyüktür durumu ise iki ayrı parça verir. k negatifse özel durumlar oluşur: mutlak değer hiçbir zaman negatif olmadığı için |x| < −3 eşitsizliğinin çözümü yoktur, |x| > −3 ise her gerçek sayı için doğrudur. Mutlak değerin tanımını ve denklemlerini [[bilgi:mutlak-deger-nedir-nasil-cozulur|mutlak değer nedir]] yazısında anlatıyoruz; iki sayı arasındaki uzaklığı [[arac:mutlak-deger-hesapla|Mutlak Değer Hesaplama]] aracıyla kontrol edebilirsiniz."
      ]
    },
    {
      h: "Eşitsizlik günlük problemlere nasıl uygulanır?",
      p: [
        "Günlük hayatta \"en fazla\", \"en az\", \"aşmamak\", \"yetmek\" gibi ifadeler eşitsizlik demektir. Problemi eşitsizliğe çevirmenin anahtarı, bu ifadelerin hangi işarete karşılık geldiğini bilmektir: \"en fazla\" ve \"aşmamak\" ≤, \"en az\" ≥, \"fazla\" ve \"geçmek\" ise > ile yazılır."
      ],
      ol: [
        "Problem: Bir taksinin açılış ücreti 20 TL, kilometre başına ücreti 15 TL'dir (örnek tutarlar). Cebinizdeki 200 TL ile en fazla kaç km gidebilirsiniz?",
        "Bilinmeyeni tanımlayın: x gidilen kilometre.",
        "Eşitsizliği kurun: toplam ücret 200 TL'yi aşmamalı → 20 + 15x ≤ 200.",
        "Çözün: 15x ≤ 180 → x ≤ 12.",
        "Yorumlayın: en fazla 12 km gidebilirsiniz. Mesafe negatif olamayacağı için anlamlı çözüm 0 ≤ x ≤ 12'dir."
      ],
      after: [
        "Problemlerde çözüm kümesini bağlama göre daraltmak önemlidir: kişi, adet ve gün gibi sayılar tam sayı ve negatif olmayan değerler olmak zorundadır. Bu tür orantı içeren problemlerde [[bilgi:oran-oranti-nasil-cozulur|oran ve orantı]] yazısındaki yöntemler de işe yarar. Bulduğunuz birkaç sınır değeri karşılaştırmak için [[arac:sayi-siralama|Sayı Sıralama]] aracı listeyi küçükten büyüğe dizer."
      ]
    },
    {
      h: "Eşitsizlik çözerken sık yapılan hatalar",
      ul: [
        "<strong>Negatif sayıya bölünce işareti çevirmeyi unutmak:</strong> en sık yapılan hatadır; her bölme adımında katsayının işaretine bakın.",
        "<strong>Boş ve dolu daireyi karıştırmak:</strong> < ve > için boş, ≤ ve ≥ için dolu daire kullanılır.",
        "<strong>Bilinmeyenli ifadeyle çarpmak:</strong> x'in işareti bilinmediği için iki tarafı x ile çarpmak ya da x'e bölmek yönü belirsiz hale getirir; bu tür eşitsizlikler farklı yöntemlerle çözülür.",
        "<strong>Çift eşitsizlikte bir tarafı unutmak:</strong> −4 < 2x ≤ 6 adımında bölme üç tarafa birden uygulanmalıdır.",
        "<strong>Mutlak değerde büyüktür durumunu tek aralık yazmak:</strong> |x| > 3 ifadesi −3 < x < 3 değil, x < −3 veya x > 3 demektir.",
        "<strong>Bağlamı unutmak:</strong> \"kaç kişi\" sorusunda 4,5 gibi bir sonuç tam sayıya göre yorumlanmalıdır."
      ]
    }
  ],
  faq: [
    ["Eşitsizlik nedir?", "Eşitsizlik, iki ifadenin eşit olmadığını ve hangisinin büyük ya da küçük olduğunu gösteren matematiksel cümledir. Denklemden farklı olarak genellikle bir değerler aralığını tarif eder ve sonsuz sayıda çözümü olabilir."],
    ["Birinci dereceden eşitsizlik nasıl çözülür?", "Bilinmeyenli terimleri bir tarafa, sayıları diğer tarafa toplayıp bilinmeyenin katsayısına bölersiniz. 3x − 5 < 7 için iki tarafa 5 eklenir, 3'e bölünür ve x < 4 bulunur."],
    ["Negatif sayıyla çarpınca eşitsizlik neden yön değiştirir?", "Negatif sayıyla çarpmak sayıları sıfırın öbür tarafına yansıtır ve sıralamayı tersine çevirir. 2 < 5 iken −2 > −5 olur; bu yüzden negatif sayıyla çarpıp bölünce işaret de ters çevrilmelidir."],
    ["Çözüm kümesi sayı doğrusunda nasıl gösterilir?", "Çözüm aralığı kalın çizgiyle, sınır değerler dairelerle gösterilir. Sınır dahil değilse içi boş, dahilse içi dolu daire çizilir; sonsuza uzanan çözümlerde çizginin ucuna ok konur."],
    ["Açık ve kapalı aralık farkı nedir?", "Açık aralıkta uç noktalar çözüme dahil değildir ve normal parantezle yazılır: (−2, 3). Kapalı aralıkta uç noktalar dahildir ve köşeli parantezle yazılır: [−2, 3]."],
    ["Mutlak değerli eşitsizlik nasıl çözülür?", "Mutlak değerin küçük olduğu durum çift eşitsizliğe açılır: |x − 2| < 5 ise −3 < x < 7. Büyük olduğu durum iki ayrı eşitsizlik verir: |2x + 1| ≥ 3 ise x ≤ −2 veya x ≥ 1."],
    ["İki eşitsizlik aynı anda nasıl çözülür?", "Çift eşitsizlikte her işlem üç tarafa birden uygulanır. İki ayrı eşitsizlik varsa her biri ayrı çözülür ve ve bağlacı için ortak kısım alınır; x > 2 ve x ≤ 5 için çözüm (2, 5] olur."],
    ["Eşitsizlik günlük problemlere nasıl uygulanır?", "En fazla ve aşmamak ifadeleri küçük eşit, en az ifadesi büyük eşit işaretiyle yazılır. Bütçe, süre ve kapasite problemleri bu yolla kurulur; çözüm bağlama göre, örneğin negatif olmayan tam sayılarla sınırlandırılır."],
    ["Bir aralıktaki tam sayılar nasıl sayılır?", "Aralığın uçlarının dahil olup olmadığına bakarak içindeki tam sayıları sıralayın. (−2, 3] aralığında −2 dahil değil, 3 dahildir; bu yüzden tam sayılar −1, 0, 1, 2 ve 3 olmak üzere beş tanedir."]
  ],
  tools: ["denklem-cozucu", "mutlak-deger-hesapla", "sayi-siralama"],
  related: ["mutlak-deger-nedir-nasil-cozulur", "tam-sayilarla-islemler-isaret-kurallari", "oran-oranti-nasil-cozulur", "iki-bilinmeyenli-denklem-nasil-cozulur"]
};
