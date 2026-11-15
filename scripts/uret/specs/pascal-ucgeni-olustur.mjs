export default {
  slug: 'pascal-ucgeni-olustur',
  title: 'Pascal Üçgeni Oluşturma',
  h1Tail: 'binom katsayıları',
  pageTitle: 'Pascal Üçgeni Oluşturma – İstediğiniz Satıra Kadar Binom Katsayıları',
  description: 'İstediğiniz satır sayısı kadar Pascal üçgeni oluşturun. Binom katsayılarını düz ya da ortalanmış biçimde görün, satır toplamını ve en büyük değeri öğrenin.',
  card: 'İstediğiniz satır sayısına kadar Pascal üçgenini oluşturun; binom katsayılarını ve satır toplamını görün.',
  category: 'matematik',
  keywords: ['pascal üçgeni', 'pascal üçgeni oluşturma', 'binom katsayıları', 'pascal üçgeni satırları', 'binom açılımı katsayıları', 'kombinasyon tablosu', 'pascal üçgeni 10. satır'],
  lead: 'Satır sayısını yazın; araç <strong>Pascal üçgenini</strong> ilk satırdan başlayarak oluşturur. Her satır bir binom açılımının katsayılarını verir; son satırın toplamı ve üçgendeki en büyük sayı ayrıca gösterilir.',
  button: 'Oluştur',
  inputs: [
    { id: 'satir', label: 'Satır sayısı', type: 'number', placeholder: 'Örn. 6', value: '6', hint: '1 ile 40 arasında bir tam sayı yazın.' },
    { id: 'bicim', label: 'Görünüm', type: 'select', options: [['duz', 'Sola hizalı (kopyalamaya uygun)'], ['ortali', 'Ortalanmış üçgen']] },
  ],
  compute(v, h) {
    const n = h.posint(v.satir, 'Satır sayısı');
    if (n > 40) h.err('Satır sayısı en fazla 40 olabilir; daha küçük bir değer yazın.');
    const satirlar = [];
    let onceki = [];
    for (let i = 0; i < n; i++) {
      const s = [];
      for (let j = 0; j <= i; j++) s.push(j === 0 || j === i ? 1 : onceki[j - 1] + onceki[j]);
      satirlar.push(s);
      onceki = s;
    }
    const yazi = satirlar.map((s) => s.join(' '));
    const gen = yazi[n - 1].length;
    const text = (v.bicim === 'ortali' ? yazi.map((t) => ' '.repeat(Math.floor((gen - t.length) / 2)) + t) : yazi).join('\n');
    const son = satirlar[n - 1];
    return {
      rows: [
        ['Satır sayısı', String(n)],
        ['Son satır', `n = ${n - 1} (${n} terim)`],
        ['Son satırın toplamı', h.fmt(son.reduce((a, b) => a + b, 0), 0)],
        ['En büyük sayı', h.fmt(Math.max(...son), 0)],
        ['Üçgendeki sayı adedi', h.fmt((n * (n + 1)) / 2, 0)],
      ],
      text,
      note: 'Satırlar n = 0\'dan başlayarak numaralanır: ilk satır (a + b)⁰, ikinci satır (a + b)¹ açılımının katsayılarıdır.',
    };
  },
  cases: [
    { in: { satir: '5', bicim: 'duz' }, out: { 'Satır sayısı': '5', 'Son satır': 'n = 4 (5 terim)', 'Son satırın toplamı': '16', 'En büyük sayı': '6', 'Üçgendeki sayı adedi': '15' }, text: '1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1' },
    { in: { satir: '3', bicim: 'ortali' }, out: { 'Son satırın toplamı': '4' }, text: '  1\n 1 1\n1 2 1' },
    { in: { satir: '1', bicim: 'duz' }, out: { 'Son satırın toplamı': '1', 'En büyük sayı': '1' }, text: '1' },
    { in: { satir: '7', bicim: 'duz' }, out: { 'Son satırın toplamı': '64', 'En büyük sayı': '20' }, textMatch: '\\n1 6 15 20 15 6 1$' },
    { in: { satir: '11', bicim: 'duz' }, out: { 'Son satırın toplamı': '1.024', 'En büyük sayı': '252', 'Üçgendeki sayı adedi': '66' }, textMatch: '\\n1 10 45 120 210 252 210 120 45 10 1$' },
    { in: { satir: '21', bicim: 'duz' }, out: { 'Son satırın toplamı': '1.048.576', 'En büyük sayı': '184.756' } },
    { in: { satir: '0' }, error: true },
    { in: { satir: '41' }, error: true },
    { in: { satir: '2,5' }, error: true },
  ],
  howto: [
    '"Satır sayısı" alanına üçgenin kaç satır olmasını istediğinizi yazın. 1 ile 40 arasında bir tam sayı girebilirsiniz.',
    '"Görünüm" listesinden biçimi seçin: sola hizalı görünüm tabloya ya da koda yapıştırmaya uygundur, ortalanmış görünüm üçgenin klasik şeklini verir.',
    '"Oluştur" düğmesine basın. Üçgen sonuç kutusunda satır satır görünür; üstteki satırlarda son satırın toplamı ve en büyük sayı yer alır.',
    '"Sonucu kopyala" düğmesiyle üçgeni panoya alıp ödevinize, ders notunuza ya da tablo programına yapıştırın.',
  ],
  sections: [
    { h: 'Pascal üçgeni nedir?', p: [
      'Pascal üçgeni, tepe noktasında 1 bulunan ve aşağı doğru her satırda bir sayı artarak genişleyen üçgen biçimli bir sayı tablosudur. Adını 17. yüzyılda bu tablonun özelliklerini ayrıntılı biçimde inceleyen Fransız matematikçi Blaise Pascal\'dan alır. Aynı sayı düzeni ondan yüzyıllar önce Çin, Hindistan ve İslam dünyası matematikçileri tarafından da biliniyordu; bu nedenle bazı kaynaklarda Hayyam üçgeni adıyla da geçer.',
      'Tablonun önemi, içindeki sayıların <strong>binom katsayıları</strong>, yani kombinasyon değerleri olmasından gelir. Olasılık, cebir ve sayma problemlerinde sık sık ihtiyaç duyulan bu değerleri tek tek formülle hesaplamak yerine üçgenden okumak mümkündür.',
    ] },
    { h: 'Üçgen nasıl oluşturulur?', p: [
      'Kural çok basittir: her satırın ilk ve son sayısı 1\'dir; aradaki her sayı, bir üst satırda hemen üstünde bulunan iki sayının toplamıdır. Araç da tam olarak bu toplama kuralını uygular; faktöriyel hesaplamaz.',
      'İlk beş satırı elle kuralım. Birinci satır yalnızca 1\'dir. İkinci satır 1 1 olur. Üçüncü satırda ortadaki sayı 1 + 1 = 2\'dir: 1 2 1. Dördüncü satırda 1 + 2 = 3 ve 2 + 1 = 3 bulunur: 1 3 3 1. Beşinci satırda 1 + 3 = 4, 3 + 3 = 6, 3 + 1 = 4 elde edilir: <strong>1 4 6 4 1</strong>. Satır sayısına 5 yazdığınızda aracın verdiği çıktı tam olarak bu beş satırdır; son satırın toplamı 16, en büyük sayı 6\'dır.',
    ] },
    { h: 'Satır numarası ve kombinasyon bağlantısı', p: [
      'Matematikte satırlar ve satır içindeki sıralar 0\'dan başlayarak numaralanır. n numaralı satırın k numaralı elemanı, n elemanlı bir kümeden k eleman seçmenin kaç farklı yolla yapılabileceğini gösteren <strong>C(n, k) = n! ÷ (k! · (n − k)!)</strong> değeridir. Örneğin n = 4 satırı 1 4 6 4 1 olduğuna göre C(4, 2) = 6\'dır: dört kişiden iki kişilik bir ekip 6 farklı biçimde seçilebilir.',
      'Bu numaralandırma kafa karıştırabilir: araca 5 satır yazdığınızda son satır n = 4 satırıdır. (a + b)¹⁰ açılımının katsayılarını görmek istiyorsanız satır sayısını 11 girmeniz gerekir. Sonuç kutusundaki "Son satır" bilgisi hangi n değerine ulaştığınızı gösterir.',
    ] },
    { h: 'Binom açılımında kullanımı', p: [
      'İki terimli bir ifadenin kuvveti açıldığında terimlerin katsayıları Pascal üçgeninin ilgili satırından alınır. n = 3 satırı 1 3 3 1 olduğundan (a + b)³ = a³ + 3a²b + 3ab² + b³ olur. n = 4 satırıyla (a + b)⁴ = a⁴ + 4a³b + 6a²b² + 4ab³ + b⁴ yazılır. Açılımda a\'nın kuvveti her terimde bir azalır, b\'nin kuvveti bir artar.',
      'Aradaki işaret eksi ise katsayılar aynı kalır, yalnızca işaretler sırayla değişir: (a − b)³ = a³ − 3a²b + 3ab² − b³. Terimlerin kendi katsayıları varsa, örneğin (2x + 3)⁴ açılımında, Pascal katsayıları 2x ve 3\'ün ilgili kuvvetleriyle ayrıca çarpılmalıdır.',
    ] },
    { h: 'Üçgenin dikkat çekici özellikleri', ul: [
      '<strong>Simetri:</strong> Her satır baştan ve sondan aynı okunur, çünkü C(n, k) = C(n, n − k) eşitliği geçerlidir.',
      '<strong>Satır toplamı:</strong> n numaralı satırdaki sayıların toplamı 2ⁿ\'dir. n = 10 satırının toplamı 1024 eder; bu aynı zamanda 10 elemanlı bir kümenin alt küme sayısıdır.',
      '<strong>11\'in kuvvetleri:</strong> İlk beş satır yan yana okunduğunda 1, 11, 121, 1331, 14641 sayıları, yani 11\'in kuvvetleri elde edilir. Sonraki satırlarda iki basamaklı sayılar için elde aktarılması gerekir.',
      '<strong>Köşegenler:</strong> Kenardaki ilk köşegen hep 1\'dir; ikincisi sayma sayılarını (1, 2, 3, 4…), üçüncüsü üçgensel sayıları (1, 3, 6, 10, 15…) verir.',
      '<strong>Fibonacci sayıları:</strong> Üçgenin eğik (sığ) köşegenleri boyunca yapılan toplamlar 1, 1, 2, 3, 5, 8… dizisini oluşturur.',
      '<strong>Tek-çift deseni:</strong> Tek sayılar boyandığında Sierpinski üçgeni adı verilen kendini tekrar eden bir desen ortaya çıkar.',
    ] },
    { h: 'Olasılıkta kullanımı', p: [
      'Bir madeni para n kez atıldığında tam k kez tura gelmesinin kaç farklı sırayla gerçekleşebileceği C(n, k) ile bulunur. Dört atış için n = 4 satırı 1 4 6 4 1 olduğundan; hiç tura gelmemesi 1, bir tura 4, iki tura 6, üç tura 4, dört tura 1 farklı biçimde olur. Toplam 16 eşit olasılıklı durum bulunduğundan tam iki tura gelme olasılığı 6 ÷ 16 = 0,375\'tir. Çocuk sayısı ve cinsiyet dağılımı, çoktan seçmeli testte rastgele işaretleme gibi iki sonuçlu deneylerde de aynı yöntem kullanılır.',
    ] },
    { h: 'Sınırlar ve ipuçları', p: [
      'Araç en fazla 40 satır üretir. Kırkıncı satırdaki en büyük sayı on bir basamaklıdır ve tam olarak hesaplanır; yuvarlama yapılmaz. Kopyalamayı kolaylaştırmak için üçgenin içindeki sayılar binlik ayırıcı olmadan yazılır, özet satırlarındaki toplam ve en büyük değer ise binlik noktayla gösterilir.',
      'Ortalanmış görünüm sabit genişlikli yazı tipiyle düzgün durur ve yaklaşık 15 satıra kadar ekrana rahat sığar; daha fazla satırda sayılar genişlediği için dar ekranlarda satırlar kayabilir. Uzun üçgenlerde sola hizalı görünümü tercih edin. Belirli bir satırı tabloya aktarmak isterseniz sola hizalı çıktıdaki satırı kopyalayıp boşluğa göre sütunlara ayırabilirsiniz.',
    ] },
  ],
  faq: [
    ['Pascal üçgeni nasıl oluşturulur?', 'En üste 1 yazılır. Her yeni satır 1 ile başlar ve 1 ile biter; aradaki sayılar bir üst satırdaki komşu iki sayının toplamıdır. Böylece 1, 1 1, 1 2 1, 1 3 3 1, 1 4 6 4 1 biçiminde devam eder.'],
    ['Pascal üçgeninde satır toplamı nasıl bulunur?', 'n numaralı satırın toplamı 2ⁿ\'dir. Satırlar sıfırdan numaralandığı için beşinci sıradaki satır (n = 4) 1 + 4 + 6 + 4 + 1 = 16 = 2⁴ eder.'],
    ['Binom açılımının katsayıları üçgenden nasıl okunur?', '(a + b)ⁿ açılımının katsayıları n numaralı satırdaki sayılardır. (a + b)⁵ için n = 5 satırına, yani üstten altıncı satıra bakılır: 1 5 10 10 5 1.'],
    ['Pascal üçgeni ile kombinasyon arasındaki ilişki nedir?', 'Üçgendeki her sayı bir kombinasyon değeridir: n numaralı satırın k numaralı elemanı C(n, k)\'ye eşittir. Toplama kuralı da C(n, k) = C(n − 1, k − 1) + C(n − 1, k) özdeşliğinin tablo hâlidir.'],
    ['(a + b)¹⁰ açılımının katsayıları için kaç satır yazmalıyım?', 'Satırlar n = 0\'dan başladığı için 11 satır oluşturmalısınız. Son satır 1 10 45 120 210 252 210 120 45 10 1 olur ve toplamı 1024\'tür.'],
    ['Pascal üçgenini kim buldu?', 'Tablo adını Blaise Pascal\'dan alır, çünkü özelliklerini sistemli biçimde ortaya koyan çalışmayı o yazmıştır. Ancak aynı düzen daha önce farklı kültürlerdeki matematikçiler tarafından da kullanılmıştır; bu yüzden tek bir kişiye mal etmek doğru olmaz.'],
    ['Neden en fazla 40 satır oluşturulabiliyor?', 'Satırlar ilerledikçe sayılar hızla büyür ve çıktı ekranda okunamayacak kadar genişler. 40 satır, ders ve ödev ihtiyaçlarının tamamını karşılarken sayıların tam ve hatasız gösterilmesini sağlar.'],
    ['Oluşturduğum üçgen bir yere gönderiliyor mu?', 'Hayır. Üçgen tarayıcınızın içinde oluşturulur; yazdığınız satır sayısı ve sonuç sunucuya iletilmez, saklanmaz.'],
  ],
  related: ['kombinasyon-permutasyon', 'binom-dagilimi-hesapla', 'faktoriyel-hesapla', 'fibonacci-hesapla', 'olasilik-hesapla'],
};
