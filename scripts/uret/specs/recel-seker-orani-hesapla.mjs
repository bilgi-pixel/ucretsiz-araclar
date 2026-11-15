export default {
  slug: 'recel-seker-orani-hesapla',
  title: 'Reçel Şeker Oranı Hesaplama',
  h1Tail: 'meyveye göre şeker miktarı',
  pageTitle: 'Reçel Şeker Oranı Hesaplama – 1 Kilo Meyveye Kaç Gram Şeker?',
  description: 'Meyve miktarını ve şeker oranını girin; reçel ya da marmelat için gereken şekeri gram olarak hesaplayın. Elinizdeki şekere göre meyve miktarını da bulabilirsiniz.',
  card: 'Reçel ve marmelat için meyve ağırlığına ve seçtiğiniz orana göre gereken şekeri gram olarak hesaplayın.',
  category: 'gunluk',
  keywords: ['reçel şeker oranı', '1 kilo meyveye kaç gram şeker', 'reçel şeker hesaplama', 'az şekerli reçel oranı', 'marmelat şeker oranı', 'reçel ölçüsü', 'çilek reçeli şeker miktarı'],
  lead: 'Temizlenmiş meyvenin ağırlığını ve kullanmak istediğiniz şeker oranını yazın; araç <strong>kaç gram şeker</strong> tartmanız gerektiğini, tencereye girecek toplam karışımı ve şekerin bu karışımdaki payını hesaplar. Elinizdeki şeker belliyse tersinden meyve miktarını da verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'bilinen', label: 'Bildiğim miktar', type: 'select', options: [['meyve', 'Meyve (temizlenmiş)'], ['seker', 'Şeker']] },
    { id: 'miktar', label: 'Miktar (kg)', type: 'number', placeholder: 'Örn. 2' },
    { id: 'oran', label: 'Şeker oranı (meyve ağırlığının %\'si)', type: 'number', value: '100', hint: '100 = bire bir (1 kg meyveye 1 kg şeker), 75 = 1 kg meyveye 750 g şeker.' },
  ],
  compute(v, h) {
    const q = h.pos(v.miktar, 'Miktar') * 1000;
    const p = h.pos(v.oran, 'Şeker oranı');
    if (p > 200) h.err('Şeker oranı %200\'den büyük olamaz. Reçellerde oran çoğunlukla %50 ile %120 arasındadır.');
    const meyve = v.bilinen === 'seker' ? q * 100 / p : q;
    const seker = v.bilinen === 'seker' ? q : q * p / 100;
    const toplam = meyve + seker;
    return {
      rows: [
        v.bilinen === 'seker' ? ['Gereken meyve', h.fmt(meyve, 0) + ' g'] : ['Gereken şeker', h.fmt(seker, 0) + ' g'],
        v.bilinen === 'seker' ? ['Şeker', h.fmt(seker, 0) + ' g'] : ['Meyve', h.fmt(meyve, 0) + ' g'],
        ['Tenceredeki ham karışım', h.fmt(toplam, 0) + ' g'],
        ['Eklenen şekerin karışımdaki payı', '%' + h.fmt(seker / toplam * 100, 2)],
        ['Meyve : şeker', '1 : ' + h.fmt(p / 100, 2)],
      ],
      note: 'Meyve ağırlığı; sap, çekirdek ve kabuk ayıklandıktan sonraki net ağırlıktır. Pişme sırasında su buharlaştığı için bitmiş reçel ham karışımdan hafif olur.',
    };
  },
  cases: [
    { in: { bilinen: 'meyve', miktar: '2', oran: '75' }, out: { 'Gereken şeker': '1.500 g', 'Meyve': '2.000 g', 'Tenceredeki ham karışım': '3.500 g', 'Eklenen şekerin karışımdaki payı': '%42,86', 'Meyve : şeker': '1 : 0,75' } },
    { in: { bilinen: 'meyve', miktar: '1', oran: '100' }, out: { 'Gereken şeker': '1.000 g', 'Tenceredeki ham karışım': '2.000 g', 'Eklenen şekerin karışımdaki payı': '%50', 'Meyve : şeker': '1 : 1' } },
    { in: { bilinen: 'seker', miktar: '1', oran: '50' }, out: { 'Gereken meyve': '2.000 g', 'Şeker': '1.000 g', 'Tenceredeki ham karışım': '3.000 g', 'Eklenen şekerin karışımdaki payı': '%33,33' } },
    { in: { bilinen: 'meyve', miktar: '3', oran: '60' }, out: { 'Gereken şeker': '1.800 g', 'Tenceredeki ham karışım': '4.800 g', 'Eklenen şekerin karışımdaki payı': '%37,5' } },
    { in: { bilinen: 'meyve', miktar: '0,5', oran: '80' }, out: { 'Gereken şeker': '400 g', 'Tenceredeki ham karışım': '900 g', 'Eklenen şekerin karışımdaki payı': '%44,44' } },
    { in: { bilinen: 'seker', miktar: '1,5', oran: '75' }, out: { 'Gereken meyve': '2.000 g', 'Tenceredeki ham karışım': '3.500 g' } },
    { in: { bilinen: 'meyve', miktar: '2', oran: '0' }, error: true },
    { in: { bilinen: 'meyve', miktar: '2', oran: '350' }, error: true },
    { in: { bilinen: 'meyve', miktar: 'iki', oran: '75' }, error: true },
  ],
  howto: [
    'Meyveyi yıkayın, sapını, çekirdeğini ve kullanmayacağınız kabuğunu ayıklayın, sonra tartın. Hesapta bu net ağırlık kullanılır.',
    '"Bildiğim miktar" listesinden meyveyi mi yoksa şekeri mi bildiğinizi seçin ve miktarı kilogram olarak yazın.',
    'Şeker oranını girin: bire bir reçel için 100, daha az şekerli için 75 ya da 60 gibi bir değer.',
    '"Hesapla" düğmesine basın; gereken şeker ya da meyve gram olarak, ham karışımın toplamıyla birlikte gösterilir.',
  ],
  sections: [
    { h: 'Reçelde şeker oranı nasıl ifade edilir?', p: [
      'Ev reçellerinde oran neredeyse her zaman <strong>meyvenin ağırlığına göre</strong> söylenir: "bir kilo meyveye bir kilo şeker" bire bir, yani %100 orandır; "bir kiloya 750 gram" %75 eder. Araç bu alışkanlığı izler ve formülü çok yalındır: <strong>şeker = meyve × oran ÷ 100</strong>. Elinizde belirli miktarda şeker varsa hesap tersine döner: <strong>meyve = şeker × 100 ÷ oran</strong>.',
      'Sonuçlardaki "eklenen şekerin karışımdaki payı" başka bir bakıştır: şekerin, meyve ile şekerin toplamı içindeki yüzdesini gösterir. Bire bir oranda bu pay %50\'dir; %75 oranında %42,86\'ya, %50 oranında %33,33\'e iner. Meyvenin kendi doğal şekeri bu sayıya dahil değildir ve pişme sırasında su buharlaştıkça bitmiş reçeldeki şeker yoğunluğu ham karışımdakinden daha yüksek olur.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Sapları ayıklanmış 2 kilogram çileğiniz olsun ve %75 oranında şeker kullanmak isteyin. Gereken şeker 2.000 × 75 ÷ 100 = <strong>1.500 gram</strong> olur. Tencereye toplam 3.500 gram karışım girer ve eklenen şekerin payı 1.500 ÷ 3.500 = %42,86\'dır.',
      'Tersine bir örnek: dolapta 1,5 kilogram şeker var ve aynı %75 oranını kullanacaksınız. Alabileceğiniz meyve 1.500 × 100 ÷ 75 = <strong>2.000 gram</strong> temizlenmiş meyvedir. Pazardan alırken ayıklama kaybını hesaba katıp biraz fazlasını almak gerekir; kayıp meyveden meyveye çok değişir, çekirdekli ve kalın kabuklu meyvelerde daha yüksektir.',
    ] },
    { h: 'Şeker reçelde ne işe yarar?', p: [
      'Şeker yalnızca tatlandırıcı değildir. Meyvenin suyunu çekerek şurubu oluşturur, meyvedeki pektinin jel yapmasına yardım ederek kıvamı sağlar ve suyu bağlayarak reçelin daha uzun dayanmasına katkı verir. Bu yüzden şekeri azaltmak yalnızca tadı değil, kıvamı ve saklama süresini de etkiler.',
      'Geleneksel bire bir oran, kilerde uzun süre bekleyecek koyu kıvamlı reçeller için kullanılır. Oran düştükçe meyve tadı öne çıkar, ancak reçel daha akışkan olur ve açıldıktan sonra buzdolabında saklanıp daha kısa sürede tüketilmesi gerekir. Kıvamı toparlamak için pişirme süresini uzatmak, limon suyu eklemek ya da pektin kullanmak yaygın yollardır; pektinli hazır karışımlarda üreticinin verdiği orana uyulmalıdır.',
    ] },
    { h: 'Oran seçerken meyvenin etkisi', ul: [
      '<strong>Ekşi ve pektini yüksek meyveler</strong> (ayva, vişne, ekşi elma, turunç kabuğu): şekeri iyi taşır ve kolay kıvam alır.',
      '<strong>Tatlı ve sulu meyveler</strong> (çilek, şeftali, incir): daha az şekerle de lezzetli olur, ancak kıvam için daha uzun pişirme ya da limon gerekebilir.',
      '<strong>Olgunluk</strong>: çok olgun meyvede pektin azalır; tam olgun ile az olgun meyveyi karıştırmak kıvama yardım eder.',
      '<strong>Marmelat</strong>: meyve ezildiği için daha çabuk koyulaşır; reçele göre biraz daha düşük oranlar tercih edilebilir.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Meyveyi ayıklamadan tartmak: sap ve çekirdek ağırlığı şekeri gereğinden fazla hesaplamanıza yol açar.',
      'Şekeri su bardağıyla ölçmek: bardağın doluluğu ve şekerin tane iriliği sonucu değiştirir; terazi kullanın.',
      'Şekeri azaltıp pişirme süresini aynı bırakmak: karışım sulu kalır. Kıvamı soğuk tabağa damlatarak denetleyin.',
      'Büyük partiyi tek tencerede pişirmek: kalın katmanda su geç buharlaşır, meyve dağılır ve renk koyulaşır. Geniş tencerede küçük partiler daha iyi sonuç verir.',
      'Az şekerli reçeli oda sıcaklığında uzun süre saklamak: şeker azaldıkça dayanıklılık düşer.',
    ] },
    { h: 'Sınırlar ve saklama', p: [
      'Araç yalnızca tartı hesabı yapar; kıvam, pişme süresi ve bitmiş reçelin ağırlığı meyvenin su oranına, tencerenin genişliğine ve ateşe bağlıdır. Bitmiş ürün ham karışımdan belirgin biçimde hafif olur, bu yüzden kavanoz sayısını ham ağırlığa göre değil deneyiminize göre planlayın.',
      'Sonuçlar bilgilendirme amaçlıdır. Kavanozların ve kapakların temizliği, sıcak dolum ve serin, karanlık yerde saklama, reçelin güvenle dayanması için orandan bağımsız olarak gereklidir. Küflenmiş ya da ekşimiş reçeli tüketmeyin. Şeker tüketimini sınırlamanız gereken bir sağlık durumunuz varsa hekiminize ya da diyetisyeninize danışın.',
    ] },
  ],
  faq: [
    ['1 kilo meyveye kaç gram şeker konur?', 'Geleneksel bire bir oranda 1.000 gram şeker konur. Daha hafif bir reçel için %75 oranında 750 gram, %60 oranında 600 gram şeker kullanılır. Oran düştükçe kıvam ve dayanıklılık azalır.'],
    ['Şeker oranı meyvenin hangi ağırlığına göre hesaplanır?', 'Ayıklanmış net ağırlığa göre. Sapları, çekirdekleri ve kullanılmayacak kabukları çıkardıktan sonra tartın ve o değeri girin.'],
    ['Elimdeki şekere göre ne kadar meyve almalıyım?', '"Bildiğim miktar" listesinden şekeri seçip miktarını ve oranı yazın. Örneğin 1 kilogram şeker ve %50 oran için 2 kilogram temizlenmiş meyve gerekir.'],
    ['Az şekerli reçel yaparsam ne değişir?', 'Meyve tadı belirginleşir, ancak reçel daha akışkan olur ve daha çabuk bozulur. Açıldıktan sonra buzdolabında saklamak ve kısa sürede tüketmek gerekir.'],
    ['Karışımdaki şeker payı neden oran ile aynı değil?', 'Oran, şekerin meyveye bölümüdür; pay ise şekerin meyve ve şeker toplamına bölümüdür. %100 oran, karışımın yarısının şeker olduğu anlamına gelir, yani pay %50\'dir.'],
    ['Bitmiş reçel kaç gram gelir?', 'Araç bunu hesaplamaz, çünkü buharlaşan su miktarı pişirme süresine ve meyveye göre değişir. Ham karışım ağırlığı bir üst sınırdır; bitmiş reçel her zaman bundan hafiftir.'],
    ['Limon suyu ya da su eklersem hesap değişir mi?', 'Şeker hesabı meyve ağırlığı üzerinden yapıldığı için değişmez. Eklenen su pişme sırasında buharlaşır; limon suyu ise az miktarda kullanıldığından oranı anlamlı biçimde etkilemez.'],
    ['Girdiğim değerler bir yere kaydediliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; yazdığınız miktarlar sunucuya gönderilmez.'],
  ],
  related: ['tarif-olcekle', 'mutfak-olcu-donustur', 'su-bardagi-gram-cevir', 'salamura-tuz-orani-hesapla', 'oran-oranti-hesapla', 'yuzde-hesapla'],
};
