export default {
  slug: 'dik-ucgen-hesapla',
  title: 'Dik Üçgen Hesaplama',
  h1Tail: 'kenar, açı, alan',
  pageTitle: 'Dik Üçgen Hesaplama – Hipotenüs, Kenar, Açı ve Alan Bulma',
  description: 'Dik üçgenin iki bilgisini girin; hipotenüsü, dik kenarları, dar açıları, alanı, çevreyi ve hipotenüse ait yüksekliği Pisagor ve trigonometriyle hesaplayın.',
  card: 'İki kenar ya da bir kenar ve bir açıdan dik üçgenin hipotenüsünü, açılarını, alanını ve çevresini hesaplayın.',
  category: 'matematik',
  keywords: ['dik üçgen hesaplama', 'hipotenüs hesaplama', 'pisagor hesaplama', 'dik üçgen açı bulma', 'dik kenar bulma', 'dik üçgen alanı', '3 4 5 üçgeni', 'hipotenüse ait yükseklik'],
  lead: 'Bir dik üçgeni çözmek için iki bilgi yeterlidir: iki kenar ya da bir kenar ile bir dar açı. Araç eksik kenarları <strong>Pisagor bağıntısı</strong> ve trigonometrik oranlarla bulur; açıları, alanı, çevreyi ve hipotenüse ait yüksekliği birlikte verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'bilinen', label: 'Bilinenler', type: 'select', wide: true, options: [['kk', 'İki dik kenar (a ve b)'], ['kh', 'Bir dik kenar ve hipotenüs (a ve c)'], ['ka', 'Dik kenar a ve karşısındaki A açısı'], ['ha', 'Hipotenüs c ve A açısı']] },
    { id: 'deger1', label: 'Birinci değer', type: 'number', placeholder: 'Örn. 3', hint: 'Seçime göre: a dik kenarı ya da (son seçenekte) hipotenüs.' },
    { id: 'deger2', label: 'İkinci değer', type: 'number', placeholder: 'Örn. 4', hint: 'Seçime göre: b dik kenarı, hipotenüs ya da derece olarak A açısı.' },
  ],
  compute(v, h) {
    const R = Math.PI / 180;
    const m = ['kk', 'kh', 'ka', 'ha'].includes(v.bilinen) ? v.bilinen : 'kk';
    let a, b, c, A;
    if (m === 'kk') {
      a = h.pos(v.deger1, 'a dik kenarı'); b = h.pos(v.deger2, 'b dik kenarı');
      c = Math.hypot(a, b); A = Math.atan2(a, b) / R;
    } else if (m === 'kh') {
      a = h.pos(v.deger1, 'a dik kenarı'); c = h.pos(v.deger2, 'Hipotenüs');
      if (a >= c) h.err('Hipotenüs dik kenardan uzun olmalıdır; dik üçgenin en uzun kenarı hipotenüstür. Değerlerin sırasını kontrol edin.');
      b = Math.sqrt(c * c - a * a); A = Math.atan2(a, b) / R;
    } else {
      const x = h.pos(v.deger1, m === 'ka' ? 'a dik kenarı' : 'Hipotenüs');
      A = h.pos(v.deger2, 'A açısı');
      if (A >= 90) h.err('A açısı 0° ile 90° arasında olmalıdır; dik üçgende dik açı dışındaki iki açı dardır.');
      if (m === 'ka') { a = x; c = a / Math.sin(A * R); b = a / Math.tan(A * R); }
      else { c = x; a = c * Math.sin(A * R); b = c * Math.cos(A * R); }
    }
    const u = (x) => h.fmt(x, 4) + ' birim', d = (x) => h.fmt(x, 4) + '°';
    return {
      rows: [
        ['Hipotenüs (c)', u(c)],
        ['Dik kenar (a)', u(a)],
        ['Dik kenar (b)', u(b)],
        ['A açısı', d(A)],
        ['B açısı', d(90 - A)],
        ['Alan', h.fmt(a * b / 2, 4) + ' birim²'],
        ['Çevre', u(a + b + c)],
        ['Hipotenüse ait yükseklik', u(a * b / c)],
      ],
      note: 'A açısı a kenarının, B açısı b kenarının karşısındadır; C açısı 90°\'dir. Sonuçlar dört ondalık basamağa yuvarlanır.',
    };
  },
  cases: [
    { in: { bilinen: 'kk', deger1: '3', deger2: '4' }, out: { 'Hipotenüs (c)': '5 birim', 'A açısı': '36,8699°', 'B açısı': '53,1301°', 'Alan': '6 birim²', 'Çevre': '12 birim', 'Hipotenüse ait yükseklik': '2,4 birim' } },
    { in: { bilinen: 'kh', deger1: '5', deger2: '13' }, out: { 'Dik kenar (b)': '12 birim', 'Alan': '30 birim²', 'Çevre': '30 birim', 'A açısı': '22,6199°', 'Hipotenüse ait yükseklik': '4,6154 birim' } },
    { in: { bilinen: 'ha', deger1: '10', deger2: '30' }, out: { 'Dik kenar (a)': '5 birim', 'Dik kenar (b)': '8,6603 birim', 'B açısı': '60°', 'Alan': '21,6506 birim²', 'Hipotenüse ait yükseklik': '4,3301 birim' } },
    { in: { bilinen: 'ka', deger1: '1', deger2: '30' }, out: { 'Hipotenüs (c)': '2 birim', 'Dik kenar (b)': '1,7321 birim' } },
    { in: { bilinen: 'kk', deger1: '1', deger2: '1' }, out: { 'Hipotenüs (c)': '1,4142 birim', 'A açısı': '45°', 'B açısı': '45°', 'Hipotenüse ait yükseklik': '0,7071 birim' } },
    { in: { bilinen: 'kk', deger1: '8', deger2: '15' }, out: { 'Hipotenüs (c)': '17 birim', 'A açısı': '28,0725°', 'Alan': '60 birim²', 'Hipotenüse ait yükseklik': '7,0588 birim' } },
    { in: { bilinen: 'ka', deger1: '6', deger2: '35' }, out: { 'Dik kenar (b)': '8,5689 birim', 'Hipotenüs (c)': '10,4607 birim', 'B açısı': '55°' } },
    { in: { bilinen: 'kh', deger1: '13', deger2: '5' }, error: true },
    { in: { bilinen: 'ka', deger1: '5', deger2: '90' }, error: true },
    { in: { bilinen: 'kk', deger1: '0', deger2: '4' }, error: true },
    { in: { bilinen: 'kk', deger1: 'abc', deger2: '4' }, error: true },
  ],
  howto: [
    '"Bilinenler" listesinden elinizdeki iki bilgiyi seçin: iki dik kenar, bir dik kenar ve hipotenüs, bir dik kenar ve karşısındaki açı ya da hipotenüs ve bir dar açı.',
    'Değerleri seçenekte yazan sırayla iki alana girin. Örneğin "Bir dik kenar ve hipotenüs" için önce dik kenarı, sonra hipotenüsü yazın.',
    'Açı gereken seçeneklerde açıyı derece olarak ve 0 ile 90 arasında girin.',
    '"Hesapla" düğmesine basın; üç kenar, iki dar açı, alan, çevre ve hipotenüse ait yükseklik birlikte listelenir.',
  ],
  sections: [
    { h: 'Dik üçgen ve Pisagor bağıntısı', p: [
      'Bir açısı 90° olan üçgene dik üçgen denir. Dik açıyı oluşturan iki kenar <strong>dik kenar</strong>, dik açının karşısındaki en uzun kenar ise <strong>hipotenüs</strong> adını alır. Pisagor bağıntısına göre dik kenarların karelerinin toplamı hipotenüsün karesine eşittir: <strong>a² + b² = c²</strong>.',
      'İki kenar bilindiğinde üçüncüsü bu eşitlikten bulunur. Hipotenüs aranıyorsa c = √(a² + b²), bir dik kenar aranıyorsa b = √(c² − a²) kullanılır. İkinci formülde çıkarma olduğuna dikkat edin; hipotenüsün karesinden dik kenarın karesi çıkarılır, toplanmaz.',
    ] },
    { h: 'Trigonometrik oranlarla çözüm', p: [
      'Bir kenar ve bir dar açı bilindiğinde sinüs, kosinüs ve tanjant devreye girer. A açısının karşısındaki kenar a, komşu dik kenar b ve hipotenüs c olmak üzere sin A = a ÷ c, cos A = b ÷ c ve tan A = a ÷ b eşitlikleri geçerlidir.',
    ], ul: [
      'Dik kenar a ve A açısı biliniyorsa: c = a ÷ sin A, b = a ÷ tan A',
      'Hipotenüs c ve A açısı biliniyorsa: a = c · sin A, b = c · cos A',
      'İki kenar biliniyorsa açı: A = arctan(a ÷ b), diğer dar açı B = 90° − A',
      'Alan = a · b ÷ 2, çevre = a + b + c, hipotenüse ait yükseklik = a · b ÷ c',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>İki dik kenar:</strong> a = 3 ve b = 4 ise c = √(9 + 16) = √25 = 5 olur. A açısı arctan(3 ÷ 4) ≈ 36,8699°, B açısı 53,1301°\'dir. Alan 3 · 4 ÷ 2 = 6, çevre 12 ve hipotenüse ait yükseklik 3 · 4 ÷ 5 = 2,4 birimdir.',
      '<strong>Dik kenar ve hipotenüs:</strong> a = 5 ve c = 13 ise b = √(169 − 25) = √144 = 12 bulunur. Alan 30 birimkare, çevre 30 birimdir.',
      '<strong>Hipotenüs ve açı:</strong> c = 10 ve A = 30° ise a = 10 · sin 30° = 5, b = 10 · cos 30° ≈ 8,6603 çıkar. 30°\'nin karşısındaki kenarın hipotenüsün yarısı olması 30-60-90 üçgeninin bilinen özelliğidir.',
      '<strong>Dik kenar ve açı:</strong> Bir direğe 35° açıyla bakan ve direğin tepesi göz hizasından 6 metre yukarıda olan biri için a = 6, A = 35° alınır. Yatay uzaklık b = 6 ÷ tan 35° ≈ 8,5689 metre, bakış doğrultusunun uzunluğu c ≈ 10,4607 metredir.',
    ] },
    { h: 'Özel dik üçgenler ve Pisagor üçlüleri', p: [
      'Kenar uzunlukları tam sayı olan dik üçgenlere Pisagor üçlüsü denir. Bu üçlülerin katları da dik üçgen verir; 3-4-5 üçgeninin iki katı 6-8-10\'dur. Sınavlarda ve şantiyede zaman kazandırdıkları için ezbere bilinmeleri yararlıdır.',
    ], ul: [
      '<strong>3 – 4 – 5</strong> (katları: 6-8-10, 9-12-15, 12-16-20)',
      '<strong>5 – 12 – 13</strong>',
      '<strong>8 – 15 – 17</strong>',
      '<strong>7 – 24 – 25</strong>',
      '<strong>20 – 21 – 29</strong>',
      '<strong>45-45-90 üçgeni:</strong> dik kenarlar eşit, hipotenüs dik kenarın √2 katı (yaklaşık 1,4142)',
      '<strong>30-60-90 üçgeni:</strong> 30° karşısı hipotenüsün yarısı, 60° karşısı bunun √3 katı (yaklaşık 1,7321)',
    ] },
    { h: 'Günlük kullanım örnekleri', p: [
      'İnşaatta bir köşenin tam dik olup olmadığı 3-4-5 yöntemiyle denetlenir: köşeden bir yöne 3 metre, diğer yöne 4 metre işaretlenir; iki işaret arası tam 5 metre ise köşe 90°\'dir. Aynı yöntem 60-80-100 santimetre gibi katlarla da uygulanır.',
      'Duvara dayanan merdivenin ulaşacağı yükseklik, bir çatının mertek boyu, rampanın uzunluğu ve ekranların köşegeni dik üçgen hesabıdır. 3 metre yüksekliğe çıkacak ve ayağı duvardan 1 metre açıkta duracak bir merdivenin boyu √(9 + 1) ≈ 3,16 metre olmalıdır. Bu tür işlerde sonuç bilgilendirme amaçlıdır; taşıyıcı sistem, iskele ve güvenlik gerektiren uygulamalarda ilgili standartlara ve uzman hesabına başvurulmalıdır.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'Hipotenüsü dik kenar gibi kullanmak en yaygın yanlıştır: hipotenüs ve bir dik kenar verildiğinde kareler toplanmaz, çıkarılır. Araç, hipotenüs dik kenardan kısa ya da ona eşit girildiğinde uyarı verir. İkinci hata, açının karşısındaki kenar ile komşu kenarı karıştırmaktır; a kenarı her zaman A açısının karşısındadır.',
      'Dar açılar 0° ile 90° arasında olmalıdır. Kenarların hepsi aynı uzunluk biriminde girilmelidir; sonuçtaki "birim" sizin kullandığınız birimi gösterir. Açı çok küçük ya da 90°\'ye çok yakın olduğunda kenarlardan biri diğerine göre çok büyük çıkar; bu durumda ölçüm hatasının sonuca etkisi de büyür.',
    ] },
  ],
  faq: [
    ['Hipotenüs nasıl hesaplanır?', 'Dik kenarların kareleri toplanır ve karekökü alınır: c = √(a² + b²). Dik kenarlar 3 ve 4 ise hipotenüs √(9 + 16) = 5\'tir.'],
    ['Hipotenüs ve bir dik kenar biliniyorsa diğer kenar nasıl bulunur?', 'Hipotenüsün karesinden bilinen dik kenarın karesi çıkarılır ve karekök alınır: b = √(c² − a²). Hipotenüs 13, dik kenar 5 ise diğer dik kenar √(169 − 25) = 12\'dir.'],
    ['Dik üçgenin açıları kenarlardan nasıl bulunur?', 'Dik kenarların oranının ters tanjantı alınır: A = arctan(a ÷ b). Diğer dar açı 90° − A\'dır. 3-4-5 üçgeninde açılar yaklaşık 36,87° ve 53,13°\'dir.'],
    ['Dik üçgenin alanı nasıl hesaplanır?', 'Dik kenarlar birbirine dik olduğundan biri taban, diğeri yükseklik sayılır: alan = a · b ÷ 2. Dik kenarları 5 ve 12 olan üçgenin alanı 30 birimkaredir.'],
    ['Hipotenüse ait yükseklik nedir?', 'Dik açının bulunduğu köşeden hipotenüse indirilen dikmedir ve a · b ÷ c ile hesaplanır. 3-4-5 üçgeninde bu yükseklik 12 ÷ 5 = 2,4 birimdir.'],
    ['3-4-5 üçgeni neden özeldir?', 'Kenarları tam sayı olan en küçük dik üçgendir: 3² + 4² = 9 + 16 = 25 = 5². Bu sayede ölçü aleti olmadan dik açı oluşturmak için kullanılır.'],
    ['Yalnızca açılar bilinirse kenarlar bulunabilir mi?', 'Hayır. Açılar üçgenin biçimini verir, büyüklüğünü vermez. Kenar uzunluklarını bulmak için en az bir kenarın bilinmesi gerekir.'],
    ['Yazdığım ölçüler bir yere gönderiliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; girdiğiniz değerler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['ucgen-alani-hesapla', 'kosinus-teoremi-hesapla', 'sinus-teoremi-hesapla', 'ucgen-acisi-hesapla', 'ters-trigonometri-hesapla', 'egim-yuzdesi-hesapla'],
};
