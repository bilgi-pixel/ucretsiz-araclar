export default {
  slug: "termosifon-kac-litre-olmali-su-isitma-maliyeti",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Termosifon Kaç Litre Olmalı? Kişi Sayısına Göre Seçim ve Isıtma Maliyeti",
  pageTitle: "Termosifon Kaç Litre Olmalı? Kişi Sayısı, Isınma Süresi, Maliyet",
  description: "Kaç kişiye kaç litre termosifon gerekir, su kaç saatte ısınır, aylık elektrik maliyeti nasıl hesaplanır? Q=m·c·ΔT ile çözümlü örnekler ve kullanım ipuçları.",
  keywords: ["termosifon kaç litre olmalı", "kaç kişiye kaç litre termosifon", "termosifon elektrik tüketimi", "termosifon kaç saatte ısınır", "termosifon kaç derece", "termosifon mu şofben mi", "su ısıtma maliyeti", "termosifon sürekli açık mı kalmalı"],
  lead: "Termosifon hacmi için yaygın ölçü, 1–2 kişilik evde <strong>50 litre</strong>, 3–4 kişide <strong>65–80 litre</strong>, 5 ve daha kalabalık hanede <strong>100 litre ve üzeridir</strong>; asıl belirleyici ise aynı saat diliminde arka arkaya kaç duş alındığıdır. 80 litre suyu 15 °C'den 60 °C'ye çıkarmak yaklaşık 4,2 kWh enerji ister ve 2.000 W'lık rezistansla 2 saatten biraz fazla sürer. Bu sayfada hacim seçimini, ısınma süresini, aylık maliyet hesabını ve sıcaklık ayarının güvenlik yönünü adım adım anlatıyoruz.",
  kisaCevap: [
    "Yaygın seçim: 1–2 kişi 50 L, 3–4 kişi 65–80 L, 5 kişi ve üzeri 100–120 L.",
    "Isıtma enerjisi Q = m × c × ΔT'dir; 1 litre suyu 1 °C ısıtmak yaklaşık 4,186 kJ, yani 0,00116 kWh ister.",
    "80 L suyu 15 °C'den 60 °C'ye ısıtmak 4,19 kWh eder; 2 kW rezistansla yaklaşık 2,2 saat sürer.",
    "8 dakikalık, dakikada 8 litre akan 40 °C'lik bir duş, 60 °C'lik depodan yaklaşık 36 litre sıcak su çeker.",
    "Aylık maliyet = (ısıtma enerjisi ÷ verim + bekleme kaybı) × gün sayısı × kWh birim fiyatı.",
    "Depo sıcaklığını 60 °C civarında tutmak bakteri üremesine karşı önerilir; musluktan çıkan suda yanma riski için karışım ayarına dikkat edilir."
  ],
  figure: {
    alt: "Kişi sayısına göre önerilen termosifon hacmi ile 50, 80 ve 100 litrelik depoların 2 kW rezistansla 15 dereceden 60 dereceye ısınma sürelerini gösteren çubuk grafik.",
    caption: "Üst: hane büyüklüğüne göre yaygın hacim seçimi. Alt: aynı 2.000 W rezistansla depo büyüdükçe ısınma süresi doğrusal uzar (15→60 °C, %95 verim varsayımıyla).",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Termosifon hacmi ve ısınma süresi</text>
  <rect x="30" y="50" width="200" height="90" rx="10" class="sf sb"/>
  <text x="130" y="80" class="b mid">1–2 kişi</text>
  <text x="130" y="116" class="xl mid p">50 L</text>
  <rect x="260" y="50" width="200" height="90" rx="10" class="ps"/>
  <text x="360" y="80" class="b mid">3–4 kişi</text>
  <text x="360" y="116" class="xl mid p">65–80 L</text>
  <rect x="490" y="50" width="200" height="90" rx="10" class="sf sb"/>
  <text x="590" y="80" class="b mid">5 kişi ve üzeri</text>
  <text x="590" y="116" class="xl mid p">100–120 L</text>
  <text x="30" y="182" class="b">2.000 W rezistansla 15 °C → 60 °C</text>
  <line x1="150" y1="200" x2="150" y2="350" class="st" fill="none"/>
  <text x="140" y="232" class="end b">50 L</text>
  <rect x="150" y="214" width="207" height="26" rx="4" class="oks"/>
  <text x="367" y="232" class="sm">2,62 kWh · 1,4 saat</text>
  <text x="140" y="282" class="end b">80 L</text>
  <rect x="150" y="264" width="330" height="26" rx="4" class="p"/>
  <text x="490" y="282" class="sm">4,19 kWh · 2,2 saat</text>
  <text x="140" y="332" class="end b">100 L</text>
  <rect x="150" y="314" width="412" height="26" rx="4" class="ps"/>
  <text x="572" y="332" class="sm">5,23 kWh · 2,75 saat</text>
  <text x="30" y="384" class="sm t2">Q = m × c × ΔT · 80 × 4,186 × 45 = 15.070 kJ = 4,19 kWh</text>
</svg>`
  },
  sections: [
    {
      h: "Termosifon hacmi neye göre seçilir?",
      p: [
        "Termosifon, depodaki suyu ısıtıp sıcak tutan elektrikli bir ısıtıcıdır. Depo boşaldığında yeni giren soğuk suyun ısınması saatler sürdüğü için doğru hacim, \"evde günde ne kadar sıcak su kullanılıyor\" sorusundan çok \"en yoğun saatte arka arkaya ne kadar sıcak su çekiliyor\" sorusuna göre belirlenir. Sabah aynı saatte üç kişi duş alıyorsa günlük toplam aynı olsa bile daha büyük depo gerekir.",
        "Banyo küveti, mutfakta ayrıca sıcak su kullanımı ve bulaşık için elde yıkama ihtiyacı da hesaba girer. Çamaşır ve bulaşık makineleri genellikle soğuk su alıp kendi ısıtıcılarıyla ısıttığı için çoğu evde termosifon yükünü artırmaz."
      ],
      table: {
        head: ["Hane", "Yaygın hacim", "Ne zaman bir üst boy?"],
        rows: [
          ["1 kişi", "30–50 L", "Uzun duş alışkanlığı varsa"],
          ["2 kişi", "50 L", "İki duş arka arkaya alınıyorsa 65 L"],
          ["3–4 kişi", "65–80 L", "Küvet kullanılıyorsa 100 L"],
          ["5–6 kişi", "100–120 L", "Sabah ve akşam yoğun kullanım varsa iki ayrı cihaz düşünülebilir"]
        ],
        caption: "Değerler yaygın uygulamadır; duş başlığının debisi ve duş süresi seçimi belirgin biçimde değiştirir."
      }
    },
    {
      h: "Bir duş kaç litre sıcak su harcar?",
      p: [
        "Duşta kullandığınız su, depodan gelen sıcak su ile şebekeden gelen soğuk suyun karışımıdır. Karışım sıcaklığı genellikle 38–40 °C'dir. Depodan çekilen sıcak su payı, sıcaklık farklarının oranıyla bulunur."
      ],
      formula: "Sıcak su payı = (karışım − soğuk) ÷ (depo − soğuk)\nÖrnek: (40 − 15) ÷ (60 − 15) = 0,556\n8 dk × 8 L/dk = 64 L karışık su → 64 × 0,556 ≈ 36 L sıcak su",
      after: [
        "Bu örnekte 80 litrelik depo, 60 °C'de dolu iken teorik olarak iki duşu rahat karşılar; üçüncü duşun sonuna doğru su ılımaya başlar. Çünkü depoya giren soğuk su, sıcak suyla kısmen karışır ve depo hiçbir zaman tamamen kullanılamaz. Duş başlığının debisini ölçmek için bir kovayı 15 saniye doldurup litreyi dörtle çarpabilirsiniz. Kendi süre ve debinizi [[arac:dus-su-tuketimi-hesapla|Duş Su Tüketimi Hesaplama]] aracına girerek duş başına su ve ısıtma enerjisini görebilirsiniz.",
        "Depo sıcaklığı düşürülürse sıcak su payı büyür: depo 50 °C olsaydı aynı duş için (40 − 15) ÷ (50 − 15) = 0,71, yani yaklaşık 46 litre sıcak su gerekirdi. Bu yüzden düşük sıcaklıkta çalışan küçük bir depo, kalabalık evde çabuk yetersiz kalır."
      ]
    },
    {
      h: "Termosifon suyu kaç saatte ısıtır? Isı enerjisi formülü",
      p: [
        "Isınma süresi fizik açısından basit bir hesaptır: suyu ısıtmak için gereken enerjiyi rezistansın gücüne bölersiniz. Gereken enerji Q = m × c × ΔT formülüyle bulunur. Burada m suyun kütlesi (1 litre su yaklaşık 1 kg), c suyun öz ısısı (4,186 kJ/kg·°C), ΔT ise sıcaklık farkıdır. Isı ile sıcaklık arasındaki farkı merak ediyorsanız [[bilgi:isi-ve-sicaklik-farki|ısı ve sıcaklık farkı]] yazısına bakabilirsiniz."
      ],
      formula: "Q (kJ) = litre × 4,186 × (son sıcaklık − ilk sıcaklık)\nQ (kWh) = Q (kJ) ÷ 3.600\nSüre (saat) = Q (kWh) ÷ (rezistans gücü kW × verim)",
      ol: [
        "80 L suyu 15 °C'den 60 °C'ye çıkaralım: ΔT = 45 °C.",
        "Q = 80 × 4,186 × 45 = 15.070 kJ.",
        "kWh'e çevirin: 15.070 ÷ 3.600 = 4,19 kWh.",
        "2.000 W = 2 kW rezistans ve %95 verimle süre: 4,19 ÷ (2 × 0,95) = 2,2 saat, yani yaklaşık 2 saat 12 dakika."
      ],
      after: [
        "Kışın şebeke suyu 8–10 °C'ye düştüğünde ΔT büyür ve aynı depo daha uzun sürede ısınır; yazın 20 °C'lik suyla süre kısalır. Rezistans gücü 1.500 W olan bir cihazda aynı 80 litre yaklaşık 2,9 saatte ısınır. Farklı değerleri [[arac:isi-enerjisi-hesapla|Isı Enerjisi Hesaplama]] aracıyla, watt ile kilovat dönüşümünü [[arac:kw-watt-cevir|kW Watt çevirici]] ile yapabilirsiniz."
      ]
    },
    {
      h: "Termosifonun aylık elektrik maliyeti nasıl hesaplanır?",
      p: [
        "Aylık tüketim iki parçadan oluşur: kullandığınız sıcak suyu yeniden ısıtmak için harcanan enerji ve deponun kullanılmadan beklerken kaybettiği ısı. İkinci kalem cihazın yalıtımına ve enerji etiketine bağlıdır; iyi yalıtımlı bir depoda günde birkaç yüz Wh, eski ve yalıtımı zayıf depoda daha fazla olabilir. Aşağıdaki örnekte bekleme kaybını günde 1 kWh kabul ediyoruz ve birim fiyatı yalnızca örnek olarak 3,00 TL/kWh alıyoruz; kendi faturanızdaki vergiler dahil birim fiyatı kullanın."
      ],
      table: {
        head: ["Kalem", "Hesap", "Sonuç"],
        rows: [
          ["Bir duşun ısıtma enerjisi", "64 L × 4,186 × (40 − 15) ÷ 3.600", "1,86 kWh"],
          ["4 kişi, günde birer duş", "4 × 1,86 ÷ 0,95 verim", "7,83 kWh/gün"],
          ["Bekleme kaybı (örnek)", "günde 1 kWh", "1,00 kWh/gün"],
          ["Aylık toplam", "(7,83 + 1,00) × 30", "yaklaşık 265 kWh"],
          ["Aylık tutar (örnek fiyat)", "265 × 3,00 TL", "yaklaşık 795 TL"]
        ],
        caption: "Birim fiyat örnektir. Elektrik tarifeniz kademeli ise tüketimin hangi kademeye düştüğü toplam tutarı değiştirir."
      },
      after: [
        "Görüldüğü gibi maliyetin büyük bölümünü depo büyüklüğü değil, harcanan sıcak su belirler. Duş süresini 8 dakikadan 6 dakikaya indirmek, ısıtma enerjisini dörtte bir azaltır. Cihazın watt değeri ve günlük çalışma saatinden giderek hesap yapmak isterseniz [[arac:cihaz-elektrik-maliyeti-hesapla|Cihazın Elektrik Maliyeti Hesaplama]] aracını kullanabilirsiniz. Diğer ev aletlerinin tüketimi için [[bilgi:hangi-ev-aleti-ne-kadar-elektrik-harcar|hangi ev aleti ne kadar elektrik harcar]] ve faturanın bileşenleri için [[bilgi:elektrik-faturasi-nasil-hesaplanir|elektrik faturası nasıl hesaplanır]] yazılarına göz atabilirsiniz."
      ]
    },
    {
      h: "Termosifon kaç derecede kullanılmalı?",
      p: [
        "Depo sıcaklığı hem konforu hem sağlığı ilgilendirir. Ilık suda çoğalabilen ve solunan su zerrecikleriyle hastalığa yol açabilen lejyonella bakterisine karşı Dünya Sağlık Örgütü, sıcak su sistemlerinde depolanan suyun 60 °C ve üzerinde tutulmasını önerir. Bu yüzden termostatı sürekli 40–45 °C'de tutmak, enerji tasarrufu sağlasa da önerilmez.",
        "Öte yandan 60 °C'lik su doğrudan cilde gelirse kısa sürede yanığa yol açabilir; küçük çocuk ve yaşlıların bulunduğu evlerde bu risk daha önemlidir. Çözüm, depoyu yeterince sıcak tutup musluk ya da duşta karışımı ayarlamaktır. Termostatik batarya, çıkış suyunu sabit bir sıcaklıkta tuttuğu için bu dengeyi kolaylaştırır."
      ]
    },
    {
      h: "Termosifon sürekli açık mı kalmalı?",
      p: [
        "Suyu ısıtmak için gereken enerji, cihazı ne zaman çalıştırdığınızdan bağımsızdır; kullandığınız sıcak su ne kadarsa onu ısıtmak için aynı enerji harcanır. Cihazı kapalı tutmanın kazandırdığı tek şey, kapalı kaldığı sürede deponun kaybettiği ısıdır. Gün boyu evde kimse yoksa ve depo yalıtımı zayıfsa zaman ayarlı priz ya da cihazın programlama özelliği bekleme kaybını azaltır.",
        "Buna karşılık her seferinde soğuk depoyu sıfırdan ısıtmak, kullanmadan önce 2 saatlik beklemeyi gerektirir ve yoğun ailelerde pratik değildir. Uzun süre evden uzak kalacaksanız (birkaç gün ve üzeri) cihazı kapatmak mantıklıdır; döndüğünüzde ilk ısıtmayı 60 °C'ye kadar tamamlamak, depoda bekleyen suyun hijyeni açısından da faydalıdır."
      ]
    },
    {
      h: "Termosifon, şofben ve kombi: hangisi daha ekonomik?",
      p: [
        "Karşılaştırmanın formülü aynıdır: sıcak su için gereken enerjiyi cihazın verimine bölüp o enerjinin birim fiyatıyla çarparsınız. Elektrikli termosifonun verimi yüksektir ama elektriğin kWh fiyatı genellikle doğalgazın kWh karşılığından pahalıdır. Kombi ve gazlı şofben ise suyu anlık ısıttığı için bekleme kaybı neredeyse yoktur."
      ],
      formula: "Maliyet = gereken ısı (kWh) ÷ verim × enerji birim fiyatı (TL/kWh)\nDoğalgazda: m³ fiyatı ÷ m³ başına kWh = TL/kWh karşılığı",
      ul: [
        "<strong>Termosifon:</strong> doğalgaz olmayan evlerde ve tek banyolu dairelerde pratik; ilk yatırım düşük, kullanım maliyeti elektrik fiyatına bağlı.",
        "<strong>Kombi:</strong> zaten ısınma için kombi varsa sıcak suyu aynı cihaz verir; ek cihaz gerekmez. Kapasite seçimi için [[bilgi:dogalgaz-faturasi-ve-kombi-kapasitesi|doğalgaz faturası ve kombi kapasitesi]] yazısına bakın.",
        "<strong>Şofben:</strong> suyu anlık ısıtır, depo kaybı yoktur; baca ve gaz güvenliği kurallarına uygun montaj şarttır.",
        "<strong>Güneş enerjili sistem:</strong> yaz aylarında sıcak suyun büyük kısmını ücretsiz sağlar; kışın yardımcı ısıtıcı gerekir."
      ]
    },
    {
      h: "Kireç ve bakım verimi nasıl etkiler?",
      p: [
        "Sert suyun bulunduğu bölgelerde rezistansın üzerinde ve deponun dibinde kireç birikir. Kireç ısı iletimini zayıflatır; rezistans daha uzun çalışır, ısınma süresi uzar ve rezistansın ömrü kısalır. Depo içindeki koruyucu anot (genellikle magnezyum) zamanla tükenir ve değiştirilmezse depo paslanabilir.",
        "Bakım aralığını cihazın kullanım kılavuzu belirler; sert su bölgelerinde bu süre kısalır. Su sıcaklığına ulaşma süresi eskisine göre belirgin biçimde uzadıysa ya da cihazdan çıtırtı sesleri geliyorsa kireç kontrolü zamanı gelmiş olabilir. Bakım, elektrik ve basınçlı su içerdiği için yetkili servise bırakılmalıdır."
      ]
    },
    {
      h: "Seçim ve kullanımda sık yapılan hatalar",
      ul: [
        "<strong>Günlük toplama bakıp yoğun saati unutmak:</strong> Arka arkaya alınan duşlar depo hacmini belirler.",
        "<strong>Termostatı çok düşük tutmak:</strong> Enerji tasarrufu küçük, hijyen riski gerçektir; 60 °C civarı önerilir.",
        "<strong>Emniyet ventilini iptal etmek:</strong> Isınan su genleşir; ventil damlatması normaldir, tıkanması tehlikelidir.",
        "<strong>Topraklama ve kaçak akım korumasını ihmal etmek:</strong> Su ve elektriğin bir arada olduğu cihazda bu iki koruma hayati önemdedir.",
        "<strong>Bekleme kaybını hiç hesaba katmamak:</strong> Eski ve yalıtımsız depolarda kullanılmayan saatlerde de elektrik harcanır."
      ]
    }
  ],
  faq: [
    ["Kişi sayısına göre kaç litre termosifon gerekir?", "Yaygın seçim 1–2 kişide 50 litre, 3–4 kişide 65–80 litre, 5 kişi ve üzerinde 100–120 litredir. Aynı saatte arka arkaya çok duş alınıyorsa ya da küvet kullanılıyorsa bir üst boyu seçmek gerekir."],
    ["Bir duş kaç litre sıcak su harcar?", "Dakikada 8 litre akan duşta 8 dakikalık banyo 64 litre karışık su demektir. 40 °C karışım ve 60 °C depo sıcaklığında bunun yaklaşık 36 litresi depodan gelen sıcak sudur."],
    ["Termosifon suyu kaç saatte ısıtır?", "Süre, gereken enerjinin rezistans gücüne bölünmesiyle bulunur. 80 litre suyu 15 °C'den 60 °C'ye çıkarmak 4,19 kWh ister; 2.000 W rezistansla bu yaklaşık 2,2 saat, 1.500 W ile yaklaşık 2,9 saat sürer."],
    ["Termosifon kaç derecede kullanılmalı?", "Depolanan sıcak suyun bakteri üremesine karşı 60 °C ve üzerinde tutulması önerilir. Yanma riskini azaltmak için depo sıcak tutulur, musluk ya da termostatik batarya ile kullanım sıcaklığı ayarlanır."],
    ["Termosifonun aylık elektrik maliyeti nasıl hesaplanır?", "Günlük kullanılan sıcak suyun ısıtma enerjisini verime bölün, bekleme kaybını ekleyin, gün sayısıyla ve kWh birim fiyatıyla çarpın. Dört kişinin günde birer duş aldığı evde bu yaklaşık 265 kWh eder."],
    ["Termosifon sürekli açık mı kalmalı?", "Suyu ısıtma enerjisi zamanlamadan bağımsızdır; kapatmak yalnızca bekleme kaybını önler. Gün boyu boş kalan evlerde zaman ayarı faydalıdır, ama her kullanımda soğuk depoyu yeniden ısıtmak saatler alır."],
    ["Şofben ve kombi ile karşılaştırıldığında hangisi ekonomik?", "Gereken ısıyı verime bölüp enerjinin kWh fiyatıyla çarparak karşılaştırılır. Doğalgazın kWh karşılığı genellikle elektrikten ucuz olduğu için evde kombi varsa sıcak su çoğunlukla daha düşük maliyetle elde edilir."],
    ["Kireç termosifon verimini düşürür mü?", "Evet. Rezistans üzerindeki kireç ısı geçişini zayıflatır, ısınma süresini uzatır ve rezistans ömrünü kısaltır. Sert su bölgelerinde kılavuzdaki bakım aralığına uymak ve anodu kontrol ettirmek gerekir."],
    ["Isı enerjisi formülüyle ısınma süresi nasıl bulunur?", "Q = litre × 4,186 × sıcaklık farkı formülüyle kilojoule bulunur, 3.600'e bölünerek kWh'e çevrilir. Sonuç, rezistansın kilovat cinsinden gücü ile verimin çarpımına bölünerek saat olarak süre elde edilir."]
  ],
  tools: ["isi-enerjisi-hesapla", "cihaz-elektrik-maliyeti-hesapla", "dus-su-tuketimi-hesapla", "kw-watt-cevir"],
  related: ["hangi-ev-aleti-ne-kadar-elektrik-harcar", "elektrik-faturasi-nasil-hesaplanir", "isi-ve-sicaklik-farki"],
  uyari: "elektrik ve basınçlı su içeren cihazların montaj ve bakımı yetkili servis tarafından yapılmalıdır",
  sources: [
    ["WHO – Legionella and the prevention of legionellosis", "https://www.who.int/publications/i/item/9241562978"]
  ]
};
