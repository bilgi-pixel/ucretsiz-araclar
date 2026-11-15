export default {
  slug: 'asal-sayi-listesi',
  title: 'Asal Sayı Listesi Oluşturma',
  h1Tail: 'iki sayı arasındaki asallar',
  pageTitle: 'Asal Sayı Listesi Oluşturma – İki Sayı Arasındaki Asal Sayılar',
  description: 'İki sayı arasındaki bütün asal sayıları listeleyin. Kaç tane olduklarını, toplamlarını, en küçük ve en büyük asalı ve ikiz asal çifti sayısını da verir.',
  card: 'Seçtiğiniz aralıktaki bütün asal sayıları listeleyin; adet, toplam ve ikiz asal sayısıyla birlikte kopyalayın.',
  category: 'matematik',
  keywords: ['asal sayı listesi', 'asal sayılar', '1 den 100 e kadar asal sayılar', 'iki sayı arasındaki asal sayılar', 'asal sayı tablosu', '1000 e kadar asal sayılar', 'kaç tane asal sayı var', 'eratosten kalburu'],
  lead: 'Alt ve üst sınırı yazın; araç bu aralıktaki <strong>bütün asal sayıları</strong> sıralı bir liste hâlinde üretsin. Listeyle birlikte asalların adedi, toplamı, aralıktaki ilk ve son asal ile ikiz asal çiftlerinin sayısı da gösterilir.',
  button: 'Listele',
  inputs: [
    { id: 'alt', label: 'Alt sınır', type: 'number', value: '1', placeholder: 'Örn. 1' },
    { id: 'ust', label: 'Üst sınır', type: 'number', placeholder: 'Örn. 100', hint: 'En fazla 10.000.000; aralık genişliği en fazla 1.000.000' },
    { id: 'ayrac', label: 'Liste biçimi', type: 'select', options: [['virgul', 'Virgülle ayrılmış'], ['satir', 'Her satırda bir sayı'], ['bosluk', 'Boşlukla ayrılmış']] },
  ],
  compute(v, h) {
    const alt = h.int(v.alt, 'Alt sınır');
    const ust = h.int(v.ust, 'Üst sınır');
    if (alt < 0 || ust < 0) h.err('Sınırlar negatif olamaz; asal sayılar pozitif tam sayılardır.');
    if (alt > ust) h.err('Alt sınır üst sınırdan büyük olamaz; iki değerin yerini değiştirin.');
    if (ust > 10000000) h.err('Üst sınır en fazla 10.000.000 olabilir; daha küçük bir değer yazın.');
    if (ust - alt > 1000000) h.err('Aralık çok geniş; alt ve üst sınır arasındaki fark en fazla 1.000.000 olabilir.');
    // Eratosten kalburu: bilesik[i] = 1 ise i asal değildir
    const bilesik = new Uint8Array(ust + 1);
    for (let i = 2; i * i <= ust; i++) {
      if (bilesik[i]) continue;
      for (let j = i * i; j <= ust; j += i) bilesik[j] = 1;
    }
    const liste = [];
    let toplam = 0, ikiz = 0;
    for (let i = Math.max(alt, 2); i <= ust; i++) {
      if (bilesik[i]) continue;
      if (liste.length && i - liste[liste.length - 1] === 2) ikiz++;
      liste.push(i);
      toplam += i;
    }
    const f = (x) => h.fmt(x, 0);
    const aralik = `${f(alt)} – ${f(ust)}`;
    if (!liste.length) {
      return {
        rows: [['Asal sayı adedi', '0'], ['Aralık', aralik]],
        note: 'Bu aralıkta hiç asal sayı yok. Aralığı genişleterek yeniden deneyin.',
      };
    }
    const ayir = v.ayrac === 'satir' ? '\n' : v.ayrac === 'bosluk' ? ' ' : ', ';
    return {
      rows: [
        ['Asal sayı adedi', f(liste.length)],
        ['Aralık', aralik],
        ['En küçük asal', f(liste[0])],
        ['En büyük asal', f(liste[liste.length - 1])],
        ['Asal sayıların toplamı', f(toplam)],
        ['İkiz asal çifti sayısı', f(ikiz)],
      ],
      text: liste.join(ayir),
      note: 'Sınır değerleri aralığa dahildir. Listedeki sayılar kopyalamaya uygun olsun diye binlik ayraçsız yazılır.',
    };
  },
  cases: [
    { in: { alt: '1', ust: '100' }, out: { 'Asal sayı adedi': '25', 'En küçük asal': '2', 'En büyük asal': '97', 'Asal sayıların toplamı': '1.060', 'İkiz asal çifti sayısı': '8' }, text: '2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97' },
    { in: { alt: '100', ust: '200' }, out: { 'Asal sayı adedi': '21', 'En küçük asal': '101', 'En büyük asal': '199' }, textMatch: '^101, 103, 107, 109, 113, 127,.* 197, 199$' },
    { in: { alt: '1', ust: '10', ayrac: 'bosluk' }, out: { 'Asal sayı adedi': '4', 'Asal sayıların toplamı': '17', 'İkiz asal çifti sayısı': '2' }, text: '2 3 5 7' },
    { in: { alt: '1', ust: '1000' }, out: { 'Asal sayı adedi': '168', 'En büyük asal': '997', 'Asal sayıların toplamı': '76.127' } },
    { in: { alt: '90', ust: '100', ayrac: 'satir' }, out: { 'Asal sayı adedi': '1', 'İkiz asal çifti sayısı': '0' }, text: '97' },
    { in: { alt: '24', ust: '28' }, out: { 'Asal sayı adedi': '0' } },
    { in: { alt: '1', ust: '1000000' }, out: { 'Asal sayı adedi': '78.498', 'En büyük asal': '999.983' } },
    { in: { alt: '10', ust: '20', ayrac: 'satir' }, text: '11\n13\n17\n19' },
    { in: { alt: '50', ust: '10' }, error: true },
    { in: { alt: '1', ust: '' }, error: true },
    { in: { alt: '1', ust: '20000000' }, error: true },
    { in: { alt: '1,5', ust: '10' }, error: true },
  ],
  howto: [
    '"Alt sınır" alanına listenin başlayacağı sayıyı yazın. 1\'den başlamak istiyorsanız varsayılan değeri değiştirmeyin.',
    '"Üst sınır" alanına listenin biteceği sayıyı yazın. Sınır değerlerinin kendisi de asalsa listeye girer.',
    '"Liste biçimi" seçeneğiyle sayıların virgülle, boşlukla ya da alt alta yazılmasını belirleyin; tabloya yapıştıracaksanız satır biçimi kullanışlıdır.',
    '"Listele" düğmesine basın. Üstte özet değerler, altta asal sayıların tamamı görünür.',
    '"Sonucu kopyala" düğmesiyle listeyi panoya alıp ödevinize, tablonuza ya da kodunuza yapıştırın.',
  ],
  sections: [
    { h: 'Asal sayı listesi ne işe yarar?', p: [
      'Asal sayı, 1\'den büyük olan ve yalnızca 1 ile kendisine bölünen sayıdır. Tek bir sayının asal olup olmadığını denemek kolaydır; ancak "50 ile 150 arasında kaç asal var?", "üç basamaklı en küçük asal hangisi?" ya da "200\'den küçük asalların toplamı kaç?" gibi sorular bütün bir aralığın taranmasını gerektirir. Bu araç aralığı sizin yerinize tarar ve hem listeyi hem de özet bilgileri verir.',
      'Öğrenciler asal sayı tablosunu ödev ve sınav hazırlığında, öğretmenler çalışma kâğıdı ve etkinlik hazırlarken, yazılımcılar test verisi ya da karma tablosu boyutu ararken, bulmaca meraklıları ise sayı oyunlarında kullanır. Listeyi satır satır alıp bir elektronik tabloya yapıştırmak da mümkündür.',
    ] },
    { h: 'Yöntem: Eratosten kalburu', p: [
      'Araç, antik çağdan beri bilinen <strong>Eratosten kalburu</strong> yöntemini kullanır. Mantığı şöyledir: 2\'den üst sınıra kadar bütün sayılar yazılır. İlk sayı olan 2 asaldır; 2\'nin kendisi dışındaki bütün katları (4, 6, 8…) üzeri çizilerek elenir. Elenmemiş bir sonraki sayı 3\'tür; onun katları (9, 15, 21…) elenir. Sonra 5\'in, 7\'nin katları elenir ve bu işlem üst sınırın kareköküne kadar sürer. Geriye üzeri çizilmemiş kalan sayıların tamamı asaldır.',
      'Kareköke kadar gitmenin yeterli olmasının nedeni, bileşik bir sayının çarpanlarından en az birinin karekökünü aşamamasıdır. 100\'e kadar olan asalları bulmak için yalnızca 2, 3, 5 ve 7\'nin katlarını elemek yeter, çünkü bir sonraki asal olan 11\'in karesi 121\'dir ve 100\'ü geçer. Ayrıca her asalın katlarını elemeye karesinden başlamak yeterlidir; daha küçük katlar önceki asallar tarafından zaten elenmiştir.',
      'Kalbur, her sayıyı tek tek bölerek sınamaktan çok daha hızlıdır. On milyona kadar olan sayıların elenmesi sıradan bir telefonda bile bir saniyeden kısa sürer.',
    ] },
    { h: 'Çözümlü örnek: 1 ile 100 arasındaki asallar', p: [
      'Alt sınıra 1, üst sınıra 100 yazıp listelediğinizde şu 25 sayı çıkar: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97. Bu sayıların toplamı 1.060\'tır. En küçüğü 2, en büyüğü 97\'dir.',
      'Listede aralarındaki fark 2 olan sekiz çift vardır: 3–5, 5–7, 11–13, 17–19, 29–31, 41–43, 59–61 ve 71–73. Bunlara <strong>ikiz asallar</strong> denir ve araç bu çiftleri sayar. 5 sayısı iki ayrı çiftte yer aldığına dikkat edin; sayılan şey çift sayısıdır, sayı adedi değil.',
      'İkinci bir örnek: 100 ile 200 arasında 21 asal vardır; ilki 101, sonuncusu 199\'dur. Buna karşılık 24 ile 28 arasında hiç asal yoktur; araç bu durumda adedi 0 olarak bildirir.',
    ] },
    { h: 'Aralıklara göre asal sayı adetleri', ul: [
      '<strong>1 – 10:</strong> 4 asal (2, 3, 5, 7)',
      '<strong>1 – 100:</strong> 25 asal',
      '<strong>1 – 1.000:</strong> 168 asal; en büyüğü 997',
      '<strong>1 – 10.000:</strong> 1.229 asal',
      '<strong>1 – 100.000:</strong> 9.592 asal',
      '<strong>1 – 1.000.000:</strong> 78.498 asal; en büyüğü 999.983',
    ] },
    { h: 'Asal sayılar nasıl dağılır?', p: [
      'Yukarıdaki tablo asalların giderek seyrekleştiğini gösterir: ilk yüz sayının dörtte biri asalken, ilk bir milyon sayının yalnızca yaklaşık yüzde sekizi asaldır. Asal sayı teoremine göre büyük bir N sayısının yakınında rastgele seçilen bir sayının asal olma olasılığı yaklaşık 1 ÷ ln(N) kadardır. Bir milyon civarında bu, kabaca her on dört sayıdan birine karşılık gelir.',
      'Seyrekleşmeye karşın asallar düzenli bir kalıba oturmaz. Art arda gelen iki asal arasındaki boşluk bazen 2 (ikiz asallar), bazen çok daha büyüktür. Örneğin 113\'ten sonraki asal 127\'dir; arada on üç bileşik sayı bulunur. Farklı aralıkları listeleyerek bu boşlukları kendiniz inceleyebilirsiniz.',
      '2 ve 3 dışındaki bütün asallar 6\'nın bir katının bir eksiği ya da bir fazlasıdır (5, 7, 11, 13, 17, 19…). Bunun tersi doğru değildir: 25 ve 35 de bu kalıptadır ama asal değildir. Aynı biçimde 2 ve 5 dışındaki asalların son rakamı yalnızca 1, 3, 7 ya da 9 olabilir.',
    ] },
    { h: 'Sınırlar ve ipuçları', ul: [
      'Üst sınır en fazla 10.000.000, alt ve üst sınır arasındaki fark en fazla 1.000.000 olabilir. Böylece liste tarayıcıyı yormayacak boyutta kalır.',
      'Daha büyük sayıların asallığını tek tek sınamak için asal sayı sorgulama aracını kullanın.',
      'Sınırlar aralığa dahildir: 97 ile 101 arası listelendiğinde her iki sayı da görünür.',
      '0 ve 1 asal olmadığından alt sınır 0 ya da 1 yazılsa da liste 2\'den başlar.',
      'Listedeki sayılar binlik ayraçsız yazılır; böylece tabloya ya da koda yapıştırıldığında sayı olarak tanınır.',
    ] },
  ],
  faq: [
    ['1 ile 100 arasında kaç asal sayı vardır?', '25 tane asal sayı vardır. İlki 2, sonuncusu 97\'dir ve toplamları 1.060 eder.'],
    ['1 neden listede yok?', '1 asal sayı değildir. Asal sayıların tam iki pozitif böleni olmalıdır; 1\'in yalnızca bir böleni vardır. Bu yüzden liste her zaman en erken 2\'den başlar.'],
    ['İkiz asal nedir?', 'Aralarındaki fark 2 olan asal sayı çiftlerine ikiz asal denir: 3 ile 5, 11 ile 13, 41 ile 43 gibi. Araç listelenen aralıktaki ikiz asal çiftlerini sayar.'],
    ['İki basamaklı kaç asal sayı vardır?', 'Alt sınıra 10, üst sınıra 99 yazarak görebilirsiniz: 21 tane iki basamaklı asal sayı vardır. En küçüğü 11, en büyüğü 97\'dir.'],
    ['Üç basamaklı en küçük ve en büyük asal sayı hangisidir?', 'Üç basamaklı en küçük asal 101, en büyük asal 997\'dir. 100 ile 999 arasını listelediğinizde 143 asal sayı çıkar.'],
    ['Eratosten kalburu nedir?', 'Belirli bir sınıra kadar olan asalları bulmak için kullanılan eleme yöntemidir. 2\'den başlanarak her asalın katları elenir; elenmeden kalan sayılar asaldır. Bu araç aynı yöntemi kullanır.'],
    ['Listeyi elektronik tabloya nasıl aktarırım?', '"Liste biçimi" olarak "Her satırda bir sayı" seçeneğini seçin, sonucu kopyalayın ve tabloda bir hücreye yapıştırın. Her asal sayı ayrı bir satıra yerleşir.'],
    ['Yazdığım aralık ya da liste kaydediliyor mu?', 'Hayır. Liste tarayıcınızda üretilir; girdiğiniz sınırlar ve sonuç hiçbir sunucuya gönderilmez.'],
  ],
  related: ['asal-sayi-sorgula', 'asal-carpan-hesapla', 'bolen-hesapla', 'ebob-ekok', 'fibonacci-hesapla'],
};
