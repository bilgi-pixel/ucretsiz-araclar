export default {
  slug: 'kmh-mph-cevir',
  title: 'km/s Mil/s (km/h – mph) Çevirici',
  h1Tail: 'km/h ↔ mph',
  pageTitle: 'km/h mph Çevirici – Kilometre/Saat ve Mil/Saat Hız Çevirme',
  description: 'Kilometre/saat hızını mil/saate, mph değerini km/h\'ye çevirin. 1 mph = 1,609344 km/h tanımıyla çalışır; m/s ve knot karşılığını da gösterir.',
  card: 'km/h değerini mph\'ye, mph değerini km/h\'ye çevirin; hız göstergesi, hız sınırı ve koşu bandı için m/s ve knot ile birlikte.',
  category: 'birim',
  keywords: ['km/h mph çevirme', 'mph kaç km', 'mil saat kilometre saat', '60 mph kaç km', 'kmh mph çevirici', 'mil/saat hesaplama', '100 km/h kaç mph', 'hız birimi çevirme'],
  lead: 'Bir hızı kilometre/saatten mil/saate ya da mil/saatten kilometre/saate çevirin. Hesap, kara milinin tam tanımı olan <strong>1 mph = 1,609344 km/h</strong> eşitliğine dayanır; sonuç metre/saniye ve knot olarak da verilir.',
  button: 'Çevir',
  inputs: [
    { id: 'hiz', label: 'Hız', type: 'number', placeholder: 'Örn. 100' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['kmh', 'km/h → mph'], ['mph', 'mph → km/h']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.hiz, 'Hız');
    const MIL = 1.609344; // 1 kara mili = 1,609344 km (tam tanım)
    const kmh = v.yon === 'mph' ? x * MIL : x;
    const mph = kmh / MIL;
    const f = (n) => h.sig(n, 7);
    return {
      rows: [
        v.yon === 'mph' ? ['Kilometre/saat', f(kmh) + ' km/h'] : ['Mil/saat', f(mph) + ' mph'],
        v.yon === 'mph' ? ['Mil/saat', f(mph) + ' mph'] : ['Kilometre/saat', f(kmh) + ' km/h'],
        ['Metre/saniye', f(kmh / 3.6) + ' m/s'],
        ['Knot', f(kmh / 1.852) + ' kn'],
      ],
      note: '1 mil = 1,609344 km (uluslararası kara mili). Sonuçlar yedi anlamlı basamağa yuvarlanır.',
    };
  },
  cases: [
    { in: { hiz: '100', yon: 'kmh' }, out: { 'Mil/saat': '62,13712 mph', 'Metre/saniye': '27,77778 m/s' } },
    { in: { hiz: '60', yon: 'mph' }, out: { 'Kilometre/saat': '96,56064 km/h', 'Mil/saat': '60 mph' } },
    { in: { hiz: '1', yon: 'mph' }, out: { 'Kilometre/saat': '1,609344 km/h' } },
    { in: { hiz: '120', yon: 'kmh' }, out: { 'Mil/saat': '74,56454 mph' } },
    { in: { hiz: '70', yon: 'mph' }, out: { 'Kilometre/saat': '112,6541 km/h' } },
    { in: { hiz: '36', yon: 'kmh' }, out: { 'Metre/saniye': '10 m/s' } },
    { in: { hiz: '0', yon: 'kmh' }, out: { 'Mil/saat': '0 mph' } },
    { in: { hiz: 'hızlı', yon: 'kmh' }, error: true },
    { in: { hiz: '-20', yon: 'mph' }, error: true },
  ],
  howto: [
    '"Hız" alanına çevirmek istediğiniz değeri yazın. Ondalık kısım için virgül ya da nokta kullanabilirsiniz (örneğin 62,5).',
    '"Çeviri yönü" listesinden elinizdeki değerin birimine göre "km/h → mph" ya da "mph → km/h" seçeneğini işaretleyin.',
    '"Çevir" düğmesine basın. İlk satırda aradığınız karşılık, altında metre/saniye ve knot değerleri görünür.',
    'Sonuçları başka bir yerde kullanacaksanız "Sonucu kopyala" düğmesiyle tüm satırları panoya alın.',
  ],
  sections: [
    { h: 'km/h ve mph arasındaki fark', p: [
      'Kilometre/saat (km/h, gündelik yazımda km/s), bir saatte kaç kilometre yol alındığını gösterir ve Türkiye dahil dünyanın büyük bölümünde trafik levhalarında, araç göstergelerinde ve hava durumu bültenlerinde kullanılır. Mil/saat (mph, "miles per hour") ise aynı şeyi mil cinsinden söyler. Amerika Birleşik Devletleri ve Birleşik Krallık başta olmak üzere bazı ülkelerde hız sınırları ve araç göstergeleri mph üzerinden okunur.',
      'İki birim arasındaki bağ, uzunluk birimlerinden gelir. Uluslararası kara mili tam olarak 1.609,344 metre kabul edildiği için 1 mph de tam olarak 1,609344 km/h eder. Zaman birimi her ikisinde de saat olduğundan çeviri tek bir çarpma ya da bölmeden ibarettir; arada yaklaşık bir katsayı yoktur.',
    ] },
    { h: 'Çeviri formülü ve çözümlü örnekler', p: [
      'Mil/saatten kilometre/saate geçmek için değeri 1,609344 ile çarparsınız: <strong>km/h = mph × 1,609344</strong>. Tersine, kilometre/saatten mil/saate geçmek için aynı sayıya bölersiniz: <strong>mph = km/h ÷ 1,609344</strong>. Bölmek yerine 0,621371 ile çarpmak da aynı sonucu verir.',
      '<strong>Örnek 1:</strong> Otoyolda 120 km/h ile gidiyorsunuz. 120 ÷ 1,609344 = 74,56 mph. Yani mph göstergeli bir araçta ibre 75\'in hemen altında durur.',
      '<strong>Örnek 2:</strong> Kiraladığınız aracın göstergesi 60 mph gösteriyor. 60 × 1,609344 = 96,56 km/h. Bu, Türkiye\'deki şehirlerarası yollarda alışık olduğunuz 90–100 km/h aralığına denk gelir.',
      '<strong>Örnek 3:</strong> 100 km/h, 62,14 mph eder. Otomobil dergilerindeki "0–100 km/h" hızlanma süresi ile İngilizce kaynaklardaki "0–60 mph" süresinin aynı şey olmamasının nedeni budur: 60 mph yaklaşık 96,6 km/h olduğundan 0–60 süresi her zaman biraz daha kısadır.',
    ] },
    { h: 'Akıldan hızlı çevirme yöntemleri', p: [
      'Hesap makinesi yokken en pratik yol, mph değerini 1,6 ile çarpmaktır: değerin kendisini, yarısını ve onda birini toplarsınız. 50 mph için 50 + 25 + 5 = 80 km/h bulunur; gerçek değer 80,47 km/h\'dir. Ters yönde km/h değerini 0,6 ile çarpmak yeterince yakın sonuç verir: 90 km/h için 54 mph, gerçek değer 55,92 mph.',
      'Bir başka kısayol 5\'e 8 oranıdır: 5 mil yaklaşık 8 kilometredir. Dolayısıyla 50 mph yaklaşık 80 km/h, 25 mph yaklaşık 40 km/h olur. Bu kısayollar yolda fikir edinmek için iyidir; hız sınırına yakın seyrederken birkaç km/h\'lik fark ceza anlamına gelebileceğinden kesin değer için bu sayfadaki hesabı kullanın.',
    ] },
    { h: 'Nerelerde işinize yarar?', ul: [
      '<strong>Yurt dışında araç kullanma:</strong> Hız levhası mph olan bir ülkede km/h göstergeli araçla, ya da tam tersi bir durumda hangi ibre değerinde kalmanız gerektiğini önceden hesaplayabilirsiniz.',
      '<strong>İthal ve ikinci el araçlar:</strong> Göstergesi mph taksimatlı araçlarda ve motosikletlerde ibrenin gösterdiği değeri km/h\'ye çevirmek gerekir. Aynı durum kilometre sayacı için de geçerlidir; o değer mil cinsindendir.',
      '<strong>Koşu bandı ve bisiklet bilgisayarı:</strong> Bazı spor aletleri hızı mph gösterir. 6 mph, 9,66 km/h; 8 mph, 12,87 km/h; 10 mph ise 16,09 km/h\'dir.',
      '<strong>Hava durumu ve fırtına haberleri:</strong> İngilizce kaynaklarda rüzgâr hızı çoğunlukla mph verilir. 75 mph\'lik rüzgâr 120,7 km/h eder.',
      '<strong>Motor sporları ve oyunlar:</strong> Yarış yayınlarında ve sürüş simülasyonlarında 200 mph gibi değerler geçer; bu 321,87 km/h demektir.',
    ] },
    { h: 'Sık kullanılan değerler tablosu', ul: [
      '<strong>20 mph</strong> = 32,19 km/h',
      '<strong>30 mph</strong> = 48,28 km/h',
      '<strong>40 mph</strong> = 64,37 km/h',
      '<strong>50 mph</strong> = 80,47 km/h',
      '<strong>55 mph</strong> = 88,51 km/h',
      '<strong>65 mph</strong> = 104,61 km/h',
      '<strong>70 mph</strong> = 112,65 km/h',
      '<strong>80 mph</strong> = 128,75 km/h',
      '<strong>100 mph</strong> = 160,93 km/h',
      '<strong>50 km/h</strong> = 31,07 mph',
      '<strong>90 km/h</strong> = 55,92 mph',
      '<strong>110 km/h</strong> = 68,35 mph',
      '<strong>130 km/h</strong> = 80,78 mph',
      '<strong>140 km/h</strong> = 86,99 mph',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'En yaygın karışıklık kara mili ile deniz milinin aynı sanılmasıdır. Deniz mili 1.852 metredir ve saatteki deniz mili "knot" olarak adlandırılır; mph ise 1.609,344 metrelik kara milini esas alır. Gemi ve uçak hızlarını çevirirken mph değil knot kullanıldığına dikkat edin. Araç bu yüzden sonucu knot olarak da gösterir.',
      'İkinci hata, kısaltmaların karıştırılmasıdır: <code>mph</code> hız, <code>mpg</code> ise yakıt tüketimi (galon başına mil) birimidir. Ayrıca Türkçede "km/s" yazımı kilometre/saat anlamında kullanılsa da bilimsel metinlerde "s" saniyenin simgesidir ve km/s, saniyede kilometre demektir. Karışıklığı önlemek için teknik yazılarda km/h yazımı tercih edilir.',
      'Son olarak, araç göstergelerinin gerçek hızdan bir miktar yüksek gösterebildiğini unutmayın. Birim çevirisi matematik olarak kesindir, ancak ibreden okuduğunuz değerin kendisi lastik ölçüsüne ve gösterge toleransına bağlı olarak sapabilir.',
    ] },
  ],
  faq: [
    ['1 mph kaç km/h eder?', '1 mph tam olarak 1,609344 km/h eder. Bu değer, kara milinin 1.609,344 metre olarak tanımlanmasından gelir ve yuvarlanmış bir katsayı değildir.'],
    ['100 km/h kaç mph eder?', '100 km/h, 62,14 mph eder (100 ÷ 1,609344 = 62,13712). Ters yönde 100 mph ise 160,93 km/h\'dir.'],
    ['60 mph kaç kilometre hız yapar?', '60 mph, 96,56 km/h\'ye karşılık gelir. İngilizce otomobil incelemelerindeki 0–60 mph hızlanma değeri bu nedenle 0–100 km/h değerinden biraz daha kısa süredir.'],
    ['km/s ile km/h aynı şey mi?', 'Gündelik Türkçede evet; "km/s" yazımındaki "s" saat anlamında kullanılır. Uluslararası birim sisteminde ise "s" saniyeyi, "h" saati gösterir. Bu sayfadaki bütün değerler kilometre/saat anlamındadır.'],
    ['mph ile knot arasındaki fark nedir?', 'mph kara milini (1,609344 km), knot ise deniz milini (1,852 km) temel alır. 1 knot yaklaşık 1,151 mph\'dir. Denizcilikte ve havacılıkta knot, kara trafiğinde mph kullanılır.'],
    ['Hangi ülkelerde hız mph ile ölçülür?', 'Karayolunda mph kullanan en bilinen ülkeler Amerika Birleşik Devletleri ve Birleşik Krallık\'tır. Seyahat edeceğiniz ülkenin levhalarında hangi birimin geçerli olduğunu yola çıkmadan önce resmî kaynaklardan kontrol etmeniz en doğrusudur.'],
    ['Sonuçtaki m/s değeri ne işe yarar?', 'Metre/saniye fizik problemlerinde ve mühendislik hesaplarında kullanılan temel hız birimidir. km/h değerini 3,6\'ya bölerek bulunur; 100 km/h saniyede 27,78 metre yol almak demektir. Bu sayı, takip mesafesini düşünürken oldukça öğreticidir.'],
    ['Yazdığım hız değeri kaydediliyor mu?', 'Hayır. Hesap yalnızca tarayıcınızın içinde yapılır; yazdığınız değer hiçbir sunucuya gönderilmez ve saklanmaz. Sayfa açıldıktan sonra bağlantı kesilse bile çevirici çalışmaya devam eder.'],
  ],
  related: ['km-mil-cevir', 'ms-kmh-cevir', 'knot-kmh-cevir', 'mach-kmh-cevir', 'yakit-tuketimi-birim-cevir'],
};
