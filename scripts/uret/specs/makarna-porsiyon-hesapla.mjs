export default {
  slug: 'makarna-porsiyon-hesapla',
  title: 'Makarna Porsiyon Hesaplama',
  h1Tail: 'kişi başı gram, su ve tuz',
  pageTitle: "Makarna Porsiyon Hesaplama – Kişi Başı Kaç Gram Makarna?",
  description: "Kişi sayısına göre kaç gram makarna haşlayacağınızı, kaç paket gerektiğini, haşlama suyunu ve tuzunu hesaplayın. Kuru ve taze makarna, ana yemek ve yan yemek seçenekli.",
  card: "Yetişkin ve çocuk sayısını girin; haşlanacak makarnayı gram ve paket olarak, gereken su ve tuzla birlikte öğrenin.",
  category: 'gunluk',
  keywords: ['makarna porsiyon hesaplama', 'kişi başı makarna kaç gram', '4 kişilik makarna kaç gram', 'makarna su oranı', 'makarna tuz miktarı', 'bir paket makarna kaç kişilik', 'makarna ölçüsü'],
  lead: "Makarnayı göz kararı atınca ya tencerede artar ya sofrada yetmez. Yetişkin ve çocuk sayısını, öğündeki rolünü ve makarna türünü seçin; araç <strong>haşlanacak toplam miktarı</strong>, paket sayısını, haşlama suyunu ve suya atılacak tuzu hesaplasın.",
  button: 'Hesapla',
  inputs: [
    { id: 'yetiskin', label: 'Yetişkin sayısı', type: 'number', placeholder: 'Örn. 4' },
    { id: 'cocuk', label: 'Çocuk sayısı', type: 'number', value: '0', hint: 'Çocuk porsiyonu yetişkinin %60\'ı alınır.' },
    { id: 'ogun', label: 'Öğündeki yeri', type: 'select', options: [['ana', 'Ana yemek'], ['yan', 'Yan yemek / ilk tabak']] },
    { id: 'tur', label: 'Makarna türü', type: 'select', options: [['kuru', 'Kuru makarna'], ['taze', 'Taze makarna']] },
    { id: 'paket', label: 'Paket ağırlığı (g)', type: 'number', value: '500' },
  ],
  compute(v, h) {
    const PORSIYON = { kuru: { ana: 100, yan: 60 }, taze: { ana: 130, yan: 80 } };
    const yet = h.int(v.yetiskin, 'Yetişkin sayısı');
    const coc = h.int(v.cocuk === '' ? '0' : v.cocuk, 'Çocuk sayısı');
    if (yet < 0 || coc < 0) h.err('Kişi sayıları negatif olamaz.');
    if (yet + coc < 1) h.err('En az bir kişi girin.');
    if (yet + coc > 2000) h.err('En fazla 2.000 kişi için hesap yapılır.');
    const paket = h.pos(v.paket === '' ? '500' : v.paket, 'Paket ağırlığı');
    const tur = v.tur === 'taze' ? 'taze' : 'kuru';
    const ogun = v.ogun === 'yan' ? 'yan' : 'ana';
    const por = PORSIYON[tur][ogun];
    const toplam = yet * por + coc * por * 0.6;
    const su = toplam / 100;
    const tuz = su * 10;
    const rows = [
      ['Toplam makarna', h.fmt(toplam, 0) + ' g'],
      ['Yetişkin porsiyonu', h.fmt(por, 0) + ' g'],
      ['Çocuk porsiyonu', h.fmt(por * 0.6, 0) + ' g'],
      ['Gereken paket', Math.ceil(toplam / paket - 1e-9) + ' paket (' + h.fmt(toplam / paket, 2) + ' paket karşılığı)'],
      ['Haşlama suyu', h.fmt(su, 1) + ' litre'],
      ['Suya atılacak tuz', h.fmt(tuz, 0) + ' g'],
    ];
    if (tur === 'kuru') rows.push(['Pişmiş ağırlık (yaklaşık)', h.fmt(toplam * 2.25, 0) + ' g']);
    return {
      rows,
      note: 'Su ve tuz, 100 g makarnaya 1 litre su ve 10 g tuz kuralıyla hesaplanır. Pişmiş ağırlık kuru makarnanın yaklaşık 2,25 katıdır; şekle ve pişirme süresine göre değişir.',
    };
  },
  cases: [
    { in: { yetiskin: '4', cocuk: '0', ogun: 'ana', tur: 'kuru', paket: '500' }, out: { 'Toplam makarna': '400 g', 'Gereken paket': '1 paket (0,8 paket karşılığı)', 'Haşlama suyu': '4 litre', 'Suya atılacak tuz': '40 g', 'Pişmiş ağırlık (yaklaşık)': '900 g' } },
    { in: { yetiskin: '2', cocuk: '2', ogun: 'ana', tur: 'kuru', paket: '500' }, out: { 'Toplam makarna': '320 g', 'Çocuk porsiyonu': '60 g', 'Haşlama suyu': '3,2 litre', 'Suya atılacak tuz': '32 g' } },
    { in: { yetiskin: '6', cocuk: '0', ogun: 'yan', tur: 'kuru', paket: '500' }, out: { 'Toplam makarna': '360 g', 'Yetişkin porsiyonu': '60 g', 'Gereken paket': '1 paket (0,72 paket karşılığı)' } },
    { in: { yetiskin: '10', cocuk: '0', ogun: 'ana', tur: 'kuru', paket: '500' }, out: { 'Toplam makarna': '1.000 g', 'Gereken paket': '2 paket (2 paket karşılığı)', 'Haşlama suyu': '10 litre', 'Suya atılacak tuz': '100 g' } },
    { in: { yetiskin: '3', cocuk: '0', ogun: 'ana', tur: 'taze', paket: '250' }, out: { 'Toplam makarna': '390 g', 'Gereken paket': '2 paket (1,56 paket karşılığı)', 'Haşlama suyu': '3,9 litre' } },
    { in: { yetiskin: '0', cocuk: '5', ogun: 'ana', tur: 'kuru', paket: '500' }, out: { 'Toplam makarna': '300 g', 'Suya atılacak tuz': '30 g' } },
    { in: { yetiskin: '0', cocuk: '0', ogun: 'ana', tur: 'kuru', paket: '500' }, error: true },
    { in: { yetiskin: '2,5', cocuk: '0', ogun: 'ana', tur: 'kuru', paket: '500' }, error: true },
    { in: { yetiskin: '', cocuk: '0', ogun: 'ana', tur: 'kuru', paket: '500' }, error: true },
  ],
  howto: [
    'Sofradaki yetişkin sayısını yazın; çocuk varsa ayrı alana girin, yoksa sıfır bırakın.',
    'Makarna tek başına ana yemek mi olacak, yoksa etin, salatanın ya da çorbanın yanında mı sunulacak, seçin.',
    'Kuru (paketli) ya da taze makarna kullandığınızı belirtin; taze makarna su içerdiği için porsiyonu daha ağırdır.',
    'Elinizdeki paketin gramajı 500 gramdan farklıysa "Paket ağırlığı" alanını değiştirin.',
    '"Hesapla" düğmesine basın; toplam gram, paket sayısı, su ve tuz miktarı listelenir.',
  ],
  sections: [
    { h: 'Kişi başı makarna miktarı nasıl belirlenir?', p: [
      "Makarna porsiyonu çiğ ağırlık üzerinden hesaplanır, çünkü haşlandığında su çekerek ağırlığını iki katından fazlasına çıkarır. Ana yemek olarak sunulan kuru makarnada yetişkin başına <strong>100 gram</strong>, başka bir yemeğin yanında ya da çok tabaklı bir menünün ilk tabağı olarak sunulduğunda <strong>60 gram</strong> yaygın bir ölçüdür. Taze makarna hâlihazırda nem içerdiğinden aynı doygunluk için daha fazla tartılır: ana yemekte 130, yan yemekte 80 gram.",
      "Araç çocuk porsiyonunu yetişkin porsiyonunun yüzde 60'ı olarak alır. Formül şöyledir: <strong>toplam = yetişkin × porsiyon + çocuk × porsiyon × 0,6</strong>. Bu değerler ortalama iştah içindir; yoğun soslu, kıymalı ya da fırında peynirli tariflerde porsiyon aynı kalsa da tabak daha doyurucu olur.",
    ] },
    { h: 'Çözümlü örnek', p: [
      "İki yetişkin ve iki çocuktan oluşan bir aile akşam yemeğinde ana yemek olarak kuru makarna yiyecek olsun. Yetişkinler için 2 × 100 = 200 gram, çocuklar için 2 × 60 = 120 gram, toplamda <strong>320 gram</strong> makarna gerekir. 500 gramlık bir paketin 0,64'ü kullanılır; yani tek paket yeter ve 180 gram artar.",
      "Haşlama suyu 320 ÷ 100 = 3,2 litre, suya atılacak tuz ise 3,2 × 10 = 32 gramdır. Bu, yaklaşık iki silme yemek kaşığı tuza karşılık gelir. Pişen makarna yaklaşık 320 × 2,25 = 720 gram gelecektir.",
    ] },
    { h: 'Haşlama suyu ve tuz: 1 – 10 – 100 kuralı', p: [
      "İtalyan mutfağından gelen ve akılda kolay kalan kural şudur: <strong>100 gram makarna için 1 litre su ve 10 gram tuz</strong>. Bol su, makarnanın suya saldığı nişastayı seyreltir ve tanelerin birbirine yapışmasını önler; ayrıca makarna atıldığında suyun sıcaklığı fazla düşmez ve kaynama çabuk geri gelir.",
      "Tuz suya kaynadıktan sonra, makarnadan hemen önce atılır. Tuzun büyük kısmı süzülen suyla birlikte gider; makarnaya geçen miktar bunun küçük bir bölümüdür. Yine de tuz tüketimini kısıtlamanız gerekiyorsa miktarı azaltabilir ya da hiç koymayabilirsiniz; bu durumda sosun tuzunu ona göre ayarlamak gerekir. Suya yağ eklemek yapışmayı önlemez, yalnızca sosun makarnaya tutunmasını zorlaştırır.",
    ] },
    { h: 'Bir paket makarna kaç kişiliktir?', ul: [
      '500 gramlık paket, ana yemek olarak 5 yetişkine yeter.',
      'Aynı paket yan yemek olarak yaklaşık 8 yetişkinlik porsiyon verir.',
      'İki yetişkin için ana yemekte 200 gram, yani paketin beşte ikisi yeterlidir.',
      '10 kişilik bir davette ana yemek için 1 kilogram (iki paket) makarna ve 10 litre su gerekir; bu miktarı iki tencereye bölmek pratik olur.',
    ] },
    { h: 'Terazi yoksa nasıl ölçülür?', p: [
      "Spagetti gibi uzun makarnalarda başparmak ile işaret parmağını birleştirerek oluşturduğunuz, yaklaşık bozuk para çapındaki demet kabaca bir porsiyona denk gelir. Burgu, kalem, fiyonk gibi kısa makarnalarda bir su bardağı çiğ makarna şekline göre 70–100 gram arasında değişir; boşluklu ve iri şekiller bardağı daha az doldurur. En güvenilir yöntem paketi referans almaktır: 500 gramlık paketi gözle beşe böldüğünüzde her parça bir ana yemek porsiyonudur.",
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      "Pişmiş ağırlıkla çiğ ağırlığı karıştırmak. Tarifteki '200 gram makarna' aksi belirtilmedikçe çiğ ağırlıktır.",
      "Az suyla küçük tencerede haşlamak. Su nişastayla koyulaşır, makarna yapışır ve eşit pişmez.",
      "Makarnayı süzdükten sonra soğuk sudan geçirmek. Salata yapılmayacaksa bu işlem yüzeydeki nişastayı alır ve sosun tutunmasını azaltır.",
      "Haşlama suyunun tamamını dökmek. Bir kepçe nişastalı su, sosu makarnaya bağlamak için işe yarar.",
    ] },
    { h: 'Varsayımlar', p: [
      "Porsiyon değerleri mutfak pratiğinde yaygın kabul gören ortalamalardır; kişisel beslenme planı yerine geçmez. Diyet ya da sağlık nedeniyle karbonhidrat miktarını izliyorsanız porsiyonunuzu diyetisyeninizin önerisine göre belirleyin. Pişmiş ağırlık katsayısı 2,25 yaklaşık bir değerdir; ince ve uzun pişen makarnalar daha fazla, diri bırakılan kalın makarnalar daha az su çeker. Taze makarna için pişmiş ağırlık tahmini verilmez, çünkü hamurun nem oranı üretime göre çok değişir.",
    ] },
  ],
  faq: [
    ['Kişi başı kaç gram makarna haşlanır?', 'Ana yemek olarak kuru makarnada yetişkin başına 100 gram, yan yemek ya da ilk tabak olarak 60 gram hesaplanır. Taze makarnada bu değerler 130 ve 80 gramdır.'],
    ['4 kişilik makarna kaç gramdır?', 'Dört yetişkin için ana yemekte 400 gram kuru makarna gerekir; 500 gramlık paketin beşte dördü. Haşlamak için 4 litre su ve 40 gram tuz kullanılır.'],
    ['100 gram kuru makarna pişince kaç gram olur?', 'Yaklaşık 200–250 gram olur. Araç ortalama 2,25 katsayısını kullanır; makarnanın şekline ve ne kadar diri bırakıldığına göre sonuç değişir.'],
    ['Makarna suyuna ne kadar tuz atılır?', 'Her litre su için yaklaşık 10 gram, yani bir tatlı kaşığından biraz fazla tuz önerilir. Tuz kısıtlaması olanlar bu miktarı azaltabilir.'],
    ['Çocuklar için porsiyon nasıl hesaplanıyor?', 'Çocuk porsiyonu yetişkin porsiyonunun yüzde 60\'ı alınır; ana yemekte kuru makarna için 60 gram. Ergenlik çağındaki çocukları yetişkin olarak girmek daha gerçekçi sonuç verir.'],
    ['Daha az suyla haşlasam olur mu?', 'Olur, ancak makarnayı sık karıştırmanız gerekir ve su daha nişastalı olur. Kısa makarnalar az suya uzun makarnalardan daha toleranslıdır. Araç klasik bol sulu yöntemi esas alır.'],
    ['Artan pişmiş makarnayı nasıl değerlendirebilirim?', 'Az yağla karıştırıp kapalı kapta buzdolabında saklayabilir, ertesi gün fırın makarna ya da makarna salatası yapabilirsiniz. Yine de doğru porsiyonla pişirmek israfı baştan önler.'],
    ['Girdiğim sayılar bir yere gönderiliyor mu?', 'Hayır. Hesaplama tamamen tarayıcınızda yapılır; girdiğiniz bilgiler sunucuya iletilmez ve kaydedilmez.'],
  ],
  related: ['pirinc-su-orani-hesapla', 'parti-ikram-hesapla', 'mangal-et-miktari-hesapla', 'kahve-su-orani-hesapla', 'salamura-tuz-orani-hesapla'],
};
