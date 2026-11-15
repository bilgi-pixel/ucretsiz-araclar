export default {
  slug: 'mod-alma-hesapla',
  title: 'Mod Alma (Kalan Bulma) Hesaplama',
  h1Tail: 'a mod b',
  pageTitle: 'Mod Alma Hesaplama – Bölümünden Kalan Bulma (a mod b)',
  description: 'Bir tam sayının başka bir tam sayıya bölümünden kalanı bulun. Negatif sayılarda matematiksel kalanı ve programlama dillerindeki % sonucunu ayrı ayrı gösterir.',
  card: 'a mod b işlemini yapın: kalan, bölüm ve sağlama; negatif sayılarda yazılım dillerindeki farklı sonuçlarla birlikte.',
  category: 'matematik',
  keywords: ['mod alma', 'kalan bulma', 'mod hesaplama', 'bölümünden kalan', 'modüler aritmetik', 'negatif sayının modu', 'a mod b', 'kalanlı bölme'],
  lead: 'Bir tam sayıyı başka bir tam sayıya böldüğünüzde kalan kaç olur? Bölüneni ve böleni yazın; araç <strong>a mod b</strong> değerini, bölümü ve sağlamasını verir. Negatif sayılarda matematikteki kalan ile programlama dillerinin ürettiği sonuçlar birbirinden ayrıldığı için üçü de ayrı satırda gösterilir.',
  button: 'Hesapla',
  inputs: [
    { id: 'a', label: 'Bölünen (a)', type: 'number', placeholder: 'Örn. 17' },
    { id: 'b', label: 'Bölen / mod (b)', type: 'number', placeholder: 'Örn. 5' },
  ],
  compute(v, h) {
    const a = h.int(v.a, 'Bölünen (a)');
    const b = h.int(v.b, 'Bölen / mod (b)');
    if (b === 0) h.err('Bölen sıfır olamaz; sıfıra bölme tanımsızdır. Sıfırdan farklı bir tam sayı yazın.');
    if (!Number.isSafeInteger(a) || !Number.isSafeInteger(b)) h.err('Sayılar çok büyük; en fazla 15 basamaklı tam sayılar yazın.');
    const A = BigInt(a), B = BigInt(b);
    const mb = B < 0n ? -B : B;
    const kesKalan = A % B;              // sıfıra doğru kesme (C, Java, JavaScript)
    const kesBolum = A / B;
    const kalan = ((A % mb) + mb) % mb;   // Öklid: 0 ≤ kalan < |b|
    const bolum = (A - kalan) / B;
    let tabKalan = kesKalan;              // tabana yuvarlama (Python): işaret bölenle aynı
    if (tabKalan !== 0n && (tabKalan < 0n) !== (B < 0n)) tabKalan += B;
    const g = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const par = (x) => (x < 0n ? `(${g(x)})` : g(x));
    const rows = [
      ['Kalan (a mod b)', g(kalan)],
      ['Bölüm', g(bolum)],
      ['Sağlama', `${par(B)} × ${par(bolum)} + ${g(kalan)} = ${g(A)}`],
      ['Tam bölünüyor mu?', kalan === 0n ? 'Evet, kalan 0' : 'Hayır'],
      ['Kesmeli bölmede a % b (C, Java, JavaScript)', g(kesKalan)],
      ['Tabana yuvarlamalı a % b (Python)', g(tabKalan)],
    ];
    const farkli = kesKalan !== kalan || tabKalan !== kalan;
    return {
      rows,
      note: farkli
        ? 'Sayılardan biri negatif olduğu için programlama dillerinin sonucu matematikteki kalandan farklı çıktı. İlk satır 0 ≤ kalan < |b| koşulunu sağlayan kalandır.'
        : 'İlk satır 0 ≤ kalan < |b| koşulunu sağlayan kalandır; bu örnekte bütün tanımlar aynı sonucu verir.',
    };
  },
  cases: [
    { in: { a: '17', b: '5' }, out: { 'Kalan (a mod b)': '2', 'Bölüm': '3', 'Sağlama': '5 × 3 + 2 = 17', 'Tam bölünüyor mu?': 'Hayır', 'Kesmeli bölmede a % b (C, Java, JavaScript)': '2', 'Tabana yuvarlamalı a % b (Python)': '2' } },
    { in: { a: '-7', b: '3' }, out: { 'Kalan (a mod b)': '2', 'Bölüm': '-3', 'Sağlama': '3 × (-3) + 2 = -7', 'Kesmeli bölmede a % b (C, Java, JavaScript)': '-1', 'Tabana yuvarlamalı a % b (Python)': '2' } },
    { in: { a: '7', b: '-3' }, out: { 'Kalan (a mod b)': '1', 'Bölüm': '-2', 'Sağlama': '(-3) × (-2) + 1 = 7', 'Kesmeli bölmede a % b (C, Java, JavaScript)': '1', 'Tabana yuvarlamalı a % b (Python)': '-2' } },
    { in: { a: '144', b: '12' }, out: { 'Kalan (a mod b)': '0', 'Bölüm': '12', 'Tam bölünüyor mu?': 'Evet, kalan 0' } },
    { in: { a: '3', b: '8' }, out: { 'Kalan (a mod b)': '3', 'Bölüm': '0' } },
    { in: { a: '1000000', b: '7' }, out: { 'Kalan (a mod b)': '1', 'Bölüm': '142.857' } },
    { in: { a: '-7', b: '-3' }, out: { 'Kalan (a mod b)': '2', 'Bölüm': '3', 'Kesmeli bölmede a % b (C, Java, JavaScript)': '-1', 'Tabana yuvarlamalı a % b (Python)': '-1' } },
    { in: { a: '0', b: '9' }, out: { 'Kalan (a mod b)': '0', 'Bölüm': '0' } },
    { in: { a: '10', b: '0' }, error: true },
    { in: { a: '7,5', b: '2' }, error: true },
    { in: { a: '', b: '4' }, error: true },
  ],
  howto: [
    '"Bölünen (a)" alanına kalanını bulmak istediğiniz tam sayıyı yazın. Negatif değerler de kabul edilir.',
    '"Bölen / mod (b)" alanına hangi sayıya göre mod alacağınızı yazın. Bu değer sıfır olamaz.',
    '"Hesapla" düğmesine basın. İlk satırdaki "Kalan (a mod b)" okulda öğretilen kalandır; altında bölüm ve sağlama işlemi yer alır.',
    'Kod yazıyorsanız son iki satıra bakın: kullandığınız dilin % işlecinin kesmeli mi yoksa tabana yuvarlamalı mı çalıştığına göre doğru satırı seçin.',
  ],
  sections: [
    { h: 'Mod alma nedir?', p: [
      'Mod alma, bir tam sayının başka bir tam sayıya bölümünden kalanı bulma işlemidir. "17 mod 5" ifadesi, 17\'nin 5\'e bölümünden kalanı sorar. 17\'nin içinde üç tane 5 vardır (15) ve geriye 2 kalır; dolayısıyla <strong>17 mod 5 = 2</strong>\'dir. Bölme algoritması bunu tek bir eşitlikle ifade eder: <strong>a = b × bölüm + kalan</strong> ve <strong>0 ≤ kalan < |b|</strong>. Her a ve sıfırdan farklı her b için bu koşulu sağlayan bölüm ve kalan tektir.',
      'Kalan her zaman bölenden küçüktür. 5\'e göre mod alındığında mümkün olan kalanlar yalnızca 0, 1, 2, 3 ve 4\'tür. Kalan 0 ise sayı tam bölünüyor demektir; 144 mod 12 = 0 olması, 144\'ün 12\'nin katı olduğunu gösterir. Bölünen bölenden küçükse bölüm 0, kalan sayının kendisidir: 3 mod 8 = 3.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 – pozitif sayılar:</strong> 1.000.000 mod 7 kaçtır? 7 × 142.857 = 999.999 eder; 1.000.000 − 999.999 = 1. Kalan 1, bölüm 142.857\'dir.',
      '<strong>Örnek 2 – negatif bölünen:</strong> −7 mod 3 için 3\'ün −7\'yi aşmayan en büyük katını ararız: 3 × (−3) = −9. −7 − (−9) = 2 olduğundan kalan 2, bölüm −3\'tür. Sağlama: 3 × (−3) + 2 = −7. Burada sık yapılan hata, 7 mod 3 = 1 sonucunun önüne eksi koyup −1 demektir; oysa kalan negatif olamaz.',
      '<strong>Örnek 3 – negatif bölen:</strong> 7 mod (−3) işleminde kalan yine 0 ile 2 arasında olmalıdır. (−3) × (−2) = 6 ve 7 − 6 = 1; kalan 1, bölüm −2\'dir.',
    ] },
    { h: 'Negatif sayılarda programlama dilleri neden farklı sonuç verir?', p: [
      'Bilgisayar dillerindeki % işleci her zaman matematikteki kalanı döndürmez. Fark, bölümün nasıl tam sayıya çevrildiğinden doğar. C, C++, Java, C#, Go ve JavaScript gibi dillerde bölüm <strong>sıfıra doğru kesilir</strong>; −7 ÷ 3 = −2,33… ifadesi −2 olur ve kalan −7 − 3 × (−2) = −1 çıkar. Bu dillerde sonucun işareti bölünenle aynıdır.',
      'Python ve Ruby gibi dillerde bölüm <strong>tabana yuvarlanır</strong>; −2,33… ifadesi −3 olur ve kalan 2 çıkar. Bu dillerde sonucun işareti bölenle aynıdır; bu yüzden 7 % −3 işlemi Python\'da −2 verir. Elektronik tablolardaki MOD işlevi de genellikle bu ikinci kuralı izler.',
      'Araç üç değeri birden gösterir. Saat, haftanın günü ya da dizi indeksi gibi döngüsel hesaplarda negatif kalan istenmez; kesmeli bölme yapan bir dilde çalışıyorsanız yaygın çözüm <code>((a % b) + b) % b</code> kalıbıdır. Bu ifade b pozitifken ilk satırdaki sonucu üretir.',
    ] },
    { h: 'Modüler aritmetik ve günlük kullanım', p: [
      'Mod işlemi, belirli bir değerden sonra başa dönen her sistemde karşımıza çıkar. Saat hesabı en bilinen örnektir: saat 22\'den 5 saat sonrası (22 + 5) mod 24 = 3\'tür. Haftanın günleri 7\'ye göre döner: bugünden 100 gün sonrası için 100 mod 7 = 2 hesaplanır, yani iki gün ilerisinin adı aranır. Pazartesi günü sorulursa cevap çarşambadır.',
      'Bir sayının çift ya da tek olduğu 2\'ye göre kalanına bakılarak anlaşılır. Açı hesaplarında 765 derecelik bir dönüş 765 mod 360 = 45 dereceye denktir. Kimlik ve hesap numaralarındaki kontrol basamakları, barkodlar ve uluslararası banka hesap numarası doğrulaması da mod işlemine dayanır; örneğin bazı doğrulama yöntemlerinde sayının 97\'ye ya da 10\'a bölümünden kalan kullanılır. Yazılımda ise verileri sıraya dağıtmak, tablo satırlarını dönüşümlü renklendirmek ve halka biçimli diziler oluşturmak için sürekli başvurulur.',
    ] },
    { h: 'Denklik (kongrüans) kavramı', p: [
      'İki sayının aynı bölene göre kalanları eşitse bu sayılar o moda göre <strong>denktir</strong> ve a ≡ c (mod b) biçiminde yazılır. 17 ≡ 2 (mod 5) ve 22 ≡ 2 (mod 5) olduğundan 17 ile 22 de mod 5\'te denktir; farkları olan 5, bölenin bir katıdır.',
      'Denkliklerde toplama, çıkarma ve çarpma serbestçe yapılabilir: önce kalanları bulup sonra işlem yapmak sonucu değiştirmez. Örneğin 17 × 23 çarpımının 5\'e bölümünden kalanı bulmak için 17 yerine 2, 23 yerine 3 alınır; 2 × 3 = 6 ve 6 mod 5 = 1. Büyük üslerin kalanını bulma soruları da bu özelliğe dayanır. Bölme ise aynı rahatlıkla yapılamaz; sadeleştirme ancak sadeleştirilen sayı ile mod aralarında asalsa geçerlidir.',
    ] },
    { h: 'Sınırlar ve varsayımlar', ul: [
      'Araç yalnızca tam sayılarla çalışır; ondalıklı sayı yazıldığında uyarı verir.',
      'Bölen sıfır olamaz. Sıfırın herhangi bir sayıya göre modu ise 0\'dır.',
      'En fazla 15 basamaklı sayılar kabul edilir; hesap tam sayı aritmetiğiyle yapıldığı için sonuçta yuvarlama hatası olmaz.',
      '"Bölüm" satırı, ilk satırdaki kalana karşılık gelen bölümdür; negatif sayılarda hesap makinenizdeki ondalıklı bölümün tam kısmından farklı olabilir.',
    ] },
  ],
  faq: [
    ['Mod alma ile bölme arasındaki fark nedir?', 'Bölme işlemi bölümü, mod alma ise kalanı verir. 17 ÷ 5 işleminde bölüm 3, kalan 2\'dir; 17 mod 5 dendiğinde yalnızca 2 kastedilir.'],
    ['Kalan bölenden büyük olabilir mi?', 'Hayır. Kalan her zaman 0 ile bölenin mutlak değerinin bir eksiği arasındadır. Kalan bölene eşit ya da ondan büyük çıkıyorsa bölüm bir eksik alınmış demektir.'],
    ['Negatif bir sayının modu nasıl alınır?', 'Bölenin, sayıyı aşmayan en büyük katı bulunur ve sayıdan çıkarılır. −7 mod 3 için bu kat −9\'dur ve kalan 2\'dir. Pratik yol: pozitif karşılığının kalanını bulun (7 mod 3 = 1), sıfır değilse böleni bundan çıkarın (3 − 1 = 2).'],
    ['Küçük sayının büyük sayıya göre modu kaçtır?', 'Sayının kendisidir. 3 mod 8 = 3 olur, çünkü 3\'ün içinde hiç 8 yoktur; bölüm 0, kalan 3\'tür.'],
    ['Python ve JavaScript neden farklı sonuç veriyor?', 'JavaScript bölümü sıfıra doğru keser ve kalanın işareti bölünenle aynı olur: −7 % 3 = −1. Python bölümü aşağı yuvarlar ve kalanın işareti bölenle aynı olur: −7 % 3 = 2. Araç her iki sonucu da ayrı satırda gösterir.'],
    ['Bir sayının tek mi çift mi olduğunu mod ile nasıl anlarım?', 'Sayının 2\'ye göre modu 0 ise çift, 1 ise tektir. Aynı mantıkla 3\'e, 5\'e ya da herhangi bir sayıya tam bölünüp bölünmediğini kalanın 0 olup olmadığına bakarak anlarsınız.'],
    ['Ondalıklı sayılarda mod alınır mı?', 'Bazı programlama dilleri ondalıklı sayılarda da kalan hesaplar, ancak okul matematiğindeki mod işlemi tam sayılar için tanımlıdır. Bu araç yalnızca tam sayıları kabul eder.'],
    ['Yazdığım sayılar bir yere gönderiliyor mu?', 'Hayır. İşlem tarayıcınızda yapılır; girdiğiniz değerler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['ebob-ekok', 'bolen-hesapla', 'asal-carpan-hesapla', 'hesap-makinesi', 'asal-sayi-sorgula'],
};
