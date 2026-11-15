export default {
  slug: 'faktoriyel-hesapla',
  title: 'Faktöriyel Hesaplama',
  h1Tail: 'n! kaç eder?',
  pageTitle: 'Faktöriyel Hesaplama – n! Sonucu, Basamak ve Sıfır Sayısı',
  description: 'Bir sayının faktöriyelini (n!) tam değeriyle hesaplayın. 5000\'e kadar çalışır; basamak sayısını, sondaki sıfır sayısını ve bilimsel gösterimi de verir.',
  card: 'n! değerini tam olarak hesaplayın; basamak sayısı, sondaki sıfırlar ve bilimsel gösterimle birlikte.',
  category: 'matematik',
  keywords: ['faktöriyel hesaplama', 'n faktöriyel', '10 faktöriyel kaç', 'faktöriyel nedir', '0 faktöriyel', 'faktöriyel tablosu', '100 faktöriyel', 'faktöriyel sıfır sayısı'],
  lead: 'Sıfır ya da pozitif bir tam sayının faktöriyelini, yani <strong>n! = 1 × 2 × 3 × … × n</strong> çarpımını yuvarlamadan, bütün basamaklarıyla hesaplayın. Araç ayrıca sonucun kaç basamaklı olduğunu ve sonunda kaç sıfır bulunduğunu gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'n', label: 'Sayı (n)', type: 'number', placeholder: 'Örn. 10', hint: '0 ile 5000 arasında bir tam sayı' },
  ],
  compute(v, h) {
    const n = h.int(v.n, 'Sayı (n)');
    if (n < 0) h.err('Negatif sayıların faktöriyeli tanımlı değildir; 0 ya da pozitif bir tam sayı yazın.');
    if (n > 5000) h.err('Bu araç en fazla 5000! değerini hesaplar; daha küçük bir sayı yazın.');
    let f = 1n;
    for (let i = 2n; i <= BigInt(n); i++) f *= i;
    const s = f.toString();
    const basamak = s.length;
    let sifir = 0;
    for (let p = 5; p <= n; p *= 5) sifir += Math.floor(n / p);
    const grupla = (t) => t.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    // Bilimsel gösterim: ilk 7 basamaktan 6 anlamlı basamağa yuvarla
    let bilimsel;
    if (basamak <= 6) bilimsel = grupla(s);
    else {
      let m = Math.round(Number(s.slice(0, 8)) / 100);
      let e = basamak - 1;
      if (m >= 1000000) { m = Math.round(m / 10); e += 1; }
      const ms = String(m);
      const kesir = ms.slice(1).replace(/0+$/, '');
      bilimsel = `${ms[0]}${kesir ? ',' + kesir : ''} × 10^${e}`;
    }
    const kisa = basamak <= 30;
    const rows = [
      [`${n}! değeri`, kisa ? grupla(s) : '≈ ' + bilimsel],
      ['Basamak sayısı', h.fmt(basamak, 0)],
      ['Sondaki sıfır sayısı', h.fmt(sifir, 0)],
    ];
    if (kisa && basamak > 6) rows.push(['Bilimsel gösterim', '≈ ' + bilimsel]);
    const acilim = n >= 2 && n <= 12 ? Array.from({ length: n }, (_, i) => n - i).join(' × ') : '';
    if (acilim) rows.push(['Açılım', acilim]);
    const out = { rows };
    if (!kisa) {
      out.text = s;
      out.note = 'Sonuç 30 basamaktan uzun olduğu için üstte yaklaşık değer, aşağıdaki kutuda tam değer (ayraçsız) gösterilir.';
    } else if (n < 2) {
      out.note = 'Tanım gereği 0! = 1 ve 1! = 1\'dir.';
    }
    return out;
  },
  cases: [
    { in: { n: '5' }, out: { '5! değeri': '120', 'Basamak sayısı': '3', 'Sondaki sıfır sayısı': '1', 'Açılım': '5 × 4 × 3 × 2 × 1' } },
    { in: { n: '10' }, out: { '10! değeri': '3.628.800', 'Basamak sayısı': '7', 'Sondaki sıfır sayısı': '2', 'Bilimsel gösterim': '≈ 3,6288 × 10^6' } },
    { in: { n: '0' }, out: { '0! değeri': '1', 'Sondaki sıfır sayısı': '0' } },
    { in: { n: '20' }, out: { '20! değeri': '2.432.902.008.176.640.000', 'Basamak sayısı': '19', 'Sondaki sıfır sayısı': '4' } },
    { in: { n: '25' }, out: { '25! değeri': '15.511.210.043.330.985.984.000.000', 'Basamak sayısı': '26', 'Sondaki sıfır sayısı': '6' } },
    { in: { n: '100' }, out: { '100! değeri': '≈ 9,33262 × 10^157', 'Basamak sayısı': '158', 'Sondaki sıfır sayısı': '24' }, textMatch: '^93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000$' },
    { in: { n: '52' }, out: { '52! değeri': '≈ 8,06582 × 10^67', 'Basamak sayısı': '68', 'Sondaki sıfır sayısı': '12' } },
    { in: { n: '-3' }, error: true },
    { in: { n: '2,5' }, error: true },
    { in: { n: '6000' }, error: true },
  ],
  howto: [
    '"Sayı (n)" alanına faktöriyelini almak istediğiniz tam sayıyı yazın. 0 ile 5000 arasındaki her değer kabul edilir.',
    '"Hesapla" düğmesine basın. İlk satırda n! değeri görünür; sonuç 30 basamağı geçmiyorsa binlik ayraçlarıyla tam olarak yazılır.',
    'Daha büyük sonuçlarda ilk satırda yaklaşık bilimsel gösterim, alttaki kutuda ise sayının bütün basamakları yer alır.',
    '"Basamak sayısı" ve "Sondaki sıfır sayısı" satırlarını ödev ya da sınav sorularını kontrol etmek için kullanın; "Sonucu kopyala" ile değerleri panoya alın.',
  ],
  sections: [
    { h: 'Faktöriyel nedir?', p: [
      'Faktöriyel, 1\'den n\'ye kadar olan bütün pozitif tam sayıların çarpımıdır ve sayının sağına konan ünlem işaretiyle gösterilir. <strong>n! = n × (n − 1) × (n − 2) × … × 2 × 1</strong> biçiminde yazılır. Örneğin 5! = 5 × 4 × 3 × 2 × 1 = 120\'dir. Tanım yalnızca sıfır ve pozitif tam sayılar için geçerlidir; −3! ya da 2,5! gibi ifadeler okul matematiğinde tanımsızdır ve araç bu girdilerde hata verir.',
      'Faktöriyelin en bilinen anlamı sıralama sayısıdır: n farklı nesne yan yana tam n! farklı biçimde dizilebilir. Üç kitabı rafa 3! = 6, beş kişiyi bir sıraya 5! = 120 farklı şekilde yerleştirebilirsiniz. Bu yüzden faktöriyel; permütasyon, kombinasyon, olasılık ve binom açılımı konularının temel yapı taşıdır.',
    ] },
    { h: 'Neden 0! = 1?', p: [
      'Sıfır faktöriyelin 1 olması bir keyfî kabul değil, tanımın tutarlı kalması için gereken değerdir. Faktöriyelin yinelemeli kuralı <strong>n! = n × (n − 1)!</strong> biçimindedir. Bu kuralı n = 1 için yazarsak 1! = 1 × 0! olur; 1! = 1 olduğuna göre 0! de 1 olmak zorundadır. Sayma açısından da aynı sonuca varılır: hiç nesne içermeyen bir kümeyi dizmenin tek bir yolu vardır, o da hiçbir şey yapmamaktır. Kombinasyon formülündeki C(n, n) = n! ÷ (n! × 0!) ifadesinin 1 çıkması da ancak 0! = 1 ile mümkündür.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 10! kaçtır? 10 × 9 × 8 × 7 × 6 × 5 × 4 × 3 × 2 × 1 çarpımı 3.628.800 eder. Sonuç 7 basamaklıdır ve sonunda 2 sıfır vardır. Araca 10 yazdığınızda aynı değerleri görürsünüz.',
      '<strong>Örnek 2:</strong> 8! ÷ 6! işlemini faktöriyelleri ayrı ayrı hesaplamadan yapabilirsiniz: 8! = 8 × 7 × 6! olduğundan 6! sadeleşir ve geriye 8 × 7 = 56 kalır. Sınav sorularının çoğu bu sadeleştirmeye dayanır; aracı yalnızca sonucu doğrulamak için kullanmak daha öğreticidir.',
      '<strong>Örnek 3:</strong> 52 kartlık bir iskambil destesi kaç farklı şekilde karılabilir? Cevap 52!\'dir; araç bunu yaklaşık 8,06582 × 10^67 olarak, 68 basamaklı tam değeriyle birlikte verir. Bu sayı o kadar büyüktür ki iyi karılmış bir destenin daha önce birebir aynı sırada ortaya çıkmış olması pratikte beklenmez.',
    ] },
    { h: 'Sondaki sıfır sayısı nasıl bulunur?', p: [
      'Bir sayının sonundaki her sıfır, o sayının içinde bir 10 çarpanı, yani bir 2 ve bir 5 çarpanı olduğunu gösterir. Faktöriyelde 2 çarpanı her zaman 5 çarpanından boldur; dolayısıyla sıfır sayısını 5 çarpanlarının adedi belirler. Bunun için n sayısı sırayla 5\'e, 25\'e, 125\'e, 625\'e… bölünür ve bölümlerin tam kısımları toplanır.',
      '100! için hesap şöyledir: 100 ÷ 5 = 20, 100 ÷ 25 = 4, 100 ÷ 125 ise 1\'den küçük olduğu için durulur. 20 + 4 = 24, yani 100! sayısının sonunda 24 sıfır vardır. Benzer biçimde 25! için 25 ÷ 5 = 5 ve 25 ÷ 25 = 1 bulunur; toplam 6 sıfırdır. Araç bu yöntemi kullanır, dolayısıyla çok büyük n değerlerinde bile sıfır sayısı kesindir.',
    ] },
    { h: 'Faktöriyel tablosu (0–15)', ul: [
      '<strong>0!</strong> = 1 · <strong>1!</strong> = 1 · <strong>2!</strong> = 2 · <strong>3!</strong> = 6',
      '<strong>4!</strong> = 24 · <strong>5!</strong> = 120 · <strong>6!</strong> = 720',
      '<strong>7!</strong> = 5.040 · <strong>8!</strong> = 40.320 · <strong>9!</strong> = 362.880',
      '<strong>10!</strong> = 3.628.800',
      '<strong>11!</strong> = 39.916.800',
      '<strong>12!</strong> = 479.001.600',
      '<strong>13!</strong> = 6.227.020.800',
      '<strong>14!</strong> = 87.178.291.200',
      '<strong>15!</strong> = 1.307.674.368.000',
    ] },
    { h: 'Faktöriyel ne kadar hızlı büyür?', p: [
      'Faktöriyel, üstel fonksiyonlardan bile hızlı büyür. 10! yaklaşık 3,6 milyon iken 20! on dokuz basamaklı, 100! ise 158 basamaklı bir sayıdır. Sıradan hesap makineleri genellikle 69!\'e kadar sonuç verir, çünkü 70! değeri 10^100\'ü aşar ve ekrana sığmaz. Elektronik tablolar ve çoğu programlama dili de yaklaşık 170!\'den sonra "sonsuz" ya da taşma hatası döndürür; bu sınıra gelmeden önce de yirmili değerlerden itibaren sonucun son basamaklarını yuvarlayarak gösterir.',
      'Bu sayfa hesabı keyfî uzunlukta tam sayılarla yaptığı için böyle bir yuvarlama olmaz: 1000! sayısının 2568 basamağının tamamını görebilirsiniz. Üst sınır 5000 olarak tutulmuştur; 5000! on altı bin basamağı aşan bir sayıdır ve bundan büyük değerler telefonlarda sayfayı yavaşlatabilir.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      '<strong>(a + b)! ile a! + b! aynı değildir.</strong> (2 + 3)! = 120 iken 2! + 3! = 8\'dir.',
      '<strong>(2n)! ile 2 × n! karıştırılır.</strong> (2 × 3)! = 720, 2 × 3! = 12\'dir.',
      '<strong>0! sıfır sanılır.</strong> Doğru değer 1\'dir; kombinasyon sorularında bu hata sonucu tanımsız yapar.',
      '<strong>Bölme işlemlerinde faktöriyeller sadeleştirilmeden açılır.</strong> 100! ÷ 98! işlemi 100 × 99 = 9900\'dür; iki dev sayıyı hesaplamaya gerek yoktur.',
    ] },
  ],
  faq: [
    ['Faktöriyel nasıl hesaplanır?', 'Sayıdan başlayıp 1\'e kadar olan bütün tam sayılar çarpılır. 6! için 6 × 5 × 4 × 3 × 2 × 1 = 720 bulunur. Pratikte bir önceki faktöriyeli bilmek yeterlidir: 7! = 7 × 6! = 7 × 720 = 5040.'],
    ['0 faktöriyel kaçtır?', '0! = 1\'dir. Bu değer, n! = n × (n − 1)! kuralının n = 1 için de doğru kalmasını sağlar ve boş bir kümenin tek bir sıralaması olduğu gerçeğiyle uyumludur.'],
    ['Negatif sayıların faktöriyeli var mıdır?', 'Hayır. Faktöriyel yalnızca sıfır ve pozitif tam sayılar için tanımlıdır. Negatif tam sayılarda yinelemeli kural sıfıra bölmeye götürdüğü için bir değer atanamaz; araç bu durumda uyarı verir.'],
    ['Ondalıklı sayının faktöriyeli alınır mı?', 'Okul matematiğindeki tanımla alınmaz. İleri matematikte gama fonksiyonu faktöriyeli tam olmayan sayılara genişletir, ancak bu farklı bir kavramdır ve bu araç yalnızca tam sayılarla çalışır.'],
    ['100 faktöriyel kaç basamaklıdır?', '100! tam 158 basamaklıdır, yaklaşık 9,33262 × 10^157 değerindedir ve sonunda 24 sıfır bulunur. Araca 100 yazarak bütün basamakları görebilirsiniz.'],
    ['Faktöriyel nerelerde kullanılır?', 'Permütasyon ve kombinasyon hesaplarında, olasılık problemlerinde, binom açılımının katsayılarında, Taylor serilerinde ve şifre ya da sıralama olasılıklarının sayılmasında kullanılır. Örneğin 8 kişilik bir grubun sıraya girme sayısı 8! = 40.320\'dir.'],
    ['Hesap makinem büyük sayılarda neden hata veriyor?', 'Çoğu hesap makinesi en fazla 10^99\'a kadar sayı gösterebildiği için 70! ve sonrası hata verir. Bu sayfa hesabı sınırsız uzunlukta tam sayılarla yapar; bu yüzden 5000!\'e kadar tam sonuç alırsınız.'],
    ['Yazdığım sayı kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızın içinde yapılır; yazdığınız sayı ve sonuç hiçbir sunucuya gönderilmez, saklanmaz.'],
  ],
  related: ['kombinasyon-permutasyon', 'olasilik-hesapla', 'fibonacci-hesapla', 'us-logaritma-hesapla', 'asal-carpan-hesapla'],
};
