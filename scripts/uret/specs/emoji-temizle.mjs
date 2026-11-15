export default {
  slug: 'emoji-temizle',
  title: 'Metinden Emoji Temizleme',
  h1Tail: 'emojileri tek tıkla silin',
  pageTitle: 'Metinden Emoji Temizleme – Emojileri Toplu Silme Aracı',
  description: 'Metindeki emojileri tek seferde silin ya da boşlukla değiştirin. Bayraklar, ten rengi çeşitleri ve birleşik emojiler bütün olarak temizlenir; Türkçe harfler korunur.',
  card: 'Yazıdaki emojileri toplu olarak silin; bayrak, ten rengi ve birleşik emojiler artık bırakmadan temizlenir, kaç emoji silindiğini görün.',
  category: 'metin',
  keywords: ['emoji temizleme', 'emoji silme', 'metinden emoji kaldırma', 'emojisiz metin', 'emoji sayma', 'yorumlardan emoji silme', 'emoji temizleyici'],
  lead: 'Sosyal medya gönderilerinden, yorumlardan ya da sohbet dökümlerinden kopyaladığınız metindeki <strong>emojileri toplu olarak kaldırın</strong>. Araç birleşik emojileri, bayrakları ve ten rengi çeşitlerini tek parça olarak tanır, kaç emoji silindiğini bildirir ve harflere, rakamlara, noktalama işaretlerine dokunmaz.',
  button: 'Temizle',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Emoji içeren metni buraya yapıştırın', wide: true },
    { id: 'yerine', label: 'Emojinin yerine', type: 'select', options: [['sil', 'Hiçbir şey koyma (sil)'], ['bosluk', 'Tek boşluk koy']] },
    { id: 'duzelt', label: 'Boşluk düzeltme', type: 'select', options: [['evet', 'Art arda boşlukları teke indir, satır sonlarını kırp'], ['hayir', 'Boşluklara dokunma']] },
  ],
  compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Temizlemek için "Metin" alanına bir yazı yapıştırın.');
    // Tek bir emoji dizisi: bayrak çifti | tuş takımı emojisi | (ZWJ ile birleşebilen) resim karakteri
    const ek = '(?:\\uFE0F|[\\u{1F3FB}-\\u{1F3FF}]|[\\u{E0020}-\\u{E007F}])*';
    const resim = '(?![\\u00A9\\u00AE\\u2122])\\p{Extended_Pictographic}';
    const re = new RegExp('[\\u{1F1E6}-\\u{1F1FF}]{2}|[0-9#*]\\uFE0F?\\u20E3|' + resim + ek + '(?:\\u200D' + resim + ek + ')*', 'gu');
    let adet = 0;
    const yer = v.yerine === 'bosluk' ? ' ' : '';
    let cikti = s.replace(re, () => { adet++; return yer; });
    // Sahipsiz kalan biçim seçici, ten rengi ve bölge göstergesi artıkları
    cikti = cikti.replace(/[️⃣\u{1F3FB}-\u{1F3FF}\u{1F1E6}-\u{1F1FF}\u{E0020}-\u{E007F}]/gu, '');
    if (v.duzelt !== 'hayir') {
      cikti = cikti.split('\n').map((x) => x.replace(/[ \t]{2,}/g, ' ').replace(/ +([.,;:!?])/g, '$1').trim()).join('\n');
    }
    const say = (t) => Array.from(t).length;
    return {
      rows: [
        ['Silinen emoji', h.fmt(adet, 0)],
        ['Önceki karakter sayısı', h.fmt(say(s), 0)],
        ['Sonraki karakter sayısı', h.fmt(say(cikti), 0)],
      ],
      text: cikti,
      note: adet === 0 ? 'Metinde emoji bulunamadı; çıktı yalnızca seçtiğiniz boşluk düzeltmesinden etkilenir.' : 'Telif (©), tescil (®) ve marka (™) işaretleri emoji sayılmaz ve korunur.',
    };
  },
  cases: [
    { in: { metin: 'Merhaba 😀 dünya', yerine: 'sil', duzelt: 'evet' }, out: { 'Silinen emoji': '1', 'Önceki karakter sayısı': '15', 'Sonraki karakter sayısı': '13' }, text: 'Merhaba dünya' },
    { in: { metin: 'Harika👍🏽!', yerine: 'sil', duzelt: 'evet' }, out: { 'Silinen emoji': '1' }, text: 'Harika!' },
    { in: { metin: 'Aile: 👨‍👩‍👧 ve bayrak 🇹🇷', yerine: 'sil', duzelt: 'evet' }, out: { 'Silinen emoji': '2' }, text: 'Aile: ve bayrak' },
    { in: { metin: 'Kod1️⃣ © 2024 ™', yerine: 'sil', duzelt: 'evet' }, out: { 'Silinen emoji': '1' }, text: 'Kod © 2024 ™' },
    { in: { metin: 'a😀b', yerine: 'bosluk', duzelt: 'hayir' }, out: { 'Silinen emoji': '1' }, text: 'a b' },
    { in: { metin: 'Çığ, şöğüt, İĞÜ 123', yerine: 'sil', duzelt: 'evet' }, out: { 'Silinen emoji': '0' }, text: 'Çığ, şöğüt, İĞÜ 123' },
    { in: { metin: '🔥🔥🔥 İndirim ❤️ başladı', yerine: 'sil', duzelt: 'evet' }, out: { 'Silinen emoji': '4' }, text: 'İndirim başladı' },
    { in: { metin: '', yerine: 'sil' }, error: true },
  ],
  howto: [
    'Emoji içeren metni "Metin" kutusuna yapıştırın; birden çok satır ve paragraf yapıştırabilirsiniz.',
    '"Emojinin yerine" seçeneğiyle emojilerin tümüyle silinmesini mi, yoksa yerlerine tek boşluk konmasını mı istediğinizi belirleyin.',
    '"Boşluk düzeltme" açıkken emojilerden kalan çift boşluklar teke iner ve satır başı-sonu boşlukları kırpılır; metnin hizasını korumak istiyorsanız kapatın.',
    '"Temizle" düğmesine basın. Silinen emoji sayısını ve karakter sayısındaki değişimi görün, temiz metni kopyalayın.',
  ],
  sections: [
    { h: 'Emojileri temizlemek ne zaman gerekir?', p: [
      'Emojiler sohbeti renklendirir, ancak her ortam onları kaldıramaz. Müşteri yorumlarını bir tabloya aktarırken, anket yanıtlarını çözümlerken, sosyal medya gönderisini resmî bir yazıya ya da basın bültenine dönüştürürken emojiler çoğu zaman fazlalıktır. Eski yazıcı sürücüleri, bazı fatura ve kargo sistemleri, kısa mesaj altyapıları ve dar karakter kümesiyle çalışan veritabanları emojiyi soru işareti, boş kutu ya da bozuk karakter olarak gösterir.',
      'Kısa mesajda durum daha da belirgindir: tek bir emoji bile iletinin kodlamasını değiştirip mesaj başına düşen karakter sınırını ciddi biçimde düşürebilir. Arama motoru başlıklarında, ürün adlarında, dosya adlarında ve e-posta konu satırlarında da emojisiz, sade metin daha güvenli bir seçimdir. Bu araç, metnin geri kalanını bozmadan yalnızca emojileri ayıklar.',
    ] },
    { h: 'Bir emoji her zaman tek karakter değildir', p: [
      'Ekranda tek bir resim gibi görünen emoji, arka planda birden çok Unicode kod noktasından oluşabilir. Ten rengi seçilmiş bir başparmak, temel emoji ile bir ten rengi değiştiricisinin birleşimidir. Aile ve meslek emojileri, tek tek kişi emojilerinin görünmez bir birleştirici karakterle (sıfır genişlikli birleştirici) yan yana getirilmesiyle kurulur. Ülke bayrakları iki bölge göstergesi harfinden oluşur. Tuş takımı emojileri ise sıradan bir rakamın ardına eklenen iki özel işaretle elde edilir.',
      'Yalnızca "resim" karakterlerini silen basit bir yöntem bu dizilerin parçalarını geride bırakır: görünmez birleştiriciler, yalnız kalmış ten rengi kutuları ya da anlamsız harf çiftleri. Araç her diziyi bütün olarak tanır ve tek emoji olarak sayar; ardından sahipsiz kalmış biçim seçici ve değiştirici artıklarını da süpürür.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> "Merhaba 😀 dünya" metni 15 karakterdir. Emoji silindiğinde iki kelime arasında iki boşluk kalır; boşluk düzeltme açık olduğundan bunlar teke iner ve "Merhaba dünya" elde edilir. Sonuç 13 karakterdir, silinen emoji sayısı 1 olarak gösterilir.',
      '<strong>Örnek 2:</strong> "Aile: 👨‍👩‍👧 ve bayrak 🇹🇷" metninde aile emojisi üç kişi emojisi ile iki birleştiriciden, bayrak ise iki bölge göstergesinden oluşur. Araç bunları iki emoji olarak sayar ve çıktı "Aile: ve bayrak" olur.',
      '<strong>Örnek 3:</strong> "🔥🔥🔥 İndirim ❤️ başladı" metninde üç ateş ve bir kalp vardır; kalbin ardındaki görünmez biçim seçici de emojiyle birlikte silinir. Sayaç 4 gösterir, çıktı "İndirim başladı" olur.',
    ] },
    { h: 'Neler silinir, neler korunur?', ul: [
      '<strong>Silinir:</strong> yüz ifadeleri, el işaretleri, hayvan, yiyecek, araç ve nesne emojileri; kalpler ve yıldızlar gibi simge emojileri.',
      '<strong>Silinir:</strong> ülke bayrakları, ten rengi çeşitleri, birleşik aile ve meslek emojileri, tuş takımı emojileri (rakamıyla birlikte).',
      '<strong>Korunur:</strong> Türkçe dahil bütün alfabelerin harfleri, rakamlar, noktalama işaretleri, para birimi simgeleri ve matematik işaretleri.',
      '<strong>Korunur:</strong> telif (©), tescilli marka (®) ve marka (™) işaretleri. Bunlar teknik olarak emoji biçiminde de gösterilebilir, ancak hukuki metinlerde anlam taşıdıkları için bırakılır.',
      '<strong>Korunur:</strong> iki nokta ve parantezle yazılan <code>:)</code> gibi klavye ifadeleri; bunlar emoji değil, sıradan noktalama işaretleridir.',
    ] },
    { h: 'Silmek mi, boşlukla değiştirmek mi?', p: [
      'Emojiler çoğunlukla kelimelerin arasında, iki yanında boşlukla yazılır; bu durumda "sil" seçeneği ile boşluk düzeltme birlikte en temiz sonucu verir. Bazı yazarlar ise emojiyi kelimeleri ayırmak için boşluksuz kullanır: "indirim🔥başladı" gibi. Böyle bir metinde emojiyi doğrudan silmek iki kelimeyi birbirine yapıştırır. "Tek boşluk koy" seçeneği bunu önler; ardından boşluk düzeltme fazla boşlukları yine teke indirir.',
      'Boşluk düzeltme, emojinin ardından noktalama işareti öncesinde kalan boşluğu da giderir. Girintiyle hizalanmış listeler, kod ya da tablo benzeri metinlerde boşlukların değişmesini istemiyorsanız düzeltmeyi kapatın.',
    ] },
    { h: 'Sınırlar', p: [
      'Emoji tanıma, tarayıcınızın desteklediği Unicode sürümündeki karakter özelliklerine dayanır. Çok yeni eklenmiş bir emoji eski bir tarayıcıda tanınmayabilir; tarayıcıyı güncellemek bu durumu giderir. Oklar, onay işaretleri ve kart simgeleri gibi bazı semboller Unicode\'da emoji olarak da gösterilebildiği için silinir; bu simgeleri korumanız gerekiyorsa çıktıyı gözden geçirin. Araç metnin anlamını değerlendirmez; emojiyle birlikte kaybolan vurguyu ya da duyguyu gerekiyorsa sözcüklerle yeniden kurmak size kalır.',
    ] },
  ],
  faq: [
    ['Emoji silindikten sonra neden çift boşluk kalıyor?', 'Emoji iki boşluğun arasındaysa silinince boşluklar yan yana kalır. "Boşluk düzeltme" seçeneği açıkken bunlar kendiliğinden teke indirilir; seçenek kapalıysa metin olduğu gibi bırakılır.'],
    ['Araç emojileri nasıl sayıyor?', 'Ekranda tek resim olarak görünen her dizi bir emoji sayılır. Ten rengi seçilmiş bir el, birleşik bir aile emojisi ya da bir bayrak, içinde birden çok kod noktası olsa da sayaca 1 olarak yansır.'],
    ['Türkçe karakterler ya da noktalama işaretleri zarar görür mü?', 'Hayır. ç, ğ, ı, İ, ö, ş, ü gibi harfler, rakamlar ve noktalama işaretleri emoji sınıfında değildir; araç bunlara dokunmaz.'],
    [':) ve :D gibi ifadeler de siliniyor mu?', 'Hayır. Bunlar noktalama işaretleriyle yazılmış klavye ifadeleridir, Unicode emojisi değildir. Silmek isterseniz bul ve değiştir aracını kullanabilirsiniz.'],
    ['Telif ve marka işaretleri neden yerinde kalıyor?', '©, ® ve ™ işaretleri bazı sistemlerde emoji biçiminde gösterilebilse de sözleşme, ürün adı ve yasal uyarı gibi metinlerde anlam taşır. Yanlışlıkla silinmemeleri için araç bunları korur.'],
    ['Sadece emojileri sayıp metni değiştirmeden bırakabilir miyim?', 'Evet. "Silinen emoji" satırı metindeki emoji sayısını verir; çıktıyı kullanmayıp yalnızca bu sayıya bakabilirsiniz. Özgün metniniz giriş kutusunda değişmeden kalır.'],
    ['Çok uzun bir sohbet dökümünü temizleyebilir miyim?', 'Evet. İşlem tarayıcınızın belleğinde yapılır ve binlerce satırlık metinler de kısa sürede temizlenir. Çok büyük dökümlerde eski cihazlarda birkaç saniyelik bekleme olabilir.'],
    ['Yapıştırdığım yazışmalar bir yere kaydediliyor mu?', 'Hayır. Metin bilgisayarınızdan çıkmaz; temizleme tümüyle tarayıcıda gerçekleşir ve sayfayı kapattığınızda hiçbir iz kalmaz.'],
  ],
  related: ['noktalama-temizle', 'bosluk-temizle', 'html-etiket-temizle', 'karakter-sayaci', 'sms-karakter-sayaci', 'unicode-kod-noktasi'],
};
