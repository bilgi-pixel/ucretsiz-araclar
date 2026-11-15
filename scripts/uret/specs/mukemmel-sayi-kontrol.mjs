export default {
  slug: 'mukemmel-sayi-kontrol',
  title: 'Mükemmel Sayı Kontrolü',
  h1Tail: 'has bölenler toplamıyla',
  pageTitle: 'Mükemmel Sayı Kontrolü – Bir Sayı Mükemmel mi, Eksik mi, Zengin mi?',
  description: 'Bir sayının mükemmel sayı olup olmadığını kontrol edin. Has bölenleri, bölenlerin toplamı ve sayının eksik mi zengin mi olduğu adım adım gösterilir.',
  card: 'Sayının mükemmel, eksik ya da zengin olduğunu öğrenin; has bölenlerini ve toplamlarını görün.',
  category: 'matematik',
  keywords: ['mükemmel sayı', 'mükemmel sayı nedir', 'mükemmel sayı kontrolü', 'mükemmel sayılar listesi', 'has bölenler toplamı', 'eksik sayı zengin sayı', '28 mükemmel sayı mı'],
  lead: `Pozitif bir tam sayı yazın; araç sayının kendisi dışındaki bölenlerini bulup toplar ve sayının <strong>mükemmel</strong>, <strong>eksik</strong> ya da <strong>zengin</strong> olduğunu söyler. Bölenlerin listesi ve toplamı da gösterildiği için sonucu kendiniz doğrulayabilirsiniz.`,
  button: 'Kontrol et',
  inputs: [
    { id: 'sayi', label: 'Sayı', type: 'number', placeholder: 'Örn. 28', hint: '1 ile 1.000.000.000.000 arasında bir tam sayı yazın.' },
  ],
  compute(v, h) {
    const n = h.posint(v.sayi, 'Sayı');
    if (n > 1e12) h.err('Sayı en fazla 1.000.000.000.000 olabilir; daha küçük bir sayı yazın.');
    const kucuk = [], buyuk = [];
    for (let i = 1; i * i <= n; i++) {
      if (n % i === 0) {
        kucuk.push(i);
        const j = n / i;
        if (j !== i) buyuk.push(j);
      }
    }
    const has = kucuk.concat(buyuk.reverse()).filter((x) => x !== n);
    const toplam = has.reduce((a, x) => a + x, 0);
    const fark = toplam - n;
    const sonuc = fark === 0 ? 'Mükemmel sayı' : fark < 0 ? 'Mükemmel sayı değil (eksik sayı)' : 'Mükemmel sayı değil (zengin sayı)';
    const goster = has.slice(0, 40).join(', ') + (has.length > 40 ? ', …' : '');
    return {
      rows: [
        ['Sonuç', sonuc],
        ['Has bölenlerin toplamı', h.fmt(toplam, 0)],
        ['Fark (toplam − sayı)', (fark > 0 ? '+' : '') + h.fmt(fark, 0)],
        ['Has bölen adedi', String(has.length)],
        ['Has bölenler', has.length ? goster : 'Yok'],
      ],
      note: 'Has bölenler, sayının kendisi dışındaki pozitif bölenleridir. Toplam sayıya eşitse mükemmel, küçükse eksik, büyükse zengin sayıdır.',
    };
  },
  cases: [
    { in: { sayi: '28' }, out: { 'Sonuç': 'Mükemmel sayı', 'Has bölenlerin toplamı': '28', 'Has bölenler': '1, 2, 4, 7, 14', 'Fark (toplam − sayı)': '0' } },
    { in: { sayi: '12' }, out: { 'Sonuç': 'Mükemmel sayı değil (zengin sayı)', 'Has bölenlerin toplamı': '16', 'Fark (toplam − sayı)': '+4', 'Has bölenler': '1, 2, 3, 4, 6' } },
    { in: { sayi: '6' }, out: { 'Sonuç': 'Mükemmel sayı', 'Has bölenler': '1, 2, 3', 'Has bölen adedi': '3' } },
    { in: { sayi: '10' }, out: { 'Sonuç': 'Mükemmel sayı değil (eksik sayı)', 'Has bölenlerin toplamı': '8', 'Fark (toplam − sayı)': '-2' } },
    { in: { sayi: '496' }, out: { 'Sonuç': 'Mükemmel sayı', 'Has bölenler': '1, 2, 4, 8, 16, 31, 62, 124, 248' } },
    { in: { sayi: '8128' }, out: { 'Sonuç': 'Mükemmel sayı', 'Has bölenlerin toplamı': '8.128' } },
    { in: { sayi: '33550336' }, out: { 'Sonuç': 'Mükemmel sayı', 'Has bölenlerin toplamı': '33.550.336' } },
    { in: { sayi: '1' }, out: { 'Sonuç': 'Mükemmel sayı değil (eksik sayı)', 'Has bölenlerin toplamı': '0', 'Has bölenler': 'Yok' } },
    { in: { sayi: '220' }, out: { 'Has bölenlerin toplamı': '284', 'Sonuç': 'Mükemmel sayı değil (zengin sayı)' } },
    { in: { sayi: '945' }, out: { 'Has bölenlerin toplamı': '975' } },
    { in: { sayi: '17' }, out: { 'Has bölenlerin toplamı': '1', 'Sonuç': 'Mükemmel sayı değil (eksik sayı)' } },
    { in: { sayi: '0' }, error: true },
    { in: { sayi: '2,5' }, error: true },
    { in: { sayi: 'abc' }, error: true },
  ],
  howto: [
    `"Sayı" alanına kontrol etmek istediğiniz pozitif tam sayıyı yazın.`,
    `"Kontrol et" düğmesine basın. İlk satırda sayının mükemmel olup olmadığı, değilse eksik mi zengin mi olduğu yazar.`,
    `Alt satırlarda has bölenlerin toplamını, bu toplamın sayıdan ne kadar fazla ya da eksik olduğunu ve bölenlerin listesini inceleyin.`,
    `Başka bir sayı denemek için "Temizle" düğmesine basın ya da alandaki değeri değiştirip yeniden kontrol edin.`,
  ],
  sections: [
    { h: 'Mükemmel sayı nedir?', p: [
      `Kendisi dışındaki pozitif bölenlerinin toplamı kendisine eşit olan sayıya <strong>mükemmel sayı</strong> denir. Bir sayının kendisi dışındaki bölenlerine has bölen (öz bölen) adı verilir. En küçük mükemmel sayı 6'dır: has bölenleri 1, 2 ve 3'tür ve 1 + 2 + 3 = 6 eder. İkinci mükemmel sayı 28'dir: 1 + 2 + 4 + 7 + 14 = 28.`,
      `Tanım bazen bütün bölenler üzerinden de verilir: bir sayının kendisi dahil tüm bölenlerinin toplamı sayının iki katına eşitse o sayı mükemmeldir. 6 için 1 + 2 + 3 + 6 = 12 = 2 × 6. İki tanım aynı şeyi söyler. Mükemmel sayılar Antik Yunan matematikçilerinden beri bilinmektedir ve Öklid'in Elemanlar adlı eserinde bu sayıları üreten bir kural yer alır.`,
    ] },
    { h: 'Adım adım kontrol: çözümlü örnekler', p: [
      `<strong>28 mükemmel midir?</strong> 28'i bölen sayıları sırayla ararız: 1, 2, 4, 7, 14 ve 28. Kendisini listeden çıkarınca has bölenler 1, 2, 4, 7 ve 14 kalır. Toplamları 1 + 2 + 4 + 7 + 14 = <strong>28</strong>'dir. Toplam sayıya eşit olduğundan 28 mükemmel sayıdır.`,
      `<strong>12 mükemmel midir?</strong> Has bölenleri 1, 2, 3, 4 ve 6'dır; toplamları <strong>16</strong> eder. 16, 12'den 4 fazla olduğu için 12 mükemmel değildir; bölenleri kendisinden "fazla geldiği" için zengin sayı olarak adlandırılır.`,
      `<strong>10 mükemmel midir?</strong> Has bölenleri 1, 2 ve 5'tir; toplamları <strong>8</strong> eder. 8, 10'dan 2 eksik olduğundan 10 bir eksik sayıdır. Araç bu üç durumu da sonuç satırında belirtir ve farkı ayrıca gösterir.`,
    ] },
    { h: 'Eksik, zengin ve dost sayılar', p: [
      `Her pozitif tam sayı üç gruptan birine girer. Has bölenlerinin toplamı kendisinden küçük olanlar <strong>eksik sayı</strong>, büyük olanlar <strong>zengin sayı</strong> (bol ya da artık sayı da denir), eşit olanlar mükemmel sayıdır. Asal sayıların tek has böleni 1 olduğundan bütün asal sayılar eksiktir; örneğin 17 için toplam yalnızca 1'dir. En küçük zengin sayı 12'dir. Zengin sayıların çoğu çifttir; en küçük tek zengin sayı 945'tir ve has bölenlerinin toplamı 975 eder.`,
      `Bu konuyla yakından ilişkili bir kavram da <strong>dost sayılardır</strong>. İki sayıdan her birinin has bölenleri toplamı diğerine eşitse bu sayılara dost sayılar denir. En küçük çift 220 ve 284'tür: araca 220 yazdığınızda has bölenler toplamının 284, 284 yazdığınızda ise 220 çıktığını görürsünüz. Mükemmel sayı, bu açıdan "kendi kendisinin dostu" olan sayıdır.`,
    ] },
    { h: 'Bilinen ilk mükemmel sayılar', ul: [
      `<strong>6</strong> = 2 × 3`,
      `<strong>28</strong> = 4 × 7`,
      `<strong>496</strong> = 16 × 31`,
      `<strong>8.128</strong> = 64 × 127`,
      `<strong>33.550.336</strong> = 4.096 × 8.191`,
      `<strong>8.589.869.056</strong> = 65.536 × 131.071`,
      `<strong>137.438.691.328</strong> = 262.144 × 524.287`,
    ] },
    { h: 'Öklid–Euler kuralı ve Mersenne asalları', p: [
      `Yukarıdaki listede bir düzen göze çarpar: her mükemmel sayı, 2'nin bir kuvveti ile ondan bir sonraki kuvvetin bir eksiğinin çarpımıdır. Kural şöyle yazılır: 2<sup>p</sup> − 1 sayısı asal ise <strong>2<sup>p−1</sup> × (2<sup>p</sup> − 1)</strong> bir mükemmel sayıdır. p = 2 için 2 × 3 = 6, p = 3 için 4 × 7 = 28, p = 5 için 16 × 31 = 496, p = 7 için 64 × 127 = 8.128 bulunur. p = 4 işe yaramaz, çünkü 2<sup>4</sup> − 1 = 15 asal değildir.`,
      `2<sup>p</sup> − 1 biçimindeki asal sayılara Mersenne asalı denir. Öklid bu kuralın mükemmel sayı ürettiğini göstermiş, yüzyıllar sonra Euler bütün çift mükemmel sayıların bu biçimde olmak zorunda olduğunu kanıtlamıştır. Dolayısıyla her yeni Mersenne asalı yeni bir mükemmel sayı demektir. Bu sayılar çok hızlı büyür; beşinci mükemmel sayı sekiz, yedincisi on iki basamaklıdır.`,
      `Tek bir mükemmel sayının var olup olmadığı ise matematiğin çözülememiş en eski sorularından biridir. Bugüne kadar tek mükemmel sayı bulunamamış, ancak var olamayacağı da kanıtlanamamıştır.`,
    ] },
    { h: 'Mükemmel sayıların ilginç özellikleri', ul: [
      `Bilinen bütün mükemmel sayılar çifttir ve son basamakları 6 ya da 8'dir.`,
      `Her çift mükemmel sayı, 1'den başlayan ardışık sayıların toplamıdır: 6 = 1 + 2 + 3, 28 = 1 + 2 + … + 7, 496 = 1 + 2 + … + 31.`,
      `Bir mükemmel sayının bütün bölenlerinin çarpmaya göre terslerinin toplamı 2'dir: 6 için 1/1 + 1/2 + 1/3 + 1/6 = 2.`,
      `İkili yazımları düzenlidir: 6 = 110, 28 = 11100, 496 = 111110000; yani p tane 1'in ardından p − 1 tane 0 gelir.`,
    ] },
    { h: 'Aracın çalışma biçimi ve sınırları', p: [
      `Araç, yazdığınız sayıyı 1'den kareköküne kadar olan sayılara böler. Tam bölen her sayı için bölümü de bölen listesine ekler; böylece bölenlerin tamamı karekök kadar adımda bulunur. Bu yöntem sayesinde on iki basamaklı sayılar bile bir saniyeden kısa sürede kontrol edilir ve yedinci mükemmel sayı olan 137.438.691.328 doğrulanabilir.`,
      `Üst sınır 1.000.000.000.000'dır. Çok fazla böleni olan sayılarda listenin ilk 40 böleni gösterilir; toplam ve adet ise bölenlerin tamamı üzerinden hesaplanır. Sıfır, negatif sayılar ve ondalıklı sayılar için mükemmellik tanımlı olmadığından araç bu girdilerde uyarı verir.`,
    ] },
  ],
  faq: [
    ['Mükemmel sayı ne demek?', 'Kendisi dışındaki pozitif bölenlerinin toplamı kendisine eşit olan sayıdır. 6 sayısının has bölenleri 1, 2 ve 3\'tür; toplamları 6 ettiği için 6 mükemmeldir.'],
    ['İlk dört mükemmel sayı hangileridir?', '6, 28, 496 ve 8.128\'dir. Beşincisi 33.550.336\'dır; aradaki bütün sayılar ya eksik ya da zengindir.'],
    ['1 mükemmel sayı mıdır?', 'Hayır. 1\'in kendisi dışında böleni yoktur, dolayısıyla has bölenleri toplamı 0\'dır. Toplam sayıdan küçük olduğundan 1 eksik sayı sayılır.'],
    ['Asal sayılar mükemmel olabilir mi?', 'Hayır. Bir asal sayının tek has böleni 1\'dir ve toplam her zaman 1 çıkar. Bu yüzden bütün asal sayılar eksik sayıdır.'],
    ['Zengin sayı ile eksik sayı arasındaki fark nedir?', 'Has bölenlerinin toplamı sayıdan büyükse sayı zengin, küçükse eksiktir. 12 zengindir (toplam 16), 10 eksiktir (toplam 8).'],
    ['Tek mükemmel sayı var mı?', 'Bilinen bütün mükemmel sayılar çifttir. Tek bir mükemmel sayının bulunup bulunmadığı hâlâ yanıtlanmamış bir sorudur; ne bir örneği bulunmuş ne de olamayacağı kanıtlanmıştır.'],
    ['Mükemmel sayı formülü nedir?', '2ᵖ − 1 sayısı asal olduğunda 2ᵖ⁻¹ × (2ᵖ − 1) çarpımı bir mükemmel sayıdır. p = 3 için 4 × 7 = 28, p = 5 için 16 × 31 = 496 elde edilir.'],
    ['Has bölen ile bölen arasındaki fark nedir?', 'Bölenler sayının kendisini de içerir; has bölenler içermez. 28\'in bölenleri 1, 2, 4, 7, 14 ve 28; has bölenleri ise 1, 2, 4, 7 ve 14\'tür.'],
    ['Yazdığım sayı kaydediliyor mu?', 'Hayır. Kontrol tarayıcınızda yapılır; girdiğiniz sayı sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['bolen-hesapla', 'asal-carpan-hesapla', 'asal-sayi-sorgula', 'ardisik-sayi-toplami', 'ebob-ekok'],
};
