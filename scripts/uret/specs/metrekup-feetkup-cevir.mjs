export default {
  slug: 'metrekup-feetkup-cevir',
  title: 'Metreküp Feetküp Çevirici',
  h1Tail: 'm³ ↔ ft³',
  pageTitle: 'Metreküp Feetküp Çevirici – m³\'ten ft³\'e, ft³\'ten m³\'e',
  description: 'Metreküpü feetküpe (ft³), feetküpü metreküpe çevirin. 1 m³ = 35,3147 ft³ eşitliğiyle çalışır; konteyner, nakliye, buzdolabı ve gaz hacimleri için kullanılır.',
  card: 'Metreküpü feetküpe, feetküpü metreküpe çevirin; konteyner, nakliye ve beyaz eşya hacimlerini litre karşılığıyla görün.',
  category: 'birim',
  keywords: ['metreküp feetküp çevirme', '1 m3 kaç ft3', 'feet küp kaç metreküp', 'cubic feet m3', 'ft3 m3 hesaplama', 'cbm cft çevirme', 'kübik feet metreküp'],
  lead: 'Bir hacmi metreküpten feetküpe (kübik feet, ft³) ya da feetküpten metreküpe çevirin. Araç <strong>1 ft³ = 0,028316846592 m³</strong> tam tanımını kullanır; sonucu litre ve inç küp olarak da gösterir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 33,2' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['mf', 'Metreküp → Feetküp'], ['fm', 'Feetküp → Metreküp']] },
  ],
  compute(v, h) {
    const FT3 = 0.028316846592; // 0,3048³
    const x = h.nonneg(v.deger, 'Değer');
    const m3 = v.yon === 'fm' ? x * FT3 : x;
    const ft3 = m3 / FT3;
    const ftSatir = ['Feetküp', h.fmt(ft3, 4) + ' ft³'];
    const mSatir = ['Metreküp', h.fmt(m3, 4) + ' m³'];
    return {
      rows: [
        v.yon === 'fm' ? mSatir : ftSatir,
        v.yon === 'fm' ? ftSatir : mSatir,
        ['Litre', h.fmt(m3 * 1000, 3) + ' L'],
        ['İnç küp', h.fmt(ft3 * 1728, 1) + ' in³'],
      ],
      note: '1 feet = 0,3048 m (tam) olduğundan 1 ft³ = 0,028316846592 m³ ve 1 m³ ≈ 35,3147 ft³. Sonuçlar en fazla dört ondalık basamakla gösterilir.',
    };
  },
  cases: [
    { in: { deger: '1', yon: 'mf' }, out: { 'Feetküp': '35,3147 ft³', 'Litre': '1.000 L' } },
    { in: { deger: '100', yon: 'fm' }, out: { 'Metreküp': '2,8317 m³', 'Litre': '2.831,685 L' } },
    { in: { deger: '10', yon: 'mf' }, out: { 'Feetküp': '353,1467 ft³' } },
    { in: { deger: '1000', yon: 'fm' }, out: { 'Metreküp': '28,3168 m³' } },
    { in: { deger: '33,2', yon: 'mf' }, out: { 'Feetküp': '1.172,4469 ft³' } },
    { in: { deger: '1', yon: 'fm' }, out: { 'Metreküp': '0,0283 m³', 'Litre': '28,317 L', 'İnç küp': '1.728 in³' } },
    { in: { deger: '67,7', yon: 'mf' }, out: { 'Feetküp': '2.390,8029 ft³' } },
    { in: { deger: 'kübik', yon: 'mf' }, error: true },
    { in: { deger: '-4', yon: 'fm' }, error: true },
  ],
  howto: [
    '"Değer" alanına hacmi yazın. Ondalık kısım için virgül ya da nokta kullanabilirsiniz.',
    '"Çeviri yönü" listesinden metreküpten feetküpe ya da feetküpten metreküpe seçeneğini belirleyin.',
    '"Çevir" düğmesine basın. İlk satır aradığınız karşılıktır; altında litre ve inç küp değerleri yer alır.',
    'Navlun teklifi ya da ürün karşılaştırması hazırlıyorsanız "Sonucu kopyala" ile değerleri tablonuza aktarın.',
  ],
  sections: [
    { h: 'Feetküp nedir?', p: [
      'Feetküp, kenarları birer feet (ayak) olan bir küpün hacmidir. İngilizcesi "cubic foot", çoğulu "cubic feet"tir; ft³, cu ft ya da CFT olarak kısaltılır. Bir feet tam olarak 0,3048 metre olduğundan, bir feetküp 0,3048 × 0,3048 × 0,3048 = <strong>0,028316846592 metreküp</strong> eder. Bu yaklaşık 28,3 litrelik bir hacimdir.',
      'Metreküp ise metrik sistemin hacim birimidir ve nakliyede CBM (cubic metre) olarak anılır. Bir metreküpün içine yaklaşık 35,3 feetküp sığar. ABD metrik sistemi gündelik hayatta kullanmadığı için Amerikan kaynaklı ürün kataloglarında, navlun tekliflerinde ve teknik belgelerde hacimler feetküp olarak verilir.',
    ] },
    { h: 'Çevirme formülü', p: [
      'Metreküpten feetküpe geçmek için <strong>ft³ = m³ ÷ 0,028316846592</strong> ya da aynı anlama gelen <strong>ft³ = m³ × 35,3147</strong> işlemi yapılır. Ters yönde <strong>m³ = ft³ × 0,028316846592</strong> kullanılır.',
      'Kabaca tahmin için metreküp değerini 35 ile çarpabilir, feetküp değerini 35\'e bölebilirsiniz. Katsayının bu kadar büyük olmasının nedeni, uzunluktaki 3,28 oranının hacimde üç kez çarpılmasıdır: 3,28084 × 3,28084 × 3,28084 = 35,3147.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 1 metreküp kaç feetküptür? 1 ÷ 0,028316846592 = 35,3147 ft³.',
      '<strong>Örnek 2:</strong> Bir navlun teklifinde 100 ft³ yazıyor. 100 × 0,028316846592 = 2,8317 m³ eder; bu 2.831,685 litreye karşılık gelir.',
      '<strong>Örnek 3:</strong> İç hacmi yaklaşık 33,2 m³ olan 20 feet\'lik standart bir konteyner 33,2 ÷ 0,028316846592 = 1.172,4469 ft³ eder. Yaklaşık 67,7 m³ hacimli 40 feet\'lik konteynerde bu değer 2.390,8029 ft³ olur. Konteyner iç ölçüleri üreticiye göre az da olsa değiştiğinden bu sayılar yaklaşık kapasitelerdir.',
    ] },
    { h: 'Hangi alanlarda kullanılır?', ul: [
      '<strong>Uluslararası nakliye:</strong> Deniz ve hava kargosunda yük hacmi CBM ya da CFT olarak beyan edilir; navlun çoğu zaman hacim üzerinden fiyatlanır.',
      '<strong>Beyaz eşya:</strong> ABD pazarındaki buzdolabı, derin dondurucu ve fırınların iç hacmi feetküp ile verilir. 18 ft³\'lük bir buzdolabı yaklaşık 510 litredir.',
      '<strong>Havalandırma ve kompresörler:</strong> Fan ve kompresör debileri CFM, yani dakikada feetküp olarak belirtilir. 1 CFM yaklaşık 1,7 m³/saat eder.',
      '<strong>Doğal gaz:</strong> ABD\'de gaz hacimleri feetküp ve katlarıyla ölçülür; uluslararası enerji istatistiklerinde bu birimlere sık rastlanır.',
      '<strong>Depolama ve taşınma:</strong> Yabancı depo kiralama ve taşımacılık şirketleri alanı feetküp üzerinden tarif eder.',
    ] },
    { h: 'Koli ölçülerinden hacim bulma', p: [
      'Bir kolinin hacmini bulmak için en, boy ve yüksekliği aynı birimde çarparsınız. Ölçüler santimetre ise çarpımı 1.000.000\'a bölerek metreküpe ulaşırsınız: 60 × 40 × 50 cm ölçülerinde bir koli 120.000 cm³, yani 0,12 m³ eder. Bu değeri araca yazdığınızda 4,2378 ft³ sonucunu alırsınız.',
      'Ölçüler inç olarak verilmişse çarpımı 1728\'e bölerek feetküp bulunur; çünkü bir feet 12 inçtir ve 12 × 12 × 12 = 1728\'dir. Aracın "İnç küp" satırı bu ilişkiyi doğrudan gösterir.',
      'Birden fazla koli gönderiyorsanız her kolinin hacmini ayrı ayrı bulup toplamak, ölçüleri önce toplayıp sonra çarpmaktan daha doğrudur. Paletli yüklerde palet yüksekliğini ve kolilerin arasında kalan boşlukları da hesaba katın; taşıyıcılar genellikle yükün kapladığı en dış ölçüleri esas alır.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>1 ft³</strong> = 0,0283 m³ = 28,317 L',
      '<strong>10 ft³</strong> = 0,2832 m³',
      '<strong>100 ft³</strong> = 2,8317 m³',
      '<strong>1000 ft³</strong> = 28,3168 m³',
      '<strong>1 m³</strong> = 35,3147 ft³',
      '<strong>10 m³</strong> = 353,1467 ft³',
      '<strong>1 ft³</strong> = 1.728 in³',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En yaygın hata, uzunluk katsayısı olan 3,28\'i hacim çevirisinde kullanmaktır. Metreyi feet\'e çevirirken 3,28 ile çarpılır, ancak metreküpü feetküpe çevirirken katsayı 35,31\'dir. Bir diğer hata, feetkare (alan) ile feetküpü (hacim) karıştırmaktır; emlak ilanlarındaki "sq ft" alan birimidir ve bu araçla çevrilmez.',
      'Nakliyede faturalanan hacim, ambalajın dış ölçüleri ve taşıyıcının yuvarlama kuralları nedeniyle hesapladığınız net hacimden farklı çıkabilir. Araç yalnızca birim çevirir; navlun bedeli için taşıyıcının kendi hesap yöntemini esas alın. Negatif değer kabul edilmez.',
    ] },
  ],
  faq: [
    ['1 metreküp kaç feetküp eder?', '1 metreküp yaklaşık 35,3147 feetküp eder. Hesap, metreküp değerinin 0,028316846592\'ye bölünmesiyle yapılır.'],
    ['1 feetküp kaç metreküptür?', '1 feetküp tam olarak 0,028316846592 metreküptür; yaklaşık 0,0283 m³ ya da 28,317 litre olarak ifade edilir.'],
    ['CBM ve CFT ne demektir?', 'CBM metreküpün (cubic metre), CFT feetküpün (cubic feet) nakliye sektöründeki kısaltmasıdır. 1 CBM yaklaşık 35,31 CFT eder.'],
    ['20 feet\'lik konteyner kaç metreküptür?', 'Standart 20 feet\'lik kuru yük konteynerinin iç hacmi yaklaşık 33 m³, yani yaklaşık 1.170 ft³ civarındadır. Kesin değer konteynerin tipine ve üreticisine göre değişir.'],
    ['Buzdolabındaki cu ft değeri kaç litre eder?', 'Feetküp değerini 28,317 ile çarparak litreyi bulursunuz. Örneğin 20 cu ft bir buzdolabı yaklaşık 566 litre hacmindedir.'],
    ['CFM değerini m³/saat\'e nasıl çeviririm?', 'CFM dakikadaki feetküptür. Değeri 0,0283168 ile çarpıp 60 ile çarparak m³/saat\'e ulaşırsınız; 1 CFM yaklaşık 1,7 m³/saat eder.'],
    ['Feetküp ile feetkare arasındaki fark nedir?', 'Feetkare (ft²) alan, feetküp (ft³) hacim birimidir. Alanı hacme çevirmek için bir yükseklik bilgisi gerekir; doğrudan dönüştürülemezler.'],
    ['Girdiğim değerler bir yere kaydediliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; yazdığınız sayılar sunucuya gönderilmez.'],
  ],
  related: ['litre-metrekup-cevir', 'metre-feet-cevir', 'hacim-hesapla', 'm3-saat-litre-dakika-cevir', 'varil-litre-cevir', 'birim-donustur'],
};
