export default {
  slug: 'mutlak-deger-hesapla',
  title: 'Mutlak Değer Hesaplama',
  h1Tail: '|a| ve |a − b|',
  pageTitle: 'Mutlak Değer Hesaplama – |a|, |a − b| Uzaklığı ve Özellikleri',
  description: 'Bir sayının mutlak değerini bulun; ikinci bir sayı yazarsanız aralarındaki uzaklığı |a − b|, |a + b| ve |a| + |b| değerlerini karşılaştırmalı görün.',
  card: 'Bir sayının mutlak değerini, iki sayı arasındaki uzaklığı ve üçgen eşitsizliğinin iki yanını tek adımda görün.',
  category: 'matematik',
  keywords: ['mutlak değer hesaplama', 'mutlak değer nedir', 'mutlak değer bulma', 'iki sayı arasındaki uzaklık', 'mutlak değer özellikleri', 'negatif sayının mutlak değeri', 'üçgen eşitsizliği'],
  lead: 'Bir sayının sayı doğrusunda sıfıra olan uzaklığını, yani <strong>mutlak değerini</strong> hesaplayın. İkinci bir sayı da yazarsanız araç iki sayı arasındaki uzaklığı ve mutlak değerin toplama ile çarpma karşısındaki davranışını da gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'a', label: 'Sayı (a)', type: 'number', placeholder: 'Örn. -7,5' },
    { id: 'b', label: 'İkinci sayı (b) – isteğe bağlı', type: 'number', placeholder: 'Örn. 4', hint: 'Boş bırakırsanız yalnızca |a| hesaplanır' },
  ],
  compute(v, h) {
    const a = h.num(v.a, 'Sayı (a)');
    const f = (x) => h.fmt(x, 10);
    const isaret = (x) => (x > 0 ? 'Pozitif' : x < 0 ? 'Negatif' : 'Sıfır (işaretsiz)');
    const rows = [
      ['Mutlak değer |a|', f(Math.abs(a))],
      ['a sayısının işareti', isaret(a)],
      ['Ters işaretlisi (−a)', f(-a)],
    ];
    let note = a < 0
      ? 'a negatif olduğu için |a| = −a kuralı uygulandı: işaret değişti.'
      : 'a negatif olmadığı için |a| = a; sayı olduğu gibi kaldı.';
    if (String(v.b ?? '').trim() !== '') {
      const b = h.num(v.b, 'İkinci sayı (b)');
      const top = Math.abs(a + b);
      const ayri = Math.abs(a) + Math.abs(b);
      rows.push(
        ['Mutlak değer |b|', f(Math.abs(b))],
        ['Aradaki uzaklık |a − b|', f(Math.abs(a - b))],
        ['Toplamın mutlak değeri |a + b|', f(top)],
        ['Mutlak değerlerin toplamı |a| + |b|', f(ayri)],
        ['Çarpımın mutlak değeri |a × b|', f(Math.abs(a * b))],
      );
      note = Math.abs(top - ayri) < 1e-12
        ? 'Sayılar aynı işaretli (ya da biri sıfır) olduğu için |a + b| = |a| + |b| eşitliği sağlandı.'
        : 'Sayılar zıt işaretli olduğu için |a + b| < |a| + |b| çıktı (üçgen eşitsizliği).';
    }
    return { rows, note };
  },
  cases: [
    { in: { a: '-7,5' }, out: { 'Mutlak değer |a|': '7,5', 'a sayısının işareti': 'Negatif', 'Ters işaretlisi (−a)': '7,5' } },
    { in: { a: '-3', b: '5' }, out: { 'Mutlak değer |a|': '3', 'Mutlak değer |b|': '5', 'Aradaki uzaklık |a − b|': '8', 'Toplamın mutlak değeri |a + b|': '2', 'Mutlak değerlerin toplamı |a| + |b|': '8', 'Çarpımın mutlak değeri |a × b|': '15' } },
    { in: { a: '12' }, out: { 'Mutlak değer |a|': '12', 'a sayısının işareti': 'Pozitif', 'Ters işaretlisi (−a)': '-12' } },
    { in: { a: '0' }, out: { 'Mutlak değer |a|': '0', 'a sayısının işareti': 'Sıfır (işaretsiz)', 'Ters işaretlisi (−a)': '0' } },
    { in: { a: '-3,7', b: '1,2' }, out: { 'Aradaki uzaklık |a − b|': '4,9', 'Toplamın mutlak değeri |a + b|': '2,5', 'Mutlak değerlerin toplamı |a| + |b|': '4,9' } },
    { in: { a: '-4', b: '-9' }, out: { 'Aradaki uzaklık |a − b|': '5', 'Toplamın mutlak değeri |a + b|': '13', 'Mutlak değerlerin toplamı |a| + |b|': '13', 'Çarpımın mutlak değeri |a × b|': '36' } },
    { in: { a: '-1250,75' }, out: { 'Mutlak değer |a|': '1.250,75' } },
    { in: { a: 'eksi beş' }, error: true },
    { in: { a: '' }, error: true },
    { in: { a: '3', b: 'x' }, error: true },
  ],
  howto: [
    '"Sayı (a)" alanına mutlak değerini bulmak istediğiniz sayıyı yazın. Negatif sayılar için başına eksi işareti koyun; ondalık ayırıcı olarak virgül ya da nokta kullanabilirsiniz.',
    'İki sayı arasındaki uzaklığı ya da |a + b| gibi ifadeleri de görmek istiyorsanız "İkinci sayı (b)" alanını doldurun; istemiyorsanız boş bırakın.',
    '"Hesapla" düğmesine basın. İlk satır |a| değeridir; ardından sayının işareti ve ters işaretlisi gelir.',
    'İkinci sayı yazdıysanız |a − b|, |a + b|, |a| + |b| ve |a × b| satırlarını karşılaştırın; sonucun altındaki not, toplamda eşitlik mi eşitsizlik mi oluştuğunu açıklar.',
  ],
  sections: [
    { h: 'Mutlak değer nedir?', p: [
      'Bir sayının mutlak değeri, o sayının sayı doğrusu üzerinde sıfır noktasına olan uzaklığıdır. Uzaklık yön taşımadığı için mutlak değer hiçbir zaman negatif olmaz. Sayı iki dik çizgi arasına alınarak gösterilir: <strong>|−7| = 7</strong> ve <strong>|7| = 7</strong>. Hem −7 hem 7 sıfırdan yedi birim uzakta olduğundan mutlak değerleri aynıdır.',
      'Cebirsel tanım iki parçalıdır: a sıfır ya da pozitifse <strong>|a| = a</strong>, a negatifse <strong>|a| = −a</strong>. İkinci satırdaki eksi işareti sonucu negatif yapmaz; tersine, zaten negatif olan sayının işaretini çevirip pozitif hâle getirir. Örneğin a = −7,5 için |a| = −(−7,5) = 7,5 bulunur. Araç hangi kuralın uygulandığını sonuç notunda belirtir.',
    ] },
    { h: 'İki sayı arasındaki uzaklık: |a − b|', p: [
      'Mutlak değerin en sık kullanıldığı yer iki değer arasındaki farkın büyüklüğünü bulmaktır. Sayı doğrusunda a ile b arasındaki uzaklık <strong>|a − b|</strong> ifadesidir ve sayıların hangi sırayla yazıldığından etkilenmez: |a − b| = |b − a|.',
      '<strong>Çözümlü örnek:</strong> a = −3 ve b = 5 olsun. a − b = −3 − 5 = −8, mutlak değeri 8\'dir. Gerçekten de −3\'ten 0\'a üç birim, 0\'dan 5\'e beş birim vardır; toplam uzaklık 8 birimdir. Aynı sayılar için |a + b| = |2| = 2, |a| + |b| = 3 + 5 = 8 ve |a × b| = |−15| = 15 çıkar. Bu değerleri araca −3 ve 5 yazarak doğrulayabilirsiniz.',
      'Gündelik hayatta bu hesap çok yaygındır: gece −4 °C, gündüz 9 °C ölçülen bir günde sıcaklık farkı |−4 − 9| = 13 derecedir. Deniz seviyesinin 28 metre altındaki bir dalgıç ile 15 metre yükseklikteki bir iskele arasındaki düşey mesafe |−28 − 15| = 43 metredir. Bir ölçümün hedeften sapması, bir tahminin gerçek değerden farkı ya da bir hesabın borç-alacak durumundan bağımsız büyüklüğü de mutlak değerle ifade edilir.',
    ] },
    { h: 'Mutlak değerin temel özellikleri', ul: [
      '<strong>Negatif olmaz:</strong> her a için |a| ≥ 0\'dır; |a| = 0 yalnızca a = 0 iken sağlanır.',
      '<strong>Simetri:</strong> |−a| = |a|. Bir sayı ile ters işaretlisinin mutlak değeri eşittir.',
      '<strong>Çarpma:</strong> |a × b| = |a| × |b|. Mutlak değer çarpmanın üzerine dağılır.',
      '<strong>Bölme:</strong> b sıfırdan farklıysa |a ÷ b| = |a| ÷ |b|.',
      '<strong>Üçgen eşitsizliği:</strong> |a + b| ≤ |a| + |b|. Eşitlik yalnızca sayılar aynı işaretliyse ya da biri sıfırsa olur.',
      '<strong>Kare ve karekök:</strong> |a|² = a² ve √(a²) = |a|. Bir sayının karesinin karekökü sayının kendisi değil, mutlak değeridir.',
      '<strong>Üs:</strong> |aⁿ| = |a|ⁿ.',
    ] },
    { h: 'Toplamada neden eşitlik bozulur?', p: [
      'Öğrencilerin en çok takıldığı nokta, mutlak değerin toplama üzerine dağılmamasıdır. Aynı işaretli iki sayı sayı doğrusunda aynı yöne gider; uzaklıkları üst üste eklenir ve |a + b| = |a| + |b| olur. Örneğin −4 ile −9 için |−13| = 13 ve 4 + 9 = 13 çıkar.',
      'Zıt işaretli sayılar ise birbirini kısmen götürür. −3,7 ile 1,2 toplandığında −2,5 elde edilir; mutlak değeri 2,5\'tir. Ayrı ayrı mutlak değerlerin toplamı ise 3,7 + 1,2 = 4,9\'dur. Yani 2,5 < 4,9. Araç iki satırı yan yana verdiği için hangi durumda olduğunuzu hemen görürsünüz.',
    ] },
    { h: 'Mutlak değerli denklem ve eşitsizliklere kısa bakış', p: [
      '<strong>|x| = 5</strong> denkleminin iki çözümü vardır: x = 5 ve x = −5, çünkü ikisi de sıfıra beş birim uzaklıktadır. <strong>|x − 2| = 5</strong> ise "x\'in 2\'ye uzaklığı 5 birimdir" diye okunur; çözümler 2 + 5 = 7 ve 2 − 5 = −3 olur. Sağ taraf negatifse, örneğin |x| = −4, denklemin çözümü yoktur; çünkü uzaklık negatif olamaz.',
      'Eşitsizliklerde <strong>|x| < 3</strong> ifadesi −3 < x < 3 aralığını, <strong>|x| > 3</strong> ifadesi ise x < −3 ya da x > 3 bölgelerini anlatır. Bu sayfa denklem çözmez; ancak bulduğunuz kökleri yerine koyup mutlak değeri kontrol etmek için kullanabilirsiniz.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      '<strong>|a| = −a kuralındaki eksiyi sonuca taşımak.</strong> a = −6 ise −a = 6\'dır; sonuç yine pozitiftir.',
      '<strong>Bilinmeyen içeren ifadede çizgileri doğrudan kaldırmak.</strong> |x − 4| ifadesi x ≥ 4 ise x − 4, x < 4 ise 4 − x olarak açılır.',
      '<strong>|a − b| yerine |a| − |b| yazmak.</strong> −3 ile 5 için birincisi 8, ikincisi −2\'dir; uzaklık negatif çıkamaz.',
      '<strong>√(x²) = x sanmak.</strong> x = −9 için √81 = 9\'dur, yani |x|.',
      '<strong>Eksi işaretini mutlak değerin dışında unutmak.</strong> −|−5| ifadesi −5\'e eşittir; önce içerideki mutlak değer alınır, sonra dıştaki eksi uygulanır.',
    ] },
    { h: 'Araç hakkında notlar', p: [
      'Araç reel sayılarla çalışır; tam sayı, ondalıklı sayı ve negatif değerler kabul edilir. Sonuçlar en fazla on ondalık basamakla ve Türkçe sayı biçimiyle (binlik nokta, ondalık virgül) gösterilir. Karmaşık sayıların modülü ya da vektör uzunluğu gibi genelleştirilmiş mutlak değer kavramları bu aracın kapsamı dışındadır.',
    ] },
  ],
  faq: [
    ['Mutlak değer negatif olabilir mi?', 'Hayır. Mutlak değer bir uzaklık ölçüsüdür ve en küçük değeri sıfırdır. |a| ifadesi yalnızca a = 0 olduğunda 0, diğer bütün durumlarda pozitiftir.'],
    ['Sıfırın mutlak değeri kaçtır?', '|0| = 0\'dır. Sıfır kendisine sıfır birim uzaklıktadır; ayrıca ne pozitif ne negatif olduğu için işaretsiz kabul edilir.'],
    ['İki sayı arasındaki uzaklığı nasıl bulurum?', 'Sayıları birbirinden çıkarıp sonucun mutlak değerini alırsınız: uzaklık = |a − b|. Sıra önemli değildir. −3 ile 5 arasındaki uzaklık |−3 − 5| = 8 birimdir.'],
    ['|a + b| ile |a| + |b| her zaman eşit midir?', 'Hayır. Sayılar aynı işaretliyse ya da biri sıfırsa eşittir; zıt işaretliyse |a + b| daha küçüktür. Bu ilişkiye üçgen eşitsizliği denir: |a + b| ≤ |a| + |b|.'],
    ['Mutlak değer çarpmaya dağılır mı?', 'Evet. |a × b| = |a| × |b| her zaman doğrudur. Örneğin |−3 × 5| = 15 ve |−3| × |5| = 3 × 5 = 15\'tir. Aynı kural bölme için de geçerlidir.'],
    ['Ondalıklı ve kesirli sayıların mutlak değeri nasıl alınır?', 'Kural değişmez: sayı negatifse işareti atılır, değilse aynen kalır. |−2,75| = 2,75 ve |−3/4| = 3/4\'tür. Kesirleri araca ondalık karşılığıyla (örneğin −0,75) yazabilirsiniz.'],
    ['Mutlak değer günlük hayatta nerede kullanılır?', 'Sıcaklık farkı, yükseklik farkı, ölçüm hatası, tahmin sapması, tolerans ve iki nokta arasındaki mesafe gibi yönü önemsiz olan büyüklüklerde kullanılır. İstatistikteki ortalama mutlak sapma da bu kavrama dayanır.'],
    ['Girdiğim sayılar saklanıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız sayılar hiçbir sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['hesap-makinesi', 'karekok-hesapla', 'yuzde-fark-hesapla', 'iki-nokta-arasi-uzaklik', 'yuvarlama-hesapla'],
};
