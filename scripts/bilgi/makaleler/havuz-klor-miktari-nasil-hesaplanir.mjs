export default {
  slug: "havuz-klor-miktari-nasil-hesaplanir",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Havuza Ne Kadar Klor Atılır? ppm Değeri, pH Dengesi ve Hacim Hesabı",
  pageTitle: "Havuza Ne Kadar Klor Atılır? ppm, pH ve Hacim Hesabı",
  description: "Havuza atılacak klor; hacim (m³) × istenen ppm artışı ÷ ürünün aktif klor oranı ile bulunur. Serbest klor 1–3 ppm, pH 7,2–7,6. Şok klorlama, yeşil su ve güvenlik.",
  keywords: ["havuz klor miktarı", "havuza ne kadar klor atılır", "havuz klor ppm", "havuz ph değeri", "şok klorlama", "havuz suyu yeşillendi", "havuz kimyasal hesabı", "havuz hacmi hesaplama"],
  lead: "Havuza atılacak klor miktarı üç bilgiyle hesaplanır: havuzun hacmi (m³), serbest klorda istediğiniz artış (ppm) ve kullandığınız ürünün aktif klor oranı. Formül <strong>ürün (g) = hacim (m³) × ppm artışı ÷ aktif klor oranı</strong>'dır, çünkü 1 ppm 1 m³ suda 1 gram demektir. Ev havuzlarında serbest klor genellikle 1–3 ppm, pH 7,2–7,6 aralığında tutulur. 48 m³'lük bir havuzda klor 0,5'ten 2 ppm'e çıkarılacaksa %65 aktif klorlu üründen yaklaşık 111 gram gerekir. Kesin doz için her zaman ürün etiketine uyun; kimyasalları asla birbiriyle karıştırmayın.",
  kisaCevap: [
    "1 ppm = 1 m³ suda 1 g = 1 mg/L; hacmi doğru bilmeden doz hesaplanamaz.",
    "Gereken ürün (g) = hacim (m³) × ppm artışı ÷ aktif klor oranı (ondalık).",
    "Ev havuzlarında serbest klor için yaygın hedef 1–3 ppm, pH için 7,2–7,6'dır; önce pH ayarlanır.",
    "Şok klorlama yoğun kullanım, yağmur, yeşillenme ya da bulanıklıkta yapılır; dozu ürün etiketi belirler.",
    "Klor attıktan sonra havuza girmek için serbest klorun hedef aralığa döndüğünü test kitiyle doğrulayın.",
    "Farklı kimyasalları, özellikle klorlu ürünlerle asitleri asla karıştırmayın; zehirli gaz ve yangın riski vardır."
  ],
  figure: {
    alt: "Havuz klor hesabı akışı: 8 metre çarpı 4 metre çarpı 1,5 metre ortalama derinlik 48 metreküp; 1,5 ppm artış için 72 gram aktif klor; yüzde 65 aktif ürün ile 111 gram. Altta pH ve serbest klor hedef bantları.",
    caption: "Örnek hesap: 48 m³ havuzda serbest kloru 0,5'ten 2,0 ppm'e çıkarmak. Ürün oranı ambalajdaki aktif madde bilgisinden alınır; burada %65 örnek olarak kullanılmıştır. Bantlar ev havuzları için yaygın hedeflerdir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Klor dozu: 3 adımda hesap</text>
  <rect x="20" y="52" width="210" height="110" rx="10" class="sf sb"/>
  <text x="125" y="78" class="sm mid mu">1) Hacim</text>
  <text x="125" y="108" class="xl mid">48 m³</text>
  <text x="125" y="136" class="sm mid t2">8 × 4 × 1,5 m ortalama</text>
  <text x="248" y="112" class="b mid p">×</text>
  <rect x="266" y="52" width="210" height="110" rx="10" class="sf sb"/>
  <text x="371" y="78" class="sm mid mu">2) Artış</text>
  <text x="371" y="108" class="xl mid">1,5 ppm</text>
  <text x="371" y="136" class="sm mid t2">0,5 → 2,0 · = 72 g aktif</text>
  <text x="494" y="112" class="b mid p">÷</text>
  <rect x="512" y="52" width="188" height="110" rx="10" class="p"/>
  <text x="606" y="78" class="sm mid sf">3) %65 ürün</text>
  <text x="606" y="108" class="xl mid sf">≈ 111 g</text>
  <text x="606" y="136" class="sm mid sf">72 ÷ 0,65</text>
  <text x="40" y="200" class="b">pH</text>
  <rect x="100" y="184" width="200" height="28" class="dgs"/>
  <rect x="300" y="184" width="160" height="28" class="oks"/>
  <rect x="460" y="184" width="200" height="28" class="dgs"/>
  <text x="200" y="203" class="sm mid">asidik: göz yakar</text>
  <text x="380" y="203" class="sm b mid">7,2–7,6</text>
  <text x="560" y="203" class="sm mid">bazik: klor zayıflar</text>
  <g class="sm mid"><text x="100" y="230">6,8</text><text x="300" y="230">7,2</text><text x="460" y="230">7,6</text><text x="660" y="230">8,0</text></g>
  <text x="40" y="270" class="b">Serbest klor</text>
  <rect x="140" y="254" width="100" height="28" class="dgs"/>
  <rect x="240" y="254" width="200" height="28" class="oks"/>
  <rect x="440" y="254" width="220" height="28" class="ps"/>
  <text x="190" y="273" class="sm mid">yetersiz</text>
  <text x="340" y="273" class="sm b mid">1–3 ppm</text>
  <text x="550" y="273" class="sm mid">yüksek: girmeyin</text>
  <g class="sm mid"><text x="140" y="300">0</text><text x="240" y="300">1</text><text x="440" y="300">3</text><text x="660" y="300">5+</text></g>
  <rect x="20" y="320" width="680" height="84" rx="10" class="dgs"/>
  <text x="40" y="346" class="b">Güvenlik</text>
  <text x="40" y="370" class="sm">Kimyasalları karıştırmayın · kimyasalı suya ekleyin, suyu kimyasala değil</text>
  <text x="40" y="392" class="sm">Eldiven ve gözlük · havuzda kimse yokken · etiketteki doz esastır</text>
