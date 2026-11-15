export default {
  slug: 'makro-besin-hesapla',
  title: 'Makro Besin Hesaplama',
  h1Tail: 'karbonhidrat, protein, yağ',
  pageTitle: 'Makro Besin Hesaplama – Karbonhidrat, Protein ve Yağ Gramı',
  description: 'Günlük kalorinizi karbonhidrat, protein ve yağ yüzdelerine göre grama çevirin. Makro dağılımınızı öğün başına miktarlarla birlikte anında görün.',
  card: 'Günlük kaloriyi seçtiğiniz yüzdelere göre karbonhidrat, protein ve yağ gramına bölün; öğün başına payları görün.',
  category: 'saglik',
  keywords: ['makro besin hesaplama', 'makro hesaplama', 'karbonhidrat protein yağ oranı', 'makro dağılımı', 'günlük makro ihtiyacı', 'kaloriyi grama çevirme', 'diyet makro hesaplama'],
  lead: 'Günlük kalori hedefinizi <strong>karbonhidrat, protein ve yağ</strong> gramlarına dönüştürün. Yüzdeleri kendiniz belirlersiniz; araç her makro besinin kalorisini ve gramını, ayrıca öğün başına düşen miktarı hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'kalori', label: 'Günlük kalori (kcal)', type: 'number', placeholder: 'Örn. 2000' },
    { id: 'karb', label: 'Karbonhidrat (%)', type: 'number', value: '50' },
    { id: 'protein', label: 'Protein (%)', type: 'number', value: '20' },
    { id: 'yag', label: 'Yağ (%)', type: 'number', value: '30', hint: 'Üç yüzdenin toplamı 100 olmalı.' },
    { id: 'ogun', label: 'Günlük öğün sayısı', type: 'number', value: '3' },
    { id: 'kilo', label: 'Kilo (kg) – isteğe bağlı', type: 'number', placeholder: 'Örn. 70', hint: 'Yazarsanız kilogram başına protein ve karbonhidrat da gösterilir.' },
  ],
  compute(v, h) {
    const kal = h.pos(v.kalori, 'Günlük kalori');
    if (kal < 500 || kal > 10000) h.err('Günlük kalori 500 ile 10.000 kcal arasında olmalı.');
    const pk = h.nonneg(v.karb, 'Karbonhidrat yüzdesi');
    const pp = h.nonneg(v.protein, 'Protein yüzdesi');
    const py = h.nonneg(v.yag, 'Yağ yüzdesi');
    const toplam = pk + pp + py;
    if (Math.abs(toplam - 100) > 0.01) h.err(`Yüzdelerin toplamı 100 olmalı; şu an ${h.fmt(toplam, 2)}. Değerleri düzeltin.`);
    const ogun = h.posint(v.ogun, 'Günlük öğün sayısı');
    if (ogun > 10) h.err('Öğün sayısı en fazla 10 olabilir.');
    const kk = kal * pk / 100, kp = kal * pp / 100, ky = kal * py / 100;
    const gk = kk / 4, gp = kp / 4, gy = ky / 9;
    const satir = (g, k) => `${h.fmt(g, 1)} g (${h.fmt(k, 0)} kcal)`;
    const rows = [
      ['Karbonhidrat', satir(gk, kk)],
      ['Protein', satir(gp, kp)],
      ['Yağ', satir(gy, ky)],
      ['Öğün başına', `${h.fmt(gk / ogun, 1)} g karbonhidrat, ${h.fmt(gp / ogun, 1)} g protein, ${h.fmt(gy / ogun, 1)} g yağ`],
    ];
    if (String(v.kilo ?? '').trim() !== '') {
      const kilo = h.pos(v.kilo, 'Kilo');
      if (kilo < 30 || kilo > 300) h.err('Kilo 30 ile 300 kg arasında olmalı.');
      rows.push(['Kilogram başına protein', h.fmt(gp / kilo, 2) + ' g/kg']);
      rows.push(['Kilogram başına karbonhidrat', h.fmt(gk / kilo, 2) + ' g/kg']);
    }
    return {
      rows,
      note: 'Karbonhidrat ve protein 4 kcal/g, yağ 9 kcal/g kabul edildi. Alkol ve lif ayrıca hesaba katılmadı.',
    };
  },
  cases: [
    { in: { kalori: '2000', karb: '50', protein: '20', yag: '30', ogun: '3' }, out: { 'Karbonhidrat': '250 g (1.000 kcal)', 'Protein': '100 g (400 kcal)', 'Yağ': '66,7 g (600 kcal)', 'Öğün başına': '83,3 g karbonhidrat, 33,3 g protein, 22,2 g yağ' } },
    { in: { kalori: '2500', karb: '40', protein: '30', yag: '30', ogun: '4', kilo: '75' }, out: { 'Karbonhidrat': '250 g (1.000 kcal)', 'Protein': '187,5 g (750 kcal)', 'Yağ': '83,3 g (750 kcal)', 'Kilogram başına protein': '2,5 g/kg', 'Kilogram başına karbonhidrat': '3,33 g/kg' } },
    { in: { kalori: '1800', karb: '45', protein: '25', yag: '30', ogun: '3' }, out: { 'Karbonhidrat': '202,5 g (810 kcal)', 'Protein': '112,5 g (450 kcal)', 'Yağ': '60 g (540 kcal)' } },
    { in: { kalori: '3000', karb: '55', protein: '20', yag: '25', ogun: '5' }, out: { 'Karbonhidrat': '412,5 g (1.650 kcal)', 'Protein': '150 g (600 kcal)', 'Yağ': '83,3 g (750 kcal)', 'Öğün başına': '82,5 g karbonhidrat, 30 g protein, 16,7 g yağ' } },
    { in: { kalori: '1500', karb: '20', protein: '30', yag: '50', ogun: '3' }, out: { 'Karbonhidrat': '75 g (300 kcal)', 'Protein': '112,5 g (450 kcal)', 'Yağ': '83,3 g (750 kcal)' } },
    { in: { kalori: '2200', karb: '60', protein: '15', yag: '25', ogun: '3', kilo: '70' }, out: { 'Karbonhidrat': '330 g (1.320 kcal)', 'Protein': '82,5 g (330 kcal)', 'Yağ': '61,1 g (550 kcal)', 'Kilogram başına protein': '1,18 g/kg' } },
    { in: { kalori: '2000', karb: '50', protein: '30', yag: '30', ogun: '3' }, error: true },
    { in: { kalori: '', karb: '50', protein: '20', yag: '30', ogun: '3' }, error: true },
    { in: { kalori: '2000', karb: '120', protein: '-20', yag: '0', ogun: '3' }, error: true },
  ],
  howto: [
    'Günlük almayı hedeflediğiniz toplam kaloriyi yazın. Bu değeri bilmiyorsanız önce günlük kalori ihtiyacı hesaplayıcısını kullanın.',
    'Karbonhidrat, protein ve yağ için yüzde değerlerini girin. Varsayılan dağılım %50, %20 ve %30\'dur; toplamın 100 olması gerekir.',
    'Günde kaç öğün yediğinizi yazın; araç gramları bu sayıya eşit böler.',
    'Kilonuzu da yazarsanız protein ve karbonhidratın kilogram başına karşılığını görürsünüz.',
    '"Hesapla" düğmesine basın ve her makro besinin gram ile kalori değerini okuyun.',
  ],
  sections: [
    { h: 'Makro besin nedir?', p: [
      'Makro besinler, vücudun enerji için büyük miktarda gereksinim duyduğu üç besin grubudur: karbonhidratlar, proteinler ve yağlar. Vitamin ve mineraller gibi az miktarda gereken mikro besinlerden bu yönleriyle ayrılırlar. Yediğimiz her besin bu üçünün bir karışımıdır; ekmek ağırlıklı olarak karbonhidrat, tavuk göğsü ağırlıklı olarak protein, zeytinyağı ise neredeyse tümüyle yağdır.',
      '"Makro saymak", toplam kaloriye ek olarak bu kalorinin hangi besin grubundan geldiğini de planlamak demektir. Aynı kaloriyi alan iki kişiden biri kalorisinin büyük kısmını şekerli içeceklerden, diğeri dengeli öğünlerden alıyorsa tokluk süreleri, antrenman performansları ve kas korunumu farklı olur. Makro dağılımı bu farkı sayıya dökmenin yoludur.',
    ] },
    { h: 'Hesap nasıl yapılır?', p: [
      'Her makro besinin gram başına verdiği enerji yaklaşık olarak bellidir: <strong>karbonhidrat 4 kcal, protein 4 kcal, yağ 9 kcal</strong>. Bu değerler besin etiketlerinde de kullanılan genel çevrim katsayılarıdır. Hesap iki adımdır: önce toplam kalori yüzdeyle çarpılarak o makronun kalorisi bulunur, sonra bu kalori gram başına enerjiye bölünür.',
      'Formül olarak: <strong>gram = (kalori × yüzde ÷ 100) ÷ gram başına kcal</strong>. Yağın gram başına enerjisi diğer ikisinin iki katından fazla olduğu için aynı kalori payı çok daha az gram yağa karşılık gelir.',
    ] },
    { h: 'Çözümlü örnek: 2000 kcal, %50 – %20 – %30', p: [
      'Karbonhidrat: 2000 × 0,50 = 1000 kcal; 1000 ÷ 4 = <strong>250 g</strong>. Protein: 2000 × 0,20 = 400 kcal; 400 ÷ 4 = <strong>100 g</strong>. Yağ: 2000 × 0,30 = 600 kcal; 600 ÷ 9 = <strong>66,7 g</strong>. Üç öğüne eşit bölündüğünde öğün başına yaklaşık 83,3 g karbonhidrat, 33,3 g protein ve 22,2 g yağ düşer.',
      'Aynı kaloride yağ payı %30 olmasına karşın gram olarak en küçük kalemdir. Tabağınıza bakarken bu farkı akılda tutmak gerekir: bir yemek kaşığı sıvı yağ yaklaşık 10–14 gramdır ve tek başına 100 kilokalorinin üzerinde enerji taşır.',
    ] },
    { h: 'Hangi dağılımı seçmeliyim?', p: [
      'Tek bir doğru dağılım yoktur. Beslenme kaynaklarında yetişkinler için kabul edilebilir aralıklar olarak karbonhidrat için enerjinin %45–65\'i, protein için %10–35\'i, yağ için %20–35\'i sıkça anılır. Bu aralıkların içinde kalan pek çok farklı dağılım sağlıklı bir beslenmenin parçası olabilir. Aşağıdakiler yaygın başlangıç örnekleridir, öneri ya da reçete değildir:',
    ], ul: [
      '<strong>Dengeli (%50 – %20 – %30):</strong> Araçtaki varsayılan dağılım; çoğu kişi için genel bir başlangıç noktası.',
      '<strong>Yüksek proteinli (%40 – %30 – %30):</strong> Kilo verirken ya da kuvvet antrenmanı yaparken sık tercih edilir.',
      '<strong>Dayanıklılık sporcusu (%55–60 – %15–20 – %25):</strong> Uzun süreli antrenmanlarda karbonhidrat payı artırılır.',
      '<strong>Düşük karbonhidratlı (%20 – %30 – %50):</strong> Karbonhidratın kısıtlandığı yaklaşımlar; uzun vadede sürdürülebilirliği kişiye göre değişir.',
    ] },
    { h: 'Yüzde mi, kilogram başına gram mı?', p: [
      'Yüzdeyle plan yapmak kolaydır ama bir zayıf yanı vardır: toplam kalori değiştikçe protein gramı da değişir. Oysa protein ihtiyacı daha çok vücut ağırlığına bağlıdır. 1500 kcal\'lik bir kilo verme planında %20 protein yalnızca 75 gram eder ve 80 kg bir kişi için kilogram başına 1 gramın altında kalır. Bu nedenle pek çok uzman önce proteini kilogram başına gram olarak belirlemeyi, kalan kaloriyi karbonhidrat ve yağ arasında paylaştırmayı önerir.',
      'Araçtaki isteğe bağlı kilo alanı bu denetimi kolaylaştırır: kilonuzu yazdığınızda seçtiğiniz yüzdelerin kilogram başına kaç gram protein ve karbonhidrata denk geldiğini görür, gerekirse yüzdeleri buna göre ayarlarsınız.',
    ] },
    { h: 'Uygulamada dikkat edilecekler', ul: [
      'Besin etiketlerindeki değerler çoğunlukla 100 gram içindir; porsiyonunuzu tartmadan gram hesabı tutmaz.',
      'Çiğ ve pişmiş ağırlık farklıdır. Pirinç ve makarna pişince su çeker, et pişince su kaybeder; hangi ağırlığa göre kayıt tuttuğunuzu sabit tutun.',
      'Lif bir karbonhidrat türüdür ancak sindirilebilir karbonhidratlar kadar enerji vermez; araç bu ayrımı yapmaz.',
      'Hedefleri gram gram tutturmaya çalışmak yerine birkaç gramlık sapmayı olağan kabul edin; haftalık ortalama daha anlamlıdır.',
      'Makro sayımı yeme davranışıyla ilgili kaygıyı artırıyorsa bırakmak ve bir uzmandan destek almak daha doğrudur.',
    ], p: [
      'Bu hesaplayıcı bilgilendirme amaçlıdır. Diyabet, böbrek hastalığı gibi durumlarda ya da gebelik ve emzirme döneminde makro dağılımını hekiminiz ve diyetisyeninizle birlikte belirleyin.',
    ] },
  ],
  faq: [
    ['Makro besin hesaplama nasıl yapılır?', 'Günlük kalori her makronun yüzdesiyle çarpılır, çıkan kalori karbonhidrat ve protein için 4\'e, yağ için 9\'a bölünür. 2000 kcal ve %50 karbonhidrat için 1000 ÷ 4 = 250 gram bulunur.'],
    ['Yüzdelerin toplamı neden 100 olmak zorunda?', 'Çünkü üç makro besin birlikte toplam kalorinin tamamını oluşturur. Toplam 100\'den farklıysa hesaplanan gramlar girdiğiniz kaloriyle tutmaz; araç bu durumda uyarı verir.'],
    ['Kilo vermek için makrolar nasıl olmalı?', 'Kilo kaybını belirleyen temel etken toplam kalori açığıdır. Bunun içinde proteinin yeterli tutulması kas kütlesinin korunmasına yardımcı olur; karbonhidrat ve yağ arasındaki paylaşım büyük ölçüde kişisel tercih ve sürdürülebilirlik meselesidir.'],
    ['Yağ neden gram olarak az çıkıyor?', 'Yağın gramı yaklaşık 9 kcal enerji verir; bu karbonhidrat ve proteinin iki katından fazladır. Dolayısıyla aynı kalori payı için daha az gram yağ gerekir.'],
    ['Alkol makro hesabına girer mi?', 'Alkol gram başına yaklaşık 7 kcal enerji verir ama üç makro besinden biri değildir. Araç alkolü hesaba katmaz; alkollü içecek tüketiyorsanız kalorisini toplamdan ayrıca düşmeniz gerekir.'],
    ['Net karbonhidrat ile toplam karbonhidrat farkı nedir?', 'Net karbonhidrat, toplam karbonhidrattan lifin çıkarılmasıyla bulunur. Bu araç toplam karbonhidrat üzerinden hesap yapar ve lif için ayrı bir düzeltme uygulamaz.'],
    ['Öğün başına miktarlar eşit olmak zorunda mı?', 'Hayır. Araç kolaylık olsun diye eşit böler. Gün içindeki dağılımı antrenman saatinize ve alışkanlıklarınıza göre değiştirebilirsiniz; önemli olan günlük toplamdır.'],
    ['Verilerim saklanıyor mu?', 'Hayır. Tüm işlem tarayıcınızda gerçekleşir; kalori, yüzde ve kilo bilgileriniz sunucuya iletilmez.'],
  ],
  related: ['kalori-hesapla', 'protein-ihtiyaci-hesapla', 'karbonhidrat-ihtiyaci-hesapla', 'bazal-metabolizma-hesapla', 'kalori-acigi-hesapla'],
};
