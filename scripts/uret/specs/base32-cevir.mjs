export default {
  slug: 'base32-cevir',
  title: 'Base32 Kodlama ve Çözme',
  h1Tail: 'encode / decode',
  pageTitle: 'Base32 Kodlama ve Çözme – Online Base32 Encode Decode',
  description: 'Metni Base32 biçimine kodlayın ya da Base32 dizgisini metne çözün. RFC 4648 alfabesi, isteğe bağlı = dolgusu, UTF-8 Türkçe karakter desteği.',
  card: 'Metni Base32 olarak kodlayın ya da Base32 dizgisini çözün; RFC 4648 alfabesi, dolgulu ve dolgusuz çıktı.',
  category: 'gelistirici',
  keywords: ['base32 kodlama', 'base32 çözme', 'base32 encode', 'base32 decode', 'base32 çevirici', 'base32 nedir', 'rfc 4648 base32'],
  lead: 'Bir metni <strong>Base32</strong> biçimine kodlayın ya da elinizdeki Base32 dizgisini okunur metne çevirin. Araç RFC 4648\'de tanımlanan A–Z ve 2–7 alfabesini kullanır, Türkçe karakterleri UTF-8 olarak işler.',
  button: 'Çevir',
  inputs: [
    { id: 'girdi', label: 'Metin ya da Base32 dizgisi', type: 'textarea', placeholder: 'Örn. Merhaba ya da JVSXE2DBMJQQ====', wide: true },
    { id: 'yon', label: 'İşlem', type: 'select', options: [['kodla', 'Metni Base32\'ye kodla'], ['coz', 'Base32\'yi metne çöz']] },
    { id: 'dolgu', label: 'Dolgu (=) işareti', type: 'select', options: [['var', 'Ekle (standart)'], ['yok', 'Ekleme']], hint: 'Yalnızca kodlamada geçerlidir. Çözmede dolgu olsa da olmasa da kabul edilir.' },
  ],
  compute(v, h) {
    const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    const ham = String(v.girdi ?? '');
    const hexYaz = (bytes) => Array.from(bytes, (b) => b.toString(16).toUpperCase().padStart(2, '0')).join(' ');
    if (v.yon === 'coz') {
      const t = ham.replace(/\s/g, '').replace(/=+$/, '').toUpperCase();
      if (t === '') h.err('Çözülecek Base32 dizgisini yazın.');
      const kotu = t.match(/[^A-Z2-7]/);
      if (kotu) h.err(`Base32 dizgisinde geçersiz karakter var: "${kotu[0]}". Yalnızca A–Z harfleri ve 2–7 rakamları kullanılır; 0, 1, 8 ve 9 alfabede yoktur.`);
      const kalan = t.length % 8;
      if (kalan === 1 || kalan === 3 || kalan === 6) h.err('Base32 dizgisinin uzunluğu geçersiz; sonunda eksik ya da fazla karakter olabilir. Dizgiyi eksiksiz kopyaladığınızdan emin olun.');
      const bytes = [];
      let tampon = 0, bit = 0;
      for (const ch of t) {
        tampon = (tampon << 5) | ABC.indexOf(ch); bit += 5;
        if (bit >= 8) { bit -= 8; bytes.push((tampon >> bit) & 0xff); tampon &= (1 << bit) - 1; }
      }
      const u8 = new Uint8Array(bytes);
      let metin, gecerli = true;
      try { metin = new TextDecoder('utf-8', { fatal: true }).decode(u8); } catch { gecerli = false; metin = '(Baytlar geçerli bir UTF-8 metin değil; onaltılık satıra bakın.)'; }
      return {
        rows: [
          ['Çözülen metin', metin],
          ['Baytlar (onaltılık)', hexYaz(u8)],
          ['Uzunluk', `${h.fmt(t.length, 0)} Base32 karakteri → ${h.fmt(u8.length, 0)} bayt`],
        ],
        text: gecerli ? metin : hexYaz(u8),
        note: gecerli ? 'Baytlar UTF-8 metin olarak yorumlandı.' : 'Çözülen veri metin değil, ikili veri gibi görünüyor; baytlar onaltılık olarak verildi.',
      };
    }
    if (ham === '') h.err('Kodlanacak metni yazın.');
    const u8 = new TextEncoder().encode(ham);
    let out = '', tampon = 0, bit = 0;
    for (const b of u8) {
      tampon = (tampon << 8) | b; bit += 8;
      while (bit >= 5) { bit -= 5; out += ABC[(tampon >> bit) & 31]; tampon &= (1 << bit) - 1; }
    }
    if (bit > 0) out += ABC[(tampon << (5 - bit)) & 31];
    const dolgusuz = out.length;
    if (v.dolgu !== 'yok') while (out.length % 8) out += '=';
    return {
      rows: [
        ['Base32', out],
        ['Baytlar (onaltılık)', hexYaz(u8)],
        ['Uzunluk', `${h.fmt(u8.length, 0)} bayt → ${h.fmt(out.length, 0)} karakter`],
        ['Dolgu', out.length === dolgusuz ? 'Yok' : `${out.length - dolgusuz} adet =`],
      ],
      text: out,
      note: 'RFC 4648 Base32 alfabesi (A–Z, 2–7) kullanıldı; metin UTF-8 olarak kodlandı.',
    };
  },
  cases: [
    { in: { girdi: 'foobar' }, out: { 'Base32': 'MZXW6YTBOI======', 'Baytlar (onaltılık)': '66 6F 6F 62 61 72', 'Uzunluk': '6 bayt → 16 karakter', 'Dolgu': '6 adet =' }, text: 'MZXW6YTBOI======' },
    { in: { girdi: 'JVSXE2DBMJQSARGDXRXHSYI=', yon: 'coz' }, out: { 'Çözülen metin': 'Merhaba Dünya', 'Uzunluk': '23 Base32 karakteri → 14 bayt' }, text: 'Merhaba Dünya' },
    { in: { girdi: 'fooba' }, out: { 'Base32': 'MZXW6YTB', 'Dolgu': 'Yok' } },
    { in: { girdi: 'f' }, out: { 'Base32': 'MY======' } },
    { in: { girdi: 'foob', dolgu: 'yok' }, out: { 'Base32': 'MZXW6YQ', 'Uzunluk': '4 bayt → 7 karakter', 'Dolgu': 'Yok' } },
    { in: { girdi: 'Merhaba Dünya' }, out: { 'Base32': 'JVSXE2DBMJQSARGDXRXHSYI=' } },
    { in: { girdi: 'mzxw 6ytb oi', yon: 'coz' }, out: { 'Çözülen metin': 'foobar', 'Baytlar (onaltılık)': '66 6F 6F 62 61 72' } },
    { in: { girdi: 'MZXW6===', yon: 'coz' }, out: { 'Çözülen metin': 'foo' } },
    { in: { girdi: 'MZXW1', yon: 'coz' }, error: true },
    { in: { girdi: '' }, error: true },
    { in: { girdi: 'MZX', yon: 'coz' }, error: true },
  ],
  howto: [
    'Kodlamak istediğiniz metni ya da çözmek istediğiniz Base32 dizgisini kutuya yazın.',
    '"İşlem" listesinden yönü seçin: metinden Base32\'ye kodlama ya da Base32\'den metne çözme.',
    'Kodlama yapıyorsanız çıktının sonuna <code>=</code> dolgu işaretlerinin eklenip eklenmeyeceğini belirleyin.',
    '"Çevir" düğmesine basın. Sonuç hem satır olarak hem de kopyalamaya uygun metin kutusunda gösterilir; bayt dökümü onaltılık olarak eklenir.',
  ],
  sections: [
    { h: 'Base32 nedir?', p: [
      'Base32, ikili veriyi yalnızca 32 farklı karakter kullanarak yazıya dökme yöntemidir. RFC 4648\'de tanımlanan standart alfabe 26 büyük Latin harfi ile 2\'den 7\'ye kadar olan altı rakamdan oluşur. Sıfır, bir, sekiz ve dokuz rakamları bilerek dışarıda bırakılmıştır; çünkü 0 ile O harfi, 1 ile I ve L harfleri kolayca karıştırılır. Böylece dizgi elle yazıldığında, telefonda okunduğunda ya da büyük-küçük harf ayrımı yapmayan bir ortamdan geçtiğinde bozulma olasılığı azalır.',
      'Base32 bir şifreleme değildir. Veriyi gizlemez, yalnızca farklı bir alfabeyle yeniden yazar; dizgiyi gören herkes çözebilir.',
    ] },
    { h: 'Kodlama nasıl çalışır?', p: [
      'Veri baytları art arda dizilerek bir bit akışı oluşturulur ve bu akış beşer bitlik gruplara ayrılır. Beş bit 0 ile 31 arasında bir sayı verir; her sayı alfabedeki ilgili karakterle değiştirilir. Beş bayt (40 bit) tam olarak sekiz karaktere karşılık geldiği için kodlama beş baytlık bloklar hâlinde düşünülür. Son blok beş bayttan kısaysa eksik bitler sıfırla tamamlanır ve çıktı uzunluğu sekizin katı olana kadar <code>=</code> işaretiyle doldurulur.',
      'Sonuç olarak Base32 çıktısı özgün veriden yüzde 60 daha uzundur: her 5 bayt 8 karakter olur. Aynı veri Base64 ile yaklaşık yüzde 33 uzar; Base32\'nin bedeli daha uzun çıktı, kazancı ise yalın ve hataya dayanıklı alfabedir.',
    ] },
    { h: 'Adım adım örnek', p: [
      '<code>foobar</code> sözcüğünü ele alalım. Altı ASCII baytı <code>66 6F 6F 62 61 72</code> değerleridir. İlk beş bayt sekiz karaktere dönüşür: <code>MZXW6YTB</code>. Geriye kalan tek bayt (72) sekiz bit taşır; iki beşlik grup için on bit gerektiğinden sona iki sıfır biti eklenir ve <code>OI</code> karakterleri elde edilir. Çıktı on karakterde kalır, sekizin katına tamamlamak için altı adet dolgu eklenir: <code>MZXW6YTBOI======</code>. Araca "foobar" yazdığınızda tam olarak bu sonucu görürsünüz.',
      'Türkçe karakter içeren bir örnek: "Merhaba Dünya" 13 karakter ama UTF-8\'de 14 bayttır, çünkü "ü" iki bayt tutar. Kodlanmış hâli <code>JVSXE2DBMJQSARGDXRXHSYI=</code> olur; bu dizgiyi çözme yönünde verdiğinizde özgün metin harfi harfine geri gelir.',
    ] },
    { h: 'Dolgu kuralları', p: [
      'Dolgu sayısı son bloktaki bayt sayısına bağlıdır ve yalnızca belirli değerleri alabilir:',
    ], ul: [
      'Son blokta 1 bayt varsa 2 karakter ve <strong>6 adet</strong> = yazılır.',
      'Son blokta 2 bayt varsa 4 karakter ve <strong>4 adet</strong> = yazılır.',
      'Son blokta 3 bayt varsa 5 karakter ve <strong>3 adet</strong> = yazılır.',
      'Son blokta 4 bayt varsa 7 karakter ve <strong>1 adet</strong> = yazılır.',
      'Veri uzunluğu 5\'in katıysa dolgu gerekmez.',
    ] },
    { h: 'Base32 nerelerde karşınıza çıkar?', p: [
      'En bilinen kullanım iki adımlı doğrulamadır: kimlik doğrulayıcı uygulamalara elle girilen ya da karekodun içinde taşınan gizli anahtar Base32 ile yazılır ve genellikle dolgusuz verilir. Bunun dışında büyük-küçük harf ayrımı yapmayan dosya sistemlerinde ve alan adı kayıtlarında ikili değer taşımak, bazı dağıtık ağlarda adres ve içerik kimliği yazmak, insanların sesli okuyacağı kurtarma kodları üretmek için de tercih edilir.',
      'Dikkat: Base32\'nin birden fazla çeşidi vardır. "base32hex" 0–9 ve A–V alfabesini, Crockford çeşidi ise I, L, O ve U harflerini dışlayan farklı bir alfabe kullanır. Bu araç yalnızca standart RFC 4648 alfabesini kodlar ve çözer; diğer çeşitlerle üretilmiş dizgiler geçersiz karakter uyarısı verebilir ya da yanlış çözülür.',
    ] },
    { h: 'Çözmede sık görülen sorunlar', p: [
      'Çözme sırasında araç boşlukları ve satır sonlarını atar, küçük harfleri büyüğe çevirir ve sondaki dolguyu yok sayar; bu yüzden dörderli gruplar hâlinde yazılmış anahtarları doğrudan yapıştırabilirsiniz. Dizgide 0, 1, 8 ya da 9 görürseniz büyük olasılıkla O, I ya da B harfi yanlış okunmuştur. Uzunluk sekize bölündüğünde 1, 3 ya da 6 karakter artıyorsa dizgi eksik kopyalanmıştır; bu durumda araç tahmin yürütmek yerine uyarı verir.',
      'Çözülen baytlar her zaman metin olmayabilir. Bir doğrulama anahtarı rastgele baytlardan oluşur ve ekrana yazılabilir bir karşılığı yoktur. Bu durumda araç baytları onaltılık olarak gösterir; anlamsız karakterler üretmez.',
    ] },
  ],
  faq: [
    ['Base32 ile Base64 arasındaki fark nedir?', 'Base64 büyük ve küçük harfleri, rakamları ve iki simgeyi kullanarak her 3 baytı 4 karaktere çevirir. Base32 yalnızca büyük harf ve altı rakam kullanır, her 5 baytı 8 karaktere çevirir. Base32 daha uzun çıktı üretir ama harf büyüklüğüne duyarsız ortamlarda ve elle yazımda daha güvenlidir.'],
    ['Base32 çıktısının sonundaki = işaretleri gerekli mi?', 'Standart, çıktı uzunluğunu sekizin katına tamamlamak için dolgu ekler. Birçok sistem dolgusuz dizgiyi de kabul eder; iki adımlı doğrulama anahtarları çoğunlukla dolgusuz yazılır. Hedef sistemin belgelerine göre seçim yapın.'],
    ['Base32 şifreleme midir?', 'Hayır. Base32 bir kodlamadır; anahtar ya da parola içermez ve herkes tarafından geri çevrilebilir. Gizlilik gerekiyorsa veriyi önce şifrelemeniz gerekir.'],
    ['Küçük harfle yazılmış Base32 dizgisi çözülür mü?', 'Evet. Araç çözmeden önce harfleri büyük harfe çevirir. Standart alfabe büyük harftir, ancak pek çok uygulama küçük harfli girdiyi de kabul eder.'],
    ['Neden 0, 1, 8 ve 9 rakamları yok?', 'Alfabe 32 karakterle sınırlı olduğundan on rakamın tümüne yer yoktur. Harflerle en çok karıştırılan 0 ve 1 ile birlikte 8 ve 9 dışarıda bırakılmış, 2–7 arasındaki rakamlar alınmıştır.'],
    ['Türkçe karakterler nasıl kodlanır?', 'Metin önce UTF-8 baytlarına çevrilir. ç, ğ, ı, ö, ş ve ü harfleri ikişer bayt tutar, bu yüzden karakter sayısı ile bayt sayısı farklı olabilir. Çözme sırasında baytlar yeniden UTF-8 olarak okunur ve harfler bozulmadan geri gelir.'],
    ['Kodlanmış veri ne kadar uzar?', 'Dolgu hariç her 5 bayt 8 karaktere dönüşür, yani boyut 1,6 katına çıkar. Örneğin 20 baytlık bir anahtar 32 karakterlik Base32 dizgisi olur.'],
    ['Yazdığım metin ya da anahtar sunucuya gidiyor mu?', 'Hayır. Kodlama ve çözme tarayıcınızda yapılır; girdiniz hiçbir yere gönderilmez ve saklanmaz. Yine de etkin bir hesabın doğrulama anahtarını zorunlu olmadıkça hiçbir web sayfasına yapıştırmamanız önerilir.'],
  ],
  related: ['base64-donustur', 'url-kodla', 'metin-sha256-hesapla', 'sayi-tabani-donustur', 'crc32-hesapla'],
};
