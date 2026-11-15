export default {
  slug: 'led-tasarruf-hesapla',
  title: 'LED Ampul Tasarrufu Hesaplama',
  h1Tail: 'eski ampul yerine LED',
  pageTitle: 'LED Ampul Tasarrufu Hesaplama – Yılda Kaç TL ve kWh Kazanılır?',
  description: 'Eski ampulleri LED ile değiştirince yılda kaç kWh ve kaç TL tasarruf edeceğinizi, tasarruf oranını ve LED ampullerin kendini kaç ayda ödeyeceğini hesaplayın.',
  card: 'Akkor ya da halojen ampulü LED ile değiştirmenin yıllık kWh ve TL tasarrufunu, geri ödeme süresini hesaplayın.',
  category: 'elektrik',
  keywords: ['led tasarruf hesaplama', 'led ampul tasarrufu', 'led ne kadar tasarruf sağlar', 'akkor led karşılaştırma', 'led geri ödeme süresi', 'ampul elektrik tüketimi', 'tasarruflu ampul hesaplama'],
  lead: 'Evinizdeki ya da iş yerinizdeki eski ampulleri LED ile değiştirdiğinizde ne kazanacağınızı hesaplayın. Araç iki ampulün yıllık tüketimini karşılaştırır, <strong>yıllık tasarrufu kWh ve TL</strong> olarak verir; LED fiyatını yazarsanız yatırımın kendini kaç ayda ödediğini de gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'eski', label: 'Eski ampulün gücü (W)', type: 'number', value: '60' },
    { id: 'led', label: 'LED ampulün gücü (W)', type: 'number', value: '9' },
    { id: 'adet', label: 'Ampul adedi', type: 'number', value: '1' },
    { id: 'saat', label: 'Günlük yanma süresi (saat)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'fiyat', label: 'Birim fiyat (TL/kWh)', type: 'number', placeholder: 'Örn. 3', hint: 'Faturanızdaki vergiler dâhil kWh bedeli; binlik ayraç kullanmayın.' },
    { id: 'ledFiyat', label: 'Bir LED ampulün fiyatı (TL)', type: 'number', placeholder: 'İsteğe bağlı', hint: 'Yazarsanız geri ödeme süresi hesaplanır.' },
  ],
  compute(v, h) {
    const eski = h.pos(v.eski, 'Eski ampulün gücü');
    const led = h.pos(v.led, 'LED ampulün gücü');
    if (led >= eski) h.err('LED ampulün gücü eski ampulden küçük olmalı; aksi halde tasarruf oluşmaz.');
    const adet = String(v.adet ?? '').trim() === '' ? 1 : h.posint(v.adet, 'Ampul adedi');
    const saat = h.pos(v.saat, 'Günlük yanma süresi');
    if (saat > 24) h.err('"Günlük yanma süresi" en fazla 24 saat olabilir.');
    const fiyat = h.nonneg(v.fiyat, 'Birim fiyat');
    const yilSaat = saat * 365;
    const eskiKwh = eski * adet * yilSaat / 1000;
    const ledKwh = led * adet * yilSaat / 1000;
    const kwh = eskiKwh - ledKwh;
    const tl = kwh * fiyat;
    const rows = [
      ['Yıllık tasarruf', h.para(tl)],
      ['Yıllık enerji tasarrufu', h.fmt(kwh, 2) + ' kWh'],
      ['Eski ampullerin yıllık tüketimi', h.fmt(eskiKwh, 2) + ' kWh'],
      ['LED ampullerin yıllık tüketimi', h.fmt(ledKwh, 2) + ' kWh'],
      ['Tasarruf oranı', '%' + h.fmt((1 - led / eski) * 100, 2)],
      ['Aylık tasarruf', h.para(tl / 12)],
    ];
    if (String(v.ledFiyat ?? '').trim() !== '') {
      const lf = h.nonneg(v.ledFiyat, 'Bir LED ampulün fiyatı');
      rows.push(['LED yatırımı', h.para(lf * adet)]);
      rows.push(['Geri ödeme süresi', tl > 0 ? h.fmt(lf * adet / (tl / 12), 1) + ' ay' : 'Hesaplanamadı (birim fiyat 0)']);
    }
    return { rows, note: 'Yıl 365 gün alınmıştır. Hesap yalnızca elektrik tüketimi farkını gösterir; LED\'in daha uzun ömrü sayesinde azalan ampul değiştirme masrafı dâhil değildir.' };
  },
  cases: [
    { in: { eski: '60', led: '10', adet: '1', saat: '4', fiyat: '3', ledFiyat: '73' }, out: { 'Yıllık tasarruf': '219,00 TL', 'Yıllık enerji tasarrufu': '73 kWh', 'Eski ampullerin yıllık tüketimi': '87,6 kWh', 'LED ampullerin yıllık tüketimi': '14,6 kWh', 'Tasarruf oranı': '%83,33', 'Geri ödeme süresi': '4 ay' } },
    { in: { eski: '100', led: '15', adet: '10', saat: '6', fiyat: '2', ledFiyat: '100' }, out: { 'Yıllık tasarruf': '3.723,00 TL', 'Yıllık enerji tasarrufu': '1.861,5 kWh', 'Tasarruf oranı': '%85', 'LED yatırımı': '1.000,00 TL', 'Geri ödeme süresi': '3,2 ay' } },
    { in: { eski: '40', led: '5', adet: '4', saat: '3', fiyat: '4' }, out: { 'Yıllık tasarruf': '613,20 TL', 'Yıllık enerji tasarrufu': '153,3 kWh', 'Tasarruf oranı': '%87,5', 'Aylık tasarruf': '51,10 TL' } },
    { in: { eski: '75', led: '12', adet: '2', saat: '2', fiyat: '2,5' }, out: { 'Yıllık tasarruf': '229,95 TL', 'Yıllık enerji tasarrufu': '91,98 kWh', 'Tasarruf oranı': '%84' } },
    { in: { eski: '50', led: '8', adet: '5', saat: '4', fiyat: '3' }, out: { 'Yıllık tasarruf': '919,80 TL', 'Yıllık enerji tasarrufu': '306,6 kWh', 'Eski ampullerin yıllık tüketimi': '365 kWh', 'LED ampullerin yıllık tüketimi': '58,4 kWh' } },
    { in: { eski: '9', led: '60', adet: '1', saat: '4', fiyat: '3' }, error: true },
    { in: { eski: '60', led: '9', adet: '1', saat: '', fiyat: '3' }, error: true },
    { in: { eski: '60', led: '9', adet: '1,5', saat: '4', fiyat: '3' }, error: true },
  ],
  howto: [
    'Şu anda kullandığınız ampulün gücünü watt olarak yazın; değer ampulün cam ya da duy kısmında basılıdır.',
    'Yerine takacağınız LED ampulün gücünü girin. Aynı parlaklığı veren LED\'i seçmek için kutudaki lümen değerini karşılaştırın.',
    'Değiştireceğiniz ampul sayısını ve ampullerin günde ortalama kaç saat yandığını belirtin.',
    'Elektrik faturanızdaki kWh birim fiyatını yazın. İsterseniz bir LED ampulün satın alma fiyatını da ekleyin.',
    '"Hesapla" düğmesine basın; yıllık tasarruf, tüketim karşılaştırması ve geri ödeme süresi listelenir.',
  ],
  sections: [
    { h: 'LED neden daha az elektrik harcar?', p: [
      'Akkor ampul, ince bir tungsten teli akkor hâle gelene kadar ısıtarak ışık üretir; tüketilen enerjinin çok büyük bölümü görünür ışığa değil ısıya dönüşür. Halojen ampuller aynı ilkenin biraz daha verimli bir türüdür. LED ise yarı iletken bir yapıda elektronların doğrudan ışık yaymasına dayanır ve aynı ışık miktarını çok daha düşük güçle verir.',
      'Verim, watt başına lümen (lm/W) ile ölçülür. Klasik akkor ampuller kabaca 10–15 lm/W düzeyindeyken güncel LED ampuller çoğunlukla 80–130 lm/W aralığındadır. Bu yüzden yaklaşık 800 lümen veren 60 W\'lık bir akkor ampulün yerini 8–10 W\'lık bir LED alabilir.',
    ] },
    { h: 'Hesap nasıl yapılır?', p: [
      'Her iki ampul için yıllık tüketim aynı formülle bulunur: <strong>yıllık kWh = güç (W) × adet × günlük saat × 365 ÷ 1000</strong>. Tasarruf, iki tüketim arasındaki farktır ve birim fiyatla çarpılarak liraya çevrilir. Tasarruf oranı yalnızca güçlere bağlıdır: <strong>oran = (1 − LED gücü ÷ eski güç) × 100</strong>.',
      'Geri ödeme süresi, LED ampullere ödenen toplam tutarın aylık tasarrufa bölünmesiyle hesaplanır: <strong>süre (ay) = LED fiyatı × adet ÷ (yıllık tasarruf ÷ 12)</strong>.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Günde 4 saat yanan 60 W\'lık bir akkor ampulü 10 W\'lık LED ile değiştirdiğinizi varsayalım. Eski ampulün yıllık tüketimi 60 × 4 × 365 ÷ 1000 = 87,6 kWh, LED\'in tüketimi 10 × 4 × 365 ÷ 1000 = 14,6 kWh\'tir. Aradaki fark 73 kWh\'tir ve tasarruf oranı %83,33 eder.',
      'Birim fiyat 3 TL/kWh alınırsa yıllık tasarruf 73 × 3 = 219 TL, aylık tasarruf 18,25 TL olur. LED ampulün fiyatı 73 TL ise yatırım 73 ÷ 18,25 = 4 ayda kendini öder; sonraki her ay kazançtır. Örnekteki fiyatlar yalnızca hesabı göstermek içindir; güncel elektrik ve ampul fiyatlarını kendiniz girin.',
      'Ölçek büyüdükçe etki katlanır: bir iş yerinde günde 6 saat yanan 10 adet 100 W\'lık ampul 15 W\'lık LED\'lerle değiştirilirse yılda 1.861,5 kWh tasarruf edilir.',
    ] },
    { h: 'Hangi ampulün yerine kaç watt LED?', p: [
      'Doğru eşleştirme watt değerine değil lümene göre yapılır. Aşağıdaki tablo yaklaşık karşılıkları gösterir; ürünler arasında fark olabileceğinden kutudaki lümen değerini kontrol edin.',
    ], ul: [
      '<strong>25 W akkor</strong> (yaklaşık 250 lm) → 2–3 W LED',
      '<strong>40 W akkor</strong> (yaklaşık 470 lm) → 4–6 W LED',
      '<strong>60 W akkor</strong> (yaklaşık 800 lm) → 8–10 W LED',
      '<strong>75 W akkor</strong> (yaklaşık 1.050 lm) → 10–13 W LED',
      '<strong>100 W akkor</strong> (yaklaşık 1.500 lm) → 13–18 W LED',
      '<strong>50 W halojen spot</strong> → 5–7 W LED spot',
    ] },
    { h: 'Tasarrufu en çok nerede hissedersiniz?', p: [
      'Tasarruf, ampulün yanma süresiyle doğru orantılıdır. Salon, mutfak, dükkân vitrini, apartman girişi ve dış aydınlatma gibi uzun süre açık kalan noktalarda değişim kısa sürede kendini öder. Günde birkaç dakika yanan kiler ya da depo ampulünde ise geri ödeme süresi yıllarla ölçülebilir; bu tür yerlerde mevcut ampul bozulana kadar beklemek de makul bir tercihtir.',
      'Önceliği belirlemek için evinizdeki ampulleri güç ve yanma süresine göre sıralayın ve her biri için bu hesabı tekrarlayın. En yüksek yıllık tasarrufu veren noktalardan başlamak, aynı bütçeyle en büyük kazancı sağlar.',
    ] },
    { h: 'Hesaba girmeyen ek kazançlar ve sınırlar', ul: [
      '<strong>Ömür:</strong> LED ampuller akkor ampullere göre çok daha uzun süre dayanır; daha seyrek ampul almak ve değiştirmek ayrı bir tasarruftur.',
      '<strong>Isı:</strong> LED\'ler daha az ısındığı için yazın klima yükünü bir miktar azaltır; kışın ise akkor ampulün verdiği ısı eksilir.',
      '<strong>Kalite farkı:</strong> Çok ucuz LED ampullerde ışık titremesi, zayıf renk kalitesi ve kısa ömür görülebilir; güvenilir üreticilerin ürünlerini tercih edin.',
      '<strong>Dimmer uyumu:</strong> Eski tip dimmerler her LED ile çalışmaz; kısılabilir LED ve uyumlu dimmer gerekebilir.',
      '<strong>Floresan karşılaştırması:</strong> Kompakt floresan ampullerden LED\'e geçişte tasarruf oranı daha düşüktür; yine de aynı hesap geçerlidir.',
    ] },
    { h: 'Uyarı', p: [
      'Sonuçlar bilgilendirme amaçlı bir tahmindir. Gerçek tasarruf; tarifenize, ampullerin gerçek tüketimine ve kullanım alışkanlığınıza göre değişir. Armatür ya da tesisat değişikliği gerektiren işlerde yetkili bir elektrikçiden destek alın.',
    ] },
  ],
  faq: [
    ['60 watt ampul yerine kaç watt LED kullanılır?', 'Yaklaşık 800 lümen veren 60 W\'lık akkor ampulün karşılığı çoğunlukla 8–10 W\'lık LED ampuldür. Seçim yaparken watt yerine kutudaki lümen değerini eşleştirin.'],
    ['LED ampul yüzde kaç tasarruf sağlar?', 'Akkor ampule göre çoğunlukla %80–90 arasında tasarruf sağlar. 60 W yerine 9 W kullanıldığında oran %85, 100 W yerine 15 W kullanıldığında yine %85 olur. Oran yalnızca iki gücün birbirine oranına bağlıdır.'],
    ['Geri ödeme süresi nasıl yorumlanır?', 'LED ampule ödediğiniz paranın, elektrik faturasındaki azalmayla kaç ayda geri döndüğünü gösterir. Süre kısaysa değişimi hemen yapmak mantıklıdır. LED\'in ömrü bu sürenin çok üzerindeyse kalan dönem net kazançtır.'],
    ['Günlük yanma süresini nasıl tahmin ederim?', 'Ampulün akşam açılıp kapandığı saatleri birkaç gün gözlemleyin ve yıl ortalamasını düşünün; kışın süre uzar, yazın kısalır. Emin değilseniz salon için 4–6, yatak odası için 1–2 saat makul bir başlangıçtır.'],
    ['Floresan ya da tasarruflu ampulden LED\'e geçmeye değer mi?', 'Kompakt floresan ampuller zaten akkor ampulden çok daha verimlidir; LED\'e geçişteki ek tasarruf daha sınırlıdır. Eski gücü ve yeni LED gücünü yazarak farkı görebilirsiniz; çoğu durumda mevcut ampul bozulduğunda LED almak yeterlidir.'],
    ['LED fiyatı alanını boş bırakırsam ne olur?', 'Araç yalnızca enerji ve para tasarrufunu gösterir; "LED yatırımı" ve "Geri ödeme süresi" satırları sonuçta yer almaz.'],
    ['Yıllık hesapta neden 365 gün kullanılıyor?', 'Aydınlatma yıl boyunca her gün kullanıldığı için tüketim 365 günle çarpılır. Ampul yalnızca belirli günlerde yanıyorsa, günlük süreyi yıl ortalamasına göre düşürerek yazabilirsiniz.'],
    ['Girdiğim bilgiler bir yere gönderiliyor mu?', 'Hayır. Bütün hesap tarayıcınızda yapılır; yazdığınız değerler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['aydinlatma-lumen-hesapla', 'cihaz-elektrik-maliyeti-hesapla', 'serit-led-guc-kaynagi-hesapla', 'led-direnc-hesapla', 'elektrik-gucu-hesapla'],
};
