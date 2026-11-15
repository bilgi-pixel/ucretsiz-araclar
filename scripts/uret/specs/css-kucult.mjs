export default {
  slug: 'css-kucult',
  title: 'CSS Küçültme (Minify)',
  h1Tail: 'boşluk ve yorumları temizle',
  pageTitle: 'CSS Küçültme (Minify) – Online CSS Sıkıştırma Aracı',
  description: 'CSS kodunuzu tarayıcıda küçültün: yorumlar, satır sonları ve gereksiz boşluklar silinir, kazanılan bayt ve yüzde gösterilir. Kod sunucuya gönderilmez.',
  card: 'CSS dosyanızdaki yorumları ve gereksiz boşlukları silip tek satıra indirin; kaç bayt kazandığınızı görün.',
  category: 'gelistirici',
  keywords: ['css küçültme', 'css minify', 'css sıkıştırma', 'css minifier online', 'css boşluk silme', 'css yorum silme', 'css dosya boyutu küçültme'],
  lead: 'Stil dosyanızı yapıştırın; araç yorumları, satır sonlarını ve tarayıcının ihtiyaç duymadığı boşlukları silerek <strong>küçültülmüş (minified) CSS</strong> üretir. Özgün ve yeni boyutu bayt cinsinden, kazancı yüzde olarak gösterir.',
  button: 'Küçült',
  inputs: [
    { id: 'css', label: 'CSS kodu', type: 'textarea', rows: 10, placeholder: 'body {\n  margin: 0;\n  color: #333;\n}' },
    { id: 'yorum', label: 'Yorumlar', type: 'select', options: [['sil', 'Tüm yorumları sil'], ['koru', '/*! ile başlayan lisans yorumlarını koru']] },
  ],
  compute(v, h) {
    const s = String(v.css ?? '');
    if (s.trim() === '') h.err('Küçültülecek CSS kodunu "CSS kodu" alanına yapıştırın.');
    const koru = v.yorum === 'koru';
    const ONCE = new Set(['{', '}', ';', ',', ')', '!']);   // kendisinden önceki boşluk gereksiz
    const SONRA = new Set(['{', '}', ';', ',', '(', ':']);  // kendisinden sonraki boşluk gereksiz
    const BAG = new Set(['>', '~', '+']);                   // seçici birleştiricileri (yalnızca parantez dışında)
    let o = '', bosluk = false, yorumSonu = false, derinlik = 0, ac = 0, kapa = 0, i = 0;
    const n = s.length;
    const yaz = (parca) => {
      const c = parca[0];
      const son = o[o.length - 1];
      if (bosluk && !yorumSonu && o !== '' && !SONRA.has(son) && !ONCE.has(c) && !(derinlik === 0 && (BAG.has(son) || BAG.has(c)))) o += ' ';
      bosluk = false; yorumSonu = false;
      if (c === '}' && son === ';') o = o.slice(0, -1);
      o += parca;
    };
    while (i < n) {
      const c = s[i];
      if (c === '/' && s[i + 1] === '*') {
        let j = s.indexOf('*/', i + 2);
        if (j < 0) j = n - 2;
        const yrm = s.slice(i, j + 2);
        if (koru && s[i + 2] === '!') { bosluk = false; yorumSonu = true; o += yrm; }
        i = j + 2;
        continue;
      }
      if (c === '"' || c === '\'') {
        let j = i + 1;
        while (j < n && s[j] !== c) { if (s[j] === '\\') j++; j++; }
        yaz(s.slice(i, Math.min(j + 1, n)));
        i = j + 1;
        continue;
      }
      if (/\s/.test(c)) { bosluk = true; i++; continue; }
      yaz(c);
      if (c === '(') derinlik++;
      else if (c === ')') derinlik = Math.max(0, derinlik - 1);
      else if (c === '{') ac++;
      else if (c === '}') kapa++;
      i++;
    }
    if (o === '') h.err('Kodda yalnızca yorum ya da boşluk var; küçültülecek bir CSS kuralı bulunamadı.');
    const bayt = (t) => new TextEncoder().encode(t).length;
    const b1 = bayt(s), b2 = bayt(o);
    const kazanc = b1 > 0 ? (b1 - b2) / b1 * 100 : 0;
    return {
      rows: [
        ['Küçültülmüş boyut', h.fmt(b2, 0) + ' bayt'],
        ['Özgün boyut', h.fmt(b1, 0) + ' bayt'],
        ['Kazanç', '%' + h.fmt(kazanc, 1) + ' (' + h.fmt(b1 - b2, 0) + ' bayt)'],
      ],
      text: o,
      note: ac !== kapa
        ? `Uyarı: ${ac} açılış ve ${kapa} kapanış süslü parantezi var; sayılar eşit değil. Kodda eksik ya da fazla parantez olabilir.`
        : 'Yalnızca yorum ve boşluklar silindi; renkler, sayılar ve seçiciler olduğu gibi bırakıldı.',
    };
  },
  cases: [
    { in: { css: 'body {\n  color: red;\n  margin: 0 auto;\n}\n' }, text: 'body{color:red;margin:0 auto}', out: { 'Küçültülmüş boyut': '29 bayt', 'Özgün boyut': '41 bayt', 'Kazanç': '%29,3 (12 bayt)' } },
    { in: { css: '/* başlık */\na > b , .c + .d { width: calc(100% - 10px) ; }' }, text: 'a>b,.c+.d{width:calc(100% - 10px)}' },
    { in: { css: '.x::after { content: "a  ;  b"; }' }, text: '.x::after{content:"a  ;  b"}' },
    { in: { css: '@media screen and (min-width: 600px) {\n  .k { color: red !important; }\n}' }, text: '@media screen and (min-width:600px){.k{color:red!important}}' },
    { in: { css: '/*! lisans */\np { margin: 0 }', yorum: 'koru' }, text: '/*! lisans */p{margin:0}' },
    { in: { css: '/*! lisans */\np { margin: 0 }', yorum: 'sil' }, text: 'p{margin:0}' },
    { in: { css: 'ul li :first-child { color : blue }' }, text: 'ul li :first-child{color :blue}' },
    { in: { css: '   ' }, error: true },
    { in: { css: '/* yalnızca yorum */' }, error: true },
  ],
  howto: [
    'Stil dosyanızın içeriğini kopyalayıp "CSS kodu" alanına yapıştırın. Tek bir kural da, binlerce satırlık bir dosya da olabilir.',
    '"Yorumlar" listesinden bütün yorumların mı silineceğini, yoksa <code>/*!</code> ile başlayan lisans ve telif yorumlarının mı korunacağını seçin.',
    '"Küçült" düğmesine basın. Küçültülmüş kod sonuç kutusunda tek satır olarak görünür; üstünde özgün boyut, yeni boyut ve kazanç yer alır.',
    'Sonucu kopyalayıp <code>stil.min.css</code> gibi ayrı bir dosyaya kaydedin. Düzenlemeye devam edeceğiniz okunaklı özgün dosyayı silmeyin.',
  ],
  sections: [
    { h: 'CSS küçültme nedir, ne işe yarar?', p: [
      'Bir stil dosyasını yazarken girintiler, boş satırlar ve açıklama yorumları kullanırız; bunlar kodu insan için okunur kılar. Tarayıcı ise bu karakterlerin hiçbirine ihtiyaç duymaz. Küçültme (minify), kodun anlamını değiştirmeden bu fazlalıkları atma işlemidir. Sonuçta ortaya çıkan dosya aynı görünümü üretir ama daha az bayt tutar, dolayısıyla daha hızlı indirilir.',
      'CSS, sayfanın çizilmesini bekleten kaynaklardandır: tarayıcı stil dosyasını indirip işlemeden içeriği göstermez. Bu yüzden özellikle mobil bağlantılarda stil dosyasının küçük olması, sayfanın ilk açılış süresine doğrudan yansır. Sayfa hızı ölçüm araçlarının "CSS\'i küçültün" uyarısı da tam olarak bu işlemi ister.',
    ] },
    { h: 'Bu araç tam olarak neleri siler?', ul: [
      '<strong>Yorumlar:</strong> <code>/* … */</code> arasındaki her şey. İsterseniz <code>/*!</code> ile başlayan lisans yorumları yerinde bırakılır.',
      '<strong>Satır sonları ve girintiler:</strong> art arda gelen boşluk, sekme ve yeni satır karakterleri tek boşluğa iner ya da tamamen kalkar.',
      '<strong>Noktalama çevresindeki boşluklar:</strong> süslü parantez, noktalı virgül, virgül ve iki nokta üst üsteden sonraki boşluklar; <code>!important</code> öncesindeki boşluk.',
      '<strong>Seçici birleştiricilerinin çevresi:</strong> <code>a > b</code>, <code>a + b</code> ve <code>a ~ b</code> yazımları <code>a>b</code>, <code>a+b</code>, <code>a~b</code> olur.',
      '<strong>Son noktalı virgül:</strong> bir bloğun kapanış parantezinden hemen önceki <code>;</code> gereksizdir ve silinir.',
    ] },
    { h: 'Bilerek dokunulmayan yerler', p: [
      'Küçültmede en sık yapılan hata, anlam taşıyan bir boşluğu silmektir. Araç şu durumlarda boşluğu korur: tırnak içindeki metinler (<code>content: "a  b"</code> gibi) harfi harfine aktarılır; <code>calc(100% - 10px)</code> ifadesindeki artı ve eksi çevresindeki boşluklar zorunlu olduğu için parantez içinde birleştirici temizliği yapılmaz; <code>margin: 0 auto</code> gibi değerleri ayıran boşluklar kalır; <code>@media screen and (min-width: 600px)</code> ifadesinde <code>and</code> ile parantez arasındaki boşluk silinmez.',
      'Seçicilerde iki nokta üst üsteden <em>önceki</em> boşluk da korunur, çünkü <code>li :first-child</code> ile <code>li:first-child</code> farklı öğeleri seçer: ilki <code>li</code> içindeki ilk çocuğu, ikincisi ilk çocuk olan <code>li</code> öğesini hedefler. Bu nedenle <code>color : blue</code> gibi alışılmadık bir yazımda iki noktadan önceki boşluk da yerinde kalır; zararsızdır, yalnızca bir bayt fazladır.',
      'Araç değerleri yeniden yazmaz: <code>#ffffff</code> rengini <code>#fff</code> yapmaz, <code>0.5</code> değerini <code>.5</code> olarak kısaltmaz, <code>0px</code> yerine <code>0</code> koymaz, aynı seçicili kuralları birleştirmez. Bu tür dönüşümler birkaç bayt daha kazandırır ama kodun davranışını değiştirme riski taşır. Burada amaç, sonucu gözünüz kapalı kullanabileceğiniz güvenli bir küçültmedir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Şu dört satırlık kuralı ele alalım: <code>body {</code>, <code>  color: red;</code>, <code>  margin: 0 auto;</code> ve <code>}</code>. Satır sonlarıyla birlikte bu metin 41 bayttır. Araç girintileri ve satır sonlarını atar, iki noktadan sonraki boşlukları siler ve son noktalı virgülü kaldırır. Çıktı <code>body{color:red;margin:0 auto}</code> olur ve 29 bayt tutar. Kazanç 12 bayt, yani yaklaşık %29,3\'tür.',
      'Gerçek projelerde oran dosyanın yazım biçimine bağlıdır. Bol yorumlu ve geniş girintili stil dosyalarında kazanç belirgin biçimde artar; zaten sıkışık yazılmış bir dosyada ise birkaç puanla sınırlı kalır. Kesin değeri görmek için dosyanızı yapıştırıp "Kazanç" satırına bakmanız yeterlidir.',
    ] },
    { h: 'Küçültme ile sunucu sıkıştırması aynı şey değildir', p: [
      'Web sunucuları metin dosyalarını gönderirken gzip ya da Brotli ile sıkıştırabilir. Bu, aktarım sırasında uygulanan ayrı bir katmandır ve küçültmenin yerini tutmaz; ikisi birlikte kullanılır. Küçültme tekrarlanmayan fazlalıkları (yorumlar, girintiler) tamamen ortadan kaldırır, sıkıştırma ise kalan metindeki tekrarları kodlar. Araçtaki bayt değerleri sıkıştırılmamış dosya boyutudur; ağ üzerinden aktarılan miktar sunucu ayarınıza göre daha da düşük olur.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Küçültülmüş dosyayı düzenlemeye çalışmak. Değişikliği her zaman okunaklı kaynak dosyada yapın, sonra yeniden küçültün.',
      'Özgün dosyanın üzerine yazmak. Küçültülmüş sürümü <code>.min.css</code> uzantılı ayrı bir dosyada tutmak yaygın ve güvenli alışkanlıktır.',
      'Lisans yorumlarını silmek. Açık kaynak bir kütüphanenin stil dosyasını küçültüyorsanız lisans koşulu telif satırının korunmasını gerektirebilir; bu durumda "koru" seçeneğini kullanın.',
      'Eksik süslü parantezli kodu küçültmek. Araç açılış ve kapanış parantezlerinin sayısı tutmuyorsa sonucun altında uyarı verir; önce kaynağı düzeltin.',
      'SCSS ya da LESS kaynağını yapıştırmak. Araç derleme yapmaz; <code>//</code> ile başlayan satır yorumları CSS\'te geçerli olmadığından silinmez. Önce derlenmiş CSS\'i elde edin.',
    ] },
  ],
  faq: [
    ['CSS küçültmek sitenin görünümünü bozar mı?', 'Hayır. Silinen karakterler tarayıcının zaten yok saydığı yorumlar ve boşluklardır. Araç tırnak içindeki metinlere, calc() ifadelerine ve anlam taşıyan boşluklara dokunmaz; bu yüzden küçültülmüş dosya özgün dosyayla aynı görünümü üretir.'],
    ['Küçültülmüş CSS\'i eski hâline döndürebilir miyim?', 'Girinti ve satır sonlarını bir biçimlendirici ile geri kazanabilirsiniz, ancak silinen yorumlar geri gelmez. Bu nedenle okunaklı kaynak dosyanızı mutlaka saklayın.'],
    ['/*! ile başlayan yorum ne demek?', 'Ünlem işaretiyle başlayan yorumlar, küçültme araçlarının geleneksel olarak koruduğu "önemli" yorumlardır ve çoğunlukla lisans ya da telif bilgisini taşır. "Koru" seçeneğiyle bu yorumlar çıktıda aynen kalır, diğerleri silinir.'],
    ['Renk kodlarını ve sıfırları da kısaltıyor mu?', 'Hayır. Araç yalnızca yorum ve boşluk temizliği yapar; #ffffff gibi renkleri, 0.5 gibi sayıları ve 0px gibi değerleri olduğu gibi bırakır. Böylece çıktı her tarayıcıda özgün kodla aynı davranır.'],
    ['Ne kadar büyük dosya yapıştırabilirim?', 'Belirlenmiş bir sınır yoktur; işlem tarayıcınızın belleğinde yapılır. Birkaç megabaytlık stil dosyaları bile güncel bir bilgisayarda anında işlenir.'],
    ['Küçültme arama motoru sıralamasını etkiler mi?', 'Küçültme tek başına bir sıralama garantisi vermez. Yaptığı şey dosya boyutunu ve dolayısıyla yüklenme süresini azaltmaktır; sayfa hızı ise kullanıcı deneyiminin ölçülen parçalarından biridir.'],
    ['HTML içindeki style etiketinin içeriğini de küçültebilir miyim?', 'Evet, etiketin içindeki CSS kısmını kopyalayıp yapıştırmanız yeterlidir. Açılış ve kapanış etiketlerini yapıştırmayın; araç yalnızca CSS söz dizimini işler.'],
    ['Yapıştırdığım kod bir sunucuya gönderiliyor mu?', 'Hayır. Küçültme işlemi tamamen tarayıcınızda çalışır; kodunuz hiçbir yere yüklenmez ve saklanmaz. Sayfa açıldıktan sonra internet bağlantısı olmadan da kullanabilirsiniz.'],
  ],
  related: ['html-kucult', 'json-kucult', 'css-gradient', 'css-birim-cevir', 'html-kodla-coz'],
};
