export default {
  slug: 'renk-paleti-olustur',
  title: 'Uyumlu Renk Paleti Oluşturma',
  h1Tail: 'renk çemberine göre',
  pageTitle: 'Uyumlu Renk Paleti Oluşturma – Tamamlayıcı, Analog, Üçlü Uyum',
  description: 'Tek bir renkten renk çemberi kurallarına göre uyumlu palet üretin: tamamlayıcı, analog, üçlü, ayrık tamamlayıcı, dörtlü ve tek renkli uyum. HEX ve CSS hazır.',
  card: 'Ana renginize uyan paleti renk çemberi kurallarıyla üretin: tamamlayıcı, analog, üçlü, dörtlü, tek renkli.',
  category: 'gelistirici',
  keywords: ['renk paleti oluşturma', 'uyumlu renkler', 'tamamlayıcı renk bulma', 'renk uyumu', 'analog renkler', 'üçlü renk uyumu', 'renk çemberi', 'color palette generator', 'renk kombinasyonu'],
  lead: 'Ana renginizi yazın ve bir uyum kuralı seçin; araç rengin tonunu renk çemberi üzerinde döndürerek birbirine yakışan renkleri hesaplar. Paleti HEX kodları ve hazır CSS değişkenleri olarak alırsınız.',
  button: 'Oluştur',
  inputs: [
    { id: 'renk', label: 'Ana renk', type: 'text', placeholder: 'Örn. #336699', hint: 'HEX kodu (3 ya da 6 haneli) ya da virgülle ayrılmış RGB değerleri.' },
    { id: 'uyum', label: 'Uyum türü', type: 'select', options: [
      ['tamamlayici', 'Tamamlayıcı (2 renk)'],
      ['analog', 'Analog / komşu (3 renk)'],
      ['uclu', 'Üçlü (3 renk)'],
      ['ayrik', 'Ayrık tamamlayıcı (3 renk)'],
      ['kare', 'Kare dörtlü (4 renk)'],
      ['dikdortgen', 'Dikdörtgen dörtlü (4 renk)'],
      ['tekrenk', 'Tek renkli (5 ton)'],
    ] },
  ],
  compute(v, h) {
    const t = String(v.renk ?? '').trim();
    if (t === '') h.err('"Ana renk" alanını doldurun (örn. #336699).');
    let rgb;
    if (/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(t)) {
      let x = t.replace(/^#/, '');
      if (x.length === 3) x = x.split('').map((k) => k + k).join('');
      rgb = [0, 2, 4].map((i) => parseInt(x.slice(i, i + 2), 16));
    } else {
      const par = t.replace(/^rgb\s*\(/i, '').replace(/\)\s*;?$/, '').split(/[\s,;]+/).filter(Boolean);
      if (par.length !== 3 || par.some((p) => !/^\d+$/.test(p) || Number(p) > 255)) h.err('Rengi HEX kodu (örn. #336699) ya da 0–255 arası üç RGB değeri (örn. 51, 102, 153) olarak yazın.');
      rgb = par.map(Number);
    }
    const [R, G, B] = rgb.map((c) => c / 255);
    const mx = Math.max(R, G, B), mn = Math.min(R, G, B), d = mx - mn;
    const L = (mx + mn) / 2;
    let H = 0;
    if (d > 0) {
      if (mx === R) H = ((G - B) / d) % 6; else if (mx === G) H = (B - R) / d + 2; else H = (R - G) / d + 4;
      H *= 60; if (H < 0) H += 360;
    }
    const S = d === 0 ? 0 : d / (1 - Math.abs(2 * L - 1));
    const iki = (k) => k.toString(16).toUpperCase().padStart(2, '0');
    const hsl2hex = (hh, s, l) => {
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const hp = ((((hh % 360) + 360) % 360) / 60);
      const x = c * (1 - Math.abs((hp % 2) - 1));
      let q;
      if (hp < 1) q = [c, x, 0]; else if (hp < 2) q = [x, c, 0]; else if (hp < 3) q = [0, c, x];
      else if (hp < 4) q = [0, x, c]; else if (hp < 5) q = [x, 0, c]; else q = [c, 0, x];
      const m = l - c / 2;
      return '#' + q.map((k) => iki(Math.min(255, Math.max(0, Math.round((k + m) * 255 + 1e-9))))).join('');
    };
    const tablo = {
      tamamlayici: ['Tamamlayıcı (180°)', [0, 180]],
      analog: ['Analog (±30°)', [0, 30, 330]],
      uclu: ['Üçlü (120° aralıklı)', [0, 120, 240]],
      ayrik: ['Ayrık tamamlayıcı (150° ve 210°)', [0, 150, 210]],
      kare: ['Kare dörtlü (90° aralıklı)', [0, 90, 180, 270]],
      dikdortgen: ['Dikdörtgen dörtlü (60°, 180°, 240°)', [0, 60, 180, 240]],
    };
    const ana = '#' + rgb.map(iki).join('');
    const yuv = (n) => { const r = Math.round(n + 1e-9); return r === 360 ? 0 : r; };
    let ad, renkler, aciklama;
    if (v.uyum === 'tekrenk') {
      ad = 'Tek renkli (açıklık ±15 ve ±30 puan)';
      const ls = [-30, -15, 0, 15, 30].map((k) => Math.min(1, Math.max(0, L + k / 100)));
      renkler = ls.map((l, i) => (i === 2 ? ana : hsl2hex(H, S, l)));
      aciklama = ls.map((l) => 'açıklık %' + h.fmt(l * 100, 0));
    } else {
      const sec = tablo[v.uyum] || tablo.tamamlayici;
      ad = sec[0];
      renkler = sec[1].map((o, i) => (i === 0 ? ana : hsl2hex(H + o, S, L)));
      aciklama = sec[1].map((o) => 'ton ' + yuv((H + o) % 360) + '°');
    }
    const rows = [
      ['Palet', renkler.join(', ')],
      ['Uyum türü', ad],
      ['Ana rengin HSL değeri', `hsl(${yuv(H)}, ${Math.round(S * 100 + 1e-9)}%, ${Math.round(L * 100 + 1e-9)}%)`],
    ];
    renkler.forEach((c, i) => rows.push(['Renk ' + (i + 1), c + ' (' + aciklama[i] + ')']));
    const text = ':root {\n' + renkler.map((c, i) => '  --palet-' + (i + 1) + ': ' + c + ';').join('\n') + '\n}';
    const gri = S < 1e-9;
    return {
      rows, text,
      note: gri && v.uyum !== 'tekrenk'
        ? 'Ana renk gri tonunda (doygunluğu sıfır) olduğu için tonu döndürmek rengi değiştirmez. Renkli bir ana renk seçin ya da "Tek renkli" uyumu kullanın.'
        : 'Renkler, ana rengin doygunluğu ve açıklığı korunarak tonunun renk çemberinde döndürülmesiyle (HSL) hesaplanır.',
    };
  },
  cases: [
    { in: { renk: '#336699', uyum: 'tamamlayici' }, out: { 'Palet': '#336699, #996633', 'Ana rengin HSL değeri': 'hsl(210, 50%, 40%)', 'Renk 2': '#996633 (ton 30°)' }, text: ':root {\n  --palet-1: #336699;\n  --palet-2: #996633;\n}' },
    { in: { renk: '#336699', uyum: 'uclu' }, out: { 'Palet': '#336699, #993366, #669933', 'Renk 2': '#993366 (ton 330°)', 'Renk 3': '#669933 (ton 90°)' } },
    { in: { renk: '#FF0000', uyum: 'tamamlayici' }, out: { 'Palet': '#FF0000, #00FFFF' } },
    { in: { renk: 'f00', uyum: 'kare' }, out: { 'Palet': '#FF0000, #80FF00, #00FFFF, #8000FF' } },
    { in: { renk: '255, 0, 0', uyum: 'analog' }, out: { 'Palet': '#FF0000, #FF8000, #FF0080' } },
    { in: { renk: '#FF0000', uyum: 'ayrik' }, out: { 'Palet': '#FF0000, #00FF80, #0080FF' } },
    { in: { renk: '#FF0000', uyum: 'dikdortgen' }, out: { 'Palet': '#FF0000, #FFFF00, #00FFFF, #0000FF' } },
    { in: { renk: '#FF0000', uyum: 'tekrenk' }, out: { 'Palet': '#660000, #B30000, #FF0000, #FF4D4D, #FF9999', 'Renk 1': '#660000 (açıklık %20)' } },
    { in: { renk: '#12345', uyum: 'tamamlayici' }, error: true },
    { in: { renk: '', uyum: 'uclu' }, error: true },
    { in: { renk: '300, 0, 0', uyum: 'analog' }, error: true },
  ],
  howto: [
    '"Ana renk" alanına logonuzun, markanızın ya da tasarımın çıkış noktası olan rengin HEX kodunu yazın.',
    '"Uyum türü" listesinden bir kural seçin. Kararsızsanız önce "Tamamlayıcı" ve "Analog" seçeneklerini deneyin; biri kontrast, diğeri sakinlik verir.',
    '"Oluştur" düğmesine basın. Paletin tamamı ilk satırda, her rengin ton açısı ayrı satırlarda görünür.',
    'Alttaki kutudan CSS değişkenlerini kopyalayın ya da HEX kodlarını tasarım programınızın renk paletine ekleyin.',
    'Farklı uyum türlerini sırayla deneyerek aynı ana renk için seçenekleri karşılaştırın.',
  ],
  sections: [
    { h: 'Renk uyumu nedir?', p: [
      'Renk uyumu, yan yana geldiğinde göze dengeli ve bilinçli seçilmiş görünen renk birlikteliğidir. Ressamların ve tasarımcıların uzun zamandır kullandığı yöntem, renkleri bir çember üzerine dizmek ve aralarındaki açıya göre seçmektir. Çemberde kırmızı 0°, sarı 60°, yeşil 120°, camgöbeği 180°, mavi 240° ve macenta 300° noktasında durur. Bir rengin karşısındaki, yanındaki ya da eşit aralıklı noktalardaki renkler onunla öngörülebilir ilişkiler kurar.',
      'Bu araç ana rengi önce HSL gösterimine çevirir, yani ton açısını, doygunluğunu ve açıklığını bulur. Sonra yalnızca ton açısını seçilen kurala göre döndürür; doygunluk ve açıklık aynı kalır. Böylece üretilen renkler ana renkle aynı "ağırlıkta" olur: pastel bir renkten pastel, koyu bir renkten koyu bir palet çıkar.',
    ] },
    { h: 'Uyum türleri ve ne zaman kullanılır', ul: [
      '<strong>Tamamlayıcı</strong>: çemberin tam karşısındaki renk (180°). En yüksek kontrastı verir; çağrı düğmesi, indirim etiketi gibi dikkat çekmesi gereken tek bir öğe için idealdir.',
      '<strong>Analog</strong>: ana rengin 30° sağındaki ve solundaki komşular. Doğada sık görülen, sakin ve bütünlüklü bir görünüm verir; arka planlar ve geniş yüzeyler için uygundur.',
      '<strong>Üçlü</strong>: 120° aralıklı üç renk. Canlı ve dengelidir; çocuk ürünleri, eğlence ve oyun temalı tasarımlarda sık kullanılır.',
      '<strong>Ayrık tamamlayıcı</strong>: tam karşıdaki rengin iki komşusu (150° ve 210°). Tamamlayıcı uyumun kontrastını korur ama daha yumuşaktır; yeni başlayanlar için güvenli bir seçimdir.',
      '<strong>Kare dörtlü</strong>: 90° aralıklı dört renk. Zengin bir palet sunar; renklerden biri baskın, diğerleri vurgu olarak kullanılmalıdır.',
      '<strong>Dikdörtgen dörtlü</strong>: iki tamamlayıcı çiftten oluşan dört renk (0°, 60°, 180°, 240°). Sıcak ve soğuk renkleri bir arada dengelemeye yarar.',
      '<strong>Tek renkli</strong>: aynı tonun beş farklı açıklığı. En risksiz palettir; kurumsal ve sade arayüzlerde tercih edilir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Ana renk <code>#336699</code> olsun. RGB karşılığı (51, 102, 153), HSL karşılığı ise <code>hsl(210, 50%, 40%)</code>\'tır: 210° tonunda, orta doygunlukta, biraz koyu bir mavi. <strong>Tamamlayıcı</strong> renk için tona 180 eklenir: 210 + 180 = 390, çember 360\'ta başa döndüğü için 30°. <code>hsl(30, 50%, 40%)</code> rengi RGB\'ye çevrilince (153, 102, 51), yani <code>#996633</code> elde edilir: mavinin karşısındaki sıcak kahverengi-turuncu.',
      'Aynı ana renk için <strong>üçlü</strong> uyumda tonlar 210°, 330° ve 90° olur. 330° tonu <code>#993366</code> (koyu pembe-bordo), 90° tonu <code>#669933</code> (zeytin yeşili) verir. Üç rengin HEX kodlarındaki 33, 66 ve 99 değerlerinin yalnızca yer değiştirdiğine dikkat edin; ton döndürmenin kanallar üzerindeki etkisi bu örnekte açıkça görülür. Araç aynı girdilerle tam olarak bu sonuçları üretir.',
    ] },
    { h: 'Paleti tasarımda kullanma: 60-30-10 kuralı', p: [
      'Uyumlu renkleri bulmak işin yarısıdır; diğer yarısı onları doğru oranda kullanmaktır. İç mimariden gelen ve arayüz tasarımında da işe yarayan pratik bir kural şöyledir: yüzeyin yaklaşık yüzde 60\'ı baskın (çoğunlukla nötr ya da açık) renk, yüzde 30\'u ikincil renk, yüzde 10\'u vurgu rengi olsun. Tamamlayıcı uyumda ana rengi ikincil, karşı rengi vurgu olarak kullanmak iyi sonuç verir. Tüm renkleri eşit ağırlıkta kullanmak, özellikle üçlü ve dörtlü uyumlarda sayfayı yorucu hâle getirir.',
      'Paletteki renkler aynı doygunluk ve açıklıkta üretildiği için metin ve zemin olarak doğrudan yan yana kullanıldıklarında okunabilirlik düşük olabilir. Her rengin açık ve koyu tonlarını ayrıca üretip zemin için açık, metin için koyu tonları seçmek gerekir.',
    ] },
    { h: 'Sınırlar ve dikkat edilecekler', p: [
      'Hesap, CSS\'in kullandığı HSL renk çemberine göre yapılır. Bu çemberde tamamlayıcı çiftler kırmızı–camgöbeği, yeşil–macenta ve mavi–sarıdır. Resim derslerinde öğretilen geleneksel boya çemberinde ise kırmızının karşısında yeşil, mavinin karşısında turuncu yer alır. İki çember farklı karışım mantığına dayandığından sonuçlar ayrışabilir; ekran tasarımı için HSL çemberi ölçüdür.',
      'Gri, siyah ve beyaz gibi doygunluğu sıfır olan renklerin tonu yoktur; bu renklerde ton döndürmek sonucu değiştirmez ve palet aynı griyi tekrarlar. Araç bu durumda not düşer. Ayrıca HSL açıklığı gözün algıladığı parlaklıkla birebir örtüşmez: aynı açıklıktaki sarı, maviden çok daha parlak görünür. Paleti üretildiği gibi almak yerine gözle kontrol edip gerekirse açıklığı ayarlamak iyi bir alışkanlıktır.',
      'Renklerin taşıdığı anlam kültüre ve sektöre göre değişir; uyum kuralları bir rengin markanıza uygun olup olmadığını söylemez, yalnızca birbirleriyle ilişkisini düzenler. Renk körlüğü olan kullanıcılar için bilgiyi yalnızca renkle değil, simge ya da metinle de vermeyi unutmayın.',
    ] },
  ],
  faq: [
    ['Tamamlayıcı renk nasıl bulunur?', 'Rengin HSL ton açısına 180 derece eklenir; sonuç 360\'ı aşarsa 360 çıkarılır. Örneğin 210° tonundaki mavinin tamamlayıcısı 30° tonundaki turuncudur. RGB üzerinden kısa yol da vardır: tam doygun renklerde her kanal 255\'ten çıkarılır.'],
    ['Hangi uyum türünü seçmeliyim?', 'Sade ve güvenli bir sonuç için tek renkli ya da analog; bir öğeyi öne çıkarmak için tamamlayıcı; canlı ama dengeli bir görünüm için ayrık tamamlayıcı uygundur. Üçlü ve dörtlü uyumlar daha cesurdur ve renklerden birinin baskın tutulmasını gerektirir.'],
    ['Paletteki renklerin hepsini eşit kullanmalı mıyım?', 'Hayır. Bir rengi baskın, diğerlerini destekleyici ve vurgu olarak kullanmak daha dengeli görünür. 60-30-10 oranı iyi bir başlangıç noktasıdır.'],
    ['Gri bir renk girdiğimde neden aynı renk tekrarlanıyor?', 'Gri tonlarının doygunluğu sıfırdır ve bir ton açısı taşımaz. Ton döndürüldüğünde renk değişmez. Renkli bir ana renk seçin ya da tek renkli uyumla açık-koyu tonlar üretin.'],
    ['Resim dersinde öğrendiğim tamamlayıcı renklerle sonuç neden farklı?', 'Geleneksel boya çemberi kırmızı, sarı ve maviyi ana renk kabul eder; ekranlar ise kırmızı, yeşil ve mavi ışıkla çalışır. Bu araç ekran renkleri için geçerli olan HSL çemberini kullanır.'],
    ['Üretilen palet erişilebilirlik ölçütlerini karşılar mı?', 'Kendiliğinden karşılamaz. Uyum kuralları estetik ilişkiyi düzenler, okunabilirliği değil. Metin ve zemin olarak kullanacağınız iki rengin kontrast oranını ayrıca ölçmeniz gerekir.'],
    ['CSS değişkenlerini nasıl kullanırım?', 'Kutudaki bloğu stil dosyanıza yapıştırın; ardından herhangi bir kuralda var(--palet-1), var(--palet-2) biçiminde çağırın. Değişken adlarını projenize uygun biçimde değiştirebilirsiniz.'],
    ['Girdiğim renkler bir yere kaydediliyor mu?', 'Hayır. Palet tarayıcınızda hesaplanır; yazdığınız renk sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['renk-tonu-olustur', 'rgb-hsl-cevir', 'hex-rgb-cevir', 'renk-kontrast-hesapla', 'resimden-renk-paleti', 'renk-secici'],
};
