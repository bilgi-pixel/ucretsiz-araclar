export default {
  slug: 'manyetik-kuvvet-hesapla',
  title: 'Manyetik Kuvvet Hesaplama',
  h1Tail: 'F = qvB ve F = BIL',
  pageTitle: 'Manyetik Kuvvet Hesaplama – Yüke ve Akım Taşıyan Tele Etki Eden Kuvvet',
  description: 'Manyetik alanda hareket eden yüke (F = qvB·sinθ) ve akım taşıyan tele (F = BIL·sinθ) etki eden kuvveti hesaplayın; yörünge yarıçapını da görün.',
  card: 'Manyetik alandaki yüke ya da akım taşıyan tele etki eden kuvveti açıyla birlikte hesaplayın.',
  category: 'bilim',
  keywords: ['manyetik kuvvet hesaplama', 'F = qvB', 'F = BIL', 'Lorentz kuvveti', 'akım taşıyan tele etki eden kuvvet', 'manyetik alanda yük', 'manyetik kuvvet formülü', 'tesla hesaplama'],
  lead: 'Düzgün bir manyetik alanda hareket eden yüklü parçacığa ya da akım taşıyan düz tele etki eden manyetik kuvvetin büyüklüğünü hesaplayın. Araç <strong>F = |q|·v·B·sin θ</strong> ve <strong>F = B·I·L·sin θ</strong> bağıntılarını kullanır; açıyı derece olarak alır.',
  button: 'Hesapla',
  inputs: [
    { id: 'tur', label: 'Hesap türü', type: 'select', options: [['yuk', 'Hareketli yük (F = qvB·sin θ)'], ['tel', 'Akım taşıyan tel (F = BIL·sin θ)']] },
    { id: 'alan', label: 'Manyetik alan B (tesla)', type: 'number', placeholder: 'Örn. 0,5' },
    { id: 'buyukluk', label: 'Yük q (coulomb) ya da akım I (amper)', type: 'number', placeholder: 'Örn. 1,6e-19 ya da 5', hint: 'Yük hesabında q, tel hesabında I yazın. Bilimsel gösterim için 1,6e-19 biçimini kullanabilirsiniz.' },
    { id: 'ikinci', label: 'Hız v (m/s) ya da tel uzunluğu L (m)', type: 'number', placeholder: 'Örn. 2e6 ya da 0,2', hint: 'Yük hesabında hız, tel hesabında alan içindeki tel uzunluğu.' },
    { id: 'aci', label: 'Alanla yapılan açı θ (derece)', type: 'number', value: '90', hint: 'Hız ya da akım yönü ile manyetik alan arasındaki açı; 0–180 arası.' },
    { id: 'kutle', label: 'Parçacık kütlesi (kg, isteğe bağlı)', type: 'number', placeholder: 'Örn. 1,67e-27', hint: 'Yalnızca yük hesabında; doldurursanız dairesel yörünge yarıçapı da hesaplanır.' },
  ],
  compute(v, h) {
    const B = h.nonneg(v.alan, 'Manyetik alan');
    const aci = h.num(v.aci, 'Açı');
    if (aci < 0 || aci > 180) h.err('Açı 0 ile 180 derece arasında olmalı. İki yön arasındaki küçük açıyı yazın.');
    let s = Math.sin(aci * Math.PI / 180);
    if (Math.abs(s) < 1e-12) s = 0;
    if (Math.abs(s - 1) < 1e-12) s = 1;
    const rows = [];
    if (v.tur === 'tel') {
      const I = h.nonneg(v.buyukluk, 'Akım');
      const L = h.nonneg(v.ikinci, 'Tel uzunluğu');
      const Fmax = B * I * L;
      const F = Fmax * s;
      rows.push(['Manyetik kuvvet', h.sig(F) + ' N']);
      rows.push(['Kullanılan formül', 'F = B·I·L·sin θ']);
      rows.push(['sin θ', h.fmt(s, 4)]);
      rows.push(['En büyük kuvvet (θ = 90°)', h.sig(Fmax) + ' N']);
      if (L > 0) rows.push(['Birim uzunluk başına kuvvet', h.sig(F / L) + ' N/m']);
    } else {
      const q = Math.abs(h.num(v.buyukluk, 'Yük'));
      const hiz = h.nonneg(v.ikinci, 'Hız');
      if (hiz >= 299792458) h.err('Hız ışık hızından (yaklaşık 3 × 10^8 m/s) küçük olmalı.');
      const Fmax = q * hiz * B;
      const F = Fmax * s;
      rows.push(['Manyetik kuvvet', h.sig(F) + ' N']);
      rows.push(['Kullanılan formül', 'F = |q|·v·B·sin θ']);
      rows.push(['sin θ', h.fmt(s, 4)]);
      rows.push(['En büyük kuvvet (θ = 90°)', h.sig(Fmax) + ' N']);
      if (String(v.kutle ?? '').trim() !== '') {
        const m = h.pos(v.kutle, 'Parçacık kütlesi');
        if (F > 0) {
          const r = m * hiz * s / (q * B);
          rows.push(['Dairesel yörünge yarıçapı', h.sig(r) + ' m']);
          rows.push(['Dolanma periyodu', h.sig(2 * Math.PI * m / (q * B)) + ' s']);
        } else {
          rows.push(['Dairesel yörünge yarıçapı', 'Kuvvet sıfır; parçacık sapmaz']);
        }
      }
    }
    return {
      rows,
      note: 'Sonuç kuvvetin büyüklüğüdür. Yön, sağ el kuralıyla bulunur; negatif yükte yön terstir. Alanın düzgün olduğu varsayılır.',
    };
  },
  cases: [
    { in: { tur: 'yuk', alan: '0,5', buyukluk: '1,6e-19', ikinci: '2e6', aci: '90' }, out: { 'Manyetik kuvvet': '1,6 × 10^-13 N', 'sin θ': '1' } },
    { in: { tur: 'tel', alan: '0,3', buyukluk: '5', ikinci: '0,2', aci: '90' }, out: { 'Manyetik kuvvet': '0,3 N', 'Birim uzunluk başına kuvvet': '1,5 N/m' } },
    { in: { tur: 'tel', alan: '0,5', buyukluk: '10', ikinci: '2', aci: '30' }, out: { 'Manyetik kuvvet': '5 N', 'sin θ': '0,5', 'En büyük kuvvet (θ = 90°)': '10 N' } },
    { in: { tur: 'yuk', alan: '0,1', buyukluk: '2e-6', ikinci: '300', aci: '90' }, out: { 'Manyetik kuvvet': '0,00006 N' } },
    { in: { tur: 'tel', alan: '0,4', buyukluk: '3', ikinci: '1', aci: '0' }, out: { 'Manyetik kuvvet': '0 N', 'En büyük kuvvet (θ = 90°)': '1,2 N' } },
    { in: { tur: 'tel', alan: '0,4', buyukluk: '3', ikinci: '1', aci: '180' }, out: { 'Manyetik kuvvet': '0 N' } },
    { in: { tur: 'yuk', alan: '0,1', buyukluk: '1,6e-19', ikinci: '1e6', aci: '90', kutle: '1,67e-27' }, out: { 'Manyetik kuvvet': '1,6 × 10^-14 N', 'Dairesel yörünge yarıçapı': '0,104375 m' } },
    { in: { tur: 'yuk', alan: '0,2', buyukluk: '-3e-6', ikinci: '1000', aci: '90' }, out: { 'Manyetik kuvvet': '0,0006 N' } },
    { in: { tur: 'tel', alan: '0,3', buyukluk: '5', ikinci: '0,2', aci: '200' }, error: true },
    { in: { tur: 'yuk', alan: '-1', buyukluk: '1e-6', ikinci: '10', aci: '90' }, error: true },
    { in: { tur: 'tel', alan: '0,3', buyukluk: '', ikinci: '0,2', aci: '90' }, error: true },
  ],
  howto: [
    '"Hesap türü" listesinden manyetik alanda hareket eden bir yük mü, yoksa akım taşıyan bir tel mi hesaplayacağınızı seçin.',
    'Manyetik alanın büyüklüğünü tesla cinsinden yazın. Değer militesla ise bine bölün; örneğin 50 mT için 0,05 girin.',
    'Yük hesabında yükü coulomb ve hızı m/s olarak, tel hesabında akımı amper ve alan içinde kalan tel uzunluğunu metre olarak girin.',
    'Hız ya da akım yönünün manyetik alan çizgileriyle yaptığı açıyı derece olarak yazın. Yönler birbirine dikse 90 değerini değiştirmeyin.',
    'İsterseniz parçacığın kütlesini ekleyip "Hesapla" düğmesine basın; kuvvetle birlikte dairesel yörünge yarıçapı ve dolanma periyodu da gösterilir.',
  ],
  sections: [
    { h: 'Manyetik kuvvet nedir?', p: [
      'Manyetik alan, duran bir yüke kuvvet uygulamaz; kuvvet yalnızca yük hareket ettiğinde ve hareket yönü alan çizgilerine paralel olmadığında ortaya çıkar. Bu kuvvete Lorentz kuvvetinin manyetik bileşeni denir. Kuvvetin en ilginç özelliği yönüdür: hem hız vektörüne hem de manyetik alana diktir. Bu yüzden manyetik kuvvet parçacığın süratini değiştirmez, yalnızca yönünü büker ve üzerinde iş yapmaz.',
      'Bir tel içindeki akım, aynı yönde sürüklenen çok sayıda yükten oluştuğu için akım taşıyan tel de manyetik alanda kuvvet hisseder. Elektrik motorlarının dönmesi, hoparlör bobininin ileri geri hareketi ve analog ölçü aletlerindeki ibrenin sapması bu kuvvetin gündelik uygulamalarıdır.',
    ] },
    { h: 'Formüller ve birimler', p: [
      'Hareketli yük için kuvvetin büyüklüğü <strong>F = |q|·v·B·sin θ</strong> bağıntısıyla bulunur. Burada q yük (coulomb), v hız (m/s), B manyetik alan (tesla) ve θ hız ile alan arasındaki açıdır. Akım taşıyan düz bir tel için bağıntı <strong>F = B·I·L·sin θ</strong> biçimini alır; I akım (amper), L telin alan içindeki uzunluğudur (metre).',
      'Her iki formülde de sonuç newton çıkar. Bir tesla, bir amper akım taşıyan bir metrelik tele dik konumda bir newton kuvvet uygulayan alan şiddetidir; yani 1 T = 1 N/(A·m). Açı 90° olduğunda sinüs 1 değerini alır ve kuvvet en büyük olur. Açı 0° ya da 180° ise, yani hareket alana paralelse kuvvet sıfırdır.',
    ] },
    { h: 'Çözümlü örnek: akım taşıyan tel', p: [
      '0,3 T büyüklüğündeki düzgün bir manyetik alana dik yerleştirilmiş 20 cm uzunluğunda bir telden 5 A akım geçsin. Uzunluğu metreye çevirince L = 0,2 m olur. F = B·I·L·sin 90° = 0,3 × 5 × 0,2 × 1 = <strong>0,3 N</strong> bulunur. Telin her metresine düşen kuvvet 1,5 N/m\'dir.',
      'Aynı tür bir soruda tel alanla 30° açı yapıyorsa sinüs 0,5 olur. Örneğin B = 0,5 T, I = 10 A ve L = 2 m için en büyük kuvvet 10 N iken 30°\'lik açıda kuvvet 10 × 0,5 = <strong>5 N</strong> değerine düşer. Araçta bu değerleri girip açıyı 30 yaptığınızda aynı sonucu görürsünüz.',
    ] },
    { h: 'Çözümlü örnek: manyetik alanda proton', p: [
      'Yükü 1,6 × 10<sup>-19</sup> C olan bir proton, 0,1 T büyüklüğündeki alana dik olarak 1 × 10<sup>6</sup> m/s hızla girsin. Kuvvet F = 1,6 × 10<sup>-19</sup> × 10<sup>6</sup> × 0,1 = <strong>1,6 × 10<sup>-14</sup> N</strong> olur. Bu kuvvet sürekli hıza dik kaldığı için merkezcil kuvvet görevi yapar ve proton çembersel bir yörüngeye girer.',
      'Yörünge yarıçapı, manyetik kuvvetin merkezcil kuvvete eşitlenmesiyle bulunur: q·v·B = m·v²/r, buradan <strong>r = m·v/(q·B)</strong>. Protonun kütlesi 1,67 × 10<sup>-27</sup> kg alınırsa r = (1,67 × 10<sup>-27</sup> × 10<sup>6</sup>)/(1,6 × 10<sup>-19</sup> × 0,1) ≈ 0,104 m, yani yaklaşık 10,4 cm çıkar. Kütle alanını doldurduğunuzda araç bu yarıçapı ve bir turun süresini de verir. Periyodun hıza bağlı olmaması, siklotron adı verilen hızlandırıcıların çalışma ilkesidir.',
    ] },
    { h: 'Kuvvetin yönü: sağ el kuralı', p: [
      'Bu araç kuvvetin büyüklüğünü verir; yön için sağ el kuralı kullanılır. Sağ elinizin dört parmağını pozitif yükün hız yönünde (ya da akım yönünde) uzatın ve parmaklarınızı manyetik alan yönüne doğru kıvırın; açık duran başparmağınız kuvvetin yönünü gösterir. Negatif yüklü bir parçacık, örneğin elektron için kuvvet bunun tam tersi yöndedir. Okul kitaplarında aynı kural bazen avuç içi kuvveti, başparmak akımı gösterecek biçimde anlatılır; ikisi de aynı sonucu verir.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Santimetre verilen tel uzunluğunu metreye çevirmeden kullanmak; 20 cm için 0,2 yazılmalıdır.',
      'Militesla, mikrotesla ya da gauss cinsinden verilen alanı teslaya çevirmemek. 1 T = 1000 mT = 10.000 gauss\'tur.',
      'Açıyı tel ile alan arasında değil, tel ile alana dik doğrultu arasında almak. Formüldeki θ her zaman alan çizgileriyle yapılan açıdır.',
      'Telin tamamını değil, yalnızca manyetik alanın içinde kalan kısmını L olarak almak gerektiğini unutmak.',
      'Kuvvetin yükün süratini artırdığını düşünmek. Manyetik kuvvet hıza dik olduğundan kinetik enerjiyi değiştirmez.',
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      'Hesap, alanın tel boyunca ya da parçacığın bulunduğu bölgede düzgün (her noktada aynı büyüklük ve yönde) olduğunu varsayar. Telin düz olduğu kabul edilir; kıvrımlı tellerde her parçanın kuvveti ayrı hesaplanıp vektörel olarak toplanmalıdır. Yörünge yarıçapı klasik bağıntıyla bulunur; ışık hızına yaklaşan parçacıklarda göreli kütle artışı nedeniyle gerçek yarıçap daha büyük olur. Elektrik alanın da bulunduğu durumlarda toplam Lorentz kuvveti için elektriksel kuvvet ayrıca eklenmelidir. Sonuçlar ders ve ön hesap amaçlıdır; motor, röle gibi gerçek tasarımlarda üretici verileri ve mühendislik hesabı esas alınmalıdır.',
    ] },
  ],
  faq: [
    ['Manyetik kuvvet formülü nedir?', 'Hareketli bir yük için F = |q|·v·B·sin θ, akım taşıyan düz bir tel için F = B·I·L·sin θ kullanılır. θ, hız ya da akım yönünün manyetik alanla yaptığı açıdır ve sonuç newton cinsindendir.'],
    ['Manyetik alana paralel hareket eden yüke kuvvet etki eder mi?', 'Hayır. Açı 0° ya da 180° olduğunda sin θ sıfırdır ve manyetik kuvvet oluşmaz. Parçacık yönünü ve süratini değiştirmeden yoluna devam eder.'],
    ['Duran bir yüke manyetik kuvvet etki eder mi?', 'Etki etmez. Formülde hız çarpan olarak bulunduğundan v = 0 için kuvvet sıfırdır. Duran yüke yalnızca elektrik alan kuvvet uygulayabilir.'],
    ['Tesla ile gauss arasındaki ilişki nedir?', '1 tesla 10.000 gauss eder. Dünya\'nın manyetik alanı yaklaşık 25–65 mikrotesla aralığındadır; küçük bir buzdolabı mıknatısının yüzeyinde ise birkaç militesla ölçülür. Araca değeri tesla olarak girmeniz gerekir.'],
    ['Yükün işareti sonucu değiştirir mi?', 'Büyüklüğü değiştirmez; bu yüzden araç yükün mutlak değerini kullanır. Değişen yalnızca yöndür: negatif yüke etki eden kuvvet, aynı hızla hareket eden pozitif yüke etki eden kuvvetin tersi yöndedir.'],
    ['Manyetik alanda parçacık neden çember çizer?', 'Kuvvet her an hıza dik olduğu için parçacığın sürati sabit kalır, yalnızca yönü döner. Sabit büyüklükte ve hep hıza dik bir kuvvet düzgün çembersel hareket oluşturur; yarıçap r = m·v/(q·B) ile bulunur.'],
    ['Açı 90° değilse parçacığın yörüngesi nasıl olur?', 'Hızın alana dik bileşeni çembersel hareketi, paralel bileşeni ise alan boyunca sabit hızlı ilerlemeyi sağlar. İkisinin birleşimi sarmal (helis) biçiminde bir yoldur. Araç bu durumda yarıçapı dik bileşene göre hesaplar.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Hesaplama yalnızca tarayıcınızda yapılır; yazdığınız değerler hiçbir sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['coulomb-kuvveti-hesapla', 'elektrik-alan-hesapla', 'merkezcil-kuvvet-hesapla', 'kuvvet-hesapla', 'bilimsel-gosterim-cevir'],
};
