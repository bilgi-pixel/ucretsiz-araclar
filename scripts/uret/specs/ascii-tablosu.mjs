export default {
  slug: 'ascii-tablosu',
  title: 'ASCII Tablosu Sorgulama',
  h1Tail: 'karakter ↔ kod',
  pageTitle: 'ASCII Tablosu Sorgulama – Karakterin ASCII Kodunu Bulma',
  description: 'Bir karakterin ASCII kodunu ya da bir kodun karşılığı olan karakteri bulun. Ondalık, onaltılık, sekizlik ve ikili değerler ile denetim karakteri adları.',
  card: 'Karakterin ASCII kodunu ya da kodun karakterini bulun; ondalık, onaltılık, sekizlik ve ikili karşılıklarıyla.',
  category: 'gelistirici',
  keywords: ['ascii tablosu', 'ascii kodu bulma', 'karakter ascii kodu', 'ascii kod tablosu', 'a harfinin ascii kodu', 'ascii hex karşılığı', 'ascii denetim karakterleri', 'ascii kaç karakter'],
  lead: 'Bir karakter yazın ya da ondalık, onaltılık veya ikili bir kod girin. Araç 0–127 arasındaki <strong>ASCII</strong> tablosundan karşılığını bulur; tüm sayı tabanlarındaki değeri, karakterin türünü ve denetim karakterlerinin adını gösterir.',
  button: 'Sorgula',
  inputs: [
    { id: 'girdi', label: 'Karakter ya da kod', type: 'text', placeholder: 'Örn. A, 65, 41 ya da 1000001', hint: 'Denetim karakterleri için kısaltmasını yazabilirsiniz: LF, CR, ESC, NUL…' },
    { id: 'tur', label: 'Girdi türü', type: 'select', options: [['karakter', 'Karakter'], ['ondalik', 'Ondalık kod (0–127)'], ['hex', 'Onaltılık kod (00–7F)'], ['ikili', 'İkili kod (7 ya da 8 bit)']] },
  ],
  compute(v, h) {
    const ham = String(v.girdi ?? '');
    const D = [
      ['NUL', 'Boş karakter'], ['SOH', 'Başlık başlangıcı'], ['STX', 'Metin başlangıcı'], ['ETX', 'Metin sonu'],
      ['EOT', 'İletim sonu'], ['ENQ', 'Sorgu'], ['ACK', 'Onay'], ['BEL', 'Zil'],
      ['BS', 'Geri silme'], ['HT', 'Yatay sekme (Tab)'], ['LF', 'Satır besleme (yeni satır)'], ['VT', 'Dikey sekme'],
      ['FF', 'Sayfa besleme'], ['CR', 'Satır başı'], ['SO', 'Dışa kaydırma'], ['SI', 'İçe kaydırma'],
      ['DLE', 'Veri bağlantısı kaçışı'], ['DC1', 'Aygıt denetimi 1 (XON)'], ['DC2', 'Aygıt denetimi 2'], ['DC3', 'Aygıt denetimi 3 (XOFF)'],
      ['DC4', 'Aygıt denetimi 4'], ['NAK', 'Olumsuz onay'], ['SYN', 'Eşzamanlama'], ['ETB', 'İletim bloğu sonu'],
      ['CAN', 'İptal'], ['EM', 'Ortam sonu'], ['SUB', 'Yerine koyma'], ['ESC', 'Kaçış'],
      ['FS', 'Dosya ayırıcı'], ['GS', 'Grup ayırıcı'], ['RS', 'Kayıt ayırıcı'], ['US', 'Birim ayırıcı'],
    ];
    const simgeAd = {
      33: 'Ünlem işareti', 34: 'Çift tırnak', 35: 'Diyez (kare) işareti', 36: 'Dolar işareti', 37: 'Yüzde işareti', 38: 'Ve işareti (ampersand)',
      39: 'Kesme işareti (tek tırnak)', 40: 'Açma parantezi', 41: 'Kapama parantezi', 42: 'Yıldız', 43: 'Artı', 44: 'Virgül', 45: 'Kısa çizgi (eksi)',
      46: 'Nokta', 47: 'Eğik çizgi', 58: 'İki nokta', 59: 'Noktalı virgül', 60: 'Küçüktür işareti', 61: 'Eşittir', 62: 'Büyüktür işareti',
      63: 'Soru işareti', 64: 'Kuyruklu a (et işareti)', 91: 'Açma köşeli parantezi', 92: 'Ters eğik çizgi', 93: 'Kapama köşeli parantezi',
      94: 'Şapka (düzeltme) işareti', 95: 'Alt çizgi', 96: 'Ters kesme (grave) işareti', 123: 'Açma süslü parantezi', 124: 'Dikey çizgi',
      125: 'Kapama süslü parantezi', 126: 'Tilde (yaklaşık) işareti',
    };
    let kod;
    if (v.tur === 'ondalik') {
      const t = ham.trim();
      if (!/^\d{1,3}$/.test(t)) h.err('Ondalık kod 0 ile 127 arasında bir tam sayı olmalıdır (örn. 65).');
      kod = Number(t);
    } else if (v.tur === 'hex') {
      const t = ham.trim().replace(/^0x/i, '').replace(/h$/i, '');
      if (!/^[0-9a-f]{1,2}$/i.test(t)) h.err('Onaltılık kod 00 ile 7F arasında olmalıdır (örn. 41 ya da 0x41).');
      kod = parseInt(t, 16);
    } else if (v.tur === 'ikili') {
      const t = ham.trim().replace(/^0b/i, '').replace(/\s/g, '');
      if (!/^[01]{1,8}$/.test(t)) h.err('İkili kod yalnızca 0 ve 1 rakamlarından oluşmalı ve en fazla 8 bit olmalıdır (örn. 1000001).');
      kod = parseInt(t, 2);
    } else {
      if (ham === '') h.err('Bir karakter yazın (örn. A) ya da girdi türünü değiştirip kod girin.');
      const kisa = ham.trim().toUpperCase();
      const i = D.findIndex((d) => d[0] === kisa);
      const noktalar = [...ham];
      if (kisa.length >= 2 && i >= 0) kod = i;
      else if (kisa === 'DEL') kod = 127;
      else if (kisa === 'TAB') kod = 9;
      else if (kisa === 'SP' || kisa === 'SPACE' || kisa === 'BOŞLUK') kod = 32;
      else if (noktalar.length === 1) kod = noktalar[0].codePointAt(0);
      else if ([...ham.trim()].length === 1) kod = ham.trim().codePointAt(0);
      else h.err('Karakter türünde tek bir karakter ya da LF, CR, ESC gibi bir denetim kısaltması yazın. Kod girecekseniz girdi türünü değiştirin.');
      if (kod > 127) h.err(`"${String.fromCodePoint(kod)}" ASCII tablosunda yer almaz (Unicode kod noktası U+${kod.toString(16).toUpperCase().padStart(4, '0')}). ASCII yalnızca 0–127 arasındaki 128 karakteri kapsar; Türkçeye özgü harfler bu aralığın dışındadır.`);
    }
    if (kod > 127) h.err('ASCII tablosu 0 ile 127 arasındaki kodları kapsar. 128 ve üzeri değerler genişletilmiş kod sayfalarına ya da Unicode\'a aittir.');

    let gosterim, tur, aciklama;
    if (kod < 32) { gosterim = `${D[kod][0]} (yazdırılamaz)`; tur = 'Denetim karakteri'; aciklama = D[kod][1]; }
    else if (kod === 127) { gosterim = 'DEL (yazdırılamaz)'; tur = 'Denetim karakteri'; aciklama = 'Silme'; }
    else if (kod === 32) { gosterim = 'Boşluk'; tur = 'Boşluk karakteri'; aciklama = 'Sözcükleri ayıran boşluk; yazdırılabilir karakterlerin ilkidir'; }
    else {
      const c = String.fromCharCode(kod);
      gosterim = c;
      if (kod >= 48 && kod <= 57) { tur = 'Rakam'; aciklama = `${c} rakamı`; }
      else if (kod >= 65 && kod <= 90) { tur = 'Büyük harf'; aciklama = `Büyük ${c} harfi; küçük karşılığı ${String.fromCharCode(kod + 32)} (kod ${kod + 32})`; }
      else if (kod >= 97 && kod <= 122) { tur = 'Küçük harf'; aciklama = `Küçük ${c} harfi; büyük karşılığı ${String.fromCharCode(kod - 32)} (kod ${kod - 32})`; }
      else { tur = 'Noktalama / simge'; aciklama = simgeAd[kod]; }
    }
    return {
      rows: [
        ['Karakter', gosterim],
        ['Ondalık', String(kod)],
        ['Onaltılık', '0x' + kod.toString(16).toUpperCase().padStart(2, '0')],
        ['Sekizlik', kod.toString(8).padStart(3, '0')],
        ['İkili (8 bit)', kod.toString(2).padStart(8, '0')],
        ['Tür', tur],
        ['Açıklama', aciklama],
        ['HTML sayısal kodu', `&#${kod};`],
      ],
      note: kod < 32 || kod === 127 ? 'Denetim karakterleri ekranda görünmez; yazıcı, terminal ve iletişim hatlarını yönetmek için tanımlanmıştır.' : 'ASCII 7 bitlik bir koddur; 8 bitlik gösterimde en soldaki bit her zaman 0\'dır.',
    };
  },
  cases: [
    { in: { girdi: 'A', tur: 'karakter' }, out: { 'Karakter': 'A', 'Ondalık': '65', 'Onaltılık': '0x41', 'Sekizlik': '101', 'İkili (8 bit)': '01000001', 'Tür': 'Büyük harf' } },
    { in: { girdi: '97', tur: 'ondalik' }, out: { 'Karakter': 'a', 'Onaltılık': '0x61', 'Sekizlik': '141', 'İkili (8 bit)': '01100001', 'Tür': 'Küçük harf' } },
    { in: { girdi: '0', tur: 'karakter' }, out: { 'Ondalık': '48', 'Onaltılık': '0x30', 'Sekizlik': '060', 'İkili (8 bit)': '00110000', 'Tür': 'Rakam' } },
    { in: { girdi: '7E', tur: 'hex' }, out: { 'Karakter': '~', 'Ondalık': '126', 'Sekizlik': '176', 'İkili (8 bit)': '01111110', 'Tür': 'Noktalama / simge' } },
    { in: { girdi: '0x0A', tur: 'hex' }, out: { 'Karakter': 'LF (yazdırılamaz)', 'Ondalık': '10', 'Tür': 'Denetim karakteri', 'Açıklama': 'Satır besleme (yeni satır)' } },
    { in: { girdi: '1000001', tur: 'ikili' }, out: { 'Karakter': 'A', 'Ondalık': '65' } },
    { in: { girdi: '32', tur: 'ondalik' }, out: { 'Karakter': 'Boşluk', 'Onaltılık': '0x20', 'Tür': 'Boşluk karakteri' } },
    { in: { girdi: 'esc', tur: 'karakter' }, out: { 'Ondalık': '27', 'Onaltılık': '0x1B', 'Açıklama': 'Kaçış' } },
    { in: { girdi: '127', tur: 'ondalik' }, out: { 'Karakter': 'DEL (yazdırılamaz)', 'Onaltılık': '0x7F', 'İkili (8 bit)': '01111111' } },
    { in: { girdi: '@', tur: 'karakter' }, out: { 'Ondalık': '64', 'Onaltılık': '0x40', 'HTML sayısal kodu': '&#64;' } },
    { in: { girdi: '128', tur: 'ondalik' }, error: true },
    { in: { girdi: 'ç', tur: 'karakter' }, error: true },
    { in: { girdi: 'AB', tur: 'karakter' }, error: true },
    { in: { girdi: 'ZZ', tur: 'hex' }, error: true },
    { in: { girdi: '', tur: 'karakter' }, error: true },
  ],
  howto: [
    'Bir karakterin kodunu öğrenmek için "Girdi türü" listesini "Karakter" konumunda bırakın ve kutuya tek bir karakter yazın: <code>A</code>, <code>7</code>, <code>@</code> gibi.',
    'Elinizde bir kod varsa girdi türünü ona göre seçin: ondalık için <code>65</code>, onaltılık için <code>41</code> ya da <code>0x41</code>, ikili için <code>1000001</code> yazın.',
    'Görünmeyen denetim karakterlerini sorgulamak için karakter türünde kısaltmasını yazın: <code>LF</code>, <code>CR</code>, <code>TAB</code>, <code>ESC</code>, <code>NUL</code>, <code>DEL</code>.',
    '"Sorgula" düğmesine basın. Karakter, dört sayı tabanındaki kodu, türü, açıklaması ve HTML sayısal kodu listelenir.',
    'İhtiyacınız olan değeri sonuç kutusundan kopyalayıp kodunuza ya da belgenize aktarın.',
  ],
  sections: [
    { h: 'ASCII nedir?', p: [
      'ASCII, bilgisayarların harfleri, rakamları ve noktalama işaretlerini sayı olarak saklamasını sağlayan en eski ve en yaygın karakter kodlamasıdır. Adı "Bilgi Değişimi İçin Amerikan Standart Kodu" anlamına gelen İngilizce ifadenin baş harflerinden oluşur. Standart 1960\'larda tanımlanmıştır ve her karaktere 0 ile 127 arasında bir sayı verir.',
      'ASCII 7 bitlik bir koddur: 7 bit ile 2<sup>7</sup> = 128 farklı değer yazılabilir. Bu 128 değerin 33\'ü ekranda görünmeyen denetim karakteridir (0–31 arası ve 127), 95\'i ise yazdırılabilir karakterdir (32–126 arası; boşluk dahil). Yazdırılabilir bölümde İngiliz alfabesinin 26 büyük ve 26 küçük harfi, 10 rakam, boşluk ve 32 noktalama ya da simge yer alır.',
    ] },
    { h: 'Tablonun düzeni', ul: [
      '<strong>0–31:</strong> denetim karakterleri. Satır sonu (LF, 10), satır başı (CR, 13), sekme (HT, 9) ve kaçış (ESC, 27) bugün de sık kullanılır.',
      '<strong>32:</strong> boşluk.',
      '<strong>33–47:</strong> ünlem, tırnak, diyez, dolar, yüzde, parantezler, artı, eksi, nokta, eğik çizgi gibi işaretler.',
      '<strong>48–57:</strong> 0\'dan 9\'a rakamlar.',
      '<strong>58–64:</strong> iki nokta, noktalı virgül, küçüktür, eşittir, büyüktür, soru işareti ve @.',
      '<strong>65–90:</strong> A\'dan Z\'ye büyük harfler.',
      '<strong>91–96:</strong> köşeli parantezler, ters eğik çizgi, şapka, alt çizgi, ters kesme.',
      '<strong>97–122:</strong> a\'dan z\'ye küçük harfler.',
      '<strong>123–126:</strong> süslü parantezler, dikey çizgi ve tilde.',
      '<strong>127:</strong> silme (DEL) denetim karakteri.',
    ] },
    { h: 'Çözümlü örnek: A harfi', p: [
      'Kutuya <code>A</code> yazıp sorguladığınızda araç ondalık kodu <strong>65</strong> olarak verir. Aynı değerin diğer tabanlardaki karşılıkları şöyle bulunur: 65 = 4 × 16 + 1 olduğundan onaltılık yazımı <strong>41</strong>\'dir. 65 = 1 × 64 + 0 × 8 + 1 olduğundan sekizlik yazımı <strong>101</strong>\'dir. İkili tabanda 65 = 64 + 1, yani 2<sup>6</sup> + 2<sup>0</sup> olduğundan 7 bitlik yazımı 1000001, başına bir sıfır eklenmiş 8 bitlik yazımı <strong>01000001</strong> olur.',
      'Tersine, girdi türünü "Ondalık kod" yapıp <code>97</code> yazarsanız sonuç küçük <strong>a</strong> harfidir: onaltılık 0x61, sekizlik 141, ikili 01100001. Dikkat ederseniz a ile A arasındaki fark tam 32\'dir ve ikili yazımda yalnızca tek bir bit değişir.',
    ] },
    { h: 'Akılda tutmaya değer örüntüler', p: [
      'Tablonun düzeni rastgele değildir ve birkaç pratik kısayol sunar. Büyük harfi küçüğe çevirmek için koda 32 eklenir, küçüğü büyüğe çevirmek için 32 çıkarılır; A (65) ile a (97), Z (90) ile z (122) bu kurala uyar. Bir rakam karakterinin sayısal değerini bulmak için kodundan 48 çıkarılır: "7" karakterinin kodu 55\'tir ve 55 − 48 = 7 eder. Programlama dillerinde metinden sayıya dönüşümün temelinde bu çıkarma vardır.',
      'Sıralama da koda göre yapılır: rakamlar büyük harflerden, büyük harfler küçük harflerden önce gelir. Bu yüzden basit bir kod sıralamasında "Zeytin" sözcüğü "armut" sözcüğünden önce çıkar. Dosya adlarını ya da listeleri sıralarken beklenmedik sonuç alıyorsanız nedeni çoğunlukla budur.',
    ] },
    { h: 'ASCII ve Türkçe karakterler', p: [
      'ASCII yalnızca İngiliz alfabesini kapsar; <strong>ç, ğ, ı, ö, ş, ü</strong> ve büyük karşılıkları ile <strong>İ</strong> bu tabloda yoktur. Kutuya bu harflerden birini yazdığınızda araç hata iletisinde karakterin ASCII dışında kaldığını ve Unicode kod noktasını bildirir. Geçmişte Türkçe harfler 128–255 arasını kullanan 8 bitlik kod sayfalarıyla temsil ediliyordu; farklı kod sayfalarının karışması, e-postalarda ve eski web sayfalarında görülen bozuk harflerin kaynağıdır.',
      'Bugün yaygın kodlama UTF-8\'dir. UTF-8, ASCII ile geriye dönük uyumludur: 0–127 arasındaki her karakter UTF-8\'de de aynı tek baytla yazılır. Türkçeye özgü harfler ise iki baytla kodlanır. Alan adlarında, eski sistemlerle veri alışverişinde ya da SMS karakter sayımında Türkçe harflerin sorun çıkarması bu farktan kaynaklanır.',
    ] },
    { h: 'Denetim karakterleri ve satır sonları', p: [
      'İlk 32 kod, teleks makineleri ve satır yazıcılar döneminden kalan komutlardır. Birçoğu artık kullanılmasa da bazıları gündelik yazılım işlerinde hâlâ belirleyicidir. Satır sonu bunların başında gelir: Linux ve macOS satırı yalnızca LF (10) ile bitirir, Windows ise CR (13) ve LF (10) çiftini kullanır. Bir metin dosyası sistemler arasında taşındığında satırların birleşmesi ya da satır sonlarında tuhaf işaretler görülmesi bu farktan doğar.',
      'Sekme karakteri (9) CSV benzeri dosyalarda sütun ayırıcı olarak, NUL (0) C dilinde dizgi sonu işareti olarak, ESC (27) ise terminalde renk ve imleç komutlarını başlatmak için kullanılır.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç yalnızca standart 7 bitlik ASCII\'yi kapsar; 128–255 arası "genişletilmiş ASCII" diye anılan değerler tek bir standarda bağlı olmadığı, kod sayfasına göre değiştiği için tabloya alınmamıştır. Bu aralıktaki ya da Unicode\'daki karakterler için hata iletisi gösterilir. Tek seferde bir karakter sorgulanır; bir metnin tüm karakterlerini kodlara dökmek için metin dönüştürme araçlarını kullanın.',
    ] },
  ],
  faq: [
    ['A harfinin ASCII kodu kaçtır?', 'Büyük A harfinin ASCII kodu ondalık 65, onaltılık 41, ikili 01000001\'dir. Küçük a harfinin kodu ise 97\'dir.'],
    ['ASCII tablosunda kaç karakter vardır?', 'Standart ASCII 128 karakter içerir: 0\'dan 127\'ye. Bunların 33\'ü denetim karakteri, 95\'i boşluk dahil yazdırılabilir karakterdir.'],
    ['Türkçe karakterlerin ASCII kodu var mı?', 'Hayır. ç, ğ, ı, ö, ş, ü ve İ standart ASCII\'de bulunmaz. Bu harfler Unicode\'da tanımlıdır ve UTF-8 kodlamasında iki bayt yer tutar.'],
    ['Boşluk karakterinin kodu nedir?', 'Boşluğun ASCII kodu ondalık 32, onaltılık 20\'dir. Web adreslerinde boşluğun %20 olarak yazılmasının nedeni budur.'],
    ['Büyük harfi küçük harfe kodla nasıl çeviririm?', 'Büyük harfin koduna 32 ekleyin. Örneğin M harfinin kodu 77\'dir; 77 + 32 = 109 küçük m harfinin kodudur. Bu kural yalnızca İngiliz alfabesindeki 26 harf için geçerlidir.'],
    ['LF ile CR arasındaki fark nedir?', 'LF (kod 10) satır besleme, CR (kod 13) satır başı anlamına gelir. Linux ve macOS satır sonunda yalnızca LF, Windows ise CR ve LF\'yi birlikte kullanır. Dosyalar sistemler arasında taşınırken satır sonu sorunları bundan kaynaklanır.'],
    ['Genişletilmiş ASCII neden desteklenmiyor?', '128–255 arasındaki değerlerin anlamı tek bir standartla belirlenmemiştir; kullanılan kod sayfasına göre aynı sayı farklı harflere karşılık gelir. Yanıltıcı sonuç vermemek için araç yalnızca herkes için aynı olan 0–127 aralığını kapsar.'],
    ['Yazdığım karakterler bir sunucuya gidiyor mu?', 'Hayır. Tablo sayfanın içindedir ve sorgu tarayıcınızda çalışır; yazdığınız karakter ya da kod hiçbir yere gönderilmez.'],
  ],
  related: ['html-kodla-coz', 'unicode-kacis-cevir', 'bit-islem-hesapla', 'js-kacis-karakteri', 'base32-cevir', 'iki-tumleyen-hesapla'],
};
