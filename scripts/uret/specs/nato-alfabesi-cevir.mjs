export default {
  slug: 'nato-alfabesi-cevir',
  title: 'NATO Fonetik Alfabe Çevirici',
  h1Tail: 'Alfa, Bravo, Charlie…',
  pageTitle: 'NATO Fonetik Alfabe Çevirici – Metni Alfa Bravo Charlie Kodlama',
  description: 'Metni NATO fonetik alfabesine (Alfa, Bravo, Charlie) çevirin ya da kod sözcüklerini yeniden harfe dönüştürün. Türkçe harfler ve rakamlar desteklenir.',
  card: 'Ad, plaka ya da kodu NATO fonetik alfabesiyle heceleyin; kod sözcüklerini tekrar düz metne çevirin.',
  category: 'metin',
  keywords: ['nato alfabesi', 'fonetik alfabe', 'alfa bravo charlie', 'telsiz alfabesi', 'heceleme alfabesi', 'nato fonetik alfabe çevirici', 'icao alfabesi', 'harf kodlama'],
  lead: `Yazdığınız metni <strong>NATO fonetik alfabesindeki</strong> kod sözcüklerine (Alfa, Bravo, Charlie…) çevirin ya da telsizden, telefondan duyduğunuz kod sözcüklerini yeniden harflere dönüştürün. Türkçeye özgü harfler en yakın Latin harfine indirgenir, rakamlar İngilizce adlarıyla yazılır.`,
  button: 'Çevir',
  inputs: [
    { id: 'metin', label: 'Metin ya da kod sözcükleri', type: 'textarea', placeholder: 'Örn. TC-JRE ya da Tango Charlie Juliett Romeo Echo', wide: true },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['kodla', 'Metin → NATO sözcükleri'], ['coz', 'NATO sözcükleri → Metin']] },
  ],
  compute(v, h) {
    const SOZ = {
      A: 'Alfa', B: 'Bravo', C: 'Charlie', D: 'Delta', E: 'Echo', F: 'Foxtrot', G: 'Golf', H: 'Hotel', I: 'India',
      J: 'Juliett', K: 'Kilo', L: 'Lima', M: 'Mike', N: 'November', O: 'Oscar', P: 'Papa', Q: 'Quebec', R: 'Romeo',
      S: 'Sierra', T: 'Tango', U: 'Uniform', V: 'Victor', W: 'Whiskey', X: 'Xray', Y: 'Yankee', Z: 'Zulu',
      0: 'Zero', 1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five', 6: 'Six', 7: 'Seven', 8: 'Eight', 9: 'Nine',
    };
    const TR = { 'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U', 'Â': 'A', 'Î': 'I', 'Û': 'U' };
    const ham = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (ham.trim() === '') h.err('Çevrilecek metni ya da kod sözcüklerini yazın.');
    const satirlar = ham.split('\n').map((s) => s.trim()).filter((s) => s !== '');
    let cevrilen = 0, atlanan = 0;
    const cikti = [];
    if (v.yon === 'coz') {
      const TERS = {};
      for (const k of Object.keys(SOZ)) TERS[SOZ[k].toLowerCase()] = k;
      Object.assign(TERS, { alpha: 'A', juliet: 'J', whisky: 'W', niner: '9', tree: '3', fower: '4', fife: '5' });
      for (const satir of satirlar) {
        let s = '';
        for (const parca of satir.split(/\s+/)) {
          if (parca === '/' || parca === '|') { s += ' '; continue; }
          const anahtar = parca.toLowerCase().replace(/[-.,;]/g, '');
          if (anahtar === '') continue;
          const harf = TERS[anahtar];
          if (harf === undefined) h.err(`"${parca}" bir NATO kod sözcüğü değil. Sözcükleri boşlukla ayırın (örn. Alfa Lima India).`);
          s += harf; cevrilen++;
        }
        cikti.push(s.replace(/ +/g, ' ').trim());
      }
    } else {
      for (const satir of satirlar) {
        const kelimeler = [];
        for (const kelime of satir.split(/\s+/)) {
          const parcalar = [];
          for (const ch of kelime) {
            let b = ch.toUpperCase();
            if (TR[b]) b = TR[b];
            if (SOZ[b] !== undefined) { parcalar.push(SOZ[b]); cevrilen++; } else atlanan++;
          }
          if (parcalar.length) kelimeler.push(parcalar.join(' '));
        }
        if (kelimeler.length) cikti.push(kelimeler.join(' / '));
      }
      if (!cevrilen) h.err('Metinde çevrilebilecek harf ya da rakam bulunamadı.');
    }
    return {
      rows: [
        ['Çevrilen karakter', h.fmt(cevrilen, 0)],
        ['Atlanan karakter', h.fmt(atlanan, 0)],
      ],
      text: cikti.join('\n'),
      note: v.yon === 'coz' ? 'Kelime aralarını belirtmek için kod sözcükleri arasına "/" koyabilirsiniz.' : 'Kelimeler " / " ile ayrılır; noktalama işaretleri atlanır, Türkçe harfler en yakın Latin harfiyle kodlanır.',
    };
  },
  cases: [
    { in: { metin: 'SOS', yon: 'kodla' }, out: { 'Çevrilen karakter': '3', 'Atlanan karakter': '0' }, text: 'Sierra Oscar Sierra' },
    { in: { metin: 'Tango Uniform Romeo Kilo', yon: 'coz' }, out: { 'Çevrilen karakter': '4' }, text: 'TURK' },
    { in: { metin: 'Ali 34', yon: 'kodla' }, text: 'Alfa Lima India / Three Four' },
    { in: { metin: 'Çağrı', yon: 'kodla' }, out: { 'Çevrilen karakter': '5' }, text: 'Charlie Alfa Golf Romeo India' },
    { in: { metin: 'TC-JRE', yon: 'kodla' }, out: { 'Atlanan karakter': '1' }, text: 'Tango Charlie Juliett Romeo Echo' },
    { in: { metin: 'alpha juliet x-ray / one niner', yon: 'coz' }, text: 'AJX 19' },
    { in: { metin: '', yon: 'kodla' }, error: true },
    { in: { metin: 'Merhaba dünya', yon: 'coz' }, error: true },
    { in: { metin: '?!...', yon: 'kodla' }, error: true },
  ],
  howto: [
    `Kutucuğa hecelemek istediğiniz adı, plakayı, rezervasyon kodunu ya da seri numarasını yazın.`,
    `"Çeviri yönü" listesinden metni kod sözcüklerine mi, yoksa kod sözcüklerini metne mi çevireceğinizi seçin.`,
    `"Çevir" düğmesine basın. Her harfin karşılığı sırayla, kelimeler arasında eğik çizgiyle listelenir.`,
    `Ters yönde çalışırken sözcükleri boşlukla ayırın; yeni bir kelimeye geçildiğini göstermek için araya "/" yazın.`,
    `Sonucu kopyalayıp telefonda okumak üzere not alın ya da mesajınıza yapıştırın.`,
  ],
  sections: [
    { h: 'NATO fonetik alfabesi nedir?', p: [
      `Telefon ya da telsiz hattında "B" ile "P", "M" ile "N", "D" ile "T" kolayca karışır. Hat cızırtılıysa ya da konuşanların ana dili farklıysa tek bir harfin yanlış anlaşılması bir uçuş kodunu, bir adres satırını ya da bir parça numarasını bütünüyle bozar. Fonetik heceleme alfabesi bu sorunu, her harfe birbirine benzemeyen ve kolay seçilen bir sözcük atayarak çözer: A için <strong>Alfa</strong>, B için <strong>Bravo</strong>, C için <strong>Charlie</strong> denir.`,
      `Bugün yaygın olarak "NATO alfabesi" diye anılan dizi, yirminci yüzyılın ortasında sivil havacılık için geliştirilmiş, ardından askerî haberleşmede, denizcilikte ve amatör telsizcilikte de benimsenmiştir. Sözcükler, farklı dilleri konuşan kişilerin hepsinin anlaşılır biçimde söyleyebilmesi gözetilerek seçilmiştir. "Alfa" ve "Juliett" sözcüklerinin alışılmış İngilizce yazımdan farklı olması da bundandır: "ph" her dilde "f" okunmaz, tek "t" ile biten "Juliet" ise bazı dillerde sondaki ses yutularak söylenir.`,
    ] },
    { h: 'Harf ve rakamların tam listesi', p: [
      `Aracın kullandığı karşılıklar aşağıdadır. Rakamlar için uluslararası kullanımdaki İngilizce adlar verilir; telsizde 9 çoğu zaman "Niner" diye söylenir ve araç bu söylenişi de ters çeviride tanır.`,
    ], ul: [
      `<strong>A</strong> Alfa · <strong>B</strong> Bravo · <strong>C</strong> Charlie · <strong>D</strong> Delta · <strong>E</strong> Echo · <strong>F</strong> Foxtrot`,
      `<strong>G</strong> Golf · <strong>H</strong> Hotel · <strong>I</strong> India · <strong>J</strong> Juliett · <strong>K</strong> Kilo · <strong>L</strong> Lima`,
      `<strong>M</strong> Mike · <strong>N</strong> November · <strong>O</strong> Oscar · <strong>P</strong> Papa · <strong>Q</strong> Quebec · <strong>R</strong> Romeo`,
      `<strong>S</strong> Sierra · <strong>T</strong> Tango · <strong>U</strong> Uniform · <strong>V</strong> Victor · <strong>W</strong> Whiskey · <strong>X</strong> Xray`,
      `<strong>Y</strong> Yankee · <strong>Z</strong> Zulu`,
      `<strong>0</strong> Zero · <strong>1</strong> One · <strong>2</strong> Two · <strong>3</strong> Three · <strong>4</strong> Four · <strong>5</strong> Five · <strong>6</strong> Six · <strong>7</strong> Seven · <strong>8</strong> Eight · <strong>9</strong> Nine`,
    ] },
    { h: 'Türkçe harfler nasıl kodlanır?', p: [
      `Uluslararası alfabede yalnızca 26 temel Latin harfi vardır; ç, ğ, ı, İ, ö, ş ve ü için ayrı bir kod sözcüğü tanımlanmamıştır. Araç bu harfleri en yakın temel harfe indirger: ç → C (Charlie), ğ → G (Golf), ı ve İ → I (India), ö → O (Oscar), ş → S (Sierra), ü → U (Uniform). Pasaport, bilet ve rezervasyon kayıtlarında adlar zaten bu biçimde, yani Türkçe işaretler olmadan yazıldığından sonuç pratikte tam ihtiyaç duyulan şeydir.`,
      `Örneğin "Çağrı" adını yazdığınızda çıktı <code>Charlie Alfa Golf Romeo India</code> olur. Karşı tarafa adınızın Türkçe yazımını anlatmanız gerekiyorsa, Türkiye'de gündelik hayatta kullanılan şehir adlarıyla heceleme ("Çanakkale'nin Ç'si") daha uygun olabilir; bu araç uluslararası diziyi üretir.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Örnek 1:</strong> "SOS" yazıp metinden koda çevirdiğinizde sonuç <code>Sierra Oscar Sierra</code> olur ve "Çevrilen karakter" satırında 3 görünür.`,
      `<strong>Örnek 2:</strong> "Ali 34" girdisinde iki kelime vardır. Araç her kelimeyi ayrı kodlar ve aralarına eğik çizgi koyar: <code>Alfa Lima India / Three Four</code>. Eğik çizgi, dinleyene bir kelimenin bittiğini haber verir.`,
      `<strong>Örnek 3:</strong> "TC-JRE" gibi bir tescil işaretinde kısa çizgi kodlanmaz; çıktı <code>Tango Charlie Juliett Romeo Echo</code> olur ve atlanan karakter sayısı 1 olarak gösterilir.`,
      `<strong>Örnek 4 (ters yön):</strong> "Tango Uniform Romeo Kilo" yazıp yönü "NATO sözcükleri → Metin" seçerseniz <code>TURK</code> elde edersiniz. Büyük-küçük harf fark etmez; "alpha", "juliet" ve "x-ray" gibi yaygın yazım biçimleri de kabul edilir.`,
    ] },
    { h: 'Nerelerde işe yarar?', ul: [
      `Çağrı merkeziyle konuşurken rezervasyon kodu, kargo takip numarası ya da müşteri numarası okumak`,
      `Telefonda e-posta adresinin kullanıcı adını ya da bir Wi-Fi ağ adını harf harf bildirmek`,
      `Araç plakası, şasi numarası veya cihaz seri numarası gibi harf-rakam karışık dizileri hatasız aktarmak`,
      `Amatör telsizcilik ve denizcilik sınavlarına hazırlanırken çağrı işaretlerini çalışmak`,
      `Havacılık meraklıları için uçak tescil işaretlerinin nasıl okunduğunu görmek`,
      `Yabancı bir otel ya da hava yolu görevlisine soyadını hecelemek`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      `En sık karşılaşılan yanlış, sözcükleri uydurmaktır: "A for Apple" gibi doğaçlama karşılıklar dinleyenin beklediği diziyle uyuşmaz ve karışıklığı artırır. Standart sözcüklere bağlı kalmak, karşı taraf diziyi ezbere bilmese bile sözcükler birbirinden çok farklı olduğu için daha güvenlidir. İkinci hata, harf ile rakamı ayırmamaktır: "O" (Oscar) ile "0" (Zero), "I" (India) ile "1" (One) bu sayede karışmaz.`,
      `Araç noktalama işaretlerini, simgeleri ve emojileri kodlamaz; bunlar atlanır ve sayısı ayrıca bildirilir. Ters çeviride tanınmayan bir sözcük varsa hangi sözcüğün sorun çıkardığı hata iletisinde gösterilir. Çıktıdaki sözcüklerin yazımı uluslararası dizidedir; okunuşları için dinleyerek çalışmanız yararlı olur, çünkü bu sayfa ses üretmez.`,
    ] },
  ],
  faq: [
    ['NATO alfabesinde A neden "Alpha" değil "Alfa" yazılıyor?', 'Uluslararası dizide yazım "Alfa"dır, çünkü "ph" harf çifti her dilde "f" sesiyle okunmaz. Aynı nedenle J harfinin karşılığı çift t ile "Juliett" yazılır. Araç ters çeviride "Alpha" ve "Juliet" yazımlarını da kabul eder.'],
    ['Türkçe karakterler için kod sözcüğü var mı?', 'Hayır. Uluslararası alfabe yalnızca 26 temel Latin harfini kapsar. Araç ç, ğ, ı, İ, ö, ş, ü harflerini sırasıyla C, G, I, I, O, S, U olarak kodlar; bu, bilet ve pasaport kayıtlarındaki yazımla uyumludur.'],
    ['Rakamlar nasıl söylenir?', 'Araç rakamları Zero, One, Two, Three, Four, Five, Six, Seven, Eight, Nine olarak yazar. Telsiz konuşmasında bazı rakamların söylenişi karışmayı önlemek için değiştirilir; örneğin 9 "Niner" diye okunur. Ters çeviride bu söyleniş de tanınır.'],
    ['Kelimeler arasındaki eğik çizgi ne anlama geliyor?', 'Birden çok kelime yazdığınızda araç her kelimenin kod sözcüklerini " / " ile ayırır. Sesli okurken bu noktada kısa bir duraklama yapabilir ya da "boşluk" diyebilirsiniz. Ters yönde de "/" işareti çıktıda boşluğa dönüşür.'],
    ['Noktalama işaretleri neden çevrilmiyor?', 'Dizide noktalama için standart kod sözcüğü yoktur. Kısa çizgi, nokta, @ gibi işaretler atlanır ve "Atlanan karakter" satırında sayılır. Bunları sesli aktarırken adlarını ayrıca söylemeniz gerekir.'],
    ['Kod sözcüklerini küçük harfle yazsam olur mu?', 'Evet. Ters çeviride büyük-küçük harf ayrımı yapılmaz; "tango", "Tango" ve "TANGO" aynı harfi verir. Sözcüklerin arasında boşluk olması yeterlidir.'],
    ['Bu alfabe ile uluslararası fonetik alfabe (IPA) aynı şey mi?', 'Hayır. IPA, dillerdeki sesleri göstermek için kullanılan özel simgelerden oluşan bir yazı sistemidir. Buradaki dizi ise harfleri sözcüklerle hecelemeye yarayan bir heceleme alfabesidir; ikisinin amacı farklıdır.'],
    ['Yazdığım metin bir sunucuya gönderiliyor mu?', 'Hayır. Çeviri bütünüyle tarayıcınızda yapılır; yazdığınız ad, kod ya da numara hiçbir yere iletilmez ve saklanmaz.'],
  ],
  related: ['braille-cevir', 'ikili-metin-cevir', 'sezar-sifreleme', 'turkce-karakter-donustur', 'ascii-kod-cevir'],
};
