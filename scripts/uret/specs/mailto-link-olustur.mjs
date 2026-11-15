export default {
  slug: 'mailto-link-olustur',
  title: 'Mailto Bağlantısı Oluşturma',
  h1Tail: 'konu ve mesajı hazır e-posta linki',
  pageTitle: 'Mailto Bağlantısı Oluşturma – Konulu E-posta Linki ve HTML Kodu',
  description: 'Alıcı, CC, BCC, konu ve mesaj gövdesi hazır mailto bağlantısı oluşturun. Türkçe karakterler ve satır sonları doğru kodlanır; HTML kodu da verilir.',
  card: 'Alıcısı, konusu ve mesajı önceden doldurulmuş mailto bağlantısını ve HTML kodunu oluşturun.',
  category: 'gelistirici',
  keywords: ['mailto link oluşturma', 'mailto konu ekleme', 'e-posta linki oluşturma', 'mailto subject body', 'mailto cc bcc', 'html mail linki', 'mailto türkçe karakter'],
  lead: 'Tıklandığında ziyaretçinin e-posta programını <strong>alıcı, konu ve mesaj hazır</strong> biçimde açan mailto bağlantısını oluşturun. Türkçe karakterler, boşluklar ve satır sonları kurallara uygun kodlanır; bağlantının yanında sayfanıza yapıştırabileceğiniz HTML kodu da üretilir.',
  button: 'Oluştur',
  inputs: [
    { id: 'kime', label: 'Alıcı e-posta adresi', type: 'text', placeholder: 'Örn. info@ornek.com', hint: 'Birden fazla adresi virgülle ayırın.', wide: true },
    { id: 'cc', label: 'CC (bilgi)', type: 'text', placeholder: 'İsteğe bağlı' },
    { id: 'bcc', label: 'BCC (gizli)', type: 'text', placeholder: 'İsteğe bağlı' },
    { id: 'konu', label: 'Konu', type: 'text', placeholder: 'Örn. Fiyat teklifi', wide: true },
    { id: 'govde', label: 'Mesaj metni', type: 'textarea', placeholder: 'İsteğe bağlı; satır sonları korunur.', rows: 4 },
    { id: 'metin', label: 'Bağlantı yazısı', type: 'text', value: 'E-posta gönder' },
  ],
  compute(v, h) {
    const liste = (s, ad, zorunlu) => {
      const p = String(s ?? '').split(/[,;\s]+/).map((x) => x.trim()).filter(Boolean);
      if (zorunlu && !p.length) h.err(`"${ad}" alanına en az bir e-posta adresi yazın.`);
      for (const a of p) {
        if (!/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+$/.test(a)) h.err(`"${ad}" alanındaki "${a}" geçerli bir e-posta adresi değil (örn. ad@ornek.com).`);
      }
      return p;
    };
    const kod = (s) => encodeURIComponent(String(s).replace(/\r\n?/g, '\n').replace(/\n/g, '\r\n')).replace(/'/g, '%27');
    const adr = (a) => a.map((x) => x.replace(/%/g, '%25').replace(/&/g, '%26').replace(/\?/g, '%3F').replace(/#/g, '%23')).join(',');
    const kime = liste(v.kime, 'Alıcı e-posta adresi', true);
    const cc = liste(v.cc, 'CC', false);
    const bcc = liste(v.bcc, 'BCC', false);
    const konu = String(v.konu ?? '').trim();
    const govde = String(v.govde ?? '').replace(/\s+$/, '');
    const q = [];
    if (cc.length) q.push('cc=' + adr(cc));
    if (bcc.length) q.push('bcc=' + adr(bcc));
    if (konu) q.push('subject=' + kod(konu));
    if (govde) q.push('body=' + kod(govde));
    const url = 'mailto:' + adr(kime) + (q.length ? '?' + q.join('&') : '');
    const yazi = String(v.metin ?? '').trim() || kime[0];
    const escH = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const html = `<a href="${escH(url)}">${escH(yazi)}</a>`;
    return {
      rows: [
        ['Mailto bağlantısı', url],
        ['Alıcı sayısı', String(kime.length + cc.length + bcc.length)],
        ['Bağlantı uzunluğu', `${url.length} karakter`],
      ],
      text: url + '\n\n' + html,
      note: url.length > 2000 ? 'Bağlantı 2.000 karakteri aşıyor; bazı tarayıcı ve e-posta programları uzun mailto adreslerini kesebilir. Mesaj metnini kısaltın.' : 'İlk satır bağlantının kendisi, ikinci blok sayfanıza yapıştıracağınız HTML kodudur.',
    };
  },
  cases: [
    { in: { kime: 'info@ornek.com', konu: 'Fiyat teklifi' }, out: { 'Mailto bağlantısı': 'mailto:info@ornek.com?subject=Fiyat%20teklifi', 'Alıcı sayısı': '1' }, text: 'mailto:info@ornek.com?subject=Fiyat%20teklifi\n\n<a href="mailto:info@ornek.com?subject=Fiyat%20teklifi">E-posta gönder</a>' },
    { in: { kime: 'destek@ornek.com', konu: 'Merhaba dünya', govde: 'Satır 1\nSatır 2' }, out: { 'Mailto bağlantısı': 'mailto:destek@ornek.com?subject=Merhaba%20d%C3%BCnya&body=Sat%C4%B1r%201%0D%0ASat%C4%B1r%202' } },
    { in: { kime: 'a@ornek.com, b@ornek.com', cc: 'c@ornek.com', bcc: 'd@ornek.com' }, out: { 'Mailto bağlantısı': 'mailto:a@ornek.com,b@ornek.com?cc=c@ornek.com&bcc=d@ornek.com', 'Alıcı sayısı': '4' } },
    { in: { kime: 'info@ornek.com' }, out: { 'Mailto bağlantısı': 'mailto:info@ornek.com', 'Bağlantı uzunluğu': '21 karakter' } },
    { in: { kime: 'info@ornek.com', konu: 'A&B %50 indirim?', metin: 'Yazın' }, text: 'mailto:info@ornek.com?subject=A%26B%20%2550%20indirim%3F\n\n<a href="mailto:info@ornek.com?subject=A%26B%20%2550%20indirim%3F">Yazın</a>' },
    { in: { kime: 'info@ornek.com', cc: 'muhasebe@ornek.com', konu: 'Şube' }, text: 'mailto:info@ornek.com?cc=muhasebe@ornek.com&subject=%C5%9Eube\n\n<a href="mailto:info@ornek.com?cc=muhasebe@ornek.com&amp;subject=%C5%9Eube">E-posta gönder</a>' },
    { in: { kime: 'info-ornek.com' }, error: true },
    { in: { kime: '', konu: 'Konu' }, error: true },
  ],
  howto: [
    '"Alıcı e-posta adresi" alanına mesajın gideceği adresi yazın. Birden fazla alıcı varsa adresleri virgülle ayırın.',
    'Gerekiyorsa CC (bilgi) ve BCC (gizli kopya) adreslerini, ardından konu satırını ve hazır gelmesini istediğiniz mesaj metnini girin.',
    '"Bağlantı yazısı" alanına sayfada görünecek tıklanabilir metni yazın; boş bırakırsanız ilk alıcı adresi kullanılır.',
    '"Oluştur" düğmesine basın. Sonuç kutusunun ilk satırındaki bağlantıyı ya da altındaki HTML kodunu kopyalayıp sitenize, e-posta imzanıza ya da QR kodunuza ekleyin.',
  ],
  sections: [
    { h: 'Mailto bağlantısı nedir, ne işe yarar?', p: [
      'Mailto, web bağlantılarında kullanılan özel bir adres şemasıdır. Normal bir bağlantı tarayıcıda yeni bir sayfa açarken, <code>mailto:</code> ile başlayan bağlantı cihazda varsayılan olarak ayarlanmış e-posta uygulamasını açar ve yeni bir ileti penceresi hazırlar. Adresin içine yalnızca alıcıyı değil, konu satırını, bilgi ve gizli kopya alıcılarını, hatta mesajın ilk cümlelerini bile yerleştirebilirsiniz.',
      'Bu yöntem özellikle iletişim formu kurmak istemeyen küçük işletme siteleri, "teklif isteyin" düğmeleri, destek talepleri ve iş başvurusu bağlantıları için pratiktir. Ziyaretçi düğmeye bastığında konusu "Fiyat teklifi" olarak doldurulmuş bir e-posta taslağıyla karşılaşır; size gelen iletiler de aynı konuyla geldiği için gelen kutunuzda süzmek ve sınıflandırmak kolaylaşır.',
    ] },
    { h: 'Bağlantının yapısı ve kodlama kuralları', p: [
      'Bir mailto adresi şu sırayla kurulur: önce <code>mailto:</code>, ardından alıcı adresi, sonra bir soru işareti ve <code>alan=değer</code> çiftleri. Çiftler birbirinden <code>&</code> işaretiyle ayrılır. Kullanılabilen alanlar <code>cc</code>, <code>bcc</code>, <code>subject</code> (konu) ve <code>body</code> (mesaj metni) alanlarıdır.',
      'Konu ve mesaj metni adresin içinde taşındığı için bazı karakterler olduğu gibi yazılamaz. Boşluk <code>%20</code>, satır sonu <code>%0D%0A</code>, soru işareti <code>%3F</code>, ve işareti <code>%26</code> olarak kodlanır. Türkçe harfler UTF-8 baytlarına çevrilir: "ü" harfi <code>%C3%BC</code>, "ı" harfi <code>%C4%B1</code>, "Ş" harfi <code>%C5%9E</code> olur. Bu kodlamayı elle yapmak hem zahmetli hem hataya açıktır; araç tamamını sizin yerinize yapar.',
      'Sık yapılan bir hata boşluk yerine artı işareti kullanmaktır. Artı işareti web formlarında boşluk anlamına gelse de mailto adreslerinde olduğu gibi artı olarak görünür; bu yüzden araç boşlukları her zaman <code>%20</code> olarak yazar.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Alıcı olarak <code>destek@ornek.com</code>, konu olarak "Merhaba dünya", mesaj olarak da iki satırlık "Satır 1" ve "Satır 2" metnini girdiğinizi düşünelim. Araç şu bağlantıyı üretir: <code>mailto:destek@ornek.com?subject=Merhaba%20d%C3%BCnya&body=Sat%C4%B1r%201%0D%0ASat%C4%B1r%202</code>. Konudaki boşluk ve "ü", mesajdaki "ı" ve satır sonu kodlanmış, adresin kendisi ise okunaklı kalmıştır.',
      'Aynı bağlantı HTML koduna yerleştirilirken alanları ayıran <code>&</code> işareti HTML kuralı gereği "amp" adlı karakter varlığı olarak yazılır. Sonuç kutusundaki ikinci blokta bu dönüşüm yapılmış hazır kodu bulursunuz; tarayıcı kodu okurken işareti yeniden tek bir <code>&</code> olarak yorumlar.',
    ] },
    { h: 'Nerelerde kullanılır?', ul: [
      '<strong>Kurumsal sitelerde iletişim düğmesi:</strong> "Bize yazın" bağlantısı konuyu hazır getirir, form ve sunucu kodu gerektirmez.',
      '<strong>E-ticaret ve teklif sayfaları:</strong> ürün adını konuya yazarak hangi ürün için yazıldığını anında görürsünüz.',
      '<strong>İş ilanları:</strong> konu satırına ilan kodunu yerleştirerek başvuruları ayırmak kolaylaşır.',
      '<strong>E-posta imzaları ve bültenler:</strong> "Abonelikten çıkmak için yazın" gibi tek tıkla hazırlanan yanıt bağlantıları.',
      '<strong>QR kodlar:</strong> mailto adresini QR koda dönüştürerek broşür ya da kartvizitten doğrudan e-posta taslağı açtırabilirsiniz.',
    ] },
    { h: 'Sınırlar ve dikkat edilecekler', p: [
      'Mailto bağlantısı ancak ziyaretçinin cihazında bir e-posta uygulaması ya da tarayıcıda tanımlı bir web posta hizmeti varsa çalışır. Ortak kullanılan bilgisayarlarda ya da e-posta programı kurulmamış cihazlarda bağlantıya basıldığında hiçbir şey olmayabilir. Bu nedenle bağlantının yanında adresi düz metin olarak da göstermek iyi bir alışkanlıktır.',
      'Uzunluk da bir sınırdır. Standart kesin bir üst sınır koymaz, ancak bazı tarayıcılar ve e-posta programları yaklaşık 2.000 karakterden uzun adresleri keser. Araç bu eşik aşıldığında sizi uyarır. Uzun metinleri bağlantıya gömmek yerine birkaç cümlelik bir giriş bırakmak daha güvenlidir.',
      'Mailto ile dosya eki gönderilemez; standartta ek alanı tanımlı değildir ve güvenlik nedeniyle programlar bunu desteklemez. Ayrıca sayfada açık yazılan e-posta adresleri istenmeyen posta toplayan yazılımlarca okunabilir; yoğun istenmeyen posta alıyorsanız iletişim formu kullanmayı düşünün.',
    ] },
  ],
  faq: [
    ['Mailto bağlantısına konu nasıl eklenir?', 'Adresin sonuna soru işareti koyup <code>subject=</code> alanını eklersiniz: <code>mailto:info@ornek.com?subject=Fiyat%20teklifi</code>. Araçta "Konu" alanını doldurmanız yeterlidir; boşluk ve özel karakterler kendiliğinden kodlanır.'],
    ['Birden fazla alıcıya mailto bağlantısı oluşturulabilir mi?', 'Evet. Alıcı alanına adresleri virgülle ayırarak yazın; bağlantıda da virgülle ayrılmış olarak yer alırlar. CC ve BCC alanlarında da aynı şekilde birden fazla adres kullanabilirsiniz.'],
    ['Türkçe karakterler bağlantıda neden %C3%BC gibi görünüyor?', 'Adreslerde yalnızca sınırlı bir karakter kümesi güvenle taşınabildiği için Türkçe harfler UTF-8 baytlarının yüzde işaretli karşılığına çevrilir. E-posta programı bağlantıyı açarken bunları yeniden "ü", "ş", "ı" gibi harflere dönüştürür; alıcı kodları görmez.'],
    ['Mesaj metninde alt satıra nasıl geçilir?', 'Mesaj kutusunda normal biçimde Enter tuşuyla alt satıra geçin. Araç her satır sonunu standardın öngördüğü <code>%0D%0A</code> koduna çevirir ve e-posta taslağında satırlar ayrı ayrı görünür.'],
    ['CC ile BCC arasındaki fark nedir?', 'CC (bilgi) alanındaki adresler iletinin bir kopyasını alır ve tüm alıcılar bu adresleri görür. BCC (gizli kopya) alanındaki adresler de kopya alır ama diğer alıcılara gösterilmez.'],
    ['Mailto bağlantısına tıklayınca hiçbir şey açılmıyor, neden?', 'Cihazda varsayılan bir e-posta uygulaması tanımlı değildir. Bilgisayarda işletim sisteminin varsayılan uygulamalar ayarından, web posta kullanıyorsanız tarayıcının protokol işleyicisi ayarından mailto bağlantıları için bir uygulama seçmeniz gerekir.'],
    ['Mailto bağlantısıyla dosya eki gönderebilir miyim?', 'Hayır. Mailto standardı ek alanı içermez ve e-posta programları güvenlik gerekçesiyle bağlantı üzerinden dosya eklenmesine izin vermez. Ziyaretçi eki taslak açıldıktan sonra kendisi ekler.'],
    ['Yazdığım adresler ve mesaj bir yere gönderiliyor mu?', 'Hayır. Bağlantı tamamen tarayıcınızda oluşturulur; e-posta adresleri, konu ve mesaj metni sunucuya iletilmez, kaydedilmez. Araç e-posta da göndermez, yalnızca bağlantı metnini üretir.'],
  ],
  related: ['tel-link-olustur', 'url-kodla', 'utm-link-olustur', 'qr-kod', 'vcard-olustur'],
};
