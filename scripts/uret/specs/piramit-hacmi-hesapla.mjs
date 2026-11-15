export default {
  slug: 'piramit-hacmi-hesapla',
  title: 'Piramit Hacmi Hesaplama',
  h1Tail: 'kare ve dikdörtgen tabanlı',
  pageTitle: 'Piramit Hacmi Hesaplama – Kare ve Dikdörtgen Tabanlı Piramit',
  description: 'Kare ya da dikdörtgen tabanlı piramidin hacmini taban kenarları ve yükseklikten hesaplayın. Taban alanı, yanal alan ve toplam yüzey alanı da gösterilir.',
  card: 'Kare ya da dikdörtgen tabanlı piramidin hacmini, yanal alanını ve toplam yüzey alanını hesaplayın.',
  category: 'matematik',
  keywords: ['piramit hacmi hesaplama', 'piramit hacim formülü', 'kare piramit hacmi', 'dikdörtgen piramit hacmi', 'piramidin hacmi nasıl bulunur', 'piramit yüzey alanı', 'taban alanı çarpı yükseklik bölü 3'],
  lead: `Tabanı kare ya da dikdörtgen olan dik piramidin hacmini <strong>V = taban alanı · yükseklik ÷ 3</strong> formülüyle hesaplayın. İkinci taban kenarını boş bırakırsanız taban kare kabul edilir; araç yanal alanı ve toplam yüzey alanını da verir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'kenarA', label: 'Taban kenarı (a)', type: 'number', placeholder: 'Örn. 6' },
    { id: 'kenarB', label: 'Diğer taban kenarı (b)', type: 'number', placeholder: 'Boş = kare taban', hint: 'Taban kare ise boş bırakın.' },
    { id: 'yukseklik', label: 'Yükseklik (dik)', type: 'number', placeholder: 'Örn. 4' },
    { id: 'birim', label: 'Uzunluk birimi', type: 'select', options: [['cm', 'Santimetre (cm)'], ['m', 'Metre (m)'], ['mm', 'Milimetre (mm)']] },
  ],
  compute(v, h) {
    const a = h.pos(v.kenarA, 'Taban kenarı (a)');
    const kare = String(v.kenarB ?? '').trim() === '';
    const b2 = kare ? a : h.pos(v.kenarB, 'Diğer taban kenarı (b)');
    const yuk = h.pos(v.yukseklik, 'Yükseklik');
    const b = v.birim === 'm' || v.birim === 'mm' ? v.birim : 'cm';
    const litreKat = b === 'm' ? 1000 : b === 'mm' ? 1e-6 : 1e-3;
    const taban = a * b2;
    const hacim = taban * yuk / 3;
    // a kenarına oturan yan yüzün yüksekliği, tepe izdüşümünün o kenara uzaklığı b/2 olduğundan √(h² + (b/2)²)
    const yanA = Math.sqrt(yuk * yuk + (b2 / 2) * (b2 / 2));
    const yanB = Math.sqrt(yuk * yuk + (a / 2) * (a / 2));
    const yanal = a * yanA + b2 * yanB;
    const rows = [
      ['Hacim', `${h.fmt(hacim, 4)} ${b}³`],
      ['Litre karşılığı', `${h.fmt(hacim * litreKat, 4)} L`],
      ['Taban alanı', `${h.fmt(taban, 4)} ${b}²`],
      ['Yanal alan', `${h.fmt(yanal, 4)} ${b}²`],
      ['Toplam yüzey alanı', `${h.fmt(yanal + taban, 4)} ${b}²`],
    ];
    if (Math.abs(a - b2) < 1e-12) rows.push(['Yan yüz yüksekliği', `${h.fmt(yanA, 4)} ${b}`]);
    rows.push(['Aynı ölçülerdeki prizmanın hacmi', `${h.fmt(taban * yuk, 4)} ${b}³`]);
    return {
      rows,
      note: 'Tepe noktasının taban merkezinin tam üstünde olduğu dik piramit varsayılır. Hacim eğik piramitte de aynıdır; yanal alan yalnızca dik piramit için geçerlidir.',
    };
  },
  cases: [
    { in: { kenarA: '6', kenarB: '', yukseklik: '4', birim: 'cm' }, out: { 'Hacim': '48 cm³', 'Taban alanı': '36 cm²', 'Yanal alan': '60 cm²', 'Toplam yüzey alanı': '96 cm²', 'Yan yüz yüksekliği': '5 cm' } },
    { in: { kenarA: '3', kenarB: '4', yukseklik: '5', birim: 'cm' }, out: { 'Hacim': '20 cm³', 'Taban alanı': '12 cm²', 'Yanal alan': '37,0361 cm²', 'Toplam yüzey alanı': '49,0361 cm²' } },
    { in: { kenarA: '10', kenarB: '', yukseklik: '12', birim: 'cm' }, out: { 'Hacim': '400 cm³', 'Litre karşılığı': '0,4 L', 'Yanal alan': '260 cm²', 'Toplam yüzey alanı': '360 cm²', 'Yan yüz yüksekliği': '13 cm' } },
    { in: { kenarA: '230', kenarB: '', yukseklik: '146', birim: 'm' }, out: { 'Hacim': '2.574.466,6667 m³', 'Taban alanı': '52.900 m²' } },
    { in: { kenarA: '6', kenarB: '8', yukseklik: '10', birim: 'm' }, out: { 'Hacim': '160 m³', 'Litre karşılığı': '160.000 L', 'Aynı ölçülerdeki prizmanın hacmi': '480 m³' } },
    { in: { kenarA: '1', kenarB: '1', yukseklik: '3', birim: 'm' }, out: { 'Hacim': '1 m³', 'Litre karşılığı': '1.000 L' } },
    { in: { kenarA: '6', kenarB: '', yukseklik: '0', birim: 'cm' }, error: true },
    { in: { kenarA: '', kenarB: '4', yukseklik: '5', birim: 'cm' }, error: true },
    { in: { kenarA: '6', kenarB: '-2', yukseklik: '5', birim: 'cm' }, error: true },
  ],
  howto: [
    `"Taban kenarı (a)" alanına tabanın bir kenarını yazın.`,
    `Taban dikdörtgense "Diğer taban kenarı (b)" alanını doldurun; taban kare ise bu alanı boş bırakın.`,
    `"Yükseklik" alanına tepe noktasından taban düzlemine inen dik uzaklığı girin; yan yüz üzerinde ölçülen eğik uzunluğu değil.`,
    `Birimi seçip "Hesapla" düğmesine basın. Hacim, litre karşılığı, taban alanı, yanal alan ve toplam yüzey alanı listelenir.`,
  ],
  sections: [
    { h: 'Piramit hacmi formülü', p: [
      `Piramit, tabanı bir çokgen olan ve tabanın köşelerinin tek bir tepe noktasında birleştiği cisimdir. Yan yüzleri üçgendir. Tabanın biçimi ne olursa olsun hacim aynı kuralla bulunur: <strong>V = taban alanı · yükseklik ÷ 3</strong>. Kare tabanlı piramitte taban alanı a², dolayısıyla V = a² · h ÷ 3; dikdörtgen tabanlı piramitte taban alanı a · b, dolayısıyla V = a · b · h ÷ 3 olur.`,
      `Üçe bölme, piramidin aynı taban ve yükseklikteki prizmanın tam üçte biri kadar yer kaplamasından gelir. Bunu görmenin güzel bir yolu vardır: bir küp, tepe noktaları küpün aynı köşesinde buluşan üç eş piramide ayrılabilir. Araç karşılaştırma için aynı ölçülerdeki prizmanın hacmini de ayrı satırda gösterir.`,
    ] },
    { h: 'Çözümlü örnek: kare tabanlı piramit', p: [
      `Taban kenarı 6 cm, yüksekliği 4 cm olan kare piramidi ele alalım. Taban alanı 6 · 6 = 36 cm², hacim 36 · 4 ÷ 3 = <strong>48 cm³</strong> olur. Yan yüzlerin yüksekliğini bulmak için tabanın merkezinden kenarın ortasına olan uzaklık (3 cm) ile piramidin yüksekliği (4 cm) bir dik üçgen oluşturur; hipotenüs √(3² + 4²) = 5 cm\'dir. Her yan yüz, tabanı 6 cm ve yüksekliği 5 cm olan bir üçgendir; alanı 15 cm², dört yüzün toplamı <strong>60 cm²</strong> eder. Taban da eklendiğinde toplam yüzey alanı 96 cm² olur.`,
    ] },
    { h: 'Çözümlü örnek: dikdörtgen tabanlı piramit', p: [
      `Tabanı 3 cm × 4 cm, yüksekliği 5 cm olan piramidin hacmi 3 · 4 · 5 ÷ 3 = <strong>20 cm³</strong> çıkar. Dikdörtgen tabanda karşılıklı yan yüzler eş, komşu yan yüzler farklıdır. 3 cm\'lik kenara oturan yüzlerin yüksekliği √(5² + 2²) = √29 ≈ 5,3852 cm; 4 cm\'lik kenara oturan yüzlerin yüksekliği √(5² + 1,5²) = √27,25 ≈ 5,2202 cm\'dir. Yanal alan 3 · 5,3852 + 4 · 5,2202 ≈ <strong>37,0361 cm²</strong>, toplam yüzey alanı ise 12 cm²\'lik tabanla birlikte 49,0361 cm² olur.`,
    ] },
    { h: 'Yükseklik, yan yüz yüksekliği ve yan ayrıt', p: [
      `Piramitte üç ayrı "eğik" ya da "dik" uzunluk vardır ve sorularda sıkça karıştırılır. <strong>Cisim yüksekliği</strong> tepeden taban düzlemine inen dik doğrudur; hacim formülünde bu kullanılır. <strong>Yan yüz yüksekliği</strong> (apotem) tepeden bir taban kenarının ortasına, yüz üzerinden inen doğrudur ve yanal alan hesabında gerekir. <strong>Yan ayrıt</strong> ise tepeyi taban köşesine bağlayan kenardır. Bu üçü her zaman cisim yüksekliği < yan yüz yüksekliği < yan ayrıt sırasını izler. Elinizde yan yüz yüksekliği varsa kare piramitte cisim yüksekliğini h = √(yan yüz yüksekliği² − (a ÷ 2)²) ile bulup araca girin.`,
    ] },
    { h: 'Gerçek dünyadan bir ölçek', p: [
      `Piramit denince akla gelen Mısır\'daki büyük piramit, yaklaşık 230 metre taban kenarına ve özgün hâlinde yaklaşık 146 metre yüksekliğe sahip kare tabanlı bir yapıdır. Bu yuvarlak değerlerle hacim 230² · 146 ÷ 3 ≈ <strong>2.574.467 m³</strong> çıkar. Gündelik kullanımda ise piramit formülü çadır ve çatı altı hacimleri, piramit biçimli saksı, ambalaj ve dekoratif objeler, dökme malzeme bunkerlerinin piramit biçimli dip kısımları için işe yarar.`,
    ] },
    { h: 'Varsayımlar ve sık yapılan hatalar', ul: [
      `Araç, tepe noktası taban merkezinin tam üstünde olan dik piramidi esas alır. Tepe yana kaymışsa hacim değişmez, ancak yanal alan satırı geçerliliğini yitirir.`,
      `Üçe bölmeyi unutmak en sık görülen hatadır; bu durumda prizmanın hacmi bulunmuş olur.`,
      `Yükseklik yerine yan yüz yüksekliğini ya da yan ayrıtı yazmak hacmi olduğundan büyük gösterir.`,
      `Tabanı üçgen, altıgen ya da başka bir çokgen olan piramitlerde önce taban alanını ayrıca hesaplayıp yükseklikle çarpın ve üçe bölün; bu araç yalnızca kare ve dikdörtgen tabanı destekler.`,
      `Tepesi kesilmiş (kesik) piramitler için bu formül doğrudan uygulanamaz.`,
    ] },
  ],
  faq: [
    ['Piramidin hacmi nasıl hesaplanır?', 'Taban alanı yükseklikle çarpılıp üçe bölünür. Kare tabanlı piramitte V = a² · h ÷ 3 olur; taban kenarı 6 cm ve yüksekliği 4 cm olan piramidin hacmi 48 cm³\'tür.'],
    ['Piramit hacmi neden üçe bölünür?', 'Aynı taban ve yükseklikteki bir prizma tam üç piramit hacmine eşittir. Bir küpün üç eş piramide ayrılabilmesi bu oranın en bilinen gösterimidir; koni ile silindir arasında da aynı ilişki vardır.'],
    ['Dikdörtgen tabanlı piramidin hacmi nasıl bulunur?', 'Taban kenarları çarpılarak taban alanı bulunur, yükseklikle çarpılır ve üçe bölünür: V = a · b · h ÷ 3. Tabanı 3 × 4 cm, yüksekliği 5 cm olan piramit 20 cm³ eder.'],
    ['Yanal alan ne demektir?', 'Piramidin taban dışındaki üçgen yüzlerinin alanları toplamıdır. Kare tabanlı dik piramitte yanal alan 2 · a · (yan yüz yüksekliği) ile bulunur. Toplam yüzey alanı için buna taban alanı eklenir.'],
    ['Üçgen tabanlı piramit için bu aracı kullanabilir miyim?', 'Doğrudan hayır; araç kare ve dikdörtgen tabanları hesaplar. Ancak kural aynıdır: üçgen tabanın alanını bulun, yükseklikle çarpın ve üçe bölün.'],
    ['Yüksekliği bilmiyorsam ne yapabilirim?', 'Kare tabanlı piramitte yan yüz yüksekliği biliniyorsa h = √(yan yüz yüksekliği² − (a ÷ 2)²) bağıntısıyla cisim yüksekliğini bulabilirsiniz. Örneğin a = 10 cm ve yan yüz yüksekliği 13 cm ise yükseklik 12 cm\'dir.'],
    ['Eğik piramitte hacim değişir mi?', 'Hayır. Tepe noktası nereye kayarsa kaysın, taban alanı ve dik yükseklik aynı kaldıkça hacim aynıdır. Değişen yalnızca yan yüzlerin biçimi ve alanıdır.'],
    ['Girdiğim ölçüler bir yere kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızın içinde yapılır; yazdığınız değerler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['koni-hacmi-hesapla', 'prizma-hacmi-hesapla', 'kup-hacmi-hesapla', 'ucgen-alani-hesapla', 'dik-ucgen-hesapla', 'cati-alani-hesapla'],
};
