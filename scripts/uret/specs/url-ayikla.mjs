export default {
  slug: 'url-ayikla',
  title: 'Metinden Bağlantı (URL) Ayıklama',
  h1Tail: 'metindeki web adreslerini listele',
  pageTitle: 'Metinden Bağlantı (URL) Ayıklama – Linkleri Bulma ve Listeleme',
  description: 'Metnin ya da HTML kodunun içindeki web bağlantılarını bulup liste halinde çıkarın. Tekrarları silin, sıralayın ya da yalnızca alan adlarını alın.',
  card: 'Metin ya da HTML içindeki web bağlantılarını bulun; tekrarsız liste ya da yalnızca alan adları olarak alın.',
  category: 'metin',
  keywords: ['url ayıklama', 'metinden link bulma', 'bağlantı ayıklayıcı', 'linkleri listeleme', 'html içinden link çıkarma', 'alan adı ayıklama', 'url extractor', 'metindeki linkleri kopyalama'],
  lead: `Bir yazıyı, e-postayı, sohbet dökümünü ya da HTML kaynak kodunu yapıştırın; araç içindeki <strong>web bağlantılarını</strong> bulup alt alta listelesin. Tekrar eden bağlantıları çıkarabilir, listeyi sıralayabilir ya da tam adres yerine yalnızca alan adlarını alabilirsiniz.`,
  button: 'Ayıkla',
  inputs: [
    { id: 'metin', label: 'Metin ya da HTML kodu', type: 'textarea', placeholder: 'İçinde bağlantılar geçen metni buraya yapıştırın' },
    { id: 'tur', label: 'Listelenecek bilgi', type: 'select', options: [['tam', 'Tam bağlantı'], ['alan', 'Yalnızca alan adı']] },
    { id: 'tekrar', label: 'Tekrar eden bağlantılar', type: 'select', options: [['sil', 'Sil (her bağlantı bir kez)'], ['koru', 'Koru']] },
    { id: 'sirala', label: 'Sıralama', type: 'select', options: [['sira', 'Metinde geçtiği sırayla'], ['alfabe', 'Alfabetik']] },
    { id: 'onek', label: 'www ile başlayan adresler', type: 'select', options: [['ayni', 'Yazıldığı gibi bırak'], ['ekle', 'Başına https protokolünü ekle']] },
  ],
  compute(v, h) {
    const ham = String(v.metin ?? '');
    if (ham.trim() === '') h.err('"Metin ya da HTML kodu" alanına içinde bağlantı geçen metni yapıştırın.');
    const re = /(?<![\p{L}\p{N}@.\/])(?:https?:\/\/|www\.)[^\s<>"'`]+/giu;
    const say = (s, c) => s.split(c).length - 1;
    const temizle = (u) => {
      for (;;) {
        const son = u.at(-1);
        if ('.,;:!?…»”’*'.includes(son)) u = u.slice(0, -1);
        else if (son === ')' && say(u, ')') > say(u, '(')) u = u.slice(0, -1);
        else if (son === ']' && say(u, ']') > say(u, '[')) u = u.slice(0, -1);
        else if (son === '}' && say(u, '}') > say(u, '{')) u = u.slice(0, -1);
        else return u;
      }
    };
    const sunucu = (u) => {
      let s = u.replace(/^https?:\/\//i, '').split(/[\/?#]/)[0];
      s = s.slice(s.lastIndexOf('@') + 1).replace(/:\d*$/, '').toLowerCase();
      return s;
    };
    let bulunan = [];
    for (const m of ham.match(re) || []) {
      const u = temizle(m);
      const s = sunucu(u);
      if (!/^[^.\s]+(\.[^.\s]+)+$/.test(s)) continue;
      bulunan.push(u);
    }
    if (!bulunan.length) h.err('Metinde bağlantı bulunamadı. Yalnızca http, https ya da www ile başlayan adresler tanınır.');
    const toplam = bulunan.length;
    const guvenli = bulunan.filter((u) => /^https:/i.test(u)).length;
    const kok = (u) => sunucu(u).replace(/^www\./, '');
    if (v.tur === 'alan') bulunan = bulunan.map(kok);
    else if (v.onek === 'ekle') bulunan = bulunan.map((u) => (/^www\./i.test(u) ? 'https://' + u : u));
    let liste = bulunan;
    if (v.tekrar !== 'koru') liste = [...new Set(bulunan)];
    const kars = (x, y) => { const a = x.toLowerCase(), b = y.toLowerCase(); return a < b ? -1 : a > b ? 1 : 0; };
    if (v.sirala === 'alfabe') liste = [...liste].sort(kars);
    const alanlar = new Set(liste.map((u) => (v.tur === 'alan' ? u : kok(u))));
    return {
      rows: [
        [v.tur === 'alan' ? 'Listelenen alan adı' : 'Listelenen bağlantı', String(liste.length)],
        ['Metinde bulunan toplam bağlantı', String(toplam)],
        ['Çıkarılan tekrar', String(toplam - liste.length)],
        ['Farklı alan adı', String(alanlar.size)],
        ['Güvenli (https) bağlantı', `${guvenli} / ${toplam}`],
      ],
      text: liste.join('\n'),
      note: 'Bağlantılar yalnızca metinden okunur; araç hiçbir adresi açmaz, çalışıp çalışmadığını denetlemez.',
    };
  },
  cases: [
    { in: { metin: 'Sitemiz https://ornek.com/urunler adresinde, blog ise http://blog.ornek.com/yazi?id=5 sayfasında.' }, out: { 'Listelenen bağlantı': '2', 'Metinde bulunan toplam bağlantı': '2', 'Çıkarılan tekrar': '0', 'Farklı alan adı': '2', 'Güvenli (https) bağlantı': '1 / 2' }, text: 'https://ornek.com/urunler\nhttp://blog.ornek.com/yazi?id=5' },
    { in: { metin: 'Bakın: (https://ornek.com/a_(b)), www.site.org. ve yine https://ornek.com/a_(b)' }, out: { 'Listelenen bağlantı': '2', 'Metinde bulunan toplam bağlantı': '3', 'Çıkarılan tekrar': '1' }, text: 'https://ornek.com/a_(b)\nwww.site.org' },
    { in: { metin: 'https://www.Ornek.com/x http://ornek.com:8080/y https://alt.ornek.com', tur: 'alan' }, out: { 'Listelenen alan adı': '2', 'Çıkarılan tekrar': '1', 'Farklı alan adı': '2' }, text: 'ornek.com\nalt.ornek.com' },
    { in: { metin: 'Adres: www.site.org/yol', onek: 'ekle' }, out: { 'Güvenli (https) bağlantı': '0 / 1' }, text: 'https://www.site.org/yol' },
    { in: { metin: 'https://b.com/2 https://a.com/1 https://b.com/1', sirala: 'alfabe' }, text: 'https://a.com/1\nhttps://b.com/1\nhttps://b.com/2' },
    { in: { metin: '<p><a href="https://ornek.com/sayfa">Sayfa</a> ve <img src=\'https://cdn.ornek.com/a.png\'></p>' }, out: { 'Listelenen bağlantı': '2' }, text: 'https://ornek.com/sayfa\nhttps://cdn.ornek.com/a.png' },
    { in: { metin: 'https://a.com https://a.com', tekrar: 'koru' }, out: { 'Listelenen bağlantı': '2', 'Çıkarılan tekrar': '0', 'Farklı alan adı': '1' } },
    { in: { metin: 'ornek.com adresine ve ali@ornek.com kutusuna bakın.' }, error: true },
    { in: { metin: '' }, error: true },
  ],
  howto: [
    `Bağlantıları içeren metni ya da sayfanın HTML kaynak kodunu "Metin ya da HTML kodu" kutusuna yapıştırın.`,
    `Tam adresleri mi yoksa yalnızca alan adlarını mı istediğinizi "Listelenecek bilgi" listesinden seçin.`,
    `Tekrar eden bağlantıların silinip silinmeyeceğini ve listenin sırasını belirleyin.`,
    `Protokolsüz yazılmış, www ile başlayan adreslerin tıklanabilir olması için başlarına https eklenmesini isteyebilirsiniz.`,
    `"Ayıkla" düğmesine basın. Bağlantılar alttaki kutuda her satıra bir tane gelecek biçimde listelenir.`,
  ],
  sections: [
    { h: 'Bağlantı ayıklama nerede işe yarar?', p: [
      `Uzun bir yazının, bir bültenin ya da saatler süren bir grup sohbetinin içine dağılmış bağlantıları tek tek bulup kopyalamak yorucudur. Bir web sayfasının kaynak kodunda ise bağlantılar etiketlerin, sınıf adlarının ve betiklerin arasında kaybolur. Bu araç metni baştan sona tarayıp web adresi biçimindeki her parçayı toplar ve yalnızca adreslerden oluşan bir liste verir.`,
    ], ul: [
      `Bir makaledeki kaynakları ve dış bağlantıları gözden geçirmek`,
      `Kendi sitenizdeki bir sayfanın hangi adreslere bağlantı verdiğini çıkarmak`,
      `Sohbet ya da e-posta dökümünde paylaşılan adresleri bir araya toplamak`,
      `Bir belgede geçen kaynak sitelerin alan adlarını sayıp özetlemek`,
      `Bağlantı listesini hesap tablosuna aktarıp tek tek denetlemek üzere hazırlamak`,
    ] },
    { h: 'Hangi yazımlar bağlantı sayılır?', p: [
      `Araç iki tür başlangıcı tanır: <strong>http</strong> ya da <strong>https</strong> protokolüyle (ardından iki nokta ve iki eğik çizgi gelecek biçimde) başlayan adresler ve protokol yazılmadan <strong>www</strong> önekiyle başlayan adresler. Başlangıçtan sonra boşluğa, satır sonuna, tırnak işaretine ya da açılı ayraca kadar olan bölüm adresin devamı kabul edilir. Bu sayede HTML kodunda tırnak içine yazılmış adresler de temiz biçimde alınır.`,
      `Yalnızca "ornek.com" biçiminde, önünde protokol ya da www bulunmayan yalın alan adları bağlantı sayılmaz. Bunun nedeni yanlış eşleşmeleri önlemektir: dosya adları, sürüm numaraları ve cümle sonunda boşluksuz yazılmış kelimeler de noktayla ayrılmış parçalar içerir. E-posta adreslerinin alan adı bölümü de bağlantı olarak alınmaz.`,
    ] },
    { h: 'Sondaki noktalama nasıl temizlenir?', p: [
      `Düz yazıda bağlantılar çoğu zaman bir noktalama işaretinin hemen önünde biter: cümle sonundaki nokta, sıralamadaki virgül ya da adresi çevreleyen parantez. Bunlar adrese dahil edilirse bağlantı bozulur. Araç adresin sonundaki nokta, virgül, noktalı virgül, iki nokta, ünlem ve soru işaretini atar.`,
      `Parantezlerde daha dikkatli davranılır, çünkü bazı adreslerin içinde gerçekten parantez bulunur. Kural şudur: adresin sonundaki kapanış parantezi, ancak adresin içinde karşılığı olan bir açılış parantezi yoksa atılır. Örneğin parantez içinde yazılmış ve sonu "a_(b)" ile biten bir adreste, dıştaki fazladan parantez ve ardındaki virgül temizlenir, adrese ait olan "(b)" bölümü korunur.`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `Şu cümleyi düşünün: bir şirketin ürünler sayfasına https protokolüyle, blog alt alanındaki bir yazıya ise http protokolüyle ve "id=5" parametresiyle bağlantı veriliyor; ikinci adresin hemen ardından "sayfasında." kelimesi geliyor. Araç iki adresi de bulur, aradaki virgülü ve cümle sonundaki noktayı adreslere katmaz.`,
      `Sonuç satırlarında listelenen bağlantı 2, toplam bağlantı 2, çıkarılan tekrar 0 görünür. Farklı alan adı sayısı 2 çıkar, çünkü ana alan adı ile "blog" alt alanı ayrı sunucu adlarıdır. Güvenli bağlantı satırında "1 / 2" yazar: iki adresten yalnızca biri https kullanmaktadır. "Yalnızca alan adı" seçeneğiyle aynı metin, yol ve parametreler atılmış olarak iki satırlık bir alan adı listesine dönüşür.`,
    ] },
    { h: 'Alan adı modu ve tekrar denetimi', p: [
      `"Yalnızca alan adı" seçildiğinde her bağlantının protokolü, yolu, parametreleri, kullanıcı bilgisi ve kapı numarası atılır; geriye sunucu adı kalır ve küçük harfe çevrilir. Baştaki www öneki de çıkarılır, böylece aynı sitenin önekli ve öneksiz yazımları tek satırda birleşir. Alt alanlar ise ayrı tutulur: "alt.ornek.com" ile "ornek.com" iki ayrı satırdır.`,
      `Tam bağlantı modunda tekrar denetimi birebir yapılır. Adreslerin yol bölümünde büyük-küçük harf anlam taşıyabildiği için iki adres ancak her karakteri aynıysa tekrar sayılır. Sonunda eğik çizgi olan ve olmayan yazımlar ya da izleme parametresi eklenmiş kopyalar farklı bağlantı olarak listelenir.`,
    ] },
    { h: 'Güvenlik ve sınırlar', p: [
      `Araç bulduğu adresleri <strong>açmaz</strong>; yalnızca yazıldıkları gibi listeler. Bu yüzden bir bağlantının çalışıp çalışmadığını, nereye yönlendirdiğini ya da güvenli olup olmadığını söyleyemez. Tanımadığınız bir kaynaktan gelen metindeki bağlantıları açmadan önce alan adını dikkatle okuyun: tanıdık bir markanın adına benzeyen ama bir harfi farklı yazılmış adresler oltalama girişimlerinde sık kullanılır. Kısaltılmış bağlantıların gerçek hedefi de listeden anlaşılamaz.`,
      `HTML kodundaki göreli bağlantılar, yani sunucu adı yazılmadan yalnızca eğik çizgiyle başlayan yollar, tek başlarına tam adres olmadıkları için listeye alınmaz. Posta, dosya aktarımı ve telefon gibi başka protokollerle başlayan adresler de kapsam dışındadır. Boşlukla ikiye bölünmüş ya da satır sonunda kırılmış adreslerin yalnızca ilk parçası yakalanır.`,
    ] },
  ],
  faq: [
    [`Hangi bağlantılar bulunur?`, `Başında http ya da https protokolü bulunan adresler ile protokolsüz yazılıp www önekiyle başlayan adresler bulunur. Yalın alan adları ve e-posta adresleri bağlantı sayılmaz.`],
    [`HTML kaynak kodundan bağlantı çıkarabilir miyim?`, `Evet. Kaynak kodu olduğu gibi yapıştırın. Bağlantı ve görsel etiketlerinde tırnak içine yazılmış tam adresler listelenir; sunucu adı içermeyen göreli yollar alınmaz.`],
    [`Aynı bağlantı birden fazla geçiyorsa ne olur?`, `Varsayılan ayarda yalnızca ilk geçtiği yerde listelenir ve çıkarılan tekrar sayısı gösterilir. Hepsini görmek için "Koru" seçeneğini kullanın.`],
    [`Yalnızca site adlarını alabilir miyim?`, `Evet. "Listelenecek bilgi" bölümünden "Yalnızca alan adı" seçin. Yol ve parametreler atılır, baştaki www öneki çıkarılır ve aynı alan adı bir kez yazılır.`],
    [`Araç bağlantıları açıp kontrol ediyor mu?`, `Hayır. Hiçbir adrese bağlanılmaz. Bağlantının çalışıp çalışmadığı ya da nereye yönlendirdiği denetlenmez; yalnızca metinde yazan adres listelenir.`],
    [`Cümle sonundaki nokta bağlantıya dahil oluyor mu?`, `Hayır. Adresin sonundaki nokta, virgül, ünlem, soru işareti ve karşılığı olmayan kapanış parantezleri atılır.`],
    [`Güvenli bağlantı satırı ne anlama geliyor?`, `Bulunan adreslerden kaçının https protokolüyle yazıldığını gösterir. Bu yalnızca adresin yazımına ilişkin bir sayımdır; sitenin güvenilir olduğu anlamına gelmez.`],
    [`Yapıştırdığım metin sunucuya gönderiliyor mu?`, `Hayır. Tarama tarayıcınızda yapılır; metin ve bulunan bağlantılar hiçbir yere iletilmez, kaydedilmez.`],
  ],
  related: ['e-posta-ayikla', 'sayi-ayikla', 'html-etiket-temizle', 'url-metni-olustur', 'tekrar-eden-satirlari-sil', 'satirlari-birlestir'],
};
