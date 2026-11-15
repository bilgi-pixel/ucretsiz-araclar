export default {
  slug: 'newton-kgf-cevir',
  title: 'Newton Kilogram-Kuvvet Çevirici',
  h1Tail: 'N ↔ kgf ↔ lbf',
  pageTitle: "Newton Kilogram-Kuvvet Çevirici – N, kgf, kN, daN, lbf Dönüştürme",
  description: "Kuvveti Newton, kilogram-kuvvet (kgf), kilonewton, dekanewton ve pound-kuvvet arasında çevirin. 1 kgf = 9,80665 N tanımıyla anında ve çift yönlü hesaplama.",
  card: "Kuvveti Newton, kgf, kN, daN ve lbf arasında çevirin; 1 kgf = 9,80665 N tanımıyla çift yönlü hesap.",
  category: 'birim',
  keywords: ['newton kgf çevirme', 'kgf newton çevirme', '1 kgf kaç newton', '1 newton kaç kg', 'kilonewton kg çevirme', 'kuvvet birimi çevirme', 'dekanewton kg'],
  lead: "Bir kuvvet değerini <strong>Newton (N)</strong>, <strong>kilogram-kuvvet (kgf)</strong>, kilonewton (kN), dekanewton (daN) ve pound-kuvvet (lbf) arasında çevirin. Araç, uluslararası tanım olan <strong>1 kgf = 9,80665 N</strong> eşitliğini kullanır.",
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Kuvvet değeri', type: 'number', placeholder: 'Örn. 100' },
    { id: 'birim', label: 'Girilen değerin birimi', type: 'select', options: [['n', 'Newton (N)'], ['kgf', 'Kilogram-kuvvet (kgf)'], ['kn', 'Kilonewton (kN)'], ['dan', 'Dekanewton (daN)'], ['lbf', 'Pound-kuvvet (lbf)']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Kuvvet değeri');
    const KGF = 9.80665;
    const LBF = 4.4482216152605;
    const carpan = { n: 1, kgf: KGF, kn: 1000, dan: 10, lbf: LBF };
    const n = x * (carpan[v.birim] || 1);
    const satirlar = {
      n: ['Newton', h.fmt(n, 5) + ' N'],
      kgf: ['Kilogram-kuvvet', h.fmt(n / KGF, 5) + ' kgf'],
      kn: ['Kilonewton', h.fmt(n / 1000, 6) + ' kN'],
      dan: ['Dekanewton', h.fmt(n / 10, 6) + ' daN'],
      lbf: ['Pound-kuvvet', h.fmt(n / LBF, 5) + ' lbf'],
    };
    const sira = v.birim === 'n' || !satirlar[v.birim] ? ['kgf', 'n', 'kn', 'dan', 'lbf'] : ['n', 'kgf', 'kn', 'dan', 'lbf'];
    return {
      rows: sira.map((k) => satirlar[k]),
      note: '1 kgf = 9,80665 N (standart yerçekimi ivmesine dayalı tam tanım), 1 lbf = 4,4482216152605 N alınır.',
    };
  },
  cases: [
    { in: { deger: '1', birim: 'kgf' }, out: { 'Newton': '9,80665 N', 'Dekanewton': '0,980665 daN' } },
    { in: { deger: '100', birim: 'n' }, out: { 'Kilogram-kuvvet': '10,19716 kgf', 'Pound-kuvvet': '22,48089 lbf', 'Kilonewton': '0,1 kN' } },
    { in: { deger: '9,80665', birim: 'n' }, out: { 'Kilogram-kuvvet': '1 kgf' } },
    { in: { deger: '1', birim: 'kn' }, out: { 'Newton': '1.000 N', 'Kilogram-kuvvet': '101,97162 kgf' } },
    { in: { deger: '75', birim: 'kgf' }, out: { 'Newton': '735,49875 N' } },
    { in: { deger: '1', birim: 'lbf' }, out: { 'Newton': '4,44822 N' } },
    { in: { deger: '50', birim: 'dan' }, out: { 'Newton': '500 N', 'Kilonewton': '0,5 kN' } },
    { in: { deger: '0', birim: 'n' }, out: { 'Kilogram-kuvvet': '0 kgf' } },
    { in: { deger: 'kuvvet', birim: 'n' }, error: true },
    { in: { deger: '-10', birim: 'kgf' }, error: true },
  ],
  howto: [
    "'Kuvvet değeri' alanına çevirmek istediğiniz sayıyı yazın; ondalık için virgül ya da nokta kullanabilirsiniz.",
    "'Girilen değerin birimi' listesinden değerin Newton, kgf, kN, daN ya da lbf olduğunu seçin.",
    "'Çevir' düğmesine basın. Aynı kuvvetin beş birimdeki karşılığı alt alta listelenir.",
    "Sonuçları bir hesap tablosuna ya da rapora aktarmak için 'Sonucu kopyala' düğmesini kullanın.",
  ],
  sections: [
    { h: 'Newton ve kilogram-kuvvet nedir?', p: [
      "<strong>Newton</strong>, uluslararası birim sisteminde kuvvetin birimidir. Bir kilogramlık kütleye saniyede bir metre/saniyelik hız kazandıran, yani 1 m/s² ivme veren kuvvet 1 newtondur. Kabaca, avucunuzda duran orta boy bir elmanın elinize uyguladığı kuvvet 1 newton kadardır.",
      "<strong>Kilogram-kuvvet</strong> ise bir kilogramlık kütlenin, standart yerçekimi altında ağırlık olarak uyguladığı kuvvettir. Standart yerçekimi ivmesi 9,80665 m/s² kabul edildiği için 1 kgf tam olarak 9,80665 newtondur. Bu birim eski teknik belgelerde <strong>kilopond (kp)</strong> adıyla da geçer; 1 kp ile 1 kgf aynı şeydir. Gündelik dilde 'şu halat 500 kilo taşır' dediğimizde aslında kilogram-kuvveti kastederiz.",
    ] },
    { h: 'Kütle ile kuvvet farkı', p: [
      "Kilogram kütle birimidir; cismin içerdiği madde miktarını anlatır ve nerede olursanız olun değişmez. Kuvvet ise bir etkileşimdir; ağırlık, kütleye etkiyen yerçekimi kuvvetidir. 70 kilogram kütleli bir insanın Dünya'daki ağırlığı yaklaşık 686 newton, yani 70 kgf'dir. Aynı kişi Ay'da yine 70 kilogram kütleye sahiptir, ama ağırlığı bunun yaklaşık altıda birine düşer.",
      "Kilogram-kuvvetin pratikliği de buradan gelir: Dünya yüzeyinde bir cismin kilogram cinsinden kütlesi ile kgf cinsinden ağırlığı sayıca aynıdır. Ancak bilimsel ve mühendislik hesaplarında birimlerin tutarlı kalması için kuvvetin newton olarak yazılması gerekir.",
    ] },
    { h: 'Çeviri formülleri ve çözümlü örnekler', p: [
      "Kilogram-kuvvetten newtona geçmek için 9,80665 ile çarpılır: <strong>N = kgf × 9,80665</strong>. Newtondan kilogram-kuvvete geçmek için aynı sayıya bölünür: <strong>kgf = N ÷ 9,80665</strong>. Kilonewton 1000 newton, dekanewton 10 newtondur. Pound-kuvvet için 1 lbf = 4,44822 N alınır.",
      "Örnek 1: 100 N kaç kgf eder? 100 ÷ 9,80665 = 10,19716 kgf. Aynı kuvvet 0,1 kN, 10 daN ve 22,48089 lbf'dir.",
      "Örnek 2: 75 kilogramlık bir yükün ağırlığı 75 kgf'dir. Newton olarak 75 × 9,80665 = 735,49875 N, yani yaklaşık 0,735 kN eder.",
      "Örnek 3: Bir ankraj için 1 kN çekme dayanımı verilmiş. 1000 ÷ 9,80665 = 101,97162 kgf. Akılda tutmak için: 1 kN yaklaşık 100 kilogramlık bir yükün ağırlığı kadardır.",
    ] },
    { h: 'Dekanewton neden kullanılır?', p: [
      "Dekanewton 10 newtona eşittir ve 1 daN = 1,0197 kgf eder. Yani dekanewton ile kilogram-kuvvet arasındaki fark yalnızca yüzde 2 dolayındadır. Bu yakınlık sayesinde, eskiden kilogram-kuvvetle ifade edilen değerler SI birimlerine geçilirken neredeyse aynı sayıyla dekanewton olarak yazılabilmiştir. Yük sabitleme kayışlarının (spanzet) etiketlerinde, halat ve zincir kataloglarında, pencere ve kapı donanımı testlerinde dekanewtona sık rastlanır.",
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      "<strong>1 N</strong> = 0,10197 kgf = 0,22481 lbf",
      "<strong>1 kgf</strong> = 9,80665 N = 2,20462 lbf",
      "<strong>1 daN</strong> = 10 N = 1,01972 kgf",
      "<strong>1 kN</strong> = 1.000 N = 101,97162 kgf",
      "<strong>1 lbf</strong> = 4,44822 N = 0,45359 kgf",
      "<strong>10 kgf</strong> = 98,0665 N",
      "<strong>1.000 kgf (1 ton-kuvvet)</strong> = 9,80665 kN",
    ] },
    { h: 'Nerelerde karşımıza çıkar?', p: [
      "Fizik derslerinde ağırlık, sürtünme ve yay kuvveti problemleri newtonla çözülür; öğrenciler kütleyi ağırlığa çevirirken bu katsayıyı kullanır. Mühendislikte yapı elemanlarına gelen yükler kilonewton ile, halat ve sapan taşıma kapasiteleri kN ya da kgf ile, pres ve hidrolik silindir kuvvetleri kN ya da ton-kuvvet ile ifade edilir.",
      "Dağcılık ve iş güvenliği ekipmanlarında karabina ve emniyet kemeri dayanımları kilonewton olarak basılıdır. Yay teraziler, el dinamometreleri, çekme-basma test cihazları ve bazı spor aletleri kgf ya da newton gösterir. ABD kaynaklı ürün belgelerinde ise pound-kuvvet (lbf) yer alır.",
    ] },
    { h: 'Uyarı ve sınırlar', p: [
      "Çeviri standart yerçekimi ivmesine dayanır. Gerçek yerçekimi enlem ve yüksekliğe göre binde birkaç oranında değişir; bu fark gündelik işler için önemsizdir, ancak hassas kalibrasyon çalışmalarında dikkate alınır. Araç yalnızca birim çevirir: bir halatın, ankrajın ya da taşıyıcı elemanın güvenle kaldırabileceği yük emniyet katsayısına, bağlantı biçimine ve ilgili standartlara bağlıdır. Yük kaldırma, yüksekte çalışma ve yapı hesabı gibi konularda üretici verilerini esas alın ve yetkin bir mühendise danışın. Negatif değerler kabul edilmez.",
    ] },
  ],
  faq: [
    ['1 kgf kaç Newton eder?', "1 kilogram-kuvvet tam olarak 9,80665 newtondur. Kaba hesaplarda 9,81 ya da 10 alınabilir, ancak araç tam tanımı kullanır."],
    ['1 Newton kaç kilogramdır?', "Newton kuvvet, kilogram kütle birimidir; doğrudan eşit değildirler. Ancak 1 newton, yaklaşık 0,102 kilogramlık, yani 102 gramlık bir kütlenin Dünya'daki ağırlığına karşılık gelir."],
    ['1 kN kaç kilogram taşır?', "1 kilonewton 101,97 kgf'ye eşittir; yani yaklaşık 102 kilogramlık bir yükün ağırlığıdır. Bir ekipmanın güvenli çalışma yükü ise kopma dayanımından ayrıdır ve üreticinin belirttiği emniyet katsayısına bağlıdır."],
    ['kgf ile kg arasındaki fark nedir?', "Kg kütleyi, kgf ise o kütlenin standart yerçekiminde uyguladığı ağırlık kuvvetini ifade eder. Dünya yüzeyinde sayıca aynı görünürler, ama fiziksel olarak farklı büyüklüklerdir."],
    ['Kilopond (kp) ile kgf aynı mı?', "Evet. Kilopond, kilogram-kuvvetin özellikle eski Alman kaynaklı teknik belgelerde kullanılan adıdır; 1 kp = 1 kgf = 9,80665 N."],
    ['Dekanewton kaç kilogram-kuvvettir?', "1 daN = 10 N = 1,0197 kgf'dir. Aradaki fark yaklaşık yüzde 2 olduğundan kaba hesaplarda 1 daN yaklaşık 1 kgf kabul edilir."],
    ['Pound-kuvvet ile pound aynı şey mi?', "Hayır. Pound (lb) kütle, pound-kuvvet (lbf) ise o kütlenin standart yerçekimindeki ağırlığıdır. 1 lbf yaklaşık 4,448 newton ve 0,4536 kgf eder."],
    ['Girdiğim değerler saklanıyor mu?', "Hayır. Hesap yalnızca tarayıcınızda yapılır; yazdığınız sayılar sunucuya gönderilmez ve kaydedilmez."],
  ],
  related: ['nm-lbft-cevir', 'kg-pound-cevir', 'g-kuvveti-ms2-cevir', 'kgcm2-bar-cevir', 'bar-psi-cevir'],
};
