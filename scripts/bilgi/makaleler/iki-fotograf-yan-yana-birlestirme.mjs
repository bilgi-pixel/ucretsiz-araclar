export default {
  slug: "iki-fotograf-yan-yana-birlestirme",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "İki Fotoğraf Yan Yana Nasıl Birleştirilir? Telefonda ve Bilgisayarda",
  pageTitle: "İki Fotoğraf Yan Yana Birleştirme: Telefonda ve Bilgisayarda",
  description: "İki fotoğrafı yan yana birleştirmek için yükseklikleri eşitleyip tek görselde toplamak yeterli. Uygulamasız yöntem, alt alta düzen, öncesi-sonrası ve kimlik ön-arka.",
  keywords: ["iki fotoğrafı yan yana birleştirme", "fotoğraf birleştirme", "resim birleştirme online", "kolaj yapma", "öncesi sonrası fotoğraf", "alt alta resim birleştirme", "kimlik ön arka birleştirme", "instagram kolaj ölçüsü"],
  lead: "İki fotoğrafı yan yana birleştirmenin en kolay yolu, <strong>tarayıcıda çalışan bir birleştirme aracında iki resmi seçip \"yan yana\" düzenini ve \"yükseklikleri eşitle\" seçeneğini işaretlemektir</strong>; araç küçük olanı büyütmek ya da büyüğü küçültmek yerine iki resmi ortak yüksekliğe getirir ve tek bir JPG ya da PNG olarak verir. Telefonda uygulama yüklemeden aynı işlem tarayıcıdan yapılabilir. Bu sayfada yan yana ve alt alta birleştirmenin ölçü mantığını, öncesi-sonrası görseli, kimlik ön ve arka yüzünü tek sayfaya koymayı ve dosya boyutunu küçültmeyi adım adım bulacaksınız.",
  kisaCevap: [
    "Yan yana birleştirmede resimler ortak yüksekliğe, alt alta birleştirmede ortak genişliğe ölçeklenir; oranları bozulmaz.",
    "Yan yana sonucun genişliği = resim genişliklerinin toplamı + aralıklar; yüksekliği ortak yüksekliktir.",
    "Farklı oranlı fotoğrafları önce aynı orana (ör. ikisini de 4:5) kırpmak, kenarlarda boşluk kalmasını önler.",
    "Telefonda uygulama yüklemeden, tarayıcıda açılan bir araçla birleştirme yapılabilir; dosyanın sunucuya gitmemesine dikkat edin.",
    "Kimlik ön ve arka yüzü alt alta birleştirilip A4 PDF'e çevrilerek tek sayfada gönderilebilir.",
    "Birleştirilen görseli paylaşmadan önce genişliğini 1080–2048 piksele indirmek dosya boyutunu belirgin biçimde küçültür."
  ],
  figure: {
    alt: "Yan yana birleştirme şeması: 4000×3000 yatay fotoğraf ile 3000×4000 dikey fotoğraf, dikey olan 3000 piksel yüksekliğe ölçeklenip 2250×3000 olur; 20 piksel aralıkla sonuç 6270×3000 piksel.",
    caption: "Yükseklik eşitleme, oranları koruyarak iki resmi aynı yüksekliğe getirir. Sonucun genişliği iki genişlik ile aradaki boşluğun toplamıdır. Bu örnek 18,8 megapiksellik bir görsel üretir; paylaşmadan önce küçültmek gerekir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Yan yana birleştirme: yükseklik eşitleme</text>
  <text x="20" y="62" class="sm b">1. Özgün ölçüler</text>
  <rect x="20" y="74" width="160" height="120" rx="4" class="ps"/>
  <text x="100" y="130" class="b mid">A</text><text x="100" y="152" class="sm mid">4000 × 3000</text>
  <rect x="200" y="74" width="120" height="160" rx="4" class="oks"/>
  <text x="260" y="150" class="b mid">B</text><text x="260" y="172" class="sm mid">3000 × 4000</text>
  <line x1="340" y1="154" x2="384" y2="154" class="st sw" fill="none"/>
  <polygon points="384,146 398,154 384,162" class="t2"/>
  <text x="410" y="62" class="sm b">2. Ortak yükseklik 3000 px</text>
  <rect x="410" y="74" width="160" height="120" rx="4" class="ps"/>
  <text x="490" y="130" class="b mid">A</text><text x="490" y="152" class="sm mid">4000 × 3000</text>
  <rect x="578" y="74" width="90" height="120" rx="4" class="oks"/>
  <text x="623" y="130" class="b mid">B</text><text x="623" y="152" class="sm mid">2250 × 3000</text>
  <text x="574" y="214" class="sm mid mu">20 px aralık</text>
  <line x1="574" y1="198" x2="574" y2="204" class="st" fill="none"/>
  <rect x="20" y="256" width="680" height="148" rx="10" class="sf sb"/>
  <rect x="20" y="256" width="8" height="148" class="p"/>
  <text x="44" y="284" class="b">Hesap</text>
  <text x="44" y="310" class="sm">B'nin yeni genişliği: 3000 × (3000 ÷ 4000) = 2250 px</text>
  <text x="44" y="334" class="sm">Toplam genişlik: 4000 + 20 + 2250 = 6270 px · yükseklik 3000 px</text>
  <text x="44" y="358" class="sm">Paylaşım için genişliği 2048 px'e indirince: 2048 × 980 px</text>
  <text x="44" y="384" class="sm t2">Alt alta birleştirmede aynı hesap genişlik üzerinden yapılır.</text>
</svg>`
  },
  sections: [
    {
      h: "Fotoğraf birleştirme ne zaman gerekir?",
      p: [
        "İki ya da daha fazla fotoğrafı tek görselde toplamak gündelik hayatta sandığınızdan sık karşınıza çıkar. Tadilat, saç kesimi, kilo verme ya da ürün temizliği gibi değişimleri göstermek için öncesi-sonrası görseli; kimlik kartının ön ve arka yüzünü tek dosyada istemek için kimlik birleştirme; aynı ürünün farklı açılarını tek ilan görseline koymak için kolaj hazırlanır.",
        "Belgelerde de işe yarar: bir sözleşmenin telefonla çekilmiş iki sayfasını alt alta getirmek, uzun bir mesajlaşmanın ekran görüntülerini tek görsele çevirmek ya da bir başvuru formunun istediği \"tek dosya\" şartını karşılamak birleştirme ile yapılır. Hepsinde mantık aynıdır: resimler ortak bir ölçüye getirilir, belirlenen düzende tek bir tuvale yerleştirilir ve yeni bir dosya olarak kaydedilir."
      ]
    },
    {
      h: "Yan yana ve alt alta birleştirmenin ölçü mantığı",
      p: [
        "Birleştirmede en çok yapılan hata, farklı boyuttaki iki resmi olduğu gibi yan yana koymaktır; sonuçta biri küçük kalır, altında ya da üstünde boşluk oluşur. Bunu önlemek için birleştirme araçları resimleri <strong>oranlarını bozmadan</strong> ortak bir ölçüye getirir:"
      ],
      formula: "Yan yana: yeni genişlik = özgün genişlik × (ortak yükseklik ÷ özgün yükseklik)\nSonuç genişliği = genişlikler toplamı + aralıklar · sonuç yüksekliği = ortak yükseklik\nAlt alta: yeni yükseklik = özgün yükseklik × (ortak genişlik ÷ özgün genişlik)\nSonuç yüksekliği = yükseklikler toplamı + aralıklar · sonuç genişliği = ortak genişlik",
      after: [
        "Örneğin 4000 × 3000 piksellik yatay bir fotoğrafı 3000 × 4000 piksellik dikey bir fotoğrafla yan yana koyarsak ortak yükseklik 3000 piksel seçilir. Dikey fotoğraf 3000 × (3000 ÷ 4000) = 2250 piksel genişliğe iner. Aralarına 20 piksellik boşluk bırakınca sonuç 4000 + 20 + 2250 = 6270 × 3000 piksel olur.",
        "Ortak ölçü olarak genellikle küçük olan resmin yüksekliği seçilir. Büyük resmi küçültmek kaliteyi korur; küçük resmi büyütmek ise bulanıklığa yol açar. Bu yüzden iyi bir araç varsayılan olarak küçüğe göre eşitler."
      ]
    },
    {
      h: "İki fotoğraf yan yana nasıl birleştirilir? Adım adım",
      p: [
        "Aşağıdaki adımlar hem bilgisayarda hem telefonda aynıdır. [[arac:resim-birlestir|Resim Birleştir aracı]] tarayıcınızda çalışır; fotoğraflarınız hiçbir sunucuya yüklenmez, işlem cihazınızın kendi işlemcisiyle yapılır."
      ],
      ol: [
        "Aracı açın ve iki fotoğrafı seçin ya da sürükleyip bırakın. Telefonda \"Dosya seç\" dediğinizde galeriden birden çok fotoğraf işaretleyebilirsiniz.",
        "Düzen olarak \"Yan yana\" seçin. Sıralama yanlışsa küçük resimleri sürükleyerek yerlerini değiştirin; öncesi-sonrası görselinde \"önce\" fotoğrafı solda olmalıdır.",
        "\"Yükseklikleri eşitle\" seçeneğini açık bırakın. Kapatırsanız resimler özgün boyutlarında kalır ve hizalama ayarına göre üstte, ortada ya da altta hizalanır.",
        "İsterseniz resimler arasına boşluk ve dış kenar boşluğu ekleyip arka plan rengini seçin. Beyaz ince bir aralık, iki fotoğrafın sınırını belirginleştirir.",
        "Biçim olarak fotoğraflar için JPG, ekran görüntüleri ve yazılı belgeler için PNG seçip indirin."
      ],
      after: [
        "İki fotoğrafın oranları çok farklıysa (biri yatay, biri dikey) yan yana sonuç dengesiz görünebilir. Bu durumda önce [[arac:resim-kirp|Resim Kırpma aracı]]yla ikisini de aynı orana, örneğin 4:5 ya da 1:1'e kırpın, sonra birleştirin."
      ]
    },
    {
      h: "Telefonda uygulamasız fotoğraf birleştirme",
      p: [
        "Birleştirme için telefona ayrı bir uygulama yüklemek gerekmez. Tarayıcıda çalışan araçlar Android'de Chrome, iPhone'da Safari üzerinden aynı şekilde kullanılır. Uygulama yüklememenin iki avantajı vardır: galerinize ve rehberinize erişim izni vermezsiniz, telefonda yer kaplayan ve reklamla dolu bir uygulama biriktirmezsiniz.",
        "Dikkat edilmesi gereken nokta, kullandığınız sitenin fotoğrafları gerçekten cihazda mı işlediği yoksa bir sunucuya mı yüklediğidir. Özellikle kimlik, fatura ya da çocuk fotoğrafları gibi özel görsellerde bu fark önemlidir. Tarayıcıda çalışan bir aracı, sayfa yüklendikten sonra internet bağlantısını kapatarak deneyebilirsiniz: birleştirme çalışmaya devam ediyorsa dosyalar cihazınızdan çıkmıyor demektir.",
        "Telefon kameralarıyla çekilen fotoğraflar 12–50 megapiksel olabildiği için çok sayıda resmi birleştirirken eski telefonlarda tarayıcı yavaşlayabilir. Bu durumda önce fotoğrafları [[arac:resim-boyutlandir|Resim Boyutlandırma aracı]]yla 2000 piksel genişliğe indirmek işlemi hızlandırır."
      ]
    },
    {
      h: "Alt alta birleştirme ve kimlik ön-arka yüzü",
      p: [
        "Alt alta birleştirmede resimler ortak genişliğe getirilir ve dikey olarak sıralanır. Ekran görüntüsü dizileri, belge sayfaları ve dar yatay görseller için bu düzen daha okunaklıdır. Kimlik kartı, ehliyet ya da banka kartı gibi yatay kartların iki yüzünü tek görselde istemek de alt alta düzenle yapılır."
      ],
      ol: [
        "Kartın ön ve arka yüzünü düz bir zeminde, yansıma olmadan, kartı kadraja tam doldurarak çekin.",
        "İki fotoğrafı kartın kenarlarından kırpın; kart dışındaki masa ve parmak görüntüleri kalmasın.",
        "Birleştirme aracında \"Alt alta\" düzenini ve genişlik eşitlemeyi seçin, aralara 20–40 piksel beyaz boşluk bırakın.",
        "Sonucu JPG olarak indirin. Kurum PDF istiyorsa görseli A4 sayfaya yerleştirip PDF'e çevirin; yöntemi [[rehber:jpg-pdf-cevirme|JPG'den PDF'e çevirme rehberi]] anlatır.",
        "Gönderilecek yer yalnızca belirli bilgileri istiyorsa, gereksiz alanları göndermeden önce [[arac:resim-bulaniklastir|Resimde Bilgi Gizle]] aracıyla kapatın."
      ],
      note: "Kimlik görüntüsü yalnızca talep eden kurumun resmî kanalına gönderilmelidir. Kimlik fotoğrafını sosyal medyada, açık gruplarda ya da tanımadığınız kişilerle paylaşmak kimlik bilgilerinizin kötüye kullanılmasına yol açabilir."
    },
    {
      h: "Öncesi-sonrası görseli nasıl hazırlanır?",
      p: [
        "İyi bir öncesi-sonrası görselinde karşılaştırma fotoğrafın kendisinden gelir; düzen yalnızca bunu kolaylaştırır. İki fotoğraf mümkün olduğunca aynı açıdan, aynı uzaklıktan ve benzer ışıkta çekilmelidir. Aksi hâlde izleyici değişimi değil, kadraj farkını görür."
      ],
      ul: [
        "İki fotoğrafı da aynı orana kırpın; konu (yüz, oda köşesi, ürün) iki karede de aynı konumda dursun.",
        "\"Önce\" fotoğrafını sola ya da üste, \"sonra\" fotoğrafını sağa ya da alta koyun; okuma yönü bu sırayı doğal kılar.",
        "Telefonda dikey görüntülenecekse alt alta, masaüstünde ya da yatay gönderide görülecekse yan yana düzen seçin.",
        "Renk filtresi yalnızca bir fotoğrafa uygulanırsa karşılaştırma yanıltıcı olur; iki fotoğrafı da aynı şekilde işleyin.",
        "Yazı eklemek istiyorsanız \"Önce\" ve \"Sonra\" etiketlerini köşelere, yüzü ya da önemli bölgeyi kapatmadan yerleştirin."
      ]
    },
    {
      h: "Instagram ve WhatsApp için kolaj ölçüleri",
      p: [
        "Sosyal medya platformları yüklenen görselleri belirli ölçülere göre kırpar ya da küçültür. Birleştirilen görselin oranını hedef platforma göre ayarlamak, kenarlarının kesilmesini önler."
      ],
      table: {
        head: ["Hedef", "Önerilen ölçü", "İki fotoğraf yan yana", "İki fotoğraf alt alta"],
        rows: [
          ["Instagram kare gönderi", "1080 × 1080 (1:1)", "Her biri 540 × 1080", "Her biri 1080 × 540"],
          ["Instagram dikey gönderi", "1080 × 1350 (4:5)", "Her biri 540 × 1350", "Her biri 1080 × 675"],
          ["Instagram hikâye / Reels kapağı", "1080 × 1920 (9:16)", "Önerilmez (çok dar)", "Her biri 1080 × 960"],
          ["WhatsApp ve e-posta", "Uzun kenar 1600–2048 px", "Serbest oran", "Serbest oran"]
        ],
        caption: "Ölçüler piksel cinsindendir ve aralık payı hariç verilmiştir. Platformların önerdiği ölçüler zamanla değişebilir."
      },
      after: [
        "Hazır ölçüye kırpma ve bulanık arka planla sığdırma için [[arac:sosyal-medya-gorsel|Sosyal Medya Görsel Boyutlandırıcı]] işinizi kolaylaştırır. Güncel platform ölçülerinin tamamı için [[rehber:instagram-gorsel-boyutlari-2026|Instagram görsel boyutları rehberi]]ne bakabilirsiniz."
      ]
    },
    {
      h: "Birleştirilen fotoğrafın boyutu nasıl küçültülür?",
      p: [
        "Yüksek çözünürlüklü iki fotoğrafı birleştirmek büyük bir dosya üretir. Yukarıdaki 6270 × 3000 piksellik örnek yaklaşık 18,8 megapikseldir ve kalitesine göre JPG olarak birkaç megabayt, PNG olarak çok daha fazla yer tutabilir. Bu boyut e-posta eki sınırlarını ve başvuru sitelerinin yükleme limitlerini aşabilir.",
        "İlk adım piksel boyutunu kullanım yerine göre düşürmektir: ekranda görüntülenecek bir görsel için uzun kenarın 2048 pikseli aşması nadiren gerekir. 6270 piksel genişliği 2048'e indirmek piksel sayısını yaklaşık onda bire düşürür. İkinci adım biçim ve kalitedir: fotoğraflarda JPG ya da WebP ile %75–85 kalite, gözle fark edilmeyen bir kayıpla dosyayı birkaç kat küçültür. PNG ise yalnızca yazı, ekran görüntüsü ve keskin çizgili grafiklerde avantajlıdır.",
        "Belirli bir KB sınırına inmeniz gerekiyorsa [[arac:resim-kucult|Resim Küçült]] aracı kaliteyi adım adım ayarlar. Ayrıntılı yöntem için [[rehber:resim-kucultme-kb|resim küçültme rehberi]]ne başvurabilirsiniz."
      ]
    },
    {
      h: "Fotoğraf birleştirirken sık yapılan hatalar",
      ul: [
        "<strong>Küçük resme göre değil büyüğe göre eşitlemek:</strong> Küçük fotoğraf büyütülünce bulanıklaşır; ortak ölçü küçük olandan seçilmelidir.",
        "<strong>Oranları farklı fotoğrafları kırpmadan birleştirmek:</strong> Yatay ve dikey fotoğraf yan yana dengesiz görünür ve boşluk oluşur.",
        "<strong>Ekran görüntülerini JPG kaydetmek:</strong> Yazıların kenarında bulanık lekeler oluşur; ekran görüntüsü ve belgeler için PNG daha uygundur.",
        "<strong>Kişisel bilgileri kontrol etmeden paylaşmak:</strong> Kimlik numarası, adres ya da plaka gibi bilgiler fark edilmeden kolajın bir köşesinde kalabilir.",
        "<strong>Sıralamayı ters yapmak:</strong> Öncesi-sonrası görselinde \"sonra\" fotoğrafının solda olması karşılaştırmayı tersine okutur."
      ]
    }
  ],
  faq: [
    ["İki fotoğraf yan yana nasıl birleştirilir?", "Bir resim birleştirme aracında iki fotoğrafı seçip yan yana düzenini ve yükseklikleri eşitle seçeneğini işaretleyin. Araç iki resmi oranlarını bozmadan aynı yüksekliğe getirir ve tek bir JPG ya da PNG dosyası olarak indirmenizi sağlar."],
    ["Telefonda uygulamasız fotoğraf birleştirilir mi?", "Evet. Tarayıcıda çalışan bir birleştirme aracını Chrome ya da Safari ile açıp galeriden fotoğrafları seçerek uygulama yüklemeden birleştirme yapabilirsiniz. Özel fotoğraflarda dosyaların sunucuya yüklenmediği bir araç tercih edin."],
    ["Alt alta resim birleştirme nasıl yapılır?", "Birleştirme aracında alt alta düzenini seçtiğinizde resimler ortak genişliğe ölçeklenir ve dikey olarak sıralanır. Sonucun yüksekliği resimlerin yükseklikleri ile aralıkların toplamına eşittir; ekran görüntüsü ve belge sayfaları için uygundur."],
    ["Öncesi-sonrası görseli nasıl hazırlanır?", "İki fotoğrafı aynı açıdan ve ışıkta çekip aynı orana kırpın, önce fotoğrafını sola ya da üste koyarak yan yana veya alt alta birleştirin. Filtre uygulanacaksa iki fotoğrafa da aynı ayarı verin."],
    ["Farklı boyuttaki fotoğraflar nasıl eşitlenir?", "Yan yana birleştirmede yükseklik, alt alta birleştirmede genişlik eşitlenir ve diğer kenar oranı korunarak hesaplanır. Oranlar çok farklıysa önce iki fotoğrafı aynı en-boy oranına kırpmak boşluk kalmasını önler."],
    ["Birleştirilen fotoğrafın boyutu nasıl küçültülür?", "Önce görselin uzun kenarını kullanım yerine göre, örneğin 2048 piksele indirin, sonra JPG ya da WebP biçiminde yüzde 75–85 kaliteyle kaydedin. Bu iki adım çoğu durumda dosya boyutunu birkaç kat azaltır."],
    ["Instagram için kolaj hangi ölçüde olmalı?", "Kare gönderi için 1080 × 1080, dikey gönderi için 1080 × 1350 piksel uygundur. İki fotoğraf yan yana konacaksa dikey gönderide her biri yaklaşık 540 × 1350 piksel olacak şekilde kırpılmalıdır."],
    ["Kimlik ön ve arka yüzü tek sayfada nasıl birleştirilir?", "Kartın iki yüzünü ayrı ayrı çekip kenarlarından kırpın, alt alta düzende aralarında beyaz boşluk bırakarak birleştirin. Kurum PDF istiyorsa sonucu A4 PDF'e çevirip yalnızca resmî kanaldan gönderin."]
  ],
  tools: ["resim-birlestir", "resim-kirp", "resim-boyutlandir", "sosyal-medya-gorsel", "resim-kucult"],
  related: ["dpi-ve-cozunurluk-nedir", "pdf-sayfa-silme-ve-dondurme"]
};
