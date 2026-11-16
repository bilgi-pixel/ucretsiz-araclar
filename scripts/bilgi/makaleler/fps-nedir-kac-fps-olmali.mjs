export default {
  slug: "fps-nedir-kac-fps-olmali",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "FPS Nedir, Kaç FPS Olmalı? Video ve Oyunda 24, 30, 60 FPS Farkı",
  pageTitle: "FPS Nedir, Kaç FPS Olmalı? 24, 25, 30 ve 60 FPS Farkı",
  description: "FPS, saniyede gösterilen kare sayısıdır. Sinema 24, Türkiye'de yayın 25/50, sosyal medya 30/60 FPS kullanır. Ağır çekim, dosya boyutu, zaman kodu ve oyun FPS'i.",
  keywords: ["fps nedir", "kaç fps olmalı", "30 fps 60 fps farkı", "24 fps neden kullanılır", "video fps ayarı", "kare hızı nedir", "ağır çekim kaç fps", "oyunda kaç fps akıcı"],
  lead: "FPS (frames per second, saniyedeki kare sayısı), <strong>bir videonun ya da oyunun bir saniyede kaç ayrı görüntü (kare) gösterdiğini belirten kare hızıdır</strong>. Sinema geleneksel olarak 24 FPS, Türkiye gibi 50 Hz elektrik şebekesi kullanan ülkelerde televizyon yayını 25 ya da 50 FPS, sosyal medya ve telefon videoları çoğunlukla 30 ya da 60 FPS kullanır. Yüksek FPS hareketi daha akıcı gösterir ve ağır çekim yapmaya imkân verir; ama daha fazla ışık, depolama ve işlem gücü ister. Bu yazıda hangi durumda kaç FPS seçileceğini, ağır çekim hesabını, dosya boyutuna etkisini, zaman kodu çevirisini ve oyunlardaki FPS'i anlatıyoruz.",
  kisaCevap: [
    "FPS = saniyedeki kare sayısı; her kare ekranda 1.000 ÷ FPS milisaniye kalır (30 FPS'te 33,3 ms, 60 FPS'te 16,7 ms).",
    "24 FPS sinematik görünüm, 25/50 FPS Türkiye'de yayın ve 50 Hz aydınlatma, 30/60 FPS sosyal medya ve oyun videosu için yaygındır.",
    "Ağır çekim oranı = çekim FPS ÷ oynatma FPS: 120 FPS çekilip 30 FPS'te oynatılan video 4 kat yavaş akar.",
    "Pozlama süresi için yaygın kural: 1 ÷ (2 × FPS); 25 FPS için 1/50, 30 FPS için 1/60 saniye.",
    "Dosya boyutu bit hızına bağlıdır; 60 FPS kayıt aynı kalite için genellikle 30 FPS'ten daha yüksek bit hızı ister.",
    "Oyunlarda 30 FPS oynanabilir, 60 FPS akıcı, 120–144 FPS ve üzeri hızlı rekabetçi oyunlar için tercih edilir; ekranın yenileme hızı da yeterli olmalıdır."
  ],
  figure: {
    alt: "Bir saniyelik zaman şeridinde 24, 30 ve 60 kare; her satırda karenin süresi 41,7, 33,3 ve 16,7 milisaniye olarak gösteriliyor.",
    caption: "Aynı bir saniye, 24 FPS'te 24, 30 FPS'te 30, 60 FPS'te 60 kareye bölünür. Kare sayısı arttıkça her karenin ekranda kaldığı süre kısalır ve hareketler daha akıcı görünür.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">1 saniyede kaç kare?</text>
  <text x="150" y="66" class="sm">0 sn</text><text x="670" y="66" class="sm end">1 sn</text>
  <text x="20" y="96" class="b">24 FPS</text><text x="20" y="114" class="sm t2">41,7 ms/kare</text>
  <text x="20" y="166" class="b">30 FPS</text><text x="20" y="184" class="sm t2">33,3 ms/kare</text>
  <text x="20" y="236" class="b">60 FPS</text><text x="20" y="254" class="sm t2">16,7 ms/kare</text>
  <rect x="150.0" y="80" width="20.2" height="34" class="p"/>
  <rect x="171.7" y="80" width="20.2" height="34" class="p"/>
  <rect x="193.3" y="80" width="20.2" height="34" class="p"/>
  <rect x="215.0" y="80" width="20.2" height="34" class="p"/>
  <rect x="236.7" y="80" width="20.2" height="34" class="p"/>
  <rect x="258.3" y="80" width="20.2" height="34" class="p"/>
  <rect x="280.0" y="80" width="20.2" height="34" class="p"/>
  <rect x="301.7" y="80" width="20.2" height="34" class="p"/>
  <rect x="323.3" y="80" width="20.2" height="34" class="p"/>
  <rect x="345.0" y="80" width="20.2" height="34" class="p"/>
  <rect x="366.7" y="80" width="20.2" height="34" class="p"/>
  <rect x="388.3" y="80" width="20.2" height="34" class="p"/>
  <rect x="410.0" y="80" width="20.2" height="34" class="p"/>
  <rect x="431.7" y="80" width="20.2" height="34" class="p"/>
  <rect x="453.3" y="80" width="20.2" height="34" class="p"/>
  <rect x="475.0" y="80" width="20.2" height="34" class="p"/>
  <rect x="496.7" y="80" width="20.2" height="34" class="p"/>
  <rect x="518.3" y="80" width="20.2" height="34" class="p"/>
  <rect x="540.0" y="80" width="20.2" height="34" class="p"/>
  <rect x="561.7" y="80" width="20.2" height="34" class="p"/>
  <rect x="583.3" y="80" width="20.2" height="34" class="p"/>
  <rect x="605.0" y="80" width="20.2" height="34" class="p"/>
  <rect x="626.7" y="80" width="20.2" height="34" class="p"/>
  <rect x="648.3" y="80" width="20.2" height="34" class="p"/>
  <rect x="150.0" y="150" width="15.8" height="34" class="ps"/>
  <rect x="167.3" y="150" width="15.8" height="34" class="ps"/>
  <rect x="184.7" y="150" width="15.8" height="34" class="ps"/>
  <rect x="202.0" y="150" width="15.8" height="34" class="ps"/>
  <rect x="219.3" y="150" width="15.8" height="34" class="ps"/>
  <rect x="236.7" y="150" width="15.8" height="34" class="ps"/>
  <rect x="254.0" y="150" width="15.8" height="34" class="ps"/>
  <rect x="271.3" y="150" width="15.8" height="34" class="ps"/>
  <rect x="288.7" y="150" width="15.8" height="34" class="ps"/>
  <rect x="306.0" y="150" width="15.8" height="34" class="ps"/>
  <rect x="323.3" y="150" width="15.8" height="34" class="ps"/>
  <rect x="340.7" y="150" width="15.8" height="34" class="ps"/>
  <rect x="358.0" y="150" width="15.8" height="34" class="ps"/>
  <rect x="375.3" y="150" width="15.8" height="34" class="ps"/>
  <rect x="392.7" y="150" width="15.8" height="34" class="ps"/>
  <rect x="410.0" y="150" width="15.8" height="34" class="ps"/>
  <rect x="427.3" y="150" width="15.8" height="34" class="ps"/>
  <rect x="444.7" y="150" width="15.8" height="34" class="ps"/>
  <rect x="462.0" y="150" width="15.8" height="34" class="ps"/>
  <rect x="479.3" y="150" width="15.8" height="34" class="ps"/>
  <rect x="496.7" y="150" width="15.8" height="34" class="ps"/>
  <rect x="514.0" y="150" width="15.8" height="34" class="ps"/>
  <rect x="531.3" y="150" width="15.8" height="34" class="ps"/>
  <rect x="548.7" y="150" width="15.8" height="34" class="ps"/>
  <rect x="566.0" y="150" width="15.8" height="34" class="ps"/>
  <rect x="583.3" y="150" width="15.8" height="34" class="ps"/>
  <rect x="600.7" y="150" width="15.8" height="34" class="ps"/>
  <rect x="618.0" y="150" width="15.8" height="34" class="ps"/>
  <rect x="635.3" y="150" width="15.8" height="34" class="ps"/>
  <rect x="652.7" y="150" width="15.8" height="34" class="ps"/>
  <rect x="150.0" y="220" width="7.2" height="34" class="oks"/>
  <rect x="158.7" y="220" width="7.2" height="34" class="oks"/>
  <rect x="167.3" y="220" width="7.2" height="34" class="oks"/>
  <rect x="176.0" y="220" width="7.2" height="34" class="oks"/>
  <rect x="184.7" y="220" width="7.2" height="34" class="oks"/>
  <rect x="193.3" y="220" width="7.2" height="34" class="oks"/>
  <rect x="202.0" y="220" width="7.2" height="34" class="oks"/>
  <rect x="210.7" y="220" width="7.2" height="34" class="oks"/>
  <rect x="219.3" y="220" width="7.2" height="34" class="oks"/>
  <rect x="228.0" y="220" width="7.2" height="34" class="oks"/>
  <rect x="236.7" y="220" width="7.2" height="34" class="oks"/>
  <rect x="245.3" y="220" width="7.2" height="34" class="oks"/>
  <rect x="254.0" y="220" width="7.2" height="34" class="oks"/>
  <rect x="262.7" y="220" width="7.2" height="34" class="oks"/>
  <rect x="271.3" y="220" width="7.2" height="34" class="oks"/>
  <rect x="280.0" y="220" width="7.2" height="34" class="oks"/>
  <rect x="288.7" y="220" width="7.2" height="34" class="oks"/>
  <rect x="297.3" y="220" width="7.2" height="34" class="oks"/>
  <rect x="306.0" y="220" width="7.2" height="34" class="oks"/>
  <rect x="314.7" y="220" width="7.2" height="34" class="oks"/>
  <rect x="323.3" y="220" width="7.2" height="34" class="oks"/>
  <rect x="332.0" y="220" width="7.2" height="34" class="oks"/>
  <rect x="340.7" y="220" width="7.2" height="34" class="oks"/>
  <rect x="349.3" y="220" width="7.2" height="34" class="oks"/>
  <rect x="358.0" y="220" width="7.2" height="34" class="oks"/>
  <rect x="366.7" y="220" width="7.2" height="34" class="oks"/>
  <rect x="375.3" y="220" width="7.2" height="34" class="oks"/>
  <rect x="384.0" y="220" width="7.2" height="34" class="oks"/>
  <rect x="392.7" y="220" width="7.2" height="34" class="oks"/>
  <rect x="401.3" y="220" width="7.2" height="34" class="oks"/>
  <rect x="410.0" y="220" width="7.2" height="34" class="oks"/>
  <rect x="418.7" y="220" width="7.2" height="34" class="oks"/>
  <rect x="427.3" y="220" width="7.2" height="34" class="oks"/>
  <rect x="436.0" y="220" width="7.2" height="34" class="oks"/>
  <rect x="444.7" y="220" width="7.2" height="34" class="oks"/>
  <rect x="453.3" y="220" width="7.2" height="34" class="oks"/>
  <rect x="462.0" y="220" width="7.2" height="34" class="oks"/>
  <rect x="470.7" y="220" width="7.2" height="34" class="oks"/>
  <rect x="479.3" y="220" width="7.2" height="34" class="oks"/>
  <rect x="488.0" y="220" width="7.2" height="34" class="oks"/>
  <rect x="496.7" y="220" width="7.2" height="34" class="oks"/>
  <rect x="505.3" y="220" width="7.2" height="34" class="oks"/>
  <rect x="514.0" y="220" width="7.2" height="34" class="oks"/>
  <rect x="522.7" y="220" width="7.2" height="34" class="oks"/>
  <rect x="531.3" y="220" width="7.2" height="34" class="oks"/>
  <rect x="540.0" y="220" width="7.2" height="34" class="oks"/>
  <rect x="548.7" y="220" width="7.2" height="34" class="oks"/>
  <rect x="557.3" y="220" width="7.2" height="34" class="oks"/>
  <rect x="566.0" y="220" width="7.2" height="34" class="oks"/>
  <rect x="574.7" y="220" width="7.2" height="34" class="oks"/>
  <rect x="583.3" y="220" width="7.2" height="34" class="oks"/>
  <rect x="592.0" y="220" width="7.2" height="34" class="oks"/>
  <rect x="600.7" y="220" width="7.2" height="34" class="oks"/>
  <rect x="609.3" y="220" width="7.2" height="34" class="oks"/>
  <rect x="618.0" y="220" width="7.2" height="34" class="oks"/>
  <rect x="626.7" y="220" width="7.2" height="34" class="oks"/>
  <rect x="635.3" y="220" width="7.2" height="34" class="oks"/>
  <rect x="644.0" y="220" width="7.2" height="34" class="oks"/>
  <rect x="652.7" y="220" width="7.2" height="34" class="oks"/>
  <rect x="661.3" y="220" width="7.2" height="34" class="oks"/>
  <rect x="20" y="284" width="680" height="100" rx="10" class="sf sb"/>
  <rect x="20" y="284" width="8" height="100" class="p"/>
  <text x="44" y="310" class="b">Ağır çekim: 120 FPS çek, 30 FPS'te oynat</text>
  <text x="44" y="336">120 ÷ 30 = 4 kat yavaş · 1 sn olay → 4 sn video</text>
  <text x="44" y="362" class="sm t2">Pozlama kuralı: 1 ÷ (2 × FPS) → 25 FPS'te 1/50 sn, 30 FPS'te 1/60 sn</text>
</svg>`
  },
  sections: [
    {
      h: "FPS nedir?",
      p: [
        "Video aslında art arda gösterilen durağan fotoğraflardan oluşur. Her bir fotoğrafa <strong>kare</strong> (frame) denir. Kareler yeterince hızlı değiştiğinde göz ve beyin bunları kesintisiz bir hareket olarak algılar. FPS, bu karelerin saniyede kaç kez değiştiğini gösterir; Türkçede <strong>kare hızı</strong> ya da \"saniyedeki kare sayısı\" olarak da geçer.",
        "Kare hızı iki ayrı yerde önemlidir. <strong>Çekim kare hızı</strong>, kameranın saniyede kaç kare kaydettiğidir. <strong>Oynatma kare hızı</strong>, videonun saniyede kaç kare gösterilerek izlendiğidir. İkisi eşitse hareket gerçek hızında görünür; çekim hızı oynatma hızından büyükse ağır çekim, küçükse hızlandırılmış görüntü elde edilir.",
        "FPS, ekranın yenileme hızıyla (Hz) karıştırılmamalıdır. 60 Hz bir ekran saniyede en fazla 60 farklı görüntü gösterebilir; bu ekranda 120 FPS'lik bir oyun ya da video ancak 60 kare olarak görülür. Yenileme hızı ekranın, FPS ise içeriğin ya da grafik kartının özelliğidir."
      ],
      formula: "Kare süresi (ms) = 1.000 ÷ FPS\nToplam kare = süre (sn) × FPS\nAğır çekim oranı = çekim FPS ÷ oynatma FPS"
    },
    {
      h: "Sinema neden 24 FPS kullanır?",
      p: [
        "Sessiz film döneminde kare hızı standart değildi ve kameralar elle çevrildiği için 16–20 FPS arasında değişiyordu. Sesli filmlerin gelişiyle ses izinin film şeridinde sabit hızla akması gerektiğinden 1920'lerin sonunda 24 FPS standart hâline geldi. Bu değer, akıcı hareket ve anlaşılır ses için yeterli olurken pahalı film şeridini mümkün olduğunca az harcıyordu.",
        "Bugün dijital kameralar her kare hızında çekim yapabildiği hâlde 24 FPS sinemanın \"görünüş\" standardı olarak kaldı. 24 FPS'te her karede bir miktar hareket bulanıklığı bulunur; izleyici bu hafif bulanıklığı \"sinematik\" his olarak tanır. Aynı sahne 60 FPS'te çekildiğinde çok net ve akıcı görünür; bazı izleyiciler bunu televizyon ya da günlük video estetiğine benzetir. Hangisinin daha iyi olduğu bir tercih meselesidir."
      ]
    },
    {
      h: "Video çekerken kaç FPS seçilmeli?",
      table: {
        head: ["Kullanım", "Önerilen FPS", "Neden?"],
        rows: [
          ["Film, kısa film, belgesel", "24 (ya da 25)", "Sinematik hareket bulanıklığı"],
          ["Türkiye'de TV yayını, iç mekân ışığında çekim", "25 ya da 50", "50 Hz şebeke ve aydınlatmayla titreme olmaz"],
          ["Sosyal medya, vlog, röportaj", "25/30", "Dengeli dosya boyutu, doğal görünüm"],
          ["Spor, çocuk, hayvan, hızlı hareket", "50/60", "Akıcı ve net hareket"],
          ["Oyun kaydı ve ekran kaydı", "60", "Arayüz ve kamera hareketleri akıcı"],
          ["Ağır çekim", "100–240 ve üzeri", "Oynatmada yavaşlatmak için fazla kare"],
          ["Timelapse (hızlandırılmış)", "Kare aralığıyla çekim, 25/30 oynatma", "Uzun olayı kısa videoya sığdırma"]
        ],
        caption: "Bir projede tüm klipleri aynı kare hızında çekmek, montajda takılma ve atlama sorunlarını önler."
      },
      after: [
        "Türkiye'de elektrik şebekesi 50 Hz'dir ve bazı floresan ile LED lambalar saniyede 100 kez titreşir. Bu ışıklar altında 30 ya da 60 FPS'te çekim yapıp pozlamayı 1/60 sn'ye ayarlamak görüntüde yavaşça kayan şeritlere (flicker) yol açabilir. Kare hızını 25 ya da 50 FPS, pozlamayı 1/50 ya da 1/100 sn seçmek bu sorunu genellikle giderir."
      ]
    },
    {
      h: "30 FPS ile 60 FPS arasındaki fark nedir?",
      p: [
        "60 FPS, 30 FPS'in iki katı kare içerir; her kare ekranda 33,3 ms yerine 16,7 ms kalır. Sonuç olarak hızlı hareketler, kamera kaydırmaları ve kaydırılan metinler 60 FPS'te çok daha akıcı görünür. Spor, oyun ve aksiyon görüntüleri için bu fark belirgindir; konuşan bir kişinin sabit çekiminde ise çoğu izleyici farkı fark etmez."
      ],
      table: {
        head: ["Konu", "30 FPS", "60 FPS"],
        rows: [
          ["Kare süresi", "33,3 ms", "16,7 ms"],
          ["Hareket", "Doğal, hafif bulanık", "Çok akıcı, net"],
          ["Işık ihtiyacı", "Daha az (1/60 sn pozlama)", "Daha fazla (1/120 sn pozlama)"],
          ["Dosya boyutu", "Daha küçük", "Aynı kalite için genellikle daha büyük"],
          ["Ağır çekim payı", "Yok", "30 FPS'te oynatınca 2 kat yavaş"],
          ["Uygun içerik", "Konuşma, vlog, eğitim videosu", "Spor, oyun, hızlı hareket"]
        ]
      },
      after: [
        "60 FPS'in en az bilinen avantajı esnekliktir: 60 FPS çektiğiniz bir klibi 30 FPS'lik bir montajda yarı hızda kullanarak hafif bir ağır çekim elde edebilirsiniz. Karanlık ortamlarda ise yüksek kare hızı pozlama süresini kısalttığı için görüntü kararır ve gürültü artar; bu koşullarda 24–30 FPS daha temiz sonuç verir."
      ]
    },
    {
      h: "Ağır çekim için kaç FPS gerekir?",
      p: [
        "Ağır çekim, normalden yüksek kare hızında kaydedilen görüntünün normal hızda oynatılmasıyla elde edilir. Yavaşlama oranı çekim kare hızının oynatma kare hızına bölümüdür."
      ],
      table: {
        head: ["Çekim FPS", "Oynatma 25 FPS", "Oynatma 30 FPS", "1 saniyelik olay kaç saniye sürer? (30 FPS)"],
        rows: [
          ["50", "2 kat", "1,67 kat", "1,67 sn"],
          ["60", "2,4 kat", "2 kat", "2 sn"],
          ["120", "4,8 kat", "4 kat", "4 sn"],
          ["240", "9,6 kat", "8 kat", "8 sn"],
          ["960", "38,4 kat", "32 kat", "32 sn"]
        ]
      },
      after: [
        "Hafif bir yavaşlama için 50–60 FPS, belirgin ağır çekim için 100–120 FPS, su damlası ya da kanat çırpışı gibi çok hızlı olaylar için 240 FPS ve üzeri gerekir. Yüksek kare hızlarında birçok kamera ve telefon çözünürlüğü düşürür; ayrıca çok kısa pozlama süreleri nedeniyle bol ışık gerekir. Ters yöndeki hızlandırılmış çekimin kare aralığını hesaplamak için [[arac:timelapse-hesapla|Timelapse Çekim Aralığı Hesaplama]] aracını kullanabilirsiniz: örneğin 2 saatlik bir olayı 25 FPS'te 20 saniyelik videoya sığdırmak için 500 kare gerekir ve her 14,4 saniyede bir kare çekilir."
      ]
    },
    {
      h: "FPS dosya boyutunu nasıl etkiler?",
      p: [
        "Video dosyasının boyutu öncelikle <strong>bit hızına</strong> (bitrate) bağlıdır: dosya boyutu = bit hızı × süre. Kare hızı arttıkça saniyede kodlanacak kare sayısı arttığı için aynı görüntü kalitesini korumak genellikle daha yüksek bit hızı gerektirir. Modern sıkıştırma yöntemleri (H.264, H.265) ardışık kareler arasındaki benzerliği kullandığından FPS'i ikiye katlamak boyutu tam iki katına çıkarmaz; ama belirgin biçimde artırır."
      ],
      formula: "Dosya boyutu (MB) = bit hızı (Mbps) × süre (sn) ÷ 8\nÖrnek: 16 Mbps × 60 sn ÷ 8 = 120 MB (1 dakika)",
      ul: [
        "1080p, 30 FPS, örnek 16 Mbps: dakikada yaklaşık 120 MB.",
        "1080p, 60 FPS, örnek 24 Mbps: dakikada yaklaşık 180 MB.",
        "4K, 30 FPS, örnek 50 Mbps: dakikada yaklaşık 375 MB.",
        "4K, 60 FPS, örnek 80 Mbps: dakikada yaklaşık 600 MB."
      ],
      after: [
        "Bit hızları cihaza ve kalite ayarına göre değişir; kendi kameranızın değeriyle hesaplamak için [[arac:video-boyutu-hesapla|Video Boyutu Hesaplama]] aracını kullanabilirsiniz. Bit ile bayt farkı ve MB, GB dönüşümleri için [[bilgi:gb-kac-mb-veri-birimleri|1 GB kaç MB]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Zaman kodu ve kare sayısı nasıl çevrilir?",
      p: [
        "Video düzenleme programları konumları <strong>zaman kodu</strong> (timecode) ile gösterir: SS:DD:SN:KK, yani saat, dakika, saniye ve kare. Son hane saniyenin içindeki kare numarasıdır ve 0'dan FPS − 1'e kadar sayar; 25 FPS'te 00–24, 30 FPS'te 00–29 arasındadır."
      ],
      formula: "Toplam kare = (saat × 3.600 + dakika × 60 + saniye) × FPS + kare\nSaniye = toplam kare ÷ FPS",
      ol: [
        "25 FPS'te 00:01:30:12 → (0 + 60 + 30) × 25 + 12 = <strong>2.262 kare</strong>.",
        "Aynı zaman kodu 30 FPS'te → 90 × 30 + 12 = <strong>2.712 kare</strong>.",
        "Ters yönde: 25 FPS'te 4.000 kare → 4.000 ÷ 25 = 160 sn = <strong>00:02:40:00</strong>.",
        "29,97 FPS (NTSC) kullanan projelerde saat ile zaman kodu arasındaki kaymayı önlemek için \"drop-frame\" zaman kodu kullanılır; bu sistemde bazı kare numaraları atlanır, kareler silinmez."
      ],
      after: [
        "Zaman kodunu kareye, kareyi zaman koduna çevirmek için [[arac:zaman-kodu-cevir|Video Zaman Kodu (Timecode) Kare Çevirici]] aracını; milisaniye ve saniye dönüşümleri için [[arac:milisaniye-saniye-cevir|Milisaniye Saniye Çevirici]] aracını kullanabilirsiniz. Altyazı dosyalarındaki zamanlamanın mantığı için [[bilgi:altyazi-dosyasi-srt-nedir|SRT dosyası nedir]] yazısı yol gösterir."
      ]
    },
    {
      h: "Oyunlarda kaç FPS akıcı kabul edilir?",
      p: [
        "Oyunlarda FPS, grafik kartının ve işlemcinin saniyede kaç kare üretebildiğidir ve sahneye göre sürekli değişir. Video izlemekten farklı olarak oyuncu da sürekli girdi verdiği için yüksek FPS yalnızca görüntüyü değil, tepki süresini de iyileştirir."
      ],
      table: {
        head: ["FPS", "Kare süresi", "Deneyim"],
        rows: [
          ["30", "33,3 ms", "Oynanabilir alt sınır; bazı konsol oyunlarında hedef"],
          ["60", "16,7 ms", "Akıcı; çoğu oyun için standart hedef"],
          ["120", "8,3 ms", "Çok akıcı; 120 Hz ekranla anlamlı"],
          ["144", "6,9 ms", "Rekabetçi oyunlarda yaygın; 144 Hz ekran gerekir"],
          ["240", "4,2 ms", "Profesyonel rekabetçi oyunculuk"]
        ]
      },
      after: [
        "Ortalama FPS kadar önemli olan <strong>tutarlılıktır</strong>. Ortalama 60 FPS olan ama ara ara 25'e düşen bir oyun, sabit 45 FPS'te çalışan bir oyundan daha rahatsız edici görünebilir. Ekranın yenileme hızını aşan FPS değerleri görüntüde yırtılmaya (tearing) yol açabilir; dikey eşitleme (V-Sync) ya da değişken yenileme hızı teknolojileri bu sorunu azaltır. Ekranınızın çözünürlüğü ve yenileme hızı için [[rehber:ekran-cozunurlugu-ve-olu-piksel-kontrolu|ekran çözünürlüğü rehberine]] bakabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Farklı FPS'leri karıştırmak:</strong> 25 ve 30 FPS kliplerini aynı montajda kullanmak takılmalara yol açar.",
        "<strong>Yüksek FPS'i her zaman daha iyi sanmak:</strong> Karanlık ortamda 60 FPS daha karanlık ve gürültülü görüntü verir.",
        "<strong>Pozlama süresini unutmak:</strong> 25 FPS'te 1/1000 sn pozlama hareketi kesik ve robotik gösterir; 1/50 civarı doğal görünür.",
        "<strong>Ekranın yenileme hızını göz ardı etmek:</strong> 60 Hz ekranda 144 FPS'in avantajı sınırlıdır.",
        "<strong>Ağır çekimi sonradan yapmaya çalışmak:</strong> 30 FPS çekilmiş görüntü yazılımla yavaşlatılınca kareler tekrar eder ya da yapay ara kareler oluşur."
      ]
    }
  ],
  faq: [
    ["FPS nedir?", "FPS, saniyedeki kare sayısıdır ve bir videonun ya da oyunun bir saniyede kaç ayrı görüntü gösterdiğini belirtir. 30 FPS'lik bir videoda her saniye 30 kare gösterilir ve her kare ekranda yaklaşık 33 milisaniye kalır."],
    ["Video çekerken kaç FPS seçilmeli?", "Sinematik görünüm için 24 ya da 25, sosyal medya ve günlük videolar için 25 ya da 30, spor ve hızlı hareketler için 50 ya da 60 FPS uygundur. Türkiye'de iç mekân ışıklarında titreme olmaması için 25 veya 50 FPS tercih edilebilir."],
    ["30 FPS ile 60 FPS arasındaki fark nedir?", "60 FPS, 30 FPS'in iki katı kare içerir ve hızlı hareketleri daha akıcı gösterir. Buna karşılık daha fazla ışık ve depolama ister; aynı kalite için genellikle daha yüksek bit hızı gerekir."],
    ["Sinema neden 24 FPS kullanır?", "Sesli filmlerin ortaya çıktığı 1920'lerin sonunda ses izinin sabit hızda akması gerektiği için 24 FPS standart oldu. Bu değer akıcı hareket ile film şeridi maliyeti arasında denge kuruyordu ve bugün sinematik görünümün simgesi olarak sürüyor."],
    ["Ağır çekim için kaç FPS gerekir?", "Yavaşlama oranı çekim FPS'inin oynatma FPS'ine bölümüdür. 30 FPS'te oynatılacak bir videoda 60 FPS 2 kat, 120 FPS 4 kat, 240 FPS 8 kat yavaşlama sağlar. Belirgin ağır çekim için en az 100 ile 120 FPS önerilir."],
    ["FPS dosya boyutunu nasıl etkiler?", "Dosya boyutu bit hızı ile süreye bağlıdır. Kare hızı arttıkça aynı kaliteyi korumak için genellikle daha yüksek bit hızı gerekir; örnek olarak 1080p 30 FPS dakikada yaklaşık 120 MB, 60 FPS yaklaşık 180 MB tutabilir."],
    ["Zaman kodu ve kare sayısı nasıl çevrilir?", "Saat, dakika ve saniye toplam saniyeye çevrilip FPS ile çarpılır, ardından kare hanesi eklenir. 25 FPS'te 00:01:30:12 zaman kodu 90 × 25 + 12 = 2.262 kareye karşılık gelir."],
    ["Oyunlarda kaç FPS akıcı kabul edilir?", "30 FPS oynanabilir alt sınır, 60 FPS çoğu oyun için akıcı standart kabul edilir. Rekabetçi oyunlarda 120, 144 ve 240 FPS tercih edilir; bunun avantajını görmek için ekranın da aynı yenileme hızını desteklemesi gerekir."],
    ["FPS ile Hz aynı şey mi?", "Hayır. FPS içeriğin ya da grafik kartının saniyede ürettiği kare sayısıdır; Hz ise ekranın saniyede kaç kez yenilendiğidir. 60 Hz bir ekran, daha yüksek FPS üretilse bile saniyede en fazla 60 farklı görüntü gösterebilir."]
  ],
  tools: ["zaman-kodu-cevir", "timelapse-hesapla", "video-boyutu-hesapla", "milisaniye-saniye-cevir"],
  related: ["gb-kac-mb-veri-birimleri", "altyazi-dosyasi-srt-nedir", "full-frame-aps-c-crop-faktoru-nedir", "dpi-ve-cozunurluk-nedir"]
};
