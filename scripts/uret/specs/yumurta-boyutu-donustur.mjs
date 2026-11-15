export default {
  slug: 'yumurta-boyutu-donustur',
  title: 'Yumurta Boyu Dönüşümü Hesaplama',
  h1Tail: 'S, M, L, XL arasında',
  pageTitle: 'Yumurta Boyu Dönüşümü – S, M, L, XL Yumurta Karşılığı Hesaplama',
  description: 'Tarifteki yumurta sayısını başka bir boya çevirin. 3 büyük (L) yumurta yerine kaç orta (M) yumurta gerektiğini ağırlık üzerinden hesaplayın.',
  card: 'Tarifteki S, M, L ya da XL yumurta sayısının elinizdeki boydaki karşılığını ağırlığa göre bulun.',
  category: 'gunluk',
  keywords: ['yumurta boyu dönüşümü', 'L yumurta kaç gram', 'M yumurta kaç gram', '3 büyük yumurta kaç orta yumurta', 'yumurta ağırlık sınıfları', 'yumurta boyutu hesaplama', 'S M L XL yumurta'],
  lead: 'Tarif büyük boy yumurta istiyor ama dolapta orta boy mu var? Tarifteki yumurta sayısını ve boyunu, ardından elinizdeki boyu seçin; araç <strong>ağırlık üzerinden</strong> kaç yumurta kullanmanız gerektiğini ve en yakın tam adedi verir.',
  button: 'Dönüştür',
  inputs: [
    { id: 'adet', label: 'Tarifteki yumurta sayısı', type: 'number', placeholder: 'Örn. 3' },
    { id: 'kaynak', label: 'Tarifteki boy', type: 'select', options: [['L', 'L – Büyük (63–73 g)'], ['M', 'M – Orta (53–63 g)'], ['S', 'S – Küçük (53 g altı)'], ['XL', 'XL – Çok büyük (73 g ve üzeri)']] },
    { id: 'hedef', label: 'Elimdeki boy', type: 'select', options: [['M', 'M – Orta (53–63 g)'], ['L', 'L – Büyük (63–73 g)'], ['S', 'S – Küçük (53 g altı)'], ['XL', 'XL – Çok büyük (73 g ve üzeri)']] },
  ],
  compute(v, h) {
    const G = { S: 48, M: 58, L: 68, XL: 78 };
    const n = h.pos(v.adet, 'Yumurta sayısı');
    if (n > 1000) h.err('Yumurta sayısı en fazla 1000 olabilir.');
    const k = G[v.kaynak];
    const t = G[v.hedef];
    if (!k || !t) h.err('Yumurta boyunu listeden seçin.');
    const toplam = n * k;
    const gereken = toplam / t;
    const tam = Math.max(1, Math.round(gereken));
    const fark = tam * t - toplam;
    const farkMetin = Math.abs(fark) < 0.5 ? 'Fark yok' : h.fmt(Math.abs(fark), 0) + (fark > 0 ? ' g fazla' : ' g eksik');
    return {
      rows: [
        ['Gereken yumurta', h.fmt(gereken, 2) + ' adet ' + v.hedef + ' boy'],
        ['En yakın tam adet', h.fmt(tam, 0) + ' adet'],
        ['Tarifin istediği toplam ağırlık', h.fmt(toplam, 0) + ' g (kabuklu)'],
        ['Tam adetle fark', farkMetin],
        ['Kullanılan ortalama ağırlıklar', `${v.kaynak} = ${k} g, ${v.hedef} = ${t} g`],
      ],
      note: 'Ortalama kabuklu ağırlıklar: S 48 g, M 58 g, L 68 g, XL 78 g. Gerçek yumurtalar sınıf aralığı içinde değişir; hassas tariflerde yumurtayı çırpıp tartın.',
    };
  },
  cases: [
    { in: { adet: '3', kaynak: 'L', hedef: 'M' }, out: { 'Gereken yumurta': '3,52 adet M boy', 'En yakın tam adet': '4 adet', 'Tarifin istediği toplam ağırlık': '204 g (kabuklu)', 'Tam adetle fark': '28 g fazla' } },
    { in: { adet: '4', kaynak: 'M', hedef: 'L' }, out: { 'Gereken yumurta': '3,41 adet L boy', 'En yakın tam adet': '3 adet', 'Tarifin istediği toplam ağırlık': '232 g (kabuklu)', 'Tam adetle fark': '28 g eksik' } },
    { in: { adet: '2', kaynak: 'M', hedef: 'M' }, out: { 'Gereken yumurta': '2 adet M boy', 'En yakın tam adet': '2 adet', 'Tam adetle fark': 'Fark yok' } },
    { in: { adet: '6', kaynak: 'S', hedef: 'XL' }, out: { 'Gereken yumurta': '3,69 adet XL boy', 'En yakın tam adet': '4 adet', 'Tam adetle fark': '24 g fazla' } },
    { in: { adet: '5', kaynak: 'XL', hedef: 'M' }, out: { 'Gereken yumurta': '6,72 adet M boy', 'En yakın tam adet': '7 adet', 'Tarifin istediği toplam ağırlık': '390 g (kabuklu)', 'Tam adetle fark': '16 g fazla' } },
    { in: { adet: '1', kaynak: 'S', hedef: 'L' }, out: { 'Gereken yumurta': '0,71 adet L boy', 'En yakın tam adet': '1 adet', 'Tam adetle fark': '20 g fazla' } },
    { in: { adet: '0', kaynak: 'L', hedef: 'M' }, error: true },
    { in: { adet: 'üç', kaynak: 'L', hedef: 'M' }, error: true },
  ],
  howto: [
    'Tarifte yazan yumurta sayısını girin.',
    '"Tarifteki boy" listesinden tarifin istediği boyu seçin. Tarif boy belirtmiyorsa ve yabancı kaynaklıysa çoğunlukla büyük (L), yerli ev tariflerinde ise orta (M) boy varsayılır.',
    '"Elimdeki boy" listesinden kullanacağınız yumurtanın boyunu seçin; boy, yumurta kolisinin üzerinde yazar.',
    '"Dönüştür" düğmesine basın. Ondalıklı karşılık, en yakın tam adet ve bu adetle oluşacak gram farkı gösterilir.',
  ],
  sections: [
    { h: 'Yumurta ağırlık sınıfları', p: [
      'Türkiye\'de ve Avrupa Birliği\'nde sofralık tavuk yumurtaları kabuklu ağırlıklarına göre dört sınıfa ayrılır ve bu sınıf ambalajın üzerinde harfle belirtilir:',
    ], ul: [
      '<strong>S (küçük):</strong> 53 gramdan hafif',
      '<strong>M (orta):</strong> 53 gram ile 63 gram arası',
      '<strong>L (büyük):</strong> 63 gram ile 73 gram arası',
      '<strong>XL (çok büyük):</strong> 73 gram ve üzeri',
    ] },
    { h: 'Hesap nasıl yapılır?', p: [
      'Tariflerde önemli olan yumurtanın adedi değil, hamura kattığı sıvı ve protein miktarıdır; bu da ağırlıkla orantılıdır. Araç her sınıf için bir ortalama kabuklu ağırlık kullanır: M ve L için sınıf aralığının orta noktası olan 58 ve 68 gram, alt ve üst sınırı açık olan S ve XL için ise komşu sınıflarla aynı on gramlık adımı koruyan 48 ve 78 gram. Bunlar ölçüm değil, hesap için seçilmiş temsili değerlerdir.',
      'Dönüşüm iki adımdır. Önce tarifin istediği toplam yumurta ağırlığı bulunur: <strong>toplam = adet × kaynak boyun ağırlığı</strong>. Sonra bu toplam, elinizdeki boyun ağırlığına bölünür: <strong>gereken adet = toplam ÷ hedef boyun ağırlığı</strong>. Kabuğun yumurtaya oranı boydan boya pek değişmediği için kabuklu ağırlıkların oranı, içerik ağırlıklarının oranına çok yakındır.',
    ] },
    { h: 'Çözümlü örnek: 3 büyük yerine kaç orta yumurta?', p: [
      'Tarif 3 adet L boy yumurta istiyor. Toplam ağırlık 3 × 68 = <strong>204 gram</strong> eder. Elinizde M boy yumurta varsa gereken adet 204 ÷ 58 = <strong>3,52</strong> olur. En yakın tam sayı 4\'tür; dört orta yumurta 232 gram gelir ve tarifin istediğinden 28 gram fazladır.',
      'Bu durumda iki yol vardır. Kurabiye, omlet ya da köfte gibi hoşgörülü tariflerde 4 yumurta kullanıp geçebilirsiniz. Pandispanya, makaron ya da krema gibi hassas tariflerde ise dört yumurtayı bir kapta çırpın ve yaklaşık yarım yumurta kadarını ayırın. Ters yönde, 4 orta yumurta isteyen bir tarifte büyük yumurta kullanacaksanız 232 ÷ 68 = 3,41 çıkar; üç büyük yumurta 28 gram eksik kalır ve bu açık bir iki yemek kaşığı süt ya da su ile kapatılabilir.',
    ] },
    { h: 'Hangi tariflerde boy fark eder?', p: [
      'Bir ya da iki yumurtalı tariflerde boy farkı çoğu zaman hissedilmez; fark birkaç gramla sınırlı kalır. Yumurta sayısı arttıkça fark birikir: altı yumurtalı bir pandispanyada L yerine M kullanmak yaklaşık bir yumurtalık eksik demektir ve kek daha alçak, daha kuru olabilir.',
      'Yumurtanın yapıyı taşıdığı tarifler boy farkına en duyarlı olanlardır: pandispanya, beze, sufle, makaron, kremalar ve yumurtalı hamurlar. Bu tariflerde profesyonel mutfaklar yumurtayı adetle değil gramla ölçer. Sarısı ve beyazı ayrı kullanılan tariflerde de boy büyüdükçe artışın büyük bölümünün beyazdan geldiğini akılda tutmak gerekir; sarı miktarı boya göre daha az değişir.',
    ] },
    { h: 'Pratik ipuçları', ul: [
      'Ondalıklı sonucu uygulamak için yumurtaları çırpın ve teraziyle tartarak ihtiyacınız kadarını alın.',
      'Yabancı tariflerdeki boy adları ülkeye göre değişir; bir ülkenin "large" sınıfı başka bir ülkenin sınıfıyla birebir aynı aralıkta olmayabilir. Tarif gram veriyorsa gramı esas alın.',
      'Köy yumurtası gibi sınıflandırılmamış yumurtalarda birkaç tanesini tartıp ortalamaya en yakın sınıfı seçin.',
      'Aynı kolideki yumurtalar da birbirinden birkaç gram farklı olabilir; sınıf bir aralıktır, tek bir değer değil.',
      'Fark küçükse (10–15 gramın altında) çoğu ev tarifinde düzeltme yapmaya gerek yoktur.',
    ] },
    { h: 'Sınırlar', p: [
      'Sonuçlar ortalama ağırlıklara dayanır. Gerçek bir M boy yumurta 53 gram da olabilir 62 gram da; dolayısıyla hesaplanan adet bir yaklaşımdır. S sınıfının alt, XL sınıfının üst sınırı tanımlı olmadığından bu iki sınıf için kullanılan 48 ve 78 gram değerleri özellikle kabadır. Hassasiyet gereken işlerde en doğru yöntem, tarifin istediği toplam ağırlığı esas alıp yumurtayı tartmaktır; araç bu toplamı ayrı bir satırda verir.',
    ] },
  ],
  faq: [
    ['L boy yumurta kaç gramdır?', 'L sınıfı, kabuklu ağırlığı 63 ile 73 gram arasındaki yumurtaları kapsar. Araç hesaplarda bu aralığın orta noktası olan 68 gramı kullanır.'],
    ['M boy yumurta kaç gramdır?', 'M sınıfı 53 ile 63 gram arasındaki yumurtalardır. Hesaplarda ortalama 58 gram alınır.'],
    ['3 büyük yumurta yerine kaç orta yumurta kullanılır?', 'Ağırlık hesabıyla 3,52 orta yumurta gerekir. Pratikte 4 orta yumurta kullanılır; hassas tariflerde yumurtalar çırpılıp yaklaşık yarım yumurta kadarı ayrılır.'],
    ['Tarif yumurta boyunu belirtmiyorsa hangisini seçmeliyim?', 'Tarifin kaynağına bakın. Birçok yabancı tarif büyük boyu varsayar; ev tariflerinde ise çoğunlukla dolapta ne varsa o kullanılmıştır ve orta boy güvenli bir varsayımdır. Emin değilseniz kaynak ve hedef boyu aynı seçip tarifteki adedi kullanın.'],
    ['Ağırlıklara kabuk dahil mi?', 'Evet, sınıflandırma kabuklu ağırlığa göre yapılır ve araç da kabuklu ağırlıkları kullanır. Dönüşüm bir oran hesabı olduğu için kabuğun dahil olması sonucu anlamlı biçimde değiştirmez.'],
    ['Yarım yumurta nasıl ölçülür?', 'Yumurtayı bir kapta sarısı ve beyazı karışana kadar çırpın, tartın ve yarısını kullanın. Terazi yoksa çırpılmış yumurtanın yaklaşık yarısını kaşıkla ayırabilirsiniz.'],
    ['Araç ördek ya da bıldırcın yumurtası için kullanılabilir mi?', 'Hayır. Sınıflar ve ortalama ağırlıklar tavuk yumurtası içindir. Başka türlerde yumurtayı tartıp tarifin istediği toplam ağırlığa göre ayarlamak gerekir.'],
    ['Girdiğim bilgiler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; hiçbir veri sunucuya gönderilmez.'],
  ],
  related: ['tarif-olcekle', 'kek-kalibi-donustur', 'mutfak-olcu-donustur', 'su-bardagi-gram-cevir', 'maya-donusumu-hesapla'],
};
