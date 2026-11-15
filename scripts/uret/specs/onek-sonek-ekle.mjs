export default {
  slug: 'onek-sonek-ekle',
  title: 'Satırlara Ön Ek ve Son Ek Ekleme',
  h1Tail: 'her satırın başına ve sonuna metin',
  pageTitle: 'Satırlara Ön Ek ve Son Ek Ekleme – Satır Başına ve Sonuna Metin',
  description: 'Listenizdeki her satırın başına ve sonuna aynı metni topluca ekleyin. Tırnak, virgül, madde işareti, HTML etiketi ya da SQL değeri hazırlamak için pratik araç.',
  card: 'Her satırın başına ve sonuna aynı metni topluca ekleyin: tırnak, virgül, madde işareti, etiket ya da uzantı.',
  category: 'metin',
  keywords: ['satır başına ekleme', 'satır sonuna ekleme', 'ön ek son ek ekleme', 'her satıra metin ekle', 'satırlara tırnak ekleme', 'satır sonuna virgül ekleme', 'toplu metin ekleme'],
  lead: 'Alt alta yazılmış satırların her birinin <strong>başına (ön ek)</strong> ve <strong>sonuna (son ek)</strong> aynı metni tek seferde ekleyin. Yüzlerce satırı tırnak içine almak, sonlarına virgül koymak ya da başlarına madde işareti eklemek birkaç saniye sürer.',
  button: 'Ekle',
  inputs: [
    { id: 'metin', label: 'Satırlar', type: 'textarea', placeholder: 'elma\narmut\nkiraz', rows: 8 },
    { id: 'onek', label: 'Ön ek (satır başına)', type: 'text', placeholder: 'Örn. - ', hint: 'Boşluklar korunur; sekme için \\t yazın' },
    { id: 'sonek', label: 'Son ek (satır sonuna)', type: 'text', placeholder: 'Örn. ,', hint: 'Yalnızca birini doldurmanız yeterli' },
    { id: 'bos', label: 'Boş satırlar', type: 'select', options: [['atla', 'Ek koyma, yerinde bırak'], ['uygula', 'Ek koy'], ['sil', 'Sil']] },
    { id: 'kirp', label: 'Satır başı ve sonu boşlukları', type: 'select', options: [['hayir', 'Dokunma'], ['evet', 'Eklemeden önce kırp']] },
    { id: 'son', label: 'Son satırın son eki', type: 'select', options: [['ekle', 'Ekle'], ['ekleme', 'Ekleme (listenin sonunda virgül kalmasın)']] },
  ],
  compute(v, h) {
    const ham = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (ham.trim() === '') h.err('Ek koyulacak satırları yazın.');
    const coz = (s) => String(s ?? '').replace(/\\t/g, '\t');
    const onek = coz(v.onek), sonek = coz(v.sonek);
    if (onek === '' && sonek === '') h.err('"Ön ek" ya da "Son ek" alanlarından en az birini doldurun.');
    let satirlar = ham.split('\n');
    while (satirlar.length && satirlar[satirlar.length - 1].trim() === '') satirlar.pop();
    if (v.bos === 'sil') satirlar = satirlar.filter((s) => s.trim() !== '');
    if (satirlar.length > 200000) h.err('En fazla 200.000 satır işlenebilir.');
    const ekAlir = (s) => v.bos === 'uygula' || s.trim() !== '';
    let sonSira = -1;
    for (let i = satirlar.length - 1; i >= 0; i--) if (ekAlir(satirlar[i])) { sonSira = i; break; }
    let adet = 0;
    const cikti = satirlar.map((s, i) => {
      if (!ekAlir(s)) return s;
      adet++;
      const govde = v.kirp === 'evet' ? s.trim() : s;
      const ek = v.son === 'ekleme' && i === sonSira ? '' : sonek;
      return onek + govde + ek;
    });
    const sonuc = cikti.join('\n');
    return {
      rows: [
        ['Ek koyulan satır', h.fmt(adet, 0)],
        ['Toplam satır', h.fmt(satirlar.length, 0)],
        ['Sonuç uzunluğu', h.fmt(sonuc.length, 0) + ' karakter'],
      ],
      text: sonuc,
    };
  },
  cases: [
    { in: { metin: 'elma\narmut\nkiraz', onek: '- ', sonek: '' }, text: '- elma\n- armut\n- kiraz', out: { 'Ek koyulan satır': '3', 'Sonuç uzunluğu': '22 karakter' } },
    { in: { metin: 'Ankara\nİzmir\nBursa', onek: '"', sonek: '",' }, text: '"Ankara",\n"İzmir",\n"Bursa",', out: { 'Ek koyulan satır': '3' } },
    { in: { metin: 'Ankara\nİzmir\nBursa', onek: '\'', sonek: '\',', son: 'ekleme' }, text: '\'Ankara\',\n\'İzmir\',\n\'Bursa' },
    { in: { metin: 'a\n\nb', onek: '<li>', sonek: '</li>', bos: 'atla' }, text: '<li>a</li>\n\n<li>b</li>', out: { 'Ek koyulan satır': '2', 'Toplam satır': '3' } },
    { in: { metin: 'a\n\nb', onek: '> ', bos: 'uygula' }, text: '> a\n> \n> b', out: { 'Ek koyulan satır': '3' } },
    { in: { metin: 'a\n\nb\n', sonek: ';', bos: 'sil' }, text: 'a;\nb;', out: { 'Toplam satır': '2' } },
    { in: { metin: '  rapor  \n ozet', sonek: '.pdf', kirp: 'evet' }, text: 'rapor.pdf\nozet.pdf' },
    { in: { metin: 'ad\nsoyad', onek: '\\t' }, text: '\tad\n\tsoyad' },
    { in: { metin: 'a\nb', onek: '', sonek: '' }, error: true },
    { in: { metin: '', onek: 'x' }, error: true },
  ],
  howto: [
    'İşlem yapılacak satırları kutuya yazın ya da bir tablodan, belgeden kopyalayıp yapıştırın.',
    '"Ön ek" alanına her satırın başına gelecek metni, "Son ek" alanına her satırın sonuna gelecek metni yazın. Yalnızca birini doldurmanız yeterlidir.',
    'Boş satırlara ne yapılacağını ve satırların baş-son boşluklarının kırpılıp kırpılmayacağını seçin.',
    'Virgüllü bir liste hazırlıyorsanız "Son satırın son eki" seçeneğini "Ekleme" yaparak en sondaki fazladan virgülü önleyin.',
    '"Ekle" düğmesine basın ve sonucu kopyalayın.',
  ],
  sections: [
    { h: 'Ön ek ve son ek ekleme ne demek?', p: [
      'Ön ek, bir satırın en başına; son ek ise en sonuna yapıştırılan sabit metindir. Araç, verdiğiniz listedeki her satır için aynı işlemi yapar: <strong>yeni satır = ön ek + özgün satır + son ek</strong>. Satırın kendi içeriğine dokunulmaz, yalnızca iki ucuna ekleme yapılır.',
      'Tek bir satırda bunu elle yapmak kolaydır; ancak 300 satırlık bir şehir listesini tırnak içine almak ya da 500 ürün kodunun sonuna virgül koymak dakikalar alır ve arada bir satırı atlamak işten bile değildir. Metin düzenleyicilerdeki çoklu imleç ya da hesap tablolarındaki birleştirme formülleri aynı işi görür, fakat herkesin elinin altında bu araçlar olmaz ve formül yazmak gerekir. Burada iki kutuyu doldurup düğmeye basmak yeterlidir.',
    ] },
    { h: 'Sık kullanılan ön ek ve son ek örnekleri', ul: [
      '<strong>Madde işareti:</strong> Ön ek <code>- </code> ya da <code>• </code> yazarak düz satırları madde listesine çevirin.',
      '<strong>Tırnak ve virgül:</strong> Ön ek <code>"</code>, son ek <code>",</code> ile programlama dillerinde dizi ya da liste tanımı için hazır değerler üretin.',
      '<strong>SQL değer listesi:</strong> Ön ek <code>\'</code>, son ek <code>\',</code> yazıp sorgunun IN (...) bölümüne yapıştırılacak değerleri hazırlayın.',
      '<strong>HTML liste öğesi:</strong> Ön ek <code><li></code>, son ek <code></li></code> ile her satırı liste öğesine dönüştürün.',
      '<strong>Alıntı işareti:</strong> Ön ek <code>> </code> ile e-posta ve Markdown biçiminde alıntı bloğu oluşturun.',
      '<strong>Dosya uzantısı ya da alan adı:</strong> Son ek <code>.pdf</code> ile dosya adı listesi, son ek <code>@sirketiniz.com.tr</code> ile kullanıcı adlarından e-posta adresi listesi hazırlayın.',
      '<strong>Açıklama satırı:</strong> Ön ek <code>// </code> ya da <code># </code> ile bir kod bloğunu topluca yorum satırına çevirin.',
      '<strong>Girinti:</strong> Ön eke dört boşluk ya da <code>\\t</code> yazarak tüm satırları içeri alın.',
    ] },
    { h: 'Çözümlü örnek: şehir listesini koda hazır hâle getirme', p: [
      'Elinizde alt alta yazılmış <code>Ankara</code>, <code>İzmir</code>, <code>Bursa</code> satırları olsun. Ön eke çift tırnak, son eke çift tırnak ve virgül yazıp düğmeye bastığınızda şu çıktıyı alırsınız: <code>"Ankara",</code> / <code>"İzmir",</code> / <code>"Bursa",</code>. Üç satırın üçüne de ek konmuştur.',
      'Birçok dilde ve özellikle SQL sorgularında son öğeden sonra virgül kalması hataya yol açar. Bunu önlemek için "Son satırın son eki" seçeneğini "Ekleme" yapın. Tek tırnakla aynı liste bu kez <code>\'Ankara\',</code> / <code>\'İzmir\',</code> / <code>\'Bursa</code> biçiminde çıkar; dikkat ederseniz son satıra son ekin tamamı eklenmez, yani kapanış tırnağı da gelmez. Son ekiniz yalnızca ayırıcıdan (örneğin tek bir virgülden) oluşuyorsa bu seçenek tam istediğiniz sonucu verir; kapanış tırnağı gibi her satırda bulunması gereken bir işaret içeriyorsa seçeneği "Ekle" konumunda bırakıp sondaki virgülü elle silmek daha doğrudur.',
      'Daha basit bir örnek: <code>elma</code>, <code>armut</code>, <code>kiraz</code> satırlarına ön ek olarak tire ve boşluk verdiğinizde <code>- elma</code>, <code>- armut</code>, <code>- kiraz</code> elde edilir; toplam uzunluk satır sonlarıyla birlikte 22 karakterdir.',
    ] },
    { h: 'Boş satırlar ve boşluk kırpma', p: [
      'Listelerin arasında ya da sonunda boş satır kalması çok yaygındır. Varsayılan ayarda araç boş satırlara ek koymaz ve onları yerinde bırakır; böylece paragraf ya da grup ayrımı bozulmaz ve ortada içi boş <code>"",</code> gibi satırlar oluşmaz. "Ek koy" seçeneği boş satırları da diğerleri gibi işler; alıntı bloklarında boş satırın da <code>></code> ile başlaması gerektiğinde kullanılır. "Sil" seçeneği boş satırları tümüyle kaldırır. Metnin en sonundaki boş satırlar her durumda yok sayılır.',
      'Tablodan ya da PDF\'ten kopyalanan satırların sonunda gözle görülmeyen boşluklar bulunabilir. Bu durumda son ek, kelimeye bitişik değil boşluktan sonra eklenir ve <code>rapor .pdf</code> gibi hatalı sonuçlar doğar. "Eklemeden önce kırp" seçeneği her satırın baş ve sonundaki boşlukları temizleyip eki öyle koyar; örneğin başında ve sonunda boşluk bulunan <code>rapor</code> satırı <code>rapor.pdf</code> olur. Girintili bir metinle çalışıyor ve girintinin korunmasını istiyorsanız kırpmayı kapalı tutun.',
    ] },
    { h: 'İpuçları ve sınırlar', ul: [
      'Ön ek ve son ek alanlarına yazdığınız boşluklar aynen kullanılır; madde işaretinden sonra boşluk istiyorsanız alana da boşluk yazın.',
      'Alanlara sekme tuşuyla sekme yazılamaz; bunun yerine <code>\\t</code> yazın, araç onu gerçek sekme karakterine çevirir.',
      'Ekler düz metindir; içinde satır numarası ya da değişken bulunmaz. Artan numara eklemek için satır numarası ekleme aracını kullanın.',
      'Araç eklemeden önce satırda aynı ekin zaten bulunup bulunmadığına bakmaz; iki kez çalıştırırsanız ek iki kez eklenir.',
      'Tek seferde en fazla 200.000 satır işlenir.',
    ] },
  ],
  faq: [
    ['Yalnızca satır sonuna ekleme yapabilir miyim?', 'Evet. "Ön ek" alanını boş bırakıp yalnızca "Son ek" alanını doldurun. Tersine, sadece satır başına ekleme için son eki boş bırakabilirsiniz. İkisi birden boşsa araç uyarı verir.'],
    ['Her satırı tırnak içine nasıl alırım?', 'Ön ek alanına açılış tırnağını, son ek alanına kapanış tırnağını yazın. Arkasından virgül de isterseniz son eke tırnaktan sonra virgül ekleyin; sonuç "değer", biçiminde olur.'],
    ['Son satırdaki fazladan virgülden nasıl kurtulurum?', '"Son satırın son eki" seçeneğini "Ekleme" yapın; son dolu satıra son ek uygulanmaz. Son ekiniz virgülün yanında kapanış tırnağı da içeriyorsa bu seçenek tırnağı da atlayacağı için, o durumda virgülü elle silmek daha uygundur.'],
    ['Boş satırlara da ek konur mu?', 'Varsayılan ayarda hayır; boş satırlar olduğu gibi kalır. İsterseniz "Ek koy" ile onları da işleyebilir ya da "Sil" ile listeden çıkarabilirsiniz.'],
    ['Ön eke sekme ya da girinti nasıl yazarım?', 'Girinti için alana doğrudan boşluk yazabilirsiniz. Sekme karakteri için ters eğik çizgi ve t harfini (\\t) yazın; araç bunu gerçek sekmeye dönüştürür.'],
    ['Satırlardaki mevcut ekleri kaldırabilir miyim?', 'Bu araç yalnızca ekleme yapar. Satır başındaki ya da sonundaki belirli bir ifadeyi silmek için bul ve değiştir aracını kullanıp ifadeyi boş metinle değiştirebilirsiniz.'],
    ['Türkçe karakterler ve özel işaretler sorun çıkarır mı?', 'Hayır. Ekler ve satırlar olduğu gibi birleştirilir; Türkçe harfler, tırnaklar, küçüktür-büyüktür işaretleri ve semboller değiştirilmez.'],
    ['Listem herhangi bir yere gönderiliyor mu?', 'Hayır. Ekleme işlemi tarayıcınızda yapılır; müşteri adları ya da e-posta listeleri dahil hiçbir veri sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['satir-numarasi-ekle', 'liste-virgul-donustur', 'satirlari-birlestir', 'bul-ve-degistir', 'bosluk-temizle'],
};
