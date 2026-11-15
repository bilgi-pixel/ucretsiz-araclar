export default {
  slug: 'sezar-sifreleme',
  title: 'Sezar Şifreleme',
  h1Tail: 'şifrele, çöz, tüm kaydırmaları dene',
  pageTitle: 'Sezar Şifreleme – Türkçe ve İngilizce Alfabeyle Şifrele ve Çöz',
  description: 'Sezar şifresiyle metni şifreleyin ya da çözün. 29 harfli Türk ve 26 harfli İngiliz alfabesi, istediğiniz kaydırma değeri ve tüm kaydırmaları deneme seçeneği.',
  card: 'Metni Sezar şifresiyle şifreleyin ya da çözün; Türkçe 29 harfli alfabe desteği ve anahtarı bilinmeyen metin için tüm kaydırmaları deneme.',
  category: 'metin',
  keywords: ['sezar şifreleme', 'sezar şifresi çözme', 'caesar cipher', 'kaydırma şifresi', 'türkçe sezar şifresi', 'şifreli metin çözme', 'harf kaydırma şifreleme', 'sezar şifresi örnek'],
  lead: 'Metindeki her harfi alfabede belirlediğiniz sayı kadar kaydırarak <strong>Sezar şifresiyle</strong> şifreleyin ya da şifreli metni çözün. Araç 29 harfli Türk alfabesini ve 26 harfli İngiliz alfabesini destekler; anahtarı bilmiyorsanız bütün kaydırmaları tek listede gösterir.',
  button: 'Uygula',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Şifrelenecek ya da çözülecek metin', wide: true },
    { id: 'kaydirma', label: 'Kaydırma (anahtar)', type: 'number', value: '3', hint: 'Tam sayı. "Tüm kaydırmaları dene" seçiliyken kullanılmaz.' },
    { id: 'islem', label: 'İşlem', type: 'select', options: [['sifrele', 'Şifrele (ileri kaydır)'], ['coz', 'Çöz (geri kaydır)'], ['tum', 'Tüm kaydırmaları dene']] },
    { id: 'alfabe', label: 'Alfabe', type: 'select', options: [['tr', 'Türkçe (29 harf)'], ['en', 'İngilizce (26 harf)']] },
  ],
  compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Şifrelemek ya da çözmek için "Metin" alanına bir yazı yazın.');
    const en = v.alfabe === 'en';
    const BUYUK = en ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ';
    const KUCUK = en ? 'abcdefghijklmnopqrstuvwxyz' : 'abcçdefgğhıijklmnoöprsştuüvyz';
    const n = BUYUK.length;
    const kaydir = (t, d) => {
      let o = '', say = 0;
      for (const c of t) {
        let i = BUYUK.indexOf(c);
        if (i >= 0) { o += BUYUK[(((i + d) % n) + n) % n]; say++; continue; }
        i = KUCUK.indexOf(c);
        if (i >= 0) { o += KUCUK[(((i + d) % n) + n) % n]; say++; continue; }
        o += c;
      }
      return [o, say];
    };
    const alfabeAdi = en ? 'İngilizce, 26 harf' : 'Türkçe, 29 harf';
    if (v.islem === 'tum') {
      const [, say] = kaydir(s, 0);
      if (say === 0) h.err('Metinde seçilen alfabeye ait harf yok; alfabeyi değiştirin ya da metni denetleyin.');
      const tek = s.replace(/\n+/g, ' ');
      const satirlar = [];
      for (let k = 1; k < n; k++) satirlar.push(`${String(k).padStart(2, ' ')}: ${kaydir(tek, -k)[0]}`);
      return {
        rows: [
          ['Denenen kaydırma', `${n - 1} farklı anahtar`],
          ['Alfabe', alfabeAdi],
          ['Kaydırılan harf', h.fmt(say, 0)],
        ],
        text: satirlar.join('\n'),
        note: 'Her satır, metnin o anahtarla şifrelendiği varsayılarak çözülmüş hâlidir. Anlamlı okunan satırın numarası aranan anahtardır.',
      };
    }
    const k = h.int(v.kaydirma, 'Kaydırma (anahtar)');
    const etkin = ((k % n) + n) % n;
    const coz = v.islem === 'coz';
    const [cikti, say] = kaydir(s, coz ? -etkin : etkin);
    return {
      rows: [
        ['Etkin kaydırma', `${etkin} harf ${coz ? 'geri' : 'ileri'}`],
        ['Alfabe', alfabeAdi],
        ['Kaydırılan harf', h.fmt(say, 0)],
      ],
      text: cikti,
      note: etkin === 0 ? 'Etkin kaydırma 0 olduğu için metin değişmedi; alfabedeki harf sayısının katı olmayan bir anahtar seçin.' : 'Alfabede bulunmayan harfler, rakamlar, boşluklar ve noktalama işaretleri olduğu gibi bırakılır.',
    };
  },
  cases: [
    { in: { metin: 'HELLO', kaydirma: '3', islem: 'sifrele', alfabe: 'en' }, out: { 'Etkin kaydırma': '3 harf ileri', 'Kaydırılan harf': '5' }, text: 'KHOOR' },
    { in: { metin: 'MERHABA', kaydirma: '3', islem: 'sifrele', alfabe: 'tr' }, out: { 'Etkin kaydırma': '3 harf ileri', 'Alfabe': 'Türkçe, 29 harf' }, text: 'ÖĞTJÇDÇ' },
    { in: { metin: 'Khoor, Zruog!', kaydirma: '3', islem: 'coz', alfabe: 'en' }, out: { 'Kaydırılan harf': '10' }, text: 'Hello, World!' },
    { in: { metin: 'ÖĞTJÇDÇ', kaydirma: '3', islem: 'coz', alfabe: 'tr' }, text: 'MERHABA' },
    { in: { metin: 'abc', kaydirma: '29', islem: 'sifrele', alfabe: 'en' }, out: { 'Etkin kaydırma': '3 harf ileri' }, text: 'def' },
    { in: { metin: 'DEF', kaydirma: '-3', islem: 'sifrele', alfabe: 'en' }, out: { 'Etkin kaydırma': '23 harf ileri' }, text: 'ABC' },
    { in: { metin: 'Zil 7', kaydirma: '1', islem: 'sifrele', alfabe: 'tr' }, text: 'Ajm 7' },
    { in: { metin: 'KHOOR', kaydirma: '', islem: 'tum', alfabe: 'en' }, out: { 'Denenen kaydırma': '25 farklı anahtar' }, textMatch: '^ 1: JGNNQ\\n 2: IFMMP\\n 3: HELLO\\n' },
    { in: { metin: 'HELLO', kaydirma: 'üç', islem: 'sifrele', alfabe: 'en' }, error: true },
    { in: { metin: '', kaydirma: '3', islem: 'sifrele', alfabe: 'tr' }, error: true },
    { in: { metin: 'HELLO', kaydirma: '2,5', islem: 'sifrele', alfabe: 'en' }, error: true },
  ],
  howto: [
    'Şifrelemek ya da çözmek istediğiniz yazıyı "Metin" kutusuna yazın veya yapıştırın.',
    '"Kaydırma" alanına anahtar sayısını girin. Klasik Sezar şifresinde bu değer 3\'tür; negatif sayı ters yöne kaydırır.',
    '"İşlem" listesinden şifreleme, çözme ya da anahtarı bilinmeyen metinler için "Tüm kaydırmaları dene" seçeneğini belirleyin.',
    'Metnin diline uygun alfabeyi seçin: ç, ğ, ı, ö, ş, ü içeren yazılar için Türkçe, yalnızca Latin temel harfleri için İngilizce.',
    '"Uygula" düğmesine basın ve çıktı kutusundaki sonucu kopyalayın. Karşı tarafın aynı alfabeyi ve aynı anahtarı kullanması gerekir.',
  ],
  sections: [
    { h: 'Sezar şifresi nedir?', p: [
      'Sezar şifresi, bilinen en eski ve en basit şifreleme yöntemlerinden biridir. Adını, Romalı tarihçilerin aktardığına göre özel yazışmalarında harfleri üç sıra kaydırarak yazan Julius Caesar\'dan alır. Yöntemde açık metindeki her harf, alfabede kendisinden belirli sayıda sonra gelen harfle değiştirilir. Alfabenin sonuna gelindiğinde baştan devam edilir; bu yüzden işlem bir çember üzerinde dönmeye benzer.',
      'Bu tür şifrelere <em>kaydırma şifresi</em> ya da tek alfabeli yerine koyma şifresi denir. Kaydırma miktarı şifrenin anahtarıdır: gönderen ve alıcı aynı sayıyı bilirse mesaj kolayca şifrelenir ve çözülür. Günümüzde güvenlik sağlamaz, ancak kriptografinin temel kavramlarını, yani açık metin, şifreli metin, anahtar ve modüler aritmetiği öğretmek için hâlâ ilk başvurulan örnektir.',
    ] },
    { h: 'Formül ve modüler aritmetik', p: [
      'Alfabedeki harfler 0\'dan başlayarak numaralandırılır. Harf sayısı <em>n</em>, kaydırma <em>k</em> ve harfin sırası <em>x</em> ise şifreleme <strong>Ş(x) = (x + k) mod n</strong>, çözme <strong>Ç(x) = (x − k) mod n</strong> işlemidir. İngiliz alfabesinde n = 26, Türk alfabesinde n = 29\'dur. Kaydırma değeri n\'den büyükse ya da negatifse araç bunu 0 ile n − 1 arasındaki eş değerine indirger ve "Etkin kaydırma" satırında gösterir. Örneğin 26 harfli alfabede 29 kaydırma 3 ile, −3 kaydırma 23 ile aynı sonucu verir.',
      'Büyük harf büyük, küçük harf küçük kalır. Seçilen alfabede yer almayan karakterler, yani rakamlar, boşluklar, noktalama işaretleri ve diğer alfabenin harfleri değiştirilmez. Türkçe alfabe seçiliyken q, w ve x; İngilizce alfabe seçiliyken ç, ğ, ı, İ, ö, ş ve ü oldukları gibi bırakılır.',
    ] },
    { h: 'Çözümlü örnek: Türk alfabesiyle MERHABA', p: [
      'Türk alfabesi sırasıyla A, B, C, Ç, D, E, F, G, Ğ, H, I, İ, J, K, L, M, N, O, Ö, P, R, S, Ş, T, U, Ü, V, Y, Z harflerinden oluşur; A\'nın sırası 0, Z\'nin sırası 28\'dir. "MERHABA" kelimesini 3 kaydırmayla şifreleyelim.',
    ], ul: [
      'M (15) → 18 → <strong>Ö</strong>',
      'E (5) → 8 → <strong>Ğ</strong>',
      'R (20) → 23 → <strong>T</strong>',
      'H (9) → 12 → <strong>J</strong>',
      'A (0) → 3 → <strong>Ç</strong>',
      'B (1) → 4 → <strong>D</strong>',
      'A (0) → 3 → <strong>Ç</strong>',
    ] },
    { h: 'İngiliz alfabesiyle örnek ve alfabe seçiminin önemi', p: [
      'Yukarıdaki işlemin sonucu <strong>ÖĞTJÇDÇ</strong> olur. Aynı kaydırmayla İngiliz alfabesinde "HELLO" kelimesi "KHOOR" biçimine dönüşür: H → K, E → H, L → O, L → O, O → R. Çözme işleminde harfler üç sıra geri alınır ve özgün metne ulaşılır.',
      'Alfabe seçimi sonucu doğrudan değiştirir. Türk alfabesinde C\'den sonra Ç, G\'den sonra Ğ geldiği için aynı harf aynı anahtarla farklı bir karşılığa gider: 3 kaydırmada "A" harfi İngiliz alfabesinde D, Türk alfabesinde Ç olur. Bu yüzden şifreleyen ve çözen tarafın yalnızca anahtarda değil, alfabede de anlaşmış olması gerekir. Bir bulmaca ya da ödev İngilizce kaynaklıysa 26 harfli, Türkçe kaynaklıysa çoğunlukla 29 harfli alfabe kullanılmıştır.',
    ] },
    { h: 'Anahtarı bilinmeyen metni çözmek', p: [
      'Sezar şifresinin anahtar uzayı çok küçüktür: 26 harfli alfabede yalnızca 25, 29 harfli alfabede 28 anlamlı kaydırma vardır. "Tüm kaydırmaları dene" seçeneği şifreli metni olası her anahtarla çözer ve sonuçları numaralı satırlar hâlinde listeler. Listeyi gözle taradığınızda anlamlı okunan tek satır hemen fark edilir; satırın başındaki sayı metnin şifrelenmesinde kullanılan anahtardır. Örneğin "KHOOR" girildiğinde 3 numaralı satırda "HELLO" görünür.',
      'Uzun metinlerde harf sıklığı da ipucu verir: Türkçede en sık görülen harfler a, e, i ve n\'dir. Şifreli metinde en çok tekrarlanan harfin bunlardan birine karşılık geldiğini varsaymak, anahtarı denemeden bulmanın klasik yoludur.',
    ] },
    { h: 'Güvenlik uyarısı ve kullanım alanları', p: [
      'Sezar şifresi gerçek bir gizlilik sağlamaz; birkaç saniyelik denemeyle kırılır. Parola, kimlik bilgisi, banka verisi ya da kişisel yazışma gibi korunması gereken hiçbir bilgiyi bu yöntemle saklamayın. Gerçek gizlilik gerektiren işlerde güncel ve denetlenmiş şifreleme araçları kullanılmalıdır.',
      'Yöntemin yeri eğitim ve eğlencedir: matematik ve bilişim derslerinde modüler aritmetik örneği, programlama alıştırması, izcilik ve kaçış oyunu bulmacaları, hazine avı ipuçları ya da çocuklarla gizli mesaj oyunları için uygundur. Kaydırma değeri 13 olan özel durum ROT13 adıyla bilinir ve İngiliz alfabesinde aynı işlem hem şifreler hem çözer.',
    ] },
  ],
  faq: [
    ['Sezar şifresinde anahtar neden çoğunlukla 3\'tür?', 'Antik kaynaklara göre Julius Caesar yazışmalarında harfleri üç sıra kaydırıyordu; klasik örnek bu yüzden 3\'tür. Yöntem herhangi bir tam sayıyla çalışır, yeter ki iki taraf aynı sayıyı kullansın.'],
    ['Türkçe karakterler şifrelenirken ne olur?', 'Türkçe alfabe seçiliyse ç, ğ, ı, i, ö, ş, ü dahil 29 harfin tamamı kaydırılır. İngilizce alfabe seçiliyse bu harfler alfabede bulunmadığından değiştirilmeden bırakılır.'],
    ['Şifreli metni çözmek için ne bilmem gerekir?', 'Kaydırma değerini ve hangi alfabenin kullanıldığını bilmeniz yeterlidir. İkisini de bilmiyorsanız "Tüm kaydırmaları dene" seçeneğini her iki alfabeyle sırayla çalıştırıp anlamlı satırı arayın.'],
    ['Negatif ya da çok büyük kaydırma girebilir miyim?', 'Evet. Araç değeri alfabedeki harf sayısına göre indirger. 26 harfli alfabede −1 kaydırma 25 ile, 55 kaydırma 3 ile aynıdır; etkin değer sonuç satırında gösterilir.'],
    ['Kaydırma 0 ya da alfabenin harf sayısı kadar olursa ne olur?', 'Her harf kendisine denk gelir ve metin değişmez. Araç bu durumda sonuç notunda sizi uyarır.'],
    ['Rakamlar ve noktalama işaretleri de şifreleniyor mu?', 'Hayır. Yalnızca seçilen alfabenin harfleri kaydırılır; rakamlar, boşluklar ve noktalama işaretleri yerinde kalır. Bu, kelime sınırlarını ele verdiği için şifreyi daha da zayıflatır.'],
    ['Sezar şifresi ile Vigenère şifresi arasındaki fark nedir?', 'Sezar şifresinde bütün harfler aynı miktarda kaydırılır. Vigenère şifresinde kaydırma miktarı bir anahtar kelimenin harflerine göre her konumda değişir; bu yüzden basit sıklık çözümlemesine karşı daha dayanıklıdır.'],
    ['Yazdığım mesaj bir sunucuya gidiyor mu?', 'Hayır. Şifreleme ve çözme tarayıcınızda yapılır; metin ve anahtar hiçbir yere gönderilmez, kaydedilmez.'],
  ],
  related: ['rot13-cevir', 'vigenere-sifreleme', 'atbash-sifreleme', 'harf-frekansi', 'metni-ters-cevir', 'turkce-alfabe-sirasi'],
};
