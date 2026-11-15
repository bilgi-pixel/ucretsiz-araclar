export default {
  slug: 'mime-turu-bul',
  title: 'MIME Türü Bulma',
  h1Tail: 'uzantıdan Content-Type',
  pageTitle: 'MIME Türü Bulma – Dosya Uzantısına Göre Content-Type Sorgulama',
  description: 'Dosya uzantısını ya da adını yazın, doğru MIME türünü (Content-Type) öğrenin. MIME türü yazarsanız karşılık gelen uzantılar listelenir.',
  card: 'Dosya uzantısından MIME türünü, MIME türünden uzantıyı bulun; Content-Type başlığı ve yükleme denetimleri için.',
  category: 'gelistirici',
  keywords: ['mime türü bulma', 'mime type nedir', 'content type listesi', 'dosya uzantısı mime', 'pdf mime türü', 'json content type', 'mime type sorgulama', 'webp mime type'],
  lead: 'Bir dosya uzantısı (<code>pdf</code>), dosya adı (<code>rapor.xlsx</code>) ya da MIME türü (<code>image/png</code>) yazın. Araç uzantının doğru <strong>Content-Type</strong> değerini, ters yönde ise o türe karşılık gelen uzantıları gösterir.',
  button: 'Bul',
  inputs: [
    { id: 'girdi', label: 'Uzantı, dosya adı ya da MIME türü', type: 'text', placeholder: 'Örn. pdf, rapor.xlsx, image/png', hint: 'Uzantıyı noktalı ya da noktasız yazabilirsiniz.' },
  ],
  compute(v, h) {
    const t = String(v.girdi ?? '').trim().toLowerCase();
    if (!t) h.err('Bir dosya uzantısı, dosya adı ya da MIME türü yazın (örn. pdf).');
    if (t.length > 200) h.err('Girdi çok uzun. Yalnızca uzantıyı ya da dosya adını yazın.');
    // uzantı: [MIME türü, açıklama]
    const T = {
      html: ['text/html', 'HTML belgesi'], htm: ['text/html', 'HTML belgesi'],
      css: ['text/css', 'CSS stil dosyası'],
      js: ['text/javascript', 'JavaScript dosyası'], mjs: ['text/javascript', 'JavaScript modülü'],
      txt: ['text/plain', 'Düz metin'], csv: ['text/csv', 'Virgülle ayrılmış değerler'],
      md: ['text/markdown', 'Markdown belgesi'], ics: ['text/calendar', 'Takvim (iCalendar) dosyası'],
      vcf: ['text/vcard', 'vCard kartvizit dosyası'], vtt: ['text/vtt', 'WebVTT altyazı dosyası'],
      xml: ['application/xml', 'XML belgesi'], json: ['application/json', 'JSON verisi'],
      jsonld: ['application/ld+json', 'JSON-LD yapısal verisi'],
      webmanifest: ['application/manifest+json', 'Web uygulaması bildirim dosyası'],
      xhtml: ['application/xhtml+xml', 'XHTML belgesi'], rss: ['application/rss+xml', 'RSS beslemesi'],
      atom: ['application/atom+xml', 'Atom beslemesi'], wasm: ['application/wasm', 'WebAssembly modülü'],
      pdf: ['application/pdf', 'PDF belgesi'], rtf: ['application/rtf', 'Zengin metin belgesi'],
      doc: ['application/msword', 'Word belgesi (eski biçim)'],
      docx: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'Word belgesi'],
      xls: ['application/vnd.ms-excel', 'Excel çalışma kitabı (eski biçim)'],
      xlsx: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Excel çalışma kitabı'],
      ppt: ['application/vnd.ms-powerpoint', 'PowerPoint sunusu (eski biçim)'],
      pptx: ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'PowerPoint sunusu'],
      odt: ['application/vnd.oasis.opendocument.text', 'OpenDocument metin belgesi'],
      ods: ['application/vnd.oasis.opendocument.spreadsheet', 'OpenDocument hesap tablosu'],
      odp: ['application/vnd.oasis.opendocument.presentation', 'OpenDocument sunusu'],
      epub: ['application/epub+zip', 'EPUB e-kitap'],
      zip: ['application/zip', 'ZIP arşivi'], gz: ['application/gzip', 'Gzip sıkıştırılmış dosya'],
      tar: ['application/x-tar', 'Tar arşivi'], rar: ['application/vnd.rar', 'RAR arşivi'],
      '7z': ['application/x-7z-compressed', '7-Zip arşivi'], bz2: ['application/x-bzip2', 'Bzip2 sıkıştırılmış dosya'],
      bin: ['application/octet-stream', 'Türü belirsiz ikili veri'], exe: ['application/octet-stream', 'Çalıştırılabilir dosya (ikili veri olarak sunulur)'],
      jpg: ['image/jpeg', 'JPEG görüntüsü'], jpeg: ['image/jpeg', 'JPEG görüntüsü'],
      png: ['image/png', 'PNG görüntüsü'], gif: ['image/gif', 'GIF görüntüsü'],
      webp: ['image/webp', 'WebP görüntüsü'], avif: ['image/avif', 'AVIF görüntüsü'],
      svg: ['image/svg+xml', 'SVG vektör görüntüsü'], ico: ['image/vnd.microsoft.icon', 'Simge dosyası'],
      bmp: ['image/bmp', 'Bitmap görüntüsü'], tif: ['image/tiff', 'TIFF görüntüsü'], tiff: ['image/tiff', 'TIFF görüntüsü'],
      heic: ['image/heic', 'HEIC görüntüsü'], apng: ['image/apng', 'Hareketli PNG'],
      mp3: ['audio/mpeg', 'MP3 ses dosyası'], wav: ['audio/wav', 'WAV ses dosyası'],
      ogg: ['audio/ogg', 'Ogg ses dosyası'], oga: ['audio/ogg', 'Ogg ses dosyası'],
      m4a: ['audio/mp4', 'MPEG-4 ses dosyası'], aac: ['audio/aac', 'AAC ses dosyası'],
      flac: ['audio/flac', 'FLAC kayıpsız ses dosyası'], weba: ['audio/webm', 'WebM ses dosyası'],
      mid: ['audio/midi', 'MIDI dosyası'], midi: ['audio/midi', 'MIDI dosyası'], opus: ['audio/ogg', 'Opus ses dosyası (Ogg kapsayıcısında)'],
      mp4: ['video/mp4', 'MP4 video'], webm: ['video/webm', 'WebM video'], ogv: ['video/ogg', 'Ogg video'],
      mov: ['video/quicktime', 'QuickTime video'], avi: ['video/x-msvideo', 'AVI video'],
      mkv: ['video/x-matroska', 'Matroska video'], mpeg: ['video/mpeg', 'MPEG video'], mpg: ['video/mpeg', 'MPEG video'],
      ts: ['video/mp2t', 'MPEG aktarım akışı'], '3gp': ['video/3gpp', '3GPP video'],
      woff: ['font/woff', 'WOFF web yazı tipi'], woff2: ['font/woff2', 'WOFF2 web yazı tipi'],
      ttf: ['font/ttf', 'TrueType yazı tipi'], otf: ['font/otf', 'OpenType yazı tipi'],
      eot: ['application/vnd.ms-fontobject', 'Embedded OpenType yazı tipi'],
      php: ['application/x-httpd-php', 'PHP betiği'], sh: ['application/x-sh', 'Kabuk betiği'],
      sql: ['application/sql', 'SQL betiği'], yaml: ['application/yaml', 'YAML verisi'], yml: ['application/yaml', 'YAML verisi'],
    };
    const gruplar = { text: 'Metin (text)', image: 'Görüntü (image)', audio: 'Ses (audio)', video: 'Video (video)', application: 'Uygulama / ikili veri (application)', font: 'Yazı tipi (font)', multipart: 'Çok parçalı (multipart)', message: 'İleti (message)', model: '3B model (model)' };
    const metinsel = (m) => m.startsWith('text/') || /json|xml|javascript|yaml|sql$/.test(m);

    if (t.includes('/')) {
      // Ters arama: MIME türü → uzantılar
      const mime = t.split(';')[0].trim();
      if (!/^[a-z0-9][a-z0-9!#$&^_.+-]*\/[a-z0-9][a-z0-9!#$&^_.+-]*$/.test(mime)) h.err('Geçerli bir MIME türü "tür/alt tür" biçimindedir (örn. image/png).');
      const es = { 'application/javascript': 'text/javascript', 'application/x-javascript': 'text/javascript', 'image/jpg': 'image/jpeg', 'text/xml': 'application/xml', 'audio/mp3': 'audio/mpeg', 'image/x-icon': 'image/vnd.microsoft.icon', 'audio/x-wav': 'audio/wav', 'application/x-zip-compressed': 'application/zip' };
      const asil = es[mime] || mime;
      const uz = Object.keys(T).filter((k) => T[k][0] === asil);
      const ust = asil.split('/')[0];
      if (!uz.length) {
        if (!gruplar[ust]) h.err(`"${mime}" tanınan bir üst türle başlamıyor. Üst tür text, image, audio, video, application, font gibi bir değer olmalıdır.`);
        return {
          rows: [['Uzantı', 'Tabloda karşılığı yok'], ['MIME türü', asil], ['Tür grubu', gruplar[ust]]],
          note: 'Bu MIME türü biçim olarak geçerli, ancak aracın tablosunda eşleşen bir uzantı bulunmuyor.',
        };
      }
      return {
        rows: [
          ['Uzantı', uz.map((u) => '.' + u).join(', ')],
          ['MIME türü', asil],
          ['Tür grubu', gruplar[ust]],
          ['Açıklama', T[uz[0]][1]],
        ],
        note: es[mime] ? `"${mime}" yaygın ama eski ya da standart dışı bir yazımdır; güncel karşılığı "${asil}" kullanılmıştır.` : 'Aynı MIME türü birden fazla uzantıyla eşleşebilir.',
      };
    }

    // Uzantı ya da dosya adı
    const ad = t.replace(/[?#].*$/, '');
    const uzanti = ad.includes('.') ? ad.slice(ad.lastIndexOf('.') + 1) : ad;
    if (!/^[a-z0-9]{1,12}$/.test(uzanti)) h.err('Uzantı yalnızca harf ve rakamdan oluşmalıdır (örn. pdf, mp4, woff2).');
    const k = T[uzanti];
    if (!k) h.err(`".${uzanti}" uzantısı tabloda yok. Türü bilinmeyen dosyalar için genel değer application/octet-stream kullanılır.`);
    const mime = k[0];
    const ust = mime.split('/')[0];
    return {
      rows: [
        ['MIME türü', mime],
        ['Uzantı', '.' + uzanti],
        ['Tür grubu', gruplar[ust]],
        ['Açıklama', k[1]],
        ['Content-Type başlığı', metinsel(mime) ? `Content-Type: ${mime}; charset=utf-8` : `Content-Type: ${mime}`],
      ],
      note: metinsel(mime) ? 'Metin tabanlı türlerde karakter kodlamasını da belirtmek Türkçe karakterlerin bozulmasını önler.' : 'İkili dosya türlerinde charset parametresi kullanılmaz.',
    };
  },
  cases: [
    { in: { girdi: 'pdf' }, out: { 'MIME türü': 'application/pdf', 'Uzantı': '.pdf', 'Tür grubu': 'Uygulama / ikili veri (application)', 'Content-Type başlığı': 'Content-Type: application/pdf' } },
    { in: { girdi: 'rapor.xlsx' }, out: { 'MIME türü': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Uzantı': '.xlsx', 'Açıklama': 'Excel çalışma kitabı' } },
    { in: { girdi: 'image/jpeg' }, out: { 'Uzantı': '.jpg, .jpeg', 'MIME türü': 'image/jpeg', 'Tür grubu': 'Görüntü (image)' } },
    { in: { girdi: '.JSON' }, out: { 'MIME türü': 'application/json', 'Content-Type başlığı': 'Content-Type: application/json; charset=utf-8' } },
    { in: { girdi: 'arsiv.tar.gz' }, out: { 'MIME türü': 'application/gzip', 'Uzantı': '.gz' } },
    { in: { girdi: 'html' }, out: { 'MIME türü': 'text/html', 'Tür grubu': 'Metin (text)', 'Content-Type başlığı': 'Content-Type: text/html; charset=utf-8' } },
    { in: { girdi: 'application/javascript' }, out: { 'MIME türü': 'text/javascript', 'Uzantı': '.js, .mjs' } },
    { in: { girdi: 'woff2' }, out: { 'MIME türü': 'font/woff2', 'Tür grubu': 'Yazı tipi (font)' } },
    { in: { girdi: 'image/x-ornek' }, out: { 'Uzantı': 'Tabloda karşılığı yok', 'Tür grubu': 'Görüntü (image)' } },
    { in: { girdi: 'qqqzz' }, error: true },
    { in: { girdi: '' }, error: true },
    { in: { girdi: 'image/' }, error: true },
  ],
  howto: [
    'Kutuya dosya uzantısını yazın: <code>pdf</code>, <code>.webp</code> ya da <code>woff2</code>. Büyük-küçük harf fark etmez, baştaki nokta isteğe bağlıdır.',
    'Uzantı yerine dosya adının tamamını da yazabilirsiniz; araç son noktadan sonraki bölümü uzantı olarak alır. <code>arsiv.tar.gz</code> için uzantı <code>gz</code> kabul edilir.',
    'Ters yönde arama için MIME türünü yazın (<code>image/jpeg</code>). İçinde eğik çizgi bulunan girdi MIME türü sayılır ve karşılık gelen uzantılar listelenir.',
    '"Bul" düğmesine basın. MIME türü, tür grubu ve sunucu yapılandırmasına doğrudan yazabileceğiniz Content-Type satırı görüntülenir.',
    'Sonucu kopyalayıp sunucu ayarınıza, API yanıt başlığına ya da dosya yükleme denetim listenize ekleyin.',
  ],
  sections: [
    { h: 'MIME türü nedir?', p: [
      'MIME türü, bir verinin ne tür içerik olduğunu yazılımlara bildiren kısa bir etikettir. Adı e-posta eklerini tanımlamak için geliştirilen bir standarttan gelir; bugün web\'in tamamında kullanılır ve "ortam türü" ya da "içerik türü" olarak da anılır. Sunucu bir dosyayı gönderirken <code>Content-Type</code> başlığına bu etiketi yazar; tarayıcı da dosyayı görüntülemek mi, oynatmak mı, yoksa indirmek mi gerektiğine bu başlığa bakarak karar verir.',
      'Önemli nokta şudur: tarayıcılar dosyanın uzantısına değil, sunucunun bildirdiği türe güvenir. Uzantısı <code>.css</code> olan bir dosya <code>text/plain</code> olarak sunulursa tarayıcı onu stil dosyası olarak uygulamayı reddedebilir. Sitenizde bir yazı tipi yüklenmiyor, betik çalışmıyor ya da görsel indirilmeye çalışılıyorsa ilk bakılacak yerlerden biri bu başlıktır.',
    ] },
    { h: 'Yapısı: tür, alt tür ve parametre', p: [
      'Bir MIME türü eğik çizgiyle ayrılan iki bölümden oluşur: <strong>tür/alt tür</strong>. İlk bölüm genel kategoriyi, ikincisi kesin biçimi verir. <code>image/png</code> örneğinde "image" bunun bir görüntü olduğunu, "png" ise hangi görüntü biçimi olduğunu söyler. Sonuna noktalı virgülle parametre eklenebilir; en yaygını metin dosyalarındaki karakter kodlamasıdır: <code>text/html; charset=utf-8</code>.',
      'Alt türlerde görülen <code>+xml</code>, <code>+json</code>, <code>+zip</code> gibi ekler, biçimin hangi temel sözdizimi üzerine kurulduğunu gösterir. <code>image/svg+xml</code> bir görüntüdür ama içeriği XML\'dir. <code>vnd.</code> ile başlayan alt türler belirli bir üreticiye ait biçimleri, <code>x-</code> ile başlayanlar ise resmî kayıtta yer almayan, alışkanlıkla kullanılan adları belirtir.',
    ] },
    { h: 'Ana tür grupları', ul: [
      '<strong>text:</strong> insan tarafından okunabilir metin; HTML, CSS, düz metin, CSV.',
      '<strong>image:</strong> görüntüler; JPEG, PNG, WebP, AVIF, SVG, GIF.',
      '<strong>audio:</strong> ses dosyaları; MP3, WAV, Ogg, AAC.',
      '<strong>video:</strong> video dosyaları; MP4, WebM, QuickTime.',
      '<strong>font:</strong> yazı tipleri; WOFF, WOFF2, TrueType, OpenType.',
      '<strong>application:</strong> diğer kategorilere girmeyen ya da bir uygulamayla işlenmesi gereken veri; PDF, JSON, ZIP, ofis belgeleri.',
      '<strong>multipart:</strong> birden fazla parçadan oluşan gövdeler; dosya yüklenen form gönderimleri <code>multipart/form-data</code> kullanır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      'Kutuya <code>pdf</code> yazdığınızda araç MIME türünü <strong>application/pdf</strong>, tür grubunu "Uygulama / ikili veri" olarak verir ve Content-Type satırını parametresiz gösterir; çünkü ikili dosyalarda karakter kodlaması belirtilmez. <code>html</code> yazdığınızda sonuç <strong>text/html</strong> olur ve başlık satırına <code>charset=utf-8</code> eklenir.',
      'Ters yönde <code>image/jpeg</code> yazarsanız araç <strong>.jpg, .jpeg</strong> uzantılarını listeler: aynı tür iki uzantıyla da kullanılır. <code>application/javascript</code> yazdığınızda ise araç bunun eski bir yazım olduğunu belirtir ve güncel karşılığı olan <strong>text/javascript</strong> ile birlikte <code>.js, .mjs</code> uzantılarını döndürür.',
    ] },
    { h: 'Uygulamada nerede gerekir?', p: [
      'Sunucu yapılandırmasında yeni bir dosya biçimi tanıtırken, örneğin WebP görselleri ya da WOFF2 yazı tiplerini doğru başlıkla sunmak için uzantıyla türü eşleştirmeniz gerekir. API geliştirirken yanıtın <code>application/json</code> olarak işaretlenmesi, istemcinin veriyi doğru ayrıştırması için şarttır. Dosya indirme bağlantılarında tür ile birlikte <code>Content-Disposition</code> başlığı, dosyanın tarayıcıda açılması yerine kaydedilmesini sağlar.',
      'Dosya yükleme formlarında izin verilen türlerin listesi çoğunlukla MIME türleriyle tanımlanır. HTML\'deki <code>accept</code> özniteliğine <code>image/png, image/jpeg</code> gibi değerler yazılır. E-posta gönderen yazılımlarda eklerin türü de aynı etiketle belirtilir; fatura PDF\'i gönderen bir muhasebe programı eki <code>application/pdf</code> olarak işaretler.',
    ] },
    { h: 'Güvenlik notu ve sınırlar', p: [
      'Uzantı da, istemcinin bildirdiği MIME türü de kullanıcı tarafından değiştirilebilir. Bir dosyanın adını <code>.jpg</code> yapmak onu görüntü yapmaz. Yükleme kabul eden uygulamalarda yalnızca uzantıya ya da gönderilen türe güvenmek yeterli değildir; dosyanın içeriği sunucu tarafında ayrıca incelenmelidir. Sunucuların <code>X-Content-Type-Options: nosniff</code> başlığını göndermesi, tarayıcının bildirilen türü kendi tahminiyle değiştirmesini engeller.',
      'Araç yaygın web, ofis, ortam ve arşiv biçimlerini içeren sabit bir tabloyla çalışır; var olan bütün uzantıları kapsamaz. Tabloda bulunmayan bir uzantı için hata iletisi görürsünüz. Türü bilinmeyen dosyalar için genel kabul gören değer <code>application/octet-stream</code>\'dir; bu değer tarayıcıya dosyayı yorumlamaya çalışmadan indirmesini söyler. Araç dosyanın içeriğine bakmaz, yalnızca yazdığınız adı değerlendirir.',
    ] },
  ],
  faq: [
    ['MIME türü ile Content-Type aynı şey mi?', 'MIME türü etiketin kendisidir, Content-Type ise bu etiketin taşındığı HTTP başlığının adıdır. Başlık MIME türüne ek olarak karakter kodlaması gibi parametreler de içerebilir: Content-Type: text/html; charset=utf-8.'],
    ['JSON için doğru MIME türü nedir?', 'application/json. Bazı eski uygulamalarda text/json ya da text/plain görülür, ancak istemcilerin yanıtı otomatik olarak JSON diye ayrıştırması için application/json kullanılmalıdır.'],
    ['JavaScript dosyaları text/javascript mi, application/javascript mi olmalı?', 'Güncel standart text/javascript değerini önerir; application/javascript eskimiş sayılır. Tarayıcılar ikisini de çalıştırır, ancak yeni yapılandırmalarda text/javascript tercih edilmelidir.'],
    ['Uzantısını bilmediğim bir dosyayı nasıl sunmalıyım?', 'Türü belirlenemeyen ikili veriler için application/octet-stream kullanılır. Tarayıcı bu türü görüntülemeye çalışmaz, dosyayı indirir.'],
    ['.jpg ile .jpeg arasında MIME türü farkı var mı?', 'Hayır, ikisi de image/jpeg türündedir. Uzantı farkı eski dosya sistemlerindeki üç karakter sınırından kalmadır. image/jpg ise standart bir tür değildir; araç onu image/jpeg olarak düzeltir.'],
    ['charset parametresini hangi türlerde eklemeliyim?', 'Metin tabanlı türlerde: HTML, CSS, düz metin, CSV, JavaScript gibi. Kodlama belirtilmezse Türkçe karakterler yanlış görüntülenebilir. Görüntü, video, PDF ve arşiv gibi ikili türlerde bu parametrenin anlamı yoktur.'],
    ['Araç dosyamın gerçek türünü denetliyor mu?', 'Hayır. Araç yalnızca yazdığınız uzantı ya da ada göre tablodan karşılık bulur; dosyanın içeriğini okumaz. Bir dosyanın gerçekten bildirilen türde olup olmadığını anlamak için içeriğinin incelenmesi gerekir.'],
    ['Yazdığım dosya adları bir yere gönderiliyor mu?', 'Hayır. Eşleştirme tablosu sayfanın içindedir ve arama tarayıcınızda yapılır. Yazdığınız ad ya da tür sunucuya iletilmez, saklanmaz.'],
  ],
  related: ['http-durum-kodlari', 'data-uri-olustur', 'user-agent-coz', 'url-ayristir', 'htaccess-yonlendirme-olustur'],
};
