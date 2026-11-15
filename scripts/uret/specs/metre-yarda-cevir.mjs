export default {
  slug: 'metre-yarda-cevir',
  title: 'Metre Yarda Çevirici',
  h1Tail: 'm ↔ yd',
  pageTitle: 'Metre Yarda Çevirici – Yardadan Metreye, Metreden Yardaya',
  description: 'Metreyi yardaya, yardayı metreye çevirin. 1 yarda = 0,9144 metre tanımıyla hesaplar; feet, inç ve santimetre karşılığını da aynı anda gösterir.',
  card: 'Metreyi yardaya, yardayı metreye çevirin; kumaş, golf, Amerikan futbolu ve yurt dışı siparişlerindeki ölçüler için.',
  category: 'birim',
  keywords: ['metre yarda çevirme', '1 yarda kaç metre', 'yarda kaç cm', 'yard metre hesaplama', 'metre kaç yarda', 'yarda nedir', 'kumaş yarda metre', '100 yarda kaç metre'],
  lead: 'Yarda ile metre arasında iki yönlü çeviri yapın. Hesap, <strong>1 yarda = 0,9144 metre</strong> tanımına dayanır; sonuç kutusunda feet, inç ve santimetre karşılıklarını da bulursunuz.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Uzunluk', type: 'number', placeholder: 'Örn. 100' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['yd', 'Yarda → Metre'], ['m', 'Metre → Yarda']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Uzunluk');
    const m = v.yon === 'm' ? x : x * 0.9144;
    const yd = v.yon === 'm' ? x / 0.9144 : x;
    return {
      rows: [
        v.yon === 'm' ? ['Yarda', h.fmt(yd, 4) + ' yd'] : ['Metre', h.fmt(m, 4) + ' m'],
        v.yon === 'm' ? ['Metre', h.fmt(m, 4) + ' m'] : ['Yarda', h.fmt(yd, 4) + ' yd'],
        ['Feet', h.fmt(yd * 3, 4) + ' ft'],
        ['İnç', h.fmt(yd * 36, 3) + ' inç'],
        ['Santimetre', h.fmt(m * 100, 2) + ' cm'],
      ],
      note: '1 yarda = 0,9144 m (tam tanım) = 3 feet = 36 inç.',
    };
  },
  cases: [
    { in: { deger: '100', yon: 'yd' }, out: { 'Metre': '91,44 m', 'Feet': '300 ft', 'Santimetre': '9.144 cm' } },
    { in: { deger: '100', yon: 'm' }, out: { 'Yarda': '109,3613 yd', 'Feet': '328,084 ft' } },
    { in: { deger: '1', yon: 'yd' }, out: { 'Metre': '0,9144 m', 'İnç': '36 inç', 'Santimetre': '91,44 cm' } },
    { in: { deger: '1', yon: 'm' }, out: { 'Yarda': '1,0936 yd', 'İnç': '39,37 inç' } },
    { in: { deger: '1760', yon: 'yd' }, out: { 'Metre': '1.609,344 m', 'Feet': '5.280 ft' } },
    { in: { deger: '22', yon: 'yd' }, out: { 'Metre': '20,1168 m' } },
    { in: { deger: '2,5', yon: 'yd' }, out: { 'Metre': '2,286 m', 'İnç': '90 inç' } },
    { in: { deger: 'yüz', yon: 'yd' }, error: true },
    { in: { deger: '-1', yon: 'm' }, error: true },
  ],
  howto: [
    '"Uzunluk" alanına elinizdeki ölçüyü yazın. Yarım yarda için 0,5 ya da 0.5 yazabilirsiniz.',
    '"Çeviri yönü" listesinde yardadan metreye ya da metreden yardaya seçeneğini belirleyin.',
    '"Çevir" düğmesine basın; ana sonuç ilk satırda, feet, inç ve santimetre karşılıkları altında görünür.',
    'Kumaş ya da malzeme siparişi veriyorsanız sonucu kopyalayıp sipariş notunuza ekleyin.',
  ],
  sections: [
    { h: 'Yarda nasıl bir birimdir?', p: [
      'Yarda (İngilizce "yard", simgesi <strong>yd</strong>), İngiliz-Amerikan ölçü sisteminde metreye en yakın uzunluk birimidir. Bir yarda 3 feet ya da 36 inçtir. 1959\'da yapılan uluslararası anlaşmayla yarda <strong>tam olarak 0,9144 metre</strong> olarak tanımlanmış; feet, inç ve mil gibi diğer birimler de bu değerden türetilmiştir.',
      'Yarda metreden yaklaşık yüzde 8,6 kısadır. Bu fark küçük göründüğü için iki birim çoğu zaman birbirinin yerine kullanılır; oysa 100 yardalık bir mesafe 91,44 metredir ve aradaki 8,56 metre birçok işte göz ardı edilemeyecek kadar büyüktür.',
    ] },
    { h: 'Çeviri formülü', p: [
      'Yardadan metreye: <strong>metre = yarda × 0,9144</strong>. Metreden yardaya: <strong>yarda = metre ÷ 0,9144</strong>; bu bölme, metreyi yaklaşık 1,093613 ile çarpmakla aynı sonucu verir.',
      'Pratik bir tahmin için yardadan metreye geçerken değerin onda birinden biraz azını düşebilirsiniz: 50 yarda için 50 − 4,3 = 45,7 metre. Metreden yardaya geçerken ise yaklaşık onda bir eklersiniz: 50 metre için 50 + 4,7 = 54,7 yarda. Kesin sonuç gerektiğinde tahmin yerine aracın verdiği değeri kullanın.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 – Amerikan futbolu sahası:</strong> Oyun alanının iki gol çizgisi arası 100 yardadır. 100 × 0,9144 = 91,44 metre. Araç aynı sonuçla birlikte 300 feet karşılığını da gösterir.',
      '<strong>Örnek 2 – 100 metre kaç yarda:</strong> 100 ÷ 0,9144 = 109,3613 yarda. Yani 100 metre koşusu, 100 yarda koşusundan 9,36 yarda daha uzundur.',
      '<strong>Örnek 3 – Kumaş siparişi:</strong> Yurt dışındaki bir satıcı kumaşı yarda ile satıyor ve size 2,5 yarda gerekiyor. 2,5 × 0,9144 = 2,286 metre. Dikiş kalıbınız 2,40 metre istiyorsa 2,5 yarda yetmez; 2,40 ÷ 0,9144 = 2,62 yarda ettiği için en az 2,75 ya da 3 yarda sipariş etmeniz gerekir.',
    ] },
    { h: 'Yarda nerelerde kullanılır?', ul: [
      '<strong>Kumaş ve tekstil:</strong> ABD ve İngiltere kaynaklı kumaş, kurdele, dantel ve iplik satışlarında uzunluk yarda ile verilir. Örgü ipliği etiketlerinde yumak uzunluğu çoğu zaman hem metre hem yarda olarak yazılır.',
      '<strong>Golf:</strong> Delik mesafeleri ve sopa menzilleri birçok ülkede yarda ile ifade edilir. 150 yardalık bir vuruş 137,16 metredir.',
      '<strong>Amerikan futbolu:</strong> Saha yarda çizgileriyle bölünür; oyunun tüm istatistikleri yarda üzerinden tutulur.',
      '<strong>Futbol kuralları:</strong> Futbolun saha ölçüleri tarihsel olarak yarda ile belirlenmiştir. Penaltı noktasının kale çizgisine uzaklığı 12 yarda (10,97 m), kale genişliği 8 yardadır (7,32 m); bildiğimiz "11 metre" ve "7,32 metre" değerleri buradan gelir.',
      '<strong>Yüzme:</strong> ABD\'de birçok havuz 25 yarda uzunluğundadır; bu 22,86 metre eder ve 25 metrelik havuzdan kısadır.',
      '<strong>Halı, çim ve bahçe malzemesi:</strong> Yabancı ürün kataloglarında rulo uzunlukları yarda ile yazılabilir.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>1 yd</strong> = 0,9144 m = 91,44 cm',
      '<strong>5 yd</strong> = 4,572 m',
      '<strong>10 yd</strong> = 9,144 m',
      '<strong>50 yd</strong> = 45,72 m',
      '<strong>100 yd</strong> = 91,44 m',
      '<strong>1.760 yd</strong> = 1.609,344 m (1 kara mili)',
      '<strong>1 m</strong> = 1,0936 yd',
      '<strong>10 m</strong> = 10,9361 yd',
      '<strong>50 m</strong> = 54,6807 yd',
      '<strong>100 m</strong> = 109,3613 yd',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'Yardayı metreyle eş saymak en sık yapılan hatadır. Küçük ölçülerde fark önemsiz görünse de uzunluk arttıkça büyür: 20 yardalık bir kumaş topu 18,29 metredir, yani yaklaşık 1,7 metre eksik gelir. İkinci hata, yardakare ve yardaküp gibi alan ve hacim birimlerinde aynı çarpanı kullanmaktır. Bir yardakare 0,8361 metrekare, bir yardaküp 0,7646 metreküptür; uzunluk çarpanı bu birimlerde geçerli değildir.',
      'Kumaş alırken yalnızca uzunluğu değil eni de kontrol edin; yabancı satıcılar eni çoğunlukla inç olarak verir. Araç negatif değer kabul etmez, sonuçları en fazla dört ondalık basamakla gösterir. Sipariş verirken çıkan sonucu satıcının sattığı en küçük birime (çeyrek ya da yarım yarda) yukarı doğru yuvarlamayı unutmayın.',
    ] },
  ],
  faq: [
    ['1 yarda kaç metredir?', '1 yarda tam olarak 0,9144 metredir. Santimetre olarak 91,44 cm, feet olarak 3 feet, inç olarak 36 inç eder.'],
    ['1 metre kaç yardadır?', '1 metre yaklaşık 1,0936 yardadır. Hesap 1 ÷ 0,9144 işlemiyle yapılır; 10 metre 10,9361 yarda eder.'],
    ['100 yarda kaç metre eder?', '100 yarda 91,44 metredir. Amerikan futbolu sahasının gol çizgileri arasındaki mesafe budur.'],
    ['Yarda ile metre arasındaki fark ne kadardır?', 'Bir yarda, bir metreden 8,56 santimetre kısadır. Oran olarak yarda metrenin yüzde 91,44\'üdür. Uzunluk büyüdükçe fark da aynı oranda artar.'],
    ['Kumaşta 1 yarda kaç santimetredir?', 'Kumaş için de aynı tanım geçerlidir: 1 yarda 91,44 santimetredir. Yarım yarda 45,72 cm, çeyrek yarda 22,86 cm eder.'],
    ['Yarda kısaltması nedir?', 'Yarda "yd" kısaltmasıyla gösterilir. Çoğul için "yds" yazıldığı da görülür. Alan için yd², hacim için yd³ kullanılır.'],
    ['Bir mil kaç yardadır?', 'Bir kara mili 1.760 yardadır. Bu da 1.609,344 metreye karşılık gelir. Aracın "Yarda → Metre" yönüne 1760 yazarak bu sonucu doğrulayabilirsiniz.'],
    ['Girdiğim ölçüler saklanıyor mu?', 'Hayır. Çeviri yalnızca tarayıcınızın içinde hesaplanır; yazdığınız değer sunucuya gönderilmez, herhangi bir yerde tutulmaz.'],
  ],
  related: ['metre-feet-cevir', 'cm-inc-cevir', 'km-mil-cevir', 'arsin-metre-cevir', 'metre-santimetre-cevir', 'birim-donustur'],
};
