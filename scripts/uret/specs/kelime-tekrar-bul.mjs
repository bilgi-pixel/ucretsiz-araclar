export default {
  slug: 'kelime-tekrar-bul',
  title: 'Art Arda Tekrarlanan Kelimeleri Bulma',
  h1Tail: '"ve ve", "bir bir" gibi çift yazımları yakalayın',
  pageTitle: 'Art Arda Tekrarlanan Kelimeleri Bulma – Çift Yazılan Kelime Denetimi',
  description: 'Metinde yanlışlıkla iki kez art arda yazılmış kelimeleri ("ve ve", "için için") bulun, satır numarasıyla listeleyin ya da tek tıkla teke indirin.',
  card: 'Metinde art arda iki kez yazılmış kelimeleri bulun, satır numarasıyla listeleyin ya da otomatik düzeltin.',
  category: 'metin',
  keywords: ['tekrarlanan kelimeleri bulma', 'art arda aynı kelime', 'çift kelime bulma', 'yinelenen kelime denetimi', 'kelime tekrarı düzeltme', 'metin düzeltme aracı', 'çift yazılan kelime'],
  lead: 'Yazım denetiminden kolayca kaçan bir hata türü vardır: aynı kelimenin yan yana iki kez yazılması. Metninizi yapıştırın; araç "<strong>ve ve</strong>", "<strong>bir bir</strong>" gibi art arda tekrarları satır numarasıyla göstersin ya da fazlalıkları silerek düzeltilmiş metni versin.',
  button: 'Tekrarları bul',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Denetlemek istediğiniz metni buraya yapıştırın', wide: true },
    { id: 'islem', label: 'İşlem', type: 'select', options: [['bul', 'Yalnızca bul ve listele'], ['duzelt', 'Tekrarları teke indir']] },
    { id: 'harf', label: 'Büyük/küçük harf', type: 'select', options: [['yoksay', 'Ayırt etme ("Bu bu" tekrar sayılır)'], ['ayirt', 'Ayırt et']] },
  ],
  compute(v, h) {
    const metin = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (metin.trim() === '') h.err('Tekrarları aramak için "Metin" alanına bir metin yapıştırın.');
    const re = /[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu;
    const kelimeler = [];
    let m;
    while ((m = re.exec(metin))) kelimeler.push({ k: m[0], b: m.index, s: m.index + m[0].length });
    if (!kelimeler.length) h.err('Metinde kelime bulunamadı. Harf içeren bir metin yapıştırın.');
    const anahtar = (k) => (v.harf === 'ayirt' ? k : k.toLocaleLowerCase('tr-TR'));
    const bulgular = [], sayac = new Map(), silinecek = [];
    for (let i = 1; i < kelimeler.length; i++) {
      const a = kelimeler[i - 1], b = kelimeler[i];
      if (anahtar(a.k) !== anahtar(b.k)) continue;
      const ara = metin.slice(a.s, b.b);
      if (ara === '' || /\S/.test(ara)) continue; // araya noktalama girmişse tekrar sayılmaz
      const satir = metin.slice(0, b.b).split('\n').length;
      bulgular.push(`Satır ${satir}: ${a.k} ${b.k}`);
      const ad = anahtar(a.k);
      sayac.set(ad, (sayac.get(ad) || 0) + 1);
      silinecek.push([a.s, b.s]);
    }
    const rows = [
      ['Art arda tekrar', String(bulgular.length)],
      ['Tekrarlanan kelimeler', sayac.size ? [...sayac].map(([k, n]) => `${k} (${n})`).join(', ') : '—'],
      ['Toplam kelime', h.fmt(kelimeler.length, 0)],
    ];
    let text;
    if (v.islem === 'duzelt') {
      let s = '', konum = 0;
      for (const [x, y] of silinecek) { s += metin.slice(konum, x); konum = y; }
      text = s + metin.slice(konum);
    } else if (bulgular.length) text = bulgular.join('\n');
    return {
      rows,
      text,
      note: bulgular.length
        ? 'Türkçedeki ikilemeler (yavaş yavaş, koşa koşa) bilinçli tekrardır; listeyi gözden geçirip yalnızca hatalı olanları düzeltin.'
        : 'Art arda tekrarlanan kelime bulunamadı.',
    };
  },
  cases: [
    { in: { metin: 'Toplantı yarın saat saat 10\'da ve ve salonda yapılacak.', islem: 'bul' }, out: { 'Art arda tekrar': '2', 'Tekrarlanan kelimeler': 'saat (1), ve (1)', 'Toplam kelime': '9' }, text: 'Satır 1: saat saat\nSatır 1: ve ve' },
    { in: { metin: 'Toplantı yarın saat saat 10\'da ve ve salonda yapılacak.', islem: 'duzelt' }, out: { 'Art arda tekrar': '2' }, text: 'Toplantı yarın saat 10\'da ve salonda yapılacak.' },
    { in: { metin: 'Bu bu bir denemedir.', harf: 'yoksay' }, out: { 'Art arda tekrar': '1', 'Tekrarlanan kelimeler': 'bu (1)' } },
    { in: { metin: 'Bu bu bir denemedir.', harf: 'ayirt' }, out: { 'Art arda tekrar': '0', 'Tekrarlanan kelimeler': '—' } },
    { in: { metin: 'Dün aldığım kitabı\nkitabı bugün okudum.' }, out: { 'Art arda tekrar': '1' }, text: 'Satır 2: kitabı kitabı' },
    { in: { metin: 'çok çok çok güzel', islem: 'duzelt' }, out: { 'Art arda tekrar': '2', 'Tekrarlanan kelimeler': 'çok (2)' }, text: 'çok güzel' },
    { in: { metin: 'Evet, evet geldim. Işık ışık parlıyordu.' }, out: { 'Art arda tekrar': '1', 'Tekrarlanan kelimeler': 'ışık (1)' } },
    { in: { metin: '' }, error: true },
    { in: { metin: '... !!! ???' }, error: true },
  ],
  howto: [
    'Denetlemek istediğiniz yazıyı "Metin" kutusuna yapıştırın; e-posta, ödev, makale ya da ürün açıklaması olabilir.',
    'Önce "Yalnızca bul ve listele" seçeneğiyle çalıştırın. Sonuçta her tekrarın hangi satırda olduğu görünür.',
    'Listeyi gözden geçirin. Bulunanların hepsi gerçekten hataysa işlemi "Tekrarları teke indir" yapıp yeniden çalıştırın; düzeltilmiş metin sonuç kutusuna gelir.',
    'Cümle başındaki büyük harfli kelime ile ardından gelen küçük harfli eşinin tekrar sayılmasını istemiyorsanız "Büyük/küçük harf" alanından "Ayırt et" seçin.',
  ],
  sections: [
    { h: 'Art arda kelime tekrarı neden gözden kaçar?', p: [
      'Bir cümleyi düzeltirken yarısını silip yeniden yazdığınızda, bir paragrafı kesip başka yere yapıştırdığınızda ya da dikte ile yazdığınızda aynı kelime yan yana iki kez kalabilir: "Raporu yarın <em>size size</em> ileteceğim." Bu hata özellikle satır sonlarında sinsidir; kelimenin biri satırın sonunda, diğeri alt satırın başında durduğunda göz ikisini ayrı okumaz, beyin cümleyi kendiliğinden düzeltir.',
      'Klasik yazım denetimi de çoğu zaman işe yaramaz, çünkü kelimelerin ikisi de doğru yazılmıştır. Bu araç yazıma değil <strong>komşuluğa</strong> bakar: bir kelime, kendisinden hemen önce gelen kelimeyle aynıysa ve aralarında yalnızca boşluk ya da satır sonu varsa bunu tekrar olarak işaretler.',
    ] },
    { h: 'Neler tekrar sayılır, neler sayılmaz?', ul: [
      '<strong>Sayılır:</strong> aralarında yalnızca boşluk, sekme ya da satır sonu bulunan aynı iki kelime: "ve ve", "için\\niçin".',
      '<strong>Sayılmaz:</strong> araya virgül, nokta ya da başka bir işaret girmiş tekrarlar: "Evet, evet geliyorum." ya da "Bitti. Bitti artık." gibi kullanımlar bilinçli kabul edilir.',
      '<strong>Sayılmaz:</strong> ekleri farklı kelimeler: "evden eve", "gün günden" tekrar değildir, çünkü kelimeler harfi harfine aynı değildir.',
      '<strong>Üçlü tekrarlar:</strong> "çok çok çok" iki ayrı tekrar olarak sayılır ve düzeltmede tek "çok" kalır.',
      '<strong>Kesme işaretli kelimeler:</strong> "Ankara\'ya" tek kelime olarak ele alınır; "Ankara\'ya Ankara\'ya" tekrar sayılır, "Ankara Ankara\'ya" sayılmaz.',
    ] },
    { h: 'Türkçede ikilemeler: her tekrar hata değildir', p: [
      'Türkçe, anlamı pekiştirmek için kelimeyi bilerek yineleyen zengin bir yapıya sahiptir. "Yavaş yavaş yürüdü", "koşa koşa geldi", "kapı kapı dolaştı", "bir bir saydı", "güzel güzel oynayın" gibi <strong>ikilemeler</strong> dil bilgisi açısından doğrudur ve silinmemelidir. Araç anlamı bilemeyeceği için bunları da listeler.',
      'Bu yüzden varsayılan işlem düzeltme değil, listelemedir. Önce bulguları okuyun. Listede yalnızca "ve ve", "bir bir" (yanlışlıkla yazılmışsa), "ile ile", "bu bu" gibi gerçek hatalar varsa otomatik düzeltmeyi güvenle kullanabilirsiniz. İkilemeler de varsa hatalı olanları satır numarasından yararlanarak asıl belgenizde elle düzeltmek daha doğrudur.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Şu cümleyi ele alalım: "Toplantı yarın saat saat 10\'da ve ve salonda yapılacak." Cümlede dokuz kelime vardır. Araç kelimeleri sırayla karşılaştırır: "yarın" ile "saat" farklı, "saat" ile "saat" aynı ve aralarında yalnızca boşluk var; bu birinci tekrardır. "ve" ile "ve" ikinci tekrardır. Sonuçta <strong>2 tekrar</strong> bulunur ve liste "Satır 1: saat saat" ile "Satır 1: ve ve" satırlarını içerir.',
      'İşlem "Tekrarları teke indir" olarak seçildiğinde her çiftin ikinci kelimesi, önündeki boşlukla birlikte silinir ve metin şu hâle gelir: "Toplantı yarın saat 10\'da ve salonda yapılacak." Geri kalan boşluklara, noktalamaya ve satır yapısına dokunulmaz.',
    ] },
    { h: 'Büyük/küçük harf ayarı ne zaman değiştirilir?', p: [
      'Varsayılan ayarda "Bu bu" da tekrar sayılır, çünkü hataların bir bölümü cümle başında oluşur: yazar cümleyi büyük harfle başlatır, sonra aynı kelimeyi küçük harfle bir kez daha yazar. Karşılaştırma Türkçe harf kurallarına göre yapılır; "Işık ışık" ve "İlk ilk" doğru eşleşir, "Isı" ile "İsi" ise karıştırılmaz.',
      'Özel adın cins adla yan yana geldiği metinlerde bu ayar yanlış alarm üretebilir: "Deniz deniz kenarında büyüdü" cümlesinde ilk kelime bir kişi adıdır. Böyle metinlerde "Ayırt et" seçeneği daha temiz bir liste verir.',
    ] },
    { h: 'Kimler kullanır?', p: [
      'Öğrenciler ödev ve tezlerini teslim etmeden önce, editörler ve içerik yazarları yayın öncesi son okumada, çevirmenler çeviri belleğinden gelen parçaları birleştirdikten sonra, müşteri temsilcileri hazır yanıt şablonlarını güncellerken bu denetimi yapar. Sesle yazdırma kullananlar için de yararlıdır; tanıma yazılımları duraksamalarda son kelimeyi iki kez yazabilir. Araç yalnızca art arda gelen tekrarları arar; bir kelimenin metnin tamamında kaç kez geçtiğini görmek isterseniz kelime sıklığı aracını kullanın.',
    ] },
  ],
  faq: [
    ['Bu araç bir kelimenin metinde kaç kez geçtiğini sayar mı?', 'Hayır. Yalnızca yan yana gelen aynı kelimeleri arar. Metnin genelindeki kullanım sayıları için kelime sıklığı aracı uygundur.'],
    ['"Yavaş yavaş" gibi ikilemeler de siliniyor mu?', '"Yalnızca bul ve listele" seçeneğinde hiçbir şey silinmez, yalnızca gösterilir. "Tekrarları teke indir" seçeneği ise bulunan bütün tekrarları siler; metninizde ikileme varsa önce listeyi inceleyin.'],
    ['Satır sonunda bölünen tekrarları yakalar mı?', 'Evet. Bir satırın son kelimesi ile sonraki satırın ilk kelimesi aynıysa bu da tekrar sayılır ve ikinci kelimenin bulunduğu satır numarasıyla bildirilir.'],
    ['Araya virgül girmiş tekrarlar neden bulunmuyor?', '"Hayır, hayır" ya da "Tamam. Tamam." gibi kullanımlar çoğunlukla vurgu için bilerek yazılır. Yanlış alarmı azaltmak için aralarında noktalama bulunan kelimeler tekrar sayılmaz.'],
    ['Düzeltme metnin biçimini bozar mı?', 'Hayır. Yalnızca tekrarın ikinci kelimesi ile önündeki boşluk ya da satır sonu silinir. Paragraflar, diğer boşluklar ve noktalama işaretleri olduğu gibi kalır.'],
    ['Sayılar da denetleniyor mu?', 'Evet. Rakamla yazılmış "5 5" gibi art arda aynı sayılar da tekrar olarak listelenir. Tablo ya da sayı dizisi içeren metinlerde bu bulguları dikkate almayabilirsiniz.'],
    ['Ne kadar uzun metin yapıştırabilirim?', 'Belirli bir sınır yoktur; işlem tarayıcınızda yapıldığı için onlarca sayfalık metinler de birkaç saniyede taranır. Çok uzun belgelerde bölüm bölüm çalışmak listeyi izlemeyi kolaylaştırır.'],
    ['Metnim bir yere yükleniyor mu?', 'Hayır. Tarama tamamen tarayıcınızda gerçekleşir; metniniz sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['kelime-frekansi', 'tekrar-eden-satirlari-sil', 'bosluk-temizle', 'kelime-sayaci', 'bul-ve-degistir'],
};
