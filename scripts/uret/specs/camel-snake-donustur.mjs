export default {
  slug: 'camel-snake-donustur',
  title: 'camelCase snake_case Dönüştürücü',
  h1Tail: 'değişken adı biçimleri',
  pageTitle: 'camelCase snake_case Dönüştürücü – Değişken Adı Biçimi Çevirme',
  description: 'Değişken ve sütun adlarını camelCase, PascalCase, snake_case, SABIT_YAZIM ve kebab-case arasında çevirin. Her satır ayrı dönüştürülür, Türkçe harfler sadeleştirilir.',
  card: 'Değişken adlarını camelCase, PascalCase, snake_case, SABIT_YAZIM ve kebab-case biçimleri arasında toplu çevirin.',
  category: 'metin',
  keywords: ['camelcase snake_case dönüştürücü', 'camel case çevirme', 'snake case dönüştürme', 'kebab case', 'pascal case', 'değişken adı dönüştürme', 'sütun adı çevirme'],
  lead: 'Bir veritabanından gelen <code>kullanici_adi</code> sütununu JavaScript\'te <code>kullaniciAdi</code>, CSS\'te <code>kullanici-adi</code> olarak mı yazmanız gerekiyor? Adları satır satır yapıştırın, hedef biçimi seçin; araç kelime sınırlarını bulup hepsini tek seferde çevirsin.',
  button: 'Dönüştür',
  inputs: [
    { id: 'metin', label: 'Adlar (her satıra bir tane)', type: 'textarea', placeholder: 'kullanici_adi\ntoplamTutar\nHTTP Sunucu Hatası', wide: true },
    { id: 'hedef', label: 'Hedef biçim', type: 'select', options: [['snake', 'snake_case'], ['camel', 'camelCase'], ['pascal', 'PascalCase'], ['sabit', 'SABIT_YAZIM (SCREAMING_SNAKE)'], ['kebab', 'kebab-case']] },
    { id: 'turkce', label: 'Türkçe harfler', type: 'select', options: [['sade', 'Sadeleştir (ç → c, ş → s, ı → i…)'], ['koru', 'Olduğu gibi bırak']], hint: 'Çoğu dil ve araçta tanımlayıcılarda yalnızca İngilizce harf kullanmak en sorunsuz yoldur.' },
  ],
  compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Dönüştürmek için en az bir değişken ya da sütun adı yazın.');
    const HARITA = { ç: 'c', Ç: 'C', ğ: 'g', Ğ: 'G', ı: 'i', İ: 'I', ö: 'o', Ö: 'O', ş: 's', Ş: 'S', ü: 'u', Ü: 'U', â: 'a', Â: 'A', î: 'i', Î: 'I', û: 'u', Û: 'U' };
    const sade = v.turkce !== 'koru';
    const kucuk = (x) => x.replace(/İ/g, 'i').toLowerCase();
    const buyuk = (x) => x.toUpperCase();
    const bas = (x) => { const a = Array.from(x); return buyuk(a[0]) + a.slice(1).join(''); };
    const kelimeler = (satir) => {
      const t = sade ? satir.replace(/[çÇğĞıİöÖşŞüÜâÂîÎûÛ]/g, (c) => HARITA[c]) : satir;
      const o = [];
      // Önce harf/rakam olmayan her şeyden böl, sonra büyük-küçük harf geçişlerinden ayır (HTTPServer → HTTP + Server)
      for (const parca of t.split(/[^\p{L}\p{N}]+/u)) {
        if (!parca) continue;
        const m = parca.match(/\p{Lu}+(?=\p{Lu}\p{Ll})|\p{Lu}?\p{Ll}+\p{N}*|\p{Lu}+\p{N}*|\p{N}+|\p{L}+/gu);
        if (m) for (const k of m) o.push(kucuk(k));
      }
      return o;
    };
    const birlestir = (k) => {
      if (v.hedef === 'camel') return k.map((x, i) => (i === 0 ? x : bas(x))).join('');
      if (v.hedef === 'pascal') return k.map(bas).join('');
      if (v.hedef === 'sabit') return k.map(buyuk).join('_');
      if (v.hedef === 'kebab') return k.join('-');
      return k.join('_');
    };
    let adet = 0, toplamKelime = 0;
    const cikti = s.split('\n').map((satir) => {
      if (satir.trim() === '') return '';
      const k = kelimeler(satir);
      if (!k.length) return satir.trim();
      adet++; toplamKelime += k.length;
      return birlestir(k);
    });
    if (adet === 0) h.err('Girdide harf ya da rakam bulunamadı. "kullanici_adi" ya da "toplamTutar" gibi bir ad yazın.');
    const ADLAR = { snake: 'snake_case', camel: 'camelCase', pascal: 'PascalCase', sabit: 'SABIT_YAZIM', kebab: 'kebab-case' };
    return {
      rows: [
        ['Dönüştürülen ad', h.fmt(adet, 0)],
        ['Bulunan kelime', h.fmt(toplamKelime, 0)],
        ['Hedef biçim', ADLAR[v.hedef] || 'snake_case'],
      ],
      text: cikti.join('\n'),
      note: 'Rakamla başlayan adlar çoğu dilde geçerli tanımlayıcı değildir; sonuç rakamla başlıyorsa başına bir harf ya da alt çizgi ekleyin.',
    };
  },
  cases: [
    { in: { metin: 'userName', hedef: 'snake' }, out: { 'Dönüştürülen ad': '1', 'Bulunan kelime': '2', 'Hedef biçim': 'snake_case' }, text: 'user_name' },
    { in: { metin: 'user_name', hedef: 'camel' }, out: { 'Hedef biçim': 'camelCase' }, text: 'userName' },
    { in: { metin: 'Kullanıcı Adı Soyadı', hedef: 'snake', turkce: 'sade' }, out: { 'Bulunan kelime': '3' }, text: 'kullanici_adi_soyadi' },
    { in: { metin: 'HTTPServerError', hedef: 'kebab' }, text: 'http-server-error' },
    { in: { metin: 'toplam-tutar', hedef: 'pascal' }, text: 'ToplamTutar' },
    { in: { metin: 'maxValue', hedef: 'sabit' }, text: 'MAX_VALUE' },
    { in: { metin: 'XMLHttpRequest\n\nuser2Name', hedef: 'snake' }, out: { 'Dönüştürülen ad': '2', 'Bulunan kelime': '5' }, text: 'xml_http_request\n\nuser2_name' },
    { in: { metin: 'ürün fiyatı', hedef: 'camel', turkce: 'koru' }, text: 'ürünFiyatı' },
    { in: { metin: 'SİPARİŞ_NO', hedef: 'camel', turkce: 'sade' }, text: 'siparisNo' },
    { in: { metin: '' }, error: true },
    { in: { metin: '--- ___' }, error: true },
  ],
  howto: [
    'Çevirmek istediğiniz değişken, işlev, sütun ya da dosya adlarını her satıra bir tane gelecek biçimde kutuya yapıştırın. Boşluklu düz ifadeler de yazabilirsiniz.',
    '"Hedef biçim" listesinden sonuçta görmek istediğiniz yazımı seçin.',
    'Adlarda Türkçe harf varsa ve bunların İngilizce karşılıklarına çevrilmesini istiyorsanız "Sadeleştir" seçili kalsın.',
    '"Dönüştür" düğmesine basın. Her satır aynı sırada dönüştürülür; boş satırlar yerinde bırakılır.',
    'Sonucu kopyalayıp kodunuza, sorgunuza ya da tablonuza yapıştırın.',
  ],
  sections: [
    { h: 'Adlandırma biçimleri ve nerede kullanıldıkları', p: [
      'Programlama dillerinde bir tanımlayıcının içinde boşluk bulunamaz. Birden çok kelimeden oluşan adları okunur kılmak için farklı topluluklar farklı yazım biçimleri benimsemiştir. Hangisinin kullanılacağı çoğunlukla dilin ya da projenin yazım kılavuzunda belirtilir:',
    ], ul: [
      '<strong>camelCase</strong> (<code>toplamTutar</code>): İlk kelime küçük, sonraki kelimeler büyük harfle başlar. JavaScript, Java, C# ve Swift\'te değişken ve işlev adlarında, JSON alan adlarında yaygındır.',
      '<strong>PascalCase</strong> (<code>ToplamTutar</code>): Bütün kelimeler büyük harfle başlar. Sınıf, tür ve bileşen adlarında kullanılır.',
      '<strong>snake_case</strong> (<code>toplam_tutar</code>): Kelimeler küçük harfle yazılıp alt çizgiyle birleştirilir. Python ve Ruby\'de değişken ve işlev adlarında, veritabanı tablo ve sütun adlarında tercih edilir.',
      '<strong>SABIT_YAZIM</strong> (<code>TOPLAM_TUTAR</code>): Tümü büyük harf ve alt çizgi. Sabitler ve ortam değişkenleri için kullanılır; İngilizcede "screaming snake case" denir.',
      '<strong>kebab-case</strong> (<code>toplam-tutar</code>): Kelimeler kısa çizgiyle birleştirilir. CSS sınıf adlarında, HTML özelliklerinde, adres çubuğundaki sayfa adlarında ve komut satırı seçeneklerinde görülür.',
    ] },
    { h: 'Kelime sınırları nasıl bulunur?', p: [
      'Dönüşüm iki adımda yapılır. Önce girdi kelimelere ayrılır, sonra kelimeler hedef biçimin kuralına göre birleştirilir. Ayırma sırasında araç şu sınırları tanır: boşluk, alt çizgi, kısa çizgi, nokta gibi harf ve rakam olmayan her karakter; küçük harften büyük harfe geçiş; ve art arda büyük harflerden sonra gelen "büyük + küçük" geçişi.',
      'Çözümlü örnek: <code>HTTPServerError</code> adında boşluk ya da çizgi yoktur. Araç <code>HTTP</code> kısaltmasını, ardından büyük harfle başlayıp küçük harfle süren <code>Server</code> ve <code>Error</code> kelimelerini ayırır. kebab-case hedefiyle sonuç <code>http-server-error</code> olur. Aynı mantıkla <code>XMLHttpRequest</code> adı <code>xml</code>, <code>http</code>, <code>request</code> olarak üç kelimeye bölünür ve snake_case karşılığı <code>xml_http_request</code> çıkar.',
      'Rakamlar kendilerinden önceki kelimeye bağlı kalır: <code>user2Name</code> adı <code>user2</code> ve <code>name</code> olarak ayrılır, snake_case sonucu <code>user2_name</code> olur. Böylece <code>sha256</code>, <code>utf8</code>, <code>ipv4</code> gibi adlar ortadan bölünmez.',
    ] },
    { h: 'Türkçe harfler ve i/İ tuzağı', p: [
      'Pek çok dil tanımlayıcılarda Türkçe harfe izin verse de bunları kullanmak dosya kodlaması, veritabanı karşılaştırma kuralı ve farklı klavyelerde yazım güçlüğü gibi sorunlar çıkarabilir. "Sadeleştir" seçeneği ç, ğ, ı, ö, ş, ü harflerini c, g, i, o, s, u harflerine çevirir. Çözümlü örnek: <code>Kullanıcı Adı Soyadı</code> girdisi üç kelime olarak bulunur ve snake_case hedefiyle <code>kullanici_adi_soyadi</code> elde edilir.',
      'Büyük harfli Türkçe adlarda ek bir tuzak vardır: <code>SİPARİŞ</code> kelimesindeki noktalı büyük İ, sıradan küçültme işleminde görünmez bir birleştirici nokta üretebilir ve ad gözle aynı görünse de eşleşmez. Araç bu harfi önce düz <code>I</code> ya da <code>i</code> harfine indirger; <code>SİPARİŞ_NO</code> girdisinin camelCase karşılığı temiz bir <code>siparisNo</code> olur.',
      '"Olduğu gibi bırak" seçildiğinde harfler korunur: <code>ürün fiyatı</code> girdisi <code>ürünFiyatı</code> olur. Bu seçenekte büyük küçük harf çevirisi İngilizce kurala göre yapılır; yani küçük <code>i</code> harfi büyütüldüğünde noktasız <code>I</code> olur. Tanımlayıcılarda beklenen davranış budur, ancak Türkçe kelimelerde yazım hatası gibi görünebilir.',
    ] },
    { h: 'Tipik kullanım senaryoları', p: [
      'En sık karşılaşılan iş, katmanlar arasında ad eşlemektir. Veritabanı sütunları snake_case, uygulama kodu camelCase kullanıyorsa onlarca alanın karşılığını elle yazmak yerine sütun listesini yapıştırıp çevirmek yeterlidir. Tersine, bir arayüz bileşeninin PascalCase adından CSS sınıfı için kebab-case karşılığını üretmek de aynı yoldan yapılır.',
      'Hesap tablosundaki sütun başlıklarından değişken adı türetmek de yaygındır. "Fatura Tarihi", "Vade Günü", "KDV Oranı" gibi başlıkları yapıştırıp snake_case seçtiğinizde <code>fatura_tarihi</code>, <code>vade_gunu</code>, <code>kdv_orani</code> elde edersiniz. Ortam değişkeni adı gerekiyorsa aynı listeyi SABIT_YAZIM hedefiyle çevirebilirsiniz.',
    ] },
    { h: 'Sınırlar ve dikkat edilecekler', ul: [
      '<strong>Kısaltmalar bilgi kaybeder:</strong> <code>userID</code> adı snake_case\'e <code>user_id</code> olarak çevrilir; geri camelCase\'e döndüğünde <code>userId</code> olur, <code>userID</code> değil. Gidiş dönüş her zaman özgün yazımı geri vermez.',
      '<strong>Tek harfli büyük harf dizileri:</strong> <code>getXYPosition</code> gibi adlarda <code>XY</code> tek kelime sayılır; iki ayrı harf olarak bölünmesini istiyorsanız girdide araya boşluk koyun.',
      '<strong>Ayrılmış sözcükler:</strong> Araç sonucun hedef dilde ayrılmış bir sözcük (<code>class</code>, <code>for</code> gibi) olup olmadığını denetlemez.',
      '<strong>Kod içinde toplu değiştirme yapmaz:</strong> Bu araç ad listelerini çevirir; bir kaynak dosyadaki bütün kullanımları yeniden adlandırmak için düzenleyicinizin yeniden adlandırma özelliğini kullanın.',
    ] },
  ],
  faq: [
    ['camelCase ile PascalCase arasındaki fark nedir?', 'Tek fark ilk harftir. camelCase\'de ilk kelime küçük harfle başlar (siparisNo), PascalCase\'de büyük harfle başlar (SiparisNo). PascalCase bazen "üst camel case" olarak da anılır ve genellikle sınıf ve tür adlarında kullanılır.'],
    ['snake_case neden bu adı almış?', 'Kelimeleri birleştiren alt çizgiler yerde sürünen bir yılanı andırdığı için. Benzer biçimde camelCase adını ortadaki büyük harflerin deve hörgücüne, kebab-case ise şişe dizilmiş parçalara benzemesinden alır.'],
    ['Birden çok adı aynı anda çevirebilir miyim?', 'Evet. Her satıra bir ad yazın; araç satırları ayrı ayrı dönüştürür ve aynı sırada verir. Boş satırlar korunur, böylece sonucu kaynağınızla yan yana karşılaştırabilirsiniz.'],
    ['Boşluklu normal bir cümleyi de çevirebilir miyim?', 'Evet. "Toplam sipariş tutarı" gibi düz bir ifade de kelimelerine ayrılır ve seçtiğiniz biçimde birleştirilir. Noktalama işaretleri ayırıcı sayılır ve sonuca alınmaz.'],
    ['HTTP gibi kısaltmalar nasıl işlenir?', 'Art arda gelen büyük harfler tek kelime kabul edilir. HTTPServer adı http ve server olarak ayrılır. camelCase ya da PascalCase hedefinde kısaltmanın yalnızca ilk harfi büyük yazılır: HttpServer.'],
    ['Türkçe karakterli değişken adı kullanmak sakıncalı mı?', 'Birçok modern dil buna izin verir, ancak farklı araçlar, veritabanları ve ekip arkadaşlarının klavyeleri sorun çıkarabilir. Yaygın uygulama tanımlayıcılarda yalnızca İngilizce harf, rakam ve alt çizgi kullanmaktır; araç varsayılan olarak buna göre sadeleştirir.'],
    ['Sonuç rakamla başlıyorsa ne yapmalıyım?', 'Çoğu dilde tanımlayıcı rakamla başlayamaz. "2024 satış" girdisi 2024_satis olarak çevrilir; bunu kodda kullanmadan önce başına bir harf ya da kelime ekleyin, örneğin satis_2024.'],
    ['Yapıştırdığım adlar bir yere gönderiliyor mu?', 'Hayır. Dönüştürme tarayıcınızda yapılır; şema ve değişken adlarınız sunucuya iletilmez, kaydedilmez. Şirket içi projelerin adlarını da güvenle çevirebilirsiniz.'],
  ],
  related: ['buyuk-kucuk-harf-donustur', 'url-metni-olustur', 'turkce-karakter-donustur', 'bul-ve-degistir', 'json-bicimlendir'],
};
