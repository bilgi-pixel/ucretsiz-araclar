export default {
  slug: 'knot-kmh-cevir',
  title: 'Knot km/h Çevirici',
  h1Tail: 'knot ↔ km/h',
  pageTitle: 'Knot km/h Çevirici – Deniz Mili/Saat Kilometre/Saat Hesaplama',
  description: 'Knot değerini km/h\'ye, kilometre/saati knota çevirin. 1 knot = 1,852 km/h tanımıyla çalışır; tekne, rüzgâr ve uçak hızları için m/s ve mph de verir.',
  card: 'Knotu km/h\'ye, km/h\'yi knota çevirin; tekne hızı, rüzgâr tahmini ve uçuş hızları için m/s ve mph karşılığıyla.',
  category: 'birim',
  keywords: ['knot km/h çevirme', '1 knot kaç km', 'knot kaç kilometre', 'deniz mili saat', 'knot hesaplama', 'rüzgar knot km/h', 'tekne hızı knot', 'kts kmh'],
  lead: 'Knot cinsinden verilen bir hızı kilometre/saate ya da km/h değerini knota çevirin. Knot, saatte bir deniz milidir ve tam olarak <strong>1,852 km/h</strong> eder.',
  button: 'Çevir',
  inputs: [
    { id: 'hiz', label: 'Hız', type: 'number', placeholder: 'Örn. 25' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['kn', 'Knot → km/h'], ['kmh', 'km/h → Knot']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.hiz, 'Hız');
    const DM = 1.852; // 1 deniz mili = 1,852 km (tam tanım)
    const kmh = v.yon === 'kmh' ? x : x * DM;
    const kn = v.yon === 'kmh' ? x / DM : x;
    const f = (n) => h.sig(n, 7);
    return {
      rows: [
        v.yon === 'kmh' ? ['Knot', f(kn) + ' kn'] : ['Kilometre/saat', f(kmh) + ' km/h'],
        v.yon === 'kmh' ? ['Kilometre/saat', f(kmh) + ' km/h'] : ['Knot', f(kn) + ' kn'],
        ['Metre/saniye', f(kmh / 3.6) + ' m/s'],
        ['Mil/saat', f(kmh / 1.609344) + ' mph'],
      ],
      note: '1 knot = 1 deniz mili/saat = 1,852 km/h (tam tanım). Sonuçlar yedi anlamlı basamağa yuvarlanır.',
    };
  },
  cases: [
    { in: { hiz: '10', yon: 'kn' }, out: { 'Kilometre/saat': '18,52 km/h', 'Metre/saniye': '5,144444 m/s' } },
    { in: { hiz: '100', yon: 'kmh' }, out: { 'Knot': '53,99568 kn', 'Kilometre/saat': '100 km/h' } },
    { in: { hiz: '1', yon: 'kn' }, out: { 'Kilometre/saat': '1,852 km/h' } },
    { in: { hiz: '25', yon: 'kn' }, out: { 'Kilometre/saat': '46,3 km/h' } },
    { in: { hiz: '1,852', yon: 'kmh' }, out: { 'Knot': '1 kn' } },
    { in: { hiz: '20', yon: 'kn' }, out: { 'Kilometre/saat': '37,04 km/h', 'Mil/saat': '23,01559 mph' } },
    { in: { hiz: '450', yon: 'kn' }, out: { 'Kilometre/saat': '833,4 km/h' } },
    { in: { hiz: 'on knot', yon: 'kn' }, error: true },
    { in: { hiz: '-4', yon: 'kn' }, error: true },
  ],
  howto: [
    '"Hız" alanına knot ya da km/h cinsinden değeri yazın. Ondalık ayırıcı olarak virgül veya nokta kullanılabilir.',
    '"Çeviri yönü" bölümünden "Knot → km/h" ya da "km/h → Knot" seçeneğini belirleyin.',
    '"Çevir" düğmesine basın; karşılık gelen hız ilk satırda, m/s ve mph değerleri altında görünür.',
    'Seyir defterine ya da mesaja aktarmak için "Sonucu kopyala" düğmesini kullanın.',
  ],
  sections: [
    { h: 'Knot nedir?', p: [
      'Knot, denizcilikte ve havacılıkta kullanılan hız birimidir ve bir saatte kat edilen deniz mili sayısını gösterir. Bir deniz mili uluslararası tanımla tam olarak 1.852 metredir; dolayısıyla 1 knot tam olarak 1,852 km/h, yaklaşık 0,5144 m/s eder. Simgesi <code>kn</code>\'dir; pratikte "kt" ya da "kts" yazımına da rastlanır. Türk denizcileri arasında knot yerine "mil" ya da "deniz mili yapıyor" ifadesi de kullanılır: "tekne 8 mil yapıyor" denildiğinde saatte 8 deniz mili, yani 8 knot kastedilir.',
      'Adın kökeni yelkenli gemiler dönemine uzanır. Geminin hızını ölçmek için kıç taraftan denize, üzerine eşit aralıklarla düğüm atılmış bir ipe bağlı tahta parça (parakete) bırakılırdı. Kum saatiyle ölçülen kısa sürede elden kaç düğüm kaydığı sayılır, bu sayı geminin hızı kabul edilirdi. İngilizcede "knot" düğüm demektir.',
    ] },
    { h: 'Deniz mili neden 1.852 metredir?', p: [
      'Deniz mili keyfi seçilmiş bir uzunluk değildir; Dünya\'nın ölçülerine bağlıdır. Bir meridyen yayı üzerinde enlemin bir dakikası (bir derecenin altmışta biri) yaklaşık bir deniz miline karşılık gelir. Bu sayede denizciler harita üzerinde enlem ölçeğini doğrudan mesafe cetveli gibi kullanabilir: iki nokta arasındaki enlem farkı 30 dakika ise aralarındaki kuzey-güney mesafesi yaklaşık 30 deniz milidir.',
      'Hız da aynı mantıkla okunur. 12 knot hızla giden bir tekne bir saatte haritada 12 dakikalık, beş saatte 1 derecelik enlem farkı kadar yol alır. Seyir hesaplarını bu kadar kolaylaştırdığı için metrik sistemin yaygınlaşmasına rağmen knot, deniz ve hava ulaşımında standart birim olarak kalmıştır.',
    ] },
    { h: 'Çeviri formülü ve çözümlü örnekler', p: [
      'Knottan kilometre/saate geçmek için değeri 1,852 ile çarparsınız: <strong>km/h = knot × 1,852</strong>. Ters yönde 1,852\'ye bölersiniz: <strong>knot = km/h ÷ 1,852</strong>.',
      '<strong>Örnek 1:</strong> Bir sürat teknesi 25 knot yapıyor. 25 × 1,852 = 46,3 km/h. Karada sıradan bir hız gibi görünse de su üzerinde oldukça hızlı bir seyirdir.',
      '<strong>Örnek 2:</strong> Hava tahmininde rüzgârın 20 knot eseceği yazıyor. 20 × 1,852 = 37,04 km/h; bu da yaklaşık 10,3 m/s\'dir.',
      '<strong>Örnek 3:</strong> Bir yolcu uçağının seyir hızı 450 knot olarak veriliyor. 450 × 1,852 = 833,4 km/h. Tersine, 100 km/h hız 100 ÷ 1,852 = 54 knot eder.',
      'Akıldan hesap için knot değerini ikiyle çarpıp yüzde 7–8 kadar düşebilirsiniz: 10 knot için 20 eksi 1,5 yaklaşık 18,5 km/h verir. Metre/saniye için daha da kolay bir kural vardır: knot değerinin yarısı yaklaşık m/s\'dir (10 knot ≈ 5,1 m/s).',
    ] },
    { h: 'Nerelerde karşınıza çıkar?', ul: [
      '<strong>Amatör denizcilik ve yelken:</strong> Tekne hız göstergeleri (parakete, GPS) knot gösterir. Yat kiralarken ya da rota planlarken varış süresini hesaplamak için mesafeyi deniz mili, hızı knot almak işi kolaylaştırır.',
      '<strong>Rüzgâr tahminleri:</strong> Denizcilik bültenleri, rüzgâr sörfü ve uçurtma sörfü uygulamaları rüzgârı knot olarak verir. Yelken seçimi ve denize çıkma kararı bu değere göre yapılır.',
      '<strong>Havacılık:</strong> Uçakların hava hızı göstergeleri knot taksimatlıdır; kule ile yapılan konuşmalarda rüzgâr ve hız değerleri knot olarak bildirilir.',
      '<strong>Feribot ve gemi tarifeleri:</strong> Bir geminin servis hızı knot olarak yazılır. 22 knot yapan bir feribot saatte 40,7 km yol alır.',
      '<strong>Balıkçılık:</strong> Sırtı (trolling) avında tekne hızı 2–7 knot aralığında tutulur; yem ve tür seçimine göre hız ayarı önemlidir.',
    ] },
    { h: 'Rüzgâr kuvveti için hızlı başvuru', p: [
      'Denizciler rüzgârı Beaufort (bofor) ölçeğiyle de ifade eder. Aşağıdaki değerler ölçeğin yaygın kabul edilen alt sınırlarının km/h karşılıklarıdır; yerel bültenlerin kullandığı aralıklar küçük farklar gösterebilir.',
    ], ul: [
      '<strong>7 knot</strong> = 12,96 km/h (hafif rüzgâr, 3 kuvveti başlangıcı)',
      '<strong>22 knot</strong> = 40,74 km/h (kuvvetli rüzgâr, 6 kuvveti başlangıcı)',
      '<strong>34 knot</strong> = 62,97 km/h (fırtına, 8 kuvveti başlangıcı)',
      '<strong>48 knot</strong> = 88,9 km/h (tam fırtına, 10 kuvveti başlangıcı)',
      '<strong>64 knot</strong> = 118,53 km/h (kasırga kuvveti, 12)',
    ] },
    { h: 'Dikkat edilecek noktalar', p: [
      'Knot zaten bir hız birimidir; "knot/saat" demek yanlıştır, çünkü saat kavramı tanımın içindedir. Benzer biçimde knotu kara miliyle karıştırmamak gerekir: 1 knot yaklaşık 1,151 mph\'dir, yani bir deniz mili kara milinden yüzde 15 kadar uzundur.',
      'Teknenin göstergesinde okuduğunuz hız, kullanılan cihaza göre farklı anlam taşır. Gövdeye takılı pervaneli parakete suya göre hızı, GPS ise deniz dibine (yere) göre hızı verir; akıntı varsa ikisi arasında fark olur. Uçaklarda da gösterge hava hızı ile yer hızı rüzgâra bağlı olarak ayrışır. Bu çevirici yalnızca birim dönüştürür; hangi hızı ölçtüğünüzü ayrıca bilmeniz gerekir. Seyir güvenliğiyle ilgili kararlarda resmî meteoroloji bültenlerini ve kaptanın değerlendirmesini esas alın.',
    ] },
  ],
  faq: [
    ['1 knot kaç km/h eder?', '1 knot tam olarak 1,852 km/h eder. Bu değer, deniz milinin 1.852 metre olarak tanımlanmasından doğrudan çıkar.'],
    ['1 km/h kaç knot eder?', '1 km/h yaklaşık 0,54 knot eder (1 ÷ 1,852 = 0,5399568). Örneğin 50 km/h yaklaşık 27 knot, 100 km/h yaklaşık 54 knottur.'],
    ['Knot ile deniz mili aynı şey mi?', 'Hayır; deniz mili uzunluk, knot ise hız birimidir. 1 knot, saatte 1 deniz mili yol almak demektir. Konuşma dilinde "tekne 10 mil yapıyor" denildiğinde aslında 10 knot kastedilir.'],
    ['30 knot kaç kilometre hız yapar?', '30 knot, 55,56 km/h eder. Bu hız birçok hızlı feribot ve sürat teknesinin seyir aralığındadır.'],
    ['Knot ile mph arasındaki ilişki nedir?', '1 knot yaklaşık 1,151 mph\'dir, çünkü deniz mili (1.852 m) kara milinden (1.609,344 m) uzundur. 20 knot yaklaşık 23 mph eder.'],
    ['Rüzgâr 15 knot ise denize çıkılır mı?', '15 knot, 27,78 km/h demektir. Bunun uygun olup olmadığı teknenin tipine, dalga durumuna ve mürettebatın deneyimine bağlıdır; çevirici bu konuda karar veremez. Güncel denizcilik hava raporunu ve yetkililerin uyarılarını mutlaka kontrol edin.'],
    ['Knot neden hâlâ kullanılıyor?', 'Deniz mili enlem dakikasına bağlı olduğu için harita üzerinde mesafe ve hız hesabını çok kolaylaştırır. Denizcilik ve havacılıkta uluslararası ortak dil haline geldiğinden metrik ülkelerde bile bu alanlarda knot kullanılmaya devam eder.'],
    ['Bu çevirici verilerimi saklıyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır, girdiğiniz hız değeri hiçbir yere gönderilmez. Sayfayı bir kez açtıktan sonra denizde, internet olmadan da kullanabilirsiniz.'],
  ],
  related: ['deniz-mili-km-cevir', 'kmh-mph-cevir', 'ms-kmh-cevir', 'mach-kmh-cevir', 'km-mil-cevir'],
};
