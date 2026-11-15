export default {
  slug: 'adc-cozunurluk-hesapla',
  title: 'ADC Çözünürlük ve Adım Gerilimi Hesaplama',
  h1Tail: 'LSB, seviye sayısı ve sayısal kod',
  pageTitle: 'ADC Çözünürlük Hesaplama – Adım Gerilimi (LSB) ve Sayısal Kod',
  description: 'ADC bit sayısı ve referans geriliminden seviye sayısını, adım gerilimini (LSB), ideal SNR değerini ve verdiğiniz giriş geriliminin sayısal kodunu hesaplayın.',
  card: 'ADC bit sayısı ve referans geriliminden adım gerilimini (LSB), seviye sayısını ve bir gerilimin sayısal kodunu bulun.',
  category: 'elektrik',
  keywords: ['adc çözünürlük hesaplama', 'adc adım gerilimi', 'lsb hesaplama', '10 bit adc kaç volt', '12 bit adc çözünürlük', 'analog dijital çevirici hesaplama', 'adc değeri gerilime çevirme'],
  lead: 'Analog-sayısal çeviricinin (ADC) bit sayısını ve referans gerilimini yazın. Araç <strong>seviye sayısını ve bir adımın kaç volta karşılık geldiğini</strong> hesaplar; bir giriş gerilimi verirseniz üretilecek sayısal kodu ondalık, onaltılık ve ikilik olarak gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'bit', label: 'Çözünürlük (bit)', type: 'number', placeholder: 'Örn. 10', value: '10' },
    { id: 'vref', label: 'Referans gerilimi (V)', type: 'number', placeholder: 'Örn. 5', value: '5' },
    { id: 'vin', label: 'Giriş gerilimi (V, isteğe bağlı)', type: 'number', placeholder: 'Örn. 2,5', hint: 'Yazarsanız bu gerilimin sayısal kodu da hesaplanır.' },
  ],
  compute(v, h) {
    const n = h.posint(v.bit, 'Çözünürlük');
    if (n > 32) h.err('Çözünürlük en fazla 32 bit olabilir.');
    const vref = h.pos(v.vref, 'Referans gerilimi');
    const seviye = Math.pow(2, n);
    const lsb = vref / seviye;
    const gerYaz = (x) => (x >= 1 ? h.sig(x, 5) + ' V' : x >= 1e-4 ? h.sig(x * 1e3, 5) + ' mV' : h.sig(x * 1e6, 5) + ' µV');
    const rows = [
      ['Adım gerilimi (1 LSB)', gerYaz(lsb)],
      ['Seviye sayısı', h.fmt(seviye, 0)],
      ['En büyük sayısal kod', h.fmt(seviye - 1, 0)],
      ['Tam ölçeğe göre çözünürlük', '%' + h.sig(100 / seviye, 4)],
      ['İdeal sinyal-gürültü oranı', h.fmt(6.02 * n + 1.76, 2) + ' dB'],
    ];
    let note = 'Adım gerilimi Vref ÷ 2ⁿ olarak hesaplanır. Gerçek çeviricilerde gürültü, ofset ve doğrusallık hataları nedeniyle etkin çözünürlük bit sayısının altında kalır.';
    if (String(v.vin ?? '').trim() !== '') {
      const vin = h.nonneg(v.vin, 'Giriş gerilimi');
      let kod = Math.floor(vin / lsb + 1e-9);
      if (kod > seviye - 1) {
        kod = seviye - 1;
        if (vin > vref + 1e-12) note = 'Giriş gerilimi referansın üzerinde olduğu için kod en büyük değerde doyar. Referansı aşan gerilim çeviriciye zarar verebilir; girişe gerilim bölücü ekleyin.';
      }
      rows.push(['Sayısal kod (ondalık)', h.fmt(kod, 0)]);
      rows.push(['Sayısal kod (onaltılık)', '0x' + kod.toString(16).toUpperCase()]);
      rows.push(['Sayısal kod (ikilik)', kod.toString(2).padStart(n, '0')]);
      rows.push(['Kodun karşılık geldiği gerilim', h.sig(kod * lsb, 5) + ' V']);
    }
    return { rows, note };
  },
  cases: [
    { in: { bit: '10', vref: '5', vin: '2,5' }, out: { 'Adım gerilimi (1 LSB)': '4,8828 mV', 'Seviye sayısı': '1.024', 'En büyük sayısal kod': '1.023', 'İdeal sinyal-gürültü oranı': '61,96 dB', 'Sayısal kod (ondalık)': '512', 'Sayısal kod (onaltılık)': '0x200', 'Sayısal kod (ikilik)': '1000000000', 'Kodun karşılık geldiği gerilim': '2,5 V' } },
    { in: { bit: '12', vref: '3,3' }, out: { 'Adım gerilimi (1 LSB)': '0,80566 mV', 'Seviye sayısı': '4.096', 'En büyük sayısal kod': '4.095', 'İdeal sinyal-gürültü oranı': '74 dB' } },
    { in: { bit: '8', vref: '5' }, out: { 'Adım gerilimi (1 LSB)': '19,531 mV', 'Seviye sayısı': '256', 'Tam ölçeğe göre çözünürlük': '%0,3906', 'İdeal sinyal-gürültü oranı': '49,92 dB' } },
    { in: { bit: '16', vref: '5' }, out: { 'Adım gerilimi (1 LSB)': '76,294 µV', 'Seviye sayısı': '65.536', 'En büyük sayısal kod': '65.535' } },
    { in: { bit: '10', vref: '5', vin: '1' }, out: { 'Sayısal kod (ondalık)': '204', 'Sayısal kod (onaltılık)': '0xCC', 'Kodun karşılık geldiği gerilim': '0,99609 V' } },
    { in: { bit: '12', vref: '3,3', vin: '5' }, out: { 'Sayısal kod (ondalık)': '4.095', 'Sayısal kod (onaltılık)': '0xFFF' } },
    { in: { bit: '1', vref: '2', vin: '0' }, out: { 'Adım gerilimi (1 LSB)': '1 V', 'Seviye sayısı': '2', 'Sayısal kod (ikilik)': '0' } },
    { in: { bit: '0', vref: '5' }, error: true },
    { in: { bit: '10,5', vref: '5' }, error: true },
    { in: { bit: '10', vref: '5', vin: '-1' }, error: true },
  ],
  howto: [
    'Çeviricinin çözünürlüğünü bit olarak yazın. Mikrodenetleyicilerin dahili çeviricileri çoğunlukla 10 ya da 12 bittir; harici hassas çeviriciler 16 ve 24 bit olabilir.',
    'Referans gerilimini volt olarak girin. Bu, çeviricinin en büyük kodu ürettiği tam ölçek gerilimidir; çoğu kartta besleme gerilimi (5 V ya da 3,3 V) veya dahili bir referanstır.',
    'Belirli bir gerilimin hangi sayıya dönüşeceğini merak ediyorsanız "Giriş gerilimi" alanını doldurun.',
    '"Hesapla" düğmesine basın. Adım gerilimi ilk satırda, seviye sayısı ve diğer değerler altında listelenir.',
  ],
  sections: [
    { h: 'ADC çözünürlüğü ne anlama gelir?', p: [
      'Analog-sayısal çevirici, sürekli değişen bir gerilimi sonlu sayıda basamaktan birine yuvarlayarak sayıya dönüştürür. Basamak sayısını bit sayısı belirler: n bitlik bir çevirici <strong>2<sup>n</sup></strong> farklı kod üretebilir. 8 bit 256, 10 bit 1024, 12 bit 4096, 16 bit 65.536 seviye demektir. Her ek bit seviye sayısını ikiye katlar ve ölçümün inceliğini iki kat artırır.',
      'Çözünürlük ile doğruluk aynı şey değildir. Çözünürlük, çeviricinin ayırt edebildiği en küçük değişimi anlatır; doğruluk ise okunan değerin gerçeğe ne kadar yakın olduğunu. Referansı kararsız ya da gürültülü 16 bitlik bir sistem, iyi tasarlanmış 12 bitlik bir sistemden daha kötü sonuç verebilir.',
    ] },
    { h: 'Adım gerilimi (LSB) formülü', p: [
      'Bir adımın büyüklüğü, yani en düşük anlamlı bitin (LSB) gerilim karşılığı şu bağıntıyla bulunur: <strong>LSB = V<sub>ref</sub> ÷ 2<sup>n</sup></strong>. Giriş gerilimi bu kadar değişmeden sayısal kod değişmez; dolayısıyla LSB, ölçebileceğiniz en küçük gerilim farkıdır.',
      'Sayısal kod ise giriş geriliminin adım gerilimine bölünüp aşağı yuvarlanmasıyla elde edilir: <strong>kod = ⌊V<sub>in</sub> ÷ LSB⌋</strong>. En büyük kod 2<sup>n</sup> − 1 olduğundan giriş referansa eşit ya da ondan büyükse kod bu değerde kalır. Bazı kaynaklar adım gerilimini V<sub>ref</sub> ÷ (2<sup>n</sup> − 1) olarak verir; aradaki fark çok küçüktür, ancak çevirici veri sayfalarında benimsenen tanım 2<sup>n</sup>\'e bölmektir ve bu araç onu kullanır.',
    ] },
    { h: 'Çözümlü örnek: 10 bit, 5 V referans', ol: [
      'Seviye sayısı: 2<sup>10</sup> = 1024',
      'Adım gerilimi: 5 V ÷ 1024 = 0,0048828 V, yani yaklaşık 4,8828 mV',
      'En büyük kod: 1024 − 1 = 1023',
      'Girişe 2,5 V uygulanırsa: 2,5 ÷ 0,0048828 = 512; onaltılık 0x200, ikilik 1000000000',
      'Girişe 1 V uygulanırsa: 1 ÷ 0,0048828 = 204,8; aşağı yuvarlanarak 204 elde edilir. Bu kodun karşılığı 204 × 4,8828 mV = 0,99609 V\'tur; aradaki yaklaşık 3,9 mV\'luk fark nicemleme hatasıdır.',
    ], p: [
      'Aynı ölçümü 3,3 V referanslı 12 bitlik bir çeviriciyle yaparsanız adım 3,3 ÷ 4096 = 0,80566 mV\'a iner; yani ölçüm yaklaşık altı kat daha incelir.',
    ] },
    { h: 'Okunan kodu gerilime geri çevirmek', p: [
      'Yazılımda çoğu zaman tersine gidilir: çeviriciden okunan sayı gerilime çevrilir. Bunun için kodu adım gerilimiyle çarpmak yeterlidir: <strong>V = kod × V<sub>ref</sub> ÷ 2<sup>n</sup></strong>. 10 bit ve 5 V referansla okunan 512 değeri 512 × 5 ÷ 1024 = 2,5 V eder.',
      'Sensör bir gerilim bölücünün ya da yükseltecin ardındaysa bulduğunuz gerilimi o katın oranıyla düzeltmeyi unutmayın. Örneğin 12 V bir aküyü 4\'e bölen bir dirençli bölücüyle ölçüyorsanız hesaplanan gerilimi 4 ile çarparsınız; bu durumda akü tarafındaki çözünürlük de 4 kat kabalaşır.',
    ] },
    { h: 'Hızlı başvuru tablosu', ul: [
      '<strong>8 bit:</strong> 256 seviye; 5 V referansta 19,531 mV adım',
      '<strong>10 bit:</strong> 1024 seviye; 5 V referansta 4,8828 mV adım',
      '<strong>12 bit:</strong> 4096 seviye; 3,3 V referansta 0,80566 mV adım',
      '<strong>16 bit:</strong> 65.536 seviye; 5 V referansta 76,294 µV adım',
      '<strong>24 bit:</strong> 16.777.216 seviye; kuramsal adım mikrovoltun altındadır, ancak gürültü nedeniyle tamamı kullanılamaz',
    ] },
    { h: 'İdeal sinyal-gürültü oranı', p: [
      'Nicemleme, sinyale kaçınılmaz bir yuvarlama gürültüsü ekler. Tam ölçekli bir sinüs sinyali için ideal bir çeviricinin sinyal-gürültü oranı yaklaşık <strong>6,02 × n + 1,76 dB</strong> bağıntısıyla verilir. 10 bit için 61,96 dB, 12 bit için 74 dB, 16 bit için 98,08 dB bulunur. Veri sayfalarındaki "etkin bit sayısı" (ENOB) değeri bu formülün tersinden hesaplanır ve gerçek bir çeviricinin kaç bitlik ideal çevirici kadar iyi olduğunu gösterir.',
    ] },
    { h: 'Daha iyi ölçüm için ipuçları ve sınırlar', p: [
      'Çözünürlüğü artırmanın tek yolu daha çok bitli bir çevirici almak değildir. Ölçülecek sinyalin aralığı referansa göre küçükse referansı düşürmek adımı inceltir: 0–1 V arasındaki bir sensörü 5 V yerine 1,1 V dolayında bir referansla okumak aynı bit sayısıyla yaklaşık dört buçuk kat ince adım verir. Sinyali bir yükselteçle tam ölçeğe yaymak da aynı işi görür.',
      'Referans olarak besleme gerilimini kullanıyorsanız beslemedeki her dalgalanma ölçüme yansır; kararlı bir referans kaynağı ve girişte küçük bir filtre kondansatörü sonuçları belirgin biçimde iyileştirir. Art arda birkaç okumanın ortalamasını almak gürültüyü azaltır.',
      'Giriş gerilimi hiçbir zaman çeviricinin izin verilen sınırlarını aşmamalıdır. Bu araç ideal çevirici modeline göre hesap yapar ve bilgilendirme amaçlıdır; ofset, kazanç ve doğrusallık hataları için kullandığınız entegrenin veri sayfasına bakın.',
    ] },
  ],
  faq: [
    ['10 bit ADC kaç farklı değer okur?', '2 üzeri 10, yani 1024 farklı değer okur; kodlar 0 ile 1023 arasındadır. 5 V referansla her adım yaklaşık 4,88 mV\'a karşılık gelir.'],
    ['Okuduğum ADC değerini volta nasıl çeviririm?', 'Değeri referans gerilimiyle çarpıp 2 üzeri bit sayısına bölün. 12 bit ve 3,3 V referansta 2048 değeri 2048 × 3,3 ÷ 4096 = 1,65 V eder.'],
    ['1023\'e mi 1024\'e mi bölmeliyim?', 'Çevirici tanımına göre adım Vref ÷ 1024\'tür ve bu araç onu kullanır. 1023\'e bölmek en büyük kodu tam referans gerilimine eşitler; iki yöntem arasındaki fark binde bir düzeyindedir ve çoğu uygulamada önemsizdir.'],
    ['Daha yüksek bit her zaman daha doğru ölçüm mü demek?', 'Hayır. Bit sayısı yalnızca adımın inceliğini belirler. Referansın kararlılığı, devre gürültüsü ve çeviricinin kendi hataları doğruluğu sınırlar; bunlar iyileştirilmeden fazladan bitler gürültüyü ölçer.'],
    ['Referans gerilimini düşürürsem ne olur?', 'Adım gerilimi küçülür, yani küçük sinyaller daha ince ölçülür; ancak ölçülebilen en yüksek gerilim de referansla birlikte düşer. Referansın üzerindeki girişler en büyük kodda doyar.'],
    ['Nicemleme hatası ne kadardır?', 'İdeal bir çeviricide okunan değer ile gerçek gerilim arasındaki fark bir adımı geçmez. Aşağı yuvarlayan modelde hata 0 ile 1 LSB arasındadır; ortalama alınarak azaltılabilir.'],
    ['Negatif gerilimleri ölçebilir miyim?', 'Tek uçlu çeviriciler yalnızca 0 ile referans arasını ölçer. Negatif ya da iki yönlü sinyaller için sinyal bir ofsetle yukarı kaydırılır ya da diferansiyel girişli bir çevirici kullanılır.'],
    ['Girdiğim değerler bir sunucuya gidiyor mu?', 'Hayır. Hesaplar tarayıcınızda yapılır; yazdığınız değerler hiçbir yere gönderilmez ve saklanmaz.'],
  ],
  related: ['gerilim-bolucu-hesapla', 'pwm-gorev-dongusu-hesapla', 'opamp-kazanc-hesapla', 'rc-filtre-kesim-frekansi-hesapla', 'desibel-hesapla'],
};
