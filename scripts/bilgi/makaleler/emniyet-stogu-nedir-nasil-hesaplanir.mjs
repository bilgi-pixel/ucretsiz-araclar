export default {
  slug: "emniyet-stogu-nedir-nasil-hesaplanir",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Emniyet Stoğu Nedir? Güvenlik Stoğu ve Yeniden Sipariş Noktası",
  pageTitle: "Emniyet Stoğu Nedir, Nasıl Hesaplanır? Yeniden Sipariş Noktası",
  description: "Emniyet stoğu, talep ve tedarik süresindeki dalgalanmaya karşı tutulan ek stoktur. İki formül, %95 hizmet düzeyi, yeniden sipariş noktası ve çözümlü örnekler.",
  keywords: ["emniyet stoğu nedir", "emniyet stoğu hesaplama", "güvenlik stoğu formülü", "yeniden sipariş noktası", "tedarik süresi stok", "minimum stok seviyesi", "stoksuz kalma riski", "hizmet düzeyi z değeri"],
  lead: "Emniyet stoğu, satışların beklenenden hızlı gitmesine ya da tedarikçinin geç teslim etmesine karşı <strong>normal ihtiyacın üzerinde tutulan yedek stoktur</strong>. En basit hesapla emniyet stoğu = (en yüksek günlük satış × en uzun tedarik süresi) − (ortalama günlük satış × ortalama tedarik süresi) olarak bulunur; istatistiksel yöntemde ise Z × günlük satış sapması × √tedarik süresi kullanılır. Bu sayfada iki yöntemi, %95 hizmet düzeyinin anlamını, yeniden sipariş noktasını ve fazla stoğun maliyetini aynı örnek üzerinden bulacaksınız.",
  kisaCevap: [
    "Emniyet stoğu, talep ve tedarik süresi belirsizliğine karşı tutulan ek stoktur; normal satışta kullanılmaz.",
    "Basit yöntem: emniyet stoğu = en yüksek günlük satış × en uzun tedarik süresi − ortalama günlük satış × ortalama tedarik süresi.",
    "İstatistiksel yöntem: emniyet stoğu = Z × günlük satışın standart sapması × √tedarik süresi (gün).",
    "Yeniden sipariş noktası = ortalama günlük satış × ortalama tedarik süresi + emniyet stoğu.",
    "%95 hizmet düzeyinde Z yaklaşık 1,65; %99'da 2,33'tür.",
    "Fazla emniyet stoğu sermaye bağlar, depo maliyeti ve bozulma riski yaratır."
  ],
  figure: {
    alt: "Testere dişi stok grafiği: stok yeniden sipariş noktası olan 333 birime düşünce sipariş verilir, 7 günlük tedarik süresi boyunca azalır ve 53 birimlik emniyet stoğu çizgisinin üzerinde yeni sipariş gelir.",
    caption: "Örnekte günde ortalama 40 birim satılır, tedarik 7 gün sürer. Stok 333 birime inince sipariş verilir; gecikme ya da yüksek talep olursa 53 birimlik emniyet stoğu devreye girer.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Stok seviyesi, sipariş noktası ve emniyet stoğu</text>
  <line x1="70" y1="340" x2="690" y2="340" class="st" fill="none"/>
  <line x1="70" y1="60" x2="70" y2="340" class="st" fill="none"/>
  <text x="60" y="345" class="sm end">0</text>
  <rect x="70" y="306" width="620" height="34" class="dgs"/>
  <text x="680" y="328" class="sm b end dg">Emniyet stoğu 53</text>
  <line x1="70" y1="207" x2="690" y2="207" class="sa dash" fill="none"/>
  <text x="60" y="211" class="sm end">333</text>
  <text x="680" y="200" class="sm b end">Yeniden sipariş noktası</text>
  <line x1="70" y1="306" x2="690" y2="306" class="sdg" fill="none"/>
  <polyline points="70,80 250,207 370,306 370,110 490,207 610,306 610,110 650,138" class="sp sw" fill="none"/>
  <circle cx="250" cy="207" r="6" class="p"/>
  <circle cx="490" cy="207" r="6" class="p"/>
  <text x="250" y="232" class="sm mid">sipariş ver</text>
  <line x1="250" y1="356" x2="370" y2="356" class="sp" fill="none"/>
  <text x="310" y="376" class="sm mid b">7 gün tedarik</text>
  <text x="380" y="104" class="sm">sipariş geldi</text>
  <rect x="420" y="250" width="260" height="46" rx="6" class="sf sb"/>
  <text x="432" y="270" class="sm">Beklenen talep: 40 × 7 = 280</text>
  <text x="432" y="288" class="sm">280 + 53 = 333 birim</text>
  <text x="380" y="402" class="sm mid mu">zaman (gün)</text>
</svg>`
  },
  sections: [
    {
      h: "Emniyet stoğu nedir, neden tutulur?",
      p: [
        "Bir ürünü sipariş ettiğiniz andan rafa ulaştığı ana kadar geçen süreye tedarik süresi denir. Bu süre boyunca satış devam eder; dolayısıyla sipariş, eldeki stok bu süreye yetecek seviyedeyken verilmelidir. Satışlar her gün tam ortalama kadar gerçekleşse ve tedarikçi her seferinde tam zamanında teslim etse emniyet stoğuna gerek kalmazdı.",
        "Gerçek hayatta ise iki belirsizlik vardır: bazı günler ortalamanın çok üzerinde satış olur, bazı siparişler gecikir. Emniyet stoğu bu iki belirsizliği karşılamak için tutulan tampondur. Amacı stoksuz kalma (\"stok dışı\") olasılığını kabul edilebilir bir düzeye indirmektir. Stoksuz kalmanın maliyeti kaçan satış, müşteri kaybı, pazaryerinde sıralama düşüşü ya da üretimin durması olabilir. Doğru emniyet stoğu, bu maliyetle fazla stok tutmanın maliyeti arasında denge kurar."
      ]
    },
    {
      h: "Emniyet stoğu nasıl hesaplanır? İki yöntem",
      p: [
        "Uygulamada en sık iki yöntem kullanılır. Birincisi geçmişteki en kötü durumları esas alan <strong>en yüksek–ortalama yöntemi</strong>dir; veri azken ve hızlı karar gerekiyorsa uygundur. İkincisi talebin dalgalanmasını standart sapmayla ölçen <strong>hizmet düzeyi (istatistiksel) yöntemi</strong>dir; hedeflenen stoksuz kalmama olasılığını doğrudan seçmenizi sağlar."
      ],
      formula: "Yöntem 1: ES = (en yüksek günlük satış × en uzun tedarik süresi) − (ortalama günlük satış × ortalama tedarik süresi)\nYöntem 2: ES = Z × σ(günlük satış) × √(tedarik süresi)\nYeniden sipariş noktası = ortalama günlük satış × ortalama tedarik süresi + ES",
      after: [
        "İkinci formül, tedarik süresinin sabit olduğunu ve günlük satışların yaklaşık normal dağıldığını varsayar. Tedarik süresi de çok değişkense formül bu değişkenliği de içerecek biçimde genişletilir; küçük işletmeler için birinci yöntemle başlamak çoğu zaman yeterlidir."
      ]
    },
    {
      h: "Çözümlü örnek 1: en yüksek–ortalama yöntemi",
      ol: [
        "Son üç ayda ürünün ortalama günlük satışı 40 adet, en yüksek günlük satışı 60 adet.",
        "Tedarikçinin ortalama teslim süresi 7 gün, en uzun teslim süresi 10 gün.",
        "En kötü durumdaki talep: 60 × 10 = 600 adet.",
        "Beklenen talep: 40 × 7 = 280 adet.",
        "Emniyet stoğu: 600 − 280 = 320 adet; bu, ortalama satışla 8 günlük stoktur.",
        "Yeniden sipariş noktası: 280 + 320 = 600 adet."
      ],
      after: [
        "Bu yöntem kolaydır ama çok temkinlidir: en yüksek satış günü ile en uzun gecikmenin aynı anda yaşanacağını varsayar. Bu nedenle genellikle yüksek emniyet stoğu verir. Stoksuz kalmanın çok pahalı olduğu kritik ürünlerde tercih edilebilir; ancak çok sayıda ürün için uygulanırsa depoda gereğinden fazla sermaye bağlanır."
      ]
    },
    {
      h: "Çözümlü örnek 2: %95 hizmet düzeyi",
      ol: [
        "Ortalama günlük satış 40 adet, günlük satışların standart sapması 12 adet.",
        "Tedarik süresi 7 gün; √7 ≈ 2,646.",
        "%95 hizmet düzeyi için Z ≈ 1,645.",
        "Emniyet stoğu: 1,645 × 12 × 2,646 ≈ 52,2; yukarı yuvarlayarak 53 adet.",
        "Yeniden sipariş noktası: 40 × 7 + 53 = 333 adet."
      ],
      after: [
        "Aynı ürün için ilk yöntem 320, ikinci yöntem 53 adet emniyet stoğu verdi. Fark, ilk yöntemin en kötü senaryoyu, ikinci yöntemin ise belirli bir olasılık düzeyini hedeflemesinden kaynaklanır. Standart sapmayı hesaplamak için son birkaç ayın günlük satışlarını kullanabilir, kavramın açıklaması için [[bilgi:standart-sapma-nasil-hesaplanir|standart sapma nasıl hesaplanır]] yazısına bakabilirsiniz. Her iki yöntemi de [[arac:emniyet-stogu-hesapla|Emniyet Stoğu Hesaplama]] aracında seçerek deneyebilirsiniz."
      ]
    },
    {
      h: "Hizmet düzeyi yüzde 95 ne demek?",
      p: [
        "Hizmet düzeyi, bir sipariş döngüsü boyunca stoksuz kalmama olasılığıdır. %95 hizmet düzeyi, her 100 sipariş döngüsünün yaklaşık 95'inde emniyet stoğunun yeteceği, 5'inde ise stoğun tükenebileceği anlamına gelir. Hedef yükseldikçe Z katsayısı ve dolayısıyla emniyet stoğu hızla artar."
      ],
      table: {
        head: ["Hizmet düzeyi", "Z katsayısı", "Örnekteki emniyet stoğu", "Yeniden sipariş noktası"],
        rows: [
          ["%90", "1,28", "41 adet", "321 adet"],
          ["%95", "1,65", "53 adet", "333 adet"],
          ["%97,5", "1,96", "63 adet", "343 adet"],
          ["%99", "2,33", "74 adet", "354 adet"]
        ],
        caption: "Değerler ortalama 40 adet/gün, standart sapma 12 adet ve 7 günlük tedarik süresiyle hesaplanmış, yukarı yuvarlanmıştır. Z değerleri standart normal dağılım tablosundan alınır."
      },
      after: [
        "%95'ten %99'a çıkmak emniyet stoğunu yaklaşık %40 artırır. Bu yüzden tüm ürünlere aynı hizmet düzeyini vermek yerine çok satan ve kritik ürünlere yüksek, yavaş dönen ürünlere daha düşük hedef koymak yaygın bir yaklaşımdır. Z katsayısının ne olduğu [[bilgi:z-skoru-nedir-nasil-hesaplanir|z skoru nedir]] yazısında anlatılır."
      ]
    },
    {
      h: "Tedarik süresi emniyet stoğunu nasıl etkiler?",
      p: [
        "İstatistiksel formülde tedarik süresi karekök içinde yer alır. Bu, sürenin dört katına çıkmasının emniyet stoğunu iki katına çıkardığı anlamına gelir. Örnekte tedarik süresi 7 günden 28 güne çıksaydı (örneğin yurt dışından ithalat), %95 hizmet düzeyinde emniyet stoğu 1,645 × 12 × √28 ≈ 104,4, yani 105 adet olurdu. Tedarik süresi 7 günden 28 güne çıkarken emniyet stoğu yalnızca iki katına çıkar; ama tedarik süresindeki beklenen talep 280 adetten 1.120 adete yükselir ve sipariş noktası buna göre çok daha yukarı taşınır.",
        "Tedarik süresi yalnızca uzun değil, aynı zamanda düzensizse etkisi daha da büyür. Tedarikçiyle teslim süresini sabitlemek, yerel bir alternatif tedarikçi bulmak ya da sipariş sıklığını artırmak emniyet stoğunu düşürmenin en etkili yollarıdır. Kargo ve gümrük süreçlerinin de tedarik süresine dahil olduğunu unutmayın."
      ]
    },
    {
      h: "Minimum stok ile emniyet stoğu aynı mı?",
      p: [
        "Günlük dilde çoğu zaman aynı anlamda kullanılsalar da aralarında fark vardır. Emniyet stoğu, belirsizliğe karşı tutulan ve normal koşullarda hiç kullanılmaması beklenen tampondur. Minimum stok seviyesi ise bazı işletmelerde emniyet stoğuyla aynı, bazılarında ise yeniden sipariş noktası anlamında kullanılır."
      ],
      table: {
        head: ["Kavram", "Örnekteki değer", "Anlamı"],
        rows: [
          ["Emniyet stoğu", "53 adet", "Belirsizliğe karşı tampon"],
          ["Tedarik süresi talebi", "280 adet", "Sipariş gelene kadar beklenen satış"],
          ["Yeniden sipariş noktası", "333 adet", "Bu seviyeye inince sipariş verilir"],
          ["Sipariş miktarı", "EOQ ile belirlenir", "Her seferinde ne kadar sipariş verileceği"],
          ["En yüksek stok", "Emniyet stoğu + sipariş miktarı", "Sipariş geldiği andaki stok"]
        ]
      },
      after: [
        "Her siparişte ne kadar alınacağını belirlemek için [[arac:ekonomik-siparis-miktari-hesapla|Ekonomik Sipariş Miktarı Hesaplama]] aracına ve [[bilgi:ekonomik-siparis-miktari-eoq-nedir|EOQ nedir]] yazısına bakabilirsiniz. Emniyet stoğu ile sipariş miktarı birbirinden bağımsız iki karardır."
      ]
    },
    {
      h: "Fazla emniyet stoğunun maliyeti nedir?",
      p: [
        "Emniyet stoğu ücretsiz değildir. Depoda bekleyen her ürün sermaye bağlar; bu parayla başka bir yatırım yapılamaz. Ayrıca depo kirası, sigorta, sayım ve kayıp riski, modası geçme, son kullanma tarihi ve fiyat düşüşü gibi maliyetler doğar. Bu giderlerin yıllık toplamı genellikle stok değerinin belirli bir yüzdesi olarak ifade edilir ve \"stok taşıma maliyeti\" diye anılır.",
        "Örneğin birim maliyeti 200 TL olan üründe 53 adetlik emniyet stoğu 10.600 TL değerindedir. Yıllık taşıma maliyeti stok değerinin %25'i kabul edilirse (örnek oran) bu tampon yılda 2.650 TL'ye mal olur. 320 adetlik temkinli yöntemle ise stok değeri 64.000 TL, yıllık taşıma maliyeti 16.000 TL olur. Fazla stok stok devir hızını da düşürür; ayrıntı için [[bilgi:stok-devir-hizi-nasil-hesaplanir|stok devir hızı nasıl hesaplanır]] yazısına bakın."
      ]
    },
    {
      h: "E-ticarette emniyet stoğu kaç günlük olmalı?",
      p: [
        "Herkese uyan tek bir gün sayısı yoktur; doğru değer ürünün satış dalgalanmasına, tedarik süresine ve stoksuz kalmanın maliyetine bağlıdır. Yine de bir başlangıç noktası olarak emniyet stoğunu ortalama satışın kaç gününe denk geldiğine göre izlemek pratiktir: örnekteki 53 adet, günde 40 satışla yaklaşık 1,3 günlük stoktur.",
        "Pazaryerlerinde stoksuz kalmak ürünün listelemede geri düşmesine yol açabildiği için çok satan ürünlerde hizmet düzeyini yüksek tutmak mantıklıdır. Kampanya dönemleri, bayram ve indirim günleri gibi tahmin edilebilir talep artışları ise emniyet stoğuyla değil, o döneme özel ek siparişle karşılanmalıdır; emniyet stoğu yalnızca öngörülemeyen dalgalanmalar içindir."
      ],
      ul: [
        "Çok satan, kritik ürünler: %97,5–99 hizmet düzeyi.",
        "Orta hızda dönen ürünler: %95 civarı.",
        "Yavaş dönen, pahalı ya da kısa ömürlü ürünler: %90 ya da daha düşük.",
        "Her ay veriyi güncelleyip emniyet stoğunu yeniden hesaplayın."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Mevsimselliği belirsizlik sanmak:</strong> Bilinen sezon artışları emniyet stoğuyla değil, planlı siparişle karşılanır.",
        "<strong>Tedarik süresine kargo ve hazırlık süresini eklememek:</strong> Gerçek süre sipariş verildiği andan satışa hazır olana kadardır.",
        "<strong>Ondalıklı sonucu aşağı yuvarlamak:</strong> Emniyet stoğu her zaman yukarı yuvarlanır.",
        "<strong>Bir kez hesaplayıp bırakmak:</strong> Satış hızı değiştikçe değer de değişir.",
        "<strong>Her ürüne aynı hizmet düzeyini vermek:</strong> Gereksiz sermaye bağlar."
      ]
    }
  ],
  faq: [
    ["Emniyet stoğu nedir?", "Emniyet stoğu, satışların beklenenden fazla olmasına ya da tedarikin gecikmesine karşı normal ihtiyacın üzerinde tutulan yedek stoktur. Amacı stoksuz kalma olasılığını kabul edilebilir düzeye indirmektir."],
    ["Emniyet stoğu nasıl hesaplanır?", "Basit yöntemde en yüksek günlük satış ile en uzun tedarik süresinin çarpımından, ortalama günlük satış ile ortalama tedarik süresinin çarpımı çıkarılır. İstatistiksel yöntemde Z katsayısı, günlük satış sapması ve tedarik süresinin karekökü çarpılır."],
    ["Yeniden sipariş noktası nasıl bulunur?", "Ortalama günlük satış ortalama tedarik süresiyle çarpılır ve emniyet stoğu eklenir. Günde 40 satış, 7 gün tedarik ve 53 emniyet stoğuyla sipariş noktası 333 adettir."],
    ["Tedarik süresi emniyet stoğunu nasıl etkiler?", "İstatistiksel formülde tedarik süresi karekök içindedir; süre dört katına çıkınca emniyet stoğu iki katına çıkar. Süre düzensizse etkisi daha da büyür, bu yüzden teslim süresini sabitlemek önemlidir."],
    ["Minimum stok ile emniyet stoğu aynı mı?", "Tam olarak değil. Emniyet stoğu belirsizliğe karşı tampondur; minimum stok bazı işletmelerde emniyet stoğu, bazılarında ise yeniden sipariş noktası anlamında kullanılır. Kavramı işletmenizde net tanımlamak gerekir."],
    ["Hizmet düzeyi yüzde 95 ne demek?", "Her 100 sipariş döngüsünün yaklaşık 95'inde stoğun yeteceği, 5'inde tükenebileceği anlamına gelir. Bu düzey için Z katsayısı yaklaşık 1,65'tir; %99 için 2,33'e çıkar."],
    ["Fazla emniyet stoğunun maliyeti nedir?", "Fazla stok sermaye bağlar, depo, sigorta ve sayım gideri yaratır, bozulma ve modası geçme riskini artırır. Bu maliyetler genellikle stok değerinin yıllık belli bir yüzdesi olarak hesaplanır."],
    ["E-ticarette emniyet stoğu kaç günlük olmalı?", "Sabit bir gün sayısı yoktur; satış dalgalanması, tedarik süresi ve stoksuz kalmanın maliyetine göre belirlenir. Çok satan ürünlerde yüksek, yavaş dönen ürünlerde düşük hizmet düzeyi seçmek yaygındır."],
    ["Emniyet stoğu ne zaman yeniden hesaplanmalı?", "Satış hızı, tedarikçi ya da teslim süresi değiştiğinde ve en az ayda bir güncel satış verisiyle yeniden hesaplanmalıdır. Eski veriyle hesaplanan değer gereğinden düşük ya da yüksek kalabilir."]
  ],
  tools: ["emniyet-stogu-hesapla", "ekonomik-siparis-miktari-hesapla", "stok-devir-hizi-hesapla"],
  related: ["ekonomik-siparis-miktari-eoq-nedir", "stok-devir-hizi-nasil-hesaplanir", "standart-sapma-nasil-hesaplanir", "z-skoru-nedir-nasil-hesaplanir"]
};
