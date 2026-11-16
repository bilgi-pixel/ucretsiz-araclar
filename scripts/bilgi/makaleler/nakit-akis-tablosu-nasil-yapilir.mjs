export default {
  slug: "nakit-akis-tablosu-nasil-yapilir",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Nakit Akış Tablosu Nasıl Yapılır? Kâr Eden Şirket Neden Nakitsiz Kalır",
  pageTitle: "Nakit Akış Tablosu Nasıl Yapılır? Küçük İşletme Örneği",
  description: "Nakit akış tablosu, kasaya giren ve çıkan parayı dönem dönem izler: açılış + girişler − çıkışlar = kapanış. Kâr ile nakit farkı, tahsil süresi ve aylık örnek tablo.",
  keywords: ["nakit akış tablosu", "nakit akışı nasıl hesaplanır", "nakit akış planı", "kâr ve nakit farkı", "alacak tahsil süresi", "nakit dönüşüm süresi", "küçük işletme nakit yönetimi", "nakit açığı"],
  lead: "Nakit akış tablosu, bir işletmenin belirli bir dönemde kasasına ve banka hesaplarına giren ve çıkan parayı gösteren tablodur; dönem başındaki nakde girişler eklenip çıkışlar düşülerek dönem sonu nakdi bulunur. Kâr, satışın yapıldığı anda oluşur; nakit ise ancak tahsil edildiğinde kasaya girer. Bu yüzden kâr eden bir işletme, vadeli satış ve peşin alım dengesizliği yüzünden maaş ya da kira ödeyemez hale gelebilir. Bu sayfada küçük bir işletme için aylık nakit akış tablosunu adım adım hazırlıyoruz.",
  kisaCevap: [
    "Temel formül: dönem başı nakit + nakit girişleri − nakit çıkışları = dönem sonu nakit.",
    "Kâr tahakkuk esasına, nakit akışı tahsilat ve ödeme anına bakar; ikisi aynı ayda aynı sonucu vermez.",
    "Ortalama tahsil süresi = ortalama ticari alacak ÷ yıllık kredili satış × 365.",
    "Nakit dönüşüm süresi = stokta kalma süresi + alacak tahsil süresi − borç ödeme süresi.",
    "Küçük işletmeler için 3–6 aylık ileriye dönük aylık tablo, sıkışık dönemlerde ise haftalık izleme önerilir.",
    "Resmî mali tablolar ve vergi konuları için mali müşavirinizle çalışın; bu tablo bir yönetim aracıdır."
  ],
  figure: {
    alt: "Aylık nakit akışı şelale grafiği: 50.000 TL açılış nakdi, 200.000 TL girişler, 205.000 TL çıkışlar, 45.000 TL kapanış nakdi. Altta kâr ile nakit farkı: satış ocakta yapılır, tahsilat martta gelir.",
    caption: "Ay kârlı geçse bile girişler çıkışlardan az kalırsa kasa erir. Örnekte net nakit akışı −5.000 TL'dir ve kapanış 45.000 TL'ye düşer.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Bir ayın nakit akışı (örnek tutarlar)</text>
  <line x1="40" y1="290" x2="700" y2="290" class="st" fill="none"/>
  <rect x="60" y="240" width="110" height="50" class="p"/>
  <text x="115" y="230" class="sm mid b">50.000</text>
  <text x="115" y="312" class="sm mid">Açılış</text>
  <rect x="210" y="40" width="110" height="200" class="oks"/>
  <text x="265" y="62" class="sm mid b">+200.000</text>
  <text x="265" y="312" class="sm mid">Girişler</text>
  <rect x="360" y="40" width="110" height="205" class="dgs"/>
  <text x="415" y="262" class="sm mid b">−205.000</text>
  <text x="415" y="312" class="sm mid">Çıkışlar</text>
  <rect x="510" y="245" width="110" height="45" class="p"/>
  <text x="565" y="235" class="sm mid b">45.000</text>
  <text x="565" y="312" class="sm mid">Kapanış</text>
  <line x1="170" y1="240" x2="210" y2="240" class="sb dash" fill="none"/>
  <line x1="320" y1="40" x2="360" y2="40" class="sb dash" fill="none"/>
  <line x1="470" y1="245" x2="510" y2="245" class="sb dash" fill="none"/>
  <text x="640" y="200" class="sm">Net: −5.000</text>
  <rect x="20" y="330" width="680" height="76" rx="8" class="sf sb"/>
  <rect x="20" y="330" width="8" height="76" class="p"/>
  <text x="44" y="354" class="b">Kâr ≠ nakit</text>
  <text x="44" y="376" class="sm">Ocak: 100.000 TL vadeli satış, 70.000 TL peşin mal alımı → kâr 30.000 TL</text>
  <text x="44" y="396" class="sm">Ocak nakdi: −70.000 TL · Tahsilat 60 gün sonra, mart başında gelir</text>
</svg>`
  },
  sections: [
    {
      h: "Nakit akış tablosu nedir?",
      p: [
        "Nakit akış tablosu, işletmenin parasının nereden gelip nereye gittiğini zaman sırasıyla gösterir. Kasa, banka hesapları ve hemen kullanılabilecek mevduat \"nakit\" kabul edilir. Tablonun her satırı bir giriş ya da çıkış kalemidir: müşteriden yapılan tahsilat, tedarikçiye yapılan ödeme, kira, maaş, vergi, kredi taksiti gibi.",
        "Muhasebe standartlarına göre hazırlanan resmî nakit akış tablosu, büyük şirketlerin finansal raporlarında yer alır ve faaliyet, yatırım ve finansman bölümlerine ayrılır. Bu sayfada anlattığımız ise küçük ve orta ölçekli işletmelerin günlük yönetimde kullandığı, daha basit ve ileriye dönük <strong>nakit akış planıdır</strong>. Amacı geçmişi raporlamak değil, önümüzdeki haftalarda ve aylarda kasada para kalıp kalmayacağını önceden görmektir.",
        "Resmî tabloların hazırlanması, vergi beyanları ve muhasebe kayıtları mali müşavirin sorumluluğundadır. Yönetim amaçlı nakit planı ise işletme sahibinin elindeki en pratik erken uyarı aracıdır ve ikisi birbirini tamamlar."
      ]
    },
    {
      h: "Kâr eden işletme neden nakit sıkıntısı yaşar?",
      p: [
        "Kâr, gelir ve giderlerin <strong>ait oldukları döneme</strong> göre hesaplanmasıyla bulunur. Bir ürünü ocakta 60 gün vadeyle sattığınızda satış geliri ocak ayına yazılır, ama para mart başında gelir. Ürünü üretmek ya da almak için yaptığınız harcama ise çoğu zaman satıştan önce, peşin ödenir. Sonuçta ocak ayı kâğıt üzerinde kârlı görünür, ama kasa boşalır."
      ],
      table: {
        head: ["Kalem", "Kâr hesabı (ocak)", "Nakit (ocak)", "Nakit (mart)"],
        rows: [
          ["Vadeli satış", "+100.000 TL", "0 TL", "+100.000 TL"],
          ["Peşin mal alımı", "−70.000 TL", "−70.000 TL", "0 TL"],
          ["Sonuç", "+30.000 TL kâr", "−70.000 TL", "+100.000 TL"]
        ],
        caption: "Örnek tutarlar. Kâr ocakta oluşur; nakit ocakta azalır, martta tahsilatla geri gelir."
      },
      ul: [
        "<strong>Büyüme:</strong> satışlar hızla artarken her yeni sipariş önce stok ve hammadde harcaması ister; büyüyen işletme nakdi en hızlı tüketen işletmedir.",
        "<strong>Uzun vadeli satış, kısa vadeli alım:</strong> müşteriye 90 gün vade verip tedarikçiye 30 günde ödemek, aradaki 60 günü kendi paranızla finanse etmek demektir.",
        "<strong>Stok birikmesi:</strong> rafta bekleyen her ürün, satılana kadar bağlanmış nakittir.",
        "<strong>Toplu ödemeler:</strong> yıllık sigorta, vergi taksitleri, ikramiye ve kira artışları belirli aylarda nakdi bir anda azaltır.",
        "<strong>Kredi anaparası:</strong> kredi taksitlerinin anapara kısmı kârı etkilemez ama nakdi azaltır."
      ]
    },
    {
      h: "Küçük işletme için aylık nakit akışı nasıl hazırlanır?",
      ol: [
        "<strong>Açılış nakdini yazın:</strong> ayın ilk günü kasada ve bankada bulunan toplam tutar. Örnek: 50.000 TL.",
        "<strong>Nakit girişlerini listeleyin:</strong> o ay gerçekten tahsil edilmesi beklenen tutarları yazın. Satış tutarını değil, tahsilatı esas alın. Örnek: peşin satış 120.000 TL, önceki aylardan alacak tahsilatı 80.000 TL; toplam 200.000 TL.",
        "<strong>Nakit çıkışlarını listeleyin:</strong> o ay ödenecek her kalemi ödeme tarihine göre yazın. Örnek: tedarikçi ödemeleri 110.000 TL, kira 25.000 TL, maaş ve prim 45.000 TL, vergi 15.000 TL, kredi taksiti 10.000 TL; toplam 205.000 TL.",
        "<strong>Net nakit akışını bulun:</strong> girişler − çıkışlar = 200.000 − 205.000 = −5.000 TL.",
        "<strong>Kapanış nakdini hesaplayın:</strong> açılış + net akış = 50.000 − 5.000 = 45.000 TL. Bu tutar bir sonraki ayın açılış nakdidir.",
        "<strong>Gerçekleşeni karşılaştırın:</strong> ay bittiğinde planladığınız ile gerçekleşen tutarları yan yana yazın, büyük farkların nedenini not edin."
      ],
      formula: "Dönem sonu nakit = dönem başı nakit + nakit girişleri − nakit çıkışları\nÖrnek: 50.000 + 200.000 − 205.000 = 45.000 TL",
      after: [
        "Tablo için karmaşık bir yazılıma gerek yoktur; bir hesap tablosu ya da kâğıt bile yeterlidir. Planlanan, gerçekleşen ve fark sütunlarıyla hazır bir sayfa isterseniz [[arac:butce-planlayici|Bütçe Planlayıcı]] yazdırılabilir aylık tablolar üretir. Satış ve alacak kayıtlarını düzenli tutmak, tabloyu doldurmanın ön şartıdır; bu konuyu [[bilgi:on-muhasebe-nedir-cari-hesap-takibi|ön muhasebe ve cari hesap takibi]] yazısında anlatıyoruz."
      ]
    },
    {
      h: "Nakit açığı önceden nasıl görülür? Üç aylık plan örneği",
      p: [
        "Nakit akış tablosunun asıl gücü ileriye dönük kullanıldığında ortaya çıkar. Önümüzdeki 3–6 ayı aynı mantıkla doldurduğunuzda, kapanış nakdinin sıfırın altına düştüğü ya da güvenli bir eşiğin altına indiği ayı önceden görürsünüz. Bu da size kredi görüşmesi yapmak, tahsilatı hızlandırmak ya da bir harcamayı ertelemek için zaman kazandırır."
      ],
      table: {
        head: ["Kalem", "Aralık", "Ocak", "Şubat"],
        rows: [
          ["Açılış nakdi", "45.000", "35.000", "−15.000"],
          ["Tahsilatlar", "190.000", "150.000", "230.000"],
          ["Ödemeler", "200.000", "200.000", "195.000"],
          ["Net akış", "−10.000", "−50.000", "+35.000"],
          ["Kapanış nakdi", "35.000", "−15.000", "20.000"]
        ],
        caption: "Örnek tutarlar (TL). Ocakta tahsilatların düşmesi ve yıl başı ödemeleri nedeniyle 15.000 TL'lik açık görünüyor; şubatta tahsilatlarla kapanıyor."
      },
      after: [
        "Bu tabloyu kasım ayında hazırlayan işletme sahibi, ocak ayında yaklaşık 15.000 TL'lik bir açık oluşacağını iki ay önceden görür. Açığı kapatmak için birkaç büyük müşteriyle aralıkta erken ödeme görüşmesi yapabilir, bir tedarikçi ödemesini şubata kaydırmak için anlaşabilir ya da kısa vadeli bir finansman seçeneğini zamanında araştırabilir. Kasada her zaman en az bir aylık sabit gideri karşılayacak bir güvenlik payı tutmak, beklenmeyen gecikmelere karşı tampon oluşturur."
      ]
    },
    {
      h: "Alacak tahsil süresi nakdi nasıl etkiler?",
      p: [
        "Ortalama tahsil süresi, bir satışın ortalama kaç günde nakde döndüğünü gösterir. Bu süre uzadıkça işletmenin kendi kaynağıyla finanse etmesi gereken tutar büyür. Hesaplamak için ortalama ticari alacak bakiyesini yıllık kredili satışlara bölüp 365 ile çarpın."
      ],
      formula: "Alacak devir hızı = yıllık kredili satış ÷ ortalama ticari alacak\nOrtalama tahsil süresi (gün) = 365 ÷ alacak devir hızı\nÖrnek: 1.200.000 ÷ 200.000 = 6 → 365 ÷ 6 ≈ 61 gün",
      after: [
        "Bu örnekte işletme satışlarını ortalama 61 günde tahsil ediyor. Müşterilere 30 gün vade verildiği düşünülürse tahsilatın beklenenden yaklaşık bir ay geç geldiği anlaşılır. Tahsil süresini 15 gün kısaltmak, yıllık 1.200.000 TL satışta kabaca 1.200.000 × 15 ÷ 365 ≈ 49.000 TL'lik nakdi serbest bırakır. Kendi değerlerinizle hesap için [[arac:alacak-devir-hizi-hesapla|Alacak Devir Hızı Hesaplama]] aracını kullanabilirsiniz. Erken ödeyen müşteriye indirim tanımak bir seçenektir; mantığını [[bilgi:erken-odeme-iskontosu-2-10-net-30|erken ödeme iskontosu]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Nakit dönüşüm süresi nedir?",
      p: [
        "Nakit dönüşüm süresi, tedarikçiye ödeme yaptığınız günden müşteriden tahsilat yaptığınız güne kadar geçen ve işletmenin kendi parasıyla finanse ettiği süredir. Üç bileşeni vardır: ürünün stokta ortalama kaç gün beklediği, satıştan sonra tahsilatın kaç gün sürdüğü ve tedarikçiye kaç gün sonra ödeme yaptığınız."
      ],
      formula: "Nakit dönüşüm süresi = stokta kalma süresi + alacak tahsil süresi − borç ödeme süresi\nÖrnek: 45 gün + 60 gün − 30 gün = 75 gün",
      ul: [
        "<strong>Stok süresini kısaltmak:</strong> yavaş satan ürünleri azaltmak, sipariş miktarını talebe göre ayarlamak.",
        "<strong>Tahsil süresini kısaltmak:</strong> vadeyi sözleşmede netleştirmek, faturayı zamanında kesmek, vadesi gelen alacakları düzenli takip etmek.",
        "<strong>Borç ödeme süresini uzatmak:</strong> tedarikçiyle vade görüşmek; ancak gecikmeli ödeme ilişkiyi ve güvenilirliği zedeler, bu yüzden sözleşmeye bağlı kalın."
      ],
      after: [
        "Örnekteki 75 günlük süre, işletmenin yaklaşık iki buçuk aylık satış maliyetini sürekli finanse etmesi gerektiği anlamına gelir. Değerleri doğrudan bilanço kalemlerinden hesaplamak için [[arac:nakit-donusum-suresi-hesapla|Nakit Dönüşüm Süresi Hesaplama]] aracı stok, alacak ve borç tutarlarını kullanır. Kısa vadeli ödeme gücünü bir de oranlarla görmek isterseniz [[bilgi:cari-oran-ve-likidite-oranlari|cari oran ve likidite oranları]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Vadeli satış ve peşin alım dengesi nasıl kurulur?",
      p: [
        "Vade dengesi, nakit yönetiminin merkezindedir. Basit bir kural, ortalama tahsil sürenizin ortalama ödeme sürenizi aşmamasıdır. Bu her sektörde mümkün olmayabilir; perakendede peşin satış yaygınken, toptan ve kurumsal satışlarda uzun vadeler olağandır. Önemli olan aradaki farkın ne kadar nakit gerektirdiğini bilmek ve bunu planlamaktır."
      ],
      ul: [
        "Büyük ve uzun vadeli siparişlerde kısmi peşinat ya da ara ödeme talep edin.",
        "Vadeleri çek veya senetle alıyorsanız vade tarihlerini nakit tablosuna ayrı satır olarak işleyin; ortalama vadeyi [[bilgi:ortalama-vade-nasil-hesaplanir|ortalama vade hesabı]] ile bulabilirsiniz.",
        "Tedarikçilerle ödeme tarihlerini müşteri tahsilat tarihlerinize yakın günlere denk getirmeye çalışın.",
        "Stok alımlarını satış tahminine göre parçalara bölün; tek seferde büyük alım nakdi uzun süre bağlar.",
        "Kârlılığı ürün bazında izleyin; düşük kâr marjlı ve uzun vadeli satışlar nakdi en çok zorlayan satışlardır."
      ]
    },
    {
      h: "Nakit akışı haftalık mı aylık mı izlenmeli?",
      p: [
        "Çoğu küçük işletme için ileriye dönük 3–6 aylık plan ay ay hazırlanır ve ayda bir güncellenir. Ancak kapanış nakdinin güvenlik payına yaklaştığı dönemlerde, yoğun sezon öncesinde ya da büyük bir tahsilata bağlı kaldığınız zamanlarda haftalık izlemeye geçmek gerekir. Aylık tablo, ay içindeki kısa süreli sıkışmaları gizleyebilir: ayın 5'inde maaş ödenip tahsilatlar ayın 25'inde geliyorsa ay sonu kapanışı olumlu olsa bile ayın ilk haftasında kasa eksiye düşebilir."
      ],
      table: {
        head: ["Durum", "Önerilen sıklık"],
        rows: [
          ["Kasa rahat, sezon dengeli", "Aylık plan, ayda bir güncelleme"],
          ["Kapanış nakdi güvenlik payına yakın", "Haftalık izleme"],
          ["Büyük sipariş, yeni yatırım, hızlı büyüme", "Haftalık plan, 13 haftalık ileri görünüm"],
          ["Ödeme günleri ile tahsilat günleri çok farklı", "Haftalık ya da ödeme günlerine göre"]
        ]
      },
      after: [
        "Hangi sıklığı seçerseniz seçin, tabloyu düzenli güncellemek tek seferlik mükemmel bir tablodan daha değerlidir. Planlanan ve gerçekleşen tutarları karşılaştırmak, tahminlerinizin zamanla daha isabetli hale gelmesini sağlar. Nakit planınızı, vergi ödeme tarihleri ve mali yükümlülükler açısından mali müşavirinizle birlikte gözden geçirmeniz, sürpriz ödemelerin önüne geçer. Satış hedefinizin giderleri karşılayıp karşılamadığını görmek için [[bilgi:basabas-noktasi-nedir|başabaş noktası]] yazısı da yardımcı olur."
      ]
    }
  ],
  faq: [
    ["Nakit akış tablosu nedir?", "Nakit akış tablosu, işletmenin belirli bir dönemde kasasına ve banka hesaplarına giren ve çıkan parayı gösterir. Dönem başı nakde girişler eklenip çıkışlar düşülerek dönem sonu nakit bulunur; küçük işletmeler bunu ileriye dönük planlama için kullanır."],
    ["Küçük işletme için aylık nakit akışı nasıl hazırlanır?", "Ayın açılış nakdini yazın, o ay gerçekten tahsil edilecek tutarları ve ödenecek bütün giderleri tarihleriyle listeleyin. Girişlerden çıkışları çıkarıp açılışa ekleyerek kapanış nakdini bulun ve ay sonunda gerçekleşenle karşılaştırın."],
    ["Kâr eden işletme neden nakit sıkıntısı yaşar?", "Kâr satışın yapıldığı anda hesaplanır, nakit ise tahsilatla gelir. Vadeli satış, peşin alım, stok birikmesi ve kredi anapara ödemeleri kârlı bir ayda bile kasanın boşalmasına yol açabilir."],
    ["Alacak tahsil süresi nakdi nasıl etkiler?", "Tahsil süresi uzadıkça satışın nakde dönmesi gecikir ve işletme aradaki dönemi kendi parasıyla finanse eder. Yıllık 1.200.000 TL satışta tahsil süresini 15 gün kısaltmak yaklaşık 49.000 TL nakit serbest bırakır."],
    ["Nakit dönüşüm süresi nedir?", "Tedarikçiye ödeme ile müşteriden tahsilat arasında geçen ve işletmenin finanse ettiği süredir. Stokta kalma süresi ile alacak tahsil süresinin toplamından borç ödeme süresi çıkarılarak bulunur; örneğin 45 + 60 − 30 = 75 gün."],
    ["Nakit açığı önceden nasıl görülür?", "Önümüzdeki 3–6 ayın beklenen tahsilat ve ödemelerini tabloya işleyip her ayın kapanış nakdini hesaplayın. Kapanışın sıfırın ya da güvenlik payının altına düştüğü ay, önlem almanız gereken aydır."],
    ["Vadeli satış ve peşin alım dengesi nasıl kurulur?", "Ortalama tahsil sürenizi ortalama ödeme sürenize yaklaştırmaya çalışın. Büyük siparişlerde peşinat istemek, ödeme tarihlerini tahsilat günlerine denk getirmek ve stok alımlarını parçalara bölmek dengeyi kurmaya yardımcı olur."],
    ["Nakit akışı haftalık mı aylık mı izlenmeli?", "Kasa rahatsa aylık plan yeterlidir. Kapanış nakdi güvenlik payına yaklaştığında, büyük sipariş ve hızlı büyüme dönemlerinde haftalık izlemeye geçin; aylık tablo ay içindeki kısa sıkışmaları gizleyebilir."],
    ["Nakit akış tablosunu mali müşavir mi hazırlamalı?", "Resmî mali tablolar ve vergi işlemleri mali müşavirin sorumluluğundadır. Yönetim amaçlı nakit planını işletme sahibi kendisi tutabilir; ancak vergi ödemeleri ve yükümlülük tarihleri için planı mali müşavirle birlikte gözden geçirmek önerilir."]
  ],
  tools: ["butce-planlayici", "nakit-donusum-suresi-hesapla", "alacak-devir-hizi-hesapla"],
  related: ["cari-oran-ve-likidite-oranlari", "on-muhasebe-nedir-cari-hesap-takibi", "erken-odeme-iskontosu-2-10-net-30", "basabas-noktasi-nedir"],
  uyari: "finansal danışmanlık değildir, işletmenizin mali tabloları ve vergi yükümlülükleri için mali müşavirinize danışın"
};
