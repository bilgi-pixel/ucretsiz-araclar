export default {
  slug: 'amortisman-hesapla',
  title: 'Amortisman Hesaplama',
  h1Tail: 'normal ve azalan bakiyeler',
  pageTitle: 'Amortisman Hesaplama – Normal ve Azalan Bakiyeler Yöntemi',
  description: 'Sabit kıymetin maliyetini ve faydalı ömrünü yazın; normal ya da azalan bakiyeler yöntemiyle yıllık amortismanı, oranı ve yıl yıl amortisman tablosunu görün.',
  card: 'Demirbaş, makine ve taşıtlar için normal ya da azalan bakiyeler yöntemiyle yıllık amortisman tablosu çıkarın.',
  category: 'finans',
  keywords: ['amortisman hesaplama', 'normal amortisman', 'azalan bakiyeler yöntemi', 'amortisman oranı', 'amortisman tablosu', 'demirbaş amortisman hesaplama', 'yıllık amortisman tutarı', 'net defter değeri'],
  lead: 'İşletmeye alınan bir sabit kıymetin maliyet bedelini ve faydalı ömrünü girin; araç seçtiğiniz yönteme göre <strong>her yılın amortisman tutarını</strong>, birikmiş amortismanı ve net defter değerini tablo hâlinde verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'maliyet', label: 'Maliyet bedeli (TL)', type: 'number', placeholder: 'Örn. 100000' },
    { id: 'omur', label: 'Faydalı ömür (yıl)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'yontem', label: 'Amortisman yöntemi', type: 'select', options: [['normal', 'Normal (eşit tutarlı) amortisman'], ['azalan', 'Azalan bakiyeler yöntemi']] },
  ],
  compute(v, h) {
    const maliyet = h.pos(v.maliyet, 'Maliyet bedeli');
    const omur = h.posint(v.omur, 'Faydalı ömür');
    if (omur > 100) h.err('"Faydalı ömür" en fazla 100 yıl olabilir.');
    const azalan = v.yontem === 'azalan';
    const normalOran = 1 / omur;
    const oran = azalan ? Math.min(2 * normalOran, 0.5) : normalOran;
    const yillar = [];
    let kalan = maliyet;
    let birikmis = 0;
    for (let y = 1; y <= omur; y++) {
      let a;
      if (y === omur) a = kalan;
      else if (azalan) a = kalan * oran;
      else a = maliyet * normalOran;
      birikmis += a;
      kalan -= a;
      if (Math.abs(kalan) < 1e-7) kalan = 0;
      yillar.push([y, a, birikmis, kalan]);
    }
    const ilk = yillar[0][1];
    const son = yillar[omur - 1][1];
    const text = yillar.map(([y, a, b, k]) => `${y}. yıl: amortisman ${h.para(a)} | birikmiş ${h.para(b)} | net defter değeri ${h.para(k)}`).join('\n');
    const gosterOran = azalan && omur === 1 ? 1 : oran;
    return {
      rows: [
        ['İlk yıl amortismanı', h.para(ilk)],
        ['Amortisman oranı', '%' + h.fmt(gosterOran * 100, 2)],
        ['İlk yıl aylık karşılığı', h.para(ilk / 12)],
        ['Son yıl amortismanı', h.para(son)],
        ['Toplam amortisman', h.para(birikmis)],
        ['Yöntem', azalan ? 'Azalan bakiyeler' : 'Normal amortisman'],
      ],
      text,
      note: azalan
        ? 'Azalan bakiyelerde oran, normal oranın iki katıdır ve %50 ile sınırlanır; son yıl kalan değerin tamamı gider yazılır. Kıst amortisman uygulanmamıştır.'
        : 'Normal amortismanda her yıl maliyet bedelinin eşit bir payı gider yazılır. Kıst amortisman uygulanmamıştır.',
    };
  },
  cases: [
    { in: { maliyet: '100000', omur: '5', yontem: 'normal' }, out: { 'İlk yıl amortismanı': '20.000,00 TL', 'Amortisman oranı': '%20', 'İlk yıl aylık karşılığı': '1.666,67 TL', 'Son yıl amortismanı': '20.000,00 TL', 'Toplam amortisman': '100.000,00 TL' } },
    { in: { maliyet: '100000', omur: '5', yontem: 'azalan' }, out: { 'İlk yıl amortismanı': '40.000,00 TL', 'Amortisman oranı': '%40', 'Son yıl amortismanı': '12.960,00 TL', 'Toplam amortisman': '100.000,00 TL' }, text: '1. yıl: amortisman 40.000,00 TL | birikmiş 40.000,00 TL | net defter değeri 60.000,00 TL\n2. yıl: amortisman 24.000,00 TL | birikmiş 64.000,00 TL | net defter değeri 36.000,00 TL\n3. yıl: amortisman 14.400,00 TL | birikmiş 78.400,00 TL | net defter değeri 21.600,00 TL\n4. yıl: amortisman 8.640,00 TL | birikmiş 87.040,00 TL | net defter değeri 12.960,00 TL\n5. yıl: amortisman 12.960,00 TL | birikmiş 100.000,00 TL | net defter değeri 0,00 TL' },
    { in: { maliyet: '60000', omur: '4', yontem: 'normal' }, out: { 'İlk yıl amortismanı': '15.000,00 TL', 'Amortisman oranı': '%25', 'İlk yıl aylık karşılığı': '1.250,00 TL' } },
    { in: { maliyet: '60000', omur: '4', yontem: 'azalan' }, out: { 'İlk yıl amortismanı': '30.000,00 TL', 'Amortisman oranı': '%50', 'Son yıl amortismanı': '7.500,00 TL' } },
    { in: { maliyet: '10000', omur: '3', yontem: 'azalan' }, out: { 'İlk yıl amortismanı': '5.000,00 TL', 'Amortisman oranı': '%50', 'Son yıl amortismanı': '2.500,00 TL' }, textMatch: '^1\\. yıl: amortisman 5\\.000,00 TL[\\s\\S]*2\\. yıl: amortisman 2\\.500,00 TL[\\s\\S]*3\\. yıl: amortisman 2\\.500,00 TL' },
    { in: { maliyet: '120000', omur: '10', yontem: 'azalan' }, out: { 'İlk yıl amortismanı': '24.000,00 TL', 'Amortisman oranı': '%20', 'Son yıl amortismanı': '16.106,13 TL', 'Toplam amortisman': '120.000,00 TL' } },
    { in: { maliyet: '45000', omur: '3', yontem: 'normal' }, out: { 'İlk yıl amortismanı': '15.000,00 TL', 'Amortisman oranı': '%33,33', 'Toplam amortisman': '45.000,00 TL' } },
    { in: { maliyet: '100000', omur: '0', yontem: 'normal' }, error: true },
    { in: { maliyet: '100000', omur: '2,5', yontem: 'normal' }, error: true },
    { in: { maliyet: '-500', omur: '5', yontem: 'azalan' }, error: true },
  ],
  howto: [
    'Sabit kıymetin maliyet bedelini yazın. Bu tutar satın alma bedeline nakliye, montaj, gümrük gibi kıymeti kullanıma hazır hâle getiren giderlerin eklenmesiyle bulunur.',
    'Kıymetin faydalı ömrünü yıl olarak girin. Vergi uygulamasında faydalı ömürler Hazine ve Maliye Bakanlığı\'nın yayımladığı amortisman listesinden alınır.',
    'Yöntemi seçin: normal amortisman her yıl eşit tutar ayırır, azalan bakiyeler ilk yıllarda daha yüksek tutar ayırır.',
    '"Hesapla" düğmesine basın. Üstte ilk yıl tutarı ve oran, altındaki kutuda yıl yıl amortisman, birikmiş amortisman ve net defter değeri yer alır.',
  ],
  sections: [
    { h: 'Amortisman nedir?', p: [
      'Amortisman, işletmede bir yıldan uzun süre kullanılan ve zamanla yıpranan, aşınan ya da değer kaybeden varlıkların maliyetinin kullanım süresine yayılarak gider yazılmasıdır. Bir makineyi aldığınız yıl bedelinin tamamını gider göstermek o yılın kârını olduğundan düşük, sonraki yıllarınkini olduğundan yüksek gösterir; oysa makine beş yıl boyunca gelir üretmeye katkı sağlar. Amortisman, maliyeti bu yıllara paylaştırarak her dönemin sonucunu daha gerçekçi kılar.',
      'Binalar, makineler, taşıtlar, mobilya ve büro ekipmanı, bilgisayarlar ve yazılım gibi gayrimaddi haklar amortismana tabi tipik varlıklardır. Boş arsa ve araziler ise kullanılmakla yıpranmadıkları için kural olarak amortismana tabi tutulmaz.',
    ] },
    { h: 'Normal amortisman yöntemi', p: [
      'Normal (doğrusal, eşit tutarlı) yöntemde maliyet bedeli faydalı ömre bölünür ve her yıl aynı tutar gider yazılır. <strong>Yıllık amortisman = maliyet bedeli ÷ faydalı ömür</strong>; amortisman oranı ise <strong>1 ÷ faydalı ömür</strong> olur. Faydalı ömrü 5 yıl olan bir varlığın oranı %20, 4 yıl olanın %25, 10 yıl olanın %10\'dur.',
      'Örnek: 100.000 TL\'ye alınan ve faydalı ömrü 5 yıl olan bir makine için yıllık amortisman 100.000 ÷ 5 = <strong>20.000 TL</strong> olur. Bu tutarın aylık karşılığı 1.666,67 TL\'dir. Beş yılın sonunda birikmiş amortisman 100.000 TL\'ye ulaşır ve net defter değeri sıfırlanır.',
    ] },
    { h: 'Azalan bakiyeler yöntemi', p: [
      'Azalan bakiyeler yönteminde oran, normal amortisman oranının iki katı olarak uygulanır; ancak bu oran <strong>%50\'yi geçemez</strong>. Oran her yıl maliyet bedeline değil, o yılın başındaki kalan değere (maliyet eksi birikmiş amortisman) uygulanır. Böylece ilk yıllarda yüksek, sonraki yıllarda giderek azalan tutarlar ayrılır. Faydalı ömrün son yılında ise kalan değerin tamamı amortisman olarak yazılır.',
      'Aynı makineyi bu yöntemle hesaplayalım. Normal oran %20, azalan bakiyeler oranı %40\'tır:',
    ], ul: [
      '1. yıl: 100.000 × %40 = <strong>40.000 TL</strong>; kalan değer 60.000 TL',
      '2. yıl: 60.000 × %40 = <strong>24.000 TL</strong>; kalan değer 36.000 TL',
      '3. yıl: 36.000 × %40 = <strong>14.400 TL</strong>; kalan değer 21.600 TL',
      '4. yıl: 21.600 × %40 = <strong>8.640 TL</strong>; kalan değer 12.960 TL',
      '5. yıl: kalan değerin tamamı, <strong>12.960 TL</strong>; net defter değeri sıfır',
    ] },
    { h: 'Hangi yöntem ne zaman tercih edilir?', p: [
      'Toplam amortisman iki yöntemde de aynıdır: maliyet bedelinin tamamı. Fark, giderin yıllara dağılımındadır. Azalan bakiyeler yöntemi gideri öne çeker; bu da ilk yıllarda vergi matrahını düşürür ve vergi ödemesini ertelemiş olur. Teknolojisi hızla eskiyen bilgisayar, elektronik cihaz ve taşıt gibi varlıklarda ekonomik gerçeğe daha yakın bir dağılım sunar. Kârı istikrarlı göstermek isteyen ya da ilk yıllarda zaten zarar eden işletmeler için ise normal yöntem daha uygun olabilir.',
      'Vergi uygulamasında azalan bakiyeler yöntemini bilanço esasına göre defter tutan mükellefler seçebilir. Bir varlık için azalan bakiyelerle başlandıktan sonra normal yönteme geçilebilir, ancak normal yöntemle başlanan varlıkta azalan bakiyelere dönülemez. Yöntem seçiminin sonuçları işletmeden işletmeye değiştiği için kararı mali müşavirinizle birlikte verin.',
    ] },
    { h: 'Net defter değeri ve birikmiş amortisman', p: [
      'Birikmiş amortisman, varlığın alındığı tarihten bugüne kadar ayrılan amortismanların toplamıdır ve bilançoda varlığın maliyetinden indirilerek gösterilir. Aradaki fark <strong>net defter değeridir</strong>. Varlık satıldığında satış bedeli ile net defter değeri arasındaki fark kâr ya da zarar olarak kaydedilir. Net defter değeri piyasa değeri demek değildir; tamamen amorti edilmiş bir araç defterde sıfır görünürken ikinci el piyasasında hâlâ ciddi bir değer taşıyabilir.',
    ] },
    { h: 'Aracın kapsamadığı durumlar', ul: [
      '<strong>Kıst amortisman:</strong> Bazı varlıklarda (vergi uygulamasında binek otomobiller) ilk yıl amortismanı, varlığın alındığı aydan yıl sonuna kalan ay sayısıyla orantılı hesaplanır. Bu araç tam yıl üzerinden hesap yapar.',
      '<strong>Hurda (kalıntı) değer:</strong> Vergi uygulamasında maliyet bedelinin tamamı amorti edilir; araç da böyle hesaplar. Muhasebe standartlarına göre raporlama yapanlar kalıntı değeri maliyetten düşerek girebilir.',
      '<strong>Yeniden değerleme ve değer artırıcı harcamalar:</strong> Sonradan yapılan ve varlığın değerini artıran harcamalar ile yeniden değerleme işlemleri amortisman tutarını değiştirir; bunlar ayrıca hesaplanmalıdır.',
      '<strong>Doğrudan gider yazma sınırı:</strong> Değeri belirli bir tutarın altında kalan alet ve demirbaşlar doğrudan gider yazılabilir; bu sınır her yıl güncellendiği için güncel tutarı mali müşavirinizden öğrenin.',
    ] },
    { h: 'Uyarı', p: [
      'Bu hesaplama bilgilendirme amaçlıdır ve genel kuralı gösterir. Faydalı ömür tespiti, kıst uygulama, özel sektör düzenlemeleri ve beyanname hazırlığı için bir mali müşavire danışmanız gerekir.',
    ] },
  ],
  faq: [
    ['Amortisman oranı nasıl bulunur?', 'Normal yöntemde oran, 1\'in faydalı ömre bölünmesiyle bulunur: 5 yıl için %20, 10 yıl için %10. Azalan bakiyeler yönteminde bu oranın iki katı alınır, ancak oran %50\'yi geçemez.'],
    ['Azalan bakiyeler yönteminde son yıl neden farklı hesaplanıyor?', 'Oran her yıl kalan değere uygulandığı için kalan değer hiçbir zaman kendiliğinden sıfıra inmez. Bu yüzden faydalı ömrün son yılında kalan değerin tamamı amortisman olarak yazılır; örnekte 5. yılın tutarı 4. yıldan büyük çıkmasının nedeni budur.'],
    ['Faydalı ömrü 3 yıl olan bir varlıkta azalan bakiyeler oranı kaçtır?', 'Normal oran %33,33\'tür; iki katı %66,67 eder ama üst sınır nedeniyle %50 uygulanır. 10.000 TL\'lik bir varlıkta yıllar sırasıyla 5.000 TL, 2.500 TL ve 2.500 TL olur.'],
    ['İki yöntemde toplam amortisman farklı mı?', 'Hayır. Her iki yöntemde de faydalı ömür sonunda maliyet bedelinin tamamı gider yazılmış olur. Değişen yalnızca giderin yıllara dağılımıdır.'],
    ['Faydalı ömrü nereden öğrenirim?', 'Vergi uygulamasında faydalı ömürler Hazine ve Maliye Bakanlığı\'nın genel tebliğlerle yayımladığı amortisman listesinde varlık türüne göre belirlenmiştir. Varlığınızın listedeki karşılığını mali müşaviriniz tespit eder.'],
    ['Aylık amortisman nasıl hesaplanır?', 'Yıllık amortisman tutarı 12\'ye bölünür. Yıllık 20.000 TL amortisman, aylık 1.666,67 TL\'ye karşılık gelir. Araç ilk yıl için bu değeri ayrı bir satırda gösterir.'],
    ['Arsa için amortisman ayrılır mı?', 'Kural olarak hayır. Boş arsa ve araziler kullanılmakla yıpranmadığı için amortismana tabi değildir. Üzerindeki bina ise arsadan ayrı olarak amortismana tabi tutulur.'],
    ['Girdiğim tutarlar saklanıyor mu?', 'Hayır. Tablo tarayıcınızda hesaplanır; maliyet ve ömür bilgileri sunucuya gönderilmez, kaydedilmez.'],
  ],
  related: ['birim-maliyet-hesapla', 'kira-getirisi-hesapla', 'geri-odeme-suresi-hesapla', 'favok-hesapla', 'aktif-karlilik-hesapla'],
};
