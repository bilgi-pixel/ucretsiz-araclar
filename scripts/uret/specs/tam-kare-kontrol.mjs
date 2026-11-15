export default {
  slug: 'tam-kare-kontrol',
  title: 'Tam Kare Sayı Kontrolü',
  h1Tail: 'bu sayı tam kare mi?',
  pageTitle: 'Tam Kare Sayı Kontrolü – Bir Sayı Tam Kare mi, Karekökü Kaç?',
  description: 'Yazdığınız sayının tam kare olup olmadığını kontrol edin. Karekökünü, en yakın alt ve üst tam kareyi ve tam kareye ne kadar uzak olduğunu gösterir.',
  card: 'Bir sayının tam kare olup olmadığını öğrenin; karekökü ve en yakın alt-üst tam karelerle birlikte.',
  category: 'matematik',
  keywords: ['tam kare sayı', 'tam kare kontrolü', 'tam kare mi', 'tam kare sayılar', 'kare sayı nedir', 'en yakın tam kare', 'tam kare sayılar listesi', 'karekök tam sayı mı'],
  lead: 'Bir tam sayı yazın; araç sayının bir tam sayının karesi olup olmadığını, yani <strong>tam kare</strong> olup olmadığını söylesin. Tam kare değilse hangi iki tam karenin arasında kaldığını ve her birine uzaklığını görürsünüz.',
  button: 'Kontrol et',
  inputs: [
    { id: 'n', label: 'Sayı', type: 'number', placeholder: 'Örn. 144', hint: 'Negatif olmayan, en fazla 15 basamaklı tam sayı' },
  ],
  compute(v, h) {
    const n = h.int(v.n, 'Sayı');
    if (n < 0) h.err('Negatif sayılar tam kare olamaz, çünkü hiçbir gerçek sayının karesi negatif değildir. Sıfır ya da pozitif bir tam sayı yazın.');
    if (n > 999999999999999) h.err('Sayı çok büyük; en fazla 15 basamaklı bir tam sayı yazın.');
    // Tam sayı karekök (taban): Math.sqrt sonucunu BigInt ile düzelt
    const N = BigInt(n);
    let k = BigInt(Math.floor(Math.sqrt(n)));
    while (k * k > N) k--;
    while ((k + 1n) * (k + 1n) <= N) k++;
    const g = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const tam = k * k === N;
    const sonBasamak = Number(N % 10n);
    const rows = [];
    if (tam) {
      rows.push(['Sonuç', `${g(N)} tam karedir`]);
      rows.push(['Karekökü', g(k)]);
      rows.push(['Gösterim', `${g(k)}² = ${g(N)}`]);
      rows.push(['Önceki tam kare', k > 0n ? `${g((k - 1n) * (k - 1n))} (${g(k - 1n)}²)` : 'Yok']);
      rows.push(['Sonraki tam kare', `${g((k + 1n) * (k + 1n))} (${g(k + 1n)}²)`]);
      return { rows, note: 'Sayının karekökü bir tam sayı olduğu için tam karedir.' };
    }
    const alt = k * k, ust = (k + 1n) * (k + 1n);
    rows.push(['Sonuç', `${g(N)} tam kare değildir`]);
    rows.push(['Karekökü (yaklaşık)', h.fmt(Math.sqrt(n), 6)]);
    rows.push(['Önceki tam kare', `${g(alt)} (${g(k)}²)`]);
    rows.push(['Sonraki tam kare', `${g(ust)} (${g(k + 1n)}²)`]);
    rows.push(['Önceki tam kareye uzaklık', g(N - alt)]);
    rows.push(['Sonraki tam kareye uzaklık', g(ust - N)]);
    const yasak = [2, 3, 7, 8].includes(sonBasamak);
    return {
      rows,
      note: yasak
        ? `Son rakamı ${sonBasamak} olan hiçbir sayı tam kare olamaz; tam karelerin son rakamı yalnızca 0, 1, 4, 5, 6 ya da 9 olabilir.`
        : `Sayı, art arda gelen ${g(k)}² ile ${g(k + 1n)}² arasında kaldığı için tam kare değildir.`,
    };
  },
  cases: [
    { in: { n: '144' }, out: { 'Sonuç': '144 tam karedir', 'Karekökü': '12', 'Gösterim': '12² = 144', 'Önceki tam kare': '121 (11²)', 'Sonraki tam kare': '169 (13²)' } },
    { in: { n: '150' }, out: { 'Sonuç': '150 tam kare değildir', 'Karekökü (yaklaşık)': '12,247449', 'Önceki tam kare': '144 (12²)', 'Sonraki tam kare': '169 (13²)', 'Önceki tam kareye uzaklık': '6', 'Sonraki tam kareye uzaklık': '19' } },
    { in: { n: '0' }, out: { 'Sonuç': '0 tam karedir', 'Karekökü': '0', 'Önceki tam kare': 'Yok', 'Sonraki tam kare': '1 (1²)' } },
    { in: { n: '1' }, out: { 'Sonuç': '1 tam karedir', 'Karekökü': '1', 'Önceki tam kare': '0 (0²)', 'Sonraki tam kare': '4 (2²)' } },
    { in: { n: '2' }, out: { 'Sonuç': '2 tam kare değildir', 'Karekökü (yaklaşık)': '1,414214', 'Önceki tam kare': '1 (1²)', 'Sonraki tam kare': '4 (2²)' } },
    { in: { n: '1000000' }, out: { 'Sonuç': '1.000.000 tam karedir', 'Karekökü': '1.000', 'Sonraki tam kare': '1.002.001 (1.001²)' } },
    { in: { n: '15241578750190521' , }, error: true },
    { in: { n: '152415765279684' }, out: { 'Sonuç': '152.415.765.279.684 tam karedir', 'Karekökü': '12.345.678' } },
    { in: { n: '152415765279685' }, out: { 'Sonuç': '152.415.765.279.685 tam kare değildir', 'Önceki tam kareye uzaklık': '1' } },
    { in: { n: '-16' }, error: true },
    { in: { n: '6,25' }, error: true },
  ],
  howto: [
    '"Sayı" alanına kontrol etmek istediğiniz tam sayıyı yazın. Sıfır ve pozitif tam sayılar kabul edilir.',
    '"Kontrol et" düğmesine basın. İlk satır sayının tam kare olup olmadığını bildirir.',
    'Sayı tam kareyse karekökünü ve bir önceki ile bir sonraki tam kareyi görürsünüz.',
    'Sayı tam kare değilse yaklaşık karekökü, arasında kaldığı iki tam kare ve her birine olan uzaklık listelenir; sayıyı en az kaç artırıp azaltınca tam kare olacağını buradan okuyabilirsiniz.',
  ],
  sections: [
    { h: 'Tam kare sayı nedir?', p: [
      'Bir tam sayının kendisiyle çarpılmasıyla elde edilen sayıya <strong>tam kare</strong> denir. 12 × 12 = 144 olduğundan 144 bir tam karedir ve karekökü tam olarak 12\'dir. Tam kare olmayan sayıların karekökü ise tam sayı çıkmaz; hatta kesir olarak bile yazılamaz, irrasyoneldir. Örneğin √150 yaklaşık 12,247449\'dur ve ondalık açılımı hiçbir zaman bitmez ya da devretmez.',
      'Ad geometriden gelir: kenar uzunluğu tam sayı olan bir karenin alanı her zaman bir tam karedir. 144 birim karelik alanı 12\'ye 12\'lik düzgün bir kare biçiminde döşeyebilirsiniz; 150 birim kareyi ise eksiksiz bir kare hâline getiremezsiniz.',
    ] },
    { h: 'Kontrol nasıl yapılır?', p: [
      'Araç önce sayının karekökünün tam kısmını bulur, sonra bu tam sayının karesini alıp yazdığınız sayıyla karşılaştırır. İkisi eşitse sayı tam karedir. Karşılaştırma tam sayı aritmetiğiyle yapıldığından on beş basamaklı sayılarda bile yuvarlama hatası oluşmaz; hesap makinesinde ondalıklı sonuca bakarak karar vermekten daha güvenlidir.',
      '<strong>Çözümlü örnek 1:</strong> 144 için karekökün tam kısmı 12\'dir ve 12² = 144 eder. Sayı tam karedir. Bir önceki tam kare 11² = 121, bir sonraki 13² = 169\'dur.',
      '<strong>Çözümlü örnek 2:</strong> 150 için karekökün tam kısmı yine 12\'dir, ancak 12² = 144 ve 13² = 169 olduğundan 150 bu iki tam karenin arasında kalır. 150 − 144 = 6 ve 169 − 150 = 19; yani sayıdan 6 çıkarırsanız ya da sayıya 19 eklerseniz tam kare elde edersiniz. Araç bu iki uzaklığı ayrı satırlarda verir.',
    ] },
    { h: 'Hesap yapmadan eleme: tam karelerin özellikleri', ul: [
      '<strong>Son rakam:</strong> tam karelerin birler basamağı yalnızca 0, 1, 4, 5, 6 ya da 9 olabilir. Sonu 2, 3, 7 ya da 8 ile biten bir sayı kesinlikle tam kare değildir.',
      '<strong>Sondaki sıfırlar:</strong> tam karenin sonundaki sıfır sayısı çifttir. 400 ve 10.000 tam karedir; 1.000 ve 90 değildir.',
      '<strong>Sonu 5 ile bitenler:</strong> sonu 5 olan bir tam karenin son iki rakamı her zaman 25\'tir (225, 625, 1.225…).',
      '<strong>4\'e bölümünden kalan:</strong> tam kareler 4\'e bölündüğünde yalnızca 0 ya da 1 kalanını verir. Kalanı 2 ya da 3 olan sayı tam kare olamaz.',
      '<strong>Rakamlar toplamı:</strong> tam karelerin rakamları tek basamak kalana dek toplandığında sonuç 1, 4, 7 ya da 9 çıkar.',
      '<strong>Asal çarpanlar:</strong> bir sayı ancak asal çarpanlarının bütün üsleri çiftse tam karedir. 144 = 2^4 × 3^2 tam karedir; 72 = 2^3 × 3^2 değildir.',
      '<strong>Bölen sayısı:</strong> pozitif bölenlerinin sayısı tek olan sayılar yalnızca tam karelerdir.',
    ], p: [
      'Bu kuralların çoğu yalnızca eleme yapar: bir sayı testi geçemezse tam kare değildir, ama geçmesi tam kare olduğunu göstermez. Örneğin 19\'un son rakamı 9\'dur, yine de tam kare değildir. Asal çarpan ve bölen sayısı kuralları ise iki yönlü çalışır.',
    ] },
    { h: 'İlk 30 tam kare', p: [
      '1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400, 441, 484, 529, 576, 625, 676, 729, 784, 841, 900. Sıfır da 0² = 0 olduğu için tam kare sayılır. 1 ile 100 arasında on, 1 ile 1.000 arasında otuz bir tam kare vardır; sayılar büyüdükçe tam kareler seyrekleşir.',
    ] },
    { h: 'Art arda gelen tam kareler arasındaki ilişki', p: [
      'İki ardışık tam karenin farkı her zaman tek sayıdır ve <strong>(k + 1)² − k² = 2k + 1</strong> formülüyle bulunur. 12² ile 13² arasındaki fark 2 × 12 + 1 = 25\'tir; gerçekten de 169 − 144 = 25. Bunun bir sonucu olarak ilk n tek sayının toplamı n²\'ye eşittir: 1 + 3 + 5 + 7 = 16 = 4².',
      'Aynı formül, iki ardışık tam kare arasında tam 2k tane tam kare olmayan sayı bulunduğunu da söyler. 144 ile 169 arasında 24 sayı vardır ve hiçbiri tam kare değildir. Sayı ne kadar büyükse en yakın tam kareye uzaklık o kadar büyük olabilir; araçtaki uzaklık satırları bu yüzden kullanışlıdır.',
    ] },
    { h: 'Nerelerde karşınıza çıkar?', p: [
      'Köklü ifadeleri sadeleştirirken kök içindeki sayının tam kare çarpanları dışarı alınır: √72 = √(36 × 2) = 6√2. Pisagor teoremiyle kenar bulurken hipotenüsün karesinin tam kare olup olmadığına bakılır; 3-4-5 ve 5-12-13 üçgenleri bu sayede tam sayı kenarlıdır. İkinci dereceden denklemlerde diskriminant tam kareyse kökler rasyonel çıkar.',
      'Günlük işlerde de aynı soru sorulur: 150 fayansla tam bir kare zemin döşenebilir mi, 400 sandalye eşit sıra ve sütunla kare düzende dizilebilir mi, bir fotoğraf kolajı için kaç görsel gerekir? Cevap, sayının tam kare olup olmadığına bağlıdır.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç sıfır ve pozitif tam sayılarla, en fazla 15 basamağa kadar çalışır. Negatif sayılar gerçek sayılarda tam kare olamayacağı için kabul edilmez. 6,25 gibi ondalıklı sayılar bir kesrin karesi olabilir (2,5² = 6,25), ancak tam kare kavramı tam sayılar için kullanıldığından araç bu girdilerde uyarı verir.',
    ] },
  ],
  faq: [
    ['Bir sayının tam kare olduğunu nasıl anlarım?', 'Karekökünü alın; sonuç tam sayı çıkıyorsa sayı tam karedir. Hesap makinesi olmadan asal çarpanlarına ayırabilirsiniz: bütün üsler çiftse sayı tam karedir.'],
    ['0 ve 1 tam kare midir?', 'Evet. 0 = 0² ve 1 = 1² olduğundan ikisi de tam karedir. 1 aynı zamanda en küçük pozitif tam karedir.'],
    ['Negatif bir sayı tam kare olabilir mi?', 'Hayır. Pozitif ya da negatif hangi gerçek sayının karesini alırsanız alın sonuç negatif olmaz; bu yüzden −16 gibi sayılar tam kare değildir.'],
    ['Tam karelerin son rakamı ne olabilir?', 'Yalnızca 0, 1, 4, 5, 6 ya da 9 olabilir. Sayı 2, 3, 7 ya da 8 ile bitiyorsa hesap yapmadan tam kare olmadığını söyleyebilirsiniz.'],
    ['Tam kare olmayan bir sayının karekökü nasıl bir sayıdır?', 'İrrasyonel bir sayıdır; ondalık açılımı sonsuza kadar sürer ve kendini yinelemez. √2, √3 ve √150 bunun örnekleridir. Araç bu durumda karekökü altı ondalık basamağa yuvarlayarak gösterir.'],
    ['En yakın tam kareyi nasıl bulurum?', 'Sayıyı araca yazın; "Önceki tam kare" ve "Sonraki tam kare" satırlarıyla uzaklıkları karşılaştırın. Uzaklığı küçük olan en yakın tam karedir. 150 için önceki tam kare 144 (uzaklık 6) daha yakındır.'],
    ['Tam kare ile tam küp arasındaki fark nedir?', 'Tam kare bir tam sayının ikinci kuvveti, tam küp ise üçüncü kuvvetidir. 64 hem tam kare (8²) hem tam küptür (4³); 16 yalnızca tam kare, 27 yalnızca tam küptür.'],
    ['Yazdığım sayı saklanıyor mu?', 'Hayır. Kontrol tarayıcınızda yapılır; sayı sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['karekok-hesapla', 'kup-kok-hesapla', 'kare-kup-tablosu', 'asal-carpan-hesapla', 'pisagor-teoremi-hesapla'],
};
