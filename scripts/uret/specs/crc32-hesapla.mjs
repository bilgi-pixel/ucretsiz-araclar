export default {
  slug: 'crc32-hesapla',
  title: 'CRC32 Hesaplama',
  h1Tail: 'sağlama toplamı',
  pageTitle: 'CRC32 Hesaplama – Metin ve Hex Veri İçin Sağlama Toplamı',
  description: 'Metnin ya da onaltılık baytların CRC32 sağlama toplamını hesaplayın. ZIP, PNG ve Ethernet ile aynı polinom; onaltılık, ondalık ve ikili sonuç.',
  card: 'Metin ya da hex baytların CRC32 sağlama toplamını onaltılık, ondalık ve ikili olarak hesaplayın.',
  category: 'gelistirici',
  keywords: ['crc32 hesaplama', 'crc32 online', 'crc hesaplama', 'sağlama toplamı hesaplama', 'checksum hesaplama', 'crc32 hex', 'crc-32 nedir'],
  lead: 'Bir metnin ya da onaltılık yazılmış bayt dizisinin <strong>CRC32</strong> değerini hesaplayın. Araç ZIP arşivlerinde, PNG görsellerinde ve Ethernet çerçevelerinde kullanılan standart CRC-32 tanımını uygular.',
  button: 'Hesapla',
  inputs: [
    { id: 'veri', label: 'Veri', type: 'textarea', placeholder: 'Örn. 123456789', wide: true },
    { id: 'tur', label: 'Girdi türü', type: 'select', options: [['metin', 'Metin (UTF-8)'], ['hex', 'Onaltılık baytlar (örn. 31 32 33)']], hint: 'Onaltılık kipte boşluk, virgül, iki nokta ve 0x önekleri yok sayılır.' },
  ],
  compute(v, h) {
    const ham = String(v.veri ?? '');
    let bytes;
    if (v.tur === 'hex') {
      const t = ham.replace(/0x/gi, '').replace(/[\s,;:-]/g, '');
      if (t === '') h.err('Onaltılık baytları yazın (örn. 31 32 33).');
      if (!/^[0-9a-fA-F]+$/.test(t)) h.err('Onaltılık kipte yalnızca 0–9 ve A–F haneleri kullanılabilir. Düz metin için girdi türünü "Metin" seçin.');
      if (t.length % 2) h.err('Onaltılık hane sayısı çift olmalıdır; her bayt iki haneyle yazılır (örn. 0A).');
      bytes = new Uint8Array(t.length / 2);
      for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(t.slice(i * 2, i * 2 + 2), 16);
    } else {
      if (ham === '') h.err('CRC32 değeri hesaplanacak metni yazın.');
      bytes = new TextEncoder().encode(ham);
    }
    const tablo = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      tablo[i] = c >>> 0;
    }
    let crc = 0xffffffff;
    for (const b of bytes) crc = tablo[(crc ^ b) & 0xff] ^ (crc >>> 8);
    crc = (crc ^ 0xffffffff) >>> 0;
    const hex = crc.toString(16).toUpperCase().padStart(8, '0');
    const ikili = crc.toString(2).padStart(32, '0').replace(/(.{8})(?=.)/g, '$1 ');
    return {
      rows: [
        ['CRC32 (onaltılık)', hex],
        ['CRC32 (küçük harf)', hex.toLowerCase()],
        ['CRC32 (ondalık)', String(crc)],
        ['CRC32 (ikili)', ikili],
        ['Girdi uzunluğu', `${h.fmt(bytes.length, 0)} bayt`],
      ],
      note: 'CRC-32 (ISO-HDLC): polinom 0x04C11DB7, yansıtılmış işlem, başlangıç ve son XOR değeri 0xFFFFFFFF.',
    };
  },
  cases: [
    { in: { veri: '123456789' }, out: { 'CRC32 (onaltılık)': 'CBF43926', 'CRC32 (ondalık)': '3421780262', 'CRC32 (ikili)': '11001011 11110100 00111001 00100110', 'Girdi uzunluğu': '9 bayt' } },
    { in: { veri: 'The quick brown fox jumps over the lazy dog' }, out: { 'CRC32 (onaltılık)': '414FA339', 'CRC32 (küçük harf)': '414fa339', 'CRC32 (ondalık)': '1095738169', 'Girdi uzunluğu': '43 bayt' } },
    { in: { veri: '31 32 33 34 35 36 37 38 39', tur: 'hex' }, out: { 'CRC32 (onaltılık)': 'CBF43926', 'Girdi uzunluğu': '9 bayt' } },
    { in: { veri: 'a' }, out: { 'CRC32 (onaltılık)': 'E8B7BE43', 'CRC32 (ondalık)': '3904355907' } },
    { in: { veri: 'Türkçe' }, out: { 'CRC32 (onaltılık)': '04F12000', 'CRC32 (ondalık)': '82911232', 'Girdi uzunluğu': '8 bayt' } },
    { in: { veri: '0x61,0x62,0x63', tur: 'hex' }, out: { 'CRC32 (onaltılık)': '352441C2', 'CRC32 (ondalık)': '891568578', 'Girdi uzunluğu': '3 bayt' } },
    { in: { veri: '' }, error: true },
    { in: { veri: 'merhaba', tur: 'hex' }, error: true },
    { in: { veri: 'ABC', tur: 'hex' }, error: true },
  ],
  howto: [
    'Sağlama toplamını almak istediğiniz veriyi "Veri" kutusuna yazın ya da yapıştırın.',
    'Girdi düz yazıysa "Metin (UTF-8)" seçeneğini bırakın. Bayt değerlerini elle veriyorsanız "Onaltılık baytlar" kipine geçin ve her baytı iki haneyle yazın.',
    '"Hesapla" düğmesine basın. CRC32 değeri sekiz haneli onaltılık, ondalık ve 32 bitlik ikili gösterimle listelenir.',
    'Sonucu karşı taraftaki değerle karşılaştırın; gerekirse "Sonucu kopyala" ile tüm satırları panoya alın.',
  ],
  sections: [
    { h: 'CRC32 nedir, ne işe yarar?', p: [
      'CRC, "döngüsel artıklık denetimi" anlamına gelen bir hata sezme yöntemidir. Veri, ikili katsayılı büyük bir polinom gibi düşünülür ve sabit bir üreteç polinoma bölünür; bölümden kalan 32 bitlik değer CRC32 olarak verinin yanına eklenir. Alıcı aynı hesabı yapar ve kalan tutmuyorsa verinin iletim ya da depolama sırasında bozulduğunu anlar.',
      'CRC32 çok hızlı hesaplanır ve kısa hata patlamalarını, tek ve çift bit hatalarını yüksek olasılıkla yakalar. Bu yüzden ağ kartlarından sıkıştırma biçimlerine kadar pek çok yerde yerleşik olarak bulunur. Burada hesaplanan sürüm, ZIP ve gzip arşivlerinde, PNG görsel parçalarında ve Ethernet çerçeve denetiminde kullanılan yaygın tanımdır.',
    ] },
    { h: 'Hesaplama yöntemi', p: [
      'Standart CRC-32 şu parametrelerle tanımlanır: üreteç polinom <code>0x04C11DB7</code>, başlangıç değeri <code>0xFFFFFFFF</code>, girdi ve çıktı bitleri yansıtılmış, sonuç en sonda <code>0xFFFFFFFF</code> ile ÖZEL VEYA işlemine sokulur. Yansıtılmış uygulamada polinomun ters çevrilmiş hâli olan <code>0xEDB88320</code> sabiti kullanılır.',
      'Araç önce 256 girişli bir arama tablosu kurar; her giriş bir baytın sekiz kez kaydırılıp gerektiğinde bu sabitle ÖZEL VEYA\'lanmasıyla elde edilir. Sonra veri bayt bayt işlenir: geçerli CRC\'nin en düşük baytı ile veri baytı birleştirilir, tablodan karşılığı alınır ve CRC\'nin sekiz bit sağa kaydırılmış hâliyle ÖZEL VEYA\'lanır. Bütün baytlar bittiğinde değer tersine çevrilir ve sonuç ortaya çıkar.',
    ] },
    { h: 'Çözümlü örnek: sınama dizgisi', p: [
      'CRC uygulamalarını doğrulamak için herkesin kullandığı sınama girdisi <code>123456789</code> dizgisidir. Bu dokuz ASCII karakteri <code>31 32 33 34 35 36 37 38 39</code> baytlarına karşılık gelir ve standart CRC-32 sonucu <strong>CBF43926</strong> olmalıdır. Aracı metin kipinde <code>123456789</code> ile ya da onaltılık kipte bu dokuz baytla çalıştırdığınızda aynı değeri, ondalık olarak 3421780262 sayısını görürsünüz.',
      'İkinci bir örnek: tek harflik <code>a</code> girdisinin CRC32 değeri <strong>E8B7BE43</strong>, İngilizce pangram olan "The quick brown fox jumps over the lazy dog" cümlesinin değeri ise <strong>414FA339</strong> olur. Kendi yazdığınız bir CRC işlevini sınarken bu üç değeri ölçüt alabilirsiniz.',
    ] },
    { h: 'Metin kipi ile onaltılık kip arasındaki fark', p: [
      'Metin kipinde yazdıklarınız UTF-8 baytlarına çevrilir. ASCII harf ve rakamlar birer bayt, Türkçeye özgü ç, ğ, ı, ö, ş, ü harfleri ikişer bayt tutar; örneğin "Türkçe" sözcüğü altı karakter ama sekiz bayttır. Karşı tarafta farklı bir kodlama kullanılıyorsa CRC değerleri tutmaz.',
      'Onaltılık kip, bayt değerlerini kesin olarak bildiğiniz durumlar içindir: bir seri port iletisi, gömülü cihaz paketi ya da dosyadan alınmış bir bayt dökümü. Baytları boşlukla, virgülle ya da iki noktayla ayırabilir, başlarına <code>0x</code> koyabilirsiniz. Her bayt iki haneyle yazılmalıdır; <code>A</code> yerine <code>0A</code> yazın.',
    ] },
    { h: 'CRC32 neye uygun değildir?', p: [
      'CRC32 kazara oluşan bozulmaları yakalamak için tasarlanmıştır, kasıtlı değişikliklere karşı koruma sağlamaz. Aynı CRC32 değerini veren başka bir veri üretmek kolaydır; ayrıca 32 bitlik alan küçük olduğundan çok sayıda farklı veri arasında rastlantısal çakışmalar da görülür. İndirilen bir dosyanın değiştirilmediğinden emin olmak, imza doğrulamak ya da parola saklamak için CRC32 değil, SHA-256 gibi kriptografik özet işlevleri kullanılmalıdır.',
    ] },
    { h: 'Farklı sonuç alıyorsanız', ul: [
      '<strong>Başka bir CRC türü:</strong> CRC-32C (Castagnoli), CRC-32/MPEG-2 ve CRC-32/BZIP2 farklı polinom ya da yansıtma ayarı kullanır; aynı veri için farklı sonuç verir.',
      '<strong>Bayt sırası:</strong> bazı protokoller CRC\'yi düşük bayt önce gönderir. CBF43926 değeri hatta 26 39 F4 CB sırasıyla görünebilir.',
      '<strong>Satır sonu:</strong> metnin sonundaki görünmeyen satır sonu karakteri ayrı bir bayttır ve sonucu değiştirir.',
      '<strong>Kodlama:</strong> Türkçe karakterler UTF-8 yerine tek baytlı bir kod sayfasıyla kodlanmışsa bayt dizisi ve dolayısıyla CRC farklı olur.',
      '<strong>İşaretli sayı:</strong> bazı dillerde sonuç negatif tam sayı olarak yazdırılır; 32 bit işaretsiz karşılığına çevrildiğinde aynı değerdir.',
    ] },
  ],
  faq: [
    ['CRC32 kaç hanelidir?', 'CRC32 32 bitlik bir değerdir. Onaltılık yazıldığında sekiz hane olur; baştaki sıfırlar da yazılır, örneğin 04F12000. Ondalık karşılığı 0 ile 4294967295 arasındadır.'],
    ['CRC32 bir şifreleme ya da güvenli özet midir?', 'Hayır. CRC32 yalnızca kazara oluşan hataları sezmek içindir. Bilinçli olarak aynı CRC değerini veren başka bir veri hazırlamak kolaydır; güvenlik gerektiren işlerde kriptografik özet kullanılır.'],
    ['123456789 için doğru CRC32 değeri nedir?', 'Standart CRC-32 için CBF43926 değeridir. Bu girdi, CRC uygulamalarının sınanması için yaygın biçimde kullanılır; farklı bir sonuç alıyorsanız büyük olasılıkla başka bir CRC türü hesaplanıyordur.'],
    ['ZIP dosyasındaki CRC ile burada bulduğum değer aynı mı olur?', 'Aynı tanım kullanılır. ZIP arşivi her dosyanın sıkıştırılmamış içeriğinin CRC32 değerini saklar. İçeriği birebir aynı baytlarla buraya verebilirseniz sonuç tutar; metin yapıştırırken satır sonu ve kodlama farklarına dikkat edin.'],
    ['CRC32 ile CRC-32C aynı şey midir?', 'Değildir. CRC-32C farklı bir üreteç polinom (Castagnoli) kullanır ve bazı depolama ve ağ protokollerinde tercih edilir. Bu araç yaygın CRC-32 tanımını hesaplar.'],
    ['Onaltılık kipte tek haneli bayt yazabilir miyim?', 'Hayır, her bayt iki haneyle yazılmalıdır. Araç ayırıcıları atıp haneleri ikişer ikişer okuduğu için tek haneli bir değer sonraki baytların kaymasına yol açardı; bu yüzden tek sayıda hane olduğunda uyarı verilir.'],
    ['İki farklı verinin CRC32 değeri aynı çıkabilir mi?', 'Evet. Olası değer sayısı yaklaşık 4,29 milyar olduğundan farklı veriler aynı CRC32 değerine denk gelebilir. Bu nedenle CRC32 benzersiz kimlik olarak değil, hata denetimi olarak kullanılmalıdır.'],
    ['Girdiğim veri bir yere kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızın içinde yapılır; veri sunucuya gönderilmez ve saklanmaz. Sayfa yüklendikten sonra bağlantı olmadan da çalışır.'],
  ],
  related: ['metin-sha256-hesapla', 'dosya-hash', 'sayi-tabani-donustur', 'bit-islem-hesapla', 'base64-donustur'],
};
