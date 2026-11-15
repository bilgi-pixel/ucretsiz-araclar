export default {
  slug: 'bilesik-kesir-cevir',
  title: 'Bileşik Kesir ve Tam Sayılı Kesir Çevirme',
  h1Tail: 'iki yönlü',
  pageTitle: 'Bileşik Kesri Tam Sayılı Kesre Çevirme (ve Tersi) – Hesaplama',
  description: 'Bileşik kesri tam sayılı kesre, tam sayılı kesri bileşik kesre çevirin. Sonuç sadeleştirilir; ondalık karşılığı ve işlem adımı da gösterilir.',
  card: 'Bileşik kesri tam sayılı kesre ya da tam sayılı kesri bileşik kesre çevirin; sade hâli ve ondalık değeriyle.',
  category: 'matematik',
  keywords: ['bileşik kesir çevirme', 'tam sayılı kesir çevirme', 'bileşik kesri tam sayılı kesre çevirme', 'tam sayılı kesri bileşik kesre çevirme', 'bileşik kesir hesaplama', 'tam sayılı kesir hesaplama'],
  lead: 'Payı paydasından büyük olan <strong>bileşik kesri</strong> tam sayılı kesre, tam sayılı kesri de bileşik kesre çevirin. Araç sonucu sadeleştirir, ondalık karşılığını ve kullandığı işlemi sonuç notunda gösterir.',
  button: 'Çevir',
  inputs: [
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['bilesik', 'Bileşik kesir → Tam sayılı kesir'], ['tam', 'Tam sayılı kesir → Bileşik kesir']], wide: true },
    { id: 'tamKisim', label: 'Tam kısım', type: 'number', placeholder: 'Örn. 2', hint: 'Yalnızca tam sayılı kesirden bileşik kesre çevirirken doldurun.' },
    { id: 'pay', label: 'Pay', type: 'number', placeholder: 'Örn. 7' },
    { id: 'payda', label: 'Payda', type: 'number', placeholder: 'Örn. 2' },
  ],
  compute(v, h) {
    const ebob = (x, y) => { x = Math.abs(x); y = Math.abs(y); while (y) { const t = x % y; x = y; y = t; } return x; };
    const SINIR = 1e12;
    // p/q (q > 0) için sade bileşik ve tam sayılı yazılış
    const yaz = (p, q) => {
      const g = ebob(p, q) || 1;
      p /= g; q /= g;
      const isaret = p < 0 ? '-' : '';
      const m = Math.abs(p);
      const sade = q === 1 ? `${isaret}${m}` : `${isaret}${m}/${q}`;
      let tamli;
      if (q === 1) tamli = `${isaret}${m}`;
      else if (m < q) tamli = `${isaret}${m}/${q} (basit kesir, tam kısmı yok)`;
      else tamli = `${isaret}${Math.floor(m / q)} tam ${m % q}/${q}`;
      return { sade, tamli, deger: p / q };
    };
    if (v.yon === 'tam') {
      const t = h.int(v.tamKisim, 'Tam kısım');
      const pay = h.int(v.pay, 'Pay');
      const payda = h.int(v.payda, 'Payda');
      if (payda === 0) h.err('Payda sıfır olamaz. Sıfırdan büyük bir payda yazın.');
      if (payda < 0 || pay < 0) h.err('Tam sayılı kesirde pay ve payda pozitif yazılır; negatif sayı için eksi işaretini tam kısma koyun.');
      if (Math.abs(t) > SINIR || pay > SINIR || payda > SINIR) h.err('Sayılar en fazla 12 basamaklı olabilir.');
      const yeniPay = Math.abs(t) * payda + pay;
      const isaret = t < 0 ? '-' : '';
      const r = yaz(t < 0 ? -yeniPay : yeniPay, payda);
      return {
        rows: [
          ['Bileşik kesir', `${isaret}${yeniPay}/${payda}`],
          ['Sade bileşik kesir', r.sade],
          ['Tam sayılı kesir (sade)', r.tamli],
          ['Ondalık değer', h.fmt(r.deger, 6)],
        ],
        note: `İşlem: ${Math.abs(t)} × ${payda} + ${pay} = ${yeniPay}; payda aynı kalır.` + (pay >= payda ? ' Girdiğiniz kesir kısmında pay paydadan küçük değil; sonuç yine de doğru hesaplandı.' : ''),
      };
    }
    let pay = h.int(v.pay, 'Pay');
    let payda = h.int(v.payda, 'Payda');
    if (payda === 0) h.err('Payda sıfır olamaz; sıfıra bölme tanımsızdır. Sıfırdan farklı bir payda yazın.');
    if (Math.abs(pay) > SINIR || Math.abs(payda) > SINIR) h.err('Sayılar en fazla 12 basamaklı olabilir.');
    if (payda < 0) { pay = -pay; payda = -payda; }
    const r = yaz(pay, payda);
    const m = Math.abs(pay);
    return {
      rows: [
        ['Tam sayılı kesir', r.tamli],
        ['Sade bileşik kesir', r.sade],
        ['Ondalık değer', h.fmt(r.deger, 6)],
      ],
      note: `İşlem: ${m} ÷ ${payda} = ${Math.floor(m / payda)}, kalan ${m % payda}. Bölüm tam kısım, kalan yeni pay olur.`,
    };
  },
  cases: [
    { in: { yon: 'bilesik', pay: '7', payda: '2' }, out: { 'Tam sayılı kesir': '3 tam 1/2', 'Sade bileşik kesir': '7/2', 'Ondalık değer': '3,5' } },
    { in: { yon: 'tam', tamKisim: '2', pay: '3', payda: '4' }, out: { 'Bileşik kesir': '11/4', 'Sade bileşik kesir': '11/4', 'Tam sayılı kesir (sade)': '2 tam 3/4', 'Ondalık değer': '2,75' } },
    { in: { yon: 'bilesik', pay: '17', payda: '5' }, out: { 'Tam sayılı kesir': '3 tam 2/5', 'Ondalık değer': '3,4' } },
    { in: { yon: 'bilesik', pay: '10', payda: '4' }, out: { 'Tam sayılı kesir': '2 tam 1/2', 'Sade bileşik kesir': '5/2' } },
    { in: { yon: 'tam', tamKisim: '1', pay: '2', payda: '4' }, out: { 'Bileşik kesir': '6/4', 'Sade bileşik kesir': '3/2', 'Tam sayılı kesir (sade)': '1 tam 1/2' } },
    { in: { yon: 'bilesik', pay: '12', payda: '3' }, out: { 'Tam sayılı kesir': '4', 'Sade bileşik kesir': '4' } },
    { in: { yon: 'bilesik', pay: '-7', payda: '2' }, out: { 'Tam sayılı kesir': '-3 tam 1/2', 'Ondalık değer': '-3,5' } },
    { in: { yon: 'tam', tamKisim: '-2', pay: '1', payda: '3' }, out: { 'Bileşik kesir': '-7/3', 'Ondalık değer': '-2,333333' } },
    { in: { yon: 'bilesik', pay: '3', payda: '4' }, out: { 'Tam sayılı kesir': '3/4 (basit kesir, tam kısmı yok)' } },
    { in: { yon: 'tam', tamKisim: '5', pay: '0', payda: '6' }, out: { 'Bileşik kesir': '30/6', 'Sade bileşik kesir': '5' } },
    { in: { yon: 'bilesik', pay: '7', payda: '0' }, error: true },
    { in: { yon: 'tam', tamKisim: '', pay: '3', payda: '4' }, error: true },
    { in: { yon: 'tam', tamKisim: '2', pay: '-3', payda: '4' }, error: true },
  ],
  howto: [
    '"Çeviri yönü" listesinden hangi dönüşümü yapacağınızı seçin: bileşik kesirden tam sayılı kesre ya da tersi.',
    'Bileşik kesri çeviriyorsanız yalnızca pay ve paydayı yazın; "Tam kısım" alanını boş bırakabilirsiniz.',
    'Tam sayılı kesri çeviriyorsanız tam kısmı, payı ve paydayı ayrı ayrı girin. Örneğin 2 tam 3/4 için sırasıyla 2, 3 ve 4 yazılır.',
    '"Çevir" düğmesine basın. İlk satır aradığınız gösterimi verir; alttaki not, çeviride yapılan bölme ya da çarpma işlemini adım olarak yazar.',
  ],
  sections: [
    { h: 'Basit, bileşik ve tam sayılı kesir', p: [
      'Kesirler üç biçimde karşımıza çıkar. Payı paydasından küçük olan kesirlere <strong>basit kesir</strong> denir ve değerleri 0 ile 1 arasındadır: 3/4, 2/7 gibi. Payı paydasına eşit ya da paydasından büyük olanlar <strong>bileşik kesirdir</strong>: 7/2, 9/9, 17/5. Bir tam sayı ile bir basit kesrin yan yana yazılmasıyla oluşan gösterime ise <strong>tam sayılı kesir</strong> denir: 3 tam 1/2 gibi.',
      'Bileşik kesir ve tam sayılı kesir aynı sayının iki farklı yazılışıdır. 7/2 ile 3 tam 1/2 sayı doğrusunda aynı noktadadır. Hangisinin kullanılacağı işe göre değişir: çarpma ve bölme işlemleri bileşik kesirle kolay yapılır, bir büyüklüğü okumak ve tahmin etmek ise tam sayılı kesirle daha rahattır. "Üç buçuk ekmek" demek, "yedi tane yarım ekmek" demekten anlaşılırdır.',
    ] },
    { h: 'Bileşik kesri tam sayılı kesre çevirme', p: [
      'Yöntem tek bir bölme işlemidir. Pay paydaya bölünür; <strong>bölüm tam kısım</strong>, <strong>kalan yeni pay</strong> olur, payda değişmez.',
      'Örnek: 17/5 kesrinde 17 ÷ 5 = 3, kalan 2\'dir. Sonuç 3 tam 2/5 olur. Sağlamasını tersten yapabilirsiniz: 3 × 5 + 2 = 17. Araç aynı girdiler için 3 tam 2/5 ve ondalık olarak 3,4 verir.',
      'Kesir sadeleşebiliyorsa sonucun kesir kısmı da sadeleştirilir. 10/4 kesrinde 10 ÷ 4 = 2, kalan 2 olduğundan ilk bakışta 2 tam 2/4 bulunur; 2/4 kesri 1/2\'ye eşit olduğu için doğru yazılış 2 tam 1/2\'dir. Kalan sıfır çıkarsa kesir kısmı yoktur ve sonuç tam sayıdır: 12/3 = 4.',
    ] },
    { h: 'Tam sayılı kesri bileşik kesre çevirme', p: [
      'Bu yönde kural şöyledir: <strong>yeni pay = tam kısım × payda + pay</strong>, payda aynı kalır. Mantığı basittir: her bir tam, payda kadar parçadan oluşur. 2 tam 3/4 sayısında 2 tam, 8 tane çeyrek eder; üzerine 3 çeyrek daha eklenince 11 çeyrek, yani 11/4 bulunur.',
      'Araç önce bu işlemin ham sonucunu, ardından sadeleşmiş hâlini gösterir. 1 tam 2/4 için ham sonuç 1 × 4 + 2 = 6 olduğundan 6/4, sade hâli 3/2\'dir. Öğretmeniniz adımı görmek istiyorsa ilk satırı, yalnızca son cevabı istiyorsa ikinci satırı kullanın.',
    ] },
    { h: 'Negatif tam sayılı kesirler', p: [
      'Eksi işareti sayının tamamına aittir. -2 tam 1/3 ifadesi -(2 + 1/3) anlamına gelir, -2 + 1/3 anlamına gelmez. Bu yüzden bileşik kesre çevirirken işaret bir kenara ayrılır, 2 × 3 + 1 = 7 bulunur ve sonuç -7/3 yazılır. İşareti hesaba katarak -2 × 3 + 1 = -5 bulmak en sık yapılan hatalardan biridir ve yanlış sonuç verir.',
      'Ters yönde de aynı kural geçerlidir: -7/2 kesrinde işaret ayrılır, 7 ÷ 2 = 3 kalan 1 bulunur ve sonuç -3 tam 1/2 yazılır. Araçta negatif bir tam sayılı kesir girmek için eksi işaretini tam kısma koymanız yeterlidir; pay ve payda pozitif kalır.',
    ] },
    { h: 'Nerelerde kullanılır?', ul: [
      '<strong>Dört işlem:</strong> tam sayılı kesirlerle çarpma ve bölme yapmadan önce sayılar bileşik kesre çevrilir. 2 tam 1/2 × 1 tam 1/3 işlemi 5/2 × 4/3 = 20/6 = 10/3 olarak çözülür ve cevap 3 tam 1/3 diye yazılır.',
      '<strong>Mutfak ölçüleri:</strong> tariflerdeki "1 tam 1/2 su bardağı" gibi miktarları iki ya da üç katına çıkarırken bileşik kesir kullanmak işi kolaylaştırır: 3/2 × 3 = 9/2, yani 4 tam 1/2 bardak.',
      '<strong>Ölçü ve marangozluk:</strong> inç cinsinden verilen ölçüler çoğunlukla 2 tam 3/8 gibi tam sayılı kesirlerdir; toplarken ve bölerken bileşik kesre geçilir.',
      '<strong>Süre hesapları:</strong> 7/4 saat demek 1 tam 3/4 saat, yani 1 saat 45 dakika demektir.',
      '<strong>Sayı doğrusu soruları:</strong> bir bileşik kesrin hangi iki tam sayı arasında olduğu, tam sayılı yazılıştaki tam kısımdan hemen okunur.',
    ] },
    { h: 'Dikkat edilecek noktalar ve sınırlar', p: [
      'Tam sayılı kesirde kesir kısmının basit kesir olması beklenir. 2 tam 5/4 gibi bir yazım kurala uygun değildir, çünkü 5/4 kendi içinde bir tam daha barındırır; doğru yazılışı 3 tam 1/4\'tür. Araç böyle bir girdiyi reddetmez, hesaplar ve düzeltilmiş hâlini "Tam sayılı kesir (sade)" satırında gösterir.',
      'Tam sayılı kesrin yazımında tam kısım ile kesir arasında görünmeyen bir toplama vardır, çarpma yoktur. Cebirdeki 2x yazımıyla karıştırılmamalıdır. Payda hiçbir durumda sıfır olamaz. Araç 12 basamağa kadar olan tam sayılarla çalışır; ondalıklı pay ya da payda kabul etmez.',
    ] },
  ],
  faq: [
    ['Bileşik kesir tam sayılı kesre nasıl çevrilir?', 'Pay paydaya bölünür. Bölüm tam kısım, kalan ise yeni pay olur; payda değişmez. 7/2 için 7 ÷ 2 = 3 kalan 1 olduğundan sonuç 3 tam 1/2\'dir.'],
    ['Tam sayılı kesir bileşik kesre nasıl çevrilir?', 'Tam kısım payda ile çarpılır, sonuca pay eklenir ve aynı paydanın üzerine yazılır. 2 tam 3/4 için 2 × 4 + 3 = 11 bulunur, sonuç 11/4\'tür.'],
    ['Payı paydasına eşit olan kesir bileşik kesir midir?', 'Evet. 5/5 gibi payı paydasına eşit olan kesirler bileşik kesir sayılır ve değerleri 1\'dir. Tam sayılı kesre çevrildiğinde kesir kısmı kalmaz, sonuç doğrudan 1 olur.'],
    ['Her tam sayı bileşik kesir olarak yazılabilir mi?', 'Evet. Bir tam sayının paydası 1 kabul edilir: 4 = 4/1. İstenen paydaya göre genişletilerek 8/2 ya da 12/3 olarak da yazılabilir; bunların hepsi 4\'e eşittir.'],
    ['Basit kesir tam sayılı kesre çevrilir mi?', 'Hayır. Basit kesrin değeri 1\'den küçük olduğu için içinde bir tam yoktur. Araca 3/4 gibi bir basit kesir girerseniz kesrin tam kısmı olmadığını belirten bir sonuç alırsınız.'],
    ['Sonuçtaki kesir kısmı neden girdiğimden farklı paydayla çıktı?', 'Araç sonucu sadeleştirir. 10/4 kesri 2 tam 2/4 yerine 2 tam 1/2 olarak gösterilir, çünkü 2/4 ile 1/2 aynı değerdedir ve cevaplar en sade hâliyle yazılır.'],
    ['Tam sayılı kesirlerle toplama yaparken çevirmek şart mı?', 'Şart değildir. Toplama ve çıkarmada tam kısımlar ve kesir kısımları ayrı ayrı işlenebilir. Çarpma ve bölmede ise bileşik kesre çevirmek gerekir; aksi hâlde sonuç yanlış çıkar.'],
    ['Girdiğim kesirler bir yere gönderiliyor mu?', 'Hayır. Çeviri tarayıcınızda yapılır, yazdığınız sayılar sunucuya iletilmez ve kaydedilmez. Sayfa yüklendikten sonra internet bağlantısı olmadan da kullanabilirsiniz.'],
  ],
  related: ['kesir-hesapla', 'kesir-sadelestir', 'kesir-karsilastir', 'ondalik-kesir-cevir', 'ebob-ekok'],
};
