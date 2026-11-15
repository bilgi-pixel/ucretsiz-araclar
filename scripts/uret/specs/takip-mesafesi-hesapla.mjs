export default {
  slug: 'takip-mesafesi-hesapla',
  title: 'Takip Mesafesi Hesaplama',
  h1Tail: '2 saniye ve hızın yarısı kuralı',
  pageTitle: 'Takip Mesafesi Hesaplama – 2 Saniye ve Hızın Yarısı Kuralı',
  description: 'Hızınıza göre öndeki araçla bırakmanız gereken takip mesafesini metre olarak hesaplayın: saniye kuralı, hızın yarısı kuralı ve araç boyu karşılığı.',
  card: 'Hızınıza göre güvenli takip mesafesini metre olarak bulun; 2 saniye ve hızın yarısı kurallarını birlikte görün.',
  category: 'gunluk',
  keywords: ['takip mesafesi hesaplama', 'takip mesafesi kaç metre', '2 saniye kuralı', 'hızın yarısı kuralı', '88 89 kuralı', 'güvenli takip mesafesi', 'öndeki araçla mesafe'],
  lead: `Seyir hızınızı yazın; araç öndeki taşıtla aranızda bırakmanız gereken mesafeyi <strong>saniye kuralına</strong> ve <strong>hızın yarısı kuralına</strong> göre metre olarak hesaplar, bunun kaç araç boyuna denk geldiğini gösterir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'hiz', label: 'Hız (km/sa)', type: 'number', placeholder: 'Örn. 90' },
    { id: 'sure', label: 'Takip süresi (saniye)', type: 'number', value: '2', hint: 'Normal koşulda 2; yağış, sis, gece ya da ağır araçta 3–4 saniye seçin.' },
    { id: 'boy', label: 'Araç boyu (m)', type: 'number', value: '4,5', hint: 'Mesafeyi araç boyu cinsinden görmek için.' },
  ],
  compute(v, h) {
    const kmh = h.pos(v.hiz, 'Hız');
    const sure = h.pos(v.sure, 'Takip süresi');
    const boy = h.opt(v.boy, 4.5, 'Araç boyu');
    if (kmh > 400) h.err('"Hız" en fazla 400 km/sa olabilir.');
    if (sure > 20) h.err('"Takip süresi" saniye cinsinden girilmeli; en fazla 20 olabilir.');
    if (!(boy > 0) || boy > 30) h.err('"Araç boyu" 0 ile 30 metre arasında olmalı.');
    const ms = kmh / 3.6;
    const d = ms * sure;
    const yari = kmh / 2;
    return {
      rows: [
        ['Takip mesafesi (süre kuralı)', h.fmt(d, 1) + ' m'],
        ['Hızın yarısı kuralı', h.fmt(yari, 1) + ' m'],
        ['Saniyede gidilen yol', h.fmt(ms, 2) + ' m'],
        ['Araç boyu karşılığı', h.fmt(d / boy, 1) + ' araç boyu'],
        ['Hızın yarısı kuralının süre karşılığı', h.fmt(yari / ms, 1) + ' sn'],
        ['Kötü hava için (sürenin iki katı)', h.fmt(d * 2, 1) + ' m'],
      ],
      note: 'Takip mesafesi = hız (m/sn) × süre. Bu değerler alt sınırdır; yağış, sis, kar, yorgunluk ve ağır yükte mesafeyi artırın.',
    };
  },
  cases: [
    { in: { hiz: '90', sure: '2', boy: '4,5' }, out: { 'Takip mesafesi (süre kuralı)': '50 m', 'Hızın yarısı kuralı': '45 m', 'Saniyede gidilen yol': '25 m', 'Araç boyu karşılığı': '11,1 araç boyu', 'Kötü hava için (sürenin iki katı)': '100 m' } },
    { in: { hiz: '120', sure: '2', boy: '4,5' }, out: { 'Takip mesafesi (süre kuralı)': '66,7 m', 'Hızın yarısı kuralı': '60 m', 'Araç boyu karşılığı': '14,8 araç boyu' } },
    { in: { hiz: '50', sure: '3', boy: '4,5' }, out: { 'Takip mesafesi (süre kuralı)': '41,7 m', 'Hızın yarısı kuralı': '25 m' } },
    { in: { hiz: '72', sure: '2' }, out: { 'Takip mesafesi (süre kuralı)': '40 m', 'Hızın yarısı kuralı': '36 m', 'Saniyede gidilen yol': '20 m', 'Araç boyu karşılığı': '8,9 araç boyu' } },
    { in: { hiz: '110', sure: '4', boy: '12' }, out: { 'Takip mesafesi (süre kuralı)': '122,2 m', 'Hızın yarısı kuralı': '55 m', 'Araç boyu karşılığı': '10,2 araç boyu' } },
    { in: { hiz: '36', sure: '2', boy: '4' }, out: { 'Takip mesafesi (süre kuralı)': '20 m', 'Hızın yarısı kuralı': '18 m', 'Hızın yarısı kuralının süre karşılığı': '1,8 sn', 'Araç boyu karşılığı': '5 araç boyu' } },
    { in: { hiz: '', sure: '2', boy: '4,5' }, error: true },
    { in: { hiz: '90', sure: '0', boy: '4,5' }, error: true },
  ],
  howto: [
    `"Hız" alanına seyir hızınızı kilometre/saat olarak yazın.`,
    `"Takip süresi" alanını koşullara göre ayarlayın: iyi hava ve kuru yolda 2 saniye, yağışta ya da gece 3–4 saniye.`,
    `İsterseniz kendi aracınızın boyunu girin; binek otomobiller için varsayılan 4,5 metredir.`,
    `"Hesapla" düğmesine basın ve iki kuralın verdiği mesafeleri karşılaştırın; yolda büyük olanı esas almak daha güvenlidir.`,
  ],
  sections: [
    { h: 'Takip mesafesi nedir?', p: [
      `Takip mesafesi, aynı şeritte ilerleyen iki araç arasında bırakılan boşluktur. Öndeki araç ani fren yaptığında arkadaki sürücünün durumu fark edip frene basması zaman alır; bu sürede araç hızını kesmeden ilerler. Aradaki boşluk bu yolu karşılamıyorsa arkadan çarpma kaçınılmaz olur. Arkadan çarpmalar, trafik kazalarının en sık görülen türlerinden biridir ve büyük bölümü yetersiz takip mesafesinden kaynaklanır.`,
      `Mesafeyi metre olarak tahmin etmek sürüş sırasında zordur. Bu yüzden sürücü eğitimlerinde iki pratik kural öğretilir: hızın yarısı kuralı ve iki saniye kuralı. Bu sayfa ikisini de aynı anda hesaplar.`,
    ] },
    { h: 'Hızın yarısı kuralı', p: [
      `Bu kurala göre takip mesafesi, kilometre/saat cinsinden hızın yarısı kadar metre olmalıdır. 90 km/sa hızla giden araç en az 45 metre, 120 km/sa hızla giden araç en az 60 metre boşluk bırakır. Kural, hesap makinesi gerektirmediği için akılda kalıcıdır ve Türkiye'de sürücü kurslarında, ehliyet sınavı sorularında bu biçimde anlatılır.`,
      `Kuralın süre karşılığı sabittir: hızın yarısı kadar metre, hız ne olursa olsun 1,8 saniyelik yola denk gelir. Yani hızın yarısı kuralı aslında iki saniye kuralının biraz daha kısa bir biçimidir.`,
    ] },
    { h: 'İki saniye kuralı ve 88-89 yöntemi', p: [
      `İki saniye kuralında mesafe metreyle değil zamanla ölçülür: öndeki araçla aranızda en az iki saniyelik yol olmalıdır. Yolda uygulaması kolaydır. Öndeki araç bir direğin, köprünün ya da levhanın hizasından geçtiği anda içinizden "seksen sekiz, seksen dokuz" deyin. Bu iki sözcüğü söylemek yaklaşık iki saniye sürer. Saymayı bitirmeden aynı noktaya ulaşıyorsanız fazla yakınsınız demektir.`,
      `Formül basittir: <strong>takip mesafesi = hız (m/sn) × süre</strong>; hız metre/saniyeye km/sa değeri 3,6'ya bölünerek çevrilir. Zamana dayalı kuralın üstünlüğü, hız arttıkça mesafenin kendiliğinden uzamasıdır.`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `Şehirler arası yolda 90 km/sa hızla gittiğinizi düşünün. Hızınız 90 ÷ 3,6 = 25 m/sn'dir; yani her saniyede 25 metre yol alırsınız. İki saniye kuralına göre takip mesafesi 25 × 2 = <strong>50 metre</strong> olur. Hızın yarısı kuralı 90 ÷ 2 = <strong>45 metre</strong> verir. 4,5 metrelik bir otomobil için 50 metre, yaklaşık 11,1 araç boyudur.`,
      `Yağmur başladığında süreyi iki katına çıkarmak yaygın bir öneridir: 4 saniye için mesafe 100 metreye ulaşır. 120 km/sa otoyol hızında iki saniyelik mesafe 66,7 metre, hızın yarısı kuralı 60 metredir. Trafikte sıkça görülen "iki üç araç boyu" aralığın bu değerlerin ne kadar altında kaldığı açıktır.`,
    ] },
    { h: 'Ne zaman daha uzun mesafe gerekir?', ul: [
      `<strong>Islak, karlı ya da buzlu zemin:</strong> fren mesafesi birkaç katına çıkabilir; süreyi en az 4 saniyeye yükseltin.`,
      `<strong>Sis, yoğun yağış ve gece:</strong> görüş kısaldığı için tehlikeyi fark etmek gecikir.`,
      `<strong>Ağır ve uzun araçlar:</strong> kamyon, otobüs ve römorklu araçların fren mesafesi daha uzundur. Bu araçlar için mevzuatta ayrıca belirlenmiş asgari mesafeler bulunabilir.`,
      `<strong>Motosiklet takip ederken:</strong> motosikletler çoğu otomobilden daha kısa mesafede durabilir ve düşen sürücüye çarpmamak için ek pay gerekir.`,
      `<strong>Yorgunluk ve dikkat dağınıklığı:</strong> reaksiyon süresi uzadığında iki saniyelik pay yetersiz kalır.`,
      `<strong>Tünel, viraj ve yokuş inişleri:</strong> kaçış alanı sınırlı olduğu için daha geniş boşluk bırakmak gerekir.`,
    ] },
    { h: 'Yasal çerçeve ve sınırlar', p: [
      `Takip mesafesine uymamak trafik mevzuatında kural ihlali sayılır ve idari para cezası ile ceza puanı uygulanabilir; arkadan çarpmalarda kusur değerlendirmesinde de takip mesafesi belirleyici olur. Asgari mesafenin nasıl tanımlandığı, özel taşıt türleri için öngörülen değerler ve ceza tutarları zaman içinde değişebildiğinden güncel mevzuatı kontrol edin.`,
      `Bu sayfa, yaygın olarak öğretilen iki kuralın aritmetiğini yapar. Sonuçlar alt sınır niteliğindedir ve bilgilendirme amaçlıdır; gerçek güvenli mesafe yolun, havanın, aracınızın ve sizin o anki durumunuza bağlıdır. Kuşkuya düştüğünüzde mesafeyi artırmak her zaman doğru karardır.`,
    ] },
  ],
  faq: [
    ['Takip mesafesi nasıl hesaplanır?', `İki yaygın yöntem vardır: kilometre/saat cinsinden hızın yarısı kadar metre bırakmak ya da iki saniyede gidilen yol kadar mesafe bırakmak. İkinci yöntemde hız 3,6'ya bölünüp 2 ile çarpılır.`],
    ['90 km/sa hızla giderken takip mesafesi kaç metre olmalı?', `Hızın yarısı kuralına göre en az 45 metre, iki saniye kuralına göre 50 metre. Yağışlı havada bu değerlerin iki katını bırakmak önerilir.`],
    ['88-89 kuralı nedir?', `Öndeki araç sabit bir noktadan geçtiği anda "seksen sekiz, seksen dokuz" diye sayılır. Sayma bitmeden aynı noktaya varılıyorsa aradaki mesafe iki saniyenin altındadır ve yetersizdir.`],
    ['Hızın yarısı kuralı ile iki saniye kuralı neden farklı sonuç veriyor?', `Hızın yarısı kadar metre, her hızda 1,8 saniyelik yola karşılık gelir. İki saniye kuralı bundan yaklaşık yüzde 11 daha uzun mesafe verir.`],
    ['Şehir içinde de takip mesafesi bırakmak gerekir mi?', `Evet. 50 km/sa hızda iki saniyelik mesafe yaklaşık 27,8 metre, hızın yarısı kuralına göre 25 metredir. Düşük hızda bile arkadan çarpma, boyun yaralanmalarına yol açabilir.`],
    ['Araya başka araç girerse ne yapmalıyım?', `Gazdan ayağınızı çekerek mesafeyi yeniden açın. Boşluğu kapatmaya çalışmak yolculuk süresini kayda değer biçimde kısaltmaz ama riski büyütür.`],
    ['Kamyon ve otobüsler için mesafe farklı mı?', `Ağır araçların fren mesafesi daha uzun olduğundan daha büyük boşluk gerekir ve mevzuatta bu taşıtlar için ayrıca asgari değerler öngörülmüş olabilir. Güncel mevzuatı kontrol edin.`],
    ['Girdiğim bilgiler saklanıyor mu?', `Hayır. Hesap tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez.`],
  ],
  related: ['fren-mesafesi-hesapla', 'hiz-hesapla', 'yakit-tuketimi-hesapla', 'lastik-karsilastir', 'kilometre-maliyeti-hesapla'],
};
