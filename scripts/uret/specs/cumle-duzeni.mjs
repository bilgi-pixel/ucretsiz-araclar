export default {
  slug: 'cumle-duzeni',
  title: 'Cümle Düzenine Çevirme',
  h1Tail: 'yalnızca cümle başları büyük',
  pageTitle: 'Cümle Düzenine Çevirme – Büyük Harfli Metni Düzeltme Aracı',
  description: 'Tamamı büyük ya da küçük harfle yazılmış metni cümle düzenine çevirin: her cümlenin ilk harfi büyük, kalanı küçük olur. Türkçe İ ve I kuralına uyar.',
  card: 'BÜYÜK HARFLE yazılmış metni cümle düzenine getirin; her cümle büyük harfle başlar, Türkçe İ/I doğru çevrilir.',
  category: 'metin',
  keywords: ['cümle düzenine çevirme', 'büyük harfli metni düzeltme', 'cümle başı büyük harf', 'caps lock düzeltme', 'sentence case', 'büyük harfi küçük harfe çevirme', 'cümlenin ilk harfini büyütme'],
  lead: 'Caps Lock açık yazılmış bir paragrafı ya da tümü küçük harfli bir metni tek tıkla düzeltin. Araç her <strong>cümlenin ilk harfini büyütür</strong>, geri kalan harfleri küçültür ve bunu yaparken Türkçedeki i/İ, ı/I ayrımını gözetir.',
  button: 'Cümle Düzenine Çevir',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Örn. BUGÜN HAVA ÇOK GÜZEL. YARIN YAĞMUR BEKLENİYOR.', wide: true },
    { id: 'dil', label: 'Harf kuralı', type: 'select', options: [['tr', 'Türkçe (I → ı, İ → i)'], ['en', 'İngilizce (I → i)']] },
    { id: 'kalan', label: 'Diğer harfler', type: 'select', options: [['kucult', 'Küçük harfe çevir'], ['koru', 'Olduğu gibi bırak']], hint: 'Özel adları ve kısaltmaları korumak için "Olduğu gibi bırak" seçin; bu durumda yalnızca cümle başları büyütülür.' },
  ],
  compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Cümle düzenine çevirmek için "Metin" alanına bir metin yazın.');
    if (!/\p{L}/u.test(s)) h.err('Metinde harf bulunamadı. İçinde yazı olan bir metin girin.');
    const tr = v.dil !== 'en';
    const kucuk = (x) => (tr ? x.replace(/I/g, 'ı').replace(/İ/g, 'i') : x.replace(/İ/g, 'i')).toLowerCase();
    const buyuk = (x) => (tr ? x.replace(/i/g, 'İ').replace(/ı/g, 'I') : x.replace(/ı/g, 'I')).toUpperCase();
    const kr = Array.from(v.kalan === 'koru' ? s : kucuk(s));
    let yeni = true, cumle = 0, o = '';
    for (let i = 0; i < kr.length; i++) {
      const c = kr[i];
      if (/\p{L}/u.test(c)) {
        if (yeni) { o += buyuk(c); cumle++; yeni = false; } else o += c;
        continue;
      }
      o += c;
      if (c === '\n') yeni = true;
      else if (/\p{N}/u.test(c)) { if (yeni) { cumle++; yeni = false; } }
      else if (c === '.' || c === '!' || c === '?' || c === '…') {
        // Nokta yalnızca ardından boşluk, satır sonu ya da kapanış işareti geliyorsa cümle bitirir (3.5 gibi sayılar bölünmez)
        // Soru ya da ünlemden hemen sonra tırnak kapanıyorsa ("Geldin mi?" dedi) cümle sürüyor kabul edilir
        let j = i + 1, tirnak = false;
        while (j < kr.length && /[.!?…"'’”»)\]]/.test(kr[j])) { if (/["'’”»]/.test(kr[j])) tirnak = true; j++; }
        if (j >= kr.length || /\s/.test(kr[j])) yeni = !(tirnak && (c === '!' || c === '?'));
      }
    }
    let degisen = 0;
    const eski = Array.from(s), son = Array.from(o);
    for (let i = 0; i < eski.length; i++) if (eski[i] !== son[i]) degisen++;
    return {
      rows: [
        ['Cümle sayısı', h.fmt(cumle, 0)],
        ['Değişen harf', h.fmt(degisen, 0)],
        ['Harf kuralı', tr ? 'Türkçe' : 'İngilizce'],
      ],
      text: o,
      note: v.kalan === 'koru' ? 'Yalnızca cümle başları büyütüldü; diğer harflerin büyüklüğüne dokunulmadı.' : 'Özel adlar ve kısaltmalar da küçük harfe çevrildi; bunları sonuçta elle düzeltin.',
    };
  },
  cases: [
    { in: { metin: 'MERHABA DÜNYA. BUGÜN HAVA GÜZEL.', dil: 'tr' }, out: { 'Cümle sayısı': '2' }, text: 'Merhaba dünya. Bugün hava güzel.' },
    { in: { metin: 'ışık söndü! iyi geceler', dil: 'tr' }, out: { 'Cümle sayısı': '2', 'Değişen harf': '2' }, text: 'Işık söndü! İyi geceler' },
    { in: { metin: 'IŞIK İYİ', dil: 'tr' }, text: 'Işık iyi' },
    { in: { metin: 'THIS IS IT. is it?', dil: 'en' }, out: { 'Harf kuralı': 'İngilizce' }, text: 'This is it. Is it?' },
    { in: { metin: 'bugün TBMM toplandı. karar çıktı.', kalan: 'koru' }, out: { 'Değişen harf': '2' }, text: 'Bugün TBMM toplandı. Karar çıktı.' },
    { in: { metin: 'fiyat 3.5 lira. ucuz' }, out: { 'Cümle sayısı': '2' }, text: 'Fiyat 3.5 lira. Ucuz' },
    { in: { metin: 'birinci satır\nikinci satır' }, text: 'Birinci satır\nİkinci satır' },
    { in: { metin: '"geliyor musun?" dedi. "evet."' }, text: '"Geliyor musun?" dedi. "Evet."' },
    { in: { metin: '' }, error: true },
    { in: { metin: '123 !!!' }, error: true },
  ],
  howto: [
    'Düzeltmek istediğiniz metni "Metin" kutusuna yapıştırın; paragraflar ve satır sonları korunur.',
    'Metin Türkçeyse harf kuralını "Türkçe" bırakın, İngilizce bir metin için "İngilizce" seçin.',
    'Tamamı büyük harfli bir metinde "Küçük harfe çevir" seçili kalsın. Metin zaten küçük harfliyse ve özel adlara dokunulmasını istemiyorsanız "Olduğu gibi bırak" yapın.',
    '"Cümle Düzenine Çevir" düğmesine basın. Sonuç kutusundaki metni kopyalayın ve özel adlarla kısaltmaları gözden geçirin.',
  ],
  sections: [
    { h: 'Cümle düzeni nedir?', p: [
      'Cümle düzeni, düz yazının olağan büyük küçük harf biçimidir: cümle büyük harfle başlar, sonraki kelimeler özel ad olmadıkça küçük harfle yazılır. Kelime işlemcilerdeki "büyük/küçük harf değiştir" menüsünde bu seçenek genellikle "Tümce düzeni" ya da "Cümle düzeni" adıyla yer alır. Bu araç aynı işi tarayıcıda, herhangi bir program kurmadan yapar.',
      'En sık ihtiyaç duyulan durum, Caps Lock açık unutularak yazılmış uzun bir metindir. Tümü büyük harfli yazı ekranda bağırıyormuş gibi algılanır ve okunması yorucudur; çünkü kelimelerin kendine özgü siluetleri kaybolur. Baştan yazmak yerine metni buraya yapıştırıp düzeltmek birkaç saniye sürer.',
    ] },
    { h: 'Cümle sınırı nasıl belirlenir?', p: [
      'Araç metni karakter karakter okur ve bir "yeni cümle" işareti tutar. Metnin en başında, her satır başında ve cümle bitiren bir noktalama işaretinden sonra bu işaret açılır; ilk karşılaşılan harf büyütülür ve işaret kapanır. Cümle bitiren işaretler <strong>nokta, ünlem, soru işareti ve üç nokta</strong> karakteridir.',
      'Her nokta cümle bitirmez. Araç bir noktayı ancak ardından boşluk, satır sonu ya da kapanış tırnağı ve parantezi geliyorsa cümle sonu sayar. Böylece <code>3.5</code> gibi ondalıklı sayılar, <code>12.05.2024</code> gibi tarihler ya da alan adları ortadan bölünmez. Çözümlü örnek: <code>fiyat 3.5 lira. ucuz</code> girdisinde ilk noktanın ardından rakam geldiği için cümle sürer; ikinci noktadan sonra boşluk vardır ve <code>ucuz</code> kelimesi büyük harfle başlar. Sonuç <code>Fiyat 3.5 lira. Ucuz</code> olur ve iki cümle sayılır.',
      'Tırnak içindeki konuşmalar için ayrı bir kural vardır. Cümle açılış tırnağıyla başlıyorsa tırnak atlanır ve ilk harf büyütülür. Soru işareti ya da ünlemden hemen sonra tırnak kapanıyorsa cümlenin sürdüğü varsayılır; çünkü <code>"geliyor musun?" dedi.</code> gibi aktarmalarda tırnaktan sonraki kelime küçük yazılır. Noktadan sonra kapanan tırnak ise cümleyi bitirir. Rakamla başlayan cümlelerde rakam cümle başı sayılır, ardından gelen kelime büyütülmez.',
    ] },
    { h: 'Türkçe harf kuralı neden önemli?', p: [
      'Türkçede büyük <code>I</code> harfinin küçüğü noktasız <code>ı</code>, büyük <code>İ</code> harfinin küçüğü noktalı <code>i</code> harfidir. İngilizce kurala göre çalışan araçlar <code>IŞIK</code> kelimesini <code>işik</code> yapar; <code>ışık</code> kelimesinin baş harfini büyütürken de doğru sonucu veremez. Yanlış çevrilmiş tek bir harf kelimenin anlamını değiştirebilir ya da metni özensiz gösterir.',
      'Türkçe kural seçiliyken araç bu eşleşmeleri elle tanımlanmış kurala göre yapar; tarayıcınızın dil ayarından etkilenmez. Çözümlü örnek: <code>IŞIK İYİ</code> girdisi önce <code>ışık iyi</code> biçiminde küçültülür, ardından ilk harf büyütülür ve <code>Işık iyi</code> elde edilir. <code>ışık söndü! iyi geceler</code> girdisinde iki cümle vardır; ilki noktasız <code>I</code>, ikincisi noktalı <code>İ</code> ile başlar ve yalnızca bu iki harf değişir.',
      'İngilizce bir metni dönüştürürken kuralı İngilizce yapmayı unutmayın; aksi hâlde <code>THIS</code> kelimesi <code>thıs</code> olur.',
    ] },
    { h: 'Aracın bilemeyeceği şeyler', ul: [
      '<strong>Özel adlar:</strong> Hangi kelimenin kişi, şehir ya da kurum adı olduğunu anlamak için sözlük ve bağlam gerekir. Küçültme açıkken <code>ANKARA</code> kelimesi cümle ortasında <code>ankara</code> olur; sonucu okuyup özel adları büyütmeniz gerekir.',
      '<strong>Kısaltmalar:</strong> <code>TBMM</code>, <code>KDV</code> gibi büyük harfli kısaltmalar küçültülür. Metin zaten küçük harfliyse "Olduğu gibi bırak" seçeneği bunları korur.',
      '<strong>Noktalı kısaltmalar:</strong> <code>Dr.</code>, <code>Prof.</code>, <code>vb.</code> gibi kısaltmalardan sonra boşluk geldiği için araç yeni cümle başladığını varsayar ve sonraki kelimeyi büyütür. Unvanlardan sonra çoğunlukla özel ad geldiği için sonuç genellikle doğrudur; <code>vb.</code> ve <code>vs.</code> sonrasını kontrol edin.',
      '<strong>İki nokta ve noktalı virgül:</strong> Bu işaretlerden sonra büyük harf zorunlu olmadığı için araç onları cümle sonu saymaz.',
      '<strong>Madde listeleri:</strong> Her satır yeni cümle kabul edildiğinden liste maddeleri büyük harfle başlar.',
    ] },
    { h: 'Kullanım senaryoları', p: [
      'Müşteriden büyük harflerle gelen bir e-postayı alıntılamadan önce okunur hâle getirmek, eski bir veritabanından aktarılan ürün açıklamalarını düzeltmek, sosyal medyada paylaşılacak bir duyuruyu yumuşatmak ya da telefonda sesle yazdırılmış, cümle başları küçük kalmış notları toparlamak en yaygın kullanımlardır. Öğrenciler ödev metinlerini, editörler yazarlardan gelen ham metinleri ilk geçişte bu yolla temizleyebilir.',
      'Ad soyad ya da başlık listeleri için bu araç uygun değildir; orada her kelimenin büyük harfle başlaması beklenir. Öyle bir liste için her kelimenin ilk harfini büyüten aracı kullanın.',
    ] },
  ],
  faq: [
    ['Caps Lock açık yazdığım metni nasıl düzeltirim?', 'Metni kutuya yapıştırın, "Küçük harfe çevir" seçeneği açıkken düğmeye basın. Bütün harfler küçültülür ve her cümlenin ilk harfi büyütülür. Ardından özel adları ve kısaltmaları elle düzeltmeniz yeterlidir.'],
    ['Özel adlar neden küçük harfe dönüyor?', 'Araç kelimelerin anlamını bilmez; bir kelimenin özel ad olup olmadığını ayırt edemez. Metin zaten doğru büyük harfler içeriyorsa "Olduğu gibi bırak" seçeneğiyle yalnızca cümle başlarını büyütebilirsiniz.'],
    ['Ondalıklı sayılar ve tarihler bozulur mu?', 'Hayır. Bir noktanın cümle bitirmesi için ardından boşluk ya da satır sonu gelmesi gerekir. 3.5, 12.05.2024 ya da sürüm numaraları gibi noktadan sonra rakam gelen yazımlar bölünmez.'],
    ['"Dr." ya da "vb." kısaltmasından sonra neden büyük harf geldi?', 'Kısaltma noktası ile cümle sonu noktası aynı karakterdir ve araç ikisini ayırt edemez. Noktadan sonra boşluk varsa yeni cümle varsayılır. Bu tür yerleri sonuçta gözden geçirin.'],
    ['Satır başlarında neden hep büyük harf var?', 'Her yeni satır yeni bir cümle ya da madde olarak kabul edilir. Metniniz dar bir sütuna sığdırılmış ve cümleler satır ortasında bölünmüşse önce satırları birleştirip sonra bu aracı kullanın.'],
    ['İngilizce metinde "I" zamiri küçük kalıyor, bu normal mi?', 'Evet. Araç yalnızca cümle başlarını büyütür; İngilizcede her zaman büyük yazılan "I" zamirini ve özel adları tanımaz. Bunları sonuçta elle düzeltmeniz gerekir.'],
    ['Paragraf yapısı korunuyor mu?', 'Evet. Satır sonları, boş satırlar, boşluk sayısı ve noktalama işaretleri aynen kalır. Yalnızca harflerin büyük ya da küçük olması değişir; metnin uzunluğu aynıdır.'],
    ['Metnim bir yere kaydediliyor mu?', 'Hayır. İşlem tarayıcınızda gerçekleşir; yazdığınız metin sunucuya gönderilmez ve saklanmaz. Gizli yazışmaları da güvenle düzeltebilirsiniz.'],
  ],
  related: ['buyuk-kucuk-harf-donustur', 'ilk-harf-buyut', 'alternatif-buyuk-kucuk', 'satirlari-birlestir', 'yazim-kontrol'],
};
