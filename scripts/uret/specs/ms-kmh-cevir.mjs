export default {
  slug: 'ms-kmh-cevir',
  title: 'm/s km/h Çevirici',
  h1Tail: 'm/s ↔ km/h',
  pageTitle: 'm/s km/h Çevirici – Metre/Saniye Kilometre/Saat Hesaplama',
  description: 'Metre/saniyeyi kilometre/saate, km/h değerini m/s\'ye çevirin. 3,6 katsayısının nereden geldiğini, fizik sorularında ve rüzgâr hızında kullanımını öğrenin.',
  card: 'Metre/saniyeyi km/h\'ye, km/h\'yi m/s\'ye çevirin; fizik problemleri, rüzgâr ve koşu hızları için mph ve knot ile.',
  category: 'birim',
  keywords: ['m/s km/h çevirme', 'metre saniye kilometre saat', 'km/h m/s çevirme', '1 m/s kaç km/h', '72 km/h kaç m/s', 'hız birimi dönüştürme', 'm/s hesaplama'],
  lead: 'Metre/saniye cinsinden bir hızı kilometre/saate ya da km/h değerini m/s\'ye çevirin. İki birim arasındaki katsayı tam olarak <strong>3,6</strong>\'dır: 1 m/s = 3,6 km/h.',
  button: 'Çevir',
  inputs: [
    { id: 'hiz', label: 'Hız', type: 'number', placeholder: 'Örn. 20' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['ms', 'm/s → km/h'], ['kmh', 'km/h → m/s']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.hiz, 'Hız');
    const ms = v.yon === 'kmh' ? x / 3.6 : x;
    const kmh = v.yon === 'kmh' ? x : x * 3.6;
    const f = (n) => h.sig(n, 7);
    return {
      rows: [
        v.yon === 'kmh' ? ['Metre/saniye', f(ms) + ' m/s'] : ['Kilometre/saat', f(kmh) + ' km/h'],
        v.yon === 'kmh' ? ['Kilometre/saat', f(kmh) + ' km/h'] : ['Metre/saniye', f(ms) + ' m/s'],
        ['Metre/dakika', f(ms * 60) + ' m/dk'],
        ['Mil/saat', f(kmh / 1.609344) + ' mph'],
        ['Knot', f(kmh / 1.852) + ' kn'],
      ],
      note: '1 m/s = 3,6 km/h (tam değer). Sonuçlar yedi anlamlı basamağa yuvarlanır.',
    };
  },
  cases: [
    { in: { hiz: '20', yon: 'ms' }, out: { 'Kilometre/saat': '72 km/h', 'Metre/dakika': '1.200 m/dk' } },
    { in: { hiz: '90', yon: 'kmh' }, out: { 'Metre/saniye': '25 m/s', 'Kilometre/saat': '90 km/h' } },
    { in: { hiz: '1', yon: 'ms' }, out: { 'Kilometre/saat': '3,6 km/h' } },
    { in: { hiz: '100', yon: 'kmh' }, out: { 'Metre/saniye': '27,77778 m/s' } },
    { in: { hiz: '12,5', yon: 'ms' }, out: { 'Kilometre/saat': '45 km/h' } },
    { in: { hiz: '36', yon: 'kmh' }, out: { 'Metre/saniye': '10 m/s', 'Metre/dakika': '600 m/dk' } },
    { in: { hiz: '0', yon: 'ms' }, out: { 'Kilometre/saat': '0 km/h' } },
    { in: { hiz: '', yon: 'ms' }, error: true },
    { in: { hiz: '-3', yon: 'kmh' }, error: true },
  ],
  howto: [
    '"Hız" kutusuna sayıyı girin; ondalıklı değerlerde virgül de nokta da kabul edilir.',
    'Elinizdeki değer metre/saniye ise "m/s → km/h", kilometre/saat ise "km/h → m/s" yönünü seçin.',
    '"Çevir" düğmesine tıklayın. Sonuç kutusunda karşılık gelen hızla birlikte metre/dakika, mil/saat ve knot değerleri de listelenir.',
    'Ödev ya da rapora aktarmak için "Sonucu kopyala" düğmesini kullanabilirsiniz.',
  ],
  sections: [
    { h: '3,6 katsayısı nereden gelir?', p: [
      'Metre/saniye (m/s), Uluslararası Birim Sistemi\'nin (SI) hız birimidir: cisim bir saniyede kaç metre yol alıyorsa hızı o kadar m/s\'dir. Kilometre/saat (km/h) ise gündelik hayata daha uygun bir ölçektir, çünkü yolculuklarımızı kilometre ve saatle düşünürüz.',
      'Dönüşüm iki basit eşitliğe dayanır: 1 kilometre 1.000 metre, 1 saat 3.600 saniyedir. Saniyede 1 metre giden bir cisim bir saatte 3.600 metre, yani 3,6 kilometre yol alır. Buradan <strong>1 m/s = 3,6 km/h</strong> çıkar. Tersinden bakarsak 1 km/h, 1.000 metre ÷ 3.600 saniye = 0,2778 m/s eder. Katsayı tanımdan türediği için yaklaşık değil tam bir sayıdır.',
    ] },
    { h: 'Formül ve çözümlü örnekler', p: [
      'Kural kısaca şöyledir: <strong>km/h = m/s × 3,6</strong> ve <strong>m/s = km/h ÷ 3,6</strong>. Yönü karıştırmamak için şunu aklınızda tutun: km/h cinsinden sayı her zaman daha büyüktür.',
      '<strong>Örnek 1:</strong> Bir araç 72 km/h hızla gidiyor. 72 ÷ 3,6 = 20 m/s. Yani sürücü bir saniyelik dalgınlıkta 20 metre, yaklaşık dört otomobil boyu yol alır.',
      '<strong>Örnek 2:</strong> Bir fizik sorusunda cismin hızı 12,5 m/s veriliyor. 12,5 × 3,6 = 45 km/h. Şehir içinde sakin bir sürüş hızına karşılık gelir.',
      '<strong>Örnek 3:</strong> Otoyolda 90 km/h sabit hız 25 m/s eder. 100 km/h ise 27,78 m/s\'dir; bu değer tam sayı çıkmadığı için sınav sorularında genellikle 36, 54, 72, 90, 108 gibi 18\'in katı olan hızlar seçilir.',
    ] },
    { h: 'Fizik derslerinde neden m/s kullanılır?', p: [
      'Kinematik ve dinamik formüllerinde bütün büyüklükler SI birimleriyle yazılır: yol metre, zaman saniye, ivme m/s², kuvvet newton, enerji joule. Hız km/h olarak bırakılırsa sonuç birimleri tutmaz ve cevap 3,6 ya da 12,96 kat hatalı çıkar. Örneğin kinetik enerji formülü E = ½·m·v² içinde hızın karesi alındığından, km/h ile hesaplanan enerji gerçek değerin yaklaşık 13 katı görünür.',
      'Bu yüzden hareket problemlerinde ilk adım, verilen hızları m/s\'ye çevirmektir. Yerçekimi ivmesi 9,8 m/s² olduğundan serbest düşen bir cisim her saniye yaklaşık 9,8 m/s, yani 35 km/h kadar hız kazanır. Bu tür karşılaştırmalar soyut sayıları sezgisel hale getirir.',
    ] },
    { h: 'Gündelik hayattan hız karşılıkları', ul: [
      '<strong>Yürüyüş:</strong> yaklaşık 1,4 m/s, yani 5 km/h dolayında.',
      '<strong>Hafif tempolu koşu:</strong> 2,8 m/s = 10 km/h (kilometresi 6 dakika).',
      '<strong>100 metreyi 10 saniyede koşan sprinter:</strong> ortalama 10 m/s = 36 km/h.',
      '<strong>Şehir içi hız sınırı örneği:</strong> 50 km/h = 13,89 m/s.',
      '<strong>Şehirlerarası seyir:</strong> 90 km/h = 25 m/s.',
      '<strong>Otoyol seyri:</strong> 120 km/h = 33,33 m/s; 130 km/h = 36,11 m/s.',
      '<strong>Yüksek hızlı tren:</strong> 300 km/h = 83,33 m/s.',
      '<strong>Havada ses hızı (yaklaşık 20 °C):</strong> 343 m/s = 1.234,8 km/h.',
    ] },
    { h: 'Rüzgâr hızı ve meteoroloji', p: [
      'Meteoroloji istasyonları ve anemometreler rüzgârı çoğunlukla m/s olarak ölçer; televizyon ve telefon uygulamaları ise km/h gösterir. İki kaynak arasında değer karşılaştırırken birime dikkat etmek gerekir: 10 m/s\'lik rüzgâr 36 km/h, 20 m/s\'lik rüzgâr 72 km/h eder. Kabaca 17 m/s\'nin, yani 60 km/h dolayının üzerindeki rüzgârlar fırtına düzeyi kabul edilir; 33 m/s (118,8 km/h) ve üstü ise kasırga kuvvetidir.',
      'Rüzgâr türbini kataloglarında "devreye girme hızı" ve "nominal hız" değerleri de m/s ile verilir. Drone kullananlar, yelkenciler ve yamaç paraşütçüleri için sınır değerler çoğu zaman bu birimle yazıldığından, tahmin uygulamasındaki km/h değerini m/s\'ye çevirmek güvenli uçuş ve seyir kararının parçasıdır. Denizciler aynı değeri knot olarak da görmek ister; araç bunu ayrı satırda verir.',
    ] },
    { h: 'Sık yapılan hatalar ve ipuçları', p: [
      'En sık hata, çarpma ile bölmenin yer değiştirmesidir. 20 m/s\'yi 3,6\'ya bölüp 5,56 km/h bulan biri, bir otomobilin yürüme hızında gittiği sonucuna varır. Sonucun makul olup olmadığını bir cümleyle sınayın: saniyede 20 metre giden şey saatte çok daha fazla kilometre gider.',
      'İkinci tuzak "km/s" yazımıdır. Türkçede gündelik kullanımda saat anlamına gelse de bilimsel yazımda km/s, saniyede kilometre demektir ve km/h\'nin 3.600 katıdır. Uzay araçlarının hızı gerçekten km/s (saniyede kilometre) ile verilir; bu değerleri çevirirken önce metre/saniyeye getirmek en güvenli yoldur.',
      'Akıldan çeviri için 3,6 yerine önce 4 ile çarpıp yüzde 10 çıkarabilirsiniz: 15 m/s × 4 = 60, eksi 6 = 54 km/h. Sonuç tamdır, çünkü 4 × 0,9 = 3,6 eder.',
    ] },
  ],
  faq: [
    ['1 m/s kaç km/h eder?', '1 m/s tam olarak 3,6 km/h eder. Saniyede 1 metre giden cisim 3.600 saniyede, yani bir saatte 3.600 metre = 3,6 kilometre yol alır.'],
    ['1 km/h kaç m/s eder?', '1 km/h yaklaşık 0,2778 m/s\'dir (1 ÷ 3,6). Kesir olarak ifade edilirse 5/18 m/s\'ye eşittir; bu yüzden bazı ders kitapları km/h değerini 5/18 ile çarpmayı öğretir.'],
    ['72 km/h kaç m/s yapar?', '72 km/h, 20 m/s yapar. 36 km/h = 10 m/s, 54 km/h = 15 m/s, 90 km/h = 25 m/s ve 108 km/h = 30 m/s de sınavlarda sıkça karşılaşılan tam sayılı karşılıklardır.'],
    ['m/s\'yi km/h\'ye çevirirken çarpılır mı bölünür mü?', 'Çarpılır. m/s değeri 3,6 ile çarpılınca km/h bulunur; km/h değeri 3,6\'ya bölününce m/s elde edilir. Aynı hız için km/h sayısı her zaman m/s sayısından büyüktür.'],
    ['Rüzgâr hızı 10 m/s ise kaç km/h\'dir?', '10 m/s, 36 km/h\'ye karşılık gelir. Bu hızdaki rüzgâr ağaç dallarını belirgin biçimde sallar ve şemsiye kullanmayı zorlaştırır. Aynı değer yaklaşık 19,4 knot eder.'],
    ['m/s ile m/s² aynı şey mi?', 'Hayır. m/s hız birimidir; m/s² ise ivme birimidir ve hızın saniyede ne kadar değiştiğini gösterir. Bu araç yalnızca hız çevirir; ivme değerleri için 3,6 katsayısı tek başına geçerli değildir.'],
    ['Koşu temposunu m/s\'den nasıl bulurum?', 'Önce m/s değerini km/h\'ye çevirin, sonra 60\'ı bu sayıya bölün; sonuç bir kilometrenin kaç dakikada koşulduğudur. Örneğin 3 m/s = 10,8 km/h, tempo ise 60 ÷ 10,8 = 5,56 dakika, yani kilometre başına yaklaşık 5 dakika 33 saniyedir.'],
    ['Girdiğim sayılar internete gönderiliyor mu?', 'Hayır, çeviri işlemi cihazınızdaki tarayıcıda gerçekleşir. Yazdığınız değerler sunucuya iletilmez, kaydedilmez; sayfa yüklendikten sonra çevrimdışı da kullanılabilir.'],
  ],
  related: ['kmh-mph-cevir', 'knot-kmh-cevir', 'mach-kmh-cevir', 'km-mil-cevir', 'saniye-dakika-cevir'],
};
