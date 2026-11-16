export default {
  slug: "renk-isimleri-ve-kodlari",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Renk İsimleri ve Kodları: Turkuaz, Bordo, Lacivert Hangi Renk?",
  pageTitle: "Renk İsimleri ve Kodları: Türkçe Renk Adları ve CSS Karşılıkları",
  description: "Turkuaz #40E0D0, lacivert #000080, bordo için yaygın değer #800020. CSS'teki 148 renk adı, Türkçe renk adlarının karşılıkları ve haki, pudra, vizon gibi tuzaklar.",
  keywords: ["renk isimleri", "renk adları listesi", "turkuaz renk kodu", "bordo renk kodu", "lacivert hex kodu", "css renk adları", "renk tonları isimleri", "haki rengi hangi renk"],
  lead: "Renk isimlerinin kesin bir kodu yalnızca web standardında vardır: CSS, <code>turquoise</code> (turkuaz, #40E0D0) ve <code>navy</code> (lacivert, #000080) gibi <strong>148 adlandırılmış renk</strong> tanımlar. Türkçedeki bordo, pudra, vizon, haki, ekru gibi adların ise resmî bir kodu yoktur; sektörde yaygın kullanılan yaklaşık değerleri vardır ve bu değerler satıcıdan satıcıya değişir. Örneğin CSS'teki <code>khaki</code> açık sarımsı bir renkken Türkçede haki denince askerî yeşil anlaşılır. Bu sayfada en çok aranan renk adlarının karşılıklarını, CSS renk adlarının mantığını ve bir rengin adını koddan bulmanın yolunu bulacaksınız.",
  kisaCevap: [
    "Güncel CSS standardında 148 hazır renk adı vardır; gray ve grey gibi bazı adlar aynı rengin iki yazılışıdır.",
    "Turkuaz için CSS'te turquoise (#40E0D0), lacivert için navy (#000080) kullanılır.",
    "Bordonun CSS'te tam karşılığı yoktur; yaygın değer #800020'dir, en yakın CSS adı maroon (#800000).",
    "CSS'teki khaki (#F0E68C) Türkçedeki haki değildir; askerî haki yeşiline olivedrab (#6B8E23) daha yakındır.",
    "Bir HEX kodunun en yakın adını bulmak için iki rengin RGB değerleri arasındaki uzaklık hesaplanır; araçlar bunu otomatik yapar."
  ],
  figure: {
    alt: "Renk adı tuzakları: CSS'te gray, darkgray'den daha koyudur; CSS khaki açık sarı, Türkçe haki koyu yeşildir. Çubuklar renklerin açıklık değerlerini yüzde olarak gösterir.",
    caption: "Renk adları sezgiye her zaman uymaz. Çubuk uzunluğu rengin açıklığını (HSL'deki L değeri) gösterir: CSS'te darkgray (%66), gray'den (%50) daha açıktır; CSS khaki (%75) ile Türkçe haki yeşili (olivedrab, %35) arasında büyük fark vardır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Renk adı tuzakları: açıklık karşılaştırması</text>
  <text x="20" y="62" class="sm mu">Çubuk = açıklık (L), %0 siyah, %100 beyaz</text>
  <line x1="200" y1="72" x2="200" y2="292" class="sb" fill="none"/>
  <line x1="680" y1="72" x2="680" y2="292" class="sb dash" fill="none"/>
  <text x="200" y="308" class="sm mid mu">%0</text><text x="680" y="308" class="sm mid mu">%100</text>
  <text x="190" y="102" class="end b">CSS gray</text>
  <rect x="200" y="84" width="241" height="28" rx="4" class="ps"/><text x="450" y="104" class="sm">%50</text>
  <text x="190" y="146" class="end b">CSS darkgray</text>
  <rect x="200" y="128" width="318" height="28" rx="4" class="dgs"/><text x="527" y="148" class="sm dg b">%66, daha açık</text>
  <text x="190" y="206" class="end b">CSS khaki</text>
  <rect x="200" y="188" width="361" height="28" rx="4" class="dgs"/><text x="570" y="208" class="sm dg b">%75 açık sarı</text>
  <text x="190" y="250" class="end b">CSS olivedrab</text>
  <rect x="200" y="232" width="169" height="28" rx="4" class="oks"/><text x="378" y="252" class="sm ok b">%35, haki yeşil</text>
  <rect x="20" y="324" width="680" height="62" rx="8" class="sf sb"/>
  <rect x="20" y="324" width="8" height="62" class="p"/>
  <text x="44" y="350" class="b">Kural: adı değil, kodu paylaşın</text>
  <text x="44" y="372" class="sm t2">Matbaaya, terziye ya da tasarımcıya renk tarif ederken HEX kodu ya da numune gönderin.</text>
</svg>`
  },
  sections: [
    {
      h: "Renk adı ile renk kodu arasındaki fark",
      p: [
        "Bir renk kodu, rengi sayılarla kesin olarak tarif eder: #40E0D0 kodu her ekranda aynı kırmızı, yeşil ve mavi karışımını ister. Renk adı ise bir dildeki kelimedir; \"turkuaz\" diyen iki kişi farklı tonları düşünebilir. Kodların nasıl yazıldığını ve HEX ile RGB arasında nasıl çevrildiğini [[bilgi:hex-rgb-renk-kodlari-nedir|HEX ve RGB renk kodları]] makalesi ayrıntılı anlatır; bu sayfa ise adların hangi koda karşılık geldiğine odaklanır.",
        "Adlarla kodları buluşturan tek resmî liste web standardındadır. CSS ve HTML'de bir rengi kod yerine adıyla yazabilirsiniz: <code>color: navy</code> ile <code>color: #000080</code> aynı sonucu verir. Bu adlar İngilizcedir ve her birinin tek bir kodu vardır. Moda, boya, mobilya ve tekstil sektörlerinin kullandığı Türkçe adlar ise geleneğe dayanır ve standardı yoktur."
      ]
    },
    {
      h: "CSS'te kaç adet hazır renk adı vardır?",
      p: [
        "Güncel CSS renk standardı 148 renk adı tanımlar. Bu listenin kökü eski bilgisayar sistemlerinin renk tablolarına dayanır; 16 temel ad (black, white, red, navy, teal, olive gibi) HTML'in ilk sürümlerinden gelir. Liste daha sonra genişletildi, en son <code>rebeccapurple</code> (#663399) eklendi. Bazı adlar aynı rengin iki yazılışıdır: gray ve grey, aqua ve cyan, fuchsia ve magenta aynı kodu verir.",
        "Adlar sezgiye her zaman uymaz. En bilinen örnek gri tonlarıdır: <code>darkgray</code> (#A9A9A9), <code>gray</code>'den (#808080) daha açıktır, çünkü iki ad farklı kaynaklardan gelmiştir. Bu yüzden tasarımda renk adı yerine kod kullanmak, beklenmedik sonuçların önüne geçer. Bir adın kodunu ya da bir kodun en yakın adını [[arac:html-renk-adi-bul|HTML Renk Adı Bulucu]] ile tek adımda görebilirsiniz."
      ]
    },
    {
      h: "Turkuaz, bordo ve lacivertin HEX kodu nedir?",
      p: [
        "En çok aranan üç renk adının iki farklı durumu vardır: turkuaz ve lacivertin CSS'te doğrudan karşılığı bulunur, bordonun ise bulunmaz. Aşağıdaki tablo en sık aranan Türkçe renk adlarını, CSS'teki karşılıklarını ve karşılık yoksa sektörde yaygın kullanılan yaklaşık değeri verir."
      ],
      table: {
        head: ["Türkçe ad", "CSS adı ve kodu", "Yaygın kullanılan değer", "Açıklama"],
        rows: [
          ["Turkuaz", "turquoise #40E0D0", "#40E0D0", "Mavi ile yeşil arası, canlı"],
          ["Lacivert", "navy #000080", "#000080 ya da daha koyu #1B2A4A", "Koyu mavi; tekstilde daha siyaha yakın tonlar da lacivert denir"],
          ["Bordo", "Karşılığı yok (yakın: maroon #800000)", "#800020", "Kırmızının morumsu, koyu tonu"],
          ["Fuşya", "fuchsia #FF00FF", "#FF00FF", "Canlı pembe–mor; magenta ile aynı kod"],
          ["Somon", "salmon #FA8072", "#FA8072", "Turuncumsu pembe"],
          ["Mercan", "coral #FF7F50", "#FF7F50", "Turuncu–pembe arası"],
          ["Zeytin yeşili", "olive #808000", "#808000", "Sarımsı koyu yeşil"],
          ["Çivit mavisi", "indigo #4B0082", "#4B0082", "Morumsu koyu mavi"],
          ["Gök mavisi", "skyblue #87CEEB", "#87CEEB", "Açık, ferah mavi"],
          ["Bej", "beige #F5F5DC", "#F5F5DC ya da #E8D9C0", "CSS'teki bej çok açıktır; tekstilde daha koyu tonlar da bej denir"],
          ["Gümüş", "silver #C0C0C0", "#C0C0C0", "Açık gri"],
          ["Altın sarısı", "gold #FFD700", "#FFD700", "Ekranda metalik görünmez, düz sarıdır"]
        ],
        caption: "\"Yaygın kullanılan değer\" sütunu bir standart değil, sık rastlanan örnektir; aynı adı farklı satıcılar farklı tonlar için kullanabilir."
      }
    },
    {
      h: "Pudra, haki, vizon gibi renkler neye karşılık gelir?",
      p: [
        "Moda ve ev tekstilinde kullanılan birçok Türkçe renk adının CSS'te karşılığı yoktur ya da karşılık sanılan İngilizce ad başka bir rengi anlatır. Bu adlar bir ton aralığını tarif eder; aşağıdaki değerler fikir vermek için seçilmiş örneklerdir."
      ],
      table: {
        head: ["Türkçe ad", "Tarif", "Örnek kod", "En yakın CSS adı"],
        rows: [
          ["Pudra", "Çok açık, griye çalan pembe", "#F4C9C4", "mistyrose (#FFE4E1)"],
          ["Haki", "Askerî yeşil, kahveye çalan", "#6B6B3A", "olivedrab (#6B8E23); khaki değil"],
          ["Vizon", "Kahve ile gri arası, sıcak", "#9E8E80", "Doğrudan karşılığı yok"],
          ["Ekru", "Ağartılmamış kumaş rengi, kırık beyaz", "#F3EAD7", "linen (#FAF0E6)"],
          ["Krem", "Sarıya çalan kırık beyaz", "#FFF5D6", "cornsilk (#FFF8DC)"],
          ["Hardal", "Kahveye çalan koyu sarı", "#C9A227", "goldenrod (#DAA520)"],
          ["Kiremit", "Turuncuya çalan kızıl kahve", "#B5542F", "sienna (#A0522D)"],
          ["Lila", "Açık, yumuşak mor", "#C8A2C8", "plum (#DDA0DD)"],
          ["Mürdüm", "Erik rengi, koyu mor", "#6E2A5C", "purple (#800080)"],
          ["Mint (nane yeşili)", "Açık, serin yeşil", "#AAF0D1", "mediumaquamarine (#66CDAA)"]
        ],
        caption: "Örnek kodlar yaklaşık değerdir; ürün satın alırken numune ya da fotoğraf üzerinden karşılaştırma yapın."
      },
      after: [
        "En büyük tuzak haki rengidir. İngilizcedeki \"khaki\" kelimesi açık kum rengini anlatır ve CSS'teki <code>khaki</code> (#F0E68C) neredeyse açık sarıdır. Türkçede haki ise askerî yeşil–kahve tonudur. Bir web sitesinde \"haki\" ürünler için <code>khaki</code> adını kullanmak, beklenenden çok farklı bir renk gösterir."
      ]
    },
    {
      h: "Bir rengin adı HEX kodundan nasıl bulunur?",
      p: [
        "Elinizde bir kod varsa, adını bulmak için o kodu 148 adlandırılmış rengin kodlarıyla karşılaştırırsınız. Tam eşleşme nadirdir; bu yüzden en yakın renk bulunur. Yakınlık, iki rengin kırmızı, yeşil ve mavi değerleri arasındaki farkla ölçülür."
      ],
      formula: "Uzaklık = √[(R1 − R2)² + (G1 − G2)² + (B1 − B2)²]\nÖrnek: #3FDFD0 (63, 223, 208) ile turquoise #40E0D0 (64, 224, 208)\n√(1² + 1² + 0²) = √2 ≈ 1,4 → en yakın ad: turquoise",
      after: [
        "Bu basit formül çoğu durumda iş görür, ancak insan gözü yeşildeki farkı mavideki farktan daha kolay algıladığı için gelişmiş araçlar algısal renk uzaylarında (ör. CIELAB) hesap yapar. Pratikte HTML Renk Adı Bulucu size tam eşleşme olup olmadığını ve en yakın adı gösterir. Kodu önce RGB'ye çevirmeniz gerekiyorsa [[arac:hex-rgb-cevir|HEX RGB Çevirici]] işinizi görür."
      ]
    },
    {
      h: "Fotoğraftaki bir rengin kodu nasıl alınır?",
      ol: [
        "Fotoğrafı [[arac:resimden-renk-paleti|Resimden Renk Paleti]] aracına bırakın; dosya bilgisayarınızdan çıkmaz.",
        "Araç fotoğraftaki 5, 8 ya da 12 baskın rengi HEX, RGB ve HSL kodlarıyla listeler.",
        "Belirli bir noktanın rengini istiyorsanız damlalık aracıyla o noktaya tıklayın.",
        "Kodu kopyalayıp HTML Renk Adı Bulucu'ya yapıştırarak en yakın CSS adını görün.",
        "Bulduğunuz rengin tonlarını ve uyumlu renkleri görmek için [[arac:renk-secici|Renk Seçici]]'yi kullanın."
      ],
      after: [
        "Fotoğraftaki renk, ışığa ve kameranın beyaz dengesine göre gerçek nesnenin renginden farklı olabilir. Gün ışığında, düz bir yüzeyde ve gölgesiz çekilmiş fotoğraflar daha doğru sonuç verir. Bir kumaşın ya da boyanın gerçek rengini belirlemek için fotoğraf yerine fiziksel numune her zaman daha güvenilirdir."
      ]
    },
    {
      h: "Ekranda ve baskıda aynı renk neden farklı görünür?",
      p: [
        "Ekranlar ışık yayarak renk oluşturur ve kırmızı, yeşil, mavi (RGB) karışımı kullanır. Yazıcılar ise kâğıda mürekkep koyarak ışığı emer ve camgöbeği, macenta, sarı, siyah (CMYK) karışımı kullanır. İki sistemin üretebildiği renk aralıkları farklıdır; ekrandaki canlı turkuaz ya da fuşya, baskıda daha soluk çıkabilir.",
        "Ayrıca her ekranın parlaklık, kontrast ve renk ayarı farklıdır; aynı kod iki telefonda bile biraz farklı görünür. Baskı için renk seçiyorsanız matbaanın istediği CMYK değerlerini kullanın ve mümkünse deneme baskısı isteyin. Konunun ayrıntısı [[bilgi:cmyk-ve-rgb-farki-baski|CMYK ve RGB farkı]] makalesinde anlatılıyor."
      ]
    },
    {
      h: "Renk adları farklı markalarda neden farklıdır?",
      p: [
        "Bir tekstil üreticisinin \"vizon\" dediği renk, bir boya üreticisinin \"vizon\" kartelasındaki renkle aynı olmak zorunda değildir. Türkçe renk adları bir standarda bağlı değildir; her üretici kendi kartelasını kendi adlarıyla oluşturur ve adlar pazarlama amacıyla da seçilebilir. Aynı mağazada bile \"lacivert\" etiketli iki ürün farklı tonda olabilir.",
        "Profesyonel işlerde bu belirsizliği gidermek için renk numaralı kartelalar ve kodlar kullanılır. Boya, kumaş ya da baskı siparişinde renk adı yerine üreticinin renk numarasını, ekran işlerinde HEX kodunu, baskı işlerinde CMYK değerini paylaşın. Fotoğrafla renk tarif etmek gerekiyorsa fotoğrafı gün ışığında çekin ve yanına beyaz bir kâğıt koyun; karşı taraf beyaz kâğıda göre rengi daha doğru değerlendirir."
      ]
    },
    {
      h: "Web sitesinde renk adı mı, kod mu kullanılmalı?",
      p: [
        "Hızlı denemeler ve örnek kodlar için renk adları pratiktir: <code>tomato</code> ya da <code>teal</code> yazmak kod hatırlamaktan kolaydır. Kalıcı bir tasarımda ise kod kullanmak daha doğrudur, çünkü kurumsal renkleriniz büyük olasılıkla 148 adın hiçbirine tam denk gelmez ve kod, ekip içinde yanlış anlaşılmayı önler.",
        "Renk seçerken metin ile arka plan arasında yeterli kontrast bırakmayı unutmayın; açık gri üstüne beyaz yazı birçok kişi için okunmaz. Kontrast oranının nasıl ölçüldüğünü [[bilgi:renk-kontrasti-wcag-nedir|renk kontrastı ve WCAG]] makalesinde bulabilirsiniz."
      ]
    }
  ],
  faq: [
    ["En çok kullanılan renk isimleri ve kodları nelerdir?", "Sık kullanılanlar arasında kırmızı #FF0000, lacivert (navy) #000080, turkuaz (turquoise) #40E0D0, bordo için yaygın #800020, gri (gray) #808080, bej (beige) #F5F5DC ve altın sarısı (gold) #FFD700 bulunur."],
    ["Turkuaz, bordo ve lacivertin HEX kodu nedir?", "Turkuazın CSS karşılığı turquoise #40E0D0, lacivertin karşılığı navy #000080'dir. Bordonun CSS'te tam karşılığı yoktur; yaygın kullanılan değer #800020, en yakın CSS adı ise maroon #800000'dir."],
    ["CSS'te kaç adet hazır renk adı vardır?", "Güncel CSS standardında 148 renk adı tanımlıdır. Bunların bir kısmı gray ile grey ya da aqua ile cyan gibi aynı rengin iki farklı yazılışıdır; en son eklenen ad rebeccapurple'dır."],
    ["Bir rengin adı HEX kodundan nasıl bulunur?", "Kod, 148 adlandırılmış rengin kodlarıyla karşılaştırılır ve kırmızı, yeşil, mavi değerleri arasındaki uzaklığı en küçük olan ad seçilir. HTML Renk Adı Bulucu bu hesabı otomatik yapar ve tam eşleşme olup olmadığını gösterir."],
    ["Pudra, haki, vizon gibi renkler neye karşılık gelir?", "Pudra griye çalan açık pembe, haki kahveye çalan askerî yeşil, vizon kahve ile gri arası sıcak bir tondur. Bu adların standart kodu yoktur; satıcıya göre değişen yaklaşık değerlerle tarif edilir."],
    ["Fotoğraftaki bir rengin kodu nasıl alınır?", "Fotoğrafı Resimden Renk Paleti aracına bırakın; baskın renkler HEX, RGB ve HSL kodlarıyla listelenir. Belirli bir noktanın rengi için damlalıkla o noktaya tıklamanız yeterlidir."],
    ["Ekranda ve baskıda aynı renk neden farklı görünür?", "Ekran ışık yayarak RGB, yazıcı mürekkeple ışığı emerek CMYK kullanır ve iki sistemin renk aralığı farklıdır. Ekran ayarları da değiştiği için baskıda deneme çıktısı almak en güvenli yoldur."],
    ["Renk adları farklı markalarda neden farklıdır?", "Türkçe renk adlarının bir standardı yoktur; her üretici kendi kartelasını kendi adlarıyla oluşturur. Bu yüzden sipariş verirken ad yerine renk numarası, HEX ya da CMYK kodu paylaşmak gerekir."],
    ["CSS'teki khaki ile Türkçedeki haki aynı renk mi?", "Hayır. CSS'teki khaki (#F0E68C) açık sarımsı kum rengidir. Türkçede haki denince askerî yeşil anlaşılır; bu renge CSS'teki olivedrab (#6B8E23) daha yakındır."]
  ],
  tools: ["html-renk-adi-bul", "renk-secici", "hex-rgb-cevir", "resimden-renk-paleti"],
  related: ["hex-rgb-renk-kodlari-nedir", "cmyk-ve-rgb-farki-baski", "renk-kontrasti-wcag-nedir"],
  sources: [
    ["W3C – CSS Color Module Level 4, adlandırılmış renkler", "https://www.w3.org/TR/css-color-4/#named-colors"]
  ]
};
