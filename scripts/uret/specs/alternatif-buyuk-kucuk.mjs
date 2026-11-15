export default {
  slug: 'alternatif-buyuk-kucuk',
  title: 'Alternatif Büyük Küçük Harf Yazma',
  h1Tail: 'bİr BüYüK bİr KüÇüK',
  pageTitle: 'Alternatif Büyük Küçük Harf Yazma – Sırayla Büyük Küçük Harf',
  description: 'Metni bir büyük bir küçük harfle yazın: mErHaBa ya da MeRhAbA. Türkçe İ ve I harflerine uyar; boşlukları sayma ve her kelimede baştan başlama seçenekleri vardır.',
  card: 'Metni sırayla bir küçük bir büyük harfe çevirin (mErHaBa); Türkçe İ/I doğru işlenir, başlangıç harfini siz seçersiniz.',
  category: 'metin',
  keywords: ['alternatif büyük küçük harf', 'bir büyük bir küçük harf yazma', 'sırayla büyük küçük harf', 'alaycı yazı', 'alternating caps', 'karışık harf yazı', 'büyük küçük harf dönüştürücü'],
  lead: 'Yazdığınız metni harfleri sırayla <strong>bir küçük bir büyük</strong> olacak biçimde dönüştürün. Sosyal medyada alaycı bir tonu vurgulamak, dikkat çekici bir başlık hazırlamak ya da bir yazı tipini denemek için kullanılan bu biçimi Türkçe harf kuralına uygun üretir.',
  button: 'Dönüştür',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Örn. tabii ki haklısın', wide: true },
    { id: 'baslangic', label: 'İlk harf', type: 'select', options: [['kucuk', 'Küçük başlasın (mErHaBa)'], ['buyuk', 'Büyük başlasın (MeRhAbA)']] },
    { id: 'sayim', label: 'Sıra nasıl sayılsın?', type: 'select', options: [['harf', 'Yalnızca harfler sayılsın'], ['hepsi', 'Boşluk ve işaretler de sayılsın'], ['kelime', 'Her kelimede baştan başlasın']] },
    { id: 'dil', label: 'Harf kuralı', type: 'select', options: [['tr', 'Türkçe (i ↔ İ, ı ↔ I)'], ['en', 'İngilizce (i ↔ I)']] },
  ],
  compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Dönüştürmek için "Metin" alanına bir metin yazın.');
    if (!/\p{L}/u.test(s)) h.err('Metinde harf bulunamadı. Büyük küçük harf yalnızca harflere uygulanabilir.');
    const tr = v.dil !== 'en';
    const kucuk = (x) => (tr ? x.replace(/I/g, 'ı').replace(/İ/g, 'i') : x.replace(/İ/g, 'i')).toLowerCase();
    const buyuk = (x) => (tr ? x.replace(/i/g, 'İ').replace(/ı/g, 'I') : x.replace(/ı/g, 'I')).toUpperCase();
    const ilkBuyuk = v.baslangic === 'buyuk';
    let sira = 0, nb = 0, nk = 0, o = '';
    for (const c of Array.from(s)) {
      const harf = /\p{L}/u.test(c);
      if (v.sayim === 'kelime' && /\s/.test(c)) { sira = 0; o += c; continue; }
      if (!harf) { o += c; if (v.sayim === 'hepsi' && c !== '\n') sira++; continue; }
      const cift = sira % 2 === 0;
      const b = cift === ilkBuyuk;
      const y = b ? buyuk(c) : kucuk(c);
      // Büyük/küçük biçimi olmayan harfler (ör. Arapça, Çince) sayılır ama değişmez
      if (y !== kucuk(c) || buyuk(c) !== kucuk(c)) { if (b) nb++; else nk++; }
      o += y;
      sira++;
    }
    return {
      rows: [
        ['Büyük harf', h.fmt(nb, 0)],
        ['Küçük harf', h.fmt(nk, 0)],
        ['Toplam harf', h.fmt(nb + nk, 0)],
      ],
      text: o,
      note: v.sayim === 'hepsi' ? 'Boşluk, rakam ve noktalama işaretleri de sırada bir yer tuttu; satır sonları sayılmadı.' : v.sayim === 'kelime' ? 'Sıra her kelimenin başında yeniden başlatıldı.' : 'Boşluk, rakam ve noktalama işaretleri sırayı etkilemedi; yalnızca harfler sayıldı.',
    };
  },
  cases: [
    { in: { metin: 'merhaba', baslangic: 'kucuk' }, out: { 'Büyük harf': '3', 'Küçük harf': '4', 'Toplam harf': '7' }, text: 'mErHaBa' },
    { in: { metin: 'merhaba', baslangic: 'buyuk' }, out: { 'Büyük harf': '4', 'Küçük harf': '3' }, text: 'MeRhAbA' },
    { in: { metin: 'merhaba dünya', baslangic: 'kucuk', sayim: 'harf' }, text: 'mErHaBa DüNyA' },
    { in: { metin: 'merhaba dünya', baslangic: 'kucuk', sayim: 'hepsi' }, text: 'mErHaBa dÜnYa' },
    { in: { metin: 'MERHABA DÜNYA', baslangic: 'kucuk', sayim: 'kelime' }, text: 'mErHaBa dÜnYa' },
    { in: { metin: 'ışık iyi', baslangic: 'buyuk', dil: 'tr' }, text: 'IşIk İyİ' },
    { in: { metin: 'ii', baslangic: 'buyuk', dil: 'en' }, text: 'Ii' },
    { in: { metin: 'a1b2c', baslangic: 'buyuk', sayim: 'harf' }, out: { 'Toplam harf': '3' }, text: 'A1b2C' },
    { in: { metin: '' }, error: true },
    { in: { metin: '12345 ...' }, error: true },
  ],
  howto: [
    'Dönüştürmek istediğiniz cümleyi "Metin" kutusuna yazın ya da yapıştırın. Metnin önceden büyük ya da küçük harfli olması sonucu değiştirmez.',
    '"İlk harf" listesinden dizinin küçük harfle mi büyük harfle mi başlayacağını seçin.',
    '"Sıra nasıl sayılsın?" seçeneğiyle boşlukların sırayı etkileyip etkilemeyeceğini ya da her kelimenin baştan başlayıp başlamayacağını belirleyin.',
    'Metin Türkçeyse harf kuralını "Türkçe" bırakın; İngilizce metinde "İngilizce" seçin.',
    '"Dönüştür" düğmesine basın ve sonucu kopyalayıp istediğiniz yere yapıştırın.',
  ],
  sections: [
    { h: 'Alternatif büyük küçük harf nedir?', p: [
      'Alternatif büyük küçük harf, bir metindeki harflerin sırayla bir küçük bir büyük yazıldığı biçimdir: <code>mErHaBa</code>. İngilizcede "alternating caps" olarak anılır. İnternet kültüründe bu yazım, birinin sözünü alaycı bir ses tonuyla tekrarlamak için kullanılır; okuyan kişi cümleyi inişli çıkışlı, dalga geçen bir sesle duyar. Yazılı iletişimde ses tonu aktarılamadığı için bu biçim, ironiyi görünür kılmanın yollarından biri hâline gelmiştir.',
      'Mizah dışında da kullanım alanı vardır. Tasarımcılar bir yazı tipinin büyük ve küçük harflerinin yan yana nasıl durduğunu görmek için, yazılımcılar bir arama ya da karşılaştırma işlevinin büyük küçük harfe duyarlı olup olmadığını sınamak için, öğretmenler ise harf tanıma alıştırmaları hazırlamak için bu tür metinlerden yararlanır.',
    ] },
    { h: 'Sıra nasıl hesaplanır?', p: [
      'Araç metni baştan sona okur ve her harfe bir sıra numarası verir. Numaralandırma sıfırdan başlar. "Küçük başlasın" seçiliyken çift sıradaki harfler (0, 2, 4…) küçük, tek sıradakiler (1, 3, 5…) büyük yazılır; "Büyük başlasın" seçiliyken bunun tersi uygulanır. Girdideki harflerin önceki büyüklüğü dikkate alınmaz; <code>MERHABA</code> ile <code>merhaba</code> aynı sonucu verir.',
      'Çözümlü örnek: <code>merhaba</code> yedi harflidir. Küçük başlangıçla m(0) küçük, e(1) büyük, r(2) küçük, h(3) büyük, a(4) küçük, b(5) büyük, a(6) küçük olur ve <code>mErHaBa</code> elde edilir: üç büyük, dört küçük harf. Büyük başlangıçla aynı kelime <code>MeRhAbA</code> olur: dört büyük, üç küçük harf.',
    ] },
    { h: 'Üç sayım biçimi arasındaki fark', p: [
      'Birden çok kelime olduğunda boşluğun sırada yer tutup tutmayacağı sonucu değiştirir. Aynı girdi, <code>merhaba dünya</code>, üç seçenekle şu sonuçları verir:',
    ], ul: [
      '<strong>Yalnızca harfler sayılsın:</strong> Boşluk atlanır, sıra kesintisiz sürer. "merhaba" yedi harf olduğu için "dünya" kelimesinin ilk harfi 7. sıraya denk gelir ve büyük yazılır: <code>mErHaBa DüNyA</code>. Görsel olarak en düzenli dalgalanma bu seçenekle elde edilir.',
      '<strong>Boşluk ve işaretler de sayılsın:</strong> Boşluk 7. sırayı kullanır, "d" 8. sıraya düşer ve küçük kalır: <code>mErHaBa dÜnYa</code>. Karakter konumuna göre çalışan eski araçlarla aynı sonucu almak istiyorsanız bunu seçin.',
      '<strong>Her kelimede baştan başlasın:</strong> Sıra her boşluktan sonra sıfırlanır; bütün kelimeler aynı türde harfle başlar: <code>mErHaBa dÜnYa</code>. Bu örnekte ikinci seçenekle aynı sonucu verir, ancak kelime uzunlukları değiştikçe ikisi ayrışır.',
    ] },
    { h: 'Türkçe harflerde doğru dönüşüm', p: [
      'Türkçede noktalı ve noktasız i iki ayrı harftir: <code>i</code> harfinin büyüğü <code>İ</code>, <code>ı</code> harfinin büyüğü <code>I</code> olur. İngilizce kurala göre çalışan dönüştürücüler küçük <code>i</code> harfini noktasız <code>I</code> yapar ve Türkçe kelimeyi bozar. Örneğin <code>iyi</code> kelimesi büyük başlangıçla <code>İyİ</code> olmalıdır; İngilizce kuralla <code>IyI</code> çıkar ve "ıyı" gibi okunur.',
      'Araç, Türkçe kural seçiliyken dört harfi de doğru eşleştirir. Çözümlü örnek: <code>ışık iyi</code> girdisi büyük başlangıç ve harf sayımıyla <code>IşIk İyİ</code> olur. Noktasız ı harfleri noktasız I, noktalı i harfleri noktalı İ biçimine gelir. Ç, Ğ, Ö, Ş ve Ü harflerinde iki kural arasında fark yoktur.',
    ] },
    { h: 'Kullanırken dikkat edilecekler', ul: [
      '<strong>Okunabilirlik:</strong> Bu yazım bilerek zor okunur. Uzun paragraflarda, resmî yazışmalarda ya da bilgi vermesi gereken metinlerde kullanmayın; bir iki cümleyle sınırlı tutun.',
      '<strong>Ekran okuyucular:</strong> Görme engelli kullanıcıların kullandığı ekran okuyucular karışık büyüklükteki harfleri bazen harf harf ya da kısaltma gibi seslendirir. Herkese açık paylaşımlarda bunu göz önünde bulundurun.',
      '<strong>Parola olarak kullanmayın:</strong> Bilinen bir kelimeyi sırayla büyük küçük yazmak tahmin edilmesi kolay bir desendir ve parolayı güçlendirmez.',
      '<strong>Rakam ve işaretler:</strong> Rakamların ve noktalama işaretlerinin büyük küçük biçimi olmadığından oldukları gibi kalır; yalnızca seçtiğiniz sayım biçimine göre sırada yer tutabilirler.',
      '<strong>Rastgele değil:</strong> Sonuç her zaman aynıdır; aynı metin ve aynı ayarlarla her seferinde aynı çıktıyı alırsınız.',
    ] },
  ],
  faq: [
    ['Bir büyük bir küçük harfle nasıl yazı yazılır?', 'Metninizi kutuya yazın ve "Dönüştür" düğmesine basın. Araç harfleri sırayla küçük ve büyük yapar. Elle yazarken her harfte Shift tuşuna basıp bırakmak gerekir; uzun metinlerde bu araç işi saniyeler içinde bitirir.'],
    ['Bu yazı biçimi ne anlama geliyor?', 'İnternet yazışmalarında çoğunlukla alay ya da ironi bildirir; karşıdakinin sözünü küçümseyen bir ses tonuyla tekrar ettiğinizi ima eder. Bu yüzden resmî ya da ciddi bir bağlamda yanlış anlaşılabilir.'],
    ['İlk harf büyük mü küçük mü olmalı?', 'Kesin bir kural yoktur. Küçük harfle başlayan biçim (mErHaBa) alaycı kullanımda daha yaygındır; büyük harfle başlayan biçim (MeRhAbA) ise başlık gibi görünür. İkisini de deneyip beğendiğinizi seçebilirsiniz.'],
    ['Boşluklar sırayı neden değiştiriyor?', 'Boşluk sırada bir yer tutarsa ardından gelen harfin büyüklüğü tersine döner. Harflerin kesintisiz dalgalanmasını istiyorsanız "Yalnızca harfler sayılsın", karakter konumuna göre işlem istiyorsanız "Boşluk ve işaretler de sayılsın" seçeneğini kullanın.'],
    ['Türkçe karakterler bozulur mu?', 'Hayır. Türkçe kural seçiliyken i harfi İ, ı harfi I olur; ç, ğ, ö, ş, ü harfleri de kendi büyük biçimlerine çevrilir. İngilizce bir metin dönüştürüyorsanız kuralı İngilizce yapın.'],
    ['Metnim zaten büyük harfliyse sonuç değişir mi?', 'Hayır. Araç girdideki harflerin büyüklüğüne bakmaz; her harfi sıradaki yerine göre yeniden biçimlendirir. Tümü büyük, tümü küçük ya da karışık yazılmış aynı metin aynı sonucu verir.'],
    ['Rastgele büyük küçük harf üretebilir miyim?', 'Bu araç düzenli bir sıra izler; rastgele dağılım üretmez. Düzenli desen çoğu kullanım için daha okunaklı ve tekrarlanabilir bir sonuç verir.'],
    ['Yazdıklarım saklanıyor mu?', 'Hayır. Dönüşüm tarayıcınızda yapılır; metniniz sunucuya gönderilmez, kaydedilmez ve sayfayı kapattığınızda kaybolur.'],
  ],
  related: ['buyuk-kucuk-harf-donustur', 'ilk-harf-buyut', 'cumle-duzeni', 'metni-ters-cevir', 'yazi-stili'],
};
