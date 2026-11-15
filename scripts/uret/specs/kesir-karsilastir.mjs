export default {
  slug: 'kesir-karsilastir',
  title: 'Kesir Karşılaştırma',
  h1Tail: 'hangisi büyük?',
  pageTitle: 'Kesir Karşılaştırma – İki Kesirden Hangisi Büyük Hesaplama',
  description: 'İki kesri karşılaştırın: hangisinin büyük olduğunu, ortak paydayı, eşit paydalı yazılışlarını, aradaki farkı ve ondalık değerlerini tek adımda görün.',
  card: 'İki kesirden hangisinin büyük olduğunu bulun; ortak payda, eşit paydalı kesirler ve aradaki fark gösterilir.',
  category: 'matematik',
  keywords: ['kesir karşılaştırma', 'hangi kesir büyük', 'kesirleri karşılaştırma', 'kesir sıralama', 'payda eşitleme', 'kesir büyüklük küçüklük', 'iki kesri karşılaştır'],
  lead: 'İki kesrin pay ve paydasını yazın; araç <strong>hangisinin büyük olduğunu</strong> söyler, paydaları eşitleyerek karşılaştırmanın nasıl yapıldığını gösterir ve aradaki farkı en sade kesir olarak verir.',
  button: 'Karşılaştır',
  inputs: [
    { id: 'pay1', label: 'Birinci kesir – pay', type: 'number', placeholder: 'Örn. 3' },
    { id: 'payda1', label: 'Birinci kesir – payda', type: 'number', placeholder: 'Örn. 4' },
    { id: 'pay2', label: 'İkinci kesir – pay', type: 'number', placeholder: 'Örn. 2' },
    { id: 'payda2', label: 'İkinci kesir – payda', type: 'number', placeholder: 'Örn. 3' },
  ],
  compute(v, h) {
    const oku = (s, ad) => {
      const n = h.int(s, ad);
      if (Math.abs(n) > 1e12) h.err(`"${ad}" en fazla 12 basamaklı olabilir.`);
      return BigInt(n);
    };
    let a = oku(v.pay1, 'Birinci kesir – pay'), b = oku(v.payda1, 'Birinci kesir – payda');
    let c = oku(v.pay2, 'İkinci kesir – pay'), d = oku(v.payda2, 'İkinci kesir – payda');
    if (b === 0n || d === 0n) h.err('Payda sıfır olamaz; sıfıra bölme tanımsızdır. Her iki paydaya da sıfırdan farklı bir sayı yazın.');
    if (b < 0n) { a = -a; b = -b; }
    if (d < 0n) { c = -c; d = -d; }
    const mutlak = (x) => (x < 0n ? -x : x);
    const ebob = (x, y) => { x = mutlak(x); y = mutlak(y); while (y) { const t = x % y; x = y; y = t; } return x; };
    const ekok = (b / ebob(b, d)) * d;
    const g1 = a * (ekok / b), g2 = c * (ekok / d);
    const isaret = g1 > g2 ? '>' : g1 < g2 ? '<' : '=';
    const fp = mutlak(g1 - g2);
    const fg = fp === 0n ? 1n : ebob(fp, ekok);
    const fark = fp === 0n ? '0' : ekok / fg === 1n ? String(fp / fg) : `${fp / fg}/${ekok / fg}`;
    const k1 = `${a}/${b}`, k2 = `${c}/${d}`;
    const o1 = Number(a) / Number(b), o2 = Number(c) / Number(d);
    return {
      rows: [
        ['Sonuç', `${k1} ${isaret} ${k2}`],
        ['Ortak payda', String(ekok)],
        ['Eşit paydalı kesirler', `${g1}/${ekok} ve ${g2}/${ekok}`],
        ['Fark', fark],
        ['Ondalık değerler', `${h.fmt(o1, 6)} ve ${h.fmt(o2, 6)}`],
      ],
      note: isaret === '=' ? 'İki kesir denktir; aynı sayının farklı yazılışlarıdır.' : `Paydalar ${ekok} sayısında eşitlendi; payı büyük olan kesir daha büyüktür. Büyük olan: ${isaret === '>' ? k1 : k2}.`,
    };
  },
  cases: [
    { in: { pay1: '3', payda1: '4', pay2: '2', payda2: '3' }, out: { 'Sonuç': '3/4 > 2/3', 'Ortak payda': '12', 'Eşit paydalı kesirler': '9/12 ve 8/12', 'Fark': '1/12', 'Ondalık değerler': '0,75 ve 0,666667' } },
    { in: { pay1: '5', payda1: '8', pay2: '7', payda2: '10' }, out: { 'Sonuç': '5/8 < 7/10', 'Ortak payda': '40', 'Eşit paydalı kesirler': '25/40 ve 28/40', 'Fark': '3/40' } },
    { in: { pay1: '1', payda1: '2', pay2: '2', payda2: '4' }, out: { 'Sonuç': '1/2 = 2/4', 'Ortak payda': '4', 'Eşit paydalı kesirler': '2/4 ve 2/4', 'Fark': '0' } },
    { in: { pay1: '-1', payda1: '2', pay2: '1', payda2: '3' }, out: { 'Sonuç': '-1/2 < 1/3', 'Ortak payda': '6', 'Eşit paydalı kesirler': '-3/6 ve 2/6', 'Fark': '5/6' } },
    { in: { pay1: '7', payda1: '9', pay2: '5', payda2: '6' }, out: { 'Sonuç': '7/9 < 5/6', 'Ortak payda': '18', 'Eşit paydalı kesirler': '14/18 ve 15/18', 'Fark': '1/18' } },
    { in: { pay1: '2', payda1: '5', pay2: '3', payda2: '7' }, out: { 'Sonuç': '2/5 < 3/7', 'Ortak payda': '35', 'Eşit paydalı kesirler': '14/35 ve 15/35', 'Fark': '1/35' } },
    { in: { pay1: '7', payda1: '2', pay2: '3', payda2: '2' }, out: { 'Sonuç': '7/2 > 3/2', 'Ortak payda': '2', 'Fark': '2' } },
    { in: { pay1: '3', payda1: '-4', pay2: '-2', payda2: '3' }, out: { 'Sonuç': '-3/4 < -2/3', 'Fark': '1/12' } },
    { in: { pay1: '3', payda1: '0', pay2: '2', payda2: '3' }, error: true },
    { in: { pay1: '3', payda1: '4', pay2: '', payda2: '3' }, error: true },
    { in: { pay1: '1,5', payda1: '4', pay2: '2', payda2: '3' }, error: true },
  ],
  howto: [
    'Birinci kesrin payını ve paydasını ilk iki alana, ikinci kesrin payını ve paydasını son iki alana yazın.',
    'Negatif kesir için eksi işaretini paya koyun. Tam sayıyı karşılaştırmak isterseniz paydaya 1 yazın.',
    '"Karşılaştır" düğmesine basın. "Sonuç" satırında iki kesir arasına büyüktür, küçüktür ya da eşittir işareti yerleştirilmiş olarak görünür.',
    '"Eşit paydalı kesirler" satırı, paydalar eşitlendikten sonraki yazılışları verir; bu satırı ödev çözümünde ara adım olarak kullanabilirsiniz.',
  ],
  sections: [
    { h: 'Kesirler neden doğrudan karşılaştırılamaz?', p: [
      'Tam sayılarda büyük olanı görmek kolaydır, kesirlerde ise iki ayrı sayı vardır ve payda büyüdükçe parçalar küçülür. 1/8, 1/4\'ten küçüktür; çünkü bir bütünü sekize bölünce çıkan dilim, dörde bölünce çıkan dilimden daha küçüktür. Bu yüzden yalnızca paya ya da yalnızca paydaya bakarak karar vermek yanıltır: 5/8 ile 7/10 kesirlerinde pay da payda da ikincide büyüktür, ama hangisinin büyük olduğu ilk bakışta belli değildir.',
      'Sağlıklı bir karşılaştırma için iki kesrin aynı büyüklükte parçalarla ifade edilmesi gerekir. Parçalar eşit olunca geriye yalnızca "kaç parça" sorusu kalır ve pay sayıları doğrudan karşılaştırılabilir. Araç bu amaçla paydaları eşitler.',
    ] },
    { h: 'Payda eşitleme yöntemi', p: [
      'İki paydanın en küçük ortak katı (EKOK) ortak payda olarak seçilir. Her kesir, paydasını ortak paydaya tamamlayan sayıyla genişletilir; yani payı ve paydası aynı sayıyla çarpılır. Genişletme kesrin değerini değiştirmez.',
      '<strong>Çözümlü örnek:</strong> 3/4 ile 2/3 karşılaştırılsın. 4 ile 3\'ün EKOK\'u 12\'dir. Birinci kesir 3 ile genişletilir: 3/4 = 9/12. İkinci kesir 4 ile genişletilir: 2/3 = 8/12. 9 parça 8 parçadan fazla olduğuna göre 3/4 > 2/3\'tür. Aradaki fark 9/12 − 8/12 = 1/12 eder. Araç aynı girdiler için ortak paydayı 12, eşit paydalı kesirleri 9/12 ve 8/12, farkı 1/12 olarak verir.',
      '<strong>İkinci örnek:</strong> 5/8 ile 7/10 için EKOK 40\'tır. 5/8 = 25/40 ve 7/10 = 28/40 olur. 25 < 28 olduğundan 5/8 < 7/10\'dur ve fark 3/40\'tır.',
    ] },
    { h: 'Çapraz çarpım kısa yolu', p: [
      'Yalnızca hangisinin büyük olduğu soruluyorsa ortak paydayı bulmadan da sonuca varılabilir. Paydalar pozitifken birinci kesrin payı ikincinin paydasıyla, ikinci kesrin payı birincinin paydasıyla çarpılır; hangi çarpım büyükse o payın ait olduğu kesir büyüktür. 3/4 ile 2/3 için 3 × 3 = 9 ve 2 × 4 = 8 bulunur; 9 > 8 olduğundan 3/4 büyüktür.',
      'Bu yöntem aslında paydaları iki paydanın çarpımında eşitlemenin kısaltılmış hâlidir. Hızlıdır ama aradaki farkı vermez; farkı görmek için yine payda eşitlemek gerekir.',
    ] },
    { h: 'Hesap yapmadan karar verilebilen durumlar', ul: [
      '<strong>Paydalar eşitse</strong> payı büyük olan kesir büyüktür: 5/9 > 4/9.',
      '<strong>Paylar eşitse</strong> paydası küçük olan kesir büyüktür: 3/5 > 3/7, çünkü beşte birlik dilim yedide birlik dilimden büyüktür.',
      '<strong>Yarıma göre konum:</strong> bir kesrin payı paydasının yarısından büyükse kesir 1/2\'den büyüktür. 4/7 yarımdan büyük, 3/8 yarımdan küçüktür; öyleyse 4/7 > 3/8.',
      '<strong>Bütüne yakınlık:</strong> pay ile payda arasındaki fark aynıysa paydası büyük olan kesir 1\'e daha yakındır ve daha büyüktür: 7/8 > 5/6, çünkü birinde bütüne 1/8, diğerinde 1/6 eksik kalır.',
      '<strong>Biri basit, diğeri bileşikse</strong> bileşik kesir her zaman büyüktür: 5/4 > 9/10.',
    ] },
    { h: 'Negatif kesirlerde karşılaştırma', p: [
      'Negatif sayılarda sıralama tersine döner: sıfırdan uzaklaştıkça sayı küçülür. 3/4, 2/3\'ten büyüktür; ama -3/4, -2/3\'ten küçüktür. Araç eksi işaretini paya taşıyarak işlem yapar; paydada eksi yazsanız bile sonuçta kesir işareti başta olacak biçimde gösterilir. Bir kesir negatif, diğeri pozitifse hesap gerekmez; pozitif olan büyüktür.',
    ] },
    { h: 'Kullanım alanları ve sınırlar', p: [
      'Kesir karşılaştırma, ilkokuldan başlayarak ortaokul boyunca işlenen bir konudur ve sıralama sorularının temelidir. Günlük hayatta da karşımıza çıkar: 3/4 inçlik anahtar mı büyük, 5/8 inçlik mi; tarifteki 2/3 bardak süt mü fazla, 3/5 bardak mı; iki farklı ambalajdan hangisinde birim başına daha çok ürün var? İkiden fazla kesri sıralamak için kesirleri ikişer ikişer karşılaştırabilir ya da ondalık değerlerine bakabilirsiniz.',
      'Araç pay ve paydada yalnızca tam sayı kabul eder. Tam sayılı kesirleri karşılaştırmadan önce bileşik kesre çevirin; örneğin 1 tam 1/2 yerine 3/2 yazın. Karşılaştırma tam sayı aritmetiğiyle yapıldığından sonuç yuvarlama hatası içermez; ondalık değerler ise altı basamağa yuvarlanarak yalnızca fikir vermesi için gösterilir.',
    ] },
  ],
  faq: [
    ['İki kesirden hangisinin büyük olduğu nasıl bulunur?', 'Paydalar eşitlenir ve paylar karşılaştırılır. Paydaları eşit iki kesirden payı büyük olan büyüktür. 3/4 ve 2/3 için ortak payda 12\'dir; 9/12 > 8/12 olduğundan 3/4 büyüktür.'],
    ['Paydası büyük olan kesir daha mı büyüktür?', 'Hayır, çoğu zaman tersidir. Paylar eşitken payda büyüdükçe kesir küçülür: 1/10, 1/2\'den küçüktür. Paylar farklıysa yalnızca paydaya bakarak karar verilemez.'],
    ['Ortak payda olarak neden EKOK kullanılıyor?', 'Paydaların çarpımı da ortak payda olur, ancak EKOK en küçük ortak paydayı verir ve sayıları gereksiz yere büyütmez. 5/6 ile 7/9 için çarpım 54, EKOK ise 18\'dir.'],
    ['Çapraz çarpım yöntemi her zaman doğru sonuç verir mi?', 'Paydalar pozitifse evet. Paydalardan biri negatifse önce işaret paya taşınmalıdır; aksi hâlde eşitsizliğin yönü ters çıkar. Araç bu düzeltmeyi kendiliğinden yapar.'],
    ['Denk kesir ne demektir?', 'Yazılışları farklı ama değerleri aynı olan kesirlerdir. 1/2, 2/4 ve 50/100 denk kesirlerdir. Araç böyle iki kesir girildiğinde aralarına eşittir işareti koyar ve farkı 0 olarak gösterir.'],
    ['Bir kesri tam sayıyla nasıl karşılaştırırım?', 'Tam sayıyı paydası 1 olan bir kesir olarak yazın. 7/2 ile 3\'ü karşılaştırmak için ikinci kesre pay 3, payda 1 girin; sonuç 7/2 > 3/1 olur.'],
    ['Üç ya da daha fazla kesri nasıl sıralarım?', 'Hepsinin paydasını aynı ortak katta eşitleyip payları sıralayabilirsiniz. Bu araçla ikişer ikişer karşılaştırmak ya da ondalık değerlerini not edip küçükten büyüğe dizmek de aynı sonucu verir.'],
    ['Girdiğim kesirler sunucuya gönderiliyor mu?', 'Hayır. Karşılaştırma tarayıcınızda yapılır; yazdığınız sayılar hiçbir yere iletilmez ve saklanmaz.'],
  ],
  related: ['kesir-hesapla', 'kesir-sadelestir', 'bilesik-kesir-cevir', 'ebob-ekok', 'ondalik-kesir-cevir', 'sayi-siralama'],
};
