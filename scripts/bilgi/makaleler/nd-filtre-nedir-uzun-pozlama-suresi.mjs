export default {
  slug: "nd-filtre-nedir-uzun-pozlama-suresi",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "ND Filtre Nedir? Uzun Pozlama Süresi ve Stop Hesabı Nasıl Yapılır?",
  pageTitle: "ND Filtre Nedir? Stop Hesabı ve Uzun Pozlama Süresi",
  description: "ND filtre nedir, ND8, ND64, ND1000 kaç stop keser? Filtreli enstantane hesabı, EV, ipeksi su için süre, değişken ND sorunları ve videoda ND kullanımı örneklerle.",
  keywords: ["nd filtre nedir", "nd filtre stop", "uzun pozlama süresi", "nd1000 kaç stop", "ipeksi su fotoğrafı", "pozlama değeri ev", "gündüz uzun pozlama", "değişken nd filtre"],
  lead: "ND (nötr yoğunluk) filtre, renkleri değiştirmeden objektife giren ışığı belirli bir oranda azaltan koyu bir camdır; filtreyle yeni enstantane = filtresiz enstantane × filtre çarpanı formülüyle bulunur. ND1000 yaklaşık 10 stop keser ve 1/125 saniyelik pozlamayı 8 saniyeye çıkarır. Gündüz ipeksi su, akan bulut ya da geniş diyaframla video çekmek isteyenler için ND filtre vazgeçilmezdir. Bu yazıda stop ve EV kavramını, filtre adlarının anlamını, adım adım süre hesabını ve sık hataları anlatıyoruz.",
  kisaCevap: [
    "Bir stop, ışık miktarının yarıya inmesi ya da iki katına çıkmasıdır.",
    "ND sayısı ışığı kaç kat azalttığını gösterir: ND8 = 3 stop, ND64 = 6 stop, ND1000 ≈ 10 stop.",
    "Stop sayısı = log₂(ND çarpanı); optik yoğunluk yazımında her 0,3 bir stoptur (ND 3.0 = 10 stop).",
    "Yeni enstantane = eski enstantane × ND çarpanı = eski enstantane × 2<sup>stop</sup>.",
    "Örnek: f/8, ISO 100, 1/125 sn ölçen sahnede ND1000 ile süre 8 saniye olur.",
    "İpeksi su için genellikle 1–30 saniye, bulut hareketi için 30 saniye ile birkaç dakika arası pozlama kullanılır.",
    "ND filtre alan derinliğini değiştirmez; alan derinliğini diyafram, odak uzaklığı ve mesafe belirler."
  ],
  figure: {
    alt: "ND filtre stop tablosu: ND2'den ND32768'e kadar filtreler için stop sayısı ve 1/125 saniyelik pozlamanın filtreyle aldığı yeni süre çubukları.",
    caption: "Filtresiz 1/125 saniye ölçen bir sahnede filtrelerin vardığı süreler. Her stop süreyi iki katına çıkarır; 10 stopluk ND1000 ile 8 saniye, 15 stopluk filtreyle yaklaşık 4,4 dakika elde edilir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">1/125 sn ölçülen sahnede ND filtreyle yeni süre</text>
  <g class="sm">
    <text x="20" y="66" class="b t2">Filtre</text><text x="120" y="66" class="b t2">Stop</text><text x="200" y="66" class="b t2">Yeni enstantane</text>
    <line x1="20" y1="76" x2="700" y2="76" class="sb" fill="none"/>
    <text x="20" y="104" class="b">ND2</text><text x="120" y="104">1</text><rect x="200" y="90" width="20" height="20" class="oks"/><text x="230" y="104">1/60 sn</text>
    <text x="20" y="140" class="b">ND8</text><text x="120" y="140">3</text><rect x="200" y="126" width="60" height="20" class="oks"/><text x="270" y="140">1/15 sn</text>
    <text x="20" y="176" class="b">ND64</text><text x="120" y="176">6</text><rect x="200" y="162" width="120" height="20" class="ps"/><text x="330" y="176">≈ 1/2 sn (0,51)</text>
    <text x="20" y="212" class="b">ND1000</text><text x="120" y="212">≈ 10</text><rect x="200" y="198" width="200" height="20" class="p"/><text x="410" y="212" class="b">8 sn</text>
    <text x="20" y="248" class="b">ND32768</text><text x="120" y="248">15</text><rect x="200" y="234" width="300" height="20" class="p"/><text x="510" y="248" class="b">262 sn ≈ 4,4 dk</text>
  </g>
  <text x="20" y="282" class="sm t2">Çubuk uzunluğu stop sayısıyla orantılıdır (logaritmik ölçek).</text>
  <rect x="20" y="300" width="330" height="104" rx="8" class="sf sb"/>
  <text x="36" y="326" class="b">Formül</text>
  <text x="36" y="352" class="sm">stop = log₂(ND çarpanı)</text>
  <text x="36" y="374" class="sm">yeni süre = eski süre × 2^stop</text>
  <text x="36" y="396" class="sm">optik yoğunluk 0,3 = 1 stop</text>
  <rect x="370" y="300" width="330" height="104" rx="8" class="ps"/>
  <text x="386" y="326" class="b">Örnek: f/8 · ISO 100 · 1/125 sn</text>
  <text x="386" y="352" class="sm">EV = log₂(8² ÷ 1/125) ≈ 13</text>
  <text x="386" y="374" class="sm">ND1000 takılınca: 1/125 × 1.000 = 8 sn</text>
  <text x="386" y="396" class="sm">Diyafram ve ISO değişmez</text>
</svg>`
  },
  sections: [
    {
      h: "ND (nötr yoğunluk) filtre ne işe yarar?",
      p: [
        "ND filtre, objektifin önüne takılan ve tüm renklerdeki ışığı eşit oranda azaltan gri tonlu bir camdır. \"Nötr\" sözcüğü filtrenin renk vermemesi gerektiğini anlatır; ideal bir ND filtreyle çekilen fotoğraf, yalnızca daha az ışık almış gibi davranır. Fotoğrafçıya parlak gün ışığında, normalde mümkün olmayan uzun enstantane ya da geniş diyafram kullanma imkânı verir.",
        "Kullanım amaçları üç başlıkta toplanır. Birincisi hareketi yumuşatmaktır: şelaleyi ipek gibi, denizi sis gibi, bulutları çizgi gibi göstermek. İkincisi gündüz geniş diyaframla çekim yapıp arka planı flu bırakmaktır; güneşte f/1.8 açıklıkla makinenin en hızlı enstantanesi bile yetmeyebilir. Üçüncüsü videoda doğal hareket bulanıklığı için enstantaneyi düşük tutmaktır.",
        "Kalabalık bir meydanda birkaç dakikalık pozlama yapıldığında hareket eden insanlar görüntüde neredeyse kaybolur; yalnızca sabit duran binalar kalır. Bu da uzun pozlamanın yaratıcı kullanımlarından biridir."
      ]
    },
    {
      h: "Stop ve pozlama değeri (EV) nedir?",
      p: [
        "Fotoğrafçılıkta ışık miktarı \"stop\" ile ölçülür. Bir stop, sensöre ulaşan ışığın iki katına çıkması ya da yarıya inmesidir. Enstantaneyi 1/125'ten 1/60'a uzatmak bir stop, diyaframı f/8'den f/5.6'ya açmak bir stop, ISO'yu 100'den 200'e çıkarmak bir stop parlaklık ekler.",
        "Pozlama değeri (EV), diyafram ve enstantanenin birlikte ne kadar ışık aldığını tek sayıyla ifade eder. ISO 100 için EV = log₂(N² ÷ t) formülüyle hesaplanır; N diyafram sayısı, t saniye cinsinden enstantanedir. f/8 ve 1/125 için EV = log₂(64 × 125) = log₂(8.000) ≈ 13 olur. EV bir birim azaldığında bir stop daha fazla ışık alınır.",
        "ND filtre sahnenin parlaklığını değiştirmez ama sensöre ulaşan ışığı belirli stop kadar azaltır. Bu yüzden filtre takınca aynı parlaklıkta fotoğraf için ya enstantaneyi uzatmanız, ya diyaframı açmanız ya da ISO'yu yükseltmeniz gerekir. Bu üç ayarın ilişkisini [[bilgi:diyafram-enstantane-iso-nedir|diyafram, enstantane ve ISO]] yazısında ayrıntılı bulabilirsiniz."
      ],
      formula: "EV (ISO 100) = log₂(N² ÷ t)\nf/8, 1/125 sn → log₂(64 × 125) = log₂(8.000) ≈ 12,97 ≈ 13"
    },
    {
      h: "ND8, ND64 ve ND1000 kaç stop ışık keser?",
      p: [
        "Filtreler üç farklı biçimde adlandırılır ve bu, kafa karışıklığının en büyük kaynağıdır. \"ND8\" gibi çarpan yazımı ışığın kaç kat azaldığını; \"ND 0.9\" gibi optik yoğunluk yazımı logaritmik yoğunluğu; \"3 stop\" yazımı ise doğrudan stop sayısını gösterir. Hepsi aynı filtreyi anlatabilir."
      ],
      table: {
        head: ["Çarpan adı", "Optik yoğunluk", "Stop", "Geçen ışık", "1/125 sn şöyle olur"],
        rows: [
          ["ND2", "0,3", "1", "%50", "1/60 sn"],
          ["ND4", "0,6", "2", "%25", "1/30 sn"],
          ["ND8", "0,9", "3", "%12,5", "1/15 sn"],
          ["ND16", "1,2", "4", "%6,25", "1/8 sn"],
          ["ND64", "1,8", "6", "%1,56", "≈ 1/2 sn"],
          ["ND256", "2,4", "8", "%0,39", "≈ 2 sn"],
          ["ND1000", "3,0", "≈ 10", "%0,1", "8 sn"],
          ["ND32768", "4,5", "15", "%0,003", "≈ 4,4 dk"]
        ],
        caption: "Stop = log₂(çarpan); optik yoğunluk = 0,3 × stop (yaklaşık). ND1000 tam olarak 9,97 stoptur, pratikte 10 stop kabul edilir."
      },
      after: [
        "Filtreleri üst üste takarak stopları toplayabilirsiniz: ND8 (3 stop) ile ND64 (6 stop) birlikte 9 stop verir, çarpanlar ise çarpılır (8 × 64 = 512). Ancak her ek cam yansıma ve kenar kararması riskini artırır."
      ]
    },
    {
      h: "Filtre takınca yeni enstantane nasıl hesaplanır?",
      ol: [
        "Filtreyi takmadan sahneyi ölçün ve doğru pozlamayı bulun. Örnek: f/8, ISO 100, 1/125 sn.",
        "Diyafram ve ISO'yu sabit bırakın; netliği filtresiz ayarlayıp otomatik netlemeyi kapatın, çünkü koyu filtreyle makine netleme yapamayabilir.",
        "Filtrenin çarpanıyla eski süreyi çarpın: 1/125 × 1.000 = 8 sn. Stop olarak düşünürseniz 1/125 → 1/60 → 1/30 → 1/15 → 1/8 → 1/4 → 1/2 → 1 → 2 → 4 → 8 sn (10 adım).",
        "30 saniyeyi aşan sürelerde makineyi Bulb (B) moduna alın ve uzaktan deklanşörle ya da zamanlayıcıyla süreyi tutun.",
        "İlk kareyi histogramla kontrol edin; filtreler etiket değerinden biraz farklı ışık kesebilir. Gerekirse süreyi yarım ya da bir stop düzeltin."
      ],
      p: [
        "15 stopluk bir filtreyle aynı sahnede süre 1/125 × 32.768 = 262 saniye, yani yaklaşık 4 dakika 22 saniye olur. Bu hesabı ve farklı diyafram–ISO kombinasyonlarını [[arac:pozlama-hesapla|Pozlama Hesaplama aracıyla]] deneyebilirsiniz."
      ]
    },
    {
      h: "İpeksi su ve bulut hareketi için kaç saniye pozlama gerekir?",
      p: [
        "Gereken süre, konunun ne kadar hızlı hareket ettiğine ve istenen etkiye göre değişir. Aşağıdaki değerler yaygın başlangıç aralıklarıdır; aynı şelalede bile su miktarı ve kameranın uzaklığı sonucu değiştirir."
      ],
      table: {
        head: ["İstenen etki", "Tipik süre", "Gündüz gereken ND (1/125 sn sahne)"],
        rows: [
          ["Şelalede hafif yumuşama", "1/8 – 1/2 sn", "4–6 stop"],
          ["İpeksi akarsu, şelale", "1 – 4 sn", "7–9 stop"],
          ["Dalgaların sis gibi görünmesi", "10 – 30 sn", "10–12 stop"],
          ["Bulutların çizgi gibi akması", "1 – 4 dk", "13–15 stop"],
          ["Kalabalığın kaybolması", "2 – 5 dk", "14–16 stop"]
        ]
      },
      after: [
        "Uzun pozlamada sağlam bir tripod şarttır. Rüzgârlı havada tripodun ortasına çanta asmak, ayna kilitlemeyi ya da elektronik ilk perdeyi kullanmak titreşimi azaltır. Vizörden ışık sızması uzun pozlamada lekeye yol açabileceği için vizörü kapatın. Hareket eden suyu yumuşatmak dışında bulanıklık sorunlarıyla karşılaşırsanız [[bilgi:bulanik-fotograf-nasil-netlestirilir|bulanık fotoğrafın nedenleri]] yazısı yol gösterir."
      ]
    },
    {
      h: "Diyafram ve ISO uzun pozlamada nasıl ayarlanır?",
      p: [
        "Uzun pozlamada ISO'yu makinenin en düşük yerel değerinde (genellikle 100 ya da 64) tutmak, hem gürültüyü azaltır hem de süreyi uzatmaya yardım eder. Uzun pozlama gürültü azaltma özelliği açıksa makine aynı süre kadar ikinci bir karanlık kare çeker; 4 dakikalık pozlamada 4 dakika daha bekleyeceğinizi unutmayın.",
        "Diyafram için manzarada genellikle f/8 – f/11 aralığı seçilir; bu aralık keskinlik ile alan derinliği arasında iyi bir denge sağlar. Süreyi daha da uzatmak için f/16'ya kısmak mümkündür ama f/16 ve üstünde kırınım nedeniyle keskinlik düşmeye başlar. Geniş diyafram kullanmak istediğiniz video ve portre çekimlerinde ise ND filtre, diyaframı açık tutarken doğru pozlamayı korumanın yoludur."
      ]
    },
    {
      h: "Alan derinliği filtre kullanımından etkilenir mi?",
      p: [
        "Hayır, ND filtre alan derinliğini doğrudan değiştirmez. Alan derinliğini diyafram, odak uzaklığı, konu mesafesi ve sensör boyutu belirler. Filtre yalnızca ışığı azaltır; ancak filtre sayesinde daha geniş bir diyafram seçebildiğiniz için dolaylı olarak daha sığ alan derinliği elde edebilirsiniz.",
        "Örneğin güneşli bir günde f/1.8 ile çekmek istediğiniz bir portrede makinenin en hızlı enstantanesi 1/4.000 sn ise ve sahne f/1.8'de 1/16.000 sn gerektiriyorsa iki stop fazla ışık vardır. ND4 takarak 1/4.000 sn ile f/1.8'de çekebilirsiniz. Netlik sınırlarını [[arac:alan-derinligi-hesapla|Alan Derinliği Hesaplama aracıyla]], farklı sensör boyutlarındaki eşdeğerliği [[arac:crop-faktoru-hesapla|Crop Faktörü aracıyla]] kontrol edebilirsiniz."
      ]
    },
    {
      h: "Video çekiminde ND filtre neden kullanılır?",
      p: [
        "Videoda doğal görünen hareket için yaygın kural \"180 derece kuralı\"dır: enstantane, kare hızının iki katının tersine yakın olmalıdır. 25 fps için 1/50 sn, 30 fps için 1/60 sn. Güneşli bir günde f/2.8 ve 1/50 sn ile çekim yapıldığında görüntü birkaç stop aşırı pozlanır. Enstantaneyi hızlandırmak hareketi kesik ve yapay gösterir; ND filtre ise enstantaneyi kuralda tutarken ışığı düşürür.",
        "Videocular bu yüzden çoğunlukla 3–6 stop arası filtreler ya da değişken ND kullanır. Değişken filtre, ışık sahneden sahneye değiştiğinde filtreyi çıkarmadan ayar yapma kolaylığı sağlar. Aynı yaklaşım hareket bulanıklığı istenen [[bilgi:timelapse-nasil-cekilir-cekim-araligi|timelapse çekimlerinde]] de kullanılır."
      ]
    },
    {
      h: "Değişken ND filtrenin dezavantajları ve sık hatalar",
      ul: [
        "<strong>X deseni:</strong> Değişken ND iki polarize camdan oluşur; en koyu konumlara yaklaşıldığında, özellikle geniş açılı objektiflerde, görüntüde koyu bir çarpı (X) deseni oluşabilir.",
        "<strong>Düzensiz koyuluk:</strong> Geniş açıda gökyüzünün bir tarafı ötekinden koyu görünebilir.",
        "<strong>Renk kayması:</strong> Ucuz ve çok koyu filtreler görüntüye mavi, mor ya da kahverengi ton verebilir; RAW çekip beyaz dengesini düzeltmek gerekir.",
        "<strong>Filtre takıp netleme yapmak:</strong> Koyu filtrede otomatik netleme şaşırır; netliği filtresiz alın.",
        "<strong>Stop hesabında çarpanı toplamak:</strong> ND8 + ND8, ND16 değil ND64'tür (3 + 3 = 6 stop).",
        "<strong>Vizörü açık bırakmak:</strong> Uzun pozlamada vizörden giren ışık görüntüde parlama yapabilir."
      ]
    }
  ],
  faq: [
    ["ND (nötr yoğunluk) filtre ne işe yarar?", "ND filtre renkleri değiştirmeden objektife giren ışığı azaltır. Böylece gündüz uzun enstantaneyle ipeksi su ve bulut hareketi çekebilir, geniş diyaframla portre yapabilir ya da videoda doğal hareket bulanıklığı için enstantaneyi düşük tutabilirsiniz."],
    ["ND8, ND64 ve ND1000 kaç stop ışık keser?", "ND8 3 stop, ND64 6 stop, ND1000 yaklaşık 10 stop keser. Stop sayısı filtre çarpanının iki tabanında logaritmasıdır; optik yoğunluk yazımında her 0,3 bir stopa karşılık gelir."],
    ["Filtre takınca yeni enstantane nasıl hesaplanır?", "Filtresiz ölçtüğünüz enstantaneyi filtrenin çarpanıyla çarpın. Örneğin 1/125 saniye ölçülen sahnede ND1000 ile süre 1/125 × 1.000 = 8 saniye olur; diyafram ve ISO aynı kalır."],
    ["Pozlama değeri (EV) nedir?", "EV, diyafram ve enstantanenin birlikte ne kadar ışık aldığını gösteren sayıdır ve ISO 100 için log₂(N² ÷ t) formülüyle bulunur. f/8 ve 1/125 saniye yaklaşık EV 13'tür; bir EV farkı bir stop demektir."],
    ["İpeksi su ve bulut hareketi için kaç saniye pozlama gerekir?", "İpeksi akarsu ve şelale için genellikle 1–4 saniye, dalgaları sis gibi göstermek için 10–30 saniye, bulutları çizgi hâline getirmek için 1–4 dakika kullanılır. Kesin süre hareket hızına göre denenerek bulunur."],
    ["Değişken ND filtrenin dezavantajı nedir?", "Değişken ND iki polarize camdan oluştuğu için koyu ayarlarda X deseni, geniş açıda düzensiz koyuluk ve renk kayması yapabilir. Sabit filtreler genellikle daha tutarlı renk ve keskinlik verir."],
    ["Diyafram ve ISO uzun pozlamada nasıl ayarlanır?", "ISO makinenin en düşük yerel değerinde tutulur, manzarada diyafram genellikle f/8–f/11 seçilir. f/16 ve üstünde kırınım keskinliği düşürür; uzun pozlama gürültü azaltma açıksa bekleme süresi iki katına çıkar."],
    ["Alan derinliği filtre kullanımından etkilenir mi?", "ND filtre alan derinliğini doğrudan değiştirmez. Ancak filtre sayesinde parlak ışıkta daha geniş diyafram kullanabildiğiniz için dolaylı yoldan daha sığ alan derinliği ve daha flu arka plan elde edebilirsiniz."],
    ["Video çekiminde ND filtre neden kullanılır?", "Videoda doğal hareket için enstantane kare hızının iki katının tersine yakın tutulur, örneğin 25 fps için 1/50 saniye. Güneşte bu ayarla görüntü aşırı pozlanır; ND filtre enstantaneyi değiştirmeden ışığı azaltır."]
  ],
  tools: ["pozlama-hesapla", "alan-derinligi-hesapla", "crop-faktoru-hesapla", "timelapse-hesapla"],
  related: ["diyafram-enstantane-iso-nedir", "timelapse-nasil-cekilir-cekim-araligi"]
};
