export default {
  slug: 'debi-hesapla',
  title: 'Debi (Akış Hızı) Hesaplama',
  h1Tail: 'L/dk, L/s ve m³/saat',
  pageTitle: 'Debi Hesaplama – Boru Çapı ve Hızdan Debi (L/dk, m³/saat)',
  description: 'Boru çapı ve akış hızından ya da hacim ve süreden debiyi hesaplayın; L/dk, L/s, m³/saat karşılıklarını görün. Debi ve çaptan borudaki su hızını da bulun.',
  card: 'Boru çapı ve hızdan ya da hacim ve süreden debiyi L/dk, L/s ve m³/saat olarak hesaplayın.',
  category: 'bilim',
  keywords: ['debi hesaplama', 'debi formülü', 'boru debi hesaplama', 'akış hızı hesaplama', 'litre dakika hesaplama', 'm3/saat hesaplama', 'boru çapı debi', 'su debisi hesaplama'],
  lead: 'Hacimsel debiyi iki yoldan hesaplayın: boru iç çapı ve akış hızından (<strong>Q = A·v</strong>) ya da ölçülen hacim ve süreden (<strong>Q = V/t</strong>). Üçüncü seçenekle bilinen debi ve boru çapından akış hızını bulabilirsiniz. Sonuçlar L/dk, L/s, m³/saat ve m³/s olarak birlikte verilir.',
  button: 'Hesapla',
  inputs: [
    { id: 'mod', label: 'Hesap türü', type: 'select', options: [['kesit', 'Boru çapı ve hızdan debi (Q = A·v)'], ['hacim', 'Hacim ve süreden debi (Q = V/t)'], ['hiz', 'Debi ve boru çapından akış hızı']] },
    { id: 'cap', label: 'Boru iç çapı (mm)', type: 'number', placeholder: 'Örn. 25', hint: 'Birinci ve üçüncü hesap türünde kullanılır. Dış çap değil, iç çap yazılmalıdır.' },
    { id: 'hiz', label: 'Akış hızı (m/s)', type: 'number', placeholder: 'Örn. 1,5', hint: 'Yalnızca çap ve hızdan debi hesabında kullanılır.' },
    { id: 'hacim', label: 'Hacim (litre)', type: 'number', placeholder: 'Örn. 10', hint: 'Yalnızca hacim ve süreden debi hesabında kullanılır.' },
    { id: 'sure', label: 'Süre (saniye)', type: 'number', placeholder: 'Örn. 60', hint: 'Yalnızca hacim ve süreden debi hesabında kullanılır.' },
    { id: 'debi', label: 'Debi (L/dk)', type: 'number', placeholder: 'Örn. 60', hint: 'Yalnızca debi ve çaptan hız hesabında kullanılır.' },
  ],
  compute(v, h) {
    const alanBul = () => {
      const d = h.pos(v.cap, 'Boru iç çapı') / 1000;
      return Math.PI * d * d / 4;
    };
    const debiSatirlari = (Q) => [
      ['Debi', h.fmt(Q * 60000, 2) + ' L/dk'],
      ['Litre/saniye', h.fmt(Q * 1000, 3) + ' L/s'],
      ['Metreküp/saat', h.fmt(Q * 3600, 3) + ' m³/saat'],
      ['Metreküp/saniye', h.sig(Q) + ' m³/s'],
    ];
    const dolum = (Q) => {
      const sn = 1 / Q;
      if (sn < 120) return h.fmt(sn, 1) + ' saniye';
      if (sn < 7200) return h.fmt(sn / 60, 1) + ' dakika';
      return h.fmt(sn / 3600, 2) + ' saat';
    };
    if (v.mod === 'hacim') {
      const V = h.pos(v.hacim, 'Hacim');
      const t = h.pos(v.sure, 'Süre');
      const Q = V / 1000 / t;
      return {
        rows: [...debiSatirlari(Q), ['1 m³ (1000 L) dolum süresi', dolum(Q)]],
        note: 'Ölçüm süresince akışın sabit olduğu varsayılır; sonuç ortalama debidir.',
      };
    }
    if (v.mod === 'hiz') {
      const A = alanBul();
      const Q = h.pos(v.debi, 'Debi') / 60000;
      const hiz = Q / A;
      return {
        rows: [
          ['Akış hızı', h.fmt(hiz, 3) + ' m/s'],
          ['Kesit alanı', h.fmt(A * 1e4, 3) + ' cm²'],
          ['Litre/saniye', h.fmt(Q * 1000, 3) + ' L/s'],
          ['Metreküp/saat', h.fmt(Q * 3600, 3) + ' m³/saat'],
        ],
        note: 'Hız, boru kesitindeki ortalama hızdır. Borunun tam dolu aktığı varsayılır.',
      };
    }
    const A = alanBul();
    const hiz = h.pos(v.hiz, 'Akış hızı');
    const Q = A * hiz;
    return {
      rows: [...debiSatirlari(Q), ['Kesit alanı', h.fmt(A * 1e4, 3) + ' cm²'], ['1 m³ (1000 L) dolum süresi', dolum(Q)]],
      note: 'Borunun tam dolu aktığı ve girilen hızın kesit ortalaması olduğu varsayılır.',
    };
  },
  cases: [
    { in: { mod: 'kesit', cap: '100', hiz: '2' }, out: { 'Debi': '942,48 L/dk', 'Litre/saniye': '15,708 L/s', 'Metreküp/saat': '56,549 m³/saat', 'Kesit alanı': '78,54 cm²' } },
    { in: { mod: 'hacim', hacim: '10', sure: '60' }, out: { 'Debi': '10 L/dk', 'Litre/saniye': '0,167 L/s', 'Metreküp/saat': '0,6 m³/saat', '1 m³ (1000 L) dolum süresi': '100 dakika' } },
    { in: { mod: 'hacim', hacim: '200', sure: '100' }, out: { 'Debi': '120 L/dk', 'Litre/saniye': '2 L/s', 'Metreküp/saat': '7,2 m³/saat', 'Metreküp/saniye': '0,002 m³/s' } },
    { in: { mod: 'hiz', debi: '60', cap: '20' }, out: { 'Akış hızı': '3,183 m/s', 'Litre/saniye': '1 L/s' } },
    { in: { mod: 'kesit', cap: '25', hiz: '1' }, out: { 'Debi': '29,45 L/dk', 'Litre/saniye': '0,491 L/s', 'Metreküp/saat': '1,767 m³/saat' } },
    { in: { mod: 'kesit', cap: '50', hiz: '1,5' }, out: { 'Debi': '176,71 L/dk', 'Litre/saniye': '2,945 L/s', 'Metreküp/saat': '10,603 m³/saat' } },
    { in: { mod: 'kesit', cap: '0', hiz: '2' }, error: true },
    { in: { mod: 'hacim', hacim: '10', sure: '' }, error: true },
    { in: { mod: 'hiz', debi: '-5', cap: '20' }, error: true },
  ],
  howto: [
    '"Hesap türü" listesinden elinizdeki veriye uygun seçeneği işaretleyin: çap ve hız, hacim ve süre ya da debi ve çap.',
    'Çap ve hızdan hesapta borunun iç çapını milimetre, akış hızını m/s olarak yazın.',
    'Hacim ve süreden hesapta, örneğin bir kovanın dolma süresini ölçtüyseniz, hacmi litre ve süreyi saniye olarak girin.',
    'Borudaki su hızını öğrenmek için üçüncü seçeneği kullanın; debiyi L/dk ve iç çapı milimetre olarak yazın.',
    '"Hesapla" düğmesine basın. Debi farklı birimlerde listelenir; ilgili hesaplarda kesit alanı ve 1000 litrelik bir deponun dolum süresi de gösterilir.',
  ],
  sections: [
    { h: 'Debi nedir?', p: [
      'Debi, bir kesitten birim zamanda geçen akışkan miktarıdır. Miktar hacim olarak ölçülüyorsa hacimsel debi, kütle olarak ölçülüyorsa kütlesel debi adını alır. Gündelik kullanımda ve tesisat hesaplarında "debi" denildiğinde genellikle hacimsel debi kastedilir ve Q harfiyle gösterilir. Musluktan dakikada kaç litre su aktığı, bir pompanın saatte kaç metreküp su bastığı ya da bir derenin saniyede kaç metreküp su taşıdığı birer debi bilgisidir.',
      'Debi ile akış hızı sık sık karıştırılır. Hız, akışkan parçacıklarının saniyede kaç metre yol aldığını söyler; debi ise kesitten ne kadar hacim geçtiğini. Aynı debi geniş bir boruda düşük hızla, dar bir boruda yüksek hızla taşınır.',
    ] },
    { h: 'Debi formülleri', p: [
      'Tam dolu akan bir boruda hacimsel debi, kesit alanı ile ortalama hızın çarpımıdır: <strong>Q = A·v</strong>. Dairesel boruda kesit alanı <strong>A = π·D²/4</strong> olduğundan <strong>Q = π·D²·v/4</strong> yazılır. Çap metre, hız m/s alındığında debi m³/s çıkar.',
      'Doğrudan ölçümde ise belirli bir sürede toplanan hacim süreye bölünür: <strong>Q = V/t</strong>. Bir kabı musluğun altına tutup dolma süresini ölçmek bu yöntemin en basit uygulamasıdır. Debi ve çap biliniyorsa hız <strong>v = Q/A</strong> ile bulunur. Kütlesel debi gerektiğinde hacimsel debi yoğunlukla çarpılır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Çap ve hızdan:</strong> İç çapı 100 mm olan bir boruda su 2 m/s hızla akıyor. Çap 0,1 m\'dir; kesit alanı A = π × 0,1²/4 ≈ 0,007854 m² (78,54 cm²). Debi Q = 0,007854 × 2 ≈ 0,015708 m³/s, yani <strong>15,708 L/s</strong>, 942,48 L/dk ya da 56,549 m³/saat eder.',
      '<strong>Kova yöntemi:</strong> 10 litrelik bir kova bahçe musluğunda 60 saniyede doluyor. Q = 10/60 ≈ 0,167 L/s, yani <strong>10 L/dk</strong> ya da 0,6 m³/saat. Bu debiyle 1000 litrelik bir depo 100 dakikada dolar.',
      '<strong>Hız kontrolü:</strong> Dakikada 60 litre (1 L/s) su taşıması istenen bir hat için 20 mm iç çaplı boru düşünülüyor. Kesit alanı π × 0,02²/4 ≈ 0,000314 m², hız v = 0,001/0,000314 ≈ <strong>3,183 m/s</strong> çıkar. Bu oldukça yüksek bir hızdır; daha geniş bir boru seçmek gürültüyü ve basınç kaybını azaltır.',
    ] },
    { h: 'Birim dönüşümleri', ul: [
      '1 m³/s = 1000 L/s = 60.000 L/dk = 3600 m³/saat',
      '1 L/s = 60 L/dk = 3,6 m³/saat',
      '1 m³/saat ≈ 16,67 L/dk ≈ 0,278 L/s',
      '1 L/dk = 0,06 m³/saat',
      '1 m³ = 1000 litre; evlerde su sayaçları tüketimi metreküp olarak gösterir',
    ] },
    { h: 'Süreklilik ilkesi: çap değişince hız neden değişir?', p: [
      'Sıkıştırılamaz bir akışkanda, örneğin suda, borunun her kesitinden aynı debi geçer: A₁·v₁ = A₂·v₂. Bu yüzden boru daraldığında su hızlanır, genişlediğinde yavaşlar. Alan çapın karesiyle orantılı olduğundan etki güçlüdür: çap yarıya indiğinde kesit dörtte bire düşer ve aynı debi için hız dört katına çıkar. Bahçe hortumunun ucunu parmakla sıkınca suyun daha uzağa fışkırması bu ilkenin gündelik örneğidir; ancak bu durumda sürtünme arttığı için toplam debi bir miktar azalır.',
      'Yukarıdaki örneklerde 25 mm iç çaplı boruda 1 m/s hızla yaklaşık 29,45 L/dk, 50 mm iç çaplı boruda 1,5 m/s hızla yaklaşık 176,71 L/dk taşınır. Çap iki katına çıktığında aynı hızda debinin dört katına çıktığını bu değerlerden görebilirsiniz.',
    ] },
    { h: 'Dikkat edilecek noktalar ve sınırlar', p: [
      'Hesapta borunun <strong>iç çapı</strong> kullanılmalıdır. Piyasada boru ölçüleri çoğunlukla dış çap ya da anma ölçüsüyle söylenir; et kalınlığı malzemeye ve basınç sınıfına göre değiştiğinden iç çapı üretici çizelgesinden kontrol edin. Örneğin aynı dış çaptaki plastik bir borunun iç çapı, et kalınlığına bağlı olarak birkaç milimetre farklı olabilir ve bu fark debiyi belirgin biçimde etkiler.',
      'Formül, borunun tam dolu aktığını ve girilen hızın kesit ortalaması olduğunu varsayar. Yarı dolu akan atık su boruları, açık kanallar ve dereler için ıslak kesit alanı ayrıca hesaplanmalıdır. Araç, belirli bir basınçta bir borudan ne kadar su geçeceğini de öngörmez; bu, boru uzunluğu, pürüzlülük, dirsekler ve vanalardan kaynaklanan basınç kayıplarına bağlıdır. Tesisat borularında su hızının genellikle saniyede birkaç metreyi aşmaması istenir; uygun değerler için ilgili standartlara ve proje mühendisine başvurulmalıdır. Sonuçlar bilgilendirme ve ön hesap amaçlıdır.',
    ] },
  ],
  faq: [
    ['Debi nasıl hesaplanır?', 'İki temel yol vardır: kesit alanı ile ortalama hızı çarpmak (Q = A·v) ya da ölçülen hacmi geçen süreye bölmek (Q = V/t). Dairesel boruda alan π·D²/4 ile bulunur.'],
    ['Debinin birimi nedir?', 'Uluslararası birim sisteminde m³/s\'dir. Uygulamada tesisatta L/dk ve L/s, pompalarda m³/saat yaygındır. 1 L/s, 60 L/dk ve 3,6 m³/saat eder.'],
    ['Evde musluğun debisini nasıl ölçerim?', 'Hacmi bilinen bir kabı, örneğin 10 litrelik bir kovayı musluğun altına koyup dolma süresini kronometreyle ölçün. Hacmi ve süreyi "Hacim ve süreden debi" seçeneğine girin; sonuç L/dk olarak çıkar.'],
    ['Boru çapı iki katına çıkarsa debi ne olur?', 'Akış hızı aynı kalırsa debi dört katına çıkar, çünkü kesit alanı çapın karesiyle orantılıdır. Gerçek sistemlerde hız da değişebileceğinden kesin sonuç basınç ve kayıplara bağlıdır.'],
    ['Debi ile akış hızı aynı şey midir?', 'Hayır. Akış hızı m/s cinsinden akışkanın ilerleme süratidir; debi ise birim zamanda geçen hacimdir. İkisi kesit alanı üzerinden birbirine bağlıdır: Q = A·v.'],
    ['Kütlesel debiyi nasıl bulurum?', 'Hacimsel debiyi akışkanın yoğunluğuyla çarpın. Su için yoğunluk yaklaşık 1000 kg/m³ olduğundan 1 L/s hacimsel debi yaklaşık 1 kg/s kütlesel debiye karşılık gelir.'],
    ['Basınçtan debi hesaplanabilir mi?', 'Yalnızca basınç bilgisi yeterli değildir; boru uzunluğu, çapı, pürüzlülüğü ve bağlantı elemanlarındaki kayıplar da bilinmelidir. Bu araç basınç kaybı hesabı yapmaz, yalnızca geometri ve hız ya da hacim ve süre ilişkisini kullanır.'],
    ['Girdiğim bilgiler bir yere gönderiliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız değerler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['reynolds-sayisi-hesapla', 'hidrostatik-basinc-hesapla', 'basinc-hesapla', 'yogunluk-hesapla', 'birim-donustur'],
};
