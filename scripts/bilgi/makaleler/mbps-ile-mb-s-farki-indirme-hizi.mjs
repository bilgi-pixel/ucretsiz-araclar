export default {
  slug: "mbps-ile-mb-s-farki-indirme-hizi",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Mbps ile MB/s Farkı Nedir? 100 Mbps İnternet Saniyede Kaç MB İndirir?",
  pageTitle: "Mbps ile MB/s Farkı: İndirme Hızı Neden Düşük Görünür?",
  description: "100 Mbps hat saniyede en fazla 12,5 MB indirir; pratikte 11–12 MB/s normaldir. Tarayıcı ve programların hız gösterimi, MiB/s, Wi-Fi etkisi ve hız testi okuma.",
  keywords: ["mbps mb/s farkı", "100 mbps kaç mb/s", "megabit megabayt farkı", "indirme hızı neden düşük", "mbpsyi mbye çevirme", "1 gb kaç dakikada iner", "hız testi nasıl okunur", "mib/s nedir"],
  lead: "Mbps saniyede megabit, MB/s saniyede megabayttır ve aralarında <strong>8 kat</strong> fark vardır: 100 Mbps'lik bir hat teorik olarak saniyede en fazla <strong>12,5 MB</strong> indirir. Pratikte ağ protokollerinin payı nedeniyle 11–12 MB/s görmek normaldir; bazı programlar hızı MiB/s ile gösterdiği için aynı hız 11,2 gibi daha düşük bir sayıyla da görünebilir. Bu yazı birim tanımlarını tekrar etmek yerine indirme sırasında gördüğünüz sayının neden paket hızınızdan düşük olduğunu, hız testinin nasıl okunacağını ve sorunun nerede aranacağını anlatıyor.",
  kisaCevap: [
    "MB/s = Mbps ÷ 8; 100 Mbps teorik olarak 12,5 MB/s, 50 Mbps 6,25 MB/s, 1.000 Mbps 125 MB/s eder.",
    "TCP/IP başlıkları ve onay paketleri hattın yaklaşık %5–7'sini kullanır; 100 Mbps'te 11,5–12 MB/s gerçekçi üst sınırdır.",
    "Bazı programlar MiB/s gösterir: 12,5 MB/s, 11,9 MiB/s'ye karşılık gelir; ikisi aynı hızdır.",
    "1 GB dosya 50 Mbps ile teorik olarak 2 dakika 40 saniyede, gerçekte yaklaşık 2 dakika 50 saniye ile 3 dakika arasında iner.",
    "İndirme hızı paket hızına ulaşmıyorsa sıra şudur: kablolu test, başka sunucu, başka cihaz, sonra servis sağlayıcı.",
    "Hattaki toplam hız aynı anda çalışan tüm cihazlar arasında paylaşılır."
  ],
  figure: {
    alt: "100 Mbps hattın hız akışını gösteren şema: teorik 12,5 MB/s, protokol payı sonrası yaklaşık 11,75 MB/s, MiB/s gösterimde 11,2, Wi-Fi ve paylaşım sonrası daha düşük değerler.",
    caption: "100 Mbps'lik bir hattın, kablodan ekrandaki sayıya kadar uğradığı aşamalar. Hiçbir aşama arıza değildir; birim farkı ve protokol payı sayıyı küçültür. Wi-Fi ve paylaşım değerleri örnektir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">100 Mbps hat ekranda neden 12,5 görünmez?</text>
  <rect x="20" y="60" width="680" height="54" rx="8" class="p"/>
  <text x="40" y="93" class="b sf">Paket hızı: 100 Mbps</text>
  <text x="680" y="93" class="end sf">÷ 8 = 12,5 MB/s teorik</text>
  <rect x="20" y="126" width="640" height="54" rx="8" class="ps"/>
  <text x="40" y="159" class="b">Protokol payı (yaklaşık %6)</text>
  <text x="640" y="159" class="end b">≈ 11,75 MB/s</text>
  <rect x="20" y="192" width="610" height="54" rx="8" class="ps"/>
  <text x="40" y="225" class="b">Program MiB/s gösteriyorsa</text>
  <text x="610" y="225" class="end b">≈ 11,2 MiB/s</text>
  <rect x="20" y="258" width="430" height="54" rx="8" class="sf sb"/>
  <text x="40" y="291" class="b">Zayıf Wi-Fi (örnek)</text>
  <text x="430" y="291" class="end b">≈ 7–9 MB/s</text>
  <rect x="20" y="324" width="250" height="54" rx="8" class="dgs"/>
  <text x="40" y="357" class="b">Başka cihaz video izlerken</text>
  <text x="300" y="357" class="b">≈ 4–6 MB/s (örnek)</text>
</svg>`
  },
  sections: [
    {
      h: "Mbps ile MB/s arasındaki 8 kat fark nereden gelir?",
      p: [
        "Bilgisayardaki temel bilgi birimi bit, depolama birimi ise bayttır ve 1 bayt 8 bitten oluşur. Hat hızını ölçen servis sağlayıcılar ve hız testleri saniyede aktarılan biti sayar, çünkü kablodan geçen sinyal bit dizisidir. İndirme programları ve tarayıcılar ise dosyanın diske yazılan kısmını bayt olarak sayar. Aynı akışın iki ucunda iki farklı birim kullanıldığı için 8'e bölmek gerekir.",
        "Kısaltmadaki büyük ve küçük harf bu farkı gösterir: küçük b bit (Mb, Mbps), büyük B bayt (MB, MB/s) demektir. Birimlerin tam tablosu ve 1.000 ile 1.024 tartışması [[bilgi:gb-kac-mb-veri-birimleri|1 GB kaç MB]] yazısında, paket seçimi ise [[bilgi:internet-hizi-kac-mbps-olmali|internet hızı kaç Mbps olmalı]] yazısında ayrıntılı anlatılıyor. Burada odak, indirme ekranında gördüğünüz sayının nasıl yorumlanacağıdır."
      ],
      formula: "MB/s = Mbps ÷ 8\nMbps = MB/s × 8\nİndirme süresi (sn) = dosya (MB) × 8 ÷ gerçek hız (Mbps)"
    },
    {
      h: "100 Mbps internet saniyede kaç MB indirir? Gerçekçi değerler",
      p: [
        "Teorik değer basit bölmedir, ama hattın tamamı dosya verisine ayrılmaz. Her veri paketinin başında adres ve kontrol bilgileri taşıyan başlıklar bulunur, alıcı da gönderene sürekli onay paketleri yollar. Bu protokol payı tipik olarak hattın %5–7'sini kullanır. Aşağıdaki tabloda %94 verim varsayılmıştır."
      ],
      table: {
        head: ["Paket hızı", "Teorik MB/s", "Gerçekçi üst sınır (MB/s)", "MiB/s gösterimde", "1 GB indirme"],
        rows: [
          ["16 Mbps", "2,00", "1,88", "1,79", "yaklaşık 9 dk"],
          ["50 Mbps", "6,25", "5,88", "5,60", "yaklaşık 2 dk 50 sn"],
          ["100 Mbps", "12,50", "11,75", "11,21", "yaklaşık 1 dk 25 sn"],
          ["200 Mbps", "25,00", "23,50", "22,41", "yaklaşık 43 sn"],
          ["500 Mbps", "62,50", "58,75", "56,03", "yaklaşık 17 sn"],
          ["1.000 Mbps", "125,00", "117,50", "112,06", "yaklaşık 9 sn"]
        ],
        caption: "Süreler 1 GB = 1.000 MB ve %94 verimle hesaplanmıştır; sunucu hızı ve Wi-Fi sonuçları ayrıca düşürebilir."
      },
      after: [
        "Kendi hattınız için çeviriyi [[arac:mbps-mbs-cevir|Mbps MB/sn Çevirici]] ile, belirli bir dosyanın süresini [[arac:indirme-suresi-hesapla|İndirme Süresi Hesaplama]] ile yapabilirsiniz."
      ]
    },
    {
      h: "1 GB dosya 50 Mbps ile kaç dakikada iner? Adım adım",
      ol: [
        "Dosyayı megabite çevirin: 1 GB = 1.000 MB, 1.000 × 8 = 8.000 megabit.",
        "Teorik süre: 8.000 ÷ 50 = 160 saniye, yani 2 dakika 40 saniye.",
        "Protokol payını ekleyin: 50 × 0,94 = 47 Mbps etkin hız; 8.000 ÷ 47 ≈ 170 saniye, yaklaşık 2 dakika 50 saniye.",
        "Wi-Fi ile indiriyorsanız ve sinyal orta düzeydeyse etkin hız 35–40 Mbps'e inebilir; süre 3,5–4 dakikaya çıkar.",
        "Dosya program tarafından \"1 GiB\" olarak gösteriliyorsa gerçek boyut 1.073,7 MB'tır; süre yaklaşık %7 uzar."
      ],
      after: [
        "Sonuç: Aynı dosya için 2 dakika 40 saniye ile 4 dakika arasındaki her süre normal sayılabilir. Hesaplanan sürenin iki katından uzun süren indirmelerde ise aşağıdaki kontrol sırası işe yarar."
      ]
    },
    {
      h: "Tarayıcı ve programlar hızı neden farklı gösterir?",
      p: [
        "Aynı anda iki farklı program aynı dosyayı indirse bile ekranlarda farklı sayılar görebilirsiniz. Bunun nedeni hızın farklı birimlerde ve farklı ortalama sürelerle gösterilmesidir. Kimi program anlık hızı, kimi son birkaç saniyenin ortalamasını gösterir; anlık değer dalgalı, ortalama değer daha sakin görünür."
      ],
      table: {
        head: ["Gösterim", "Anlamı", "100 Mbps hatta tipik değer"],
        rows: [
          ["Mbps, Mbit/s", "Saniyede megabit", "94 civarı"],
          ["MB/s", "Saniyede megabayt (1.000.000 bayt)", "11,75 civarı"],
          ["MiB/s", "Saniyede mebibayt (1.048.576 bayt)", "11,2 civarı"],
          ["KB/s", "Saniyede kilobayt", "11.750 civarı"]
        ]
      },
      after: [
        "Oyun ve uygulama mağazalarının indirme ekranları bazen \"MB/s\" yazıp MiB/s hesaplar, bazen de indirme sırasında dosyayı açtığı için diske yazma hızını gösterir. Bu yüzden indirme sayacı, hız testinden daha düşük ama tutarlı bir değer veriyorsa çoğu zaman sorun yoktur. Birimler arasında hızlı geçiş için [[arac:bit-bayt-cevir|Bit Bayt Çevirici]] kullanılabilir."
      ]
    },
    {
      h: "İndirme hızı neden paket hızından düşük görünür?",
      ul: [
        "<strong>Sunucu sınırı:</strong> Dosyayı gönderen sunucu, kullanıcı başına hızı sınırlıyor olabilir. Farklı bir kaynaktan hızlı indirebiliyorsanız sorun hattınızda değildir.",
        "<strong>Tek bağlantı:</strong> Uzak sunuculardan tek bağlantıyla yapılan indirmeler, gecikme yüksek olduğunda hattı doldurmayabilir. Hız testleri bu yüzden birden fazla eş zamanlı bağlantı kullanır.",
        "<strong>Wi-Fi:</strong> Kablosuz bağlantıda hız; mesafe, duvar, kanal kalabalığı ve cihazın antenine bağlıdır. Sinyal gücünün yorumu için [[bilgi:dbm-nedir-wifi-sinyal-gucu|dBm ve Wi-Fi sinyal gücü]] yazısına bakabilirsiniz.",
        "<strong>Cihaz ve disk:</strong> Eski bir bilgisayarın ağ kartı (örneğin 100 megabitlik kart) ya da yavaş disk, hızı sınırlayabilir.",
        "<strong>Paylaşım:</strong> Evde başka bir cihaz yüksek çözünürlüklü video izliyor ya da yedekleme yapıyorsa hattın bir kısmı ona gider.",
        "<strong>Saat:</strong> Akşam yoğun saatlerde hem servis sağlayıcının hem içerik sunucularının yükü artar."
      ],
      after: [
        "Sorunun kaynağını bulmak için değişkenleri tek tek eleyin: önce aynı dosyayı kabloyla indirin, sonra başka bir kaynaktan benzer büyüklükte bir dosya deneyin, ardından başka bir cihazla tekrarlayın. Her adımda yalnızca bir şeyi değiştirdiğinizde, yavaşlığın hattan mı, ev ağından mı, cihazdan mı yoksa dosyayı sunan taraftan mı geldiği kısa sürede ortaya çıkar."
      ]
    },
    {
      h: "Wi-Fi ile kablolu bağlantı hızı neden farklıdır?",
      p: [
        "Kablolu bağlantıda veri, dış etkilere kapalı bir hattan ve tam çift yönlü olarak akar; modem ile bilgisayar arasındaki kayıp neredeyse yoktur. Kablosuz bağlantıda ise aynı kanalı paylaşan tüm cihazlar sırayla konuşur, sinyal duvarlardan geçerken zayıflar ve komşu ağlar aynı frekansı kullanıyorsa çakışma olur. Bu yüzden kablosuz bağlantıda paket hızının %50–80'ini görmek sık rastlanan bir durumdur.",
        "Hattınızın gerçek kapasitesini öğrenmek istiyorsanız testi bir kez kabloyla yapın. Kabloda tam hız alıp kablosuzda düşük alıyorsanız sorun servis sağlayıcıda değil, ev içi ağdadır: modemin yerini değiştirmek, 5 GHz bandını kullanmak ya da erişim noktası eklemek çözüm olabilir."
      ]
    },
    {
      h: "Hız testi sonuçları nasıl okunur?",
      p: [
        "Bir hız testi genellikle dört değer verir. Bunları birlikte okumak, sorunun ne olduğunu tek bir sayıdan daha iyi anlatır."
      ],
      table: {
        head: ["Değer", "Ne anlatır?", "Nasıl yorumlanır?"],
        rows: [
          ["İndirme (Mbps)", "İnternetten cihaza akış", "Paket hızının %85–95'i kabloda iyi sonuçtur"],
          ["Yükleme (Mbps)", "Cihazdan internete akış", "Paketinizdeki yükleme hızıyla karşılaştırılır"],
          ["Ping / gecikme (ms)", "Paketin gidip gelme süresi", "Oyun ve görüntülü görüşmede düşük olması önemlidir"],
          ["Jitter (ms)", "Gecikmedeki dalgalanma", "Yüksekse görüntülü görüşmede donma olur"]
        ]
      },
      ol: [
        "Testi modeme kabloyla bağlı bir bilgisayardan, diğer cihazlar boştayken yapın.",
        "Size yakın ve farklı iki sunucuda tekrarlayın; tek sunucu tüm hattı gösteremeyebilir.",
        "Gün içinde farklı saatlerde üç ölçüm alın ve ortalamaya bakın.",
        "Sonuç paket hızının belirgin altında kalıyorsa ekran görüntüleriyle servis sağlayıcınıza başvurun."
      ]
    },
    {
      h: "Yükleme hızı neden indirme hızından düşüktür?",
      p: [
        "Ev internet paketlerinin çoğu asimetriktir: kullanıcılar internetten çok daha fazla veri indirdiği için hat kapasitesinin büyük kısmı indirmeye ayrılır. Bakır altyapıda bu fark belirgindir; fiber paketlerde de yükleme hızı çoğu zaman indirmenin bir kesridir. Bulut yedekleme, büyük dosya gönderme ve canlı yayın gibi işlerde belirleyici olan yükleme hızıdır.",
        "Örnek: 100 Mbps indirme ve 20 Mbps yükleme hızlı bir hatta 2 GB'lık bir video, teorik olarak 2.000 × 8 ÷ 20 = 800 saniyede, yani 13 dakikadan fazla sürede yüklenir. Aynı dosyanın indirilmesi 3 dakikadan kısa sürer."
      ]
    },
    {
      h: "Aynı anda birden fazla cihaz hızı nasıl paylaşır?",
      p: [
        "Hattın toplam hızı sabittir ve o anda veri isteyen cihazlar arasında paylaşılır. Bir televizyon yüksek çözünürlüklü yayın izlerken 15–25 Mbps, bir görüntülü görüşme birkaç Mbps kullanabilir; kalan kısım indirme yapan bilgisayara kalır. Boşta duran telefonlar ise çok az pay alır.",
        "Ofis ya da kalabalık evde ne kadar hıza ihtiyaç olduğunu, kullanıcı sayısı ve eş zamanlı kullanım oranıyla hesaplamak için [[arac:bant-genisligi-hesapla|Bant Genişliği İhtiyacı Hesaplama]] aracını kullanabilirsiniz. Büyük indirmeleri gece ya da kimsenin yoğun kullanmadığı saatlere planlamak da pratik bir çözümdür."
      ]
    }
  ],
  faq: [
    ["Mbps ile MB/s arasındaki fark nedir?", "Mbps saniyede megabit, MB/s saniyede megabayt demektir. 1 bayt 8 bit olduğu için Mbps değeri 8'e bölünerek MB/s bulunur; 80 Mbps saniyede 10 MB'a karşılık gelir."],
    ["100 Mbps internet saniyede kaç MB indirir?", "Teorik olarak 12,5 MB/s indirir. Ağ protokollerinin payı nedeniyle kablolu bağlantıda 11,5–12 MB/s görmek normaldir; program hızı MiB/s ile gösteriyorsa aynı hız yaklaşık 11,2 olarak görünür."],
    ["Neden indirme hızı paket hızından düşük görünür?", "Bit ile bayt farkı, protokol payı, sunucunun kullanıcı başına hız sınırı, Wi-Fi kaybı ve evdeki diğer cihazların hattı paylaşması gösterilen hızı düşürür. Kablolu bağlantı ve farklı sunucuyla test sorunun kaynağını ayırır."],
    ["1 GB dosya 50 Mbps ile kaç dakikada iner?", "1 GB 8.000 megabittir; 50 Mbps ile teorik süre 160 saniye, yani 2 dakika 40 saniyedir. Protokol payıyla yaklaşık 2 dakika 50 saniye, orta güçte Wi-Fi'de 3,5–4 dakika sürebilir."],
    ["Wi-Fi ile kablolu bağlantı hızı neden farklıdır?", "Kablosuz bağlantıda sinyal duvarlarda zayıflar, kanal komşu ağlarla ve evdeki cihazlarla paylaşılır. Bu yüzden Wi-Fi'de paket hızının %50–80'i görülebilir; kabloda ise %85–95 civarı beklenir."],
    ["Yükleme hızı neden indirme hızından düşüktür?", "Ev paketlerinin çoğu asimetrik tasarlanır ve hat kapasitesinin büyük kısmı indirmeye ayrılır. Büyük dosya gönderme ve bulut yedeklemede belirleyici olan bu daha düşük yükleme hızıdır."],
    ["Hız testi sonuçları nasıl okunur?", "İndirme ve yükleme değerleri paketle karşılaştırılır, ping ve jitter gecikmeyi gösterir. Testi kabloyla, diğer cihazlar boştayken, iki farklı sunucuda ve günün farklı saatlerinde tekrarlamak güvenilir sonuç verir."],
    ["Aynı anda birden fazla cihaz hızı nasıl paylaşır?", "Hattın toplam hızı o anda veri isteyen cihazlar arasında bölünür. Bir cihaz yüksek çözünürlüklü video izlerken diğerine kalan hız azalır; boşta duran cihazlar ise çok az pay kullanır."],
    ["Bit ve bayt arasındaki 8 kat fark nereden gelir?", "Bayt, bilgisayarlarda bir karakteri saklamak için standartlaşmış 8 bitlik birimdir. Hat hızları bit, dosya boyutları bayt cinsinden ölçüldüğü için iki değer arasında her zaman 8 kat fark bulunur."]
  ],
  tools: ["mbps-mbs-cevir", "indirme-suresi-hesapla", "bant-genisligi-hesapla", "bit-bayt-cevir"],
  related: ["internet-hizi-kac-mbps-olmali", "gb-kac-mb-veri-birimleri", "dbm-nedir-wifi-sinyal-gucu"]
};
