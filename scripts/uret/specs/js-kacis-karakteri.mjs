export default {
  slug: 'js-kacis-karakteri',
  title: 'JavaScript Dizgi Kaçış Karakteri Dönüştürme',
  h1Tail: 'escape / unescape',
  pageTitle: 'JavaScript Kaçış Karakteri Dönüştürme – String Escape ve Unescape',
  description: 'Metni JavaScript dizgisine güvenle yazılacak biçime çevirin ya da kaçışlı dizgiyi düz metne geri alın. Tek, çift tırnak ve backtick desteği; \\n, \\t, \\uXXXX.',
  card: 'Metni JavaScript dizgisi için kaçışlayın ya da \\n, \\t, \\uXXXX içeren dizgiyi düz metne çevirin.',
  category: 'gelistirici',
  keywords: ['javascript escape', 'js kaçış karakteri', 'string escape', 'javascript unescape', 'ters eğik çizgi n', 'js tırnak kaçırma', 'javascript dizgi kaçış'],
  lead: 'Çok satırlı ya da tırnak içeren bir metni JavaScript koduna dizgi olarak yapıştırmak istediğinizde ters eğik çizgili <strong>kaçış dizileri</strong> gerekir. Bu araç metni seçtiğiniz tırnak türüne göre kaçışlar; tersine, <code>\\n</code>, <code>\\t</code>, <code>\\u00E7</code> gibi diziler içeren bir dizgiyi okunur metne geri çevirir.',
  button: 'Dönüştür',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Dönüştürülecek metni buraya yazın ya da yapıştırın' },
    { id: 'yon', label: 'İşlem', type: 'select', options: [['kacis', 'Kaçışla (metin → JS dizgisi)'], ['geri', 'Geri al (JS dizgisi → metin)']] },
    { id: 'tirnak', label: 'Tırnak türü', type: 'select', options: [['tek', 'Tek tırnak \' \''], ['cift', 'Çift tırnak " "'], ['backtick', 'Backtick ` ` (şablon dizgisi)']], hint: 'Kaçışlarken hangi tırnağın ters eğik çizgi alacağını belirler.' },
    { id: 'ascii', label: 'ASCII dışı karakterler', type: 'select', options: [['koru', 'Olduğu gibi bırak (ç, ş, ğ…)'], ['kacis', '\\uXXXX biçimine çevir']] },
    { id: 'sarmala', label: 'Sonucu tırnak içine al', type: 'select', options: [['hayir', 'Hayır'], ['evet', 'Evet']] },
  ],
  compute(v, h) {
    const s = String(v.metin ?? '');
    if (s === '') h.err('"Metin" alanına dönüştürülecek metni yazın.');
    const hex = (n, w) => n.toString(16).toUpperCase().padStart(w, '0');
    let out = '';
    let degisen = 0;
    if (v.yon === 'geri') {
      let t = s;
      // Baştaki ve sondaki aynı tırnak varsa at
      const m = /^\s*(['"`])([\s\S]*)\1\s*;?\s*$/.exec(t);
      if (m) t = m[2];
      const basit = { n: '\n', r: '\r', t: '\t', b: '\b', f: '\f', v: '\v', '0': '\0' };
      for (let i = 0; i < t.length; i++) {
        const c = t[i];
        if (c !== '\\') { out += c; continue; }
        const d = t[i + 1];
        if (d === undefined) h.err('Metin tek başına bir ters eğik çizgiyle bitiyor; sondaki \\ işaretini silin ya da \\\\ olarak yazın.');
        degisen++;
        if (d === 'x') {
          const hx = t.slice(i + 2, i + 4);
          if (!/^[0-9a-fA-F]{2}$/.test(hx)) h.err(`${i + 1}. karakterdeki \\x dizisi geçersiz; \\x ardından iki onaltılık basamak gelmelidir (örn. \\x41).`);
          out += String.fromCharCode(parseInt(hx, 16)); i += 3; continue;
        }
        if (d === 'u') {
          if (t[i + 2] === '{') {
            const son = t.indexOf('}', i + 3);
            const hx = son < 0 ? '' : t.slice(i + 3, son);
            if (!/^[0-9a-fA-F]{1,6}$/.test(hx) || parseInt(hx, 16) > 0x10FFFF) h.err(`${i + 1}. karakterdeki \\u{…} dizisi geçersiz; süslü parantez içinde 10FFFF değerini aşmayan onaltılık bir kod noktası olmalıdır.`);
            out += String.fromCodePoint(parseInt(hx, 16)); i = son; continue;
          }
          const hx = t.slice(i + 2, i + 6);
          if (!/^[0-9a-fA-F]{4}$/.test(hx)) h.err(`${i + 1}. karakterdeki \\u dizisi geçersiz; \\u ardından dört onaltılık basamak gelmelidir (örn. \\u00E7).`);
          out += String.fromCharCode(parseInt(hx, 16)); i += 5; continue;
        }
        if (d === '0' && /[0-9]/.test(t[i + 2] || '')) h.err(`${i + 1}. karakterdeki sekizlik kaçış (\\0 ardından rakam) desteklenmiyor; \\x ya da \\u biçimini kullanın.`);
        if (/[1-9]/.test(d)) h.err(`${i + 1}. karakterdeki \\${d} dizisi geçerli bir JavaScript kaçışı değil; sekizlik kaçışlar yerine \\x ya da \\u biçimini kullanın.`);
        if (d === '\r') { i += t[i + 2] === '\n' ? 2 : 1; continue; } // satır devamı
        if (d === '\n' || d === '\u2028' || d === '\u2029') { i += 1; continue; }
        out += Object.prototype.hasOwnProperty.call(basit, d) ? basit[d] : d;
        i += 1;
      }
    } else {
      const q = v.tirnak === 'cift' ? '"' : v.tirnak === 'backtick' ? '`' : '\'';
      for (let i = 0; i < s.length; i++) {
        const c = s[i];
        const k = s.charCodeAt(i);
        let e = null;
        if (c === '\\') e = '\\\\';
        else if (c === q) e = '\\' + q;
        else if (c === '\n') e = '\\n';
        else if (c === '\r') e = '\\r';
        else if (c === '\t') e = '\\t';
        else if (c === '\b') e = '\\b';
        else if (c === '\f') e = '\\f';
        else if (c === '\v') e = '\\v';
        else if (k === 0) e = /[0-9]/.test(s[i + 1] || '') ? '\\x00' : '\\0';
        else if (k < 0x20 || k === 0x7F) e = '\\x' + hex(k, 2);
        else if (k === 0x2028 || k === 0x2029) e = '\\u' + hex(k, 4);
        else if (q === '`' && c === '$' && s[i + 1] === '{') e = '\\$';
        else if (k > 0x7E && v.ascii === 'kacis') e = '\\u' + hex(k, 4);
        if (e === null) out += c; else { out += e; degisen++; }
      }
      if (v.sarmala === 'evet') out = q + out + q;
    }
    return {
      rows: [
        [v.yon === 'geri' ? 'Çözülen kaçış dizisi' : 'Kaçışlanan karakter', String(degisen)],
        ['Girdi uzunluğu', `${s.length} karakter`],
        ['Çıktı uzunluğu', `${out.length} karakter`],
      ],
      text: out,
      note: v.yon === 'geri' ? 'Baştaki ve sondaki eşleşen tırnak işaretleri varsa atılır. Uzunluklar UTF-16 kod birimi olarak sayılır.' : 'Uzunluklar JavaScript\'in length değeri gibi UTF-16 kod birimi olarak sayılır.',
    };
  },
  cases: [
    { in: { metin: 'Ali\'nin "kitabı"\nyeni satır', yon: 'kacis', tirnak: 'tek' }, out: { 'Kaçışlanan karakter': '2' }, text: 'Ali\\\'nin "kitabı"\\nyeni satır' },
    { in: { metin: 'Merhaba\\nD\\u00FCnya\\t\\x41', yon: 'geri' }, out: { 'Çözülen kaçış dizisi': '4' }, text: 'Merhaba\nDünya\tA' },
    { in: { metin: 'Ali\'nin "kitabı"', yon: 'kacis', tirnak: 'cift', sarmala: 'evet' }, text: '"Ali\'nin \\"kitabı\\""' },
    { in: { metin: 'C:\\Users\\ali', yon: 'kacis', tirnak: 'tek' }, out: { 'Kaçışlanan karakter': '2', 'Çıktı uzunluğu': '14 karakter' }, text: 'C:\\\\Users\\\\ali' },
    { in: { metin: 'çağ', yon: 'kacis', ascii: 'kacis' }, text: '\\u00E7a\\u011F' },
    { in: { metin: 'Toplam: ${fiyat} `TL`', yon: 'kacis', tirnak: 'backtick' }, text: 'Toplam: \\${fiyat} \\`TL\\`' },
    { in: { metin: '\'\\u{1D11E} a\\\\b \\\'x\\\'\';', yon: 'geri' }, text: '\u{1D11E} a\\b \'x\'' },
    { in: { metin: 'bozuk \\u12G4', yon: 'geri' }, error: true },
    { in: { metin: 'sonda ters çizgi \\', yon: 'geri' }, error: true },
    { in: { metin: '', yon: 'kacis' }, error: true },
  ],
  howto: [
    'Dönüştürmek istediğiniz metni "Metin" kutusuna yazın ya da yapıştırın. Satır sonları ve sekmeler korunur.',
    '"İşlem" listesinden yönü seçin: düz metni koda gömülecek dizgiye çevirmek için "Kaçışla", kaçış dizileri içeren bir dizgiyi okumak için "Geri al".',
    'Kaçışlarken dizgiyi kodda hangi tırnakla saracağınızı belirtin. Yalnızca o tırnak ters eğik çizgi alır; diğerleri olduğu gibi kalır.',
    'Kaynak dosyanızın yalnızca ASCII içermesi gerekiyorsa Türkçe harflerin <code>\\uXXXX</code> biçimine çevrilmesini isteyin.',
    '"Dönüştür" düğmesine basın ve sonucu kopyalayın. "Sonucu tırnak içine al" seçeneği açıksa çıktı doğrudan atama ifadesinin sağına yapıştırılabilir.',
  ],
  sections: [
    { h: 'Kaçış karakteri neden gerekir?', p: [
      'JavaScript\'te bir dizgi tek tırnak, çift tırnak ya da backtick arasına yazılır. Dizginin içinde aynı tırnak geçtiğinde yorumlayıcı dizginin orada bittiğini sanar ve sözdizimi hatası verir. Tek ya da çift tırnaklı dizgilerde gerçek bir satır sonu da yasaktır. Ters eğik çizgi (<code>\\</code>) bu durumlarda "sıradaki karakter özel anlam taşıyor" demenin yoludur: <code>\\\'</code> dizgiyi bitirmeyen bir tırnak, <code>\\n</code> ise satır sonudur.',
      'Sorun en çok hazır metni koda taşırken çıkar: bir hata mesajı, HTML parçası, Windows dosya yolu ya da müşteriden gelen çok satırlı açıklama. <code>C:\\Users\\ali</code> yolunu olduğu gibi yazarsanız <code>\\U</code> ve <code>\\a</code> kaçış olarak yorumlanır ve ters eğik çizgiler sessizce kaybolur. Doğrusu her ters eğik çizgiyi ikilemektir: <code>C:\\\\Users\\\\ali</code>.',
    ] },
    { h: 'Desteklenen kaçış dizileri', ul: [
      '<code>\\\\</code> ters eğik çizginin kendisi',
      '<code>\\\'</code>, <code>\\"</code>, <code>\\`</code> tırnak işaretleri',
      '<code>\\n</code> satır başı (LF), <code>\\r</code> satır dönüşü (CR), <code>\\t</code> sekme',
      '<code>\\b</code> geri silme, <code>\\f</code> sayfa besleme, <code>\\v</code> dikey sekme, <code>\\0</code> boş (NUL) karakter',
      '<code>\\xHH</code> iki onaltılık basamakla 0–255 arası kod, örneğin <code>\\x41</code> = A',
      '<code>\\uXXXX</code> dört onaltılık basamakla UTF-16 kod birimi, örneğin <code>\\u00E7</code> = ç',
      '<code>\\u{X…}</code> süslü parantezle 10FFFF değerine kadar kod noktası (ES2015 ve sonrası)',
      'Ters eğik çizgi ardından gerçek satır sonu: satır devamı; çözülürken ikisi de atılır',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Şu iki satırlık metni tek tırnaklı dizgiye çevirelim: birinci satır <code>Ali\'nin "kitabı"</code>, ikinci satır <code>yeni satır</code>. Tek tırnak seçiliyken araç kesme işaretini <code>\\\'</code>, satır sonunu <code>\\n</code> yapar; çift tırnaklara dokunmaz. Sonuç <code>Ali\\\'nin "kitabı"\\nyeni satır</code> olur ve iki karakterin kaçışlandığı bildirilir.',
      'Aynı metinde çift tırnak seçseydiniz bu kez kesme işareti olduğu gibi kalır, iki çift tırnak <code>\\"</code> biçimini alırdı. Hangi tırnakta daha az kaçış gerekiyorsa onu seçmek kodu okunaklı tutar.',
      'Ters yönde <code>Merhaba\\nD\\u00FCnya\\t\\x41</code> girdisi dört kaçış dizisi içerir. Çözüldüğünde ilk satırda "Merhaba", ikinci satırda "Dünya", ardından bir sekme ve "A" harfi elde edilir.',
    ] },
    { h: 'Backtick (şablon dizgisi) farkları', p: [
      'Backtick ile yazılan şablon dizgilerinde gerçek satır sonları serbesttir, ama iki şeye dikkat etmek gerekir: backtick\'in kendisi ve <code>${</code> ikilisi. İkincisi ifade yerleştirme başlatır; metninizde düz yazı olarak "${fiyat}" geçiyorsa ve değişken olarak yorumlanmasını istemiyorsanız dolar işareti kaçışlanmalıdır. Araç backtick modunda bunu kendiliğinden <code>\\${</code> olarak yazar.',
      'Bu modda da satır sonları <code>\\n</code> olarak yazılır; böylece çıktı tek satırda kalır ve girintileme ya da editörün satır sonu ayarı dizginin içeriğini değiştiremez.',
    ] },
    { h: 'ASCII dışı karakterler ve \\uXXXX', p: [
      'Güncel JavaScript dosyaları UTF-8 olarak kaydedildiği sürece ç, ğ, ı, ö, ş, ü harflerini doğrudan dizgi içinde yazabilirsiniz; kaçışlamak zorunlu değildir. Ancak dosyanın kodlamasından emin olamadığınız eski sistemlerde, kod üreticilerde ya da yalnızca ASCII kabul eden yapılandırma alanlarında <code>\\uXXXX</code> biçimi güvenli seçimdir. "çağ" sözcüğü bu seçenekle <code>\\u00E7a\\u011F</code> olur.',
      'Temel düzlemin dışındaki karakterler (bazı eski yazılar, müzik işaretleri, emojiler) UTF-16\'da iki kod birimiyle saklanır. Bu yüzden böyle bir karakter kaçışlandığında art arda iki <code>\\uXXXX</code> dizisi görürsünüz; bu bir hata değil, vekil çifti denen yapıdır.',
      'Araç ayrıca U+2028 ve U+2029 satır ayırıcılarını her durumda kaçışlar. Bu iki görünmez karakter eski JavaScript motorlarında dizgi içinde satır sonu sayıldığından, kullanıcıdan gelen metinlerde beklenmedik sözdizimi hatalarına yol açabiliyordu.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'Kaçışlama, metni HTML\'e güvenle yerleştirmek anlamına gelmez. Bir dizgiyi HTML sayfasındaki betik bloğuna gömüyorsanız kapanış etiketi gibi diziler ayrıca ele alınmalıdır; kullanıcı girdisini sayfaya basarken HTML kodlaması gerekir. Aynı şekilde bu çıktı JSON değildir: JSON tek tırnağı ve <code>\\x</code>, <code>\\v</code>, <code>\\0</code> kaçışlarını kabul etmez.',
      'Geri alma yönünde eski sekizlik kaçışlar (<code>\\101</code> gibi) bilinçli olarak desteklenmez, çünkü katı kipte ve şablon dizgilerinde yasaktır; araç bu durumda hangi konumda sorun olduğunu söyler. Tanımsız bir kaçış (<code>\\q</code> gibi) JavaScript\'teki davranışa uygun olarak yalnızca harfin kendisine dönüşür.',
    ] },
  ],
  faq: [
    ['Tek tırnak mı çift tırnak mı kullanmalıyım?', 'JavaScript açısından ikisi eşdeğerdir. Metninizde kesme işareti çoksa (Türkçe özel adlardaki ekler gibi) çift tırnak, HTML özniteliği gibi çift tırnaklı içerik çoksa tek tırnak daha az kaçış gerektirir. Projenizin biçim kuralı varsa ona uyun.'],
    ['\\n ile \\r\\n arasındaki fark nedir?', '\\n yalnızca satır başı (LF) karakteridir; Linux ve macOS bunu kullanır. Windows metin dosyalarında satır sonu CR ve LF çiftidir, yani \\r\\n. Araç metninizde hangisi varsa onu aynen kaçışlar, dönüştürme yapmaz.'],
    ['Çıktıyı JSON olarak kullanabilir miyim?', 'Çift tırnak seçip yalnızca yaygın kaçışlar oluşuyorsa çoğu zaman geçerli olur, ama garanti değildir. JSON için kuralları daha dar olan JSON kaçış aracını kullanmak doğrusudur.'],
    ['Türkçe karakterleri kaçışlamam şart mı?', 'Hayır. Dosyanız UTF-8 ise ç, ş, ğ, ı, ö, ü doğrudan yazılabilir. \\uXXXX seçeneği yalnızca çıktının saf ASCII olması gereken durumlar içindir.'],
    ['Geri alırken baştaki tırnakları silmem gerekir mi?', 'Gerekmez. Metin aynı tür tırnakla başlayıp bitiyorsa araç bunları ve sondaki noktalı virgülü kendiliğinden atar. Tırnaksız yapıştırdığınız dizgiler de olduğu gibi çözülür.'],
    ['"Geçersiz \\u dizisi" hatası neden çıkıyor?', '\\u ardından tam dört onaltılık basamak (0–9, A–F) ya da süslü parantez içinde bir kod noktası gelmelidir. Eksik basamak ya da G gibi geçersiz harf varsa araç konumu bildirir. Düz metninizde gerçekten ters eğik çizgi ve u harfi geçiyorsa ters eğik çizgiyi ikileyin.'],
    ['Uzunluk neden beklediğimden farklı görünüyor?', 'Uzunluklar JavaScript\'in length özelliği gibi UTF-16 kod birimiyle sayılır. Temel düzlem dışındaki bir karakter 2 birim tutar; kaçışlandıktan sonra tek bir satır sonu da 2 karakter (\\ ve n) olur.'],
    ['Yapıştırdığım kod ya da metin bir yere gönderiliyor mu?', 'Hayır. Dönüştürme tamamen tarayıcınızda yapılır; metniniz sunucuya iletilmez, kaydedilmez. Gizli anahtar ya da müşteri verisi içeren metinlerde de bu nedenle rahatça kullanabilirsiniz.'],
  ],
  related: ['json-kacis', 'unicode-kacis-cevir', 'html-kodla-coz', 'url-kodla', 'json-bicimlendir', 'regex-test'],
};
