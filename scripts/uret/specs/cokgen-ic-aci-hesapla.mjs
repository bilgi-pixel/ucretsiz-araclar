export default {
  slug: 'cokgen-ic-aci-hesapla',
  title: 'Çokgen İç Açı ve Köşegen Hesaplama',
  h1Tail: 'kenar sayısından',
  pageTitle: 'Çokgen İç Açı, Dış Açı ve Köşegen Sayısı Hesaplama',
  description: 'Kenar sayısını yazın; çokgenin iç açılar toplamını, düzgün çokgenin bir iç ve dış açısını, köşegen sayısını ve bir köşeden çizilen köşegenleri hesaplayın.',
  card: 'Kenar sayısından çokgenin iç açılar toplamını, düzgün çokgenin iç ve dış açısını ve köşegen sayısını bulun.',
  category: 'matematik',
  keywords: ['çokgen iç açı hesaplama', 'iç açılar toplamı', 'köşegen sayısı hesaplama', 'düzgün çokgen iç açısı', 'dış açı hesaplama', 'altıgen iç açısı', 'sekizgen iç açısı', 'çokgen köşegen formülü'],
  lead: 'Çokgenin kenar sayısını girin; araç <strong>iç açılar toplamını</strong>, düzgün çokgen için bir iç ve bir dış açının ölçüsünü, <strong>toplam köşegen sayısını</strong> ve bir köşeden çizilebilen köşegen sayısını tek seferde hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'kenar', label: 'Kenar sayısı (n)', type: 'number', placeholder: 'Örn. 6', hint: 'En az 3 olan bir tam sayı yazın.' },
  ],
  compute(v, h) {
    const n = h.int(v.kenar, 'Kenar sayısı');
    if (n < 3) h.err('Kenar sayısı en az 3 olmalıdır; en az kenarlı çokgen üçgendir.');
    if (n > 1000000) h.err('Kenar sayısı en fazla 1.000.000 olabilir; daha küçük bir değer yazın.');
    const adlar = { 3: 'Üçgen', 4: 'Dörtgen', 5: 'Beşgen', 6: 'Altıgen', 7: 'Yedigen', 8: 'Sekizgen', 9: 'Dokuzgen', 10: 'Ongen', 11: 'On birgen', 12: 'On ikigen', 15: 'On beşgen', 20: 'Yirmigen' };
    const toplam = (n - 2) * 180;
    return {
      rows: [
        ['İç açılar toplamı', h.fmt(toplam, 0) + '°'],
        ['Bir iç açı (düzgün çokgen)', h.fmt(toplam / n, 4) + '°'],
        ['Bir dış açı (düzgün çokgen)', h.fmt(360 / n, 4) + '°'],
        ['Dış açılar toplamı', '360°'],
        ['Köşegen sayısı', h.fmt(n * (n - 3) / 2, 0)],
        ['Bir köşeden çizilen köşegen sayısı', h.fmt(n - 3, 0)],
        ['Bir köşeden ayrılan üçgen sayısı', h.fmt(n - 2, 0)],
        ['Çokgenin adı', adlar[n] || `${h.fmt(n, 0)}-gen`],
      ],
      note: 'İç açılar toplamı ve köşegen sayısı her dışbükey çokgen için geçerlidir. Tek bir iç ve dış açının ölçüsü yalnızca bütün kenarları ve açıları eşit olan düzgün çokgenler içindir.',
    };
  },
  cases: [
    { in: { kenar: '6' }, out: { 'İç açılar toplamı': '720°', 'Bir iç açı (düzgün çokgen)': '120°', 'Bir dış açı (düzgün çokgen)': '60°', 'Köşegen sayısı': '9', 'Bir köşeden çizilen köşegen sayısı': '3', 'Çokgenin adı': 'Altıgen' } },
    { in: { kenar: '5' }, out: { 'İç açılar toplamı': '540°', 'Bir iç açı (düzgün çokgen)': '108°', 'Bir dış açı (düzgün çokgen)': '72°', 'Köşegen sayısı': '5', 'Bir köşeden ayrılan üçgen sayısı': '3' } },
    { in: { kenar: '3' }, out: { 'İç açılar toplamı': '180°', 'Bir iç açı (düzgün çokgen)': '60°', 'Köşegen sayısı': '0', 'Çokgenin adı': 'Üçgen' } },
    { in: { kenar: '4' }, out: { 'İç açılar toplamı': '360°', 'Bir iç açı (düzgün çokgen)': '90°', 'Köşegen sayısı': '2' } },
    { in: { kenar: '8' }, out: { 'İç açılar toplamı': '1.080°', 'Bir iç açı (düzgün çokgen)': '135°', 'Bir dış açı (düzgün çokgen)': '45°', 'Köşegen sayısı': '20' } },
    { in: { kenar: '7' }, out: { 'İç açılar toplamı': '900°', 'Bir iç açı (düzgün çokgen)': '128,5714°', 'Bir dış açı (düzgün çokgen)': '51,4286°', 'Köşegen sayısı': '14' } },
    { in: { kenar: '10' }, out: { 'İç açılar toplamı': '1.440°', 'Bir iç açı (düzgün çokgen)': '144°', 'Köşegen sayısı': '35' } },
    { in: { kenar: '12' }, out: { 'İç açılar toplamı': '1.800°', 'Bir iç açı (düzgün çokgen)': '150°', 'Bir dış açı (düzgün çokgen)': '30°', 'Köşegen sayısı': '54' } },
    { in: { kenar: '100' }, out: { 'İç açılar toplamı': '17.640°', 'Bir iç açı (düzgün çokgen)': '176,4°', 'Köşegen sayısı': '4.850', 'Çokgenin adı': '100-gen' } },
    { in: { kenar: '2' }, error: true },
    { in: { kenar: '5,5' }, error: true },
    { in: { kenar: 'altı' }, error: true },
  ],
  howto: [
    '"Kenar sayısı (n)" alanına çokgenin kaç kenarlı olduğunu yazın. Değer 3 ya da daha büyük bir tam sayı olmalıdır.',
    '"Hesapla" düğmesine basın.',
    'İlk satırda iç açılar toplamını, altında düzgün çokgen için bir iç açıyı ve bir dış açıyı görürsünüz.',
    'Köşegenle ilgili üç satır toplam köşegen sayısını, tek köşeden çıkan köşegenleri ve bu köşegenlerin çokgeni kaç üçgene ayırdığını verir.',
  ],
  sections: [
    { h: 'İç açılar toplamı formülü nereden gelir?', p: [
      'n kenarlı bir çokgenin iç açılarının toplamı <strong>(n − 2) × 180°</strong>\'dir. Formülün kaynağı üçgendir: çokgenin bir köşesini seçip o köşeden diğer köşelere köşegen çizdiğinizde şekil n − 2 tane üçgene ayrılır. Her üçgenin iç açıları toplamı 180° olduğundan, hepsinin toplamı çokgenin iç açılar toplamını verir.',
      'Bir dörtgende tek köşegen iki üçgen oluşturur: 2 × 180 = 360°. Beşgende iki köşegen üç üçgen verir: 3 × 180 = 540°. Kenar sayısı her bir arttığında toplam 180° büyür. Bu toplam çokgenin düzgün olup olmamasına bağlı değildir; kenarları ve açıları eşit olmayan dışbükey çokgenlerde de aynıdır.',
    ] },
    { h: 'Düzgün çokgende bir iç açı ve bir dış açı', p: [
      'Bütün kenarları ve bütün açıları eşit olan çokgene düzgün çokgen denir. Açılar eşit olduğu için tek bir iç açı, toplamın kenar sayısına bölünmesiyle bulunur: <strong>iç açı = (n − 2) × 180° ÷ n</strong>.',
      'Dış açı, bir kenarın uzantısı ile komşu kenar arasında kalan açıdır ve iç açıyı 180°\'ye tamamlar. Her dışbükey çokgende dış açıların toplamı 360°\'dir; çokgenin çevresinde bir tam tur dolaştığınızda toplam dönüşünüz bir tam tur eder. Bu yüzden düzgün çokgende <strong>dış açı = 360° ÷ n</strong> olur. Aynı değer, çokgenin merkezinde iki komşu köşeyi gören merkez açının da ölçüsüdür.',
      'Dış açı formülü ters yönde de kullanışlıdır: bir düzgün çokgenin dış açısı biliniyorsa kenar sayısı n = 360° ÷ dış açı ile bulunur. Dış açısı 40° olan düzgün çokgen 9 kenarlıdır; iç açısı 140° olan çokgenin dış açısı 40° olduğundan o da dokuzgendir.',
    ] },
    { h: 'Köşegen sayısı', p: [
      'Köşegen, komşu olmayan iki köşeyi birleştiren doğru parçasıdır. Bir köşeden kendisine ve iki komşusuna köşegen çizilemediği için her köşeden <strong>n − 3</strong> köşegen çıkar. n köşenin her birinden n − 3 köşegen sayıldığında her köşegen iki ucundan birer kez, yani iki kez sayılmış olur. Bu yüzden toplam <strong>n × (n − 3) ÷ 2</strong>\'dir.',
      'Üçgende her köşe diğer ikisine komşudur, köşegen yoktur: 3 × 0 ÷ 2 = 0. Dörtgende 4 × 1 ÷ 2 = 2, beşgende 5 × 2 ÷ 2 = 5 köşegen bulunur. Beşgen, köşegen sayısı kenar sayısına eşit olan tek çokgendir.',
    ] },
    { h: 'Çözümlü örnek: altıgen ve yedigen', p: [
      'Altıgen için n = 6 alınır. İç açılar toplamı (6 − 2) × 180 = 720°\'dir. Düzgün altıgende bir iç açı 720 ÷ 6 = 120°, bir dış açı 360 ÷ 6 = 60° olur. Köşegen sayısı 6 × 3 ÷ 2 = 9\'dur; bir köşeden 3 köşegen çıkar ve bu köşegenler altıgeni 4 üçgene ayırır.',
      'Yedigende (n = 7) iç açılar toplamı 5 × 180 = 900°\'dir. Düzgün yedigenin bir iç açısı 900 ÷ 7 ≈ 128,5714°, dış açısı 360 ÷ 7 ≈ 51,4286° çıkar; açılar tam sayı değildir. Köşegen sayısı 7 × 4 ÷ 2 = 14\'tür.',
    ] },
    { h: 'Hızlı başvuru tablosu', ul: [
      '<strong>Üçgen (3):</strong> toplam 180°, iç açı 60°, dış açı 120°, köşegen 0',
      '<strong>Dörtgen (4):</strong> toplam 360°, iç açı 90°, dış açı 90°, köşegen 2',
      '<strong>Beşgen (5):</strong> toplam 540°, iç açı 108°, dış açı 72°, köşegen 5',
      '<strong>Altıgen (6):</strong> toplam 720°, iç açı 120°, dış açı 60°, köşegen 9',
      '<strong>Sekizgen (8):</strong> toplam 1.080°, iç açı 135°, dış açı 45°, köşegen 20',
      '<strong>Dokuzgen (9):</strong> toplam 1.260°, iç açı 140°, dış açı 40°, köşegen 27',
      '<strong>Ongen (10):</strong> toplam 1.440°, iç açı 144°, dış açı 36°, köşegen 35',
      '<strong>On ikigen (12):</strong> toplam 1.800°, iç açı 150°, dış açı 30°, köşegen 54',
    ] },
    { h: 'Nerelerde karşımıza çıkar?', p: [
      'Yer ve duvar kaplamalarında bir noktada buluşan karoların açıları toplamı 360° olmalıdır. Düzgün çokgenlerden yalnızca üçgen (60°), kare (90°) ve altıgen (120°) tek başına boşluk bırakmadan düzlemi kaplayabilir; arı peteğinin altıgen olmasının geometrik açıklaması budur. Düzgün beşgenin 108°\'lik açısı 360°\'yi tam bölmediği için beşgen karolar arada boşluk bırakır.',
      'Somun ve cıvata başlarının altıgen, bazı trafik levhalarının sekizgen olması; kamelya, çardak ve masa tablası yapımında parçaların kesim açısının belirlenmesi; futbol topunun beşgen ve altıgen parçalardan oluşması bu hesabın günlük örnekleridir. Sekiz kenarlı bir çardağın kenar tahtaları birbirine 135° iç açıyla birleşir; her parçanın ucu bu açının yarısını tamamlayacak biçimde, yani 22,5° gönye payıyla kesilir.',
    ] },
    { h: 'Sınırlar ve sık yapılan hatalar', p: [
      'Toplam ile tek açıyı karıştırmak en yaygın hatadır: 720° altıgenin bütün iç açılarının toplamıdır, tek bir açısı değildir. İkinci hata, bir iç açı formülünü düzgün olmayan çokgenlere uygulamaktır; kenarları eşit olmayan bir beşgende açılar 108° olmak zorunda değildir, yalnızca toplamları 540°\'dir.',
      'Dış açılar toplamının 360° olması dışbükey çokgenler için geçerlidir. İçbükey (en az bir iç açısı 180°\'den büyük) çokgenlerde iç açılar toplamı formülü yine doğrudur, ancak bazı köşegenler şeklin dışında kalır. Kenar sayısı tam sayı olmalıdır; 2 ya da daha küçük değerlerle kapalı bir çokgen oluşmaz.',
    ] },
  ],
  faq: [
    ['Çokgenin iç açılar toplamı nasıl hesaplanır?', 'Kenar sayısından 2 çıkarılır ve sonuç 180 ile çarpılır: (n − 2) × 180°. Altıgen için (6 − 2) × 180 = 720° bulunur.'],
    ['Düzgün altıgenin bir iç açısı kaç derecedir?', '120°\'dir. İç açılar toplamı 720° olduğundan 720 ÷ 6 = 120° eder; dış açısı ise 60°\'dir.'],
    ['Köşegen sayısı formülü nedir?', 'n kenarlı bir çokgenin köşegen sayısı n × (n − 3) ÷ 2\'dir. Sekizgende 8 × 5 ÷ 2 = 20, ongende 10 × 7 ÷ 2 = 35 köşegen vardır.'],
    ['Dış açılar toplamı neden her zaman 360°\'dir?', 'Çokgenin çevresinde bir tur attığınızda her köşede dış açı kadar dönersiniz ve başladığınız yöne geri gelirsiniz. Toplam dönüş bir tam tur, yani 360° olur; kenar sayısı bunu değiştirmez.'],
    ['İç açısı bilinen düzgün çokgenin kenar sayısı nasıl bulunur?', 'Önce dış açı bulunur: 180° − iç açı. Sonra 360° dış açıya bölünür. İç açısı 150° olan düzgün çokgenin dış açısı 30°\'dir ve 360 ÷ 30 = 12 kenarlıdır.'],
    ['Üçgenin köşegeni var mıdır?', 'Hayır. Üçgende her köşe diğer iki köşeye komşudur; komşu olmayan köşe bulunmadığı için köşegen çizilemez. Formül de 3 × 0 ÷ 2 = 0 sonucunu verir.'],
    ['Hangi çokgenin köşegen sayısı kenar sayısına eşittir?', 'Beşgenin. 5 × (5 − 3) ÷ 2 = 5 köşegeni vardır. n × (n − 3) ÷ 2 = n eşitliğinin 3\'ten büyük tek çözümü n = 5\'tir.'],
    ['Girdiğim sayı kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız değer sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['duzgun-cokgen-alani-hesapla', 'altigen-alani-hesapla', 'ucgen-acisi-hesapla', 'alan-cevre-hesapla', 'derece-radyan-cevir'],
};
