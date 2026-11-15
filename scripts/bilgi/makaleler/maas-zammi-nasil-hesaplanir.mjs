export default {
  slug: "maas-zammi-nasil-hesaplanir",
  kategori: "calisma",
  tarih: "2026-11-15",
  title: "Maaş Zammı Nasıl Hesaplanır? Zam Oranı ve Enflasyon Farkı Örnekleri",
  pageTitle: "Maaş Zammı Nasıl Hesaplanır? Zam Oranı ve Enflasyon Farkı",
  description: "Zam oranı = (yeni maaş − eski maaş) ÷ eski maaş × 100. Zamlı maaş, enflasyon farkı, reel zam, üst üste iki zam ve refah payı hesabı çözümlü örneklerle.",
  keywords: ["maaş zammı nasıl hesaplanır", "zam oranı hesaplama", "enflasyon farkı nasıl hesaplanır", "yüzde kaç zam aldım", "refah payı nedir", "zamlı maaş hesaplama", "reel zam hesaplama", "iki zam üst üste nasıl hesaplanır"],
  lead: "Maaş zammı oranı, <strong>yeni maaştan eski maaşı çıkarıp farkı eski maaşa bölerek ve 100 ile çarparak</strong> bulunur: 30.000 TL'den 37.500 TL'ye çıkan maaşta zam oranı %25'tir. Zamlı maaşı bulmak içinse eski maaşı (1 + zam oranı) ile çarparsınız. Zammın gerçekten alım gücü kazandırıp kazandırmadığını anlamak için zam oranını aynı dönemin enflasyonuyla yüzdeleri toplayarak ya da çıkararak değil, bölerek karşılaştırmanız gerekir. Bu yazıda zam oranı, reel zam, enflasyon farkı, üst üste iki zam ve refah payı hesaplarını çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Zam oranı (%) = (yeni maaş − eski maaş) ÷ eski maaş × 100.",
    "Zamlı maaş = eski maaş × (1 + zam oranı ÷ 100); %25 zam için eski maaş × 1,25.",
    "Reel değişim = (1 + zam) ÷ (1 + enflasyon) − 1; %25 zam ve %30 enflasyonda alım gücü %3,85 düşer.",
    "Enflasyon farkı = (1 + enflasyon) ÷ (1 + zam) − 1; aynı örnekte maaşın %4 daha artması gerekir.",
    "Üst üste iki zam toplanmaz, çarpılır: %11 ve %7 zam toplam %18,77 eder.",
    "Refah payı, enflasyonu karşılayan zammın üzerine eklenen ve alım gücünü artırmayı amaçlayan ek orandır."
  ],
  figure: {
    alt: "30.000 TL maaşa yüzde 25 zam yapılınca 37.500 TL olur; yüzde 30 enflasyonu karşılamak için 39.000 TL gerekir. Aradaki 1.500 TL, yüzde 4'lük enflasyon farkıdır.",
    caption: "Örnek: maaş %25 artıp 37.500 TL olmuş, ama aynı dönemde fiyatlar %30 arttığı için alım gücünü korumak 39.000 TL'yi gerektiriyor. Eksik kalan 1.500 TL, 37.500 TL'nin %4'üdür; %30 − %25 = %5 hesabı yanlıştır.",
    svg: `<svg viewBox="0 0 720 410" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Zam enflasyonu karşıladı mı?</text>
  <line x1="60" y1="330" x2="680" y2="330" class="st" fill="none"/>
  <rect x="90" y="176" width="130" height="154" class="sf sb"/>
  <text x="155" y="166" class="b mid">30.000 TL</text>
  <text x="155" y="352" class="sm mid">Eski maaş</text>
  <rect x="290" y="137.5" width="130" height="192.5" class="p"/>
  <rect x="290" y="137.5" width="130" height="38.5" class="ps"/>
  <text x="355" y="127" class="b mid">37.500 TL</text>
  <text x="355" y="162" class="sm mid b">+7.500 (%25 zam)</text>
  <text x="355" y="352" class="sm mid">Zamlı maaş</text>
  <rect x="490" y="130" width="130" height="200" class="oks"/>
  <text x="555" y="120" class="b mid">39.000 TL</text>
  <text x="555" y="352" class="sm mid">%30 enflasyonla gereken</text>
  <line x1="290" y1="137.5" x2="640" y2="137.5" class="sdg dash" fill="none"/>
  <line x1="640" y1="130" x2="640" y2="137.5" class="sdg sw" fill="none"/>
  <text x="648" y="100" class="sm dg b">Eksik</text>
  <text x="648" y="116" class="sm dg b">1.500 TL</text>
  <rect x="60" y="368" width="600" height="34" rx="8" class="dgs"/>
  <text x="360" y="390" class="mid b">Enflasyon farkı = 1,30 ÷ 1,25 − 1 = %4 · Reel değişim = 1,25 ÷ 1,30 − 1 = −%3,85</text>
  <text x="155" y="260" class="sm mid t2">100 birim</text>
  <text x="355" y="260" class="sm mid sf">125 birim</text>
  <text x="555" y="260" class="sm mid">130 birim</text>
</svg>`
  },
  sections: [
    {
      h: "Zam oranı nasıl hesaplanır?",
      p: [
        "Zam oranı, maaşınızın eski haline göre yüzde kaç arttığını gösterir. Bunun için iki rakama ihtiyacınız var: zamdan önceki maaş ve zamdan sonraki maaş. İkisinin aynı türde olması önemlidir; brütü brütle, neti netle karşılaştırın. Aksi halde vergi ve prim kesintilerinin etkisi zam gibi görünür."
      ],
      formula: "Zam oranı (%) = (yeni maaş − eski maaş) ÷ eski maaş × 100\nYeni maaş = eski maaş × (1 + zam oranı ÷ 100)\nEski maaş = yeni maaş ÷ (1 + zam oranı ÷ 100)",
      ol: [
        "Farkı bulun: 37.500 − 30.000 = 7.500 TL.",
        "Farkı eski maaşa bölün: 7.500 ÷ 30.000 = 0,25.",
        "100 ile çarpın: 0,25 × 100 = %25 zam.",
        "Ters yönde kontrol edin: 30.000 × 1,25 = 37.500 TL."
      ],
      after: [
        "Paydada her zaman eski maaş bulunur. Yeni maaşa bölmek zam oranını olduğundan düşük gösterir: 7.500 ÷ 37.500 = %20, ki bu yanlıştır. Bu iki oranın farkını [[rehber:yuzde-hesaplama-nasil-yapilir|yüzde hesaplama]] konusunda ayrıntılı bulabilirsiniz; hesabı [[arac:zam-orani-hesapla|Zam Oranı Hesaplama]] aracıyla da doğrulayabilirsiniz."
      ]
    },
    {
      h: "Zamlı maaş hesaplama örnekleri",
      p: [
        "Size zam oranı bildirildiyse yeni maaşınızı bulmak için eski maaşı çarpan ile çarpmanız yeter. Çarpan, 1'e zam oranının ondalık halinin eklenmesiyle bulunur: %15 zam için 1,15, %8,5 zam için 1,085, %40 zam için 1,40."
      ],
      table: {
        head: ["Eski maaş", "Zam oranı", "Çarpan", "Yeni maaş", "Artış tutarı"],
        rows: [
          ["25.000 TL", "%10", "1,10", "27.500 TL", "2.500 TL"],
          ["30.000 TL", "%25", "1,25", "37.500 TL", "7.500 TL"],
          ["42.000 TL", "%17,5", "1,175", "49.350 TL", "7.350 TL"],
          ["55.000 TL", "%8,5", "1,085", "59.675 TL", "4.675 TL"],
          ["80.000 TL", "%30", "1,30", "104.000 TL", "24.000 TL"]
        ],
        caption: "Maaş tutarları örnektir; aynı çarpan mantığı her tutarda geçerlidir."
      },
      after: [
        "Bazı işyerleri zammı yüzde yerine sabit tutar olarak verir, örneğin herkese 5.000 TL. Bu durumda düşük maaşlıların yüzde olarak aldığı zam daha yüksek olur: 25.000 TL'ye 5.000 TL %20, 50.000 TL'ye 5.000 TL ise %10 zam demektir. Kendi oranınızı öğrenmek için sabit tutarı eski maaşınıza bölmeniz yeterlidir."
      ]
    },
    {
      h: "Zam enflasyonun altında kaldı mı? Reel zam hesabı",
      p: [
        "Maaşınızın sayısal olarak artması, daha fazla şey satın alabileceğiniz anlamına gelmez. Aynı dönemde fiyatlar da arttıysa gerçek (reel) değişimi bulmak için zam oranını enflasyona <strong>bölerek</strong> karşılaştırmanız gerekir. Yüzdeleri basitçe çıkarmak küçük oranlarda yaklaşık doğru sonuç verir, yüksek enflasyon dönemlerinde ise belirgin hata yaratır."
      ],
      formula: "Reel değişim = (1 + zam oranı) ÷ (1 + enflasyon oranı) − 1\nÖrnek: 1,25 ÷ 1,30 − 1 = −0,0385 → alım gücü %3,85 azalmış",
      after: [
        "Sonuç pozitifse zammınız enflasyonu geçmiş, negatifse alım gücünüz düşmüştür. Örneğin %40 zam alıp %32 enflasyon yaşadıysanız reel artış 1,40 ÷ 1,32 − 1 = %6,06'dır; basit çıkarma %8 derdi.",
        "Karşılaştırmada doğru dönemi kullanmak kritiktir. Ocak ayında aldığınız zammı, bir önceki zam tarihinizden bu yana geçen sürenin enflasyonuyla karşılaştırmalısınız. Yıllık enflasyon için TÜİK'in açıkladığı tüketici fiyat endeksi (TÜFE) değişimleri kullanılır. Geçmiş bir tutarın bugünkü karşılığını görmek için [[arac:enflasyon-hesapla|Enflasyon Hesaplama]] aracı ve [[bilgi:enflasyona-gore-paranin-degeri|enflasyona göre paranın değeri]] yazısı yardımcı olur."
      ]
    },
    {
      h: "Enflasyon farkı nasıl hesaplanır?",
      p: [
        "Enflasyon farkı, alınan zammın dönem enflasyonunun gerisinde kaldığı durumda alım gücünü eski düzeyine getirmek için maaşa ayrıca yapılması gereken artıştır. Toplu iş sözleşmelerinde ve memur maaşlarında sık geçer. Formül, reel değişim formülünün tersidir."
      ],
      formula: "Enflasyon farkı = (1 + gerçekleşen enflasyon) ÷ (1 + alınan zam) − 1\nFarklı maaş = zamlı maaş × (1 + enflasyon farkı)",
      ol: [
        "Bir çalışanın maaşına altı aylık dönem için %6 zam yapılmış olsun.",
        "Dönem sonunda altı aylık enflasyon %9 olarak gerçekleşmiş olsun.",
        "Enflasyon farkı: 1,09 ÷ 1,06 − 1 = 0,0283, yani %2,83.",
        "40.000 TL'lik maaş zamla 42.400 TL olmuştu; farkla 42.400 × 1,0283 = 43.600 TL olur.",
        "Kontrol: 40.000 × 1,09 = 43.600 TL. Maaş, enflasyonla tam aynı oranda artmış olur."
      ],
      after: [
        "Görüldüğü gibi enflasyon farkı %9 − %6 = %3 değil, %2,83'tür. Fark küçük görünse de yüksek tutarlarda ve uzun dönemlerde birikir. Toplu sözleşmelerde farkın hangi endeksle, hangi ayların değişimiyle ve hangi maaş tabanı üzerinden hesaplanacağı sözleşme metninde yazar; hesabı o metne göre yapın."
      ]
    },
    {
      h: "İki zam üst üste nasıl hesaplanır?",
      p: [
        "Yılda iki kez zam alıyorsanız ya da enflasyon farkı ile yeni dönem zammı aynı anda uygulanıyorsa oranları toplamak yanlış sonuç verir. Çünkü ikinci zam, ilk zamla büyümüş maaşın üzerine yapılır. Doğru yöntem çarpanları çarpmaktır."
      ],
      formula: "Toplam zam = (1 + birinci zam) × (1 + ikinci zam) − 1\nÖrnek: 1,11 × 1,07 − 1 = 0,1877 → %18,77",
      table: {
        head: ["Birinci zam", "İkinci zam", "Yanlış (toplama)", "Doğru (bileşik)"],
        rows: [
          ["%5", "%5", "%10", "%10,25"],
          ["%11", "%7", "%18", "%18,77"],
          ["%15", "%10", "%25", "%26,50"],
          ["%20", "%20", "%40", "%44"],
          ["%25", "%25", "%50", "%56,25"]
        ],
        caption: "Oranlar büyüdükçe toplama ile bileşik hesap arasındaki fark açılır."
      },
      after: [
        "Aynı mantık ters yönde de geçerlidir: önce %20 artıp sonra %20 azalan bir tutar başladığı yere dönmez, 1,20 × 0,80 = 0,96 ile %4 kayıpla biter. Ardışık değişimleri tek tek hesaplamak isterseniz [[arac:yuzde-degisim-hesapla|Yüzde Değişim Hesaplama]] aracı her adımın oranını ve kat sayısını gösterir."
      ]
    },
    {
      h: "Refah payı nedir?",
      p: [
        "Refah payı, enflasyonu karşılayacak zammın üzerine, çalışanın alım gücünü artırmak amacıyla eklenen ek orandır. Örneğin beklenen enflasyon %20 iken %24 zam yapılırsa, aradaki pay refahtır. Refah payı da enflasyon gibi çarpımla hesaplanır: %20 enflasyonun üzerine %3 refah payı, 1,20 × 1,03 − 1 = %23,6 zam demektir.",
        "Refah payı kavramı özellikle toplu iş sözleşmelerinde, emekli ve memur maaş artışlarına ilişkin tartışmalarda kullanılır. Özel sektörde ise genellikle doğrudan zam oranı konuşulur; aldığınız zammın içinde ne kadar refah payı olduğunu yukarıdaki reel değişim formülüyle kendiniz hesaplayabilirsiniz."
      ]
    },
    {
      h: "Zam brüte mi nete mi yapılır?",
      p: [
        "Özel sektörde zam iş sözleşmesine ya da işverenin kararına bağlıdır; sözleşmede ücret brüt yazıyorsa zam da genellikle brüt ücrete yapılır. Bazı işyerleri net ücret üzerinden anlaşır ve zammı nete uygular; bu durumda işveren, artan vergi ve primi de üstlenmiş olur.",
        "Brüte yapılan zammın nete yansıması aynı oranda olmayabilir. Gelir vergisi artan oranlıdır ve kümülatif matrah yıl içinde yükseldikçe üst dilime geçilir. Bu nedenle %20 brüt zam, yılın ilerleyen aylarında nette %20'den az görünebilir. Asgari ücret istisnası da hesabı etkiler. Brüt zammın aylık net etkisini görmek için [[arac:brut-net-maas|Brüt Net Maaş Hesaplama]] aracına zamdan önceki ve sonraki brüt ücreti ayrı ayrı girip net tutarları karşılaştırabilirsiniz."
      ]
    },
    {
      h: "Memur zammı nasıl hesaplanır?",
      p: [
        "Memur maaş artışları, kamu görevlileri toplu sözleşmesiyle (ya da Kamu Görevlileri Hakem Kurulu kararıyla) belirlenen altı aylık zam oranları ve enflasyon farkından oluşur. Her altı aylık dönemin sonunda, o dönemin TÜFE artışı toplu sözleşme zammını aşmışsa aradaki fark enflasyon farkı olarak bir sonraki döneme eklenir.",
        "Hesap yukarıdaki formüllerle yapılır. Örneğin bir dönemin enflasyon farkı %2,83 ve yeni dönemin toplu sözleşme zammı %7,5 ise, toplam artış 1,0283 × 1,075 − 1 = %10,54 olur. Gerçek oranlar her dönem farklı olduğu için güncel değerleri Resmî Gazete'de yayımlanan maaş katsayıları ve Hazine ve Maliye Bakanlığı duyurularından takip edin; maaş kalemlerinin ayrıntısı için [[rehber:memur-maasi-nasil-hesaplanir|memur maaşı rehberine]] bakabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Yeni maaşa bölmek:</strong> Zam oranının paydası eski maaştır; yeni maaşa bölmek oranı küçültür.",
        "<strong>Brüt ile neti karıştırmak:</strong> Eski netinizi yeni brütünüzle karşılaştırmak abartılı bir zam oranı verir.",
        "<strong>Zamları toplamak:</strong> Ardışık zamlar çarpılır; toplama her zaman eksik sonuç verir.",
        "<strong>Enflasyonu çıkararak kıyaslamak:</strong> Reel değişim bölmeyle bulunur; yüksek enflasyonda çıkarma ciddi sapma yaratır.",
        "<strong>Yanlış dönemi seçmek:</strong> Zammınızı son zam tarihinizden bu yana geçen enflasyonla karşılaştırın; takvim yılını ya da farklı bir dönemi kullanmak yanıltır."
      ]
    },
    {
      h: "Zam oranını araçla adım adım hesaplama",
      ol: [
        "Bordronuzdan zamdan önceki ve sonraki brüt (ya da iki net) ücreti not edin; ek ödemeleri ve primleri iki tarafta da aynı şekilde dahil edin ya da çıkarın.",
        "[[arac:zam-orani-hesapla|Zam Oranı Hesaplama]] aracına eski ve yeni maaşı girin; araç zam yüzdesini ve artış tutarını gösterir.",
        "Aynı araca son zam tarihinizden bu yana geçen dönemin enflasyon oranını yazın; reel alım gücü değişimini görün.",
        "Sonuç eksiyse, alım gücünü korumak için gereken enflasyon farkını bu yazıdaki formülle hesaplayın ve ücret görüşmesinde somut rakam olarak kullanın.",
        "Brüt zammın elinize geçen tutara etkisini görmek için iki brüt ücreti brüt-net hesabından geçirin."
      ],
      after: [
        "Araçlar tarayıcınızda çalışır; maaş bilgileriniz hiçbir sunucuya gönderilmez. Ücret görüşmesine hazırlanırken yalnızca yüzdeyi değil, artışın lira karşılığını ve enflasyona göre reel durumunu birlikte göstermek, talebinizi daha anlaşılır kılar."
      ]
    }
  ],
  faq: [
    ["Maaş zammı nasıl hesaplanır?", "Yeni maaştan eski maaş çıkarılır, fark eski maaşa bölünür ve 100 ile çarpılır. Örneğin 30.000 TL'den 37.500 TL'ye çıkan maaşta zam oranı 7.500 ÷ 30.000 × 100 = %25'tir."],
    ["Aldığım zam yüzde kaç, nasıl bulurum?", "Zam tutarını zamdan önceki maaşınıza bölüp 100 ile çarpın. İki maaşın da aynı türde, yani ikisinin de brüt ya da ikisinin de net olmasına dikkat edin; aksi halde oran yanıltıcı çıkar."],
    ["Enflasyon farkı nasıl hesaplanır?", "Enflasyon farkı, bir artı enflasyon oranının bir artı alınan zam oranına bölünmesi ve sonuçtan bir çıkarılmasıyla bulunur. Yüzde 6 zam ve yüzde 9 enflasyonda fark yüzde 3 değil yüzde 2,83'tür."],
    ["Refah payı ne demek?", "Refah payı, enflasyonu karşılayan zammın üzerine alım gücünü artırmak için eklenen ek orandır. Yüzde 20 enflasyona yüzde 3 refah payı eklenirse toplam zam çarpımla yüzde 23,6 olarak hesaplanır."],
    ["Zam brüte mi nete mi yapılır?", "Bu iş sözleşmesine ve işverenin uygulamasına bağlıdır; ücret brüt kararlaştırıldıysa zam da çoğunlukla brüte yapılır. Gelir vergisi dilimleri nedeniyle brüt zammın nete yansıyan oranı daha düşük olabilir."],
    ["Zam enflasyonun altında kaldı mı nasıl anlarım?", "Bir artı zam oranını bir artı enflasyon oranına bölün ve birden çıkarın. Sonuç eksiyse zammınız enflasyonun altında kalmış, alım gücünüz o oranda azalmıştır; artıysa reel artış elde etmişsinizdir."],
    ["İki zam üst üste nasıl hesaplanır?", "İki zamın çarpanları çarpılır ve sonuçtan bir çıkarılır. Yüzde 11 ve ardından yüzde 7 zam, 1,11 × 1,07 − 1 = yüzde 18,77 eder; toplamak yüzde 18 gibi eksik bir sonuç verir."],
    ["Memur zammı nasıl hesaplanır?", "Memur zammı toplu sözleşme zam oranı ile önceki dönemin enflasyon farkının çarpımla birleştirilmesiyle bulunur. Güncel oranlar her altı ayda bir açıklanır ve Resmî Gazete'de yayımlanan katsayılarla maaşa yansır."]
  ],
  tools: ["zam-orani-hesapla", "enflasyon-hesapla", "yuzde-degisim-hesapla", "brut-net-maas"],
  related: ["enflasyona-gore-paranin-degeri", "maas-bordrosu-nasil-okunur", "gelir-vergisi-dilimleri-2026"],
  sources: [
    ["TÜİK – Tüketici Fiyat Endeksi bültenleri", "https://www.tuik.gov.tr/"],
    ["Resmî Gazete", "https://www.resmigazete.gov.tr/"]
  ]
};
