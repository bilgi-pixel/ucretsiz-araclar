export default {
  slug: "frekans-tablosu-cetele-nasil-yapilir",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Frekans Tablosu ve Çetele Nasıl Yapılır? Veri Analizi ve Tepe Değer",
  pageTitle: "Frekans Tablosu ve Çetele Tablosu Nasıl Yapılır? Örnekli",
  description: "Çetele ve frekans (sıklık) tablosu nasıl hazırlanır? Tepe değer, açıklık, bağıl frekans, grup genişliği, histogram ve sütun grafiği farkı çözümlü örnekle.",
  keywords: ["frekans tablosu", "çetele tablosu", "sıklık tablosu", "veri analizi 5. sınıf", "tepe değer nedir", "gruplandırılmış veri", "histogram nasıl çizilir", "bağıl frekans", "grup genişliği nasıl bulunur"],
  lead: "Frekans (sıklık) tablosu, her bir değerin veri içinde kaç kez tekrarlandığını gösteren tablodur; çetele ise bu sayımı yaparken her gözlem için bir çizgi çekip beşer beşer gruplayarak tutulan ara kayıttır. Önce veriyi çeteleyle sayar, sonra çizgileri sayıya çevirip frekans tablosuna yazarsınız. Tablodan tepe değer, açıklık ve bağıl frekans tek bakışta okunur; sütun grafiği ya da histogram da doğrudan bu tablodan çizilir. Aşağıda 5–7. sınıf veri analizi ünitesine uygun, adım adım çözülmüş örnekler bulacaksınız.",
  kisaCevap: [
    "Çetelede her gözlem için bir dikey çizgi çekilir; beşinci gözlem önceki dördün üzerine çapraz çizilerek beşli demet oluşturulur.",
    "Frekans (sıklık), bir değerin veri içinde kaç kez görüldüğüdür; tüm frekansların toplamı veri sayısına eşittir.",
    "Bağıl frekans = değerin frekansı ÷ toplam veri sayısı; yüzde olarak göstermek için 100 ile çarpılır.",
    "Tepe değer (mod), frekansı en büyük olan değerdir; birden fazla olabilir ya da hiç olmayabilir.",
    "Açıklık = en büyük değer − en küçük değer; gruplandırmada grup genişliği açıklık ÷ grup sayısından büyük ilk doğal sayıdır.",
    "Sütun grafiği ayrı ayrı kategoriler için, histogram ise bitişik sayısal aralıklar (gruplar) için kullanılır."
  ],
  figure: {
    alt: "Yirmi öğrencinin bir ayda okuduğu kitap sayısı için çetele ve frekans tablosu ile aynı verinin sütun grafiği; en yüksek sütun 3 kitap ve 7 öğrenci.",
    caption: "Soldaki tabloda çetele çizgileri sayıya çevrilmiştir; sağdaki sütun grafiği aynı frekansları gösterir. En uzun sütun tepe değeri (3 kitap) verir.",
    svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">20 öğrenci bir ayda kaç kitap okudu?</text>
  <rect x="20" y="50" width="330" height="360" rx="10" class="sf sb"/>
  <text x="60" y="80" class="b sm">Kitap</text><text x="170" y="80" class="b sm mid">Çetele</text><text x="300" y="80" class="b sm mid">Frekans</text>
  <line x1="30" y1="90" x2="340" y2="90" class="sb" fill="none"/>
  <g class="lg">
    <text x="70" y="124" class="mid">0</text><text x="70" y="170" class="mid">1</text><text x="70" y="216" class="mid">2</text>
    <text x="70" y="262" class="mid b p">3</text><text x="70" y="308" class="mid">4</text><text x="70" y="354" class="mid">5</text>
  </g>
  <g class="st sw">
    <line x1="120" y1="106" x2="120" y2="128" fill="none"/>
    <line x1="120" y1="152" x2="120" y2="174" fill="none"/><line x1="130" y1="152" x2="130" y2="174" fill="none"/>
    <line x1="120" y1="198" x2="120" y2="220" fill="none"/><line x1="130" y1="198" x2="130" y2="220" fill="none"/><line x1="140" y1="198" x2="140" y2="220" fill="none"/><line x1="150" y1="198" x2="150" y2="220" fill="none"/><line x1="114" y1="216" x2="156" y2="202" fill="none"/>
    <line x1="120" y1="244" x2="120" y2="266" fill="none"/><line x1="130" y1="244" x2="130" y2="266" fill="none"/><line x1="140" y1="244" x2="140" y2="266" fill="none"/><line x1="150" y1="244" x2="150" y2="266" fill="none"/><line x1="114" y1="262" x2="156" y2="248" fill="none"/><line x1="172" y1="244" x2="172" y2="266" fill="none"/><line x1="182" y1="244" x2="182" y2="266" fill="none"/>
    <line x1="120" y1="290" x2="120" y2="312" fill="none"/><line x1="130" y1="290" x2="130" y2="312" fill="none"/><line x1="140" y1="290" x2="140" y2="312" fill="none"/>
    <line x1="120" y1="336" x2="120" y2="358" fill="none"/><line x1="130" y1="336" x2="130" y2="358" fill="none"/>
  </g>
  <g class="lg b">
    <text x="300" y="124" class="mid">1</text><text x="300" y="170" class="mid">2</text><text x="300" y="216" class="mid">5</text>
    <text x="300" y="262" class="mid p">7</text><text x="300" y="308" class="mid">3</text><text x="300" y="354" class="mid">2</text>
  </g>
  <line x1="30" y1="372" x2="340" y2="372" class="sb" fill="none"/>
  <text x="60" y="398" class="b">Toplam</text><text x="300" y="398" class="b mid">20</text>
  <line x1="400" y1="380" x2="700" y2="380" class="st" fill="none"/>
  <line x1="400" y1="380" x2="400" y2="80" class="st" fill="none"/>
  <g class="sm end mu"><text x="392" y="384">0</text><text x="392" y="304">2</text><text x="392" y="224">4</text><text x="392" y="144">6</text></g>
  <line x1="400" y1="300" x2="700" y2="300" class="sb dash" fill="none"/><line x1="400" y1="220" x2="700" y2="220" class="sb dash" fill="none"/><line x1="400" y1="140" x2="700" y2="140" class="sb dash" fill="none"/>
  <rect x="412" y="340" width="34" height="40" class="ps"/>
  <rect x="460" y="300" width="34" height="80" class="ps"/>
  <rect x="508" y="180" width="34" height="200" class="ps"/>
  <rect x="556" y="100" width="34" height="280" class="p"/>
  <rect x="604" y="260" width="34" height="120" class="ps"/>
  <rect x="652" y="300" width="34" height="80" class="ps"/>
  <g class="sm mid"><text x="429" y="400">0</text><text x="477" y="400">1</text><text x="525" y="400">2</text><text x="573" y="400" class="b p">3</text><text x="621" y="400">4</text><text x="669" y="400">5</text></g>
  <text x="573" y="92" class="sm mid b p">tepe değer</text>
  <text x="550" y="422" class="sm mid t2">kitap sayısı · dikey eksen: öğrenci sayısı</text>
</svg>`
  },
  sections: [
    {
      h: "Frekans (sıklık) tablosu nedir, ne işe yarar?",
      p: [
        "Bir anket ya da gözlem sonunda elinizde genellikle karışık bir sayı listesi olur: \"2, 3, 1, 4, 3, 2, 5...\" gibi. Bu liste uzadıkça hangi değerin çok, hangisinin az görüldüğünü anlamak zorlaşır. <strong>Frekans tablosu</strong>, her değerin karşısına kaç kez tekrarlandığını yazarak bu karışıklığı düzenler. Türkçe ders kitaplarında aynı tabloya <strong>sıklık tablosu</strong> da denir; frekans ve sıklık aynı anlamdadır.",
        "Frekans tablosu veri analizinin ilk adımıdır. Tepe değer, açıklık, ortalama gibi değerler bu tablodan kolayca hesaplanır; sütun grafiği, histogram ya da daire grafiği de doğrudan tablodaki sayılarla çizilir. Okulda sınıfın en sevdiği meyveyi bulmaktan bir işletmenin en çok satan ürününü belirlemeye kadar her yerde aynı yöntem kullanılır."
      ]
    },
    {
      h: "Çetele tablosu nasıl tutulur?",
      p: [
        "<strong>Çetele</strong>, verileri tek tek okurken sayım yapmanın en hatasız yoludur. Her değer için bir satır açılır; listede o değere her rastladığınızda ilgili satıra bir dikey çizgi çekersiniz. Dört çizgiden sonra gelen beşinci gözlem, dört çizginin üzerine çapraz bir çizgi olarak eklenir. Böylece çizgiler beşli demetler hâlinde görünür ve sayarken \"beş, on, on beş...\" diye hızlıca ilerlenir.",
        "Çetelenin en büyük faydası, veriyi bir kez baştan sona okuyarak sayımı bitirmenizi sağlamasıdır. Her değer için listeyi ayrı ayrı taramak hem uzun sürer hem de atlama riskini artırır. Okuduğunuz veriyi listede hafifçe işaretlemeniz, aynı değeri iki kez saymanızı da önler."
      ],
      ol: [
        "Veride görülebilecek tüm değerleri (ya da kategorileri) küçükten büyüğe bir sütuna yazın.",
        "Listeyi baştan okumaya başlayın; her değer için ilgili satıra bir çizgi çekin ve okuduğunuz değerin üzerini çizin.",
        "Her satırda beşinci çizgiyi önceki dört çizginin üzerine çapraz çekin.",
        "Liste bitince her satırdaki çizgileri sayıp yanındaki frekans sütununa yazın.",
        "Frekansları toplayın; toplam, veri sayısına eşit değilse sayımda hata vardır ve kontrol edilmelidir."
      ]
    },
    {
      h: "Çözümlü örnek: 20 öğrencinin okuduğu kitap sayısı",
      p: [
        "Bir sınıfta 20 öğrenciye geçen ay kaç kitap okudukları sorulmuş ve şu cevaplar alınmıştır: 2, 3, 1, 4, 3, 2, 5, 3, 0, 2, 3, 4, 1, 3, 2, 4, 3, 5, 2, 3. Bu veriyi çeteleyle sayıp frekans tablosuna dönüştürelim. Yukarıdaki görsel bu örneğin çetelesini ve sütun grafiğini gösterir."
      ],
      table: {
        head: ["Kitap sayısı", "Çetele (sözle)", "Frekans", "Bağıl frekans", "Yüzde"],
        rows: [
          ["0", "1 çizgi", "1", "1/20 = 0,05", "%5"],
          ["1", "2 çizgi", "2", "2/20 = 0,10", "%10"],
          ["2", "1 demet", "5", "5/20 = 0,25", "%25"],
          ["3", "1 demet + 2 çizgi", "7", "7/20 = 0,35", "%35"],
          ["4", "3 çizgi", "3", "3/20 = 0,15", "%15"],
          ["5", "2 çizgi", "2", "2/20 = 0,10", "%10"],
          ["Toplam", "", "20", "1,00", "%100"]
        ],
        caption: "Bağıl frekansların toplamı her zaman 1, yüzdelerin toplamı %100 olmalıdır; değilse sayımda ya da bölmede hata vardır."
      },
      after: [
        "Tablodan şu sonuçlar okunur: En çok tekrarlanan değer 3'tür (7 öğrenci), yani <strong>tepe değer 3 kitaptır</strong>. En büyük değer 5, en küçük değer 0 olduğu için <strong>açıklık 5 − 0 = 5</strong>'tir. Ortalamayı bulmak için her değer frekansıyla çarpılıp toplanır: 0×1 + 1×2 + 2×5 + 3×7 + 4×3 + 5×2 = 55. Bunu 20'ye bölünce aritmetik ortalama 2,75 kitap çıkar."
      ]
    },
    {
      h: "Tepe değer, açıklık ve bağıl frekans nasıl bulunur?",
      p: [
        "<strong>Tepe değer (mod)</strong>, frekans tablosunda karşısındaki sayı en büyük olan değerdir. İki değer aynı en yüksek frekansa sahipse veri iki tepe değerlidir; bütün değerler aynı sayıda tekrarlanıyorsa tepe değer yoktur. Tepe değer, sayısal olmayan verilerde de kullanılabilen tek merkezî ölçüdür: \"En sevilen renk mavi\" demek bir tepe değer bulmaktır.",
        "<strong>Açıklık (ranj)</strong>, en büyük değerden en küçük değerin çıkarılmasıyla bulunur ve verinin ne kadar geniş bir aralığa yayıldığını gösterir. Açıklık yalnızca iki uç değere baktığı için tek bir aşırı değer onu çok büyütebilir; bu yüzden üst sınıflarda çeyrekler açıklığı ve standart sapma gibi ölçüler de öğretilir.",
        "<strong>Bağıl frekans</strong>, bir değerin frekansının toplam veri sayısına bölümüdür ve \"veri içindeki payı\" anlatır. Farklı büyüklükteki iki sınıfı karşılaştırırken ham frekans yerine bağıl frekans kullanmak gerekir: 30 kişilik sınıfta 6 kişi ile 15 kişilik sınıfta 6 kişi aynı oranı göstermez (%20 ve %40)."
      ],
      formula: "Tepe değer = frekansı en büyük değer\nAçıklık = en büyük değer − en küçük değer\nBağıl frekans = frekans ÷ toplam veri sayısı\nOrtalama = Σ(değer × frekans) ÷ toplam frekans",
      after: [
        "Bu değerleri elle bulduktan sonra kontrol etmek için veriyi [[arac:tepe-deger-hesapla|tepe değer hesaplama aracına]] yapıştırabilirsiniz; araç sıklık tablosunu da çıkarır. Açıklık için [[arac:aciklik-hesapla|açıklık hesaplama]], ortalama ve medyan için [[arac:ortalama-hesapla|ortalama hesaplama]] aracı kullanılabilir. Merkezî eğilim ölçülerinin farkı [[bilgi:ortalama-medyan-mod-nedir|ortalama, medyan ve mod]] yazımızda ayrıntılı anlatılır."
      ]
    },
    {
      h: "Gruplandırılmış veri ve grup genişliği seçimi",
      p: [
        "Veri çok sayıda farklı değer içeriyorsa (ör. 0–100 arası sınav puanları, santimetre cinsinden boylar) her değeri ayrı satıra yazmak tabloyu gereksiz uzatır. Bu durumda değerler eşit genişlikte aralıklara, yani <strong>gruplara</strong> ayrılır ve her grubun frekansı sayılır. Ortaokul programında grup genişliği şu adımlarla bulunur."
      ],
      ol: [
        "Açıklığı hesaplayın: en büyük değer − en küçük değer.",
        "Kaç grup kullanacağınıza karar verin (soruda verilmemişse genellikle 4 ile 8 arası seçilir).",
        "Açıklığı grup sayısına bölün; grup genişliği, bu bölümden büyük olan ilk doğal sayıdır. Bölüm tam sayı çıksa bile bir fazlası alınır ki en büyük değer de son gruba sığsın.",
        "İlk grubu en küçük değerden başlatın ve grup genişliği kadar ilerleyerek grupları yazın.",
        "Her veriyi ait olduğu gruba çeteleyle yerleştirip frekansları sayın."
      ],
      table: {
        head: ["Puan grubu", "Frekans", "Bağıl frekans"],
        rows: [
          ["52–61", "3", "3/24 = 0,125"],
          ["62–71", "5", "5/24 ≈ 0,208"],
          ["72–81", "8", "8/24 ≈ 0,333"],
          ["82–91", "6", "6/24 = 0,250"],
          ["92–101", "2", "2/24 ≈ 0,083"],
          ["Toplam", "24", "1,000"]
        ],
        caption: "Örnek: 24 öğrencinin puanları, en küçük 52 ve en büyük 98. Açıklık 46; 5 grup için 46 ÷ 5 = 9,2 olduğundan grup genişliği 10 alınmıştır."
      },
      after: [
        "Gruplandırma bilgi kaybına yol açar: tablodan artık \"72–81 arasında 8 öğrenci var\" bilgisini okursunuz ama bu öğrencilerin tam puanlarını göremezsiniz. Bu yüzden gruplandırılmış veride ortalama, grup orta noktaları kullanılarak yaklaşık hesaplanır. Grup sayısını çok küçük seçmek dağılımı gizler, çok büyük seçmek ise tabloyu yeniden dağınık hâle getirir."
      ]
    },
    {
      h: "Frekans tablosundan sütun grafiği ve histogram çizimi",
      p: [
        "<strong>Sütun grafiği</strong>, her bir değer ya da kategori için ayrı bir sütun çizilerek oluşturulur; sütunlar arasında boşluk bırakılır, çünkü kategoriler birbirinden bağımsızdır (meyve türleri, kitap sayıları, haftanın günleri). Yatay eksene değerler, dikey eksene frekanslar yazılır ve sütunun yüksekliği frekansa eşit olur.",
        "<strong>Histogram</strong> ise gruplandırılmış sayısal veri için kullanılır. Gruplar sayı doğrusunda kesintisiz art arda geldiği için sütunlar <strong>bitişik</strong> çizilir; aralarında boşluk bırakılmaz. Yatay eksende grup sınırları, dikey eksende frekanslar yer alır. Histogramın biçimi, verinin bir tarafa yığılıp yığılmadığını ya da ortada toplanıp toplanmadığını gösterir."
      ],
      table: {
        head: ["Özellik", "Sütun grafiği", "Histogram"],
        rows: [
          ["Veri türü", "Kategoriler ya da ayrık değerler", "Gruplandırılmış sayısal veri"],
          ["Sütunlar arası", "Boşluk bırakılır", "Bitişiktir"],
          ["Yatay eksen", "Kategori adları veya değerler", "Grup sınırları"],
          ["Sıralama", "Kategoriler istenen sırada dizilebilir", "Gruplar sayı sırasıyla dizilmek zorundadır"],
          ["Örnek", "En sevilen spor dalı", "Öğrenci boyları, sınav puanları"]
        ]
      },
      after: [
        "Grafiği kâğıtta çizmeden önce dikey eksenin ölçeğini en büyük frekansa göre seçin: yukarıdaki örnekte en büyük frekans 7 olduğu için eksen 0'dan 8'e kadar ikişer ikişer işaretlenebilir. Dijital olarak hazırlamak isterseniz [[arac:grafik-olustur|grafik oluşturma aracına]] değerleri ve frekansları girerek sütun ya da pasta grafiği indirebilirsiniz. Oranları daire üzerinde göstermek için [[bilgi:pasta-grafigi-nasil-yapilir|pasta grafiği nasıl yapılır]] yazımıza bakabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Frekans toplamını kontrol etmemek:</strong> Toplam, veri sayısına eşit değilse bir değer atlanmış ya da iki kez sayılmıştır.",
        "<strong>Tepe değer ile frekansı karıştırmak:</strong> Örnekte tepe değer 3 kitaptır; 7 ise bu değerin frekansıdır. Cevap olarak 7 yazmak sık yapılan bir yanlıştır.",
        "<strong>Beşinci çizgiyi ayrı çekmek:</strong> Beşli demet yapılmazsa uzun çizgi dizileri yanlış sayılır.",
        "<strong>Frekansı sıfır olan değeri atlamak:</strong> Değer aralığı içindeki ama hiç görülmeyen değerler de tabloya 0 frekansla yazılmalıdır; grafikte boşluğun nedeni görünür olur.",
        "<strong>Gruplarda çakışma:</strong> 50–60 ve 60–70 gibi gruplar 60'ı iki kez içerir. Gruplar 50–59, 60–69 biçiminde ya da \"50 dahil, 60 hariç\" kuralıyla tanımlanmalıdır.",
        "<strong>Histogramda boşluk bırakmak:</strong> Sayısal aralıklar kesintisiz olduğu için sütunlar bitişik çizilir."
      ]
    },
    {
      h: "Okulda ve günlük hayatta frekans tablosu kullanımı",
      p: [
        "Veri analizi ünitesinde öğrencilerden genellikle kendi verilerini toplamaları istenir: sınıfın göz rengi, ayakkabı numaraları, okula geliş süreleri, bir hafta boyunca izlenen hava durumu. Bu tür projelerde soruyu net yazmak, cevap seçeneklerini önceden belirlemek ve veriyi aynı gün çeteleyle saymak işi çok kolaylaştırır.",
        "Aynı yöntem iş hayatında da kullanılır. Bir dükkânın günlük satış fişlerinden hangi ürünün kaç kez satıldığını çıkarmak, bir çağrı merkezinin şikâyet konularını sıralamak ya da bir web sitesinde hangi sayfanın kaç kez açıldığını özetlemek birer frekans tablosu çalışmasıdır. Tablo büyüdükçe, dağılımın genişliğini anlamak için [[bilgi:standart-sapma-nasil-hesaplanir|standart sapma]] gibi ölçülere geçilir."
      ]
    }
  ],
  faq: [
    ["Frekans (sıklık) tablosu nedir?", "Frekans tablosu, veri içindeki her değerin ya da kategorinin kaç kez tekrarlandığını gösteren tablodur. Ders kitaplarında sıklık tablosu olarak da geçer; bir sütunda değerler, yanındaki sütunda bu değerlerin tekrar sayıları yani frekansları yazılır."],
    ["Çetele tablosu nasıl tutulur?", "Her değer için bir satır açılır ve veride o değere her rastlandığında satıra bir dikey çizgi çekilir. Beşinci gözlem önceki dört çizginin üzerine çapraz çizilerek beşli demet yapılır; sayım bitince çizgiler sayıya çevrilir."],
    ["Frekans tablosundan sütun grafiği nasıl çizilir?", "Yatay eksene değerler ya da kategoriler, dikey eksene frekanslar yazılır. Her değer için yüksekliği frekansına eşit bir sütun çizilir ve sütunlar arasında eşit boşluk bırakılır; dikey eksen ölçeği en büyük frekansa göre seçilir."],
    ["Tepe değer (mod) frekans tablosundan nasıl bulunur?", "Frekans sütunundaki en büyük sayıya bakılır ve bu sayının karşısındaki değer tepe değerdir. En büyük frekans birden fazla değerde görülüyorsa hepsi tepe değerdir; tüm frekanslar eşitse verinin tepe değeri yoktur."],
    ["Açıklık nasıl hesaplanır?", "Açıklık, veri içindeki en büyük değerden en küçük değerin çıkarılmasıyla bulunur. Örneğin en çok 5, en az 0 kitap okunan bir sınıfta açıklık 5'tir. Açıklık verinin ne kadar geniş bir aralığa yayıldığını gösterir."],
    ["Gruplandırılmış veride grup genişliği nasıl seçilir?", "Önce açıklık bulunur ve istenen grup sayısına bölünür. Grup genişliği, bu bölümden büyük olan ilk doğal sayı olarak alınır; bölüm tam sayı çıksa bile bir fazlası seçilir ki en büyük değer de son gruba girebilsin."],
    ["Histogram ile sütun grafiği farkı nedir?", "Sütun grafiği birbirinden bağımsız kategoriler için kullanılır ve sütunlar arasında boşluk bulunur. Histogram ise gruplandırılmış sayısal veri içindir; gruplar sayı doğrusunda kesintisiz olduğu için sütunlar bitişik çizilir."],
    ["Bağıl frekans ne demektir?", "Bağıl frekans, bir değerin frekansının toplam veri sayısına bölünmesiyle bulunan orandır. Örneğin 20 kişilik veride 7 kez görülen değerin bağıl frekansı 0,35 yani yüzde 35'tir; tüm bağıl frekansların toplamı 1 eder."],
    ["Frekansları toplayınca veri sayısı çıkmazsa ne yapılmalı?", "Bu durumda sayımda kesin bir hata vardır; bir değer atlanmış ya da iki kez sayılmıştır. Çeteleyi ve veri listesindeki işaretleri yeniden kontrol edin, gerekirse veriyi küçükten büyüğe sıralayıp yeniden sayın."]
  ],
  tools: ["tepe-deger-hesapla", "aciklik-hesapla", "ortalama-hesapla", "grafik-olustur"],
  related: ["ortalama-medyan-mod-nedir", "pasta-grafigi-nasil-yapilir", "ceyreklikler-ve-kutu-grafigi", "standart-sapma-nasil-hesaplanir"],
  sources: [
    ["MEB – Ortaokul Matematik Dersi Öğretim Programı (Veri İşleme)", "https://www.meb.gov.tr/"]
  ]
};
