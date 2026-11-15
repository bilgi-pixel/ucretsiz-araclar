export default {
  slug: 'onaltilik-ondalik-cevir',
  title: 'Onaltılık (Hex) Ondalık Çevirici',
  h1Tail: '16\'lık ↔ 10\'luk taban',
  pageTitle: 'Onaltılık (Hex) Ondalık Çevirici – Hex\'ten Ondalığa Çevirme',
  description: 'Onaltılık (hex) sayıyı ondalığa, ondalık sayıyı hex\'e çevirin. İkili ve sekizlik karşılığı ile altı haneli renk kodlarının RGB değerleri de gösterilir.',
  card: 'Hex sayıyı ondalığa, ondalık sayıyı hex\'e çevirin; ikili karşılığını ve renk kodlarının RGB değerini görün.',
  category: 'matematik',
  keywords: ['hex ondalık çevirme', 'onaltılık ondalık çevirici', 'hex to decimal', 'ondalık hex çevirme', '16lık tabandan 10luk tabana', 'hexadecimal hesaplama', 'FF kaç eder', 'hex renk kodu rgb'],
  lead: `Onaltılık (hexadecimal) bir sayıyı ondalık karşılığına ya da ondalık bir tam sayıyı onaltılık gösterime çevirin. Araç <code>0x</code> ve <code>#</code> ön eklerini tanır; altı haneli renk kodlarında <strong>RGB değerlerini</strong> de verir.`,
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Sayı', type: 'text', placeholder: 'Örn. FF ya da 255', hint: 'Hex için 0–9 ve A–F kullanılır; büyük ya da küçük harf fark etmez.' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['hex', 'Onaltılık → Ondalık'], ['ondalik', 'Ondalık → Onaltılık']] },
  ],
  compute(v, h) {
    let t = String(v.deger ?? '').trim().replace(/[\s_]/g, '').replace(/−/g, '-');
    if (t === '') h.err('"Sayı" alanını doldurun.');
    let eksi = false;
    if (t[0] === '-') { eksi = true; t = t.slice(1); } else if (t[0] === '+') t = t.slice(1);
    let n, renk = null;
    if (v.yon === 'ondalik') {
      if (/^\d+[.,]\d+$/.test(t)) h.err('Bu araç yalnızca tam sayıları çevirir; ondalık kısmı olmayan bir sayı yazın.');
      if (!/^\d+$/.test(t)) h.err('Ondalık sayı yalnızca 0–9 rakamlarından oluşur. Harf içeren bir değer yazdıysanız çeviri yönünü "Onaltılık → Ondalık" yapın.');
      if (t.length > 60) h.err('Sayı çok uzun; en fazla 60 basamak yazın.');
      n = BigInt(t);
    } else {
      t = t.replace(/^(0x|#)/i, '');
      if (!/^[0-9a-f]+$/i.test(t)) h.err('Onaltılık sayı yalnızca 0–9 rakamları ve A–F harflerinden oluşur; diğer karakterleri silin.');
      if (t.length > 50) h.err('Onaltılık sayı çok uzun; en fazla 50 basamak yazın.');
      n = BigInt('0x' + t);
      if (t.length === 6 && !eksi) renk = [0, 2, 4].map((i) => parseInt(t.slice(i, i + 2), 16)).join(', ');
    }
    if (n === 0n) eksi = false;
    const s = eksi ? '-' : '';
    const hexSatir = ['Onaltılık', s + n.toString(16).toUpperCase()], ondalikSatir = ['Ondalık', s + n.toString(10)];
    const rows = [
      ...(v.yon === 'ondalik' ? [hexSatir, ondalikSatir] : [ondalikSatir, hexSatir]),
      ['İkili', s + n.toString(2)],
      ['Sekizlik', s + n.toString(8)],
    ];
    if (renk) rows.push(['Renk kodu olarak RGB', renk]);
    return { rows, note: 'Onaltılık basamaklar: A = 10, B = 11, C = 12, D = 13, E = 14, F = 15.' };
  },
  cases: [
    { in: { deger: 'FF', yon: 'hex' }, out: { 'Ondalık': '255', 'İkili': '11111111', 'Sekizlik': '377' } },
    { in: { deger: '255', yon: 'ondalik' }, out: { 'Onaltılık': 'FF', 'İkili': '11111111' } },
    { in: { deger: '1A3', yon: 'hex' }, out: { 'Ondalık': '419' } },
    { in: { deger: '4096', yon: 'ondalik' }, out: { 'Onaltılık': '1000' } },
    { in: { deger: '0x7b', yon: 'hex' }, out: { 'Ondalık': '123', 'Onaltılık': '7B' } },
    { in: { deger: 'DEADBEEF', yon: 'hex' }, out: { 'Ondalık': '3735928559' } },
    { in: { deger: '#FF8800', yon: 'hex' }, out: { 'Ondalık': '16746496', 'Renk kodu olarak RGB': '255, 136, 0' } },
    { in: { deger: '1000', yon: 'ondalik' }, out: { 'Onaltılık': '3E8' } },
    { in: { deger: 'G1', yon: 'hex' }, error: true },
    { in: { deger: 'FF', yon: 'ondalik' }, error: true },
    { in: { deger: '', yon: 'hex' }, error: true },
  ],
  howto: [
    `Çevirmek istediğiniz değeri "Sayı" alanına yazın. Onaltılık sayıları FF, ff, 0xFF ya da #FF8800 biçimlerinden herhangi biriyle girebilirsiniz.`,
    `"Çeviri yönü" listesinden onaltılıktan ondalığa mı, ondalıktan onaltılığa mı çevireceğinizi seçin.`,
    `"Çevir" düğmesine basın. İlk satırda aradığınız karşılık, altında aynı sayının ikili ve sekizlik yazımı görünür.`,
    `Altı haneli bir renk kodu yazdıysanız en alttaki satırda kırmızı, yeşil ve mavi bileşenlerin 0–255 arasındaki değerlerini bulursunuz.`,
  ],
  sections: [
    { h: 'Onaltılık sayı sistemi nedir?', p: [
      `Onaltılık sistem, adından anlaşılacağı gibi 16 tabanlı bir sayı sistemidir. Ondalık sistemdeki on rakam yetmediği için 10'dan 15'e kadar olan değerler harflerle gösterilir: <strong>A = 10, B = 11, C = 12, D = 13, E = 14, F = 15</strong>. Basamak değerleri sağdan sola doğru 16'nın kuvvetleridir: 1, 16, 256, 4.096, 65.536 ve böyle devam eder.`,
      `Bu sistemin yaygınlaşmasının nedeni ikili sistemle olan düzgün ilişkisidir. Bir onaltılık basamak tam olarak dört bite karşılık gelir; dolayısıyla sekiz bitlik bir bayt yalnızca iki onaltılık basamakla yazılabilir. 11111111 gibi uzun bir ikili dizi yerine FF yazmak hem daha kısa hem de hataya daha kapalıdır. Programcılar, ağ yöneticileri ve tasarımcılar bu yüzden bellek adreslerini, donanım kimliklerini ve renkleri onaltılık olarak ifade eder.`,
    ] },
    { h: 'Onaltılıktan ondalığa çevirme', p: [
      `Her basamak, bulunduğu yerin 16'lı kuvvetiyle çarpılır ve sonuçlar toplanır. Harfler önce sayı değerlerine çevrilir.`,
      `<strong>Örnek 1:</strong> FF sayısında iki basamak da 15 değerindedir. Hesap 15 × 16 + 15 × 1 = 240 + 15 = <strong>255</strong> olur.`,
      `<strong>Örnek 2:</strong> 1A3 sayısını çevirelim. Basamak değerleri 256, 16 ve 1'dir; A harfi 10 demektir. Hesap 1 × 256 + 10 × 16 + 3 × 1 = 256 + 160 + 3 = <strong>419</strong> sonucunu verir.`,
      `<strong>Örnek 3:</strong> 7B sayısı 7 × 16 + 11 = 112 + 11 = <strong>123</strong> eder.`,
    ] },
    { h: 'Ondalıktan onaltılığa çevirme', p: [
      `Sayı, bölüm sıfır olana kadar art arda 16'ya bölünür. Her adımdaki kalan bir onaltılık basamaktır; 10 ve üzerindeki kalanlar harfe çevrilir. Kalanlar sondan başa doğru okunur.`,
      `<strong>Örnek:</strong> 419 sayısını çevirelim. 419 ÷ 16 = 26 kalan 3; 26 ÷ 16 = 1 kalan 10, yani A; 1 ÷ 16 = 0 kalan 1. Kalanları aşağıdan yukarıya okuduğumuzda <strong>1A3</strong> elde edilir. Benzer biçimde 1000 sayısı için kalanlar sırasıyla 8, 14 (E) ve 3 çıkar; sonuç <strong>3E8</strong>'dir. 4096 ise 16'nın üçüncü kuvveti olduğundan onaltılık sistemde 1000 olarak yazılır.`,
    ] },
    { h: 'Renk kodlarında onaltılık sayılar', p: [
      `Web tasarımında renkler çoğunlukla # işaretiyle başlayan altı haneli onaltılık kodlarla yazılır. Kodun ilk iki hanesi kırmızı, ortadaki iki hane yeşil, son iki hane mavi ışığın şiddetini gösterir. Her çift 00 ile FF, yani 0 ile 255 arasında bir değerdir. Örneğin #FF8800 kodunda kırmızı FF = 255, yeşil 88 = 136, mavi 00 = 0'dır; bu karışım canlı bir turuncu verir.`,
      `Araç altı haneli bir onaltılık değer girdiğinizde bu ayrıştırmayı kendiliğinden yapar ve RGB değerlerini ayrı bir satırda gösterir. #000000 siyah, #FFFFFF beyaz, #FF0000 saf kırmızıdır. Üç bileşen birbirine eşitse renk gri tonlarından biridir.`,
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      `<strong>A</strong> = 10, <strong>F</strong> = 15, <strong>10</strong> = 16, <strong>1F</strong> = 31`,
      `<strong>20</strong> = 32, <strong>40</strong> = 64, <strong>64</strong> = 100, <strong>7F</strong> = 127`,
      `<strong>80</strong> = 128, <strong>FF</strong> = 255, <strong>100</strong> = 256, <strong>3E8</strong> = 1.000`,
      `<strong>400</strong> = 1.024, <strong>1000</strong> = 4.096, <strong>FFFF</strong> = 65.535`,
      `<strong>FFFFFFFF</strong> = 4.294.967.295 (32 bitlik en büyük işaretsiz değer)`,
    ] },
    { h: 'Onaltılık sayılarla nerede karşılaşırsınız?', p: [
      `Ağ kartlarının fiziksel adresleri (MAC adresi) altı baytlık değerlerdir ve iki nokta ile ayrılmış altı onaltılık çift olarak yazılır. IPv6 adresleri de onaltılık gruplardan oluşur. Karakter kodlamasında her harfin bir kod noktası vardır ve bu numara genellikle onaltılık verilir: Türkçedeki büyük Ğ harfinin kod noktası 11E, yani ondalık 286'dır. Hata ayıklama ekranlarındaki bellek adresleri, dosyaların bütünlüğünü doğrulamak için kullanılan özet değerleri ve bazı cihazların hata kodları da aynı gösterimi kullanır.`,
      `Yazımda karışıklığı önlemek için onaltılık sayılar çoğu programlama dilinde 0x ön ekiyle belirtilir. "10" ifadesi tek başına on mu yoksa on altı mı anlaşılmaz; 0x10 yazıldığında değerin 16 olduğu açıktır. Araç bu ön eki ve renk kodlarındaki # işaretini kendisi ayıklar.`,
    ] },
    { h: 'Sınırlar', p: [
      `Araç tam sayıları çevirir; virgüllü ondalık sayılar ve onaltılık kesirler desteklenmez. Onaltılık yönde 50, ondalık yönde 60 basamağa kadar değer girebilirsiniz ve sonuçlar yuvarlanmadan, son basamağına kadar hesaplanır. Eksi işaretiyle yazılan sayılar işaret korunarak çevrilir; ikiye tümleyen gösterimi üretilmez. Ondalık sonuçlar, başka bir programa kolayca yapıştırılabilsin diye binlik ayırıcı olmadan yazılır.`,
    ] },
  ],
  faq: [
    ['FF onaltılık sayısı ondalıkta kaçtır?', '255\'tir. F harfi 15 değerindedir; 15 × 16 + 15 = 255 eder. Bu, bir bayta sığan en büyük değerdir.'],
    ['Onaltılık sistemde harfler hangi sayılara karşılık gelir?', 'A 10, B 11, C 12, D 13, E 14 ve F 15 değerindedir. G ve sonrasındaki harfler onaltılık sistemde kullanılmaz; yazarsanız araç uyarı verir.'],
    ['Büyük harf ile küçük harf arasında fark var mı?', 'Hayır. ff ile FF aynı sayıdır. Araç girdiyi iki biçimde de kabul eder, sonucu büyük harfle yazar.'],
    ['0x ön eki ne anlama gelir?', 'Sayının onaltılık tabanda yazıldığını belirten bir işarettir ve değeri değiştirmez. 0x7B ile 7B aynıdır ve ondalık 123 eder.'],
    ['Renk kodunu RGB değerine nasıl çeviririm?', 'Altı haneli kodu, başındaki # işaretiyle ya da onsuz yazıp "Onaltılık → Ondalık" yönünde çevirin. Son satırda kırmızı, yeşil ve mavi değerleri görünür; #FF8800 için bu değerler 255, 136 ve 0\'dır.'],
    ['Ondalık bir sayıyı elle hex\'e nasıl çeviririm?', 'Sayıyı bölüm sıfır olana kadar 16\'ya bölün ve kalanları not edin. 10 ile 15 arasındaki kalanları A–F harflerine çevirip sondan başa doğru okuyun. 419 için kalanlar 3, A ve 1 çıkar; sonuç 1A3 olur.'],
    ['Hex ile binary arasında nasıl hızlı geçiş yapılır?', 'Her onaltılık basamak dört bite denk gelir. 3E8 sayısında 3 = 0011, E = 1110 ve 8 = 1000 olduğundan ikili yazım 001111101000 olur; baştaki sıfırlar atılabilir.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Çeviri yalnızca tarayıcınızda yapılır; yazdığınız sayılar sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['sayi-tabani-donustur', 'ikili-ondalik-cevir', 'sekizlik-ondalik-cevir', 'onaltilik-hesap-makinesi', 'renk-secici'],
};
