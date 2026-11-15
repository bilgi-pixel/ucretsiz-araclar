export default {
  slug: 'e-posta-ayikla',
  title: 'Metinden E-posta Adresi Ayıklama',
  h1Tail: 'karışık metindeki adresleri listele',
  pageTitle: 'Metinden E-posta Adresi Ayıklama – E-posta Adreslerini Bulma',
  description: 'Karışık bir metnin içindeki e-posta adreslerini bulup temiz bir liste halinde çıkarın. Tekrarları silin, alfabetik ya da alan adına göre sıralayın.',
  card: 'Karışık metnin içindeki e-posta adreslerini bulun; tekrarları silip sıralı, temiz bir liste olarak alın.',
  category: 'metin',
  keywords: ['e-posta ayıklama', 'metinden mail adresi bulma', 'e-posta adresi çıkarma', 'mail ayıklayıcı', 'e-posta listesi temizleme', 'tekrar eden mailleri silme', 'email extractor', 'mail adreslerini ayırma'],
  lead: `İmzalar, yazışmalar, tablolar ya da dışa aktarılmış kayıtlar gibi karışık bir metni yapıştırın; araç içindeki <strong>e-posta adreslerini</strong> bulsun ve yalın bir liste olarak versin. Tekrar eden adresleri çıkarabilir, listeyi sıralayabilir ve istediğiniz ayraçla birleştirebilirsiniz.`,
  button: 'Ayıkla',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'İçinde e-posta adresleri geçen metni buraya yapıştırın' },
    { id: 'tekrar', label: 'Tekrar eden adresler', type: 'select', options: [['sil', 'Sil (her adres bir kez)'], ['koru', 'Koru']] },
    { id: 'sirala', label: 'Sıralama', type: 'select', options: [['sira', 'Metinde geçtiği sırayla'], ['alfabe', 'Alfabetik'], ['alan', 'Alan adına göre']] },
    { id: 'ayrac', label: 'Çıktı biçimi', type: 'select', options: [['satir', 'Her satıra bir adres'], ['virgul', 'Virgülle ayrılmış'], ['noktalivirgul', 'Noktalı virgülle ayrılmış']] },
    { id: 'harf', label: 'Harf düzeni', type: 'select', options: [['kucuk', 'Küçük harfe çevir'], ['ayni', 'Yazıldığı gibi bırak']] },
  ],
  compute(v, h) {
    const ham = String(v.metin ?? '');
    if (ham.trim() === '') h.err('"Metin" alanına içinde e-posta adresi geçen metni yapıştırın.');
    const re = /[A-Za-z0-9_%+-]+(?:\.[A-Za-z0-9_%+-]+)*@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}(?![A-Za-z0-9])/g;
    let bulunan = ham.match(re) || [];
    bulunan = bulunan.filter((a) => a.length <= 254 && a.indexOf('@') <= 64);
    if (!bulunan.length) h.err('Metinde e-posta adresi bulunamadı. Adreslerin ad@alanadi.com biçiminde yazıldığından emin olun.');
    const toplam = bulunan.length;
    if (v.harf !== 'ayni') bulunan = bulunan.map((a) => a.toLowerCase());
    let liste = bulunan;
    if (v.tekrar !== 'koru') {
      const gor = new Set();
      liste = [];
      for (const a of bulunan) { const k = a.toLowerCase(); if (!gor.has(k)) { gor.add(k); liste.push(a); } }
    }
    const alan = (a) => a.slice(a.lastIndexOf('@') + 1).toLowerCase();
    const kars = (x, y) => (x < y ? -1 : x > y ? 1 : 0);
    if (v.sirala === 'alfabe') liste = [...liste].sort((x, y) => kars(x.toLowerCase(), y.toLowerCase()));
    else if (v.sirala === 'alan') liste = [...liste].sort((x, y) => kars(alan(x), alan(y)) || kars(x.toLowerCase(), y.toLowerCase()));
    const alanlar = new Map();
    for (const a of liste) alanlar.set(alan(a), (alanlar.get(alan(a)) || 0) + 1);
    const enCok = [...alanlar.entries()].sort((x, y) => y[1] - x[1] || kars(x[0], y[0]))[0];
    const ayr = v.ayrac === 'virgul' ? ', ' : v.ayrac === 'noktalivirgul' ? '; ' : '\n';
    return {
      rows: [
        ['Listelenen adres', String(liste.length)],
        ['Metinde bulunan toplam adres', String(toplam)],
        ['Çıkarılan tekrar', String(toplam - liste.length)],
        ['Farklı alan adı', String(alanlar.size)],
        ['En çok geçen alan adı', `${enCok[0]} (${enCok[1]} adres)`],
      ],
      text: liste.join(ayr),
      note: 'Adresler yalnızca yazım biçimine göre bulunur; adresin gerçekten var olduğu ya da ileti aldığı denetlenmez.',
    };
  },
  cases: [
    { in: { metin: 'Bilgi için ali@ornek.com adresine ya da Ayse.Kaya@Firma.com.tr adresine yazın.' }, out: { 'Listelenen adres': '2', 'Metinde bulunan toplam adres': '2', 'Çıkarılan tekrar': '0', 'Farklı alan adı': '2' }, text: 'ali@ornek.com\nayse.kaya@firma.com.tr' },
    { in: { metin: 'ali@ornek.com, veli@ornek.com; ALI@ornek.com <destek@site.org>', ayrac: 'noktalivirgul' }, out: { 'Listelenen adres': '3', 'Çıkarılan tekrar': '1', 'Farklı alan adı': '2', 'En çok geçen alan adı': 'ornek.com (2 adres)' }, text: 'ali@ornek.com; veli@ornek.com; destek@site.org' },
    { in: { metin: 'zeynep@b.com\nahmet@c.com\ncan@a.com', sirala: 'alfabe', ayrac: 'virgul' }, text: 'ahmet@c.com, can@a.com, zeynep@b.com' },
    { in: { metin: 'zeynep@b.com\nahmet@c.com\ncan@a.com', sirala: 'alan' }, text: 'can@a.com\nzeynep@b.com\nahmet@c.com' },
    { in: { metin: 'Yazın: info@ornek.com. Ya da (satis+tr@alt.ornek.co.uk)!' }, out: { 'Listelenen adres': '2' }, text: 'info@ornek.com\nsatis+tr@alt.ornek.co.uk' },
    { in: { metin: 'a@b.com a@b.com A@B.com', tekrar: 'koru', harf: 'ayni' }, out: { 'Listelenen adres': '3', 'Çıkarılan tekrar': '0', 'Farklı alan adı': '1' }, text: 'a@b.com\na@b.com\nA@B.com' },
    { in: { metin: 'Bu metinde adres yok, yalnızca @kullanici ve ali@yerel var.' }, error: true },
    { in: { metin: '' }, error: true },
  ],
  howto: [
    `İçinde e-posta adresleri bulunan metni "Metin" kutusuna yapıştırın. Yazışma, imza bloğu, tablo ya da karışık bir döküm olabilir.`,
    `Aynı adresin birden çok kez geçmesi durumunda ne olacağını seçin; varsayılan ayar her adresi bir kez listeler.`,
    `Listenin sırasını belirleyin: metindeki sıra, alfabetik sıra ya da aynı kuruma ait adresleri bir araya getiren alan adı sırası.`,
    `Çıktı biçimini seçin. Alt alta liste hesap tablosuna, virgüllü ya da noktalı virgüllü biçim e-posta programının alıcı alanına uygundur.`,
    `"Ayıkla" düğmesine basın; adresler alttaki kutuda, sayılar üstteki satırlarda görünür.`,
  ],
  sections: [
    { h: 'E-posta ayıklama ne zaman gerekir?', p: [
      `E-posta adresleri nadiren tek başına durur. Bir toplantı davetinin alıcı satırında ad ve soyadlarla iç içe, bir imza bloğunda telefon numaralarının arasında, bir başvuru formunun dökümünde onlarca başka alanın yanında yer alırlar. Bu adresleri tek tek seçip kopyalamak hem zaman alır hem de birini atlamaya ya da yanlışlıkla bir noktayı da kopyalamaya çok açıktır.`,
      `Araç metni baştan sona tarar, adres biçimine uyan bütün parçaları toplar ve çevrelerindeki her şeyi atar. Elinizde adres defterine, hesap tablosuna ya da e-posta programına doğrudan yapıştırabileceğiniz yalın bir liste kalır.`,
    ] },
    { h: 'Bir adres nasıl tanınır?', p: [
      `Her e-posta adresi <strong>@</strong> işaretiyle ayrılan iki bölümden oluşur. Soldaki bölüm kullanıcı adıdır; harf, rakam, nokta, alt çizgi, tire, artı ve yüzde işaretlerinden oluşabilir. Sağdaki bölüm alan adıdır; noktalarla ayrılmış en az iki parçadan oluşur ve son parçası en az iki harfli bir uzantıdır (com, org, net ya da iki parçalı com.tr gibi).`,
      `Araç bu kurala uyan parçaları arar. Adresin başında ya da sonunda duran nokta, virgül, parantez, köşeli parantez, tırnak ve açılı ayraç gibi işaretler adrese dahil edilmez. Cümle sonuna denk gelen bir adreste, örneğin "info@ornek.com." yazımında, sondaki nokta atılır ve adres doğru biçimde alınır. Uzantısı olmayan "ali@yerel" gibi yazımlar ile başında @ bulunan sosyal medya kullanıcı adları adres sayılmaz.`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `Şu metni yapıştırdığınızı düşünün: "ali@ornek.com, veli@ornek.com; ALI@ornek.com" ve ardından açılı ayraç içinde "destek@site.org". Metinde dört adres vardır. Araç hepsini küçük harfe çevirir; üçüncü adres birinciyle aynı hale geldiği için tekrar sayılır ve çıkarılır.`,
      `Sonuçta listelenen adres sayısı 3, metinde bulunan toplam adres 4, çıkarılan tekrar 1 olur. Adresler iki farklı alan adına aittir ve en çok geçen alan adı iki adresle "ornek.com" olarak gösterilir. Çıktı biçimi noktalı virgül seçilmişse sonuç tek satırda <code>ali@ornek.com; veli@ornek.com; destek@site.org</code> biçiminde yazılır.`,
    ] },
    { h: 'Büyük-küçük harf ve tekrarlar', p: [
      `Alan adı bölümünde büyük-küçük harf farkı yoktur; "Firma.com.tr" ile "firma.com.tr" aynı yerdir. Kullanıcı adı bölümü kuramsal olarak harf duyarlı olabilse de uygulamada e-posta sağlayıcılarının neredeyse tamamı ayrım yapmaz. Bu yüzden araç varsayılan olarak adresleri küçük harfe çevirir ve tekrarları buna göre ayıklar. Küçültme işlemi e-posta adreslerine uygun biçimde yapılır: büyük I harfi noktalı i olur, Türkçedeki noktasız ı harfine dönüşmez.`,
      `Adreslerin yazıldığı gibi kalmasını isterseniz "Yazıldığı gibi bırak" seçeneğini kullanın. Bu durumda da tekrar denetimi harf farkı gözetmeden yapılır ve ilk karşılaşılan yazım korunur.`,
    ] },
    { h: 'Sıralama ve çıktı seçenekleri', ul: [
      `<strong>Metinde geçtiği sırayla:</strong> özgün düzeni korur; yazışmadaki sıra önemliyse kullanın.`,
      `<strong>Alfabetik:</strong> adresleri baştan sona harf sırasına dizer; belirli bir adresi gözle aramayı kolaylaştırır.`,
      `<strong>Alan adına göre:</strong> aynı kuruma ya da aynı sağlayıcıya ait adresleri art arda getirir.`,
      `<strong>Her satıra bir adres:</strong> hesap tablosuna yapıştırınca her adres ayrı hücreye düşer.`,
      `<strong>Virgül ya da noktalı virgül:</strong> e-posta programlarının alıcı alanına yapıştırmak içindir; hangisini kabul ettiği programa göre değişir.`,
    ] },
    { h: 'Sorumlu kullanım', p: [
      `Bu araç kendi yazışmalarınızdaki, kendi müşteri kayıtlarınızdaki ya da size iletilen belgelerdeki adresleri düzenlemek için tasarlanmıştır. Bir adresi listeye almış olmanız, o kişiye tanıtım ya da reklam iletisi gönderme hakkı doğurmaz. Ticari elektronik ileti gönderimi birçok ülkede olduğu gibi Türkiye'de de alıcının önceden onayına ve kayıt yükümlülüklerine bağlanmıştır; e-posta adresi aynı zamanda kişisel veri niteliği taşıyabilir. Toplu gönderim yapmadan önce güncel mevzuatı kontrol edin ve gerekiyorsa bir uzmana danışın.`,
    ] },
    { h: 'Sınırlar', p: [
      `Araç adresin yazım biçimine bakar; posta kutusunun gerçekten var olup olmadığını, alan adının kayıtlı olup olmadığını ya da adresin ileti kabul edip etmediğini denetlemez, çünkü bunun için ağ bağlantısı gerekir ve bu sayfa hiçbir veriyi dışarı göndermez. Yazım hatası içeren ama biçimce geçerli bir adres, örneğin uzantısı yanlış yazılmış bir adres, listeye olduğu gibi girer.`,
      `Alan adında Türkçe karakter bulunan adresler ile kullanıcı adı tırnak içinde yazılmış sıra dışı adresler tanınmaz. "ali [at] ornek [nokta] com" gibi bilerek gizlenmiş yazımlar da adres olarak algılanmaz. Bir kelimeye boşluksuz bitişik yazılmış adreslerde bitişik kelime kullanıcı adının parçası sayılabilir; sonuç listesine bir göz atmak her zaman yararlıdır.`,
    ] },
  ],
  faq: [
    [`Araç hangi biçimdeki adresleri bulur?`, `Kullanıcı adı, @ işareti ve en az bir nokta içeren alan adından oluşan standart adresleri bulur: ad@alanadi.com, ad.soyad@firma.com.tr, satis+etiket@alt.alanadi.org gibi.`],
    [`Aynı adres birkaç kez geçiyorsa ne olur?`, `Varsayılan ayarda yalnızca bir kez listelenir ve kaç tekrarın çıkarıldığı gösterilir. Bütün geçişleri görmek isterseniz "Koru" seçeneğini kullanın.`],
    [`Adreslerin geçerli olup olmadığını kontrol ediyor mu?`, `Hayır. Yalnızca yazım biçimine uyan parçaları toplar. Adresin gerçekten var olduğunu ya da ileti aldığını doğrulamaz.`],
    [`Adresleri e-posta programının alıcı alanına nasıl yapıştırırım?`, `Çıktı biçimini virgül ya da noktalı virgül seçin, sonucu kopyalayıp alıcı alanına yapıştırın. Hangi ayracın kabul edildiği kullandığınız programa göre değişir; biri çalışmazsa diğerini deneyin.`],
    [`Adresin sonundaki nokta ya da parantez listeye giriyor mu?`, `Hayır. Cümle sonundaki nokta, virgül, parantez, tırnak ve açılı ayraç gibi çevre işaretleri adresten ayrılır.`],
    [`Kaç adrese kadar ayıklayabilirim?`, `Sabit bir üst sınır yoktur. Binlerce adres içeren uzun metinler de çok kısa sürede taranır; sınırı cihazınızın belleği belirler.`],
    [`Bu listeyle toplu e-posta gönderebilir miyim?`, `Araç yalnızca metinden adres ayıklar. Toplu ya da ticari ileti gönderimi alıcı onayı gibi koşullara bağlıdır; göndermeden önce güncel mevzuatı kontrol etmeniz gerekir.`],
    [`Yapıştırdığım adresler bir yere kaydediliyor mu?`, `Hayır. Tarama tamamen tarayıcınızda yapılır. Metin ve bulunan adresler sunucuya gönderilmez, saklanmaz ve kimseyle paylaşılmaz.`],
  ],
  related: ['url-ayikla', 'sayi-ayikla', 'tekrar-eden-satirlari-sil', 'liste-virgul-donustur', 'sutun-ayikla', 'bul-ve-degistir'],
};
