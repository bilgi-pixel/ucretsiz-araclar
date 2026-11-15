export default {
  slug: 'kgcm2-bar-cevir',
  title: 'kg/cm² Bar Çevirici',
  h1Tail: 'kgf/cm² ↔ bar',
  pageTitle: 'kg/cm² Bar Çevirici – 1 kg/cm² Kaç Bar, Kaç PSI Eder?',
  description: 'kg/cm² (kgf/cm²) basınç değerini bara, barı kg/cm²\'ye çevirin. 1 kg/cm² = 0,980665 bar eşitliğini kullanır; kPa, psi, atm ve metre su sütunu karşılığını da verir.',
  card: 'Manometredeki kg/cm² değerini bara, barı kg/cm²\'ye çevirin; kPa, psi, atm ve metre su sütunu karşılıklarıyla birlikte.',
  category: 'birim',
  keywords: ['kg/cm2 bar çevirme', '1 kg/cm2 kaç bar', 'kgf/cm2 bar', 'bar kg/cm2', 'kg/cm2 psi', 'basınç birimi çevirme', 'teknik atmosfer bar', 'kilo basınç kaç bar'],
  lead: 'Eski bir manometrenin kadranındaki kg/cm² değerini bara ya da bar cinsinden verilen basıncı kg/cm²\'ye çevirin. İki birim birbirine çok yakındır ama eşit değildir: <strong>1 kg/cm² = 0,980665 bar</strong>. Araç aynı basıncın kilopascal, psi, atmosfer ve metre su sütunu karşılığını da gösterir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Basınç değeri', type: 'number', placeholder: 'Örn. 6' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['kgcm2', 'kg/cm² → Bar'], ['bar', 'Bar → kg/cm²']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Basınç değeri');
    const KGF = 98.0665; // 1 kgf/cm² = 98,0665 kPa (tam tanım)
    const kpa = v.yon === 'bar' ? x * 100 : x * KGF;
    const bar = kpa / 100;
    const kg = kpa / KGF;
    const rows = [
      v.yon === 'bar' ? ['kg/cm²', h.sig(kg, 6) + ' kg/cm²'] : ['Bar', h.sig(bar, 6) + ' bar'],
      ['Kilopascal', h.sig(kpa, 6) + ' kPa'],
      ['PSI', h.sig(kpa / 6.894757293168, 6) + ' psi'],
      ['Atmosfer', h.sig(kpa / 101.325, 6) + ' atm'],
      ['Metre su sütunu', h.sig(kpa / 9.80665, 6) + ' mSS'],
    ];
    return {
      rows,
      note: '1 kgf/cm² = 98,0665 kPa (standart yer çekimi ivmesi 9,80665 m/s² ile tanımlıdır). Manometreler çoğunlukla atmosfer basıncının üzerindeki gösterge basıncını okur.',
    };
  },
  cases: [
    { in: { deger: '1', yon: 'kgcm2' }, out: { 'Bar': '0,980665 bar', 'Kilopascal': '98,0665 kPa', 'PSI': '14,2233 psi', 'Atmosfer': '0,967841 atm', 'Metre su sütunu': '10 mSS' } },
    { in: { deger: '1', yon: 'bar' }, out: { 'kg/cm²': '1,01972 kg/cm²', 'Kilopascal': '100 kPa', 'PSI': '14,5038 psi', 'Metre su sütunu': '10,1972 mSS' } },
    { in: { deger: '10', yon: 'kgcm2' }, out: { 'Bar': '9,80665 bar', 'Metre su sütunu': '100 mSS' } },
    { in: { deger: '6', yon: 'bar' }, out: { 'kg/cm²': '6,1183 kg/cm²', 'PSI': '87,0226 psi', 'Kilopascal': '600 kPa' } },
    { in: { deger: '2,5', yon: 'kgcm2' }, out: { 'Bar': '2,45166 bar', 'PSI': '35,5584 psi' } },
    { in: { deger: '200', yon: 'bar' }, out: { 'kg/cm²': '203,943 kg/cm²', 'PSI': '2.900,75 psi' } },
    { in: { deger: '0', yon: 'kgcm2' }, out: { 'Bar': '0 bar' } },
    { in: { deger: 'altı', yon: 'bar' }, error: true },
    { in: { deger: '-1', yon: 'kgcm2' }, error: true },
  ],
  howto: [
    '"Basınç değeri" alanına manometreden ya da etiketten okuduğunuz sayıyı yazın.',
    '"Çeviri yönü" listesinden kg/cm²\'den bara mı, bardan kg/cm²\'ye mi çevireceğinizi seçin.',
    '"Çevir" düğmesine basın; ilk satırda aradığınız karşılık görünür.',
    'Alt satırlardan aynı basıncın kPa, psi, atm ve metre su sütunu değerlerini okuyun; ithal cihaz kılavuzlarında bu birimlerden biri istenebilir.',
    'Sonucu kopyalayıp bakım formuna, teklif dosyasına ya da notlarınıza yapıştırın.',
  ],
  sections: [
    { h: 'kg/cm² nedir?', p: [
      'kg/cm², doğru yazımıyla <strong>kgf/cm²</strong> (kilogram-kuvvet bölü santimetrekare), bir santimetrekarelik yüzeye bir kilogramlık kütlenin ağırlığı kadar kuvvet uygulandığında oluşan basınçtır. Mühendislikte "teknik atmosfer" olarak da bilinir ve <em>at</em> kısaltmasıyla gösterilir. Uluslararası birim sisteminin parçası değildir, ancak onlarca yıl boyunca manometrelerin, kazan etiketlerinin ve hidrolik sistemlerin standart birimi olmuştur.',
      'Türkiye\'de sanayide ve ustalar arasında bu birim hâlâ çok yaygındır ve kısaca "kilo" diye anılır. "Hidrofor dört kiloya ayarlı" ya da "kompresör sekiz kilo basıyor" denildiğinde kastedilen kg/cm²\'dir. Eski üretim manometrelerin kadranında çoğunlukla bu birim yazar; yeni cihazlar ise bar ya da kPa kullanır.',
    ] },
    { h: 'Bar nedir ve fark nereden gelir?', p: [
      'Bar, tam olarak 100.000 pascal, yani 100 kilopascal olarak tanımlanmış bir basınç birimidir. Deniz seviyesindeki atmosfer basıncına yakın olduğu için pratik bir büyüklüktür ve günümüzde Avrupa kaynaklı cihazların neredeyse tamamında kullanılır.',
      'kgf/cm² ise yer çekimine dayanır: bir kilogram-kuvvet 9,80665 newton, bir santimetrekare 0,0001 metrekaredir. Bölme yapılınca 98.066,5 pascal, yani <strong>98,0665 kPa = 0,980665 bar</strong> çıkar. İki birim arasındaki fark yaklaşık yüzde 2\'dir. Gündelik işlerde çoğu zaman "bir kilo bir bardır" denilerek geçilir; ancak yüksek basınçlarda ve hassas ayarlarda bu fark önem kazanır.',
    ] },
    { h: 'Formül ve çözümlü örnekler', p: [
      'kg/cm²\'den bara geçmek için değeri 0,980665 ile çarparsınız: <strong>bar = kg/cm² × 0,980665</strong>. Bardan kg/cm²\'ye geçmek için aynı sayıya bölersiniz ya da 1,01972 ile çarparsınız: <strong>kg/cm² = bar × 1,01972</strong>.',
      '<strong>Örnek 1:</strong> Eski bir kazan manometresi 10 kg/cm² gösteriyor. 10 × 0,980665 = 9,80665 bar. Su sütunu olarak tam 100 metreye karşılık gelir.',
      '<strong>Örnek 2:</strong> Kompresör etiketi 6 bar diyor, sizin manometreniz kg/cm² ölçüyor. 6 ÷ 0,980665 = 6,1183 kg/cm². Aynı basınç 600 kPa ve 87,0226 psi eder.',
      '<strong>Örnek 3:</strong> Bir regülatör 2,5 kg/cm²\'ye ayarlanacak ama elinizdeki gösterge bar ölçüyor. 2,5 × 0,980665 = 2,45166 bar; göstergede yaklaşık 2,45 bar görmelisiniz.',
      '<strong>Örnek 4:</strong> 200 barlık bir hidrolik sistem 200 ÷ 0,980665 = 203,943 kg/cm² eder. Burada yüzde 2\'lik fark neredeyse 4 kg/cm²\'ye ulaşmıştır; yuvarlak hesap artık yeterli değildir.',
    ] },
    { h: 'Metre su sütunu ile ilişkisi', p: [
      'kg/cm² biriminin tesisatta sevilmesinin bir nedeni, su sütunuyla çok kolay ilişkilendirilmesidir: <strong>1 kg/cm² tam 10 metre su sütununa</strong> eşittir. On metre yüksekliğindeki bir su kolonu tabanına bir kg/cm² basınç uygular. Bu yüzden binalarda "her kat için yaklaşık 0,3 kilo basınç gerekir" gibi pratik kurallar kullanılır; üç metrelik kat yüksekliği 0,3 kg/cm²\'ye karşılık gelir.',
      'Pompa kataloglarındaki basma yüksekliği (mSS) değerini basınca çevirmek için metreyi ona bölmek yeterlidir: 40 mSS basan bir pompa 4 kg/cm², yani yaklaşık 3,92 bar basınç üretir.',
    ] },
    { h: 'Hızlı başvuru tablosu', ul: [
      '<strong>1 kg/cm²</strong> = 0,980665 bar = 98,0665 kPa = 14,2233 psi',
      '<strong>2 kg/cm²</strong> = 1,96133 bar',
      '<strong>4 kg/cm²</strong> = 3,92266 bar',
      '<strong>6 kg/cm²</strong> = 5,88399 bar',
      '<strong>10 kg/cm²</strong> = 9,80665 bar',
      '<strong>1 bar</strong> = 1,01972 kg/cm² = 100 kPa = 14,5038 psi',
      '<strong>1 atm</strong> = 1,01325 bar = 1,03323 kg/cm²',
    ] },
    { h: 'Gösterge basıncı ve mutlak basınç', p: [
      'Manometrelerin büyük çoğunluğu gösterge basıncını, yani ortam atmosfer basıncının üzerindeki farkı ölçer. Boşta duran bir manometre sıfır gösterir, oysa etrafındaki havanın mutlak basıncı yaklaşık 1 bardır. Eski teknik belgelerde bu ayrım <em>atü</em> (gösterge) ve <em>ata</em> (mutlak) kısaltmalarıyla yapılır. Birim çevirisi iki durumda da aynıdır; ancak hesaplamalarda hangi basınç türünün istendiğine dikkat etmek gerekir. Mutlak basınç, gösterge basıncına atmosfer basıncı eklenerek bulunur.',
    ] },
    { h: 'Sık yapılan hatalar ve uyarı', ul: [
      'kg/cm² ile barı tam eşit saymak. Düşük basınçta kabul edilebilir, yüksek basınçta hataya yol açar.',
      'kg/cm² ile kg/m² birimini karıştırmak. Aradaki fark on bin kattır; döşeme yükleri kg/m² ile verilir.',
      'Psi değerini bar sanmak. İthal lastik ve kompresör etiketlerinde psi kullanılır; 30 psi yaklaşık 2,07 bardır.',
      'Gösterge ve mutlak basıncı karıştırmak. Vakum ve gaz hesaplarında sonuç tümüyle değişir.',
    ], p: [
      'Sonuçlar bilgilendirme amaçlıdır. Basınçlı kaplar, kazanlar, gaz tüpleri ve hidrolik sistemler ciddi yaralanma riski taşır; ayar ve test işlemlerinde üreticinin belirttiği değerleri ve birimi esas alın, emin olmadığınız durumda yetkili teknik personele danışın.',
    ] },
  ],
  faq: [
    ['1 kg/cm² kaç bardır?', '1 kg/cm² (kgf/cm²) 0,980665 bardır. Yani kg/cm² değeri, bar karşılığından yaklaşık yüzde 2 daha büyük bir sayıyla ifade edilir.'],
    ['1 bar kaç kg/cm² eder?', '1 bar yaklaşık 1,01972 kg/cm² eder. Hesap, 1 sayısının 0,980665\'e bölünmesiyle yapılır.'],
    ['"Kilo basınç" ne demek?', 'Ustalar arasında "kilo" denildiğinde kg/cm² kastedilir. "Altı kilo basınç" yaklaşık 5,88 bar demektir. Pratikte çoğu zaman kilo ile bar aynı kabul edilir, ancak aralarında yüzde 2 fark vardır.'],
    ['kg/cm² ile kgf/cm² aynı mı?', 'Evet. Doğru gösterim kgf/cm²\'dir, çünkü basınç kütleyle değil kuvvetle tanımlanır. Manometrelerde ve gündelik yazımda kısaca kg/cm² yazılır; ikisi aynı birimi anlatır.'],
    ['1 kg/cm² kaç psi eder?', '1 kg/cm² yaklaşık 14,2233 psi eder. 1 bar ise 14,5038 psi\'dir.'],
    ['Teknik atmosfer ile standart atmosfer farklı mı?', 'Evet. Teknik atmosfer (at) 1 kgf/cm², yani 0,980665 bardır. Standart atmosfer (atm) ise 1,01325 bardır. İkisi arasında yaklaşık yüzde 3 fark bulunur.'],
    ['10 metre su sütunu kaç bardır?', '10 metre su sütunu tam 1 kg/cm², yani 0,980665 bardır. Pompa basma yüksekliğini basınca çevirirken bu eşitlik kullanılır.'],
    ['Girdiğim değerler bir yere gönderiliyor mu?', 'Hayır. Çeviri tarayıcınızın içinde yapılır; yazdığınız basınç değeri sunucuya iletilmez ve saklanmaz. Sayfa atölyede internet olmadan da çalışır.'],
  ],
  related: ['bar-psi-cevir', 'bar-atm-cevir', 'bar-kpa-cevir', 'pascal-bar-cevir', 'newton-kgf-cevir', 'm3-saat-litre-dakika-cevir'],
};
