export default {
  slug: "simsek-ne-kadar-uzakta-nasil-hesaplanir",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Şimşek Ne Kadar Uzakta? Gök Gürültüsüne Kadar Geçen Saniyeyle Hesap",
  pageTitle: "Şimşek Ne Kadar Uzakta? Saniyeden Mesafe Hesabı ve 30-30 Kuralı",
  description: "Şimşek ile gök gürültüsü arasındaki saniyeyi 3'e bölün, yaklaşık kilometreyi bulun: ses 20 °C havada 343 m/s gider. Sıcaklık etkisi, fırtına hızı ve güvenlik.",
  keywords: ["şimşek ne kadar uzakta", "şimşek mesafesi hesaplama", "gök gürültüsü kaç saniye", "3 saniye kuralı", "yıldırım mesafesi", "30-30 kuralı", "ışık ve ses hızı farkı", "fırtına yaklaşıyor mu"],
  lead: "Şimşeği gördüğünüz an ile gök gürültüsünü duyduğunuz an arasındaki saniyeyi sayın ve <strong>3'e bölün</strong>: sonuç, şimşeğin yaklaşık kaç kilometre uzakta olduğunu verir. Bunun nedeni sesin 20 °C havada saniyede yaklaşık <strong>343 metre</strong> yol alması, ışığın ise neredeyse anında gelmesidir; 6 saniyelik bir fark yaklaşık 2 km demektir. Bu sayfada formülü, sıcaklığın etkisini, fırtınanın yaklaşıp yaklaşmadığını nasıl anlayacağınızı ve gök gürültüsü duyulduğunda nasıl davranmanız gerektiğini anlatıyoruz.",
  kisaCevap: [
    "Mesafe (m) = ses hızı (m/s) × geçen süre (s); 20 °C havada ses hızı yaklaşık 343 m/s'dir.",
    "Pratik kural: saniye ÷ 3 ≈ kilometre; 3 saniye ≈ 1 km, 9 saniye ≈ 3 km.",
    "Ses hızı sıcaklıkla değişir: yaklaşık c = 331,3 + 0,606 × T (°C); 0 °C'de 331, 30 °C'de 349 m/s.",
    "Işığın 1 km'yi alma süresi yaklaşık 3 mikrosaniyedir; bu yüzden hesapta ihmal edilir.",
    "Ardışık ölçümlerde süre kısalıyorsa fırtına yaklaşıyordur.",
    "Gök gürültüsünü duyabiliyorsanız yıldırım menzilindesiniz; kapalı bir binaya ya da metal tavanlı araca girin ve son gürültüden sonra 30 dakika bekleyin."
  ],
  figure: {
    alt: "Şimşek ile gök gürültüsü arasındaki saniyelere göre mesafe çizelgesi: 3 saniye 1 km, 6 saniye 2,1 km, 15 saniye 5,1 km, 30 saniye 10,3 km; 30 saniyenin altı tehlike bölgesi olarak işaretli.",
    caption: "20 °C havada (343 m/s) saniye ile mesafe ilişkisi. 30 saniyeden kısa süreler fırtınanın yaklaşık 10 km'den yakın olduğunu gösterir; ancak gök gürültüsü duyulan her mesafe yıldırım için risklidir.",
    svg: `<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Saniyeden mesafeye (20 °C, 343 m/s)</text>
  <rect x="40" y="60" width="640" height="40" rx="6" class="sf sb"/>
  <rect x="40" y="60" width="320" height="40" rx="6" class="dgs"/>
  <text x="200" y="86" class="b mid dg">30 sn altı: 10 km'den yakın</text>
  <text x="520" y="86" class="b mid">uzak ama izlenmeli</text>
  <line x1="40" y1="160" x2="680" y2="160" class="st sw" fill="none"/>
  <g class="mid">
    <circle cx="72" cy="160" r="8" class="dg"/><text x="72" y="140" class="sm b">3 sn</text><text x="72" y="190" class="b">1,03 km</text>
    <circle cx="104" cy="160" r="8" class="dg"/><text x="110" y="216" class="sm">6 sn → 2,06</text>
    <circle cx="200" cy="160" r="8" class="dg"/><text x="200" y="140" class="sm b">15 sn</text><text x="200" y="190" class="b">5,15 km</text>
    <circle cx="360" cy="160" r="8" class="a"/><text x="360" y="140" class="sm b">30 sn</text><text x="360" y="190" class="b">10,3 km</text>
    <circle cx="680" cy="160" r="8" class="sf sb"/><text x="660" y="140" class="sm b">60 sn</text><text x="650" y="190" class="b">20,6 km</text>
  </g>
  <rect x="20" y="240" width="330" height="124" rx="10" class="sf sb"/>
  <text x="40" y="266" class="b">Sıcaklık etkisi (6 saniye)</text>
  <text x="40" y="292" class="sm">0 °C: 331 m/s → 1,99 km</text>
  <text x="40" y="314" class="sm">20 °C: 343 m/s → 2,06 km</text>
  <text x="40" y="336" class="sm">30 °C: 349 m/s → 2,10 km</text>
  <rect x="370" y="240" width="330" height="124" rx="10" class="ps"/>
  <text x="390" y="266" class="b">Fırtına yaklaşıyor mu?</text>
  <text x="390" y="292" class="sm">15 sn → 9 sn → 6 sn (10 dakikada)</text>
  <text x="390" y="314" class="sm">5,15 km → 2,06 km: 3,1 km yaklaştı</text>
  <text x="390" y="340" class="b p">≈ 18,5 km/sa hızla geliyor</text>
</svg>`
  },
  sections: [
    {
      h: "Şimşeği neden önce görür, sonra duyarız?",
      p: [
        "Şimşek ve gök gürültüsü aynı olayın iki sonucudur. Yıldırım boşalması kanalındaki havayı saniyenin çok küçük bir bölümünde on binlerce dereceye kadar ısıtır; ısınan hava aniden genleşir ve bu ani genleşme bir ses dalgası, yani gök gürültüsü oluşturur. Işık ve ses aynı anda doğar ama size çok farklı hızlarla ulaşır.",
        "Işık saniyede yaklaşık 300.000 km yol alır; 1 km'yi yaklaşık 3,3 mikrosaniyede, yani saniyenin üç yüz binde birinde geçer. Ses ise havada saniyede yalnızca 343 metre ilerler. Bu yüzden şimşeği gördüğünüz an olayın neredeyse gerçekleştiği andır, gök gürültüsü ise mesafeye göre saniyeler sonra gelir. Aradaki gecikme doğrudan mesafeyi söyler."
      ]
    },
    {
      h: "Şimşek ile gök gürültüsü arasındaki saniyeden mesafe nasıl bulunur?",
      p: [
        "Hesap, temel hız formülünün kendisidir: yol = hız × zaman. Burada hız, sesin havadaki hızıdır; zaman ise şimşeği gördüğünüz an ile gürültünün ilk duyulduğu an arasındaki süredir. Hız-yol-zaman ilişkisinin genel hâli [[bilgi:hiz-yol-zaman-formulu|hız, yol, zaman formülü]] yazısında anlatılıyor."
      ],
      formula: "Mesafe (m) = ses hızı (m/s) × süre (s)\nSes hızı ≈ 331,3 + 0,606 × T (°C)\nÖrnek: 20 °C, 6 sn → (331,3 + 12,1) × 6 = 343,4 × 6 ≈ 2.060 m",
      ol: [
        "Şimşeği gördüğünüz anda saymaya başlayın; telefonunuzun kronometresi en doğru sonucu verir.",
        "Gök gürültüsünün ilk sesini duyduğunuz anda durun. Uzun süren gürlemenin sonunu değil başlangıcını esas alın.",
        "Saniyeyi 343 ile çarpın (metre) ya da pratik olarak 3'e bölün (kilometre).",
        "Hava belirgin biçimde soğuk ya da sıcaksa ses hızını sıcaklığa göre düzeltin."
      ],
      after: [
        "Bu hesabı saniye ve sıcaklığı girerek [[arac:simsek-mesafesi-hesapla|Şimşek Uzaklığı Hesaplama]] aracında yapabilirsiniz; araç aynı sıcaklık formülünü kullanır."
      ]
    },
    {
      h: "3 saniye = 1 km kuralı ne kadar doğru?",
      p: [
        "Kural, ses hızının yaklaşık 333 m/s olduğunu varsayar: 3 saniyede 1.000 metre. Gerçekte 20 °C havada ses 3 saniyede 1.029 metre gider; yani kural mesafeyi yaklaşık %3 eksik tahmin eder. Gündelik kullanım için bu fark önemsizdir, çünkü saniyeyi sayarken yapılan hata (tepki süresi, ilk sesi kaçırma) genellikle bundan büyüktür."
      ],
      table: {
        head: ["Geçen süre", "Pratik kural (÷ 3)", "20 °C'de gerçek değer", "Fark"],
        rows: [
          ["3 sn", "1,0 km", "1,03 km", "30 m"],
          ["6 sn", "2,0 km", "2,06 km", "60 m"],
          ["9 sn", "3,0 km", "3,09 km", "90 m"],
          ["15 sn", "5,0 km", "5,15 km", "150 m"],
          ["30 sn", "10,0 km", "10,29 km", "290 m"]
        ],
        caption: "Gerçek değer 343 m/s ile hesaplanmıştır. Sayım hatası çoğu zaman bu farklardan büyüktür."
      },
      after: [
        "Bazı kaynaklarda geçen \"5 saniye = 1 mil\" kuralı da aynı mantıktır: 343 × 5 = 1.715 m, yaklaşık 1,07 mil eder. Türkiye'de metrik sistem kullanıldığı için 3'e bölme kuralı daha pratiktir."
      ]
    },
    {
      h: "Ses hızı sıcaklığa göre değişir mi?",
      p: [
        "Evet. Ses, hava moleküllerinin birbirine çarpmasıyla yayılır ve moleküller sıcak havada daha hızlı hareket ettiği için ses de hızlanır. Kuru havada ses hızı her 1 °C için yaklaşık 0,6 m/s artar. Nem ve basıncın etkisi bu hesap için ihmal edilebilecek kadar küçüktür. Sıcaklıkla ses hızı ilişkisini [[arac:ses-hizi-hesapla|Ses Hızı Hesaplama]] aracıyla görebilir, konunun ayrıntısını [[bilgi:ses-hizi-kac-km-saat|ses hızı kaç km/saat]] yazısında okuyabilirsiniz."
      ],
      table: {
        head: ["Hava sıcaklığı", "Ses hızı", "6 saniyede mesafe"],
        rows: [
          ["−10 °C", "325,2 m/s", "1,95 km"],
          ["0 °C", "331,3 m/s", "1,99 km"],
          ["20 °C", "343,4 m/s", "2,06 km"],
          ["30 °C", "349,5 m/s", "2,10 km"]
        ]
      },
      after: [
        "Görüldüğü gibi yazla kış arasındaki fark, 6 saniyelik bir ölçümde 100–150 metreyi geçmez. Fırtına sırasında yerdeki ve bulut seviyesindeki sıcaklık da farklıdır; bu yüzden sonuç her zaman yaklaşık bir değerdir ve karar verirken birkaç yüz metrelik hata payını her zaman hesaba katmak gerekir."
      ]
    },
    {
      h: "Fırtına yaklaşıyor mu uzaklaşıyor mu nasıl anlaşılır?",
      p: [
        "Tek bir ölçüm yalnızca o anki mesafeyi söyler. Birkaç dakika arayla yapılan ardışık ölçümler ise fırtınanın hareket yönünü ve hızını gösterir. Süreler kısalıyorsa fırtına yaklaşıyor, uzuyorsa uzaklaşıyordur."
      ],
      ol: [
        "İlk ölçüm: 15 saniye → 15 × 343 = 5.145 m, yaklaşık 5,1 km.",
        "5 dakika sonra: 9 saniye → yaklaşık 3,1 km.",
        "10. dakikada: 6 saniye → yaklaşık 2,1 km.",
        "10 dakikada 5,145 − 2,058 = 3,087 km yaklaşılmış: 3,087 ÷ 10 × 60 ≈ 18,5 km/sa.",
        "Bu hızla fırtınanın merkezi yaklaşık 2,058 ÷ 18,5 × 60 ≈ 7 dakika içinde üzerinizde olabilir."
      ],
      after: [
        "Ortalama hızı bulmak için [[arac:hiz-hesapla|Hız Hesaplama]] aracına alınan yolu ve süreyi girebilirsiniz. Fırtınanın her zaman doğrudan size doğru gelmediğini unutmayın; ölçüm, size en yakın noktadaki şimşeğin mesafesini verir."
      ]
    },
    {
      h: "30-30 kuralı nedir?",
      p: [
        "30-30 kuralı, yıldırım güvenliği için kullanılan iki parçalı basit bir hatırlatmadır. Birinci 30: şimşek ile gök gürültüsü arasındaki süre 30 saniyeden kısaysa (yaklaşık 10 km'den yakın) hemen güvenli bir yere girin. İkinci 30: son gök gürültüsünü duyduktan sonra dışarı çıkmak için en az 30 dakika bekleyin.",
        "Günümüz meteoroloji kuruluşları ilk parçayı daha da sıkılaştırarak \"gök gürültüsü duyuyorsanız içeri girin\" yaklaşımını önerir; çünkü yıldırımın fırtına merkezinden kilometrelerce uzağa düşebildiği bilinmektedir. İkinci parça, yani son gürültüden sonra 30 dakika bekleme, geçerliliğini korur: fırtınanın arka kenarı da yıldırım üretebilir."
      ]
    },
    {
      h: "Yıldırım kaç km uzaktan düşebilir?",
      p: [
        "Yıldırımların çoğu fırtına bulutunun altında düşer, ama bir kısmı bulutun yanından çıkıp yatay olarak ilerleyerek fırtınanın 10 km'den, nadiren 15 km'den daha uzağına iner. Bu tür boşalmalar, gökyüzü üzerinizde açık görünürken bile gerçekleşebilir ve \"mavi gökten gelen yıldırım\" diye anılır.",
        "Gök gürültüsü genellikle 15–20 km'ye kadar duyulabilir; rüzgâr, arazi ve çevre gürültüsü bu mesafeyi değiştirir. Pratik sonuç şudur: gök gürültüsünü duyabiliyorsanız yıldırımın erişebileceği mesafedesiniz demektir. Mesafe hesabı riskin büyüklüğünü anlamaya yardımcı olur, ama \"yeterince uzak\" diye bir güvence vermez."
      ]
    },
    {
      h: "Açık alanda güvenli davranış nedir?",
      ul: [
        "<strong>Kapalı bir binaya girin:</strong> Elektrik ve su tesisatı olan, tamamen kapalı binalar en güvenli yerlerdir. Çardak, otobüs durağı ve çadır koruma sağlamaz.",
        "<strong>Metal tavanlı araca binin:</strong> Camları kapalı, metal kasalı bir otomobil iyi bir sığınaktır; koruyan şey lastikler değil metal gövdedir. Metal parçalara dokunmayın.",
        "<strong>Ağaç altına sığınmayın:</strong> Yalnız duran ağaçlar ve direkler yıldırımı çeker; yanında durmak yan sıçrama riskini artırır.",
        "<strong>Sudan ve yüksek yerlerden uzaklaşın:</strong> Havuz, göl, deniz, tepe ve açık sahalar en riskli yerlerdir.",
        "<strong>Gruplar dağılsın:</strong> Açık alanda mahsur kalan bir grubun aralarında birkaç metre mesafe bırakması, bir yıldırımın birden fazla kişiyi etkilemesini önler.",
        "<strong>İçeride de dikkat:</strong> Fırtına sırasında kablolu cihazlara, musluklara ve pencere kenarlarına yakın durmayın.",
        "<strong>Yıldırım çarpan kişiye yardım edin:</strong> Vücutta elektrik kalmaz, dokunmak güvenlidir; hemen 112'yi arayın, eğitiminiz varsa temel yaşam desteği uygulayın."
      ]
    },
    {
      h: "Işık hızı bu hesapta neden ihmal edilir? Sık yapılan hatalar",
      p: [
        "10 km uzaktaki bir şimşeğin ışığı size 10.000 ÷ 300.000.000 = 0,000033 saniyede, yani 33 mikrosaniyede ulaşır. Aynı mesafeyi ses yaklaşık 29 saniyede alır. İnsan tepki süresi bile ışığın gecikmesinden binlerce kat uzundur; bu yüzden ışığın yol süresini hesaba katmak sonucu ölçülebilir biçimde değiştirmez. Işık hızının ne kadar büyük olduğunu [[bilgi:isik-yili-nedir-kac-km|ışık yılı nedir]] yazısında görebilirsiniz."
      ],
      ul: [
        "<strong>Gürültünün sonunu beklemek:</strong> Uzun gürleme kanalın farklı noktalarından gelen seslerdir; mesafe için ilk sesi esas alın.",
        "<strong>Bulut içi şimşeği hesaba katmak:</strong> Bulutun içinde parlayan şimşekte sesin geldiği nokta yukarıdadır; sonuç eğik mesafedir.",
        "<strong>Tek ölçümle karar vermek:</strong> Fırtınanın yönünü görmek için birkaç ölçüm alın.",
        "<strong>Uzaklığı güvenlik sanmak:</strong> 10 km'nin üzerinde de yıldırım düşebilir; gök gürültüsü duyuluyorsa içeri girin."
      ]
    }
  ],
  faq: [
    ["Şimşeği neden önce görür, sonra duyarız?", "Işık saniyede yaklaşık 300.000 km, ses ise havada saniyede yalnızca 343 metre yol alır. Şimşeğin ışığı neredeyse anında gelirken gök gürültüsü mesafeye bağlı olarak saniyeler sonra duyulur."],
    ["Şimşek ile gök gürültüsü arasındaki saniyeden mesafe nasıl bulunur?", "Geçen saniyeyi ses hızıyla, yani 20 °C havada yaklaşık 343 m/s ile çarparak metre cinsinden mesafe bulunur. Pratik olarak saniyeyi 3'e bölmek yaklaşık kilometreyi verir; 6 saniye yaklaşık 2 km'dir."],
    ["3 saniye = 1 km kuralı ne kadar doğru?", "Kural yaklaşık %3 eksik tahmin eder; 20 °C havada 3 saniyede ses gerçekte 1.029 metre gider. Sayım sırasında yapılan tepki hatası genellikle bu farktan büyük olduğu için kural günlük kullanım için yeterlidir."],
    ["Ses hızı sıcaklığa göre değişir mi?", "Evet, kuru havada ses hızı yaklaşık 331,3 + 0,606 × sıcaklık formülüyle bulunur: 0 °C'de 331, 20 °C'de 343, 30 °C'de yaklaşık 349 m/s'dir. 6 saniyelik ölçümde bu fark 100–150 metreyi geçmez."],
    ["30-30 kuralı nedir?", "Şimşek ile gök gürültüsü arası 30 saniyeden kısaysa hemen sığınağa girilmesini ve son gök gürültüsünden sonra en az 30 dakika beklenmesini öneren güvenlik kuralıdır. Güncel öneri, gürültü duyulur duyulmaz içeri girmektir."],
    ["Fırtına yaklaşıyor mu uzaklaşıyor mu nasıl anlaşılır?", "Birkaç dakika arayla ardışık ölçüm yapılır. Şimşek ile gürültü arasındaki süre kısalıyorsa fırtına yaklaşıyor, uzuyorsa uzaklaşıyordur; mesafe farkını süreye bölerek yaklaşma hızı da hesaplanabilir."],
    ["Yıldırım kaç km uzaktan düşebilir?", "Yıldırımın çoğu fırtınanın altına düşse de bazıları fırtına merkezinden 10 km'den, nadiren 15 km'den uzağa iner. Bu nedenle gök gürültüsünü duyabiliyorsanız yıldırımın erişebileceği mesafede sayılırsınız."],
    ["Açık alanda güvenli davranış nedir?", "Kapalı bir binaya ya da camları kapalı metal tavanlı bir araca girin; ağaç altından, sudan, tepelerden ve açık sahalardan uzaklaşın. Grup hâlindeyseniz aranızda mesafe bırakın ve son gürültüden sonra 30 dakika bekleyin."],
    ["Işık hızı bu hesapta neden ihmal edilir?", "Işık 10 km'yi yaklaşık 33 mikrosaniyede alır; aynı mesafeyi ses yaklaşık 29 saniyede geçer. İnsan tepki süresi ışığın gecikmesinden çok daha uzun olduğu için ışık süresi hesaba katılmaz."]
  ],
  tools: ["simsek-mesafesi-hesapla", "ses-hizi-hesapla", "hiz-hesapla"],
  related: ["ses-hizi-kac-km-saat", "hiz-yol-zaman-formulu", "doppler-etkisi-nedir-nasil-hesaplanir"],
  uyari: "yıldırım hayati tehlike taşır; mesafe hesabı güvence vermez, gök gürültüsü duyduğunuzda kapalı bir yere girin ve resmî meteoroloji uyarılarını izleyin",
  sources: [
    ["Meteoroloji Genel Müdürlüğü", "https://www.mgm.gov.tr/"],
    ["AFAD – Afet ve Acil Durum Yönetimi Başkanlığı", "https://www.afad.gov.tr/"]
  ]
};
