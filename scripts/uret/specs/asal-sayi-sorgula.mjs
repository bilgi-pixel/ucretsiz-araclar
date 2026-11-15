export default {
  slug: 'asal-sayi-sorgula',
  title: 'Asal Sayı Sorgulama',
  h1Tail: 'bu sayı asal mı?',
  pageTitle: 'Asal Sayı Sorgulama – Bir Sayı Asal mı, Değilse Çarpanları Ne?',
  description: 'Yazdığınız sayının asal olup olmadığını anında öğrenin. Asal değilse en küçük bölenini ve asal çarpanlarını, ayrıca önceki ve sonraki asal sayıyı gösterir.',
  card: 'Bir sayının asal olup olmadığını sorgulayın; değilse çarpanlarını, önceki ve sonraki asal sayıyı görün.',
  category: 'matematik',
  keywords: ['asal sayı sorgulama', 'asal mı', 'asal sayı kontrolü', 'asal sayı nedir', '1 asal mı', 'asal sayı bulma', 'sonraki asal sayı', 'asal sayı testi'],
  lead: 'Bir tam sayı yazın; araç sayının <strong>asal</strong> mı yoksa <strong>bileşik</strong> mi olduğunu söylesin. Asal değilse hangi sayıya bölündüğünü ve asal çarpanlara ayrılmış hâlini, her durumda da kendisinden önceki ve sonraki asal sayıyı görürsünüz.',
  button: 'Sorgula',
  inputs: [
    { id: 'n', label: 'Sayı', type: 'number', placeholder: 'Örn. 97', hint: '0 ile 1.000.000.000.000 (bir trilyon) arasında tam sayı' },
  ],
  compute(v, h) {
    const n = h.int(v.n, 'Sayı');
    if (n < 0) h.err('Asallık yalnızca pozitif tam sayılar için tanımlıdır; negatif olmayan bir tam sayı yazın.');
    if (n > 1e12) h.err('Bu araç en fazla 1.000.000.000.000 (bir trilyon) değerine kadar sorgular; daha küçük bir sayı yazın.');
    // m ≥ 2 için en küçük asal bölen (m asalsa kendisi)
    const enKucukBolen = (m) => {
      if (m % 2 === 0) return 2;
      if (m % 3 === 0) return 3;
      for (let i = 5; i * i <= m; i += 6) {
        if (m % i === 0) return i;
        if (m % (i + 2) === 0) return i + 2;
      }
      return m;
    };
    const asalMi = (m) => m >= 2 && enKucukBolen(m) === m;
    const f = (x) => h.fmt(x, 0);
    const rows = [];
    let note;
    if (n < 2) {
      rows.push(['Sonuç', `${n} asal değil (ne asal ne bileşik)`]);
      note = n === 0
        ? '0 sayısı her pozitif tam sayıya bölünür, bu yüzden asal sayılmaz; bileşik sayı tanımına da girmez.'
        : '1 sayısının yalnızca bir pozitif böleni vardır; asal sayıların ise tam iki böleni olmalıdır.';
    } else {
      const ilk = enKucukBolen(n);
      if (ilk === n) {
        rows.push(['Sonuç', `${f(n)} asal sayıdır`]);
        rows.push(['Pozitif bölenleri', `1 ve ${f(n)}`]);
      } else {
        rows.push(['Sonuç', `${f(n)} asal değil (bileşik sayı)`]);
        rows.push(['En küçük asal böleni', f(ilk)]);
        const parcalar = [];
        let kalan = n;
        while (kalan > 1) {
          const p = enKucukBolen(kalan);
          let us = 0;
          while (kalan % p === 0) { kalan /= p; us++; }
          parcalar.push(us > 1 ? `${f(p)}^${us}` : f(p));
        }
        rows.push(['Asal çarpanları', parcalar.join(' × ')]);
      }
      rows.push(['Denenen en büyük bölen sınırı (√n)', f(Math.floor(Math.sqrt(n) + 1e-9))]);
      note = ilk === n
        ? 'Sayı, karekökünü aşmayan hiçbir asal sayıya bölünmediği için asaldır.'
        : `Sayı ${f(ilk)} ile tam bölündüğü için asal değildir: ${f(n)} = ${f(ilk)} × ${f(n / ilk)}.`;
    }
    let onceki = n - 1;
    while (onceki >= 2 && !asalMi(onceki)) onceki--;
    let sonraki = Math.max(n + 1, 2);
    while (!asalMi(sonraki)) sonraki++;
    rows.push(['Önceki asal sayı', onceki >= 2 ? f(onceki) : 'Yok']);
    rows.push(['Sonraki asal sayı', f(sonraki)]);
    return { rows, note };
  },
  cases: [
    { in: { n: '97' }, out: { 'Sonuç': '97 asal sayıdır', 'Pozitif bölenleri': '1 ve 97', 'Denenen en büyük bölen sınırı (√n)': '9', 'Önceki asal sayı': '89', 'Sonraki asal sayı': '101' } },
    { in: { n: '91' }, out: { 'Sonuç': '91 asal değil (bileşik sayı)', 'En küçük asal böleni': '7', 'Asal çarpanları': '7 × 13', 'Önceki asal sayı': '89', 'Sonraki asal sayı': '97' } },
    { in: { n: '1' }, out: { 'Sonuç': '1 asal değil (ne asal ne bileşik)', 'Önceki asal sayı': 'Yok', 'Sonraki asal sayı': '2' } },
    { in: { n: '2' }, out: { 'Sonuç': '2 asal sayıdır', 'Önceki asal sayı': 'Yok', 'Sonraki asal sayı': '3' } },
    { in: { n: '360' }, out: { 'Sonuç': '360 asal değil (bileşik sayı)', 'En küçük asal böleni': '2', 'Asal çarpanları': '2^3 × 3^2 × 5', 'Önceki asal sayı': '359', 'Sonraki asal sayı': '367' } },
    { in: { n: '561' }, out: { 'Asal çarpanları': '3 × 11 × 17' } },
    { in: { n: '1000000007' }, out: { 'Sonuç': '1.000.000.007 asal sayıdır', 'Önceki asal sayı': '999.999.937', 'Sonraki asal sayı': '1.000.000.009' } },
    { in: { n: '1000000000000' }, out: { 'Asal çarpanları': '2^12 × 5^12', 'Önceki asal sayı': '999.999.999.989', 'Sonraki asal sayı': '1.000.000.000.039' } },
    { in: { n: '0' }, out: { 'Sonuç': '0 asal değil (ne asal ne bileşik)', 'Sonraki asal sayı': '2' } },
    { in: { n: '-7' }, error: true },
    { in: { n: '3,5' }, error: true },
    { in: { n: '10000000000000' }, error: true },
  ],
  howto: [
    '"Sayı" alanına sorgulamak istediğiniz tam sayıyı yazın. Bir trilyona kadar olan değerler desteklenir.',
    '"Sorgula" düğmesine basın. İlk satır sayının asal olup olmadığını açıkça söyler.',
    'Sayı asal değilse "En küçük asal böleni" ve "Asal çarpanları" satırlarına bakın; üslü çarpanlar 2^3 biçiminde yazılır.',
    '"Önceki asal sayı" ve "Sonraki asal sayı" satırlarıyla, yazdığınız sayıya en yakın asalları bulun. Sonucu "Sonucu kopyala" düğmesiyle panoya alabilirsiniz.',
  ],
  sections: [
    { h: 'Asal sayı nedir?', p: [
      'Asal sayı, 1\'den büyük olan ve yalnızca 1\'e ve kendisine tam bölünebilen doğal sayıdır. Başka bir deyişle tam <strong>iki</strong> pozitif böleni olan sayılara asal denir. 2, 3, 5, 7, 11 ve 13 ilk asal sayılardır. 1\'den büyük olup asal olmayan sayılara <strong>bileşik sayı</strong> adı verilir; bunlar kendilerinden küçük en az iki sayının çarpımı olarak yazılabilir. Örneğin 91 ilk bakışta asal gibi görünse de 7 × 13 olduğu için bileşiktir.',
      'Asal sayılar aritmetiğin yapı taşlarıdır. Aritmetiğin temel teoremine göre 1\'den büyük her tam sayı, sıra dışında tek bir biçimde asal sayıların çarpımı olarak yazılır. 360 sayısı 2^3 × 3^2 × 5 biçiminde ayrışır ve bu ayrışım başka asallarla yapılamaz. Araç bileşik sayılarda bu ayrışımı da gösterir.',
    ] },
    { h: '0, 1 ve 2 hakkında merak edilenler', p: [
      '<strong>1 asal değildir.</strong> Yalnızca tek bir pozitif böleni vardır; tanım ise iki farklı bölen ister. 1 asal sayılsaydı asal çarpanlara ayırmanın tekliği de bozulurdu, çünkü her ayrışıma dilediğiniz kadar 1 ekleyebilirdiniz. 1 aynı zamanda bileşik de değildir.',
      '<strong>0 asal değildir.</strong> Sıfır bütün pozitif tam sayılara bölünür; dolayısıyla sonsuz sayıda böleni vardır. Negatif sayılar için de okul matematiğinde asallıktan söz edilmez.',
      '<strong>2 tek çift asal sayıdır.</strong> 2\'den büyük her çift sayı 2\'ye bölündüğü için bileşiktir. Bu yüzden 2 dışındaki bütün asallar tektir; ancak her tek sayı asal değildir (9, 15, 21, 25…).',
    ] },
    { h: 'Bir sayının asal olup olmadığı nasıl anlaşılır?', p: [
      'En yalın yöntem deneme bölmesidir: sayı, kendisinden küçük asallara sırayla bölünür. Bütün asalları denemeye gerek yoktur; <strong>sayının kareköküne kadar</strong> olanlar yeterlidir. Çünkü n = a × b ise çarpanlardan en az biri √n\'den büyük olamaz; ikisi de büyük olsaydı çarpımları n\'yi aşardı.',
      '<strong>Çözümlü örnek 1:</strong> 97 asal mı? √97 yaklaşık 9,85 olduğundan 9\'a kadar olan asallar, yani 2, 3, 5 ve 7 denenir. 97 tektir; rakamları toplamı 16 olduğu için 3\'e bölünmez; son rakamı 0 ya da 5 olmadığı için 5\'e bölünmez; 7 × 13 = 91 ve 7 × 14 = 98 olduğundan 7\'ye de bölünmez. Hiçbirine bölünmediği için 97 asaldır. Araç da aynı sonucu verir ve önceki asalı 89, sonraki asalı 101 olarak gösterir.',
      '<strong>Çözümlü örnek 2:</strong> 91 asal mı? √91 yaklaşık 9,5\'tir. 2, 3 ve 5\'e bölünmez; ancak 91 ÷ 7 = 13 tam çıkar. Öyleyse 91 = 7 × 13 bileşik bir sayıdır.',
      'Araç bu yöntemi hızlandırılmış biçimde uygular: önce 2 ve 3\'e, ardından yalnızca 6\'nın katlarının bir eksiği ve bir fazlası olan sayılara (5, 7, 11, 13, 17, 19…) böler. 3\'ten büyük bütün asallar bu kalıptadır, dolayısıyla hiçbir asal bölen atlanmaz. Bir trilyonluk sayının karekökü bir milyon olduğundan en kötü durumda bile hesap anında biter.',
    ] },
    { h: 'Hızlı eleme için bölünebilme kuralları', ul: [
      '<strong>2:</strong> son rakam çiftse (0, 2, 4, 6, 8) sayı 2\'ye bölünür.',
      '<strong>3:</strong> rakamları toplamı 3\'ün katıysa sayı 3\'e bölünür.',
      '<strong>5:</strong> son rakam 0 ya da 5 ise sayı 5\'e bölünür.',
      '<strong>7:</strong> son rakamın iki katı kalan sayıdan çıkarılır; sonuç 7\'nin katıysa sayı 7\'ye bölünür (91 için 9 − 2 = 7).',
      '<strong>11:</strong> rakamlar sırayla bir artı bir eksi işaretle toplanır; sonuç 0 ya da 11\'in katıysa sayı 11\'e bölünür.',
      '<strong>13:</strong> son rakamın dört katı kalan sayıya eklenir; sonuç 13\'ün katıysa sayı 13\'e bölünür.',
    ] },
    { h: '100\'e kadar olan asal sayılar', p: [
      '1 ile 100 arasında tam 25 asal sayı vardır: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89 ve 97. Asallar büyüdükçe seyrekleşir; 1000\'e kadar 168, bir milyona kadar 78.498 asal bulunur. Yine de asal sayılar hiçbir zaman bitmez; bu, Öklid\'in iki bin yılı aşkın süre önce verdiği ünlü ispatla bilinir.',
      'Aralarındaki fark 2 olan asal çiftlerine <strong>ikiz asallar</strong> denir: 11 ile 13, 17 ile 19, 1.000.000.007 ile 1.000.000.009 gibi. İkiz asalların sonsuz tane olup olmadığı hâlâ çözülememiş bir sorudur.',
    ] },
    { h: 'Asal sayılar nerede kullanılır?', p: [
      'Asal sayılar yalnızca sınav konusu değildir. İnternet bankacılığından mesajlaşmaya kadar pek çok alanda kullanılan açık anahtarlı şifreleme yöntemleri, çok büyük iki asal sayının çarpılmasının kolay, çarpımın yeniden çarpanlara ayrılmasının ise son derece zor olmasına dayanır. Bu yöntemlerde kullanılan asallar yüzlerce basamaklıdır ve bu aracın sınırının çok ötesindedir.',
      'Okul matematiğinde asallar; EBOB ve EKOK bulmada, kesir sadeleştirmede, bölen sayısı hesaplamada ve bölünebilme sorularında karşınıza çıkar. Yazılımda ise karma tablolarının boyutunu seçerken ve rastgele sayı üreteçlerinde asal değerler tercih edilir.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç 0 ile bir trilyon arasındaki tam sayıları sorgular ve bu aralıkta sonuç olasılığa dayalı değil, kesindir. Ondalıklı ya da negatif değer yazıldığında uyarı verir. Binlik ayraç kullanmadan, sayıyı bitişik yazmanız önerilir.',
    ] },
  ],
  faq: [
    ['1 asal sayı mıdır?', 'Hayır. Asal sayıların tam iki farklı pozitif böleni olmalıdır; 1\'in ise yalnızca bir böleni vardır. 1 ne asal ne de bileşik sayıdır.'],
    ['En küçük asal sayı hangisidir?', 'En küçük asal sayı 2\'dir ve aynı zamanda tek çift asal sayıdır. Ondan sonra 3, 5 ve 7 gelir.'],
    ['Bütün tek sayılar asal mıdır?', 'Hayır. 9 = 3 × 3, 15 = 3 × 5, 21 = 3 × 7 gibi pek çok tek sayı bileşiktir. Doğru olan bunun tersidir: 2 dışındaki bütün asal sayılar tektir.'],
    ['Bir sayının asal olduğunu anlamak için kaça kadar bölmeliyim?', 'Sayının kareköküne kadar olan asallara bölmeniz yeterlidir. Örneğin 200\'den küçük bir sayı için 2, 3, 5, 7, 11 ve 13\'ü denemek yeter, çünkü 14\'ün karesi 196, 15\'in karesi 225\'tir.'],
    ['En büyük asal sayı var mıdır?', 'Hayır. Asal sayılar sonsuzdur; hangi asalı seçerseniz seçin ondan daha büyüğü vardır. Bilinen en büyük asallar milyonlarca basamaklıdır ve özel yöntemlerle bulunur.'],
    ['Aralarında asal ne demektir?', '1\'den başka ortak böleni olmayan iki sayıya aralarında asal denir. Sayıların kendilerinin asal olması gerekmez: 8 ile 15 asal değildir ama aralarında asaldır.'],
    ['57 ve 91 asal mıdır?', 'İkisi de asal değildir, ancak sık sık asal sanılır. 57 = 3 × 19 ve 91 = 7 × 13\'tür. Çarpım tablosunda doğrudan yer almadıkları için gözden kaçarlar.'],
    ['Sorguladığım sayı kaydediliyor mu?', 'Hayır. Sorgu tarayıcınızda çalışır; yazdığınız sayı sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['asal-sayi-listesi', 'asal-carpan-hesapla', 'bolen-hesapla', 'ebob-ekok', 'mukemmel-sayi-kontrol'],
};
