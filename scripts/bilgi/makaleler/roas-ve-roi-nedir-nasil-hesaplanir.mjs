export default {
  slug: "roas-ve-roi-nedir-nasil-hesaplanir",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "ROAS ve ROI Nedir? Reklam Getirisi Nasıl Hesaplanır, Kaç Olmalı",
  pageTitle: "ROAS ve ROI Nedir? Reklam Getirisi Hesaplama ve Başabaş ROAS",
  description: "ROAS = reklamdan gelen ciro ÷ reklam harcaması; ROI ise kârı yatırıma böler. Başabaş ROAS = 1 ÷ kâr marjı. İyi ROAS kaç olmalı, CAC ve çözümlü örnekler.",
  keywords: ["roas nedir", "roas hesaplama", "roi nedir", "yatırım getirisi hesaplama", "reklam getirisi kaç olmalı", "başabaş roas", "roas roi farkı", "müşteri edinme maliyeti"],
  lead: "ROAS (reklam harcamasının getirisi), <strong>reklamdan gelen cironun reklam harcamasına bölünmesiyle</strong> bulunur: 10.000 TL harcayıp 40.000 TL satış yapan bir kampanyanın ROAS'ı 4'tür (%400). ROI (yatırım getirisi) ise ciroyu değil kârı ölçer: elde edilen net kazancı yatırılan tutara böler. İyi bir ROAS için tek bir sayı yoktur; ürününüzün kâr marjına bağlıdır ve <strong>başabaş ROAS = 1 ÷ brüt kâr marjı</strong> formülüyle bulunur. Bu sayfada ROAS ile ROI'nin farkını, başabaş noktasını, hedef ROAS belirlemeyi, müşteri edinme maliyetini ve sık yapılan hesap hatalarını çözümlü örneklerle bulacaksınız.",
  kisaCevap: [
    "ROAS = reklamdan gelen ciro ÷ reklam harcaması; 4 kat ya da %400 olarak yazılabilir.",
    "ROI = (kazanç − yatırım) ÷ yatırım × 100; reklam için kazanç, satışlardan elde edilen brüt kârdır.",
    "Başabaş ROAS = 1 ÷ brüt kâr marjı; %25 marjda 4, %40 marjda 2,5'tir.",
    "ROAS başabaş değerinin üzerindeyse reklam brüt kâr bazında kendini karşılıyor, altındaysa zarar ettiriyordur.",
    "Müşteri edinme maliyeti (CAC) = toplam pazarlama ve satış gideri ÷ kazanılan yeni müşteri sayısı.",
    "Ciroyu KDV dahil ya da hariç ölçtüğünüzü her hesapta aynı tutun; aksi hâlde ROAS olduğundan yüksek görünür."
  ],
  figure: {
    alt: "Aynı 10.000 TL reklam harcaması için ROAS ve ROI hesabını gösteren akış: 40.000 TL ciro, yüzde 35 brüt marjla 14.000 TL brüt kâr, reklam sonrası 4.000 TL kâr; başabaş ROAS 2,86 çizgisi.",
    caption: "ROAS ciroya, ROI kâra bakar. Örnekte ROAS 4 olmasına rağmen reklamın getirisi %40'tır, çünkü cironun yalnızca %35'i brüt kârdır. Başabaş ROAS çizgisi, bu marjla reklamın kendini karşıladığı noktayı gösterir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Aynı kampanya, iki farklı soru</text>
  <rect x="30" y="50" width="200" height="70" rx="10" class="dgs"/>
  <text x="130" y="78" class="b mid">Reklam harcaması</text><text x="130" y="104" class="lg b mid">10.000 TL</text>
  <rect x="260" y="50" width="200" height="70" rx="10" class="ps"/>
  <text x="360" y="78" class="b mid">Reklamdan ciro</text><text x="360" y="104" class="lg b mid">40.000 TL</text>
  <rect x="490" y="50" width="200" height="70" rx="10" class="p"/>
  <text x="590" y="78" class="b mid sf">ROAS</text><text x="590" y="104" class="lg b mid sf">40.000 ÷ 10.000 = 4</text>
  <rect x="260" y="150" width="200" height="70" rx="10" class="sf sb"/>
  <text x="360" y="178" class="b mid">Brüt kâr (marj %35)</text><text x="360" y="204" class="lg b mid">14.000 TL</text>
  <rect x="490" y="150" width="200" height="70" rx="10" class="oks"/>
  <text x="590" y="178" class="b mid">ROI</text><text x="590" y="204" class="b mid">(14.000 − 10.000) ÷ 10.000 = %40</text>
  <text x="30" y="270" class="b">ROAS ölçeği ve başabaş noktası (marj %35)</text>
  <line x1="40" y1="320" x2="680" y2="320" class="st sw" fill="none"/>
  <rect x="40" y="300" width="232" height="40" class="dgs"/>
  <rect x="272" y="300" width="408" height="40" class="oks"/>
  <g class="sm mid">
    <text x="40" y="360">0</text><text x="120" y="360">1</text><text x="200" y="360">2</text><text x="280" y="360">3</text>
    <text x="360" y="360">4</text><text x="440" y="360">5</text><text x="520" y="360">6</text><text x="600" y="360">7</text><text x="680" y="360">8</text>
  </g>
  <line x1="269" y1="290" x2="269" y2="350" class="sdg sw" fill="none"/>
  <text x="269" y="284" class="sm b mid dg">Başabaş 2,86</text>
  <text x="156" y="326" class="sm b mid">Zarar</text><text x="476" y="326" class="sm b mid">Kâr</text>
  <circle cx="360" cy="320" r="8" class="p"/>
  <text x="360" y="392" class="sm mid">Başabaş ROAS = 1 ÷ 0,35 ≈ 2,86 · Örnek kampanya ROAS 4 ile kârda</text>
</svg>`
  },
  sections: [
    {
      h: "ROAS nedir?",
      p: [
        "ROAS (Return on Ad Spend), reklama harcadığınız her 1 TL'nin kaç TL satış getirdiğini gösterir. Dijital reklamcılıkta kampanya, reklam grubu ya da ürün bazında performansı karşılaştırmanın en yaygın ölçüsüdür. Reklam panelleri dönüşüm değerini harcamaya bölerek bu oranı otomatik olarak raporlar.",
        "ROAS bir kat ya da yüzde olarak yazılabilir. ROAS 4, \"her 1 TL reklam 4 TL ciro getirdi\" demektir ve %400 ile aynıdır. ROAS 1'in altındaysa reklamdan gelen ciro bile harcamayı karşılamıyordur. Ancak ROAS'ın 1'in üzerinde olması kâr edildiği anlamına gelmez; ciro içinde ürün maliyeti, kargo, komisyon ve vergiler de vardır."
      ],
      formula: "ROAS = reklamdan gelen ciro ÷ reklam harcaması\nROAS (%) = ROAS × 100"
    },
    {
      h: "ROI nedir? ROAS ile farkı",
      p: [
        "ROI (Return on Investment, yatırım getirisi), bir yatırımdan elde edilen net kazancın yatırım tutarına oranıdır. ROAS ciroya bakarken ROI kâra bakar; bu yüzden ROI işletme açısından daha gerçekçi bir başarı ölçüsüdür. ROI yalnızca reklam için değil, bir makine alımı, yazılım aboneliği ya da eğitim programı gibi her yatırım için hesaplanabilir."
      ],
      formula: "ROI (%) = (yatırımdan elde edilen kazanç − yatırım tutarı) ÷ yatırım tutarı × 100\nReklam için: ROI = (reklamdan gelen brüt kâr − reklam harcaması) ÷ reklam harcaması × 100",
      table: {
        head: ["Özellik", "ROAS", "ROI"],
        rows: [
          ["Neyi ölçer?", "Ciro / harcama", "Net kazanç / yatırım"],
          ["Maliyetleri hesaba katar mı?", "Hayır, yalnızca reklam harcaması", "Evet, ürün maliyeti ve diğer giderler"],
          ["Kullanım alanı", "Kampanya ve reklam karşılaştırması", "İşletme düzeyinde kârlılık, her türlü yatırım"],
          ["Tipik yazım", "4 kat ya da %400", "%40"],
          ["Negatif olabilir mi?", "Hayır (en az 0)", "Evet, zararda negatif çıkar"]
        ]
      },
      after: [
        "İki ölçü birlikte kullanılmalıdır. ROAS, hangi kampanyanın daha çok satış getirdiğini hızlıca gösterir; ROI ise bu satışların gerçekten para kazandırıp kazandırmadığını söyler. [[arac:reklam-getirisi-hesapla|Reklam getirisi (ROAS) hesaplama aracı]] kâr marjınızı girdiğinizde başabaş ROAS'ı ve reklam sonrası kârı da gösterir. Genel yatırımlar için [[arac:yatirim-getirisi-hesapla|yatırım getirisi (ROI) hesaplama aracı]] net kazancı ve süre verirseniz yıllıklandırılmış getiriyi hesaplar."
      ]
    },
    {
      h: "Çözümlü örnek: aynı kampanyanın ROAS'ı ve ROI'si",
      ol: [
        "Bir ay içinde reklama 10.000 TL harcadınız ve reklamdan gelen siparişlerin KDV hariç cirosu 40.000 TL oldu.",
        "ROAS: 40.000 ÷ 10.000 = 4, yani %400.",
        "Ürünlerinizin ortalama brüt kâr marjı, ürün maliyeti, kargo ve komisyon düşüldükten sonra %35 olsun. Brüt kâr: 40.000 × 0,35 = 14.000 TL.",
        "Reklam sonrası kâr: 14.000 − 10.000 = 4.000 TL.",
        "ROI: 4.000 ÷ 10.000 × 100 = %40."
      ],
      after: [
        "Aynı kampanyada ROAS 2,5'e düşseydi ciro 25.000 TL, brüt kâr 25.000 × 0,35 = 8.750 TL olurdu. Reklam harcaması düşüldüğünde 8.750 − 10.000 = −1.250 TL zarar çıkardı. Yani ROAS 2,5 \"her 1 TL'ye 2,5 TL\" diye kulağa iyi gelse de bu marjla zarar demektir."
      ]
    },
    {
      h: "Başabaş ROAS nasıl bulunur?",
      p: [
        "Başabaş ROAS, reklamın brüt kâr bazında kendini tam karşıladığı ROAS değeridir. Bu noktada reklamdan elde edilen brüt kâr, reklam harcamasına eşittir. Formül, brüt kâr marjının tersidir."
      ],
      formula: "Başabaş ROAS = 1 ÷ brüt kâr marjı (ondalık)\nÖrnek: marj %35 → 1 ÷ 0,35 ≈ 2,86",
      table: {
        head: ["Brüt kâr marjı", "Başabaş ROAS", "Başabaş ROAS (%)"],
        rows: [
          ["%10", "10,0", "%1.000"],
          ["%20", "5,0", "%500"],
          ["%25", "4,0", "%400"],
          ["%35", "2,86", "%286"],
          ["%50", "2,0", "%200"],
          ["%70", "1,43", "%143"]
        ]
      },
      after: [
        "Tablodaki ilişki çok öğreticidir: düşük marjla çalışan bir işletme için ROAS 4 zarar anlamına gelebilirken yüksek marjlı bir dijital ürün için ROAS 2 bile kârlı olabilir. Bu yüzden \"sektörde ROAS kaç olmalı\" sorusunun tek bir cevabı yoktur. Kâr marjının nasıl hesaplandığını [[bilgi:kar-marji-nasil-hesaplanir|kâr marjı nasıl hesaplanır]] yazımız, genel başabaş mantığını [[bilgi:basabas-noktasi-nedir|başabaş noktası nedir]] yazımız ayrıntılı anlatır."
      ]
    },
    {
      h: "İyi bir ROAS değeri kaçtır? Hedef ROAS belirleme",
      p: [
        "İyi ROAS, başabaş değerinin üzerinde ve hedeflediğiniz kârı bırakan ROAS'tır. Hedefi belirlemek için önce brüt kâr marjınızı, sonra reklamdan sonra kalmasını istediğiniz kâr payını belirleyin."
      ],
      formula: "Hedef ROAS = 1 ÷ (brüt kâr marjı − hedef net kâr payı)\nÖrnek: marj %35, hedef %10 → 1 ÷ 0,25 = 4",
      ul: [
        "<strong>Yeni müşteri kazanımı:</strong> İlk siparişte başabaşa yakın bir ROAS kabul edilebilir, çünkü müşteri tekrar alışveriş yapabilir. Bu karar müşteri yaşam boyu değerine dayanmalıdır.",
        "<strong>Marka bilinirliği kampanyaları:</strong> Doğrudan satış hedeflemeyen kampanyalarda ROAS düşük çıkar; bu kampanyalar farklı ölçülerle değerlendirilir.",
        "<strong>Mevsimsel dönemler:</strong> Yoğun satış dönemlerinde reklam maliyetleri yükselebilir; hedef ROAS'ı dönemsel olarak gözden geçirin.",
        "<strong>Ürün bazında hedef:</strong> Marjı farklı ürünler için tek bir hedef ROAS kullanmak bazılarında zarar, bazılarında fırsat kaçırma demektir."
      ]
    },
    {
      h: "Müşteri edinme maliyeti (CAC) nedir?",
      p: [
        "Müşteri edinme maliyeti (Customer Acquisition Cost), bir yeni müşteri kazanmak için ortalama ne kadar harcadığınızı gösterir. Yalnızca reklam harcamasını değil, pazarlama ekibi, ajans, araç abonelikleri ve satış giderlerini de kapsayabilir."
      ],
      formula: "CAC = toplam pazarlama ve satış gideri ÷ kazanılan yeni müşteri sayısı\nLTV:CAC = müşteri yaşam boyu değeri ÷ CAC",
      after: [
        "Örnek: Bir ayda pazarlama ve satış için toplam 30.000 TL harcadınız ve 150 yeni müşteri kazandınız. CAC = 30.000 ÷ 150 = 200 TL. Bir müşteri ortalama olarak yaşam boyu 900 TL brüt kâr bırakıyorsa LTV:CAC oranı 900 ÷ 200 = 4,5'tir. Pratikte bu oranın 3 civarında ya da üzerinde olması sağlıklı kabul edilir; ancak bu bir kural değil, sık anılan bir başlangıç ölçüsüdür.",
        "CAC'ı ve LTV:CAC oranını [[arac:musteri-edinme-maliyeti-hesapla|müşteri edinme maliyeti hesaplama aracı]] ile, ürün bazında marjı ise [[arac:kar-marji-hesapla|kâr marjı hesaplama aracı]] ile bulabilirsiniz."
      ]
    },
    {
      h: "Reklam panellerinde ROAS nasıl görülür?",
      p: [
        "Arama motoru ve sosyal medya reklam panelleri, dönüşüm izleme kurulduğunda her satışın değerini kaydeder ve bu değerin harcamaya oranını ROAS olarak ya da \"dönüşüm değeri / maliyet\" sütunu olarak gösterir. Bu sütunlar genellikle varsayılan görünümde yer almaz; sütun ayarlarından eklenmesi gerekir.",
        "Panelin raporladığı değer, sitenizden gönderilen dönüşüm değerine bağlıdır. Sitenizde sipariş tutarı KDV ve kargo dahil gönderiliyorsa ROAS olduğundan yüksek görünür. Ayrıca paneller satışları kendi ilişkilendirme kurallarına göre sayar: birden fazla reklam kanalı kullanıyorsanız aynı satış birkaç panelde birden görünebilir. Bu yüzden toplam reklam getirisini değerlendirirken muhasebe kayıtlarınızdaki gerçek satışları esas almanız önerilir."
      ]
    },
    {
      h: "Türkiye'de e-ticarette dikkat edilecekler",
      ul: [
        "<strong>KDV:</strong> Türkiye'de genel KDV oranı %20'dir. KDV dahil 48.000 TL'lik ciro, KDV hariç 40.000 TL'dir; ROAS hesabında KDV hariç ciroyu kullanmak gerçekçi sonuç verir.",
        "<strong>Pazaryeri komisyonu:</strong> Pazaryerinde satış yapıyorsanız komisyon brüt marjdan düşülmelidir; ayrıntılar [[bilgi:pazaryeri-komisyonu-nasil-hesaplanir|pazaryeri komisyonu]] yazımızdadır.",
        "<strong>Kargo ve iade:</strong> Ücretsiz kargo ve iade oranları marjı aşındırır; başabaş ROAS'ı bu giderler düşülmüş marjla hesaplayın.",
        "<strong>Taksit ve ödeme komisyonu:</strong> Ödeme altyapısının kestiği komisyon da her siparişin kârını azaltır."
      ]
    },
    {
      h: "ROAS düşükse nereye bakmalı?",
      p: [
        "ROAS başabaş değerinin altında kalıyorsa sorun yalnızca reklamda olmayabilir. ROAS'ı belirleyen iki bileşen vardır: tıklama başına maliyet ve ziyaretçinin alışverişe dönüşme oranıyla birlikte sepet tutarı. Bu yüzden iyileştirme hem reklam tarafında hem de site tarafında yapılabilir."
      ],
      ul: [
        "<strong>Hedefleme:</strong> Satın alma niyeti düşük kitlelere ve alakasız arama terimlerine harcanan bütçeyi azaltın.",
        "<strong>Ürün sayfası:</strong> Net fotoğraflar, açık fiyat, kargo ve iade bilgisi dönüşüm oranını doğrudan etkiler.",
        "<strong>Sepet tutarı:</strong> Tamamlayıcı ürün önerileri ve ücretsiz kargo eşiği ortalama sipariş tutarını yükseltebilir.",
        "<strong>Ürün seçimi:</strong> Reklam bütçesini marjı yüksek ve başabaş ROAS'ı düşük ürünlere kaydırmak toplam kârlılığı artırır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>ROAS'ı kâr sanmak:</strong> ROAS 3, %200 kâr değildir; marj %30 ise reklam ancak başabaştadır.",
        "<strong>KDV dahil ciroyla hesaplamak:</strong> ROAS'ı %20 şişirir ve kampanyayı olduğundan iyi gösterir.",
        "<strong>Tek bir hedef ROAS kullanmak:</strong> Marjı farklı ürünler için ayrı hedefler belirleyin.",
        "<strong>İadeleri düşmemek:</strong> İade edilen siparişler panelde satış olarak kalmaya devam edebilir.",
        "<strong>Kısa dönemle karar vermek:</strong> Birkaç günlük veriyle kampanya kapatmak, özellikle düşük satış hacminde rastlantısal dalgalanmalara göre karar vermek demektir."
      ]
    }
  ],
  faq: [
    ["ROAS nedir?", "ROAS, reklama harcanan her 1 TL'nin kaç TL satış getirdiğini gösteren orandır. Reklamdan gelen cironun reklam harcamasına bölünmesiyle bulunur; 10.000 TL harcamayla 40.000 TL ciro elde edildiyse ROAS 4'tür."],
    ["ROAS nasıl hesaplanır?", "Belirli bir dönemde reklamdan gelen ciroyu aynı dönemdeki reklam harcamasına bölersiniz. Sonucu kat olarak ya da 100 ile çarparak yüzde olarak yazabilirsiniz; ciroyu KDV hariç kullanmak daha gerçekçidir."],
    ["ROI ile ROAS arasındaki fark nedir?", "ROAS ciroyu harcamaya böler ve maliyetleri hesaba katmaz. ROI ise net kazancı yatırıma böler; reklam için brüt kârdan reklam harcaması düşülür. Bu yüzden ROI kârlılığı, ROAS satış verimliliğini gösterir."],
    ["İyi bir ROAS değeri kaçtır?", "Tek bir doğru değer yoktur; iyi ROAS, kâr marjınıza göre hesaplanan başabaş değerinin üzerinde kalan ve hedeflediğiniz kârı bırakan değerdir. Yüzde 25 marjla başabaş 4, yüzde 50 marjla 2'dir."],
    ["Başabaş ROAS nasıl bulunur?", "Başabaş ROAS, 1'in ondalık olarak yazılmış brüt kâr marjına bölünmesiyle bulunur. Yüzde 35 marjla çalışan bir işletmede 1 ÷ 0,35 ≈ 2,86'dır; bu değerin altındaki ROAS reklamın zarar ettirdiğini gösterir."],
    ["Kâr marjı ROAS hedefini nasıl etkiler?", "Marj düştükçe başabaş ROAS yükselir. Yüzde 10 marjla çalışan bir ürün için reklamın kendini karşılaması 10 kat ROAS gerektirirken yüzde 70 marjlı bir ürün için yaklaşık 1,43 kat yeterlidir."],
    ["Reklam panellerinde ROAS nasıl görülür?", "Dönüşüm izleme kurulduktan sonra reklam panelleri satış değerini kaydeder ve dönüşüm değeri bölü maliyet sütununda ROAS'ı gösterir. Sütunu görünüme eklemeniz ve gönderilen değerin KDV dahil olup olmadığını kontrol etmeniz gerekir."],
    ["Müşteri edinme maliyeti nedir?", "Müşteri edinme maliyeti, bir dönemdeki toplam pazarlama ve satış giderinin aynı dönemde kazanılan yeni müşteri sayısına bölünmesiyle bulunur. Müşteri yaşam boyu değeriyle karşılaştırıldığında edinme harcamasının sürdürülebilir olup olmadığını gösterir."],
    ["ROI negatif olabilir mi?", "Evet. Yatırımdan elde edilen kazanç yatırım tutarından küçükse ROI negatif çıkar ve zarar edildiğini gösterir. ROAS ise ciro negatif olamayacağı için en düşük sıfır olabilir."]
  ],
  tools: ["reklam-getirisi-hesapla", "yatirim-getirisi-hesapla", "musteri-edinme-maliyeti-hesapla", "kar-marji-hesapla"],
  related: ["kar-marji-nasil-hesaplanir", "basabas-noktasi-nedir", "pazaryeri-komisyonu-nasil-hesaplanir"],
  sources: [
    ["Gelir İdaresi Başkanlığı – KDV", "https://www.gib.gov.tr/"]
  ]
};
