export default {
  slug: 'satirlari-birlestir',
  title: 'Satırları Birleştirme',
  h1Tail: 'çok satırlı metni tek satır yap',
  pageTitle: 'Satırları Birleştirme – Çok Satırlı Metni Tek Satıra Çevirme',
  description: 'Alt alta yazılmış satırları tek satırda birleştirin. Araya boşluk, virgül ya da kendi ayracınızı koyun; satır sonlarını ve boş satırları temizleyin.',
  card: 'Alt alta satırları tek satırda birleştirin; araya boşluk, virgül ya da istediğiniz ayracı koyun.',
  category: 'metin',
  keywords: ['satırları birleştirme', 'satır sonu silme', 'tek satır yapma', 'enter silme', 'satır atlama kaldırma', 'metni tek satıra çevirme', 'alt alta yazıyı birleştirme', 'pdf metni düzeltme'],
  lead: `Alt alta duran satırları <strong>tek bir satırda</strong> birleştirin. Satırların arasına boşluk, virgül, noktalı virgül ya da kendi yazdığınız bir ayraç koyabilir; boş satırları atabilir ve her satırın başındaki sonundaki boşlukları temizleyebilirsiniz.`,
  button: 'Birleştir',
  inputs: [
    { id: 'metin', label: 'Satırlar', type: 'textarea', placeholder: 'Birleştirilecek satırları buraya yapıştırın' },
    { id: 'ayrac', label: 'Satırların arasına konacak ayraç', type: 'select', options: [['bosluk', 'Boşluk'], ['yok', 'Hiçbir şey (bitişik)'], ['virgul', 'Virgül ve boşluk (, )'], ['noktalivirgul', 'Noktalı virgül ve boşluk (; )'], ['dikey', 'Dikey çizgi ( | )'], ['sekme', 'Sekme'], ['ozel', 'Özel ayraç (aşağıya yazın)']] },
    { id: 'ozelAyrac', label: 'Özel ayraç', type: 'text', placeholder: 'Örn.  -  ', hint: 'Yalnızca "Özel ayraç" seçiliyken kullanılır; boşluklar korunur.' },
    { id: 'bosSatir', label: 'Boş satırlar', type: 'select', options: [['atla', 'Atla'], ['paragraf', 'Paragraf sınırı say (her paragraf ayrı satır)'], ['koru', 'Boş öğe olarak birleştir']] },
    { id: 'kirp', label: 'Satır başı ve sonu boşlukları', type: 'select', options: [['evet', 'Temizle'], ['hayir', 'Olduğu gibi bırak']] },
  ],
  compute(v, h) {
    const ham = String(v.metin ?? '');
    if (ham.trim() === '') h.err('"Satırlar" alanına birleştirilecek metni yazın.');
    const ayraclar = { bosluk: ' ', yok: '', virgul: ', ', noktalivirgul: '; ', dikey: ' | ', sekme: '\t' };
    let ayr;
    if (v.ayrac === 'ozel') {
      ayr = String(v.ozelAyrac ?? '');
      if (ayr === '') h.err('"Özel ayraç" alanına satırların arasına konacak ifadeyi yazın ya da listeden hazır bir ayraç seçin.');
    } else ayr = ayraclar[v.ayrac] ?? ' ';
    let satirlar = ham.replace(/\r\n?/g, '\n').split('\n');
    while (satirlar.length && satirlar[satirlar.length - 1].trim() === '') satirlar.pop();
    while (satirlar.length && satirlar[0].trim() === '') satirlar.shift();
    const toplam = satirlar.length;
    if (v.kirp !== 'hayir') satirlar = satirlar.map((s) => s.trim());
    const bos = satirlar.filter((s) => s.trim() === '').length;
    let sonuc, cikisSatir = 1;
    if (v.bosSatir === 'paragraf') {
      const paragraflar = [];
      let grup = [];
      for (const s of satirlar) {
        if (s.trim() === '') { if (grup.length) { paragraflar.push(grup.join(ayr)); grup = []; } }
        else grup.push(s);
      }
      if (grup.length) paragraflar.push(grup.join(ayr));
      sonuc = paragraflar.join('\n');
      cikisSatir = paragraflar.length;
    } else if (v.bosSatir === 'koru') {
      sonuc = satirlar.map((s) => (s.trim() === '' ? '' : s)).join(ayr);
    } else {
      sonuc = satirlar.filter((s) => s.trim() !== '').join(ayr);
    }
    return {
      rows: [
        ['Birleştirilen satır', String(toplam - bos)],
        ['Boş satır', String(bos)],
        ['Sonuçtaki satır sayısı', String(cikisSatir)],
        ['Sonuç uzunluğu', `${Array.from(sonuc).length} karakter`],
      ],
      text: sonuc,
      note: v.bosSatir === 'paragraf' ? 'Boş satırla ayrılmış her paragraf kendi içinde birleştirildi; paragraflar ayrı satırlarda kaldı.'
        : 'Baştaki ve sondaki boş satırlar her durumda atılır.',
    };
  },
  cases: [
    { in: { metin: 'elma\narmut\nkiraz' }, out: { 'Birleştirilen satır': '3', 'Boş satır': '0', 'Sonuç uzunluğu': '16 karakter' }, text: 'elma armut kiraz' },
    { in: { metin: 'Ankara\n  İzmir  \n\nBursa\n', ayrac: 'virgul' }, out: { 'Birleştirilen satır': '3', 'Boş satır': '1' }, text: 'Ankara, İzmir, Bursa' },
    { in: { metin: 'Bu bir\nparagraftır.\n\nBu da\nikinci\nparagraf.', bosSatir: 'paragraf' }, out: { 'Sonuçtaki satır sayısı': '2', 'Birleştirilen satır': '5' }, text: 'Bu bir paragraftır.\nBu da ikinci paragraf.' },
    { in: { metin: 'a\nb\nc', ayrac: 'yok' }, out: { 'Sonuç uzunluğu': '3 karakter' }, text: 'abc' },
    { in: { metin: 'bir\r\niki\r\nüç', ayrac: 'ozel', ozelAyrac: ' + ' }, text: 'bir + iki + üç' },
    { in: { metin: 'a\n\nb', ayrac: 'noktalivirgul', bosSatir: 'koru' }, out: { 'Boş satır': '1' }, text: 'a; ; b' },
    { in: { metin: ' x \ny', ayrac: 'dikey', kirp: 'hayir' }, text: ' x  | y' },
    { in: { metin: '   \n  ' }, error: true },
    { in: { metin: 'a\nb', ayrac: 'ozel', ozelAyrac: '' }, error: true },
  ],
  howto: [
    `Birleştirmek istediğiniz satırları "Satırlar" kutusuna yapıştırın.`,
    `Satırların arasına ne konacağını seçin: düz yazı için boşluk, liste için virgül, kendi işaretiniz için "Özel ayraç".`,
    `Boş satırlara ne olacağını belirleyin. Birkaç paragraflık bir metinde paragrafları korumak için "Paragraf sınırı say" seçeneğini kullanın.`,
    `Satır başı ve sonundaki boşlukların temizlenmesini istemiyorsanız ilgili seçeneği "Olduğu gibi bırak" yapın.`,
    `"Birleştir" düğmesine basın ve alttaki kutuda oluşan tek satırlık metni kopyalayın.`,
  ],
  sections: [
    { h: 'Satır birleştirme ne işe yarar?', p: [
      `Bir metni PDF dosyasından, e-postadan ya da taranmış bir belgeden kopyaladığınızda her satırın sonunda görünmeyen bir satır sonu karakteri gelir. Metni başka bir yere yapıştırdığınızda cümleler satır ortasında kırılır, paragraf dağınık görünür ve hizalama bozulur. Satırları birleştirmek bu görünmeyen karakterleri kaldırıp yerlerine boşluk koymak demektir; böylece metin yeniden akıcı bir paragrafa dönüşür.`,
      `İkinci yaygın kullanım listelerdir. Bir tablodan kopyalanan sütun, alt alta yazılmış isimler ya da ürün kodları çoğu zaman tek satırda, aralarında virgülle istenir. Elle tek tek silip virgül koymak yerine ayracı seçip bir tıkla birleştirebilirsiniz.`,
    ] },
    { h: 'Araç adım adım ne yapar?', ol: [
      `Metindeki farklı satır sonu biçimlerini (Windows, macOS ve Linux sistemlerinin kullandığı türleri) tek tipe indirir.`,
      `En baştaki ve en sondaki boş satırları atar.`,
      `"Temizle" seçiliyse her satırın başındaki ve sonundaki boşlukları, sekmeleri siler.`,
      `Boş satırları seçtiğiniz kurala göre atlar, paragraf sınırı sayar ya da boş öğe olarak tutar.`,
      `Kalan satırları, aralarına seçtiğiniz ayracı koyarak art arda ekler.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Liste birleştirme:</strong> Kutuya alt alta "Ankara", "  İzmir  ", boş bir satır ve "Bursa" yazdığınızı düşünün. Ayraç olarak "Virgül ve boşluk", boş satırlar için "Atla" seçildiğinde sonuç <code>Ankara, İzmir, Bursa</code> olur. İzmir satırının iki yanındaki boşluklar temizlenir, boş satır yok sayılır; birleştirilen satır sayısı 3, boş satır sayısı 1 görünür.`,
      `<strong>Paragraf koruma:</strong> İlk paragrafı iki, ikinci paragrafı üç satıra bölünmüş ve aralarında bir boş satır bulunan bir metinde "Paragraf sınırı say" seçerseniz her paragraf kendi içinde boşlukla birleştirilir ve sonuç iki satır olur. Böylece PDF dosyasından alınmış çok paragraflı bir metni, paragraf yapısını bozmadan düzeltebilirsiniz.`,
      `<strong>Bitişik birleştirme:</strong> "a", "b", "c" satırları "Hiçbir şey" ayracıyla <code>abc</code> olur. Satırlara bölünmüş uzun bir kodu, seri numarasını ya da tek parça olması gereken bir diziyi yeniden bir araya getirirken bu seçenek kullanılır.`,
    ] },
    { h: 'Hangi ayracı ne zaman seçmeli?', ul: [
      `<strong>Boşluk:</strong> satır ortasında kırılmış cümleleri yeniden paragraf yapmak için.`,
      `<strong>Hiçbir şey:</strong> bölünmüş kodları, uzun sayıları, parçalanmış dizgileri bitiştirmek için.`,
      `<strong>Virgül ve boşluk:</strong> isim, şehir, etiket gibi listeleri cümle içinde kullanmak için.`,
      `<strong>Noktalı virgül:</strong> e-posta alıcı listeleri ve ondalık ayracı virgül olan sayı listeleri için.`,
      `<strong>Dikey çizgi:</strong> menü öğeleri, başlık parçaları ya da tablo benzeri düz metinler için.`,
      `<strong>Sekme:</strong> sonucu bir hesap tablosuna yapıştırıp her satırı ayrı hücreye, yan yana dağıtmak için.`,
      `<strong>Özel ayraç:</strong> " ve ", " - ", " / " gibi kendi belirlediğiniz her türlü ifade için.`,
    ] },
    { h: 'PDF metinlerinde tire ile bölünmüş kelimeler', p: [
      `Kitap ve dergi dizgisinde satır sonuna sığmayan kelimeler tire ile bölünür: "bilgi-" bir satırda, "sayar" sonraki satırda kalır. Bu tür bir metni boşlukla birleştirdiğinizde "bilgi- sayar" gibi bir sonuç çıkar. Araç tireli bölünmeleri kendiliğinden onarmaz, çünkü satır sonundaki her tire bir bölünme değildir; bazıları gerçekten metne ait tiredir. Birleştirdikten sonra "- " ifadesini bul ve değiştir yöntemiyle temizlemek en güvenli yoldur.`,
    ] },
    { h: 'Dikkat edilecek noktalar', p: [
      `Boşlukla birleştirirken "Temizle" seçeneği açık kalsın; aksi halde satır sonlarında kalan boşluklar yüzünden kelimeler arasında çift boşluk oluşur. Girintinin anlamlı olduğu metinlerde, örneğin program kodunda, satırları birleştirmek çoğu zaman kodu bozar; bu araç düz yazı ve listeler için tasarlanmıştır.`,
      `Sonuçtaki satır sayısı, paragraf seçeneği dışında her zaman 1 olur. Sekme ayracı ekranda geniş bir boşluk gibi görünür; hesap tablosuna yapıştırdığınızda öğeler ayrı sütunlara yerleşir. Çok uzun metinlerde işlem yine anında tamamlanır, çünkü her şey cihazınızın belleğinde yapılır.`,
    ] },
  ],
  faq: [
    [`Satır sonu karakteri nedir?`, `Klavyede Enter tuşuna bastığınızda metne eklenen görünmez karakterdir. Metnin alt satıra geçmesini sağlar. Araç bu karakterleri kaldırıp yerlerine seçtiğiniz ayracı koyar.`],
    [`PDF dosyasından kopyaladığım metin neden satır satır geliyor?`, `PDF biçimi metni paragraf olarak değil, sayfadaki konumlarıyla satır satır saklar. Kopyalarken her görsel satırın sonuna satır sonu eklenir. Satırları boşlukla birleştirmek metni yeniden paragrafa çevirir.`],
    [`Paragrafları koruyarak birleştirebilir miyim?`, `Evet. "Boş satırlar" seçeneğini "Paragraf sınırı say" yapın. Aralarında boş satır bulunan paragraflar ayrı satırlarda kalır, her paragrafın kendi satırları birleştirilir.`],
    [`Araya hem virgül hem tırnak koymak istiyorum, mümkün mü?`, `Bu araç yalnızca araya ayraç koyar. Her öğeyi tırnak içine almak, tekrarları silmek ya da parantezle sarmak için listeyi virgüllü metne çevirme aracını kullanın.`],
    [`Windows ve Mac satır sonları sorun çıkarır mı?`, `Hayır. Farklı işletim sistemlerinin kullandığı satır sonu türlerinin hepsi tanınır ve aynı biçimde işlenir.`],
    [`Birleştirdiğim metni yeniden satırlara bölebilir miyim?`, `Bu araç tek yönlüdür. Ayraçla ayrılmış bir metni yeniden alt alta satırlara çevirmek için bul ve değiştir ya da metni parçalara bölme araçlarından yararlanabilirsiniz.`],
    [`Kaç satıra kadar birleştirebilirim?`, `Belirlenmiş bir üst sınır yoktur. On binlerce satırlık listeler de saniyeden kısa sürede birleştirilir; sınırı cihazınızın belleği belirler.`],
    [`Yapıştırdığım metin kaydediliyor mu?`, `Hayır. İşlem tamamen tarayıcınızda gerçekleşir; metin sunucuya gönderilmez ve hiçbir yerde saklanmaz.`],
  ],
  related: ['liste-virgul-donustur', 'bos-satirlari-sil', 'bosluk-temizle', 'bul-ve-degistir', 'metin-bol', 'satir-sayaci'],
};
