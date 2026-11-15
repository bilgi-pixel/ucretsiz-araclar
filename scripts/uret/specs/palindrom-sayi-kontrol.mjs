export default {
  slug: 'palindrom-sayi-kontrol',
  title: 'Palindrom Sayı Kontrolü',
  h1Tail: 'tersten de aynı okunan sayılar',
  pageTitle: 'Palindrom Sayı Kontrolü – Sayı Tersten Aynı mı Okunuyor?',
  description: 'Bir sayının palindrom olup olmadığını kontrol edin. Tersten yazılışı, kendisinden sonraki ilk palindrom sayı ve ters çevir-topla yönteminin sonucu gösterilir.',
  card: 'Sayının palindrom (tersten de aynı okunan) olup olmadığını öğrenin; ters yazılışı ve sonraki palindromu görün.',
  category: 'matematik',
  keywords: ['palindrom sayı kontrolü', 'palindrom sayı nedir', 'palindromik sayı', 'tersten aynı okunan sayı', 'sayıyı ters çevirme', 'palindrom sayı bulma', 'simetrik sayı'],
  lead: 'Yazdığınız sayının <strong>palindrom</strong>, yani soldan sağa ve sağdan sola aynı okunan bir sayı olup olmadığını kontrol edin. Araç sayının ters yazılışını, kendisinden büyük ilk palindrom sayıyı ve ters çevirip toplama yöntemiyle kaç adımda palindroma ulaşıldığını da gösterir.',
  button: 'Kontrol et',
  inputs: [
    { id: 'sayi', label: 'Sayı', type: 'text', placeholder: 'Örn. 12321', hint: 'Negatif olmayan bir tam sayı yazın; en fazla 60 basamak.', wide: true },
  ],
  compute(v, h) {
    let s = String(v.sayi ?? '').replace(/\s/g, '').replace(/−/g, '-');
    if (s === '') h.err('"Sayı" alanını doldurun.');
    if (s[0] === '-') h.err('Negatif sayılar palindrom sayılmaz; eksi işareti tersten okunuşta sona geçer. Sayıyı işaretsiz yazın.');
    if (!/^\d+$/.test(s)) h.err('Yalnızca rakamlardan oluşan bir tam sayı yazın; nokta, virgül ya da harf kullanmayın (örn. 12321).');
    s = s.replace(/^0+(?=\d)/, '');
    if (s.length > 60) h.err('Sayı en fazla 60 basamaklı olabilir; daha kısa bir sayı yazın.');
    const cevir = (t) => t.split('').reverse().join('');
    const ters = cevir(s);
    const pal = s === ters;
    const tersSayi = ters.replace(/^0+(?=\d)/, '');
    // Kendisinden büyük ilk palindrom
    const n = s.length;
    let sonraki;
    if (/^9+$/.test(s)) sonraki = '1' + '0'.repeat(n - 1) + '1';
    else {
      const yari = Math.ceil(n / 2);
      const ayna = (sol) => sol + cevir(sol.slice(0, n - yari));
      let sol = s.slice(0, yari);
      sonraki = ayna(sol);
      if (!(sonraki > s)) { sol = String(BigInt(sol) + 1n); sonraki = ayna(sol); }
    }
    // Ters çevir ve topla (en fazla 200 adım)
    let tt = 'Sayı zaten palindrom';
    let ilkAdim = '';
    if (!pal) {
      let str = s, adim = 0, bulundu = false;
      while (adim < 200) {
        const yeni = String(BigInt(str) + BigInt(cevir(str)));
        if (adim === 0) ilkAdim = `${s} + ${tersSayi} = ${yeni}`;
        str = yeni; adim++;
        if (str === cevir(str)) { bulundu = true; break; }
      }
      tt = bulundu ? `${adim} adımda ${str}` : '200 adımda palindroma ulaşılamadı';
    }
    return {
      rows: [
        ['Sonuç', pal ? 'Palindrom sayı' : 'Palindrom değil'],
        ['Tersten yazılışı', tersSayi],
        ['Basamak sayısı', String(n)],
        ['Sonraki palindrom sayı', sonraki],
        ['Ters çevir ve topla', tt],
      ],
      note: pal ? 'Sayı soldan sağa ve sağdan sola aynı okunuyor.' : `Sayı tersten ${tersSayi} olarak okunuyor. İlk ters çevir-topla adımı: ${ilkAdim}.`,
    };
  },
  cases: [
    { in: { sayi: '12321' }, out: { 'Sonuç': 'Palindrom sayı', 'Tersten yazılışı': '12321', 'Basamak sayısı': '5', 'Sonraki palindrom sayı': '12421', 'Ters çevir ve topla': 'Sayı zaten palindrom' } },
    { in: { sayi: '12345' }, out: { 'Sonuç': 'Palindrom değil', 'Tersten yazılışı': '54321', 'Sonraki palindrom sayı': '12421', 'Ters çevir ve topla': '1 adımda 66666' } },
    { in: { sayi: '57' }, out: { 'Sonuç': 'Palindrom değil', 'Tersten yazılışı': '75', 'Sonraki palindrom sayı': '66', 'Ters çevir ve topla': '2 adımda 363' } },
    { in: { sayi: '89' }, out: { 'Sonuç': 'Palindrom değil', 'Sonraki palindrom sayı': '99', 'Ters çevir ve topla': '24 adımda 8813200023188' } },
    { in: { sayi: '196' }, out: { 'Sonuç': 'Palindrom değil', 'Tersten yazılışı': '691', 'Sonraki palindrom sayı': '202', 'Ters çevir ve topla': '200 adımda palindroma ulaşılamadı' } },
    { in: { sayi: '7' }, out: { 'Sonuç': 'Palindrom sayı', 'Basamak sayısı': '1', 'Sonraki palindrom sayı': '8' } },
    { in: { sayi: '999' }, out: { 'Sonuç': 'Palindrom sayı', 'Sonraki palindrom sayı': '1001' } },
    { in: { sayi: '1221' }, out: { 'Sonuç': 'Palindrom sayı', 'Sonraki palindrom sayı': '1331' } },
    { in: { sayi: '120' }, out: { 'Sonuç': 'Palindrom değil', 'Tersten yazılışı': '21', 'Sonraki palindrom sayı': '121', 'Ters çevir ve topla': '1 adımda 141' } },
    { in: { sayi: '9' }, out: { 'Sonuç': 'Palindrom sayı', 'Sonraki palindrom sayı': '11' } },
    { in: { sayi: '02022020' }, out: { 'Sonuç': 'Palindrom değil', 'Basamak sayısı': '7' } },
    { in: { sayi: '12a21' }, error: true },
    { in: { sayi: '-121' }, error: true },
    { in: { sayi: '' }, error: true },
  ],
  howto: [
    '"Sayı" alanına kontrol etmek istediğiniz tam sayıyı yazın. Araya boşluk koyabilirsiniz; boşluklar dikkate alınmaz.',
    '"Kontrol et" düğmesine basın. İlk satır sayının palindrom olup olmadığını söyler.',
    '"Tersten yazılışı" satırında rakamların ters sıralanmış hâlini, "Sonraki palindrom sayı" satırında yazdığınız sayıdan büyük ilk palindromu görün.',
    'Sayı palindrom değilse "Ters çevir ve topla" satırı, sayının tersiyle toplanması yinelendiğinde kaç adımda hangi palindroma ulaşıldığını gösterir.',
  ],
  sections: [
    { h: 'Palindrom sayı nedir?', p: [
      'Palindrom, baştan sona ve sondan başa aynı okunan dizilere verilen addır. Türkçede "ey edip adanada pide ye" tümcesi ya da "kabak", "kütük" gibi sözcükler bunun dildeki örnekleridir. Sayılarda da aynı düşünce geçerlidir: rakamları ters sırayla yazıldığında değişmeyen sayıya <strong>palindrom sayı</strong> ya da palindromik sayı denir. 121, 1331, 12321 ve 4004 palindromdur; 123, 1231 ve 4040 değildir.',
      'Kontrol yöntemi yalındır: ilk rakam son rakamla, ikinci rakam sondan ikinciyle karşılaştırılır ve ortaya kadar böyle devam edilir. Bütün çiftler eşitse sayı palindromdur. Basamak sayısı tekse ortadaki rakamın eşi yoktur ve ne olduğu önemli değildir. Tek basamaklı sayıların tümü, yani 0\'dan 9\'a kadar olan sayılar bu tanıma göre palindromdur.',
    ] },
    { h: 'Kaç tane palindrom sayı vardır?', p: [
      'Palindrom sayıların sonu yoktur, ama belirli bir basamak sayısı için kaç tane olduğu kolayca sayılabilir. Bir palindromu belirlemek için sayının yalnızca ilk yarısını seçmek yeterlidir; ikinci yarı bunun ayna görüntüsüdür. İlk rakam sıfır olamayacağı için 9, diğer serbest rakamlar için 10\'ar seçenek vardır.',
    ], ul: [
      '<strong>İki basamaklı:</strong> 9 tane (11, 22, 33, …, 99).',
      '<strong>Üç basamaklı:</strong> 90 tane (101, 111, 121, …, 999).',
      '<strong>Dört basamaklı:</strong> 90 tane (1001, 1111, 1221, …, 9999).',
      '<strong>Beş basamaklı:</strong> 900 tane (10001, 10101, …, 99999).',
      '<strong>Altı basamaklı:</strong> 900 tane.',
    ] },
    { h: 'Palindrom sayıların ilginç özellikleri', p: [
      '<strong>Çift basamaklı her palindrom 11\'e bölünür.</strong> 1221 = 11 × 111, 4004 = 11 × 364 ve 123321 = 11 × 11211 örneklerinde görüldüğü gibi bu kural istisnasızdır. Nedeni 11\'e bölünebilme kuralıdır: rakamlar sırayla artı ve eksi işaretiyle toplandığında çift basamaklı bir palindromda her rakam eşiyle ters işaret alır ve toplam sıfır çıkar. Bunun bir sonucu olarak çift basamaklı tek asal palindrom 11\'dir.',
      'Yalnızca 1 rakamından oluşan sayıların kareleri de palindrom verir: 11² = 121, 111² = 12321, 1111² = 1234321. Bu örüntü dokuz tane 1\'e kadar sürer; onuncuda elde taşması simetriyi bozar. Hem asal hem palindrom olan sayılara palindromik asal denir: 101, 131, 151, 181, 191, 313, 353, 373, 383, 727, 757, 787, 797, 919 ve 929 üç basamaklı örneklerdir.',
    ] },
    { h: 'Ters çevir ve topla yöntemi', p: [
      'Palindrom olmayan bir sayıyı tersiyle toplayıp çıkan sonuca aynı işlemi uygulamayı sürdürürseniz çoğu zaman birkaç adımda bir palindroma ulaşırsınız. Bu oyun, sayı eğlencelerinin en bilinenlerindendir.',
      '<strong>Çözümlü örnek:</strong> 57 ile başlayalım. 57 + 75 = 132; bu palindrom değildir. 132 + 231 = 363; bu bir palindromdur. Öyleyse 57, iki adımda 363\'e ulaşır ve araç bu girdi için "2 adımda 363" sonucunu verir. 12345 sayısı tek adımda sonuçlanır: 12345 + 54321 = 66666.',
      'Bazı sayılar çok daha inatçıdır. 89 ancak 24 adım sonra 8.813.200.023.188 sayısına ulaşır. 196 ise bilinen hiçbir adımda palindrom vermemiştir; bilgisayarlarla milyonlarca basamağa kadar sürdürülen denemeler sonuçsuz kalmıştır. Böyle sayılara Lychrel sayısı adayı denir. Onluk tabanda gerçekten hiç palindroma ulaşmayan bir sayı olup olmadığı kanıtlanmamış, açık bir sorudur. Araç en fazla 200 adım dener ve bu sınırda sonuç yoksa bunu belirtir; bu, sayının hiçbir zaman palindrom vermeyeceği anlamına gelmez.',
    ] },
    { h: 'Sonraki palindrom nasıl bulunur?', p: [
      'Bir sayıdan büyük ilk palindromu bulmak için sayının sol yarısı sağa ayna gibi kopyalanır. Elde edilen sayı başlangıç sayısından büyükse aranan sonuç odur. Değilse sol yarı, varsa ortadaki rakamla birlikte, 1 artırılır ve yeniden aynalanır.',
      '12345 için sol yarı ve orta rakam 123\'tür. Aynalayınca 12321 çıkar; bu 12345\'ten küçük olduğu için 123, 124 yapılır ve 12421 bulunur. 120 için ilk aynalama 121 verir ve bu sayı 120\'den büyük olduğundan sonuç doğrudan 121\'dir. Tümü 9 olan sayılarda basamak sayısı artar: 999\'dan sonraki palindrom 1001\'dir.',
    ] },
    { h: 'Günlük hayatta palindromlar', p: [
      'Palindrom tarihler ara sıra gündeme gelir. Gün, ay ve yıl bitişik yazıldığında 02.02.2020 tarihi 02022020, 22.02.2022 tarihi 22022022 olur ve ikisi de tersten aynı okunur. Araç sayı olarak değerlendirme yaptığı için baştaki sıfırı atar; sıfırla başlayan bir tarihi sınamak isterseniz karşılaştırmayı rakam dizisi olarak kendiniz yapmanız ya da sıfırsız yazımı denemeniz gerekir. Araç plakaları, kilometre sayaçları, saat göstergeleri (12:21 gibi) ve telefon numaraları da insanların palindrom aradığı yerlerdir.',
      'Programlama derslerinde palindrom denetimi klasik bir alıştırmadır: sayı ya metne çevrilip tersiyle karşılaştırılır ya da 10\'a bölme ve kalan alma işlemleriyle rakamları sondan başa doğru yeni bir sayıya dizilir. Yazdığınız kodun çıktısını bu sayfadaki sonuçla karşılaştırarak sınayabilirsiniz.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç negatif olmayan tam sayılarla çalışır. Negatif sayılar eksi işareti yüzünden palindrom kabul edilmez; ondalıklı sayılar da desteklenmez. Baştaki sıfırlar sayının değerini değiştirmediği için yok sayılır; bu nedenle 0110 girdisi 110 olarak değerlendirilir ve palindrom çıkmaz. Sondaki sıfırlar ise sayının parçasıdır: 120 tersten 021, yani 21 olarak okunur. Palindromluk onluk tabana göre denetlenir; bir sayı ikilik tabanda palindrom olup onluk tabanda olmayabilir. Üst sınır 60 basamaktır.',
    ] },
  ],
  faq: [
    ['Palindrom sayı ne demek?', 'Rakamları ters sırayla yazıldığında aynı kalan sayıdır. 121, 3443 ve 12321 palindromdur; çünkü soldan sağa da sağdan sola da aynı okunurlar.'],
    ['Tek basamaklı sayılar palindrom mudur?', 'Evet. Tek bir rakam tersten de kendisidir, dolayısıyla 0\'dan 9\'a kadar bütün tek basamaklı sayılar palindrom sayılır.'],
    ['Bir sayının palindrom olduğunu nasıl anlarım?', 'İlk rakamı son rakamla, ikinciyi sondan ikinciyle karşılaştırarak ortaya doğru ilerleyin. Bütün çiftler eşitse sayı palindromdur. Daha kısa yol, sayıyı ters çevirip aslıyla aynı olup olmadığına bakmaktır.'],
    ['Sonu sıfırla biten bir sayı palindrom olabilir mi?', 'Sıfırın kendisi dışında olamaz. Palindrom olması için ilk rakamın da sıfır olması gerekirdi, ama sayılar sıfırla başlamaz. Bu yüzden 10, 120 ya da 5000 gibi sayılar palindrom değildir.'],
    ['196 sayısının özelliği nedir?', '196, ters çevirip toplama işlemi ne kadar yinelenirse yinelensin bugüne dek palindroma ulaştığı görülmemiş en küçük sayıdır. Hiç ulaşmayacağı ise kanıtlanmış değildir; bu, matematikte açık bir sorudur.'],
    ['Çift basamaklı palindromlar neden 11\'e bölünür?', 'Çünkü 11\'e bölünebilme kuralında rakamlar sırayla artı ve eksi işaretle toplanır. Çift basamaklı bir palindromda her rakamın eşi ters işaret alır, toplam sıfır olur ve sayı 11\'e tam bölünür.'],
    ['En büyük palindrom sayı hangisidir?', 'En büyük palindrom sayı yoktur. Her basamak sayısı için palindromlar bulunduğundan ve basamak sayısı sınırsız artırılabildiğinden palindrom sayılar sonsuz tanedir.'],
    ['Yazdığım sayı kaydediliyor mu?', 'Hayır. Kontrol tarayıcınızın içinde yapılır; girdiğiniz sayı sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['basamak-toplami-hesapla', 'asal-sayi-sorgula', 'asal-carpan-hesapla', 'tam-kare-kontrol', 'mukemmel-sayi-kontrol', 'fibonacci-hesapla'],
};
