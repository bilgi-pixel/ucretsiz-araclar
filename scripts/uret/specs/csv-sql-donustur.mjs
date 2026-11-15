export default {
  slug: 'csv-sql-donustur',
  title: 'CSV\'den SQL INSERT Oluşturma',
  h1Tail: 'tabloyu sorguya çevir',
  pageTitle: 'CSV\'den SQL INSERT Oluşturma – CSV SQL Dönüştürücü',
  description: 'CSV ya da Excel\'den kopyaladığınız tabloyu SQL INSERT sorgularına çevirin. Tırnaklar kaçırılır, sayılar ve boş hücreler doğru yazılır; veri sunucuya gitmez.',
  card: 'CSV verisinden MySQL, PostgreSQL, SQL Server ve SQLite için INSERT INTO sorguları üretin.',
  category: 'gelistirici',
  keywords: ['csv sql dönüştürme', 'csv insert oluşturma', 'csv to sql', 'excel sql insert', 'csv den sql sorgusu', 'insert into oluşturucu', 'csv veritabanına aktarma'],
  lead: 'CSV metnini yapıştırın, tablo adını yazın; araç her satır için <strong>INSERT INTO</strong> sorgusu üretir. Metinlerdeki kesme işaretleri kaçırılır, sayılar tırnaksız yazılır, boş hücreler isteğinize göre <code>NULL</code> ya da boş metin olur.',
  button: 'SQL oluştur',
  inputs: [
    { id: 'csv', label: 'CSV verisi', type: 'textarea', rows: 8, placeholder: 'ad,yas,sehir\nAli,30,Ankara\nAyşe,25,İzmir' },
    { id: 'tablo', label: 'Tablo adı', type: 'text', value: 'tablo', placeholder: 'musteriler' },
    { id: 'ayrac', label: 'Ayraç', type: 'select', options: [['oto', 'Otomatik algıla'], ['virgul', 'Virgül (,)'], ['nv', 'Noktalı virgül (;)'], ['sekme', 'Sekme']] },
    { id: 'baslik', label: 'İlk satır', type: 'select', options: [['evet', 'Sütun adlarını içeriyor'], ['hayir', 'Veri satırı (sütun adı yok)']] },
    { id: 'tur', label: 'Sayılar', type: 'select', options: [['sayi', 'Tırnaksız yaz (30, 12.5)'], ['metin', 'Her şeyi metin olarak yaz']] },
    { id: 'bos', label: 'Boş hücreler', type: 'select', options: [['null', 'NULL yaz'], ['metin', 'Boş metin (\'\') yaz']] },
    { id: 'bicim', label: 'Sorgu biçimi', type: 'select', options: [['ayri', 'Her satır için ayrı INSERT'], ['tek', 'Tek INSERT, çok satırlı VALUES']] },
    { id: 'tirnak', label: 'Ad tırnakları', type: 'select', options: [['yok', 'Yok (adları sadeleştir)'], ['ters', '`ad` (MySQL, MariaDB)'], ['cift', '"ad" (PostgreSQL, SQLite, standart)'], ['koseli', '[ad] (SQL Server)']] },
  ],
  compute(v, h) {
    const s = String(v.csv ?? '').replace(/^﻿/, '');
    if (s.trim() === '') h.err('SQL\'e çevrilecek CSV verisini "CSV verisi" alanına yapıştırın.');
    // Ayraç
    let d;
    if (v.ayrac === 'virgul') d = ',';
    else if (v.ayrac === 'nv') d = ';';
    else if (v.ayrac === 'sekme') d = '\t';
    else {
      const say = { ',': 0, ';': 0, '\t': 0 };
      let q = false;
      for (const c of s) {
        if (c === '"') q = !q;
        else if (!q && (c === '\n' || c === '\r')) break;
        else if (!q && c in say) say[c]++;
      }
      d = say[';'] > say[','] && say[';'] >= say['\t'] ? ';' : say['\t'] > say[','] ? '\t' : ',';
    }
    // RFC 4180 uyumlu ayrıştırma
    const satirlar = [];
    let satir = [], alan = '', q = false, tirnakli = false;
    const bitir = () => { satir.push(tirnakli ? alan : alan.trim()); alan = ''; tirnakli = false; };
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (q) {
        if (c === '"') { if (s[i + 1] === '"') { alan += '"'; i++; } else q = false; }
        else alan += c;
      } else if (c === '"' && alan.trim() === '') { q = true; tirnakli = true; alan = ''; }
      else if (c === d) bitir();
      else if (c === '\n' || c === '\r') {
        if (c === '\r' && s[i + 1] === '\n') i++;
        bitir(); satirlar.push(satir); satir = [];
      } else alan += c;
    }
    if (q) h.err('CSV içinde açılıp kapatılmamış bir çift tırnak var. Tırnak içeren hücrelerde tırnağı iki kez ("") yazın.');
    if (alan !== '' || satir.length) { bitir(); satirlar.push(satir); }
    const dolu = satirlar.filter((r) => !(r.length === 1 && r[0] === ''));
    if (!dolu.length) h.err('CSV verisinde dolu satır bulunamadı.');

    const TR = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', Ç: 'C', Ğ: 'G', İ: 'I', Ö: 'O', Ş: 'S', Ü: 'U' };
    const sade = (t, yedek) => {
      let a = String(t).trim().replace(/[çğıöşüÇĞİÖŞÜ]/g, (c) => TR[c]).replace(/[^A-Za-z0-9_]+/g, '_').replace(/^_+|_+$/g, '');
      if (a === '') a = yedek;
      if (/^[0-9]/.test(a)) a = '_' + a;
      return a;
    };
    const adYaz = (t, yedek) => {
      const a = String(t).trim() || yedek;
      if (v.tirnak === 'ters') return '`' + a.replace(/`/g, '``') + '`';
      if (v.tirnak === 'cift') return '"' + a.replace(/"/g, '""') + '"';
      if (v.tirnak === 'koseli') return '[' + a.replace(/\]/g, ']]') + ']';
      return sade(a, yedek);
    };
    const tabloHam = String(v.tablo ?? '').trim();
    if (tabloHam === '') h.err('"Tablo adı" alanını doldurun (örn. musteriler).');
    const tablo = adYaz(tabloHam, 'tablo');

    let basliklar, veri;
    if (v.baslik === 'hayir') { veri = dolu; basliklar = dolu[0].map((_, k) => `sutun${k + 1}`); }
    else { basliklar = dolu[0]; veri = dolu.slice(1); }
    if (!veri.length) h.err('Yalnızca başlık satırı var; INSERT üretmek için en az bir veri satırı gerekir. İlk satır veri ise "İlk satır" seçeneğini değiştirin.');
    const kolon = basliklar.length;
    const adlar = basliklar.map((b, k) => adYaz(b, `sutun${k + 1}`));
    if (new Set(adlar).size !== adlar.length) h.err('Sütun adları birbirinden farklı olmalı; başlık satırında aynı ad birden çok kez geçiyor.');
    const SAYI = /^-?(0|[1-9]\d*)(\.\d+)?$/;
    const deger = (t) => {
      if (t === '') return v.bos === 'metin' ? '\'\'' : 'NULL';
      if (v.tur !== 'metin' && SAYI.test(t)) return t;
      return '\'' + t.replace(/'/g, '\'\'') + '\'';
    };
    const degerler = veri.map((r, k) => {
      if (r.length !== kolon) h.err(`${k + 1}. veri satırında ${r.length} hücre var, oysa ${kolon} sütun bekleniyor. Ayraç seçimini ve tırnak içine alınması gereken hücreleri denetleyin.`);
      return '(' + r.map(deger).join(', ') + ')';
    });
    const bas = `INSERT INTO ${tablo} (${adlar.join(', ')}) VALUES`;
    const text = v.bicim === 'tek'
      ? bas + '\n' + degerler.map((x) => '  ' + x).join(',\n') + ';'
      : degerler.map((x) => `${bas} ${x};`).join('\n');
    return {
      rows: [
        ['Satır sayısı', h.fmt(veri.length, 0)],
        ['Sütun sayısı', h.fmt(kolon, 0)],
        ['Ayraç', d === ',' ? 'virgül' : d === ';' ? 'noktalı virgül' : 'sekme'],
      ],
      text,
      note: 'Sorguları çalıştırmadan önce sütun adlarının ve veri türlerinin tablonuzla uyuştuğunu denetleyin; önce bir test veritabanında deneyin.',
    };
  },
  cases: [
    { in: { csv: 'ad,yas\nAli,30\nAyşe,25', tablo: 'musteriler' }, text: 'INSERT INTO musteriler (ad, yas) VALUES (\'Ali\', 30);\nINSERT INTO musteriler (ad, yas) VALUES (\'Ayşe\', 25);', out: { 'Satır sayısı': '2', 'Sütun sayısı': '2', 'Ayraç': 'virgül' } },
    { in: { csv: 'urun;fiyat\nKalem;12.5\nDefter;40', tablo: 'urunler', bicim: 'tek' }, text: 'INSERT INTO urunler (urun, fiyat) VALUES\n  (\'Kalem\', 12.5),\n  (\'Defter\', 40);', out: { 'Ayraç': 'noktalı virgül' } },
    { in: { csv: 'ad,aciklama\n"Demir, Ali","O\'nun ""özel"" notu"' }, text: 'INSERT INTO tablo (ad, aciklama) VALUES (\'Demir, Ali\', \'O\'\'nun "özel" notu\');' },
    { in: { csv: 'Ad Soyad,telefon,şehir\nAli Kaya,0532,\n', tirnak: 'ters' }, text: 'INSERT INTO `tablo` (`Ad Soyad`, `telefon`, `şehir`) VALUES (\'Ali Kaya\', \'0532\', NULL);' },
    { in: { csv: 'Ad Soyad,Doğum Yılı\nAli,1990' }, text: 'INSERT INTO tablo (Ad_Soyad, Dogum_Yili) VALUES (\'Ali\', 1990);' },
    { in: { csv: '1,a\n2,b', baslik: 'hayir', tur: 'metin' }, text: 'INSERT INTO tablo (sutun1, sutun2) VALUES (\'1\', \'a\');\nINSERT INTO tablo (sutun1, sutun2) VALUES (\'2\', \'b\');' },
    { in: { csv: 'kod\tstok\tnot\nA1\t-5\t', ayrac: 'sekme', bos: 'metin', tirnak: 'koseli', tablo: 'stok' }, text: 'INSERT INTO [stok] ([kod], [stok], [not]) VALUES (\'A1\', -5, \'\');' },
    { in: { csv: 'a,b\n1,2,3' }, error: true },
    { in: { csv: 'a,b' }, error: true },
    { in: { csv: '' }, error: true },
    { in: { csv: 'a,b\n1,2', tablo: '' }, error: true },
  ],
  howto: [
    'Tablonuzu CSV olarak kopyalayıp "CSV verisi" alanına yapıştırın. Excel ya da başka bir hesap tablosundan doğrudan kopyalanan hücreler sekmeyle ayrılır; araç bunu kendiliğinden algılar.',
    '"Tablo adı" alanına verinin ekleneceği tablonun adını yazın.',
    'İlk satırın sütun adı içerip içermediğini, sayıların ve boş hücrelerin nasıl yazılacağını seçin.',
    'Kullandığınız veritabanına göre ad tırnağını ve sorgu biçimini belirleyip "SQL oluştur" düğmesine basın.',
    'Üretilen sorguları kopyalayın ve önce bir test veritabanında çalıştırarak sonucu denetleyin.',
  ],
  sections: [
    { h: 'CSV\'den INSERT sorgusu neden üretilir?', p: [
      'Bir hesap tablosundaki müşteri listesini, ürün kataloğunu ya da il-ilçe tablosunu veritabanına aktarmanın birkaç yolu vardır. Veritabanı araçlarının içe aktarma sihirbazları ve toplu yükleme komutları büyük dosyalar için en hızlı seçenektir, ancak sunucuya dosya erişimi, yetki ve biçim ayarı gerektirir. Paylaşımlı barındırmada, yalnızca bir sorgu penceresine erişiminiz olduğunda ya da veriyi bir kurulum betiğine, geçiş (migration) dosyasına veya test verisi dosyasına gömmek istediğinizde düz <code>INSERT</code> sorguları en taşınabilir çözümdür.',
      'Bu sorguları elle yazmak hem zahmetli hem hataya açıktır: bir kesme işaretini kaçırmayı unutmak sorguyu bozar. Araç bu dönüşümü kurallı biçimde yapar.',
    ] },
    { h: 'Dönüşüm kuralları', ul: [
      '<strong>Metinler</strong> tek tırnak içine alınır; içlerindeki kesme işareti iki kez yazılarak kaçırılır. <code>O\'nun</code> değeri sorguda <code>\'O\'\'nun\'</code> olur. Bu, SQL standardındaki kaçış biçimidir ve yaygın veritabanlarının tamamında geçerlidir.',
      '<strong>Sayılar</strong> tırnaksız yazılır. Sayı sayılması için değerin yalnızca rakamlardan, isteğe bağlı eksi işaretinden ve ondalık <em>noktasından</em> oluşması gerekir: <code>30</code>, <code>-5</code>, <code>12.5</code>.',
      '<strong>Baştaki sıfır korunur:</strong> <code>0532</code> ya da <code>06100</code> gibi değerler sayı değil metin sayılır. Böylece telefon alan kodu, posta kodu ve vergi numarası gibi alanlarda sıfır kaybolmaz.',
      '<strong>Virgüllü ondalıklar</strong> (<code>12,5</code>) metin olarak yazılır, çünkü SQL\'de ondalık ayırıcı noktadır. Sayı olarak aktarmak istiyorsanız veriyi önce noktalı biçime çevirin.',
      '<strong>Boş hücreler</strong> seçiminize göre <code>NULL</code> ya da boş metin olur.',
      '<strong>Hücre başı ve sonundaki boşluklar</strong> silinir; çift tırnak içine alınmış hücreler ise olduğu gibi korunur.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'İlk satırı <code>ad,yas</code>, sonraki satırları <code>Ali,30</code> ve <code>Ayşe,25</code> olan üç satırlık bir CSV\'yi tablo adı <code>musteriler</code> ile dönüştürelim. İlk satır sütun adlarını verir; geriye iki veri satırı kalır. Araç şu iki sorguyu üretir: <code>INSERT INTO musteriler (ad, yas) VALUES (\'Ali\', 30);</code> ve <code>INSERT INTO musteriler (ad, yas) VALUES (\'Ayşe\', 25);</code>. Adlar tırnak içinde, yaşlar tırnaksızdır. Sonuç kutusunun üstünde satır sayısı 2, sütun sayısı 2 ve ayraç "virgül" olarak görünür.',
      'Aynı veriyi "Tek INSERT, çok satırlı VALUES" biçiminde üretirseniz sütun listesi bir kez yazılır ve değer grupları virgülle alt alta sıralanır. Bu biçim daha kısadır ve genellikle daha hızlı çalışır.',
    ] },
    { h: 'Hangi veritabanı için hangi ayar?', p: [
      'Değerlerin yazımı bütün yaygın veritabanlarında aynıdır; fark tablo ve sütun adlarının tırnaklanmasındadır. MySQL ve MariaDB ters tırnak (<code>`ad`</code>), PostgreSQL ve SQLite ile SQL standardı çift tırnak (<code>"ad"</code>), SQL Server köşeli parantez (<code>[ad]</code>) kullanır. Tırnak, adınızda boşluk ya da Türkçe harf varsa ya da ad ayrılmış bir sözcükle (<code>order</code>, <code>group</code>, <code>not</code> gibi) çakışıyorsa gereklidir. PostgreSQL\'de çift tırnaklı adların büyük-küçük harfe duyarlı hâle geldiğini unutmayın.',
      '"Yok" seçeneğinde adlar tırnaksız yazılır ve güvenli hâle getirilir: Türkçe harfler Latin karşılıklarına çevrilir, boşluk ve noktalama alt çizgi olur. <code>Doğum Yılı</code> başlığı <code>Dogum_Yili</code> hâline gelir. Tablonuzdaki gerçek sütun adları farklıysa başlık satırını CSV\'de ona göre düzeltin.',
      'Çok satırlı <code>VALUES</code> biçimi güncel MySQL, PostgreSQL, SQLite ve SQL Server sürümlerinde desteklenir. Bazı sistemlerde tek sorguda eklenebilecek satır sayısı ya da sorgu boyutu sınırlıdır; çok büyük veride ayrı sorgular ya da parçalara bölme daha güvenlidir.',
    ] },
    { h: 'CSV ayrıştırma ayrıntıları', p: [
      'Türkçe bölge ayarlı hesap tablosu programları CSV\'yi çoğunlukla noktalı virgülle kaydeder, çünkü virgül ondalık ayırıcı olarak kullanılır. Araç ilk satırdaki virgül, noktalı virgül ve sekme sayısına bakarak ayracı tahmin eder; yanlış tahmin ederse listeden elle seçebilirsiniz.',
      'İçinde ayraç, satır sonu ya da çift tırnak bulunan hücreler çift tırnak içine alınmalıdır: <code>"Demir, Ali"</code> tek hücredir. Hücre içindeki çift tırnak iki kez yazılır. Boş satırlar atlanır. Bir veri satırındaki hücre sayısı sütun sayısıyla uyuşmuyorsa araç sorgu üretmez ve hatalı satırın numarasını bildirir; yanlış sütuna kayan veri sessizce aktarılmaz.',
    ] },
    { h: 'Sık yapılan hatalar ve uyarılar', ul: [
      'Tarihleri kontrol etmemek. <code>15.03.2026</code> gibi bir değer metin olarak aktarılır; tarih sütununa yazılacaksa veritabanları çoğunlukla <code>2026-03-15</code> biçimini bekler. Tarihleri önce bu biçime çevirin.',
      'Para tutarlarını binlik ayraçla bırakmak. <code>1.250,50</code> değeri sayı sayılmaz; <code>1250.50</code> olarak düzeltin.',
      'Sorguları doğrudan canlı veritabanında çalıştırmak. Önce yedek alın, mümkünse işlemi bir transaction içinde deneyin.',
      'Otomatik artan kimlik sütununu CSV\'de boş bırakıp <code>NULL</code> olarak göndermek. Bu sütunu CSV\'den tamamen çıkarmak daha doğrudur.',
      'Üretilen metni kullanıcı girdisiyle çalışan uygulama koduna sorgu olarak gömmek. Uygulama içinde her zaman parametreli sorgu kullanın; bu araç tek seferlik veri aktarımı içindir.',
    ] },
  ],
  faq: [
    ['Excel\'den kopyaladığım hücreleri doğrudan yapıştırabilir miyim?', 'Evet. Hesap tablosundan kopyalanan hücreler sekme karakteriyle ayrılır ve araç bunu otomatik algılar. İlk satırınız sütun başlıklarıysa "Sütun adlarını içeriyor" seçeneğini bırakın.'],
    ['Metindeki kesme işaretleri sorguyu bozar mı?', 'Hayır. Her kesme işareti iki kez yazılarak kaçırılır; bu SQL standardındaki yöntemdir. Örneğin O\'nun değeri sorguda \'O\'\'nun\' olarak görünür ve veritabanına tek kesme işaretiyle kaydedilir.'],
    ['Telefon numarasının başındaki sıfır neden kaybolmuyor?', 'Araç baştaki sıfırı olan değerleri sayı saymaz ve tırnak içinde metin olarak yazar. Böylece 0532 gibi bir değer 532\'ye dönüşmez. Sütununuzun da metin türünde olması gerekir.'],
    ['12,5 gibi virgüllü sayılar neden tırnak içinde?', 'SQL\'de ondalık ayırıcı noktadır; virgül değerleri birbirinden ayırır. Yanlışlıkla iki ayrı değer üretmemek için virgüllü sayılar metin olarak bırakılır. Sayı olarak aktarmak için veride virgülü noktaya çevirin.'],
    ['NULL ile boş metin arasındaki fark nedir?', 'NULL "değer yok" anlamına gelir; boş metin ise uzunluğu sıfır olan bir değerdir. Sorgularda farklı davranırlar ve NOT NULL kısıtı olan sütunlar NULL kabul etmez. Tablonuzun yapısına uygun seçeneği kullanın.'],
    ['CREATE TABLE sorgusu da üretiyor mu?', 'Hayır, araç yalnızca INSERT sorguları üretir. Sütun türlerini veriye bakarak doğru tahmin etmek güvenilir olmadığından tablo tanımını sizin yapmanız beklenir.'],
    ['Kaç satıra kadar dönüştürebilirim?', 'Belirli bir sınır yoktur; işlem tarayıcınızın belleğinde yapılır ve on binlerce satır rahatça işlenir. Çok büyük dosyalarda veritabanınızın kendi toplu içe aktarma aracı daha hızlı olacaktır.'],
    ['Verilerim bir sunucuya yükleniyor mu?', 'Hayır. CSV ayrıştırma ve sorgu üretimi tamamen tarayıcınızda çalışır; müşteri listesi gibi kişisel veri içeren tablolarınız bilgisayarınızdan çıkmaz.'],
  ],
  related: ['sql-bicimlendir', 'csv-json-donustur', 'csv-html-tablo', 'csv-markdown-tablo', 'csv-excel'],
};
