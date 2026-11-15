export default {
  slug: "oda-icin-kac-lumen-gerekir",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Bir Oda İçin Kaç Lümen Gerekir? Lüks, Lümen ve LED Ampul Seçimi",
  pageTitle: "Oda İçin Kaç Lümen Gerekir? Lüks, Lümen ve LED Ampul Hesabı",
  description: "Gereken lümen = oda alanı (m²) × hedef lüks. 20 m² salon için yaklaşık 3.000, 10 m² mutfak için 3.000 lümen. Watt karşılığı, Kelvin seçimi ve LED tasarrufu.",
  keywords: ["oda için kaç lümen", "lümen nedir", "lüks lümen farkı", "kaç watt led ampul", "salon aydınlatma hesabı", "led ampul watt karşılığı", "renk sıcaklığı kelvin", "şerit led adaptör hesabı"],
  lead: "Bir odanın ihtiyaç duyduğu ışık miktarı <strong>oda alanının (m²) hedeflenen aydınlık düzeyiyle (lüks) çarpılmasıyla</strong> bulunur: 20 m²'lik bir salon için 150 lüks hedeflenirse 20 × 150 = 3.000 lümen gerekir; bu da 806 lümenlik dört LED ampul demektir. Mutfak ve çalışma masası gibi göz yoran işlerin yapıldığı yerler daha fazla ışık ister. Bu sayfada lümen, lüks ve watt farkını, oda oda önerilen aydınlık düzeylerini, eski ampullerin LED karşılığını, renk sıcaklığı seçimini ve LED'e geçişin tasarruf hesabını bulacaksınız.",
  kisaCevap: [
    "Lümen (lm) bir ampulün yaydığı toplam ışık miktarıdır; lüks (lx) bir yüzeye metrekare başına düşen ışıktır: 1 lx = 1 lm/m².",
    "Gerekli lümen = oda alanı (m²) × hedef lüks; koyu duvar, yüksek tavan ve abajur kayıpları için %20–30 pay eklenir.",
    "Konutlarda yaygın hedefler: yatak odası ve koridor 100, salon 150, banyo 200, mutfak 300, çalışma masası 500 lüks.",
    "Akkor ampul karşılıkları: 40 W ≈ 470 lm, 60 W ≈ 806 lm, 75 W ≈ 1.055 lm, 100 W ≈ 1.521 lm.",
    "9–10 W'lık LED ampul çoğunlukla 800 lümen civarında ışık verir ve 60 W'lık eski ampulün yerini tutar.",
    "Renk sıcaklığı: 2.700–3.000 K sıcak (yatak odası, salon), 4.000 K nötr (mutfak, çalışma), 6.500 K soğuk beyazdır."
  ],
  figure: {
    alt: "Solda aynı 800 lümenlik ampulün 4 m² alana 200 lüks, 8 m² alana 100 lüks verdiği şema; sağda yatak odası 100, salon 150, banyo 200, mutfak 300, çalışma 500 lüks hedeflerini gösteren çubuklar.",
    caption: "Lümen ampulün ürettiği toplam ışıktır; lüks, bu ışığın ne kadar alana yayıldığına bağlıdır. Sağdaki çubuklar konutlarda yaygın kullanılan hedef aydınlık düzeyleridir (Bilişim Ajans aydınlatma aracının varsayılan değerleri).",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Lümen ile lüks: aynı ışık, farklı alan</text>
  <circle cx="170" cy="78" r="18" class="a"/>
  <text x="170" y="60" class="sm mid b">800 lm</text>
  <polygon points="160,96 180,96 230,190 110,190" class="ps"/>
  <rect x="110" y="190" width="120" height="14" class="p"/>
  <text x="170" y="226" class="mid b">4 m² → 200 lx</text>
  <polygon points="160,96 180,96 320,330 20,330" class="ps"/>
  <rect x="20" y="330" width="300" height="14" class="sf sb"/>
  <text x="170" y="368" class="mid b">8 m² → 100 lx</text>
  <text x="170" y="394" class="sm mid t2">lüks = lümen ÷ alan</text>
  <line x1="350" y1="50" x2="350" y2="400" class="sb dash" fill="none"/>
  <text x="540" y="62" class="b mid">Önerilen hedef (lüks)</text>
  <g>
    <text x="470" y="98" class="sm end">Yatak / koridor</text><rect x="480" y="84" width="40" height="22" rx="3" class="ps"/><text x="528" y="100" class="sm">100</text>
    <text x="470" y="140" class="sm end">Salon</text><rect x="480" y="126" width="60" height="22" rx="3" class="ps"/><text x="548" y="142" class="sm">150</text>
    <text x="470" y="182" class="sm end">Banyo</text><rect x="480" y="168" width="80" height="22" rx="3" class="ps"/><text x="568" y="184" class="sm">200</text>
    <text x="470" y="224" class="sm end">Mutfak</text><rect x="480" y="210" width="120" height="22" rx="3" class="p"/><text x="608" y="226" class="sm">300</text>
    <text x="470" y="266" class="sm end">Çalışma masası</text><rect x="480" y="252" width="200" height="22" rx="3" class="p"/><text x="676" y="268" class="sm end sf">500</text>
  </g>
  <rect x="370" y="300" width="330" height="96" rx="8" class="sf sb"/>
  <text x="386" y="326" class="b">Örnek: 20 m² salon</text>
  <text x="386" y="350" class="sm">20 × 150 = 3.000 lm</text>
  <text x="386" y="372" class="sm">3.000 ÷ 806 = 3,7 → 4 adet 60 W eşdeğeri LED</text>
  <text x="386" y="390" class="sm t2">LED gücü ≈ 3.000 ÷ 100 lm/W = 30 W</text>
</svg>`
  },
  sections: [
    {
      h: "Lümen, lüks, watt ve kelvin: dört farklı ölçü",
      p: [
        "Ampul ambalajlarındaki sayılar dört farklı şeyi ölçer ve birbirinin yerine kullanılamaz. <strong>Lümen (lm)</strong>, ampulün her yöne yaydığı toplam görünür ışık miktarıdır; parlaklığın asıl ölçüsü budur. <strong>Lüks (lx)</strong>, bir yüzeye metrekare başına düşen ışıktır ve \"masamın üstü ne kadar aydınlık?\" sorusunun cevabıdır. 1 lüks, 1 metrekareye düşen 1 lümen demektir.",
        "<strong>Watt (W)</strong> ise ampulün tükettiği elektrik gücüdür, ışık miktarı değildir. Akkor ampuller döneminde watt parlaklığın dolaylı göstergesiydi, çünkü bütün ampuller kabaca aynı verimle çalışıyordu. LED'ler aynı ışığı çok daha az güçle ürettiği için artık parlaklık lümene bakılarak seçilir. İki ölçüyü birleştiren değer <strong>ışık verimi</strong>dir (lm/W); bugünkü ev tipi LED ampullerde genellikle 90–120 lm/W civarındadır.",
        "<strong>Kelvin (K)</strong> ışığın rengini, yani sarımsı mı beyaz mı mavimsi mi olduğunu anlatır; parlaklıkla ilgisi yoktur. Aynı 806 lümenlik ampul 2.700 K'de sıcak sarı, 6.500 K'de soğuk beyaz görünür."
      ]
    },
    {
      h: "Gerekli lümen nasıl hesaplanır?",
      formula: "Gerekli lümen = oda alanı (m²) × hedef aydınlık düzeyi (lüks)\nAmpul sayısı = gerekli lümen ÷ bir ampulün lümeni → yukarı yuvarla\nYaklaşık LED gücü (W) = gerekli lümen ÷ ışık verimi (lm/W)",
      p: [
        "Bu hesap, ampulden çıkan ışığın tamamının kullanım yüzeyine ulaştığını varsayan basit bir yaklaşımdır. Gerçekte ışığın bir kısmı abajurda, armatür içinde ya da koyu renkli duvar ve tavanda soğurulur. Açık renkli, beyaz tavanlı bir odada sonuç büyük ölçüde yeterlidir; koyu duvarlı, yüksek tavanlı ya da gömme spotlu odalarda sonuca %20–30 pay eklemek gerekir.",
        "Profesyonel aydınlatma projelerinde yansıma katsayıları, armatürün ışık dağılımı ve kirlenme payı da hesaba katılır. Evdeki bir oda için ise alan × lüks yöntemi, kaç ampul alacağınıza karar vermek için yeterli bir başlangıçtır."
      ]
    },
    {
      h: "Salon, mutfak ve çalışma odası için kaç lüks gerekir?",
      p: [
        "Konutlar için bağlayıcı bir lüks değeri yoktur; işyerleri için Avrupa standardı EN 12464-1, yazı yazma ve bilgisayar başında çalışma gibi görevler için 500 lüks önerir. Aşağıdaki tablo, ev kullanımında yaygın kabul gören genel aydınlatma hedeflerini ve farklı oda büyüklükleri için çıkan lümen değerlerini gösterir."
      ],
      table: {
        head: ["Mekân", "Hedef (lüks)", "10 m² için", "20 m² için"],
        rows: [
          ["Yatak odası", "100", "1.000 lm", "2.000 lm"],
          ["Koridor, antre", "100", "1.000 lm", "2.000 lm"],
          ["Salon, oturma odası", "150", "1.500 lm", "3.000 lm"],
          ["Banyo", "200", "2.000 lm", "4.000 lm"],
          ["Mutfak", "300", "3.000 lm", "6.000 lm"],
          ["Çalışma odası, masa", "500", "5.000 lm", "10.000 lm"],
          ["Atölye, hobi tezgâhı", "750", "7.500 lm", "15.000 lm"]
        ],
        caption: "Değerler genel aydınlatma içindir. Okuma köşesi, tezgâh altı ya da ayna önü gibi noktalarda yerel ek aydınlatma kullanılır."
      },
      after: [
        "Çalışma odasının tamamını 500 lükse çıkarmak yerine, genel aydınlatmayı 150–200 lükste tutup masaya iyi bir masa lambası koymak hem daha konforlu hem daha ekonomiktir. Aynı mantık mutfakta da geçerlidir: tavan ışığı genel aydınlatmayı sağlarken tezgâh üstündeki şerit LED kesme-doğrama yüzeyini aydınlatır. Kendi odanız için [[arac:aydinlatma-lumen-hesapla|Aydınlatma Lümen Hesaplama aracı]] alan ve mekân türünden toplam lümeni, ampul sayısını ve yaklaşık LED gücünü verir."
      ]
    },
    {
      h: "Çözümlü örnekler",
      ol: [
        "<strong>Salon, 5 m × 4 m:</strong> 20 m² × 150 lx = 3.000 lm. 806 lümenlik ampulle 3.000 ÷ 806 = 3,7 → 4 ampul; toplam 3.224 lm. 100 lm/W verimle yaklaşık 30 W LED gücü yeter.",
        "<strong>Mutfak, 3 m × 3,2 m, koyu dolaplı:</strong> 9,6 m² × 300 lx = 2.880 lm; koyu yüzeyler için %25 pay → 3.600 lm. 1.055 lümenlik ampulle 4 adet ya da tavanda 3 ampul artı tezgâh altında yaklaşık 600–800 lümenlik şerit LED.",
        "<strong>Çocuk odası çalışma masası, 0,6 m × 1,2 m:</strong> 0,72 m² × 500 lx = 360 lm masa yüzeyinde gerekir. Lambanın ışığının yalnızca bir kısmı masaya düştüğü için 600–800 lümenlik bir masa lambası uygun başlangıçtır.",
        "<strong>Lükten lümene ters hesap:</strong> 12 m²'lik bir odada 2.400 lümen ışık varsa ortalama aydınlık düzeyi 2.400 ÷ 12 = 200 lükstür."
      ],
      after: [
        "Lüks ile lümen arasında ya da foot-candle gibi farklı birimlerle dönüşüm yapmanız gerekirse [[arac:lux-lumen-cevir|Lüks Lümen Çevirici]] alanı da hesaba katarak çevirir."
      ]
    },
    {
      h: "9 watt LED kaç watt eski ampule denk gelir?",
      p: [
        "Avrupa Birliği'nin ampul etiketleme kuralları, bir LED'in \"60 W eşdeğeri\" olarak satılabilmesi için gereken en düşük lümen değerlerini tanımlar. Türkiye'de de etiketlerde aynı karşılıklar kullanılır. Bu yüzden eski ampulünüzün yerine LED seçerken watt değerine değil, kutunun üzerindeki lümene bakın."
      ],
      table: {
        head: ["Eski akkor ampul", "Gereken ışık", "Tipik LED gücü (yaklaşık)"],
        rows: [
          ["25 W", "249 lm", "3 W"],
          ["40 W", "470 lm", "5–6 W"],
          ["60 W", "806 lm", "8–10 W"],
          ["75 W", "1.055 lm", "10–12 W"],
          ["100 W", "1.521 lm", "13–16 W"]
        ],
        caption: "LED güç aralıkları, ürünün ışık verimine göre değişir; satın alırken her zaman lümen değerini karşılaştırın."
      },
      after: [
        "Yani 9 watt'lık bir LED, kutusunda yaklaşık 806 lümen yazıyorsa 60 W'lık eski ampule denk gelir. Aynı 9 W'lık iki LED'den biri 720, diğeri 900 lümen verebilir; ikincisi daha verimlidir. Eski kompakt floresan (tasarruflu) ampullerde de karşılaştırmayı lümenle yapmak gerekir."
      ]
    },
    {
      h: "Renk sıcaklığı (Kelvin) ve renksel geriverim",
      p: [
        "Renk sıcaklığı odanın havasını belirler. 2.700 K civarı ışık eski akkor ampullerin sarımsı tonuna yakındır ve dinlenme alanlarında rahatlatıcı bir ortam yaratır. 4.000 K nötr beyaz, mutfak ve çalışma alanlarında nesnelerin rengini doğal gösterir. 6.500 K ise gün ışığına benzeyen mavimsi beyazdır; atölye ve garaj gibi yerlerde tercih edilir, akşam saatlerinde yatak odası için fazla sert gelebilir."
      ],
      ul: [
        "<strong>2.700–3.000 K (sıcak beyaz):</strong> yatak odası, salon, yemek alanı",
        "<strong>3.500–4.000 K (nötr beyaz):</strong> mutfak, banyo aynası, çalışma odası, koridor",
        "<strong>5.000–6.500 K (soğuk beyaz):</strong> atölye, garaj, depo, hobi tezgâhı"
      ],
      after: [
        "Aynı odada farklı renk sıcaklıklarını karıştırmak (örneğin tavanda soğuk, abajurda sıcak ışık) göze dağınık görünür; bir oda için tek renk sıcaklığı seçmek genellikle daha iyi sonuç verir. Ambalajda <strong>Ra</strong> ya da CRI olarak yazan renksel geriverim değeri de önemlidir: 80 ve üzeri ev kullanımı için yeterlidir; makyaj aynası, mutfak ve resim gibi renklerin önemli olduğu yerlerde 90 ve üzeri tercih edilir."
      ]
    },
    {
      h: "LED'e geçmek ne kadar tasarruf sağlar?",
      p: [
        "Tasarruf, eski ve yeni ampulün güç farkının kullanım süresiyle çarpılmasıyla hesaplanır. 60 W'lık akkor ampulü 9 W'lık LED ile değiştirdiğinizde her saat 51 W, yani güç tüketiminin %85'i azalır."
      ],
      formula: "Yıllık tasarruf (kWh) = (eski W − LED W) × adet × günlük saat × 365 ÷ 1.000\nÖrnek: (60 − 9) × 5 ampul × 4 saat × 365 ÷ 1.000 = 372,3 kWh\nÖrnek birim fiyat 3 TL/kWh ile: 372,3 × 3 ≈ 1.117 TL/yıl",
      after: [
        "Birim fiyat örnek değerdir; kendi faturanızdaki kWh başına toplam bedeli kullanın. Elektrik faturasının nasıl oluştuğunu [[bilgi:elektrik-faturasi-nasil-hesaplanir|elektrik faturası nasıl hesaplanır]] yazısında, kendi ampul sayınız ve kullanım sürenizle yıllık tasarrufu ve LED'lerin kendini kaç ayda ödeyeceğini [[arac:led-tasarruf-hesapla|LED Tasarruf Hesaplama aracı]]nda görebilirsiniz."
      ]
    },
    {
      h: "Avize boyutu ve şerit LED adaptörü nasıl seçilir?",
      p: [
        "Avize seçiminde yaygın tasarım kuralı, odanın eni ile boyunun toplamından yola çıkar. Kural aslında feet ve inç ile tanımlanmıştır; metreye çevrildiğinde avize çapı (cm) ≈ (en + boy) metre × 8,3 olur. 4 m × 5 m'lik bir salon için (4 + 5) × 8,3 ≈ 75 cm çaplı bir avize orantılı görünür. Sarkıt avizenin altında yürüme alanında en az 2,10 m boşluk kalmalıdır; 2,70 m tavanda bu, en fazla 60 cm sarkma demektir. Ayrıntılı ölçü için [[arac:avize-boyutu-hesapla|Avize Boyutu Hesaplama aracı]] kullanılabilir.",
        "Şerit LED için adaptör gücü, şeridin metre başına gücü ile uzunluğunun çarpımına güvenlik payı eklenerek bulunur. Metre başına 14,4 W olan 5 metrelik şerit 72 W çeker; adaptörün sürekli tam yükte çalışmaması için %20 pay eklenince 86 W çıkar ve 100 W'lık adaptör seçilir. Adaptörün çıkış gerilimi (12 V ya da 24 V) şeridin gerilimiyle mutlaka aynı olmalıdır; 12 V'luk şeride 24 V vermek şeridi kısa sürede bozar."
      ]
    },
    {
      h: "Aydınlatma seçiminde sık yapılan hatalar",
      ul: [
        "<strong>LED'i watt'a göre seçmek:</strong> Parlaklık lümenle ölçülür; aynı watt'taki iki LED çok farklı ışık verebilir.",
        "<strong>Tek bir tavan lambasıyla her işi çözmeye çalışmak:</strong> Genel, görev ve vurgu aydınlatmasını katmanlamak daha az lümenle daha konforlu ortam sağlar.",
        "<strong>Koyu duvarları hesaba katmamak:</strong> Koyu renk boya ve ahşap kaplama ışığı yutar; aynı oda açık renkte belirgin şekilde daha aydınlık görünür.",
        "<strong>Dimmer uyumluluğuna bakmamak:</strong> Her LED ampul kısılabilir değildir; dimmerli devrede uyumsuz ampul titreyebilir.",
        "<strong>Renk sıcaklıklarını karıştırmak:</strong> Aynı odada 2.700 K ile 6.500 K'i bir arada kullanmak dağınık bir görüntü oluşturur."
      ]
    }
  ],
  faq: [
    ["Bir oda için kaç lümen gerekir?", "Oda alanını hedeflenen lüks değeriyle çarpın. 20 m²'lik bir salon için 150 lüks hedefle 3.000 lümen, 10 m²'lik bir mutfak için 300 lüks hedefle 3.000 lümen gerekir; koyu duvarlarda yüzde 20–30 pay ekleyin."],
    ["Lümen ile lüks arasındaki fark nedir?", "Lümen bir ampulün yaydığı toplam ışık miktarıdır, lüks ise bir yüzeye metrekare başına düşen ışıktır. 800 lümenlik ışık 4 m²'ye yayılırsa 200 lüks, 8 m²'ye yayılırsa 100 lüks aydınlık sağlar."],
    ["9 watt LED kaç watt eski ampule denk gelir?", "Ambalajında 806 lümen civarı yazan 9 watt'lık bir LED, 60 watt'lık akkor ampule denk gelir. Eşdeğerliği watt değil lümen belirler; bu yüzden satın alırken kutu üzerindeki lümen değerini kontrol edin."],
    ["Salon, mutfak ve çalışma odası için kaç lüks gerekir?", "Ev kullanımında salon için yaklaşık 150, mutfak için 300, çalışma masası için 500 lüks hedeflenir. Yatak odası ve koridorda 100 lüks genellikle yeterlidir; işyerleri için standart değerler daha yüksektir."],
    ["Renk sıcaklığı (Kelvin) nedir?", "Renk sıcaklığı ışığın rengini anlatır ve Kelvin ile ölçülür. 2.700–3.000 K sarımsı sıcak beyaz, 4.000 K nötr beyaz, 6.500 K mavimsi soğuk beyazdır; parlaklıkla ilgisi yoktur, yalnızca ışığın tonunu belirler."],
    ["LED'e geçmek ne kadar tasarruf sağlar?", "60 watt'lık akkor ampulü 9 watt'lık LED ile değiştirmek elektrik tüketimini yüzde 85 azaltır. Günde 4 saat yanan 5 ampulde bu, yılda yaklaşık 372 kWh tasarruf demektir; tutarı kendi birim fiyatınızla çarpın."],
    ["Avize boyutu oda ölçüsüne göre nasıl seçilir?", "Odanın eni ile boyu metre cinsinden toplanıp yaklaşık 8,3 ile çarpılırsa uygun avize çapı santimetre olarak bulunur. 4 × 5 m'lik oda için yaklaşık 75 cm çap uygundur; altında en az 2,10 m boşluk kalmalıdır."],
    ["Şerit LED için kaç watt adaptör gerekir?", "Şeridin metre başına gücü uzunlukla çarpılır ve yüzde 20 pay eklenir. Metre başına 14,4 W olan 5 metrelik şerit 72 W çeker; 86 W'a yuvarlanan ihtiyaç için 100 W'lık ve şeritle aynı gerilimde adaptör seçilir."]
  ],
  tools: ["aydinlatma-lumen-hesapla", "lux-lumen-cevir", "led-tasarruf-hesapla", "avize-boyutu-hesapla"],
  related: ["elektrik-faturasi-nasil-hesaplanir", "klima-kac-btu-olmali"],
  sources: [
    ["EUR-Lex – Yönlü olmayan lambalar için çevreye duyarlı tasarım (AB 1194/2012)", "https://eur-lex.europa.eu/eli/reg/2012/1194/oj"],
    ["T.C. Enerji ve Tabii Kaynaklar Bakanlığı", "https://enerji.gov.tr/"]
  ]
};
