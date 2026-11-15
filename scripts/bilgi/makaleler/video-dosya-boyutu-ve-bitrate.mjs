export default {
  slug: "video-dosya-boyutu-ve-bitrate",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Video Dosya Boyutu Nasıl Hesaplanır? Bitrate, Çözünürlük ve Süre İlişkisi",
  pageTitle: "Video Dosya Boyutu Hesaplama: Bitrate, Süre ve Çözünürlük",
  description: "Video boyutu (MB) = bitrate (Mbps) × süre (sn) ÷ 8. 1 dakikalık 4K video 40 Mbps'te 300 MB, 1 saatlik 1080p 8 Mbps'te 3,6 GB eder. Ses ve MP3 hesabı da burada.",
  keywords: ["video dosya boyutu hesaplama", "bitrate nedir", "1 dakika 4k video kaç mb", "1080p video boyutu", "video kalitesi bitrate", "ses dosyası boyutu", "bir saatlik video kaç gb", "mp3 boyutu hesaplama"],
  lead: "Bir videonun dosya boyutu, <strong>bit hızının (bitrate) süreyle çarpılıp 8'e bölünmesiyle</strong> bulunur: boyut (MB) = bitrate (Mbps) × süre (saniye) ÷ 8. Çözünürlük ve kare hızı boyutu doğrudan değil, gereken bit hızını artırarak etkiler. Örneğin 40 Mbps ile kaydedilen 1 dakikalık 4K video yaklaşık 300 MB, 8 Mbps'lik 1 saatlik 1080p video yaklaşık 3,6 GB tutar. Bu sayfada bitrate kavramını, çözünürlüğe göre boyut tablosunu, MP3 ve WAV hesabını ve kaliteyi koruyarak videoyu küçültmenin yollarını bulacaksınız.",
  kisaCevap: [
    "Video boyutu (MB) = toplam bitrate (Mbps) × süre (sn) ÷ 8; toplam bitrate video ve ses bit hızlarının toplamıdır.",
    "Dakika başına boyut (MB) = bitrate (Mbps) × 7,5; 8 Mbps video dakikada yaklaşık 60 MB eder.",
    "1 dakikalık 4K video 40–60 Mbps'te 300–450 MB, 1080p video 8–16 Mbps'te 60–120 MB tutar.",
    "H.265 (HEVC) ve AV1 gibi yeni kodekler aynı kalite için H.264'e göre belirgin biçimde daha düşük bitrate kullanabilir.",
    "MP3 boyutu: 320 kbps × 240 sn ÷ 8 = 9.600 KB ≈ 9,6 MB; sıkıştırılmamış CD kalitesi WAV dakikada yaklaşık 10,6 MB'tır.",
    "Kare hızı (fps) iki katına çıkınca aynı kalite için gereken bitrate genellikle iki katına değil, yaklaşık 1,5 katına çıkar."
  ],
  figure: {
    alt: "Dakika başına video boyutu: 720p 5 Mbps 37,5 MB, 1080p30 8 Mbps 60 MB, 1080p60 12 Mbps 90 MB, 4K30 40 Mbps 300 MB, 4K60 60 Mbps 450 MB. Formül: MB = Mbps × saniye ÷ 8.",
    caption: "Çubuklar 1 dakikalık videonun yaklaşık boyutunu gösterir. Bitrate'ler örnek değerlerdir; kodek, sahne hareketi ve cihaz ayarlarına göre değişir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">1 dakikalık video kaç MB?</text>
  <rect x="150" y="46" width="420" height="40" rx="8" class="p"/>
  <text x="360" y="72" class="b mid sf">MB = Mbps × 60 sn ÷ 8 = Mbps × 7,5</text>
  <g class="sm">
    <text x="20" y="128" class="b">720p · 5 Mbps</text>
    <text x="20" y="178" class="b">1080p30 · 8 Mbps</text>
    <text x="20" y="228" class="b">1080p60 · 12 Mbps</text>
    <text x="20" y="278" class="b">4K30 · 40 Mbps</text>
    <text x="20" y="328" class="b">4K60 · 60 Mbps</text>
  </g>
  <rect x="180" y="110" width="38" height="28" rx="4" class="ps"/><text x="228" y="130" class="b">37,5 MB</text>
  <rect x="180" y="160" width="60" height="28" rx="4" class="ps"/><text x="250" y="180" class="b">60 MB</text>
  <rect x="180" y="210" width="90" height="28" rx="4" class="ps"/><text x="280" y="230" class="b">90 MB</text>
  <rect x="180" y="260" width="300" height="28" rx="4" class="p"/><text x="490" y="280" class="b">300 MB</text>
  <rect x="180" y="310" width="450" height="28" rx="4" class="p"/><text x="640" y="330" class="b">450 MB</text>
  <line x1="180" y1="100" x2="180" y2="348" class="st" fill="none"/>
  <rect x="20" y="360" width="680" height="48" rx="8" class="sf sb"/>
  <text x="360" y="381" class="sm mid">1 saat 1080p (8 Mbps): 8 × 3.600 ÷ 8 = 3.600 MB ≈ 3,6 GB</text>
  <text x="360" y="400" class="sm mid mu">Ses parçası eklenince boyut biraz artar (128 kbps ≈ dakikada 0,96 MB).</text>
</svg>`
  },
  sections: [
    {
      h: "Bitrate nedir?",
      p: [
        "Bitrate (bit hızı), bir saniyelik video ya da ses için kaç bit veri kullanıldığını gösterir. Video için genellikle megabit/saniye (Mbps), ses için kilobit/saniye (kbps) birimi kullanılır. Bitrate ne kadar yüksekse saniye başına o kadar çok ayrıntı saklanabilir; ama dosya da o oranda büyür.",
        "Bitrate'in dosya boyutuyla ilişkisi doğrudandır ve çözünürlükten bağımsızdır: 8 Mbps'lik bir 720p video ile 8 Mbps'lik bir 4K video, aynı sürede aynı boyutta dosya üretir. Fark kalitededir; 4K görüntü dört kat fazla piksel içerdiği için aynı bit hızında piksel başına daha az veri düşer ve görüntü bloklanır. Bu yüzden çözünürlük arttıkça iyi kalite için gereken bit hızı da artar.",
        "Kodlama iki temel şekilde yapılabilir. <strong>Sabit bit hızında (CBR)</strong> her saniye aynı miktarda veri kullanılır; canlı yayınlarda tercih edilir. <strong>Değişken bit hızında (VBR)</strong> hareketli sahnelere daha çok, durağan sahnelere daha az veri ayrılır; aynı ortalama boyutta daha iyi kalite verir. Telefonlar ve kameralar çoğunlukla değişken bit hızı kullanır."
      ]
    },
    {
      h: "Video dosya boyutu nasıl hesaplanır?",
      p: [
        "Hesap için toplam bitrate'e (video + ses) ve süreye ihtiyacınız vardır. Bit hızı megabit cinsinden olduğu için sonucu megabayta çevirmek amacıyla 8'e bölünür; çünkü 1 bayt 8 bittir."
      ],
      formula: "Boyut (MB) = toplam bitrate (Mbps) × süre (sn) ÷ 8\nBoyut (GB) = boyut (MB) ÷ 1.000\nGereken bitrate (Mbps) = hedef boyut (MB) × 8 ÷ süre (sn)",
      ol: [
        "<strong>Örnek 1, telefonla 4K çekim:</strong> 3 dakikalık, video 45 Mbps, ses 256 kbps (0,256 Mbps). Toplam 45,256 Mbps × 180 sn ÷ 8 = 1.018 MB, yani yaklaşık 1 GB.",
        "<strong>Örnek 2, bir saatlik ders kaydı:</strong> 1080p, video 6 Mbps, ses 128 kbps. Toplam 6,128 × 3.600 ÷ 8 = 2.758 MB, yaklaşık 2,76 GB.",
        "<strong>Örnek 3, ters hesap:</strong> 10 dakikalık bir videoyu 200 MB'a sığdırmak istiyorsunuz. 200 × 8 ÷ 600 = 2,67 Mbps toplam bit hızı gerekir; sese 128 kbps ayırırsanız videoya yaklaşık 2,5 Mbps kalır. Bu değer 720p için kabul edilebilir, 1080p için ise düşüktür."
      ],
      after: [
        "Bu hesapları ve kayıt kartınıza kaç dakika video sığacağını [[arac:video-boyutu-hesapla|Video Boyutu Hesaplama aracı]] hazır profillerle yapar. Boyut birimlerinin ayrıntısı için [[bilgi:gb-kac-mb-veri-birimleri|1 GB kaç MB]] yazısına bakabilirsiniz; büyük dosyaları MB ile GB arasında çevirmek için [[arac:mb-gb-cevir|MB GB çevirici]] kullanılabilir."
      ]
    },
    {
      h: "1 dakikalık 4K video kaç MB tutar? Çözünürlüğe göre boyut tablosu",
      p: [
        "Aşağıdaki tablo, H.264 kodekle tipik kalite için kullanılan bit hızlarına göre yaklaşık boyutları gösterir. Telefonlar çoğu zaman bu değerlerin üzerinde bit hızıyla kayıt yapar; çünkü cihaz üzerinde hızlı kodlama yapmak için daha az verimli ayarlar kullanılır."
      ],
      table: {
        head: ["Çözünürlük ve kare hızı", "Örnek bitrate", "1 dakika", "10 dakika", "1 saat"],
        rows: [
          ["720p, 30 fps", "5 Mbps", "37,5 MB", "375 MB", "2,25 GB"],
          ["1080p, 30 fps", "8 Mbps", "60 MB", "600 MB", "3,6 GB"],
          ["1080p, 60 fps", "12 Mbps", "90 MB", "900 MB", "5,4 GB"],
          ["1080p telefon kaydı", "16 Mbps", "120 MB", "1,2 GB", "7,2 GB"],
          ["4K, 30 fps", "40 Mbps", "300 MB", "3 GB", "18 GB"],
          ["4K, 60 fps", "60 Mbps", "450 MB", "4,5 GB", "27 GB"]
        ],
        caption: "Ses parçası hariçtir. Değerler örnektir; kodek, sahne hareketi ve cihaza göre değişir."
      },
      after: [
        "1080p ile 4K arasındaki boyut farkı, bu örnek değerlerle yaklaşık beş kattır. 4K piksel sayısı 1080p'nin tam dört katı olduğu için kodekler fazladan ayrıntıyı bir miktar verimli sıkıştırabilir; ama telefonun kaydettiği 4K genellikle yine 1080p'nin 3–5 katı yer kaplar. Telefon depolaması dolmuşsa günlük çekimlerde 1080p'ye geçmek en etkili tasarruftur."
      ]
    },
    {
      h: "Kare hızı (fps) ve kodek boyutu nasıl etkiler?",
      p: [
        "Kare hızı saniyede kaç görüntü kaydedildiğini gösterir. 60 fps video, 30 fps'e göre saniyede iki kat kare içerir; ancak art arda gelen kareler birbirine daha çok benzediği için kodek aradaki farkları daha verimli saklar. Bu nedenle aynı kalite için 60 fps'in gerektirdiği bit hızı çoğu zaman 30 fps'in yaklaşık 1,5 katı civarındadır.",
        "Kodek, görüntüyü sıkıştırma yöntemidir ve boyuta en büyük etkiyi yapan seçimdir. H.264 (AVC) en yaygın ve en uyumlu kodektir. H.265 (HEVC) aynı kalite için genellikle belirgin biçimde daha düşük bit hızıyla çalışır; AV1 ise daha da verimli olabilir ama kodlaması daha yavaştır ve eski cihazlar oynatamayabilir. Telefonlardaki \"yüksek verimlilik\" ayarı genellikle HEVC kullanır."
      ],
      table: {
        head: ["Kodek", "Verim (H.264'e göre)", "Uyumluluk"],
        rows: [
          ["H.264 / AVC", "Referans", "Neredeyse her cihaz ve tarayıcı"],
          ["H.265 / HEVC", "Aynı kalitede genellikle daha düşük bitrate", "Yeni cihazlar; bazı tarayıcı ve programlarda sınırlı"],
          ["AV1", "Daha da verimli olabilir", "Güncel tarayıcılar ve yeni donanımlar"],
          ["Sıkıştırılmamış (ham)", "Yok", "Profesyonel kurgu; 1080p30 yaklaşık 1,5 Gbps"]
        ],
        caption: "Ham 1080p30 hesabı: 1.920 × 1.080 piksel × 24 bit × 30 kare ≈ 1,49 Gbps. Sıkıştırma bu veriyi yaklaşık yüz kat küçültür."
      }
    },
    {
      h: "MP3 ve ses dosyasının boyutu nasıl hesaplanır?",
      p: [
        "Ses dosyalarında da aynı formül geçerlidir; yalnızca birim kbps'tir. Sıkıştırılmış biçimlerde (MP3, AAC, OGG) bit hızı doğrudan verilir. Sıkıştırılmamış WAV dosyasında ise bit hızı örnekleme hızı, bit derinliği ve kanal sayısının çarpımıdır."
      ],
      formula: "Sıkıştırılmış ses (KB) = bitrate (kbps) × süre (sn) ÷ 8\nWAV bitrate (bit/sn) = örnekleme hızı × bit derinliği × kanal sayısı\nCD kalitesi: 44.100 × 16 × 2 = 1.411.200 bit/sn ≈ 1.411 kbps",
      table: {
        head: ["Biçim", "Bitrate", "4 dakikalık şarkı", "1 saatlik kayıt"],
        rows: [
          ["MP3 / AAC, konuşma", "64 kbps", "1,92 MB", "28,8 MB"],
          ["MP3, standart", "128 kbps", "3,84 MB", "57,6 MB"],
          ["MP3, yüksek", "320 kbps", "9,6 MB", "144 MB"],
          ["WAV, CD kalitesi", "1.411 kbps", "42,3 MB", "635 MB"],
          ["WAV, 48 kHz 24 bit stereo", "2.304 kbps", "69,1 MB", "1,04 GB"]
        ]
      },
      after: [
        "Podcast ve ders kayıtlarında konuşma için 64–96 kbps çoğu zaman yeterlidir; müzikte 192–320 kbps tercih edilir. WAV boyutunu örnekleme hızı ve bit derinliğine göre [[arac:ses-dosyasi-boyutu-hesapla|Ses Dosyası Boyutu Hesaplama aracıyla]] bulabilirsiniz."
      ]
    },
    {
      h: "Video boyutu kaliteyi bozmadan nasıl küçültülür?",
      p: [
        "Kaliteyi korurken boyutu küçültmenin yolu, gereksiz veriyi atmaktır. Aşağıdaki adımlar etkisi büyükten küçüğe doğru sıralanmıştır."
      ],
      ol: [
        "<strong>Daha verimli kodek kullanın:</strong> H.264 videoyu HEVC'ye çevirmek aynı görünür kalitede boyutu belirgin biçimde azaltabilir; izleyecek cihazların bu kodeği desteklediğinden emin olun.",
        "<strong>Kaliteye dayalı kodlama seçin:</strong> Sabit bit hızı yerine kalite hedefli (sabit kalite) kodlama, durağan sahnelerde gereksiz veri harcamaz.",
        "<strong>Çözünürlüğü kullanım yerine göre seçin:</strong> Telefonda izlenecek ya da mesajla gönderilecek bir video için 4K gereksizdir; 1080p ya da 720p yeterlidir.",
        "<strong>Kare hızını düşürün:</strong> Hareketin az olduğu sunum ve ders kayıtlarında 60 yerine 30 fps yeterlidir.",
        "<strong>Ses bit hızını ayarlayın:</strong> Konuşma ağırlıklı videolarda sesi 128 kbps'e indirmek küçük ama kolay bir kazanç sağlar.",
        "<strong>Gereksiz bölümleri kırpın:</strong> En kesin tasarruf, kaydedilmeyen saniyedir."
      ],
      after: [
        "Videoyu bir platforma yükleyecekseniz, yükleme süresini [[arac:indirme-suresi-hesapla|İndirme Süresi Hesaplama aracındaki]] ters hesapla tahmin edebilirsiniz: aynı formül yükleme hızıyla da çalışır. Ev bağlantılarında yükleme hızı çoğu zaman indirme hızından düşüktür."
      ]
    },
    {
      h: "Türkiye'de pratik senaryolar: kart, telefon ve paylaşım",
      ul: [
        "<strong>Hafıza kartına kaç dakika sığar:</strong> 64 GB kart yaklaşık 64.000 MB'tır. 4K30 (40 Mbps, 300 MB/dk) ile yaklaşık 213 dakika, yani 3,5 saat kayıt alır. Dosya sistemi ve kart formatı nedeniyle kullanılabilir alan biraz daha azdır.",
        "<strong>Düğün ve etkinlik kaydı:</strong> 4 saatlik 1080p60 kayıt (12 Mbps) yaklaşık 21,6 GB eder; yedek kart ve yedek batarya planlayın.",
        "<strong>Mesajla video gönderme:</strong> Mesajlaşma uygulamaları videoyu otomatik sıkıştırır; orijinal kaliteyi korumak için dosya olarak göndermek ya da bulut bağlantısı paylaşmak gerekir.",
        "<strong>Mobil veriyle izleme:</strong> 1080p yayın saatte birkaç GB tüketebilir; 10 GB'lık paketle 8 Mbps'lik akışta yaklaşık 2 saat 47 dakika izlenebilir.",
        "<strong>Okul ve kurum başvuruları:</strong> \"En fazla 100 MB\" sınırlı bir tanıtım videosu için 3 dakikada toplam bit hızı 100 × 8 ÷ 180 ≈ 4,4 Mbps olmalıdır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Mbps ile MB/s'yi karıştırmak:</strong> Bitrate megabit cinsindendir; 8'e bölmeyi unutmak boyutu sekiz kat büyük hesaplatır.",
        "<strong>Sesi hesaba katmamak:</strong> Düşük bitrate'li videolarda ses parçası toplam boyutun belirgin bir kısmını oluşturabilir.",
        "<strong>Çözünürlüğü kalite sanmak:</strong> Düşük bit hızlı 4K video, yüksek bit hızlı 1080p videodan daha kötü görünebilir.",
        "<strong>Defalarca yeniden kodlamak:</strong> Her kayıplı kodlama kaliteyi biraz daha düşürür; düzenlemeleri orijinal dosya üzerinde yapın.",
        "<strong>Ortalama yerine tepe bitrate'i kullanmak:</strong> Değişken bitrate'li videolarda boyutu ortalama bit hızı belirler."
      ]
    }
  ],
  faq: [
    ["Video dosya boyutu nasıl hesaplanır?", "Video ve ses bit hızlarını toplayın, megabit/saniye cinsinden toplamı süreyle (saniye) çarpın ve 8'e bölün; sonuç megabayttır. Örneğin 8 Mbps'lik 10 dakikalık video 8 × 600 ÷ 8 = 600 MB eder."],
    ["Bitrate nedir?", "Bitrate, bir saniyelik video ya da ses için kullanılan veri miktarıdır ve Mbps ya da kbps ile ölçülür. Bit hızı arttıkça saklanabilen ayrıntı ve dosya boyutu artar; çözünürlük ne olursa olsun boyutu belirleyen bit hızıdır."],
    ["1 dakikalık 4K video kaç MB tutar?", "Bit hızına bağlıdır. 40 Mbps ile kaydedilen 1 dakikalık 4K video yaklaşık 300 MB, 60 Mbps ile yaklaşık 450 MB tutar. HEVC kullanan telefonlarda aynı süre daha az yer kaplayabilir."],
    ["1080p ve 4K arasında boyut farkı ne kadar?", "Tipik ayarlarda 4K video aynı süredeki 1080p videonun 3–5 katı yer kaplar. Örneğin 8 Mbps 1080p dakikada 60 MB, 40 Mbps 4K ise dakikada 300 MB tutar; fark kullanılan bit hızından gelir."],
    ["Video boyutu kaliteyi bozmadan nasıl küçültülür?", "Daha verimli bir kodek (HEVC gibi) ve kalite hedefli kodlama kullanmak, çözünürlüğü ve kare hızını izleneceği yere göre seçmek, ses bit hızını ayarlamak ve gereksiz bölümleri kırpmak boyutu kalite kaybını en aza indirerek düşürür."],
    ["Kare hızı (fps) boyutu etkiler mi?", "Evet, ama doğrusal değil. 60 fps video saniyede iki kat kare içerse de kareler birbirine çok benzediği için aynı kalitede genellikle 30 fps'in yaklaşık 1,5 katı bit hızı gerekir ve dosya o oranda büyür."],
    ["Bir saatlik video kaç GB eder?", "Bir saat 3.600 saniyedir; boyut bit hızı × 3.600 ÷ 8 ile bulunur. 8 Mbps'lik 1080p video yaklaşık 3,6 GB, 40 Mbps'lik 4K video yaklaşık 18 GB, 5 Mbps'lik 720p video yaklaşık 2,25 GB eder."],
    ["MP3 dosyasının boyutu nasıl hesaplanır?", "Bit hızını (kbps) süreyle (saniye) çarpıp 8'e bölün; sonuç kilobayttır. 4 dakikalık 128 kbps MP3 128 × 240 ÷ 8 = 3.840 KB, yani yaklaşık 3,8 MB; 320 kbps ise yaklaşık 9,6 MB eder."],
    ["Hafıza kartıma kaç dakika video sığar?", "Kart kapasitesini MB'a çevirip dakika başına boyuta bölün. 64 GB kart 40 Mbps'lik 4K kayıtta (dakikada 300 MB) yaklaşık 213 dakika alır; dosya sistemi payı nedeniyle gerçek süre biraz daha kısadır."]
  ],
  tools: ["video-boyutu-hesapla", "ses-dosyasi-boyutu-hesapla", "indirme-suresi-hesapla", "mb-gb-cevir"],
  related: ["gb-kac-mb-veri-birimleri", "internet-hizi-kac-mbps-olmali", "altyazi-dosyasi-srt-nedir"]
};
