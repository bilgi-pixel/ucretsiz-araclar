export default {
  slug: "gelir-tablosu-nasil-okunur-brut-faaliyet-net-kar",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Gelir Tablosu Nasıl Okunur? Brüt Kâr, Faaliyet Kârı ve Net Kâr Farkı",
  pageTitle: "Gelir Tablosu Nasıl Okunur? Brüt, Faaliyet ve Net Kâr Farkı",
  description: "Gelir tablosu net satıştan başlayıp maliyet, faaliyet giderleri, finansman ve vergi düşülerek net kâra iner. Kalemler, marjlar, FAVÖK farkı ve çözümlü örnek tablo.",
  keywords: ["gelir tablosu nasıl okunur", "brüt kâr nedir", "faaliyet kârı nedir", "net kâr nedir", "kâr zarar tablosu", "esas faaliyet kârı", "favök ile faaliyet kârı farkı", "bilanço ile gelir tablosu farkı"],
  lead: "Gelir tablosu, bir işletmenin belirli bir dönemdeki satışlarından başlayıp giderleri basamak basamak düşerek <strong>net kâra</strong> ulaşan finansal tablodur ve yukarıdan aşağıya okunur. Net satışlardan satışların maliyeti düşülünce <strong>brüt kâr</strong>, ondan faaliyet giderleri düşülünce <strong>faaliyet kârı</strong>, ardından diğer gelir-giderler, finansman giderleri ve vergi düşülünce <strong>net kâr</strong> bulunur. Örneğin 5 milyon TL net satışlı bir şirkette brüt kâr 2 milyon, faaliyet kârı 900 bin, net kâr 525 bin TL olabilir. Bu sayfada her basamağı ve marjların nasıl yorumlanacağını anlatıyoruz.",
  kisaCevap: [
    "Net satışlar = brüt satışlar − satış indirimleri (iade, iskonto).",
    "Brüt kâr = net satışlar − satışların maliyeti; ürünün ya da hizmetin kendisinin kârlılığını gösterir.",
    "Faaliyet kârı = brüt kâr − faaliyet giderleri (pazarlama, genel yönetim, Ar-Ge); esas işin kârıdır.",
    "FAVÖK = faaliyet kârı + amortisman ve itfa payları; nakit üretme gücüne yakın bir göstergedir.",
    "Net kâr = faaliyet kârı ± diğer gelir ve giderler − finansman giderleri − vergi.",
    "Her kârı net satışa bölmek marjı verir: brüt marj, faaliyet kâr marjı ve net kâr marjı."
  ],
  figure: {
    alt: "Gelir tablosunun basamak (şelale) grafiği: 5 milyon TL net satıştan 3 milyon maliyet düşülerek 2 milyon brüt kâr, 1,1 milyon faaliyet gideri düşülerek 900 bin faaliyet kârı, finansman ve diğer kalemlerle 700 bin vergi öncesi kâr, vergi sonrası 525 bin net kâr.",
    caption: "Örnek şirketin gelir tablosu bir şelale gibi okunur: her basamakta bir gider grubu düşülür. Yüzdeler net satışa oranlardır: brüt marj %40, faaliyet kâr marjı %18, net kâr marjı %10,5.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Gelir tablosu şelalesi (bin TL)</text>
  <line x1="40" y1="330" x2="700" y2="330" class="st" fill="none"/>
  <rect x="50" y="80" width="70" height="250" class="p"/>
  <text x="85" y="72" class="b mid">5.000</text>
  <text x="85" y="350" class="sm mid">Net satış</text>
  <rect x="135" y="80" width="70" height="150" class="dgs"/>
  <text x="170" y="160" class="sm mid b">−3.000</text>
  <text x="170" y="350" class="sm mid">Maliyet</text>
  <rect x="220" y="230" width="70" height="100" class="ps"/>
  <text x="255" y="222" class="b mid">2.000</text>
  <text x="255" y="350" class="sm mid">Brüt kâr</text>
  <text x="255" y="368" class="sm mid p b">%40</text>
  <rect x="305" y="230" width="70" height="55" class="dgs"/>
  <text x="340" y="262" class="sm mid b">−1.100</text>
  <text x="340" y="350" class="sm mid">Faal. gid.</text>
  <rect x="390" y="285" width="70" height="45" class="ps"/>
  <text x="425" y="277" class="b mid">900</text>
  <text x="425" y="350" class="sm mid">Faal. kârı</text>
  <text x="425" y="368" class="sm mid p b">%18</text>
  <rect x="475" y="285" width="70" height="10" class="dgs"/>
  <text x="510" y="277" class="sm mid b">−200</text>
  <text x="510" y="350" class="sm mid">Finans ±</text>
  <rect x="560" y="295" width="60" height="35" class="ps"/>
  <text x="590" y="287" class="sm mid b">700</text>
  <text x="590" y="350" class="sm mid">Vergi önc.</text>
  <rect x="632" y="304" width="60" height="26" class="ok"/>
  <text x="662" y="296" class="b mid ok">525</text>
  <text x="662" y="350" class="sm mid">Net kâr</text>
  <text x="662" y="368" class="sm mid ok b">%10,5</text>
</svg>`
  },
  sections: [
    {
      h: "Gelir tablosu nedir, ne anlatır?",
      p: [
        "Gelir tablosu (kâr-zarar tablosu), bir işletmenin belirli bir dönemde, örneğin bir yıl ya da bir çeyrekte, ne kadar gelir elde ettiğini, bu geliri elde etmek için ne kadar harcadığını ve sonunda ne kadar kâr ya da zarar ettiğini gösterir. Bir film şeridi gibidir: dönemin başından sonuna kadar olan akışı özetler.",
        "Tablonun gücü, kârı tek bir sayı olarak değil basamaklar hâlinde göstermesidir. Böylece bir şirketin kârının nereden geldiği ya da nerede eridiği görülür: ürün mü az kâr bırakıyor, yönetim giderleri mi şişkin, yoksa borç faizleri mi kârı yutuyor? Aynı net kâr, çok farklı hikâyelerin sonucu olabilir."
      ]
    },
    {
      h: "Gelir tablosu hangi kalemlerden oluşur?",
      p: [
        "Türkiye'de Tek Düzen Hesap Planı'na göre hazırlanan gelir tablosu harflerle sıralanan gruplardan oluşur. Halka açık şirketlerin TFRS'ye göre yayımladığı tablolarda başlıklar biraz farklı adlandırılsa da mantık aynıdır."
      ],
      table: {
        head: ["Sıra", "Kalem", "İşlem"],
        rows: [
          ["A", "Brüt satışlar", "Dönemin toplam satışları"],
          ["B", "Satış indirimleri", "İadeler, iskontolar düşülür"],
          ["C", "Net satışlar", "= A − B"],
          ["D", "Satışların maliyeti", "Satılan malın ya da hizmetin maliyeti düşülür"],
          ["", "Brüt satış kârı", "= C − D"],
          ["E", "Faaliyet giderleri", "Ar-Ge, pazarlama-satış-dağıtım, genel yönetim giderleri düşülür"],
          ["", "Faaliyet kârı", "= brüt kâr − E"],
          ["F, G", "Diğer faaliyetlerden olağan gelir ve giderler", "Faiz geliri, kur farkı gibi kalemler eklenir ya da düşülür"],
          ["H", "Finansman giderleri", "Kredi faizleri düşülür"],
          ["", "Olağan kâr", "= faaliyet kârı + F − G − H"],
          ["I, J", "Olağandışı gelir ve giderler", "Tek seferlik kalemler"],
          ["", "Dönem kârı (vergi öncesi)", "= olağan kâr + I − J"],
          ["K", "Vergi karşılıkları", "Dönemin vergisi düşülür"],
          ["", "Dönem net kârı", "= dönem kârı − K"]
        ]
      }
    },
    {
      h: "Brüt kâr nasıl hesaplanır?",
      p: [
        "Brüt kâr, satılan ürünün ya da verilen hizmetin doğrudan maliyeti çıkarıldıktan sonra kalan tutardır. Ticaret işletmesinde satışların maliyeti, satılan malların alış maliyetidir; üretim işletmesinde hammadde, doğrudan işçilik ve üretim genel giderlerini içerir. Kira, maaş ve reklam gibi faaliyet giderleri bu aşamada düşülmez."
      ],
      formula: "Brüt kâr = net satışlar − satışların maliyeti\nBrüt kâr marjı = brüt kâr ÷ net satışlar × 100\nÖrnek: (5.000.000 − 3.000.000) ÷ 5.000.000 = %40",
      after: [
        "Brüt marj, fiyatlama gücünün ve maliyet yönetiminin göstergesidir. Brüt marjı düşen bir işletme ya fiyatlarını maliyet artışına yetişecek kadar artıramıyordur ya da daha düşük marjlı ürünlere kaymıştır. Kâr marjı ile kâr oranı (markup) farkı için [[bilgi:kar-marji-nasil-hesaplanir|kâr marjı nasıl hesaplanır]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Faaliyet giderleri nelerdir? Faaliyet kârı nasıl bulunur?",
      p: [
        "Faaliyet giderleri, işletmenin esas faaliyetini sürdürmek için katlandığı ama ürünün maliyetine doğrudan eklenemeyen giderlerdir. Tek Düzen Hesap Planı bunları üç gruba ayırır:"
      ],
      ul: [
        "<strong>Araştırma ve geliştirme giderleri:</strong> yeni ürün, süreç ya da yazılım geliştirme harcamaları.",
        "<strong>Pazarlama, satış ve dağıtım giderleri:</strong> reklam, satış personeli, kargo, pazaryeri komisyonları, depo.",
        "<strong>Genel yönetim giderleri:</strong> yönetim ve muhasebe personeli, ofis kirası, kırtasiye, danışmanlık, yönetim binasının amortismanı."
      ],
      formula: "Faaliyet kârı = brüt kâr − faaliyet giderleri\nFaaliyet kâr marjı = faaliyet kârı ÷ net satışlar × 100\nÖrnek: 2.000.000 − (600.000 + 500.000) = 900.000 TL → %18",
      after: [
        "Faaliyet kârı, şirketin asıl işinden ne kazandığını gösterir; borçlanma yapısından ve vergiden bağımsız olduğu için aynı sektördeki şirketleri karşılaştırmak için daha uygundur. Hesabı net satış, satış maliyeti ve faaliyet giderlerini girerek [[arac:faaliyet-kar-marji-hesapla|Faaliyet Kâr Marjı Hesaplama]] aracında yapabilirsiniz."
      ]
    },
    {
      h: "Faaliyet kârı ile FAVÖK arasındaki fark nedir?",
      p: [
        "FAVÖK (faiz, amortisman ve vergi öncesi kâr), faaliyet kârına amortisman ve itfa paylarının geri eklenmesiyle bulunur. Amortisman, makine, araç ve bina gibi uzun ömürlü varlıkların maliyetinin yıllara yayılmış payıdır; gelir tablosunda gider olarak görünür ama o yıl kasadan nakit çıkışı yaratmaz. FAVÖK bu yüzden işletmenin faaliyetlerinden ürettiği nakde daha yakın bir ölçüdür."
      ],
      formula: "FAVÖK = faaliyet kârı + amortisman ve itfa payları\nÖrnek: 900.000 + 150.000 = 1.050.000 TL → FAVÖK marjı %21",
      after: [
        "Faaliyet kârı ile FAVÖK arasındaki fark büyükse işletme yoğun yatırım gerektiren bir alandadır ve ekipmanlarını yenilemek için ileride önemli harcama yapması gerekecektir. FAVÖK'ün hesaplanma yolları, değerlemede kullanımı ve sınırları [[bilgi:favok-nedir-nasil-hesaplanir|FAVÖK nedir]] yazısında ayrıntılı anlatılıyor; hesap için [[arac:favok-hesapla|FAVÖK Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Net kâra ulaşırken hangi kalemler düşülür? Çözümlü örnek",
      p: [
        "Aşağıdaki tablo, yıllık net satışı 5 milyon TL olan örnek bir şirketin gelir tablosudur. Tutarlar örnektir; vergi satırında genel kurumlar vergisi oranı olan %25 kullanılmıştır, şirketinize uygulanacak oranı ve istisnaları muhasebecinizle doğrulayın."
      ],
      table: {
        head: ["Kalem", "Tutar (TL)", "Net satışa oranı"],
        rows: [
          ["Brüt satışlar", "5.200.000", "—"],
          ["Satış indirimleri (−)", "200.000", "—"],
          ["Net satışlar", "5.000.000", "%100"],
          ["Satışların maliyeti (−)", "3.000.000", "%60"],
          ["<strong>Brüt kâr</strong>", "2.000.000", "%40"],
          ["Pazarlama, satış ve dağıtım giderleri (−)", "600.000", "%12"],
          ["Genel yönetim giderleri (−)", "500.000", "%10"],
          ["<strong>Faaliyet kârı</strong>", "900.000", "%18"],
          ["Diğer faaliyet gelirleri (faiz geliri) (+)", "50.000", "%1"],
          ["Diğer faaliyet giderleri (kur farkı) (−)", "30.000", "%0,6"],
          ["Finansman giderleri (kredi faizi) (−)", "220.000", "%4,4"],
          ["<strong>Vergi öncesi kâr</strong>", "700.000", "%14"],
          ["Vergi karşılığı %25 (−)", "175.000", "%3,5"],
          ["<strong>Net kâr</strong>", "525.000", "%10,5"]
        ],
        caption: "Örnekte faaliyet giderlerinin içinde 150.000 TL amortisman vardır; FAVÖK bu yüzden 1.050.000 TL'dir."
      },
      after: [
        "Bu tablodan çıkan yorum şudur: ürünler iyi bir brüt marj bırakıyor (%40), faaliyet giderleri bunun yarısından fazlasını kullanıyor, finansman gideri ise faaliyet kârının yaklaşık dörtte birini götürüyor. Kâr artırmak isteyen yönetim için en büyük kaldıraç ya maliyet ya da borç yapısıdır. Basit gelir ve gider karşılaştırması için [[arac:kar-zarar-hesapla|Kâr Zarar Hesaplama]] aracı da işinizi görür."
      ]
    },
    {
      h: "Faaliyet kâr marjı nasıl yorumlanır?",
      p: [
        "Marjlar tek başına \"iyi\" ya da \"kötü\" değildir; sektöre, işletmenin büyüklüğüne ve dönemin koşullarına göre yorumlanır. Market ve akaryakıt gibi yüksek hacimli, düşük marjlı işlerde birkaç puanlık faaliyet marjı normal sayılabilirken yazılım ve danışmanlık gibi alanlarda çok daha yüksek marjlar görülür. Anlamlı karşılaştırma üç yoldan yapılır:"
      ],
      ol: [
        "Aynı şirketin geçmiş dönemleriyle karşılaştırma: marj yükseliyor mu düşüyor mu?",
        "Aynı sektördeki benzer büyüklükte şirketlerle karşılaştırma.",
        "Marjlar arasındaki farka bakma: brüt marj sabitken faaliyet marjı düşüyorsa sorun faaliyet giderlerindedir; faaliyet marjı sabitken net marj düşüyorsa sorun finansman ya da vergidedir."
      ],
      after: [
        "Yüksek enflasyon dönemlerinde tarihî maliyetle tutulan stoklar, brüt marjı olduğundan yüksek gösterebilir; enflasyon muhasebesi uygulanan dönemlerde tabloların okunuşu da değişir. Bu dönemlerde yorum yapmadan önce tabloların hangi esasa göre hazırlandığına bakmak gerekir."
      ]
    },
    {
      h: "Bilanço ile gelir tablosu arasındaki fark nedir? ROA ilişkisi",
      p: [
        "Bilanço, işletmenin belirli bir gündeki fotoğrafıdır: varlıkları, borçları ve öz kaynakları gösterir. Gelir tablosu ise bir dönemin filmidir: o dönemde ne kazanıldığını ve harcandığını gösterir. İkisi birbirine bağlıdır; dönemin net kârı, bilançoda öz kaynaklar altında dönem kârı olarak yer alır.",
        "Aktif kârlılık (ROA), bu iki tablonun birleştiği yerdir: gelir tablosundaki net kâr, bilançodaki toplam varlıklara bölünür. Örnek şirketin toplam varlıkları 4.200.000 TL ise ROA = 525.000 ÷ 4.200.000 = %12,5'tir; yani her 100 TL'lik varlık yılda 12,5 TL net kâr üretmiştir. Hesabı [[arac:aktif-karlilik-hesapla|Aktif Kârlılığı (ROA) Hesaplama]] aracında yapabilir, ROE ile farkını [[bilgi:roe-roa-nedir-nasil-hesaplanir|ROE ve ROA nedir]] yazısında okuyabilirsiniz. Kâr eden bir işletmenin neden nakitsiz kalabildiği ise gelir tablosunda değil, nakit akış tablosunda görülür."
      ]
    },
    {
      h: "Küçük işletme basit bir gelir tablosunu nasıl hazırlar?",
      ol: [
        "Dönemi seçin: ay, çeyrek ya da yıl. Tüm tutarlar aynı döneme ait olmalıdır.",
        "Satışları KDV hariç toplayın, iade ve indirimleri düşerek net satışı bulun.",
        "Satılan malların maliyetini hesaplayın: dönem başı stok + alışlar − dönem sonu stok.",
        "Kira, personel, kargo, reklam, muhasebe ücreti ve komisyon gibi giderleri faaliyet giderleri olarak listeleyin.",
        "Kredi faizlerini ayrı bir satıra yazın; faiz faaliyet gideri değildir.",
        "Vergi öncesi kârı ve tahmini vergiyi hesaplayın; kesin vergi için muhasebecinizin hesabını esas alın.",
        "Her kârı net satışa bölüp marjları yazın ve bir önceki dönemle karşılaştırın."
      ],
      after: [
        "En sık yapılan hatalar, satışlara KDV'yi dahil etmek, stok değişimini hesaba katmadan alışları maliyet saymak, işletme sahibinin kendi emeğini hiç gider yazmamak ve kredi anapara ödemesini gider sanmaktır (gider olan yalnızca faizdir). Bu hatalar kârı olduğundan yüksek ya da düşük gösterir ve yanlış fiyat kararlarına yol açar."
      ]
    }
  ],
  faq: [
    ["Gelir tablosu hangi kalemlerden oluşur?", "Brüt satışlar, satış indirimleri, net satışlar, satışların maliyeti, brüt kâr, faaliyet giderleri, faaliyet kârı, diğer faaliyet gelir ve giderleri, finansman giderleri, olağandışı kalemler, vergi ve net kârdan oluşur. Tablo yukarıdan aşağıya okunur."],
    ["Brüt kâr nasıl hesaplanır?", "Net satışlardan satışların maliyeti çıkarılarak bulunur. 5.000.000 TL net satış ve 3.000.000 TL satış maliyeti olan bir işletmenin brüt kârı 2.000.000 TL, brüt kâr marjı %40'tır."],
    ["Faaliyet giderleri nelerdir?", "Araştırma ve geliştirme, pazarlama-satış-dağıtım ve genel yönetim giderleridir. Reklam, satış personeli, kargo, ofis kirası, yönetim maaşları ve danışmanlık ücretleri bu gruba girer; ürünün doğrudan maliyeti ise girmez."],
    ["Faaliyet kârı ile FAVÖK arasındaki fark nedir?", "FAVÖK, faaliyet kârına amortisman ve itfa paylarının eklenmesiyle bulunur. Amortisman nakit çıkışı yaratmadığı için FAVÖK, faaliyetlerin ürettiği nakde faaliyet kârından daha yakın bir göstergedir."],
    ["Net kâra ulaşırken hangi kalemler düşülür?", "Faaliyet kârına diğer faaliyet gelirleri eklenir; diğer faaliyet giderleri, finansman giderleri, olağandışı giderler ve son olarak dönemin vergisi düşülür. Kalan tutar dönem net kârıdır."],
    ["Faaliyet kâr marjı nasıl yorumlanır?", "Faaliyet kârı net satışa bölünerek bulunur ve esas işin her 100 TL satıştan ne kadar kâr bıraktığını gösterir. Yorum için aynı şirketin geçmiş dönemleri ve aynı sektördeki benzer şirketlerle karşılaştırma yapılmalıdır."],
    ["Bilanço ile gelir tablosu arasındaki fark nedir?", "Bilanço belirli bir gündeki varlık, borç ve öz kaynakları gösteren bir fotoğraftır; gelir tablosu ise bir dönem boyunca elde edilen gelir ve katlanılan giderleri gösteren bir filmdir. Dönem net kârı bilançoya öz kaynak olarak geçer."],
    ["Aktif kârlılık (ROA) gelir tablosuyla nasıl ilişkilidir?", "ROA, gelir tablosundaki net kârın bilançodaki toplam varlıklara bölünmesiyle hesaplanır. 525.000 TL net kâr ve 4.200.000 TL toplam varlık için ROA %12,5'tir."],
    ["Küçük işletme basit bir gelir tablosunu nasıl hazırlar?", "KDV hariç satışlardan iade ve indirimler düşülür, stok değişimi dikkate alınarak satılan malın maliyeti bulunur, faaliyet giderleri ve faizler ayrı satırlara yazılır, vergi öncesi kâr ve tahmini vergi hesaplanır."]
  ],
  tools: ["kar-zarar-hesapla", "favok-hesapla", "faaliyet-kar-marji-hesapla", "aktif-karlilik-hesapla"],
  related: ["favok-nedir-nasil-hesaplanir", "kar-marji-nasil-hesaplanir", "roe-roa-nedir-nasil-hesaplanir", "nakit-akis-tablosu-nasil-yapilir"],
  uyari: "örnek tutarlar bilgilendirme amaçlıdır; resmî mali tablolar ve vergi hesabı için mali müşavirinize danışın",
  sources: [
    ["Gelir İdaresi Başkanlığı", "https://www.gib.gov.tr/"],
    ["Kamu Gözetimi, Muhasebe ve Denetim Standartları Kurumu (TFRS)", "https://www.kgk.gov.tr/"]
  ]
};
