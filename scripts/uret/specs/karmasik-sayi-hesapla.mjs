export default {
  slug: 'karmasik-sayi-hesapla',
  title: 'Karmaşık Sayı Hesaplama',
  h1Tail: 'dört işlem, modül, argüman',
  pageTitle: 'Karmaşık Sayı Hesaplama – Toplama, Çarpma, Bölme, Modül ve Argüman',
  description: 'İki karmaşık sayıyı toplayın, çıkarın, çarpın ya da bölün. Sonucun a + bi biçimini, modülünü, argümanını, eşleniğini ve kutupsal gösterimini görün.',
  card: 'İki karmaşık sayıyla dört işlem yapın; sonucun modülünü, argümanını, eşleniğini ve kutupsal biçimini görün.',
  category: 'matematik',
  keywords: ['karmaşık sayı hesaplama', 'karmaşık sayılarda çarpma', 'karmaşık sayılarda bölme', 'karmaşık sayının modülü', 'karmaşık sayının argümanı', 'eşlenik hesaplama', 'kutupsal gösterim', 'sanal sayı hesaplama'],
  lead: 'İki karmaşık sayının gerçek ve sanal kısımlarını yazıp işlemi seçin. Araç sonucu <strong>a + bi</strong> biçiminde verir; ayrıca sonucun modülünü, argümanını, eşleniğini ve kutupsal gösterimini hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 're1', label: 'z₁ gerçek kısım (a)', type: 'number', placeholder: 'Örn. 3' },
    { id: 'im1', label: 'z₁ sanal kısım (b)', type: 'number', placeholder: 'Örn. 4' },
    { id: 'islem', label: 'İşlem', type: 'select', options: [['topla', 'Toplama (z₁ + z₂)'], ['cikar', 'Çıkarma (z₁ − z₂)'], ['carp', 'Çarpma (z₁ · z₂)'], ['bol', 'Bölme (z₁ ÷ z₂)']] },
    { id: 're2', label: 'z₂ gerçek kısım (c)', type: 'number', placeholder: 'Örn. 1' },
    { id: 'im2', label: 'z₂ sanal kısım (d)', type: 'number', placeholder: 'Örn. -2' },
  ],
  compute(v, h) {
    const a = h.num(v.re1, 'z₁ gerçek kısım');
    const b = h.num(v.im1, 'z₁ sanal kısım');
    const c = h.num(v.re2, 'z₂ gerçek kısım');
    const d = h.num(v.im2, 'z₂ sanal kısım');
    let re, im;
    if (v.islem === 'cikar') { re = a - c; im = b - d; }
    else if (v.islem === 'carp') { re = a * c - b * d; im = a * d + b * c; }
    else if (v.islem === 'bol') {
      const payda = c * c + d * d;
      if (payda === 0) h.err('Sıfıra bölünemez: z₂ için gerçek ve sanal kısımdan en az biri sıfırdan farklı olmalı.');
      re = (a * c + b * d) / payda; im = (b * c - a * d) / payda;
    } else { re = a + c; im = b + d; }
    const yuv = (x) => { const y = Number(x.toFixed(4)); return Object.is(y, -0) ? 0 : y; };
    const yaz = (x, y) => {
      const p = yuv(x), q = yuv(y);
      if (q === 0) return h.fmt(p, 4);
      const k = Math.abs(q) === 1 ? 'i' : h.fmt(Math.abs(q), 4) + 'i';
      if (p === 0) return (q < 0 ? '-' : '') + k;
      return `${h.fmt(p, 4)} ${q < 0 ? '-' : '+'} ${k}`;
    };
    const mod = Math.hypot(re, im);
    const sifir = yuv(re) === 0 && yuv(im) === 0;
    const arg = (Math.atan2(yuv(im), yuv(re)) * 180) / Math.PI;
    return {
      rows: [
        ['Sonuç', yaz(re, im)],
        ['Modül |z|', h.fmt(mod, 4)],
        ['Argüman', sifir ? 'tanımsız' : h.fmt(arg, 4) + '°'],
        ['Eşlenik', yaz(re, -im)],
        ['Kutupsal gösterim', sifir ? '0' : `${h.fmt(mod, 4)} · (cos ${h.fmt(arg, 4)}° + i · sin ${h.fmt(arg, 4)}°)`],
        ['|z₁|', h.fmt(Math.hypot(a, b), 4)],
        ['|z₂|', h.fmt(Math.hypot(c, d), 4)],
      ],
      note: 'Argüman −180° ile 180° arasındaki esas değer olarak verilir. Sonuçlar dört ondalık basamağa yuvarlanır.',
    };
  },
  cases: [
    { in: { re1: '3', im1: '4', islem: 'carp', re2: '1', im2: '-2' }, out: { 'Sonuç': '11 - 2i', 'Modül |z|': '11,1803', 'Eşlenik': '11 + 2i', '|z₁|': '5', '|z₂|': '2,2361' } },
    { in: { re1: '3', im1: '4', islem: 'bol', re2: '1', im2: '-2' }, out: { 'Sonuç': '-1 + 2i', 'Modül |z|': '2,2361', 'Argüman': '116,5651°' } },
    { in: { re1: '3', im1: '4', islem: 'topla', re2: '1', im2: '-2' }, out: { 'Sonuç': '4 + 2i', 'Modül |z|': '4,4721' } },
    { in: { re1: '5', im1: '3', islem: 'cikar', re2: '2', im2: '7' }, out: { 'Sonuç': '3 - 4i', 'Modül |z|': '5', 'Argüman': '-53,1301°' } },
    { in: { re1: '0', im1: '1', islem: 'carp', re2: '0', im2: '1' }, out: { 'Sonuç': '-1', 'Argüman': '180°', 'Modül |z|': '1' } },
    { in: { re1: '1', im1: '1', islem: 'carp', re2: '1', im2: '-1' }, out: { 'Sonuç': '2', 'Argüman': '0°' } },
    { in: { re1: '1', im1: '0', islem: 'bol', re2: '0', im2: '1' }, out: { 'Sonuç': '-i', 'Argüman': '-90°', 'Eşlenik': 'i' } },
    { in: { re1: '2', im1: '3', islem: 'cikar', re2: '2', im2: '3' }, out: { 'Sonuç': '0', 'Argüman': 'tanımsız' } },
    { in: { re1: '3', im1: '4', islem: 'bol', re2: '0', im2: '0' }, error: true },
    { in: { re1: 'x', im1: '4', islem: 'topla', re2: '1', im2: '2' }, error: true },
  ],
  howto: [
    'Birinci sayı z₁ = a + bi için gerçek kısmı (a) ve sanal kısmı (b) ilgili alanlara yazın. Sanal kısım yoksa 0 girin.',
    '"İşlem" listesinden toplama, çıkarma, çarpma ya da bölmeyi seçin.',
    'İkinci sayı z₂ = c + di için gerçek kısmı (c) ve sanal kısmı (d) yazın. Negatif değerlerin başına eksi işareti koyun.',
    '"Hesapla" düğmesine basın. İlk satırda işlemin sonucu, altında modül, argüman, eşlenik ve kutupsal gösterim yer alır.',
    'Tek bir sayının modülünü ve argümanını görmek için o sayıyı z₁ olarak yazıp z₂ = 0 ile toplama yapabilirsiniz.',
  ],
  sections: [
    { h: 'Karmaşık sayı nedir?', p: [
      'Gerçek sayılar kümesinde karesi negatif olan bir sayı yoktur; bu yüzden x² = −1 gibi bir denklemin gerçek kökü bulunmaz. Bu boşluğu doldurmak için <strong>i² = −1</strong> eşitliğini sağlayan sanal birim <em>i</em> tanımlanır. a ve b gerçek sayılar olmak üzere <strong>z = a + bi</strong> biçimindeki her sayıya karmaşık sayı denir. Burada a sayının gerçek kısmı, b ise sanal kısmıdır.',
      'Karmaşık sayılar düzlemde bir nokta gibi düşünülebilir: yatay eksen gerçek kısmı, düşey eksen sanal kısmı gösterir. Bu düzleme karmaşık düzlem denir. 3 + 4i sayısı düzlemde (3, 4) noktasına karşılık gelir. Lise müfredatında ikinci dereceden denklemlerin köklerinde karşımıza çıkan bu sayılar; alternatif akım devre analizinde, sinyal işlemede, kontrol sistemlerinde ve kuantum mekaniğinde temel araçtır. Elektrik mühendisliğinde akımla karışmaması için sanal birim genellikle <em>j</em> harfiyle yazılır.',
    ] },
    { h: 'Dört işlem formülleri', p: [
      'z₁ = a + bi ve z₂ = c + di olsun. İşlemler, i harfi sıradan bir değişkenmiş gibi yapılır; tek fark i² görülen yere −1 yazılmasıdır.',
    ], ul: [
      '<strong>Toplama:</strong> z₁ + z₂ = (a + c) + (b + d)i',
      '<strong>Çıkarma:</strong> z₁ − z₂ = (a − c) + (b − d)i',
      '<strong>Çarpma:</strong> z₁ · z₂ = (ac − bd) + (ad + bc)i',
      '<strong>Bölme:</strong> z₁ ÷ z₂ = [(ac + bd) + (bc − ad)i] ÷ (c² + d²)',
    ] },
    { h: 'Çözümlü örnek: (3 + 4i) ile (1 − 2i)', p: [
      '<strong>Çarpma:</strong> (3 + 4i)(1 − 2i) = 3 − 6i + 4i − 8i². i² = −1 olduğundan −8i² = +8 olur ve sonuç <strong>11 − 2i</strong> çıkar. Modülü √(11² + 2²) = √125 = 11,1803\'tür. Bu değer, çarpanların modülleri olan 5 ile 2,2361\'in çarpımına eşittir; çünkü çarpımın modülü modüllerin çarpımıdır.',
      '<strong>Bölme:</strong> Paydayı gerçek yapmak için pay ve payda, paydanın eşleniği olan 1 + 2i ile çarpılır. Pay (3 + 4i)(1 + 2i) = 3 + 6i + 4i + 8i² = −5 + 10i, payda ise 1² + 2² = 5 olur. Sonuç <strong>−1 + 2i</strong> bulunur. Modülü √5 = 2,2361, argümanı ise sayı ikinci bölgede olduğu için 116,5651°\'dir.',
      '<strong>Toplama ve çıkarma:</strong> (3 + 4i) + (1 − 2i) = 4 + 2i ve (3 + 4i) − (1 − 2i) = 2 + 6i. Bu iki işlemde gerçek kısımlar kendi arasında, sanal kısımlar kendi arasında işleme girer.',
    ] },
    { h: 'Modül, argüman ve eşlenik', p: [
      '<strong>Modül</strong>, sayının karmaşık düzlemde başlangıç noktasına olan uzaklığıdır ve |z| = √(a² + b²) ile bulunur. 3 + 4i için modül √(9 + 16) = 5\'tir. <strong>Argüman</strong>, sayıyı başlangıca bağlayan doğrunun pozitif gerçek eksenle yaptığı açıdır. Araç bu açıyı −180° ile 180° arasındaki esas değer olarak verir ve hangi bölgede olduğunu kendisi belirler; yalnızca arctan(b ÷ a) almak ikinci ve üçüncü bölgedeki sayılarda yanlış açı verir.',
      '<strong>Eşlenik</strong>, sanal kısmın işareti değiştirilerek elde edilir: a + bi sayısının eşleniği a − bi\'dir. Bir sayıyı eşleniğiyle çarpmak her zaman gerçek bir sonuç verir: (a + bi)(a − bi) = a² + b². Bölme işleminde paydanın eşleniğiyle genişletme yapılmasının nedeni budur.',
    ] },
    { h: 'Kutupsal gösterim', p: [
      'Modülü r, argümanı θ olan bir karmaşık sayı <strong>z = r · (cos θ + i · sin θ)</strong> biçiminde de yazılabilir. Bu biçim özellikle çarpma, bölme ve kuvvet alma işlemlerini kolaylaştırır: iki sayı çarpılırken modüller çarpılır, argümanlar toplanır; bölünürken modüller bölünür, argümanlar çıkarılır. Bir sayının n. kuvvetinde modülün n. kuvveti alınır ve argüman n ile çarpılır; bu kural De Moivre formülü olarak bilinir.',
      'Örneğin 1 + i sayısının modülü √2 = 1,4142 ve argümanı 45°\'dir. Karesinin modülü 2, argümanı 90° olur; bu da 2i sayısıdır. Aracı kullanarak (1 + i)(1 + i) çarpımını yaptığınızda aynı sonucu görürsünüz.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'i² yerine +1 yazmak: i² = −1 olduğu için çarpmada bd teriminin işareti değişir.',
      'Bölmede yalnızca paydayı eşlenikle çarpıp payı unutmak; pay ve payda aynı sayıyla çarpılmalıdır.',
      'Modülü hesaplarken sanal kısmı i ile birlikte kareye almak: modülde b² kullanılır, (bi)² değil.',
      'Argümanda bölgeyi dikkate almamak: −1 + 2i ile 1 − 2i sayılarında b ÷ a oranı aynıdır, ancak argümanları 180° farklıdır.',
      'Sanal kısmı olmayan sayıda ikinci alanı boş bırakmak; boş alan yerine 0 yazılmalıdır.',
    ] },
    { h: 'i sayısının kuvvetleri ve sınırlar', p: [
      'Sanal birimin kuvvetleri dörtlü bir döngü izler: i¹ = i, i² = −1, i³ = −i, i⁴ = 1 ve sonra tekrar baştan. Herhangi bir kuvveti bulmak için üssün 4\'e bölümünden kalanına bakmak yeterlidir; örneğin i²⁷ için 27\'nin 4\'e bölümünden kalan 3 olduğundan sonuç −i\'dir.',
      'Araç sonuçları dört ondalık basamağa yuvarlar; çok büyük ve çok küçük sayıları birlikte kullandığınızda kayan nokta aritmetiğinden kaynaklanan küçük yuvarlama farkları oluşabilir. Sıfır sayısının argümanı tanımlı olmadığı için bu durumda argüman satırında "tanımsız" yazar.',
    ] },
  ],
  faq: [
    ['Karmaşık sayılar nasıl çarpılır?', 'Parantezler dağılma özelliğiyle açılır ve i² yerine −1 yazılır: (a + bi)(c + di) = (ac − bd) + (ad + bc)i. Örneğin (3 + 4i)(1 − 2i) = 11 − 2i eder.'],
    ['Karmaşık sayılarda bölme nasıl yapılır?', 'Pay ve payda, paydanın eşleniğiyle çarpılır; böylece payda gerçek sayıya dönüşür. (3 + 4i) ÷ (1 − 2i) işleminde pay ve payda 1 + 2i ile çarpılır ve sonuç (−5 + 10i) ÷ 5 = −1 + 2i olur.'],
    ['Karmaşık sayının modülü nasıl bulunur?', 'Gerçek ve sanal kısımların kareleri toplanır ve karekökü alınır: |a + bi| = √(a² + b²). 3 + 4i için modül 5, 1 − 2i için √5, yaklaşık 2,2361\'dir.'],
    ['Argüman nedir, hangi aralıkta verilir?', 'Argüman, karmaşık düzlemde sayıyı başlangıca bağlayan doğrunun pozitif gerçek eksenle yaptığı açıdır. Bu araç esas argümanı −180° ile 180° arasında verir. 0° ile 360° arasında bir değer istiyorsanız negatif sonuca 360 ekleyin.'],
    ['Bir karmaşık sayının eşleniği ne işe yarar?', 'Eşlenik, sanal kısmın işareti değiştirilerek bulunur. Bir sayı ile eşleniğinin çarpımı modülün karesine eşit gerçek bir sayıdır; bu özellik bölmede paydayı gerçek yapmak için kullanılır. Ayrıca gerçek katsayılı denklemlerin karmaşık kökleri eşlenik çiftler hâlinde gelir.'],
    ['Gerçek sayılar karmaşık sayı mıdır?', 'Evet. Sanal kısmı sıfır olan her karmaşık sayı bir gerçek sayıdır; yani gerçek sayılar karmaşık sayıların alt kümesidir. Araçta sanal kısım alanına 0 yazarak gerçek sayılarla da işlem yapabilirsiniz.'],
    ['Sonuç neden bazen yalnızca i ya da gerçek sayı olarak çıkıyor?', 'Sonucun gerçek kısmı sıfırsa yalnızca sanal kısım, sanal kısmı sıfırsa yalnızca gerçek kısım yazılır. Örneğin (1 + i)(1 − i) çarpımının sonucu 2, 1 ÷ i işleminin sonucu ise −i olarak gösterilir.'],
    ['Yazdığım sayılar bir sunucuya gönderiliyor mu?', 'Hayır. İşlemlerin tamamı tarayıcınızda yapılır; girdiğiniz değerler hiçbir yere iletilmez ve kaydedilmez.'],
  ],
  related: ['diskriminant-hesapla', 'vektor-hesapla', 'ters-trigonometri-hesapla', 'karekok-hesapla', 'us-logaritma-hesapla'],
};
