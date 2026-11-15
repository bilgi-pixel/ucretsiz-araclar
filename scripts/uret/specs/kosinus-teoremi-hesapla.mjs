export default {
  slug: 'kosinus-teoremi-hesapla',
  title: 'Kosinüs Teoremi Hesaplama',
  h1Tail: 'kenar ve açı bulma',
  pageTitle: 'Kosinüs Teoremi Hesaplama – Üçüncü Kenar ve Açı Bulma',
  description: 'Kosinüs teoremiyle iki kenarı ve aradaki açısı bilinen üçgenin üçüncü kenarını ya da üç kenarı bilinen üçgenin açılarını hesaplayın; çevre ve alan dahil.',
  card: 'İki kenar ve aradaki açıdan üçüncü kenarı ya da üç kenardan açıları kosinüs teoremiyle bulun; çevre ve alanla birlikte.',
  category: 'matematik',
  keywords: ['kosinüs teoremi', 'kosinüs teoremi hesaplama', 'üçüncü kenar bulma', 'üç kenarı bilinen üçgenin açıları', 'cos teoremi', 'üçgen kenar hesaplama', 'kosinüs kuralı'],
  lead: 'Kosinüs teoremi, dik olmayan üçgenlerde de kenar ve açı bulmanızı sağlar. Bu araçla <strong>iki kenar ve aralarındaki açıdan üçüncü kenarı</strong> ya da <strong>üç kenardan bütün açıları</strong> hesaplayabilir, çevreyi ve alanı da görebilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'mod', label: 'Ne hesaplanacak?', type: 'select', wide: true, options: [['kenar', 'İki kenar ve aradaki açı biliniyor → üçüncü kenar'], ['aci', 'Üç kenar biliniyor → açılar']] },
    { id: 'kenarA', label: 'a kenarı', type: 'number', placeholder: 'Örn. 8' },
    { id: 'kenarB', label: 'b kenarı', type: 'number', placeholder: 'Örn. 5' },
    { id: 'aciC', label: 'C açısı (derece)', type: 'number', placeholder: 'Örn. 60', hint: 'a ile b kenarları arasındaki açı. Yalnızca üçüncü kenar hesabında kullanılır.' },
    { id: 'kenarC', label: 'c kenarı', type: 'number', placeholder: 'Örn. 7', hint: 'Yalnızca açı hesabında (üç kenar biliniyorken) doldurun.' },
  ],
  compute(v, h) {
    const a = h.pos(v.kenarA, 'a kenarı'), b = h.pos(v.kenarB, 'b kenarı');
    const R = Math.PI / 180;
    const acos = (x) => Math.acos(Math.max(-1, Math.min(1, x))) / R;
    const d = (x) => h.fmt(x, 4) + '°';
    const u = (x) => h.fmt(x, 4) + ' birim';
    if (v.mod === 'aci') {
      const c = h.pos(v.kenarC, 'c kenarı');
      const enb = Math.max(a, b, c), top = a + b + c;
      if (enb >= (top - enb) * (1 - 1e-12)) h.err('Bu uzunluklarla üçgen oluşmaz: en uzun kenar, diğer iki kenarın toplamından kısa olmalıdır (üçgen eşitsizliği).');
      const A = acos((b * b + c * c - a * a) / (2 * b * c));
      const B = acos((a * a + c * c - b * b) / (2 * a * c));
      const C = 180 - A - B;
      const s = top / 2, alan = Math.sqrt(Math.max(0, s * (s - a) * (s - b) * (s - c)));
      const mx = Math.max(A, B, C);
      return {
        rows: [
          ['A açısı', d(A)], ['B açısı', d(B)], ['C açısı', d(C)],
          ['Açılarına göre', Math.abs(mx - 90) < 1e-7 ? 'Dik üçgen' : mx > 90 ? 'Geniş açılı üçgen' : 'Dar açılı üçgen'],
          ['Çevre', u(top)], ['Alan', h.fmt(alan, 4) + ' birim²'],
        ],
        note: 'A açısı a kenarının, B açısı b kenarının, C açısı c kenarının karşısındadır. Alan Heron formülüyle hesaplanır.',
      };
    }
    const C = h.pos(v.aciC, 'C açısı');
    if (C >= 180) h.err('C açısı 0° ile 180° arasında olmalıdır; bir üçgenin iç açısı 180° ya da daha büyük olamaz.');
    const c = Math.sqrt(Math.max(0, a * a + b * b - 2 * a * b * Math.cos(C * R)));
    const A = acos((b * b + c * c - a * a) / (2 * b * c));
    const B = 180 - A - C;
    return {
      rows: [
        ['c kenarı', u(c)], ['A açısı', d(A)], ['B açısı', d(B)], ['C açısı', d(C)],
        ['Çevre', u(a + b + c)], ['Alan', h.fmt(0.5 * a * b * Math.sin(C * R), 4) + ' birim²'],
      ],
      note: 'c² = a² + b² − 2ab·cos C. Alan ½·a·b·sin C formülüyle hesaplanır. Kenarları hangi birimle yazdıysanız sonuç da o birimdedir.',
    };
  },
  cases: [
    { in: { mod: 'kenar', kenarA: '8', kenarB: '5', aciC: '60' }, out: { 'c kenarı': '7 birim', 'A açısı': '81,7868°', 'B açısı': '38,2132°', 'Çevre': '20 birim', 'Alan': '17,3205 birim²' } },
    { in: { mod: 'aci', kenarA: '7', kenarB: '8', kenarC: '5' }, out: { 'A açısı': '60°', 'B açısı': '81,7868°', 'C açısı': '38,2132°', 'Alan': '17,3205 birim²' } },
    { in: { mod: 'kenar', kenarA: '3', kenarB: '4', aciC: '90' }, out: { 'c kenarı': '5 birim', 'A açısı': '36,8699°', 'B açısı': '53,1301°', 'Alan': '6 birim²' } },
    { in: { mod: 'aci', kenarA: '3', kenarB: '4', kenarC: '5' }, out: { 'C açısı': '90°', 'Açılarına göre': 'Dik üçgen', 'Çevre': '12 birim', 'Alan': '6 birim²' } },
    { in: { mod: 'kenar', kenarA: '10', kenarB: '10', aciC: '120' }, out: { 'c kenarı': '17,3205 birim', 'A açısı': '30°', 'B açısı': '30°', 'Alan': '43,3013 birim²' } },
    { in: { mod: 'aci', kenarA: '2', kenarB: '2', kenarC: '2' }, out: { 'A açısı': '60°', 'B açısı': '60°', 'C açısı': '60°', 'Alan': '1,7321 birim²' } },
    { in: { mod: 'aci', kenarA: '5', kenarB: '5', kenarC: '8' }, out: { 'C açısı': '106,2602°', 'A açısı': '36,8699°', 'Açılarına göre': 'Geniş açılı üçgen', 'Alan': '12 birim²' } },
    { in: { mod: 'kenar', kenarA: '5', kenarB: '5', aciC: '60' }, out: { 'c kenarı': '5 birim' } },
    { in: { mod: 'aci', kenarA: '1', kenarB: '2', kenarC: '5' }, error: true },
    { in: { mod: 'aci', kenarA: '1', kenarB: '2', kenarC: '3' }, error: true },
    { in: { mod: 'kenar', kenarA: '3', kenarB: '4', aciC: '180' }, error: true },
    { in: { mod: 'kenar', kenarA: '3', kenarB: '', aciC: '60' }, error: true },
  ],
  howto: [
    '"Ne hesaplanacak?" listesinden elinizdeki bilgiye uyan seçeneği işaretleyin: iki kenar ve aradaki açı ya da üç kenar.',
    'a ve b kenarlarını yazın. Üçüncü kenarı arıyorsanız bu iki kenarın arasındaki C açısını derece olarak girin; açıları arıyorsanız c kenarını doldurun.',
    '"Hesapla" düğmesine basın. Seçiminize göre üçüncü kenar ya da üç açı listelenir.',
    'Çevre ve alan satırlarını da kullanabilirsiniz. Kenarları santimetreyle girdiyseniz "birim" santimetre, "birim²" santimetrekare anlamına gelir.',
  ],
  sections: [
    { h: 'Kosinüs teoremi nedir?', p: [
      'Kosinüs teoremi, bir üçgenin üç kenarı ile bir açısı arasındaki bağıntıdır. Kenarları a, b, c ve c kenarının karşısındaki açı C olan üçgende <strong>c² = a² + b² − 2·a·b·cos C</strong> eşitliği geçerlidir. Aynı bağıntı diğer kenarlar için de yazılır: a² = b² + c² − 2bc·cos A ve b² = a² + c² − 2ac·cos B.',
      'Bu teorem Pisagor bağıntısının genelleştirilmiş hâlidir. C açısı 90° olduğunda cos 90° = 0 olur, son terim düşer ve geriye c² = a² + b² kalır. Açı 90°\'den küçükse kosinüs pozitiftir ve c, dik üçgendeki hipotenüsten kısa çıkar; açı 90°\'den büyükse kosinüs negatiftir ve c daha uzun olur.',
    ] },
    { h: 'İki kenar ve aradaki açıdan üçüncü kenar: çözümlü örnek', p: [
      'a = 8, b = 5 ve aralarındaki açı C = 60° olsun. cos 60° = 0,5 olduğundan c² = 8² + 5² − 2·8·5·0,5 = 64 + 25 − 40 = 49 ve c = 7 bulunur. Çevre 8 + 5 + 7 = 20 birimdir.',
      'Araç kalan açıları da verir. A açısı için teorem tersinden kullanılır: cos A = (b² + c² − a²) ÷ (2bc) = (25 + 49 − 64) ÷ 70 = 1/7, buradan A ≈ 81,7868° çıkar. B açısı 180 − 60 − 81,7868 = 38,2132° olur. Alan ½·a·b·sin C = ½·8·5·sin 60° ≈ 17,3205 birimkaredir.',
    ] },
    { h: 'Üç kenardan açı bulma: çözümlü örnek', p: [
      'Üç kenar bilindiğinde formül açıya göre düzenlenir: <strong>cos C = (a² + b² − c²) ÷ (2ab)</strong>. Kenarları 3, 4 ve 5 olan üçgende cos C = (9 + 16 − 25) ÷ 24 = 0, yani C = 90°\'dir; bu bilinen 3-4-5 dik üçgenidir. Diğer açılar 36,8699° ve 53,1301° çıkar.',
      'Kenarları 5, 5 ve 8 olan ikizkenar üçgende cos C = (25 + 25 − 64) ÷ 50 = −0,28 bulunur. Kosinüsün negatif çıkması açının geniş olduğunu gösterir: C ≈ 106,2602°. Taban açılarının her biri 36,8699°\'dir. Bu yöntemin güzel yanı, sonucun işaretinden üçgenin dar mı geniş açılı mı olduğunun hemen anlaşılmasıdır.',
    ] },
    { h: 'Hangi durumda kosinüs, hangi durumda sinüs teoremi?', ul: [
      '<strong>İki kenar ve aralarındaki açı</strong> (kenar-açı-kenar) biliniyorsa: kosinüs teoremi.',
      '<strong>Üç kenar</strong> biliniyorsa: kosinüs teoremi.',
      '<strong>İki açı ve bir kenar</strong> biliniyorsa: sinüs teoremi daha kısa yoldur.',
      '<strong>İki kenar ve bunlardan birinin karşısındaki açı</strong> biliniyorsa: sinüs teoremi kullanılır; bu durumda iki farklı üçgen çıkabilir.',
      '<strong>Dik üçgen</strong> söz konusuysa: Pisagor bağıntısı ve temel trigonometrik oranlar yeterlidir.',
    ] },
    { h: 'Kullanım alanları', p: [
      'Arazi ölçümünde aradaki engel yüzünden doğrudan ölçülemeyen bir mesafe, üçüncü bir noktadan iki uca olan uzaklıklar ve aradaki açı ölçülerek kosinüs teoremiyle bulunur. Bir gölün iki kıyısı arasındaki açıklık bunun klasik örneğidir. Denizcilik ve havacılıkta rota değiştiren bir aracın başlangıç noktasına uzaklığı aynı yolla hesaplanır.',
      'Fizikte aralarında θ açısı bulunan iki kuvvetin bileşkesi R² = F₁² + F₂² + 2·F₁·F₂·cos θ ile bulunur; bu, kosinüs teoreminin vektörlere uygulanmış biçimidir. Marangozlukta ve çelik konstrüksiyonda üç parça uzunluğu belli olan bir çerçevenin köşe kesim açıları da üç kenardan açı hesabıyla çıkarılır. Yapı ve imalat işlerinde sonuç bilgilendirme amaçlıdır; taşıyıcı elemanlar için mühendis hesabı esas alınmalıdır.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En önemli nokta, kullanılan açının <strong>bilinen iki kenarın arasındaki açı</strong> olmasıdır. Açı kenarlardan birinin karşısındaysa bu formül doğrudan uygulanamaz. İkinci yaygın hata işlem sırasıdır: 2ab·cos C çarpımı bir bütündür; önce a² + b² − 2ab hesaplanıp sonra kosinüsle çarpılmaz. Üçüncüsü, c²\'yi bulduktan sonra karekök almayı unutmaktır.',
      'Üç kenar girildiğinde uzunluklar üçgen eşitsizliğini sağlamalıdır: en uzun kenar diğer ikisinin toplamından kısa olmalıdır. 1, 2 ve 5 gibi değerlerle üçgen kapanmaz ve araç uyarı verir. Sonuçlar dört ondalık basamağa yuvarlanır; üç kenarın da aynı birimle yazılması gerekir.',
    ] },
  ],
  faq: [
    ['Kosinüs teoremi formülü nedir?', 'c² = a² + b² − 2·a·b·cos C. Burada C, a ve b kenarları arasındaki açıdır ve c bu açının karşısındaki kenardır. Açı bulmak için cos C = (a² + b² − c²) ÷ (2ab) biçiminde yazılır.'],
    ['Kosinüs teoremi ne zaman kullanılır?', 'İki kenar ve aralarındaki açı bilinip üçüncü kenar arandığında ya da üç kenar bilinip açılar arandığında kullanılır. Bu iki durumda sinüs teoremi tek başına yeterli olmaz.'],
    ['Kosinüs teoremi dik üçgende de geçerli midir?', 'Evet. Açı 90° olduğunda cos 90° = 0 olur ve formül c² = a² + b² biçimine, yani Pisagor bağıntısına dönüşür. Pisagor bağıntısı kosinüs teoreminin özel hâlidir.'],
    ['Kenarları 7, 8 ve 5 olan üçgenin açıları nedir?', '7 birimlik kenarın karşısındaki açı 60°, 8 birimlik kenarın karşısındaki açı yaklaşık 81,79°, 5 birimlik kenarın karşısındaki açı yaklaşık 38,21°\'dir.'],
    ['Kosinüs negatif çıkarsa ne anlama gelir?', 'Hesapladığınız açının 90°\'den büyük, yani geniş açı olduğunu gösterir. Bu bir hata değildir; ters kosinüs alındığında 90° ile 180° arasında bir açı elde edilir.'],
    ['Hangi uzunluklarla üçgen oluşmaz?', 'En uzun kenar, diğer iki kenarın toplamına eşit ya da ondan büyükse üçgen oluşmaz. Örneğin 1, 2 ve 3 uzunlukları bir doğru parçası üzerinde üst üste biner, 1, 2 ve 5 ise hiç kapanmaz.'],
    ['Alan nasıl hesaplanıyor?', 'İki kenar ve aradaki açı verildiğinde alan ½·a·b·sin C ile, üç kenar verildiğinde Heron formülüyle (yarı çevre üzerinden) hesaplanır. İki yöntem aynı üçgen için aynı sonucu verir.'],
    ['Girdiğim ölçüler saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızda gerçekleşir; yazdığınız kenar ve açı değerleri sunucuya gönderilmez.'],
  ],
  related: ['sinus-teoremi-hesapla', 'ucgen-acisi-hesapla', 'dik-ucgen-hesapla', 'ucgen-alani-hesapla', 'kosinus-hesapla', 'vektor-hesapla'],
};
