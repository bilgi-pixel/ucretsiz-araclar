export default {
  slug: 'ilk-harf-buyut',
  title: 'Her Kelimenin İlk Harfini Büyütme',
  h1Tail: 'Baş Harfler Büyük yazım',
  pageTitle: 'Her Kelimenin İlk Harfini Büyütme – Baş Harfleri Büyük Yapma',
  description: 'Metindeki her kelimenin ilk harfini büyük yapın. Türkçe i/İ ve ı/I kuralına uyar; bağlaçları küçük bırakma ve diğer harfleri koruma seçenekleri vardır.',
  card: 'Her kelimenin baş harfini büyütün; Türkçe İ ve I doğru çevrilir, isterseniz "ve, ile" gibi bağlaçlar küçük kalır.',
  category: 'metin',
  keywords: ['her kelimenin ilk harfini büyütme', 'baş harfleri büyük yapma', 'ilk harf büyük', 'başlık düzeni', 'title case türkçe', 'kelime baş harfi büyütme', 'büyük harfle yazılmış metni düzeltme'],
  lead: 'Tamamı büyük ya da tamamı küçük harfle yazılmış bir metni <strong>Her Kelimenin İlk Harfi Büyük</strong> olacak biçimde düzeltin. Araç Türkçe harf kuralını bilir: <code>istanbul</code> yazdığınızda <code>İstanbul</code>, <code>ığdır</code> yazdığınızda <code>Iğdır</code> elde edersiniz.',
  button: 'İlk Harfleri Büyüt',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Örn. ahmet yılmaz, istiklal caddesi no 5', wide: true },
    { id: 'dil', label: 'Harf kuralı', type: 'select', options: [['tr', 'Türkçe (i → İ, ı → I)'], ['en', 'İngilizce (i → I)']] },
    { id: 'kalan', label: 'Kelimenin diğer harfleri', type: 'select', options: [['kucult', 'Küçük harfe çevir'], ['koru', 'Olduğu gibi bırak']], hint: 'TBMM, pH gibi yazımları korumak için "Olduğu gibi bırak" seçin.' },
    { id: 'baglac', label: 'Bağlaç ve edatlar', type: 'select', options: [['hayir', 'Onlar da büyük harfle başlasın'], ['evet', 'Küçük kalsın (ve, ile, veya, ya, da, de, ki, için…)']] },
  ],
  compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('İlk harflerini büyütmek için "Metin" alanına bir metin yazın.');
    const tr = v.dil !== 'en';
    const kucuk = (x) => (tr ? x.replace(/I/g, 'ı').replace(/İ/g, 'i') : x.replace(/İ/g, 'i')).toLowerCase();
    const buyuk = (x) => (tr ? x.replace(/i/g, 'İ').replace(/ı/g, 'I') : x.replace(/ı/g, 'I')).toUpperCase();
    const KUCUK_KALAN = tr
      ? new Set(['ve', 'ile', 'veya', 'ya', 'da', 'de', 'ki', 'için', 'gibi', 'ama', 'fakat', 'ancak', 'mi', 'mı', 'mu', 'mü', 'ise', 'yahut', 'veyahut', 'hem', 'ne'])
      : new Set(['a', 'an', 'the', 'and', 'or', 'but', 'nor', 'for', 'of', 'in', 'on', 'at', 'to', 'by', 'as', 'vs']);
    let kelime = 0, degisen = 0;
    const cikti = s.split('\n').map((satir) => {
      let ilk = true;
      return satir.split(/(\s+)/).map((parca) => {
        if (parca === '' || /^\s+$/.test(parca)) return parca;
        if (!/\p{L}/u.test(parca)) return parca; // yalnızca rakam ya da noktalama
        kelime++;
        const taban = v.kalan === 'koru' ? parca : kucuk(parca);
        const yalin = kucuk(parca).replace(/[^\p{L}]/gu, '');
        let yeni;
        if (v.baglac === 'evet' && !ilk && KUCUK_KALAN.has(yalin)) yeni = kucuk(parca);
        else {
          // İlk harfi ve kısa çizgiden sonraki harfi büyüt; kesme işaretinden sonraki eke dokunma
          let bekle = true;
          yeni = '';
          for (const c of Array.from(taban)) {
            if (/\p{L}/u.test(c)) { yeni += bekle ? buyuk(c) : c; bekle = false; }
            else { yeni += c; if (c === '-' || c === '/') bekle = true; else if (/\p{N}/u.test(c) || c === '\'' || c === '’') bekle = false; }
          }
        }
        ilk = false;
        if (yeni !== parca) degisen++;
        return yeni;
      }).join('');
    });
    return {
      rows: [
        ['Kelime sayısı', h.fmt(kelime, 0)],
        ['Değişen kelime', h.fmt(degisen, 0)],
        ['Harf kuralı', tr ? 'Türkçe' : 'İngilizce'],
      ],
      text: cikti.join('\n'),
      note: v.baglac === 'evet' ? 'Satırın ilk kelimesi bağlaç olsa bile büyük harfle başlatıldı; aradaki bağlaç ve edatlar küçük bırakıldı.' : 'Kesme işaretinden sonraki ekler küçük bırakıldı; kısa çizgiyle birleşen kelimelerin her parçası büyük harfle başlatıldı.',
    };
  },
  cases: [
    { in: { metin: 'istanbul ığdır şişli', dil: 'tr' }, out: { 'Kelime sayısı': '3', 'Değişen kelime': '3' }, text: 'İstanbul Iğdır Şişli' },
    { in: { metin: 'İSTANBUL IĞDIR ÇANKIRI', dil: 'tr', kalan: 'kucult' }, text: 'İstanbul Iğdır Çankırı' },
    { in: { metin: 'istanbul is big', dil: 'en' }, out: { 'Harf kuralı': 'İngilizce' }, text: 'Istanbul Is Big' },
    { in: { metin: 'savaş ve barış', baglac: 'evet' }, out: { 'Değişen kelime': '2' }, text: 'Savaş ve Barış' },
    { in: { metin: 've perde açılır', baglac: 'evet' }, text: 'Ve Perde Açılır' },
    { in: { metin: 'ankara\'ya gittim', dil: 'tr' }, text: 'Ankara\'ya Gittim' },
    { in: { metin: 'pH değeri ölçüldü', kalan: 'koru' }, text: 'PH Değeri Ölçüldü' },
    { in: { metin: 'ad-soyad\n2 adet "kalem"' }, out: { 'Kelime sayısı': '3' }, text: 'Ad-Soyad\n2 Adet "Kalem"' },
    { in: { metin: '   ' }, error: true },
  ],
  howto: [
    'Düzeltmek istediğiniz metni "Metin" kutusuna yazın ya da yapıştırın; birden çok satır girebilirsiniz.',
    'Metin Türkçeyse harf kuralını "Türkçe" bırakın. İngilizce başlıklarda "İngilizce" seçin ki <code>i</code> harfi noktasız <code>I</code> olsun.',
    'Tamamı büyük yazılmış bir metni düzeltiyorsanız diğer harfler için "Küçük harfe çevir" seçili kalsın; kısaltmaları korumak istiyorsanız "Olduğu gibi bırak" yapın.',
    'Kitap, film ya da makale başlığı yazıyorsanız bağlaçların küçük kalması seçeneğini açın.',
    '"İlk Harfleri Büyüt" düğmesine basın ve sonucu kopyalayın.',
  ],
  sections: [
    { h: 'Baş harfleri büyük yazım nerede kullanılır?', p: [
      'Her kelimenin büyük harfle başladığı yazım biçimi, özel adların ve başlıkların doğal hâlidir. Bir müşteri listesindeki ad soyadlar, adres satırlarındaki mahalle ve cadde adları, ürün adları, kitap ve film başlıkları, sunum slaytlarının başlıkları bu biçimde yazılır. Sorun genellikle verinin kaynağındadır: bir form tümüyle büyük harfle doldurulmuş, bir dışa aktarım dosyası her şeyi küçük harfe çevirmiş ya da farklı kişiler farklı alışkanlıklarla yazmıştır.',
      'Türkiye\'de sık karşılaşılan örnekler arasında e-ticaret sitesine yüklenecek ürün başlıkları, kargo etiketine basılacak alıcı adları, davetiye ve sertifika isim listeleri, okul ve dernek üye kayıtları sayılabilir. Yüzlerce satırı elle düzeltmek yerine listeyi yapıştırıp tek seferde dönüştürmek hem zaman kazandırır hem de gözden kaçan satır bırakmaz.',
    ] },
    { h: 'Türkçe i ve ı sorunu', p: [
      'Türkçe alfabede iki ayrı harf çifti vardır: noktalı <strong>i – İ</strong> ve noktasız <strong>ı – I</strong>. İngilizce kurala göre çalışan programlar ise küçük <code>i</code> harfini noktasız büyük <code>I</code> yapar. Sonuç, Türkçe metinde hatalı yazımlardır: <code>istanbul</code> kelimesi <code>Istanbul</code>, <code>izmir</code> kelimesi <code>Izmir</code> olur. Tersine, büyük harfli <code>IĞDIR</code> küçültülürken <code>iğdir</code> çıkar.',
      'Bu araç Türkçe kural seçiliyken dönüşümü harf harf doğru eşleştirir. Çözümlü örnek: <code>istanbul ığdır şişli</code> girdisi <code>İstanbul Iğdır Şişli</code> olur. Tamamı büyük harfli <code>İSTANBUL IĞDIR ÇANKIRI</code> girdisinde önce bütün harfler Türkçe kurala göre küçültülür, ardından baş harfler büyütülür ve <code>İstanbul Iğdır Çankırı</code> elde edilir. Aynı <code>istanbul</code> kelimesini İngilizce kuralla çevirirseniz <code>Istanbul</code> çıkar; İngilizce bir başlıkta beklenen de budur.',
    ] },
    { h: 'Kesme işareti, kısa çizgi ve sayılar', p: [
      'Bir kelimenin nerede başlayıp nerede bittiğine karar vermek göründüğü kadar basit değildir. Araç kelimeleri boşluklara göre ayırır ve her parçanın ilk harfini büyütür. Parça tırnak ya da parantezle başlıyorsa bu işaretler atlanır ve ilk gerçek harf büyütülür.',
      'Kesme işaretinden sonra gelen ek küçük kalır: <code>ankara\'ya gittim</code> girdisi <code>Ankara\'ya Gittim</code> olur, <code>Ankara\'Ya</code> olmaz. Kısa çizgi ya da eğik çizgiyle birleşen kelimelerde ise her parça ayrı bir kelime gibi düşünülür: <code>ad-soyad</code> girdisi <code>Ad-Soyad</code> biçimine gelir. Rakamla başlayan parçalarda rakamdan sonraki harf büyütülmez; <code>3d</code> ya da <code>5a</code> gibi yazımlar olduğu gibi kalır. Yalnızca rakam ve noktalamadan oluşan parçalar kelime sayılmaz.',
    ] },
    { h: 'Bağlaçları küçük bırakma seçeneği', p: [
      'Türkçe yazım geleneğinde kitap, dergi, makale gibi yapıt adlarında her kelime büyük harfle başlar; ancak özel ada dâhil olmayan <em>ve, ile, ya, veya, yahut, ki, da, de</em> gibi bağlaçlar ile soru eki <em>mı, mi, mu, mü</em> küçük yazılır. "Savaş ve Barış", "Suç ve Ceza" bu kuralın bilinen örnekleridir. Seçeneği açtığınızda araç bu kelimeleri küçük bırakır; yalnızca satırın ilk kelimesi bağlaç olsa da büyük harfle başlar.',
      'Listeye <em>için, gibi, ama, fakat, ancak</em> gibi edat ve bağlaçlar da eklenmiştir. Kurumunuzun yazım kılavuzu bunların büyük yazılmasını istiyorsa seçeneği kapalı tutun ya da sonuçta ilgili kelimeleri elle düzeltin. İngilizce kural seçiliyken küçük bırakılan kelimeler <em>a, an, the, and, or, of, in, on, to</em> gibi tanımlık ve kısa edatlardır.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      '<strong>Kısaltmalar:</strong> "Küçük harfe çevir" açıkken <code>TBMM</code> kelimesi <code>Tbmm</code> olur. Metinde kısaltma çoksa diğer harfleri "Olduğu gibi bırak" seçeneğiyle çalışın; bu durumda yalnızca ilk harf büyütülür.',
      '<strong>Tamamı büyük metinde "koru" seçmek:</strong> Girdi zaten büyük harfliyse ve diğer harfler korunursa hiçbir şey değişmez. Büyük harfli listelerde küçültme seçeneği açık olmalıdır.',
      '<strong>Soyadı ekleri:</strong> <code>de</code>, <code>van</code> gibi küçük yazılan soyadı parçaları araç tarafından tanınmaz; bunları sonuçta elle düzeltin.',
      '<strong>Cümleler:</strong> Bu biçim düz yazı için uygun değildir. Bir paragrafı düzeltiyorsanız yalnızca cümle başlarını büyüten cümle düzeni aracını kullanın.',
      '<strong>Şapkalı harfler:</strong> â, î, û harfleri kendi büyük biçimlerine (Â, Î, Û) çevrilir.',
    ] },
  ],
  faq: [
    ['Tamamı büyük harfle yazılmış ad soyad listesini nasıl düzeltirim?', 'Listeyi yapıştırın, harf kuralını Türkçe, diğer harfleri "Küçük harfe çevir" olarak bırakın ve düğmeye basın. "AYŞE YILMAZ" satırı "Ayşe Yılmaz" olur. Soyadı tümüyle büyük kalsın istiyorsanız bunu ayrıca düzenlemeniz gerekir.'],
    ['"istanbul" neden bazı programlarda "Istanbul" oluyor?', 'Çünkü o programlar İngilizce harf kuralını uygular ve küçük i harfinin büyüğünü noktasız I kabul eder. Türkçede i harfinin büyüğü İ, ı harfinin büyüğü I\'dır. Bu araçta Türkçe kural seçiliyken dönüşüm doğru yapılır.'],
    ['İngilizce başlıklar için kullanabilir miyim?', 'Evet. Harf kuralını İngilizce yapın; böylece "i" harfi "I" olur. Bağlaç seçeneğini açarsanız a, an, the, and, of gibi kısa kelimeler küçük kalır. İngilizce başlık kuralları yayınevine göre değiştiği için sonucu kendi kılavuzunuzla karşılaştırın.'],
    ['Kesme işaretinden sonraki ek neden büyümüyor?', 'Türkçede özel ada gelen ekler kesme işaretiyle ayrılır ve küçük yazılır. Araç bu yüzden kesme işaretinden sonraki harfi büyütmez; "izmir\'den" girdisi "İzmir\'den" olur.'],
    ['Kısaltmalar bozulmasın istiyorum, ne yapmalıyım?', 'Diğer harfler için "Olduğu gibi bırak" seçeneğini kullanın. Bu durumda araç yalnızca her kelimenin ilk harfini büyütür, geri kalan harflerin büyüklüğüne dokunmaz; TBMM, KDV, pH gibi yazımlar korunur.'],
    ['Satır sonları ve boşluklar korunuyor mu?', 'Evet. Satır yapısı, kelimeler arasındaki boşluk sayısı ve noktalama işaretleri aynen kalır; yalnızca harflerin büyüklüğü değişir. Bu sayede sütun hâlindeki listeleri bozulmadan geri yapıştırabilirsiniz.'],
    ['Cümle düzeni ile baş harfleri büyük yazım arasındaki fark nedir?', 'Cümle düzeninde yalnızca cümlenin ilk harfi büyüktür, diğer kelimeler küçük kalır. Baş harfleri büyük yazımda ise her kelime büyük harfle başlar. İlki düz yazı, ikincisi ad ve başlıklar için uygundur.'],
    ['Yazdığım metin kaydediliyor mu?', 'Hayır. Dönüştürme işlemi tarayıcınızın içinde yapılır; metniniz sunucuya gönderilmez, saklanmaz ve sayfayı kapattığınızda silinir.'],
  ],
  related: ['buyuk-kucuk-harf-donustur', 'cumle-duzeni', 'alternatif-buyuk-kucuk', 'bas-harf-kisaltma', 'bosluk-temizle'],
};
