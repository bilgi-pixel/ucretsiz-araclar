export default {
  slug: 'robots-txt-olustur',
  title: 'robots.txt Oluşturma',
  h1Tail: 'tarama kuralları dosyası',
  pageTitle: 'robots.txt Oluşturma – Arama Motoru Tarama Kuralları Üretici',
  description: 'Siteniz için robots.txt dosyası oluşturun: User-agent, Disallow, Allow, Crawl-delay ve Sitemap satırları. Yollar denetlenir, çıktı kopyalanmaya hazırdır.',
  card: 'User-agent, Disallow, Allow ve Sitemap satırlarıyla sitenize uygun robots.txt dosyasını hazırlayın.',
  category: 'gelistirici',
  keywords: ['robots.txt oluşturma', 'robots txt üretici', 'robots.txt nedir', 'disallow allow', 'robots.txt örneği', 'arama motoru engelleme', 'site haritası robots'],
  lead: 'Arama motoru tarayıcılarına sitenizin hangi bölümlerini tarayabileceklerini söyleyen <strong>robots.txt</strong> dosyasını birkaç alan doldurarak hazırlayın. Araç yolları denetler, eksik eğik çizgileri tamamlar ve dosyayı doğru sözdizimiyle üretir.',
  button: 'Oluştur',
  inputs: [
    { id: 'politika', label: 'Genel kural', type: 'select', options: [['ozel', 'Aşağıdaki yollara göre'], ['acik', 'Tüm siteyi taramaya aç'], ['kapali', 'Tüm siteyi taramaya kapat']] },
    { id: 'ajan', label: 'Tarayıcı adı (User-agent)', type: 'text', value: '*', hint: 'Tüm tarayıcılar için * bırakın. Birden fazla ad için virgülle ayırın.' },
    { id: 'engelle', label: 'Engellenecek yollar (Disallow)', type: 'textarea', placeholder: '/yonetim/\n/sepet/\n/arama', rows: 4, hint: 'Her satıra bir yol yazın.' },
    { id: 'izin', label: 'İzin verilecek yollar (Allow)', type: 'textarea', placeholder: '/yonetim/yardim/', rows: 3, hint: 'Engellenen bir klasörün içindeki istisnalar için.' },
    { id: 'harita', label: 'Site haritası adresi (isteğe bağlı)', type: 'text', placeholder: 'Örn. ornek.com/sitemap.xml', wide: true },
    { id: 'gecikme', label: 'Tarama gecikmesi (saniye, isteğe bağlı)', type: 'number', placeholder: 'Boş bırakılabilir' },
  ],
  compute(v, h) {
    const ajanlar = String(v.ajan ?? '').split(/[,\n]+/).map((x) => x.trim()).filter(Boolean);
    if (!ajanlar.length) ajanlar.push('*');
    for (const a of ajanlar) if (!/^(\*|[A-Za-z0-9_./ -]+)$/.test(a)) h.err(`Tarayıcı adı geçersiz: "${a}". Tüm tarayıcılar için yalnızca * yazın ya da tarayıcının adını harf ve rakamlarla girin.`);
    const yollar = (s, ad) => h.lines(s).map((y) => {
      if (/\s/.test(y)) h.err(`"${ad}" alanındaki "${y}" yolunda boşluk var. Her satıra tek bir yol yazın; boşluk içeren yolları %20 ile kodlayın.`);
      if (/^[a-z][a-z0-9+.-]*:\/\//i.test(y)) h.err(`"${ad}" alanına tam adres değil, yalnızca yol yazın (örn. /yonetim/).`);
      return y.startsWith('/') ? y : '/' + y;
    });
    const engel = [...new Set(yollar(v.engelle, 'Engellenecek yollar'))];
    const izin = [...new Set(yollar(v.izin, 'İzin verilecek yollar'))];
    const satir = ajanlar.map((a) => `User-agent: ${a}`);
    let ozet;
    if (v.politika === 'acik') { satir.push('Disallow:'); ozet = 'Tüm site taramaya açık'; }
    else if (v.politika === 'kapali') { satir.push('Disallow: /'); ozet = 'Tüm site taramaya kapalı'; }
    else {
      for (const y of izin) satir.push(`Allow: ${y}`);
      for (const y of engel) satir.push(`Disallow: ${y}`);
      if (!engel.length) satir.push('Disallow:');
      ozet = engel.length ? `${engel.length} yol engellendi, ${izin.length} yola izin verildi` : 'Engel yok; tüm site taramaya açık';
    }
    const g = String(v.gecikme ?? '').trim();
    if (g !== '') {
      const sn = h.nonneg(g, 'Tarama gecikmesi');
      if (sn > 0) satir.push(`Crawl-delay: ${String(sn)}`);
    }
    let harita = String(v.harita ?? '').trim();
    if (harita !== '') {
      if (/\s/.test(harita)) h.err('Site haritası adresi boşluk içeremez.');
      if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(harita)) harita = 'https://' + harita.replace(/^\/\//, '');
      let u;
      try { u = new URL(harita); } catch { h.err('Site haritası adresi geçerli görünmüyor (örn. ornek.com/sitemap.xml).'); }
      if (!/^https?:$/.test(u.protocol) || !u.hostname.includes('.')) h.err('Site haritası adresi http ya da https ile başlayan tam bir web adresi olmalıdır (örn. ornek.com/sitemap.xml).');
      harita = u.href;
      satir.push('', `Sitemap: ${harita}`);
    }
    return {
      rows: [
        ['Özet', ozet],
        ['Tarayıcı (User-agent)', ajanlar.join(', ')],
        ['Site haritası', harita || '—'],
        ['Satır sayısı', String(satir.length)],
      ],
      text: satir.join('\n'),
      note: 'Dosyayı robots.txt adıyla, UTF-8 düz metin olarak sitenizin kök dizinine yükleyin.',
    };
  },
  cases: [
    { in: { engelle: '/yonetim/\n/sepet/', harita: 'ornek.com/sitemap.xml' }, out: { 'Özet': '2 yol engellendi, 0 yola izin verildi', 'Tarayıcı (User-agent)': '*', 'Site haritası': 'https://ornek.com/sitemap.xml', 'Satır sayısı': '5' }, text: 'User-agent: *\nDisallow: /yonetim/\nDisallow: /sepet/\n\nSitemap: https://ornek.com/sitemap.xml' },
    { in: { politika: 'acik' }, out: { 'Özet': 'Tüm site taramaya açık', 'Site haritası': '—' }, text: 'User-agent: *\nDisallow:' },
    { in: { politika: 'kapali', engelle: '/yonetim/' }, out: { 'Özet': 'Tüm site taramaya kapalı' }, text: 'User-agent: *\nDisallow: /' },
    { in: { ajan: 'ornekbot, digerbot', engelle: 'yonetim/', izin: '/yonetim/yardim/' }, out: { 'Özet': '1 yol engellendi, 1 yola izin verildi', 'Tarayıcı (User-agent)': 'ornekbot, digerbot' }, text: 'User-agent: ornekbot\nUser-agent: digerbot\nAllow: /yonetim/yardim/\nDisallow: /yonetim/' },
    { in: { engelle: '*.pdf$\n/arama?*', gecikme: '10' }, text: 'User-agent: *\nDisallow: /*.pdf$\nDisallow: /arama?*\nCrawl-delay: 10' },
    { in: { engelle: '', izin: '' }, out: { 'Özet': 'Engel yok; tüm site taramaya açık' }, text: 'User-agent: *\nDisallow:' },
    { in: { engelle: '/gizli klasor/' }, error: true },
    { in: { engelle: '/yonetim/', harita: 'ftp://ornek.com/sitemap.xml' }, error: true },
    { in: { engelle: '/yonetim/', gecikme: '-5' }, error: true },
  ],
  howto: [
    'Genel kuralı seçin: belirli yolları yönetmek için ilk seçeneği bırakın; siteyi tümüyle açmak ya da kapatmak için diğer iki seçenekten birini kullanın.',
    'Kuralın hangi tarayıcı için geçerli olacağını yazın. Yıldız işareti tüm tarayıcıları kapsar.',
    'Taranmasını istemediğiniz yolları her satıra bir tane gelecek biçimde yazın. Engellenen bir klasörün içinde açık kalmasını istediğiniz yolları izin alanına ekleyin.',
    'Varsa site haritanızın adresini girin; dosyanın sonuna Sitemap satırı olarak eklenir.',
    '"Oluştur" düğmesine basın, çıkan metni kopyalayıp <code>robots.txt</code> adıyla kaydedin ve sitenizin kök dizinine yükleyin.',
  ],
  sections: [
    { h: 'robots.txt nedir?', p: [
      'robots.txt, bir web sitesinin kök dizininde duran ve arama motoru tarayıcıları gibi otomatik yazılımlara sitenin hangi bölümlerini tarayabileceklerini bildiren düz metin dosyasıdır. Tarayıcılar bir siteyi ziyaret etmeden önce bu dosyayı ister ve içindeki kurallara göre davranır. Uygulama uzun yıllar fiilî bir gelenek olarak sürmüş, sonradan "Robots Exclusion Protocol" adıyla internet standardı hâline getirilmiştir.',
      'Dosya yalnızca kök dizinde ve tam olarak <code>robots.txt</code> adıyla bulunduğunda geçerlidir; alt klasöre konulan dosya dikkate alınmaz. Her alt alan adı ve her şema için ayrı değerlendirilir: mağaza alt alanınız varsa onun da kendi dosyası olmalıdır.',
    ] },
    { h: 'Sözdizimi: satırlar ne anlama gelir?', ul: [
      '<strong>User-agent:</strong> kuralların hangi tarayıcı için geçerli olduğunu belirtir. <code>*</code> tüm tarayıcılar demektir. Art arda birden çok User-agent satırı aynı kural grubunu paylaşır.',
      '<strong>Disallow:</strong> taranması istenmeyen yolun başlangıcı. <code>Disallow: /yonetim/</code> bu klasörü ve altındaki her şeyi kapsar. Boş bırakılan <code>Disallow:</code> hiçbir şeyin engellenmediği anlamına gelir.',
      '<strong>Allow:</strong> engellenen bir yolun içindeki istisnayı tanımlar.',
      '<strong>Sitemap:</strong> site haritasının tam adresi. Belirli bir gruba bağlı değildir; dosyanın herhangi bir yerinde olabilir.',
      '<strong>Crawl-delay:</strong> istekler arasında beklenecek saniye. Standardın parçası değildir; bazı tarayıcılar uyar, bazıları yok sayar.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Yönetim paneli <code>/yonetim/</code> ve alışveriş sepeti <code>/sepet/</code> yollarında olan bir site düşünün. Engellenecek yollar alanına bu ikisini alt alta yazıp site haritası olarak <code>ornek.com/sitemap.xml</code> girdiğinizde araç beş satırlık bir dosya üretir: ilk satır <code>User-agent: *</code>, ardından <code>Disallow: /yonetim/</code> ve <code>Disallow: /sepet/</code>, bir boş satır ve başına şeması eklenmiş hâliyle <code>Sitemap:</code> satırı.',
      'İstisna örneği: <code>/yonetim/</code> klasörünü kapatıp içindeki <code>/yonetim/yardim/</code> sayfalarını açık tutmak istiyorsanız ikincisini izin alanına yazın. Araç <code>Allow: /yonetim/yardim/</code> satırını Disallow satırından önce yerleştirir. Standarda göre tarayıcı, adrese en uzun eşleşen kuralı uygular; bu nedenle daha uzun olan Allow kuralı geçerli olur. İzin satırlarının önce yazılması, kuralları sırayla okuyan basit tarayıcılarda da aynı sonucu almak içindir.',
    ] },
    { h: 'Joker karakterler', p: [
      'Yollarda iki özel işaret kullanılabilir. Yıldız (<code>*</code>) herhangi bir karakter dizisinin yerini tutar; dolar işareti (<code>$</code>) adresin sonunu belirtir. <code>Disallow: /*.pdf$</code> kuralı adresi <code>.pdf</code> ile biten bütün dosyaları, <code>Disallow: /arama?*</code> ise arama sonuç sayfalarının parametreli bütün sürümlerini kapsar. Araç, eğik çizgiyle başlamayan yolların başına eğik çizgi ekler; <code>*.pdf$</code> yazarsanız <code>/*.pdf$</code> olarak düzeltilir.',
      'Yollar büyük-küçük harfe duyarlıdır: <code>/Yonetim/</code> ile <code>/yonetim/</code> farklı yollardır. Sondaki eğik çizgi de önemlidir; <code>/sepet</code> kuralı <code>/sepetim</code> gibi aynı harflerle başlayan başka adresleri de engeller, <code>/sepet/</code> ise yalnızca klasörü.',
    ] },
    { h: 'robots.txt neyi yapmaz?', p: [
      'Bu dosya bir güvenlik önlemi değildir. Herkes tarafından okunabilir ve kurallara uymak tarayıcının iyi niyetine bağlıdır; kötü niyetli yazılımlar dosyayı yok sayabilir, hatta gizlemek istediğiniz yolları buradan öğrenebilir. Özel içerikler parola ya da sunucu tarafı yetkilendirme ile korunmalıdır.',
      'İkinci yanılgı, Disallow yazmanın sayfayı arama sonuçlarından çıkaracağı düşüncesidir. Engelleme taramayı durdurur, dizine eklenmeyi her zaman durdurmaz: başka sitelerden bağlantı alan bir adres, içeriği okunmadan da sonuçlarda görünebilir. Bir sayfanın sonuçlarda hiç yer almamasını istiyorsanız sayfanın taranmasına izin verip <code>noindex</code> yönergesini kullanmanız gerekir; tarayıcı sayfayı okuyamazsa bu yönergeyi de göremez.',
      'Ayrıca stil ve betik dosyalarının bulunduğu klasörleri engellemek, arama motorunun sayfanızı ziyaretçinin gördüğü gibi işlemesini zorlaştırabilir. Yalnızca gerçekten taranmasına gerek olmayan bölümleri kapatın.',
    ] },
    { h: 'Yükleme ve denetim', p: [
      'Çıkan metni düz metin düzenleyicisine yapıştırıp UTF-8 kodlamasıyla <code>robots.txt</code> adıyla kaydedin ve alan adınızın kök dizinine yükleyin. Yükledikten sonra tarayıcınızda alan adınızın sonuna <code>/robots.txt</code> yazarak dosyanın göründüğünü doğrulayın. Arama motorlarının site yöneticisi panellerinde bulunan robots.txt denetim ekranlarıyla belirli bir adresin engellenip engellenmediğini sınayabilirsiniz.',
      'Sitenin tamamını kapatan <code>Disallow: /</code> kuralı geliştirme ortamlarında işe yarar, ancak canlı sitede unutulursa bütün sayfaların taranmasını durdurur. Yayına çıkarken bu satırın kaldırıldığından emin olun. Araç yalnızca metni üretir; dosyayı sitenize yüklemez ve mevcut dosyanızı denetlemez.',
    ] },
  ],
  faq: [
    ['robots.txt dosyası zorunlu mudur?', 'Hayır. Dosya yoksa tarayıcılar sitenin tamamını taranabilir kabul eder. Yine de site haritasını bildirmek ve gereksiz sayfaların taranmasını önlemek için bulundurulması yaygın bir uygulamadır.'],
    ['Dosyayı nereye yüklemeliyim?', 'Alan adınızın kök dizinine, tam olarak robots.txt adıyla. Alt klasöre konulan ya da farklı adlandırılan dosya tarayıcılar tarafından aranmaz. Her alt alan adı için ayrı dosya gerekir.'],
    ['Disallow: / ile boş Disallow: arasındaki fark nedir?', 'Tam tersidirler. Eğik çizgili kural sitenin tamamını taramaya kapatır. Değeri boş bırakılan kural ise hiçbir yolu engellemez, yani sitenin tamamı açıktır.'],
    ['Bir sayfayı arama sonuçlarından robots.txt ile kaldırabilir miyim?', 'Güvenilir biçimde hayır. Engelleme yalnızca taramayı durdurur; sayfa başka bağlantılar üzerinden yine dizine girebilir. Sonuçlardan çıkarmak için sayfayı taramaya açık bırakıp noindex yönergesi kullanmak ya da içeriği parolayla korumak gerekir.'],
    ['Crawl-delay satırını eklemeli miyim?', 'Çoğu sitede gerekmez. Bu yönerge standardın parçası değildir ve bütün tarayıcılar tarafından desteklenmez. Sunucunuz yoğun tarama altında zorlanıyorsa destekleyen tarayıcılar için eklenebilir; desteklemeyenlerde tarama hızı ilgili arama motorunun yönetici panelinden ayarlanır.'],
    ['Site haritası satırı şart mı?', 'Şart değildir ama önerilir. Tarayıcılar site haritanızın yerini bu satırdan öğrenir. Adres tam olarak, şemasıyla birlikte yazılmalıdır; araç şema yazmadıysanız https ekler.'],
    ['Belirli bir tarayıcıya farklı kural verebilir miyim?', 'Evet. O tarayıcının adını User-agent alanına yazarak ayrı bir kural grubu üretin ve genel grupla aynı dosyada alt alta birleştirin. Bir tarayıcı kendi adına yazılmış grup varsa onu, yoksa yıldızlı genel grubu izler.'],
    ['Yazdığım yollar ve site adresim bir yere gönderiliyor mu?', 'Hayır. Dosya metni tarayıcınızda oluşturulur; girdiğiniz yollar ve adresler sunucuya iletilmez, saklanmaz.'],
  ],
  related: ['sitemap-xml-olustur', 'meta-etiket-olustur', 'canonical-olustur', 'htaccess-yonlendirme-olustur', 'hreflang-olustur'],
};
