export default {
  slug: 'desimetrekup-litre-cevir',
  title: 'Desimetreküp Litre Çevirici',
  h1Tail: 'dm³ ↔ L',
  pageTitle: 'Desimetreküp Litre Çevirici – 1 dm³ Kaç Litre Hesaplama',
  description: 'Desimetreküpü litreye, litreyi desimetreküpe çevirin. 1 dm³ = 1 litre eşitliğiyle çalışır; metreküp, santimetreküp ve mililitre karşılıklarını da gösterir.',
  card: 'Desimetreküpü litreye, litreyi desimetreküpe çevirin; metreküp ve santimetreküp karşılıklarını tek ekranda görün.',
  category: 'birim',
  keywords: ['desimetreküp litre çevirme', '1 dm3 kaç litre', 'dm3 litre hesaplama', 'litre kaç dm3', 'desimetreküp nedir', 'dm3 cm3 çevirme', 'hacim ölçüleri sıvı ölçüleri'],
  lead: 'Desimetreküp ile litre arasında çeviri yapın. Litre, bir desimetreküpün özel adıdır; yani <strong>1 dm³ = 1 L</strong> eşitliği tamdır. Araç aynı hacmin metreküp, santimetreküp ve mililitre karşılıklarını da listeler.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 60' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['dl', 'Desimetreküp → Litre'], ['ld', 'Litre → Desimetreküp']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    // 1 dm³ = 1 L; sayısal değer aynı kalır, yön satır sırasını belirler.
    const litre = x;
    const lSatir = ['Litre', h.fmt(litre, 4) + ' L'];
    const dSatir = ['Desimetreküp', h.fmt(litre, 4) + ' dm³'];
    return {
      rows: [
        v.yon === 'ld' ? dSatir : lSatir,
        v.yon === 'ld' ? lSatir : dSatir,
        ['Metreküp', h.fmt(litre / 1000, 7) + ' m³'],
        ['Santimetreküp', h.fmt(litre * 1000, 1) + ' cm³'],
        ['Mililitre', h.fmt(litre * 1000, 1) + ' mL'],
      ],
      note: '1 dm³ = 1 L = 1000 cm³ = 1000 mL = 0,001 m³. Litre, desimetreküpün özel adıdır; çeviri katsayısı 1\'dir.',
    };
  },
  cases: [
    { in: { deger: '1', yon: 'dl' }, out: { 'Litre': '1 L', 'Santimetreküp': '1.000 cm³' } },
    { in: { deger: '60', yon: 'ld' }, out: { 'Desimetreküp': '60 dm³', 'Metreküp': '0,06 m³' } },
    { in: { deger: '250', yon: 'dl' }, out: { 'Litre': '250 L', 'Metreküp': '0,25 m³' } },
    { in: { deger: '1000', yon: 'ld' }, out: { 'Desimetreküp': '1.000 dm³', 'Metreküp': '1 m³' } },
    { in: { deger: '0,5', yon: 'dl' }, out: { 'Litre': '0,5 L', 'Mililitre': '500 mL' } },
    { in: { deger: '2,4', yon: 'dl' }, out: { 'Litre': '2,4 L', 'Santimetreküp': '2.400 cm³' } },
    { in: { deger: '0', yon: 'ld' }, out: { 'Desimetreküp': '0 dm³' } },
    { in: { deger: 'dm3', yon: 'dl' }, error: true },
    { in: { deger: '-12', yon: 'ld' }, error: true },
  ],
  howto: [
    '"Değer" alanına hacmi yazın. Ölçüleri desimetre cinsinden çarparak bulduğunuz sonucu ya da litre değerini girebilirsiniz.',
    '"Çeviri yönü" listesinden desimetreküpten litreye ya da litreden desimetreküpe seçeneğini belirleyin.',
    '"Çevir" düğmesine basın. İlk satır aradığınız karşılıktır; metreküp, santimetreküp ve mililitre değerleri altında görünür.',
    'Ödev ya da rapor için sonuçları "Sonucu kopyala" düğmesiyle panoya alabilirsiniz.',
  ],
  sections: [
    { h: 'Desimetreküp nedir?', p: [
      'Desimetre, metrenin onda biridir ve 10 santimetreye eşittir. Kenarları birer desimetre, yani onar santimetre olan bir küpün hacmine <strong>desimetreküp</strong> denir ve dm³ olarak yazılır. Bu küp, yaklaşık olarak bir litrelik süt kutusunun kapladığı yer kadardır.',
      'Litre ise bu hacme verilmiş özel bir addır. Uluslararası ölçü kuruluşlarının tanımına göre litre tam olarak bir desimetreküptür. Bu yüzden iki birim arasında bir çarpan yoktur: 1 dm³ = 1 L, 25 dm³ = 25 L, 0,5 dm³ = 0,5 L. Katı cisimlerin ve kapların hacmi genellikle desimetreküp gibi "küp" birimleriyle, sıvıların miktarı ise litreyle söylenir; ama anlatılan büyüklük aynıdır.',
    ] },
    { h: 'Litrenin tanımının kısa tarihi', p: [
      'Litre ilk kez 18. yüzyılın sonunda Fransa\'da metrik sistemle birlikte bir desimetreküp olarak tanımlandı. 20. yüzyılın başında tanım değiştirildi ve litre, bir kilogram saf suyun en yoğun olduğu sıcaklıkta kapladığı hacim olarak kabul edildi. Bu tanımla litre, desimetreküpten milyonda 28 kadar büyük çıkıyordu. Çok küçük olan bu fark hassas ölçümlerde karışıklık yarattığı için 1964\'te eski tanıma dönüldü ve litre yeniden tam olarak bir desimetreküpe eşitlendi.',
      'Bugün iki birim arasında hiçbir fark yoktur. Eski tarihli çok hassas ölçüm tablolarını okumuyorsanız bu ayrıntıyı hesaba katmanız gerekmez.',
    ] },
    { h: 'Hacim ölçüleri ile sıvı ölçüleri arasındaki köprü', p: [
      'Okulda hacim ölçüleri (m³, dm³, cm³) ve sıvı ölçüleri (L, cL, mL) ayrı başlıklarda öğretilir. İkisini birbirine bağlayan üç eşitlik vardır ve bunlar akılda tutulursa bütün dönüşümler kolaylaşır:',
    ], ul: [
      '<strong>1 m³</strong> = 1000 L (bir kilolitre)',
      '<strong>1 dm³</strong> = 1 L',
      '<strong>1 cm³</strong> = 1 mL',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Ölçüleri 5 dm × 4 dm × 3 dm olan bir akvaryumun hacmi 5 × 4 × 3 = 60 dm³\'tür. Bu doğrudan 60 litre demektir ve 0,06 metreküpe karşılık gelir. Aynı akvaryumun ölçüleri santimetre olarak 50 × 40 × 30 biçiminde verilseydi çarpım 60.000 cm³ çıkar, 1000\'e bölünerek yine 60 litre bulunurdu.',
      '<strong>Örnek 2:</strong> 250 dm³ hacmindeki bir buzdolabı 250 litreliktir; bu 0,25 m³ eder.',
      '<strong>Örnek 3:</strong> 2,4 dm³\'lük bir kap 2,4 litre, yani 2.400 cm³ sıvı alır. Yarım desimetreküp ise 0,5 litre ve 500 mL\'dir.',
    ] },
    { h: 'Desimetre ile hesap yapmanın kolaylığı', p: [
      'Bir kabın kaç litre aldığını bulmak istediğinizde ölçüleri baştan desimetreye çevirmek işi kısaltır. Santimetre cinsinden ölçüyü 10\'a bölerek desimetreye geçersiniz: 35 cm, 3,5 dm\'dir. Üç ölçüyü desimetre olarak çarptığınızda sonuç doğrudan litre çıkar ve ayrıca bölme yapmanız gerekmez.',
      'Örneğin iç ölçüleri 35 cm × 20 cm × 25 cm olan bir saklama kabı için 3,5 × 2 × 2,5 = 17,5 dm³, yani 17,5 litre bulunur. Silindir biçimli kaplarda da aynı yöntem geçerlidir: yarıçap ve yükseklik desimetre alınırsa π × r² × h işleminin sonucu litredir.',
    ] },
    { h: 'Nerelerde karşılaşılır?', ul: [
      '<strong>Matematik ve fen dersleri:</strong> Hacim ölçülerini sıvı ölçülerine çevirme soruları desimetreküp–litre eşitliğine dayanır.',
      '<strong>Beyaz eşya ve mobilya:</strong> Buzdolabı, fırın ve dolap iç hacimleri teknik belgelerde dm³ olarak, tanıtımlarda litre olarak yazılır.',
      '<strong>Kimya:</strong> Derişim birimi mol/L, bilimsel yazımda mol/dm³ olarak da gösterilir; ikisi aynıdır.',
      '<strong>Otomotiv:</strong> Bagaj hacmi litre ya da dm³ olarak verilir; motor silindir hacmi cm³ ile ifade edilir.',
      '<strong>Ambalaj ve lojistik:</strong> Küçük koli ve kasa hacimleri dm³ ile hesaplanır.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'Desimetreküp ile desilitre karıştırılmamalıdır. Desilitre (dL) litrenin onda biridir; desimetreküp ise litrenin kendisidir. İkinci sık hata, hacim birimleri arasında onar onar geçiş yapmaktır: bir desimetreküp 10 değil 1000 santimetreküptür, bir metreküp de 1000 desimetreküptür.',
      'Araç negatif değer kabul etmez. Kapların brüt hacmi ile kullanılabilir hacmi farklı olabilir; et kalınlığı, raf ve taşma payı gibi etkenler gerçek sıvı kapasitesini düşürür.',
    ] },
  ],
  faq: [
    ['1 desimetreküp kaç litredir?', '1 desimetreküp tam olarak 1 litredir. Litre, desimetreküpün özel adıdır; aralarında çarpan yoktur.'],
    ['1 litre kaç dm³ eder?', '1 litre 1 dm³ eder. Aynı zamanda 1000 cm³ ve 0,001 m³\'tür.'],
    ['1 dm³ kaç cm³ eder?', '1 dm³, 1000 cm³ eder. Çünkü 1 dm 10 cm\'dir ve hacimde bu oran üç kez çarpılır: 10 × 10 × 10 = 1000.'],
    ['1 metreküp kaç desimetreküptür?', '1 metreküp 1000 desimetreküptür, yani 1000 litredir. 1 metre 10 desimetre olduğu için hacimde oran 1000 olur.'],
    ['Desimetreküp ile desilitre aynı mıdır?', 'Hayır. Desimetreküp 1 litreye, desilitre ise 0,1 litreye eşittir. 1 dm³, 10 dL eder.'],
    ['Litre ile dm³ arasında hiç fark olmadı mı?', '1901 ile 1964 arasında litre suyun kütlesi üzerinden tanımlanıyordu ve dm³\'ten milyonda 28 kadar büyüktü. 1964\'ten beri iki birim tam olarak eşittir.'],
    ['Santimetre ölçülerinden litreyi nasıl bulurum?', 'Üç ölçüyü santimetre olarak çarpın ve sonucu 1000\'e bölün. Ya da ölçüleri önce 10\'a bölerek desimetreye çevirin; çarpım doğrudan litre çıkar.'],
    ['Yazdığım değerler saklanıyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda çalışır; girdiğiniz sayılar sunucuya gönderilmez.'],
  ],
  related: ['litre-metrekup-cevir', 'cc-ml-cevir', 'litre-mililitre-cevir', 'hacim-hesapla', 'su-deposu-hacmi-hesapla', 'birim-donustur'],
};
