export default {
  slug: 'gezegen-agirligi-hesapla',
  title: 'Diğer Gezegenlerdeki Ağırlık Hesaplama',
  h1Tail: 'Ay, Mars, Jüpiter ve diğerleri',
  pageTitle: 'Diğer Gezegenlerdeki Ağırlık Hesaplama – Ay ve Mars\'ta Kaç Kilo?',
  description: 'Kütlenizi yazın; Ay, Mars, Jüpiter ve diğer gezegenlerde ağırlığınızın kaç newton olacağını ve tartının kaç kilo göstereceğini tek tabloda görün.',
  card: 'Ay\'da, Mars\'ta ya da Jüpiter\'de kaç kilo gelirdiniz? Kütlenizi yazın, tüm gezegenlerdeki ağırlığınızı görün.',
  category: 'bilim',
  keywords: ['gezegenlerde ağırlık hesaplama', 'ayda kaç kilo', 'marsta kaç kilo gelirim', 'jüpiterde ağırlık', 'diğer gezegenlerde kilo', 'gezegenlerin çekim ivmesi', 'ayda ağırlık hesaplama'],
  lead: `Kütleniz evrenin her yerinde aynıdır, ama ağırlığınız üzerinde durduğunuz gök cisminin çekimine göre değişir. Dünya'daki kilonuzu yazın; seçtiğiniz gök cismindeki ağırlığınızı ve Güneş sistemindeki diğer cisimlerle karşılaştırmasını görün.`,
  button: 'Hesapla',
  inputs: [
    { id: 'kutle', label: 'Kütle (Dünya\'da tartıda okunan kilo)', type: 'number', placeholder: 'Örn. 70' },
    { id: 'cisim', label: 'Gök cismi', type: 'select', options: [['ay', 'Ay'], ['merkur', 'Merkür'], ['venus', 'Venüs'], ['dunya', 'Dünya'], ['mars', 'Mars'], ['jupiter', 'Jüpiter'], ['saturn', 'Satürn'], ['uranus', 'Uranüs'], ['neptun', 'Neptün'], ['pluton', 'Plüton'], ['gunes', 'Güneş']] },
  ],
  compute(v, h) {
    const G0 = 9.80665;
    const T = [
      ['merkur', 'Merkür', 3.7], ['venus', 'Venüs', 8.87], ['dunya', 'Dünya', G0], ['ay', 'Ay', 1.62],
      ['mars', 'Mars', 3.71], ['jupiter', 'Jüpiter', 24.79], ['saturn', 'Satürn', 10.44], ['uranus', 'Uranüs', 8.87],
      ['neptun', 'Neptün', 11.15], ['pluton', 'Plüton', 0.62], ['gunes', 'Güneş', 274],
    ];
    const m = h.pos(v.kutle, 'Kütle');
    const sec = T.find((x) => x[0] === v.cisim) || T[3];
    const W = m * sec[2];
    const rows = [
      ['Seçilen gök cismindeki ağırlık', h.fmt(W, 2) + ' N'],
      ['Tartının göstereceği değer', h.fmt(W / G0, 2) + ' kg'],
      ['Dünya\'daki ağırlık', h.fmt(m * G0, 2) + ' N'],
      ['Dünya\'ya göre oran', h.fmt(sec[2] / G0, 3) + ' kat'],
      ['Yüzey çekim ivmesi', h.fmt(sec[2], 2) + ' m/s²'],
    ];
    for (const x of T) rows.push([x[1], h.fmt(m * x[2], 1) + ' N (tartıda ' + h.fmt((m * x[2]) / G0, 1) + ' kg)']);
    return { rows, note: 'Kütleniz her yerde aynıdır; değişen yalnızca ağırlık kuvvetidir. "Tartıda" değeri, Dünya\'ya göre ayarlanmış bir banyo tartısının o gök cisminde göstereceği sayıdır. Gaz devleri ve Güneş için değerler katı bir yüzeyi değil, kabul edilen referans seviyesini temsil eder.' };
  },
  cases: [
    { in: { kutle: '70', cisim: 'ay' }, out: { 'Seçilen gök cismindeki ağırlık': '113,4 N', 'Tartının göstereceği değer': '11,56 kg', 'Dünya\'ya göre oran': '0,165 kat' } },
    { in: { kutle: '100', cisim: 'mars' }, out: { 'Seçilen gök cismindeki ağırlık': '371 N', 'Tartının göstereceği değer': '37,83 kg', 'Dünya\'ya göre oran': '0,378 kat' } },
    { in: { kutle: '50', cisim: 'jupiter' }, out: { 'Seçilen gök cismindeki ağırlık': '1.239,5 N', 'Tartının göstereceği değer': '126,39 kg', 'Dünya\'ya göre oran': '2,528 kat' } },
    { in: { kutle: '80', cisim: 'dunya' }, out: { 'Seçilen gök cismindeki ağırlık': '784,53 N', 'Tartının göstereceği değer': '80 kg', 'Dünya\'ya göre oran': '1 kat' } },
    { in: { kutle: '10', cisim: 'merkur' }, out: { 'Seçilen gök cismindeki ağırlık': '37 N', 'Tartının göstereceği değer': '3,77 kg', 'Ay': '16,2 N (tartıda 1,7 kg)' } },
    { in: { kutle: '60', cisim: 'gunes' }, out: { 'Seçilen gök cismindeki ağırlık': '16.440 N', 'Yüzey çekim ivmesi': '274 m/s²' } },
    { in: { kutle: '0', cisim: 'ay' }, error: true },
    { in: { kutle: 'yetmiş', cisim: 'mars' }, error: true },
  ],
  howto: [
    `"Kütle" alanına Dünya'da tartıldığınızda okuduğunuz kilo değerini yazın. Bir eşyanın, evcil hayvanınızın ya da bir uzay aracının kütlesini de girebilirsiniz.`,
    `"Gök cismi" listesinden ağırlığı öğrenmek istediğiniz yeri seçin: Ay, Güneş sistemindeki sekiz gezegenden biri, cüce gezegen Plüton ya da Güneş.`,
    `"Hesapla" düğmesine basın. İlk satırlarda seçtiğiniz gök cismindeki ağırlık newton olarak, ardından bir banyo tartısının orada göstereceği değer kilogram olarak verilir.`,
    `Alttaki satırlarda aynı kütlenin bütün gök cisimlerindeki ağırlığı sıralanır; böylece hepsini tek bakışta karşılaştırabilirsiniz.`,
  ],
  sections: [
    { h: 'Kütle ile ağırlık aynı şey değildir', p: [
      `Gündelik dilde "70 kiloyum" deriz, ama fizikte kilogram ağırlığın değil kütlenin birimidir. Kütle, bir cismin içerdiği madde miktarının ve harekete karşı gösterdiği direncin ölçüsüdür; nereye giderseniz gidin değişmez. Ağırlık ise bir gök cisminin o kütleye uyguladığı çekim kuvvetidir ve newton (N) ile ölçülür.`,
      `Ağırlık şu bağıntıyla bulunur: <strong>Ağırlık = kütle × yüzey çekim ivmesi</strong>, yani W = m × g. Dünya yüzeyinde g yaklaşık 9,81 m/s² olduğundan 70 kg kütleli biri yaklaşık 686 N ağırlığındadır. Aynı kişi Ay'a gittiğinde kütlesi yine 70 kg'dır, ama Ay'ın çekimi daha zayıf olduğu için ağırlığı 113,4 N'a düşer.`,
    ] },
    { h: 'Tartı başka gezegende ne gösterir?', p: [
      `Yaylı ya da elektronik bir banyo tartısı aslında kütleyi değil, üzerine binen kuvveti ölçer ve bu kuvveti Dünya'nın çekimine bölerek kilogram olarak gösterir. Tartıyı Ay'a götürürseniz üzerinize etki eden kuvvet azaldığı için daha küçük bir sayı okursunuz. Araçtaki "Tartının göstereceği değer" satırı tam olarak budur: oradaki ağırlığın standart yer çekimi ivmesine (9,80665 m/s²) bölünmüş hâli.`,
      `Eşit kollu bir terazi ise iki kefedeki kütleleri karşılaştırdığı için her gök cisminde aynı sonucu verir. Bu, kütle ile ağırlık arasındaki farkı gösteren güzel bir örnektir.`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `70 kg kütleli bir kişinin Ay'daki ağırlığını bulalım. Ay'ın yüzey çekim ivmesi 1,62 m/s² alınır. Ağırlık W = 70 × 1,62 = 113,4 N olur. Dünya'ya ayarlı bir tartı bu kuvveti 9,80665'e böler: 113,4 ÷ 9,80665 ≈ 11,56 kg. Yani Ay'da tartıya çıkan 70 kiloluk biri yaklaşık 11,5 kilo okur; bu, Dünya'daki değerin altıda biri kadardır.`,
      `Aynı hesabı Jüpiter için 50 kg kütleyle yapalım. Jüpiter için kabul edilen çekim ivmesi 24,79 m/s²'dir. W = 50 × 24,79 = 1.239,5 N, tartı değeri 1.239,5 ÷ 9,80665 ≈ 126,39 kg bulunur. Dünya'daki ağırlığın yaklaşık 2,5 katıdır.`,
    ] },
    { h: 'Kullanılan yüzey çekim ivmeleri', p: [
      `Araç, astronomi kaynaklarında yaygın olarak verilen yaklaşık yüzey çekim ivmelerini kullanır. Değerler ekvator ya da ortalama için yuvarlanmış sayılardır; kaynaktan kaynağa son basamakta küçük farklar görülebilir.`,
    ], ul: [
      `<strong>Merkür:</strong> 3,70 m/s² (Dünya'nın yaklaşık 0,38 katı)`,
      `<strong>Venüs:</strong> 8,87 m/s² (yaklaşık 0,90 katı)`,
      `<strong>Dünya:</strong> 9,80665 m/s² (standart değer)`,
      `<strong>Ay:</strong> 1,62 m/s² (yaklaşık 0,165 katı)`,
      `<strong>Mars:</strong> 3,71 m/s² (yaklaşık 0,38 katı)`,
      `<strong>Jüpiter:</strong> 24,79 m/s² (yaklaşık 2,53 katı)`,
      `<strong>Satürn:</strong> 10,44 m/s² (yaklaşık 1,06 katı)`,
      `<strong>Uranüs:</strong> 8,87 m/s² (yaklaşık 0,90 katı)`,
      `<strong>Neptün:</strong> 11,15 m/s² (yaklaşık 1,14 katı)`,
      `<strong>Plüton:</strong> 0,62 m/s² (yaklaşık 0,06 katı)`,
      `<strong>Güneş:</strong> 274 m/s² (yaklaşık 28 katı)`,
    ] },
    { h: 'Çekim ivmesi neye bağlıdır?', p: [
      `Bir gök cisminin yüzeyindeki çekim ivmesi, kütlesi ile yarıçapına bağlıdır: <strong>g = G × M ÷ R²</strong>. Kütle büyüdükçe çekim artar, yarıçap büyüdükçe yüzey merkezden uzaklaştığı için azalır. Bu yüzden sonuçlar her zaman sezgiye uymaz. Satürn, Dünya'dan onlarca kat daha kütleli olmasına karşın yarıçapı da çok büyük olduğundan çekim ivmesi Dünya'dakine yakındır. Uranüs'te ise ağırlığınız Dünya'dakinden biraz daha az çıkar.`,
      `Merkür ile Mars'ın değerlerinin neredeyse aynı olması da benzer bir dengenin sonucudur: Mars daha kütlelidir ama daha büyüktür, Merkür küçüktür ama yoğundur.`,
    ] },
    { h: 'Gaz devleri ve Güneş için not', p: [
      `Jüpiter, Satürn, Uranüs ve Neptün'ün üzerinde durabileceğiniz katı bir yüzeyi yoktur. Bu gezegenler için verilen çekim ivmesi, atmosfer basıncının yaklaşık Dünya deniz seviyesindeki basınca eşit olduğu bulut katmanı seviyesine göre tanımlanır. Güneş için de değer, görünür yüzey kabul edilen katmana aittir. Dolayısıyla bu satırlar "orada durabilseydiniz" varsayımıyla okunmalıdır.`,
      `Hesap, gök cisminin dönmesinden kaynaklanan merkezkaç etkisini, enlem ve yükseklik farklarını hesaba katmaz. Sonuçlar eğitim ve merak amaçlıdır.`,
    ] },
    { h: 'Nerelerde işe yarar?', p: [
      `Bu araç fen bilimleri ve fizik derslerinde kütle-ağırlık ayrımını somutlaştırmak için kullanışlıdır. Öğretmenler sınıfta her öğrencinin kendi kütlesiyle Ay ve Mars ağırlığını hesaplatabilir; proje ödevlerinde, bilim şenliği panolarında ve gökyüzü gözlem etkinliklerinde ilgi çekici bir karşılaştırma tablosu elde edilir. Bilim kurgu yazarları ve oyun tasarımcıları da farklı çekim ortamlarında bir yükün ne kadar kuvvet uygulayacağını hızlıca görmek için yararlanabilir.`,
    ] },
  ],
  faq: [
    ['Ay\'da kaç kilo gelirim?', `Ay'ın yüzey çekimi Dünya'nınkinin yaklaşık altıda biridir. Dünya'da 60 kilo gelen biri Ay'da tartıya çıktığında yaklaşık 9,9 kilo okur. Kütlesi ise yine 60 kilogramdır.`],
    ['Mars\'ta ağırlığım ne olur?', `Mars'ta çekim ivmesi 3,71 m/s² olduğundan ağırlığınız Dünya'dakinin yaklaşık yüzde 38'i olur. 100 kg kütleli biri Mars'ta 371 N ağırlığındadır ve tartıda yaklaşık 37,8 kilo görür.`],
    ['Hangi gezegende en ağır olurum?', `Güneş sistemindeki gezegenler arasında en yüksek çekim ivmesi Jüpiter'dedir; ağırlığınız Dünya'dakinin yaklaşık 2,5 katına çıkar. Listede Güneş de yer alır ve orada değer Dünya'dakinin yaklaşık 28 katıdır.`],
    ['Başka gezegende kütlem değişir mi?', `Hayır. Kütle madde miktarıdır ve bulunduğunuz yere bağlı değildir. Değişen, gök cisminin size uyguladığı çekim kuvveti, yani ağırlıktır.`],
    ['Satürn çok büyük olduğu hâlde ağırlık neden az değişiyor?', `Yüzey çekimi yalnızca kütleye değil yarıçapın karesine de bağlıdır. Satürn çok kütlelidir ama yarıçapı da çok büyüktür; iki etki birbirini büyük ölçüde dengeler ve çekim ivmesi Dünya'dakine yakın çıkar.`],
    ['Uzay istasyonundaki astronotlar neden ağırlıksız görünür?', `İstasyonun bulunduğu yükseklikte Dünya'nın çekimi hâlâ güçlüdür. Astronotlar istasyonla birlikte sürekli serbest düşme hâlinde oldukları için tartıya kuvvet uygulamazlar ve ağırlıksızlık hissederler. Bu araç yüzeyde durma durumunu hesaplar.`],
    ['Sonuç neden hem newton hem kilogram olarak veriliyor?', `Newton, ağırlık kuvvetinin gerçek birimidir. Kilogram cinsinden değer ise gündelik alışkanlığa uygun bir karşılaştırma sunar: Dünya'ya göre ayarlı bir tartının orada göstereceği sayıdır.`],
    ['Girdiğim kilo bilgisi kaydediliyor mu?', `Hayır. Hesap tarayıcınızda yapılır; yazdığınız değer hiçbir sunucuya gönderilmez ve saklanmaz.`],
  ],
  related: ['kutle-agirlik-hesapla', 'kutle-cekim-kuvveti-hesapla', 'kacis-hizi-hesapla', 'serbest-dusme-hesapla', 'yorunge-periyodu-hesapla'],
};
