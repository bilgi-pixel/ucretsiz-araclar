export default {
  slug: 'mil-yarda-cevir',
  title: 'Mil Yarda Feet Çevirici',
  h1Tail: 'mi ↔ yd ↔ ft',
  pageTitle: 'Mil Yarda Feet Çevirici – Mili Yardaya ve Feete Çevirme',
  description: 'Mili yardaya ve feete, yardayı ya da feeti mile çevirin. 1 mil = 1.760 yarda = 5.280 feet eşitliğiyle çalışır; kilometre ve metre karşılığı da gösterilir.',
  card: 'Mil, yarda ve feet arasında çeviri yapın; kilometre ve metre karşılığıyla birlikte tek ekranda.',
  category: 'birim',
  keywords: ['mil yarda çevirme', '1 mil kaç yarda', '1 mil kaç feet', 'yarda feet çevirici', 'yarda kaç feet', 'feet mil dönüştürme', 'mil yarda feet hesaplama'],
  lead: 'İngiliz-Amerikan uzunluk birimleri olan mil, yarda ve feet arasında çeviri yapın. Araç <strong>1 mil = 1.760 yarda = 5.280 feet</strong> eşitliğini kullanır ve sonucu kilometre ile metre olarak da verir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Uzunluk', type: 'number', placeholder: 'Örn. 1' },
    { id: 'birim', label: 'Girdiğiniz birim', type: 'select', options: [['mil', 'Mil (mi)'], ['yarda', 'Yarda (yd)'], ['feet', 'Feet (ft)']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Uzunluk');
    const FT_M = 0.3048;
    const ft = v.birim === 'yarda' ? x * 3 : v.birim === 'feet' ? x : x * 5280;
    const satirlar = {
      mil: ['Mil', h.fmt(ft / 5280, 6) + ' mil'],
      yarda: ['Yarda', h.fmt(ft / 3, 4) + ' yd'],
      feet: ['Feet', h.fmt(ft, 4) + ' ft'],
    };
    const kaynak = satirlar[v.birim] ? v.birim : 'mil';
    const sira = ['mil', 'yarda', 'feet'].filter((b) => b !== kaynak);
    const m = ft * FT_M;
    return {
      rows: [
        satirlar[sira[0]],
        satirlar[sira[1]],
        satirlar[kaynak],
        ['Kilometre', h.fmt(m / 1000, 6) + ' km'],
        ['Metre', h.fmt(m, 4) + ' m'],
      ],
      note: '1 mil = 1.760 yd = 5.280 ft = 1,609344 km; 1 yd = 3 ft = 0,9144 m; 1 ft = 0,3048 m (tam tanımlar). Buradaki mil kara milidir; deniz mili farklı bir birimdir.',
    };
  },
  cases: [
    { in: { deger: '1', birim: 'mil' }, out: { 'Yarda': '1.760 yd', 'Feet': '5.280 ft', 'Kilometre': '1,609344 km' } },
    { in: { deger: '100', birim: 'yarda' }, out: { 'Mil': '0,056818 mil', 'Feet': '300 ft', 'Metre': '91,44 m' } },
    { in: { deger: '5280', birim: 'feet' }, out: { 'Mil': '1 mil', 'Yarda': '1.760 yd' } },
    { in: { deger: '1760', birim: 'yarda' }, out: { 'Mil': '1 mil', 'Feet': '5.280 ft', 'Metre': '1.609,344 m' } },
    { in: { deger: '26,21875', birim: 'mil' }, out: { 'Yarda': '46.145 yd', 'Feet': '138.435 ft', 'Kilometre': '42,194988 km' } },
    { in: { deger: '3', birim: 'feet' }, out: { 'Yarda': '1 yd', 'Metre': '0,9144 m' } },
    { in: { deger: '0,5', birim: 'mil' }, out: { 'Yarda': '880 yd', 'Feet': '2.640 ft' } },
    { in: { deger: '-1', birim: 'mil' }, error: true },
    { in: { deger: 'bir', birim: 'yarda' }, error: true },
  ],
  howto: [
    '"Uzunluk" alanına elinizdeki değeri yazın; ondalık için virgül ya da nokta kullanabilirsiniz.',
    '"Girdiğiniz birim" listesinden bu değerin mil mi, yarda mı, feet mi olduğunu seçin.',
    '"Çevir" düğmesine basın. Diğer iki birimdeki karşılık en üstte, ardından kilometre ve metre değeri gösterilir.',
    'İhtiyacınız olan satırı not alın ya da "Sonucu kopyala" ile tümünü panoya aktarın.',
  ],
  sections: [
    { h: 'Mil, yarda ve feet nasıl birimlerdir?', p: [
      'Bu üç birim, ABD\'de gündelik hayatta ve Birleşik Krallık\'ta yol işaretlerinde hâlâ kullanılan İngiliz uzunluk sisteminin halkalarıdır. En küçüğü feet (tekili foot, Türkçede "ayak" ya da "kadem") 12 inçtir. Üç feet bir yarda eder. Yarda, kabaca bir adım uzunluğundadır ve bir metreden biraz kısadır. Mil ise uzun mesafeler içindir: 1.760 yarda, yani 5.280 feet.',
      '1959\'da İngilizce konuşan ülkeler arasında varılan anlaşmayla yarda tam olarak 0,9144 metre olarak tanımlanmıştır. Bundan feet için 0,3048 metre ve mil için 1.609,344 metre değerleri çıkar. Bu değerler yaklaşık değil tam olduğundan, metrik sisteme geçişte yuvarlama dışında hata oluşmaz.',
    ] },
    { h: 'Çeviri formülleri', p: [
      'Sistemin içindeki oranlar tam sayılardır, bu yüzden çeviri yalnızca çarpma ve bölmedir:',
    ], ul: [
      '<strong>yarda = mil × 1.760</strong> ve <strong>mil = yarda ÷ 1.760</strong>',
      '<strong>feet = mil × 5.280</strong> ve <strong>mil = feet ÷ 5.280</strong>',
      '<strong>feet = yarda × 3</strong> ve <strong>yarda = feet ÷ 3</strong>',
      '<strong>metre = feet × 0,3048</strong>; kilometre için sonucu 1.000\'e bölün',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Bir Amerikan futbolu sahasının oyun alanı 100 yarda uzunluğundadır. Bu kaç feet ve kaç metredir? 100 × 3 = 300 feet; 100 × 0,9144 = 91,44 metre. Mil olarak 100 ÷ 1.760 ≈ 0,056818 mil eder.',
      '<strong>Örnek 2:</strong> Maraton mesafesi 26 mil 385 yardadır. 385 yarda, 385 ÷ 1.760 = 0,21875 mil olduğundan toplam 26,21875 mildir. Araca bu değeri mil olarak yazdığınızda 46.145 yarda, 138.435 feet ve 42,194988 kilometre sonucunu alırsınız; herkesin bildiği 42,195 km buradan gelir.',
      '<strong>Örnek 3:</strong> Bir navigasyon uygulaması "yarım mil sonra sağa dönün" diyor. 0,5 × 1.760 = 880 yarda, 0,5 × 5.280 = 2.640 feet; metrik karşılığı yaklaşık 805 metredir.',
    ] },
    { h: 'Bu birimlerle nerede karşılaşırsınız?', p: [
      'ABD ve Birleşik Krallık\'ta araç kiralayan ya da yol tarifi okuyan herkes mil ve yarda ile karşılaşır: hız sınırları mil/saat, çıkış tabelaları mil ve yarda cinsindendir. Koşu ve yürüyüş uygulamalarında tempo çoğu zaman "dakika/mil" olarak ayarlanabilir. Golfte delik uzunlukları, Amerikan futbolunda saha çizgileri yarda ile ölçülür. Kumaş ve halı ticaretinde yarda, uzunluk ölçüsü olarak hâlâ yaygındır.',
      'Feet ise yükseklik ve irtifada dünya çapında kullanılır. Sivil havacılıkta uçuş seviyeleri feet ile verilir; 35.000 feet yaklaşık 10.668 metredir. Dağcılık kaynaklarında, dalış tablolarında, tekne ve yat boylarında, gayrimenkul ilanlarında ve film-dizi altyazılarında da feet sık geçer. Türkiye\'de yurt dışı kaynaklı bir projeyi, teknik çizimi ya da ürün kataloğunu okurken bu üç birimi metrik sisteme çevirmek gerekir.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>1 feet</strong> = 0,3048 m = 12 inç',
      '<strong>1 yarda</strong> = 3 feet = 0,9144 m',
      '<strong>100 yarda</strong> = 300 feet = 91,44 m',
      '<strong>1/4 mil</strong> = 440 yarda = 1.320 feet ≈ 402,3 m',
      '<strong>1/2 mil</strong> = 880 yarda = 2.640 feet ≈ 804,7 m',
      '<strong>1 mil</strong> = 1.760 yarda = 5.280 feet = 1.609,344 m',
      '<strong>10 mil</strong> = 17.600 yarda = 52.800 feet ≈ 16,09 km',
    ] },
    { h: 'Kara mili, deniz mili ve diğer karışıklıklar', p: [
      'Bu sayfadaki mil, "kara mili" ya da "uluslararası mil" olarak bilinen 1.609,344 metrelik birimdir. Denizcilikte ve havacılıkta kullanılan <strong>deniz mili</strong> ise 1.852 metredir ve bambaşka bir tanıma dayanır; ikisi arasındaki fark yaklaşık yüzde 15\'tir. Bir harita ya da rota verisi okurken hangi milin kastedildiğini mutlaka kontrol edin.',
      'ABD\'de arazi ölçümlerinde uzun yıllar kullanılan "survey" mili ve feeti, uluslararası değerlerden milyonda iki oranında farklıdır. Bu fark gündelik işlerde önemsizdir, ancak eski tapu ve harita verileriyle çalışan uzmanlar için anlamlı olabilir; araç uluslararası tanımı kullanır. Bir başka yaygın hata, yardayı metreyle eşit saymaktır. Aradaki fark yüzde 8,6\'dır: 100 yarda 91,44 metredir, 100 metre ise yaklaşık 109,36 yarda eder. Yüzme havuzlarında "yarda havuzu" ile "metre havuzu" derecelerinin karşılaştırılamamasının nedeni budur.',
    ] },
    { h: 'Duyarlılık ve sınırlar', p: [
      'Araç negatif uzunluk kabul etmez. Mil değeri altı, yarda, feet ve metre değerleri dört ondalık basamağa kadar gösterilir. Büyük sayılarda binlik ayırıcı olarak nokta, ondalık ayırıcı olarak virgül kullanılır: "1.760 yd" bin yedi yüz altmış yarda demektir. Feet değerinin kesirli kısmını inçe çevirmek isterseniz ondalık bölümü 12 ile çarpmanız yeterlidir; örneğin 5,5 feet, 5 feet 6 inçtir.',
    ] },
  ],
  faq: [
    ['1 mil kaç yardadır?', '1 mil tam olarak 1.760 yardadır. Tersinden bakıldığında 1 yarda yaklaşık 0,000568 mildir.'],
    ['1 mil kaç feettir?', '1 mil 5.280 feettir. Bir yarda 3 feet olduğundan 1.760 × 3 işlemiyle de aynı sonuca ulaşılır.'],
    ['1 yarda kaç feet ve kaç metredir?', '1 yarda 3 feet, yani 36 inçtir. Metrik karşılığı tam olarak 0,9144 metredir; bir metreden yaklaşık 8,6 santimetre kısadır.'],
    ['Feet ile foot arasında fark var mı?', 'Hayır, aynı birimdir. İngilizcede tekili "foot", çoğulu "feet" olarak söylenir. Türkçede genellikle her iki durumda da "feet" ya da "fit" denir; eski karşılığı "kadem"dir. Simgesi ft ya da tek tırnak işaretidir.'],
    ['Bu araç deniz milini de çeviriyor mu?', 'Hayır. Buradaki mil 1.609,344 metrelik kara milidir. Deniz mili 1.852 metredir ve ayrı bir çevirici gerektirir; ikisini karıştırmak rotalarda ciddi farka yol açar.'],
    ['Maraton neden 42,195 kilometredir?', 'Çünkü mesafe İngiliz birimleriyle 26 mil 385 yarda olarak belirlenmiştir. Bu, 46.145 yarda eder ve 0,9144 ile çarpıldığında 42.194,988 metre, yani yuvarlanmış hâliyle 42,195 kilometre bulunur.'],
    ['Feet değerini metreye kafadan nasıl çevirebilirim?', 'Feet değerini 3\'e bölmek kaba bir tahmin verir; daha yakın sonuç için 0,3 ile çarpın. Örneğin 1.000 feet yaklaşık 300 metredir; tam değeri 304,8 metredir. Kesin iş için araçtaki sonucu kullanın.'],
    ['Girdiğim değerler bir yere kaydediliyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda yapılır; yazdığınız sayı sunucuya gönderilmez ve saklanmaz. Sayfa açıldıktan sonra internet olmadan da çalışır.'],
  ],
  related: ['km-mil-cevir', 'metre-yarda-cevir', 'metre-feet-cevir', 'deniz-mili-km-cevir', 'cm-inc-cevir', 'kmh-mph-cevir'],
};
