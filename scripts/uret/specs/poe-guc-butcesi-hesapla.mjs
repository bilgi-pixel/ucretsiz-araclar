export default {
  slug: 'poe-guc-butcesi-hesapla',
  title: 'PoE Güç Bütçesi Hesaplama',
  h1Tail: 'switch kaç cihazı besler?',
  pageTitle: 'PoE Güç Bütçesi Hesaplama – Switch Kaç Kamerayı Besler?',
  description: 'PoE switch\'in toplam güç bütçesini ve bağlanacak cihazların watt değerlerini girin; toplam tüketimi, kalan gücü ve bütçenin yetip yetmediğini anında görün.',
  card: 'PoE switch bütçesini cihazların toplam watt değeriyle karşılaştırın; kalan gücü ve gereken PoE standardını görün.',
  category: 'gunluk',
  keywords: ['poe güç bütçesi hesaplama', 'poe switch kaç kamera besler', 'poe watt hesaplama', 'poe bütçe hesabı', '802.3af 802.3at farkı', 'poe switch seçimi', 'ip kamera güç tüketimi'],
  lead: 'PoE (Ethernet üzerinden güç) destekli bir ağ anahtarı, kamera, erişim noktası ve IP telefon gibi cihazları veri kablosu üzerinden besler; ancak verebileceği toplam güç sınırlıdır. Switch\'in <strong>toplam PoE bütçesini</strong> ve bağlayacağınız cihazların güç tüketimini yazın; araç bütçenin yetip yetmediğini ve ne kadar pay kaldığını göstersin.',
  button: 'Hesapla',
  inputs: [
    { id: 'butce', label: 'Switch toplam PoE bütçesi (W)', type: 'number', placeholder: 'Örn. 120' },
    { id: 'adet1', label: '1. cihaz grubu – adet', type: 'number', placeholder: 'Örn. 8' },
    { id: 'guc1', label: '1. cihaz grubu – cihaz başına güç (W)', type: 'number', placeholder: 'Örn. 7' },
    { id: 'adet2', label: '2. cihaz grubu – adet (isteğe bağlı)', type: 'number' },
    { id: 'guc2', label: '2. cihaz grubu – cihaz başına güç (W)', type: 'number' },
    { id: 'adet3', label: '3. cihaz grubu – adet (isteğe bağlı)', type: 'number' },
    { id: 'guc3', label: '3. cihaz grubu – cihaz başına güç (W)', type: 'number' },
    { id: 'pay', label: 'Yedek pay (%)', type: 'number', value: '20', hint: 'Kablo kaybı, kızılötesi aydınlatma ve ilk açılış akımı için' },
  ],
  compute(v, h) {
    const butce = h.pos(v.butce, 'Switch toplam PoE bütçesi');
    const pay = h.nonneg(v.pay, 'Yedek pay');
    const bos = (s) => String(s ?? '').trim() === '';
    let toplam = 0, port = 0, enBuyuk = 0;
    for (const i of [1, 2, 3]) {
      const a = v['adet' + i], g = v['guc' + i];
      if (i > 1 && bos(a) && bos(g)) continue;
      const adet = i === 1 ? h.posint(a, '1. cihaz grubu adedi') : h.int(a, `${i}. cihaz grubu adedi`);
      if (adet < 0) h.err(`${i}. cihaz grubu adedi negatif olamaz.`);
      if (adet === 0) continue;
      const guc = h.pos(g, `${i}. cihaz grubu gücü`);
      toplam += adet * guc;
      port += adet;
      if (guc > enBuyuk) enBuyuk = guc;
    }
    const gereken = toplam * (1 + pay / 100);
    const kalan = butce - gereken;
    const yeterli = kalan >= -1e-9;
    let standart;
    if (enBuyuk <= 12.95) standart = 'IEEE 802.3af (PoE) – port başına 15,4 W';
    else if (enBuyuk <= 25.5) standart = 'IEEE 802.3at (PoE+) – port başına 30 W';
    else if (enBuyuk <= 51) standart = 'IEEE 802.3bt Tip 3 (PoE++) – port başına 60 W';
    else if (enBuyuk <= 71.3) standart = 'IEEE 802.3bt Tip 4 (PoE++) – port başına 90 W';
    else standart = 'Standart PoE sınırının üzerinde (cihazda 71,3 W\'tan fazla)';
    return {
      rows: [
        ['Gereken PoE bütçesi (paylı)', h.fmt(gereken, 2) + ' W'],
        ['Durum', yeterli ? 'Yeterli' : 'Yetersiz'],
        ['Kalan güç', h.fmt(kalan, 2) + ' W'],
        ['Bütçe kullanım oranı', '%' + h.fmt(gereken / butce * 100, 1)],
        ['Cihazların toplam gücü', h.fmt(toplam, 2) + ' W'],
        ['Gereken PoE portu', h.fmt(port, 0) + ' port'],
        ['En güçlü cihaz için asgari standart', standart],
      ],
      note: 'Toplam bütçenin yanında her portun verebildiği en yüksek güç de cihaz için yeterli olmalıdır. Değerler planlama amaçlıdır; cihazların teknik belgelerindeki en yüksek güç tüketimini esas alın.',
    };
  },
  cases: [
    { in: { butce: '120', adet1: '8', guc1: '7', pay: '20' }, out: { 'Gereken PoE bütçesi (paylı)': '67,2 W', 'Durum': 'Yeterli', 'Kalan güç': '52,8 W', 'Bütçe kullanım oranı': '%56', 'Cihazların toplam gücü': '56 W', 'Gereken PoE portu': '8 port', 'En güçlü cihaz için asgari standart': 'IEEE 802.3af (PoE) – port başına 15,4 W' } },
    { in: { butce: '100', adet1: '4', guc1: '12,95', adet2: '2', guc2: '25,5', pay: '0' }, out: { 'Gereken PoE bütçesi (paylı)': '102,8 W', 'Durum': 'Yetersiz', 'Kalan güç': '-2,8 W', 'Bütçe kullanım oranı': '%102,8', 'Gereken PoE portu': '6 port', 'En güçlü cihaz için asgari standart': 'IEEE 802.3at (PoE+) – port başına 30 W' } },
    { in: { butce: '370', adet1: '16', guc1: '6', adet2: '4', guc2: '20', adet3: '1', guc3: '60', pay: '20' }, out: { 'Gereken PoE bütçesi (paylı)': '283,2 W', 'Durum': 'Yeterli', 'Kalan güç': '86,8 W', 'Bütçe kullanım oranı': '%76,5', 'Cihazların toplam gücü': '236 W', 'Gereken PoE portu': '21 port', 'En güçlü cihaz için asgari standart': 'IEEE 802.3bt Tip 4 (PoE++) – port başına 90 W' } },
    { in: { butce: '65', adet1: '4', guc1: '15', pay: '0' }, out: { 'Gereken PoE bütçesi (paylı)': '60 W', 'Durum': 'Yeterli', 'Kalan güç': '5 W', 'En güçlü cihaz için asgari standart': 'IEEE 802.3at (PoE+) – port başına 30 W' } },
    { in: { butce: '250', adet1: '24', guc1: '8', pay: '25' }, out: { 'Gereken PoE bütçesi (paylı)': '240 W', 'Durum': 'Yeterli', 'Kalan güç': '10 W', 'Bütçe kullanım oranı': '%96', 'Cihazların toplam gücü': '192 W' } },
    { in: { butce: '60', adet1: '2', guc1: '40', pay: '0' }, out: { 'Gereken PoE bütçesi (paylı)': '80 W', 'Durum': 'Yetersiz', 'Kalan güç': '-20 W', 'En güçlü cihaz için asgari standart': 'IEEE 802.3bt Tip 3 (PoE++) – port başına 60 W' } },
    { in: { butce: '120', adet1: '8', guc1: '', pay: '20' }, error: true },
    { in: { butce: '0', adet1: '8', guc1: '7', pay: '20' }, error: true },
    { in: { butce: '120', adet1: '8', guc1: '7', adet2: '3', guc2: '', pay: '20' }, error: true },
  ],
  howto: [
    'Switch\'in teknik özelliklerinde "PoE güç bütçesi" ya da "toplam PoE gücü" olarak yazan watt değerini girin.',
    'Bağlayacağınız cihazları güç tüketimine göre gruplayın; ilk grubun adedini ve cihaz başına en yüksek güç tüketimini yazın.',
    'Farklı tüketimde cihazlarınız varsa (örneğin sabit kameralar, hareketli kameralar, erişim noktaları) ikinci ve üçüncü grupları doldurun; yoksa boş bırakın.',
    'Yedek payı belirleyin ve "Hesapla" düğmesine basın.',
    'Durum satırı "Yetersiz" ise daha yüksek bütçeli bir switch seçin, cihazları iki switch\'e bölün ya da bazı cihazları ayrı bir PoE enjektörüyle besleyin.',
  ],
  sections: [
    { h: 'PoE güç bütçesi nedir?', p: [
      'PoE destekli bir switch\'in içinde, bağlı cihazları beslemek için ayrılmış sınırlı bir güç kaynağı vardır. Bu kaynağın verebileceği toplam güce <strong>PoE güç bütçesi</strong> denir. Portların her biri tek başına belli bir güce kadar çıkabilir, ancak bütün portların aynı anda en yüksek gücü vermesi çoğu modelde mümkün değildir. Örneğin sekiz portlu ve port başına 30 W verebilen bir switch\'in toplam bütçesi 240 W değil, 120 W ya da daha az olabilir.',
      'Bağlı cihazların toplam talebi bütçeyi aştığında switch, öncelik ayarına ya da port sırasına göre bazı portların gücünü keser. Sonuç, sebebi kolay anlaşılmayan arızalardır: gece kızılötesi aydınlatma devreye girince yeniden başlayan kameralar ya da yoğun kullanımda kapanan erişim noktaları gibi. Bu yüzden switch seçerken port sayısı kadar toplam bütçeye de bakmak gerekir.',
    ] },
    { h: 'Hesaplama formülü ve çözümlü örnek', p: [
      'Hesap toplama ve karşılaştırmadan ibarettir: <strong>toplam güç = Σ (adet × cihaz başına güç)</strong>, <strong>gereken bütçe = toplam güç × (1 + yedek pay)</strong>, <strong>kalan = switch bütçesi − gereken bütçe</strong>. Kalan değer sıfır ya da pozitifse bütçe yeterlidir.',
      'Örnek 1: 120 W bütçeli bir switch\'e her biri en fazla 7 W tüketen 8 kamera bağlanacak. Toplam güç 8 × 7 = 56 W\'tır. Yüzde 20 payla 56 × 1,20 = 67,2 W gerekir. Kalan güç 120 − 67,2 = 52,8 W, kullanım oranı yüzde 56\'dır; bütçe rahatlıkla yeter.',
      'Örnek 2: 100 W bütçeli bir switch\'e 12,95 W\'lık 4 cihaz ve 25,5 W\'lık 2 cihaz bağlanırsa toplam 51,8 + 51 = 102,8 W eder. Pay eklenmese bile bütçe 2,8 W aşılır; durum "Yetersiz" çıkar.',
      'Örnek 3: 370 W bütçeli 24 portlu bir switch\'te 6 W\'lık 16 kamera, 20 W\'lık 4 erişim noktası ve 60 W\'lık 1 hareketli kamera bulunsun. Toplam 96 + 80 + 60 = 236 W, yüzde 20 payla 283,2 W eder; 86,8 W pay kalır. Ancak 60 W\'lık cihaz için ilgili portun 802.3bt desteklemesi gerekir.',
    ] },
    { h: 'PoE standartları ve port başına güç', p: [
      'Toplam bütçe yeterli olsa bile her cihazın bağlandığı port, o cihazın ihtiyacını tek başına karşılayabilmelidir. Standartlar hem switch portunun verdiği gücü hem de kablo kaybından sonra cihaza ulaşması güvence edilen gücü tanımlar:',
    ], ul: [
      '<strong>IEEE 802.3af (PoE):</strong> portta 15,4 W, cihazda 12,95 W',
      '<strong>IEEE 802.3at (PoE+):</strong> portta 30 W, cihazda 25,5 W',
      '<strong>IEEE 802.3bt Tip 3 (PoE++):</strong> portta 60 W, cihazda 51 W',
      '<strong>IEEE 802.3bt Tip 4 (PoE++):</strong> portta 90 W, cihazda 71,3 W',
    ] },
    { h: 'Standart tablosu nasıl okunur?', p: [
      'Aradaki fark, 100 metreye kadar uzayabilen kabloda ısıya dönüşen güç için ayrılmış paydır. Araç, girdiğiniz en güçlü cihaza bakarak hangi standardın en az gerektiğini son satırda gösterir. Standart dışı, "pasif PoE" olarak anılan ürünler bu sınıflandırmaya girmez ve uyumlu olmayan cihaza zarar verebilir; karıştırmamak gerekir.',
    ] },
    { h: 'Cihaz gücünü doğru belirlemek', p: [
      'Hesaba cihazın ortalama değil <strong>en yüksek</strong> güç tüketimi yazılmalıdır. Güvenlik kameralarında gündüz tüketimi düşüktür; gece kızılötesi LED\'ler yandığında, ısıtıcı devreye girdiğinde ya da motorlu mercek ve hareketli gövde çalıştığında tüketim belirgin biçimde artar. Kablosuz erişim noktaları yoğun trafik altında, IP telefonlar ekran ve hoparlör kullanımında daha fazla güç çeker. Ürünün teknik belgesinde "en yüksek güç tüketimi" ya da PoE sınıfı yazar; emin değilseniz cihazın PoE sınıfının üst sınırını kullanmak güvenli taraftır.',
      'Bazı switch\'ler bütçeyi cihazın gerçek tüketimine göre değil, cihazın bildirdiği PoE sınıfına göre ayırır. Bu durumda 5 W tüketen ama kendini 15,4 W\'lık sınıfta tanıtan bir cihaz, bütçeden 15,4 W düşer. Switch\'inizin güç ayırma yöntemini yönetim arayüzünden ya da kılavuzundan kontrol edin.',
    ] },
    { h: 'Yedek pay neden gerekli?', ul: [
      'Cihazlar ilk açılışta kısa süreliğine normalden yüksek akım çekebilir; elektrik kesintisi sonrası hepsi aynı anda açılır.',
      'Uzun ve ince kablolarda kayıp artar; bakır kaplamalı alüminyum kablolar PoE için uygun değildir ve ısınmaya yol açar.',
      'İleride eklenecek birkaç kamera ya da erişim noktası için yer kalır.',
      'Güç kaynağını sürekli sınırında çalıştırmak ısınmayı artırır ve ömrünü kısaltabilir.',
    ], p: [
      'Yaygın uygulama, bütçenin yüzde 20–30\'unu boş bırakmaktır. Araçtaki pay oranını kendi koşullarınıza göre değiştirebilirsiniz.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Araç yalnızca güç toplamını karşılaştırır; port sayısını, portların hangi standardı desteklediğini, kablo uzunluğuna bağlı gerilim düşümünü ve switch\'in güç önceliklendirme ayarlarını denetlemez. Bazı modellerde yalnızca belli portlar yüksek güç verebilir. Sonuçlar bilgilendirme amaçlıdır; elektrik tesisatı, topraklama ve yıldırımdan korunma gibi konular dâhil olmak üzere kurulum kararları için cihazların teknik belgelerini ve yetkili bir teknik uzmanın görüşünü esas alın.',
    ] },
  ],
  faq: [
    ['PoE switch kaç kamerayı besler?', 'Switch\'in toplam PoE bütçesini kamera başına en yüksek güç tüketimine bölerek kaba bir sayı bulursunuz. 120 W bütçe ve kamera başına 7 W için pay bırakmadan 17, yüzde 20 payla 14 kamera beslenebilir; ancak port sayısı da sınırlayıcıdır.'],
    ['PoE ile PoE+ arasındaki fark nedir?', 'PoE (802.3af) port başına 15,4 W verir ve cihaza 12,95 W ulaşması güvence edilir. PoE+ (802.3at) port başına 30 W verir, cihaza 25,5 W ulaşır. Hareketli kameralar ve yeni nesil erişim noktaları çoğunlukla PoE+ ister.'],
    ['Port başına 30 W veren 8 portlu switch 240 W verir mi?', 'Her zaman değil. Toplam bütçe ayrı bir değerdir ve çoğu modelde port başına gücün port sayısıyla çarpımından düşüktür. Teknik özelliklerdeki "toplam PoE bütçesi" satırına bakın.'],
    ['Bütçe aşılırsa ne olur?', 'Switch koruma amacıyla bazı portların gücünü keser; hangi portların kapanacağı öncelik ayarına ya da port numarasına göre belirlenir. Cihazlar yeniden başlar ya da hiç açılmaz.'],
    ['Kameranın watt değerini nereden öğrenirim?', 'Ürünün teknik belgesinde ya da etiketinde en yüksek güç tüketimi yazar. Yalnızca PoE sınıfı belirtilmişse o sınıfın üst sınırını kullanabilirsiniz; gece görüşlü kameralarda kızılötesi açıkken geçerli olan değeri esas alın.'],
    ['Kablo uzunluğu güç bütçesini etkiler mi?', 'Kabloda bir miktar güç ısıya dönüşür; standartlardaki port gücü ile cihaz gücü arasındaki fark bu kaybı karşılamak içindir. Kaliteli tam bakır kablo kullanmak ve 100 metre sınırını aşmamak gerekir.'],
    ['PoE olmayan cihazı PoE portuna takmak zarar verir mi?', 'Standartlara uygun PoE switch\'ler güç vermeden önce karşıdaki cihazın PoE destekleyip desteklemediğini algılar; desteklemiyorsa yalnızca veri iletilir. Algılama yapmayan pasif PoE ürünlerinde ise bu güvence yoktur.'],
    ['Girdiğim bilgiler bir yere gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız değerler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['ip-kamera-bant-genisligi-hesapla', 'guvenlik-kamerasi-depolama-hesapla', 'ups-calisma-suresi-hesapla', 'bant-genisligi-hesapla', 'kablo-kesiti-hesapla'],
};
