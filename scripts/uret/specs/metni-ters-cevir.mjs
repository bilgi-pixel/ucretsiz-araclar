export default {
  slug: 'metni-ters-cevir',
  title: 'Metni Ters Çevirme',
  h1Tail: 'yazıyı tersten yazın',
  pageTitle: 'Metni Ters Çevirme – Yazıyı Tersten Yazma Aracı',
  description: 'Metni harf harf ters çevirin: tüm yazıyı, her satırı ya da her kelimeyi ayrı ayrı tersten yazın. Türkçe harfler ve emojiler bozulmaz; palindrom denetimi de yapılır.',
  card: 'Yazıyı tersten yazın: tüm metni, her satırı ya da her kelimeyi harf harf ters çevirin; palindrom olup olmadığını görün.',
  category: 'metin',
  keywords: ['metni ters çevirme', 'yazıyı tersten yazma', 'ters yazı', 'tersten yazı yazma', 'kelimeyi ters çevir', 'metin tersine çevirme', 'ters metin oluşturma', 'tersten okunuş'],
  lead: 'Yazdığınız metni sondan başa doğru, harf harf ters çevirin. Tüm metni tek parça hâlinde, <strong>her satırı kendi içinde</strong> ya da <strong>her kelimeyi yerinde</strong> tersine çevirebilirsiniz. Araç ayrıca metnin tersten de aynı okunup okunmadığını, yani palindrom olup olmadığını söyler.',
  button: 'Ters Çevir',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Ters çevirmek istediğiniz metni yazın', wide: true },
    { id: 'mod', label: 'Ters çevirme biçimi', type: 'select', options: [['tum', 'Tüm metni baştan sona ters çevir'], ['satir', 'Her satırı kendi içinde ters çevir'], ['kelime', 'Her kelimenin harflerini ters çevir (sıra aynı)']] },
  ],
  compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Ters çevirmek için "Metin" alanına bir yazı yazın.');
    // Harf kümelerine böl: birleşik emoji ve aksanlı harfler parçalanmasın
    let seg = null;
    try { if (typeof Intl !== 'undefined' && Intl.Segmenter) seg = new Intl.Segmenter('tr', { granularity: 'grapheme' }); } catch (e) { seg = null; }
    const parcala = (t) => (seg ? Array.from(seg.segment(t), (x) => x.segment) : Array.from(t));
    const ters = (t) => parcala(t).reverse().join('');
    let cikti;
    if (v.mod === 'satir') cikti = s.split('\n').map(ters).join('\n');
    else if (v.mod === 'kelime') cikti = s.split(/(\s+)/).map((p) => (/^\s+$/.test(p) ? p : ters(p))).join('');
    else cikti = ters(s);
    const harfler = parcala(s.toLocaleLowerCase('tr')).filter((c) => /[\p{L}\p{N}]/u.test(c));
    const palindrom = harfler.length > 0 && harfler.join('') === harfler.slice().reverse().join('');
    return {
      rows: [
        ['Karakter sayısı', h.fmt(parcala(s).length, 0)],
        ['Harf ve rakam sayısı', h.fmt(harfler.length, 0)],
        ['Palindrom mu?', harfler.length === 0 ? 'Harf ya da rakam yok' : palindrom ? 'Evet' : 'Hayır'],
      ],
      text: cikti,
      note: 'Palindrom denetiminde boşluklar, noktalama işaretleri ve büyük-küçük harf farkı dikkate alınmaz.',
    };
  },
  cases: [
    { in: { metin: 'Merhaba', mod: 'tum' }, text: 'abahreM', out: { 'Karakter sayısı': '7', 'Harf ve rakam sayısı': '7', 'Palindrom mu?': 'Hayır' } },
    { in: { metin: 'Ey Edip Adana\'da pide ye', mod: 'tum' }, text: 'ey edip ad\'anadA pidE yE', out: { 'Karakter sayısı': '24', 'Harf ve rakam sayısı': '19', 'Palindrom mu?': 'Evet' } },
    { in: { metin: 'abc\n123', mod: 'satir' }, text: 'cba\n321' },
    { in: { metin: 'abc\n123', mod: 'tum' }, text: '321\ncba', out: { 'Karakter sayısı': '7' } },
    { in: { metin: 'Bugün hava güzel', mod: 'kelime' }, text: 'nüguB avah lezüg', out: { 'Palindrom mu?': 'Hayır' } },
    { in: { metin: 'a👍b', mod: 'tum' }, text: 'b👍a', out: { 'Karakter sayısı': '3' } },
    { in: { metin: 'IŞIK ışığı', mod: 'tum' }, text: 'ığışı KIŞI' },
    { in: { metin: 'kayak', mod: 'tum' }, text: 'kayak', out: { 'Palindrom mu?': 'Evet' } },
    { in: { metin: '', mod: 'tum' }, error: true },
    { in: { metin: '   \n ', mod: 'satir' }, error: true },
  ],
  howto: [
    'Ters çevirmek istediğiniz kelimeyi, cümleyi ya da paragrafı "Metin" kutusuna yazın.',
    '"Ters çevirme biçimi" listesinden bir seçenek belirleyin: tüm metin, satır satır ya da kelime kelime.',
    '"Ters Çevir" düğmesine basın. Tersine çevrilmiş yazı sonuç kutusunda görünür.',
    '"Palindrom mu?" satırına bakarak metnin tersten de aynı okunup okunmadığını öğrenin; sonucu "Sonucu kopyala" ile panoya alın.',
  ],
  sections: [
    { h: 'Üç ters çevirme biçimi', p: [
      'Bir metni "ters çevirmek" birden çok anlama gelebilir; bu yüzden araç üç ayrı biçim sunar. Örnek olarak iki satırlık bir metin alalım: ilk satır "abc", ikinci satır "123".',
    ], ul: [
      '<strong>Tüm metni baştan sona ters çevir:</strong> son karakter başa, ilk karakter sona gelir; satır sonları da bu sıraya dahildir. Örnek metin "321" ve altında "cba" olur. Yani hem satırların sırası hem de her satırın içi tersine döner.',
      '<strong>Her satırı kendi içinde ters çevir:</strong> satırlar yerinde kalır, yalnızca içerikleri ters çevrilir. Örnek metin "cba" ve altında "321" olur. Listeler ve şiir dizeleri için uygundur.',
      '<strong>Her kelimenin harflerini ters çevir:</strong> kelimelerin sırası ve aralarındaki boşluklar korunur, her kelime kendi içinde tersine çevrilir. "Bugün hava güzel" cümlesi "nüguB avah lezüg" olur. Bulmaca ve sınıf içi oyunlar için kullanışlıdır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      '"Merhaba" kelimesi yedi harften oluşur: M, e, r, h, a, b, a. Sondan başa doğru dizildiğinde a, b, a, h, r, e, M sırası elde edilir ve sonuç "abahreM" olur. Büyük harf yer değiştirir ama küçülmez; araç harflerin biçimini değiştirmez, yalnızca sıralarını çevirir. "Merhaba" tersten farklı okunduğu için palindrom değildir.',
      'Türkçenin en bilinen tersten okunabilir cümlelerinden biri "Ey Edip Adana\'da pide ye" cümlesidir. Tümü ters çevrildiğinde "ey edip ad\'anadA pidE yE" çıkar. Boşlukların ve kesme işaretinin yeri ile büyük harfler farklı olduğundan iki yazı birebir aynı görünmez; ama yalnızca harflere bakıldığında on dokuz harfin dizilişi her iki yönde de aynıdır. Araç bu yüzden cümleyi palindrom olarak işaretler.',
    ] },
    { h: 'Palindrom nedir?', p: [
      'Palindrom, baştan sona ve sondan başa aynı okunan kelime, sayı ya da cümledir. Tek kelimelik örnekler arasında "kayak", "kabak", "kütük", "kazak", "ütü", "yay" ve "ama" sayılabilir. Sayılarda 121 ve 2002 birer palindromdur. Cümle düzeyinde ise boşluklar ve noktalama işaretleri göz ardı edilir: "Ey Edip Adana\'da pide ye" türünden söz oyunları bu kurala göre değerlendirilir.',
      'Araç denetimi yaparken metni Türkçe kurallarına göre küçük harfe çevirir, harf ve rakam dışındaki her şeyi atar ve kalan diziyi tersiyle karşılaştırır. Türkçede büyük I harfinin küçüğü ı, büyük İ harfinin küçüğü i olduğundan bu ayrım doğru yapılır; "IŞI" ile "ışı" aynı kabul edilir.',
    ] },
    { h: 'Türkçe harfler ve emojiler neden bozulmaz?', p: [
      'Basit ters çevirme yöntemleri metni bilgisayarın iç kodlama birimlerine göre çevirir. Bu yaklaşım Türkçe harflerde çoğunlukla sorun çıkarmaz, ancak emojilerde ve birleşik karakterlerde yazıyı bozar: tek bir emoji bellekte iki birim kaplar ve bu birimlerin sırası değişirse yerine anlamsız bir işaret görünür. Aksan işaretiyle birleştirilerek yazılmış harflerde de aksan yanlış harfin üzerine geçer.',
      'Bu araç metni, okuyucunun tek bir karakter olarak gördüğü kümelere ayırır ve bu kümeleri bütün hâlinde yer değiştirir. Böylece "a👍b" yazısı doğru biçimde "b👍a" olur; ten rengi seçilmiş emojiler, bayraklar ve aile emojileri gibi birden çok parçadan oluşan işaretler de tarayıcınız destekliyorsa parçalanmadan taşınır. Karakter sayısı satırı da aynı kümelere göre hesaplanır.',
    ] },
    { h: 'Nerelerde kullanılır?', ul: [
      'Bulmaca, bilmece ve hazine avı oyunlarında ipucu gizlemek',
      'Sınıfta okuma ve dikkat etkinlikleri hazırlamak; öğrencilerden ters yazılmış kelimeyi çözmelerini istemek',
      'Bir kelimenin ya da cümlenin palindrom olup olmadığını sınamak',
      'Programlama derslerinde dizgi ters çevirme alıştırmasının beklenen çıktısını doğrulamak',
      'Sosyal medya paylaşımlarında dikkat çekici ters yazılar oluşturmak',
      'Aynada okunacak yazılar için ilk adım olarak harf sırasını tersine çevirmek',
    ] },
    { h: 'Sınırlar', p: [
      'Araç harflerin sırasını çevirir; harfleri aynadaki gibi yatay olarak çevirmez. Gerçek bir ayna yazısı için ters çevrilen metnin ayrıca görsel olarak yansıtılması gerekir. Ters yazı bir şifreleme yöntemi de değildir: herkes metni yeniden ters çevirerek özgün hâline ulaşabilir, bu yüzden gizli kalması gereken bilgileri korumak için kullanılmamalıdır. Arapça ve İbranice gibi sağdan sola yazılan dillerde sonuç ekranda beklenenden farklı görünebilir, çünkü tarayıcı bu yazıların yönünü kendiliğinden düzenler. Sayılar da rakam rakam ters çevrilir; "2024" yazısı "4202" olur.',
    ] },
  ],
  faq: [
    ['Metni ters çevirmek ne demektir?', 'Metindeki karakterlerin sırasını sondan başa doğru dizmektir. "Merhaba" kelimesi ters çevrildiğinde "abahreM" olur. Harflerin kendisi değişmez, yalnızca yerleri değişir.'],
    ['Kelimelerin sırasını değil, yalnızca harflerini ters çevirebilir miyim?', 'Evet. "Her kelimenin harflerini ters çevir" seçeneği kelime sırasını ve boşlukları korur, her kelimeyi kendi içinde tersine çevirir.'],
    ['Kelimelerin sırasını tersine çevirmek istiyorum, harfler aynı kalsın. Bu araç yapar mı?', 'Hayır, bu araç harf düzeyinde çalışır. Harfleri bozmadan kelimelerin sırasını tersine çevirmek için kelime sırasını ters çevirme aracını kullanın.'],
    ['Türkçe karakterler bozulur mu?', 'Hayır. ç, ğ, ı, İ, ö, ş, ü harfleri tek karakter olarak taşınır ve aynen korunur. Palindrom denetiminde I-ı ve İ-i eşleşmeleri Türkçe kurallarına göre yapılır.'],
    ['Emoji içeren metinler ters çevrilebilir mi?', 'Evet. Metin, ekranda tek karakter olarak görünen kümelere ayrılarak çevrilir; bu sayede emojiler parçalanmaz. Çok eski tarayıcılarda birleşik emojiler bileşenlerine ayrılabilir.'],
    ['Palindrom denetimi boşlukları sayıyor mu?', 'Hayır. Boşluklar, noktalama işaretleri ve büyük-küçük harf farkı göz ardı edilir; yalnızca harf ve rakamların dizilişine bakılır. Bu sayede palindrom cümleler de doğru tanınır.'],
    ['Ters çevrilmiş metni eski hâline nasıl getiririm?', 'Sonucu metin kutusuna yapıştırıp aynı biçimle yeniden ters çevirin. Üç biçim de kendi tersidir; iki kez uygulandığında özgün metin geri gelir.'],
    ['Yazdığım metin bir yere gönderiliyor mu?', 'Hayır. İşlem tümüyle tarayıcınızda yapılır; metniniz sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['kelimeleri-ters-cevir', 'palindrom-kontrol', 'satirlari-ters-sirala', 'buyuk-kucuk-harf-donustur', 'kelime-karistir'],
};
