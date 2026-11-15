export default {
  slug: 'satirlari-karistir',
  title: 'Satırları Karıştırma',
  h1Tail: 'listeyi rastgele sıraya dizin',
  pageTitle: 'Satırları Karıştırma – Listeyi Rastgele Sıraya Dizme Aracı',
  description: 'Alt alta yazdığınız satırları rastgele sıraya dizin. İsim listesi, soru bankası ya da çalma listesi karıştırın; tohum değeriyle aynı sırayı yeniden üretin.',
  card: 'Alt alta yazılmış satırları yansız biçimde rastgele sıraya dizin; tohum değeriyle aynı karışımı tekrar üretin.',
  category: 'metin',
  keywords: ['satırları karıştırma', 'liste karıştırma', 'rastgele sıralama', 'isim listesi karıştır', 'satır karıştırıcı', 'liste rastgele sırala', 'shuffle lines'],
  lead: 'Her satıra bir öğe gelecek şekilde yazdığınız listeyi <strong>rastgele sıraya</strong> dizin. Karıştırma, her sıralamaya eşit şans veren Fisher-Yates yöntemiyle yapılır; isterseniz bir tohum değeri yazarak aynı karışımı daha sonra birebir yeniden üretebilirsiniz.',
  button: 'Karıştır',
  inputs: [
    { id: 'metin', label: 'Satırlar (her satıra bir öğe)', type: 'textarea', placeholder: 'Ayşe\nMehmet\nZeynep\nAli', rows: 8 },
    { id: 'bos', label: 'Boş satırlar', type: 'select', options: [['at', 'Çıkar'], ['tut', 'Koru (onlar da karışır)']] },
    { id: 'tohum', label: 'Tohum (isteğe bağlı)', type: 'text', placeholder: 'Örn. 2026 ya da kura-1', hint: 'Boş bırakılırsa her basışta farklı sıra çıkar; aynı tohum aynı sırayı verir' },
  ],
  compute(v, h) {
    let satirlar = String(v.metin ?? '').replace(/\r\n?/g, '\n').split('\n');
    if (v.bos !== 'tut') satirlar = satirlar.filter((s) => s.trim() !== '');
    else while (satirlar.length && satirlar[satirlar.length - 1].trim() === '') satirlar.pop();
    if (!satirlar.length) h.err('Karıştırılacak satırları yazın; her satıra bir öğe gelmeli.');
    if (satirlar.length > 100000) h.err('En fazla 100.000 satır karıştırılabilir; listeyi parçalara bölün.');
    const tohum = String(v.tohum ?? '').trim();
    let rastgele; // [0, n) aralığında yansız tam sayı üretir
    if (tohum !== '') {
      // Tohumdan 32 bit özet (FNV-1a), ardından mulberry32 üreteci
      let a = 2166136261;
      for (let i = 0; i < tohum.length; i++) { a ^= tohum.charCodeAt(i); a = Math.imul(a, 16777619); }
      a >>>= 0;
      const sonraki = () => {
        a = (a + 0x6D2B79F5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return (t ^ (t >>> 14)) >>> 0;
      };
      rastgele = (n) => { const sinir = Math.floor(4294967296 / n) * n; let x; do { x = sonraki(); } while (x >= sinir); return x % n; };
    } else if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const kutu = new Uint32Array(1);
      rastgele = (n) => { const sinir = Math.floor(4294967296 / n) * n; let x; do { crypto.getRandomValues(kutu); x = kutu[0]; } while (x >= sinir); return x % n; };
    } else {
      rastgele = (n) => Math.floor(Math.random() * n);
    }
    const dizi = satirlar.slice();
    for (let i = dizi.length - 1; i > 0; i--) {
      const j = rastgele(i + 1);
      const gecici = dizi[i]; dizi[i] = dizi[j]; dizi[j] = gecici;
    }
    let yerinde = 0;
    for (let i = 0; i < dizi.length; i++) if (dizi[i] === satirlar[i]) yerinde++;
    return {
      rows: [
        ['Karıştırılan satır', h.fmt(dizi.length, 0)],
        ['Yeri değişmeyen satır', h.fmt(yerinde, 0)],
        ['Karışım türü', tohum !== '' ? 'Tohumlu (tekrarlanabilir)' : 'Rastgele'],
      ],
      text: dizi.join('\n'),
      note: tohum !== '' ? 'Aynı liste ve aynı tohumla her zaman bu sıra elde edilir.' : 'Düğmeye her basışta yeni bir sıra üretilir.',
    };
  },
  cases: [
    { in: { metin: 'a\nb\nc', bos: 'at' }, out: { 'Karıştırılan satır': '3', 'Karışım türü': 'Rastgele' }, textMatch: '^(?=[^]*a)(?=[^]*b)(?=[^]*c)[abc]\\n[abc]\\n[abc]$' },
    { in: { metin: 'tek satır' }, text: 'tek satır', out: { 'Karıştırılan satır': '1', 'Yeri değişmeyen satır': '1' } },
    { in: { metin: 'x\nx\nx\nx' }, text: 'x\nx\nx\nx', out: { 'Karıştırılan satır': '4', 'Yeri değişmeyen satır': '4' } },
    { in: { metin: 'elma\n\narmut\n\n', bos: 'at' }, out: { 'Karıştırılan satır': '2' }, textMatch: '^(elma\\narmut|armut\\nelma)$' },
    { in: { metin: 'elma\n\narmut\n', bos: 'tut' }, out: { 'Karıştırılan satır': '3' }, textMatch: '^(?=[^]*elma)(?=[^]*armut)[^]{10,11}$' },
    { in: { metin: '1\n2\n3\n4\n5', tohum: 'kura' }, out: { 'Karıştırılan satır': '5', 'Karışım türü': 'Tohumlu (tekrarlanabilir)' }, textMatch: '^(?=[^]*1)(?=[^]*2)(?=[^]*3)(?=[^]*4)(?=[^]*5)[1-5](\\n[1-5]){4}$' },
    { in: { metin: 'y\ny', tohum: '42' }, text: 'y\ny' },
    { in: { metin: '' }, error: true },
    { in: { metin: '\n  \n\n', bos: 'at' }, error: true },
  ],
  howto: [
    'Karıştırmak istediğiniz öğeleri kutuya alt alta yazın ya da hesap tablosundan, belgeden kopyalayıp yapıştırın. Her satır tek bir öğe sayılır.',
    '"Boş satırlar" seçeneğiyle aradaki boş satırların listeden çıkarılıp çıkarılmayacağını belirleyin. Çoğu durumda "Çıkar" uygundur.',
    'Aynı sırayı daha sonra yeniden elde etmek ya da başkasına kanıtlamak istiyorsanız "Tohum" alanına bir sayı veya kelime yazın; istemiyorsanız boş bırakın.',
    '"Karıştır" düğmesine basın. Yeni sıra sonuç kutusunda görünür; tohum boşsa düğmeye her basışta farklı bir sıra çıkar.',
    '"Sonucu kopyala" ile karışmış listeyi panoya alın.',
  ],
  sections: [
    { h: 'Satır karıştırma nedir, ne zaman gerekir?', p: [
      'Satır karıştırma, bir listenin öğelerini değiştirmeden yalnızca sıralarını rastgele hâle getirmektir. Hiçbir satır silinmez, eklenmez ya da içeriği değişmez; aynı satırdan iki tane varsa sonuçta da iki tane bulunur. Araç yalnızca "hangi satır kaçıncı sırada duracak" sorusunu şansa bırakır.',
      'Bu işlem gündelik hayatta sıkça gerekir. Öğretmenler sınav sorularının ya da şıkların sırasını değiştirerek farklı kitapçıklar hazırlar, sunum sırasını ya da sözlüye kalkacak öğrencilerin sırasını belirler. Turnuva düzenleyenler eşleşme sırasını, ekip yöneticileri nöbet ya da görev dağıtım sırasını karıştırır. Kelime ezberleyenler listeyi her çalışmada farklı sırayla görmek ister, çünkü sabit sıra ezberi kolaylaştırıp gerçek öğrenmeyi gizleyebilir. Araştırmacılar anket maddelerinin sırasını karıştırarak sıra etkisini azaltır.',
    ] },
    { h: 'Karıştırma nasıl yapılır? Fisher-Yates yöntemi', p: [
      'Araç, bilgisayar biliminde standart kabul edilen <strong>Fisher-Yates</strong> (Knuth karıştırması olarak da bilinir) yöntemini kullanır. Mantığı bir torbadan kura çekmeye benzer: listenin son sırasından başlanır, o sıra ile kendisi dahil öncesindeki sıralardan rastgele biri seçilip yer değiştirilir; sonra bir önceki sıraya geçilir ve ilk satıra kadar devam edilir.',
      'Bu yöntemin önemi, doğru uygulandığında <em>olası her sıralamaya eşit olasılık</em> vermesidir. Üç satırlık bir listenin 3 × 2 × 1 = 6 farklı dizilişi vardır ve her biri altıda bir olasılıkla çıkar. Beş satırda 120, on satırda 3.628.800 farklı diziliş söz konusudur. "Her satıra rastgele bir sayı verip sayıya göre sıralamak" ya da "rastgele karşılaştırmayla sıralamak" gibi sık görülen kestirme yöntemler ise bazı dizilişleri diğerlerinden daha olası hâle getirebilir.',
      'Tohum yazmadığınızda rastgele sayılar tarayıcınızın kriptografik rastgele sayı kaynağından alınır ve aralık dışına düşen değerler atılarak küçük sayılara doğru kayma (modülo yanlılığı) önlenir.',
    ] },
    { h: 'Tohum değeri ne işe yarar?', p: [
      'Tohum (seed), rastgele sayı üretecinin başlangıç noktasıdır. Alana bir sayı ya da kelime yazdığınızda araç, o değerden türetilen sabit bir sayı dizisi kullanır. Sonuç yine karışık görünür, ancak <strong>aynı liste ve aynı tohumla her zaman aynı sıra</strong> elde edilir. Listenin tek bir satırını ya da tohumun tek bir harfini değiştirmek sırayı baştan sona değiştirir.',
      'Bu özellik iki durumda işe yarar. Birincisi tekrarlanabilirliktir: bir sınavın B kitapçığını aylar sonra yeniden üretmeniz gerekirse tohumu not etmeniz yeterlidir. İkincisi şeffaflıktır: sıralamayı yapmadan önce listeyi ve tohumu katılımcılara duyurursanız herkes aynı girdilerle aynı sonucu kendi cihazında doğrulayabilir. Tohumlu üreteç hızlı ve dengelidir, fakat kriptografik güvenlik amacıyla tasarlanmamıştır; tahmin edilememesi gereken durumlarda tohumu boş bırakın.',
    ] },
    { h: 'Örnek', p: [
      'Kutuya alt alta <code>a</code>, <code>b</code>, <code>c</code> yazdığınızı düşünün. "Karıştır" düğmesine bastığınızda sonuç şu altı dizilişten biri olur: a-b-c, a-c-b, b-a-c, b-c-a, c-a-b ya da c-b-a. Dikkat edin, özgün sıra olan a-b-c de bunlardan biridir; yani karıştırma sonucunda listenin hiç değişmemiş görünmesi bir hata değil, altıda bir olasılıkla beklenen bir durumdur.',
      'Sonuçtaki "Yeri değişmeyen satır" değeri, karışımdan sonra tesadüfen eski sırasında kalan satırların sayısını verir. Liste ne kadar uzun olursa olsun bu sayının ortalaması yaklaşık 1\'dir; bu yüzden uzun bir listede bir iki satırın yerinde kalması olağandır. Tek satırlık bir listede ya da bütün satırları aynı olan bir listede sonuç doğal olarak girdiyle aynıdır.',
    ] },
    { h: 'Boş satırlar, yinelenen satırlar ve sınırlar', ul: [
      '<strong>Boş satırlar:</strong> "Çıkar" seçiliyken yalnızca boşluktan oluşan satırlar listeye alınmaz. "Koru" seçilirse aradaki boş satırlar da birer öğe gibi karışır; yalnızca metnin en sonundaki boş satırlar sayılmaz.',
      '<strong>Yinelenen satırlar:</strong> Aynı satırdan birden fazla varsa hepsi korunur. Yinelenenleri önce ayıklamak isterseniz tekrar eden satırları silme aracını kullanabilirsiniz.',
      '<strong>Satır içi boşluklar:</strong> Satırların başındaki ve sonundaki boşluklara dokunulmaz; içerik olduğu gibi kalır.',
      '<strong>Başlık satırı:</strong> Tablodan kopyaladığınız listenin ilk satırı başlıksa onu karıştırmadan önce çıkarın, yoksa başlık da rastgele bir yere düşer.',
      '<strong>Üst sınır:</strong> Tek seferde en fazla 100.000 satır karıştırılabilir.',
    ] },
    { h: 'Kura ve çekilişlerde kullanım', p: [
      'Karışmış listenin ilk satırını "kazanan" saymak teknik olarak adil bir kuradır. Yine de ödüllü çekilişler ve resmî kuralar için ayrı yasal kurallar ve izin süreçleri bulunabilir; bu araç böyle bir sürecin yerini tutmaz. Arkadaş arasında sıra belirlemek, sınıfta grup oluşturmak ya da görev dağıtmak gibi gündelik işler için rahatlıkla kullanabilirsiniz.',
    ] },
  ],
  faq: [
    ['Karıştırma gerçekten adil mi?', 'Evet. Araç Fisher-Yates yöntemini yansız rastgele sayılarla uygular; listenin olası bütün dizilişleri eşit olasılıkla çıkar. Hiçbir satırın başa ya da sona düşme şansı diğerlerinden fazla değildir.'],
    ['Karıştırdıktan sonra bazı satırlar neden aynı yerde kaldı?', 'Bu rastgeleliğin doğal sonucudur. Rastgele bir dizilişte ortalama bir satır kendi eski sırasına denk gelir. Hiçbir satırın yerinde kalmamasını istiyorsanız düğmeye yeniden basıp "Yeri değişmeyen satır" değeri 0 olan bir sonuç alabilirsiniz.'],
    ['Aynı sırayı yeniden elde edebilir miyim?', 'Tohum alanına bir değer yazdıysanız evet: aynı liste ve aynı tohum her cihazda aynı sırayı verir. Tohum boşken üretilen sıra kaydedilmez ve tekrar üretilemez; saklamak istiyorsanız sonucu kopyalayın.'],
    ['Tohum olarak ne yazabilirim?', 'Herhangi bir sayı, kelime ya da ifade yazabilirsiniz; örneğin tarih, sınav adı ya da rastgele bir sözcük. Büyük-küçük harf farkı önemlidir, "Kura" ile "kura" farklı sıralar üretir. Baştaki ve sondaki boşluklar dikkate alınmaz.'],
    ['Satırlarım silinir ya da değişir mi?', 'Hayır. Yalnızca sıra değişir. "Çıkar" seçeneği açıkken boş satırlar listeye alınmaz; bunun dışında satır sayısı ve içerik aynı kalır. "Karıştırılan satır" değeriyle sayıyı denetleyebilirsiniz.'],
    ['Virgülle ayrılmış bir listeyi karıştırabilir miyim?', 'Araç satır satır çalışır. Öğeleriniz virgülle ayrılmışsa önce her öğeyi ayrı satıra alın, karıştırın, ardından isterseniz satırları yeniden virgülle birleştirin. Bunun için ilgili araçlar bölümündeki birleştirme ve dönüştürme araçları işinizi görür.'],
    ['Kelimeleri ya da harfleri de karıştırır mı?', 'Hayır, bu araç satırların sırasını değiştirir; satırın içindeki kelimelere ve harflere dokunmaz. Bir kelimenin harflerini karıştırmak için ayrı bir araç bulunur.'],
    ['Listem bir yere yükleniyor mu?', 'Hayır. Karıştırma tamamen tarayıcınızda yapılır; isim listeleri dahil yazdığınız hiçbir şey sunucuya gönderilmez ve saklanmaz. Sayfa açıldıktan sonra internet olmadan da çalışır.'],
  ],
  related: ['cekilis', 'rastgele-sayi', 'alfabetik-sirala', 'satirlari-ters-sirala', 'tekrar-eden-satirlari-sil', 'kelime-karistir'],
};
