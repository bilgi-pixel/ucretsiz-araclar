export default {
  slug: "hissedilen-sicaklik-nedir",
  kategori: "gunluk",
  tarih: "2026-11-15",
  title: "Hissedilen Sıcaklık Nedir, Nasıl Hesaplanır? Rüzgâr Soğuğu ve Isı İndeksi",
  pageTitle: "Hissedilen Sıcaklık Nedir? Rüzgâr Soğuğu ve Isı İndeksi",
  description: "Hissedilen sıcaklık, rüzgâr ve nemin vücuda etkisini katan değerdir. Soğukta rüzgâr soğuğu, sıcakta ısı indeksi; 35 °C ve %50 nem 40,7 °C hissettirir.",
  keywords: ["hissedilen sıcaklık nedir", "hissedilen sıcaklık nasıl hesaplanır", "rüzgar soğuğu", "ısı indeksi nedir", "çiy noktası nedir", "nem ve sıcaklık", "wind chill formülü", "beaufort ölçeği"],
  lead: "Hissedilen sıcaklık, <strong>termometrenin ölçtüğü hava sıcaklığının rüzgâr ve nem etkisiyle insan vücuduna nasıl hissettirdiğini gösteren hesaplanmış bir değerdir</strong>. Soğuk havada rüzgâr vücuttan ısıyı daha hızlı uzaklaştırdığı için \"rüzgâr soğuğu\" formülü, sıcak havada nem terin buharlaşmasını zorlaştırdığı için \"ısı indeksi\" formülü kullanılır. Örneğin −5 °C ve 30 km/sa rüzgârda hissedilen sıcaklık yaklaşık −13 °C, 35 °C ve %50 nemde yaklaşık 40,7 °C'dir. Bu sayfada iki formülü, çiy noktasını ve uygulamaların neden farklı değerler gösterdiğini bulacaksınız.",
  kisaCevap: [
    "Hissedilen sıcaklık bir ölçüm değil, sıcaklık, rüzgâr ve nemden hesaplanan bir konfor ve risk göstergesidir.",
    "Rüzgâr soğuğu (°C, km/sa): 13,12 + 0,6215T − 11,37V<sup>0,16</sup> + 0,3965TV<sup>0,16</sup>; 10 °C ve altında, rüzgâr en az 4,8 km/sa iken kullanılır.",
    "Isı indeksi, sıcaklık ve bağıl nemden hesaplanır; yaklaşık 27 °C üzerinde ve nem yüksekken termometre değerinden belirgin biçimde yüksek çıkar.",
    "−5 °C ve 30 km/sa rüzgâr ≈ −13 °C; 35 °C ve %50 nem ≈ 40,7 °C hissettirir.",
    "Çiy noktası, havanın doyup yoğuşmaya başladığı sıcaklıktır; yaz aylarında 20 °C'yi aşan çiy noktası bunaltıcı his verir.",
    "Değerler gölge ve 10 metre yükseklikteki rüzgâr içindir; doğrudan güneş altında vücudun hissettiği sıcaklık daha yüksek olabilir."
  ],
  figure: {
    alt: "İki termometre: kışın −5 °C hava ve 30 km/sa rüzgârla hissedilen sıcaklık −13 °C; yazın 35 °C hava ve yüzde 50 nemle hissedilen sıcaklık 40,7 °C. Altta hangi formülün hangi sıcaklık aralığında kullanıldığını gösteren şerit.",
    caption: "Soğukta rüzgâr, sıcakta nem hissedilen sıcaklığı termometreden uzaklaştırır. Ölçeğin ortasındaki ılıman aralıkta iki etki de zayıftır ve hissedilen sıcaklık hava sıcaklığına yakındır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Rüzgâr ve nem sıcaklığı nasıl değiştirir?</text>
  <rect x="20" y="50" width="330" height="250" rx="12" class="sf sb"/>
  <text x="185" y="78" class="b mid">Kış: rüzgâr soğuğu</text>
  <rect x="70" y="96" width="30" height="170" rx="15" class="sf sb"/>
  <rect x="76" y="186" width="18" height="74" rx="9" class="c"/>
  <text x="85" y="288" class="sm mid">hava</text>
  <rect x="150" y="96" width="30" height="170" rx="15" class="sf sb"/>
  <rect x="156" y="226" width="18" height="34" rx="9" class="p"/>
  <text x="165" y="288" class="sm mid">hissedilen</text>
  <text x="210" y="140" class="xl">−5 °C</text>
  <text x="210" y="166" class="sm mu">rüzgâr 30 km/sa</text>
  <text x="210" y="230" class="xl p">−13 °C</text>
  <text x="210" y="254" class="sm p b">8 derece daha soğuk</text>
  <rect x="370" y="50" width="330" height="250" rx="12" class="sf sb"/>
  <text x="535" y="78" class="b mid">Yaz: ısı indeksi</text>
  <rect x="420" y="96" width="30" height="170" rx="15" class="sf sb"/>
  <rect x="426" y="146" width="18" height="114" rx="9" class="a"/>
  <text x="435" y="288" class="sm mid">hava</text>
  <rect x="500" y="96" width="30" height="170" rx="15" class="sf sb"/>
  <rect x="506" y="110" width="18" height="150" rx="9" class="dg"/>
  <text x="515" y="288" class="sm mid">hissedilen</text>
  <text x="560" y="166" class="xl">35 °C</text>
  <text x="560" y="190" class="sm mu">bağıl nem %50</text>
  <text x="560" y="126" class="xl dg">40,7 °C</text>
  <text x="560" y="146" class="sm dg b">≈ 6 derece daha sıcak</text>
  <rect x="20" y="320" width="230" height="40" rx="6" class="ps"/>
  <text x="135" y="345" class="sm mid b">Rüzgâr soğuğu: ≤ 10 °C</text>
  <rect x="250" y="320" width="220" height="40" rx="6" class="oks"/>
  <text x="360" y="345" class="sm mid b">Ilıman: etki az</text>
  <rect x="470" y="320" width="230" height="40" rx="6" class="dgs"/>
  <text x="585" y="345" class="sm mid b">Isı indeksi: ≈ 27 °C üstü</text>
  <text x="360" y="396" class="sm mid t2">Hesaplar gölge ve standart rüzgâr ölçüm yüksekliği için geçerlidir.</text>
</svg>`
  },
  sections: [
    {
      h: "Hissedilen sıcaklık nedir?",
      p: [
        "İnsan vücudu çevresindeki havayla sürekli ısı alışverişi yapar. Termometre yalnızca havanın sıcaklığını ölçer; oysa bizim sıcak ya da soğuk hissetmemiz, vücudumuzun ne hızla ısı kaybettiğine bağlıdır. Rüzgâr, cildin hemen üzerindeki ılık hava katmanını sürekli süpürerek soğukta ısı kaybını hızlandırır. Nem ise sıcakta terin buharlaşmasını zorlaştırarak vücudun serinleme mekanizmasını yavaşlatır.",
        "Hissedilen sıcaklık, bu etkileri tek bir sayıyla anlatmak için geliştirilmiş hesaplanmış bir değerdir. \"Bugün hava 0 °C ama −7 °C gibi hissettiriyor\" demek, rüzgârsız bir günde −7 °C'de cildinizden kaybedeceğiniz ısıyı bugün 0 °C'de rüzgârla kaybedeceğiniz anlamına gelir. Bu nedenle hissedilen sıcaklık bir ölçüm değil, insan vücudu modeline dayanan bir tahmindir.",
        "Hava durumu uygulamalarının iki sıcaklık göstermesi bundandır: biri ölçülen hava sıcaklığı, diğeri bu sıcaklığın rüzgâr ve nemle düzeltilmiş hâlidir. Giyiminizi ve dışarıda geçireceğiniz süreyi planlarken hissedilen değer daha yol göstericidir."
      ]
    },
    {
      h: "Rüzgâr soğuğu (wind chill) nedir, nasıl hesaplanır?",
      p: [
        "Rüzgâr soğuğu, soğuk havada rüzgârın açıktaki cilde etkisini hesaplar. Bugün Kanada ve ABD meteoroloji kurumlarının 2001'de birlikte yayımladığı formül yaygın olarak kullanılır. Formül, hava sıcaklığı 10 °C ve altında, rüzgâr hızı 10 metre yükseklikte ölçülmüş ve en az 4,8 km/sa iken geçerlidir."
      ],
      formula: "HS = 13,12 + 0,6215 × T − 11,37 × V<sup>0,16</sup> + 0,3965 × T × V<sup>0,16</sup>\nT: hava sıcaklığı (°C) · V: rüzgâr hızı (km/sa)",
      ol: [
        "<strong>Örnek, T = −5 °C ve V = 30 km/sa:</strong> 30<sup>0,16</sup> ≈ 1,723 bulunur.",
        "Terimler: 13,12 + 0,6215 × (−5) = 13,12 − 3,11 = 10,01.",
        "11,37 × 1,723 = 19,59 çıkarılır: 10,01 − 19,59 = −9,58.",
        "0,3965 × (−5) × 1,723 = −3,42 eklenir: −9,58 − 3,42 = <strong>−13,0 °C</strong>.",
        "<strong>İkinci örnek, T = 0 °C ve V = 20 km/sa:</strong> 20<sup>0,16</sup> ≈ 1,615; 13,12 − 11,37 × 1,615 = <strong>−5,2 °C</strong>."
      ],
      after: [
        "Rüzgâr soğuğu düştükçe açıktaki ciltte donma riski artar. Kanada meteoroloji kurumunun sınıflamasına göre hissedilen sıcaklık −28 °C'nin altına indiğinde açıktaki cilt 10–30 dakikada, −40 °C'nin altında 5–10 dakikada donabilir. Kendi değerlerinizle hesap için [[arac:ruzgar-hissedilen-sicaklik-hesapla|Rüzgâr ile Hissedilen Sıcaklık Hesaplama aracını]] kullanabilirsiniz; araç risk düzeyini de gösterir."
      ],
      table: {
        head: ["Hava (°C)", "10 km/sa", "20 km/sa", "30 km/sa", "50 km/sa"],
        rows: [
          ["5", "2,7", "1,1", "0,1", "−1,3"],
          ["0", "−3,3", "−5,2", "−6,5", "−8,1"],
          ["−5", "−9,3", "−11,6", "−13,0", "−15,0"],
          ["−10", "−15,3", "−17,9", "−19,5", "−21,8"],
          ["−20", "−27,2", "−30,5", "−32,6", "−35,4"]
        ],
        caption: "Değerler rüzgâr soğuğu formülüyle hesaplanmış, bir ondalık basamağa yuvarlanmıştır."
      }
    },
    {
      h: "Isı indeksi nedir? Nem sıcaklığı neden daha bunaltıcı yapar?",
      p: [
        "Sıcak havada vücut, terleyerek ve terin buharlaşmasıyla serinler. Havadaki nem arttıkça buharlaşma yavaşlar, ter cilt üzerinde kalır ve vücut ısısını atmakta zorlanır. Isı indeksi, bu etkiyi sıcaklık ve bağıl nem üzerinden hesaplayan değerdir. ABD Ulusal Hava Durumu Servisi'nin kullandığı formül (Rothfusz regresyonu) Fahrenhayt cinsinden çok terimli bir denklemdir; sonuç Santigrata çevrilerek verilir.",
        "Isı indeksi yaklaşık 27 °C'nin altında hava sıcaklığından pek farklı değildir. Sıcaklık ve nem birlikte yükseldikçe fark hızla büyür: 35 °C'de nem %20 iken hissedilen yaklaşık 33 °C olabilirken, %50'de 40,7 °C'ye çıkar. Kuru sıcakta hissedilen değerin hava sıcaklığının biraz altında kalması, terin hızla buharlaşarak vücudu serinletmesindendir."
      ],
      table: {
        head: ["Hava (°C)", "Bağıl nem", "Isı indeksi (yaklaşık)", "Risk düzeyi"],
        rows: [
          ["30", "%40", "29,7 °C", "Dikkat sınırında"],
          ["28", "%80", "32,1 °C", "Dikkat"],
          ["35", "%20", "33,0 °C", "Aşırı dikkat"],
          ["32", "%70", "40,4 °C", "Tehlike"],
          ["35", "%50", "40,7 °C", "Tehlike"],
          ["38", "%60", "55,0 °C", "Aşırı tehlike"]
        ],
        caption: "Risk düzeyleri ABD Ulusal Hava Durumu Servisi sınıflamasına göredir (yaklaşık: 27–32 °C dikkat, 32–39 °C aşırı dikkat, 39–51 °C tehlike, 52 °C ve üstü aşırı tehlike)."
      },
      after: [
        "Isı indeksi gölgedeki değerdir. Doğrudan güneş altında, özellikle rüzgârsız ortamda, hissedilen sıcaklık bundan birkaç derece, kimi kaynaklara göre 8 °C'ye kadar yüksek olabilir. Sıcak hava dalgalarında yaşlılar, bebekler, kronik hastalığı olanlar ve açık havada ağır iş yapanlar için risk belirgin biçimde artar. Sıcaklık ve nemden ısı indeksini [[arac:isi-indeksi-hesapla|Isı İndeksi Hesaplama aracıyla]] bulabilirsiniz."
      ]
    },
    {
      h: "Çiy noktası ne anlama gelir?",
      p: [
        "Çiy noktası, havanın içindeki su buharı miktarı değişmeden soğutulduğunda doymuş hâle gelip yoğuşmaya başladığı sıcaklıktır. Sabah çimenlerin üzerindeki çiy, soğuk içecek bardağının dışındaki damlalar ve kışın cam kenarlarındaki terleme, yüzey sıcaklığının çiy noktasının altına inmesiyle oluşur.",
        "Bağıl nem sıcaklığa göre değiştiği için gün içinde dalgalanır; çiy noktası ise havadaki gerçek nem miktarını daha iyi temsil eder. Bu yüzden meteorologlar bunaltıcılığı çiy noktasıyla anlatmayı sever: çiy noktası 10 °C'nin altındayken hava kuru ve konforlu, 16–20 °C arasında nemli, 20 °C'nin üzerinde ise yapış yapış ve bunaltıcı hissedilir."
      ],
      formula: "Magnus yaklaşımı: γ = ln(RH ÷ 100) + 17,62 × T ÷ (243,12 + T)\nÇiy noktası = 243,12 × γ ÷ (17,62 − γ)",
      after: [
        "Örnek: 30 °C ve %60 nemde çiy noktası yaklaşık 21,4 °C'dir; hava bunaltıcıdır. Aynı 30 °C'de nem %40 olsaydı çiy noktası 14,9 °C olur, hava çok daha rahat hissedilirdi. 25 °C ve %80 nemde çiy noktası 21,3 °C'ye çıkar. Evde küf ve terleme sorunu yaşıyorsanız duvar yüzey sıcaklığını çiy noktasının üzerinde tutmak gerekir; hesap için [[arac:ciy-noktasi-hesapla|Çiy Noktası Hesaplama aracını]] kullanabilirsiniz."
      ]
    },
    {
      h: "Hava durumu uygulamaları neden farklı hissedilen sıcaklık gösterir?",
      p: [
        "İki uygulamanın aynı saat ve şehir için farklı hissedilen sıcaklık göstermesi sık karşılaşılan bir durumdur. Bunun birkaç nedeni vardır:"
      ],
      ul: [
        "<strong>Farklı formüller:</strong> Bazı servisler soğukta rüzgâr soğuğu, sıcakta ısı indeksi kullanır; bazıları ise rüzgâr, nem ve güneş ışınımını aynı anda hesaba katan \"görünür sıcaklık\" (apparent temperature) gibi birleşik modeller kullanır.",
        "<strong>Güneş etkisi:</strong> Bazı modeller güneş ışınımını ekler, bazıları gölge değerini verir.",
        "<strong>Farklı veri kaynakları:</strong> En yakın istasyon, model tahmini ya da uydu verisi kullanılabilir; şehir içi ile havalimanı istasyonu arasında birkaç derece fark olabilir.",
        "<strong>Ara bölge kuralı:</strong> Hava 10 °C ile 27 °C arasındayken çoğu servis hissedilen sıcaklığı hava sıcaklığına eşit gösterir ya da iki formül arasında yumuşak geçiş yapar."
      ],
      after: [
        "Türkiye'de resmî hava durumu verileri ve uyarılar Meteoroloji Genel Müdürlüğü tarafından yayımlanır. Sıcak hava dalgası, kuvvetli rüzgâr ve fırtına uyarılarında resmî duyuruları esas alın."
      ]
    },
    {
      h: "Rüzgâr hızı Beaufort ölçeğinde nasıl ifade edilir?",
      p: [
        "Beaufort ölçeği, rüzgâr hızını 0'dan 12'ye kadar kuvvet dereceleriyle ve doğada görülen etkileriyle tanımlar. Hava durumu bültenlerinde \"rüzgâr kuzeyden 5–6 kuvvetinde\" ifadesi bu ölçeğe göredir. Kuvvet ile hız arasındaki yaklaşık bağıntı v = 0,836 × B<sup>1,5</sup> m/sn'dir."
      ],
      table: {
        head: ["Kuvvet", "Ad", "Yaklaşık hız (km/sa)", "Karada görülen etki"],
        rows: [
          ["0", "Sakin", "1'in altı", "Duman dik yükselir"],
          ["2", "Hafif rüzgâr", "6–11", "Rüzgâr yüzde hissedilir"],
          ["4", "Orta rüzgâr", "20–28", "Toz ve kâğıt havalanır"],
          ["6", "Kuvvetli rüzgâr", "39–49", "Büyük dallar sallanır, şemsiye zor tutulur"],
          ["8", "Fırtına", "62–74", "İnce dallar kırılır, yürümek güçleşir"],
          ["10", "Tam fırtına", "89–102", "Ağaçlar sökülebilir, yapısal hasar"],
          ["12", "Kasırga", "118 ve üstü", "Yıkıcı ve yaygın hasar"]
        ],
        caption: "Basılı tablolardaki tam sayı sınırları kaynaklara göre küçük farklılıklar gösterebilir."
      },
      after: [
        "Bültendeki km/sa, m/sn ya da knot cinsinden hızı Beaufort kuvvetine çevirmek için [[arac:beaufort-ruzgar-cevir|Beaufort Rüzgâr Çevirici]] kullanılabilir. Rüzgâr soğuğu hesabında ise km/sa değerini doğrudan formüle koyarsınız; 1 m/sn = 3,6 km/sa, 1 knot = 1,852 km/sa'dir."
      ]
    },
    {
      h: "Hissedilen sıcaklığı yorumlarken dikkat edilecekler",
      ul: [
        "<strong>Islaklık:</strong> Yağmurda ıslanmış giysiler ve ıslak cilt, formülün öngördüğünden çok daha hızlı ısı kaybettirir.",
        "<strong>Hareket ve giyim:</strong> Bisiklet ya da koşu sırasında oluşan hava akımı, rüzgâr hızına eklenir; aynı gün yürüyen ile bisiklet süren farklı soğuk hisseder.",
        "<strong>Bireysel farklar:</strong> Yaş, vücut yapısı, kronik hastalıklar ve kullanılan bazı ilaçlar sıcağa ve soğuğa toleransı değiştirir.",
        "<strong>Kapalı alanlar:</strong> Formüller dış ortam içindir; havalandırması zayıf, sıcak ve nemli kapalı alanlarda ısı stresi beklenenden yüksek olabilir.",
        "<strong>Birim karışıklığı:</strong> Rüzgâr soğuğu formülü km/sa ister; m/sn değerini doğrudan yazmak sonucu ciddi biçimde değiştirir. Sıcaklık birimleri için [[bilgi:celsius-fahrenheit-cevirme|Celsius Fahrenheit çevirme]] yazısına bakabilirsiniz."
      ],
      note: "Aşırı sıcakta baş dönmesi, bulantı, kas krampı ve bilinç bulanıklığı; aşırı soğukta titreme, uyuşma ve ciltte beyazlama gibi belirtiler acil durum işareti olabilir. Bu durumlarda 112 Acil Çağrı Merkezi'ni arayın."
    }
  ],
  faq: [
    ["Hissedilen sıcaklık nedir?", "Hissedilen sıcaklık, hava sıcaklığının rüzgâr ve nem etkisiyle insan vücuduna nasıl hissettirdiğini gösteren hesaplanmış bir değerdir. Soğukta rüzgâr soğuğu, sıcakta ısı indeksi formülüyle bulunur ve bir ölçüm değil tahmindir."],
    ["Hissedilen sıcaklık nasıl hesaplanır?", "Soğuk havada sıcaklık ve rüzgâr hızı rüzgâr soğuğu formülüne, sıcak havada sıcaklık ve bağıl nem ısı indeksi formülüne konur. Örneğin −5 °C ve 30 km/sa rüzgârda sonuç yaklaşık −13 °C'dir."],
    ["Rüzgâr soğuğu (wind chill) nedir?", "Rüzgârın cildin üzerindeki ılık hava katmanını süpürerek ısı kaybını hızlandırmasının sıcaklık cinsinden ifadesidir. 10 °C ve altındaki sıcaklıklarda, rüzgâr en az 4,8 km/sa iken hesaplanır ve donma riskini değerlendirmede kullanılır."],
    ["Isı indeksi nedir?", "Isı indeksi, sıcak havada nemin terin buharlaşmasını zorlaştırmasıyla vücudun hissettiği sıcaklığı gösterir. Sıcaklık ve bağıl nemden hesaplanır; 35 °C ve yüzde 50 nemde yaklaşık 40,7 °C'dir ve tehlike düzeyine karşılık gelir."],
    ["Nem sıcaklığı neden daha bunaltıcı yapar?", "Vücut sıcakta terin buharlaşmasıyla serinler. Havadaki nem arttıkça buharlaşma yavaşlar, ter ciltte kalır ve vücut ısısını atamaz. Bu yüzden aynı sıcaklık nemli havada kuru havaya göre çok daha sıcak hissettirir."],
    ["Çiy noktası ne anlama gelir?", "Çiy noktası, havanın içindeki nem değişmeden soğutulduğunda yoğuşmanın başladığı sıcaklıktır. Havadaki gerçek nem miktarını gösterir; yaz aylarında 20 °C'yi aşan çiy noktası bunaltıcı, 10 °C'nin altındaki değerler ise kuru ve konforlu bir his verir."],
    ["Hava durumu uygulamaları neden iki sıcaklık gösterir?", "Biri istasyonda ölçülen hava sıcaklığı, diğeri bu değerin rüzgâr ve nemle düzeltilmiş hissedilen hâlidir. Uygulamalar farklı formüller ve veri kaynakları kullandığı için hissedilen değer servisler arasında birkaç derece farklı olabilir."],
    ["Rüzgâr hızı Beaufort ölçeğinde nasıl ifade edilir?", "Beaufort ölçeği rüzgârı 0 (sakin) ile 12 (kasırga) arasındaki kuvvet dereceleriyle tanımlar. Yaklaşık bağıntı v = 0,836 × B üzeri 1,5 m/sn'dir; örneğin 6 kuvvetindeki rüzgâr yaklaşık 39–49 km/sa hızındadır."],
    ["Hissedilen sıcaklık güneşte de geçerli mi?", "Rüzgâr soğuğu ve ısı indeksi formülleri gölge koşulları içindir. Doğrudan güneş altında, özellikle rüzgârsız ortamda vücudun hissettiği sıcaklık hesaplanan değerden birkaç derece yüksek olabilir; bazı uygulamalar bunu ayrıca hesaba katar."]
  ],
  tools: ["ruzgar-hissedilen-sicaklik-hesapla", "isi-indeksi-hesapla", "ciy-noktasi-hesapla", "beaufort-ruzgar-cevir"],
  related: ["celsius-fahrenheit-cevirme", "basinc-nedir-nasil-hesaplanir", "klima-kac-btu-olmali"],
  sources: [
    ["Meteoroloji Genel Müdürlüğü", "https://www.mgm.gov.tr/"],
    ["Dünya Meteoroloji Örgütü (WMO)", "https://wmo.int/"],
    ["ABD Ulusal Hava Durumu Servisi – Isı indeksi", "https://www.weather.gov/"]
  ]
};
