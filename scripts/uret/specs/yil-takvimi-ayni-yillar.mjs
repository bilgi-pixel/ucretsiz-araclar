export default {
  slug: 'yil-takvimi-ayni-yillar',
  title: 'Takvimi Aynı Olan Yılları Bulma',
  h1Tail: 'eski takvim hangi yıl yeniden kullanılır?',
  pageTitle: 'Takvimi Aynı Olan Yılları Bulma – Aynı Takvimli Yıllar',
  description: 'Bir yılın takvimiyle gün gün aynı olan önceki ve sonraki yılları bulun. Yılın hangi gün başladığını, artık yıl olup olmadığını ve tekrar aralıklarını görün.',
  card: 'Bir yılın takviminin hangi yıllarda birebir tekrarlandığını bulun; eski takviminizi yeniden kullanabileceğiniz yılı öğrenin.',
  category: 'zaman',
  keywords: ['takvimi aynı olan yıllar', 'aynı takvim hangi yıl', 'eski takvim tekrar kullanma', 'takvim kaç yılda bir tekrar eder', '2026 takvimi hangi yılla aynı', 'takvim tekrarı hesaplama', 'aynı takvimli yıllar'],
  lead: 'Bir yıl yazın; takvimi o yılla <strong>gün gün aynı</strong> olan önceki ve sonraki yılları listeleyelim. Duvar takvimini, ajandayı ya da yıllık planlayıcıyı hangi yıl yeniden kullanabileceğinizi, bir tarihin hangi yıllarda aynı güne denk geldiğini buradan öğrenebilirsiniz.',
  button: 'Bul',
  inputs: [
    { id: 'yil', label: 'Yıl', type: 'number', placeholder: 'Örn. 2026', hint: '1583 ile 9999 arasında bir yıl yazın.' },
    { id: 'adet', label: 'Her yönde listelenecek yıl sayısı', type: 'number', value: '5', hint: '1 ile 20 arasında.' },
  ],
  compute(v, h) {
    const y = h.int(v.yil, 'Yıl');
    if (y < 1583 || y > 9999) h.err('"Yıl" 1583 ile 9999 arasında olmalı (Miladi takvimin kullanıldığı dönem).');
    const adet = h.posint(v.adet, 'Her yönde listelenecek yıl sayısı');
    if (adet > 20) h.err('"Her yönde listelenecek yıl sayısı" en fazla 20 olabilir.');
    const artik = (n) => (n % 4 === 0 && n % 100 !== 0) || n % 400 === 0;
    const ilkGun = (n) => { const d = new Date(Date.UTC(2000, 0, 1)); d.setUTCFullYear(n); return d.getUTCDay(); };
    const gunler = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const a0 = artik(y), g0 = ilkGun(y);
    const ayni = (n) => artik(n) === a0 && ilkGun(n) === g0;
    const sonraki = [], onceki = [];
    for (let n = y + 1; sonraki.length < adet && n <= y + 2000; n++) if (ayni(n)) sonraki.push(n);
    for (let n = y - 1; onceki.length < adet && n >= 1583; n--) if (ayni(n)) onceki.push(n);
    const son = new Date(Date.UTC(2000, 11, 31)); son.setUTCFullYear(y);
    return {
      rows: [
        ['Sonraki aynı takvimli yıl', sonraki.length ? `${sonraki[0]} (${sonraki[0] - y} yıl sonra)` : '—'],
        ['Önceki aynı takvimli yıl', onceki.length ? `${onceki[0]} (${y - onceki[0]} yıl önce)` : '1583 sonrasında yok'],
        ['Yılın yapısı', `${gunler[g0]} günü başlar, ${gunler[son.getUTCDay()]} günü biter; ${a0 ? '366 gün (artık yıl)' : '365 gün (artık yıl değil)'}`],
        ['Sonraki yıllar', sonraki.length ? sonraki.join(', ') : '—'],
        ['Önceki yıllar', onceki.length ? onceki.join(', ') : '1583 sonrasında yok'],
      ],
      note: 'İki yılın takvimi, 1 Ocak aynı güne denk geliyorsa ve ikisi de artık yıl ya da ikisi de normal yıl ise aynıdır. Dinî bayramlar ve Ay takvimine bağlı günler bu eşleşmeye dahil değildir.',
    };
  },
  cases: [
    { in: { yil: '2026', adet: '5' }, out: { 'Sonraki aynı takvimli yıl': '2037 (11 yıl sonra)', 'Önceki aynı takvimli yıl': '2015 (11 yıl önce)', 'Yılın yapısı': 'Perşembe günü başlar, Perşembe günü biter; 365 gün (artık yıl değil)', 'Sonraki yıllar': '2037, 2043, 2054, 2065, 2071', 'Önceki yıllar': '2015, 2009, 1998, 1987, 1981' } },
    { in: { yil: '2024', adet: '2' }, out: { 'Sonraki aynı takvimli yıl': '2052 (28 yıl sonra)', 'Önceki aynı takvimli yıl': '1996 (28 yıl önce)', 'Yılın yapısı': 'Pazartesi günü başlar, Salı günü biter; 366 gün (artık yıl)', 'Sonraki yıllar': '2052, 2080' } },
    { in: { yil: '2000', adet: '1' }, out: { 'Sonraki aynı takvimli yıl': '2028 (28 yıl sonra)', 'Önceki aynı takvimli yıl': '1972 (28 yıl önce)' } },
    { in: { yil: '2023', adet: '1' }, out: { 'Sonraki aynı takvimli yıl': '2034 (11 yıl sonra)', 'Önceki aynı takvimli yıl': '2017 (6 yıl önce)' } },
    { in: { yil: '1900', adet: '1' }, out: { 'Sonraki aynı takvimli yıl': '1906 (6 yıl sonra)', 'Önceki aynı takvimli yıl': '1894 (6 yıl önce)' } },
    { in: { yil: '2025', adet: '3' }, out: { 'Sonraki yıllar': '2031, 2042, 2053', 'Önceki yıllar': '2014, 2003, 1997' } },
    { in: { yil: '1500', adet: '5' }, error: true },
    { in: { yil: 'iki bin', adet: '5' }, error: true },
    { in: { yil: '2026', adet: '50' }, error: true },
  ],
  howto: [
    '"Yıl" alanına takvimini karşılaştırmak istediğiniz yılı yazın.',
    'Kaç eşleşen yıl görmek istediğinizi ikinci alanda belirtin; varsayılan değer her yönde beş yıldır.',
    '"Bul" düğmesine basın. İlk iki satır en yakın sonraki ve önceki eş takvimli yılı, aradaki yıl farkıyla birlikte gösterir.',
    '"Yılın yapısı" satırından yılın hangi gün başlayıp bittiğini ve artık yıl olup olmadığını kontrol edin.',
    'Tam listeyi "Sonraki yıllar" ve "Önceki yıllar" satırlarından okuyun ya da kopyalayın.',
  ],
  sections: [
    { h: 'İki yılın takvimi ne zaman aynı olur?', p: [
      'Bir yılın takvimini tümüyle belirleyen yalnızca iki bilgi vardır: <strong>1 Ocak haftanın hangi gününe denk geliyor</strong> ve <strong>yıl artık yıl mı</strong>. Bu ikisi aynıysa yılın bütün tarihleri aynı günlere düşer; ocak ayının ilk pazartesisinden aralığın son cumasına kadar her şey örtüşür.',
      'Haftanın yedi günü ve iki tür yıl (365 ve 366 günlük) olduğuna göre, Miladi takvimde yalnızca <strong>14 farklı yıllık takvim</strong> vardır. Geçmişteki ve gelecekteki bütün yıllar bu 14 kalıptan birini kullanır. Araç, yazdığınız yılın kalıbını bulur ve aynı kalıbı kullanan diğer yılları listeler.',
    ] },
    { h: 'Takvim neden her yıl bir gün kayar?', p: [
      'Normal bir yıl 365 gündür; bu 52 hafta ve 1 gün eder. Fazladan kalan bu bir gün yüzünden bir sonraki yıl haftanın bir gün ilerisinde başlar. Artık yıl 366 gün sürdüğü için ardından gelen yıl iki gün ileride başlar. Kaymalar toplamı 7\'nin katına ulaştığında ve artık yıl durumu da uyuştuğunda takvim yeniden aynı olur.',
      'Normal yıllar için bu tekrar çoğunlukla <strong>6 ya da 11 yıl</strong> arayla gerçekleşir ve aralıklar 6, 11, 11 biçiminde dönüşümlü sıralanır. Artık yılların takvimi ise genellikle <strong>28 yılda bir</strong> tekrar eder, çünkü hem dört yıllık artık yıl döngüsünün hem yedi günlük haftanın tamamlanması gerekir.',
    ] },
    { h: 'Çözümlü örnek: 2026', p: [
      '2026 yılı perşembe günü başlar ve artık yıl değildir. Bir sonraki yıllara bakalım: 2027 cuma, 2028 cumartesi günü başlar; 2028 artık yıl olduğundan 2029 iki gün atlayıp pazartesi başlar. Bu biçimde ilerlendiğinde perşembe günü başlayan ilk normal yıl <strong>2037</strong> olur; aradaki fark 11 yıldır. Geriye doğru aynı sayım <strong>2015</strong> yılını verir.',
      'Yani 2015 yılına ait bir duvar takvimi 2026\'da, 2026 takvimi de 2037\'de gün gün doğru gösterir. Araç listeyi uzatır: 2026\'dan sonra 2037, 2043, 2054, 2065 ve 2071; öncesinde 2015, 2009, 1998, 1987 ve 1981 aynı takvime sahiptir. Aralıkların 11, 6, 11, 11, 6 biçiminde ilerlediğine dikkat edin.',
      'Artık yıl örneği olarak 2024\'ü alalım: pazartesi günü başlayan 366 günlük bir yıldır. Aynı takvim 28 yıl önce 1996\'da kullanılmıştır ve 28 yıl sonra 2052\'de yeniden kullanılacaktır.',
    ] },
    { h: 'Yüzyıl dönümlerindeki istisna', p: [
      'Miladi takvimde dörde bölünen yıllar artık yıldır, ancak 100\'e bölünüp 400\'e bölünmeyen yıllar bu kuralın dışındadır. 1900 artık yıl değildi, 2100 de olmayacak; 2000 ise 400\'e bölündüğü için artık yıldı. Bu istisna 28 yıllık düzeni bozar: 1900\'ü ya da 2100\'ü içine alan aralıklarda tekrar süreleri 6, 11, 12 ya da 40 yıl gibi farklı değerler alabilir.',
      'Tam düzen ancak <strong>400 yılda bir</strong> kendini tekrar eder; 400 yıllık Miladi döngü tam 146.097 gündür ve bu sayı 7\'ye kalansız bölünür. Dolayısıyla herhangi bir yılın takvimi 400 yıl sonrasıyla kesinlikle aynıdır. Araç kısa yol kullanmaz, her yılı tek tek sınadığı için bu istisnaları doğru yansıtır.',
    ] },
    { h: 'Bu bilgi ne işe yarar?', ul: [
      '<strong>Eski takvimleri değerlendirmek:</strong> Beğendiğiniz bir duvar takvimini ya da koleksiyon takvimini hangi yıl yeniden asabileceğinizi öğrenirsiniz.',
      '<strong>Baskı ve tasarım:</strong> Önceden hazırlanmış bir takvim şablonunun hangi yıllarda değiştirilmeden kullanılabileceğini görürsünüz.',
      '<strong>Planlama:</strong> Yıllık vardiya, ders ya da etkinlik çizelgesini eş takvimli bir yıldan kopyalayabilirsiniz; tarih-gün eşleşmeleri aynı kalır.',
      '<strong>Merak ve bilgi yarışmaları:</strong> Doğduğunuz yılın takviminin hangi yıllarda tekrarlandığını bulabilirsiniz.',
      '<strong>Tarih araştırması:</strong> Eski bir belgedeki gün ve tarih bilgisini, takvimi bilinen eş bir yılla karşılaştırarak sınayabilirsiniz.',
    ] },
    { h: 'Sınırlar', p: [
      'Eşleşme yalnızca Miladi takvimin tarih ve gün düzeni için geçerlidir. Ramazan ve Kurban bayramları gibi Hicri takvime bağlı günler her yıl yaklaşık 10–11 gün geri kaydığı için eş takvimli yıllarda aynı tarihlere düşmez; takvimdeki bayram işaretleri bu yüzden uymaz. Resmî tatil düzenlemeleri, yaz saati uygulaması ve Ay evreleri de yıldan yıla değişir.',
      'Araç 1583 ve sonrasındaki yılları kabul eder; Miladi takvim 1582\'de yürürlüğe girmiş, ülkeler ise farklı tarihlerde benimsemiştir. Türkiye\'de Miladi takvimin resmî kullanımı 1926\'da başladığından, daha eski yıllar için gösterilen gün adları o dönemde kullanılan takvimle birebir örtüşmeyebilir.',
    ] },
  ],
  faq: [
    ['2026 takvimi hangi yılların takvimiyle aynı?', '2026 perşembe günü başlayan normal bir yıldır. Aynı takvim en son 2015\'te kullanılmıştır; 2026\'dan sonra ilk olarak 2037\'de, ardından 2043 ve 2054\'te tekrarlanır.'],
    ['Takvim kaç yılda bir tekrar eder?', 'Normal yıllarda çoğunlukla 6 ya da 11 yıl arayla, artık yıllarda genellikle 28 yılda bir tekrar eder. Yüzyıl dönümlerindeki artık yıl istisnası bu aralıkları değiştirebilir. Tam döngü 400 yıldır.'],
    ['Kaç farklı yıllık takvim vardır?', 'On dört. Yıl haftanın yedi gününden birinde başlayabilir ve artık ya da normal olabilir; 7 × 2 = 14 farklı düzen ortaya çıkar. Her yıl bunlardan birini kullanır.'],
    ['Eski takvimimi aynen kullanabilir miyim?', 'Tarih ve gün eşleşmeleri bakımından evet. Ancak üzerindeki dinî bayramlar, resmî tatil işaretleri ve Ay evreleri yeni yılla uyuşmaz; bunları ayrıca kontrol etmeniz gerekir.'],
    ['Artık yılın takvimi normal bir yılla aynı olabilir mi?', 'Tam olarak hayır. Artık yılda 29 Şubat bulunduğu için mart ayından itibaren günler bir kayar. Yalnızca ocak ve şubat ayları, aynı gün başlayan normal bir yılla örtüşür.'],
    ['Neden 1583 öncesi yıllar kabul edilmiyor?', 'Miladi takvim Ekim 1582\'de uygulanmaya başlamıştır; öncesinde Jülyen takvimi kullanılıyordu ve gün düzeni farklıydı. Yanıltıcı sonuç vermemek için araç, Miladi takvimin tam yıl olarak geçerli olduğu 1583\'ten başlar.'],
    ['Doğum günüm hangi yıllarda aynı güne denk gelir?', 'Doğduğunuz yılla aynı takvime sahip yıllarda doğum gününüz doğduğunuz günün aynısına denk gelir. Bunun dışında başka yıllarda da aynı güne rastlayabilir; çünkü tek bir tarihin günü, tüm takvimin eşleşmesinden daha sık tekrar eder.'],
    ['Girdiğim yıl kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdıklarınız sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['artik-yil-kontrol', 'hangi-gun-hesapla', 'takvim-olustur', 'yilin-kacinci-gunu', 'ay-kac-gun'],
};
