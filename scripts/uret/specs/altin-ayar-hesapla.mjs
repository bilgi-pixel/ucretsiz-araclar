export default {
  slug: 'altin-ayar-hesapla',
  title: 'Altın Ayar ve Saflık Hesaplama',
  h1Tail: 'ayardan saflık ve has miktarı',
  pageTitle: 'Altın Ayar ve Saflık Hesaplama – Kaç Ayar Yüzde Kaç Saf Altın?',
  description: 'Altının ayarını yazın; saflık yüzdesini, milyem karşılığını, ürün ağırlığına göre içindeki saf altın gramını ve has altın fiyatına göre değerini hesaplayın.',
  card: 'Ayar değerinden saflık yüzdesini, milyemi ve gram girerseniz üründeki saf altın miktarını hesaplayın.',
  category: 'finans',
  keywords: ['altın ayar hesaplama', 'altın saflık hesaplama', '22 ayar altın saflık oranı', '14 ayar kaç milyem', '18 ayar altın yüzde kaç', 'ayar nedir', 'has altın hesaplama', 'saf altın miktarı'],
  lead: 'Bir altın ürünün ayarını yazın; araç, ürünün yüzde kaçının saf altın olduğunu ve milyem karşılığını gösterir. Ürünün ağırlığını da girerseniz içindeki <strong>saf (has) altın miktarını</strong>, gram has fiyatını eklerseniz bu altının değerini hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'ayar', label: 'Ayar', type: 'number', placeholder: 'Örn. 22', hint: '1 ile 24 arasında bir değer; 24 ayar saf altındır.' },
    { id: 'gram', label: 'Ürün ağırlığı (gram, isteğe bağlı)', type: 'number', placeholder: 'Örn. 10' },
    { id: 'fiyat', label: 'Gram has altın fiyatı (TL, isteğe bağlı)', type: 'number', placeholder: 'Güncel fiyatı yazın', hint: '24 ayar altının gram fiyatı. Araç fiyat bilgisi çekmez.' },
  ],
  compute(v, h) {
    const ayar = h.pos(v.ayar, 'Ayar');
    if (ayar > 24) h.err('"Ayar" en fazla 24 olabilir; 24 ayar saf altını ifade eder.');
    const bos = (s) => String(s ?? '').trim() === '';
    const gram = bos(v.gram) ? null : h.pos(v.gram, 'Ürün ağırlığı');
    const fiyat = bos(v.fiyat) ? null : h.pos(v.fiyat, 'Gram has altın fiyatı');
    const oran = ayar / 24;
    const rows = [
      ['Saflık', '%' + h.fmt(oran * 100, 2)],
      ['Milyem karşılığı', h.fmt(oran * 1000, 1).replace(/\./g, '')],
      ['Alaşımdaki diğer metaller', '%' + h.fmt((1 - oran) * 100, 2)],
    ];
    if (gram !== null) {
      rows.push(['Saf altın miktarı', h.fmt(gram * oran, 3) + ' g']);
      rows.push(['Diğer metal miktarı', h.fmt(gram * (1 - oran), 3) + ' g']);
    }
    if (fiyat !== null) {
      rows.push([h.fmt(ayar, 2) + ' ayar gram değeri', h.para(fiyat * oran)]);
      if (gram !== null) rows.push(['İçerdiği has altının değeri', h.para(gram * oran * fiyat)]);
    }
    return { rows, note: 'Saflık = ayar ÷ 24. Değer yalnızca içerilen has altının karşılığıdır; işçilik, kâr payı ve alış-satış farkı dahil değildir.' };
  },
  cases: [
    { in: { ayar: '24' }, out: { 'Saflık': '%100', 'Milyem karşılığı': '1000', 'Alaşımdaki diğer metaller': '%0' } },
    { in: { ayar: '22', gram: '10' }, out: { 'Saflık': '%91,67', 'Milyem karşılığı': '916,7', 'Saf altın miktarı': '9,167 g', 'Diğer metal miktarı': '0,833 g' } },
    { in: { ayar: '18', gram: '20', fiyat: '3000' }, out: { 'Saflık': '%75', 'Milyem karşılığı': '750', 'Saf altın miktarı': '15 g', '18 ayar gram değeri': '2.250,00 TL', 'İçerdiği has altının değeri': '45.000,00 TL' } },
    { in: { ayar: '14' }, out: { 'Saflık': '%58,33', 'Milyem karşılığı': '583,3', 'Alaşımdaki diğer metaller': '%41,67' } },
    { in: { ayar: '8' }, out: { 'Saflık': '%33,33', 'Milyem karşılığı': '333,3' } },
    { in: { ayar: '21', gram: '8' }, out: { 'Saflık': '%87,5', 'Milyem karşılığı': '875', 'Saf altın miktarı': '7 g' } },
    { in: { ayar: '12', fiyat: '2000' }, out: { 'Saflık': '%50', '12 ayar gram değeri': '1.000,00 TL' } },
    { in: { ayar: '25' }, error: true },
    { in: { ayar: '0' }, error: true },
  ],
  howto: [
    '"Ayar" alanına ürünün ayarını yazın. Ayar bilgisi genellikle ürünün iç yüzeyindeki ya da kilit kısmındaki damgada yer alır; damgada 585, 750, 916 gibi üç haneli bir sayı varsa bu milyemdir ve sırasıyla 14, 18 ve 22 ayara karşılık gelir.',
    'İçindeki saf altın miktarını öğrenmek için "Ürün ağırlığı" alanına hassas teraziyle ölçülmüş gramı girin.',
    'Değer hesabı için "Gram has altın fiyatı" alanına 24 ayar altının güncel gram fiyatını kendiniz yazın.',
    '"Hesapla" düğmesine basın. Saflık yüzdesi, milyem, saf altın gramı ve değer satırları görünür.',
  ],
  sections: [
    { h: 'Ayar nedir?', p: [
      'Ayar, bir altın alaşımının içindeki saf altın oranını 24 üzerinden ifade eden ölçüdür. Saf altın 24 ayar kabul edilir; 18 ayar denildiğinde alaşımın 24 parçasından 18\'inin altın, kalan 6\'sının başka metaller olduğu anlaşılır. Uluslararası kullanımda bu birim "karat" adıyla ve K ya da kt kısaltmasıyla gösterilir; değerli taşların ağırlık birimi olan kırat ile karıştırılmamalıdır.',
      'Saf altın yumuşak bir metaldir; kolay çizilir ve eğilir. Bu nedenle takı yapımında bakır, gümüş, çinko, nikel ya da paladyum gibi metallerle karıştırılarak sertleştirilir. Eklenen metallerin türü rengi de belirler: bakır ağırlıklı alaşımlar kızıla (rose), gümüş ya da paladyum ağırlıklı alaşımlar beyaza yaklaşır. Ayar ise renkten bağımsız olarak yalnızca altın oranını anlatır.',
    ] },
    { h: 'Ayardan saflığa: formül', p: [
      'Hesap bir orantıdır: <strong>Saflık (%) = Ayar ÷ 24 × 100</strong>. Aynı oranın binde olarak yazılmış hâline milyem denir: <strong>Milyem = Ayar ÷ 24 × 1000</strong>. Bir üründeki saf altın miktarı da ağırlığın bu oranla çarpılmasıyla bulunur: <strong>Saf altın (g) = Ağırlık × Ayar ÷ 24</strong>.',
      'Örneğin 22 ayar için 22 ÷ 24 = 0,9167; saflık %91,67, milyem yaklaşık 916,7\'dir. Ticarette ve damgalarda bu değerler tam sayıya indirilerek kullanılır: 22 ayar 916, 14 ayar ise aritmetik sonucu 583,3 olmasına karşın 585 milyem olarak damgalanır. Araç, formülün verdiği kesin değeri gösterir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Elinizde 10 gram gelen 22 ayar bir bilezik olsun. İçindeki saf altın 10 × 22 ÷ 24 = <strong>9,167 gram</strong>, diğer metaller 0,833 gramdır.',
      '20 gramlık 18 ayar bir kolye için saflık 18 ÷ 24 = %75\'tir; saf altın miktarı 20 × 0,75 = <strong>15 gram</strong> eder. Gram has altın fiyatını örnek olması için 3.000 TL kabul edersek 18 ayar altının gram değeri 3.000 × 0,75 = 2.250 TL, kolyenin içerdiği altının değeri 15 × 3.000 = 45.000 TL olur. Buradaki fiyat yalnızca hesabı göstermek içindir; gerçek hesapta günün fiyatını yazmalısınız.',
    ] },
    { h: 'Yaygın ayarlar ve karşılıkları', ul: [
      '<strong>24 ayar:</strong> saf altın; külçe ve gram altın. Uygulamada 995 ya da 999,9 milyem saflıkta üretilir.',
      '<strong>22 ayar:</strong> %91,67 saflık, damgada 916. Türkiye\'de bilezik ile çeyrek, yarım, tam gibi ziynet altınlarında kullanılır.',
      '<strong>21 ayar:</strong> %87,5 saflık, damgada 875. Bazı bilezik ve Orta Doğu kökenli takılarda görülür.',
      '<strong>18 ayar:</strong> %75 saflık, damgada 750. Pırlantalı ve tasarım takılarda tercih edilir.',
      '<strong>14 ayar:</strong> %58,33 saflık, damgada 585. Türkiye\'de günlük kullanılan kolye, yüzük ve küpelerin büyük bölümü bu ayardadır.',
      '<strong>8 ayar:</strong> %33,33 saflık, damgada 333. Düşük bütçeli takılarda kullanılır.',
    ] },
    { h: 'Değer hesabında dikkat edilecekler', p: [
      'Aracın verdiği değer, üründeki has altının o günkü fiyatla karşılığıdır; kuyumcudaki satış fiyatı ya da bozdurma bedeli değildir. Yeni bir ürün alırken fiyata işçilik, tasarım, vergi ve satıcının kâr payı eklenir. Bozdururken ise kuyumcu genellikle has karşılığı üzerinden, satış fiyatından daha düşük bir alış fiyatıyla ödeme yapar; taş, mine ya da yay gibi altın olmayan parçaların ağırlığı da düşülür.',
      'Bu nedenle ikinci el bir takıyı değerlendirirken en gerçekçi yaklaşım, taşsız net ağırlığı tartıp saf altın miktarını bulmak ve bunu kuyumcunun has altın alış fiyatıyla çarpmaktır. Ayar damgası bulunmayan ya da silinmiş ürünlerde ayarı ancak kuyumcu ya da ayar evi tespit edebilir; gözle ya da renge bakarak ayar belirlenemez.',
    ] },
    { h: 'Ayar yükseldikçe ne değişir?', p: [
      'Ayar arttıkça ürünün içindeki altın oranı, dolayısıyla gram başına değeri yükselir; rengi daha koyu sarıya döner ve yatırım niteliği artar. Buna karşılık metal yumuşar: 22 ayar bilezik darbeyle kolay ezilir, ince işçilikli ve taşlı tasarımlar için elverişli değildir. 14 ayar daha sert ve dayanıklıdır, bu yüzden her gün takılan ürünlerde yaygındır; ancak içindeki altın oranı düşük olduğu için bozdurulduğunda getirisi de buna göre azalır.',
      'Yatırım amacıyla altın alanlar genellikle işçiliği düşük ve ayarı yüksek ürünlere, süs amacıyla alanlar ise dayanıklılığı ve tasarımı öne çıkan ayarlara yönelir. Bu sayfa yalnızca oran hesabı yapar; alım satım kararı için bir tavsiye niteliği taşımaz ve sonuçlar bilgilendirme amaçlıdır.',
    ] },
  ],
  faq: [
    ['22 ayar altın yüzde kaç saftır?', '22 ayar altının saflığı 22 ÷ 24 = %91,67\'dir. Kalan %8,33\'lük kısım bakır ve gümüş gibi metallerden oluşur. Damgalarda bu oran 916 milyem olarak gösterilir.'],
    ['14 ayar altın kaç milyemdir?', 'Aritmetik olarak 14 ÷ 24 × 1000 = 583,3 milyemdir. Ticarette ve ürün damgalarında 585 olarak kullanılır; bu, alaşımın binde 585\'inin saf altın olduğu anlamına gelir.'],
    ['24 ayar altın tamamen saf mıdır?', 'Kuramsal olarak evet; 24 ayar, alaşımın tamamının altın olduğunu ifade eder. Uygulamada rafinasyon sınırları nedeniyle külçeler 995 ya da 999,9 milyem saflıkta üretilir ve bu değer külçenin üzerinde yazılıdır.'],
    ['Ürünümdeki 750 damgası ne anlama geliyor?', '750, milyem cinsinden saflıktır ve ürünün binde 750\'sinin, yani %75\'inin saf altın olduğunu gösterir. Bu oran 18 ayara karşılık gelir.'],
    ['10 gram 14 ayar altında kaç gram saf altın vardır?', 'Ayar formülüyle 10 × 14 ÷ 24 = 5,833 gram saf altın bulunur. Damga değeri olan 585 milyemle hesaplanırsa 5,85 gram eder; kuyumcular genellikle milyem üzerinden hesap yapar.'],
    ['Ayar ile karat aynı şey mi?', 'Altın için evet; ayar, uluslararası kullanımdaki karat (K) biriminin Türkçe karşılığıdır. Değerli taşların ağırlığını ölçen ve 0,2 grama eşit olan kırat ise tamamen farklı bir birimdir.'],
    ['Ondalıklı ayar girebilir miyim?', 'Evet. Laboratuvar ya da ayar evi raporunda 21,6 gibi bir değer varsa doğrudan yazabilirsiniz; araç 1 ile 24 arasındaki her değeri kabul eder.'],
    ['Girdiğim bilgiler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız ayar, gram ve fiyat bilgileri sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['altin-milyem-hesapla', 'doviz-kar-zarar-hesapla', 'kar-zarar-hesapla', 'yatirim-getirisi-hesapla', 'hisse-ortalama-maliyet-hesapla'],
};
