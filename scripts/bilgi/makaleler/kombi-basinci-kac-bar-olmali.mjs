export default {
  slug: "kombi-basinci-kac-bar-olmali",
  kategori: "ev",
  tarih: "2026-11-16",
  title: "Kombi Basıncı Kaç Bar Olmalı? Basınç Düşerse veya Yükselirse Ne Yapılır?",
  pageTitle: "Kombi Basıncı Kaç Bar Olmalı? Düşme, Yükselme ve Su Basma",
  description: "Kombi basıncı soğukken 1–1,5 bar, çalışırken 1,5–2 bar civarında olmalıdır; 3 barda emniyet ventili açar. Su basma adımları, düşme nedenleri ve bar–psi çevirisi.",
  keywords: ["kombi basıncı kaç bar olmalı", "kombi basınç düşüyor", "kombi su basıncı", "kombiye su nasıl basılır", "kombi basıncı yükseliyor", "kombi 1,5 bar", "kombi basınç ayarı", "petek havası alınca basınç düşer mi"],
  lead: "Kombili bir kalorifer sisteminde su basıncı, sistem <strong>soğukken yaklaşık 1–1,5 bar</strong>, kombi çalışıp su ısındığında <strong>yaklaşık 1,5–2 bar</strong> olmalıdır. Basınç 1 barın altına düştüğünde kombi verimsiz çalışabilir ya da arıza vererek durabilir; <strong>3 bara</strong> yaklaştığında emniyet ventili açılarak su boşaltır. Doğru değerler cihazdan cihaza değişebileceği için kombinizin kullanım kılavuzunu esas alın. Bu sayfada basıncın neden düştüğünü ya da yükseldiğini, güvenli su basma adımlarını, birim çevirilerini ve servis çağırmanız gereken durumları anlatıyoruz.",
  kisaCevap: [
    "Soğuk sistemde önerilen basınç çoğu kombide 1–1,5 bar aralığıdır; kılavuzdaki değer esastır.",
    "Su ısındıkça genleşir; çalışırken basıncın 1,5–2 bara çıkması normaldir.",
    "1 barın altı düşük basınçtır; kombi \"düşük basınç\" uyarısı verip çalışmayı durdurabilir.",
    "3 bar civarında emniyet ventili açılır ve fazla suyu tahliye eder; bu bir güvenlik önlemidir.",
    "Su basma kombi kapalıyken ve sistem soğukken, dolum musluğu yavaşça açılarak yapılır.",
    "Birimler: 1 bar = 100 kPa ≈ 14,5 psi ≈ 1,02 kg/cm²; 1,5 bar ≈ 21,8 psi."
  ],
  figure: {
    alt: "Kombi manometresi şeması: 0–1 bar düşük, 1–2 bar normal çalışma, 2–2,5 bar üst sınır, 3 bar emniyet ventili; yanında soğukken 1,2 bar, çalışırken 1,8 bar örneği ve bar, kPa, psi çeviri tablosu.",
    caption: "Gösterge ibresinin yeşil bölgede kalması hedeflenir. Soğukken 1,2 bar olan bir sistem, su ısınınca genleşme nedeniyle 1,8 bara çıkabilir. Kesin aralık için kombinizin kılavuzuna bakın.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Kombi basınç göstergesi</text>
  <rect x="40" y="70" width="120" height="44" class="dgs"/>
  <rect x="160" y="70" width="240" height="44" class="oks"/>
  <rect x="400" y="70" width="80" height="44" class="ps"/>
  <rect x="480" y="70" width="120" height="44" class="dgs"/>
  <g class="sm mid b">
    <text x="100" y="97" class="dg">düşük</text>
    <text x="280" y="97" class="ok">normal aralık</text>
    <text x="440" y="97">üst sınır</text>
    <text x="540" y="97" class="dg">tehlike</text>
  </g>
  <g class="sm mid">
    <line x1="40" y1="114" x2="40" y2="126" class="st" fill="none"/><text x="40" y="142">0</text>
    <line x1="160" y1="114" x2="160" y2="126" class="st" fill="none"/><text x="160" y="142">1 bar</text>
    <line x1="280" y1="114" x2="280" y2="126" class="st" fill="none"/><text x="280" y="142">1,5</text>
    <line x1="400" y1="114" x2="400" y2="126" class="st" fill="none"/><text x="400" y="142">2 bar</text>
    <line x1="480" y1="114" x2="480" y2="126" class="st" fill="none"/><text x="480" y="142">2,5</text>
    <line x1="600" y1="114" x2="600" y2="126" class="st" fill="none"/><text x="600" y="142">3 bar</text>
  </g>
  <line x1="600" y1="58" x2="600" y2="126" class="sdg sw" fill="none"/>
  <text x="604" y="56" class="sm b dg">emniyet ventili</text>
  <polygon points="208,66 216,52 200,52" class="p"/>
  <text x="208" y="46" class="sm b mid">soğuk 1,2</text>
  <polygon points="352,66 360,52 344,52" class="a"/>
  <text x="352" y="46" class="sm b mid">çalışırken 1,8</text>
  <rect x="40" y="170" width="300" height="208" rx="10" class="sf sb"/>
  <text x="60" y="198" class="b">Su basma (soğuk sistem)</text>
  <text x="60" y="226" class="sm">1. Kombiyi kapatın, soğumasını bekleyin</text>
  <text x="60" y="250" class="sm">2. Dolum musluğunu yavaşça açın</text>
  <text x="60" y="274" class="sm">3. İbreyi izleyin: 1,2–1,5 bar</text>
  <text x="60" y="298" class="sm">4. Musluğu tam kapatın</text>
  <text x="60" y="322" class="sm">5. Kombiyi açın, basıncı izleyin</text>
  <text x="60" y="356" class="sm mu">Sık tekrar ediyorsa kaçak arayın</text>
  <rect x="360" y="170" width="320" height="208" rx="10" class="ps"/>
  <text x="380" y="198" class="b">Birim çevirisi</text>
  <g class="sm">
    <text x="380" y="226" class="b">bar</text><text x="470" y="226" class="b">kPa</text><text x="560" y="226" class="b">psi</text><text x="630" y="226" class="b">kg/cm²</text>
    <text x="380" y="254">1,0</text><text x="470" y="254">100</text><text x="560" y="254">14,5</text><text x="630" y="254">1,02</text>
    <text x="380" y="280">1,5</text><text x="470" y="280">150</text><text x="560" y="280">21,8</text><text x="630" y="280">1,53</text>
    <text x="380" y="306">2,0</text><text x="470" y="306">200</text><text x="560" y="306">29,0</text><text x="630" y="306">2,04</text>
    <text x="380" y="332">3,0</text><text x="470" y="332">300</text><text x="560" y="332">43,5</text><text x="630" y="332">3,06</text>
  </g>
  <text x="380" y="362" class="sm mu">1 kg/cm² = 0,980665 bar</text>
</svg>`
  },
  sections: [
    {
      h: "Kombi basıncı neyi gösterir?",
      p: [
        "Kombili kalorifer sistemi, kombi, borular ve peteklerden oluşan <strong>kapalı bir su devresidir</strong>. Kombinin ön panelindeki ibreli ya da dijital gösterge (manometre), bu devredeki suyun basıncını gösterir. Basınç, devrede yeterli su olup olmadığının ve suyun peteklere kadar düzgün dolaşıp dolaşamayacağının göstergesidir.",
        "Basınç çok düşükse kombinin pompası suyu yeterince dolaştıramaz, sıcak su ve ısıtma performansı düşer; birçok kombi bu durumda güvenlik için çalışmayı durdurur. Basınç çok yüksekse tesisat ve kombi parçaları zorlanır; sistemdeki emniyet ventili belirli bir değerde açılarak fazla suyu tahliye eder. Basıncın genel fizik mantığını [[bilgi:basinc-nedir-nasil-hesaplanir|basınç nedir]] yazımızda anlattık."
      ]
    },
    {
      h: "Kombi basıncı soğukken ve çalışırken kaç bar olmalı?",
      p: [
        "Konutlarda kullanılan çoğu kombi için yaygın değerler aşağıdaki gibidir. Kombi kılavuzunda farklı bir aralık yazıyorsa, her zaman kılavuzdaki değer esas alınmalıdır."
      ],
      table: {
        head: ["Durum", "Yaygın basınç", "Ne anlama gelir?"],
        rows: [
          ["Sistem soğuk, kombi kapalı", "1,0 – 1,5 bar", "Doldurma için hedeflenen aralık"],
          ["Kombi çalışıyor, su sıcak", "1,5 – 2,0 bar", "Isınan suyun genleşmesiyle normal artış"],
          ["1,0 barın altı", "Düşük", "Su eksik olabilir; kombi uyarı verebilir"],
          ["2,5 bar civarı", "Yüksek", "Neden araştırılmalı"],
          ["3,0 bar civarı", "Emniyet sınırı", "Emniyet ventili açılıp su boşaltır"]
        ],
        caption: "Değerler genel bilgidir; cihaz ve tesisata göre değişebilir."
      },
      after: [
        "Soğukken 1,2 bar olan bir sistemin, kombi çalışıp petekler ısındığında 1,8 bara çıkması normaldir; su ısındıkça genleşir ve kapalı devrede bu genleşme basınç artışı olarak görünür. Kombinin içindeki <strong>genleşme tankı</strong> bu artışı karşılayacak şekilde tasarlanmıştır. Basınç ısınma sırasında 2,5 barı aşıyorsa genleşme tankı ya da fazla dolum nedeniyle bir sorun olabilir.",
        "Dubleks evler ya da kombinin çok altında petekleri olan yapılarda gerekli basınç biraz daha yüksek olabilir; su sütununun her 10 metresi yaklaşık 1 barlık basınca karşılık gelir. Bu tür tesisatlarda doğru değeri yetkili servis belirler."
      ]
    },
    {
      h: "Kombi basıncı neden düşer?",
      p: [
        "Kapalı devrede su kendiliğinden azalmaz; basınç düşüyorsa bir yerden su eksilmiş ya da sistem havası alınmış demektir. En yaygın nedenler şunlardır:"
      ],
      ul: [
        "<strong>Petek havası alınması:</strong> Peteklerden hava tahliye edildiğinde havanın yerine su geçer ve basınç düşer. Bu normaldir; sonrasında su basılır.",
        "<strong>Küçük kaçaklar:</strong> Petek vanaları, rakorlar, petek bağlantıları ya da borulardaki küçük sızıntılar. Damlama izi, pas lekesi ya da duvarda nem işaretlerine bakın.",
        "<strong>Emniyet ventilinden su atması:</strong> Basınç yükseldiğinde ventil su atar; sonra sistem soğuyunca basınç düşmüş görünür.",
        "<strong>Genleşme tankının ön basıncının azalması:</strong> Tank görevini yapamazsa ısınmada basınç yükselir, ventil su atar, soğumada basınç düşer. Bu döngü sık tekrarlanıyorsa servis gerekir.",
        "<strong>Gizli tesisat kaçağı:</strong> Döşeme altından geçen borulardaki kaçaklar fark edilmeden basıncı düşürebilir."
      ],
      after: [
        "Petekler havası alındığı hâlde yeterince ısınmıyorsa sorun basınçtan değil, petek kapasitesinin odaya yetmemesinden kaynaklanıyor olabilir; bunu [[bilgi:petek-dilim-sayisi-nasil-hesaplanir|petek dilim sayısı]] yazımızdaki hesapla kontrol edebilirsiniz."
      ]
    },
    {
      h: "Kombiye su nasıl basılır?",
      ol: [
        "Kombiyi kapatın ve sistemin soğumasını bekleyin. Sıcak sistemde basınç zaten yüksek göründüğü için yanlış ayar yapılır.",
        "Kombinin altında ya da yanında bulunan <strong>dolum musluğunu</strong> (doldurma vanası) bulun. Yerini kılavuzdan öğrenebilirsiniz; bazı modellerde dolum için ayrı bir kol ya da hortum bulunur.",
        "Musluğu <strong>yavaşça</strong> açın ve göstergeyi izleyin. Suyun sisteme girdiği sesi duyabilirsiniz.",
        "İbre <strong>1,2–1,5 bar</strong> aralığına (ya da kılavuzdaki değere) geldiğinde musluğu <strong>tam olarak kapatın</strong>. Musluğun açık kalması basıncın zamanla yükselmesine yol açar.",
        "Kombiyi yeniden çalıştırın, arıza kodunu sıfırlamanız gerekiyorsa kılavuzdaki adımı uygulayın.",
        "Birkaç saat boyunca ve ertesi gün basıncı kontrol edin; çalışırken 2 barı belirgin şekilde aşmamalı, soğukken de hızla düşmemelidir."
      ],
      note: "Kombinin iç kapağını açmayın; gaz, elektrik ve yanma bölümüne yalnızca yetkili servis müdahale etmelidir. Gaz kokusu alırsanız cihazı ve elektrik anahtarlarını kullanmadan pencereleri açın, ortamı terk edin ve 187 doğal gaz acil hattını arayın."
    },
    {
      h: "Basınç 3 barın üzerine çıkarsa ne olur?",
      p: [
        "Kombilerde emniyet ventili genellikle <strong>3 bar</strong> civarında açılacak şekilde ayarlanmıştır. Basınç bu değere ulaştığında ventil suyu tahliye borusundan dışarı atarak devreyi korur. Ventilin arada bir su atması bir sorunun belirtisidir; sürekli damlatıyorsa ventilin kendisi de arızalı olabilir.",
        "Basıncın yükselmesinin başlıca nedenleri şunlardır: dolum musluğunun tam kapanmaması ya da sızdırması, sistemin çok fazla doldurulması, genleşme tankının ön basıncını kaybetmesi ve kombinin sıcak su bölümündeki eşanjörde iç kaçak (şebeke suyu kalorifer devresine geçer). İlk ikisini musluğu kontrol ederek ve gerekirse bir petekten kontrollü su alarak düzeltebilirsiniz; son ikisi servis gerektirir."
      ]
    },
    {
      h: "Mevsim başında ve uzun süre kullanılmayınca basınç kontrolü",
      p: [
        "Yaz aylarında kalorifer devresi uzun süre soğuk kaldığı için basınç biraz düşmüş görünebilir; küçük kaçaklar da bu dönemde fark edilmeden birikir. Isıtma sezonu başlamadan önce kombi kapalıyken göstergeye bakmak, gerekirse su basmak ve ardından peteklerin havasını alıp basıncı yeniden kontrol etmek sezona sorunsuz başlamanızı sağlar.",
        "Uzun süre evden ayrılacaksanız, özellikle don riski olan bölgelerde kombinin donma koruması için açık kalması gerekebilir; bu durumda da basıncın normal aralıkta olduğundan emin olun. Döndüğünüzde göstergeyi ilk iş kontrol edin: belirgin bir düşüş, yokluğunuzda bir kaçak olduğunu gösterebilir. Basıncı ve su basma tarihlerini bir kâğıda not etmek, servisin sorunu teşhis etmesini kolaylaştırır."
      ]
    },
    {
      h: "Bar, psi ve kg/cm² arasında nasıl çevrilir?",
      p: [
        "Kombi göstergeleri çoğunlukla bar gösterir; ancak bazı tesisat ekipmanlarında psi, kPa ya da kg/cm² birimleriyle karşılaşabilirsiniz. Çeviri için kullanılan değerler şunlardır:"
      ],
      formula: "1 bar = 100 kPa = 100.000 Pa\n1 bar ≈ 14,5038 psi\n1 kg/cm² = 0,980665 bar (1 bar ≈ 1,02 kg/cm²)\nÖrnek: 1,5 bar × 14,5038 ≈ 21,76 psi",
      after: [
        "Bar ile kg/cm² arasındaki fark yaklaşık %2'dir; günlük kullanımda ikisi neredeyse aynı kabul edilir. Hızlı çeviri için [[arac:bar-psi-cevir|Bar Psi Çevirici]], [[arac:bar-kpa-cevir|Bar kPa Çevirici]] ve [[arac:kgcm2-bar-cevir|kg/cm² Bar Çevirici]] araçlarını kullanabilirsiniz. Birimlerin karşılaştırmalı anlatımı için [[bilgi:basinc-birimleri-bar-kpa-atm-psi|basınç birimleri]] yazımıza bakın."
      ]
    },
    {
      h: "Kombi kapasitesi basıncı etkiler mi?",
      p: [
        "Kombinin kW cinsinden kapasitesi, evi ne kadar ısıtabileceğini belirler; tesisattaki su basıncını doğrudan belirlemez. Basınç; devredeki su miktarına, suyun sıcaklığına, tesisatın yüksekliğine ve genleşme tankının durumuna bağlıdır. Yine de evine göre küçük seçilmiş bir kombi suyu sürekli yüksek sıcaklıkta çalıştırabileceği için ısınmada basınç dalgalanmaları daha belirgin görülebilir.",
        "Evinize uygun kapasiteyi [[arac:kombi-kapasite-hesapla|Kombi Kapasitesi Hesaplama]] aracıyla tahmin edebilir, kapasite ile doğal gaz faturası ilişkisini [[bilgi:dogalgaz-faturasi-ve-kombi-kapasitesi|doğal gaz faturası ve kombi kapasitesi]] yazımızda okuyabilirsiniz."
      ]
    },
    {
      h: "Ne zaman servis çağırmak gerekir? Sık yapılan hatalar",
      ul: [
        "<strong>Basınç sık düşüyorsa:</strong> Haftada birden fazla su basmanız gerekiyorsa gizli kaçak ya da genleşme tankı sorunu olabilir.",
        "<strong>Basınç sürekli yükseliyorsa:</strong> Dolum musluğu kapalı olduğu hâlde basınç artıyorsa eşanjör kaçağı olasılığı vardır.",
        "<strong>Emniyet ventili su atıyorsa:</strong> Tahliye borusundan düzenli su geliyorsa sistem kontrol edilmelidir.",
        "<strong>Arıza kodu tekrar ediyorsa:</strong> Su basıp sıfırlamaya rağmen aynı kod geliyorsa cihaz içinde bir sorun olabilir.",
        "<strong>Gaz kokusu, yanık kokusu, anormal ses:</strong> Kombiyi kullanmayı bırakın ve yetkili servis ya da 187 doğal gaz acil hattını arayın."
      ],
      after: [
        "Sık yapılan hatalar ise sıcak sistemde su basmak, dolum musluğunu açık bırakmak, basıncı 2 barın üzerine çıkarmak ve petek havası aldıktan sonra basıncı kontrol etmeyi unutmaktır. Yıllık bakımda servisin genleşme tankı ön basıncını da kontrol etmesini isteyin."
      ]
    }
  ],
  faq: [
    ["Kombi basıncı soğukken ve çalışırken kaç bar olmalı?", "Çoğu kombide sistem soğukken 1 ile 1,5 bar, kombi çalışıp su ısındığında 1,5 ile 2 bar aralığı normal kabul edilir. Kesin değer için kombinizin kullanım kılavuzundaki aralığı esas alın."],
    ["Kombi basıncı neden düşer?", "En sık nedenler petek havası alınması, petek vanası veya rakorlardaki küçük kaçaklar, emniyet ventilinin su atması, genleşme tankının ön basıncını kaybetmesi ve gizli tesisat kaçaklarıdır."],
    ["Kombiye su nasıl basılır?", "Kombi kapalıyken ve sistem soğukken dolum musluğu yavaşça açılır, gösterge 1,2 ile 1,5 bara gelince musluk tamamen kapatılır. Ardından kombi çalıştırılır ve basınç birkaç saat izlenir."],
    ["Basınç 3 barın üzerine çıkarsa ne olur?", "Emniyet ventili genellikle 3 bar civarında açılarak fazla suyu tahliye eder. Basıncın bu kadar yükselmesi dolum musluğu, fazla dolum, genleşme tankı ya da eşanjör kaçağı gibi bir soruna işaret eder."],
    ["Bar, psi ve kg/cm² arasında nasıl çevrilir?", "1 bar 100 kilopaskal ve yaklaşık 14,5 psi eder; 1 kg/cm² ise 0,980665 bardır. Örneğin 1,5 bar yaklaşık 21,8 psi ve 1,53 kg/cm² değerine karşılık gelir."],
    ["Petek havası almak basıncı düşürür mü?", "Evet. Peteklerden tahliye edilen havanın yerine sistemdeki su geçtiği için basınç düşer. Hava alma işleminden sonra göstergeyi kontrol edip gerekirse sistem soğukken su basmanız gerekir."],
    ["Basınç sık düşüyorsa hangi kaçaklar kontrol edilir?", "Petek vanaları, petek bağlantı rakorları, kombi altındaki bağlantılar ve emniyet ventili tahliye borusu kontrol edilir. Görünür bir kaçak yoksa gizli tesisat kaçağı veya genleşme tankı için servis çağırın."],
    ["Kombi kapasitesi basıncı etkiler mi?", "Kombi kapasitesi tesisattaki su basıncını doğrudan belirlemez. Basınç su miktarına, sıcaklığa, tesisat yüksekliğine ve genleşme tankına bağlıdır; ancak eve göre küçük seçilmiş kombi dalgalanmayı artırabilir."],
    ["Kombi basıncı düşükken kombi çalışmaya devam eder mi?", "Birçok kombi basınç belirli bir değerin altına indiğinde düşük basınç uyarısı vererek ısıtmayı ve sıcak suyu durdurur. Bazı cihazlar düşük basınçta çalışmayı sürdürse de verim düşer ve pompa zorlanır; basıncı kılavuzdaki aralığa getirmek gerekir."],
    ["Ne zaman servis çağırmak gerekir?", "Haftada birden çok su basmanız gerekiyorsa, basınç musluk kapalıyken yükseliyorsa, emniyet ventili su atıyorsa veya arıza kodu tekrar ediyorsa servis çağırın. Gaz kokusunda 187 doğal gaz acil hattını arayın."]
  ],
  tools: ["bar-psi-cevir", "bar-kpa-cevir", "kgcm2-bar-cevir", "kombi-kapasite-hesapla"],
  related: ["basinc-birimleri-bar-kpa-atm-psi", "dogalgaz-faturasi-ve-kombi-kapasitesi", "petek-dilim-sayisi-nasil-hesaplanir", "basinc-nedir-nasil-hesaplanir"],
  sources: [
    ["Enerji Piyasası Düzenleme Kurumu – Doğal gaz", "https://www.epdk.gov.tr/"],
    ["BIPM – SI basınç birimi paskal", "https://www.bipm.org/en/measurement-units"]
  ],
  uyari: "genel bilgilendirme amaçlıdır; kombinin iç aksamına ve gaz tesisatına yalnızca yetkili servis müdahale etmelidir, gaz kokusunda 187'yi arayın"
};
