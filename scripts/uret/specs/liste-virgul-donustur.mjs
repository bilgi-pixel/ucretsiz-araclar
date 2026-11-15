export default {
  slug: 'liste-virgul-donustur',
  title: 'Listeyi Virgüllü Metne Çevirme',
  h1Tail: 'alt alta liste ↔ virgülle ayrılmış metin',
  pageTitle: 'Listeyi Virgüllü Metne Çevirme – Alt Alta Satırları Virgülle Ayır',
  description: 'Alt alta yazılmış listeyi virgülle ayrılmış tek satıra çevirin ya da tersini yapın. Tırnak ekleyin, parantezle sarın, tekrar eden öğeleri silin.',
  card: 'Alt alta listeyi virgülle ayrılmış metne ya da tersine çevirin; tırnak, parantez ve tekrar silme seçenekleriyle.',
  category: 'metin',
  keywords: ['listeyi virgülle ayırma', 'virgüllü metne çevirme', 'satırları virgülle birleştir', 'virgülle ayrılmış liste', 'sütunu virgüllü yapma', 'sql in listesi oluşturma', 'excel sütunu virgülle ayırma', 'tırnaklı liste'],
  lead: `Alt alta yazılmış bir listeyi <strong>virgülle ayrılmış tek satıra</strong> dönüştürün ya da virgüllü bir metni yeniden alt alta listeye açın. Her öğeyi tek ya da çift tırnak içine alabilir, sonucu parantezle sarabilir ve tekrar eden öğeleri ayıklayabilirsiniz.`,
  button: 'Çevir',
  inputs: [
    { id: 'metin', label: 'Liste ya da virgüllü metin', type: 'textarea', placeholder: 'Her satıra bir öğe yazın ya da virgüllü metni yapıştırın' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['birlestir', 'Alt alta liste → Virgüllü metin'], ['ayir', 'Virgüllü metin → Alt alta liste']] },
    { id: 'ayrac', label: 'Ayraç', type: 'select', options: [['virgulbosluk', 'Virgül ve boşluk (a, b, c)'], ['virgul', 'Yalnızca virgül (a,b,c)'], ['noktalivirgul', 'Noktalı virgül (a; b; c)'], ['dikey', 'Dikey çizgi (a|b|c)']] },
    { id: 'tirnak', label: 'Öğeleri tırnak içine al', type: 'select', options: [['yok', 'Tırnak yok'], ['tek', 'Tek tırnak (\'a\')'], ['cift', 'Çift tırnak ("a")']] },
    { id: 'sarmal', label: 'Sonucu sar', type: 'select', options: [['yok', 'Sarma'], ['parantez', 'Parantez ( )'], ['koseli', 'Köşeli parantez [ ]']] },
    { id: 'tekrar', label: 'Tekrar eden öğeler', type: 'select', options: [['koru', 'Koru'], ['sil', 'Sil (ilk geçen kalsın)']] },
  ],
  compute(v, h) {
    const ham = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (ham.trim() === '') h.err('"Liste ya da virgüllü metin" alanını doldurun.');
    const ayraclar = { virgulbosluk: [', ', ','], virgul: [',', ','], noktalivirgul: ['; ', ';'], dikey: ['|', '|'] };
    const [yaz, bol] = ayraclar[v.ayrac] || ayraclar.virgulbosluk;
    let ogeler;
    if (v.yon === 'ayir') {
      let t = ham.trim();
      if ((t.startsWith('(') && t.endsWith(')')) || (t.startsWith('[') && t.endsWith(']'))) t = t.slice(1, -1);
      ogeler = t.split('\n').flatMap((s) => s.split(bol)).map((s) => {
        let o = s.trim();
        if (o.length >= 2 && ((o[0] === "'" && o.at(-1) === "'") || (o[0] === '"' && o.at(-1) === '"'))) o = o.slice(1, -1).trim();
        return o;
      });
    } else {
      ogeler = ham.split('\n').map((s) => s.trim());
    }
    const hepsi = ogeler.length;
    ogeler = ogeler.filter((o) => o !== '');
    const bos = hepsi - ogeler.length;
    if (!ogeler.length) h.err('Metinde öğe bulunamadı. Her satıra bir öğe yazın ya da ayracı kontrol edin.');
    let tekrarSayisi = 0;
    if (v.tekrar === 'sil') {
      const gor = new Set(), yeni = [];
      for (const o of ogeler) { if (gor.has(o)) tekrarSayisi++; else { gor.add(o); yeni.push(o); } }
      ogeler = yeni;
    }
    let sonuc;
    if (v.yon === 'ayir') sonuc = ogeler.join('\n');
    else {
      const sar = (o) => v.tirnak === 'tek' ? `'${o.replace(/'/g, "''")}'` : v.tirnak === 'cift' ? `"${o.replace(/"/g, '\\"')}"` : o;
      sonuc = ogeler.map(sar).join(yaz);
      if (v.sarmal === 'parantez') sonuc = `(${sonuc})`;
      else if (v.sarmal === 'koseli') sonuc = `[${sonuc}]`;
    }
    return {
      rows: [
        ['Öğe sayısı', String(ogeler.length)],
        ['Çıkarılan tekrar', String(tekrarSayisi)],
        ['Atlanan boş öğe', String(bos)],
        ['Sonuç uzunluğu', `${Array.from(sonuc).length} karakter`],
      ],
      text: sonuc,
      note: v.yon === 'ayir' ? 'Öğelerin çevresindeki boşluklar, tırnaklar ve metni saran parantez temizlendi. Tırnak içindeki ayraçlar da bölme noktası sayılır.'
        : 'Her satır bir öğe sayılır; satır başı ve sonundaki boşluklar ile boş satırlar atılır.',
    };
  },
  cases: [
    { in: { metin: 'elma\narmut\nkiraz' }, out: { 'Öğe sayısı': '3', 'Çıkarılan tekrar': '0', 'Sonuç uzunluğu': '18 karakter' }, text: 'elma, armut, kiraz' },
    { in: { metin: 'Ankara\nİzmir\n\nAnkara\n Bursa ', tirnak: 'tek', sarmal: 'parantez', tekrar: 'sil' }, out: { 'Öğe sayısı': '3', 'Çıkarılan tekrar': '1', 'Atlanan boş öğe': '1' }, text: "('Ankara', 'İzmir', 'Bursa')" },
    { in: { metin: 'elma, armut,kiraz', yon: 'ayir' }, out: { 'Öğe sayısı': '3' }, text: 'elma\narmut\nkiraz' },
    { in: { metin: '101\n102\n103', ayrac: 'virgul' }, text: '101,102,103' },
    { in: { metin: 'a\nb', ayrac: 'noktalivirgul', tirnak: 'cift', sarmal: 'koseli' }, text: '["a"; "b"]' },
    { in: { metin: "('Ali', 'Veli', 'Ali')", yon: 'ayir', tekrar: 'sil' }, out: { 'Öğe sayısı': '2', 'Çıkarılan tekrar': '1' }, text: 'Ali\nVeli' },
    { in: { metin: "D'Artagnan\nPorthos", tirnak: 'tek' }, text: "'D''Artagnan', 'Porthos'" },
    { in: { metin: 'x|y||z', yon: 'ayir', ayrac: 'dikey' }, out: { 'Öğe sayısı': '3', 'Atlanan boş öğe': '1' }, text: 'x\ny\nz' },
    { in: { metin: '' }, error: true },
    { in: { metin: ' , , ', yon: 'ayir' }, error: true },
  ],
  howto: [
    `Listenizi her satıra bir öğe gelecek biçimde "Liste ya da virgüllü metin" kutusuna yapıştırın. Bir hesap tablosu sütununu kopyalayıp doğrudan yapıştırabilirsiniz.`,
    `Çeviri yönünü seçin: listeyi tek satıra indirmek için ilk seçenek, virgüllü metni alt alta açmak için ikinci seçenek.`,
    `Öğelerin arasına konacak ayracı belirleyin. Ters yönde bu ayraç, metnin hangi işaretten bölüneceğini gösterir.`,
    `Gerekirse öğeleri tırnak içine alın, sonucu parantezle sarın ve tekrar eden öğelerin silinmesini isteyin.`,
    `"Çevir" düğmesine basın; sonuç alttaki kutuda görünür, üstte öğe sayısı ile çıkarılan tekrar sayısı yazar.`,
  ],
  sections: [
    { h: 'Bu araç hangi sorunu çözer?', p: [
      `Veriler çoğu zaman alt alta gelir: bir hesap tablosu sütunu, bir rapordan kopyalanan müşteri numaraları, bir toplantının katılımcı listesi. Kullanılacağı yer ise çoğu zaman tek satır ister: bir veritabanı sorgusu, bir e-postanın alıcı alanı, bir program içindeki dizi, bir form alanı ya da bir cümlenin içi. Aradaki dönüşümü elle yapmak, özellikle yüzlerce satırda, hem sıkıcıdır hem de bir virgülü unutmak kadar küçük bir hatayla bütün işi bozabilir.`,
      `Düz satır birleştirmeden farkı, listeye özgü işlemleri de birlikte yapmasıdır: her öğeyi tırnaklar, bütün listeyi parantez içine alır, yinelenen değerleri ayıklar ve gerektiğinde işlemi tersine çevirir.`,
    ] },
    { h: 'Çözümlü örnek: sorgu için değer listesi', p: [
      `Elinizde beş satırlık bir şehir listesi olsun: Ankara, İzmir, boş bir satır, yeniden Ankara ve başında sonunda boşluk bulunan Bursa. Tırnak olarak "Tek tırnak", sarma olarak "Parantez", tekrarlar için "Sil" seçin.`,
      `Araç önce her satırın çevresindeki boşlukları temizler ve boş satırı atar; geriye dört öğe kalır. İkinci Ankara tekrar olduğu için çıkarılır ve üç öğe kalır. Her biri tek tırnak içine alınır, aralarına virgül ve boşluk konur, tamamı parantezle sarılır. Sonuç <code>('Ankara', 'İzmir', 'Bursa')</code> olur. Öğe sayısı 3, çıkarılan tekrar 1, atlanan boş öğe 1 görünür. Bu çıktı bir sorgunun değer listesi bölümüne doğrudan yapıştırılabilir.`,
    ] },
    { h: 'Tırnak işaretleri ve kaçış kuralları', p: [
      `Metin değerleri birçok ortamda tırnak içinde yazılmak zorundadır. Veritabanı sorgularında genellikle tek tırnak, programlama dillerindeki dizilerde ve veri alışverişi biçimlerinde çoğunlukla çift tırnak kullanılır. Sayısal değerlerde ise tırnak gerekmez; kimlik numaraları gibi sayı listelerinde "Tırnak yok" seçeneğini bırakın.`,
      `Öğenin içinde tırnak işareti varsa çıktı bozulmasın diye araç onu kaçırır. Tek tırnak modunda öğedeki tek tırnak çiftlenir: <code>D'Artagnan</code> değeri <code>'D''Artagnan'</code> olarak yazılır; bu, sorgu dillerinde yaygın kuraldır. Çift tırnak modunda öğedeki çift tırnağın önüne ters eğik çizgi konur. Kullandığınız sistemin kaçış kuralı farklıysa sonucu yapıştırmadan önce gözden geçirin.`,
    ] },
    { h: 'Ters yön: virgüllü metni listeye açmak', p: [
      `"Virgüllü metin → Alt alta liste" yönünde araç metni seçtiğiniz ayraçtan böler ve her parçayı ayrı satıra yazar. Parçaların çevresindeki boşluklar, öğeleri saran tek ya da çift tırnaklar ve metnin tamamını saran parantez ya da köşeli parantez temizlenir. Örneğin <code>elma, armut,kiraz</code> girdisi alt alta üç satıra dönüşür; virgülden sonra boşluk olup olmaması sonucu değiştirmez.`,
      `Bu yön, tek satırda gelen etiket listelerini, anahtar kelimeleri ya da e-posta alıcılarını hesap tablosuna sütun olarak yapıştırmadan önce kullanışlıdır. Bölme işlemi yalın bir kurala dayanır: ayraç nerede geçiyorsa orada bölünür. Tırnak içinde virgül barındıran değerler, örneğin "Yılmaz, Ahmet" biçimindeki adlar, iki ayrı öğeye ayrılır. Böyle verilerde ayraç olarak noktalı virgül ya da dikey çizgi kullanılan bir kaynakla çalışmak daha sağlıklıdır.`,
    ] },
    { h: 'Hangi ayraç nerede kullanılır?', ul: [
      `<strong>Virgül ve boşluk:</strong> okunaklı çıktı; cümle içi listeler, sorgular, program dizileri.`,
      `<strong>Yalnızca virgül:</strong> boşluğun istenmediği alanlar; etiket kutuları, adres çubuğu parametreleri, sıkışık veri dosyaları.`,
      `<strong>Noktalı virgül:</strong> ondalık ayracı virgül olan sayılar ve bazı e-posta programlarının alıcı alanları. Türkçe bölge ayarlı hesap tablolarında formül ayracı da çoğunlukla noktalı virgüldür.`,
      `<strong>Dikey çizgi:</strong> değerlerin içinde virgül geçebildiği durumlar ve düzenli ifadelerde "ya da" anlamı taşıyan seçenek listeleri.`,
    ] },
    { h: 'Tekrar silme nasıl çalışır?', p: [
      `"Sil" seçildiğinde her öğenin yalnızca ilk geçtiği yer korunur, sonraki kopyalar atılır; listenin sırası değişmez. Karşılaştırma birebir yapılır: "Ankara" ile "ankara" ya da "Ankara" ile sonunda nokta bulunan "Ankara." farklı öğeler sayılır. Büyük-küçük harf farkını önemsemeden temizlemek istiyorsanız listeyi önce tek tip harfe çevirin. Çıkarılan öğe sayısı sonuç satırlarında gösterilir; böylece listenizde kaç yineleme olduğunu da öğrenmiş olursunuz.`,
    ] },
    { h: 'Sınırlar ve ipuçları', p: [
      `Her satır tek öğe kabul edilir; öğenin içindeki virgüller olduğu gibi kalır ve çıktıda fazladan ayraç gibi görünebilir. Değerlerinizde virgül varsa tırnak seçeneklerinden birini açın ya da başka bir ayraç seçin. Araç değerlerin türünü denetlemez, sayı ile metni ayırt etmez ve sıralama yapmaz. Çok uzun listeleri bir sorguda kullanırken veritabanınızın tek seferde kabul ettiği öğe sayısını ayrıca kontrol edin.`,
    ] },
  ],
  faq: [
    [`Hesap tablosundaki bir sütunu virgülle ayrılmış hale nasıl getiririm?`, `Sütundaki hücreleri seçip kopyalayın ve kutuya yapıştırın; her hücre bir satır olarak gelir. Yönü "Alt alta liste → Virgüllü metin" bırakıp "Çevir" düğmesine basın.`],
    [`Her öğeyi tırnak içine alabilir miyim?`, `Evet. "Öğeleri tırnak içine al" listesinden tek ya da çift tırnağı seçin. Öğenin içinde aynı tırnak işareti geçiyorsa araç onu kaçış kuralına göre düzenler.`],
    [`Virgülden sonra boşluk olmasın istiyorum, nasıl yaparım?`, `Ayraç listesinden "Yalnızca virgül" seçeneğini seçin. Öğeler aralarında boşluk olmadan, a,b,c biçiminde yazılır.`],
    [`Boş satırlar sonucu bozar mı?`, `Hayır. Boş satırlar ve yalnızca boşluktan oluşan satırlar atlanır; art arda iki virgül oluşmaz. Kaç boş öğenin atlandığı sonuç satırlarında gösterilir.`],
    [`Virgüllü metni yeniden alt alta listeye çevirebilir miyim?`, `Evet. Çeviri yönünü "Virgüllü metin → Alt alta liste" yapın ve metindeki ayraçla aynı ayracı seçin. Tırnaklar ve dıştaki parantez kendiliğinden temizlenir.`],
    [`Tekrar silme büyük-küçük harfe duyarlı mı?`, `Evet. Yalnızca birebir aynı olan öğeler tekrar sayılır. "Elma" ile "elma" iki ayrı öğe olarak kalır.`],
    [`Liste sıralanıyor mu?`, `Hayır. Öğeler yazdığınız sırayla çıkar. Alfabetik sıra istiyorsanız listeyi önce bir sıralama aracından geçirin, sonra buraya yapıştırın.`],
    [`Listemdeki veriler bir sunucuya gidiyor mu?`, `Hayır. Dönüştürme tarayıcınızın içinde yapılır. Müşteri numaraları ya da adresler gibi bilgiler cihazınızdan çıkmaz ve kaydedilmez.`],
  ],
  related: ['satirlari-birlestir', 'tekrar-eden-satirlari-sil', 'onek-sonek-ekle', 'sutun-ayikla', 'bos-satirlari-sil', 'metin-bol'],
};
