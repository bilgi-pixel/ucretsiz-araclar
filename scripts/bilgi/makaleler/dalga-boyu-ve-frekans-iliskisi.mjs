export default {
  slug: "dalga-boyu-ve-frekans-iliskisi",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Dalga Boyu ve Frekans İlişkisi: c = λ·f Formülü ve Elektromanyetik Spektrum",
  pageTitle: "Dalga Boyu ve Frekans İlişkisi: c = λ·f Formülü, Örnekler",
  description: "Dalga boyu ile frekans ters orantılıdır: λ = v ÷ f. Işıkta v = 299.792.458 m/s; 100 MHz radyo 3 m, 2,4 GHz Wi-Fi 12,5 cm. Spektrum, foton enerjisi ve anten boyu.",
  keywords: ["dalga boyu frekans formülü", "dalga boyu nasıl hesaplanır", "frekans nedir", "elektromanyetik spektrum", "foton enerjisi", "anten boyu hesaplama", "mhz ghz çevirme", "görünür ışık dalga boyu"],
  lead: "Dalga boyu ile frekans <strong>ters orantılıdır</strong>: bir dalganın hızı, dalga boyu ile frekansının çarpımına eşittir (v = λ · f). Işık ve tüm elektromanyetik dalgalar boşlukta c = 299.792.458 m/s hızla ilerlediği için <strong>λ = c ÷ f</strong> yazılır; frekans iki katına çıkarsa dalga boyu yarıya iner. 100 MHz'lik bir radyo yayınının dalga boyu yaklaşık 3 metre, 2,4 GHz Wi-Fi'nin 12,5 cm, yeşil ışığın 550 nanometredir. Bu sayfada formülü, birim çevirilerini, elektromanyetik spektrumu, foton enerjisini ve anten boyu hesabını çözümlü örneklerle bulacaksınız.",
  kisaCevap: [
    "Dalga denklemi: v = λ · f; dalga boyu λ = v ÷ f, frekans f = v ÷ λ.",
    "Elektromanyetik dalgalar boşlukta c = 299.792.458 m/s (yaklaşık 3 × 10<sup>8</sup> m/s) hızla ilerler; ses havada 20 °C'de yaklaşık 343 m/s hızla yayılır.",
    "Frekansın birimi hertz'dir (Hz) ve saniyedeki titreşim sayısını gösterir; periyot T = 1 ÷ f.",
    "1 kHz = 10<sup>3</sup> Hz, 1 MHz = 10<sup>6</sup> Hz, 1 GHz = 10<sup>9</sup> Hz, 1 THz = 10<sup>12</sup> Hz.",
    "Görünür ışık yaklaşık 380 nm (mor) ile 750 nm (kırmızı) arasındadır.",
    "Foton enerjisi E = h · f = h · c ÷ λ; pratik formül E (eV) ≈ 1.240 ÷ λ (nm)."
  ],
  figure: {
    alt: "Üstte bir dalganın dalga boyu ve genliği gösteriliyor. Altta elektromanyetik spektrum şeridi: radyo, mikrodalga, kızılötesi, görünür ışık, morötesi, X ışınları ve gama ışınları; soldan sağa dalga boyu kısalıp frekans ve foton enerjisi artıyor. Örnekler: FM radyo 3 m, Wi-Fi 12,5 cm, yeşil ışık 550 nm.",
    caption: "Spektrumda sola gittikçe dalga boyu uzar, sağa gittikçe frekans ve foton enerjisi artar. Tüm bu dalgalar boşlukta aynı hızla ilerler; aralarındaki tek fark dalga boyu ve frekanstır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Dalga boyu, frekans ve spektrum</text>
  <line x1="40" y1="110" x2="680" y2="110" class="sb dash" fill="none"/>
  <path d="M40 110 Q80 50 120 110 T200 110 T280 110 T360 110 T440 110 T520 110 T600 110 T680 110" class="sp sw" fill="none"/>
  <line x1="80" y1="58" x2="240" y2="58" class="st" fill="none"/>
  <line x1="80" y1="52" x2="80" y2="64" class="st" fill="none"/><line x1="240" y1="52" x2="240" y2="64" class="st" fill="none"/>
  <text x="160" y="50" class="mid b">λ (dalga boyu)</text>
  <line x1="420" y1="110" x2="420" y2="80" class="sa sw" fill="none"/>
  <text x="430" y="92" class="sm">genlik</text>
  <rect x="470" y="128" width="210" height="34" rx="6" class="ps"/>
  <text x="575" y="150" class="sm mid b">v = λ · f  →  λ = c ÷ f</text>
  <g>
    <rect x="20" y="190" width="150" height="56" class="ps"/>
    <rect x="170" y="190" width="110" height="56" class="sf sb"/>
    <rect x="280" y="190" width="100" height="56" class="dgs"/>
    <rect x="380" y="190" width="18" height="56" class="dg"/><rect x="398" y="190" width="18" height="56" class="y"/>
    <rect x="416" y="190" width="18" height="56" class="ok"/><rect x="434" y="190" width="18" height="56" class="c"/>
    <rect x="452" y="190" width="18" height="56" class="m"/>
    <rect x="470" y="190" width="80" height="56" class="oks"/>
    <rect x="550" y="190" width="70" height="56" class="sf sb"/>
    <rect x="620" y="190" width="80" height="56" class="p"/>
  </g>
  <g class="sm mid b">
    <text x="95" y="223">Radyo</text><text x="225" y="223">Mikrodalga</text><text x="330" y="223">Kızılötesi</text>
    <text x="425" y="264">Görünür</text><text x="510" y="223">Morötesi</text><text x="585" y="223">X ışını</text><text x="660" y="223" class="sf">Gama</text>
  </g>
  <g class="sm mid t2">
    <text x="95" y="284">1 m'den uzun</text><text x="225" y="284">1 mm – 1 m</text><text x="330" y="284">750 nm – 1 mm</text>
    <text x="425" y="284">380–750 nm</text><text x="510" y="284">10–380 nm</text><text x="585" y="284">0,01–10 nm</text><text x="660" y="284">0,01 nm altı</text>
  </g>
  <line x1="40" y1="306" x2="680" y2="306" class="st" fill="none"/>
  <polygon points="680,300 692,306 680,312" class="t"/>
  <text x="360" y="326" class="sm mid">frekans ve foton enerjisi artar →</text>
  <rect x="20" y="340" width="680" height="64" rx="8" class="sf sb"/>
  <text x="36" y="364" class="sm b">FM 100 MHz → 3,00 m · Wi-Fi 2,4 GHz → 12,5 cm · Mikrodalga fırın 2,45 GHz → 12,2 cm</text>
  <text x="36" y="390" class="sm b">Yeşil ışık 550 nm → 5,45 × 10<tspan class="sm">14</tspan> Hz, 2,25 eV · Ses 440 Hz → 78 cm (343 m/s)</text>
</svg>`
  },
  sections: [
    {
      h: "Dalga boyu ve frekans nedir?",
      p: [
        "Dalga, bir titreşimin ortam ya da boşluk içinde yayılmasıdır. Su yüzeyindeki halkalar, gitar telinin sesi, radyo yayını ve ışık birer dalgadır. Her dalganın iki temel ölçüsü vardır. <strong>Dalga boyu</strong> (λ, \"lambda\"), dalganın tekrar eden kalıbının uzunluğudur: iki tepe ya da iki çukur arasındaki mesafe. Metre ve katlarıyla (km, cm, mm, µm, nm) ölçülür.",
        "<strong>Frekans</strong> (f), belirli bir noktadan saniyede kaç dalga geçtiğini, yani saniyedeki titreşim sayısını gösterir. Birimi Alman fizikçi Heinrich Hertz'in adını taşıyan hertz'dir (Hz); 1 Hz saniyede bir titreşim demektir. Frekansın tersi <strong>periyottur</strong> (T = 1 ÷ f): bir tam titreşimin süresi. 50 Hz'lik şebeke akımının periyodu 0,02 saniye, 100 MHz'lik bir radyo dalgasının periyodu 10 nanosaniyedir."
      ]
    },
    {
      h: "Dalga boyu ile frekans arasındaki ilişki: v = λ · f",
      p: [
        "Bir periyot süresince dalga tam bir dalga boyu kadar ilerler. Hız = yol ÷ zaman olduğundan dalganın hızı v = λ ÷ T, periyodun tersi frekans olduğu için de <strong>v = λ · f</strong> bulunur. Aynı ortamda dalga hızı sabit olduğundan dalga boyu ile frekans <strong>ters orantılıdır</strong>: biri artarken diğeri aynı oranda azalır."
      ],
      formula: "v = λ · f\nλ = v ÷ f   ·   f = v ÷ λ   ·   T = 1 ÷ f\nBoşlukta ışık: c = 299.792.458 m/s ≈ 3,00 × 10^8 m/s\nHavada ses (20 °C): yaklaşık 343 m/s",
      after: [
        "Işık hızı c, 1983'ten beri metrenin tanımında kullanıldığı için tam ve kesin bir sayıdır: 299.792.458 m/s. Okul sorularında genellikle 3 × 10<sup>8</sup> m/s alınır. Ses ise maddesel bir dalgadır ve hızı ortama bağlıdır: havada 20 °C'de yaklaşık 343 m/s, suda yaklaşık 1.480 m/s, çelikte 5.000 m/s'nin üzerindedir. Hız, yol ve zaman arasındaki temel ilişki için [[bilgi:hiz-yol-zaman-formulu|hız, yol, zaman formülü]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Dalga boyu nasıl hesaplanır? Çözümlü örnekler",
      ol: [
        "<strong>FM radyo:</strong> 100 MHz = 100 × 10<sup>6</sup> Hz. λ = 299.792.458 ÷ 100.000.000 = 2,998 m, yaklaşık 3 metre.",
        "<strong>Wi-Fi:</strong> 2,4 GHz = 2,4 × 10<sup>9</sup> Hz. λ = 299.792.458 ÷ 2.400.000.000 = 0,1249 m = 12,49 cm. 5 GHz bandında λ = 5,996 cm'dir; dalga boyu kısa olduğu için 5 GHz duvarlardan daha zor geçer.",
        "<strong>Mobil şebeke:</strong> 900 MHz için λ = 0,333 m = 33,3 cm.",
        "<strong>Ses:</strong> Diyapazonun 440 Hz'lik la notası havada λ = 343 ÷ 440 = 0,78 m dalga boyu oluşturur.",
        "<strong>Frekans bulma:</strong> Dalga boyu 550 nm olan yeşil ışığın frekansı f = 299.792.458 ÷ (550 × 10<sup>−9</sup>) = 5,45 × 10<sup>14</sup> Hz, yani 545 THz'dir.",
        "<strong>Hız bulma:</strong> Bir ip üzerindeki dalganın dalga boyu 0,5 m, frekansı 8 Hz ise hızı v = 0,5 × 8 = 4 m/s'dir."
      ],
      after: [
        "Bu hesapları [[arac:dalga-boyu-frekans-hesapla|Dalga Boyu Frekans Hesaplama]] aracı ışık, ses ya da kendi gireceğiniz hız için yapar ve sonucu en uygun birimde (km, m, cm, mm, µm, nm) gösterir. Hesap yaparken en sık hata birim çevirisinde yapılır: MHz ve GHz'i hertz'e, nanometreyi metreye çevirmeden formüle koymayın."
      ]
    },
    {
      h: "Frekans birimi hertz ve MHz–GHz çevirisi",
      p: [
        "Frekans birimleri SI önekleriyle bin katlar hâlinde büyür. Radyo ve televizyon yayınları genellikle kHz ve MHz, Wi-Fi, mobil şebekeler ve mikrodalga fırınlar GHz, ışık ise THz düzeyindedir. İşlemcilerin saat hızı da aynı birimle, GHz cinsinden ifade edilir."
      ],
      table: {
        head: ["Birim", "Hertz karşılığı", "Periyot", "Örnek"],
        rows: [
          ["1 Hz", "1", "1 s", "Sakin kalp atımına yakın"],
          ["1 kHz", "10<sup>3</sup>", "1 ms", "İnsan sesinin önemli bir bileşeni"],
          ["1 MHz", "10<sup>6</sup>", "1 µs", "Orta dalga (AM) radyo, λ ≈ 300 m"],
          ["100 MHz", "10<sup>8</sup>", "10 ns", "FM radyo, λ ≈ 3 m"],
          ["1 GHz", "10<sup>9</sup>", "1 ns", "Mobil şebeke bantları, λ ≈ 30 cm"],
          ["1 THz", "10<sup>12</sup>", "1 ps", "Uzak kızılötesi sınırı, λ ≈ 0,3 mm"]
        ],
        caption: "ms milisaniye, µs mikrosaniye, ns nanosaniye, ps pikosaniyedir. Çeviri için her basamakta 1.000 ile çarpar ya da bölersiniz."
      },
      after: [
        "Birimler arasında hızlıca geçmek için [[arac:hertz-kilohertz-cevir|Hertz Kilohertz Megahertz Çevirici]] periyodu ve boşluktaki dalga boyunu da birlikte gösterir. Önekler, veri birimlerindeki kilo, mega, giga öneklerinin aynısıdır; ancak frekansta 1.024 tabanı hiçbir zaman kullanılmaz."
      ]
    },
    {
      h: "Elektromanyetik spektrum hangi dalgalardan oluşur?",
      p: [
        "Radyo dalgaları, mikrodalgalar, kızılötesi, görünür ışık, morötesi, X ışınları ve gama ışınları aynı fiziksel olgunun, yani elektromanyetik dalganın farklı frekanslardaki hâlleridir. Hepsi boşlukta ışık hızıyla ilerler. Bölgeler arasındaki sınırlar kesin çizgiler değildir; kaynaklarda birkaç farklı sınır değeri görebilirsiniz."
      ],
      table: {
        head: ["Bölge", "Dalga boyu (yaklaşık)", "Frekans (yaklaşık)", "Kullanım"],
        rows: [
          ["Radyo", "1 m'den uzun", "300 MHz'in altı", "Radyo, televizyon, telsiz"],
          ["Mikrodalga", "1 mm – 1 m", "300 MHz – 300 GHz", "Wi-Fi, mobil şebeke, radar, mikrodalga fırın"],
          ["Kızılötesi", "750 nm – 1 mm", "300 GHz – 400 THz", "Uzaktan kumanda, termal kamera, ısıtıcılar"],
          ["Görünür ışık", "380 – 750 nm", "400 – 790 THz", "Görme, aydınlatma, fotoğraf"],
          ["Morötesi (UV)", "10 – 380 nm", "790 THz – 30 PHz", "Güneş yanığı, sterilizasyon, floresan"],
          ["X ışınları", "0,01 – 10 nm", "30 PHz – 30 EHz", "Röntgen, güvenlik taraması"],
          ["Gama ışınları", "0,01 nm'nin altı", "30 EHz'in üzeri", "Radyoaktif bozunma, tıbbi tedavi"]
        ],
        caption: "PHz petahertz (10<sup>15</sup> Hz), EHz eksahertz (10<sup>18</sup> Hz) demektir."
      },
      after: [
        "Görünür ışık içinde renkler de dalga boyuna göre sıralanır: yaklaşık 380–450 nm mor, 450–495 nm mavi, 495–570 nm yeşil, 570–590 nm sarı, 590–620 nm turuncu, 620–750 nm kırmızıdır. Gökkuşağındaki renk sırası bu dalga boylarının sırasıdır. Uzay ölçeklerinde ışığın aldığı yolu anlatan [[bilgi:isik-yili-nedir-kac-km|ışık yılı]] da aynı c sabitine dayanır."
      ]
    },
    {
      h: "Foton enerjisi nasıl hesaplanır?",
      p: [
        "Işık dalga gibi davrandığı kadar, foton adı verilen enerji paketleri gibi de davranır. Bir fotonun enerjisi frekansıyla doğru, dalga boyuyla ters orantılıdır. Orantı katsayısı Planck sabitidir: h = 6,62607015 × 10<sup>−34</sup> J·s. Enerji atomik ölçekte çok küçük olduğu için genellikle elektronvolt (eV) birimi kullanılır; 1 eV = 1,602176634 × 10<sup>−19</sup> J'dür."
      ],
      formula: "E = h · f = h · c ÷ λ\nPratik formül: E (eV) ≈ 1.239,84 ÷ λ (nm)",
      ol: [
        "<strong>Yeşil ışık, 550 nm:</strong> E = 1.239,84 ÷ 550 = 2,254 eV. Joule cinsinden 2,254 × 1,602 × 10<sup>−19</sup> = 3,61 × 10<sup>−19</sup> J.",
        "<strong>Kırmızı ışık, 700 nm:</strong> E = 1.239,84 ÷ 700 = 1,771 eV; frekansı 4,28 × 10<sup>14</sup> Hz.",
        "<strong>Mor ışık, 400 nm:</strong> E = 1.239,84 ÷ 400 = 3,10 eV. Mor foton kırmızı fotondan yaklaşık %75 daha enerjiktir.",
        "<strong>Wi-Fi fotonu, 2,4 GHz:</strong> E = h · f = 6,626 × 10<sup>−34</sup> × 2,4 × 10<sup>9</sup> = 1,59 × 10<sup>−24</sup> J ≈ 0,00001 eV."
      ],
      after: [
        "Bu karşılaştırma önemli bir noktayı açıklar: morötesi, X ve gama ışınlarının fotonları molekül bağlarını koparacak ya da atomları iyonlaştıracak kadar enerjiktir; radyo ve mikrodalga fotonları ise milyonlarca kat daha düşük enerjilidir. Fotoelektrik olay ve güneş panelleri de foton enerjisinin bir eşik değeri aşmasına dayanır. Hesap için [[arac:foton-enerjisi-hesapla|Foton Enerjisi Hesaplama]] aracı dalga boyu ya da frekanstan enerjiyi eV ve joule olarak verir, ışığın spektrumdaki bölgesini de gösterir."
      ]
    },
    {
      h: "Radyo anteni boyu frekansa göre nasıl seçilir?",
      p: [
        "Bir anten, boyu dalga boyuyla belirli bir orana sahip olduğunda en verimli çalışır. En yaygın iki tasarım <strong>yarım dalga dipol</strong> (toplam uzunluk λ ÷ 2) ve <strong>çeyrek dalga</strong> (λ ÷ 4, genellikle bir toprak düzlemi üzerinde) antendir. Gerçek antenlerde iletkenin kalınlığı ve uç etkileri nedeniyle fiziksel boy, teorik boydan biraz kısa tutulur; bu düzeltmeye kısalma katsayısı denir ve tel antenlerde genellikle 0,95 civarında alınır."
      ],
      ol: [
        "<strong>Frekans:</strong> 145 MHz (amatör telsiz 2 metre bandı).",
        "<strong>Dalga boyu:</strong> λ = 299.792.458 ÷ 145.000.000 = 2,0675 m.",
        "<strong>Yarım dalga dipol:</strong> 2,0675 ÷ 2 × 0,95 = 0,982 m toplam uzunluk; her kol yaklaşık 49,1 cm.",
        "<strong>Çeyrek dalga:</strong> 2,0675 ÷ 4 × 0,95 = 0,491 m."
      ],
      after: [
        "Son ayar her zaman bir ölçüm cihazıyla (duran dalga oranı ölçümü) yapılır; çevredeki metal yüzeyler ve montaj yüksekliği rezonans frekansını kaydırabilir. [[arac:anten-boyu-hesapla|Anten Boyu ve Dalga Boyu Hesaplama]] aracı kısalma katsayısını değiştirmenize izin verir ve yarım dalga, çeyrek dalga ve 5/8 dalga boylarını birlikte listeler. Verici kullanımı ve frekans tahsisi yasal düzenlemelere tabidir; amatör telsizcilik için Bilgi Teknolojileri ve İletişim Kurumu'nun kurallarını izleyin."
      ]
    },
    {
      h: "Dalga farklı bir ortama geçince ne değişir?",
      p: [
        "Bir dalga bir ortamdan diğerine geçtiğinde <strong>frekansı değişmez</strong>, çünkü frekansı kaynak belirler. Değişen, dalganın hızıdır; hız değişince dalga boyu da aynı oranda değişir. Işık camda, boşluktaki hızının yaklaşık 1 ÷ 1,5'i kadar, yani yaklaşık 2 × 10<sup>8</sup> m/s hızla ilerler. Boşlukta 550 nm olan yeşil ışığın camdaki dalga boyu 550 ÷ 1,5 ≈ 367 nm'ye düşer, ama rengi (frekansı) aynı kalır.",
        "Ses için de aynı kural geçerlidir: 440 Hz'lik bir ses havada 78 cm, suda yaklaşık 1.480 ÷ 440 = 3,36 m dalga boyuna sahiptir. Işığın kırılması, merceklerin çalışması ve havuz dibinin olduğundan sığ görünmesi bu hız değişiminin sonucudur."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Önek çevirmeyi unutmak:</strong> 2,4 GHz'i 2,4 olarak formüle koymak sonucu milyar kat yanlış çıkarır; önce 2,4 × 10<sup>9</sup> Hz yazın.",
        "<strong>Nanometreyi metreye çevirmemek:</strong> 550 nm = 550 × 10<sup>−9</sup> m = 5,5 × 10<sup>−7</sup> m.",
        "<strong>Ses için ışık hızını kullanmak:</strong> Ses elektromanyetik değil mekanik bir dalgadır; havada 343 m/s alınır.",
        "<strong>Frekansın ortamla değiştiğini sanmak:</strong> Ortam değişince hız ve dalga boyu değişir, frekans aynı kalır.",
        "<strong>Enerjiyi dalga boyuyla doğru orantılı sanmak:</strong> Dalga boyu uzadıkça foton enerjisi azalır; kırmızı ışık mavi ışıktan daha düşük enerjilidir."
      ]
    }
  ],
  faq: [
    ["Dalga boyu ile frekans arasındaki ilişki nedir?", "Dalga boyu ile frekans ters orantılıdır ve çarpımları dalganın hızını verir: v = λ · f. Aynı ortamda hız sabit olduğu için frekans iki katına çıkarsa dalga boyu yarıya iner. Işık için bu ilişki c = λ · f biçiminde yazılır."],
    ["Dalga boyu nasıl hesaplanır?", "Dalga boyu, dalganın hızının frekansa bölünmesiyle bulunur: λ = v ÷ f. Işık ve radyo dalgaları için hız 299.792.458 m/s alınır. Örneğin 100 MHz'lik bir FM yayınının dalga boyu 299.792.458 ÷ 100.000.000 = yaklaşık 3 metredir."],
    ["Frekans birimi Hertz ne demek?", "Hertz, saniyedeki titreşim ya da dalga sayısını gösteren frekans birimidir; 1 Hz saniyede bir titreşim demektir. Katları kilohertz (bin), megahertz (milyon), gigahertz (milyar) ve terahertz (trilyon) olarak bin katlar hâlinde büyür."],
    ["Elektromanyetik spektrum hangi dalgalardan oluşur?", "Elektromanyetik spektrum, dalga boyu uzundan kısaya doğru radyo dalgaları, mikrodalgalar, kızılötesi, görünür ışık, morötesi, X ışınları ve gama ışınlarından oluşur. Hepsi boşlukta ışık hızıyla ilerler; farkları frekans, dalga boyu ve foton enerjisidir."],
    ["Foton enerjisi nasıl hesaplanır?", "Foton enerjisi E = h · f ya da E = h · c ÷ λ formülüyle bulunur; h Planck sabitidir. Pratikte E (eV) ≈ 1.240 ÷ dalga boyu (nm) formülü kullanılır. Örneğin 550 nanometrelik yeşil ışığın fotonu yaklaşık 2,25 elektronvolt enerjiye sahiptir."],
    ["Radyo anteni boyu frekansa göre nasıl seçilir?", "Önce λ = c ÷ f ile dalga boyu bulunur. Yarım dalga dipol için toplam uzunluk λ ÷ 2, çeyrek dalga anten için λ ÷ 4 alınır ve tel antenlerde yaklaşık 0,95 kısalma katsayısıyla çarpılır. 145 MHz için yarım dalga dipol yaklaşık 98 cm olur."],
    ["Görünür ışığın dalga boyu aralığı nedir?", "Görünür ışık yaklaşık 380 nanometre ile 750 nanometre arasındadır. Kısa dalga boyları mor ve mavi, orta dalga boyları yeşil ve sarı, uzun dalga boyları turuncu ve kırmızı olarak görülür. Kaynaklara göre sınırlar birkaç on nanometre farklı verilebilir."],
    ["MHz ve GHz nasıl çevrilir?", "1 GHz 1.000 MHz'e, 1 MHz 1.000 kHz'e ve 1 kHz 1.000 Hz'e eşittir. GHz'den MHz'e geçmek için 1.000 ile çarpılır, MHz'den GHz'e geçmek için 1.000'e bölünür. Örneğin 2,4 GHz 2.400 MHz, 900 MHz ise 0,9 GHz eder."],
    ["Ses dalgasının dalga boyu nasıl bulunur?", "Ses dalgasının dalga boyu, sesin ortamdaki hızının frekansa bölünmesiyle bulunur. Havada 20 °C'de ses hızı yaklaşık 343 m/s olduğu için 440 Hz'lik la notası yaklaşık 78 cm, 20 Hz'lik en pes duyulabilir ses ise yaklaşık 17 m dalga boyuna sahiptir."]
  ],
  tools: ["dalga-boyu-frekans-hesapla", "hertz-kilohertz-cevir", "foton-enerjisi-hesapla", "anten-boyu-hesapla"],
  related: ["isik-yili-nedir-kac-km", "hiz-yol-zaman-formulu", "kinetik-ve-potansiyel-enerji"],
  sources: [
    ["BIPM – SI tanımı: ışık hızı ve Planck sabiti", "https://www.bipm.org/en/measurement-units"],
    ["Bilgi Teknolojileri ve İletişim Kurumu – frekans yönetimi", "https://www.btk.gov.tr/"]
  ]
};
