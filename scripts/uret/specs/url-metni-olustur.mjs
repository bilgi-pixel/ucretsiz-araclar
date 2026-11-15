export default {
  slug: 'url-metni-olustur',
  title: 'URL Metni (Slug) Oluşturma',
  h1Tail: 'başlıktan temiz adres üretin',
  pageTitle: 'URL Metni (Slug) Oluşturma – Başlıktan SEO Uyumlu Adres Üretme',
  description: 'Başlığınızı küçük harfli, Türkçe karaktersiz ve tireli URL metnine (slug) çevirin. Blog yazısı, ürün sayfası ve kategori adresleri için temiz bağlantı metni üretin.',
  card: 'Başlığı küçük harfli, Türkçe karaktersiz ve tireli URL metnine çevirin; blog, ürün ve kategori adresleri için.',
  category: 'metin',
  keywords: ['slug oluşturma', 'url metni oluşturma', 'seo uyumlu url', 'başlıktan url üretme', 'slug generator', 'kalıcı bağlantı oluşturma', 'türkçe karaktersiz url', 'sef link oluşturma'],
  lead: 'Bir başlığı ya da ifadeyi web adresinde kullanılabilecek temiz bir <strong>URL metnine (slug)</strong> dönüştürün. Araç Türkçe harfleri sadeleştirir, her şeyi küçük harfe çevirir, noktalama işaretlerini atar ve kelimeleri tire ile birleştirir. Her satıra bir başlık yazarak toplu üretim de yapabilirsiniz.',
  button: 'Oluştur',
  inputs: [
    { id: 'metin', label: 'Başlık (her satıra bir tane)', type: 'textarea', placeholder: 'Örn. İstanbul\'da Gezilecek 10 Yer!', rows: 4 },
    { id: 'ayrac', label: 'Kelime ayracı', type: 'select', options: [['-', 'Tire (-)'], ['_', 'Alt çizgi (_)']] },
    { id: 'dolgu', label: 'Bağlaç ve dolgu kelimeleri', type: 'select', options: [['koru', 'Koru'], ['cikar', 'Çıkar (ve, ile, bir, için…)']] },
    { id: 'sinir', label: 'En fazla uzunluk (isteğe bağlı)', type: 'number', placeholder: 'Örn. 60', hint: 'Boş bırakılırsa kısaltma yapılmaz; kesme kelime sınırından yapılır' },
  ],
  compute(v, h) {
    const satirlar = String(v.metin ?? '').split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
    if (!satirlar.length) h.err('URL metnine çevrilecek başlığı yazın.');
    if (satirlar.length > 5000) h.err('Tek seferde en fazla 5.000 başlık işlenebilir.');
    const ayrac = v.ayrac === '_' ? '_' : '-';
    let sinir = 0;
    if (String(v.sinir ?? '').trim() !== '') {
      sinir = h.posint(v.sinir, 'En fazla uzunluk');
      if (sinir < 3) h.err('"En fazla uzunluk" en az 3 olmalı.');
    }
    const TR = { 'ç': 'c', 'Ç': 'c', 'ğ': 'g', 'Ğ': 'g', 'ı': 'i', 'I': 'i', 'İ': 'i', 'ö': 'o', 'Ö': 'o', 'ş': 's', 'Ş': 's', 'ü': 'u', 'Ü': 'u', 'ß': 'ss', 'æ': 'ae', 'Æ': 'ae', 'œ': 'oe', 'Œ': 'oe', 'ø': 'o', 'Ø': 'o', 'đ': 'd', 'Đ': 'd', 'ł': 'l', 'Ł': 'l' };
    const DOLGU = new Set(['ve', 'veya', 'ile', 'bir', 'bu', 'de', 'da', 'icin', 'ama', 'gibi', 'ki']);
    const cevir = (ham) => {
      let t = '';
      for (const c of ham.normalize('NFC')) t += TR[c] !== undefined ? TR[c] : c;
      t = t.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
      t = t.replace(/&/g, ' ve ').replace(/['’‘`´]/g, '');
      let kelimeler = t.split(/[^a-z0-9]+/).filter(Boolean);
      if (v.dolgu === 'cikar') {
        const sade = kelimeler.filter((k) => !DOLGU.has(k));
        if (sade.length) kelimeler = sade;
      }
      if (sinir && kelimeler.length) {
        const secilen = [];
        let uzunluk = 0;
        for (const k of kelimeler) {
          const yeni = uzunluk + (secilen.length ? 1 : 0) + k.length;
          if (yeni > sinir) break;
          secilen.push(k); uzunluk = yeni;
        }
        kelimeler = secilen.length ? secilen : [kelimeler[0].slice(0, sinir)];
      }
      return kelimeler;
    };
    const sonuclar = satirlar.map(cevir);
    const dolu = sonuclar.filter((k) => k.length);
    if (!dolu.length) h.err('Başlıkta harf ya da rakam bulunamadı; URL metni yalnızca harf ve rakamlardan üretilir.');
    const metinler = sonuclar.map((k) => k.join(ayrac));
    if (satirlar.length === 1) {
      return {
        rows: [
          ['URL metni', metinler[0]],
          ['Uzunluk', h.fmt(metinler[0].length, 0) + ' karakter'],
          ['Kelime sayısı', h.fmt(sonuclar[0].length, 0)],
        ],
        text: metinler[0],
      };
    }
    return {
      rows: [
        ['Oluşturulan URL metni', h.fmt(dolu.length, 0) + ' adet'],
        ['En uzun', h.fmt(Math.max(...metinler.map((m) => m.length)), 0) + ' karakter'],
      ],
      text: metinler.join('\n'),
      note: dolu.length < satirlar.length ? 'Harf ya da rakam içermeyen satırlar boş bırakıldı.' : undefined,
    };
  },
  cases: [
    { in: { metin: 'İstanbul\'da Gezilecek 10 Yer!' }, out: { 'URL metni': 'istanbulda-gezilecek-10-yer', 'Uzunluk': '27 karakter', 'Kelime sayısı': '4' }, text: 'istanbulda-gezilecek-10-yer' },
    { in: { metin: 'Çiğ Köfte & Şalgam' }, out: { 'URL metni': 'cig-kofte-ve-salgam', 'Uzunluk': '19 karakter' } },
    { in: { metin: '  Yeni   Ürün -- 2026 (İndirimli)  ' }, out: { 'URL metni': 'yeni-urun-2026-indirimli' } },
    { in: { metin: 'Aylık Satış Raporu', ayrac: '_' }, out: { 'URL metni': 'aylik_satis_raporu' } },
    { in: { metin: 'İstanbul\'da Gezilecek 10 Yer!', sinir: '20' }, out: { 'URL metni': 'istanbulda-gezilecek', 'Uzunluk': '20 karakter' } },
    { in: { metin: 'Kedi ve Köpek için Bir Rehber', dolgu: 'cikar' }, out: { 'URL metni': 'kedi-kopek-rehber', 'Kelime sayısı': '3' } },
    { in: { metin: 'Café Münih %50 İNDİRİM' }, out: { 'URL metni': 'cafe-munih-50-indirim' } },
    { in: { metin: 'IŞIK' }, out: { 'URL metni': 'isik' } },
    { in: { metin: 'Ana Sayfa\nHakkımızda\n\nİletişim' }, out: { 'Oluşturulan URL metni': '3 adet', 'En uzun': '10 karakter' }, text: 'ana-sayfa\nhakkimizda\niletisim' },
    { in: { metin: 'merhabalar dünya', sinir: '5' }, out: { 'URL metni': 'merha' } },
    { in: { metin: '' }, error: true },
    { in: { metin: '!!! ???' }, error: true },
    { in: { metin: 'deneme', sinir: '2' }, error: true },
  ],
  howto: [
    'Sayfanızın, yazınızın ya da ürününüzün başlığını kutuya yazın. Birden fazla başlık için her birini ayrı satıra girin.',
    'Kelime ayracını seçin. Web adreslerinde yaygın tercih tiredir; alt çizgi yalnızca sisteminiz özellikle gerektiriyorsa kullanılmalıdır.',
    'Adresi kısaltmak isterseniz bağlaç ve dolgu kelimelerini çıkarma seçeneğini açın ya da "En fazla uzunluk" alanına bir karakter sınırı yazın.',
    '"Oluştur" düğmesine basın. URL metni, uzunluğu ve kelime sayısıyla birlikte görünür.',
    'Sonucu kopyalayıp içerik yönetim sisteminizdeki "kalıcı bağlantı", "URL" ya da "slug" alanına yapıştırın.',
  ],
  sections: [
    { h: 'URL metni (slug) nedir?', p: [
      'Bir web adresinin alan adından ve klasörlerden sonra gelen, o sayfayı tanımlayan okunabilir bölümüne URL metni ya da İngilizce adıyla <em>slug</em> denir. Türkçe kaynaklarda kalıcı bağlantı metni, SEF bağlantı ya da arama motoru dostu adres olarak da geçer. Bir gezi yazısının adresinin sonundaki <code>istanbulda-gezilecek-10-yer</code> bölümü tam olarak budur.',
      'İyi bir URL metni, adresi gören kişiye sayfanın konusunu tıklamadan önce anlatır. Paylaşıldığında, bir belgeye yapıştırıldığında ya da sesli olarak tarif edildiğinde anlaşılır kalır. Rastgele sayı ve simgelerden oluşan adresler ise ne okuyana ne de arama motoruna sayfanın içeriği hakkında bir ipucu verir.',
    ] },
    { h: 'Araç başlığı hangi adımlarla dönüştürür?', ol: [
      '<strong>Türkçe harfler sadeleştirilir:</strong> ç→c, ğ→g, ı→i, İ→i, ö→o, ş→s, ü→u. Diğer dillerin aksanlı harfleri de (é, ñ, ä gibi) temel karşılıklarına indirgenir.',
      '<strong>Her şey küçük harfe çevrilir.</strong> Büyük I harfi Türkçe başlık varsayılarak i olur; böylece "IŞIK" kelimesi <code>isik</code> biçiminde yazılır.',
      '<strong>Kesme işaretleri silinir</strong> ve ek kelimeye bitiştirilir: "İstanbul\'da" ifadesi <code>istanbulda</code> olur, ortasından bölünmez.',
      '<strong>"&" işareti "ve" kelimesine çevrilir.</strong>',
      '<strong>Harf ve rakam dışındaki her şey ayraç sayılır:</strong> boşluk, nokta, virgül, parantez, ünlem, yüzde işareti, emoji ve benzerleri kelime sınırı kabul edilir.',
      '<strong>Art arda gelen ayraçlar teke indirilir</strong>, baştaki ve sondaki ayraçlar atılır.',
      'İstenmişse dolgu kelimeleri çıkarılır ve metin, kelime ortasından bölünmeden uzunluk sınırına göre kısaltılır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> <code>İstanbul\'da Gezilecek 10 Yer!</code> başlığı <code>istanbulda-gezilecek-10-yer</code> olur. Sonuç dört kelimeden oluşur ve 27 karakter uzunluğundadır: kelimelerdeki 24 harf ve rakama üç tire eklenir. Ünlem işareti atılmış, kesme işareti silinmiş, İ harfi i olmuştur.',
      '<strong>Örnek 2:</strong> <code>Çiğ Köfte & Şalgam</code> başlığı <code>cig-kofte-ve-salgam</code> biçimine gelir; "&" işareti "ve" olarak yazılmıştır ve uzunluk 19 karakterdir.',
      '<strong>Örnek 3:</strong> Aynı İstanbul başlığına 20 karakterlik sınır koyarsanız sonuç <code>istanbulda-gezilecek</code> olur. Üçüncü kelime olan "10" eklendiğinde uzunluk 23\'e çıkacağı için araç orada durur; kelimeyi ortasından kesip yarım bir ifade bırakmaz.',
      '<strong>Örnek 4:</strong> Dolgu kelimelerini çıkarma seçeneğiyle <code>Kedi ve Köpek için Bir Rehber</code> başlığı <code>kedi-kopek-rehber</code> olarak kısalır.',
    ] },
    { h: 'İyi bir URL metni için öneriler', ul: [
      '<strong>Kısa ve açıklayıcı tutun.</strong> Üç ile beş kelimelik adresler hem okunur hem de paylaşılırken kesilmez. Başlığın tamamını taşımak zorunda değilsiniz.',
      '<strong>Tire kullanın.</strong> Tire, kelime ayırıcı olarak yaygın biçimde tanınır; alt çizgi ise kelimeleri birbirine bağlı gösterebilir ve altı çizili bağlantılarda görünmez olur.',
      '<strong>Yıl ve sayı eklerken düşünün.</strong> Adrese yazdığınız yıl, içeriği güncellediğinizde eskimiş görünür. Zamana bağlı olmayan içeriklerde yılı adrese koymamak daha uzun ömürlüdür.',
      '<strong>Yayımladıktan sonra değiştirmeyin.</strong> Adres değişirse eski bağlantılar çalışmaz hâle gelir. Değiştirmek zorunda kalırsanız eski adresten yenisine kalıcı yönlendirme tanımlayın.',
      '<strong>Benzersiz olsun.</strong> Aynı sitede iki sayfa aynı URL metnini kullanamaz; içerik yönetim sistemleri çoğunlukla ikincisinin sonuna sayı ekler.',
      '<strong>Anlamı denetleyin.</strong> Türkçe harfler sadeleşince bazı kelimeler başka kelimelere benzeyebilir. Sonucu bir kez yüksek sesle okumak istenmeyen çağrışımları yakalamanızı sağlar.',
    ] },
    { h: 'Türkçe karakter adreste kullanılabilir mi?', p: [
      'Teknik olarak evet; günümüz tarayıcıları adres çubuğunda Türkçe harfleri gösterebilir. Ancak adres kopyalanıp başka bir yere yapıştırıldığında bu harfler çoğu zaman yüzde işaretiyle başlayan kodlara dönüşür ve "ş" gibi tek bir harf altı karakterlik bir diziye açılır. Sonuç uzun, okunmaz ve hataya açık bir bağlantıdır. Bu nedenle Türkçe sitelerde yerleşik uygulama, adres metnini sadeleştirilmiş harflerle yazmak, başlığı ve sayfa içeriğini ise doğru Türkçe yazımla bırakmaktır.',
      'Arama sıralamalarını pek çok etken belirler ve adres metni bunlardan yalnızca küçük bir parçadır. Temiz bir URL metni tek başına üst sıra getirmez; asıl kazancı kullanıcıya okunabilir ve güven veren bir bağlantı sunmasıdır.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç yalnızca Latin harflerini ve rakamları tanır. Kiril, Arap ya da Çin yazısıyla yazılmış başlıklar Latin harflerine çevrilmez; bu karakterler ayraç sayılıp atılır. Başlıkta hiç Latin harfi ya da rakam yoksa araç hata verir. Dolgu kelimesi listesi bilinçli olarak kısa tutulmuştur (ve, veya, ile, bir, bu, de, da, için, ama, gibi, ki); bir başlığın tüm kelimeleri bu listedeyse hiçbiri çıkarılmaz. Uzunluk sınırı ilk kelimeden bile kısaysa o kelime sınıra kadar kesilir. Tek seferde en fazla 5.000 satır işlenir.',
    ] },
  ],
  faq: [
    ['Slug ne demek?', 'Slug, bir web sayfasının adresinde o sayfayı tanımlayan okunabilir bölümdür. Genellikle başlıktan türetilir; küçük harflerden, rakamlardan ve tirelerden oluşur. Türkçede URL metni ya da kalıcı bağlantı metni olarak da adlandırılır.'],
    ['URL metninde tire mi alt çizgi mi kullanmalıyım?', 'Web adreslerinde yaygın ve önerilen tercih tiredir, çünkü kelimeleri açıkça ayırır ve altı çizili bağlantılarda da görünür kalır. Alt çizgiyi yalnızca kullandığınız sistem bunu gerektiriyorsa seçin.'],
    ['Kesme işareti neden tireye dönüşmüyor?', 'Kesme işareti Türkçede eki özel addan ayırır, kelimeyi bölmez. "Ankara\'nın" ifadesinin "ankara-nin" yerine "ankaranin" olması adresi daha doğal gösterir; bu yüzden kesme işareti silinip ek kelimeye bitiştirilir.'],
    ['URL metni en fazla kaç karakter olmalı?', 'Kesin bir kural yoktur, ancak kısa adresler daha okunur ve paylaşılırken kesilmez. Pratikte 50–60 karakteri ve beş altı kelimeyi aşmamak iyi bir hedeftir. "En fazla uzunluk" alanıyla kendi sınırınızı uygulayabilirsiniz.'],
    ['Rakamlar ve yüzde gibi işaretler ne oluyor?', 'Rakamlar korunur. Yüzde, artı, eğik çizgi, nokta gibi işaretler ayraç sayılır ve atılır; "%50 İndirim" ifadesi "50-indirim" olur. İşaretin anlamı önemliyse başlığa "yüzde" gibi kelimeyle yazabilirsiniz.'],
    ['Birden fazla başlığı aynı anda çevirebilir miyim?', 'Evet. Her başlığı ayrı satıra yazın; araç her satır için ayrı bir URL metni üretir ve sonuçları aynı sırayla alt alta verir. Boş satırlar dikkate alınmaz.'],
    ['Yayındaki bir sayfanın URL metnini değiştirmeli miyim?', 'Zorunlu olmadıkça hayır. Adres değiştiğinde o sayfaya verilmiş bağlantılar ve kayıtlı yer imleri bozulur. Değiştirmeniz gerekiyorsa eski adresten yeni adrese kalıcı yönlendirme kurun.'],
    ['Başlıklarım bir sunucuya gönderiliyor mu?', 'Hayır. Dönüşüm tamamen tarayıcınızda gerçekleşir; yazdığınız başlıklar hiçbir yere iletilmez ve saklanmaz. Sayfa açıldıktan sonra çevrimdışı da çalışır.'],
  ],
  related: ['turkce-karakter-donustur', 'url-kodla', 'meta-etiket-olustur', 'buyuk-kucuk-harf-donustur', 'camel-snake-donustur'],
};
