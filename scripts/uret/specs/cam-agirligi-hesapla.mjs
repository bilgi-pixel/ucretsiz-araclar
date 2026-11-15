export default {
  slug: 'cam-agirligi-hesapla',
  title: 'Cam Ağırlığı Hesaplama',
  h1Tail: 'kg ve kg/m²',
  pageTitle: 'Cam Ağırlığı Hesaplama – Düz Cam, Temperli ve Isıcam Kaç Kg?',
  description: 'Camın enini, boyunu ve kalınlığını girin; tek cam, çift cam ya da üçlü cam ünitesinin ağırlığını kilogram ve metrekare ağırlığı olarak hesaplayın.',
  card: 'En, boy ve kalınlığa göre düz cam, temperli cam ve ısıcam ünitelerinin ağırlığını kilogram olarak hesaplayın.',
  category: 'insaat',
  keywords: ['cam ağırlığı hesaplama', '1 m2 cam kaç kg', '4 mm cam ağırlığı', 'ısıcam ağırlığı', 'temperli cam ağırlığı', 'çift cam kaç kilo', 'cam yoğunluğu', '10 mm cam m2 ağırlığı'],
  lead: `Camın ölçülerini ve kalınlığını yazın; araç <strong>her milimetre kalınlık için metrekarede 2,5 kg</strong> kuralıyla parçanın ağırlığını, metrekare ağırlığını ve birden çok parça için toplam yükü hesaplar. Çift ve üçlü camlarda cam katmanlarını da hesaba katar.`,
  button: 'Hesapla',
  inputs: [
    { id: 'en', label: 'En (cm)', type: 'number', placeholder: 'Örn. 120' },
    { id: 'boy', label: 'Boy (cm)', type: 'number', placeholder: 'Örn. 150' },
    { id: 'kalinlik', label: 'Tek cam kalınlığı (mm)', type: 'number', placeholder: 'Örn. 4' },
    { id: 'katman', label: 'Cam katmanı', type: 'select', options: [['1', 'Tek cam'], ['2', 'Çift cam (ısıcam)'], ['3', 'Üçlü cam']] },
    { id: 'adet', label: 'Adet', type: 'number', value: '1' },
  ],
  compute(v, h) {
    const en = h.pos(v.en, 'En');
    const boy = h.pos(v.boy, 'Boy');
    const kal = h.pos(v.kalinlik, 'Tek cam kalınlığı');
    const adet = h.posint(v.adet, 'Adet');
    const katman = Number(v.katman);
    if (![1, 2, 3].includes(katman)) h.err('Cam katmanını listeden seçin.');
    if (kal > 100) h.err('Cam kalınlığı milimetre olarak yazılmalı (örn. 4, 6, 10).');
    const YOGUNLUK = 2500; // kg/m³
    const alan = (en / 100) * (boy / 100);
    const toplamKal = kal * katman;
    const m2 = toplamKal / 1000 * YOGUNLUK;
    const tek = alan * m2;
    return {
      rows: [
        ['Toplam ağırlık', h.fmt(tek * adet, 2) + ' kg'],
        ['Tek parça ağırlığı', h.fmt(tek, 2) + ' kg'],
        ['m² ağırlığı', h.fmt(m2, 2) + ' kg/m²'],
        ['Tek parça alanı', h.fmt(alan, 3) + ' m²'],
        ['Toplam cam kalınlığı', h.fmt(toplamKal, 2) + ' mm'],
      ],
      note: 'Cam yoğunluğu 2.500 kg/m³ alınmıştır. Isıcamda ara boşluk, çıta ve dolgu malzemesinin ağırlığı hesaba katılmaz; gerçek ünite biraz daha ağır olabilir.',
    };
  },
  cases: [
    { in: { en: '100', boy: '100', kalinlik: '4' }, out: { 'Toplam ağırlık': '10 kg', 'm² ağırlığı': '10 kg/m²', 'Tek parça alanı': '1 m²' } },
    { in: { en: '120', boy: '150', kalinlik: '4', katman: '2' }, out: { 'Toplam ağırlık': '36 kg', 'm² ağırlığı': '20 kg/m²', 'Tek parça alanı': '1,8 m²', 'Toplam cam kalınlığı': '8 mm' } },
    { in: { en: '200', boy: '100', kalinlik: '10' }, out: { 'Toplam ağırlık': '50 kg', 'm² ağırlığı': '25 kg/m²' } },
    { in: { en: '60', boy: '80', kalinlik: '6', adet: '5' }, out: { 'Toplam ağırlık': '36 kg', 'Tek parça ağırlığı': '7,2 kg', 'Tek parça alanı': '0,48 m²' } },
    { in: { en: '50', boy: '50', kalinlik: '3' }, out: { 'Toplam ağırlık': '1,88 kg', 'm² ağırlığı': '7,5 kg/m²' } },
    { in: { en: '150', boy: '250', kalinlik: '4', katman: '3' }, out: { 'Toplam ağırlık': '112,5 kg', 'm² ağırlığı': '30 kg/m²', 'Toplam cam kalınlığı': '12 mm' } },
    { in: { en: '', boy: '100', kalinlik: '4' }, error: true },
    { in: { en: '100', boy: '100', kalinlik: '0' }, error: true },
    { in: { en: '100', boy: '100', kalinlik: '4', adet: '2,5' }, error: true },
  ],
  howto: [
    `Camın enini ve boyunu santimetre olarak yazın. Milimetre ölçünüz varsa ona bölerek çevirin: 1.250 mm, 125 cm eder.`,
    `"Tek cam kalınlığı" alanına bir cam tabakasının kalınlığını milimetre olarak girin; ısıcamda aradaki boşluğu değil yalnızca camı yazın.`,
    `Cam katmanını seçin: tek cam, çift cam ya da üçlü cam. Araç kalınlığı katman sayısıyla çarpar.`,
    `Aynı ölçüde birden fazla cam varsa adedi yazın ve "Hesapla" düğmesine basın.`,
    `Sonuçta toplam ağırlığı, tek parçanın ağırlığını ve metrekare ağırlığını görürsünüz; taşıma ve montaj planınızı buna göre yapın.`,
  ],
  sections: [
    { h: 'Cam ağırlığı formülü', p: [
      `Pencerelerde, kapılarda ve cephelerde kullanılan düz cam (soda-kireç-silika camı) yaklaşık 2.500 kg/m³ yoğunluğa sahiptir. Bu değer akılda tutması kolay bir kurala dönüşür: <strong>bir metrekare camın her milimetre kalınlığı 2,5 kilogram gelir</strong>. Buna göre 4 mm cam metrekarede 10 kg, 6 mm cam 15 kg, 10 mm cam 25 kg ağırlığındadır.`,
      `Genel formül şöyledir: <strong>ağırlık (kg) = en (m) × boy (m) × kalınlık (mm) × 2,5</strong>. Araç en ve boyu santimetre olarak aldığı için önce metreye çevirir, alanı bulur ve toplam cam kalınlığıyla çarpar. Çift ve üçlü camlarda toplam cam kalınlığı, tek tabakanın kalınlığı ile katman sayısının çarpımıdır.`,
    ] },
    { h: 'Çözümlü örnek: 120 × 150 cm ısıcam pencere', p: [
      `Bir pencere kanadına 4 + 4 mm çift cam takılacak olsun. Alan 1,20 × 1,50 = 1,8 m²'dir. İki cam tabakasının toplam kalınlığı 8 mm olduğundan metrekare ağırlığı 8 × 2,5 = 20 kg/m² eder. Ünitenin cam ağırlığı 1,8 × 20 = <strong>36 kg</strong> bulunur. Aradaki hava ya da gaz boşluğu ağırlığa kayda değer bir katkı yapmaz; alüminyum çıta ve dolgu macunu ise birkaç yüz gramlık ek yük getirir.`,
      `Başka bir örnek: 200 × 100 cm ölçüsünde 10 mm temperli bir duş kabini camı 2 m² × 25 kg/m² = 50 kg gelir. Bu ağırlık, menteşe ve ray seçiminde doğrudan belirleyicidir.`,
    ] },
    { h: 'Temperli, lamine ve ısıcam ağırlığı', p: [
      `<strong>Temperli cam</strong>, düz camın ısıl işlemle güçlendirilmiş hâlidir. İşlem camın dayanımını artırır ama yoğunluğunu değiştirmez; aynı kalınlıktaki temperli cam ile normal düz cam aynı ağırlıktadır.`,
      `<strong>Lamine cam</strong>, iki ya da daha fazla cam tabakasının arasına ince bir plastik film konularak birleştirilmesiyle üretilir. 4 + 4 mm lamine camı hesaplamak için katmanı "çift cam" seçip kalınlığa 4 yazabilirsiniz. Aradaki film çok ince olduğundan ağırlığa etkisi küçüktür ve bu araçta ihmal edilir.`,
      `<strong>Isıcam</strong> (yalıtım camı) ünitelerinde 4 + 16 + 4 gibi yazımlarda ortadaki sayı cam değil ara boşluktur. Ağırlık hesabında yalnızca cam tabakaları sayılır: 4 + 16 + 4 ünitenin cam kalınlığı 8 mm'dir. Katmanlar farklı kalınlıktaysa, örneğin 6 + 16 + 4, katmanı "tek cam" seçip kalınlığa toplamı (10) yazın.`,
    ] },
    { h: 'Kalınlığa göre metrekare ağırlıkları', ul: [
      `<strong>3 mm:</strong> 7,5 kg/m²`,
      `<strong>4 mm:</strong> 10 kg/m²`,
      `<strong>5 mm:</strong> 12,5 kg/m²`,
      `<strong>6 mm:</strong> 15 kg/m²`,
      `<strong>8 mm:</strong> 20 kg/m²`,
      `<strong>10 mm:</strong> 25 kg/m²`,
      `<strong>12 mm:</strong> 30 kg/m²`,
      `<strong>4 + 4 mm çift cam:</strong> 20 kg/m²`,
      `<strong>4 + 4 + 4 mm üçlü cam:</strong> 30 kg/m²`,
    ] },
    { h: 'Bu hesap nerede işe yarar?', ul: [
      `<strong>Taşıma ve montaj:</strong> büyük bir camın kaç kişiyle ya da vantuzla taşınacağına karar verirken.`,
      `<strong>Menteşe, ray ve makara seçimi:</strong> duş kabini, sürgülü kapı ve cam kapılarda donanımın taşıma kapasitesi cam ağırlığına göre seçilir.`,
      `<strong>Doğrama ve kanat yükü:</strong> pencere kanadındaki cam ağırlığı, menteşe sayısını ve profil serisini etkiler.`,
      `<strong>Raf ve masa camları:</strong> cam rafın kendi ağırlığı, konsol ve dübel seçiminde üzerine konacak yükle birlikte düşünülür.`,
      `<strong>Nakliye:</strong> çok sayıda camın toplam yükü araç kapasitesi ve kasa hesabında kullanılır.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `Isıcamda ara boşluğu da kalınlığa katmak: 4 + 16 + 4 ünite için 24 mm yazılırsa ağırlık üç kat fazla çıkar.`,
      `Ölçüyü milimetre yazmak: en ve boy santimetre girilir; 1200 yazarsanız araç bunu 12 metre kabul eder.`,
      `Doğrama ağırlığını unutmak: bu araç yalnızca camı hesaplar; kasa, kanat profili ve aksesuarlar ayrıca eklenmelidir.`,
      `Dikdörtgen olmayan camlar: yuvarlak ya da şekilli camlarda, kesilmeden önceki dikdörtgen ölçü yazılırsa sonuç gerçek ağırlıktan fazla çıkar; bu, taşıma açısından güvenli tarafta bir tahmindir.`,
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      `Sonuç, 2.500 kg/m³ yoğunluk kabulüyle hesaplanan yaklaşık bir değerdir. Üretim toleransları nedeniyle gerçek kalınlık ve ağırlık küçük farklar gösterebilir. Akrilik (pleksi) ve polikarbonat levhalar cam değildir ve çok daha hafiftir; onlar için bu araç uygun değildir. Cam cephe, korkuluk, cam zemin ve çatı ışıklığı gibi taşıyıcılık ve güvenlik gerektiren uygulamalarda cam tipi, kalınlığı ve bağlantı detayları mutlaka yetkili bir mühendis ve cam üreticisi tarafından belirlenmelidir.`,
    ] },
  ],
  faq: [
    ['1 m² cam kaç kilogramdır?', `Kalınlığa bağlıdır: her milimetre için 2,5 kg hesaplanır. 4 mm cam 10 kg/m², 6 mm cam 15 kg/m², 8 mm cam 20 kg/m², 10 mm cam 25 kg/m² gelir.`],
    ['Temperli cam normal camdan ağır mıdır?', `Hayır. Temperleme işlemi camın iç gerilmelerini değiştirerek dayanımını artırır, ancak yoğunluğu aynı kalır. Aynı ölçü ve kalınlıktaki temperli cam ile düz cam aynı ağırlıktadır.`],
    ['4 + 16 + 4 ısıcamın ağırlığı nasıl hesaplanır?', `Ortadaki 16, cam değil ara boşluk genişliğidir. Yalnızca iki adet 4 mm cam sayılır; toplam 8 mm cam kalınlığı metrekarede 20 kg eder. Araçta kalınlığa 4 yazıp "Çift cam" seçmeniz yeterlidir.`],
    ['Farklı kalınlıkta iki camdan oluşan üniteyi nasıl girerim?', `Cam katmanını "Tek cam" olarak bırakın ve kalınlık alanına cam tabakalarının toplamını yazın. Örneğin 6 + 12 + 4 ünite için 10 yazılır.`],
    ['Lamine camda aradaki film ağırlığı etkiler mi?', `Çok az. Lamine camdaki ara film genellikle bir milimetrenin altında kalınlıktadır ve camdan çok daha hafiftir. Gündelik hesaplarda ihmal edilebilir; hassas mühendislik hesabı gerekiyorsa üreticinin ürün verisine bakın.`],
    ['Ayna ağırlığı da böyle hesaplanır mı?', `Evet. Ayna, arka yüzü kaplanmış düz camdır ve kaplamanın ağırlığı yok denecek kadar azdır. Aynanın ölçüsünü ve kalınlığını tek cam olarak girerek ağırlığını bulabilirsiniz.`],
    ['Sonuç doğramayı da kapsıyor mu?', `Hayır. Araç yalnızca cam ağırlığını verir. PVC, alüminyum ya da ahşap doğramanın, çıtaların ve aksesuarların ağırlığı ayrıca hesaplanmalıdır.`],
    ['Yazdığım ölçüler bir yere gönderiliyor mu?', `Hayır. Hesaplama tarayıcınızın içinde yapılır; ölçüleriniz sunucuya iletilmez ve saklanmaz. Sayfa bir kez yüklendikten sonra çevrimdışı da çalışır.`],
  ],
  related: ['mermer-agirligi-hesapla', 'sac-agirligi-hesapla', 'profil-agirligi-hesapla', 'yogunluk-hesapla', 'metrekare-hesapla'],
};
