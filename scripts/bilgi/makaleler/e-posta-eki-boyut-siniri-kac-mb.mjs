export default {
  slug: "e-posta-eki-boyut-siniri-kac-mb",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "E-posta Eki Boyut Sınırı Kaç MB? Büyük Dosyayı Göndermenin Yolları",
  pageTitle: "E-posta Eki Boyut Sınırı Kaç MB? Büyük Dosya Gönderme",
  description: "Yaygın e-posta hizmetlerinde ek sınırı 20–25 MB'tır, ama Base64 nedeniyle gönderebileceğiniz dosya yaklaşık 18 MB'tır. Sıkıştırma, PDF bölme ve küçültme yolları.",
  keywords: ["e-posta eki boyut sınırı", "mail eki kaç mb", "25 mb üstü dosya gönderme", "büyük dosya nasıl gönderilir", "mail eki çok büyük", "base64 ek boyutu", "pdf bölme e-posta", "dosya sıkıştırma"],
  lead: "Yaygın ücretsiz e-posta hizmetlerinin çoğunda ek sınırı <strong>20–25 MB</strong> arasındadır; kurumsal posta sunucularında ise yönetici bu sınırı genellikle 10–35 MB arasında ayarlar. Ancak bu sınır iletinin toplam kodlanmış boyutuna uygulanır: ekler Base64 ile kodlanırken yaklaşık üçte bir büyüdüğü için 25 MB'lık sınırda gönderebileceğiniz dosya pratikte 18 MB civarındadır. Sınırı aşan dosyaları sıkıştırarak, parçalara bölerek, fotoğrafları küçülterek ya da paylaşım bağlantısıyla gönderebilirsiniz. Sağlayıcıların sınırları zamanla değişebildiği için güncel değeri kendi sağlayıcınızın yardım sayfasından kontrol edin.",
  kisaCevap: [
    "Yaygın ücretsiz e-posta hizmetlerinde ek sınırı 20–25 MB; kurumsal sunucularda yöneticinin belirlediği değer geçerlidir.",
    "Sınır kodlanmış ileti boyutunu ölçer; Base64 kodlama dosyayı 4/3 oranında büyütür, 25 MB sınırda gerçek dosya en fazla yaklaşık 18 MB olur.",
    "Alıcının sunucusu daha düşük bir sınır uyguluyorsa ileti sizin tarafınızda gitse de karşı tarafta geri döner.",
    "Fotoğraf, video ve PDF zaten sıkıştırılmış olduğundan ZIP ile çok az küçülür; metin, CSV ve eski tip belgeler çok daha fazla küçülür.",
    "Sınırı aşan PDF'i bölmek, fotoğrafları küçültüp tek PDF yapmak ya da paylaşım bağlantısı göndermek en pratik yollardır."
  ],
  figure: {
    alt: "25 MB e-posta sınırı ile Base64 etkisi: 18,75 MB'lık dosya kodlanınca 25 MB olur ve sınıra ulaşır; 20 MB'lık dosya 26,7 MB'a çıkar ve reddedilir. Altta büyük dosya için dört çözüm yolu.",
    caption: "Ek, iletiye eklenirken metne çevrilir ve her 3 bayt 4 karaktere dönüşür. Bu yüzden 25 MB sınırı gerçek dosya boyutunda yaklaşık 18 MB'a denk gelir; başlıklar için biraz daha pay bırakın.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">25 MB sınırı aslında kaç MB dosya demek?</text>
  <line x1="560" y1="50" x2="560" y2="232" class="sdg sw dash" fill="none"/>
  <text x="566" y="64" class="sm dg b">25 MB sınır</text>
  <text x="20" y="88" class="b">Dosya 18,75 MB</text>
  <rect x="160" y="72" width="315" height="26" rx="4" class="ps"/>
  <text x="168" y="90" class="sm">gerçek boyut</text>
  <rect x="160" y="104" width="400" height="26" rx="4" class="oks"/>
  <text x="168" y="122" class="sm">Base64 sonrası 25,0 MB: sınırda, sığar</text>
  <text x="20" y="176" class="b">Dosya 20 MB</text>
  <rect x="160" y="160" width="336" height="26" rx="4" class="ps"/>
  <text x="168" y="178" class="sm">gerçek boyut</text>
  <rect x="160" y="192" width="448" height="26" rx="4" class="dgs"/>
  <text x="168" y="210" class="sm">Base64 sonrası 26,7 MB: reddedilir</text>
  <rect x="20" y="246" width="680" height="40" rx="8" class="sf sb"/>
  <text x="360" y="272" class="mid b">Kodlanmış boyut = dosya × 4 ÷ 3 (+ başlıklar)</text>
  <text x="20" y="316" class="b">Sınırı aşan dosya için</text>
  <rect x="20" y="328" width="160" height="72" rx="8" class="p"/>
  <text x="100" y="358" class="mid b sf">Küçült</text><text x="100" y="380" class="sm mid sf">fotoğraf, PDF</text>
  <rect x="193" y="328" width="160" height="72" rx="8" class="sf sb"/>
  <text x="273" y="358" class="mid b">Böl</text><text x="273" y="380" class="sm mid mu">PDF'i parçalara</text>
  <rect x="366" y="328" width="160" height="72" rx="8" class="sf sb"/>
  <text x="446" y="358" class="mid b">Sıkıştır</text><text x="446" y="380" class="sm mid mu">ZIP, metin ve CSV</text>
  <rect x="539" y="328" width="161" height="72" rx="8" class="sf sb"/>
  <text x="620" y="358" class="mid b">Bağlantı</text><text x="620" y="380" class="sm mid mu">süreli, şifreli</text>
</svg>`
  },
  sections: [
    {
      h: "E-posta eki sınırı kaç MB? Yaygın değerler",
      p: [
        "E-posta, aslında büyük dosya taşımak için tasarlanmış bir sistem değildir. İletiler bir sunucudan ötekine aktarılırken her sunucu kendi sınırını uygular. Bu yüzden \"e-postanın sınırı\" tek bir sayı değil; sizin sağlayıcınızın, alıcının sağlayıcısının ve aradaki kurumsal geçitlerin sınırlarından en küçüğüdür.",
        "Günümüzde yaygın ücretsiz e-posta hizmetlerinin çoğu gönderilen ileti için 20–25 MB arası bir sınır uygular; bazıları gelen iletilerde daha yüksek bir değere izin verir. Kurumsal posta sunucularında, okul ve kamu kurumlarının sistemlerinde ise sınırı sistem yöneticisi belirler ve 10 MB gibi düşük değerler de görülebilir. Sınırlar zamanla değiştiği için bu sayfadaki değerleri yaygın örnek olarak kabul edin ve güncel bilgiyi kendi sağlayıcınızın yardım sayfasından kontrol edin."
      ],
      table: {
        head: ["Ortam", "Yaygın ileti sınırı", "Not"],
        rows: [
          ["Yaygın ücretsiz e-posta hizmetleri", "20–25 MB", "Sınır kodlanmış ileti boyutuna uygulanır"],
          ["Kurumsal posta sunucuları", "10–35 MB", "Sistem yöneticisi belirler"],
          ["Okul, belediye ve kamu kurumu adresleri", "Kuruma göre değişir", "Başvuru duyurusunda belirtilen sınıra uyun"],
          ["Alıcı tarafı", "Alıcının sunucu sınırı", "Sizin sınırınız yüksek olsa bile ileti geri dönebilir"]
        ],
        caption: "Değerler yaygın örneklerdir; sağlayıcıya ve hesap türüne göre değişir."
      }
    },
    {
      h: "Eklenen dosya neden sınırdan büyük görünür? Base64 etkisi",
      p: [
        "E-posta protokolü başlangıçta yalnızca düz metin taşıyacak şekilde tasarlandı. Fotoğraf ya da PDF gibi ikili dosyalar iletiye eklenirken metin karakterlerine çevrilir; bu çeviri çoğunlukla <strong>Base64</strong> yöntemiyle yapılır. Base64 her 3 baytlık veriyi 4 karakterle temsil eder, yani dosyayı yaklaşık %33 büyütür. Satır sonları ve ileti başlıkları da birkaç yüzde ek yük getirir.",
        "Sağlayıcıların sınırı bu kodlanmış boyuta uygulanır. 20 MB'lık bir PDF iletide yaklaşık 26,7 MB yer kaplar ve 25 MB sınırını aşar. Yöntemin ayrıntısını [[bilgi:base64-nedir-ne-ise-yarar|Base64 nedir]] makalesinde bulabilirsiniz."
      ],
      formula: "Kodlanmış boyut ≈ dosya boyutu × 4 ÷ 3\nGönderilebilecek en büyük dosya ≈ sınır × 3 ÷ 4\n25 MB sınır → 25 × 0,75 = 18,75 MB (başlıklar için pay bırakın: ~18 MB)",
      after: [
        "Pratik kural: sınırın dörtte üçünü hedefleyin ve biraz da pay bırakın. 25 MB sınırlı bir hesapta toplam ek boyutunu 18 MB'ın altında, 10 MB sınırlı bir kurumsal hesapta 7 MB'ın altında tutun. MB ve KB hesaplarında 1.000 ile 1.024 farkı da küçük sapmalar yaratır; ayrıntı için [[bilgi:gb-kac-mb-veri-birimleri|veri birimleri]] makalesine bakın."
      ]
    },
    {
      h: "Büyük PDF parçalara nasıl bölünür?",
      p: [
        "Taranmış sözleşmeler, ders notları ya da teknik çizimler kolayca 30–50 MB'a ulaşır. Böyle bir dosyayı birkaç e-postaya bölerek göndermek, alıcının da kolayca açabileceği güvenli bir yoldur."
      ],
      ol: [
        "[[arac:pdf-bol|PDF Bölme]] aracını açın ve dosyanızı seçin; dosya bilgisayarınızdan çıkmaz.",
        "\"Her N sayfada böl\" seçeneğiyle eşit parçalar oluşturun ya da sayfa aralıklarını kendiniz belirleyin (1–20, 21–40 gibi).",
        "Her parçanın boyutuna bakın; 18 MB'ın altında olmalı. Aşan parça varsa sayfa aralığını küçültün.",
        "Parçaları \"Bölüm 1/3\", \"Bölüm 2/3\" gibi adlandırın ve e-posta konusuna da aynı numarayı yazın.",
        "Alıcıya kaç parça göndereceğinizi ilk iletide bildirin; eksik parça olursa hemen fark edilir."
      ],
      after: [
        "Bölmeden önce küçültmeyi denemek çoğu zaman daha iyi sonuç verir. [[arac:pdf-kucult|PDF Küçültme]] aracı taranmış sayfalardaki görüntüleri yeniden sıkıştırarak 40 MB'lık bir dosyayı birkaç MB'a indirebilir; metin tabanlı PDF'lerde ise kayıpsız yeniden paketleme seçeneği daha uygundur."
      ]
    },
    {
      h: "Fotoğraflar e-posta için nasıl küçültülür?",
      p: [
        "Güncel telefonların çektiği bir fotoğraf 3–8 MB arasındadır. Beş fotoğraf bile 25 MB'lık sınırı zorlar. Oysa ekranda bakılacak ya da belgeye eklenecek bir fotoğraf için 1.600–2.000 piksel genişlik ve 300–800 KB boyut çoğu zaman yeterlidir.",
        "Başvuru sistemleri gibi belirli bir KB sınırı olan yerler için [[arac:fotograf-50-kb-yap|Fotoğrafı 50 KB Yap]] aracı hedef boyutu otomatik bulur. Fotoğrafların biçimi de önemlidir: fotoğraf için JPG, logo ve ekran görüntüsü için PNG daha uygun olur; biçimler arasındaki farkı ilgili Bilgi Bankası makalesinde bulabilirsiniz."
      ],
      table: {
        head: ["Fotoğraf", "Tipik boyut", "Küçültülmüş (2.000 px, JPG %80)", "25 MB'a sığan adet"],
        rows: [
          ["Telefon fotoğrafı, 12 MP", "3–5 MB", "0,5–0,8 MB", "Küçültmeden 3–5, küçültünce 20'den fazla"],
          ["Taranmış belge, 300 dpi renkli", "2–4 MB", "0,3–0,6 MB", "Küçültünce 30'dan fazla"],
          ["Ekran görüntüsü (PNG)", "0,5–2 MB", "0,2–0,5 MB", "Çoğu durumda küçültme gerekmez"]
        ],
        caption: "Değerler örnektir; içerik ve kalite ayarına göre değişir. Hesap Base64 payı düşülerek 18 MB'a göre yapılmıştır."
      }
    },
    {
      h: "Birden fazla fotoğraf tek PDF yapılıp gönderilebilir mi?",
      p: [
        "Evet ve çoğu zaman en düzenli yol budur. Kimlik ön–arka yüzü, fatura sayfaları ya da bir ürünün farklı açılardan fotoğrafları tek PDF'te birleştirildiğinde alıcı dosyaları sırayla görür, yazdırması da kolaylaşır. [[arac:resimden-pdfe|Resimden PDF'e]] aracı JPG, PNG ve WebP dosyalarını istediğiniz sırayla A4 sayfalara yerleştirir.",
        "Birleştirmeden önce fotoğrafları küçültürseniz PDF de küçük olur. Fotoğrafları küçültmeden PDF'e çevirmek boyutu düşürmez; PDF, içindeki görüntüleri genellikle olduğu gibi taşır."
      ]
    },
    {
      h: "ZIP ile sıkıştırma dosyayı ne kadar küçültür?",
      p: [
        "ZIP sıkıştırması dosyadaki tekrar eden kalıpları bulup kısaltır. Bu yüzden kazanç dosyanın türüne bağlıdır. Düz metin, CSV, eski tip belgeler ve günlük dosyaları %60–90 küçülebilir. JPG fotoğraf, MP4 video, MP3 ses ve çoğu PDF ise zaten sıkıştırılmış olduğundan ZIP ile genellikle yalnızca %0–5 küçülür. Yeni tip ofis belgeleri (.docx, .xlsx, .pptx) aslında içten ZIP arşividir; yeniden sıkıştırmak da az kazandırır.",
        "ZIP'in asıl faydası çok sayıda dosyayı tek ek olarak göndermek ve klasör yapısını korumaktır. [[arac:zip|ZIP Sıkıştırma]] aracı dosyaları tarayıcınızda sıkıştırır ve Türkçe dosya adlarını korur. Bazı kurumsal sunucular güvenlik nedeniyle ZIP içindeki çalıştırılabilir dosyaları ya da şifreli arşivleri engeller; böyle bir durumda ileti hiç ulaşmayabilir."
      ]
    },
    {
      h: "Bulut bağlantısıyla göndermenin riski nedir?",
      p: [
        "Çok büyük dosyalar için en yaygın çözüm, dosyayı bir depolama hizmetine yükleyip e-postada yalnızca bağlantı paylaşmaktır. Bu yöntem pratik olsa da dosyanız artık sizin cihazınız dışında bir sunucuda durur. Bağlantıyı ele geçiren herkes dosyaya erişebilir, alıcı bağlantıyı başkalarına iletebilir ve siz silmedikçe dosya orada kalır."
      ],
      ul: [
        "Bağlantıyı \"herkes erişebilir\" yerine yalnızca belirli kişilere açın ya da şifre koyun.",
        "Süreli paylaşım seçeneği varsa bir hafta gibi kısa bir süre seçin, iş bitince dosyayı silin.",
        "Kimlik, sağlık raporu, maaş bordrosu gibi kişisel veri içeren belgeleri herkese açık bağlantıyla göndermeyin.",
        "Size gelen beklenmedik \"dosya paylaşıldı\" iletilerine dikkat edin; sahte paylaşım bildirimleri oltalama saldırılarında sık kullanılır. Nasıl anlaşılacağını [[bilgi:oltalama-sahte-link-nasil-anlasilir|oltalama rehberinde]] bulabilirsiniz."
      ]
    },
    {
      h: "Kuruma başvuru ve resmî yazışmada ek gönderirken",
      p: [
        "Okul kaydı, iş başvurusu, ihale dosyası ya da kamu kurumuna dilekçe gibi yazışmalarda ekin boyutu kadar düzeni de önemlidir. Karşı taraf onlarca iletiyi tek tek açıp kaydeder; adı \"IMG_2034.jpg\" olan beş fotoğraf yerine \"Ad-Soyad-Diploma.pdf\" gibi açıklayıcı adlı tek bir PDF işini kolaylaştırır ve dosyanızın kaybolma ihtimalini azaltır.",
        "Duyuruda belirli bir biçim (PDF, JPG) ve boyut (ör. en fazla 2 MB) isteniyorsa bu sınır genellikle tek dosya içindir ve başvuru sistemi daha katı denetleyebilir. Sınırın biraz altında kalmak, örneğin 2 MB yerine 1,8 MB hedeflemek, sistemin 1.000 mi 1.024 mü kullandığından bağımsız olarak dosyanızın kabul edilmesini sağlar.",
        "Ek göndermeden önce dosyayı kendiniz bir kez açın: taranmış sayfaların düz, okunaklı ve doğru sırada olduğunu kontrol edin. İletiye kısa bir açıklama yazıp kaç ek gönderdiğinizi belirtmek de alıcının eksik dosyayı fark etmesini kolaylaştırır."
      ]
    },
    {
      h: "\"Ek çok büyük\" hatasında adım adım çözüm",
      ol: [
        "Toplam ek boyutuna bakın ve sağlayıcınızın sınırının dörtte üçüyle karşılaştırın.",
        "Fotoğraf varsa önce küçültün; çoğu durumda sorun burada çözülür.",
        "PDF varsa küçültmeyi deneyin; yetmezse sayfalara göre bölün.",
        "Çok sayıda küçük dosya varsa ZIP ile tek eke dönüştürün.",
        "Hâlâ büyükse dosyayı birden fazla iletiye bölün ya da erişimi kısıtlı, süreli bir paylaşım bağlantısı kullanın.",
        "Alıcının kurumsal adresi varsa, karşı tarafın sınırını da sorun; ileti geri dönerse hata mesajında genellikle izin verilen boyut yazar."
      ]
    }
  ],
  faq: [
    ["Gmail'de en fazla kaç MB ek gönderilebilir?", "Yaygın ücretsiz e-posta hizmetlerinde, bu hizmet de dahil, gönderilen ileti sınırı genellikle 25 MB civarındadır. Base64 kodlama nedeniyle gerçek dosya yaklaşık 18 MB'ı geçmemelidir; güncel değeri sağlayıcının yardım sayfasından kontrol edin."],
    ["Outlook ve kurumsal postada ek sınırı nedir?", "Kişisel hesaplarda sınır genellikle 20–25 MB aralığındadır. Kurumsal posta sunucularında sınırı sistem yöneticisi belirler ve 10 ile 35 MB arasında değişebilir; kurumunuzun bilgi işlem birimine sorabilirsiniz."],
    ["Eklenen dosya neden sınırdan büyük görünür?", "Ekler e-postaya eklenirken Base64 ile metne çevrilir ve her 3 bayt 4 karaktere dönüşür. Bu dosyayı yaklaşık üçte bir büyütür; 20 MB'lık bir dosya iletide yaklaşık 26,7 MB yer kaplar."],
    ["Büyük PDF parçalara nasıl bölünür?", "PDF Bölme aracında dosyayı seçip her N sayfada bir ya da sayfa aralığına göre bölebilirsiniz. Her parçanın 18 MB'ın altında olmasına dikkat edin ve parçaları sıra numarasıyla adlandırın."],
    ["Fotoğraflar e-posta için nasıl küçültülür?", "Fotoğrafları 1.600–2.000 piksel genişliğe ve JPG biçiminde yüzde 75–85 kaliteye indirmek boyutu çoğu zaman 5–10 kat düşürür. Belirli bir KB sınırı varsa hedef boyutu otomatik bulan bir araç kullanın."],
    ["ZIP ile sıkıştırma dosyayı ne kadar küçültür?", "Metin, CSV ve eski tip belgeler yüzde 60–90 küçülebilir. JPG, MP4, MP3 ve çoğu PDF zaten sıkıştırılmış olduğu için ZIP ile genellikle yalnızca yüzde 0–5 küçülür."],
    ["Birden fazla fotoğraf tek PDF yapılıp gönderilebilir mi?", "Evet. Resimden PDF'e aracıyla fotoğrafları istediğiniz sırayla A4 sayfalara yerleştirebilirsiniz. Boyutun küçük olması için fotoğrafları birleştirmeden önce küçültmeniz önerilir."],
    ["Bulut bağlantısıyla göndermenin riski nedir?", "Dosya sizin dışınızda bir sunucuda saklanır ve bağlantıya sahip herkes erişebilir. Erişimi belirli kişilerle sınırlayın, süreli paylaşım seçin ve kişisel veri içeren belgeleri herkese açık bağlantıyla göndermeyin."],
    ["Bu araçlar dosyamı bir sunucuya yüklüyor mu?", "Hayır. PDF bölme, PDF küçültme, ZIP ve fotoğraf küçültme araçları tarayıcınızda çalışır; dosyalarınız bilgisayarınızdan çıkmaz, kayıt gerekmez ve işlem bitince bellekte kalmaz."]
  ],
  tools: ["pdf-kucult", "pdf-bol", "zip", "fotograf-50-kb-yap", "resimden-pdfe"],
  related: ["base64-nedir-ne-ise-yarar", "gb-kac-mb-veri-birimleri", "jpg-png-svg-farki"],
  sources: [
    ["IETF – RFC 2045, MIME ve Base64 kodlaması", "https://www.rfc-editor.org/rfc/rfc2045"]
  ]
};
