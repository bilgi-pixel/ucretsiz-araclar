export default {
  slug: 'ardisik-sayi-toplami',
  title: 'Ardışık Sayıların Toplamı',
  h1Tail: 'Gauss yöntemiyle',
  pageTitle: 'Ardışık Sayıların Toplamı Hesaplama – 1\'den n\'ye Toplam Formülü',
  description: 'İki tam sayı arasındaki ardışık sayıların, yalnızca tek ya da yalnızca çift sayıların toplamını bulun. Terim sayısı ve ortalama da gösterilir.',
  card: 'İki sayı arasındaki ardışık tam sayıların, tek ya da çift sayıların toplamını terim sayısıyla birlikte bulun.',
  category: 'matematik',
  keywords: ['ardışık sayıların toplamı', '1 den n ye kadar toplam', 'ardışık tek sayıların toplamı', 'ardışık çift sayıların toplamı', 'gauss toplam formülü', 'terim sayısı formülü', '1 den 100 e kadar sayıların toplamı'],
  lead: `Başlangıç ve bitiş sayısını yazın; aradaki ardışık tam sayıların toplamını, kaç terim olduğunu ve ortalamayı anında görün. İsterseniz yalnızca <strong>tek</strong> ya da yalnızca <strong>çift</strong> sayıları toplatabilirsiniz.`,
  button: 'Hesapla',
  inputs: [
    { id: 'bas', label: 'Başlangıç sayısı', type: 'number', placeholder: 'Örn. 1', value: '1' },
    { id: 'bit', label: 'Bitiş sayısı', type: 'number', placeholder: 'Örn. 100' },
    { id: 'tur', label: 'Hangi sayılar toplansın?', type: 'select', options: [['tum', 'Tüm tam sayılar'], ['tek', 'Yalnızca tek sayılar'], ['cift', 'Yalnızca çift sayılar']] },
  ],
  compute(v, h) {
    const a = h.int(v.bas, 'Başlangıç sayısı');
    const b = h.int(v.bit, 'Bitiş sayısı');
    if (Math.abs(a) > 1e12 || Math.abs(b) > 1e12) h.err('Sayılar en fazla 13 basamaklı olabilir; daha küçük bir aralık yazın.');
    if (a > b) h.err('Başlangıç sayısı bitiş sayısından büyük olamaz; iki değerin yerini değiştirin.');
    let ilk = BigInt(a), son = BigInt(b), adim = 1n;
    const mod2 = (x) => ((x % 2n) + 2n) % 2n;
    if (v.tur === 'tek' || v.tur === 'cift') {
      const hedef = v.tur === 'tek' ? 1n : 0n;
      adim = 2n;
      if (mod2(ilk) !== hedef) ilk += 1n;
      if (mod2(son) !== hedef) son -= 1n;
      if (ilk > son) h.err(v.tur === 'tek' ? 'Bu aralıkta tek sayı yok; aralığı genişletin.' : 'Bu aralıkta çift sayı yok; aralığı genişletin.');
    }
    const n = (son - ilk) / adim + 1n;
    const ikiKat = (ilk + son) * n; // toplamın iki katı; her zaman çifttir
    const toplam = ikiKat / 2n;
    const tr = (x) => x.toLocaleString('tr-TR');
    const us = ilk + son;
    const mutlak = us < 0n ? -us : us;
    const ort = us % 2n === 0n ? tr(us / 2n) : (us < 0n ? '-' : '') + tr(mutlak / 2n) + ',5';
    return {
      rows: [
        ['Toplam', tr(toplam)],
        ['Terim sayısı', tr(n)],
        ['İlk terim', tr(ilk)],
        ['Son terim', tr(son)],
        ['Ortalama', ort],
      ],
      note: 'Toplam = terim sayısı × (ilk terim + son terim) ÷ 2. Başlangıç ve bitiş sayıları toplama dahildir.',
    };
  },
  cases: [
    { in: { bas: '1', bit: '100', tur: 'tum' }, out: { 'Toplam': '5.050', 'Terim sayısı': '100', 'Ortalama': '50,5' } },
    { in: { bas: '1', bit: '100', tur: 'tek' }, out: { 'Toplam': '2.500', 'Terim sayısı': '50', 'Son terim': '99' } },
    { in: { bas: '1', bit: '100', tur: 'cift' }, out: { 'Toplam': '2.550', 'Terim sayısı': '50', 'İlk terim': '2' } },
    { in: { bas: '10', bit: '20', tur: 'tum' }, out: { 'Toplam': '165', 'Terim sayısı': '11', 'Ortalama': '15' } },
    { in: { bas: '-5', bit: '5', tur: 'tum' }, out: { 'Toplam': '0', 'Terim sayısı': '11' } },
    { in: { bas: '1', bit: '1000000', tur: 'tum' }, out: { 'Toplam': '500.000.500.000' } },
    { in: { bas: '15', bit: '45', tur: 'tek' }, out: { 'Toplam': '480', 'Terim sayısı': '16' } },
    { in: { bas: '20', bit: '10', tur: 'tum' }, error: true },
    { in: { bas: '3', bit: '3', tur: 'cift' }, error: true },
    { in: { bas: '1', bit: 'abc', tur: 'tum' }, error: true },
  ],
  howto: [
    `"Başlangıç sayısı" alanına toplamın ilk sayısını yazın. 1'den başlayan klasik sorular için alan hazır olarak 1 gelir.`,
    `"Bitiş sayısı" alanına son sayıyı yazın. Her iki sayı da toplama dahil edilir; negatif tam sayılar da kabul edilir.`,
    `Listeden tüm tam sayıları mı, yalnızca tekleri mi, yoksa yalnızca çiftleri mi toplamak istediğinizi seçin.`,
    `"Hesapla" düğmesine basın. Toplamın yanında terim sayısı, gerçekten toplanan ilk ve son terim ile ortalama görünür.`,
  ],
  sections: [
    { h: 'Ardışık sayıların toplamı formülü', p: [
      `Aralarında sabit fark bulunan sayıların toplamı, sayıları tek tek toplamadan bulunabilir. Kural şudur: <strong>Toplam = terim sayısı × (ilk terim + son terim) ÷ 2</strong>. Terim sayısı ise <strong>(son terim − ilk terim) ÷ artış miktarı + 1</strong> işlemiyle bulunur. Ardışık tam sayılarda artış miktarı 1, ardışık tek ya da çift sayılarda 2'dir.`,
      `Formülün mantığı basittir: diziyi bir kez düz, bir kez ters yazıp alt alta toplarsanız her sütun aynı sonucu, yani ilk terim ile son terimin toplamını verir. Sütun sayısı terim sayısı kadardır; iki dizi topladığımız için sonuç ikiye bölünür. Bu yöntem, öğretmeninin verdiği 1'den 100'e kadar toplama ödevini dakikalar içinde çözdüğü anlatılan matematikçi Gauss'un adıyla anılır.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Örnek 1:</strong> 1'den 100'e kadar olan sayıların toplamı. Terim sayısı (100 − 1) ÷ 1 + 1 = 100'dür. Toplam = 100 × (1 + 100) ÷ 2 = 100 × 101 ÷ 2 = <strong>5.050</strong>. Ortalama ise ilk ve son terimin ortalaması olan 50,5'tir.`,
      `<strong>Örnek 2:</strong> 10'dan 20'ye kadar olan sayıların toplamı. Terim sayısı 20 − 10 + 1 = 11'dir; burada en sık yapılan hata 10 terim saymaktır. Toplam = 11 × (10 + 20) ÷ 2 = 11 × 15 = <strong>165</strong>.`,
      `<strong>Örnek 3:</strong> 15 ile 45 arasındaki tek sayıların toplamı. İlk terim 15, son terim 45, artış 2'dir. Terim sayısı (45 − 15) ÷ 2 + 1 = 16. Toplam = 16 × (15 + 45) ÷ 2 = 16 × 30 = <strong>480</strong>.`,
      `<strong>Örnek 4:</strong> 1 ile 100 arasındaki çift sayıların toplamı. Araç başlangıcı ilk çift sayı olan 2'ye kaydırır; 2'den 100'e 50 terim vardır. Toplam = 50 × (2 + 100) ÷ 2 = <strong>2.550</strong>. Aynı aralıktaki tek sayıların toplamı 2.500'dür ve ikisinin toplamı beklendiği gibi 5.050 eder.`,
    ] },
    { h: 'Ezberlenmeye değer kısa formüller', ul: [
      `<strong>1 + 2 + 3 + … + n</strong> = n × (n + 1) ÷ 2`,
      `<strong>1 + 3 + 5 + … + (2n − 1)</strong> = n² (ilk n tek sayının toplamı, n'nin karesidir)`,
      `<strong>2 + 4 + 6 + … + 2n</strong> = n × (n + 1)`,
      `1'den 10'a kadar toplam 55, 1'den 50'ye kadar 1.275, 1'den 100'e kadar 5.050, 1'den 1.000'e kadar 500.500'dür.`,
      `Simetrik aralıkların toplamı sıfırdır: −5'ten 5'e kadar olan on bir sayının toplamı 0 eder.`,
    ] },
    { h: 'Nerelerde işe yarar?', p: [
      `Bu konu ortaokul ve lise matematiğinde "ardışık sayılar" ve "sayı problemleri" başlıklarında, ayrıca LGS, TYT, KPSS ve ALES gibi sınavların sayısal bölümlerinde sık sık karşınıza çıkar. Sorular genellikle doğrudan toplamı değil, toplam verilip terim sayısının ya da ortadaki sayının bulunmasını ister; araçtaki ortalama satırı bu tür soruları kontrol etmek için kullanışlıdır. Terim sayısı tek olduğunda ortalama, dizinin tam ortasındaki sayıya eşittir.`,
      `Gündelik hayatta da karşılığı vardır. Her gün bir öncekinden bir lira fazla biriktirilen kumbara oyununda 365 günün sonunda biriken para 1'den 365'e kadar olan sayıların toplamı, yani 66.795 liradır. Bir ligde her takımın diğerleriyle birer kez oynadığı maç sayısı, üst üste dizilen kutu ya da tuğla sıralarındaki toplam parça sayısı ve programlamada iç içe döngülerin adım sayısı da aynı formülle hesaplanır.`,
    ] },
    { h: 'Sık yapılan hatalar ve aracın sınırları', p: [
      `En yaygın hata terim sayısını bir eksik bulmaktır: iki sayının farkı, aradaki adım sayısını verir; terim sayısı bunun bir fazlasıdır. İkinci yaygın hata, tek ya da çift sayı toplarken artış miktarını 2 almayı unutmaktır. Üçüncüsü ise "arasındaki" ifadesinin uç sayıları kapsayıp kapsamadığını gözden kaçırmaktır. Bu araç uçları <strong>dahil</strong> eder; soruda uçlar hariç tutuluyorsa başlangıcı bir artırıp bitişi bir azaltarak yazın.`,
      `Araç yalnızca tam sayılarla çalışır ve her iki uç için 13 basamağa kadar değer kabul eder. Hesap tam sayı aritmetiğiyle yapıldığından çok büyük aralıklarda bile yuvarlama hatası oluşmaz. Ondalıklı ya da farklı artış miktarına sahip diziler için aritmetik dizi aracını kullanabilirsiniz.`,
    ] },
  ],
  faq: [
    ['1\'den 100\'e kadar olan sayıların toplamı kaçtır?', '5.050\'dir. Hesap 100 × 101 ÷ 2 işlemiyle yapılır. Bu toplamın içindeki tek sayıların toplamı 2.500, çift sayıların toplamı 2.550\'dir.'],
    ['Terim sayısı nasıl bulunur?', 'Son terimden ilk terim çıkarılır, artış miktarına bölünür ve sonuca 1 eklenir. Örneğin 7\'den 31\'e kadar 3\'er artan sayılarda (31 − 7) ÷ 3 + 1 = 9 terim vardır.'],
    ['Ardışık tek sayıların toplamı nasıl hesaplanır?', 'Formül aynıdır, yalnızca artış 2 alınır. 1\'den başlayan ilk n tek sayının toplamı doğrudan n²\'dir; örneğin 1 + 3 + 5 + 7 + 9 = 5² = 25 eder.'],
    ['Başlangıç sayısı 1 olmak zorunda mı?', 'Hayır. Herhangi bir tam sayıdan başlayabilirsiniz; negatif sayılar da geçerlidir. Tek koşul, başlangıcın bitişten büyük olmamasıdır.'],
    ['Tek sayıları seçtim ama başlangıcım çift; ne olur?', 'Araç aralığın içindeki ilk tek sayıdan başlar. Örneğin 10 ile 20 arasında tek sayılar seçildiğinde 11\'den 19\'a kadar olan beş sayı toplanır ve sonuçta gerçek ilk ve son terim ayrıca gösterilir.'],
    ['Toplamı bilinen ardışık sayılarda ortadaki sayı nasıl bulunur?', 'Toplam terim sayısına bölünür; sonuç ortalamadır. Terim sayısı tekse bu değer ortadaki sayının kendisidir. Örneğin toplamı 75 olan ardışık beş sayının ortancası 75 ÷ 5 = 15\'tir; sayılar 13, 14, 15, 16 ve 17 olur.'],
    ['Çok büyük sayılarda sonuç doğru mu?', 'Evet. Hesap, basamak sınırı olmayan tam sayı aritmetiğiyle yapılır; 1\'den 1.000.000\'a kadar olan toplam tam olarak 500.000.500.000 çıkar.'],
    ['Yazdığım sayılar kaydediliyor mu?', 'Hayır. Hesaplama yalnızca tarayıcınızda yapılır; girdiğiniz sayılar hiçbir sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['aritmetik-dizi-hesapla', 'geometrik-dizi-hesapla', 'ortalama-hesapla', 'fibonacci-hesapla', 'faktoriyel-hesapla'],
};
