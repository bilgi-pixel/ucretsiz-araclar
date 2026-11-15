export default {
  slug: 'karat-gram-cevir',
  title: 'Karat Gram Çevirici',
  h1Tail: 'ct ↔ g',
  pageTitle: 'Karat Gram Çevirici – 1 Karat Kaç Gram, Elmas ve Taş Ağırlığı',
  description: 'Karatı grama, gramı karata çevirin. 1 metrik karat = 0,2 gram = 200 miligram tanımını kullanır; miligram ve puan karşılığını da gösterir.',
  card: 'Elmas ve değerli taş ağırlığını karattan grama, gramdan karata çevirin; miligram ve puan karşılığıyla.',
  category: 'birim',
  keywords: ['karat gram çevirme', '1 karat kaç gram', 'gram karat hesaplama', 'elmas karat ağırlığı', 'pırlanta karat gram', 'karat miligram', 'ct gram dönüştürme'],
  lead: 'Değerli taşların ağırlık birimi olan karatı (<strong>ct</strong>) grama ya da gramı karata çevirin. Araç, dünya genelinde kullanılan metrik karat tanımını esas alır: <strong>1 karat = 0,2 gram = 200 miligram</strong>.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Ağırlık', type: 'number', placeholder: 'Örn. 0,5' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['ct', 'Karat → Gram'], ['g', 'Gram → Karat']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Ağırlık');
    const ct = v.yon === 'g' ? x * 5 : x;
    const g = v.yon === 'g' ? x : x / 5;
    const ana = v.yon === 'g'
      ? [['Karat', h.fmt(ct, 4) + ' ct'], ['Gram', h.fmt(g, 6) + ' g']]
      : [['Gram', h.fmt(g, 6) + ' g'], ['Karat', h.fmt(ct, 4) + ' ct']];
    return {
      rows: [
        ...ana,
        ['Miligram', h.fmt(ct * 200, 3) + ' mg'],
        ['Puan', h.fmt(ct * 100, 2) + ' puan'],
      ],
      note: '1 metrik karat = 0,2 g = 200 mg = 100 puan. Bu birim taş ağırlığıdır; altının saflığını gösteren ayar (karat) ile ilgisi yoktur.',
    };
  },
  cases: [
    { in: { deger: '1', yon: 'ct' }, out: { 'Gram': '0,2 g', 'Miligram': '200 mg', 'Puan': '100 puan' } },
    { in: { deger: '1', yon: 'g' }, out: { 'Karat': '5 ct', 'Miligram': '1.000 mg' } },
    { in: { deger: '0,5', yon: 'ct' }, out: { 'Gram': '0,1 g', 'Miligram': '100 mg', 'Puan': '50 puan' } },
    { in: { deger: '0,25', yon: 'ct' }, out: { 'Gram': '0,05 g', 'Puan': '25 puan' } },
    { in: { deger: '3106,75', yon: 'ct' }, out: { 'Gram': '621,35 g', 'Miligram': '621.350 mg' } },
    { in: { deger: '2,4', yon: 'g' }, out: { 'Karat': '12 ct', 'Puan': '1.200 puan' } },
    { in: { deger: '0', yon: 'ct' }, out: { 'Gram': '0 g' } },
    { in: { deger: 'yarım', yon: 'ct' }, error: true },
    { in: { deger: '-0,5', yon: 'g' }, error: true },
  ],
  howto: [
    '"Ağırlık" alanına taşın ağırlığını yazın. Karat değerleri çoğunlukla kesirlidir; 0,35 ya da 1,02 gibi değerleri virgülle girebilirsiniz.',
    '"Çeviri yönü" listesinden Karat → Gram ya da Gram → Karat seçeneğini belirleyin.',
    '"Çevir" düğmesine basın. İlk satır karşılık gelen ağırlığı verir.',
    'Sertifika ya da fatura ile karşılaştırma yaparken miligram ve puan satırlarına bakın; kuyumcular küçük taşları çoğu zaman puan ile söyler.',
  ],
  sections: [
    { h: 'Karat nedir?', p: [
      'Karat, elmas, yakut, safir, zümrüt ve inci gibi değerli taşların ağırlığını belirtmek için kullanılan birimdir. Simgesi <strong>ct</strong> biçiminde yazılır. Adının, tohumları eskiden terazilerde karşı ağırlık olarak kullanılan keçiboynuzu ağacından geldiği kabul edilir. Farklı ülkelerde uzun süre birbirinden biraz farklı karat değerleri kullanılmış, yirminci yüzyılın başında <strong>metrik karat</strong> kabul edilerek birim sabitlenmiştir: bir karat tam olarak 200 miligram, yani 0,2 gramdır.',
      'Bu tanım tam sayılarla ifade edildiği için çeviri son derece basittir ve yuvarlama hatası içermez. Bir gram beş karat eder; bir karat da beşte bir gramdır.',
    ] },
    { h: 'Karat ile ayar farkı: en sık yapılan karışıklık', p: [
      'Türkçede "karat" sözcüğü iki ayrı anlamda kullanılır ve bu sayfa yalnızca birincisiyle ilgilidir. Birincisi taş ağırlığıdır: 1 karatlık pırlanta, 0,2 gram gelen bir taştır. İkincisi altının saflık derecesidir; Türkçede buna doğru adıyla <strong>ayar</strong> denir ve 24 üzerinden ifade edilir. 14 ayar altın, 24 parçanın 14\'ünün saf altın olduğu bir alaşımdır ve bunun gramla doğrudan bir ilgisi yoktur.',
      'İngilizcede bu iki kavram çoğu zaman yazımla ayrılır: taş ağırlığı için "carat", altın saflığı için "karat" kullanılır. Yabancı bir sitede "18K" ya da "18 kt" görürseniz bu altının ayarıdır; "0.50 ct" görürseniz taşın ağırlığıdır. Bir yüzüğün toplam gramını taşın karatından hesaplayamazsınız; altın gövde ayrıca tartılır.',
    ] },
    { h: 'Çeviri formülü ve çözümlü örnekler', p: [
      'Karattan grama geçmek için değeri 0,2 ile çarpar ya da 5\'e bölersiniz: <strong>g = ct × 0,2</strong>. Gramdan karata geçmek için 5 ile çarparsınız: <strong>ct = g × 5</strong>. Miligram için karatı 200 ile çarpmak yeterlidir.',
      'Örnek 1: Yarım karatlık (0,5 ct) bir pırlanta 0,5 × 0,2 = 0,1 gram, yani 100 miligram gelir. Kuyumcu dilinde bu taş "50 puan"dır.',
      'Örnek 2: Hassas terazide 2,4 gram gelen bir taş 2,4 × 5 = 12 karattır.',
      'Örnek 3: Tarihin en ünlü ham elmaslarından Cullinan\'ın ağırlığı 3.106,75 karat olarak kaydedilmiştir. Bu, 3.106,75 × 0,2 = 621,35 gram eder; yani dünyanın en büyük ham elmaslarından biri bile bir kilogramın oldukça altındadır. Karatın ne kadar küçük bir birim olduğunu bu örnek iyi gösterir.',
    ] },
    { h: 'Puan nedir?', p: [
      'Bir karat 100 puana bölünür; puan, karatın yüzde biridir ve 2 miligrama eşittir. Küçük taşlarda ondalıklı karat söylemek yerine puan kullanmak daha pratiktir: 0,25 karat "25 puan", 0,10 karat "10 puan" olarak anılır. Tektaş yüzük ilanlarında gördüğünüz "30 puan pırlanta" ifadesi 0,30 karat, yani 0,06 gram demektir.',
      'Çok taşlı takılarda verilen değer çoğu zaman tek bir taşın değil, tüm taşların <strong>toplam karat ağırlığıdır</strong>. "Toplam 1 karat" yazan bir beştaş yüzükte her taş yaklaşık 20 puandır. Tek büyük taş ile aynı toplam ağırlıktaki birkaç küçük taşın değeri aynı değildir; karşılaştırma yaparken bu ayrıma dikkat edin.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>0,10 ct</strong> = 0,02 g = 20 mg = 10 puan',
      '<strong>0,25 ct</strong> = 0,05 g = 50 mg = 25 puan',
      '<strong>0,50 ct</strong> = 0,1 g = 100 mg = 50 puan',
      '<strong>0,75 ct</strong> = 0,15 g = 150 mg = 75 puan',
      '<strong>1 ct</strong> = 0,2 g = 200 mg',
      '<strong>2 ct</strong> = 0,4 g = 400 mg',
      '<strong>5 ct</strong> = 1 g',
      '<strong>10 ct</strong> = 2 g',
      '<strong>1 g</strong> = 5 ct',
      '<strong>10 g</strong> = 50 ct',
    ] },
    { h: 'Karat büyüklük değildir', p: [
      'Karat bir ağırlık ölçüsüdür, boyut ölçüsü değil. Aynı karattaki iki taş, kesim biçimine ve derinliğine göre yukarıdan bakıldığında farklı büyüklükte görünebilir. Ayrıca taşların yoğunluğu birbirinden farklıdır: aynı ağırlıktaki bir safir, elmastan daha yoğun olduğu için biraz daha küçük görünür. Bu nedenle milimetre cinsinden çapı karattan kesin olarak hesaplamak mümkün değildir; yalnızca belirli bir taş türü ve kesim için yaklaşık tablolar verilebilir.',
      'Bir taşın değeri de yalnızca ağırlığına bağlı değildir; renk, berraklık ve kesim kalitesi fiyatı büyük ölçüde belirler. Bu araç yalnızca ağırlık birimini çevirir; bir taşın değerini ya da gerçekliğini belirlemez.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Araç negatif değer kabul etmez. Sonuçlar gram için altı, karat için dört ondalık basamağa kadar gösterilir. Değerli taş alım satımında esas alınan değer, taşın sertifikasında ve yetkili bir kuyumcunun hassas terazisinde okunan ağırlıktır. Alım, satım ve yatırım kararlarında uzman bir gemolog ya da güvendiğiniz bir kuyumcudan görüş alın.',
    ] },
  ],
  faq: [
    ['1 karat kaç gramdır?', '1 karat tam olarak 0,2 gramdır, yani 200 miligram. Bu, dünya genelinde kullanılan metrik karat tanımıdır.'],
    ['1 gram kaç karattır?', '1 gram 5 karattır. 0,5 gram 2,5 karat, 10 gram 50 karat eder.'],
    ['Altındaki 14 karat ile pırlantadaki karat aynı mı?', 'Hayır. Altında söylenen değer saflık derecesidir ve Türkçede ayar olarak adlandırılır; 24 üzerinden hesaplanır. Pırlantada karat ise taşın ağırlığıdır. Bu araç yalnızca taş ağırlığını çevirir.'],
    ['50 puan pırlanta kaç karattır?', '50 puan 0,50 karattır, çünkü 1 karat 100 puandır. Ağırlığı 0,1 gram, yani 100 miligramdır.'],
    ['Karat taşın büyüklüğünü gösterir mi?', 'Doğrudan göstermez. Karat ağırlıktır; taşın yukarıdan görünen çapı kesime, derinliğe ve taşın yoğunluğuna göre değişir. Aynı karattaki iki taş farklı büyüklükte görünebilir.'],
    ['Toplam karat ağırlığı ne demek?', 'Birden fazla taş içeren takılarda tüm taşların ağırlıklarının toplamıdır. Örneğin toplam 0,60 karat yazan üç taşlı bir yüzükte taşlar ortalama 20 puan, yani 0,04 gramdır.'],
    ['İnci ve renkli taşlar da karatla mı tartılır?', 'Evet, yakut, safir, zümrüt gibi renkli taşlar karatla tartılır. İncilerde karatın yanında geleneksel olarak başka birimler de kullanılabildiği için satıcının hangi birimi kullandığını sormakta yarar vardır.'],
    ['Girdiğim bilgiler bir yere kaydediliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; yazdığınız değer sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['troy-ons-gram-cevir', 'gram-miligram-cevir', 'gram-ons-cevir', 'kg-gram-cevir', 'birim-donustur'],
};
