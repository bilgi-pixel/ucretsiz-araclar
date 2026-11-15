export default {
  slug: 'fersah-km-cevir',
  title: 'Fersah Kilometre Çevirici',
  h1Tail: 'fersah ↔ km',
  pageTitle: 'Fersah Kaç Kilometre? Fersah Kilometre Çevirici',
  description: 'Fersahı kilometreye, kilometreyi fersaha çevirin. Osmanlı fersahı, metrik fersah, deniz fersahı ve lig için ayrı hesap yapar; mil karşılığını ve yürüyüş süresini verir.',
  card: 'Fersahı kilometreye çevirin: Osmanlı fersahı, deniz fersahı ve lig seçenekleriyle, mil karşılığı ve yaya yürüyüş süresiyle.',
  category: 'birim',
  keywords: ['fersah kaç km', '1 fersah kaç kilometre', 'fersah fersah ne demek', 'deniz fersahı kaç km', 'yirmi bin fersah kaç km', 'fersah kilometre çevirme', 'lig kaç km', 'eski mesafe ölçüleri'],
  lead: 'Masallarda, seyahatnamelerde ve "fersah fersah" deyiminde geçen fersahın bugünkü karşılığını hesaplayın. Fersah, kabaca bir saatlik yürüyüş mesafesini anlatan eski bir yol ölçüsüdür; <strong>Osmanlı fersahı yaklaşık 5,685 km</strong> kabul edilir. Araç, çevirilerde fersah diye karşılanan deniz fersahı ve lig ölçülerini de ayrı seçenekler olarak sunar.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 3' },
    { id: 'birim', label: 'Girilen değerin birimi', type: 'select', options: [
      ['osmanli', 'Osmanlı fersahı (5,685 km)'],
      ['metrik', 'Metrik fersah (6 km)'],
      ['deniz', 'Deniz fersahı (3 deniz mili = 5,556 km)'],
      ['lig', 'Kara ligi (3 mil = 4,828 km)'],
      ['lieue', 'Fransız metrik ligi (4 km)'],
      ['km', 'Kilometre'],
    ] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const kat = { osmanli: 5.685, metrik: 6, deniz: 5.556, lig: 4.828032, lieue: 4, km: 1 };
    const k = kat[v.birim];
    if (!k) h.err('Listeden geçerli bir birim seçin.');
    const km = x * k;
    const dkTop = Math.round((km / 5) * 60);
    const saat = Math.floor(dkTop / 60);
    const dk = dkTop % 60;
    const sure = saat ? `${h.fmt(saat, 0)} saat ${dk} dk` : `${dk} dk`;
    const rows = [];
    if (v.birim === 'km') {
      rows.push(['Osmanlı fersahı', h.fmt(km / kat.osmanli, 4) + ' fersah']);
      rows.push(['Metrik fersah', h.fmt(km / kat.metrik, 4) + ' fersah']);
      rows.push(['Deniz fersahı', h.fmt(km / kat.deniz, 4) + ' fersah']);
      rows.push(['Kara ligi', h.fmt(km / kat.lig, 4) + ' lig']);
      rows.push(['Fransız metrik ligi', h.fmt(km / kat.lieue, 4) + ' lig']);
    } else {
      rows.push(['Kilometre', h.fmt(km, 4) + ' km']);
    }
    rows.push(['Metre', h.fmt(km * 1000, 1) + ' m']);
    rows.push(['Kara mili', h.fmt(km / 1.609344, 4) + ' mil']);
    rows.push(['Deniz mili', h.fmt(km / 1.852, 4) + ' deniz mili']);
    rows.push(['Yaya yürüyüş süresi (5 km/saat)', sure]);
    return {
      rows,
      note: 'Fersah tarih boyunca bölgeye göre değişmiş bir ölçüdür; buradaki katsayılar yaygın kabul gören yaklaşık değerlerdir. Yürüyüş süresi düz yolda mola vermeden 5 km/saat hız varsayar.',
    };
  },
  cases: [
    { in: { deger: '1', birim: 'osmanli' }, out: { 'Kilometre': '5,685 km', 'Metre': '5.685 m', 'Kara mili': '3,5325 mil', 'Yaya yürüyüş süresi (5 km/saat)': '1 saat 8 dk' } },
    { in: { deger: '10', birim: 'km' }, out: { 'Osmanlı fersahı': '1,759 fersah', 'Metrik fersah': '1,6667 fersah', 'Fransız metrik ligi': '2,5 lig', 'Yaya yürüyüş süresi (5 km/saat)': '2 saat 0 dk' } },
    { in: { deger: '3', birim: 'osmanli' }, out: { 'Kilometre': '17,055 km' } },
    { in: { deger: '1', birim: 'deniz' }, out: { 'Kilometre': '5,556 km', 'Deniz mili': '3 deniz mili' } },
    { in: { deger: '1', birim: 'lig' }, out: { 'Kilometre': '4,828 km', 'Kara mili': '3 mil' } },
    { in: { deger: '20000', birim: 'lieue' }, out: { 'Kilometre': '80.000 km' } },
    { in: { deger: '7', birim: 'metrik' }, out: { 'Kilometre': '42 km', 'Yaya yürüyüş süresi (5 km/saat)': '8 saat 24 dk' } },
    { in: { deger: '0', birim: 'osmanli' }, out: { 'Kilometre': '0 km', 'Yaya yürüyüş süresi (5 km/saat)': '0 dk' } },
    { in: { deger: 'çok', birim: 'osmanli' }, error: true },
    { in: { deger: '-1', birim: 'km' }, error: true },
  ],
  howto: [
    '"Değer" alanına fersah ya da kilometre cinsinden mesafeyi yazın.',
    '"Girilen değerin birimi" listesinden kaynağınıza uygun ölçüyü seçin: Osmanlı ve Anadolu metinleri için Osmanlı fersahı, denizcilik için deniz fersahı, Batı dillerinden çevrilmiş kitaplar için lig seçenekleri.',
    '"Çevir" düğmesine basın; kilometre, metre, kara mili ve deniz mili karşılıkları listelenir.',
    'Kilometreden çevirirken aynı mesafenin beş farklı fersah ve lig türündeki karşılığını yan yana görürsünüz.',
    'Son satırdaki yürüyüş süresi, mesafenin eski yolcular için ne anlama geldiğini kavramanıza yardımcı olur.',
  ],
  sections: [
    { h: 'Fersah nedir?', p: [
      'Fersah, Farsça <em>ferseng</em> sözcüğünden gelen çok eski bir yol ölçüsüdür. Kökeni Eski İran\'a uzanır; bir yayanın ya da kervanın yaklaşık bir saatte aldığı yol olarak tanımlanmıştır. Bu yüzden başlangıçta bir uzunluk biriminden çok bir zaman-mesafe ölçüsüdür: iki konak arasının kaç fersah olduğu, yolcuya o yolun kaç saat süreceğini söylerdi.',
      'İslam coğrafyasında ve Osmanlı\'da fersah üç mil olarak hesaplanmış, Osmanlı ölçü sisteminde yaklaşık 7.500 mimar arşınına, yani <strong>5,685 kilometre</strong> dolayında bir uzunluğa karşılık gelmiştir. Metrik sisteme geçişle birlikte resmî kullanımdan kalkmış, ancak dilde ve edebiyatta yaşamayı sürdürmüştür.',
    ] },
    { h: 'Hangi fersah? Seçeneklerin anlamı', ul: [
      '<strong>Osmanlı fersahı (5,685 km):</strong> Osmanlı dönemi seyahatnameleri, menzil kayıtları ve Anadolu sözlü kültüründeki fersah için kullanın.',
      '<strong>Metrik fersah (6 km):</strong> İran\'da metrik sisteme uyarlanmış fersengin yuvarlak değeridir; yakın dönem İran kaynaklarında karşınıza çıkar.',
      '<strong>Deniz fersahı (5,556 km):</strong> Denizcilikte üç deniz miline eşit olan ölçüdür. Bir deniz mili 1,852 km olduğundan 3 × 1,852 = 5,556 km eder.',
      '<strong>Kara ligi (4,828 km):</strong> İngilizce metinlerdeki "league" ölçüsüdür ve üç kara miline eşittir. Türkçe çevirilerde çoğu zaman fersah diye karşılanır.',
      '<strong>Fransız metrik ligi (4 km):</strong> Fransızca "lieue" ölçüsünün metrik biçimidir. On dokuzuncu yüzyıl Fransız romanlarının çevirilerinde geçen fersah genellikle budur.',
    ] },
    { h: 'Formül ve çözümlü örnekler', p: [
      'Hesap tek çarpmadır: <strong>kilometre = fersah × katsayı</strong>. Tersine <strong>fersah = kilometre ÷ katsayı</strong>.',
      '<strong>Örnek 1:</strong> Bir seyahatnamede iki kasaba arasının 3 fersah olduğu yazıyor. Osmanlı fersahıyla 3 × 5,685 = 17,055 km eder. Saatte 5 km yürüyen bir yolcu bu mesafeyi yaklaşık üç buçuk saatte alır.',
      '<strong>Örnek 2:</strong> 10 kilometrelik bir yol kaç fersahtır? 10 ÷ 5,685 = 1,759 Osmanlı fersahı; metrik fersahla 10 ÷ 6 = 1,6667 fersah. Yürüyerek tam 2 saat sürer.',
      '<strong>Örnek 3:</strong> Ünlü bir macera romanının başlığındaki "yirmi bin fersah" kaç kilometredir? Roman Fransızca yazıldığı için ölçü metrik ligdir: 20.000 × 4 = 80.000 km. Bu, Dünya\'nın çevresinin yaklaşık iki katıdır; yani başlık denizaltının indiği derinliği değil, deniz altında kat ettiği toplam yolu anlatır.',
    ] },
    { h: 'Fersah ve bir saatlik yol', p: [
      'Fersahın farklı bölgelerde farklı uzunluklarda olmasının nedeni tanımının yürüyüşe dayanmasıdır. Düz ovada bir saatte alınan yol ile dağlık arazide alınan yol aynı değildir; kervanın yükü, hayvanın cinsi ve yolun durumu da sonucu değiştirir. Bu yüzden bazı kaynaklarda fersah 5 kilometrenin biraz altında, bazılarında 6 kilometrenin üstünde verilir.',
      'Araç her çeviride "yaya yürüyüş süresi" satırını da gösterir. Bir Osmanlı fersahı için bu süre 1 saat 8 dakika çıkar; çünkü 5,685 km\'yi 5 km/saat hızla yürümek 68 dakika alır. Bu küçük fark, fersahın "bir saatlik yol" tanımıyla ne kadar örtüştüğünü de gösterir.',
    ] },
    { h: 'Dilde ve edebiyatta fersah', p: [
      'Günümüz Türkçesinde fersah en çok "fersah fersah" ikilemesiyle kullanılır. "Ondan fersah fersah üstün" dendiğinde arada çok büyük bir fark olduğu anlatılır. Masallardaki "az gittik, uz gittik" anlatımının yanında "yedi fersah öteden" gibi kalıplar da uzaklığı vurgular. Divan şiirinde, halk hikâyelerinde ve eski coğrafya kitaplarında şehirler arası mesafeler fersahla verilir.',
      'Tarih ve edebiyat öğrencileri için pratik bir kural şudur: metnin hangi dilde ve hangi dönemde yazıldığına bakın. Osmanlıca ya da Farsça asıllı bir metinse beş buçuk ile altı kilometre arası bir değer, Batı dillerinden çeviriyse dört ile beş buçuk kilometre arası bir değer beklenir.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      'Çeviri kitaplardaki fersahı Osmanlı fersahı saymak. Özgün metindeki birim lig ise sonuç yüzde kırka varan oranda farklı çıkar.',
      'Deniz fersahı ile deniz milini karıştırmak. Bir deniz fersahı üç deniz milidir.',
      'Fersahı kesin bir ölçü gibi kullanmak. Tarihî metinlerdeki mesafeler çoğunlukla tahminidir; hesapladığınız kilometre değeri bir yaklaşım olarak okunmalıdır.',
      'Yürüyüş süresini gerçek seyahat süresi sanmak. Hesap mola, eğim ve yol koşullarını içermez.',
    ] },
  ],
  faq: [
    ['1 fersah kaç kilometredir?', 'Osmanlı fersahı yaklaşık 5,685 kilometredir. Metrik fersah 6 km, deniz fersahı 5,556 km kabul edilir. Batı dillerindeki lig ölçüsü ise 4 ile 4,83 km arasındadır.'],
    ['1 kilometre kaç fersahtır?', 'Osmanlı fersahıyla 1 kilometre yaklaşık 0,1759 fersah eder. Başka bir deyişle bir fersahlık yol için yaklaşık 5,7 kilometre yürümek gerekir.'],
    ['"Fersah fersah" ne demek?', 'Çok büyük bir farkı, uzaklığı ya da üstünlüğü anlatan bir ikilemedir. "Fersah fersah geride kaldı" denildiğinde arada kapatılması güç bir mesafe olduğu kastedilir.'],
    ['Deniz fersahı kaç deniz milidir?', 'Bir deniz fersahı üç deniz miline eşittir. Bir deniz mili 1,852 km olduğundan deniz fersahı 5,556 km eder.'],
    ['Yirmi bin fersah kaç kilometre eder?', 'Romanın özgün dilindeki metrik lig 4 km alınırsa 20.000 fersah 80.000 km eder. Osmanlı fersahıyla hesaplanırsa 113.700 km çıkar; ancak eser için doğru olan ilk değerdir.'],
    ['Fersah ile mil arasındaki ilişki nedir?', 'Geleneksel tanımda bir fersah üç mildir. Ancak buradaki mil, bugünkü 1,609 km\'lik kara mili değil, dönemin kendi milidir. Bugünkü kara miliyle bir Osmanlı fersahı yaklaşık 3,53 mil eder.'],
    ['Fersah bugün kullanılıyor mu?', 'Resmî ölçü olarak kullanılmaz. Türkiye\'de mesafeler kilometreyle ölçülür. Fersah yalnızca deyimlerde, edebî metinlerde ve tarih araştırmalarında karşımıza çıkar.'],
    ['Yazdığım değer bir yere kaydediliyor mu?', 'Hayır. Çeviri tümüyle tarayıcınızda yapılır; girdiğiniz sayı sunucuya gönderilmez ve saklanmaz. Sayfa açıldıktan sonra çevrimdışı da çalışır.'],
  ],
  related: ['arsin-metre-cevir', 'karis-cm-cevir', 'km-mil-cevir', 'deniz-mili-km-cevir', 'hiz-hesapla', 'birim-donustur'],
};
