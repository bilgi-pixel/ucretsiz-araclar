export default {
  slug: 'parmak-cm-cevir',
  title: 'Parmak (Boru Çapı) Santimetre Çevirici',
  h1Tail: 'parmak ↔ cm',
  pageTitle: 'Parmak Kaç cm? Boru Çapı Parmak Santimetre Çevirici',
  description: 'Yarım parmak, üç çeyrek, bir parmak gibi boru ölçülerini santimetre ve milimetreye çevirin. Kesirli girişi kabul eder; DN anma çapını ve boru dış çapını da gösterir.',
  card: 'Tesisatta kullanılan parmak (inç) ölçülerini cm ve mm\'ye çevirin; 1/2, 3/4, 1 1/4 gibi kesirleri yazın, DN ve dış çapı görün.',
  category: 'birim',
  keywords: ['parmak kaç cm', 'yarım parmak kaç mm', '1 parmak boru kaç mm', 'boru çapı parmak', 'üç çeyrek boru kaç mm', 'parmak inç çevirme', 'DN boru ölçüleri', 'parmak milimetre'],
  lead: 'Tesisatçının "yarım parmak", "üç çeyrek", "bir buçuk parmak" dediği ölçüleri santimetre ve milimetreye çevirin. Tesisatta parmak, inç demektir ve <strong>1 parmak = 2,54 cm</strong> eder. Araç ayrıca standart boru ölçülerinde DN anma çapını ve çelik borunun yaklaşık dış çapını gösterir; çünkü borunun gerçek çapı, adındaki parmak değerinin doğrudan karşılığı değildir.',
  button: 'Çevir',
  inputs: [
    { id: 'olcu', label: 'Ölçü', type: 'text', placeholder: 'Örn. 1/2, 1 1/4 ya da 2,5', hint: 'Parmak için kesir yazabilirsiniz: 3/4, 1 1/2. Ondalık için virgül kullanın.' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['parmak', 'Parmak (inç) → Santimetre'], ['cm', 'Santimetre → Parmak (inç)']] },
  ],
  compute(v, h) {
    const ham = String(v.olcu ?? '').trim().replace(/["″”“]/g, '').replace(/(parmak|inç|inc|cm)\.?$/i, '').trim();
    if (ham === '') h.err('"Ölçü" alanını doldurun (örn. 1/2 ya da 2,54).');
    let x;
    let m = /^(\d+)[\s-]+(\d+)\s*\/\s*(\d+)$/.exec(ham);
    if (m) {
      if (+m[3] === 0) h.err('Kesrin paydası sıfır olamaz.');
      x = +m[1] + +m[2] / +m[3];
    } else if ((m = /^(\d+)\s*\/\s*(\d+)$/.exec(ham))) {
      if (+m[2] === 0) h.err('Kesrin paydası sıfır olamaz.');
      x = +m[1] / +m[2];
    } else {
      x = h.nonneg(ham, 'Ölçü');
    }
    const inc = v.yon === 'cm' ? x / 2.54 : x;
    const cm = inc * 2.54;
    // En yakın 1/16 inç kesri
    const ebob = (a, b) => (b ? ebob(b, a % b) : a);
    const n16 = Math.round(inc * 16);
    const tam = Math.floor(n16 / 16);
    const kalan = n16 % 16;
    const g = kalan ? ebob(kalan, 16) : 1;
    const kesir = kalan ? (tam ? tam + ' ' : '') + kalan / g + '/' + 16 / g : String(tam);
    // Standart dişli çelik boru ölçüleri: [inç, DN, dış çap mm]
    const tablo = [[0.125, 6, 10.2], [0.25, 8, 13.5], [0.375, 10, 17.2], [0.5, 15, 21.3], [0.75, 20, 26.9], [1, 25, 33.7], [1.25, 32, 42.4], [1.5, 40, 48.3], [2, 50, 60.3], [2.5, 65, 76.1], [3, 80, 88.9], [4, 100, 114.3]];
    const std = tablo.find((t) => Math.abs(t[0] - inc) < 0.004);
    const rows = v.yon === 'cm'
      ? [['Parmak (inç)', h.fmt(inc, 4) + ' inç'], ['En yakın 1/16 kesir', kesir + ' inç'], ['Milimetre', h.fmt(cm * 10, 2) + ' mm']]
      : [['Santimetre', h.fmt(cm, 4) + ' cm'], ['Milimetre', h.fmt(cm * 10, 2) + ' mm'], ['Ondalık inç', h.fmt(inc, 4) + ' inç']];
    if (std) {
      rows.push(['Anma çapı', 'DN ' + std[1]]);
      rows.push(['Çelik boru dış çapı (yaklaşık)', h.fmt(std[2], 1) + ' mm']);
    }
    return {
      rows,
      note: std
        ? 'Santimetre değeri yalnızca birim çevirisidir (1 parmak = 2,54 cm). Bu anma ölçüsündeki dişli çelik borunun gerçek dış çapı ayrı satırda verilmiştir; plastik borularda ölçü farklıdır.'
        : '1 parmak = 1 inç = 2,54 cm. Boru alırken anma ölçüsünün gerçek dış çapla aynı olmadığını unutmayın.',
    };
  },
  cases: [
    { in: { olcu: '1/2', yon: 'parmak' }, out: { 'Santimetre': '1,27 cm', 'Milimetre': '12,7 mm', 'Anma çapı': 'DN 15', 'Çelik boru dış çapı (yaklaşık)': '21,3 mm' } },
    { in: { olcu: '2,54', yon: 'cm' }, out: { 'Parmak (inç)': '1 inç', 'En yakın 1/16 kesir': '1 inç', 'Milimetre': '25,4 mm' } },
    { in: { olcu: '1 1/4', yon: 'parmak' }, out: { 'Santimetre': '3,175 cm', 'Milimetre': '31,75 mm', 'Anma çapı': 'DN 32', 'Çelik boru dış çapı (yaklaşık)': '42,4 mm' } },
    { in: { olcu: '3/4', yon: 'parmak' }, out: { 'Santimetre': '1,905 cm', 'Ondalık inç': '0,75 inç', 'Anma çapı': 'DN 20' } },
    { in: { olcu: '2', yon: 'parmak' }, out: { 'Santimetre': '5,08 cm', 'Anma çapı': 'DN 50', 'Çelik boru dış çapı (yaklaşık)': '60,3 mm' } },
    { in: { olcu: '1,905', yon: 'cm' }, out: { 'Parmak (inç)': '0,75 inç', 'En yakın 1/16 kesir': '3/4 inç' } },
    { in: { olcu: '7', yon: 'parmak' }, out: { 'Santimetre': '17,78 cm', 'Milimetre': '177,8 mm' } },
    { in: { olcu: '4', yon: 'cm' }, out: { 'Parmak (inç)': '1,5748 inç', 'En yakın 1/16 kesir': '1 9/16 inç' } },
    { in: { olcu: 'yarım', yon: 'parmak' }, error: true },
    { in: { olcu: '1/0', yon: 'parmak' }, error: true },
    { in: { olcu: '', yon: 'cm' }, error: true },
  ],
  howto: [
    '"Ölçü" alanına değeri yazın. Parmak ölçülerinde kesir kullanabilirsiniz: yarım parmak için 1/2, üç çeyrek için 3/4, bir çeyrek fazlası için 1 1/4.',
    '"Çeviri yönü" listesinden parmaktan santimetreye mi, santimetreden parmağa mı çevireceğinizi seçin.',
    '"Çevir" düğmesine basın. Santimetre ve milimetre karşılığı hemen görünür.',
    'Yazdığınız değer standart bir boru ölçüsüyse sonuçta "Anma çapı" (DN) ve "Çelik boru dış çapı" satırları da çıkar; kumpasla ölçtüğünüz değeri bu satırla karşılaştırın.',
    'Santimetreden parmağa çevirirken "En yakın 1/16 kesir" satırı, ölçünün piyasada nasıl söyleneceğini gösterir.',
  ],
  sections: [
    { h: 'Tesisatta parmak ne demek?', p: [
      'Türkiye\'de sıhhi tesisat, doğal gaz, kalorifer ve basınçlı hava işlerinde boru ve bağlantı parçaları yıllardır "parmak" üzerinden konuşulur. Buradaki parmak, İngiliz ölçü sistemindeki inçin Türkçe adıdır: bir parmak 2,54 santimetre, yani 25,4 milimetredir. Usta "yarım parmak vana" dediğinde yarım inçlik, "bir parmak nipel" dediğinde bir inçlik anma ölçüsünü kasteder.',
      'Bu parmak, Osmanlı mimar arşınının yirmi dörtte biri olan ve yaklaşık 3,16 santimetre gelen eski parmakla aynı şey değildir. Günümüzde nalburda ve tesisat malzemecisinde duyduğunuz parmak her zaman inçtir.',
    ] },
    { h: 'Çevirme formülü', p: [
      'Hesap çok basittir: <strong>cm = parmak × 2,54</strong> ve tersine <strong>parmak = cm ÷ 2,54</strong>. Kesirli ölçüde önce kesri ondalığa çevirirsiniz. Örneğin 1 1/4 parmak, 1,25 inç demektir; 1,25 × 2,54 = 3,175 cm, yani 31,75 mm eder. Yarım parmak 0,5 × 2,54 = 1,27 cm, üç çeyrek parmak 0,75 × 2,54 = 1,905 cm\'dir.',
      'Ters yönde, kumpasla 4 cm ölçtüğünüz bir açıklık 4 ÷ 2,54 = 1,5748 inçtir. İnç kesirleri on altıda birlik adımlarla söylendiği için araç bunu en yakın kesre, yani 1 9/16 inçe yuvarlayarak da gösterir.',
    ] },
    { h: 'Neden yarım parmak boru 12,7 mm değil?', p: [
      'Bu sayfanın en önemli konusu budur. Boru ölçülerindeki parmak değeri bir <strong>anma ölçüsüdür</strong>; borunun ne iç çapını ne dış çapını tam olarak verir. Tarihsel olarak bu değer, kalın etli eski boruların yaklaşık iç çapını anlatıyordu. Zamanla et kalınlıkları inceldi, ancak dişlerin birbirine uyması için dış çap sabit tutuldu ve ad değişmedi.',
      'Sonuç olarak yarım parmak dişli çelik borunun dış çapı yaklaşık 21,3 mm, bir parmak borunun dış çapı yaklaşık 33,7 mm\'dir. Elinizdeki boruyu kumpasla ölçüp 21 mm gördüyseniz, o boru "2 santimlik" değil, yarım parmaktır. Aynı ölçüler metrik adlandırmada DN (anma çapı) ile gösterilir: yarım parmak DN 15, üç çeyrek DN 20, bir parmak DN 25\'tir.',
    ] },
    { h: 'Standart boru ölçüleri tablosu', ul: [
      '<strong>1/4 parmak</strong> – DN 8 – dış çap yaklaşık 13,5 mm',
      '<strong>3/8 parmak</strong> – DN 10 – dış çap yaklaşık 17,2 mm',
      '<strong>1/2 parmak</strong> – DN 15 – dış çap yaklaşık 21,3 mm',
      '<strong>3/4 parmak</strong> – DN 20 – dış çap yaklaşık 26,9 mm',
      '<strong>1 parmak</strong> – DN 25 – dış çap yaklaşık 33,7 mm',
      '<strong>1 1/4 parmak</strong> – DN 32 – dış çap yaklaşık 42,4 mm',
      '<strong>1 1/2 parmak</strong> – DN 40 – dış çap yaklaşık 48,3 mm',
      '<strong>2 parmak</strong> – DN 50 – dış çap yaklaşık 60,3 mm',
      '<strong>2 1/2 parmak</strong> – DN 65 – dış çap yaklaşık 76,1 mm',
      '<strong>3 parmak</strong> – DN 80 – dış çap yaklaşık 88,9 mm',
      '<strong>4 parmak</strong> – DN 100 – dış çap yaklaşık 114,3 mm',
    ] },
    { h: 'Plastik borularda durum', p: [
      'Evlerde yaygın olan PPR (plastik temiz su) borularında ölçü, borunun dış çapının milimetre değeridir: 20\'lik, 25\'lik, 32\'lik boru gibi. Bu borular dişli parçalarla birleşirken parmak ölçüsüne geçilir. Piyasadaki yaygın eşleşmede 20 mm PPR boru yarım parmak, 25 mm boru üç çeyrek parmak, 32 mm boru bir parmak dişli parçayla kullanılır. Bu yüzden "20\'lik boruya yarım parmak dişli dirsek" gibi tarifler duyarsınız.',
      'Dişli bağlantılarda ayrıca diş standardı önemlidir. Aynı parmak ölçüsündeki iki parça, diş tipi farklıysa birbirine tam oturmayabilir. Batarya, flex hortum ve vana gibi parçaları değiştirirken eski parçayı yanınızda götürmek en güvenli yoldur.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Borunun dış çapını cetvelle ölçüp 2,54\'e bölmek. Çıkan sayı anma ölçüsünü vermez; yukarıdaki tabloyla karşılaştırmak gerekir.',
      'Yarım parmağı 1/2 yerine 0,2 ya da 1,2 gibi yazmak. Kesri olduğu gibi (1/2) ya da ondalık karşılığıyla (0,5) girin.',
      'Çelik boru tablosunu bakır ya da plastik boruya uygulamak. Her malzemenin kendi ölçü dizisi vardır.',
      'Hortum ve rakor ölçülerinde iç çap ile diş ölçüsünü karıştırmak. Hortumlar genellikle iç çapla, rakorlar diş ölçüsüyle satılır.',
    ] },
    { h: 'Uyarı', p: [
      'Tablodaki dış çaplar yaygın dişli çelik boru dizisine ait yaklaşık değerlerdir; üretim toleransı, malzeme ve standarda göre küçük farklar olabilir. Doğal gaz, basınçlı kap, yangın ve kazan tesisatı gibi güvenlik açısından kritik işlerde malzeme seçimi için üreticinin teknik föyüne ve yetkili tesisat mühendisine ya da ustasına danışın. Bu araç bilgilendirme amaçlıdır.',
    ] },
  ],
  faq: [
    ['1 parmak kaç santimetredir?', 'Tesisatta kullanılan 1 parmak 1 inçtir ve tam olarak 2,54 santimetre, yani 25,4 milimetredir. Ancak 1 parmak borunun dış çapı bu değer değil, yaklaşık 33,7 milimetredir.'],
    ['Yarım parmak boru kaç milimetredir?', 'Birim olarak yarım parmak 12,7 milimetredir. Yarım parmak anma ölçülü dişli çelik borunun dış çapı ise yaklaşık 21,3 milimetredir ve metrik karşılığı DN 15 olarak adlandırılır.'],
    ['Üç çeyrek boru ne demek?', 'Üç çeyrek, 3/4 parmak anma ölçüsüdür. Birim çevirisiyle 1,905 santimetre eder; bu ölçüdeki çelik borunun dış çapı yaklaşık 26,9 milimetredir ve DN 20 olarak geçer.'],
    ['DN ne anlama gelir?', 'DN, anma çapı demektir ve boru ölçülerinin metrik adlandırmasıdır. DN 15 yarım parmağa, DN 25 bir parmağa, DN 50 iki parmağa karşılık gelir. DN değeri de borunun gerçek iç ya da dış çapı değildir; ölçü sınıfını gösteren yuvarlak bir sayıdır.'],
    ['20\'lik PPR boru kaç parmaktır?', 'Piyasadaki yaygın kullanımda 20 mm dış çaplı PPR boru yarım parmak dişli parçalarla, 25 mm boru üç çeyrek parmak, 32 mm boru bir parmak parçalarla eşleştirilir. Satın almadan önce parçanın üzerindeki ölçüyü kontrol edin.'],
    ['Kesirli ölçüyü nasıl yazmalıyım?', 'Kesri bölü işaretiyle yazın: 1/2, 3/4, 3/8. Tam sayılı kesirlerde araya boşluk koyun: 1 1/4 ya da 2 1/2. Dilerseniz ondalık olarak 1,25 ya da 2,5 de yazabilirsiniz.'],
    ['Elimdeki borunun kaç parmak olduğunu nasıl anlarım?', 'Borunun dış çapını kumpasla milimetre olarak ölçün ve bu sayfadaki tabloyla karşılaştırın. Yaklaşık 21 mm ise yarım parmak, 27 mm ise üç çeyrek, 34 mm ise bir parmak çelik borudur. Plastik borularda üzerindeki baskıya bakmak daha güvenilirdir.'],
    ['Girdiğim ölçüler bir yere gönderiliyor mu?', 'Hayır. Hesaplama yalnızca tarayıcınızda yapılır; yazdığınız değer sunucuya iletilmez ve kaydedilmez. Şantiyede internet olmasa bile sayfa bir kez açıldıysa çalışmaya devam eder.'],
  ],
  related: ['cm-inc-cevir', 'mm-inc-cevir', 'arsin-metre-cevir', 'm3-saat-litre-dakika-cevir', 'kgcm2-bar-cevir', 'birim-donustur'],
};
