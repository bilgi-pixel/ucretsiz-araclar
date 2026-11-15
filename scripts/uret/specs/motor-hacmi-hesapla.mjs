export default {
  slug: 'motor-hacmi-hesapla',
  title: 'Motor Hacmi (cc) Hesaplama',
  h1Tail: 'çap × strok × silindir',
  pageTitle: 'Motor Hacmi (cc) Hesaplama – Silindir Çapı ve Stroktan Hacim',
  description: 'Silindir çapı, strok ve silindir sayısından motor hacmini cc ve litre olarak hesaplayın; strok/çap oranını ve isteğe bağlı sıkıştırma oranını görün.',
  card: 'Silindir çapı, strok ve silindir sayısını girin; motor hacmini cc ve litre olarak, sıkıştırma oranıyla birlikte hesaplayın.',
  category: 'gunluk',
  keywords: ['motor hacmi hesaplama', 'cc hesaplama', 'silindir hacmi hesaplama', 'çap strok hesaplama', 'motor kaç cc', 'sıkıştırma oranı hesaplama', 'strok çap oranı'],
  lead: `Silindir çapını, strok uzunluğunu ve silindir sayısını yazın; araç motorun <strong>toplam süpürme hacmini</strong> santimetreküp (cc) ve litre olarak hesaplar. Yanma odası hacmini de girerseniz sıkıştırma oranını ayrıca verir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'cap', label: 'Silindir çapı (mm)', type: 'number', placeholder: 'Örn. 86' },
    { id: 'strok', label: 'Strok (mm)', type: 'number', placeholder: 'Örn. 86' },
    { id: 'silindir', label: 'Silindir sayısı', type: 'number', value: '4' },
    { id: 'yanma', label: 'Yanma odası hacmi (cc, isteğe bağlı)', type: 'number', placeholder: 'Örn. 50', hint: 'Tek silindirin üst ölü noktadaki hacmi; yalnızca sıkıştırma oranı için gerekir.' },
  ],
  compute(v, h) {
    const cap = h.pos(v.cap, 'Silindir çapı');
    const strok = h.pos(v.strok, 'Strok');
    const n = h.posint(v.silindir, 'Silindir sayısı');
    if (cap > 1500 || strok > 4000) h.err('Çap ve strok milimetre cinsinden girilmeli; değerler olağan dışı büyük görünüyor.');
    if (n > 64) h.err('"Silindir sayısı" en fazla 64 olabilir.');
    const tek = Math.PI / 4 * cap * cap * strok / 1000; // cm³
    const toplam = tek * n;
    const oran = strok / cap;
    let tip;
    if (Math.abs(oran - 1) < 0.005) tip = 'Kare motor (çap = strok)';
    else if (oran < 1) tip = 'Kısa stroklu (çap > strok)';
    else tip = 'Uzun stroklu (strok > çap)';
    const rows = [
      ['Toplam motor hacmi', h.fmt(toplam, 2) + ' cc'],
      ['Litre karşılığı', h.fmt(toplam / 1000, 3) + ' L'],
      ['Silindir başına hacim', h.fmt(tek, 2) + ' cc'],
      ['Strok / çap oranı', h.fmt(oran, 3)],
      ['Motor tipi', tip],
    ];
    if (String(v.yanma ?? '').trim() !== '') {
      const yc = h.pos(v.yanma, 'Yanma odası hacmi');
      rows.push(['Sıkıştırma oranı', h.fmt((tek + yc) / yc, 2) + ' : 1']);
    }
    return { rows, note: 'Hacim = π ÷ 4 × çap² × strok × silindir sayısı. Sonuç geometrik süpürme hacmidir; ruhsattaki değerle birkaç cc fark olabilir.' };
  },
  cases: [
    { in: { cap: '86', strok: '86', silindir: '4' }, out: { 'Toplam motor hacmi': '1.998,23 cc', 'Litre karşılığı': '1,998 L', 'Silindir başına hacim': '499,56 cc', 'Motor tipi': 'Kare motor (çap = strok)' } },
    { in: { cap: '79,5', strok: '80,5', silindir: '4', yanma: '40' }, out: { 'Toplam motor hacmi': '1.598,38 cc', 'Silindir başına hacim': '399,59 cc', 'Sıkıştırma oranı': '10,99 : 1', 'Motor tipi': 'Uzun stroklu (strok > çap)' } },
    { in: { cap: '52,4', strok: '57,8', silindir: '1' }, out: { 'Toplam motor hacmi': '124,65 cc', 'Litre karşılığı': '0,125 L' } },
    { in: { cap: '100', strok: '100', silindir: '1' }, out: { 'Toplam motor hacmi': '785,4 cc', 'Strok / çap oranı': '1' } },
    { in: { cap: '84', strok: '90', silindir: '6' }, out: { 'Toplam motor hacmi': '2.992,56 cc', 'Silindir başına hacim': '498,76 cc', 'Strok / çap oranı': '1,071' } },
    { in: { cap: '86', strok: '86', silindir: '4', yanma: '50' }, out: { 'Sıkıştırma oranı': '10,99 : 1' } },
    { in: { cap: '0', strok: '86', silindir: '4' }, error: true },
    { in: { cap: '86', strok: '86', silindir: '3,5' }, error: true },
  ],
  howto: [
    `"Silindir çapı" alanına pistonun çalıştığı silindirin iç çapını milimetre olarak yazın.`,
    `"Strok" alanına pistonun alt ölü nokta ile üst ölü nokta arasında kat ettiği mesafeyi milimetre olarak girin.`,
    `Silindir sayısını yazın; tek silindirli motosiklet motoru için 1, yaygın otomobil motorları için 3, 4 ya da 6 olur.`,
    `Sıkıştırma oranını da görmek istiyorsanız tek silindirin yanma odası hacmini cc olarak ekleyin; istemiyorsanız boş bırakın.`,
    `"Hesapla" düğmesine basın ve toplam hacmi cc ile litre olarak okuyun.`,
  ],
  sections: [
    { h: 'Motor hacmi nedir?', p: [
      `Motor hacmi, bütün pistonların üst ölü noktadan alt ölü noktaya inerken süpürdüğü toplam hacimdir. Türkiye'de gündelik dilde "cc" (santimetreküp) ya da litre ile söylenir: 1.600 cc'lik bir motor 1,6 litre olarak da anılır. Bu değer motorun her çevrimde içine alabileceği hava-yakıt karışımının kuramsal miktarını gösterdiği için güç, tork ve yakıt tüketimi hakkında kaba bir fikir verir.`,
      `Hacim tek başına gücü belirlemez. Aşırı besleme (turbo), sıkıştırma oranı, supap zamanlaması ve devir aralığı sonucu büyük ölçüde değiştirir; bugün 1,0 litrelik turbolu bir motor, geçmişin 1,6 litrelik atmosferik motorlarıyla benzer güç üretebilir. Yine de hacim, motorları sınıflandırmanın ve birbirleriyle karşılaştırmanın en temel ölçüsü olmayı sürdürür.`,
    ] },
    { h: 'Formül', p: [
      `Bir silindir geometrik olarak tabanı daire olan bir silindirdir. Taban alanı π ÷ 4 × çap², yükseklik ise strok kadardır. Dolayısıyla:`,
      `<strong>Tek silindir hacmi = π ÷ 4 × çap² × strok</strong> ve <strong>toplam hacim = tek silindir hacmi × silindir sayısı</strong>.`,
      `Çap ve strok milimetre girildiğinde sonuç milimetreküp çıkar; 1 cm³ = 1.000 mm³ olduğundan sonucu 1.000'e bölerek cc elde edilir. Litreye geçmek için cc değeri bir kez daha 1.000'e bölünür.`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `Çapı 86 mm, stroku 86 mm olan dört silindirli bir motor düşünelim. Çapın karesi 86 × 86 = 7.396'dır. Bunu strokla çarpınca 7.396 × 86 = 636.056 bulunur. π ÷ 4 yaklaşık 0,785398 olduğundan tek silindirin hacmi 636.056 × 0,785398 = 499.558 mm³, yani yaklaşık <strong>499,56 cc</strong> eder.`,
      `Dört silindir için 499,56 × 4 = <strong>1.998,23 cc</strong> bulunur; bu motor piyasada "2.0" ya da "2 litre" olarak anılır. Çap ile strok eşit olduğu için strok/çap oranı 1'dir ve araç bu motoru "kare motor" olarak etiketler.`,
      `Aynı motorda tek silindirin yanma odası hacmi 50 cc ise sıkıştırma oranı (499,56 + 50) ÷ 50 = 10,99 olur ve 10,99 : 1 biçiminde gösterilir.`,
    ] },
    { h: 'Strok/çap oranı ne anlatır?', p: [
      `Aynı hacim farklı çap ve strok bileşimleriyle elde edilebilir ve bu seçim motorun karakterini etkiler. <strong>Kısa stroklu</strong> (çapı strokundan büyük) motorlarda piston her turda daha kısa yol kat eder; bu, yüksek devirlere çıkmayı kolaylaştırır ve büyük supaplara yer açar. Spor otomobil ve yarış motosikleti motorları genellikle bu yapıdadır.`,
      `<strong>Uzun stroklu</strong> motorlarda krank kolu daha uzundur; düşük ve orta devirlerde tork üretimi güçlüdür. Dizel motorların ve günümüzün küçük hacimli verimlilik odaklı benzinli motorlarının çoğu uzun strokludur. Çapın stroka eşit olduğu <strong>kare motorlar</strong> iki özelliğin dengesini hedefler. Bunlar eğilimlerdir; gerçek davranışı motorun bütün tasarımı belirler.`,
    ] },
    { h: 'Sıkıştırma oranı', p: [
      `Sıkıştırma oranı, piston alt ölü noktadayken silindirdeki toplam hacmin, piston üst ölü noktadayken kalan hacme (yanma odası hacmi) oranıdır: <strong>(süpürme hacmi + yanma odası hacmi) ÷ yanma odası hacmi</strong>. Yanma odası hacmi; silindir kapağındaki oyuk, conta kalınlığı, piston tepesinin biçimi ve pistonun blok yüzeyine uzaklığından oluşur. Motor yenileme işlerinde kapak taşlandığında ya da farklı kalınlıkta conta kullanıldığında bu hacim, dolayısıyla sıkıştırma oranı değişir.`,
      `Benzinli motorlarda sıkıştırma oranı arttıkça verim yükselir, ancak vuruntu eğilimi de artar; bu yüzden oranın yakıtın oktan değeriyle uyumlu olması gerekir. Dizel motorlar çok daha yüksek sıkıştırma oranlarıyla çalışır, çünkü yakıt kıvılcımla değil sıkıştırmanın oluşturduğu ısıyla tutuşur.`,
    ] },
    { h: 'Nerelerde işe yarar, nelere dikkat edilir?', ul: [
      `Motor yenileme (rektifiye) sonrası silindirler bir üst ölçüye açıldığında yeni hacmi görmek için: çapı örneğin 0,5 mm artırıp tekrar hesaplayın.`,
      `Motosiklet, kart ve model motorlarında sınıf sınırının (örneğin 125 cc) aşılıp aşılmadığını kontrol etmek için.`,
      `Teknik eğitimde ve meslek lisesi derslerinde çap-strok-hacim ilişkisini uygulamalı göstermek için.`,
      `Üreticiler hacmi yuvarlayarak duyurur: 1.598 cc bir motor "1.6" olarak satılır. Hesap sonucu ile ruhsattaki değer arasındaki birkaç cc'lik fark, ölçülerin yuvarlanmasından kaynaklanır.`,
      `Vergi ve sigorta gibi konularda geçerli olan değer hesap sonucu değil, aracın resmî belgelerinde yazan silindir hacmidir; hacme bağlı vergi dilimleri için güncel mevzuatı kontrol edin.`,
      `Silindir ölçüsünü büyütmek motorun dayanımını ve tescil bilgilerini etkileyebilir; uygulama öncesinde yetkin bir motor ustasına danışın. Bu sayfadaki sonuç bilgilendirme amaçlıdır.`,
    ] },
  ],
  faq: [
    ['Motor hacmi nasıl hesaplanır?', `Silindir çapının karesi strokla ve π ÷ 4 (yaklaşık 0,7854) ile çarpılır; çıkan tek silindir hacmi silindir sayısıyla çarpılır. Ölçüler milimetre ise sonuç 1.000'e bölünerek cc bulunur.`],
    ['cc ile litre arasındaki ilişki nedir?', `1 litre 1.000 cc'dir. 1.998 cc'lik motor 1,998 litre eder ve genellikle 2.0 olarak anılır. cc, santimetreküpün İngilizce kısaltmasıdır.`],
    ['Strok nedir?', `Strok, pistonun silindir içinde en üst konumu ile en alt konumu arasında gittiği mesafedir. Krank milinin kol yarıçapının iki katına eşittir.`],
    ['Hesapladığım hacim ruhsattakinden neden farklı çıktı?', `Üreticiler çap ve strok değerlerini çoğunlukla bir ondalığa yuvarlayarak yayımlar; bu küçük yuvarlama birkaç cc fark doğurur. Resmî işlemlerde ruhsattaki değer geçerlidir.`],
    ['Silindir çapını büyütürsem hacim ne kadar artar?', `Hacim çapın karesiyle orantılıdır. 86 mm çap 86,5 mm yapılırsa hacim yaklaşık yüzde 1,2 artar; dört silindirli 1.998 cc motor yaklaşık 2.022 cc olur.`],
    ['Wankel (döner pistonlu) motorlarda bu hesap geçerli mi?', `Hayır. Bu araç pistonlu motorlar içindir. Döner pistonlu motorların hacmi rotor geometrisine göre farklı bir yöntemle belirlenir.`],
    ['Sıkıştırma oranı için hangi hacmi girmeliyim?', `Tek bir silindirin, piston üst ölü noktadayken kalan toplam hacmini cc olarak girin. Bu hacim kapak oyuğu, conta boşluğu ve piston tepesi biçiminin toplam etkisidir.`],
    ['Girdiğim ölçüler kaydediliyor mu?', `Hayır. Hesap tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve saklanmaz.`],
  ],
  related: ['beygir-kw-cevir', 'motor-guc-tork-hesapla', 'vites-hiz-hesapla', 'yakit-tuketimi-hesapla', 'tork-hesapla'],
};
