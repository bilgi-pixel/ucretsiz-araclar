export default {
  slug: 'baski-piksel-boyutu-hesapla',
  title: 'Baskı İçin Piksel Boyutu Hesaplama',
  h1Tail: 'cm ve DPI → piksel',
  pageTitle: 'Baskı İçin Piksel Boyutu Hesaplama – cm ve DPI\'dan Piksel',
  description: 'Baskı ölçüsünü (cm, mm ya da inç) ve DPI değerini girin; görselin kaç piksel olması gerektiğini, megapiksel karşılığını ve sıkıştırılmamış dosya boyutunu öğrenin.',
  card: 'Baskı ölçüsü ve DPI değerinden görselin kaç piksel ve kaç megapiksel olması gerektiğini hesaplayın.',
  category: 'gunluk',
  keywords: ['baskı piksel hesaplama', 'cm piksel hesaplama', '300 dpi kaç piksel', '10x15 kaç piksel', 'baskı çözünürlüğü hesaplama', 'afiş piksel boyutu', 'fotoğraf baskı piksel'],
  lead: "Bir görseli belirli bir ölçüde net basabilmek için <strong>kaç piksel</strong> olması gerektiğini hesaplayın. Baskının enini, boyunu ve hedef çözünürlüğü (DPI) yazın; araç gereken piksel boyutunu, megapiksel karşılığını ve en-boy oranını versin.",
  button: 'Hesapla',
  inputs: [
    { id: 'en', label: 'Baskı eni', type: 'number', placeholder: 'Örn. 10' },
    { id: 'boy', label: 'Baskı boyu', type: 'number', placeholder: 'Örn. 15' },
    { id: 'birim', label: 'Ölçü birimi', type: 'select', options: [['cm', 'Santimetre (cm)'], ['mm', 'Milimetre (mm)'], ['inc', 'İnç']] },
    { id: 'dpi', label: 'Çözünürlük (DPI)', type: 'number', value: '300', hint: 'Elde bakılan baskılar için 300, afiş için 150, büyük branda için 72 ve altı.' },
  ],
  compute(v, h) {
    const en = h.pos(v.en, 'Baskı eni');
    const boy = h.pos(v.boy, 'Baskı boyu');
    const dpi = h.pos(v.dpi, 'Çözünürlük');
    const kat = v.birim === 'inc' ? 1 : v.birim === 'mm' ? 1 / 25.4 : 1 / 2.54;
    const enInc = en * kat, boyInc = boy * kat;
    const pxEn = Math.max(1, Math.round(enInc * dpi - 1e-9));
    const pxBoy = Math.max(1, Math.round(boyInc * dpi - 1e-9));
    if (pxEn > 1e6 || pxBoy > 1e6) h.err('Sonuç bir milyon pikseli aşıyor; ölçü birimini ve DPI değerini kontrol edin.');
    const toplam = pxEn * pxBoy;
    const kisa = Math.min(en, boy), uzun = Math.max(en, boy);
    return {
      rows: [
        ['Gereken piksel boyutu', h.fmt(pxEn, 0) + ' × ' + h.fmt(pxBoy, 0) + ' px'],
        ['Megapiksel', h.fmt(toplam / 1e6, 2) + ' MP'],
        ['Toplam piksel', h.fmt(toplam, 0) + ' piksel'],
        ['Baskı ölçüsü (cm)', h.fmt(enInc * 2.54, 2) + ' × ' + h.fmt(boyInc * 2.54, 2) + ' cm'],
        ['Baskı ölçüsü (inç)', h.fmt(enInc, 2) + ' × ' + h.fmt(boyInc, 2) + ' inç'],
        ['En-boy oranı', '1 : ' + h.fmt(uzun / kisa, 3)],
        ['Sıkıştırılmamış boyut (RGB, 8 bit)', h.fmt(toplam * 3 / 1e6, 1) + ' MB'],
      ],
      note: 'Piksel = ölçü (inç) × DPI; 1 inç = 2,54 cm. Değerler en yakın tam piksele yuvarlanır. JPEG gibi sıkıştırılmış dosyalar çok daha küçük olur.',
    };
  },
  cases: [
    { in: { en: '10', boy: '15', birim: 'cm', dpi: '300' }, out: { 'Gereken piksel boyutu': '1.181 × 1.772 px', 'Megapiksel': '2,09 MP', 'En-boy oranı': '1 : 1,5' } },
    { in: { en: '21', boy: '29,7', birim: 'cm', dpi: '300' }, out: { 'Gereken piksel boyutu': '2.480 × 3.508 px', 'Megapiksel': '8,7 MP', 'Toplam piksel': '8.699.840 piksel' } },
    { in: { en: '8', boy: '10', birim: 'inc', dpi: '300' }, out: { 'Gereken piksel boyutu': '2.400 × 3.000 px', 'Megapiksel': '7,2 MP', 'Baskı ölçüsü (cm)': '20,32 × 25,4 cm', 'Sıkıştırılmamış boyut (RGB, 8 bit)': '21,6 MB' } },
    { in: { en: '100', boy: '70', birim: 'cm', dpi: '150' }, out: { 'Gereken piksel boyutu': '5.906 × 4.134 px', 'Megapiksel': '24,42 MP' } },
    { in: { en: '210', boy: '297', birim: 'mm', dpi: '72' }, out: { 'Gereken piksel boyutu': '595 × 842 px', 'Megapiksel': '0,5 MP' } },
    { in: { en: '2,54', boy: '2,54', birim: 'cm', dpi: '96' }, out: { 'Gereken piksel boyutu': '96 × 96 px', 'En-boy oranı': '1 : 1' } },
    { in: { en: '0', boy: '15', birim: 'cm', dpi: '300' }, error: true },
    { in: { en: '10', boy: '15', birim: 'cm', dpi: '' }, error: true },
    { in: { en: '-10', boy: '15', birim: 'cm', dpi: '300' }, error: true },
  ],
  howto: [
    'Baskının enini ve boyunu yazın. Ondalıklı değerlerde virgül ya da nokta kullanabilirsiniz.',
    'Ölçü birimini seçin: santimetre, milimetre ya da inç.',
    'Hedef çözünürlüğü DPI olarak girin. Emin değilseniz fotoğraf ve broşür için 300, afiş için 150 kullanın.',
    'Hesapla düğmesine basın. Görselin en az kaç piksel olması gerektiği, megapiksel karşılığı ve baskı ölçüsünün diğer birimlerdeki karşılığı listelenir.',
    'Elinizdeki fotoğrafın piksel boyutunu bu değerle karşılaştırın; fotoğrafınız daha küçükse baskı ölçüsünü ya da DPI değerini düşürmeniz gerekir.',
  ],
  sections: [
    { h: 'Piksel, DPI ve baskı ölçüsü arasındaki ilişki', p: [
      'Dijital bir görsel piksellerden oluşur ve kendi başına bir santimetre ölçüsü yoktur. Görsel basıldığında, piksellerin kâğıt üzerinde ne kadar sık dizileceğini <strong>çözünürlük</strong> belirler. Çözünürlük, bir inç uzunluğa düşen nokta ya da piksel sayısıdır ve DPI (ya da görsel için PPI) ile gösterilir. Üç büyüklük tek bir formülle birbirine bağlıdır: <strong>piksel = baskı ölçüsü (inç) × DPI</strong>.',
      'Ölçü santimetre ise önce 2,54\'e bölünerek inçe çevrilir. Böylece formül <strong>piksel = cm ÷ 2,54 × DPI</strong> hâlini alır. Aynı görsel, daha düşük DPI ile basıldığında daha büyük bir alanı kaplar ama pikseller seyrekleştiği için yakından bakıldığında bulanık ya da kareli görünür.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      'En yaygın fotoğraf baskı ölçüsü olan 10 × 15 cm için 300 DPI kalitesinde gereken boyutu bulalım. Kısa kenar: 10 ÷ 2,54 × 300 = 1.181 piksel. Uzun kenar: 15 ÷ 2,54 × 300 = 1.772 piksel. Toplam 1.181 × 1.772 = 2.092.732 piksel, yani yaklaşık 2,09 megapikseldir. Bugünün telefon kameraları bu değerin çok üzerinde çözünürlük sunduğundan 10 × 15 baskı için piksel sıkıntısı yaşanmaz.',
      'A4 (21 × 29,7 cm) tam sayfa baskı için 300 DPI\'da 2.480 × 3.508 piksel, yani 8,7 megapiksel gerekir. 100 × 70 cm bir afiş 150 DPI ile basılacaksa 5.906 × 4.134 piksel, yaklaşık 24,4 megapiksel gerekir. Aynı afişi 300 DPI ile hazırlamak dört kat fazla piksel, yani 97 megapikselin üzerinde bir dosya anlamına gelir; bu yüzden büyük baskılarda çözünürlük bilinçli olarak düşürülür.',
    ] },
    { h: 'Hangi iş için hangi DPI?', p: [
      'Gereken çözünürlük, baskıya hangi mesafeden bakılacağına bağlıdır. Göz, uzaklaştıkça ince ayrıntıyı ayırt edemez; bu yüzden büyük baskılar daha düşük DPI ile sorunsuz görünür.',
    ], ul: [
      '<strong>300 DPI:</strong> fotoğraf baskısı, kartvizit, broşür, katalog, dergi – elde tutulup yakından bakılan işler',
      '<strong>200–250 DPI:</strong> fotoğraf kitabı, takvim, kabul edilebilir kalitede büyük fotoğraf baskıları',
      '<strong>150 DPI:</strong> afiş ve poster – bir iki metre uzaktan bakılan işler',
      '<strong>72–100 DPI:</strong> roll-up, stant görseli, iç mekân brandası',
      '<strong>20–50 DPI:</strong> bina cephesi ve yol kenarı reklam panosu gibi çok uzaktan görülen dev baskılar',
    ] },
    { h: 'Elinizdeki fotoğraf yeterli mi?', p: [
      'Fotoğrafınızın piksel boyutunu dosya özelliklerinden öğrenebilirsiniz. Araçta hesaplanan değer bundan küçük ya da eşitse baskı net çıkar. Fotoğrafınız gereken boyutun altındaysa üç seçeneğiniz vardır: baskı ölçüsünü küçültmek, daha düşük bir DPI değerini kabul etmek ya da görseli yazılımla büyütmek. Yazılımla büyütme yeni ayrıntı üretmez, yalnızca var olan pikselleri çoğaltıp yumuşatır; küçük farklarda işe yarar, büyük farklarda sonuç bulanık kalır.',
      'Mesajlaşma uygulamalarından gelen fotoğraflara dikkat edin. Bu uygulamalar görselleri gönderirken küçültür ve sıkıştırır; telefonda iyi görünen bir fotoğraf A4 baskıda yetersiz kalabilir. Baskı için mümkünse özgün dosyayı e-posta eki ya da belge olarak isteyin. İnternetten indirilen küçük görseller de çoğunlukla ekran için hazırlanmıştır ve baskıya uygun değildir.',
    ] },
    { h: 'Megapiksel ve dosya boyutu', p: [
      'Megapiksel, toplam piksel sayısının milyona bölünmüş hâlidir ve kamera çözünürlüklerini baskı ihtiyacıyla karşılaştırmayı kolaylaştırır. 12 megapiksellik bir fotoğraf (yaklaşık 4.000 × 3.000 piksel) 300 DPI ile 34 × 25 cm, 150 DPI ile 68 × 51 cm net basılabilir.',
      'Araç ayrıca sıkıştırılmamış dosya boyutunu verir. Her piksel kırmızı, yeşil ve mavi için birer bayt, toplam üç bayt tutar; bu yüzden 2.400 × 3.000 piksellik bir görsel bellekte 21,6 MB yer kaplar. JPEG olarak kaydedildiğinde boyut kaliteye bağlı olarak bunun onda biri düzeyine inebilir. Matbaaya gönderilen CMYK dosyalarda piksel başına dört bayt kullanıldığından boyut üçte bir oranında artar.',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'Bir görselin DPI etiketini yazılımda 72\'den 300\'e değiştirmek, piksel sayısı aynı kaldığı sürece kaliteyi artırmaz; yalnızca baskı ölçüsünü küçültür. Belirleyici olan her zaman piksel sayısıdır. İkinci hata kesim payını unutmaktır: matbaa işlerinde her kenardan genellikle birkaç milimetre taşma istenir; bu payı ölçüye ekleyerek hesap yapın. Üçüncü hata en ve boyu ters girmektir; yatay ve dikey kullanımda piksel değerleri yer değiştirir.',
      'Sonuçlar geometrik hesaba dayanır. Kâğıt türü, baskı tekniği ve yazıcının gerçek çözünürlüğü algılanan netliği etkiler; önemli işlerde matbaanızın ya da fotoğrafçınızın istediği teknik değerleri esas alın.',
    ] },
  ],
  faq: [
    ['10 × 15 fotoğraf baskısı için kaç piksel gerekir?', '300 DPI kalitesinde 1.181 × 1.772 piksel, yani yaklaşık 2,1 megapiksel gerekir. Daha yüksek çözünürlüklü fotoğraflar sorunsuz basılır.'],
    ['A4 baskı için kaç piksel gerekir?', '300 DPI için 2.480 × 3.508 piksel (8,7 megapiksel), 150 DPI için 1.240 × 1.754 piksel gerekir.'],
    ['DPI ile PPI aynı şey mi?', 'Teknik olarak PPI görseldeki inç başına piksel sayısı, DPI yazıcının inç başına bastığı nokta sayısıdır. Gündelik kullanımda ve baskı siparişlerinde ikisi aynı anlamda kullanılır; bu hesapta da aynı değeri temsil eder.'],
    ['300 DPI şart mı?', 'Yakından bakılan işler için önerilen değerdir ama zorunlu değildir. Afişler 150 DPI ile, büyük brandalar çok daha düşük değerlerle basılır; çünkü uzaktan bakıldığında fark görülmez.'],
    ['Küçük bir görseli büyüterek basabilir miyim?', 'Basabilirsiniz ama netlik düşer. Büyütme yeni ayrıntı eklemez. Gereken piksel boyutunun yarısından küçük görsellerde bulanıklık genellikle fark edilir.'],
    ['12 megapiksel fotoğraf en fazla kaç santimetre basılır?', 'Yaklaşık 4.000 × 3.000 piksellik bir fotoğraf 300 DPI ile 34 × 25 cm, 150 DPI ile 68 × 51 cm boyutunda net basılabilir.'],
    ['Görselin DPI değerini değiştirmek kaliteyi artırır mı?', 'Hayır. Piksel sayısı aynı kaldıkça yalnızca baskı ölçüsü değişir. Kaliteyi belirleyen, baskı alanına düşen gerçek piksel sayısıdır.'],
    ['Görselimi yüklemem gerekiyor mu?', 'Hayır. Araç yalnızca yazdığınız ölçülerle hesap yapar; dosya yüklenmez ve değerler sunucuya gönderilmez.'],
  ],
  related: ['dpi-hesapla', 'kagit-boyutlari', 'cm-piksel-cevir', 'inc-piksel-cevir', 'en-boy-orani-hesapla', 'cm-inc-cevir'],
};
