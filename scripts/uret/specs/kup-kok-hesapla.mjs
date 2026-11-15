export default {
  slug: 'kup-kok-hesapla',
  title: 'Küp Kök Hesaplama',
  h1Tail: '∛x',
  pageTitle: 'Küp Kök Hesaplama – Bir Sayının Küp Kökü (∛x) ve Tam Küp Kontrolü',
  description: 'Pozitif ya da negatif bir sayının küp kökünü hesaplayın. Sayının tam küp olup olmadığını, en yakın tam küpleri ve sonucun sağlamasını da gösterir.',
  card: 'Bir sayının küp kökünü bulun; negatif sayılar, tam küp kontrolü ve en yakın tam küplerle birlikte.',
  category: 'matematik',
  keywords: ['küp kök hesaplama', 'küp kök alma', 'küpkök', '27 nin küp kökü', 'tam küp sayılar', 'negatif sayının küp kökü', 'kök 3 dereceden', 'küp kök nasıl bulunur'],
  lead: 'Bir sayı yazın; araç <strong>küp kökünü (∛x)</strong>, yani üç kez kendisiyle çarpıldığında o sayıyı veren değeri hesaplasın. Karekökten farklı olarak küp kök negatif sayılar için de tanımlıdır; sonuçla birlikte sayının tam küp olup olmadığı da bildirilir.',
  button: 'Hesapla',
  inputs: [
    { id: 'x', label: 'Sayı (x)', type: 'number', placeholder: 'Örn. 27', hint: 'Negatif ve ondalıklı sayılar da yazılabilir' },
  ],
  compute(v, h) {
    const x = h.num(v.x, 'Sayı (x)');
    if (Math.abs(x) > 1e15) h.err('Sayı çok büyük; mutlak değeri en fazla 15 basamaklı bir sayı yazın.');
    let r = Math.cbrt(x);
    // Ondalık gösterimi kısa olan tam sonuçları (ör. 0,1) kayan nokta artığından arındır
    const yuvarlak = Number(r.toFixed(9));
    if (Math.abs(yuvarlak * yuvarlak * yuvarlak - x) <= 1e-12 * Math.max(1, Math.abs(x))) r = yuvarlak;
    const tamSayi = Number.isInteger(x);
    const k = Math.round(r);
    const tamKup = tamSayi && k * k * k === x;
    const f0 = (n) => h.fmt(n, 0);
    const par = (n) => (n < 0 ? `(${f0(n)})` : f0(n));
    const rows = [
      ['Küp kök (∛x)', h.fmt(r, 8)],
      ['Tam küp mü?', tamKup ? `Evet, ${par(k)}³ = ${f0(x)}` : tamSayi ? 'Hayır' : 'Hayır (sayı tam sayı değil)'],
      ['Sağlama (sonucun küpü)', h.fmt(r * r * r, 6)],
      ['Üslü gösterim', `${h.fmt(x, 10)}^(1/3)`],
    ];
    let note;
    if (tamKup) {
      note = 'Sonuç bir tam sayı olduğu için yazdığınız sayı tam küptür.';
    } else if (tamSayi) {
      let a = Math.floor(r);
      while (a * a * a > x) a--;
      while ((a + 1) * (a + 1) * (a + 1) <= x) a++;
      rows.push(['Bir önceki tam küp', `${f0(a * a * a)} = ${par(a)}³`]);
      rows.push(['Bir sonraki tam küp', `${f0((a + 1) * (a + 1) * (a + 1))} = ${par(a + 1)}³`]);
      note = 'Sayı tam küp olmadığı için küp kökü irrasyoneldir; sonuç sekiz ondalık basamağa yuvarlanmıştır.';
    } else {
      note = 'Sonuç en fazla sekiz ondalık basamakla gösterilir.';
    }
    if (x < 0) note += ' Negatif sayının küp kökü de negatiftir.';
    return { rows, note };
  },
  cases: [
    { in: { x: '27' }, out: { 'Küp kök (∛x)': '3', 'Tam küp mü?': 'Evet, 3³ = 27', 'Sağlama (sonucun küpü)': '27' } },
    { in: { x: '-8' }, out: { 'Küp kök (∛x)': '-2', 'Tam küp mü?': 'Evet, (-2)³ = -8', 'Sağlama (sonucun küpü)': '-8' } },
    { in: { x: '2' }, out: { 'Küp kök (∛x)': '1,25992105', 'Tam küp mü?': 'Hayır', 'Sağlama (sonucun küpü)': '2', 'Bir önceki tam küp': '1 = 1³', 'Bir sonraki tam küp': '8 = 2³' } },
    { in: { x: '100' }, out: { 'Küp kök (∛x)': '4,64158883', 'Bir önceki tam küp': '64 = 4³', 'Bir sonraki tam küp': '125 = 5³' } },
    { in: { x: '0,001' }, out: { 'Küp kök (∛x)': '0,1', 'Tam küp mü?': 'Hayır (sayı tam sayı değil)' } },
    { in: { x: '3,375' }, out: { 'Küp kök (∛x)': '1,5', 'Sağlama (sonucun küpü)': '3,375' } },
    { in: { x: '0' }, out: { 'Küp kök (∛x)': '0', 'Tam küp mü?': 'Evet, 0³ = 0' } },
    { in: { x: '1000000' }, out: { 'Küp kök (∛x)': '100', 'Tam küp mü?': 'Evet, 100³ = 1.000.000' } },
    { in: { x: '-20' }, out: { 'Küp kök (∛x)': '-2,71441762', 'Bir önceki tam küp': '-27 = (-3)³', 'Bir sonraki tam küp': '-8 = (-2)³' } },
    { in: { x: 'yirmi yedi' }, error: true },
    { in: { x: '' }, error: true },
  ],
  howto: [
    '"Sayı (x)" alanına küp kökünü almak istediğiniz sayıyı yazın. Ondalık için virgül ya da nokta kullanabilir, negatif sayılar için başına eksi koyabilirsiniz.',
    '"Hesapla" düğmesine basın. İlk satırda küp kök, ikinci satırda sayının tam küp olup olmadığı görünür.',
    '"Sağlama" satırında sonucun küpünün yazdığınız sayıya geri döndüğünü kontrol edin.',
    'Tam sayı yazdıysanız ve sayı tam küp değilse, arasında kaldığı iki tam küpü de listede görürsünüz; bu, sonucu tahmin ederek kontrol etmenizi sağlar.',
  ],
  sections: [
    { h: 'Küp kök nedir?', p: [
      'Bir x sayısının küp kökü, üçüncü kuvveti x olan sayıdır: <strong>∛x = y ise y³ = y × y × y = x</strong>. 3 × 3 × 3 = 27 olduğundan ∛27 = 3\'tür. Küp kök, üs olarak <strong>x^(1/3)</strong> biçiminde de yazılır; hesap makinelerinde ve elektronik tablolarda genellikle bu gösterim kullanılır.',
      'Geometrik anlamı açıktır: hacmi bilinen bir küpün kenar uzunluğu, hacmin küp köküdür. Hacmi 27 cm³ olan bir küpün her kenarı 3 cm, hacmi 1 m³ (1000 litre) olan küp biçimli bir deponun her kenarı 1 m\'dir. 64 litrelik küp biçimli bir kabın kenarı ise ∛64 = 4 dm, yani 40 cm olur.',
    ] },
    { h: 'Negatif sayıların küp kökü', p: [
      'Karekök ile küp kök arasındaki en önemli fark negatif sayılarda ortaya çıkar. Hiçbir gerçek sayının karesi negatif olmadığı için √(−8) gerçek sayılarda tanımsızdır. Küpte ise işaret korunur: (−2) × (−2) × (−2) = −8. Bu yüzden <strong>∛(−8) = −2</strong>\'dir ve genel olarak <strong>∛(−x) = −∛x</strong> kuralı geçerlidir.',
      'Bazı hesap makineleri ve programlama dilleri negatif sayının 1/3 üncü kuvvetini alırken hata ya da "sayı değil" sonucu verir, çünkü üs alma işlemini logaritma üzerinden yapar. Bu araç doğrudan küp kök işlevini kullandığı için negatif girdilerde de doğru gerçek kökü döndürür.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 – tam küp:</strong> ∛1.000.000 kaçtır? 100 × 100 × 100 = 1.000.000 olduğundan sonuç 100\'dür. Araç "Tam küp mü?" satırında bunu 100³ = 1.000.000 biçiminde doğrular.',
      '<strong>Örnek 2 – tam küp olmayan sayı:</strong> ∛100 için önce sınırlar belirlenir: 4³ = 64 ve 5³ = 125 olduğundan sonuç 4 ile 5 arasındadır. 100, 125\'e 64\'ten daha yakın olduğu için kökün 4,5\'ten büyük olması beklenir. Deneme: 4,6³ = 97,336 ve 4,7³ = 103,823; demek ki sonuç 4,6 ile 4,7 arasında, 4,6\'ya daha yakındır. Araç değeri 4,64158883 olarak verir.',
      '<strong>Örnek 3 – ondalıklı sayı:</strong> ∛3,375 = 1,5\'tir, çünkü 1,5 × 1,5 = 2,25 ve 2,25 × 1,5 = 3,375. Benzer biçimde ∛0,001 = 0,1 olur. 0 ile 1 arasındaki sayıların küp kökü kendilerinden büyüktür; bu, ilk bakışta şaşırtıcı gelebilir.',
      '<strong>Örnek 4 – asal çarpanlarla:</strong> ∛216 için 216 = 2³ × 3³ yazılır. Her üs 3\'e bölünür ve çarpanlar dışarı çıkar: 2 × 3 = 6. Üsler 3\'ün katı değilse kalan kısım kök içinde kalır: ∛54 = ∛(27 × 2) = 3∛2.',
    ] },
    { h: 'Tam küp sayılar tablosu (1–20)', ul: [
      '1³ = 1 · 2³ = 8 · 3³ = 27 · 4³ = 64 · 5³ = 125',
      '6³ = 216 · 7³ = 343 · 8³ = 512 · 9³ = 729 · 10³ = 1.000',
      '11³ = 1.331 · 12³ = 1.728 · 13³ = 2.197 · 14³ = 2.744 · 15³ = 3.375',
      '16³ = 4.096 · 17³ = 4.913 · 18³ = 5.832 · 19³ = 6.859 · 20³ = 8.000',
    ], p: [
      'Tam küplerin birler basamağı, kökün birler basamağını tek başına belirler: sonu 8 ile biten bir tam küpün kökü 2 ile, sonu 2 ile biten tam küpün kökü 8 ile biter; 3 ile 7 de aynı biçimde yer değiştirir. 0, 1, 4, 5, 6 ve 9 ise aynen kalır. Bu sayede altı basamağa kadar olan tam küplerin kökü zihinden bulunabilir: 12.167 sayısının son rakamı 7 olduğundan kökün birler basamağı 3\'tür; binler kısmı olan 12, 2³ = 8 ile 3³ = 27 arasında olduğundan onlar basamağı 2\'dir. Sonuç 23.',
    ] },
    { h: 'Küp kökün özellikleri', ul: [
      '<strong>Çarpma:</strong> ∛(a × b) = ∛a × ∛b. Örneğin ∛(8 × 27) = 2 × 3 = 6.',
      '<strong>Bölme:</strong> ∛(a ÷ b) = ∛a ÷ ∛b. Örneğin ∛(1/8) = 1/2.',
      '<strong>Üs ile ilişki:</strong> ∛(a³) = a. Karekökten farklı olarak burada mutlak değere gerek yoktur.',
      '<strong>Toplama üzerine dağılmaz:</strong> ∛(a + b), ∛a + ∛b değildir. ∛(8 + 27) = ∛35 yaklaşık 3,27\'dir; 2 + 3 = 5 değildir.',
      '<strong>Sıralamayı korur:</strong> a < b ise ∛a < ∛b. Negatif sayılar dahil bütün gerçek sayılarda geçerlidir.',
    ] },
    { h: 'Kullanım alanları', p: [
      'Küp kök, hacimden uzunluğa geçilen her hesapta gerekir. Hacmi bilinen küp biçimli bir koli, depo ya da akvaryumun kenarını bulmak; bir cismin hacmi sekiz katına çıktığında boyutlarının yalnızca iki katına çıktığını görmek; ölçekli maket ve üç boyutlu baskılarda malzeme miktarına göre büyütme oranı belirlemek bunlara örnektir. Kürenin hacminden yarıçapını bulurken de küp kök alınır.',
      'Fizik ve mühendislikte hacimle orantılı büyüklüklerin (kütle, depolama kapasitesi) doğrusal boyuta çevrilmesinde; finansta ise üç yıllık toplam büyümeden yıllık ortalama büyüme oranının bulunmasında kullanılır: üç yılda 1,331 katına çıkan bir değer yılda ortalama ∛1,331 = 1,1 kat, yani yüzde on büyümüştür.',
    ] },
    { h: 'Duyarlılık ve sınırlar', p: [
      'Araç gerçek küp kökü hesaplar; her sayının ayrıca iki karmaşık küp kökü daha vardır, ancak bunlar bu aracın kapsamı dışındadır. Sonuç en fazla sekiz ondalık basamakla gösterilir. Tam küp olmayan tam sayıların küp kökü irrasyonel olduğundan gösterilen değer yuvarlanmıştır; "Sağlama" satırındaki küçük farklar bu yuvarlamadan kaynaklanabilir. Mutlak değeri 15 basamağı aşan sayılar kabul edilmez.',
    ] },
  ],
  faq: [
    ['Küp kök nasıl hesaplanır?', 'Üç kez kendisiyle çarpıldığında verilen sayıyı veren değer aranır. Tam küplerde asal çarpanlara ayırıp üsleri 3\'e bölmek yeterlidir; diğer sayılarda iki tam küp arasında sınır belirlenip deneme yapılır ya da bu araç kullanılır.'],
    ['Negatif sayının küp kökü alınır mı?', 'Evet. Negatif bir sayının küpü negatif olduğundan küp kökü de negatiftir: ∛(−27) = −3. Karekökte ise negatif sayılar için gerçek bir sonuç yoktur.'],
    ['Küp kök ile karekök arasındaki fark nedir?', 'Karekök, karesi verilen sayıyı veren değeri; küp kök, küpü verilen sayıyı veren değeri bulur. 64\'ün karekökü 8, küp kökü 4\'tür. Karekök yalnızca negatif olmayan sayılarda, küp kök ise bütün gerçek sayılarda tanımlıdır.'],
    ['Hesap makinesinde küp kök nasıl alınır?', 'Küp kök tuşu yoksa sayının 1/3 üncü kuvvetini alabilirsiniz: x^(1/3). Bazı makineler negatif sayılarda bu yöntemle hata verir; o durumda pozitif değerin kökünü alıp sonucun başına eksi koyun.'],
    ['Tam küp sayı nedir?', 'Bir tam sayının üçüncü kuvveti olan sayıdır: 1, 8, 27, 64, 125, 216 gibi. Negatif tam küpler de vardır: −1, −8, −27. Araç yazdığınız tam sayının tam küp olup olmadığını ayrıca belirtir.'],
    ['0 ile 1 arasındaki bir sayının küp kökü neden daha büyük çıkıyor?', 'Birden küçük pozitif bir sayıyı kendisiyle çarptıkça küçülür; dolayısıyla küpü kendisinden küçüktür. Tersine dönüldüğünde kök büyür: 0,001\'in küp kökü 0,1\'dir.'],
    ['∛2 kaçtır?', 'Yaklaşık 1,25992105\'tir ve irrasyonel bir sayıdır. Bir küpün hacmini iki katına çıkarmak için kenarını bu oranla, yani yaklaşık yüzde yirmi altı büyütmek gerekir.'],
    ['Girdiğim değerler bir yere gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız sayı sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['karekok-hesapla', 'n-dereceden-kok-hesapla', 'us-logaritma-hesapla', 'kup-hacmi-hesapla', 'tam-kare-kontrol'],
};
