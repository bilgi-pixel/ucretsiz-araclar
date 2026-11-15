export default {
  slug: 'deniz-mili-km-cevir',
  title: 'Deniz Mili Kilometre Çevirici',
  h1Tail: 'nmi ↔ km',
  pageTitle: 'Deniz Mili Kilometre Çevirici – 1 Deniz Mili Kaç Km Hesaplama',
  description: 'Deniz milini kilometreye, kilometreyi deniz miline çevirin. 1 deniz mili = 1,852 km tanımıyla çalışır; metre, kara mili ve gomina karşılığını da verir.',
  card: 'Deniz milini kilometreye, kilometreyi deniz miline çevirin; tekne rotası, uçuş mesafesi ve karasuları sınırları için.',
  category: 'birim',
  keywords: ['deniz mili km çevirme', '1 deniz mili kaç km', 'deniz mili kaç metre', 'nautical mile km', 'mil km denizcilik', '12 deniz mili kaç km', 'deniz mili hesaplama', 'gomina kaç metre'],
  lead: 'Denizcilikte ve havacılıkta kullanılan deniz milini kilometreye ya da kilometreyi deniz miline çevirin. Araç uluslararası tanımı esas alır: <strong>1 deniz mili = 1.852 metre</strong>. Sonuçta kara mili ve gomina karşılığı da yer alır.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Mesafe', type: 'number', placeholder: 'Örn. 12' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['nmi', 'Deniz mili → Kilometre'], ['km', 'Kilometre → Deniz mili']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Mesafe');
    const km = v.yon === 'km' ? x : x * 1.852;
    const nmi = v.yon === 'km' ? x / 1.852 : x;
    return {
      rows: [
        v.yon === 'km' ? ['Deniz mili', h.fmt(nmi, 4) + ' nmi'] : ['Kilometre', h.fmt(km, 4) + ' km'],
        v.yon === 'km' ? ['Kilometre', h.fmt(km, 4) + ' km'] : ['Deniz mili', h.fmt(nmi, 4) + ' nmi'],
        ['Metre', h.fmt(km * 1000, 2) + ' m'],
        ['Kara mili', h.fmt(km / 1.609344, 4) + ' mil'],
        ['Gomina', h.fmt(nmi * 10, 3) + ' gomina'],
      ],
      note: '1 deniz mili = 1,852 km (tam tanım). 1 gomina = deniz milinin onda biri = 185,2 m. Kara mili 1,609344 km alınır.',
    };
  },
  cases: [
    { in: { deger: '12', yon: 'nmi' }, out: { 'Kilometre': '22,224 km', 'Metre': '22.224 m', 'Gomina': '120 gomina' } },
    { in: { deger: '100', yon: 'km' }, out: { 'Deniz mili': '53,9957 nmi', 'Kara mili': '62,1371 mil' } },
    { in: { deger: '1', yon: 'nmi' }, out: { 'Kilometre': '1,852 km', 'Metre': '1.852 m', 'Kara mili': '1,1508 mil' } },
    { in: { deger: '200', yon: 'nmi' }, out: { 'Kilometre': '370,4 km' } },
    { in: { deger: '1,852', yon: 'km' }, out: { 'Deniz mili': '1 nmi', 'Gomina': '10 gomina' } },
    { in: { deger: '60', yon: 'nmi' }, out: { 'Kilometre': '111,12 km' } },
    { in: { deger: '0,1', yon: 'nmi' }, out: { 'Metre': '185,2 m', 'Gomina': '1 gomina' } },
    { in: { deger: 'mil', yon: 'nmi' }, error: true },
    { in: { deger: '-2', yon: 'km' }, error: true },
  ],
  howto: [
    '"Mesafe" alanına deniz mili ya da kilometre cinsinden değeri yazın.',
    '"Çeviri yönü" listesinden hangi birimden hangisine geçeceğinizi seçin.',
    '"Çevir" düğmesine basın; ilk satırda aradığınız karşılığı, altında metre, kara mili ve gomina değerlerini görürsünüz.',
    'Rota planı ya da seyir defteri notu için sonuçları "Sonucu kopyala" düğmesiyle alın.',
  ],
  sections: [
    { h: 'Deniz mili nedir, nereden gelir?', p: [
      'Deniz mili, kökeni yerkürenin geometrisine dayanan bir uzunluk birimidir. Bir meridyen boyunca ölçülen <strong>bir dakikalık enlem yayı</strong> yaklaşık bir deniz milidir. Bir derece 60 dakika olduğundan, bir enlem derecesi yaklaşık 60 deniz mili eder. Bu ilişki sayesinde denizci, haritanın kenarındaki enlem ölçeğini doğrudan mesafe cetveli olarak kullanabilir; pergeli iki nokta arasına açıp enlem ölçeğine taşımak yeterlidir.',
      'Dünya tam küre olmadığı için bir dakikalık yayın uzunluğu enleme göre biraz değişir. Bu belirsizliği gidermek üzere 1929\'da toplanan uluslararası hidrografi konferansında deniz mili <strong>tam olarak 1.852 metre</strong> olarak sabitlenmiştir. Bugün denizcilikte, havacılıkta ve deniz hukukunda kullanılan değer budur.',
    ] },
    { h: 'Çeviri formülü', p: [
      'Deniz milinden kilometreye: <strong>km = deniz mili × 1,852</strong>. Kilometreden deniz miline: <strong>deniz mili = km ÷ 1,852</strong>; bu, kilometreyi yaklaşık 0,539957 ile çarpmakla eşdeğerdir.',
      'Akıldan yaklaşık hesap için deniz milini ikiyle çarpıp sonuçtan yüzde 7 kadar düşebilirsiniz: 50 deniz mili için 100 − 7 = 93 km (gerçek değer 92,6 km). Tersine, kilometrenin yarısından biraz fazlası deniz milini verir: 100 km yaklaşık 54 deniz milidir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 – Karasuları genişliği:</strong> Deniz hukukunda sıkça anılan 12 deniz mili kaç kilometredir? 12 × 1,852 = 22,224 km, yani 22.224 metre. Araç bu mesafenin 120 gomina ettiğini de gösterir.',
      '<strong>Örnek 2 – Kilometreden deniz miline:</strong> Kıyıdan 100 km açıktaki bir nokta kaç deniz mili uzaktadır? 100 ÷ 1,852 = 53,9957 deniz mili. Aynı mesafe 62,1371 kara milidir; iki "mil" arasındaki farkı bu örnek açıkça gösterir.',
      '<strong>Örnek 3 – Bir enlem derecesi:</strong> 60 deniz mili 60 × 1,852 = 111,12 km eder. Haritada bir enlem derecesi kuzeye ya da güneye gitmek yaklaşık bu kadar yol demektir.',
      '<strong>Örnek 4 – Seyir süresi:</strong> 6 knot hızla giden bir yelkenli saatte 6 deniz mili, yani 11,112 km yol alır. 30 deniz millik bir geçiş bu hızla 5 saat sürer.',
    ] },
    { h: 'Knot ile ilişkisi', p: [
      'Knot (deniz mili/saat), deniz milinden türeyen hız birimidir: bir saatte bir deniz mili yol alan tekne 1 knot hız yapıyordur. Bu yüzden 1 knot tam olarak 1,852 km/saat eder. Hava ve deniz tahmin raporlarında rüzgâr hızı, gemi ve uçak göstergelerinde seyir hızı knot ile verilir. Mesafeyi deniz mili, hızı knot olarak tutmak süre hesabını kolaylaştırır: mesafe ÷ hız doğrudan saati verir.',
    ] },
    { h: 'Deniz mili nerelerde kullanılır?', ul: [
      '<strong>Amatör ve profesyonel denizcilik:</strong> Seyir haritaları, rota planları, fener menzilleri ve tekne seyir defterleri deniz mili ile tutulur. Türkiye\'de amatör denizci belgesi eğitimlerinde de mesafeler bu birimle anlatılır.',
      '<strong>Havacılık:</strong> Uçuş planlarında mesafe deniz mili, hız knot olarak ifade edilir; pist görüş mesafesi gibi kısa ölçüler ise metreyle verilir.',
      '<strong>Deniz hukuku:</strong> Karasuları, bitişik bölge ve münhasır ekonomik bölge gibi deniz yetki alanlarının genişlikleri deniz mili ile tanımlanır. 200 deniz mili 370,4 km\'ye karşılık gelir.',
      '<strong>Balıkçılık ve dalış:</strong> Av sahalarının kıyıya uzaklığı, dalış noktalarına ulaşım mesafesi çoğunlukla mil olarak söylenir.',
      '<strong>Meteoroloji:</strong> Denizcilere yönelik hava raporlarında görüş mesafesi deniz mili olarak bildirilebilir.',
    ] },
    { h: 'Gomina ve diğer alt birimler', p: [
      'Deniz milinin onda birine <strong>gomina</strong> denir; 185,2 metre eder. Demirleme mesafesi, iki tekne arasındaki açıklık ya da bir tehlikeye uzaklık gibi kısa ölçülerde kullanılır. Araç sonuç kutusunda gomina karşılığını da verir: 1,5 deniz mili 15 gominadır. Derinlik için kullanılan kulaç ise ayrı bir birimdir ve bu hesaba dâhil değildir.',
    ] },
    { h: 'Hızlı başvuru ve uyarılar', ul: [
      '<strong>1 deniz mili</strong> = 1,852 km = 1,1508 kara mili',
      '<strong>3 deniz mili</strong> = 5,556 km',
      '<strong>6 deniz mili</strong> = 11,112 km',
      '<strong>12 deniz mili</strong> = 22,224 km',
      '<strong>24 deniz mili</strong> = 44,448 km',
      '<strong>100 deniz mili</strong> = 185,2 km',
      '<strong>200 deniz mili</strong> = 370,4 km',
      '<strong>1 km</strong> = 0,54 deniz mili',
    ], p: [
      'Deniz mili için tek bir resmî simge yoktur; "nmi", "NM" ve denizcilik haritalarında "M" kısaltmaları kullanılır. Küçük harfli "nm" ise nanometre anlamına geldiğinden karışıklığa yol açabilir. Bu araç birim çevirisi yapar; iki koordinat arasındaki mesafeyi hesaplamaz ve seyir planlamasının yerini tutmaz. Gerçek seyirde güncel harita, resmî yayınlar ve seyir cihazları esas alınmalıdır.',
    ] },
  ],
  faq: [
    ['1 deniz mili kaç kilometredir?', '1 deniz mili tam olarak 1,852 kilometre, yani 1.852 metredir. Bu değer uluslararası düzeyde kabul edilmiş tanımdır.'],
    ['1 kilometre kaç deniz milidir?', '1 kilometre yaklaşık 0,54 deniz milidir (0,539957). 10 kilometre 5,3996 deniz mili, 100 kilometre 53,9957 deniz mili eder.'],
    ['Deniz mili neden kara milinden uzundur?', 'İki birim farklı kökenlere sahiptir. Kara mili 5.280 feet olarak tanımlanır ve 1,609344 km eder. Deniz mili ise yerkürenin bir dakikalık enlem yayına dayanır ve 1,852 km\'dir. Bir deniz mili yaklaşık 1,1508 kara miline eşittir.'],
    ['12 deniz mili kaç km eder?', '12 deniz mili 22,224 kilometredir. 6 deniz mili 11,112 km, 24 deniz mili 44,448 km eder.'],
    ['1 knot kaç km/saattir?', '1 knot, saatte bir deniz mili demektir ve 1,852 km/saate eşittir. 10 knot 18,52 km/saat, 20 knot 37,04 km/saat eder.'],
    ['Gomina kaç metredir?', 'Gomina, deniz milinin onda biridir ve 185,2 metre eder. Araç, girdiğiniz mesafenin kaç gomina olduğunu sonuç kutusunda ayrıca gösterir.'],
    ['Haritada enlem dakikası ile deniz mili aynı mıdır?', 'Pratikte evet: bir dakikalık enlem yayı yaklaşık bir deniz milidir ve denizciler haritanın enlem ölçeğini mesafe ölçmek için kullanır. Boylam dakikaları ise ekvatordan uzaklaştıkça kısaldığı için bu amaçla kullanılamaz.'],
    ['Girdiğim mesafe bilgisi bir yere kaydediliyor mu?', 'Hayır. Çeviri tarayıcınızda yapılır; yazdığınız değer cihazınızdan dışarı çıkmaz. Sayfa bir kez yüklendikten sonra denizde bağlantı olmasa da kullanılabilir.'],
  ],
  related: ['km-mil-cevir', 'knot-kmh-cevir', 'dms-ondalik-derece-cevir', 'fersah-km-cevir', 'metre-feet-cevir', 'birim-donustur'],
};
