export default {
  slug: 'tirnak-donustur',
  title: 'Düz Tırnakları Kıvrık Tırnağa Çevirme',
  h1Tail: '" " → “ ”',
  pageTitle: 'Düz Tırnakları Kıvrık Tırnağa Çevirme – Tipografik Tırnak Aracı',
  description: 'Metindeki düz tırnakları (" ve \') kıvrık tipografik tırnaklara ve kesme işaretine çevirin; Alman ve Fransız tırnak biçimini ya da tersine düz tırnağı seçin.',
  card: 'Düz tırnakları kıvrık tipografik tırnağa, kesme işaretini doğru biçime çevirin; isterseniz kıvrık tırnakları yeniden düzleştirin.',
  category: 'metin',
  keywords: ['kıvrık tırnak', 'düz tırnak çevirme', 'tipografik tırnak', 'akıllı tırnak', 'tırnak işareti dönüştürme', 'kesme işareti düzeltme', 'smart quotes', 'açılış kapanış tırnağı'],
  lead: 'Klavyeden yazılan düz tırnakları (<code>"</code> ve <code>\'</code>) açılış ve kapanışı ayrı olan <strong>kıvrık tipografik tırnaklara</strong> dönüştürün. Araç kelime içindeki kesme işaretini de ayırt eder; tersine, kıvrık tırnakları kod ve veri dosyaları için düz tırnağa çevirebilir.',
  button: 'Dönüştür',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: '"Yarın geliyorum" dedi Ali\'nin kardeşi.', wide: true },
    { id: 'stil', label: 'Hedef tırnak biçimi', type: 'select', options: [['kivrik', 'Kıvrık tırnak: “ ” ve ‘ ’'], ['alman', 'Alman biçimi: „ “ ve ‚ ‘'], ['fransiz', 'Açılı tırnak: « » ve ‹ ›'], ['duz', 'Tersine: kıvrık tırnakları düz tırnağa çevir']] },
  ],
  compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Dönüştürmek için "Metin" alanına tırnak içeren bir yazı yazın.');
    const stil = v.stil || 'kivrik';
    if (stil === 'duz') {
      let cift = 0, tek = 0;
      const cikti = s.replace(/[“”„‟«»]/g, () => { cift++; return '"'; }).replace(/[‘’‚‛‹›]/g, () => { tek++; return '\''; });
      return {
        rows: [
          ['Çevrilen çift tırnak', h.fmt(cift, 0)],
          ['Çevrilen tek tırnak', h.fmt(tek, 0)],
        ],
        text: cikti,
        note: 'Kıvrık kesme işareti de tek tırnak sayısına dahildir. Metinde çevrilecek işaret yoksa çıktı girdiyle aynıdır.',
      };
    }
    const T = { kivrik: ['“', '”', '‘', '’'], alman: ['„', '“', '‚', '‘'], fransiz: ['«', '»', '‹', '›'] }[stil] || ['“', '”', '‘', '’'];
    const ch = Array.from(s);
    const harf = (c) => c !== undefined && /[\p{L}\p{N}]/u.test(c);
    let cikti = '', cift = 0, tek = 0, kesme = 0;
    let oncekiTirnakAcilis = null; // bir önceki karakter tırnaksa açılış mıydı
    for (let i = 0; i < ch.length; i++) {
      const c = ch[i], once = ch[i - 1], sonra = ch[i + 1];
      if (c !== '"' && c !== '\'') { cikti += c; oncekiTirnakAcilis = null; continue; }
      if (c === '\'' && harf(once) && harf(sonra)) { cikti += '’'; kesme++; oncekiTirnakAcilis = null; continue; }
      let acilis;
      if (once === undefined) acilis = true;
      else if (oncekiTirnakAcilis !== null) acilis = oncekiTirnakAcilis;
      else acilis = /[\s(\[{–—\-\/=]/.test(once);
      if (c === '"') { cikti += acilis ? T[0] : T[1]; cift++; }
      else { cikti += acilis ? T[2] : T[3]; tek++; }
      oncekiTirnakAcilis = acilis;
    }
    return {
      rows: [
        ['Çevrilen çift tırnak', h.fmt(cift, 0)],
        ['Çevrilen tek tırnak', h.fmt(tek, 0)],
        ['Çevrilen kesme işareti', h.fmt(kesme, 0)],
      ],
      text: cikti,
      note: 'Açılış ve kapanış, tırnaktan önceki karaktere göre belirlenir: satır başı, boşluk ya da açma parantezinden sonra gelen tırnak açılış sayılır.',
    };
  },
  cases: [
    { in: { metin: '"Merhaba" dedi.', stil: 'kivrik' }, out: { 'Çevrilen çift tırnak': '2' }, text: '“Merhaba” dedi.' },
    { in: { metin: 'Ankara\'nın havası', stil: 'kivrik' }, out: { 'Çevrilen kesme işareti': '1', 'Çevrilen tek tırnak': '0' }, text: 'Ankara’nın havası' },
    { in: { metin: '"Bana \'gel\' dedi" diye anlattı.', stil: 'kivrik' }, out: { 'Çevrilen çift tırnak': '2', 'Çevrilen tek tırnak': '2' }, text: '“Bana ‘gel’ dedi” diye anlattı.' },
    { in: { metin: '"Guten Tag"', stil: 'alman' }, text: '„Guten Tag“' },
    { in: { metin: '"Bonjour" ("salut")', stil: 'fransiz' }, text: '«Bonjour» («salut»)' },
    { in: { metin: '“Merhaba” Ali’nin', stil: 'duz' }, out: { 'Çevrilen çift tırnak': '2', 'Çevrilen tek tırnak': '1' }, text: '"Merhaba" Ali\'nin' },
    { in: { metin: '"\'İç içe\' başlar"', stil: 'kivrik' }, text: '“‘İç içe’ başlar”' },
    { in: { metin: '   ', stil: 'kivrik' }, error: true },
  ],
  howto: [
    'Düzeltmek istediğiniz yazıyı "Metin" kutusuna yapıştırın; satır sonları ve paragraflar olduğu gibi korunur.',
    '"Hedef tırnak biçimi" listesinden kıvrık, Alman ya da açılı tırnaktan birini seçin. Kıvrık tırnakları düzleştirmek istiyorsanız son seçeneği kullanın.',
    '"Dönüştür" düğmesine basın. Kaç çift tırnağın, tek tırnağın ve kesme işaretinin değiştiği sonuç satırlarında görünür.',
    'Çıktı kutusundaki metni kopyalayıp belgenize, dizgi programınıza ya da yayın panelinize yapıştırın ve iç içe alıntıları bir kez gözle denetleyin.',
  ],
  sections: [
    { h: 'Düz tırnak ile kıvrık tırnak arasındaki fark', p: [
      'Klavyedeki tırnak tuşu, daktilo döneminden kalma bir uzlaşmanın ürünüdür: tuş sayısını azaltmak için açılış ve kapanış tırnağı tek bir dik işarette birleştirilmiştir. Bu işaret (<code>"</code>) yön taşımaz; cümlenin başında da sonunda da aynı görünür. Basılı kitaplarda, gazetelerde ve özenli dizilmiş web sayfalarında ise alıntının başladığı ve bittiği yer farklı biçimli iki işaretle gösterilir: “ ile açılır, ” ile kapanır. Bunlara kıvrık, tipografik ya da akıllı tırnak denir.',
      'Fark küçük görünür ama uzun bir metinde okuma rahatlığını ve sayfanın profesyonel görünümünü belirgin biçimde etkiler. Kelime işlemciler bu dönüşümü yazarken kendiliğinden yapar; ancak düz metin düzenleyicilerinden, e-postalardan, sohbet uygulamalarından ya da tablo hücrelerinden kopyalanan yazılar çoğunlukla düz tırnakla gelir. Bu araç, o metinleri tek seferde tipografik biçime getirmek için hazırlanmıştır.',
    ] },
    { h: 'Araç açılışı ve kapanışı nasıl ayırt eder?', p: [
      'Kural, tırnaktan hemen önceki karaktere bakmaya dayanır. Tırnak metnin ya da satırın başındaysa, kendisinden önce boşluk, açma parantezi, köşeli parantez, tire ya da eğik çizgi varsa <strong>açılış</strong> kabul edilir. Bir harfin, rakamın ya da noktalama işaretinin ardından geliyorsa <strong>kapanış</strong> sayılır. İki tırnak yan yana geldiğinde ikincisi birincinin yönünü izler; böylece <code>"\'İç içe\' başlar"</code> girdisi “‘İç içe’ başlar” biçimine döner.',
      'Tek tırnak için ek bir denetim vardır: iki yanında harf ya da rakam bulunan tek tırnak alıntı işareti değil, <strong>kesme işaretidir</strong>. <code>Ankara\'nın</code>, <code>TBMM\'de</code>, <code>1923\'te</code> gibi yazımlarda işaret, seçtiğiniz biçim ne olursa olsun kıvrık kesmeye (’) çevrilir ve ayrı bir sayaçta gösterilir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Girdi olarak <code>"Bana \'gel\' dedi" diye anlattı.</code> cümlesini ele alalım. İlk çift tırnak metnin başında olduğu için açılıştır ve “ olur. <code>\'gel\'</code> ifadesindeki ilk tek tırnaktan önce boşluk vardır, yani açılıştır (‘); ikincisi "l" harfinden sonra gelir ve ardından boşluk vardır, dolayısıyla kesme değil kapanış tırnağıdır (’). "dedi" kelimesinden sonraki çift tırnak bir harfi izlediği için kapanıştır (”). Sonuç: “Bana ‘gel’ dedi” diye anlattı. Sayaçlar 2 çift tırnak, 2 tek tırnak ve 0 kesme işareti gösterir.',
      'Aynı cümleyi Alman biçimiyle dönüştürürseniz çift tırnaklar „ ve “, tek tırnaklar ‚ ve ‘ olur. Açılı tırnak seçildiğinde ise « » ve ‹ › kullanılır.',
    ] },
    { h: 'Hangi biçim nerede kullanılır?', ul: [
      '<strong>Kıvrık tırnak (“ ”):</strong> Türkçe ve İngilizce yayınlarda en yaygın biçimdir; alıntı içindeki alıntı için tek kıvrık tırnak (‘ ’) kullanılır.',
      '<strong>Alman biçimi („ “):</strong> Açılış tırnağı satırın altında, kapanış üstte durur. Almanca ile bazı Orta ve Doğu Avrupa dillerinde tercih edilir.',
      '<strong>Açılı tırnak (« »):</strong> Fransızca, Rusça ve İtalyanca gibi dillerde yaygındır; Türkçe eski basımlarda ve bazı yayınevlerinin dizgi geleneğinde de görülür.',
      '<strong>Düz tırnak (" \'):</strong> Programlama dillerinde, JSON ve CSV dosyalarında, komut satırında zorunludur; bu ortamlarda kıvrık tırnak hataya yol açar.',
    ] },
    { h: 'Kıvrık tırnağı düzleştirmek neden gerekir?', p: [
      'Bir belgeden kopyalanan kod parçası çalışmıyorsa nedeni çoğu zaman kelime işlemcinin kendiliğinden kıvırdığı tırnaklardır. Derleyiciler ve yorumlayıcılar “ ile ” işaretlerini dizgi sınırı olarak tanımaz. Aynı sorun tablo formüllerinde, yapılandırma dosyalarında ve veritabanı sorgularında da görülür. "Tersine" seçeneği çift tırnak ailesindeki bütün işaretleri (“ ” „ « ») düz çift tırnağa, tek tırnak ailesini (‘ ’ ‚ ‹ ›) düz tek tırnağa çevirir. Kıvrık kesme işareti de bu sırada düz kesmeye döner.',
    ] },
    { h: 'Sınırlar ve elle denetlenmesi gereken durumlar', p: [
      'Yön belirleme bağlama dayalı bir tahmindir ve bazı yazımlarda yanılabilir. Kelime başında harf düşmesini gösteren kesme (örneğin <code>\'90\'lar</code> yazımındaki ilk işaret) boşluktan sonra geldiği için açılış tırnağı sayılır; doğrusu kesme işaretidir ve elle düzeltilmelidir. İnç ve dakika gösteren işaretler de (<code>5\'10"</code>) alıntı tırnağı gibi işlenir; ölçü içeren metinlerde bu satırları dönüşümden sonra gözden geçirin.',
      'Araç tırnakların çevresine boşluk eklemez ya da silmez; Fransız dizgisinde açılı tırnağın içine konan ince boşluk gerekiyorsa ayrıca eklenmelidir. Zaten kıvrık olan tırnaklara dokunulmaz, bu yüzden aynı metni ikinci kez dönüştürmek sonucu bozmaz. Kod blokları içeren karma metinlerde yalnızca düzyazı bölümlerini dönüştürmeniz önerilir.',
    ] },
  ],
  faq: [
    ['Kıvrık tırnak ile düz tırnak aynı karakter midir?', 'Hayır. Düz çift tırnak tek bir karakterdir (U+0022); kıvrık açılış tırnağı U+201C, kapanış tırnağı U+201D kod noktasına sahiptir. Görünüşleri benzese de bilgisayar bunları üç ayrı karakter olarak işler.'],
    ['Kesme işareti neden ayrı sayılıyor?', 'Kesme işareti alıntı sınırı değil, ek ayırma işaretidir. İki yanında harf ya da rakam olan tek tırnak her zaman kıvrık kesmeye çevrilir ve açılış-kapanış hesabına katılmaz; bu yüzden ayrı satırda gösterilir.'],
    ['Türkçede hangi tırnak biçimi doğrudur?', 'Türkçe yayıncılıkta en yaygın kullanım kıvrık çift tırnaktır; alıntı içindeki alıntı tek tırnakla gösterilir. Bazı yayınevleri açılı tırnağı tercih eder. Bir yayın için yazıyorsanız o kurumun yazım kılavuzuna uyun.'],
    ['Dönüştürülen metni kod içinde kullanabilir miyim?', 'Kullanmayın. Programlama dilleri ve veri biçimleri düz tırnak bekler. Kod, JSON ya da CSV için "Tersine" seçeneğiyle kıvrık tırnakları düz tırnağa çevirin.'],
    ['Aynı metni iki kez dönüştürürsem bozulur mu?', 'Hayır. İlk dönüşümden sonra metinde düz tırnak kalmadığı için ikinci çalıştırmada değişen bir şey olmaz; sayaçlar sıfır gösterir.'],
    ['Yanlış yöne dönen bir tırnak görürsem ne yapmalıyım?', 'Tırnaktan önceki karakteri denetleyin. Açılış tırnağından önce boşluk yoksa ya da kapanıştan önce fazladan boşluk varsa yön tahmini şaşar. Girdiyi düzeltip yeniden dönüştürün ya da çıktıda o işareti elle değiştirin.'],
    ['Eşleşmeyen, yani kapatılmamış tırnaklar bildiriliyor mu?', 'Araç eşleşme denetimi yapmaz; her tırnağı kendi bağlamına göre çevirir. Çift tırnak sayacının tek sayı göstermesi, metinde açılıp kapatılmamış bir alıntı olabileceğinin işaretidir.'],
    ['Yapıştırdığım metin sunucuya gönderiliyor mu?', 'Hayır. Dönüştürme tarayıcınızın içinde yapılır; metin hiçbir yere iletilmez ve saklanmaz. Sayfa açıldıktan sonra bağlantı kesilse de araç çalışmayı sürdürür.'],
  ],
  related: ['noktalama-temizle', 'bul-ve-degistir', 'bosluk-temizle', 'html-etiket-temizle', 'unicode-kod-noktasi'],
};
