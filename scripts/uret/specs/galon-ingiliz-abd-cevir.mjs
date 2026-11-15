export default {
  slug: 'galon-ingiliz-abd-cevir',
  title: 'ABD Galonu İngiliz Galonu Çevirici',
  h1Tail: 'US gal ↔ UK gal',
  pageTitle: 'ABD Galonu İngiliz Galonu Çevirici – US gal ve UK gal Çevirme',
  description: 'ABD galonunu İngiliz (imperial) galonuna, İngiliz galonunu ABD galonuna çevirin. 3,785411784 L ve 4,54609 L tanımlarıyla çalışır; litre karşılığını da verir.',
  card: 'ABD galonunu İngiliz galonuna ya da tersine çevirin; litre karşılığıyla birlikte, tam tanım değerleriyle.',
  category: 'birim',
  keywords: ['abd galonu ingiliz galonu çevirme', 'us galon uk galon farkı', 'imperial galon kaç litre', 'abd galonu kaç litre', 'galon çevirici', 'ingiliz galonu abd galonu', 'us gal to uk gal'],
  lead: 'Aynı adı taşıyan ama farklı büyüklükteki iki galonu birbirine çevirin. Araç, <strong>1 ABD galonu = 3,785411784 litre</strong> ve <strong>1 İngiliz galonu = 4,54609 litre</strong> tanımlarını kullanır.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Hacim (galon)', type: 'number', placeholder: 'Örn. 10' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['abd', 'ABD galonu → İngiliz galonu'], ['ing', 'İngiliz galonu → ABD galonu']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Hacim (galon)');
    const ABD_L = 3.785411784;
    const ING_L = 4.54609;
    const litre = v.yon === 'ing' ? x * ING_L : x * ABD_L;
    const abd = v.yon === 'ing' ? litre / ABD_L : x;
    const ing = v.yon === 'ing' ? x : litre / ING_L;
    const satirAbd = ['ABD galonu', h.fmt(abd, 6) + ' US gal'];
    const satirIng = ['İngiliz galonu', h.fmt(ing, 6) + ' UK gal'];
    return {
      rows: [
        v.yon === 'ing' ? satirAbd : satirIng,
        v.yon === 'ing' ? satirIng : satirAbd,
        ['Litre', h.fmt(litre, 6) + ' L'],
      ],
      note: '1 US gal = 3,785411784 L (231 inç küp); 1 UK gal = 4,54609 L (tam tanımlar). 1 UK gal ≈ 1,20095 US gal. Buradaki ABD galonu sıvı galonudur.',
    };
  },
  cases: [
    { in: { deger: '1', yon: 'abd' }, out: { 'İngiliz galonu': '0,832674 UK gal', 'Litre': '3,785412 L' } },
    { in: { deger: '1', yon: 'ing' }, out: { 'ABD galonu': '1,20095 US gal', 'Litre': '4,54609 L' } },
    { in: { deger: '10', yon: 'abd' }, out: { 'İngiliz galonu': '8,326742 UK gal', 'Litre': '37,854118 L' } },
    { in: { deger: '100', yon: 'ing' }, out: { 'ABD galonu': '120,094993 US gal', 'Litre': '454,609 L' } },
    { in: { deger: '50', yon: 'abd' }, out: { 'İngiliz galonu': '41,633709 UK gal', 'Litre': '189,270589 L' } },
    { in: { deger: '5', yon: 'ing' }, out: { 'ABD galonu': '6,00475 US gal', 'Litre': '22,73045 L' } },
    { in: { deger: '0', yon: 'abd' }, out: { 'İngiliz galonu': '0 UK gal' } },
    { in: { deger: '-2', yon: 'abd' }, error: true },
    { in: { deger: 'galon', yon: 'ing' }, error: true },
  ],
  howto: [
    '"Hacim (galon)" alanına elinizdeki galon değerini yazın; ondalık için virgül ya da nokta kullanabilirsiniz.',
    '"Çeviri yönü" listesinden değerin ABD galonu mu, İngiliz galonu mu olduğunu ve hangisine çevrileceğini seçin.',
    '"Çevir" düğmesine basın. İlk satırda diğer galon cinsinden karşılık, son satırda litre değeri görünür.',
    'Sonucu tabloya ya da yazışmaya aktarmak için "Sonucu kopyala" düğmesini kullanın.',
  ],
  sections: [
    { h: 'Neden iki farklı galon var?', p: [
      'Galon, Orta Çağ İngiltere\'sinden bu yana kullanılan bir hacim birimidir ve tarih boyunca şarap, bira ve tahıl için ayrı ayrı galonlar tanımlanmıştır. Amerika Birleşik Devletleri, sömürge döneminde yaygın olan ve 231 inç küp büyüklüğündeki "şarap galonunu" korumuştur; bugün ABD sıvı galonu olarak bilinen birim budur ve tam olarak 3,785411784 litreye eşittir.',
      'Birleşik Krallık ise 1824\'te ölçülerini yeniden düzenleyerek tek bir "imperial" galon benimsemiştir. Başlangıçta belirli sıcaklıktaki 10 pound suyun hacmi olarak tarif edilen bu birim, günümüzde tam olarak 4,54609 litre olarak tanımlıdır. Sonuçta aynı adı taşıyan iki birim ortaya çıkmıştır ve İngiliz galonu ABD galonundan yaklaşık yüzde 20 büyüktür.',
    ] },
    { h: 'Çeviri formülü', p: [
      'İki galonu birbirine bağlayan oran, litre tanımlarının bölümüdür: 4,54609 ÷ 3,785411784 ≈ 1,20095. Buna göre <strong>ABD galonu = İngiliz galonu × 1,20095</strong> ve <strong>İngiliz galonu = ABD galonu × 0,832674</strong> olur. Araç bu yuvarlanmış katsayıları değil, tanım değerlerini kullanır: önce girilen hacmi litreye çevirir, sonra diğer galonun litre karşılığına böler. Böylece büyük hacimlerde bile yuvarlama birikmez.',
      'Akılda tutmak için pratik bir kural: beş İngiliz galonu yaklaşık altı ABD galonudur (tam değer 6,00475). Tersinden, altı ABD galonu yaklaşık beş İngiliz galonu eder.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> ABD yapımı bir akvaryumun hacmi 50 galon olarak belirtilmiş. İngiliz galonu karşılığı 50 × 3,785411784 ÷ 4,54609 = 41,633709 UK gal, litre karşılığı 189,270589 L\'dir. Su düzenleyici ya da ilaç dozunu litre üzerinden hesaplamak en güvenlisidir.',
      '<strong>Örnek 2:</strong> Birleşik Krallık\'tan alınan bir yakıt bidonu 5 galonluk. 5 × 4,54609 = 22,73045 litre; ABD galonu olarak 6,00475 US gal. Aynı "5 galon" etiketi ABD yapımı bir bidonda yalnızca 18,93 litre demektir.',
      '<strong>Örnek 3:</strong> 100 İngiliz galonluk bir su deposu 454,609 litre ve 120,094993 ABD galonu eder. Depo siparişi verirken galonun türünü belirtmemek yaklaşık 76 litrelik bir farka yol açabilir.',
    ] },
    { h: 'Yakıt tüketiminde galon farkı: mpg', p: [
      'Galon farkının en çok kafa karıştırdığı yer, "galon başına mil" (mpg) olarak verilen yakıt tüketimi değerleridir. İngiliz galonu daha büyük olduğu için aynı araç Birleşik Krallık kaynaklarında daha yüksek mpg değeriyle görünür. Çevirmek için ABD mpg değerini 1,20095 ile çarparsınız: 30 mpg (ABD) yaklaşık 36,03 mpg (İngiliz) eder. Yurt dışı otomobil incelemelerini karşılaştırırken hangi galonun kullanıldığına bakmadan iki değeri yan yana koymak yanıltıcı olur.',
      'Türkiye\'de alışılmış olan 100 kilometrede litre gösterimine geçmek için ayrıca mil-kilometre çevirisi de gerekir; bunun için yakıt tüketimi birim çeviricisini kullanabilirsiniz.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>1 US gal</strong> = 3,785412 L ≈ 0,832674 UK gal',
      '<strong>1 UK gal</strong> = 4,54609 L ≈ 1,20095 US gal',
      '<strong>5 US gal</strong> ≈ 18,927 L ≈ 4,163 UK gal',
      '<strong>5 UK gal</strong> = 22,73045 L ≈ 6,005 US gal',
      '<strong>10 US gal</strong> ≈ 37,854 L ≈ 8,327 UK gal',
      '<strong>15 US gal</strong> ≈ 56,781 L ≈ 12,49 UK gal',
      '<strong>100 UK gal</strong> = 454,609 L ≈ 120,095 US gal',
    ] },
    { h: 'Hangi galonla karşı karşıya olduğunuzu nasıl anlarsınız?', p: [
      'Genel kural, ürünün ya da belgenin kaynağına bakmaktır. ABD\'de üretilen ya da ABD pazarı için hazırlanan ürünlerde, Amerikan tariflerinde, havuz ve akvaryum malzemelerinde, boya kutularında galon neredeyse her zaman ABD galonudur. Birleşik Krallık kaynaklı eski tariflerde, bira ve içecek sektöründe, bazı Commonwealth ülkelerinin eski belgelerinde ise imperial galon kullanılır. Etikette "US gal" ya da "imp gal" kısaltması varsa tür açıkça belirtilmiş demektir; yalnızca "gal" yazıyorsa litre karşılığının da verilip verilmediğine bakın.',
      'Galonun alt birimleri de iki sistemde farklıdır. Her iki sistemde bir galon 4 quart ya da 8 pint eder, fakat ABD pinti 16, İngiliz pinti 20 sıvı onstur ve sıvı onsların büyüklüğü de birbirinden biraz farklıdır. Bu yüzden pint ve sıvı ons çevirilerinde de sistemin hangisi olduğu önemlidir.',
    ] },
    { h: 'Sınırlar ve dikkat edilecekler', p: [
      'Araç ABD <em>sıvı</em> galonunu esas alır. ABD\'de tahıl gibi kuru ürünler için tarihsel olarak kullanılan ve yaklaşık 4,405 litre olan "kuru galon" bu sayfanın kapsamında değildir; günümüzde zaten çok seyrek kullanılır. Negatif hacim kabul edilmez. Sonuçlar altı ondalık basamağa kadar gösterilir. Yakıt, kimyasal ya da ilaç gibi miktarın önemli olduğu işlerde hacmi litreye çevirip ürünün kendi belgesindeki değerle karşılaştırmak en sağlıklı yoldur.',
    ] },
  ],
  faq: [
    ['ABD galonu ile İngiliz galonu arasındaki fark nedir?', 'ABD galonu 3,785411784 litre, İngiliz (imperial) galonu 4,54609 litredir. İngiliz galonu yaklaşık yüzde 20 daha büyüktür; aradaki fark galon başına yaklaşık 0,76 litredir.'],
    ['1 ABD galonu kaç İngiliz galonudur?', '1 ABD galonu yaklaşık 0,832674 İngiliz galonudur. Kabaca altı ABD galonu beş İngiliz galonuna denk gelir.'],
    ['1 İngiliz galonu kaç ABD galonudur?', '1 İngiliz galonu yaklaşık 1,20095 ABD galonudur. Litre olarak 4,54609 L eder.'],
    ['Türkiye\'de galon denince hangisi anlaşılır?', 'Türkiye metrik sistemi kullandığı için galonun resmî bir karşılığı yoktur; ithal ürünlerde çoğunlukla ABD galonu görülür. Belirsizlik varsa etiketteki litre değerine bakmak en doğrusudur.'],
    ['mpg değerlerini nasıl çeviririm?', 'ABD mpg değerini 1,20095 ile çarparak İngiliz mpg değerini, İngiliz mpg değerini 0,832674 ile çarparak ABD mpg değerini bulursunuz. Örneğin 30 mpg (ABD) yaklaşık 36,03 mpg (İngiliz) eder.'],
    ['Kuru galon bu araçta var mı?', 'Hayır. Araç ABD sıvı galonu ile İngiliz galonu arasında çevirir. Yaklaşık 4,405 litrelik ABD kuru galonu günümüzde nadiren kullanılır ve kapsam dışındadır.'],
    ['İngiliz galonu hâlâ kullanılıyor mu?', 'Birleşik Krallık\'ta yakıt litreyle satılır, ancak yakıt tüketimi hâlâ yaygın olarak galon başına mil ile ifade edilir ve bu hesapta imperial galon kullanılır. Bazı ülkelerde de alışkanlık olarak sürmektedir.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; yazdığınız sayı sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['litre-galon-cevir', 'pint-litre-cevir', 'ml-sivi-ons-cevir', 'varil-litre-cevir', 'yakit-tuketimi-birim-cevir', 'litre-metrekup-cevir'],
};
