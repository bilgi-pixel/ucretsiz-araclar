export default {
  slug: 'sinus-teoremi-hesapla',
  title: 'Sinüs Teoremi Hesaplama',
  h1Tail: 'kenar ve açı bulma',
  pageTitle: 'Sinüs Teoremi Hesaplama – Üçgende Bilinmeyen Kenar ve Açı',
  description: 'Sinüs teoremiyle üçgenin bilinmeyen kenar ve açılarını bulun. İki açı bir kenar ya da iki kenar bir açı girin; belirsiz durumdaki iki çözümü de gösterir.',
  card: 'İki açı ve bir kenardan ya da iki kenar ve bir açıdan üçgeni sinüs teoremiyle çözün; iki çözümlü durum dahil.',
  category: 'matematik',
  keywords: ['sinüs teoremi', 'sinüs teoremi hesaplama', 'üçgen çözme', 'bilinmeyen kenar bulma', 'çevrel çember yarıçapı', 'sinüs kuralı', 'iki açı bir kenar', 'belirsiz durum üçgen'],
  lead: 'Sinüs teoremi, bir üçgende her kenarın karşısındaki açının sinüsüne oranının sabit olduğunu söyler. Bu araç <strong>iki açı ve bir kenar</strong> ya da <strong>iki kenar ve birinin karşısındaki açı</strong> bilgisinden kalan kenar ve açıları, alanı ve çevrel çemberin yarıçapını hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'mod', label: 'Bilinenler', type: 'select', wide: true, options: [['aak', 'İki açı ve bir kenar (A, B ve a)'], ['kka', 'İki kenar ve birinin karşısındaki açı (a, b ve A)']] },
    { id: 'kenarA', label: 'a kenarı', type: 'number', placeholder: 'Örn. 10' },
    { id: 'aciA', label: 'A açısı (derece)', type: 'number', placeholder: 'Örn. 30', hint: 'a kenarının karşısındaki açı.' },
    { id: 'aciB', label: 'B açısı (derece)', type: 'number', placeholder: 'Örn. 45', hint: 'Yalnızca "iki açı ve bir kenar" seçiliyken doldurun.' },
    { id: 'kenarB', label: 'b kenarı', type: 'number', placeholder: 'Örn. 7', hint: 'Yalnızca "iki kenar ve bir açı" seçiliyken doldurun.' },
  ],
  compute(v, h) {
    const R = Math.PI / 180, sin = (x) => Math.sin(x * R);
    const d = (x) => h.fmt(x, 4) + '°', u = (x) => h.fmt(x, 4) + ' birim', al = (x) => h.fmt(x, 4) + ' birim²';
    const a = h.pos(v.kenarA, 'a kenarı');
    const A = h.pos(v.aciA, 'A açısı');
    if (A >= 180) h.err('A açısı 0° ile 180° arasında olmalıdır.');
    const cap = a / (2 * sin(A));
    if (v.mod !== 'kka') {
      const B = h.pos(v.aciB, 'B açısı');
      if (A + B >= 180 - 1e-9) h.err(`A ve B açılarının toplamı 180°\'den küçük olmalı (şu an ${h.fmt(A + B, 4)}°); aksi hâlde üçüncü açıya yer kalmaz.`);
      const C = 180 - A - B, b = a * sin(B) / sin(A), c = a * sin(C) / sin(A);
      return {
        rows: [
          ['b kenarı', u(b)], ['c kenarı', u(c)], ['C açısı', d(C)],
          ['Çevre', u(a + b + c)], ['Alan', al(0.5 * a * b * sin(C))],
          ['Çevrel çember yarıçapı (R)', u(cap)],
        ],
        note: 'a / sin A = b / sin B = c / sin C = 2R. Sonuçlar, a kenarını yazdığınız uzunluk birimindedir.',
      };
    }
    const b = h.pos(v.kenarB, 'b kenarı');
    const sB = b * sin(A) / a;
    if (sB > 1 + 1e-12) h.err(`Bu ölçülerle üçgen oluşmaz: sin B = ${h.fmt(sB, 4)} çıkıyor ve sinüs 1\'den büyük olamaz. a kenarı, karşısındaki açıya göre çok kısa; değerleri kontrol edin.`);
    const B1 = Math.abs(sB - 1) < 1e-12 ? 90 : Math.asin(Math.min(1, sB)) / R;
    const aday = B1 === 90 ? [90] : [B1, 180 - B1];
    const coz = aday.filter((B) => A + B < 180 - 1e-9).map((B) => { const C = 180 - A - B; const c = a * sin(C) / sin(A); return { B, C, c, alan: 0.5 * a * b * sin(C) }; });
    if (!coz.length) h.err('Bu ölçülerle üçgen oluşmaz: A açısı dik ya da geniş olduğunda karşısındaki a kenarı b kenarından uzun olmalıdır.');
    const rows = [
      ['B açısı', d(coz[0].B)], ['C açısı', d(coz[0].C)], ['c kenarı', u(coz[0].c)], ['Alan', al(coz[0].alan)],
      ['Çevrel çember yarıçapı (R)', u(cap)],
      ['Çözüm sayısı', coz.length === 2 ? '2 (belirsiz durum)' : '1'],
    ];
    if (coz.length === 2) rows.push(['2. çözüm: B açısı', d(coz[1].B)], ['2. çözüm: C açısı', d(coz[1].C)], ['2. çözüm: c kenarı', u(coz[1].c)], ['2. çözüm: Alan', al(coz[1].alan)]);
    return {
      rows,
      note: coz.length === 2 ? 'Verilen ölçüler iki farklı üçgene uyuyor: B açısı dar da olabilir, geniş de. Hangisinin geçerli olduğunu sorudaki ek bilgi (şekil, açının türü) belirler.' : 'Verilen ölçülere uyan tek bir üçgen vardır.',
    };
  },
  cases: [
    { in: { mod: 'aak', kenarA: '10', aciA: '30', aciB: '45' }, out: { 'b kenarı': '14,1421 birim', 'c kenarı': '19,3185 birim', 'C açısı': '105°', 'Alan': '68,3013 birim²', 'Çevrel çember yarıçapı (R)': '10 birim' } },
    { in: { mod: 'kka', kenarA: '7', kenarB: '10', aciA: '30' }, out: { 'B açısı': '45,5847°', 'C açısı': '104,4153°', 'c kenarı': '13,5592 birim', 'Çözüm sayısı': '2 (belirsiz durum)', '2. çözüm: B açısı': '134,4153°', '2. çözüm: C açısı': '15,5847°', '2. çözüm: c kenarı': '3,7613 birim', '2. çözüm: Alan': '9,4032 birim²' } },
    { in: { mod: 'aak', kenarA: '5', aciA: '30', aciB: '60' }, out: { 'b kenarı': '8,6603 birim', 'c kenarı': '10 birim', 'C açısı': '90°', 'Alan': '21,6506 birim²' } },
    { in: { mod: 'aak', kenarA: '6', aciA: '60', aciB: '60' }, out: { 'b kenarı': '6 birim', 'c kenarı': '6 birim', 'Çevre': '18 birim', 'Alan': '15,5885 birim²', 'Çevrel çember yarıçapı (R)': '3,4641 birim' } },
    { in: { mod: 'kka', kenarA: '10', kenarB: '10', aciA: '40' }, out: { 'B açısı': '40°', 'C açısı': '100°', 'c kenarı': '15,3209 birim', 'Çözüm sayısı': '1' } },
    { in: { mod: 'kka', kenarA: '10', kenarB: '5', aciA: '30' }, out: { 'B açısı': '14,4775°', 'C açısı': '135,5225°', 'c kenarı': '14,0126 birim', 'Çözüm sayısı': '1' } },
    { in: { mod: 'kka', kenarA: '5', kenarB: '10', aciA: '30' }, out: { 'B açısı': '90°', 'C açısı': '60°', 'c kenarı': '8,6603 birim', 'Alan': '21,6506 birim²', 'Çözüm sayısı': '1' } },
    { in: { mod: 'kka', kenarA: '3', kenarB: '10', aciA: '30' }, error: true },
    { in: { mod: 'aak', kenarA: '10', aciA: '100', aciB: '90' }, error: true },
    { in: { mod: 'kka', kenarA: '5', kenarB: '10', aciA: '120' }, error: true },
    { in: { mod: 'aak', kenarA: 'abc', aciA: '30', aciB: '45' }, error: true },
  ],
  howto: [
    '"Bilinenler" listesinden elinizdeki verilere uyan durumu seçin: iki açı ve bir kenar ya da iki kenar ve bunlardan birinin karşısındaki açı.',
    'a kenarını ve onun karşısındaki A açısını yazın. Bu çift her iki durumda da gereklidir, çünkü oranı belirleyen odur.',
    'Birinci durumda B açısını, ikinci durumda b kenarını doldurun; kullanılmayan alan boş kalabilir.',
    '"Hesapla" düğmesine basın. Kalan kenar ve açılar, alan ve çevrel çember yarıçapı listelenir.',
    'İki kenar ve bir açı girdiyseniz "Çözüm sayısı" satırına bakın; 2 yazıyorsa ikinci üçgenin değerleri alt satırlarda verilir.',
  ],
  sections: [
    { h: 'Sinüs teoremi nedir?', p: [
      'Herhangi bir üçgende bir kenarın uzunluğunun, o kenarın karşısındaki açının sinüsüne oranı üç kenar için de aynıdır: <strong>a ÷ sin A = b ÷ sin B = c ÷ sin C = 2R</strong>. Buradaki R, üçgenin üç köşesinden geçen çevrel çemberin yarıçapıdır. Yani bu ortak oran aynı zamanda çevrel çemberin çapına eşittir.',
      'Teoremin sezgisel anlamı şudur: büyük açının karşısında uzun kenar, küçük açının karşısında kısa kenar bulunur ve bu ilişki açının kendisiyle değil sinüsüyle orantılıdır. Bir kenar ile karşısındaki açıyı birlikte biliyorsanız oranı bulmuş olursunuz; ondan sonra bildiğiniz her açı size karşısındaki kenarı, bildiğiniz her kenar da karşısındaki açının sinüsünü verir.',
    ] },
    { h: 'İki açı ve bir kenar: çözümlü örnek', p: [
      'a = 10, A = 30° ve B = 45° olsun. Önce üçüncü açı bulunur: C = 180 − 30 − 45 = 105°. Ortak oran a ÷ sin A = 10 ÷ 0,5 = 20\'dir; bu aynı zamanda 2R olduğundan çevrel çemberin yarıçapı R = 10 birimdir.',
      'Ardından kenarlar oranla çarpılarak elde edilir: b = 20 · sin 45° ≈ 14,1421 ve c = 20 · sin 105° ≈ 19,3185. Alan ½·a·b·sin C ≈ 68,3013 birimkaredir. Bu durumda çözüm her zaman tektir; iki açı üçgenin biçimini, kenar da ölçeğini kesin olarak belirler.',
    ] },
    { h: 'İki kenar ve bir açı: belirsiz durum', p: [
      'Verilen açı bilinen iki kenarın arasında değil de birinin karşısındaysa durum incelik ister. Formül sin B = b · sin A ÷ a değerini verir; ancak 0° ile 180° arasında aynı sinüse sahip iki açı vardır: B ve 180° − B. Her ikisi de geçerli bir üçgen oluşturabiliyorsa <strong>iki farklı çözüm</strong> ortaya çıkar. Buna belirsiz durum denir.',
      '<strong>Örnek:</strong> a = 7, b = 10 ve A = 30° için sin B = 10 · 0,5 ÷ 7 ≈ 0,7143 bulunur. Birinci çözümde B ≈ 45,5847°, C ≈ 104,4153° ve c ≈ 13,5592 olur. İkinci çözümde B ≈ 134,4153°, C ≈ 15,5847° ve c ≈ 3,7613 çıkar. İki üçgen de verilen üç ölçüyü sağlar.',
    ], ul: [
      '<strong>sin B > 1</strong> çıkarsa üçgen yoktur; a kenarı karşı kenara "yetişmez". Örnek: a = 3, b = 10, A = 30°.',
      '<strong>sin B = 1</strong> ise tek çözüm vardır ve üçgen diktir. Örnek: a = 5, b = 10, A = 30° için B = 90°.',
      '<strong>a ≥ b</strong> ise tek çözüm vardır; B açısı A\'dan büyük olamayacağı için geniş seçenek elenir.',
      '<strong>a < b ve sin B < 1</strong> ise (A dar açıyken) iki çözüm vardır.',
      '<strong>A dik ya da geniş açıysa</strong> a kenarı b\'den uzun olmalıdır; değilse üçgen oluşmaz.',
    ] },
    { h: 'Çevrel çember ve alan bağlantısı', p: [
      'Sinüs teoremindeki 2R sabiti pratik sonuçlar doğurur. Bir kenarı ve karşısındaki açıyı bildiğiniz anda çevrel çemberin yarıçapını R = a ÷ (2·sin A) ile bulursunuz. Kenarı 6 birim olan eşkenar üçgende R = 6 ÷ (2 · sin 60°) ≈ 3,4641 birimdir. Dik üçgende hipotenüsün karşısındaki açı 90° ve sin 90° = 1 olduğundan hipotenüs çevrel çemberin çapına eşittir.',
      'Alan için de sinüs kullanılır: iki kenar ve aralarındaki açı bilindiğinde alan = ½ · a · b · sin C olur. Araç bu formülü uygular; isterseniz sonucu taban-yükseklik yöntemiyle sağlayabilirsiniz.',
    ] },
    { h: 'Nerelerde kullanılır?', p: [
      'Haritacılıkta üçgenleme yöntemi sinüs teoremine dayanır: aralarındaki uzaklık bilinen iki noktadan uzaktaki bir hedefe bakış açıları ölçülür ve hedefin her iki noktaya uzaklığı hesaplanır. Karşı kıyıdaki bir ağacın ya da ulaşılamayan bir tepenin uzaklığı bu yolla bulunur. Denizcilikte iki fenerden alınan kerterizlerle konum belirleme aynı mantıktır.',
      'Fizikte dengede duran bir cisme etkiyen üç kuvvet kapalı bir üçgen oluşturur ve kuvvetlerin büyüklükleri karşılarındaki açıların sinüsleriyle orantılıdır (Lami teoremi). Lise geometrisinde ise çevrel çember yarıçapı soruları doğrudan a ÷ sin A = 2R eşitliğiyle çözülür.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En yaygın hata kenar ile karşısındaki açıyı yanlış eşleştirmektir: a kenarı A köşesine bitişik değil, A köşesinin <strong>karşısındadır</strong>. İkincisi, iki kenar ve bir açı durumunda ikinci çözümü gözden kaçırmaktır; hesap makinesi arcsin için yalnızca dar açıyı verir. Üçüncüsü, iki kenar ve <em>aralarındaki</em> açı bilindiğinde sinüs teoremini kullanmaya çalışmaktır; o durumda kosinüs teoremi gerekir.',
      'Açılar derece olarak girilmelidir ve her biri 0° ile 180° arasında olmalıdır. Sonuçlar dört ondalık basamağa yuvarlanır. Arazi ve yapı ölçümlerinde açı ölçümündeki küçük hatalar uzun mesafelerde büyüyebilir; sonuçlar bilgilendirme amaçlıdır ve resmî ölçüm yerine geçmez.',
    ] },
  ],
  faq: [
    ['Sinüs teoremi formülü nedir?', 'a ÷ sin A = b ÷ sin B = c ÷ sin C = 2R. Her kenarın karşısındaki açının sinüsüne oranı eşittir ve bu oran çevrel çemberin çapını verir.'],
    ['Sinüs teoremi ne zaman kullanılır?', 'Bir kenar ile karşısındaki açı çift olarak bilindiğinde kullanılır: iki açı ve bir kenar ya da iki kenar ve bunlardan birinin karşısındaki açı verildiğinde. İki kenar ve aradaki açı ya da üç kenar verildiyse kosinüs teoremi uygundur.'],
    ['Neden bazen iki çözüm çıkıyor?', 'Çünkü B ile 180° − B açılarının sinüsü aynıdır. İki kenar ve birinin karşısındaki açı verildiğinde, a kenarı b kenarından kısaysa hem dar hem geniş B açısı geçerli bir üçgen oluşturabilir.'],
    ['Çevrel çemberin yarıçapı nasıl bulunur?', 'R = a ÷ (2 · sin A) formülüyle bulunur. Örneğin a = 10 ve A = 30° ise R = 10 ÷ (2 · 0,5) = 10 birimdir.'],
    ['"Üçgen oluşmaz" uyarısı ne anlama gelir?', 'Girdiğiniz ölçülerle sin B değeri 1\'den büyük çıkıyor ya da açıların toplamı 180°\'yi aşıyor demektir. Bu ölçülere sahip bir üçgen çizilemez; kenar ve açı eşleşmesini ve değerleri kontrol edin.'],
    ['Sinüs teoremi dik üçgende geçerli midir?', 'Evet, her üçgende geçerlidir. Dik üçgende C = 90° alındığında sin C = 1 olur ve a ÷ sin A = c eşitliği, sin A = karşı ÷ hipotenüs tanımına dönüşür.'],
    ['Kenarları hangi birimle yazmalıyım?', 'İstediğiniz uzunluk birimini kullanabilirsiniz; yeter ki bütün kenarlar aynı birimde olsun. Sonuçtaki "birim" sözcüğü sizin kullandığınız birimi, "birim²" onun karesini ifade eder.'],
    ['Girdiğim ölçüler kaydediliyor mu?', 'Hayır. Bütün hesap tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['kosinus-teoremi-hesapla', 'ucgen-acisi-hesapla', 'sinus-hesapla', 'dik-ucgen-hesapla', 'ucgen-alani-hesapla', 'ters-trigonometri-hesapla'],
};
