export default {
  slug: "mouse-dpi-nedir-kac-olmali",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Mouse DPI Nedir, Kaç Olmalı? Oyun ve Ofis İçin DPI, eDPI ve Polling Rate",
  pageTitle: "Mouse DPI Nedir, Kaç Olmalı? Oyun, Ofis, eDPI ve Polling Rate",
  description: "Fare DPI değeri nedir, oyun ve ofis için kaç DPI uygun? Yüksek DPI daha mı iyi, eDPI ve cm/360 hesabı, polling rate (Hz), ekran çözünürlüğü ve çift tıklama testi.",
  keywords: ["mouse dpi nedir", "dpi kaç olmalı", "oyun için dpi", "polling rate nedir", "edpi hesaplama", "fare hassasiyeti", "mouse testi", "dpi cpi farkı"],
  lead: "Mouse DPI (inç başına nokta), fareyi 1 inç (2,54 cm) hareket ettirdiğinizde sensörün bilgisayara kaç birimlik hareket bildirdiğini gösterir; 800 DPI'lık fare 1 inçte 800 birim gönderir. Ofis kullanımında 1080p ekranda 800–1.600, 2K ve 4K ekranlarda 1.600–3.200 DPI rahat bir başlangıçtır; nişan almaya dayalı oyunlarda ise çoğu oyuncu 400–1.600 DPI aralığını düşük oyun içi hassasiyetle birlikte kullanır. Yüksek DPI tek başına daha iyi demek değildir. Bu sayfada eDPI hesabını, polling rate'i, ekran çözünürlüğünün etkisini ve farenizi nasıl test edeceğinizi bulacaksınız.",
  kisaCevap: [
    "DPI ya da CPI, farenin 1 inç (2,54 cm) harekette bildirdiği sayımdır; ikisi pratikte aynı şeyi anlatır.",
    "Ofis için başlangıç: 1080p ekranda 800–1.600 DPI, 4K ekranda 1.600–3.200 DPI.",
    "Oyunda belirleyici olan eDPI'dır: eDPI = DPI × oyun içi hassasiyet. 800 DPI × 0,5 = 400 eDPI.",
    "Yüksek DPI daha hassas değil, daha hızlıdır; çok yüksek değerler titreme ve isabet kaybı getirebilir.",
    "Polling rate, farenin saniyede kaç kez rapor verdiğidir: 125 Hz = 8 ms, 500 Hz = 2 ms, 1.000 Hz = 1 ms.",
    "Ekranın genişliğini geçmek için gereken mesafe = ekran genişliği (piksel) ÷ DPI inç; 1.920 piksel 1.600 DPI'da 3,05 cm."
  ],
  figure: {
    alt: "Farklı DPI değerlerinde 1920 piksellik ekranı soldan sağa geçmek için gereken fare hareketi: 400 DPI 12,2 cm, 800 DPI 6,1 cm, 1600 DPI 3,05 cm, 3200 DPI 1,5 cm.",
    caption: "Windows işaretçi hızı varsayılan (1:1) ve hızlandırma kapalıyken 1.920 piksellik ekranı geçmek için gereken masa mesafesi. DPI iki katına çıktıkça mesafe yarıya iner.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">1.920 piksel ekranı geçmek için fare kaç cm gitmeli?</text>
  <text x="20" y="66" class="sm t2">Hesap: 1.920 ÷ DPI = inç · inç × 2,54 = cm</text>
  <g>
    <text x="110" y="112" class="b end">400 DPI</text>
    <rect x="124" y="94" width="488" height="26" rx="4" class="p"/>
    <text x="622" y="113" class="b">12,19 cm</text>
    <text x="110" y="166" class="b end">800 DPI</text>
    <rect x="124" y="148" width="244" height="26" rx="4" class="ps"/>
    <text x="378" y="167" class="b">6,10 cm</text>
    <text x="110" y="220" class="b end">1.600 DPI</text>
    <rect x="124" y="202" width="122" height="26" rx="4" class="oks"/>
    <text x="256" y="221" class="b">3,05 cm</text>
    <text x="110" y="274" class="b end">3.200 DPI</text>
    <rect x="124" y="256" width="61" height="26" rx="4" class="sf sb"/>
    <text x="195" y="275" class="b">1,52 cm</text>
  </g>
  <line x1="124" y1="84" x2="124" y2="292" class="st" fill="none"/>
  <rect x="20" y="310" width="330" height="76" rx="8" class="sf sb"/>
  <text x="36" y="334" class="b">Oyunda: eDPI = DPI × hassasiyet</text>
  <text x="36" y="356" class="sm">800 × 0,5 = 400 eDPI</text>
  <text x="36" y="376" class="sm">1.600 × 0,25 = 400 eDPI (aynı his)</text>
  <rect x="370" y="310" width="330" height="76" rx="8" class="sf sb"/>
  <text x="386" y="334" class="b">Polling rate → rapor aralığı</text>
  <text x="386" y="356" class="sm">125 Hz = 8 ms · 500 Hz = 2 ms</text>
  <text x="386" y="376" class="sm">1.000 Hz = 1 ms</text>
</svg>`
  },
  sections: [
    {
      h: "Fare (mouse) DPI değeri nedir?",
      p: [
        "Optik ya da lazer fare, altındaki yüzeyin saniyede binlerce küçük görüntüsünü çekip ardışık görüntüler arasındaki kaymayı hesaplar. Bu hareket bilgisayara \"sayım\" (count) olarak bildirilir. <strong>DPI</strong> (dots per inch, inç başına nokta) ya da daha doğru adıyla <strong>CPI</strong> (counts per inch, inç başına sayım), fare 1 inç yani 2,54 cm ilerlediğinde kaç sayım gönderildiğini gösterir.",
        "İşletim sisteminde işaretçi hızı varsayılan değerdeyse ve hızlandırma kapalıysa, her sayım imleci yaklaşık bir piksel kaydırır. Bu durumda 800 DPI'lık bir fareyi 1 inç kaydırdığınızda imleç 800 piksel, 1.600 DPI'da 1.600 piksel ilerler. Yani DPI, fareyi ne kadar hareket ettirmeniz gerektiğini belirleyen temel ayardır.",
        "DPI kelimesi yazıcı ve baskıda da kullanılır ama orada anlamı farklıdır: inç başına basılan nokta sayısıdır. Baskıdaki DPI için [[bilgi:dpi-ve-cozunurluk-nedir|DPI ve çözünürlük yazısına]] bakabilirsiniz; fare DPI'ı bir hassasiyet ölçüsüdür, görüntü kalitesiyle ilgisi yoktur."
      ]
    },
    {
      h: "DPI ile CPI aynı şey midir?",
      p: [
        "Teknik olarak farenin ölçtüğü şey CPI'dır, çünkü fare nokta basmaz, hareket sayar. Ancak \"DPI\" ifadesi pazarlamada yerleşmiş olduğu için kutularda, sürücü yazılımlarında ve ayar menülerinde çoğunlukla DPI yazar. Günlük kullanımda iki terimi aynı anlamda kullanabilirsiniz.",
        "Dikkat edilmesi gereken nokta, kutuda yazan değerin farenin ulaşabildiği <strong>en yüksek</strong> değer olmasıdır. Bir farenin 26.000 DPI'a çıkabilmesi, o değerde kullanılması gerektiği anlamına gelmez. Sensörlerin çoğu düşük ve orta değerlerde en temiz izlemeyi verir."
      ]
    },
    {
      h: "Ekran çözünürlüğü DPI seçimini nasıl etkiler?",
      p: [
        "İmleç piksel piksel hareket ettiği için ekranınızda ne kadar çok piksel varsa ekranı geçmek için o kadar çok sayım gerekir. Aynı DPI ayarı 1080p ekranda rahatken 4K ekranda imleci yavaş hissettirebilir."
      ],
      formula: "Ekranı geçmek için fare hareketi (cm) = ekran genişliği (piksel) ÷ DPI × 2,54\n1.920 piksel, 800 DPI  → 1.920 ÷ 800 = 2,4 inç × 2,54 = 6,10 cm\n3.840 piksel, 800 DPI  → 3.840 ÷ 800 = 4,8 inç × 2,54 = 12,19 cm\n3.840 piksel, 1.600 DPI → 2,4 inç = 6,10 cm (1080p'deki 800 DPI hissi)",
      table: {
        head: ["Ekran genişliği", "Örnek çözünürlük", "Ofis için önerilen başlangıç", "Ekranı geçme mesafesi"],
        rows: [
          ["1.366 piksel", "HD dizüstü", "800 DPI", "4,34 cm"],
          ["1.920 piksel", "Full HD (1080p)", "800–1.600 DPI", "6,10–3,05 cm"],
          ["2.560 piksel", "QHD (1440p)", "1.200–1.600 DPI", "5,42–4,06 cm"],
          ["3.840 piksel", "4K (2160p)", "1.600–3.200 DPI", "6,10–3,05 cm"]
        ],
        caption: "Mesafeler işaretçi hızı varsayılan ve hızlandırma kapalıyken geçerlidir. Ölçekleme (örneğin 4K'da %150) imleç hızını değiştirmez, ama simgeler büyüdüğü için hedefler kolaylaşır."
      },
      after: [
        "Ekranınızın gerçek çözünürlüğünü ve tarayıcıdaki görünüm alanını [[arac:ekran-cozunurlugu|Ekran Çözünürlüğüm Kaç]] aracıyla öğrenebilirsiniz. Çözünürlük adlarının ne anlama geldiği [[bilgi:4k-kac-piksel-cozunurluk-turleri|4K kaç piksel yazısında]] anlatılır."
      ]
    },
    {
      h: "Oyun ve ofis için kaç DPI uygundur?",
      p: [
        "Doğru DPI kişisel bir tercihtir; masanızın genişliği, fareyi bilekle mi kolla mı oynattığınız ve oyun türü belirleyicidir. Aşağıdaki aralıklar deneme için başlangıç noktasıdır."
      ],
      ul: [
        "<strong>Ofis ve günlük kullanım:</strong> Tabloda verilen değerlerle başlayın. Hedef, ekranı bileğinizi rahatça çevirerek, fareyi kaldırmadan geçebilmektir.",
        "<strong>Nişan almaya dayalı oyunlar:</strong> Hassas, küçük düzeltmeler önemli olduğu için 400–1.600 DPI ile düşük oyun içi hassasiyet yaygındır. Bu oyuncular fareyi geniş bir mat üzerinde kolla oynatır.",
        "<strong>Strateji ve rol yapma oyunları:</strong> İmleç kullanımı ofise benzer; 1.200–2.400 DPI ile ekranın kenarlarına hızlı ulaşmak rahat olur.",
        "<strong>Grafik ve fotoğraf düzenleme:</strong> Piksel düzeyinde seçim yapıldığı için biraz daha düşük DPI ya da yavaşlatma tuşu (sniper) işe yarar.",
        "<strong>Küçük masa ya da dizüstü kucakta kullanım:</strong> Alan kısıtlıysa DPI'ı bir kademe artırmak fareyi kaldırma ihtiyacını azaltır."
      ],
      after: [
        "Pratik bir yöntem: masaüstünde ekranın sol kenarından sağ kenarına imleci bir hareketle götürün. Fareyi kaldırmak zorunda kalıyorsanız DPI düşüktür; küçük simgelere tıklarken hedefi kaçırıyorsanız yüksektir."
      ]
    },
    {
      h: "Yüksek DPI daha iyi demek midir?",
      p: [
        "Hayır. Yüksek DPI imleci hızlandırır ama tek başına isabeti artırmaz. Sensör çok yüksek değerlerde elinizin doğal titremesini de büyütür; imleç küçük kıpırtılarla oynar. Ayrıca bazı sensörler belirli bir değerin üzerinde yazılımla ara değer üretir (enterpolasyon), bu da hareketi daha az kararlı yapabilir.",
        "Öte yandan çok düşük DPI ile işletim sisteminin işaretçi hızını yükseltmek de iyi bir çözüm değildir. Örneğin 400 DPI ile Windows işaretçi hızını en üste almak, her sayımın birden fazla piksel atlamasına yol açar ve bazı pikselleri hiç seçemezsiniz. Daha temiz sonuç için hız ayarını varsayılanda (1:1) bırakıp DPI'ı fare yazılımından ya da düğmesinden değiştirin.",
        "<strong>İşaretçi hassasiyetini artır</strong> (fare hızlandırma) seçeneği, fareyi hızlı oynattığınızda imleci orantısız biçimde daha uzağa götürür. Ofiste rahat olabilir, ama nişan alınan oyunlarda aynı hareketin her seferinde aynı sonucu vermemesine neden olduğu için genellikle kapatılır."
      ]
    },
    {
      h: "eDPI nasıl hesaplanır? cm/360 ile karşılaştırma",
      p: [
        "Oyunlarda imleç yerine kamera döner ve oyunun kendi hassasiyet ayarı DPI ile çarpılır. Bu yüzden iki oyuncunun ayarını karşılaştırmak için <strong>eDPI</strong> (etkin DPI) kullanılır."
      ],
      formula: "eDPI = DPI × oyun içi hassasiyet\nÖrnek 1: 800 DPI × 0,5 = 400 eDPI\nÖrnek 2: 1.600 DPI × 0,25 = 400 eDPI → iki oyuncu aynı dönüş hızını hisseder\n\ncm/360 = 360 ÷ (eDPI × açı katsayısı) × 2,54\nAçı katsayısı 0,022°/sayım olan bir oyunda: 360 ÷ (400 × 0,022) × 2,54 ≈ 103,9 cm",
      after: [
        "eDPI yalnızca aynı oyunun ayarlarını karşılaştırırken anlamlıdır, çünkü her oyunun hassasiyet ölçeği farklıdır. Farklı oyunlar arasında aynı hissi korumak için <strong>cm/360</strong>, yani karakterin tam bir tur dönmesi için fareyi kaç cm kaydırmanız gerektiği daha evrensel bir ölçüdür. Açı katsayısı oyundan oyuna değişir; oyununuzun değerini kendi ayar belgelerinden öğrenin.",
        "DPI'ı değiştirdiğinizde aynı hissi korumak için oyun içi hassasiyeti ters oranda değiştirin: 800'den 1.600 DPI'a geçtiyseniz hassasiyeti yarıya indirin. eDPI aynı kalır, ama yüksek DPI masaüstünde imleci hızlandırır."
      ]
    },
    {
      h: "Polling rate (Hz) nedir?",
      p: [
        "Polling rate (yoklama hızı), farenin bilgisayara saniyede kaç kez konum raporu gönderdiğidir. 125 Hz'lik bir fare 8 milisaniyede bir, 500 Hz'lik fare 2 ms'de bir, 1.000 Hz'lik fare her milisaniyede bir rapor verir. Daha yüksek hız, hareketin bilgisayara daha az gecikmeyle ve daha düzgün aralıklarla ulaşması demektir."
      ],
      table: {
        head: ["Polling rate", "Rapor aralığı", "Kullanım"],
        rows: [
          ["125 Hz", "8 ms", "Temel ofis fareleri; günlük iş için yeterli"],
          ["500 Hz", "2 ms", "Ofis ve oyun için dengeli"],
          ["1.000 Hz", "1 ms", "Oyun farelerinde yaygın standart"],
          ["4.000–8.000 Hz", "0,25–0,125 ms", "Yüksek yenileme hızlı ekranlar; işlemciye ek yük getirir"]
        ]
      },
      after: [
        "Ekranınızın yenileme hızı düşükse çok yüksek polling rate'in faydası sınırlıdır; 60 Hz ekran zaten 16,7 ms'de bir görüntü çizer. Oyun akıcılığı için ekran ve kare hızının etkisi [[bilgi:fps-nedir-kac-fps-olmali|FPS yazısında]] anlatılır. Farenizin tahmini örnekleme hızını [[arac:fare-testi|Fare Testi]] aracında imleci hızlıca dairesel hareket ettirerek görebilirsiniz."
      ]
    },
    {
      h: "Fare çift tıklama sorunu nasıl test edilir?",
      p: [
        "Zamanla fare düğmesinin içindeki anahtar aşınır ve tek tıklamada iki tıklama algılanabilir. Bu sorun dosyaların istemeden açılmasına, sürükle-bırakın yarıda kesilmesine yol açar. Belirtiyi doğrulamak için:"
      ],
      ol: [
        "Fare Testi aracını açın ve sol tuşa normal hızda tek tek, 20–30 kez tıklayın.",
        "Araç iki tıklama arasındaki süre çok kısaysa bunu istenmeyen çift tıklama olarak işaretler.",
        "Aynı denemeyi sağ, orta ve yan tuşlarla da yapın; tekerleği iki yöne kaydırarak atlama olup olmadığına bakın.",
        "Sorun yalnızca bir bilgisayarda görülüyorsa farenin sürücüsünü ve kablosuz alıcının bağlı olduğu bağlantı noktasını değiştirerek tekrar deneyin.",
        "Sorun sürüyorsa düğme anahtarı aşınmış olabilir; garanti kapsamındaysa satıcıya başvurun."
      ],
      after: [
        "Klavyeniz için de benzer bir kontrolü [[arac:klavye-test|Online Klavye Testi]] ile yapabilirsiniz. İki testin ayrıntılı kullanımı [[rehber:klavye-ve-fare-testi-nasil-yapilir|klavye ve fare testi rehberinde]] anlatılır. Bu testler yalnızca tarayıcınızda çalışır, tıklama ve tuş verileri hiçbir yere gönderilmez."
      ]
    }
  ],
  faq: [
    ["Fare (mouse) DPI değeri nedir?", "DPI, fare 1 inç yani 2,54 cm hareket ettiğinde sensörün bilgisayara bildirdiği sayım sayısıdır. İşaretçi hızı varsayılandayken her sayım imleci yaklaşık bir piksel kaydırır; 800 DPI'lık fare 1 inçte imleci 800 piksel ilerletir."],
    ["Oyun ve ofis için kaç DPI uygundur?", "Ofiste 1080p ekranda 800–1.600, 4K ekranda 1.600–3.200 DPI iyi bir başlangıçtır. Nişan almaya dayalı oyunlarda çoğu oyuncu 400–1.600 DPI'ı düşük oyun içi hassasiyetle kullanır. Kesin değer masa alanına ve alışkanlığa göre denenerek bulunur."],
    ["Yüksek DPI daha iyi demek midir?", "Hayır. Yüksek DPI imleci hızlandırır ama isabeti tek başına artırmaz; çok yüksek değerler el titremesini büyütür ve bazı sensörlerde enterpolasyon nedeniyle kararlılığı düşürür. Rahat kontrol edebildiğiniz en düşük uygun değer genellikle en iyisidir."],
    ["eDPI nasıl hesaplanır?", "eDPI, fare DPI değerinin oyun içi hassasiyetle çarpımıdır. 800 DPI ve 0,5 hassasiyet 400 eDPI eder; 1.600 DPI ve 0,25 hassasiyet de 400 eDPI'dır ve aynı dönüş hızını verir. Karşılaştırma yalnızca aynı oyun içinde anlamlıdır."],
    ["Polling rate (Hz) nedir?", "Polling rate, farenin saniyede kaç kez konum raporu gönderdiğidir. 125 Hz 8 ms, 500 Hz 2 ms, 1.000 Hz 1 ms aralığa karşılık gelir. Yüksek değer gecikmeyi azaltır, ancak çok yüksek hızlar işlemciye ek yük getirebilir."],
    ["Ekran çözünürlüğü DPI seçimini nasıl etkiler?", "İmleç piksel piksel ilerlediği için geniş ekranda aynı DPI daha yavaş hissedilir. 1.920 piksellik ekranı 800 DPI ile 6,10 cm'de geçersiniz; 3.840 piksellik 4K ekranda aynı his için DPI'ı 1.600'e çıkarmak gerekir."],
    ["Fare çift tıklama sorunu nasıl test edilir?", "Fare Testi aracında her tuşa normal hızda tek tek tıklayın; araç çok kısa aralıklı ikinci tıklamaları istenmeyen çift tıklama olarak gösterir. Sorun sürerse bağlantı noktasını değiştirin; devam ederse düğme anahtarı aşınmış olabilir."],
    ["DPI ile CPI aynı şey midir?", "Pratikte evet. Farenin ölçtüğü şey inç başına sayım, yani CPI'dır; ancak üreticiler ve ayar menüleri yerleşik alışkanlıkla DPI terimini kullanır. Yazıcılardaki DPI ise basılan nokta sayısıdır ve farklı bir kavramdır."],
    ["Windows'ta işaretçi hassasiyetini artır seçeneği kapatılmalı mı?", "Bu seçenek fareyi hızlı oynattığınızda imleci orantısız biçimde uzağa götürür. Ofis kullanımında rahat gelebilir; nişan almaya dayalı oyunlarda aynı hareketin her seferinde aynı sonucu vermesi için genellikle kapatılması tercih edilir."]
  ],
  tools: ["fare-testi", "klavye-test", "ekran-cozunurlugu"],
  related: ["dpi-ve-cozunurluk-nedir", "fps-nedir-kac-fps-olmali", "4k-kac-piksel-cozunurluk-turleri"]
};
