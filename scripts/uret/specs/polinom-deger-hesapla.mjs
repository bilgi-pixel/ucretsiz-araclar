export default {
  slug: 'polinom-deger-hesapla',
  title: 'Polinom Değeri Hesaplama',
  h1Tail: 'P(x) ve Horner yöntemi',
  pageTitle: 'Polinom Değeri Hesaplama – P(x) Değeri, Türev ve Horner Yöntemi',
  description: 'Katsayılarını yazdığınız polinomun verilen x için değerini Horner yöntemiyle hesaplayın. P(x), türev değeri, derece ve adım adım çözüm birlikte gösterilir.',
  card: 'Katsayıları girilen polinomun P(x) değerini Horner yöntemiyle adım adım hesaplayın; türev değerini de görün.',
  category: 'matematik',
  keywords: ['polinom değeri hesaplama', 'P(x) hesaplama', 'Horner yöntemi', 'polinomda değer bulma', 'polinom türev değeri', 'kalan teoremi', 'polinom katsayılar toplamı', 'polinom hesaplama'],
  lead: 'Polinomun katsayılarını en yüksek dereceli terimden sabit terime doğru yazın ve bir x değeri verin. Araç <strong>P(x)</strong> değerini Horner yöntemiyle hesaplar, işlem adımlarını gösterir ve aynı noktadaki türev değerini de bulur.',
  button: 'Hesapla',
  inputs: [
    { id: 'katsayilar', label: 'Katsayılar (büyük dereceden küçüğe)', type: 'text', placeholder: 'Örn. 2 -3 0 5', hint: 'Boşlukla ayırın. Eksik dereceli terimler için 0 yazın: 2x³ − 3x² + 5 → 2 -3 0 5', wide: true },
    { id: 'x', label: 'x değeri', type: 'number', placeholder: 'Örn. 2' },
  ],
  compute(v, h) {
    let k = h.nums(v.katsayilar, 'Katsayılar');
    if (k.length > 31) h.err('En fazla 30. dereceden polinom girebilirsiniz (31 katsayı).');
    const x = h.num(v.x, 'x değeri');
    while (k.length > 1 && k[0] === 0) k = k.slice(1);
    const n = k.length - 1;
    const sifirPol = n === 0 && k[0] === 0;
    const us = (d) => String(d).split('').map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+c]).join('');
    let pol = '';
    k.forEach((c, i) => {
      if (c === 0) return;
      const d = n - i, m = Math.abs(c);
      const govde = (d === 0 || m !== 1 ? h.fmt(m, 6) : '') + (d === 0 ? '' : d === 1 ? 'x' : 'x' + us(d));
      pol += pol === '' ? (c < 0 ? '-' : '') + govde : (c < 0 ? ' - ' : ' + ') + govde;
    });
    if (pol === '') pol = '0';
    const par = (s) => (s < 0 ? '(' + h.fmt(s, 6) + ')' : h.fmt(s, 6));
    let p = k[0], t = 0;
    const adimlar = [`Başlangıç: ${h.fmt(k[0], 6)}`];
    for (let i = 1; i <= n; i++) {
      t = t * x + p;
      const yeni = p * x + k[i];
      adimlar.push(`${par(p)} × ${par(x)} + ${par(k[i])} = ${h.fmt(yeni, 6)}`);
      p = yeni;
    }
    if (!Number.isFinite(p) || !Number.isFinite(t)) h.err('Sonuç gösterilemeyecek kadar büyük; daha küçük bir x değeri ya da daha düşük dereceli bir polinom deneyin.');
    return {
      rows: [
        ['P(x)', h.fmt(p, 6)],
        ['Polinom', 'P(x) = ' + pol],
        ['Derece', sifirPol ? 'tanımsız (sıfır polinomu)' : String(n)],
        ['Türev değeri P′(x)', h.fmt(t, 6)],
        ['Sabit terim P(0)', h.fmt(k[n], 6)],
        ['Katsayılar toplamı P(1)', h.fmt(k.reduce((a, c) => a + c, 0), 6)],
      ],
      text: `x = ${h.fmt(x, 6)} için Horner adımları\n` + adimlar.join('\n') + `\nP(${h.fmt(x, 6)}) = ${h.fmt(p, 6)}`,
      note: p === 0 ? 'P(x) = 0 çıktı: bu x değeri polinomun bir köküdür.' : 'Sonuçlar en fazla altı ondalık basamakla gösterilir.',
    };
  },
  cases: [
    { in: { katsayilar: '2 -3 0 5', x: '2' }, out: { 'P(x)': '9', 'Polinom': 'P(x) = 2x³ - 3x² + 5', 'Derece': '3', 'Türev değeri P′(x)': '12', 'Sabit terim P(0)': '5', 'Katsayılar toplamı P(1)': '4' }, text: 'x = 2 için Horner adımları\nBaşlangıç: 2\n2 × 2 + (-3) = 1\n1 × 2 + 0 = 2\n2 × 2 + 5 = 9\nP(2) = 9' },
    { in: { katsayilar: '1 -3 2', x: '3' }, out: { 'P(x)': '2', 'Polinom': 'P(x) = x² - 3x + 2', 'Derece': '2', 'Türev değeri P′(x)': '3' } },
    { in: { katsayilar: '1 0 -1', x: '1' }, out: { 'P(x)': '0', 'Türev değeri P′(x)': '2' } },
    { in: { katsayilar: '1 2 3 4 5', x: '-1' }, out: { 'P(x)': '3', 'Derece': '4', 'Türev değeri P′(x)': '0', 'Katsayılar toplamı P(1)': '15' } },
    { in: { katsayilar: '4 0 1', x: '0,5' }, out: { 'P(x)': '2', 'Türev değeri P′(x)': '4' } },
    { in: { katsayilar: '5', x: '10' }, out: { 'P(x)': '5', 'Polinom': 'P(x) = 5', 'Derece': '0', 'Türev değeri P′(x)': '0' } },
    { in: { katsayilar: '0 0 3 1', x: '2' }, out: { 'P(x)': '7', 'Polinom': 'P(x) = 3x + 1', 'Derece': '1' } },
    { in: { katsayilar: '-1 0 0 0', x: '2' }, out: { 'P(x)': '-8', 'Polinom': 'P(x) = -x³', 'Türev değeri P′(x)': '-12' } },
    { in: { katsayilar: '1,5; -2', x: '4' }, out: { 'P(x)': '4', 'Polinom': 'P(x) = 1,5x - 2' } },
    { in: { katsayilar: '', x: '2' }, error: true },
    { in: { katsayilar: '1 2 3', x: '' }, error: true },
    { in: { katsayilar: '2x^2+1', x: '1' }, error: true },
  ],
  howto: [
    'Polinomu azalan kuvvetlere göre sıralayın ve yalnızca katsayıları "Katsayılar" alanına boşlukla ayırarak yazın. Örneğin 2x³ − 3x² + 5 için <code>2 -3 0 5</code> girin.',
    'Polinomda bulunmayan dereceler için mutlaka 0 yazın; yukarıdaki örnekte x\'li terim olmadığı için üçüncü sıraya 0 konmuştur.',
    '"x değeri" alanına polinomun değerini bulmak istediğiniz sayıyı yazın. Negatif ve ondalıklı değerler kullanılabilir.',
    '"Hesapla" düğmesine basın. P(x) değeri, polinomun açık yazımı, derecesi ve türev değeri listelenir; alttaki kutuda Horner adımları yer alır.',
  ],
  sections: [
    { h: 'Polinom ve polinomun değeri', p: [
      'Bir değişkenin negatif olmayan tam sayı kuvvetlerinin sabit katsayılarla çarpılıp toplanmasıyla oluşan ifadelere <strong>polinom</strong> denir. Genel biçimi P(x) = aₙxⁿ + … + a₂x² + a₁x + a₀ şeklindedir. Burada aₙ baş katsayı, a₀ sabit terim, n ise polinomun derecesidir. x yerine belirli bir sayı yazıp işlemleri yapmaya polinomun o noktadaki değerini bulmak denir ve P(2), P(−1) gibi gösterilir.',
      'Değer bulma işlemi basit görünse de derece büyüdükçe kuvvet alma ve işaret hataları artar. Bu araç hesabı Horner yöntemiyle yapar; böylece hem sonuç doğru çıkar hem de aynı adımları kâğıt üzerinde tekrar ederek kendi çözümünüzü denetleyebilirsiniz.',
    ] },
    { h: 'Horner yöntemi nasıl çalışır?', p: [
      'Horner yöntemi, polinomu iç içe parantezlere alarak kuvvet hesaplama ihtiyacını ortadan kaldırır. Örneğin 2x³ − 3x² + 0x + 5 ifadesi ((2x − 3)x + 0)x + 5 biçiminde yazılabilir. Hesap en içteki parantezden başlar: baş katsayı alınır, x ile çarpılır, sıradaki katsayı eklenir; bu işlem sabit terime kadar tekrarlanır.',
      'n. dereceden bir polinom için yalnızca n çarpma ve n toplama yapılır. Terimleri tek tek hesaplayıp toplamaya göre hem daha az işlem gerektirir hem de yuvarlama hatalarını azaltır. Ortaokul ve lisede öğretilen "sentetik bölme" tablosu da aslında aynı işlemdir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'P(x) = 2x³ − 3x² + 5 polinomunun x = 2 için değerini bulalım. Katsayılar sırasıyla 2, −3, 0 ve 5\'tir.',
    ], ol: [
      'Baş katsayı ile başlanır: 2.',
      '2 · 2 + (−3) = 1.',
      '1 · 2 + 0 = 2.',
      '2 · 2 + 5 = 9. Son bulunan sayı polinomun değeridir: <strong>P(2) = 9</strong>.',
    ] },
    { h: 'Sonucun sağlaması ve türev değeri', p: [
      'Aynı sonuca doğrudan yerine koyarak da ulaşılır: 2 · 8 − 3 · 4 + 5 = 16 − 12 + 5 = 9. Araç bu polinom için türev değerini de verir. Türev P′(x) = 6x² − 6x olduğundan P′(2) = 24 − 12 = 12\'dir; bu sayı, polinomun grafiğine x = 2 noktasında çizilen teğetin eğimidir.',
      'Türev değeri pozitifse polinom o noktada artmakta, negatifse azalmaktadır. Sıfır çıkması ise o noktanın bir yerel en büyük, yerel en küçük ya da yatay teğetli bir büküm noktası adayı olduğunu gösterir.',
    ] },
    { h: 'Kalan teoremi ve kök kontrolü', p: [
      'Bir P(x) polinomunun (x − a) ile bölümünden kalan, P(a) değerine eşittir. Buna <strong>kalan teoremi</strong> denir. Dolayısıyla uzun bölme yapmadan yalnızca değer hesaplayarak kalanı bulabilirsiniz: yukarıdaki polinomun (x − 2) ile bölümünden kalan 9\'dur. (x + 1) ile bölümünden kalanı bulmak için x = −1 yazmanız gerekir; işarete dikkat edin.',
      'P(a) = 0 çıkarsa a sayısı polinomun bir köküdür ve (x − a) polinomun bir çarpanıdır; bu sonuç çarpan teoremi olarak bilinir. Örneğin x² − 1 polinomu için x = 1 değeri 0 verir, yani 1 bir köktür. Araç böyle bir durumda sonuç altındaki notta kök bulunduğunu belirtir. Tam sayı katsayılı polinomlarda olası rasyonel kökleri, sabit terimin bölenlerini baş katsayının bölenlerine oranlayıp tek tek deneyerek bulabilirsiniz.',
    ] },
    { h: 'Pratik kısa yollar', ul: [
      '<strong>P(0)</strong> her zaman sabit terime eşittir; grafiğin y eksenini kestiği noktadır.',
      '<strong>P(1)</strong> katsayıların toplamına eşittir. Sınav sorularında "katsayılar toplamı" istendiğinde x yerine 1 yazılır.',
      '<strong>P(−1)</strong>, çift dereceli terimlerin katsayıları toplamından tek dereceli terimlerin katsayıları toplamının çıkarılmasıyla bulunur.',
      'Çift dereceli terimlerin katsayıları toplamı [P(1) + P(−1)] ÷ 2, tek dereceli terimlerinki [P(1) − P(−1)] ÷ 2\'dir.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En yaygın hata, polinomda bulunmayan terimler için sıfır yazmayı unutmaktır. x³ + 1 polinomu <code>1 1</code> olarak değil <code>1 0 0 1</code> olarak girilmelidir; aksi hâlde araç bunu x + 1 olarak yorumlar. Sonuç kutusundaki "Polinom" satırı, girdiğiniz katsayıların hangi polinoma karşılık geldiğini gösterir; hesaba güvenmeden önce bu satırı kontrol edin. İkinci hata, katsayıları artan kuvvet sırasıyla yazmaktır; sıra her zaman en yüksek dereceden sabit terime doğrudur.',
      'Araç en fazla 30. dereceden polinomları kabul eder ve sonuçları altı ondalık basamağa yuvarlar. Çok büyük x değerlerinde ve yüksek derecelerde sonuç on beş-on altı anlamlı basamağı aşabilir; bu durumda son basamaklar kayan nokta aritmetiği nedeniyle yaklaşık olur. Alana x içeren ifade (2x^2+1 gibi) değil, yalnızca katsayılar yazılmalıdır.',
    ] },
  ],
  faq: [
    ['Polinomun değeri nasıl bulunur?', 'x yerine verilen sayı yazılır ve işlemler yapılır. P(x) = 2x³ − 3x² + 5 için P(2) = 2 · 8 − 3 · 4 + 5 = 9 eder. Horner yöntemi aynı sonucu daha az işlemle verir.'],
    ['Katsayıları hangi sırayla yazmalıyım?', 'En yüksek dereceli terimin katsayısından başlayıp sabit terime doğru yazın. Eksik dereceler için 0 koyun. Örneğin x⁴ − 2x + 7 polinomu 1 0 0 -2 7 olarak girilir.'],
    ['Horner yöntemi neden tercih edilir?', 'Kuvvet almaya gerek bırakmaz; n. dereceden polinom için yalnızca n çarpma ve n toplama yeterlidir. Elle hesapta hata olasılığını azaltır, bilgisayarda ise hem daha hızlı hem daha kararlıdır.'],
    ['P(x) değerinin sıfır çıkması ne demektir?', 'Yazdığınız x değeri polinomun köküdür; yani grafiği o noktada x eksenini keser ya da eksene teğettir. Aynı zamanda (x − a) ifadesi polinomun bir çarpanıdır.'],
    ['Polinomun (x − a) ile bölümünden kalan nasıl bulunur?', 'Kalan teoremine göre kalan P(a) değerine eşittir. Araca x olarak a sayısını yazmanız yeterlidir. (x + 3) ile bölümden kalan için x = −3 girilir.'],
    ['Türev değeri ne işe yarar?', 'Polinomun o noktadaki anlık değişim hızını, yani grafiğe çizilen teğetin eğimini verir. Artan-azalan aralıkları belirlemede, en büyük ve en küçük değer problemlerinde ve Newton yöntemiyle kök aramada kullanılır.'],
    ['Ondalıklı ya da negatif katsayı girebilir miyim?', 'Evet. Ondalık için virgül ya da nokta kullanabilir, negatif katsayıların başına eksi işareti koyabilirsiniz. Örneğin 0,5x² − 1,25x + 3 için 0,5 -1,25 3 yazılır. Katsayıları ayırmak için virgül kullanmayın.'],
    ['Girdiğim polinom kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızın içinde yapılır; katsayılar ve x değeri sunucuya gönderilmez, saklanmaz.'],
  ],
  related: ['diskriminant-hesapla', 'dogrusal-interpolasyon-hesapla', 'us-logaritma-hesapla', 'n-dereceden-kok-hesapla', 'dogru-denklemi-bul'],
};
