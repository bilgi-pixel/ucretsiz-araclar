export default {
  slug: "para-piyasasi-fonu-getirisi-nasil-hesaplanir",
  kategori: "finans",
  tarih: "2026-11-16",
  title: "Para Piyasası Fonu Nedir? Günlük Getiri, Stopaj ve Hesaplama Örneği",
  pageTitle: "Para Piyasası Fonu Getirisi Nasıl Hesaplanır? Stopaj ve Örnek",
  description: "Para piyasası fonu getirisi birim fiyat farkıyla bulunur: (satış fiyatı ÷ alış fiyatı − 1). Günlükten yıllığa çevirme, stopaj, yönetim ücreti, valör ve reel getiri.",
  keywords: ["para piyasası fonu nedir", "para piyasası fonu getirisi", "fon getirisi nasıl hesaplanır", "para piyasası fonu stopaj", "ppf mi mevduat mı", "fon birim fiyatı", "günlük fon getirisi", "fon getirisi yıllık hesaplama"],
  lead: "Para piyasası fonunun getirisi, payı aldığınız ve sattığınız günlerdeki <strong>birim fiyatların oranından</strong> hesaplanır: getiri = satış fiyatı ÷ alış fiyatı − 1. Fon fiyatı yönetim ücreti düşülmüş olarak yayımlanır; satışta kazanç üzerinden stopaj kesilir. Bu sayfada para piyasası fonunun neye yatırım yaptığını, günlük getirinin yıllığa nasıl çevrildiğini, stopajın etkisini, mevduatla karşılaştırmayı ve reel getiri hesabını çözümlü örnekle anlatıyoruz; herhangi bir fonu önermiyoruz.",
  kisaCevap: [
    "Para piyasası fonu, vadesi kısa ve likiditesi yüksek araçlara (repo, ters repo, kısa vadeli borçlanma araçları, mevduat) yatırım yapan yatırım fonudur.",
    "Getiri = (satış birim fiyatı ÷ alış birim fiyatı) − 1; kazanç = pay adedi × (satış fiyatı − alış fiyatı).",
    "Günlük getiri yıllığa basit olarak × 365, bileşik olarak (1 + günlük getiri)<sup>365</sup> − 1 ile çevrilir.",
    "Fonun yayımlanan fiyatı yönetim ücreti ve giderler düşüldükten sonraki fiyattır; getiri bu fiyattan hesaplanır.",
    "Kazanç üzerinden satışta stopaj kesilir; Temmuz 2025'ten sonra alınan paylarda oran %17,5 olarak duyurulmuştur.",
    "Geçmiş getiri gelecekteki getiriyi garanti etmez; fon fiyatı nadiren de olsa düşebilir."
  ],
  figure: {
    alt: "Para piyasası fonu örnek hesap kartı: 100 bin TL ile 1,25 TL fiyattan 80 bin pay, 30 gün sonra 1,2875 TL fiyattan satış, 3 bin TL brüt kazanç, yüzde 17,5 stopajla 525 TL kesinti ve 2.475 TL net kazanç.",
    caption: "Hesap birim fiyat üzerinden yapılır: 30 günde fiyat %3 artmış, stopaj sonrası net getiri %2,475 olmuştur. Bu net getiri aynı hızla bir yıl sürerse bileşik olarak yaklaşık %34,6 eder. Tüm fiyatlar örnektir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Birim fiyatla fon getirisi (örnek)</text>
  <rect x="30" y="56" width="200" height="120" rx="10" class="sf sb"/>
  <text x="130" y="84" class="b mid">Alış (1. gün)</text>
  <text x="130" y="116" class="lg b mid p">1,250000 TL</text>
  <text x="130" y="142" class="sm mid">100.000 TL ÷ 1,25</text>
  <text x="130" y="162" class="sm mid b">= 80.000 pay</text>
  <line x1="235" y1="116" x2="290" y2="116" class="sp sw" fill="none"/>
  <polygon points="290,108 304,116 290,124" class="p"/>
  <text x="267" y="102" class="sm mid mu">30 gün</text>
  <rect x="310" y="56" width="200" height="120" rx="10" class="sf sb"/>
  <text x="410" y="84" class="b mid">Satış (31. gün)</text>
  <text x="410" y="116" class="lg b mid p">1,287500 TL</text>
  <text x="410" y="142" class="sm mid">80.000 × 1,2875</text>
  <text x="410" y="162" class="sm mid b">= 103.000 TL</text>
  <rect x="530" y="56" width="160" height="120" rx="10" class="ps"/>
  <text x="610" y="90" class="b mid">Brüt getiri</text>
  <text x="610" y="126" class="xl mid">%3,00</text>
  <text x="610" y="156" class="sm mid">kazanç 3.000 TL</text>
  <rect x="30" y="200" width="320" height="196" rx="10" class="dgs"/>
  <text x="50" y="228" class="b">Satışta stopaj</text>
  <text x="50" y="258" class="sm">3.000 TL × %17,5 = 525 TL</text>
  <text x="50" y="286" class="sm">Net kazanç: 2.475 TL</text>
  <text x="50" y="314" class="b dg">Net getiri: %2,475</text>
  <text x="50" y="352" class="sm mu">Yönetim ücreti fiyata zaten</text>
  <text x="50" y="372" class="sm mu">yansıtılmış durumdadır</text>
  <rect x="370" y="200" width="320" height="196" rx="10" class="oks"/>
  <text x="390" y="228" class="b">Yıllığa çevirme</text>
  <text x="390" y="258" class="sm">Basit: %3 × 365 ÷ 30 = %36,5</text>
  <text x="390" y="286" class="sm">Bileşik: 1,03^(365/30) − 1 = %43,3</text>
  <text x="390" y="314" class="sm">Net bileşik: yaklaşık %34,6</text>
  <text x="390" y="352" class="sm">Enflasyon %30 ise reel:</text>
  <text x="390" y="374" class="b ok">1,346 ÷ 1,30 − 1 ≈ %3,6</text>
</svg>`
  },
  sections: [
    {
      h: "Para piyasası fonu nedir, neye yatırım yapar?",
      p: [
        "Para piyasası fonu, portföyünü <strong>vadesi kısa ve kolayca nakde çevrilebilen</strong> araçlardan oluşturan yatırım fonudur. Başlıca yatırım araçları ters repo ve repo işlemleri, Takasbank para piyasası işlemleri, kısa vadeli devlet borçlanma araçları, banka bonoları ve vadeli mevduattır. Sermaye Piyasası Kurulu düzenlemeleri, bu fonların portföyündeki araçların vadesini ve portföyün ortalama vadesini kısa tutmasını ister; böylece fiyat dalgalanması düşük kalır.",
        "Fon bir portföy yöneticisi tarafından yönetilir ve yatırımcılar fona <strong>pay</strong> alarak katılır. Her işlem gününde fonun toplam değeri pay sayısına bölünerek <strong>birim pay fiyatı</strong> hesaplanır ve yayımlanır. Faiz gelirleri ayrıca hesabınıza yatmaz; fiyatın her gün biraz yükselmesi şeklinde birikir. Bu nedenle getiri, aldığınız ve sattığınız günlerin fiyat farkından ortaya çıkar."
      ],
      note: "Fonlar mevduat sigortası kapsamında değildir. Para piyasası fonları düşük riskli kabul edilse de piyasa koşullarına bağlı olarak birim fiyatın kısa süreli düştüğü günler yaşanabilir."
    },
    {
      h: "Fon getirisi birim fiyat üzerinden nasıl hesaplanır?",
      p: [
        "Fon getirisini hesaplamak için iki fiyat yeterlidir: alış fiyatı ve satış fiyatı. Yatırdığınız tutar ve pay adedi, getirinin TL karşılığını bulmanızı sağlar."
      ],
      formula: "Pay adedi = yatırılan tutar ÷ alış birim fiyatı\nGetiri oranı = satış birim fiyatı ÷ alış birim fiyatı − 1\nBrüt kazanç = pay adedi × (satış fiyatı − alış fiyatı)\nNet kazanç = brüt kazanç × (1 − stopaj oranı)",
      ol: [
        "100.000 TL ile birim fiyatı 1,250000 TL olan fondan 100.000 ÷ 1,25 = 80.000 pay alıyorsunuz.",
        "30 gün sonra birim fiyat 1,287500 TL'ye çıkmış. Getiri oranı 1,2875 ÷ 1,25 − 1 = 0,03, yani %3'tür.",
        "Satış tutarı 80.000 × 1,2875 = 103.000 TL, brüt kazanç 3.000 TL'dir.",
        "Satışta kazanç üzerinden %17,5 stopaj kesilirse 3.000 × 0,175 = 525 TL vergi kesilir.",
        "Net kazanç 2.475 TL, net getiri 2.475 ÷ 100.000 = %2,475 olur."
      ],
      after: [
        "Gerçek hayatta pay adedi tam sayıya yuvarlanabilir ve fiyatlar altı ondalık basamakla yayımlanır; küçük farklar bu yüzden oluşur. Aynı hesabı farklı tutar ve sürelerle yapmak için [[arac:yatirim-getirisi-hesapla|Yatırım Getirisi Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Günlük getiri yıllık getiriye nasıl çevrilir?",
      p: [
        "Fonlar çoğunlukla günlük, aylık ya da yıl başından bu yana getiri olarak raporlanır. Farklı dönemleri karşılaştırmak için hepsini yıllık orana çevirmek gerekir. İki yöntem vardır: <strong>basit yıllıklandırma</strong> getiriyi gün sayısıyla orantılı büyütür; <strong>bileşik yıllıklandırma</strong> ise getirinin kendi üzerine eklenerek büyüdüğünü varsayar. Fonlar her gün fiyata eklenen getiriyle büyüdüğü için bileşik yöntem fonun gerçek davranışına daha yakındır."
      ],
      formula: "Günlük getiri = (1 + dönem getirisi)<sup>1/gün</sup> − 1\nBasit yıllık = dönem getirisi × 365 ÷ gün\nBileşik yıllık = (1 + dönem getirisi)<sup>365/gün</sup> − 1",
      table: {
        head: ["Gösterge", "Hesap", "Sonuç"],
        rows: [
          ["30 günlük getiri", "1,2875 ÷ 1,25 − 1", "%3,00"],
          ["Ortalama günlük getiri", "1,03<sup>1/30</sup> − 1", "%0,0986"],
          ["Basit yıllık", "%3 × 365 ÷ 30", "%36,5"],
          ["Bileşik yıllık (brüt)", "1,03<sup>365/30</sup> − 1", "%43,3"],
          ["Bileşik yıllık (stopaj sonrası)", "1,02475<sup>365/30</sup> − 1", "%34,6"]
        ],
        caption: "Yıllıklandırma, aynı getiri hızının bir yıl süreceğini varsayar; gerçekte oranlar değişir."
      },
      after: [
        "Basit ve bileşik farkı oranlar yükseldikçe büyür. Bu farkın mantığını [[bilgi:bilesik-faiz-nedir|bileşik faiz]] ve [[bilgi:nominal-ve-efektif-faiz-farki|nominal ve efektif faiz]] yazılarımızda ayrıntılı anlattık. Günlük faiz hesabı için [[arac:gunluk-faiz-hesapla|Günlük Faiz Hesaplama]], bileşik büyüme için [[arac:bilesik-faiz-hesapla|Bileşik Faiz Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Para piyasası fonundan stopaj kesilir mi?",
      p: [
        "Evet. Bireysel yatırımcıların fon satışından elde ettiği kazanç üzerinden, Gelir Vergisi Kanunu'nun geçici 67. maddesi kapsamında <strong>stopaj</strong> kesilir. Kesinti, satış anında aracı kurum ya da banka tarafından yapılır; yatırımcının ayrıca beyanname vermesi gerekmez. Stopaj zarar eden satışlarda uygulanmaz.",
        "Oran, Cumhurbaşkanı kararlarıyla sık değişebilen bir parametredir ve payın <strong>alış tarihine</strong> göre uygulanır. Temmuz 2025'te yatırım fonlarındaki stopaj oranının %17,5'e yükseltildiği duyurulmuş, bu tarihten sonra alınan para piyasası fonu paylarında %17,5 uygulanmıştır. Pay senedi yoğun fonlar gibi bazı fon türlerinde farklı oranlar geçerlidir. Satış öncesi güncel oranı aracı kurumunuzdan ya da resmî duyurulardan kontrol edin."
      ],
      after: [
        "Stopajın genel mantığını ve hangi gelirlerden kesildiğini [[bilgi:stopaj-nedir-hangi-gelirlerden-kesilir|stopaj nedir]] yazımızda bulabilirsiniz."
      ]
    },
    {
      h: "Fon getirisi ile mevduat faizi nasıl karşılaştırılır?",
      p: [
        "Karşılaştırmanın doğru olması için iki ürünün de <strong>aynı süreye ve vergi sonrası net getiriye</strong> çevrilmesi gerekir. Mevduatta faiz oranı yıllık brüt ilan edilir ve vade sonunda stopaj kesilir; fonda ise getiri fiyattan izlenir ve satışta stopaj kesilir. Mevduat stopajı vadeye göre farklı oranlarda uygulanır."
      ],
      ol: [
        "Mevduatın yıllık brüt faiz oranını vade gününe göre dönem getirisine çevirin: yıllık %40, 32 gün için 0,40 × 32 ÷ 365 = %3,51.",
        "Mevduat stopajını düşün: oran %17,5 ise net dönem getirisi 3,51 × 0,825 = %2,89 olur.",
        "Fonun aynı dönemdeki net getirisini hesaplayın; örneğimizde 30 gün için %2,475'tir.",
        "Süreleri eşitleyin: her iki getiriyi de bileşik yıllığa çevirip karşılaştırın.",
        "Likiditeyi ve riski de hesaba katın: mevduatta vade bozma faiz kaybına yol açar, fon ise genellikle her iş günü satılabilir; mevduat sigorta kapsamındadır, fon değildir."
      ],
      after: [
        "Faiz oranlarının yönü politika faiziyle yakından ilişkilidir; bu ilişkiyi [[bilgi:politika-faizi-nedir-mevduat-ve-krediye-etkisi|politika faizi]] yazımızda anlattık. Örnekteki oranlar öğretici amaçlıdır."
      ]
    },
    {
      h: "Fon satışında para kaç günde hesaba geçer? Yönetim ücretinin etkisi",
      p: [
        "Fon payının satış talimatından sonra paranın hesaba geçme süresine <strong>valör</strong> denir. Para piyasası fonlarında valör genellikle kısadır; birçok fonda satış tutarı aynı gün ya da ertesi iş günü hesaba geçer. Talimatın verildiği saat de önemlidir: belirli bir saatten sonra verilen talimatlar ertesi günün fiyatıyla işlem görebilir. Her fonun valör ve fiyat uygulaması izahnamesinde ve yatırımcı bilgi formunda yazar.",
        "Fon toplam gider oranı ve yönetim ücreti, fonun brüt getirisinden <strong>her gün</strong> düşülür ve yayımlanan fiyata yansımış olarak gelir. Bu yüzden yatırımcı ayrıca bir yönetim ücreti ödemez, ama aynı araçlara yatırım yapan iki fondan giderleri yüksek olanın getirisi daha düşük çıkar. Yıllık %2 gider oranı, brüt yıllık getiriden yaklaşık 2 puanlık bir kesinti gibi düşünülebilir."
      ]
    },
    {
      h: "Reel getiri nasıl hesaplanır?",
      p: [
        "Nominal getiri, paranızın TL olarak ne kadar büyüdüğünü gösterir; reel getiri ise enflasyondan arındırılmış satın alma gücü artışıdır. Yıllık net getiri %34,6 ve aynı dönemde yıllık enflasyon %30 ise reel getiri, basit fark olan 4,6 puan değil, Fisher yaklaşımıyla şöyle bulunur:"
      ],
      formula: "Reel getiri = (1 + nominal net getiri) ÷ (1 + enflasyon) − 1\nÖrnek: 1,346 ÷ 1,30 − 1 ≈ 0,036 → yaklaşık %3,6",
      after: [
        "Enflasyon getiriden yüksek olduğunda reel getiri eksiye düşer, yani TL olarak büyüyen birikim aslında satın alma gücü kaybeder. Hesabı kendi verilerinizle yapmak için [[arac:reel-faiz-hesapla|Reel Faiz Hesaplama]] aracını, kavramın ayrıntısı için [[bilgi:reel-faiz-nedir-nasil-hesaplanir|reel faiz]] yazımızı kullanabilirsiniz."
      ]
    },
    {
      h: "Geçmiş getiri gelecek getiriyi garanti eder mi? Sık yapılan hatalar",
      ul: [
        "<strong>Geçmiş getiriyi vaat sanmak:</strong> Fonların geçmiş performansı gelecekteki getiriyi garanti etmez; faiz oranları düştüğünde fon getirisi de düşer.",
        "<strong>Basit ve bileşik yıllığı karıştırmak:</strong> Bir fonun basit, diğerinin bileşik yıllık getirisini karşılaştırmak yanıltıcıdır.",
        "<strong>Stopajı unutmak:</strong> Brüt getiriyle mevduatın net faizini karşılaştırmak fonu olduğundan cazip gösterir.",
        "<strong>Alış tarihini göz ardı etmek:</strong> Stopaj oranı payın alış tarihine göre değişebilir; farklı tarihlerde alınan paylar farklı oranla vergilenebilir.",
        "<strong>Kısa süreli dalgalanmaya panik:</strong> Fiyatın bir gün düşmesi nadir görülse de mümkündür; değerlendirmeyi daha uzun bir dönem üzerinden yapın.",
        "<strong>Saat sınırını kaçırmak:</strong> Satış talimatının hangi günün fiyatıyla işlem göreceği talimat saatine bağlıdır."
      ]
    }
  ],
  faq: [
    ["Para piyasası fonu nedir, neye yatırım yapar?", "Vadesi kısa ve likiditesi yüksek araçlara yatırım yapan bir yatırım fonudur. Portföyde ters repo, Takasbank para piyasası işlemleri, kısa vadeli devlet borçlanma araçları, banka bonoları ve mevduat gibi araçlar bulunur."],
    ["Fon getirisi birim fiyat üzerinden nasıl hesaplanır?", "Getiri oranı, satış günündeki birim fiyatın alış günündeki birim fiyata bölünüp birden çıkarılmasıyla bulunur. TL kazanç ise pay adedinin iki fiyat arasındaki farkla çarpılmasıyla hesaplanır."],
    ["Günlük getiri yıllık getiriye nasıl çevrilir?", "Basit yöntemde dönem getirisi 365'in gün sayısına bölümüyle çarpılır. Bileşik yöntemde bir artı dönem getirisi, 365 bölü gün sayısı üssüne alınıp birden çıkarılır; fonların davranışına bileşik yöntem daha yakındır."],
    ["Para piyasası fonundan stopaj kesilir mi?", "Evet, satışta kazanç üzerinden stopaj kesilir ve beyanname gerekmez. Temmuz 2025'ten sonra alınan paylar için oran yüzde 17,5 olarak duyurulmuştur; oran alış tarihine göre uygulanır ve değişebilir."],
    ["Fon getirisi ile mevduat faizi nasıl karşılaştırılır?", "İki ürünün getirisi aynı süreye ve vergi sonrası net tutara çevrilmelidir. Ardından bileşik yıllık getiriler karşılaştırılır; likidite, vade bozma maliyeti ve mevduat sigortası gibi farklar da göz önünde tutulur."],
    ["Fon satışında para kaç günde hesaba geçer?", "Para piyasası fonlarında satış tutarı genellikle aynı gün ya da ertesi iş günü hesaba geçer. Kesin valör ve talimat saat sınırları her fonun izahnamesinde ve yatırımcı bilgi formunda yazar."],
    ["Fon yönetim ücreti getiriyi nasıl etkiler?", "Yönetim ücreti ve diğer giderler her gün fonun varlığından düşülür ve yayımlanan fiyata yansır. Yatırımcı ayrıca ödeme yapmaz, ancak gider oranı yüksek fonun net getirisi aynı portföye sahip bir fona göre düşük kalır."],
    ["Reel getiri nasıl hesaplanır?", "Bir artı nominal net getiri, bir artı enflasyon oranına bölünür ve birden çıkarılır. Örneğin yüzde 34,6 net getiri ve yüzde 30 enflasyonla reel getiri yaklaşık yüzde 3,6 olur."],
    ["Para piyasası fonu hafta sonu ve tatillerde de getiri sağlar mı?", "Fonun portföyündeki araçlar takvim günü üzerinden faiz işletir, ancak fiyat yalnızca iş günlerinde hesaplanıp yayımlanır. Hafta sonu ve tatil günlerinin getirisi genellikle izleyen ilk iş gününün fiyatına toplu olarak yansır; bu yüzden cuma ile pazartesi arasındaki fiyat farkı daha büyük görünebilir."],
    ["Fonun geçmiş getirisi gelecek getiriyi garanti eder mi?", "Hayır. Geçmiş getiri yalnızca geçmiş piyasa koşullarını yansıtır. Faiz oranları, fon giderleri ve vergi düzenlemeleri değiştikçe gelecekteki getiri farklılaşır; fon fiyatı nadiren de olsa düşebilir."]
  ],
  tools: ["gunluk-faiz-hesapla", "bilesik-faiz-hesapla", "yatirim-getirisi-hesapla", "reel-faiz-hesapla"],
  related: ["bilesik-faiz-nedir", "reel-faiz-nedir-nasil-hesaplanir", "stopaj-nedir-hangi-gelirlerden-kesilir", "politika-faizi-nedir-mevduat-ve-krediye-etkisi"],
  sources: [
    ["Sermaye Piyasası Kurulu – Yatırım fonları", "https://www.spk.gov.tr/"],
    ["Kamuyu Aydınlatma Platformu – Fon bilgileri", "https://www.kap.org.tr/"],
    ["Gelir İdaresi Başkanlığı", "https://www.gib.gov.tr/"]
  ],
  uyari: "yatırım tavsiyesi değildir; fon seçimi ve vergi durumu için izahnameyi okuyun ve gerekirse yetkili bir yatırım danışmanına başvurun"
};
