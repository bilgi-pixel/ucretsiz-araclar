export default {
  slug: 'parke-hesapla',
  title: 'Parke Hesaplama',
  h1Tail: 'paket ve tahta adedi',
  pageTitle: 'Parke Hesaplama – Odaya Kaç Paket, Kaç m² Parke Gerekir?',
  description: 'Oda ölçülerinden gereken parke alanını, tahta adedini ve paket sayısını hesaplayın. Tahta boyutu, paket içi adet ve fire payı ayarlanabilir.',
  card: 'Oda eni ve boyundan fire dahil parke alanını, tahta adedini ve alınacak paket sayısını bulun.',
  category: 'insaat',
  keywords: ['parke hesaplama', 'kaç paket parke', 'parke m2 hesaplama', 'parke fire payı', 'odaya kaç metrekare parke', 'parke adet hesabı', 'parke paket hesaplama'],
  lead: 'Odanın enini ve boyunu, kullanacağınız parke tahtasının ölçülerini ve paketteki tahta sayısını yazın; araç fire payını ekleyerek <strong>kaç paket parke</strong> almanız gerektiğini hesaplasın.',
  button: 'Hesapla',
  inputs: [
    { id: 'en', label: 'Oda eni (m)', type: 'number', placeholder: 'Örn. 4' },
    { id: 'boy', label: 'Oda boyu (m)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'tahtaEn', label: 'Tahta eni (cm)', type: 'number', value: '19,3' },
    { id: 'tahtaBoy', label: 'Tahta boyu (cm)', type: 'number', value: '138' },
    { id: 'paketAdet', label: 'Paketteki tahta adedi', type: 'number', value: '8' },
    { id: 'fire', label: 'Fire payı (%)', type: 'number', value: '10', hint: 'Düz döşemede 5–10, çapraz ya da balıksırtı döşemede daha yüksek alın.' },
  ],
  compute(v, h) {
    const en = h.pos(v.en, 'Oda eni');
    const boy = h.pos(v.boy, 'Oda boyu');
    const te = h.pos(v.tahtaEn, 'Tahta eni');
    const tb = h.pos(v.tahtaBoy, 'Tahta boyu');
    const adet = h.posint(v.paketAdet, 'Paketteki tahta adedi');
    const fire = h.nonneg(v.fire, 'Fire payı');
    if (fire > 100) h.err('"Fire payı" en fazla 100 olabilir.');
    const alan = en * boy;
    const gereken = alan * (1 + fire / 100);
    const tahtaAlan = te * tb / 10000;
    const paketAlan = tahtaAlan * adet;
    const paket = Math.ceil(gereken / paketAlan - 1e-9);
    const tahta = Math.ceil(gereken / tahtaAlan - 1e-9);
    return {
      rows: [
        ['Paket sayısı', h.fmt(paket, 0) + ' paket'],
        ['Oda alanı', h.fmt(alan, 2) + ' m²'],
        ['Fire dahil gereken alan', h.fmt(gereken, 2) + ' m²'],
        ['Tahta adedi', h.fmt(tahta, 0) + ' adet'],
        ['Bir paketin kapladığı alan', h.fmt(paketAlan, 3) + ' m²'],
        ['Satın alınan alan', h.fmt(paket * paketAlan, 2) + ' m²'],
        ['Oda çevresi (süpürgelik için)', h.fmt(2 * (en + boy), 2) + ' m'],
      ],
      note: 'Paket sayısı yukarı yuvarlanır. Girintili çıkıntılı odalarda alanı parçalara bölüp toplayın; kapı boşlukları çevreden düşülmemiştir.',
    };
  },
  cases: [
    { in: { en: '4', boy: '5', tahtaEn: '19,3', tahtaBoy: '138', paketAdet: '8', fire: '10' }, out: { 'Paket sayısı': '11 paket', 'Oda alanı': '20 m²', 'Fire dahil gereken alan': '22 m²', 'Tahta adedi': '83 adet', 'Bir paketin kapladığı alan': '2,131 m²', 'Satın alınan alan': '23,44 m²', 'Oda çevresi (süpürgelik için)': '18 m' } },
    { in: { en: '3', boy: '4', tahtaEn: '12', tahtaBoy: '120', paketAdet: '10', fire: '5' }, out: { 'Paket sayısı': '9 paket', 'Fire dahil gereken alan': '12,6 m²', 'Tahta adedi': '88 adet', 'Satın alınan alan': '12,96 m²' } },
    { in: { en: '5', boy: '6', tahtaEn: '20', tahtaBoy: '100', paketAdet: '10', fire: '0' }, out: { 'Paket sayısı': '15 paket', 'Tahta adedi': '150 adet', 'Satın alınan alan': '30 m²' } },
    { in: { en: '3,5', boy: '4,2', tahtaEn: '19,3', tahtaBoy: '138', paketAdet: '8', fire: '8' }, out: { 'Paket sayısı': '8 paket', 'Oda alanı': '14,7 m²', 'Tahta adedi': '60 adet', 'Satın alınan alan': '17,05 m²' } },
    { in: { en: '2', boy: '2', tahtaEn: '7', tahtaBoy: '35', paketAdet: '40', fire: '15' }, out: { 'Paket sayısı': '5 paket', 'Fire dahil gereken alan': '4,6 m²', 'Tahta adedi': '188 adet', 'Satın alınan alan': '4,9 m²' } },
    { in: { en: '', boy: '5' }, error: true },
    { in: { en: '4', boy: '5', paketAdet: '0' }, error: true },
    { in: { en: '4', boy: '-5' }, error: true },
  ],
  howto: [
    'Odanın enini ve boyunu metre olarak yazın. Ölçüyü duvardan duvara, süpürgelik hizasından alın.',
    'Parke tahtasının enini ve boyunu santimetre olarak girin; bu bilgiler paketin üzerindeki etikette yazar.',
    'Bir pakette kaç tahta olduğunu yazın.',
    'Döşeme biçimine uygun fire payını belirleyin ve "Hesapla" düğmesine basın.',
    'Sonuçtaki paket sayısını sipariş edin; oda çevresi satırını süpürgelik metrajı için kullanın.',
  ],
  sections: [
    { h: 'Parke miktarı nasıl hesaplanır?', p: [
      'Hesabın temeli döşenecek zeminin alanıdır: <strong>oda alanı = en × boy</strong>. Parke kesilerek döşendiği, duvar diplerinde parça kaldığı ve arada kusurlu tahta çıkabildiği için bu alana bir fire payı eklenir: <strong>gereken alan = oda alanı × (1 + fire ÷ 100)</strong>.',
      'Parke metrekareyle fiyatlandırılsa da paketle satılır ve paket bölünmez. Bu yüzden asıl bilmeniz gereken sayı paket adedidir. Bir tahtanın alanı en ile boyun çarpımıdır; paketin kapladığı alan bunun paketteki tahta sayısıyla çarpımıdır. Gereken alan paket alanına bölünür ve sonuç <strong>yukarı</strong> yuvarlanır. Araç, satın aldığınız toplam alanı da gösterir; böylece elinizde ne kadar yedek kalacağını görürsünüz.',
    ] },
    { h: 'Çözümlü örnek: 4 × 5 metrelik oda', p: [
      'Oda 4 m eninde ve 5 m boyunda olsun; alan 4 × 5 = <strong>20 m²</strong> eder. Yüzde 10 fire payıyla gereken alan 20 × 1,10 = <strong>22 m²</strong> olur. Seçilen parkenin tahtası 19,3 cm × 138 cm ölçüsündedir; bir tahta 0,193 × 1,38 = 0,26634 m² yer kaplar. Pakette 8 tahta varsa bir paket 2,131 m² alanı örter.',
      '22 ÷ 2,131 = 10,3 çıkar; yarım paket alınamayacağı için <strong>11 paket</strong> gerekir. Tahta sayısı olarak bu 83 adede karşılık gelir. 11 paketle 23,44 m² parke almış olursunuz; yani oda alanının üzerinde yaklaşık 3,4 m² payınız vardır. Odanın çevresi 2 × (4 + 5) = 18 m olduğundan süpürgelik için bu uzunluktan kapı genişliklerini düşerek sipariş verebilirsiniz.',
    ] },
    { h: 'Fire payı ne kadar alınmalı?', p: [
      'Fire, odanın biçimine ve döşeme düzenine bağlıdır. Dikdörtgen bir odada tahtalar duvara paralel döşeniyorsa kesim kaybı azdır. Tahtalar çapraz yerleştirildiğinde her sıranın iki ucunda üçgen parça atılır ve kayıp belirgin biçimde artar. Balıksırtı gibi desenli döşemelerde hem kesim hem de desen uydurma nedeniyle fire daha da yükselir.',
    ], ul: [
      '<strong>Düz, duvara paralel döşeme:</strong> genellikle yüzde 5–10',
      '<strong>Çapraz (45 derece) döşeme:</strong> genellikle yüzde 10–15',
      '<strong>Balıksırtı ve desenli döşeme:</strong> yüzde 15 ve üzeri',
      '<strong>Kolonlu, girintili, çok köşeli odalar:</strong> yukarıdaki değerlere birkaç puan ekleyin',
    ] },
    { h: 'Ölçü alırken dikkat edilecekler', p: [
      'Odayı tek bir dikdörtgen olarak ölçemiyorsanız zemini dikdörtgen parçalara ayırın, her birinin alanını ayrı hesaplayıp toplayın; ardından araca toplam alanı verecek bir en ve boy çifti yazabilir ya da her bölüm için hesabı ayrı çalıştırabilirsiniz. Gömme dolap içleri, kapı eşikleri ve niş tabanları sık unutulan yerlerdir.',
      'Ahşap esaslı parkeler nem ve sıcaklıkla çalışır; bu yüzden duvar diplerinde genleşme boşluğu bırakılır ve bu boşluk süpürgelikle kapatılır. Boşluk payı malzeme miktarını kayda değer ölçüde azaltmaz; alanı duvardan duvara hesaplamak doğru yaklaşımdır.',
      'Aynı ürünün farklı üretim partileri arasında ton farkı olabilir. Bu nedenle ihtiyacın tamamını tek seferde ve aynı partiden almak, sonradan bir iki paket eklemeye çalışmaktan daha güvenlidir. Artan kapalı paketleri saklamak, ileride hasar gören tahtaları değiştirmeyi kolaylaştırır.',
    ] },
    { h: 'Hangi parke türlerinde kullanılır?', p: [
      'Hesap, tahta biçiminde satılan bütün zemin kaplamaları için aynıdır: laminat parke, lamine parke, masif parke ve kilitli vinil tahtalar. Değişen yalnızca tahta ölçüsü ve paket içi adettir. Etikette çoğu zaman paketin kapladığı metrekare de yazar; aracın "Bir paketin kapladığı alan" satırını bu değerle karşılaştırarak ölçüleri doğru girdiğinizi kontrol edebilirsiniz.',
      'Rulo halinde satılan vinil, halı ya da şilte gibi alt malzemelerde hesap farklıdır; onlar rulo eni üzerinden şerit sayısıyla bulunur. Parke altı şilte için ise oda alanına küçük bir bindirme payı eklemek genellikle yeterlidir.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç dikdörtgen bir zemin varsayar ve döşeme desenine göre kesim planı çıkarmaz; fire payını siz belirlersiniz. Sonuç sipariş miktarı için güvenilir bir başlangıçtır, ancak özel desenlerde ve çok parçalı mekânlarda uygulayıcının yerinde aldığı ölçü esas alınmalıdır.',
    ] },
  ],
  faq: [
    ['20 m² oda için kaç paket parke alınır?', 'Paketin kapladığı alana bağlıdır. 19,3 × 138 cm tahtalardan 8 adet içeren ve 2,131 m² örten paketlerle, yüzde 10 fire payı eklendiğinde 11 paket gerekir. Paket alanı farklıysa sonucu araçla yeniden hesaplayın.'],
    ['Parke fire payı yüzde kaç olmalı?', 'Düz döşemede yüzde 5–10 çoğu oda için yeterlidir. Çapraz döşemede yüzde 10–15, balıksırtı gibi desenlerde yüzde 15 ve üzeri almak yaygındır. Çok köşeli odalarda pay artırılır.'],
    ['Bir paket parke kaç metrekaredir?', 'Tahta eni ile boyunun çarpımı bir tahtanın alanını verir; bunu paketteki tahta sayısıyla çarparsınız. Örneğin 19,3 cm × 138 cm ölçüsünde 8 tahta 2,131 m² eder. Değer üründen ürüne değişir.'],
    ['Sonuç neden hep yukarı yuvarlanıyor?', 'Paketler açılıp bölünerek satılmaz. 10,3 paketlik ihtiyaç için 10 paket almak malzemenin yetmemesi demektir; bu nedenle bir üst tam sayı alınır.'],
    ['Süpürgelik miktarını nasıl bulurum?', 'Sonuçtaki oda çevresi satırı duvarların toplam uzunluğudur. Bu değerden kapı genişliklerini çıkarın ve köşe birleşimleri için küçük bir pay ekleyin.'],
    ['L biçimli oda için nasıl hesap yapılır?', 'Zemini iki dikdörtgene ayırın ve her biri için aracı ayrı çalıştırın. Paket sayılarını toplamak yerine alanları toplayıp tek seferde hesaplamak daha az artık bırakır.'],
    ['Artan parkeyi ne yapmalıyım?', 'Açılmamış paketleri kuru ve düz bir yerde saklayın. İleride çizilen ya da su alan tahtaları aynı partiden parçayla değiştirmek, yıllar sonra aynı tonu bulmaya çalışmaktan çok daha kolaydır.'],
    ['Yazdığım ölçüler bir yere gönderiliyor mu?', 'Hayır. Bütün hesap tarayıcınızda yapılır; oda ölçüleriniz sunucuya iletilmez ve kaydedilmez.'],
  ],
  related: ['laminat-hesapla', 'supurgelik-hesapla', 'boya-fayans-hesapla', 'sap-hesapla', 'alan-cevre-hesapla'],
};
