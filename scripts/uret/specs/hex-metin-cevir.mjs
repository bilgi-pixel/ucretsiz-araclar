export default {
  slug: 'hex-metin-cevir',
  title: 'Metni Hex Koda Çevirme',
  h1Tail: 'metin ↔ onaltılık',
  pageTitle: 'Metni Hex Koda Çevirme – Onaltılık (Hex) Metin Çevirici',
  description: 'Metni onaltılık (hex) koda çevirin ya da hex kodu metne dönüştürün. UTF-8 baytlarını boşluklu, bitişik ya da 0x önekli biçimde yazar; Türkçe harfleri destekler.',
  card: 'Yazıyı onaltılık (hex) bayt koduna çevirin ya da hex dizisini metne geri dönüştürün; boşluklu, bitişik ve 0x önekli biçimler.',
  category: 'metin',
  keywords: ['metni hex çevirme', 'hex metin çevirici', 'hex to text', 'text to hex', 'onaltılık kod çevirme', 'hex kod çözme', 'hexadecimal çevirici', 'utf-8 hex'],
  lead: 'Metni, her baytı iki onaltılık basamakla gösteren <strong>hex koda</strong> çevirin ya da elinizdeki hex dizisini okunabilir metne dönüştürün. Kodlama UTF-8 ile yapılır; çıktı biçimini boşluklu, bitişik, <code>0x</code> önekli ya da iki nokta ayraçlı seçebilirsiniz.',
  button: 'Çevir',
  inputs: [
    { id: 'girdi', label: 'Metin ya da hex kod', type: 'textarea', placeholder: 'Merhaba   ya da   4D 65 72 68 61 62 61', wide: true },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['hex', 'Metin → Hex kod'], ['metin', 'Hex kod → Metin']] },
    { id: 'bicim', label: 'Hex yazım biçimi', type: 'select', options: [['bosluk', 'Boşluklu: 4D 65'], ['yok', 'Bitişik: 4D65'], ['onek', '0x önekli: 0x4D 0x65'], ['nokta', 'İki noktalı: 4D:65']] },
    { id: 'harf', label: 'Harf biçimi', type: 'select', options: [['buyuk', 'Büyük harf (A–F)'], ['kucuk', 'Küçük harf (a–f)']] },
  ],
  compute(v, h) {
    const s = String(v.girdi ?? '');
    if (s.trim() === '') h.err('Çevirmek için kutuya bir metin ya da hex kod yazın.');
    if (v.yon === 'metin') {
      const hex = s.replace(/0x|\\x/gi, '').replace(/[\s,;:\-]+/g, '');
      const kotu = /[^0-9a-f]/i.exec(hex);
      if (kotu) h.err(`Hex kod yalnızca 0–9 ve A–F içerebilir; "${kotu[0]}" karakteri geçersiz. Metni koda çevirmek istiyorsanız yönü değiştirin.`);
      if (hex.length === 0) h.err('Kutuda çevrilecek hex basamağı bulunamadı.');
      if (hex.length % 2 !== 0) h.err(`Her bayt iki hex basamağıdır. Girilen ${hex.length} basamak çift sayı değil; eksik ya da fazla basamak olup olmadığını denetleyin.`);
      const bayt = new Uint8Array(hex.length / 2);
      for (let i = 0; i < bayt.length; i++) bayt[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
      let metin;
      try { metin = new TextDecoder('utf-8', { fatal: true }).decode(bayt); }
      catch (e) { h.err('Bu bayt dizisi geçerli bir UTF-8 metni değil. Kod başka bir kodlamayla üretilmiş, ikili (metin olmayan) veri içeriyor ya da eksik kopyalanmış olabilir.'); }
      return {
        rows: [
          ['Bayt sayısı', h.fmt(bayt.length, 0)],
          ['Hex basamak sayısı', h.fmt(hex.length, 0)],
          ['Karakter sayısı', h.fmt(Array.from(metin).length, 0)],
        ],
        text: metin,
        note: 'Baytlar UTF-8 olarak çözüldü. 0x ve \\x önekleri, boşluk, virgül, iki nokta ve tire ayraç sayılır.',
      };
    }
    const metin = s.replace(/\r\n?/g, '\n');
    const bayt = new TextEncoder().encode(metin);
    const kucuk = v.harf === 'kucuk';
    const cift = Array.from(bayt, (b) => { const x = b.toString(16).padStart(2, '0'); return kucuk ? x : x.toUpperCase(); });
    let cikti;
    if (v.bicim === 'yok') cikti = cift.join('');
    else if (v.bicim === 'onek') cikti = cift.map((x) => '0x' + x).join(' ');
    else if (v.bicim === 'nokta') cikti = cift.join(':');
    else cikti = cift.join(' ');
    const karakter = Array.from(metin).length;
    return {
      rows: [
        ['Bayt sayısı', h.fmt(bayt.length, 0)],
        ['Hex basamak sayısı', h.fmt(bayt.length * 2, 0)],
        ['Karakter sayısı', h.fmt(karakter, 0)],
      ],
      text: cikti,
      note: bayt.length > karakter ? 'ASCII dışındaki karakterler UTF-8\'de birden çok bayt tuttuğu için bayt sayısı karakter sayısından fazladır.' : 'Metindeki her karakter ASCII olduğu için tek bayt, yani iki hex basamağı tutar.',
    };
  },
  cases: [
    { in: { girdi: 'Merhaba', yon: 'hex', bicim: 'bosluk', harf: 'buyuk' }, out: { 'Bayt sayısı': '7', 'Hex basamak sayısı': '14', 'Karakter sayısı': '7' }, text: '4D 65 72 68 61 62 61' },
    { in: { girdi: '4D 65 72 68 61 62 61', yon: 'metin' }, out: { 'Bayt sayısı': '7', 'Karakter sayısı': '7' }, text: 'Merhaba' },
    { in: { girdi: 'ş', yon: 'hex', bicim: 'bosluk', harf: 'buyuk' }, out: { 'Bayt sayısı': '2', 'Karakter sayısı': '1' }, text: 'C5 9F' },
    { in: { girdi: 'Hi', yon: 'hex', bicim: 'onek', harf: 'buyuk' }, text: '0x48 0x69' },
    { in: { girdi: 'Hi!', yon: 'hex', bicim: 'yok', harf: 'kucuk' }, text: '486921' },
    { in: { girdi: '€', yon: 'hex', bicim: 'nokta', harf: 'kucuk' }, out: { 'Bayt sayısı': '3' }, text: 'e2:82:ac' },
    { in: { girdi: '0x48,0x69', yon: 'metin' }, text: 'Hi' },
    { in: { girdi: 'c3:a7', yon: 'metin' }, out: { 'Bayt sayısı': '2', 'Karakter sayısı': '1' }, text: 'ç' },
    { in: { girdi: '48656c6c6f', yon: 'metin' }, out: { 'Hex basamak sayısı': '10' }, text: 'Hello' },
    { in: { girdi: '4G', yon: 'metin' }, error: true },
    { in: { girdi: '4D6', yon: 'metin' }, error: true },
    { in: { girdi: 'FF', yon: 'metin' }, error: true },
    { in: { girdi: '   ', yon: 'hex' }, error: true },
  ],
  howto: [
    'Kutuya çevirmek istediğiniz metni ya da hex kodu yazın veya yapıştırın.',
    '"Çeviri yönü" listesinden metinden hex koda mı, hex koddan metne mi çevireceğinizi seçin.',
    'Metni koda çevirirken "Hex yazım biçimi" ve "Harf biçimi" ile çıktının görünümünü belirleyin. Koddan metne çevirirken bu iki seçenek dikkate alınmaz; araç bütün yaygın biçimleri kendiliğinden tanır.',
    '"Çevir" düğmesine basın. Bayt, basamak ve karakter sayıları sonuç satırlarında, çeviri çıktı kutusunda görünür.',
    'Sonucu kopyalayıp kod düzenleyicinize, belgenize ya da hata ayıklama notlarınıza yapıştırın.',
  ],
  sections: [
    { h: 'Hex (onaltılık) gösterim nedir?', p: [
      'Onaltılık sayı sistemi 16 tabanlıdır ve basamak olarak 0–9 rakamlarıyla birlikte A, B, C, D, E, F harflerini kullanır; A 10, F 15 değerindedir. Bir baytın alabileceği 256 değer, tam olarak iki onaltılık basamakla yazılabilir: <code>00</code> en küçük, <code>FF</code> en büyük değerdir. Bu düzgün eşleşme hex gösterimi, bayt verisini okumanın en yaygın yolu hâline getirmiştir.',
      'Aynı bayt ikili sistemde sekiz basamak tutar; hex yazım dört kat daha kısadır ve her hex basamağı tam dört bite karşılık geldiği için ikiliye geri dönmek de kolaydır. Örneğin <code>4D</code> baytında 4, ikili <code>0100</code>; D ise <code>1101</code> demektir. Onluk değeri 4 × 16 + 13 = 77\'dir ve bu, büyük "M" harfinin kodudur.',
    ] },
    { h: 'Metin hex koda nasıl çevrilir?', p: [
      'Araç önce metni <strong>UTF-8</strong> kodlamasıyla bayt dizisine çevirir, sonra her baytı iki hex basamağıyla yazar. İngiliz alfabesinin harfleri, rakamlar ve temel noktalama işaretleri tek bayt tutar ve kodları ASCII tablosuyla aynıdır. Türkçeye özgü harfler iki bayt, avro simgesi gibi bazı işaretler üç bayt, emojiler çoğunlukla dört bayt olarak kodlanır.',
      '<strong>Çözümlü örnek:</strong> "Merhaba" kelimesinin harf kodları sırasıyla M = 77, e = 101, r = 114, h = 104, a = 97, b = 98, a = 97\'dir. Bunların onaltılık karşılıkları 4D, 65, 72, 68, 61, 62, 61 olur. Sonuç <strong>4D 65 72 68 61 62 61</strong>; 7 karakter, 7 bayt ve 14 hex basamağıdır. Tek harflik "ş" girdisi ise <strong>C5 9F</strong> verir: 1 karakter ama 2 bayt.',
    ] },
    { h: 'Yazım biçimleri', ul: [
      '<strong>Boşluklu (4D 65):</strong> hex döküm araçlarının ve ağ çözümleyicilerinin alışıldık görünümü; gözle okumak için en rahat biçim.',
      '<strong>Bitişik (4D65):</strong> özet değerleri, anahtarlar ve veritabanı alanları için yaygın, en kısa yazım.',
      '<strong>0x önekli (0x4D 0x65):</strong> C, Java, JavaScript, Python gibi dillerde onaltılık sayı yazımı; değerleri bir diziye yapıştırırken kullanışlıdır.',
      '<strong>İki noktalı (4D:65):</strong> ağ donanım adreslerinde ve sertifika parmak izlerinde görülen biçim.',
      '<strong>Büyük ya da küçük harf:</strong> 4D ile 4d aynı değerdir; seçim yalnızca görünümle ve çalıştığınız aracın alışkanlığıyla ilgilidir.',
    ] },
    { h: 'Hex kod metne nasıl çevrilir?', p: [
      'Ters yönde araç girdideki <code>0x</code> ve <code>\\x</code> öneklerini, boşlukları, virgülleri, iki noktaları, tireleri ve satır sonlarını temizler. Kalan basamaklar ikişer ikişer baytlara çevrilir ve bayt dizisi UTF-8 olarak çözülür. Böylece farklı kaynaklardan kopyalanmış, biçimi birbirini tutmayan kodlar da tek adımda okunur.',
      'Girdide 0–9 ve A–F dışında bir karakter varsa, basamak sayısı tek ise ya da baytlar geçerli bir UTF-8 dizisi oluşturmuyorsa araç nedenini açıklayan bir hata gösterir. Son durum çoğunlukla verinin metin olmadığını (örneğin bir resim ya da sıkıştırılmış dosya parçası olduğunu), eksik kopyalandığını ya da eski bir Türkçe kod sayfasıyla üretildiğini gösterir. Tek bir <code>FF</code> baytı buna örnektir: UTF-8\'de hiçbir karakterin kodlamasında yer almaz.',
    ] },
    { h: 'Hızlı başvuru', ul: [
      '<strong>Boşluk</strong> = <code>20</code>, <strong>satır sonu</strong> = <code>0A</code>',
      '<strong>0–9</strong> rakamları = <code>30</code>–<code>39</code>',
      '<strong>A–Z</strong> = <code>41</code>–<code>5A</code>, <strong>a–z</strong> = <code>61</code>–<code>7A</code>',
      '<strong>ç</strong> = <code>C3 A7</code>, <strong>Ç</strong> = <code>C3 87</code>',
      '<strong>ğ</strong> = <code>C4 9F</code>, <strong>Ğ</strong> = <code>C4 9E</code>',
      '<strong>ı</strong> = <code>C4 B1</code>, <strong>İ</strong> = <code>C4 B0</code>',
      '<strong>ö</strong> = <code>C3 B6</code>, <strong>Ö</strong> = <code>C3 96</code>',
      '<strong>ş</strong> = <code>C5 9F</code>, <strong>Ş</strong> = <code>C5 9E</code>',
      '<strong>ü</strong> = <code>C3 BC</code>, <strong>Ü</strong> = <code>C3 9C</code>',
    ] },
    { h: 'Kullanım alanları ve sınırlar', p: [
      'Hex gösterim en çok yazılım geliştirme ve hata ayıklamada işe yarar. Bir web sayfasında Türkçe harfler bozuk görünüyorsa metnin baytlarına bakmak, sorunun kodlamadan mı yoksa yazı tipinden mi kaynaklandığını gösterir: "ş" yerine C5 9F görüyorsanız veri UTF-8\'dir; tek bayt görüyorsanız eski bir kod sayfası kullanılmıştır. Ağ paketlerini, seri port çıktılarını, günlük dosyalarındaki kaçış dizilerini ve gömülü sistem iletilerini okurken de hex metin çevirisi gerekir. Bilişim derslerinde ve bulmacalarda da sık kullanılır.',
      'Hex bir şifreleme değil, yalnızca bir yazım biçimidir; kodu gören herkes metne geri çevirebilir. Parola ya da kişisel veri gizlemek için kullanmayın. Araç metin içindir: ikili dosya içeriğini temsil eden hex dökümleri UTF-8 metni olmadığı için çözülemez.',
    ] },
  ],
  faq: [
    ['Bir karakter kaç hex basamağı tutar?', 'ASCII karakterleri 1 bayt, yani 2 hex basamağı tutar. Türkçeye özgü harfler UTF-8\'de 2 bayt (4 basamak), emojiler çoğunlukla 4 bayt (8 basamak) tutar.'],
    ['Büyük harfli ve küçük harfli hex arasında fark var mı?', 'Değer olarak yoktur; 4D ile 4d aynı baytı gösterir. Araç çözerken ikisini de kabul eder, kodlarken tercihinize göre yazar.'],
    ['0x öneki ne anlama gelir?', 'Birçok programlama dilinde bir sayının onaltılık olduğunu belirten işarettir. 0x4D, onluk 77 demektir. Araç çözerken bu önekleri kendiliğinden atar.'],
    ['"Geçerli bir UTF-8 metni değil" hatası ne demek?', 'Baytlar UTF-8 kurallarına uymuyor demektir. Veri metin olmayabilir, eksik kopyalanmış olabilir ya da Windows-1254 gibi başka bir kodlamayla üretilmiş olabilir.'],
    ['Hex kodu tek basamak eksik yapıştırırsam ne olur?', 'Basamak sayısı tek olacağı için araç hata verir ve girilen basamak sayısını bildirir. Baştaki sıfırı atılmış baytları (örneğin A yerine 0A) iki basamağa tamamlayın.'],
    ['Hex ile Base64 arasındaki fark nedir?', 'İkisi de bayt verisini yazdırılabilir karakterlerle göstermenin yoludur. Hex her bayt için iki karakter kullanır ve gözle okunması kolaydır; Base64 daha az yer tutar ama doğrudan okunamaz.'],
    ['Renk kodlarını bu araçla çevirebilir miyim?', 'Hayır. #FF8800 gibi renk kodları metin değil, üç renk bileşeninin sayısal değeridir. Bu araç metnin baytlarını gösterir; renk dönüşümü için renk araçlarını kullanın.'],
    ['Yazdığım metin sunucuya gönderiliyor mu?', 'Hayır. Çeviri tarayıcınızın içinde yapılır; ne metin ne de kod bir yere iletilir ya da saklanır.'],
  ],
  related: ['ikili-metin-cevir', 'ascii-kod-cevir', 'unicode-kod-noktasi', 'base64-donustur', 'sayi-tabani-donustur', 'metin-sha256-hesapla'],
};
