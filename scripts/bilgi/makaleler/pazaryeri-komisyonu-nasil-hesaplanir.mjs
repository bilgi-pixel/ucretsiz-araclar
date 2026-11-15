export default {
  slug: "pazaryeri-komisyonu-nasil-hesaplanir",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Pazaryeri Komisyonu Nasıl Hesaplanır? Trendyol, Hepsiburada Kâr Hesabı",
  pageTitle: "Pazaryeri Komisyonu Hesaplama: Komisyon, Kargo, KDV ve Net Kâr",
  description: "Pazaryeri komisyonu satış fiyatı × komisyon oranıyla bulunur, tutara KDV eklenir. Kargo, hizmet bedeli, stopaj ve KDV düşülerek net kâr ve doğru satış fiyatı hesabı.",
  keywords: ["pazaryeri komisyon hesaplama", "trendyol komisyon hesaplama", "hepsiburada komisyon hesaplama", "e-ticaret kar hesaplama", "komisyon kdv dahil mi", "kargo desi maliyeti", "pazaryeri net kar", "e-ticaret stopaj"],
  lead: "Pazaryeri komisyonu, ürünün satış fiyatının kategorinize tanımlı <strong>komisyon oranıyla</strong> çarpılmasıyla hesaplanır ve bu tutara ayrıca KDV eklenir. Ancak satıcının asıl sorusu komisyon değil, komisyon, kargo, hizmet bedeli, stopaj ve KDV düşüldükten sonra elde kalan <strong>net kârdır</strong>. Bu sayfada pazaryeri adı ya da oran ezberlemeden, kendi satıcı panelinizdeki oranla çalışan formülü, KDV'nin doğru ele alınışını, hedef kâra göre satış fiyatı belirlemeyi ve iadenin etkisini örnek bir hesapla adım adım gösteriyoruz.",
  kisaCevap: [
    "Komisyon tutarı = satış fiyatı × komisyon oranı; komisyon faturasına ayrıca %20 KDV eklenir.",
    "Komisyon oranı kategoriye, markaya ve kampanyaya göre değişir; güncel oranı satıcı panelinizden ve sözleşmenizden alın.",
    "Net kâr (KDV hariç) = KDV hariç satış − KDV hariç ürün maliyeti − komisyon − kargo − hizmet ve işlem bedelleri − diğer giderler.",
    "Komisyon, kargo ve hizmet bedellerine ödediğiniz KDV, satış KDV'nizden indirilebilir; bu yüzden kâr KDV hariç tutarlarla hesaplanır.",
    "2025 başından itibaren pazaryerleri satıcıya ödemelerden %1 stopaj keser; bu kesinti gider değil, beyannamede mahsup edilen vergi ön ödemesidir.",
    "Hedef marja göre KDV hariç fiyat = (maliyet + kargo + sabit bedeller) ÷ (1 − komisyon oranı × 1,20 − hedef marj)."
  ],
  figure: {
    alt: "KDV dahil 1.200 TL'lik bir satıştan net kâra ulaşma şelalesi: satış KDV'si 200 TL, ürün maliyeti 600 TL, komisyon 180 TL, kargo 80 TL, hizmet bedeli 10 TL düşülüyor; KDV hariç net kâr 130 TL, satışa oranı yüzde 13.",
    caption: "Örnek tutarlarla bir siparişin parçalara ayrılışı. Komisyon oranı (%15), kargo ve hizmet bedeli örnektir; kendi kategorinizin oranını ve kargo anlaşmanızı kullanın. KDV'li giderlerin KDV'si indirilebildiği için şelale KDV hariç tutarlarla çizilmiştir.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">1.200 TL'lik satıştan elde ne kalır? (örnek)</text>
  <line x1="40" y1="380" x2="700" y2="380" class="st" fill="none"/>
  <g class="sm mid">
    <rect x="50" y="80" width="80" height="300" class="p"/>
    <text x="90" y="72" class="b">1.200</text><text x="90" y="398">KDV dahil</text><text x="90" y="414">satış</text>
    <rect x="140" y="80" width="80" height="50" class="dgs"/>
    <text x="180" y="72" class="b dg">−200</text><text x="180" y="398">satış</text><text x="180" y="414">KDV'si</text>
    <rect x="230" y="130" width="80" height="150" class="dgs"/>
    <text x="270" y="122" class="b dg">−600</text><text x="270" y="398">ürün</text><text x="270" y="414">maliyeti</text>
    <rect x="320" y="280" width="80" height="45" class="dgs"/>
    <text x="360" y="272" class="b dg">−180</text><text x="360" y="398">komisyon</text><text x="360" y="414">%15</text>
    <rect x="410" y="325" width="80" height="20" class="dgs"/>
    <text x="450" y="317" class="b dg">−80</text><text x="450" y="398">kargo</text>
    <rect x="500" y="345" width="80" height="3" class="dgs"/>
    <text x="540" y="337" class="b dg">−10</text><text x="540" y="398">hizmet</text><text x="540" y="414">bedeli</text>
    <rect x="600" y="348" width="80" height="32" class="ok"/>
    <text x="640" y="340" class="b ok">130</text><text x="640" y="398" class="b">net kâr</text><text x="640" y="414">%13</text>
  </g>
  <line x1="130" y1="80" x2="140" y2="80" class="sb dash" fill="none"/>
  <line x1="220" y1="130" x2="230" y2="130" class="sb dash" fill="none"/>
  <line x1="310" y1="280" x2="320" y2="280" class="sb dash" fill="none"/>
  <line x1="400" y1="325" x2="410" y2="325" class="sb dash" fill="none"/>
  <line x1="490" y1="345" x2="500" y2="345" class="sb dash" fill="none"/>
  <line x1="580" y1="348" x2="600" y2="348" class="sb dash" fill="none"/>
  <rect x="300" y="48" width="400" height="80" rx="8" class="sf sb"/>
  <text x="316" y="72" class="sm b">Tutarlar KDV hariç; giderlerin KDV'si indirilir.</text>
  <text x="316" y="94" class="sm t2">%1 stopaj (10 TL) gider değil, vergiden mahsup edilir.</text>
  <text x="316" y="116" class="sm t2">Net kâr ÷ KDV hariç satış = 130 ÷ 1.000 = %13</text>
</svg>`
  },
  sections: [
    {
      h: "Pazaryeri komisyonu nedir, nasıl belirlenir?",
      p: [
        "Pazaryerleri, sitelerinde satış yapma imkânı karşılığında her siparişten bir pay alır; buna <strong>komisyon</strong> denir. Oran genellikle ürün kategorisine göre belirlenir ve aynı pazaryerinde bile elektronik, giyim, kozmetik ya da ev ürünleri için birbirinden çok farklı olabilir. Marka, satıcı performansı, kampanyaya katılım ve özel anlaşmalar da oranı değiştirebilir.",
        "Bu yüzden internette dolaşan \"şu pazaryeri yüzde şu kadar alıyor\" listeleri güvenilir bir hesap tabanı değildir. Doğru oran her zaman <strong>satıcı panelinizdeki kategori komisyon tablosunda</strong> ve imzaladığınız sözleşmede yazar. Bu rehberdeki formüller hangi pazaryerinde satarsanız satın aynı şekilde çalışır; yalnızca kendi oranlarınızı yerine koymanız gerekir."
      ]
    },
    {
      h: "Komisyon formülü ve KDV",
      p: [
        "Pazaryerlerinin çoğunda komisyon oranı müşterinin ödediği <strong>KDV dahil satış fiyatına</strong> uygulanır ve oranın kendisi KDV hariçtir. Pazaryeri komisyon tutarı için satıcıya fatura keser ve bu faturaya %20 KDV ekler. Satıcı, ödediği bu KDV'yi kendi KDV beyannamesinde indirilecek KDV olarak kullanabilir. Uygulamanın ayrıntısı pazaryerine göre farklılık gösterebileceği için sözleşmenizdeki komisyon matrahı tanımını kontrol edin."
      ],
      formula: "Komisyon (KDV hariç) = KDV dahil satış fiyatı × komisyon oranı\nKomisyon KDV'si = komisyon × %20\nPazaryerinin kestiği toplam = komisyon × 1,20",
      ol: [
        "KDV dahil 1.200 TL'ye satılan bir ürün ve <em>örnek</em> %15 komisyon oranı alın.",
        "Komisyon: 1.200 × 0,15 = 180 TL.",
        "Komisyonun KDV'si: 180 × 0,20 = 36 TL. Pazaryeri hak edişinizden toplam 216 TL keser.",
        "36 TL KDV'yi satış KDV'nizden indirebildiğiniz için kâr hesabında gider olarak 180 TL'yi kullanırsınız."
      ],
      after: [
        "Satış tutarı ve komisyon oranından komisyonu, KDV'sini ve elinize geçecek tutarı görmek için [[arac:komisyon-hesapla|Komisyon Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Komisyon dışında kâra etki eden kalemler",
      p: [
        "Komisyon tek gider değildir. Satıcıların zarar ettiğini geç fark etmesinin en sık nedeni, küçük görünen ama her siparişte tekrarlanan kalemlerin hesaba katılmamasıdır."
      ],
      table: {
        head: ["Kalem", "Nasıl hesaplanır?", "Not"],
        rows: [
          ["Komisyon", "Satış fiyatı × kategori oranı", "Tutarına KDV eklenir"],
          ["Kargo bedeli", "Desi ya da ağırlık ve anlaşmalı tarifeye göre", "Kargo faturasında KDV vardır"],
          ["Hizmet bedeli / işlem ücreti", "Sipariş başına sabit tutar ya da oran", "Pazaryerine göre adı ve tutarı değişir"],
          ["Ödeme ve erken ödeme bedelleri", "Hak edişin erken çekilmesi gibi tercihlerde", "Kullanılmıyorsa sıfır"],
          ["Reklam ve öne çıkarma", "Tıklama ya da gösterim başına", "Ürün bazında payını hesaplayın"],
          ["Ambalaj ve etiket", "Koli, dolgu, bant, fatura çıktısı", "Birim başına eklenir"],
          ["İade maliyeti", "İade oranı × iade başına maliyet", "Aşağıda ayrıca anlatılmıştır"],
          ["E-ticaret stopajı", "KDV hariç satış × %1", "Gider değil, vergiden mahsup edilir"]
        ]
      }
    },
    {
      h: "Çözümlü örnek: komisyon, kargo ve KDV sonrası net kâr",
      p: [
        "Aşağıdaki hesapta tüm oran ve bedeller <em>örnek tutardır</em>. Ürün ve satış KDV oranı %20, kategori komisyonu %15, kargo KDV hariç 80 TL, hizmet bedeli KDV hariç 10 TL kabul edilmiştir."
      ],
      table: {
        head: ["Kalem", "Hesap", "KDV hariç tutar", "KDV"],
        rows: [
          ["Satış", "1.200 ÷ 1,20", "1.000,00 TL", "200,00 TL (hesaplanan)"],
          ["Ürün maliyeti", "Alış faturası", "−600,00 TL", "120,00 TL (indirilecek)"],
          ["Komisyon", "1.200 × %15", "−180,00 TL", "36,00 TL (indirilecek)"],
          ["Kargo", "Anlaşmalı tarife", "−80,00 TL", "16,00 TL (indirilecek)"],
          ["Hizmet bedeli", "Sipariş başına", "−10,00 TL", "2,00 TL (indirilecek)"],
          ["Net kâr (vergi öncesi)", "1.000 − 600 − 180 − 80 − 10", "130,00 TL", "Ödenecek KDV: 26,00 TL"]
        ],
        caption: "Ödenecek KDV = 200 − (120 + 36 + 16 + 2) = 26 TL. Net kâr marjı KDV hariç satışa göre %13'tür."
      },
      ol: [
        "<strong>Pazaryerinin ödeyeceği tutar:</strong> 1.200 − 216 (komisyon ve KDV'si) − 96 (kargo ve KDV'si) − 12 (hizmet bedeli ve KDV'si) − 10 (%1 stopaj) = 866 TL.",
        "<strong>Nakit akışı kontrolü:</strong> 866 − 720 (ürünün KDV dahil alış maliyeti) − 26 (ödenecek KDV) = 120 TL. Stopaj olarak kesilen 10 TL vergiden mahsup edildiğinde sonuç 130 TL'lik kârla tutarlıdır.",
        "<strong>Yorum:</strong> Etikette 1.200 TL görünen satışın yalnızca 130 TL'si vergi öncesi kârdır. Komisyon oranı %20 olsaydı kâr 70 TL'ye, marj %7'ye düşerdi."
      ]
    },
    {
      h: "Satış fiyatı komisyona göre nasıl belirlenir?",
      p: [
        "Komisyon satış fiyatına bağlı olduğu için fiyatı artırdığınızda komisyon da artar. Bu döngüsel ilişki nedeniyle doğru fiyat, maliyetin üzerine sabit bir tutar eklenerek değil, aşağıdaki formülle bulunur. Formül, komisyonun KDV dahil fiyata uygulandığı durumu esas alır; KDV oranı %20 olduğunda komisyon oranı 1,20 ile çarpılır."
      ],
      formula: "KDV hariç fiyat = (ürün maliyeti + kargo + sabit bedeller) ÷ (1 − komisyon oranı × 1,20 − hedef marj)\nKDV dahil fiyat = KDV hariç fiyat × 1,20",
      ol: [
        "Örnek: ürün maliyeti 600 TL, kargo 80 TL, hizmet bedeli 10 TL (hepsi KDV hariç), komisyon %15, hedef net marj %20.",
        "Payda: 1 − 0,15 × 1,20 − 0,20 = 1 − 0,18 − 0,20 = 0,62.",
        "KDV hariç fiyat: (600 + 80 + 10) ÷ 0,62 = 1.112,90 TL.",
        "KDV dahil fiyat: 1.112,90 × 1,20 = 1.335,48 TL; pratikte 1.339,90 TL gibi bir fiyat seçilebilir.",
        "Kontrol: komisyon 1.335,48 × 0,15 = 200,32 TL; kâr 1.112,90 − 600 − 80 − 10 − 200,32 = 222,58 TL; 222,58 ÷ 1.112,90 = %20."
      ],
      after: [
        "Hedef marja göre satış fiyatını ya da azami alış maliyetini komisyon ve kargo düşülmüş olarak hesaplamak için [[arac:kar-marji-hesapla|Kâr Marjı Hesaplama]] aracını, toplu ürün listesi için [[arac:fiyat-hesapla|Fiyat Hesaplama]] aracını kullanabilirsiniz. Marj ile kâr oranı farkını [[bilgi:kar-marji-nasil-hesaplanir|kâr marjı rehberinde]] ayrıntılı anlattık."
      ]
    },
    {
      h: "Kargo desisi ve iade oranı kârı nasıl etkiler?",
      p: [
        "Kargo ücreti çoğunlukla <strong>desi</strong> ile belirlenir: koli ölçülerinin santimetre cinsinden çarpımının 3.000'e bölünmesiyle bulunur ve gerçek ağırlıkla karşılaştırılarak büyük olan faturalanır. 40 × 30 × 25 cm'lik bir koli 30.000 ÷ 3.000 = 10 desidir; ürün yalnızca 2 kg olsa bile 10 desi üzerinden ücret ödenir. Hafif ama hacimli ürünlerde doğru koli seçimi doğrudan kâr demektir. Ölçülerinizle desiyi hesaplamak için [[arac:desi-hesapla|Desi Hesaplama]] aracını kullanabilirsiniz."
      ],
      formula: "Desi = en × boy × yükseklik (cm) ÷ 3.000\nSipariş başına beklenen iade maliyeti = iade oranı × iade başına maliyet",
      ul: [
        "<strong>İade maliyeti:</strong> İade edilen siparişte genellikle gidiş ve dönüş kargosu satıcıya kalır, ambalaj yenilenir ve bazen ürün yeniden satılamaz. İade başına toplam maliyet 160 TL ve iade oranı %8 ise her siparişe 0,08 × 160 = 12,80 TL iade payı eklemelisiniz.",
        "<strong>Komisyon iadesi:</strong> İade edilen siparişin komisyonu çoğu pazaryerinde satıcıya geri yansıtılır; kargo bedelleri ise genellikle geri gelmez. Kendi pazaryerinizin iade politikasını kontrol edin.",
        "<strong>Kategori farkı:</strong> Giyim ve ayakkabı gibi beden denemesi gerektiren kategorilerde iade oranı yüksek olabilir; bu kategorilerde fiyatlamaya iade payını mutlaka ekleyin."
      ]
    },
    {
      h: "Hangi pazaryeri daha düşük komisyon alır?",
      p: [
        "Bu sorunun herkes için geçerli tek bir cevabı yoktur. Pazaryerleri komisyonu kategori bazında belirler; bir pazaryeri bir kategoride daha düşük, başka bir kategoride daha yüksek oran uygulayabilir. Ayrıca yalnızca komisyon oranına bakmak yanıltıcıdır: sipariş başına hizmet bedeli, kargo anlaşması, hak ediş ödeme süresi, reklam ihtiyacı ve iade politikası toplam maliyeti belirgin biçimde değiştirir.",
        "Doğru karşılaştırma, aynı ürün için her pazaryerinin kendi kalemleriyle sipariş başına net kârı hesaplamaktır. Yukarıdaki tabloyu her pazaryeri için ayrı bir sütun olarak hazırlarsanız, hangi kanalın sizin ürününüz için daha kârlı olduğunu rakamla görürsünüz. Ödeme süresi uzun olan kanallarda paranın beklemesinin maliyetini de hesaba katın."
      ]
    },
    {
      h: "E-ticaret stopajı ve vergi tarafı",
      p: [
        "1 Ocak 2025'ten itibaren elektronik ticaret aracı hizmet sağlayıcıları, yani pazaryerleri, satıcılara yaptıkları ödemelerden KDV hariç satış tutarı üzerinden <strong>%1 gelir ya da kurumlar vergisi tevkifatı</strong> (stopaj) yapmaktadır. Bu kesinti bir gider değildir; satıcının yıllık ya da geçici vergi beyannamesinde hesaplanan vergiden mahsup edilir. Güncel oran ve uygulama esasları için Gelir İdaresi Başkanlığı duyurularını takip edin.",
        "Kâr hesabında stopajı gider gibi düşerseniz kârınızı olduğundan düşük görürsünüz; hiç hesaba katmazsanız da nakit akışınızı olduğundan yüksek planlarsınız. En doğrusu stopajı \"vergi ön ödemesi\" olarak ayrı izlemektir. KDV ayrıştırma işlemleri için [[arac:kdv-hesapla|KDV Hesaplama]] aracı işinizi görür."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Tek bir oranla tüm ürünleri fiyatlamak:</strong> Kategori komisyonları farklıdır; her ürünü kendi kategorisinin oranıyla hesaplayın.",
        "<strong>Komisyonun KDV'sini unutmak:</strong> Hak edişten kesilen tutar komisyonun 1,20 katıdır; nakit akışı planında bunu dikkate alın.",
        "<strong>KDV dahil tutarlarla kâr hesaplamak:</strong> Satış ve giderleri KDV hariç karşılaştırın; KDV'yi ayrı bir hesap olarak izleyin.",
        "<strong>Maliyete sabit tutar ekleyerek fiyat bulmak:</strong> Komisyon fiyatla birlikte arttığı için formüldeki bölme yöntemini kullanın.",
        "<strong>Desiyi hesaplamadan kargo ücretsiz kampanyası yapmak:</strong> Büyük kolili ürünlerde kargo bedeli kârın tamamını alabilir.",
        "<strong>İade ve reklamı sıfır saymak:</strong> Ortalama iade oranınızı ve reklam harcamanızın sipariş başına payını birim maliyete ekleyin."
      ]
    }
  ],
  faq: [
    ["Pazaryeri komisyonu nasıl hesaplanır?", "Ürünün satış fiyatı, satıcı panelinde kategoriniz için tanımlı komisyon oranıyla çarpılır. Çoğu pazaryerinde oran KDV dahil fiyata uygulanır ve bulunan komisyon tutarına ayrıca yüzde 20 KDV eklenerek hak edişten kesilir."],
    ["Trendyol komisyonu KDV dahil mi?", "Pazaryerlerinde yaygın uygulama, komisyon oranının KDV dahil satış fiyatına uygulanması ve komisyon tutarına ayrıca KDV eklenmesidir. Kesin matrah ve oran için satıcı panelinizdeki kategori tablosunu ve sözleşmenizi kontrol etmeniz gerekir."],
    ["Komisyon, kargo ve KDV sonrası net kâr nasıl bulunur?", "KDV hariç satış tutarından KDV hariç ürün maliyeti, komisyon, kargo ve hizmet bedelleri çıkarılır. Giderlerde ödenen KDV satış KDV'sinden indirildiği için kâr KDV hariç tutarlarla hesaplanır; stopaj ise vergiden mahsup edilir."],
    ["Satış fiyatı komisyona göre nasıl belirlenir?", "Ürün maliyeti, kargo ve sabit bedellerin toplamı, bir eksi komisyon oranı çarpı 1,20 eksi hedef marj ifadesine bölünür. Bulunan KDV hariç fiyat 1,20 ile çarpılarak KDV dahil satış fiyatı elde edilir."],
    ["Hizmet bedeli ve işlem ücreti nedir?", "Bazı pazaryerlerinin komisyona ek olarak sipariş başına aldığı sabit ya da oransal bedellerdir. Adı ve tutarı pazaryerine göre değişir, faturasına KDV eklenir ve özellikle düşük fiyatlı ürünlerde kârı belirgin biçimde azaltır."],
    ["Kargo desi maliyeti kârı nasıl etkiler?", "Kargo ücreti koli ölçülerinden bulunan desi ile gerçek ağırlıktan büyük olanına göre belirlenir. Hafif ama hacimli ürünlerde yüksek desi kargo maliyetini artırır; doğru koli seçimiyle sipariş başına maliyet önemli ölçüde düşürülebilir."],
    ["İade oranı kâr hesabına nasıl katılır?", "Ortalama iade oranı, bir iadenin satıcıya toplam maliyetiyle çarpılır ve sonuç her siparişin maliyetine eklenir. Yüzde 8 iade oranı ve 160 TL iade maliyetinde her siparişe 12,80 TL iade payı eklenmelidir."],
    ["Hangi pazaryeri daha düşük komisyon alır?", "Komisyonlar kategoriye ve satıcıya göre belirlendiği için genel bir sıralama yapılamaz. Doğru karşılaştırma için aynı ürünün her pazaryerindeki komisyon, hizmet bedeli, kargo ve ödeme süresiyle sipariş başına net kârını ayrı ayrı hesaplamak gerekir."],
    ["E-ticaret stopajı kârı azaltır mı?", "Hayır. Pazaryerinin satıcıya ödemeden kestiği yüzde 1 stopaj bir gider değil, vergi ön ödemesidir ve beyannamede hesaplanan vergiden mahsup edilir. Ancak nakit akışını etkilediği için ödeme planında dikkate alınmalıdır."]
  ],
  tools: ["komisyon-hesapla", "kar-marji-hesapla", "desi-hesapla", "kdv-hesapla", "fiyat-hesapla"],
  related: ["kar-marji-nasil-hesaplanir", "basabas-noktasi-nedir"],
  sources: [
    ["Gelir İdaresi Başkanlığı", "https://www.gib.gov.tr/"],
    ["T.C. Ticaret Bakanlığı – Elektronik ticaret", "https://www.eticaret.gov.tr/"]
  ],
  uyari: "genel bilgilendirme amaçlıdır; vergi ve sözleşme uygulamaları için mali müşavirinize ve pazaryerinin güncel satıcı koşullarına başvurun"
};
