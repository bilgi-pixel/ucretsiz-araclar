export default {
  slug: 'iki-bilinmeyenli-denklem-coz',
  title: 'İki Bilinmeyenli Denklem Çözme',
  h1Tail: 'x ve y bulma',
  pageTitle: 'İki Bilinmeyenli Denklem Çözme – x ve y Değerini Bulma Aracı',
  description: 'İki bilinmeyenli iki doğrusal denklemi katsayılarını yazarak çözün. x ve y değerleri, determinant, Cramer adımları; çözümsüz ve sonsuz çözümlü durumlar da belirlenir.',
  card: 'a₁x + b₁y = c₁ ve a₂x + b₂y = c₂ denklem sistemini çözün; x, y ve determinant değerlerini görün.',
  category: 'matematik',
  keywords: ['iki bilinmeyenli denklem çözme', 'denklem sistemi çözme', 'x ve y bulma', 'cramer yöntemi', 'yok etme yöntemi', 'yerine koyma yöntemi', 'iki denklem iki bilinmeyen', 'doğrusal denklem sistemi'],
  lead: '<strong>a₁x + b₁y = c₁</strong> ve <strong>a₂x + b₂y = c₂</strong> biçimindeki iki denklemin katsayılarını yazın; araç x ve y değerlerini bulur. Sistemin tek çözümü yoksa doğruların paralel mi yoksa çakışık mı olduğunu da söyler.',
  button: 'Çöz',
  inputs: [
    { id: 'a1', label: '1. denklem: x katsayısı (a₁)', type: 'number', placeholder: 'Örn. 2' },
    { id: 'b1', label: '1. denklem: y katsayısı (b₁)', type: 'number', placeholder: 'Örn. 3' },
    { id: 'c1', label: '1. denklem: sağ taraf (c₁)', type: 'number', placeholder: 'Örn. 12' },
    { id: 'a2', label: '2. denklem: x katsayısı (a₂)', type: 'number', placeholder: 'Örn. 1' },
    { id: 'b2', label: '2. denklem: y katsayısı (b₂)', type: 'number', placeholder: 'Örn. -1' },
    { id: 'c2', label: '2. denklem: sağ taraf (c₂)', type: 'number', placeholder: 'Örn. 1' },
  ],
  compute(v, h) {
    const a1 = h.num(v.a1, 'a₁'), b1 = h.num(v.b1, 'b₁'), c1 = h.num(v.c1, 'c₁');
    const a2 = h.num(v.a2, 'a₂'), b2 = h.num(v.b2, 'b₂'), c2 = h.num(v.c2, 'c₂');
    if (a1 === 0 && b1 === 0) h.err('1. denklemde x ve y katsayılarının ikisi birden sıfır olamaz; en az bir bilinmeyen bulunmalı.');
    if (a2 === 0 && b2 === 0) h.err('2. denklemde x ve y katsayılarının ikisi birden sıfır olamaz; en az bir bilinmeyen bulunmalı.');
    const sifirla = (deger, ...carpimlar) => {
      const olcek = Math.max(...carpimlar.map(Math.abs));
      return Math.abs(deger) <= 1e-12 * olcek ? 0 : deger;
    };
    const d = sifirla(a1 * b2 - a2 * b1, a1 * b2, a2 * b1);
    const dx = sifirla(c1 * b2 - c2 * b1, c1 * b2, c2 * b1);
    const dy = sifirla(a1 * c2 - a2 * c1, a1 * c2, a2 * c1);
    const s = (x) => h.fmt(x, 6);
    if (d === 0) {
      const sonsuz = dx === 0 && dy === 0;
      return {
        rows: [
          ['Çözüm', sonsuz ? 'Sonsuz çözüm var (denklemler aynı doğruyu gösterir)' : 'Çözüm yok (doğrular paralel)'],
          ['Determinant (D)', '0'],
          ['Dx', s(dx)],
          ['Dy', s(dy)],
        ],
        note: sonsuz
          ? 'İki denklem birbirinin katıdır; doğru üzerindeki her (x, y) noktası sistemi sağlar.'
          : 'Sol taraflar birbirinin katı, sağ taraflar ise aynı katta değil; iki koşul aynı anda sağlanamaz.',
      };
    }
    const x = dx / d, y = dy / d;
    return {
      rows: [
        ['Çözüm', `x = ${s(x)}, y = ${s(y)}`],
        ['x', s(x)],
        ['y', s(y)],
        ['Determinant (D)', s(d)],
        ['Dx', s(dx)],
        ['Dy', s(dy)],
      ],
      note: 'Cramer kuralı: x = Dx ÷ D, y = Dy ÷ D. Sonuçlar en fazla altı ondalık basamağa yuvarlanır.',
    };
  },
  cases: [
    { in: { a1: '2', b1: '3', c1: '12', a2: '1', b2: '-1', c2: '1' }, out: { 'Çözüm': 'x = 3, y = 2', 'x': '3', 'y': '2', 'Determinant (D)': '-5', 'Dx': '-15', 'Dy': '-10' } },
    { in: { a1: '1', b1: '1', c1: '3', a2: '1', b2: '-1', c2: '1' }, out: { 'x': '2', 'y': '1', 'Determinant (D)': '-2' } },
    { in: { a1: '3', b1: '2', c1: '7', a2: '5', b2: '-3', c2: '-1' }, out: { 'x': '1', 'y': '2', 'Determinant (D)': '-19' } },
    { in: { a1: '0,5', b1: '0,25', c1: '1', a2: '1', b2: '1', c2: '3' }, out: { 'x': '1', 'y': '2' } },
    { in: { a1: '2', b1: '1', c1: '1', a2: '1', b2: '3', c2: '2' }, out: { 'x': '0,2', 'y': '0,6', 'Determinant (D)': '5' } },
    { in: { a1: '1', b1: '1', c1: '1', a2: '2', b2: '2', c2: '5' }, out: { 'Çözüm': 'Çözüm yok (doğrular paralel)', 'Determinant (D)': '0' } },
    { in: { a1: '1', b1: '1', c1: '1', a2: '2', b2: '2', c2: '2' }, out: { 'Çözüm': 'Sonsuz çözüm var (denklemler aynı doğruyu gösterir)' } },
    { in: { a1: 'abc', b1: '1', c1: '1', a2: '2', b2: '2', c2: '2' }, error: true },
    { in: { a1: '0', b1: '0', c1: '1', a2: '2', b2: '2', c2: '2' }, error: true },
  ],
  howto: [
    'Her iki denklemi de bilinmeyenler solda, sabit sayı sağda olacak şekilde düzenleyin: <strong>a₁x + b₁y = c₁</strong> ve <strong>a₂x + b₂y = c₂</strong>.',
    'Birinci denklemin x katsayısını, y katsayısını ve sağ taraftaki sayıyı ilk üç alana; ikinci denkleminkileri son üç alana yazın. Bir denklemde bilinmeyenlerden biri yoksa katsayısına 0 girin.',
    'Eksi işaretli katsayıları işaretiyle birlikte yazın; "x − y = 1" denkleminde y katsayısı −1\'dir.',
    '"Çöz" düğmesine basın. İlk satırda çözüm, altında x ve y ayrı ayrı, ardından determinant değerleri görünür.',
    'Bulduğunuz x ve y değerlerini iki denklemde de yerine koyarak sağlama yapın.',
  ],
  sections: [
    { h: 'İki bilinmeyenli denklem sistemi nedir?', p: [
      'İçinde x ve y gibi iki bilinmeyen bulunan tek bir denklemin sonsuz çözümü vardır; örneğin x + y = 10 denklemini (1, 9), (4, 6), (7,5; 2,5) gibi sayısız ikili sağlar. Bilinmeyenleri tek tek belirleyebilmek için ikinci bir koşula, yani ikinci bir denkleme ihtiyaç duyulur. Aynı x ve y değerlerinin iki denklemi birden sağlaması istendiğinde ortaya çıkan yapıya denklem sistemi denir.',
      'Geometrik olarak her doğrusal denklem koordinat düzleminde bir doğru çizer. Sistemin çözümü bu iki doğrunun kesiştiği noktadır. Doğrular tek noktada kesişiyorsa tek çözüm vardır; paralelse hiç kesişmezler ve çözüm yoktur; üst üste biniyorlarsa bütün noktalar ortaktır ve sonsuz çözüm vardır.',
    ] },
    { h: 'Araç hangi yöntemi kullanır?', p: [
      'Hesap <strong>Cramer kuralı</strong> ile yapılır. Önce katsayılardan üç determinant bulunur:',
    ], ul: [
      '<strong>D = a₁·b₂ − a₂·b₁</strong> (katsayılar determinantı)',
      '<strong>Dx = c₁·b₂ − c₂·b₁</strong> (x sütunu yerine sağ taraf yazılır)',
      '<strong>Dy = a₁·c₂ − a₂·c₁</strong> (y sütunu yerine sağ taraf yazılır)',
    ] },
    { h: 'Sonucun yorumu', p: [
      'D sıfırdan farklıysa çözüm tektir: <strong>x = Dx ÷ D</strong> ve <strong>y = Dy ÷ D</strong>. D sıfırsa sol taraftaki katsayılar birbirinin katıdır. Bu durumda Dx ve Dy de sıfırsa iki denklem aslında aynı denklemdir ve sonsuz çözüm vardır; Dx ya da Dy sıfır değilse denklemler birbiriyle çelişir ve çözüm yoktur.',
      'Okulda öğretilen yok etme ve yerine koyma yöntemleri de aynı sonuca ulaşır; Cramer kuralı bu işlemlerin katsayılarla yazılmış kısa hâlidir. Sınavda elle çözdüğünüz bir sorunun cevabını burada kontrol edebilirsiniz.',
    ] },
    { h: 'Çözümlü örnek: Cramer kuralı', p: [
      'Sistem: 2x + 3y = 12 ve x − y = 1. Katsayılar a₁ = 2, b₁ = 3, c₁ = 12, a₂ = 1, b₂ = −1, c₂ = 1.',
      'D = 2·(−1) − 1·3 = −5. Dx = 12·(−1) − 1·3 = −15. Dy = 2·1 − 1·12 = −10. Buradan x = −15 ÷ −5 = 3 ve y = −10 ÷ −5 = 2 bulunur.',
      'Sağlama: 2·3 + 3·2 = 12 ve 3 − 2 = 1. İki denklem de sağlanıyor.',
    ] },
    { h: 'Aynı örnek yok etme yöntemiyle', p: [
      'İkinci denklemi 3 ile çarpın: 3x − 3y = 3. Birinci denklemle taraf tarafa toplayın: 2x + 3y + 3x − 3y = 12 + 3, yani 5x = 15 ve x = 3. Bu değeri x − y = 1 denkleminde yerine koyun: 3 − y = 1, y = 2. Sonuç Cramer kuralıyla aynıdır.',
      'Yok etme yönteminde amaç, bir bilinmeyenin katsayılarını iki denklemde zıt işaretli ve eşit büyüklükte yapmaktır. Yerine koyma yönteminde ise bir denklemden bir bilinmeyen diğeri cinsinden yazılır (burada x = y + 1) ve öbür denkleme taşınır.',
    ] },
    { h: 'Günlük hayattan problem örnekleri', p: [
      '<strong>Bilet problemi:</strong> Bir etkinlikte tam bilet ve öğrenci bileti olmak üzere toplam 3 bilet satılmış, tam bilet sayısı öğrenci biletinden 1 fazla çıkmıştır. x tam, y öğrenci bileti sayısı olsun: x + y = 3 ve x − y = 1. Çözüm x = 2, y = 1\'dir.',
      '<strong>Karışım problemi:</strong> İki farklı üründen alınan toplam miktar ve ödenen toplam tutar biliniyorsa, miktarlar için bir denklem, tutar için ikinci denklem kurulur. Yaş problemleri, işçi-havuz problemlerinin bazı türleri, iki farklı tarife arasındaki başa baş noktası ve kimyada karışım oranları da aynı kalıba oturur.',
      'Problemi denkleme dökerken en önemli adım bilinmeyenleri açıkça tanımlamaktır. "x neyi, y neyi gösteriyor?" sorusunu yazılı olarak yanıtlamak, sonuçta bulunan sayıların yanlış yorumlanmasını önler.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      'Denklemi standart biçime getirmeden katsayı okumak. 2x = 12 − 3y denkleminde y katsayısı −3 değil, terim sola geçtiğinde +3\'tür.',
      'Görünmeyen katsayıyı 0 sanmak. "x + y = 3" denkleminde katsayılar 1\'dir; 0 yalnızca terim hiç yoksa yazılır.',
      'Eksi işaretini sağ tarafa taşırken çevirmeyi unutmak.',
      'Araç yalnızca doğrusal (birinci dereceden) denklemleri çözer; x·y, x² ya da kök içeren denklemler bu kapsamda değildir.',
      'Sonuçlar altı ondalık basamağa yuvarlanır; 1 ÷ 3 gibi devirli sonuçlar 0,333333 olarak görünür.',
    ] },
  ],
  faq: [
    ['İki bilinmeyenli denklem nasıl çözülür?', 'Üç yaygın yöntem vardır: yok etme, yerine koyma ve Cramer kuralı. Bu araç Cramer kuralını kullanır; D = a₁b₂ − a₂b₁ determinantını hesaplar, ardından x = Dx ÷ D ve y = Dy ÷ D değerlerini bulur.'],
    ['Araç "çözüm yok" diyor, ne anlama geliyor?', 'İki denklemin sol tarafları birbirinin katı, sağ tarafları ise aynı oranda değildir. Örneğin x + y = 1 ve 2x + 2y = 5 aynı anda sağlanamaz. Grafik olarak bu iki doğru paraleldir ve kesişmez.'],
    ['"Sonsuz çözüm" ne demek?', 'İki denklem aslında aynı denklemin farklı katlarla yazılmış hâlidir, örneğin x + y = 1 ve 2x + 2y = 2. Bu durumda doğru üzerindeki her nokta çözümdür ve x ile y tek değer olarak belirlenemez.'],
    ['Bir denklemde yalnızca x varsa nasıl girerim?', 'Olmayan bilinmeyenin katsayısına 0 yazın. Örneğin 2x = 8 denklemi için a = 2, b = 0, c = 8 girilir. Aynı denklemde iki katsayı birden 0 olamaz.'],
    ['Kesirli katsayıları nasıl yazarım?', 'Ondalık karşılığını yazabilirsiniz (1/2 yerine 0,5). Devirli kesirlerde daha doğru sonuç için denklemin iki tarafını paydaların ortak katıyla çarpıp tam sayılı katsayılarla girin; çözüm değişmez.'],
    ['Determinant neyi gösterir?', 'D sıfırdan farklıysa sistemin tek çözümü olduğunu garanti eder. D sıfıra eşitse doğrular ya paralel ya da çakışıktır. Bu yüzden determinant, çözüme başlamadan önce sistemin türünü anlamanın en kısa yoludur.'],
    ['Sonucu nasıl sağlarım?', 'Bulunan x ve y değerlerini her iki denklemde yerine yazın. Sol taraf her seferinde sağ taraftaki sayıya eşit çıkmalıdır. Yuvarlanmış ondalık sonuçlarda son basamakta küçük farklar görülebilir.'],
    ['Yazdığım denklemler bir yere gönderiliyor mu?', 'Hayır. Bütün hesap tarayıcınızın içinde yapılır; katsayılar sunucuya iletilmez ve kaydedilmez.'],
  ],
  related: ['uc-bilinmeyenli-denklem-coz', 'diskriminant-hesapla', 'dogru-denklemi-bul', 'egim-hesapla', 'kesir-sadelestir'],
};
