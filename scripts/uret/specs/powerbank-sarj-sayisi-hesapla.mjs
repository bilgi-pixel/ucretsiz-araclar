export default {
  slug: 'powerbank-sarj-sayisi-hesapla',
  title: 'Powerbank Şarj Sayısı Hesaplama',
  pageTitle: 'Powerbank Şarj Sayısı Hesaplama – Powerbank Kaç Kez Şarj Eder?',
  description: 'Powerbank\'in telefonunuzu kaç kez şarj edeceğini hesaplayın. mAh kapasitesi, cihaz bataryası ve dönüşüm verimine göre gerçekçi şarj sayısını ve Wh değerini verir.',
  card: 'Powerbank\'iniz telefonu kaç kez doldurur? Kapasite, batarya ve dönüşüm kaybına göre gerçekçi sonucu görün.',
  category: 'elektrik',
  keywords: ['powerbank şarj sayısı', 'powerbank kaç kez şarj eder', '10000 mah kaç şarj', '20000 mah powerbank kaç kere şarj eder', 'powerbank hesaplama', 'taşınabilir şarj kapasitesi', 'powerbank gerçek kapasite'],
  lead: 'Taşınabilir şarj cihazınızın telefonunuzu, tabletinizi ya da kulaklığınızı kaç kez doldurabileceğini hesaplayın. Kutudaki mAh değeri ile gerçekte alınan şarj sayısı aynı değildir; araç <strong>dönüşüm kayıplarını</strong> hesaba katarak gerçekçi bir sonuç verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'kapasite', label: 'Powerbank kapasitesi (mAh)', type: 'number', placeholder: 'Örn. 10000' },
    { id: 'cihaz', label: 'Cihazın batarya kapasitesi (mAh)', type: 'number', placeholder: 'Örn. 4000' },
    { id: 'verim', label: 'Toplam verim (%)', type: 'number', value: '65', hint: 'Gerilim dönüşümü, kablo ve ısı kayıpları sonrası kalan oran. Çoğu durumda yüzde 60–70 arasıdır.' },
    { id: 'aralik', label: 'Her şarjda doldurulan oran (%)', type: 'number', value: '100', hint: 'Telefonu örneğin yüzde 20\'den 100\'e dolduruyorsanız 80 yazın.' },
  ],
  compute(v, h) {
    const pb = h.pos(v.kapasite, 'Powerbank kapasitesi');
    const cihaz = h.pos(v.cihaz, 'Cihazın batarya kapasitesi');
    const verim = h.pos(v.verim, 'Toplam verim');
    const aralik = h.pos(v.aralik, 'Her şarjda doldurulan oran');
    if (verim > 100) h.err('"Toplam verim" yüzde 100\'den büyük olamaz; 60–70 arası bir değer deneyin.');
    if (aralik > 100) h.err('"Her şarjda doldurulan oran" yüzde 100\'den büyük olamaz.');
    const net = pb * verim / 100;
    const sarjBasina = cihaz * aralik / 100;
    const sayi = net / sarjBasina;
    return {
      rows: [
        ['Şarj sayısı', 'yaklaşık ' + h.fmt(sayi, 1) + ' kez'],
        ['Tam şarj sayısı', Math.floor(sayi + 1e-9) + ' kez'],
        ['Cihaza aktarılabilen kapasite', h.fmt(net, 0) + ' mAh'],
        ['Kayıp', h.fmt(pb - net, 0) + ' mAh'],
        ['Powerbank enerjisi (3,7 V nominal)', h.fmt(pb * 3.7 / 1000, 2) + ' Wh'],
      ],
      note: 'Powerbank kapasitesi hücre gerilimi (yaklaşık 3,7 V) üzerinden verilir. Gerçek şarj sayısı kablo kalitesine, şarj hızına, sıcaklığa ve powerbank\'in yaşına göre değişir.',
    };
  },
  cases: [
    { in: { kapasite: '10000', cihaz: '4000', verim: '65', aralik: '100' }, out: { 'Şarj sayısı': 'yaklaşık 1,6 kez', 'Tam şarj sayısı': '1 kez', 'Cihaza aktarılabilen kapasite': '6.500 mAh', 'Powerbank enerjisi (3,7 V nominal)': '37 Wh' } },
    { in: { kapasite: '20000', cihaz: '5000', verim: '65', aralik: '100' }, out: { 'Şarj sayısı': 'yaklaşık 2,6 kez', 'Tam şarj sayısı': '2 kez', 'Kayıp': '7.000 mAh', 'Powerbank enerjisi (3,7 V nominal)': '74 Wh' } },
    { in: { kapasite: '10000', cihaz: '3000', verim: '70', aralik: '100' }, out: { 'Şarj sayısı': 'yaklaşık 2,3 kez', 'Tam şarj sayısı': '2 kez' } },
    { in: { kapasite: '5000', cihaz: '5000', verim: '100', aralik: '100' }, out: { 'Şarj sayısı': 'yaklaşık 1 kez', 'Tam şarj sayısı': '1 kez', 'Kayıp': '0 mAh' } },
    { in: { kapasite: '30000', cihaz: '4500', verim: '60', aralik: '100' }, out: { 'Şarj sayısı': 'yaklaşık 4 kez', 'Tam şarj sayısı': '4 kez', 'Cihaza aktarılabilen kapasite': '18.000 mAh' } },
    { in: { kapasite: '10000', cihaz: '5000', verim: '65', aralik: '80' }, out: { 'Şarj sayısı': 'yaklaşık 1,6 kez', 'Tam şarj sayısı': '1 kez' } },
    { in: { kapasite: '10000', cihaz: '4000', verim: '120', aralik: '100' }, error: true },
    { in: { kapasite: '10000', cihaz: '0', verim: '65', aralik: '100' }, error: true },
    { in: { kapasite: '', cihaz: '4000' }, error: true },
  ],
  howto: [
    'Powerbank\'in üzerinde ya da kutusunda yazan kapasiteyi mAh olarak girin.',
    'Şarj edeceğiniz cihazın batarya kapasitesini yazın. Bu değeri telefonun teknik özelliklerinde ya da ayarlar bölümündeki batarya bilgisinde bulabilirsiniz.',
    'Toplam verimi olduğu gibi bırakın ya da kendi deneyiminize göre değiştirin. Kablosuz şarj kullanıyorsanız daha düşük bir değer yazın.',
    'Telefonu her seferinde tamamen boşalmadan şarj ediyorsanız doldurduğunuz oranı girin; tam şarj için 100 bırakın.',
    '"Hesapla" düğmesine basın; yaklaşık şarj sayısı ve cihaza aktarılabilen kapasite görüntülenir.',
  ],
  sections: [
    { h: 'Kutudaki mAh neden tam olarak kullanılamıyor?', p: [
      'Powerbank\'lerin içinde lityum iyon ya da lityum polimer hücreler bulunur ve bu hücrelerin nominal gerilimi yaklaşık 3,7 volttur. Kutuda yazan kapasite bu hücre gerilimi üzerinden ölçülür. Oysa USB çıkışı 5 volt, hızlı şarjda 9 volt ya da daha yüksek gerilim verir. Hücredeki enerjiyi bu gerilime çıkarmak için bir yükseltici devre çalışır; gerilim yükseldiğinde aynı enerji daha az miliamper-saate karşılık gelir ve devre bir miktar enerjiyi ısıya çevirir.',
      'Kayıp burada bitmez. Kablonun direnci, telefonun kendi şarj devresi ve bataryanın dolarken ısınması da enerjiyi azaltır. Telefon şarj olurken açık olduğu için ekran, mobil veri ve arka plan uygulamaları da powerbank\'ten beslenir. Sonuçta nominal kapasitenin kabaca üçte ikisi cihazın bataryasına ulaşır. Bazı üreticiler bunu "anma kapasitesi" adıyla etikette ayrıca belirtir; etiketinizde bu değer varsa onu yüzde 100 verimle kullanabilirsiniz.',
    ] },
    { h: 'Hesaplama formülü', p: [
      '<strong>Şarj sayısı = (powerbank mAh × verim) ÷ (cihaz mAh × doldurulan oran)</strong>',
      'Verim ve doldurulan oran yüzde olarak girilir, hesapta 100\'e bölünür. Powerbank\'in enerjisi ise watt-saat olarak <strong>Wh = mAh × 3,7 ÷ 1000</strong> bağıntısıyla bulunur. Watt-saat değeri, farklı gerilimlerdeki bataryaları karşılaştırmak için miliamper-saatten daha sağlıklı bir ölçüdür ve havayolu kurallarında da bu birim esas alınır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>10.000 mAh powerbank, 4.000 mAh telefon:</strong> Yüzde 65 verimle cihaza aktarılabilen kapasite 10.000 × 0,65 = 6.500 mAh\'tir. Şarj sayısı 6.500 ÷ 4.000 = 1,6 çıkar; yani bir tam şarj ve ikinci şarjın yarısından biraz fazlası. Powerbank\'in enerjisi 10.000 × 3,7 ÷ 1000 = 37 Wh\'tir.',
      '<strong>20.000 mAh powerbank, 5.000 mAh telefon:</strong> 20.000 × 0,65 = 13.000 mAh aktarılır, kayıp 7.000 mAh\'tir. 13.000 ÷ 5.000 = 2,6 şarj eder. Enerji 74 Wh\'tir.',
      '<strong>Kısmi şarj:</strong> 5.000 mAh bataryalı telefonu her seferinde yüzde 20\'den yüzde 100\'e dolduruyorsanız her şarj 4.000 mAh ister. 10.000 mAh\'lik powerbank yüzde 65 verimle 6.500 ÷ 4.000 = 1,6 kez bu işlemi yapar.',
    ] },
    { h: 'Verimi etkileyen etkenler', ul: [
      '<strong>Kablosuz şarj:</strong> Bobinler arasındaki aktarım ek kayıp getirir; kablolu şarja göre belirgin biçimde daha az şarj alınır.',
      '<strong>Hızlı şarj:</strong> Yüksek güçte hem powerbank hem telefon daha fazla ısınır ve kayıp artar.',
      '<strong>Kablo:</strong> İnce, uzun ya da yıpranmış kablolarda gerilim düşümü fazladır.',
      '<strong>Sıcaklık:</strong> Çok soğuk ve çok sıcak ortamda lityum hücreler daha az enerji verir.',
      '<strong>Yaş:</strong> Yüzlerce çevrim görmüş bir powerbank ilk günkü kapasitesini taşımaz.',
      '<strong>Şarj sırasında kullanım:</strong> Telefonu şarj olurken oyun ya da video için kullanmak powerbank\'i belirgin biçimde daha çabuk tüketir.',
    ] },
    { h: 'Hangi kapasite kimin işine yarar?', p: [
      'Gün içinde bir kez takviye yapmak isteyenler için 5.000 mAh sınıfı cihazlar cebe sığar ve çoğu telefonu bir kez tamamen dolduramasa da günü kurtarır. 10.000 mAh sınıfı, bir telefonu bir buçuk-iki kez doldurduğu için en yaygın tercihtir. Hafta sonu kampı, uzun otobüs yolculuğu ya da birden çok cihaz için 20.000 mAh ve üzeri daha uygundur; ancak ağırlık ve dolum süresi de artar.',
      'Uçak yolculuğunda taşınabilir şarj cihazları genel olarak yalnızca kabin bagajında taşınabilir ve kapasite sınırı watt-saat üzerinden uygulanır. Sınırlar havayoluna ve ülkeye göre değişebildiğinden yola çıkmadan önce havayolunuzun güncel kurallarını kontrol edin; araçtaki Wh satırı bu karşılaştırmayı kolaylaştırır.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç yaklaşık bir tahmin üretir; tek bir verim değeri gerçek kullanımın tüm değişkenlerini temsil edemez. Etikette yazan kapasitenin doğru olduğu varsayılır; gerçek kapasitesi etiketinden düşük ürünlerde sonuç da buna göre sapar. Kesin değer için powerbank\'i tam doldurup araya bir USB ölçüm cihazı takarak aktarılan enerjiyi ölçmek gerekir.',
    ] },
  ],
  faq: [
    ['10000 mAh powerbank kaç kez şarj eder?', 'Yüzde 65 verimle 6.500 mAh aktarır. 4.000 mAh bataryalı bir telefonu yaklaşık 1,6 kez, 5.000 mAh bataryalı bir telefonu yaklaşık 1,3 kez doldurur.'],
    ['20000 mAh powerbank kaç kez şarj eder?', 'Yüzde 65 verimle 13.000 mAh aktarır. 5.000 mAh bataryalı bir telefonu yaklaşık 2,6 kez, 4.000 mAh bataryalı bir telefonu yaklaşık 3,3 kez şarj eder.'],
    ['Neden kapasiteyi doğrudan telefon bataryasına bölemiyorum?', 'Çünkü powerbank kapasitesi 3,7 voltluk hücre gerilimi üzerinden verilir, aktarım ise daha yüksek gerilimde ve kayıplı yapılır. Doğrudan bölme, gerçekte alacağınızdan yaklaşık üçte bir daha fazla şarj gösterir.'],
    ['Verim değerini nasıl belirlemeliyim?', 'Kablolu ve normal hızda şarjda yüzde 60–70 arası çoğu ürün için gerçekçidir. Kablosuz şarjda daha düşük bir değer, etikette anma kapasitesi verilmişse o kapasiteyle birlikte yüzde 100 kullanabilirsiniz.'],
    ['Powerbank\'in Wh değeri ne işe yarar?', 'Depolanan enerjiyi gerilimden bağımsız gösterir. Dizüstü bilgisayar gibi farklı gerilimli cihazlarla karşılaştırma yaparken ve havayolu taşıma sınırlarını kontrol ederken bu değer kullanılır.'],
    ['Tablet ya da kulaklık için de kullanabilir miyim?', 'Evet. Cihaz kapasitesi alanına tabletin ya da şarj kutusunun mAh değerini yazmanız yeterlidir; hesap mantığı aynıdır.'],
    ['Powerbank zamanla neden daha az şarj ediyor?', 'Lityum hücreler her şarj-deşarj çevriminde ve zamanla kapasite kaybeder. Sıcak ortamda saklamak ve sürekli tam dolu ya da tam boş bırakmak bu kaybı hızlandırır.'],
    ['Yazdığım değerler bir yere gönderiliyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda yapılır, girdiğiniz değerler saklanmaz ve paylaşılmaz.'],
  ],
  related: ['mah-wh-cevir', 'sarj-suresi-hesapla', 'aku-kullanim-suresi-hesapla', 'pil-seri-paralel-hesapla', 'elektrik-tuketim-hesapla'],
};
