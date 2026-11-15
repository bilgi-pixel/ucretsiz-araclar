export default {
  slug: 'kantar-kg-cevir',
  title: 'Kantar ve Batman Kilogram Çevirici',
  h1Tail: 'kantar, batman ↔ kg',
  pageTitle: 'Kantar ve Batman Kaç Kilo? Kantar Batman Kilogram Çevirici',
  description: 'Kantar, batman, okka ve çekiyi kilograma çevirin. 1 kantar = 44 okka = 56,45 kg, 1 batman = 6 okka = 7,70 kg kabulüyle çalışır; ters yönde de hesaplar.',
  card: 'Eski ağırlık ölçüleri kantar, batman, okka ve çekiyi kilograma çevirin; kilogramın bu ölçülerdeki karşılığını da görün.',
  category: 'birim',
  keywords: ['kantar kaç kg', '1 kantar kaç kilo', 'batman kaç kg', '1 batman kaç kilo', 'çeki kaç kg', 'kantar okka', 'eski ağırlık ölçüleri', 'osmanlı ağırlık birimleri'],
  lead: 'Eski bir ticaret defterinde, köy anlatısında ya da tarih kitabında geçen kantar ve batman ölçülerini kilograma çevirin. Araç, Osmanlı ağırlık sisteminin temeli olan okkayı (1,282945 kg) esas alır: <strong>1 batman = 6 okka</strong>, <strong>1 kantar = 44 okka</strong>, <strong>1 çeki = 4 kantar</strong>.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 2' },
    { id: 'birim', label: 'Girilen değerin birimi', type: 'select', options: [['kantar', 'Kantar (44 okka)'], ['batman', 'Batman (6 okka)'], ['okka', 'Okka (400 dirhem)'], ['ceki', 'Çeki (4 kantar)'], ['kg', 'Kilogram']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const OKKA = 1.282945; // kg
    const okkaKat = { kantar: 44, batman: 6, okka: 1, ceki: 176 };
    let okka;
    if (v.birim === 'kg') okka = x / OKKA;
    else if (okkaKat[v.birim]) okka = x * okkaKat[v.birim];
    else h.err('Listeden geçerli bir birim seçin.');
    const kg = v.birim === 'kg' ? x : okka * OKKA;
    const s = {
      kg: ['Kilogram', h.fmt(kg, 4) + ' kg'],
      kantar: ['Kantar', h.fmt(okka / 44, 4) + ' kantar'],
      batman: ['Batman', h.fmt(okka / 6, 4) + ' batman'],
      okka: ['Okka', h.fmt(okka, 4) + ' okka'],
      ceki: ['Çeki', h.fmt(okka / 176, 4) + ' çeki'],
    };
    const sira = v.birim === 'kg' ? ['kantar', 'batman', 'okka', 'ceki'] : ['kg', 'kantar', 'batman', 'okka', 'ceki'];
    return {
      rows: sira.filter((k) => k !== v.birim).map((k) => s[k]),
      note: '1 okka = 1,282945 kg alınmıştır (İstanbul ölçüsü). Batman ve kantar bölgeden bölgeye farklı ağırlıklarda kullanılmıştır; yerel bir kaynağı okurken bunu göz önünde bulundurun.',
    };
  },
  cases: [
    { in: { deger: '1', birim: 'kantar' }, out: { 'Kilogram': '56,4496 kg', 'Okka': '44 okka', 'Batman': '7,3333 batman' } },
    { in: { deger: '1', birim: 'batman' }, out: { 'Kilogram': '7,6977 kg', 'Okka': '6 okka' } },
    { in: { deger: '100', birim: 'kg' }, out: { 'Kantar': '1,7715 kantar', 'Batman': '12,9909 batman', 'Okka': '77,9457 okka' } },
    { in: { deger: '1', birim: 'ceki' }, out: { 'Kilogram': '225,7983 kg', 'Kantar': '4 kantar', 'Okka': '176 okka' } },
    { in: { deger: '3', birim: 'kantar' }, out: { 'Kilogram': '169,3487 kg', 'Batman': '22 batman' } },
    { in: { deger: '10', birim: 'batman' }, out: { 'Kilogram': '76,9767 kg', 'Okka': '60 okka' } },
    { in: { deger: '1', birim: 'okka' }, out: { 'Kilogram': '1,2829 kg' } },
    { in: { deger: '0', birim: 'kantar' }, out: { 'Kilogram': '0 kg' } },
    { in: { deger: 'iki', birim: 'kantar' }, error: true },
    { in: { deger: '-4', birim: 'kg' }, error: true },
  ],
  howto: [
    '"Değer" alanına ağırlığı yazın; ondalık için virgül kullanabilirsiniz.',
    '"Girilen değerin birimi" listesinden kantar, batman, okka, çeki ya da kilogram seçin.',
    '"Çevir" düğmesine basın. Eski bir ölçü girdiyseniz ilk satırda kilogram karşılığı, kilogram girdiyseniz kantar karşılığı görünür.',
    'Alt satırlarda aynı ağırlığın diğer eski ölçülerdeki karşılıklarını karşılaştırın.',
    'Kaynağınız İstanbul dışındaki bir bölgeye aitse sonuç altındaki notu dikkate alın; yerel batman farklı olabilir.',
  ],
  sections: [
    { h: 'Kantar nedir?', p: [
      'Kantar sözcüğünün Türkçede iki anlamı vardır. Birincisi bir ağırlık birimidir: Osmanlı ölçü sisteminde 44 okkaya, yani yaklaşık <strong>56,45 kilograma</strong> eşittir. Odun, kömür, pamuk, yün, tahıl gibi dökme ve hacimli malların toptan ticaretinde kullanılmıştır. Gümrük kayıtlarında, narh defterlerinde ve liman belgelerinde yükler çoğunlukla kantar üzerinden yazılır.',
      'İkinci anlamı tartı aletidir. Bir ucunda kanca, kolunun üzerinde kaydırılan bir topuz bulunan el kantarı pazarlarda uzun yıllar kullanılmıştır. Bugün kamyonların tartıldığı büyük basküllere de "kantar" denir. "Kantarın topuzunu kaçırmak" deyimi, bu aletteki topuzun gereğinden fazla kaydırılmasından gelir ve ölçüyü aşmak anlamı taşır. Bu sayfa birim olan kantarla ilgilidir.',
    ] },
    { h: 'Batman nedir?', p: [
      'Batman, kantardan küçük, okkadan büyük bir ağırlık ölçüsüdür. İstanbul ölçüsünde 6 okka, yani yaklaşık <strong>7,70 kilogram</strong> kabul edilir. Ancak batman, eski ölçüler içinde bölgesel farkı en fazla olanlardan biridir: Anadolu\'nun farklı yörelerinde ve komşu coğrafyalarda iki okkadan sekiz okkaya kadar değişen batmanlar kullanılmıştır.',
      'Bu nedenle bir köy kaydında ya da yerel bir anlatıda geçen batmanı kilograma çevirirken, o yörenin batmanının kaç okka olduğunu araştırmak gerekir. Araç yaygın kabul gören altı okkalık değeri kullanır; farklı bir batman için değeri önce okkaya çevirip "Okka" seçeneğiyle hesaplayabilirsiniz.',
    ] },
    { h: 'Ağırlık ölçüleri merdiveni', p: [
      'Osmanlı ağırlık sistemi küçükten büyüğe birbirinin katı olan birimlerden oluşur. Hepsinin temelinde dirhem ve okka vardır:',
    ], ul: [
      '<strong>Dirhem:</strong> yaklaşık 3,207 gram; kuyumculuk ve eczacılıkta kullanılan küçük birim.',
      '<strong>Okka (kıyye):</strong> 400 dirhem = 1,282945 kg; gündelik alışverişin ana birimi.',
      '<strong>Batman:</strong> 6 okka = 7,69767 kg.',
      '<strong>Kantar:</strong> 44 okka = 56,44958 kg.',
      '<strong>Çeki:</strong> 4 kantar = 176 okka = 225,79832 kg; özellikle odun ve taş gibi ağır yüklerde.',
    ] },
    { h: 'Formül ve çözümlü örnekler', p: [
      'Çeviride önce değer okkaya, sonra kilograma çevrilir: <strong>kg = birim sayısı × okka katsayısı × 1,282945</strong>. Kantar için okka katsayısı 44, batman için 6, çeki için 176\'dır.',
      '<strong>Örnek 1:</strong> 3 kantar pamuk kaç kilodur? 3 × 44 = 132 okka; 132 × 1,282945 = 169,3487 kg. Aynı yük 132 ÷ 6 = 22 batman eder.',
      '<strong>Örnek 2:</strong> 10 batman buğday: 10 × 6 = 60 okka; 60 × 1,282945 = 76,9767 kg.',
      '<strong>Örnek 3:</strong> 100 kilogramlık bir çuval eski ölçülerle ne kadardır? 100 ÷ 1,282945 = 77,9457 okka. Bu da 77,9457 ÷ 44 = 1,7715 kantar ya da 77,9457 ÷ 6 = 12,9909 batman demektir.',
      '<strong>Örnek 4:</strong> Bir çeki odun 4 kantardır: 176 × 1,282945 = 225,7983 kg. Günümüzde bazı yörelerde odun satışında çeki, kolaylık olsun diye yuvarlak 250 kilogram olarak anılır; bu, tarihî ölçüyle aynı şey değildir.',
    ] },
    { h: 'Nerelerde karşınıza çıkar?', p: [
      'Kantar ve batman bugün resmî ölçü değildir, ancak geçmişe ait metinleri anlamak için gereklidir. Osmanlı dönemi fiyat listeleri, vergi kayıtları, tereke defterleri ve tüccar mektupları malları bu ölçülerle verir. Yerel tarih çalışan araştırmacılar, bir köyün yıllık buğday ya da pamuk üretimini bugünkü rakamlarla karşılaştırmak için bu çeviriye ihtiyaç duyar.',
      'Halk edebiyatında da izleri sürer: türkülerde, masallarda ve atasözlerinde ağırlık batmanla, okkayla anlatılır. Büyüklerin "eskiden yağı batmanla alırdık" gibi sözleri, bir hanenin yıllık erzağını toptan aldığı dönemlerin hatırasıdır. Bazı yörelerde tarla büyüklüğü bile "kaç batman tohum atılır" diye, ekilen tohumun ağırlığıyla tarif edilmiştir.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Kantarı 50 ya da 100 kilogram gibi yuvarlak bir sayı sanmak. Osmanlı kantarı 56,45 kg\'dır; başka ülkelerdeki benzer adlı ölçüler farklıdır.',
      'Batmanın her yerde aynı olduğunu varsaymak. Yöreye göre birkaç kat fark edebilir.',
      'Okkayı tam 1 kilogram kabul etmek. Okka kilogramdan yaklaşık yüzde 28 daha ağırdır; büyük miktarlarda fark ciddi boyuta ulaşır.',
      'Tartı aleti olan kantar ile birim olan kantarı karıştırmak. "Kantar fişi" bugün aracın kilogram cinsinden tartı belgesidir.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç tek bir standart değer kümesi kullanır. Tarihî ölçüler dönemden döneme ve bölgeden bölgeye değiştiği için sonuçları bilimsel çalışmada kullanırken hangi katsayıyı aldığınızı belirtin ve mümkünse dönemin kaynaklarıyla karşılaştırın. Günümüz ticaretinde kilogram ve ton dışındaki birimlerle tartı yapılmaz.',
    ] },
  ],
  faq: [
    ['1 kantar kaç kilogramdır?', 'Osmanlı ölçüsünde 1 kantar 44 okkadır ve yaklaşık 56,45 kilogram eder. Kesin değer 56,44958 kg olarak hesaplanır.'],
    ['1 batman kaç kilodur?', 'İstanbul ölçüsüyle 1 batman 6 okka, yani yaklaşık 7,70 kilogramdır. Ancak batman yöreye göre değişen bir ölçüdür; bazı bölgelerde daha hafif ya da daha ağır batmanlar kullanılmıştır.'],
    ['1 kantar kaç batman eder?', '1 kantar 44 okka, 1 batman 6 okka olduğundan 1 kantar 44 ÷ 6 = 7,3333 batman eder.'],
    ['Çeki kaç kilogramdır?', 'Tarihî ölçüde 1 çeki 4 kantar, yani 176 okkadır ve yaklaşık 225,8 kilogram eder. Günümüzde odun satışında kullanılan çeki ise çoğu yerde 250 kilogram olarak anılır.'],
    ['100 kilogram kaç kantar eder?', '100 kilogram yaklaşık 1,7715 kantardır. Aynı ağırlık 77,95 okka ya da yaklaşık 13 batman eder.'],
    ['Kantar ile kental aynı şey mi?', 'Hayır. Kental, metrik sistemde 100 kilogramlık bir birimdir ve tarım istatistiklerinde kullanılır. Osmanlı kantarı ise 56,45 kilogramdır. Adlar aynı kökten gelse de değerleri farklıdır.'],
    ['Batman ölçüsü bugün kullanılıyor mu?', 'Resmî olarak kullanılmaz; Türkiye\'de ağırlık kilogramla ölçülür. Batman yalnızca tarihî belgelerde, halk edebiyatında ve yaşlıların anlatılarında geçer.'],
    ['Girdiğim sayılar kaydediliyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; yazdığınız değer sunucuya gönderilmez ve saklanmaz. Sayfa internet bağlantısı kesilse de çalışmaya devam eder.'],
  ],
  related: ['okka-kg-cevir', 'dirhem-gram-cevir', 'ton-kg-cevir', 'kg-pound-cevir', 'arsin-metre-cevir', 'birim-donustur'],
};
