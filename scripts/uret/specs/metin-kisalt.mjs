export default {
  slug: 'metin-kisalt',
  title: 'Metin Kısaltma (Karakter Sınırı)',
  h1Tail: 'belirli uzunlukta kes',
  pageTitle: 'Metin Kısaltma – Karakter Sınırına Göre Metni Kesme Aracı',
  description: 'Metni belirlediğiniz karakter sınırına göre kısaltın. Kelimeyi ortadan bölmeden keser, sonuna üç nokta ekler; başlık ve meta açıklama için uygundur.',
  card: 'Metni istediğiniz karakter sınırına indirin; kelime ortasından bölmeden kesin ve sonuna üç nokta ekleyin.',
  category: 'metin',
  keywords: ['metin kısaltma', 'karakter sınırı', 'metni kes', 'üç nokta ekleme', 'meta açıklama kısaltma', 'başlık kısaltma', 'truncate metin', 'karaktere göre kesme'],
  lead: `Uzun bir metni, belirlediğiniz <strong>karakter sınırını aşmayacak</strong> biçimde kısaltın. Araç isterseniz kelimeyi ortasından bölmeden son tam kelimede keser ve sonuna üç nokta gibi bir bitiş işareti ekler; bitiş işareti de sınıra dahil edilir.`,
  button: 'Kısalt',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Kısaltılacak metni buraya yapıştırın' },
    { id: 'sinir', label: 'Karakter sınırı', type: 'number', placeholder: 'Örn. 160', hint: 'Bitiş işareti dahil en fazla karakter sayısı.' },
    { id: 'yontem', label: 'Kesme yöntemi', type: 'select', options: [['kelime', 'Kelime sınırında kes (kelimeyi bölme)'], ['karakter', 'Tam karakterde kes']] },
    { id: 'ek', label: 'Bitiş işareti', type: 'text', value: '…', hint: 'Kısaltılan metnin sonuna eklenir. İstemiyorsanız boş bırakın.' },
  ],
  compute(v, h) {
    const ham = String(v.metin ?? '');
    if (ham.trim() === '') h.err('"Metin" alanına kısaltılacak metni yazın.');
    const sinir = h.posint(v.sinir, 'Karakter sınırı');
    const ek = String(v.ek ?? '');
    const ekUz = Array.from(ek).length;
    const ch = Array.from(ham.trim());
    const ozgun = ch.length;
    if (ozgun <= sinir) {
      return {
        rows: [
          ['Sonuç uzunluğu', `${ozgun} karakter`],
          ['Özgün uzunluk', `${ozgun} karakter`],
          ['Kesilen karakter', '0'],
          ['Durum', 'Kısaltma gerekmedi'],
        ],
        text: ch.join(''),
        note: 'Metin zaten sınırın içinde olduğu için değiştirilmedi ve bitiş işareti eklenmedi.',
      };
    }
    const pay = sinir - ekUz;
    if (pay < 1) h.err(`Karakter sınırı bitiş işaretinden (${ekUz} karakter) büyük olmalı. Sınırı artırın ya da bitiş işaretini kısaltın.`);
    let parca = ch.slice(0, pay);
    let bolundu = false;
    if (v.yontem !== 'karakter' && !/\s/.test(ch[pay])) {
      let i = parca.length - 1;
      while (i >= 0 && !/\s/.test(parca[i])) i--;
      if (i > 0) parca = parca.slice(0, i); else bolundu = true;
    }
    let govde = parca.join('').replace(/\s+$/u, '');
    if (v.yontem !== 'karakter') govde = govde.replace(/[\s,;:\-–—]+$/u, '');
    if (govde === '') govde = ch.slice(0, pay).join('');
    const sonuc = govde + ek;
    const uz = Array.from(sonuc).length;
    return {
      rows: [
        ['Sonuç uzunluğu', `${uz} karakter`],
        ['Özgün uzunluk', `${ozgun} karakter`],
        ['Kesilen karakter', String(ozgun - Array.from(govde).length)],
        ['Durum', 'Kısaltıldı'],
      ],
      text: sonuc,
      note: bolundu ? 'İlk kelime tek başına sınırı aştığı için kelime ortasından kesildi.'
        : 'Bitiş işareti sınıra dahildir. Baştaki ve sondaki boşluklar sayılmaz.',
    };
  },
  cases: [
    { in: { metin: 'Merhaba dünya, bugün hava çok güzel.', sinir: '20' }, out: { 'Sonuç uzunluğu': '14 karakter', 'Özgün uzunluk': '36 karakter', 'Kesilen karakter': '23', 'Durum': 'Kısaltıldı' }, text: 'Merhaba dünya…' },
    { in: { metin: 'Merhaba dünya, bugün hava çok güzel.', sinir: '20', yontem: 'karakter' }, out: { 'Sonuç uzunluğu': '20 karakter' }, text: 'Merhaba dünya, bugü…' },
    { in: { metin: 'Merhaba dünya', sinir: '10', yontem: 'karakter', ek: '...' }, out: { 'Sonuç uzunluğu': '10 karakter' }, text: 'Merhaba...' },
    { in: { metin: 'Kısa', sinir: '10' }, out: { 'Durum': 'Kısaltma gerekmedi', 'Sonuç uzunluğu': '4 karakter' }, text: 'Kısa' },
    { in: { metin: 'Elektroensefalografi cihazı', sinir: '10' }, out: { 'Sonuç uzunluğu': '10 karakter' }, text: 'Elektroen…' },
    { in: { metin: 'bir iki üç dört beş', sinir: '10', ek: '' }, out: { 'Sonuç uzunluğu': '10 karakter', 'Kesilen karakter': '9' }, text: 'bir iki üç' },
    { in: { metin: 'bir iki üç dört beş', sinir: '12', ek: '' }, out: { 'Sonuç uzunluğu': '10 karakter' }, text: 'bir iki üç' },
    { in: { metin: 'Merhaba dünya', sinir: '0' }, error: true },
    { in: { metin: 'Merhaba dünya', sinir: '3', ek: '...' }, error: true },
    { in: { metin: '', sinir: '20' }, error: true },
  ],
  howto: [
    `Kısaltmak istediğiniz metni "Metin" kutusuna yazın ya da yapıştırın.`,
    `"Karakter sınırı" alanına sonucun en fazla kaç karakter olacağını girin; örneğin meta açıklama için 160, kısa başlık için 60.`,
    `Kelimelerin bölünmesini istemiyorsanız "Kelime sınırında kes" yöntemini bırakın. Sınırı son karakterine kadar kullanmak için "Tam karakterde kes" seçin.`,
    `Bitiş işaretini olduğu gibi bırakın, üç ayrı noktayla değiştirin ya da hiç istemiyorsanız alanı boşaltın.`,
    `"Kısalt" düğmesine basın; kısaltılmış metin alttaki kutuda, uzunluk bilgileri üstteki satırlarda görünür. Kopyala düğmesiyle sonucu alın.`,
  ],
  sections: [
    { h: 'Metin kısaltma neden gerekir?', p: [
      `Dijital ortamda neredeyse her alanın bir uzunluk sınırı vardır. Arama sonuçlarında sayfa başlıkları ve açıklamalar belli bir genişlikten sonra kesilir, kısa mesajlar belirli karakterden sonra ikinci mesaja bölünür, pazaryeri ürün başlıkları, ilan başlıkları, sosyal medya biyografileri ve form alanları da en fazla karakter sayısıyla sınırlandırılır. Metni kendiniz kısaltmazsanız sistem onu rastgele bir yerden, çoğu zaman bir kelimenin ortasından keser.`,
      `Bu araç kesme işini kontrollü yapar: sınırı siz belirlersiniz, kesim yeri bir kelimenin sonuna denk getirilir ve metnin devam ettiğini belli eden bir bitiş işareti eklenir. Sonuçta okuyan kişi yarım kalmış bir kelimeyle değil, düzgün biten bir ifadeyle karşılaşır.`,
    ] },
    { h: 'Hesap nasıl yapılır?', p: [
      `Önce metnin başındaki ve sonundaki boşluklar atılır ve karakterler sayılır. Uzunluk sınırı aşmıyorsa metin olduğu gibi döner, bitiş işareti eklenmez. Aşıyorsa kullanılabilir pay hesaplanır: <strong>pay = sınır − bitiş işaretinin uzunluğu</strong>. Metnin ilk "pay" kadar karakteri alınır.`,
      `"Kelime sınırında kes" yönteminde, alınan parçanın hemen ardındaki karakter boşluk değilse kesim bir kelimenin ortasına denk gelmiş demektir. Bu durumda parça, içindeki son boşluğa kadar geri çekilir. Sonda kalan boşluk, virgül, noktalı virgül, iki nokta ve tire gibi işaretler temizlenir, böylece "dünya,…" gibi çirkin bir bitiş oluşmaz. En sonda bitiş işareti eklenir.`,
      `"Tam karakterde kes" yönteminde geri çekilme yapılmaz; parça olduğu gibi alınır, yalnızca sondaki boşluk atılır ve bitiş işareti eklenir. Bu yöntem sınırın tamamını kullanır ama kelime yarıda kalabilir.`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `Metin "Merhaba dünya, bugün hava çok güzel." olsun; boşluklar ve noktalama dahil 36 karakterdir. Sınırı 20, bitiş işaretini tek karakterlik üç nokta (…) alalım. Kullanılabilir pay 20 − 1 = 19 karakterdir ve ilk 19 karakter "Merhaba dünya, bugü" eder.`,
      `Kelime sınırı yönteminde 20. karakter "n" harfi olduğundan kesim "bugün" kelimesinin ortasındadır. Parça son boşluğa kadar geri çekilir ve "Merhaba dünya," kalır; sondaki virgül atılır, üç nokta eklenir. Sonuç <strong>Merhaba dünya…</strong> olur ve 14 karakter tutar. Tam karakter yönteminde ise sonuç <strong>Merhaba dünya, bugü…</strong> olur ve tam 20 karakterdir. İlki daha kısa ama düzgündür; ikincisi sınırı doldurur ama kelimeyi böler.`,
    ] },
    { h: 'Üç nokta: tek karakter mi, üç karakter mi?', p: [
      `Varsayılan bitiş işareti, tek karakter olan üç nokta işaretidir (…). Üç ayrı nokta (...) yazarsanız bu üç karakter sayılır ve metne iki karakter daha az yer kalır. Karakter sınırı çok dar olan alanlarda tek karakterlik işaret avantaj sağlar. Öte yandan bazı eski sistemler ve yazı tipleri bu özel işareti düzgün göstermeyebilir; öyle bir ortam için kısaltıyorsanız üç ayrı nokta kullanmak daha güvenlidir.`,
      `Bitiş işareti alanına başka bir şey de yazabilirsiniz: " devamı" ya da " [...]" gibi. Araç yazdığınız ifadenin uzunluğunu sınırdan düşer. Alanı boş bırakırsanız metin hiçbir işaret eklenmeden kesilir.`,
    ] },
    { h: 'Yaygın karakter sınırları için fikir', p: [
      `Farklı ortamların sınırları zaman içinde değiştiği için kesin sayıları yayınlayan kaynaktan doğrulamak gerekir. Yine de fikir vermesi için sık karşılaşılan değerler şöyledir:`,
    ], ul: [
      `<strong>Sayfa başlığı (title):</strong> arama sonuçlarında tam görünmesi için çoğunlukla 50–60 karakter önerilir.`,
      `<strong>Meta açıklama:</strong> genellikle 150–160 karakter civarı hedeflenir.`,
      `<strong>Kısa mesaj (SMS):</strong> yalnızca temel karakterlerle yazılmış tek mesaj 160 karakterdir; Türkçe harfler bu sınırı düşürebilir.`,
      `<strong>İlan ve ürün başlıkları:</strong> platformdan platforma değişir; ilgili sitenin yardım sayfasındaki güncel sınırı kullanın.`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      `Bitiş işaretinin sınıra dahil olduğunu unutmak en yaygın hatadır: 160 karakterlik bir alana 160 karakter metin artı üç nokta sığmaz. Araç bunu sizin yerinize hesaplar. Sınır, bitiş işaretinin kendisinden kısaysa hesap yapılamaz ve hata mesajı görürsünüz.`,
      `Sayım karakter üzerindendir, bayt üzerinden değil. Türkçe harfler ve emojiler birer karakter sayılır; ancak ten rengi eklenmiş ya da birkaç simgenin birleşmesiyle oluşan bazı emojiler birden fazla karakter olarak sayılabilir. Araç anlamı değerlendirmez: cümlenin en önemli kısmı sondaysa kesilen metin eksik kalır. Böyle durumlarda önce cümleyi yeniden kurmak, sonra kısaltmak daha iyi sonuç verir. Metinde hiç boşluk yoksa ya da ilk kelime tek başına sınırı aşıyorsa kelime sınırı yöntemi de zorunlu olarak kelimeyi böler ve bunu sonuç notunda belirtir.`,
    ] },
  ],
  faq: [
    [`Bitiş işareti karakter sınırına dahil mi?`, `Evet. Sınır 100 ise ve bitiş işareti bir karakterse metinden en fazla 99 karakter alınır. Böylece sonuç hiçbir durumda verdiğiniz sınırı aşmaz.`],
    [`Kelime sınırında kesince sonuç neden sınırdan kısa çıkıyor?`, `Çünkü yarım kalan kelime tamamen çıkarılır. Sonuç sınıra en yakın tam kelimede biter; bu yüzden birkaç karakter boşta kalabilir. Sınırı tam doldurmak isterseniz "Tam karakterde kes" yöntemini seçin.`],
    [`Metin sınırdan kısaysa ne olur?`, `Hiçbir değişiklik yapılmaz, bitiş işareti de eklenmez. Durum satırında "Kısaltma gerekmedi" yazar.`],
    [`Boşluklar karakter olarak sayılıyor mu?`, `Kelimelerin arasındaki boşluklar ve satır sonları sayılır. Yalnızca metnin en başındaki ve en sonundaki boşluklar sayım dışında tutulur.`],
    [`Üç nokta yerine başka bir ifade ekleyebilir miyim?`, `Evet. Bitiş işareti alanına istediğiniz ifadeyi yazabilirsiniz. Araç onun uzunluğunu sınırdan düşer. Hiçbir şey eklenmesin istiyorsanız alanı boş bırakın.`],
    [`Birden fazla satırı ayrı ayrı kısaltır mı?`, `Hayır, metnin tamamı tek parça olarak değerlendirilir ve sınır bütün metne uygulanır. Her satırı ayrı kısaltmak için satırları tek tek işlemeniz gerekir.`],
    [`Meta açıklama için hangi ayarı kullanmalıyım?`, `Sınırı 155–160 civarına getirip kelime sınırında kesme yöntemini kullanmak iyi bir başlangıçtır. Açıklamanın en önemli bilgisini ilk cümleye koymak, kesilse bile mesajın anlaşılmasını sağlar.`],
    [`Metnim sunucuya gönderiliyor mu?`, `Hayır. Kısaltma işlemi tarayıcınızda yapılır; metin hiçbir yere iletilmez ve saklanmaz.`],
  ],
  related: ['karakter-sayaci', 'twitter-karakter-sayaci', 'sms-karakter-sayaci', 'metin-bol', 'satir-kaydir', 'kelime-sayaci'],
};
