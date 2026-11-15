export default {
  slug: 'sorgu-dizesi-coz',
  title: 'Sorgu Dizesi (Query String) Çözme',
  h1Tail: 'parametre listesi',
  pageTitle: 'Sorgu Dizesi Çözme – Query String Parametrelerini Listeleme',
  description: 'URL sorgu dizesini anahtar-değer çiftlerine ayırın, yüzde kodlamasını çözün. Liste ya da JSON çıktısı, yinelenen ve boş parametrelerin dökümü.',
  card: 'Sorgu dizesini anahtar-değer çiftlerine ayırın, kodlamayı çözün; düz liste ya da JSON olarak alın.',
  category: 'gelistirici',
  keywords: ['query string çözme', 'sorgu dizesi çözme', 'url parametreleri ayırma', 'query string parser', 'url parametre listesi', 'query string json', 'get parametreleri'],
  lead: 'Bir adresin soru işaretinden sonraki bölümünü, yani <strong>sorgu dizesini</strong> okunur hâle getirin. Araç parametreleri tek tek ayırır, yüzde kodlamasını çözer ve sonucu liste ya da JSON olarak verir.',
  button: 'Çöz',
  inputs: [
    { id: 'sorgu', label: 'Sorgu dizesi ya da tam adres', type: 'textarea', placeholder: 'Örn. q=mavi+ayakkab%C4%B1&sayfa=2&sirala=fiyat', wide: true, rows: 4, hint: 'Tam adres yapıştırırsanız yalnızca ? ile # arasındaki bölüm işlenir.' },
    { id: 'bicim', label: 'Çıktı biçimi', type: 'select', options: [['liste', 'Liste (anahtar = değer)'], ['json', 'JSON nesnesi']] },
    { id: 'sira', label: 'Sıralama', type: 'select', options: [['ozgun', 'Adresteki sırayla'], ['alfabetik', 'Anahtara göre alfabetik']] },
    { id: 'arti', label: 'Artı (+) işareti', type: 'select', options: [['bosluk', 'Boşluk olarak çöz (form kodlaması)'], ['arti', 'Artı olarak bırak']] },
  ],
  compute(v, h) {
    let t = String(v.sorgu ?? '').trim();
    if (t === '') h.err('Çözülecek sorgu dizesini ya da adresi yazın.');
    const soru = t.indexOf('?');
    if (soru >= 0) t = t.slice(soru + 1);
    else if (t.includes('://') || (!t.includes('=') && t.includes('/'))) h.err('Bu adreste sorgu dizesi yok. Sorgu, adresteki ? işaretinden sonra gelen bölümdür (örn. sayfa?id=5&dil=tr).');
    const diyez = t.indexOf('#');
    if (diyez >= 0) t = t.slice(0, diyez);
    const parcalar = t.split('&').filter((p) => p !== '');
    if (!parcalar.length) h.err('Sorgu dizesi boş görünüyor; ? işaretinden sonra parametre bulunamadı.');
    let bozuk = 0;
    const coz = (s) => {
      const x = v.arti === 'arti' ? s : s.replace(/\+/g, ' ');
      try { return decodeURIComponent(x); } catch { bozuk++; return x; }
    };
    let ciftler = parcalar.map((p) => {
      const i = p.indexOf('=');
      return i < 0 ? [coz(p), ''] : [coz(p.slice(0, i)), coz(p.slice(i + 1))];
    });
    const sayac = new Map();
    for (const [k] of ciftler) sayac.set(k, (sayac.get(k) || 0) + 1);
    const yinelenen = [...sayac].filter(([, n]) => n > 1).map(([k, n]) => `${k} (${n} kez)`);
    const bos = [...new Set(ciftler.filter(([, d]) => d === '').map(([k]) => k))];
    if (v.sira === 'alfabetik') ciftler = ciftler.map((c, i) => [c, i]).sort((a, b) => a[0][0].localeCompare(b[0][0], 'tr') || a[1] - b[1]).map(([c]) => c);
    let text;
    if (v.bicim === 'json') {
      const nesne = Object.create(null);
      for (const [k, d] of ciftler) {
        if (!(k in nesne)) nesne[k] = d;
        else if (Array.isArray(nesne[k])) nesne[k].push(d);
        else nesne[k] = [nesne[k], d];
      }
      text = JSON.stringify(nesne, null, 2);
    } else text = ciftler.map(([k, d]) => `${k} = ${d}`).join('\n');
    const rows = [
      ['Parametre sayısı', String(ciftler.length)],
      ['Benzersiz anahtar sayısı', String(sayac.size)],
      ['Yinelenen anahtarlar', yinelenen.length ? yinelenen.join(', ') : '—'],
      ['Boş değerli anahtarlar', bos.length ? bos.join(', ') : '—'],
    ];
    if (bozuk) rows.push(['Çözülemeyen parça', String(bozuk)]);
    return { rows, text, note: bozuk ? 'Bazı parçalarda geçersiz yüzde kodlaması vardı; bu parçalar olduğu gibi bırakıldı.' : 'Yüzde kodlaması UTF-8 olarak çözüldü.' };
  },
  cases: [
    { in: { sorgu: 'q=mavi+ayakkab%C4%B1&sayfa=2&sirala=fiyat' }, out: { 'Parametre sayısı': '3', 'Benzersiz anahtar sayısı': '3', 'Yinelenen anahtarlar': '—' }, text: 'q = mavi ayakkabı\nsayfa = 2\nsirala = fiyat' },
    { in: { sorgu: 'https://ornek.com/arama?etiket=a&etiket=b&bos=&bayrak#ust', bicim: 'json' }, out: { 'Parametre sayısı': '4', 'Benzersiz anahtar sayısı': '3', 'Yinelenen anahtarlar': 'etiket (2 kez)', 'Boş değerli anahtarlar': 'bos, bayrak' }, text: '{\n  "etiket": [\n    "a",\n    "b"\n  ],\n  "bos": "",\n  "bayrak": ""\n}' },
    { in: { sorgu: 'z=1&a=2&m=3', sira: 'alfabetik' }, text: 'a = 2\nm = 3\nz = 1' },
    { in: { sorgu: 'islem=1+2', arti: 'arti' }, text: 'islem = 1+2' },
    { in: { sorgu: 'islem=1+2' }, text: 'islem = 1 2' },
    { in: { sorgu: '?utm_source=bulten&utm_medium=email&utm_campaign=bahar%20indirimi' }, out: { 'Parametre sayısı': '3' }, text: 'utm_source = bulten\nutm_medium = email\nutm_campaign = bahar indirimi' },
    { in: { sorgu: 'ad=%C3%87a%C4%9Fla&x=%ZZ' }, out: { 'Parametre sayısı': '2', 'Çözülemeyen parça': '1' }, text: 'ad = Çağla\nx = %ZZ' },
    { in: { sorgu: '' }, error: true },
    { in: { sorgu: 'https://ornek.com/sayfa' }, error: true },
  ],
  howto: [
    'Adres çubuğundaki adresin tamamını ya da yalnızca soru işaretinden sonraki bölümü kopyalayıp kutuya yapıştırın.',
    'Çıktıyı düz liste olarak mı yoksa JSON nesnesi olarak mı istediğinizi seçin.',
    'Parametreleri adresteki sırayla ya da anahtar adına göre alfabetik görmek için sıralama seçeneğini ayarlayın.',
    'Değerlerde artı işareti gerçek bir artı ise "Artı olarak bırak" seçeneğine geçin; aksi hâlde artılar boşluğa çevrilir.',
    '"Çöz" düğmesine basın. Parametreler metin kutusunda, sayılar ve yinelenen anahtarlar üstteki satırlarda görünür.',
  ],
  sections: [
    { h: 'Sorgu dizesi nedir?', p: [
      'Sorgu dizesi (query string), bir web adresinde soru işaretinden sonra gelen ve varsa diyez işaretine kadar süren bölümdür. Sunucuya ya da sayfadaki betiğe ek bilgi taşır: arama sözcüğü, sayfa numarası, sıralama ölçütü, dil seçimi, kampanya etiketleri gibi. Yaygın biçim, <code>&</code> işaretiyle ayrılmış <code>anahtar=değer</code> çiftleridir: <code>sayfa=2&sirala=fiyat</code>.',
      'Bu biçim katı bir standarttan çok, web formlarının veri gönderme yönteminden doğmuş bir gelenektir. Bu yüzden ayrıntılarda farklılıklar görülür: değeri olmayan anahtarlar, aynı anahtarın yinelenmesi ya da köşeli parantezli adlar farklı yazılımlarda farklı yorumlanabilir. Araç dizgiyi olduğu gibi ayırır ve yorumu size bırakır.',
    ] },
    { h: 'Yüzde kodlaması ve artı işareti', p: [
      'Adreslerde boşluk, Türkçe harfler ve <code>&</code>, <code>=</code>, <code>#</code> gibi özel anlamlı işaretler doğrudan yazılamaz. Bunun yerine karakterin UTF-8 baytları yüzde işareti ve iki onaltılık haneyle yazılır. Boşluk <code>%20</code>, "ç" harfi <code>%C3%A7</code>, "ı" harfi <code>%C4%B1</code>, ve işareti <code>%26</code> olur. Araç bu kodları çözerek değerleri okunur hâle getirir.',
      'Artı işareti özel bir durumdur. Web formları gönderilirken boşluklar <code>+</code> olarak kodlanır; bu yüzden sorgu dizesindeki artı çoğunlukla boşluk demektir. Ancak bazı adresler JavaScript ile üretilir ve orada artı gerçek bir artı işaretidir. Varsayılan ayar form kodlamasını izler; telefon numarası ya da matematik ifadesi gibi değerlerde artının korunmasını istiyorsanız ilgili seçeneği değiştirin. Gerçek artı işaretinin kodlanmış hâli <code>%2B</code>\'dir ve her iki ayarda da artı olarak çözülür.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bir mağaza aramasından şu sorguyu aldığınızı düşünün: <code>q=mavi+ayakkab%C4%B1&sayfa=2&sirala=fiyat</code>. Araç dizgiyi <code>&</code> işaretlerinden üç parçaya böler. İlk parçada eşittir işaretinin solu anahtar (<code>q</code>), sağı değerdir. Değerdeki artı boşluğa, <code>%C4%B1</code> ise "ı" harfine çevrilir ve "mavi ayakkabı" elde edilir. Sonuç listesi şöyledir: "q = mavi ayakkabı", "sayfa = 2", "sirala = fiyat". Parametre sayısı 3, benzersiz anahtar sayısı da 3\'tür.',
      'İkinci örnekte aynı anahtar iki kez geçiyor: <code>etiket=a&etiket=b&bos=&bayrak</code>. JSON çıktısı seçildiğinde <code>etiket</code> anahtarı iki öğeli bir diziye dönüşür, <code>bos</code> ve <code>bayrak</code> ise boş dizgi değerini alır. Üstteki satırlarda "etiket (2 kez)" yinelenen anahtar olarak, "bos, bayrak" boş değerli anahtarlar olarak belirtilir.',
    ] },
    { h: 'Liste ve JSON çıktısı ne zaman kullanılır?', p: [
      'Liste biçimi gözle inceleme içindir: her satırda bir parametre bulunur ve yinelenen anahtarlar ayrı ayrı görünür. Bir müşteriye "adresinizde şu değerler gönderiliyor" diye rapor yazarken ya da hata ayıklarken en rahat okunan biçim budur.',
      'JSON biçimi parametreleri başka bir araca ya da koda aktarmak içindir. Bir API istemcisinde gövde olarak denemek, sınama verisi hazırlamak ya da yapılandırma dosyasına taşımak istediğinizde nesne hazır gelir. Tüm değerler dizgi olarak bırakılır; <code>2</code> gibi bir değer sayıya çevrilmez, çünkü sorgu dizesinde tür bilgisi yoktur ve tahmin yürütmek "007" gibi değerleri bozabilir.',
    ] },
    { h: 'Sık karşılaşılan durumlar', ul: [
      '<strong>Yinelenen anahtar:</strong> <code>renk=mavi&renk=siyah</code> gibi çoklu seçimlerde görülür. Sunucu yazılımına göre ilki, sonuncusu ya da hepsi dikkate alınır.',
      '<strong>Köşeli parantezli adlar:</strong> <code>filtre[marka]=x</code> biçimi bazı çatıların iç içe veri gösterimidir. Araç anahtarı parantezleriyle birlikte tek ad olarak listeler.',
      '<strong>Değersiz anahtar:</strong> <code>?onizleme</code> gibi bayraklar eşittir işareti olmadan yazılabilir; değer boş kabul edilir.',
      '<strong>Çift kodlama:</strong> çözülen değerde hâlâ <code>%20</code> ya da <code>%25</code> görüyorsanız değer iki kez kodlanmıştır; çıkan değeri yeniden çözmeniz gerekir.',
      '<strong>Bozuk kodlama:</strong> <code>%ZZ</code> gibi geçersiz bir dizi ya da yarım kalmış çok baytlı karakter çözülemez; araç o parçayı değiştirmeden bırakır ve sayısını bildirir.',
    ] },
    { h: 'Gizlilik açısından sorgu dizeleri', p: [
      'Sorgu dizesi adresin parçası olduğundan tarayıcı geçmişine, sunucu kayıtlarına ve bağlantıyı paylaştığınız herkese görünür. Bu nedenle parola, kimlik numarası ya da kart bilgisi gibi verilerin sorgu dizesinde taşınması iyi bir uygulama değildir. Bir bağlantıyı başkasına göndermeden önce parametrelerine bakmak, içinde oturum anahtarı ya da e-posta adresi gibi kişisel bilgi kalıp kalmadığını görmenin kolay yoludur; bu araç tam da bu denetim için uygundur.',
    ] },
  ],
  faq: [
    ['Query string ile URL parametresi aynı şey midir?', 'Gündelik kullanımda evet. Sorgu dizesi soru işaretinden sonraki bölümün tamamıdır; içindeki her anahtar-değer çifti de parametre olarak adlandırılır.'],
    ['Tam adresi mi yoksa yalnızca sorguyu mu yapıştırmalıyım?', 'İkisi de olur. Tam adres yapıştırırsanız araç soru işaretinden öncesini ve diyezden sonrasını atar. Yalnızca sorguyu yapıştırırsanız baştaki soru işareti olsa da olmasa da kabul edilir.'],
    ['Artı işareti neden boşluğa dönüşüyor?', 'Web formlarının gönderim kodlamasında boşluk artı olarak yazılır. Değerinizdeki artı gerçek bir artıysa "Artı olarak bırak" seçeneğini kullanın. Doğru kodlanmış bir adreste gerçek artı %2B olarak yazılır.'],
    ['JSON çıktısında sayılar neden tırnak içinde?', 'Sorgu dizesinde her şey metindir; değerin sayı, tarih ya da mantıksal değer olduğu bilgisi taşınmaz. Araç değerleri değiştirmeden dizgi olarak bırakır, tür dönüşümünü ihtiyaca göre siz yaparsınız.'],
    ['Aynı anahtar birden çok kez geçerse JSON nasıl olur?', 'O anahtarın değeri bir diziye dönüştürülür ve değerler adresteki sırayla eklenir. Liste biçiminde ise her biri ayrı satırda gösterilir.'],
    ['Noktalı virgülle ayrılmış sorguları çözer mi?', 'Hayır. Araç yaygın kullanım olan & ayırıcısını temel alır. Eski bazı sistemlerde görülen noktalı virgül ayırıcısı değer içinde de geçebildiği için otomatik bölünmez.'],
    ['Diyezden sonraki bölüm neden yok sayılıyor?', 'Diyezden sonrası parça (fragment) bölümüdür ve sorgu dizesine ait değildir; sunucuya gönderilmez. Bazı tek sayfalık uygulamalar parça içinde de parametre taşır; onları çözmek için yalnızca o bölümü kutuya yapıştırabilirsiniz.'],
    ['Yapıştırdığım adres bir yere gönderiliyor mu?', 'Hayır. Çözme işlemi tarayıcınızda yapılır; adres ve parametreler sunucuya iletilmez, saklanmaz. İçinde kişisel veri bulunan bağlantıları da bu yüzden güvenle inceleyebilirsiniz.'],
  ],
  related: ['url-ayristir', 'url-kodla', 'utm-link-olustur', 'json-bicimlendir', 'base64-donustur'],
};
