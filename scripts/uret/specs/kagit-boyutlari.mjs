export default {
  slug: 'kagit-boyutlari',
  title: 'Kâğıt Boyutları (A, B, C Serisi) Sorgulama',
  h1Tail: 'mm, cm, inç ve piksel',
  pageTitle: 'Kâğıt Boyutları – A4, A3, A5, B5, C4 Ölçüleri (mm, cm, piksel)',
  description: 'A0–A10, B0–B10 ve C0–C10 kâğıt boyutlarının milimetre, santimetre ve inç ölçülerini, alanını ve seçtiğiniz DPI değerindeki piksel karşılığını sorgulayın.',
  card: 'A4, A3, A5, B5, C4 gibi kâğıt ve zarf boyutlarının mm, cm, inç ölçülerini ve piksel karşılığını öğrenin.',
  category: 'gunluk',
  keywords: ['kâğıt boyutları', 'a4 ölçüleri', 'a3 kaç cm', 'a5 boyutu', 'a4 kaç piksel', 'b5 ölçüleri', 'c4 zarf ölçüsü', 'a serisi kağıt ölçüleri'],
  lead: "Uluslararası <strong>A, B ve C serisi</strong> kâğıt boyutlarının ölçülerini sorgulayın. Boyut kodunu (örneğin A4, B5, C6) yazın; araç eni ve boyu milimetre, santimetre ve inç olarak, alanı ve seçtiğiniz çözünürlükteki piksel karşılığını göstersin.",
  button: 'Sorgula',
  inputs: [
    { id: 'boyut', label: 'Kâğıt boyutu', type: 'text', value: 'A4', placeholder: 'Örn. A4, B5, C6', hint: 'A0–A10, B0–B10 ya da C0–C10.' },
    { id: 'dpi', label: 'Çözünürlük (DPI)', type: 'number', value: '300', hint: 'Piksel karşılığı için. Baskıda 300, ekranda 72 ya da 96.' },
  ],
  compute(v, h) {
    const T = {
      A: [[841, 1189], [594, 841], [420, 594], [297, 420], [210, 297], [148, 210], [105, 148], [74, 105], [52, 74], [37, 52], [26, 37]],
      B: [[1000, 1414], [707, 1000], [500, 707], [353, 500], [250, 353], [176, 250], [125, 176], [88, 125], [62, 88], [44, 62], [31, 44]],
      C: [[917, 1297], [648, 917], [458, 648], [324, 458], [229, 324], [162, 229], [114, 162], [81, 114], [57, 81], [40, 57], [28, 40]],
    };
    const t = String(v.boyut ?? '').trim().toUpperCase().replace(/\s+/g, '');
    if (t === '') h.err('Kâğıt boyutunu yazın (örn. A4).');
    const m = /^([ABC])(\d{1,2})$/.exec(t);
    if (!m || +m[2] > 10) h.err('Geçerli bir boyut kodu yazın: A0–A10, B0–B10 ya da C0–C10 (örn. A4, B5, C6).');
    const seri = m[1], no = +m[2];
    const [en, boy] = T[seri][no];
    const dpi = h.opt(v.dpi, 300, 'Çözünürlük');
    if (!(dpi > 0)) h.err('"Çözünürlük" sıfırdan büyük olmalı.');
    const px = (mm) => Math.round(mm / 25.4 * dpi);
    const alanCm = en * boy / 100;
    const rows = [
      ['Ölçü (mm)', en + ' × ' + boy + ' mm'],
      ['Ölçü (cm)', h.fmt(en / 10, 1) + ' × ' + h.fmt(boy / 10, 1) + ' cm'],
      ['Ölçü (inç)', h.fmt(en / 25.4, 2) + ' × ' + h.fmt(boy / 25.4, 2) + ' inç'],
      ['Piksel (' + h.fmt(dpi, 2) + ' DPI)', h.fmt(px(en), 0) + ' × ' + h.fmt(px(boy), 0) + ' px'],
      ['Alan', h.fmt(alanCm, 2) + ' cm² (' + h.fmt(alanCm / 10000, 4) + ' m²)'],
    ];
    if (no < 10) {
      const [e2, b2] = T[seri][no + 1];
      rows.push(['İkiye katlanınca', seri + (no + 1) + ' (' + e2 + ' × ' + b2 + ' mm)']);
    }
    if (seri === 'C') rows.push(['İçine sığan kâğıt', 'A' + no + ' (katlanmadan)']);
    const notlar = {
      A: 'A serisi yazı, baskı ve fotokopi kâğıtlarında kullanılır; A0 yaklaşık 1 m² alandadır.',
      B: 'B serisi afiş, kitap ve pasaport gibi ara boyutlarda kullanılır; aynı numaralı A boyutundan büyüktür.',
      C: 'C serisi zarf boyutudur; aynı numaralı A kâğıdı katlanmadan içine sığar.',
    };
    return { rows, note: notlar[seri] + ' Ölçüler tam milimetreye yuvarlanmış standart değerlerdir.' };
  },
  cases: [
    { in: { boyut: 'A4', dpi: '300' }, out: { 'Ölçü (mm)': '210 × 297 mm', 'Ölçü (cm)': '21 × 29,7 cm', 'Ölçü (inç)': '8,27 × 11,69 inç', 'Piksel (300 DPI)': '2.480 × 3.508 px', 'Alan': '623,7 cm² (0,0624 m²)', 'İkiye katlanınca': 'A5 (148 × 210 mm)' } },
    { in: { boyut: 'b5', dpi: '300' }, out: { 'Ölçü (mm)': '176 × 250 mm', 'Ölçü (inç)': '6,93 × 9,84 inç', 'Piksel (300 DPI)': '2.079 × 2.953 px' } },
    { in: { boyut: 'C4' }, out: { 'Ölçü (mm)': '229 × 324 mm', 'Ölçü (inç)': '9,02 × 12,76 inç', 'İçine sığan kâğıt': 'A4 (katlanmadan)' } },
    { in: { boyut: 'A4', dpi: '72' }, out: { 'Piksel (72 DPI)': '595 × 842 px' } },
    { in: { boyut: 'A0' }, out: { 'Ölçü (mm)': '841 × 1189 mm', 'Alan': '9.999,49 cm² (0,9999 m²)', 'İkiye katlanınca': 'A1 (594 × 841 mm)' } },
    { in: { boyut: ' a 3 ' }, out: { 'Ölçü (mm)': '297 × 420 mm', 'Ölçü (cm)': '29,7 × 42 cm', 'Piksel (300 DPI)': '3.508 × 4.961 px' } },
    { in: { boyut: 'B0' }, out: { 'Ölçü (mm)': '1000 × 1414 mm' } },
    { in: { boyut: 'A10' }, out: { 'Ölçü (mm)': '26 × 37 mm' } },
    { in: { boyut: 'A11' }, error: true },
    { in: { boyut: 'D4' }, error: true },
    { in: { boyut: '' }, error: true },
  ],
  howto: [
    'Kâğıt boyutu alanına seri harfini ve numarayı yazın: A4, A3, B5, C6 gibi. Küçük harf ya da arada boşluk da kabul edilir.',
    'Piksel karşılığını görmek istediğiniz çözünürlüğü girin. Baskı için 300 DPI, ekran tasarımı için 72 ya da 96 DPI yaygındır.',
    'Sorgula düğmesine basın. Ölçüler milimetre, santimetre ve inç olarak, alan ve piksel değerleriyle birlikte listelenir.',
    'Sonuçta, kâğıt ikiye katlandığında hangi boyutun elde edildiği ve zarf boyutlarında içine hangi kâğıdın sığdığı da gösterilir.',
  ],
  sections: [
    { h: 'A serisi nasıl tanımlanır?', p: [
      'Türkiye\'de ve dünyanın büyük bölümünde kullanılan kâğıt boyutları uluslararası ISO 216 standardına dayanır. Standardın temelinde iki basit kural vardır. Birincisi, tüm boyutlarda kenar oranı <strong>1 : √2</strong>, yani yaklaşık 1 : 1,414\'tür. Bu oranın özelliği, kâğıdı uzun kenarından ikiye katladığınızda ortaya çıkan iki parçanın da aynı orana sahip olmasıdır. İkincisi, serinin en büyük boyutu olan A0\'ın alanı 1 metrekaredir.',
      'Bu iki kuraldan tüm ölçüler türer. A0, 841 × 1189 mm\'dir. İkiye bölününce A1 (594 × 841 mm), yeniden bölününce A2 (420 × 594 mm) elde edilir ve böyle devam eder. Her adımda numara bir artar, alan yarıya iner. A4 bu zincirin beşinci halkasıdır ve A0\'ın on altıda biri kadardır: 210 × 297 mm. Ölçüler tam milimetreye yuvarlandığı için A0\'ın alanı tam 1 değil, 0,9999 metrekaredir.',
    ] },
    { h: 'A serisi ölçü tablosu', ul: [
      '<strong>A0:</strong> 841 × 1189 mm – teknik çizim, büyük afiş',
      '<strong>A1:</strong> 594 × 841 mm – poster, mimari pafta',
      '<strong>A2:</strong> 420 × 594 mm – afiş, takvim',
      '<strong>A3:</strong> 297 × 420 mm – çizim, tablo, iki A4 yan yana',
      '<strong>A4:</strong> 210 × 297 mm – standart yazı ve fotokopi kâğıdı',
      '<strong>A5:</strong> 148 × 210 mm – defter, el broşürü, reçete',
      '<strong>A6:</strong> 105 × 148 mm – kartpostal, cep defteri',
      '<strong>A7:</strong> 74 × 105 mm – küçük etiket ve kart',
      '<strong>A8:</strong> 52 × 74 mm, <strong>A9:</strong> 37 × 52 mm, <strong>A10:</strong> 26 × 37 mm',
    ] },
    { h: 'B ve C serileri ne işe yarar?', p: [
      '<strong>B serisi</strong>, A boyutlarının arasında kalan ölçülere ihtiyaç duyulduğunda kullanılır. B0\'ın kısa kenarı tam 1 metredir (1000 × 1414 mm) ve her B boyutu, aynı numaralı A boyutu ile bir büyüğünün arasına düşer. B5 (176 × 250 mm) kitap ve dergilerde, B4 (250 × 353 mm) gazete eki ve büyük zarflarda, B1 ve B2 afişlerde sık görülür. Pasaport ve kimlik defterlerinin yaygın ölçüsü de B7\'dir (88 × 125 mm).',
      '<strong>C serisi</strong> zarflar için tasarlanmıştır. Her C boyutu, aynı numaralı A kâğıdından biraz büyüktür; böylece kâğıt katlanmadan zarfa girer. A4 bir belge C4 zarfa (229 × 324 mm) düz olarak sığar. Aynı belge ikiye katlanırsa A5 olur ve C5 zarfa (162 × 229 mm), dörde katlanırsa A6 olur ve C6 zarfa (114 × 162 mm) girer. Resmî yazışmalarda kullanılan uzun pencereli zarf ise A4\'ün üçe katlanmış hâli için tasarlanmış ayrı bir ölçüdür ve bu üç serinin içinde yer almaz.',
    ] },
    { h: 'Piksel karşılığı nasıl bulunur?', p: [
      'Kâğıdın kendisinin piksel ölçüsü yoktur; piksel sayısı baskı çözünürlüğüne bağlıdır. Çözünürlük, bir inçe düşen nokta sayısı (DPI) ile ifade edilir ve 1 inç 25,4 mm\'dir. Formül: <strong>piksel = milimetre ÷ 25,4 × DPI</strong>. A4\'ün kısa kenarı için 210 ÷ 25,4 × 300 = 2.480 piksel, uzun kenarı için 297 ÷ 25,4 × 300 = 3.508 piksel bulunur. Yani 300 DPI kalitesinde tam sayfa A4 bir tasarım 2.480 × 3.508 piksel olmalıdır.',
      'Aynı sayfa 72 DPI için 595 × 842 pikseldir; bu değerler PDF belgelerinin punto cinsinden sayfa ölçüsüyle de örtüşür. Tarama yaparken, afiş tasarlarken ya da bir fotoğrafın A3 baskıya yetip yetmeyeceğini kontrol ederken bu dönüşümü kullanabilirsiniz. A3 için 300 DPI karşılığı 3.508 × 4.961 pikseldir.',
    ] },
    { h: 'Günlük kullanımda ipuçları', p: [
      'Fotokopi makinelerindeki %141 büyütme ve %71 küçültme ayarları doğrudan √2 oranından gelir: A4 bir sayfayı A3\'e büyütmek için %141, A3\'ü A4\'e küçültmek için %71 kullanılır. İki A4 sayfayı yan yana tek bir A3\'e, iki A5 sayfayı tek bir A4\'e basmak da aynı ilişki sayesinde boşluk bırakmadan mümkündür. Kitapçık basarken A4 kâğıdı ortadan katlayıp A5 kitapçık elde edersiniz.',
      'Amerika Birleşik Devletleri ve Kanada\'da A serisi yerine "Letter" (216 × 279 mm) ve "Legal" (216 × 356 mm) boyutları yaygındır. Letter, A4\'ten biraz daha geniş ve kısadır. Yurt dışından gelen bir belgeyi yazdırırken kenarların kesilmesinin nedeni çoğunlukla bu farktır; yazdırma penceresinde "sayfaya sığdır" seçeneği sorunu giderir.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç yalnızca ISO 216 ve onu tamamlayan zarf standardındaki A, B ve C serilerini kapsar; her seride 0\'dan 10\'a kadar olan boyutlar tanımlıdır. Matbaa tabakaları (örneğin 70 × 100 cm), fotoğraf baskı ölçüleri ve Kuzey Amerika boyutları tabloda yoktur. Baskı işlerinde ayrıca kesim payı (taşma) gerekir; matbaanız genellikle her kenardan birkaç milimetre fazladan alan ister ve bu pay buradaki net ölçülere dahil değildir.',
    ] },
  ],
  faq: [
    ['A4 kâğıdının ölçüleri nedir?', 'A4, 210 × 297 milimetredir; santimetre olarak 21 × 29,7 cm, inç olarak yaklaşık 8,27 × 11,69 inç eder. Alanı 623,7 santimetrekaredir.'],
    ['A4 kaç pikseldir?', 'Çözünürlüğe bağlıdır. 300 DPI için 2.480 × 3.508 piksel, 72 DPI için 595 × 842 pikseldir. Farklı bir değer için DPI alanını değiştirmeniz yeterlidir.'],
    ['A3, A4\'ün kaç katıdır?', 'A3 (297 × 420 mm), alan olarak A4\'ün tam iki katıdır; iki A4 sayfa uzun kenarlarından yan yana konduğunda A3 elde edilir.'],
    ['A5 kaç santimetredir?', 'A5, 14,8 × 21 santimetredir. Bir A4 kâğıdın ortadan ikiye katlanmış hâlidir ve defter, ajanda ve el broşürlerinde kullanılır.'],
    ['A4 kâğıt hangi zarfa sığar?', 'Katlanmadan C4 zarfa, ikiye katlanınca C5 zarfa, dörde katlanınca C6 zarfa sığar. C serisi numaraları aynı numaralı A kâğıdına göre düzenlenmiştir.'],
    ['B5 ile A5 aynı mı?', 'Hayır. B5 (176 × 250 mm), A5\'ten (148 × 210 mm) büyük, A4\'ten küçüktür. B serisi, A boyutlarının arasında kalan ölçüleri sağlar.'],
    ['Neden kenar oranı 1,414?', 'Bu değer ikinin kareköküdür. Bu oranda bir kâğıt ikiye bölündüğünde parçalar da aynı orana sahip olur; böylece büyütme ve küçültmede içerik biçimi bozulmadan sayfaya oturur.'],
    ['Sorgularım kaydediliyor mu?', 'Hayır. Ölçü tablosu sayfanın içindedir; sorgu tarayıcınızda çalışır ve hiçbir veri gönderilmez.'],
  ],
  related: ['kagit-agirligi-hesapla', 'baski-piksel-boyutu-hesapla', 'dpi-hesapla', 'cm-piksel-cevir', 'pdf-a4-boyutlandir', 'mm-inc-cevir'],
};
