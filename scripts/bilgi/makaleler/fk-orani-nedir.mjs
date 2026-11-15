export default {
  slug: "fk-orani-nedir",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "F/K Oranı Nedir, Nasıl Hesaplanır? Fiyat/Kazanç Nasıl Yorumlanır",
  pageTitle: "F/K Oranı Nedir, Nasıl Hesaplanır? Fiyat/Kazanç Yorumu",
  description: "F/K oranı = hisse fiyatı ÷ hisse başına kâr. Piyasa değeri ve net kârla hesap, düşük ve negatif F/K, PD/DD farkı, cari ve ileriye dönük F/K örnekleri.",
  keywords: ["f/k oranı nedir", "fiyat kazanç oranı hesaplama", "f/k oranı kaç olmalı", "pd/dd nedir", "hisse başına kâr", "düşük f/k ne anlama gelir", "negatif f/k", "kazanç verimi"],
  lead: "F/K (fiyat/kazanç) oranı, <strong>bir hissenin fiyatının hisse başına yıllık net kâra bölünmesiyle bulunur</strong> ve yatırımcının şirketin bir liralık yıllık kârı için kaç lira ödediğini gösterir. Fiyatı 60 TL, hisse başına kârı 3 TL olan bir şirketin F/K oranı 20'dir. Aynı sonuç piyasa değerinin yıllık net kâra bölünmesiyle de elde edilir. F/K tek başına \"ucuz\" ya da \"pahalı\" demek değildir; sektör, büyüme beklentisi ve kârın kalıcılığıyla birlikte yorumlanır. Bu yazıda hesaplamayı, yorum kurallarını, PD/DD ile farkını ve sık yapılan hataları örneklerle anlatıyoruz.",
  kisaCevap: [
    "F/K = hisse fiyatı ÷ hisse başına kâr (HBK) = piyasa değeri ÷ yıllık net kâr.",
    "Hisse başına kâr = ana ortaklığa ait yıllık net kâr ÷ toplam pay sayısı.",
    "F/K 20 ise, kâr sabit kalırsa şirketin bugünkü piyasa değeri kadar kârı 20 yılda üretmesi gerekir.",
    "Kazanç verimi F/K'nın tersidir: F/K 20 ise kazanç verimi %5'tir.",
    "Şirket zarardaysa F/K negatif çıkar ve anlamlı bir değerleme ölçütü olmaz.",
    "PD/DD, piyasa değerini özkaynakla; F/K ise kârla karşılaştırır; ikisi farklı soruları cevaplar."
  ],
  figure: {
    alt: "Aynı 60 TL hisse fiyatına sahip üç örnek şirketin F/K oranları: hisse başına kârı 7,50 TL olan şirkette 8, 3 TL olanda 20, zarar eden şirkette negatif ve anlamsız.",
    caption: "Hisse fiyatı aynı olsa da şirketlerin kârına göre F/K çok farklıdır. Çubuk uzunluğu, bir liralık yıllık kâr için ödenen fiyatı gösterir. Zarar eden şirkette F/K hesaplanabilir ama yorumlanamaz. Şirketler örnektir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Aynı fiyat, farklı F/K</text>
  <rect x="40" y="46" width="640" height="56" rx="10" class="ps"/>
  <text x="360" y="72" class="b mid">F/K = Hisse fiyatı ÷ Hisse başına kâr</text>
  <text x="360" y="92" class="sm mid t2">= Piyasa değeri ÷ Yıllık net kâr</text>
  <g>
    <text x="40" y="142" class="b">A şirketi</text><text x="40" y="160" class="sm mu">HBK 7,50 TL</text>
    <rect x="170" y="128" width="120" height="36" rx="4" class="oks"/>
    <text x="300" y="152" class="b">F/K = 60 ÷ 7,50 = 8</text>
    <text x="40" y="212" class="b">B şirketi</text><text x="40" y="230" class="sm mu">HBK 3,00 TL</text>
    <rect x="170" y="198" width="300" height="36" rx="4" class="p"/>
    <text x="480" y="222" class="b">F/K = 60 ÷ 3 = 20</text>
    <text x="40" y="282" class="b">C şirketi</text><text x="40" y="300" class="sm mu">HBK −1,50 TL</text>
    <rect x="170" y="268" width="250" height="36" rx="4" class="dgs"/>
    <text x="295" y="292" class="mid b">F/K = −40 → anlamsız</text>
  </g>
  <line x1="170" y1="118" x2="170" y2="314" class="st" fill="none"/>
  <rect x="40" y="326" width="640" height="60" rx="10" class="sf sb"/>
  <text x="60" y="350" class="sm">Kazanç verimi = 1 ÷ F/K → A: %12,5 · B: %5</text>
  <text x="60" y="372" class="sm t2">Düşük F/K tek başına ucuzluk göstermez; kârın kalıcılığına ve sektöre bakılır.</text>
</svg>`
  },
  sections: [
    {
      h: "F/K oranı nedir?",
      p: [
        "F/K oranı, borsada işlem gören bir şirketin piyasa fiyatını kârıyla ilişkilendiren en yaygın değerleme çarpanıdır. İngilizce kaynaklarda P/E (price to earnings) olarak geçer. Oran, piyasanın şirketin bir liralık yıllık net kârına kaç lira değer biçtiğini gösterir.",
        "Basit bir benzetmeyle: yıllık 100.000 TL net kâr eden bir dükkânı 1.000.000 TL'ye satın alırsanız bu işletmeyi F/K = 10 ile almış olursunuz. Kâr sabit kalırsa ödediğiniz bedeli kârla geri kazanmanız 10 yıl sürer. Bu \"geri dönüş süresi\" yorumu kaba bir yaklaşımdır ama F/K'nın mantığını anlamak için kullanışlıdır.",
        "F/K bir yatırım tavsiyesi ya da al-sat sinyali değildir. Aynı oran bir sektörde yüksek, başka bir sektörde düşük sayılabilir. Oran, şirketleri birbiriyle ve kendi geçmişleriyle karşılaştırmak için bir başlangıç noktasıdır."
      ]
    },
    {
      h: "Fiyat/kazanç oranı nasıl hesaplanır?",
      formula: "Hisse başına kâr (HBK) = ana ortaklığa ait yıllık net kâr ÷ toplam pay sayısı\nF/K = hisse fiyatı ÷ HBK\nF/K = piyasa değeri ÷ ana ortaklığa ait yıllık net kâr\nPiyasa değeri = hisse fiyatı × toplam pay sayısı",
      p: [
        "İki formül aynı sonucu verir, çünkü hem pay hem payda pay sayısıyla çarpılmış ya da bölünmüş olur. Hesapta dikkat edilmesi gereken nokta, net kârın <strong>yıllık</strong> olmasıdır. Şirketler finansal tablolarını üç ayda bir açıklar; bu yüzden genellikle son dört çeyreğin toplam kârı (son 12 ay) kullanılır. Yalnızca bir çeyreğin kârını kullanmak F/K'yı dört kat yüksek gösterir.",
        "Konsolide tablo açıklayan şirketlerde net kârın tamamı değil, <strong>ana ortaklığa ait</strong> kısmı kullanılmalıdır; kontrol gücü olmayan paylara düşen kâr hisse sahiplerine ait değildir. Türkiye'de şirketlerin finansal tabloları Kamuyu Aydınlatma Platformu (KAP) üzerinden yayımlanır."
      ],
      after: [
        "Hesabı [[arac:fiyat-kazanc-orani-hesapla|Fiyat Kazanç Oranı Hesaplama]] aracıyla yapabilirsiniz; araç fiyat ve HBK'dan F/K'yı, kazanç verimini ve büyüme beklentisi girerseniz PEG oranını gösterir."
      ]
    },
    {
      h: "Çözümlü örnekler",
      ol: [
        "<strong>HBK'dan F/K:</strong> Bir şirketin son 12 aylık ana ortaklık net kârı 1,2 milyar TL, pay sayısı 400 milyon. HBK = 1.200.000.000 ÷ 400.000.000 = 3 TL. Hisse fiyatı 60 TL ise F/K = 60 ÷ 3 = 20.",
        "<strong>Piyasa değerinden F/K:</strong> Aynı şirketin piyasa değeri 60 × 400 milyon = 24 milyar TL'dir. F/K = 24.000.000.000 ÷ 1.200.000.000 = 20. İki yol aynı sonucu verir.",
        "<strong>Çeyrek kârlarını yıllıklaştırma:</strong> Son dört çeyrek kârları 250, 300, 280 ve 370 milyon TL ise yıllık kâr 1,2 milyar TL'dir. Yalnızca son çeyreği (370 milyon) dört ile çarpmak 1,48 milyar eder ve F/K'yı 16,2 gösterir; bu, mevsimsellik varsa yanıltıcıdır.",
        "<strong>Kazanç verimi:</strong> F/K 20 ise kazanç verimi 1 ÷ 20 = %5'tir. Bu oran, şirketin piyasa değerine göre yıllık kâr üretme hızını gösterir ve faiz ya da tahvil getirisiyle kaba bir karşılaştırma yapmaya yarar."
      ],
      after: [
        "Örneklerin ortak dersi şudur: F/K hesabında asıl iş, doğru kârı bulmaktır. Fiyat ekranda hazır durur, ama kârın son 12 aya ait olması, ana ortaklık payını göstermesi ve tek seferlik kalemlerden arındırılması sonucu doğrudan değiştirir. Bir şirketin F/K'sını farklı kaynaklarda farklı görmenizin en yaygın nedeni de budur: her kaynak kârı farklı bir dönem ya da tanımla almış olabilir."
      ]
    },
    {
      h: "F/K oranının düşük ya da yüksek olması ne anlama gelir?",
      p: [
        "<strong>Düşük F/K</strong>, piyasanın şirketin kârına görece az değer biçtiğini gösterir. Bunun nedeni şirketin gerçekten değerinin altında fiyatlanması olabileceği gibi, piyasanın kârın düşeceğini, tek seferlik olduğunu ya da riskli olduğunu düşünmesi de olabilir. Örneğin bir varlık satışından gelen tek seferlik kâr, F/K'yı geçici olarak çok düşük gösterir.",
        "<strong>Yüksek F/K</strong>, piyasanın şirketin kârının hızla büyümesini beklediğini gösterebilir. Teknoloji gibi büyüme beklentisi yüksek sektörlerde F/K genellikle daha yüksektir. Ancak beklenti gerçekleşmezse yüksek F/K ile alınan hisse sert düşebilir. Kârı geçici olarak çok azalmış bir şirketin F/K'sı da yüksek görünebilir."
      ],
      table: {
        head: ["Durum", "Olası açıklama", "Ek olarak bakılacak"],
        rows: [
          ["Sektör ortalamasının belirgin altında F/K", "Fiyat düşük kalmış olabilir ya da kâr kalıcı değil", "Kârın kaynağı, tek seferlik gelirler, borçluluk"],
          ["Sektör ortalamasının belirgin üstünde F/K", "Yüksek büyüme beklentisi ya da geçici kâr düşüşü", "Satış ve kâr büyümesi, PEG oranı"],
          ["Negatif F/K", "Şirket son 12 ayda zarar etmiş", "Zararın nedeni, nakit akışı, PD/DD"],
          ["Çok yüksek F/K (ör. 100 ve üzeri)", "Kâr sıfıra yakın", "Faaliyet kârı, FAVÖK, ileriye dönük tahminler"]
        ]
      }
    },
    {
      h: "F/K oranı kaç olmalı? Sektör ortalaması neden önemli?",
      p: [
        "F/K için herkese uyan bir \"doğru\" değer yoktur. Bankalar, sanayi şirketleri, perakende ve teknoloji şirketleri çok farklı kârlılık, büyüme ve risk profillerine sahiptir. Bu yüzden F/K, aynı sektördeki benzer şirketlerle ve şirketin kendi geçmiş F/K aralığıyla karşılaştırıldığında anlam kazanır.",
        "Yüksek enflasyonlu dönemlerde nominal kârlar enflasyon muhasebesi düzeltmeleri, kur farkları ve parasal kazanç ya da kayıplar nedeniyle dalgalı olabilir. Türkiye'de enflasyon muhasebesine geçilen dönemlerde açıklanan net kârlar önceki yıllarla doğrudan karşılaştırılamayabilir. Bu durumda F/K'yı tek başına değil, faaliyet kârı ve [[bilgi:favok-nedir-nasil-hesaplanir|FAVÖK]] gibi göstergelerle birlikte değerlendirmek gerekir.",
        "Büyüme farkını dengelemek için <strong>PEG oranı</strong> kullanılır: PEG = F/K ÷ beklenen yıllık kâr büyümesi (yüzde olarak). F/K'sı 20, beklenen kâr büyümesi %20 olan şirketin PEG'i 1'dir. PEG büyüme tahminine dayandığı için tahminin güvenilirliği kadar anlamlıdır."
      ]
    },
    {
      h: "Negatif F/K ne demek?",
      p: [
        "Şirket son 12 ayda zarar ettiyse hisse başına kâr negatiftir ve F/K formülü negatif bir sayı verir. Örneğin fiyatı 60 TL, HBK'sı −1,50 TL olan bir hissede F/K = −40 çıkar. Bu sayı bir değerleme ölçütü olarak yorumlanamaz; birçok veri kaynağı bu durumda F/K yerine \"a.d.\" (anlamlı değil) yazar.",
        "Zarardaki şirketleri değerlendirmek için satışlar, faaliyet kârı, nakit akışı ve özkaynakla ilgili oranlara bakılır. Özkaynak kârlılığını incelemek için [[arac:ozkaynak-karliligi-hesapla|Özkaynak Kârlılığı Hesaplama]] aracı, zararın geçici mi kalıcı mı olduğunu anlamaya yardımcı olabilir."
      ]
    },
    {
      h: "PD/DD ile F/K farkı nedir?",
      p: [
        "PD/DD (piyasa değeri / defter değeri), şirketin piyasa değerini bilançodaki özkaynakla karşılaştırır. PD/DD 1'in altındaysa piyasa şirkete özkaynağından daha düşük değer biçiyor demektir. F/K ise kârla karşılaştırır. Biri \"varlıklara göre ne kadar ödüyorum\", diğeri \"kâra göre ne kadar ödüyorum\" sorusunu cevaplar."
      ],
      table: {
        head: ["Oran", "Formül", "Neyi gösterir?", "Ne zaman öne çıkar?"],
        rows: [
          ["F/K", "Piyasa değeri ÷ yıllık net kâr", "Bir liralık kâra ödenen fiyat", "Kârı istikrarlı şirketlerde"],
          ["PD/DD", "Piyasa değeri ÷ özkaynak", "Bir liralık özkaynağa ödenen fiyat", "Bankalar, holdingler, zarardaki şirketler"],
          ["Kazanç verimi", "Yıllık net kâr ÷ piyasa değeri", "Fiyata göre kâr getirisi", "Faiz ve tahvil getirisiyle kıyas"],
          ["Temettü verimi", "Hisse başına temettü ÷ fiyat", "Fiyata göre nakit dağıtım", "Düzenli kâr payı dağıtan şirketlerde"]
        ]
      },
      after: [
        "İki oran arasında doğrudan bir bağ da vardır: PD/DD ÷ F/K = net kâr ÷ özkaynak, yani özkaynak kârlılığı (ROE). F/K'sı 10, PD/DD'si 2 olan bir şirketin özkaynak kârlılığı yaklaşık %20'dir. Temettü dağıtımına bakmak isterseniz [[bilgi:temettu-verimi-nedir|temettü verimi]] yazısını ve [[arac:temettu-verimi-hesapla|Temettü Verimi Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Cari F/K ile ileriye dönük F/K farkı",
      p: [
        "<strong>Cari (geçmiş) F/K</strong>, son 12 ayda gerçekleşmiş kârla hesaplanır. Veri kesindir ama geçmişe bakar. <strong>İleriye dönük F/K</strong> ise önümüzdeki 12 ay ya da gelecek yıl için tahmin edilen kârla hesaplanır. Geleceği yansıtır ama tahmine dayalıdır ve tahmin yanılabilir.",
        "Kârı hızla büyüyen bir şirketin ileriye dönük F/K'sı cari F/K'sından düşük çıkar; kârının düşmesi beklenen bir şirkette ise tersi olur. İki değer arasındaki fark, piyasanın kâr beklentisinin yönünü anlamak için faydalıdır. Karşılaştırma yaparken tüm şirketler için aynı türde F/K kullanmaya dikkat edin."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Çeyreklik kârı yıllık sanmak:</strong> Tek çeyreğin kârıyla hesaplanan F/K dört kat yüksek çıkar.",
        "<strong>Toplam net kârı kullanmak:</strong> Konsolide tablolarda ana ortaklık payına düşen kâr kullanılmalıdır.",
        "<strong>Farklı sektörleri kıyaslamak:</strong> Bankanın F/K'sını teknoloji şirketininkiyle karşılaştırmak yanıltıcıdır.",
        "<strong>Tek seferlik kârı göz ardı etmek:</strong> Varlık satışı ya da değerleme kazancı F/K'yı geçici olarak düşürür.",
        "<strong>Düşük F/K'yı tek başına alım nedeni saymak:</strong> F/K bir başlangıç ölçütüdür; borçluluk, nakit akışı ve kârın kalitesiyle birlikte değerlendirilmelidir."
      ]
    }
  ],
  faq: [
    ["F/K oranı nedir?", "F/K oranı, hisse fiyatının hisse başına yıllık net kâra bölünmesiyle bulunan değerleme çarpanıdır. Piyasanın şirketin bir liralık yıllık kârına kaç lira değer biçtiğini gösterir ve şirketleri karşılaştırmak için kullanılır."],
    ["Fiyat/kazanç oranı nasıl hesaplanır?", "Hisse fiyatı hisse başına kâra bölünür ya da piyasa değeri ana ortaklığa ait yıllık net kâra bölünür. Fiyatı 60 TL, hisse başına kârı 3 TL olan şirketin F/K oranı 20'dir."],
    ["Hisse başına kâr nasıl bulunur?", "Ana ortaklığa ait son 12 aylık net kâr toplam pay sayısına bölünür. Örneğin 1,2 milyar TL net kâr ve 400 milyon pay için hisse başına kâr 3 TL'dir; finansal tablolar KAP'ta yayımlanır."],
    ["F/K oranının düşük olması ne anlama gelir?", "Düşük F/K, piyasanın şirketin kârına görece az değer biçtiğini gösterir. Bu, fiyatın düşük kalmasından olabileceği gibi kârın tek seferlik olması ya da düşmesinin beklenmesinden de kaynaklanabilir; tek başına ucuzluk göstergesi değildir."],
    ["Negatif F/K ne demek?", "Negatif F/K, şirketin son 12 ayda zarar ettiğini ve hisse başına kârın eksi olduğunu gösterir. Bu durumda oran değerleme için anlamlı değildir ve satışlar, nakit akışı ya da PD/DD gibi başka göstergelere bakılır."],
    ["PD/DD ile F/K farkı nedir?", "PD/DD piyasa değerini bilançodaki özkaynakla, F/K ise yıllık net kârla karşılaştırır. PD/DD varlıklara göre, F/K kâra göre ödenen fiyatı gösterir; PD/DD'nin F/K'ya bölümü özkaynak kârlılığını verir."],
    ["Sektör F/K ortalaması neden önemlidir?", "Sektörlerin kârlılık, büyüme ve risk yapıları farklı olduğu için F/K değerleri de sektörden sektöre değişir. Bir şirketin F/K'sı ancak benzer şirketlerin ortalaması ve kendi geçmiş aralığıyla kıyaslandığında yorumlanabilir."],
    ["Cari ve ileriye dönük F/K farkı nedir?", "Cari F/K son 12 ayda gerçekleşmiş kârla, ileriye dönük F/K ise gelecek dönem için tahmin edilen kârla hesaplanır. Birincisi kesin ama geçmişe dönük, ikincisi güncel ama tahmine dayalıdır."]
  ],
  tools: ["fiyat-kazanc-orani-hesapla", "ozkaynak-karliligi-hesapla", "temettu-verimi-hesapla"],
  related: ["temettu-verimi-nedir", "favok-nedir-nasil-hesaplanir", "kar-marji-nasil-hesaplanir"],
  sources: [
    ["Kamuyu Aydınlatma Platformu (KAP) – finansal tablolar", "https://www.kap.org.tr/"],
    ["Sermaye Piyasası Kurulu", "https://www.spk.gov.tr/"]
  ],
  uyari: "yatırım tavsiyesi değildir; yatırım kararlarınız için lisanslı bir yatırım danışmanına başvurun"
};
