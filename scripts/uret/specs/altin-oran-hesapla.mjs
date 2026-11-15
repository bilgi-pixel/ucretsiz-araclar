export default {
  slug: 'altin-oran-hesapla',
  title: 'Altın Oran Hesaplama',
  h1Tail: 'φ = 1,618',
  pageTitle: 'Altın Oran Hesaplama – Bir Uzunluğu 1,618 Oranında Bölme',
  description: 'Bir uzunluğu altın orana (φ ≈ 1,618) göre bölün ya da bilinen parçadan diğerini bulun. Büyük parça, küçük parça ve toplam uzunluk anında hesaplanır.',
  card: 'Bir uzunluğu altın orana göre ikiye bölün ya da bilinen parçadan diğer parçayı ve toplamı bulun.',
  category: 'matematik',
  keywords: ['altın oran hesaplama', 'altın oran nedir', 'altın oran formülü', '1,618 hesaplama', 'fi sayısı', 'altın dikdörtgen ölçüleri', 'altın oran tasarım', 'altın oran bölme'],
  lead: 'Toplam uzunluğu, büyük parçayı ya da küçük parçayı yazın; araç diğer iki değeri <strong>altın orana</strong> (φ ≈ 1,618034) göre hesaplar. Tasarımda, sayfa düzeninde ve geometri sorularında oranlı ölçü bulmak için kullanabilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'deger', label: 'Bilinen değer', type: 'number', placeholder: 'Örn. 100' },
    { id: 'tur', label: 'Bu değer neyi gösteriyor?', type: 'select', options: [['toplam', 'Toplam uzunluk (a + b)'], ['buyuk', 'Büyük parça (a)'], ['kucuk', 'Küçük parça (b)']] },
  ],
  compute(v, h) {
    const x = h.pos(v.deger, 'Bilinen değer');
    const fi = (1 + Math.sqrt(5)) / 2;
    let a, b;
    if (v.tur === 'buyuk') { a = x; b = x / fi; }
    else if (v.tur === 'kucuk') { b = x; a = x * fi; }
    else { a = x / fi; b = x - a; }
    const rA = ['Büyük parça (a)', h.fmt(a, 4)];
    const rB = ['Küçük parça (b)', h.fmt(b, 4)];
    const rT = ['Toplam (a + b)', h.fmt(a + b, 4)];
    const sira = v.tur === 'buyuk' ? [rB, rT, rA] : v.tur === 'kucuk' ? [rA, rT, rB] : [rA, rB, rT];
    return {
      rows: [
        ...sira,
        ['Oran (a ÷ b)', h.fmt(fi, 6)],
        ['Parçaların payı', '%61,8 büyük, %38,2 küçük'],
      ],
      note: 'Altın oranda (a + b) ÷ a = a ÷ b = φ ≈ 1,618034 eşitliği sağlanır. Sonuçlar dört ondalık basamağa yuvarlanır.',
    };
  },
  cases: [
    { in: { deger: '100', tur: 'toplam' }, out: { 'Büyük parça (a)': '61,8034', 'Küçük parça (b)': '38,1966', 'Toplam (a + b)': '100', 'Oran (a ÷ b)': '1,618034' } },
    { in: { deger: '1', tur: 'kucuk' }, out: { 'Büyük parça (a)': '1,618', 'Toplam (a + b)': '2,618' } },
    { in: { deger: '1', tur: 'buyuk' }, out: { 'Küçük parça (b)': '0,618', 'Toplam (a + b)': '1,618' } },
    { in: { deger: '1920', tur: 'toplam' }, out: { 'Büyük parça (a)': '1.186,6253', 'Küçük parça (b)': '733,3747' } },
    { in: { deger: '1000', tur: 'buyuk' }, out: { 'Küçük parça (b)': '618,034', 'Toplam (a + b)': '1.618,034' } },
    { in: { deger: '1080', tur: 'kucuk' }, out: { 'Büyük parça (a)': '1.747,4767', 'Toplam (a + b)': '2.827,4767' } },
    { in: { deger: '21', tur: 'toplam' }, out: { 'Büyük parça (a)': '12,9787', 'Küçük parça (b)': '8,0213' } },
    { in: { deger: '0', tur: 'toplam' }, error: true },
    { in: { deger: '-5', tur: 'buyuk' }, error: true },
    { in: { deger: 'on', tur: 'kucuk' }, error: true },
  ],
  howto: [
    '"Bilinen değer" alanına elinizdeki uzunluğu, genişliği ya da herhangi bir pozitif ölçüyü yazın. Birim serbesttir: piksel, santimetre ya da metre olabilir.',
    '"Bu değer neyi gösteriyor?" listesinden yazdığınız sayının toplam uzunluk mu, büyük parça mı, yoksa küçük parça mı olduğunu seçin.',
    '"Hesapla" düğmesine basın. Araç eksik olan iki değeri altın orana göre hesaplar ve ilk satırlarda gösterir.',
    'Sonuçları kopyalayıp tasarım programınıza ya da ölçü tablonuza aktarın; piksel gibi tam sayı gerektiren birimlerde en yakın tam sayıya yuvarlayın.',
  ],
  sections: [
    { h: 'Altın oran nedir?', p: [
      'Bir doğru parçası iki parçaya öyle bölünsün ki bütünün büyük parçaya oranı, büyük parçanın küçük parçaya oranına eşit olsun. Bu özel bölünmeye <strong>altın oran</strong> denir. Büyük parça a, küçük parça b ile gösterilirse tanım (a + b) ÷ a = a ÷ b eşitliğidir. Bu eşitliği sağlayan oran tektir ve Yunan alfabesindeki fi harfiyle (φ) gösterilir.',
      'Altın oranın değeri <strong>φ = (1 + √5) ÷ 2 ≈ 1,6180339887</strong> sayısıdır. Ondalık açılımı sonsuza kadar devam eder ve tekrar etmez; yani φ irrasyonel bir sayıdır. Günlük hesaplarda 1,618 yaklaşık değeri yeterlidir. Bu araç hesaplarda sayının tam çift duyarlıklı değerini kullanır ve sonuçları dört ondalık basamağa yuvarlar.',
    ] },
    { h: 'Formül nereden gelir?', p: [
      'Tanımdaki eşitlikte a ÷ b oranına φ denirse (a + b) ÷ a = 1 + b ÷ a = 1 + 1 ÷ φ olur. Eşitliğin iki yanı φ\'ye eşit olduğundan φ = 1 + 1 ÷ φ yazılır. Her iki taraf φ ile çarpılınca <strong>φ² = φ + 1</strong>, yani φ² − φ − 1 = 0 denklemi elde edilir. Bu ikinci dereceden denklemin pozitif kökü (1 + √5) ÷ 2\'dir.',
      'Bu denklemden altın orana özgü iki ilginç özellik çıkar: sayının karesi kendisinden 1 fazladır (φ² ≈ 2,618) ve tersi kendisinden 1 eksiktir (1 ÷ φ ≈ 0,618). Araçta küçük parçaya 1 yazdığınızda büyük parçanın 1,618, toplamın 2,618; büyük parçaya 1 yazdığınızda küçük parçanın 0,618 çıkması bu özelliklerin sonucudur.',
    ], ul: [
      '<strong>Toplam biliniyorsa:</strong> a = toplam ÷ φ ve b = toplam − a',
      '<strong>Büyük parça biliniyorsa:</strong> b = a ÷ φ ve toplam = a · φ',
      '<strong>Küçük parça biliniyorsa:</strong> a = b · φ ve toplam = b · φ²',
    ] },
    { h: 'Çözümlü örnek', p: [
      '100 cm uzunluğundaki bir çıtayı altın orana göre bölmek isteyelim. Büyük parça 100 ÷ 1,618034 = <strong>61,8034 cm</strong>, küçük parça 100 − 61,8034 = <strong>38,1966 cm</strong> olur. Sağlama: 61,8034 ÷ 38,1966 ≈ 1,618 ve 100 ÷ 61,8034 ≈ 1,618; iki oran eşittir.',
      'Bu örnekten akılda kalıcı bir kural çıkar: altın oranda bütünün yaklaşık <strong>%61,8</strong>\'i büyük parçaya, <strong>%38,2</strong>\'si küçük parçaya düşer. Ters yönde bir örnek: kısa kenarı 1080 piksel olan bir altın dikdörtgenin uzun kenarı 1080 · 1,618034 = 1747,4767, yani yaklaşık 1747 piksel olmalıdır.',
    ] },
    { h: 'Fibonacci dizisiyle ilişkisi', p: [
      'Her terimi kendinden önceki iki terimin toplamı olan 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89… dizisine Fibonacci dizisi denir. Bu dizide ardışık iki terimin oranı, terimler büyüdükçe altın orana yaklaşır: 8 ÷ 5 = 1,6; 13 ÷ 8 = 1,625; 21 ÷ 13 ≈ 1,6154; 34 ÷ 21 ≈ 1,6190; 89 ÷ 55 ≈ 1,6182. Oran, φ değerinin bir altında bir üstünde kalarak ona yakınsar.',
      'Bu ilişki pratikte işe yarar: ondalıklı ölçülerle uğraşmak istemediğinizde 5×8, 8×13 ya da 13×21 gibi ardışık Fibonacci sayılarını kenar ölçüsü olarak seçerek altın orana çok yakın bir dikdörtgen elde edersiniz.',
    ] },
    { h: 'Tasarımda ve geometride kullanım', ul: [
      '<strong>Sayfa ve ekran düzeni:</strong> 960 piksel genişliğindeki bir alan, yaklaşık 593 piksellik içerik sütunu ve 367 piksellik yan sütun olarak bölünebilir.',
      '<strong>Tipografi:</strong> Gövde yazısı 16 punto ise başlık için 16 · 1,618 ≈ 26 punto dengeli bir kademe verir.',
      '<strong>Altın dikdörtgen:</strong> Kenarları oranı φ olan dikdörtgendir; içinden bir kare çıkarıldığında kalan parça yine altın dikdörtgen olur.',
      '<strong>Düzgün beşgen:</strong> Düzgün beşgende köşegen uzunluğunun kenar uzunluğuna oranı tam olarak φ\'dir; beş köşeli yıldızın parçaları da birbirini altın oranda böler.',
      '<strong>Fotoğraf ve logo kompozisyonu:</strong> Ana öğeyi çerçeveyi %61,8–%38,2 oranında bölen çizgilere yerleştirmek sık kullanılan bir yöntemdir.',
    ] },
    { h: 'Yaygın yanılgılar ve sınırlar', p: [
      'Altın oran matematiksel olarak kesin tanımlı bir sayıdır; ancak onunla ilgili popüler iddiaların birçoğu abartılıdır. Tarihî yapıların, sanat eserlerinin ya da insan vücudunun "tam altın oranda" olduğu yönündeki söylemler çoğunlukla seçilmiş ölçümlere dayanır ve ölçüm noktasına göre sonuç değişir. Altın oranı bir güzellik garantisi olarak değil, dengeli oran elde etmeye yardımcı bir başlangıç noktası olarak görmek daha doğrudur.',
      'Sık yapılan bir hesap hatası, toplamı ikiye bölmek yerine 1,618\'e bölüp çıkan sonucu küçük parça sanmaktır; toplam ÷ φ işlemi <em>büyük</em> parçayı verir. Bir diğeri, 16:9 ekran oranını altın oran sanmaktır; 16 ÷ 9 ≈ 1,778 olup altın orandan belirgin biçimde farklıdır, 16:10 oranı (1,6) ise ona daha yakındır. Araç yalnızca pozitif değer kabul eder ve birim dönüşümü yapmaz; sonuç, girdiğiniz değerle aynı birimdedir.',
    ] },
  ],
  faq: [
    ['Altın oran kaçtır?', 'Altın oran φ = (1 + √5) ÷ 2 sayısıdır ve yaklaşık değeri 1,618034\'tür. İrrasyonel olduğu için ondalık açılımı sonsuzdur ve tekrar etmez; pratikte 1,618 kullanılır.'],
    ['Bir uzunluk altın orana göre nasıl bölünür?', 'Uzunluk 1,618\'e bölünerek büyük parça bulunur; kalan kısım küçük parçadır. 100 birimlik uzunluk için büyük parça 61,8034, küçük parça 38,1966 birimdir.'],
    ['Altın dikdörtgenin kenarları nasıl hesaplanır?', 'Kısa kenar biliniyorsa 1,618 ile çarpılarak uzun kenar, uzun kenar biliniyorsa 1,618\'e bölünerek kısa kenar bulunur. Araçta kısa kenarı "küçük parça", uzun kenarı "büyük parça" olarak girebilirsiniz.'],
    ['Altın oran ile Fibonacci dizisinin ilgisi nedir?', 'Fibonacci dizisinde ardışık terimlerin oranı terimler büyüdükçe altın orana yaklaşır. Örneğin 89 ÷ 55 ≈ 1,6182\'dir. Bu yüzden 8×13 ya da 13×21 gibi ölçüler altın dikdörtgene çok yakındır.'],
    ['0,618 ve 2,618 sayıları nereden geliyor?', 'Altın oranın tersi 1 ÷ φ ≈ 0,618 ve karesi φ² ≈ 2,618\'dir. φ² = φ + 1 eşitliği nedeniyle bu üç sayının ondalık kısımları aynıdır. Büyük parçadan küçüğe geçerken 0,618 ile çarpılır.'],
    ['Altın oran simgesi nedir?', 'Yunan alfabesindeki fi harfi (φ) kullanılır. Türkçe kaynaklarda "fi sayısı" olarak da geçer. Tersi olan 0,618 değeri için ayrı bir simge kullanılıp kullanılmadığı kaynaktan kaynağa değişir; karışıklık olmaması için sayının kendisini yazmak en güvenli yoldur.'],
    ['Sonuçları piksel olarak kullanırken nasıl yuvarlamalıyım?', 'Ekran ölçülerinde kesirli piksel kullanılmadığı için sonucu en yakın tam sayıya yuvarlayın ve iki parçanın toplamının bütünü verdiğini kontrol edin. Örneğin 1920 piksel için 1187 ve 733 değerleri uygundur.'],
    ['Yazdığım değerler kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; girdiğiniz ölçü sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['fibonacci-hesapla', 'oran-sadelestir', 'diskriminant-hesapla', 'karekok-hesapla', 'geometrik-dizi-hesapla'],
};
