export default {
  slug: 'twitter-karakter-sayaci',
  title: 'Sosyal Medya Karakter Sınırı Sayacı',
  h1Tail: 'gönderi sınıra sığıyor mu?',
  pageTitle: 'Sosyal Medya Karakter Sınırı Sayacı – 280 Karakter Gönderi Sayacı',
  description: 'Gönderi metninizin karakter sınırına sığıp sığmadığını görün. Kalan karakter, doluluk oranı, etiket ve bağlantı sayısı; bağlantı ve emoji için ağırlıklı sayım seçeneği.',
  card: 'Gönderinizin karakter sınırına sığıp sığmadığını, kalan karakteri, etiket ve bağlantı sayısını görün.',
  category: 'metin',
  keywords: ['karakter sınırı sayacı', '280 karakter sayacı', 'sosyal medya karakter sayacı', 'gönderi karakter sayısı', 'tweet karakter sayacı', 'kalan karakter hesaplama', 'biyografi karakter sınırı', 'etiket sayacı'],
  lead: 'Paylaşmadan önce metninizi buraya yapıştırın ve sınırı yazın. Araç, kullanılan ve <strong>kalan karakteri</strong>, doluluk oranını, etiket, bahsetme ve bağlantı sayısını gösterir; sınır aşılıyorsa metnin kaç gönderiye bölünmesi gerektiğini de söyler.',
  button: 'Say',
  inputs: [
    { id: 'metin', label: 'Gönderi metni', type: 'textarea', placeholder: 'Paylaşacağınız metni buraya yazın ya da yapıştırın', wide: true },
    { id: 'sinir', label: 'Karakter sınırı', type: 'number', value: '280', hint: 'Paylaşım yapacağınız alanın güncel sınırını yazın (örn. 280, 150, 2200).' },
    { id: 'sayim', label: 'Sayım yöntemi', type: 'select', options: [['basit', 'Basit: her karakter 1'], ['agirlikli', 'Ağırlıklı: bağlantı 23, emoji 2']] },
  ],
  compute(v, h) {
    const metin = String(v.metin ?? '').replace(/\r\n?/g, '\n').normalize('NFC');
    if (metin.trim() === '') h.err('Saymak için "Gönderi metni" alanına bir metin yazın.');
    const sinir = h.posint(v.sinir, 'Karakter sınırı');
    const parcala = (s) => {
      if (typeof Intl !== 'undefined' && Intl.Segmenter) return [...new Intl.Segmenter('tr', { granularity: 'grapheme' }).segment(s)].map((x) => x.segment);
      return Array.from(s);
    };
    const duz = parcala(metin).length;
    const agirlik = (s) => {
      let t = 0;
      for (const g of parcala(s)) {
        if (/\p{Extended_Pictographic}|[\u{1F1E6}-\u{1F1FF}]/u.test(g)) { t += 2; continue; }
        for (const ch of g) {
          const c = ch.codePointAt(0);
          t += (c <= 0x10FF || (c >= 0x2000 && c <= 0x200D) || (c >= 0x2010 && c <= 0x201F) || (c >= 0x2032 && c <= 0x2037)) ? 1 : 2;
        }
      }
      return t;
    };
    const urlRe = /https?:\/\/[^\s]+/gi;
    const baglantilar = metin.match(urlRe) || [];
    let sayi = duz;
    if (v.sayim === 'agirlikli') sayi = agirlik(metin.replace(urlRe, '')) + baglantilar.length * 23;
    const kalan = sinir - sayi;
    const etiket = (metin.match(/(^|[^\p{L}\p{N}_])#[\p{L}\p{N}_]+/gu) || []).length;
    const bahsetme = (metin.match(/(^|[^\p{L}\p{N}_])@[A-Za-z0-9_]+/g) || []).length;
    const kelime = metin.split(/\s+/).filter(Boolean).length;
    return {
      rows: [
        ['Durum', kalan >= 0 ? `Sınırın içinde: ${h.fmt(kalan, 0)} karakter kaldı` : `Sınır aşıldı: ${h.fmt(-kalan, 0)} karakter fazla`],
        ['Kullanılan / sınır', `${h.fmt(sayi, 0)} / ${h.fmt(sinir, 0)}`],
        ['Doluluk', `%${h.fmt(sayi / sinir * 100, 1)}`],
        ['Düz karakter sayısı', h.fmt(duz, 0)],
        ['Kelime', h.fmt(kelime, 0)],
        ['Etiket (#)', String(etiket)],
        ['Bahsetme (@)', String(bahsetme)],
        ['Bağlantı', String(baglantilar.length)],
        ['Bölünürse gereken gönderi', String(Math.ceil(sayi / sinir))],
      ],
      note: v.sayim === 'agirlikli'
        ? 'Ağırlıklı sayımda http:// ya da https:// ile başlayan her bağlantı 23, her emoji 2, diğer harfler 1 karakter sayılır. Platformlar kuralı değiştirebilir; son kontrolü paylaşım ekranında yapın.'
        : 'Basit sayımda boşluklar ve satır sonları dahil görünen her karakter 1 sayılır.',
    };
  },
  cases: [
    { in: { metin: 'Merhaba dünya!', sinir: '280', sayim: 'basit' }, out: { 'Durum': 'Sınırın içinde: 266 karakter kaldı', 'Kullanılan / sınır': '14 / 280', 'Doluluk': '%5', 'Kelime': '2' } },
    { in: { metin: 'Bu metin sınırı aşar', sinir: '10', sayim: 'basit' }, out: { 'Durum': 'Sınır aşıldı: 10 karakter fazla', 'Kullanılan / sınır': '20 / 10', 'Doluluk': '%200', 'Bölünürse gereken gönderi': '2' } },
    { in: { metin: 'Yeni yazımız yayında: https://ornek.com/blog/cok-uzun-bir-baslik-buraya #blog', sinir: '280', sayim: 'agirlikli' }, out: { 'Kullanılan / sınır': '51 / 280', 'Düz karakter sayısı': '77', 'Bağlantı': '1', 'Etiket (#)': '1' } },
    { in: { metin: 'Harika 🎉🎉', sinir: '280', sayim: 'agirlikli' }, out: { 'Kullanılan / sınır': '11 / 280', 'Düz karakter sayısı': '9' } },
    { in: { metin: 'Selam', sinir: '5' }, out: { 'Durum': 'Sınırın içinde: 0 karakter kaldı', 'Doluluk': '%100', 'Bölünürse gereken gönderi': '1' } },
    { in: { metin: '@ali ve @veli_34 #bir #çay saati', sinir: '280' }, out: { 'Bahsetme (@)': '2', 'Etiket (#)': '2', 'Kelime': '6' } },
    { in: { metin: 'Şğıİöü çÇ', sinir: '280', sayim: 'agirlikli' }, out: { 'Kullanılan / sınır': '9 / 280' } },
    { in: { metin: '', sinir: '280' }, error: true },
    { in: { metin: 'deneme', sinir: '0' }, error: true },
    { in: { metin: 'deneme', sinir: 'iki yüz' }, error: true },
  ],
  howto: [
    'Paylaşacağınız metni "Gönderi metni" kutusuna yazın ya da yapıştırın.',
    '"Karakter sınırı" alanına paylaşım yapacağınız yerin sınırını girin. Varsayılan değer, kısa gönderilerde yaygın olan 280\'dir.',
    'Bağlantı ve emoji içeren kısa gönderilerde platformun kendi sayımına yaklaşmak için "Ağırlıklı" yöntemi, diğer durumlarda "Basit" yöntemi seçin.',
    '"Say" düğmesine basın. İlk satır metnin sınıra sığıp sığmadığını ve kaç karakter kaldığını ya da taştığını gösterir.',
    'Sınır aşıldıysa metni kısaltın ya da "Bölünürse gereken gönderi" satırına bakarak kaç parçalık bir dizi gerektiğini görün.',
  ],
  sections: [
    { h: 'Karakter sınırı neden önemli?', p: [
      'Sosyal medya platformlarının neredeyse tamamı gönderi, yorum, profil açıklaması ve kullanıcı adı alanlarına bir üst sınır koyar. Sınırı aşan metin ya hiç gönderilemez ya da görünmeyen bir yerinden kesilir; ikinci durum daha kötüdür, çünkü çağrı cümleniz ya da bağlantınız kesilen kısımda kalabilir. Metni önceden saymak, özellikle birden fazla hesaba aynı anda içerik hazırlayanlar ve planlama aracı kullananlar için yayın anındaki sürprizleri önler.',
      'Sınırlar platformdan platforma, hatta aynı platformda hesap türüne göre değişir ve zaman içinde güncellenir. Bu yüzden araç sabit bir platform listesi dayatmaz; sınırı siz yazarsınız. Paylaşım ekranında gördüğünüz güncel değeri girmeniz en doğru sonucu verir.',
    ] },
    { h: 'Basit ve ağırlıklı sayım arasındaki fark', p: [
      '<strong>Basit sayım</strong>, ekranda gördüğünüz her karakteri 1 sayar: harfler, rakamlar, boşluklar, noktalama işaretleri ve satır sonları dahildir. Bir emoji, birkaç kod noktasından oluşsa bile (örneğin bayraklar ya da ten rengi seçilmiş el işaretleri) tek karakter sayılır. Profil açıklaması, yorum, ilan başlığı gibi alanların çoğunda bu yöntem yeterince yakındır.',
      '<strong>Ağırlıklı sayım</strong>, 280 karakter sınırlı kısa gönderilerde yaygınlaşmış kuralı uygular: <code>http</code> ya da <code>https</code> protokolüyle başlayan her bağlantı, gerçek uzunluğu ne olursa olsun <strong>23 karakter</strong> sayılır; her emoji <strong>2 karakter</strong> sayılır; Latin harfleri (Türkçedeki ş, ğ, ı, İ, ö, ü, ç dahil) 1 karakter, Çince, Japonca ve Korece gibi yazıların karakterleri 2 karakter sayılır. Bağlantıların sabit sayılması, platformun adresleri kendi kısaltma hizmetinden geçirmesinden kaynaklanır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Şu gönderiyi ele alalım: "Yeni yazımız yayında:" ifadesi, ardından 49 karakter uzunluğunda bir bağlantı ve sonunda "#blog" etiketi. Basit sayımda metnin tamamı 77 karakterdir: bağlantıdan önceki bölüm boşluğuyla birlikte 22, bağlantı 49, bağlantıdan sonraki boşluk ve etiket 6 karakter.',
      'Ağırlıklı sayımda bağlantı 49 yerine 23 sayılır: 22 + 23 + 6 = <strong>51 karakter</strong>. 280 sınırına göre 229 karakter kalır. Görüldüğü gibi uzun bir adres paylaşmak ağırlıklı sayımda gönderiyi şişirmez; buna karşılık 10 karakterlik çok kısa bir adres bile 23 sayılır. İkinci bir örnek: "Harika" kelimesi, bir boşluk ve iki kutlama emojisi basit sayımda 9, ağırlıklı sayımda 6 + 1 + 2 + 2 = 11 karakter eder.',
    ] },
    { h: 'Sınıra sığdırmak için pratik öneriler', ul: [
      'Önce dolgu kelimeleri atın: "aslında", "bir nevi", "şu an itibarıyla" gibi ifadeler anlam kaybı olmadan silinebilir.',
      'Sayıları rakamla yazın: "yüzde yirmi beş" yerine "%25" on karakterden fazla kazandırır.',
      'Etiketleri cümlenin içine yerleştirin: sonda ayrıca "#kampanya" yazmak yerine cümledeki kampanya kelimesini etikete çevirin.',
      'Çift boşlukları ve gereksiz satır sonlarını temizleyin; her biri bir karakterdir.',
      'Metin yine de sığmıyorsa bölün. Parçaları cümle sonlarından ayırın ve her parçanın tek başına anlaşılır olmasına dikkat edin; "1/3" gibi numaralandırmanın da karakter harcadığını hesaba katın.',
    ] },
    { h: 'Etiket, bahsetme ve bağlantı sayıları', p: [
      'Araç, <strong>#</strong> ile başlayan etiketleri ve <strong>@</strong> ile başlayan bahsetmeleri ayrıca sayar. Etiketlerde Türkçe harfler geçerlidir; "#çay" bir etiket olarak sayılır. Kelimenin ortasındaki işaretler (örneğin bir e-posta adresindeki @) bahsetme sayılmaz. Bağlantı sayısına yalnızca <code>http</code> ya da <code>https</code> protokolüyle başlayan adresler girer; başında protokol olmayan alan adları düz metin olarak sayılır. Çok sayıda etiket hem karakter harcar hem de gönderinin okunmasını zorlaştırır; etiket sayısını görmek ölçüyü kaçırmamanıza yardım eder.',
    ] },
    { h: 'Sınırlar ve dikkat edilecekler', p: [
      'Buradaki ağırlıklı sayım, yaygın kuralın sadeleştirilmiş bir uygulamasıdır. Platformlar bağlantı tanıma, emoji dizileri ve özel karakterler konusunda ayrıntılı ve değişebilen kurallar kullanır; sınıra bir iki karakter kala paylaşım ekranındaki sayaç ile bu araç arasında küçük farklar görülebilir. Sınırın tam üstünde duran metinlerde birkaç karakterlik pay bırakmak ya da son kontrolü paylaşım ekranında yapmak güvenlidir. Araç yalnızca metni sayar; görsel, video ya da anket gibi eklerin sınıra etkisini hesaplamaz.',
    ] },
  ],
  faq: [
    ['Boşluklar karaktere dahil mi?', 'Evet. Boşluklar, satır sonları ve noktalama işaretleri de birer karakterdir ve her iki sayım yönteminde de sayılır.'],
    ['Türkçe harfler iki karakter mi sayılır?', 'Hayır. ş, ğ, ı, İ, ö, ü ve ç harfleri hem basit hem ağırlıklı sayımda 1 karakterdir. İki karakter sayılanlar emojiler ve Doğu Asya yazılarının karakterleridir.'],
    ['Bağlantılar neden 23 karakter sayılıyor?', 'Kısa gönderi platformları adresleri kendi kısaltıcılarından geçirir ve uzunluğu ne olursa olsun sabit bir değer olarak sayar. Ağırlıklı sayım bu davranışı taklit eder; basit sayımda bağlantının gerçek uzunluğu kullanılır.'],
    ['Emoji kaç karakter sayılır?', 'Basit sayımda görünen her emoji 1 karakterdir. Ağırlıklı sayımda bayraklar ve birleşik emojiler dahil her emoji 2 karakter sayılır.'],
    ['Hangi sınırı yazmalıyım?', 'Paylaşım yapacağınız alanın o günkü sınırını yazın. Sınırlar platforma, alan türüne (gönderi, yorum, biyografi) ve hesap türüne göre değişir; en güvenilir kaynak platformun kendi yardım sayfası ya da paylaşım ekranındaki sayaçtır.'],
    ['"Bölünürse gereken gönderi" neyi gösterir?', 'Toplam karakter sayısının sınıra bölünüp yukarı yuvarlanmış hâlidir; metni dizi olarak paylaşırsanız en az kaç parça gerekeceğini bildirir. Parçaları kelime ortasından bölmeyeceğiniz ve numara ekleyebileceğiniz için gerçek sayı bir fazla çıkabilir.'],
    ['Biyografi ya da kullanıcı adı için kullanabilir miyim?', 'Evet. Sınır alanına ilgili değeri yazıp basit sayımı seçmeniz yeterlidir. Araç herhangi bir karakter sınırı için çalışır: ilan başlığı, ürün açıklaması, başvuru formundaki kısa yanıtlar gibi.'],
    ['Yazdığım gönderi bir yere kaydediliyor mu?', 'Hayır. Sayım tarayıcınızda yapılır; metniniz sunucuya gönderilmez, saklanmaz ve hiçbir sosyal medya hesabına bağlanılmaz.'],
  ],
  related: ['karakter-sayaci', 'sms-karakter-sayaci', 'kelime-sayaci', 'metin-kisalt', 'emoji-temizle', 'arama-sonucu-onizleme'],
};
