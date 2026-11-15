export default {
  slug: 'insaat-demiri-agirligi-hesapla',
  title: 'İnşaat Demiri Ağırlığı Hesaplama',
  h1Tail: 'çap, boy ve adetten kg',
  pageTitle: 'İnşaat Demiri Ağırlığı Hesaplama – Çapa Göre kg/m ve Toplam Tonaj',
  description: 'Nervürlü inşaat demirinin çapına, boyuna ve adedine göre metre ağırlığını, çubuk ağırlığını ve toplam tonajı hesaplayın. Kilogram fiyatıyla tutar da bulunur.',
  card: 'Demir çapı, boyu ve adedinden kg/m birim ağırlığı, toplam kilogramı, tonajı ve isterseniz tutarı hesaplayın.',
  category: 'insaat',
  keywords: ['inşaat demiri ağırlığı hesaplama', 'demir kg hesaplama', '12lik demir kaç kg', 'demir metre ağırlığı', '1 ton demir kaç adet', 'nervürlü demir ağırlık tablosu', 'demir tonaj hesabı'],
  lead: 'Demirin çapını, boyunu ve adedini yazın; araç çeliğin yoğunluğundan <strong>metre ağırlığını</strong>, bir çubuğun ağırlığını ve <strong>toplam kilogramı</strong> hesaplasın. Kilogram fiyatı girerseniz toplam tutarı da görürsünüz.',
  button: 'Hesapla',
  inputs: [
    { id: 'cap', label: 'Demir çapı (mm)', type: 'number', placeholder: 'Örn. 12' },
    { id: 'uzunluk', label: 'Çubuk boyu (m)', type: 'number', value: '12' },
    { id: 'adet', label: 'Adet', type: 'number', value: '1' },
    { id: 'fiyat', label: 'Kilogram fiyatı (TL)', type: 'number', placeholder: 'İsteğe bağlı', hint: 'Binlik ayraç kullanmayın ya da 1.500,00 biçiminde yazın.' },
  ],
  compute(v, h) {
    const d = h.pos(v.cap, 'Demir çapı');
    const L = h.pos(v.uzunluk, 'Çubuk boyu');
    const n = h.posint(v.adet, 'Adet');
    if (d < 4 || d > 60) h.err('Demir çapı milimetre olarak 4 ile 60 arasında olmalı (örn. 8, 12, 16).');
    const kesit = Math.PI / 4 * d * d;
    const birim = kesit * 7850 / 1e6;
    const cubuk = birim * L;
    const toplam = cubuk * n;
    const rows = [
      ['Toplam ağırlık', h.fmt(toplam, 2) + ' kg'],
      ['Birim ağırlık', h.fmt(birim, 3) + ' kg/m'],
      ['Bir çubuğun ağırlığı', h.fmt(cubuk, 2) + ' kg'],
      ['Toplam uzunluk', h.fmt(L * n, 2) + ' m'],
      ['Toplam (ton)', h.fmt(toplam / 1000, 3) + ' ton'],
      ['1 tondaki çubuk sayısı', h.fmt(Math.floor(1000 / cubuk + 1e-9), 0) + ' adet'],
      ['Kesit alanı', h.fmt(kesit, 1) + ' mm²'],
    ];
    if (String(v.fiyat ?? '').trim() !== '') {
      const f = h.nonneg(v.fiyat, 'Kilogram fiyatı');
      rows.push(['Tutar', h.para(toplam * f)]);
    }
    return { rows, note: 'Çelik yoğunluğu 7.850 kg/m³ alınmıştır. Kantar ağırlığı, üretim toleransı nedeniyle teorik değerden birkaç puan farklı olabilir.' };
  },
  cases: [
    { in: { cap: '12', uzunluk: '12', adet: '50' }, out: { 'Toplam ağırlık': '532,69 kg', 'Birim ağırlık': '0,888 kg/m', 'Bir çubuğun ağırlığı': '10,65 kg', 'Toplam uzunluk': '600 m', 'Toplam (ton)': '0,533 ton', '1 tondaki çubuk sayısı': '93 adet', 'Kesit alanı': '113,1 mm²' } },
    { in: { cap: '16', uzunluk: '12', adet: '100' }, out: { 'Toplam ağırlık': '1.894 kg', 'Birim ağırlık': '1,578 kg/m', 'Bir çubuğun ağırlığı': '18,94 kg', 'Toplam (ton)': '1,894 ton', '1 tondaki çubuk sayısı': '52 adet' } },
    { in: { cap: '8', uzunluk: '6', adet: '20' }, out: { 'Toplam ağırlık': '47,35 kg', 'Birim ağırlık': '0,395 kg/m', 'Bir çubuğun ağırlığı': '2,37 kg' } },
    { in: { cap: '10', uzunluk: '3,5', adet: '14' }, out: { 'Toplam ağırlık': '30,21 kg', 'Birim ağırlık': '0,617 kg/m', 'Toplam uzunluk': '49 m' } },
    { in: { cap: '20', uzunluk: '12', adet: '1' }, out: { 'Toplam ağırlık': '29,59 kg', 'Birim ağırlık': '2,466 kg/m', '1 tondaki çubuk sayısı': '33 adet' } },
    { in: { cap: '12', uzunluk: '12', adet: '50', fiyat: '25,5' }, out: { 'Toplam ağırlık': '532,69 kg', 'Tutar': '13.583,56 TL' } },
    { in: { cap: '0', uzunluk: '12', adet: '1' }, error: true },
    { in: { cap: '12', uzunluk: '12', adet: '1,5' }, error: true },
    { in: { cap: '120', uzunluk: '12', adet: '1' }, error: true },
  ],
  howto: [
    'Demirin anma çapını milimetre olarak yazın; piyasada "12\'lik", "16\'lık" diye anılan değer budur.',
    'Çubuk boyunu metre olarak girin. Fabrika çıkışı standart boy 12 metredir; kesilmiş parçalar için kendi ölçünüzü yazın.',
    'Kaç adet çubuk olduğunu belirtin.',
    'Tutarı da görmek istiyorsanız güncel kilogram fiyatını ekleyin.',
    '"Hesapla" düğmesine basın; birim ağırlık, toplam kilogram ve tonaj listelenir.',
  ],
  sections: [
    { h: 'Demir ağırlığı nasıl hesaplanır?', p: [
      'İnşaat demiri ağırlıkla satılır, ancak projede uzunluk ve adet olarak geçer. İkisi arasındaki köprü demirin <strong>birim ağırlığıdır</strong>, yani bir metresinin kaç kilogram geldiği. Bu değer, yuvarlak kesitin alanı ile çeliğin yoğunluğunun çarpımından bulunur: <strong>kg/m = (π ÷ 4) × d² × 7.850 ÷ 1.000.000</strong>. Burada d milimetre cinsinden çaptır ve 7.850 kg/m³ çeliğin yoğunluğudur.',
      'Sabitler birleştirildiğinde formül <strong>kg/m ≈ d² × 0,006165</strong> biçimini alır. Şantiyede akılda tutulan kısa yol da buradan gelir: <strong>kg/m ≈ d² ÷ 162</strong>. Örneğin 12 mm için 144 ÷ 162 ≈ 0,889 kg/m bulunur. Bu araç yuvarlatılmış sabit yerine tam formülü kullanır. Toplam ağırlık, birim ağırlığın çubuk boyu ve adetle çarpımıdır.',
    ] },
    { h: 'Çaplara göre birim ağırlık tablosu', p: [
      'Aşağıdaki değerler 7.850 kg/m³ yoğunlukla hesaplanmış teorik ağırlıklardır. İkinci değer 12 metrelik standart çubuğun ağırlığıdır.',
    ], ul: [
      '<strong>8 mm:</strong> 0,395 kg/m — 12 m çubuk 4,74 kg',
      '<strong>10 mm:</strong> 0,617 kg/m — 12 m çubuk 7,40 kg',
      '<strong>12 mm:</strong> 0,888 kg/m — 12 m çubuk 10,65 kg',
      '<strong>14 mm:</strong> 1,208 kg/m — 12 m çubuk 14,50 kg',
      '<strong>16 mm:</strong> 1,578 kg/m — 12 m çubuk 18,94 kg',
      '<strong>20 mm:</strong> 2,466 kg/m — 12 m çubuk 29,59 kg',
      '<strong>25 mm:</strong> 3,853 kg/m — 12 m çubuk 46,24 kg',
      '<strong>32 mm:</strong> 6,313 kg/m — 12 m çubuk 75,76 kg',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bir döşeme için 50 adet 12 mm çapında, 12 m boyunda demir alınacak olsun. Kesit alanı (π ÷ 4) × 12² = 113,1 mm² eder. Birim ağırlık 113,1 × 7.850 ÷ 1.000.000 = <strong>0,888 kg/m</strong> bulunur. Bir çubuk 0,888 × 12 = <strong>10,65 kg</strong> gelir. 50 çubuğun toplamı <strong>532,69 kg</strong>, yani yaklaşık 0,533 tondur.',
      'Tersinden bakarsak 1 ton 12\'lik demirde 1.000 ÷ 10,65 = 93 tam çubuk bulunur. Kilogram fiyatı 25,5 TL olarak girilirse tutar 532,69 × 25,5 = 13.583,56 TL çıkar. Fiyat yalnızca örnektir; demir fiyatları günlük değiştiğinden güncel değeri satıcınızdan alın.',
    ] },
    { h: 'Metrajdan siparişe', p: [
      'Statik projedeki donatı metrajı her çap için toplam uzunluğu ya da ağırlığı verir. Elinizde yalnızca uzunluk varsa çubuk boyuna toplam metreyi, adede 1 yazarak doğrudan ağırlığı bulabilirsiniz. Farklı çaplar için hesabı ayrı ayrı yapıp sonuçları toplayın.',
      'Demir 12 metrelik boylar halinde gelir ve projedeki parça boylarına kesilir. Kesim sırasında kullanılamayan kısa parçalar artar; ayrıca bindirme boyları, kancalar ve etriye kıvrımları metraja dahil edilmelidir. Uygulamada sipariş miktarına bu nedenle bir fire payı eklenir. Payın büyüklüğü kesim planına ve çap çeşitliliğine bağlıdır.',
    ] },
    { h: 'Teorik ağırlık ile kantar ağırlığı', p: [
      'Nervürlü demirin yüzeyindeki çıkıntılar ve üretim toleransları nedeniyle gerçek çubuk, anma çapına göre hesaplanan değerden biraz hafif ya da ağır gelebilir. Standartlar birim ağırlık için belirli bir tolerans aralığına izin verir. Satış kantar ağırlığı üzerinden yapıldığı için, adet sayarak yaptığınız hesapla irsaliye arasında küçük fark görmeniz olağandır. Büyük farklar ise çapın ya da boyun eksik olduğuna işaret edebilir; teslim alırken birkaç çubuğu ölçmek iyi bir alışkanlıktır.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Araç yalnızca dolu yuvarlak kesitli çelik çubukların ağırlığını hesaplar; hangi elemanda hangi çapta ve kaç adet donatı kullanılacağını belirlemez. Donatı seçimi, aralıkları ve bindirme boyları statik hesaba ve yürürlükteki deprem ile betonarme standartlarına göre bir inşaat mühendisi tarafından yapılır. Hasır çelik, profil ve boru için ilgili ağırlık araçlarını kullanın.',
    ] },
  ],
  faq: [
    ['12\'lik demirin metresi kaç kilogramdır?', '12 mm çaplı inşaat demirinin teorik birim ağırlığı 0,888 kg/m\'dir. 12 metrelik standart bir çubuk yaklaşık 10,65 kg gelir.'],
    ['1 ton demir kaç adet eder?', 'Çapa bağlıdır. 12 metrelik çubuklar için 1 tonda yaklaşık 211 adet 8\'lik, 135 adet 10\'luk, 93 adet 12\'lik, 68 adet 14\'lük, 52 adet 16\'lık ve 33 adet 20\'lik demir bulunur.'],
    ['d² ÷ 162 formülü nereden gelir?', 'Dairenin alanı ile çelik yoğunluğunun çarpımındaki sabitlerin sadeleştirilmesinden gelir: (π ÷ 4) × 7.850 ÷ 1.000.000 ≈ 0,006165 ve bunun tersi yaklaşık 162\'dir. Sonuç kg/m cinsindendir.'],
    ['16\'lık demirin 12 metresi kaç kilo?', 'Birim ağırlığı 1,578 kg/m olduğundan 12 metrelik çubuk 18,94 kg gelir. 100 çubuk 1.894 kg, yani yaklaşık 1,9 ton eder.'],
    ['Hesaplanan ağırlık neden irsaliyedekiyle birebir aynı değil?', 'Hesap anma çapına göre teorik değeri verir. Üretim toleransları ve nervür geometrisi nedeniyle kantar ağırlığı birkaç puan sapabilir; standartlar bu sapmaya belirli sınırlar içinde izin verir.'],
    ['Düz yuvarlak demir için de geçerli mi?', 'Evet. Formül dolu yuvarlak kesit içindir; düz yüzeyli çubuklarda teorik değer gerçeğe daha da yakındır. Paslanmaz çelik ya da alüminyum için yoğunluk farklı olduğundan sonuç geçerli olmaz.'],
    ['Fiyat alanını boş bırakabilir miyim?', 'Evet, isteğe bağlıdır. Boş bıraktığınızda yalnızca ağırlık ve uzunluk satırları gösterilir.'],
    ['Girdiğim metraj bilgileri bir yere gönderiliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; yazdığınız değerler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['profil-agirligi-hesapla', 'sac-agirligi-hesapla', 'boru-agirligi-hesapla', 'beton-hesapla', 'kolon-beton-hesapla'],
};
