export default {
  slug: 'ufuk-mesafesi-hesapla',
  title: 'Ufuk Mesafesi Hesaplama',
  h1Tail: 'göz yüksekliğinden',
  pageTitle: 'Ufuk Mesafesi Hesaplama – Ufuk Çizgisi Kaç Kilometre Uzakta?',
  description: 'Göz yüksekliğinize göre ufuk çizgisinin kaç km uzakta olduğunu hesaplayın. Atmosfer kırılması seçeneği ve uzaktaki bir cismin görünme mesafesi dahil.',
  card: 'Göz yüksekliğinizden ufuk çizgisinin uzaklığını ve bir fenerin, dağın ya da geminin en uzak görünme mesafesini hesaplayın.',
  category: 'gunluk',
  keywords: ['ufuk mesafesi hesaplama', 'ufuk çizgisi kaç km', 'ufuk ne kadar uzakta', 'görüş mesafesi hesaplama', 'dünya eğriliği hesaplama', 'fener görünme mesafesi', 'ufuk çizgisi uzaklığı'],
  lead: 'Deniz kıyısında durup baktığınızda gördüğünüz ufuk çizgisi sandığınızdan yakındır. Bu araç, gözünüzün yerden yüksekliğine göre <strong>ufkun kaç kilometre uzakta olduğunu</strong> ve belirli yükseklikteki bir cismin en çok ne kadar uzaktan görülebileceğini hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'goz', label: 'Göz yüksekliği (m)', type: 'number', placeholder: 'Örn. 1,7', hint: 'Deniz ya da düz zemin seviyesinden' },
    { id: 'hedef', label: 'Hedef cismin yüksekliği (m)', type: 'number', value: '0', hint: 'İsteğe bağlı: fener, gemi direği, dağ' },
    { id: 'kirilma', label: 'Hesap yöntemi', type: 'select', options: [['yok', 'Geometrik (kırılmasız)'], ['var', 'Standart atmosfer kırılmasıyla']] },
  ],
  compute(v, h) {
    const goz = h.pos(v.goz, 'Göz yüksekliği');
    const hedef = h.opt(v.hedef, 0, 'Hedef cismin yüksekliği');
    if (hedef < 0) h.err('"Hedef cismin yüksekliği" negatif olamaz.');
    if (goz > 100000 || hedef > 100000) h.err('Yükseklik en fazla 100.000 m (100 km) olabilir; değeri metre cinsinden yazın.');
    const R = 6371000 * (v.kirilma === 'var' ? 7 / 6 : 1);
    const ufuk = (y) => Math.sqrt(2 * R * y + y * y);
    const d1 = ufuk(goz);
    const d2 = ufuk(hedef);
    const aci = (Math.atan(d1 / R) * 180) / Math.PI;
    const rows = [
      ['Ufuk mesafesi', h.fmt(d1 / 1000, 2) + ' km'],
      ['Ufuk mesafesi (deniz mili)', h.fmt(d1 / 1852, 2) + ' deniz mili'],
      ['Ufuk alçalma açısı', h.fmt(aci, 3) + '°'],
    ];
    if (hedef > 0) {
      rows.push(['Hedefin ufku', h.fmt(d2 / 1000, 2) + ' km']);
      rows.push(['Hedefin görülebildiği en uzak mesafe', h.fmt((d1 + d2) / 1000, 2) + ' km']);
    }
    return {
      rows,
      note: v.kirilma === 'var'
        ? 'Standart atmosferde ışığın bükülmesi, Dünya yarıçapı 7/6 oranında büyütülerek hesaba katıldı. Gerçek kırılma hava koşullarına göre değişir.'
        : 'Dünya 6.371 km yarıçaplı küre kabul edildi; atmosfer kırılması, dalga ve arazi engelleri hesaba katılmadı.',
    };
  },
  cases: [
    { in: { goz: '1,7' }, out: { 'Ufuk mesafesi': '4,65 km', 'Ufuk mesafesi (deniz mili)': '2,51 deniz mili', 'Ufuk alçalma açısı': '0,042°' } },
    { in: { goz: '100' }, out: { 'Ufuk mesafesi': '35,7 km', 'Ufuk mesafesi (deniz mili)': '19,27 deniz mili', 'Ufuk alçalma açısı': '0,321°' } },
    { in: { goz: '1,7', kirilma: 'var' }, out: { 'Ufuk mesafesi': '5,03 km' } },
    { in: { goz: '10' }, out: { 'Ufuk mesafesi': '11,29 km' } },
    { in: { goz: '1,7', hedef: '50' }, out: { 'Ufuk mesafesi': '4,65 km', 'Hedefin ufku': '25,24 km', 'Hedefin görülebildiği en uzak mesafe': '29,9 km' } },
    { in: { goz: '2543' }, out: { 'Ufuk mesafesi': '180,03 km' } },
    { in: { goz: '10', hedef: '30', kirilma: 'var' }, out: { 'Hedefin görülebildiği en uzak mesafe': '33,31 km' } },
    { in: { goz: '0' }, error: true },
    { in: { goz: '' }, error: true },
    { in: { goz: '1,7', hedef: '-5' }, error: true },
  ],
  howto: [
    '"Göz yüksekliği" alanına gözünüzün deniz ya da düz zemin seviyesinden yüksekliğini metre olarak yazın. Kıyıda ayakta duran bir yetişkin için yaklaşık 1,6-1,7 m\'dir; bir teknenin güvertesinde, balkonda ya da tepede bu değere bulunduğunuz yerin yüksekliğini ekleyin.',
    'Uzaktaki bir fenerin, geminin ya da dağın ne kadar uzaktan görülebileceğini merak ediyorsanız "Hedef cismin yüksekliği" alanına onun yüksekliğini yazın; yalnızca ufku öğrenmek için 0 bırakın.',
    '"Hesap yöntemi" listesinden saf geometrik hesabı ya da atmosferin ışığı bükmesini hesaba katan standart kırılmalı hesabı seçin.',
    '"Hesapla" düğmesine basın. Ufuk mesafesini kilometre ve deniz mili olarak, ufkun yatayın kaç derece altında kaldığını ve hedef girdiyseniz en uzak görünme mesafesini görürsünüz.',
  ],
  sections: [
    { h: 'Ufuk neden sınırlıdır?', p: [
      'Dünya küre biçiminde olduğu için yüzeyi sizden uzaklaştıkça aşağı doğru kıvrılır. Gözünüzden çıkan bakış doğrusu bir noktada yüzeye teğet olur; o noktanın ötesi eğriliğin arkasında kalır. Bu teğet noktalarının oluşturduğu çembere ufuk çizgisi denir. Ne kadar yükseğe çıkarsanız teğet noktası o kadar uzağa kayar; bu yüzden gemilerde gözcü direğin tepesine çıkar, fenerler yüksek burunlara kurulur.',
      'Kıyıdan uzaklaşan bir geminin önce gövdesinin, sonra direğinin kaybolması da aynı olgunun sonucudur ve Dünya\'nın yuvarlak olduğunun gündelik gözlemle görülebilen kanıtlarından biridir.',
    ] },
    { h: 'Formül', p: [
      'Dünya\'nın merkezi, gözünüz ve ufuktaki teğet noktası bir dik üçgen oluşturur. Pisagor bağıntısından <code>(R + h)² = R² + d²</code> yazılır ve buradan <strong>d = √(2·R·h + h²)</strong> elde edilir. R Dünya\'nın yarıçapı (6.371 km), h göz yüksekliği, d ise gözden ufka olan uzaklıktır.',
      'Gündelik yüksekliklerde h² terimi çok küçük kaldığından formül pratik bir kısa yola iner: <strong>d (km) ≈ 3,57 × √h (m)</strong>. Yani yüksekliğin karekökünü alıp 3,57 ile çarpmanız yeter. Mesafe yüksekliğin kareköküyle arttığı için ufku iki katına çıkarmak isterseniz dört kat yükseğe çıkmanız gerekir.',
      'Ufuk, tam yatay bakış doğrultusunun biraz altında görünür. Bu küçük açıya ufuk alçalması denir ve araç onu da derece olarak verir; denizcilikte sekstantla yapılan yükseklik ölçümlerinde bu açı düzeltme olarak kullanılır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Kumsalda ayakta duruyorsunuz, göz yüksekliğiniz 1,7 m. d = √(2 × 6.371.000 × 1,7 + 1,7²) ≈ 4.654 m, yani <strong>4,65 km</strong>. Deniz mili olarak 2,51\'dir. Kısa yolla 3,57 × √1,7 = 3,57 × 1,304 ≈ 4,65 km aynı sonucu verir.',
      '<strong>Örnek 2:</strong> 100 m yüksekliğindeki bir yamaçtan bakıyorsunuz. Ufuk 35,7 km uzaktadır. Yükseklik yaklaşık 59 kat artmış, mesafe ise yaklaşık 7,7 kat artmıştır.',
      '<strong>Örnek 3:</strong> Kıyıda 1,7 m göz yüksekliğiyle, ışığı denizden 50 m yüksekte olan bir feneri arıyorsunuz. Sizin ufkunuz 4,65 km, fenerin ufku 25,24 km\'dir. İkisinin toplamı olan <strong>29,9 km</strong>, fenerin tepesinin geometrik olarak görülebileceği en uzak mesafedir.',
      '<strong>Örnek 4:</strong> Aynı 1,7 m için standart atmosfer kırılması seçilirse ufuk 5,03 km\'ye çıkar; kırılma mesafeyi yaklaşık yüzde 8 uzatır.',
    ] },
    { h: 'Atmosfer kırılması ne değiştirir?', p: [
      'Hava yoğunluğu yükseldikçe azaldığı için ışık ışınları yeryüzüne doğru hafifçe bükülür ve eğriliğin biraz ötesini görmemizi sağlar. Bu etki, haritacılık ve denizcilikte Dünya yarıçapı olduğundan büyükmüş gibi alınarak hesaba katılır. Araç, optik gözlem için yaygın kabul olan 7/6 oranını kullanır; bu durumda kısa yol <strong>d ≈ 3,86 × √h</strong> olur.',
      'Gerçek kırılma sabit değildir. Soğuk deniz üzerinde ılık hava bulunduğunda ışık çok daha fazla bükülür ve normalde ufkun altında kalan adalar, kıyılar ya da gemiler görünür hale gelebilir; tersine koşullarda ufuk yakınlaşır. Serap da bu tür olağan dışı kırılmaların sonucudur. Dolayısıyla kırılmalı sonuç bir ortalama, geometrik sonuç ise temkinli bir alt değer olarak düşünülmelidir.',
    ] },
    { h: 'Hızlı başvuru değerleri (geometrik)', ul: [
      '<strong>1,7 m</strong> (kıyıda ayakta): 4,65 km',
      '<strong>10 m</strong> (üçüncü kat balkonu, küçük gemi köprüsü): 11,29 km',
      '<strong>30 m</strong>: yaklaşık 19,6 km',
      '<strong>100 m</strong>: 35,7 km',
      '<strong>1.000 m</strong>: yaklaşık 112,9 km',
      '<strong>2.543 m</strong> (Uludağ zirvesi yüksekliği): yaklaşık 180 km',
      '<strong>10.000 m</strong> (yolcu uçağı seyir irtifası): yaklaşık 357 km',
    ] },
    { h: 'Nerelerde kullanılır?', p: [
      'Amatör denizciler bir fenerin ya da kara parçasının ne zaman görüneceğini, kıyıdan bakanlar açıktaki geminin gövdesinin neden görünmediğini bu hesapla anlar. Fotoğrafçılar uzak bir adanın ya da dağ siluetinin belirli bir noktadan görülüp görülemeyeceğini önceden kontrol eder. Telsiz amatörleri ve kablosuz bağlantı kuranlar, çok yüksek frekanslı yayınların kabaca görüş hattı boyunca ilerlemesinden yola çıkarak anten yüksekliğinin kapsama mesafesine etkisini tahmin eder. Öğretmenler ise Pisagor teoremine gerçek hayattan çarpıcı bir örnek olarak kullanır.',
    ] },
    { h: 'Sınırlar', p: [
      'Hesap Dünya\'yı pürüzsüz bir küre sayar; bu varsayım açık denizde iyi tutar, karada ise tepeler, binalar ve ağaçlar görüşü çok daha önce keser. Sonuç bir cismin geometrik olarak ufkun üstünde kalıp kalmadığını söyler; onu gerçekten seçip seçemeyeceğiniz pus, nem, ışık ve cismin büyüklüğüne bağlıdır. Göz yüksekliğini deniz seviyesinden değil çevredeki düz zeminden ölçmek gerekir: 1.000 m rakımlı bir ovada ayakta duran kişinin göz yüksekliği yine 1,7 m\'dir. Seyir ve güvenlik kararlarında resmî deniz haritaları ve fener kayıtları esas alınmalıdır.',
    ] },
  ],
  faq: [
    ['Deniz kıyısında ufuk kaç kilometre uzaktadır?', 'Göz yüksekliği 1,7 m olan bir yetişkin için geometrik hesapla 4,65 km, standart atmosfer kırılmasıyla yaklaşık 5 km uzaktadır. Çömelirseniz yakınlaşır, bir kayaya çıkarsanız uzaklaşır.'],
    ['Ufuk mesafesinin kısa formülü nedir?', 'Kilometre cinsinden mesafe, metre cinsinden göz yüksekliğinin karekökünün 3,57 katıdır. Atmosfer kırılması dahil edilirse katsayı yaklaşık 3,86 olur.'],
    ['Uçaktan bakınca ufuk ne kadar uzakta?', '10.000 m seyir irtifasında geometrik ufuk yaklaşık 357 km uzaktadır. Pus ve bulutlar nedeniyle bu mesafenin tamamı çoğu zaman seçilemez.'],
    ['Uzaktaki bir fenerin görünme mesafesi nasıl bulunur?', 'Kendi ufuk mesafeniz ile fenerin ışık yüksekliğinden hesaplanan ufuk mesafesi toplanır. Araçta "Hedef cismin yüksekliği" alanına fenerin yüksekliğini yazarsanız toplamı doğrudan görürsünüz.'],
    ['Geometrik ve kırılmalı hesap arasındaki fark ne kadar?', 'Standart koşullarda kırılma ufku yaklaşık yüzde 8 uzatır. 1,7 m için 4,65 km yerine 5,03 km, 100 m için 35,7 km yerine yaklaşık 38,6 km bulunur.'],
    ['Dağların tepesinden neden hesaplanan kadar uzağı göremiyorum?', 'Havadaki nem, toz ve pus ışığı saçarak uzak cisimlerin kontrastını düşürür. Geometrik ufuk 150 km olsa bile görüş çoğu gün bunun çok altında kalır; çok temiz ve kuru havalarda hesaba yaklaşılır.'],
    ['Göz yüksekliğine rakımı eklemeli miyim?', 'Yalnızca önünüzdeki yüzey deniz seviyesindeyse. Yüksek bir platoda duruyorsanız ufuk, çevrenizdeki araziye göre belirlenir; bu durumda göz yüksekliğiniz zeminden olan yüksekliktir.'],
    ['Yazdığım değerler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızın içinde yapılır; girdiğiniz yükseklikler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['deniz-mili-km-cevir', 'simsek-mesafesi-hesapla', 'tekne-hizi-hesapla', 'kure-yuzey-alani-hesapla', 'egim-yuzdesi-hesapla'],
};
