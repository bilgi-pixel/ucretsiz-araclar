export default {
  slug: "open-graph-meta-etiketi-nedir",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Open Graph ve Meta Etiketleri Nedir? Paylaşım Önizlemesi Nasıl Ayarlanır",
  pageTitle: "Open Graph Nedir? Meta Etiketleri ve og:image Boyutu",
  description: "Meta etiketleri sayfayı arama motoruna, Open Graph etiketleri sosyal ağlara tanıtır. og:image 1200×630 piksel olmalı; WhatsApp önizleme sorunu ve çözümleri.",
  keywords: ["open graph nedir", "meta etiketi nedir", "og:image boyutu", "whatsapp link önizleme", "meta description nasıl yazılır", "twitter card nedir", "favicon nasıl eklenir", "hreflang etiketi nedir"],
  lead: "Meta etiketleri, sayfanın başlık (head) bölümünde duran ve ziyaretçiye görünmeyen, sayfayı <strong>arama motorlarına ve tarayıcılara tanıtan</strong> kısa bilgilerdir; Open Graph (og:) etiketleri ise aynı sayfanın WhatsApp, Facebook, LinkedIn gibi platformlarda paylaşıldığında hangi başlık, açıklama ve görselle görüneceğini belirler. Doğru ayarlanmış bir sayfa, linki paylaşıldığında 1200×630 piksellik bir görsel, net bir başlık ve tek cümlelik açıklamayla kart olarak açılır. Bu rehberde temel etiketleri, görsel ölçülerini, önizlemenin neden çıkmadığını ve hreflang ile favicon gibi tamamlayıcı ayarları adım adım bulacaksınız.",
  kisaCevap: [
    "Meta etiketi, sayfanın head bölümünde arama motoruna ve tarayıcıya sayfa hakkında bilgi veren görünmez satırdır.",
    "Open Graph için zorunlu dörtlü og:title, og:description, og:image ve og:url etiketleridir; og:type ve og:site_name önerilir.",
    "og:image için önerilen ölçü 1200×630 pikseldir (yaklaşık 1,91:1 oran); en az 600×315 piksel kullanın.",
    "Meta description için 120–160 karakter, title için 50–60 karakter Google sonuçlarında kesilmeden görünme olasılığını artırır.",
    "Twitter (X) kartı twitter:card etiketiyle seçilir; summary_large_image büyük görselli karttır, og: etiketleri yedek olarak okunur.",
    "WhatsApp önizlemesi çıkmıyorsa en sık neden görselin göreli adresle verilmesi, çok büyük dosya ya da önbellekte kalan eski bilgidir."
  ],
  figure: {
    alt: "Bir web sayfasının head bölümündeki og:title, og:description, og:image ve og:url etiketlerinin, mesajlaşma uygulamasında görünen paylaşım kartının hangi parçasını oluşturduğunu oklarla gösteren şema.",
    caption: "Soldaki dört Open Graph etiketi, sağdaki paylaşım kartının dört parçasına karşılık gelir. Görsel alanı 1200×630 piksel (1,91:1) oranındadır; başlık ve açıklama kartta kısaltılabileceği için en önemli bilgiyi başa yazın.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Etiketler paylaşım kartına nasıl dönüşür?</text>
  <rect x="20" y="56" width="300" height="330" rx="10" class="sf sb"/>
  <text x="36" y="82" class="b">Sayfanın head bölümü</text>
  <text x="36" y="102" class="sm mu">ziyaretçi görmez, platformlar okur</text>
  <rect x="36" y="122" width="268" height="44" rx="6" class="ps"/>
  <text x="48" y="149" class="sm b">og:image  →  görsel adresi</text>
  <rect x="36" y="178" width="268" height="44" rx="6" class="ps"/>
  <text x="48" y="205" class="sm b">og:title  →  sayfa başlığı</text>
  <rect x="36" y="234" width="268" height="44" rx="6" class="ps"/>
  <text x="48" y="261" class="sm b">og:description  →  kısa özet</text>
  <rect x="36" y="290" width="268" height="44" rx="6" class="ps"/>
  <text x="48" y="317" class="sm b">og:url  →  asıl (kanonik) adres</text>
  <text x="36" y="364" class="sm t2">Ek: og:type, og:site_name, twitter:card</text>
  <rect x="400" y="56" width="300" height="330" rx="12" class="sf sb"/>
  <rect x="416" y="72" width="268" height="141" rx="6" class="p"/>
  <text x="550" y="136" class="lg b mid sf">1200 × 630 px</text>
  <text x="550" y="160" class="sm mid sf">oran 1,91 : 1</text>
  <text x="416" y="244" class="b">Başlık en fazla ~60 karakter</text>
  <text x="416" y="270" class="sm t2">Açıklama 1–2 satırda kesilir;</text>
  <text x="416" y="288" class="sm t2">önemli bilgiyi başa yazın.</text>
  <line x1="416" y1="306" x2="684" y2="306" class="sb" fill="none"/>
  <text x="416" y="330" class="sm mu">ornekalanadi.com</text>
  <text x="416" y="364" class="sm p b">Paylaşım kartı</text>
  <line x1="304" y1="144" x2="410" y2="144" class="sp" fill="none"/>
  <polygon points="410,138 422,144 410,150" class="p"/>
  <line x1="304" y1="200" x2="410" y2="238" class="sp" fill="none"/>
  <polygon points="406,232 420,240 404,244" class="p"/>
  <line x1="304" y1="256" x2="410" y2="276" class="sp" fill="none"/>
  <polygon points="406,270 420,278 404,282" class="p"/>
  <line x1="304" y1="312" x2="410" y2="326" class="sp" fill="none"/>
  <polygon points="406,320 420,328 404,332" class="p"/>
</svg>`
  },
  sections: [
    {
      h: "Meta etiketi nedir, ne işe yarar?",
      p: [
        "Bir web sayfası iki bölümden oluşur: ziyaretçinin gördüğü gövde (body) ve görünmeyen başlık (head) bölümü. <strong>Meta etiketleri</strong> bu görünmeyen bölümde durur ve sayfanın kimliğini tarif eder: hangi dilde yazıldığı, hangi karakter kodlamasını kullandığı, mobil ekranda nasıl ölçekleneceği, arama sonuçlarında nasıl özetleneceği gibi bilgiler burada verilir.",
        "En bilinen meta etiketleri şunlardır: <code>charset</code> (Türkçe karakterlerin doğru görünmesi için UTF-8 olmalı), <code>viewport</code> (telefonda sayfanın küçülmüş masaüstü gibi görünmemesi için), <code>description</code> (arama sonucundaki açıklama) ve <code>robots</code> (sayfanın dizine eklenip eklenmeyeceği). Sayfa başlığı teknik olarak ayrı bir title etiketidir ama aynı bölümde durduğu için meta bilgisiyle birlikte ele alınır.",
        "Meta etiketleri sıralamayı doğrudan yükselten sihirli satırlar değildir; Google, keywords etiketini uzun yıllardır dikkate almaz. Ancak doğru başlık ve açıklama, arama sonucunda tıklanma oranını belirgin biçimde etkiler. Yani etki dolaylıdır ama gerçektir."
      ]
    },
    {
      h: "Open Graph etiketleri ne işe yarar?",
      p: [
        "<strong>Open Graph protokolü</strong>, bir sayfanın sosyal ağlarda ve mesajlaşma uygulamalarında nasıl görüneceğini belirleyen ortak bir etiket kümesidir. Bir link paylaşıldığında platformun sunucusu sayfayı ziyaret eder, head bölümündeki og: ile başlayan etiketleri okur ve bunlardan bir önizleme kartı oluşturur. Etiket yoksa platform sayfadan rastgele bir görsel ve metin seçer ya da yalnızca çıplak linki gösterir.",
        "Etiketler, <code>meta property=\"og:title\" content=\"…\"</code> biçiminde yazılır. Aşağıdaki tablo hangi etiketin ne iş gördüğünü ve nasıl doldurulacağını özetler."
      ],
      table: {
        head: ["Etiket", "Görevi", "Doldururken dikkat"],
        rows: [
          ["og:title", "Kartın kalın başlığı", "60 karakteri geçmesin; site adını sona ekleyebilirsiniz"],
          ["og:description", "Başlığın altındaki özet", "1–2 cümle, 100–200 karakter; tıklama nedeni versin"],
          ["og:image", "Kart görseli", "Tam adres (alan adıyla), 1200×630 piksel, JPG ya da PNG"],
          ["og:url", "Sayfanın asıl adresi", "Kanonik adresle aynı olsun; parametresiz yazın"],
          ["og:type", "İçerik türü", "Ana sayfada website, yazılarda article"],
          ["og:site_name", "Site adı", "Kartta küçük harflerle görünür"],
          ["og:locale", "Dil ve bölge", "Türkçe sayfa için tr_TR"]
        ],
        caption: "İlk dört satır temel kümedir; eksik olursa önizleme kusurlu çıkar."
      },
      after: [
        "Open Graph başlığı ile sayfa başlığının birebir aynı olması gerekmez. Arama sonucunda anahtar kelimeyi öne çıkaran bir başlık, sosyal medyada ise merak uyandıran daha kısa bir başlık tercih edilebilir. Yine de içerikle ilgisiz, tıklama tuzağı başlıklar platformların güvenini ve sizin itibarınızı zedeler."
      ]
    },
    {
      h: "og:image görseli kaç piksel olmalı?",
      p: [
        "Platformların büyük çoğunluğu geniş kartlarda yaklaşık <strong>1,91:1</strong> oranını kullanır. Bu orana denk gelen ve en yaygın önerilen ölçü <strong>1200×630 piksel</strong>dir. Daha küçük görseller (ör. 600×315 altı) çoğu platformda büyük kart yerine küçük, yanda duran bir kare küçük resim olarak gösterilir.",
        "Görselin kenarları bazı uygulamalarda kırpılabilir; bazıları kartı kare (1:1) olarak keser. Bu yüzden logo ve yazı gibi önemli öğeleri görselin ortasındaki yaklaşık 630×630 piksellik güvenli alanda tutmak iyi bir alışkanlıktır."
      ],
      table: {
        head: ["Kullanım", "Önerilen ölçü", "Oran", "Not"],
        rows: [
          ["Genel og:image", "1200×630 px", "1,91:1", "Çoğu platformda büyük kart"],
          ["En küçük büyük kart", "600×315 px", "1,91:1", "Altında küçük resme düşebilir"],
          ["Twitter büyük görsel kartı", "1200×628 px", "yaklaşık 1,91:1", "og:image ile aynı dosya iş görür"],
          ["Kare önizleme", "1200×1200 px", "1:1", "Bazı mesajlaşma görünümleri kare kırpar"]
        ],
        caption: "Ölçüler platformların zaman zaman güncellediği önerilerdir; 1200×630 hepsinde güvenli ortak noktadır."
      },
      after: [
        "Dosya boyutunu da ihmal etmeyin. Birkaç megabaytlık bir görsel teknik olarak kabul edilse bile mesajlaşma uygulamaları önizleme için sınırlı süre ve veri ayırır; büyük dosyada kart görselsiz çıkabilir. JPG biçiminde, makul kaliteyle sıkıştırılmış ve birkaç yüz KB'ı aşmayan bir görsel en sorunsuz sonucu verir. Biçim farkları için [[bilgi:jpg-png-svg-farki|JPG, PNG ve SVG farkı]] yazısına bakabilirsiniz; SVG dosyaları og:image olarak çoğu platformda desteklenmez."
      ]
    },
    {
      h: "Meta description ve title kaç karakter olmalı?",
      p: [
        "Google, sonuç sayfasında başlığı ve açıklamayı karakter sayısıyla değil <strong>piksel genişliğiyle</strong> keser. Masaüstünde başlık için yaklaşık 580–600 piksel ayrılır; bu da ortalama 50–60 karaktere denk gelir. Açıklama için pratik hedef <strong>120–160 karakter</strong>dir. Geniş harfler (M, W, Ğ) çok olan metinler daha erken kesilir.",
        "İyi bir meta description, aramayı yapan kişinin sorusuna ilk cümlede cevap verir ve sayfada ne bulacağını söyler. Örneğin \"Kira artış oranı nasıl hesaplanır?\" sayfası için \"Kira artışı son 12 aylık TÜFE ortalamasıyla sınırlıdır; formül, örnek hesap ve ücretsiz hesaplama aracı bu sayfada.\" gibi somut bir cümle, \"En iyi kira bilgileri burada!\" gibi boş bir cümleden çok daha fazla tıklama alır."
      ],
      ul: [
        "Her sayfaya özgün bir açıklama yazın; aynı açıklamayı yüzlerce sayfada tekrarlamak Google'ın açıklamayı yok saymasına yol açar.",
        "Anahtar kelimeyi doğal biçimde bir kez geçirin; Google aranan kelimeyi açıklamada kalın gösterir.",
        "Google gerekli görürse açıklamanızı sayfadaki başka bir paragrafla değiştirebilir; bu bir ceza değil, sorgu ile daha uyumlu metin seçimidir.",
        "Çift tırnak işareti etiketin içeriğini erken kapatabilir; açıklamada tırnak gerekiyorsa tek tırnak ya da Türkçe tırnak tercih edin."
      ]
    },
    {
      h: "Twitter Card nedir, nasıl ayarlanır?",
      p: [
        "<strong>Twitter Card</strong> (X kartı), Open Graph'a benzer ama platforma özgü bir etiket kümesidir. Temel etiket <code>twitter:card</code>'dır ve kartın biçimini seçer: <em>summary</em> küçük kare görselli, <em>summary_large_image</em> ise başlığın üstünde geniş görselli karttır. Uygulamaların çoğu kart türünü öğrendikten sonra başlık, açıklama ve görsel için önce twitter: etiketlerine, yoksa og: etiketlerine bakar.",
        "Bu nedenle pratikte yalnızca <code>twitter:card</code> değerini summary_large_image yapıp diğer bilgileri Open Graph'tan okutmak yeterlidir. Site ya da yazar hesabını göstermek isterseniz <code>twitter:site</code> etiketiyle hesap adını ekleyebilirsiniz."
      ]
    },
    {
      h: "WhatsApp'ta link önizlemesi neden çıkmıyor?",
      p: [
        "WhatsApp, Telegram ve benzeri uygulamalar linki gönderen cihazdan ya da kendi sunucularından sayfayı çağırır ve og: etiketlerini okur. Önizleme çıkmıyorsa sorun neredeyse her zaman aşağıdaki nedenlerden biridir. Listeyi sırayla kontrol etmek çoğu zaman birkaç dakikada çözüm sağlar."
      ],
      ol: [
        "<strong>Görsel adresi göreli:</strong> og:image değeri alan adıyla başlayan tam adres olmalıdır. Yalnızca \"/resim.jpg\" yazmak birçok uygulamada çalışmaz.",
        "<strong>Görsel çok büyük ya da yavaş:</strong> Dosyayı sıkıştırın, 1200×630 ölçüsüne indirin ve birkaç yüz KB'ın altında tutun.",
        "<strong>Etiketler sonradan yükleniyor:</strong> Etiketleri JavaScript ile sayfa açıldıktan sonra ekleyen siteler önizleme vermez; platform botları çoğunlukla JavaScript çalıştırmaz. Etiketler sunucudan gelen ilk HTML'de olmalıdır.",
        "<strong>Erişim engeli:</strong> Güvenlik duvarı, bot koruması ya da robots kuralı platformun botunu engelliyorsa sayfa okunamaz. Şifreli ya da giriş gerektiren sayfalar önizleme vermez.",
        "<strong>Önbellek:</strong> Platformlar bir linkin önizlemesini bir süre saklar. Etiketi düzelttikten sonra eski kart görünmeye devam edebilir; adrese anlamsız bir parametre ekleyerek (ör. sonuna ?v=2) yeni bir okuma tetikleyebilirsiniz.",
        "<strong>Güvenlik sertifikası:</strong> Geçersiz ya da süresi dolmuş SSL sertifikası olan sayfalardan önizleme alınmaz."
      ],
      after: [
        "Sorun yalnızca bir platformda görülüyorsa, o platformun geliştirici araçlarındaki paylaşım hata ayıklayıcısını kullanarak sayfanın nasıl okunduğunu görebilir ve önbelleği yenileyebilirsiniz."
      ]
    },
    {
      h: "Favicon ve hreflang: tamamlayıcı etiketler",
      p: [
        "<strong>Favicon</strong>, tarayıcı sekmesinde, yer imlerinde ve mobil arama sonuçlarında sitenizin yanında görünen küçük simgedir. Head bölümüne <code>link rel=\"icon\"</code> satırıyla eklenir. Uyumluluk için 32×32 ve 16×16 piksellik ICO ya da PNG dosyası, iPhone ana ekranı için 180×180 piksellik apple-touch-icon, Android için 192 ve 512 piksellik simgeler hazırlanır. Google, arama sonuçlarında gösterdiği simge için 48 pikselin katı olan kare bir görsel önerir.",
        "<strong>Hreflang</strong> etiketi, aynı içeriğin farklı dil ya da ülke sürümleri olduğunda arama motoruna hangi sürümün kime gösterileceğini söyler. Örneğin Türkçe ve İngilizce sürümü olan bir sayfada her iki sürüm de birbirini <code>link rel=\"alternate\" hreflang=\"tr\"</code> ve hreflang=\"en\" satırlarıyla göstermelidir. Bağlantılar karşılıklı olmazsa Google etiketi yok sayar. Dil seçimi yapılmamış ziyaretçiler için varsayılan sürümü x-default değeriyle belirtebilirsiniz."
      ]
    },
    {
      h: "Etiketleri ücretsiz araçlarla hazırlama",
      p: [
        "Etiketleri elle yazmak yazım hatalarına açıktır; bir tırnak eksikliği bütün kartı bozabilir. Bilişim Ajans araçlarıyla bu işi birkaç dakikada, tarayıcınızdan çıkmadan yapabilirsiniz:"
      ],
      ol: [
        "[[arac:meta-etiket-olustur|Meta Etiket, Open Graph ve Twitter Card Oluşturucu]]'ya başlığı, açıklamayı, sayfa adresini ve görsel adresini yazın; araç Google ve sosyal paylaşım önizlemesini anında gösterir.",
        "Sayfa adresini henüz belirlemediyseniz başlığı [[arac:url-metni-olustur|URL Metni (Slug) Oluşturma]] aracıyla Türkçe karaktersiz, tireli bir adrese çevirin.",
        "Logonuzdan [[arac:favicon-olustur|Favicon Oluşturucu]] ile tüm boyutlardaki simgeleri ve hazır kodu alın.",
        "Çok dilli bir siteniz varsa [[arac:hreflang-olustur|Hreflang Etiketi Oluşturma]] aracıyla dil sürümlerinin karşılıklı etiketlerini üretin.",
        "Üretilen kodu sitenizin head bölümüne yapıştırın, sayfayı yayımlayın ve linki kendinize mesaj olarak göndererek önizlemeyi test edin."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Her sayfada aynı og:image:</strong> Yalnızca logo kullanmak paylaşımları birbirinin aynısı yapar; her yazı için konuya özel bir kapak görseli tıklanmayı artırır.",
        "<strong>Görselde küçük yazı:</strong> Telefonda kart küçük görünür; görselin üzerindeki yazı 5–6 kelimeyi geçmesin ve büyük puntoyla yazılsın.",
        "<strong>og:url ile kanonik adresin farklı olması:</strong> Paylaşım sayıları bölünür, platform hangi adresi esas alacağını karıştırır.",
        "<strong>Etiketleri body içine koymak:</strong> Meta etiketleri yalnızca head bölümünde geçerlidir.",
        "<strong>Sayfa değiştiği hâlde eski kartın görünmesini hata sanmak:</strong> Bu çoğunlukla platform önbelleğidir; birkaç gün içinde kendiliğinden yenilenir ya da hata ayıklayıcıyla yenilenebilir."
      ]
    }
  ],
  faq: [
    ["Meta etiketi nedir?", "Meta etiketi, web sayfasının görünmeyen head bölümünde yer alan ve sayfanın dili, karakter kodlaması, açıklaması ya da dizine eklenip eklenmeyeceği gibi bilgileri tarayıcıya ve arama motorlarına bildiren satırdır."],
    ["Open Graph etiketi ne işe yarar?", "Open Graph etiketleri, bir link WhatsApp, Facebook, LinkedIn gibi platformlarda paylaşıldığında hangi başlık, açıklama ve görselle kart olarak görüneceğini belirler. Etiket yoksa platform sayfadan rastgele içerik seçer ya da yalnızca linki gösterir."],
    ["og:image görseli kaç piksel olmalı?", "Önerilen ölçü 1200×630 pikseldir ve yaklaşık 1,91:1 oranına karşılık gelir. 600×315 pikselin altındaki görseller birçok platformda büyük kart yerine küçük resim olarak gösterilir; önemli öğeleri ortada tutmak kırpılma riskini azaltır."],
    ["WhatsApp'ta link önizlemesi neden çıkmıyor?", "En sık nedenler og:image adresinin göreli yazılması, görselin çok büyük olması, etiketlerin JavaScript ile sonradan eklenmesi, botun güvenlik duvarına takılması ve platformun eski önizlemeyi önbellekte tutmasıdır. Linke parametre eklemek yeniden okumayı tetikler."],
    ["Meta description kaç karakter olmalı?", "Pratik hedef 120 ile 160 karakter arasıdır. Google açıklamayı piksel genişliğine göre keser, bu yüzden geniş harfli metinler daha erken kısalabilir. En önemli bilgiyi ve sorunun cevabını ilk cümleye yazmak en güvenli yoldur."],
    ["Twitter Card nedir?", "Twitter Card, linkin X (Twitter) üzerinde nasıl görüneceğini seçen etiket kümesidir. twitter:card değeri summary küçük görselli, summary_large_image geniş görselli kartı açar; başlık ve görsel bilgisi eksikse platform Open Graph etiketlerini kullanır."],
    ["Favicon nasıl eklenir?", "Favicon, head bölümüne link rel icon satırıyla eklenir. 16×16 ve 32×32 piksellik simgenin yanında Apple cihazlar için 180×180, Android için 192 ve 512 piksellik sürümler hazırlamak, simgenin her ekranda net görünmesini sağlar."],
    ["Çok dilli sitede hreflang etiketi nedir?", "Hreflang, aynı içeriğin farklı dil ya da ülke sürümlerini arama motoruna tanıtan etikettir. Her sürüm diğerlerini karşılıklı olarak göstermelidir; tek yönlü bağlantılar yok sayılır. Varsayılan sürüm için x-default değeri kullanılır."],
    ["Meta keywords etiketi hâlâ işe yarar mı?", "Google, keywords meta etiketini sıralama için uzun süredir kullanmamaktadır. Etiketi eklemek zarar vermez ama zaman ayırmak yerine özgün başlık, açıklama ve iyi bir paylaşım görseli hazırlamak çok daha verimlidir."]
  ],
  tools: ["meta-etiket-olustur", "url-metni-olustur", "favicon-olustur", "hreflang-olustur"],
  related: ["jpg-png-svg-farki", "url-kodlama-yuzde-20-nedir"],
  sources: [
    ["Open Graph protokolü – resmî belge", "https://ogp.me/"],
    ["Google Search Central – Başlık ve snippet yönergeleri", "https://developers.google.com/search/docs/appearance/snippet"]
  ]
};
