export default {
  slug: 'pwm-gorev-dongusu-hesapla',
  title: 'PWM Görev Döngüsü Hesaplama',
  h1Tail: 'duty cycle, süre ve ortalama gerilim',
  pageTitle: 'PWM Görev Döngüsü (Duty Cycle) Hesaplama – Süre ve Gerilim',
  description: 'PWM frekansı ve görev döngüsünden periyodu, açık ve kapalı süreleri, ortalama ve etkin (RMS) gerilimi ve sayaç karşılaştırma değerini hesaplayın.',
  card: 'PWM frekansı ve görev döngüsünden açık-kapalı süreleri, ortalama gerilimi ve sayaç değerini hesaplayın.',
  category: 'elektrik',
  keywords: ['pwm hesaplama', 'görev döngüsü hesaplama', 'duty cycle hesaplama', 'pwm ortalama gerilim', 'pwm periyot hesaplama', 'darbe genişlik modülasyonu', 'pwm değeri hesaplama'],
  lead: 'PWM sinyalinin frekansını ve görev döngüsünü (duty cycle) yüzde olarak yazın. Araç <strong>periyodu, açık ve kapalı süreleri, ortalama ve etkin gerilimi</strong> ve seçtiğiniz bit çözünürlüğü için sayaç karşılaştırma değerini hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'frekans', label: 'Frekans (Hz)', type: 'number', placeholder: 'Örn. 1000', hint: 'Binlik ayraç kullanmayın: 20 kHz için 20000 yazın.' },
    { id: 'gorev', label: 'Görev döngüsü (%)', type: 'number', placeholder: 'Örn. 25' },
    { id: 'gerilim', label: 'Tepe gerilimi (V)', type: 'number', value: '5' },
    { id: 'bit', label: 'PWM çözünürlüğü (bit)', type: 'number', value: '8' },
  ],
  compute(v, h) {
    const f = h.pos(v.frekans, 'Frekans');
    const d = h.num(v.gorev, 'Görev döngüsü');
    if (d < 0 || d > 100) h.err('Görev döngüsü %0 ile %100 arasında olmalı.');
    const u = h.opt(v.gerilim, 5, 'Tepe gerilimi');
    if (u < 0) h.err('Tepe gerilimi negatif olamaz.');
    const n = h.opt(v.bit, 8, 'PWM çözünürlüğü');
    if (!Number.isInteger(n) || n < 1 || n > 32) h.err('PWM çözünürlüğü 1 ile 32 arasında tam sayı olmalı.');
    const oran = d / 100;
    const t = 1 / f;
    const sure = (x) => {
      if (x <= 0) return '0 ms';
      const e = 1 - 1e-12;
      if (x >= e) return h.sig(x, 5) + ' s';
      if (x >= 1e-3 * e) return h.sig(x * 1e3, 5) + ' ms';
      if (x >= 1e-6 * e) return h.sig(x * 1e6, 5) + ' µs';
      return h.sig(x * 1e9, 5) + ' ns';
    };
    const ust = Math.pow(2, n) - 1;
    const deger = Math.round(oran * ust + 1e-9);
    return {
      rows: [
        ['Açık (yüksek) süre', sure(t * oran)],
        ['Kapalı (düşük) süre', sure(t * (1 - oran))],
        ['Periyot', sure(t)],
        ['Ortalama gerilim', h.sig(u * oran, 5) + ' V'],
        ['Etkin (RMS) gerilim', h.sig(u * Math.sqrt(oran), 5) + ' V'],
        ['Dirençli yükte güç oranı', '%' + h.fmt(d, 2)],
        ['Sayaç karşılaştırma değeri', h.fmt(deger, 0) + ' / ' + h.fmt(ust, 0)],
        ['Gerçekleşen görev döngüsü', '%' + h.fmt(deger / ust * 100, 2)],
      ],
      note: 'İdeal kare dalga varsayılmıştır: düşük seviye 0 V, yükselme ve düşme süreleri sıfır. Sayaç değeri, görev döngüsünün 0 ile en büyük değer arasına orantılanıp en yakın tam sayıya yuvarlanmasıyla bulunur.',
    };
  },
  cases: [
    { in: { frekans: '1000', gorev: '25', gerilim: '5', bit: '8' }, out: { 'Açık (yüksek) süre': '250 µs', 'Kapalı (düşük) süre': '750 µs', 'Periyot': '1 ms', 'Ortalama gerilim': '1,25 V', 'Etkin (RMS) gerilim': '2,5 V', 'Sayaç karşılaştırma değeri': '64 / 255', 'Gerçekleşen görev döngüsü': '%25,1' } },
    { in: { frekans: '50', gorev: '7,5', gerilim: '5', bit: '8' }, out: { 'Açık (yüksek) süre': '1,5 ms', 'Kapalı (düşük) süre': '18,5 ms', 'Periyot': '20 ms', 'Ortalama gerilim': '0,375 V' } },
    { in: { frekans: '20000', gorev: '80', gerilim: '12', bit: '10' }, out: { 'Açık (yüksek) süre': '40 µs', 'Kapalı (düşük) süre': '10 µs', 'Periyot': '50 µs', 'Ortalama gerilim': '9,6 V', 'Etkin (RMS) gerilim': '10,733 V', 'Sayaç karşılaştırma değeri': '818 / 1.023' } },
    { in: { frekans: '490', gorev: '50', gerilim: '5', bit: '8' }, out: { 'Periyot': '2,0408 ms', 'Ortalama gerilim': '2,5 V', 'Etkin (RMS) gerilim': '3,5355 V', 'Sayaç karşılaştırma değeri': '128 / 255' } },
    { in: { frekans: '0,5', gorev: '50', gerilim: '24', bit: '8' }, out: { 'Periyot': '2 s', 'Açık (yüksek) süre': '1 s', 'Ortalama gerilim': '12 V' } },
    { in: { frekans: '1000', gorev: '100', gerilim: '3,3', bit: '12' }, out: { 'Açık (yüksek) süre': '1 ms', 'Kapalı (düşük) süre': '0 ms', 'Ortalama gerilim': '3,3 V', 'Etkin (RMS) gerilim': '3,3 V', 'Sayaç karşılaştırma değeri': '4.095 / 4.095' } },
    { in: { frekans: '1000', gorev: '0', gerilim: '5', bit: '8' }, out: { 'Açık (yüksek) süre': '0 ms', 'Ortalama gerilim': '0 V', 'Sayaç karşılaştırma değeri': '0 / 255' } },
    { in: { frekans: '1000', gorev: '120', gerilim: '5', bit: '8' }, error: true },
    { in: { frekans: '0', gorev: '50', gerilim: '5', bit: '8' }, error: true },
    { in: { frekans: '1000', gorev: '50', gerilim: '5', bit: '8,5' }, error: true },
  ],
  howto: [
    'PWM sinyalinin frekansını hertz olarak yazın. Kilohertz cinsinden biliyorsanız 1000 ile çarpın: 20 kHz için 20000.',
    'Görev döngüsünü yüzde olarak girin; sinyalin bir periyodun yüzde kaçında yüksek seviyede kaldığını ifade eder.',
    'Sinyalin yüksek seviyedeki gerilimini "Tepe gerilimi" alanına yazın (örneğin 5, 3,3 ya da motor sürücülerinde 12 ve 24).',
    'Mikrodenetleyicide yazacağınız sayıyı da görmek için PWM çözünürlüğünü bit olarak belirtin; 8 bit 0–255, 10 bit 0–1023 aralığı demektir.',
    '"Hesapla" düğmesine basın ve süreleri, gerilimleri ve sayaç değerini sonuç kutusundan okuyun.',
  ],
  sections: [
    { h: 'PWM ve görev döngüsü nedir?', p: [
      'Darbe genişlik modülasyonu (PWM), bir çıkışı çok hızlı biçimde açıp kapatarak yüke aktarılan ortalama gücü ayarlama yöntemidir. Çıkış yalnızca iki durumda bulunur: tam açık ya da tam kapalı. Aradaki "kısık" durumlar, açık kalma süresinin toplam süreye oranı değiştirilerek elde edilir. Bu orana <strong>görev döngüsü</strong> (İngilizce duty cycle) denir ve yüzde olarak ifade edilir.',
      'Yöntemin yaygınlığının nedeni verimliliğidir. Bir transistör tam iletimdeyken üzerinde çok az gerilim düşer, tam kesimdeyken üzerinden akım geçmez; iki durumda da ısıya dönüşen güç küçüktür. LED parlaklığı ayarı, doğru akım motorlarında hız denetimi, fan sürme, ısıtıcı kontrolü, anahtarlamalı güç kaynakları ve servo motor konumlama bu ilkeyle çalışır.',
    ] },
    { h: 'Formüller', ul: [
      '<strong>Periyot:</strong> T = 1 ÷ f',
      '<strong>Açık süre:</strong> t<sub>açık</sub> = T × D ÷ 100',
      '<strong>Kapalı süre:</strong> t<sub>kapalı</sub> = T − t<sub>açık</sub>',
      '<strong>Ortalama gerilim:</strong> V<sub>ort</sub> = V<sub>tepe</sub> × D ÷ 100',
      '<strong>Etkin (RMS) gerilim:</strong> V<sub>rms</sub> = V<sub>tepe</sub> × √(D ÷ 100)',
      '<strong>Sayaç değeri:</strong> (2<sup>n</sup> − 1) × D ÷ 100, en yakın tam sayıya yuvarlanır',
    ], p: [
      'Buradaki D, yüzde cinsinden görev döngüsüdür. Görev döngüsünü süreden bulmak isterseniz bağıntıyı tersine çevirin: D = t<sub>açık</sub> ÷ T × 100.',
    ] },
    { h: 'Çözümlü örnek: 1 kHz, yüzde 25, 5 V', ol: [
      'Periyot: 1 ÷ 1000 = 0,001 s = 1 ms',
      'Açık süre: 1 ms × 0,25 = 0,25 ms = 250 µs',
      'Kapalı süre: 1 ms − 0,25 ms = 0,75 ms = 750 µs',
      'Ortalama gerilim: 5 V × 0,25 = 1,25 V',
      'Etkin gerilim: 5 V × √0,25 = 5 × 0,5 = 2,5 V',
      '8 bit sayaç değeri: 255 × 0,25 = 63,75; yuvarlanınca 64. Gerçekleşen görev döngüsü 64 ÷ 255 = yüzde 25,1 olur.',
    ] },
    { h: 'Ortalama gerilim ile RMS gerilim farkı', p: [
      'İki değer farklı sorulara yanıt verir. <strong>Ortalama gerilim</strong>, sinyal bir alçak geçiren filtreden geçirildiğinde ya da bir voltmetrenin doğru akım kademesinde okunan değerdir; motorun ortalama hızını ve filtrelenmiş analog çıkışı bu belirler.',
      '<strong>Etkin (RMS) gerilim</strong> ise dirençli bir yükte ortaya çıkan ısıyla ilgilidir. Bir dirençte harcanan güç gerilimin karesiyle orantılı olduğundan ortalama güç, tam güçle görev döngüsünün çarpımına eşittir. Yüzde 25 görev döngüsünde bir ısıtıcı tam gücünün dörtte birini verir; ortalama gerilimin karesinden hesap yapılsaydı on altıda biri bulunurdu ki bu yanlıştır. Araçtaki "dirençli yükte güç oranı" satırı bu yüzden doğrudan görev döngüsüne eşittir.',
    ] },
    { h: 'Frekans seçimi', p: [
      'Görev döngüsü ortalamayı, frekans ise bu ortalamanın ne kadar "pürüzsüz" algılandığını belirler. Uygun frekans yüke bağlıdır:',
    ], ul: [
      '<strong>LED parlaklık ayarı:</strong> gözün titreşimi fark etmemesi için birkaç yüz hertz ve üzeri kullanılır; kamera çekimlerinde bant oluşmaması için daha yüksek frekanslar tercih edilir.',
      '<strong>Doğru akım motorları:</strong> duyulabilir aralıktaki frekanslar motorda vınlama sesi yapar; ses istenmiyorsa yaklaşık 20 kHz ve üzeri seçilir.',
      '<strong>Hobi servo motorları:</strong> genellikle 50 Hz, yani 20 ms periyot kullanılır ve konum, yaklaşık 1–2 ms arasındaki darbe genişliğiyle belirlenir. 1,5 ms\'lik darbe yüzde 7,5 görev döngüsüne karşılık gelir.',
      '<strong>Isıtıcı ve röle gibi yavaş yükler:</strong> birkaç hertz, hatta saniyeler mertebesinde periyotlar yeterlidir.',
    ] },
    { h: 'Çözünürlük ve sayaç değeri', p: [
      'Mikrodenetleyiciler görev döngüsünü yüzde olarak değil, bir sayaç karşılaştırma değeri olarak alır. 8 bitlik PWM\'de bu değer 0 ile 255, 10 bitte 0 ile 1023, 12 bitte 0 ile 4095 arasındadır. İstenen yüzde her zaman tam bir sayıya denk gelmez; bu yüzden gerçekleşen görev döngüsü istenenden biraz sapar. 8 bitte adımlar yaklaşık yüzde 0,39 büyüklüğündedir; 10 bitte yaklaşık yüzde 0,1\'e iner.',
      'Zamanlayıcı frekansı sabitken çözünürlük ile PWM frekansı arasında bir denge vardır: bir biti artırmak sayacın bir turda sayması gereken adımı ikiye katlar ve ulaşılabilen en yüksek PWM frekansını yarıya indirir. Bazı platformlarda en büyük değer 2<sup>n</sup> − 1 yerine farklı bir üst sınır olabilir; kendi kartınızın belgelerine bakın.',
    ] },
    { h: 'Varsayımlar ve uyarılar', p: [
      'Hesap ideal bir kare dalgaya göre yapılır. Gerçek devrede anahtarlama elemanının yükselme ve düşme süreleri, üzerindeki gerilim düşümü ve yükün endüktansı sonuçları değiştirir. Motor ve bobin gibi endüktif yüklerde akım, gerilimin aksine keskin biçimde açılıp kapanmaz; bu yüklerde ters paralel bir diyot kullanılmazsa anahtarlama anındaki gerilim sıçraması transistöre zarar verir.',
      'Sonuçlar bilgilendirme amaçlıdır. Şebeke gerilimiyle ya da yüksek akımla çalışan sürücü devrelerinde tasarımı yetkin bir kişiye doğrulatın.',
    ] },
  ],
  faq: [
    ['Yüzde 50 görev döngüsü ne demek?', 'Sinyal her periyodun yarısında açık, yarısında kapalıdır. Ortalama gerilim tepe gerilimin yarısı olur; 5 V bir sinyalde 2,5 V. Dirençli bir yük tam gücünün yarısını alır.'],
    ['PWM ile gerçekten analog gerilim üretilir mi?', 'Çıkış aslında hâlâ kare dalgadır. Bir direnç ve kondansatörden oluşan alçak geçiren filtre eklenirse dalgalanması azaltılmış, ortalama değere yakın bir gerilim elde edilir. Filtrenin kesim frekansı PWM frekansının epeyce altında seçilmelidir.'],
    ['8 bit PWM\'de yüzde 25 için hangi değeri yazmalıyım?', '255 × 0,25 = 63,75 olduğundan en yakın tam sayı 64\'tür. Bu değer yaklaşık yüzde 25,1 görev döngüsü verir.'],
    ['Frekansı değiştirmek parlaklığı ya da hızı etkiler mi?', 'İdeal durumda hayır; ortalama değeri yalnızca görev döngüsü belirler. Frekans titreşimi, sesi ve anahtarlama kayıplarını etkiler. Çok yüksek frekanslarda sürücünün geçiş süreleri belirginleşir ve gerçekleşen oran sapabilir.'],
    ['Servo motor için görev döngüsünü nasıl hesaplarım?', 'Darbe genişliğini periyoda bölüp 100 ile çarpın. 50 Hz\'de periyot 20 ms\'dir; 1 ms darbe yüzde 5, 1,5 ms darbe yüzde 7,5, 2 ms darbe yüzde 10 eder.'],
    ['Multimetre PWM çıkışında neden farklı bir değer gösteriyor?', 'Doğru akım kademesindeki multimetreler ortalama gerilimi gösterir. Yük bağlıyken gerilim düşümü, ölçü aletinin örnekleme hızı ve düşük seviyenin tam 0 V olmaması okumayı hesaplanan değerden saptırabilir.'],
    ['Görev döngüsü yüzde 0 ya da 100 olabilir mi?', 'Evet. Yüzde 0 çıkışın sürekli kapalı, yüzde 100 sürekli açık olduğu durumdur; bu uçlarda anahtarlama yapılmaz ve sinyal doğru akıma dönüşür.'],
    ['Yazdığım değerler bir yere kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; girdiğiniz değerler sunucuya gönderilmez.'],
  ],
  related: ['adc-cozunurluk-hesapla', 'rc-filtre-kesim-frekansi-hesapla', '555-zamanlayici-hesapla', 'led-direnc-hesapla', 'motor-guc-tork-hesapla'],
};
