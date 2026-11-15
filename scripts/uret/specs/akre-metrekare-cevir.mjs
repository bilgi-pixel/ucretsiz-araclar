export default {
  slug: 'akre-metrekare-cevir',
  title: 'Akre (Acre) Metrekare Çevirici',
  h1Tail: 'akre ↔ m²',
  pageTitle: 'Akre (Acre) Metrekare Çevirici – 1 Akre Kaç Metrekare, Kaç Dönüm',
  description: 'Akreyi (acre) metrekareye, metrekareyi akreye çevirin. 1 akre = 4.046,8564 m² tanımıyla çalışır; dönüm, hektar ve feetkare karşılığını da gösterir.',
  card: 'Akreyi (acre) metrekareye, metrekareyi akreye çevirin; dönüm, hektar ve feetkare karşılığıyla birlikte.',
  category: 'birim',
  keywords: ['akre metrekare çevirme', '1 akre kaç metrekare', 'acre kaç dönüm', 'akre hesaplama', 'acre m2', 'akre hektar', 'dönüm akre çevirme', 'acre nedir'],
  lead: 'İngiliz-Amerikan ölçü sistemindeki akreyi (acre) metrekareye ya da metrekareyi akreye çevirin. Araç <strong>1 akre = 4.046,8564224 m²</strong> tanımını kullanır ve sonucu dönüm, hektar ve feetkare olarak da verir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Alan', type: 'number', placeholder: 'Örn. 2,5', hint: 'Binlik ayraç kullanmayın; ondalık için virgül yazın.' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['a', 'Akre → Metrekare'], ['m', 'Metrekare → Akre']] },
  ],
  compute(v, h) {
    const AKRE = 4046.8564224; // 43.560 ft² × 0,09290304 m² (tam)
    const x = h.nonneg(v.deger, 'Alan');
    const m2 = v.yon === 'm' ? x : x * AKRE;
    const akre = v.yon === 'm' ? x / AKRE : x;
    const rows = v.yon === 'm'
      ? [['Akre', h.fmt(akre, 4) + ' akre'], ['Metrekare', h.fmt(m2, 4) + ' m²']]
      : [['Metrekare', h.fmt(m2, 4) + ' m²'], ['Akre', h.fmt(akre, 4) + ' akre']];
    rows.push(['Dönüm', h.fmt(m2 / 1000, 4) + ' dönüm']);
    rows.push(['Hektar', h.fmt(m2 / 10000, 4) + ' ha']);
    rows.push(['Feetkare', h.fmt(akre * 43560, 2) + ' ft²']);
    return { rows, note: '1 akre = 43.560 ft² = 4.046,8564224 m². Dönüm, 1.000 m² olan metrik dönüm olarak alınmıştır.' };
  },
  cases: [
    { in: { deger: '1', yon: 'a' }, out: { 'Metrekare': '4.046,8564 m²', 'Dönüm': '4,0469 dönüm', 'Hektar': '0,4047 ha', 'Feetkare': '43.560 ft²' } },
    { in: { deger: '10000', yon: 'm' }, out: { 'Akre': '2,4711 akre', 'Hektar': '1 ha' } },
    { in: { deger: '5', yon: 'a' }, out: { 'Metrekare': '20.234,2821 m²', 'Feetkare': '217.800 ft²' } },
    { in: { deger: '1000', yon: 'm' }, out: { 'Akre': '0,2471 akre', 'Dönüm': '1 dönüm' } },
    { in: { deger: '640', yon: 'a' }, out: { 'Metrekare': '2.589.988,1103 m²', 'Hektar': '258,9988 ha' } },
    { in: { deger: '100', yon: 'a' }, out: { 'Metrekare': '404.685,6422 m²', 'Dönüm': '404,6856 dönüm' } },
    { in: { deger: '4046,8564224', yon: 'm' }, out: { 'Akre': '1 akre' } },
    { in: { deger: '0,5', yon: 'a' }, out: { 'Metrekare': '2.023,4282 m²' } },
    { in: { deger: '-2', yon: 'a' }, error: true },
    { in: { deger: 'acre', yon: 'm' }, error: true },
  ],
  howto: [
    '"Alan" alanına akre ya da metrekare cinsinden değeri yazın.',
    '"Çeviri yönü" listesinden Akre → Metrekare ya da Metrekare → Akre seçeneğini belirleyin.',
    '"Çevir" düğmesine basın. İlk satırda aradığınız karşılık; altında dönüm, hektar ve feetkare değerleri görünür.',
    'Yurt dışı ilanını ya da çeviri metnini hazırlarken sonucu "Sonucu kopyala" düğmesiyle panoya alabilirsiniz.',
  ],
  sections: [
    { h: 'Akre nedir?', p: [
      'Akre (İngilizce yazımıyla "acre", okunuşu "eykır"), Amerika Birleşik Devletleri, Birleşik Krallık ve bu ülkelerin ölçü geleneğini izleyen bazı ülkelerde arazi büyüklüğünü anlatmak için kullanılan alan birimidir. Kısaltması çoğunlukla "ac" olarak yazılır. Çiftlik, tarla, golf sahası, orman parseli ve kırsal konut arsaları için verilen ölçüler bu birimle ifade edilir.',
      'Akrenin kökeni tarımsaldır: geleneksel anlatıma göre bir çift öküzün bir günde sürebildiği toprağı ifade eder. Bugünkü tanımı ise kesindir: bir akre <strong>43.560 feetkaredir</strong>. Bir feet tam 0,3048 metre olduğundan bu, 43.560 × 0,09290304 = <strong>4.046,8564224 metrekare</strong> eder. Tarihsel olarak akre, 660 feet uzunluğunda ve 66 feet genişliğinde bir şerit olarak tarif edilmiştir; 660 × 66 = 43.560.',
    ] },
    { h: 'Çeviri formülleri', ul: [
      'Akreden metrekareye: <strong>m² = akre × 4.046,8564224</strong>',
      'Metrekareden akreye: <strong>akre = m² ÷ 4.046,8564224</strong>',
      'Akreden dönüme: <strong>dönüm ≈ akre × 4,0469</strong>',
      'Akreden hektara: <strong>hektar ≈ akre × 0,4047</strong>',
      'Hektardan akreye: <strong>akre ≈ hektar × 2,4711</strong>',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> İlanda 5 akrelik bir çiftlik arazisi yazıyor. 5 × 4.046,8564224 = 20.234,2821 m². Bu yaklaşık 20,23 dönüm ya da 2,02 hektardır.',
      '<strong>Örnek 2:</strong> 1 hektar, yani 10.000 m² kaç akredir? 10.000 ÷ 4.046,8564224 = 2,4711 akre.',
      '<strong>Örnek 3:</strong> 1 dönümlük (1.000 m²) bir bahçe 1.000 ÷ 4.046,8564224 = 0,2471 akredir; yani bir akrenin kabaca dörtte biri.',
      '<strong>Örnek 4:</strong> Yarım akrelik bir arsa 0,5 × 4.046,8564224 = 2.023,4282 m² eder.',
      '<strong>Örnek 5:</strong> 640 akre bir mil kareye eşittir: 640 × 4.046,8564224 = 2.589.988,1103 m², yani yaklaşık 2,59 km².',
    ] },
    { h: 'Akılda tutması kolay kurallar', p: [
      'Bir akre yaklaşık <strong>4 dönümdür</strong>; daha doğrusu 4 dönüm 47 metrekare. Bir akre ayrıca bir hektarın yaklaşık yüzde 40\'ıdır; tersinden, bir hektar yaklaşık 2,5 akredir. Hızlı tahminde akreyi 4 ile çarparak dönümü, 0,4 ile çarparak hektarı bulabilirsiniz. 100 akrelik bir alanda bu kısa yol 400 dönüm verirken kesin değer 404,6856 dönümdür; yüzde 1 civarındaki bu fark küçük parsellerde önemsizdir, büyük arazilerde ise kesin hesap tercih edilmelidir.',
    ] },
    { h: 'Ne zaman gerekir?', p: [
      'Türkiye\'de arazi dönüm, dekar ve hektarla konuşulur; akre ise yabancı kaynaklarda karşınıza çıkar. Yurt dışında arazi ya da çiftlik ilanlarına bakarken, İngilizce tarım ve hayvancılık yayınlarını okurken, yabancı dizi ve kitaplardaki "yüz akrelik çiftlik" gibi ifadeleri anlamak isterken ya da bir çeviri metninde alan ölçüsünü Türk okura uygun hale getirirken bu çeviriye ihtiyaç duyulur.',
      'İngilizce tarım kaynaklarında verim, tohum ve gübre miktarları da akre başına verilir. Bu değerleri dekara uyarlamak için akre başına miktarı 4,0469\'a bölmek gerekir; çünkü bir akre yaklaşık dört dekarlık alandır. Ağırlık ya da hacim birimi de farklıysa (libre, galon, buşel gibi) onun da ayrıca çevrilmesi gerektiğini unutmayın.',
    ] },
    { h: 'Bir akre ne kadar yer kaplar?', p: [
      'Alanı 4.046,86 m² olan her şekil bir akredir; belirli bir en ve boyu yoktur. Kare olsaydı kenarı yaklaşık 63,6 metre olurdu. 40 metre × 101 metre ölçülerindeki dikdörtgen bir tarla da yaklaşık bir akredir. Metrik dönümle karşılaştırırsak, yan yana dört tane 20 × 50 metrelik parsel bir akreden yalnızca 47 metrekare eksiktir. Bu benzetmeler, yabancı bir ilandaki rakamı zihninizde tanıdık bir büyüklüğe oturtmanıza yardımcı olur.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>0,25 akre</strong> = 1.011,7141 m²',
      '<strong>0,5 akre</strong> = 2.023,4282 m²',
      '<strong>1 akre</strong> = 4.046,8564 m² = 4,0469 dönüm = 0,4047 ha',
      '<strong>2 akre</strong> = 8.093,7128 m²',
      '<strong>5 akre</strong> = 20.234,2821 m²',
      '<strong>10 akre</strong> = 40.468,5642 m² = 4,0469 ha',
      '<strong>100 akre</strong> = 404.685,6422 m² = 40,4686 ha',
      '<strong>640 akre</strong> = 1 mil kare ≈ 2,59 km²',
    ] },
    { h: 'Dikkat edilecekler ve sınırlar', p: [
      'ABD\'de eski ölçüm kayıtlarında "survey acre" denilen ve uluslararası akreden milyonda birkaç düzeyinde farklı olan bir tanım da kullanılmıştır. Aradaki fark bir akrede bir metrekarenin yüzde ikisinden bile azdır ve gündelik çevirilerde hiçbir önemi yoktur; bu araç uluslararası akreyi kullanır.',
      'Dönüm satırı 1.000 metrekarelik metrik dönüme göre hesaplanır. Araç negatif alan kabul etmez ve sonuçları dört ondalık basamağa yuvarlar. Arazi alım satımı gibi işlemlerde ilgili ülkenin resmî kayıtlarındaki yüzölçümü esas alınmalı, hukuki ve mali kararlar için uzman görüşüne başvurulmalıdır.',
    ] },
  ],
  faq: [
    ['1 akre kaç metrekaredir?', '1 akre 4.046,8564224 metrekaredir. Gündelik kullanımda yaklaşık 4.047 m² olarak yuvarlanır.'],
    ['1 akre kaç dönüm eder?', '1 akre yaklaşık 4,0469 dönümdür; yani 4 dönümden 47 metrekare kadar fazladır.'],
    ['1 dönüm kaç akredir?', '1 dönüm (1.000 m²) yaklaşık 0,2471 akredir; kabaca bir akrenin dörtte biri.'],
    ['1 hektar kaç akre eder?', '1 hektar yaklaşık 2,4711 akredir. Tersinden, 1 akre yaklaşık 0,4047 hektardır.'],
    ['Akre ile acre aynı şey mi?', 'Evet. "Acre" İngilizce yazımdır; Türkçede "akre" olarak yazılır ve aynı birimi ifade eder.'],
    ['Bir akre kaç feetkaredir?', 'Tam 43.560 feetkaredir. Bu sayı, akrenin geleneksel tarifi olan 660 feet × 66 feet ölçüsünden gelir.'],
    ['Akre başına verilen miktarı dekara nasıl çeviririm?', 'Akre başına değeri 4,0469\'a bölün. Örneğin akreye 200 birim, dekara yaklaşık 49,42 birim eder. Miktarın kendi birimi farklıysa onu da ayrıca çevirin.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Hesaplama yalnızca tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['donum-metrekare-cevir', 'hektar-donum-cevir', 'metrekare-feetkare-cevir', 'kilometrekare-hektar-cevir', 'birim-donustur'],
};
