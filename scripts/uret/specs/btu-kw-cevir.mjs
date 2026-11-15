export default {
  slug: 'btu-kw-cevir',
  title: 'BTU Kilovat Çevirici',
  h1Tail: 'BTU/h ↔ kW',
  pageTitle: 'BTU Kilovat Çevirici – BTU/h\'den kW\'ye, kW\'den BTU\'ya Çevirme',
  description: 'Klima ve ısıtıcı kapasitesini BTU/saatten kilovata ya da kilovattan BTU/saate çevirin. Watt, kcal/saat ve soğutma tonu karşılıklarını da anında görün.',
  card: 'Klima kapasitesini BTU/h\'den kW\'ye ya da kW\'den BTU/h\'ye çevirin; watt, kcal/h ve soğutma tonu karşılığıyla.',
  category: 'birim',
  keywords: ['btu kw çevirme', '12000 btu kaç kw', 'kw btu dönüştürme', 'btu kilovat', '1 kw kaç btu', 'klima btu kw', 'btu/h kw hesaplama', '24000 btu kaç kw'],
  lead: 'Klima, ısı pompası ve ısıtıcıların kapasitesini BTU/saat (BTU/h) ile kilovat (kW) arasında çevirin. Araç <strong>1 kW ≈ 3412,14 BTU/h</strong> eşitliğini kullanır ve sonucu watt, kcal/saat ve soğutma tonu olarak da gösterir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Kapasite', type: 'number', placeholder: 'Örn. 12000', hint: 'Binlik ayraç kullanmadan yazın (12000). Tek noktalı yazım ondalık sayılır: 12.000 = 12.' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['btu', 'BTU/h → Kilovat'], ['kw', 'Kilovat → BTU/h']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Kapasite');
    const W_BTUH = 1055.05585262 / 3600; // 1 BTU/h kaç watt
    const w = v.yon === 'kw' ? x * 1000 : x * W_BTUH;
    const btu = w / W_BTUH;
    const kwRow = ['Kilovat', h.fmt(w / 1000, 3) + ' kW'];
    const btuRow = ['BTU/saat', h.fmt(btu, 1) + ' BTU/h'];
    return {
      rows: [
        ...(v.yon === 'kw' ? [btuRow, kwRow] : [kwRow, btuRow]),
        ['Watt', h.fmt(w, 2) + ' W'],
        ['Kilokalori/saat', h.fmt(w * 3.6 / 4.1868, 0) + ' kcal/h'],
        ['Soğutma tonu', h.fmt(btu / 12000, 3) + ' RT'],
      ],
      note: 'Sonuç ısıl kapasitedir; cihazın şebekeden çektiği elektrik gücü değildir. 1 BTU = 1055,056 J alınmıştır.',
    };
  },
  cases: [
    { in: { deger: '12000', yon: 'btu' }, out: { 'Kilovat': '3,517 kW', 'Watt': '3.516,85 W', 'Soğutma tonu': '1 RT', 'Kilokalori/saat': '3.024 kcal/h' } },
    { in: { deger: '1', yon: 'kw' }, out: { 'BTU/saat': '3.412,1 BTU/h', 'Watt': '1.000 W' } },
    { in: { deger: '9000', yon: 'btu' }, out: { 'Kilovat': '2,638 kW' } },
    { in: { deger: '18000', yon: 'btu' }, out: { 'Kilovat': '5,275 kW' } },
    { in: { deger: '24000', yon: 'btu' }, out: { 'Kilovat': '7,034 kW', 'Soğutma tonu': '2 RT' } },
    { in: { deger: '3,5', yon: 'kw' }, out: { 'BTU/saat': '11.942,5 BTU/h', 'Soğutma tonu': '0,995 RT' } },
    { in: { deger: '0', yon: 'btu' }, out: { 'Kilovat': '0 kW' } },
    { in: { deger: 'on iki bin', yon: 'btu' }, error: true },
    { in: { deger: '-9000', yon: 'btu' }, error: true },
  ],
  howto: [
    'Cihazın etiketinde ya da kataloğunda yazan kapasiteyi "Kapasite" alanına girin. BTU değerlerini 12000 gibi ayraçsız yazın.',
    'Değer BTU/h ise "BTU/h → Kilovat", kW ise "Kilovat → BTU/h" yönünü seçin.',
    '"Çevir" düğmesine basın. İlk satır aradığınız karşılığı; diğer satırlar watt, kcal/saat ve soğutma tonu değerlerini verir.',
    'Farklı modelleri karşılaştırıyorsanız her birinin kapasitesini aynı birime çevirip sonuçları kopyalayarak yan yana not alın.',
  ],
  sections: [
    { h: 'BTU nedir, neden klimalarda kullanılır?', p: [
      'BTU (British Thermal Unit, İngiliz ısı birimi), bir libre suyun sıcaklığını bir Fahrenheit derece değiştirmek için gereken ısı miktarıdır ve yaklaşık 1055 joule\'e eşittir. Tek başına BTU bir enerji birimidir; klima ve ısıtıcılarda söylenen değer ise aslında saatteki ısı aktarımı, yani <strong>BTU/saat</strong> cinsinden bir güçtür. Gündelik dilde "12 bin BTU klima" denildiğinde kastedilen, cihazın ortamdan saatte 12.000 BTU ısı çekebildiğidir.',
      'Türkiye metrik sistem kullansa da klima pazarında kapasite sınıfları BTU ile anılır: 9000, 12000, 18000 ve 24000 BTU/h en bilinen duvar tipi sınıflardır. Aynı cihazların teknik etiketinde ve enerji etiketinde ise kapasite kilovat olarak yazar. İki değeri eşleştirmek için bu çeviriye ihtiyaç duyulur.',
    ] },
    { h: 'Çeviri formülü', p: [
      'Bir BTU 1055,056 joule, bir saat 3600 saniye olduğundan 1 BTU/h = 1055,056 ÷ 3600 ≈ 0,29307 watt eder. Buradan iki pratik formül çıkar: <strong>kW = BTU/h × 0,00029307</strong> ve <strong>BTU/h = kW × 3412,14</strong>.',
      'Kafadan hesap için BTU değerini 3400\'e bölmek yeterince yakın sonuç verir: 12000 ÷ 3400 ≈ 3,5 kW. Kesin değer 3,517 kW\'dir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>12000 BTU klima:</strong> 12000 × 0,29307 = 3516,85 W, yani 3,517 kW. Bu aynı zamanda tam 1 soğutma tonudur ve saatte yaklaşık 3024 kcal ısıya karşılık gelir.',
      '<strong>Etikette 3,5 kW yazan cihaz:</strong> 3,5 × 3412,14 = 11.942,5 BTU/h. Piyasada bu cihaz 12000 BTU sınıfında satılır; sınıf adları yuvarlak değerlerdir, gerçek kapasite modelden modele birkaç yüz BTU oynayabilir.',
      '<strong>Salon tipi:</strong> 24000 BTU/h bir cihaz 7,034 kW soğutma kapasitesine, yani 2 soğutma tonuna sahiptir.',
    ] },
    { h: 'Yaygın klima sınıflarının kW karşılığı', ul: [
      '<strong>7000 BTU/h</strong> ≈ 2,05 kW',
      '<strong>9000 BTU/h</strong> ≈ 2,64 kW',
      '<strong>12000 BTU/h</strong> ≈ 3,52 kW',
      '<strong>18000 BTU/h</strong> ≈ 5,28 kW',
      '<strong>24000 BTU/h</strong> ≈ 7,03 kW',
      '<strong>36000 BTU/h</strong> ≈ 10,55 kW',
      '<strong>48000 BTU/h</strong> ≈ 14,07 kW',
    ] },
    { h: 'Kapasite ile elektrik tüketimi aynı şey değildir', p: [
      'Bu sayfadaki en önemli uyarı budur. Çevirdiğiniz kW değeri klimanın <strong>taşıdığı ısının</strong> gücüdür, prizden çektiği elektrik gücü değildir. Klima ısıyı üretmez, bir yerden başka bir yere taşır; bu yüzden harcadığı elektrik, taşıdığı ısıdan birkaç kat azdır. İkisi arasındaki oran verim katsayısıyla (soğutmada EER ya da SEER, ısıtmada COP ya da SCOP) ifade edilir.',
      'Örneğin 3,5 kW soğutma kapasiteli bir cihazın verim katsayısı 3,5 ise çektiği elektrik gücü yaklaşık 1 kW olur. Fatura hesabı yaparken BTU\'dan çevirdiğiniz kW değerini doğrudan kullanırsanız tüketimi birkaç kat fazla hesaplamış olursunuz. Elektrik tüketimi için cihazın etiketindeki "çekilen güç" ya da yıllık tüketim değerine bakın.',
    ] },
    { h: 'Soğutma tonu ve kcal/saat', p: [
      'Büyük sistemlerde, özellikle ticari klimalarda ve chiller gruplarında kapasite soğutma tonu (RT) ile verilir. Bir soğutma tonu 12.000 BTU/h, yani yaklaşık 3,517 kW\'dir. Eski teknik dokümanlarda ve kombi, kazan gibi ısıtma cihazlarında ise kcal/saat birimine rastlanır; 1 kW yaklaşık 860 kcal/h eder. Araç bu iki birimi de sonuç satırlarında verdiği için farklı kataloglardaki değerleri tek adımda karşılaştırabilirsiniz.',
    ] },
    { h: 'Isıtma ve soğutma kapasitesi farklı olabilir', p: [
      'Isı pompalı (inverter) klimaların etiketinde soğutma ve ısıtma için iki ayrı kW değeri bulunur ve ısıtma kapasitesi çoğunlukla biraz daha yüksektir. Cihazın satış adındaki BTU sınıfı genellikle soğutma kapasitesine göre verilir. Kış kullanımı için karşılaştırma yapıyorsanız ısıtma satırındaki kW değerini ayrıca çevirin; ayrıca ısıtma kapasitesinin dış hava sıcaklığı düştükçe azaldığını, katalogdaki değerin belirli bir test koşuluna ait olduğunu unutmayın.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Araç yalnızca birim çevirir; bir odanın kaç BTU klimaya ihtiyaç duyduğunu hesaplamaz. İhtiyaç; alan, tavan yüksekliği, yalıtım, cephe yönü, cam yüzeyi, kişi sayısı ve iklim bölgesine göre değişir. Cihaz seçimi ve tesisat için yetkili bir servisten ya da mekanik tesisat mühendisinden keşif almanız doğru olur. Sonuçlar bilgilendirme amaçlıdır.',
    ] },
  ],
  faq: [
    ['12000 BTU kaç kW eder?', '12000 BTU/h yaklaşık 3,517 kW ısıl kapasiteye karşılık gelir. Bu değer cihazın soğutma ya da ısıtma kapasitesidir; elektrik tüketimi bundan düşüktür.'],
    ['1 kW kaç BTU eder?', '1 kW yaklaşık 3412,14 BTU/h\'dir. Buna göre 2,5 kW yaklaşık 8530 BTU/h, 5 kW yaklaşık 17.061 BTU/h eder.'],
    ['BTU ile BTU/h aynı mı?', 'Teknik olarak hayır. BTU enerji, BTU/h güç birimidir. Ancak klima ve ısıtıcı bağlamında "BTU" denildiğinde hemen her zaman BTU/saat kastedilir.'],
    ['12000 BTU klima saatte kaç kW elektrik harcar?', 'Bu, cihazın verimine bağlıdır ve birim çevirisiyle bulunamaz. 3,517 kW\'lik soğutma kapasitesini cihazın verim katsayısına bölmek gerekir; kesin değer için ürün etiketindeki çekilen güce bakın.'],
    ['Etikette 3,4 kW yazıyor ama cihaz 12000 BTU olarak satılıyor, neden?', '9000, 12000, 18000 gibi değerler yuvarlak sınıf adlarıdır. Gerçek nominal kapasite üreticiye ve modele göre bu değerin biraz altında ya da üstünde olabilir.'],
    ['1 soğutma tonu kaç BTU\'dur?', '1 soğutma tonu 12.000 BTU/h, yaklaşık 3,517 kW\'dir. Ad, bir ton buzun 24 saatte erimesi için gereken ısı akışından gelir.'],
    ['12.000 yazınca neden yanlış sonuç alıyorum?', 'Araçta tek noktalı sayı ondalık kabul edilir; 12.000 yazımı 12 olarak okunur. On iki bini 12000 biçiminde, ayraçsız yazın.'],
    ['Girdiğim bilgiler kaydediliyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; yazdığınız değerler hiçbir sunucuya gönderilmez.'],
  ],
  related: ['klima-btu-hesapla', 'btu-kcal-cevir', 'kw-watt-cevir', 'kombi-kapasite-hesapla', 'beygir-kw-cevir'],
};
