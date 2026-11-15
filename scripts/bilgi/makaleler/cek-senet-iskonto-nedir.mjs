export default {
  slug: "cek-senet-iskonto-nedir",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "Çek ve Senet İskontosu Nedir? Kırdırma Bedeli ve Ortalama Vade Hesabı",
  pageTitle: "Çek Senet İskontosu Nedir? Kırdırma Hesabı ve Ortalama Vade",
  description: "Çek ve senet iskontosu, vadesi gelmemiş alacağın faiz kesilerek bugün paraya çevrilmesidir. İç ve dış iskonto formülü, efektif maliyet ve ortalama vade örnekleri.",
  keywords: ["çek iskonto hesaplama", "senet kırdırma", "iskonto nedir", "iç iskonto dış iskonto farkı", "ortalama vade hesaplama", "çek kırdırma faizi", "vade tarihi hesaplama", "faktoring ile banka iskontosu farkı"],
  lead: "Çek ve senet iskontosu (kırdırma), <strong>vadesi henüz gelmemiş bir alacağı, vadeye kalan gün için faiz ve masraf kesilmesi karşılığında bugün nakde çevirmektir</strong>. Ticari uygulamada en yaygın yöntem dış iskontodur: iskonto = tutar × yıllık oran × gün ÷ 360. 100.000 TL'lik, vadesine 90 gün kalan bir senet yıllık %48 örnek oranla kırdırılırsa 12.000 TL kesilir ve elinize 88.000 TL geçer. Bu yazıda iç ve dış iskonto farkını, gerçek maliyeti gösteren efektif oranı, birden çok çekin ortalama vadesini, banka ile faktoring farkını ve sık yapılan hataları çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Dış (ticari) iskonto: iskonto = senet tutarı × yıllık oran × gün ÷ 360; kesinti vade tutarı üzerinden yapılır.",
    "İç (gerçek) iskonto: peşin değer = tutar ÷ (1 + oran × gün ÷ 360); faiz ele geçen tutar üzerinden hesaplanır ve kesinti daha küçüktür.",
    "Aynı oranla dış iskonto her zaman iç iskontodan pahalıdır; gerçek maliyeti görmek için kesintiyi ele geçen paraya bölüp yıllığa çevirin.",
    "Ortalama vade = Σ(tutar × gün) ÷ Σ tutar; büyük tutarlı çekler ortalamayı kendine çeker.",
    "Faktoring şirketleri faturaya dayanan ticari alacakları satın alır; bankada iskonto ise genellikle bir kredi limiti içinde yapılır.",
    "Oran, komisyon ve vergiler kuruluşa göre değişir; teklifleri ele geçen net tutar ve efektif yıllık maliyetle karşılaştırın."
  ],
  figure: {
    alt: "Bugünden 90 gün sonra vadesi gelen 100.000 TL'lik senet için zaman çizelgesi; yıllık yüzde 48 örnek oranla dış iskontoda 88.000 TL, iç iskontoda 89.286 TL ele geçiyor.",
    caption: "Aynı senet, aynı oran ve aynı süre: dış iskonto faizi vadedeki 100.000 TL üzerinden, iç iskonto bugün ele geçen tutar üzerinden hesaplar. Aradaki 1.286 TL fark, oran ve vade büyüdükçe açılır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">100.000 TL senet, vadeye 90 gün, yıllık %48 (örnek)</text>
  <line x1="80" y1="110" x2="640" y2="110" class="st sw" fill="none"/>
  <circle cx="80" cy="110" r="9" class="p"/>
  <circle cx="640" cy="110" r="9" class="a"/>
  <text x="80" y="88" class="b mid">Bugün</text>
  <text x="640" y="88" class="b mid">Vade (90. gün)</text>
  <text x="360" y="100" class="sm mid t2">oran × gün ÷ 360 = 0,48 × 90 ÷ 360 = 0,12</text>
  <text x="640" y="140" class="b mid">100.000 TL</text>
  <rect x="40" y="170" width="310" height="200" rx="10" class="sf sb"/>
  <rect x="40" y="170" width="310" height="40" rx="10" class="ps"/>
  <text x="195" y="196" class="b mid">Dış (ticari) iskonto</text>
  <text x="60" y="236">İskonto = 100.000 × 0,12</text>
  <text x="60" y="262" class="b dg">Kesinti: 12.000 TL</text>
  <text x="60" y="294" class="lg b">Ele geçen: 88.000 TL</text>
  <text x="60" y="324" class="sm t2">Gerçek maliyet: 12.000 ÷ 88.000 × 4</text>
  <text x="60" y="346" class="sm b">= yıllık %54,55 (basit)</text>
  <rect x="370" y="170" width="310" height="200" rx="10" class="sf sb"/>
  <rect x="370" y="170" width="310" height="40" rx="10" class="oks"/>
  <text x="525" y="196" class="b mid">İç (gerçek) iskonto</text>
  <text x="390" y="236">Peşin değer = 100.000 ÷ 1,12</text>
  <text x="390" y="262" class="b dg">Kesinti: 10.714 TL</text>
  <text x="390" y="294" class="lg b">Ele geçen: 89.286 TL</text>
  <text x="390" y="324" class="sm t2">Gerçek maliyet: 10.714 ÷ 89.286 × 4</text>
  <text x="390" y="346" class="sm b">= yıllık %48,00 (basit)</text>
</svg>`
  },
  sections: [
    {
      h: "Çek ve senet iskontosu (kırdırma) nedir?",
      p: [
        "Türkiye'de ticari satışların önemli bir kısmı vadelidir: satıcı malı bugün teslim eder, karşılığında 60, 90 ya da 120 gün sonra ödenecek bir çek veya senet (bono) alır. Ancak satıcının da kira, maaş ve tedarikçi ödemesi gibi bugün karşılaması gereken giderleri vardır. <strong>İskonto</strong>, bu vadeli alacağı bir bankaya ya da faktoring şirketine devrederek vadeyi beklemeden nakde çevirmektir. Halk arasında \"çek kırdırmak\" ya da \"senet kırdırmak\" denir.",
        "İşlemi yapan kuruluş, parayı vadeden önce verdiği için aradaki süre kadar faiz keser; buna <strong>iskonto tutarı</strong> denir. Bunun üzerine işlem komisyonu, istihbarat ve tahsil masrafları ile vergiler eklenebilir. Sonuçta elinize çek tutarından daha az para geçer. Kırdırmanın ne kadara mal olduğunu doğru hesaplamak, vadeli satış fiyatını belirlemekten nakit planlamasına kadar birçok ticari kararın temelidir."
      ]
    },
    {
      h: "İskonto bedeli nasıl hesaplanır? Formüller",
      p: [
        "İskonto hesabında iki yöntem vardır. Bankacılık ve ticari uygulamada genellikle <strong>dış iskonto</strong> kullanılır; faiz, vadede tahsil edilecek tutar (senedin üzerindeki tutar) üzerinden hesaplanır. <strong>İç iskonto</strong> ise faizi bugün ele geçecek tutar üzerinden hesaplar ve matematiksel olarak \"gerçek\" faize karşılık gelir. Ticari hesaplarda yıl genellikle 360 gün kabul edilir; bazı kuruluşlar 365 gün kullanır."
      ],
      formula: "Dış iskonto = A × r × n ÷ 360\nDış iskontoda ele geçen = A − dış iskonto\nİç iskontoda peşin değer = A ÷ (1 + r × n ÷ 360)\nİç iskonto = A − peşin değer\n(A: senet tutarı, r: yıllık oran ondalık, n: vadeye kalan gün)",
      after: [
        "Formüllerdeki <strong>r × n ÷ 360</strong> çarpanı, yıllık oranın vadeye kalan süreye düşen payıdır. Yıllık %48 oranla 90 günlük bir vadede bu çarpan 0,48 × 90 ÷ 360 = 0,12'dir. Dış iskontoda tutarın %12'si kesilir; iç iskontoda tutar 1,12'ye bölünür. Bölmek, aynı yüzdeyi çıkarmaktan her zaman daha küçük bir kesinti verir."
      ]
    },
    {
      h: "Çözümlü örnek: 100.000 TL'lik senet",
      p: [
        "Bir toptancı 100.000 TL'lik, vadesine 90 gün kalan bir senedi kırdırmak istiyor. Kuruluşun teklif ettiği yıllık iskonto oranı örnek olarak %48, işlem masrafı 500 TL'dir. Oranlar yalnızca hesabı göstermek içindir; güncel oranlar kuruluşa ve piyasa koşullarına göre değişir."
      ],
      ol: [
        "Süre çarpanını bulun: 0,48 × 90 ÷ 360 = 0,12.",
        "Dış iskonto: 100.000 × 0,12 = 12.000 TL. Masrafla toplam kesinti 12.500 TL; ele geçen 87.500 TL.",
        "İç iskonto: peşin değer 100.000 ÷ 1,12 = 89.285,71 TL; iskonto 10.714,29 TL. Masrafla ele geçen 88.785,71 TL.",
        "Aradaki fark: 88.785,71 − 87.500 = 1.285,71 TL. Aynı ilan oranıyla dış iskonto daha pahalıdır.",
        "Efektif yıllık maliyet (dış iskonto, masraf dahil): 12.500 ÷ 87.500 × 360 ÷ 90 = %57,14. İlan edilen %48'in üzerindedir, çünkü faiz ele geçmeyen bir tutar üzerinden de hesaplanmıştır."
      ],
      after: [
        "Bu hesabı kendi tutarlarınızla [[arac:cek-senet-iskonto-hesapla|Çek Senet İskonto (Kırdırma) Hesaplama]] aracında yapabilirsiniz. Araç iç ve dış iskonto arasında seçim yapmanıza, 360 ya da 365 gün tabanını belirlemenize ve masrafı eklemenize izin verir; ele geçecek net tutarı, toplam kesinti yüzdesini ve efektif yıllık maliyeti gösterir."
      ]
    },
    {
      h: "İç iskonto ile dış iskonto farkı",
      table: {
        head: ["Özellik", "Dış (ticari) iskonto", "İç (gerçek) iskonto"],
        rows: [
          ["Faizin hesaplandığı tutar", "Vade tutarı (senet üzerindeki)", "Bugün ele geçen tutar"],
          ["Formül", "A × r × n ÷ 360", "A − A ÷ (1 + r × n ÷ 360)"],
          ["100.000 TL, 90 gün, %48", "12.000 TL", "10.714,29 TL"],
          ["Ele geçen", "88.000 TL", "89.285,71 TL"],
          ["Gerçek yıllık maliyet", "İlan oranından yüksek (%54,55)", "İlan oranına eşit (%48)"],
          ["Kullanım alanı", "Banka ve ticari uygulama", "Matematiksel değerleme, reeskont hesapları"]
        ]
      },
      after: [
        "Uzun vadelerde ve yüksek oranlarda fark çok büyür. Yıllık %60 oranla 360 günlük bir senette dış iskonto tutarın %60'ını keser ve ele yalnızca 40.000 TL geçer; iç iskontoda ise 100.000 ÷ 1,60 = 62.500 TL geçer. Oran ve vade daha da artarsa dış iskonto formülü sıfır ya da negatif sonuç verebilir; bu durum yöntemin uzun vadelerde anlamsızlaştığını gösterir. Teklif alırken kuruluşa hangi yöntemi ve kaç günlük yıl tabanını kullandığını sorun."
      ]
    },
    {
      h: "Ortalama vade nasıl hesaplanır?",
      p: [
        "Birden fazla çek ya da senedi birlikte kırdırırken, bir müşteriyle hesap kapatırken ya da çekleri tek bir vadeyle değiştirirken <strong>ortalama vade</strong> kullanılır. Ortalama vade, her kalemin tutarıyla ağırlıklandırılmış vade günüdür; büyük tutarlı çekler ortalamayı kendi vadesine doğru çeker."
      ],
      formula: "Ortalama vade (gün) = Σ (tutar × vadeye kalan gün) ÷ Σ tutar",
      table: {
        head: ["Çek", "Tutar", "Vadeye kalan gün", "Tutar × gün"],
        rows: [
          ["1", "20.000 TL", "30", "600.000"],
          ["2", "50.000 TL", "60", "3.000.000"],
          ["3", "30.000 TL", "90", "2.700.000"],
          ["Toplam", "100.000 TL", "", "6.300.000"]
        ],
        caption: "Ortalama vade = 6.300.000 ÷ 100.000 = 63 gün. Basit gün ortalaması (30 + 60 + 90) ÷ 3 = 60 gün olurdu; ağırlıklı ortalama daha doğrudur."
      },
      after: [
        "Bulunan ortalama vade, bugünün tarihine eklenerek ortalama vade tarihi elde edilir. Üç çekin toplam iskontosu, 100.000 TL'lik tek bir çekin 63 günlük iskontosuna eşittir: 100.000 × 0,48 × 63 ÷ 360 = 8.400 TL. Bunu tek tek de doğrulayabilirsiniz: 800 + 4.000 + 3.600 = 8.400 TL.",
        "Onlarca kalemi elle toplamak yerine [[arac:ortalama-vade-hesapla|Ortalama Vade Hesaplama]] aracına her satıra tutar ve gün (ya da vade tarihi) yazmanız yeterlidir; araç ortalama vadeyi gün ve tarih olarak verir."
      ]
    },
    {
      h: "Vade tarihi hafta sonuna denk gelirse ne olur?",
      p: [
        "Türk Ticaret Kanunu'na göre vadesi resmî tatil gününe rastlayan bir kambiyo senedinin ödenmesi ancak onu izleyen ilk iş gününde istenebilir. Bu kural, iskonto hesabında vadeye kalan gün sayısını bir ya da birkaç gün uzatabilir. Bazı kuruluşlar gün sayısını tahsilatın fiilen yapılacağı iş gününe göre hesaplar; bu nedenle cumartesi vadeli bir çekin iskonto günü iki gün artabilir.",
        "Çekte ise kural farklıdır: çek görüldüğünde ödenecek bir ödeme aracıdır ve kanunda belirtilen ibraz süreleri içinde bankaya sunulmalıdır. Ödeme yeri ile düzenleme yeri aynıysa ibraz süresi düzenleme tarihinden itibaren 10 gün, farklı yerlerdeyse bir aydır. Ödeme ve düzenleme yerleri farklı kıtalarda ise süre üç aydır. İskonto hesabında esas alınan gün, çekin üzerindeki düzenleme (keşide) tarihine göre belirlenir.",
        "Vadeye bir gün sayısı eklemeniz ve sonucun hangi güne denk geldiğini görmeniz gerekiyorsa [[arac:vade-tarihi-hesapla|Vade Tarihi Hesaplama]] aracı hafta sonuna denk gelen tarihi iş gününe kaydırarak gösterir. Resmî tatil kontrolünü ayrıca yapmayı unutmayın."
      ]
    },
    {
      h: "Banka iskontosu ile faktoring farkı",
      p: [
        "Vadeli alacağı nakde çevirmenin iki yaygın yolu vardır. Bankada çek ya da senet iskontosu genellikle firmanın kredi limiti içinde kullandırılan bir kredi işlemidir; banka firmanın kredibilitesine bakar ve çek ödenmezse firmaya rücu eder. Faktoring ise 6361 sayılı Kanun kapsamında BDDK denetiminde çalışan faktoring şirketlerinin, mal ve hizmet satışından doğan ve faturaya dayanan alacakları satın almasıdır."
      ],
      table: {
        head: ["Konu", "Banka iskontosu", "Faktoring"],
        rows: [
          ["Hukuki niteliği", "Kredi işlemi", "Alacağın devri (temlik)"],
          ["Dayanak belge", "Çek veya senet", "Fatura ve ona bağlı çek, senet"],
          ["Değerlendirme", "Firmanın kredi limiti ve teminatı", "Borçlunun (çeki veren) ve alacağın kalitesi"],
          ["Ödenmeme riski", "Genellikle firmaya rücu edilir", "Rücu'lu ya da rücusuz yapılabilir"],
          ["Ek hizmet", "Sınırlı", "Tahsilat takibi, alacak yönetimi"],
          ["Maliyet", "Faiz + komisyon + vergiler", "İskonto + faktoring komisyonu + vergiler"]
        ]
      },
      after: [
        "Hangisinin daha ucuz olduğu kuruluşa, firmanın büyüklüğüne ve çeki verenin kalitesine göre değişir. Karşılaştırmayı ilan edilen oranlarla değil, aynı çek için <strong>ele geçecek net tutar</strong> ve <strong>efektif yıllık maliyet</strong> üzerinden yapın. Banka işlemlerinde BSMV gibi vergiler ve çeşitli komisyonlar tutarı belirgin biçimde değiştirebilir."
      ]
    },
    {
      h: "Senet kırdırmanın maliyeti nasıl karşılaştırılır?",
      p: [
        "Kırdırmanın gerçek maliyetini görmek için tüm kesintileri toplayın ve elinize geçen tutara bölün, sonra yıllığa çevirin. Bu oran, alternatif finansman kaynaklarıyla (rotatif kredi, tedarikçiden vade uzatma, müşteriye peşin ödeme indirimi) karşılaştırma yapmanızı sağlar."
      ],
      formula: "Efektif yıllık maliyet (basit) = toplam kesinti ÷ ele geçen tutar × 360 ÷ gün\nEfektif yıllık maliyet (bileşik) = (A ÷ ele geçen)^(360 ÷ gün) − 1",
      ul: [
        "Örnekte basit efektif maliyet %57,14'tür. Bileşik hesapla (100.000 ÷ 87.500)<sup>4</sup> − 1 ≈ %70,6 çıkar; çünkü 90 günlük maliyet yılda dört kez tekrarlanırsa birbirinin üzerine biner.",
        "Müşteriniz erken ödeme karşılığında indirim istiyorsa, verdiğiniz indirimin yıllık karşılığını da aynı formülle bulun. 90 gün erken ödeme için %10 indirim, basit hesapla yıllık %44,4 maliyet demektir; bu oran kırdırma maliyetinizden düşükse indirim daha avantajlıdır.",
        "Vadeli satış fiyatınızı belirlerken iskonto maliyetini fiyata ekleyin; vade farkı hesabını [[arac:vade-farki-hesapla|Vade Farkı Hesaplama]] aracıyla yapabilirsiniz.",
        "Peşin ve taksitli seçenekleri karşılaştırma mantığı için [[bilgi:pesin-mi-taksit-mi-hesaplama|peşin mi taksit mi]] yazısındaki yöntem aynen geçerlidir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>İlan oranını gerçek maliyet sanmak:</strong> Dış iskontoda gerçek maliyet her zaman ilan oranından yüksektir; masraflar eklenince fark daha da açılır.",
        "<strong>Yıl tabanını karıştırmak:</strong> 360 ve 365 gün tabanları aynı oranla farklı sonuç verir; tekliflerin aynı tabanla hesaplandığından emin olun.",
        "<strong>Basit gün ortalaması almak:</strong> Farklı tutarlı çeklerin vadesini toplayıp adede bölmek yanlıştır; tutarla ağırlıklandırın.",
        "<strong>Tatil günlerini unutmak:</strong> Vadesi hafta sonu ya da bayrama denk gelen senette tahsil günü ileri kayar ve gün sayısı artabilir.",
        "<strong>Rücu riskini göz ardı etmek:</strong> Kırdırılan çek karşılıksız çıkarsa, rücu'lu işlemlerde tutar size geri yansır; müşterinin ödeme geçmişini kontrol edin.",
        "<strong>Muhasebe kaydını atlamak:</strong> İskonto gideri finansman gideridir ve faturalanmasıyla kayıt yöntemi için mali müşavirinize danışmanız gerekir."
      ]
    }
  ],
  faq: [
    ["Çek iskontosu (kırdırma) nedir?", "Çek iskontosu, vadesi gelmemiş bir çekin bir banka ya da faktoring şirketine devredilerek vadeye kalan süre için faiz ve masraf kesildikten sonra bugün nakde çevrilmesidir. Ele geçen tutar çek tutarından iskonto ve masraflar kadar azdır."],
    ["İskonto bedeli nasıl hesaplanır?", "Ticari uygulamada yaygın olan dış iskontoda iskonto, senet tutarı çarpı yıllık oran çarpı vadeye kalan gün bölü 360 formülüyle bulunur. 100.000 TL, %48 ve 90 gün için iskonto 12.000 TL olur."],
    ["İç iskonto ile dış iskonto farkı nedir?", "Dış iskonto faizi vadedeki senet tutarı üzerinden, iç iskonto ise bugün ele geçecek tutar üzerinden hesaplar. Bu yüzden aynı oranla iç iskontoda kesinti daha küçüktür ve gerçek maliyet ilan edilen orana eşittir."],
    ["Ortalama vade nasıl hesaplanır?", "Her çek ya da senedin tutarı vadeye kalan gün sayısıyla çarpılır, çarpımlar toplanır ve toplam tutara bölünür. Sonuç gün cinsinden ağırlıklı ortalama vadedir; bugünkü tarihe eklenerek ortalama vade tarihi bulunur."],
    ["Birden fazla çekin ortalama vadesi nasıl bulunur?", "20.000 TL 30 gün, 50.000 TL 60 gün ve 30.000 TL 90 gün vadeli üç çekte tutar çarpı gün toplamı 6.300.000'dir. Bu sayı toplam 100.000 TL'ye bölündüğünde ortalama vade 63 gün bulunur."],
    ["Faktoring ile banka iskontosu farkı nedir?", "Banka iskontosu genellikle firmanın kredi limiti içinde verilen bir kredi işlemidir. Faktoring ise faturaya dayanan ticari alacağın faktoring şirketine devridir; rücu'lu ya da rücusuz yapılabilir ve tahsilat takibi gibi hizmetler içerebilir."],
    ["Vade tarihi hafta sonuna gelirse ne olur?", "Türk Ticaret Kanunu'na göre vadesi resmî tatile rastlayan kambiyo senedinin ödenmesi ancak izleyen ilk iş gününde istenebilir. Bu da iskonto hesabında gün sayısını artırabileceğinden kuruluşun hangi günü esas aldığını sormak gerekir."],
    ["Senet kırdırmanın maliyeti nasıl karşılaştırılır?", "Faiz, komisyon ve vergilerin toplamı ele geçen tutara bölünüp 360 bölü gün sayısıyla çarpılarak efektif yıllık maliyet bulunur. Farklı tekliflerin ele geçecek net tutarı ve bu oran yan yana konarak karşılaştırma yapılır."],
    ["Dış iskontoda gerçek maliyet neden ilan oranından yüksektir?", "Çünkü faiz, size hiç ödenmeyen kesinti tutarını da içeren vade tutarı üzerinden hesaplanır. 90 günlük %48 oranlı işlemde ele geçen 88.000 TL için ödenen 12.000 TL, yıllık yaklaşık %54,55'lik bir maliyete karşılık gelir."]
  ],
  tools: ["cek-senet-iskonto-hesapla", "ortalama-vade-hesapla", "vade-tarihi-hesapla", "vade-farki-hesapla"],
  related: ["pesin-mi-taksit-mi-hesaplama", "nominal-ve-efektif-faiz-farki", "bilesik-faiz-nedir"],
  uyari: "finansal tavsiye değildir; örnek oranlar temsilîdir, işlem öncesi kuruluşun yazılı teklifini ve mali müşavirinizin görüşünü alın",
  sources: [
    ["Mevzuat Bilgi Sistemi – 6102 sayılı Türk Ticaret Kanunu", "https://www.mevzuat.gov.tr/"],
    ["Bankacılık Düzenleme ve Denetleme Kurumu", "https://www.bddk.org.tr/"],
    ["Türkiye Cumhuriyet Merkez Bankası", "https://www.tcmb.gov.tr/"]
  ]
};
