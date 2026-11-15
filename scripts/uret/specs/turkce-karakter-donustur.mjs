export default {
  slug: 'turkce-karakter-donustur',
  title: 'Türkçe Karakterleri İngilizce Karaktere Çevirme',
  h1Tail: 'ç, ğ, ı, ö, ş, ü → c, g, i, o, s, u',
  pageTitle: 'Türkçe Karakterleri İngilizce Karaktere Çevirme (ç ğ ı ö ş ü)',
  description: 'Metindeki ç, ğ, ı, İ, ö, ş, ü harflerini c, g, i, I, o, s, u karşılıklarına çevirin. Dosya adı, e-posta ve eski sistemler için Türkçe karaktersiz metin üretin.',
  card: 'ç, ğ, ı, İ, ö, ş, ü harflerini İngilizce klavyedeki karşılıklarına çevirip Türkçe karaktersiz metin elde edin.',
  category: 'metin',
  keywords: ['türkçe karakter çevirme', 'türkçe karakterleri ingilizce yapma', 'türkçe karakter temizleme', 'türkçe karaktersiz yazı', 'ş ğ ü çevirici', 'türkçe harfleri latin harfe çevirme', 'ascii çevirme'],
  lead: 'Metninizdeki Türkçeye özgü harfleri en yakın temel Latin karşılıklarına dönüştürün: <strong>ç→c, ğ→g, ı→i, İ→I, ö→o, ş→s, ü→u</strong>. Büyük-küçük harf korunur, diğer bütün karakterler olduğu gibi kalır ve kaç harfin değiştiği gösterilir.',
  button: 'Çevir',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Örn. Şişli\'de güzel bir öğle yemeği', rows: 7 },
    { id: 'kapsam', label: 'Kapsam', type: 'select', options: [['tr', 'Yalnızca Türkçe harfler (ç ğ ı İ ö ş ü ve â î û)'], ['tum', 'Bütün aksanlı Latin harfleri (é, ñ, ß… dahil)']] },
  ],
  compute(v, h) {
    const metin = String(v.metin ?? '');
    if (metin.trim() === '') h.err('Çevrilecek metni yazın.');
    if (metin.length > 2000000) h.err('Metin 2.000.000 karakterden uzun; parçalara bölerek deneyin.');
    const TR = { 'ç': 'c', 'Ç': 'C', 'ğ': 'g', 'Ğ': 'G', 'ı': 'i', 'İ': 'I', 'ö': 'o', 'Ö': 'O', 'ş': 's', 'Ş': 'S', 'ü': 'u', 'Ü': 'U', 'â': 'a', 'Â': 'A', 'î': 'i', 'Î': 'I', 'û': 'u', 'Û': 'U' };
    const EK = { 'ß': 'ss', 'ẞ': 'SS', 'æ': 'ae', 'Æ': 'AE', 'œ': 'oe', 'Œ': 'OE', 'ø': 'o', 'Ø': 'O', 'đ': 'd', 'Đ': 'D', 'ð': 'd', 'Ð': 'D', 'ł': 'l', 'Ł': 'L', 'þ': 'th', 'Þ': 'Th', 'ħ': 'h', 'Ħ': 'H' };
    const tum = v.kapsam === 'tum';
    let sonuc = '', adet = 0;
    // Önce birleşik biçime getir ki "o + ayrı iki nokta" yazımı da tek harf olarak tanınsın
    for (const c of metin.normalize('NFC')) {
      let y = c;
      if (TR[c] !== undefined) y = TR[c];
      else if (tum) {
        if (EK[c] !== undefined) y = EK[c];
        else if (/\p{Script=Latin}/u.test(c)) y = c.normalize('NFD').replace(/\p{M}/gu, '') || c;
      }
      if (y !== c) adet++;
      sonuc += y;
    }
    const asciiDisi = Array.from(sonuc).filter((c) => c.codePointAt(0) > 127).length;
    return {
      rows: [
        ['Değiştirilen harf', h.fmt(adet, 0)],
        ['Toplam karakter', h.fmt(sonuc.length, 0)],
        ['Kalan ASCII dışı karakter', h.fmt(asciiDisi, 0)],
      ],
      text: sonuc,
      note: asciiDisi > 0 ? 'Sonuçta hâlâ temel Latin (ASCII) dışında karakter var: kıvrık tırnak, uzun tire, emoji ya da başka alfabelerin harfleri olabilir.' : undefined,
    };
  },
  cases: [
    { in: { metin: 'Pijamalı hasta yağız şoföre çabucak güvendi' }, text: 'Pijamali hasta yagiz sofore cabucak guvendi', out: { 'Değiştirilen harf': '7', 'Toplam karakter': '43', 'Kalan ASCII dışı karakter': '0' } },
    { in: { metin: 'ŞİŞLİ ÇAĞLAYAN ÜSKÜDAR IĞDIR' }, text: 'SISLI CAGLAYAN USKUDAR IGDIR', out: { 'Değiştirilen harf': '9' } },
    { in: { metin: 'İstanbul\'da çok güzel bir gün' }, text: 'Istanbul\'da cok guzel bir gun', out: { 'Değiştirilen harf': '4' } },
    { in: { metin: 'kâğıt hâlâ' }, text: 'kagit hala', out: { 'Değiştirilen harf': '5' } },
    { in: { metin: 'Hello World 123' }, text: 'Hello World 123', out: { 'Değiştirilen harf': '0' } },
    { in: { metin: 'Café Zürich, señor', kapsam: 'tr' }, text: 'Café Zurich, señor', out: { 'Değiştirilen harf': '1', 'Kalan ASCII dışı karakter': '2' } },
    { in: { metin: 'Café Zürich, señor', kapsam: 'tum' }, text: 'Cafe Zurich, senor', out: { 'Değiştirilen harf': '3', 'Kalan ASCII dışı karakter': '0' } },
    { in: { metin: 'Straße', kapsam: 'tum' }, text: 'Strasse', out: { 'Değiştirilen harf': '1', 'Toplam karakter': '7' } },
    { in: { metin: 'açı\nacı' }, text: 'aci\naci', out: { 'Değiştirilen harf': '3' } },
    { in: { metin: '' }, error: true },
    { in: { metin: '   ' }, error: true },
  ],
  howto: [
    'Türkçe karakterlerden arındırmak istediğiniz metni kutuya yazın ya da yapıştırın.',
    '"Kapsam" seçeneğini belirleyin. Yalnızca Türkçe harfler çevrilsin istiyorsanız ilk seçenekte kalın; metinde é, ñ, ß gibi başka dillerin harfleri de varsa ve onları da sadeleştirmek istiyorsanız ikinci seçeneği kullanın.',
    '"Çevir" düğmesine basın. Dönüştürülmüş metin sonuç kutusunda, değişen harf sayısıyla birlikte görünür.',
    '"Kalan ASCII dışı karakter" satırı 0 değilse metinde hâlâ kıvrık tırnak ya da emoji gibi işaretler vardır; gerekiyorsa bunları ayrıca temizleyin.',
    'Sonucu "Sonucu kopyala" düğmesiyle panoya alın.',
  ],
  sections: [
    { h: 'Hangi harf neye çevrilir?', p: [
      'Türk alfabesindeki 29 harften altısı İngiliz alfabesinde yer almaz: ç, ğ, ı, ö, ş ve ü. Buna büyük noktalı İ de eklenir. Araç bu harfleri, üzerlerindeki ya da altlarındaki işaret kaldırıldığında geriye kalan temel harfle değiştirir ve büyük-küçük harf durumunu korur.',
    ], ul: [
      '<strong>ç → c</strong>, <strong>Ç → C</strong>',
      '<strong>ğ → g</strong>, <strong>Ğ → G</strong>',
      '<strong>ı → i</strong> (noktasız küçük ı, noktalı i olur)',
      '<strong>İ → I</strong> (noktalı büyük İ, noktasız I olur)',
      '<strong>ö → o</strong>, <strong>Ö → O</strong>',
      '<strong>ş → s</strong>, <strong>Ş → S</strong>',
      '<strong>ü → u</strong>, <strong>Ü → U</strong>',
      'Düzeltme (şapka) işaretli harfler: <strong>â → a</strong>, <strong>î → i</strong>, <strong>û → u</strong> ve büyük karşılıkları',
    ] },
    { h: 'Türkçe karaktersiz metin neden gerekir?', p: [
      'Günümüzde yazılımların büyük çoğunluğu Türkçe harfleri sorunsuz işler; yine de bazı alanlar hâlâ yalnızca temel Latin harflerini, yani ASCII karakterlerini kabul eder ya da bunlarla daha güvenilir çalışır.',
    ], ul: [
      '<strong>E-posta adresleri ve kullanıcı adları:</strong> Adın soyadın yazımından adres üretirken "gülşah.öztürk" yerine "gulsah.ozturk" kullanılır.',
      '<strong>Dosya ve klasör adları:</strong> Farklı işletim sistemleri, eski arşiv programları ya da bazı yükleme formları Türkçe harfli dosya adlarını bozabilir.',
      '<strong>Web adresleri:</strong> Sayfa adreslerinde Türkçe harf kullanmak mümkündür, ama paylaşılırken yüzde işaretli uzun kodlara dönüşür; bu yüzden adres metinleri genellikle sadeleştirilir.',
      '<strong>Kısa mesaj:</strong> Türkçe harf içeren SMS\'ler, kullanılan kodlamaya bağlı olarak mesaj başına düşen karakter sayısını azaltabilir ve mesajın birden fazla parçaya bölünmesine yol açabilir.',
      '<strong>Uluslararası formlar:</strong> Uçak bileti, vize başvurusu ya da yurt dışı kargo formlarında ad ve adresin Latin temel harflerle yazılması istenebilir. Böyle durumlarda adınızın pasaportunuzda nasıl yazıldığını esas alın.',
      '<strong>Eski yazılımlar ve cihazlar:</strong> Bazı etiket yazıcıları, POS cihazları, gömülü ekranlar ve eski veritabanları Türkçe harfleri soru işareti ya da anlamsız simgeler olarak gösterir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Türk alfabesinin bütün harflerini içeren bilinen tümce ile deneyelim: <code>Pijamalı hasta yağız şoföre çabucak güvendi</code>. Çevir düğmesine bastığınızda sonuç <code>Pijamali hasta yagiz sofore cabucak guvendi</code> olur. Değiştirilen harf sayısı 7\'dir: "Pijamalı" kelimesindeki ı, "yağız" kelimesindeki ğ ve ı, "şoföre" kelimesindeki ş ve ö, "çabucak" kelimesindeki ç ve "güvendi" kelimesindeki ü. Metnin uzunluğu değişmez, 43 karakter olarak kalır, çünkü her harf tek bir harfle değiştirilir.',
      'Büyük harfli bir örnek: <code>ŞİŞLİ ÇAĞLAYAN ÜSKÜDAR IĞDIR</code> metni <code>SISLI CAGLAYAN USKUDAR IGDIR</code> olur ve 9 harf değişir. "IĞDIR" kelimesindeki noktasız büyük I zaten temel Latin harfi olduğu için değişmez; yalnızca Ğ dönüştürülür.',
    ] },
    { h: 'Anlam kaybına dikkat', p: [
      'Bu dönüşüm tek yönlüdür ve bilgi kaybına yol açar. Türkçede yalnızca bu harflerle birbirinden ayrılan pek çok kelime çifti vardır. Örneğin <code>açı</code> ve <code>acı</code> kelimelerinin ikisi de dönüşümden sonra <code>aci</code> olur. Benzer biçimde "öldü" ile "oldu", "kız" ile "kiz", "yağ" ile "yag", "ün" ile "un" ve "kör" ile "kor" arasındaki fark ortadan kalkar; okuyan kişi anlamı ancak bağlamdan çıkarabilir, bazen yanlış ya da gülünç bir anlam ortaya çıkabilir.',
      'Bu nedenle Türkçe karaktersiz yazımı yalnızca teknik zorunluluk olan yerlerde kullanmak en doğrusudur. Müşteriye gidecek bir duyuru, resmî bir yazı ya da web sitenizin görünen metni için Türkçe harfleri korumak hem okunabilirlik hem de özen açısından daha iyidir.',
      'Sonuçtan özgün metne geri dönmek de mümkün değildir: "i" harfinin aslında ı mı yoksa i mi olduğunu, "o" harfinin ö mü o mu olduğunu araç bilemez. Özgün metninizi ayrıca saklayın.',
    ] },
    { h: 'İki kapsam seçeneği arasındaki fark', p: [
      'İlk seçenek yalnızca Türkçe harfleri ve şapkalı ünlüleri çevirir; metindeki diğer dillerin harflerine dokunmaz. <code>Café Zürich, señor</code> metninde bu seçenekle yalnızca ü değişir ve sonuç <code>Café Zurich, señor</code> olur.',
      'İkinci seçenek Latin alfabesindeki bütün aksanlı harfleri sadeleştirir: é, è, ê harfleri e\'ye; ñ harfi n\'ye; å ve ä harfleri a\'ya dönüşür. Tek harfle karşılanamayan bazı harfler iki harfe açılır: Almanca ß "ss", æ "ae", œ "oe" olur. Aynı örnek bu seçenekle <code>Cafe Zurich, senor</code> biçiminde çıkar. Her iki seçenekte de Kiril, Arap, Yunan gibi başka alfabelerin harflerine, rakamlara, noktalama işaretlerine ve emojilere dokunulmaz.',
    ] },
    { h: 'Bozuk karakter sorunuyla karıştırmayın', p: [
      'Bir metinde "ÅŸ", "Ä±", "Ã¼" gibi anlamsız harf çiftleri ya da soru işaretli kutucuklar görüyorsanız sorun Türkçe harflerin kendisi değil, dosyanın yanlış karakter kodlamasıyla açılmış olmasıdır. Bu araç o tür bozulmuş metni onarmaz; önce dosyayı doğru kodlamayla (çoğunlukla UTF-8) açmanız gerekir. Metin düzgün göründükten sonra buradaki dönüşümü uygulayabilirsiniz.',
    ] },
  ],
  faq: [
    ['Büyük İ harfi neye çevrilir?', 'Noktalı büyük İ, noktasız büyük I harfine çevrilir; yani "İstanbul" kelimesi "Istanbul" olur. Küçük noktasız ı ise noktalı i harfine dönüşür: "ışık" kelimesi "isik" biçiminde yazılır.'],
    ['Dönüşümü geri alabilir miyim?', 'Hayır. İşlem tek yönlüdür; "c" harfinin özgün metinde ç mi yoksa c mi olduğu bilgisi kaybolur. Bu yüzden özgün metni silmeden önce bir kopyasını saklamanız önerilir.'],
    ['Metnin uzunluğu değişir mi?', 'Yalnızca Türkçe harfler kapsamında değişmez; her harf tek bir harfle değiştirilir. Bütün aksanlı harfler kapsamında ß, æ, œ gibi harfler iki harfe açıldığından metin birkaç karakter uzayabilir.'],
    ['Şapkalı harfler (â, î, û) de çevriliyor mu?', 'Evet. "kâğıt" kelimesi "kagit", "hâlâ" kelimesi "hala" olur. Bu örnekte görüldüğü gibi şapkanın kalkması anlamı değiştirebilir; "hâlâ" ile "hala" farklı kelimelerdir.'],
    ['Boşlukları tireye çevirip küçük harfe de dönüştürür mü?', 'Hayır. Bu araç yalnızca harfleri değiştirir; boşluklara, büyük harflere ve noktalama işaretlerine dokunmaz. Web adresi için küçük harfli ve tireli metin gerekiyorsa URL metni oluşturma aracını kullanın.'],
    ['Sonuçta neden hâlâ ASCII dışı karakter görünüyor?', 'Metninizde Türkçe harf dışında kıvrık tırnak, uzun tire, üç nokta karakteri, emoji ya da başka alfabelerin harfleri olabilir. Araç bunları saymakla yetinir, değiştirmez. Aksanlı Latin harfleri için kapsamı genişletebilirsiniz.'],
    ['Bozuk görünen Türkçe karakterleri düzeltir mi?', 'Hayır. "Ä±" ya da "ÅŸ" gibi görünen bozulmalar yanlış kodlamadan kaynaklanır ve ayrı bir onarım gerektirir. Bu araç doğru görünen Türkçe harfleri temel Latin karşılıklarına çevirir.'],
    ['Yazdığım metin bir yere kaydediliyor mu?', 'Hayır. Dönüştürme tarayıcınızın içinde yapılır; metin sunucuya gönderilmez ve saklanmaz. Sayfa bir kez açıldıktan sonra internet bağlantısı olmadan da kullanılabilir.'],
  ],
  related: ['url-metni-olustur', 'buyuk-kucuk-harf-donustur', 'bul-ve-degistir', 'noktalama-temizle', 'emoji-temizle'],
};
