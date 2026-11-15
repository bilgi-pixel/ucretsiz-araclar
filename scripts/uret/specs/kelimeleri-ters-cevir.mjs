export default {
  slug: 'kelimeleri-ters-cevir',
  title: 'Kelime Sırasını Ters Çevirme',
  h1Tail: 'kelimeleri sondan başa dizin',
  pageTitle: 'Kelime Sırasını Ters Çevirme – Cümleyi Sondan Başa Dizme',
  description: 'Cümledeki kelimelerin sırasını ters çevirin: son kelime başa, ilk kelime sona gelir, harfler bozulmaz. Satır satır ya da tüm metinde, boşluk ya da virgüle göre çalışır.',
  card: 'Cümledeki kelimelerin ya da virgüllü listedeki öğelerin sırasını tersine çevirin; harfler aynı kalır.',
  category: 'metin',
  keywords: ['kelime sırasını ters çevirme', 'kelimeleri ters çevir', 'cümleyi tersten yazma', 'kelime sırası değiştirme', 'listeyi ters çevirme', 'virgüllü listeyi ters sıralama', 'kelimeleri sondan başa yazma'],
  lead: 'Bir cümlenin ya da listenin öğelerini sondan başa doğru yeniden dizin. Bu araç harfleri değil, <strong>kelimelerin sırasını</strong> tersine çevirir: "Ali okula gitti" yazısı "gitti okula Ali" olur. Virgülle ayrılmış listelerde de çalışır.',
  button: 'Ters Çevir',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Kelime sırasını tersine çevirmek istediğiniz cümleyi ya da listeyi yazın', wide: true },
    { id: 'kapsam', label: 'Kapsam', type: 'select', options: [['satir', 'Her satırı kendi içinde ters çevir'], ['tum', 'Tüm metni ters çevir (satır sırası da tersine döner)']] },
    { id: 'ayirici', label: 'Öğeler neyle ayrılmış?', type: 'select', options: [['bosluk', 'Boşluk (kelimeler)'], ['virgul', 'Virgül (liste öğeleri)']] },
    { id: 'sonNokta', label: 'Satır sonundaki noktalama', type: 'select', options: [['koru', 'Kelimeyle birlikte taşı'], ['sonda', 'Satırın sonunda tut']], hint: '"Satırın sonunda tut": "Ali okula gitti." → "gitti okula Ali."' },
  ],
  compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Kelime sırasını ters çevirmek için "Metin" alanına bir cümle ya da liste yazın.');
    let satirlar = s.split('\n');
    while (satirlar.length && satirlar[satirlar.length - 1].trim() === '') satirlar.pop();
    while (satirlar.length && satirlar[0].trim() === '') satirlar.shift();
    const virgul = v.ayirici === 'virgul';
    let adet = 0, dolu = 0;
    let cikti = satirlar.map((x) => {
      let t = x.trim(), ek = '';
      if (t === '') return '';
      if (v.sonNokta === 'sonda') {
        const m = /[.!?…]+$/.exec(t);
        if (m) { ek = m[0]; t = t.slice(0, m.index).trim(); }
      }
      const ogeler = virgul ? t.split(',').map((p) => p.trim()).filter((p) => p !== '') : t.split(/\s+/).filter((p) => p !== '');
      adet += ogeler.length;
      dolu++;
      return ogeler.reverse().join(virgul ? ', ' : ' ') + ek;
    });
    if (v.kapsam === 'tum') cikti = cikti.reverse();
    return {
      rows: [
        ['Ters çevrilen öğe sayısı', h.fmt(adet, 0)],
        ['Dolu satır sayısı', h.fmt(dolu, 0)],
      ],
      text: cikti.join('\n'),
      note: 'Harfler ve kelimelerin yazımı değişmez; yalnızca sıraları tersine döner. Öğeler arasındaki fazla boşluklar teke indirilir.',
    };
  },
  cases: [
    { in: { metin: 'Ali okula gitti' }, text: 'gitti okula Ali', out: { 'Ters çevrilen öğe sayısı': '3', 'Dolu satır sayısı': '1' } },
    { in: { metin: 'bir iki üç\ndört beş', kapsam: 'satir' }, text: 'üç iki bir\nbeş dört', out: { 'Ters çevrilen öğe sayısı': '5', 'Dolu satır sayısı': '2' } },
    { in: { metin: 'bir iki üç\ndört beş', kapsam: 'tum' }, text: 'beş dört\nüç iki bir', out: { 'Ters çevrilen öğe sayısı': '5' } },
    { in: { metin: 'elma, armut, kiraz', ayirici: 'virgul' }, text: 'kiraz, armut, elma', out: { 'Ters çevrilen öğe sayısı': '3' } },
    { in: { metin: 'Ali okula gitti.', sonNokta: 'sonda' }, text: 'gitti okula Ali.' },
    { in: { metin: 'Ali okula gitti.', sonNokta: 'koru' }, text: 'gitti. okula Ali' },
    { in: { metin: '  çok   boşluklu    metin  ' }, text: 'metin boşluklu çok', out: { 'Ters çevrilen öğe sayısı': '3' } },
    { in: { metin: 'a b\n\nc d\n' }, text: 'b a\n\nd c', out: { 'Dolu satır sayısı': '2' } },
    { in: { metin: 'Kırmızı elma,Yeşil armut , Sarı muz', ayirici: 'virgul' }, text: 'Sarı muz, Yeşil armut, Kırmızı elma' },
    { in: { metin: 'tek' }, text: 'tek', out: { 'Ters çevrilen öğe sayısı': '1' } },
    { in: { metin: '' }, error: true },
    { in: { metin: ' \n  ' }, error: true },
  ],
  howto: [
    'Sırasını tersine çevirmek istediğiniz cümleyi, cümleleri ya da listeyi "Metin" kutusuna yazın.',
    '"Kapsam" listesinden her satırın kendi içinde mi, yoksa tüm metnin baştan sona mı ters çevrileceğini seçin.',
    'Kelimeler yerine virgülle ayrılmış öğeleri çevirecekseniz "Öğeler neyle ayrılmış?" seçeneğini "Virgül" yapın.',
    'Cümle sonundaki noktanın yine sonda kalmasını istiyorsanız "Satır sonundaki noktalama" seçeneğini "Satırın sonunda tut" konumuna alın.',
    '"Ters Çevir" düğmesine basın ve sonucu "Sonucu kopyala" düğmesiyle panoya alın.',
  ],
  sections: [
    { h: 'Kelime sırasını ters çevirmek ne demek?', p: [
      'Bir metni tersine çevirmenin iki farklı düzeyi vardır. Harf düzeyinde ters çevirmede her karakter yer değiştirir ve "Ali okula gitti" yazısı "ittig aluko ilA" gibi okunmaz bir diziye dönüşür. Kelime düzeyinde ters çevirmede ise kelimeler birer bütün olarak kalır, yalnızca dizilişleri değişir: son kelime başa, ilk kelime sona geçer ve sonuç "gitti okula Ali" olur. Bu araç ikinci işi yapar; hiçbir kelimenin yazımına dokunmaz.',
      'İşleyiş basittir: satır öğelerine bölünür, öğelerin sırası tersine çevrilir ve öğeler yeniden birleştirilir. Öğeler boşlukla ayrılmışsa aralarına tek boşluk, virgülle ayrılmışsa virgül ve boşluk konur. Bu sırada kelimeler arasındaki fazla boşluklar da kendiliğinden temizlenmiş olur.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Tek cümle:</strong> "Ali okula gitti" üç kelimedir. Ters sırada dizildiğinde "gitti okula Ali" elde edilir; ters çevrilen öğe sayısı 3\'tür.',
      '<strong>İki satır, satır satır:</strong> İlk satır "bir iki üç", ikinci satır "dört beş" olsun. "Her satırı kendi içinde ters çevir" seçiliyken satırlar yerinde kalır, içleri çevrilir: ilk satır "üç iki bir", ikinci satır "beş dört" olur.',
      '<strong>İki satır, tüm metin:</strong> Aynı metinde "Tüm metni ters çevir" seçildiğinde satırların sırası da tersine döner: ilk satır "beş dört", ikinci satır "üç iki bir" olur. Böylece metnin en son kelimesi en başa, en ilk kelimesi en sona gelir.',
      '<strong>Virgüllü liste:</strong> "elma, armut, kiraz" listesi virgüle göre ayrıldığında "kiraz, armut, elma" olur. "Kırmızı elma, Yeşil armut, Sarı muz" gibi birden çok kelimeli öğeler bölünmez; her öğe bütün olarak taşınır ve sonuç "Sarı muz, Yeşil armut, Kırmızı elma" çıkar.',
    ] },
    { h: 'Noktalama işaretleri nasıl davranır?', p: [
      'Boşluğa göre ayırmada noktalama işaretleri bitişik oldukları kelimenin parçası sayılır. "Ali okula gitti." cümlesinde nokta "gitti" kelimesine yapışıktır; kelime başa geçince nokta da onunla gider ve sonuç "gitti. okula Ali" olur. Çoğu zaman istenen bu değildir. "Satırın sonunda tut" seçeneği, satırın sonundaki nokta, soru işareti, ünlem ya da üç noktayı önce ayırır, kelimeleri çevirir ve işareti yeniden sona ekler: "gitti okula Ali."',
      'Bu seçenek yalnızca satırın en sonundaki işareti kapsar. Cümle içindeki virgüller ve tırnak işaretleri bitişik oldukları kelimeyle birlikte taşınmaya devam eder. Büyük harfler de yer değiştirmez: cümlenin ilk kelimesindeki büyük harf, kelime sona gittiğinde de büyük kalır. Düzgün bir cümle elde etmek istiyorsanız sonucu elle gözden geçirmeniz gerekir.',
    ] },
    { h: 'Türkçede devrik cümle ve kelime sırası', p: [
      'Türkçenin kurallı cümle düzeninde yüklem sonda bulunur: "Ali okula gitti." Yüklemin sonda olmadığı cümlelere devrik cümle denir ve şiirde, günlük konuşmada sıkça kullanılır: "Gitti Ali okula." Türkçede kelimelerin görevini büyük ölçüde ekler belirlediği için, sıra değişse de cümle çoğu zaman anlaşılır kalır. Bu özellik, kelime sırasını tersine çevirmeyi dil derslerinde eğlenceli bir alıştırmaya dönüştürür: öğrenciler ters çevrilmiş cümlede öznenin, nesnenin ve yüklemin hâlâ bulunabildiğini görürler. İngilizce gibi anlamın sıraya dayandığı dillerde ise aynı işlem cümleyi genellikle anlamsızlaştırır.',
      'Araç bir dil bilgisi çözümleyicisi değildir; kurallı cümleyi anlamlı bir devrik cümleye çevirmeyi amaçlamaz, yalnızca sırayı mekanik olarak tersine döndürür.',
    ] },
    { h: 'Kullanım alanları', ul: [
      '<strong>Ad soyad sırası:</strong> "Ayşe Yılmaz" biçimindeki iki kelimelik adları satır satır "Yılmaz Ayşe" biçimine getirmek.',
      '<strong>Listeler:</strong> virgülle ayrılmış etiket, anahtar kelime ya da malzeme listesini sondan başa dizmek.',
      '<strong>Sıralı veriler:</strong> eskiden yeniye yazılmış bir diziyi yeniden eskiye çevirmek, örneğin "Ocak, Şubat, Mart" yerine "Mart, Şubat, Ocak".',
      '<strong>Eğitim:</strong> devrik cümle, öge bulma ve kelime sırası konularında alıştırma hazırlamak.',
      '<strong>Bulmaca ve oyun:</strong> kelimeleri karıştırılmış cümleler oluşturmak.',
      '<strong>Programlama alıştırmaları:</strong> "bir cümledeki kelimeleri ters çevir" sorusunun beklenen çıktısını doğrulamak.',
    ] },
    { h: 'Sınırlar', p: [
      'Boşluğa göre ayırmada her boşluk bir sınırdır; "Kuzey Kıbrıs" ya da "23 Nisan" gibi birlikte anlam taşıyan söz grupları da bölünür. Bunları bir arada tutmak için öğeleri virgülle ayırıp virgül seçeneğini kullanın. Virgüle göre ayırmada ise ondalık virgül içeren sayılar ("3,5") iki öğeye bölünür. Boş satırlar yerinde bırakılır; metnin başındaki ve sonundaki boş satırlar atılır. Satır başındaki girintiler korunmaz, çünkü her satır öğelerine ayrılıp yeniden kurulur.',
    ] },
  ],
  faq: [
    ['Bu araç harfleri de ters çevirir mi?', 'Hayır. Kelimeler olduğu gibi kalır, yalnızca sıraları değişir. Harf harf ters yazı için metni ters çevirme aracını kullanın.'],
    ['Birden çok satır yazarsam ne olur?', '"Her satırı kendi içinde ters çevir" seçeneğinde her satır ayrı ayrı çevrilir ve satırların yeri değişmez. "Tüm metni ters çevir" seçeneğinde ayrıca satırların sırası da tersine döner.'],
    ['Cümle sonundaki nokta neden başa geçti?', 'Nokta son kelimeye bitişik olduğu için onunla birlikte taşınır. Noktanın sonda kalması için "Satır sonundaki noktalama" seçeneğini "Satırın sonunda tut" yapın.'],
    ['Virgülle ayrılmış listeyi nasıl ters çeviririm?', '"Öğeler neyle ayrılmış?" seçeneğini "Virgül" yapın. Her öğe, içinde birden çok kelime olsa bile bütün olarak taşınır ve sonuçta öğeler virgül ve boşlukla yeniden birleştirilir.'],
    ['Alt alta yazılmış satırların sırasını ters çevirebilir miyim?', 'Her satırda tek kelime varsa "Tüm metni ters çevir" seçeneği satır sırasını tersine döndürür. Çok kelimeli satırların içini bozmadan yalnızca sırasını çevirmek için satır sırasını ters çevirme aracını kullanın.'],
    ['Büyük harfler düzeltiliyor mu?', 'Hayır. Araç yazımı değiştirmez; cümle başındaki büyük harf kelimeyle birlikte yeni yerine gider. Gerekirse sonucu büyük-küçük harf dönüştürme aracıyla düzeltebilirsiniz.'],
    ['Aynı işlemi iki kez uygularsam özgün metin geri gelir mi?', 'Kelime sırası açısından evet: iki kez ters çevrilen metin ilk sırasına döner. Yalnızca fazla boşluklar temizlenmiş olur; virgüllü listelerde öğe araları "virgül ve boşluk" biçimine gelir.'],
    ['Yazdığım metin kaydediliyor mu?', 'Hayır. İşlem tarayıcınızın içinde yapılır; metin sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['metni-ters-cevir', 'satirlari-ters-sirala', 'alfabetik-sirala', 'kelime-karistir', 'satirlari-karistir', 'buyuk-kucuk-harf-donustur'],
};
