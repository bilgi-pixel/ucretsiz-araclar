export default {
  slug: 'ucgen-alani-hesapla',
  title: 'Üçgen Alanı Hesaplama',
  h1Tail: 'taban-yükseklik, Heron, iki kenar-açı',
  pageTitle: 'Üçgen Alanı Hesaplama – Taban Yükseklik, Heron ve Açı ile',
  description: 'Üçgenin alanını taban ve yükseklikle, üç kenar uzunluğuyla (Heron formülü) ya da iki kenar ve aradaki açıyla hesaplayın; çevre ve yükseklik de gösterilir.',
  card: 'Üçgen alanını taban-yükseklik, üç kenar (Heron) ya da iki kenar ve açı ile bulun; çevreyi de görün.',
  category: 'matematik',
  keywords: ['üçgen alanı hesaplama', 'üçgenin alanı formülü', 'heron formülü', 'üç kenarı bilinen üçgenin alanı', 'taban yükseklik alan', 'iki kenar bir açı alan', 'üçgen çevresi'],
  lead: `Üçgenin alanını elinizdeki bilgiye göre üç farklı yoldan hesaplayın: <strong>taban ve yükseklik</strong>, <strong>üç kenar uzunluğu</strong> (Heron formülü) ya da <strong>iki kenar ve aralarındaki açı</strong>. Kenarlar bilindiğinde çevre ve bir kenara ait yükseklik de verilir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'yontem', label: 'Bilinenler', type: 'select', options: [['th', 'Taban ve yükseklik'], ['heron', 'Üç kenar (Heron formülü)'], ['sas', 'İki kenar ve aradaki açı']] },
    { id: 'taban', label: 'Taban', type: 'number', placeholder: 'Örn. 10', hint: 'Yalnızca "Taban ve yükseklik" yönteminde' },
    { id: 'yukseklik', label: 'Yükseklik', type: 'number', placeholder: 'Örn. 6', hint: 'Tabana dik inen uzunluk' },
    { id: 'kenarA', label: 'a kenarı', type: 'number', placeholder: 'Örn. 3', hint: 'Heron ve iki kenar-açı yöntemlerinde' },
    { id: 'kenarB', label: 'b kenarı', type: 'number', placeholder: 'Örn. 4' },
    { id: 'kenarC', label: 'c kenarı', type: 'number', placeholder: 'Örn. 5', hint: 'Yalnızca Heron yönteminde' },
    { id: 'aci', label: 'a ile b arasındaki açı (derece)', type: 'number', placeholder: 'Örn. 30', hint: 'Yalnızca iki kenar-açı yönteminde' },
  ],
  compute(v, h) {
    if (v.yontem === 'heron') {
      const a = h.pos(v.kenarA, 'a kenarı');
      const b = h.pos(v.kenarB, 'b kenarı');
      const c = h.pos(v.kenarC, 'c kenarı');
      const enBuyuk = Math.max(a, b, c);
      if (a + b + c - enBuyuk <= enBuyuk * (1 + 1e-12)) h.err('Bu üç uzunluk üçgen oluşturmaz: en uzun kenar, diğer iki kenarın toplamından kısa olmalı.');
      const s = (a + b + c) / 2;
      const alan = Math.sqrt(s * (s - a) * (s - b) * (s - c));
      return {
        rows: [
          ['Alan', h.fmt(alan, 4) + ' birim²'],
          ['Çevre', h.fmt(a + b + c, 4) + ' birim'],
          ['Yarı çevre (s)', h.fmt(s, 4) + ' birim'],
          ['a kenarına ait yükseklik', h.fmt(2 * alan / a, 4) + ' birim'],
        ],
        note: 'Heron formülü: Alan = √(s·(s−a)·(s−b)·(s−c)), s = (a+b+c)/2. Sonuç, kenarları yazdığınız birimin karesidir.',
      };
    }
    if (v.yontem === 'sas') {
      const a = h.pos(v.kenarA, 'a kenarı');
      const b = h.pos(v.kenarB, 'b kenarı');
      const aci = h.pos(v.aci, 'Açı');
      if (aci >= 180) h.err('Üçgenin bir açısı 180 dereceden küçük olmalı; 0 ile 180 arasında bir açı yazın.');
      const rad = aci * Math.PI / 180;
      const alan = 0.5 * a * b * Math.sin(rad);
      const c = Math.sqrt(Math.max(0, a * a + b * b - 2 * a * b * Math.cos(rad)));
      return {
        rows: [
          ['Alan', h.fmt(alan, 4) + ' birim²'],
          ['Üçüncü kenar (c)', h.fmt(c, 4) + ' birim'],
          ['Çevre', h.fmt(a + b + c, 4) + ' birim'],
          ['a kenarına ait yükseklik', h.fmt(2 * alan / a, 4) + ' birim'],
        ],
        note: 'Alan = ½·a·b·sin(C). Üçüncü kenar kosinüs teoremiyle bulunur.',
      };
    }
    const t = h.pos(v.taban, 'Taban');
    const y = h.pos(v.yukseklik, 'Yükseklik');
    return {
      rows: [
        ['Alan', h.fmt(t * y / 2, 4) + ' birim²'],
        ['Aynı taban ve yükseklikteki dikdörtgenin alanı', h.fmt(t * y, 4) + ' birim²'],
      ],
      note: 'Alan = taban × yükseklik ÷ 2. Sonuç, uzunlukları yazdığınız birimin karesidir (cm yazdıysanız cm²).',
    };
  },
  cases: [
    { in: { yontem: 'th', taban: '10', yukseklik: '6' }, out: { 'Alan': '30 birim²' } },
    { in: { yontem: 'heron', kenarA: '3', kenarB: '4', kenarC: '5' }, out: { 'Alan': '6 birim²', 'Çevre': '12 birim', 'a kenarına ait yükseklik': '4 birim' } },
    { in: { yontem: 'heron', kenarA: '13', kenarB: '14', kenarC: '15' }, out: { 'Alan': '84 birim²', 'Yarı çevre (s)': '21 birim' } },
    { in: { yontem: 'sas', kenarA: '8', kenarB: '6', aci: '30' }, out: { 'Alan': '12 birim²', 'a kenarına ait yükseklik': '3 birim' } },
    { in: { yontem: 'sas', kenarA: '3', kenarB: '4', aci: '90' }, out: { 'Alan': '6 birim²', 'Üçüncü kenar (c)': '5 birim', 'Çevre': '12 birim' } },
    { in: { yontem: 'heron', kenarA: '5', kenarB: '5', kenarC: '6' }, out: { 'Alan': '12 birim²', 'a kenarına ait yükseklik': '4,8 birim' } },
    { in: { yontem: 'th', taban: '7,5', yukseklik: '3' }, out: { 'Alan': '11,25 birim²' } },
    { in: { yontem: 'heron', kenarA: '1', kenarB: '2', kenarC: '5' }, error: true },
    { in: { yontem: 'th', taban: 'abc', yukseklik: '6' }, error: true },
    { in: { yontem: 'sas', kenarA: '3', kenarB: '4', aci: '180' }, error: true },
  ],
  howto: [
    `"Bilinenler" listesinden elinizdeki verilere uyan yöntemi seçin: taban ve yükseklik, üç kenar ya da iki kenar ve aradaki açı.`,
    `Seçtiğiniz yönteme ait kutuları doldurun; diğer kutuları boş bırakabilirsiniz. Bütün uzunlukları aynı birimle (hepsi cm ya da hepsi metre) yazın.`,
    `İki kenar-açı yönteminde açıyı derece olarak ve mutlaka yazdığınız iki kenarın <em>arasındaki</em> açı olarak girin.`,
    `"Hesapla" düğmesine basın. Alan ilk satırda, çevre ve yükseklik gibi ek bilgiler altında görünür.`,
    `Sonucu ödevinize ya da metraj tablonuza aktarmak için "Sonucu kopyala" düğmesini kullanın.`,
  ],
  sections: [
    { h: 'Üçgenin alanı nasıl bulunur?', p: [
      `Üçgenin alanı, kapladığı düzlem parçasının büyüklüğüdür ve en bilinen formülü <strong>Alan = taban × yükseklik ÷ 2</strong> şeklindedir. Buradaki yükseklik, seçilen tabana karşı köşeden dik olarak inen doğru parçasının uzunluğudur; eğik kenarın uzunluğu değildir. İkiye bölmenin nedeni basittir: aynı taban ve yüksekliğe sahip bir dikdörtgen çizerseniz üçgen o dikdörtgenin tam yarısını kaplar. Araç bu dikdörtgenin alanını da ayrı satırda gösterir.`,
      `Örnek: tabanı 10 cm, yüksekliği 6 cm olan üçgenin alanı 10 × 6 ÷ 2 = <strong>30 cm²</strong> eder. Hangi kenarı taban seçtiğinizin önemi yoktur; yeter ki yükseklik o kenara ait olsun. Geniş açılı üçgenlerde yükseklik üçgenin dışına düşebilir, formül yine aynı şekilde çalışır.`,
    ] },
    { h: 'Üç kenar biliniyorsa: Heron formülü', p: [
      `Yükseklik her zaman ölçülemez. Arsa, bahçe ya da kumaş parçası gibi gerçek nesnelerde çoğunlukla yalnızca kenar uzunlukları elde vardır. Bu durumda Heron formülü kullanılır. Önce yarı çevre bulunur: <strong>s = (a + b + c) ÷ 2</strong>. Sonra alan, <strong>√(s · (s − a) · (s − b) · (s − c))</strong> ifadesiyle hesaplanır.`,
      `Çözümlü örnek: kenarları 13, 14 ve 15 birim olan üçgende s = (13 + 14 + 15) ÷ 2 = 21 olur. Çarpım 21 × 8 × 7 × 6 = 7056, karekökü 84'tür; yani alan <strong>84 birim²</strong>. Ünlü 3-4-5 üçgeninde s = 6, çarpım 6 × 3 × 2 × 1 = 36 ve alan 6 birim² çıkar; bu, dik kenarlardan 3 × 4 ÷ 2 ile bulunan değerle aynıdır.`,
      `Heron formülünün çalışması için üç uzunluğun gerçekten bir üçgen oluşturması gerekir. <strong>Üçgen eşitsizliği</strong> der ki her kenar, diğer ikisinin toplamından kısa olmalıdır. 1, 2 ve 5 gibi değerler bu koşulu sağlamaz; araç böyle bir girişte hesap yapmak yerine uyarı verir.`,
    ] },
    { h: 'İki kenar ve aradaki açı ile alan', p: [
      `İki kenarın uzunluğu ve bu iki kenarın oluşturduğu açı biliniyorsa alan <strong>½ · a · b · sin(C)</strong> formülüyle bulunur. Formül aslında taban-yükseklik formülünün başka bir yazımıdır: b kenarının a tabanına göre yüksekliği b · sin(C) kadardır.`,
      `Çözümlü örnek: a = 8, b = 6 ve aralarındaki açı 30° olsun. sin 30° = 0,5 olduğundan alan ½ × 8 × 6 × 0,5 = <strong>12 birim²</strong> eder; a kenarına ait yükseklik de 6 × 0,5 = 3 birimdir. Açı 90° olduğunda sinüs 1'e eşit olur ve formül dik üçgenin bilinen "dik kenarların çarpımının yarısı" kuralına dönüşür. Araç bu yöntemde üçüncü kenarı kosinüs teoremiyle (c² = a² + b² − 2ab·cos C) hesaplayıp çevreyi de verir.`,
    ] },
    { h: 'Özel üçgenler için kısa yollar', ul: [
      `<strong>Dik üçgen:</strong> dik kenarlar birbirinin yüksekliğidir; alan = dik kenarların çarpımı ÷ 2.`,
      `<strong>Eşkenar üçgen:</strong> kenarı a ise alan = a² · √3 ÷ 4. Kenarı 2 birim olan eşkenar üçgenin alanı yaklaşık 1,7321 birim²'dir.`,
      `<strong>İkizkenar üçgen:</strong> tabana inen yükseklik tabanı ortalar. Kenarları 5, 5 ve 6 olan üçgende 6'lık tabana ait yükseklik 4, alan 12 birim²'dir.`,
      `<strong>Koordinatları bilinen üçgen:</strong> köşe koordinatlarından kenar uzunluklarını bulup Heron yöntemini kullanabilirsiniz.`,
    ] },
    { h: 'Nerelerde işe yarar?', p: [
      `Üçgen alanı yalnızca sınav sorularında karşımıza çıkmaz. Köşeli ya da yamuk biçimli bir arsayı üçgenlere bölüp her birinin kenarlarını şerit metreyle ölçerek toplam alanı bulmak, tapu ölçüsünü kabaca kontrol etmenin eski ve güvenilir bir yoludur. Çatı kalkan duvarı, üçgen alınlık, yelken, tente ya da branda için gereken malzeme de üçgen alanından çıkar. Marangozlukta köşe rafı, dikişte üçgen şal ya da bayrak kesimi, peyzajda üçgen çiçek tarhı için tohum ve gübre miktarı hep aynı hesaba dayanır.`,
      `Ortaokul ve lise geometri derslerinde, LGS ve YKS hazırlığında soruların büyük bölümü üç yöntemden birine indirgenir. Sonucu elle bulduktan sonra bu araçla doğrulamak, işlem hatasını hızlıca yakalamanızı sağlar.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `Yükseklik yerine eğik kenarın uzunluğunu yazmak. Yükseklik her zaman tabana diktir.`,
      `İkiye bölmeyi unutmak; taban ile yüksekliğin çarpımı dikdörtgenin alanıdır, üçgenin değil.`,
      `Kenarları farklı birimlerle yazmak (biri santimetre, diğeri metre). Önce hepsini aynı birime çevirin.`,
      `İki kenar-açı yönteminde yanlış açıyı kullanmak. Açı, yazdığınız iki kenarın birleştiği köşedeki açı olmalıdır.`,
      `Açıyı radyan ya da grad cinsinden yazmak. Bu araç dereceyle çalışır.`,
    ] },
    { h: 'Birimler ve duyarlılık', p: [
      `Araç birimden bağımsızdır: uzunlukları santimetre yazarsanız alan santimetrekare, metre yazarsanız metrekare olur. Sonuçlar en fazla dört ondalık basamakla gösterilir. Çok ince, neredeyse düz bir çizgiye yakın üçgenlerde Heron formülü yuvarlama hatalarına duyarlıdır; ölçüm hatanız zaten bundan büyük olacağı için gündelik işlerde sorun yaratmaz. Tapu, imar ya da hakediş gibi resmî sonuç doğuran ölçümler için yetkili harita mühendisinin ölçümü esas alınmalıdır.`,
    ] },
  ],
  faq: [
    ['Üçgenin alan formülü nedir?', 'En temel formül taban çarpı yükseklik bölü ikidir. Üç kenar biliniyorsa Heron formülü, iki kenar ve aralarındaki açı biliniyorsa yarım çarpı iki kenar çarpı açının sinüsü formülü kullanılır. Üçü de aynı sonucu verir.'],
    ['Yüksekliği bilmeden üçgenin alanı bulunur mu?', 'Evet. Üç kenar uzunluğunu biliyorsanız Heron formülüyle, iki kenarı ve aradaki açıyı biliyorsanız sinüslü alan formülüyle yükseklik ölçmeden alan hesaplanır. Araç her iki durumda yüksekliği de sonuç olarak verir.'],
    ['Heron formülünde s neyi gösterir?', 's, üçgenin yarı çevresidir; yani üç kenarın toplamının yarısı. Kenarları 13, 14 ve 15 olan üçgende s = 21 olur ve alan 21 × 8 × 7 × 6 çarpımının karekökü, yani 84 çıkar.'],
    ['Girdiğim kenarlar neden üçgen oluşturmuyor?', 'Bir üçgende en uzun kenar, diğer iki kenarın toplamından kısa olmak zorundadır. Örneğin 1, 2 ve 5 uzunluklarında 1 + 2 = 3, 5\'ten küçük olduğu için uçlar birleşmez. Ölçülerinizi ve birimlerinizi kontrol edin.'],
    ['Eşkenar üçgenin alanı nasıl hesaplanır?', 'Kenar uzunluğunun karesi kök üç ile çarpılıp dörde bölünür. Bu araçta Heron yöntemini seçip üç kenara da aynı değeri yazmanız yeterlidir; kenarı 2 olan eşkenar üçgen için yaklaşık 1,7321 sonucunu görürsünüz.'],
    ['Dik üçgenin alanını hangi yöntemle bulmalıyım?', 'Dik kenarlardan birini taban, diğerini yükseklik olarak yazıp taban-yükseklik yöntemini kullanın. Dik kenarları 3 ve 4 olan üçgenin alanı 3 × 4 ÷ 2 = 6 birim karedir. Hipotenüs bu hesapta kullanılmaz.'],
    ['Sonuç hangi birimde çıkar?', 'Sonuç, uzunlukları yazdığınız birimin karesidir. Santimetre yazdıysanız santimetrekare, metre yazdıysanız metrekare olarak okuyun. Araç birim dönüşümü yapmaz; bu yüzden bütün uzunlukları aynı birimle girmelisiniz.'],
    ['Arsa alanını bu araçla hesaplayabilir miyim?', 'Üçgen biçimli ya da üçgenlere bölünebilen bir parselin yaklaşık alanını kenar ölçülerinden bulabilirsiniz. Ancak resmî işlemler için tapu kaydı ve yetkili ölçüm geçerlidir; buradaki sonuç bilgilendirme amaçlıdır.'],
    ['Yazdığım ölçüler kaydediliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; girdiğiniz sayılar hiçbir sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['alan-cevre-hesapla', 'pisagor-teoremi-hesapla', 'dik-ucgen-hesapla', 'ucgen-acisi-hesapla', 'metrekare-hesapla'],
};
