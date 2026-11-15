export default {
  slug: 'toner-omru-hesapla',
  title: 'Toner ve Kartuş Ömrü Hesaplama',
  h1Tail: 'kaç gün yeter?',
  pageTitle: 'Toner ve Kartuş Ömrü Hesaplama – Kaç Gün, Kaç Sayfa Yeter?',
  description: 'Kartuşun sayfa verimi, doluluk oranı, kalan toner yüzdesi ve günlük baskı adedinden tonerin kaç iş günü yeteceğini ve yıllık kartuş ihtiyacını hesaplayın.',
  card: 'Toner ya da kartuşunuzun kaç sayfa ve kaç iş günü daha yeteceğini, yılda kaç kartuş gerekeceğini hesaplayın.',
  category: 'gunluk',
  keywords: ['toner ömrü hesaplama', 'kartuş kaç sayfa basar', 'toner kaç gün yeter', 'kartuş ömrü hesaplama', 'yıllık toner ihtiyacı', 'toner sayfa verimi', 'kalan toner kaç sayfa'],
  lead: "Elinizdeki toner ya da mürekkep kartuşunun <strong>kaç sayfa ve kaç iş günü daha yeteceğini</strong> hesaplayın. Araç, kutudaki verimi gerçek doluluk oranınıza ve kalan toner yüzdesine göre düzeltir; ayrıca bir yılda kaç kartuş gerekeceğini gösterir.",
  button: 'Hesapla',
  inputs: [
    { id: 'verim', label: 'Kartuşun sayfa verimi', type: 'number', placeholder: 'Örn. 3000', hint: 'Kutuda yazan değer; %5 doluluk için verilir.' },
    { id: 'doluluk', label: 'Gerçek doluluk oranı (%)', type: 'number', value: '5' },
    { id: 'kalan', label: 'Kalan toner (%)', type: 'number', value: '100', hint: 'Yeni kartuş için 100; yazıcının durum sayfasındaki değer.' },
    { id: 'gunluk', label: 'Günlük baskı adedi (sayfa)', type: 'number', placeholder: 'Örn. 50' },
    { id: 'isGunu', label: 'Aylık çalışma günü', type: 'number', value: '22' },
  ],
  compute(v, h) {
    const verim = h.pos(v.verim, 'Kartuşun sayfa verimi');
    const dol = h.opt(v.doluluk, 5, 'Gerçek doluluk oranı');
    if (!(dol > 0) || dol > 100) h.err('Doluluk oranı 0 ile 100 arasında olmalı; emin değilseniz 5 yazın.');
    const kalan = h.opt(v.kalan, 100, 'Kalan toner');
    if (kalan < 0 || kalan > 100) h.err('Kalan toner yüzdesi 0 ile 100 arasında olmalı.');
    const gunluk = h.pos(v.gunluk, 'Günlük baskı adedi');
    const isGunu = h.opt(v.isGunu, 22, 'Aylık çalışma günü');
    if (!(isGunu > 0) || isGunu > 31) h.err('Aylık çalışma günü 1 ile 31 arasında olmalı.');
    const tamVerim = verim * 5 / dol;
    const kalanSayfa = tamVerim * kalan / 100;
    const gun = kalanSayfa / gunluk;
    const yillikSayfa = gunluk * isGunu * 12;
    const yillikKartus = yillikSayfa / tamVerim;
    const adet = Math.ceil(yillikKartus - 1e-9);
    return {
      rows: [
        ['Kartuş ömrü', h.fmt(gun, 1) + ' iş günü'],
        ['Basılabilecek sayfa', h.fmt(kalanSayfa, 0) + ' sayfa'],
        ['Takvim karşılığı', h.fmt(gun / isGunu, 2) + ' ay'],
        ['Dolu kartuşun gerçek verimi', h.fmt(tamVerim, 0) + ' sayfa'],
        ['Yıllık baskı adedi', h.fmt(yillikSayfa, 0) + ' sayfa'],
        ['Yıllık kartuş ihtiyacı', h.fmt(yillikKartus, 2) + ' adet (' + adet + ' kartuş)'],
      ],
      note: 'Gerçek verim = kutudaki verim × 5 ÷ doluluk. Yıl 12 ay ve her ay girdiğiniz çalışma günü kadar baskı yapıldığı varsayılmıştır.',
    };
  },
  cases: [
    { in: { verim: '3000', doluluk: '5', kalan: '100', gunluk: '50', isGunu: '22' }, out: { 'Kartuş ömrü': '60 iş günü', 'Basılabilecek sayfa': '3.000 sayfa', 'Takvim karşılığı': '2,73 ay', 'Yıllık baskı adedi': '13.200 sayfa', 'Yıllık kartuş ihtiyacı': '4,4 adet (5 kartuş)' } },
    { in: { verim: '1500', doluluk: '10', kalan: '100', gunluk: '30', isGunu: '22' }, out: { 'Kartuş ömrü': '25 iş günü', 'Dolu kartuşun gerçek verimi': '750 sayfa', 'Takvim karşılığı': '1,14 ay', 'Yıllık kartuş ihtiyacı': '10,56 adet (11 kartuş)' } },
    { in: { verim: '3000', doluluk: '5', kalan: '40', gunluk: '50', isGunu: '22' }, out: { 'Kartuş ömrü': '24 iş günü', 'Basılabilecek sayfa': '1.200 sayfa', 'Yıllık kartuş ihtiyacı': '4,4 adet (5 kartuş)' } },
    { in: { verim: '12000', gunluk: '200', isGunu: '26' }, out: { 'Kartuş ömrü': '60 iş günü', 'Takvim karşılığı': '2,31 ay', 'Yıllık baskı adedi': '62.400 sayfa', 'Yıllık kartuş ihtiyacı': '5,2 adet (6 kartuş)' } },
    { in: { verim: '2000', doluluk: '2,5', gunluk: '100', isGunu: '20' }, out: { 'Kartuş ömrü': '40 iş günü', 'Dolu kartuşun gerçek verimi': '4.000 sayfa', 'Takvim karşılığı': '2 ay', 'Yıllık kartuş ihtiyacı': '6 adet (6 kartuş)' } },
    { in: { verim: '1000', kalan: '0', gunluk: '10' }, out: { 'Kartuş ömrü': '0 iş günü', 'Basılabilecek sayfa': '0 sayfa' } },
    { in: { verim: '3000', gunluk: '0' }, error: true },
    { in: { verim: '3000', kalan: '120', gunluk: '50' }, error: true },
    { in: { verim: '', gunluk: '50' }, error: true },
  ],
  howto: [
    'Kartuşun kutusunda ya da ürün sayfasında yazan sayfa verimini girin.',
    'Baskılarınızın ortalama doluluk oranını yazın. Düz yazı ağırlıklı işler için 5 uygundur; tablolu ve görselli işler için artırın.',
    'Kartuş yeni değilse yazıcının durum sayfasında ya da ekranında görünen kalan toner yüzdesini girin.',
    'Günde ortalama kaç sayfa bastığınızı ve ayda kaç gün baskı yaptığınızı yazın.',
    'Hesapla düğmesine basın; kartuşun kaç iş günü yeteceğini, takvim karşılığını ve yıllık kartuş ihtiyacını görün.',
  ],
  sections: [
    { h: 'Toner ömrü nasıl hesaplanır?', p: [
      'Bir kartuşun ömrü iki şeye bağlıdır: içindeki tonerin kaç sayfa basabildiği ve sizin ne hızla baskı yaptığınız. Hesap üç adımdan oluşur. Önce kutudaki verim gerçek doluluğa göre düzeltilir: <strong>gerçek verim = verim × 5 ÷ doluluk</strong>. Sonra kalan toner yüzdesi uygulanır: <strong>basılabilecek sayfa = gerçek verim × kalan ÷ 100</strong>. Son olarak bu sayı günlük baskı adedine bölünür: <strong>ömür (iş günü) = basılabilecek sayfa ÷ günlük sayfa</strong>.',
      'Çözümlü örnek: 3.000 sayfa verimli yeni bir toner, %5 dolulukla günde 50 sayfa basılıyorsa 3.000 ÷ 50 = 60 iş günü dayanır. Ayda 22 gün çalışılan bir ofiste bu 60 ÷ 22 = 2,73 ay eder. Yılda 50 × 22 × 12 = 13.200 sayfa basılacağından yıllık ihtiyaç 13.200 ÷ 3.000 = 4,4 kartuştur; yani yıl içinde beşinci kartuşu da almanız gerekir.',
    ] },
    { h: 'Kalan toner yüzdesiyle hesap', p: [
      'Yazıcıların çoğu kalan toner düzeyini yüzde olarak bildirir. Bu değeri yapılandırma ya da sarf malzeme durum sayfasından, cihazın ekranından ya da sürücü yazılımından okuyabilirsiniz. Aynı örnekte toner %40 düzeyindeyse basılabilecek sayfa 3.000 × 0,40 = 1.200 olur ve günde 50 sayfayla 24 iş günü, yani bir aydan biraz fazla süre kalmış demektir. Bu bilgi, yedek kartuşu ne zaman sipariş etmeniz gerektiğini belirler.',
      'Yüzde göstergesi kesin bir ölçüm değil, tahmindir. Yazıcı, bastığı piksel sayısından ya da kartuştaki algılayıcıdan yola çıkarak düzeyi kestirir; dolum ya da muadil kartuşlarda gösterge yanlış çalışabilir. "Toner az" uyarısı çıktıktan sonra birçok cihaz bir süre daha baskıya devam eder; bu yüzden uyarıyı kartuşun bittiği an olarak değil, sipariş zamanı olarak değerlendirmek daha doğrudur.',
    ] },
    { h: 'Doluluk oranının etkisi', p: [
      'Kartuş verimleri yaklaşık %5 doluluk varsayımıyla beyan edilir. Bu, A4 sayfanın yalnızca yirmide birinin tonerle kaplandığı, kısa bir yazışmaya denk gelen bir yoğunluktur. Gerçek belgeler çoğu zaman daha doludur. Doluluk %10 ise verim yarıya, %15 ise üçte bire iner. 1.500 sayfalık bir kartuş %10 dolulukla yalnızca 750 sayfa basar; günde 30 sayfalık bir kullanımda bu 25 iş günü demektir.',
      'Tersine, yalnızca birkaç satırlık fiş, etiket ya da barkod basan cihazlarda doluluk %5\'in altında kalabilir ve kartuş kutuda yazandan uzun dayanır. Doluluğu bilmiyorsanız en sağlıklı yöntem geçmişe bakmaktır: son kartuşla kaç sayfa bastığınızı sayaçtan okuyup kutudaki verime oranlarsanız kendi ortalama doluluğunuzu bulursunuz. Örneğin 3.000 sayfalık kartuş 2.000 sayfada bittiyse doluluk yaklaşık 5 × 3.000 ÷ 2.000 = %7,5\'tir.',
    ] },
    { h: 'Stok ve sipariş planlaması', p: [
      'Ofis, okul, muayenehane ve mali müşavirlik büroları gibi baskının işin parçası olduğu yerlerde tonerin beklenmedik anda bitmesi işi durdurur. Kartuş ömrünü bilmek, yedek kartuşu erken alıp parayı rafa bağlamak ile tonersiz kalmak arasında denge kurmanızı sağlar. Pratik bir kural: tedarik süreniz kaç iş günüyse, kalan ömür o sayının biraz üzerine düştüğünde sipariş verin. Kargoyla üç günde gelen bir kartuş için kalan ömür bir haftaya indiğinde sipariş vermek yeterli pay bırakır.',
      'Yıllık kartuş ihtiyacı satırı bütçe hazırlarken işe yarar. Araç ondalıklı değeri ve yukarı yuvarlanmış adedi birlikte verir; 4,4 adet sonucu, yıl içinde beş kartuş satın alacağınız ama beşincinin büyük kısmının ertesi yıla kalacağı anlamına gelir. Birden çok yazıcınız varsa her biri için ayrı hesap yapıp toplayabilirsiniz.',
    ] },
    { h: 'Mürekkep kartuşları ve sınırlar', p: [
      'Hesap mantığı mürekkep püskürtmeli yazıcılar için de geçerlidir, ancak bu cihazlarda verimi düşüren ek bir etken vardır: baş temizleme. Yazıcı her açılışta ve uzun aralardan sonra püskürtme uçlarını temizlemek için mürekkep harcar. Seyrek kullanılan bir ev yazıcısında kartuş, hiç baskı yapılmasa bile zamanla azalır ya da kuruyabilir. Bu yüzden düşük kullanımda sonuçları üst sınır olarak değerlendirin.',
      'Araç her gün aynı sayıda sayfa basıldığını varsayar; dönem sonu yoğunluğu, sınav haftası ya da kampanya dönemi gibi dalgalanmaları bilemez. Toner tasarruf modu, baskı yoğunluğu ayarı ve kâğıt türü de tüketimi değiştirir. Sonuçlar planlama amaçlı bir tahmindir; kesin değer için cihazınızın sayaç kayıtlarını izleyin.',
    ] },
  ],
  faq: [
    ['Bir toner kaç sayfa basar?', 'Kutusunda yazan sayfa verimi kadar, ancak bu değer yüzde 5 doluluk içindir. Sayfalarınız daha yoğunsa verim orantılı olarak düşer; yüzde 10 dolulukta yarıya iner.'],
    ['Tonerim kaç gün yeter, nasıl hesaplarım?', 'Basılabilecek sayfa sayısını günlük baskı adedinize bölün. 3.000 sayfalık kartuş günde 50 sayfayla 60 iş günü dayanır. Araç bunu doluluk ve kalan yüzdeyle düzelterek hesaplar.'],
    ['Kalan toner yüzdesini nereden öğrenirim?', 'Yazıcının yapılandırma ya da sarf malzeme durum sayfasını yazdırarak, cihaz ekranındaki sarf malzeme menüsünden ya da bilgisayardaki yazıcı yazılımından görebilirsiniz.'],
    ['Yüzde 5 doluluk ne demek?', 'Sayfa alanının yüzde beşinin tonerle kaplanması demektir. Kısa bir iş mektubu yaklaşık bu yoğunluktadır. Üreticiler verimi bu varsayımla beyan eder.'],
    ['Toner az uyarısı çıktı, hemen değiştirmeli miyim?', 'Genellikle hayır. Uyarı çoğu cihazda kartuş tamamen bitmeden önce verilir ve baskı kalitesi bozulana kadar devam edilebilir. Uyarıyı yedek kartuş siparişi için işaret olarak kullanın.'],
    ['Yıllık kartuş ihtiyacı neden ondalıklı çıkıyor?', 'Yıllık baskı adedinin kartuş verimine bölümü tam sayı olmayabilir. Araç hem tam değeri hem de satın almanız gereken yukarı yuvarlanmış adedi gösterir.'],
    ['Toner tasarruf modu ömrü uzatır mı?', 'Evet, baskı daha açık yapıldığı için sayfa başına daha az toner harcanır. Etkisini hesaba katmak için doluluk oranını düşürerek deneme yapabilirsiniz; ancak gerçek kazanç cihaza göre değişir.'],
    ['Girdiğim bilgiler saklanıyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez.'],
  ],
  related: ['sayfa-basi-maliyet-hesapla', 'kagit-agirligi-hesapla', 'kagit-boyutlari', 'birim-maliyet-hesapla', 'abonelik-maliyeti-hesapla'],
};
