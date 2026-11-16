export default {
  slug: "css-gradient-nasil-yapilir",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "CSS Gradient Nasıl Yapılır? linear-gradient, radial-gradient ve Renk Tonları",
  pageTitle: "CSS Gradient Nasıl Yapılır? linear ve radial-gradient Örnekleri",
  description: "CSS'te renk geçişi linear-gradient, radial-gradient ve conic-gradient ile yapılır. Açı, renk durakları, gradient metin, okunabilirlik ve box-shadow.",
  keywords: ["css gradient", "linear-gradient", "radial-gradient", "conic-gradient", "css geçişli arka plan", "renk durakları", "gradient metin css", "css box-shadow", "border-radius", "renk tonu oluşturma"],
  lead: "CSS'te gradient (renk geçişi), <code>background</code> özelliğine <code>linear-gradient()</code>, <code>radial-gradient()</code> ya da <code>conic-gradient()</code> fonksiyonu yazılarak yapılır; örneğin <code>background: linear-gradient(90deg, #7b2331, #e9a23b);</code> soldan sağa bordodan altına geçen bir arka plan çizer. Gradient bir resim dosyası değil, tarayıcının hesapladığı bir görüntüdür; bu yüzden her ekran boyutunda keskin kalır ve sayfayı ağırlaştırmaz. Bu sayfada açı ve yön yazımını, renk duraklarını, dairesel geçişi, gradient metni, okunabilirlik kuralını ve sıkça birlikte kullanılan box-shadow ile border-radius yazımını örneklerle bulacaksınız.",
  kisaCevap: [
    "Doğrusal geçiş: linear-gradient(açı, renk1, renk2); 0deg aşağıdan yukarı, 90deg soldan sağa, 180deg (varsayılan) yukarıdan aşağı gider.",
    "Yön anahtar kelimeyle de yazılabilir: to right, to bottom right gibi.",
    "Dairesel geçiş: radial-gradient(circle, renk1, renk2) merkezden dışa doğru yayılır; konum için \"at 30% 40%\" eklenir.",
    "Renk durağı, rengin hangi noktada tam olarak görüneceğini belirler: linear-gradient(red 0%, yellow 50%, green 100%).",
    "Aynı noktaya iki durak yazmak (red 50%, blue 50%) yumuşak geçiş yerine keskin bir çizgi oluşturur.",
    "Gradient üstündeki yazı, geçişin en açık ve en koyu noktasında da WCAG AA için en az 4,5:1 kontrast vermelidir."
  ],
  figure: {
    alt: "CSS linear-gradient açılarının pusula gibi gösterimi: 0 derece yukarı, 90 derece sağa, 180 derece aşağı, 270 derece sola. Yanında üç renk duraklı bir şerit ve durak yüzdeleri.",
    caption: "Açı, geçişin gittiği yönü gösterir: 0deg aşağıdan yukarıya, 90deg soldan sağa, 180deg yukarıdan aşağıya. Sağdaki şerit, %0, %50 ve %100 noktalarına yerleştirilmiş üç renk durağını ve aynı noktaya iki durak yazılınca oluşan keskin çizgiyi gösterir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="uc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="p"/></marker>
  </defs>
  <text x="360" y="28" class="lg b mid">Açı ve renk durakları</text>
  <circle cx="170" cy="200" r="120" class="sf sb"/>
  <line x1="170" y1="200" x2="170" y2="96" class="sp sw" fill="none" marker-end="url(#uc)"/>
  <line x1="170" y1="200" x2="274" y2="200" class="sp sw" fill="none" marker-end="url(#uc)"/>
  <line x1="170" y1="200" x2="170" y2="304" class="sp sw" fill="none" marker-end="url(#uc)"/>
  <line x1="170" y1="200" x2="66" y2="200" class="sp sw" fill="none" marker-end="url(#uc)"/>
  <text x="170" y="70" class="b mid">0deg · to top</text>
  <text x="300" y="186" class="b">90deg</text><text x="300" y="206" class="sm mu">to right</text>
  <text x="170" y="342" class="b mid">180deg · to bottom (varsayılan)</text>
  <text x="40" y="186" class="b end">270deg</text><text x="40" y="206" class="sm mu end">to left</text>
  <rect x="380" y="70" width="80" height="60" class="p"/>
  <rect x="460" y="70" width="80" height="60" class="ps"/>
  <rect x="540" y="70" width="80" height="60" class="ps"/>
  <rect x="620" y="70" width="80" height="60" class="sf sb"/>
  <line x1="390" y1="100" x2="690" y2="100" class="st sw" fill="none" marker-end="url(#uc)"/>
  <text x="540" y="152" class="sm mid">90deg: bordodan açık tona soldan sağa</text>
  <text x="380" y="196" class="b">Üç durak</text>
  <rect x="380" y="208" width="107" height="40" class="p"/>
  <rect x="487" y="208" width="106" height="40" class="ps"/>
  <rect x="593" y="208" width="107" height="40" class="oks"/>
  <g class="sm mid"><text x="380" y="266">0%</text><text x="540" y="266">50%</text><text x="700" y="266">100%</text></g>
  <text x="380" y="304" class="b">Aynı noktada iki durak = keskin çizgi</text>
  <rect x="380" y="316" width="160" height="40" class="p"/>
  <rect x="540" y="316" width="160" height="40" class="oks"/>
  <line x1="540" y1="310" x2="540" y2="362" class="st dash" fill="none"/>
  <text x="540" y="382" class="sm mid">bordo 50%, yeşil 50%</text>
</svg>`
  },
  sections: [
    {
      h: "CSS gradient nedir, nerede kullanılır?",
      p: [
        "Gradient, iki ya da daha fazla rengin bir yüzey boyunca yumuşakça birbirine geçmesidir. CSS'te gradient bir renk değil, <strong>görüntü</strong> türüdür. Bu yüzden <code>color</code> özelliğine değil, <code>background</code>, <code>background-image</code>, <code>border-image</code> ya da <code>mask-image</code> gibi görüntü kabul eden özelliklere yazılır.",
        "Eskiden geçişli arka planlar için ince bir resim dosyası hazırlanıp tekrarlatılırdı. Bugün tarayıcılar gradienti kendisi hesaplar: ek dosya indirilmez, görüntü her ekran çözünürlüğünde keskin kalır ve renkleri değiştirmek için tek satırı düzenlemek yeterlidir. Düğmeler, kartlar, sayfa başlıkları, yükleme çubukları ve fotoğraf üstü karartmalar en yaygın kullanım alanlarıdır.",
        "Üç temel gradient fonksiyonu vardır: düz bir çizgi boyunca ilerleyen <code>linear-gradient</code>, bir merkezden dışa yayılan <code>radial-gradient</code> ve bir merkez çevresinde saat yönünde dönen <code>conic-gradient</code>. Her birinin tekrarlanan sürümü de (<code>repeating-linear-gradient</code> gibi) çizgili desenler için kullanılır."
      ]
    },
    {
      h: "linear-gradient açı ve yön nasıl belirlenir?",
      p: [
        "Doğrusal geçişin ilk parametresi yöndür. Yön yazılmazsa varsayılan <code>to bottom</code>, yani yukarıdan aşağıya geçiştir. Yönü iki yolla verebilirsiniz: anahtar kelimeyle ya da açıyla."
      ],
      formula: "background: linear-gradient(yön, renk1, renk2, …);\nÖrnek: linear-gradient(135deg, #7b2331, #e9a23b)",
      table: {
        head: ["Yazım", "Geçiş yönü", "Not"],
        rows: [
          ["to top / 0deg", "Aşağıdan yukarıya", "Açı ölçüsü yukarıyı 0 kabul eder"],
          ["to right / 90deg", "Soldan sağa", "Saat yönünde artar"],
          ["to bottom / 180deg", "Yukarıdan aşağıya", "Varsayılan değer"],
          ["to left / 270deg", "Sağdan sola", "-90deg ile aynıdır"],
          ["to bottom right", "Sol üst köşeden sağ alt köşeye", "Kutunun en-boy oranına göre açı değişir"],
          ["135deg", "Sol üstten sağ alta doğru, sabit açı", "Kutunun oranından bağımsızdır"]
        ]
      },
      after: [
        "İki yazım arasındaki ince fark köşegenlerde ortaya çıkar. <code>to bottom right</code> geçişi her zaman tam köşeden köşeye çizer; geniş bir kutuda açı yataya yaklaşır. <code>135deg</code> ise kutu ne kadar geniş olursa olsun 135 derecelik sabit bir açıyla ilerler. Tasarımın farklı ekran genişliklerinde tutarlı görünmesini istiyorsanız açı yazmak daha öngörülebilir sonuç verir."
      ]
    },
    {
      h: "Renk durakları (color stops) nasıl kullanılır?",
      p: [
        "Her renkten sonra isteğe bağlı bir konum yazabilirsiniz. Bu konum, o rengin tam olarak hangi noktada göründüğünü belirler; aradaki bölge iki renk arasında yumuşakça karışır. Konum yazılmazsa duraklar eşit aralıklarla dağıtılır: üç renkte %0, %50 ve %100."
      ],
      ul: [
        "<code>linear-gradient(90deg, #7b2331 0%, #f3dfe2 50%, #2e7d4f 100%)</code>: üç renk, ortada açık ton.",
        "<code>linear-gradient(90deg, #7b2331 30%, #2e7d4f 70%)</code>: ilk %30 düz bordo, %30–70 arası geçiş, son %30 düz yeşil.",
        "<code>linear-gradient(90deg, #7b2331 50%, #2e7d4f 50%)</code>: iki durak aynı noktada olduğu için geçiş yok, keskin bir ayrım çizgisi var.",
        "<code>linear-gradient(90deg, #7b2331, 25%, #2e7d4f)</code>: renk ipucu (hint); geçişin orta noktasını %25'e kaydırır."
      ],
      after: [
        "Keskin duraklar, çizgili desenler ve ilerleme çubukları için çok kullanışlıdır. Örneğin <code>repeating-linear-gradient(45deg, #eee 0 10px, #ddd 10px 20px)</code> çapraz çizgili bir zemin çizer. Durak konumları yüzde yerine piksel ya da rem ile de yazılabilir; birimlerin farkı için [[bilgi:px-rem-em-farki-css|px, rem ve em farkı]] yazısına göz atabilirsiniz."
      ]
    },
    {
      h: "radial-gradient ile linear-gradient farkı",
      p: [
        "Doğrusal geçiş bir çizgi boyunca, dairesel geçiş ise bir merkezden dışa doğru ilerler. <code>radial-gradient</code> varsayılan olarak kutunun ortasından başlayan bir <strong>elips</strong> çizer; kutu kare değilse şekil de basıklaşır. Tam daire için <code>circle</code> anahtar kelimesini yazmanız gerekir."
      ],
      formula: "radial-gradient(şekil boyut at konum, renk1, renk2)\nÖrnek: radial-gradient(circle at 30% 40%, #f3dfe2, #7b2331)",
      table: {
        head: ["Özellik", "linear-gradient", "radial-gradient", "conic-gradient"],
        rows: [
          ["Geçiş yönü", "Düz çizgi boyunca", "Merkezden dışa", "Merkez çevresinde döner"],
          ["Temel parametre", "Açı ya da yön", "Şekil, boyut, merkez", "Başlangıç açısı, merkez"],
          ["Tipik kullanım", "Arka plan, düğme, başlık", "Işık parlaması, vurgu, gölgeli köşe", "Pasta grafiği, renk çarkı"],
          ["Varsayılan", "Yukarıdan aşağıya", "Ortada elips", "Yukarıdan saat yönünde"]
        ]
      },
      after: [
        "Boyut anahtar kelimeleri dairenin nereye kadar uzanacağını belirler: <code>closest-side</code> en yakın kenara, <code>farthest-corner</code> (varsayılan) en uzak köşeye kadar. <code>conic-gradient</code> ile keskin duraklar kullanarak basit pasta grafikleri bile çizebilirsiniz; bunun hesap mantığı [[bilgi:pasta-grafigi-nasil-yapilir|pasta grafiği]] yazısında anlatılıyor."
      ]
    },
    {
      h: "Bir rengin açık ve koyu tonları nasıl üretilir?",
      p: [
        "Güzel bir gradient genellikle birbirine yakın tonlardan oluşur; birbirinden çok uzak iki doygun renk ortada bulanık, gri bir bölge yaratabilir. Bu yüzden önce ana renginizden açık ve koyu tonlar türetip gradienti bu tonlarla kurmak daha uyumlu sonuç verir.",
        "Ton üretmenin en anlaşılır yolu renk karıştırmaktır: ana rengi beyazla karıştırmak açık ton (tint), siyahla karıştırmak koyu ton (shade) verir. HSL renk modelinde aynı işlemi açıklık (lightness) değerini artırıp azaltarak da yapabilirsiniz; ton (hue) sabit kaldığı için renk ailesi korunur. Renk kodlarının mantığı için [[bilgi:hex-rgb-renk-kodlari-nedir|HEX ve RGB renk kodları]] yazısına bakabilirsiniz.",
        "[[arac:renk-tonu-olustur|Renk Tonları Oluşturma aracı]] tek bir renkten eşit adımlı açık ve koyu tonlar üretir ve HEX kodlarını CSS değişkenleri olarak hazır verir. Bir fotoğraftan ya da logodan renk almak isterseniz [[arac:renk-secici|Renk Seçici]] resimdeki baskın renklerden palet çıkarır."
      ]
    },
    {
      h: "Gradient metin nasıl yapılır?",
      p: [
        "Yazının kendisini geçişli göstermek için gradient metnin arka planına uygulanır, sonra arka plan yalnızca harflerin içinde kalacak şekilde kırpılır ve yazı rengi saydam yapılır:"
      ],
      formula: "background: linear-gradient(90deg, #7b2331, #e9a23b);\n-webkit-background-clip: text; background-clip: text;\ncolor: transparent;",
      after: [
        "Bu teknikte dikkat edilmesi gereken üç nokta vardır. Birincisi, desteklemeyen bir ortamda yazı tamamen görünmez olabilir; bu yüzden önce düz bir <code>color</code> değeri tanımlayıp gradienti destek kontrolüyle eklemek güvenlidir. İkincisi, ekran okuyucular yazıyı normal okur ama yüksek kontrast modunda gradient kaybolabilir. Üçüncüsü, gradient metin yalnızca büyük başlıklarda iyi görünür; küçük gövde metninde okunabilirliği düşürür."
      ]
    },
    {
      h: "Gradient arka planda yazı okunabilirliği nasıl korunur?",
      p: [
        "Düz bir arka planda kontrastı bir kez ölçmek yeterlidir. Gradientte ise arka plan rengi yazının altında değiştiği için kontrastı <strong>en kötü noktada</strong> ölçmeniz gerekir: açık yazı kullanıyorsanız gradientin en açık noktasında, koyu yazı kullanıyorsanız en koyu noktasında. WCAG 2 kurallarına göre normal metin için en az 4,5:1, büyük metin (yaklaşık 24 piksel ya da 19 piksel kalın) için en az 3:1 oran gerekir. Kuralların ayrıntısı [[bilgi:renk-kontrasti-wcag-nedir|WCAG renk kontrastı]] yazısında anlatılıyor."
      ],
      ol: [
        "Gradientin iki uç rengini belirleyin.",
        "[[arac:renk-kontrast-hesapla|Renk Kontrast Hesaplama aracında]] yazı rengini her iki uçla ayrı ayrı ölçün.",
        "Düşük olan değer eşiğin altındaysa uç rengi koyulaştırın ya da yazının altına yarı saydam bir katman ekleyin.",
        "Fotoğraf üstündeki yazılarda <code>linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,0))</code> gibi bir karartma katmanı en güvenilir yöntemdir."
      ]
    },
    {
      h: "box-shadow ve border-radius nasıl yazılır?",
      p: [
        "Gradientli kartlar ve düğmeler çoğunlukla yuvarlatılmış köşe ve gölgeyle birlikte kullanılır. İki özelliğin yazımı kısadır ama parametre sırası karıştırılabilir."
      ],
      table: {
        head: ["Özellik", "Yazım", "Anlamı"],
        rows: [
          ["border-radius", "border-radius: 12px;", "Dört köşe 12 piksel yuvarlak"],
          ["border-radius", "border-radius: 12px 0 12px 0;", "Sol üst, sağ üst, sağ alt, sol alt sırasıyla"],
          ["border-radius", "border-radius: 50%;", "Kare kutuyu daireye çevirir"],
          ["box-shadow", "box-shadow: 0 4px 12px rgba(0,0,0,.15);", "Yatay 0, dikey 4px, bulanıklık 12px, yarı saydam siyah"],
          ["box-shadow", "box-shadow: 0 0 0 3px #7b2331;", "Bulanıklıksız, 3px yayılan çerçeve (odak halkası)"],
          ["box-shadow", "box-shadow: inset 0 2px 4px rgba(0,0,0,.2);", "İç gölge, basılı görünüm"]
        ]
      },
      after: [
        "box-shadow parametre sırası şöyledir: isteğe bağlı <code>inset</code>, yatay kayma, dikey kayma, bulanıklık, yayılma ve renk. Virgülle ayırarak birden çok gölgeyi üst üste koyabilirsiniz. [[arac:css-gradient|CSS Gradient, Gölge ve Köşe Yuvarlama Oluşturucu]], doğrusal, radyal ve konik gradienti, gölgeyi ve köşe yuvarlamayı canlı önizlemeyle ayarlayıp kodu kopyalamanızı sağlar."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Gradienti color özelliğine yazmak:</strong> Gradient bir görüntüdür; background ya da background-image kullanın.",
        "<strong>Birbirine çok uzak renkler seçmek:</strong> Tamamlayıcı renkler ortada gri, çamurlu bir bölge yaratabilir; araya bir ara durak ekleyin.",
        "<strong>Kontrastı tek noktada ölçmek:</strong> Gradientin en açık ve en koyu ucunu ayrı ayrı ölçün.",
        "<strong>Gradient metinde yedek renk tanımlamamak:</strong> Desteklemeyen ortamda yazı görünmez olur.",
        "<strong>to bottom right ile sabit açıyı karıştırmak:</strong> Farklı ekran genişliklerinde geçişin açısı değişir."
      ]
    }
  ],
  faq: [
    ["CSS'te gradient (renk geçişi) nasıl yapılır?", "background özelliğine linear-gradient, radial-gradient ya da conic-gradient fonksiyonu yazılır. Örneğin background: linear-gradient(90deg, #7b2331, #e9a23b); soldan sağa bordodan altına geçen bir arka plan oluşturur."],
    ["linear-gradient açı ve yön nasıl belirlenir?", "İlk parametre olarak açı ya da yön yazılır. 0deg aşağıdan yukarı, 90deg soldan sağa, 180deg yukarıdan aşağı gider; to right ya da to bottom right gibi anahtar kelimeler de kullanılabilir."],
    ["radial-gradient ile linear-gradient farkı nedir?", "linear-gradient renkleri düz bir çizgi boyunca, radial-gradient ise bir merkezden dışa doğru daire ya da elips şeklinde geçirir. Dairesel geçişte merkez konumu at 30% 40% gibi yazılır."],
    ["Renk durakları (color stops) nasıl kullanılır?", "Her rengin yanına yüzde ya da uzunluk yazarak rengin tam görüneceği noktayı belirlersiniz. Aynı noktaya iki farklı renk yazmak yumuşak geçiş yerine keskin bir ayrım çizgisi oluşturur."],
    ["Bir rengin açık ve koyu tonları nasıl üretilir?", "Ana rengi beyazla karıştırarak açık, siyahla karıştırarak koyu tonlar elde edebilir ya da HSL modelinde açıklık değerini değiştirebilirsiniz. Renk Tonları Oluşturma aracı eşit adımlı tonları HEX olarak verir."],
    ["Gradient metin nasıl yapılır?", "Gradient metnin arka planına uygulanır, background-clip: text ile harflerin içine kırpılır ve color: transparent yazılır. Desteklemeyen ortamlarda yazının görünmesi için önce düz bir renk tanımlayın."],
    ["Gradient arka planda yazı okunabilirliği nasıl korunur?", "Yazı rengini gradientin hem en açık hem en koyu ucuyla ayrı ayrı ölçün. Normal metin için iki ölçüm de en az 4,5:1 olmalıdır; yetmiyorsa uç rengi koyulaştırın ya da yarı saydam bir katman ekleyin."],
    ["box-shadow ve border-radius nasıl yazılır?", "border-radius: 12px; köşeleri yuvarlar, 50% kare kutuyu daireye çevirir. box-shadow: 0 4px 12px rgba(0,0,0,.15); sırasıyla yatay kayma, dikey kayma, bulanıklık ve rengi verir."],
    ["Gradient sayfayı yavaşlatır mı?", "Hayır, gradient bir resim dosyası indirilmeden tarayıcı tarafından çizilir ve genellikle eşdeğer bir görselden daha hafiftir. Yalnızca çok büyük alanlarda sürekli hareket eden animasyonlu gradientler işlemciyi yorabilir."]
  ],
  tools: ["css-gradient", "renk-tonu-olustur", "renk-secici", "renk-kontrast-hesapla"],
  related: ["hex-rgb-renk-kodlari-nedir", "renk-kontrasti-wcag-nedir", "px-rem-em-farki-css"],
  sources: [
    ["W3C – CSS Images Module Level 3 (gradientler)", "https://www.w3.org/TR/css-images-3/"],
    ["W3C – WCAG 2.2 kontrast ölçütü", "https://www.w3.org/TR/WCAG22/"]
  ]
};
