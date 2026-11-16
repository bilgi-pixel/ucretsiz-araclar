export default {
  slug: "evde-nem-orani-kac-olmali-ciy-noktasi",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Evde Nem Oranı Kaç Olmalı? Çiy Noktası, Terleme ve Küf Oluşumu",
  pageTitle: "Evde Nem Oranı Kaç Olmalı? Çiy Noktası, Cam Terlemesi ve Küf",
  description: "Evde bağıl nem için yaygın öneri %40–60'tır. Çiy noktası nedir, Magnus formülüyle nasıl hesaplanır, camlar neden terler, küf hangi koşulda oluşur, havalandırma etkisi.",
  keywords: ["evde nem oranı kaç olmalı", "ideal nem oranı", "çiy noktası nedir", "cam terlemesi neden olur", "küf neden oluşur", "nem ölçer", "yatak odası nem", "kışın nem neden düşer"],
  lead: "Evde bağıl nem için en sık önerilen aralık <strong>%40–60</strong>'tır: bunun altında burun, boğaz ve cilt kurur, statik elektrik artar; üzerinde ise soğuk yüzeylerde yoğuşma, küf ve akar çoğalması riski yükselir. Cam terlemesi ve duvar küfü, nem oranından çok <strong>çiy noktasıyla</strong> ilgilidir: 21 °C ve %50 nemli bir odada çiy noktası yaklaşık 10 °C'dir ve yüzey sıcaklığı bunun altına düşen cam ya da duvarda su damlacıkları oluşur. Bu sayfada çiy noktasının hesabını, terleme ve küfün nedenlerini, havalandırmanın etkisini örnek hesaplarla anlatıyoruz.",
  kisaCevap: [
    "Evde bağıl nem için yaygın öneri %40–60, yaşam alanları için pratik hedef %45–55'tir.",
    "Çiy noktası, havanın içindeki su buharının yoğuşmaya başladığı sıcaklıktır; yüzey bu sıcaklığın altındaysa terler.",
    "21 °C ve %50 nemde çiy noktası ≈ 10,2 °C, 20 °C ve %60 nemde ≈ 12,0 °C'dir.",
    "Küf için yüzeydeki bağıl nemin uzun süre yaklaşık %80'in üzerinde kalması yeterlidir; damlacık görmek gerekmez.",
    "Kışın dışarıdan alınan soğuk hava içeride ısınınca bağıl nemi düşer; bu yüzden kısa havalandırma nemi etkili biçimde azaltır.",
    "Isıtmayı aşırı kısmak, mobilyayı dış duvara dayamak ve çamaşırı içeride kurutmak yoğuşmanın en yaygın nedenleridir."
  ],
  figure: {
    alt: "Çiy noktası şeması: 21 derece ve yüzde 50 nemli odada çiy noktası 10,2 derece; iç yüzey sıcaklığı 14 derece olan çift cam kuru kalıyor, 8 derece olan tek cam ya da soğuk köşe terliyor. Altta nem aralıkları: yüzde 40'ın altı kuru, 40–60 uygun, 60'ın üstü yoğuşma ve küf riski.",
    caption: "Bir yüzeyin terleyip terlemeyeceğini, yüzey sıcaklığı ile odanın çiy noktası arasındaki fark belirler. Örnekteki yüzey sıcaklıkları varsayımsaldır; gerçek değer camın türüne, dış sıcaklığa ve yalıtıma bağlıdır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Oda 21 °C · %50 nem → çiy noktası 10,2 °C</text>
  <line x1="80" y1="60" x2="80" y2="260" class="st sw" fill="none"/>
  <g class="sm end">
    <text x="72" y="64">22 °C</text><text x="72" y="114">18 °C</text><text x="72" y="164">14 °C</text><text x="72" y="214">10 °C</text><text x="72" y="264">6 °C</text>
  </g>
  <line x1="80" y1="211" x2="680" y2="211" class="sdg sw dash" fill="none"/>
  <text x="676" y="204" class="sm end b dg">çiy noktası 10,2 °C</text>
  <rect x="140" y="74" width="120" height="186" rx="4" class="ps"/>
  <text x="200" y="100" class="b mid">Oda havası</text>
  <text x="200" y="120" class="sm mid">21 °C</text>
  <rect x="320" y="164" width="120" height="96" rx="4" class="oks"/>
  <text x="380" y="190" class="b mid">Çift cam iç yüzü</text>
  <text x="380" y="210" class="sm mid">14 °C → kuru</text>
  <rect x="500" y="239" width="120" height="21" rx="4" class="dg"/>
  <text x="560" y="230" class="sm mid b dg">Soğuk köşe 8 °C → terler</text>
  <g class="sm mid">
    <rect x="80" y="298" width="200" height="40" class="y"/><text x="180" y="323" class="b">%40 altı: kuru hava</text>
    <rect x="280" y="298" width="200" height="40" class="oks"/><text x="380" y="323" class="b">%40–60: uygun</text>
    <rect x="480" y="298" width="200" height="40" class="dgs"/><text x="580" y="323" class="b">%60 üstü: yoğuşma riski</text>
  </g>
  <text x="380" y="370" class="sm mid t2">Bağıl nem (%) · 21 °C odada nem %60 olursa çiy noktası ≈ 12,9 °C'ye çıkar</text>
</svg>`
  },
  sections: [
    {
      h: "Bağıl nem nedir, evde ideal oran kaç?",
      p: [
        "Havadaki su buharı miktarının, o sıcaklıkta havanın taşıyabileceği en fazla su buharına oranına <strong>bağıl nem</strong> denir ve yüzde olarak ifade edilir. Sıcak hava soğuk havadan çok daha fazla su buharı taşıyabilir; bu yüzden aynı miktarda su buharı içeren hava ısındıkça bağıl nemi düşer, soğudukça yükselir.",
        "Konut için tek bir resmî \"doğru\" değer olmamakla birlikte, sağlık ve yapı kaynaklarının çoğu iç mekân bağıl nemi için <strong>%40–60</strong> aralığını önerir. Bu aralıkta solunum yollarının nemi korunur, ahşap mobilya ve parke çalışmaz, aynı zamanda akarlar ve küf için elverişli koşullar sınırlanır. Kış aylarında soğuk dış duvarları olan evlerde yoğuşmayı önlemek için aralığın alt yarısında, yaklaşık %40–50'de kalmak daha güvenlidir."
      ],
      table: {
        head: ["Bağıl nem", "Olası etkiler", "Ne yapılabilir?"],
        rows: [
          ["%30'un altı", "Burun ve boğaz kuruluğu, cilt kuruması, statik elektrik, ahşapta çatlama", "Aşırı ısıtmayı azaltın, gerekirse nemlendirici"],
          ["%30 – %40", "Hafif kuruluk hissi", "Bitkiler, kontrollü nemlendirme"],
          ["%40 – %60", "Çoğu ev için uygun aralık", "Düzenli havalandırmayla koruyun"],
          ["%60 – %70", "Soğuk yüzeylerde terleme, akar çoğalması", "Havalandırmayı artırın, nem kaynaklarını azaltın"],
          ["%70'in üzeri", "Yaygın yoğuşma, küf ve rutubet kokusu", "Kaynağı bulun; nem alma cihazı, yalıtım"]
        ],
        caption: "Değerler genel yönlendirme amaçlıdır. Astım, alerji gibi solunum yolu rahatsızlığı olanlar için uygun aralık hekimle belirlenmelidir."
      }
    },
    {
      h: "Çiy noktası nedir, nasıl hesaplanır?",
      p: [
        "<strong>Çiy noktası</strong>, havanın içindeki su buharı miktarı değişmeden soğutulduğunda yoğuşmanın başladığı sıcaklıktır. Bir yüzeyin sıcaklığı odadaki havanın çiy noktasının altındaysa, o yüzeye değen hava çiy noktasına kadar soğur ve su buharı damlacık olarak yüzeyde birikir. Soğuk bir bardağın dışının terlemesi de, kış sabahı camların buğulanması da bu yüzdendir.",
        "Çiy noktası, sıcaklık ve bağıl nemden Magnus formülüyle yaklaşık olarak hesaplanır. Formülde kullanılan sabitler (b = 17,62, c = 243,12 °C) günlük sıcaklık aralığında yeterli doğruluğu verir."
      ],
      formula: "γ = ln(BN ÷ 100) + b × T ÷ (c + T)\nÇiy noktası = c × γ ÷ (b − γ)   (b = 17,62; c = 243,12 °C)\nÖrnek: T = 21 °C, BN = %50 → γ ≈ 0,7078 → çiy noktası ≈ 10,2 °C",
      table: {
        head: ["Oda sıcaklığı", "Bağıl nem", "Çiy noktası (yaklaşık)"],
        rows: [
          ["20 °C", "%40", "6,0 °C"],
          ["21 °C", "%50", "10,2 °C"],
          ["22 °C", "%45", "9,5 °C"],
          ["20 °C", "%60", "12,0 °C"],
          ["22 °C", "%65", "15,1 °C"],
          ["20 °C", "%80", "16,4 °C"]
        ]
      },
      after: [
        "Tablo önemli bir şeyi gösterir: oda sıcaklığı değişmese de nem %40'tan %80'e çıktığında çiy noktası 6 °C'den 16 °C'ye yükselir. Yani nemli bir odada camların ve dış duvarların çok daha kolay terlemesi şaşırtıcı değildir. Kendi ölçümünüzle çiy noktasını, mutlak nemi ve yoğuşma riskini [[arac:ciy-noktasi-hesapla|Çiy Noktası Hesaplama]] aracıyla bulabilirsiniz."
      ]
    },
    {
      h: "Camlar neden terler?",
      p: [
        "Kışın camın iç yüzeyi, dış havayla temas eden en soğuk yüzeylerden biridir. Tek camlı ya da yalıtımı zayıf pencerelerde iç yüzey sıcaklığı odanın çiy noktasının altına kolayca iner ve cam terler. Çift camlı (yalıtımlı) pencerelerde iç yüzey daha sıcak kaldığı için terleme daha seyrek görülür; yine de çerçeve kenarlarında ve alt köşelerde, yani ısının en çok kaçtığı noktalarda damlacık oluşabilir.",
        "Örnek: 21 °C ve %50 nemli bir odanın çiy noktası yaklaşık 10,2 °C'dir. Dış hava 0 °C iken iç yüzeyi 14 °C'de kalan bir cam kuru kalır; iç yüzeyi 8 °C'ye düşen bir cam ya da soğuk bir köşe ise terler. Aynı odada nem %60'a çıkarsa çiy noktası yaklaşık 13 °C'ye yaklaşır ve sınırdaki yüzeyler de terlemeye başlar.",
        "Çift camın arasındaki buğu ise farklı bir durumdur: camlar arasındaki yalıtım bozulmuş demektir ve havalandırma ile çözülmez; ünitenin değişmesi gerekir."
      ]
    },
    {
      h: "Duvarda küf hangi koşullarda oluşur?",
      p: [
        "Küf mantarları, yüzeydeki nem uzun süre yüksek kaldığında çoğalır. Önemli olan odanın genel nem oranı değil, <strong>yüzeyin hemen önündeki havanın bağıl nemi</strong>dir. Soğuk bir duvar köşesinde hava odanın geri kalanından birkaç derece soğuk olduğu için bağıl nemi daha yüksektir. Yüzeydeki bağıl nem günlerce yaklaşık %80'in üzerinde kalırsa, ortada görünür su damlası olmasa bile küf gelişebilir.",
        "Küfün en sık görüldüğü yerler bu yüzden tahmin edilebilir: dış duvarların köşeleri, tavan-duvar birleşimleri, pencere çevreleri, kolon ve kirişlerin olduğu ısı köprüleri, dış duvara dayalı dolapların ve yatakların arkası. Banyo ve mutfak gibi nem üretimi yüksek odalar da risk taşır.",
        "Küfün sağlık etkileri, özellikle astım ve alerjisi olanlar, çocuklar ve yaşlılar için önemlidir. Geniş alanlı küfte kaynağın bulunması (yoğuşma, sızıntı, kılcal nem) ve temizliğin uygun koruyucu önlemlerle yapılması gerekir; tekrarlayan ya da yaygın küfte bir yapı uzmanından destek almak yerinde olur."
      ]
    },
    {
      h: "Kışın nem neden düşer, yazın neden artar?",
      p: [
        "Kışın dış hava soğuktur ve soğuk hava çok az su buharı taşıyabilir. 0 °C'de %80 bağıl nemli dış havanın metreküpünde yaklaşık 3,9 gram su buharı vardır. Bu hava içeri alınıp 20 °C'ye ısıtıldığında aynı su miktarı, 20 °C havanın taşıyabileceği yaklaşık 17,3 gramın ancak %22'si kadardır. Sonuç: dışarıda nemli görünen kış havası, içeride ısındığında çok kuru bir havaya dönüşür. Kalorifer ve sobalı evlerde bu yüzden kışın nem %30'un altına düşebilir.",
        "Aynı ev, kalabalık bir aile, içeride kurutulan çamaşır, yemek pişirme ve duşla da günde litrelerce su buharı üretir. Havalandırma yetersizse bu nem dışarı atılamaz ve soğuk yüzeylerde yoğuşur. Bu yüzden aynı kış mevsiminde bir evde kuruluk, diğerinde küf şikâyeti görülebilir. Yazın ise dış havanın mutlak nemi yüksektir; özellikle kıyı bölgelerinde iç mekân nemi %60–70'in üzerine çıkabilir."
      ]
    },
    {
      h: "Havalandırma nemi ne kadar düşürür?",
      p: [
        "Kış aylarında havalandırma, iç mekân nemini düşürmenin en etkili ve en ucuz yoludur, çünkü dışarıdaki soğuk havanın mutlak nemi içeridekinden düşüktür. En verimli yöntem pencereleri sürekli aralık bırakmak değil, günde birkaç kez <strong>5–10 dakika karşılıklı pencereleri tamamen açmaktır</strong>. Bu kısa sürede hava değişir, ama duvarlar ve eşyalar soğumaya fırsat bulmaz; pencere kapatıldıktan sonra oda hızla yeniden ısınır."
      ],
      ul: [
        "<strong>Duş ve yemekten sonra:</strong> Banyo ve mutfak kapısını kapalı tutup aspiratörü çalıştırın ya da pencereyi açın.",
        "<strong>Çamaşır kurutma:</strong> Mümkünse balkonda ya da havalandırılan bir odada, kapı kapalıyken kurutun.",
        "<strong>Mobilya yerleşimi:</strong> Dolap ve yatakları dış duvardan birkaç santimetre uzak tutun; arkada hava dolaşsın.",
        "<strong>Isıtmayı aşırı kısmayın:</strong> Hiç ısıtılmayan odalar soğuk yüzeyler oluşturur; kapıları kapalı tutun ya da düşük düzeyde ısıtın.",
        "<strong>Ölçün:</strong> Basit bir higrometre (nem ölçer) ile odaları ve farklı saatleri karşılaştırın; ev tipi cihazların birkaç puan sapabileceğini unutmayın."
      ],
      after: [
        "Bu önlemlere rağmen nem sürekli %60'ın üzerindeyse ve yoğuşma devam ediyorsa nem alma cihazı (nem giderici) düşünülebilir; ancak cihaz, sızıntı ya da yalıtım eksikliği gibi temel bir sorunu çözmez, yalnızca belirtisini azaltır."
      ]
    },
    {
      h: "Nem alma cihazı ve nemlendirici ne zaman gerekir?",
      p: [
        "<strong>Nem alma cihazı</strong>, yoğun kullanılan bodrum katları, güneş almayan zemin katları, kıyı bölgelerindeki evler ve tadilat sonrası kuruması gereken mekânlar için uygundur. Havalandırma yapılamayan ya da dış havanın da nemli olduğu yaz aylarında da işe yarar. Cihaz seçerken günlük nem alma kapasitesine ve odanın büyüklüğüne bakılır; elektrik tüketimi de hesaba katılmalıdır.",
        "<strong>Nemlendirici</strong> ise kışın nemin uzun süre %30'un altında kaldığı evlerde düşünülebilir. Nemlendiriciyi aşırı çalıştırmak, kuru havadan daha büyük bir sorun olan yoğuşma ve küfe yol açabilir. Bu yüzden nemlendirici kullanıyorsanız nemi ölçerek %50'nin üzerine çıkmamaya özen gösterin ve cihazı üreticinin önerdiği şekilde düzenli temizleyin; hijyeni sağlanmayan haznede mikroorganizmalar çoğalabilir."
      ]
    },
    {
      h: "Bebek odasında nem nasıl ayarlanır?",
      p: [
        "Bebek odası için de genel öneri %40–60 aralığında kalmaktır; oda sıcaklığı için yaygın olarak 20–22 °C civarı önerilir. Bebek odasında amaç kuruluğu gidermek kadar fazla nemi önlemektir, çünkü küf ve akarlar özellikle küçük çocuklar için solunum yolu sorunlarını tetikleyebilir.",
        "Pratikte günde birkaç kez kısa havalandırma yapmak, beşiği dış duvardan ve pencereden uzak tutmak, odada çamaşır kurutmamak ve bir nem ölçerle değeri izlemek çoğu zaman yeterlidir. Bebeğinizde sık tekrarlayan öksürük, hırıltı ya da burun tıkanıklığı varsa ortam koşullarını düzenlemenin yanında mutlaka çocuk hekimine başvurun."
      ],
      note: "Bu sayfadaki değerler genel bilgi amaçlıdır. Solunum yolu hastalıkları, küf temizliği ve yapı kaynaklı nem sorunları için hekiminize ve bir yapı uzmanına danışın."
    }
  ],
  faq: [
    ["Evde ideal bağıl nem oranı yüzde kaç olmalı?", "Çoğu kaynak iç mekân için yüzde 40 ile 60 arasını önerir. Kışın soğuk dış duvarları olan evlerde yoğuşmayı önlemek için yüzde 40 ile 50 arasında kalmak daha güvenlidir; astımı olanlar için uygun aralık hekimle belirlenmelidir."],
    ["Çiy noktası nedir, nasıl hesaplanır?", "Çiy noktası, havanın içindeki su buharının yoğuşmaya başladığı sıcaklıktır. Sıcaklık ve bağıl nemden Magnus formülüyle hesaplanır; 21 °C ve yüzde 50 nemde çiy noktası yaklaşık 10,2 °C bulunur."],
    ["Camlar neden terler?", "Camın iç yüzey sıcaklığı odadaki havanın çiy noktasının altına düştüğünde yüzeye değen havadaki su buharı yoğuşur. Tek camlı ve yalıtımı zayıf pencereler, çerçeve kenarları ve nemin yüksek olduğu odalar bu yüzden daha çok terler."],
    ["Duvarda küf hangi koşullarda oluşur?", "Yüzeyin önündeki havanın bağıl nemi uzun süre yaklaşık yüzde 80'in üzerinde kaldığında küf gelişebilir. Dış duvar köşeleri, pencere çevreleri, ısı köprüleri ve dış duvara dayalı mobilyaların arkası en riskli yerlerdir."],
    ["Kışın nem neden düşer, yazın neden artar?", "Kışın soğuk dış hava çok az su buharı taşır; içeride ısındığında bağıl nemi belirgin şekilde düşer. 0 °C ve yüzde 80 nemli hava 20 °C'ye ısıtılınca nemi yaklaşık yüzde 22'ye iner. Yazın ise dış havanın mutlak nemi yüksektir."],
    ["Havalandırma nemi ne kadar düşürür?", "Kışın günde birkaç kez 5 ile 10 dakika karşılıklı pencereleri tamamen açmak, nemli iç havayı daha kuru dış havayla değiştirir ve nemi belirgin şekilde düşürür. Pencereyi sürekli aralık bırakmak duvarları soğuttuğu için daha az verimlidir."],
    ["Nem alma cihazı ne zaman gerekir?", "Havalandırma ve nem kaynaklarını azaltmaya rağmen nem sürekli yüzde 60'ın üzerindeyse ve yoğuşma sürüyorsa nem alma cihazı düşünülebilir. Bodrum ve zemin katlar ile kıyı bölgelerindeki evlerde daha sık gerekir; sızıntı ve yalıtım sorununu ise çözmez."],
    ["Bebek odasında nem nasıl ayarlanır?", "Bebek odası için de yüzde 40 ile 60 arası önerilir. Kısa ve düzenli havalandırma, odada çamaşır kurutmamak ve bir nem ölçerle izlemek çoğu zaman yeterlidir; tekrarlayan solunum yolu belirtilerinde çocuk hekimine başvurulmalıdır."],
    ["Nem ölçer (higrometre) ne kadar doğru ölçer?", "Ev tipi higrometreler birkaç puan sapabilir; bu da çiy noktasında yaklaşık bir derecelik farka yol açar. Cihazı odanın ortasında, pencere ve ısıtıcıdan uzak tutmak ve farklı saatlerde ölçmek daha güvenilir sonuç verir."]
  ],
  tools: ["ciy-noktasi-hesapla", "celsius-fahrenheit-cevir", "ruzgar-hissedilen-sicaklik-hesapla"],
  related: ["hissedilen-sicaklik-nedir", "mantolama-nedir-kac-cm-olmali", "dogalgaz-faturasi-ve-kombi-kapasitesi"],
  sources: [
    ["DSÖ – İç mekân hava kalitesi: nem ve küf rehberi", "https://www.who.int/publications/i/item/9789289041683"],
    ["T.C. Sağlık Bakanlığı", "https://www.saglik.gov.tr/"]
  ],
  uyari: "tıbbi tavsiye değildir; solunum yolu şikâyetlerinde hekiminize, yapı kaynaklı nemde bir uzmana danışın"
};
