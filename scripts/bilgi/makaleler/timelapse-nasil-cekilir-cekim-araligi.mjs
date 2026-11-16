export default {
  slug: "timelapse-nasil-cekilir-cekim-araligi",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Timelapse Nasıl Çekilir? Çekim Aralığı, Kare Sayısı ve Video Süresi",
  pageTitle: "Timelapse Nasıl Çekilir? Çekim Aralığı ve Kare Sayısı Hesabı",
  description: "Timelapse nasıl çekilir, çekim aralığı kaç saniye olmalı? 10 saniyelik video için kaç fotoğraf gerekir, fps, depolama, titreme ve hyperlapse farkı, hesaplı örneklerle.",
  keywords: ["timelapse nasıl çekilir", "timelapse çekim aralığı", "timelapse kaç fotoğraf", "hyperlapse farkı", "gün batımı timelapse", "telefonla timelapse", "timelapse fps", "timelapse flicker"],
  lead: "Timelapse, bir sahnenin belirli aralıklarla çekilen fotoğraflarının art arda video olarak oynatılmasıdır; çekim aralığı = olayın süresi ÷ gereken kare sayısı, gereken kare sayısı = video süresi × kare hızı (fps) formülüyle bulunur. Örneğin 1 saatlik gün batımını 25 fps'lik 10 saniyelik videoya sığdırmak için 250 kare ve 14,4 saniyelik aralık gerekir. Bu yazıda konuya göre aralık seçimini, depolama hesabını, pozlama titremesini önlemeyi ve telefonla çekimi örneklerle anlatıyoruz.",
  kisaCevap: [
    "Gereken kare sayısı = video süresi (sn) × fps; 25 fps'te 10 saniyelik video 250 kare ister.",
    "Çekim aralığı = olayın süresi (sn) ÷ kare sayısı; 1 saatlik olay ve 250 kare için 3.600 ÷ 250 = 14,4 sn.",
    "Hızlı bulutlar ve kalabalık için 1–3 sn, gün batımı için 3–10 sn, yıldızlar için pozlama süresi + 2–5 sn aralık yaygın başlangıç değerleridir.",
    "Hızlanma oranı = çekim aralığı × fps; 5 sn aralık ve 30 fps ile zaman 150 kat hızlanır.",
    "Gün doğumu ve batımında otomatik pozlama titreme (flicker) yapar; manuel mod ve sabit beyaz dengesi kullanın.",
    "Hyperlapse'te kamera kareler arasında yer değiştirir; timelapse'te kamera sabittir."
  ],
  figure: {
    alt: "Timelapse hesabı: 1 saatlik gün batımı, 25 fps ve 10 saniyelik video için 250 kare ve 14,4 saniye çekim aralığı; konuya göre önerilen aralık çubukları.",
    caption: "Üstte hesap zinciri: istenen video süresi ve fps kare sayısını, olayın süresi ise aralığı belirler. Altta konuya göre yaygın başlangıç aralıkları; değerler sahnedeki hareket hızına göre ayarlanmalıdır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Çekim aralığı nasıl bulunur?</text>
  <g class="mid">
    <rect x="20" y="52" width="150" height="70" rx="8" class="sf sb"/><text x="95" y="80" class="sm t2">Video süresi</text><text x="95" y="106" class="lg b">10 sn</text>
    <text x="185" y="94" class="lg b p">×</text>
    <rect x="200" y="52" width="130" height="70" rx="8" class="sf sb"/><text x="265" y="80" class="sm t2">Kare hızı</text><text x="265" y="106" class="lg b">25 fps</text>
    <text x="345" y="94" class="lg b p">=</text>
    <rect x="360" y="52" width="130" height="70" rx="8" class="ps"/><text x="425" y="80" class="sm">Kare sayısı</text><text x="425" y="106" class="lg b">250</text>
    <rect x="510" y="52" width="190" height="70" rx="8" class="p"/><text x="605" y="80" class="sm sf">3.600 sn ÷ 250</text><text x="605" y="106" class="lg b sf">14,4 sn aralık</text>
  </g>
  <text x="20" y="150" class="sm t2">Olay: 1 saatlik gün batımı · Hızlanma: 14,4 × 25 = 360 kat</text>
  <text x="20" y="188" class="b">Konuya göre başlangıç aralığı (saniye)</text>
  <line x1="190" y1="200" x2="190" y2="396" class="sb" fill="none"/>
  <g class="sm">
    <text x="20" y="222">Hızlı bulut, trafik</text><rect x="190" y="208" width="60" height="20" class="oks"/><text x="258" y="222">1–3</text>
    <text x="20" y="256">Kalabalık, kent</text><rect x="190" y="242" width="80" height="20" class="oks"/><text x="278" y="256">1–5</text>
    <text x="20" y="290">Gün batımı/doğumu</text><rect x="190" y="276" width="160" height="20" class="ps"/><text x="358" y="290">3–10</text>
    <text x="20" y="324">Yavaş bulut, gölge</text><rect x="190" y="310" width="220" height="20" class="ps"/><text x="418" y="324">5–15</text>
    <text x="20" y="358">Yıldızlar</text><rect x="190" y="344" width="400" height="20" class="p"/><text x="598" y="358">20–35</text>
    <text x="20" y="392">Bitki, inşaat</text><text x="198" y="392" class="b">dakikalar–saatler</text>
  </g>
</svg>`
  },
  sections: [
    {
      h: "Timelapse nedir, nasıl çalışır?",
      p: [
        "Normal video saniyede 24, 25 ya da 30 kare kaydeder ve aynı hızda oynatılır; ekranda zaman gerçek hızında akar. Timelapse'te ise kareler çok daha seyrek, örneğin her 5 saniyede bir çekilir ama yine saniyede 25 ya da 30 kare hızıyla oynatılır. Sonuçta saatler süren bir olay birkaç saniyeye sıkışır; bulutlar akar, gölgeler kayar, şehir ışıkları bir anda yanar.",
        "Timelapse iki yolla çekilebilir. Birincisi fotoğraf makinesinin aralıklı çekim (interval) özelliğiyle tek tek fotoğraf çekip bunları sonradan videoya birleştirmektir; en yüksek kaliteyi ve en fazla esnekliği bu yöntem verir. İkincisi telefon ve aksiyon kameralarındaki hazır timelapse modudur; cihaz kareleri kendisi seçip doğrudan video dosyası üretir.",
        "Her iki yöntemde de planlamanın merkezinde üç sayı vardır: olayın ne kadar süreceği, videonun kaç saniye olacağı ve videonun kaç fps oynatılacağı. Bu üç sayıdan çekim aralığı hesaplanır."
      ]
    },
    {
      h: "Kare sayısı, çekim aralığı ve hızlanma formülleri",
      formula: "Kare sayısı = video süresi (sn) × fps\nÇekim aralığı (sn) = olayın süresi (sn) ÷ kare sayısı\nGereken çekim süresi (sn) = kare sayısı × çekim aralığı\nHızlanma oranı = çekim aralığı × fps",
      p: [
        "Bu dört formül birbirinin tersidir; hangisini bildiğinize göre diğerini bulursunuz. Olay sınırlıysa (gün batımı gibi) aralık hesaplanır. Olay sürekliyse (bulutlar gibi) önce sahneye uygun aralık seçilir, sonra istenen video süresi için ne kadar çekim yapmanız gerektiği hesaplanır.",
        "Hızlanma oranı, videoda zamanın kaç kat hızlı aktığını gösterir. 2 saniyelik aralık ve 25 fps ile zaman 50 kat, 30 saniyelik aralık ve 25 fps ile 750 kat hızlanır. Hareketin akıcı görünmesi için sahnedeki nesnenin bir kareden ötekine çok fazla yer değiştirmemesi gerekir; aralık büyüdükçe hareket kesik kesik görünmeye başlar."
      ],
      table: {
        head: ["Video süresi", "24 fps", "25 fps", "30 fps"],
        rows: [
          ["5 sn", "120 kare", "125 kare", "150 kare"],
          ["10 sn", "240 kare", "250 kare", "300 kare"],
          ["20 sn", "480 kare", "500 kare", "600 kare"],
          ["30 sn", "720 kare", "750 kare", "900 kare"],
          ["60 sn", "1.440 kare", "1.500 kare", "1.800 kare"]
        ],
        caption: "Türkiye'de yayın standardı 25 fps'tir; sosyal medya ve telefonlar çoğunlukla 30 fps kullanır."
      }
    },
    {
      h: "Çözümlü örnekler",
      p: [
        "<strong>Örnek 1 – Gün batımı:</strong> Güneşin batışından alacakaranlığın bitişine kadar 1 saatlik bir süreyi 25 fps'lik 10 saniyelik videoya sığdırmak istiyorsunuz. Kare sayısı 10 × 25 = 250, aralık 3.600 ÷ 250 = 14,4 saniyedir. Pratikte aralığı 14 ya da 15 saniyeye yuvarlarsınız; 15 saniyede 240 kare çıkar ve video 9,6 saniye olur.",
        "<strong>Örnek 2 – Bulutlar:</strong> Hızlı akan bulutlar için 5 saniyelik aralık seçtiniz ve 30 fps'lik 10 saniyelik video istiyorsunuz. Kare sayısı 300, gereken çekim süresi 300 × 5 = 1.500 saniye, yani 25 dakikadır. Hızlanma 5 × 30 = 150 kattır.",
        "<strong>Örnek 3 – Yıldızlar:</strong> Her kare 25 saniyelik pozlamayla çekiliyor ve kareler arası 5 saniye bırakılıyor; aralık 30 saniyedir. 4 saatlik çekimde 4 × 3.600 ÷ 30 = 480 kare elde edilir. Bu, 25 fps'te 19,2 saniyelik video eder."
      ],
      after: [
        "Bu hesapları [[arac:timelapse-hesapla|Timelapse Hesaplama aracıyla]] tek ekranda yapabilir, aralığı değiştirip video süresinin nasıl değiştiğini anında görebilirsiniz. Kare numarasını zaman koduna çevirmeniz gerekirse [[arac:zaman-kodu-cevir|Zaman Kodu Çevirici]] işinizi görür."
      ]
    },
    {
      h: "Çekim aralığı konuya göre nasıl seçilir?",
      p: [
        "Doğru aralık, sahnedeki en önemli hareketin hızına bağlıdır. Genel kural şudur: hareket ne kadar hızlıysa aralık o kadar kısa olmalıdır. Aralık fazla kısa olursa video yavaş ve sıkıcı görünür; fazla uzun olursa hareket kopuk ve titrek olur. Aşağıdaki değerler başlangıç noktasıdır; deneme çekimiyle ayarlamak en iyisidir."
      ],
      table: {
        head: ["Konu", "Önerilen aralık", "10 sn video (25 fps) için çekim süresi"],
        rows: [
          ["Hızlı bulutlar, trafik", "1–3 sn", "4–12,5 dakika"],
          ["Yürüyen kalabalık, kent meydanı", "1–5 sn", "4–21 dakika"],
          ["Gün batımı, gün doğumu", "3–10 sn", "12,5–42 dakika"],
          ["Yavaş bulutlar, gölgelerin hareketi", "5–15 sn", "21–62,5 dakika"],
          ["Yıldızlar, Samanyolu", "20–35 sn (pozlama dahil)", "1,4–2,4 saat"],
          ["Çiçek açması, bitki büyümesi", "1–30 dk", "4 saatten günlere"],
          ["İnşaat ilerlemesi", "10 dk – 1 saat", "günler, haftalar"]
        ],
        caption: "Çekim süresi = 250 kare × aralık. Değerler yaygın uygulamaya dayanan örneklerdir."
      },
      after: [
        "Gece çekimlerinde aralık her zaman pozlama süresinden uzun olmalıdır. Makine 25 saniyelik pozlamayı kaydetmeden yeni kareye geçemez; aralığı 25 saniye yaparsanız kareler atlanır. Pozlama süresine en az 2–5 saniye kayıt payı ekleyin."
      ]
    },
    {
      h: "Kare hızı (fps) ve video süresi ilişkisi",
      p: [
        "Aynı kareleri farklı fps ile oynatmak video süresini değiştirir. 300 kare 30 fps'te 10 saniye, 25 fps'te 12 saniye, 24 fps'te 12,5 saniye sürer. Yani çekimi bitirdikten sonra bile fps seçerek videoyu biraz uzatıp kısaltabilirsiniz; ancak fps düştükçe hareket daha az akıcı görünür.",
        "Videonun nerede yayınlanacağını baştan düşünmek gerekir. Televizyon yayını ve Avrupa standardında 25 fps, sinema görünümü için 24 fps, sosyal medya ve telefonlarda çoğunlukla 30 fps kullanılır. Çekim aralığını hesaplarken hedef fps'i kullanın; sonradan değiştirdiğinizde hızlanma oranı da değişir.",
        "Hareketi daha yumuşak göstermek için uzun pozlama da kullanılabilir. Fotoğraf videosunda yaygın olan \"180 derece kuralı\" (enstantane ≈ aralığın yarısı) timelapse'te hareket bulanıklığı yaratarak kesik görünümü azaltır. Gündüz bu kadar uzun pozlama için ışığı azaltmanız gerekir; bunun yolu [[bilgi:nd-filtre-nedir-uzun-pozlama-suresi|ND filtre]] kullanmaktır."
      ]
    },
    {
      h: "Depolama alanı ne kadar gerekir?",
      p: [
        "Fotoğrafla timelapse çekerken depolama ihtiyacı kare sayısı × tek fotoğraf boyutudur. 24 megapiksellik bir makinede bir RAW dosyası yaklaşık 25 MB, yüksek kaliteli JPEG yaklaşık 8 MB tutar (örnek değerler). 300 karelik bir çekim RAW olarak 7,5 GB, JPEG olarak 2,4 GB yer kaplar. Uzun yıldız çekimlerinde 480 kare RAW yaklaşık 12 GB eder.",
        "Çekim bittikten sonra kareler videoya birleştirilir. 10 saniyelik 4K videonun boyutu seçilen bit hızına bağlıdır: 100 Mbps'de 100 × 10 ÷ 8 = 125 MB'tır. Bu hesap için [[arac:video-boyutu-hesapla|Video Boyutu Hesaplama]] aracını, bit hızının boyuta etkisi için [[bilgi:video-dosya-boyutu-ve-bitrate|video dosya boyutu ve bitrate]] yazısını kullanabilirsiniz.",
        "Kartın dolması kadar pilin bitmesi de çekimi yarıda bırakır. Uzun çekimlerde yedek pil, harici güç ya da powerbank planlayın; soğuk havada pil kapasitesi belirgin biçimde azalır."
      ]
    },
    {
      h: "Pozlama titremesi (flicker) nasıl önlenir?",
      p: [
        "Timelapse videolarında en sık görülen kusur karelerin parlaklığının hafifçe değişip videonun titremesidir. Bunun iki ana nedeni vardır: otomatik pozlama ve otomatik beyaz dengesinin her karede farklı karar vermesi ve diyafram mekanizmasının her çekimde milimetrik farklı kapanması.",
        "Sabit ışıklı sahnelerde (gündüz bulutlar, gece yıldızları) tamamen manuel mod kullanın: diyafram, enstantane, ISO, beyaz dengesi ve netlik sabit olsun. Otomatik netlemeyi kapatın, aksi hâlde makine her karede yeniden netleyebilir. Diyafram titremesini azaltmak için bazı fotoğrafçılar objektifi en açık değerde ya da tam açık değere yakın kullanır.",
        "Gün batımı gibi ışığın 8–10 stop değiştiği geçişlerde manuel pozlama sahneyi sonunda karartır. Burada iki yol vardır: pozlamayı belirli aralıklarla küçük adımlarla elle değiştirip farkı düzenleme yazılımıyla yumuşatmak ya da makinenin pozlama yumuşatma özelliğini kullanmak. Pozlama değerinin (EV) nasıl değiştiğini [[arac:pozlama-hesapla|Pozlama Hesaplama aracıyla]] izleyebilir, temel kavramlar için [[bilgi:diyafram-enstantane-iso-nedir|diyafram, enstantane ve ISO]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Telefonla timelapse çekerken dikkat edilecekler",
      ul: [
        "<strong>Sabitlik:</strong> Telefonu bir tripoda ya da sabit bir yüzeye yerleştirin; elde çekilen timelapse sarsıntıdan kullanılamaz hâle gelir.",
        "<strong>Uçak modu:</strong> Gelen arama ya da bildirim çekimi kesebilir; uçak modunu açın, ekran parlaklığını düşürün.",
        "<strong>Güç:</strong> 30 dakikadan uzun çekimlerde telefonu şarja bağlayın.",
        "<strong>Pozlama kilidi:</strong> Ekrana uzun basarak netlik ve pozlamayı kilitleyin; titremeyi azaltır.",
        "<strong>Hazır mod sınırı:</strong> Telefonların timelapse modu aralığı çoğu zaman kendisi belirler ve çekim uzadıkça aralığı artırır. Aralığı kontrol etmek istiyorsanız aralıklı fotoğraf çeken bir uygulama kullanın.",
        "<strong>Lens temizliği ve yoğuşma:</strong> Gece ve sabah çekimlerinde lens buğulanabilir; çekimden önce telefonu dış ortam sıcaklığına alıştırın."
      ]
    },
    {
      h: "Hyperlapse ile timelapse arasındaki fark",
      p: [
        "Timelapse'te kamera yerinde durur, zaman hızlanır. Hyperlapse'te ise kamera her karede birkaç adım ya da birkaç metre ilerler; izleyici hem zamanın hızlandığını hem de mekânın içinde ilerlediğini görür. Bir caddede yürüyerek ya da bir binanın etrafında dönerek çekilen hızlandırılmış videolar hyperlapse'tir.",
        "Hyperlapse daha fazla planlama ister: her karede kamerayı aynı yüksekliğe, aynı noktaya bakacak şekilde konumlamak gerekir. Sonradan yazılımla sabitleme yapılsa da kare kare dikkatli çekim sonucu belirgin biçimde iyileştirir. Telefonların hyperlapse modu ise elde yürürken çekilen videoyu hızlandırıp sabitleyerek benzer bir etki üretir.",
        "Çekim aralığı hesabı her iki teknikte de aynıdır. Hyperlapse'te ek olarak kareler arası adım mesafesi belirlenir: 100 metrelik bir yolu 250 karede yürüyecekseniz her kare arasında 40 cm ilerlemeniz gerekir."
      ]
    }
  ],
  faq: [
    ["Timelapse nedir?", "Timelapse, bir sahnenin belirli aralıklarla çekilen fotoğraflarının normal video hızında art arda oynatılmasıyla elde edilen hızlandırılmış videodur. Saatler süren bulut hareketi ya da gün batımı birkaç saniyede izlenir."],
    ["Çekim aralığı konuya göre nasıl seçilir?", "Sahnedeki hareket ne kadar hızlıysa aralık o kadar kısa seçilir. Hızlı bulut ve trafik için 1–3 saniye, gün batımı için 3–10 saniye, yıldızlar için pozlama süresine 2–5 saniye eklenmiş aralık yaygın başlangıç değerleridir."],
    ["10 saniyelik video için kaç fotoğraf gerekir?", "Video süresini fps ile çarpın: 25 fps'te 250, 30 fps'te 300, 24 fps'te 240 fotoğraf gerekir. Kenarlardan kırpma ya da geçiş için yüzde 10 kadar fazla kare çekmek iyi bir alışkanlıktır."],
    ["Bulut, gün batımı ve yıldız çekimlerinde aralık kaç saniye olmalı?", "Hızlı bulutlarda 1–5 saniye, yavaş bulutlarda 5–15 saniye, gün batımında 3–10 saniye kullanılır. Yıldız çekiminde her kare 20–30 saniye pozlandığı için aralık pozlama süresinden 2–5 saniye uzun, yani genellikle 25–35 saniye olur."],
    ["Kare hızı (fps) video süresini nasıl belirler?", "Video süresi kare sayısının fps'e bölünmesiyle bulunur. 300 kare 30 fps'te 10 saniye, 25 fps'te 12 saniye sürer. Fps düştükçe video uzar ama hareket daha az akıcı görünür."],
    ["Depolama alanı ne kadar gerekir?", "Kare sayısını tek fotoğrafın boyutuyla çarpın. Örneğin 25 MB'lık RAW dosyalarla 300 kare 7,5 GB, 8 MB'lık JPEG'lerle 2,4 GB tutar. Birleştirilen 10 saniyelik 4K video 100 Mbps bit hızında yaklaşık 125 MB olur."],
    ["Telefonla timelapse çekerken nelere dikkat edilir?", "Telefonu tripoda sabitleyin, uçak modunu açın, uzun çekimlerde şarja bağlayın ve pozlama ile netliği kilitleyin. Hazır modlar aralığı kendisi seçtiği için aralığı kontrol etmek istiyorsanız aralıklı çekim yapan bir uygulama kullanın."],
    ["Pozlama titremesi (flicker) nasıl önlenir?", "Diyafram, enstantane, ISO, beyaz dengesi ve netliği manuel olarak sabitleyin. Gün batımı gibi ışığın hızla değiştiği sahnelerde pozlamayı küçük adımlarla değiştirip farkı düzenleme yazılımıyla yumuşatmak gerekir."],
    ["Hyperlapse ile timelapse arasındaki fark nedir?", "Timelapse'te kamera sabittir ve yalnızca zaman hızlanır. Hyperlapse'te kamera her karede ilerler; izleyici hem zamanın hızlandığını hem de mekânda hareket edildiğini görür ve çekim daha fazla planlama gerektirir."]
  ],
  tools: ["timelapse-hesapla", "video-boyutu-hesapla", "zaman-kodu-cevir", "pozlama-hesapla"],
  related: ["video-dosya-boyutu-ve-bitrate", "diyafram-enstantane-iso-nedir"]
};
