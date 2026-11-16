export default {
  slug: "utm-parametresi-nedir-nasil-olusturulur",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "UTM Parametresi Nedir? Kampanya Linki Oluşturma ve Analitik Takibi",
  pageTitle: "UTM Parametresi Nedir? Kampanya Linki Nasıl Oluşturulur",
  description: "UTM parametreleri, bağlantıya eklenen utm_source, utm_medium ve utm_campaign etiketleridir; ziyaretin kaynağını gösterir. Oluşturma, adlandırma ve SEO etkisi.",
  keywords: ["utm nedir", "utm parametresi nasıl oluşturulur", "utm_source utm_medium", "kampanya linki takibi", "utm link oluşturma", "utm seo etkisi", "tıklama oranı hesaplama"],
  lead: "UTM parametreleri, bir web adresinin sonuna eklenen ve ziyaretçinin <strong>hangi kaynaktan, hangi kanaldan ve hangi kampanyadan</strong> geldiğini analitik aracınıza bildiren etiketlerdir. En önemli üçü <code>utm_source</code> (kaynak), <code>utm_medium</code> (ortam) ve <code>utm_campaign</code> (kampanya adı); isteğe bağlı olarak <code>utm_term</code> ve <code>utm_content</code> da eklenir. Etiketli bağlantıya tıklayan ziyaretçi, raporlarda o kampanyanın altında görünür. Bu sayfada UTM'li bağlantının yapısını, doğru adlandırma kurallarını, e-posta ve sosyal medyada kullanımını, SEO'ya etkisini ve kampanya başarısının nasıl ölçüleceğini bulacaksınız.",
  kisaCevap: [
    "UTM, bağlantının sorgu bölümüne eklenen ad=değer çiftleridir; sayfanın içeriğini değiştirmez, yalnızca trafiği etiketler.",
    "utm_source trafiğin geldiği yeri (bülten, bir sosyal ağ, iş ortağının sitesi), utm_medium kanal türünü (email, social, cpc), utm_campaign kampanya adını gösterir.",
    "utm_term ücretli aramadaki anahtar kelimeyi, utm_content aynı kampanyadaki farklı bağlantı ya da görselleri ayırt etmek için kullanılır.",
    "Değerler büyük-küçük harfe duyarlıdır: \"Email\" ve \"email\" raporda iki ayrı satır olur; hep küçük harf ve Türkçe karaktersiz yazın.",
    "UTM'yi yalnızca dış kampanya bağlantılarında kullanın; kendi sitenizin iç bağlantılarına eklemek oturum kaynağını bozar.",
    "Doğru kurallı sayfa (canonical) etiketi olan sitelerde UTM'li adresler SEO'ya zarar vermez."
  ],
  figure: {
    alt: "Bir UTM'li kampanya bağlantısının parçalara ayrılmış şeması: sayfa adresi, soru işaretiyle başlayan sorgu bölümü ve ve işaretiyle ayrılmış utm_source=bulten, utm_medium=email, utm_campaign=kasim_indirim ve utm_content=ust_buton etiketleri. Altta bu etiketlerin raporda kaynak, ortam, kampanya ve içerik sütunlarına dönüştüğü gösteriliyor.",
    caption: "Soru işaretinden sonrası sorgu bölümüdür; her etiket ad=değer biçimindedir ve etiketler ve işaretiyle birleştirilir. Analitik aracı bu etiketleri okuyup ziyareti ilgili kampanyaya yazar.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">UTM'li bir bağlantının anatomisi</text>
  <rect x="20" y="52" width="680" height="44" rx="8" class="sf sb"/>
  <text x="34" y="80" class="sm"><tspan class="b">siteniz.com/kampanya</tspan><tspan class="p b">?</tspan>utm_source=bulten<tspan class="p b">&amp;</tspan>utm_medium=email<tspan class="p b">&amp;</tspan>utm_campaign=kasim_indirim<tspan class="p b">&amp;</tspan>utm_content=ust_buton</text>
  <g class="mid">
    <rect x="20" y="124" width="150" height="70" rx="8" class="ps"/>
    <text x="95" y="150" class="sm b">utm_source</text><text x="95" y="172" class="b p">bulten</text>
    <text x="95" y="212" class="sm t2">Nereden geldi?</text>
    <rect x="196" y="124" width="150" height="70" rx="8" class="ps"/>
    <text x="271" y="150" class="sm b">utm_medium</text><text x="271" y="172" class="b p">email</text>
    <text x="271" y="212" class="sm t2">Hangi kanal?</text>
    <rect x="372" y="124" width="150" height="70" rx="8" class="ps"/>
    <text x="447" y="150" class="sm b">utm_campaign</text><text x="447" y="172" class="b p">kasim_indirim</text>
    <text x="447" y="212" class="sm t2">Hangi kampanya?</text>
    <rect x="548" y="124" width="152" height="70" rx="8" class="oks"/>
    <text x="624" y="150" class="sm b">utm_content</text><text x="624" y="172" class="b ok">ust_buton</text>
    <text x="624" y="212" class="sm t2">Hangi bağlantı? (isteğe bağlı)</text>
  </g>
  <line x1="360" y1="226" x2="360" y2="252" class="sp sw" fill="none"/>
  <polygon points="350,252 360,266 370,252" class="p"/>
  <rect x="20" y="276" width="680" height="128" rx="8" class="sf sb"/>
  <rect x="20" y="276" width="680" height="32" rx="8" class="p"/>
  <g class="sm b sf"><text x="36" y="297">Kaynak / ortam</text><text x="250" y="297">Kampanya</text><text x="430" y="297">Oturum</text><text x="530" y="297">Dönüşüm</text><text x="630" y="297">Oran</text></g>
  <g class="sm">
    <text x="36" y="334">bulten / email</text><text x="250" y="334">kasim_indirim</text><text x="430" y="334">480</text><text x="530" y="334">18</text><text x="630" y="334" class="b">%3,75</text>
    <line x1="30" y1="346" x2="690" y2="346" class="sb" fill="none"/>
    <text x="36" y="374">sosyal / social</text><text x="250" y="374">kasim_indirim</text><text x="430" y="374">620</text><text x="530" y="374">12</text><text x="630" y="374" class="b">%1,94</text>
  </g>
  <text x="360" y="398" class="sm mid mu">Örnek rapor: aynı kampanyanın iki kanaldaki başarısı ayrı ayrı görünür.</text>
</svg>`
  },
  sections: [
    {
      h: "UTM parametresi nedir, ne işe yarar?",
      p: [
        "Bir e-posta bülteni gönderdiniz, bir sosyal medya gönderisi paylaştınız ve bir iş ortağınızın sitesinde reklam bağlantınız var. Üçü de aynı ürün sayfasına yönleniyor. Ertesi gün sitenize gelen ziyaretçilerin hangisinden geldiğini nasıl anlarsınız? Analitik araçları bazı kaynakları kendiliğinden tanır, ancak e-posta uygulamalarından, mesajlaşma uygulamalarından ve mobil uygulamalardan gelen ziyaretlerin önemli bir kısmı \"doğrudan\" trafik gibi görünür ve kaybolur.",
        "UTM parametreleri bu sorunu çözer. Bağlantının sonuna eklediğiniz birkaç etiket, ziyaretçiyle birlikte sitenize taşınır ve analitik aracınız bunları okuyarak ziyareti doğru kaynağa, kanala ve kampanyaya yazar. Ad, ilk kez bu etiketleri kullanan bir analitik yazılımından (Urchin Tracking Module) gelir; bugün neredeyse tüm analitik araçları aynı etiketleri tanır.",
        "UTM etiketleri sayfanın içeriğini değiştirmez ve ziyaretçinin kim olduğunu söylemez; yalnızca \"bu tıklama şu kampanyadan geldi\" bilgisini taşır. Bu yüzden kişisel veri içermemeli, e-posta adresi ya da müşteri numarası gibi bilgiler etikete yazılmamalıdır."
      ]
    },
    {
      h: "utm_source, utm_medium ve utm_campaign ne anlama gelir?",
      table: {
        head: ["Parametre", "Soru", "Örnek değerler", "Zorunlu mu?"],
        rows: [
          ["<code>utm_source</code>", "Trafik tam olarak nereden geldi?", "bulten, sosyal, isortagi_blog, qr_brosur", "Evet"],
          ["<code>utm_medium</code>", "Hangi tür kanal?", "email, social, cpc, display, referral, qr", "Evet"],
          ["<code>utm_campaign</code>", "Hangi kampanya?", "kasim_indirim, yeni_sezon_2026, okula_donus", "Evet"],
          ["<code>utm_term</code>", "Ücretli aramada hangi anahtar kelime?", "lazer_yazici, toner", "Hayır"],
          ["<code>utm_content</code>", "Aynı kampanyada hangi bağlantı ya da görsel?", "ust_buton, alt_banner, gorsel_a, gorsel_b", "Hayır"]
        ],
        caption: "Bazı analitik araçları utm_id (kampanya kimliği) gibi ek parametreleri de tanır; bunlar isteğe bağlıdır ve her araçta desteklenmez."
      },
      after: [
        "Kaynak ile ortamı karıştırmamak önemlidir. <strong>Ortam</strong> geniş bir kategori, <strong>kaynak</strong> o kategorideki belirli bir yerdir: ortam \"email\" iken kaynak \"aylik_bulten\" ya da \"kampanya_bulteni\" olabilir; ortam \"social\" iken kaynak hangi sosyal ağdan geldiğinizi gösterir. Analitik araçlarının varsayılan kanal gruplandırması büyük ölçüde utm_medium değerine bakar; \"email\", \"social\", \"cpc\" gibi yaygın değerler doğru kanala düşer, \"eposta\" ya da \"mail_gonderi\" gibi özgün değerler ise \"atanmamış\" (unassigned) kanalda kalabilir."
      ]
    },
    {
      h: "UTM linki nasıl oluşturulur?",
      p: [
        "UTM'li bağlantı, sayfa adresinin sonuna bir soru işareti ve ardından ve (&) işaretiyle birleştirilmiş ad=değer çiftleri eklenerek oluşturulur. Adreste zaten bir soru işareti varsa (örneğin ürün filtresi gibi başka parametreler), yeni etiketler ikinci bir soru işaretiyle değil, ve işaretiyle eklenir."
      ],
      formula: "siteniz.com/sayfa?utm_source=KAYNAK&utm_medium=ORTAM&utm_campaign=KAMPANYA\nÖnceden parametre varsa: siteniz.com/urunler?kategori=toner&utm_source=bulten&utm_medium=email&utm_campaign=kasim_indirim\nSayfa içi bağlantı (#) varsa UTM, # işaretinden önce gelmelidir",
      ol: [
        "Ziyaretçinin ulaşacağı sayfanın tam adresini tarayıcının adres çubuğundan kopyalayın.",
        "[[arac:utm-link-olustur|UTM Bağlantısı Oluşturma]] aracına adresi yapıştırın.",
        "Kaynak, ortam ve kampanya alanlarını doldurun; gerekiyorsa terim ve içerik alanlarını da kullanın.",
        "Araç Türkçe karakterleri ve boşlukları sade karakterlere çevirir (ör. \"Kasım İndirimi\" → kasim_indirimi); adresteki diğer parametreleri ve # bölümünü korur.",
        "Oluşan bağlantıyı bir kez kendiniz tıklayarak açın; sayfanın doğru yüklendiğini ve analitik aracınızın gerçek zamanlı raporunda ziyaretin doğru kampanyayla göründüğünü kontrol edin.",
        "Bağlantıyı bir tabloya kaydedin: hangi kampanyada, hangi kanalda, hangi tarihte kullanıldığını not edin."
      ],
      after: [
        "Bağlantıdaki boşluk ve Türkçe karakterler tarayıcıda %20, %C4%B1 gibi kodlara dönüşür ve hem okunması zor hem hataya açık bir adres oluşturur. Bu kodlamanın mantığını [[bilgi:url-kodlama-yuzde-20-nedir|URL kodlama]] yazısında bulabilirsiniz. Elinizdeki uzun bir bağlantının hangi parametreleri taşıdığını görmek için [[arac:url-ayristir|URL Ayrıştırma]] aracı adresi şema, alan adı, yol ve çözülmüş sorgu parametreleri olarak ayırır."
      ]
    },
    {
      h: "UTM adlandırma kuralları: tutarlılık her şeydir",
      p: [
        "UTM raporlarının değeri, etiketlerin ne kadar tutarlı yazıldığına bağlıdır. Aynı kampanyayı bir yerde \"KasimIndirim\", başka yerde \"kasim-indirim\" diye yazarsanız rapor bunları iki ayrı kampanya sayar ve toplamları siz elle birleştirmek zorunda kalırsınız."
      ],
      ul: [
        "<strong>Hep küçük harf kullanın:</strong> Değerler büyük-küçük harfe duyarlıdır.",
        "<strong>Türkçe karakter ve boşluk kullanmayın:</strong> ç, ğ, ı, ö, ş, ü yerine c, g, i, o, s, u; boşluk yerine alt çizgi.",
        "<strong>Tek bir ayraç seçin:</strong> Alt çizgi ya da tire; ikisini karışık kullanmayın.",
        "<strong>Ortam için sabit bir liste belirleyin:</strong> email, social, cpc, display, referral, qr, sms gibi; ekipteki herkes aynı listeyi kullansın.",
        "<strong>Kampanya adına tarih ya da dönem ekleyin:</strong> \"indirim\" yerine \"2026_11_indirim\" yazmak, yıllar sonra raporları karıştırmayı önler.",
        "<strong>Kişisel veri yazmayın:</strong> Etiketlere e-posta adresi, telefon ya da müşteri adı koymayın."
      ]
    },
    {
      h: "E-posta, sosyal medya ve basılı materyallerde UTM",
      p: [
        "UTM'nin en çok fayda sağladığı yerler, analitik aracının kaynağı kendiliğinden tanıyamadığı kanallardır. E-posta bültenlerinde her bağlantıya aynı kaynak, ortam ve kampanya etiketini verip yalnızca utm_content ile bağlantıları ayırabilirsiniz: üstteki büyük düğme \"ust_buton\", ürün görseli \"urun_gorseli\", alttaki metin bağlantısı \"alt_link\". Böylece bültenin hangi bölümünün daha çok tıklandığını görürsünüz."
      ],
      ul: [
        "<strong>Sosyal medya profil bağlantısı:</strong> Profilinizdeki tek bağlantıya utm_source olarak sosyal ağın adını, utm_medium=social ve utm_campaign=profil verin; gönderi ve hikâye bağlantılarında ise kampanya adını değiştirin.",
        "<strong>Ücretli reklamlar:</strong> Reklam platformunun kendi otomatik etiketlemesi varsa onu kullanın; elle UTM eklemeniz gerekiyorsa utm_medium=cpc ve anahtar kelime için utm_term kullanın.",
        "<strong>Mesajlaşma uygulamaları ve SMS:</strong> Paylaşılan bağlantılar çoğunlukla doğrudan trafik olarak görünür; utm_medium=sms ya da messaging ile ayırın.",
        "<strong>QR kodlu broşür ve kartvizit:</strong> QR koduna UTM'li bağlantıyı gömün (utm_medium=qr, utm_source=brosur_kasim); basılı materyallerin getirdiği ziyaretleri de ölçebilirsiniz. Ayrıntı için [[rehber:qr-kod-nasil-olusturulur|QR kod nasıl oluşturulur]] rehberine bakın."
      ]
    },
    {
      h: "UTM'li link analitik raporlarında nerede görünür?",
      p: [
        "Çoğu analitik aracında UTM verileri edinme (acquisition) ya da trafik kaynakları başlığı altındaki raporlarda yer alır. Oturum kaynağı/ortamı ve oturum kampanyası boyutlarını seçerek her kampanyanın getirdiği ziyaret, etkileşim ve dönüşüm sayılarını görebilirsiniz. Bağlantıyı yayımlamadan önce kendiniz tıklayıp gerçek zamanlı rapora bakmak, etiketlerin doğru okunduğunu sınamanın en hızlı yoludur.",
        "Etiketli bir ziyaretin verisinin raporlara yansıması birkaç saat sürebilir. Rapor tarih aralığını kampanyanın başlangıcına göre ayarlayın ve sonuçları değerlendirirken kampanya dönemi ile normal dönem trafiğini karşılaştırın."
      ]
    },
    {
      h: "UTM parametreleri SEO'ya zarar verir mi?",
      p: [
        "Doğru kullanıldığında hayır. Arama motorları aynı sayfanın UTM'li ve UTM'siz adreslerini teknik olarak farklı adresler olarak görebilir, ama sayfanızda <strong>kurallı adres (canonical) etiketi</strong> doğru tanımlıysa bu adresler asıl sayfayla birleştirilir ve çift içerik sorunu oluşmaz. Modern site altyapılarının çoğu canonical etiketini otomatik ekler; sayfanızın kaynak kodunda bu etiketin UTM'siz adresi gösterdiğini kontrol edin.",
        "Asıl risk, UTM'yi <strong>iç bağlantılarda</strong> kullanmaktır. Sitenizin menüsüne, ana sayfadaki bir afişe ya da makale içi bir bağlantıya UTM eklerseniz, ziyaretçi o bağlantıya tıkladığında oturumu yeni bir kampanyadan gelmiş gibi sayılır; arama motorundan ya da bültenden gelen asıl kaynak kaybolur. Site içi tanıtımları ölçmek için analitik aracınızın olay (event) izleme özelliğini kullanın. Bağlantı paylaşıldığında görünen başlık ve görselin nasıl belirlendiğini [[bilgi:open-graph-meta-etiketi-nedir|Open Graph meta etiketi]] yazısı anlatıyor."
      ]
    },
    {
      h: "Uzun UTM linkleri nasıl kısaltılır?",
      p: [
        "UTM'li bağlantılar uzun ve göze hoş görünmeyen adresler oluşturur. Bunu yönetmenin birkaç yolu vardır. Kendi alan adınızda kısa bir yönlendirme adresi (örneğin siteniz.com/kasim) tanımlayıp bunu UTM'li uzun adrese yönlendirmek en güvenilir ve marka açısından en temiz yöntemdir; birçok site altyapısı bu tür yönlendirmeleri yönetim panelinden kurmanıza izin verir.",
        "Üçüncü taraf bağlantı kısaltma hizmetleri de kullanılabilir, ancak bağlantınızın sürekliliği o hizmete bağlı kalır ve bazı kullanıcılar tanımadıkları kısa adreslere tıklamaktan çekinir. Basılı materyallerde ise QR kod kullanmak uzun adres sorununu tamamen ortadan kaldırır. Hangi yöntemi seçerseniz seçin, kısaltılmış adresin sonunda UTM etiketlerinin korunduğunu bir kez tıklayarak doğrulayın."
      ]
    },
    {
      h: "Kampanyanın tıklama ve dönüşüm oranı nasıl hesaplanır?",
      p: [
        "UTM size kampanyanın kaç ziyaret getirdiğini söyler; başarıyı değerlendirmek için bunu gösterim ve dönüşüm verileriyle birleştirmek gerekir. İki temel oran vardır."
      ],
      formula: "Tıklama oranı (CTR) = tıklama ÷ gösterim × 100\nDönüşüm oranı = dönüşüm (sipariş, form) ÷ oturum × 100",
      ol: [
        "<strong>Gösterim ve tıklama:</strong> Bir e-posta 12.000 kişiye ulaştı (açılma ya da gösterim sayısı olarak), bağlantılara 480 tıklama geldi. CTR = 480 ÷ 12.000 × 100 = %4.",
        "<strong>Oturum ve dönüşüm:</strong> Analitik raporu kampanyadan 480 oturum ve 18 sipariş gösteriyor. Dönüşüm oranı = 18 ÷ 480 × 100 = %3,75.",
        "<strong>Kanal karşılaştırması:</strong> Aynı kampanyanın sosyal medya bağlantısı 620 oturum ve 12 sipariş getirdiyse oranı 12 ÷ 620 × 100 = %1,94'tür. Sosyal medya daha çok ziyaret, e-posta daha çok sipariş getirmiş.",
        "<strong>Gelir:</strong> Siparişlerin tutarını kampanya maliyetine bölerek reklam harcamasının getirisini bulabilirsiniz."
      ],
      after: [
        "Bu oranları [[arac:tiklama-orani-hesapla|Tıklama Oranı (CTR) Hesaplama]] ve [[arac:donusum-orani-hesapla|Dönüşüm Oranı Hesaplama]] araçlarıyla bulabilirsiniz. CTR, CPC ve CPM gibi reklam metriklerinin ayrıntısı [[bilgi:ctr-cpc-cpm-nedir|CTR, CPC, CPM nedir]] yazısında; reklam harcamasının getirisini hesaplamak için [[bilgi:roas-ve-roi-nedir-nasil-hesaplanir|ROAS ve ROI]] yazısına bakabilirsiniz."
      ]
    }
  ],
  faq: [
    ["UTM parametresi nedir?", "UTM parametresi, bir web adresinin sonuna eklenen ve ziyaretçinin hangi kaynak, kanal ve kampanyadan geldiğini analitik aracına bildiren etikettir. utm_source, utm_medium ve utm_campaign temel üç parametredir; sayfanın içeriğini değiştirmez, yalnızca trafiği etiketler."],
    ["utm_source, utm_medium ve utm_campaign ne anlama gelir?", "utm_source trafiğin geldiği belirli yeri, örneğin bülteni ya da bir sosyal ağı gösterir. utm_medium kanal türünü, örneğin email, social ya da cpc değerini taşır. utm_campaign ise kampanyanın adıdır ve aynı kampanyanın farklı kanallardaki sonuçlarını bir araya getirir."],
    ["UTM linki nasıl oluşturulur?", "Hedef sayfanın adresinin sonuna soru işareti ve ardından ve işaretiyle ayrılmış utm_source, utm_medium ve utm_campaign etiketleri eklenir. Bir UTM oluşturucu araç bu işlemi otomatik yapar, Türkçe karakterleri sadeleştirir ve adresteki mevcut parametreleri korur."],
    ["UTM'li link analitik raporlarında nerede görünür?", "Analitik araçlarında UTM verileri genellikle edinme ya da trafik kaynakları raporlarında, oturum kaynağı/ortamı ve oturum kampanyası boyutlarıyla görünür. Bağlantıyı yayımlamadan önce kendiniz tıklayıp gerçek zamanlı raporda ziyaretin doğru kampanyayla göründüğünü kontrol edebilirsiniz."],
    ["Sosyal medya ve e-posta kampanyalarında UTM nasıl kullanılır?", "E-postada her bağlantıya aynı kaynak, ortam ve kampanya etiketi verilip bağlantılar utm_content ile ayrılır. Sosyal medyada profil bağlantısına ve gönderi bağlantılarına utm_medium=social ve sosyal ağın adını taşıyan bir kaynak değeri eklenir; kampanya adı her paylaşım dönemine göre değiştirilir."],
    ["UTM parametreleri SEO'ya zarar verir mi?", "Sayfada kurallı adres (canonical) etiketi doğru tanımlıysa UTM'li adresler asıl sayfayla birleştirilir ve SEO'ya zarar vermez. Asıl risk UTM'yi sitenin kendi iç bağlantılarında kullanmaktır; bu, ziyaretin gerçek kaynağını siler ve raporları bozar."],
    ["Uzun UTM linkleri nasıl kısaltılır?", "En güvenilir yöntem, kendi alan adınızda kısa bir yönlendirme adresi tanımlayıp UTM'li uzun adrese yönlendirmektir. Üçüncü taraf kısaltma hizmetleri de kullanılabilir; basılı materyallerde ise QR kod uzun adres sorununu tamamen ortadan kaldırır. Kısaltılmış adresin etiketleri koruduğunu test edin."],
    ["Kampanyanın tıklama ve dönüşüm oranı nasıl hesaplanır?", "Tıklama oranı, tıklama sayısının gösterim sayısına bölünüp 100 ile çarpılmasıyla bulunur. Dönüşüm oranı ise sipariş ya da form sayısının kampanyadan gelen oturum sayısına bölünüp 100 ile çarpılmasıdır. Örneğin 480 oturumdan 18 sipariş yüzde 3,75 dönüşüm oranı eder."],
    ["UTM değerlerinde büyük harf ya da Türkçe karakter kullanılabilir mi?", "Teknik olarak kullanılabilir ama önerilmez. UTM değerleri büyük-küçük harfe duyarlıdır ve Email ile email raporda iki ayrı satır olur. Türkçe karakterler ve boşluklar adreste kodlanarak okunması zor bir bağlantı oluşturur; küçük harf ve alt çizgi kullanmak en güvenlisidir."]
  ],
  tools: ["utm-link-olustur", "url-ayristir", "tiklama-orani-hesapla", "donusum-orani-hesapla"],
  related: ["ctr-cpc-cpm-nedir", "roas-ve-roi-nedir-nasil-hesaplanir", "url-kodlama-yuzde-20-nedir", "open-graph-meta-etiketi-nedir"],
  sources: [
    ["Ticaret Bakanlığı – elektronik ticaret bilgi platformu", "https://www.eticaret.gov.tr/"],
    ["Kişisel Verileri Koruma Kurumu – kişisel verilerin işlenmesi", "https://www.kvkk.gov.tr/"]
  ]
};
