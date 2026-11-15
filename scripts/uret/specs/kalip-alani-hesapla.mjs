export default {
  slug: 'kalip-alani-hesapla',
  title: 'Kalıp Alanı Hesaplama',
  h1Tail: 'kolon, kiriş, döşeme, perde',
  pageTitle: 'Kalıp Alanı Hesaplama – Kolon, Kiriş, Döşeme ve Perde Kalıbı m²',
  description: 'Kolon, kiriş, döşeme, perde ve temel için beton kalıbı alanını metrekare olarak hesaplayın; fire payını ve yaklaşık plywood levha sayısını görün.',
  card: 'Kolon, kiriş, döşeme, perde ve temel kalıbı alanını metrekare olarak hesaplayın; plywood levha sayısını görün.',
  category: 'insaat',
  keywords: ['kalıp alanı hesaplama', 'kalıp metrajı hesabı', 'kolon kalıbı m2', 'kiriş kalıbı hesaplama', 'döşeme kalıbı alanı', 'perde kalıbı hesabı', 'plywood hesaplama', 'kalıp m2 hesabı'],
  lead: `Kalıbı yapılacak elemanı seçin ve ölçülerini metre olarak yazın. Araç betonla temas eden yüzeyi, yani <strong>kalıp alanını metrekare olarak</strong> hesaplar; fire payını ekler ve 125 × 250 cm levhalardan yaklaşık kaç adet gerektiğini gösterir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'eleman', label: 'Eleman', type: 'select', options: [['kolon', 'Kolon (dört yan yüz)'], ['kiris', 'Kiriş (alt + iki yan)'], ['doseme', 'Döşeme (alt yüzey)'], ['perde', 'Perde duvar (iki yüz)'], ['temel', 'Temel (yan yüzler)']] },
    { id: 'olcuA', label: 'Ölçü A (m)', type: 'number', placeholder: 'Örn. 0,3', hint: 'Kolon/temel: kesit eni · Kiriş: alt genişlik · Döşeme: en · Perde: uzunluk.' },
    { id: 'olcuB', label: 'Ölçü B (m)', type: 'number', placeholder: 'Örn. 0,6', hint: 'Kolon/temel: kesit boyu · Kiriş: yan yüz yüksekliği · Döşeme: boy · Perdede boş bırakın.' },
    { id: 'yukseklik', label: 'Yükseklik / uzunluk (m)', type: 'number', placeholder: 'Örn. 3', hint: 'Kolon, perde, temel: yükseklik · Kiriş: uzunluk · Döşemede boş bırakın.' },
    { id: 'adet', label: 'Adet', type: 'number', value: '1' },
    { id: 'fire', label: 'Fire payı (%)', type: 'number', value: '5' },
  ],
  compute(v, h) {
    const adet = h.posint(v.adet, 'Adet');
    const fire = h.nonneg(v.fire, 'Fire payı');
    const a = h.pos(v.olcuA, 'Ölçü A');
    let tek;
    let aciklama;
    if (v.eleman === 'kolon' || v.eleman === 'temel') {
      const b = h.pos(v.olcuB, 'Ölçü B');
      const y = h.pos(v.yukseklik, 'Yükseklik');
      tek = 2 * (a + b) * y;
      aciklama = v.eleman === 'kolon' ? 'Kolon: 2 × (A + B) × yükseklik' : 'Temel yan yüzleri: 2 × (A + B) × yükseklik';
    } else if (v.eleman === 'kiris') {
      const b = h.pos(v.olcuB, 'Ölçü B');
      const y = h.pos(v.yukseklik, 'Uzunluk');
      tek = (a + 2 * b) * y;
      aciklama = 'Kiriş: (A + 2 × B) × uzunluk';
    } else if (v.eleman === 'doseme') {
      const b = h.pos(v.olcuB, 'Ölçü B');
      tek = a * b;
      aciklama = 'Döşeme: A × B';
    } else if (v.eleman === 'perde') {
      const y = h.pos(v.yukseklik, 'Yükseklik');
      tek = 2 * a * y;
      aciklama = 'Perde: 2 × uzunluk × yükseklik';
    } else {
      h.err('Elemanı listeden seçin.');
    }
    const net = tek * adet;
    const toplam = net * (1 + fire / 100);
    const LEVHA = 1.25 * 2.5; // m²
    const levha = Math.ceil(toplam / LEVHA - 1e-9);
    return {
      rows: [
        ['Kalıp alanı', h.fmt(toplam, 2) + ' m²'],
        ['Net kalıp alanı', h.fmt(net, 2) + ' m²'],
        ['Tek eleman', h.fmt(tek, 2) + ' m²'],
        ['Yaklaşık plywood', `${h.fmt(levha, 0)} levha (125 × 250 cm)`],
        ['Kullanılan formül', aciklama],
      ],
      note: 'Levha sayısı yalnızca toplam alanın 3,125 m² levha alanına bölünmesiyle bulunur; kesim planı, kuşak, dikme ve iskele malzemesi dahil değildir.',
    };
  },
  cases: [
    { in: { eleman: 'kolon', olcuA: '0,3', olcuB: '0,6', yukseklik: '3', adet: '10', fire: '0' }, out: { 'Kalıp alanı': '54 m²', 'Tek eleman': '5,4 m²', 'Yaklaşık plywood': '18 levha (125 × 250 cm)' } },
    { in: { eleman: 'doseme', olcuA: '5', olcuB: '4', fire: '10' }, out: { 'Kalıp alanı': '22 m²', 'Net kalıp alanı': '20 m²', 'Yaklaşık plywood': '8 levha (125 × 250 cm)' } },
    { in: { eleman: 'kiris', olcuA: '0,25', olcuB: '0,4', yukseklik: '5', adet: '4' }, out: { 'Kalıp alanı': '22,05 m²', 'Net kalıp alanı': '21 m²', 'Tek eleman': '5,25 m²' } },
    { in: { eleman: 'perde', olcuA: '6', yukseklik: '3', adet: '2', fire: '0' }, out: { 'Kalıp alanı': '72 m²', 'Tek eleman': '36 m²', 'Yaklaşık plywood': '24 levha (125 × 250 cm)' } },
    { in: { eleman: 'kolon', olcuA: '0,4', olcuB: '0,4', yukseklik: '2,8', adet: '8' }, out: { 'Kalıp alanı': '37,63 m²', 'Net kalıp alanı': '35,84 m²', 'Tek eleman': '4,48 m²' } },
    { in: { eleman: 'temel', olcuA: '1,5', olcuB: '1,5', yukseklik: '0,4', adet: '12', fire: '0' }, out: { 'Kalıp alanı': '28,8 m²', 'Tek eleman': '2,4 m²', 'Yaklaşık plywood': '10 levha (125 × 250 cm)' } },
    { in: { eleman: 'doseme', olcuA: '10', olcuB: '12' }, out: { 'Kalıp alanı': '126 m²', 'Net kalıp alanı': '120 m²', 'Yaklaşık plywood': '41 levha (125 × 250 cm)' } },
    { in: { eleman: 'kolon', olcuA: '0,3', olcuB: '0,6', yukseklik: '' }, error: true },
    { in: { eleman: 'doseme', olcuA: '5', olcuB: '' }, error: true },
    { in: { eleman: 'perde', olcuA: '-6', yukseklik: '3' }, error: true },
  ],
  howto: [
    `"Eleman" listesinden kalıbını hesaplayacağınız yapı elemanını seçin: kolon, kiriş, döşeme, perde duvar ya da temel.`,
    `Ölçüleri metre olarak yazın. Her alanın altındaki açıklama, seçtiğiniz eleman için o kutuya hangi ölçünün girileceğini söyler; 30 cm için 0,3 yazılır.`,
    `Aynı ölçüde birden fazla eleman varsa adedi girin. Fire payını gerekirse değiştirin.`,
    `"Hesapla" düğmesine basın; fire dahil kalıp alanı, net alan, tek elemanın alanı ve yaklaşık levha sayısı görüntülenir.`,
    `Bir katın tüm kalıbını bulmak için kolon, kiriş ve döşemeyi ayrı ayrı hesaplayıp "Kalıp alanı" değerlerini toplayın.`,
  ],
  sections: [
    { h: 'Kalıp alanı nedir?', p: [
      `Kalıp, taze betonun sertleşene kadar biçimini korumasını sağlayan geçici yapıdır. Kalıp metrajı, <strong>betonla temas eden kalıp yüzeyinin alanı</strong> olarak hesaplanır ve metrekare ile ifade edilir. Kalıp işçiliği, plywood ve kereste ihtiyacı, kiralık panel kalıp miktarı ve kalıp yağı tüketimi bu alan üzerinden planlanır.`,
      `Betonun açıkta kalan üst yüzeyi kalıp gerektirmez. Bu yüzden her eleman için yalnızca kalıpla kapatılan yüzeyler sayılır: kolonda dört yan yüz, kirişte alt yüz ve iki yan, döşemede alt yüzey, perdede iki geniş yüz, temelde çevre yan yüzler.`,
    ] },
    { h: 'Elemanlara göre formüller', ul: [
      `<strong>Kolon:</strong> 2 × (A + B) × yükseklik. A ve B kesit kenarlarıdır; kesitin çevresi yükseklikle çarpılır.`,
      `<strong>Kiriş:</strong> (A + 2 × B) × uzunluk. A kirişin alt genişliği, B kalıp yapılacak yan yüz yüksekliğidir. Döşemeyle birlikte dökülen kirişlerde B, döşemenin altında kalan sarkma yüksekliğidir.`,
      `<strong>Döşeme:</strong> A × B. Döşemenin alttan kalıplanan net alanıdır.`,
      `<strong>Perde duvar:</strong> 2 × uzunluk × yükseklik. İki geniş yüz sayılır; dar uç alınları ihmal edilir.`,
      `<strong>Temel:</strong> 2 × (A + B) × yükseklik. Tekil ya da radye temelin çevre yan yüzleridir; taban zemine oturduğu için kalıp gerekmez.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Kolon:</strong> 30 × 60 cm kesitli, 3 metre yüksekliğinde bir kolonun kalıp alanı 2 × (0,30 + 0,60) × 3 = 5,4 m²'dir. On kolon için 54 m² kalıp gerekir; bu da firesiz 18 levhaya karşılık gelir.`,
      `<strong>Kiriş:</strong> alt genişliği 25 cm, döşeme altındaki sarkması 40 cm ve uzunluğu 5 metre olan bir kiriş için (0,25 + 2 × 0,40) × 5 = 5,25 m² bulunur. Dört kiriş 21 m², yüzde 5 fireyle 22,05 m² eder.`,
      `<strong>Döşeme:</strong> 5 × 4 metrelik bir döşemenin alt kalıbı 20 m²'dir; yüzde 10 fireyle 22 m² ve 8 levha gerekir.`,
      `<strong>Perde:</strong> 6 metre uzunluğunda, 3 metre yüksekliğinde bir perdenin iki yüzü 2 × 6 × 3 = 36 m² kalıp ister.`,
    ] },
    { h: 'Bir katın toplam kalıp metrajı nasıl çıkarılır?', p: [
      `Kat kalıbı kolon, kiriş ve döşeme kalemlerinin toplamıdır ve aynı yüzeyin iki kez sayılmamasına dikkat edilir. Kirişlerin oturduğu yerde döşeme kalıbı olmaz; bu yüzden döşeme alanı hesaplanırken kiriş alt genişliklerinin kapladığı alan düşülür ya da döşeme, kirişler arasındaki net açıklık ölçüleriyle girilir. Kolonların kirişle birleştiği bölgede de kolon kalıbı kiriş altına kadar alınır.`,
      `Pratik bir yol şudur: önce kolonları kiriş altı yüksekliğiyle, ardından kirişleri kolon yüzünden kolon yüzüne net uzunlukla, en son döşeme panellerini kirişler arasındaki net ölçülerle hesaplayın. Merdiven, konsol, saçak ve asansör perdeleri ayrı kalemler olarak eklenir. Resmî keşif ve hakedişlerde ilgili birim fiyat tarifinin ve şartnamenin ölçü kuralları esas alınmalıdır.`,
    ] },
    { h: 'Fire payı ve levha sayısı', p: [
      `Kalıp malzemesi kesilerek kullanıldığı için bir miktar fire oluşur. Düz ve tekrar eden yüzeylerde yüzde 5 civarı, çok kesimli, eğimli ya da düzensiz planlı işlerde yüzde 10 ve üzeri fire görülebilir. Araç fire payını net alana ekler.`,
      `Levha sayısı, fire dahil alanın 125 × 250 cm ölçüsündeki bir levhanın alanına (3,125 m²) bölünmesiyle bulunur ve yukarı yuvarlanır. Bu sayı bir <strong>üst sınır değil, alt tahmindir</strong>: gerçek kesim planında levhalardan artan parçalar her zaman kullanılamaz. Öte yandan plywood kalıplar birden çok kez kullanılabildiğinden, aynı levhalarla birkaç kat dökülebilir; toplam bina metrajı için değil, bir seferde kurulacak kalıp alanı için levha sayısına bakın.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `Ölçüleri santimetre girmek: bu araçta tüm ölçüler metredir. 30 cm için 0,3 yazılmalıdır; 30 yazılırsa alan yüz kat büyür.`,
      `Kirişte tüm yüksekliği yan yüz saymak: döşemeyle birlikte dökülen kirişte yan kalıp yalnızca döşeme altına kadar çıkar.`,
      `Döşeme alanından kirişleri düşmemek: kiriş altı zaten kiriş kaleminde sayıldığı için aynı yüzey iki kez hesaplanır.`,
      `Perdede tek yüzü hesaplamak: bodrum perdelerinde bile, toprağa karşı dökülmüyorsa iki yüz de kalıplanır.`,
      `Kapı ve pencere boşluklarını unutmak: perdelerdeki büyük boşluklar düşülebilir, ancak boşluk kenarlarının da kalıp gerektirdiği unutulmamalıdır.`,
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      `Araç yalnızca dikdörtgen kesitli elemanların kalıp yüzey alanını hesaplar. Dairesel kolonlar, eğimli döşemeler, merdivenler ve kemerli elemanlar için geometriye uygun ayrı hesap gerekir. Kuşak, dikme, iskele, bağlantı elemanı ve kalıp yağı miktarları bu hesabın dışındadır. Kalıp ve iskele sisteminin taşıma gücü, dikme aralıkları ve söküm süreleri iş güvenliğini doğrudan ilgilendirir; bu konular yetkili bir mühendisin hazırladığı kalıp projesine ve yürürlükteki mevzuata göre belirlenmelidir.`,
    ] },
  ],
  faq: [
    ['Kalıp alanı ile beton hacmi aynı şey mi?', `Hayır. Beton hacmi metreküp olarak elemanın içini, kalıp alanı ise metrekare olarak betonla temas eden kalıp yüzeyini ifade eder. İnce ve uzun elemanlarda az betona karşılık çok kalıp, kalın ve kütlesel elemanlarda çok betona karşılık az kalıp gerekir.`],
    ['30 × 60 kolonun kalıp alanı kaç metrekaredir?', `Kesit çevresi 2 × (0,30 + 0,60) = 1,8 metredir. 3 metre yükseklikte 1,8 × 3 = 5,4 m², 2,8 metre yükseklikte 5,04 m² kalıp gerekir.`],
    ['Kirişte neden üst yüz hesaba katılmıyor?', `Kirişin üstü ya açıkta kalır ya da döşeme betonuyla birleşir; her iki durumda da kalıp yapılmaz. Kalıplanan yüzeyler alt taban ve iki yan yüzdür.`],
    ['Döşeme kalıbında döşeme kenarları sayılır mı?', `Araç yalnızca alt yüzeyi hesaplar. Döşemenin serbest kenarlarındaki alın kalıbı (kenar uzunluğu × döşeme kalınlığı) küçük bir alandır; isterseniz bunu ayrıca hesaplayıp ekleyebilirsiniz.`],
    ['Bir plywood levha kaç metrekaredir?', `Araç yaygın kullanılan 125 × 250 cm levhayı esas alır; bu 3,125 m² eder. Farklı ölçüde levha kullanıyorsanız "Kalıp alanı" değerini kendi levha alanınıza bölerek adedi bulabilirsiniz.`],
    ['Fire payı yüzde kaç alınmalı?', `Standart, tekrar eden katlarda yüzde 5 çoğunlukla yeterlidir. Çok kesim gerektiren, açılı ya da düzensiz planlı işlerde yüzde 10 ve üzeri almak daha gerçekçidir.`],
    ['Radye temelde kalıp alanı nasıl hesaplanır?', `Radyenin yalnızca çevre yan yüzleri kalıplanır. "Temel" seçeneğinde A ve B olarak radyenin plan ölçülerini, yükseklik olarak radye kalınlığını girin. 12 × 10 metrelik, 50 cm kalınlığında bir radye için 2 × (12 + 10) × 0,5 = 22 m² kalıp gerekir.`],
    ['Girdiğim ölçüler bir yere gönderiliyor mu?', `Hayır. Hesaplama tarayıcınızda yapılır; proje ölçüleriniz sunucuya iletilmez ve saklanmaz. Sayfa yüklendikten sonra çevrimdışı da çalışır.`],
  ],
  related: ['kolon-beton-hesapla', 'temel-beton-hesapla', 'beton-hesapla', 'osb-kontrplak-hesapla', 'kereste-hacmi-hesapla', 'duvar-alani-hesapla'],
};
