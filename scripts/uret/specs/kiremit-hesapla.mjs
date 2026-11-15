export default {
  slug: 'kiremit-hesapla',
  title: 'Kiremit Hesaplama',
  h1Tail: 'çatıya kaç kiremit gerekir?',
  pageTitle: 'Kiremit Hesaplama – Çatıya Kaç Adet Kiremit ve Mahya Gerekir?',
  description: 'Çatı alanı ve metrekareye düşen kiremit sayısından gereken kiremit adedini hesaplayın. Eğim, fire payı, mahya kiremidi ve toplam ağırlık dahil.',
  card: 'Çatı alanı, eğim ve metrekare tüketimine göre kiremit adedini, mahya kiremidini ve toplam ağırlığı hesaplayın.',
  category: 'insaat',
  keywords: ['kiremit hesaplama', 'çatıya kaç kiremit gider', 'm2 kaç kiremit', 'kiremit adet hesabı', 'mahya kiremidi hesaplama', 'kiremit fire payı', '100 m2 çatı kaç kiremit'],
  lead: 'Çatının alanını ve seçtiğiniz kiremidin metrekareye kaç adet döşendiğini yazın; araç fire payıyla birlikte <strong>toplam kiremit adedini</strong>, mahya kiremidi sayısını ve isterseniz çatıya binecek <strong>kiremit ağırlığını</strong> hesaplasın.',
  button: 'Hesapla',
  inputs: [
    { id: 'alanTur', label: 'Alan türü', type: 'select', options: [['egimli', 'Eğimli çatı yüzeyi alanı'], ['plan', 'Plan (taban) alanı + eğim']] },
    { id: 'alan', label: 'Alan (m²)', type: 'number', placeholder: 'Örn. 100' },
    { id: 'egim', label: 'Çatı eğimi (%)', type: 'number', placeholder: 'Örn. 33', hint: 'Yalnızca plan alanı seçildiyse gerekir.' },
    { id: 'm2Adet', label: 'm² başına kiremit adedi', type: 'number', value: '15', hint: 'Ürüne göre değişir; kiremidin teknik bilgisinden okuyun.' },
    { id: 'fire', label: 'Fire payı (%)', type: 'number', value: '5' },
    { id: 'mahya', label: 'Mahya uzunluğu (m)', type: 'number', value: '0', hint: 'Mahya ve varsa kırma sırtlarının toplam uzunluğu.' },
    { id: 'mahyaAdet', label: 'Metrede mahya kiremidi adedi', type: 'number', value: '3' },
    { id: 'agirlik', label: 'Bir kiremidin ağırlığı (kg)', type: 'number', placeholder: 'İsteğe bağlı' },
  ],
  compute(v, h) {
    const alan = h.pos(v.alan, 'Alan');
    const m2 = h.pos(v.m2Adet, 'm² başına kiremit adedi');
    const fire = h.nonneg(v.fire, 'Fire payı');
    const mahya = h.nonneg(v.mahya, 'Mahya uzunluğu');
    const mAdet = h.pos(v.mahyaAdet, 'Metrede mahya kiremidi adedi');
    if (fire > 100) h.err('"Fire payı" en fazla 100 olabilir.');
    let cati = alan;
    if (v.alanTur === 'plan') {
      const e = h.nonneg(v.egim, 'Çatı eğimi');
      if (e > 500) h.err('Çatı eğimi yüzde olarak yazılmalı; en fazla 500 olabilir.');
      cati = alan * Math.sqrt(1 + (e / 100) * (e / 100));
    }
    const k = 1 + fire / 100;
    const net = Math.ceil(cati * m2 - 1e-9);
    const adet = Math.ceil(cati * m2 * k - 1e-9);
    const mahyaAd = Math.ceil(mahya * mAdet * k - 1e-9);
    const rows = [
      ['Kiremit adedi', h.fmt(adet, 0) + ' adet'],
      ['Eğimli çatı alanı', h.fmt(cati, 2) + ' m²'],
      ['Fire hariç kiremit', h.fmt(net, 0) + ' adet'],
      ['Mahya kiremidi', h.fmt(mahyaAd, 0) + ' adet'],
    ];
    if (String(v.agirlik ?? '').trim() !== '') {
      const kg = h.pos(v.agirlik, 'Bir kiremidin ağırlığı');
      rows.push(['Toplam kiremit ağırlığı', h.fmt(adet * kg, 0) + ' kg']);
      rows.push(['m² başına ağırlık', h.fmt(m2 * kg, 2) + ' kg/m²']);
    }
    return { rows, note: 'Saçak başlangıç sırası, kenar kiremitleri ve havalandırma kiremitleri gibi özel parçalar ayrıca sayılmalıdır.' };
  },
  cases: [
    { in: { alanTur: 'egimli', alan: '100', m2Adet: '15', fire: '5', mahya: '10', mahyaAdet: '3' }, out: { 'Kiremit adedi': '1.575 adet', 'Eğimli çatı alanı': '100 m²', 'Fire hariç kiremit': '1.500 adet', 'Mahya kiremidi': '32 adet' } },
    { in: { alanTur: 'plan', alan: '80', egim: '75', m2Adet: '15', fire: '5', mahya: '0', mahyaAdet: '3' }, out: { 'Kiremit adedi': '1.575 adet', 'Eğimli çatı alanı': '100 m²', 'Mahya kiremidi': '0 adet' } },
    { in: { alanTur: 'egimli', alan: '120', m2Adet: '10', fire: '10', mahya: '12', mahyaAdet: '2,5' }, out: { 'Kiremit adedi': '1.320 adet', 'Fire hariç kiremit': '1.200 adet', 'Mahya kiremidi': '33 adet' } },
    { in: { alanTur: 'egimli', alan: '55,5', m2Adet: '12,5', fire: '0', mahya: '0', mahyaAdet: '3', agirlik: '3' }, out: { 'Kiremit adedi': '694 adet', 'Toplam kiremit ağırlığı': '2.082 kg', 'm² başına ağırlık': '37,5 kg/m²' } },
    { in: { alanTur: 'plan', alan: '100', egim: '33', m2Adet: '15', fire: '5', mahya: '0', mahyaAdet: '3' }, out: { 'Kiremit adedi': '1.659 adet', 'Eğimli çatı alanı': '105,3 m²', 'Fire hariç kiremit': '1.580 adet' } },
    { in: { alanTur: 'egimli', alan: '1', m2Adet: '15', fire: '0', mahya: '0', mahyaAdet: '3' }, out: { 'Kiremit adedi': '15 adet' } },
    { in: { alanTur: 'egimli', alan: '', m2Adet: '15' }, error: true },
    { in: { alanTur: 'plan', alan: '100', egim: '', m2Adet: '15' }, error: true },
    { in: { alanTur: 'egimli', alan: '100', m2Adet: '0' }, error: true },
  ],
  howto: [
    'Elinizdeki alanın türünü seçin: çatının eğimli yüzey alanını biliyorsanız ilk seçeneği, yalnızca binanın taban alanını biliyorsanız ikinci seçeneği kullanın.',
    'Alanı metrekare olarak yazın; plan alanı seçtiyseniz çatı eğimini yüzde olarak ekleyin.',
    'Kullanacağınız kiremidin metrekareye kaç adet döşendiğini girin ve fire payını belirleyin.',
    'Mahya kiremidi de hesaplansın istiyorsanız mahya uzunluğunu ve metredeki adedi yazın.',
    'İsterseniz bir kiremidin ağırlığını ekleyin ve "Hesapla" düğmesine basın.',
  ],
  sections: [
    { h: 'Kiremit sayısı nasıl hesaplanır?', p: [
      'Kiremit ihtiyacı, eğimli çatı yüzeyinin alanı ile kiremidin metrekare tüketiminin çarpımıdır: <strong>kiremit adedi = çatı alanı × m² başına adet × (1 + fire ÷ 100)</strong>. Sonuç bir üst tam sayıya yuvarlanır. Metrekare tüketimi, kiremidin boyutuna ve bindirme miktarına bağlıdır; üreticiler bu değeri ürün bilgisinde verir. Aynı adı taşıyan kiremit tiplerinde bile ölçüler markaya göre değişebildiği için varsayılan değeri kendi ürününüzün değeriyle değiştirmeniz gerekir.',
      'Hesapta en sık yapılan hata, eğimli yüzey yerine binanın taban alanını kullanmaktır. Çatı eğimli olduğu için yüzeyi taban alanından büyüktür. Yalnızca taban alanını biliyorsanız araç eğimi kullanarak gerçek yüzeyi bulur: <strong>çatı alanı = plan alanı × √(1 + (eğim ÷ 100)²)</strong>. Saçak çıkıntıları da çatı yüzeyine dahildir; plan alanını saçak uçlarından ölçmeyi unutmayın.',
    ] },
    { h: 'Çözümlü örnek: 100 m² çatı', p: [
      'Eğimli yüzeyi 100 m² olan bir çatıya metrekarede 15 adet döşenen bir kiremit uygulanacak olsun. Fire hariç ihtiyaç 100 × 15 = <strong>1.500 adet</strong> eder. Yüzde 5 fire payıyla 1.500 × 1,05 = <strong>1.575 adet</strong> sipariş edilir. Mahya 10 m uzunluğundaysa ve metreye 3 mahya kiremidi düşüyorsa 30 adet, fire ile 31,5 yani <strong>32 adet</strong> mahya kiremidi gerekir.',
      'Aynı çatının yalnızca taban ölçüsünü bildiğinizi düşünelim: plan alanı 80 m², eğim yüzde 75. Alan çarpanı √(1 + 0,75²) = 1,25 olduğundan eğimli yüzey 80 × 1,25 = 100 m² çıkar ve kiremit sayısı yine 1.575 olur. Taban alanı doğrudan kullanılsaydı 1.260 adet hesaplanır, 315 kiremit eksik kalırdı.',
    ] },
    { h: 'Fire payı ve özel parçalar', p: [
      'Kiremit kırılgan bir malzemedir; nakliye, çatıya çıkarma ve kesim sırasında bir bölümü zarar görür. Düz, dikdörtgen yüzeyli beşik çatılarda düşük bir pay yeterli olabilirken; kırma çatılarda, dere ve sırt bulunan, baca ve çatı penceresi çevresinde çok kesim gerektiren çatılarda pay yükselir. Çapraz kesilen her kiremidin yalnızca bir parçası kullanılabildiğinden karmaşık çatılarda yüzde 10 ve üzeri pay almak olağandır.',
    ], ul: [
      '<strong>Mahya kiremidi:</strong> iki yüzeyin birleştiği tepe çizgisini ve kırma çatılarda eğik sırtları kapatır; metre başına adedi üründen ürüne değişir.',
      '<strong>Kenar ve saçak parçaları:</strong> bazı sistemlerde kalkan kenarı ve saçak ucu için özel kiremitler bulunur.',
      '<strong>Havalandırma kiremitleri:</strong> çatı altı havalandırması için belirli aralıklarla yerleştirilir.',
      '<strong>Yedek:</strong> ileride kırılanları değiştirmek için aynı partiden bir miktar kiremit saklamak yararlıdır.',
    ] },
    { h: 'Çatıya binen yük', p: [
      'Kiremit ağır bir kaplamadır ve çatı konstrüksiyonu bu yükü taşıyacak biçimde tasarlanır. Bir kiremidin ağırlığını girerseniz araç toplam ağırlığı ve metrekareye düşen yükü gösterir. Örneğin metrekarede 12,5 adet döşenen ve tanesi 3 kg gelen bir kiremit, yalnızca kaplama olarak metrekareye 37,5 kg yük bindirir; 55,5 m² çatıda bu 694 kiremit ve 2.082 kg demektir.',
      'Bu değer yalnızca kiremidin kuru ağırlığıdır. Çıta, tahta ya da levha kaplama, su yalıtımı, kar ve rüzgâr yükleri ayrıca hesaba katılır. Mevcut bir çatıda daha ağır bir kiremide geçmeyi düşünüyorsanız taşıyıcı sistemin yeterliliğini mutlaka bir mühendise kontrol ettirin.',
    ] },
    { h: 'Sipariş öncesi kontrol listesi', ol: [
      'Çatı alanını saçak uçları dahil ölçtüğünüzden emin olun.',
      'Metrekare tüketimini seçtiğiniz ürünün teknik bilgisinden alın; çıta aralığı değişirse tüketim de değişir.',
      'Mahya ve sırt uzunluklarını ayrı ayrı ölçüp toplayın.',
      'Kiremitler palet ya da bağ halinde satılıyorsa adedi satış birimine yuvarlayın.',
      'Tüm ihtiyacı aynı üretim partisinden alın; partiler arasında renk tonu farkı olabilir.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Sonuç malzeme keşfi için yaklaşık bir değerdir. Araç kesim planı çıkarmaz, özel parçaları saymaz ve taşıyıcı sistem hesabı yapmaz. Hangi kiremidin hangi eğimde kullanılabileceği, çıta aralığı ve sabitleme yöntemi üreticinin uygulama kılavuzuna göre belirlenir. Çatı tasarımı ve yük hesabı için bir inşaat mühendisine ya da mimara danışın.',
    ] },
  ],
  faq: [
    ['1 metrekareye kaç kiremit gider?', 'Kiremidin tipine ve ölçüsüne göre değişir; küçük kiremitlerde sayı artar, büyük boyutlu kiremitlerde azalır. Kesin değer üreticinin ürün bilgisinde yazar. Araçtaki 15 varsayılan değerdir, kendi ürününüze göre değiştirin.'],
    ['100 m² çatıya kaç kiremit gerekir?', 'Metrekarede 15 adet döşenen bir kiremit ve yüzde 5 fire payıyla 1.575 adet gerekir. Metrekare tüketimi 10 olan büyük bir kiremitte aynı çatı için 1.050 adet yeterlidir.'],
    ['Evin taban alanını yazabilir miyim?', 'Evet, ancak "Plan alanı + eğim" seçeneğini kullanın ve eğimi girin. Taban alanını eğimli yüzey gibi yazarsanız kiremit eksik çıkar; eğim arttıkça fark büyür.'],
    ['Mahya kiremidi nasıl hesaplanır?', 'Mahya ve varsa sırtların toplam uzunluğu, metre başına düşen mahya kiremidi sayısıyla çarpılır ve fire payı eklenir. 10 m mahya ve metrede 3 adet için fire dahil 32 adet bulunur.'],
    ['Fire payı yüzde kaç alınmalı?', 'Basit beşik çatılarda yüzde 5 civarı çoğu zaman yeterlidir. Kırma çatılarda, dere ve baca gibi kesim gerektiren ayrıntıların çok olduğu çatılarda yüzde 10 ve üzeri almak daha güvenlidir.'],
    ['Kiremit ağırlığını neden girmeliyim?', 'Zorunlu değildir. Girdiğinizde nakliye için toplam tonajı ve çatıya metrekare başına binen kaplama yükünü görürsünüz; bu bilgi taşıyıcı sistem değerlendirmesinde işe yarar.'],
    ['Sac ya da shingle kaplama için kullanabilir miyim?', 'Araç adet üzerinden satılan kiremitler içindir. Levha ya da rulo biçimindeki kaplamalarda çatı alanını bulup ürünün faydalı örtme alanına bölmek gerekir; çatı alanı için ilgili aracı kullanabilirsiniz.'],
    ['Girdiğim bilgiler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['cati-alani-hesapla', 'egim-yuzdesi-hesapla', 'tugla-hesapla', 'yagmur-suyu-hasadi-hesapla', 'alan-cevre-hesapla'],
};
