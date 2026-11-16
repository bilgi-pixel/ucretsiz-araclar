export default {
  slug: "kible-yonu-nasil-bulunur",
  kategori: "gunluk",
  tarih: "2026-11-15",
  title: "Kıble Yönü Nasıl Bulunur? Pusula Açısı, Koordinat ve Büyük Daire Hesabı",
  pageTitle: "Kıble Yönü Nasıl Bulunur? Kıble Açısı ve Pusula Hesabı",
  description: "Kıble açısı, bulunduğunuz yerden Kâbe'ye giden büyük dairenin coğrafi kuzeyle yaptığı açıdır. Formül, İstanbul ve Ankara örneği, manyetik sapma ve güneşle yön bulma.",
  keywords: ["kıble yönü nasıl bulunur", "kıble açısı hesaplama", "pusula ile kıble", "istanbul kıble açısı", "kıble saati", "manyetik sapma", "kabeye mesafe", "büyük daire hesabı"],
  lead: "Kıble yönü matematiksel olarak, bulunduğunuz noktadan Kâbe'ye (yaklaşık 21,4225° K, 39,8262° D) giden <strong>en kısa yolun</strong>, yani büyük dairenin, coğrafi kuzeyle saat yönünde yaptığı açıdır. Bu açı küresel trigonometriyle iki noktanın enlem ve boylamından hesaplanır; örneğin İstanbul'dan yaklaşık 151,6°, Ankara'dan 160,2°'dir. Pusula ise coğrafi kuzeyi değil manyetik kuzeyi gösterdiği için okunan değere bölgenin manyetik sapması uygulanmalıdır. Bu sayfada hesabın mantığını, şehir örneklerini, telefon pusulasının sınırlarını ve güneşle yön bulmayı anlatıyoruz. Dinî konulardaki sorularınız için Diyanet İşleri Başkanlığı'nın kıble tespitini ve görevlilerini esas alın.",
  kisaCevap: [
    "Kıble açısı, bulunduğunuz yerden Kâbe'ye giden büyük dairenin coğrafi (gerçek) kuzeye göre saat yönündeki başlangıç açısıdır.",
    "Formül: θ = atan2( sin Δλ · cos φ₂ , cos φ₁ · sin φ₂ − sin φ₁ · cos φ₂ · cos Δλ ); φ enlem, λ boylam.",
    "Coğrafi kuzeye göre yaklaşık değerler: İstanbul 151,6°, İzmir 143,7°, Ankara 160,2°, Diyarbakır 181,3°.",
    "Pusula manyetik kuzeyi gösterir; Türkiye'de manyetik sapma doğuya doğrudur ve birkaç derecedir, bu yüzden pusulada okunacak açı birkaç derece küçük çıkar.",
    "Kâbe'ye büyük daire mesafesi yaklaşık olarak İstanbul'dan 2.405 km, Ankara'dan 2.162 km, Diyarbakır'dan 1.834 km'dir.",
    "Güneşin Kâbe'nin tam üstünde olduğu yılda iki günde, dik bir çubuğun gölgesinin tersi kıble yönünü gösterir."
  ],
  figure: {
    alt: "Pusula gülü üzerinde İstanbul için kıble yönü: coğrafi kuzeyden saat yönünde 151,6 derece. Manyetik kuzey birkaç derece doğuda gösterilmiş ve pusulada okunacak değer daha küçük. Yanda dört şehrin kıble açısı ve Kâbe'ye mesafesi.",
    caption: "Kıble açısı coğrafi kuzeyden ölçülür. Pusula iğnesi manyetik kuzeyi gösterdiği için, sapma doğuya doğru olan Türkiye'de pusulada okunacak açı coğrafi açıdan sapma kadar küçüktür. Değerler büyük daire hesabıyla bulunmuştur.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="p"/></marker></defs>
  <text x="360" y="28" class="lg b mid">Kıble açısı: kuzeyden saat yönünde</text>
  <circle cx="190" cy="220" r="150" class="sf sb"/>
  <circle cx="190" cy="220" r="4" class="p"/>
  <line x1="190" y1="220" x2="190" y2="74" class="st sw" fill="none"/>
  <text x="190" y="62" class="b mid">K (coğrafi)</text>
  <line x1="190" y1="220" x2="205" y2="76" class="sa dash" fill="none"/>
  <text x="214" y="88" class="sm">manyetik K</text>
  <text x="340" y="225" class="sm">D 90°</text><text x="190" y="390" class="sm mid">G 180°</text><text x="22" y="225" class="sm">B 270°</text>
  <line x1="190" y1="220" x2="261" y2="352" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <path d="M190 140 A80 80 0 0 1 228 290" class="sp" fill="none"/>
  <text x="250" y="190" class="b p">151,6°</text>
  <text x="270" y="372" class="b">Kâbe yönü</text>
  <text x="190" y="246" class="sm mid mu">İstanbul</text>
  <rect x="380" y="56" width="320" height="250" rx="10" class="sf sb"/>
  <text x="396" y="82" class="b">Şehir</text><text x="560" y="82" class="b end">Açı</text><text x="684" y="82" class="b end">Mesafe</text>
  <line x1="396" y1="92" x2="684" y2="92" class="sb" fill="none"/>
  <g class="sm">
    <text x="396" y="120">İstanbul</text><text x="560" y="120" class="end">151,6°</text><text x="684" y="120" class="end">2.405 km</text>
    <text x="396" y="150">İzmir</text><text x="560" y="150" class="end">143,7°</text><text x="684" y="150" class="end">2.246 km</text>
    <text x="396" y="180">Ankara</text><text x="560" y="180" class="end">160,2°</text><text x="684" y="180" class="end">2.162 km</text>
    <text x="396" y="210">Trabzon</text><text x="560" y="210" class="end">179,7°</text><text x="684" y="210" class="end">2.177 km</text>
    <text x="396" y="240">Diyarbakır</text><text x="560" y="240" class="end">181,3°</text><text x="684" y="240" class="end">1.834 km</text>
    <text x="396" y="270">Van</text><text x="560" y="270" class="end">191,1°</text><text x="684" y="270" class="end">1.929 km</text>
  </g>
  <text x="396" y="294" class="sm mu">Coğrafi kuzeye göre, il merkezi koordinatı</text>
  <rect x="380" y="320" width="320" height="84" rx="10" class="ps"/>
  <text x="396" y="346" class="b">Pusulada okunacak açı</text>
  <text x="396" y="370" class="sm">= coğrafi açı − doğu sapması</text>
  <text x="396" y="392" class="sm">Sapma yere ve yıla göre değişir.</text>
</svg>`
  },
  sections: [
    {
      h: "Kıble yönü neden düz bir haritada çizilerek bulunmaz?",
      p: [
        "Dünya küre biçimindedir ve iki nokta arasındaki en kısa yol, kürenin merkezinden geçen düzlemin yüzeyle kesişiminden oluşan <strong>büyük daire</strong> yayıdır. Uçakların uzun uçuşlarda düz haritada kavisli görünen rotalar izlemesinin nedeni de budur. Kıble yönünün hesaplanmasında yaygın kabul gören yöntem, bulunduğunuz noktadan Kâbe'ye giden bu en kısa yolun başlangıç doğrultusunu bulmaktır.",
        "Düz bir haritada iki noktayı cetvelle birleştirmek ise farklı bir doğrultu verir; harita projeksiyonuna göre fark birkaç dereceye ulaşabilir. Örneğin Ankara için büyük daire açısı yaklaşık 160,2° iken basit bir düzlem yaklaşımı 162° civarında bir değer verir. Mesafe kısaldıkça fark azalır, uzaklaştıkça büyür.",
        "Bu sayfa yalnızca yön hesabının matematiğini anlatır. Kıble ile ilgili dinî hükümler, sapma payının ne kadar olabileceği ve ibadete ilişkin diğer konular için Diyanet İşleri Başkanlığı'nın kıble tespitine ve din görevlilerine başvurun."
      ]
    },
    {
      h: "Kıble açısı nasıl hesaplanır? Büyük daire formülü",
      p: [
        "Hesap için iki noktanın enlem (φ) ve boylamı (λ) yeterlidir. Birinci nokta sizin konumunuz, ikinci nokta Kâbe'dir. Diyanet'in kıble sayfasında Kâbe için verilen koordinat yaklaşık 21,4225° K, 39,8262° D'dir. Başlangıç açısı (θ) şu bağıntıyla bulunur:"
      ],
      formula: "Δλ = λ₂ − λ₁\ny = sin Δλ × cos φ₂\nx = cos φ₁ × sin φ₂ − sin φ₁ × cos φ₂ × cos Δλ\nθ = atan2(y, x), sonuç 0–360° aralığına getirilir",
      after: [
        "Buradaki atan2 fonksiyonu, y ve x'in işaretine bakarak açının hangi çeyrekte olduğunu doğru belirler; sıradan arktanjant bunu yapamaz. Sonuç negatif çıkarsa 360 eklenir. Açı coğrafi kuzeyden saat yönünde ölçülür: 90° doğu, 180° güney, 270° batıdır. Trigonometri fonksiyonlarının değerleri için [[bilgi:trigonometri-sin-cos-tan-tablosu|sin, cos, tan tablosu]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Çözümlü örnek: Ankara'dan kıble açısı",
      p: [
        "Ankara için yaklaşık koordinat 39,9334° K, 32,8597° D olsun. Kâbe 21,4225° K, 39,8262° D."
      ],
      ol: [
        "Boylam farkı: Δλ = 39,8262 − 32,8597 = 6,9665°.",
        "y = sin(6,9665°) × cos(21,4225°) ≈ 0,1213 × 0,9309 ≈ 0,1129.",
        "x = cos(39,9334°) × sin(21,4225°) − sin(39,9334°) × cos(21,4225°) × cos(6,9665°) ≈ 0,7668 × 0,3652 − 0,6419 × 0,9309 × 0,9926 ≈ −0,3131.",
        "θ = atan2(0,1129; −0,3131). x negatif, y pozitif olduğu için açı ikinci çeyrektedir: θ ≈ 160,2°.",
        "Sonuç: Ankara'dan kıble, coğrafi kuzeyden saat yönünde yaklaşık 160,2°, yani güneyin yaklaşık 20° doğusudur."
      ],
      after: [
        "Aynı yöntemle İstanbul için 151,6°, İzmir için 143,7°, Diyarbakır için 181,3° bulunur. Batıdaki şehirler Kâbe'yi daha doğuda, güneydoğu yönünde; doğudaki şehirler ise neredeyse tam güneyde ya da güneyin biraz batısında görür. Koordinatlarınızı derece-dakika-saniye olarak biliyorsanız önce ondalığa çevirmeniz gerekir; ayrıntısı [[bilgi:enlem-boylam-derece-dakika-saniye-nasil-okunur|enlem ve boylam nasıl okunur]] yazısında."
      ]
    },
    {
      h: "Türkiye'deki bazı şehirler için kıble açısı",
      table: {
        head: ["Şehir", "Coğrafi kuzeye göre açı", "Kâbe'ye büyük daire mesafesi", "Kabaca yön"],
        rows: [
          ["İstanbul", "151,6°", "≈ 2.405 km", "Güneydoğu"],
          ["Edirne", "147,0°", "—", "Güneydoğu"],
          ["İzmir", "143,7°", "≈ 2.246 km", "Güneydoğu"],
          ["Ankara", "160,2°", "≈ 2.162 km", "Güney-güneydoğu"],
          ["Adana", "164,7°", "—", "Güney-güneydoğu"],
          ["Trabzon", "179,7°", "≈ 2.177 km", "Güney"],
          ["Diyarbakır", "181,3°", "≈ 1.834 km", "Güney"],
          ["Van", "191,1°", "≈ 1.929 km", "Güney-güneybatı"]
        ],
        caption: "Değerler il merkezlerinin yaklaşık koordinatlarıyla hesaplanmıştır; aynı il içinde ilçeler arasında bir iki derece fark olabilir."
      }
    },
    {
      h: "Manyetik kuzey ile coğrafi kuzey farkı sonucu etkiler mi?",
      p: [
        "Evet. Pusula iğnesi Dünya'nın manyetik alanına göre yönlenir ve <strong>manyetik kuzeyi</strong> gösterir. Hesapladığımız kıble açısı ise coğrafi (gerçek) kuzeye göredir. İki kuzey arasındaki açıya <strong>manyetik sapma</strong> denir ve yere ve yıla göre değişir. Türkiye'de sapma doğuya doğrudur ve batıdan doğuya birkaç derece arasında değişir; yıllar içinde yavaşça artmaktadır.",
        "Doğuya sapma olduğunda pusulada okunması gereken açı, coğrafi açıdan sapma kadar küçüktür. Örneğin İstanbul için coğrafi açı 151,6° iken güncel manyetik modelle hesaplanan pusula açısı 145–147° civarındadır. Diyanet'in il sayfalarında verilen tam sayı kıble açılarının da manyetik sapma düşülmüş pusula açısıyla uyumlu olduğu görülür; küçük farklar kullanılan sapma modelinden ve yuvarlamadan kaynaklanabilir."
      ],
      formula: "Pusula açısı = coğrafi açı − doğu sapması\n(batı sapmasında sapma eklenir)"
    },
    {
      h: "Telefon pusulası ne kadar güvenilirdir?",
      p: [
        "Telefonlardaki pusula, küçük bir manyetometre sensörüyle çalışır ve çevredeki manyetik etkilere çok duyarlıdır. Doğru kullanıldığında birkaç derecelik doğruluk verebilir, ama aşağıdaki durumlarda sapma kolayca 10–20 dereceye çıkabilir:"
      ],
      ul: [
        "Telefonun yakınında hoparlör, mıknatıslı kılıf, dizüstü bilgisayar ya da metal masa varsa.",
        "Betonarme binada demir donatıya, kalorifer peteğine ya da elektrik panosuna yakın duruluyorsa.",
        "Sensör uzun süredir kalibre edilmediyse; telefonu havada sekiz çizer gibi hareket ettirmek çoğu cihazda kalibrasyonu yeniler.",
        "Telefon yere paralel tutulmuyorsa.",
        "Uygulama manyetik sapmayı otomatik uygulamıyor ve siz bunu bilmiyorsanız."
      ],
      after: [
        "Güvenilirliği artırmak için ölçümü açık alanda, metal eşyalardan uzakta yapın ve birkaç kez tekrarlayın. [[arac:kible-yonu-bul|Kıble Yönü Bulma aracı]] il, ilçe ya da koordinatla coğrafi açıyı, manyetik sapması düzeltilmiş pusula açısını ve Kâbe'ye mesafeyi hesaplar; telefonda canlı pusula da sunar. Konumunuz cihazınızdan çıkmaz."
      ]
    },
    {
      h: "Güneşin konumuyla kıble nasıl bulunur?",
      p: [
        "Pusulaya güvenmediğiniz durumlarda güneş güvenilir bir yön göstericidir. İki yöntem vardır."
      ],
      ul: [
        "<strong>Güneşin Kâbe üzerinde olduğu anlar:</strong> Yılda iki gün, mayıs sonu ve temmuz ortasında, Mekke'de öğle vaktinde güneş Kâbe'nin neredeyse tam tepesine gelir. 2027 için bu anlar yaklaşık 28 Mayıs 12.18 ve 16 Temmuz 12.27'dir (Türkiye saati). Bu anda Türkiye'de yere dik dikilmiş bir çubuğun gölgesinin tersi Kâbe yönünü gösterir.",
        "<strong>Kıble saati:</strong> Her gün güneşin kıble doğrultusunda göründüğü bir an vardır. Bu anda güneşe dönen kişi kıbleye dönmüş olur. Diyanet, il sayfalarında günlük \"Kıble Zamanı\" bilgisini yayımlar; Kıble Yönü Bulma aracı da bu anı hesaplar."
      ],
      after: [
        "Güneşle yön bulmanın avantajı, manyetik etkilerden tamamen bağımsız olmasıdır. Dezavantajı ise yalnızca belirli anlarda ve açık havada kullanılabilmesidir. Bir odada kıble yönünü kalıcı olarak işaretlemek istiyorsanız güneş yöntemiyle bir kez belirleyip duvara ya da tavana işaret koymak pratik bir yoldur."
      ]
    },
    {
      h: "Kâbe'ye mesafe nasıl hesaplanır?",
      p: [
        "İki nokta arasındaki büyük daire mesafesi en sık <strong>Haversine</strong> formülüyle hesaplanır. Dünya ortalama 6.371 km yarıçaplı bir küre kabul edilir. Formül, iki noktanın enlem ve boylam farklarından merkez açısını, merkez açısından da yay uzunluğunu verir."
      ],
      formula: "a = sin²(Δφ ÷ 2) + cos φ₁ × cos φ₂ × sin²(Δλ ÷ 2)\nd = 2 × R × arcsin(√a), R = 6.371 km",
      after: [
        "Ankara için a ≈ 0,0285 bulunur ve d ≈ 2 × 6.371 × arcsin(0,1688) ≈ 2.162 km çıkar. Bu, kuş uçuşu en kısa mesafedir; karayolu ya da hava yolu rotaları daha uzundur. Dünya tam küre olmadığı için elipsoit modelleriyle yapılan hesaplar birkaç kilometre farklı sonuç verebilir. Şehirler arası benzer hesaplar için [[rehber:iki-sehir-arasi-mesafe-hesaplama|iki şehir arası mesafe rehberine]] bakabilirsiniz."
      ]
    },
    {
      h: "Koordinatlar derece-dakika-saniyeden ondalığa nasıl çevrilir?",
      p: [
        "Formüller ondalık derece ister. Koordinatınız 39° 55′ 12″ gibi derece-dakika-saniye biçimindeyse dakikayı 60'a, saniyeyi 3.600'e bölüp dereceye ekleyin: 39 + 55 ÷ 60 + 12 ÷ 3.600 = 39,92°. Güney enlemleri ve batı boylamları eksi işaretle yazılır. Dönüşümü elle yapmak yerine [[arac:dms-ondalik-derece-cevir|Derece Dakika Saniye – Ondalık Derece Çevirici]] kullanabilirsiniz; haritacılıkta kullanılan grad birimi için de [[arac:derece-grad-cevir|Derece Grad Çevirici]] mevcuttur.",
        "Kıble hesabında koordinattaki küçük hatalar sonucu çok az etkiler: konumun 1 km kayması, Türkiye'den bakıldığında açıyı derecenin onda birinden daha az değiştirir. Asıl hata kaynağı genellikle pusulanın kendisidir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Coğrafi açıyı pusulada doğrudan okumak:</strong> Manyetik sapma uygulanmazsa yön birkaç derece kayar.",
        "<strong>Düz haritada cetvelle yön çizmek:</strong> Harita projeksiyonu nedeniyle büyük daire doğrultusundan farklı sonuç verir.",
        "<strong>Telefonu metal masa üstünde kullanmak:</strong> Manyetik etki sensörü saptırır; ölçümü açık alanda tekrarlayın.",
        "<strong>Saat yönünü karıştırmak:</strong> Kıble açısı kuzeyden saat yönünde ölçülür; 160° güneyin 20° doğusudur, batısı değil.",
        "<strong>Başka şehrin değerini kullanmak:</strong> Türkiye'nin batısı ile doğusu arasında kıble açısı 40 dereceye yakın fark eder."
      ]
    }
  ],
  faq: [
    ["Kıble yönü pusulayla nasıl bulunur?", "Önce bulunduğunuz yerin coğrafi kuzeye göre kıble açısını öğrenin, bölgenin manyetik sapmasını uygulayarak pusula açısını bulun. Pusulayı yere paralel tutup kuzeyi ayarlayın ve bu açıyı saat yönünde ölçün; metal eşyalardan uzak durun."],
    ["Kıble açısı nasıl hesaplanır?", "Bulunduğunuz nokta ile Kâbe'nin enlem ve boylamı büyük daire başlangıç açısı formülüne konur: θ = atan2(sin Δλ · cos φ₂, cos φ₁ · sin φ₂ − sin φ₁ · cos φ₂ · cos Δλ). Sonuç coğrafi kuzeyden saat yönündeki açıdır."],
    ["İstanbul'dan kıble kaç derecedir?", "İstanbul il merkezi için coğrafi kuzeye göre yaklaşık 151,6 derecedir. Pusulada okunacak değer manyetik sapma nedeniyle birkaç derece daha küçüktür; Diyanet'in il sayfasındaki kıble açısı bilgisini de esas alabilirsiniz."],
    ["Manyetik kuzey ile coğrafi kuzey farkı sonucu etkiler mi?", "Evet. Pusula manyetik kuzeyi gösterir, hesaplanan açı ise coğrafi kuzeye göredir. Türkiye'de sapma doğuya doğru birkaç derecedir; pusulada okunacak açı coğrafi açıdan bu kadar küçük olur."],
    ["Telefon pusulası ne kadar güvenilirdir?", "Açık alanda ve kalibre edilmiş bir telefonda birkaç derecelik doğruluk verebilir. Mıknatıslı kılıf, metal eşya ve betonarme yapılar yakınında sapma 10–20 dereceyi bulabilir; ölçümü birkaç kez tekrarlayın."],
    ["Güneşin konumuyla kıble nasıl bulunur?", "Güneşin yılda iki kez Kâbe'nin tam üstüne geldiği anlarda dik bir çubuğun gölgesinin tersi kıbleyi gösterir. Ayrıca her gün güneşin kıble doğrultusunda olduğu kıble saatinde güneşe dönmek kıbleye dönmek demektir."],
    ["Kâbe'ye mesafe nasıl hesaplanır?", "Haversine formülüyle iki noktanın enlem ve boylamından büyük daire mesafesi bulunur; Dünya yarıçapı 6.371 km alınır. Ankara'dan yaklaşık 2.162 km, İstanbul'dan yaklaşık 2.405 km çıkar."],
    ["Koordinatlar derece-dakika-saniyeden ondalığa nasıl çevrilir?", "Ondalık derece = derece + dakika ÷ 60 + saniye ÷ 3.600 formülü kullanılır. Örneğin 39° 55′ 12″ yaklaşık 39,92° eder; güney enlemi ve batı boylamı eksi işaretle yazılır."],
    ["Kıble konusunda dinî bilgiyi nereden almalıyım?", "Bu sayfa yalnızca yön hesabının matematiğini anlatır. Kıble ve ibadetle ilgili dinî sorularınız için Diyanet İşleri Başkanlığı'nın yayımladığı bilgileri ve bölgenizdeki din görevlilerini esas alın."]
  ],
  tools: ["kible-yonu-bul", "dms-ondalik-derece-cevir", "derece-grad-cevir"],
  related: ["enlem-boylam-derece-dakika-saniye-nasil-okunur", "trigonometri-sin-cos-tan-tablosu", "hicri-takvim-nedir"],
  sources: [
    ["Diyanet İşleri Başkanlığı – Namaz vakitleri ve kıble", "https://namazvakitleri.diyanet.gov.tr/"],
    ["NOAA NCEI – World Magnetic Model (manyetik sapma)", "https://www.ncei.noaa.gov/products/world-magnetic-model"]
  ]
};
