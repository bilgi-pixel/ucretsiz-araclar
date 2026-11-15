export default {
  slug: 'm3-saat-litre-dakika-cevir',
  title: 'Debi Çevirici (m³/saat – litre/dakika)',
  h1Tail: 'm³/h ↔ L/dk',
  pageTitle: 'Debi Çevirici – m³/saat, Litre/Dakika, Litre/Saniye Hesaplama',
  description: 'Debiyi m³/saat, litre/dakika, litre/saniye, litre/saat, m³/gün ve galon/dakika arasında çevirin. İsterseniz depo hacmini yazıp dolum süresini de hesaplayın.',
  card: 'Pompa, kombi ve musluk debisini m³/saat, L/dk, L/sn ve gpm arasında çevirin; deponun kaç dakikada dolacağını görün.',
  category: 'birim',
  keywords: ['m3/saat litre/dakika çevirme', 'debi çevirici', 'm3/h kaç lt/dk', 'litre/saniye m3/saat', 'debi birimleri', 'pompa debisi hesaplama', 'gpm litre dakika', 'depo dolum süresi'],
  lead: 'Pompa etiketindeki m³/saat değerini, kombi kataloğundaki litre/dakikayı ya da proje çizimindeki litre/saniyeyi birbirine çevirin. Temel eşitlik basittir: <strong>1 m³/saat = 16,6667 litre/dakika</strong>. Araç altı debi birimini aynı anda verir ve isterseniz belirli bir hacmin bu debiyle ne kadar sürede dolacağını da hesaplar.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Debi', type: 'number', placeholder: 'Örn. 3,6' },
    { id: 'birim', label: 'Debinin birimi', type: 'select', options: [
      ['m3h', 'Metreküp/saat (m³/h)'],
      ['lmin', 'Litre/dakika (L/dk)'],
      ['ls', 'Litre/saniye (L/sn)'],
      ['lh', 'Litre/saat (L/h)'],
      ['m3s', 'Metreküp/saniye (m³/sn)'],
      ['gpm', 'ABD galonu/dakika (gpm)'],
    ] },
    { id: 'hacim', label: 'Doldurulacak hacim (litre, isteğe bağlı)', type: 'number', placeholder: 'Örn. 1000', hint: 'Boş bırakılabilir. Yazarsanız dolum süresi hesaplanır.' },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Debi');
    const kat = { m3h: 1000 / 60, lmin: 1, ls: 60, lh: 1 / 60, m3s: 60000, gpm: 3.785411784 };
    const k = kat[v.birim];
    if (!k) h.err('Listeden geçerli bir birim seçin.');
    const lmin = x * k;
    const s = {
      lmin: ['Litre/dakika', h.sig(lmin, 6) + ' L/dk'],
      m3h: ['Metreküp/saat', h.sig(lmin * 0.06, 6) + ' m³/saat'],
      ls: ['Litre/saniye', h.sig(lmin / 60, 6) + ' L/sn'],
      lh: ['Litre/saat', h.sig(lmin * 60, 6) + ' L/saat'],
      m3s: ['Metreküp/saniye', h.sig(lmin / 60000, 6) + ' m³/sn'],
      gpm: ['ABD galonu/dakika', h.sig(lmin / 3.785411784, 6) + ' gpm'],
    };
    const sira = v.birim === 'm3h' ? ['lmin', 'ls', 'lh', 'm3s', 'gpm'] : ['m3h', 'lmin', 'ls', 'lh', 'm3s', 'gpm'];
    const rows = sira.filter((b) => b !== v.birim).map((b) => s[b]);
    rows.push(['Metreküp/gün', h.sig(lmin * 1.44, 6) + ' m³/gün']);
    const hacim = h.opt(v.hacim, null, 'Doldurulacak hacim');
    if (hacim !== null) {
      if (hacim <= 0) h.err('"Doldurulacak hacim" sıfırdan büyük olmalı ya da boş bırakılmalı.');
      if (lmin <= 0) h.err('Dolum süresi için debi sıfırdan büyük olmalı.');
      const sn = Math.round((hacim / lmin) * 60);
      const sa = Math.floor(sn / 3600);
      const dk = Math.floor((sn % 3600) / 60);
      const kalan = sn % 60;
      rows.push(['Dolum süresi', (sa ? h.fmt(sa, 0) + ' saat ' : '') + dk + ' dk ' + kalan + ' sn']);
    }
    return {
      rows,
      note: '1 m³ = 1.000 litre, 1 ABD galonu = 3,785411784 litre alınmıştır. Dolum süresi debinin sabit kaldığını varsayar; gerçek tesisatta basınç değiştikçe debi de değişir.',
    };
  },
  cases: [
    { in: { deger: '1', birim: 'm3h' }, out: { 'Litre/dakika': '16,6667 L/dk', 'Litre/saniye': '0,277778 L/sn', 'Litre/saat': '1.000 L/saat', 'Metreküp/gün': '24 m³/gün', 'ABD galonu/dakika': '4,40287 gpm' } },
    { in: { deger: '60', birim: 'lmin' }, out: { 'Metreküp/saat': '3,6 m³/saat', 'Litre/saniye': '1 L/sn' } },
    { in: { deger: '12', birim: 'lmin', hacim: '1000' }, out: { 'Metreküp/saat': '0,72 m³/saat', 'Litre/saat': '720 L/saat', 'Litre/saniye': '0,2 L/sn', 'Dolum süresi': '1 saat 23 dk 20 sn' } },
    { in: { deger: '1', birim: 'ls' }, out: { 'Metreküp/saat': '3,6 m³/saat', 'Litre/dakika': '60 L/dk', 'Litre/saat': '3.600 L/saat' } },
    { in: { deger: '1', birim: 'm3s' }, out: { 'Metreküp/saat': '3.600 m³/saat', 'Litre/dakika': '60.000 L/dk' } },
    { in: { deger: '10', birim: 'gpm' }, out: { 'Litre/dakika': '37,8541 L/dk', 'Metreküp/saat': '2,27125 m³/saat' } },
    { in: { deger: '1000', birim: 'lh' }, out: { 'Metreküp/saat': '1 m³/saat', 'Litre/dakika': '16,6667 L/dk' } },
    { in: { deger: '1', birim: 'm3h', hacim: '500' }, out: { 'Dolum süresi': '30 dk 0 sn' } },
    { in: { deger: 'hızlı', birim: 'm3h' }, error: true },
    { in: { deger: '0', birim: 'lmin', hacim: '100' }, error: true },
    { in: { deger: '-5', birim: 'lmin' }, error: true },
  ],
  howto: [
    '"Debi" alanına elinizdeki değeri yazın; pompa etiketinden, katalogdan ya da kendi ölçümünüzden alabilirsiniz.',
    '"Debinin birimi" listesinden değerin birimini seçin: m³/saat, litre/dakika, litre/saniye, litre/saat, m³/saniye ya da galon/dakika.',
    'Bir deponun, havuzun ya da bidonun ne kadar sürede dolacağını öğrenmek istiyorsanız hacmi litre olarak üçüncü alana yazın; istemiyorsanız boş bırakın.',
    '"Çevir" düğmesine basın. Debinin diğer tüm birimlerdeki karşılığı ve varsa dolum süresi listelenir.',
    'Farklı birimlerle verilmiş iki pompayı karşılaştırırken her ikisini de aynı birime çevirip sonuçları yan yana değerlendirin.',
  ],
  sections: [
    { h: 'Debi nedir?', p: [
      'Debi, bir kesitten birim zamanda geçen akışkan hacmidir. Musluktan bir dakikada akan su, pompanın bir saatte bastığı su ya da bir dereden bir saniyede geçen su miktarı debiyle ifade edilir. Uluslararası birim sisteminde debi birimi metreküp/saniyedir, ancak bu birim gündelik tesisat için çok büyüktür; bu yüzden uygulamada daha küçük birimler tercih edilir.',
      'Türkiye\'de sektörlere göre farklı alışkanlıklar vardır. Pompa ve hidrofor etiketlerinde <strong>m³/saat</strong>, kombi ve şofben kataloglarında <strong>litre/dakika</strong>, mekanik tesisat projelerinde ve yangın tesisatında <strong>litre/saniye</strong>, damla sulama damlatıcılarında <strong>litre/saat</strong>, belediye ve arıtma tesislerinde <strong>m³/gün</strong> kullanılır. İthal ekipman belgelerinde ise ABD galonu/dakika (gpm) karşınıza çıkar.',
    ] },
    { h: 'Çevirme formülleri', p: [
      'Bütün çeviriler iki bilgiye dayanır: 1 metreküp 1.000 litredir ve 1 saat 60 dakika, 3.600 saniyedir. Buradan şu eşitlikler çıkar:',
    ], ul: [
      '<strong>m³/saat → L/dk:</strong> 1.000 ÷ 60 ile çarpın (× 16,6667).',
      '<strong>L/dk → m³/saat:</strong> 0,06 ile çarpın.',
      '<strong>L/sn → m³/saat:</strong> 3,6 ile çarpın.',
      '<strong>m³/saat → L/sn:</strong> 3,6\'ya bölün.',
      '<strong>L/dk → L/saat:</strong> 60 ile çarpın.',
      '<strong>gpm → L/dk:</strong> 3,785411784 ile çarpın.',
      '<strong>m³/saat → m³/gün:</strong> 24 ile çarpın.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 – Pompa etiketi:</strong> Etikette 1 m³/saat yazıyor. 1 × 1.000 ÷ 60 = 16,6667 L/dk. Saniyeye çevirirsek 1 ÷ 3,6 = 0,277778 L/sn; günlük olarak 24 m³ eder.',
      '<strong>Örnek 2 – Mutfak musluğu:</strong> Musluğunuz dakikada 12 litre su veriyor. 12 × 0,06 = 0,72 m³/saat, 12 × 60 = 720 L/saat, 12 ÷ 60 = 0,2 L/sn. Bu muslukla 1.000 litrelik bir su deposunu doldurmak 1.000 ÷ 12 = 83,33 dakika, yani 1 saat 23 dakika 20 saniye sürer.',
      '<strong>Örnek 3 – Proje değeri:</strong> Tesisat projesinde bir hat için 1 L/sn debi öngörülmüş. 1 × 3,6 = 3,6 m³/saat; bu da 60 L/dk demektir. Pompa seçerken katalogdaki m³/saat sütununda 3,6 değerini ararsınız.',
      '<strong>Örnek 4 – İthal pompa:</strong> Kataloğunda 10 gpm yazan bir pompa 10 × 3,785411784 = 37,8541 L/dk, yani 2,27125 m³/saat debi verir.',
    ] },
    { h: 'Evde debi nasıl ölçülür? Kova yöntemi', p: [
      'Debimetre olmadan da yaklaşık debiyi bulabilirsiniz. Hacmini bildiğiniz bir kovayı musluğun ya da hortumun altına koyun ve dolma süresini kronometreyle ölçün. Debi, hacmin süreye bölümüdür. 10 litrelik kova 40 saniyede doluyorsa debi 10 ÷ 40 = 0,25 L/sn, yani 15 L/dk\'dır. Bu değeri araca yazarak m³/saat karşılığını (0,9 m³/saat) görebilirsiniz.',
      'Ölçümü iki üç kez tekrarlayıp ortalamasını almak hatayı azaltır. Binada başka muslukların açık olması, şebeke basıncının gün içinde değişmesi ve hortum uzunluğu sonucu etkiler; bu yüzden ölçümü gerçek kullanım koşullarında yapmak en doğrusudur.',
    ] },
    { h: 'Debi tek başına yetmez: basınçla ilişkisi', p: [
      'Pompa seçerken yapılan en yaygın hata yalnızca debiye bakmaktır. Bir pompanın etiketindeki en yüksek debi, suyu hiç yükseltmeden ve dirençsiz bastığı durumdaki değerdir. Su yukarı basıldıkça ve boru hattı uzadıkça debi düşer. Bu ilişki pompa eğrisiyle gösterilir: yatay eksende debi, düşey eksende basma yüksekliği yer alır.',
      'Örneğin etiketinde 3 m³/saat ve 30 metre yazan bir pompa, bu iki değeri aynı anda vermez; 30 metreye yaklaştıkça debi sıfıra iner. İhtiyacınız olan debiyi, gereken basma yüksekliğinde sağlayan pompayı seçmeniz gerekir. Bu araç yalnızca birim çevirir; pompa seçimi için eğriye ve tesisat kayıplarına bakılmalıdır.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>1 m³/saat</strong> = 16,6667 L/dk = 0,2778 L/sn',
      '<strong>3,6 m³/saat</strong> = 60 L/dk = 1 L/sn',
      '<strong>6 m³/saat</strong> = 100 L/dk',
      '<strong>10 L/dk</strong> = 0,6 m³/saat = 600 L/saat',
      '<strong>1 L/sn</strong> = 86,4 m³/gün',
      '<strong>1 gpm</strong> ≈ 3,7854 L/dk ≈ 0,2271 m³/saat',
    ] },
    { h: 'Uyarı ve sınırlar', p: [
      'Dolum süresi hesabı debinin baştan sona sabit kaldığını varsayar. Gerçekte depo doldukça karşı basınç artabilir, şebeke basıncı dalgalanabilir. Sonuçlar bilgilendirme amaçlıdır; yangın tesisatı, ısıtma-soğutma sistemi, arıtma ve sulama projesi gibi mühendislik gerektiren işlerde pompa ve boru çapı seçimi için makine ya da tesisat mühendisine danışın. Araç yalnızca hacimsel debiyi çevirir; kg/saat gibi kütlesel debi için akışkanın yoğunluğu ayrıca gerekir.',
    ] },
  ],
  faq: [
    ['1 m³/saat kaç litre/dakikadır?', '1 m³/saat, 1.000 litrenin 60 dakikaya bölünmesiyle 16,6667 litre/dakika eder. Kabaca hesap için m³/saat değerini 16,7 ile çarpabilirsiniz.'],
    ['Litre/dakikayı m³/saate nasıl çeviririm?', 'Litre/dakika değerini 0,06 ile çarpın. Örneğin 50 L/dk, 50 × 0,06 = 3 m³/saat eder.'],
    ['1 litre/saniye kaç m³/saattir?', '1 L/sn, saatte 3.600 litre yani 3,6 m³/saat eder. Aynı debi 60 L/dk\'ya karşılık gelir.'],
    ['Bir ev musluğunun debisi ne kadardır?', 'Musluk tipine, perlatöre ve şebeke basıncına göre değişir. Kendi musluğunuzun debisini kova yöntemiyle ölçebilirsiniz: bilinen hacimli bir kabın dolma süresini ölçüp hacmi süreye bölün.'],
    ['Depom kaç dakikada dolar?', 'Depo hacmini litre olarak debiye (L/dk) bölün. 1.000 litrelik depo 12 L/dk debiyle 83,33 dakikada dolar. Araçta hacim alanını doldurursanız süre saat, dakika ve saniye olarak gösterilir.'],
    ['gpm nedir?', 'Gpm, dakikada galon anlamına gelen bir debi birimidir. Bu araç ABD galonunu kullanır: 1 gpm yaklaşık 3,785 L/dk eder. İngiliz galonu daha büyüktür; İngiliz kaynaklı bir belgede bunu göz önünde bulundurun.'],
    ['m³/saat ile Nm³/saat aynı mı?', 'Hayır. Nm³/saat, gazlar için belirli bir sıcaklık ve basınca indirgenmiş normal metreküp debisidir. Gazların hacmi basınç ve sıcaklıkla değiştiği için ayrı bir dönüşüm gerekir. Bu araç doğrudan hacimsel debiyi çevirir.'],
    ['Girdiğim değerler saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız debi ve hacim değerleri sunucuya gönderilmez, kaydedilmez. Sayfa açıldıktan sonra internet olmadan da çalışır.'],
  ],
  related: ['debi-hesapla', 'litre-metrekup-cevir', 'kgcm2-bar-cevir', 'litre-galon-cevir', 'parmak-cm-cevir', 'hacim-hesapla'],
};
