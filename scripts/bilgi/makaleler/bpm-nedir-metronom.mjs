export default {
  slug: "bpm-nedir-metronom",
  kategori: "gunluk",
  tarih: "2026-11-15",
  title: "BPM Nedir? Metronom Kullanımı, Tempo Terimleri ve Şarkı Süresi Hesabı",
  pageTitle: "BPM Nedir? Metronom, Tempo Terimleri ve BPM Milisaniye",
  description: "BPM, dakikadaki vuruş sayısıdır; 120 BPM her vuruşun 500 ms sürdüğü anlamına gelir. Metronom kullanımı, allegro-andante, delay süresi ve şarkı süresi hesabı.",
  keywords: ["bpm nedir", "metronom nasıl kullanılır", "şarkı temposu", "120 bpm ne demek", "bpm milisaniye", "delay süresi hesaplama", "tempo terimleri", "şarkı süresi hesaplama"],
  lead: "BPM (beats per minute), müzikte <strong>dakikadaki vuruş sayısını</strong> gösterir ve bir parçanın temposunu belirler. 120 BPM, dakikada 120 vuruş, yani her vuruşun 60.000 ÷ 120 = <strong>500 milisaniye</strong> sürmesi demektir. Metronom bu vuruşları sesli ve görsel olarak vererek düzenli çalmanızı sağlar. Bu sayfada BPM ile milisaniye dönüşümünü, delay ve reverb ayarını, allegro ve andante gibi tempo terimlerinin yaklaşık BPM karşılıklarını, metronomla çalışma yöntemini ve ölçü sayısından şarkı süresi hesabını anlatıyoruz.",
  kisaCevap: [
    "BPM = dakikadaki vuruş sayısı; çoğu ölçüde vuruş birimi dörtlük notadır.",
    "Vuruş süresi (ms) = 60.000 ÷ BPM; 120 BPM'de dörtlük 500 ms, sekizlik 250 ms, onaltılık 125 ms'dir.",
    "Noktalı nota süresi 1,5 katı, üçleme süresi 2/3 katıdır: 120 BPM'de noktalı dörtlük 750 ms.",
    "Şarkı süresi (sn) = ölçü sayısı × ölçüdeki vuruş × 60 ÷ BPM; 4/4'lük 96 ölçü 120 BPM'de 3 dk 12 sn sürer.",
    "Yaklaşık tempo aralıkları: Largo 40–60, Adagio 66–76, Andante 76–108, Moderato 108–120, Allegro 120–156, Presto 168–200 BPM.",
    "Metronomla çalışırken parçayı rahat çaldığınız tempoda başlatıp her seferinde 4–5 BPM artırmak yaygın bir yöntemdir."
  ],
  figure: {
    alt: "120 BPM'de 4/4'lük bir ölçünün zaman çizelgesi: dört dörtlük vuruş her biri 500 ms, toplam ölçü 2 saniye; altında sekizlik 250 ms ve onaltılık 125 ms bölümleri, sağda noktalı dörtlük 750 ms ve üçleme 333 ms.",
    caption: "Vuruş süresi tempoya göre değişir, ama notalar arasındaki oran sabit kalır: sekizlik her zaman dörtlüğün yarısı, onaltılık dörtte biridir.",
    svg: `<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">120 BPM, 4/4 ölçü: bir ölçü = 2 saniye</text>
  <text x="40" y="70" class="b">Dörtlük</text>
  <rect x="140" y="52" width="130" height="30" rx="4" class="p"/><rect x="275" y="52" width="130" height="30" rx="4" class="ps"/>
  <rect x="410" y="52" width="130" height="30" rx="4" class="ps"/><rect x="545" y="52" width="130" height="30" rx="4" class="ps"/>
  <g class="sm mid"><text x="205" y="72" class="sf b">1 · 500 ms</text><text x="340" y="72">2 · 500</text><text x="475" y="72">3 · 500</text><text x="610" y="72">4 · 500</text></g>
  <text x="40" y="118" class="b">Sekizlik</text>
  <g>
    <rect x="140" y="100" width="62" height="28" rx="4" class="oks"/><rect x="207" y="100" width="62" height="28" rx="4" class="oks"/>
    <rect x="275" y="100" width="62" height="28" rx="4" class="oks"/><rect x="342" y="100" width="62" height="28" rx="4" class="oks"/>
    <rect x="410" y="100" width="62" height="28" rx="4" class="oks"/><rect x="477" y="100" width="62" height="28" rx="4" class="oks"/>
    <rect x="545" y="100" width="62" height="28" rx="4" class="oks"/><rect x="612" y="100" width="62" height="28" rx="4" class="oks"/>
  </g>
  <text x="171" y="119" class="sm mid">250</text>
  <text x="40" y="164" class="b">Onaltılık</text>
  <g>
    <rect x="140" y="148" width="29" height="26" rx="3" class="sf sb"/><rect x="173" y="148" width="29" height="26" rx="3" class="sf sb"/>
    <rect x="207" y="148" width="29" height="26" rx="3" class="sf sb"/><rect x="240" y="148" width="29" height="26" rx="3" class="sf sb"/>
  </g>
  <text x="300" y="166" class="sm">her biri 125 ms (ölçüde 16 adet)</text>
  <line x1="140" y1="196" x2="675" y2="196" class="st" fill="none"/>
  <g class="sm mid t2"><text x="140" y="214">0</text><text x="275" y="214">0,5 sn</text><text x="410" y="214">1 sn</text><text x="545" y="214">1,5 sn</text><text x="675" y="214">2 sn</text></g>
  <rect x="40" y="236" width="310" height="124" rx="10" class="sf sb"/><rect x="40" y="236" width="8" height="124" class="p"/>
  <text x="62" y="262" class="b">Formüller</text>
  <text x="62" y="288" class="sm">Dörtlük (ms) = 60.000 ÷ BPM</text>
  <text x="62" y="310" class="sm">Noktalı = × 1,5 · Üçleme = × 2/3</text>
  <text x="62" y="332" class="sm">Ölçü süresi = vuruş sayısı × 60 ÷ BPM</text>
  <rect x="370" y="236" width="310" height="124" rx="10" class="ps"/>
  <text x="525" y="262" class="b mid">120 BPM delay süreleri</text>
  <text x="525" y="288" class="sm mid">dörtlük 500 · sekizlik 250 ms</text>
  <text x="525" y="310" class="sm mid">noktalı dörtlük 750 · noktalı sekizlik 375 ms</text>
  <text x="525" y="332" class="sm mid">dörtlük üçleme ≈ 333 · sekizlik üçleme ≈ 167 ms</text>
</svg>`
  },
  sections: [
    {
      h: "BPM nedir?",
      p: [
        "BPM, İngilizce \"beats per minute\" ifadesinin kısaltmasıdır ve bir dakikada kaç vuruş olduğunu gösterir. Müzikte vuruş, ayağınızı yere vurarak ya da başınızla takip ettiğiniz temel nabızdır. Bir parçanın temposu bu vuruşların sıklığıyla belirlenir: düşük BPM sakin ve ağır, yüksek BPM hızlı ve enerjik bir his verir.",
        "Nota yazımında tempo genellikle partisyonun başında bir nota simgesi ve sayıyla gösterilir: \"dörtlük = 120\" ifadesi, dakikada 120 dörtlük nota çalınacağı anlamına gelir. 6/8 gibi bileşik ölçülerde vuruş birimi çoğunlukla noktalı dörtlüktür; bu durumda aynı BPM daha fazla nota anlamına gelir. Kalp atışı için de aynı birim (atım/dakika) kullanılır; dinlenme nabzı hakkında bilgi için [[bilgi:normal-nabiz-kac-olmali|normal nabız yazısına]] bakabilirsiniz."
      ]
    },
    {
      h: "120 BPM ne anlama gelir? BPM'den milisaniyeye geçiş",
      formula: "Dörtlük nota (ms) = 60.000 ÷ BPM\nSekizlik = dörtlük ÷ 2 · Onaltılık = dörtlük ÷ 4\nNoktalı nota = nota × 1,5 · Üçleme = nota × 2 ÷ 3\nLFO frekansı (dörtlüğe senkron) = BPM ÷ 60 Hz",
      p: [
        "120 BPM'de dakikada 120 vuruş vardır; 60 saniyeyi 120'ye böldüğünüzde her vuruşun 0,5 saniye, yani 500 milisaniye sürdüğünü bulursunuz. Bu, 120 BPM'in saniyede tam 2 vuruşa denk geldiği anlamına gelir ve pop, dans ve yürüyüş müziklerinde çok yaygın bir tempodur."
      ],
      table: {
        head: ["BPM", "Dörtlük (ms)", "Sekizlik (ms)", "Onaltılık (ms)", "Noktalı dörtlük (ms)", "Dörtlük üçleme (ms)"],
        rows: [
          ["60", "1.000", "500", "250", "1.500", "666,7"],
          ["90", "666,7", "333,3", "166,7", "1.000", "444,4"],
          ["120", "500", "250", "125", "750", "333,3"],
          ["128", "468,75", "234,4", "117,2", "703,1", "312,5"],
          ["140", "428,6", "214,3", "107,1", "642,9", "285,7"]
        ],
        caption: "Değerler 60.000 ÷ BPM formülünden hesaplanmış ve bir ondalık basamağa yuvarlanmıştır."
      },
      after: [
        "Tüm nota değerlerini ve LFO frekansını tek ekranda görmek için [[arac:bpm-ms-hesapla|BPM Milisaniye Hesaplama]] aracına parçanızın temposunu yazmanız yeterlidir."
      ]
    },
    {
      h: "Delay ve reverb süresi tempoya göre nasıl ayarlanır?",
      p: [
        "Müzik prodüksiyonunda yankı (delay) efektinin tekrarları şarkının temposuna oturduğunda karışım daha düzenli ve temiz duyulur. Bunun için delay süresi nota değerlerine göre seçilir. 120 BPM'lik bir parçada dörtlük delay 500 ms, noktalı sekizlik delay 375 ms'dir; noktalı sekizlik, gitar ve vokal yankılarında sık tercih edilen ritmik bir his verir.",
        "Reverb (yansıma) için de benzer bir mantık kullanılır. Ön gecikme (pre-delay) süresini kısa bir nota değerine (örneğin 1/64 ya da 1/32), sönüm süresini ise bir ya da iki vuruşa yakın tutmak, yansımanın bir sonraki vuruşa taşmadan kaybolmasını sağlar. Bunlar kesin kurallar değil başlangıç noktalarıdır; son kararı kulağınız vermelidir."
      ],
      ol: [
        "Parçanın BPM değerini öğrenin ya da tap tempo ile bulun.",
        "60.000 ÷ BPM ile dörtlük süresini hesaplayın.",
        "İstediğiniz nota değerine göre ikiye bölün, 1,5 ile çarpın (noktalı) ya da 2/3 ile çarpın (üçleme).",
        "Efektteki süreyi bu değere ayarlayın ya da efektin tempo senkron seçeneğini kullanın."
      ]
    },
    {
      h: "Allegro, andante gibi terimler kaç BPM'dir?",
      p: [
        "Klasik müzikte tempo, metronomun icadından önce İtalyanca sözcüklerle tarif edilirdi. Bu terimler bir hızı değil bir karakteri anlatır; besteciye, döneme ve parçaya göre yorumlanır. Aşağıdaki aralıklar yaygın olarak kabul edilen yaklaşık değerlerdir ve kaynaklar arasında farklılık gösterebilir."
      ],
      table: {
        head: ["Terim", "Anlamı", "Yaklaşık BPM"],
        rows: [
          ["Grave", "Çok ağır, ciddi", "25–45"],
          ["Largo", "Geniş, ağır", "40–60"],
          ["Adagio", "Yavaş, rahat", "66–76"],
          ["Andante", "Yürür gibi", "76–108"],
          ["Moderato", "Orta hızda", "108–120"],
          ["Allegro", "Hızlı, neşeli", "120–156"],
          ["Vivace", "Canlı", "156–176"],
          ["Presto", "Çok hızlı", "168–200"],
          ["Prestissimo", "Olabildiğince hızlı", "200 ve üzeri"]
        ],
        caption: "Aralıklar yaklaşıktır ve kaynaklara göre değişir; eser yorumunda öğretmeninizin ve partisyonun önerisi esas alınır."
      },
      after: [
        "Bu terimlerle birlikte sıkça \"accelerando\" (giderek hızlanarak), \"ritardando\" ya da \"rallentando\" (giderek yavaşlayarak) ve \"a tempo\" (eski hıza dönerek) gibi tempo değişim ifadeleri de kullanılır."
      ]
    },
    {
      h: "Metronom nasıl kullanılır?",
      p: [
        "Metronom, ayarlanan tempoda düzenli vuruşlar veren bir zamanlayıcıdır. Mekanik metronomlarda sarkaç, dijital metronomlarda ses ve ışık kullanılır. Amacı, çalarken farkında olmadan hızlanma ya da yavaşlama eğilimini fark etmenizi ve sabit bir tempo duygusu geliştirmenizi sağlamaktır."
      ],
      ol: [
        "Çalışacağınız pasajı hatasız ve rahat çalabildiğiniz bir tempo seçin; bu, hedef tempodan oldukça düşük olabilir.",
        "Ölçü türünü (4/4, 3/4, 6/8) ayarlayın ve ilk vuruş vurgusunu açın; böylece ölçünün başını duyarsınız.",
        "Pasajı birkaç kez temiz çaldıktan sonra tempoyu 4–5 BPM artırın.",
        "Hata yapmaya başladığınız noktada bir önceki tempoya dönün ve orada pekiştirin.",
        "Zorlandığınızda alt bölümleri açın (sekizlik ya da üçleme tıkları); vuruşlar arasındaki boşluğu doldurmak ritmi oturtur.",
        "İlerledikçe metronomu yalnızca 2. ve 4. vuruşlarda çalacak şekilde düşünmek ya da birkaç ölçü susturmak iç tempo duygunuzu güçlendirir."
      ],
      after: [
        "Sitedeki [[arac:metronom|Metronom]] 30–300 BPM arasında çalışır, 2/4'ten 7/8'e ölçüleri, ilk vuruş vurgusunu, sekizlik ve üçleme alt bölümlerini ve görsel göstergeyi destekler; tarayıcıda çevrimdışı da kullanılabilir. Çalışma sürelerinizi kısa ve odaklı bloklara bölmek için [[bilgi:pomodoro-teknigi-nedir|Pomodoro tekniği]] müzik pratiğinde de işe yarar."
      ]
    },
    {
      h: "Bir şarkının BPM'i nasıl bulunur?",
      ul: [
        "<strong>Tap tempo:</strong> Şarkıyı dinlerken vuruşlarla birlikte bir düğmeye birkaç ölçü boyunca dokunun; araç dokunuşlar arasındaki ortalama süreden BPM'i hesaplar.",
        "<strong>Sayarak:</strong> 15 saniye boyunca vuruşları sayın ve 4 ile çarpın. 15 saniyede 30 vuruş saydıysanız tempo yaklaşık 120 BPM'dir. Daha uzun sayım daha doğru sonuç verir.",
        "<strong>Yarı ve çift tempo:</strong> Aynı şarkı 70 ya da 140 BPM diye algılanabilir; davulun temel vuruş (kick) ve trampet (snare) düzenine bakarak hangisinin daha doğal olduğuna karar verin.",
        "<strong>Partisyon:</strong> Yazılı eserlerde tempo genellikle başta belirtilir; kayıtlarda icracılar bundan sapabilir."
      ]
    },
    {
      h: "Ölçü sayısından şarkı süresi nasıl hesaplanır?",
      formula: "Toplam vuruş = ölçü sayısı × ölçüdeki vuruş\nSüre (sn) = toplam vuruş × 60 ÷ BPM\nÖlçü süresi (sn) = ölçüdeki vuruş × 60 ÷ BPM",
      ol: [
        "<strong>Örnek 1:</strong> 4/4'lük 96 ölçülük bir parça 120 BPM'de çalınıyor. Toplam vuruş 96 × 4 = 384; süre 384 × 60 ÷ 120 = 192 saniye, yani <strong>3 dakika 12 saniye</strong>.",
        "<strong>Örnek 2:</strong> 3/4'lük 64 ölçülük bir vals 90 BPM'de. Toplam vuruş 192; süre 192 × 60 ÷ 90 = <strong>128 saniye</strong> (2 dk 8 sn).",
        "<strong>Örnek 3:</strong> 4/4'lük bir ölçü 120 BPM'de 4 × 0,5 = 2 saniye sürer; 8 ölçülük bir giriş 16 saniyedir."
      ],
      after: [
        "Sunum ya da etkinlik için müziğin belirli bir süreye sığması gerekiyorsa bu hesap hangi bölümlerin kısaltılacağını planlamayı kolaylaştırır. Hesabı [[arac:sarki-suresi-bpm-hesapla|Şarkı Süresi Hesaplama]] aracıyla ölçü, tempo ve ölçü türü girerek yapabilirsiniz. Akort ve nota frekansları için [[bilgi:nota-frekanslari-la-440-hz-akort|nota frekansları yazısını]] okuyabilirsiniz."
      ]
    },
    {
      h: "Aksak ölçülerde metronom: 7/8 ve 9/8",
      p: [
        "Türk halk ve sanat müziğinde sık görülen aksak ölçüler (5/8, 7/8, 9/8 gibi) eşit olmayan vuruş gruplarından oluşur. Örneğin 9/8'lik bir ölçü çoğu zaman 2+2+2+3 biçiminde gruplanır; dört vuruş hissedilir ama son vuruş diğerlerinden yarım kat uzundur. Bu tür ölçülerde metronomu sekizlik nota üzerinden ayarlamak en güvenli yoldur: sekizlik = 240 BPM gibi bir değer seçip her grubun başını vurgulu duymaya çalışın.",
        "Metronomunuz ölçü türü seçmeye izin veriyorsa 7/8 ya da 9/8'i seçip ilk vuruş vurgusunu açın; ardından grupların başlarını içinizden sayarak çalın. Gruplamayı (örneğin 7/8 için 2+2+3 mü, 3+2+2 mi) eserin usulüne göre öğretmeninizden öğrenmek önemlidir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Metronomu çok hızlı başlatmak:</strong> Hatalı çalınan hızlı tekrarlar yanlış hareketi pekiştirir; yavaş ve temiz başlayın.",
        "<strong>Vuruş birimini karıştırmak:</strong> 6/8'de 60 BPM noktalı dörtlüğe göreyse, sekizlik sayısı dakikada 180'dir.",
        "<strong>Milisaniyeyi yuvarlamak:</strong> 128 BPM'de dörtlük 468,75 ms'dir; 470 ms yazmak uzun delay tekrarlarında kaymaya yol açabilir.",
        "<strong>Tempo terimlerini kesin sayı sanmak:</strong> Allegro tek bir BPM değil, yorum gerektiren bir karakterdir.",
        "<strong>Yalnızca metronoma güvenmek:</strong> Metronom bir araçtır; nihai hedef, metronom olmadan da sabit tempoda çalabilmektir."
      ]
    }
  ],
  faq: [
    ["BPM nedir?", "BPM, dakikadaki vuruş sayısı anlamına gelen beats per minute ifadesinin kısaltmasıdır ve bir müzik parçasının temposunu gösterir. Düşük BPM ağır ve sakin, yüksek BPM hızlı ve enerjik bir tempo demektir."],
    ["120 BPM ne anlama gelir?", "120 BPM dakikada 120 vuruş, yani saniyede 2 vuruş demektir. Her vuruş 60.000 bölü 120 eşittir 500 milisaniye sürer; bu tempo pop, dans ve yürüyüş müziklerinde çok yaygındır."],
    ["Metronom nasıl kullanılır?", "Çalışacağınız pasajı rahat çalabildiğiniz bir tempoda başlatın, ölçü türünü ve ilk vuruş vurgusunu ayarlayın. Birkaç temiz tekrardan sonra tempoyu 4 ile 5 BPM artırın, hata yapmaya başladığınızda bir önceki tempoya dönün."],
    ["Bir şarkının BPM'i nasıl bulunur?", "Tap tempo özelliğiyle vuruşlara birkaç ölçü boyunca dokunabilir ya da 15 saniye boyunca vuruşları sayıp 4 ile çarpabilirsiniz. Şarkı yarım ya da çift tempoda algılanabileceği için davul düzenine bakarak karar verin."],
    ["BPM'den milisaniyeye nasıl geçilir?", "60.000 sayısı BPM değerine bölünerek dörtlük notanın milisaniye süresi bulunur. Sekizlik için ikiye, onaltılık için dörde bölünür; noktalı notalar 1,5 ile, üçlemeler üçte iki ile çarpılır."],
    ["Delay ve reverb süresi tempoya göre nasıl ayarlanır?", "Delay süresi bir nota değerine eşitlenir; 120 BPM'de dörtlük delay 500, noktalı sekizlik delay 375 milisaniyedir. Reverb'de ön gecikme kısa bir nota değerine, sönüm süresi bir ya da iki vuruşa yakın tutularak başlanabilir."],
    ["Allegro, andante gibi terimler kaç BPM'dir?", "Yaklaşık olarak Largo 40 ile 60, Adagio 66 ile 76, Andante 76 ile 108, Moderato 108 ile 120, Allegro 120 ile 156 ve Presto 168 ile 200 BPM arasındadır. Bu aralıklar kaynaklara ve yoruma göre değişir."],
    ["Ölçü sayısından şarkı süresi nasıl hesaplanır?", "Ölçü sayısı ölçüdeki vuruş sayısıyla çarpılır, sonuç 60 ile çarpılıp BPM'e bölünür. 4/4'lük 96 ölçülük bir parça 120 BPM'de 192 saniye, yani 3 dakika 12 saniye sürer."],
    ["Metronomla çalışmak neden önemlidir?", "Metronom farkında olmadan hızlanma ya da yavaşlama eğilimini gösterir ve sabit bir iç tempo duygusu kazandırır. Grup hâlinde çalarken, kayıtta ve zor pasajları adım adım hızlandırırken özellikle faydalıdır."]
  ],
  tools: ["metronom", "bpm-ms-hesapla", "sarki-suresi-bpm-hesapla"],
  related: ["nota-frekanslari-la-440-hz-akort", "pomodoro-teknigi-nedir", "normal-nabiz-kac-olmali"],
  sources: [
    ["MEB – Müzik Dersi Öğretim Programı", "https://mufredat.meb.gov.tr/"]
  ]
};
