export default {
  slug: 'metrekare-feetkare-cevir',
  title: 'Metrekare Feetkare Çevirici',
  h1Tail: 'm² ↔ ft²',
  pageTitle: 'Metrekare Feetkare Çevirici – m²\'yi ft²\'ye (Square Feet) Çevirme',
  description: 'Metrekareyi feetkareye (square feet, sq ft), feetkareyi metrekareye çevirin. 1 ft² = 0,09290304 m² tanımı, çözümlü örnekler ve emlak ilanı ipuçlarıyla.',
  card: 'Metrekareyi feetkareye (sq ft), feetkareyi metrekareye çevirin; yurt dışı emlak ilanları ve ürün ölçüleri için.',
  category: 'birim',
  keywords: ['metrekare feetkare çevirme', 'square feet kaç metrekare', 'sq ft m2', 'ft2 m2 çevirme', 'ayak kare metrekare', '1000 sq ft kaç m2', 'metrekare square feet'],
  lead: 'Bir alanı metrekareden (m²) feetkareye (ft², "square feet") ya da feetkareden metrekareye çevirin. Araç <strong>1 ft² = 0,09290304 m²</strong> tam tanımını kullanır ve yarda kare karşılığını da verir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Alan', type: 'number', placeholder: 'Örn. 120', hint: 'Binlik ayraç kullanmayın; ondalık için virgül yazın (örn. 1250,5).' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['m2', 'Metrekare (m²) → Feetkare (ft²)'], ['ft2', 'Feetkare (ft²) → Metrekare (m²)']] },
  ],
  compute(v, h) {
    const K = 0.09290304; // 1 ft² kaç m² (0,3048² tam)
    const x = h.nonneg(v.deger, 'Alan');
    const m2 = v.yon === 'ft2' ? x * K : x;
    const ft2 = v.yon === 'ft2' ? x : x / K;
    const yd2 = ft2 / 9;
    const rows = v.yon === 'ft2'
      ? [['Metrekare', h.fmt(m2, 4) + ' m²'], ['Feetkare', h.fmt(ft2, 4) + ' ft²']]
      : [['Feetkare', h.fmt(ft2, 4) + ' ft²'], ['Metrekare', h.fmt(m2, 4) + ' m²']];
    rows.push(['Yarda kare', h.fmt(yd2, 4) + ' yd²']);
    return { rows, note: '1 ft = 0,3048 m olduğundan 1 ft² = 0,09290304 m² (tam). Sonuçlar en fazla dört ondalık basamakla gösterilir.' };
  },
  cases: [
    { in: { deger: '100', yon: 'm2' }, out: { 'Feetkare': '1.076,391 ft²' } },
    { in: { deger: '1000', yon: 'ft2' }, out: { 'Metrekare': '92,903 m²' } },
    { in: { deger: '1', yon: 'm2' }, out: { 'Feetkare': '10,7639 ft²' } },
    { in: { deger: '1500', yon: 'ft2' }, out: { 'Metrekare': '139,3546 m²', 'Yarda kare': '166,6667 yd²' } },
    { in: { deger: '9', yon: 'ft2' }, out: { 'Metrekare': '0,8361 m²', 'Yarda kare': '1 yd²' } },
    { in: { deger: '0', yon: 'm2' }, out: { 'Feetkare': '0 ft²' } },
    { in: { deger: '929,0304', yon: 'm2' }, out: { 'Feetkare': '10.000 ft²' } },
    { in: { deger: '-10', yon: 'm2' }, error: true },
    { in: { deger: 'yüz', yon: 'ft2' }, error: true },
  ],
  howto: [
    '"Alan" alanına çevirmek istediğiniz değeri yazın; büyük sayılarda binlik ayraç kullanmadan düz yazın.',
    '"Çeviri yönü" listesinden metrekareden feetkareye mi, feetkareden metrekareye mi geçeceğinizi seçin.',
    '"Çevir" düğmesine basın. İlk satır karşılık gelen alanı, son satır aynı alanın yarda kare değerini gösterir.',
    'Sonucu ilan notunuza, teklif e-postanıza ya da tablonuza taşımak için "Sonucu kopyala" düğmesini kullanın.',
  ],
  sections: [
    { h: 'Feetkare nedir?', p: [
      'Feetkare (İngilizce "square foot", çoğulu "square feet"), bir kenarı 1 feet olan karenin alanıdır. Türkçede "ayak kare" ya da "fitkare" olarak da anılır; kısaltması ft², sq ft ya da SF biçiminde yazılır. Amerika Birleşik Devletleri başta olmak üzere bazı ülkelerde konut, ofis ve dükkân büyüklükleri, halı ve parke ölçüleri, klima ve ısıtıcı kapasite tabloları bu birimle verilir.',
      '1 feet tam olarak 0,3048 metre olarak tanımlandığından 1 feetkare 0,3048 × 0,3048 = 0,09290304 metrekaredir. Bu değer yaklaşık değil, tanımdan gelen kesin bir sayıdır.',
    ] },
    { h: 'Çeviri formülleri', p: [
      'Feetkareden metrekareye: <strong>m² = ft² × 0,09290304</strong>. Metrekareden feetkareye: <strong>ft² = m² ÷ 0,09290304</strong>, yani yaklaşık <strong>m² × 10,7639</strong>.',
      'Burada dikkat edilmesi gereken nokta, uzunluk katsayısının karesinin kullanılmasıdır. 1 metre yaklaşık 3,28 feet\'tir; ama 1 metrekare 3,28 feetkare değil, 3,28 × 3,28 = 10,76 feetkaredir. Alanı uzunluk katsayısıyla çevirmek, sonucu üç kattan fazla küçülten yaygın bir hatadır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 100 m²\'lik bir daire kaç feetkaredir? 100 ÷ 0,09290304 = 1.076,391 ft². Yurt dışındaki bir alıcıya ilan hazırlarken "yaklaşık 1.076 sq ft" yazabilirsiniz.',
      '<strong>Örnek 2:</strong> ABD\'deki bir ilanda 1.500 sq ft yazıyor. 1.500 × 0,09290304 = 139,3546 m². Yani ev yaklaşık 139 metrekaredir.',
      '<strong>Örnek 3:</strong> 1.000 ft² kapasiteli olarak tanıtılan bir hava temizleyici 1.000 × 0,09290304 = 92,903 m²\'lik bir alana karşılık gelir.',
      '<strong>Örnek 4:</strong> 9 ft² tam 1 yarda karedir ve 0,8361 m² eder; çünkü 1 yarda 3 feet\'tir ve 3 × 3 = 9.',
    ] },
    { h: 'Akıldan hızlı tahmin', p: [
      'Kabaca bir fikir edinmek için feetkare değerini 10\'a bölebilir, metrekare değerini 10 ile çarpabilirsiniz. Daha iyi bir tahmin için metrekareyi 10 ile çarpıp sonuca yüzde 7,6 eklemek gerekir; 80 m² için 800 + yaklaşık 61 = 861 ft² (kesin değer 861,11 ft²). 10\'a bölme kuralı her zaman gerçek metrekareden yaklaşık yüzde 7 fazla gösterir; satın alma, kiralama ya da malzeme siparişi gibi para içeren işlerde kesin hesabı kullanın.',
    ] },
    { h: 'Emlak ilanlarını karşılaştırırken dikkat', p: [
      'Birim çevirisi yalnızca sayıyı dönüştürür; alanın nasıl ölçüldüğünü değiştirmez. Türkiye\'de ilanlarda brüt ve net metrekare ayrımı yapılır; başka ülkelerde de duvarların, balkonun, garajın ya da bodrumun alana dahil edilip edilmediği ülkeye, eyalete ve ilan sitesine göre değişir. 1.500 sq ft\'lik bir evle 139 m² net bir daireyi karşılaştırırken sayılar eşit olsa bile kullanılabilir alan farklı olabilir. Karşılaştırmadan önce ilanın hangi alanı kastettiğini satıcıya sorun.',
      'Fiyat karşılaştırmasında da aynı katsayı tersine çalışır: feetkare başına fiyatı metrekare başına fiyata çevirmek için 10,7639 ile <em>çarpmanız</em> gerekir. Feetkaresi 200 birim olan bir evin metrekaresi yaklaşık 2.152,78 birimdir.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>1 m²</strong> = 10,7639 ft²',
      '<strong>10 m²</strong> = 107,6391 ft²',
      '<strong>50 m²</strong> = 538,1955 ft²',
      '<strong>75 m²</strong> = 807,2933 ft²',
      '<strong>100 m²</strong> = 1.076,391 ft²',
      '<strong>150 m²</strong> = 1.614,5866 ft²',
      '<strong>100 ft²</strong> = 9,2903 m²',
      '<strong>500 ft²</strong> = 46,4515 m²',
      '<strong>1.000 ft²</strong> = 92,903 m²',
      '<strong>2.000 ft²</strong> = 185,8061 m²',
    ] },
    { h: 'Yarda kare ve diğer ilişkiler', p: [
      'Halı, kumaş ve suni çim gibi ürünlerde bazen yarda kare (yd²) kullanılır. 1 yarda 3 feet olduğundan 1 yd² = 9 ft² = 0,83612736 m²\'dir. Araç bu değeri ek satır olarak verir. Bir feetkare ayrıca 144 inç karedir (12 × 12). Çok büyük araziler için feetkare yerine akre kullanılır; 1 akre 43.560 feetkaredir.',
    ] },
    { h: 'Sınırlar', p: [
      'Alan negatif olamayacağı için eksi değerler kabul edilmez. Sonuçlar dört ondalık basamağa yuvarlanır; bu, inşaat ve emlak işlerinde gereken duyarlılığın çok üzerindedir. Gerçek bir mekânın alanı ölçüm yöntemine bağlı olduğundan, resmî işlemler için tapu, proje ya da ekspertiz belgelerindeki değerler esas alınmalıdır.',
    ] },
  ],
  faq: [
    ['1 metrekare kaç feetkaredir?', '1 m² yaklaşık 10,7639 ft² eder. Hesap 1 ÷ 0,09290304 işlemiyle yapılır.'],
    ['1 feetkare kaç metrekaredir?', '1 ft² tam olarak 0,09290304 m²\'dir; bu yaklaşık 929 santimetrekareye karşılık gelir.'],
    ['1000 square feet kaç metrekare eder?', '1.000 ft² = 92,903 m²\'dir. Kabaca "1.000 sq ft yaklaşık 93 metrekare" diye akılda tutulabilir.'],
    ['sq ft, ft² ve SF aynı şey mi?', 'Evet. Üçü de feetkarenin kısaltmasıdır. İlanlarda "sqft" ya da "sq. ft." yazımlarına da rastlanır.'],
    ['Metreyi feet\'e çeviren katsayıyı alan için kullanabilir miyim?', 'Hayır. Alan çevirisinde uzunluk katsayısının karesi kullanılır. 1 m = 3,28084 ft iken 1 m² = 10,7639 ft²\'dir.'],
    ['Feetkare fiyatını metrekare fiyatına nasıl çeviririm?', 'Feetkare başına fiyatı 10,7639 ile çarpın. Örneğin feetkaresi 150 birim olan bir yerin metrekaresi yaklaşık 1.614,59 birimdir. Para birimi dönüşümü ayrıca yapılmalıdır.'],
    ['Odanın alanını feetkare olarak nasıl bulurum?', 'Odanın en ve boyunu metre olarak ölçüp çarparak metrekareyi bulun, ardından bu araçla feetkareye çevirin. 4 m × 5 m\'lik bir oda 20 m², yani 215,2782 ft² eder.'],
    ['Yazdığım değerler bir yere kaydediliyor mu?', 'Hayır. Çeviri tarayıcınızda yapılır; girdiğiniz alan bilgisi sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['metre-feet-cevir', 'akre-metrekare-cevir', 'metrekare-santimetrekare-cevir', 'alan-cevre-hesapla', 'metrekare-fiyati-hesapla', 'birim-donustur'],
};
