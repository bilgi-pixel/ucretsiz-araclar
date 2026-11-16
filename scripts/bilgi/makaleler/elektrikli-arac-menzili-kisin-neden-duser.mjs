export default {
  slug: "elektrikli-arac-menzili-kisin-neden-duser",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Elektrikli Araç Menzili Kışın Neden Düşer? Soğukta Gerçek Menzil Hesabı",
  pageTitle: "Elektrikli Araç Kış Menzili: Soğukta Menzil Neden Düşer?",
  description: "Elektrikli araç menzili kışın neden düşer, kayıp yüzde kaç olur? Isıtma, batarya kimyası, ısı pompası, ön ısıtma, hız etkisi ve kış menzili hesabı çözümlü örnekle.",
  keywords: ["elektrikli araç kış menzili", "soğukta menzil kaybı", "ısı pompası elektrikli araç", "elektrikli araç kaç km gider", "kwh 100 km tüketim", "ön ısıtma elektrikli araç", "kışın şarj süresi", "elektrikli araç menzil hesabı"],
  lead: "Elektrikli araçların menzili kışın, kabini ısıtmak için bataryadan ek enerji harcandığı ve soğuk bataryanın daha az verimli çalıştığı için düşer; sıfırın altındaki sıcaklıklarda ve kısa şehir içi yolculuklarda kayıp yüzde 20–40 aralığına çıkabilir. Gerçek menzil, kullanılabilir enerji ÷ kış tüketimi × 100 formülüyle hesaplanır. Bu yazıda kaybın nedenlerini, ısı pompası ve ön ısıtmanın etkisini, hızın tüketime katkısını ve 60 kWh'lik örnek bir aracın kış menzilini adım adım bulacaksınız.",
  kisaCevap: [
    "Kış menzil kaybının iki ana nedeni kabin ısıtması için harcanan enerji ve soğuk bataryanın iç direncinin artmasıdır.",
    "Kayıp; sıcaklığa, yolculuk süresine, hıza ve ısıtma sistemine göre değişir; donma noktası civarında %10–30, çok soğukta ve kısa yolculuklarda daha fazla olabilir.",
    "Gerçek menzil (km) = batarya kapasitesi × (başlangıç % − rezerv %) ÷ 100 ÷ tüketim (kWh/100 km) × 100.",
    "Örnek: 60 kWh, %80'den %10'a, kışın 20,8 kWh/100 km tüketimle ≈ 202 km gidilir.",
    "Isı pompası, rezistanslı ısıtıcıya göre aynı ısıyı belirgin biçimde daha az elektrikle üretir.",
    "Araç şarjdayken ön ısıtma yapmak kabini ve bataryayı şebeke enerjisiyle ısıtır, yoldaki tüketimi azaltır.",
    "Soğuk batarya hızlı şarjda daha düşük güç kabul ettiği için kışın şarj süresi uzar."
  ],
  figure: {
    alt: "Elektrikli araç yaz ve kış menzili karşılaştırması: 60 kWh batarya, yazın 16 kWh/100 km ile 375 km, kışın 20,8 kWh/100 km ile 288 km; %80'den %10'a kullanımda 202 km.",
    caption: "Aynı 60 kWh'lik araçta tüketimin yüzde 30 artması menzili 375 km'den 288 km'ye indirir. Bataryayı %80'e kadar şarj edip %10 rezerv bıraktığınızda kışın kullanılabilir menzil yaklaşık 202 km'dir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">60 kWh'lik araçta yaz ve kış menzili</text>
  <text x="20" y="66" class="sm t2">0 km</text>
  <line x1="170" y1="74" x2="170" y2="260" class="sb" fill="none"/>
  <g class="sm">
    <text x="20" y="100" class="b">Yaz, %100 → %0</text>
    <rect x="170" y="86" width="450" height="26" rx="4" class="oks"/><text x="628" y="104" class="b">375 km</text>
    <text x="20" y="150" class="b">Kış, %100 → %0</text>
    <rect x="170" y="136" width="346" height="26" rx="4" class="ps"/><text x="524" y="154" class="b">288 km</text>
    <text x="20" y="200" class="b">Kış, %80 → %10</text>
    <rect x="170" y="186" width="242" height="26" rx="4" class="p"/><text x="420" y="204" class="b p">≈ 202 km</text>
    <text x="20" y="250" class="t2">Tüketim</text>
    <text x="170" y="250">yaz 16 kWh/100 km · kış 20,8 kWh/100 km (+%30)</text>
  </g>
  <rect x="20" y="276" width="330" height="128" rx="8" class="sf sb"/>
  <text x="36" y="302" class="b">Kışın enerji nereye gider?</text>
  <text x="36" y="328" class="sm">Kabin ısıtması (rezistans 3–6 kW)</text>
  <text x="36" y="350" class="sm">Bataryayı ısıtma ve iç direnç</text>
  <text x="36" y="372" class="sm">Soğuk, yoğun hava: daha çok sürtünme</text>
  <text x="36" y="394" class="sm">Kış lastiği, ıslak ya da karlı yol</text>
  <rect x="370" y="276" width="330" height="128" rx="8" class="ps"/>
  <text x="386" y="302" class="b">Isıtıcının 100 km'ye etkisi (5 kW)</text>
  <text x="386" y="328" class="sm">Şehir, 25 km/sa: +20 kWh/100 km</text>
  <text x="386" y="350" class="sm">Karayolu, 50 km/sa: +10 kWh/100 km</text>
  <text x="386" y="372" class="sm">Otoyol, 110 km/sa: +4,5 kWh/100 km</text>
  <text x="386" y="394" class="sm t2">Yavaş giderken ısıtma payı büyür</text>
</svg>`
  },
  sections: [
    {
      h: "Soğuk hava elektrikli araç menzilini neden düşürür?",
      p: [
        "Benzinli ya da dizel bir motor yakıttaki enerjinin büyük bölümünü ısı olarak kaybeder; kışın bu atık ısı kabini ısıtmak için \"bedavaya\" kullanılır. Elektrikli motor ise çok verimlidir ve neredeyse hiç atık ısı üretmez. Bu nedenle kabini ısıtmak için gereken enerji doğrudan bataryadan çekilir ve tekerlere gidecek enerjiden eksilir.",
        "İkinci neden bataryanın kendisidir. Lityum iyon hücrelerdeki kimyasal tepkimeler soğukta yavaşlar, iç direnç artar. Aynı güç çekildiğinde daha fazla enerji ısı olarak kaybolur ve bataryanın verebileceği anlık güç sınırlanır. Batarya yönetim sistemi hücreleri korumak için bataryayı belirli bir sıcaklığa kadar ısıtır; bu da ayrıca enerji harcar.",
        "Üçüncü grup nedenler aracın çevresiyle ilgilidir. Soğuk hava daha yoğundur ve hava direncini biraz artırır. Kış lastikleri ve ıslak, karlı yollar yuvarlanma direncini yükseltir. Lastik basıncı soğukta düşer; düşük basınç da tüketimi artırır. Basıncı düzenli kontrol etmek için [[bilgi:lastik-basinci-kac-bar-psi-olmali|lastik basıncı]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Kışın menzil kaybı ortalama yüzde kaç olabilir?",
      p: [
        "Tek bir doğru oran yoktur; kayıp sıcaklığa, yolculuğun süresine, hıza, ısıtma sistemine ve sürücünün kabin sıcaklığı tercihine bağlıdır. Genel olarak 0 °C civarında yüzde 10–30, −10 °C ve altında ve özellikle kısa, sık duraklı yolculuklarda yüzde 30–40'a varan kayıplar görülebilir. Uzun otoyol yolculuğunda kabin ve batarya bir kez ısındıktan sonra kayıp oranı azalır.",
        "Kısa yolculukların daha fazla etkilenmesinin nedeni, her başlangıçta soğuk kabini ve bataryayı ısıtmak için harcanan enerjinin az kilometreye bölünmesidir. 10 dakikalık bir sabah yolculuğunda tüketim, aynı aracın 2 saatlik bir otoyol yolculuğundaki ortalama tüketimin belirgin biçimde üzerinde çıkabilir."
      ],
      table: {
        head: ["Koşul", "Tüketime ek (örnek)", "60 kWh araçta %100 → %0 menzil"],
        rows: [
          ["Ilık hava, ısıtma yok", "%0 (16 kWh/100 km)", "375 km"],
          ["Serin, hafif ısıtma", "+%10 (17,6)", "341 km"],
          ["0 °C civarı, ısı pompalı", "+%20 (19,2)", "313 km"],
          ["0 °C civarı, rezistanslı", "+%30 (20,8)", "288 km"],
          ["−10 °C, kısa şehir içi", "+%40 (22,4)", "268 km"]
        ],
        caption: "Oranlar örnek amaçlıdır; kendi aracınızın kış ortalama tüketimini yol bilgisayarından okuyun."
      }
    },
    {
      h: "Batarya kapasitesi ve tüketimden gerçek menzil nasıl hesaplanır?",
      formula: "Kullanılabilir enerji (kWh) = kullanılabilir kapasite × (başlangıç % − rezerv %) ÷ 100\nKış tüketimi = yaz tüketimi × (1 + ek pay %)\nMenzil (km) = kullanılabilir enerji ÷ kış tüketimi × 100",
      ol: [
        "Kullanılabilir batarya kapasitesini bulun: örnek 60 kWh (brüt değil net kapasite).",
        "Bataryayı ne kadar kullanacağınızı belirleyin: %80'den %10'a kadar → 60 × 70 ÷ 100 = 42 kWh.",
        "Kış tüketimini hesaplayın: yaz ortalaması 16 kWh/100 km, ek pay %30 → 16 × 1,30 = 20,8 kWh/100 km.",
        "Menzili bulun: 42 ÷ 20,8 × 100 ≈ 201,9 km.",
        "Karşılaştırın: aynı koşullarda yazın 42 ÷ 16 × 100 = 262,5 km gidilirdi; kayıp yaklaşık 60 km'dir."
      ],
      after: [
        "Bu hesabı [[arac:elektrikli-arac-menzil-hesapla|Elektrikli Araç Menzil Hesaplama aracında]] \"ek tüketim payı\" alanına kış oranını yazarak yapabilirsiniz. Araç, kalan şarj yüzdesine ve rezervinize göre her yüzde birlik şarjla kaç kilometre gideceğinizi de gösterir."
      ]
    },
    {
      h: "Isı pompası menzil kaybını nasıl azaltır?",
      p: [
        "Klasik ısıtıcı, bir rezistanstan akım geçirerek ısı üretir; 1 kWh elektrik en fazla 1 kWh ısı verir. Isı pompası ise buzdolabının tersine çalışır: dış havadaki ve aracın elektronik aksamındaki ısıyı toplayıp kabine taşır. Bu yüzden ılımlı soğuklarda 1 kWh elektrikle 2–3 kWh ısı elde edebilir.",
        "Rezistanslı bir ısıtıcı ilk dakikalarda 3–6 kW güç çekebilir. 5 kW'lık ısıtmanın etkisini düşünelim: saatte 25 km ortalama hızla yapılan şehir içi yolculukta 100 km için 4 saat geçer ve ısıtma 20 kWh ekler; 50 km/sa ortalamayla 10 kWh, 110 km/sa otoyolda yaklaşık 4,5 kWh ekler. Yani ısıtmanın payı yavaş gidildiğinde çok büyür.",
        "Isı pompasının avantajı dış sıcaklık çok düştüğünde azalır; çok soğuk havalarda birçok araç ısı pompasını rezistansla destekler. Yine de 0 °C civarındaki tipik Türkiye kışında ısı pompası kış kaybını belirgin biçimde azaltır."
      ]
    },
    {
      h: "Ön ısıtma (preconditioning) nedir?",
      p: [
        "Ön ısıtma, araç yola çıkmadan önce kabinin ve bataryanın uygulama ya da zamanlayıcıyla ısıtılmasıdır. Araç şarj kablosuna bağlıyken yapılırsa gereken enerji bataryadan değil şebekeden gelir. Yola çıktığınızda kabin sıcaktır, batarya çalışma sıcaklığına yakındır; ilk kilometrelerdeki yüksek tüketim büyük ölçüde ortadan kalkar.",
        "Hızlı şarj istasyonuna giderken yapılan \"batarya ön koşullandırması\" ise farklı bir amaç taşır: batarya şarj için uygun sıcaklığa getirilir ve istasyonda daha yüksek güçle şarj alınır. Birçok araç navigasyonda hızlı şarj istasyonu hedef seçildiğinde bunu otomatik yapar.",
        "Yolda ise kabin havasını ısıtmak yerine koltuk ve direksiyon ısıtmasını kullanmak çok daha az enerji harcar; bu sistemler yalnızca birkaç yüz watt çeker. Kabin sıcaklığını 1–2 derece düşük tutmak da tüketimi ölçülebilir biçimde azaltır."
      ]
    },
    {
      h: "Yol hızı tüketimi ne kadar artırır?",
      p: [
        "Elektrikli araçta tüketimin en büyük belirleyicisi hızdır, çünkü hava direnci hızın karesiyle artar. 90 km/sa yerine 110 km/sa gitmek hava direncinden kaynaklanan kuvveti (110 ÷ 90)² ≈ 1,49 kat, yani yaklaşık yüzde 50 artırır. Toplam tüketim bu kadar artmaz, çünkü yuvarlanma direnci ve yardımcı sistemler de vardır; ama otoyolda 110 ile 130 km/sa arasındaki fark menzili belirgin biçimde değiştirir.",
        "Kışın bu etki ısıtmayla birleşir. Şehir içinde düşük hız sayesinde hava direnci azdır ama ısıtma payı büyüktür; otoyolda ısıtma payı küçülür ama hava direnci büyür. İki etkinin en dengeli olduğu nokta genellikle 70–90 km/sa aralığıdır. Benzinli araçlarla tüketimi karşılaştırmak isterseniz [[bilgi:100-km-de-kac-litre-yakit-hesaplama|100 km'de kaç litre yakıt]] yazısı karşılaştırmalı bir bakış sunar."
      ]
    },
    {
      h: "Kışın şarj süresi neden uzar, maliyet nasıl değişir?",
      p: [
        "Soğuk batarya yüksek akımla şarj edilirse hücrelerde lityum kaplama denilen kalıcı hasar oluşabilir. Batarya yönetim sistemi bunu önlemek için batarya ısınana kadar şarj gücünü sınırlar. Bu yüzden kışın, özellikle sabah ilk şarjda ya da uzun süre park edilmiş araçta, hızlı şarj istasyonunda beklenen gücün çok altında değerler görebilirsiniz. Ön koşullandırma bu sorunu büyük ölçüde çözer.",
        "Maliyet tarafında kış tüketimi yüzde 30 arttıysa 100 km'nin enerji maliyeti de yaklaşık yüzde 30 artar. Örneğin kWh başına 10 TL ödenen bir istasyonda (örnek fiyat) 16 kWh/100 km ile 100 km 160 TL, 20,8 kWh/100 km ile 208 TL tutar. Ayrıca soğuk havada şarj sırasında bataryayı ısıtmak için kullanılan enerji de faturaya yansır.",
        "Kendi şarj maliyetinizi [[arac:elektrikli-arac-sarj-maliyeti-hesapla|Elektrikli Araç Şarj Maliyeti aracıyla]] ve aracın kilometre başına toplam maliyetini [[arac:kilometre-maliyeti-hesapla|Kilometre Maliyeti aracıyla]] hesaplayabilirsiniz. Evde ve istasyonda şarj fiyatlarının ayrıntılı karşılaştırması [[bilgi:elektrikli-arac-sarj-maliyeti-ne-kadar|elektrikli araç şarj maliyeti]] yazısındadır."
      ]
    },
    {
      h: "Kışın uzun yol planlarken şarj durakları nasıl seçilir?",
      ol: [
        "Kış tüketiminizi bilin: son birkaç soğuk günün ortalama kWh/100 km değerini yol bilgisayarından not edin.",
        "Menzili rezervle hesaplayın: kışın en az %10–15 rezerv bırakın; soğuk ve rüzgârlı havada tahmin ile gerçek arasındaki fark büyüyebilir.",
        "Durakları menzilin yüzde 70–80'i kadar aralıklarla seçin; böylece bir istasyon arızalı ya da doluysa sonrakine ulaşabilirsiniz.",
        "Hızlı şarjda bataryayı genellikle %10–80 aralığında tutun; %80'den sonra şarj gücü belirgin düşer ve beklemek verimsizleşir.",
        "İstasyona yaklaşırken ön koşullandırmayı başlatın ya da navigasyonda istasyonu hedef olarak girin.",
        "Dağ geçitlerinde yükseklik kazanımını hesaba katın; tırmanış tüketimi artırır, inişte rejeneratif frenle bir kısmı geri kazanılır."
      ]
    },
    {
      h: "Kış menzilini artırmak için pratik öneriler",
      ul: [
        "Aracı mümkünse kapalı ya da rüzgârdan korunaklı yerde park edin; batarya daha yavaş soğur.",
        "Şarja bağlıyken ön ısıtma yapın; yola sıcak kabin ve sıcak bataryayla çıkın.",
        "Koltuk ve direksiyon ısıtmasını tercih edin, kabin sıcaklığını bir iki derece düşük tutun.",
        "Lastik basıncını soğuk havada kontrol edin; her 10 °C düşüş basıncı yaklaşık 0,1 bar düşürür.",
        "Eco sürüş modunu kullanın, ani hızlanmalardan kaçının ve otoyolda hızı makul tutun.",
        "Bataryayı uzun süre çok düşük şarjla soğukta bırakmayın; kullanılmayacaksa yaklaşık %50 civarında tutun.",
        "Kar ve buz araç üzerinde ek yük ve hava direnci oluşturur; yola çıkmadan temizleyin."
      ],
      after: [
        "Elektrikli araçlarda da ayrı bir 12 V aküsü bulunur ve soğukta zayıflayabilir. Bu akünün kontrolü için [[bilgi:arac-akusu-kac-volt-olmali-aku-omru|araç aküsü kaç volt olmalı]] yazısına bakabilirsiniz."
      ]
    }
  ],
  faq: [
    ["Soğuk hava elektrikli araç menzilini neden düşürür?", "Elektrikli motor atık ısı üretmediği için kabini ısıtan enerji doğrudan bataryadan çekilir. Ayrıca soğukta bataryanın iç direnci artar, batarya kendini ısıtmak için enerji harcar ve kış lastiği ile soğuk, yoğun hava sürtünmeyi artırır."],
    ["Kışın menzil kaybı ortalama yüzde kaç olabilir?", "0 °C civarında yüzde 10–30, çok soğukta ve kısa şehir içi yolculuklarda yüzde 30–40'a varan kayıplar görülebilir. Kesin oran sıcaklığa, hıza, yolculuk süresine ve aracın ısıtma sistemine göre değişir."],
    ["Isı pompası menzil kaybını nasıl azaltır?", "Isı pompası dış havadaki ve elektronik aksamdaki ısıyı kabine taşıdığı için 1 kWh elektrikle 2–3 kWh ısı üretebilir. Rezistanslı ısıtıcı ise 1 kWh ile en fazla 1 kWh ısı verir; bu fark kış kaybını belirgin biçimde azaltır."],
    ["Ön ısıtma (preconditioning) nedir?", "Ön ısıtma, araç yola çıkmadan önce kabinin ve bataryanın ısıtılmasıdır. Araç şarja bağlıyken yapılırsa enerji şebekeden gelir, yolda bataryadan harcanan enerji ve ilk kilometrelerdeki yüksek tüketim azalır."],
    ["Batarya kapasitesi ve tüketimden gerçek menzil nasıl hesaplanır?", "Kullanılabilir kapasiteyi kullanacağınız şarj aralığıyla çarpıp kullanılabilir enerjiyi bulun, sonra kış tüketimine bölüp 100 ile çarpın. Örneğin 60 kWh, %80'den %10'a ve 20,8 kWh/100 km ile yaklaşık 202 km çıkar."],
    ["Kışın şarj süresi neden uzar?", "Soğuk batarya yüksek akımla şarj edilirse hücreler zarar görebileceği için batarya yönetim sistemi batarya ısınana kadar şarj gücünü sınırlar. Hızlı şarj istasyonuna giderken ön koşullandırma yapmak bu süreyi kısaltır."],
    ["Yol hızı tüketimi ne kadar artırır?", "Hava direnci hızın karesiyle arttığı için 90 yerine 110 km/sa gitmek hava direncini yaklaşık yüzde 50 artırır. Toplam tüketim bundan daha az artar ama otoyolda yüksek hız menzili belirgin biçimde kısaltır."],
    ["Şarj maliyeti kış ve yaz arasında nasıl değişir?", "Kışın tüketim yüzde 30 artarsa 100 km'nin enerji maliyeti de yaklaşık yüzde 30 artar. Örneğin kWh'si 10 TL olan şarjda 100 km yazın 160 TL, kışın 208 TL tutar; fiyatlar örnektir."],
    ["Uzun yol planlarken şarj durakları nasıl seçilir?", "Kış tüketiminizle hesaplanan menzilin yüzde 70–80'i aralıklarla durak seçin, en az yüzde 10–15 rezerv bırakın ve hızlı şarjda bataryayı yüzde 10–80 aralığında kullanın. İstasyona yaklaşırken ön koşullandırmayı açın."]
  ],
  tools: ["elektrikli-arac-menzil-hesapla", "elektrikli-arac-sarj-maliyeti-hesapla", "kilometre-maliyeti-hesapla"],
  related: ["elektrikli-arac-sarj-maliyeti-ne-kadar", "lastik-basinci-kac-bar-psi-olmali"]
};
