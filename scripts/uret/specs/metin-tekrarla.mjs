export default {
  slug: 'metin-tekrarla',
  title: 'Metin Tekrarlama',
  h1Tail: 'yazıyı istediğiniz kadar çoğaltın',
  pageTitle: 'Metin Tekrarlama Aracı – Yazıyı İstediğiniz Kadar Çoğaltın',
  description: 'Bir kelimeyi, cümleyi ya da paragrafı istediğiniz sayıda tekrarlayın. Araya yeni satır, boşluk, virgül ya da kendi ayırıcınızı koyun; sonucu tek tıkla kopyalayın.',
  card: 'Kelime, cümle ya da paragrafı istediğiniz kadar tekrarlayın; araya satır sonu, boşluk, virgül ya da özel ayırıcı koyun.',
  category: 'metin',
  keywords: ['metin tekrarlama', 'yazı çoğaltma', 'kelime tekrarlama', 'metin çoğaltıcı', 'aynı yazıyı tekrar yazma', 'text repeater', 'cümle tekrarlama'],
  lead: 'Yazdığınız metni belirlediğiniz sayıda art arda çoğaltın. Tekrarların arasına <strong>yeni satır, boşluk, virgül</strong> ya da kendi belirlediğiniz bir ayırıcı koyabilir, isterseniz hiç ayırıcı kullanmadan bitişik yazdırabilirsiniz.',
  button: 'Tekrarla',
  inputs: [
    { id: 'metin', label: 'Tekrarlanacak metin', type: 'textarea', placeholder: 'Örn. Merhaba', rows: 4 },
    { id: 'adet', label: 'Tekrar sayısı', type: 'number', value: '3', hint: '1 ile 10.000 arasında tam sayı' },
    { id: 'ayirici', label: 'Tekrarların arası', type: 'select', options: [['satir', 'Yeni satır'], ['bosluk', 'Boşluk'], ['virgul', 'Virgül ve boşluk'], ['yok', 'Ayırıcı yok (bitişik)'], ['ozel', 'Özel ayırıcı']] },
    { id: 'ozel', label: 'Özel ayırıcı', type: 'text', placeholder: 'Örn.  |  ', hint: 'Yalnızca "Özel ayırıcı" seçiliyken kullanılır' },
  ],
  compute(v, h) {
    const metin = String(v.metin ?? '');
    if (metin.trim() === '') h.err('Tekrarlanacak metni yazın.');
    const adet = h.posint(v.adet, 'Tekrar sayısı');
    if (adet > 10000) h.err('Tekrar sayısı en fazla 10.000 olabilir.');
    const AYIRICI = { satir: '\n', bosluk: ' ', virgul: ', ', yok: '' };
    let ayr;
    if (v.ayirici === 'ozel') {
      ayr = String(v.ozel ?? '');
      if (ayr === '') h.err('"Özel ayırıcı" alanını doldurun ya da listeden başka bir ayırıcı seçin.');
    } else ayr = AYIRICI[v.ayirici] ?? '\n';
    const toplam = metin.length * adet + ayr.length * (adet - 1);
    if (toplam > 1000000) h.err('Sonuç 1.000.000 karakteri aşıyor; tekrar sayısını azaltın ya da metni kısaltın.');
    const sonuc = Array(adet).fill(metin).join(ayr);
    return {
      rows: [
        ['Tekrar sayısı', h.fmt(adet, 0)],
        ['Toplam karakter', h.fmt(sonuc.length, 0)],
        ['Tek parçanın uzunluğu', h.fmt(metin.length, 0) + ' karakter'],
      ],
      text: sonuc,
    };
  },
  cases: [
    { in: { metin: 'Merhaba', adet: '3', ayirici: 'satir' }, text: 'Merhaba\nMerhaba\nMerhaba', out: { 'Tekrar sayısı': '3', 'Toplam karakter': '23' } },
    { in: { metin: 'ab', adet: '4', ayirici: 'yok' }, text: 'abababab', out: { 'Toplam karakter': '8' } },
    { in: { metin: 'la', adet: '3', ayirici: 'bosluk' }, text: 'la la la' },
    { in: { metin: 'elma', adet: '2', ayirici: 'virgul' }, text: 'elma, elma', out: { 'Toplam karakter': '10', 'Tek parçanın uzunluğu': '4 karakter' } },
    { in: { metin: 'x', adet: '3', ayirici: 'ozel', ozel: ' - ' }, text: 'x - x - x' },
    { in: { metin: 'tek', adet: '1', ayirici: 'satir' }, text: 'tek' },
    { in: { metin: '=', adet: '1000', ayirici: 'yok' }, out: { 'Toplam karakter': '1.000' }, textMatch: '^={1000}$' },
    { in: { metin: '', adet: '3' }, error: true },
    { in: { metin: 'a', adet: '0' }, error: true },
    { in: { metin: 'a', adet: '2,5' }, error: true },
    { in: { metin: 'a', adet: '20000' }, error: true },
    { in: { metin: 'a', adet: '2', ayirici: 'ozel', ozel: '' }, error: true },
  ],
  howto: [
    '"Tekrarlanacak metin" kutusuna çoğaltmak istediğiniz kelimeyi, cümleyi ya da birkaç satırlık metni yazın veya yapıştırın.',
    '"Tekrar sayısı" alanına metnin toplam kaç kez yazılacağını girin. 3 yazarsanız sonuçta metin üç kez yer alır.',
    '"Tekrarların arası" listesinden kopyaların nasıl ayrılacağını seçin. Kendi işaretinizi kullanacaksanız "Özel ayırıcı" seçip yandaki alana yazın.',
    '"Tekrarla" düğmesine basın. Çoğaltılmış metin sonuç kutusunda, toplam karakter sayısıyla birlikte görünür.',
    '"Sonucu kopyala" düğmesiyle metni panoya alın ve kullanacağınız yere yapıştırın.',
  ],
  sections: [
    { h: 'Metin tekrarlama ne işe yarar?', p: [
      'Aynı ifadeyi onlarca kez elle yazmak ya da kopyala-yapıştır tuşlarına defalarca basmak hem yorucudur hem de sayıyı şaşırmak çok kolaydır. Bu araç işi tek adıma indirir: metni bir kez yazarsınız, kaç kopya istediğinizi söylersiniz, gerisini tarayıcınız halleder. Sonuçta kaç tekrar ve kaç karakter üretildiği de ayrıca gösterildiği için "tam 50 tane oldu mu?" diye saymanıza gerek kalmaz.',
      'İhtiyaç sanıldığından daha sık ortaya çıkar. Bir form alanının karakter sınırını denemek isteyen yazılımcı, tasarımda yer tutucu metin arayan grafiker, bir tabloya aynı etiketi yüz satır boyunca yazması gereken ofis çalışanı ya da düz metin bir belgede ayırıcı çizgi oluşturmak isteyen herkes aynı şeyi ister: belirli bir parçanın belirli sayıda kopyası.',
    ] },
    { h: 'Ayırıcı seçenekleri ve sonucu nasıl etkilediği', p: [
      'Ayırıcı, kopyaların <em>arasına</em> konur; en sona eklenmez. Bu ayrıntı önemlidir, çünkü sonucu bir listeye ya da programa yapıştırdığınızda sonda fazladan virgül ya da boş satır kalmaz. Üç tekrar istediğinizde araya yalnızca iki ayırıcı girer.',
    ], ul: [
      '<strong>Yeni satır:</strong> Her kopya ayrı satıra yazılır. Hesap tablosuna yapıştırdığınızda her satır ayrı hücreye düşer.',
      '<strong>Boşluk:</strong> Kopyalar tek satırda, aralarında birer boşlukla sıralanır. "la la la" gibi ifadeler için uygundur.',
      '<strong>Virgül ve boşluk:</strong> "elma, elma, elma" biçiminde virgüllü bir dizi üretir; deneme verisi hazırlarken kullanışlıdır.',
      '<strong>Ayırıcı yok:</strong> Kopyalar bitişik yazılır. Çizgi, yıldız ya da eşittir işaretinden uzun bir şerit oluşturmak için bu seçenek kullanılır.',
      '<strong>Özel ayırıcı:</strong> Dikey çizgi, noktalı virgül, tire ya da birkaç karakterlik herhangi bir dizi yazabilirsiniz. Alana yazdığınız boşluklar da aynen korunur.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Metin olarak <code>Merhaba</code>, tekrar sayısı olarak 3 yazıp "Yeni satır" seçtiğinizde alt alta üç adet Merhaba elde edersiniz. Toplam karakter sayısı 23 çıkar: her biri 7 harften üç kopya 21 karakter eder, aradaki iki satır sonu da 2 karakter ekler.',
      '<strong>Örnek 2:</strong> <code>ab</code> metnini 4 kez, ayırıcı olmadan tekrarlarsanız sonuç <code>abababab</code> olur ve tam 8 karakter tutar. Aynı yöntemle tek bir <code>=</code> işaretini 1.000 kez tekrarlayarak tam 1.000 karakterlik bir sınama metni üretebilirsiniz.',
      '<strong>Örnek 3:</strong> <code>elma</code> kelimesini 2 kez, "Virgül ve boşluk" ile tekrarlarsanız <code>elma, elma</code> çıkar. Uzunluk 10 karakterdir: 4 + 4 harf ve aradaki virgül ile boşluk.',
      'Genel kural şöyledir: <strong>toplam uzunluk = metin uzunluğu × tekrar sayısı + ayırıcı uzunluğu × (tekrar sayısı − 1)</strong>. Belirli bir karakter sayısını tutturmanız gerekiyorsa bu eşitlikten geriye doğru hesap yapabilirsiniz.',
    ] },
    { h: 'Nerelerde kullanılır?', ul: [
      '<strong>Yazılım testi:</strong> Bir giriş alanının 255 ya da 500 karakter sınırını doğru uygulayıp uygulamadığını görmek için tam o uzunlukta metin üretmek.',
      '<strong>Tasarım ve dizgi:</strong> Bir kutunun ya da sütunun uzun metinle nasıl göründüğünü denemek için aynı cümleyi çoğaltmak.',
      '<strong>Düz metin belgeler:</strong> Tire, yıldız ya da alt çizgi tekrarıyla başlık altı çizgisi ve bölüm ayırıcı hazırlamak.',
      '<strong>Tablo ve liste doldurma:</strong> Aynı değeri yeni satır ayırıcısıyla çoğaltıp hesap tablosunda bir sütuna yapıştırmak.',
      '<strong>Yazı alıştırması:</strong> Klavye ya da güzel yazı çalışması için aynı kelimeyi satır satır çoğaltıp çıktısını almak.',
    ] },
    { h: 'Sınırlar ve dikkat edilecekler', p: [
      'Tekrar sayısı 1 ile 10.000 arasında bir tam sayı olmalıdır; ondalıklı ya da sıfır değer kabul edilmez. Ayrıca üretilecek metnin toplam uzunluğu 1.000.000 karakterle sınırlandırılmıştır. Bu sınır, çok büyük bir sonucun tarayıcı sekmesini kilitlemesini önlemek içindir; sınır aşılırsa araç hata mesajıyla sizi uyarır ve tekrar sayısını azaltmanızı ister.',
      'Metin kutusuna birden fazla satır yazarsanız satır sonları da metnin parçası sayılır ve her kopyada aynen yinelenir. Metnin başındaki ve sonundaki boşluklar silinmez; bitişik tekrarlarda kelimelerin birbirine yapışmasını istemiyorsanız metnin sonuna bir boşluk bırakabilir ya da "Boşluk" ayırıcısını seçebilirsiniz.',
      'Aynı mesajı defalarca çoğaltıp başkalarına toplu olarak göndermek rahatsız edicidir ve çoğu platformun kurallarına aykırıdır. Aracı deneme verisi, tasarım ve belge hazırlığı gibi işler için kullanmanızı öneririz.',
    ] },
  ],
  faq: [
    ['Bir metni en fazla kaç kez tekrarlayabilirim?', 'Tekrar sayısı en fazla 10.000 olabilir. Bunun yanında sonucun toplam uzunluğu 1.000.000 karakteri geçemez; uzun bir paragrafı çoğaltıyorsanız bu ikinci sınır daha önce devreye girebilir.'],
    ['Tekrar sayısı kopya sayısı mı, yoksa ek kopya sayısı mı?', 'Toplam kopya sayısıdır. 3 yazdığınızda sonuçta metin üç kez yer alır; özgün metnin üstüne üç tane daha eklenmez. 1 yazarsanız metin değişmeden geri döner.'],
    ['Sonucun en sonunda da ayırıcı olur mu?', 'Hayır. Ayırıcı yalnızca iki kopyanın arasına konur. Son kopyadan sonra virgül, boşluk ya da boş satır eklenmez; böylece listeye yapıştırdığınızda temizlemeniz gereken bir fazlalık kalmaz.'],
    ['Birden fazla satırı birlikte tekrarlayabilir miyim?', 'Evet. Metin kutusuna yazdığınız her şey, satır sonları dahil, tek bir parça olarak ele alınır ve bütün hâlinde çoğaltılır. Örneğin iki satırlık bir adres bloğunu on kez tekrarlayabilirsiniz.'],
    ['Emoji ya da Türkçe karakterler bozulur mu?', 'Hayır, metin olduğu gibi kopyalanır; ç, ğ, ı, ö, ş, ü harfleri ve semboller değişmez. Yalnızca karakter sayacı bazı emojileri iki birim olarak sayabilir, çünkü bu işaretler bilgisayarda iki kod birimiyle saklanır.'],
    ['Belirli bir karakter sayısına ulaşmak için ne yapmalıyım?', 'Tek karakterlik bir metni ayırıcı olmadan, istediğiniz karakter sayısı kadar tekrarlayın. Örneğin 280 karakterlik bir sınama metni için bir harfi 280 kez tekrarlamanız yeterlidir; "Toplam karakter" satırı sonucu doğrular.'],
    ['Sekme karakterini ayırıcı olarak kullanabilir miyim?', 'Özel ayırıcı alanına klavyeden sekme yazmak çoğu tarayıcıda bir sonraki alana geçer. Sekmeyi başka bir yerden kopyalayıp alana yapıştırırsanız araç onu ayırıcı olarak kullanır.'],
    ['Yazdığım metin bir sunucuya gönderiliyor mu?', 'Hayır. Çoğaltma işlemi tamamen tarayıcınızda yapılır; metniniz hiçbir yere iletilmez ve saklanmaz. Sayfa bir kez yüklendikten sonra internet bağlantısı olmadan da çalışır.'],
  ],
  related: ['lorem-ipsum', 'karakter-sayaci', 'satirlari-birlestir', 'metni-ters-cevir', 'onek-sonek-ekle'],
};
