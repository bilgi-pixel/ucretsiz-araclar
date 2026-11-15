export default {
  slug: 'atbash-sifreleme',
  title: 'Atbash Şifreleme',
  h1Tail: 'alfabeyi tersine çevirerek şifrele',
  pageTitle: 'Atbash Şifreleme – Ters Alfabe Şifresiyle Şifrele ve Çöz',
  description: 'Atbash şifresiyle metni şifreleyin ya da çözün: ilk harf sonuncuyla, ikinci harf sondan ikinciyle değişir. 29 harfli Türk ve 26 harfli İngiliz alfabesi desteklenir.',
  card: 'Atbash ile her harfi alfabenin diğer ucundaki karşılığıyla değiştirin; aynı işlem hem şifreler hem çözer. Türkçe ve İngilizce alfabe.',
  category: 'metin',
  keywords: ['atbash şifreleme', 'atbash şifresi çözme', 'ters alfabe şifresi', 'atbash cipher', 'ayna alfabe şifreleme', 'türkçe atbash', 'atbash tablosu'],
  lead: 'Atbash, alfabeyi tersine çeviren bir yerine koyma şifresidir: ilk harf son harfle, ikinci harf sondan ikinciyle yer değiştirir. Anahtar gerekmez ve <strong>aynı işlem hem şifreler hem çözer</strong>. Araç 29 harfli Türk alfabesiyle ve 26 harfli İngiliz alfabesiyle çalışır.',
  button: 'Çevir',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Şifrelenecek ya da çözülecek metin', wide: true },
    { id: 'alfabe', label: 'Alfabe', type: 'select', options: [['tr', 'Türkçe (29 harf)'], ['en', 'İngilizce (26 harf)']] },
  ],
  compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Şifrelemek ya da çözmek için "Metin" alanına bir yazı yazın.');
    const en = v.alfabe === 'en';
    const BUYUK = en ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ';
    const KUCUK = en ? 'abcdefghijklmnopqrstuvwxyz' : 'abcçdefgğhıijklmnoöprsştuüvyz';
    const n = BUYUK.length;
    let cikti = '', cevrilen = 0, sabit = 0, diger = 0;
    for (const c of s) {
      let i = BUYUK.indexOf(c), dizi = BUYUK;
      if (i < 0) { i = KUCUK.indexOf(c); dizi = KUCUK; }
      if (i < 0) { cikti += c; if (/\p{L}/u.test(c)) diger++; continue; }
      const o = dizi[n - 1 - i];
      if (o === c) sabit++; else cevrilen++;
      cikti += o;
    }
    if (cevrilen + sabit === 0) h.err('Metinde seçilen alfabeye ait harf yok; alfabeyi değiştirin ya da metni denetleyin.');
    return {
      rows: [
        ['Değişen harf', h.fmt(cevrilen, 0)],
        ['Kendine dönüşen harf', h.fmt(sabit, 0)],
        ['Alfabe dışı harf', h.fmt(diger, 0)],
        ['Alfabe', en ? 'İngilizce, 26 harf' : 'Türkçe, 29 harf'],
      ],
      text: cikti,
      note: (en ? '' : 'Türk alfabesinin ortasındaki L harfi kendi karşılığıdır ve değişmez. ') + 'Çıktıyı aynı alfabeyle yeniden çevirirseniz özgün metne dönersiniz.',
    };
  },
  cases: [
    { in: { metin: 'HELLO', alfabe: 'en' }, out: { 'Değişen harf': '5', 'Kendine dönüşen harf': '0' }, text: 'SVOOL' },
    { in: { metin: 'MERHABA', alfabe: 'tr' }, out: { 'Değişen harf': '7', 'Alfabe': 'Türkçe, 29 harf' }, text: 'KTĞPZYZ' },
    { in: { metin: 'wizard', alfabe: 'en' }, text: 'draziw' },
    { in: { metin: 'KTĞPZYZ', alfabe: 'tr' }, text: 'MERHABA' },
    { in: { metin: 'Lale', alfabe: 'tr' }, out: { 'Değişen harf': '2', 'Kendine dönüşen harf': '2' }, text: 'Lzlt' },
    { in: { metin: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', alfabe: 'en' }, text: 'ZYXWVUTSRQPONMLKJIHGFEDCBA' },
    { in: { metin: 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ', alfabe: 'tr' }, text: 'ZYVÜUTŞSRPÖONMLKJİIHĞGFEDÇCBA' },
    { in: { metin: 'Şifre 2024!', alfabe: 'en' }, out: { 'Değişen harf': '4', 'Alfabe dışı harf': '1' }, text: 'Şruiv 2024!' },
    { in: { metin: '', alfabe: 'tr' }, error: true },
    { in: { metin: '1234 !?', alfabe: 'tr' }, error: true },
  ],
  howto: [
    'Şifrelemek ya da çözmek istediğiniz yazıyı "Metin" kutusuna yazın. Atbash\'ta iki işlem aynıdır, yön seçmeniz gerekmez.',
    '"Alfabe" listesinden Türkçe ya da İngilizce alfabeyi seçin. Şifreli bir metni çözüyorsanız şifrelemede kullanılan alfabeyi seçmelisiniz.',
    '"Çevir" düğmesine basın. Kaç harfin değiştiği, kaçının kendine dönüştüğü ve alfabe dışında kalan harf olup olmadığı sonuç satırlarında görünür.',
    'Çıktıyı kopyalayın. Denetlemek için çıktıyı yeniden kutuya yapıştırıp çevirin; başlangıçtaki metni görmelisiniz.',
  ],
  sections: [
    { h: 'Atbash şifresi nedir?', p: [
      'Atbash, bilinen en eski yerine koyma şifrelerinden biridir ve İbrani alfabesi için ortaya çıkmıştır. Adı da yöntemin özetidir: İbrani alfabesinin ilk harfi <em>alef</em> son harf <em>tav</em> ile, ikinci harf <em>bet</em> sondan ikinci harf <em>şin</em> ile eşleşir; bu dört harfin baş sesleri "atbaş" kelimesini oluşturur. Yöntemin eski dinî metinlerde bazı özel adları örtülü yazmak için kullanıldığı kabul edilir.',
      'Aynı düşünce her alfabeye uygulanabilir: alfabe bir kez düz, bir kez ters sırada alt alta yazılır ve her harf altındakiyle değiştirilir. Ortaya çıkan şifre anahtarsızdır, yani gönderen ile alıcının paylaşması gereken gizli bir sayı ya da kelime yoktur. Bu yüzden Atbash bir güvenlik aracı değil, bir bulmaca ve öğretim malzemesidir.',
    ] },
    { h: 'Formül ve kendi tersi olma özelliği', p: [
      'Harfler 0\'dan başlayarak numaralandırıldığında, <em>n</em> harfli bir alfabede sırası <em>x</em> olan harfin karşılığı <strong>n − 1 − x</strong> sırasındaki harftir. İngiliz alfabesinde n = 26 olduğu için karşılık 25 − x, Türk alfabesinde n = 29 olduğu için 28 − x olur. Aynı formülü ikinci kez uygularsanız n − 1 − (n − 1 − x) = x elde edersiniz; yani işlem kendi tersidir. Şifrelenmiş metni çözmek için onu yeniden şifrelemek yeterlidir.',
      'Matematik diliyle Atbash, doğrusal (afin) şifrelerin özel bir durumudur: harf sırası −1 ile çarpılıp n − 1 eklenir. Büyük harf büyük, küçük harf küçük kalır; rakamlar, boşluklar ve noktalama işaretleri değişmez.',
    ] },
    { h: 'İngiliz alfabesiyle çözümlü örnek', p: [
      'İngiliz alfabesinde eşleşmeler şöyledir: A ile Z, B ile Y, C ile X, D ile W, E ile V, F ile U, G ile T, H ile S, I ile R, J ile Q, K ile P, L ile O, M ile N. "HELLO" kelimesinde H (7) → 25 − 7 = 18 → S; E (4) → 21 → V; L (11) → 14 → O; ikinci L yine O; O (14) → 11 → L. Sonuç <strong>SVOOL</strong> olur.',
      'Bilinen bir başka örnek "wizard" kelimesidir: Atbash karşılığı "draziw", yani kelimenin tersten yazılışıdır. Bunun nedeni kelimedeki harflerin alfabede simetrik konumlarda durmasıdır: w ile d, i ile r, z ile a birbirinin karşılığıdır.',
    ] },
    { h: 'Türk alfabesiyle çözümlü örnek', p: [
      'Türk alfabesi A, B, C, Ç, D, E, F, G, Ğ, H, I, İ, J, K, L, M, N, O, Ö, P, R, S, Ş, T, U, Ü, V, Y, Z sırasıyla 29 harftir. Eşleşmeler A ile Z, B ile Y, C ile V, Ç ile Ü, D ile U, E ile T, F ile Ş, G ile S, Ğ ile R, H ile P, I ile Ö, İ ile O, J ile N, K ile M biçimindedir. Harf sayısı tek olduğu için tam ortadaki <strong>L</strong> harfinin eşi yoktur ve kendisine dönüşür.',
      '"MERHABA" kelimesini çevirelim: M (15) → 28 − 15 = 13 → K; E (5) → 23 → T; R (20) → 8 → Ğ; H (9) → 19 → P; A (0) → 28 → Z; B (1) → 27 → Y; A → Z. Sonuç <strong>KTĞPZYZ</strong> olur. "Lale" kelimesinde ise iki L yerinde kalır, a harfi z, e harfi t olur ve "Lzlt" elde edilir; araç bu durumu "Kendine dönüşen harf" satırında 2 olarak gösterir.',
    ] },
    { h: 'Alfabe seçimi neden önemlidir?', p: [
      'Aynı harfin karşılığı alfabeye göre değişir. "C" harfi İngiliz alfabesinde X\'e, Türk alfabesinde V\'ye dönüşür; çünkü Türk alfabesinde Q, W ve X yoktur, buna karşılık altı ek harf vardır. Dolayısıyla Türkçe alfabeyle şifrelenmiş bir metni İngilizce alfabeyle çözmeye çalışmak anlamsız bir sonuç verir.',
      'Seçilen alfabede bulunmayan harfler çevrilmez. İngilizce alfabe seçiliyken ç, ğ, ı, İ, ö, ş, ü; Türkçe alfabe seçiliyken q, w, x olduğu gibi kalır ve "Alfabe dışı harf" satırında sayılır. Bu sayı sıfırdan büyükse metnin bir bölümü şifrelenmeden kalmış demektir; alfabeyi değiştirmeyi düşünün.',
    ] },
    { h: 'Kullanım alanları ve güvenlik uyarısı', p: [
      'Atbash, kaçış oyunlarında, hazine avlarında, çocuk etkinliklerinde ve bulmaca kitaplarında sıkça karşınıza çıkar. Kriptografiye giriş derslerinde yerine koyma şifrelerinin en yalın örneği olarak, programlama derslerinde ise dizin hesaplama alıştırması olarak kullanılır. Bilişim yarışmalarının başlangıç düzeyindeki sorularında da yer alır.',
      'Anahtarı olmadığı için yöntemi bilen herkes metni anında çözer. Parola, kimlik bilgisi ya da özel yazışma gibi korunması gereken hiçbir içeriği Atbash ile saklamayın; gerçek gizlilik için güncel ve denetlenmiş şifreleme yazılımları kullanılmalıdır.',
    ] },
  ],
  faq: [
    ['Atbash şifresi nasıl çözülür?', 'Şifreli metni kutuya yapıştırıp aynı alfabeyle yeniden çevirmeniz yeterlidir. Atbash kendi tersidir; şifreleme ve çözme tek ve aynı işlemdir.'],
    ['Atbash\'ta anahtar var mıdır?', 'Hayır. Eşleşme tablosu alfabenin kendisinden türediği için gizli bir anahtar yoktur. Bilinmesi gereken tek şey hangi alfabenin kullanıldığıdır.'],
    ['Türk alfabesinde L harfi neden değişmiyor?', '29 harfli alfabenin tam ortasındaki harf L\'dir (0\'dan sayıldığında 14. sıra). 28 − 14 yine 14 ettiği için L kendisiyle eşleşir. 26 harfli İngiliz alfabesinde orta harf olmadığından her harf değişir.'],
    ['Atbash ile ROT13 aynı şey midir?', 'Hayır. ROT13 harfleri 13 sıra kaydırır, Atbash ise alfabeyi ters çevirir. İkisi de kendi tersidir ve anahtarsızdır, ancak ürettikleri sonuçlar farklıdır: "HELLO" ROT13 ile "URYYB", Atbash ile "SVOOL" olur.'],
    ['Rakamlar ve noktalama işaretleri şifrelenir mi?', 'Hayır. Yalnızca seçilen alfabenin harfleri değiştirilir; rakamlar, boşluklar ve noktalama işaretleri yerinde kalır.'],
    ['"Alfabe dışı harf" satırı ne anlama gelir?', 'Metinde bulunan ama seçtiğiniz alfabede yer almayan harflerin sayısıdır; örneğin İngilizce alfabe seçiliyken "ş". Bu harfler şifrelenmeden bırakılır.'],
    ['Atbash\'ı başka bir şifreyle birleştirebilir miyim?', 'Evet, bulmacalarda sık yapılır: önce Atbash, sonra Sezar kaydırması gibi. Birleşim yine tek alfabeli bir yerine koyma şifresidir ve sıklık çözümlemesiyle kırılabilir; güvenlik kazandırmaz.'],
    ['Yazdığım metin kaydediliyor mu?', 'Hayır. Çevirme tarayıcınızda yapılır; metin sunucuya gönderilmez ve hiçbir yerde saklanmaz.'],
  ],
  related: ['sezar-sifreleme', 'rot13-cevir', 'vigenere-sifreleme', 'metni-ters-cevir', 'turkce-alfabe-sirasi'],
};
