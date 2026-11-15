export default {
  slug: 'musteri-edinme-maliyeti-hesapla',
  title: 'Müşteri Edinme Maliyeti Hesaplama',
  h1Tail: 'CAC',
  pageTitle: 'Müşteri Edinme Maliyeti (CAC) Hesaplama – Formül ve Örnek',
  description: 'Reklam ve satış-pazarlama giderlerini kazanılan yeni müşteri sayısına bölerek müşteri edinme maliyetini (CAC), LTV:CAC oranını ve geri dönüş süresini bulun.',
  card: 'Pazarlama ve satış giderlerinden yeni müşteri başına maliyeti (CAC), LTV:CAC oranını ve geri dönüş süresini hesaplayın.',
  category: 'finans',
  keywords: ['müşteri edinme maliyeti', 'CAC hesaplama', 'müşteri kazanım maliyeti', 'müşteri başı maliyet', 'CAC formülü', 'LTV CAC oranı', 'pazarlama maliyeti hesaplama', 'CAC geri ödeme süresi'],
  lead: 'Belirli bir dönemde yaptığınız reklam harcamasını ve diğer satış-pazarlama giderlerini, aynı dönemde kazandığınız yeni müşteri sayısına bölerek <strong>bir müşteriyi kazanmanın size kaça mal olduğunu</strong> hesaplayın.',
  button: 'Hesapla',
  inputs: [
    { id: 'reklam', label: 'Reklam harcaması (TL)', type: 'number', placeholder: 'Örn. 60000' },
    { id: 'diger', label: 'Diğer satış ve pazarlama giderleri (TL)', type: 'number', placeholder: 'Örn. 40000', hint: 'Maaşlar, ajans, yazılım, içerik üretimi, prim vb. Boş = 0.' },
    { id: 'musteri', label: 'Kazanılan yeni müşteri sayısı', type: 'number', placeholder: 'Örn. 200' },
    { id: 'ltv', label: 'Müşteri yaşam boyu değeri (TL)', type: 'number', placeholder: 'Örn. 1800', hint: 'İsteğe bağlı; LTV:CAC oranı için.' },
    { id: 'aylikKar', label: 'Müşteri başına aylık brüt kâr (TL)', type: 'number', placeholder: 'Örn. 50', hint: 'İsteğe bağlı; geri dönüş süresi için.' },
  ],
  compute(v, h) {
    const reklam = h.nonneg(v.reklam, 'Reklam harcaması');
    const diger = h.opt(v.diger, 0, 'Diğer satış ve pazarlama giderleri');
    if (diger < 0) h.err('"Diğer satış ve pazarlama giderleri" negatif olamaz.');
    const musteri = h.posint(v.musteri, 'Kazanılan yeni müşteri sayısı');
    const toplam = reklam + diger;
    if (!(toplam > 0)) h.err('Toplam harcama sıfır olamaz; reklam ya da diğer gider alanına bir tutar yazın.');
    const cac = toplam / musteri;
    const rows = [
      ['Müşteri edinme maliyeti (CAC)', h.para(cac)],
      ['Toplam satış ve pazarlama harcaması', h.para(toplam)],
      ['Yalnızca reklamla müşteri başı maliyet', h.para(reklam / musteri)],
      ['Reklamın toplam harcamadaki payı', '%' + h.fmt((reklam / toplam) * 100, 2)],
      ['1.000 TL harcamayla kazanılan müşteri', h.fmt(1000 / cac, 2)],
    ];
    let note = 'CAC = (reklam harcaması + diğer satış ve pazarlama giderleri) ÷ kazanılan yeni müşteri sayısı. Harcama ve müşteri sayısı aynı döneme ait olmalıdır.';
    if (String(v.ltv ?? '').trim() !== '') {
      const ltv = h.pos(v.ltv, 'Müşteri yaşam boyu değeri');
      const oran = ltv / cac;
      rows.push(['LTV:CAC oranı', h.fmt(oran, 2) + ' : 1']);
      rows.push(['Müşteri başına net değer', h.para(ltv - cac)]);
      if (oran < 1) note = 'LTV:CAC oranı 1\'in altında: müşteri kazanmak için harcanan tutar, müşterinin yaşam boyu değerini aşıyor.';
    }
    if (String(v.aylikKar ?? '').trim() !== '') {
      const ak = h.pos(v.aylikKar, 'Müşteri başına aylık brüt kâr');
      rows.push(['CAC geri dönüş süresi', h.fmt(cac / ak, 1) + ' ay']);
    }
    return { rows, note };
  },
  cases: [
    { in: { reklam: '60000', diger: '40000', musteri: '200' }, out: { 'Müşteri edinme maliyeti (CAC)': '500,00 TL', 'Toplam satış ve pazarlama harcaması': '100.000,00 TL', 'Yalnızca reklamla müşteri başı maliyet': '300,00 TL', 'Reklamın toplam harcamadaki payı': '%60', '1.000 TL harcamayla kazanılan müşteri': '2' } },
    { in: { reklam: '60000', diger: '40000', musteri: '200', ltv: '1800', aylikKar: '50' }, out: { 'Müşteri edinme maliyeti (CAC)': '500,00 TL', 'LTV:CAC oranı': '3,6 : 1', 'Müşteri başına net değer': '1.300,00 TL', 'CAC geri dönüş süresi': '10 ay' } },
    { in: { reklam: '15000', musteri: '120' }, out: { 'Müşteri edinme maliyeti (CAC)': '125,00 TL', 'Reklamın toplam harcamadaki payı': '%100', '1.000 TL harcamayla kazanılan müşteri': '8' } },
    { in: { reklam: '0', diger: '45000', musteri: '30', ltv: '1200' }, out: { 'Müşteri edinme maliyeti (CAC)': '1.500,00 TL', 'Yalnızca reklamla müşteri başı maliyet': '0,00 TL', 'LTV:CAC oranı': '0,8 : 1', 'Müşteri başına net değer': '-300,00 TL' } },
    { in: { reklam: '8500', diger: '1500', musteri: '64', aylikKar: '25' }, out: { 'Müşteri edinme maliyeti (CAC)': '156,25 TL', 'CAC geri dönüş süresi': '6,3 ay' } },
    { in: { reklam: '250000', diger: '350000', musteri: '75', ltv: '40000' }, out: { 'Müşteri edinme maliyeti (CAC)': '8.000,00 TL', 'LTV:CAC oranı': '5 : 1', '1.000 TL harcamayla kazanılan müşteri': '0,13' } },
    { in: { reklam: '60000', diger: '40000', musteri: '0' }, error: true },
    { in: { reklam: '60000', diger: '40000', musteri: '12,5' }, error: true },
    { in: { reklam: '0', diger: '', musteri: '10' }, error: true },
  ],
  howto: [
    'Bir dönem belirleyin (ay, çeyrek ya da yıl) ve o dönemde bütün kanallarda yaptığınız reklam harcamasını yazın.',
    'Aynı dönemin diğer satış ve pazarlama giderlerini toplayıp ikinci alana girin: pazarlama ve satış ekibinin ücretleri, ajans ve serbest çalışan ödemeleri, yazılım abonelikleri, içerik ve tasarım giderleri, satış primleri.',
    'O dönemde ilk kez alışveriş yapan ya da sözleşme imzalayan yeni müşteri sayısını yazın. Mevcut müşterilerin tekrar siparişlerini saymayın.',
    'Biliyorsanız müşteri yaşam boyu değerini ve müşteri başına aylık brüt kârı ekleyin; "Hesapla" düğmesine basın.',
  ],
  sections: [
    { h: 'Müşteri edinme maliyeti (CAC) nedir?', p: [
      'Müşteri edinme maliyeti, İngilizce "customer acquisition cost" ifadesinin kısaltmasıyla CAC, yeni bir müşteri kazanmak için ortalama ne kadar harcadığınızı gösterir. Bir işletmenin büyümesinin sürdürülebilir olup olmadığını anlamanın en doğrudan yollarından biridir: müşteri kazanmak, o müşteriden elde edilen kârdan pahalıya geliyorsa satışlar arttıkça zarar da büyür.',
      'CAC yalnızca internet girişimlerine özgü bir ölçü değildir. Broşür dağıtan bir diş kliniği, fuara katılan bir makine imalatçısı ya da saha satış ekibi çalıştıran bir toptancı da müşteri başına ne harcadığını aynı mantıkla hesaplayabilir.',
    ] },
    { h: 'CAC formülü', p: [
      '<strong>CAC = toplam satış ve pazarlama harcaması ÷ kazanılan yeni müşteri sayısı</strong>',
      'Paydaki tutar yalnızca reklam faturalarından ibaret değildir. Eksiksiz bir hesap için şu kalemler toplanır: reklam yayın bedelleri, pazarlama ve satış çalışanlarının brüt ücretleri, ajans ve danışman ödemeleri, kullanılan pazarlama ve satış yazılımları, içerik, video ve tasarım üretimi, fuar ve etkinlik giderleri, numune ve tanıtım ürünleri, satış primleri ile yeni müşteriye özel indirim ve hediye çekleri.',
      'Yalnızca reklam harcamasını müşteri sayısına bölerek bulunan değere bazen "reklam bazlı CAC" denir. Kampanya verimliliğini izlemek için kullanışlıdır, ancak gerçek maliyeti olduğundan düşük gösterir. Araç iki değeri de ayrı satırlarda verir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bir yazılım şirketi bir çeyrekte 60.000 TL reklam harcaması yapmış, pazarlama ve satış ekibinin ücretleri ile araç giderleri de 40.000 TL tutmuş olsun. Aynı çeyrekte 200 yeni müşteri kazanılmış. CAC = (60.000 + 40.000) ÷ 200 = <strong>500 TL</strong> olur. Yalnızca reklam harcamasına bakılsaydı müşteri başı maliyet 300 TL görünecekti; aradaki 200 TL, hesaba katılmadığında gözden kaçan gerçek maliyettir.',
      'Şirketin müşteri yaşam boyu değeri 1.800 TL ise LTV:CAC oranı 1.800 ÷ 500 = <strong>3,6 : 1</strong>\'dir ve her müşteri, edinme maliyeti düşüldükten sonra 1.300 TL bırakır. Müşteri ayda 50 TL brüt kâr sağlıyorsa 500 TL\'lik edinme maliyeti 500 ÷ 50 = <strong>10 ayda</strong> geri döner.',
    ] },
    { h: 'CAC nasıl yorumlanır?', p: [
      'CAC tek başına "iyi" ya da "kötü" değildir; müşterinin getirdiği değerle birlikte anlam kazanır. Sepet tutarı 150 TL olan bir aksesuar mağazası için 500 TL\'lik CAC yıkıcıyken, yıllık sözleşme bedeli yüz binlerce lira olan kurumsal bir hizmette 8.000 TL\'lik CAC çok makul olabilir. Bu yüzden iki tamamlayıcı ölçü kullanılır:',
    ], ul: [
      '<strong>LTV:CAC oranı:</strong> Müşteri yaşam boyu değerinin edinme maliyetine bölümüdür. 1\'in altı, her müşteride zarar edildiğini gösterir. Oran yükseldikçe pazarlama harcaması daha verimli demektir.',
      '<strong>Geri dönüş süresi:</strong> Edinme maliyetinin müşterinin aylık brüt kârıyla kaç ayda çıkarıldığını gösterir. Süre uzadıkça büyümeyi finanse etmek için daha fazla nakit gerekir.',
    ] },
    { h: 'Hesaplarken sık yapılan hatalar', ul: [
      '<strong>Dönem uyumsuzluğu:</strong> Satış döngüsü uzunsa bu ayın harcaması müşteriyi iki üç ay sonra getirir. Harcamayı, etkilediği dönemin müşteri sayısıyla eşleştirin ya da daha uzun bir dönem (çeyrek, yıl) üzerinden hesaplayın.',
      '<strong>Mevcut müşterileri saymak:</strong> Tekrar sipariş veren eski müşteriler paydaya eklenirse CAC yapay olarak düşer.',
      '<strong>Organik müşterileri ayırmamak:</strong> Tavsiyeyle ya da kendiliğinden gelen müşteriler de toplam sayıya girer; bu karma değer genel tabloyu gösterir, ama ücretli kanalların gerçek maliyetini anlamak için kanal bazında ayrıca hesap yapmak gerekir.',
      '<strong>Ücretleri ve araç giderlerini atlamak:</strong> Sadece reklam bedeline bakmak, özellikle saha satışı ya da içerik pazarlaması ağırlıklı işletmelerde maliyetin büyük kısmını görünmez kılar.',
      '<strong>Deneme kullanıcılarını müşteri saymak:</strong> Ücretsiz üyelik açan ya da form dolduran kişi henüz müşteri değildir; o aşamanın maliyeti "potansiyel müşteri başı maliyet" olarak ayrıca izlenir.',
    ] },
    { h: 'Müşteri edinme maliyetini düşürmenin yolları', p: [
      'CAC iki yoldan düşer: aynı müşteri sayısına daha az harcayarak ya da aynı harcamayla daha fazla müşteri kazanarak. İkincisi çoğu zaman daha kolaydır, çünkü dönüşüm oranındaki iyileşme doğrudan sonuca yansır. Sitenize gelen 10.000 ziyaretçinin %2\'si yerine %2,5\'i müşteri olursa, harcamanız hiç değişmeden CAC beşte bir oranında azalır.',
      'Bunun yanında verimsiz kanal ve kampanyaları kapatıp bütçeyi düşük maliyetli olanlara kaydırmak, mevcut müşterilerin tavsiyesini teşvik eden bir öneri programı kurmak, arama motorlarından ve içerikten gelen organik trafiği büyütmek ve satış sürecindeki gereksiz adımları azaltmak etkili yöntemlerdir. Unutmayın ki en ucuz müşteriler her zaman en değerli müşteriler değildir; düşük CAC ile kazanılan ama hemen ayrılan müşteri, pahalı ama sadık müşteriden daha kötü bir yatırım olabilir.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç tek bir dönem ve karma (tüm kanalların ortalaması) CAC hesabı yapar. Kanal bazlı karşılaştırma için her kanalın harcamasını ve o kanaldan gelen müşteri sayısını ayrı ayrı girip hesabı tekrarlayabilirsiniz. Sonuç bilgilendirme amaçlıdır; bütçe kararlarını nakit akışı, kapasite ve kârlılık hedeflerinizle birlikte değerlendirin.',
    ] },
  ],
  faq: [
    ['CAC nasıl hesaplanır?', 'Bir dönemdeki toplam satış ve pazarlama harcaması, aynı dönemde kazanılan yeni müşteri sayısına bölünür. 100.000 TL harcama ile 200 yeni müşteri kazanıldıysa CAC 500 TL\'dir.'],
    ['CAC hesabına hangi giderler dahil edilir?', 'Reklam bedelleri, pazarlama ve satış ekibinin ücretleri, ajans ödemeleri, pazarlama ve satış yazılımları, içerik üretimi, etkinlik giderleri, satış primleri ve yeni müşteriye özel indirimler dahil edilir. Ürün maliyeti ve genel yönetim giderleri dahil edilmez.'],
    ['CAC ile potansiyel müşteri başı maliyet aynı şey mi?', 'Hayır. Potansiyel müşteri başı maliyet, form dolduran ya da iletişim bilgisi bırakan kişi başına harcamadır. CAC ise fiilen ödeme yapan müşteri başına harcamadır ve her potansiyel müşteri satışa dönmediği için daha yüksektir.'],
    ['CAC ile tıklama başı maliyet arasındaki ilişki nedir?', 'Tıklama başı maliyet, dönüşüm oranına bölündüğünde yalnızca reklama dayalı müşteri başı maliyeti verir. Tıklama 5 TL ve tıklayanların %2\'si müşteri oluyorsa reklam bazlı maliyet 5 ÷ 0,02 = 250 TL\'dir.'],
    ['LTV:CAC oranı kaç olmalı?', 'Kesin bir doğru yoktur. 1\'in altı sürdürülemez. Girişim dünyasında 3 : 1 civarı sıklıkla sağlıklı bir düzey olarak anılır, ancak marj, geri dönüş süresi ve sektör koşulları belirleyicidir.'],
    ['Geri dönüş süresi neden önemlidir?', 'Edinme harcaması peşin yapılır, müşterinin getirdiği kâr ise aylara yayılır. Geri dönüş süresi uzadıkça büyümek için daha çok işletme sermayesi gerekir; kârlı görünen bir model bile nakit darboğazına girebilir.'],
    ['Hangi dönem için hesaplamalıyım?', 'Satış döngünüz kısaysa aylık hesap yeterlidir. Müşterinin karar vermesi haftalar ya da aylar alıyorsa çeyreklik ya da yıllık hesap, harcama ile sonucun aynı döneme düşmesini sağlayarak daha güvenilir sonuç verir.'],
    ['Girdiğim harcama bilgileri kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; tutarlar ve müşteri sayıları sunucuya gönderilmez.'],
  ],
  related: ['musteri-yasam-boyu-degeri-hesapla', 'tiklama-basi-maliyet-hesapla', 'reklam-getirisi-hesapla', 'donusum-orani-hesapla', 'yatirim-getirisi-hesapla'],
};
