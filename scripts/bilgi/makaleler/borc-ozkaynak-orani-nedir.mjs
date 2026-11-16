export default {
  slug: "borc-ozkaynak-orani-nedir",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Borç/Özkaynak Oranı Nedir? Kaldıraç Oranı Nasıl Hesaplanır ve Yorumlanır",
  pageTitle: "Borç/Özkaynak Oranı Nedir? Kaldıraç Oranı Hesaplama",
  description: "Borç/özkaynak oranı toplam yabancı kaynağın özkaynağa bölümüdür. Formül, bilanço örneği, kaldıraç oranı farkı, sektöre göre yorum ve ROE ile ilişkisi.",
  keywords: ["borç özkaynak oranı", "kaldıraç oranı nedir", "borç özkaynak oranı formülü", "finansal kaldıraç", "borç oranı kaç olmalı", "bilanço oranları", "özkaynak nedir", "özkaynak çarpanı"],
  lead: "Borç/özkaynak oranı, bir işletmenin toplam borçlarının (kısa ve uzun vadeli yabancı kaynaklar) özkaynaklarına bölünmesiyle bulunur ve şirketin her 1 TL'lik ortak sermayesine karşılık ne kadar borç kullandığını gösterir. Oran 1'in altındaysa işletme varlıklarını ağırlıklı olarak kendi kaynağıyla, 1'in üzerindeyse ağırlıklı olarak borçla finanse ediyor demektir. Tek başına iyi ya da kötü bir değer yoktur; sektör, nakit akışı ve faiz ortamıyla birlikte yorumlanır. Bu sayfada formülü, bilanço üzerinden çözümlü örneği ve ilgili kaldıraç oranlarını bulacaksınız.",
  kisaCevap: [
    "Borç/özkaynak oranı = (kısa vadeli + uzun vadeli yabancı kaynaklar) ÷ özkaynaklar.",
    "Kaldıraç oranı = toplam borç ÷ toplam varlık; borç/özkaynak ile aynı bilgiyi farklı paydayla verir.",
    "Oran 1,25 ise işletme her 1 TL özkaynağa karşılık 1,25 TL borç kullanıyordur.",
    "Özkaynak çarpanı = toplam varlık ÷ özkaynak = 1 + borç/özkaynak oranı.",
    "Uygun düzey sektöre göre değişir; sermaye yoğun sektörlerde oran doğal olarak daha yüksektir.",
    "Özkaynak negatifse oran anlamını yitirir; bu durum borçların varlıkları aştığını gösterir."
  ],
  figure: {
    alt: "Örnek bilanço: 9 milyon TL varlığın 3 milyonu kısa vadeli borç, 2 milyonu uzun vadeli borç, 4 milyonu özkaynakla finanse ediliyor; borç/özkaynak 1,25, kaldıraç oranı yüzde 55,6, özkaynak çarpanı 2,25.",
    caption: "Varlıkların finansmanı: 5 milyon TL borç ve 4 milyon TL özkaynak. Aynı bilançodan üç oran çıkar ve hepsi birbirine çevrilebilir: borç/özkaynak 1,25, kaldıraç %55,6, özkaynak çarpanı 2,25.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Örnek bilanço ve kaldıraç oranları</text>
  <text x="130" y="60" class="b mid">Varlıklar (aktif)</text>
  <rect x="40" y="72" width="180" height="270" rx="6" class="ps"/>
  <text x="130" y="200" class="lg b mid">9.000.000</text><text x="130" y="224" class="sm mid">TL</text>
  <text x="400" y="60" class="b mid">Kaynaklar (pasif)</text>
  <rect x="310" y="72" width="180" height="90" rx="6" class="dgs"/>
  <text x="400" y="110" class="b mid">Kısa vadeli borç</text><text x="400" y="134" class="mid">3.000.000</text>
  <rect x="310" y="162" width="180" height="60" rx="6" class="dgs"/>
  <text x="400" y="188" class="b mid">Uzun vadeli borç</text><text x="400" y="210" class="mid">2.000.000</text>
  <rect x="310" y="222" width="180" height="120" rx="6" class="oks"/>
  <text x="400" y="276" class="b mid">Özkaynak</text><text x="400" y="300" class="mid">4.000.000</text>
  <line x1="230" y1="207" x2="300" y2="207" class="st" fill="none"/><text x="265" y="200" class="b mid">=</text>
  <rect x="514" y="72" width="186" height="80" rx="8" class="p"/>
  <text x="607" y="100" class="sm mid sf">Borç / Özkaynak</text>
  <text x="607" y="134" class="xl mid sf">1,25</text>
  <rect x="514" y="166" width="186" height="80" rx="8" class="sf sb"/>
  <text x="607" y="194" class="sm mid">Kaldıraç (borç / aktif)</text>
  <text x="607" y="228" class="xl mid">%55,6</text>
  <rect x="514" y="260" width="186" height="82" rx="8" class="sf sb"/>
  <text x="607" y="288" class="sm mid">Özkaynak çarpanı</text>
  <text x="607" y="322" class="xl mid">2,25</text>
  <rect x="20" y="360" width="680" height="46" rx="8" class="ps"/>
  <text x="360" y="389" class="mid">5.000.000 ÷ 4.000.000 = 1,25 · 5 ÷ 9 = %55,6 · 9 ÷ 4 = 2,25</text>
</svg>`
  },
  sections: [
    {
      h: "Borç/özkaynak oranı nedir, ne işe yarar?",
      p: [
        "Bir işletme varlıklarını iki kaynaktan finanse eder: ortakların koyduğu sermaye ve biriken kârlardan oluşan <strong>özkaynak</strong> ile bankalar, tedarikçiler ve diğer alacaklılardan gelen <strong>yabancı kaynak</strong> (borç). Borç/özkaynak oranı bu iki kaynağın birbirine oranıdır ve finansal yapının ne kadar borca dayandığını tek bir sayıyla özetler.",
        "Oran; kredi veren bankalar, yatırımcılar, tedarikçiler ve şirket yöneticileri için bir risk göstergesidir. Borç oranı yükseldikçe işletmenin her ay ödemesi gereken faiz ve anapara artar; satışlar düştüğünde bu yükü taşımak zorlaşır. Öte yandan makul düzeyde borç, ortakların sermayesiyle tek başına yapamayacakları yatırımları yapmalarını ve özkaynak kârlılığını artırmalarını sağlar. Oranın ardındaki asıl soru budur: borç büyümeyi mi destekliyor, yoksa işletmeyi kırılgan mı yapıyor?"
      ]
    },
    {
      h: "Borç/özkaynak oranı nasıl hesaplanır?",
      p: [
        "Hesap için bilançonun pasif (kaynaklar) tarafındaki üç toplam yeterlidir. Türkiye'de Tekdüzen Hesap Planı'na göre hazırlanan bilançolarda bunlar <strong>kısa vadeli yabancı kaynaklar</strong> (3 ile başlayan hesaplar), <strong>uzun vadeli yabancı kaynaklar</strong> (4 ile başlayan hesaplar) ve <strong>özkaynaklar</strong> (5 ile başlayan hesaplar) başlıkları altında yer alır."
      ],
      formula: "Toplam borç = kısa vadeli yabancı kaynaklar + uzun vadeli yabancı kaynaklar\nBorç/özkaynak oranı = toplam borç ÷ özkaynaklar\nKaldıraç oranı = toplam borç ÷ toplam varlıklar\nÖzkaynak oranı = özkaynaklar ÷ toplam varlıklar\nÖzkaynak çarpanı = toplam varlıklar ÷ özkaynaklar = 1 + borç/özkaynak",
      after: [
        "Bazı analistler yalnızca faizli finansal borçları (banka kredileri, tahviller, finansal kiralama) payda kullanır ve buna \"net finansal borç/özkaynak\" der. Tedarikçi borçları, alınan avanslar gibi faizsiz yükümlülükler bu yaklaşımda dışarıda kalır. Hangi tanımın kullanıldığını bilmeden iki raporu karşılaştırmak yanıltıcı olur."
      ]
    },
    {
      h: "Çözümlü örnek: bilançodan oran hesaplama",
      p: [
        "Bir üretim işletmesinin dönem sonu bilançosunda aşağıdaki tutarlar yer alsın. Tutarlar örnektir."
      ],
      table: {
        head: ["Kalem", "Tutar"],
        rows: [
          ["Kısa vadeli yabancı kaynaklar", "3.000.000 TL"],
          ["Uzun vadeli yabancı kaynaklar", "2.000.000 TL"],
          ["Özkaynaklar", "4.000.000 TL"],
          ["Toplam kaynaklar = toplam varlıklar", "9.000.000 TL"]
        ]
      },
      ol: [
        "Toplam borcu bulun: 3.000.000 + 2.000.000 = 5.000.000 TL.",
        "Borç/özkaynak oranı: 5.000.000 ÷ 4.000.000 = <strong>1,25</strong>.",
        "Kaldıraç oranı: 5.000.000 ÷ 9.000.000 = <strong>%55,6</strong>; varlıkların yarısından fazlası borçla finanse edilmiştir.",
        "Özkaynak oranı: 4.000.000 ÷ 9.000.000 = %44,4.",
        "Özkaynak çarpanı: 9.000.000 ÷ 4.000.000 = 2,25; bu değer 1 + 1,25 ile de bulunur.",
        "Kısa vadeli borcun payı: 3.000.000 ÷ 5.000.000 = %60; borcun çoğu bir yıl içinde ödenecektir."
      ],
      after: [
        "Son adım önemlidir: aynı 1,25 oranı, borcun büyük kısmı uzun vadeliyse daha rahat, kısa vadeliyse daha baskılı bir durum anlatır. Kısa vadeli borçların dönen varlıklarla karşılanıp karşılanamayacağını [[bilgi:cari-oran-ve-likidite-oranlari|cari oran ve likidite oranları]] ile, oranları tek adımda [[arac:borc-ozkaynak-orani-hesapla|Borç/Özkaynak Oranı Hesaplama aracı]] ile görebilirsiniz."
      ]
    },
    {
      h: "Kaldıraç oranı kaç olmalı? Yorumlama",
      p: [
        "Evrensel bir \"doğru\" değer yoktur. Yine de genel bir başlangıç noktası olarak aşağıdaki aralıklar kullanılabilir; bunlar kural değil, karşılaştırma yaparken akılda tutulacak kaba eşiklerdir."
      ],
      table: {
        head: ["Borç/özkaynak", "Kaldıraç (borç/aktif)", "Genel yorum"],
        rows: [
          ["0,5'in altı", "%33'ün altı", "Düşük borç; temkinli, büyüme için borç kapasitesi var"],
          ["0,5 – 1", "%33 – %50", "Dengeli; varlıklar ağırlıkla özkaynakla finanse ediliyor"],
          ["1 – 2", "%50 – %67", "Orta-yüksek; nakit akışı ve vade yapısı önem kazanır"],
          ["2'nin üzeri", "%67'nin üzeri", "Yüksek kaldıraç; faiz ve satış dalgalanmalarına duyarlı"],
          ["Negatif özkaynak", "%100'ün üzeri", "Borçlar varlıkları aşmış; oran yorumlanamaz"]
        ],
        caption: "Eşikler genel bir kılavuzdur; sektör ortalaması ve işletmenin nakit üretme gücüyle birlikte değerlendirilmelidir."
      },
      after: [
        "Yüksek oran her zaman kötü değildir. Düzenli ve öngörülebilir nakit akışı olan bir işletme (ör. uzun süreli kira gelirleri olan bir gayrimenkul şirketi) yüksek borcu rahatlıkla taşıyabilir. Düşük oran da her zaman iyi değildir; çok düşük borç, işletmenin ucuz finansman fırsatlarını kullanmadığı ve özkaynak kârlılığını gereksiz yere düşük tuttuğu anlamına gelebilir."
      ]
    },
    {
      h: "Bu oran sektöre göre değişir mi?",
      p: [
        "Evet, hem de belirgin biçimde. Sermaye yoğun sektörler (enerji, ulaştırma, inşaat, gayrimenkul) büyük yatırımlarını uzun vadeli kredilerle finanse ettiği için doğal olarak daha yüksek oranlarla çalışır. Yazılım ve danışmanlık gibi varlığı az, nakit akışı hızlı sektörlerde ise oran genellikle düşüktür. Perakende ve toptan ticarette tedarikçi borçları kısa vadeli yabancı kaynakları şişirir.",
        "Bankalar ve finans kuruluşları ise ayrı bir kategoridir: iş modelleri mevduatı, yani borcu kullanmaya dayandığı için borç/özkaynak oranları diğer sektörlerle karşılaştırılamaz; bu kurumlar için sermaye yeterliliği gibi özel ölçüler kullanılır. Bir işletmeyi değerlendirirken en anlamlı karşılaştırma aynı sektördeki benzer büyüklükteki işletmelerle ve işletmenin kendi geçmiş yıllarıyla yapılan karşılaştırmadır."
      ]
    },
    {
      h: "Finansal kaldıraç ile borç/özkaynak aynı mı? ROE ile ilişkisi",
      p: [
        "\"Finansal kaldıraç\" geniş bir kavramdır: işletmenin borç kullanarak özkaynak getirisini büyütmesini anlatır. Borç/özkaynak, kaldıraç oranı (borç/aktif) ve özkaynak çarpanı bu kavramın farklı ölçüleridir. Üçü de aynı bilançodan hesaplanır ve birbirine dönüştürülebilir; dolayısıyla \"kaldıraç oranı\" denildiğinde hangi formülün kastedildiğini sormak gerekir.",
        "Özkaynak kârlılığı (ROE) ile bağlantı DuPont ayrıştırmasıyla görülür: ROE = aktif kârlılığı (ROA) × özkaynak çarpanı. Örnekteki işletmenin net kârı 600.000 TL olsun. ROA = 600.000 ÷ 9.000.000 = %6,67; özkaynak çarpanı 2,25 olduğu için ROE = %6,67 × 2,25 = %15'tir. Aynı işletme hiç borç kullanmasaydı (çarpan 1) ROE de %6,67'de kalırdı. Borç, varlıkların getirisi borcun maliyetinden yüksek olduğu sürece ROE'yi büyütür; tersi durumda küçültür."
      ],
      formula: "ROE = net kâr ÷ özkaynak = (net kâr ÷ aktif) × (aktif ÷ özkaynak)\nÖrnek: 600.000 ÷ 4.000.000 = %15 = %6,67 × 2,25",
      after: [
        "Bu ilişkiyi ayrıntılı incelemek için [[bilgi:roe-roa-nedir-nasil-hesaplanir|ROE ve ROA]] yazısına bakabilir, hesapları [[arac:ozkaynak-karliligi-hesapla|Özkaynak Kârlılığı]] ve [[arac:aktif-karlilik-hesapla|Aktif Kârlılık]] araçlarıyla yapabilirsiniz."
      ]
    },
    {
      h: "Bankalar kredi verirken bu orana bakar mı? Türkiye'ye özgü notlar",
      p: [
        "Bankalar ticari kredi değerlendirmesinde bilanço oranlarına bakar ve borç/özkaynak bunların başında gelir. Ancak tek başına değil; faiz ve amortisman öncesi kâr (FAVÖK) ile borç arasındaki ilişki, cari oran, nakit akışı, teminatlar ve sektör riski birlikte değerlendirilir. Net finansal borcun FAVÖK'e oranı, borcun kaç yıllık faaliyet kârıyla kapatılabileceğini gösterdiği için sık kullanılır; bu konuda [[bilgi:favok-nedir-nasil-hesaplanir|FAVÖK]] yazısı yol gösterir.",
        "Türkiye'de enflasyonun yüksek olduğu dönemlerde bilanço tutarlarının enflasyon düzeltmesi yapılıp yapılmadığına dikkat etmek gerekir; düzeltme, özellikle sabit varlıkları ve özkaynakları yeniden değerlediği için oranı belirgin biçimde değiştirebilir. Ayrıca Türk Ticaret Kanunu, özkaynakların sermayeye göre ciddi biçimde azaldığı sermaye kaybı ve borca batıklık durumları için yönetim kuruluna özel yükümlülükler getirir. Negatif özkaynak gördüğünüzde oranı yorumlamak yerine bir mali müşavirle durumu değerlendirmek gerekir."
      ]
    },
    {
      h: "Borç/özkaynak oranı nasıl düşürülür?",
      p: [
        "Oranı düşürmenin iki yolu vardır: payı (borcu) azaltmak ya da paydayı (özkaynağı) büyütmek. Hangisinin uygun olduğu işletmenin nakit durumuna ve ortakların sermaye koyma imkânına bağlıdır. Hedef oranı belirlerken sektör ortalamasını ve önümüzdeki yılların yatırım planını da hesaba katmak gerekir; aşırı hızlı borç azaltma büyümeyi yavaşlatabilir ve fırsatların kaçmasına yol açabilir. Aşağıdaki yöntemler genellikle birlikte kullanılır."
      ],
      ul: [
        "<strong>Kârı dağıtmak yerine işletmede bırakmak:</strong> Dağıtılmayan kâr özkaynağa eklenir; örnekte 600.000 TL'lik kâr işletmede kalırsa özkaynak 4.600.000 TL'ye çıkar ve oran 5.000.000 ÷ 4.600.000 = 1,09'a iner.",
        "<strong>Sermaye artırımı:</strong> Ortakların nakit sermaye koyması özkaynağı doğrudan büyütür.",
        "<strong>Pahalı kısa vadeli borcu kapatmak:</strong> Atıl nakit ya da kullanılmayan varlıkların satışından elde edilen tutarla borç ödemek hem oranı hem faiz yükünü azaltır.",
        "<strong>Stok ve alacak yönetimi:</strong> Stokta ve alacakta bekleyen parayı serbest bırakmak, borçlanma ihtiyacını azaltır.",
        "<strong>Vade yapısını iyileştirmek:</strong> Oran değişmese bile kısa vadeli borcu uzun vadeye çevirmek ödeme baskısını hafifletir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Yalnızca kredileri borç saymak ama bunu belirtmemek:</strong> Toplam yabancı kaynak ile finansal borç farklı sonuç verir.",
        "<strong>Farklı sektörleri kıyaslamak:</strong> Bir enerji şirketinin 2,0'lık oranı ile bir yazılım şirketinin 0,3'lük oranı aynı ölçekte değerlendirilemez.",
        "<strong>Vade yapısını görmezden gelmek:</strong> Aynı oranda kısa vadeli borç payı yüksek olan işletme daha fazla yeniden finansman riski taşır.",
        "<strong>Tek döneme bakmak:</strong> Oranın yıllar içindeki eğilimi tek bir yılın değerinden daha çok şey söyler.",
        "<strong>Negatif özkaynakla oran hesaplamak:</strong> Ortaya çıkan negatif sayı \"düşük borç\" anlamına gelmez, tam tersine borca batıklığı gösterir."
      ]
    }
  ],
  faq: [
    ["Borç/özkaynak oranı nedir?", "Borç/özkaynak oranı, işletmenin kısa ve uzun vadeli toplam yabancı kaynaklarının özkaynaklarına bölünmesidir. Ortakların her 1 TL'lik sermayesine karşılık ne kadar borç kullanıldığını göstererek finansal yapının borca ne kadar dayandığını özetler."],
    ["Borç/özkaynak oranı nasıl hesaplanır?", "Bilançodaki kısa vadeli ve uzun vadeli yabancı kaynaklar toplanır, bu toplam özkaynaklara bölünür. Örneğin 5.000.000 TL borcu ve 4.000.000 TL özkaynağı olan işletmenin oranı 5.000.000 ÷ 4.000.000 = 1,25 olur."],
    ["Kaldıraç oranı kaç olmalı?", "Evrensel bir değer yoktur. Genel bir kılavuz olarak 1'in altı dengeli, 1 ile 2 arası orta-yüksek, 2'nin üzeri yüksek kaldıraç kabul edilir. Sermaye yoğun sektörlerde yüksek oranlar normaldir; değerlendirme sektör ortalamasına göre yapılmalıdır."],
    ["Yüksek borç/özkaynak oranı neyi gösterir?", "Yüksek oran, varlıkların büyük kısmının borçla finanse edildiğini ve faiz ile anapara yükünün ağır olduğunu gösterir. Satışlar düştüğünde ya da faizler yükseldiğinde işletme daha kırılgandır; buna karşılık düzenli nakit akışı olan işletmeler yüksek borcu taşıyabilir."],
    ["Finansal kaldıraç ile borç/özkaynak aynı mı?", "Finansal kaldıraç, borç kullanarak özkaynak getirisini büyütmeyi anlatan geniş bir kavramdır. Borç/özkaynak, borç/aktif ve özkaynak çarpanı bu kavramın farklı ölçüleridir; hepsi aynı bilançodan hesaplanır ve birbirine çevrilebilir."],
    ["Bu oran sektöre göre değişir mi?", "Evet. Enerji, inşaat, ulaştırma ve gayrimenkul gibi sermaye yoğun sektörlerde oranlar yüksek, yazılım ve hizmet sektörlerinde düşüktür. Bankaların oranı ise iş modelleri gereği diğer sektörlerle karşılaştırılamaz."],
    ["Bankalar kredi verirken bu orana bakar mı?", "Evet, borç/özkaynak oranı ticari kredi değerlendirmesinde temel göstergelerdendir. Ancak bankalar bunu tek başına kullanmaz; net borç/FAVÖK, cari oran, nakit akışı, teminat ve sektör riskini birlikte inceler."],
    ["Özkaynak kârlılığı ile ilişkisi nedir?", "DuPont ayrıştırmasına göre özkaynak kârlılığı, aktif kârlılığı ile özkaynak çarpanının çarpımıdır ve özkaynak çarpanı 1 artı borç/özkaynak oranına eşittir. Varlık getirisi borç maliyetinden yüksekse borç ROE'yi artırır, düşükse azaltır."],
    ["Özkaynak negatifse oran nasıl yorumlanır?", "Negatif özkaynak, borçların varlıkları aştığını gösterir ve bu durumda borç/özkaynak oranı anlamlı biçimde yorumlanamaz. Ortaya çıkan negatif sayı düşük borç anlamına gelmez; durumun bir mali müşavirle değerlendirilmesi gerekir."]
  ],
  tools: ["borc-ozkaynak-orani-hesapla", "cari-oran-hesapla", "ozkaynak-karliligi-hesapla", "aktif-karlilik-hesapla"],
  related: ["cari-oran-ve-likidite-oranlari", "roe-roa-nedir-nasil-hesaplanir", "favok-nedir-nasil-hesaplanir", "fk-orani-nedir"],
  uyari: "yatırım ya da kredi tavsiyesi değildir, işletmenizin durumu için bir mali müşavire danışın"
};
