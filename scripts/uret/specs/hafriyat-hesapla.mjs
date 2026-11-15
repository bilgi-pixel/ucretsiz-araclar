export default {
  slug: 'hafriyat-hesapla',
  title: 'Hafriyat (Kazı) Hacmi Hesaplama',
  h1Tail: 'm³, kabarma ve kamyon seferi',
  pageTitle: 'Hafriyat Hesaplama – Kazı Hacmi (m³) ve Kamyon Seferi',
  description: 'Kazı çukurunun boyunu, enini ve derinliğini girin; yerinde hacmi, kabarmış hafriyat hacmini ve kaç kamyon sefer gerektiğini şev payıyla birlikte hesaplayın.',
  card: 'Temel ya da çukur kazısının m³ hacmini, kabarma payıyla taşınacak toprak miktarını ve kamyon seferini bulun.',
  category: 'insaat',
  keywords: ['hafriyat hesaplama', 'kazı hacmi hesaplama', 'hafriyat m3 hesabı', 'kaç kamyon hafriyat çıkar', 'temel kazısı hesaplama', 'kabarma katsayısı', 'şevli kazı hacmi'],
  lead: "Dikdörtgen tabanlı bir kazının <strong>yerinde hacmini</strong>, kabarma payı eklenmiş taşınacak hacmi ve gereken kamyon seferini hesaplayın. İsterseniz kenarlara şev (eğim) verilmiş kazıları da hesaba katabilirsiniz.",
  button: 'Hesapla',
  inputs: [
    { id: 'boy', label: 'Taban boyu (m)', type: 'number', placeholder: 'Örn. 10' },
    { id: 'en', label: 'Taban eni (m)', type: 'number', placeholder: 'Örn. 8' },
    { id: 'derinlik', label: 'Kazı derinliği (m)', type: 'number', placeholder: 'Örn. 2' },
    { id: 'sev', label: 'Şev oranı (yatay / düşey)', type: 'number', value: '0', hint: '0 = dik kazı. 1 yazarsanız her 1 m derinlik için kenar 1 m dışa açılır.' },
    { id: 'kabarma', label: 'Kabarma payı (%)', type: 'number', value: '25', hint: 'Kazılan zeminin gevşeyince hacminin artma oranı.' },
    { id: 'kamyon', label: 'Kamyon kasa hacmi (m³)', type: 'number', value: '14', hint: 'Bir seferde taşınan gevşek hacim.' },
  ],
  compute(v, h) {
    const a = h.pos(v.boy, 'Taban boyu');
    const b = h.pos(v.en, 'Taban eni');
    const d = h.pos(v.derinlik, 'Kazı derinliği');
    const n = h.nonneg(v.sev, 'Şev oranı');
    const k = h.nonneg(v.kabarma, 'Kabarma payı');
    const kap = h.pos(v.kamyon, 'Kamyon kasa hacmi');
    if (n > 10) h.err('Şev oranı 10\'dan büyük olamaz; yatay/düşey oranını (örn. 0,5 ya da 1) yazın.');
    const ustA = a + 2 * n * d, ustB = b + 2 * n * d;
    const A1 = a * b, A2 = ustA * ustB, Am = (a + n * d) * (b + n * d);
    const V = d / 6 * (A1 + 4 * Am + A2);
    const gevsek = V * (1 + k / 100);
    const sefer = Math.ceil(gevsek / kap - 1e-9);
    return {
      rows: [
        ['Kazı hacmi (yerinde)', h.fmt(V, 2) + ' m³'],
        ['Taşınacak hacim (kabarmış)', h.fmt(gevsek, 2) + ' m³'],
        ['Kamyon seferi', sefer + ' sefer'],
        ['Taban alanı', h.fmt(A1, 2) + ' m²'],
        ['Üst ağız ölçüsü', h.fmt(ustA, 2) + ' × ' + h.fmt(ustB, 2) + ' m'],
        ['Üst ağız alanı', h.fmt(A2, 2) + ' m²'],
      ],
      note: 'Kabarma payı zemin cinsine göre değişir; değer bir kabuldür. Derin kazılarda şev ve iksa kararını mutlaka yetkili mühendis vermelidir.',
    };
  },
  cases: [
    { in: { boy: '10', en: '8', derinlik: '2' }, out: { 'Kazı hacmi (yerinde)': '160 m³', 'Taşınacak hacim (kabarmış)': '200 m³', 'Kamyon seferi': '15 sefer', 'Üst ağız ölçüsü': '10 × 8 m' } },
    { in: { boy: '10', en: '8', derinlik: '2', sev: '1' }, out: { 'Kazı hacmi (yerinde)': '242,67 m³', 'Taşınacak hacim (kabarmış)': '303,33 m³', 'Kamyon seferi': '22 sefer', 'Üst ağız ölçüsü': '14 × 12 m', 'Üst ağız alanı': '168 m²' } },
    { in: { boy: '20', en: '15', derinlik: '3', sev: '0', kabarma: '30', kamyon: '18' }, out: { 'Kazı hacmi (yerinde)': '900 m³', 'Taşınacak hacim (kabarmış)': '1.170 m³', 'Kamyon seferi': '65 sefer' } },
    { in: { boy: '5', en: '4', derinlik: '1,5', sev: '0,5', kabarma: '20', kamyon: '10' }, out: { 'Kazı hacmi (yerinde)': '41,25 m³', 'Taşınacak hacim (kabarmış)': '49,5 m³', 'Kamyon seferi': '5 sefer', 'Üst ağız ölçüsü': '6,5 × 5,5 m' } },
    { in: { boy: '7', en: '4', derinlik: '1', sev: '0', kabarma: '0', kamyon: '14' }, out: { 'Kazı hacmi (yerinde)': '28 m³', 'Taşınacak hacim (kabarmış)': '28 m³', 'Kamyon seferi': '2 sefer' } },
    { in: { boy: '1', en: '1', derinlik: '1', sev: '0', kabarma: '25', kamyon: '14' }, out: { 'Kazı hacmi (yerinde)': '1 m³', 'Kamyon seferi': '1 sefer' } },
    { in: { boy: '10', en: '8', derinlik: '0' }, error: true },
    { in: { boy: 'on', en: '8', derinlik: '2' }, error: true },
  ],
  howto: [
    "Kazının <strong>taban</strong> boyunu ve enini metre olarak yazın. Temel kazılarında çalışma payını (kalıp ve yalıtım için bırakılan boşluğu) bu ölçülere eklemeyi unutmayın.",
    "Kazı derinliğini girin. Arazi eğimliyse köşelerdeki derinliklerin ortalamasını kullanmak makul bir yaklaşımdır.",
    "Kenarlar dik kazılacaksa şev oranını 0 bırakın. Eğimli kazılacaksa yatay açılmanın düşey derinliğe oranını yazın (örneğin 1/2 şev için 0,5).",
    "Kabarma payını ve kamyon kasa hacmini kendi işinize göre düzeltip \"Hesapla\" düğmesine basın; yerinde hacim, taşınacak hacim ve sefer sayısı görünür.",
  ],
  sections: [
    { h: 'Hafriyat hacmi nasıl hesaplanır?', p: [
      "Kenarları dik inen dikdörtgen bir çukurun hacmi basit bir çarpmadır: <strong>hacim = boy × en × derinlik</strong>. 10 m boyunda, 8 m eninde ve 2 m derinliğinde bir temel kazısı 10 × 8 × 2 = 160 m³ eder. Bu değer toprağın yerindeki, yani sıkı haldeki hacmidir ve metraj cetvellerinde çoğunlukla bu hacim esas alınır.",
      "Kenarlara şev verildiğinde çukurun ağzı tabandan geniştir ve şekil kesik piramide benzer. Araç bu durumda <strong>prizmoid formülünü</strong> kullanır: V = derinlik ÷ 6 × (taban alanı + 4 × orta kesit alanı + üst alan). Bu formül, dört kenarı aynı eğimle açılan kazılarda tam sonuç verir; taban ve üst alanın ortalamasını almak ise hacmi olduğundan büyük gösterir.",
    ] },
    { h: 'Çözümlü örnek: şevli kazı', p: [
      "Tabanı 10 × 8 m, derinliği 2 m olan kazıya 1/1 şev verilsin; yani her 1 m derinlik için kenarlar 1 m dışa açılsın. Üst ağız her yönden 2 × 1 × 2 = 4 m genişler ve 14 × 12 m olur. Taban alanı 80 m², üst alan 168 m², tam orta yükseklikteki kesit ise 12 × 10 = 120 m²'dir.",
      "Hacim 2 ÷ 6 × (80 + 4 × 120 + 168) = 2 ÷ 6 × 728 = <strong>242,67 m³</strong> çıkar. Dik kazıya göre yaklaşık 83 m³ fazla toprak çıkar; şevin hafriyat maliyetine etkisi bu yüzden küçümsenmemelidir. Yüzde 25 kabarmayla taşınacak hacim 303,33 m³, 14 m³'lük kamyonla sefer sayısı 22 olur.",
    ] },
    { h: 'Kabarma payı nedir?', p: [
      "Yerinde sıkışmış duran zemin kazıldığında gevşer, tanelerin arasına hava girer ve hacmi artar. Bu artışa kabarma denir. Kamyona yüklenen ve döküm sahasına taşınan hacim, kazı planındaki hacimden büyüktür; sefer sayısı ve döküm bedeli bu gevşek hacme göre oluşur.",
      "Kabarma oranı zemine göre geniş bir aralıkta değişir. Kaba bir fikir vermek gerekirse kum ve çakılda yüzde 10–15, bitkisel toprak ve normal toprakta yüzde 20–30, sert kilde yüzde 30–40, patlatılmış ya da kırılmış kayada yüzde 50 ve üzeri değerler görülür. Araçta varsayılan olarak yüzde 25 yazılıdır; kesin değer için zemin etüdü raporuna ya da hafriyatçının deneyimine başvurun.",
    ] },
    { h: 'Kamyon seferi hesabı', p: [
      "Sefer sayısı, kabarmış hacmin kamyon kasa hacmine bölünüp yukarı yuvarlanmasıyla bulunur. 200 m³ gevşek toprak 14 m³'lük kasayla 200 ÷ 14 = 14,3, yani 15 sefer eder. Kasa hacimleri araca göre değişir; küçük kamyonlarda 8–10 m³, hafriyat kamyonlarında 14–18 m³, damperli dorselerde daha büyük hacimler yaygındır. Islak ve ağır zeminde kasa hacimce dolmadan ağırlık sınırına ulaşılabileceğini de göz önünde bulundurun.",
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      "<strong>Çalışma payını unutmak:</strong> temel kazısı, temelin kendisinden her yönde bir miktar geniş açılır. Bina oturma alanını doğrudan girmek hacmi eksik gösterir.",
      "<strong>Yerinde hacim ile taşınan hacmi karıştırmak:</strong> teklifin hangi hacim üzerinden verildiğini netleştirin; aradaki fark kabarma oranı kadardır.",
      "<strong>Eğimli araziyi düz saymak:</strong> derinlik her köşede farklıysa tek bir köşenin değeri yerine ortalama derinlik kullanın.",
      "<strong>Şev oranını ters yazmak:</strong> araç yatay/düşey oranını bekler. 2 düşeye 1 yatay şev için 0,5 yazılır, 2 değil.",
      "<strong>Dolgu ihtiyacını hesaba katmamak:</strong> temel bittikten sonra kenar boşlukları geri doldurulur; kazılan toprağın tamamı sahadan gitmeyebilir.",
    ] },
    { h: 'Sınırlar ve güvenlik uyarısı', p: [
      "Araç dikdörtgen tabanlı ve dört kenarı aynı eğimli kazılar için tasarlanmıştır. L biçimli ya da parçalı kazıları dikdörtgenlere bölüp ayrı ayrı hesaplayarak toplayabilirsiniz. Yamaç kazıları, kademeli temeller ve yol yarmaları için kesit yöntemleri gerekir.",
      "Sonuçlar keşif ve ön bütçe amaçlıdır. Kazı derinliği arttıkça göçük riski hızla büyür; şev açısı, iksa (destekleme) gereksinimi ve komşu yapıların güvenliği zemin etüdüne dayanarak yetkili mühendis tarafından belirlenmelidir. Hafriyat ruhsatı ve döküm sahası kuralları için belediyenizin güncel uygulamasını kontrol edin.",
    ] },
  ],
  faq: [
    ['1 kamyon hafriyat kaç m³ eder?', "Kamyonun kasa hacmine bağlıdır. Hafriyat işlerinde kullanılan damperli kamyonların kasası çoğunlukla 14–18 m³ arasındadır; küçük kamyonlarda 8–10 m³ olur. Araçtaki kasa hacmi alanına çalışacağınız aracın değerini yazın."],
    ['100 m² alanda 3 metre kazıdan kaç m³ toprak çıkar?', "Dik kazıda yerinde hacim 100 × 3 = 300 m³'tür. Yüzde 25 kabarma payıyla taşınacak hacim 375 m³ olur; 14 m³'lük kamyonla bu 27 sefer eder."],
    ['Şev oranını nasıl belirlerim?', "Şev oranı zeminin cinsine, yeraltı suyuna ve kazı derinliğine bağlıdır ve mühendislik kararıdır. Araç yalnızca verilen orana göre hacmi hesaplar; hangi şevin güvenli olduğu konusunda bir öneride bulunmaz."],
    ['Kabarma payı ile sıkışma payı aynı şey mi?', "Hayır. Kabarma, kazılan toprağın gevşeyince hacminin artmasıdır. Sıkışma ise dolgu yapılırken serilen malzemenin silindirle sıkıştırılınca hacminin azalmasıdır. Dolgu için malzeme hesaplarken sıkışma payı ayrıca düşünülür."],
    ['Dairesel kuyu ya da foseptik çukuru hesaplanabilir mi?', "Bu araç dikdörtgen tabanlı kazılar içindir. Dairesel bir çukurun hacmi π × yarıçap² × derinlik formülüyle bulunur; sonucu kabarma oranıyla çarparak taşınacak hacme geçebilirsiniz."],
    ['Kazılan toprağın ağırlığı ne kadardır?', "Zeminin cinsine ve nemine göre değişir; yerinde hacim için metreküp başına kabaca 1,6–2 ton arası değerler kullanılır. Kamyonun taşıma kapasitesi ağırlıkla sınırlı olduğundan ıslak zeminde sefer sayısı artabilir."],
    ['Hesap neden ortalama alan yöntemiyle bulduğumdan küçük çıkıyor?', "Taban ve üst alanın ortalamasını derinlikle çarpmak, şevli kazılarda köşeleri iki kez saydığı için hacmi büyük gösterir. Prizmoid formülü orta kesiti de hesaba kattığından geometrik olarak tam sonucu verir."],
    ['Yazdığım ölçüler bir yere gönderiliyor mu?', "Hayır. Tüm hesap tarayıcınızda yapılır; girdiğiniz ölçüler sunucuya iletilmez ve kaydedilmez."],
  ],
  related: ['temel-beton-hesapla', 'kum-cakil-hesapla', 'bahce-topragi-hesapla', 'egim-yuzdesi-hesapla', 'havuz-hacmi-hesapla'],
};
