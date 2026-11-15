export default {
  slug: 'anagram-kontrol',
  title: 'Anagram Kontrolü',
  h1Tail: 'iki kelime aynı harflerden mi oluşuyor?',
  pageTitle: 'Anagram Kontrolü – İki Kelime ya da Cümle Anagram mı?',
  description: 'İki kelimenin ya da cümlenin anagram olup olmadığını Türkçe harf kurallarıyla denetleyin; sıralı harf dizilimini ve fazla ya da eksik harfleri görün.',
  card: 'İki kelime ya da cümle aynı harflerden mi oluşuyor? Türkçe ı-i ayrımıyla anagram denetimi ve harf farkı.',
  category: 'metin',
  keywords: ['anagram kontrol', 'anagram bulma', 'anagram nedir', 'iki kelime anagram mı', 'anagram örnekleri', 'harf karşılaştırma', 'kelime oyunu anagram'],
  lead: `İki kelimeyi ya da iki cümleyi yazın; araç ikisinin <strong>tam olarak aynı harflerden</strong> oluşup oluşmadığını söylesin. Karşılaştırma Türkçe büyük-küçük harf kurallarına göre yapılır, yani <strong>ı</strong> ile <strong>i</strong> ayrı harfler sayılır.`,
  button: 'Kontrol et',
  inputs: [
    { id: 'birinci', label: 'Birinci kelime ya da cümle', type: 'text', placeholder: 'Örn. kalem', wide: true },
    { id: 'ikinci', label: 'İkinci kelime ya da cümle', type: 'text', placeholder: 'Örn. kelam', wide: true },
    { id: 'kural', label: 'Karşılaştırma kuralı', type: 'select', options: [['harf', 'Yalnızca harf ve rakamlar (boşluk, noktalama yok sayılır)'], ['kesin', 'Her karakter sayılır (boşluk ve noktalama dahil)']] },
  ],
  compute(v, h) {
    const hazirla = (s) => {
      let t = String(s ?? '').normalize('NFC').toLocaleLowerCase('tr');
      const ch = Array.from(t);
      return v.kural === 'kesin' ? ch : ch.filter((c) => /[\p{L}\p{N}]/u.test(c));
    };
    if (String(v.birinci ?? '').trim() === '') h.err('"Birinci kelime ya da cümle" alanını doldurun.');
    if (String(v.ikinci ?? '').trim() === '') h.err('"İkinci kelime ya da cümle" alanını doldurun.');
    const a = hazirla(v.birinci), b = hazirla(v.ikinci);
    if (!a.length || !b.length) h.err('Karşılaştırılacak harf bulunamadı. En az bir harf ya da rakam içeren metin yazın.');
    const say = (arr) => { const m = new Map(); for (const c of arr) m.set(c, (m.get(c) || 0) + 1); return m; };
    const ma = say(a), mb = say(b);
    const sirala = (arr) => [...arr].sort((x, y) => x.localeCompare(y, 'tr')).join('');
    const fazla = (m1, m2) => {
      const o = [];
      for (const [c, n] of m1) { const d = n - (m2.get(c) || 0); if (d > 0) o.push(c === ' ' ? (d > 1 ? `boşluk ×${d}` : 'boşluk') : (d > 1 ? `${c} ×${d}` : c)); }
      return o.sort((x, y) => x.localeCompare(y, 'tr'));
    };
    const fa = fazla(ma, mb), fb = fazla(mb, ma);
    const anagram = fa.length === 0 && fb.length === 0;
    const ayni = anagram && a.join('') === b.join('');
    let ortak = 0;
    for (const [c, n] of ma) ortak += Math.min(n, mb.get(c) || 0);
    const rows = [
      ['Sonuç', anagram ? (ayni ? 'Aynı metin (harf sırası da aynı)' : 'Anagram') : 'Anagram değil'],
      ['Birinci metnin harf sayısı', String(a.length)],
      ['İkinci metnin harf sayısı', String(b.length)],
      ['Ortak harf sayısı', String(ortak)],
      ['Birincinin sıralı harfleri', sirala(a)],
      ['İkincinin sıralı harfleri', sirala(b)],
    ];
    if (!anagram) {
      rows.push(['Yalnızca birincide olan', fa.length ? fa.join(', ') : 'yok']);
      rows.push(['Yalnızca ikincide olan', fb.length ? fb.join(', ') : 'yok']);
    }
    return {
      rows,
      note: ayni ? 'İki metin harf sırasıyla birlikte aynı; anagram sayılabilmesi için harflerin yeri değişmiş olmalıdır.'
        : 'Büyük-küçük harf farkı yok sayılır; ı ile i, o ile ö gibi harfler ayrı harf kabul edilir.',
    };
  },
  cases: [
    { in: { birinci: 'kalem', ikinci: 'kelam' }, out: { 'Sonuç': 'Anagram', 'Birinci metnin harf sayısı': '5', 'Birincinin sıralı harfleri': 'aeklm', 'İkincinin sıralı harfleri': 'aeklm' } },
    { in: { birinci: 'elma', ikinci: 'armut' }, out: { 'Sonuç': 'Anagram değil', 'Ortak harf sayısı': '2', 'Yalnızca birincide olan': 'e, l', 'Yalnızca ikincide olan': 'r, t, u' } },
    { in: { birinci: 'IRAK', ikinci: 'kira' }, out: { 'Sonuç': 'Anagram değil', 'Yalnızca birincide olan': 'ı', 'Yalnızca ikincide olan': 'i' } },
    { in: { birinci: 'Dormitory', ikinci: 'dirty room!' }, out: { 'Sonuç': 'Anagram', 'İkinci metnin harf sayısı': '9' } },
    { in: { birinci: 'Dormitory', ikinci: 'dirty room', kural: 'kesin' }, out: { 'Sonuç': 'Anagram değil', 'Yalnızca ikincide olan': 'boşluk' } },
    { in: { birinci: 'Masa', ikinci: 'masa' }, out: { 'Sonuç': 'Aynı metin (harf sırası da aynı)' } },
    { in: { birinci: 'armut', ikinci: 'Murat' }, out: { 'Sonuç': 'Anagram', 'Ortak harf sayısı': '5' } },
    { in: { birinci: 'kalem', ikinci: '' }, error: true },
    { in: { birinci: '...', ikinci: 'kalem' }, error: true },
  ],
  howto: [
    `Karşılaştırmak istediğiniz ilk kelimeyi ya da cümleyi "Birinci kelime ya da cümle" alanına yazın.`,
    `İkinci alana anagramı olduğunu düşündüğünüz kelimeyi ya da cümleyi girin.`,
    `Boşluk ve noktalama işaretleri önemsizse "Yalnızca harf ve rakamlar" kuralını bırakın; her karakterin birebir tutmasını istiyorsanız "Her karakter sayılır" seçeneğine geçin.`,
    `"Kontrol et" düğmesine basın. İlk satırda sonucu, altında iki metnin harf sayılarını ve alfabetik sıraya dizilmiş harflerini görürsünüz.`,
    `Sonuç "Anagram değil" ise son iki satıra bakın: hangi harfin hangi metinde fazla olduğu orada listelenir.`,
  ],
  sections: [
    { h: 'Anagram nedir?', p: [
      `Anagram, bir kelimenin ya da cümlenin harflerinin yerleri değiştirilerek elde edilen başka bir kelime ya da cümledir. Kural basittir: hiçbir harf eklenmez, hiçbir harf atılmaz, her harf tam olarak bir kez kullanılır. "Kalem" kelimesinin harfleri yeniden dizildiğinde "kelam" elde edilir; ikisi de bir a, bir e, bir k, bir l ve bir m içerir. Bu yüzden kalem ile kelam birbirinin anagramıdır.`,
      `Anagramlar bulmaca sayfalarında, kelime oyunlarında, takma ad üretiminde ve edebiyatta sıkça kullanılır. Yazarların adlarındaki harfleri karıştırarak mahlas türettiği, roman kahramanlarına gizli anlamlı adlar verildiği bilinen bir oyundur. Okul çağındaki çocuklar için de harf bilgisini ve kelime dağarcığını geliştiren eğlenceli bir alıştırmadır.`,
    ] },
    { h: 'Kontrol nasıl yapılıyor?', p: [
      `Araç iki metni önce aynı kalıba sokar: bütün harfler Türkçe kurallara göre küçültülür, seçtiğiniz kurala göre boşluklar ve noktalama işaretleri ayıklanır. Ardından her harfin kaç kez geçtiği sayılır ve iki sayım karşılaştırılır. Bütün harflerin adedi iki tarafta da aynıysa sonuç "Anagram"dır. Tek bir harfin adedi bile farklıysa sonuç "Anagram değil" olur.`,
      `Elle kontrol etmenin klasik yolu da aynı mantığa dayanır: iki kelimenin harflerini alfabetik sıraya dizersiniz, ortaya çıkan diziler aynıysa kelimeler anagramdır. Araç bu dizileri "sıralı harfler" satırlarında gösterir. Kalem için de kelam için de dizi <code>aeklm</code> çıkar. Böylece sonucu kendi gözünüzle de doğrulayabilirsiniz.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Armut ve Murat:</strong> İkisi de beş harflidir. Armut: a, r, m, u, t. Murat: m, u, r, a, t. Harfler ve adetleri birebir aynı olduğundan sonuç "Anagram", ortak harf sayısı 5 çıkar. Baştaki büyük M harfi sonucu etkilemez.`,
      `<strong>Elma ve armut:</strong> Elmada e, l, m, a; armutta a, r, m, u, t vardır. Ortak harfler yalnızca a ve m olduğundan ortak harf sayısı 2 görünür. Araç birincide fazla olanları "e, l", ikincide fazla olanları "r, t, u" olarak listeler ve sonucu "Anagram değil" verir.`,
      `<strong>Cümle anagramı:</strong> İngilizcedeki ünlü örnek "Dormitory" ile "dirty room" ikilisidir. Varsayılan kuralda boşluk sayılmadığı için ikisi de dokuz harfe iner ve anagram çıkar. Kuralı "Her karakter sayılır" yaparsanız ikinci metindeki boşluk fazlalık sayılır ve sonuç olumsuza döner.`,
    ] },
    { h: 'Türkçede ı ve i ayrımı neden önemli?', p: [
      `Türkçede noktalı i ile noktasız ı iki ayrı harftir ve büyük halleri de farklıdır: i harfinin büyüğü İ, ı harfinin büyüğü I olarak yazılır. İngilizce kurallarıyla çalışan birçok araç büyük I harfini küçültürken noktalı i yapar ve Türkçe kelimelerde yanlış sonuç verir. Bu araç küçültme işlemini Türkçe kurallarıyla yapar.`,
      `Örneğin "IRAK" ile "kira" ilk bakışta aynı harflerden oluşuyor gibi görünür. Oysa IRAK küçültüldüğünde "ırak" olur; içinde noktasız ı vardır. Kirada ise noktalı i bulunur. Araç bu ikiliyi "Anagram değil" olarak işaretler ve farkı açıkça gösterir: birincide ı, ikincide i fazladır. Aynı ayrım o-ö, u-ü, c-ç, s-ş ve g-ğ çiftleri için de geçerlidir; şapkalı harfler de (â, î, û) kendi başlarına ayrı karakter sayılır.`,
    ] },
    { h: 'Bilinen Türkçe anagram örnekleri', p: [
      `Aşağıdaki kelime gruplarını araca yazarak deneyebilirsiniz. Bir kelimenin anagramı sözlükte yer alan anlamlı bir kelime olmak zorunda değildir; araç yalnızca harflerin tutup tutmadığına bakar, kelimenin anlamlı olup olmadığını denetlemez.`,
    ], ul: [
      `<strong>kalem</strong> – kelam – kemal`,
      `<strong>armut</strong> – murat`,
      `<strong>kitap</strong> – katip`,
      `<strong>elma</strong> – alem`,
      `<strong>masal</strong> – salam`,
      `<strong>eski</strong> – eksi`,
      `<strong>kasa</strong> – saka`,
      `<strong>kaya</strong> – yaka`,
      `<strong>para</strong> – arpa`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      `En sık yapılan hata, harf sayısı aynı olan iki kelimenin anagram olduğunu varsaymaktır. "Masa" ile "kasa" dörder harflidir ama birinde m, diğerinde k vardır. Bir başka hata, tekrar eden harfleri gözden kaçırmaktır: "ana" ile "anna" aynı harf türlerini içerir, fakat n harfinin adedi farklı olduğu için anagram değildir.`,
      `Araç bir kelimenin olası bütün anagramlarını üretmez ve sözlük taraması yapmaz; yalnızca verdiğiniz iki metni karşılaştırır. İki metin harf sırasıyla birlikte aynıysa sonuç "Aynı metin" olarak bildirilir, çünkü anagramdan söz edebilmek için harflerin yer değiştirmiş olması gerekir. Rakamlar da harf gibi sayılır; "a1b" ile "b1a" anagram kabul edilir.`,
    ] },
  ],
  faq: [
    [`Anagram ne demek?`, `Bir kelimenin ya da cümlenin harflerinin sırası değiştirilerek oluşturulan yeni kelime ya da cümleye anagram denir. Harf eklenmez ve çıkarılmaz; örneğin kalem ile kelam anagramdır.`],
    [`Büyük ve küçük harf farkı sonucu etkiler mi?`, `Hayır. Karşılaştırmadan önce bütün harfler Türkçe kurallarıyla küçültülür. "Murat" ile "armut" baş harf büyük yazılsa da anagram çıkar.`],
    [`Boşluklar ve noktalama işaretleri sayılıyor mu?`, `Varsayılan kuralda sayılmaz; yalnızca harfler ve rakamlar karşılaştırılır. Cümle anagramlarında genellikle bu istenir. Birebir karakter eşleşmesi için "Her karakter sayılır" kuralını seçebilirsiniz.`],
    [`I ve i harfleri neden farklı sayılıyor?`, `Türkçede noktasız ı ile noktalı i ayrı harflerdir. Araç büyük I harfini ı, büyük İ harfini i olarak küçültür. Bu yüzden IRAK ile kira anagram sayılmaz.`],
    [`İngilizce kelimeleri de kontrol edebilir miyim?`, `Evet, küçük harflerle yazılmış her dilde çalışır. Yalnız İngilizce bir kelimeyi büyük harflerle ve içinde I olacak şekilde yazarsanız bu harf Türkçe kuralla ı kabul edilir. Böyle durumlarda kelimeyi küçük harfle yazın.`],
    [`Palindrom ile anagram aynı şey mi?`, `Hayır. Palindrom, tersten okunduğunda da aynı kalan kelime ya da cümledir. Anagram ise iki farklı metnin aynı harflerden oluşmasıdır. Bir kelimenin tersi her zaman kendisinin anagramıdır ama her anagram bir ters çevirme değildir.`],
    [`Araç bana bir kelimenin anagramlarını bulur mu?`, `Hayır, anagram üretmez. İki metni karşılaştırır, sıralı harf dizilimini ve farklı harfleri gösterir. Kendi bulduğunuz bir anagramın doğru olup olmadığını sınamak için kullanılır.`],
    [`Yazdığım kelimeler kaydediliyor mu?`, `Hayır. Karşılaştırma tarayıcınızın içinde yapılır; yazdıklarınız sunucuya gönderilmez ve saklanmaz.`],
  ],
  related: ['palindrom-kontrol', 'harf-frekansi', 'kelime-karistir', 'metni-ters-cevir', 'karakter-sayaci'],
};
