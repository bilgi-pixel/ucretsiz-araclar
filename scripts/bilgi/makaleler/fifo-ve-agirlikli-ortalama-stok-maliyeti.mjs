export default {
  slug: "fifo-ve-agirlikli-ortalama-stok-maliyeti",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "FIFO ve Ağırlıklı Ortalama Maliyet: Stok Maliyeti Nasıl Hesaplanır?",
  pageTitle: "FIFO ve Ağırlıklı Ortalama Maliyet: Stok Maliyeti Hesabı",
  description: "FIFO'da ilk alınan mal ilk satılmış sayılır; ağırlıklı ortalamada toplam maliyet toplam miktara bölünür. Aynı alış-satış verisiyle üç yöntemin karşılaştırması.",
  keywords: ["fifo nedir", "ilk giren ilk çıkar", "ağırlıklı ortalama maliyet", "stok maliyet yöntemleri", "satılan malın maliyeti", "stok değerleme", "lifo türkiye", "hareketli ortalama"],
  lead: "FIFO (ilk giren ilk çıkar) yönteminde satılan mallar en eski alışlardan karşılanmış sayılır ve dönem sonu stok en yeni fiyatlarla değerlenir; ağırlıklı ortalama yönteminde ise toplam alış maliyeti toplam miktara bölünür ve her satış bu ortalama birim maliyetle hesaplanır. Fiyatların arttığı dönemlerde FIFO daha düşük satılan malın maliyeti ve daha yüksek kâr gösterir. Bu yazıda aynı alış-satış hareketleriyle FIFO, dönem sonu ağırlıklı ortalama ve hareketli ortalama hesaplarını adım adım yapıyor, sonuçları karşılaştırıyor ve Türkiye'deki uygulamayı özetliyoruz.",
  kisaCevap: [
    "Satılan malın maliyeti (SMM) = dönem başı stok + dönem içi alışlar − dönem sonu stok.",
    "FIFO: satılan birimler en eski alış partisinden düşülür; kalan stok en yeni alış fiyatlarını taşır.",
    "Dönem sonu ağırlıklı ortalama: birim maliyet = (devir tutarı + alış tutarları) ÷ (devir miktarı + alış miktarları).",
    "Hareketli ortalama: her alıştan sonra ortalama yeniden hesaplanır ve sonraki satışlar bu güncel ortalamayla maliyetlenir.",
    "Fiyatlar artarken FIFO en düşük SMM'yi ve en yüksek brüt kârı, LIFO ise en yüksek SMM'yi verir.",
    "Türkiye Muhasebe Standartları (TMS 2) LIFO'yu kabul etmez; FIFO ve ağırlıklı ortalama yöntemleri kullanılır."
  ],
  figure: {
    alt: "Mart ayı stok hareketleri: devir 100 adet × 50 TL, 5 Mart 200 × 60 TL alış, 20 Mart 100 × 70 TL alış, toplam 330 adet satış. FIFO'da satılan malın maliyeti 19.100 TL ve kalan stok 4.900 TL; ağırlıklı ortalamada 19.800 ve 4.200 TL; hareketli ortalamada 19.660 ve 4.340 TL.",
    caption: "Aynı 24.000 TL'lik maliyet havuzu üç yöntemde satılan mal ile kalan stok arasında farklı bölünür. Toplam her zaman aynıdır; değişen, maliyetin hangi döneme yazıldığıdır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">24.000 TL'lik maliyet nasıl bölünür?</text>
  <rect x="30" y="50" width="660" height="90" rx="10" class="sf sb"/>
  <text x="46" y="76" class="b">Mart hareketleri</text>
  <g class="sm">
    <text x="46" y="102">1 Mart devir: 100 × 50 TL</text>
    <text x="46" y="124">5 Mart alış: 200 × 60 TL</text>
    <text x="290" y="102">10 Mart satış: 150 adet</text>
    <text x="290" y="124">20 Mart alış: 100 × 70 TL</text>
    <text x="510" y="102">25 Mart satış: 180 adet</text>
    <text x="510" y="124" class="b">Kalan: 70 adet</text>
  </g>
  <text x="30" y="178" class="b">FIFO</text>
  <rect x="190" y="160" width="398" height="32" class="p"/>
  <rect x="588" y="160" width="102" height="32" class="oks"/>
  <text x="389" y="181" class="mid sm b sf">SMM 19.100 TL</text>
  <text x="639" y="181" class="mid sm b">4.900</text>
  <text x="30" y="238" class="b">Hareketli ortalama</text>
  <rect x="190" y="220" width="410" height="32" class="p"/>
  <rect x="600" y="220" width="90" height="32" class="oks"/>
  <text x="395" y="241" class="mid sm b sf">SMM 19.660 TL</text>
  <text x="645" y="241" class="mid sm b">4.340</text>
  <text x="30" y="298" class="b">Dönem sonu ortalama</text>
  <rect x="190" y="280" width="412" height="32" class="p"/>
  <rect x="602" y="280" width="88" height="32" class="oks"/>
  <text x="396" y="301" class="mid sm b sf">SMM 19.800 TL</text>
  <text x="646" y="301" class="mid sm b">4.200</text>
  <text x="30" y="358" class="b mu">LIFO (TMS'de yok)</text>
  <rect x="190" y="340" width="427" height="32" class="dgs"/>
  <rect x="617" y="340" width="73" height="32" class="oks"/>
  <text x="403" y="361" class="mid sm b">SMM 20.500 TL</text>
  <text x="653" y="361" class="mid sm b">3.500</text>
  <text x="190" y="400" class="sm t2">Koyu: satılan malın maliyeti · Yeşil: dönem sonu stok değeri</text>
</svg>`
  },
  sections: [
    {
      h: "Stok maliyet yöntemi neden önemlidir?",
      p: [
        "Bir işletme aynı ürünü dönem içinde farklı fiyatlarla birkaç kez satın alır. Ürün satıldığında hangi fiyatlı partinin satıldığını tek tek izlemek çoğu zaman mümkün değildir; özdeş ürünler aynı rafta karışır. Stok maliyet yöntemi, satılan birimlere hangi maliyetin yükleneceğini ve elde kalan stokun hangi değerle görüneceğini belirleyen kuraldır.",
        "Yöntem seçimi toplam maliyeti değiştirmez, yalnızca onu dönemler arasında farklı dağıtır. Ancak bu dağılım satılan malın maliyetini, brüt kârı, bilançodaki stok değerini, stok devir hızı gibi oranları ve dönemin vergi matrahını etkiler. Bu yüzden yöntemin bilinçli seçilmesi ve her dönem tutarlı uygulanması gerekir."
      ],
      formula: "Satılan malın maliyeti (SMM) = dönem başı stok + dönem içi alışlar − dönem sonu stok\nBrüt satış kârı = net satışlar − SMM"
    },
    {
      h: "FIFO (ilk giren ilk çıkar) yöntemi nedir?",
      p: [
        "FIFO, İngilizce \"first in, first out\" ifadesinin kısaltmasıdır. Bu yöntemde satılan birimler önce en eski alış partisinden düşülür; o parti bitince bir sonrakine geçilir. Böylece dönem sonunda elde kalan stok en son alınan partilerden oluşur ve güncel fiyatlara yakın bir değerle görünür.",
        "FIFO çoğu zaman malların fiziksel akışıyla da uyumludur: gıda, ilaç, kozmetik ve son kullanma tarihi olan ürünlerde eski ürünün önce satılması zaten bir zorunluluktur. Yöntemin mantığı kolay anlaşılır ve dönem sonu stok değeri gerçeğe yakındır."
      ],
      ol: [
        "Mart ayı hareketleri: 1 Mart devir 100 adet × 50 TL; 5 Mart alış 200 adet × 60 TL; 10 Mart satış 150 adet; 20 Mart alış 100 adet × 70 TL; 25 Mart satış 180 adet.",
        "10 Mart satışı (150 adet): önce devirdeki 100 adet × 50 = 5.000 TL, sonra 5 Mart partisinden 50 adet × 60 = 3.000 TL. Maliyet 8.000 TL.",
        "25 Mart satışı (180 adet): 5 Mart partisinde kalan 150 adet × 60 = 9.000 TL, sonra 20 Mart partisinden 30 adet × 70 = 2.100 TL. Maliyet 11.100 TL.",
        "Toplam SMM: 8.000 + 11.100 = 19.100 TL.",
        "Kalan stok: 20 Mart partisinden 70 adet × 70 = 4.900 TL.",
        "Kontrol: 19.100 + 4.900 = 24.000 TL, yani devir ve alışların toplamı."
      ]
    },
    {
      h: "Ağırlıklı ortalama maliyet nasıl hesaplanır?",
      p: [
        "Dönem sonu ağırlıklı ortalama yönteminde dönemin tüm maliyet havuzu, yani devir ve alışların toplam tutarı, toplam miktara bölünür. Bulunan birim maliyet hem satılan birimlere hem de kalan stoka uygulanır. Hesap dönem sonunda bir kez yapıldığı için uygulaması kolaydır."
      ],
      formula: "Ağırlıklı ortalama birim maliyet = Σ(miktar × birim fiyat) ÷ Σ(miktar)\n= (100 × 50 + 200 × 60 + 100 × 70) ÷ (100 + 200 + 100)\n= 24.000 ÷ 400 = 60 TL\nSMM = 330 × 60 = 19.800 TL · Kalan stok = 70 × 60 = 4.200 TL",
      after: [
        "Ortalamanın \"ağırlıklı\" olması, her alış fiyatının miktarı kadar etki etmesi demektir. Basit ortalama (50 + 60 + 70) ÷ 3 = 60 bu örnekte tesadüfen aynı çıkıyor; miktarlar farklı olsaydı sonuç değişirdi. Hesabı [[arac:agirlikli-ortalama-hesapla|Ağırlıklı Ortalama Hesaplama]] aracında değerleri fiyat, ağırlıkları miktar olarak girerek yapabilirsiniz."
      ]
    },
    {
      h: "Hareketli ortalama ile dönem sonu ortalaması farkı",
      p: [
        "Hareketli (sürekli) ortalama yönteminde ortalama birim maliyet her alıştan sonra yeniden hesaplanır. Satışlar, o tarihteki güncel ortalamayla maliyetlenir. Sürekli envanter tutan, yani her hareketi anında stok kartına işleyen işletmeler ve muhasebe yazılımları çoğunlukla bu yöntemi kullanır."
      ],
      table: {
        head: ["Tarih", "Hareket", "Miktar", "Tutar", "Stok miktarı", "Stok tutarı", "Ortalama"],
        rows: [
          ["1 Mart", "Devir", "100", "5.000", "100", "5.000", "50,00"],
          ["5 Mart", "Alış", "200", "12.000", "300", "17.000", "56,67"],
          ["10 Mart", "Satış", "−150", "−8.500", "150", "8.500", "56,67"],
          ["20 Mart", "Alış", "100", "7.000", "250", "15.500", "62,00"],
          ["25 Mart", "Satış", "−180", "−11.160", "70", "4.340", "62,00"]
        ],
        caption: "Hareketli ortalamada SMM = 8.500 + 11.160 = 19.660 TL, kalan stok 4.340 TL. Ortalama her alıştan sonra stok tutarı ÷ stok miktarı ile güncellenir."
      },
      after: [
        "Dönem sonu ortalaması bütün ayın alışlarını tek ortalamada birleştirir; 10 Mart'taki satış, henüz yapılmamış 20 Mart alışının fiyatından da etkilenir. Hareketli ortalama ise satışı yalnızca o güne kadarki alışlarla maliyetlendirir. Bu nedenle hareketli ortalamanın sonucu FIFO ile dönem sonu ortalaması arasında çıkmıştır."
      ]
    },
    {
      h: "Fiyatlar artarken hangi yöntem daha yüksek kâr gösterir?",
      p: [
        "Örnekte alış fiyatları 50'den 70 TL'ye yükseliyor. Satışların ilkinin 90, ikincisinin 95 TL'den yapıldığını varsayalım: hasılat 150 × 90 + 180 × 95 = 30.600 TL. Aşağıdaki tablo dört yöntemi karşılaştırır."
      ],
      table: {
        head: ["Yöntem", "SMM", "Brüt kâr", "Dönem sonu stok"],
        rows: [
          ["FIFO", "19.100 TL", "11.500 TL", "4.900 TL"],
          ["Hareketli ortalama", "19.660 TL", "10.940 TL", "4.340 TL"],
          ["Dönem sonu ağırlıklı ortalama", "19.800 TL", "10.800 TL", "4.200 TL"],
          ["LIFO (karşılaştırma için)", "20.500 TL", "10.100 TL", "3.500 TL"]
        ],
        caption: "LIFO'da (son giren ilk çıkar) 10 Mart satışı 5 Mart partisinden (9.000 TL), 25 Mart satışı 100 × 70 + 50 × 60 + 30 × 50 = 11.500 TL olarak hesaplanmıştır."
      },
      after: [
        "Fiyatların arttığı dönemde FIFO, satışlara eski ve ucuz maliyetleri yüklediği için en düşük SMM'yi ve en yüksek kârı gösterir; stok ise güncel fiyatlara yakın değerlenir. Ortalama yöntemler fiyat dalgalanmalarını yumuşatır. Fiyatlar düşerken tablo tersine döner. Hiçbir yöntem toplam kârı değiştirmez; stok tamamen satıldığında bütün yöntemlerde toplam kâr aynı olur, yalnızca dönemler arasındaki dağılım farklıdır."
      ]
    },
    {
      h: "Türkiye'de vergi ve muhasebe açısından hangi yöntemler kabul edilir?",
      p: [
        "Vergi Usul Kanunu md. 274'e göre emtia maliyet bedeliyle değerlenir. Türkiye'deki vergi uygulamasında maliyet bedelinin tespitinde ağırlıklı ortalama ve FIFO yöntemlerinin kullanılabildiği kabul edilir; LIFO yöntemi ise kabul görmez. Türkiye Muhasebe Standartları'ndaki TMS 2 Stoklar standardı da FIFO ve ağırlıklı ortalama yöntemlerine izin verir, LIFO'yu açıkça yasaklar.",
        "Seçilen yöntem her dönem tutarlı uygulanmalıdır; muhasebenin süreklilik ve tutarlılık ilkeleri yöntemin keyfî değiştirilmesine izin vermez. Enflasyon düzeltmesi, değer düşüklüğü ve emsal bedel gibi özel durumlar da stok değerlemesini etkiler. İşletmeniz için uygun yöntemi ve yöntem değişikliğinin sonuçlarını mutlaka mali müşavirinizle değerlendirin."
      ]
    },
    {
      h: "Stok devir hızı maliyet yönteminden etkilenir mi?",
      p: [
        "Evet. Stok devir hızı satılan malın maliyetinin ortalama stoka bölünmesiyle hesaplandığı için, yöntem hem payı hem paydayı değiştirir. Örnekte dönem başı stok 5.000 TL'dir."
      ],
      ul: [
        "FIFO: ortalama stok (5.000 + 4.900) ÷ 2 = 4.950 TL → devir hızı 19.100 ÷ 4.950 ≈ 3,86.",
        "Dönem sonu ağırlıklı ortalama: ortalama stok (5.000 + 4.200) ÷ 2 = 4.600 TL → devir hızı 19.800 ÷ 4.600 ≈ 4,30.",
        "Aynı fiziksel hareketlere rağmen oran yaklaşık %11 farklı çıkar; farklı yöntem kullanan işletmeleri karşılaştırırken bu fark dikkate alınmalıdır."
      ],
      after: [
        "Devir hızının yorumu ve sektör karşılaştırması [[bilgi:stok-devir-hizi-nasil-hesaplanir|stok devir hızı nasıl hesaplanır]] yazısında, hesabı [[arac:stok-devir-hizi-hesapla|Stok Devir Hızı Hesaplama]] aracında bulabilirsiniz."
      ]
    },
    {
      h: "Küçük işletme stok maliyetini tabloda nasıl takip eder?",
      p: [
        "Muhasebe programı kullanmayan küçük bir işletme bile basit bir tabloyla hareketli ortalamayı ya da FIFO'yu izleyebilir. Önemli olan her hareketin tarih sırasıyla ve eksiksiz girilmesidir."
      ],
      ol: [
        "Her ürün için ayrı bir sayfa açın; sütunlar: tarih, açıklama, giriş miktarı, giriş birim fiyatı, çıkış miktarı, kalan miktar, kalan tutar, ortalama birim maliyet.",
        "Alışlarda giriş tutarını (miktar × fiyat) kalan tutara ekleyin, kalan miktarı artırın ve ortalamayı kalan tutar ÷ kalan miktar olarak yeniden hesaplayın.",
        "Satışlarda çıkış maliyetini o anki ortalama × çıkış miktarı olarak hesaplayın ve kalan tutardan düşün.",
        "Nakliye, gümrük gibi alışa doğrudan bağlı giderleri alış maliyetine ekleyin; iade ve iskontoları düşün.",
        "Dönem sonunda tablodaki kalan miktarı fiziki sayımla karşılaştırın; farkları fire ya da sayım farkı olarak ayrıca kaydedin."
      ],
      after: [
        "Her ürünü takip etmek için düzenli bir stok kodu sistemi işinizi kolaylaştırır; [[bilgi:sku-stok-kodu-nasil-olusturulur|SKU stok kodu]] yazısı bunun nasıl kurulacağını anlatır. Sayım günü yapılacaklar ise [[bilgi:yil-sonu-stok-sayimi-nasil-yapilir|yıl sonu stok sayımı]] yazısında. Üretim yapan işletmelerde birim maliyete hammadde dışındaki giderleri de eklemek için [[arac:birim-maliyet-hesapla|Birim Maliyet Hesaplama]] aracı kullanılabilir."
      ]
    },
    {
      h: "Yöntem değişikliği yapılabilir mi?",
      p: [
        "Muhasebede yöntem değişikliği mümkündür ama keyfî olamaz. TMS 8 standardına göre bir muhasebe politikası ancak bir standart gerektiriyorsa ya da değişiklik finansal tabloların daha güvenilir ve anlamlı bilgi sunmasını sağlıyorsa değiştirilir ve değişikliğin etkisi açıklanır. Vergi açısından da yöntemin değiştirilmesi, geçiş dönemi stok değerinin nasıl belirleneceği gibi konular nedeniyle dikkatle planlanmalıdır.",
        "Pratik açıdan en önemli kural tutarlılıktır: bir dönem FIFO, sonraki dönem ortalama kullanmak kârı yapay olarak bir dönemden diğerine kaydırır ve hem yöneticileri hem de denetimi yanıltır. Değişiklik düşünüyorsanız önceden mali müşavirinizle görüşün ve gerekçeyi yazılı hâle getirin."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Basit ortalama kullanmak:</strong> fiyatların miktarla ağırlıklandırılmaması farklı büyüklükteki alışlarda yanlış maliyet verir.",
        "<strong>Hareketleri tarih sırasına koymamak:</strong> FIFO ve hareketli ortalama sıraya bağlıdır; geç girilen bir alış tüm sonraki satışları bozar.",
        "<strong>Alışa bağlı giderleri unutmak:</strong> nakliye ve gümrük gibi giderler maliyete eklenmezse kâr olduğundan yüksek görünür.",
        "<strong>Yöntemleri dönemden döneme değiştirmek:</strong> kârın dönemler arasında yapay olarak kaymasına yol açar.",
        "<strong>Fiziki sayım yapmamak:</strong> kayıttaki stokla raftaki stok arasındaki fark (fire, kayıp) maliyet hesabını yanıltır."
      ]
    }
  ],
  faq: [
    ["FIFO (ilk giren ilk çıkar) yöntemi nedir?", "FIFO'da satılan birimler önce en eski alış partisinden düşülür, o parti bitince bir sonrakine geçilir. Dönem sonunda elde kalan stok en son alınan partilerden oluşur ve güncel fiyatlara yakın bir değerle görünür."],
    ["Ağırlıklı ortalama maliyet nasıl hesaplanır?", "Devir ve alışların toplam tutarı toplam miktara bölünerek birim maliyet bulunur. Örnekte 24.000 TL ÷ 400 adet = 60 TL'dir; satılan 330 adedin maliyeti 19.800 TL, kalan 70 adedin değeri 4.200 TL olur."],
    ["Fiyatlar artarken hangi yöntem daha yüksek kâr gösterir?", "Fiyatlar artarken FIFO, satışlara eski ve ucuz maliyetleri yüklediği için en düşük satılan malın maliyetini ve en yüksek brüt kârı gösterir. Ortalama yöntemler bu etkiyi yumuşatır; fiyatlar düşerken sıralama tersine döner."],
    ["Türkiye'de vergi açısından hangi yöntemler kabul edilir?", "Vergi Usul Kanunu emtianın maliyet bedeliyle değerlenmesini öngörür; uygulamada ağırlıklı ortalama ve FIFO yöntemleri kullanılır, LIFO kabul edilmez. TMS 2 de LIFO'yu yasaklar. Seçiminizi mali müşavirinizle yapın."],
    ["Satılan malın maliyeti nasıl bulunur?", "Dönem başı stok ile dönem içi alışların toplamından dönem sonu stok düşülür. Örnekte 5.000 + 19.000 − 4.900 = 19.100 TL FIFO'ya göre satılan malın maliyetidir; dönem sonu stok seçilen yönteme göre değişir."],
    ["Hareketli ortalama ile dönem sonu ortalaması farkı nedir?", "Hareketli ortalamada birim maliyet her alıştan sonra yeniden hesaplanır ve satış o günkü ortalamayla maliyetlenir. Dönem sonu ortalamasında ise tüm dönemin alışları tek bir ortalamada birleştirilir ve hesap dönem sonunda bir kez yapılır."],
    ["Stok devir hızı maliyet yönteminden etkilenir mi?", "Evet, çünkü yöntem hem satılan malın maliyetini hem de ortalama stoku değiştirir. Örnekte FIFO ile devir hızı yaklaşık 3,86, dönem sonu ağırlıklı ortalama ile yaklaşık 4,30 çıkar."],
    ["Küçük işletme stok maliyetini Excel'de nasıl takip eder?", "Her ürün için tarih, giriş, çıkış, kalan miktar, kalan tutar ve ortalama sütunları olan bir tablo tutulur. Alışlarda ortalama yeniden hesaplanır, satışlarda çıkış o anki ortalamayla maliyetlenir ve dönem sonunda fiziki sayımla karşılaştırılır."],
    ["Yöntem değişikliği yapılabilir mi?", "Yapılabilir ama keyfî olamaz. Değişiklik ancak daha güvenilir bilgi sağlıyorsa ya da bir standart gerektiriyorsa yapılır, etkisi açıklanır ve vergi sonuçları planlanır. Her dönem tutarlı yöntem kullanmak esastır; mali müşavirinize danışın."]
  ],
  tools: ["agirlikli-ortalama-hesapla", "birim-maliyet-hesapla", "stok-devir-hizi-hesapla"],
  related: ["stok-devir-hizi-nasil-hesaplanir", "yil-sonu-stok-sayimi-nasil-yapilir", "sku-stok-kodu-nasil-olusturulur", "gelir-tablosu-nasil-okunur-brut-faaliyet-net-kar"],
  sources: [
    ["Gelir İdaresi Başkanlığı – Vergi Usul Kanunu", "https://www.gib.gov.tr/"],
    ["Kamu Gözetimi Kurumu – TMS 2 Stoklar", "https://www.kgk.gov.tr/"]
  ],
  uyari: "vergi ve muhasebe danışmanlığı değildir; işletmenize uygun yöntem için mali müşavirinize danışın"
};
