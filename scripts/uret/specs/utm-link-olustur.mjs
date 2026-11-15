export default {
  slug: 'utm-link-olustur',
  title: 'UTM Bağlantısı Oluşturma',
  h1Tail: 'kampanya etiketli link',
  pageTitle: 'UTM Bağlantısı Oluşturma – Kampanya Takip Linki Hazırlama',
  description: 'Sayfa adresinize utm_source, utm_medium, utm_campaign, utm_term ve utm_content etiketlerini ekleyin. Türkçe karakterleri sadeleştiren kampanya linki üretici.',
  card: 'Adresinize utm_source, utm_medium ve utm_campaign etiketlerini ekleyip kampanya takip bağlantısı oluşturun.',
  category: 'gelistirici',
  keywords: ['utm link oluşturma', 'utm bağlantısı', 'utm oluşturucu', 'kampanya linki oluşturma', 'utm_source utm_medium', 'utm parametreleri', 'kampanya takip linki'],
  lead: 'Reklam, bülten ve sosyal medya paylaşımlarınız için <strong>UTM etiketli bağlantı</strong> hazırlayın. Araç etiketleri adresin mevcut parametrelerini ve parça bölümünü bozmadan ekler, isterseniz değerleri küçük harfe çevirip Türkçe karakterleri sadeleştirir.',
  button: 'Oluştur',
  inputs: [
    { id: 'adres', label: 'Sayfa adresi', type: 'text', placeholder: 'Örn. ornek.com/kampanya', wide: true, hint: 'Şema yazmazsanız adresin başına https eklenir.' },
    { id: 'kaynak', label: 'Kaynak (utm_source)', type: 'text', placeholder: 'Örn. bulten' },
    { id: 'ortam', label: 'Ortam (utm_medium)', type: 'text', placeholder: 'Örn. email' },
    { id: 'kampanya', label: 'Kampanya (utm_campaign)', type: 'text', placeholder: 'Örn. bahar_indirimi' },
    { id: 'terim', label: 'Terim (utm_term, isteğe bağlı)', type: 'text', placeholder: 'Örn. kosu_ayakkabisi' },
    { id: 'icerik', label: 'İçerik (utm_content, isteğe bağlı)', type: 'text', placeholder: 'Örn. ust_buton' },
    { id: 'duzen', label: 'Değerleri düzenle', type: 'select', options: [['sade', 'Küçük harf, boşluk yerine alt çizgi, Türkçe harfleri sadeleştir'], ['aynen', 'Yazdığım gibi bırak']] },
  ],
  compute(v, h) {
    let a = String(v.adres ?? '').trim();
    if (a === '') h.err('Etiket eklenecek sayfa adresini yazın (örn. ornek.com/kampanya).');
    if (/\s/.test(a)) h.err('Sayfa adresi boşluk içeremez. Adresi tarayıcının adres çubuğundan kopyalayıp yapıştırın.');
    if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(a)) a = 'https://' + a.replace(/^\/\//, '');
    let u;
    try { u = new URL(a); } catch { h.err('Sayfa adresi geçerli görünmüyor. Alan adını ve yolu kontrol edin (örn. ornek.com/kampanya).'); }
    if (u.protocol !== 'http:' && u.protocol !== 'https:') h.err('UTM etiketleri yalnızca http ya da https ile başlayan web adreslerine eklenir.');
    if (!u.hostname.includes('.') && u.hostname !== 'localhost') h.err('Alan adı eksik görünüyor. Adresi uzantısıyla birlikte yazın (örn. ornek.com).');
    const sade = (s) => {
      let x = String(s ?? '').trim();
      if (v.duzen === 'aynen') return x;
      const H = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', â: 'a', î: 'i', û: 'u' };
      x = x.toLocaleLowerCase('tr').replace(/[çğıöşüâîû]/g, (c) => H[c]);
      return x.replace(/[^a-z0-9._-]+/g, '_').replace(/_+/g, '_').replace(/^_+|_+$/g, '');
    };
    const alan = [
      ['utm_source', sade(v.kaynak), 'Kaynak (utm_source)', true],
      ['utm_medium', sade(v.ortam), 'Ortam (utm_medium)', true],
      ['utm_campaign', sade(v.kampanya), 'Kampanya (utm_campaign)', true],
      ['utm_term', sade(v.terim), 'Terim', false],
      ['utm_content', sade(v.icerik), 'İçerik', false],
    ];
    for (const [, d, ad, zorunlu] of alan) if (zorunlu && d === '') h.err(`"${ad}" alanını doldurun. Kaynak, ortam ve kampanya adı birlikte kullanıldığında raporlar anlamlı olur.`);
    const rows = [];
    for (const [k, d] of alan) {
      if (d === '') { u.searchParams.delete(k); continue; }
      u.searchParams.set(k, d);
      rows.push([k, d]);
    }
    const link = u.href;
    return {
      rows: [['UTM bağlantısı', link], ...rows, ['Uzunluk', `${link.length} karakter`]],
      text: link,
      note: 'Adresteki diğer parametreler ve # bölümü korunur; önceden bulunan aynı adlı UTM etiketleri yeni değerlerle değiştirilir.',
    };
  },
  cases: [
    { in: { adres: 'https://ornek.com/kampanya', kaynak: 'bulten', ortam: 'email', kampanya: 'bahar_indirimi' }, out: { 'UTM bağlantısı': 'https://ornek.com/kampanya?utm_source=bulten&utm_medium=email&utm_campaign=bahar_indirimi', 'utm_source': 'bulten', 'Uzunluk': '89 karakter' }, text: 'https://ornek.com/kampanya?utm_source=bulten&utm_medium=email&utm_campaign=bahar_indirimi' },
    { in: { adres: 'ornek.com/urun?id=5#yorum', kaynak: 'Bülten', ortam: 'E-Posta', kampanya: 'Yaz İndirimi 2026', icerik: 'Üst Buton' }, out: { 'UTM bağlantısı': 'https://ornek.com/urun?id=5&utm_source=bulten&utm_medium=e-posta&utm_campaign=yaz_indirimi_2026&utm_content=ust_buton#yorum', 'utm_campaign': 'yaz_indirimi_2026', 'utm_content': 'ust_buton' } },
    { in: { adres: 'https://ornek.com/', kaynak: 'Afiş', ortam: 'QR', kampanya: 'Bahar İndirimi', duzen: 'aynen' }, out: { 'UTM bağlantısı': 'https://ornek.com/?utm_source=Afi%C5%9F&utm_medium=QR&utm_campaign=Bahar+%C4%B0ndirimi', 'utm_campaign': 'Bahar İndirimi' } },
    { in: { adres: 'https://ornek.com/?utm_source=eski&a=1', kaynak: 'arama', ortam: 'cpc', kampanya: 'marka', terim: 'koşu ayakkabısı' }, out: { 'UTM bağlantısı': 'https://ornek.com/?utm_source=arama&a=1&utm_medium=cpc&utm_campaign=marka&utm_term=kosu_ayakkabisi', 'utm_term': 'kosu_ayakkabisi' } },
    { in: { adres: 'https://ornek.com', kaynak: 'sosyal', ortam: 'paylasim', kampanya: 'acilis' }, out: { 'UTM bağlantısı': 'https://ornek.com/?utm_source=sosyal&utm_medium=paylasim&utm_campaign=acilis' } },
    { in: { adres: 'http://ornek.com/a', kaynak: '  IŞIK  ', ortam: 'sms', kampanya: 'kış--fırsatı!' }, out: { 'utm_source': 'isik', 'utm_campaign': 'kis--firsati' } },
    { in: { adres: 'https://ornek.com/kampanya', kaynak: '', ortam: 'email', kampanya: 'bahar' }, error: true },
    { in: { adres: '', kaynak: 'bulten', ortam: 'email', kampanya: 'bahar' }, error: true },
    { in: { adres: 'ftp://ornek.com/dosya', kaynak: 'bulten', ortam: 'email', kampanya: 'bahar' }, error: true },
  ],
  howto: [
    'Ziyaretçiyi göndermek istediğiniz sayfanın adresini "Sayfa adresi" alanına yapıştırın.',
    'Kaynak, ortam ve kampanya adını yazın. Bu üç alan zorunludur; terim ve içerik alanlarını ihtiyaç duyarsanız doldurun.',
    'Değerlerin küçük harfe çevrilip sadeleştirilmesini istiyorsanız varsayılan düzenleme seçeneğini bırakın.',
    '"Oluştur" düğmesine basın. Etiketli bağlantı sonuç kutusunda görünür; her etiketin son hâli ayrı satırda listelenir.',
    'Bağlantıyı kopyalayıp reklamınıza, bülteninize ya da paylaşımınıza yerleştirin. Yayına almadan önce bir kez tıklayıp sayfanın açıldığını doğrulayın.',
  ],
  sections: [
    { h: 'UTM etiketi nedir?', p: [
      'UTM etiketleri, bir bağlantının sonuna eklenen ve ziyaretin nereden geldiğini web analizi aracına bildiren sorgu parametreleridir. Ziyaretçi bağlantıya tıkladığında sayfa normal biçimde açılır; analiz aracı ise adresteki etiketleri okuyarak ziyareti ilgili kaynağa, ortama ve kampanyaya yazar. Böylece "bu ay bültenden kaç kişi geldi, afişteki karekod kaç ziyaret getirdi" gibi soruların yanıtı raporlarda ayrı ayrı görülebilir.',
      'Etiketler sayfanın içeriğini değiştirmez ve sunucuda özel bir ayar gerektirmez. Tek koşul, sitenizde bu parametreleri tanıyan bir analiz aracının kurulu olmasıdır.',
    ] },
    { h: 'Beş etiketin anlamı', ul: [
      '<strong>utm_source (kaynak):</strong> trafiği gönderen yer. Örnek: bulten, arama, sosyal, afis.',
      '<strong>utm_medium (ortam):</strong> trafiğin türü ya da kanalı. Örnek: email, cpc, sosyal, qr, sms.',
      '<strong>utm_campaign (kampanya):</strong> çalışmanın adı. Örnek: bahar_indirimi, okul_donemi, acilis.',
      '<strong>utm_term (terim):</strong> ücretli aramada hedeflenen anahtar sözcük. İsteğe bağlıdır.',
      '<strong>utm_content (içerik):</strong> aynı kampanyadaki farklı bağlantıları ya da reklam sürümlerini ayırmak için. Örnek: ust_buton, alt_gorsel. İsteğe bağlıdır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bahar kampanyanızı e-posta bülteniyle duyuracağınızı varsayalım. Sayfa adresi <code>ornek.com/kampanya</code>, kaynak <code>bulten</code>, ortam <code>email</code>, kampanya <code>bahar_indirimi</code> olsun. Araç adresin sonuna soru işareti ekler ve etiketleri <code>&</code> ile birleştirir: <code>ornek.com/kampanya?utm_source=bulten&utm_medium=email&utm_campaign=bahar_indirimi</code>. Başına https şeması eklenmiş tam bağlantı 89 karakterdir.',
      'Adreste zaten parametre ve parça varsa bunlar korunur. <code>ornek.com/urun?id=5#yorum</code> adresine kaynak "Bülten", ortam "E-Posta", kampanya "Yaz İndirimi 2026", içerik "Üst Buton" yazdığınızda sadeleştirme açıkken değerler <code>bulten</code>, <code>e-posta</code>, <code>yaz_indirimi_2026</code> ve <code>ust_buton</code> olur; etiketler <code>id=5</code> parametresinden sonra, <code>#yorum</code> bölümünden önce yerleşir. Parça her zaman en sonda kalmalıdır; etiketler diyezden sonra yazılırsa analiz aracına ulaşmaz.',
    ] },
    { h: 'Adlandırma kuralları neden önemli?', p: [
      'Analiz araçları etiket değerlerini harfi harfine karşılaştırır. "Bulten", "bulten" ve "bülten" üç ayrı kaynak olarak raporlanır ve aynı kanalın verisi satırlara bölünür. Bu yüzden ekipçe tek bir yazım kuralı belirlemek gerekir. Yaygın ve sorunsuz kural şudur: yalnızca küçük harf, Türkçe karakter yok, boşluk yerine alt çizgi.',
      'Aracın varsayılan düzenleme seçeneği bu kuralı uygular: "Yaz İndirimi 2026" değeri <code>yaz_indirimi_2026</code> olur; ç, ğ, ı, ö, ş, ü harfleri c, g, i, o, s, u ile değiştirilir; harf, rakam, nokta, tire ve alt çizgi dışındaki işaretler alt çizgiye çevrilir. Kurum içinde farklı bir kuralınız varsa "Yazdığım gibi bırak" seçeneğiyle değerleri olduğu gibi kullanabilirsiniz; bu durumda boşluklar ve Türkçe harfler adres içinde kodlanmış olarak yer alır.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      '<strong>Site içi bağlantılara UTM eklemek:</strong> kendi sayfalarınız arasındaki bağlantılara etiket koymak, ziyaretin asıl kaynağının üzerine yazılmasına yol açabilir. Etiketleri yalnızca siteye dışarıdan gelen bağlantılarda kullanın.',
      '<strong>Kaynak ile ortamı karıştırmak:</strong> kaynak "nereden", ortam "hangi yolla" sorusunu yanıtlar. Bülten adı kaynağa, email ortama yazılır.',
      '<strong>Her seferinde farklı yazım:</strong> aynı kampanyayı bir yerde tireli, başka yerde alt çizgili yazmak raporu böler.',
      '<strong>Kişisel veri yazmak:</strong> etiket değerlerine e-posta adresi, ad-soyad ya da telefon gibi bilgiler yazılmamalıdır; adresler kayıtlarda ve paylaşımlarda açıkça görünür.',
      '<strong>Bağlantıyı sınamamak:</strong> yayından önce bağlantıya tıklayıp doğru sayfanın açıldığını ve yönlendirme sırasında etiketlerin düşmediğini görün.',
    ] },
    { h: 'Uzun bağlantılar ve karekodlar', p: [
      'Etiketler bağlantıyı uzatır. E-posta düğmelerinde ve reklam hedef adreslerinde bu sorun olmaz, çünkü okur adresi görmez. Basılı malzemede ise uzun adres hem çirkin görünür hem de elle yazılamaz; bu durumda etiketli bağlantıyı karekoda dönüştürmek pratik çözümdür. Karekod ne kadar çok veri taşırsa o kadar sıklaşır, bu nedenle afiş ve broşürlerde etiket değerlerini kısa tutmak okutmayı kolaylaştırır.',
      'Araç bağlantıyı yalnızca oluşturur; adresin çalışıp çalışmadığını denetlemez ve tıklama saymaz. Ziyaret verilerini görmek için sitenizdeki analiz aracının kampanya raporlarına bakmanız gerekir.',
    ] },
  ],
  faq: [
    ['UTM etiketlerinden hangileri zorunludur?', 'Raporların anlamlı olması için kaynak, ortam ve kampanya adının birlikte kullanılması önerilir; bu araç üçünü de zorunlu tutar. Terim ve içerik etiketleri isteğe bağlıdır ve boş bırakılırsa bağlantıya eklenmez.'],
    ['UTM etiketi eklemek sayfamın arama sıralamasını etkiler mi?', 'Etiketler sayfa içeriğini değiştirmez. Yine de aynı sayfanın farklı adreslerle dizine girmesini önlemek için sayfalarınızda standart adresi gösteren canonical etiketinin bulunması iyi bir uygulamadır.'],
    ['Büyük-küçük harf fark eder mi?', 'Evet. Analiz araçları değerleri harfi harfine ayırır; "Email" ile "email" iki ayrı ortam olarak görünür. Bu yüzden hep küçük harf kullanmak en güvenli yoldur ve aracın varsayılan ayarı bunu kendiliğinden yapar.'],
    ['Adresimde zaten soru işareti ve parametre var, sorun olur mu?', 'Olmaz. Araç mevcut parametreleri korur ve UTM etiketlerini onların arkasına & ile ekler. Adreste daha önce aynı adlı bir UTM etiketi varsa yeni değerle değiştirilir, çift kayıt oluşmaz.'],
    ['Türkçe karakter kullanabilir miyim?', 'Teknik olarak evet; "Yazdığım gibi bırak" seçeneğinde harfler adres içinde kodlanarak taşınır. Ancak kodlanmış harfler bağlantıyı uzatır ve farklı sistemlerde tutarsız görünebilir. Sadeleştirilmiş yazım daha sorunsuzdur.'],
    ['utm_term alanını ne zaman doldurmalıyım?', 'Ücretli arama reklamlarında hedeflediğiniz anahtar sözcüğü elle belirtmek istediğinizde kullanılır. Reklam platformunuz otomatik etiketleme yapıyorsa ya da kampanya arama dışı bir kanaldaysa boş bırakabilirsiniz.'],
    ['Aynı bültende iki farklı düğmeyi nasıl ayırırım?', 'Kaynak, ortam ve kampanya aynı kalır; yalnızca utm_content değerini değiştirirsiniz. Örneğin üstteki düğme için ust_buton, alttaki görsel için alt_gorsel yazarak hangisinin daha çok tıklandığını görebilirsiniz.'],
    ['Yazdığım adres ve kampanya bilgileri kaydediliyor mu?', 'Hayır. Bağlantı tarayıcınızda oluşturulur; adres ve etiket değerleri sunucuya gönderilmez, saklanmaz. Henüz duyurulmamış kampanya adlarını da gönül rahatlığıyla yazabilirsiniz.'],
  ],
  related: ['url-ayristir', 'sorgu-dizesi-coz', 'url-kodla', 'qr-kod', 'canonical-olustur', 'whatsapp-link'],
};
