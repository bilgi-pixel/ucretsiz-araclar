export default {
  slug: 'ikili-metin-cevir',
  title: 'Metni İkili Koda (Binary) Çevirme',
  h1Tail: 'metin ↔ 0 ve 1',
  pageTitle: 'Metni İkili Koda (Binary) Çevirme – Binary Metin Çevirici',
  description: 'Metni 0 ve 1\'lerden oluşan ikili koda çevirin ya da ikili kodu yeniden metne dönüştürün. UTF-8 kullanır; Türkçe harfler ve emojiler doğru baytlarla kodlanır.',
  card: 'Yazıyı 0 ve 1\'lerden oluşan ikili koda çevirin ya da binary kodu metne geri dönüştürün; Türkçe karakterler UTF-8 ile doğru kodlanır.',
  category: 'metin',
  keywords: ['metni binary çevirme', 'ikili kod çevirici', 'binary to text', 'text to binary', 'binary metin çevirme', '0 1 kodu çözme', 'ikili sayı metin', 'isim binary yazma'],
  lead: 'Yazdığınız metni bilgisayarın sakladığı biçimde, <strong>0 ve 1\'lerden oluşan ikili koda</strong> çevirin ya da elinizdeki ikili kodu okunabilir metne dönüştürün. Kodlama UTF-8 ile yapılır; her bayt 8 bit olarak gösterilir ve Türkçe harfler de doğru biçimde çevrilir.',
  button: 'Çevir',
  inputs: [
    { id: 'girdi', label: 'Metin ya da ikili kod', type: 'textarea', placeholder: 'Merhaba   ya da   01001000 01101001', wide: true },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['ikili', 'Metin → İkili kod'], ['metin', 'İkili kod → Metin']] },
    { id: 'ayrac', label: 'Baytlar arası ayraç', type: 'select', options: [['bosluk', 'Boşluk'], ['yok', 'Ayraç yok (bitişik)'], ['satir', 'Her bayt ayrı satırda']] },
  ],
  compute(v, h) {
    const s = String(v.girdi ?? '');
    if (s.trim() === '') h.err('Çevirmek için kutuya bir metin ya da ikili kod yazın.');
    if (v.yon === 'metin') {
      const bitler = s.replace(/[\s,;]+/g, '');
      const kotu = /[^01]/.exec(bitler);
      if (kotu) h.err(`İkili kod yalnızca 0 ve 1 içerebilir; "${kotu[0]}" karakteri geçersiz. Metni koda çevirmek istiyorsanız yönü değiştirin.`);
      if (bitler.length % 8 !== 0) h.err(`İkili kod 8 bitlik baytlardan oluşmalı. Girilen ${bitler.length} bit 8'in katı değil; eksik ya da fazla basamak olup olmadığını denetleyin.`);
      const bayt = new Uint8Array(bitler.length / 8);
      for (let i = 0; i < bayt.length; i++) bayt[i] = parseInt(bitler.slice(i * 8, i * 8 + 8), 2);
      let metin;
      try { metin = new TextDecoder('utf-8', { fatal: true }).decode(bayt); }
      catch (e) { h.err('Bu bayt dizisi geçerli bir UTF-8 metni değil. Kod başka bir kodlamayla üretilmiş ya da eksik kopyalanmış olabilir.'); }
      return {
        rows: [
          ['Bayt sayısı', h.fmt(bayt.length, 0)],
          ['Bit sayısı', h.fmt(bitler.length, 0)],
          ['Karakter sayısı', h.fmt(Array.from(metin).length, 0)],
        ],
        text: metin,
        note: 'Baytlar UTF-8 olarak çözüldü. Boşluk, virgül ve satır sonları ayraç sayılır.',
      };
    }
    const metin = s.replace(/\r\n?/g, '\n');
    const bayt = new TextEncoder().encode(metin);
    const parcalar = Array.from(bayt, (b) => b.toString(2).padStart(8, '0'));
    const ayr = v.ayrac === 'yok' ? '' : v.ayrac === 'satir' ? '\n' : ' ';
    const karakter = Array.from(metin).length;
    return {
      rows: [
        ['Bayt sayısı', h.fmt(bayt.length, 0)],
        ['Bit sayısı', h.fmt(bayt.length * 8, 0)],
        ['Karakter sayısı', h.fmt(karakter, 0)],
      ],
      text: parcalar.join(ayr),
      note: bayt.length > karakter ? 'ASCII dışındaki karakterler (Türkçe harfler, emojiler) UTF-8\'de birden çok bayt tuttuğu için bayt sayısı karakter sayısından fazladır.' : 'Metindeki her karakter ASCII olduğu için tek bayt, yani 8 bit tutar.',
    };
  },
  cases: [
    { in: { girdi: 'Hi', yon: 'ikili', ayrac: 'bosluk' }, out: { 'Bayt sayısı': '2', 'Bit sayısı': '16', 'Karakter sayısı': '2' }, text: '01001000 01101001' },
    { in: { girdi: '01001000 01101001', yon: 'metin' }, out: { 'Bayt sayısı': '2', 'Karakter sayısı': '2' }, text: 'Hi' },
    { in: { girdi: 'A', yon: 'ikili', ayrac: 'bosluk' }, out: { 'Bit sayısı': '8' }, text: '01000001' },
    { in: { girdi: 'ç', yon: 'ikili', ayrac: 'bosluk' }, out: { 'Bayt sayısı': '2', 'Karakter sayısı': '1' }, text: '11000011 10100111' },
    { in: { girdi: 'Merhaba', yon: 'ikili', ayrac: 'bosluk' }, out: { 'Bit sayısı': '56' }, text: '01001101 01100101 01110010 01101000 01100001 01100010 01100001' },
    { in: { girdi: 'AB', yon: 'ikili', ayrac: 'yok' }, text: '0100000101000010' },
    { in: { girdi: '0100100001101001', yon: 'metin' }, text: 'Hi' },
    { in: { girdi: '11000011\n10100111', yon: 'metin' }, out: { 'Bayt sayısı': '2', 'Karakter sayısı': '1' }, text: 'ç' },
    { in: { girdi: '0101', yon: 'metin' }, error: true },
    { in: { girdi: '01002000', yon: 'metin' }, error: true },
    { in: { girdi: '11111111', yon: 'metin' }, error: true },
    { in: { girdi: '', yon: 'ikili' }, error: true },
  ],
  howto: [
    'Kutuya çevirmek istediğiniz metni ya da 0 ve 1\'lerden oluşan ikili kodu yazın veya yapıştırın.',
    '"Çeviri yönü" listesinden metni koda mı, kodu metne mi çevireceğinizi seçin.',
    'Metinden koda çevirirken baytların boşlukla, bitişik ya da satır satır yazılmasını "Baytlar arası ayraç" ile belirleyin. Koddan metne çevirirken bu seçenek dikkate alınmaz.',
    '"Çevir" düğmesine basın. Bayt, bit ve karakter sayıları sonuç satırlarında, çeviri çıktı kutusunda görünür.',
    'Sonucu kopyalayın. İkili kodu geri çevirerek denetlemek isterseniz çıktıyı kutuya yapıştırıp yönü değiştirin.',
  ],
  sections: [
    { h: 'İkili kod nedir?', p: [
      'Bilgisayarlar bilgiyi yalnızca iki durumla saklar: açık ya da kapalı, 1 ya da 0. Bu iki değerden her birine <strong>bit</strong> denir. Sekiz bit bir araya gelerek bir <strong>bayt</strong> oluşturur ve bir bayt 0 ile 255 arasında 256 farklı değer alabilir. Ekranda gördüğünüz her harf, rakam ve işaret arka planda bir ya da birkaç bayt olarak tutulur.',
      'İkili sayı sisteminde basamak değerleri sağdan sola 1, 2, 4, 8, 16, 32, 64, 128 diye ikinin kuvvetleriyle artar. Bir baytın değeri, 1 olan basamakların değerleri toplanarak bulunur. Örneğin <code>01000001</code> baytında 64 ve 1 basamakları açıktır; toplam 65 eder ve bu sayı ASCII tablosunda büyük "A" harfinin kodudur.',
    ] },
    { h: 'Metin ikili koda nasıl çevrilir?', p: [
      'Çeviri iki adımda gerçekleşir. Önce her karakter bir kodlama kuralına göre sayılara, yani baytlara dönüştürülür. Bu araç, web\'in ve güncel işletim sistemlerinin ortak kodlaması olan <strong>UTF-8</strong>\'i kullanır. Ardından her bayt ikili sistemde, başına gerekirse sıfır eklenerek tam 8 basamakla yazılır.',
      'UTF-8\'de İngiliz alfabesinin harfleri, rakamlar ve temel noktalama işaretleri ASCII ile aynı tek baytlık kodlara sahiptir. Türkçeye özgü harfler iki bayt, birçok Asya dili karakteri üç bayt, emojiler ise çoğunlukla dört bayt tutar. Bu yüzden "Bayt sayısı" satırı, Türkçe karakter içeren metinlerde "Karakter sayısı" satırından büyük çıkar.',
    ] },
    { h: 'Çözümlü örnek: "Hi" ve "ç"', p: [
      '"Hi" metninde H harfinin kodu 72\'dir. 72 = 64 + 8 olduğundan ikili karşılığı <code>01001000</code> olur. Küçük i harfinin kodu 105\'tir; 105 = 64 + 32 + 8 + 1 olduğundan <code>01101001</code> yazılır. Sonuç <strong>01001000 01101001</strong>, toplam 2 bayt ve 16 bittir.',
      'Türkçe "ç" harfinin Unicode kod noktası U+00E7\'dir ve ASCII\'nin 127\'lik sınırını aşar. UTF-8 bu harfi iki bayta böler: onaltılık C3 ve A7. İkili yazımları <code>11000011</code> ve <code>10100111</code> olur. Araç bu girdi için 1 karakter, 2 bayt, 16 bit gösterir. Aynı iki baytı ikili koddan metne yönünde girdiğinizde yeniden "ç" harfini elde edersiniz.',
    ] },
    { h: 'İkili kod metne nasıl çevrilir?', p: [
      'Ters yönde araç önce girdideki boşlukları, virgülleri ve satır sonlarını atar; geriye yalnızca 0 ve 1\'ler kalmalıdır. Bit dizisi sekizer sekizer bölünür, her grup bir bayta çevrilir ve bayt dizisi UTF-8 olarak çözülür. Ayraçsız, bitişik yazılmış kodlar da bu yüzden sorunsuz okunur.',
      'Üç durumda hata alırsınız: girdide 0 ve 1 dışında bir karakter varsa, toplam bit sayısı 8\'in katı değilse ya da baytlar geçerli bir UTF-8 dizisi oluşturmuyorsa. Sonuncusu genellikle kodun eksik kopyalandığını ya da başka bir kodlamayla (örneğin eski Windows-1254 ya da ISO-8859-9 Türkçe kod sayfalarıyla) üretildiğini gösterir. Baştaki sıfırları atılmış, 7 basamaklı yazılmış ASCII kodlarını çevirmeden önce her gruba baştan bir 0 ekleyerek 8 basamağa tamamlayın.',
    ] },
    { h: 'Hızlı başvuru: sık kullanılan karakterler', ul: [
      '<strong>Boşluk</strong> = 32 = <code>00100000</code>',
      '<strong>0</strong> rakamı = 48 = <code>00110000</code>',
      '<strong>A</strong> = 65 = <code>01000001</code>',
      '<strong>Z</strong> = 90 = <code>01011010</code>',
      '<strong>a</strong> = 97 = <code>01100001</code>',
      '<strong>z</strong> = 122 = <code>01111010</code>',
      'Büyük ve küçük harf arasındaki tek fark 32 değerli bittir: <code>01000001</code> (A) ile <code>01100001</code> (a).',
    ] },
    { h: 'Nerelerde işe yarar?', p: [
      'İkili kod çevirisi en çok bilişim derslerinde karşınıza çıkar: sayı sistemleri, karakter kodlaması ve veri gösterimi konularında ödev denetlemek ya da örnek hazırlamak için kullanılır. Programlama öğrenenler bit işlemlerini ve kodlama hatalarını anlamak için metnin bayt düzeyindeki görünümüne bakar. Bulmacalarda, kaçış oyunlarında ve hazine avlarında gizli mesajlar sıkça 0 ve 1 dizileriyle verilir; adını ikili kodla yazıp tişörte, kupaya ya da karta bastırmak isteyenler de olur.',
      'İkili gösterim bir şifreleme değildir. Kodu gören herkes bu sayfadaki gibi bir araçla saniyeler içinde metne çevirebilir; gizli kalması gereken bilgileri bu yolla saklamayın.',
    ] },
  ],
  faq: [
    ['Bir harf kaç bit eder?', 'ASCII kapsamındaki harfler, rakamlar ve temel işaretler UTF-8\'de 1 bayt, yani 8 bittir. Türkçeye özgü ç, ğ, ı, İ, ö, ş, ü harfleri 2 bayt (16 bit), emojiler çoğunlukla 4 bayt (32 bit) tutar.'],
    ['Türkçe karakterler neden iki grup hâlinde çıkıyor?', 'UTF-8 kodlaması 127\'den büyük kod noktalarını birden çok bayta böler. "ş" harfi C5 9F baytlarıyla kodlanır ve ikili çıktıda iki ayrı 8 bitlik grup olarak görünür.'],
    ['İkili kodu boşluksuz yapıştırabilir miyim?', 'Evet. Araç boşluk, virgül ve satır sonlarını yok sayar, kalan bitleri sekizerli gruplara böler. Tek koşul toplam bit sayısının 8\'in katı olmasıdır.'],
    ['"8\'in katı değil" hatası neden çıkar?', 'Kopyalarken bir basamak eksik ya da fazla alınmıştır ya da kod baştaki sıfırlar atılarak yazılmıştır. Her baytın tam 8 basamak olduğundan emin olun; 1000001 yerine 01000001 yazın.'],
    ['Büyük ve küçük harf aynı koda mı çevrilir?', 'Hayır. Büyük "A" 01000001, küçük "a" 01100001 olarak kodlanır. İkili kod büyük-küçük harf ayrımını korur.'],
    ['İkili kod bir şifreleme yöntemi midir?', 'Hayır, yalnızca bir gösterim biçimidir. Anahtarı yoktur ve herkes geri çevirebilir. Gizlilik gerektiren bilgiler için uygun değildir.'],
    ['Sayıları ikili sisteme çevirmek için de bu araç kullanılır mı?', 'Bu araç metni karakter karakter kodlar: "10" yazarsanız 1 ve 0 rakam karakterlerinin kodlarını (00110001 00110000) alırsınız, on sayısının ikili karşılığını (1010) değil. Sayı çevirisi için sayı tabanı çevirici kullanın.'],
    ['Yazdığım metin bir yere gönderiliyor mu?', 'Hayır. Çeviri tarayıcınızın içinde yapılır; metin ya da kod sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['hex-metin-cevir', 'ascii-kod-cevir', 'unicode-kod-noktasi', 'sayi-tabani-donustur', 'rot13-cevir', 'karakter-sayaci'],
};
