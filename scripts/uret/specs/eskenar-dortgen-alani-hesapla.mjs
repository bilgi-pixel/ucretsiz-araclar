export default {
  slug: 'eskenar-dortgen-alani-hesapla',
  title: 'Eşkenar Dörtgen Alanı Hesaplama',
  h1Tail: 'köşegenler, yükseklik ya da açı ile',
  pageTitle: 'Eşkenar Dörtgen Alanı Hesaplama – Köşegen, Kenar ve Açı ile',
  description: 'Eşkenar dörtgenin alanını köşegenlerden, kenar ve yükseklikten ya da kenar ve açıdan hesaplayın. Kenar, çevre, yükseklik, köşegenler ve dar açı birlikte gösterilir.',
  card: 'Eşkenar dörtgenin (baklava) alanını köşegenlerden, kenar-yükseklikten ya da kenar-açıdan bulun; çevre ve açı da hesaplanır.',
  category: 'matematik',
  keywords: ['eşkenar dörtgen alanı hesaplama', 'eşkenar dörtgenin alanı formülü', 'köşegenler çarpımı bölü 2', 'baklava dilimi alanı', 'eşkenar dörtgen çevresi', 'eşkenar dörtgen kenar bulma', 'eşkenar dörtgen köşegen'],
  lead: `Eşkenar dörtgenin alanını üç farklı veri setinden hesaplayın: <strong>iki köşegen</strong>, <strong>kenar ve yükseklik</strong> ya da <strong>kenar ve bir iç açı</strong>. Hangi yöntemi seçerseniz seçin, araç şeklin geri kalan ölçülerini de tamamlar.`,
  button: 'Hesapla',
  inputs: [
    { id: 'yontem', label: 'Bilinenler', type: 'select', options: [['kosegen', 'İki köşegen'], ['yuk', 'Kenar ve yükseklik'], ['aci', 'Kenar ve iç açı']] },
    { id: 'kosegen1', label: 'Birinci köşegen', type: 'number', placeholder: 'Örn. 6', hint: 'Yalnızca köşegen yönteminde' },
    { id: 'kosegen2', label: 'İkinci köşegen', type: 'number', placeholder: 'Örn. 8' },
    { id: 'kenar', label: 'Kenar', type: 'number', placeholder: 'Örn. 5', hint: 'Yükseklik ve açı yöntemlerinde' },
    { id: 'yukseklik', label: 'Yükseklik', type: 'number', placeholder: 'Örn. 4', hint: 'Karşılıklı iki kenar arasındaki dik uzaklık' },
    { id: 'aci', label: 'İç açı (derece)', type: 'number', placeholder: 'Örn. 60', hint: 'Dar ya da geniş açı yazılabilir' },
  ],
  compute(v, h) {
    let a, d1, d2;
    if (v.yontem === 'yuk') {
      a = h.pos(v.kenar, 'Kenar');
      const y = h.pos(v.yukseklik, 'Yükseklik');
      if (y > a * (1 + 1e-12)) h.err('Yükseklik kenardan uzun olamaz; en fazla kenara eşit olabilir (bu durumda şekil karedir).');
      const t = Math.asin(Math.min(1, y / a));
      d1 = 2 * a * Math.sin(t / 2);
      d2 = 2 * a * Math.cos(t / 2);
    } else if (v.yontem === 'aci') {
      a = h.pos(v.kenar, 'Kenar');
      const aci = h.pos(v.aci, 'İç açı');
      if (aci >= 180) h.err('İç açı 0 ile 180 derece arasında olmalı.');
      const t = aci * Math.PI / 180;
      d1 = 2 * a * Math.sin(t / 2);
      d2 = 2 * a * Math.cos(t / 2);
    } else {
      d1 = h.pos(v.kosegen1, 'Birinci köşegen');
      d2 = h.pos(v.kosegen2, 'İkinci köşegen');
      a = Math.sqrt(d1 * d1 + d2 * d2) / 2;
    }
    const kisa = Math.min(d1, d2);
    const uzun = Math.max(d1, d2);
    const alan = d1 * d2 / 2;
    const dar = 2 * Math.atan2(kisa, uzun) * 180 / Math.PI;
    return {
      rows: [
        ['Alan', h.fmt(alan, 4) + ' birim²'],
        ['Kenar', h.fmt(a, 4) + ' birim'],
        ['Çevre', h.fmt(4 * a, 4) + ' birim'],
        ['Yükseklik', h.fmt(alan / a, 4) + ' birim'],
        ['Kısa köşegen', h.fmt(kisa, 4) + ' birim'],
        ['Uzun köşegen', h.fmt(uzun, 4) + ' birim'],
        ['Dar açı', h.fmt(dar, 2) + '°'],
      ],
      note: 'Alan = köşegenlerin çarpımı ÷ 2 = kenar × yükseklik = kenar² × sin(açı). Dar açı 90° ise şekil karedir.',
    };
  },
  cases: [
    { in: { yontem: 'kosegen', kosegen1: '6', kosegen2: '8' }, out: { 'Alan': '24 birim²', 'Kenar': '5 birim', 'Çevre': '20 birim', 'Yükseklik': '4,8 birim', 'Dar açı': '73,74°' } },
    { in: { yontem: 'aci', kenar: '10', aci: '30' }, out: { 'Alan': '50 birim²', 'Çevre': '40 birim', 'Yükseklik': '5 birim' } },
    { in: { yontem: 'kosegen', kosegen1: '24', kosegen2: '10' }, out: { 'Alan': '120 birim²', 'Kenar': '13 birim', 'Çevre': '52 birim', 'Kısa köşegen': '10 birim' } },
    { in: { yontem: 'yuk', kenar: '5', yukseklik: '4' }, out: { 'Alan': '20 birim²', 'Çevre': '20 birim', 'Kısa köşegen': '4,4721 birim', 'Uzun köşegen': '8,9443 birim' } },
    { in: { yontem: 'aci', kenar: '4', aci: '90' }, out: { 'Alan': '16 birim²', 'Kısa köşegen': '5,6569 birim', 'Uzun köşegen': '5,6569 birim', 'Dar açı': '90°' } },
    { in: { yontem: 'aci', kenar: '6', aci: '60' }, out: { 'Alan': '31,1769 birim²', 'Kısa köşegen': '6 birim', 'Uzun köşegen': '10,3923 birim' } },
    { in: { yontem: 'aci', kenar: '6', aci: '120' }, out: { 'Alan': '31,1769 birim²', 'Dar açı': '60°' } },
    { in: { yontem: 'yuk', kenar: '5', yukseklik: '6' }, error: true },
    { in: { yontem: 'kosegen', kosegen1: '0', kosegen2: '8' }, error: true },
    { in: { yontem: 'aci', kenar: '5', aci: '200' }, error: true },
  ],
  howto: [
    `"Bilinenler" listesinden elinizdeki ölçülere uygun yöntemi seçin.`,
    `Köşegen yönteminde iki köşegeni; kenar-yükseklik yönteminde kenarı ve yüksekliği; kenar-açı yönteminde kenarı ve iç açılardan birini yazın. Kullanmadığınız kutuları boş bırakın.`,
    `Bütün uzunlukların aynı birimde olduğundan emin olun ve "Hesapla" düğmesine basın.`,
    `Alan ilk satırdadır; kenar, çevre, yükseklik, köşegenler ve dar açı ardından sıralanır.`,
  ],
  sections: [
    { h: 'Eşkenar dörtgen nedir?', p: [
      `Eşkenar dörtgen, dört kenarı da birbirine eşit olan paralelkenardır. Halk arasında "baklava dilimi" ya da "karo" şekli olarak bilinir. Kareden farkı, açılarının dik olmak zorunda olmamasıdır: karşılıklı açılar eşittir, komşu açılar birbirini 180°'ye tamamlar. Kare, bütün açıları 90° olan özel bir eşkenar dörtgendir.`,
      `Bu şeklin en kullanışlı özelliği köşegenleridir: iki köşegen birbirini <strong>dik keser</strong> ve <strong>ortalar</strong>. Ayrıca her köşegen, geçtiği köşelerdeki açıyı iki eşit parçaya böler. Alan formüllerinin hepsi bu özelliklerden türetilir.`,
    ] },
    { h: 'Köşegenlerle alan: e × f ÷ 2', p: [
      `Köşegenler birbirini dik kestiği için eşkenar dörtgen, dik kenarları yarım köşegenler olan dört eş dik üçgenden oluşur. Bu üçgenlerin toplam alanı <strong>köşegenlerin çarpımının yarısıdır</strong>: Alan = e × f ÷ 2.`,
      `Çözümlü örnek: köşegenleri 6 cm ve 8 cm olan eşkenar dörtgenin alanı 6 × 8 ÷ 2 = <strong>24 cm²</strong>'dir. Yarım köşegenler 3 ve 4 olduğundan kenar, 3-4-5 dik üçgeninin hipotenüsü olan <strong>5 cm</strong>, çevre 4 × 5 = <strong>20 cm</strong> çıkar. Yükseklik ise alanın kenara bölümüdür: 24 ÷ 5 = <strong>4,8 cm</strong>. Dar açı yaklaşık 73,74° olur.`,
    ] },
    { h: 'Kenar ve yükseklikle alan', p: [
      `Eşkenar dörtgen bir paralelkenar olduğundan <strong>Alan = kenar × yükseklik</strong> formülü de geçerlidir. Yükseklik, karşılıklı iki kenar arasındaki dik uzaklıktır. Kenarı 5, yüksekliği 4 birim olan eşkenar dörtgenin alanı <strong>20 birim²</strong>'dir.`,
      `Yükseklik hiçbir zaman kenardan uzun olamaz. İkisi eşit olduğunda açı 90° olur ve şekil kareye dönüşür; bu, sabit kenar uzunluğuyla elde edilebilecek en büyük alandır. Araç, kenardan büyük bir yükseklik yazıldığında hesap yapmaz ve nedenini açıklar.`,
    ] },
    { h: 'Kenar ve açı ile alan: a² × sin α', p: [
      `Kenar uzunluğu ve iç açılardan biri biliniyorsa alan <strong>a² × sin α</strong> ile bulunur. Kenarı 10 birim, açısı 30° olan eşkenar dörtgende sin 30° = 0,5 olduğundan alan 100 × 0,5 = <strong>50 birim²</strong>, yükseklik 5 birimdir.`,
      `Dar açıyı ya da geniş açıyı yazmanız sonucu değiştirmez; çünkü ikisinin sinüsü aynıdır. Kenarı 6 olan şekle 60° de yazsanız 120° de yazsanız alan yaklaşık 31,1769 birim² çıkar. Bu özel durumda kısa köşegen kenara eşittir (6 birim), çünkü şekil iki eşkenar üçgenin birleşimidir; uzun köşegen 6√3 ≈ 10,3923 birimdir. Köşegenler açıdan şu bağıntılarla bulunur: kısa köşegen = 2a · sin(α/2), uzun köşegen = 2a · cos(α/2), burada α dar açıdır.`,
    ] },
    { h: 'Nerelerde karşımıza çıkar?', ul: [
      `<strong>Karo ve parke döşeme:</strong> baklava desenli seramik, kilit parke ve cam mozaiklerde tek parçanın alanı köşegenlerden bulunur; metrekareye kaç adet düştüğü buradan hesaplanır.`,
      `<strong>Tatlı ve hamur işi:</strong> tepsideki baklava dilimlerinin boyutu ve sayısı, kesim açısına ve aralığına bağlı bir eşkenar dörtgen hesabıdır.`,
      `<strong>El sanatları:</strong> kilim ve halı motifleri, kırkyama, örgü ve kanaviçe desenlerinde baklava motifi için kumaş ya da iplik ihtiyacı.`,
      `<strong>Metal ve inşaat:</strong> baklavalı sac, genişletilmiş metal ve kafes tel gözlerinin açıklık alanı.`,
      `<strong>Okul:</strong> dörtgenler konusunda köşegen, kenar ve açı arasındaki ilişkileri sınamak.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `Köşegenleri çarpıp ikiye bölmeyi unutmak. Çarpımın tamamı, şekli çevreleyen dikdörtgenin alanıdır.`,
      `Yarım köşegenleri (merkezden köşeye olan uzaklıkları) tam köşegen sanmak. Bu durumda sonuç dört kat küçük çıkar.`,
      `Kenarın karesini doğrudan alan kabul etmek. Bu yalnızca açı 90° olduğunda, yani karede doğrudur.`,
      `Deltoid (uçurtma) ile karıştırmak. Deltoidde de köşegenler diktir ve aynı alan formülü geçerlidir, ama dört kenar eşit değildir; kenar ve çevre sonuçları ona uygulanamaz.`,
    ] },
    { h: 'Birimler ve duyarlılık', p: [
      `Uzunlukları hangi birimle yazarsanız alan o birimin karesi olarak çıkar; araç birim dönüşümü yapmaz. Uzunluklar dört, açı iki ondalık basamağa yuvarlanır. Kenar-yükseklik yönteminde aynı ölçülere uyan tek bir eşkenar dörtgen bulunduğundan köşegenler ve açı da kesin olarak hesaplanabilir. Malzeme hesabında derz, fire ve kesim payını ayrıca düşünmelisiniz.`,
    ] },
  ],
  faq: [
    ['Eşkenar dörtgenin alanı nasıl hesaplanır?', 'En yaygın yöntem köşegenlerin çarpımını ikiye bölmektir. Köşegenleri 6 ve 8 olan eşkenar dörtgenin alanı 24 birim karedir. Kenar ve yükseklik biliniyorsa ikisi çarpılır; kenar ve açı biliniyorsa kenarın karesi açının sinüsüyle çarpılır.'],
    ['Köşegenlerden kenar uzunluğu nasıl bulunur?', 'Köşegenler birbirini dik ortaladığı için kenar, yarım köşegenlerin oluşturduğu dik üçgenin hipotenüsüdür: a = √((e/2)² + (f/2)²). Köşegenler 10 ve 24 ise kenar 13 birimdir.'],
    ['Eşkenar dörtgenin çevresi nasıl hesaplanır?', 'Dört kenar eşit olduğundan kenar uzunluğu dörtle çarpılır. Kenarı 13 birim olan eşkenar dörtgenin çevresi 52 birimdir.'],
    ['Eşkenar dörtgen ile kare arasındaki fark nedir?', 'İkisinde de dört kenar eşittir; karede ek olarak bütün açılar 90 derecedir ve köşegenler eşit uzunluktadır. Yani her kare bir eşkenar dörtgendir, ama her eşkenar dörtgen kare değildir.'],
    ['Eşkenar dörtgen ile paralelkenarın farkı nedir?', 'Paralelkenarda yalnızca karşılıklı kenarlar eşittir. Eşkenar dörtgende dört kenarın hepsi eşittir; bu yüzden köşegenleri dik kesişir. Paralelkenarın genel hâlinde köşegenler dik kesişmez.'],
    ['Yalnızca kenar uzunluğu ile alan bulunur mu?', 'Hayır. Aynı kenar uzunluğuyla açıya bağlı olarak sonsuz farklı eşkenar dörtgen çizilebilir ve alanları farklıdır. Kenarın yanında bir açı, yükseklik ya da bir köşegen bilinmelidir.'],
    ['Bir köşegen ve kenar biliniyorsa ne yapmalıyım?', 'Diğer köşegeni Pisagor bağıntısıyla bulabilirsiniz: f = 2 × √(a² − (e/2)²). Kenar 5, bir köşegen 6 ise diğer köşegen 8 çıkar; sonra köşegen yöntemini kullanırsınız.'],
    ['Yazdığım değerler bir yere gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızda gerçekleşir; ölçüleriniz sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['paralelkenar-alani-hesapla', 'yamuk-alani-hesapla', 'ucgen-alani-hesapla', 'pisagor-teoremi-hesapla', 'alan-cevre-hesapla'],
};
