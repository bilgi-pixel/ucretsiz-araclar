export default {
  slug: 'cit-hesapla',
  title: 'Çit ve Tel Örgü Hesaplama',
  h1Tail: 'direk, rulo ve gergi teli',
  pageTitle: 'Çit ve Tel Örgü Hesaplama – Direk Sayısı, Rulo ve Gergi Teli',
  description: 'Çevrilecek hattın uzunluğunu ve direk aralığını girin; gereken direk sayısını, tel örgü rulo adedini ve gergi teli metrajını kapı boşluğunu düşerek hesaplayın.',
  card: 'Arazi çevresi için gereken çit direği sayısını, tel örgü rulosunu ve gergi teli uzunluğunu hesaplayın.',
  category: 'insaat',
  keywords: ['çit hesaplama', 'tel örgü hesaplama', 'çit direği kaç adet', 'direk aralığı hesaplama', 'kafes tel rulo hesabı', 'gergi teli hesaplama', 'arazi çevirme maliyeti'],
  lead: "Bahçe, tarla ya da arsa çevresine yapılacak <strong>tel örgü çit</strong> için direk sayısını, rulo adedini ve gergi teli uzunluğunu hesaplayın. Kapı boşluğu tel metrajından düşülür; direkler hatta eşit aralıkla dağıtılır.",
  button: 'Hesapla',
  inputs: [
    { id: 'uzunluk', label: 'Çit hattı uzunluğu (m)', type: 'number', placeholder: 'Örn. 100', hint: 'Kapı boşlukları dahil toplam uzunluk.' },
    { id: 'tip', label: 'Hat tipi', type: 'select', options: [['kapali', 'Kapalı çevre (başladığı yerde biter)'], ['acik', 'Açık hat (iki ucu ayrı)']] },
    { id: 'aralik', label: 'En fazla direk aralığı (m)', type: 'number', value: '2,5' },
    { id: 'kapi', label: 'Toplam kapı genişliği (m)', type: 'number', value: '0', hint: 'Tel örgü çekilmeyecek açıklık.' },
    { id: 'rulo', label: 'Tel örgü rulo boyu (m)', type: 'number', value: '20' },
    { id: 'gergi', label: 'Gergi teli sıra sayısı', type: 'number', value: '3' },
  ],
  compute(v, h) {
    const L = h.pos(v.uzunluk, 'Çit hattı uzunluğu');
    const s = h.pos(v.aralik, 'En fazla direk aralığı');
    const kapi = h.nonneg(v.kapi, 'Toplam kapı genişliği');
    const rulo = h.pos(v.rulo, 'Tel örgü rulo boyu');
    const sira = h.int(v.gergi, 'Gergi teli sıra sayısı');
    if (sira < 0) h.err('"Gergi teli sıra sayısı" negatif olamaz; gergi teli kullanmayacaksanız 0 yazın.');
    if (kapi >= L) h.err('Toplam kapı genişliği çit hattı uzunluğundan küçük olmalı.');
    const bolme = Math.max(1, Math.ceil(L / s - 1e-9));
    const direk = v.tip === 'acik' ? bolme + 1 : bolme;
    const tel = L - kapi;
    return {
      rows: [
        ['Direk sayısı', direk + ' adet'],
        ['Gerçek direk aralığı', h.fmt(L / bolme, 2) + ' m'],
        ['Tel örgü uzunluğu', h.fmt(tel, 2) + ' m'],
        ['Tel örgü rulosu', Math.ceil(tel / rulo - 1e-9) + ' rulo'],
        ['Gergi teli', h.fmt(tel * sira, 2) + ' m'],
      ],
      note: 'Köşe ve kapı direklerine konan payandalar, bağ teli ve gergi aparatları bu sayılara dahil değildir.',
    };
  },
  cases: [
    { in: { uzunluk: '100' }, out: { 'Direk sayısı': '40 adet', 'Gerçek direk aralığı': '2,5 m', 'Tel örgü uzunluğu': '100 m', 'Tel örgü rulosu': '5 rulo', 'Gergi teli': '300 m' } },
    { in: { uzunluk: '50', tip: 'acik', aralik: '3', kapi: '0', rulo: '25', gergi: '2' }, out: { 'Direk sayısı': '18 adet', 'Gerçek direk aralığı': '2,94 m', 'Tel örgü rulosu': '2 rulo', 'Gergi teli': '100 m' } },
    { in: { uzunluk: '100', tip: 'kapali', aralik: '2,5', kapi: '4', rulo: '20', gergi: '3' }, out: { 'Direk sayısı': '40 adet', 'Tel örgü uzunluğu': '96 m', 'Tel örgü rulosu': '5 rulo', 'Gergi teli': '288 m' } },
    { in: { uzunluk: '240', tip: 'kapali', aralik: '3', kapi: '5', rulo: '20', gergi: '4' }, out: { 'Direk sayısı': '80 adet', 'Gerçek direk aralığı': '3 m', 'Tel örgü uzunluğu': '235 m', 'Tel örgü rulosu': '12 rulo', 'Gergi teli': '940 m' } },
    { in: { uzunluk: '10', tip: 'acik', aralik: '2,5', kapi: '0', rulo: '10', gergi: '0' }, out: { 'Direk sayısı': '5 adet', 'Tel örgü rulosu': '1 rulo', 'Gergi teli': '0 m' } },
    { in: { uzunluk: '37', tip: 'acik', aralik: '2', kapi: '1', rulo: '10', gergi: '3' }, out: { 'Direk sayısı': '20 adet', 'Gerçek direk aralığı': '1,95 m', 'Tel örgü rulosu': '4 rulo', 'Gergi teli': '108 m' } },
    { in: { uzunluk: '20', kapi: '25' }, error: true },
    { in: { uzunluk: '100', aralik: '0' }, error: true },
  ],
  howto: [
    "Çit çekilecek hattın toplam uzunluğunu metre olarak yazın. Arsanın tamamı çevrilecekse bu değer arsanın çevresidir; kapı açıklıklarını düşmeden girin.",
    "Hat tipini seçin: arsanın dört tarafı dönüyorsa \"Kapalı çevre\", yalnızca bir cephe ya da duvara dayanan bir hat ise \"Açık hat\".",
    "İzin verdiğiniz en büyük direk aralığını, toplam kapı genişliğini ve satın alacağınız tel örgü rulosunun boyunu girin.",
    "Gergi teli kaç sıra çekilecekse yazıp \"Hesapla\" düğmesine basın. Direk sayısı, eşit dağıtılmış gerçek aralık, rulo adedi ve gergi teli metrajı listelenir.",
  ],
  sections: [
    { h: 'Direk sayısı nasıl hesaplanır?', p: [
      "Hat önce eşit bölmelere ayrılır. Bölme sayısı, hat uzunluğunun en fazla direk aralığına bölünüp yukarı yuvarlanmasıyla bulunur; böylece hiçbir bölme istenen aralığı aşmaz. Gerçek aralık ise uzunluğun bölme sayısına bölünmesiyle elde edilir ve çoğu zaman girdiğiniz değerden biraz küçük çıkar.",
      "Direk sayısı hattın tipine bağlıdır. <strong>Açık hatta</strong> her iki uçta da direk bulunduğundan direk sayısı bölme sayısından bir fazladır: 4 bölmeli bir hatta 5 direk vardır. <strong>Kapalı çevrede</strong> ise son direk ilk direkle aynı noktaya geldiği için direk sayısı bölme sayısına eşittir. Bu fark küçük görünse de \"çit direği problemi\" olarak bilinen klasik sayma hatasının kaynağıdır.",
    ] },
    { h: 'Çözümlü örnek: 100 metre çevreli bahçe', p: [
      "Kenarları 30 m ve 20 m olan dikdörtgen bir bahçenin çevresi 2 × (30 + 20) = 100 m'dir. Direkler en fazla 2,5 m arayla dikilecek olsun. Bölme sayısı 100 ÷ 2,5 = 40'tır; hat kapalı olduğundan <strong>40 direk</strong> gerekir.",
      "Bahçeye 4 m genişliğinde bir araç kapısı konacaksa tel örgü çekilecek uzunluk 100 − 4 = 96 m olur. 20 metrelik rulolardan 96 ÷ 20 = 4,8, yani <strong>5 rulo</strong> alınır. Üst, orta ve alt olmak üzere 3 sıra gergi teli için 96 × 3 = <strong>288 m</strong> tel gerekir. Kapının iki yanındaki direkler bu 40 direğin içinde sayılmıştır; kapı kasası ve menteşe direkleri daha kalın seçilecekse bunları ayrıca not edin.",
    ] },
    { h: 'Direk aralığı ne olmalı?', p: [
      "Aralık; telin cinsine, çit yüksekliğine, zemine ve rüzgâr yüküne göre seçilir. Örme kafes tel ve bahçe çitlerinde 2–3 m arası aralıklar yaygındır. Panel çit sistemlerinde aralık serbest değildir; panelin genişliği (çoğunlukla 2,5 m dolayında) aralığı belirler, bu yüzden panel çit için en fazla aralığa panel genişliğini yazmalısınız. Hayvan otlaklarında kullanılan dikenli tel ya da elektrikli çitlerde aralık daha geniş tutulabilir.",
      "Aralığı gereğinden büyük seçmek tel örgünün sarkmasına, küçük seçmek ise direk ve işçilik maliyetinin artmasına yol açar. Üreticinin montaj önerisini esas almak en sağlıklı yoldur.",
    ] },
    { h: 'Tel örgü, gergi teli ve diğer malzemeler', ul: [
      "<strong>Tel örgü:</strong> rulo boyları çoğunlukla 10, 20 ya da 25 m'dir. Rulo adedi, kapılar düşüldükten sonraki uzunluğun rulo boyuna bölünüp yukarı yuvarlanmasıyla bulunur. Eklerde bir iki göz bindirme payı bırakmak gerekir.",
      "<strong>Gergi teli:</strong> örme kafes telin sarkmaması için direkler arasına yatay çekilen kalın teldir. Alçak çitlerde iki, 1,5 m ve üzeri çitlerde üç ya da dört sıra kullanılır. Bağlantı ve germe payı için metrajın üzerine yüzde 5 kadar eklemek iyi olur.",
      "<strong>Payanda:</strong> köşe, uç ve kapı direkleri telin çekme kuvvetini taşıdığından çapraz destekle beslenir. Her köşe direğine iki, uç ve kapı direklerine birer payanda konması yaygın bir uygulamadır.",
      "<strong>Direk boyu:</strong> direğin toprağa gömülen kısmı çit yüksekliğine eklenir. Gömme derinliği zemine göre değişir; direk boyunu seçerken bunu unutmayın.",
      "<strong>Beton:</strong> her direk çukuru için gereken beton miktarı çukur çapı ve derinliğinden ayrıca hesaplanır.",
    ] },
    { h: 'Arazide ölçü alırken', p: [
      "Tapu ya da imar çapındaki kenar uzunlukları yatay mesafedir. Eğimli arazide çit zemini izlediği için gerçek uzunluk biraz daha fazladır; şerit metreyi zemine yatırarak ölçmek ya da uzunluğa birkaç yüzde eklemek gerekir. Köşeler dik değilse çevreyi kenarları tek tek ölçerek toplayın.",
      "Araç direkleri tüm hat boyunca eşit aralıkla dağıtır. Uygulamada her köşeye mutlaka bir direk gelmesi istenir. Kenar uzunlukları aralığın tam katı değilse her kenarı \"Açık hat\" olarak ayrı ayrı hesaplayıp köşe direklerini bir kez saymak en doğru sonucu verir.",
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      "Sonuçlar malzeme keşfi içindir; fiyat içermez. Direk kesiti, temel derinliği ve yüksek çitlerde rüzgâr yükü hesabı bu aracın kapsamı dışındadır. Sınır hattına çit yapmadan önce parsel sınırlarının doğru aplike edildiğinden emin olun; komşu parsel ve yol sınırıyla ilgili kurallar ve izinler için belediyenizin ya da ilgili idarenin güncel mevzuatını kontrol edin.",
    ] },
  ],
  faq: [
    ['100 metre çit için kaç direk gerekir?', "2,5 m aralıkla kapalı bir çevrede 40 direk, iki ucu açık düz bir hatta 41 direk gerekir. 3 m aralıkla bu sayılar sırasıyla 34 ve 35 olur."],
    ['Açık hat ile kapalı çevre arasındaki fark nedir?', "Açık hatta ilk ve son noktada ayrı birer direk bulunur, bu yüzden direk sayısı bölme sayısından bir fazladır. Kapalı çevrede hat başladığı direkte bittiğinden direk sayısı bölme sayısına eşittir."],
    ['Gerçek direk aralığı neden yazdığımdan küçük çıktı?', "Araç hattı eşit bölmelere ayırır. 50 m'lik bir hat 3 m aralığa tam bölünmez; 17 bölme gerekir ve her bölme 50 ÷ 17 = 2,94 m olur. Böylece sonda kısa bir artık bölme kalmaz."],
    ['1 dönüm araziyi çevirmek için kaç metre tel gerekir?', "Dönüm bir alan ölçüsüdür (1.000 m²); çevre arazinin biçimine bağlıdır. Kenarları 25 × 40 m olan bir dönümün çevresi 130 m, 20 × 50 m olanın 140 m, kareye yakın 31,6 × 31,6 m olanın yaklaşık 126,5 m'dir."],
    ['Kapı direkleri hesaba dahil mi?', "Kapının iki yanındaki direkler toplam direk sayısının içindedir, çünkü direkler kapı dahil tüm hat boyunca dağıtılır. Kapı kanadı, menteşe ve kilit takımı ile daha kalın kapı direği gerekiyorsa bunlar ayrı kalemlerdir."],
    ['Panel çit için de kullanabilir miyim?', "Evet. En fazla direk aralığına panel genişliğini, rulo boyuna da yine panel genişliğini yazın; \"rulo\" satırındaki sayı gereken panel adedini verir. Gergi teli sıra sayısına 0 girin."],
    ['Dikenli tel için metraj nasıl bulunur?', "Dikenli tel de gergi teli gibi yatay sıralar halinde çekilir. Sıra sayısı alanına kaç sıra çekeceğinizi yazın; \"Gergi teli\" satırındaki metraj dikenli tel ihtiyacınızdır."],
    ['Yazdığım ölçüler saklanıyor mu?', "Hayır. Hesap tarayıcınızda yapılır; girdiğiniz değerler hiçbir sunucuya gönderilmez ve kaydedilmez."],
  ],
  related: ['duvar-alani-hesapla', 'kilit-tasi-hesapla', 'cim-tohumu-hesapla', 'bahce-topragi-hesapla', 'profil-agirligi-hesapla'],
};
