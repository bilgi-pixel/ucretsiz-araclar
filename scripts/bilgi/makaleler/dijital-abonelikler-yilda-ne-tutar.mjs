export default {
  slug: "dijital-abonelikler-yilda-ne-tutar",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "Dijital Abonelikler Yılda Ne Tutar? Abonelik Maliyetini Hesaplama",
  pageTitle: "Dijital Abonelikler Yılda Ne Tutar? Abonelik Maliyeti Hesabı",
  description: "Abonelik maliyeti = her aboneliğin aylık ücreti × 12 toplamı. Yıllık plan tasarrufu, aile planında kişi başı pay, zam etkisi, döviz bazlı abonelik ve iptal listesi.",
  keywords: ["abonelik maliyeti hesaplama", "aylık abonelikler toplam", "dijital abonelik bütçesi", "yıllık abonelik mi aylık mı", "unutulan abonelikler", "abonelik iptal", "abonelik zammı", "aile planı kişi başı maliyet"],
  lead: "Dijital aboneliklerinizin yıllık maliyetini bulmak için <strong>her aboneliğin aylık ücretini 12 ile çarpıp toplayın</strong>; yıllık ödenenleri doğrudan, haftalık olanları 52 ile çarparak ekleyin. Örneğin ayda 1.020 TL tutan altı abonelik, yılda 12.240 TL eder. Küçük görünen tutarlar birikir; çoğu kişi toplamı gördüğünde kullanmadığı bir iki aboneliği iptal eder. Bu yazıda hesap yöntemini, yıllık planın ne kadar ucuz olduğunu, aile paylaşımında kişi başı payı, zam ve kur etkisini ve gereksiz abonelikleri bulma yollarını bulacaksınız.",
  kisaCevap: [
    "Yıllık maliyet = aylık ücretler toplamı × 12 + yıllık ödenen abonelikler + haftalık ücretler × 52.",
    "Yıllık plan tasarruf oranı = 1 − (yıllık ücret ÷ (aylık ücret × 12)); aylık 250 TL yerine yıllık 2.400 TL ödemek %20 tasarruftur.",
    "Aile ya da paylaşımlı planda kişi başı maliyet = plan ücreti ÷ planı gerçekten kullanan kişi sayısı.",
    "Bir zammın bütçeye etkisi = zam tutarı ÷ toplam aylık abonelik gideri; 1.020 TL içinde 50 TL zam toplamı %4,9 artırır.",
    "Döviz bazlı abonelikte TL maliyet = döviz fiyatı × kart ekstresindeki kur; banka ve kart ücretleri ayrıca eklenebilir.",
    "Ücretsiz denemeyi başlattığınız gün, bitişten 2–3 gün önceye takvim hatırlatıcısı kurun."
  ],
  figure: {
    alt: "Altı örnek dijital aboneliğin aylık ve yıllık maliyet çubukları: video 230, oyun 300, yazılım 250, müzik 100, haber 80, bulut 60 TL; toplam ayda 1.020 TL, yılda 12.240 TL.",
    caption: "Örnek tutarlarla bir hanenin abonelik listesi. Tek tek küçük görünen ücretler yıllık toplamda 12.240 TL'ye ulaşır. Kendi listenizdeki gerçek fiyatlarla aynı hesabı yapabilirsiniz.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Aylık küçük, yıllık büyük: örnek abonelik listesi</text>
  <text x="200" y="58" class="sm b mu end">Abonelik</text>
  <text x="560" y="58" class="sm b mu end">Aylık</text>
  <text x="700" y="58" class="sm b mu end">Yıllık</text>
  <g>
    <text x="200" y="88" class="end">Oyun</text><rect x="212" y="74" width="240" height="20" class="p"/><text x="560" y="89" class="end b">300</text><text x="700" y="89" class="end">3.600</text>
    <text x="200" y="124" class="end">Yazılım</text><rect x="212" y="110" width="200" height="20" class="p"/><text x="560" y="125" class="end b">250</text><text x="700" y="125" class="end">3.000</text>
    <text x="200" y="160" class="end">Video</text><rect x="212" y="146" width="184" height="20" class="p"/><text x="560" y="161" class="end b">230</text><text x="700" y="161" class="end">2.760</text>
    <text x="200" y="196" class="end">Müzik</text><rect x="212" y="182" width="80" height="20" class="ps sb"/><text x="560" y="197" class="end b">100</text><text x="700" y="197" class="end">1.200</text>
    <text x="200" y="232" class="end">Haber / dergi</text><rect x="212" y="218" width="64" height="20" class="ps sb"/><text x="560" y="233" class="end b">80</text><text x="700" y="233" class="end">960</text>
    <text x="200" y="268" class="end">Bulut depolama</text><rect x="212" y="254" width="48" height="20" class="ps sb"/><text x="560" y="269" class="end b">60</text><text x="700" y="269" class="end">720</text>
  </g>
  <line x1="20" y1="290" x2="700" y2="290" class="st" fill="none"/>
  <text x="200" y="316" class="b end">Toplam</text>
  <text x="560" y="316" class="end b">1.020 TL</text>
  <text x="700" y="316" class="end b p">12.240 TL</text>
  <rect x="20" y="336" width="680" height="66" rx="10" class="ps"/>
  <text x="40" y="362" class="b">Yalnızca kullanılmayan yazılım ve haberi iptal edin:</text>
  <text x="40" y="388" class="sm t2">(250 + 80) × 12 = 3.960 TL yıllık tasarruf, toplamın %32'si</text>
</svg>`
  },
  sections: [
    {
      h: "Dijital abonelik maliyeti neden gözden kaçar?",
      p: [
        "Dizi, müzik, oyun, bulut depolama, yazılım, haber ve uygulama abonelikleri genellikle kredi kartından otomatik çekilir ve tek tek bakıldığında küçük tutarlardır. Ödemenin her ay kendiliğinden yapılması, harcamanın bilinçli bir karar olmaktan çıkmasına neden olur. Ekstrede onlarca satırın arasında kaybolan bu ödemeler, yıl sonunda bir tatilin ya da bir beyaz eşyanın fiyatına ulaşabilir.",
        "İkinci neden ücretsiz denemelerdir. Bir hizmeti denemek için kart bilgisi verilir, deneme bittiğinde abonelik otomatik olarak ücretliye döner. Kullanılmayan bir uygulama için aylarca ödeme yapmak sık rastlanan bir durumdur. Üçüncü neden de zamlardır: platformlar fiyatı artırdığında çoğu zaman yalnızca bir e-posta gönderilir ve kullanıcı yeni fiyatı fark etmez.",
        "Bu harcamaların etkisini görmek için onları yıllık toplam olarak düşünmek gerekir. Aynı mantık günlük kahve ve atıştırmalık harcamaları için de geçerlidir; ayrıntılar için [[bilgi:kucuk-harcamalar-yillik-ne-tutar|küçük harcamalar yıllık ne tutar]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Yıllık toplam abonelik maliyeti nasıl hesaplanır?",
      p: [
        "Hesap için tüm abonelikleri ödeme sıklığına göre aynı birime, yani yıla çevirmek yeterlidir. Farklı sıklıktaki ödemeleri karıştırmamak için önce bir liste yapın: hizmetin adı, ücreti, ödeme sıklığı ve yenileme tarihi."
      ],
      formula: "Yıllık maliyet = Σ (aylık ücret × 12) + Σ (yıllık ücret) + Σ (haftalık ücret × 52)\nAylık ortalama = yıllık maliyet ÷ 12\nGünlük maliyet = yıllık maliyet ÷ 365",
      ol: [
        "Banka ve kredi kartı ekstrelerinizin son 12 ayını tarayın; düzenli tekrarlayan tutarları işaretleyin.",
        "Telefonunuzdaki uygulama mağazasının abonelikler bölümünü ve e-posta kutunuzdaki \"yenileme\", \"fatura\" içerikli iletileri kontrol edin.",
        "Her aboneliği listeye ekleyin ve yıllık karşılığını yazın.",
        "Listeyi büyükten küçüğe sıralayın; en pahalı üç kalem genellikle toplamın yarısından fazlasıdır.",
        "Her kalemin yanına son bir ayda kaç kez kullandığınızı yazın."
      ],
      after: [
        "Bu adımları elle yapmak yerine [[arac:abonelik-maliyeti-hesapla|Abonelik Maliyeti Hesaplama]] aracına aboneliklerinizi girebilirsiniz; araç yıllık toplamı, aylık ve günlük ortalamayı ve en pahalı kalemi gösterir. Girdiğiniz bilgiler tarayıcınızdan çıkmaz."
      ]
    },
    {
      h: "Çözümlü örnek: altı aboneliğin yıllık maliyeti",
      p: [
        "Aşağıdaki tablo bir hanenin örnek abonelik listesidir. Fiyatlar örnek tutardır; kendi faturalarınızdaki güncel fiyatlarla değiştirin."
      ],
      table: {
        head: ["Abonelik türü", "Aylık ücret", "Yıllık maliyet", "Son ay kullanım"],
        rows: [
          ["Oyun servisi", "300 TL", "3.600 TL", "12 gün"],
          ["Ofis / tasarım yazılımı", "250 TL", "3.000 TL", "1 gün"],
          ["Video yayın servisi", "230 TL", "2.760 TL", "20 gün"],
          ["Müzik servisi", "100 TL", "1.200 TL", "Her gün"],
          ["Haber / dergi", "80 TL", "960 TL", "Hiç"],
          ["Bulut depolama", "60 TL", "720 TL", "Sürekli (yedek)"],
          ["Toplam", "1.020 TL", "12.240 TL", "—"]
        ]
      },
      after: [
        "Toplam aylık 1.020 TL, yıllık 12.240 TL, günlük yaklaşık 33,5 TL'dir. Son ay yalnızca bir gün açılan yazılım ile hiç kullanılmayan haber aboneliği iptal edilirse yılda 3.960 TL tasarruf edilir. Bu tutar toplamın yaklaşık üçte biridir. Kullanım sıklığını bölerek \"kullanım başı maliyet\" de hesaplayabilirsiniz: ayda bir kez açılan 250 TL'lik yazılımın her kullanımı 250 TL'ye mal olur."
      ]
    },
    {
      h: "Yıllık ödeme mi aylık ödeme mi daha ucuz?",
      p: [
        "Birçok hizmet yıllık ödemede indirim sunar. Ne kadar ucuz olduğunu bulmak için yıllık ücreti aylık ücretin 12 katıyla karşılaştırın. Ancak indirim tek başına karar için yeterli değildir; hizmeti gerçekten bir yıl kullanıp kullanmayacağınızı ve fiyatın yıl içinde nasıl değişeceğini de hesaba katın."
      ],
      formula: "Yıllık plan tasarrufu (TL) = aylık ücret × 12 − yıllık ücret\nTasarruf oranı = 1 − yıllık ücret ÷ (aylık ücret × 12)\nÖrnek: 250 × 12 = 3.000 TL; yıllık plan 2.400 TL → 600 TL, %20 tasarruf",
      ul: [
        "<strong>Yıllık plan mantıklı:</strong> Her gün ya da her hafta kullandığınız, en az bir yıldır vazgeçmediğiniz hizmetler.",
        "<strong>Aylık plan mantıklı:</strong> Tek bir dizi ya da sezon için açılan, dönemsel kullanılan hizmetler; ayları atlayarak açıp kapatmak yıllık plandan ucuz olabilir.",
        "<strong>Enflasyon etkisi:</strong> Fiyatların sık arttığı dönemlerde yıllık ödeme, fiyatı bir yıl sabitlediği için ek avantaj sağlar; öte yandan parayı peşin bağlarsınız.",
        "<strong>Cayma ve iade:</strong> Yıllık planı erken iptal ettiğinizde kalan süre için iade yapılıp yapılmadığını sözleşmeden kontrol edin."
      ],
      after: [
        "Peşin ödemenin paranın zaman değeriyle karşılaştırılması için [[bilgi:pesin-mi-taksit-mi-hesaplama|peşin mi taksit mi]] yazısındaki yöntemi de kullanabilirsiniz."
      ]
    },
    {
      h: "Aile ve paylaşımlı planda kişi başı maliyet",
      p: [
        "Aile planları birden fazla kişinin aynı aboneliği kullanmasına izin verir ve kişi başı maliyeti düşürür. Kişi başı payı bulmak için plan ücretini, planı <strong>gerçekten kullanan</strong> kişi sayısına bölün. Örneğin 5 kişilik bir aile planı ayda 400 TL ise ve beş kişi de kullanıyorsa kişi başı 80 TL'dir. Yalnızca iki kişi kullanıyorsa kişi başı 200 TL olur ve bireysel plan daha ucuz kalabilir.",
        "Paylaşımlı planı akraba ya da arkadaşlarla bölüşüyorsanız ödemeyi kimin yaptığını ve diğerlerinin payını ne zaman göndereceğini baştan netleştirin. Hizmet şartları paylaşımı yalnızca aynı hanedeki kişilerle sınırlıyorsa buna uyun; aksi hâlde hesap askıya alınabilir. Ortak giderleri adil bölüştürmenin genel yöntemleri için [[bilgi:ortak-gider-nasil-paylasilir|ortak gider nasıl paylaşılır]] yazısı yol gösterir."
      ]
    },
    {
      h: "Abonelik zammı ve döviz bazlı ödemeler",
      p: [
        "Bir aboneliğe gelen zam, tek başına yüksek görünse de toplam bütçenize etkisi daha küçüktür. Zam oranını bulmak için yeni fiyattan eskiyi çıkarıp eskiye bölün; bütçe etkisini bulmak için ise zam tutarını toplam aylık abonelik giderine bölün. Örnekte 230 TL'lik video aboneliği 280 TL'ye çıkarsa zam oranı %21,7'dir, ama toplam aylık gider 1.020 TL'den 1.070 TL'ye, yani %4,9 artar. Oranları hızlıca bulmak için [[arac:zam-orani-hesapla|Zam Oranı Hesaplama]] aracını kullanabilirsiniz.",
        "Yurt dışı merkezli bazı hizmetler fiyatı döviz cinsinden belirler. Bu durumda TL maliyet her ay kurla değişir. Hesap için döviz fiyatını kart ekstrenizde uygulanan kurla çarpın; bankanız yurt dışı işlemler için ayrıca komisyon alıyorsa onu da ekleyin. Örneğin 10 dolarlık bir abonelik, 42 TL'lik örnek kurla 420 TL eder; kur %10 artarsa maliyet 462 TL'ye çıkar. Döviz bazlı kalemleri listenizde ayrı işaretlemek, kur dalgalanmasının etkisini görmeyi kolaylaştırır."
      ]
    },
    {
      h: "Abonelikler gelirin yüzde kaçını geçmemeli?",
      p: [
        "Bu konuda resmî ya da herkese uyan bir sınır yoktur. Dijital abonelikler çoğu bütçe yönteminde zorunlu ihtiyaçlar değil, istekler grubunda yer alır. 50/30/20 kuralına göre net gelirin %30'u isteklere ayrılır; abonelikler bu payı yemek, gezi, hobi ve alışverişle paylaşır. Örneğin 40.000 TL net geliri olan biri için istek payı 12.000 TL'dir; 1.020 TL'lik abonelik toplamı bu payın yaklaşık %8,5'ini kullanır.",
        "Kendi sınırınızı belirlemek için abonelik toplamını net gelirinize bölün ve sonucu birkaç ay izleyin. Oran artıyorsa yeni bir abonelik eklemeden önce eskilerden birini kapatma kuralı koyabilirsiniz. Bütçe paylarını hesaplamak için [[arac:butce-50-30-20-hesapla|50/30/20 Bütçe Hesaplama]], aylık planı kâğıda dökmek için Bütçe Planlayıcı işinizi görür. Yöntemin ayrıntıları [[bilgi:50-30-20-butce-kurali|50/30/20 bütçe kuralı]] yazısındadır."
      ]
    },
    {
      h: "Kullanılmayan abonelikleri bulma ve iptal etme",
      ul: [
        "<strong>Üç aylık kullanım testi:</strong> Son üç ayda açmadığınız aboneliği iptal edin; gerçekten ihtiyaç duyarsanız yeniden açmak birkaç dakikanızı alır.",
        "<strong>Çakışan hizmetleri birleştirin:</strong> Aynı işi gören iki bulut depolama ya da iki müzik servisine ödeme yapıyorsanız birini bırakın.",
        "<strong>Deneme hatırlatıcısı kurun:</strong> Ücretsiz deneme başladığı gün, bitiş tarihinden 2–3 gün öncesine takvim hatırlatıcısı ekleyin.",
        "<strong>Sanal ya da limitli kart kullanın:</strong> Bankanız destekliyorsa abonelikler için ayrı, düşük limitli bir kart kullanmak kontrolü kolaylaştırır.",
        "<strong>Yenileme tarihlerini not edin:</strong> Yıllık planların yenileme tarihini listeye yazın; otomatik yenilemeden önce kararınızı gözden geçirin.",
        "<strong>İptali belgeleyin:</strong> İptal onay e-postasını saklayın; ödeme devam ederse bankanıza ya da hizmet sağlayıcıya itiraz ederken kanıtınız olur."
      ],
      after: [
        "Kapattığınız aboneliklerin tutarını bir birikim hesabına yönlendirirseniz tasarruf görünür hâle gelir. Aylık 330 TL'lik düzenli birikimin yıllar içinde nereye ulaşacağını [[arac:kucuk-harcama-yillik-hesapla|Küçük Harcama Yıllık Hesaplama]] aracıyla görebilirsiniz."
      ]
    }
  ],
  faq: [
    ["Tüm dijital aboneliklerin yıllık toplam maliyeti nasıl bulunur?", "Her aylık aboneliğin ücretini 12 ile çarpın, yıllık ödenenleri doğrudan ekleyin, haftalık ödenenleri 52 ile çarpın ve hepsini toplayın. Aylık ortalama için toplamı 12'ye, günlük maliyet için 365'e bölebilirsiniz."],
    ["Yıllık ödeme aylık ödemeden ne kadar ucuzdur?", "Hizmete göre değişir. Hesaplamak için aylık ücretin 12 katından yıllık ücreti çıkarın. Aylık 250 TL olan bir abonelik yıllık 2.400 TL ise tasarruf 600 TL, yani yüzde 20'dir."],
    ["Kullanılmayan abonelikler nasıl tespit edilir?", "Son 12 ayın kart ekstrelerini, uygulama mağazasının abonelikler bölümünü ve e-postadaki yenileme bildirimlerini tarayın. Listeye her aboneliğin son ay kullanım sıklığını yazın; üç aydır açmadığınız hizmetleri iptal adayı olarak işaretleyin."],
    ["Aile paylaşımlı planda kişi başı maliyet nasıl hesaplanır?", "Plan ücretini planı gerçekten kullanan kişi sayısına bölün. Ayda 400 TL'lik bir aile planını beş kişi kullanıyorsa kişi başı 80 TL'dir; yalnızca iki kişi kullanıyorsa kişi başı 200 TL olur."],
    ["Abonelik zammı bütçeyi yüzde kaç etkiler?", "Zam tutarını toplam aylık abonelik giderinize bölün. 1.020 TL'lik toplam içinde bir aboneliğe gelen 50 TL'lik zam, tek başına yüzde 21,7 olsa bile toplam abonelik bütçesini yaklaşık yüzde 4,9 artırır."],
    ["Ücretsiz deneme süresi bitmeden nasıl hatırlatılır?", "Denemeyi başlattığınız gün telefonunuzun takvimine, bitiş tarihinden iki üç gün önceye bir hatırlatıcı ekleyin. Bazı hizmetlerde denemeyi başlattıktan hemen sonra otomatik yenilemeyi kapatmak da mümkündür ve deneme süresi devam eder."],
    ["Abonelikler toplam gelirin yüzde kaçını geçmemeli?", "Resmî bir sınır yoktur. Abonelikler bütçede istekler grubundadır; 50/30/20 kuralında isteklere net gelirin yüzde 30'u ayrılır. Abonelik toplamını net gelirinize bölüp birkaç ay izlemek kendi sınırınızı belirlemenin pratik yoludur."],
    ["Döviz bazlı aboneliklerde kur farkı nasıl hesaplanır?", "Döviz fiyatını kart ekstrenizde uygulanan kurla çarpın ve varsa bankanın yurt dışı işlem komisyonunu ekleyin. 10 dolarlık abonelik 42 TL'lik örnek kurla 420 TL eder; kur yüzde 10 artarsa maliyet 462 TL'ye çıkar."]
  ],
  tools: ["abonelik-maliyeti-hesapla", "kucuk-harcama-yillik-hesapla", "butce-planlayici", "zam-orani-hesapla", "butce-50-30-20-hesapla"],
  related: ["kucuk-harcamalar-yillik-ne-tutar", "50-30-20-butce-kurali", "ortak-gider-nasil-paylasilir"],
  sources: [
    ["Ticaret Bakanlığı – Tüketicinin korunması", "https://www.ticaret.gov.tr/"],
    ["Türkiye Cumhuriyet Merkez Bankası – Döviz kurları", "https://www.tcmb.gov.tr/"]
  ]
};
