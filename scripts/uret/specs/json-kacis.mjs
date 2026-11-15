export default {
  slug: 'json-kacis',
  title: 'JSON Kaçış (Escape) ve Geri Alma',
  h1Tail: 'escape / unescape',
  pageTitle: 'JSON Kaçış (Escape) ve Geri Alma – JSON String Escape Aracı',
  description: 'Metni JSON dizgisine güvenle yerleştirilecek biçime çevirin ya da kaçışlı JSON dizgisini düz metne geri alın. Tırnak, ters eğik çizgi, satır sonu ve \\uXXXX.',
  card: 'Metni JSON değeri olarak kaçışlayın ya da \\" ve \\n içeren JSON dizgisini okunur metne geri çevirin.',
  category: 'gelistirici',
  keywords: ['json escape', 'json kaçış', 'json unescape', 'json string escape', 'json tırnak kaçırma', 'json içinde json', 'json ters eğik çizgi'],
  lead: 'Bir metni JSON içinde değer olarak kullanmak için çift tırnakların, ters eğik çizgilerin ve satır sonlarının kaçışlanması gerekir. Bu araç metni <strong>JSON standardına uygun</strong> biçimde kaçışlar; tersine, kaçışlı bir JSON dizgisini düz metne çevirir.',
  button: 'Dönüştür',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Kaçışlanacak metni ya da çözülecek JSON dizgisini yapıştırın' },
    { id: 'yon', label: 'İşlem', type: 'select', options: [['kacis', 'Kaçışla (metin → JSON dizgisi)'], ['geri', 'Geri al (JSON dizgisi → metin)']] },
    { id: 'sarmala', label: 'Çift tırnak içine al', type: 'select', options: [['hayir', 'Hayır, yalnızca içerik'], ['evet', 'Evet, "…" olarak ver']], hint: 'Yalnızca kaçışlarken uygulanır.' },
    { id: 'ascii', label: 'ASCII dışı karakterler', type: 'select', options: [['koru', 'Olduğu gibi bırak (ç, ş, ğ…)'], ['kacis', '\\uXXXX biçimine çevir']] },
    { id: 'egik', label: 'Eğik çizgi ( / )', type: 'select', options: [['koru', 'Olduğu gibi bırak'], ['kacis', '\\/ olarak kaçışla']] },
  ],
  compute(v, h) {
    const s = String(v.metin ?? '');
    if (s === '') h.err('"Metin" alanına dönüştürülecek metni yazın.');
    const hex4 = (n) => n.toString(16).toUpperCase().padStart(4, '0');
    let out = '';
    let adet = 0;
    if (v.yon === 'geri') {
      let t = s;
      const kirp = t.trim();
      if (kirp.length >= 2 && kirp[0] === '"' && kirp[kirp.length - 1] === '"') {
        // Sondaki tırnak kaçışlı mı? Öncesindeki ters eğik çizgileri say
        let n = 0;
        for (let i = kirp.length - 2; i >= 1 && kirp[i] === '\\'; i--) n++;
        if (n % 2 === 0) t = kirp.slice(1, -1);
      }
      const basit = { '"': '"', '\\': '\\', '/': '/', b: '\b', f: '\f', n: '\n', r: '\r', t: '\t' };
      for (let i = 0; i < t.length; i++) {
        const c = t[i];
        if (c === '"') h.err(`${i + 1}. karakterde kaçışlanmamış çift tırnak var; JSON dizgisinin içinde tırnak \\" olarak yazılmalıdır.`);
        if (c !== '\\') { out += c; continue; }
        const d = t[i + 1];
        if (d === undefined) h.err('Metin tek başına bir ters eğik çizgiyle bitiyor; sondaki \\ işaretini silin ya da \\\\ olarak yazın.');
        adet++;
        if (d === 'u') {
          const hx = t.slice(i + 2, i + 6);
          if (!/^[0-9a-fA-F]{4}$/.test(hx)) h.err(`${i + 1}. karakterdeki \\u dizisi geçersiz; \\u ardından dört onaltılık basamak gelmelidir (örn. \\u00E7).`);
          out += String.fromCharCode(parseInt(hx, 16)); i += 5; continue;
        }
        if (!Object.prototype.hasOwnProperty.call(basit, d)) h.err(`${i + 1}. karakterdeki \\${d} dizisi JSON'da geçerli değil. Geçerli kaçışlar: \\" \\\\ \\/ \\b \\f \\n \\r \\t ve \\uXXXX.`);
        out += basit[d]; i += 1;
      }
    } else {
      for (let i = 0; i < s.length; i++) {
        const c = s[i];
        const k = s.charCodeAt(i);
        let e = null;
        if (c === '"') e = '\\"';
        else if (c === '\\') e = '\\\\';
        else if (c === '\n') e = '\\n';
        else if (c === '\r') e = '\\r';
        else if (c === '\t') e = '\\t';
        else if (c === '\b') e = '\\b';
        else if (c === '\f') e = '\\f';
        else if (k < 0x20) e = '\\u' + hex4(k);
        else if (c === '/' && v.egik === 'kacis') e = '\\/';
        else if (k > 0x7E && v.ascii === 'kacis') e = '\\u' + hex4(k);
        if (e === null) out += c; else { out += e; adet++; }
      }
      if (v.sarmala === 'evet') out = '"' + out + '"';
    }
    return {
      rows: [
        [v.yon === 'geri' ? 'Çözülen kaçış dizisi' : 'Kaçışlanan karakter', String(adet)],
        ['Girdi uzunluğu', `${s.length} karakter`],
        ['Çıktı uzunluğu', `${out.length} karakter`],
      ],
      text: out,
      note: v.yon === 'geri' ? 'Metin çift tırnakla başlayıp bitiyorsa dış tırnaklar atılır. Gerçek satır sonları hoşgörüyle olduğu gibi aktarılır.' : 'Çıktı, JSON belgesinde iki çift tırnak arasına yazılmaya hazırdır.',
    };
  },
  cases: [
    { in: { metin: 'O dedi ki: "Merhaba"\nYol: C:\\temp', yon: 'kacis' }, out: { 'Kaçışlanan karakter': '4' }, text: 'O dedi ki: \\"Merhaba\\"\\nYol: C:\\\\temp' },
    { in: { metin: '"Sat\\u0131r 1\\nSat\\u0131r 2\\t\\"son\\""', yon: 'geri' }, out: { 'Çözülen kaçış dizisi': '6' }, text: 'Satır 1\nSatır 2\t"son"' },
    { in: { metin: '{"ad":"Ayşe","yas":30}', yon: 'kacis', sarmala: 'evet' }, out: { 'Kaçışlanan karakter': '6' }, text: '"{\\"ad\\":\\"Ayşe\\",\\"yas\\":30}"' },
    { in: { metin: 'şey', yon: 'kacis', ascii: 'kacis' }, text: '\\u015Fey' },
    { in: { metin: 'a/b', yon: 'kacis', egik: 'kacis' }, text: 'a\\/b' },
    { in: { metin: '{\\"ad\\":\\"Ay\\u015Fe\\"}', yon: 'geri' }, text: '{"ad":"Ayşe"}' },
    { in: { metin: 'a\\/b \\\\ c', yon: 'geri' }, out: { 'Çıktı uzunluğu': '7 karakter' }, text: 'a/b \\ c' },
    { in: { metin: 'deneme \\x41', yon: 'geri' }, error: true },
    { in: { metin: 'ortada "tırnak" var', yon: 'geri' }, error: true },
    { in: { metin: '', yon: 'kacis' }, error: true },
  ],
  howto: [
    '"Metin" kutusuna kaçışlamak istediğiniz düz metni ya da çözmek istediğiniz JSON dizgisini yapıştırın.',
    '"İşlem" listesinden yönü seçin. "Kaçışla" metni JSON değerine, "Geri al" kaçışlı dizgiyi okunur metne çevirir.',
    'Sonucu doğrudan bir değer olarak yapıştıracaksanız "Çift tırnak içine al" seçeneğini açın; mevcut tırnakların arasına yazacaksanız kapalı bırakın.',
    'Çıktının yalnızca ASCII karakter içermesi gerekiyorsa Türkçe harflerin <code>\\uXXXX</code> olarak yazılmasını, HTML içine gömecekseniz eğik çizginin kaçışlanmasını seçebilirsiniz.',
    '"Dönüştür" düğmesine basın, sonucu kopyalayıp JSON dosyanıza, API isteğinize ya da yapılandırma alanına yapıştırın.',
  ],
  sections: [
    { h: 'JSON dizgilerinde hangi karakterler kaçışlanır?', p: [
      'JSON\'da dizgiler yalnızca çift tırnak arasına yazılır ve standart, iki grup karakterin kaçışlanmasını zorunlu tutar: çift tırnak ile ters eğik çizgi ve kodu 32\'den küçük olan denetim karakterleri (satır başı, sekme, satır dönüşü gibi). Bunların dışındaki her Unicode karakter, Türkçe harfler de dâhil, olduğu gibi yazılabilir.',
    ], ul: [
      '<code>\\"</code> çift tırnak',
      '<code>\\\\</code> ters eğik çizgi',
      '<code>\\n</code> satır başı, <code>\\r</code> satır dönüşü, <code>\\t</code> sekme',
      '<code>\\b</code> geri silme, <code>\\f</code> sayfa besleme',
      '<code>\\uXXXX</code> dört onaltılık basamakla herhangi bir UTF-16 kod birimi; kısa adı olmayan denetim karakterleri bu biçimde yazılır',
      '<code>\\/</code> eğik çizgi; kaçışlamak isteğe bağlıdır, çözülürken her zaman kabul edilir',
    ] },
    { h: 'JavaScript kaçışlarından farkı', p: [
      'JSON, JavaScript sözdiziminden türemiş olsa da kaçış kuralları daha dardır. Tek tırnak kaçışlanmaz ve <code>\\\'</code> geçerli değildir. <code>\\x41</code> gibi iki basamaklı onaltılık kaçışlar, <code>\\v</code>, <code>\\0</code> ve süslü parantezli <code>\\u{…}</code> biçimi JSON\'da yoktur. Bir JavaScript dizgisini olduğu gibi JSON dosyasına taşıdığınızda ayrıştırıcının "beklenmeyen karakter" hatası vermesinin en yaygın nedeni budur.',
      'Araç geri alma yönünde bu kurallara sıkı sıkıya uyar: tanımadığı bir kaçış gördüğünde sessizce geçmek yerine kaçıncı karakterde sorun olduğunu söyler. Böylece bozuk bir dizgiyi fark etmeden yanlış çözmüş olmazsınız. Tek hoşgörü, metnin içindeki gerçek satır sonlarının olduğu gibi aktarılmasıdır; standart bunu yasaklasa da elle düzenlenmiş metinlerde sık görülür.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'İki satırlık şu metni ele alalım: ilk satır <code>O dedi ki: "Merhaba"</code>, ikinci satır <code>Yol: C:\\temp</code>. Kaçışlanması gereken dört karakter vardır: iki çift tırnak, bir satır sonu ve bir ters eğik çizgi. Sonuç <code>O dedi ki: \\"Merhaba\\"\\nYol: C:\\\\temp</code> olur. Buradaki ince nokta dosya yoludur: ters eğik çizgi ikilenmeseydi <code>\\t</code> sekme olarak yorumlanır ve yol "C:" ile "emp" arasında bir sekme içeren anlamsız bir metne dönüşürdü.',
      'Ters yönde <code>"Sat\\u0131r 1\\nSat\\u0131r 2\\t\\"son\\""</code> dizgisi altı kaçış içerir: iki <code>\\u0131</code> (ı harfi), bir satır sonu, bir sekme ve iki tırnak. Dış tırnaklar atılır ve iki satırlık metin elde edilir: "Satır 1" ve altında "Satır 2", sekme, tırnak içinde "son".',
    ] },
    { h: 'JSON içinde JSON', p: [
      'Bazı sistemler bir JSON nesnesini başka bir JSON\'un içinde dizgi olarak taşır: mesaj kuyruklarındaki gövde alanı, günlük kayıtlarındaki "payload", bazı web kancaları ve veritabanı metin sütunları böyledir. İç nesneyi dış belgeye koymak için tamamını kaçışlamak gerekir. <code>{"ad":"Ayşe","yas":30}</code> nesnesinde altı çift tırnak vardır; kaçışlanıp tırnak içine alındığında <code>"{\\"ad\\":\\"Ayşe\\",\\"yas\\":30}"</code> elde edilir.',
      'Aynı işlem iki kez uygulanırsa ters eğik çizgiler katlanır ve <code>\\\\\\"</code> gibi diziler ortaya çıkar. Elinizde böyle çok katmanlı bir dizgi varsa "Geri al" işlemini, düzgün bir JSON görene kadar art arda uygulayın; her uygulama bir katmanı soyar.',
    ] },
    { h: 'Eğik çizgi ve ASCII seçenekleri ne zaman gerekir?', p: [
      'Eğik çizgiyi kaçışlamak JSON açısından gereksizdir, ancak JSON verisi bir HTML sayfasındaki betik bloğuna gömülüyorsa işe yarar: içerikte geçen bir kapanış etiketi tarayıcının bloğu erken kapatmasına yol açabilir, <code>\\/</code> yazımı bu diziyi böler. Bazı sunucu kitaplıklarının varsayılan olarak bu kaçışı üretmesinin nedeni de budur.',
      'ASCII dışı karakterleri <code>\\uXXXX</code> yapmak, karakter kodlaması belirsiz olan kanallarda veriyi korur. "şey" sözcüğü bu seçenekle <code>\\u015Fey</code> olur. JSON\'un kendisi UTF-8 ile sorunsuz çalıştığından, kodlamadan emin olduğunuz sürece harfleri olduğu gibi bırakmak hem daha kısa hem daha okunaklıdır. Temel düzlem dışındaki karakterler iki ardışık <code>\\uXXXX</code> (vekil çifti) olarak yazılır.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Windows yolu ya da düzenli ifade içeren metinde ters eğik çizgileri ikilemeyi unutmak.',
      'Çok satırlı metni JSON değerine gerçek satır sonlarıyla yapıştırmak; her satır sonu <code>\\n</code> olmalıdır.',
      'Tek tırnaklı dizgi kullanmak; JSON yalnızca çift tırnağı kabul eder.',
      'Zaten kaçışlı bir dizgiyi yeniden kaçışlamak ve ekranda <code>\\\\n</code> görmek.',
      'Kaçışlanmış içeriği iki kez tırnak içine almak.',
    ] },
    { h: 'Sınırlar', p: [
      'Bu araç tek bir dizgi değerinin içeriğiyle ilgilenir; bütün bir JSON belgesinin geçerli olup olmadığını denetlemez ve girintilemez. Belgeyi doğrulamak ya da düzenli göstermek için biçimlendirme aracını kullanın. Uzunluklar UTF-16 kod birimi olarak sayılır; bu, çoğu programlama dilindeki dizgi uzunluğuyla aynıdır ama bayt cinsinden dosya boyutu değildir.',
    ] },
  ],
  faq: [
    ['JSON\'da tek tırnağı kaçışlamam gerekir mi?', 'Hayır. JSON dizgileri yalnızca çift tırnakla sınırlandığı için tek tırnak sıradan bir karakterdir ve olduğu gibi yazılır. \\\' yazımı JSON\'da geçersizdir ve ayrıştırma hatasına yol açar.'],
    ['Türkçe karakterler JSON\'da sorun çıkarır mı?', 'Hayır. JSON herhangi bir Unicode karakteri doğrudan kabul eder; dosya UTF-8 olarak kaydedildiği sürece ç, ğ, ı, ö, ş, ü kaçışlanmadan yazılabilir. \\uXXXX seçeneği yalnızca saf ASCII gereken durumlar içindir.'],
    ['Geri alırken dıştaki tırnakları silmeli miyim?', 'Gerekmez. Metin çift tırnakla başlayıp bitiyorsa araç dış tırnakları kendisi atar. Tırnaksız içerik yapıştırdığınızda da doğrudan çözer.'],
    ['"Kaçışlanmamış çift tırnak" hatası ne anlama geliyor?', 'Çözülecek dizginin ortasında önünde ters eğik çizgi olmayan bir çift tırnak bulunduğunu gösterir. Bu genellikle bir dizgi yerine bütün bir JSON nesnesinin yapıştırıldığını ya da dizginin bozuk olduğunu gösterir. Tek bir dizgi değerini seçip yeniden deneyin.'],
    ['\\n görmek yerine gerçek satır sonu istiyorum, ne yapmalıyım?', 'İşlemi "Geri al" olarak seçin. Kaçışlı dizgideki her \\n gerçek satır sonuna, \\t sekmeye dönüşür ve metin okunur hâle gelir.'],
    ['Sonuçta neden \\u000B gibi diziler çıkıyor?', 'Kodu 32\'den küçük olan denetim karakterlerinden yalnızca beşinin kısa adı vardır (\\b, \\f, \\n, \\r, \\t). Diğerleri JSON\'da ancak \\uXXXX biçiminde yazılabilir; dikey sekme bu yüzden \\u000B olur.'],
    ['Sayı ya da true/false değerlerini de kaçışlamalı mıyım?', 'Hayır. Kaçışlama yalnızca dizgi değerleri içindir. Sayılar, true, false ve null tırnaksız yazılır; bunları kaçışlayıp tırnak içine alırsanız türleri dizgiye dönüşür.'],
    ['Yapıştırdığım veriler sunucuya gidiyor mu?', 'Hayır. Kaçışlama ve geri alma tarayıcınızın içinde yapılır; metniniz hiçbir yere gönderilmez ve saklanmaz. API anahtarı ya da kişisel veri içeren gövdeleri de bu yüzden güvenle dönüştürebilirsiniz.'],
  ],
  related: ['json-bicimlendir', 'json-kucult', 'js-kacis-karakteri', 'unicode-kacis-cevir', 'csv-json-donustur', 'json-yaml-donustur'],
};
