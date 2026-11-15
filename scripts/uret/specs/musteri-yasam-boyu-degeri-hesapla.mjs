export default {
  slug: 'musteri-yasam-boyu-degeri-hesapla',
  title: 'Müşteri Yaşam Boyu Değeri Hesaplama',
  h1Tail: 'CLV / LTV',
  pageTitle: 'Müşteri Yaşam Boyu Değeri (CLV, LTV) Hesaplama – Formül ve Örnek',
  description: 'Ortalama sipariş tutarı, satın alma sıklığı, müşteri ömrü ve kâr marjından müşteri yaşam boyu değerini (CLV/LTV) ve LTV:CAC oranını hesaplayın.',
  card: 'Sipariş tutarı, satın alma sıklığı ve müşteri ömründen bir müşterinin yaşam boyu değerini ve LTV:CAC oranını bulun.',
  category: 'finans',
  keywords: ['müşteri yaşam boyu değeri', 'CLV hesaplama', 'LTV hesaplama', 'müşteri ömür boyu değeri', 'LTV CAC oranı', 'yaşam boyu değer formülü', 'müşteri değeri hesaplama'],
  lead: 'Ortalama bir müşterinin sizinle çalıştığı süre boyunca işletmenize kazandırdığı toplam brüt kârı, yani <strong>müşteri yaşam boyu değerini</strong> hesaplayın. Müşteri edinme maliyetinizi de yazarsanız LTV:CAC oranını ve geri ödeme süresini görürsünüz.',
  button: 'Hesapla',
  inputs: [
    { id: 'sepet', label: 'Ortalama sipariş tutarı (TL)', type: 'number', placeholder: 'Örn. 500' },
    { id: 'siklik', label: 'Yıllık satın alma sayısı', type: 'number', placeholder: 'Örn. 4', hint: 'Bir müşterinin yılda ortalama kaç sipariş verdiği. Aylık abonelik için 12.' },
    { id: 'omur', label: 'Ortalama müşteri ömrü (yıl)', type: 'number', placeholder: 'Örn. 3' },
    { id: 'marj', label: 'Brüt kâr marjı (%)', type: 'number', value: '100', hint: '100 bırakırsanız sonuç ciro üzerinden hesaplanır.' },
    { id: 'cac', label: 'Müşteri edinme maliyeti (TL)', type: 'number', placeholder: 'Örn. 600', hint: 'İsteğe bağlı; LTV:CAC oranı için.' },
  ],
  compute(v, h) {
    const sepet = h.pos(v.sepet, 'Ortalama sipariş tutarı');
    const siklik = h.pos(v.siklik, 'Yıllık satın alma sayısı');
    const omur = h.pos(v.omur, 'Ortalama müşteri ömrü');
    const marj = h.opt(v.marj, 100, 'Brüt kâr marjı');
    if (!(marj > 0) || marj > 100) h.err('"Brüt kâr marjı" 0\'dan büyük ve en fazla 100 olmalı.');
    const yillikCiro = sepet * siklik;
    const omurCiro = yillikCiro * omur;
    const clv = omurCiro * (marj / 100);
    const yillikKar = yillikCiro * (marj / 100);
    const rows = [
      ['Müşteri yaşam boyu değeri', h.para(clv)],
      ['Yaşam boyu ciro', h.para(omurCiro)],
      ['Müşteri başına yıllık ciro', h.para(yillikCiro)],
      ['Müşteri başına yıllık brüt kâr', h.para(yillikKar)],
      ['Yaşam boyu sipariş sayısı', h.fmt(siklik * omur, 2)],
    ];
    let note = 'CLV = ortalama sipariş tutarı × yıllık satın alma sayısı × müşteri ömrü × brüt kâr marjı. Gelecekteki gelirler bugüne indirgenmemiştir.';
    if (String(v.cac ?? '').trim() !== '') {
      const cac = h.pos(v.cac, 'Müşteri edinme maliyeti');
      const oran = clv / cac;
      rows.push(['LTV:CAC oranı', h.fmt(oran, 2) + ' : 1']);
      rows.push(['Edinme maliyeti sonrası net değer', h.para(clv - cac)]);
      rows.push(['Edinme maliyetinin geri dönüş süresi', h.fmt(cac / (yillikKar / 12), 1) + ' ay']);
      if (oran < 1) note = 'LTV:CAC oranı 1\'in altında: bir müşteriyi kazanmak, o müşterinin getirdiği brüt kârdan pahalıya geliyor.';
    }
    return { rows, note };
  },
  cases: [
    { in: { sepet: '500', siklik: '4', omur: '3', marj: '30', cac: '600' }, out: { 'Müşteri yaşam boyu değeri': '1.800,00 TL', 'Yaşam boyu ciro': '6.000,00 TL', 'Müşteri başına yıllık ciro': '2.000,00 TL', 'Müşteri başına yıllık brüt kâr': '600,00 TL', 'Yaşam boyu sipariş sayısı': '12', 'LTV:CAC oranı': '3 : 1', 'Edinme maliyeti sonrası net değer': '1.200,00 TL', 'Edinme maliyetinin geri dönüş süresi': '12 ay' } },
    { in: { sepet: '200', siklik: '12', omur: '2', marj: '80' }, out: { 'Müşteri yaşam boyu değeri': '3.840,00 TL', 'Yaşam boyu ciro': '4.800,00 TL', 'Müşteri başına yıllık brüt kâr': '1.920,00 TL', 'Yaşam boyu sipariş sayısı': '24' } },
    { in: { sepet: '1500', siklik: '1,5', omur: '4' }, out: { 'Müşteri yaşam boyu değeri': '9.000,00 TL', 'Yaşam boyu ciro': '9.000,00 TL', 'Yaşam boyu sipariş sayısı': '6' } },
    { in: { sepet: '120', siklik: '6', omur: '2,5', marj: '40', cac: '300' }, out: { 'Müşteri yaşam boyu değeri': '720,00 TL', 'LTV:CAC oranı': '2,4 : 1', 'Edinme maliyeti sonrası net değer': '420,00 TL', 'Edinme maliyetinin geri dönüş süresi': '12,5 ay' } },
    { in: { sepet: '250', siklik: '2', omur: '1', marj: '20', cac: '150' }, out: { 'Müşteri yaşam boyu değeri': '100,00 TL', 'LTV:CAC oranı': '0,67 : 1', 'Edinme maliyeti sonrası net değer': '-50,00 TL' } },
    { in: { sepet: '89,90', siklik: '12', omur: '1,5', marj: '100', cac: '' }, out: { 'Müşteri yaşam boyu değeri': '1.618,20 TL' } },
    { in: { sepet: '500', siklik: '4', omur: '0', marj: '30' }, error: true },
    { in: { sepet: '500', siklik: '4', omur: '3', marj: '130' }, error: true },
    { in: { sepet: 'beş yüz', siklik: '4', omur: '3' }, error: true },
  ],
  howto: [
    'Ortalama sipariş tutarını yazın: belirli bir dönemin toplam cirosunu aynı dönemdeki sipariş sayısına bölerek bulabilirsiniz.',
    'Bir müşterinin yılda ortalama kaç kez alışveriş yaptığını girin. Aylık abonelikte 12, yılda bir yenilenen hizmette 1 yazın.',
    'Müşterinin sizden alışveriş yapmayı sürdürdüğü ortalama süreyi yıl olarak yazın. Bilmiyorsanız 1\'i yıllık müşteri kayıp oranınıza bölün (%25 kayıp için 1 ÷ 0,25 = 4 yıl).',
    'Sonucun ciro yerine kâr üzerinden çıkması için brüt kâr marjınızı girin; isterseniz müşteri edinme maliyetinizi de ekleyin.',
    '"Hesapla" düğmesine basın ve LTV:CAC oranını pazarlama bütçenizi değerlendirmek için kullanın.',
  ],
  sections: [
    { h: 'Müşteri yaşam boyu değeri nedir?', p: [
      'Müşteri yaşam boyu değeri (İngilizce kısaltmalarıyla CLV ya da LTV), bir müşterinin ilk alışverişinden sizi bırakana kadar geçen sürede işletmenize sağlaması beklenen toplam değerdir. Tek bir satışa değil ilişkinin bütününe bakar. İlk siparişte 500 TL harcayan bir müşteri, üç yıl boyunca yılda dört kez alışveriş yapıyorsa aslında 6.000 TL\'lik bir ciroyu temsil eder.',
      'Bu bakış, pazarlama kararlarını kökten değiştirir. İlk satıştan zarar etmek bile, müşteri sonraki alışverişleriyle bu maliyeti fazlasıyla çıkarıyorsa mantıklı olabilir. Tersine, bir kez alıp bir daha uğramayan müşterilere yüksek edinme maliyeti ödemek, satış rakamları iyi görünse de işletmeyi yavaş yavaş eritir.',
    ] },
    { h: 'Hesaplama formülü', p: [
      'Araç en yaygın ve anlaşılır modeli kullanır:',
      '<strong>CLV = ortalama sipariş tutarı × yıllık satın alma sayısı × müşteri ömrü (yıl) × brüt kâr marjı</strong>',
      'İlk üç çarpan müşterinin yaşam boyu cirosunu verir. Brüt kâr marjı ile çarpmak, bu cironun ne kadarının ürün maliyeti düşüldükten sonra elinizde kaldığını gösterir. Marjı %100 bırakırsanız sonuç ciro bazlı yaşam boyu değerdir; ancak pazarlama bütçesi kârdan karşılandığı için karar verirken kâr bazlı değeri esas almak daha sağlıklıdır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bir internet mağazasında ortalama sipariş tutarı 500 TL, müşteriler yılda ortalama 4 sipariş veriyor ve ortalama 3 yıl alışverişe devam ediyor. Brüt kâr marjı %30 olsun. Müşteri başına yıllık ciro 500 × 4 = 2.000 TL, yaşam boyu ciro 2.000 × 3 = 6.000 TL ve müşteri yaşam boyu değeri 6.000 × 0,30 = <strong>1.800 TL</strong> olur.',
      'Mağaza bir müşteri kazanmak için ortalama 600 TL harcıyorsa LTV:CAC oranı 1.800 ÷ 600 = <strong>3 : 1</strong>\'dir; edinme maliyeti düşüldükten sonra müşteri başına 1.200 TL kalır. Müşteri yılda 600 TL, ayda 50 TL brüt kâr bıraktığı için 600 TL\'lik edinme maliyeti 12 ayda geri döner.',
    ] },
    { h: 'Müşteri ömrü nasıl tahmin edilir?', p: [
      'Yeni kurulan bir işletmede müşterilerin kaç yıl kalacağını gözlemlemek mümkün değildir. Bu durumda kayıp oranından (churn) yararlanılır: <strong>ortalama müşteri ömrü = 1 ÷ dönemlik kayıp oranı</strong>. Yıl başındaki müşterilerin %25\'i yıl içinde alışverişi bırakıyorsa ortalama ömür 1 ÷ 0,25 = 4 yıldır. Aylık kayıp oranı %5 olan bir abonelik hizmetinde ortalama ömür 1 ÷ 0,05 = 20 ay, yani yaklaşık 1,67 yıl eder.',
      'Bu ilişki kayıp oranındaki küçük iyileşmelerin neden bu kadar değerli olduğunu da gösterir: aylık kaybı %5\'ten %4\'e indirmek ortalama ömrü 20 aydan 25 aya çıkarır ve yaşam boyu değeri dörtte bir oranında artırır.',
    ] },
    { h: 'LTV:CAC oranı nasıl yorumlanır?', p: [
      'Oran, bir müşteriyi kazanmak için harcanan her 1 TL\'nin karşılığında kaç TL brüt kâr elde edildiğini gösterir. 1\'in altındaki oran, her yeni müşteride para kaybedildiği anlamına gelir. 1 ile 3 arası, edinme maliyetinin çıkarıldığını ama genel giderler ve kâr için dar bir pay kaldığını gösterir. Girişimcilik ve yazılım çevrelerinde 3 : 1 düzeyi sıklıkla sağlıklı kabul edilen bir eşik olarak anılır; ancak bu bir kural değil, kabaca bir pusuladır. Çok yüksek oranlar ise büyüme fırsatının kaçırıldığına, pazarlamaya daha fazla yatırım yapılabileceğine işaret edebilir.',
      'Oranla birlikte geri dönüş süresine de bakın. Kâğıt üzerinde yüksek bir yaşam boyu değer, edinme maliyeti iki yılda geri dönüyorsa nakit sıkıntısı yaratabilir; çünkü harcama bugün yapılır, kazanç yıllara yayılır.',
    ] },
    { h: 'Yaşam boyu değeri artırmanın yolları', ul: [
      '<strong>Sepet tutarını büyütmek:</strong> tamamlayıcı ürün önerileri, paket teklifler, ücretsiz kargo eşiği.',
      '<strong>Satın alma sıklığını artırmak:</strong> hatırlatma mesajları, yeniden sipariş kolaylığı, abonelik seçeneği, sadakat programı.',
      '<strong>Müşteri ömrünü uzatmak:</strong> satış sonrası destek, sorunların hızlı çözümü, düzenli iletişim, ayrılma sinyali veren müşterilere özel teklif.',
      '<strong>Marjı iyileştirmek:</strong> tedarik maliyetlerini düşürmek, iade oranını azaltmak, düşük marjlı ürünlerin sepetteki payını dengelemek.',
    ] },
    { h: 'Sınırlar ve dikkat edilecekler', p: [
      'Bu basit model ortalamalarla çalışır ve her yılın birbirinin aynı olduğunu varsayar. Gerçekte müşterilerin bir bölümü ilk aylarda ayrılır, kalanların harcaması zamanla değişir. Ortalama tek bir sayı olsa da müşteri grupları arasında büyük fark olabilir; mümkünse kazanım kanalına ya da ürün grubuna göre ayrı ayrı hesaplayın. Model, gelecekte elde edilecek paranın bugünkü değerinin daha düşük olduğunu da (iskonto) hesaba katmaz; müşteri ömrü uzadıkça ve enflasyon yükseldikçe bu etki büyür.',
      'İadeler, iptaller, ödeme komisyonları ve müşteri hizmetleri giderleri marja yansıtılmadıysa sonuç olduğundan iyimser çıkar. Hesaplama bilgilendirme amaçlıdır; yatırım ve bütçe kararlarında tek başına dayanak yapılmamalıdır.',
    ] },
  ],
  faq: [
    ['CLV ile LTV arasında fark var mı?', 'Uygulamada ikisi aynı kavram için kullanılır. CLV "customer lifetime value", LTV ise "lifetime value" ifadesinin kısaltmasıdır; Türkçede müşteri yaşam boyu değeri ya da müşteri ömür boyu değeri olarak karşılanır.'],
    ['Müşteri yaşam boyu değeri nasıl hesaplanır?', 'Ortalama sipariş tutarı, yıllık satın alma sayısı ve yıl olarak müşteri ömrü çarpılır; sonuç brüt kâr marjıyla çarpılarak kâr bazlı değere çevrilir. 500 TL × 4 × 3 yıl × %30 = 1.800 TL.'],
    ['Neden brüt kâr marjı kullanılıyor?', 'Ciro, işletmenin elinde kalan para değildir. Bir müşteriyi kazanmak için ne kadar harcayabileceğinizi görmek istiyorsanız, o müşterinin satışlarından ürün maliyeti düşüldükten sonra kalan tutarı bilmeniz gerekir.'],
    ['Abonelik işinde hangi değerleri girmeliyim?', 'Sipariş tutarına aylık abonelik ücretini, yıllık satın alma sayısına 12 yazın. Müşteri ömrü için 1\'i aylık kayıp oranına bölüp çıkan ay sayısını 12\'ye bölerek yıla çevirin.'],
    ['İyi bir LTV:CAC oranı kaçtır?', 'Kesin bir sınır yoktur; sektöre, marja ve büyüme hedefine göre değişir. 1\'in altı zarar demektir. 3 : 1 civarı sıkça sağlıklı bir düzey olarak anılır, ancak geri dönüş süresi ve nakit durumuyla birlikte değerlendirilmelidir.'],
    ['Geri dönüş süresi nasıl hesaplanıyor?', 'Müşteri edinme maliyeti, müşterinin aylık brüt kârına bölünür. Aylık brüt kâr, yıllık brüt kârın on ikide biridir. 600 TL edinme maliyeti ve ayda 50 TL brüt kâr ile süre 12 aydır.'],
    ['Yeni kurulan bir işletme bu hesabı yapabilir mi?', 'Evet, ancak sonuç tahmine dayanır. İlk aylardaki tekrar satın alma ve kayıp verilerinden hareketle bir müşteri ömrü varsayın, hesabı temkinli değerlerle yapın ve veri biriktikçe güncelleyin.'],
    ['Girdiğim rakamlar bir yerde saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızda gerçekleşir; satış ve maliyet bilgileriniz sunucuya gönderilmez.'],
  ],
  related: ['musteri-edinme-maliyeti-hesapla', 'reklam-getirisi-hesapla', 'donusum-orani-hesapla', 'yatirim-getirisi-hesapla', 'geri-odeme-suresi-hesapla'],
};
