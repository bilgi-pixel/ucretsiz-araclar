export default {
  slug: 'yuzde-kesir-cevir',
  title: 'Yüzdeyi Kesre ve Ondalığa Çevirme',
  h1Tail: '% → kesir, ondalık, binde',
  pageTitle: 'Yüzdeyi Kesre ve Ondalık Sayıya Çevirme – Yüzde Kesir Hesaplama',
  description: 'Yüzde değerini yazın; en sade kesir, ondalık sayı ve binde karşılığını anında görün. Ondalıklı yüzdeler de tam doğrulukla kesre çevrilir.',
  card: 'Yüzdeyi en sade kesre ve ondalık sayıya çevirin; sadeleşmemiş hâli ve binde karşılığı da gösterilir.',
  category: 'matematik',
  keywords: ['yüzdeyi kesre çevirme', 'yüzde kesir çevirme', 'yüzdeyi ondalığa çevirme', 'yüzde kaç kesir', 'yüzde ondalık sayı', 'yüzde 25 kesir olarak', 'yüzde kesir hesaplama'],
  lead: 'Bir yüzde değerini <strong>en sade kesre</strong> ve <strong>ondalık sayıya</strong> çevirin. 37,5 gibi ondalıklı yüzdeler de desteklenir; araç sadeleşmemiş kesri, tam sayılı yazılışı ve binde karşılığını birlikte gösterir.',
  button: 'Çevir',
  inputs: [
    { id: 'yuzde', label: 'Yüzde değeri (%)', type: 'text', placeholder: 'Örn. 37,5', hint: 'Yüzde işaretini yazmanız gerekmez; en fazla altı ondalık basamak dikkate alınır.' },
  ],
  compute(v, h) {
    const ham = String(v.yuzde ?? '').replace(/%/g, '').trim();
    const n = h.num(ham, 'Yüzde değeri');
    if (Math.abs(n) > 1e6) h.err('Yüzde değeri en fazla 1.000.000 olabilir; daha küçük bir değer yazın.');
    // Altı ondalığa sabitle, sondaki sıfırları at: tam pay/payda elde etmek için
    let s = Math.abs(n).toFixed(6);
    s = s.replace(/0+$/, '').replace(/\.$/, '');
    const nokta = s.indexOf('.');
    const k = nokta < 0 ? 0 : s.length - nokta - 1;
    const hamPay = BigInt(s.replace('.', ''));
    const hamPayda = 100n * 10n ** BigInt(k);
    let x = hamPay, y = hamPayda;
    while (y) { const t = x % y; x = y; y = t; }
    const g = x === 0n ? 1n : x;
    const p = hamPay / g, q = hamPay === 0n ? 1n : hamPayda / g;
    const isaret = n < 0 && hamPay !== 0n ? '-' : '';
    const rows = [
      ['Kesir (sade)', q === 1n ? `${isaret}${p}` : `${isaret}${p}/${q}`],
      ['Ondalık sayı', h.fmt(n / 100, 8)],
      ['Sadeleşmemiş kesir', `${isaret}${hamPay}/${hamPayda}`],
    ];
    if (q !== 1n && p > q) rows.push(['Tam sayılı kesir', `${isaret}${p / q} tam ${p % q}/${q}`]);
    rows.push(['Binde karşılığı', '‰' + h.fmt(n * 10, 5)]);
    return {
      rows,
      note: `%${h.fmt(n, 6)}, 100 parçanın ${h.fmt(n, 6)} tanesi demektir. Kesir, pay ve payda ${g} sayısına bölünerek sadeleştirildi.`,
    };
  },
  cases: [
    { in: { yuzde: '25' }, out: { 'Kesir (sade)': '1/4', 'Ondalık sayı': '0,25', 'Sadeleşmemiş kesir': '25/100', 'Binde karşılığı': '‰250' } },
    { in: { yuzde: '37,5' }, out: { 'Kesir (sade)': '3/8', 'Ondalık sayı': '0,375', 'Sadeleşmemiş kesir': '375/1000' } },
    { in: { yuzde: '150' }, out: { 'Kesir (sade)': '3/2', 'Ondalık sayı': '1,5', 'Tam sayılı kesir': '1 tam 1/2' } },
    { in: { yuzde: '12,5' }, out: { 'Kesir (sade)': '1/8', 'Ondalık sayı': '0,125' } },
    { in: { yuzde: '%20' }, out: { 'Kesir (sade)': '1/5', 'Ondalık sayı': '0,2' } },
    { in: { yuzde: '100' }, out: { 'Kesir (sade)': '1', 'Ondalık sayı': '1', 'Sadeleşmemiş kesir': '100/100' } },
    { in: { yuzde: '0,5' }, out: { 'Kesir (sade)': '1/200', 'Ondalık sayı': '0,005', 'Binde karşılığı': '‰5' } },
    { in: { yuzde: '33,33' }, out: { 'Kesir (sade)': '3333/10000', 'Ondalık sayı': '0,3333' } },
    { in: { yuzde: '2.5' }, out: { 'Kesir (sade)': '1/40', 'Ondalık sayı': '0,025' } },
    { in: { yuzde: '0' }, out: { 'Kesir (sade)': '0', 'Ondalık sayı': '0' } },
    { in: { yuzde: '-25' }, out: { 'Kesir (sade)': '-1/4', 'Ondalık sayı': '-0,25' } },
    { in: { yuzde: 'yirmi' }, error: true },
    { in: { yuzde: '' }, error: true },
  ],
  howto: [
    '"Yüzde değeri" alanına çevirmek istediğiniz yüzdeyi yazın. Yüzde işareti koymanız gerekmez; 37,5 ya da 37.5 biçiminde ondalıklı değer girebilirsiniz.',
    '"Çevir" düğmesine basın. İlk satır en sade kesri, ikinci satır ondalık sayıyı verir.',
    'İşlem adımını görmek için "Sadeleşmemiş kesir" satırına bakın; bu, yüzdenin 100 paydasıyla yazılmış ham hâlidir.',
    'Yüzde 100\'den büyükse sonuç bileşik kesirdir; bu durumda tam sayılı yazılış ayrı bir satırda gösterilir.',
  ],
  sections: [
    { h: 'Yüzde aslında bir kesirdir', p: [
      'Yüzde, "yüzde kaç" yani "100 parçadan kaç parça" sorusunun cevabıdır. Yüzde işareti paydası 100 olan bir kesrin kısa yazımından başka bir şey değildir: %25 demek 25/100 demektir. Bu yüzden yüzdeyi kesre çevirmek yeni bir hesap değil, aynı sayıyı başka bir biçimde yazmaktır.',
      'Üç gösterim birbirinin yerine kullanılabilir: yüzde (%25), kesir (1/4) ve ondalık sayı (0,25). Hangisinin seçileceği duruma bağlıdır. İndirim etiketlerinde ve anket sonuçlarında yüzde kullanılır; tariflerde ve paylaşım problemlerinde kesir daha anlaşılırdır; hesap makinesinde ve tablo programlarında çarpan olarak ondalık sayı gerekir.',
    ] },
    { h: 'Yüzdeyi kesre çevirme adımları', ol: [
      'Yüzde değerini paya, 100\'ü paydaya yazın: %45 = 45/100.',
      'Yüzde ondalıklıysa virgülden kurtulmak için pay ve paydayı 10, 100 ya da 1000 ile çarpın: %37,5 = 37,5/100 = 375/1000.',
      'Pay ve paydanın en büyük ortak bölenini bulun ve ikisini de bu sayıya bölün: 375 ile 1000\'in ortak böleni 125\'tir, sonuç 3/8 olur.',
      'Pay paydadan büyük çıktıysa dilerseniz tam sayılı kesir olarak yazın: %150 = 150/100 = 3/2 = 1 tam 1/2.',
    ] },
    { h: 'Yüzdeyi ondalık sayıya çevirme', p: [
      'Ondalığa çevirmek için yüzde değeri 100\'e bölünür. 100\'e bölmek virgülü iki basamak sola kaydırmak demektir: %25 = 0,25; %7 = 0,07; %150 = 1,5; %0,5 = 0,005. Tek basamaklı yüzdelerde araya sıfır koymayı unutmak sık yapılan bir hatadır; %7 ondalık olarak 0,7 değil 0,07\'dir.',
      'Ondalık karşılık, bir sayının yüzdesini bulmanın en hızlı yoludur. 800 liranın %25\'i için 800 × 0,25 = 200 lira hesaplanır. Aynı sonuca kesirle de varılır: 800\'ün 1/4\'ü, yani 800 ÷ 4 = 200. Paydası küçük olan kesirlerde zihinden hesap için kesir yolu genellikle daha kısadır.',
    ] },
    { h: 'Sık kullanılan yüzdelerin kesir karşılıkları', ul: [
      '<strong>%1</strong> = 1/100 = 0,01',
      '<strong>%5</strong> = 1/20 = 0,05',
      '<strong>%10</strong> = 1/10 = 0,1',
      '<strong>%12,5</strong> = 1/8 = 0,125',
      '<strong>%20</strong> = 1/5 = 0,2',
      '<strong>%25</strong> = 1/4 = 0,25',
      '<strong>%40</strong> = 2/5 = 0,4',
      '<strong>%50</strong> = 1/2 = 0,5',
      '<strong>%60</strong> = 3/5 = 0,6',
      '<strong>%75</strong> = 3/4 = 0,75',
      '<strong>%80</strong> = 4/5 = 0,8',
      '<strong>%100</strong> = 1 (bütünün tamamı)',
      '<strong>%125</strong> = 5/4 = 1,25',
      '<strong>%200</strong> = 2 (iki katı)',
    ] },
    { h: 'Yuvarlanmış yüzdelere dikkat', p: [
      'Bazı kesirlerin yüzde karşılığı sonsuza kadar devam eder. 1/3 kesri yüzde olarak 33,333… biçimindedir ve hiçbir basamakta bitmez. Bu yüzden %33,33 yazdığınızda araç 1/3 değil, <strong>3333/10000</strong> sonucunu verir; çünkü girdiğiniz sayı tam olarak budur. Aradaki fark küçüktür ama sıfır değildir.',
      'Benzer biçimde %66,67 değeri 2/3 değil 6667/10000\'dir; %16,67 de 1/6 değildir. Bir yüzdenin 1/3, 2/3 ya da 1/6 gibi bir kesirden yuvarlandığını biliyorsanız asıl kesri kullanmak daha doğrudur. Araç tahmin yürütmez, yazdığınız değeri olduğu gibi çevirir.',
    ] },
    { h: 'Günlük hayattan örnekler', p: [
      'Bir mağazadaki %25 indirim, fiyatın dörtte birinin düşülmesi demektir; 600 liralık ürün 150 lira ucuzlar. Bir sınavda soruların %80\'ini doğru yapmak, her 5 sorudan 4\'ünü bilmek anlamına gelir. Bir tarifte malzemenin %50 artırılması, miktarın 3/2 ile çarpılmasıdır; 2 su bardağı un 3 su bardağına çıkar.',
      'Yüzde 100\'ü aşan değerler de anlamlıdır. Bir üretimin geçen yılın %150\'sine ulaşması, geçen yılki miktarın bir buçuk katı üretildiğini gösterir. %200 iki kat, %300 üç kat demektir. Binde karşılığı ise oranların küçük olduğu yerlerde, örneğin bazı vergi ve harç oranlarında ya da nüfus istatistiklerinde kullanılır; yüzde değerinin 10 ile çarpılmasıyla bulunur.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç yüzde değerinin en fazla altı ondalık basamağını dikkate alır; daha uzun girdiler altıncı basamağa yuvarlanır. Negatif yüzdeler kabul edilir ve sonuç negatif kesir olarak gösterilir. Yüzde puan ile yüzde değişimi farklı kavramlardır; bu araç yalnızca bir yüzde değerinin kesir ve ondalık yazılışını verir, iki değer arasındaki değişimi hesaplamaz.',
    ] },
  ],
  faq: [
    ['Yüzde kesre nasıl çevrilir?', 'Yüzde değeri paya, 100 paydaya yazılır ve kesir sadeleştirilir. %40 için 40/100 yazılır; pay ve payda 20\'ye bölününce 2/5 elde edilir.'],
    ['Yüzde 25 kesir olarak kaçtır?', '%25, 25/100 kesrine eşittir ve sadeleştirildiğinde 1/4 olur. Ondalık karşılığı 0,25\'tir; yani bir bütünün dörtte biri, bir çeyreğidir.'],
    ['Ondalıklı yüzde kesre nasıl çevrilir?', 'Önce 100 paydasıyla yazılır, sonra virgülden kurtulmak için pay ve payda 10\'un kuvvetiyle çarpılır. %12,5 = 12,5/100 = 125/1000 olur; 125\'e bölerek sadeleştirince 1/8 bulunur.'],
    ['Yüzde 33,33 neden 1/3 çıkmıyor?', 'Çünkü 1/3 kesrinin yüzde karşılığı 33,333… biçiminde sonsuza kadar sürer. %33,33 bunun yuvarlanmış hâlidir ve tam karşılığı 3333/10000 kesridir. Araç yazdığınız değeri değiştirmeden çevirir.'],
    ['Yüzde 100\'den büyük değerler kesre çevrilir mi?', 'Evet. Sonuç payı paydasından büyük bir bileşik kesir olur. %150 = 3/2, yani 1 tam 1/2; %250 = 5/2, yani 2 tam 1/2\'dir.'],
    ['Yüzdeyi ondalığa çevirirken virgül kaç basamak kayar?', 'İki basamak sola kayar, çünkü 100\'e bölünür. %8 için 0,08; %45 için 0,45; %120 için 1,2 elde edilir.'],
    ['Kesri yüzdeye çevirmek için ne yapmalıyım?', 'Pay paydaya bölünür ve sonuç 100 ile çarpılır. 3/8 için 3 ÷ 8 = 0,375 ve 0,375 × 100 = 37,5 olduğundan sonuç %37,5\'tir. Bu işlem, bu sayfadaki çevirinin tersidir.'],
    ['Girdiğim değer saklanıyor mu?', 'Hayır. Çeviri yalnızca tarayıcınızda yapılır; yazdığınız yüzde değeri sunucuya gönderilmez ve kayıt altına alınmaz.'],
  ],
  related: ['yuzde-hesapla', 'kesir-sadelestir', 'ondalik-kesir-cevir', 'binde-hesapla', 'kesir-hesapla', 'yuzde-degisim-hesapla'],
};
