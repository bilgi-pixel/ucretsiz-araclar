export default {
  slug: 'ucgen-acisi-hesapla',
  title: 'Üçgenin Üçüncü Açısını Hesaplama',
  h1Tail: 'iç açılar toplamı 180°',
  pageTitle: 'Üçgenin Üçüncü Açısını Hesaplama – İç ve Dış Açılar',
  description: 'İki açısı bilinen üçgenin üçüncü açısını bulun. İç açılar toplamı 180° kuralıyla çalışır; üçgenin türünü, dış açılarını ve radyan karşılığını da gösterir.',
  card: 'İki açısını yazdığınız üçgenin üçüncü açısını, dış açılarını ve açı-kenar türünü (dik, dar, geniş; eşkenar, ikizkenar) bulun.',
  category: 'matematik',
  keywords: ['üçgenin üçüncü açısı', 'üçgen açı hesaplama', 'üçgen iç açılar toplamı', 'üçgen dış açı hesaplama', 'bilinmeyen açı bulma', 'üçgen çeşitleri', 'üçgende açı'],
  lead: 'Bir üçgenin bildiğiniz iki iç açısını yazın; araç <strong>iç açılar toplamı 180°</strong> kuralından üçüncü açıyı bulur. Ayrıca üçgenin açılarına ve kenarlarına göre türünü, üç dış açısını ve sonucun radyan karşılığını verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'aciA', label: 'Birinci açı', type: 'number', placeholder: 'Örn. 50' },
    { id: 'aciB', label: 'İkinci açı', type: 'number', placeholder: 'Örn. 60' },
    { id: 'birim', label: 'Açı birimi', type: 'select', options: [['derece', 'Derece (°)'], ['radyan', 'Radyan']] },
  ],
  compute(v, h) {
    const k = v.birim === 'radyan' ? 180 / Math.PI : 1;
    const a = h.pos(v.aciA, 'Birinci açı') * k;
    const b = h.pos(v.aciB, 'İkinci açı') * k;
    if (a + b >= 180 - 1e-9) h.err(`İki açının toplamı 180°\'den küçük olmalı (şu an ${h.fmt(a + b, 4)}°). Bir üçgenin üç iç açısının toplamı 180° olduğundan üçüncü açıya yer kalmıyor.`);
    const c = 180 - a - b;
    const es = (x, y) => Math.abs(x - y) < 1e-7;
    const maks = Math.max(a, b, c);
    const aciTur = es(maks, 90) ? 'Dik üçgen' : maks > 90 ? 'Geniş açılı üçgen' : 'Dar açılı üçgen';
    const kenarTur = es(a, b) && es(b, c) ? 'Eşkenar üçgen' : es(a, b) || es(b, c) || es(a, c) ? 'İkizkenar üçgen' : 'Çeşitkenar üçgen';
    const d = (x) => h.fmt(x, 4) + '°';
    return {
      rows: [
        ['Üçüncü açı', d(c)],
        ['Üçüncü açı (radyan)', h.fmt(c * Math.PI / 180, 6) + ' rad'],
        ['Açılarına göre', aciTur],
        ['Kenarlarına göre', kenarTur],
        ['İç açılar', `${d(a)}, ${d(b)}, ${d(c)}`],
        ['Dış açılar', `${d(180 - a)}, ${d(180 - b)}, ${d(180 - c)}`],
      ],
      note: 'Hesap düzlem (Öklid) geometrisindeki üçgenler içindir: iç açılar toplamı 180°, dış açılar toplamı 360°.',
    };
  },
  cases: [
    { in: { aciA: '50', aciB: '60' }, out: { 'Üçüncü açı': '70°', 'Açılarına göre': 'Dar açılı üçgen', 'Kenarlarına göre': 'Çeşitkenar üçgen', 'Dış açılar': '130°, 120°, 110°' } },
    { in: { aciA: '90', aciB: '45' }, out: { 'Üçüncü açı': '45°', 'Açılarına göre': 'Dik üçgen', 'Kenarlarına göre': 'İkizkenar üçgen' } },
    { in: { aciA: '60', aciB: '60' }, out: { 'Üçüncü açı': '60°', 'Kenarlarına göre': 'Eşkenar üçgen', 'Üçüncü açı (radyan)': '1,047198 rad', 'Dış açılar': '120°, 120°, 120°' } },
    { in: { aciA: '30', aciB: '40' }, out: { 'Üçüncü açı': '110°', 'Açılarına göre': 'Geniş açılı üçgen', 'Dış açılar': '150°, 140°, 70°' } },
    { in: { aciA: '35,5', aciB: '64,5' }, out: { 'Üçüncü açı': '80°', 'İç açılar': '35,5°, 64,5°, 80°' } },
    { in: { aciA: '100', aciB: '40' }, out: { 'Üçüncü açı': '40°', 'Açılarına göre': 'Geniş açılı üçgen', 'Kenarlarına göre': 'İkizkenar üçgen' } },
    { in: { aciA: '1', aciB: '1', birim: 'radyan' }, out: { 'Üçüncü açı': '65,4084°', 'Kenarlarına göre': 'İkizkenar üçgen' } },
    { in: { aciA: '90', aciB: '90' }, error: true },
    { in: { aciA: '120', aciB: '80' }, error: true },
    { in: { aciA: '0', aciB: '50' }, error: true },
    { in: { aciA: 'abc', aciB: '50' }, error: true },
  ],
  howto: [
    'Üçgenin bildiğiniz iki iç açısını "Birinci açı" ve "İkinci açı" alanlarına yazın. Sıra önemli değildir.',
    'Açılar radyan olarak verilmişse birim listesinden "Radyan" seçin; aksi hâlde "Derece" seçili kalsın.',
    '"Hesapla" düğmesine basın. İlk satırda üçüncü açı görünür.',
    'Alt satırlardan üçgenin dar, dik ya da geniş açılı olduğunu, kenarlarına göre türünü ve her köşedeki dış açıyı okuyun.',
  ],
  sections: [
    { h: 'Üçüncü açı nasıl bulunur?', p: [
      'Düzlemde çizilen her üçgenin iç açılarının toplamı 180°\'dir. Bu yüzden iki açı bilindiğinde üçüncüsü tek bir çıkarma işlemiyle bulunur: <strong>C = 180° − A − B</strong>. Radyanla çalışıyorsanız aynı kural π üzerinden yazılır: C = π − A − B.',
      'Kuralın nedeni basit bir çizimle görülebilir. Üçgenin bir köşesinden karşı kenara paralel bir doğru çizdiğinizde, o köşede yan yana üç açı oluşur. Ortadaki açı üçgenin kendi açısıdır; iki yandaki açılar ise paralellik nedeniyle diğer iki köşedeki açılara eşittir (iç ters açılar). Üçü birlikte bir doğru açı, yani 180° eder.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Açıları 50° ve 60° olan üçgende üçüncü açı 180 − 50 − 60 = 70° olur. En büyük açı 90°\'den küçük olduğu için üçgen dar açılıdır; üç açı da farklı olduğundan çeşitkenardır. Dış açılar 130°, 120° ve 110° çıkar; toplamları 360°\'dir.',
      '<strong>Örnek 2:</strong> Açılar 90° ve 45° ise üçüncü açı 45°\'dir. Bir açısı 90° olduğu için dik üçgen, iki açısı eşit olduğu için ikizkenar üçgendir. Gönyelerden biri tam olarak bu üçgendir.',
      '<strong>Örnek 3:</strong> 30° ve 40° verildiğinde üçüncü açı 110° bulunur. 90°\'den büyük bir açı içerdiğinden üçgen geniş açılıdır.',
      '<strong>Örnek 4:</strong> Ondalıklı açılarda da kural aynıdır: 35,5° ve 64,5° için 180 − 100 = 80° elde edilir.',
    ] },
    { h: 'Açılarına ve kenarlarına göre üçgen çeşitleri', p: [
      'Araç, bulduğu açıyla birlikte üçgeni iki ayrı ölçüte göre sınıflandırır. Kenar uzunluklarını bilmeden kenar türünü söyleyebilmesinin nedeni şudur: bir üçgende eşit açıların karşısındaki kenarlar da eşittir.',
    ], ul: [
      '<strong>Dar açılı üçgen:</strong> üç açısı da 90°\'den küçüktür.',
      '<strong>Dik üçgen:</strong> bir açısı tam 90°\'dir; diğer iki açının toplamı 90° eder.',
      '<strong>Geniş açılı üçgen:</strong> bir açısı 90°\'den büyüktür. Bir üçgende en fazla bir geniş ya da dik açı bulunabilir.',
      '<strong>Eşkenar üçgen:</strong> üç açısı da 60°\'dir, üç kenarı eşittir.',
      '<strong>İkizkenar üçgen:</strong> iki açısı eşittir; bu açıların karşısındaki iki kenar da eşit uzunluktadır.',
      '<strong>Çeşitkenar üçgen:</strong> üç açısı ve üç kenarı birbirinden farklıdır.',
    ] },
    { h: 'Dış açılar ve açı-kenar ilişkisi', p: [
      'Bir köşedeki dış açı, o köşedeki iç açıyı 180°\'ye tamamlar. Aynı zamanda <strong>kendisine komşu olmayan iki iç açının toplamına eşittir</strong>. 50°-60°-70° üçgeninde 70°\'lik köşenin dış açısı 110°\'dir ve bu 50 + 60 toplamına eşittir. Her köşeden birer dış açı alındığında toplam her zaman 360° eder.',
      'Açılar kenarlar hakkında da bilgi verir: en büyük açının karşısında en uzun kenar, en küçük açının karşısında en kısa kenar bulunur. Dik üçgende en büyük açı 90° olduğundan en uzun kenar daima hipotenüstür. Kenar uzunluklarını da hesaplamak isterseniz bir kenarı bilmeniz ve sinüs teoremini kullanmanız gerekir; yalnızca açılar üçgenin biçimini belirler, büyüklüğünü belirlemez.',
    ] },
    { h: 'Kullanım alanları', p: [
      'Bu hesap ortaokul ve lise geometri sorularının en sık karşılaşılan adımıdır; sınav sorularında bilinmeyen açı çoğu zaman önce iç açılar toplamından bulunur, ardından başka bir özellik kullanılır. Marangozlukta ve metal işlerinde köşe birleşimlerinin kesim açısını belirlerken, çatı makası çiziminde, arazi ölçümünde iki noktadan alınan açılarla üçüncü noktanın konumunu bulurken (üçgenleme) aynı kural uygulanır.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'Girilen iki açının toplamı 180° ya da daha fazlaysa böyle bir üçgen çizilemez; araç bu durumda uyarı verir. Örneğin iki açısı da 90° olan bir üçgen olamaz, çünkü üçüncü açıya 0° kalır. Açılardan biri sıfır ya da negatif de olamaz.',
      'Soruda verilen açı iç açı değil dış açıysa önce 180°\'den çıkarıp iç açıya çevirmelisiniz. Derece-dakika biçimindeki açıları (örneğin 35° 30′) ondalığa çevirerek girin: 30 dakika 0,5 derecedir, dolayısıyla 35,5 yazılır. Kural yalnızca düzlem geometrisi için geçerlidir; küre yüzeyine çizilen üçgenlerde, örneğin yerküre üzerindeki çok büyük üçgenlerde iç açılar toplamı 180°\'yi aşar.',
    ] },
  ],
  faq: [
    ['Üçgenin iç açıları toplamı kaç derecedir?', 'Düzlemdeki her üçgenin iç açıları toplamı 180°\'dir; radyan olarak π eder. Üçgenin büyüklüğü ya da biçimi bu toplamı değiştirmez.'],
    ['İki açısı 50° ve 60° olan üçgenin üçüncü açısı kaçtır?', '180 − 50 − 60 = 70°\'dir. Üç açı da 90°\'den küçük ve birbirinden farklı olduğu için bu üçgen dar açılı ve çeşitkenardır.'],
    ['Bir üçgende iki dik açı olabilir mi?', 'Hayır. İki dik açı tek başına 180° ettiğinden üçüncü açıya yer kalmaz. Aynı nedenle bir üçgende birden fazla geniş açı da bulunamaz.'],
    ['Dış açı nasıl hesaplanır?', 'Dış açı, aynı köşedeki iç açının 180°\'ye tamamlayanıdır: dış açı = 180° − iç açı. Ayrıca kendisine komşu olmayan iki iç açının toplamına eşittir. Üç dış açının toplamı 360°\'dir.'],
    ['Dik üçgende bir dar açı biliniyorsa diğeri nasıl bulunur?', 'Dik üçgende iki dar açının toplamı 90°\'dir. Bilinen dar açıyı 90°\'den çıkarmanız yeterlidir; örneğin biri 35° ise diğeri 55°\'dir. Araçta açılardan birine 90 yazarak aynı sonucu alırsınız.'],
    ['İkizkenar üçgende tepe açısı biliniyorsa taban açıları nasıl bulunur?', 'Taban açıları eşit olduğundan her biri (180° − tepe açısı) ÷ 2 kadardır. Tepe açısı 40° ise taban açıları 70°\'şer derecedir.'],
    ['Yalnızca açılardan kenar uzunlukları bulunabilir mi?', 'Hayır. Açılar üçgenin biçimini belirler ama ölçeğini belirlemez; aynı açılara sahip sonsuz sayıda benzer üçgen vardır. Kenarları bulmak için en az bir kenar uzunluğu bilinmelidir.'],
    ['Yazdığım açılar bir yere gönderiliyor mu?', 'Hayır. İşlem tarayıcınızda yapılır; girdiğiniz değerler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['sinus-teoremi-hesapla', 'kosinus-teoremi-hesapla', 'dik-ucgen-hesapla', 'ucgen-alani-hesapla', 'cokgen-ic-aci-hesapla', 'derece-radyan-cevir'],
};
