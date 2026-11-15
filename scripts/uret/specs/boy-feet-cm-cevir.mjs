export default {
  slug: 'boy-feet-cm-cevir',
  title: 'Boy Çevirici (Feet İnç – Santimetre)',
  h1Tail: 'ft in ↔ cm',
  pageTitle: 'Boy Çevirici – Feet İnç Boyu Santimetreye, cm\'yi Feet İnçe Çevirme',
  description: 'Boyunuzu feet ve inçten santimetreye ya da santimetreden feet ve inçe çevirin. 5′10″ gibi yazımların cm karşılığını ve tam inçe yuvarlanmış hâlini görün.',
  card: 'Feet ve inç olarak verilen boyu santimetreye, santimetre boyu feet-inçe çevirin; vize formları ve sporcu profilleri için.',
  category: 'birim',
  keywords: ['boy çevirici', 'feet inç cm çevirme', '5 feet 10 inç kaç cm', 'boy feet hesaplama', 'cm feet inç', '180 cm kaç feet', '6 feet kaç cm', 'boy fit çevirme'],
  lead: 'Boy ölçüsünü <strong>feet ve inç</strong> ile <strong>santimetre</strong> arasında iki yönlü çevirin. Araç 5′10″ gibi bir boyun kaç santimetre ettiğini ya da 180 cm\'nin feet ve inç olarak nasıl yazılacağını, forma yazmaya uygun yuvarlanmış hâliyle birlikte gösterir.',
  button: 'Çevir',
  inputs: [
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['ft', 'Feet ve inç → Santimetre'], ['cm', 'Santimetre → Feet ve inç']] },
    { id: 'feet', label: 'Feet', type: 'number', placeholder: 'Örn. 5', hint: 'Feet-inç yönünde kullanılır; tam sayı yazın.' },
    { id: 'inc', label: 'İnç', type: 'number', placeholder: 'Örn. 10', hint: 'Boş bırakılırsa 0 sayılır; 12\'den küçük olmalı.' },
    { id: 'cm', label: 'Santimetre', type: 'number', placeholder: 'Örn. 180', hint: 'Santimetre yönünde kullanılır.' },
  ],
  compute(v, h) {
    let toplamInc;
    if (v.yon === 'cm') {
      const cmGirdi = h.pos(v.cm, 'Santimetre');
      if (cmGirdi > 300) h.err('"Santimetre" alanına 300 ya da daha küçük bir boy yazın; metre girdiyseniz santimetreye çevirin (1,80 m = 180 cm).');
      toplamInc = cmGirdi / 2.54;
    } else {
      const ft = h.int(v.feet, 'Feet');
      if (ft < 0) h.err('"Feet" negatif olamaz.');
      if (ft > 9) h.err('"Feet" alanına 0 ile 9 arasında bir değer yazın; boy için daha büyük bir sayı beklenmez.');
      const inc = h.opt(v.inc, 0, 'İnç');
      if (inc < 0) h.err('"İnç" negatif olamaz.');
      if (inc >= 12) h.err('"İnç" 12\'den küçük olmalı; 12 inç 1 feet eder, feet değerini bir artırın.');
      toplamInc = ft * 12 + inc;
      if (!(toplamInc > 0)) h.err('Feet ve inç alanlarından en az birine sıfırdan büyük bir değer yazın.');
    }
    const cm = toplamInc * 2.54;
    let tamFt = Math.floor(toplamInc / 12 + 1e-9);
    let kalan = Math.round((toplamInc - tamFt * 12) * 100) / 100;
    if (kalan >= 12) { tamFt += 1; kalan = 0; }
    if (kalan < 0) kalan = 0;
    const yuvInc = Math.round(toplamInc - 1e-9);
    const yFt = Math.floor(yuvInc / 12);
    const yIn = yuvInc - yFt * 12;
    const cmSatiri = ['Santimetre', h.fmt(cm, 2) + ' cm'];
    const ftSatiri = ['Feet ve inç', `${tamFt} ft ${h.fmt(kalan, 2)} inç`];
    return {
      rows: [
        v.yon === 'cm' ? ftSatiri : cmSatiri,
        v.yon === 'cm' ? cmSatiri : ftSatiri,
        ['Tam inçe yuvarlanmış', `${yFt}′${yIn}″ (${h.fmt(yuvInc * 2.54, 2)} cm)`],
        ['Metre', h.fmt(cm / 100, 4) + ' m'],
        ['Toplam inç', h.fmt(toplamInc, 2) + ' inç'],
        ['Ondalık feet', h.fmt(toplamInc / 12, 4) + ' ft'],
      ],
      note: '1 feet = 12 inç = 30,48 cm; 1 inç = 2,54 cm. "Tam inçe yuvarlanmış" satırı, formlarda kullanılan 5′11″ biçimindeki yazımdır.',
    };
  },
  cases: [
    { in: { yon: 'ft', feet: '5', inc: '10' }, out: { 'Santimetre': '177,8 cm', 'Feet ve inç': '5 ft 10 inç', 'Toplam inç': '70 inç', 'Metre': '1,778 m' } },
    { in: { yon: 'cm', cm: '180' }, out: { 'Feet ve inç': '5 ft 10,87 inç', 'Tam inçe yuvarlanmış': '5′11″ (180,34 cm)', 'Toplam inç': '70,87 inç' } },
    { in: { yon: 'ft', feet: '6', inc: '' }, out: { 'Santimetre': '182,88 cm', 'Ondalık feet': '6 ft' } },
    { in: { yon: 'ft', feet: '5', inc: '7' }, out: { 'Santimetre': '170,18 cm', 'Tam inçe yuvarlanmış': '5′7″ (170,18 cm)' } },
    { in: { yon: 'cm', cm: '170' }, out: { 'Feet ve inç': '5 ft 6,93 inç', 'Tam inçe yuvarlanmış': '5′7″ (170,18 cm)' } },
    { in: { yon: 'cm', cm: '152,4' }, out: { 'Feet ve inç': '5 ft 0 inç', 'Tam inçe yuvarlanmış': '5′0″ (152,4 cm)', 'Metre': '1,524 m' } },
    { in: { yon: 'ft', feet: '5', inc: '5,5' }, out: { 'Santimetre': '166,37 cm', 'Ondalık feet': '5,4583 ft' } },
    { in: { yon: 'ft', feet: '5', inc: '12' }, error: true },
    { in: { yon: 'cm', cm: '' }, error: true },
    { in: { yon: 'ft', feet: '5,9', inc: '' }, error: true },
  ],
  howto: [
    '"Çeviri yönü" listesinden feet-inçten santimetreye mi, santimetreden feet-inçe mi çevireceğinizi seçin.',
    'Feet-inç yönünde "Feet" alanına tam sayıyı, "İnç" alanına kalan inçi yazın. Örneğin 5′10″ için 5 ve 10 girilir; inç yoksa alanı boş bırakabilirsiniz.',
    'Santimetre yönünde yalnızca "Santimetre" alanını doldurun; 1,75 metre için 175 yazın.',
    '"Çevir" düğmesine basın. İlk satırda karşılık gelen boy, üçüncü satırda forma yazılabilecek tam inçe yuvarlanmış hâl görünür.',
    'İhtiyacınız olan satırı not alın ya da tüm sonucu kopyalayın.',
  ],
  sections: [
    { h: 'Feet ve inç ile boy nasıl ifade edilir?', p: [
      'Amerika Birleşik Devletleri\'nde ve gündelik kullanımda Birleşik Krallık\'ta boy, santimetre yerine feet ve inç ile söylenir. Bir feet 12 inç, bir inç 2,54 santimetredir; dolayısıyla bir feet 30,48 santimetre eder. Boy yazılırken feet için tek tırnak, inç için çift tırnak işareti kullanılır: <strong>5′10″</strong>, "beş feet on inç" diye okunur. Aynı boy "5 ft 10 in" biçiminde de yazılabilir.',
      'Bu gösterim ondalık sistemle karıştırıldığında hata kaçınılmazdır. Feet ile inç arasında 10\'luk değil 12\'lik bir ilişki vardır; bu nedenle 5′10″ ile 5,10 feet aynı şey değildir. Araç bu yüzden feet ve inçi ayrı alanlarda alır ve ondalık feet değerini ayrı bir satırda gösterir.',
    ] },
    { h: 'Hesap nasıl yapılır?', p: [
      'Feet-inçten santimetreye geçmek için önce boy toplam inçe çevrilir, sonra 2,54 ile çarpılır: <strong>cm = (feet × 12 + inç) × 2,54</strong>.',
      'Santimetreden feet-inçe geçerken işlem tersine yürür: santimetre 2,54\'e bölünerek toplam inç bulunur; toplam inç 12\'ye bölündüğünde tam kısım feet, kalan ise inçtir. Kalan inç çoğu zaman ondalıklı çıkar. Formlarda ondalıklı inç yazılmadığı için değer en yakın tam inçe yuvarlanır; araç bu yuvarlanmış hâli ve onun santimetre karşılığını ayrıca verir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 – 5′10″ kaç cm:</strong> 5 × 12 + 10 = 70 inç. 70 × 2,54 = 177,8 cm, yani 1,778 metre.',
      '<strong>Örnek 2 – 180 cm kaç feet:</strong> 180 ÷ 2,54 = 70,87 inç. 70,87 ÷ 12 işleminin tam kısmı 5\'tir; 5 × 12 = 60 inç çıkarılınca 10,87 inç kalır. Sonuç 5 ft 10,87 inçtir. En yakın tam inç 71 olduğundan forma 5′11″ yazılır; bu yazımın tam karşılığı 180,34 cm\'dir.',
      '<strong>Örnek 3 – 6 feet kaç cm:</strong> 6 × 12 = 72 inç, 72 × 2,54 = 182,88 cm. "Altı feet" sınırı İngilizce konuşulan ülkelerde uzun boy için sık anılan bir eşiktir ve yaklaşık 183 santimetreye denk gelir.',
      '<strong>Örnek 4 – 170 cm:</strong> 170 ÷ 2,54 = 66,93 inç, yani 5 ft 6,93 inç. Tam inçe yuvarlandığında 5′7″ olur.',
    ] },
    { h: 'Bu çeviriye ne zaman ihtiyaç duyulur?', ul: [
      '<strong>Vize ve başvuru formları:</strong> Bazı ülkelerin vize, ehliyet ya da kimlik başvuru formlarında boy feet ve inç olarak istenir.',
      '<strong>Sporcu profilleri:</strong> Basketbol, Amerikan futbolu ve boks gibi sporlarda oyuncu boyları İngilizce kaynaklarda feet-inç ile verilir. 6′8″ boyundaki bir oyuncu 203,2 cm\'dir.',
      '<strong>Yurt dışından giyim ve ekipman alışverişi:</strong> Beden tabloları, bisiklet kadro boyu önerileri, kayak ve sörf tahtası seçim rehberleri kullanıcı boyunu feet-inç olarak sorabilir.',
      '<strong>Sağlık ve spor uygulamaları:</strong> Yabancı dildeki bazı uygulama ve cihazlar boyu yalnızca feet-inç olarak kabul eder.',
      '<strong>Dizi, film ve kitap çevirileri:</strong> Karakter tanımlarındaki boy bilgisini okuyucunun anlayacağı santimetreye çevirmek gerekir.',
    ] },
    { h: 'Sık görülen boyların karşılıkları', ul: [
      '<strong>5′0″</strong> = 152,4 cm',
      '<strong>5′2″</strong> = 157,48 cm',
      '<strong>5′4″</strong> = 162,56 cm',
      '<strong>5′6″</strong> = 167,64 cm',
      '<strong>5′8″</strong> = 172,72 cm',
      '<strong>5′10″</strong> = 177,8 cm',
      '<strong>6′0″</strong> = 182,88 cm',
      '<strong>6′2″</strong> = 187,96 cm',
      '<strong>6′4″</strong> = 193,04 cm',
      '<strong>6′6″</strong> = 198,12 cm',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'En yaygın hata, ondalıklı feet değerini feet-inç sanmaktır. 5,5 feet, 5′5″ değil 5′6″tir; çünkü yarım feet 6 inç eder. Tersine 5′5″ ise 5,4167 feettir. İkinci hata, inç alanına 12 ya da daha büyük bir değer yazmaktır: 5 feet 12 inç diye bir yazım yoktur, bu boy 6′0″ olarak ifade edilir. Araç bu durumda sizi uyarır.',
      'Yuvarlama da dikkat ister. Bir inç 2,54 cm olduğundan, tam inçe yuvarlanmış bir boy gerçek değerden 1,27 santimetreye kadar farklı olabilir. Bu nedenle feet-inç olarak verilmiş bir boyu santimetreye çevirdiğinizde çıkan küsuratlı sayı, o kişinin boyunun o hassasiyetle ölçüldüğü anlamına gelmez.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç boy ölçüsü için tasarlanmıştır: feet alanı 0–9 arasında tam sayı, inç alanı 12\'den küçük bir değer, santimetre alanı en fazla 300 kabul eder. Daha uzun mesafeler için metre feet çeviricisini kullanın. Boyun doğru ölçülmesi için ayakkabısız, sırt düz bir duvara dayalı ve baş karşıya bakar durumda ölçüm alınması önerilir; sonuçlar bilgilendirme amaçlıdır.',
    ] },
  ],
  faq: [
    ['5 feet 10 inç kaç santimetredir?', '5 feet 10 inç 177,8 santimetredir. Hesap: 5 × 12 + 10 = 70 inç, 70 × 2,54 = 177,8 cm.'],
    ['180 cm kaç feet kaç inçtir?', '180 cm, 5 feet 10,87 inçtir. Formlarda tam inç yazıldığı için bu boy 5′11″ olarak ifade edilir.'],
    ['6 feet kaç cm eder?', '6 feet 182,88 santimetredir; gündelik kullanımda 183 cm olarak yuvarlanır.'],
    ['1,75 boy kaç feettir?', '175 cm, 5 feet 8,9 inç eder ve 5′9″ olarak yazılır. Araca metre değil santimetre girmeniz gerekir; 1,75 metre için 175 yazın.'],
    ['5′7″ yazımındaki işaretler ne anlama gelir?', 'Tek tırnak (′) feet, çift tırnak (″) inç demektir. 5′7″, beş feet yedi inç olarak okunur ve 170,18 santimetreye karşılık gelir.'],
    ['İnç alanına ondalıklı değer yazabilir miyim?', 'Evet. Örneğin 5 feet 5,5 inç yazabilirsiniz; bu boy 166,37 cm eder. Feet alanı ise tam sayı olmalıdır; ondalıklı feet değeriniz varsa metre feet çeviricisini kullanın.'],
    ['Feet-inç boyumu santimetreye çevirince neden küsuratlı çıkıyor?', 'Çünkü bir inç 2,54 santimetredir ve tam inç değerleri santimetrede küsuratlı sayılara denk gelir. Belgelerde genellikle en yakın tam santimetre yazılır; 177,8 cm için 178 cm kullanılabilir.'],
    ['Boy bilgim kaydediliyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda yapılır; girdiğiniz boy bilgisi hiçbir sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['cm-inc-cevir', 'metre-feet-cevir', 'kg-pound-cevir', 'bel-boy-orani-hesapla', 'ayakkabi-numarasi-donustur', 'metre-santimetre-cevir'],
};
