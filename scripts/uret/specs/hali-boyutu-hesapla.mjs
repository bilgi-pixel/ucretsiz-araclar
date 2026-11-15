export default {
  slug: 'hali-boyutu-hesapla',
  title: 'Halı Boyutu Seçimi Hesaplama',
  h1Tail: 'odaya göre halı ölçüsü',
  pageTitle: 'Halı Boyutu Hesaplama – Odaya Göre Kaç Metrekare Halı Alınır?',
  description: 'Oda ölçülerine ve duvar kenarında bırakılacak boşluğa göre en büyük halı ölçüsünü, uygun standart halı boyutunu, metrekaresini ve zemini kaplama oranını hesaplayın.',
  card: 'Oda enini ve boyunu yazın; kenar boşluğuna göre sığan en büyük halıyı ve en yakın standart halı ölçüsünü görün.',
  category: 'gunluk',
  keywords: ['halı boyutu hesaplama', 'odaya göre halı ölçüsü', 'salon halısı kaç metrekare olmalı', 'halı ölçüleri', '160x230 halı kaç metrekare', 'halı seçimi', 'standart halı ölçüleri'],
  lead: 'Odanızın enini ve boyunu metre olarak yazın, halının çevresinde açıkta kalmasını istediğiniz zemin payını belirleyin. Araç, bu paya uyan <strong>en büyük halı ölçüsünü</strong> ve mağazalarda bulunan standart ölçülerden odaya sığan en büyüğünü önerir.',
  button: 'Hesapla',
  inputs: [
    { id: 'en', label: 'Oda eni (m)', type: 'number', placeholder: 'Örn. 4' },
    { id: 'boy', label: 'Oda boyu (m)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'bosluk', label: 'Duvar kenarında bırakılacak boşluk (cm)', type: 'number', value: '30', hint: 'Küçük odalarda 20–30 cm, geniş salonlarda 40–50 cm yaygındır.' },
  ],
  compute(v, h) {
    const a = h.pos(v.en, 'Oda eni');
    const b = h.pos(v.boy, 'Oda boyu');
    const bos = h.nonneg(h.opt(v.bosluk, 30, 'Kenar boşluğu'), 'Kenar boşluğu');
    if (a > 30 || b > 30) h.err('Oda ölçüleri metre olarak yazılmalı ve 30 metreyi aşmamalı (350 cm için 3,5 yazın).');
    const W = Math.min(a, b) * 100, L = Math.max(a, b) * 100;
    const mw = W - 2 * bos, ml = L - 2 * bos;
    if (mw < 40) h.err('Bu kenar boşluğuyla odada halıya yer kalmıyor; boşluğu azaltın ya da oda ölçülerini kontrol edin.');
    const STD = [[80, 150], [120, 180], [160, 230], [200, 290], [240, 340], [300, 400]];
    let sec = null;
    for (const s of STD) if (s[0] <= mw + 1e-6 && s[1] <= ml + 1e-6) sec = s;
    const oda = W * L / 10000;
    const rows = [];
    if (sec) {
      const alan = sec[0] * sec[1] / 10000;
      rows.push(['Önerilen standart halı', `${sec[0]} × ${sec[1]} cm`]);
      rows.push(['Halı alanı', h.fmt(alan, 2) + ' m²']);
      rows.push(['Zemini kaplama oranı', '%' + h.fmt(alan / oda * 100, 1)]);
      rows.push(['Halı ortalanınca kenar boşluğu', `kısa kenarlarda ${h.fmt((L - sec[1]) / 2, 1)} cm, uzun kenarlarda ${h.fmt((W - sec[0]) / 2, 1)} cm`]);
    } else {
      rows.push(['Önerilen standart halı', 'Uygun standart ölçü yok (özel kesim ya da yolluk düşünün)']);
    }
    rows.push(['Sığan en büyük halı', `${h.fmt(mw, 1)} × ${h.fmt(ml, 1)} cm (${h.fmt(mw * ml / 10000, 2)} m²)`]);
    rows.push(['Oda alanı', h.fmt(oda, 2) + ' m²']);
    return {
      rows,
      note: 'Standart ölçüler olarak 80×150, 120×180, 160×230, 200×290, 240×340 ve 300×400 cm alınmıştır. Üreticiye göre birkaç santimetrelik farklar olabilir; satın almadan önce etiketi kontrol edin.',
    };
  },
  cases: [
    { in: { en: '4', boy: '5', bosluk: '40' }, out: { 'Önerilen standart halı': '300 × 400 cm', 'Halı alanı': '12 m²', 'Zemini kaplama oranı': '%60', 'Sığan en büyük halı': '320 × 420 cm (13,44 m²)' } },
    { in: { en: '3', boy: '4', bosluk: '30' }, out: { 'Önerilen standart halı': '240 × 340 cm', 'Halı alanı': '8,16 m²', 'Zemini kaplama oranı': '%68', 'Oda alanı': '12 m²' } },
    { in: { en: '3,5', boy: '4,5', bosluk: '40' }, out: { 'Önerilen standart halı': '240 × 340 cm', 'Zemini kaplama oranı': '%51,8', 'Halı ortalanınca kenar boşluğu': 'kısa kenarlarda 55 cm, uzun kenarlarda 55 cm' } },
    { in: { en: '5', boy: '3', bosluk: '30' }, out: { 'Önerilen standart halı': '240 × 340 cm', 'Sığan en büyük halı': '240 × 440 cm (10,56 m²)', 'Halı ortalanınca kenar boşluğu': 'kısa kenarlarda 80 cm, uzun kenarlarda 30 cm' } },
    { in: { en: '2', boy: '2,5', bosluk: '20' }, out: { 'Önerilen standart halı': '120 × 180 cm', 'Halı alanı': '2,16 m²', 'Zemini kaplama oranı': '%43,2' } },
    { in: { en: '1,2', boy: '1,5', bosluk: '30' }, out: { 'Önerilen standart halı': 'Uygun standart ölçü yok (özel kesim ya da yolluk düşünün)', 'Sığan en büyük halı': '60 × 90 cm (0,54 m²)' } },
    { in: { en: '2', boy: '2', bosluk: '120' }, error: true },
    { in: { en: '400', boy: '500', bosluk: '30' }, error: true },
    { in: { en: '', boy: '5' }, error: true },
  ],
  howto: [
    'Odanın enini ve boyunu duvardan duvara ölçüp metre olarak yazın; 3 metre 50 santim için 3,5 girin.',
    'Halının dört yanında açıkta kalmasını istediğiniz zemin payını santimetre olarak belirleyin.',
    '"Hesapla" düğmesine basın. Önerilen standart ölçüyü, halının metrekaresini ve zeminin yüzde kaçını kaplayacağını okuyun.',
    'Sonucu odadaki kapı açılımı, kalorifer ve gömme dolap gibi engellerle karşılaştırın; gerekirse boşluğu artırıp yeniden hesaplayın.',
    'Karar vermeden önce önerilen ölçüyü zemine maskeleme bandıyla işaretleyip mobilyalarla ilişkisine bakın.',
  ],
  sections: [
    { h: 'Hesap nasıl yapılıyor?', p: [
      'Halı duvardan duvara döşenmez; çevresinde bir zemin şeridi bırakılır. Bu şerit odanın sınırlarını gösterir, halıyı çerçeveler ve süpürgelik, kalorifer, kapı gibi yerlerde halının kıvrılmasını önler. Araç, odanın her iki ölçüsünden bu payın iki katını düşer: <strong>en büyük halı eni = oda eni − 2 × boşluk</strong>, <strong>en büyük halı boyu = oda boyu − 2 × boşluk</strong>.',
      'Ardından Türkiye\'de mağazalarda en sık rastlanan hazır halı ölçüleri taranır ve hem eni hem boyu bu sınıra sığan en büyük ölçü seçilir. Halının uzun kenarı odanın uzun kenarına paralel kabul edilir; eni ve boyu hangi sırayla yazdığınız sonucu değiştirmez.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 – 4 × 5 m salon, 40 cm boşluk:</strong> Sığan en büyük halı (400 − 80) × (500 − 80) = 320 × 420 cm\'dir. Buna sığan en büyük standart ölçü 300 × 400 cm\'dir; alanı 12 m² eder ve 20 m²\'lik zeminin %60\'ını kaplar. Halı ortalandığında dört yanda 50\'şer cm zemin görünür.',
      '<strong>Örnek 2 – 3 × 4 m oda, 30 cm boşluk:</strong> Sınır 240 × 340 cm çıkar ve bu tam olarak bir standart ölçüdür. Halı 8,16 m², kaplama oranı %68\'dir.',
      '<strong>Örnek 3 – 3,5 × 4,5 m oda, 40 cm boşluk:</strong> Sınır 270 × 370 cm\'dir. 300 × 400 sığmadığı için 240 × 340 cm önerilir; kenarlarda 55\'er cm boşluk kalır ve zeminin %51,8\'i kaplanır. Aradaki farkı kapatmak isteyenler için özel ölçü kesim seçeneği düşünülebilir.',
    ] },
    { h: 'Standart halı ölçüleri ve metrekareleri', ul: [
      '<strong>80 × 150 cm</strong> = 1,2 m² (paspas üstü, yatak yanı, mutfak)',
      '<strong>120 × 180 cm</strong> = 2,16 m² (küçük oda, çalışma köşesi, antre)',
      '<strong>160 × 230 cm</strong> = 3,68 m² (genç odası, küçük oturma odası, sehpa altı)',
      '<strong>200 × 290 cm</strong> = 5,8 m² (oturma odası, yatak odası)',
      '<strong>240 × 340 cm</strong> = 8,16 m² (salon)',
      '<strong>300 × 400 cm</strong> = 12 m² (geniş salon)',
    ], p: [
      'Halı fiyatları çoğu zaman metrekare üzerinden verildiği için bu çarpımlar bütçe hesabında da işe yarar. Üreticiler ölçüleri birkaç santim farklı yuvarlayabilir; örneğin 200 × 290 yerine 200 × 300 cm sunulabilir.',
    ] },
    { h: 'Mobilyaya göre halı yerleşimi', p: [
      'Oda ölçüsü üst sınırı verir; doğru boyutu ise çoğunlukla mobilya düzeni belirler. Oturma gruplarında üç yaygın yaklaşım vardır: bütün koltukların dört ayağıyla halının üzerinde durduğu geniş düzen, koltukların yalnızca ön ayaklarının halıya bastığı orta düzen ve halının yalnızca orta sehpanın altında kaldığı küçük düzen. Ön ayakların halıya basması, koltukları ve halıyı tek bir grup olarak birbirine bağladığı için en çok önerilen çözümdür; halının oturma grubundan iki yanda biraz taşması dengeli görünür.',
      'Yemek masası altındaki halıda ölçüt sandalyedir: sandalye geriye çekildiğinde arka ayakları halının dışına düşmemelidir. Bunun için halının masadan her yönde yaklaşık 60–70 cm taşması gerekir. Yatak odasında halı yatağın altına serilecekse ayakucunda ve iki yanda basılacak kadar, en az yarım metre civarı dışarıda kalması beklenir; aksi halde yatağın iki yanına ayrı küçük halılar daha kullanışlıdır.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Küçük halı almak: odanın ortasında ada gibi duran halı mekânı olduğundan küçük gösterir. İki ölçü arasında kaldıysanız çoğu zaman büyüğü daha iyi sonuç verir.',
      'Kapı kanadını hesaba katmamak: kalın havlı halı, kapının altından geçmeyebilir. Kapı açılım alanını boşluk olarak bırakın.',
      'Oda ölçüsünü süpürgelikten süpürgeliğe değil, duvardan duvara almak; fark küçük olsa da sınırda kalan ölçülerde önem kazanır.',
      'Yerden ısıtmalı zeminlerde çok kalın ve kaplama oranı çok yüksek halı seçmek; halı ısının odaya geçişini yavaşlatır.',
      'Girintili çıkıntılı (L biçimli) odada tüm alanı tek dikdörtgen gibi girmek; halının serileceği bölümün ölçülerini yazın.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç dikdörtgen bir oda ve dikdörtgen halı varsayar; yuvarlak ve oval halılar, yolluklar ve duvardan duvara kaplamalar kapsam dışındadır. Öneri yalnızca geometriye dayanır; mobilya yerleşimi, kapı yönü ve kişisel zevk son kararı değiştirebilir. Listelenen standart ölçüler yaygın olanlardır, her üreticinin ölçü yelpazesi farklı olabilir.',
    ] },
  ],
  faq: [
    ['Odaya göre halı ölçüsü nasıl seçilir?', 'Oda eninden ve boyundan, halı çevresinde bırakmak istediğiniz boşluğun iki katını çıkarın. Çıkan ölçü halının üst sınırıdır; bu sınıra sığan en büyük standart halı çoğu zaman en doğru tercihtir. 3 × 4 metrelik odada 30 cm boşlukla 240 × 340 cm halı sığar.'],
    ['Halı ile duvar arasında ne kadar boşluk bırakılmalı?', 'Küçük odalarda 20–30 cm, orta ve büyük salonlarda 40–50 cm yaygın değerlerdir. Önemli olan boşluğun dört yanda birbirine yakın olmasıdır; bir yanda 10, diğer yanda 80 cm kalan halı kaymış gibi görünür.'],
    ['160 × 230 halı kaç metrekaredir?', '1,6 × 2,3 = 3,68 metrekaredir. Benzer biçimde 200 × 290 cm halı 5,8 m², 240 × 340 cm halı 8,16 m², 300 × 400 cm halı 12 m² eder.'],
    ['20 metrekare salona kaç metrekare halı gerekir?', 'Odanın biçimine bağlıdır. 4 × 5 metrelik bir salonda 40 cm kenar boşluğuyla 300 × 400 cm, yani 12 m² halı uygun düşer. Aynı alana sahip dar uzun bir odada (ör. 3,2 × 6,25 m) en sınırlayıcı olacağı için daha küçük bir ölçü çıkar.'],
    ['Halı zeminin yüzde kaçını kaplamalı?', 'Kesin bir kural yoktur; oturma odalarında zeminin kabaca yarısı ile dörtte üçü arasını kaplayan halılar dengeli görünür. Oran çok düşükse halı küçük kalmıştır, çok yüksekse duvardan duvara kaplama hissi verir.'],
    ['Araç neden daha küçük bir ölçü önerdi?', 'Standart ölçülerden hem eni hem boyu sınıra sığan seçilir. Halının yalnızca bir kenarı birkaç santim taşsa bile bir alt ölçüye inilir. Kenar boşluğunu biraz azaltarak bir üst ölçünün sığıp sığmadığını deneyebilirsiniz.'],
    ['Uygun standart ölçü yok ne demek?', 'Oda ya da kalan alan, listedeki en küçük ölçü olan 80 × 150 cm\'den de dar demektir. Bu durumda özel kesim halı, yolluk ya da paspas boyutunda ürünlere bakmak gerekir; "sığan en büyük halı" satırı aradığınız üst sınırı gösterir.'],
    ['Girdiğim ölçüler bir yere gönderiliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; oda ölçüleriniz sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['avize-boyutu-hesapla', 'masa-kisi-sayisi-hesapla', 'duvar-resim-hizalama-hesapla', 'metrekare-fiyati-hesapla', 'oda-hacmi-hesapla'],
};
