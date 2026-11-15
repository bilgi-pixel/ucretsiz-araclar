export default {
  slug: 'ups-calisma-suresi-hesapla',
  title: 'UPS (Kesintisiz Güç Kaynağı) Çalışma Süresi Hesaplama',
  pageTitle: 'UPS Çalışma Süresi Hesaplama – Kesintisiz Güç Kaynağı Kaç Dakika Dayanır?',
  description: 'UPS\'in elektrik kesintisinde yükünüzü kaç dakika besleyeceğini hesaplayın. Akü kapasitesi, akü sayısı, yük ve verime göre süreyi ve UPS yük oranını verir.',
  card: 'Kesintisiz güç kaynağınızın yükü kaç dakika besleyeceğini akü kapasitesi, akü sayısı ve yüke göre hesaplayın.',
  category: 'elektrik',
  keywords: ['ups çalışma süresi', 'ups kaç dakika dayanır', 'kesintisiz güç kaynağı hesaplama', 'ups akü hesabı', 'ups süre hesaplama', 'ups va watt hesaplama', '7 ah akü ups kaç dakika'],
  lead: 'Elektrik kesildiğinde kesintisiz güç kaynağınızın (UPS) bağlı cihazları ne kadar süre çalıştıracağını tahmin edin. Araç, akü grubunun enerjisini <strong>evirici verimi</strong> ve <strong>yüksek akımda kullanılabilir kapasite</strong> oranıyla düzeltip yüke böler; UPS gücünü yazarsanız yük oranını da gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'akuAh', label: 'Akü kapasitesi (Ah)', type: 'number', value: '7', hint: 'Tek bir akünün kapasitesi.' },
    { id: 'akuV', label: 'Akü gerilimi (V)', type: 'number', value: '12' },
    { id: 'akuAdet', label: 'Akü sayısı', type: 'number', value: '1' },
    { id: 'yuk', label: 'Bağlı yük (W)', type: 'number', placeholder: 'Örn. 300' },
    { id: 'verim', label: 'Evirici verimi (%)', type: 'number', value: '85' },
    { id: 'kullanim', label: 'Kullanılabilir kapasite (%)', type: 'number', value: '70', hint: 'Hızlı boşalmada ve akü yaşlandıkça alınabilen kapasite oranı. Kuramsal süre için 100 yazın.' },
    { id: 'upsVa', label: 'UPS gücü (VA) – isteğe bağlı', type: 'number', placeholder: 'Örn. 1000' },
    { id: 'upsPf', label: 'UPS çıkış güç faktörü', type: 'number', value: '0,6', hint: 'Yalnızca UPS gücü yazıldıysa kullanılır. Etikette watt değeri varsa watt ÷ VA oranını girin.' },
  ],
  compute(v, h) {
    const ah = h.pos(v.akuAh, 'Akü kapasitesi');
    const V = h.pos(v.akuV, 'Akü gerilimi');
    const adet = h.posint(v.akuAdet, 'Akü sayısı');
    const yuk = h.pos(v.yuk, 'Bağlı yük');
    const verim = h.pos(v.verim, 'Evirici verimi');
    const kul = h.pos(v.kullanim, 'Kullanılabilir kapasite');
    if (verim > 100) h.err('"Evirici verimi" yüzde 100\'den büyük olamaz.');
    if (kul > 100) h.err('"Kullanılabilir kapasite" yüzde 100\'den büyük olamaz.');
    const rows = [];
    let oran = null;
    if (String(v.upsVa ?? '').trim() !== '') {
      const va = h.pos(v.upsVa, 'UPS gücü');
      const pf = h.pos(v.upsPf, 'UPS çıkış güç faktörü');
      if (pf > 1) h.err('"UPS çıkış güç faktörü" 1\'den büyük olamaz; 0,6 – 1 arasında bir değer yazın.');
      const maxW = va * pf;
      if (yuk > maxW + 1e-9) h.err(`Bağlı yük (${h.fmt(yuk, 0)} W), UPS'in verebileceği gücü (${h.fmt(maxW, 0)} W) aşıyor. Yükü azaltın ya da daha güçlü bir UPS seçin.`);
      oran = [maxW, yuk / maxW * 100];
    }
    const toplam = ah * V * adet;
    const net = toplam * verim / 100 * kul / 100;
    const dk = net / yuk * 60;
    const tam = Math.round(dk);
    const sure = tam < 1 ? '1 dakikadan az' : tam < 60 ? `${tam} dakika` : `${Math.floor(tam / 60)} saat ${tam % 60} dakika`;
    rows.push(['Çalışma süresi', sure]);
    rows.push(['Süre (dakika)', h.fmt(dk, 1) + ' dk']);
    rows.push(['Akü grubunun enerjisi', h.fmt(toplam, 1) + ' Wh']);
    rows.push(['Yüke ulaşan enerji', h.fmt(net, 2) + ' Wh']);
    rows.push(['Aküden çekilen akım', h.fmt(yuk / (verim / 100) / (V * adet), 2) + ' A']);
    if (oran) {
      rows.push(['UPS\'in verebileceği güç', h.fmt(oran[0], 0) + ' W']);
      rows.push(['UPS yük oranı', '%' + h.fmt(oran[1], 1)]);
    }
    return { rows, note: 'Sonuç yaklaşık bir tahmindir. Akü yaşı, sıcaklık ve boşalma hızı süreyi belirgin biçimde değiştirir; kritik sistemlerde üreticinin süre tablolarını ve gerçek testi esas alın.' };
  },
  cases: [
    { in: { akuAh: '7', akuV: '12', akuAdet: '1', yuk: '100', verim: '100', kullanim: '100' }, out: { 'Çalışma süresi': '50 dakika', 'Süre (dakika)': '50,4 dk', 'Akü grubunun enerjisi': '84 Wh' } },
    { in: { akuAh: '9', akuV: '12', akuAdet: '2', yuk: '200', verim: '85', kullanim: '70' }, out: { 'Çalışma süresi': '39 dakika', 'Süre (dakika)': '38,6 dk', 'Akü grubunun enerjisi': '216 Wh', 'Yüke ulaşan enerji': '128,52 Wh' } },
    { in: { yuk: '300' }, out: { 'Çalışma süresi': '10 dakika', 'Süre (dakika)': '10 dk', 'Yüke ulaşan enerji': '49,98 Wh' } },
    { in: { akuAh: '100', akuV: '12', akuAdet: '4', yuk: '1000', verim: '90', kullanim: '80' }, out: { 'Çalışma süresi': '3 saat 27 dakika', 'Yüke ulaşan enerji': '3.456 Wh', 'Aküden çekilen akım': '23,15 A' } },
    { in: { akuAh: '7', akuV: '12', akuAdet: '2', yuk: '300', verim: '85', kullanim: '70', upsVa: '1000', upsPf: '0,6' }, out: { 'Çalışma süresi': '20 dakika', 'UPS\'in verebileceği güç': '600 W', 'UPS yük oranı': '%50' } },
    { in: { akuAh: '7', akuV: '12', akuAdet: '1', yuk: '42', verim: '100', kullanim: '100' }, out: { 'Çalışma süresi': '2 saat 0 dakika', 'Aküden çekilen akım': '3,5 A' } },
    { in: { akuAh: '7', akuV: '12', akuAdet: '1', yuk: '500', verim: '85', kullanim: '70', upsVa: '650', upsPf: '0,6' }, error: true },
    { in: { akuAh: '7', akuV: '12', akuAdet: '1,5', yuk: '100', verim: '85', kullanim: '70' }, error: true },
    { in: { akuAh: '7', akuV: '12', akuAdet: '1', yuk: '', verim: '85', kullanim: '70' }, error: true },
  ],
  howto: [
    'UPS\'in içindeki ya da dış akü kabinindeki tek bir akünün kapasitesini (Ah), gerilimini ve toplam akü sayısını yazın. Küçük UPS\'lerde çoğunlukla 12 V 7 Ah ya da 9 Ah aküler bulunur.',
    'UPS\'e bağlı cihazların toplam gücünü watt olarak girin. Emin değilseniz cihazların etiket güçlerini toplayın ya da bir priz tipi güç ölçerle ölçün.',
    'Evirici verimi ve kullanılabilir kapasite alanlarını olduğu gibi bırakabilir ya da UPS\'inizin teknik değerlerine göre değiştirebilirsiniz.',
    'İsterseniz UPS\'in VA cinsinden gücünü ve çıkış güç faktörünü yazın; araç yükün UPS kapasitesinin yüzde kaçını kullandığını gösterir ve aşım varsa uyarır.',
    '"Hesapla" düğmesine basın; tahmini çalışma süresini ve aküden çekilen akımı okuyun.',
  ],
  sections: [
    { h: 'UPS çalışma süresi neye bağlıdır?', p: [
      'Kesintisiz güç kaynağı, şebeke varken akülerini dolu tutar; elektrik kesildiğinde akülerdeki doğru akımı evirici devresiyle 230 voltluk alternatif akıma çevirerek bağlı cihazları beslemeyi sürdürür. Bu sürenin uzunluğunu UPS\'in VA cinsinden gücü değil, <strong>akülerde depolanan enerji ile yükün büyüklüğü</strong> belirler. Aynı güçteki iki UPS, akü kapasiteleri farklıysa çok farklı süreler verir.',
      'UPS\'in gücü ise ne kadar yük bağlayabileceğinizi sınırlar. Yani iki ayrı soru vardır: "Bu yükü taşır mı?" sorusunun yanıtı VA ve watt değerindedir; "Ne kadar süre taşır?" sorusunun yanıtı akülerdedir. Araç ikisini de yanıtlamaya çalışır.',
    ] },
    { h: 'Hesaplama yöntemi', ul: [
      '<strong>Akü grubunun enerjisi (Wh)</strong> = Ah × akü gerilimi × akü sayısı',
      '<strong>Yüke ulaşan enerji (Wh)</strong> = akü enerjisi × evirici verimi × kullanılabilir kapasite',
      '<strong>Süre (dakika)</strong> = yüke ulaşan enerji ÷ yük (W) × 60',
      '<strong>UPS\'in verebileceği güç (W)</strong> = VA × çıkış güç faktörü',
    ], p: [
      'Aküler seri de paralel de bağlı olsa toplam enerji aynıdır; bu yüzden araç yalnızca akü sayısını sorar. Aküden çekilen akım satırı, akülerin seri bağlı olduğu varsayımıyla toplam grup gerilimi üzerinden hesaplanır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Kuramsal süre:</strong> 12 V 7 Ah tek akü 84 Wh enerji depolar. Kayıp olmadığı varsayılırsa 100 watt\'lık yükü 84 ÷ 100 × 60 = 50,4 dakika besler.',
      '<strong>Gerçekçi tahmin:</strong> Aynı akü, yüzde 85 evirici verimi ve yüzde 70 kullanılabilir kapasiteyle 84 × 0,85 × 0,70 = 49,98 Wh verir. 300 watt\'lık bir bilgisayar ve monitör için süre 49,98 ÷ 300 × 60 = yaklaşık 10 dakikadır. Kuramsal hesapla bulunacak 16,8 dakikanın oldukça altında olduğuna dikkat edin.',
      '<strong>İki akülü UPS:</strong> 2 adet 12 V 9 Ah akü 216 Wh eder. Aynı kabullerle yüke 128,52 Wh ulaşır; 200 watt\'lık yük yaklaşık 38,6 dakika, yani 39 dakika beslenir.',
      '<strong>Dış akü grubu:</strong> 4 adet 12 V 100 Ah akü 4.800 Wh depolar. Yüzde 90 verim ve yüzde 80 kullanılabilir kapasiteyle 3.456 Wh kalır; 1.000 watt\'lık yük 3 saat 27 dakika çalışır.',
    ] },
    { h: 'VA ile watt arasındaki ilişki', p: [
      'UPS\'lerin kapasitesi volt-amper (VA) ile ifade edilir; bu görünür güçtür. Bağlayabileceğiniz gerçek güç ise watt cinsindendir ve VA değerinin çıkış güç faktörüyle çarpılmasıyla bulunur. Giriş seviyesi cihazlarda bu oran 0,6 dolayında olabildiğinden 1.000 VA\'lık bir UPS yaklaşık 600 watt taşıyabilir; daha üst sınıf cihazlarda oran 0,9 ya da 1 olabilir. Doğru değer cihazın etiketinde ya da kılavuzunda watt olarak yazar.',
      'UPS\'i sürekli tam kapasitede çalıştırmak hem süreyi kısaltır hem de cihazı zorlar. Yük oranının makul bir düzeyde kalması, ileride eklenecek cihazlar için de pay bırakır. Araçtaki "UPS yük oranı" satırı bu değerlendirme için eklenmiştir.',
    ] },
    { h: 'Kullanılabilir kapasite neden yüzde 100 değil?', p: [
      'UPS\'lerde kullanılan kurşun-asit akülerin etiket kapasitesi yavaş boşalma koşullarında, genellikle 20 saatlik sürede ölçülür. UPS ise aküyü dakikalar içinde boşaltır; bu kadar yüksek akımda akü, etiket kapasitesinin belirgin biçimde altında enerji verebilir. Yük büyüdükçe bu etki artar.',
      'Buna ek olarak aküler zamanla yaşlanır; yüksek ortam sıcaklığı bu süreci hızlandırır. Birkaç yıllık bir UPS ilk günkü süresini vermez. UPS ayrıca aküyü korumak için gerilim belirli bir düzeye inince kendini kapatır, yani akü hiçbir zaman tamamen boşaltılmaz. Varsayılan yüzde 70 değeri bu etkilerin kabaca toplamını temsil eden bir kabuldür; yeni akü ve hafif yükte daha yüksek, eski akü ve ağır yükte daha düşük bir değer yazmak gerçeğe daha yakın sonuç verir.',
    ] },
    { h: 'Ne zaman yeterlidir, ne zaman değildir?', p: [
      'Ev ve küçük ofis kullanımında UPS\'ten beklenen çoğu zaman uzun süre çalışmak değil, kısa kesintileri atlatmak ve uzun kesintide açık dosyaları kaydedip bilgisayarı düzgün kapatmaya yetecek birkaç dakikayı sağlamaktır. Modem, kamera kayıt cihazı ve kombi gibi düşük güçlü yüklerde ise aynı akü saatlerce dayanabilir.',
      'Lazer yazıcı, ısıtıcı, klima ve kompresörlü cihazlar yüksek ve ani güç çektiğinden küçük UPS\'lere bağlanmamalıdır. Sonuç bilgilendirme amaçlıdır; sunucu odası, tıbbi cihaz ve güvenlik sistemi gibi kritik uygulamalarda kapasite seçimi üreticinin süre tablolarına, ölçüme ve uzman değerlendirmesine dayanmalıdır.',
    ] },
  ],
  faq: [
    ['UPS kaç dakika dayanır?', 'Akü kapasitesine ve yüke bağlıdır. Tek 12 V 7 Ah akülü bir UPS, 300 watt\'lık bir bilgisayarı gerçekçi kabullerle yaklaşık 10 dakika besler; yük 100 watt\'a düşerse süre yaklaşık 30 dakikaya çıkar.'],
    ['1000 VA UPS kaç watt taşır?', 'Çıkış güç faktörüne bağlıdır. Güç faktörü 0,6 olan bir cihaz 600 watt, 0,9 olan bir cihaz 900 watt taşır. Kesin değer UPS etiketinde watt olarak belirtilir.'],
    ['Süreyi uzatmak için ne yapabilirim?', 'Yükü azaltmak en etkili yoldur: gereksiz cihazları UPS\'ten ayırın. Destekliyorsa UPS\'e dış akü grubu eklenebilir. Eskimiş aküleri yenilemek de süreyi ilk günkü düzeyine yaklaştırır.'],
    ['Akü sayısını nereden öğrenirim?', 'UPS\'in kullanım kılavuzunda ya da teknik özellik etiketinde akü tipi ve adedi yazar. Küçük modellerde bir ya da iki, daha büyüklerinde daha fazla 12 voltluk akü bulunur.'],
    ['Hesaplanan süre neden üreticinin tablosundan farklı?', 'Üretici tabloları o modelin gerçek testlerine dayanır ve akünün hızlı boşalma davranışını içerir. Bu araç genel bir enerji hesabı yapar; elinizde üretici tablosu varsa onu esas alın.'],
    ['Yükümü nasıl öğrenebilirim?', 'En doğrusu priz tipi bir güç ölçer kullanmaktır. Yoksa cihazların etiket güçlerini toplayabilirsiniz; ancak etiket değeri çoğunlukla en yüksek gücü gösterir ve gerçek tüketim daha düşük olabilir.'],
    ['Aküler seri mi paralel mi bağlı, fark eder mi?', 'Toplam enerji açısından fark etmez; süre aynıdır. Yalnızca aküden çekilen akım satırı seri bağlantı varsayımıyla hesaplanır.'],
    ['Girdiğim bilgiler saklanıyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda yapılır; değerler sunucuya gönderilmez.'],
  ],
  related: ['aku-kullanim-suresi-hesapla', 'kva-kw-cevir', 'jenerator-gucu-hesapla', 'mah-wh-cevir', 'elektrik-tuketim-hesapla'],
};
