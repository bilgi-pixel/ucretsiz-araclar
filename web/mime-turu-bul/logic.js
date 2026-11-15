// MIME Türü Bulma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
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
  }
