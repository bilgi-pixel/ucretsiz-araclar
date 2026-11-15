export default {
  slug: 'rot13-cevir',
  title: 'ROT13 Çevirici',
  h1Tail: 'ROT13, ROT5, ROT18 ve ROT47',
  pageTitle: 'ROT13 Çevirici – ROT13, ROT5, ROT18 ve ROT47 Kodla ve Çöz',
  description: 'Metni ROT13 ile kodlayın ya da çözün; aynı düğme iki yönde de çalışır. Rakamlar için ROT5, harf ve rakam için ROT18, tüm ASCII işaretleri için ROT47 seçeneği vardır.',
  card: 'Metni ROT13 ile kodlayın ya da çözün; rakamlar için ROT5, ikisi birden ROT18 ve tüm yazdırılabilir ASCII için ROT47.',
  category: 'metin',
  keywords: ['rot13 çevirici', 'rot13 çözme', 'rot13 şifreleme', 'rot47 çevirici', 'rot5 rot18', 'rot13 decoder', 'rot13 nedir', 'harf kaydırma 13'],
  lead: 'Metni <strong>ROT13</strong> ile kodlayın ya da kodlanmış metni çözün. ROT13 kendi kendisinin tersidir: aynı işlemi ikinci kez uyguladığınızda özgün metne dönersiniz. Rakamları da gizlemek için ROT5 ve ROT18, noktalama işaretlerini de katmak için ROT47 seçilebilir.',
  button: 'Çevir',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Kodlanacak ya da çözülecek metin', wide: true },
    { id: 'yontem', label: 'Yöntem', type: 'select', options: [['rot13', 'ROT13 (yalnızca harfler A–Z)'], ['rot5', 'ROT5 (yalnızca rakamlar 0–9)'], ['rot18', 'ROT18 (harflere ROT13, rakamlara ROT5)'], ['rot47', 'ROT47 (tüm yazdırılabilir ASCII karakterleri)']] },
  ],
  compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Çevirmek için "Metin" alanına bir yazı yazın.');
    const y = ['rot5', 'rot18', 'rot47'].includes(v.yontem) ? v.yontem : 'rot13';
    let degisen = 0, ayni = 0, cikti = '';
    for (const c of s) {
      const k = c.codePointAt(0);
      let o = c;
      if (y === 'rot47') {
        if (k >= 33 && k <= 126) o = String.fromCharCode(33 + ((k - 33 + 47) % 94));
      } else {
        if (y !== 'rot5') {
          if (k >= 65 && k <= 90) o = String.fromCharCode(65 + ((k - 65 + 13) % 26));
          else if (k >= 97 && k <= 122) o = String.fromCharCode(97 + ((k - 97 + 13) % 26));
        }
        if (y !== 'rot13' && k >= 48 && k <= 57) o = String.fromCharCode(48 + ((k - 48 + 5) % 10));
      }
      if (o !== c) degisen++; else if (!/\s/.test(c)) ayni++;
      cikti += o;
    }
    const ad = { rot13: 'ROT13', rot5: 'ROT5', rot18: 'ROT18', rot47: 'ROT47' }[y];
    return {
      rows: [
        ['Yöntem', ad],
        ['Değişen karakter', h.fmt(degisen, 0)],
        ['Değişmeyen karakter (boşluk hariç)', h.fmt(ayni, 0)],
      ],
      text: cikti,
      note: `${ad} kendi tersidir: çıktıyı aynı yöntemle yeniden çevirirseniz özgün metni elde edersiniz.` + (ayni > 0 && y !== 'rot47' ? ' Türkçe harfler ve yöntemin kapsamı dışındaki işaretler değiştirilmez.' : ''),
    };
  },
  cases: [
    { in: { metin: 'Hello, World!', yontem: 'rot13' }, out: { 'Yöntem': 'ROT13', 'Değişen karakter': '10', 'Değişmeyen karakter (boşluk hariç)': '2' }, text: 'Uryyb, Jbeyq!' },
    { in: { metin: 'Uryyb, Jbeyq!', yontem: 'rot13' }, out: { 'Değişen karakter': '10' }, text: 'Hello, World!' },
    { in: { metin: 'Hello, World!', yontem: 'rot47' }, out: { 'Yöntem': 'ROT47', 'Değişen karakter': '12' }, text: 'w6==@[ (@C=5P' },
    { in: { metin: '2024', yontem: 'rot5' }, out: { 'Değişen karakter': '4' }, text: '7579' },
    { in: { metin: 'Hello 2024', yontem: 'rot18' }, out: { 'Değişen karakter': '9' }, text: 'Uryyb 7579' },
    { in: { metin: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', yontem: 'rot13' }, text: 'NOPQRSTUVWXYZABCDEFGHIJKLM' },
    { in: { metin: 'çığ', yontem: 'rot13' }, out: { 'Değişen karakter': '0', 'Değişmeyen karakter (boşluk hariç)': '3' }, text: 'çığ' },
    { in: { metin: '  \n ', yontem: 'rot13' }, error: true },
  ],
  howto: [
    'Kodlamak ya da çözmek istediğiniz yazıyı "Metin" kutusuna yapıştırın. Kodlama ve çözme aynı işlem olduğu için yön seçmeniz gerekmez.',
    '"Yöntem" listesinden ROT13, ROT5, ROT18 ya da ROT47 seçin. Elinizdeki metin hangi yöntemle kodlandıysa onu seçmelisiniz.',
    '"Çevir" düğmesine basın. Kaç karakterin değiştiği ve kaçının yerinde kaldığı sonuç satırlarında gösterilir.',
    'Çıktıyı kopyalayın. Doğrulamak isterseniz çıktıyı yeniden giriş kutusuna yapıştırıp aynı yöntemle çevirin; başlangıçtaki metne dönmelisiniz.',
  ],
  sections: [
    { h: 'ROT13 nedir?', p: [
      'ROT13, "13 konum döndür" anlamındaki İngilizce <em>rotate by 13 places</em> ifadesinin kısaltmasıdır. İngiliz alfabesindeki her harf, kendisinden 13 sıra sonraki harfle değiştirilir: A harfi N olur, B harfi O olur, M harfi Z olur. Alfabenin ikinci yarısındaki harfler ise başa sarar: N harfi A, Z harfi M olur. Yöntem, Sezar şifresinin kaydırma değeri 13 olan özel durumudur.',
      'Alfabede 26 harf bulunduğu ve 13 bunun tam yarısı olduğu için işlemi iki kez uygulamak 26 kaydırma, yani hiç kaydırmamak demektir. Bu özellik ROT13\'ü kullanışlı kılar: kodlamak ve çözmek için ayrı araç, ayrı anahtar ya da ayrı yön gerekmez. Aynı düğme her iki işi de görür.',
    ] },
    { h: 'Dönüşüm tablosu ve çözümlü örnek', p: [
      'Alfabeyi iki yarıya bölerek yazmak dönüşümü ezberlemeden görmeyi sağlar. İlk yarı <code>A B C D E F G H I J K L M</code>, ikinci yarı <code>N O P Q R S T U V W X Y Z</code> harfleridir. İlk yarıdaki her harf, ikinci yarıda aynı sırada duran harfle yer değiştirir; ikinci yarıdaki harfler de ilk yarıdaki karşılıklarına döner.',
      '"Hello, World!" metnini ele alalım. H harfi U, e harfi r, l harfi y, o harfi b olur; böylece "Hello" kelimesi "Uryyb" biçimine döner. İkinci kelimede W harfi J, o harfi b, r harfi e, l harfi y, d harfi q olur ve "Jbeyq" elde edilir. Virgül, boşluk ve ünlem işareti değişmez. Sonuç <strong>Uryyb, Jbeyq!</strong> olur; araç 10 karakterin değiştiğini, boşluk dışında 2 karakterin yerinde kaldığını bildirir. Bu çıktıyı yeniden çevirdiğinizde "Hello, World!" metnine dönersiniz.',
    ] },
    { h: 'ROT5, ROT18 ve ROT47', ul: [
      '<strong>ROT5:</strong> yalnızca rakamları etkiler. Her rakam 5 artırılır ve 10\'a göre başa sarar: 0 ile 5, 1 ile 6, 2 ile 7, 3 ile 8, 4 ile 9 yer değiştirir. "2024" girdisi "7579" olur.',
      '<strong>ROT18:</strong> harflere ROT13, rakamlara ROT5 uygular. Adı, 13 ile 5\'in toplamından gelir. "Hello 2024" girdisi "Uryyb 7579" olur.',
      '<strong>ROT47:</strong> ASCII tablosunda 33 ile 126 arasındaki 94 yazdırılabilir karakteri, yani harfleri, rakamları ve noktalama işaretlerini 47 konum döndürür. 47, 94\'ün yarısı olduğundan bu yöntem de kendi tersidir. "Hello, World!" girdisi <code>w6==@[ (@C=5P</code> olur; boşluk değişmez.',
    ] },
    { h: 'ROT13 nerede kullanılır?', p: [
      'ROT13 bir güvenlik aracı değil, bir <strong>perdeleme</strong> yöntemidir. Amaç metni meraklı gözlerden saklamak değil, yanlışlıkla okunmasını önlemektir. İnternetin ilk tartışma gruplarında film ve kitap sürprizlerini, bulmaca çözümlerini, fıkraların son cümlesini ya da hassas bulunabilecek ifadeleri gizlemek için yaygınlaşmıştır. Okumak isteyen kişi metni bilerek çevirir; istemeyen göz ucuyla görse bile anlamaz.',
      'Bugün de benzer amaçlarla karşınıza çıkar: bulmaca ve hazine avı etkinliklerindeki ipuçlarında, forum iletilerinde, programlama alıştırmalarında ve bilişim yarışmalarının ısınma sorularında. Bazı yazılımlar ayarlarını ya da metin parçalarını sıradan aramalarda görünmesin diye bu yöntemle saklar. E-posta adresini basit toplayıcı yazılımlardan gizlemek için kullanıldığı da olur, ancak bu yalnızca çok kaba bir engel oluşturur.',
    ] },
    { h: 'Türkçe metinlerde ROT13', p: [
      'ROT13, 26 harfli İngiliz alfabesi için tanımlanmıştır. Türkçeye özgü ç, ğ, ı, İ, ö, ş ve ü harfleri bu alfabede yer almadığından değiştirilmez; yalnızca metnin geri kalan harfleri döner. Örneğin "çığ" kelimesinin üç harfi de kapsam dışındadır ve olduğu gibi kalır. Bu durum Türkçe bir metnin kısmen okunabilir kalmasına yol açar ve gizlenen içerik hakkında ipucu verir.',
      'Türkçe metinleri bütün harfleriyle kaydırmak istiyorsanız 29 harfli alfabeyi destekleyen Sezar şifreleme aracını kullanın. Türk alfabesindeki harf sayısı tek olduğu için tam yarıya denk gelen, kendi tersi olan bir kaydırma değeri yoktur; bu yüzden Türkçe için gerçek bir "ROT" karşılığı tanımlanamaz, şifreleme ve çözme ayrı yönlerde yapılır.',
    ] },
    { h: 'Güvenlik uyarısı', p: [
      'ROT yöntemlerinin hiçbirinde anahtar yoktur; yöntemi bilen herkes metni anında çözer. Parola, kimlik numarası, banka bilgisi, müşteri verisi ya da gizli yazışma gibi korunması gereken içerikleri ROT13 ya da ROT47 ile saklamayın. Bu yöntemler veriyi şifrelemez, yalnızca ilk bakışta okunmasını zorlaştırır. Gerçek gizlilik için güncel ve denetlenmiş şifreleme yazılımları kullanılmalıdır.',
    ] },
  ],
  faq: [
    ['ROT13 nasıl çözülür?', 'Kodlanmış metni aynı araca yapıştırıp yeniden ROT13 uygulamanız yeterlidir. Alfabe 26 harf olduğundan 13 konumluk iki döndürme harfi başladığı yere getirir.'],
    ['ROT13 bir şifreleme yöntemi sayılır mı?', 'Teknik olarak Sezar şifresinin bir türüdür, ancak anahtarı sabit ve herkesçe bilindiği için gizlilik sağlamaz. Doğru tanım perdeleme ya da karartmadır.'],
    ['Rakamlar ROT13 ile değişir mi?', 'Hayır. ROT13 yalnızca A–Z harflerini etkiler. Rakamları da döndürmek için ROT5, harf ve rakamları birlikte döndürmek için ROT18 seçin.'],
    ['ROT47 ile ROT13 arasındaki fark nedir?', 'ROT13 yalnızca 26 harfi döndürür ve kelime sınırları ile noktalama görünür kalır. ROT47 harf, rakam ve noktalama dahil 94 ASCII karakterini döndürür; çıktı daha karışık görünür ama büyük-küçük harf düzeni de kaybolur.'],
    ['Türkçe harfler neden değişmiyor?', 'ROT yöntemleri ASCII karakterleri üzerinde tanımlıdır; ç, ğ, ı, ö, ş, ü bu kümede yoktur. Araç bu harfleri bozmadan bırakır ve değişmeyen karakter sayısında gösterir.'],
    ['Büyük ve küçük harf korunur mu?', 'ROT13, ROT5 ve ROT18\'de evet: büyük harf büyük, küçük harf küçük kalır. ROT47\'de ise harfler noktalama işaretlerine ya da farklı büyüklükte harflere dönüşebilir.'],
    ['Hangi yöntemle kodlandığını bilmediğim bir metni nasıl çözerim?', 'Dört yöntemi sırayla deneyin. Metinde yalnızca harfler karışıksa ROT13, rakamlar da anlamsızsa ROT18, çıktı baştan sona işaret ve simgelerle doluysa büyük olasılıkla ROT47 kullanılmıştır.'],
    ['Metnim bir yere kaydediliyor mu?', 'Hayır. Çevirme işlemi tarayıcınızda yapılır; yazdığınız metin sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['sezar-sifreleme', 'atbash-sifreleme', 'vigenere-sifreleme', 'metni-ters-cevir', 'ascii-kod-cevir'],
};
