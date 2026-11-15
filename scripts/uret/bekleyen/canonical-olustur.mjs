export default {
  slug: 'canonical-olustur',
  title: 'Canonical Etiketi Oluşturma',
  h1Tail: 'adresi temizle, etiketi al',
  pageTitle: 'Canonical Etiketi Oluşturma – rel=canonical URL Temizleme Aracı',
  description: 'Sayfa adresini izleme parametrelerinden, çapadan ve protokol farklarından arındırıp rel=canonical etiketini ya da HTTP Link başlığını oluşturun.',
  card: 'Adresi izleme parametreleri ve çapadan temizleyin; yinelenen içerik sorununa karşı canonical etiketini alın.',
  category: 'gelistirici',
  keywords: ['canonical etiketi oluşturma', 'rel canonical', 'canonical url nedir', 'kanonik url', 'yinelenen içerik seo', 'canonical tag', 'url temizleme utm silme'],
  lead: 'Aynı içeriğe birden fazla adresten ulaşılabiliyorsa arama motorlarına asıl adresi <strong>canonical</strong> etiketiyle bildirirsiniz. Sayfa adresini yapıştırın; araç izleme parametrelerini ve çapayı siler, protokolü, <code>www</code> önekini ve sondaki eğik çizgiyi seçiminize göre düzenler ve etiketi hazır verir.',
  button: 'Oluştur',
  inputs: [
    { id: 'adres', label: 'Sayfa adresi', type: 'text', placeholder: 'Örn. ornek.com/urun/?utm_source=bulten', wide: true },
    { id: 'protokol', label: 'Protokol', type: 'select', options: [['https', 'https olarak yaz'], ['ayni', 'Olduğu gibi bırak']] },
    { id: 'onek', label: 'www öneki', type: 'select', options: [['ayni', 'Olduğu gibi bırak'], ['ekle', 'Ekle'], ['kaldir', 'Kaldır']] },
    { id: 'egik', label: 'Sondaki eğik çizgi', type: 'select', options: [['ayni', 'Olduğu gibi bırak'], ['ekle', 'Ekle'], ['kaldir', 'Kaldır']] },
    { id: 'parametre', label: 'Sorgu parametreleri', type: 'select', options: [['izleme', 'İzleme parametrelerini sil'], ['hepsi', 'Tümünü sil'], ['koru', 'Tümünü koru']] },
    { id: 'bicim', label: 'Çıktı biçimi', type: 'select', options: [['html', 'HTML link etiketi'], ['http', 'HTTP Link başlığı']] },
  ],
  compute(v, h) {
    let ham = String(v.adres ?? '').trim();
    if (!ham) h.err('"Sayfa adresi" alanını doldurun.');
    if (/\s/.test(ham)) h.err('Adreste boşluk olamaz; adresi tarayıcının adres çubuğundan kopyalayın.');
    const sema = /^([a-z][a-z0-9+.-]*):\/\//i.exec(ham);
    if (sema && !/^https?$/i.test(sema[1])) h.err('Adres http ya da https ile başlamalı.');
    if (!sema) {
      if (ham.startsWith('/')) h.err('Canonical için alan adını içeren tam adres gerekir (örn. ornek.com/sayfa); yalnızca yol yazmayın.');
      ham = 'https://' + ham;
    }
    let u;
    try { u = new URL(ham); } catch { h.err('Adres çözümlenemedi; yazımı kontrol edin (örn. ornek.com/sayfa).'); }
    if (!u.hostname.includes('.') || u.hostname.endsWith('.')) h.err('Adres geçerli bir alan adı içermeli (örn. ornek.com).');
    const deg = [];
    const hamHost = ham.replace(/^[a-z]+:\/\//i, '').split(/[/?#]/)[0].replace(/^.*@/, '');
    let proto = u.protocol;
    if (v.protokol !== 'ayni' && proto === 'http:') { proto = 'https:'; deg.push('protokol https yapıldı'); }
    let host = u.host;
    if (hamHost !== hamHost.toLowerCase()) deg.push('alan adı küçük harfe çevrildi');
    if (u.username || u.password) deg.push('kullanıcı bilgisi silindi');
    const ipMi = /^[\d.]+(:\d+)?$/.test(host) || host.startsWith('[');
    if (v.onek === 'ekle' && !ipMi && !/^www\./.test(host)) { host = 'www.' + host; deg.push('www öneki eklendi'); }
    if (v.onek === 'kaldir' && /^www\./.test(host)) { host = host.slice(4); deg.push('www öneki kaldırıldı'); }
    let yol = u.pathname;
    if (v.egik === 'ekle' && !yol.endsWith('/') && !/\.[A-Za-z0-9]{1,8}$/.test(yol.split('/').pop())) { yol += '/'; deg.push('sona eğik çizgi eklendi'); }
    if (v.egik === 'kaldir' && yol.length > 1 && yol.endsWith('/')) { yol = yol.replace(/\/+$/, '') || '/'; deg.push('sondaki eğik çizgi kaldırıldı'); }
    const izleme = /^(utm_[a-z0-9_]*|gclid|gclsrc|dclid|gbraid|wbraid|fbclid|msclkid|yclid|mc_cid|mc_eid|igshid)$/i;
    const parcalar = u.search.replace(/^\?/, '').split('&').filter(Boolean);
    let kalan = parcalar;
    if (v.parametre === 'hepsi') kalan = [];
    else if (v.parametre !== 'koru') kalan = parcalar.filter((p) => { let k = p.split('=')[0]; try { k = decodeURIComponent(k); } catch {} return !izleme.test(k); });
    const silinen = parcalar.length - kalan.length;
    if (silinen) deg.push(v.parametre === 'hepsi' ? `${silinen} sorgu parametresi silindi` : `${silinen} izleme parametresi silindi`);
    if (u.hash || /#$/.test(ham)) deg.push('çapa (#) bölümü silindi');
    const url = `${proto}//${host}${yol}${kalan.length ? '?' + kalan.join('&') : ''}`;
    const escH = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const etiket = v.bicim === 'http' ? `Link: <${url}>; rel="canonical"` : `<link rel="canonical" href="${escH(url)}">`;
    return {
      rows: [
        ['Canonical adres', url],
        ['Değişiklikler', deg.length ? deg.join('; ') : 'Yok (adres zaten temiz)'],
        ['Adres uzunluğu', `${url.length} karakter`],
      ],
      text: etiket,
      note: v.bicim === 'http' ? 'Başlığı ilgili dosyanın sunucu yanıtına ekleyin; PDF gibi HTML olmayan içerikler için kullanılır.' : 'Etiketi sayfanın head bölümüne ekleyin; her sayfada yalnızca bir canonical etiketi bulunmalıdır.',
    };
  },
  cases: [
    { in: { adres: 'HTTP://WWW.Ornek.com/Urun/?utm_source=bulten&renk=mavi#yorumlar' }, out: { 'Canonical adres': 'https://www.ornek.com/Urun/?renk=mavi', 'Değişiklikler': 'protokol https yapıldı; alan adı küçük harfe çevrildi; 1 izleme parametresi silindi; çapa (#) bölümü silindi' }, text: '<link rel="canonical" href="https://www.ornek.com/Urun/?renk=mavi">' },
    { in: { adres: 'https://ornek.com/blog/yazi/' }, out: { 'Canonical adres': 'https://ornek.com/blog/yazi/', 'Değişiklikler': 'Yok (adres zaten temiz)', 'Adres uzunluğu': '28 karakter' }, text: '<link rel="canonical" href="https://ornek.com/blog/yazi/">' },
    { in: { adres: 'ornek.com/kategori?sayfa=2&siralama=fiyat&fbclid=abc123&gclid=xyz', onek: 'ekle', egik: 'ekle' }, out: { 'Canonical adres': 'https://www.ornek.com/kategori/?sayfa=2&siralama=fiyat' }, text: '<link rel="canonical" href="https://www.ornek.com/kategori/?sayfa=2&amp;siralama=fiyat">' },
    { in: { adres: 'https://www.ornek.com/urunler/masa/?renk=mavi&beden=2', onek: 'kaldir', egik: 'kaldir', parametre: 'hepsi' }, out: { 'Canonical adres': 'https://ornek.com/urunler/masa', 'Değişiklikler': 'www öneki kaldırıldı; sondaki eğik çizgi kaldırıldı; 2 sorgu parametresi silindi' } },
    { in: { adres: 'http://ornek.com/katalog.pdf?utm_medium=eposta', protokol: 'ayni', egik: 'ekle', bicim: 'http' }, out: { 'Canonical adres': 'http://ornek.com/katalog.pdf' }, text: 'Link: <http://ornek.com/katalog.pdf>; rel="canonical"' },
    { in: { adres: 'ornek.com', egik: 'kaldir' }, out: { 'Canonical adres': 'https://ornek.com/' } },
    { in: { adres: 'https://ornek.com:443/ürün?utm_campaign=yaz', parametre: 'koru' }, out: { 'Canonical adres': 'https://ornek.com/%C3%BCr%C3%BCn?utm_campaign=yaz' } },
    { in: { adres: '' }, error: true },
    { in: { adres: '/urun/masa' }, error: true },
    { in: { adres: 'ftp://ornek.com/dosya' }, error: true },
    { in: { adres: 'ornek' }, error: true },
  ],
  howto: [
    'Canonical olarak göstermek istediğiniz sayfanın adresini tarayıcının adres çubuğundan kopyalayıp "Sayfa adresi" alanına yapıştırın.',
    'Sitenizin tercih ettiği yazımı seçin: protokol, <code>www</code> öneki ve sondaki eğik çizgi. Emin değilseniz sitenizin ana sayfasının açıldığı biçimi esas alın.',
    'Sorgu parametreleri için bir seçenek belirleyin. Varsayılan seçenek yalnızca reklam ve kampanya izleme parametrelerini siler; içeriği değiştiren parametreler kalır.',
    '"Oluştur" düğmesine basın, "Değişiklikler" satırından adreste neyin düzeltildiğini kontrol edin.',
    'Etiketi kopyalayıp sayfanın <code>head</code> bölümüne ekleyin.',
  ],
  sections: [
    { h: 'Canonical etiketi nedir?', p: [
      'Canonical (kanonik, yani "asıl") etiketi, bir sayfanın tercih edilen adresini arama motorlarına bildiren bir <code>link</code> öğesidir. Sayfanın başlık bölümünde durur ve <code>rel</code> özelliği <code>canonical</code> değerini taşır; <code>href</code> özelliğine asıl adres yazılır.',
      'Gerekçesi şudur: ziyaretçi için tek olan bir sayfa, teknik olarak onlarca farklı adresten açılabilir. Protokolün güvenli ve güvensiz hâli, <code>www</code> önekli ve öneksiz alan adı, sonda eğik çizgi olan ve olmayan yol, kampanya bağlantılarına eklenen izleme parametreleri, sıralama ve süzme seçenekleri bunların hepsi ayrı adres üretir. Arama motoru bu adresleri ayrı sayfalar olarak tarar, hangisini dizine alacağına kendi karar verir ve sayfaya gelen bağlantıların değeri sürümler arasında bölünür. Canonical etiketi bu kararı sizin vermenizi sağlar.',
    ] },
    { h: 'Araç adresi nasıl temizler?', ul: [
      '<strong>Protokol:</strong> varsayılan olarak güvenli bağlantı protokolüne çevrilir. Siteniz henüz güvenli bağlantı kullanmıyorsa "Olduğu gibi bırak" seçin.',
      '<strong>Alan adı:</strong> her zaman küçük harfe çevrilir, varsayılan bağlantı noktası numarası atılır. Türkçe karakterli alan adları teknik karşılığına dönüştürülür.',
      '<strong>www öneki:</strong> seçiminize göre eklenir, kaldırılır ya da bırakılır.',
      '<strong>Yol:</strong> büyük-küçük harfi değiştirilmez, çünkü sunucuların çoğunda yol büyük-küçük harfe duyarlıdır. Türkçe karakterler yüzde kodlamasına çevrilir.',
      '<strong>Sondaki eğik çizgi:</strong> "Ekle" seçeneği, son parçası <code>.pdf</code> ya da <code>.html</code> gibi dosya uzantısı taşıyan adreslere dokunmaz.',
      '<strong>İzleme parametreleri:</strong> <code>utm_</code> ile başlayan tüm parametreler ile yaygın reklam tıklama kimlikleri (<code>gclid</code>, <code>fbclid</code>, <code>msclkid</code> ve benzerleri) silinir.',
      '<strong>Çapa:</strong> <code>#</code> işaretinden sonraki bölüm her zaman silinir; sayfa içi konumu gösterir ve canonical adreste yeri yoktur.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bir e-bülten kampanyasından gelen şu adresi ele alalım: protokol büyük harfle ve güvensiz yazılmış, alan adı <code>WWW.Ornek.com</code>, yol <code>/Urun/</code>, sorguda <code>utm_source=bulten</code> ve <code>renk=mavi</code> parametreleri, sonda da <code>#yorumlar</code> çapası var. Varsayılan ayarlarla araç dört değişiklik yapar: protokolü güvenli hâle getirir, alan adını küçük harfe çevirir, bir izleme parametresini siler ve çapayı atar. Yoldaki büyük "U" harfi ve içeriği etkileyen <code>renk=mavi</code> parametresi korunur. Sonuç tablosundaki "Değişiklikler" satırı bu dört adımı sırasıyla listeler.',
      'Aynı adreste "Tümünü sil" seçeneğini kullansaydınız <code>renk=mavi</code> de silinirdi. Bu, mavi renkli ürün sayfasının ayrı bir içerik olmadığı, yalnızca aynı ürünün bir görünümü olduğu durumlarda doğrudur.',
    ] },
    { h: 'Parametreleri ne zaman korumalı, ne zaman silmeli?', p: [
      'Kural basittir: parametre sayfanın içeriğini değiştiriyorsa ve o içeriğin arama sonuçlarında ayrı yer almasını istiyorsanız korunur; değiştirmiyorsa silinir. İzleme parametreleri içeriği hiç değiştirmez, her zaman silinmelidir. Sıralama (<code>siralama=fiyat</code>) ve görünüm parametreleri aynı ürünleri farklı düzende gösterdiği için genellikle silinir. Sayfalama parametresi (<code>sayfa=2</code>) ise farklı ürünler listelediği için çoğunlukla korunur; ikinci sayfanın canonical adresini birinci sayfaya vermek, ikinci sayfadaki ürünlerin keşfedilmesini zorlaştırabilir.',
      'Ürün kimliği ya da arama terimi gibi içeriğin kendisini belirleyen parametreler mutlaka korunmalıdır. Emin olamadığınız durumlarda adresi parametreli ve parametresiz açıp sayfanın aynı olup olmadığına bakın.',
    ] },
    { h: 'Uygulama kuralları ve sık hatalar', ul: [
      'Her sayfada <strong>tek</strong> canonical etiketi olmalı; birden fazla etiket varsa hepsi yok sayılabilir.',
      'Etiket <code>head</code> bölümünde yer almalı; gövdeye yazılan canonical dikkate alınmaz.',
      'Adres tam olmalı: protokol ve alan adını içermeli. Bu yüzden araç yalnızca yol yazıldığında hata verir.',
      'Asıl sayfa da kendi adresini gösteren bir canonical taşımalıdır (kendine referans).',
      'Canonical adres açılan, yönlendirme yapmayan ve dizine eklenmesi engellenmemiş bir sayfa olmalı.',
      'Site haritasında, iç bağlantılarda ve hreflang etiketlerinde de aynı canonical adresi kullanın; çelişen sinyaller etiketi zayıflatır.',
    ] },
    { h: 'Sınırlar', p: [
      'Canonical bir komut değil, güçlü bir öneridir; arama motorları diğer sinyaller çok farklı bir şey söylüyorsa başka bir adresi seçebilir. Kalıcı olarak taşınan sayfalarda canonical yerine sunucu yönlendirmesi kullanılmalıdır. Araç adresin gerçekten açılıp açılmadığını ya da sitenizin hangi yazımı kullandığını denetleyemez; yalnızca biçimi düzenler. İzleme parametresi listesi yaygın olanları kapsar; kendi sisteminize özgü izleme parametreleri varsa bunları elle silmeniz ya da "Tümünü sil" seçeneğini kullanmanız gerekir.',
    ] },
  ],
  faq: [
    ['Canonical etiketi nereye yazılır?', 'Sayfanın <code>head</code> bölümüne, diğer meta etiketlerinin yanına yazılır. Gövde bölümüne eklenen canonical etiketi arama motorlarınca dikkate alınmaz.'],
    ['Her sayfada canonical etiketi olmalı mı?', 'Zorunlu değildir ama önerilir. Kopyası olmayan sayfaların da kendi adresini gösteren bir canonical taşıması, izleme parametreli bağlantılardan doğacak yinelenmeleri baştan önler.'],
    ['Canonical ile 301 yönlendirme arasındaki fark nedir?', '301 yönlendirmede ziyaretçi de arama motoru da yeni adrese gönderilir; eski adres artık açılmaz. Canonical\'da her iki adres de açılmaya devam eder, yalnızca arama motoruna hangisinin dizine alınacağı bildirilir.'],
    ['UTM parametreli adresler yinelenen içerik oluşturur mu?', 'Aynı sayfanın farklı adreslerle taranmasına yol açabilir. Sayfada parametresiz adresi gösteren bir canonical etiketi varsa arama motoru bu sürümleri asıl adreste birleştirir.'],
    ['Canonical adres www ile mi, www olmadan mı yazılmalı?', 'Hangisi sitenizin asıl yazımıysa o kullanılır; ikisi de geçerlidir. Önemli olan tüm sayfalarda, site haritasında ve iç bağlantılarda aynı yazımın tutarlı biçimde kullanılmasıdır.'],
    ['Sondaki eğik çizgi fark eder mi?', 'Ana sayfa dışındaki adreslerde eğik çizgili ve çizgisiz yazım teknik olarak iki ayrı adrestir. Sitenizin kullandığı biçimi seçin ve canonical etiketinde aynısını yazın.'],
    ['Canonical başka bir alan adını gösterebilir mi?', 'Evet. Aynı içerik izninizle başka bir sitede de yayımlanıyorsa, o sitedeki sayfa sizin adresinizi canonical olarak gösterebilir. Buna alanlar arası canonical denir.'],
    ['Yapıştırdığım adres kaydediliyor mu?', 'Hayır. Adres tarayıcınızda işlenir; sunucuya gönderilmez ve saklanmaz. Araç adrese bağlanmaz, yalnızca metni düzenler.'],
  ],
  related: ['hreflang-olustur', 'utm-link-olustur', 'url-ayristir', 'meta-etiket-olustur', 'yonlendirme-meta-olustur', 'sitemap-xml-olustur'],
};
