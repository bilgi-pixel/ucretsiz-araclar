export default {
  slug: 'karakter-sayaci',
  title: 'Karakter Sayacı',
  h1Tail: 'boşluklu ve boşluksuz',
  pageTitle: 'Karakter Sayacı – Boşluklu ve Boşluksuz Karakter Sayma',
  description: 'Metninizdeki karakter sayısını boşluklu ve boşluksuz olarak anında öğrenin. Harf, rakam, boşluk, noktalama, kelime, satır ve UTF-8 bayt sayısı da gösterilir.',
  card: 'Metnin boşluklu ve boşluksuz karakter sayısını; harf, rakam, noktalama, kelime, satır ve bayt sayısıyla birlikte görün.',
  category: 'metin',
  keywords: ['karakter sayacı', 'karakter sayma', 'boşluksuz karakter sayısı', 'harf sayacı', 'metin karakter sayısı', 'kaç karakter', 'karakter sayısı hesaplama', 'bayt sayısı'],
  lead: 'Metninizi kutuya yapıştırın; <strong>boşluklu ve boşluksuz karakter sayısını</strong>, harf, rakam, boşluk ve noktalama dağılımını, kelime ve satır sayısını ve metnin UTF-8 kodlamasında kaç bayt tuttuğunu tek seferde görün.',
  button: 'Say',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Saymak istediğiniz metni buraya yazın ya da yapıştırın' },
  ],
  compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s === '') h.err('Saymak için "Metin" alanına bir şeyler yazın ya da yapıştırın.');
    const ch = Array.from(s);
    let harf = 0, rakam = 0, bosluk = 0, satirSonu = 0, diger = 0;
    for (const c of ch) {
      if (c === '\n') satirSonu++;
      else if (/\s/u.test(c)) bosluk++;
      else if (/\p{L}/u.test(c)) harf++;
      else if (/\p{Nd}/u.test(c)) rakam++;
      else diger++;
    }
    const isaret = 0;
    const kelime = s.split(/\s+/u).filter((w) => /[\p{L}\p{Nd}]/u.test(w)).length;
    const bayt = new TextEncoder().encode(s).length;
    const n = (x) => h.fmt(x, 0);
    return {
      rows: [
        ['Karakter (boşluklu)', n(ch.length)],
        ['Karakter (boşluksuz)', n(ch.length - bosluk - satirSonu)],
        ['Harf', n(harf)],
        ['Rakam', n(rakam)],
        ['Boşluk', n(bosluk)],
        ['Noktalama ve simge', n(diger + isaret)],
        ['Kelime', n(kelime)],
        ['Satır', n(satirSonu + 1)],
        ['Boyut (UTF-8)', n(bayt) + ' bayt'],
      ],
      note: 'Boşluklu sayıma boşluklar, sekmeler ve satır sonları dahildir; her satır sonu tek karakter sayılır. Boşluksuz sayımda bunların tamamı çıkarılır.',
    };
  },
  cases: [
    { in: { metin: 'Merhaba dünya' }, out: { 'Karakter (boşluklu)': '13', 'Karakter (boşluksuz)': '12', 'Harf': '12', 'Rakam': '0', 'Boşluk': '1', 'Kelime': '2', 'Satır': '1', 'Boyut (UTF-8)': '14 bayt' } },
    { in: { metin: 'Türkiye 2026!' }, out: { 'Karakter (boşluklu)': '13', 'Karakter (boşluksuz)': '12', 'Harf': '7', 'Rakam': '4', 'Noktalama ve simge': '1', 'Kelime': '2', 'Boyut (UTF-8)': '14 bayt' } },
    { in: { metin: 'İstanbul, Ankara ve İzmir.' }, out: { 'Karakter (boşluklu)': '26', 'Karakter (boşluksuz)': '23', 'Harf': '21', 'Noktalama ve simge': '2', 'Kelime': '4', 'Boyut (UTF-8)': '28 bayt' } },
    { in: { metin: 'a\nb\nc' }, out: { 'Karakter (boşluklu)': '5', 'Karakter (boşluksuz)': '3', 'Satır': '3', 'Kelime': '3', 'Boşluk': '0' } },
    { in: { metin: '12345' }, out: { 'Karakter (boşluklu)': '5', 'Harf': '0', 'Rakam': '5', 'Kelime': '1' } },
    { in: { metin: '  iki  boşluk  ' }, out: { 'Karakter (boşluklu)': '15', 'Karakter (boşluksuz)': '9', 'Boşluk': '6', 'Kelime': '2' } },
    { in: { metin: 'ğüşiöç' }, out: { 'Karakter (boşluklu)': '6', 'Harf': '6', 'Boyut (UTF-8)': '11 bayt' } },
    { in: { metin: '' }, error: true },
  ],
  howto: [
    'Saymak istediğiniz metni "Metin" kutusuna yazın ya da başka bir yerden kopyalayıp yapıştırın.',
    '"Say" düğmesine basın. Boşluklu ve boşluksuz karakter sayısı en üstte, ayrıntılı dağılım altında görünür.',
    'Bir karakter sınırına uymaya çalışıyorsanız metni kısaltıp yeniden sayın; hangi türden karakterin ne kadar yer tuttuğunu dağılımdan izleyin.',
    'Gerekirse "Sonucu kopyala" düğmesiyle sayım sonuçlarını panoya alıp raporunuza ya da mesajınıza ekleyin.',
  ],
  sections: [
    { h: 'Karakter nedir, neler sayılır?', p: [
      'Karakter, bir metni oluşturan en küçük yazı birimidir. Harfler, rakamlar, noktalama işaretleri, simgeler ve gözle görülmeyen boşluklar birer karakterdir. "Merhaba dünya" ifadesinde 12 harf ve bir boşluk vardır; boşluklu sayım 13, boşluksuz sayım 12 karakter eder.',
      'Bu araç her satırı şöyle hesaplar: <strong>Harf</strong> satırı Türkçeye özgü ç, ğ, ı, İ, ö, ş, ü dahil bütün alfabelerin harflerini kapsar. <strong>Rakam</strong> 0–9 arası basamakları sayar. <strong>Boşluk</strong> satırı normal boşlukları ve sekme karakterlerini içerir. <strong>Noktalama ve simge</strong> nokta, virgül, tırnak, parantez, para birimi işareti, emoji gibi geri kalan her şeydir. <strong>Satır</strong> sayısı satır sonlarının bir fazlasıdır.',
    ] },
    { h: 'Boşluklu ve boşluksuz karakter sayısı arasındaki fark', p: [
      'Hangi sayının isteneceği kullanım yerine göre değişir. Sosyal medya gönderileri, kısa mesajlar, form alanları ve veritabanı sütunları <strong>boşluklu</strong> sayıyı esas alır; çünkü boşluk da gönderilen ve saklanan bir karakterdir. Çeviri bürolarında, yazarlık ve redaksiyon işlerinde ücretlendirme ise çoğunlukla <strong>boşluksuz</strong> karakter üzerinden yapılır; Türkiye\'de çeviri fiyatlarının "1000 boşluksuz karakter" birimiyle verilmesi yaygın bir uygulamadır.',
      'Akademik dergiler, yarışma şartnameleri ve başvuru formları sınırı bazen boşluklu, bazen boşluksuz tanımlar. Yönergede açıkça belirtilmemişse daha katı olanı, yani boşluklu sayıyı sınırın altında tutmak güvenli yoldur. Araç iki değeri de aynı anda verdiği için her iki yoruma göre durumunuzu görebilirsiniz.',
    ] },
    { h: 'Çözümlü örnek', p: [
      '"İstanbul, Ankara ve İzmir." cümlesini ele alalım. Kelimeler tek tek sayıldığında "İstanbul," 9, "Ankara" 6, "ve" 2, "İzmir." 6 karakterdir; toplam 23. Aralarında üç boşluk bulunduğundan boşluklu sayı 26, boşluksuz sayı 23 olur. Harf sayısı 8 + 6 + 2 + 5 = 21, noktalama sayısı virgül ve nokta olmak üzere 2\'dir. Kelime sayısı 4, satır sayısı 1\'dir.',
      'Aynı cümlenin UTF-8 boyutu 28 bayttır. Karakter sayısı 26 olduğu hâlde boyutun 28 çıkmasının nedeni, cümlede iki tane büyük noktalı "İ" harfi bulunması ve bu harfin her birinin iki bayt yer tutmasıdır.',
    ] },
    { h: 'Karakter sayısı ile bayt sayısı neden farklıdır?', p: [
      'Bilgisayarlar metni bayt dizileri olarak saklar ve günümüzde en yaygın kodlama UTF-8\'dir. Bu kodlamada İngiliz alfabesinin harfleri, rakamlar ve temel noktalama işaretleri birer bayt tutar. Türkçeye özgü <strong>ç, ğ, ı, İ, ö, ş, ü</strong> harfleri ikişer bayt, birçok özel simge üçer bayt, emojilerin çoğu dörder bayt yer kaplar.',
      'Bu fark pratikte önemlidir. Bir veritabanı sütunu ya da bir dosya biçimi sınırı karakter yerine bayt olarak tanımlamışsa, Türkçe karakter içeren metin beklenenden erken sınıra dayanır. Örneğin "ğüşiöç" altı karakterdir ama 11 bayt tutar. Yazılım geliştirirken, alan uzunluğu belirlerken ya da bir sistemin "metin çok uzun" hatasını araştırırken bayt satırı işinize yarar.',
    ] },
    { h: 'Sık karşılaşılan karakter sınırları', p: [
      'Karakter sayacına en çok bir sınıra uymak için başvurulur. Sınırlar platformdan platforma ve zaman içinde değiştiği için aşağıdakiler genel örneklerdir; kesin değer için ilgili platformun ya da kurumun güncel kurallarına bakın.',
    ], ul: [
      '<strong>Kısa mesaj (SMS):</strong> yalnızca temel Latin harflerinden oluşan tek mesaj 160 karakterdir. Türkçe karakter kullanıldığında telefonun ve operatörün kodlama ayarına göre bu sınır düşebilir ve mesaj birden fazla parçaya bölünebilir.',
      '<strong>Sayfa başlığı ve meta açıklama:</strong> arama sonuçlarında uzun başlıklar ve açıklamalar kesilerek gösterilir; bu yüzden başlıklar kısa, açıklamalar bir iki cümle uzunluğunda tutulur.',
      '<strong>Sosyal medya gönderileri ve profil yazıları:</strong> çoğu platformda gönderi, kullanıcı adı ve biyografi alanlarının ayrı ayrı karakter sınırı vardır.',
      '<strong>İlan başlıkları ve ürün adları:</strong> pazar yerlerinde başlık alanı sınırlıdır; sınırı aşan kısım kaydedilmez ya da görüntülenmez.',
      '<strong>Başvuru formları:</strong> niyet mektubu, özgeçmiş özeti, proje özeti gibi alanlar sıklıkla karakter sınırıyla verilir.',
    ] },
    { h: 'Gözden kaçan ayrıntılar', p: [
      'Bir kelime işlemciden kopyalanan metinde gözle fark edilmeyen karakterler bulunabilir: art arda iki boşluk, satır sonundaki boşluklar, sekmeler ve bölünemez boşluklar sayıya dahildir. Boşluklu sayı beklediğinizden yüksek çıkıyorsa "Boşluk" satırına bakın; kelime sayısından belirgin biçimde fazlaysa metinde fazladan boşluk var demektir.',
      'Satır sonları da birer karakterdir. Bu araç her satır sonunu tek karakter sayar. Bazı sistemler satır sonunu iki karakter olarak saklar; çok satırlı bir metinde iki sayım arasında satır sayısı kadar fark görürseniz neden budur. Emojiler ve birleşik simgeler ise birden fazla kod noktasından oluşabildiği için ekranda tek şekil görünse de birkaç karakter sayılabilir; ten rengi ya da aile emojileri buna örnektir.',
    ] },
    { h: 'Kimler kullanır?', p: [
      'Öğrenciler ödev ve başvuru metinlerindeki sınırı denetlemek, çevirmenler ve editörler iş hacmini ve ücreti belirlemek, içerik üreticileri başlık ve açıklamaları uygun uzunlukta tutmak, sosyal medya yöneticileri gönderileri sınır içinde kalacak biçimde kırpmak için karakter sayar. Yazılımcılar veritabanı alan uzunluklarını ve arayüzdeki metin kutularının sınırlarını sınarken, hukukçular ve kamu görevlileri karakter sınırı olan elektronik formları doldururken aynı ihtiyacı duyar. Araç, metni hiçbir yere göndermeden saydığı için gizli sözleşme taslaklarında ve kişisel yazışmalarda da gönül rahatlığıyla kullanılabilir.',
    ] },
  ],
  faq: [
    ['Boşluklar karakter sayılır mı?', 'Evet, boşluk da bir karakterdir ve boşluklu sayıma dahildir. Boşluksuz sayım ise boşlukları, sekmeleri ve satır sonlarını çıkararak yalnızca görünen karakterleri verir. Araç iki değeri de gösterir.'],
    ['Türkçe karakterler iki karakter mi sayılır?', 'Hayır. ç, ğ, ı, İ, ö, ş, ü harflerinin her biri tek karakterdir. Yalnızca UTF-8 kodlamasında ikişer bayt yer tuttukları için bayt sayısı karakter sayısından büyük çıkar.'],
    ['Satır sonu (Enter) karakter sayılır mı?', 'Evet. Her satır sonu boşluklu sayımda tek karakter olarak sayılır, boşluksuz sayımda sayılmaz. Tek satırlık metinlerde bu fark oluşmaz.'],
    ['Kelime sayısı nasıl belirleniyor?', 'Metin boşluklara ve satır sonlarına göre parçalara ayrılır; içinde en az bir harf ya da rakam bulunan her parça bir kelime sayılır. Tek başına duran tire ya da nokta gibi işaretler kelime sayılmaz.'],
    ['Emoji kaç karakter sayılır?', 'Basit emojilerin çoğu tek karakter sayılır, ancak ten rengi eklenmiş ya da birkaç emojinin birleşmesiyle oluşan simgeler birden fazla kod noktası içerir ve birkaç karakter olarak sayılır. Platformların kendi sayım kuralları da farklılık gösterebilir.'],
    ['1000 boşluksuz karakter kaç kelime eder?', 'Türkçe metinlerde kelime uzunluğu konuya göre değişir; kabaca 1000 boşluksuz karakter 130–160 kelime civarına denk gelir. Kesin değer için metninizi yapıştırıp "Kelime" satırına bakın.'],
    ['Metin uzunluğunda bir sınır var mı?', 'Araç bir sınır koymaz; sayım tarayıcınızın belleğinde yapılır. Çok uzun metinlerde, örneğin kitap boyutundaki dosyalarda sonuç birkaç saniye gecikebilir.'],
    ['Yapıştırdığım metin bir yere gönderiliyor mu?', 'Hayır. Sayım tümüyle tarayıcınızda yapılır; metniniz hiçbir sunucuya iletilmez, kaydedilmez ve sayfayı kapattığınızda silinir.'],
  ],
  related: ['kelime-sayaci', 'cumle-sayaci', 'satir-sayaci', 'sms-karakter-sayaci', 'twitter-karakter-sayaci', 'metin-kisalt'],
};
