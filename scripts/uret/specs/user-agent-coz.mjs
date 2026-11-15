export default {
  slug: 'user-agent-coz',
  title: 'User-Agent Çözümleme',
  h1Tail: 'tarayıcı, sistem ve cihaz',
  pageTitle: 'User-Agent Çözümleme – Tarayıcı, İşletim Sistemi ve Cihaz Bulma',
  description: 'User-Agent dizgisini yapıştırın; tarayıcı adı ve sürümü, işletim sistemi, cihaz türü, işleme motoru ve bot olup olmadığı anında çözümlensin.',
  card: 'User-Agent dizgisinden tarayıcıyı, sürümünü, işletim sistemini, cihaz türünü ve bot olup olmadığını çıkarın.',
  category: 'gelistirici',
  keywords: ['user agent çözümleme', 'user agent nedir', 'user agent parser', 'tarayıcı bilgisi öğrenme', 'user agent okuma', 'log user agent analizi', 'bot user agent', 'ua string çözme'],
  lead: 'Sunucu günlüğünden, hata raporundan ya da geliştirici araçlarından kopyaladığınız <strong>User-Agent</strong> dizgisini yapıştırın. Araç dizgiyi parçalarına ayırır; tarayıcıyı, sürümünü, işletim sistemini, cihaz türünü ve işleme motorunu okunur biçimde gösterir.',
  button: 'Çözümle',
  inputs: [
    { id: 'ua', label: 'User-Agent dizgisi', type: 'textarea', wide: true, placeholder: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', hint: 'Dizgiyi tek parça hâlinde, başındaki "User-Agent:" etiketi olmadan yapıştırın.' },
  ],
  compute(v, h) {
    const ua = String(v.ua ?? '').replace(/^\s*user-agent\s*:/i, '').replace(/\s+/g, ' ').trim();
    if (!ua) h.err('User-Agent dizgisini yapıştırın.');
    if (ua.length > 2000) h.err('Dizgi çok uzun (en fazla 2000 karakter). Yalnızca tek bir User-Agent satırı yapıştırın.');

    // Botlar ve yazılım istemcileri
    const botlar = [
      [/Googlebot/i, 'Googlebot (Google arama botu)'],
      [/AdsBot-Google/i, 'AdsBot (Google reklam botu)'],
      [/Mediapartners-Google/i, 'Mediapartners (Google AdSense botu)'],
      [/bingbot/i, 'Bingbot (Bing arama botu)'],
      [/YandexBot/i, 'YandexBot (Yandex arama botu)'],
      [/DuckDuckBot/i, 'DuckDuckBot (DuckDuckGo arama botu)'],
      [/Baiduspider/i, 'Baiduspider (Baidu arama botu)'],
      [/Applebot/i, 'Applebot (Apple botu)'],
      [/facebookexternalhit/i, 'Facebook bağlantı önizleme botu'],
      [/Twitterbot/i, 'Twitterbot (bağlantı önizleme botu)'],
      [/LinkedInBot/i, 'LinkedInBot (bağlantı önizleme botu)'],
      [/WhatsApp/i, 'WhatsApp bağlantı önizleme istemcisi'],
      [/TelegramBot/i, 'TelegramBot (bağlantı önizleme botu)'],
      [/AhrefsBot/i, 'AhrefsBot (SEO taraması)'],
      [/SemrushBot/i, 'SemrushBot (SEO taraması)'],
    ];
    let bot = null;
    for (const [re, ad] of botlar) if (re.test(ua)) { bot = ad; break; }
    if (!bot && /bot\b|crawler|spider|crawl/i.test(ua)) bot = 'Tanınmayan bot';

    const araclar = [
      ['curl', /curl\/([\d.]+)/i],
      ['Wget', /Wget\/([\d.]+)/i],
      ['python-requests', /python-requests\/([\d.]+)/i],
      ['Postman', /PostmanRuntime\/([\d.]+)/i],
      ['Go HTTP istemcisi', /Go-http-client\/([\d.]+)/i],
      ['okhttp', /okhttp\/([\d.]+)/i],
      ['Java HTTP istemcisi', /^Java\/([\d._]+)/i],
    ];
    let arac = null;
    let aracSurum = '';
    if (!bot) for (const [ad, re] of araclar) { const r = re.exec(ua); if (r) { arac = ad; aracSurum = r[1]; break; } }

    // Tarayıcı: sıra önemli, çünkü Edge ve Opera dizgisinde "Chrome", Chrome dizgisinde "Safari" geçer
    const tarayicilar = [
      ['Microsoft Edge', /Edg(?:e|A|iOS)?\/([\d.]+)/],
      ['Opera', /(?:OPR|Opera)\/([\d.]+)/],
      ['Yandex Browser', /YaBrowser\/([\d.]+)/],
      ['Samsung Internet', /SamsungBrowser\/([\d.]+)/],
      ['Vivaldi', /Vivaldi\/([\d.]+)/],
      ['Firefox', /(?:Firefox|FxiOS)\/([\d.]+)/],
      ['Chrome', /(?:Chrome|CriOS)\/([\d.]+)/],
      ['Safari', /Version\/([\d.]+).*Safari\//],
      ['Internet Explorer', /MSIE ([\d.]+)/],
      ['Internet Explorer', /Trident\/.*rv:([\d.]+)/],
    ];
    let tarayici = null;
    let surum = '';
    for (const [ad, re] of tarayicilar) { const r = re.exec(ua); if (r) { tarayici = ad; surum = r[1]; break; } }
    if (!tarayici && /Safari\//.test(ua)) tarayici = 'Safari';

    // İşletim sistemi
    const winAd = { '10.0': 'Windows 10 / 11', '6.3': 'Windows 8.1', '6.2': 'Windows 8', '6.1': 'Windows 7', '6.0': 'Windows Vista', '5.1': 'Windows XP' };
    let os = null;
    let r;
    if (/Windows Phone/.test(ua)) os = 'Windows Phone';
    else if ((r = /Windows NT ([\d.]+)/.exec(ua))) os = winAd[r[1]] || `Windows (NT ${r[1]})`;
    else if (/Windows/.test(ua)) os = 'Windows';
    else if ((r = /Android ([\d.]+)/.exec(ua))) os = `Android ${r[1]}`;
    else if (/Android/.test(ua)) os = 'Android';
    else if ((r = /iPad.*? OS (\d+(?:_\d+)*)/.exec(ua))) os = `iPadOS ${r[1].replace(/_/g, '.')}`;
    else if ((r = /(?:iPhone|iPod).*? OS (\d+(?:_\d+)*)/.exec(ua))) os = `iOS ${r[1].replace(/_/g, '.')}`;
    else if (/CrOS/.test(ua)) os = 'ChromeOS';
    else if ((r = /Mac OS X (\d+(?:[_.]\d+)*)/.exec(ua))) os = `macOS ${r[1].replace(/_/g, '.')}`;
    else if (/Macintosh/.test(ua)) os = 'macOS';
    else if (/Linux|X11/.test(ua)) os = 'Linux';

    if (!bot && !arac && !tarayici && !os) h.err('Bu metin tanınan bir User-Agent dizgisine benzemiyor. Dizgiyi tarayıcıdan ya da sunucu günlüğünden eksiksiz kopyalayın.');

    // Cihaz türü
    let cihaz;
    if (bot) cihaz = 'Bot (otomatik yazılım)';
    else if (arac) cihaz = 'Yazılım istemcisi';
    else if (/iPad|Tablet/.test(ua) || (/Android/.test(ua) && !/Mobile/.test(ua))) cihaz = 'Tablet';
    else if (/Mobi|iPhone|iPod|Android|Windows Phone/.test(ua)) cihaz = 'Mobil (telefon)';
    else if (/Windows|Macintosh|X11|Linux|CrOS/.test(ua)) cihaz = 'Masaüstü / dizüstü';
    else cihaz = 'Bilinmiyor';

    // İşleme motoru
    let motor;
    if (/iPhone|iPad|iPod/.test(ua) && /AppleWebKit/.test(ua)) motor = 'WebKit';
    else if (/Edge\/\d/.test(ua)) motor = 'EdgeHTML';
    else if (/AppleWebKit/.test(ua) && /Chrome|Chromium/.test(ua)) motor = 'Blink';
    else if (/AppleWebKit/.test(ua)) motor = 'WebKit';
    else if (/Gecko\/\d/.test(ua) && /Firefox/.test(ua)) motor = 'Gecko';
    else if (/Trident|MSIE/.test(ua)) motor = 'Trident';
    else if (/Presto/.test(ua)) motor = 'Presto';
    else motor = 'Bilinmiyor';

    let mimari = 'Belirtilmemiş';
    if (/Win64|x64|x86_64|amd64|WOW64/i.test(ua)) mimari = '64 bit (x86-64)';
    else if (/arm64|aarch64/i.test(ua)) mimari = '64 bit (ARM)';
    else if (/i686|i386/.test(ua)) mimari = '32 bit (x86)';

    const ad = bot || arac || tarayici || 'Bilinmiyor';
    const sur = bot ? '—' : (arac ? aracSurum : surum) || 'Bilinmiyor';
    const notlar = [];
    if (os === 'Windows 10 / 11') notlar.push('Windows 10 ve Windows 11 aynı "Windows NT 10.0" ifadesini gönderir; ikisi User-Agent üzerinden ayırt edilemez.');
    if (/Mac OS X 10[_.]15[_.]7/.test(ua)) notlar.push('Güncel tarayıcılar macOS sürümünü 10.15.7 olarak sabitler; gerçek sürüm daha yeni olabilir.');
    if (bot) notlar.push('Bot adı yalnızca dizgideki beyana dayanır; User-Agent kolayca taklit edilebildiği için gerçek botu doğrulamak ayrıca IP denetimi gerektirir.');
    return {
      rows: [
        ['Tarayıcı / istemci', ad],
        ['Sürüm', sur],
        ['İşletim sistemi', os || 'Bilinmiyor'],
        ['Cihaz türü', cihaz],
        ['İşleme motoru', motor],
        ['Mimari', mimari],
        ['Bot mu?', bot ? 'Evet' : 'Hayır'],
        ['Dizgi uzunluğu', `${ua.length} karakter`],
      ],
      note: notlar.join(' ') || 'Sonuç dizgideki beyana dayanır; User-Agent istemci tarafından değiştirilebilir.',
    };
  },
  cases: [
    { in: { ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }, out: { 'Tarayıcı / istemci': 'Chrome', 'Sürüm': '120.0.0.0', 'İşletim sistemi': 'Windows 10 / 11', 'Cihaz türü': 'Masaüstü / dizüstü', 'İşleme motoru': 'Blink', 'Mimari': '64 bit (x86-64)', 'Bot mu?': 'Hayır' } },
    { in: { ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1' }, out: { 'Tarayıcı / istemci': 'Safari', 'Sürüm': '17.5', 'İşletim sistemi': 'iOS 17.5', 'Cihaz türü': 'Mobil (telefon)', 'İşleme motoru': 'WebKit' } },
    { in: { ua: 'Mozilla/5.0 (X11; Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0' }, out: { 'Tarayıcı / istemci': 'Firefox', 'Sürüm': '121.0', 'İşletim sistemi': 'Linux', 'Cihaz türü': 'Masaüstü / dizüstü', 'İşleme motoru': 'Gecko' } },
    { in: { ua: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' }, out: { 'Tarayıcı / istemci': 'Googlebot (Google arama botu)', 'Cihaz türü': 'Bot (otomatik yazılım)', 'Bot mu?': 'Evet', 'Sürüm': '—' } },
    { in: { ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.2210.91' }, out: { 'Tarayıcı / istemci': 'Microsoft Edge', 'Sürüm': '120.0.2210.91', 'İşleme motoru': 'Blink' } },
    { in: { ua: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.144 Mobile Safari/537.36' }, out: { 'Tarayıcı / istemci': 'Chrome', 'İşletim sistemi': 'Android 14', 'Cihaz türü': 'Mobil (telefon)' } },
    { in: { ua: 'Mozilla/5.0 (iPad; CPU OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1' }, out: { 'İşletim sistemi': 'iPadOS 16.6', 'Cihaz türü': 'Tablet', 'Tarayıcı / istemci': 'Safari' } },
    { in: { ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15' }, out: { 'Tarayıcı / istemci': 'Safari', 'İşletim sistemi': 'macOS 10.15.7', 'İşleme motoru': 'WebKit' } },
    { in: { ua: 'curl/8.4.0' }, out: { 'Tarayıcı / istemci': 'curl', 'Sürüm': '8.4.0', 'Cihaz türü': 'Yazılım istemcisi' } },
    { in: { ua: 'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko' }, out: { 'Tarayıcı / istemci': 'Internet Explorer', 'Sürüm': '11.0', 'İşletim sistemi': 'Windows 7', 'İşleme motoru': 'Trident' } },
    { in: { ua: '' }, error: true },
    { in: { ua: 'merhaba dünya' }, error: true },
  ],
  howto: [
    'Çözümlemek istediğiniz User-Agent dizgisini kopyalayın. Kendi tarayıcınızınkini görmek için geliştirici araçlarının konsoluna <code>navigator.userAgent</code> yazabilir, sunucu tarafında ise erişim günlüğündeki ilgili satırın son tırnaklı bölümünü alabilirsiniz.',
    'Dizgiyi kutuya yapıştırın. Başında "User-Agent:" etiketi kalmışsa araç bunu kendiliğinden atar; satır sonları ve fazla boşluklar da temizlenir.',
    '"Çözümle" düğmesine basın. Tarayıcı ya da istemci adı, sürümü, işletim sistemi, cihaz türü, işleme motoru ve işlemci mimarisi ayrı satırlarda listelenir.',
    '"Bot mu?" satırına ve sonuç altındaki nota bakın; Windows 10/11 ayrımı ya da sabitlenmiş macOS sürümü gibi yanıltıcı durumlar burada açıklanır.',
    'Sonucu kopyalayıp hata kaydına, destek talebine ya da analiz notlarınıza ekleyin.',
  ],
  sections: [
    { h: 'User-Agent nedir?', p: [
      'User-Agent, bir tarayıcının ya da başka bir HTTP istemcisinin her istekle birlikte sunucuya gönderdiği kısa bir tanıtım başlığıdır. İstemci bu başlıkta kendisinin hangi yazılım olduğunu, hangi sürümde çalıştığını ve çoğu zaman hangi işletim sisteminde bulunduğunu beyan eder. Sunucular bu bilgiyi günlüklere yazar, istatistik çıkarır, kimi zaman da içeriği cihaza göre uyarlamak için kullanır.',
      'Başlık serbest metindir ve bağlayıcı bir biçimi yoktur. Yıllar içinde tarayıcılar birbirlerine uyumlu görünmek için kendi dizgilerine rakiplerinin adlarını ekledi; bu yüzden bugün neredeyse her tarayıcının dizgisi "Mozilla/5.0" ile başlar ve Chrome dizgisinde hem "AppleWebKit" hem "Safari" sözcüğü geçer. Dizgiyi gözle okumak bu tarihsel kalıntılar nedeniyle yanıltıcıdır; çözümleyici bu karışıklığı sizin yerinize ayıklar.',
    ] },
    { h: 'Bir dizginin parçaları: çözümlü örnek', p: [
      'Şu dizgiyi ele alalım: <code>Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36</code>. Baştaki "Mozilla/5.0" yalnızca uyumluluk kalıbıdır ve tarayıcının Mozilla olduğunu göstermez. Parantez içindeki bölüm platformu anlatır: "Windows NT 10.0" işletim sistemi çekirdeğini, "Win64; x64" ise 64 bit mimariyi belirtir. "AppleWebKit/537.36" ve "Safari/537.36" motor uyumluluğu için eklenmiş sabit ifadelerdir. Asıl tarayıcıyı "Chrome/120.0.0.0" parçası söyler.',
      'Araç bu dizgi için tarayıcıyı <strong>Chrome</strong>, sürümü <strong>120.0.0.0</strong>, işletim sistemini <strong>Windows 10 / 11</strong>, cihaz türünü <strong>Masaüstü / dizüstü</strong>, motoru <strong>Blink</strong> olarak verir. Aynı dizginin sonuna "Edg/120.0.2210.91" eklenmişse tarayıcı artık Chrome değil Microsoft Edge\'dir; bu yüzden çözümlemede sıralama önemlidir ve en özgül imza önce aranır.',
    ] },
    { h: 'Araç neleri tanır?', ul: [
      '<strong>Tarayıcılar:</strong> Chrome, Firefox, Safari, Microsoft Edge, Opera, Samsung Internet, Yandex Browser, Vivaldi ve Internet Explorer; iOS üzerindeki Chrome, Firefox ve Edge sürümleri dahil.',
      '<strong>İşletim sistemleri:</strong> Windows sürümleri, macOS, Linux, ChromeOS, Android, iOS ve iPadOS.',
      '<strong>Cihaz türü:</strong> telefon, tablet, masaüstü ayrımı; Android\'de dizgide "Mobile" sözcüğü yoksa cihaz tablet sayılır.',
      '<strong>Motor:</strong> Blink, WebKit, Gecko, Trident ve eski EdgeHTML.',
      '<strong>Botlar ve istemciler:</strong> yaygın arama motoru botları, bağlantı önizleme botları, SEO tarayıcıları ile curl, Wget ve benzeri komut satırı ya da kütüphane istemcileri.',
    ] },
    { h: 'User-Agent neden her zaman güvenilir değildir?', p: [
      'User-Agent bir beyandır, kanıt değildir. Herhangi bir istemci bu başlığı dilediği gibi yazabilir; tarayıcıların geliştirici araçlarında bile dizgiyi değiştirme seçeneği vardır. Kötü niyetli tarayıcı robotları sıklıkla kendilerini tanınmış bir arama botu ya da sıradan bir masaüstü tarayıcı gibi tanıtır. Bu yüzden erişim denetimi, lisans kontrolü ya da güvenlik kararı yalnızca User-Agent\'a dayandırılmamalıdır.',
      'İkinci sınırlama, tarayıcıların gizlilik gerekçesiyle dizgiyi bilinçli olarak sadeleştirmesidir. Güncel Chromium tabanlı tarayıcılar ayrıntılı sürüm numarasını sıfırlarla doldurur ve Android cihaz modelini genel bir değerle değiştirir. Masaüstü tarayıcılar macOS sürümünü 10.15.7 olarak sabitler. Windows 11, Windows 10 ile aynı "Windows NT 10.0" ifadesini gönderir. iPad\'deki Safari ise varsayılan olarak masaüstü sitesi istediği için kendini Mac bilgisayar gibi tanıtır. Araç bu durumlarda dizgide ne yazıyorsa onu raporlar ve sonuç notunda sizi uyarır.',
    ] },
    { h: 'Hangi işlerde kullanılır?', p: [
      'En yaygın kullanım hata ayıklamadır: bir müşteri "sayfa bende açılmıyor" dediğinde gönderdiği dizgiden hangi tarayıcı ve sürümle karşı karşıya olduğunuzu saniyeler içinde görürsünüz. Sunucu erişim günlüklerini incelerken yoğun istek atan bir adresin gerçek ziyaretçi mi, arama botu mu, yoksa bir betik mi olduğunu anlamak için de dizgiye bakılır. E-ticaret ve kurumsal sitelerde destek ekipleri, form kayıtlarına düşen User-Agent bilgisini bu şekilde okuyarak sorunu yeniden üretir.',
      'Web geliştiriciler duyarlı tasarımı sınarken farklı cihazların dizgilerini karşılaştırır. Yine de sayfa davranışını tarayıcı adına göre dallandırmak yerine özellik algılama yöntemini tercih etmek daha sağlıklıdır; çünkü dizgiler zamanla değişir ve tanınmayan yeni bir tarayıcı gereksiz yere dışarıda kalabilir.',
    ] },
    { h: 'Sınırlar ve varsayımlar', p: [
      'Araç yaygın imzaları tanıyan bir kural kümesiyle çalışır; dünyadaki bütün tarayıcıları, uygulama içi görüntüleyicileri, akıllı televizyonları ve oyun konsollarını kapsamaz. Tanımadığı bir parçayla karşılaştığında tahmin yürütmek yerine "Bilinmiyor" yazar. Tek seferde yalnızca bir dizgi çözümlenir. Dizginin hiçbir parçası tanınmıyorsa hata iletisi gösterilir; bu durumda metni eksiksiz kopyaladığınızdan emin olun.',
    ] },
  ],
  faq: [
    ['Kendi User-Agent dizgimi nasıl öğrenirim?', 'Tarayıcınızın geliştirici araçlarını açıp konsola navigator.userAgent yazmanız yeterlidir. Çıkan metni kopyalayıp bu araca yapıştırarak tarayıcınızın kendini nasıl tanıttığını görebilirsiniz.'],
    ['Neden her dizgi "Mozilla/5.0" ile başlıyor?', 'Bu ifade erken dönem web sunucularının yalnızca belirli bir tarayıcıya gelişmiş içerik göndermesinden kalma bir uyumluluk kalıbıdır. Diğer tarayıcılar dışlanmamak için aynı ifadeyi benimsedi. Bugün hiçbir anlam taşımaz; gerçek tarayıcı dizginin sonraki parçalarından anlaşılır.'],
    ['Windows 10 ile Windows 11 neden ayırt edilemiyor?', 'Her iki sürüm de User-Agent içinde "Windows NT 10.0" ifadesini gönderir. Dizgide bu ikisini ayıracak başka bir parça bulunmadığı için araç sonucu "Windows 10 / 11" olarak verir.'],
    ['Chrome dizgisinde neden Safari yazıyor?', 'Chrome, başlangıçta Safari ile aynı motoru kullandığı için uyumluluk amacıyla "Safari" ve "AppleWebKit" ifadelerini dizgisine ekledi ve bunlar kalıcı oldu. Araç bu yüzden önce Edge, Opera ve Chrome imzalarını arar; Safari kararını ancak bunlar yoksa verir.'],
    ['Bir isteğin gerçekten arama botundan geldiğini bu araçla doğrulayabilir miyim?', 'Hayır. Araç yalnızca dizgide yazan adı okur. User-Agent taklit edilebildiği için gerçek doğrulama, isteğin geldiği IP adresinin ilgili arama motoruna ait olup olmadığının ters DNS sorgusuyla denetlenmesini gerektirir.'],
    ['iPhone\'daki Chrome neden WebKit motoruyla görünüyor?', 'iOS üzerindeki tarayıcılar, işletim sisteminin sağladığı WebKit motorunu kullanır. Bu nedenle dizgide "CriOS" ya da "FxiOS" yazsa bile araç motoru WebKit olarak raporlar.'],
    ['Tablet ile telefonu neye göre ayırıyorsunuz?', 'iPad adı ya da "Tablet" sözcüğü geçen dizgiler tablet sayılır. Android cihazlarda ise yaygın uygulamaya göre dizgide "Mobile" sözcüğü varsa telefon, yoksa tablet kabul edilir. Bu bir kesinlik değil, yaygın bir kuraldır.'],
    ['Yapıştırdığım dizgi bir sunucuya gönderiliyor mu?', 'Hayır. Çözümleme tümüyle tarayıcınızda, sayfadaki betikle yapılır. Dizgi kaydedilmez, başka bir yere iletilmez; sayfa açıldıktan sonra internet bağlantısı olmadan da çalışır.'],
  ],
  related: ['url-ayristir', 'sorgu-dizesi-coz', 'jwt-coz', 'http-durum-kodlari', 'mime-turu-bul', 'robots-txt-olustur'],
};
