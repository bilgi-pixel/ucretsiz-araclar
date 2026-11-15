export default {
  slug: 'url-ayristir',
  title: 'URL Ayrıştırma (Parçalarına Ayırma)',
  h1Tail: 'şema, host, yol, sorgu',
  pageTitle: 'URL Ayrıştırma – Adresi Şema, Host, Yol ve Sorguya Ayırma',
  description: 'Bir web adresini parçalarına ayırın: şema, kullanıcı bilgisi, ana makine, port, yol, sorgu parametreleri ve parça. Parametreler çözülmüş olarak listelenir.',
  card: 'Web adresini şema, ana makine, port, yol, sorgu parametreleri ve parça olarak ayırın; parametreleri çözülmüş görün.',
  category: 'gelistirici',
  keywords: ['url ayrıştırma', 'url parse', 'url parçaları', 'url çözümleme', 'adres çubuğu parametreleri', 'url host port yol', 'url parser online'],
  lead: 'Uzun bir web adresini yapıştırın; araç onu <strong>şema, ana makine, port, yol, sorgu dizesi ve parça</strong> bölümlerine ayırsın. Sorgu parametreleri yüzde kodlaması çözülmüş hâlde, sırasıyla listelenir.',
  button: 'Ayrıştır',
  inputs: [
    { id: 'adres', label: 'Adres (URL)', type: 'textarea', placeholder: 'Örn. ornek.com:8080/urunler/ayakkabi?renk=mavi&beden=42#yorumlar', wide: true, rows: 3, hint: 'Şema yazmazsanız adres https ile başlıyormuş gibi yorumlanır.' },
  ],
  compute(v, h) {
    let t = String(v.adres ?? '').trim();
    if (t === '') h.err('Ayrıştırılacak adresi yazın ya da yapıştırın.');
    if (/\s/.test(t)) h.err('Adres boşluk içeremez. Boşlukları %20 ile kodlayın ya da adresi tek parça hâlinde yapıştırın.');
    let varsayildi = false;
    if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(t) || /^[^/?#]+:\d+([/?#]|$)/.test(t) && !/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(t)) {
      t = 'https://' + t.replace(/^\/\//, ''); varsayildi = true;
    }
    let u;
    try { u = new URL(t); } catch { h.err('Adres ayrıştırılamadı. Ana makine adını ve port numarasını kontrol edin (örn. ornek.com/sayfa?id=5).'); }
    const sema = u.protocol.replace(/:$/, '');
    const VARS = { http: '80', https: '443', ftp: '21', ws: '80', wss: '443' };
    const port = u.port ? u.port : (VARS[sema] && u.hostname ? `${VARS[sema]} (varsayılan)` : '—');
    const coz = (s) => { try { return decodeURIComponent(s); } catch { return s; } };
    const params = [...new URLSearchParams(u.search)];
    const kullanici = u.username ? coz(u.username) + (u.password ? ' (parola: ' + coz(u.password) + ')' : '') : '—';
    const yol = u.pathname || '—';
    const rows = [
      ['Ana makine (host)', u.hostname || '—'],
      ['Şema', sema + (varsayildi ? ' (varsayıldı)' : '')],
      ['Port', port],
      ['Kullanıcı bilgisi', kullanici],
      ['Yol', yol],
    ];
    if (yol !== '—' && coz(yol) !== yol) rows.push(['Yol (çözülmüş)', coz(yol)]);
    rows.push(
      ['Sorgu dizesi', u.search ? u.search.slice(1) : '—'],
      ['Parametre sayısı', String(params.length)],
      ['Parça (fragment)', u.hash ? coz(u.hash.slice(1)) : '—'],
      ['Köken (origin)', u.origin && u.origin !== 'null' ? u.origin : '—'],
      ['Düzgünleştirilmiş adres', u.href],
    );
    const res = { rows, note: varsayildi ? 'Adreste şema bulunmadığı için https varsayıldı.' : 'Ana makine adı küçük harfe çevrilir; yoldaki "." ve ".." parçaları sadeleştirilir.' };
    if (params.length) res.text = 'Sorgu parametreleri:\n' + params.map(([k, d], i) => `${i + 1}. ${k} = ${d}`).join('\n');
    return res;
  },
  cases: [
    { in: { adres: 'https://www.ornek.com:8080/urunler/ayakkabi?renk=mavi&beden=42#yorumlar' }, out: { 'Ana makine (host)': 'www.ornek.com', 'Şema': 'https', 'Port': '8080', 'Yol': '/urunler/ayakkabi', 'Sorgu dizesi': 'renk=mavi&beden=42', 'Parametre sayısı': '2', 'Parça (fragment)': 'yorumlar', 'Köken (origin)': 'https://www.ornek.com:8080' }, text: 'Sorgu parametreleri:\n1. renk = mavi\n2. beden = 42' },
    { in: { adres: 'ornek.com/arama?q=mavi%20ayakkab%C4%B1&sayfa=2' }, out: { 'Ana makine (host)': 'ornek.com', 'Şema': 'https (varsayıldı)', 'Port': '443 (varsayılan)', 'Yol': '/arama', 'Parametre sayısı': '2', 'Parça (fragment)': '—' }, text: 'Sorgu parametreleri:\n1. q = mavi ayakkabı\n2. sayfa = 2' },
    { in: { adres: 'ftp://kullanici:gizli@dosya.ornek.com/pub/rapor.pdf' }, out: { 'Ana makine (host)': 'dosya.ornek.com', 'Şema': 'ftp', 'Port': '21 (varsayılan)', 'Kullanıcı bilgisi': 'kullanici (parola: gizli)', 'Yol': '/pub/rapor.pdf', 'Sorgu dizesi': '—', 'Parametre sayısı': '0' } },
    { in: { adres: 'http://localhost:3000' }, out: { 'Ana makine (host)': 'localhost', 'Şema': 'http', 'Port': '3000', 'Yol': '/', 'Düzgünleştirilmiş adres': 'http://localhost:3000/' } },
    { in: { adres: 'https://Ornek.COM/a/b/../c/./d.html?x=1&x=2&bos' }, out: { 'Ana makine (host)': 'ornek.com', 'Yol': '/a/c/d.html', 'Parametre sayısı': '3', 'Düzgünleştirilmiş adres': 'https://ornek.com/a/c/d.html?x=1&x=2&bos' }, text: 'Sorgu parametreleri:\n1. x = 1\n2. x = 2\n3. bos = ' },
    { in: { adres: 'localhost:8080/panel' }, out: { 'Ana makine (host)': 'localhost', 'Şema': 'https (varsayıldı)', 'Port': '8080', 'Yol': '/panel' } },
    { in: { adres: 'https://ornek.com/kategori/%C3%A7ocuk-giyim' }, out: { 'Yol': '/kategori/%C3%A7ocuk-giyim', 'Yol (çözülmüş)': '/kategori/çocuk-giyim' } },
    { in: { adres: '' }, error: true },
    { in: { adres: 'http://' }, error: true },
    { in: { adres: 'ornek com/sayfa' }, error: true },
  ],
  howto: [
    'İncelemek istediğiniz adresi tarayıcının adres çubuğundan ya da bir belgeden kopyalayıp kutuya yapıştırın.',
    '"Ayrıştır" düğmesine basın. Adresin her bölümü ayrı bir satırda gösterilir; bulunmayan bölümler tire ile işaretlenir.',
    'Sorgu parametreleri varsa alttaki metin kutusunda numaralı liste olarak, yüzde kodlaması çözülmüş hâlde görünür.',
    'İhtiyacınız olan parçayı seçip kopyalayın ya da "Sonucu kopyala" ile tüm dökümü panoya alın.',
  ],
  sections: [
    { h: 'Bir URL hangi parçalardan oluşur?', p: [
      'URL, internetteki bir kaynağın adresidir ve belirli bir sırayla dizilmiş bölümlerden oluşur. Genel kalıp şöyledir: şema, iki nokta ve iki eğik çizgi, isteğe bağlı kullanıcı bilgisi, ana makine, isteğe bağlı port, yol, soru işaretiyle başlayan sorgu ve diyez işaretiyle başlayan parça. Tam bir örnek: <code>ftp://kullanici:gizli@dosya.ornek.com:21/pub/rapor.pdf</code>. Web sayfalarında şema olarak <code>http</code> ya da <code>https</code> kullanılır, yapı aynıdır.',
    ], ul: [
      '<strong>Şema:</strong> kaynağa hangi protokolle ulaşılacağını söyler (http, https, ftp, mailto gibi).',
      '<strong>Kullanıcı bilgisi:</strong> ana makineden önce, @ işaretine kadar yazılan kullanıcı adı ve parola. Günümüzde web adreslerinde kullanılması önerilmez.',
      '<strong>Ana makine (host):</strong> alan adı ya da IP adresi. Büyük-küçük harfe duyarlı değildir.',
      '<strong>Port:</strong> sunucudaki kapı numarası. Yazılmazsa şemanın varsayılanı geçerlidir.',
      '<strong>Yol:</strong> sunucudaki kaynağın konumu; eğik çizgilerle bölünür ve çoğu sunucuda harf büyüklüğüne duyarlıdır.',
      '<strong>Sorgu dizesi:</strong> soru işaretinden sonra gelen <code>anahtar=değer</code> çiftleri; çiftler <code>&</code> ile ayrılır.',
      '<strong>Parça (fragment):</strong> diyezden sonra gelen bölüm. Sunucuya gönderilmez; tarayıcı sayfa içinde ilgili yere gitmek için kullanır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bir alışveriş sitesinden kopyalanmış şu adresi düşünün: şema <code>https</code>, ardından <code>ornek.com:8080/urunler/ayakkabi?renk=mavi&beden=42#yorumlar</code>. Araç bu adresi şöyle ayırır: ana makine <code>ornek.com</code>, port <code>8080</code>, yol <code>/urunler/ayakkabi</code>, sorgu dizesi <code>renk=mavi&beden=42</code>, parça <code>yorumlar</code>. Parametre sayısı 2\'dir ve liste "renk = mavi", "beden = 42" satırlarını içerir.',
      'Kodlanmış bir arama adresi için: <code>ornek.com/arama?q=mavi%20ayakkab%C4%B1&sayfa=2</code>. Şema yazılmadığı için araç https varsayar ve portu "443 (varsayılan)" olarak gösterir. Sorgudaki <code>%20</code> boşluğa, <code>%C4%B1</code> ise "ı" harfine çevrilir; listede "q = mavi ayakkabı" ve "sayfa = 2" görürsünüz.',
    ] },
    { h: 'Varsayılan portlar', p: [
      'Adreste port yazmıyorsa tarayıcı şemaya göre standart portu kullanır. Araç bu durumda portu "(varsayılan)" notuyla gösterir. Sık karşılaşılan değerler:',
    ], ul: [
      '<strong>http</strong> ve <strong>ws</strong>: 80',
      '<strong>https</strong> ve <strong>wss</strong>: 443',
      '<strong>ftp</strong>: 21',
    ] },
    { h: 'Düzgünleştirme neleri değiştirir?', p: [
      'Araç adresi tarayıcıların kullandığı URL standardına göre okur ve son satırda düzgünleştirilmiş biçimini verir. Bu sırada birkaç şey olur: şema ve ana makine küçük harfe çevrilir, yoldaki <code>.</code> ve <code>..</code> parçaları sadeleştirilir (örneğin <code>/a/b/../c/./d.html</code> yolu <code>/a/c/d.html</code> olur), şemanın varsayılan portu açıkça yazılmışsa atılır ve yol boşsa tek bir eğik çizgi eklenir. Türkçe karakter içeren alan adları, alan adı sisteminin anlayacağı <code>xn--</code> ile başlayan Punycode biçimine dönüştürülür.',
      'Sorgu dizesindeki sıra ve yinelenen anahtarlar korunur. Aynı anahtar birden fazla kez geçiyorsa hepsi ayrı satırda listelenir; hangisinin geçerli sayılacağı adresi işleyen sunucu yazılımına bağlıdır.',
    ] },
    { h: 'Ne zaman işinize yarar?', p: [
      'Reklam ve bülten bağlantılarındaki izleme parametrelerini ayıklarken, bir API isteğinde hangi değerlerin gönderildiğini kontrol ederken, yönlendirme kurallarını yazmadan önce yolun tam hâlini görmek isterken ya da bir hata kaydındaki adresi okunur hâle getirirken ayrıştırma büyük kolaylık sağlar. Müşteriden gelen "sayfa açılmıyor" bildirimlerinde adresin içindeki yanlış kodlanmış bir karakteri ya da eksik bir parametreyi bulmak da çoğu zaman adresi parçalarına ayırmakla başlar.',
      'Güvenlik açısından da yararlıdır: şüpheli bir bağlantıda gerçek ana makinenin hangisi olduğunu görmek için @ işaretinden sonraki bölüme bakılır. Kullanıcı bilgisi alanına tanıdık bir site adı yazılıp asıl hedefin gizlenmesi bilinen bir aldatma yöntemidir; araç ana makineyi ayrı satırda gösterdiği için bu fark hemen anlaşılır.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç adresi yalnızca metin olarak çözümler; adrese bağlanmaz, sayfanın var olup olmadığını ya da nereye yönlendirdiğini denetlemez. Alan adını "alt alan adı" ve "kayıtlı alan adı" olarak bölmez, çünkü bunun için güncel bir uzantı listesi gerekir. Şemasız girdilerde https varsayılır; göreli yollar (örneğin yalnızca <code>/urunler</code>) tam adres olmadığından anlamlı biçimde ayrıştırılamaz. Sorgudaki artı işareti, form kodlamasına uygun olarak boşluk kabul edilir.',
    ] },
  ],
  faq: [
    ['URL ile alan adı aynı şey midir?', 'Hayır. Alan adı yalnızca ana makine bölümüdür (örneğin ornek.com). URL ise şema, yol, sorgu ve parça gibi bölümleri de içeren tam adrestir.'],
    ['Sorgu dizesi ile parça arasındaki fark nedir?', 'Sorgu dizesi soru işaretinden sonra gelir ve sunucuya gönderilir; sayfa içeriğini etkileyebilir. Parça diyez işaretinden sonra gelir, sunucuya gönderilmez ve yalnızca tarayıcıda sayfa içi konumlanma ya da istemci tarafı gezinme için kullanılır.'],
    ['Adresteki %20, %C3%A7 gibi ifadeler ne anlama gelir?', 'Bunlar yüzde kodlamasıdır. Adreslerde doğrudan yazılamayan boşluk ve Türkçe harfler gibi karakterler, UTF-8 baytlarının onaltılık değeriyle yazılır. %20 boşluk, %C3%A7 ise "ç" harfidir. Araç parametreleri ve yolu çözülmüş hâliyle de gösterir.'],
    ['Port satırında neden "varsayılan" yazıyor?', 'Adreste port belirtilmediğinde tarayıcı şemanın standart portunu kullanır: http için 80, https için 443. Araç bu değeri bilgi amaçlı gösterir; adresin kendisinde port yazmadığını belirtmek için notu ekler.'],
    ['Aynı parametre iki kez geçerse ne olur?', 'Araç ikisini de sırasıyla listeler. Hangisinin kullanılacağı sunucu tarafındaki yazılıma göre değişir; bazıları ilkini, bazıları sonuncuyu alır, bazıları ikisini bir dizi olarak yorumlar.'],
    ['Şema yazmadan adres girebilir miyim?', 'Evet. Adres bir şemayla başlamıyorsa araç https ile başlıyormuş gibi yorumlar ve bunu sonuçta "(varsayıldı)" notuyla belirtir.'],
    ['Türkçe karakterli alan adı neden xn-- ile başlıyor?', 'Alan adı sistemi yalnızca sınırlı bir karakter kümesini taşır. Türkçe harf içeren adlar Punycode adlı yöntemle bu kümeye çevrilir ve xn-- önekiyle yazılır. Tarayıcı adres çubuğunda çoğunlukla özgün yazımı gösterir, arka planda bu biçimi kullanır.'],
    ['Yapıştırdığım adres bir yere gönderiliyor ya da ziyaret ediliyor mu?', 'Hayır. Ayrıştırma tarayıcınızda yapılır; adres sunucuya iletilmez, açılmaz ve saklanmaz. Bu sayede içinde oturum bilgisi ya da kişisel veri bulunan adresleri de güvenle inceleyebilirsiniz.'],
  ],
  related: ['sorgu-dizesi-coz', 'url-kodla', 'utm-link-olustur', 'punycode-cevir', 'port-numarasi-bul'],
};
