// User-Agent Çözümleme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
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
  }
