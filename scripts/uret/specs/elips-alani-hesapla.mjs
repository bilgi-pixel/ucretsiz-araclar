export default {
  slug: 'elips-alani-hesapla',
  title: 'Elips Alanı ve Çevresi Hesaplama',
  h1Tail: 'π·a·b, çevre ve dış merkezlik',
  pageTitle: 'Elips Alanı ve Çevresi Hesaplama – Yarı Eksenlerden π·a·b',
  description: 'Elipsin alanını ve çevresini yarı eksen ya da tam eksen uzunluklarından hesaplayın. Alan π·a·b ile, çevre yüksek duyarlıkla bulunur; dış merkezlik ve odaklar da verilir.',
  card: 'Elipsin alanını (π·a·b) ve çevresini eksen uzunluklarından hesaplayın; dış merkezlik ve odak uzaklığıyla birlikte.',
  category: 'matematik',
  keywords: ['elips alanı hesaplama', 'elips çevresi hesaplama', 'elipsin alanı formülü', 'oval alan hesaplama', 'pi a b', 'elips dış merkezlik', 'elips odak uzaklığı', 'ramanujan elips çevresi'],
  lead: `Elipsin <strong>alanını</strong> ve <strong>çevresini</strong> iki eksen uzunluğundan hesaplayın. Alan <strong>π · a · b</strong> formülüyle bulunur; çevre için basit bir kapalı formül olmadığından araç sayısal olarak yüksek duyarlıklı bir hesap yapar. Dış merkezlik ve odakların konumu da sonuçlara eklenir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'eksen1', label: 'Birinci eksen ölçüsü', type: 'number', placeholder: 'Örn. 5' },
    { id: 'eksen2', label: 'İkinci eksen ölçüsü', type: 'number', placeholder: 'Örn. 3' },
    { id: 'tur', label: 'Yazdığınız ölçüler', type: 'select', options: [['yari', 'Yarı eksenler (merkezden kenara)'], ['tam', 'Tam eksenler (uçtan uca en ve boy)']] },
  ],
  compute(v, h) {
    let p = h.pos(v.eksen1, 'Birinci eksen ölçüsü');
    let q = h.pos(v.eksen2, 'İkinci eksen ölçüsü');
    if (v.tur === 'tam') { p /= 2; q /= 2; }
    const a = Math.max(p, q);
    const b = Math.min(p, q);
    // Çevre: aritmetik-geometrik ortalama (AGM) ile ikinci tür tam eliptik integral
    let an = a, bn = b, cn2 = a * a - b * b, toplam = cn2 / 2, kat = 1;
    for (let i = 0; i < 40 && Math.abs(an - bn) > 1e-15 * an; i++) {
      const c = (an - bn) / 2;
      const yeniA = (an + bn) / 2;
      bn = Math.sqrt(an * bn);
      an = yeniA;
      toplam += kat * c * c;
      kat *= 2;
    }
    const cevre = 2 * Math.PI / an * (a * a - toplam);
    const c = Math.sqrt(Math.max(0, a * a - b * b));
    return {
      rows: [
        ['Alan', h.fmt(Math.PI * a * b, 4) + ' birim²'],
        ['Çevre', h.fmt(cevre, 4) + ' birim'],
        ['Büyük yarı eksen (a)', h.fmt(a, 4) + ' birim'],
        ['Küçük yarı eksen (b)', h.fmt(b, 4) + ' birim'],
        ['Dış merkezlik (e)', h.fmt(c / a, 4)],
        ['Odağın merkeze uzaklığı (c)', h.fmt(c, 4) + ' birim'],
      ],
      note: 'Alan = π·a·b. Çevre, eliptik integralin sayısal çözümüyle hesaplanır. İki eksen eşitse şekil dairedir.',
    };
  },
  cases: [
    { in: { eksen1: '5', eksen2: '3', tur: 'yari' }, out: { 'Alan': '47,1239 birim²', 'Çevre': '25,527 birim', 'Dış merkezlik (e)': '0,8', 'Odağın merkeze uzaklığı (c)': '4 birim' } },
    { in: { eksen1: '10', eksen2: '6', tur: 'tam' }, out: { 'Alan': '47,1239 birim²', 'Çevre': '25,527 birim', 'Büyük yarı eksen (a)': '5 birim' } },
    { in: { eksen1: '1', eksen2: '1', tur: 'yari' }, out: { 'Alan': '3,1416 birim²', 'Çevre': '6,2832 birim', 'Dış merkezlik (e)': '0' } },
    { in: { eksen1: '2', eksen2: '1', tur: 'yari' }, out: { 'Alan': '6,2832 birim²', 'Çevre': '9,6884 birim', 'Dış merkezlik (e)': '0,866' } },
    { in: { eksen1: '4', eksen2: '5', tur: 'yari' }, out: { 'Alan': '62,8319 birim²', 'Çevre': '28,3617 birim', 'Büyük yarı eksen (a)': '5 birim', 'Dış merkezlik (e)': '0,6', 'Odağın merkeze uzaklığı (c)': '3 birim' } },
    { in: { eksen1: '3', eksen2: '2', tur: 'yari' }, out: { 'Alan': '18,8496 birim²', 'Çevre': '15,8654 birim' } },
    { in: { eksen1: '5', eksen2: '0', tur: 'yari' }, error: true },
    { in: { eksen1: 'a', eksen2: '3', tur: 'yari' }, error: true },
  ],
  howto: [
    `Elipsin iki eksenine ait ölçüleri kutulara yazın. Hangisini önce yazdığınız fark etmez; araç büyük olanı büyük eksen kabul eder.`,
    `"Yazdığınız ölçüler" listesinden bu değerlerin yarı eksen mi (merkezden kenara), yoksa tam eksen mi (uçtan uca en ve boy) olduğunu seçin.`,
    `"Hesapla" düğmesine basın. Alan ve çevre ilk iki satırda; yarı eksenler, dış merkezlik ve odak uzaklığı altında görünür.`,
    `Oval bir masa, havuz ya da halı ölçüyorsanız en ve boyu uçtan uca ölçüp "Tam eksenler" seçeneğini kullanmak en kolay yoldur.`,
  ],
  sections: [
    { h: 'Elips nedir?', p: [
      `Elips, düzlemde iki sabit noktaya (odaklara) uzaklıkları toplamı sabit olan noktaların oluşturduğu kapalı eğridir. İki çiviye gevşek bir ip bağlayıp kalemi ipi gergin tutarak dolaştırdığınızda çizilen şekil elipstir; bahçıvanların oval tarh çizmek için kullandığı bu yöntem tanımın kendisidir.`,
      `Elipsin birbirine dik iki simetri ekseni vardır. Uzun olanına <strong>büyük eksen</strong>, kısa olanına <strong>küçük eksen</strong> denir. Bunların yarıları, yani merkezden kenara olan uzaklıklar <strong>a</strong> (büyük yarı eksen) ve <strong>b</strong> (küçük yarı eksen) ile gösterilir. İki yarı eksen eşit olduğunda elips daireye dönüşür.`,
    ] },
    { h: 'Elipsin alanı: π · a · b', p: [
      `Alan formülü şaşırtıcı derecede sadedir: <strong>Alan = π · a · b</strong>. Dairenin alan formülü π · r · r ile karşılaştırırsanız mantığı görürsünüz: elips, bir yönde gerilmiş ya da sıkıştırılmış bir dairedir ve alan gerilme oranı kadar değişir.`,
      `Çözümlü örnek: yarı eksenleri 5 m ve 3 m olan elipsin alanı π × 5 × 3 = 15π ≈ <strong>47,1239 m²</strong>'dir. Aynı elipsi uçtan uca ölçerseniz boyu 10 m, eni 6 m bulursunuz; tam eksenlerle formül π × 10 × 6 ÷ 4 biçimini alır ve yine aynı sonucu verir. Elips, kendisini çevreleyen 10 × 6'lık dikdörtgenin her zaman π ÷ 4'ünü, yani yaklaşık yüzde 78,5'ini kaplar.`,
    ] },
    { h: 'Elipsin çevresi neden zordur?', p: [
      `Alanın tersine, elipsin çevresi için toplama, çarpma ve karekök gibi temel işlemlerle yazılabilen tam bir formül yoktur. Çevre, "ikinci tür tam eliptik integral" adı verilen ve ancak sayısal yöntemlerle hesaplanabilen bir ifadeyle tanımlanır. Bu araç integrali hızla yakınsayan aritmetik-geometrik ortalama yöntemiyle çözer; gösterilen dört ondalık basamak güvenilirdir.`,
      `Elle hesapta en çok kullanılan yaklaşık formül Ramanujan'a aittir: <strong>Ç ≈ π · [3(a + b) − √((3a + b)(a + 3b))]</strong>. a = 5, b = 3 için bu formül 25,527 verir; aracın bulduğu <strong>25,527</strong> değeriyle dört ondalık basamakta örtüşür. Okul kitaplarında görülen <em>2π · √((a² + b²) ÷ 2)</em> formülü ise yalnızca kabaca doğrudur: aynı örnekte 25,91 sonucunu verir ve elips basıklaştıkça hatası büyür.`,
    ] },
    { h: 'Dış merkezlik ve odaklar', p: [
      `Bir elipsin ne kadar basık olduğunu <strong>dış merkezlik</strong> (eksantriklik, e) anlatır. Önce odağın merkeze uzaklığı bulunur: <strong>c = √(a² − b²)</strong>; sonra e = c ÷ a hesaplanır. Dış merkezlik 0 ile 1 arasındadır: 0 tam daire demektir, 1'e yaklaştıkça elips incelip uzar.`,
      `Örnek: a = 5, b = 3 için c = √(25 − 9) = <strong>4</strong> ve e = 4 ÷ 5 = <strong>0,8</strong>. Odaklar büyük eksen üzerinde, merkezin iki yanında 4'er birim uzaklıktadır. Elips üzerindeki her noktanın iki odağa uzaklıkları toplamı 2a, yani 10 birimdir. İple elips çizecekseniz çivileri 2c = 8 birim arayla çakıp ipin serbest boyunu 10 birim bırakmanız gerekir.`,
      `Gezegen yörüngeleri de elipstir ve Güneş odaklardan birinde bulunur. Dünya'nın yörüngesinin dış merkezliği çok küçük olduğundan yörünge daireye çok yakındır.`,
    ] },
    { h: 'Nerelerde kullanılır?', ul: [
      `<strong>Oval masa ve halı:</strong> yer kaplama alanı ve kenar bandı, pervaz ya da saçak için gereken uzunluk.`,
      `<strong>Havuz ve peyzaj:</strong> oval süs havuzu, çiçek tarhı ya da çim alanı için kaplama, tohum ve bordür miktarı.`,
      `<strong>Atletizm ve stadyum:</strong> oval saha ve tribün yerleşimlerinde yaklaşık alan hesapları.`,
      `<strong>İmalat:</strong> eğik kesilen bir borunun ya da silindirin kesit yüzeyi elipstir; conta ve kapak ölçüsü bu hesaptan çıkar.`,
      `<strong>Mimarlık:</strong> eliptik kemer, kubbe ve pencere tasarımlarında açıklık ve malzeme boyu.`,
      `<strong>Gökbilim ve fizik dersleri:</strong> yörünge parametreleri arasındaki ilişkileri sınamak.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `Tam eksenleri yarı eksen sanmak. Uçtan uca ölçtüğünüz en ve boyu doğrudan π ile çarparsanız alan dört kat büyük çıkar. Listeden doğru seçeneği işaretleyin.`,
      `Çevre için daire formülünü ortalama yarıçapla kullanmak. Basık elipslerde belirgin hata verir.`,
      `Her oval şekli elips saymak. Yumurta biçimi, köşeleri yuvarlatılmış dikdörtgen ya da iki yarım daireyle uzatılmış "stadyum" şekli elips değildir; bunlarda sonuç yalnızca yaklaşık olur.`,
      `Odak uzaklığını (c) odaklar arası mesafe (2c) ile karıştırmak.`,
    ] },
    { h: 'Birimler ve duyarlılık', p: [
      `İki ekseni aynı birimle yazın; alan o birimin karesi, çevre aynı birim olarak çıkar. Sonuçlar dört ondalık basamağa yuvarlanır. Gerçek nesneler kusursuz elips olmadığından malzeme siparişinde bir miktar pay bırakmak doğru olur.`,
    ] },
  ],
  faq: [
    ['Elipsin alanı nasıl hesaplanır?', 'Büyük yarı eksen ile küçük yarı eksen çarpılır ve pi sayısıyla çarpılır: Alan = π · a · b. Yarı eksenleri 5 ve 3 olan elipsin alanı yaklaşık 47,1239 birim karedir.'],
    ['Elipsin çevresi için kesin bir formül var mı?', 'Temel işlemlerle yazılabilen kesin bir formül yoktur; çevre eliptik integralle tanımlanır. Bu araç integrali sayısal olarak çözer. Elle hesap için Ramanujan\'ın yaklaşık formülü çok iyi sonuç verir.'],
    ['Yarı eksen ile tam eksen arasındaki fark nedir?', 'Tam eksen elipsin uçtan uca uzunluğudur; yarı eksen bunun yarısı, yani merkezden kenara olan uzaklıktır. Boyu 10, eni 6 olan elipsin yarı eksenleri 5 ve 3\'tür.'],
    ['Dış merkezlik ne anlama gelir?', 'Elipsin daireden ne kadar saptığını gösteren 0 ile 1 arasındaki sayıdır. 0 tam daireyi ifade eder; değer büyüdükçe elips basıklaşır. Yarı eksenleri 5 ve 3 olan elipste dış merkezlik 0,8\'dir.'],
    ['Odak noktaları nasıl bulunur?', 'Odakların merkeze uzaklığı c = √(a² − b²) ile hesaplanır ve odaklar büyük eksen üzerinde merkezin iki yanında yer alır. a = 5, b = 4 için c = 3 birimdir.'],
    ['Oval bir masanın alanını bu araçla bulabilir miyim?', 'Masa gerçekten elips biçimindeyse evet: en ve boyu uçtan uca ölçüp tam eksen seçeneğiyle girin. Kenarları düz, uçları yarım daire olan masalarda sonuç yaklaşık olur; o şekil bir dikdörtgen ve iki yarım daire olarak ayrı hesaplanmalıdır.'],
    ['İki ekseni eşit yazarsam ne olur?', 'Şekil daire olur. Alan π · r², çevre 2 · π · r değerine eşit çıkar ve dış merkezlik 0 görünür. Yarı eksenleri 1 ve 1 yazdığınızda alan 3,1416, çevre 6,2832 sonucunu alırsınız.'],
    ['Yazdığım ölçüler kaydediliyor mu?', 'Hayır. Bütün hesap tarayıcınızda yapılır; değerleriniz sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['daire-alani-hesapla', 'daire-cevresi-hesapla', 'daire-dilimi-hesapla', 'alan-cevre-hesapla', 'metrekare-hesapla'],
};
