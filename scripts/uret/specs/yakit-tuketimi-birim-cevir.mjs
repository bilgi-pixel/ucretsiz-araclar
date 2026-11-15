export default {
  slug: 'yakit-tuketimi-birim-cevir',
  title: 'Yakıt Tüketimi Çevirici (L/100 km – MPG)',
  h1Tail: 'L/100 km ↔ MPG ↔ km/L',
  pageTitle: "Yakıt Tüketimi Çevirici – L/100 km, MPG ve km/L Dönüştürme",
  description: "Yakıt tüketimini L/100 km, km/L, ABD MPG ve İngiliz MPG birimleri arasında çevirin. Yurt dışı araç ilanlarındaki MPG değerinin yüz kilometrede kaç litre ettiğini görün.",
  card: "L/100 km, km/L, ABD ve İngiliz MPG arasında yakıt tüketimi çevirin; yabancı ilan ve testleri karşılaştırın.",
  category: 'birim',
  keywords: ['mpg l/100 km çevirme', 'yakıt tüketimi çevirme', 'mpg kaç litre', 'km/l l/100 km çevirme', '30 mpg kaç litre yakar', 'mpg hesaplama', 'yüz kilometrede kaç litre'],
  lead: "Bir aracın yakıt tüketimini <strong>L/100 km</strong>, <strong>km/L</strong>, ABD galonuyla <strong>MPG</strong> ve İngiliz galonuyla MPG birimleri arasında çevirin. Yurt dışı kaynaklı ilan, katalog ve test sonuçlarını Türkiye'de alışık olduğumuz 'yüzde kaç litre yakıyor' ölçüsüyle karşılaştırmanın en kısa yoludur.",
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Tüketim değeri', type: 'number', placeholder: 'Örn. 6,5' },
    { id: 'birim', label: 'Girilen değerin birimi', type: 'select', options: [['l100', 'L/100 km (100 kilometrede litre)'], ['kml', 'km/L (litre başına kilometre)'], ['mpgus', 'MPG – ABD galonu'], ['mpguk', 'MPG – İngiliz (imperial) galonu']] },
  ],
  compute(v, h) {
    const x = h.pos(v.deger, 'Tüketim değeri');
    const MIL = 1.609344, GAL_ABD = 3.785411784, GAL_ING = 4.54609;
    const kAbd = 100 * GAL_ABD / MIL;
    const kIng = 100 * GAL_ING / MIL;
    let l100;
    if (v.birim === 'kml') l100 = 100 / x;
    else if (v.birim === 'mpgus') l100 = kAbd / x;
    else if (v.birim === 'mpguk') l100 = kIng / x;
    else l100 = x;
    const satirlar = {
      l100: ['L/100 km', h.fmt(l100, 2) + ' L/100 km'],
      mpgus: ['MPG (ABD galonu)', h.fmt(kAbd / l100, 2) + ' mpg'],
      mpguk: ['MPG (İngiliz galonu)', h.fmt(kIng / l100, 2) + ' mpg'],
      kml: ['km/L', h.fmt(100 / l100, 2) + ' km/L'],
    };
    const sira = v.birim === 'l100' || !satirlar[v.birim] ? ['mpgus', 'mpguk', 'kml', 'l100'] : ['l100', 'kml', 'mpgus', 'mpguk'];
    const rows = sira.map((k) => satirlar[k]);
    rows.push(['1 litreyle gidilen yol', h.fmt(100 / l100, 2) + ' km']);
    return { rows, note: '1 mil = 1,609344 km, 1 ABD galonu = 3,785411784 L, 1 İngiliz galonu = 4,54609 L alınır. L/100 km küçüldükçe, MPG ve km/L büyüdükçe araç daha tasarrufludur.' };
  },
  cases: [
    { in: { deger: '8', birim: 'l100' }, out: { 'MPG (ABD galonu)': '29,4 mpg', 'MPG (İngiliz galonu)': '35,31 mpg', 'km/L': '12,5 km/L' } },
    { in: { deger: '30', birim: 'mpgus' }, out: { 'L/100 km': '7,84 L/100 km', 'km/L': '12,75 km/L' } },
    { in: { deger: '50', birim: 'mpguk' }, out: { 'L/100 km': '5,65 L/100 km' } },
    { in: { deger: '20', birim: 'kml' }, out: { 'L/100 km': '5 L/100 km', 'MPG (ABD galonu)': '47,04 mpg' } },
    { in: { deger: '5', birim: 'l100' }, out: { 'MPG (ABD galonu)': '47,04 mpg', 'MPG (İngiliz galonu)': '56,5 mpg', 'km/L': '20 km/L' } },
    { in: { deger: '10', birim: 'l100' }, out: { 'MPG (ABD galonu)': '23,52 mpg', 'MPG (İngiliz galonu)': '28,25 mpg', '1 litreyle gidilen yol': '10 km' } },
    { in: { deger: '0', birim: 'l100' }, error: true },
    { in: { deger: 'abc', birim: 'mpgus' }, error: true },
  ],
  howto: [
    "'Tüketim değeri' alanına elinizdeki sayıyı yazın; örneğin ilanda gördüğünüz 35 mpg ya da aracınızın yol bilgisayarındaki 6,5 L/100 km.",
    "'Girilen değerin birimi' listesinden bu sayının hangi birimde olduğunu seçin. MPG için kaynağın ABD mi yoksa İngiltere mi olduğuna dikkat edin.",
    "'Çevir' düğmesine basın. Değerin diğer üç birimdeki karşılığı ve bir litre yakıtla gidilen yol listelenir.",
    "Birkaç aracı karşılaştıracaksanız her birini aynı birime, tercihen L/100 km'ye çevirip sonuçları kopyalayın.",
  ],
  sections: [
    { h: 'Yakıt tüketimi neden farklı birimlerle yazılır?', p: [
      "Yakıt tüketimini anlatmanın iki zıt yolu vardır. Türkiye'de ve Avrupa'nın büyük bölümünde <strong>belirli bir yol için harcanan yakıt</strong> söylenir: 100 kilometrede kaç litre. Amerika Birleşik Devletleri ve Birleşik Krallık'ta ise <strong>belirli bir yakıtla gidilen yol</strong> söylenir: bir galonla kaç mil, yani MPG (miles per gallon). Japonya, Hindistan ve Latin Amerika'nın bir kısmında aynı mantığın metrik karşılığı olan km/L yaygındır.",
      "Bu iki yaklaşım birbirinin tersidir. L/100 km'de küçük sayı iyidir; MPG ve km/L'de büyük sayı iyidir. Yabancı bir inceleme videosunda '40 mpg' duyduğunuzda aracın tutumlu olup olmadığını kestirmek bu yüzden zordur. Üstelik ABD galonu ile İngiliz galonu farklı hacimlerdedir; aynı araç için İngiliz MPG değeri ABD değerinden yaklaşık yüzde 20 daha yüksek çıkar.",
    ] },
    { h: 'Çeviri formülleri', p: [
      "Hesabın dayandığı sabitler şunlardır: 1 mil = 1,609344 km, 1 ABD galonu = 3,785411784 litre, 1 İngiliz (imperial) galonu = 4,54609 litre. Bunlardan iki pratik katsayı elde edilir.",
    ], ul: [
      "<strong>L/100 km = 235,215 ÷ MPG (ABD)</strong> ve tersine MPG (ABD) = 235,215 ÷ L/100 km",
      "<strong>L/100 km = 282,481 ÷ MPG (İngiliz)</strong> ve tersine MPG (İngiliz) = 282,481 ÷ L/100 km",
      "<strong>L/100 km = 100 ÷ km/L</strong> ve tersine km/L = 100 ÷ L/100 km",
      "MPG (İngiliz) ≈ MPG (ABD) × 1,201",
    ] },
    { h: 'Çözümlü örnekler', p: [
      "Örnek 1: Aracınız 100 kilometrede 8 litre yakıyor. ABD ölçüsüyle 235,215 ÷ 8 = 29,4 mpg; İngiliz ölçüsüyle 282,481 ÷ 8 = 35,31 mpg eder. Litre başına gidilen yol 100 ÷ 8 = 12,5 kilometredir.",
      "Örnek 2: Amerikan kaynaklı bir testte araç için 30 mpg yazıyor. 235,215 ÷ 30 = 7,84 L/100 km. Bir litreyle yaklaşık 12,75 kilometre gidilir.",
      "Örnek 3: Bir İngiliz dergisinde 50 mpg değeri verilmiş. 282,481 ÷ 50 = 5,65 L/100 km. Aynı sayı ABD galonuyla yorumlansaydı 4,70 L/100 km çıkardı; yanlış galonu seçmek yaklaşık bir litrelik hataya yol açar.",
      "Örnek 4: 20 km/L tüketim, 100 ÷ 20 = 5 L/100 km demektir ve 47,04 ABD mpg değerine karşılık gelir.",
    ] },
    { h: 'Hızlı karşılaştırma tablosu', ul: [
      "<strong>4 L/100 km</strong> = 25 km/L = 58,8 mpg (ABD) = 70,6 mpg (İngiliz)",
      "<strong>5 L/100 km</strong> = 20 km/L = 47,0 mpg (ABD) = 56,5 mpg (İngiliz)",
      "<strong>6 L/100 km</strong> = 16,67 km/L = 39,2 mpg (ABD) = 47,1 mpg (İngiliz)",
      "<strong>7 L/100 km</strong> = 14,29 km/L = 33,6 mpg (ABD) = 40,4 mpg (İngiliz)",
      "<strong>8 L/100 km</strong> = 12,5 km/L = 29,4 mpg (ABD) = 35,3 mpg (İngiliz)",
      "<strong>10 L/100 km</strong> = 10 km/L = 23,5 mpg (ABD) = 28,2 mpg (İngiliz)",
      "<strong>12 L/100 km</strong> = 8,33 km/L = 19,6 mpg (ABD) = 23,5 mpg (İngiliz)",
    ] },
    { h: 'MPG farkları neden yanıltır?', p: [
      "MPG ile L/100 km arasındaki ilişki doğrusal değildir. 15 mpg'den 20 mpg'ye çıkmak 100 kilometrede yaklaşık 3,9 litre tasarruf sağlar. 40 mpg'den 45 mpg'ye çıkmak da aynı 5 birimlik artıştır, ama kazanç yalnızca 0,65 litre kadardır. Yani MPG ölçeğinde eşit görünen iyileşmeler, cebinize aynı ölçüde yansımaz.",
      "L/100 km ise harcanan yakıtla doğru orantılıdır: tüketim 8'den 6'ya düşerse her 100 kilometrede tam 2 litre az yakarsınız. Yakıt masrafını tahmin etmek ve araçları karşılaştırmak için bu yüzden L/100 km daha kullanışlıdır. Yabancı kaynaklardaki değerleri önce bu birime çevirmek sağlıklı bir karşılaştırmanın ilk adımıdır.",
    ] },
    { h: 'Türkiye\'den kullanım senaryoları', p: [
      "Yurt dışından araç ithal etmeyi düşünenler, ikinci el ilan sitelerinde gezinenler, Amerikan ya da İngiliz otomobil yayınlarını takip edenler ve motosiklet forumlarında tüketim kıyaslayanlar bu çeviriye sık ihtiyaç duyar. Yurt dışında araç kiralayanlar da gösterge panelinde MPG ya da km/L gördüklerinde alışık oldukları değere dönmek ister.",
      "Kendi aracınızın gerçek tüketimini bulmak için depoyu doldurun, kilometreyi sıfırlayın, bir sonraki dolumda aldığınız litreyi gittiğiniz kilometreye bölüp 100 ile çarpın. Örneğin 620 kilometrede 43,4 litre aldıysanız tüketim 43,4 ÷ 620 × 100 = 7 L/100 km'dir.",
    ] },
    { h: 'Sınırlar ve uyarılar', p: [
      "Araç yalnızca birim çevirir; değerin nasıl ölçüldüğünü bilemez. Farklı ülkelerin resmî test yöntemleri aynı araç için farklı sonuçlar verir, bu nedenle çevrilmiş bir Amerikan değeri ile Avrupa katalog değeri birebir karşılaştırılamaz. Gerçek tüketim sürüş tarzına, yüke, lastik basıncına, klima kullanımına, yol ve hava koşullarına göre değişir.",
      "Elektrikli araçlarda kullanılan kWh/100 km ya da ABD'deki MPGe gibi ölçüler bu aracın kapsamında değildir. Sıfır ve negatif değerler anlamsız olduğundan kabul edilmez; sonuçlar iki ondalık basamağa yuvarlanır.",
    ] },
  ],
  faq: [
    ['MPG ne demek?', "Miles per gallon, yani bir galon yakıtla gidilen mil sayısıdır. ABD ve Birleşik Krallık'ta yakıt verimliliği bu birimle ifade edilir; sayı büyüdükçe araç daha az yakıyor demektir."],
    ['30 mpg yüz kilometrede kaç litre eder?', "ABD galonuyla 30 mpg yaklaşık 7,84 L/100 km'dir. İngiliz galonuyla aynı sayı yaklaşık 9,42 L/100 km'ye karşılık gelir; bu yüzden kaynağın hangi ülkeye ait olduğunu bilmek gerekir."],
    ['ABD galonu ile İngiliz galonu arasındaki fark nedir?', "ABD galonu 3,785 litre, İngiliz (imperial) galonu 4,546 litredir. İngiliz galonu yaklaşık yüzde 20 daha büyük olduğundan aynı aracın İngiliz MPG değeri daha yüksek görünür."],
    ['L/100 km değerini km/L değerine nasıl çeviririm?', "100'ü L/100 km değerine bölersiniz. 100 kilometrede 6,5 litre yakan bir araç litre başına 100 ÷ 6,5 = 15,38 kilometre gider."],
    ['Hangi birim araç karşılaştırmak için daha doğru?', "Yakıt masrafıyla doğru orantılı olduğu için L/100 km daha sağlıklıdır. MPG'de eşit farklar düşük ve yüksek değerlerde çok farklı tasarruf anlamına gelir."],
    ['235,215 katsayısı nereden geliyor?', "100 kilometrenin mil karşılığı ile bir ABD galonunun litre karşılığının birleşiminden: 100 × 3,785411784 ÷ 1,609344 = 235,215. İngiliz galonu için aynı hesap 282,481 verir."],
    ['Motosiklet ya da kamyon için de kullanabilir miyim?', "Evet. Çeviri taşıt türünden bağımsızdır; yeter ki tüketim değeri bu dört birimden biriyle verilmiş olsun."],
    ['Girdiğim değerler kaydediliyor mu?', "Hayır. Hesap yalnızca tarayıcınızda yapılır; yazdığınız sayılar sunucuya gönderilmez ve saklanmaz."],
  ],
  related: ['km-mil-cevir', 'litre-galon-cevir', 'kmh-mph-cevir', 'birim-fiyat-karsilastir', 'beygir-kw-cevir'],
};
