export default {
  slug: 'vigenere-sifreleme',
  title: 'Vigenère Şifreleme',
  h1Tail: 'anahtar kelimeyle şifrele ve çöz',
  pageTitle: 'Vigenère Şifreleme – Anahtar Kelimeyle Şifrele ve Çöz',
  description: 'Vigenère şifresiyle metni anahtar kelime kullanarak şifreleyin ya da çözün. 29 harfli Türk ve 26 harfli İngiliz alfabesi desteklenir; büyük-küçük harf korunur.',
  card: 'Metni bir anahtar kelimeyle Vigenère yöntemine göre şifreleyin ya da çözün; Türkçe 29 harfli ve İngilizce 26 harfli alfabe seçeneğiyle.',
  category: 'metin',
  keywords: ['vigenere şifreleme', 'vigenere şifresi çözme', 'vigenere cipher', 'anahtar kelimeli şifreleme', 'çok alfabeli şifreleme', 'vigenere tablosu', 'türkçe vigenere'],
  lead: 'Metni bir <strong>anahtar kelimeyle</strong> Vigenère yöntemine göre şifreleyin ya da aynı anahtarla çözün. Her harf, anahtarın sıradaki harfinin belirlediği miktarda kaydırılır; böylece aynı harf metnin farklı yerlerinde farklı karşılıklara dönüşür.',
  button: 'Uygula',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Şifrelenecek ya da çözülecek metin', wide: true },
    { id: 'anahtar', label: 'Anahtar kelime', type: 'text', placeholder: 'Örn. KALEM', hint: 'Yalnızca seçilen alfabenin harfleri; boşluklar yok sayılır.' },
    { id: 'islem', label: 'İşlem', type: 'select', options: [['sifrele', 'Şifrele'], ['coz', 'Çöz']] },
    { id: 'alfabe', label: 'Alfabe', type: 'select', options: [['tr', 'Türkçe (29 harf)'], ['en', 'İngilizce (26 harf)']] },
  ],
  compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Şifrelemek ya da çözmek için "Metin" alanına bir yazı yazın.');
    const en = v.alfabe === 'en';
    const BUYUK = en ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ';
    const KUCUK = en ? 'abcdefghijklmnopqrstuvwxyz' : 'abcçdefgğhıijklmnoöprsştuüvyz';
    const n = BUYUK.length;
    const sira = (c) => { const i = BUYUK.indexOf(c); return i >= 0 ? i : KUCUK.indexOf(c); };
    const hamAnahtar = String(v.anahtar ?? '').replace(/\s+/g, '');
    if (hamAnahtar === '') h.err('"Anahtar kelime" alanını doldurun (örn. KALEM).');
    const k = [];
    for (const c of hamAnahtar) {
      const i = sira(c);
      if (i < 0) h.err(`Anahtardaki "${c}" karakteri seçilen alfabede yok. Anahtar yalnızca ${en ? 'A–Z harflerinden' : 'Türk alfabesinin 29 harfinden'} oluşmalı.`);
      k.push(i);
    }
    const yon = v.islem === 'coz' ? -1 : 1;
    let j = 0, cikti = '';
    for (const c of s) {
      let i = BUYUK.indexOf(c);
      if (i >= 0) { cikti += BUYUK[(i + yon * k[j % k.length] + n) % n]; j++; continue; }
      i = KUCUK.indexOf(c);
      if (i >= 0) { cikti += KUCUK[(i + yon * k[j % k.length] + n) % n]; j++; continue; }
      cikti += c;
    }
    if (j === 0) h.err('Metinde seçilen alfabeye ait harf yok; alfabeyi değiştirin ya da metni denetleyin.');
    const anahtarYazi = k.map((i) => BUYUK[i]).join('');
    return {
      rows: [
        ['Anahtar', `${anahtarYazi} (${k.length} harf)`],
        ['Anahtar kaydırmaları', k.join(', ')],
        ['Alfabe', en ? 'İngilizce, 26 harf' : 'Türkçe, 29 harf'],
        ['İşlenen harf', h.fmt(j, 0)],
      ],
      text: cikti,
      note: (k.every((i) => i === 0) ? 'Anahtar yalnızca A harfinden oluştuğu için kaydırma 0\'dır ve metin değişmedi. ' : '') + 'Anahtar yalnızca harflerde ilerler; boşluk, rakam ve noktalama işaretleri değiştirilmez ve anahtar harfi tüketmez.',
    };
  },
  cases: [
    { in: { metin: 'ATTACKATDAWN', anahtar: 'LEMON', islem: 'sifrele', alfabe: 'en' }, out: { 'Anahtar': 'LEMON (5 harf)', 'Anahtar kaydırmaları': '11, 4, 12, 14, 13', 'İşlenen harf': '12' }, text: 'LXFOPVEFRNHR' },
    { in: { metin: 'MERHABA', anahtar: 'KALEM', islem: 'sifrele', alfabe: 'tr' }, out: { 'Anahtar': 'KALEM (5 harf)', 'Anahtar kaydırmaları': '13, 0, 14, 5, 15' }, text: 'ZEELMLA' },
    { in: { metin: 'LXFOPVEFRNHR', anahtar: 'lemon', islem: 'coz', alfabe: 'en' }, text: 'ATTACKATDAWN' },
    { in: { metin: 'ZEELMLA', anahtar: 'KALEM', islem: 'coz', alfabe: 'tr' }, text: 'MERHABA' },
    { in: { metin: 'Attack at dawn!', anahtar: 'LEMON', islem: 'sifrele', alfabe: 'en' }, out: { 'İşlenen harf': '12' }, text: 'Lxfopv ef rnhr!' },
    { in: { metin: 'HELLO', anahtar: 'A', islem: 'sifrele', alfabe: 'en' }, text: 'HELLO' },
    { in: { metin: 'HELLO', anahtar: 'D', islem: 'sifrele', alfabe: 'en' }, text: 'KHOOR' },
    { in: { metin: 'HELLO', anahtar: '', islem: 'sifrele', alfabe: 'en' }, error: true },
    { in: { metin: 'HELLO', anahtar: 'ŞİFRE', islem: 'sifrele', alfabe: 'en' }, error: true },
    { in: { metin: 'MERHABA', anahtar: 'key1', islem: 'sifrele', alfabe: 'tr' }, error: true },
    { in: { metin: '12345', anahtar: 'KALEM', islem: 'sifrele', alfabe: 'tr' }, error: true },
  ],
  howto: [
    'Şifrelenecek ya da çözülecek yazıyı "Metin" kutusuna yazın.',
    '"Anahtar kelime" alanına yalnızca harflerden oluşan bir kelime ya da ifade girin. Anahtar ne kadar uzun ve tahmin edilmesi güç olursa şifre o kadar zor çözülür.',
    '"İşlem" listesinden şifreleme ya da çözme yönünü, "Alfabe" listesinden metnin diline uygun alfabeyi seçin.',
    '"Uygula" düğmesine basın. Sonuç satırlarında anahtarın her harfinin karşılık geldiği kaydırma değerlerini, çıktı kutusunda ise sonucu görürsünüz.',
    'Mesajı çözecek kişiye anahtarı ve kullandığınız alfabeyi ayrı bir yoldan bildirin; ikisi de aynı olmadan doğru metin elde edilemez.',
  ],
  sections: [
    { h: 'Vigenère şifresi nedir?', p: [
      'Vigenère şifresi, tek bir kaydırma yerine bir anahtar kelimenin harflerinden türetilen kaydırma dizisini kullanan <strong>çok alfabeli</strong> bir yerine koyma şifresidir. Yöntem 16. yüzyılda İtalyan Giovan Battista Bellaso tarafından tanımlanmış, sonradan Fransız diplomat Blaise de Vigenère\'in adıyla anılır olmuştur. Yüzyıllar boyunca kırılamaz sayılmış, 19. yüzyılda anahtar uzunluğunu şifreli metindeki tekrarlardan bulmaya dayanan yöntemlerin geliştirilmesiyle bu ününü yitirmiştir.',
      'Sezar şifresinde metindeki her "A" aynı harfe dönüşür; bu yüzden harf sıklıkları şifreli metinde de korunur ve şifre kolayca çözülür. Vigenère şifresinde ise aynı harf, anahtarın hangi harfine denk geldiğine göre farklı karşılıklar alır. Sıklık dağılımı düzleşir ve basit sayma yöntemi işe yaramaz.',
    ] },
    { h: 'Nasıl çalışır?', p: [
      'Alfabedeki harfler 0\'dan başlayarak numaralandırılır. Anahtar kelime, metnin altına tekrar tekrar yazılır. Her metin harfinin sırasına, altına denk gelen anahtar harfinin sırası eklenir ve sonuç alfabedeki harf sayısına göre indirgenir: <strong>Ş = (M + A) mod n</strong>. Çözmede anahtar harfinin sırası çıkarılır: <strong>M = (Ş − A) mod n</strong>. İngiliz alfabesinde n = 26, Türk alfabesinde n = 29\'dur.',
      'Anahtardaki "A" harfi 0 kaydırma demektir ve o konumdaki harfi değiştirmez. Tek harfli bir anahtar şifreyi Sezar şifresine indirger: anahtar "D" ise her harf 3 kaydırılır. Araç, anahtarın her harfine karşılık gelen kaydırma değerini "Anahtar kaydırmaları" satırında gösterir; böylece işlemi elle de izleyebilirsiniz.',
    ] },
    { h: 'Çözümlü örnek: ATTACKATDAWN ve LEMON', p: [
      'Ders kitaplarının klasik örneğinde açık metin "ATTACKATDAWN", anahtar "LEMON"dur. Anahtar, metin boyunca "LEMONLEMONLE" biçiminde yinelenir. İngiliz alfabesinde L = 11, E = 4, M = 12, O = 14, N = 13\'tür.',
    ], ul: [
      'A (0) + L (11) = 11 → <strong>L</strong>',
      'T (19) + E (4) = 23 → <strong>X</strong>',
      'T (19) + M (12) = 31, 31 − 26 = 5 → <strong>F</strong>',
      'A (0) + O (14) = 14 → <strong>O</strong>',
      'C (2) + N (13) = 15 → <strong>P</strong>',
      'K (10) + L (11) = 21 → <strong>V</strong>',
    ] },
    { h: 'Örneğin devamı ve Türk alfabesiyle uygulama', p: [
      'Kalan harfler aynı yolla işlendiğinde şifreli metin <strong>LXFOPVEFRNHR</strong> olur. Açık metindeki ilk iki "T" harfinin biri X\'e, diğeri F\'ye dönüşmüştür; çok alfabeli şifrenin gücü tam olarak budur.',
      'Türk alfabesinde harf sıraları farklıdır: A 0, B 1, C 2, Ç 3, D 4, E 5 diye ilerler ve Z 28\'dir. "MERHABA" kelimesini "KALEM" anahtarıyla şifreleyelim. Anahtar kaydırmaları K = 13, A = 0, L = 14, E = 5, M = 15\'tir. M (15) + 13 = 28 → Z; E (5) + 0 = 5 → E; R (20) + 14 = 34, 34 − 29 = 5 → E; H (9) + 5 = 14 → L; A (0) + 15 = 15 → M. Anahtar başa döner: B (1) + 13 = 14 → L; A (0) + 0 = 0 → A. Sonuç <strong>ZEELMLA</strong> olur.',
    ] },
    { h: 'Boşluklar, noktalama ve büyük-küçük harf', p: [
      'Araç yalnızca seçilen alfabenin harflerini şifreler. Boşluklar, rakamlar, noktalama işaretleri ve diğer alfabenin harfleri olduğu gibi bırakılır ve bu karakterler anahtardan harf tüketmez. Bu, en yaygın uygulamadır: "Attack at dawn!" metni "LEMON" anahtarıyla "Lxfopv ef rnhr!" olur ve harfler boşluksuz yazıldığındaki sonuçla birebir örtüşür. Büyük harf büyük, küçük harf küçük kalır.',
      'Başka bir araçla ya da elle üretilmiş şifreli metin beklediğiniz gibi çözülmüyorsa önce bu iki noktayı denetleyin: karşı taraf boşluklarda anahtarı ilerletmiş olabilir ya da farklı bir alfabe kullanmış olabilir. Türkçe metinlerde 26 harfli alfabeyle şifrelenmiş bir mesajda ç, ğ, ı, ö, ş, ü harfleri değişmeden kalır.',
    ] },
    { h: 'Güvenlik uyarısı', p: [
      'Vigenère şifresi tarihsel ve eğitsel bir yöntemdir; günümüzde gizlilik sağlamaz. Kısa ya da sözlükte bulunan bir anahtar, şifreli metindeki tekrarlar incelenerek ve her anahtar konumuna ayrı ayrı sıklık çözümlemesi uygulanarak bulunabilir; bilgisayarla bu iş çok kısa sürer. Parola, kimlik bilgisi, mali veri ya da özel yazışma gibi korunması gereken içerikleri bu yöntemle saklamayın. Gerçek gizlilik gerektiren işlerde güncel ve denetlenmiş şifreleme yazılımları kullanılmalıdır.',
      'Yöntemin uygun olduğu yerler kriptografi dersleri, programlama alıştırmaları, bulmacalar, kaçış oyunları ve hazine avı etkinlikleridir.',
    ] },
  ],
  faq: [
    ['Vigenère şifresini çözmek için ne gerekir?', 'Şifrelemede kullanılan anahtar kelime ve alfabe gerekir. Şifreli metni kutuya yapıştırın, aynı anahtarı yazın, "Çöz" işlemini ve doğru alfabeyi seçin.'],
    ['Anahtar kelime metinden kısaysa ne olur?', 'Anahtar, metnin sonuna kadar baştan yinelenir. Beş harfli bir anahtarla on iki harfli bir metin şifrelenirken anahtar iki kez tam, bir kez de ilk iki harfiyle kullanılır.'],
    ['Anahtarda rakam ya da Türkçe karakter kullanabilir miyim?', 'Anahtar yalnızca seçilen alfabenin harflerinden oluşabilir. Türkçe alfabede ç, ğ, ı, ö, ş, ü kullanılabilir; İngilizce alfabede bu harfler ve her iki alfabede rakamlar hata verir. Boşluklar yok sayılır.'],
    ['Anahtarın büyük ya da küçük harfle yazılması sonucu değiştirir mi?', 'Hayır. Anahtarda yalnızca harfin alfabedeki sırası önemlidir; "lemon" ile "LEMON" aynı sonucu verir.'],
    ['Vigenère şifresi Sezar şifresinden neden daha güçlüdür?', 'Sezar şifresinde tek bir kaydırma vardır ve en fazla alfabedeki harf sayısı kadar deneme yeterlidir. Vigenère şifresinde kaydırma her konumda değişir, aynı harf farklı karşılıklara gider ve harf sıklıkları gizlenir.'],
    ['Aynı metni iki kez şifrelersem ne olur?', 'İkinci şifreleme, iki anahtarın harf harf toplamına eşit yeni bir anahtarla tek seferde şifrelemekle aynıdır. Çözmek için metni iki anahtarla da çözme işleminden geçirmeniz gerekir; sıra sonucu değiştirmez.'],
    ['Başka bir araçla şifrelenen metin burada neden farklı çıkıyor?', 'En sık görülen nedenler alfabe farkı (26 yerine 29 harf), boşluk ve noktalama işaretlerinde anahtarın ilerletilmesi ya da anahtarın yanlış yazılmasıdır. Önce bu üç noktayı denetleyin.'],
    ['Metnim ve anahtarım bir yere gönderiliyor mu?', 'Hayır. İşlem tümüyle tarayıcınızda yapılır; ne metin ne de anahtar sunucuya iletilir ya da saklanır.'],
  ],
  related: ['sezar-sifreleme', 'rot13-cevir', 'atbash-sifreleme', 'harf-frekansi', 'turkce-alfabe-sirasi'],
};
