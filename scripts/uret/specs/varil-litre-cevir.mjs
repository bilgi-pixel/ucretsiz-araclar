export default {
  slug: 'varil-litre-cevir',
  title: 'Varil Litre Çevirici',
  h1Tail: 'bbl ↔ L',
  pageTitle: 'Varil Litre Çevirici – 1 Varil Petrol Kaç Litre Hesaplama',
  description: 'Petrol varilini litreye, litreyi varile çevirin. 1 varil = 42 ABD galonu = 158,987 litre tanımıyla çalışır; galon ve metreküp karşılığını da gösterir.',
  card: 'Petrol varilini litreye, litreyi varile çevirin; 1 varil = 158,987 litre tanımıyla, galon ve metreküp karşılığıyla.',
  category: 'birim',
  keywords: ['varil litre çevirme', '1 varil kaç litre', 'varil petrol kaç litre', 'litre varil hesaplama', 'bbl litre', 'ham petrol varil', 'varil kaç galon'],
  lead: 'Petrol varili ile litre arasında çeviri yapın. Araç, uluslararası petrol ticaretinde kullanılan <strong>1 varil = 42 ABD galonu = 158,987294928 litre</strong> tanımını esas alır ve sonucu galon ile metreküp olarak da verir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 100' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['vl', 'Varil → Litre'], ['lv', 'Litre → Varil']] },
  ],
  compute(v, h) {
    const VARIL = 158.987294928; // 42 × 3,785411784
    const GALON = 3.785411784;
    const x = h.nonneg(v.deger, 'Değer');
    const litre = v.yon === 'lv' ? x : x * VARIL;
    const varilSatir = ['Varil', h.fmt(litre / VARIL, 4) + ' varil'];
    const litreSatir = ['Litre', h.fmt(litre, 4) + ' L'];
    return {
      rows: [
        v.yon === 'lv' ? varilSatir : litreSatir,
        v.yon === 'lv' ? litreSatir : varilSatir,
        ['ABD galonu', h.fmt(litre / GALON, 4) + ' gal'],
        ['Metreküp', h.fmt(litre / 1000, 6) + ' m³'],
      ],
      note: 'Petrol varili (bbl) = 42 ABD sıvı galonu = 158,987294928 L. Sanayide kullanılan 200–216 litrelik çelik variller farklı bir ölçüdür.',
    };
  },
  cases: [
    { in: { deger: '1', yon: 'vl' }, out: { 'Litre': '158,9873 L', 'ABD galonu': '42 gal' } },
    { in: { deger: '1000', yon: 'lv' }, out: { 'Varil': '6,2898 varil', 'ABD galonu': '264,1721 gal' } },
    { in: { deger: '100', yon: 'vl' }, out: { 'Litre': '15.898,7295 L', 'Metreküp': '15,898729 m³' } },
    { in: { deger: '2,5', yon: 'vl' }, out: { 'Litre': '397,4682 L', 'ABD galonu': '105 gal' } },
    { in: { deger: '500', yon: 'lv' }, out: { 'Varil': '3,1449 varil' } },
    { in: { deger: '10000', yon: 'lv' }, out: { 'Varil': '62,8981 varil', 'Metreküp': '10 m³' } },
    { in: { deger: '0', yon: 'vl' }, out: { 'Litre': '0 L' } },
    { in: { deger: 'bir varil', yon: 'vl' }, error: true },
    { in: { deger: '-3', yon: 'lv' }, error: true },
  ],
  howto: [
    '"Değer" alanına varil ya da litre miktarını yazın. Ondalık için virgül kullanabilirsiniz.',
    '"Çeviri yönü" listesinden varilden litreye ya da litreden varile seçeneğini belirleyin.',
    '"Çevir" düğmesine basın. İlk satırda aradığınız karşılık, altında ABD galonu ve metreküp değerleri görünür.',
    'Sonuçları rapor ya da tabloya aktarmak için "Sonucu kopyala" düğmesini kullanın.',
  ],
  sections: [
    { h: 'Petrol varili nedir?', p: [
      'Varil, ham petrol ve petrol ürünlerinin uluslararası ticaretinde kullanılan hacim birimidir. İngilizcesi "barrel", kısaltması "bbl" olarak yazılır. Bir petrol varili 42 ABD sıvı galonuna eşittir; ABD galonu tam 3,785411784 litre olduğundan bir varil 42 × 3,785411784 = <strong>158,987294928 litre</strong> eder. Gündelik kullanımda bu değer 159 litre olarak yuvarlanır.',
      'Birimin kökeni, 19. yüzyılda Amerika Birleşik Devletleri\'ndeki ilk petrol sahalarında ham petrolün ahşap fıçılarla taşınmasına dayanır. Farklı boylarda fıçılar kullanıldığı için üreticiler zamanla 42 galonluk ölçüde uzlaşmış, bu ölçü sektörün standardı hâline gelmiştir. Bugün petrol tankerlerle ve boru hatlarıyla taşınır, gerçek bir fıçı kullanılmaz; varil yalnızca bir hesap birimi olarak yaşamaktadır.',
    ] },
    { h: 'Çevirme formülü ve çözümlü örnekler', p: [
      'Varilden litreye geçmek için <strong>litre = varil × 158,987294928</strong>, litreden varile geçmek için <strong>varil = litre ÷ 158,987294928</strong> işlemi yapılır.',
      '<strong>Örnek 1:</strong> 100 varil ham petrol kaç litredir? 100 × 158,987294928 = 15.898,7295 litre, yani yaklaşık 15,9 metreküp.',
      '<strong>Örnek 2:</strong> 1000 litre, yani 1 metreküp kaç varildir? 1000 ÷ 158,987294928 = 6,2898 varil. Bu sayı akılda tutmaya değer: bir metreküp yaklaşık 6,29 varildir.',
      '<strong>Örnek 3:</strong> 2,5 varil, 2,5 × 158,987294928 = 397,4682 litre ve 2,5 × 42 = 105 ABD galonu eder.',
    ] },
    { h: 'Varil fiyatından litre fiyatına geçiş', p: [
      'Haberlerde ham petrol fiyatı "varil başına dolar" olarak duyurulur. Bu fiyatı litre başına düşen ham petrol maliyetine çevirmek için varil fiyatını 158,987\'ye bölmek yeterlidir. Varil fiyatı örneğin 80 birim ise litre başına ham petrol bedeli 80 ÷ 158,987 = yaklaşık 0,503 birim olur.',
      'Bu sonucun pompa fiyatı olmadığını unutmamak gerekir. Akaryakıtın tüketiciye ulaşan fiyatında rafinaj, taşıma, dağıtım payları, vergiler ve döviz kuru da yer alır; ayrıca bir varil ham petrolün tamamı benzin ya da motorine dönüşmez. Bu yüzden varil fiyatındaki değişim pompa fiyatına bire bir yansımaz. Buradaki hesap yalnızca birim çevirisidir, mali bir öngörü ya da yatırım tavsiyesi değildir.',
    ] },
    { h: 'Petrol varili ile çelik varil aynı değildir', p: [
      'Sanayide, akaryakıt istasyonlarında ve depolarda görülen mavi ya da kırmızı çelik variller çoğunlukla 200 ile 216 litre arasında hacme sahiptir. Uluslararası yaygın boy 55 ABD galonudur ve bu yaklaşık 208 litre eder. Yani bu fiziksel variller, 159 litrelik petrol ticareti birimiyle karıştırılmamalıdır. Madenî yağ, kimyasal ya da gıda maddesi satın alırken "varil" sözcüğü geçiyorsa ambalajın litre cinsinden net hacmini ayrıca sorun.',
      'Bunun dışında bira ve şarap gibi içecekler için farklı ülkelerde farklı büyüklükte fıçı ölçüleri de vardır. Bu araç yalnızca 42 galonluk petrol varilini hesaplar.',
    ] },
    { h: 'Varilden tona geçiş neden sabit değildir?', p: [
      'Varil hacim, ton kütle birimidir; ikisi arasındaki ilişki sıvının yoğunluğuna bağlıdır. Hafif ham petrol türlerinde bir ton daha fazla varile, ağır türlerde daha az varile karşılık gelir. Sektörde ortalama ham petrol için bir tonun kabaca 7 ile 7,5 varil arasında olduğu kabul edilir; kesin değer için ilgili petrolün yoğunluğu gerekir. Bu nedenle araç ton karşılığı vermez.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>1 varil</strong> = 158,9873 L = 42 ABD galonu',
      '<strong>1 varil</strong> = yaklaşık 0,159 m³',
      '<strong>10 varil</strong> = 1.589,873 L',
      '<strong>100 varil</strong> = 15.898,7295 L',
      '<strong>500 litre</strong> = 3,1449 varil',
      '<strong>1 m³ (1000 L)</strong> = 6,2898 varil',
      '<strong>10.000 litre</strong> = 62,8981 varil',
    ] },
    { h: 'Sınırlar', p: [
      'Hesap tam tanım değeriyle yapılır ve sonuç dört ondalık basamağa yuvarlanarak gösterilir. Petrolün hacmi sıcaklıkla değiştiğinden ticari ölçümlerde hacimler standart bir referans sıcaklığa göre düzeltilir; bu araç böyle bir düzeltme yapmaz. Negatif değer kabul edilmez.',
      'Çok büyük miktarlarda sektör kısaltmalarına dikkat edin: petrol istatistiklerinde bin varil ve milyon varil için ayrı kısaltmalar kullanılır ve bunların yanlış okunması sonucu bin kat değiştirir. Bir tabloda gördüğünüz değeri araca yazmadan önce sütun başlığındaki ölçeği (varil, bin varil, milyon varil) kontrol edin.',
    ] },
  ],
  faq: [
    ['1 varil petrol kaç litredir?', '1 varil 158,987294928 litredir ve genellikle 159 litre olarak yuvarlanır. Bu değer 42 ABD sıvı galonuna karşılık gelir.'],
    ['1 litre kaç varil eder?', '1 litre yaklaşık 0,00629 varildir. Daha anlaşılır bir ölçüyle 1000 litre, yani 1 metreküp 6,2898 varil eder.'],
    ['Varil neden 42 galondur?', 'ABD\'deki ilk petrol üreticileri ham petrolü ahşap fıçılarla taşıyordu ve 19. yüzyılda 42 galonluk fıçıda uzlaştılar. Bu ölçü sonradan sektör standardı olarak kaldı.'],
    ['bbl ne demektir?', 'bbl, petrol varilinin uluslararası kısaltmasıdır. Günlük üretim "varil/gün" olarak ifade edilir ve "bbl/d" ya da "bpd" biçiminde kısaltılır.'],
    ['200 litrelik çelik varil ile petrol varili aynı mı?', 'Hayır. Sanayide kullanılan çelik variller yaklaşık 200–216 litre hacmindedir. Petrol ticaretindeki varil ise 158,987 litrelik bir hesap birimidir.'],
    ['Varil fiyatından litre fiyatını nasıl bulurum?', 'Varil fiyatını 158,987\'ye bölün. Çıkan değer yalnızca ham petrolün litre başına bedelidir; rafinaj, dağıtım ve vergiler içinde yer almaz.'],
    ['1 ton petrol kaç varildir?', 'Petrolün yoğunluğuna göre değişir; ortalama ham petrolde kabaca 7 ile 7,5 varil arasındadır. Kesin sonuç için ilgili petrolün yoğunluğu bilinmelidir.'],
    ['Yazdığım değerler saklanıyor mu?', 'Hayır. Çeviri tarayıcınızda yapılır; girdiğiniz sayılar sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['litre-galon-cevir', 'litre-metrekup-cevir', 'galon-ingiliz-abd-cevir', 'metrekup-feetkup-cevir', 'yakit-tuketimi-birim-cevir', 'birim-donustur'],
};
