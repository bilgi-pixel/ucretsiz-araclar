export default {
  slug: 'cm-inc-cevir',
  title: 'Santimetre İnç Çevirici',
  h1Tail: 'cm ↔ inç',
  pageTitle: 'Santimetre İnç Çevirici – cm\'den İnçe, İnçten cm\'ye Hesaplama',
  description: 'Santimetreyi inçe, inçi santimetreye anında çevirin. 1 inç = 2,54 cm tanımıyla çalışır; feet ve inç karşılığını, milimetre değerini de gösterir.',
  card: 'Santimetreyi inçe, inçi santimetreye çevirin; ekran, beden ve boru ölçülerinde feet-inç karşılığıyla birlikte.',
  category: 'birim',
  keywords: ['cm inç çevirme', 'inç kaç cm', 'santimetre inç', '1 inç kaç cm', 'inç hesaplama', 'cm to inch', 'inç cm dönüştürme'],
  lead: 'Bir uzunluğu santimetreden inçe ya da inçten santimetreye çevirin. Araç, uluslararası tanım olan <strong>1 inç = 2,54 cm</strong> eşitliğini kullanır ve sonucu milimetre, feet ve inç olarak da gösterir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 55' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['cm', 'Santimetre → İnç'], ['inc', 'İnç → Santimetre']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const cm = v.yon === 'inc' ? x * 2.54 : x;
    const inc = cm / 2.54;
    const ft = Math.floor(inc / 12 + 1e-9);
    const kalan = inc - ft * 12;
    return {
      rows: [
        v.yon === 'inc' ? ['Santimetre', h.fmt(cm, 4) + ' cm'] : ['İnç', h.fmt(inc, 4) + ' inç'],
        v.yon === 'inc' ? ['İnç', h.fmt(inc, 4) + ' inç'] : ['Santimetre', h.fmt(cm, 4) + ' cm'],
        ['Milimetre', h.fmt(cm * 10, 3) + ' mm'],
        ['Feet ve inç', `${ft} ft ${h.fmt(kalan, 2)} inç`],
      ],
      note: '1 inç = 2,54 cm (tam tanım). Sonuçlar en fazla dört ondalık basamakla gösterilir.',
    };
  },
  cases: [
    { in: { deger: '2,54', yon: 'cm' }, out: { 'İnç': '1 inç', 'Milimetre': '25,4 mm' } },
    { in: { deger: '55', yon: 'inc' }, out: { 'Santimetre': '139,7 cm', 'Feet ve inç': '4 ft 7 inç' } },
    { in: { deger: '180', yon: 'cm' }, out: { 'İnç': '70,8661 inç', 'Feet ve inç': '5 ft 10,87 inç' } },
    { in: { deger: '1', yon: 'inc' }, out: { 'Santimetre': '2,54 cm' } },
    { in: { deger: '0', yon: 'cm' }, out: { 'İnç': '0 inç' } },
    { in: { deger: '12', yon: 'inc' }, out: { 'Santimetre': '30,48 cm', 'Feet ve inç': '1 ft 0 inç' } },
    { in: { deger: 'abc', yon: 'cm' }, error: true },
    { in: { deger: '-5', yon: 'cm' }, error: true },
  ],
  howto: [
    '"Değer" alanına çevirmek istediğiniz uzunluğu yazın; ondalık için virgül ya da nokta kullanabilirsiniz.',
    '"Çeviri yönü" listesinden santimetreden inçe mi, inçten santimetreye mi çevireceğinizi seçin.',
    '"Çevir" düğmesine basın. Sonuç kutusunda karşılık gelen değer, milimetre ve feet-inç gösterimiyle birlikte görünür.',
    'İsterseniz "Sonucu kopyala" düğmesiyle tüm satırları panoya alın ve mesaja, tabloya ya da sipariş notuna yapıştırın.',
  ],
  sections: [
    { h: 'İnç nedir, neden hâlâ kullanılıyor?', p: [
      'İnç (inch), Amerika Birleşik Devletleri ve kısmen Birleşik Krallık\'ta gündelik hayatta kullanılan bir uzunluk birimidir. Türkçede "parmak" ya da eski kullanımıyla "pus" olarak da geçer. 1959\'daki uluslararası anlaşmayla birlikte inç, metrik sisteme bağlanmış ve tam olarak 2,54 santimetre kabul edilmiştir. Bu yüzden çeviride yuvarlama hatası yoktur; hesap doğrudan çarpma ya da bölmedir.',
      'Türkiye metrik sistemi kullansa da inç birçok üründe karşımıza çıkar: televizyon ve monitör ekranları, telefon ve tablet boyutları, bisiklet jantları, araç jantları, tesisat boruları, vida ve cıvata ölçüleri, kot pantolon bedenleri ve fotoğraf baskı boyutları inçle ifade edilir. Yurt dışından alışveriş yaparken ürün ölçülerinin inç olarak verilmesi de yaygındır.',
    ] },
    { h: 'Santimetreyi inçe çevirme formülü', p: [
      'Santimetreden inçe geçmek için değeri 2,54\'e bölersiniz: <strong>inç = cm ÷ 2,54</strong>. Örneğin 100 cm, 100 ÷ 2,54 = 39,37 inç eder. Tersine, inçten santimetreye geçmek için 2,54 ile çarparsınız: <strong>cm = inç × 2,54</strong>. 32 inç, 32 × 2,54 = 81,28 cm\'dir.',
      'Akılda kolay kalması için şu yaklaşık değerler işe yarar: 10 cm yaklaşık 4 inç, 30 cm yaklaşık 1 feet (12 inç), 1 metre ise yaklaşık 39,4 inçtir. Kesin sonuç gereken sipariş ve imalat işlerinde yaklaşık değer yerine bu sayfadaki tam hesabı kullanın.',
    ] },
    { h: 'Feet ve inç gösterimi', p: [
      'ABD\'de boy ve bazı uzunluklar "5 feet 10 inç" biçiminde, yani feet ve kalan inç olarak söylenir. 1 feet 12 inçtir, yani 30,48 cm eder. Araç, sonucu bu biçimde de verir: 180 cm yazdığınızda 70,87 inç değerinin yanında 5 ft 10,87 inç karşılığını görürsünüz. Böylece yurt dışı formlarında boy bilgisini doğrudan doldurabilirsiniz.',
    ] },
    { h: 'Ekran boyutlarında inç', p: [
      'Televizyon, monitör ve telefon ekranlarında söylenen inç değeri ekranın genişliği değil, <strong>köşegen uzunluğudur</strong>. 55 inç bir televizyonun köşegeni 139,7 cm\'dir; ancak 16:9 oranlı bu ekranın genişliği yaklaşık 121,8 cm, yüksekliği yaklaşık 68,5 cm olur. Televizyonu yerleştireceğiniz ünitenin ölçüsünü alırken köşegeni değil genişliği dikkate almanız gerekir. Çerçeve payı modelden modele değiştiği için kesin dış ölçü için üreticinin teknik bilgilerine bakın.',
    ] },
    { h: 'Sık kullanılan değerler', ul: [
      '<strong>1 inç</strong> = 2,54 cm = 25,4 mm',
      '<strong>5 inç</strong> = 12,7 cm (küçük telefon ekranı)',
      '<strong>6,7 inç</strong> = 17,02 cm (büyük telefon ekranı)',
      '<strong>15,6 inç</strong> = 39,62 cm (yaygın dizüstü ekranı)',
      '<strong>24 inç</strong> = 60,96 cm (masaüstü monitör)',
      '<strong>32 inç</strong> = 81,28 cm',
      '<strong>43 inç</strong> = 109,22 cm',
      '<strong>55 inç</strong> = 139,7 cm',
      '<strong>65 inç</strong> = 165,1 cm',
      '<strong>75 inç</strong> = 190,5 cm',
    ] },
    { h: 'Boru, jant ve beden ölçülerinde dikkat edilecekler', p: [
      'Tesisat borularında "yarım parmak", "üç çeyrek" gibi adlar anma ölçüsüdür; borunun dış çapı bu değerin doğrudan santimetre karşılığı değildir. Örneğin yarım inç anma ölçülü bir çelik borunun dış çapı yaklaşık 21 mm\'dir. Bu yüzden boru ve rakor alırken yalnızca birim çevirisine güvenmeyin, standart tablosundaki dış çapı kontrol edin.',
      'Jant ölçüleri jantın çapını inç olarak verir: 16 inç jant 40,64 cm çapındadır. Kot pantolonlarda bel ve boy ölçüleri de inçtir; 32 bel yaklaşık 81 cm bel çevresine karşılık gelir, ancak markadan markaya kalıp farkı olur. Fotoğraf baskılarında 4×6 inç ölçüsü 10,16×15,24 cm\'ye denk gelir ve piyasada 10×15 olarak anılır.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç negatif değer kabul etmez; uzunluk sıfır ya da pozitif olmalıdır. Sonuçlar en fazla dört ondalık basamakla gösterilir, bu da milimetrenin binde biri düzeyinde bir duyarlılıktır ve gündelik işlerin tamamı için yeterlidir. Hassas imalat toleransları için ölçüm aletinizin doğruluğunu ayrıca hesaba katın.',
    ] },
  ],
  faq: [
    ['1 inç kaç santimetredir?', '1 inç tam olarak 2,54 santimetredir. Bu değer yaklaşık değil, uluslararası anlaşmayla belirlenmiş tanımdır; dolayısıyla 1 inç aynı zamanda 25,4 milimetredir.'],
    ['1 santimetre kaç inçtir?', '1 santimetre yaklaşık 0,3937 inçtir. Hesap 1 ÷ 2,54 işlemiyle yapılır. 10 santimetre 3,937 inç, 100 santimetre 39,37 inç eder.'],
    ['55 inç televizyon kaç santimetredir?', '55 inç, 139,7 santimetre eder; ancak bu ekranın köşegen uzunluğudur. 16:9 oranlı bir 55 inç ekranın genişliği yaklaşık 121,8 cm, yüksekliği yaklaşık 68,5 cm\'dir.'],
    ['İnç ile parmak aynı şey midir?', 'Evet, gündelik dilde ve özellikle tesisatçılıkta "parmak" denildiğinde inç kastedilir. Bir parmak 2,54 cm\'dir. Boru anma ölçülerinde ise parmak değeri dış çapın birebir karşılığı değildir.'],
    ['Boyumu feet ve inç olarak nasıl yazarım?', 'Boyunuzu santimetre olarak yazıp "Santimetre → İnç" yönünü seçin. Sonuçtaki "Feet ve inç" satırı doğrudan kullanılabilir; örneğin 175 cm için 5 ft 8,9 inç görürsünüz.'],
    ['İnç simgesi nedir?', 'İnç, sayıdan sonra çift tırnak işaretiyle (″) ya da "in" kısaltmasıyla gösterilir; feet için tek tırnak (′) ya da "ft" kullanılır. 5′10″ yazımı 5 feet 10 inç anlamına gelir.'],
    ['Ondalıklı inç değerini kesirli inçe nasıl çeviririm?', 'ABD\'de inçin kesirleri 1/2, 1/4, 1/8 ve 1/16 olarak kullanılır. Ondalık kısmı 16 ile çarpıp en yakın tam sayıya yuvarlarsanız on altıda kaç olduğunu bulursunuz; örneğin 0,375 inç 6/16, yani 3/8 inçtir.'],
    ['Yazdığım değerler bir yere gönderiliyor mu?', 'Hayır. Çeviri tamamen tarayıcınızda yapılır; yazdığınız sayı sunucuya iletilmez ve saklanmaz. Sayfa bir kez açıldıktan sonra internet bağlantısı olmadan da çalışır.'],
  ],
  related: ['birim-donustur', 'mm-inc-cevir', 'metre-feet-cevir', 'ekran-boyutu-hesapla', 'dpi-hesapla'],
};
