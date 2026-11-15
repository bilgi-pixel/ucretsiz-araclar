export default {
  slug: 'sutun-ayikla',
  title: 'Metinden Sütun Ayıklama',
  h1Tail: 'ayraçla ayrılmış veriden sütun seç',
  pageTitle: 'Metinden Sütun Ayıklama – CSV ve Tablo Metninden Sütun Seçme',
  description: 'Virgül, sekme, noktalı virgül ya da boşlukla ayrılmış metinden istediğiniz sütunları ayıklayın. Sütun numarası ya da aralık yazın, sırayı değiştirin.',
  card: 'Virgül, sekme ya da boşlukla ayrılmış satırlardan istediğiniz sütunları seçip ayrı liste olarak alın.',
  category: 'metin',
  keywords: ['sütun ayıklama', 'metinden sütun seçme', 'csv sütun ayırma', 'belirli sütunu alma', 'sekmeyle ayrılmış metin', 'tablodan sütun kopyalama', 'cut komutu online', 'sütun çıkarma'],
  lead: `Her satırı aynı ayraçla bölünmüş bir metinden, örneğin bir CSV dökümünden ya da tablodan kopyalanmış satırlardan, <strong>yalnızca istediğiniz sütunları</strong> alın. Tek sütun, birkaç sütun ya da bir aralık seçebilir, sütunların sırasını da değiştirebilirsiniz.`,
  button: 'Ayıkla',
  inputs: [
    { id: 'metin', label: 'Satırlar', type: 'textarea', placeholder: 'Ad;Soyad;Şehir biçimindeki satırları buraya yapıştırın' },
    { id: 'ayrac', label: 'Sütun ayracı', type: 'select', options: [['sekme', 'Sekme'], ['virgul', 'Virgül (,)'], ['noktalivirgul', 'Noktalı virgül (;)'], ['bosluk', 'Boşluk (art arda boşluklar tek sayılır)'], ['dikey', 'Dikey çizgi (|)'], ['ozel', 'Özel ayraç (aşağıya yazın)']] },
    { id: 'ozelAyrac', label: 'Özel ayraç', type: 'text', placeholder: 'Örn. ::', hint: 'Yalnızca "Özel ayraç" seçiliyken kullanılır.' },
    { id: 'sutun', label: 'Alınacak sütunlar', type: 'text', placeholder: 'Örn. 2 ya da 1,3 ya da 2-4', hint: 'Soldan 1\'den başlar. Virgülle birden çok sütun, tireyle aralık yazabilirsiniz.' },
    { id: 'cikis', label: 'Çıktıda sütunlar arası ayraç', type: 'select', options: [['ayni', 'Girdiyle aynı'], ['sekme', 'Sekme'], ['virgul', 'Virgül'], ['noktalivirgul', 'Noktalı virgül'], ['bosluk', 'Boşluk']] },
  ],
  compute(v, h) {
    const ham = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (ham.trim() === '') h.err('"Satırlar" alanına sütunlara ayrılacak metni yapıştırın.');
    const sabit = { sekme: '\t', virgul: ',', noktalivirgul: ';', dikey: '|', bosluk: ' ' };
    let ayr;
    if (v.ayrac === 'ozel') {
      ayr = String(v.ozelAyrac ?? '');
      if (ayr === '') h.err('"Özel ayraç" alanına sütunları ayıran ifadeyi yazın ya da listeden hazır bir ayraç seçin.');
    } else ayr = sabit[v.ayrac] ?? '\t';
    const spec = String(v.sutun ?? '').trim();
    if (spec === '') h.err('"Alınacak sütunlar" alanına en az bir sütun numarası yazın (örn. 2).');
    const secim = [];
    for (const p of spec.split(/[,;\s]+/).filter(Boolean)) {
      let m;
      if (/^\d+$/.test(p)) secim.push(Number(p));
      else if ((m = /^(\d+)[-–](\d+)$/.exec(p))) {
        const a = Number(m[1]), b = Number(m[2]);
        if (Math.abs(b - a) > 999) h.err('Sütun aralığı çok geniş. En fazla 1000 sütunluk aralık yazın.');
        const adim = a <= b ? 1 : -1;
        for (let i = a; i !== b + adim; i += adim) secim.push(i);
      } else h.err(`"${p}" geçerli bir sütun tanımı değil. 2, 1,3 ya da 2-4 biçiminde yazın.`);
    }
    if (secim.some((n) => n < 1)) h.err('Sütun numaraları 1\'den başlar; 0 yazılamaz.');
    const satirlar = ham.split('\n').filter((s) => s.trim() !== '');
    const bol = (s) => v.ayrac === 'bosluk' ? s.trim().split(/\s+/) : s.split(ayr).map((x) => x.trim());
    const tablo = satirlar.map(bol);
    const enCok = Math.max(...tablo.map((r) => r.length));
    const enBuyuk = Math.max(...secim);
    if (enBuyuk > enCok) h.err(`${enBuyuk}. sütun istendi ama satırlarda en fazla ${enCok} sütun var. Ayracı ve sütun numarasını kontrol edin.`);
    const cikisAyr = v.cikis === 'ayni' || !sabit[v.cikis] ? ayr : sabit[v.cikis];
    let eksik = 0;
    const sonuc = tablo.map((r) => {
      if (secim.some((n) => n > r.length)) eksik++;
      return secim.map((n) => r[n - 1] ?? '').join(cikisAyr);
    }).join('\n');
    return {
      rows: [
        ['İşlenen satır', String(tablo.length)],
        ['Alınan sütunlar', secim.join(', ')],
        ['Satırlardaki en fazla sütun', String(enCok)],
        ['Eksik sütunlu satır', String(eksik)],
      ],
      text: sonuc,
      note: eksik ? 'Bazı satırlarda istenen sütun bulunmadığı için o hücreler boş bırakıldı.'
        : 'Boş satırlar atlanır; hücrelerin başındaki ve sonundaki boşluklar temizlenir. Tırnak içindeki ayraçlar ayrıca tanınmaz.',
    };
  },
  cases: [
    { in: { metin: 'Ad;Soyad;Şehir\nAli;Yılmaz;Ankara\nAyşe;Kaya;İzmir', ayrac: 'noktalivirgul', sutun: '3' }, out: { 'İşlenen satır': '3', 'Alınan sütunlar': '3', 'Satırlardaki en fazla sütun': '3', 'Eksik sütunlu satır': '0' }, text: 'Şehir\nAnkara\nİzmir' },
    { in: { metin: 'Ali,Yılmaz,Ankara,34\nAyşe,Kaya,İzmir,28', ayrac: 'virgul', sutun: '3,1' }, out: { 'Alınan sütunlar': '3, 1' }, text: 'Ankara,Ali\nİzmir,Ayşe' },
    { in: { metin: 'a\tb\tc\td\n1\t2\t3\t4', sutun: '2-4', cikis: 'virgul' }, out: { 'Alınan sütunlar': '2, 3, 4' }, text: 'b,c,d\n2,3,4' },
    { in: { metin: 'kalem    12   adet\nsilgi 5 adet', ayrac: 'bosluk', sutun: '1 2' }, text: 'kalem 12\nsilgi 5' },
    { in: { metin: 'x|y|z\np|q', ayrac: 'dikey', sutun: '3' }, out: { 'Eksik sütunlu satır': '1' }, text: 'z\n' },
    { in: { metin: 'ad::yaş\nAli::30', ayrac: 'ozel', ozelAyrac: '::', sutun: '2', cikis: 'sekme' }, text: 'yaş\n30' },
    { in: { metin: 'a,b,c', ayrac: 'virgul', sutun: '3-1', cikis: 'bosluk' }, text: 'c b a' },
    { in: { metin: 'a,b,c', ayrac: 'virgul', sutun: '5' }, error: true },
    { in: { metin: 'a,b,c', ayrac: 'virgul', sutun: 'iki' }, error: true },
    { in: { metin: 'a,b,c', ayrac: 'virgul', sutun: '0' }, error: true },
  ],
  howto: [
    `Sütunlara ayrılmış satırları "Satırlar" kutusuna yapıştırın. Hesap tablosundan kopyalanan hücreler sekmeyle ayrılmış olarak gelir.`,
    `"Sütun ayracı" listesinden satırlardaki sütunları ayıran işareti seçin. Listede yoksa "Özel ayraç" seçip işareti alttaki alana yazın.`,
    `"Alınacak sütunlar" alanına sütun numaralarını yazın: tek sütun için 2, birkaç sütun için 1,3, aralık için 2-4.`,
    `Birden fazla sütun alıyorsanız çıktıda aralarına konacak ayracı seçin ya da "Girdiyle aynı" bırakın.`,
    `"Ayıkla" düğmesine basın. Seçtiğiniz sütunlar alttaki kutuda satır satır listelenir; kopyalayıp istediğiniz yere yapıştırın.`,
  ],
  sections: [
    { h: 'Sütun ayıklama nedir?', p: [
      `Tablo biçimindeki veriler düz metin olarak taşınırken her satır bir kayıt, satırdaki her parça bir sütun olur ve parçalar birbirinden bir ayraçla ayrılır. Virgülle ayrılmış dosyalar (CSV), sekmeyle ayrılmış dışa aktarımlar, sistem kayıtları ve raporlardan kopyalanan tablolar bu yapıdadır. Sütun ayıklama, bu satırların her birinden yalnızca belirli sıradaki parçayı alıp geri kalanını atmak demektir.`,
      `Bir müşteri dökümünden yalnızca telefon numaralarını, bir sipariş listesinden yalnızca ürün kodlarını ya da bir kayıt dosyasından yalnızca tarih sütununu almak istediğinizde hesap tablosu programı açmaya gerek kalmadan işi burada bitirebilirsiniz.`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `Kutuya şu üç satırı yapıştırdığınızı düşünün: <code>Ad;Soyad;Şehir</code>, <code>Ali;Yılmaz;Ankara</code> ve <code>Ayşe;Kaya;İzmir</code>. Ayraç noktalı virgüldür. Her satır bu işaretten bölündüğünde üç parça çıkar: birinci sütun adlar, ikinci sütun soyadlar, üçüncü sütun şehirlerdir.`,
      `"Alınacak sütunlar" alanına 3 yazıp "Ayıkla" düğmesine bastığınızda sonuç alt alta <code>Şehir</code>, <code>Ankara</code>, <code>İzmir</code> olur. İşlenen satır sayısı 3, satırlardaki en fazla sütun sayısı 3, eksik sütunlu satır sayısı 0 görünür. Başlık satırı da veriyle birlikte işlenir; istemiyorsanız sonuçtan ilk satırı silmeniz yeterlidir.`,
    ] },
    { h: 'Sütun seçimini yazma biçimleri', ul: [
      `<strong>Tek sütun:</strong> <code>2</code> yalnızca ikinci sütunu alır.`,
      `<strong>Birden çok sütun:</strong> <code>1,3</code> birinci ve üçüncü sütunu alır. Numaraları boşlukla da ayırabilirsiniz.`,
      `<strong>Aralık:</strong> <code>2-4</code> ikinci, üçüncü ve dördüncü sütunu alır.`,
      `<strong>Sıra değiştirme:</strong> <code>3,1</code> önce üçüncü, sonra birinci sütunu yazar. Böylece "Soyad, Ad" düzenini "Ad, Soyad" yapabilirsiniz.`,
      `<strong>Ters aralık:</strong> <code>3-1</code> sütunları 3, 2, 1 sırasıyla verir.`,
      `<strong>Karışık:</strong> <code>1,4-6</code> gibi tek numara ve aralıkları birlikte kullanabilirsiniz. Aynı sütunu iki kez yazarsanız çıktıda iki kez yer alır.`,
    ] },
    { h: 'Doğru ayracı nasıl anlarım?', p: [
      `Hesap tablosu programlarından kopyalanan hücreler arasında sekme bulunur; ekranda geniş bir boşluk gibi görünse de tek karakterdir. Türkçe bölge ayarlarıyla kaydedilen CSV dosyalarında ayraç çoğunlukla noktalı virgüldür, çünkü virgül ondalık ayracı olarak kullanılır. İngilizce ayarlı sistemlerin ürettiği dosyalarda ise virgül yaygındır.`,
      `Komut satırı çıktıları ve hizalanmış raporlar genellikle değişen sayıda boşlukla ayrılır. "Boşluk" seçeneği art arda gelen boşlukları ve sekmeleri tek ayraç sayar, böylece hizalama için konmuş fazla boşluklar boş sütun üretmez. Emin değilseniz bir ayraç seçip deneyin: "Satırlardaki en fazla sütun" satırı 1 gösteriyorsa ayraç yanlış seçilmiştir ve satırlar hiç bölünmemiştir.`,
    ] },
    { h: 'Eksik sütunlar ve düzensiz satırlar', p: [
      `Gerçek verilerde her satırda aynı sayıda sütun bulunmayabilir. Araç, istenen sütuna sahip olmayan satırlarda o hücreyi boş bırakır ve bu tür satırların sayısını "Eksik sütunlu satır" olarak bildirir. Satır atlanmaz; böylece çıktının satır sayısı girdiyle aynı kalır ve ayıkladığınız sütunu başka bir sütunun yanına yapıştırdığınızda satırlar kaymaz.`,
      `İstediğiniz sütun numarası hiçbir satırda yoksa, örneğin üç sütunlu veride beşinci sütunu isterseniz, araç boş bir liste üretmek yerine sizi uyarır. Bu durum çoğu zaman yanlış ayraç seçildiğini gösterir.`,
    ] },
    { h: 'Gündelik kullanım örnekleri', ul: [
      `Muhasebe programından alınan cari dökümünden yalnızca vergi numarası ya da telefon sütununu çıkarmak.`,
      `E-ticaret panelinden indirilen sipariş listesinden ürün kodu ile adet sütunlarını yan yana almak.`,
      `Öğrenci listesinde "Soyad, Ad" sırasını "Ad, Soyad" olarak yeniden düzenlemek.`,
      `Sunucu kayıt dosyalarında boşlukla ayrılmış satırlardan yalnızca adres ya da durum kodu alanını toplamak.`,
      `Toplu mesaj ya da etiket basımı için bir tablodan tek bir sütunu temiz liste halinde elde etmek.`,
    ] },
    { h: 'Sınırlar: tırnaklı alanlar', p: [
      `Bazı CSV dosyalarında içinde virgül geçen değerler çift tırnak içine alınır: bir adres alanı ya da "Yılmaz, Ahmet" biçiminde yazılmış bir ad gibi. Bu araç satırları yalın biçimde, ayracın geçtiği her yerden böler ve tırnak içini ayrı tutmaz. Böyle bir dosyada sütunlar kayar. Verinizde tırnaklı ve içinde ayraç bulunan alanlar varsa dosyayı bir hesap tablosu programında açıp oradan sekmeyle ayrılmış olarak kopyalamak daha güvenlidir.`,
      `Sabit genişlikli, yani sütunları belirli karakter konumlarına göre hizalanmış ve aralarında ayraç bulunmayan dökümler de bu aracın kapsamı dışındadır. Hücrelerin başındaki ve sonundaki boşluklar temizlenir; hücre içindeki boşluklara dokunulmaz.`,
    ] },
  ],
  faq: [
    [`Sütun numaraları kaçtan başlıyor?`, `Soldan 1 ile başlar. En soldaki sütun 1, onun sağındaki 2 numaradır. Sıfır yazılırsa hata mesajı görürsünüz.`],
    [`Birden fazla sütunu aynı anda alabilir miyim?`, `Evet. Numaraları virgülle ayırarak (1,3) ya da tireyle aralık vererek (2-4) yazın. Sütunlar yazdığınız sırayla çıkar.`],
    [`Hesap tablosundan kopyaladığım veride hangi ayracı seçmeliyim?`, `Sekme seçin. Hücreler panoya sekmeyle ayrılmış olarak kopyalanır; ekranda boşluk gibi görünse de sekme karakteridir.`],
    [`Sütunların sırasını değiştirebilir miyim?`, `Evet. "3,1" yazarsanız önce üçüncü, sonra birinci sütun yazılır. Ters aralık için "3-1" de kullanabilirsiniz.`],
    [`Başlık satırı da sonuca dahil ediliyor mu?`, `Evet, araç başlık ile veri satırını ayırt etmez; ilk satır da diğerleri gibi işlenir. Başlığı istemiyorsanız sonuçtaki ilk satırı silin.`],
    [`Bazı satırlarda sütun eksikse ne olur?`, `O satırda ilgili hücre boş bırakılır, satır atlanmaz. Kaç satırda eksik olduğu sonuç bilgilerinde gösterilir.`],
    [`Tırnak içinde virgül bulunan CSV dosyaları doğru ayrılır mı?`, `Hayır. Araç tırnakları tanımaz ve her virgülden böler. Bu tür dosyaları bir hesap tablosu programında açıp sekmeyle ayrılmış olarak kopyalamanız önerilir.`],
    [`Yapıştırdığım veriler bir yere yükleniyor mu?`, `Hayır. Ayıklama işlemi tarayıcınızda yapılır; müşteri listesi gibi veriler cihazınızdan çıkmaz ve saklanmaz.`],
  ],
  related: ['liste-virgul-donustur', 'satirlari-birlestir', 'sekme-bosluk-donustur', 'metin-bol', 'tekrar-eden-satirlari-sil', 'e-posta-ayikla'],
};
