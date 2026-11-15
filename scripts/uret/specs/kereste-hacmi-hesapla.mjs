export default {
  slug: 'kereste-hacmi-hesapla',
  title: 'Kereste Hacmi Hesaplama',
  h1Tail: 'metreküp ve tutar',
  pageTitle: 'Kereste Hacmi Hesaplama – Metreküp (m³) ve Tutar Hesabı',
  description: 'Kalınlık, genişlik, boy ve adet girerek kerestenin toplam hacmini metreküp olarak bulun. Metreküp fiyatı yazarsanız toplam tutarı ve parça başı maliyeti de görün.',
  card: 'Kalınlık, genişlik, boy ve adetten kereste hacmini metreküp olarak bulun; m³ fiyatıyla tutarı hesaplayın.',
  category: 'insaat',
  keywords: ['kereste hacmi hesaplama', 'kereste metreküp hesaplama', 'kereste m3 hesabı', 'tahta metreküp hesaplama', '1 metreküp kereste kaç adet', 'kereste fiyat hesaplama', 'kalas hacmi'],
  lead: `Kereste, kalas, lata ve tahta gibi biçilmiş ahşabın hacmini <strong>metreküp (m³)</strong> olarak hesaplayın. Kesit ölçülerini santimetre, boyu metre olarak girin; araç tek parçanın ve tüm partinin hacmini, toplam metretülü ve isterseniz tutarı verir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'kalinlik', label: 'Kalınlık (cm)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'genislik', label: 'Genişlik (cm)', type: 'number', placeholder: 'Örn. 10' },
    { id: 'boy', label: 'Boy (m)', type: 'number', placeholder: 'Örn. 4' },
    { id: 'adet', label: 'Adet', type: 'number', value: '1' },
    { id: 'fiyat', label: 'Metreküp fiyatı (TL, isteğe bağlı)', type: 'number', placeholder: 'Örn. 15000', hint: 'Binlik ayraç kullanmayın ya da 15.000,00 biçiminde yazın.' },
  ],
  compute(v, h) {
    const k = h.pos(v.kalinlik, 'Kalınlık');
    const g = h.pos(v.genislik, 'Genişlik');
    const b = h.pos(v.boy, 'Boy');
    const n = h.posint(v.adet, 'Adet');
    const fiyat = h.opt(v.fiyat, null, 'Metreküp fiyatı');
    if (fiyat !== null && fiyat < 0) h.err('"Metreküp fiyatı" negatif olamaz.');
    const tek = (k / 100) * (g / 100) * b;
    const toplam = tek * n;
    const rows = [
      ['Toplam hacim', h.fmt(toplam, 4) + ' m³'],
      ['Tek parça hacmi', h.fmt(tek, 5) + ' m³'],
      ['Toplam hacim (dm³)', h.fmt(toplam * 1000, 1) + ' dm³'],
      ['Toplam uzunluk', h.fmt(b * n, 2) + ' m (metretül)'],
      ['Geniş yüzey alanı (tek yüz)', h.fmt((g / 100) * b * n, 2) + ' m²'],
      ['1 m³ içindeki parça sayısı', h.fmt(1 / tek, 1) + ' adet'],
    ];
    if (fiyat !== null) {
      rows.push(['Toplam tutar', h.para(toplam * fiyat)]);
      rows.push(['Parça başı maliyet', h.para(tek * fiyat)]);
    }
    return { rows, note: 'Hacim = kalınlık × genişlik × boy × adet. Nominal ölçüler kullanılır; rendeleme ve kuruma payı ayrıca düşülmez.' };
  },
  cases: [
    { in: { kalinlik: '5', genislik: '10', boy: '4', adet: '10' }, out: { 'Toplam hacim': '0,2 m³', 'Tek parça hacmi': '0,02 m³', 'Toplam uzunluk': '40 m (metretül)', '1 m³ içindeki parça sayısı': '50 adet' } },
    { in: { kalinlik: '2,5', genislik: '15', boy: '3', adet: '20' }, out: { 'Toplam hacim': '0,225 m³', 'Tek parça hacmi': '0,01125 m³', 'Geniş yüzey alanı (tek yüz)': '9 m²' } },
    { in: { kalinlik: '5', genislik: '20', boy: '4', adet: '50', fiyat: '15000' }, out: { 'Toplam hacim': '2 m³', 'Toplam tutar': '30.000,00 TL', 'Parça başı maliyet': '600,00 TL' } },
    { in: { kalinlik: '10', genislik: '10', boy: '4', adet: '1' }, out: { 'Toplam hacim': '0,04 m³', 'Toplam hacim (dm³)': '40 dm³', '1 m³ içindeki parça sayısı': '25 adet' } },
    { in: { kalinlik: '5', genislik: '5', boy: '3', adet: '100' }, out: { 'Toplam hacim': '0,75 m³', 'Toplam uzunluk': '300 m (metretül)' } },
    { in: { kalinlik: '2', genislik: '10', boy: '2,5', adet: '8', fiyat: '20000' }, out: { 'Toplam hacim': '0,04 m³', 'Toplam tutar': '800,00 TL' } },
    { in: { kalinlik: '5', genislik: '10', boy: '4', adet: '0' }, error: true },
    { in: { kalinlik: '-5', genislik: '10', boy: '4', adet: '2' }, error: true },
  ],
  howto: [
    'Kerestenin kalınlığını ve genişliğini santimetre olarak yazın. Milimetre ölçüsü varsa ona bölün: 25 mm = 2,5 cm.',
    'Parçanın boyunu metre olarak girin; 4 metrelik standart boy için 4, 2,5 metre için 2,5 yazın.',
    'Aynı ölçüdeki parça sayısını "Adet" alanına girin. Farklı ölçüler için hesabı ayrı ayrı yapıp sonuçları toplayın.',
    'Satıcının verdiği metreküp fiyatını isteğe bağlı alana yazarsanız toplam tutarı ve parça başı maliyeti de görürsünüz.',
    '"Hesapla" düğmesine basın ve sonuçları "Sonucu kopyala" ile sipariş listenize aktarın.',
  ],
  sections: [
    { h: 'Kereste hacmi nasıl hesaplanır?', p: [
      `Biçilmiş kereste dikdörtgen kesitli bir prizmadır; hacmi üç ölçünün çarpımıdır. Kereste ticaretinde kesit santimetre (ya da milimetre), boy metre olarak söylendiği için önce birimleri eşitlemek gerekir: <strong>hacim (m³) = kalınlık (cm) ÷ 100 × genişlik (cm) ÷ 100 × boy (m) × adet</strong>. Aynı işlemi tek adımda yapmak isterseniz kalınlık × genişlik × boy çarpımını 10.000'e bölmeniz yeterlidir.`,
      `Örneğin "5'e 10" diye anılan 5 cm × 10 cm kesitli, 4 m boyundaki bir kalasın hacmi 0,05 × 0,10 × 4 = 0,02 m³'tür. Bu parçadan 10 adet alındığında toplam 0,2 m³ eder. Tersinden bakılırsa 1 m³ içinde bu ölçüden 1 ÷ 0,02 = 50 adet bulunur; araç bu değeri de "1 m³ içindeki parça sayısı" satırında gösterir.`,
    ] },
    { h: 'Metreküp fiyatından tutara geçiş', p: [
      `Kereste çoğunlukla metreküp fiyatıyla satılır; müşterinin aklındaki soru ise genellikle "bu kadar tahta kaç lira tutar" ya da "bir tanesi kaça geliyor" olur. Hesap basittir: toplam hacim metreküp fiyatıyla çarpılır. 5 cm × 20 cm × 4 m ölçüsünde 50 adet kalas 0,04 × 50 = 2 m³ eder; metreküpü 15.000 TL ise tutar 30.000 TL, parça başı maliyet 600 TL olur.`,
      `Fiyatlar ağaç türüne, kalite sınıfına, kuruluk derecesine, rendeli ya da kaba olmasına ve piyasaya göre sürekli değişir. Bu nedenle araçta sabit bir fiyat yoktur; güncel teklifi satıcınızdan alıp kutuya siz yazarsınız. Teklifte KDV'nin dahil olup olmadığını ve nakliyenin kimde olduğunu ayrıca sorun.`,
    ] },
    { h: 'Metretül, metrekare ve metreküp farkı', p: [
      `Ahşap malzeme üç farklı birimle satılabilir ve karıştırılması en sık yapılan hatadır. <strong>Metretül</strong> yalnızca uzunluktur; çıta, süpürgelik ve pervaz gibi ürünlerde kullanılır. <strong>Metrekare</strong> yüzey alanıdır; lambri, döşeme tahtası, kontrplak ve OSB gibi kaplama malzemelerinde geçerlidir. <strong>Metreküp</strong> ise hacimdir ve kalas, kiriş, lata gibi yapısal kerestede esas alınır.`,
      `Araç üçünü de verir: "Toplam uzunluk" satırı metretülü, "Geniş yüzey alanı" satırı parçalar yan yana dizildiğinde kaplanan tek yüz alanını, "Toplam hacim" ise metreküpü gösterir. Böylece metrekare fiyatı verilen bir teklifi metreküp fiyatıyla karşılaştırabilirsiniz: 2,5 cm kalınlığındaki bir tahtanın 1 m³'ü 40 m² yüzey eder.`,
    ] },
    { h: 'Sık kullanılan kesitlerde 1 m³ kaç adet eder?', ul: [
      '<strong>5 × 10 cm, 4 m:</strong> parça 0,02 m³ → 1 m³ = 50 adet',
      '<strong>5 × 5 cm, 4 m:</strong> parça 0,01 m³ → 1 m³ = 100 adet',
      '<strong>10 × 10 cm, 4 m:</strong> parça 0,04 m³ → 1 m³ = 25 adet',
      '<strong>5 × 20 cm, 4 m:</strong> parça 0,04 m³ → 1 m³ = 25 adet',
      '<strong>2,5 × 15 cm, 4 m:</strong> parça 0,015 m³ → 1 m³ yaklaşık 66,7 adet',
      '<strong>2,5 × 10 cm, 3 m:</strong> parça 0,0075 m³ → 1 m³ yaklaşık 133,3 adet',
    ] },
    { h: 'Nominal ölçü, rende ve fire payı', p: [
      `Kereste ölçüleri çoğu zaman <strong>nominal</strong>, yani biçildiği andaki kaba ölçüdür. Kurutma sırasında ahşap bir miktar çeker; rendelendiğinde her yüzden birkaç milimetre daha eksilir. "5'e 10" olarak satılan rendeli bir parçayı ölçtüğünüzde 4,5 × 9,5 cm civarında bulmanız olağandır. Satış faturası genellikle nominal ölçü üzerinden kesilir; bu yüzden hacmi hangi ölçüyle hesapladığınızı satıcıyla aynı tutun.`,
      `İşe başlamadan önce fire payını da ekleyin. Budaklı, çatlak ya da eğri parçalar ayıklanacak, boy kesimlerinden artık kalacaktır. Düz işlerde %5–10, çok kesimli çatı ve pergola işlerinde daha yüksek bir pay bırakmak yaygın bir uygulamadır. Parça boylarını kullanım yerine göre seçmek (örneğin 2,4 m'lik dikmeler için 2,5 m boy almak) fireyi belirgin biçimde azaltır.`,
    ] },
    { h: 'Yuvarlak tomruk ve ağırlık hakkında', p: [
      `Bu araç dikdörtgen kesitli biçilmiş kereste içindir. Yuvarlak tomruğun hacmi orta çap üzerinden silindir formülüyle (π × yarıçap² × boy) hesaplanır ve kabuk payı ayrıca değerlendirilir; sonuçlar bu sayfadaki hesapla karşılaştırılamaz. Kerestenin ağırlığı ise ağaç türüne ve nem oranına göre geniş bir aralıkta değişir; yaş çam ile fırınlanmış meşe arasında birkaç kat fark olabilir. Nakliye için ağırlık gerekiyorsa satıcıdan o partinin yoğunluk bilgisini isteyin.`,
      `Sonuçlar bilgilendirme amaçlıdır. Taşıyıcı ahşap elemanların kesit seçimi hacim hesabıyla değil statik hesapla yapılır; çatı, döşeme ve taşıyıcı karkas işlerinde bir inşaat mühendisine danışın.`,
    ] },
  ],
  faq: [
    ['1 metreküp kereste kaç adet eder?', 'Parçanın ölçüsüne bağlıdır. 1 m³\'ü tek parçanın hacmine bölersiniz. 5 × 10 cm kesitli 4 m\'lik kalastan 50 adet, 10 × 10 cm kesitli 4 m\'lik kirişten 25 adet, 5 × 5 cm kesitli 4 m\'lik latadan 100 adet 1 m³ eder.'],
    ['Kereste metreküp hesabı formülü nedir?', 'Kalınlık (cm) × genişlik (cm) × boy (m) ÷ 10.000 işlemi tek parçanın hacmini metreküp olarak verir. Adetle çarparak toplam hacme ulaşırsınız.'],
    ['Ölçüleri milimetre olarak girebilir miyim?', 'Kesit alanları santimetre bekler. Milimetre değerini 10\'a bölerek yazın: 22 mm için 2,2, 145 mm için 14,5. Boy alanı metre cinsindendir.'],
    ['Farklı boylardaki parçaları nasıl hesaplarım?', 'Her ölçü grubu için hesabı ayrı çalıştırın ve bulduğunuz metreküp değerlerini toplayın. Kesit aynı, yalnızca boylar farklıysa toplam metretülü tek parça gibi "Boy" alanına yazıp adedi 1 bırakabilirsiniz.'],
    ['Metrekare fiyatını metreküp fiyatına nasıl çeviririm?', 'Metrekare fiyatını metre cinsinden kalınlığa bölün. 2,5 cm (0,025 m) kalınlığındaki tahta için metrekare fiyatı 0,025\'e bölündüğünde metreküp fiyatı bulunur; çünkü bu kalınlıkta 1 m³ tam 40 m² eder.'],
    ['Hesaplanan hacim rendeli keresteyi kapsar mı?', 'Araç girdiğiniz ölçüyü aynen kullanır. Nominal ölçüyü yazarsanız satış hacmini, parçayı ölçüp gerçek ölçüyü yazarsanız net ahşap hacmini bulursunuz. Fatura hangi ölçüye göre kesiliyorsa onu kullanın.'],
    ['Dm³ satırı ne işe yarar?', 'Desimetreküp litreyle aynı büyüklüktedir ve küçük partilerde okunması daha kolaydır. 0,04 m³ yerine 40 dm³ demek, özellikle hobi ve mobilya işlerinde miktarı daha anlaşılır kılar.'],
    ['Girdiğim ölçü ve fiyat bilgileri kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; ölçüler ve fiyat hiçbir sunucuya gönderilmez, saklanmaz.'],
  ],
  related: ['osb-kontrplak-hesapla', 'parke-hesapla', 'cit-hesapla', 'cati-alani-hesapla', 'civi-vida-hesapla'],
};
