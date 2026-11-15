export default {
  slug: 'yamuk-alani-hesapla',
  title: 'Yamuk Alanı Hesaplama',
  h1Tail: 'tabanlar ve yükseklikten',
  pageTitle: 'Yamuk Alanı Hesaplama – Alt Taban, Üst Taban ve Yükseklik',
  description: 'Yamuğun alanını alt taban, üst taban ve yükseklikten hesaplayın. (a + b) × h ÷ 2 formülüyle çalışır; orta tabanı ve yan kenarlar yazılırsa çevreyi de verir.',
  card: 'Alt taban, üst taban ve yüksekliği yazın; yamuğun alanını, orta tabanını ve isterseniz çevresini bulun.',
  category: 'matematik',
  keywords: ['yamuk alanı hesaplama', 'yamuğun alanı formülü', 'yamuk çevresi', 'orta taban hesaplama', 'ikizkenar yamuk alanı', 'dik yamuk alanı', 'yamuk arsa alanı'],
  lead: `Yamuğun alanını iki paralel kenarın (alt ve üst taban) uzunluğu ile aralarındaki dik uzaklıktan hesaplayın. Araç <strong>Alan = (a + b) × h ÷ 2</strong> formülünü kullanır; orta tabanı ve yan kenarları yazarsanız çevreyi de gösterir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'altTaban', label: 'Alt taban (a)', type: 'number', placeholder: 'Örn. 10' },
    { id: 'ustTaban', label: 'Üst taban (b)', type: 'number', placeholder: 'Örn. 6' },
    { id: 'yukseklik', label: 'Yükseklik (h)', type: 'number', placeholder: 'Örn. 4', hint: 'İki taban arasındaki dik uzaklık' },
    { id: 'yanC', label: 'Yan kenar c (isteğe bağlı)', type: 'number', placeholder: 'Örn. 5', hint: 'Çevre için iki yan kenarı da yazın' },
    { id: 'yanD', label: 'Yan kenar d (isteğe bağlı)', type: 'number', placeholder: 'Örn. 5' },
  ],
  compute(v, h) {
    const a = h.pos(v.altTaban, 'Alt taban');
    const b = h.pos(v.ustTaban, 'Üst taban');
    const y = h.pos(v.yukseklik, 'Yükseklik');
    const alan = (a + b) * y / 2;
    const rows = [
      ['Alan', h.fmt(alan, 4) + ' birim²'],
      ['Orta taban', h.fmt((a + b) / 2, 4) + ' birim'],
    ];
    let note = 'Alan = (a + b) × h ÷ 2. Sonuç, uzunlukları yazdığınız birimin karesidir.';
    const cDolu = String(v.yanC ?? '').trim() !== '';
    const dDolu = String(v.yanD ?? '').trim() !== '';
    if (cDolu !== dDolu) h.err('Çevre için iki yan kenarı da yazın ya da ikisini de boş bırakın.');
    if (cDolu && dDolu) {
      const c = h.pos(v.yanC, 'Yan kenar c');
      const d = h.pos(v.yanD, 'Yan kenar d');
      const pay = 1e-9 * Math.max(c, d, y);
      if (c < y - pay || d < y - pay) h.err('Yan kenar yükseklikten kısa olamaz; yükseklik iki taban arasındaki en kısa (dik) uzaklıktır.');
      rows.push(['Çevre', h.fmt(a + b + c + d, 4) + ' birim']);
      const x1 = Math.sqrt(Math.max(0, c * c - y * y));
      const x2 = Math.sqrt(Math.max(0, d * d - y * y));
      const fark = Math.abs(a - b);
      const tol = 0.01 * Math.max(a, b, c, d);
      const uyumlu = Math.abs(x1 + x2 - fark) <= tol || Math.abs(Math.abs(x1 - x2) - fark) <= tol;
      if (!uyumlu) note += ' Uyarı: yazdığınız yan kenarlar bu tabanlar ve yükseklikle geometrik olarak tam uyuşmuyor; çevre, girdiğiniz dört kenarın toplamı olarak verilmiştir.';
    }
    if (Math.abs(a - b) <= 1e-12 * Math.max(a, b)) note += ' İki taban eşit olduğundan şekil bir paralelkenardır.';
    return { rows, note };
  },
  cases: [
    { in: { altTaban: '10', ustTaban: '6', yukseklik: '4' }, out: { 'Alan': '32 birim²', 'Orta taban': '8 birim' } },
    { in: { altTaban: '14', ustTaban: '8', yukseklik: '4', yanC: '5', yanD: '5' }, out: { 'Alan': '44 birim²', 'Orta taban': '11 birim', 'Çevre': '32 birim' } },
    { in: { altTaban: '5', ustTaban: '3', yukseklik: '2' }, out: { 'Alan': '8 birim²' } },
    { in: { altTaban: '7,5', ustTaban: '2,5', yukseklik: '4' }, out: { 'Alan': '20 birim²', 'Orta taban': '5 birim' } },
    { in: { altTaban: '20', ustTaban: '10', yukseklik: '12' }, out: { 'Alan': '180 birim²' } },
    { in: { altTaban: '9', ustTaban: '6', yukseklik: '4', yanC: '4', yanD: '5' }, out: { 'Alan': '30 birim²', 'Çevre': '24 birim' } },
    { in: { altTaban: '4', ustTaban: '4', yukseklik: '3' }, out: { 'Alan': '12 birim²' } },
    { in: { altTaban: '10', ustTaban: '6', yukseklik: '0' }, error: true },
    { in: { altTaban: '10', ustTaban: '6', yukseklik: '4', yanC: '3', yanD: '5' }, error: true },
    { in: { altTaban: '10', ustTaban: '6', yukseklik: '4', yanC: '5' }, error: true },
  ],
  howto: [
    `Birbirine paralel olan iki kenarın uzunluğunu "Alt taban" ve "Üst taban" kutularına yazın. Hangisinin uzun olduğu önemli değildir.`,
    `"Yükseklik" kutusuna iki taban arasındaki dik uzaklığı girin. Eğik yan kenarın uzunluğunu buraya yazmayın.`,
    `Çevreyi de öğrenmek istiyorsanız iki yan kenarın uzunluğunu ilgili kutulara ekleyin; istemiyorsanız boş bırakın.`,
    `"Hesapla" düğmesine basın. Alan, orta taban ve (yan kenarlar girildiyse) çevre sonuç kutusunda listelenir.`,
  ],
  sections: [
    { h: 'Yamuk nedir, alanı nasıl bulunur?', p: [
      `Yamuk, yalnızca iki kenarı birbirine paralel olan dörtgendir. Paralel kenarlara <strong>taban</strong> denir; biri alt taban (a), diğeri üst taban (b) olarak adlandırılır. Paralel olmayan diğer iki kenar <strong>yan kenar</strong>, tabanlar arasındaki dik uzaklık ise <strong>yükseklik</strong> (h) olarak anılır.`,
      `Alan formülü <strong>(a + b) × h ÷ 2</strong> şeklindedir. Sözle ifade edersek: tabanların ortalaması alınır ve yükseklikle çarpılır. Formülün mantığını görmek için aynı yamuktan iki tane kesip birini ters çevirerek diğerinin yanına koyduğunuzu düşünün. Ortaya tabanı a + b, yüksekliği h olan bir paralelkenar çıkar; yamuk bunun yarısıdır.`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `Alt tabanı 10 m, üst tabanı 6 m ve yüksekliği 4 m olan bir yamuk düşünelim. Tabanların toplamı 16, yarısı 8'dir. 8 × 4 = <strong>32 m²</strong>. Araç ayrıca orta tabanı 8 m olarak gösterir; bu, alanın "orta taban × yükseklik" biçiminde de hesaplanabileceğini hatırlatır.`,
      `İkinci örnek bir ikizkenar yamuk: alt taban 14, üst taban 8, yükseklik 4 ve yan kenarların her biri 5 birim. Alan (14 + 8) × 4 ÷ 2 = <strong>44 birim²</strong>, çevre 14 + 8 + 5 + 5 = <strong>32 birim</strong> olur. Burada yan kenarların tutarlı olduğunu da görebilirsiniz: tabanlar farkının yarısı 3, yükseklik 4 olduğundan yan kenar 3-4-5 dik üçgeninin hipotenüsü, yani 5'tir.`,
    ] },
    { h: 'Orta taban ne işe yarar?', p: [
      `Orta taban, yan kenarların orta noktalarını birleştiren doğru parçasıdır. Tabanlara paraleldir ve uzunluğu iki tabanın aritmetik ortalamasına eşittir: <strong>(a + b) ÷ 2</strong>. Bu özellik sayesinde yamuğun alanı, genişliği orta taban kadar olan bir dikdörtgenin alanıyla aynıdır. Sahada tabanları ölçmek zor, ortadan ölçmek kolay olduğunda (örneğin eğimli bir şevde) orta tabanı doğrudan ölçüp yükseklikle çarpmak pratik bir yöntemdir.`,
    ] },
    { h: 'Yamuk çeşitleri', ul: [
      `<strong>İkizkenar yamuk:</strong> yan kenarları eşit uzunluktadır; taban açıları ve köşegenleri de birbirine eşittir.`,
      `<strong>Dik yamuk:</strong> yan kenarlardan biri tabanlara diktir. Bu kenarın uzunluğu aynı zamanda yüksekliktir.`,
      `<strong>Çeşitkenar yamuk:</strong> yan kenarları ve taban açıları birbirinden farklıdır.`,
      `<strong>Sınır durumu:</strong> iki taban eşitse şekil paralelkenar olur ve formül taban × yükseklik sonucunu verir; araç bu durumu notta belirtir.`,
    ] },
    { h: 'Gerçek hayatta yamuk', p: [
      `Türkiye'de kadastro parsellerinin önemli bir bölümü tam dikdörtgen değildir; yola bakan cephesi ile arka cephesi farklı uzunlukta, iki yan sınırı ise yaklaşık paralel olan arsalar yamuk olarak hesaplanır. Ön cephesi 20 m, arka cephesi 10 m, derinliği 12 m olan bir arsanın alanı (20 + 10) × 12 ÷ 2 = 180 m² eder.`,
      `İnşaatta sulama kanalı, hendek ve şev kesitleri neredeyse her zaman yamuktur: taban genişliği dar, üst genişlik fazladır. Kesit alanını kanal uzunluğuyla çarparak kazı hacmine ulaşılır. Çatı yüzeyleri (kırma çatının uzun kenarları), merdiven altı dolapları, tezgâh köşeleri, çanta ve etek kalıpları, barajların ve setlerin enine kesitleri de aynı formülle hesaplanır.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `Yükseklik yerine eğik yan kenarı kullanmak. Yükseklik, tabanlara dik olan en kısa uzaklıktır ve yan kenardan uzun olamaz; araç bu tutarsızlığı yakalayıp uyarır.`,
      `Paralel olmayan kenarları taban sanmak. Formüldeki a ve b mutlaka birbirine paralel iki kenardır.`,
      `Tabanları toplayıp yükseklikle çarptıktan sonra ikiye bölmeyi unutmak.`,
      `Ölçüleri karışık birimlerle girmek. Hepsini metre ya da hepsini santimetre yazın.`,
    ] },
    { h: 'Çevre hesabı ve tutarlılık denetimi', p: [
      `Yamuğun çevresi dört kenarın toplamıdır; alan formülünden farklı olarak yan kenarların da bilinmesini gerektirir. Bu yüzden yan kenar kutuları isteğe bağlıdır. İki kutudan yalnızca biri doldurulursa araç eksik olanı ister.`,
      `Tabanlar, yükseklik ve yan kenarlar birbirinden bağımsız değildir: yan kenarların yatay izdüşümleri, tabanlar arasındaki farkı vermek zorundadır. Girdiğiniz beş değer bu koşulu yaklaşık olarak sağlamıyorsa sonuç notunda bir uyarı görürsünüz. Bu durumda alan yine tabanlar ve yükseklikten doğru hesaplanır; ancak ölçülerinizden birini yanlış almış olabilirsiniz.`,
      `Araç birim dönüşümü yapmaz ve sonuçları dört ondalık basamağa yuvarlar. Tapu, imar ve hakediş gibi resmî işlemlerde yetkili ölçüm ve proje değerleri esas alınmalıdır; buradaki sonuç ön hesap ve kontrol amaçlıdır.`,
    ] },
  ],
  faq: [
    ['Yamuğun alanı nasıl hesaplanır?', 'Alt taban ile üst taban toplanır, yükseklikle çarpılır ve ikiye bölünür: (a + b) × h ÷ 2. Tabanları 10 ve 6, yüksekliği 4 olan yamuğun alanı 32 birim karedir.'],
    ['Yamukta yükseklik neresidir?', 'Yükseklik, birbirine paralel iki taban arasındaki dik uzaklıktır. Dik yamukta tabanlara dik olan yan kenar yüksekliğe eşittir; diğer yamuklarda yükseklik yan kenarlardan kısadır.'],
    ['Orta taban nasıl bulunur?', 'İki tabanın toplamının yarısıdır. Tabanları 14 ve 8 olan yamuğun orta tabanı 11 birimdir. Alan, orta taban ile yüksekliğin çarpımına da eşittir.'],
    ['İkizkenar yamuğun alanı farklı mı hesaplanır?', 'Hayır, formül bütün yamuklar için aynıdır. İkizkenar yamukta yalnızca yan kenarlar eşit olduğundan, yükseklik bilinmiyorsa yan kenar ve taban farkından Pisagor bağıntısıyla bulunabilir.'],
    ['Yüksekliği bilmiyorsam ne yapmalıyım?', 'İkizkenar yamukta tabanlar farkının yarısını ve yan kenarı kullanarak yüksekliği bulabilirsiniz: h = √(c² − ((a − b) ÷ 2)²). Tabanları 14 ve 8, yan kenarı 5 olan yamukta yükseklik 4 çıkar.'],
    ['Yamuğun çevresi nasıl hesaplanır?', 'Dört kenar toplanır: iki taban ve iki yan kenar. Araçta yan kenar kutularını doldurduğunuzda çevre satırı da sonuçlara eklenir.'],
    ['Yamuk biçimli arsanın metrekaresini bulabilir miyim?', 'Paralel iki cepheyi taban, aralarındaki dik mesafeyi yükseklik olarak metre cinsinden yazarsanız sonuç metrekaredir. Resmî işlemlerde tapu kaydındaki yüzölçümü geçerlidir.'],
    ['Yazdığım ölçüler saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; girdiğiniz değerler sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['paralelkenar-alani-hesapla', 'ucgen-alani-hesapla', 'alan-cevre-hesapla', 'metrekare-hesapla', 'pisagor-teoremi-hesapla'],
};
