export default {
  slug: 'renk-tonu-olustur',
  title: 'Renk Tonları Oluşturma',
  h1Tail: 'açık ve koyu tonlar',
  pageTitle: 'Renk Tonları Oluşturma – Bir Rengin Açık ve Koyu Tonları',
  description: 'Bir HEX ya da RGB rengin açık (beyaza doğru) ve koyu (siyaha doğru) tonlarını eşit adımlarla üretin; HEX kodlarını ve hazır CSS değişkenlerini alın.',
  card: 'Tek bir renkten eşit adımlı açık ve koyu tonlar üretin; HEX kodları ve CSS değişkenleri hazır gelsin.',
  category: 'gelistirici',
  keywords: ['renk tonları oluşturma', 'renk tonu üretici', 'açık koyu ton', 'renk skalası', 'tint shade generator', 'hex renk tonları', 'css renk değişkenleri', 'renk açma koyulaştırma'],
  lead: 'Ana renginizi yazın, kaç adım istediğinizi seçin; araç rengi beyazla karıştırarak <strong>açık tonları</strong>, siyahla karıştırarak <strong>koyu tonları</strong> eşit aralıklarla üretir. Sonuç hem HEX listesi hem de stil dosyanıza yapıştırabileceğiniz CSS değişkenleri olarak verilir.',
  button: 'Oluştur',
  inputs: [
    { id: 'renk', label: 'Ana renk', type: 'text', placeholder: 'Örn. #3366CC', hint: 'HEX kodu (3 ya da 6 haneli) ya da virgülle ayrılmış RGB değerleri.' },
    { id: 'adim', label: 'Her yönde ton sayısı', type: 'number', value: '4', hint: '1 ile 20 arasında. 4 seçilirse %20, 9 seçilirse %10 aralıklı tonlar üretilir.' },
  ],
  compute(v, h) {
    const t = String(v.renk ?? '').trim();
    if (t === '') h.err('"Ana renk" alanını doldurun (örn. #3366CC).');
    let rgb;
    if (/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(t)) {
      let x = t.replace(/^#/, '');
      if (x.length === 3) x = x.split('').map((k) => k + k).join('');
      rgb = [0, 2, 4].map((i) => parseInt(x.slice(i, i + 2), 16));
    } else {
      const par = t.replace(/^rgb\s*\(/i, '').replace(/\)\s*;?$/, '').split(/[\s,;]+/).filter(Boolean);
      if (par.length !== 3 || par.some((p) => !/^\d+$/.test(p) || Number(p) > 255)) h.err('Rengi HEX kodu (örn. #3366CC) ya da 0–255 arası üç RGB değeri (örn. 51, 102, 204) olarak yazın.');
      rgb = par.map(Number);
    }
    const n = h.posint(v.adim, 'Her yönde ton sayısı');
    if (n > 20) h.err('"Her yönde ton sayısı" en fazla 20 olabilir.');
    const iki = (k) => k.toString(16).toUpperCase().padStart(2, '0');
    const hex = (c) => '#' + c.map(iki).join('');
    const acik = [], koyu = [];
    for (let i = 1; i <= n; i++) {
      const o = i / (n + 1);
      acik.push(hex(rgb.map((c) => Math.round(c + (255 - c) * o + 1e-9))));
      koyu.push(hex(rgb.map((c) => Math.round(c * (1 - o) + 1e-9))));
    }
    const ana = hex(rgb);
    const satir = [':root {'];
    for (let i = n; i >= 1; i--) satir.push('  --renk-acik-' + i + ': ' + acik[i - 1] + ';');
    satir.push('  --renk: ' + ana + ';');
    for (let i = 1; i <= n; i++) satir.push('  --renk-koyu-' + i + ': ' + koyu[i - 1] + ';');
    satir.push('}');
    return {
      rows: [
        ['Ana renk', ana],
        ['Açık tonlar (beyaza doğru)', acik.join(', ')],
        ['Koyu tonlar (siyaha doğru)', koyu.join(', ')],
        ['Adım aralığı', '%' + h.fmt(100 / (n + 1), 2)],
        ['Toplam renk', String(2 * n + 1)],
      ],
      text: satir.join('\n'),
      note: 'Tonlar RGB kanallarında doğrusal karışımla üretilir; liste ana renge en yakın tondan başlar.',
    };
  },
  cases: [
    { in: { renk: '#3366CC', adim: '4' }, out: { 'Ana renk': '#3366CC', 'Açık tonlar (beyaza doğru)': '#5C85D6, #85A3E0, #ADC2EB, #D6E0F5', 'Koyu tonlar (siyaha doğru)': '#2952A3, #1F3D7A, #142952, #0A1429', 'Adım aralığı': '%20', 'Toplam renk': '9' } },
    { in: { renk: '#FF0000', adim: '4' }, out: { 'Açık tonlar (beyaza doğru)': '#FF3333, #FF6666, #FF9999, #FFCCCC', 'Koyu tonlar (siyaha doğru)': '#CC0000, #990000, #660000, #330000' } },
    { in: { renk: 'f00', adim: '1' }, out: { 'Ana renk': '#FF0000', 'Açık tonlar (beyaza doğru)': '#FF8080', 'Koyu tonlar (siyaha doğru)': '#800000', 'Adım aralığı': '%50' }, text: ':root {\n  --renk-acik-1: #FF8080;\n  --renk: #FF0000;\n  --renk-koyu-1: #800000;\n}' },
    { in: { renk: '128, 128, 128', adim: '1' }, out: { 'Ana renk': '#808080', 'Açık tonlar (beyaza doğru)': '#C0C0C0', 'Koyu tonlar (siyaha doğru)': '#404040' } },
    { in: { renk: '#000', adim: '3' }, out: { 'Açık tonlar (beyaza doğru)': '#404040, #808080, #BFBFBF', 'Koyu tonlar (siyaha doğru)': '#000000, #000000, #000000', 'Adım aralığı': '%25' } },
    { in: { renk: '#3366CC', adim: '9' }, out: { 'Adım aralığı': '%10', 'Toplam renk': '19' }, textMatch: '--renk-koyu-9: #050A14;' },
    { in: { renk: '#ZZZZZZ', adim: '4' }, error: true },
    { in: { renk: '#3366CC', adim: '0' }, error: true },
    { in: { renk: '#3366CC', adim: '25' }, error: true },
  ],
  howto: [
    '"Ana renk" alanına marka renginizin ya da üzerinde çalıştığınız rengin HEX kodunu yazın; RGB değerlerini virgülle ayırarak da girebilirsiniz.',
    '"Her yönde ton sayısı" alanında açık ve koyu yönde kaçar ton istediğinizi belirtin. 4 yazarsanız dört açık, dört koyu ton ve ana renkle birlikte dokuz renk elde edersiniz.',
    '"Oluştur" düğmesine basın. Açık ve koyu tonların HEX kodları ayrı satırlarda, CSS değişkenleri ise alttaki kutuda görünür.',
    'CSS bloğunu kopyalayıp stil dosyanızın başına yapıştırın; değişken adlarını projenize göre değiştirebilirsiniz.',
  ],
  sections: [
    { h: 'Açık ton, koyu ton: ne demek?', p: [
      'Bir rengi beyazla karıştırdığınızda elde edilen daha soluk renklere <strong>açık ton</strong> (İngilizce "tint"), siyahla karıştırdığınızda elde edilen daha derin renklere <strong>koyu ton</strong> ("shade") denir. İkisinde de rengin karakteri, yani kırmızı mı mavi mi olduğu korunur; değişen yalnızca ne kadar açık ya da koyu göründüğüdür. Tek bir ana renkten türetilen bu dizi, arayüz tasarımında "renk skalası" olarak adlandırılır.',
      'Bir web sitesi ya da uygulama tek renkle tasarlanamaz. Aynı mavinin çok açık bir tonu bilgi kutusunun zemini, biraz daha koyusu çerçevesi, ana renk düğmesi, daha koyu bir tonu düğmenin üzerine gelindiğindeki hâli, en koyusu ise başlık metni olur. Bu tonların aynı kökten türetilmesi sayfaya tutarlı bir görünüm kazandırır; rastgele seçilmiş beş farklı mavi ise dağınık durur.',
    ] },
    { h: 'Hesaplama yöntemi', p: [
      'Araç doğrusal karışım kullanır. Karışım oranı <em>p</em> (0 ile 1 arası) olmak üzere her kanal için açık ton <strong>kanal + (255 − kanal) × p</strong>, koyu ton <strong>kanal × (1 − p)</strong> formülüyle bulunur ve en yakın tam sayıya yuvarlanır. Adım sayısı <em>n</em> ise oranlar 1 ÷ (n + 1), 2 ÷ (n + 1) … biçiminde ilerler. Paydanın n + 1 olması sayesinde dizinin ucunda saf beyaz ya da saf siyah yer almaz; ürettiğiniz her ton hâlâ ana rengin izini taşır.',
      'Çözümlü örnek: ana renk <code>#3366CC</code>, yani rgb(51, 102, 204), adım sayısı 4. Oranlar %20, %40, %60 ve %80\'dir. İlk açık ton için: 51 + 204 × 0,2 = 91,8 → 92; 102 + 153 × 0,2 = 132,6 → 133; 204 + 51 × 0,2 = 214,2 → 214. Onaltılık yazımla <code>#5C85D6</code> elde edilir. İlk koyu ton için: 51 × 0,8 = 40,8 → 41; 102 × 0,8 = 81,6 → 82; 204 × 0,8 = 163,2 → 163, yani <code>#2952A3</code>. Aracın aynı girdiyle verdiği tam liste açık tonlarda #5C85D6, #85A3E0, #ADC2EB, #D6E0F5; koyu tonlarda #2952A3, #1F3D7A, #142952, #0A1429 biçimindedir.',
    ] },
    { h: 'Kaç adım seçmeli?', p: [
      'Küçük bir site ya da tek sayfalık bir tanıtım için her yönde iki ya da üç ton çoğu zaman yeterlidir. Bileşen kütüphanesi kuruyorsanız dört ya da beş ton, zemin, çerçeve, simge, metin ve etkileşim durumları için rahat bir alan sağlar. Dokuz adım seçildiğinde tonlar %10 aralıklarla ilerler; bu, veri görselleştirmede ısı haritası ya da kademeli harita renklendirmesi gibi ince geçiş gereken işlerde kullanışlıdır.',
      'Gereğinden fazla ton üretmek cazip gelse de kullanılan renk sayısı arttıkça tutarlılık azalır. İyi bir alışkanlık, önce geniş bir skala üretip içinden gerçekten kullanacağınız beş altı tonu seçmek ve yalnızca onları stil dosyasına almaktır.',
    ] },
    { h: 'CSS değişkenleriyle kullanım', p: [
      'Alttaki kutuda <code>:root</code> seçicisi içinde tanımlanmış özel özellikler (CSS değişkenleri) yer alır. <code>--renk</code> ana rengi, <code>--renk-acik-1</code> ana renge en yakın açık tonu, sayı büyüdükçe daha açık tonları gösterir; <code>--renk-koyu-1</code> ve devamı aynı mantıkla koyu yöne gider. Bu bloğu stil dosyanıza ekledikten sonra herhangi bir kuralda <code>background: var(--renk-acik-4);</code> ya da <code>color: var(--renk-koyu-3);</code> yazarak tonları kullanabilirsiniz.',
      'Değişken kullanmanın yararı, marka rengi değiştiğinde tek tek her kuralı düzeltmek yerine yalnızca bu bloğu yeniden üretip değiştirmenin yetmesidir. Birden fazla renk aileniz varsa (örneğin ana renk ve vurgu rengi) her biri için aracı ayrı çalıştırıp değişken adlarındaki "renk" sözcüğünü "ana", "vurgu" gibi adlarla değiştirin.',
    ] },
    { h: 'Sınırlar ve dikkat edilecekler', p: [
      'Doğrusal RGB karışımı basit ve öngörülebilirdir, ancak gözün algısıyla tam örtüşmez. Sarı ve açık yeşil gibi zaten parlak renklerde açık tonlar birbirine çok yakın görünebilir; lacivert ve mor gibi koyu renklerde ise koyu tonlar hızla siyaha yaklaşır. Böyle durumlarda adım sayısını azaltmak ya da yalnızca işinize yarayan uçtaki tonları seçmek daha iyi sonuç verir.',
      'Koyu tonlar üretilirken renk biraz matlaşır; daha canlı koyu tonlar istiyorsanız rengi HSL gösteriminde açıp açıklığı düşürürken doygunluğu koruyabilirsiniz. Ana renk siyahsa koyu tonların tamamı siyah, beyazsa açık tonların tamamı beyaz çıkar; bu beklenen bir sonuçtur.',
      'Ton üretmek erişilebilirliği kendiliğinden sağlamaz. Bir açık ton üzerine ana renkle yazılmış metin okunmayabilir. Zemin ve metin için seçtiğiniz iki tonun kontrast oranını ayrıca ölçün; gövde metninde en az 4,5:1 oranı yaygın kabul gören erişilebilirlik ölçütüdür.',
    ] },
  ],
  faq: [
    ['Açık ton ile koyu ton arasındaki fark nedir?', 'Açık ton rengin beyazla, koyu ton siyahla karıştırılmasıyla elde edilir. Açık tonlar zemin ve vurgu alanlarında, koyu tonlar metin, çerçeve ve basılı durum gibi yerlerde kullanılır.'],
    ['Listede neden saf beyaz ve saf siyah yok?', 'Karışım oranı adım sayısının bir fazlasına bölünerek hesaplanır; böylece en uçtaki ton bile ana rengin izini taşır. Saf beyaz ve siyah her skalada aynı olduğu için ayrıca üretilmez.'],
    ['RGB değeriyle de ton üretebilir miyim?', 'Evet. Ana renk alanına 51, 102, 204 gibi virgülle ayrılmış üç değer yazabilirsiniz. Sonuçlar yine HEX kodu olarak verilir.'],
    ['En fazla kaç ton üretebilirim?', 'Her yönde en fazla 20 ton, yani ana renkle birlikte 41 renk üretilebilir. Uygulamada dört ile dokuz arası adım çoğu ihtiyacı karşılar.'],
    ['Üretilen CSS değişkenlerinin adını değiştirebilir miyim?', 'Elbette. Değişken adları yalnızca öneridir; "renk" sözcüğünü projenizdeki adlandırmaya uygun biçimde değiştirebilirsiniz. Değerler aynı kaldığı sürece sonuç değişmez.'],
    ['Aynı tonları tasarım programımda da kullanabilir miyim?', 'Evet. HEX kodları tasarım programlarının, sunum ve ofis yazılımlarının renk kutularına doğrudan yazılabilir. Kodları kopyalayıp renk paletinize ekleyin.'],
    ['Bu tonlar baskıda da aynı görünür mü?', 'Ekran renkleri baskıda birebir çıkmayabilir; özellikle çok açık tonlar kâğıtta kaybolabilir. Baskı işleri için renkleri matbaanın istediği değerlere çevirip prova almak gerekir.'],
    ['Girdiğim renk bilgisi bir yere gönderiliyor mu?', 'Hayır. Tonlar tarayıcınızda hesaplanır; yazdığınız renk sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['renk-paleti-olustur', 'hex-rgb-cevir', 'rgb-hsl-cevir', 'renk-kontrast-hesapla', 'renk-secici', 'css-gradient'],
};
