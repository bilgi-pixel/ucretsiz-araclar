export default {
  slug: 'metre-feet-cevir',
  title: 'Metre Feet Çevirici',
  h1Tail: 'm ↔ ft',
  pageTitle: 'Metre Feet Çevirici – Metreden Feete, Feetten Metreye Hesaplama',
  description: 'Metreyi feete, feeti metreye anında çevirin. 1 feet = 0,3048 metre tanımıyla çalışır; inç, yarda ve feet-inç karşılığını da birlikte gösterir.',
  card: 'Metreyi feete, feeti metreye çevirin; uçuş irtifası, tekne boyu ve yurt dışı ilanlarındaki ölçüler için feet-inç karşılığıyla.',
  category: 'birim',
  keywords: ['metre feet çevirme', '1 feet kaç metre', 'feet kaç metre', 'metre kaç feet', 'ft m çevirici', 'feet hesaplama', 'ayak metre çevirme', '10000 feet kaç metre'],
  lead: 'Bir uzunluğu ya da yüksekliği metreden feete, feetten metreye çevirin. Hesap, uluslararası tanım olan <strong>1 feet = 0,3048 metre</strong> eşitliğine dayanır; sonuçla birlikte inç, yarda ve feet-inç gösterimi de verilir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 10000' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['m', 'Metre → Feet'], ['ft', 'Feet → Metre']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const m = v.yon === 'ft' ? x * 0.3048 : x;
    const ft = v.yon === 'ft' ? x : x / 0.3048;
    const inc = ft * 12;
    let tamFt = Math.floor(ft + 1e-9);
    let kalan = Math.round((inc - tamFt * 12) * 100) / 100;
    if (kalan >= 12) { tamFt += 1; kalan = 0; }
    if (kalan < 0) kalan = 0;
    return {
      rows: [
        v.yon === 'ft' ? ['Metre', h.fmt(m, 4) + ' m'] : ['Feet', h.fmt(ft, 4) + ' ft'],
        v.yon === 'ft' ? ['Feet', h.fmt(ft, 4) + ' ft'] : ['Metre', h.fmt(m, 4) + ' m'],
        ['Feet ve inç', `${h.fmt(tamFt, 0)} ft ${h.fmt(kalan, 2)} inç`],
        ['İnç', h.fmt(inc, 3) + ' inç'],
        ['Yarda', h.fmt(ft / 3, 4) + ' yd'],
        ['Santimetre', h.fmt(m * 100, 2) + ' cm'],
      ],
      note: '1 feet = 0,3048 m (tam tanım), 1 feet = 12 inç, 1 yarda = 3 feet. Sonuçlar en fazla dört ondalık basamakla gösterilir.',
    };
  },
  cases: [
    { in: { deger: '10000', yon: 'ft' }, out: { 'Metre': '3.048 m', 'Yarda': '3.333,3333 yd' } },
    { in: { deger: '1', yon: 'm' }, out: { 'Feet': '3,2808 ft', 'Feet ve inç': '3 ft 3,37 inç', 'İnç': '39,37 inç' } },
    { in: { deger: '0,3048', yon: 'm' }, out: { 'Feet': '1 ft', 'Feet ve inç': '1 ft 0 inç', 'İnç': '12 inç' } },
    { in: { deger: '100', yon: 'ft' }, out: { 'Metre': '30,48 m', 'Santimetre': '3.048 cm' } },
    { in: { deger: '1,8', yon: 'm' }, out: { 'Feet': '5,9055 ft', 'Feet ve inç': '5 ft 10,87 inç' } },
    { in: { deger: '3', yon: 'ft' }, out: { 'Metre': '0,9144 m', 'Yarda': '1 yd', 'İnç': '36 inç' } },
    { in: { deger: '0', yon: 'm' }, out: { 'Feet': '0 ft' } },
    { in: { deger: 'on', yon: 'm' }, error: true },
    { in: { deger: '-3', yon: 'ft' }, error: true },
  ],
  howto: [
    '"Değer" alanına çevirmek istediğiniz uzunluğu yazın. Ondalık kısım için virgül ya da nokta kullanabilirsiniz.',
    '"Çeviri yönü" listesinden metreden feete mi, feetten metreye mi geçeceğinizi seçin.',
    '"Çevir" düğmesine basın; ilk satırda aradığınız karşılık, altında feet-inç, inç, yarda ve santimetre değerleri görünür.',
    'Sonuçları başka bir yerde kullanacaksanız "Sonucu kopyala" düğmesiyle tüm satırları panoya alın.',
  ],
  sections: [
    { h: 'Feet nedir?', p: [
      'Feet, İngiliz-Amerikan ölçü sisteminin temel uzunluk birimlerinden biridir. Tekil hâli "foot", çoğulu "feet" olan birim Türkçede "ayak" ya da kısaca "fit" olarak da anılır; simgesi <strong>ft</strong> ya da tek tırnak işaretidir (′). Bir feet 12 inçe bölünür, üç feet ise bir yarda eder.',
      '1959 yılında İngilizce konuşan ülkeler arasında varılan anlaşmayla yarda tam olarak 0,9144 metre kabul edilmiş, buna bağlı olarak feet de <strong>tam olarak 0,3048 metre</strong> olmuştur. Yani metre ile feet arasındaki oran ölçümle bulunan yaklaşık bir sayı değil, tanımdır. Bu yüzden çeviride belirsizlik yoktur; fark yalnızca sonucu kaç basamağa yuvarladığınızdan doğar.',
    ] },
    { h: 'Metre feet çevirme formülü', p: [
      'Feetten metreye geçmek için değeri 0,3048 ile çarparsınız: <strong>metre = feet × 0,3048</strong>. Metreden feete geçmek için aynı sayıya bölersiniz: <strong>feet = metre ÷ 0,3048</strong>. Bölme yerine çarpma tercih edenler için 1 metre yaklaşık 3,28084 feettir.',
      'Kafadan hızlı tahmin için metreyi 3 ile çarpıp sonuca yüzde 10 eklemek işe yarar: 20 metre için 60 + 6 = 66 feet bulursunuz, gerçek değer 65,62 feettir. Tersine feeti 3\'e bölüp yüzde 10 düşmek de yaklaşık metreyi verir. Sipariş, proje ve resmî belge gibi kesinlik gereken işlerde tahmin yerine tam hesabı kullanın.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 – Uçuş irtifası:</strong> Pilot anonsunda 10.000 feet irtifada olunduğu söyleniyor. 10.000 × 0,3048 = 3.048 metre. Araca 10000 yazıp "Feet → Metre" seçtiğinizde ilk satırda 3.048 m görürsünüz.',
      '<strong>Örnek 2 – Bir metrenin karşılığı:</strong> 1 ÷ 0,3048 = 3,2808 feet. Bu değerin tam kısmı 3 feettir; kalan 0,2808 feet 12 ile çarpılınca 3,37 inç eder. Dolayısıyla 1 metre "3 ft 3,37 inç" olarak da yazılabilir; toplam inç karşılığı 39,37 inçtir.',
      '<strong>Örnek 3 – Boy ölçüsü:</strong> 1,80 metre 5,9055 feet eder. Ancak bu "5 feet 9 inç" demek değildir; ondalık kısım inç değil, feetin ondalığıdır. Doğru gösterim 5 ft 10,87 inçtir. Araç bu ayrımı sizin yerinize yapar ve iki gösterimi ayrı satırlarda verir.',
    ] },
    { h: 'Feet nerelerde karşınıza çıkar?', ul: [
      '<strong>Havacılık:</strong> Dünyanın büyük bölümünde uçuş irtifaları feet ile ifade edilir; yolcu uçaklarının seyir irtifası olarak duyduğunuz 35.000 feet, 10.668 metreye karşılık gelir.',
      '<strong>Denizcilik:</strong> Tekne ve yat boyları ilanlarda çoğunlukla feet ile verilir. 40 feet bir tekne 12,19 metre boyundadır; marina bağlama ücretleri boy üzerinden hesaplandığı için metre karşılığını bilmek önemlidir.',
      '<strong>Konteyner taşımacılığı:</strong> Standart konteynerler 20 feet ve 40 feet olarak adlandırılır; bu adlar dış uzunluğu anlatır (yaklaşık 6,1 m ve 12,2 m).',
      '<strong>Dalış ve dağcılık:</strong> Yabancı kaynaklı dalış bilgisayarları, haritalar ve rehber kitaplar derinlik ve rakımı feet olarak verebilir.',
      '<strong>Yurt dışı emlak ve ürün ilanları:</strong> Tavan yüksekliği, oda ölçüsü, halı, merdiven ve kablo uzunlukları feet ile yazılır.',
      '<strong>Spor:</strong> Basketbolda pota yüksekliği 10 feet, yani 3,048 metredir.',
    ] },
    { h: 'Hızlı başvuru tablosu', ul: [
      '<strong>1 ft</strong> = 0,3048 m = 30,48 cm',
      '<strong>3 ft</strong> = 0,9144 m (1 yarda)',
      '<strong>6 ft</strong> = 1,8288 m',
      '<strong>10 ft</strong> = 3,048 m',
      '<strong>50 ft</strong> = 15,24 m',
      '<strong>100 ft</strong> = 30,48 m',
      '<strong>1.000 ft</strong> = 304,8 m',
      '<strong>1 m</strong> = 3,2808 ft',
      '<strong>5 m</strong> = 16,4042 ft',
      '<strong>100 m</strong> = 328,084 ft',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'En yaygın hata, ondalıklı feet değerini feet-inç gibi okumaktır. 5,5 feet, 5 feet 5 inç değil 5 feet 6 inçtir; çünkü yarım feet 6 inç eder. Bir başka hata, feet ile feetkareyi karıştırmaktır: alan ölçüsünde çarpan 0,3048 değil bunun karesi olan 0,0929\'dur. Bir odanın alanını çevirirken uzunluk çeviricisini değil alan çeviricisini kullanmalısınız.',
      'ABD\'de arazi ölçümünde uzun yıllar kullanılan "survey foot" adlı birim, uluslararası feetten milyonda iki kadar farklıdır. Gündelik işlerde bu fark görünmez; yalnızca çok uzun mesafeli jeodezik çalışmalarda anlam taşır. Bu araç uluslararası feeti kullanır.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Araç negatif değer kabul etmez. Sonuçlar dört ondalık basamağa kadar gösterilir; bu, bir milimetrenin altında bir duyarlılıktır. Havacılık, dalış planlaması ya da yapı projesi gibi güvenliği ilgilendiren işlerde çeviri sonucu yalnızca bilgilendirme amaçlıdır; resmî cihaz, harita ve proje değerlerini esas alın.',
    ] },
  ],
  faq: [
    ['1 feet kaç metredir?', '1 feet tam olarak 0,3048 metredir. Santimetre olarak 30,48 cm, inç olarak 12 inç eder. Bu değer uluslararası anlaşmayla belirlenmiş tanımdır, yaklaşık bir ölçüm sonucu değildir.'],
    ['1 metre kaç feettir?', '1 metre yaklaşık 3,2808 feettir. Feet ve inç olarak yazıldığında 3 ft 3,37 inç eder. Hesap 1 ÷ 0,3048 işlemiyle yapılır.'],
    ['10.000 feet kaç metre eder?', '10.000 feet 3.048 metredir. Benzer şekilde 30.000 feet 9.144 metre, 35.000 feet 10.668 metre eder.'],
    ['Feet, fit ve ayak aynı birim midir?', 'Evet. "Foot" sözcüğünün çoğulu "feet"tir; Türkçede okunduğu gibi "fit" yazıldığı da olur, "ayak" ise birimin Türkçe karşılığıdır. Hepsi 0,3048 metrelik aynı birimi anlatır.'],
    ['5,9 feet ile 5 feet 9 inç aynı mıdır?', 'Hayır. 5,9 feet ondalık gösterimdir ve 5 feet 10,8 inçe karşılık gelir. 5 feet 9 inç ise 5,75 feettir. Aradaki fark yaklaşık 4,6 santimetredir; bu yüzden sonuç kutusundaki "Feet ve inç" satırına bakmak gerekir.'],
    ['Feet simgesi nasıl yazılır?', 'Feet "ft" kısaltmasıyla ya da sayıdan sonra tek tırnak işaretiyle (′) gösterilir. İnç için çift tırnak (″) kullanılır; 6′2″ yazımı 6 feet 2 inç anlamına gelir.'],
    ['Feetkareyi bu araçla çevirebilir miyim?', 'Hayır, bu araç uzunluk çevirir. Alan için çarpan farklıdır: 1 feetkare 0,092903 metrekaredir. Alan çevirisi için metrekare feetkare çeviricisini kullanın.'],
    ['Yazdığım değerler kaydediliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; girdiğiniz sayı hiçbir sunucuya gönderilmez ve saklanmaz. Sayfa açıldıktan sonra bağlantı olmadan da çalışmaya devam eder.'],
  ],
  related: ['cm-inc-cevir', 'metre-yarda-cevir', 'boy-feet-cm-cevir', 'metrekare-feetkare-cevir', 'km-mil-cevir', 'birim-donustur'],
};
