export default {
  slug: "ses-hizi-kac-km-saat",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Ses Hızı Kaç Km/Saat? Mach Nedir, Şimşek Ne Kadar Uzakta Hesaplama",
  pageTitle: "Ses Hızı Kaç Km/Saat? Mach 1, Şimşek Mesafesi ve Doppler",
  description: "Ses, 20 °C havada saniyede yaklaşık 343 m, saatte 1.235 km yol alır. Sıcaklığın etkisi, Mach 1, şimşek mesafesi için 3 saniye kuralı, sudaki ses hızı ve Doppler etkisi.",
  keywords: ["ses hızı kaç km", "ses hızı kaç m/s", "mach 1 kaç km", "şimşek uzaklığı hesaplama", "doppler etkisi", "ses hızı sıcaklık", "ses duvarı nedir", "suda ses hızı"],
  lead: "Ses, <strong>20 °C sıcaklıktaki havada saniyede yaklaşık 343 metre</strong>, yani <strong>saatte yaklaşık 1.235 kilometre</strong> hızla yayılır. Bu hız sabit değildir; hava ısındıkça artar, soğudukça azalır: 0 °C'de yaklaşık 331 m/s, 30 °C'de yaklaşık 349 m/s'dir. Uçakların hızını anlatan Mach 1, bulunulan ortamdaki ses hızına eşittir ve deniz seviyesinde 15 °C'de yaklaşık 1.225 km/s eder. Aşağıda sıcaklık formülünü, şimşeğin ne kadar uzakta olduğunu bulmayı, sesin suda neden daha hızlı gittiğini ve Doppler etkisini örneklerle anlatıyoruz.",
  kisaCevap: [
    "20 °C havada ses hızı ≈ 343 m/s ≈ 1.235 km/s; 0 °C'de ≈ 331 m/s ≈ 1.193 km/s.",
    "Yaklaşık formül: v ≈ 331,3 + 0,606 × T (T: °C); her 1 °C artış hızı yaklaşık 0,6 m/s artırır.",
    "Mach sayısı = cismin hızı ÷ o ortamdaki ses hızı; deniz seviyesinde 15 °C'de Mach 1 ≈ 1.225 km/s.",
    "Şimşek mesafesi: şimşek ile gök gürültüsü arasındaki saniye ÷ 3 ≈ kilometre (her 3 saniye yaklaşık 1 km).",
    "Ses suda yaklaşık 1.480 m/s, çelikte yaklaşık 5.900 m/s hızla yayılır; boşlukta hiç yayılmaz.",
    "Doppler etkisi: yaklaşan kaynağın sesi daha tiz, uzaklaşanın sesi daha pes duyulur."
  ],
  figure: {
    alt: "Ses hızının farklı ortamlarda karşılaştırması: havada 343, suda yaklaşık 1480, ahşapta yaklaşık 3500, çelikte yaklaşık 5900 metre bölü saniye çubukları; altında şimşek görüldükten 6 saniye sonra gök gürültüsü duyulursa uzaklığın yaklaşık 2 kilometre olduğunu gösteren şema.",
    caption: "Ses, tanecikleri birbirine sıkı bağlı ortamlarda daha hızlı yayılır: suda havadakinin yaklaşık 4,3 katı, çelikte yaklaşık 17 katı. Alt kısımda ışığın neredeyse anında, sesin ise saniyede yaklaşık 343 m ilerlemesinden yararlanan şimşek mesafesi hesabı görülüyor.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Sesin farklı ortamlardaki hızı (m/s)</text>
  <g>
    <text x="20" y="72" class="b">Hava (20 °C)</text>
    <rect x="160" y="56" width="27" height="26" rx="4" class="ps"/><text x="196" y="74" class="b">343</text>
    <text x="20" y="114" class="b">Su</text>
    <rect x="160" y="98" width="118" height="26" rx="4" class="oks"/><text x="286" y="116" class="b">≈ 1.480</text>
    <text x="20" y="156" class="b">Ahşap</text>
    <rect x="160" y="140" width="280" height="26" rx="4" class="sf sb"/><text x="448" y="158" class="b">≈ 3.300–4.000</text>
    <text x="20" y="198" class="b">Çelik</text>
    <rect x="160" y="182" width="472" height="26" rx="4" class="p"/><text x="642" y="200" class="b">≈ 5.900</text>
  </g>
  <line x1="20" y1="230" x2="700" y2="230" class="sb dash" fill="none"/>
  <text x="360" y="258" class="b mid">Şimşek ne kadar uzakta?</text>
  <polygon points="70,280 52,320 66,320 50,356 92,308 76,308 90,280" class="a"/>
  <line x1="110" y1="320" x2="600" y2="320" class="st" fill="none"/>
  <g class="sm mid">
    <circle cx="110" cy="320" r="5" class="p"/><text x="110" y="344">0 s</text>
    <circle cx="273" cy="320" r="5" class="p"/><text x="273" y="344">3 s · ≈ 1 km</text>
    <circle cx="437" cy="320" r="5" class="p"/><text x="437" y="344">6 s · ≈ 2 km</text>
    <circle cx="600" cy="320" r="7" class="ok"/><text x="600" y="344">9 s · ≈ 3 km</text>
  </g>
  <text x="640" y="316" class="sm b">siz</text>
  <rect x="110" y="364" width="490" height="44" rx="8" class="sf sb"/>
  <text x="355" y="384" class="sm mid b">Mesafe (km) ≈ saniye ÷ 3</text>
  <text x="355" y="401" class="sm mid">Örnek: 6 s × 343 m/s ≈ 2.058 m</text>
</svg>`
  },
  sections: [
    {
      h: "Ses hızı nedir, neye bağlıdır?",
      p: [
        "Ses, havanın ya da başka bir ortamın taneciklerinin titreşerek bu titreşimi komşu taneciklere aktarmasıyla yayılan bir basınç dalgasıdır. Ses dalgasının birim zamanda aldığı yola <strong>ses hızı</strong> denir. Ses bir ortam olmadan yayılamaz; bu yüzden uzay boşluğunda ses yoktur.",
        "Ses hızı, sesin kaynağına, yüksekliğine ya da şiddetine bağlı değildir: bir fısıltı da bir patlama da aynı havada aynı hızla ilerler. Belirleyici olan ortamın özellikleridir. Gazlarda en önemli etken <strong>sıcaklık</strong>tır; sıvı ve katılarda ise ortamın sıkışmaya karşı direnci (esneklik) ve yoğunluğu belirleyicidir. Hava için nemin etkisi küçüktür ve gündelik basınç değişimlerinin etkisi ihmal edilebilir."
      ]
    },
    {
      h: "Ses hızı kaç m/s ve kaç km/saat eder?",
      p: [
        "Havada ses hızı için en sık kullanılan değer 20 °C'deki <strong>343 m/s</strong>'dir. m/s değerini km/s'ye çevirmek için 3,6 ile çarparsınız: 343 × 3,6 ≈ 1.235 km/s. Havacılıkta standart atmosfer kabulünde deniz seviyesi sıcaklığı 15 °C alındığı için bu koşuldaki ses hızı yaklaşık 340 m/s ya da 1.225 km/s olarak verilir. Ders kitaplarında da sık sık yuvarlak değer olarak 340 m/s kullanılır."
      ],
      table: {
        head: ["Hava sıcaklığı", "Ses hızı (m/s)", "Ses hızı (km/s)", "1 km'yi geçme süresi"],
        rows: [
          ["−20 °C", "≈ 319", "≈ 1.148", "3,14 s"],
          ["−10 °C", "≈ 325", "≈ 1.171", "3,08 s"],
          ["0 °C", "≈ 331", "≈ 1.193", "3,02 s"],
          ["10 °C", "≈ 337", "≈ 1.214", "2,96 s"],
          ["15 °C", "≈ 340", "≈ 1.225", "2,94 s"],
          ["20 °C", "≈ 343", "≈ 1.236", "2,91 s"],
          ["30 °C", "≈ 349", "≈ 1.256", "2,87 s"],
          ["40 °C", "≈ 355", "≈ 1.277", "2,82 s"]
        ],
        caption: "Kuru hava için ideal gaz yaklaşımıyla hesaplanmıştır."
      }
    },
    {
      h: "Ses hızı sıcaklıkla nasıl değişir?",
      p: [
        "Havadaki ses hızı, gaz moleküllerinin ortalama hızıyla ilişkilidir. Sıcaklık arttıkça moleküller daha hızlı hareket eder ve titreşimi komşularına daha çabuk aktarır. Ses hızı mutlak sıcaklığın (Kelvin) kareköküyle orantılıdır. Gündelik sıcaklık aralığında bu ilişki doğrusal bir formülle çok iyi yaklaşık olarak hesaplanabilir."
      ],
      formula: "Kesin formül (kuru hava): v = 331,3 × √(1 + T ÷ 273,15)\nYaklaşık formül: v ≈ 331,3 + 0,606 × T\nT: hava sıcaklığı (°C), v: m/s",
      ol: [
        "Örnek: Hava sıcaklığı 25 °C. Yaklaşık formülle v ≈ 331,3 + 0,606 × 25 = 331,3 + 15,15 ≈ 346,5 m/s.",
        "km/s'ye çevirin: 346,5 × 3,6 ≈ 1.247 km/s.",
        "Kesin formülle kontrol: 331,3 × √(1 + 25 ÷ 273,15) ≈ 346,1 m/s. İki sonuç arasındaki fark yarım metreden azdır."
      ],
      after: [
        "Kendi sıcaklığınızla ses hızını, belirli bir sürede sesin aldığı yolu ve bir frekansın dalga boyunu [[arac:ses-hizi-hesapla|ses hızı hesaplama]] aracıyla bulabilirsiniz. Fahrenheit derecesiyle verilen değerleri önce Celsius'a çevirmeniz gerekir; bunun için [[bilgi:celsius-fahrenheit-cevirme|Celsius Fahrenheit çevirme]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Mach 1 nedir? Ses duvarını aşmak ne demek?",
      p: [
        "<strong>Mach sayısı</strong>, bir cismin hızının içinde bulunduğu ortamdaki ses hızına oranıdır. Mach 1 ses hızına, Mach 2 ses hızının iki katına eşittir. Mach 1'in altındaki hızlara ses altı (subsonik), üstündekilere ses üstü (süpersonik) denir. Mach 5 ve üzeri hipersonik olarak adlandırılır.",
        "Mach sayısı mutlak bir hız değil, oran olduğu için Mach 1'in km/s karşılığı sıcaklığa yani yüksekliğe göre değişir. Deniz seviyesinde 15 °C'de Mach 1 ≈ 1.225 km/s iken yolcu uçaklarının seyir yaptığı 11 km yükseklikte hava yaklaşık −56,5 °C'dir ve Mach 1 yaklaşık 1.062 km/s'ye düşer. Bu yüzden aynı Mach değeriyle uçan bir uçağın yere göre hızı yükseklikle değişir.",
        "Bir uçak ses hızına yaklaştıkça önünde ürettiği basınç dalgaları birikir ve güçlü bir basınç cephesi oluşur. Uçak ses hızını aştığında bu dalgalar koni biçiminde arkaya doğru yayılır; koni yere ulaştığında insanlar bunu ani ve güçlü bir patlama sesi olarak duyar. Buna <strong>ses patlaması</strong> denir; halk arasında \"ses duvarını aşmak\" diye anılan olay budur. Mach ile km/s arasında sıcaklığa göre çeviri için [[arac:mach-kmh-cevir|Mach km/s çevirici]] kullanılabilir."
      ]
    },
    {
      h: "Şimşek ne kadar uzakta? Gök gürültüsü ile mesafe hesabı",
      p: [
        "Bir yıldırım düştüğünde ışık ve ses aynı anda oluşur. Işık saniyede yaklaşık 300.000 km gittiği için şimşeği neredeyse anında görürüz; ses ise saniyede yaklaşık 343 metre ilerler. Şimşeği gördüğünüz andan gök gürültüsünü duyduğunuz ana kadar geçen süreyi sayarak yıldırımın ne kadar uzakta olduğunu kestirebilirsiniz."
      ],
      formula: "Mesafe (m) = geçen süre (s) × ses hızı (m/s)\nPratik kural: mesafe (km) ≈ saniye ÷ 3",
      ol: [
        "Şimşeği gördüğünüz anda saymaya başlayın: \"bin bir, bin iki…\" ya da saniye göstergesiyle.",
        "Gök gürültüsünü ilk duyduğunuz anda durun. Örneğin 6 saniye saydınız.",
        "Ses hızıyla çarpın: 6 × 343 ≈ 2.058 m, yani yaklaşık 2 km.",
        "Pratik kuralla kontrol edin: 6 ÷ 3 = 2 km.",
        "Süre kısalıyorsa fırtına size yaklaşıyor, uzuyorsa uzaklaşıyor demektir."
      ],
      after: [
        "Süreyi girerek sıcaklığa göre düzeltilmiş mesafeyi [[arac:simsek-mesafesi-hesapla|şimşek mesafesi hesaplama]] aracıyla bulabilirsiniz. Işığın ses hızından ne kadar büyük olduğunu ve ışık yılının nasıl hesaplandığını merak ediyorsanız [[bilgi:isik-yili-nedir-kac-km|ışık yılı nedir]] yazısına bakabilirsiniz."
      ],
      note: "Güvenlik: Gök gürültüsü duyulabiliyorsa yıldırım düşme mesafesindesiniz demektir. Şimşek ile gök gürültüsü arasındaki süre 30 saniyenin altındaysa (yaklaşık 10 km) açık alandan ayrılıp sağlam bir binaya ya da kapalı bir araca sığının; son gök gürültüsünden sonra dışarı çıkmak için en az 30 dakika bekleyin. Güncel hava durumu ve uyarılar için Meteoroloji Genel Müdürlüğü'nü takip edin."
    },
    {
      h: "Ses suda ve katılarda neden daha hızlı yayılır?",
      p: [
        "Sesin bir ortamdaki hızını, ortamın sıkıştırılmaya karşı ne kadar direnç gösterdiği ile yoğunluğu arasındaki denge belirler. Sıvı ve katılarda tanecikler birbirine çok sıkı bağlıdır; biri titreşince komşusu hemen etkilenir. Bu yüzden yoğunlukları havadan çok büyük olsa da sertlikleri (esneklik modülleri) çok daha büyük olduğu için ses bu ortamlarda daha hızlı ilerler."
      ],
      table: {
        head: ["Ortam", "Yaklaşık ses hızı", "Havaya göre"],
        rows: [
          ["Hava (20 °C)", "343 m/s", "1 kat"],
          ["Tatlı su (20 °C)", "≈ 1.480 m/s", "≈ 4,3 kat"],
          ["Deniz suyu", "≈ 1.500–1.530 m/s", "≈ 4,4 kat"],
          ["Ahşap (lif boyunca)", "≈ 3.300–4.000 m/s", "≈ 10–12 kat"],
          ["Cam", "≈ 4.500–5.600 m/s", "≈ 13–16 kat"],
          ["Çelik", "≈ 5.900 m/s", "≈ 17 kat"]
        ],
        caption: "Katılardaki değerler malzemenin türüne ve dalga türüne göre değişir; tablo yaklaşık değerler verir."
      },
      after: [
        "Bu fark günlük hayatta da hissedilir: demiryolu rayına kulak dayayan biri, yaklaşan treni havadan gelen sesi duymadan önce raydan duyabilir. Denizcilikte su derinliği ve su altındaki nesnelerin uzaklığı, ses dalgasının gidip dönme süresi ölçülerek bulunur; mesafe süre × ses hızı ÷ 2 ile hesaplanır."
      ]
    },
    {
      h: "Doppler etkisi nedir?",
      p: [
        "Yaklaşan bir ambulansın sireni daha tiz, uzaklaşırken ise daha pes duyulur. Buna <strong>Doppler etkisi</strong> denir. Kaynak size yaklaşırken ardışık dalga tepeleri birbirine daha yakın gelir, yani dalga boyu kısalır ve duyduğunuz frekans artar. Kaynak uzaklaşırken dalga tepeleri seyrekleşir ve frekans düşer. Sirenin kendisi değişmez; değişen sizin duyduğunuz frekanstır."
      ],
      formula: "Duran gözlemci, hareketli kaynak:\nYaklaşırken f' = f × v ÷ (v − vₖ) · Uzaklaşırken f' = f × v ÷ (v + vₖ)\nv: ses hızı, vₖ: kaynağın hızı",
      ol: [
        "Örnek: 700 Hz frekanslı bir siren 72 km/s (20 m/s) hızla size yaklaşıyor; ses hızı 343 m/s.",
        "Yaklaşırken: f' = 700 × 343 ÷ (343 − 20) ≈ 743 Hz.",
        "Uzaklaşırken: f' = 700 × 343 ÷ (343 + 20) ≈ 661 Hz.",
        "Araç yanınızdan geçtiği anda duyduğunuz ses yaklaşık 82 Hz düşer; kulağınız bunu belirgin bir ton değişimi olarak algılar."
      ],
      after: [
        "Doppler etkisi yalnızca seste değil ışıkta da görülür; hız radarları, hava durumu radarları, tıpta kan akışını ölçen cihazlar ve gökbilimde yıldızların hareketinin ölçülmesi bu ilkeye dayanır. Kaynak ve gözlemcinin hareketine göre frekansı [[arac:doppler-etkisi-hesapla|Doppler etkisi hesaplama]] aracıyla bulabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Ses hızını sabit sanmak:</strong> 343 m/s yalnızca 20 °C hava içindir; kışın 0 °C'de yaklaşık 331 m/s'dir.",
        "<strong>Yankı hesabında 2'ye bölmeyi unutmak:</strong> Yankı sesi engele gidip geri döner. 1,5 saniyede dönen yankı için engel 343 × 1,5 ÷ 2 ≈ 257 m uzaktadır.",
        "<strong>Mach 1'i her yükseklikte aynı km/s sanmak:</strong> Mach oran olduğu için yüksekte ve soğukta daha düşük bir km/s değerine karşılık gelir.",
        "<strong>Yüksek sesin daha hızlı gittiğini sanmak:</strong> Ses şiddeti hızı değiştirmez; yalnızca daha uzaktan duyulmasını sağlar.",
        "<strong>Gök gürültüsü uzaksa güvende olduğunu düşünmek:</strong> Yıldırım fırtınanın merkezinden kilometrelerce uzağa düşebilir."
      ]
    }
  ],
  faq: [
    ["Ses hızı saniyede kaç metredir?", "Ses, 20 °C sıcaklıktaki havada saniyede yaklaşık 343 metre yol alır. Hız sıcaklıkla değişir: 0 °C'de yaklaşık 331, 30 °C'de yaklaşık 349 m/s'dir. Ders kitaplarında yuvarlak değer olarak sıklıkla 340 m/s kullanılır."],
    ["Ses hızı kaç km/saat eder?", "20 °C havada ses hızı yaklaşık 343 m/s'dir; 3,6 ile çarpıldığında yaklaşık 1.235 km/s eder. Havacılıkta kullanılan standart deniz seviyesi koşulunda (15 °C) ses hızı yaklaşık 1.225 km/s olarak kabul edilir."],
    ["Mach 1 nedir?", "Mach 1, bir cismin hızının bulunduğu ortamdaki ses hızına eşit olmasıdır. Mach sayısı hızın ses hızına oranıdır; deniz seviyesinde 15 °C'de Mach 1 yaklaşık 1.225 km/s, 11 km yükseklikte −56,5 °C'de ise yaklaşık 1.062 km/s eder."],
    ["Şimşek ile gök gürültüsü arasındaki süreden mesafe nasıl bulunur?", "Şimşeği gördüğünüz andan gök gürültüsünü duyana kadar geçen saniyeyi sayıp 3'e bölerek kilometre cinsinden yaklaşık uzaklığı bulursunuz. Daha hassas hesap için süreyi ses hızıyla, yani yaklaşık 343 ile çarparak metre cinsinden mesafe elde edilir."],
    ["Ses hızı sıcaklıkla nasıl değişir?", "Havada ses hızı sıcaklık arttıkça artar; gündelik sıcaklıklarda her 1 °C artış hızı yaklaşık 0,6 m/s yükseltir. Yaklaşık formül v ≈ 331,3 + 0,606 × T şeklindedir; T Celsius cinsinden hava sıcaklığıdır."],
    ["Ses suda neden daha hızlı yayılır?", "Suyun tanecikleri havadakilere göre birbirine çok daha sıkı bağlıdır ve su sıkıştırılmaya karşı çok daha dirençlidir. Bu yüzden titreşim komşu taneciklere daha çabuk aktarılır; ses suda yaklaşık 1.480 m/s ile havadakinin dört katından fazla hızla yayılır."],
    ["Doppler etkisi nedir?", "Doppler etkisi, ses kaynağı ile gözlemci birbirine yaklaşırken duyulan frekansın artması, uzaklaşırken azalmasıdır. Yaklaşan ambulans sireninin tiz, uzaklaşanın pes duyulması bu yüzdendir; hız radarları ve tıbbi akış ölçümleri de bu ilkeye dayanır."],
    ["Ses duvarını aşmak ne demek?", "Bir uçağın ses hızını aşmasıdır. Ses hızına yaklaşan uçağın önünde basınç dalgaları birikir; uçak ses hızını geçtiğinde bu dalgalar koni biçiminde yayılır ve yerde ani, güçlü bir patlama sesi olarak duyulur. Bu sese ses patlaması denir."],
    ["Yankıdan engelin uzaklığı nasıl hesaplanır?", "Sesin engele gidip geri dönme süresi ses hızıyla çarpılır ve sonuç 2'ye bölünür, çünkü ses yolu iki kez almıştır. Örneğin yankı 1 saniyede dönüyorsa engel yaklaşık 343 × 1 ÷ 2 ≈ 172 metre uzaktadır."]
  ],
  tools: ["ses-hizi-hesapla", "simsek-mesafesi-hesapla", "mach-kmh-cevir", "doppler-etkisi-hesapla"],
  related: ["isik-yili-nedir-kac-km", "hiz-yol-zaman-formulu", "celsius-fahrenheit-cevirme", "hissedilen-sicaklik-nedir"],
  sources: [
    ["Meteoroloji Genel Müdürlüğü – Hava durumu ve uyarılar", "https://www.mgm.gov.tr/"],
    ["NASA Glenn Araştırma Merkezi – Ses hızı ve Mach sayısı", "https://www.grc.nasa.gov/"]
  ]
};
