export default {
  slug: "mp3-kac-kbps-olmali-ses-kalitesi",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "MP3 Kaç Kbps Olmalı? 128, 192, 320 Kbps Farkı ve Ses Dosyası Boyutu",
  pageTitle: "MP3 Kaç Kbps Olmalı? 128, 192 ve 320 Kbps Farkı",
  description: "MP3'te kbps saniyedeki veri miktarıdır. Müzik için 192–320, konuşma için 64–128 kbps yaygındır. 1 dakika MP3 kaç MB, WAV farkı, 44,1 kHz ve kayıpsız küçültme.",
  keywords: ["mp3 kaç kbps olmalı", "128 kbps 320 kbps farkı", "kbps nedir ses", "1 dakika mp3 kaç mb", "ses dosyası boyutu hesaplama", "wav mp3 farkı", "44,1 khz ne demek", "podcast bit hızı"],
  lead: "MP3 için uygun bit hızı kullanım amacına bağlıdır: müzik arşivi için genellikle <strong>192–320 kbps</strong>, konuşma, podcast ve sesli not için <strong>64–128 kbps</strong> yeterli kabul edilir. Kbps, sesin bir saniyesi için kaç kilobit veri kullanıldığını gösterir ve dosya boyutunu doğrudan belirler: 128 kbps'lik bir dakika yaklaşık 0,96 MB, 320 kbps'lik bir dakika 2,4 MB, sıkıştırılmamış CD kalitesinde WAV ise yaklaşık 10,6 MB tutar. Bu sayfada kbps kavramını, kalite farklarını, örnekleme hızını ve dosya boyutu hesabını örneklerle anlatıyoruz.",
  kisaCevap: [
    "Kbps = saniyede kilobit; 1 kbps = 1.000 bit/sn. Bit hızı yükseldikçe kalite ve dosya boyutu artar.",
    "Dosya boyutu (MB) = bit hızı (kbps) × süre (sn) ÷ 8 ÷ 1.000.",
    "1 dakika MP3: 128 kbps ≈ 0,96 MB, 192 kbps ≈ 1,44 MB, 320 kbps ≈ 2,4 MB.",
    "CD kalitesinde WAV (44,1 kHz, 16 bit, stereo) 1.411,2 kbps'dir ve dakikada yaklaşık 10,6 MB tutar.",
    "MP3 kayıplı bir biçimdir; düşük kbps'li bir dosyayı yüksek kbps'e dönüştürmek kaliteyi geri getirmez.",
    "Kalite kaybı olmadan küçültmek için kayıpsız sıkıştırma (FLAC gibi) kullanılır."
  ],
  figure: {
    alt: "Bit hızına göre bir dakikalık ses dosyasının boyutu: 64 kbps 0,48 MB, 128 kbps 0,96 MB, 192 kbps 1,44 MB, 256 kbps 1,92 MB, 320 kbps 2,40 MB ve CD kalitesinde WAV 10,58 MB.",
    caption: "Çubuklar aynı ölçekte çizilmiştir. 320 kbps'lik en yüksek kaliteli MP3 bile sıkıştırılmamış WAV dosyasının yaklaşık dörtte biri boyutundadır. Değerler 1 MB = 1.000.000 bayt ile hesaplanmıştır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">1 dakikalık ses kaç MB tutar?</text>
  <g>
    <text x="20" y="80" class="b">64 kbps</text><text x="20" y="96" class="sm mu">konuşma, mono</text>
    <rect x="130" y="66" width="25" height="30" rx="4" class="ps"/><text x="165" y="87" class="b">0,48 MB</text>

    <text x="20" y="130" class="b">128 kbps</text><text x="20" y="146" class="sm mu">podcast, genel</text>
    <rect x="130" y="116" width="51" height="30" rx="4" class="ps"/><text x="191" y="137" class="b">0,96 MB</text>

    <text x="20" y="180" class="b">192 kbps</text><text x="20" y="196" class="sm mu">iyi müzik</text>
    <rect x="130" y="166" width="76" height="30" rx="4" class="oks"/><text x="216" y="187" class="b">1,44 MB</text>

    <text x="20" y="230" class="b">256 kbps</text><text x="20" y="246" class="sm mu">yüksek kalite</text>
    <rect x="130" y="216" width="102" height="30" rx="4" class="oks"/><text x="242" y="237" class="b">1,92 MB</text>

    <text x="20" y="280" class="b">320 kbps</text><text x="20" y="296" class="sm mu">MP3 üst sınırı</text>
    <rect x="130" y="266" width="127" height="30" rx="4" class="a"/><text x="267" y="287" class="b">2,40 MB</text>

    <text x="20" y="330" class="b">WAV</text><text x="20" y="346" class="sm mu">1.411 kbps</text>
    <rect x="130" y="316" width="560" height="30" rx="4" class="p"/><text x="680" y="337" class="b end sf">10,58 MB</text>
  </g>
  <rect x="20" y="364" width="680" height="44" rx="8" class="sf sb"/>
  <text x="360" y="383" class="sm mid b">Boyut (MB) = kbps × saniye ÷ 8 ÷ 1.000</text>
  <text x="360" y="400" class="sm mid">4 dakikalık şarkı: 128 kbps ≈ 3,8 MB · 320 kbps ≈ 9,6 MB · WAV ≈ 42,3 MB</text>
</svg>`
  },
  sections: [
    {
      h: "Kbps nedir?",
      p: [
        "Kbps (kilobit per second, saniyede kilobit), dijital sesin ya da videonun bir saniyesini temsil etmek için kullanılan veri miktarıdır ve <strong>bit hızı</strong> (bitrate) olarak da adlandırılır. 128 kbps, sesin her saniyesi için 128.000 bit, yani 16.000 bayt veri kullanıldığı anlamına gelir. Ses dosyalarında \"k\" ondalık bin anlamındadır: 1 kbps = 1.000 bit/sn.",
        "Bit hızı, kalite ile dosya boyutu arasındaki dengeyi belirler. Daha yüksek bit hızı, sıkıştırma sırasında daha fazla ayrıntının korunması demektir; buna karşılık dosya da büyür. Bit ve bayt farkı, bu hesaplarda en sık yapılan hatanın kaynağıdır: kbps bit cinsindendir, dosya boyutu ise bayt cinsinden ölçülür ve aralarında 8 kat fark vardır. Ayrıntısı [[bilgi:gb-kac-mb-veri-birimleri|veri birimleri]] yazısında.",
        "Video için de aynı kavram kullanılır; ancak videoda bit hızları çok daha yüksektir ve megabit (Mbps) ile ifade edilir. Görüntü tarafının ayrıntısı [[bilgi:video-dosya-boyutu-ve-bitrate|video dosya boyutu ve bitrate]] yazısında anlatılıyor."
      ]
    },
    {
      h: "Ses dosyası boyutu nasıl hesaplanır?",
      formula: "Sıkıştırılmış ses (MP3, AAC, Opus):\nBoyut (bayt) = bit hızı (bit/sn) × süre (sn) ÷ 8\nBoyut (MB) = kbps × saniye ÷ 8 ÷ 1.000\nSıkıştırılmamış ses (WAV):\nBit hızı = örnekleme hızı × bit derinliği × kanal sayısı\n44.100 × 16 × 2 = 1.411.200 bit/sn = 1.411,2 kbps",
      ol: [
        "<strong>4 dakikalık şarkı, 320 kbps MP3:</strong> 320 × 240 sn ÷ 8 ÷ 1.000 = 9,6 MB.",
        "<strong>Aynı şarkı, 128 kbps:</strong> 128 × 240 ÷ 8 ÷ 1.000 = 3,84 MB.",
        "<strong>1 saatlik podcast, 96 kbps:</strong> 96 × 3.600 ÷ 8 ÷ 1.000 = 43,2 MB.",
        "<strong>1 dakikalık WAV, 44,1 kHz, 16 bit, stereo:</strong> 1.411,2 × 60 ÷ 8 ÷ 1.000 ≈ 10,58 MB.",
        "<strong>1 dakikalık WAV, 48 kHz, 24 bit, stereo:</strong> 48.000 × 24 × 2 = 2.304 kbps → 2.304 × 60 ÷ 8 ÷ 1.000 = 17,28 MB."
      ],
      after: [
        "Kayıt süresini ve ayarları yazarak MP3 ya da WAV dosyasının kaç MB tutacağını görmek için [[arac:ses-dosyasi-boyutu-hesapla|Ses Dosyası Boyutu Hesaplama]] aracını kullanabilirsiniz. Gerçek dosyalarda etiket bilgileri ve kapak görseli birkaç yüz kilobayt ek yer kaplayabilir; değişken bit hızlı dosyalarda boyut ortalama bit hızına göre oynar."
      ]
    },
    {
      h: "MP3 için kaç kbps yeterlidir?",
      p: [
        "Cevap, sesin türüne, dinleme ortamına ve kullanılan kulaklık ya da hoparlörün kalitesine bağlıdır. Konuşma, müziğe göre çok daha dar bir frekans aralığı ve daha basit bir yapı içerdiği için düşük bit hızlarında bile anlaşılır kalır. Müzik ise özellikle zil, ziller ve yüksek frekanslı enstrümanlarda düşük bit hızında bozulma gösterebilir."
      ],
      table: {
        head: ["Bit hızı", "1 dakika", "Kalite algısı (genel)", "Uygun kullanım"],
        rows: [
          ["32–64 kbps", "0,24–0,48 MB", "Konuşma anlaşılır, müzik zayıf", "Sesli not, telefon kaydı, mono konuşma"],
          ["96 kbps", "0,72 MB", "Konuşma için iyi", "Podcast (mono ya da stereo), sesli kitap"],
          ["128 kbps", "0,96 MB", "Günlük dinleme için kabul edilebilir", "Genel amaçlı müzik, podcast"],
          ["192 kbps", "1,44 MB", "Çoğu dinleyici için iyi", "Müzik arşivi, telefon ve araç"],
          ["256 kbps", "1,92 MB", "Çok iyi", "Kaliteli müzik arşivi"],
          ["320 kbps", "2,40 MB", "MP3 için en yüksek", "Arşiv ve kaliteli kulaklıkla dinleme"]
        ],
        caption: "Kalite algıları genel eğilimdir; kayıt kalitesi, kodlayıcı ve dinleme ekipmanı sonucu belirgin şekilde değiştirir."
      },
      after: [
        "Pratik bir kural: depolama alanı sorun değilse müzik için 256 ya da 320 kbps, alan kısıtlıysa 192 kbps seçmek çoğu kullanıcıyı memnun eder. 128 kbps günlük dinleme için hâlâ yaygın bir değerdir ama kaliteli bir kulaklıkla bazı parçalarda fark edilebilir bozulmalar duyulabilir."
      ]
    },
    {
      h: "128 ve 320 kbps arasında duyulur fark var mı?",
      p: [
        "Birçok dinleyici, gündelik ortamlarda ve sıradan kulaklıklarla 192 kbps üzerindeki MP3'leri birbirinden ayırt etmekte zorlanır. Kontrollü kör dinleme testlerinde de yüksek bit hızlı MP3 ile kayıpsız kaynak arasındaki farkın çoğu kişi ve çoğu parça için duyulmadığı sık bildirilir.",
        "128 kbps ile 320 kbps arasındaki fark ise daha belirgindir ve özellikle şu durumlarda fark edilir: zil ve trampet gibi yüksek frekanslı vuruşlarda \"cızırtı\" ya da \"su altı\" etkisi, akustik kayıtlarda stereo genişliğin daralması, sessiz bölümlerde yapay sesler. Kaliteli kulaklık, sessiz ortam ve iyi kaydedilmiş bir kaynak bu farkı ortaya çıkarır; gürültülü bir ortamda ya da küçük bir hoparlörde ise fark büyük ölçüde kaybolur.",
        "Sonuç olarak \"duyulur fark var mı\" sorusu kişiye ve koşula bağlıdır. Kendi kulaklığınızla aynı parçanın iki sürümünü dinleyerek karar vermek en güvenilir yöntemdir."
      ]
    },
    {
      h: "WAV ile MP3 arasındaki fark nedir?",
      p: [
        "<strong>WAV</strong>, sesi genellikle sıkıştırılmamış olarak saklayan bir dosya biçimidir; ses verisi örnek örnek olduğu gibi kaydedilir. Bu yüzden kalite kaybı yoktur ama dosya çok büyüktür. Kayıt, kurgu ve müzik prodüksiyonunda ana çalışma biçimi olarak kullanılır.",
        "<strong>MP3</strong> ise kayıplı sıkıştırma kullanır. İnsan kulağının duyamadığı ya da başka seslerin maskelediği bilgiler psikoakustik modellere göre atılır ve geri kalan veri sıkıştırılır. Böylece dosya on kat ve daha fazla küçülür; ancak atılan bilgi bir daha geri getirilemez."
      ],
      table: {
        head: ["Özellik", "WAV", "MP3", "FLAC"],
        rows: [
          ["Sıkıştırma", "Genellikle yok", "Kayıplı", "Kayıpsız"],
          ["1 dakika (CD kalitesi)", "≈ 10,6 MB", "1–2,4 MB", "Kayda göre değişir, çoğu zaman WAV'ın yarısı civarı"],
          ["Kalite", "Kaynakla aynı", "Bit hızına bağlı", "Kaynakla aynı"],
          ["Kullanım", "Kayıt, kurgu, arşiv", "Dinleme, paylaşım", "Kayıpsız arşiv ve dinleme"],
          ["Uyumluluk", "Çok yüksek", "Çok yüksek", "Yüksek, bazı eski cihazlarda yok"]
        ]
      },
      after: [
        "Bir dosyayı başka biçime çevirmek için [[arac:ses-donustur|Ses Dönüştürücü]] aracını kullanabilirsiniz; araç MP3, M4A, OGG ve FLAC dosyalarını WAV'a ya da verimli Opus kodlayıcısıyla WebM/OGG biçimine çevirir ve dosyanız tarayıcınızdan çıkmaz. Biçimler arası dönüşümle ilgili ayrıntılar [[rehber:ses-dosyasi-donusturme|ses dosyası dönüştürme rehberinde]] anlatılıyor."
      ]
    },
    {
      h: "Örnekleme hızı (44,1 kHz) ve bit derinliği ne demek?",
      p: [
        "Analog ses dijitale çevrilirken saniyede belirli sayıda ölçüm (örnek) alınır. <strong>Örnekleme hızı</strong> bu ölçüm sayısıdır: 44,1 kHz saniyede 44.100 örnek demektir. Örnekleme teoremine göre bir sistem, örnekleme hızının yarısına kadar olan frekansları doğru temsil edebilir. 44,1 kHz bu yüzden 22,05 kHz'e kadar sesleri kapsar; bu da insan kulağının duyabildiği yaklaşık 20 kHz'lik üst sınırın biraz üzerindedir. Müzik CD'leri 44,1 kHz, video ve yayın dünyası ise çoğunlukla 48 kHz kullanır.",
        "<strong>Bit derinliği</strong> ise her örneğin kaç bitle kaydedildiğidir ve dinamik aralığı belirler. 16 bit yaklaşık 96 dB, 24 bit yaklaşık 144 dB teorik dinamik aralık sunar. Dinleme için 16 bit yeterlidir; 24 bit kayıt ve kurgu aşamasında ses seviyesini ayarlarken pay bırakmak için tercih edilir.",
        "Bu iki değer yalnızca sıkıştırılmamış biçimlerde (WAV, AIFF) dosya boyutunu doğrudan belirler. MP3 gibi kayıplı biçimlerde ise boyutu bit hızı (kbps) belirler; örnekleme hızı genellikle 44,1 ya da 48 kHz olarak korunur."
      ]
    },
    {
      h: "Podcast için hangi bit hızı seçilmeli?",
      p: [
        "Podcast ve sesli kitap gibi konuşma ağırlıklı içerikte yüksek bit hızı gereksiz yere dosyayı büyütür ve dinleyicinin mobil verisini tüketir. Yaygın tercihler şunlardır: tek konuşmacılı ya da mono kayıtlar için 64–96 kbps MP3; müzik geçişleri içeren stereo podcastler için 96–128 kbps. Bir saatlik 96 kbps podcast yaklaşık 43 MB, 128 kbps podcast yaklaşık 58 MB tutar.",
        "Kayıt aşamasında ise kaliteyi kısmamak gerekir: ham kayıt WAV olarak, 44,1 ya da 48 kHz ve 24 bit ile yapılır, kurgu bu dosya üzerinde tamamlanır ve yalnızca yayın sürümü düşük bit hızına sıkıştırılır. Kayıttan gereksiz bölümleri çıkarmak için [[arac:ses-kirp|Ses Kesme ve Birleştirme]] aracını kullanabilirsiniz; sessiz bölümlerin kırpılması da dosyayı küçültür."
      ]
    },
    {
      h: "Ses dosyası kalite kaybı olmadan küçültülür mü?",
      p: [
        "Kısmen evet. <strong>Kayıpsız sıkıştırma</strong> (FLAC, ALAC gibi) sesi tek bir bit kaybetmeden küçültür; WAV dosyaları kayda göre değişmekle birlikte çoğu zaman yarı yarıya küçülür. Bu biçimler açıldığında orijinal WAV ile birebir aynı veriyi verir. Kalite kaybı olmadan elde edilebilecek küçülme bununla sınırlıdır.",
        "MP3 dosyalarını daha fazla küçültmenin tek yolu daha düşük bit hızına yeniden kodlamaktır ve bu her zaman ek kalite kaybı demektir. Tersi de işe yaramaz: 128 kbps'lik bir MP3'ü 320 kbps'e dönüştürmek dosyayı büyütür ama kaybolan ayrıntıları geri getirmez. Kayıplı bir dosyayı başka bir kayıplı biçime çevirmek de kayıpları üst üste bindirir; bu yüzden dönüşümleri mümkünse kayıpsız ana kopyadan yapın. ZIP gibi genel amaçlı sıkıştırma MP3 dosyalarında neredeyse hiç küçülme sağlamaz, çünkü veri zaten sıkıştırılmıştır.",
        "Bir dosyanın boyutunu KB ve MB arasında çevirmek için [[arac:kb-mb-cevir|Kilobayt Megabayt Çevirici]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "CBR ve VBR: sabit ve değişken bit hızı",
      p: [
        "MP3 dosyaları iki şekilde kodlanabilir. <strong>CBR</strong> (sabit bit hızı) her saniyeye aynı miktarda veri ayırır; dosya boyutu tam olarak öngörülebilir ama sessiz ya da basit bölümlerde veri israf edilir. <strong>VBR</strong> (değişken bit hızı) karmaşık bölümlere daha çok, basit bölümlere daha az veri ayırır; aynı ortalama boyutta genellikle daha iyi kalite verir ama dosya boyutu yalnızca yaklaşık olarak tahmin edilebilir.",
        "Müzik arşivlerinde VBR yaygın bir tercihtir. Akış ve yayın gibi sabit bant genişliğinin önemli olduğu durumlarda ise CBR tercih edilebilir. Dosya boyutu hesaplarında VBR dosyalar için ortalama bit hızını kullanın."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Bit ile baytı karıştırmak:</strong> 320 kbps saniyede 320 kilobayt değil, 40 kilobayttır.",
        "<strong>Düşük kaliteli dosyayı yükselterek \"iyileştirmek\":</strong> Kaybolan bilgi geri gelmez; yalnızca dosya büyür.",
        "<strong>Kaydı doğrudan düşük bit hızıyla yapmak:</strong> Kurgu ve iyileştirme için ana kayıt yüksek kalitede olmalıdır.",
        "<strong>Konuşma için 320 kbps kullanmak:</strong> Belirgin bir kalite kazancı olmadan dosya üç kat büyür.",
        "<strong>Kayıplıdan kayıplıya tekrar tekrar dönüştürmek:</strong> Her dönüşüm yeni bozulmalar ekler."
      ]
    }
  ],
  faq: [
    ["Kbps nedir?", "Kbps, saniyede kilobit demektir ve sesin bir saniyesini temsil etmek için kullanılan veri miktarını gösterir. 128 kbps, her saniye için 128.000 bit, yani 16.000 bayt veri kullanıldığı anlamına gelir. Değer yükseldikçe kalite ve dosya boyutu artar."],
    ["MP3 için kaç kbps yeterlidir?", "Kullanıma bağlıdır. Müzik için genellikle 192–320 kbps, günlük dinleme için 128 kbps, konuşma, podcast ve sesli not için 64–128 kbps yeterli kabul edilir. Kulaklık kalitesi ve dinleme ortamı da kararı etkiler."],
    ["128 ve 320 kbps arasında duyulur fark var mı?", "Kaliteli kulaklık, sessiz ortam ve iyi bir kayıtla özellikle yüksek frekanslı seslerde fark duyulabilir. Gündelik ortamda ve sıradan kulaklıklarla fark çoğu zaman azalır. 192 kbps üzerindeki farkları ayırt etmek çoğu dinleyici için zordur."],
    ["1 dakikalık MP3 kaç MB tutar?", "Bit hızına bağlıdır: 128 kbps'de yaklaşık 0,96 MB, 192 kbps'de 1,44 MB, 256 kbps'de 1,92 MB, 320 kbps'de 2,4 MB. Hesap kbps × 60 ÷ 8 ÷ 1.000 formülüyle yapılır."],
    ["WAV ile MP3 arasındaki fark nedir?", "WAV sesi genellikle sıkıştırmadan saklar, kalite kaybı yoktur ama CD kalitesinde dakikası yaklaşık 10,6 MB tutar. MP3 kayıplı sıkıştırma kullanır, dosyayı on kat ve daha fazla küçültür ama atılan bilgi geri getirilemez."],
    ["Örnekleme hızı (44,1 kHz) ne demek?", "Sesin dijitale çevrilirken saniyede 44.100 kez ölçüldüğü anlamına gelir. Bu hız 22,05 kHz'e kadar olan frekansları kapsar ve insan kulağının yaklaşık 20 kHz'lik üst sınırını karşılar. Video ve yayında genellikle 48 kHz kullanılır."],
    ["Podcast için hangi bit hızı seçilmeli?", "Konuşma ağırlıklı mono podcastlerde 64–96 kbps, müzik geçişleri içeren stereo podcastlerde 96–128 kbps yaygındır. Ham kayıt yüksek kalitede WAV olarak yapılmalı, yalnızca yayın sürümü düşük bit hızına sıkıştırılmalıdır."],
    ["Ses dosyası kalite kaybı olmadan küçültülür mü?", "FLAC gibi kayıpsız biçimler WAV dosyalarını kalite kaybı olmadan çoğu zaman yarı yarıya küçültür. MP3'leri daha da küçültmek ise düşük bit hızına yeniden kodlama gerektirir ve her zaman ek kalite kaybı yaratır."],
    ["320 kbps'lik 4 dakikalık şarkı kaç MB tutar?", "320 × 240 saniye ÷ 8 ÷ 1.000 = 9,6 MB tutar. Aynı şarkı 128 kbps'de yaklaşık 3,84 MB, CD kalitesinde WAV olarak yaklaşık 42,3 MB olur. Etiket ve kapak görseli birkaç yüz KB ekleyebilir."]
  ],
  tools: ["ses-dosyasi-boyutu-hesapla", "ses-donustur", "ses-kirp", "kb-mb-cevir"],
  related: ["video-dosya-boyutu-ve-bitrate", "gb-kac-mb-veri-birimleri", "internet-hizi-kac-mbps-olmali"],
  sources: [
    ["Uluslararası Telekomünikasyon Birliği (ITU)", "https://www.itu.int/"],
    ["Uluslararası Standardizasyon Örgütü (ISO) – MPEG ses standartları", "https://www.iso.org/"]
  ]
};
