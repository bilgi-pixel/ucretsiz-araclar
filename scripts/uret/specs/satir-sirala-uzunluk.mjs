export default {
  slug: 'satir-sirala-uzunluk',
  title: 'Satırları Uzunluğa Göre Sıralama',
  h1Tail: 'kısadan uzuna, uzundan kısaya',
  pageTitle: 'Satırları Uzunluğa Göre Sıralama – Kısadan Uzuna Liste Dizme',
  description: 'Alt alta yazılmış satırları karakter sayısına göre kısadan uzuna ya da uzundan kısaya sıralayın. Eşit uzunlukta özgün sıra korunur ya da alfabetik dizilir.',
  card: 'Satırları karakter sayısına göre kısadan uzuna ya da uzundan kısaya dizin; en kısa ve en uzun satırı görün.',
  category: 'metin',
  keywords: ['satırları uzunluğa göre sıralama', 'kelimeleri uzunluğa göre sırala', 'kısadan uzuna sıralama', 'liste sıralama', 'karakter sayısına göre sırala', 'satır sıralama aracı', 'uzundan kısaya sıralama'],
  lead: `Her satıra bir öğe gelecek biçimde yazdığınız listeyi <strong>karakter sayısına göre</strong> sıralayın. Kısadan uzuna ya da uzundan kısaya dizebilir, aynı uzunluktaki satırların özgün sırada mı yoksa alfabetik mi duracağını seçebilirsiniz.`,
  button: 'Sırala',
  inputs: [
    { id: 'metin', label: 'Satırlar (her satıra bir öğe)', type: 'textarea', placeholder: 'elma\nkivi\nmuz\nçilek', wide: true },
    { id: 'yon', label: 'Sıralama yönü', type: 'select', options: [['artan', 'Kısadan uzuna'], ['azalan', 'Uzundan kısaya']] },
    { id: 'esit', label: 'Eşit uzunluktaki satırlar', type: 'select', options: [['ozgun', 'Özgün sırayı koru'], ['alfabe', 'Alfabetik diz']] },
    { id: 'bos', label: 'Boş satırlar', type: 'select', options: [['at', 'Çıkar'], ['tut', 'Koru (uzunluğu 0 sayılır)']] },
  ],
  compute(v, h) {
    let satirlar = String(v.metin ?? '').replace(/\r\n?/g, '\n').split('\n').map((s) => s.replace(/\s+$/, ''));
    if (v.bos !== 'tut') satirlar = satirlar.filter((s) => s.trim() !== '');
    else while (satirlar.length && satirlar[satirlar.length - 1] === '') satirlar.pop();
    if (!satirlar.length) h.err('Sıralanacak satırları yazın; her satıra bir öğe gelmeli.');
    if (satirlar.length > 200000) h.err('En fazla 200.000 satır sıralanabilir; listeyi parçalara bölün.');
    const carpan = v.yon === 'azalan' ? -1 : 1;
    const alfabe = v.esit === 'alfabe';
    const kayit = satirlar.map((s, i) => ({ s, i, n: Array.from(s).length }));
    kayit.sort((a, b) => {
      if (a.n !== b.n) return (a.n - b.n) * carpan;
      if (alfabe) { const c = a.s.localeCompare(b.s, 'tr'); if (c) return c; }
      return a.i - b.i;
    });
    let enKisa = Infinity, enUzun = 0, toplam = 0;
    for (const k of kayit) { if (k.n < enKisa) enKisa = k.n; if (k.n > enUzun) enUzun = k.n; toplam += k.n; }
    return {
      rows: [
        ['Satır sayısı', h.fmt(kayit.length, 0)],
        ['En kısa satır', h.fmt(enKisa, 0) + ' karakter'],
        ['En uzun satır', h.fmt(enUzun, 0) + ' karakter'],
        ['Ortalama uzunluk', h.fmt(toplam / kayit.length, 1) + ' karakter'],
      ],
      text: kayit.map((k) => k.s).join('\n'),
      note: 'Uzunluk, boşluk ve noktalama dahil karakter sayısıdır; satır sonundaki boşluklar sayılmaz.',
    };
  },
  cases: [
    { in: { metin: 'elma\nkivi\nmuz\nçilek\nnar', yon: 'artan', esit: 'ozgun' }, out: { 'Satır sayısı': '5', 'En kısa satır': '3 karakter', 'En uzun satır': '5 karakter', 'Ortalama uzunluk': '3,8 karakter' }, text: 'muz\nnar\nelma\nkivi\nçilek' },
    { in: { metin: 'elma\nkivi\nmuz\nçilek\nnar', yon: 'azalan', esit: 'ozgun' }, text: 'çilek\nelma\nkivi\nmuz\nnar' },
    { in: { metin: 'bb\na\n\nccc', bos: 'at' }, out: { 'Satır sayısı': '3' }, text: 'a\nbb\nccc' },
    { in: { metin: 'bb\na\n\nccc', bos: 'tut' }, out: { 'Satır sayısı': '4', 'En kısa satır': '0 karakter' }, text: '\na\nbb\nccc' },
    { in: { metin: 'kedi\nayva\nbal', yon: 'artan', esit: 'alfabe' }, text: 'bal\nayva\nkedi' },
    { in: { metin: 'kedi\nayva\nbal', yon: 'azalan', esit: 'ozgun' }, text: 'kedi\nayva\nbal' },
    { in: { metin: 'abc   \nşğ' }, out: { 'En uzun satır': '3 karakter', 'Ortalama uzunluk': '2,5 karakter' }, text: 'şğ\nabc' },
    { in: { metin: '' }, error: true },
    { in: { metin: '  \n\n ' }, error: true },
  ],
  howto: [
    `Sıralamak istediğiniz listeyi kutucuğa yapıştırın; her öğe ayrı bir satırda olmalıdır.`,
    `"Sıralama yönü" listesinden kısadan uzuna ya da uzundan kısaya dizilimi seçin.`,
    `Aynı uzunluktaki satırların nasıl dizileceğini belirleyin: yazdığınız sırada kalabilir ya da kendi aralarında alfabetik sıralanabilir.`,
    `Listenizde boş satırlar varsa bunların çıkarılmasını ya da korunmasını seçin.`,
    `"Sırala" düğmesine basın; sıralı listeyi kopyalayıp belgenize ya da tablonuza aktarın.`,
  ],
  sections: [
    { h: 'Uzunluğa göre sıralama ne demek?', p: [
      `Alışılmış sıralama alfabetiktir: satırlar ilk harflerine göre dizilir. Uzunluğa göre sıralamada ise satırın içeriği değil, <strong>kaç karakterden oluştuğu</strong> belirleyicidir. "muz" üç, "elma" dört, "çilek" beş karakterdir; kısadan uzuna sıralandığında bu üçü tam bu düzende durur. Harf, rakam, boşluk ve noktalama işaretlerinin her biri bir karakter sayılır. Türkçeye özgü ç, ğ, ı, ö, ş, ü harfleri de birer karakterdir; bayt sayısı değil, görünen karakter sayısı esas alınır.`,
      `Satırın sonunda kalmış görünmez boşluklar hesaba katılmaz ve çıktıdan temizlenir. Bir tablodan ya da e-postadan kopyalanan listelerde bu tür boşluklar sık bulunur ve göze aynı görünen iki satırın farklı uzunlukta çıkmasına yol açar; araç bu sürprizi önler. Satır başındaki ve ortasındaki boşluklar ise içeriğin parçası olduğu için sayılır.`,
    ] },
    { h: 'Eşit uzunluktaki satırlar', p: [
      `Bir listede aynı uzunlukta birçok satır bulunabilir. Bunların kendi aralarındaki sırası için iki seçenek vardır. <strong>Özgün sırayı koru</strong> seçildiğinde sıralama kararlıdır: aynı uzunluktaki satırlar girdide hangi sıradaysa çıktıda da o sırada kalır. Önceden başka bir ölçüte göre dizilmiş bir listeyi (örneğin önem sırası) bozmadan uzunluğa göre gruplamak için bu seçenek uygundur.`,
      `<strong>Alfabetik diz</strong> seçildiğinde eşit uzunluktaki satırlar Türkçe alfabe sırasına göre dizilir; yani ç harfi c'den sonra, ı harfi i'den önce gelir. Bu seçenek, girdi sırasından bağımsız, her zaman aynı sonucu veren düzenli bir liste üretir. Alfabetik dizilim sıralama yönünden etkilenmez: uzundan kısaya sıralamada da eşit uzunluktaki satırlar a'dan z'ye durur.`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `Beş satırlık şu listeyi ele alalım: elma, kivi, muz, çilek, nar. Karakter sayıları sırasıyla 4, 4, 3, 5 ve 3'tür. Kısadan uzuna ve özgün sıra korunarak sıralandığında önce üç karakterliler gelir: listede "muz" "nar"dan önce yazıldığı için bu sıra korunur. Ardından dört karakterliler "elma" ve "kivi", en sonda beş karakterli "çilek" yer alır. Sonuç: <code>muz, nar, elma, kivi, çilek</code>.`,
      `Özet satırlarında satır sayısı 5, en kısa satır 3 karakter, en uzun satır 5 karakter olarak görünür. Toplam karakter 4 + 4 + 3 + 5 + 3 = 19 olduğundan ortalama uzunluk 19 ÷ 5 = 3,8 karakterdir. Aynı listeyi uzundan kısaya sıralarsanız sonuç <code>çilek, elma, kivi, muz, nar</code> olur.`,
    ] },
    { h: 'Hangi işlerde kullanılır?', ul: [
      `<strong>Anahtar kelime listeleri:</strong> Arama motoru çalışmalarında kısa ve genel ifadeleri uzun ve ayrıntılı ifadelerden ayırmak.`,
      `<strong>Başlık ve slogan seçimi:</strong> Bir düzine başlık önerisini uzunluğa göre dizip karakter sınırına uyanları üstte görmek.`,
      `<strong>Kod ve yapılandırma:</strong> İçe aktarma satırlarını, sabit listelerini ya da menü öğelerini görsel olarak düzgün bir merdiven biçiminde dizmek.`,
      `<strong>Veri temizliği:</strong> Bir sütundaki olağan dışı uzun ya da kısa kayıtları (eksik telefon numarası, fazladan yapıştırılmış metin) hemen fark etmek.`,
      `<strong>Dil öğretimi:</strong> Kelime listelerini kısa kelimelerden uzunlara doğru dizerek kademeli çalışma kâğıdı hazırlamak.`,
      `<strong>Tasarım:</strong> Menü, düğme ya da etiket metinlerinden en uzun olanını bulup alanın buna göre yeterli olup olmadığını sınamak.`,
    ] },
    { h: 'Boş satırlar ve özel durumlar', p: [
      `Varsayılan ayarda boş satırlar ve yalnızca boşluktan oluşan satırlar listeden çıkarılır; çoğu durumda istenen budur. "Koru" seçeneğinde boş satırlar uzunluğu sıfır olan öğeler olarak sıralamaya girer ve kısadan uzuna dizilimde en üste toplanır. Metnin en sonundaki boş satırlar her iki durumda da atılır.`,
      `Emoji ve bazı birleşik işaretler birden fazla kod noktasından oluşabilir. Araç uzunluğu kod noktası sayısıyla ölçtüğünden, örneğin bayrak emojileri ya da ten rengi eklenmiş emojiler ekranda tek simge görünse de birden fazla karakter sayılabilir. Düz yazı, sayı ve Türkçe harflerde böyle bir fark oluşmaz.`,
    ] },
    { h: 'İpuçları', p: [
      `Kelimeleri sıralamak istiyorsanız ama kelimeleriniz tek satırda, virgülle ya da boşlukla ayrılmış durumdaysa önce her birini ayrı satıra alın; ardından bu aracı kullanın. Sıralamadan önce yinelenen satırları temizlemek, eşit uzunluktaki öğeler arasında aynı kaydın iki kez görünmesini önler.`,
      `Uzunluğun görsel genişlikle aynı şey olmadığını unutmayın: "iiii" ile "mmmm" dört karakterdir, ama orantılı yazı tiplerinde ikincisi ekranda çok daha geniş yer kaplar. Bir düğmeye ya da tabloya sığıp sığmayacağını kesin olarak görmek için sonucu kullanacağınız yazı tipiyle denemelisiniz.`,
    ] },
  ],
  faq: [
    ['Uzunluk hesaplanırken boşluklar sayılıyor mu?', 'Satırın başındaki ve içindeki boşluklar sayılır, çünkü bunlar içeriğin parçasıdır. Satır sonundaki boşluklar ise sayılmaz ve çıktıdan temizlenir.'],
    ['Türkçe harfler iki karakter mi sayılıyor?', 'Hayır. ç, ğ, ı, İ, ö, ş, ü harflerinin her biri tek karakter olarak sayılır. Hesap bayt üzerinden değil, karakter üzerinden yapılır.'],
    ['Aynı uzunluktaki satırlar hangi sırayla dizilir?', 'Seçiminize bağlıdır. "Özgün sırayı koru" ayarında yazdığınız sıra bozulmaz; "Alfabetik diz" ayarında bu satırlar Türkçe alfabe sırasına göre dizilir.'],
    ['Kelimeleri de bu araçla sıralayabilir miyim?', 'Evet, her kelime ayrı bir satırda olduğu sürece. Kelimeler tek satırda yazılıysa önce her birini alt alta gelecek biçimde ayırmanız gerekir.'],
    ['En fazla kaç satır sıralanabilir?', 'Araç 200.000 satıra kadar çalışır. Daha büyük listelerde tarayıcının belleği zorlanabileceği için listeyi parçalara bölmeniz önerilir.'],
    ['Sayılar büyüklüğe göre mi sıralanır?', 'Hayır. Bu araç yalnızca karakter sayısına bakar: "1000" dört karakter, "99" iki karakterdir. Aynı basamak sayısındaki sayılar kendi aralarında büyüklüğe göre dizilmez.'],
    ['Yinelenen satırlar siliniyor mu?', 'Hayır. Aynı satır listede kaç kez geçiyorsa çıktıda da o kadar yer alır. Yinelenenleri kaldırmak için önce ilgili temizleme aracını kullanabilirsiniz.'],
    ['Listem bir sunucuya yükleniyor mu?', 'Hayır. Sıralama tarayıcınızda yapılır; satırlarınız hiçbir yere gönderilmez ve saklanmaz.'],
  ],
  related: ['alfabetik-sirala', 'satirlari-ters-sirala', 'satirlari-karistir', 'tekrar-eden-satirlari-sil', 'harf-sayisi-kelime', 'satir-sayaci'],
};
