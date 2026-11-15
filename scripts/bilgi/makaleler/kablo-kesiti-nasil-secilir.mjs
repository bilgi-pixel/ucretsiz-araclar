export default {
  slug: "kablo-kesiti-nasil-secilir",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Kablo Kesiti Nasıl Seçilir? Kaç mm² Kablo Kaç Amper Taşır Tablosu",
  pageTitle: "Kablo Kesiti Nasıl Seçilir? Kaç mm² Kablo Kaç Amper Taşır",
  description: "Kablo kesiti iki ölçüte göre seçilir: akım taşıma kapasitesi ve gerilim düşümü; büyük çıkan kesit kullanılır. 1,5 ve 2,5 mm² tablosu, örnek hesap ve güvenlik notları.",
  keywords: ["kablo kesiti hesaplama", "kaç mm kablo kaç amper taşır", "2.5 mm kablo kaç watt", "kablo kesit tablosu", "gerilim düşümü hesaplama", "awg mm2 çevirme", "1.5 mm kablo kaç amper", "fırın için kaç mm kablo"],
  lead: "Kablo kesiti, <strong>yükün çektiği akımı güvenle taşıyabilecek (akım taşıma kapasitesi) ve hat sonunda gerilimi fazla düşürmeyecek (gerilim düşümü) en küçük standart kesit</strong> olarak seçilir; iki hesaptan hangisi büyük kesit veriyorsa o kullanılır ve kesit, hattı koruyan sigortayla uyumlu olmalıdır. Konutlarda aydınlatma için tipik olarak 1,5 mm², priz için 2,5 mm² kullanılır. Bu sayfada TS HD 60364 mantığına göre seçim adımlarını, örnek akım tablosunu ve çözümlü hesapları bulacaksınız. Elektrik tesisatı işlerini mutlaka yetkili elektrikçiye yaptırın.",
  kisaCevap: [
    "Akım: tek fazda I = P ÷ (U × cosφ); 3.000 W'lık bir fırın 230 V'ta yaklaşık 13 A çeker.",
    "Koruma uyumu: yük akımı ≤ sigorta anma akımı ≤ kablonun akım taşıma kapasitesi (I<sub>B</sub> ≤ I<sub>n</sub> ≤ I<sub>Z</sub>).",
    "Konutta tipik eşleşme: 1,5 mm² bakır kablo 10 A sigorta (aydınlatma), 2,5 mm² 16 A sigorta (priz), 4 mm² 20–25 A, 6 mm² 32 A.",
    "Gerilim düşümü (tek faz): ΔU = 2 × L × I × cosφ ÷ (κ × S); bakır için κ ≈ 56 m/(Ω·mm²).",
    "Uzun hatlarda belirleyici olan genellikle gerilim düşümüdür; 45 metrelik 16 A hatta 2,5 yerine 4 mm² gerekebilir.",
    "Akım taşıma değerleri döşeme şekli, ortam sıcaklığı ve yan yana kablo sayısına göre değişir; tablolar örnektir, proje için elektrik mühendisine danışın."
  ],
  figure: {
    alt: "Kablo kesiti seçim akışı: yükten akım hesaplanır, akım taşıma kapasitesi ve sigorta uyumundan bir kesit, gerilim düşümünden ikinci bir kesit bulunur, büyük olan seçilir. Örnek: 3.000 W fırın, 13 A, 20 metre hat, 2,5 mm² ve 16 A sigorta, gerilim düşümü yüzde 1,6.",
    caption: "İki ölçüt ayrı ayrı kontrol edilir. Kısa hatlarda genellikle akım taşıma kapasitesi, uzun hatlarda gerilim düşümü belirleyicidir. Örnekteki değerler bakır, PVC yalıtımlı, duvar içinde boruda döşenmiş kablo içindir.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 Z" class="p"/></marker></defs>
  <text x="360" y="30" class="lg b mid">Kablo kesiti seçim akışı</text>
  <rect x="250" y="48" width="220" height="56" rx="10" class="p"/>
  <text x="360" y="72" class="b mid sf">1. Yük akımı</text>
  <text x="360" y="93" class="sm mid sf">3.000 W ÷ 230 V = 13,0 A</text>
  <line x1="300" y1="104" x2="170" y2="138" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <line x1="420" y1="104" x2="550" y2="138" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <rect x="30" y="140" width="300" height="130" rx="10" class="sf sb"/>
  <text x="180" y="166" class="b mid">2a. Akım taşıma + sigorta</text>
  <text x="180" y="194" class="sm mid">13,0 A ≤ 16 A sigorta ≤ I<tspan class="sm">Z</tspan></text>
  <text x="180" y="218" class="sm mid">2,5 mm², boruda duvarda: 24 A</text>
  <text x="180" y="250" class="b mid ok">Uygun: 2,5 mm²</text>
  <rect x="390" y="140" width="300" height="130" rx="10" class="sf sb"/>
  <text x="540" y="166" class="b mid">2b. Gerilim düşümü</text>
  <text x="540" y="194" class="sm mid">2 × 20 m × 13,0 A ÷ (56 × 2,5)</text>
  <text x="540" y="218" class="sm mid">= 3,73 V → %1,62 (sınır %3)</text>
  <text x="540" y="250" class="b mid ok">Uygun: 2,5 mm²</text>
  <line x1="180" y1="270" x2="330" y2="306" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <line x1="540" y1="270" x2="390" y2="306" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <rect x="200" y="308" width="320" height="56" rx="10" class="oks"/>
  <text x="360" y="332" class="b mid">3. Büyük olan kesit seçilir</text>
  <text x="360" y="353" class="sm mid">Sonuç: 2,5 mm² bakır + 16 A sigorta</text>
  <rect x="30" y="380" width="660" height="44" rx="8" class="dgs"/>
  <text x="360" y="407" class="sm mid b">Uygulama ve kontrol yalnızca yetkili elektrikçi tarafından yapılmalıdır.</text>
</svg>`
  },
  sections: [
    {
      h: "Kablo kesiti nedir, neden önemlidir?",
      p: [
        "Kablo kesiti, iletkenin (genellikle bakır) dik kesit alanıdır ve milimetrekare (mm²) ile ifade edilir. \"2,5'luk kablo\" denildiğinde her bir damarın kesitinin 2,5 mm² olduğu kastedilir. Kesit büyüdükçe iletkenin direnci azalır; aynı akım daha az ısı üretir ve hat boyunca daha az gerilim kaybolur.",
        "Yetersiz kesit iki soruna yol açar. Birincisi aşırı ısınmadır: kablo yalıtımı zamanla yıpranır, uç bağlantılarda gevşeme ve kararma oluşur, en kötü durumda yangın çıkabilir. İkincisi gerilim düşümüdür: hat sonundaki cihaz düşük gerilimle çalışır, motorlu cihazlar zorlanır, aydınlatma titreyebilir. Doğru kesit seçimi bu yüzden bir verimlilik değil, öncelikle bir güvenlik konusudur."
      ],
      note: "Bu sayfa genel bilgi verir. Elektrik tesisatı kurmak, değiştirmek ya da sigorta değerini yükseltmek can ve mal güvenliğini doğrudan etkiler; bu işleri yalnızca yetkili ve ehliyetli elektrikçiler yapmalı, büyük güçlü ya da yeni tesisatlarda proje elektrik mühendisince hazırlanmalıdır."
    },
    {
      h: "Kablo kesiti nasıl seçilir? Üç adımlı yöntem",
      p: [
        "Türkiye'de alçak gerilim iç tesisatları, Elektrik İç Tesisleri Yönetmeliği ve kablo seçimi için uluslararası IEC 60364 serisinin ulusal karşılığı olan TS HD 60364 standartlarına göre tasarlanır. Bu standartların mantığı basittir: kesit hem ısınma hem gerilim düşümü açısından yeterli olmalı ve hattı koruyan sigorta, kabloyu aşırı akıma karşı gerçekten koruyabilmelidir."
      ],
      ol: [
        "<strong>Yük akımını bulun:</strong> Cihazın gücünü gerilime ve güç faktörüne bölün. Tek faz: I = P ÷ (U × cosφ). Üç faz: I = P ÷ (√3 × U × cosφ).",
        "<strong>Akım taşıma kapasitesini ve sigortayı kontrol edin:</strong> Kablonun döşeme şekline göre taşıyabileceği akım (I<sub>Z</sub>), sigortanın anma akımından (I<sub>n</sub>), o da yük akımından (I<sub>B</sub>) büyük ya da eşit olmalıdır.",
        "<strong>Gerilim düşümünü hesaplayın:</strong> Hat uzunluğu ve akımla gerilim düşümünü yüzde olarak bulun, izin verilen sınırı aşıyorsa kesiti büyütün.",
        "<strong>Büyük olanı seçin:</strong> İki ölçütten hangisi daha büyük kesit gerektiriyorsa o kesit kullanılır."
      ],
      formula: "Koruma koşulu: I<sub>B</sub> ≤ I<sub>n</sub> ≤ I<sub>Z</sub>\nTek faz akım: I = P ÷ (U × cosφ)\nÜç faz akım: I = P ÷ (√3 × U × cosφ)",
      after: [
        "Watt ile amper arasındaki dönüşümü tek faz ve üç faz için [[arac:amper-watt-cevir|Amper Watt Çevirici]] ile yapabilirsiniz. Akım, gerilim ve güç ilişkisinin temelleri [[bilgi:watt-amper-volt-iliskisi|watt, amper ve volt ilişkisi]] yazısında anlatılır."
      ]
    },
    {
      h: "Kaç mm² kablo kaç amper taşır? Örnek tablo",
      p: [
        "Bir kablonun taşıyabileceği akım tek bir sayı değildir; kablonun nasıl döşendiğine, ortam sıcaklığına, yalıtım malzemesine ve aynı boru içinde kaç devrenin birlikte gittiğine bağlıdır. Aşağıdaki tablo, TS HD 60364-5-52 standardındaki referans değerlere dayanan, 30 °C ortamda, PVC yalıtımlı bakır iletken ve iki yüklü damar için <strong>örnek</strong> değerler içerir."
      ],
      table: {
        head: ["Kesit (mm²)", "Isı yalıtımlı duvarda boruda (A1)", "Duvar üstü/içi boruda (B1)", "Duvara doğrudan tutturulmuş (C)", "Konutta tipik sigorta"],
        rows: [
          ["1,5", "14,5 A", "17,5 A", "19,5 A", "10 A"],
          ["2,5", "19,5 A", "24 A", "27 A", "16 A"],
          ["4", "26 A", "32 A", "36 A", "20–25 A"],
          ["6", "34 A", "41 A", "46 A", "32 A"],
          ["10", "46 A", "57 A", "63 A", "40–50 A"],
          ["16", "61 A", "76 A", "85 A", "63 A"]
        ],
        caption: "Örnek değerlerdir. Yüksek ortam sıcaklığı, aynı boruda birden fazla devre ve ısı yalıtımı içinden geçiş kapasiteyi düşürür; düzeltme katsayıları standartta verilir. Kesin seçim için elektrik mühendisine danışın."
      },
      after: [
        "Tablodaki \"tipik sigorta\" sütunu konut uygulamalarında sık görülen eşleşmeleri gösterir ve bilinçli olarak kablonun kapasitesinin altında tutulur. Örneğin 2,5 mm² kablo uygun koşulda 24 A taşıyabilse de priz hattı genellikle 16 A sigortayla korunur. Mevcut bir hattın sigortasını \"atıyor\" diye büyütmek, kabloyu korumasız bırakır ve yangın riskini artırır."
      ]
    },
    {
      h: "2,5 mm² kablo kaç watt taşır? 1,5 mm² nerede kullanılır?",
      p: [
        "Konutlarda pratik sınırı kablodan çok sigorta belirler. 16 A sigortayla korunan 2,5 mm²'lik bir priz hattından 230 V'ta en fazla yaklaşık 16 × 230 = <strong>3.680 W</strong> sürekli güç çekilebilir. 10 A sigortalı 1,5 mm²'lik bir hat için bu değer yaklaşık 2.300 W'tır. Bu toplam, aynı hatta bağlı bütün prizlerdeki cihazlar için geçerlidir."
      ],
      table: {
        head: ["Kullanım", "Tipik kesit", "Not"],
        rows: [
          ["Aydınlatma linyeleri", "1,5 mm²", "Genellikle 10 A sigorta"],
          ["Genel priz hatları", "2,5 mm²", "Genellikle 16 A sigorta, 30 mA kaçak akım koruması"],
          ["Çamaşır, bulaşık makinesi, fırın (ayrı hat)", "2,5 mm²", "Her büyük cihaz için ayrı linye önerilir"],
          ["Ankastre ocak (yüksek güçlü)", "4–6 mm² ya da üç faz", "Üretici kılavuzuna bakılmalı"],
          ["Split klima (konut tipi)", "2,5 mm²", "Güce ve hat uzunluğuna göre değişir"],
          ["Elektrikli şofben ve ani su ısıtıcı", "4–6 mm²", "Yüksek akım; mutlaka ayrı hat ve uygun sigorta"],
          ["Elektrikli araç şarj ünitesi", "Projeye göre", "Uzun süreli tam yük; mühendis hesabı gerekir"]
        ],
        caption: "Tipik uygulamalardır; cihazın etiketindeki güç, hat uzunluğu ve döşeme koşulu değerlendirilerek yetkili elektrikçi tarafından kesinleştirilmelidir."
      },
      after: [
        "Fırın ve klima için kaç mm² kablo gerektiği sorusunun cevabı, cihazın gücüne ve panodan uzaklığına bağlıdır. Etiket gücü 3.000 W'ı aşan ya da sürekli tam yükte çalışan cihazlar için ayrı bir hat çekilmesi ve kesitin hesapla doğrulanması gerekir."
      ]
    },
    {
      h: "Gerilim düşümü nedir, kablo uzunluğu kesiti nasıl etkiler?",
      p: [
        "Her iletkenin küçük de olsa bir direnci vardır ve akım bu dirençten geçerken gerilimin bir kısmı kablo üzerinde kaybolur. Buna gerilim düşümü denir. Düşüm kablo uzunluğu ve akımla doğru, kesitle ters orantılıdır: hat iki kat uzarsa düşüm de iki katına çıkar."
      ],
      formula: "Tek faz: ΔU = 2 × L × I × cosφ ÷ (κ × S)\nÜç faz: ΔU = √3 × L × I × cosφ ÷ (κ × S)\nΔU % = ΔU ÷ U × 100\nκ (iletkenlik): bakır ≈ 56, alüminyum ≈ 35 m/(Ω·mm²)",
      after: [
        "IEC 60364-5-52'nin bilgi ekinde, kamu şebekesinden beslenen tesislerde tüketici tarafında aydınlatma için %3, diğer kullanımlar için %5 gerilim düşümü önerilir. Ulusal yönetmelikler ve dağıtım şirketlerinin teknik şartları farklı ve daha sıkı sınırlar getirebilir; projede geçerli sınırı mutlaka kontrol edin.",
        "Çözümlü örnek: Bahçedeki bir depoya panodan 45 metre uzaklıkta, 16 A'lik bir hat çekilecek (cosφ = 1). 2,5 mm² ile ΔU = 2 × 45 × 16 ÷ (56 × 2,5) = 10,29 V, yani %4,47 olur. 4 mm² ile 6,43 V (%2,80), 6 mm² ile 4,29 V (%1,86) bulunur. %3 sınırı hedefleniyorsa en az 4 mm² seçilmelidir; oysa akım taşıma açısından 2,5 mm² yeterliydi. Bu örnek, uzun hatlarda belirleyici ölçütün gerilim düşümü olduğunu gösterir.",
        "Kendi değerlerinizle [[arac:gerilim-dusumu-hesapla|Gerilim Düşümü Hesaplama]] aracında düşümü, [[arac:kablo-kesiti-hesapla|Kablo Kesiti Hesaplama]] aracında ise gerilim düşümü ölçütüne göre gereken en küçük standart kesiti bulabilirsiniz. Araç yalnızca gerilim düşümüne bakar; akım taşıma kapasitesini yukarıdaki tabloyla ayrıca kontrol edin."
      ]
    },
    {
      h: "İnce kablo neden ısınır?",
      p: [
        "Kablodan geçen akım, iletkenin direncinde ısıya dönüşür ve bu kayıp akımın karesiyle artar: P = I² × R. İletkenin direnci ise uzunlukla doğru, kesitle ters orantılıdır: R = ρ × L ÷ S. Bakırın özdirenci yaklaşık 0,0178 Ω·mm²/m'dir."
      ],
      formula: "R = ρ × L ÷ S\nIsı kaybı P = I² × R",
      after: [
        "Örnek: Panodan 20 metre uzaklıktaki bir prize giden hatta gidiş ve dönüş iletkeni toplam 40 metredir. 1,5 mm² kesitte direnç 0,0178 × 40 ÷ 1,5 = 0,47 Ω; 16 A'de kablo boyunca yaklaşık 16² × 0,47 = 122 W ısı açığa çıkar. Aynı hat 2,5 mm² olsaydı direnç 0,28 Ω, ısı yaklaşık 73 W olurdu. Bu ısı duvar içinde, borunun dar hacminde dağılmak zorundadır; kesit küçüldükçe ve aynı boruda daha fazla kablo bulundukça sıcaklık hızla yükselir.",
        "Isınmanın bir diğer yaygın nedeni gevşek bağlantılardır. Klemens, priz ve anahtar bağlantılarındaki temas direnci, kablo kesiti doğru olsa bile yerel ısınmaya yol açar. Priz kapağında renk değişimi, yanık kokusu ya da ısınma fark ederseniz o hattı kullanmayı bırakıp yetkili elektrikçiye kontrol ettirin."
      ]
    },
    {
      h: "AWG kaç mm²'ye denk gelir?",
      p: [
        "AWG (American Wire Gauge), Kuzey Amerika'da kullanılan kablo numaralandırma sistemidir. Numara büyüdükçe kablo incelir. İthal cihazlarda, ses sistemlerinde, güneş paneli ve otomotiv kablolarında AWG ile sık karşılaşılır. AWG değerleri metrik standart kesitlerle birebir örtüşmez; bu yüzden karşılık seçerken bir üst metrik kesite gitmek güvenli yaklaşımdır."
      ],
      table: {
        head: ["AWG", "Kesit (mm²)", "En yakın büyük metrik kesit"],
        rows: [
          ["18", "0,82", "1 mm²"],
          ["16", "1,31", "1,5 mm²"],
          ["14", "2,08", "2,5 mm²"],
          ["12", "3,31", "4 mm²"],
          ["10", "5,26", "6 mm²"],
          ["8", "8,37", "10 mm²"]
        ]
      },
      after: [
        "Ara değerler ve tel çapı için [[arac:awg-mm2-cevir|AWG mm² Çevirici]] kullanılabilir."
      ]
    },
    {
      h: "Güvenlik uyarıları ve sık yapılan hatalar",
      ul: [
        "<strong>Sigortayı büyütmek:</strong> Sık atan 16 A sigortayı 25 A ile değiştirmek, 2,5 mm² kabloyu korumasız bırakır. Sorun aşırı yük ya da arızadır; kesit ve devre yeniden planlanmalıdır.",
        "<strong>Uzatma kablosuyla yüksek güç:</strong> Isıtıcı, fırın ya da klimayı ince kesitli uzatma kablosu veya çoklu prizle çalıştırmak, özellikle kablo makarada sarılıyken tehlikeli ısınmaya yol açar.",
        "<strong>Alüminyum ve bakırı doğrudan birleştirmek:</strong> Uygun ek malzemesi kullanılmadan yapılan birleşimler zamanla oksitlenir ve ısınır.",
        "<strong>Gerilim düşümünü unutmak:</strong> Bahçe, garaj ve müstakil ek binalara giden uzun hatlarda yalnızca akıma bakmak yetersiz kesite yol açar.",
        "<strong>Kaçak akım korumasını atlamak:</strong> Islak hacimler ve priz devreleri için 30 mA kaçak akım koruma cihazı can güvenliği açısından kritik önemdedir; topraklama ve kaçak akım korumasını yetkili elektrikçiye kontrol ettirin.",
        "<strong>Enerjili hatta çalışmak:</strong> Hiçbir bağlantıyı sigorta kapatılıp gerilimin olmadığı ölçü aletiyle doğrulanmadan ellemeyin."
      ],
      note: "Yeni tesisat, pano değişikliği, üç fazlı bağlantı, elektrikli araç şarj ünitesi ve güneş enerjisi sistemlerinde proje ve uygulama yetkili mühendis ve elektrikçilerce yapılmalı, gerekli belgeler alınmalıdır."
    }
  ],
  faq: [
    ["Kablo kesiti nasıl seçilir?", "Önce yükün çektiği akım bulunur, sonra döşeme şekline göre bu akımı taşıyabilen ve sigortayla uyumlu kesit belirlenir, ardından gerilim düşümü kontrol edilir. İki ölçütten büyük kesit veren seçilir; uygulamayı yetkili elektrikçi yapmalıdır."],
    ["2,5 mm² kablo kaç amper taşır?", "PVC yalıtımlı bakır 2,5 mm² kablo, 30 °C ortamda duvarda boru içinde yaklaşık 24 A, ısı yalıtımlı duvarda yaklaşık 19,5 A taşır. Konutlarda bu kesit genellikle 16 A sigortayla korunur; değerler örnektir."],
    ["1,5 mm² kablo nerede kullanılır?", "1,5 mm² bakır kablo konutlarda çoğunlukla aydınlatma linyelerinde kullanılır ve genellikle 10 A sigortayla korunur. Priz hatları ve yüksek güçlü cihazlar için yeterli kabul edilmez."],
    ["Fırın ve klima için kaç mm kablo gerekir?", "Konut tipi fırın, bulaşık makinesi ve split klimalarda genellikle ayrı hatta 2,5 mm² kullanılır. Yüksek güçlü ankastre ocak, şofben ve uzun hatlarda 4–6 mm² ya da üç faz gerekebilir; kesin karar için cihaz kılavuzu ve elektrikçi esas alınmalıdır."],
    ["Gerilim düşümü nedir?", "Akım kablonun direncinden geçerken gerilimin bir kısmının kablo üzerinde kaybolmasıdır. Uzun ve ince hatlarda düşüm büyür; hat sonundaki cihaz düşük gerilimle çalışır, motorlar zorlanır ve kablo üzerinde enerji kaybı artar."],
    ["Kablo uzunluğu kesit seçimini etkiler mi?", "Evet. Gerilim düşümü hat uzunluğuyla doğru orantılı olduğu için uzun hatlarda daha büyük kesit gerekir. Örneğin 45 metrelik 16 A'lik hatta yüzde 3 sınırı için 2,5 yerine en az 4 mm² kablo gerekir."],
    ["AWG kaç mm²'ye denk gelir?", "AWG 14 yaklaşık 2,08 mm², AWG 12 yaklaşık 3,31 mm², AWG 10 yaklaşık 5,26 mm²'dir. Metrik standart kesitlerle birebir örtüşmediği için seçim yaparken bir üst metrik kesite gitmek güvenli olur."],
    ["İnce kablo neden ısınır?", "Kablodaki ısı kaybı akımın karesi ile direncin çarpımına eşittir ve kesit küçüldükçe direnç artar. Bu yüzden aynı akım ince kabloda daha fazla ısı üretir; gevşek bağlantılar da yerel ısınmanın yaygın nedenidir."],
    ["Sigorta sık atıyorsa daha büyük sigorta takılabilir mi?", "Hayır. Sigorta kabloyu korumak için seçilir; büyütüldüğünde kablo aşırı akımda korumasız kalır ve yangın riski doğar. Sık atma aşırı yük ya da arıza işaretidir, yetkili elektrikçiye kontrol ettirilmelidir."]
  ],
  tools: ["kablo-kesiti-hesapla", "gerilim-dusumu-hesapla", "awg-mm2-cevir", "amper-watt-cevir"],
  related: ["watt-amper-volt-iliskisi", "ohm-kanunu-nedir", "elektrik-faturasi-nasil-hesaplanir", "ups-aku-kac-saat-gider"],
  uyari: "elektrik tesisatı projesi veya uygulama talimatı değildir; tablolardaki akım değerleri örnektir, tesisat işleri için yetkili elektrikçiye ve elektrik mühendisine danışın",
  sources: [
    ["Mevzuat Bilgi Sistemi – Elektrik İç Tesisleri Yönetmeliği", "https://www.mevzuat.gov.tr/"],
    ["Türk Standardları Enstitüsü – TS HD 60364 serisi", "https://www.tse.org.tr/"],
    ["IEC – IEC 60364 Alçak gerilim elektrik tesisleri", "https://www.iec.ch/"]
  ]
};
