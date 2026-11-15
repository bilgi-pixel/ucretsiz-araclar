export default {
  slug: 'collatz-dizisi-hesapla',
  title: 'Collatz Dizisi Hesaplama',
  h1Tail: '3n + 1 problemi',
  pageTitle: 'Collatz Dizisi Hesaplama – 3n + 1 Adım Sayısı ve En Yüksek Değer',
  description: 'Bir pozitif tam sayının Collatz (3n + 1) dizisini oluşturun. 1\'e ulaşana kadar geçen adım sayısını, dizinin en yüksek değerini ve tüm terimleri görün.',
  card: 'Bir sayının Collatz (3n + 1) dizisini çıkarın; 1\'e kaç adımda indiğini ve ulaştığı en yüksek değeri görün.',
  category: 'matematik',
  keywords: ['collatz dizisi', 'collatz sanısı', '3n+1 problemi', 'collatz hesaplama', 'dolu tanesi sayıları', 'collatz adım sayısı', 'durma zamanı hesaplama', '3x+1 problemi'],
  lead: 'Bir pozitif tam sayı yazın; araç <strong>Collatz dizisini</strong> 1\'e ulaşana kadar üretir. Toplam adım sayısı (durma zamanı), dizinin çıktığı en yüksek değer ve bütün terimler sırasıyla gösterilir.',
  button: 'Hesapla',
  inputs: [
    { id: 'sayi', label: 'Başlangıç sayısı', type: 'number', placeholder: 'Örn. 27', hint: '1 ile 1.000.000.000.000 arasında bir pozitif tam sayı yazın.' },
  ],
  compute(v, h) {
    const n0 = h.posint(v.sayi, 'Başlangıç sayısı');
    if (n0 > 1e12) h.err('Başlangıç sayısı en fazla 1.000.000.000.000 (bir trilyon) olabilir; daha küçük bir sayı yazın.');
    let n = n0, tepe = n0, cift = 0, tek = 0;
    const dizi = [n0];
    while (n !== 1) {
      if (n % 2 === 0) { n = n / 2; cift++; }
      else {
        if (n > (Number.MAX_SAFE_INTEGER - 1) / 3) h.err('Dizi bu sayı için tam hesaplanamayacak kadar büyük değerlere çıkıyor; daha küçük bir başlangıç sayısı deneyin.');
        n = 3 * n + 1; tek++;
      }
      if (n > tepe) tepe = n;
      dizi.push(n);
      if (dizi.length > 100000) h.err('Dizi 100.000 terimi aştı; daha küçük bir başlangıç sayısı deneyin.');
    }
    const adim = cift + tek;
    return {
      rows: [
        ['Adım sayısı', h.fmt(adim, 0)],
        ['En yüksek değer', h.fmt(tepe, 0)],
        ['Terim sayısı', h.fmt(dizi.length, 0)],
        ['Çift adım (n ÷ 2)', h.fmt(cift, 0)],
        ['Tek adım (3n + 1)', h.fmt(tek, 0)],
        ['Tepe değerin başlangıca oranı', h.fmt(tepe / n0, 2) + ' kat'],
      ],
      text: dizi.join(' → '),
      note: adim === 0 ? 'Başlangıç sayısı zaten 1 olduğu için hiç adım atılmadı.' : 'Dizi 1\'e ulaştığında durdurulur; devam ettirilirse 4 → 2 → 1 döngüsü sonsuza kadar tekrar eder.',
    };
  },
  cases: [
    { in: { sayi: '6' }, out: { 'Adım sayısı': '8', 'En yüksek değer': '16', 'Terim sayısı': '9', 'Çift adım (n ÷ 2)': '6', 'Tek adım (3n + 1)': '2' }, text: '6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1' },
    { in: { sayi: '27' }, out: { 'Adım sayısı': '111', 'En yüksek değer': '9.232', 'Terim sayısı': '112' }, textMatch: '^27 → 82 → 41 → 124 → 62 → 31 → .* → 4 → 2 → 1$' },
    { in: { sayi: '7' }, out: { 'Adım sayısı': '16', 'En yüksek değer': '52', 'Çift adım (n ÷ 2)': '11', 'Tek adım (3n + 1)': '5' }, text: '7 → 22 → 11 → 34 → 17 → 52 → 26 → 13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1' },
    { in: { sayi: '1' }, out: { 'Adım sayısı': '0', 'En yüksek değer': '1', 'Terim sayısı': '1' }, text: '1' },
    { in: { sayi: '12' }, out: { 'Adım sayısı': '9', 'En yüksek değer': '16' } },
    { in: { sayi: '97' }, out: { 'Adım sayısı': '118', 'En yüksek değer': '9.232' } },
    { in: { sayi: '871' }, out: { 'Adım sayısı': '178', 'En yüksek değer': '190.996' } },
    { in: { sayi: '16' }, out: { 'Adım sayısı': '4', 'En yüksek değer': '16', 'Tek adım (3n + 1)': '0', 'Tepe değerin başlangıca oranı': '1 kat' }, text: '16 → 8 → 4 → 2 → 1' },
    { in: { sayi: '0' }, error: true },
    { in: { sayi: '-7' }, error: true },
    { in: { sayi: '2,5' }, error: true },
    { in: { sayi: 'yirmi' }, error: true },
  ],
  howto: [
    '"Başlangıç sayısı" alanına 1 ya da daha büyük bir tam sayı yazın. Ondalıklı ve negatif sayılar kabul edilmez.',
    '"Hesapla" düğmesine basın. Araç kuralı 1\'e ulaşana kadar uygular.',
    'Üst satırlardan adım sayısını, dizinin ulaştığı en yüksek değeri ve kaç adımın çift, kaç adımın tek sayı kuralıyla atıldığını okuyun.',
    'Alttaki kutuda dizinin bütün terimlerini ok işaretleriyle ayrılmış olarak görün; isterseniz "Sonucu kopyala" ile panoya alın.',
  ],
  sections: [
    { h: 'Collatz dizisi nedir?', p: [
      'Collatz dizisi, herhangi bir pozitif tam sayıdan başlayıp iki basit kuralı tekrar tekrar uygulayarak elde edilen sayı dizisidir. Kural şudur: sayı <strong>çiftse ikiye bölünür</strong>, <strong>tekse üçle çarpılıp bir eklenir</strong>. Çıkan sonuca aynı kural yeniden uygulanır ve işlem 1 sayısına ulaşılana kadar sürdürülür.',
      'Problem, 1937\'de bu soruyu ortaya atan Alman matematikçi Lothar Collatz\'ın adını taşır. Kaynaklarda 3n + 1 problemi, 3x + 1 problemi ya da Collatz sanısı adlarıyla da geçer. Dizideki sayılar tıpkı bulut içindeki dolu taneleri gibi defalarca yükselip alçaldıktan sonra yere düştüğü için bu sayılara "dolu tanesi sayıları" da denir.',
    ] },
    { h: 'Çözümlü örnek: 6 ile başlayan dizi', p: [
      'Başlangıç sayısı 6 olsun ve kuralı adım adım uygulayalım.',
    ], ol: [
      '6 çifttir: 6 ÷ 2 = 3',
      '3 tektir: 3 · 3 + 1 = 10',
      '10 çifttir: 10 ÷ 2 = 5',
      '5 tektir: 3 · 5 + 1 = 16',
      '16 çifttir: 16 ÷ 2 = 8, ardından 8 ÷ 2 = 4, 4 ÷ 2 = 2 ve 2 ÷ 2 = 1',
    ] },
    { h: 'Örneğin sonucu nasıl okunur?', p: [
      'Dizi 6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1 biçimindedir. Toplam <strong>8 adım</strong> atılmış, dizi başlangıç dâhil 9 terimden oluşmuştur. Ulaşılan en yüksek değer <strong>16</strong>\'dır. Adımların 6\'sı ikiye bölme, 2\'si üçle çarpıp bir ekleme işlemidir. Araç aynı sayı için tam olarak bu değerleri verir.',
      'Adım sayısına matematik kaynaklarında <em>toplam durma zamanı</em> denir. Tek adımdan sonra gelen sayı her zaman çift olduğundan (tek sayının üç katı tektir, bir eklenince çift olur) bir tek adımın ardından mutlaka en az bir bölme adımı gelir; bu yüzden çift adım sayısı her zaman tek adım sayısından fazladır.',
    ] },
    { h: 'Collatz sanısı: çözülememiş bir problem', p: [
      'Sanı şunu öne sürer: hangi pozitif tam sayıdan başlanırsa başlansın dizi eninde sonunda 1\'e ulaşır. İfadesi ilkokul düzeyinde aritmetikle anlaşılabilen bu iddia, bugüne kadar ne kanıtlanabilmiş ne de çürütülebilmiştir. Bilgisayarlarla çok büyük sayılara kadar yapılan denemelerde sanıya uymayan tek bir örnek bulunamamıştır; ancak sonsuz sayıda tam sayı olduğundan deneme yapmak kanıt yerine geçmez.',
      'Sanının yanlış olması için iki olasılık vardır: ya bir başlangıç sayısı için dizi sınırsız büyüyerek sonsuza gitmelidir ya da dizi 1\'i içermeyen başka bir döngüye girmelidir. Pozitif tam sayılarda bilinen tek döngü 4 → 2 → 1 → 4 döngüsüdür. Bu araç dizi 1\'e ulaştığında durur; kural uygulanmaya devam edilirse bu üç sayı sonsuza kadar tekrarlanır.',
    ] },
    { h: 'İlginç başlangıç sayıları', ul: [
      '<strong>27:</strong> Küçük bir sayı olmasına rağmen 111 adım sürer ve 9.232 değerine kadar tırmanır; yani başlangıç değerinin yaklaşık 342 katına çıkar.',
      '<strong>97:</strong> 100\'den küçük sayılar arasında en uzun diziye sahiptir; 1\'e 118 adımda ulaşır.',
      '<strong>871:</strong> 1000\'den küçük sayılar içinde en çok adım gerektirendir: 178 adım. Dizi 190.996 değerine kadar yükselir.',
      '<strong>2\'nin kuvvetleri:</strong> 16, 64, 1024 gibi sayılar hiç yükselmeden doğrudan iner. 16 için dizi 4 adımda biter ve hiç tek adım içermez.',
      '<strong>7:</strong> 16 adımda 1\'e iner ve en yüksek 52 değerini görür; sınıfta elle denemek için uygun bir örnektir.',
    ] },
    { h: 'Dizinin davranışı neden öngörülemez?', p: [
      'Birbirine çok yakın iki sayının dizileri bambaşka olabilir. 26 sayısı 10 adımda 1\'e inerken hemen yanındaki 27 sayısı 111 adım sürer. Adım sayısı başlangıç sayısıyla düzenli biçimde artmaz; küçük bir sayı çok uzun, büyük bir sayı ise çok kısa bir dizi üretebilir. Örneğin 1024 yalnızca 10 adımda biter.',
      'Bu düzensizliğin kaynağı, bölme ve çarpma kurallarının sayının ikili yazılımındaki basamaklara bağlı olarak karışık bir sırayla devreye girmesidir. Ortalamada her tek adım sayıyı yaklaşık üç katına çıkarır, ardından gelen bölmeler ise onu küçültür; uzun vadede küçülme baskın gibi görünse de bunun her sayı için geçerli olduğu gösterilememiştir. Problem bu yönüyle programlama derslerinde döngü, koşul ve özyineleme konularını anlatmak için de sık kullanılan bir örnektir.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç 1 ile bir trilyon (1.000.000.000.000) arasındaki başlangıç sayılarını kabul eder. Hesaplamada tam sayılar birebir, yuvarlama olmadan işlenir. Dizi sırasında tam olarak gösterilemeyecek kadar büyük bir değere çıkılırsa yanlış sonuç vermek yerine hata bildirilir. Dizideki terimler kopyalamaya uygun olsun diye binlik ayırıcı olmadan, özet satırlarındaki değerler ise binlik noktayla yazılır. Sıfır, negatif sayılar ve ondalıklı sayılar için klasik Collatz kuralı tanımlanmadığından bu girdiler kabul edilmez.',
    ] },
  ],
  faq: [
    ['Collatz dizisi nasıl hesaplanır?', 'Sayı çiftse ikiye bölünür, tekse üçle çarpılıp bir eklenir. Çıkan sayıya aynı kural uygulanır ve 1 elde edilene kadar devam edilir. Örneğin 6 için dizi 6, 3, 10, 5, 16, 8, 4, 2, 1 olur.'],
    ['Collatz sanısı kanıtlandı mı?', 'Hayır. Her pozitif tam sayının eninde sonunda 1\'e ulaştığı iddiası hâlâ kanıtlanmamış ve çürütülmemiştir. Bilgisayarla denenen sayıların tamamı 1\'e ulaşmıştır, ancak bu genel bir kanıt değildir.'],
    ['27 sayısı neden bu kadar ünlüdür?', '27 küçük bir sayı olmasına karşın dizisi 111 adım sürer ve 9.232\'ye kadar yükselir. Komşusu 26 yalnızca 10 adımda biterken 27\'nin bu kadar uzun sürmesi, dizinin öngörülemezliğini gösteren klasik örnektir.'],
    ['Adım sayısı (durma zamanı) ne demektir?', 'Başlangıç sayısından 1\'e ulaşana kadar kuralın kaç kez uygulandığıdır. Başlangıç sayısı adım sayılmaz; bu yüzden terim sayısı adım sayısından bir fazladır. 6 için 8 adım ve 9 terim vardır.'],
    ['Dizi 1\'e ulaştıktan sonra ne olur?', 'Kural uygulanmaya devam edilirse 1 tek olduğu için 4\'e, sonra 2\'ye ve tekrar 1\'e gelinir. Bu 4, 2, 1 döngüsü sonsuza kadar tekrarlar; bu nedenle dizi geleneksel olarak 1\'de bitirilir.'],
    ['Negatif sayılar ya da sıfır için dizi oluşturulabilir mi?', 'Klasik problem yalnızca pozitif tam sayılar için tanımlıdır. Sıfır kendisine dönüşür ve hiç ilerlemez; negatif sayılarda ise 1\'e ulaşmayan farklı döngüler ortaya çıkar. Araç bu nedenle yalnızca 1 ve üzerindeki tam sayıları kabul eder.'],
    ['Dizideki en yüksek değer neyi gösterir?', 'Dizinin 1\'e inmeden önce ulaştığı en büyük sayıdır. Bazı başlangıç değerlerinde bu tepe, başlangıcın yüzlerce katı olabilir. 2\'nin kuvvetlerinde ise dizi hiç yükselmediği için en yüksek değer başlangıç sayısının kendisidir.'],
    ['Yazdığım sayı sunucuya gönderiliyor mu?', 'Hayır. Dizi tarayıcınızda hesaplanır; girdiğiniz sayı ve sonuçlar hiçbir yere iletilmez, kaydedilmez.'],
  ],
  related: ['fibonacci-hesapla', 'asal-sayi-sorgula', 'bolen-hesapla', 'basamak-toplami-hesapla', 'mukemmel-sayi-kontrol'],
};
