export default {
  slug: 'json-kucult',
  title: 'JSON Küçültme (Minify)',
  h1Tail: 'tek satıra sıkıştır',
  pageTitle: 'JSON Küçültme (Minify) – Online JSON Sıkıştırma ve Doğrulama',
  description: 'JSON verinizi doğrulayıp tek satıra küçültün: girinti ve satır sonları silinir, değerler değişmez. Kazanılan bayt gösterilir; veri tarayıcınızdan çıkmaz.',
  card: 'JSON metnini doğrulayın ve girintileri silerek tek satıra indirin; isterseniz anahtarları alfabetik sıralayın.',
  category: 'gelistirici',
  keywords: ['json küçültme', 'json minify', 'json sıkıştırma', 'json tek satır', 'json boşluk silme', 'json minifier online', 'json doğrulama'],
  lead: 'Girintili, çok satırlı JSON metnini yapıştırın; araç önce geçerli olup olmadığını denetler, sonra anlam taşımayan bütün boşlukları silerek <strong>tek satırlık küçültülmüş JSON</strong> üretir. Kaç bayt kazandığınızı da gösterir.',
  button: 'Küçült',
  inputs: [
    { id: 'json', label: 'JSON metni', type: 'textarea', rows: 10, placeholder: '{\n  "ad": "Ali",\n  "yas": 30\n}' },
    { id: 'sira', label: 'Anahtar sırası', type: 'select', options: [['koru', 'Olduğu gibi koru'], ['sirala', 'Alfabetik sırala']] },
  ],
  compute(v, h) {
    const s = String(v.json ?? '').replace(/^﻿/, '');
    if (s.trim() === '') h.err('Küçültülecek JSON metnini "JSON metni" alanına yapıştırın.');
    let veri;
    try { veri = JSON.parse(s); }
    catch (e) {
      const m = /position (\d+)/.exec(String(e && e.message));
      if (m) {
        const k = Math.min(Number(m[1]), s.length);
        const once = s.slice(0, k).split('\n');
        h.err(`Metin geçerli bir JSON değil: ${once.length}. satır, ${once[once.length - 1].length + 1}. karakter civarında söz dizimi hatası var. Tırnakları, virgülleri ve parantezleri denetleyin.`);
      }
      h.err('Metin geçerli bir JSON değil. Anahtarların çift tırnak içinde olduğunu, sonda fazladan virgül kalmadığını ve parantezlerin kapandığını denetleyin.');
    }
    let o;
    if (v.sira === 'sirala') {
      const sirala = (x) => {
        if (Array.isArray(x)) return x.map(sirala);
        if (x && typeof x === 'object') {
          const y = {};
          for (const k of Object.keys(x).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))) y[k] = sirala(x[k]);
          return y;
        }
        return x;
      };
      o = JSON.stringify(sirala(veri));
    } else {
      // Sayıların yazımını (1.50, 1e3) bozmamak için metin üzerinde, dizgilerin dışındaki boşlukları sil
      o = '';
      let dizgi = false;
      for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (dizgi) {
          o += c;
          if (c === '\\') { o += s[i + 1] ?? ''; i++; }
          else if (c === '"') dizgi = false;
        } else if (c === '"') { dizgi = true; o += c; }
        else if (c !== ' ' && c !== '\n' && c !== '\r' && c !== '\t') o += c;
      }
    }
    const tur = veri === null ? 'null' : Array.isArray(veri) ? `dizi (${veri.length} öğe)` : typeof veri === 'object' ? `nesne (${Object.keys(veri).length} anahtar)` : typeof veri === 'string' ? 'dizgi' : typeof veri === 'number' ? 'sayı' : 'mantıksal değer';
    const bayt = (t) => new TextEncoder().encode(t).length;
    const b1 = bayt(s), b2 = bayt(o);
    return {
      rows: [
        ['Küçültülmüş boyut', h.fmt(b2, 0) + ' bayt'],
        ['Özgün boyut', h.fmt(b1, 0) + ' bayt'],
        ['Kazanç', '%' + h.fmt((b1 - b2) / b1 * 100, 1) + ' (' + h.fmt(b1 - b2, 0) + ' bayt)'],
        ['Kök değer', tur],
      ],
      text: o,
      note: v.sira === 'sirala'
        ? 'Anahtarlar alfabetik sıralandı. Bu kipte sayılar yeniden yazılır (1.50 → 1.5); çok büyük tam sayılar duyarlılık kaybedebilir.'
        : 'JSON geçerli. Yalnızca dizgilerin dışındaki boşluklar silindi; değerler ve anahtar sırası değişmedi.',
    };
  },
  cases: [
    { in: { json: '{\n  "ad": "Ali",\n  "yas": 30\n}' }, text: '{"ad":"Ali","yas":30}', out: { 'Kök değer': 'nesne (2 anahtar)', 'Özgün boyut': '30 bayt', 'Küçültülmüş boyut': '21 bayt', 'Kazanç': '%30 (9 bayt)' } },
    { in: { json: '[ 1, 2 , 3 ]' }, text: '[1,2,3]', out: { 'Özgün boyut': '12 bayt', 'Küçültülmüş boyut': '7 bayt', 'Kazanç': '%41,7 (5 bayt)', 'Kök değer': 'dizi (3 öğe)' } },
    { in: { json: '{ "a b" : "c  d", "e": [ true, null ] }' }, text: '{"a b":"c  d","e":[true,null]}' },
    { in: { json: '{"b":1,"a":{"d":2,"c":3}}', sira: 'sirala' }, text: '{"a":{"c":3,"d":2},"b":1}' },
    { in: { json: '{ "x": 1.50, "y": 1e3 }' }, text: '{"x":1.50,"y":1e3}' },
    { in: { json: '{ "t" : "a \\" b" }' }, text: '{"t":"a \\" b"}' },
    { in: { json: '{ad: 1}' }, error: true },
    { in: { json: '[1, 2,]' }, error: true },
    { in: { json: '' }, error: true },
  ],
  howto: [
    'Küçültmek istediğiniz JSON metnini kopyalayıp "JSON metni" alanına yapıştırın.',
    '"Anahtar sırası" listesinden anahtarların olduğu gibi mi kalacağını, yoksa alfabetik mi sıralanacağını seçin. Emin değilseniz "Olduğu gibi koru" seçeneğinde bırakın.',
    '"Küçült" düğmesine basın. Metin geçerliyse tek satırlık sonuç kutuda görünür; geçersizse hatanın bulunduğu satır ve karakter bildirilir.',
    '"Sonucu kopyala" ile küçültülmüş JSON\'u alın ve yapılandırma dosyanıza, API isteğinize ya da veritabanı alanınıza yapıştırın.',
  ],
  sections: [
    { h: 'JSON küçültme ne yapar?', p: [
      'JSON, veriyi anahtar ve değer çiftleriyle taşıyan sade bir metin biçimidir. Okunaklı olsun diye çoğunlukla girintili ve çok satırlı yazılır; ancak biçimin kuralına göre süslü parantez, köşeli parantez, virgül ve iki nokta üst üste çevresindeki boşluk, sekme ve satır sonları hiçbir anlam taşımaz. Küçültme, bu anlamsız karakterlerin tamamını atarak veriyi tek satıra indirir. Ayrıştırıldığında ortaya çıkan veri birebir aynıdır.',
      'Dikkat edilen tek istisna dizgilerin içidir. <code>"c  d"</code> değerindeki iki boşluk verinin parçasıdır ve silinirse değer değişir. Araç çift tırnak içindeki her karakteri, ters eğik çizgiyle kaçırılmış tırnaklar dahil, aynen korur.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Dört satıra yazılmış şu nesneyi düşünün: <code>{</code>, ardından iki boşluk girintiyle <code>"ad": "Ali",</code>, yine iki boşluk girintiyle <code>"yas": 30</code> ve son satırda <code>}</code>. Bu metin 30 bayttır. Küçültüldüğünde <code>{"ad":"Ali","yas":30}</code> elde edilir ve 21 bayt tutar. Silinen 9 bayt; üç satır sonu, dört girinti boşluğu ve iki noktalardan sonraki iki boşluktur. Kazanç tam olarak %30\'dur.',
      'İkinci örnek: <code>[ 1, 2 , 3 ]</code> metni 12 bayttır, küçültülmüş hâli <code>[1,2,3]</code> ise 7 bayt; kazanç %41,7 olur. Gerçek verilerde oran, girinti derinliğine bağlıdır: iç içe çok katmanlı nesnelerde her satırın başındaki boşluklar birikir ve kazanç yükselir, tek düzeyli kısa nesnelerde daha düşük kalır.',
    ] },
    { h: 'Nerede işe yarar?', ul: [
      '<strong>API istekleri ve yanıtları:</strong> ağ üzerinden giden gövde ne kadar küçükse aktarım o kadar hızlıdır; mobil uygulamalarda veri kullanımını da azaltır.',
      '<strong>Tek satır bekleyen alanlar:</strong> ortam değişkenleri, komut satırı parametreleri, günlük (log) satırları ve bazı yönetim panellerindeki ayar kutuları çok satırlı metni kabul etmez.',
      '<strong>Veritabanında metin olarak saklama:</strong> JSON\'u bir metin sütununda tutuyorsanız küçültülmüş hâli daha az yer kaplar.',
      '<strong>HTML içine gömme:</strong> yapılandırılmış veri (JSON-LD) ya da sayfaya gömülü başlangıç verisi küçültülerek sayfa boyutu azaltılabilir.',
      '<strong>Hızlı doğrulama:</strong> elle düzenlediğiniz bir ayar dosyasının bozulup bozulmadığını görmek için yapıştırmanız yeter; hata varsa yeri söylenir.',
    ] },
    { h: 'Anahtar sıralama seçeneği ve sayıların korunması', p: [
      'Varsayılan kipte araç metni yeniden üretmez, yalnızca boşlukları ayıklar. Bu sayede <code>1.50</code> gibi sondaki sıfırı önemli olabilecek tutarlar, <code>1e3</code> gibi üstel yazımlar ve JavaScript\'in güvenle tutamayacağı kadar büyük kimlik numaraları (on altı basamaktan uzun tam sayılar) harfi harfine korunur. Aynı anahtar iki kez yazılmışsa o da dokunulmadan kalır.',
      '"Alfabetik sırala" seçildiğinde veri ayrıştırılıp yeniden yazılır. Böylece iki JSON\'u satır satır karşılaştırmak ya da sürüm denetiminde anlamlı farklar görmek kolaylaşır. Bu kipin bedeli, sayıların standart biçime dönmesidir: <code>1.50</code> değeri <code>1.5</code>, <code>1e3</code> değeri <code>1000</code> olur; çok büyük tam sayılar yuvarlanabilir ve yinelenen anahtarlardan yalnızca sonuncusu kalır. Dizilerin öğe sırası ise veri taşıdığı için hiçbir kipte değiştirilmez.',
    ] },
    { h: 'En sık karşılaşılan JSON hataları', ul: [
      '<strong>Tırnaksız ya da tek tırnaklı anahtar:</strong> <code>{ad: 1}</code> ve <code>{\'ad\': 1}</code> JavaScript\'te geçerli olsa da JSON değildir; anahtarlar çift tırnak içinde olmalıdır.',
      '<strong>Sondaki virgül:</strong> <code>[1, 2,]</code> ya da son özelliğin ardından gelen virgül JSON\'da yasaktır.',
      '<strong>Yorum satırı:</strong> JSON yorumu desteklemez; <code>//</code> ve <code>/* */</code> içeren dosyalar hata verir.',
      '<strong>Tanımsız değerler:</strong> <code>undefined</code>, <code>NaN</code> ve <code>Infinity</code> JSON\'da yoktur; yerine <code>null</code> kullanılır.',
      '<strong>Kapanmayan parantez ya da tırnak:</strong> kopyalarken metnin sonu kesildiyse hata, metnin son karakterinde bildirilir.',
      '<strong>Dizgi içinde ham satır sonu:</strong> çok satırlı metin <code>\\n</code> kaçış dizisiyle yazılmalıdır.',
    ] },
    { h: 'Küçültme ile sıkıştırma arasındaki fark', p: [
      'Küçültme, metni hâlâ geçerli ve doğrudan okunabilir bir JSON olarak bırakır; herhangi bir açma adımı gerekmez. Gzip gibi sıkıştırma yöntemleri ise veriyi ikili bir biçime çevirir ve alıcının açmasını gerektirir. İkisi birbirinin alternatifi değildir: sunucunuz yanıtları sıkıştırıyor olsa bile küçültülmüş JSON göndermek toplam boyutu bir miktar daha azaltır. Bu sayfadaki bayt değerleri UTF-8 kodlamasına göre hesaplanır; Türkçe harfler (ç, ğ, ı, ö, ş, ü) ikişer bayt sayılır.',
    ] },
  ],
  faq: [
    ['JSON küçültmek veriyi değiştirir mi?', 'Hayır. Varsayılan kipte yalnızca dizgilerin dışındaki boşluk, sekme ve satır sonları silinir. Anahtarlar, değerler, sıralama ve sayıların yazımı aynen kalır; ayrıştırıldığında özgün metinle aynı veri elde edilir.'],
    ['Küçültülmüş JSON\'u tekrar okunaklı hâle getirebilir miyim?', 'Evet. Küçültme geri alınabilir bir işlemdir; bir JSON biçimlendirici ile girintili hâle dönebilirsiniz. Hiçbir bilgi kaybolmaz, çünkü silinen şey yalnızca biçimsel boşluktur.'],
    ['Geçersiz JSON yapıştırırsam ne olur?', 'Araç küçültme yapmaz ve hatanın bulunduğu satır ile karakter konumunu bildirir. En yaygın nedenler tırnaksız anahtarlar, sondaki virgül ve kapanmamış parantezlerdir.'],
    ['Anahtarları sıralamak güvenli mi?', 'JSON nesnelerinde anahtar sırası biçimin kuralına göre anlam taşımaz, bu yüzden çoğu kullanımda güvenlidir. Yine de bazı sistemler sıraya bel bağlayabilir ve sıralama kipinde sayılar yeniden yazılır; bu nedenle varsayılan seçenek sırayı korumaktır.'],
    ['Büyük sayılar bozulur mu?', '"Olduğu gibi koru" kipinde bozulmaz, çünkü sayılar metin olarak aktarılır. "Alfabetik sırala" kipinde ise on altı basamaktan uzun tam sayılar yuvarlanabilir; böyle veriler için varsayılan kipi kullanın.'],
    ['Türkçe karakterler korunuyor mu?', 'Evet. Dizgilerin içeriğine dokunulmadığı için Türkçe harfler olduğu gibi kalır. Boyut hesabında bu harfler UTF-8 kodlamasında ikişer bayt olarak sayılır.'],
    ['Kazanç neden bazen düşük çıkıyor?', 'Metniniz zaten sıkışık yazılmışsa ya da uzun dizgilerden oluşuyorsa silinecek boşluk azdır. Kazanç esas olarak girinti derinliğinden ve satır sayısından gelir.'],
    ['Yapıştırdığım veri bir yere kaydediliyor mu?', 'Hayır. Doğrulama ve küçültme tamamen tarayıcınızda yapılır; JSON metniniz sunucuya gönderilmez. Yine de parola ve erişim anahtarı içeren dosyaları paylaşılan bilgisayarlarda açık bırakmamaya özen gösterin.'],
  ],
  related: ['json-bicimlendir', 'json-kacis', 'json-yaml-donustur', 'json-xml-donustur', 'csv-json-donustur', 'css-kucult'],
};
