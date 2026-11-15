export default {
  slug: 'yonlendirme-meta-olustur',
  title: 'Meta Yönlendirme (Refresh) Kodu Oluşturma',
  h1Tail: 'HTML ile sayfa yönlendirme',
  pageTitle: 'Meta Refresh Yönlendirme Kodu Oluşturma – HTML Sayfa Yönlendirme',
  description: 'Bir sayfayı belirli saniye sonra başka adrese gönderen meta refresh etiketini oluşturun. Yedek bağlantı ve canonical satırıyla birlikte hazır HTML kodu verir.',
  card: 'Sayfayı anında ya da birkaç saniye sonra başka adrese yönlendiren meta refresh HTML kodunu oluşturun.',
  category: 'gelistirici',
  keywords: ['meta refresh oluşturma', 'html yönlendirme kodu', 'meta yönlendirme', 'sayfa yönlendirme html', 'http-equiv refresh', 'otomatik yönlendirme kodu', 'html redirect'],
  lead: 'Sunucu ayarlarına erişiminiz olmadığında bir sayfayı başka bir adrese göndermenin en yalın yolu <strong>meta refresh</strong> etiketidir. Hedef adresi ve bekleme süresini yazın; sayfanın <code>head</code> bölümüne yapıştıracağınız kodu, isterseniz yedek bağlantı ve canonical satırıyla birlikte alın.',
  button: 'Oluştur',
  inputs: [
    { id: 'hedef', label: 'Hedef adres', type: 'text', placeholder: 'Örn. ornek.com/yeni-sayfa', hint: 'Protokol yazmazsanız başına https eklenir; site içi yol için / ile başlayın.', wide: true },
    { id: 'sure', label: 'Bekleme süresi (saniye)', type: 'number', value: '0' },
    { id: 'kapsam', label: 'Çıktı', type: 'select', options: [['meta', 'Yalnızca meta etiketi'], ['yedek', 'Meta + canonical + yedek bağlantı']] },
  ],
  compute(v, h) {
    let hedef = String(v.hedef ?? '').trim();
    if (!hedef) h.err('"Hedef adres" alanını doldurun.');
    if (/\s/.test(hedef)) h.err('Hedef adreste boşluk olamaz; boşlukları %20 olarak yazın ya da adresi kontrol edin.');
    const sema = /^([a-z][a-z0-9+.-]*):/i.exec(hedef);
    const goreli = hedef.startsWith('/') && !hedef.startsWith('//');
    if (sema && !/^https?$/i.test(sema[1]) && !/^[^/]+:\d+(\/|$)/.test(hedef)) h.err('Hedef adres yalnızca http ya da https ile başlayabilir.');
    if (!goreli && !/^https?:\/\//i.test(hedef)) {
      hedef = 'https://' + hedef.replace(/^\/\//, '');
    }
    if (!goreli) {
      const host = hedef.replace(/^https?:\/\//i, '').split(/[/?#]/)[0];
      if (!host || (!host.includes('.') && !/^localhost(:\d+)?$/i.test(host))) h.err('Hedef adres geçerli bir alan adı içermeli (örn. ornek.com/sayfa).');
    }
    const sure = h.int(v.sure, 'Bekleme süresi');
    if (sure < 0 || sure > 86400) h.err('"Bekleme süresi" 0 ile 86.400 saniye arasında olmalı.');
    const escH = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const e = escH(hedef);
    const meta = `<meta http-equiv="refresh" content="${sure}; url=${e}">`;
    const L = [meta];
    if (v.kapsam === 'yedek') {
      if (!goreli) L.push(`<link rel="canonical" href="${e}">`);
      L.push(`<p>Bu sayfa taşındı. Otomatik olarak yönlendirilmezseniz <a href="${e}">yeni adrese gitmek için tıklayın</a>.</p>`);
    }
    return {
      rows: [
        ['Meta etiketi', meta],
        ['Hedef adres', hedef],
        ['Bekleme süresi', sure === 0 ? '0 saniye (anında)' : `${h.fmt(sure, 0)} saniye`],
      ],
      text: L.join('\n'),
      note: v.kapsam === 'yedek' ? 'Meta ve canonical satırlarını head bölümüne, paragraf satırını body bölümüne yerleştirin.' : 'Etiketi sayfanın head bölümüne, mümkün olduğunca üste yerleştirin.',
    };
  },
  cases: [
    { in: { hedef: 'https://ornek.com/yeni-sayfa' }, out: { 'Meta etiketi': '<meta http-equiv="refresh" content="0; url=https://ornek.com/yeni-sayfa">', 'Bekleme süresi': '0 saniye (anında)' }, text: '<meta http-equiv="refresh" content="0; url=https://ornek.com/yeni-sayfa">' },
    { in: { hedef: 'ornek.com/kampanya', sure: '5', kapsam: 'yedek' }, out: { 'Hedef adres': 'https://ornek.com/kampanya', 'Bekleme süresi': '5 saniye' }, text: '<meta http-equiv="refresh" content="5; url=https://ornek.com/kampanya">\n<link rel="canonical" href="https://ornek.com/kampanya">\n<p>Bu sayfa taşındı. Otomatik olarak yönlendirilmezseniz <a href="https://ornek.com/kampanya">yeni adrese gitmek için tıklayın</a>.</p>' },
    { in: { hedef: '/iletisim/', sure: '3' }, text: '<meta http-equiv="refresh" content="3; url=/iletisim/">' },
    { in: { hedef: 'https://ornek.com/ara?q=masa&sayfa=2', sure: '0' }, text: '<meta http-equiv="refresh" content="0; url=https://ornek.com/ara?q=masa&amp;sayfa=2">' },
    { in: { hedef: 'http://eski.ornek.com', sure: '10' }, out: { 'Hedef adres': 'http://eski.ornek.com', 'Bekleme süresi': '10 saniye' } },
    { in: { hedef: '/yeni', kapsam: 'yedek' }, text: '<meta http-equiv="refresh" content="0; url=/yeni">\n<p>Bu sayfa taşındı. Otomatik olarak yönlendirilmezseniz <a href="/yeni">yeni adrese gitmek için tıklayın</a>.</p>' },
    { in: { hedef: '' }, error: true },
    { in: { hedef: 'ftp://ornek.com/dosya' }, error: true },
    { in: { hedef: 'ornek.com', sure: '2,5' }, error: true },
    { in: { hedef: 'yeni sayfa' }, error: true },
  ],
  howto: [
    '"Hedef adres" alanına ziyaretçinin gönderileceği adresi yazın. Aynı site içindeki bir sayfa için <code>/iletisim/</code> gibi eğik çizgiyle başlayan yol da kullanabilirsiniz.',
    'Bekleme süresini saniye olarak girin. Sıfır anında yönlendirir; ziyaretçiye bir bilgilendirme göstermek istiyorsanız birkaç saniye verin.',
    'Çıktı türünü seçin. Sayfa kalıcı olarak taşındıysa canonical satırı ve yedek bağlantı içeren seçenek daha sağlamdır.',
    '"Oluştur" düğmesine basın, kodu kopyalayın ve eski sayfanın <code>head</code> etiketleri arasına yapıştırın.',
  ],
  sections: [
    { h: 'Meta refresh nedir, nasıl çalışır?', p: [
      'Meta refresh, HTML belgesinin başlık bölümüne yazılan ve tarayıcıya "şu kadar saniye sonra şu adrese git" talimatını veren bir etikettir. Yapısı şöyledir: <code>http-equiv</code> özelliği <code>refresh</code> değerini alır, <code>content</code> özelliğinin içine önce saniye, noktalı virgül ve ardından <code>url=</code> ile hedef adres yazılır. Adres yazılmazsa sayfa belirtilen aralıkla kendini yeniler; bu sayfadaki araç her zaman hedef adresli biçimi üretir.',
      'Yönlendirme tarayıcıda gerçekleşir. Sunucu eski sayfayı normal biçimde, başarılı yanıt koduyla gönderir; tarayıcı sayfayı okur, etiketi görür ve süre dolunca yeni adresi açar. Bu, sunucunun daha sayfayı göndermeden "adres değişti" yanıtı verdiği 301 ve 302 yönlendirmelerinden temel farkıdır.',
    ] },
    { h: 'Ne zaman kullanılmalı, ne zaman kullanılmamalı?', p: [
      'Bir adres kalıcı olarak değiştiyse doğru yöntem sunucu tarafında 301 yönlendirmesidir. Hem daha hızlıdır hem de arama motorlarına taşınmayı en açık biçimde anlatır. Sunucu yapılandırma dosyasını, barındırma panelindeki yönlendirme bölümünü ya da içerik yönetim sisteminizin yönlendirme eklentisini kullanabiliyorsanız önce onları tercih edin.',
      'Meta refresh ise bu olanakların bulunmadığı durumların çözümüdür: yalnızca HTML dosyası yükleyebildiğiniz statik barındırma hizmetleri, sunucu ayarına dokunamadığınız paylaşımlı alanlar, eski bir belgenin yerine bırakılan tek sayfalık "taşındık" notları ya da yerel ağdaki basit yönlendirme sayfaları gibi. Arama motorları genel olarak anında yapılan meta yönlendirmeyi kalıcı taşınma işareti gibi, gecikmeli olanı ise geçici yönlendirme gibi yorumlayabildiklerini belirtir; yine de bu davranış sunucu yönlendirmesi kadar kesin değildir ve zamanla değişebilir. Önemli sayfalarda güncel arama motoru belgelerini kontrol edin.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Eski kampanya sayfanızı beş saniye sonra yeni adrese göndermek istediğinizi varsayalım. Hedef olarak <code>ornek.com/kampanya</code>, süre olarak 5 yazıp genişletilmiş çıktıyı seçtiğinizde araç üç satır üretir. İlki meta etiketidir ve içeriği <code>5; url=</code> ile başlayıp güvenli bağlantı protokolü eklenmiş tam adresle sürer. İkincisi aynı adresi gösteren canonical satırıdır; arama motorlarına asıl sayfanın yeni adres olduğunu ayrıca bildirir. Üçüncüsü, yönlendirme çalışmazsa ziyaretçinin tıklayabileceği bağlantıyı içeren kısa bir paragraftır.',
      'Hedef adreste sorgu parametreleri varsa, örneğin <code>ara?q=masa&sayfa=2</code>, parametreleri ayıran ve işareti HTML özelliği içinde karakter varlığı olarak yazılır. Araç bu dönüşümü kendisi yapar; tarayıcı adresi okurken işareti yeniden tek karaktere çevirir, yani yönlendirme doğru adrese gider.',
    ] },
    { h: 'Bekleme süresi ve erişilebilirlik', p: [
      'Süre sıfır olduğunda ziyaretçi eski sayfayı görmeden yeni adrese geçer; taşınan sayfalar için önerilen budur. Sıfırdan büyük sürelerde ziyaretçi bir süre eski sayfada kalır ve sonra beklemediği bir anda başka sayfaya taşınır. Ekran okuyucu kullananlar ve yavaş okuyanlar için bu kafa karıştırıcıdır; erişilebilirlik yönergeleri kullanıcının denetleyemediği zamanlı yönlendirmelerden kaçınılmasını önerir.',
      'Gecikmeli yönlendirme kullanacaksanız sayfaya ne olacağını açıkça yazın ("Beş saniye içinde yeni adrese yönlendirileceksiniz") ve beklemek istemeyenler için tıklanabilir bir bağlantı koyun. Genişletilmiş çıktı seçeneğindeki paragraf tam olarak bu işi görür.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Etiketi <code>body</code> içine koymak: meta etiketleri <code>head</code> bölümünde olmalıdır.',
      'Saniye ile adres arasındaki noktalı virgülü unutmak ya da <code>url=</code> yazmamak.',
      'Yönlendirme zinciri kurmak: A sayfası B\'ye, B sayfası C\'ye yönleniyorsa A\'yı doğrudan C\'ye gönderin.',
      'İki sayfayı birbirine yönlendirerek sonsuz döngü oluşturmak.',
      'Ziyaretçiyi beklemediği, sayfayla ilgisiz bir adrese göndermek. Arama motorları bunu aldatıcı yönlendirme sayabilir ve sayfa arama sonuçlarından çıkarılabilir.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç hedef adresin gerçekten açılıp açılmadığını denetlemez; yalnızca biçimini kontrol eder ve yalnızca http ile https adreslerine izin verir. Meta refresh, tarayıcıda otomatik yönlendirmeyi kapatan kullanıcılarda çalışmaz ve yönlendirme sırasında eski sayfa tam olarak indirildiği için sunucu yönlendirmesinden biraz daha yavaştır. Alan adı taşıma gibi geniş kapsamlı işlerde tek tek sayfalara etiket koymak yerine sunucu düzeyinde kural yazmak gerekir.',
    ] },
  ],
  faq: [
    ['Meta refresh kodu sayfanın neresine yazılır?', 'Kod, HTML belgesinin <code>head</code> etiketleri arasına, tercihen karakter kodlaması satırından hemen sonra yazılır. <code>body</code> bölümüne konulan meta etiketi tarayıcılarca yok sayılabilir.'],
    ['Anında yönlendirme için süre kaç olmalı?', 'Süreyi 0 yazın. Tarayıcı sayfayı yükler yüklemez hedef adrese geçer ve ziyaretçi eski sayfayı görmez.'],
    ['Meta refresh SEO açısından zararlı mı?', 'Kendi başına zararlı değildir, ancak kalıcı taşınmalarda sunucu tarafındaki 301 yönlendirmesi daha açık bir sinyal verir. Sunucu yönlendirmesi yapamıyorsanız anında meta yönlendirme ve canonical satırı birlikte kullanılabilir. Ziyaretçiyi ilgisiz sayfalara gönderen yönlendirmeler ise sorun yaratır.'],
    ['301 yönlendirme ile meta refresh arasındaki fark nedir?', '301 sunucunun verdiği bir yanıt kodudur; tarayıcı eski sayfanın içeriğini hiç indirmeden yeni adrese gider. Meta refresh ise eski sayfa indirildikten sonra tarayıcıda çalışır. İlki daha hızlı ve arama motorları için daha kesindir.'],
    ['Site içi sayfaya yönlendirme yapabilir miyim?', 'Evet. Hedef adresi <code>/iletisim/</code> gibi eğik çizgiyle başlayan bir yol olarak yazın. Bu durumda alan adı eklenmez ve canonical satırı üretilmez, çünkü canonical için tam adres gerekir.'],
    ['Yönlendirme çalışmazsa ziyaretçi ne görür?', 'Yalnızca meta etiketi kullandıysanız eski sayfada kalır. Bu yüzden genişletilmiş çıktıdaki yedek bağlantı paragrafını sayfaya eklemek iyi bir önlemdir; ziyaretçi bağlantıya tıklayarak yeni adrese gider.'],
    ['Belirli aralıklarla sayfayı yenilemek için de kullanılır mı?', 'Etiket adres verilmeden yazılırsa sayfayı belirtilen saniyede bir yeniler. Bu araç yenileme değil yönlendirme kodu üretir; her çıktıda hedef adres bulunur.'],
    ['Yazdığım adres sunucunuza gönderiliyor mu?', 'Hayır. Kod tarayıcınızın içinde üretilir, hedef adres hiçbir yere iletilmez ve kaydedilmez. Araç adrese bağlanmayı da denemez.'],
  ],
  related: ['htaccess-yonlendirme-olustur', 'canonical-olustur', 'meta-etiket-olustur', 'http-durum-kodlari', 'hreflang-olustur'],
};
