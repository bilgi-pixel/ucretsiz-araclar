export default {
  slug: 'ev-tasima-koli-hesapla',
  title: 'Taşınma Koli Sayısı Hesaplama',
  h1Tail: 'ev taşırken kaç koli gerekir?',
  pageTitle: 'Taşınma Koli Sayısı Hesaplama – Ev Taşırken Kaç Koli Gerekir?',
  description: 'Evinizin oda sayısına, yaşayan kişi sayısına ve eşya yoğunluğuna göre taşınmada gereken yaklaşık koli sayısını, koli boylarını ve bant miktarını hesaplayın.',
  card: 'Oda ve kişi sayısına göre taşınma için yaklaşık kaç küçük, orta ve büyük koli ile kaç rulo bant gerektiğini bulun.',
  category: 'gunluk',
  keywords: ['taşınma koli sayısı', 'ev taşırken kaç koli gerekir', '2+1 ev kaç koli', '3+1 ev kaç koli', 'taşınma kolisi hesaplama', 'koli bandı ne kadar gerekir', 'evden eve nakliyat koli'],
  lead: 'Taşınma hazırlığında en sık yaşanan sorun, kolilerin ya yarı yolda bitmesi ya da gereğinden fazla alınmasıdır. Ev tipini, evde yaşayan kişi sayısını ve eşya yoğunluğunu seçin; araç <strong>yaklaşık koli sayısını</strong>, bunların küçük, orta ve büyük olarak dağılımını ve gereken <strong>koli bandını</strong> tahmin etsin.',
  button: 'Hesapla',
  inputs: [
    { id: 'ev', label: 'Ev tipi', type: 'select', options: [['2+1', '2+1'], ['1+0', '1+0 (stüdyo)'], ['1+1', '1+1'], ['3+1', '3+1'], ['4+1', '4+1'], ['5+1', '5+1 ve üzeri']] },
    { id: 'kisi', label: 'Evde yaşayan kişi sayısı', type: 'number', value: '2' },
    { id: 'yogunluk', label: 'Eşya yoğunluğu', type: 'select', options: [['orta', 'Orta – ortalama bir ev'], ['az', 'Az – sade, yeni kurulmuş ev'], ['cok', 'Çok – kitap, koleksiyon, dolu dolaplar']] },
    { id: 'rulo', label: 'Koli bandı rulo uzunluğu (m)', type: 'number', value: '100', hint: 'Rulonun üzerinde yazar; yaygın boylar 40, 66 ve 100 metredir' },
  ],
  compute(v, h) {
    const BAZ = { '1+0': 15, '1+1': 25, '2+1': 40, '3+1': 55, '4+1': 70, '5+1': 85 };
    const CARPAN = { az: 0.8, orta: 1, cok: 1.3 };
    const baz = BAZ[v.ev];
    if (!baz) h.err('Listeden bir ev tipi seçin.');
    const kisi = h.posint(v.kisi, 'Evde yaşayan kişi sayısı');
    if (kisi > 15) h.err('"Evde yaşayan kişi sayısı" en fazla 15 olabilir.');
    const rulo = h.pos(v.rulo, 'Koli bandı rulo uzunluğu');
    const carpan = CARPAN[v.yogunluk] || 1;
    const toplam = Math.ceil((baz + (kisi - 1) * 5) * carpan - 1e-9);
    const kucuk = Math.round(toplam * 0.3 + 1e-9);
    const buyuk = Math.round(toplam * 0.2 + 1e-9);
    const orta = toplam - kucuk - buyuk;
    const bant = toplam * 3;
    const ruloAdet = Math.ceil(bant / rulo - 1e-9);
    const hacim = (kucuk * 36 + orta * 80 + buyuk * 150) / 1000;
    return {
      rows: [
        ['Tahmini koli sayısı', `${toplam} koli`],
        ['Küçük koli (kitap, tabak, ağır eşya)', `${kucuk} adet`],
        ['Orta koli (mutfak, giysi, genel)', `${orta} adet`],
        ['Büyük koli (yorgan, yastık, hafif eşya)', `${buyuk} adet`],
        ['Koli bandı', `${h.fmt(bant, 0)} m (${ruloAdet} rulo)`],
        ['Kolilerin yaklaşık toplam hacmi', `${h.fmt(hacim, 2)} m³`],
      ],
      note: 'Bu bir kestirimdir: ev tipi için bir başlangıç değeri alınır, ilk kişiden sonraki her kişi için 5 koli eklenir ve yoğunluğa göre düzeltilir. Mobilya, beyaz eşya ve askılı giysiler koliye girmediği için hesaba dahil değildir. Hacim; 40×30×30, 50×40×40 ve 60×50×50 cm koli ölçüleri varsayılarak bulunur.',
    };
  },
  cases: [
    { in: { ev: '2+1', kisi: '2', yogunluk: 'orta', rulo: '100' }, out: { 'Tahmini koli sayısı': '45 koli', 'Küçük koli (kitap, tabak, ağır eşya)': '14 adet', 'Orta koli (mutfak, giysi, genel)': '22 adet', 'Büyük koli (yorgan, yastık, hafif eşya)': '9 adet', 'Koli bandı': '135 m (2 rulo)', 'Kolilerin yaklaşık toplam hacmi': '3,61 m³' } },
    { in: { ev: '3+1', kisi: '4', yogunluk: 'cok', rulo: '100' }, out: { 'Tahmini koli sayısı': '91 koli', 'Küçük koli (kitap, tabak, ağır eşya)': '27 adet', 'Orta koli (mutfak, giysi, genel)': '46 adet', 'Büyük koli (yorgan, yastık, hafif eşya)': '18 adet', 'Koli bandı': '273 m (3 rulo)', 'Kolilerin yaklaşık toplam hacmi': '7,35 m³' } },
    { in: { ev: '1+0', kisi: '1', yogunluk: 'az', rulo: '100' }, out: { 'Tahmini koli sayısı': '12 koli', 'Küçük koli (kitap, tabak, ağır eşya)': '4 adet', 'Orta koli (mutfak, giysi, genel)': '6 adet', 'Büyük koli (yorgan, yastık, hafif eşya)': '2 adet', 'Koli bandı': '36 m (1 rulo)', 'Kolilerin yaklaşık toplam hacmi': '0,92 m³' } },
    { in: { ev: '1+1', kisi: '2', yogunluk: 'orta', rulo: '40' }, out: { 'Tahmini koli sayısı': '30 koli', 'Küçük koli (kitap, tabak, ağır eşya)': '9 adet', 'Orta koli (mutfak, giysi, genel)': '15 adet', 'Büyük koli (yorgan, yastık, hafif eşya)': '6 adet', 'Koli bandı': '90 m (3 rulo)' } },
    { in: { ev: '5+1', kisi: '6', yogunluk: 'orta', rulo: '100' }, out: { 'Tahmini koli sayısı': '110 koli', 'Küçük koli (kitap, tabak, ağır eşya)': '33 adet', 'Orta koli (mutfak, giysi, genel)': '55 adet', 'Büyük koli (yorgan, yastık, hafif eşya)': '22 adet', 'Koli bandı': '330 m (4 rulo)' } },
    { in: { ev: '4+1', kisi: '3', yogunluk: 'az', rulo: '66' }, out: { 'Tahmini koli sayısı': '64 koli', 'Küçük koli (kitap, tabak, ağır eşya)': '19 adet', 'Orta koli (mutfak, giysi, genel)': '32 adet', 'Büyük koli (yorgan, yastık, hafif eşya)': '13 adet', 'Koli bandı': '192 m (3 rulo)' } },
    { in: { ev: '2+1', kisi: '0', yogunluk: 'orta', rulo: '100' }, error: true },
    { in: { ev: '2+1', kisi: '2', yogunluk: 'orta', rulo: '0' }, error: true },
  ],
  howto: [
    'Taşınacağınız değil, şu an oturduğunuz evin tipini listeden seçin; koli sayısını belirleyen mevcut eşyanızdır.',
    'Evde yaşayan kişi sayısını yazın. Her kişi kendi giysisi, kitabı ve kişisel eşyasıyla koli sayısını artırır.',
    'Eşya yoğunluğunu dürüstçe değerlendirin: dolaplarınız ağzına kadar doluysa ya da geniş bir kitaplığınız varsa "Çok" seçeneğini işaretleyin.',
    'Alacağınız koli bandının rulo uzunluğunu girin ve "Hesapla" düğmesine basın.',
    'Sonuçtaki koli dağılımını alışveriş listenize aktarın; yüzde 10 kadar yedek almak işinizi kolaylaştırır.',
  ],
  sections: [
    { h: 'Tahmin nasıl yapılıyor?', p: [
      'Koli ihtiyacının kesin bir formülü yoktur; aynı büyüklükteki iki evden biri 30, diğeri 90 koli çıkarabilir. Araç bu yüzden pratik bir kestirim yöntemi kullanır. Her ev tipi için bir başlangıç değeri alınır: 1+0 için 15, 1+1 için 25, 2+1 için 40, 3+1 için 55, 4+1 için 70 ve 5+1 için 85 koli. Bu değerler tek kişinin yaşadığı ortalama bir evi temsil eder.',
      'Evdeki ilk kişiden sonraki her kişi için 5 koli eklenir. Çıkan sayı eşya yoğunluğuna göre düzeltilir: sade evlerde 0,8, ortalama evlerde 1, dolu evlerde 1,3 ile çarpılır ve yukarı yuvarlanır. Özetle: <strong>koli = (ev başlangıç değeri + (kişi − 1) × 5) × yoğunluk çarpanı</strong>.',
      'Toplamın yaklaşık yüzde 30\'u küçük, yüzde 20\'si büyük, kalanı orta boy koli olarak dağıtılır. Bant için koli başına 3 metre öngörülür; bu, alt ve üst kapağın ortadan ve kenarlardan bantlanmasına yetecek bir paydır.',
    ] },
    { h: 'Çözümlü örnek: iki kişilik 2+1 ev', p: [
      'Ortalama eşyalı bir 2+1 evde iki kişi yaşıyor olsun. Başlangıç değeri 40, ikinci kişi için 5 eklenir: 45. Yoğunluk çarpanı 1 olduğundan sonuç <strong>45 kolidir</strong>.',
      'Dağılım: 45 × 0,30 = 13,5, yuvarlanınca 14 küçük koli; 45 × 0,20 = 9 büyük koli; geriye 45 − 14 − 9 = 22 orta koli kalır. Bant ihtiyacı 45 × 3 = 135 metredir; 100 metrelik rulolardan 2 tane almak gerekir. Varsayılan koli ölçüleriyle toplam hacim yaklaşık 3,61 m³ eder; bu yalnızca kolilerin hacmidir, mobilyalar ayrıca yer tutar.',
    ] },
    { h: 'Hangi eşya hangi koliye konur?', p: [
      'Koli boyu seçiminde temel kural basittir: <strong>ağır eşya küçük koliye, hafif eşya büyük koliye</strong>. Büyük bir koliyi kitapla doldurursanız taşınamayacak kadar ağırlaşır ve altı açılabilir.',
    ], ul: [
      '<strong>Küçük koli (yaklaşık 40×30×30 cm):</strong> kitaplar, dergiler, tabak ve bardaklar, konserve ve kavanozlar, aletler, küçük elektronik eşyalar.',
      '<strong>Orta koli (yaklaşık 50×40×40 cm):</strong> tencere ve tavalar, mutfak robotu gibi küçük ev aletleri, katlanmış giysiler, ayakkabılar, oyuncaklar, banyo malzemeleri.',
      '<strong>Büyük koli (yaklaşık 60×50×50 cm):</strong> yorgan, battaniye, yastık, havlu, abajur, hafif ama hacimli eşyalar.',
    ] },
    { h: 'Koli dışında gerekenler', ul: [
      'Koli bandı ve tercihen bir bant makinesi; iş çok hızlanır.',
      'Kırılacaklar için balonlu naylon, ambalaj kâğıdı ya da eski gazete ve havlular.',
      'Kolileri oda oda işaretlemek için kalın uçlu kalem ya da renkli etiket.',
      'Mobilya ve yatakları sarmak için streç film ve battaniye.',
      'Askılı giysiler için askılı gardırop kolisi ya da büyük çöp torbaları.',
      'Vida ve küçük parçalar için kilitli poşetler; poşeti ait olduğu mobilyaya bantlayın.',
    ] },
    { h: 'Paketlemede sık yapılan hatalar', ul: [
      'Kolileri ağzına kadar ağır eşyayla doldurmak. Bir kolinin rahatça kaldırılabilecek ağırlıkta olması gerekir.',
      'Kolinin içinde boşluk bırakmak. Boşluklar üst üste dizildiğinde ezilmeye yol açar; kâğıt ya da havluyla doldurun.',
      'Kolilerin üzerine içeriği ve gideceği odayı yazmamak.',
      'Paketlemeyi son iki güne bırakmak. Az kullanılan eşyalarla birkaç hafta önceden başlamak hem koli ihtiyacını netleştirir hem stresi azaltır.',
      'Taşınmadan önce ayıklama yapmamak. Kullanılmayan eşyaları elden çıkarmak koli sayısını doğrudan düşürür.',
    ] },
    { h: 'Sınırlar', p: [
      'Sonuç bir başlangıç tahminidir ve gerçek ihtiyaçtan belirgin biçimde sapabilir. Mobilyalar, beyaz eşyalar, halılar, avizeler, askılı giysiler ve bitkiler koli hesabına dahil değildir. Nakliye firmaları ekspertiz sırasında eşyanızı görerek daha isabetli bir sayı verebilir; bazı firmalar koliyi ve paketlemeyi hizmete dahil eder. Kolileri kendiniz alacaksanız iade edilebilir biçimde ya da birkaç parti hâlinde almak, fazla ya da eksik kalma riskini azaltır.',
    ] },
  ],
  faq: [
    ['2+1 ev için kaç koli gerekir?', 'Ortalama eşyalı ve iki kişinin yaşadığı bir 2+1 ev için yaklaşık 45 koli öngörülür. Sade bir evde bu sayı 36\'ya inebilir, eşyası çok olan bir evde 59\'a çıkabilir.'],
    ['3+1 ev için kaç koli gerekir?', 'Dört kişilik, ortalama eşyalı bir 3+1 ev için yaklaşık 70 koli hesaplanır. Aynı evde eşya yoğunluğu yüksekse sayı 91\'e ulaşır.'],
    ['Koli bandından kaç rulo almalıyım?', 'Koli başına yaklaşık 3 metre bant hesaplayabilirsiniz. 45 koli için 135 metre, yani 100 metrelik rulolardan 2 adet gerekir. Mobilya sarmak için ayrıca bant ya da streç film gerekebilir.'],
    ['Kitaplar için neden küçük koli öneriliyor?', 'Kitap çok yoğun bir yüktür. Büyük bir koliyi kitapla doldurmak koliyi kaldırılamaz hâle getirir ve altının açılmasına neden olabilir. Küçük kolilerle ağırlık taşınabilir düzeyde kalır.'],
    ['Marketten alınan kullanılmış koliler olur mu?', 'Sağlam, kuru ve temiz oldukları sürece olur. Farklı boyutlarda oldukları için araca dizmek zorlaşır ve yaş meyve sebze kolileri dayanıksız olabilir. Ağır ve kırılacak eşyalar için çift oluklu sağlam koliler tercih edin.'],
    ['Taşınma kolilerinin toplam hacmi ne işe yarar?', 'Nakliye aracının büyüklüğü hakkında kabaca fikir verir. Ancak mobilya ve beyaz eşya hacmin büyük bölümünü oluşturduğundan araç seçimi yalnızca koli hacmine göre yapılmamalıdır.'],
    ['Kaç kişinin yaşadığı neden soruluyor?', 'Aynı büyüklükteki evde yaşayan kişi sayısı arttıkça giysi, ayakkabı, kitap ve kişisel eşya da artar. Araç ilk kişiden sonraki her kişi için 5 koli ekler.'],
    ['Seçtiğim bilgiler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; ev tipiniz ya da kişi sayınız gibi bilgiler sunucuya gönderilmez.'],
  ],
  related: ['koli-sigdirma-hesapla', 'bavul-hacmi-hesapla', 'hacim-hesapla', 'kitaplik-kapasite-hesapla', 'palet-yukleme-hesapla'],
};