</svg>`
  },
  sections: [
    {
      h: "Havuz hacmi nasıl hesaplanır?",
      p: [
        "Bütün kimyasal hesapların başlangıcı havuzun kaç metreküp su aldığıdır. Hacmi yanlış bilirseniz dozu da yanlış hesaplarsınız. Dikdörtgen havuzda uzunluk, genişlik ve <strong>ortalama derinlik</strong> çarpılır. Derinliği değişen havuzlarda sığ ve derin uçların ortalaması alınır: 1 m ile 2 m derinlikteki bir havuzun ortalama derinliği 1,5 m'dir."
      ],
      formula: "Dikdörtgen: hacim (m³) = uzunluk × genişlik × ortalama derinlik\nYuvarlak: hacim (m³) = 3,14 × yarıçap² × ortalama derinlik\n1 m³ = 1.000 litre = yaklaşık 1 ton su",
      table: {
        head: ["Havuz", "Ölçüler", "Hacim"],
        rows: [
          ["Dikdörtgen", "8 m × 4 m, derinlik 1–2 m (ort. 1,5)", "48 m³"],
          ["Dikdörtgen", "10 m × 5 m, ort. 1,4 m", "70 m³"],
          ["Yuvarlak", "Çap 4 m, derinlik 1,2 m", "≈ 15,1 m³"],
          ["Şişme / portatif", "Çap 3 m, su yüksekliği 0,7 m", "≈ 4,9 m³"]
        ],
        caption: "Derinlik olarak havuz duvarının değil suyun yüksekliği kullanılır."
      },
      after: [
        "Oval ve serbest biçimli havuzlar için [[arac:havuz-hacmi-hesapla|Havuz Hacmi Hesaplama]] aracını kullanabilirsiniz. Litre, metreküp ve ton arasındaki ilişki [[bilgi:su-deposu-kac-litre-havuz-kac-ton|su deposu kaç litre, havuz kaç ton]] yazısında ayrıntılı anlatılıyor."
      ]
    },
    {
      h: "Havuz suyunda serbest klor kaç ppm olmalı?",
      p: [
        "Havuz testlerinde iki klor değeri görülür. <strong>Serbest klor</strong> suyu dezenfekte etmeye hazır, aktif klordur. <strong>Bağlı klor</strong> (kloramin) ise terle, idrarla ve kozmetiklerle tepkimeye girmiş klordur; dezenfeksiyon gücü düşüktür ve havuzlara özgü keskin kokunun, göz yanmasının asıl nedenidir. Toplam klor bu ikisinin toplamıdır.",
        "Ev havuzlarında serbest klor için yaygın hedef <strong>1–3 ppm</strong>'dir. Dünya Sağlık Örgütü'nün yüzme havuzları için rehberi, genel kullanımdaki havuzlarda serbest klorun 3 mg/L'yi aşmamasını önerir. Kamuya açık havuzlar için Türkiye'de Sağlık Bakanlığı'nın yüzme havuzlarıyla ilgili yönetmeliği ayrıca sınır değerler belirler; site ve otel havuzlarının bu kurallara uyması gerekir. Bağlı klor yükseldiğinde şok klorlama gerekebilir."
      ],
      after: [
        "ppm kavramının ne olduğu ve mg/L ile ilişkisi [[bilgi:ppm-nedir-derisim-birimleri|ppm nedir]] yazısında, çözelti derişimini hesaplamak ise [[arac:ppm-hesapla|ppm Hesaplama]] aracında anlatılıyor."
      ]
    },
    {
      h: "Havuza ne kadar klor atılmalı? Formül ve örnek",
      p: [
        "1 ppm, 1 m³ (1.000 litre) suda 1 gram madde demektir. Bu yüzden serbest kloru 1 ppm artırmak için her metreküp suya 1 gram <strong>aktif klor</strong> gerekir. Ancak satılan ürünler saf klor değildir; ambalajda belirtilen aktif klor ya da aktif madde oranı kadar klor içerir. Doz bu oranla düzeltilir."
      ],
      formula: "Gereken aktif klor (g) = hacim (m³) × ppm artışı\nGereken ürün (g) = gereken aktif klor ÷ aktif klor oranı\nÖrnek: 48 × 1,5 = 72 g aktif klor → 72 ÷ 0,65 ≈ 111 g ürün",
      ol: [
        "Test kitiyle serbest kloru ve pH'ı ölçün. Örnek: serbest klor 0,5 ppm, pH 7,4.",
        "Hedef değeri belirleyin ve farkı bulun: 2,0 − 0,5 = 1,5 ppm.",
        "Hacimle çarpın: 48 m³ × 1,5 = 72 g aktif klor.",
        "Ürünün aktif klor oranına bölün. Ambalajda %65 yazıyorsa 72 ÷ 0,65 ≈ 111 g; %90 yazıyorsa 72 ÷ 0,90 = 80 g.",
        "Bulduğunuz miktarı ürün etiketindeki kullanım talimatıyla karşılaştırın. Etiket farklı bir yöntem ya da doz öneriyorsa etikete uyun.",
        "Ürünü etiketin tarif ettiği şekilde, filtre pompası çalışırken ve havuzda kimse yokken ekleyin; birkaç saat sonra yeniden ölçün."
      ],
      after: [
        "Tablet ürünler yavaş çözündüğü için yüzer dozaj kabında ya da skimmerde kullanılır ve günlük ihtiyacı karşılamaya yöneliktir; hızlı artış için genellikle granül ya da sıvı ürünler kullanılır. Hangi ürünün nasıl kullanılacağını ambalajdaki talimat belirler."
      ]
    },
    {
      h: "Havuz pH değeri kaç olmalı?",
      p: [
        "pH suyun asitlik ya da bazlık derecesidir. Havuz suyunda yaygın hedef <strong>7,2–7,6</strong>'dır; bu aralık insan gözünün pH'ına yakındır ve klorun etkili çalıştığı bölgededir. pH 7,8'in üzerine çıktığında klorun dezenfeksiyon gücü belirgin şekilde düşer, su bulanıklaşabilir ve kireç birikebilir. pH 7,0'ın altına indiğinde ise su göz ve cildi tahriş eder, metal parçaları aşındırır.",
        "Klor dozunu ayarlamadan önce pH'ı hedef aralığa getirmek gerekir; aksi hâlde eklediğiniz klorun önemli bir kısmı boşa gider. pH'ı düşürmek ve yükseltmek için ayrı ürünler kullanılır ve dozları ürün etiketinde yazar. pH kavramının matematiği [[bilgi:ph-nedir-nasil-hesaplanir|pH nedir]] yazısında, hesabı [[arac:ph-hesapla|pH Hesaplama]] aracında bulunur."
      ]
    },
    {
      h: "Şok klorlama ne zaman yapılır?",
      p: [
        "Şok klorlama, serbest kloru kısa süreliğine normal seviyenin birkaç katına çıkararak bağlı kloru parçalamak, algleri ve bakterileri yok etmek için yapılır. Şu durumlarda gerekebilir: sezon açılışı, yoğun kullanımdan sonra, şiddetli yağmur ya da fırtınadan sonra, su bulanıklaştığında, yeşillendiğinde ya da keskin klor kokusu belirginleştiğinde.",
        "Şok için gereken doz ürüne ve suyun durumuna göre değişir; bu nedenle mutlaka ürün etiketindeki şok dozu kullanılmalıdır. Hesap mantığı aynıdır: hedeflenen geçici artışı hacimle çarpıp aktif oranına bölersiniz. Örnek olarak 48 m³ havuzda 8 ppm'lik bir artış %65'lik üründen yaklaşık 590 gram gerektirir. Şok klorlama akşam saatlerinde yapılmalıdır, çünkü güneş ışığı kloru hızla parçalar."
      ]
    },
    {
      h: "Havuz suyu neden yeşillenir?",
      p: [
        "Yeşil su neredeyse her zaman <strong>alg</strong> çoğalmasının işaretidir. Algler, serbest klor düştüğünde, pH yükseldiğinde, filtre yeterince çalışmadığında ve sıcak, güneşli günlerde hızla çoğalır. Bakır içeren bazı kimyasallar ya da yüksek metal içeren su da şok sonrasında suyun yeşilimsi renk almasına yol açabilir; bu durumda sorun alg değil metaldir."
      ],
      ol: [
        "pH'ı ölçüp 7,2–7,6 aralığına getirin.",
        "Duvar ve tabanı fırçalayarak alglerin yüzeyden ayrılmasını sağlayın.",
        "Ürün etiketine göre şok klorlama yapın ve filtreyi kesintisiz çalıştırın.",
        "Filtreyi temizleyin ya da ters yıkama yapın; ölü algler filtreyi çabuk tıkar.",
        "Su berraklaşana ve serbest klor hedef aralığa dönene kadar havuza girmeyin.",
        "Sorun tekrar ediyorsa günlük klor seviyesini ve filtre çalışma süresini artırın."
      ]
    },
    {
      h: "Klor attıktan kaç saat sonra havuza girilir?",
      p: [
        "Sabit bir saat yoktur; belirleyici olan suyun ölçülen değeridir. Günlük bakım dozundan sonra ürün tamamen çözünüp su karıştığında ve serbest klor hedef aralıkta, pH 7,2–7,6 arasında olduğunda havuza girilebilir. Bu çoğu zaman birkaç saat sürer. Şok klorlamadan sonra ise serbest klorun yeniden 3 ppm'in altına inmesi genellikle 12–24 saat ya da daha uzun sürebilir.",
        "Ürün etiketinde yazan bekleme süresi her zaman esastır. Etiketin önerdiği süre dolmadan ve test kiti uygun değeri göstermeden havuza girmeyin, özellikle çocukları sokmayın. Su keskin kokuyor, gözleri yakıyor ya da renk değiştirmişse önce sebebini bulun."
      ]
    },
    {
      h: "Tuzlu su havuzu klorsuz mudur?",
      p: [
        "Hayır. Tuzlu su havuzlarında suya düşük oranda tuz eklenir ve bir elektroliz hücresi bu tuzdan klor üretir. Yani dezenfeksiyon yine klorla yapılır; fark, klorun torbadan değil cihazdan gelmesidir. Bu sistemlerde de serbest klor ve pH düzenli ölçülmelidir.",
        "Tuzlu su sistemleri klor seviyesini daha dengeli tutabilir ve bazı kullanıcılar suyu daha yumuşak bulur. Ancak cihazın bakımı, hücrenin temizliği ve tuz seviyesinin üreticinin önerdiği aralıkta tutulması gerekir. Şok ihtiyacı doğduğunda bu havuzlarda da ek klorlama yapılabilir."
      ]
    },
    {
      h: "Kimyasal güvenlik: mutlaka uyulması gerekenler",
      ul: [
        "<strong>Asla karıştırmayın:</strong> Farklı havuz kimyasallarını, özellikle klorlu ürünlerle asidik pH düşürücüleri ve farklı türdeki klorlu ürünleri birbirine karıştırmayın. Zehirli klor gazı, yangın ya da patlama oluşabilir.",
        "<strong>Kimyasalı suya ekleyin:</strong> Bir kovada çözmeniz gerekiyorsa önce suyu koyun, sonra ürünü yavaşça ekleyin; tersini yapmayın.",
        "<strong>Koruyucu donanım:</strong> Eldiven ve koruyucu gözlük kullanın, tozunu solumayın, rüzgâra karşı dökmeyin.",
        "<strong>Havuzda kimse yokken:</strong> Kimyasal eklerken ve etiketin belirttiği süre boyunca havuza girilmemelidir.",
        "<strong>Depolama:</strong> Ürünleri orijinal ambalajında, ağzı kapalı, serin, kuru ve havalandırmalı bir yerde, çocukların ve evcil hayvanların ulaşamayacağı şekilde, birbirinden ayrı saklayın.",
        "<strong>Kaza durumunda:</strong> Göze ya da cilde temasta bol suyla yıkayın; yutma ya da gaz solunması durumunda 114 Ulusal Zehir Danışma Merkezi'ni arayın ve ambalajı yanınızda bulundurun."
      ],
      after: [
        "Bu sayfadaki hesaplar dozu anlamanız için bir yöntemdir; ürünün etiketindeki kullanım talimatı ve güvenlik uyarıları her zaman önceliklidir. Site ve otel gibi kamuya açık havuzlarda su bakımı yetkili ve eğitimli kişilerce, ilgili yönetmeliğe uygun yapılmalıdır."
      ]
    }
  ],
  faq: [
    ["Havuza ne kadar klor atılmalı?", "Gereken ürün miktarı, havuz hacminin metreküp cinsinden istenen ppm artışıyla çarpılıp ürünün aktif klor oranına bölünmesiyle bulunur. 48 m³ havuzda 1,5 ppm artış için %65'lik üründen yaklaşık 111 g gerekir; ürün etiketindeki doz esastır."],
    ["Havuz suyunda serbest klor kaç ppm olmalı?", "Ev havuzlarında serbest klor için yaygın hedef 1–3 ppm'dir. Dünya Sağlık Örgütü genel kullanımdaki havuzlarda 3 mg/L'nin aşılmamasını önerir; kamuya açık havuzlarda Sağlık Bakanlığı yönetmeliğindeki sınırlar geçerlidir."],
    ["Havuz pH değeri kaç olmalı?", "Havuz suyunda pH için yaygın hedef 7,2–7,6'dır. pH 7,8'in üzerinde klor zayıflar ve su bulanıklaşabilir, 7,0'ın altında ise göz ve cilt tahriş olur. Klor dozundan önce pH ayarlanmalıdır."],
    ["Havuz hacmi nasıl hesaplanır?", "Dikdörtgen havuzda uzunluk, genişlik ve ortalama su derinliği çarpılır; yuvarlak havuzda 3,14 × yarıçap² × ortalama derinlik kullanılır. 8 × 4 m ve ortalama 1,5 m derinlikteki havuz 48 m³, yani 48.000 litredir."],
    ["Şok klorlama ne zaman yapılır?", "Sezon açılışında, yoğun kullanımdan ya da şiddetli yağmurdan sonra, su bulanıklaştığında, yeşillendiğinde veya keskin klor kokusu arttığında yapılır. Doz ürün etiketine göre belirlenir ve uygulama güneş ışığının az olduğu akşam saatlerinde yapılmalıdır."],
    ["Havuz suyu neden yeşillenir?", "Yeşil su genellikle düşük serbest klor, yüksek pH, yetersiz filtrasyon ve sıcak hava nedeniyle çoğalan alglerden kaynaklanır. pH ayarlanır, yüzeyler fırçalanır, etikete göre şok klorlama yapılır ve filtre kesintisiz çalıştırılır."],
    ["Klor attıktan kaç saat sonra havuza girilir?", "Sabit bir süre yoktur; ürün etiketindeki bekleme süresi dolmalı ve test kiti serbest kloru hedef aralıkta, pH'ı 7,2–7,6 arasında göstermelidir. Şok klorlamadan sonra bu süre genellikle 12–24 saat ya da daha uzundur."],
    ["Tuzlu su havuzu klorsuz mudur?", "Hayır. Tuzlu su havuzunda elektroliz cihazı suya eklenen tuzdan klor üretir; dezenfeksiyon yine klorla yapılır. Bu havuzlarda da serbest klor ve pH düzenli ölçülmeli, cihazın bakımı aksatılmamalıdır."],
    ["Havuz kimyasalları karıştırılabilir mi?", "Hayır. Klorlu ürünlerle asidik pH düşürücüler ya da farklı türdeki klorlu ürünler karıştırıldığında zehirli gaz, yangın ya da patlama oluşabilir. Her ürünü ayrı ayrı, etiketine göre ve suya ekleyerek kullanın."]
  ],
  tools: ["havuz-hacmi-hesapla", "ppm-hesapla", "ph-hesapla"],
  related: ["su-deposu-kac-litre-havuz-kac-ton", "ppm-nedir-derisim-birimleri", "ph-nedir-nasil-hesaplanir", "seyreltme-nasil-yapilir-m1v1-m2v2"],
  sources: [
    ["Dünya Sağlık Örgütü – Guidelines for safe recreational water environments", "https://www.who.int/"],
    ["T.C. Sağlık Bakanlığı – Yüzme havuzları sağlık esasları", "https://www.saglik.gov.tr/"],
    ["Ulusal Zehir Danışma Merkezi (114)", "https://hsgm.saglik.gov.tr/"]
  ],
  uyari: "kimyasal kullanımında ürün etiketi ve güvenlik bilgi formu esastır; kaza durumunda 114 Ulusal Zehir Danışma Merkezi'ni arayın"
};
