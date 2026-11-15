export default {
  slug: 'yuzme-kalori-hesapla',
  title: 'Yüzmede Yakılan Kalori Hesaplama',
  h1Tail: 'stile ve süreye göre',
  pageTitle: 'Yüzmede Yakılan Kalori Hesaplama – Stil ve Süreye Göre',
  description: 'Yüzerken yakılan kaloriyi kilo, süre ve yüzme stiline göre hesaplayın. Serbest, sırtüstü, kurbağalama ve kelebek için MET değerleri; mesafe girerseniz 100 m temposu.',
  card: 'Kilo, süre ve yüzme stiline göre yakılan kaloriyi hesaplayın; mesafe girerseniz 100 metre temponuzu da görün.',
  category: 'saglik',
  keywords: ['yüzme kalori hesaplama', 'yüzmek kaç kalori yakar', '1 saat yüzme kaç kalori', 'serbest stil kalori', 'kurbağalama kalori', 'havuzda yakılan kalori', 'yüzme MET değeri'],
  lead: `Kilonuzu, suda aktif olarak yüzdüğünüz süreyi ve stilinizi seçin; araç o stile ait MET değeriyle <strong>yakılan kaloriyi</strong> hesaplar. Yüzdüğünüz mesafeyi de yazarsanız 100 metre temponuzu ve 100 metre başına harcadığınız enerjiyi görürsünüz.`,
  button: 'Hesapla',
  inputs: [
    { id: 'kilo', label: 'Vücut ağırlığı (kg)', type: 'number', placeholder: 'Örn. 70' },
    { id: 'sure', label: 'Yüzme süresi (dakika)', type: 'number', placeholder: 'Örn. 30', hint: 'Duvar kenarında dinlenilen süreleri çıkarın.' },
    { id: 'stil', label: 'Stil ve tempo', type: 'select', options: [
      ['serbestYavas', 'Serbest stil – yavaş / orta tempo'],
      ['serbestHizli', 'Serbest stil – hızlı, yoğun'],
      ['sirt', 'Sırtüstü – rahat tempo'],
      ['sirtAnt', 'Sırtüstü – antrenman temposu'],
      ['kurbaga', 'Kurbağalama – rahat tempo'],
      ['kurbagaAnt', 'Kurbağalama – antrenman temposu'],
      ['kelebek', 'Kelebek'],
      ['keyif', 'Keyif için yüzme (kulvar dışı)'],
      ['durma', 'Suda durma, hafif hareket'],
    ] },
    { id: 'mesafe', label: 'Mesafe (metre, isteğe bağlı)', type: 'number', placeholder: 'Örn. 1000' },
  ],
  compute(v, h) {
    const kg = h.pos(v.kilo, 'Vücut ağırlığı');
    const dk = h.pos(v.sure, 'Yüzme süresi');
    if (kg < 20 || kg > 250) h.err('Vücut ağırlığı 20 ile 250 kg arasında olmalı.');
    if (dk > 1440) h.err('Süre 1.440 dakikadan (24 saat) uzun olamaz.');
    const tablo = {
      serbestYavas: [5.8, 'Serbest stil, yavaş / orta'],
      serbestHizli: [9.8, 'Serbest stil, hızlı'],
      sirt: [4.8, 'Sırtüstü, rahat'],
      sirtAnt: [9.5, 'Sırtüstü, antrenman'],
      kurbaga: [5.3, 'Kurbağalama, rahat'],
      kurbagaAnt: [10.3, 'Kurbağalama, antrenman'],
      kelebek: [13.8, 'Kelebek'],
      keyif: [6.0, 'Keyif için yüzme'],
      durma: [3.5, 'Suda durma'],
    };
    const sec = tablo[v.stil || 'serbestYavas'];
    if (!sec) h.err('Geçerli bir stil seçin.');
    const met = sec[0];
    const saat = dk / 60;
    const kcal = met * kg * saat;
    const rows = [
      ['Yakılan kalori', h.fmt(kcal, 0) + ' kcal'],
      ['Net kalori (dinlenme hariç)', h.fmt((met - 1) * kg * saat, 0) + ' kcal'],
      ['Stil', sec[1]],
      ['MET değeri', h.fmt(met, 1)],
      ['Dakika başına', h.fmt(kcal / dk, 1) + ' kcal'],
    ];
    if (String(v.mesafe ?? '').trim() !== '') {
      const m = h.pos(v.mesafe, 'Mesafe');
      const sn = Math.round(((dk * 60) / m) * 100);
      if (sn < 40) h.err('100 metre temposu 40 saniyenin altında çıkıyor. Mesafeyi metre, süreyi dakika olarak yazdığınızdan emin olun.');
      rows.push(['100 m temposu', `${Math.floor(sn / 60)}:${String(sn % 60).padStart(2, '0')} dk`]);
      rows.push(['Ortalama hız', h.fmt((m / 1000) / saat, 2) + ' km/sa']);
      rows.push(['100 m başına', h.fmt((kcal / m) * 100, 1) + ' kcal']);
    }
    return { rows, note: 'MET değerleri ortalama bir yüzücü içindir; teknik, su sıcaklığı ve dinlenme araları gerçek harcamayı değiştirir.' };
  },
  cases: [
    { in: { kilo: '70', sure: '30', stil: 'serbestYavas', mesafe: '' }, out: { 'Yakılan kalori': '203 kcal', 'MET değeri': '5,8', 'Net kalori (dinlenme hariç)': '168 kcal' } },
    { in: { kilo: '70', sure: '60', stil: 'serbestHizli', mesafe: '' }, out: { 'Yakılan kalori': '686 kcal', 'MET değeri': '9,8' } },
    { in: { kilo: '60', sure: '40', stil: 'kurbaga' }, out: { 'Yakılan kalori': '212 kcal', 'Dakika başına': '5,3 kcal' } },
    { in: { kilo: '80', sure: '20', stil: 'kelebek' }, out: { 'Yakılan kalori': '368 kcal' } },
    { in: { kilo: '65', sure: '60', stil: 'sirt' }, out: { 'Yakılan kalori': '312 kcal' } },
    { in: { kilo: '70', sure: '30', stil: 'serbestYavas', mesafe: '1000' }, out: { 'Yakılan kalori': '203 kcal', '100 m temposu': '3:00 dk', 'Ortalama hız': '2 km/sa', '100 m başına': '20,3 kcal' } },
    { in: { kilo: '75', sure: '50', stil: 'keyif' }, out: { 'Yakılan kalori': '375 kcal', 'MET değeri': '6' } },
    { in: { kilo: '70', sure: '', stil: 'serbestYavas' }, error: true },
    { in: { kilo: '-70', sure: '30', stil: 'sirt' }, error: true },
    { in: { kilo: '70', sure: '5', stil: 'serbestHizli', mesafe: '5000' }, error: true },
  ],
  howto: [
    `"Vücut ağırlığı" alanına kilonuzu yazın.`,
    `"Yüzme süresi" alanına suda gerçekten yüzerek geçirdiğiniz dakikayı girin. Bir saatlik havuz seansının önemli bir kısmı duvar kenarında geçiyorsa bu süreyi düşün.`,
    `"Stil ve tempo" listesinden antrenmanınıza en yakın seçeneği işaretleyin. Seans boyunca stil değiştirdiyseniz her stil için ayrı hesap yapıp sonuçları toplayabilirsiniz.`,
    `İsterseniz toplam mesafeyi metre olarak yazın; 25 metrelik havuzda 40 boy 1.000 metredir.`,
    `"Hesapla" düğmesine basın ve toplam kalori, net kalori, MET değeri ile tempo satırlarını inceleyin.`,
  ],
  sections: [
    { h: 'Yüzmede enerji harcaması nasıl bulunur?', p: [
      `Araç, fiziksel aktivitelerin yoğunluğunu tanımlayan MET (metabolik eşdeğer) değerlerini kullanır. 1 MET, dinlenme hâlindeki enerji harcamasıdır ve kilogram başına saatte yaklaşık 1 kcal sayılır. Buna göre <strong>kalori = MET × kilo × süre (saat)</strong> olur. Örneğin 5,8 MET'lik bir aktivite, dinlenmeye göre yaklaşık altı kat enerji gerektirir.`,
      `Yüzme, karadaki sporlardan farklıdır: suyun kaldırma kuvveti vücut ağırlığını taşır, buna karşılık suyun direnci havanın yüzlerce katıdır. Enerjinin büyük bölümü bu direnci yenmeye gider. Bu yüzden teknik çok belirleyicidir; suda düzgün süzülen deneyimli bir yüzücü aynı hızı, tekniği zayıf birine göre çok daha az enerjiyle yakalar.`,
    ] },
    { h: 'Stillere göre MET değerleri', ul: [
      `<strong>Serbest stil, yavaş / orta tempo</strong>: 5,8 MET`,
      `<strong>Serbest stil, hızlı ve yoğun</strong>: 9,8 MET`,
      `<strong>Sırtüstü</strong>: rahat tempoda 4,8 – antrenman temposunda 9,5 MET`,
      `<strong>Kurbağalama</strong>: rahat tempoda 5,3 – antrenman temposunda 10,3 MET`,
      `<strong>Kelebek</strong>: 13,8 MET`,
      `<strong>Keyif için, kulvar dışı yüzme</strong>: 6,0 MET`,
      `<strong>Suda durma, hafif hareket</strong>: 3,5 MET`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `70 kg ağırlığında biri havuzda 30 dakika boyunca orta tempoda serbest stil yüzmüş ve 1.000 metre tamamlamış olsun. MET değeri 5,8, süre 0,5 saattir. Harcama 5,8 × 70 × 0,5 = <strong>203 kcal</strong> çıkar. Dinlenme payı düşüldüğünde net harcama 4,8 × 70 × 0,5 = 168 kcal'dir.`,
      `Mesafe bilgisinden tempo da hesaplanır: 30 dakika 1.800 saniyedir, 1.000 metreye bölündüğünde 100 metre başına 180 saniye, yani 3:00 dakika eder. Ortalama hız saatte 2 km, 100 metre başına harcama ise 20,3 kcal'dir. Aynı kişi 1 saat boyunca yoğun serbest stil antrenmanı yapsaydı 9,8 × 70 × 1 = 686 kcal harcardı.`,
    ] },
    { h: 'Doğru süreyi girmek neden önemli?', p: [
      `Yüzme hesaplarındaki en yaygın hata, havuzda geçirilen toplam süreyi yazmaktır. Çoğu kişi her birkaç boyda bir duvar kenarında soluklanır; set aralarındaki dinlenmeler, gözlük ayarlama ve sohbet de eklenince bir saatlik seansın yalnızca 35–45 dakikası gerçek yüzme olabilir. Sporcu saatleri bunu "hareket süresi" olarak ayrı gösterir; saatiniz yoksa dürüst bir tahmin yapın.`,
      `Tempo seçimi de sonucu neredeyse ikiye katlayabilir. Kendinizi değerlendirirken şu ölçütü kullanabilirsiniz: boy sonunda nefesiniz hızla toparlanıyor ve hemen devam edebiliyorsanız rahat tempo; duvarda konuşmakta zorlanıyorsanız antrenman temposu uygundur.`,
    ] },
    { h: 'Deniz, soğuk su ve diğer etkenler', p: [
      `Denizde tuzlu su vücudu daha iyi taşıdığı için yüzmek biraz kolaylaşır, ancak dalga ve akıntı eforu artırabilir. Soğuk suda vücut ısısını korumak için ek enerji harcanır; ılık havuzlarda bu etki küçüktür. Neopren kıyafet kaldırma kuvvetini artırıp sürtünmeyi azalttığından aynı hız için daha az enerji gerekir.`,
      `Palet, el paleti ve pull-buoy gibi yardımcı ekipmanlar çalışan kas gruplarını ve hızı değiştirir; bu araçtaki değerler ekipmansız yüzme içindir. Su içi aerobik, su topu ya da dalış gibi etkinlikler farklı MET değerlerine sahiptir ve bu sayfadaki stil listesiyle doğrudan hesaplanamaz.`,
    ] },
    { h: 'Yüzmenin öne çıkan yanları ve uyarı', p: [
      `Yüzme, eklemlere binen yükü en aza indirirken kol, omuz, sırt, karın ve bacak kaslarını birlikte çalıştırır. Bu yüzden fazla kilosu olanlar, eklem sorunu yaşayanlar ve koşuya ara vermek zorunda kalan sporcular için değerli bir dayanıklılık antrenmanıdır. Bununla birlikte birçok kişi yüzme sonrasında belirgin bir iştah artışı yaşar; kilo kontrolü hedefliyorsanız harcadığınız kaloriyi olduğundan büyük görüp fazlasıyla geri almamaya dikkat edin.`,
      `Sonuçlar bilgilendirme amaçlı tahminlerdir. Kalp, akciğer ya da kulak rahatsızlığınız varsa yoğun yüzme programına başlamadan önce hekiminize danışın; açık suda tek başınıza yüzmeyin.`,
    ] },
  ],
  faq: [
    ['1 saat yüzmek kaç kalori yakar?', `70 kg biri için rahat tempoda serbest stil yaklaşık 406 kcal, yoğun serbest stil 686 kcal, rahat kurbağalama 371 kcal harcatır. Burada kastedilen kesintisiz bir saatlik yüzmedir.`],
    ['En çok kalori yakan yüzme stili hangisidir?', `Birim sürede en yüksek harcama kelebek stilindedir (13,8 MET). Ancak kelebek çok yorucu olduğundan uzun süre sürdürülemez; toplam harcama açısından uzun süre yüzebildiğiniz serbest stil çoğu zaman daha verimlidir.`],
    ['1000 metre yüzmek kaç kalori yakar?', `Süreye ve stile bağlıdır. 70 kg biri 1.000 metreyi orta tempoda serbest stille 30 dakikada yüzerse yaklaşık 203 kcal harcar. Mesafeyi araca yazarsanız 100 metre başına harcamayı da görürsünüz.`],
    ['Yüzmek mi koşmak mı daha çok kalori yakar?', `Aynı sürede orta tempolu koşu genellikle orta tempolu yüzmeden daha çok enerji harcatır. Yoğun yüzme antrenmanı ise orta tempolu koşuyla benzer düzeydedir. Yüzmenin üstünlüğü, eklemleri yormadan tüm vücudu çalıştırmasıdır.`],
    ['Havuzda sadece oyalanmak kalori yakar mı?', `Evet ama daha azdır. Suda durmak ya da hafifçe hareket etmek 3,5 MET civarındadır; 70 kg biri için yarım saatte yaklaşık 123 kcal eder.`],
    ['Akıllı saatim farklı bir sonuç veriyor, hangisi doğru?', `İkisi de tahmindir. Saatler kulaç sayısı, nabız ve kişisel bilgileri kullanır; suda bilekten nabız ölçümü her zaman güvenilir değildir. Yüzde 15–20 fark olağandır.`],
    ['Çocuklar için de kullanılabilir mi?', `Formül çalışır, ancak MET değerleri yetişkinler üzerinde belirlenmiştir. Çocukların kilogram başına dinlenme harcaması daha yüksek olduğundan sonuç yalnızca kaba bir fikir verir.`],
    ['Yazdığım bilgiler saklanıyor mu?', `Hayır. Hesaplama tarayıcınızda yapılır; kilo, süre ve mesafe bilgileri hiçbir sunucuya gönderilmez.`],
  ],
  related: ['yuzme-temposu-hesapla', 'met-kalori-hesapla', 'kosu-kalori-hesapla', 'bisiklet-kalori-hesapla', 'kalori-acigi-hesapla'],
};
