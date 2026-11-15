export default {
  slug: 'merdiven-hesapla',
  title: 'Merdiven Basamak Hesaplama',
  h1Tail: 'rıht, basış ve eğim',
  pageTitle: 'Merdiven Basamak Hesaplama – Rıht Yüksekliği, Basış ve Eğim',
  description: 'Kat yüksekliğinden merdivenin basamak sayısını, rıht yüksekliğini, basış genişliğini, yatay uzunluğunu ve eğim açısını 2h + b konfor kuralıyla hesaplayın.',
  card: 'Kat yüksekliğinden basamak sayısını, rıht ve basış ölçüsünü, merdiven boyunu ve eğim açısını hesaplayın.',
  category: 'insaat',
  keywords: ['merdiven hesaplama', 'basamak hesaplama', 'rıht yüksekliği hesaplama', 'merdiven basamak sayısı', '2h+b formülü', 'merdiven eğimi', 'basış genişliği hesaplama'],
  lead: 'Çıkılacak toplam yüksekliği ve hedeflediğiniz rıht yüksekliğini yazın; araç <strong>basamak sayısını</strong>, eşit bölünmüş <strong>rıht yüksekliğini</strong>, konfor kuralına uygun <strong>basış genişliğini</strong>, merdivenin yatayda kapladığı uzunluğu ve eğim açısını hesaplasın.',
  button: 'Hesapla',
  inputs: [
    { id: 'yukseklik', label: 'Toplam yükseklik (cm)', type: 'number', placeholder: 'Örn. 306', hint: 'Alt kat bitmiş döşemesinden üst kat bitmiş döşemesine.' },
    { id: 'riht', label: 'Hedef rıht yüksekliği (cm)', type: 'number', value: '17' },
    { id: 'basis', label: 'Basış genişliği (cm)', type: 'number', placeholder: 'Boş = 2h + b = 63 kuralı', hint: 'Boş bırakırsanız 63 − 2 × rıht olarak hesaplanır.' },
  ],
  compute(v, h) {
    const H = h.pos(v.yukseklik, 'Toplam yükseklik');
    const hedef = h.pos(v.riht, 'Hedef rıht yüksekliği');
    if (hedef > H) h.err('Hedef rıht yüksekliği toplam yükseklikten büyük olamaz.');
    const n = Math.max(1, Math.round(H / hedef));
    const r = H / n;
    const bos = String(v.basis ?? '').trim() === '';
    const b = bos ? 63 - 2 * r : h.pos(v.basis, 'Basış genişliği');
    if (!(b > 0)) h.err('Bu rıht yüksekliğiyle 63 − 2 × rıht kuralı geçerli bir basış vermiyor. Hedef rıhtı küçültün ya da basış genişliğini kendiniz yazın.');
    const basisSay = n - 1;
    const L = basisSay * b;
    const aci = Math.atan(r / b) * 180 / Math.PI;
    const limon = Math.sqrt(H * H + L * L);
    const konfor = 2 * r + b;
    let durum = 'Adım kuralı 60–64 cm aralığında; yürüyüş rahat kabul edilir.';
    if (konfor < 60 - 1e-9) durum = 'Adım kuralı 60 cm altında; basamaklar kısa adım gerektirir.';
    else if (konfor > 64 + 1e-9) durum = 'Adım kuralı 64 cm üzerinde; basamaklar uzun adım gerektirir.';
    return {
      rows: [
        ['Rıht sayısı', h.fmt(n, 0) + ' adet'],
        ['Rıht yüksekliği', h.fmt(r, 2) + ' cm'],
        ['Basış genişliği', h.fmt(b, 2) + ' cm'],
        ['Basış (basamak) sayısı', h.fmt(basisSay, 0) + ' adet'],
        ['Merdivenin yatay uzunluğu', h.fmt(L, 2) + ' cm'],
        ['Eğim açısı', h.fmt(aci, 2) + '°'],
        ['Limon (eğik) uzunluk', h.fmt(limon, 2) + ' cm'],
        ['2h + b değeri', h.fmt(konfor, 2) + ' cm'],
      ],
      note: durum + ' Son basış üst kat döşemesi sayıldığından basış sayısı rıht sayısından bir eksiktir.',
    };
  },
  cases: [
    { in: { yukseklik: '306', riht: '17', basis: '' }, out: { 'Rıht sayısı': '18 adet', 'Rıht yüksekliği': '17 cm', 'Basış genişliği': '29 cm', 'Basış (basamak) sayısı': '17 adet', 'Merdivenin yatay uzunluğu': '493 cm', 'Eğim açısı': '30,38°', 'Limon (eğik) uzunluk': '580,25 cm', '2h + b değeri': '63 cm' } },
    { in: { yukseklik: '280', riht: '17,5', basis: '28' }, out: { 'Rıht sayısı': '16 adet', 'Rıht yüksekliği': '17,5 cm', 'Basış (basamak) sayısı': '15 adet', 'Merdivenin yatay uzunluğu': '420 cm', 'Eğim açısı': '32,01°', 'Limon (eğik) uzunluk': '504,78 cm', '2h + b değeri': '63 cm' } },
    { in: { yukseklik: '300', riht: '17', basis: '' }, out: { 'Rıht sayısı': '18 adet', 'Rıht yüksekliği': '16,67 cm', 'Basış genişliği': '29,67 cm', 'Merdivenin yatay uzunluğu': '504,33 cm' } },
    { in: { yukseklik: '150', riht: '15', basis: '30' }, out: { 'Rıht sayısı': '10 adet', 'Rıht yüksekliği': '15 cm', 'Merdivenin yatay uzunluğu': '270 cm', 'Eğim açısı': '26,57°', '2h + b değeri': '60 cm' } },
    { in: { yukseklik: '90', riht: '18', basis: '' }, out: { 'Rıht sayısı': '5 adet', 'Basış genişliği': '27 cm', 'Basış (basamak) sayısı': '4 adet', 'Merdivenin yatay uzunluğu': '108 cm', 'Eğim açısı': '33,69°' } },
    { in: { yukseklik: '320', riht: '16', basis: '' }, out: { 'Rıht sayısı': '20 adet', 'Rıht yüksekliği': '16 cm', 'Basış genişliği': '31 cm', 'Merdivenin yatay uzunluğu': '589 cm' } },
    { in: { yukseklik: '0', riht: '17' }, error: true },
    { in: { yukseklik: '320', riht: '40', basis: '' }, error: true },
    { in: { yukseklik: '300', riht: 'x' }, error: true },
  ],
  howto: [
    'Merdivenin çıkacağı toplam yüksekliği santimetre olarak yazın: alt kattaki bitmiş döşeme yüzeyinden üst kattaki bitmiş döşeme yüzeyine kadar.',
    'Hedeflediğiniz rıht yüksekliğini girin. Araç bu değere en yakın eşit bölümü bulur.',
    'Basış genişliğini biliyorsanız yazın; boş bırakırsanız 2h + b = 63 kuralından hesaplanır.',
    '"Hesapla" düğmesine basın; basamak sayısı, kesin rıht yüksekliği, merdiven boyu ve eğim açısı görüntülenir.',
    'Merdivenin yatay uzunluğu mekâna sığmıyorsa hedef rıhtı ya da basışı değiştirip yeniden hesaplayın.',
  ],
  sections: [
    { h: 'Rıht ve basış nedir?', p: [
      'Bir basamağın iki ölçüsü vardır. <strong>Rıht</strong>, basamağın düşey yüzü, yani bir adımda yükseldiğiniz mesafedir. <strong>Basış</strong> ise ayağınızı koyduğunuz yatay yüzeyin derinliğidir. Merdivenin rahat ve güvenli olması bu iki ölçünün birbiriyle uyumuna bağlıdır: rıht yükseldikçe basış daralmalı, rıht alçaldıkça basış genişlemelidir.',
      'Merdivende en önemli kural bütün rıhtların <strong>eşit</strong> olmasıdır. İnsan yürürken ilk birkaç basamakta ritmi öğrenir ve sonraki adımları bakmadan atar; tek bir basamağın bir iki santimetre farklı olması tökezlemeye yol açar. Bu yüzden hesap, toplam yüksekliği tam sayıda eşit parçaya bölerek yapılır.',
    ] },
    { h: 'Hesap adımları', ol: [
      'Rıht sayısı: toplam yükseklik hedef rıhta bölünür ve en yakın tam sayıya yuvarlanır.',
      'Kesin rıht yüksekliği: toplam yükseklik bu tam sayıya bölünür.',
      'Basış genişliği: verilmediyse <strong>b = 63 − 2h</strong> bağıntısından bulunur.',
      'Basış sayısı: rıht sayısından bir eksiktir, çünkü son adımda üst kat döşemesine basılır.',
      'Yatay uzunluk: basış sayısı × basış genişliği.',
      'Eğim açısı: rıht yüksekliğinin basış genişliğine oranının ters tanjantı.',
    ] },
    { h: '2h + b kuralı (adım kuralı)', p: [
      'Merdiven tasarımında yüzyıllardır kullanılan pratik bağıntı, iki rıht ile bir basışın toplamının ortalama bir insan adımına eşit olması gerektiğini söyler: <strong>2h + b ≈ 60–64 cm</strong>. Burada h rıht yüksekliği, b basış genişliğidir. Düz zeminde attığınız adım, merdivende hem yükselip hem ilerlediğiniz için kısalır; formül bu dengeyi kurar. Araç ortadaki 63 cm değerini esas alır.',
      'Konutlarda sık rastlanan birleşimler 17 cm rıht ile 29 cm basış ya da 16 cm rıht ile 31 cm basıştır. Rıht 18 cm\'yi geçtikçe merdiven dikleşir ve yorucu olur; çok alçak rıhtlar ise merdiveni gereksiz uzatır. Sonuçtaki "2h + b değeri" satırı ve altındaki not, kendi yazdığınız basışın bu aralıkta kalıp kalmadığını gösterir.',
    ] },
    { h: 'Çözümlü örnek: 306 cm kat yüksekliği', p: [
      'Döşemeden döşemeye yükseklik 306 cm, hedef rıht 17 cm olsun. 306 ÷ 17 = 18 tam çıkar; merdivende <strong>18 rıht</strong> vardır ve her biri tam 17 cm\'dir. Basış genişliği 63 − 2 × 17 = <strong>29 cm</strong> bulunur. Basış sayısı 18 − 1 = 17 olduğundan merdivenin yatay uzunluğu 17 × 29 = <strong>493 cm</strong> eder.',
      'Eğim açısı tan⁻¹(17 ÷ 29) ≈ <strong>30,38°</strong> çıkar. Limon kirişinin, yani merdiveni yandan taşıyan eğik elemanın eksen uzunluğu √(306² + 493²) ≈ 580,25 cm\'dir. Yükseklik 300 cm olsaydı 300 ÷ 17 = 17,6 en yakın tam sayıya, 18\'e yuvarlanır; rıht 16,67 cm, basış 29,67 cm ve yatay uzunluk 504,33 cm olurdu.',
    ] },
    { h: 'Uygulamada dikkat edilecekler', ul: [
      'Yüksekliği kaba betondan değil, <strong>bitmiş döşeme</strong> kotlarından ölçün. Alt ve üst katta farklı kalınlıkta kaplama varsa ilk ve son rıht bozulur.',
      'Yatay uzunluk yalnızca basamakların kapladığı mesafedir; merdiven başında ve sonunda sahanlık ya da geçiş alanı ayrıca gerekir.',
      'Uzun merdiven kolları sahanlıkla bölünür. Sahanlık eklediğinizde her kolu ayrı yükseklikle hesaplayın, rıht yüksekliğinin iki kolda da aynı çıkmasına dikkat edin.',
      'Merdiven üzerindeki baş kurtarma yüksekliğini, yani basamak ucu ile üstteki döşeme ya da kiriş arasındaki mesafeyi kontrol edin.',
      'Döner ve dengelenmiş basamaklı merdivenlerde basış, yürüme hattı üzerinde ölçülür; bu araç düz kollu merdivenler içindir.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Bu araç geometrik bir ön hesap sunar. İzin verilen en büyük rıht, en küçük basış, merdiven ve sahanlık genişliği, korkuluk yüksekliği gibi ölçüler yapının türüne göre imar ve yangın mevzuatında tanımlanır ve zamanla değişebilir; güncel mevzuatı ve projenizi kontrol edin. Taşıyıcı sistem, donatı ve bağlantı ayrıntıları için bir inşaat mühendisine ya da mimara danışın.',
    ] },
  ],
  faq: [
    ['Basamak yüksekliği kaç santimetre olmalı?', 'Konutlarda 16–18 cm arası rıht yürüyüş açısından rahat kabul edilir. Kesin sınırlar yapının türüne göre mevzuatta belirlenir; projenizde geçerli olan güncel kuralları kontrol edin.'],
    ['3 metre yükseklik için kaç basamak gerekir?', '300 cm yükseklik ve 17 cm hedef rıhtla 18 rıht, yani 17 basış gerekir. Rıht yüksekliği 16,67 cm, 63 kuralına göre basış 29,67 cm olur ve merdiven yatayda yaklaşık 504 cm yer kaplar.'],
    ['2h + b formülü nedir?', 'İki rıht yüksekliği ile bir basış genişliğinin toplamının 60–64 cm arasında olması gerektiğini söyleyen adım kuralıdır. 17 cm rıht ve 29 cm basış için 2 × 17 + 29 = 63 cm eder.'],
    ['Basış sayısı neden rıht sayısından bir eksik?', 'Son rıhtı çıktığınızda ayağınız üst katın döşemesine basar; orada ayrıca bir basamak yüzeyi yapılmaz. 18 rıhtlı bir merdivende bu yüzden 17 basış vardır.'],
    ['Merdivenim için yer dar, ne yapabilirim?', 'Rıhtı biraz yükseltip basışı daraltmak yatay uzunluğu kısaltır, ancak merdiveni dikleştirir. Daha iyi çözüm çoğu zaman merdiveni sahanlıkla iki kola bölmek ya da L ve U biçiminde döndürmektir.'],
    ['Rahat bir merdivenin eğimi kaç derecedir?', 'Adım kuralına uyan konut merdivenleri genellikle 30 derece civarında bir eğime sahiptir. Açı büyüdükçe çıkış yorucu, iniş riskli hale gelir.'],
    ['Limon uzunluğu neyi ifade eder?', 'Merdivenin alt ucundan üst ucuna eğik doğrultudaki uzunluktur. Çelik ya da ahşap merdivenlerde taşıyıcı yan kirişin eksen boyunu tahmin etmek için kullanılır; birleşim payları ayrıca eklenir.'],
    ['Yazdığım ölçüler saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; girdiğiniz değerler sunucuya gönderilmez.'],
  ],
  related: ['rampa-egimi-hesapla', 'egim-yuzdesi-hesapla', 'beton-hesapla', 'kalip-alani-hesapla', 'alan-cevre-hesapla'],
};
