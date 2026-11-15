export default {
  slug: 'metin-sha256-hesapla',
  title: 'Metin SHA-256 Özeti Hesaplama',
  h1Tail: 'metinden hash',
  pageTitle: 'Metin SHA-256 Özeti Hesaplama – Online SHA256 Hash Üretici',
  description: 'Yazdığınız metnin SHA-256 özetini (hash) tarayıcınızda hesaplayın. Onaltılık ve Base64 gösterim, bayt sayısı ve beklenen özetle karşılaştırma.',
  card: 'Metnin SHA-256 özetini onaltılık ve Base64 olarak hesaplayın; beklenen özetle karşılaştırın. Metin tarayıcıdan çıkmaz.',
  category: 'gelistirici',
  keywords: ['sha256 hesaplama', 'sha-256 hash', 'metin hash hesaplama', 'sha256 online', 'özet değeri hesaplama', 'hash üretici', 'sha256 karşılaştırma'],
  lead: 'Bir metnin <strong>SHA-256 özetini</strong> anında hesaplayın. Araç metni UTF-8 baytlarına çevirir, 256 bitlik özeti onaltılık ve Base64 biçiminde verir; isterseniz elinizdeki bir özetle eşleşip eşleşmediğini de söyler.',
  button: 'Hesapla',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Özeti alınacak metni yazın ya da yapıştırın', wide: true, hint: 'Boşluklar, satır sonları ve büyük-küçük harf farkı özeti değiştirir; metin olduğu gibi işlenir.' },
    { id: 'harf', label: 'Onaltılık gösterim', type: 'select', options: [['kucuk', 'Küçük harf (a–f)'], ['buyuk', 'Büyük harf (A–F)']] },
    { id: 'beklenen', label: 'Karşılaştırılacak özet (isteğe bağlı)', type: 'text', placeholder: '64 haneli onaltılık SHA-256 değeri', wide: true },
  ],
  compute(v, h) {
    const metin = String(v.metin ?? '');
    if (metin === '') h.err('Özeti hesaplanacak metni yazın. Boş metin için bir sonuç gösterilmez.');
    const bytes = new TextEncoder().encode(metin);
    const K = [
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
      0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
      0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
      0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
      0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
      0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
    ];
    const H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    const n = bytes.length;
    const toplam = Math.ceil((n + 9) / 64) * 64;
    const m = new Uint8Array(toplam);
    m.set(bytes); m[n] = 0x80;
    const dv = new DataView(m.buffer);
    dv.setUint32(toplam - 8, Math.floor((n * 8) / 4294967296));
    dv.setUint32(toplam - 4, (n * 8) >>> 0);
    const rotr = (x, k) => (x >>> k) | (x << (32 - k));
    const w = new Uint32Array(64);
    for (let o = 0; o < toplam; o += 64) {
      for (let i = 0; i < 16; i++) w[i] = dv.getUint32(o + i * 4);
      for (let i = 16; i < 64; i++) {
        const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
        const s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
        w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
      }
      let [a, b, c, d, e, f, g, hh] = H;
      for (let i = 0; i < 64; i++) {
        const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
        const ch = (e & f) ^ (~e & g);
        const t1 = (hh + S1 + ch + K[i] + w[i]) >>> 0;
        const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
        const maj = (a & b) ^ (a & c) ^ (b & c);
        const t2 = (S0 + maj) >>> 0;
        hh = g; g = f; f = e; e = (d + t1) >>> 0; d = c; c = b; b = a; a = (t1 + t2) >>> 0;
      }
      H[0] = (H[0] + a) >>> 0; H[1] = (H[1] + b) >>> 0; H[2] = (H[2] + c) >>> 0; H[3] = (H[3] + d) >>> 0;
      H[4] = (H[4] + e) >>> 0; H[5] = (H[5] + f) >>> 0; H[6] = (H[6] + g) >>> 0; H[7] = (H[7] + hh) >>> 0;
    }
    const ozet = new Uint8Array(32);
    const odv = new DataView(ozet.buffer);
    H.forEach((x, i) => odv.setUint32(i * 4, x));
    let hex = Array.from(ozet, (x) => x.toString(16).padStart(2, '0')).join('');
    const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let b64 = '';
    for (let i = 0; i < 32; i += 3) {
      const x = (ozet[i] << 16) | ((ozet[i + 1] ?? 0) << 8) | (ozet[i + 2] ?? 0);
      b64 += abc[(x >> 18) & 63] + abc[(x >> 12) & 63] + (i + 1 < 32 ? abc[(x >> 6) & 63] : '=') + (i + 2 < 32 ? abc[x & 63] : '=');
    }
    const rows = [
      ['SHA-256 özeti', v.harf === 'buyuk' ? hex.toUpperCase() : hex],
      ['Base64 gösterimi', b64],
      ['Girdi uzunluğu', `${h.fmt([...metin].length, 0)} karakter, ${h.fmt(n, 0)} bayt (UTF-8)`],
      ['Özet uzunluğu', '256 bit (64 onaltılık hane)'],
    ];
    const bek = String(v.beklenen ?? '').trim().replace(/[\s:-]/g, '').toLowerCase();
    if (bek !== '') {
      if (!/^[0-9a-f]{64}$/.test(bek)) h.err('Karşılaştırılacak özet 64 onaltılık haneden (0–9, a–f) oluşmalıdır. Değeri eksiksiz yapıştırdığınızdan emin olun.');
      rows.push(['Karşılaştırma', bek === hex ? 'Eşleşiyor' : 'Eşleşmiyor']);
    }
    return { rows, note: 'Metin UTF-8 olarak kodlanır. Satır sonları tek satır besleme (LF) karakteri olarak işlenir.' };
  },
  cases: [
    { in: { metin: 'abc' }, out: { 'SHA-256 özeti': 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad', 'Base64 gösterimi': 'ungWv48Bz+pBQUDeXa4iI7ADYaOWF3qctBD/YfIAFa0=', 'Girdi uzunluğu': '3 karakter, 3 bayt (UTF-8)' } },
    { in: { metin: 'Merhaba Dünya', harf: 'buyuk' }, out: { 'SHA-256 özeti': '51D6575FD179FCD4894CBEF4AF6BEF4B06DE5B041390BD659CF209FF1CF3BE7D', 'Girdi uzunluğu': '13 karakter, 14 bayt (UTF-8)' } },
    { in: { metin: 'The quick brown fox jumps over the lazy dog' }, out: { 'SHA-256 özeti': 'd7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592' } },
    { in: { metin: 'abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq' }, out: { 'SHA-256 özeti': '248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1', 'Girdi uzunluğu': '56 karakter, 56 bayt (UTF-8)' } },
    { in: { metin: 'hello world', beklenen: 'B94D27B9934D3E08A52E52D7DA7DABFAC484EFE37A5380EE9088F7ACE2EFCDE9' }, out: { 'SHA-256 özeti': 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9', 'Karşılaştırma': 'Eşleşiyor' } },
    { in: { metin: 'merhaba', beklenen: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9' }, out: { 'SHA-256 özeti': '4c6bcdd55f3153e1939669ab1ec039e4059174dc25abdfcb2f58868849b4d61b', 'Karşılaştırma': 'Eşleşmiyor' } },
    { in: { metin: '' }, error: true },
    { in: { metin: 'abc', beklenen: 'ba7816bf' }, error: true },
  ],
  howto: [
    'Özetini almak istediğiniz metni "Metin" kutusuna yazın ya da yapıştırın. Baştaki ve sondaki boşluklar da hesaba katılır; gereksiz boşluk bırakmayın.',
    'Onaltılık sonucun küçük harfle mi büyük harfle mi yazılacağını seçin. İki yazım da aynı değeri gösterir.',
    'Elinizde doğrulamak istediğiniz bir özet varsa "Karşılaştırılacak özet" alanına yapıştırın; yoksa boş bırakın.',
    '"Hesapla" düğmesine basın. 64 haneli özet, Base64 karşılığı ve metnin bayt sayısı sonuç kutusunda görünür.',
    'Karşılaştırma yaptıysanız son satırdaki "Eşleşiyor" ya da "Eşleşmiyor" bilgisine bakın, sonucu "Sonucu kopyala" ile panoya alın.',
  ],
  sections: [
    { h: 'SHA-256 nedir?', p: [
      'SHA-256, SHA-2 ailesine ait bir kriptografik özet (hash) işlevidir. Uzunluğu ne olursa olsun bir girdiyi alır ve her zaman 256 bit, yani 32 bayt uzunluğunda bir çıktı üretir. Bu çıktı çoğunlukla 64 haneli onaltılık bir dizgi olarak yazılır. Aynı girdi her zaman aynı özeti verir; girdide tek bir harfin, hatta tek bir bitin değişmesi ise özetin tamamen farklı görünmesine yol açar.',
      'Özet işlevi tek yönlüdür: özetten yola çıkarak özgün metni hesaplamanın bilinen pratik bir yolu yoktur. Ayrıca aynı özeti veren iki farklı girdi bulmak (çakışma) bugünkü bilgiyle uygulanabilir değildir. Bu iki özellik SHA-256\'yı bütünlük denetimi, sayısal imza, sertifika ve blok zinciri gibi alanlarda temel yapı taşı hâline getirir.',
    ] },
    { h: 'Hesap nasıl yapılır?', p: [
      'Araç önce metni UTF-8 kodlamasıyla baytlara çevirir. Ardından standartta tanımlanan dolgu eklenir: bir adet 1 biti, gerektiği kadar 0 biti ve en sonda iletinin bit cinsinden uzunluğu. Böylece veri 512 bitlik bloklara tam bölünür. Her blok, 64 turluk bir sıkıştırma işlevinden geçirilir; bu turlarda bit döndürme, kaydırma, VE, DEĞİL, ÖZEL VEYA işlemleri ve 32 bitlik toplama kullanılır. Sekiz adet 32 bitlik ara değer her bloktan sonra güncellenir ve son blokta bu sekiz değerin art arda yazılması özeti oluşturur.',
      'Bu adımların hepsi tarayıcınızda, sayfayla birlikte gelen kodla yapılır. Sonuç, standardın yayımlanmış sınama değerleriyle aynıdır; örneğin <code>abc</code> metninin özeti <code>ba7816bf…f20015ad</code> ile başlayıp biten bilinen değerdir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      '"Merhaba Dünya" yazdığınızı düşünün. Metin 13 karakterdir, ancak "ü" harfi UTF-8\'de iki bayt tuttuğu için girdi 14 bayttır. Araç bu 14 baytın özetini <code>51d6575fd179fcd4894cbef4af6bef4b06de5b041390bd659cf209ff1cf3be7d</code> olarak verir. Metni "merhaba dünya" biçiminde küçük harfle yazarsanız ya da sonuna bir boşluk eklerseniz bambaşka bir değer çıkar; özet karşılaştırırken girdinin birebir aynı olması gerekir.',
      'İkinci örnek: <code>hello world</code> metninin özeti <code>b94d27b9…e2efcde9</code> değeridir. Bu değeri karşılaştırma alanına büyük harflerle yapıştırsanız bile araç "Eşleşiyor" der, çünkü onaltılık gösterimde harf büyüklüğü anlam taşımaz.',
    ] },
    { h: 'Nerelerde kullanılır?', ul: [
      '<strong>Bütünlük denetimi:</strong> bir yapılandırma satırının, lisans metninin ya da kod parçasının yolda değişmediğini iki tarafta özet karşılaştırarak doğrulamak.',
      '<strong>API imzaları:</strong> bazı servislerde istek gövdesinin SHA-256 özeti başlıkta gönderilir; elle sınama yaparken beklenen değeri burada üretebilirsiniz.',
      '<strong>Önbellek ve dosya adları:</strong> içerikten türetilen kararlı bir anahtar gerektiğinde özetin ilk haneleri kullanılır.',
      '<strong>İçerik güvenliği:</strong> satır içi betik ve stil için tarayıcıya verilen bütünlük değerleri Base64 yazılmış SHA-256 özetidir; araçtaki Base64 satırı bu iş için uygundur.',
      '<strong>Eğitim:</strong> çığ etkisini görmek için tek harf değiştirip özetin nasıl tamamen değiştiğini gözlemlemek.',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'En yaygın sorun görünmeyen karakterlerdir. Metni bir belgeden kopyalarken sona eklenen satır sonu, sekme ya da bölünemez boşluk özeti değiştirir. Windows\'ta dosyalarda satır sonu iki karakterdir (CR ve LF), tarayıcıdaki metin kutusu ise tek karakter (LF) kullanır; bu yüzden çok satırlı bir metnin buradaki özeti, aynı metnin Windows\'ta kaydedilmiş dosyasının özetinden farklı olabilir. Dosya özeti gerekiyorsa dosyanın kendisini işleyen bir araç kullanın.',
      'İkinci hata kodlama farkıdır. Türkçe harfler UTF-8\'de iki bayt, eski Windows-1254 kodlamasında tek bayt tutar; farklı kodlamayla hesaplanan özetler birbirini tutmaz. Bu araç her zaman UTF-8 kullanır ve bayt sayısını ayrıca gösterir.',
      'Üçüncüsü, özeti parola saklama yöntemi sanmaktır. SHA-256 çok hızlı çalıştığı için tek başına parola saklamaya uygun değildir; bu iş için tuzlama yapan ve bilerek yavaş çalışan özel parola özet işlevleri tercih edilir.',
    ] },
    { h: 'Sınırlar ve varsayımlar', p: [
      'Araç yalnızca metin girdisiyle çalışır ve metni UTF-8 olarak yorumlar. Boş metin için sonuç göstermez; boş girdinin SHA-256 özeti standartta <code>e3b0c442…7852b855</code> olarak bilinen sabit değerdir. Çok uzun metinler de işlenir, ancak birkaç megabaytı aşan içeriklerde tarayıcının metin kutusu yavaşlayabilir. Özet, gizlilik sağlamaz: kısa ve tahmin edilebilir metinlerin özeti deneme yoluyla bulunabilir.',
    ] },
  ],
  faq: [
    ['SHA-256 özeti kaç karakterdir?', 'Özet 256 bit, yani 32 bayttır. Onaltılık yazıldığında her bayt iki hane tuttuğu için 64 karakter olur. Base64 yazıldığında sonundaki dolgu işaretiyle birlikte 44 karakterdir.'],
    ['Özetten özgün metni geri bulabilir miyim?', 'Hayır. SHA-256 tek yönlü bir işlevdir ve geri çevrilemez. Ancak kısa ya da yaygın metinlerin özeti, olası girdiler tek tek denenerek bulunabilir; bu nedenle özet bir şifreleme yöntemi olarak görülmemelidir.'],
    ['Aynı metin neden başka bir araçta farklı özet veriyor?', 'Büyük olasılıkla girdiler birebir aynı değildir. Sondaki satır sonu, fazladan boşluk, farklı tırnak karakteri ya da UTF-8 dışında bir kodlama farklı özet üretir. Araçtaki bayt sayısını diğer tarafla karşılaştırmak farkı bulmayı kolaylaştırır.'],
    ['Büyük harfli ve küçük harfli özet farklı mıdır?', 'Değildir. Onaltılık gösterimde a–f harflerinin büyük ya da küçük yazılması aynı sayıyı ifade eder. Karşılaştırma alanı harf büyüklüğünü, aradaki boşlukları ve iki nokta ayırıcılarını dikkate almaz.'],
    ['SHA-256 ile MD5 ve SHA-1 arasındaki fark nedir?', 'MD5 128 bit, SHA-1 160 bit, SHA-256 ise 256 bit özet üretir. MD5 ve SHA-1 için uygulanabilir çakışma saldırıları gösterilmiştir; güvenlik gerektiren işlerde bunların yerine SHA-256 gibi SHA-2 ailesi işlevleri kullanılır.'],
    ['Bir dosyanın SHA-256 özetini bu araçla alabilir miyim?', 'Bu sayfa yazılan metin içindir. Dosyanın içeriğini kutuya yapıştırmak satır sonu ve kodlama farkları yüzünden yanlış sonuç verebilir. İndirilen bir dosyayı doğrulamak için dosyayı doğrudan okuyan dosya özeti aracını kullanın.'],
    ['Base64 gösterimi ne işe yarar?', 'Aynı 32 baytın daha kısa bir yazımıdır. Web sayfalarında bütünlük değerleri ve bazı imza başlıkları özeti onaltılık yerine Base64 olarak ister; araç iki yazımı birlikte verir.'],
    ['Yazdığım metin bir sunucuya gönderiliyor mu?', 'Hayır. Hesap tamamen tarayıcınızda yapılır; metin ve özet hiçbir yere iletilmez, saklanmaz. Yine de gerçek parolaları ya da gizli anahtarları herhangi bir web sayfasına yazmamak iyi bir alışkanlıktır.'],
  ],
  related: ['dosya-hash', 'crc32-hesapla', 'base64-donustur', 'base32-cevir', 'sifre-uret', 'uuid-uret'],
};
