export default {
  slug: 'kuvvet-hesapla',
  title: 'Kuvvet Hesaplama (F = m·a)',
  h1Tail: 'Newton\'un ikinci yasası',
  pageTitle: 'Kuvvet Hesaplama – F = m·a ile Kuvvet, Kütle ve İvme Bulma',
  description: 'F = m·a formülüyle kuvveti, kütleyi ya da ivmeyi hesaplayın. İki değeri girin, üçüncüsü newton, kilogram ve m/s² olarak bulunsun; kgf karşılığı da gösterilir.',
  card: 'F = m·a formülüyle kuvvet, kütle ya da ivmeden bilinmeyeni bulun; newton ve kgf karşılığıyla.',
  category: 'bilim',
  keywords: ['kuvvet hesaplama', 'f=ma hesaplama', 'newton ikinci yasası', 'kuvvet formülü', 'kütle ivme kuvvet', 'net kuvvet hesaplama', 'newton hesaplama'],
  lead: 'Newton\'un ikinci hareket yasası olan <strong>F = m·a</strong> bağıntısıyla kuvveti, kütleyi ya da ivmeyi hesaplayın. Bildiğiniz iki değeri yazın; araç üçüncüsünü bulur.',
  button: 'Hesapla',
  inputs: [
    { id: 'bul', label: 'Hesaplanacak büyüklük', type: 'select', options: [['kuvvet', 'Kuvvet (F)'], ['kutle', 'Kütle (m)'], ['ivme', 'İvme (a)']] },
    { id: 'kuvvet', label: 'Kuvvet (N)', type: 'number', placeholder: 'Örn. 20', hint: 'Kuvveti hesaplatacaksanız boş bırakın.' },
    { id: 'kutle', label: 'Kütle (kg)', type: 'number', placeholder: 'Örn. 10', hint: 'Kütleyi hesaplatacaksanız boş bırakın.' },
    { id: 'ivme', label: 'İvme (m/s²)', type: 'number', placeholder: 'Örn. 2', hint: 'İvmeyi hesaplatacaksanız boş bırakın. Yavaşlama için negatif yazabilirsiniz.' },
  ],
  compute(v, h) {
    let F, m, a;
    if (v.bul === 'kutle') {
      F = h.num(v.kuvvet, 'Kuvvet (N)');
      a = h.num(v.ivme, 'İvme (m/s²)');
      if (a === 0) h.err('İvme sıfırken kütle hesaplanamaz; sıfırdan farklı bir ivme yazın.');
      m = F / a;
      if (!(m > 0)) h.err('Kuvvet ile ivme aynı yönde (aynı işaretli) ve sıfırdan farklı olmalı; aksi hâlde kütle pozitif çıkmaz.');
    } else if (v.bul === 'ivme') {
      F = h.num(v.kuvvet, 'Kuvvet (N)');
      m = h.pos(v.kutle, 'Kütle (kg)');
      a = F / m;
    } else {
      m = h.pos(v.kutle, 'Kütle (kg)');
      a = h.num(v.ivme, 'İvme (m/s²)');
      F = m * a;
    }
    const satirF = ['Kuvvet', h.fmt(F, 4) + ' N'];
    const satirM = ['Kütle', h.fmt(m, 4) + ' kg'];
    const satirA = ['İvme', h.fmt(a, 4) + ' m/s²'];
    const sirali = v.bul === 'kutle' ? [satirM, satirF, satirA] : v.bul === 'ivme' ? [satirA, satirF, satirM] : [satirF, satirM, satirA];
    return {
      rows: [
        ...sirali,
        ['Kuvvet (kgf)', h.fmt(F / 9.80665, 4) + ' kgf'],
        ['İvme (g)', h.fmt(a / 9.80665, 4) + ' g'],
      ],
      note: 'F = m·a bağıntısındaki F, cisme etkiyen net (bileşke) kuvvettir. 1 kgf = 9,80665 N ve 1 g = 9,80665 m/s² alınmıştır.',
    };
  },
  cases: [
    { in: { bul: 'kuvvet', kutle: '10', ivme: '2' }, out: { 'Kuvvet': '20 N', 'Kütle': '10 kg', 'İvme': '2 m/s²' } },
    { in: { bul: 'ivme', kuvvet: '50', kutle: '10' }, out: { 'İvme': '5 m/s²', 'Kuvvet': '50 N' } },
    { in: { bul: 'kutle', kuvvet: '100', ivme: '5' }, out: { 'Kütle': '20 kg' } },
    { in: { bul: 'kuvvet', kutle: '1500', ivme: '3' }, out: { 'Kuvvet': '4.500 N' } },
    { in: { bul: 'kuvvet', kutle: '70', ivme: '9,80665' }, out: { 'Kuvvet': '686,4655 N', 'Kuvvet (kgf)': '70 kgf', 'İvme (g)': '1 g' } },
    { in: { bul: 'kuvvet', kutle: '0,5', ivme: '4' }, out: { 'Kuvvet': '2 N' } },
    { in: { bul: 'kuvvet', kutle: '1200', ivme: '-5' }, out: { 'Kuvvet': '-6.000 N' } },
    { in: { bul: 'ivme', kuvvet: '3000', kutle: '1200' }, out: { 'İvme': '2,5 m/s²' } },
    { in: { bul: 'kuvvet', kutle: '', ivme: '2' }, error: true },
    { in: { bul: 'ivme', kuvvet: '50', kutle: '0' }, error: true },
    { in: { bul: 'kutle', kuvvet: '100', ivme: '0' }, error: true },
  ],
  howto: [
    '"Hesaplanacak büyüklük" listesinden neyi bulmak istediğinizi seçin: kuvvet, kütle ya da ivme.',
    'Bildiğiniz iki değeri ilgili alanlara yazın: kuvveti newton, kütleyi kilogram, ivmeyi m/s² olarak girin. Hesaplanacak büyüklüğün alanını boş bırakabilirsiniz.',
    '"Hesapla" düğmesine basın. Aranan değer ilk satırda, diğer iki büyüklük ve kuvvetin kgf, ivmenin g karşılığı alt satırlarda görünür.',
    'Sonuçları ödevinize ya da raporunuza aktarmak için "Sonucu kopyala" düğmesini kullanın.',
  ],
  sections: [
    { h: 'F = m·a ne söyler?', p: [
      'Newton\'un ikinci hareket yasası, bir cisme etkiyen net kuvvetin, cismin kütlesi ile kazandığı ivmenin çarpımına eşit olduğunu söyler. Yasanın özü şudur: aynı kuvvet hafif bir cismi çok, ağır bir cismi az ivmelendirir; aynı cismi daha çok ivmelendirmek için daha büyük kuvvet gerekir. Boş bir market arabasını itmek ile dolu olanı itmek arasındaki fark, bu yasanın gündelik hayattaki en bilinen örneğidir.',
      'Bağıntıdaki üç büyüklükten ikisi bilindiğinde üçüncüsü bulunur: <strong>F = m × a</strong>, <strong>m = F ÷ a</strong> ve <strong>a = F ÷ m</strong>. SI birim sisteminde kütle kilogram (kg), ivme metre bölü saniye kare (m/s²), kuvvet ise newton (N) ile ölçülür. Bir newton, bir kilogramlık kütleye 1 m/s² ivme kazandıran kuvvettir; yani 1 N = 1 kg·m/s².',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 (kuvvet):</strong> 10 kg kütleli bir sandık 2 m/s² ivmeyle hızlanıyor. Net kuvvet F = 10 × 2 = 20 N\'dir.',
      '<strong>Örnek 2 (ivme):</strong> 1.200 kg kütleli bir otomobile yol doğrultusunda net 3.000 N kuvvet etkiyor. İvme a = 3.000 ÷ 1.200 = 2,5 m/s² olur. Bu ivmeyle araç her saniye hızını 2,5 m/s, yani 9 km/saat artırır.',
      '<strong>Örnek 3 (kütle):</strong> 100 N\'luk net kuvvet bir cisme 5 m/s² ivme kazandırıyorsa cismin kütlesi m = 100 ÷ 5 = 20 kg\'dır.',
      '<strong>Örnek 4 (frenleme):</strong> 1.200 kg\'lık bir araç 5 m/s² ivmeyle yavaşlıyor. İvme harekete ters yönde olduğu için −5 m/s² yazılır ve F = 1.200 × (−5) = −6.000 N bulunur. Eksi işareti, fren kuvvetinin hareket yönüne ters olduğunu gösterir.',
    ] },
    { h: 'Net kuvvet kavramı', p: [
      'Formüldeki F, cisme etkiyen tek bir kuvvet değil, bütün kuvvetlerin bileşkesidir. Bir masayı 50 N ile itiyorsanız ve zemin 30 N sürtünme kuvveti uyguluyorsa, masayı ivmelendiren net kuvvet 50 − 30 = 20 N\'dur. Zıt yönlü kuvvetler birbirinden çıkarılır, aynı yönlü kuvvetler toplanır; farklı doğrultulardaki kuvvetler ise vektörel olarak, bileşenlerine ayrılarak toplanır.',
      'Net kuvvet sıfırsa ivme de sıfırdır. Bu, cismin durduğu anlamına gelmez; hızının değişmediği anlamına gelir. Sabit hızla düz yolda giden bir araçta motorun itişi ile sürtünme ve hava direnci dengededir. Öğrencilerin en sık düştüğü yanılgı, hareket eden her cisme hareket yönünde bir net kuvvet etkidiğini sanmaktır; oysa kuvvet hızı değil, hızdaki <em>değişimi</em> belirler.',
    ] },
    { h: 'Kütle ile ağırlık aynı şey değildir', p: [
      'Kütle bir cisimdeki madde miktarının ve eylemsizliğin ölçüsüdür; kilogramla ifade edilir ve cisim nereye giderse gitsin değişmez. Ağırlık ise yer çekiminin cisme uyguladığı kuvvettir ve newton ile ölçülür. Ağırlık da aslında F = m·a bağıntısının özel bir hâlidir: ivme yerine yer çekimi ivmesi yazılır. 70 kg kütleli bir kişinin Dünya\'daki ağırlığı 70 × 9,80665 = 686,4655 N\'dur; bu değer 70 kilogram-kuvvete (kgf) eşittir.',
      'Araçtaki "Kuvvet (kgf)" satırı, bulunan kuvvetin kaç kilogramlık bir yükün ağırlığına denk geldiğini gösterir ve sonucu sezgisel olarak yorumlamayı kolaylaştırır. "İvme (g)" satırı ise ivmenin standart yer çekimi ivmesinin kaç katı olduğunu verir.',
    ] },
    { h: 'Birimlere dikkat', ul: [
      'Kütle gram olarak verilmişse 1.000\'e bölerek kilograma çevirin: 500 g = 0,5 kg.',
      'Kütle ton olarak verilmişse 1.000 ile çarpın: 1,5 ton = 1.500 kg.',
      'Kuvvet kilonewton (kN) ise 1.000 ile çarparak newtona çevirin: 4,5 kN = 4.500 N.',
      'İvme km/saat üzerinden verilmişse önce hızı 3,6\'ya bölerek m/s\'ye çevirin, sonra süreye bölün.',
      'Kuvvet kgf olarak verilmişse 9,80665 ile çarparak newtona geçin.',
    ] },
    { h: 'Nerelerde kullanılır?', p: [
      'Lise fizik müfredatındaki dinamik konusunun temel formülüdür; eğik düzlem, makara, asansör ve sürtünmeli yüzey problemlerinin hepsi sonunda net kuvveti bulup F = m·a yazmaya dayanır. Mühendislikte bir motorun ya da pistonun belirli bir yükü istenen sürede hızlandırıp hızlandıramayacağı, bir konveyörün kalkıştaki çekiş kuvveti, bir asansör halatındaki gerilme ya da bir aracın fren kuvveti gereksinimi aynı bağıntıyla ön hesap olarak kestirilir.',
      'Spor biliminde sporcunun yere uyguladığı kuvvet, otomotivde hızlanma ve çarpışma analizleri, robotikte eksen motoru seçimi de bu yasaya dayanır. Burada verilen sonuçlar ideal ve sabit ivmeli bir durumu yansıtır; gerçek tasarımlarda sürtünme, hava direnci, dönen parçaların eylemsizliği ve emniyet katsayıları da hesaba katılmalıdır. Sonuçlar bilgilendirme amaçlıdır; mühendislik kararları için yetkili bir uzmanın hesabı esas alınmalıdır.',
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      'Araç kütlenin sabit olduğunu ve hareketin tek doğrultuda incelendiğini varsayar. Roket gibi kütlesi zamanla değişen sistemlerde ya da ışık hızına yakın hızlarda bu basit biçim yeterli olmaz. Kütle sıfır ya da negatif olamaz. Kuvvet ve ivme yön belirtmek için negatif girilebilir; ikisi her zaman aynı işaretlidir, çünkü ivme net kuvvetle aynı yöndedir. Kütle hesaplanırken ivme sıfır olamaz ve kuvvet ile ivmenin işaretleri uyuşmalıdır; aksi hâlde araç uyarı verir. Sonuçlar dört ondalık basamağa kadar gösterilir.',
    ] },
  ],
  faq: [
    ['Kuvvet formülü nedir?', 'Kuvvet, kütle ile ivmenin çarpımıdır: F = m·a. Kütle kilogram, ivme m/s² olarak alındığında sonuç newton cinsinden çıkar.'],
    ['1 newton ne kadar bir kuvvettir?', '1 newton, 1 kilogramlık kütleye 1 m/s² ivme kazandıran kuvvettir. Yaklaşık 102 gramlık bir cismin, örneğin küçük bir elmanın ağırlığı kadardır.'],
    ['Kütle ve kuvvet biliniyorsa ivme nasıl bulunur?', 'Kuvveti kütleye bölersiniz: a = F ÷ m. Örneğin 50 N\'luk net kuvvet 10 kg\'lık bir cisme 5 m/s² ivme kazandırır.'],
    ['Formüldeki kuvvet hangi kuvvettir?', 'Cisme etkiyen bütün kuvvetlerin bileşkesi, yani net kuvvettir. İtme kuvvetinden sürtünme gibi karşı kuvvetleri çıkarmadan formülü kullanırsanız ivmeyi olduğundan büyük bulursunuz.'],
    ['Ağırlığı bu araçla hesaplayabilir miyim?', 'Evet. Kütleyi yazıp ivme alanına yer çekimi ivmesini (standart değer 9,80665 m/s²) girin. Sonuç cismin newton cinsinden ağırlığıdır; kgf satırı da kütleyle aynı sayıyı verir.'],
    ['Negatif kuvvet ne anlama gelir?', 'İşaret yalnızca yönü gösterir. Pozitif yön olarak hareket yönünü seçtiyseniz negatif kuvvet, harekete ters yönde etkiyen ve cismi yavaşlatan kuvvettir; fren kuvveti buna örnektir.'],
    ['Net kuvvet sıfırsa cisim durur mu?', 'Hayır. Net kuvvet sıfırsa ivme sıfırdır; cisim duruyorsa durmaya, hareket ediyorsa aynı hızla düz bir çizgide hareket etmeye devam eder. Bu, Newton\'un birinci yasasıdır.'],
    ['Yazdığım değerler bir yere gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; girdiğiniz değerler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['ivme-hesapla', 'kutle-agirlik-hesapla', 'momentum-hesapla', 'surtunme-kuvveti-hesapla', 'is-hesapla', 'newton-kgf-cevir'],
};
