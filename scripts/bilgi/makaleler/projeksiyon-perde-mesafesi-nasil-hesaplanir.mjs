export default {
  slug: "projeksiyon-perde-mesafesi-nasil-hesaplanir",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Projeksiyon Perde Mesafesi Nasıl Hesaplanır? Atış Oranı ve Perde Boyu",
  pageTitle: "Projeksiyon Mesafesi Hesaplama: Atış Oranı ve Perde Boyu",
  description: "Projeksiyon mesafesi = atış oranı × görüntü genişliği. 100 inç 16:9 perde 221,4 cm geniştir; 1,5 atış oranıyla 3,32 m mesafe gerekir. Kısa atış, izleme mesafesi, lümen.",
  keywords: ["projeksiyon mesafesi", "atış oranı nedir", "throw ratio", "100 inç perde kaç metre", "projeksiyon perde boyutu", "kısa atış projeksiyon", "ev sineması perde", "projeksiyon kaç metre uzağa konmalı"],
  lead: "Projeksiyon cihazının perdeden uzaklığı, <strong>cihazın atış oranının (throw ratio) görüntü genişliğiyle çarpılmasıyla</strong> bulunur. Örneğin 16:9 biçiminde 100 inçlik bir perdenin genişliği 221,4 cm'dir; atış oranı 1,5 olan bir cihaz bu görüntüyü vermek için perdeden yaklaşık 3,32 m uzağa konmalıdır. Atış oranı cihazın teknik özelliklerinde yazar. Bu yazıda inç cinsinden perde boyunu genişlik ve yüksekliğe çevirmeyi, mesafe tablosunu, kısa ve ultra kısa atış farkını, izleme mesafesini ve oda aydınlığına göre parlaklık seçimini bulacaksınız.",
  kisaCevap: [
    "Atış oranı = projeksiyon mesafesi ÷ görüntü genişliği; cihazın teknik özelliklerinde \"1,5:1\" gibi yazar.",
    "Mesafe = atış oranı × görüntü genişliği; görüntü genişliği = mesafe ÷ atış oranı.",
    "16:9 perdede genişlik = köşegen × 0,8716, yükseklik = köşegen × 0,4903; 1 inç = 2,54 cm.",
    "100 inç 16:9 perde: 221,4 × 124,5 cm; atış oranı 1,5 ise mesafe 3,32 m, 1,2 ise 2,66 m.",
    "Atış oranı 1'in altındaki cihazlar kısa atış, 0,4'ün altındakiler ultra kısa atış sayılır; ultra kısa atış cihazlar perdenin hemen dibine konur.",
    "Zoom'lu cihazlarda atış oranı bir aralıktır (ör. 1,3–1,6); mesafe de buna göre bir aralık olur."
  ],
  figure: {
    alt: "Yandan görünüm: projeksiyon cihazından 100 inç 16:9 perdeye ışın konisi. Perde genişliği 221,4 cm, atış oranı 1,5 ile mesafe 3,32 m. Altta kısa atış 0,5 ile 1,11 m ve ultra kısa atış 0,25 ile 0,55 m karşılaştırması.",
    caption: "Aynı 100 inçlik görüntü için gereken mesafe atış oranıyla doğru orantılıdır. Mesafe objektifin ön yüzünden perdeye ölçülür.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">100 inç (16:9) perde için mesafe</text>
  <rect x="610" y="60" width="16" height="200" class="ps sb"/>
  <text x="652" y="70" class="sm b">Perde</text>
  <text x="652" y="88" class="sm">genişlik</text>
  <text x="652" y="106" class="sm b p">221,4 cm</text>
  <text x="652" y="130" class="sm">yükseklik</text>
  <text x="652" y="148" class="sm b">124,5 cm</text>
  <polygon points="130,160 610,60 610,260" class="ps"/>
  <rect x="80" y="144" width="56" height="32" rx="6" class="p"/>
  <circle cx="134" cy="160" r="8" class="sf sb"/>
  <text x="108" y="200" class="sm mid b">Cihaz</text>
  <line x1="134" y1="280" x2="610" y2="280" class="sp sw" fill="none"/>
  <line x1="134" y1="270" x2="134" y2="290" class="sp sw" fill="none"/>
  <line x1="610" y1="270" x2="610" y2="290" class="sp sw" fill="none"/>
  <text x="372" y="302" class="b mid p">Mesafe = 1,5 × 2,214 m = 3,32 m</text>
  <g>
    <text x="20" y="342" class="sm b">Atış oranı</text>
    <text x="150" y="342" class="sm b">Mesafe (100 inç)</text>
    <rect x="270" y="330" width="380" height="16" class="p"/><text x="660" y="343" class="sm">3,32 m</text>
    <text x="20" y="364" class="sm">1,5 (standart)</text>
    <rect x="270" y="352" width="304" height="16" class="ps sb"/><text x="584" y="365" class="sm">1,2 → 2,66 m</text>
    <text x="20" y="386" class="sm">0,5 (kısa)</text>
    <rect x="270" y="374" width="127" height="16" class="oks sb"/><text x="407" y="387" class="sm">1,11 m</text>
    <text x="20" y="408" class="sm">0,25 (ultra kısa)</text>
    <rect x="270" y="396" width="63" height="16" class="oks sb"/><text x="343" y="409" class="sm">0,55 m</text>
  </g>
</svg>`
  },
  sections: [
    {
      h: "Atış oranı (throw ratio) nedir?",
      p: [
        "Atış oranı, projeksiyon cihazının objektifinden perdeye olan mesafenin, perdede oluşan görüntünün genişliğine oranıdır. Teknik özelliklerde genellikle \"1,5:1\" ya da \"throw ratio 1.50\" biçiminde yazılır. 1,5:1 atış oranı, cihaz perdeden 1,5 m uzaktayken 1 m genişliğinde görüntü oluşturur demektir; 3 m uzaktayken görüntü 2 m genişliğe çıkar.",
        "Atış oranı objektifin optik yapısına bağlıdır ve her cihazda farklıdır. Sabit objektifli cihazlarda tek bir değerdir; optik zoom'lu cihazlarda ise \"1,3–1,6\" gibi bir aralık olarak verilir. Dijital zoom ise görüntüyü yalnızca kırpıp büyüttüğü için atış oranını değiştirmez, çözünürlüğü düşürür. Cihaz seçerken ya da yerleştirirken hesaba katılacak değer optik atış oranıdır.",
        "Atış oranı ne kadar küçükse cihaz perdeye o kadar yakın konabilir. Bu yüzden küçük odalarda düşük, büyük salonlarda daha yüksek atış oranlı cihazlar tercih edilir."
      ],
      formula: "Atış oranı = mesafe ÷ görüntü genişliği\nMesafe = atış oranı × görüntü genişliği\nGörüntü genişliği = mesafe ÷ atış oranı"
    },
    {
      h: "Perde boyutu inçten cm'ye nasıl çevrilir? 16:9 perdede genişlik ve yükseklik",
      p: [
        "Perde ve görüntü boyutları genellikle köşegen uzunluğuyla, inç cinsinden verilir. 1 inç tam olarak 2,54 cm'dir. Ancak mesafe hesabı için köşegen değil genişlik gerekir. Genişlik ve yükseklik, en-boy oranı ve Pisagor teoremiyle bulunur: 16:9 oranında köşegen birimi √(16² + 9²) = √337 ≈ 18,36'dır. Genişlik köşegenin 16 ÷ 18,36 ≈ 0,8716'sı, yükseklik 9 ÷ 18,36 ≈ 0,4903'üdür."
      ],
      formula: "Köşegen (cm) = inç × 2,54\n16:9 → genişlik = köşegen × 0,8716 · yükseklik = köşegen × 0,4903\n4:3 → genişlik = köşegen × 0,8 · yükseklik = köşegen × 0,6",
      table: {
        head: ["Perde (16:9)", "Köşegen", "Genişlik", "Yükseklik"],
        rows: [
          ["80 inç", "203,2 cm", "177,1 cm", "99,6 cm"],
          ["100 inç", "254,0 cm", "221,4 cm", "124,5 cm"],
          ["120 inç", "304,8 cm", "265,7 cm", "149,4 cm"],
          ["150 inç", "381,0 cm", "332,1 cm", "186,8 cm"]
        ],
        caption: "Aynı köşegende 4:3 perde daha dar ama daha yüksektir: 100 inç 4:3 perde 203,2 × 152,4 cm'dir."
      },
      after: [
        "İnç ile santimetre arasında hızlı çeviri için [[arac:cm-inc-cevir|Cm İnç Çevirici]], farklı oranlarda genişlik ve yükseklik bulmak için [[arac:en-boy-orani-hesapla|En Boy Oranı Hesaplama]] aracını kullanabilirsiniz. Televizyon ekranlarında aynı hesabın nasıl yapıldığını [[bilgi:1-inc-kac-cm-tv-ekran-boyutu|1 inç kaç cm, TV ekran boyutu]] yazısında, 16:9 oranının anlamını [[bilgi:en-boy-orani-16-9-ne-demek|16:9 ne demek]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "100 inç perde için mesafe nasıl hesaplanır? Adım adım",
      ol: [
        "Perde boyutunu ve oranını belirleyin: 100 inç, 16:9.",
        "Köşegeni santimetreye çevirin: 100 × 2,54 = 254 cm.",
        "Genişliği bulun: 254 × 0,8716 ≈ 221,4 cm = 2,214 m.",
        "Cihazın atış oranını teknik özelliklerden alın: örnek 1,5.",
        "Mesafeyi hesaplayın: 1,5 × 2,214 ≈ 3,32 m. Bu mesafe objektifin ön yüzünden perdeye ölçülür.",
        "Zoom'lu cihazda aralığı hesaplayın: atış oranı 1,3–1,6 ise mesafe 2,88–3,54 m arasında herhangi bir yer olabilir."
      ],
      after: [
        "Ters yönde de hesap yapabilirsiniz: odanızda cihazı perdeden 3 m uzağa koyabiliyorsanız ve atış oranı 1,5 ise görüntü genişliği 3 ÷ 1,5 = 2 m olur. Bu genişlik 16:9'da 2 ÷ 0,8716 ≈ 2,295 m köşegene, yani yaklaşık 90 inçe karşılık gelir. İki yönlü hesabı [[arac:projeksiyon-mesafesi-hesapla|Projeksiyon Mesafesi Hesaplama]] aracıyla yapabilirsiniz; araç görüntü genişliğini, yüksekliğini ve cihaz sınıfını da gösterir."
      ]
    },
    {
      h: "Perde boyutuna ve atış oranına göre mesafe tablosu",
      table: {
        head: ["Perde (16:9)", "Atış 0,25", "Atış 0,5", "Atış 1,2", "Atış 1,5"],
        rows: [
          ["80 inç", "0,44 m", "0,89 m", "2,13 m", "2,66 m"],
          ["100 inç", "0,55 m", "1,11 m", "2,66 m", "3,32 m"],
          ["120 inç", "0,66 m", "1,33 m", "3,19 m", "3,98 m"],
          ["150 inç", "0,83 m", "1,66 m", "3,98 m", "4,98 m"]
        ],
        caption: "Ultra kısa atış cihazlarda üretici mesafeyi çoğu zaman perde yüzeyinden ya da cihazın arka yüzünden verir; kurulumda üretici tablosunu esas alın."
      },
      after: [
        "Tabloyu oda planınızla karşılaştırın: cihazın konacağı yerin arkasında kablo ve havalandırma için en az birkaç santimetre boşluk kalmalı, izleyicilerin başı ışın yolunu kesmemelidir. Tavana monte edilecek cihazlarda mesafe yatay olarak ölçülür."
      ]
    },
    {
      h: "Çözümlü örnek: 3,5 metrelik odada perde ve cihaz seçimi",
      p: [
        "Oturma odanız 3,5 m derinliğinde olsun. Perde bir duvarda, kanepe karşı duvarın önünde duruyor ve cihazı kanepenin arkasındaki rafa, perdeden 3,1 m uzağa koyabiliyorsunuz. Atış oranı 1,5 olan bir cihazla görüntü genişliği 3,1 ÷ 1,5 ≈ 2,07 m olur; bu da 16:9'da yaklaşık 2,07 ÷ 0,8716 ≈ 2,37 m köşegen, yani yaklaşık 93 inç eder.",
        "100 inçlik bir perde istiyorsanız 3,32 m mesafe gerekir ve raf yetmez. Bu durumda atış oranı en fazla 3,1 ÷ 2,214 ≈ 1,40 olan bir cihaz seçmeniz gerekir. Kanepe perdeden yaklaşık 3 m uzakta kaldığı için izleme mesafesi de 100 inç perde genişliğinin yaklaşık 1,35 katıdır; bu, sürükleyici ama rahat bir izleme aralığıdır."
      ]
    },
    {
      h: "Kısa atış ve ultra kısa atış farkı nedir?",
      p: [
        "Atış oranına göre projeksiyon cihazları genellikle üç gruba ayrılır. Kesin sınırlar üreticiden üreticiye biraz değişse de yaygın sınıflama şöyledir:"
      ],
      table: {
        head: ["Sınıf", "Atış oranı", "100 inç için mesafe", "Tipik kullanım"],
        rows: [
          ["Standart (uzun) atış", "1 ve üstü", "2,2 m ve üstü", "Salon, toplantı odası, tavana montaj"],
          ["Kısa atış", "0,4–1", "Yaklaşık 0,9–2,2 m", "Küçük oda, sınıf, oyun"],
          ["Ultra kısa atış", "0,4'ün altı", "Perdenin dibinden birkaç on cm", "Dolap üstü, duvar dibine yerleşim"]
        ]
      },
      after: [
        "Kısa atış cihazların avantajı, önünden geçen kişilerin gölge yapma ihtimalinin azalması ve küçük odalarda büyük görüntü elde edilmesidir. Ultra kısa atış cihazlar ise perdenin hemen altına yerleştirildiği için duvar ya da perde yüzeyindeki küçük dalgalanmaları belirgin gösterebilir; düz ve gergin bir perde ile kullanılmaları önerilir. Ayrıca bu cihazlar perdeye çok dik açıyla yansıttığı için cihazın perdeye göre konumu milimetre düzeyinde önem taşır."
      ]
    },
    {
      h: "İzleme mesafesi perde boyuna göre nasıl seçilir?",
      p: [
        "İzleme mesafesi, izleyicinin perdeye olan uzaklığıdır ve cihaz mesafesinden farklıdır. Sinema ve yayın standartları görüş açısına göre öneriler verir: yaygın bir yaklaşım, perdenin izleyicinin görüş alanında en az 30 derecelik bir açı kaplamasıdır; bu da izleme mesafesinin perde genişliğinin yaklaşık 1,6 katı olması anlamına gelir. Daha sürükleyici bir deneyim isteyenler 36–40 derecelik açıyı, yani genişliğin yaklaşık 1,2–1,4 katını tercih eder.",
        "Örnek: 221,4 cm genişliğindeki 100 inçlik perde için izleme mesafesi 1,6 × 2,214 ≈ 3,5 m, daha yakın tercih edenler için yaklaşık 2,7–3,1 m'dir. Çözünürlük de etkilidir: yüksek çözünürlüklü görüntülerde piksel yapısı daha yakından fark edilmez, bu yüzden perdeye daha yakın oturulabilir. Çözünürlük türleri ve piksel sayıları için [[bilgi:4k-kac-piksel-cozunurluk-turleri|4K kaç piksel]] yazısına bakabilirsiniz.",
        "Perdenin yüksekliği de unutulmamalıdır: oturan izleyicinin göz hizası genellikle perdenin alt üçte birine denk gelecek şekilde ayarlanırsa boyun zorlanmaz."
      ]
    },
    {
      h: "Oda karanlık değilse lümen değeri ne olmalı? Kurulumda dikkat edilecekler",
      p: [
        "Projeksiyon parlaklığı genellikle ANSI lümen ile verilir. Gereken parlaklık oda ışığına, perde boyuna ve perdenin yansıtma özelliğine bağlıdır. Aynı lümen değeri küçük perdede daha parlak, büyük perdede daha sönük görünür; çünkü ışık daha geniş alana yayılır. Tamamen karartılabilen bir ev sinemasında orta düzey parlaklık yeterli olurken, perdeleri kapatılamayan toplantı odalarında ve aydınlık sınıflarda çok daha yüksek lümen değeri gerekir. Kesin değer için üreticinin oda ve perde boyutuna göre verdiği öneriyi esas alın.",
        "Ortam ışığını perdeye düşürmemek, parlaklığı artırmak kadar etkilidir. Pencere karşısına perde koymaktan kaçının ve tavandan perdeye doğrudan ışık gelmeyecek şekilde aydınlatmayı yönlendirin. Ortam aydınlatmasının lüks ve lümen ilişkisi [[bilgi:oda-icin-kac-lumen-gerekir|oda için kaç lümen gerekir]] yazısında anlatılır."
      ],
      ul: [
        "<strong>Dik hizalama:</strong> Cihazı perdenin merkez hattına dik yerleştirin; açılı kurulum görüntüyü yamuk yapar.",
        "<strong>Keystone yerine lens kaydırma:</strong> Dijital keystone düzeltmesi görüntüyü küçülterek çözünürlük kaybettirir; cihazda optik lens kaydırma varsa onu tercih edin.",
        "<strong>Montaj yüksekliği:</strong> Cihazın görüntüyü merkez hattının ne kadar üstüne ya da altına attığı (ofset) teknik özelliklerde yazar; tavan montajında bu değere göre yükseklik seçin.",
        "<strong>Havalandırma:</strong> Cihazın hava giriş ve çıkış delikleri kapalı kalmamalıdır; dolap içine yerleştirilen cihazlar ısınabilir.",
        "<strong>Kablo planı:</strong> Mesafe arttıkça görüntü kablosu uzar; uzun kablolarda sinyal kaybını önlemek için uygun kablo seçin."
      ]
    }
  ],
  faq: [
    ["Projeksiyon cihazı perdeden kaç metre uzağa konmalı?", "Mesafe, cihazın atış oranının görüntü genişliğiyle çarpılmasıyla bulunur. 16:9 biçiminde 100 inçlik perde 221,4 cm geniştir; atış oranı 1,5 olan cihaz için mesafe yaklaşık 3,32 m, 1,2 olan cihaz için 2,66 m olur."],
    ["Atış oranı (throw ratio) nedir?", "Atış oranı, objektiften perdeye olan mesafenin perdedeki görüntü genişliğine oranıdır. 1,5:1 değeri, cihaz 1,5 m uzaktayken 1 m genişliğinde görüntü oluşturduğunu gösterir. Değer cihazın teknik özelliklerinde yazar."],
    ["100 inç perde için mesafe nasıl hesaplanır?", "100 inç 2,54 ile çarpılarak 254 cm köşegen bulunur. 16:9 perdede genişlik köşegenin 0,8716 katı, yani 221,4 cm'dir. Bu genişlik atış oranıyla çarpılır; 1,5 atış oranı için mesafe yaklaşık 3,32 m çıkar."],
    ["Perde boyutu inçten cm'ye nasıl çevrilir?", "İnç değeri 2,54 ile çarpılarak köşegen santimetreye çevrilir. Genişlik ve yükseklik için en-boy oranı kullanılır; 100 inçlik perdenin köşegeni 254 cm'dir ve 16:9 oranında 221,4 × 124,5 cm boyutlarına karşılık gelir."],
    ["16:9 perdede genişlik ve yükseklik nasıl bulunur?", "Köşegen 0,8716 ile çarpılarak genişlik, 0,4903 ile çarpılarak yükseklik bulunur. Bu katsayılar 16 ve 9'un, 16 ve 9'un karelerinin toplamının kareköküne yani yaklaşık 18,36'ya bölünmesiyle elde edilir."],
    ["Kısa atış ve ultra kısa atış farkı nedir?", "Atış oranı yaklaşık 0,4 ile 1 arasındaki cihazlar kısa atış, 0,4'ün altındakiler ultra kısa atış sayılır. Kısa atış cihaz 100 inç görüntüyü yaklaşık 1 ile 2 m'den, ultra kısa atış cihaz perdenin hemen dibinden verir."],
    ["İzleme mesafesi perde boyuna göre nasıl seçilir?", "Yaygın öneri, perdenin görüş alanında en az 30 derece kaplamasıdır; bu, izleme mesafesinin perde genişliğinin yaklaşık 1,6 katı olması demektir. 100 inçlik perde için bu yaklaşık 3,5 m eder; daha sürükleyici izleme için mesafe kısaltılabilir."],
    ["Oda karanlık değilse lümen değeri ne olmalı?", "Aydınlık odada ortam ışığı görüntüyü soldurduğu için karanlık odaya göre çok daha yüksek ANSI lümen gerekir. Perde büyüdükçe ihtiyaç artar. Üreticinin oda ve perde boyutuna göre verdiği öneriyi esas alın ve perdeye doğrudan ışık düşmesini engelleyin."]
  ],
  tools: ["projeksiyon-mesafesi-hesapla", "en-boy-orani-hesapla", "cm-inc-cevir"],
  related: ["en-boy-orani-16-9-ne-demek", "1-inc-kac-cm-tv-ekran-boyutu", "oda-icin-kac-lumen-gerekir", "4k-kac-piksel-cozunurluk-turleri"],
  sources: [
    ["BIPM – SI uzunluk birimi ve dönüşümler", "https://www.bipm.org/en/measurement-units"],
    ["Türk Standardları Enstitüsü", "https://www.tse.org.tr/"]
  ]
};
