export default {
  slug: 'satir-sayaci',
  title: 'Satır Sayacı',
  h1Tail: 'metindeki satırları sayın',
  pageTitle: 'Satır Sayacı – Metindeki Dolu ve Boş Satır Sayısını Bulun',
  description: 'Metninizdeki toplam, dolu ve boş satır sayısını, en uzun satırı, ortalama satır uzunluğunu ve benzersiz satır sayısını anında görün. Liste ve kod için uygundur.',
  card: 'Metindeki toplam, dolu ve boş satırları sayın; en uzun satırı ve benzersiz satır sayısını görün.',
  category: 'metin',
  keywords: ['satır sayacı', 'satır sayısı bulma', 'metinde kaç satır var', 'satır sayma', 'boş satır sayısı', 'listede kaç satır var', 'online satır sayacı', 'kod satırı sayma'],
  lead: 'Bir listeyi, kod parçasını ya da düz metni yapıştırın; kaç satır olduğunu, bunların kaçının <strong>dolu</strong> kaçının <strong>boş</strong> olduğunu ve en uzun satırın hangisi olduğunu hemen öğrenin. Aynı satırın tekrar edip etmediğini anlamak için benzersiz satır sayısı da gösterilir.',
  button: 'Say',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Satırlarını saymak istediğiniz metni ya da listeyi buraya yapıştırın', wide: true },
  ],
  compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s === '') h.err('Satırlarını saymak için "Metin" alanına bir metin ya da liste yapıştırın.');
    const satirlar = s.split('\n');
    // Metin satır sonuyla bitiyorsa sondaki boş parça ayrı satır sayılmaz
    if (satirlar.length > 1 && satirlar[satirlar.length - 1] === '') satirlar.pop();
    const uz = satirlar.map((x) => Array.from(x).length);
    const dolu = satirlar.map((x, i) => ({ x, i })).filter((o) => o.x.trim() !== '');
    const doluUz = dolu.map((o) => uz[o.i]);
    const enUzun = Math.max(...uz);
    const enKisa = doluUz.length ? Math.min(...doluUz) : 0;
    const benzersiz = new Set(dolu.map((o) => o.x.trim())).size;
    const karakter = uz.reduce((a, b) => a + b, 0);
    return {
      rows: [
        ['Toplam satır', h.fmt(satirlar.length, 0)],
        ['Dolu satır', h.fmt(dolu.length, 0)],
        ['Boş satır', h.fmt(satirlar.length - dolu.length, 0)],
        ['Benzersiz dolu satır', h.fmt(benzersiz, 0)],
        ['En uzun satır', `${h.fmt(enUzun, 0)} karakter (${uz.indexOf(enUzun) + 1}. satır)`],
        ['En kısa dolu satır', dolu.length ? `${h.fmt(enKisa, 0)} karakter (${dolu[doluUz.indexOf(enKisa)].i + 1}. satır)` : 'Dolu satır yok'],
        ['Ortalama dolu satır uzunluğu', h.fmt(dolu.length ? doluUz.reduce((a, b) => a + b, 0) / dolu.length : 0, 2) + ' karakter'],
        ['Toplam karakter', h.fmt(karakter, 0)],
      ],
      note: 'Yalnızca boşluk ya da sekme içeren satırlar boş sayılır. Toplam karaktere satır sonu karakterleri dahil değildir. Benzersiz satırlar baştaki ve sondaki boşluklar yok sayılarak karşılaştırılır.',
    };
  },
  cases: [
    { in: { metin: 'elma\narmut\n\nkiraz' }, out: { 'Toplam satır': '4', 'Dolu satır': '3', 'Boş satır': '1', 'Benzersiz dolu satır': '3', 'En uzun satır': '5 karakter (2. satır)', 'En kısa dolu satır': '4 karakter (1. satır)', 'Ortalama dolu satır uzunluğu': '4,67 karakter', 'Toplam karakter': '14' } },
    { in: { metin: 'ali\nveli\nali\nayşe\nveli' }, out: { 'Toplam satır': '5', 'Dolu satır': '5', 'Boş satır': '0', 'Benzersiz dolu satır': '3' } },
    { in: { metin: 'a\nb\nc\n' }, out: { 'Toplam satır': '3', 'Dolu satır': '3', 'Toplam karakter': '3' } },
    { in: { metin: 'tek satır' }, out: { 'Toplam satır': '1', 'En uzun satır': '9 karakter (1. satır)', 'Toplam karakter': '9' } },
    { in: { metin: 'bir\r\niki\r\nüç' }, out: { 'Toplam satır': '3', 'Boş satır': '0', 'Toplam karakter': '8' } },
    { in: { metin: 'x\n\n\n' }, out: { 'Toplam satır': '3', 'Dolu satır': '1', 'Boş satır': '2' } },
    { in: { metin: '  \n\t' }, out: { 'Toplam satır': '2', 'Dolu satır': '0', 'Boş satır': '2', 'En kısa dolu satır': 'Dolu satır yok' } },
    { in: { metin: '' }, error: true },
  ],
  howto: [
    'Saymak istediğiniz metni, listeyi ya da kod parçasını "Metin" kutusuna yapıştırın.',
    '"Say" düğmesine basın. İlk satırda toplam satır sayısı, altında dolu ve boş satır sayıları görünür.',
    '"Benzersiz dolu satır" değerini "Dolu satır" değeriyle karşılaştırın; ikisi farklıysa listenizde tekrar eden satırlar vardır.',
    '"En uzun satır" bilgisindeki sıra numarasıyla sınırı aşan satırı bulun, gerekiyorsa düzeltip yeniden sayın.',
  ],
  sections: [
    { h: 'Satır nasıl sayılır?', p: [
      'Bilgisayarda satır, iki satır sonu karakteri arasında kalan metin parçasıdır. Enter tuşuna her bastığınızda metne görünmeyen bir satır sonu karakteri eklenir; sayaç da metni bu karakterlerden böler. Burada sayılan şey ekranda gördüğünüz <em>görsel</em> satırlar değildir: pencere dar olduğu için alt satıra kayan uzun bir paragraf, içinde satır sonu karakteri bulunmadığı sürece tek satırdır. Pencereyi genişletip daralttığınızda görsel satır sayısı değişir, gerçek satır sayısı değişmez.',
      'Windows, satır sonunu iki karakterle (CR ve LF), Linux ve macOS tek karakterle (LF) gösterir. Araç her iki biçimi ve eski Mac biçimini de tek satır sonu olarak tanır; dosyanın hangi sistemde hazırlandığı sonucu etkilemez.',
    ] },
    { h: 'Sondaki satır sonu ve boş satırlar', p: [
      'Metin dosyalarının çoğu son satırdan sonra bir satır sonu karakteriyle biter. Bu karakter yeni bir satır açmaz, yalnızca son satırı kapatır. Bu yüzden "a", "b", "c" satırlarından oluşan ve sonunda Enter bulunan bir metin 4 değil 3 satırdır; metin düzenleyicilerin ve komut satırı araçlarının çoğu da aynı biçimde sayar. Metnin sonunda birden çok Enter varsa yalnızca en sondaki yok sayılır, diğerleri boş satır olarak sayıma girer.',
      'İçinde hiçbir karakter bulunmayan satırlarla birlikte, yalnızca boşluk ya da sekme içeren satırlar da boş kabul edilir. Gözle bakıldığında ikisi aynı görünür, ama ikincisinde görünmeyen karakterler vardır; bu karakterler "Toplam karakter" değerine eklenir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Dört satırlık şu listeyi sayalım: birinci satır "elma", ikinci satır "armut", üçüncü satır boş, dördüncü satır "kiraz". Toplam satır 4, dolu satır 3, boş satır 1\'dir. Satır uzunlukları sırasıyla 4, 5, 0 ve 5 karakterdir. En uzun satır 5 karakterdir; "armut" ile "kiraz" eşit uzunlukta olduğundan ilk karşılaşılan, yani 2. satır gösterilir. En kısa dolu satır 4 karakterle 1. satırdır. Dolu satırların ortalama uzunluğu (4 + 5 + 5) ÷ 3 = 4,67 karakter, toplam karakter ise 14\'tür.',
      'İkinci örnekte "ali, veli, ali, ayşe, veli" adları alt alta yazılmış olsun. Toplam ve dolu satır 5\'tir, ancak benzersiz dolu satır 3 çıkar; çünkü "ali" ve "veli" ikişer kez geçer. Aradaki 2 satırlık fark, listede iki tekrar bulunduğunu söyler.',
    ] },
    { h: 'Nerelerde işe yarar?', ul: [
      '<strong>Listeler:</strong> bir e-posta listesinde, stok kodu dökümünde ya da katılımcı listesinde kaç kayıt olduğunu saymak.',
      '<strong>Tablo verisi:</strong> CSV dosyasından kopyalanan verinin satır sayısını, içe aktarmadan önce beklenen kayıt sayısıyla karşılaştırmak.',
      '<strong>Kod:</strong> bir işlevin ya da dosyanın kaç satır tuttuğunu görmek; boş satırlar ayrı sayıldığı için dolu satır sayısı kabaca kod yoğunluğunu verir.',
      '<strong>Satır uzunluğu sınırı:</strong> kod biçimlendirme kuralları ya da düz metin e-postalar için belirlenen karakter sınırını aşan satırı bulmak.',
      '<strong>Şiir ve şarkı sözü:</strong> dize sayısını ve kıta aralarındaki boş satırları saymak.',
      '<strong>Altyazı ve senaryo:</strong> satır başına düşen karakter sayısının okunabilir sınırlar içinde kalıp kalmadığını denetlemek.',
    ] },
    { h: 'Benzersiz satır sayısı ne anlatır?', p: [
      'Benzersiz dolu satır değeri, aynı içerik birden çok kez geçse bile her farklı satırı bir kez sayar. Karşılaştırma büyük-küçük harfe duyarlıdır: "Ankara" ile "ankara" iki ayrı satır kabul edilir. Buna karşılık satırın başındaki ve sonundaki boşluklar dikkate alınmaz; yanlışlıkla sonuna boşluk eklenmiş bir kayıt, boşluksuz eşiyle aynı sayılır. Dolu satır sayısı ile benzersiz satır sayısı eşitse listenizde tekrar yoktur. Farklıysa aradaki fark, silinmesi gereken fazlalık satır sayısını verir.',
    ] },
    { h: 'Sınırlar', p: [
      'Karakter sayımı Unicode kod noktalarına göre yapılır; Türkçe harfler ve çoğu emoji tek karakter sayılır. Birden çok kod noktasının birleşmesiyle oluşan bazı emoji ve bayraklar ise birden fazla karakter olarak sayılabilir. Sekme karakteri ekranda birkaç boşluk genişliğinde görünse de tek karakterdir. Kod satırı sayımında araç yorum satırlarını ayırt etmez; yorumlar da dolu satır olarak sayılır. Çok büyük metinlerde sayım süresi cihazınızın belleğine ve hızına bağlıdır, çünkü işlem tümüyle tarayıcınızda yürür.',
    ] },
  ],
  faq: [
    ['Satır sayısı nasıl hesaplanır?', 'Metin satır sonu karakterlerinden bölünür ve ortaya çıkan parçalar sayılır. Metin bir satır sonuyla bitiyorsa en sondaki boş parça ayrı bir satır olarak sayılmaz.'],
    ['Ekranda alt satıra kayan uzun paragraf kaç satır sayılır?', 'Tek satır sayılır. Araç pencere genişliğine bağlı görsel satırları değil, Enter tuşuyla oluşturulmuş gerçek satırları sayar.'],
    ['Boş satırlar toplam sayıya dahil mi?', 'Evet. Toplam satır, dolu ve boş satırların toplamıdır. Yalnızca içinde yazı bulunan satırları öğrenmek için "Dolu satır" değerine bakın.'],
    ['İçinde yalnızca boşluk olan satır dolu mu sayılır?', 'Hayır. Yalnızca boşluk ya da sekme karakteri içeren satırlar boş kabul edilir. Bu satırlardaki görünmeyen karakterler toplam karakter sayısına ise eklenir.'],
    ['Windows ve Linux dosyalarında sonuç değişir mi?', 'Hayır. Windows\'un iki karakterli satır sonu da Linux ve macOS\'un tek karakterli satır sonu da tek bir satır sonu olarak tanınır; satır sayısı aynı çıkar.'],
    ['Excel\'den kopyaladığım sütunda kaç hücre olduğunu sayabilir miyim?', 'Evet. Bir sütunu kopyalayıp yapıştırdığınızda her hücre ayrı satıra düşer; dolu satır sayısı dolu hücre sayısını verir. Hücre içinde satır sonu bulunan kayıtlar birden fazla satır olarak sayılabilir.'],
    ['Tekrar eden satır olup olmadığını nasıl anlarım?', '"Dolu satır" ile "Benzersiz dolu satır" değerlerini karşılaştırın. Benzersiz satır sayısı daha küçükse aradaki fark kadar tekrar vardır.'],
    ['Yapıştırdığım liste bir yere gönderiliyor mu?', 'Hayır. Sayım tarayıcınızın içinde yapılır; metniniz ya da listeniz sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['paragraf-sayaci', 'kelime-sayaci', 'karakter-sayaci', 'tekrar-eden-satirlari-sil', 'bos-satirlari-sil', 'satir-numarasi-ekle'],
};
