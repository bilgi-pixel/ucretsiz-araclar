export default {
  slug: 'ivme-hesapla',
  title: 'İvme Hesaplama',
  h1Tail: 'hız değişimi, süre ve yoldan',
  pageTitle: 'İvme Hesaplama – Hız Değişimi ve Süreden İvme Bulma (m/s²)',
  description: 'İlk hız, son hız ve süreden ya da alınan yoldan ortalama ivmeyi hesaplayın. Sonuç m/s² ve g olarak verilir; km/saat girişi, alınan yol ve süre de gösterilir.',
  card: 'İlk hız, son hız ve süreden ya da yoldan ivmeyi m/s² ve g olarak hesaplayın; km/saat girişi desteklenir.',
  category: 'bilim',
  keywords: ['ivme hesaplama', 'ivme formülü', 'hız değişimi ivme', '0-100 ivme hesaplama', 'ortalama ivme', 'm/s2 hesaplama', 'yavaşlama ivmesi hesaplama'],
  lead: 'Bir cismin ivmesini iki yoldan hesaplayın: hızın ne kadar sürede değiştiğini biliyorsanız <strong>a = (v − v₀) ÷ t</strong>, hızın hangi mesafede değiştiğini biliyorsanız <strong>a = (v² − v₀²) ÷ 2s</strong> bağıntısıyla.',
  button: 'Hesapla',
  inputs: [
    { id: 'yontem', label: 'Bilinen değerler', type: 'select', options: [['sure', 'İlk hız, son hız ve süre'], ['yol', 'İlk hız, son hız ve alınan yol']] },
    { id: 'ilkHiz', label: 'İlk hız (v₀)', type: 'number', placeholder: 'Örn. 0', value: '0' },
    { id: 'sonHiz', label: 'Son hız (v)', type: 'number', placeholder: 'Örn. 100' },
    { id: 'birim', label: 'Hız birimi', type: 'select', options: [['ms', 'm/s'], ['kmh', 'km/saat']] },
    { id: 'sure', label: 'Süre (saniye)', type: 'number', placeholder: 'Örn. 10', hint: 'Yalnızca "süre" yönteminde gerekir.' },
    { id: 'yol', label: 'Alınan yol (metre)', type: 'number', placeholder: 'Örn. 50', hint: 'Yalnızca "alınan yol" yönteminde gerekir.' },
  ],
  compute(v, h) {
    const carpan = v.birim === 'kmh' ? 1 / 3.6 : 1;
    const v0 = h.nonneg(v.ilkHiz, 'İlk hız (v₀)') * carpan;
    const v1 = h.nonneg(v.sonHiz, 'Son hız (v)') * carpan;
    let a, ek;
    if (v.yontem === 'yol') {
      const s = h.pos(v.yol, 'Alınan yol (metre)');
      if (v0 + v1 === 0) h.err('İlk ve son hızın ikisi de sıfırsa cisim yol alamaz; en az bir hızı sıfırdan büyük yazın.');
      a = (v1 * v1 - v0 * v0) / (2 * s);
      ek = ['Geçen süre', h.fmt((2 * s) / (v0 + v1), 2) + ' s'];
    } else {
      const t = h.pos(v.sure, 'Süre (saniye)');
      a = (v1 - v0) / t;
      ek = ['Alınan yol', h.fmt(((v0 + v1) / 2) * t, 2) + ' m'];
    }
    const durum = a > 1e-12 ? 'Hızlanma' : a < -1e-12 ? 'Yavaşlama' : 'Sabit hız';
    return {
      rows: [
        ['İvme', h.fmt(a, 4) + ' m/s²'],
        ['İvme (g)', h.fmt(a / 9.80665, 3) + ' g'],
        ['Hareket türü', durum],
        ['Hız değişimi', h.fmt(v1 - v0, 4) + ' m/s'],
        ek,
      ],
      note: 'Sonuç, ivmenin sabit olduğu varsayımıyla bulunan ortalama ivmedir. Negatif değer yavaşlamayı gösterir. 1 g = 9,80665 m/s² alınmıştır.',
    };
  },
  cases: [
    { in: { yontem: 'sure', ilkHiz: '0', sonHiz: '20', birim: 'ms', sure: '5' }, out: { 'İvme': '4 m/s²', 'Hareket türü': 'Hızlanma', 'Alınan yol': '50 m' } },
    { in: { yontem: 'sure', ilkHiz: '0', sonHiz: '100', birim: 'kmh', sure: '10' }, out: { 'İvme': '2,7778 m/s²', 'İvme (g)': '0,283 g', 'Hız değişimi': '27,7778 m/s', 'Alınan yol': '138,89 m' } },
    { in: { yontem: 'sure', ilkHiz: '30', sonHiz: '10', birim: 'ms', sure: '4' }, out: { 'İvme': '-5 m/s²', 'Hareket türü': 'Yavaşlama', 'Alınan yol': '80 m' } },
    { in: { yontem: 'yol', ilkHiz: '0', sonHiz: '20', birim: 'ms', yol: '50' }, out: { 'İvme': '4 m/s²', 'Geçen süre': '5 s' } },
    { in: { yontem: 'yol', ilkHiz: '72', sonHiz: '0', birim: 'kmh', yol: '40' }, out: { 'İvme': '-5 m/s²', 'Geçen süre': '4 s', 'Hareket türü': 'Yavaşlama' } },
    { in: { yontem: 'sure', ilkHiz: '36', sonHiz: '108', birim: 'kmh', sure: '8' }, out: { 'İvme': '2,5 m/s²', 'Alınan yol': '160 m' } },
    { in: { yontem: 'sure', ilkHiz: '10', sonHiz: '10', birim: 'ms', sure: '5' }, out: { 'İvme': '0 m/s²', 'Hareket türü': 'Sabit hız', 'Alınan yol': '50 m' } },
    { in: { yontem: 'sure', ilkHiz: '0', sonHiz: '20', birim: 'ms', sure: '0' }, error: true },
    { in: { yontem: 'yol', ilkHiz: '0', sonHiz: '0', birim: 'ms', yol: '10' }, error: true },
    { in: { yontem: 'sure', ilkHiz: '0', sonHiz: '', birim: 'ms', sure: '5' }, error: true },
  ],
  howto: [
    '"Bilinen değerler" listesinden elinizdeki veriye uygun yöntemi seçin: hızların yanında süreyi mi, yoksa alınan yolu mu biliyorsunuz?',
    'İlk hızı ve son hızı yazın, ardından "Hız birimi" listesinden m/s ya da km/saat seçin. Duruştan kalkış için ilk hız 0, tam duruş için son hız 0 olmalıdır.',
    'Seçtiğiniz yönteme göre süreyi saniye olarak ya da alınan yolu metre olarak girin; diğer alanı boş bırakabilirsiniz.',
    '"Hesapla" düğmesine basın. İvme m/s² ve g olarak, hareketin türü, hız değişimi ve yönteme göre alınan yol ya da geçen süre ile birlikte gösterilir.',
  ],
  sections: [
    { h: 'İvme nedir?', p: [
      'İvme, hızın birim zamanda ne kadar değiştiğini anlatan büyüklüktür. Hız "konum ne kadar çabuk değişiyor" sorusunu yanıtlarken ivme "hız ne kadar çabuk değişiyor" sorusunu yanıtlar. SI birimi metre bölü saniye karedir (m/s²): 3 m/s² ivme, cismin hızının her saniye 3 m/s arttığı anlamına gelir.',
      'İvme yalnızca hızlanmayı anlatmaz. Hız azalıyorsa ivme harekete ters yöndedir ve tek doğrultulu harekette negatif işaretle gösterilir; gündelik dilde buna yavaşlama ya da frenleme ivmesi denir. Hız hiç değişmiyorsa ivme sıfırdır. Araç, sonucun yanında hareketin türünü de "Hızlanma", "Yavaşlama" ya da "Sabit hız" olarak yazar.',
    ] },
    { h: 'Kullanılan formüller', p: [
      'Hızların yanında süre biliniyorsa ortalama ivme tanımı doğrudan uygulanır: <strong>a = (v − v₀) ÷ t</strong>. Burada v₀ ilk hız, v son hız, t ise bu değişimin gerçekleştiği süredir. İvme sabitse bu sürede alınan yol, ortalama hız ile sürenin çarpımıdır: <strong>s = (v₀ + v) ÷ 2 × t</strong>.',
      'Süre bilinmiyor ama hız değişiminin gerçekleştiği mesafe biliniyorsa, zamansız hız denklemi olarak bilinen v² = v₀² + 2·a·s bağıntısından ivme çekilir: <strong>a = (v² − v₀²) ÷ (2·s)</strong>. Bu durumda geçen süre de <strong>t = 2·s ÷ (v₀ + v)</strong> ile bulunur. Formüller hızın m/s olmasını ister; km/saat seçerseniz araç değeri 3,6\'ya bölerek kendisi çevirir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 (0–100 km/saat):</strong> Bir otomobil duruştan 100 km/saat hıza 10 saniyede çıkıyor. 100 km/saat = 27,7778 m/s olduğundan a = 27,7778 ÷ 10 = 2,7778 m/s², yani yaklaşık 0,283 g. Bu sürede araç (0 + 27,7778) ÷ 2 × 10 = 138,89 metre yol alır.',
      '<strong>Örnek 2 (yavaşlama):</strong> 30 m/s hızla giden bir tren 4 saniyede 10 m/s hıza düşüyor. a = (10 − 30) ÷ 4 = −5 m/s². Eksi işareti yavaşlamayı gösterir; bu sırada alınan yol (30 + 10) ÷ 2 × 4 = 80 metredir.',
      '<strong>Örnek 3 (fren mesafesinden):</strong> 72 km/saat hızla giden bir araç 40 metrede tamamen duruyor. 72 km/saat = 20 m/s; a = (0² − 20²) ÷ (2 × 40) = −400 ÷ 80 = −5 m/s². Duruş süresi 2 × 40 ÷ (20 + 0) = 4 saniyedir.',
      '<strong>Örnek 4 (ara hızlanma):</strong> Şehirler arası yolda 36 km/saatten 108 km/saate 8 saniyede çıkan bir araç için hızlar 10 m/s ve 30 m/s\'dir; a = (30 − 10) ÷ 8 = 2,5 m/s² ve alınan yol 160 metredir.',
    ] },
    { h: 'Sonucu yorumlamak: g karşılığı', p: [
      'İvmeyi sezgisel olarak değerlendirmenin yaygın yolu, onu yer çekimi ivmesiyle karşılaştırmaktır. Araç bu yüzden sonucu g cinsinden de verir; 1 g, standart yer çekimi ivmesi olan 9,80665 m/s²\'dir. Serbest bırakılan bir cisim, hava direnci ihmal edildiğinde yaklaşık 1 g ile hızlanır. Günlük sürüşte hissedilen hızlanma ve frenleme ivmeleri çoğunlukla bunun küçük bir kesridir; çok sert frenlemeler ise 1 g\'ye yaklaşabilir. Bu karşılaştırmalar kabaca fikir vermek içindir; gerçek değerler araca, yola ve koşullara göre değişir.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      '<strong>Birimleri karıştırmak:</strong> km/saat cinsinden hızı saniyeye bölmek m/s² vermez. Önce hızı 3,6\'ya bölerek m/s\'ye çevirin ya da araçta birimi km/saat seçin.',
      '<strong>İlk ve son hızın yerini değiştirmek:</strong> Formülde son hızdan ilk hız çıkarılır. Ters yazarsanız hızlanmayı yavaşlama gibi bulursunuz.',
      '<strong>Süreyi dakika olarak girmek:</strong> Süre saniye olmalıdır; 2 dakika için 120 yazın.',
      '<strong>Ortalama ivmeyi anlık ivme sanmak:</strong> Gerçek bir araç kalkışta daha kuvvetli, yüksek hızda daha zayıf hızlanır. Buradaki sonuç tüm aralığın ortalamasıdır.',
      '<strong>Yolu kilometre girmek:</strong> Alınan yol metre olmalıdır; 1,2 km için 1200 yazın.',
    ] },
    { h: 'Kullanım alanları', p: [
      'Lise fizik derslerinde düzgün hızlanan ve yavaşlayan doğrusal hareket problemlerinin ilk adımı ivmeyi bulmaktır; ardından kuvvet, yol ve süre hesapları gelir. Otomobil meraklıları 0–100 km/saat sürelerini ivmeye çevirerek araçları karşılaştırır. Sürücü eğitiminde ve trafik güvenliği anlatımlarında fren mesafesi ile yavaşlama ivmesi arasındaki ilişki bu bağıntılarla gösterilir. Koşucular ve bisikletçiler çıkış performanslarını, asansör ve konveyör tasarlayanlar ise yolcu konforu ve yük güvenliği için ivme sınırlarını aynı hesapla değerlendirir.',
      'İvmeyi bulduktan sonra cismin kütlesini biliyorsanız, gereken net kuvveti F = m·a bağıntısıyla hesaplayabilirsiniz; bunun için kuvvet hesaplama aracına geçmeniz yeterlidir.',
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      'Hesap, hareketin tek bir doğrultuda ve yön değiştirmeden gerçekleştiğini, ivmenin de aralık boyunca sabit kaldığını varsayar. Bu nedenle hızlar sıfır ya da pozitif girilir; işaret yalnızca ivmede ortaya çıkar. Virajdaki merkezcil ivme, eğik atış ya da ivmenin zamanla değiştiği hareketler bu aracın kapsamı dışındadır. Alınan yol yönteminde ilk ve son hızın ikisi birden sıfır olamaz, çünkü böyle bir cisim yol almaz. Süre ve yol sıfırdan büyük olmalıdır. Sonuçlar bilgilendirme amaçlıdır; kaza incelemesi, fren sistemi ya da makine tasarımı gibi işlerde ölçüme ve uzman değerlendirmesine dayanılmalıdır.',
    ] },
  ],
  faq: [
    ['İvme formülü nedir?', 'Ortalama ivme, hız değişiminin geçen süreye bölümüdür: a = (v − v₀) ÷ t. Hızlar m/s, süre saniye alındığında sonuç m/s² olur.'],
    ['İvmenin birimi nedir?', 'SI birimi metre bölü saniye karedir (m/s²). Ayrıca yer çekimi ivmesinin katı olarak g ile de ifade edilir; 1 g = 9,80665 m/s²\'dir.'],
    ['0–100 km/saat süresinden ivme nasıl bulunur?', '100 km/saati 3,6\'ya bölerek 27,78 m/s bulun, sonra süreye bölün. Örneğin 10 saniyede 100 km/saate çıkan araç için ortalama ivme yaklaşık 2,78 m/s²\'dir. Araçta birimi km/saat seçerseniz bu çevirme otomatik yapılır.'],
    ['Negatif ivme ne demektir?', 'Tek doğrultulu harekette negatif ivme, hızın azaldığını yani cismin yavaşladığını gösterir. Büyüklüğü, hızın saniyede ne kadar düştüğünü verir.'],
    ['Süreyi bilmiyorsam ivmeyi bulabilir miyim?', 'Evet. İlk hız, son hız ve bu aralıkta alınan yol biliniyorsa a = (v² − v₀²) ÷ (2·s) bağıntısı kullanılır. Araçta "İlk hız, son hız ve alınan yol" yöntemini seçin.'],
    ['Ortalama ivme ile anlık ivme arasındaki fark nedir?', 'Ortalama ivme belirli bir zaman aralığındaki toplam hız değişimini süreye böler. Anlık ivme ise tek bir andaki değişim hızıdır. İvme sabitse ikisi aynıdır; değişkense ortalama değer aralığın özetidir.'],
    ['İvme sıfırsa cisim duruyor mudur?', 'Hayır. İvmenin sıfır olması hızın değişmediğini gösterir. Cisim duruyor olabilir ya da sabit hızla hareket ediyor olabilir.'],
    ['Yazdığım değerler kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; girdiğiniz değerler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['kuvvet-hesapla', 'duzgun-hizlanan-hareket-hesapla', 'serbest-dusme-hesapla', 'g-kuvveti-ms2-cevir', 'hiz-hesapla', 'ms-kmh-cevir'],
};
