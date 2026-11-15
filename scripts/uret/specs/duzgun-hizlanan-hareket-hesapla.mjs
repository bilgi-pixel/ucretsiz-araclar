export default {
  slug: 'duzgun-hizlanan-hareket-hesapla',
  title: 'Düzgün Hızlanan Hareket Hesaplama',
  h1Tail: 'sabit ivmeli hareket',
  pageTitle: 'Düzgün Hızlanan Hareket Hesaplama – Sabit İvmeli Hareket Formülleri',
  description: 'Sabit ivmeli doğrusal harekette son hızı, yer değiştirmeyi, ivmeyi ve süreyi hesaplayın. İlk hız, ivme, süre, yol ya da son hızdan bilinen üçünü girmeniz yeterli.',
  card: 'Sabit ivmeli harekette son hız, yer değiştirme, ivme ve süreyi bilinen üç büyüklükten hesaplayın.',
  category: 'bilim',
  keywords: ['düzgün hızlanan hareket hesaplama', 'sabit ivmeli hareket', 'v = v0 + at', 'yer değiştirme hesaplama', 'zamansız hız formülü', 'düzgün yavaşlayan hareket', 'fren mesafesi fizik'],
  lead: `Bir doğru boyunca <strong>sabit ivmeyle</strong> hızlanan ya da yavaşlayan cismin son hızını, yer değiştirmesini, ivmesini ve hareket süresini hesaplayın. Elinizdeki verilere uygun hesap türünü seçmeniz yeterlidir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'tur', label: 'Bilinenler', type: 'select', wide: true, options: [['zaman', 'İlk hız, ivme ve süre'], ['yol', 'İlk hız, ivme ve yol'], ['hiz', 'İlk hız, son hız ve süre']] },
    { id: 'ilkHiz', label: 'İlk hız v₀ (m/s)', type: 'number', value: '0' },
    { id: 'ivme', label: 'İvme a (m/s²)', type: 'number', placeholder: 'Örn. 2', hint: 'Yavaşlama için eksi değer yazın.' },
    { id: 'sure', label: 'Süre t (s)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'yol', label: 'Yol x (m)', type: 'number', placeholder: 'Yalnızca "yol" seçeneğinde' },
    { id: 'sonHiz', label: 'Son hız v (m/s)', type: 'number', placeholder: 'Yalnızca "son hız" seçeneğinde' },
  ],
  compute(v, h) {
    const v0 = h.num(v.ilkHiz, 'İlk hız');
    let a, t, x, vs;
    if (v.tur === 'yol') {
      a = h.num(v.ivme, 'İvme');
      x = h.pos(v.yol, 'Yol');
      if (v0 < 0) h.err('Bu hesap türünde ilk hız negatif olamaz; hareket yönünü pozitif kabul edin.');
      const d = v0 * v0 + 2 * a * x;
      if (d < -1e-9) h.err('Cisim bu yolu tamamlayamadan duruyor. Durma mesafesi ' + h.fmt((v0 * v0) / (-2 * a), 3) + ' m; daha kısa bir yol ya da daha küçük bir yavaşlama girin.');
      vs = Math.sqrt(Math.max(0, d));
      if (a === 0) {
        if (v0 === 0) h.err('İlk hız ve ivme birlikte sıfır olamaz; cisim hareket etmez.');
        t = x / v0;
      } else t = (vs - v0) / a;
    } else if (v.tur === 'hiz') {
      vs = h.num(v.sonHiz, 'Son hız');
      t = h.pos(v.sure, 'Süre');
      a = (vs - v0) / t;
      x = ((v0 + vs) / 2) * t;
    } else {
      a = h.num(v.ivme, 'İvme');
      t = h.pos(v.sure, 'Süre');
      vs = v0 + a * t;
      x = v0 * t + 0.5 * a * t * t;
    }
    // Yön değişimi varsa alınan toplam yol yer değiştirmeden farklıdır
    let alinan = Math.abs(x), dondu = false;
    if (a !== 0) {
      const ts = -v0 / a;
      if (ts > 1e-12 && ts < t - 1e-12) {
        const xs = v0 * ts + 0.5 * a * ts * ts;
        alinan = Math.abs(xs) + Math.abs(x - xs);
        dondu = true;
      }
    }
    const R = {
      son: ['Son hız', h.fmt(vs, 4) + ' m/s'],
      yer: ['Yer değiştirme', h.fmt(x, 4) + ' m'],
      ivme: ['İvme', h.fmt(a, 4) + ' m/s²'],
      sure: ['Süre', h.fmt(t, 4) + ' s'],
    };
    const sira = v.tur === 'yol' ? ['son', 'sure', 'ivme', 'yer'] : v.tur === 'hiz' ? ['ivme', 'yer', 'son', 'sure'] : ['son', 'yer', 'ivme', 'sure'];
    const rows = sira.map((k) => R[k]);
    rows.push(['Ortalama hız', h.fmt(x / t, 4) + ' m/s']);
    rows.push(['Alınan toplam yol', h.fmt(alinan, 4) + ' m']);
    rows.push(['Son hız (km/sa)', h.fmt(vs * 3.6, 2) + ' km/sa']);
    const durum = a === 0 ? 'İvme sıfır: cisim sabit hızla hareket ediyor.' : dondu ? 'Cisim hareket sırasında durup yön değiştiriyor; bu yüzden alınan yol yer değiştirmeden büyük.' : (a * (v0 + vs) >= 0 ? 'Cisim düzgün hızlanıyor.' : 'Cisim düzgün yavaşlıyor.');
    return { rows, note: durum + ' Pozitif yön, ilk hızın yönü kabul edilmiştir; hava direnci gibi etkiler hesaba katılmaz.' };
  },
  cases: [
    { in: { tur: 'zaman', ilkHiz: '0', ivme: '2', sure: '5' }, out: { 'Son hız': '10 m/s', 'Yer değiştirme': '25 m', 'Ortalama hız': '5 m/s', 'Son hız (km/sa)': '36 km/sa' } },
    { in: { tur: 'yol', ilkHiz: '20', ivme: '-5', yol: '40' }, out: { 'Son hız': '0 m/s', 'Süre': '4 s', 'Ortalama hız': '10 m/s' } },
    { in: { tur: 'hiz', ilkHiz: '5', sonHiz: '25', sure: '4' }, out: { 'İvme': '5 m/s²', 'Yer değiştirme': '60 m' } },
    { in: { tur: 'zaman', ilkHiz: '10', ivme: '-2', sure: '3' }, out: { 'Son hız': '4 m/s', 'Yer değiştirme': '21 m', 'Alınan toplam yol': '21 m' } },
    { in: { tur: 'yol', ilkHiz: '0', ivme: '2', yol: '100' }, out: { 'Son hız': '20 m/s', 'Süre': '10 s' } },
    { in: { tur: 'zaman', ilkHiz: '0', ivme: '9,81', sure: '2' }, out: { 'Son hız': '19,62 m/s', 'Yer değiştirme': '19,62 m' } },
    { in: { tur: 'zaman', ilkHiz: '10', ivme: '-5', sure: '4' }, out: { 'Son hız': '-10 m/s', 'Yer değiştirme': '0 m', 'Alınan toplam yol': '20 m' } },
    { in: { tur: 'yol', ilkHiz: '10', ivme: '-5', yol: '20' }, error: true },
    { in: { tur: 'zaman', ilkHiz: '0', ivme: '2', sure: '-1' }, error: true },
    { in: { tur: 'hiz', ilkHiz: '5', sonHiz: '', sure: '4' }, error: true },
  ],
  howto: [
    `"Bilinenler" listesinden elinizdeki verilere uyan seçeneği işaretleyin: süre biliniyorsa birinci, süre yerine yol biliniyorsa ikinci, ivme yerine son hız biliniyorsa üçüncü seçenek.`,
    `İlk hızı metre bölü saniye olarak yazın. Cisim duruştan başlıyorsa 0 bırakın. Kilometre bölü saat cinsinden bir hızı 3,6'ya bölerek çevirebilirsiniz.`,
    `Seçtiğiniz türün gerektirdiği diğer iki alanı doldurun. Kullanılmayan alanları boş bırakabilirsiniz; araç onları dikkate almaz.`,
    `Yavaşlayan hareket için ivmeyi eksi işaretli girin (örneğin fren için -5).`,
    `"Hesapla" düğmesine basın. Son hız, yer değiştirme, ivme, süre, ortalama hız ve alınan toplam yol birlikte listelenir.`,
  ],
  sections: [
    { h: 'Düzgün hızlanan hareket nedir?', p: [
      `Bir cismin hızı eşit zaman aralıklarında eşit miktarda değişiyorsa bu harekete sabit ivmeli ya da düzgün değişen doğrusal hareket denir. Hız artıyorsa düzgün hızlanan, azalıyorsa düzgün yavaşlayan hareketten söz edilir. İvme, hızın birim zamandaki değişimidir ve birimi metre bölü saniye karedir. İvmesi 2 m/s² olan bir cismin hızı her saniye 2 m/s artar.`,
      `Kalkışa geçen bir otomobil, pistte hızlanan bir uçak, fren yapan bir tren ya da serbest bırakılan bir taş, ivmenin yaklaşık sabit kaldığı sürece bu modelle incelenir. Hız-zaman grafiği eğik bir doğru, konum-zaman grafiği ise bir paraboldür.`,
    ] },
    { h: 'Kullanılan formüller', p: [
      `Sabit ivmeli harekette dört temel bağıntı vardır. Bunların her biri beş büyüklükten (ilk hız v<sub>0</sub>, son hız v, ivme a, süre t, yer değiştirme x) dördünü içerir; üçü bilindiğinde diğer ikisi bulunur.`,
    ], ul: [
      `<strong>v = v<sub>0</sub> + a × t</strong> (hız-zaman bağıntısı)`,
      `<strong>x = v<sub>0</sub> × t + ½ × a × t²</strong> (konum-zaman bağıntısı)`,
      `<strong>v² = v<sub>0</sub>² + 2 × a × x</strong> (zamansız hız bağıntısı)`,
      `<strong>x = (v<sub>0</sub> + v) ÷ 2 × t</strong> (ortalama hız ile yer değiştirme)`,
    ] },
    { h: 'Çözümlü örnek: duruştan hızlanma', p: [
      `Duran bir araç 2 m/s² sabit ivmeyle 5 saniye hızlansın. Son hız v = 0 + 2 × 5 = 10 m/s olur; bu da 36 km/sa eder. Bu sürede alınan yol x = 0 × 5 + ½ × 2 × 5² = 25 metredir. Ortalama hız 25 ÷ 5 = 5 m/s bulunur; sabit ivmeli harekette ortalama hız, ilk ve son hızın aritmetik ortalamasına eşittir: (0 + 10) ÷ 2 = 5.`,
    ] },
    { h: 'Çözümlü örnek: fren yapan araç', p: [
      `20 m/s (72 km/sa) hızla giden bir araç 5 m/s² büyüklüğünde sabit ivmeyle yavaşlayarak 40 metrede duruyor mu? Zamansız hız bağıntısından v² = 20² + 2 × (−5) × 40 = 400 − 400 = 0 bulunur; araç tam 40 metrenin sonunda durur. Süre t = (0 − 20) ÷ (−5) = 4 saniyedir. Araçta "İlk hız, ivme ve yol" seçilip ilk hız 20, ivme -5, yol 40 yazıldığında aynı sonuçlar görülür.`,
      `Aynı araç için yolu 50 metre yazarsanız araç bu mesafeyi tamamlayamadan duracağı için hesap hata verir ve durma mesafesini bildirir. Bu, zamansız hız bağıntısında karekök içinin negatif çıkmasının fiziksel anlamıdır.`,
    ] },
    { h: 'Yer değiştirme ile alınan yol farkı', p: [
      `Yer değiştirme, son konum ile ilk konum arasındaki yönlü farktır; alınan yol ise cismin kat ettiği toplam mesafedir. Cisim hep aynı yönde gidiyorsa ikisi eşittir. Ancak yavaşlayan cisim durup geri dönüyorsa farklılaşırlar.`,
      `Örneğin 10 m/s ilk hızla giden ve −5 m/s² ivmeye sahip bir cisim 2. saniyede durur; o ana kadar 10 metre ilerlemiştir. Sonraki 2 saniyede aynı 10 metreyi geri gelir. 4 saniyenin sonunda yer değiştirme 0, alınan toplam yol 20 metre, son hız ise −10 m/s olur. Araç bu durumu algılar ve iki değeri ayrı satırlarda gösterir.`,
    ] },
    { h: 'İşaret kuralı ve sık yapılan hatalar', ul: [
      `İlk hızın yönü pozitif kabul edilir. Hıza zıt yöndeki ivme (yavaşlama) eksi işaretle yazılmalıdır.`,
      `Hızı km/sa olarak girmek en yaygın hatadır. Formüller m/s ile çalışır: 90 km/sa = 25 m/s.`,
      `Duruştan başlayan harekette ilk hız sıfırdır; "durarak" biten harekette ise son hız sıfırdır. İkisini karıştırmayın.`,
      `Serbest düşme de düzgün hızlanan harekettir; ivme yerine yer çekimi ivmesini (yaklaşık 9,81 m/s²) yazabilirsiniz.`,
      `İvme hareket boyunca değişiyorsa bu formüller geçerli değildir; hareketi ivmenin sabit olduğu parçalara bölmek gerekir.`,
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      `Hesap, ivmenin tüm hareket boyunca sabit olduğu ve hareketin tek bir doğru üzerinde gerçekleştiği ideal durumu ele alır. Gerçek araçlarda ivme hıza, yol tutuşa, eğime ve hava direncine göre değişir; sürücünün tepki süresi de durma mesafesine eklenir. Bu nedenle sonuçlar ders ve ön fikir amaçlıdır; trafik güvenliği, kaza incelemesi ya da mühendislik tasarımı gibi konularda uzman değerlendirmesinin yerini tutmaz.`,
    ] },
  ],
  faq: [
    ['Düzgün hızlanan hareket formülleri nelerdir?', `Dört temel bağıntı kullanılır: v = v₀ + a·t, x = v₀·t + ½·a·t², v² = v₀² + 2·a·x ve x = (v₀ + v)/2 · t. Hangi büyüklük bilinmiyorsa onu içermeyen formül seçilir.`],
    ['Zamansız hız formülü ne zaman kullanılır?', `Süre verilmediğinde ve sorulmadığında kullanılır. v² = v₀² + 2·a·x bağıntısı ilk hız, ivme ve yoldan doğrudan son hızı verir. Araçta "İlk hız, ivme ve yol" seçeneği bu formülle çalışır.`],
    ['Yavaşlayan hareketi nasıl hesaplarım?', `İvmeyi eksi işaretle girin. Örneğin 20 m/s hızdan 5 m/s² ile yavaşlayan bir cisim için ivme alanına -5 yazılır. Sonuçta son hız azalır, sıfıra ulaştığında cisim durmuş olur.`],
    ['km/sa değerini m/s birimine nasıl çeviririm?', `Kilometre bölü saat değerini 3,6'ya bölün. 72 km/sa = 20 m/s, 108 km/sa = 30 m/s eder. Araç son hızı ayrıca km/sa olarak da gösterir.`],
    ['Ortalama hız nasıl bulunur?', `Yer değiştirmenin süreye bölünmesiyle bulunur. Sabit ivmeli harekette bu değer ilk hız ile son hızın toplamının yarısına eşittir.`],
    ['Son hız neden negatif çıktı?', `İvme hıza zıt yöndeyse cisim önce yavaşlar, durur ve ardından ters yönde hızlanmaya başlar. Negatif son hız, cismin başlangıçtaki yönün tersine hareket ettiğini gösterir. Yalnızca durma anına kadar olan kısmı istiyorsanız "İlk hız, son hız ve süre" ya da yol seçeneğini kullanın.`],
    ['Serbest düşmeyi bu araçla hesaplayabilir miyim?', `Evet. İlk hızı 0, ivmeyi 9,81 yazarsanız hava direncinin ihmal edildiği serbest düşmeyi hesaplarsınız. 2 saniyede hız 19,62 m/s, düşülen yükseklik 19,62 m olur.`],
    ['Girdiğim sayılar kaydediliyor mu?', `Hayır. Bütün hesap tarayıcınızda yapılır; veriler sunucuya gönderilmez ve saklanmaz.`],
  ],
  related: ['ivme-hesapla', 'serbest-dusme-hesapla', 'egik-atis-hesapla', 'kuvvet-hesapla', 'kinetik-enerji-hesapla'],
};
