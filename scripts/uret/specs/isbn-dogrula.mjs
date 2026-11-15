export default {
  slug: 'isbn-dogrula',
  title: 'ISBN Doğrulama',
  h1Tail: 'ISBN-10 ve ISBN-13',
  pageTitle: 'ISBN Doğrulama – ISBN-10 ve ISBN-13 Kontrol Hanesi Denetimi',
  description: 'ISBN-10 ya da ISBN-13 numarasının kontrol hanesini doğrulayın. Beklenen haneyi, ağırlıklı toplamı ve numaranın diğer biçimdeki (10 ↔ 13) karşılığını görün.',
  card: 'ISBN-10 ya da ISBN-13 numarasının geçerli olup olmadığını denetleyin; diğer biçimdeki karşılığını da alın.',
  category: 'gelistirici',
  keywords: ['isbn doğrulama', 'isbn kontrol', 'isbn 10 isbn 13 çevirme', 'isbn kontrol hanesi hesaplama', 'isbn geçerli mi', 'kitap isbn sorgulama', 'isbn 13 doğrulama', 'isbn numarası nedir'],
  lead: 'Kitabın ISBN numarasını yazın; araç 10 ya da 13 haneli olduğunu kendisi anlar, <strong>kontrol hanesini</strong> yeniden hesaplayarak numaranın doğru yazılıp yazılmadığını söyler ve geçerli numaranın diğer biçimdeki karşılığını verir.',
  button: 'Doğrula',
  inputs: [
    { id: 'isbn', label: 'ISBN numarası', type: 'text', placeholder: 'Örn. 978-3-16-148410-0', hint: 'Tire ve boşluk kullanabilirsiniz. ISBN-10\'da son hane X olabilir.', wide: true },
  ],
  compute(v, h) {
    let s = String(v.isbn ?? '').trim().toUpperCase();
    if (s === '') h.err('"ISBN numarası" alanını doldurun.');
    s = s.replace(/^ISBN(-1[03])?:?/, '').replace(/[\s\-–]/g, '');
    if (!/^[0-9X]+$/.test(s)) h.err('ISBN yalnızca rakam, tire ve (ISBN-10\'un son hanesinde) X içerebilir.');
    if (s.length !== 10 && s.length !== 13) h.err(`ISBN 10 ya da 13 haneli olmalı; ${s.length} hane yazdınız. Eksik ya da fazla hane olup olmadığını kontrol edin.`);
    const x = s.indexOf('X');
    if (x !== -1 && (s.length === 13 || x !== 9)) h.err('X yalnızca ISBN-10\'un son hanesinde bulunabilir ve 10 değerini gösterir.');
    const on3Hane = (on2) => {
      let t = 0;
      for (let i = 0; i < 12; i++) t += (on2.charCodeAt(i) - 48) * (i % 2 === 0 ? 1 : 3);
      return String((10 - (t % 10)) % 10);
    };
    const on0Hane = (dokuz) => {
      let t = 0;
      for (let i = 0; i < 9; i++) t += (dokuz.charCodeAt(i) - 48) * (10 - i);
      const k = (11 - (t % 11)) % 11;
      return k === 10 ? 'X' : String(k);
    };
    const rows = [];
    if (s.length === 10) {
      let toplam = 0;
      for (let i = 0; i < 10; i++) toplam += (s[i] === 'X' ? 10 : s.charCodeAt(i) - 48) * (10 - i);
      const beklenen = on0Hane(s.slice(0, 9));
      const gecerli = beklenen === s[9];
      rows.push(['Sonuç', gecerli ? 'Geçerli ISBN-10' : 'Geçersiz ISBN-10 – kontrol hanesi tutmuyor']);
      rows.push(['Biçim', 'ISBN-10 (10 hane)']);
      rows.push(['Yazılan kontrol hanesi', s[9]]);
      rows.push(['Beklenen kontrol hanesi', beklenen]);
      rows.push(['Ağırlıklı toplam', `${toplam} (11'e bölümünden kalan ${toplam % 11})`]);
      if (gecerli) {
        const on2 = '978' + s.slice(0, 9);
        rows.push(['ISBN-13 karşılığı', on2 + on3Hane(on2)]);
      }
    } else {
      if (!/^97[89]/.test(s)) h.err('ISBN-13 numaraları 978 ya da 979 ile başlar. Başka önekli 13 haneli barkodlar için EAN-13 aracını kullanın.');
      let toplam = 0;
      for (let i = 0; i < 13; i++) toplam += (s.charCodeAt(i) - 48) * (i % 2 === 0 ? 1 : 3);
      const beklenen = on3Hane(s);
      const gecerli = beklenen === s[12];
      rows.push(['Sonuç', gecerli ? 'Geçerli ISBN-13' : 'Geçersiz ISBN-13 – kontrol hanesi tutmuyor']);
      rows.push(['Biçim', 'ISBN-13 (13 hane)']);
      rows.push(['Yazılan kontrol hanesi', s[12]]);
      rows.push(['Beklenen kontrol hanesi', beklenen]);
      rows.push(['Ağırlıklı toplam', `${toplam} (10'a bölümünden kalan ${toplam % 10})`]);
      rows.push(['Önek', s.slice(0, 3)]);
      if (gecerli) {
        rows.push(['ISBN-10 karşılığı', s.startsWith('978') ? s.slice(3, 12) + on0Hane(s.slice(3, 12)) : 'Yok (979 önekli numaraların ISBN-10 karşılığı olmaz)']);
      }
    }
    return {
      rows,
      note: 'Denetim yalnızca kontrol hanesinin tutarlılığına bakar; numaranın gerçekten bir kitaba atanmış olup olmadığını sorgulamaz. Karşılıklar tiresiz yazılır.',
    };
  },
  cases: [
    { in: { isbn: '978-3-16-148410-0' }, out: { 'Sonuç': 'Geçerli ISBN-13', 'Beklenen kontrol hanesi': '0', 'ISBN-10 karşılığı': '316148410X', 'Ağırlıklı toplam': '100 (10\'a bölümünden kalan 0)' } },
    { in: { isbn: '0-306-40615-2' }, out: { 'Sonuç': 'Geçerli ISBN-10', 'ISBN-13 karşılığı': '9780306406157', 'Ağırlıklı toplam': '132 (11\'e bölümünden kalan 0)' } },
    { in: { isbn: '080442957X' }, out: { 'Sonuç': 'Geçerli ISBN-10', 'Yazılan kontrol hanesi': 'X', 'ISBN-13 karşılığı': '9780804429573' } },
    { in: { isbn: '0306406153' }, out: { 'Sonuç': 'Geçersiz ISBN-10 – kontrol hanesi tutmuyor', 'Beklenen kontrol hanesi': '2' } },
    { in: { isbn: '9780306406158' }, out: { 'Sonuç': 'Geçersiz ISBN-13 – kontrol hanesi tutmuyor', 'Beklenen kontrol hanesi': '7' } },
    { in: { isbn: 'ISBN 979-10-90636-07-1' }, out: { 'Sonuç': 'Geçerli ISBN-13', 'Önek': '979', 'ISBN-10 karşılığı': 'Yok (979 önekli numaraların ISBN-10 karşılığı olmaz)' } },
    { in: { isbn: '9780306406157' }, out: { 'Sonuç': 'Geçerli ISBN-13', 'ISBN-10 karşılığı': '0306406152' } },
    { in: { isbn: '12345' }, error: true },
    { in: { isbn: '03064X6152' }, error: true },
    { in: { isbn: '1234567890123' }, error: true },
    { in: { isbn: '' }, error: true },
  ],
  howto: [
    'Kitabın arka kapağında, barkodun üstünde ya da künye sayfasında yazan ISBN numarasını bulun.',
    'Numarayı "ISBN numarası" alanına yazın. Tireleri yazıp yazmamanız fark etmez; baştaki "ISBN" sözcüğü de göz ardı edilir.',
    '"Doğrula" düğmesine basın. İlk satır numaranın geçerli olup olmadığını ve hangi biçimde olduğunu gösterir.',
    'Numara geçersizse "Beklenen kontrol hanesi" satırı, ilk hanelerin doğru olduğu varsayımıyla son hanenin ne olması gerektiğini söyler; kaynağı yeniden kontrol edin.',
    'Geçerli numaralarda son satırdaki ISBN-10 ya da ISBN-13 karşılığını kopyalayarak katalog ve sipariş formlarında kullanın.',
  ],
  sections: [
    { h: 'ISBN nedir?', p: [
      'ISBN (International Standard Book Number, Uluslararası Standart Kitap Numarası), bir kitabın belirli bir baskısını ve biçimini dünya çapında tekil olarak tanımlayan numaradır. Aynı eserin ciltli baskısı, karton kapaklı baskısı ve e-kitabı ayrı ISBN alır. Yayınevleri, kitabevleri, kütüphaneler ve dağıtımcılar sipariş, stok ve kataloglama işlemlerinde kitabı adıyla değil bu numarayla izler.',
      'Numaranın son hanesi bir <strong>kontrol hanesidir</strong>: diğer hanelerden belirli bir formülle türetilir. Numara elle yazılırken bir hane yanlış girilirse ya da iki hane yer değiştirirse formül tutmaz ve hata hemen anlaşılır. Bu araç tam olarak bu denetimi yapar.',
    ] },
    { h: 'ISBN-10 ve ISBN-13 farkı', p: [
      'ISBN başlangıçta 10 haneliydi. Numara alanı dolmaya başlayınca ve kitapların barkod sistemiyle uyumlu olması istenince 2007 yılından itibaren 13 haneli biçime geçildi. ISBN-13, kitap ürünleri için ayrılmış <strong>978</strong> ya da <strong>979</strong> önekiyle başlar ve kitabın arkasındaki EAN-13 barkoduyla aynı sayıdır.',
      'Eski bir ISBN-10\'un başına 978 eklenip kontrol hanesi yeniden hesaplanarak ISBN-13 karşılığı bulunur. Ters yönde, 978 ile başlayan bir ISBN-13\'ün ilk üç hanesi atılıp kontrol hanesi ISBN-10 kuralıyla yeniden hesaplanır. 979 ile başlayan numaraların ise ISBN-10 karşılığı yoktur; bu numaralar yalnızca 13 haneli olarak vardır.',
    ] },
    { h: 'ISBN-13 kontrol hanesi nasıl hesaplanır?', p: [
      'İlk 12 hane soldan sağa sırayla 1 ve 3 ile çarpılır (birinci hane 1, ikinci hane 3, üçüncü hane 1...) ve çarpımlar toplanır. Kontrol hanesi, bu toplamı 10\'un katına tamamlayan rakamdır.',
      '<strong>Örnek:</strong> 978-3-16-148410-0 numarasının ilk 12 hanesi 9, 7, 8, 3, 1, 6, 1, 4, 8, 4, 1, 0\'dır. Çarpımlar 9, 21, 8, 9, 1, 18, 1, 12, 8, 12, 1, 0 olur ve toplamı 100 eder. 100 zaten 10\'un katı olduğundan kontrol hanesi <strong>0</strong>\'dır. Araç da bu numara için ağırlıklı toplamı 100, beklenen kontrol hanesini 0 olarak gösterir.',
    ] },
    { h: 'ISBN-10 kontrol hanesi nasıl hesaplanır?', p: [
      'On hane soldan sağa 10, 9, 8, ... 1 ile çarpılır ve çarpımlar toplanır. Geçerli bir numarada bu toplam 11\'e tam bölünür. Kalan hesabı 11\'e göre yapıldığından kontrol hanesi 0 ile 10 arasında bir değer alabilir; 10 değeri tek haneyle yazılamadığı için Romen rakamıyla <strong>X</strong> olarak gösterilir. Bu yüzden bazı eski ISBN\'ler X ile biter.',
      '<strong>Örnek:</strong> 0-306-40615-2 için toplam 10×0 + 9×3 + 8×0 + 7×6 + 6×4 + 5×0 + 4×6 + 3×1 + 2×5 + 1×2 = 132 eder. 132 = 11 × 12 olduğundan numara geçerlidir. Aynı kitabın ISBN-13 karşılığı 9780306406157\'dir; görüldüğü gibi kontrol hanesi 2\'den 7\'ye değişmiştir, çünkü iki biçim farklı formül kullanır.',
    ] },
    { h: 'ISBN\'in bölümleri', ul: [
      '<strong>Önek:</strong> yalnızca ISBN-13\'te bulunur; 978 ya da 979.',
      '<strong>Kayıt grubu:</strong> ülkeyi, bölgeyi ya da dil alanını gösterir. Türkiye\'de yayımlanan kitaplarda 975, 605 ve 625 gruplarına rastlanır.',
      '<strong>Yayıncı kodu:</strong> yayınevine atanan numara; uzunluğu yayıncının büyüklüğüne göre değişir.',
      '<strong>Yayın kodu:</strong> yayıncının o kitaba ve baskıya verdiği sıra numarası.',
      '<strong>Kontrol hanesi:</strong> diğer hanelerden hesaplanan son hane.',
    ], p: [
      'Bölümler tireyle ayrılır, ancak bölüm uzunlukları sabit olmadığından tirelerin yeri numaradan numaraya değişir. Araç tirelerin doğru yerde olup olmadığını denetlemez ve karşılıkları tiresiz verir; kontrol hanesi hesabı tirelerden etkilenmez.',
    ] },
    { h: 'Kimler kullanır?', p: [
      'Kitabevi ve sahaf çalışanları stok girişinde elle yazılan numarayı doğrulamak, kütüphaneciler katalog kayıtlarını temizlemek, öğrenciler ve akademisyenler kaynakçadaki numaraların doğru aktarıldığından emin olmak için kullanır. İkinci el kitap satan kişiler, eski bir kitabın 10 haneli numarasını satış sitelerinin istediği 13 haneli biçime çevirebilir. Yazılım geliştiriciler ise kendi doğrulama kodlarının sonucunu bağımsız bir araçla karşılaştırabilir.',
    ] },
    { h: 'Sınırlar', p: [
      'Bu araç bir sorgulama servisi değildir; kitabın adını, yazarını ya da yayınevini göstermez ve hiçbir veritabanına bağlanmaz. "Geçerli" sonucu numaranın aritmetik olarak tutarlı olduğunu söyler, o numaranın gerçekten bir kitaba atandığını kanıtlamaz. Dergi ve süreli yayınlarda kullanılan ISSN ile müzik yayınlarındaki ISMN farklı kurallara sahiptir ve kapsam dışıdır. ISBN almak isteyen yayıncı ve yazarların başvuru koşulları için ülkedeki yetkili ISBN ajansının güncel duyurularına bakması gerekir.',
    ] },
  ],
  faq: [
    ['ISBN numarası nerede yazar?', 'Çoğu kitapta arka kapakta barkodun üstünde ve iç kapaktaki künye sayfasında yazar. E-kitaplarda ürün bilgileri bölümünde yer alır. Barkodun altındaki 13 haneli sayı ISBN-13 ile aynıdır.'],
    ['ISBN-10 nasıl ISBN-13\'e çevrilir?', 'ISBN-10\'un son hanesi atılır, başına 978 eklenir ve 12 haneli bu dizinin kontrol hanesi ISBN-13 kuralıyla yeniden hesaplanır. Örneğin 0306406152 numarası 9780306406157 olur.'],
    ['ISBN sonundaki X ne anlama gelir?', 'X, ISBN-10\'da kontrol hanesinin 10 olduğunu gösterir. Hesap 11\'e bölüme dayandığı için kontrol değeri 10 çıkabilir ve tek karakterle yazılabilmesi için X kullanılır. ISBN-13\'te X bulunmaz.'],
    ['Geçerli çıkan ISBN gerçek bir kitaba mı ait?', 'Mutlaka değil. Araç yalnızca kontrol hanesinin diğer hanelerle tutarlı olduğunu doğrular. Numaranın bir kitaba atanıp atanmadığını öğrenmek için kütüphane kataloglarına ya da yayıncıya bakmak gerekir.'],
    ['979 ile başlayan ISBN neden ISBN-10\'a çevrilemiyor?', 'ISBN-10 biçimi yalnızca 978 önekine karşılık gelen numara alanını kapsar. 979 öneki bu alan yetmediği için sonradan açılmıştır ve bu numaraların 10 haneli karşılığı tanımlı değildir.'],
    ['Tireleri yazmak zorunda mıyım?', 'Hayır. Tireler yalnızca okunabilirlik içindir ve kontrol hanesi hesabına girmez. Numarayı tireli, boşluklu ya da bitişik yazabilirsiniz.'],
    ['ISBN ile barkod aynı şey mi?', 'ISBN-13, kitabın arkasındaki EAN-13 barkodunun kodladığı sayıyla aynıdır. Barkod bu sayının çizgilerle gösterilmiş hâlidir; kontrol hanesi de aynı 1-3 ağırlıklı yöntemle hesaplanır.'],
    ['Yazdığım ISBN bir yere gönderiliyor mu?', 'Hayır. Doğrulama tarayıcınızda yapılır; numara sunucuya iletilmez, saklanmaz ve herhangi bir kitap veritabanına sorgu gönderilmez.'],
  ],
  related: ['ean-barkod-dogrula', 'luhn-kontrol', 'crc32-hesapla', 'ascii-tablosu', 'metin-sha256-hesapla'],
};
