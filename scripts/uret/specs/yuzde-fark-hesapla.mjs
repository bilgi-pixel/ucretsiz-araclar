export default {
  slug: 'yuzde-fark-hesapla',
  title: 'Yüzde Fark Hesaplama',
  h1Tail: 'iki değer arasındaki simetrik fark',
  pageTitle: 'Yüzde Fark Hesaplama – İki Sayı Arasındaki Yüzde Farkı Bulma',
  description: 'İki değer arasındaki yüzde farkı hesaplayın. Araç farkı iki değerin ortalamasına oranlar; mutlak farkı ve her değerin diğerine göre yüzdesini de gösterir.',
  card: 'İki sayı arasındaki yüzde farkı ortalamaya göre hesaplayın; mutlak fark ve karşılıklı oranlarla birlikte.',
  category: 'matematik',
  keywords: ['yüzde fark hesaplama', 'iki sayı arasındaki yüzde fark', 'yüzde farkı bulma', 'fark yüzdesi hesaplama', 'yüzde fark formülü', 'fiyat farkı yüzde', 'iki değer arası yüzde'],
  lead: 'Hangisinin "eski" ya da "temel" olduğu belli olmayan iki değer arasındaki <strong>yüzde farkı</strong> hesaplayın. Araç farkı iki değerin ortalamasına böler; böylece sayıları hangi sırayla yazarsanız yazın aynı sonucu alırsınız.',
  button: 'Hesapla',
  inputs: [
    { id: 'birinci', label: 'Birinci değer', type: 'number', placeholder: 'Örn. 200' },
    { id: 'ikinci', label: 'İkinci değer', type: 'number', placeholder: 'Örn. 250' },
  ],
  compute(v, h) {
    const a = h.pos(v.birinci, 'Birinci değer');
    const b = h.pos(v.ikinci, 'İkinci değer');
    const fark = Math.abs(a - b);
    const ort = (a + b) / 2;
    const yf = (fark / ort) * 100;
    const gore = (temel, diger) => {
      const o = ((diger - temel) / temel) * 100;
      if (Math.abs(o) < 5e-7) return 'Eşit';
      return `%${h.fmt(Math.abs(o), 2)} ${o > 0 ? 'fazla' : 'az'}`;
    };
    return {
      rows: [
        ['Yüzde fark', '%' + h.fmt(yf, 2)],
        ['Mutlak fark', h.fmt(fark, 4)],
        ['İki değerin ortalaması', h.fmt(ort, 4)],
        ['Birinciye göre ikinci', gore(a, b)],
        ['İkinciye göre birinci', gore(b, a)],
      ],
      note: 'Formül: |birinci − ikinci| ÷ ((birinci + ikinci) ÷ 2) × 100. Sonuç iki değerin sırasından bağımsızdır ve en fazla %200 olabilir.',
    };
  },
  cases: [
    { in: { birinci: '200', ikinci: '250' }, out: { 'Yüzde fark': '%22,22', 'Mutlak fark': '50', 'İki değerin ortalaması': '225', 'Birinciye göre ikinci': '%25 fazla', 'İkinciye göre birinci': '%20 az' } },
    { in: { birinci: '40', ikinci: '60' }, out: { 'Yüzde fark': '%40', 'Mutlak fark': '20', 'İki değerin ortalaması': '50', 'Birinciye göre ikinci': '%50 fazla', 'İkinciye göre birinci': '%33,33 az' } },
    { in: { birinci: '120', ikinci: '80' }, out: { 'Yüzde fark': '%40', 'Birinciye göre ikinci': '%33,33 az', 'İkinciye göre birinci': '%50 fazla' } },
    { in: { birinci: '10', ikinci: '30' }, out: { 'Yüzde fark': '%100', 'Mutlak fark': '20', 'İki değerin ortalaması': '20', 'Birinciye göre ikinci': '%200 fazla' } },
    { in: { birinci: '100', ikinci: '100' }, out: { 'Yüzde fark': '%0', 'Mutlak fark': '0', 'Birinciye göre ikinci': 'Eşit', 'İkinciye göre birinci': 'Eşit' } },
    { in: { birinci: '1000', ikinci: '1100' }, out: { 'Yüzde fark': '%9,52', 'Mutlak fark': '100', 'İki değerin ortalaması': '1.050', 'Birinciye göre ikinci': '%10 fazla', 'İkinciye göre birinci': '%9,09 az' } },
    { in: { birinci: '7,5', ikinci: '2,5' }, out: { 'Yüzde fark': '%100', 'Mutlak fark': '5', 'İki değerin ortalaması': '5' } },
    { in: { birinci: '0', ikinci: '50' }, error: true },
    { in: { birinci: '-20', ikinci: '50' }, error: true },
    { in: { birinci: '20', ikinci: '' }, error: true },
  ],
  howto: [
    'Karşılaştırmak istediğiniz iki değeri "Birinci değer" ve "İkinci değer" alanlarına yazın. Sıra önemli değildir; yüzde fark her iki sırada da aynı çıkar.',
    'Değerler aynı birimde olmalıdır: ikisi de lira, ikisi de kilogram, ikisi de metre gibi.',
    '"Hesapla" düğmesine basın. İlk satır ortalamaya göre yüzde farkı verir.',
    'Bir değeri temel alarak konuşmak istiyorsanız son iki satıra bakın: ikinci değerin birinciye göre, birincinin de ikinciye göre yüzde kaç fazla ya da az olduğu ayrı ayrı gösterilir.',
  ],
  sections: [
    { h: 'Yüzde fark nedir, yüzde değişimden farkı ne?', p: [
      'İki sayı arasındaki farkı yüzdeyle söylemek için farkı bir şeye bölmek gerekir. Sorun şudur: neye? Bir değerin zaman içindeki hareketine bakıyorsanız cevap bellidir; başlangıç değerine bölersiniz ve buna yüzde değişim denir. Ancak iki mağazanın fiyatı, iki ölçüm cihazının okuması ya da iki şehrin nüfusu gibi <strong>eş düzeyde</strong> iki değer karşılaştırılırken hangisinin temel alınacağı keyfî kalır.',
      '200 ile 250 arasındaki 50 birimlik fark, 200\'e göre %25, 250\'ye göre %20\'dir. İki kişi aynı veriden iki farklı yüzde söyleyebilir ve ikisi de haklıdır. Yüzde fark bu belirsizliği ortadan kaldırmak için farkı iki değerin ortalamasına böler. Ortalama 225 olduğundan sonuç 50 ÷ 225 × 100 = %22,22 çıkar ve bu sayı hangi değerden başladığınıza bağlı değildir.',
    ] },
    { h: 'Formül ve çözümlü örnek', p: [
      '<strong>Yüzde fark = |A − B| ÷ ((A + B) ÷ 2) × 100</strong>',
      'Dikey çizgiler mutlak değeri gösterir; yani farkın işaretine bakılmaz. Adım adım bir örnek: bir ürün bir markette 40 lira, diğerinde 60 liradır.',
    ], ol: [
      'Mutlak fark: |40 − 60| = 20.',
      'Ortalama: (40 + 60) ÷ 2 = 50.',
      'Oran: 20 ÷ 50 = 0,4.',
      'Yüzde: 0,4 × 100 = %40.',
    ] },
    { h: 'Aynı örnekte üç farklı yüzde', p: [
      'Yukarıdaki 40 ve 60 liralık fiyatlar için araç üç oran birden gösterir ve her biri farklı bir cümleye karşılık gelir. "İki fiyat arasında %40 fark var" cümlesi ortalamaya göre kurulmuştur. "Pahalı olan ucuz olandan %50 fazla" cümlesinde temel 40 liradır: 20 ÷ 40 = 0,5. "Ucuz olan pahalı olandan %33,33 az" cümlesinde temel 60 liradır: 20 ÷ 60 = 0,3333.',
      'Bu üç sayının hiçbiri yanlış değildir; yanlış olan, hangi temele göre söylendiğini belirtmeden kullanmaktır. Bir rapor ya da haber metninde "arada %50 fark var" denildiğinde çoğunlukla küçük değer temel alınmıştır. Okurken de yazarken de temelin ne olduğunu sormak, yüzdelerle ilgili yanlış anlamaların büyük bölümünü önler.',
    ] },
    { h: 'Hangi durumda hangisini kullanmalı?', ul: [
      '<strong>Yüzde fark (ortalamaya göre):</strong> iki değer eş konumdaysa. İki satıcının fiyatı, iki laboratuvar sonucu, iki terazinin tartımı, iki öğrencinin puanı, iki farklı yöntemle yapılan ölçüm.',
      '<strong>Yüzde değişim (eskiye göre):</strong> aynı büyüklüğün önceki ve sonraki hâli varsa. Geçen yılki ve bu yılki kira, zam öncesi ve sonrası maaş, kampanya öncesi ve sonrası satış.',
      '<strong>Yüzde hata (doğru değere göre):</strong> değerlerden biri kabul edilen doğru değer ya da referans ise. Deneyde ölçülen değer ile kitaptaki değer karşılaştırılırken fark referans değere bölünür.',
    ] },
    { h: 'Yüzde farkın özellikleri', p: [
      'Yüzde fark simetriktir: A ile B\'nin yerini değiştirmek sonucu değiştirmez. Pozitif iki sayı için alt sınır %0\'dır ve bu, iki değerin eşit olduğu anlamına gelir. Üst sınır %200\'dür; değerlerden biri diğerinin yanında yok denecek kadar küçük kaldıkça sonuç %200\'e yaklaşır ama onu aşmaz. Bu nedenle yüzde farkta "%300 fark" gibi bir sonuç görmezsiniz.',
      'Birkaç başvuru değeri: değerlerden biri diğerinin iki katıysa yüzde fark %66,67, üç katıysa %100, dört katıysa %120\'dir. 10 ile 30 için araç %100 sonucunu verir; aynı çift için "ikinci, birinciden %200 fazla" bilgisi de doğrudur. İki ifadenin bu kadar ayrışması, büyük farklarda temel seçiminin ne kadar önemli olduğunu gösterir.',
    ] },
    { h: 'Kullanım örnekleri ve sınırlar', p: [
      'Yüzde fark, alışverişte aynı ürünün iki fiyatını karşılaştırırken, teklif toplarken, fen derslerinde aynı niceliğin iki ayrı ölçümünü değerlendirirken ve iki bölgenin, iki şubenin ya da iki dönemin verilerini taraf tutmadan yan yana koyarken kullanılır. Deney raporlarında iki ölçüm arasındaki tutarlılığı göstermek için sıkça istenir.',
      'Araç yalnızca pozitif değerlerle çalışır. Sıfır ya da negatif değerlerde ortalama sıfıra yaklaşabildiği ya da anlamını yitirdiği için yüzde fark sağlıklı bir ölçü olmaz; bu durumlarda mutlak farkı kullanmak daha doğrudur. Karşılaştırılan iki değerin aynı birimde olduğundan emin olun; biri kuruş, diğeri lira ise sonuç anlamsız çıkar. Sonuçlar iki ondalık basamağa yuvarlanır.',
    ] },
  ],
  faq: [
    ['İki sayı arasındaki yüzde fark nasıl hesaplanır?', 'İki sayının farkının mutlak değeri alınır, iki sayının ortalamasına bölünür ve 100 ile çarpılır. 200 ile 250 için 50 ÷ 225 × 100 = %22,22 bulunur.'],
    ['Yüzde fark ile yüzde değişim arasındaki fark nedir?', 'Yüzde değişimde fark eski değere bölünür ve sonuç sıraya bağlıdır. Yüzde farkta ise fark iki değerin ortalamasına bölünür; hangi değerin önce yazıldığı sonucu etkilemez.'],
    ['Neden ortalamaya bölünüyor?', 'İki değerden hiçbiri diğerine göre öncelikli değilse birini temel seçmek keyfî olur ve iki farklı yüzde ortaya çıkar. Ortalama, iki değere de eşit uzaklıkta tarafsız bir temeldir.'],
    ['Yüzde fark %100\'ü geçebilir mi?', 'Evet, geçebilir ama %200\'ü aşamaz. Değerlerden biri diğerinin üç katı olduğunda yüzde fark tam %100\'dür; kat arttıkça sonuç %200\'e yaklaşır.'],
    ['Sayıları ters sırayla yazarsam sonuç değişir mi?', 'Yüzde fark, mutlak fark ve ortalama değişmez. Yalnızca "birinciye göre ikinci" ve "ikinciye göre birinci" satırlarının içerikleri yer değiştirir.'],
    ['Deneyde ölçtüğüm değeri kitaptaki değerle karşılaştırırken bu aracı kullanabilir miyim?', 'Bu durumda aranan büyüklük genellikle yüzde hatadır ve fark, kabul edilen değere bölünür. Kitap değerini birinci alana yazarsanız "Birinciye göre ikinci" satırı tam olarak bu oranı verir.'],
    ['Negatif sayılar neden kabul edilmiyor?', 'Negatif ve pozitif değerler birlikte olduğunda ortalama sıfıra yaklaşabilir ve oran anlamsız biçimde büyür. Yüzde fark, pozitif büyüklükler için tanımlı bir karşılaştırma ölçüsüdür.'],
    ['Yazdığım değerler bir yere gönderiliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; girdiğiniz sayılar sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['yuzde-degisim-hesapla', 'yuzde-hesapla', 'ortalama-hesapla', 'oran-oranti-hesapla', 'indirim-orani-hesapla'],
};
