export default {
  slug: 'bosluk-temizle',
  title: 'Fazla Boşlukları Temizleme',
  h1Tail: 'çift boşlukları ve kenar boşluklarını silin',
  pageTitle: 'Fazla Boşlukları Temizleme – Çift Boşluk ve Sekme Silme Aracı',
  description: 'Metindeki çift boşlukları teke indirin, satır başı ve sonundaki boşlukları silin, sekmeleri boşluğa çevirin. PDF ve web kaynaklı metinleri tek tıkla düzeltin.',
  card: 'Metindeki çift boşlukları teke indirin, satır başı-sonu boşluklarını ve sekmeleri temizleyin.',
  category: 'metin',
  keywords: ['fazla boşlukları temizleme', 'çift boşluk silme', 'metindeki boşlukları kaldırma', 'boşluk temizleme aracı', 'satır başı boşluk silme', 'sekme silme', 'gereksiz boşlukları silme', 'trim metin'],
  lead: 'Kopyala-yapıştır sonrası metne dolan <strong>çift boşlukları</strong>, satır başındaki ve sonundaki artık boşlukları, sekmeleri ve görünmeyen özel boşluk karakterlerini temizleyin. Hangi düzeltmelerin yapılacağını siz seçersiniz; kelimelere ve harflere dokunulmaz.',
  button: 'Temizle',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Boşluklarını düzeltmek istediğiniz metni buraya yapıştırın', wide: true },
    { id: 'coklu', label: 'Art arda boşluklar', type: 'select', options: [['evet', 'Teke indir'], ['hayir', 'Dokunma']] },
    { id: 'kenar', label: 'Satır başı ve sonundaki boşluklar', type: 'select', options: [['evet', 'Sil'], ['hayir', 'Dokunma']] },
    { id: 'sekme', label: 'Sekme karakterleri', type: 'select', options: [['evet', 'Boşluğa çevir'], ['hayir', 'Dokunma']] },
    { id: 'satirYapisi', label: 'Satır sonları', type: 'select', options: [['koru', 'Satır yapısını koru'], ['bos', 'Boş satırları da sil'], ['tek', 'Tümünü tek satıra çevir']] },
    { id: 'noktalama', label: 'Noktalama öncesi boşluk', type: 'select', options: [['hayir', 'Dokunma'], ['evet', 'Sil ("kelime ," → "kelime,")']] },
  ],
  compute(v, h) {
    const ham = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (ham === '') h.err('Boşlukları temizlemek için "Metin" alanına bir metin yapıştırın.');
    if (ham.trim() === '') h.err('Metin yalnızca boşluklardan oluşuyor. İçinde yazı bulunan bir metin yapıştırın.');
    // Bölünemez boşluk ve diğer özel boşluk karakterleri normal boşluğa çevrilir
    let s = ham.replace(/[   -   　]/g, ' ');
    if (v.sekme !== 'hayir') s = s.replace(/\t/g, ' ');
    const coklu = v.coklu !== 'hayir', kenar = v.kenar !== 'hayir';
    let satirlar = s.split('\n').map((x) => {
      let y = x;
      if (coklu) y = y.replace(/ {2,}/g, ' ');
      if (v.noktalama === 'evet') y = y.replace(/ +([,.;:!?])/g, '$1');
      if (kenar) y = y.replace(/^[ \t]+|[ \t]+$/g, '');
      return y;
    });
    let cikti;
    if (v.satirYapisi === 'tek') {
      cikti = satirlar.map((x) => x.replace(/^[ \t]+|[ \t]+$/g, '')).filter((x) => x !== '').join(' ');
    } else {
      if (v.satirYapisi === 'bos') satirlar = satirlar.filter((x) => x.trim() !== '');
      cikti = satirlar.join('\n');
    }
    const once = Array.from(ham).length, sonra = Array.from(cikti).length;
    return {
      rows: [
        ['Silinen karakter', h.fmt(once - sonra, 0)],
        ['Önceki uzunluk', h.fmt(once, 0) + ' karakter'],
        ['Sonraki uzunluk', h.fmt(sonra, 0) + ' karakter'],
      ],
      text: cikti,
      note: once === sonra && ham === cikti ? 'Metinde seçtiğiniz kurallara göre temizlenecek fazla boşluk bulunamadı.' : 'Bölünemez boşluk gibi özel boşluk karakterleri normal boşluğa çevrildi. Uzunluklara satır sonu karakterleri dahildir.',
    };
  },
  cases: [
    { in: { metin: '  Merhaba    dünya  ' }, text: 'Merhaba dünya', out: { 'Silinen karakter': '7', 'Önceki uzunluk': '20 karakter', 'Sonraki uzunluk': '13 karakter' } },
    { in: { metin: 'bir  iki\n   üç\tdört   ' }, text: 'bir iki\nüç dört', out: { 'Silinen karakter': '7', 'Önceki uzunluk': '22 karakter', 'Sonraki uzunluk': '15 karakter' } },
    { in: { metin: 'satır bir \n\n  satır iki', satirYapisi: 'tek' }, text: 'satır bir satır iki' },
    { in: { metin: 'a\n\n  \nb', satirYapisi: 'bos' }, text: 'a\nb', out: { 'Silinen karakter': '4' } },
    { in: { metin: 'Merhaba , nasılsın ?  İyiyim .', noktalama: 'evet' }, text: 'Merhaba, nasılsın? İyiyim.' },
    { in: { metin: '  a   b  ', coklu: 'hayir', kenar: 'evet' }, text: 'a   b' },
    { in: { metin: '  a   b  ', coklu: 'evet', kenar: 'hayir' }, text: ' a b ' },
    { in: { metin: 'a  b' }, text: 'a b', out: { 'Silinen karakter': '1' } },
    { in: { metin: 'a\t\tb  c', sekme: 'hayir' }, text: 'a\t\tb c' },
    { in: { metin: 'temiz metin' }, text: 'temiz metin', out: { 'Silinen karakter': '0' } },
    { in: { metin: '' }, error: true },
    { in: { metin: '   \n\t  ' }, error: true },
  ],
  howto: [
    'Düzeltmek istediğiniz metni "Metin" kutusuna yapıştırın.',
    'Varsayılan ayarlar çift boşlukları teke indirir, satır başı ve sonundaki boşlukları siler, sekmeleri boşluğa çevirir. Kod ya da girintili metin temizliyorsanız ilgili seçenekleri "Dokunma" yapın.',
    '"Satır sonları" listesinden satır yapısının korunmasını, boş satırların silinmesini ya da metnin tek satıra çevrilmesini seçin.',
    'Virgül ve noktadan önce kalmış boşlukları da düzeltmek istiyorsanız "Noktalama öncesi boşluk" seçeneğini "Sil" yapın.',
    '"Temizle" düğmesine basın; düzeltilmiş metni sonuç kutusundan kopyalayın. Üstteki satırlar kaç karakterin silindiğini gösterir.',
  ],
  sections: [
    { h: 'Fazla boşluk nereden gelir?', p: [
      'Metin içindeki gereksiz boşlukların büyük bölümü bir kaynaktan diğerine kopyalama sırasında oluşur. PDF dosyalarında iki yana yaslanmış paragraflardan alınan metinlerde kelime araları iki ya da üç boşluğa çıkar. İnternet sayfalarından kopyalanan yazılarda görünmeyen <em>bölünemez boşluk</em> karakterleri bulunur; bunlar normal boşluk gibi görünür ama arama ve karşılaştırma işlemlerinde eşleşmez. Tablolama programlarından alınan hücrelerde değerin sonunda boşluk kalır. Eski alışkanlıkla noktadan sonra iki boşluk bırakanlar ya da hizalamayı boşluk tuşuyla yapanlar da metne fazladan karakter ekler.',
      'Bu boşluklar çoğu zaman göze batmaz, ama sonuçları olur: karakter sınırı olan alanlarda yer kaplar, aynı kaydın iki farklı değer gibi görünmesine yol açar, iki yana yaslı metinde kelime aralarını bozar ve aramada beklenen sonucun çıkmamasına neden olur.',
    ] },
    { h: 'Seçenekler ne yapar?', ul: [
      '<strong>Art arda boşluklar:</strong> yan yana gelen iki ya da daha fazla boşluğu tek boşluğa indirir. Kelimeler arasındaki tek boşluklara dokunmaz.',
      '<strong>Satır başı ve sonundaki boşluklar:</strong> her satırın başındaki girintiyi ve sonundaki artık boşlukları siler. Girintinin anlam taşıdığı kod ve iç içe listelerde "Dokunma" seçin.',
      '<strong>Sekme karakterleri:</strong> her sekmeyi bir boşluğa çevirir; çift boşluk seçeneği açıksa art arda sekmeler de tek boşluğa iner. Sekmeyle ayrılmış tablo verisinde sütunların bozulmaması için "Dokunma" seçin.',
      '<strong>Satır sonları:</strong> "Satır yapısını koru" satırları olduğu gibi bırakır. "Boş satırları da sil" yalnızca dolu satırları tutar. "Tümünü tek satıra çevir" satırları aralarına birer boşluk koyarak birleştirir.',
      '<strong>Noktalama öncesi boşluk:</strong> virgül, nokta, noktalı virgül, iki nokta, ünlem ve soru işaretinden önceki boşlukları siler.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Başında iki, kelimeleri arasında dört, sonunda iki boşluk bulunan "  Merhaba    dünya  " metni toplam 20 karakterdir. Varsayılan ayarlarla kelime arasındaki dört boşluk teke iner (3 karakter silinir), baştaki ve sondaki ikişer boşluk kaldırılır (4 karakter silinir). Sonuç 13 karakterlik "Merhaba dünya" olur; toplam 7 karakter silinmiştir.',
      'İki satırlı bir örnek: ilk satır "bir  iki" (arada iki boşluk), ikinci satır üç boşlukla başlayıp "üç", bir sekme, "dört" ve üç boşlukla bitiyor. Satır sonu karakteriyle birlikte 22 karakter eder. Temizlik sonrası ilk satır "bir iki", ikinci satır "üç dört" olur; 15 karakter kalır ve 7 karakter silinmiş olur. Noktalama seçeneği açıkken "Merhaba , nasılsın ?  İyiyim ." cümlesi "Merhaba, nasılsın? İyiyim." biçimine gelir.',
    ] },
    { h: 'Görünmeyen özel boşluk karakterleri', p: [
      'Klavyedeki boşluk tuşunun ürettiği karakterin dışında, Unicode\'da görünüşü boşluk olan başka karakterler de vardır. En yaygını bölünemez boşluktur; iki kelimenin satır sonunda birbirinden ayrılmaması için kullanılır ve internet sayfalarında sık geçer. Bunun yanında dar boşluk, ince boşluk ve tam genişlikli boşluk gibi dizgi boşlukları bulunur. Araç bunların tümünü her durumda normal boşluğa çevirir; böylece çift boşluk denetimi onları da yakalar ve temizlenen metin arama, sıralama ve karşılaştırmada tutarlı davranır.',
    ] },
    { h: 'Kullanım alanları', ul: [
      'PDF\'ten ya da taranmış belgeden kopyalanan metni kelime işlemciye aktarmadan önce düzeltmek',
      'Tablo hücrelerindeki değerlerin başında ve sonunda kalan boşlukları toplu olarak silmek',
      'Karakter sınırı olan ilan, form ve sosyal medya alanlarına yapıştırılacak metni kısaltmak',
      'Birkaç satıra bölünmüş bir adresi ya da cümleyi tek satıra çevirmek',
      'Ad soyad, e-posta ve ürün kodu listelerini karşılaştırma ya da tekilleştirme öncesinde tek biçime getirmek',
      'Çeviri ve dizgi öncesinde metni çift boşluklardan arındırmak',
    ] },
    { h: 'Dikkat edilecekler ve sınırlar', p: [
      'Python ve YAML gibi girintinin anlam taşıdığı dillerde satır başı boşluklarını silmek kodu bozar; bu tür metinlerde kenar boşluğu ve sekme seçeneklerini kapatın. Boşluklarla hizalanmış düz metin tablolarında çift boşlukları teke indirmek sütun hizasını dağıtır. Noktalama seçeneği kural gözetmez: "3 .5" gibi yanlış yazılmış bir sayıyı da birleştirir, üç noktadan önce bilerek bırakılmış boşluğu da siler; bu yüzden varsayılan olarak kapalıdır.',
      'Araç noktalama işaretinden <em>sonra</em> eksik kalan boşluğu eklemez, yalnızca fazlalıkları kaldırır. Sıfır genişlikli görünmez karakterler boşluk sayılmadığı için silinmez. Satır sonları çıktıda tek tip (LF) üretilir.',
    ] },
  ],
  faq: [
    ['Çift boşlukları teke indirmek kelimeleri birleştirir mi?', 'Hayır. Yan yana gelen birden fazla boşluktan yalnızca biri bırakılır; kelimeler arasında her zaman en az bir boşluk kalır.'],
    ['Satır başındaki girintiler silinir mi?', 'Varsayılan ayarda evet; her satırın başındaki ve sonundaki boşluklar silinir. Girintiyi korumak için "Satır başı ve sonundaki boşluklar" seçeneğini "Dokunma" yapın.'],
    ['Sekmeler ne oluyor?', 'Varsayılan ayarda her sekme bir boşluğa çevrilir ve art arda gelenler tek boşluğa iner. Sekmeyle ayrılmış veride sütunları korumak için sekme seçeneğini "Dokunma" yapın.'],
    ['Metni tek satıra çevirince satırlar arasına ne konur?', 'Dolu satırlar aralarına birer boşluk konularak birleştirilir; boş satırlar atlanır. Böylece kelimeler birbirine yapışmaz.'],
    ['Bölünemez boşluk nedir, neden temizleniyor?', 'Görünüşü normal boşlukla aynı olan, ancak satır sonunda kelimelerin ayrılmasını engelleyen özel bir karakterdir. Arama ve karşılaştırmalarda normal boşlukla eşleşmediği için sorun çıkarır; araç bunu normal boşluğa çevirir.'],
    ['Excel\'deki KIRP işleviyle farkı nedir?', 'Mantık benzerdir: kenar boşlukları silinir, aradaki çoklu boşluklar teke iner. Bu araç ek olarak sekmeleri ve özel boşluk karakterlerini de işler, satır yapısını ve noktalama öncesi boşlukları düzenleme seçeneği sunar.'],
    ['Tüm boşlukları silip kelimeleri bitiştirebilir miyim?', 'Hayır. Bu araç yalnızca fazla boşlukları temizler; kelimeler arasındaki tek boşlukları korur. Bir karakteri tümüyle kaldırmak için bul ve değiştir aracını kullanabilirsiniz.'],
    ['Metnim sunucuya gönderiliyor mu?', 'Hayır. Temizleme tarayıcınızın içinde yapılır; yapıştırdığınız metin hiçbir yere iletilmez ve saklanmaz.'],
  ],
  related: ['bos-satirlari-sil', 'tekrar-eden-satirlari-sil', 'satirlari-birlestir', 'sekme-bosluk-donustur', 'bul-ve-degistir', 'karakter-sayaci'],
};
