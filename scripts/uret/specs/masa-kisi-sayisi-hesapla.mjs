export default {
  slug: 'masa-kisi-sayisi-hesapla',
  title: 'Masa Boyutuna Göre Kişi Sayısı Hesaplama',
  h1Tail: 'kaç kişilik masa?',
  pageTitle: 'Masa Kaç Kişilik? Masa Boyutuna Göre Kişi Sayısı Hesaplama',
  description: 'Dikdörtgen, kare ya da yuvarlak masanın ölçüsüne göre kaç kişinin rahat oturabileceğini hesaplayın. Kişi başı 60 cm kuralı, sıkışık düzen ve gereken oda alanı dahil.',
  card: 'Masa ölçüsünü girin; rahat ve sıkışık düzende kaç kişi oturacağını ve masanın çevresinde gereken alanı öğrenin.',
  category: 'gunluk',
  keywords: ['masa kaç kişilik', 'masa boyutuna göre kişi sayısı', '160x90 masa kaç kişilik', 'yuvarlak masa kaç kişilik', 'yemek masası ölçüleri', 'kişi başı masa genişliği', '6 kişilik masa ölçüsü'],
  lead: 'Masanın biçimini seçip ölçülerini santimetre olarak yazın. Araç, sofrada kişi başına ayrılan kenar payına göre masaya <strong>kaç kişinin rahat sığacağını</strong>, sıkışık düzende kaça çıkabileceğini ve sandalyelerle birlikte masanın odada ne kadar yer isteyeceğini hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'sekil', label: 'Masa biçimi', type: 'select', options: [['dikdortgen', 'Dikdörtgen / kare'], ['yuvarlak', 'Yuvarlak']] },
    { id: 'uzunluk', label: 'Uzunluk ya da çap (cm)', type: 'number', placeholder: 'Örn. 160' },
    { id: 'genislik', label: 'Genişlik (cm) – yuvarlak masada boş bırakın', type: 'number', placeholder: 'Örn. 90' },
    { id: 'pay', label: 'Kişi başı kenar payı (cm)', type: 'number', value: '60', hint: 'Rahat yemek düzeni için 60 cm; kolçaklı sandalyede 65–70 cm.' },
    { id: 'bas', label: 'Masa başlarına oturulacak mı?', type: 'select', options: [['evet', 'Evet – iki başa birer kişi'], ['hayir', 'Hayır – yalnızca uzun kenarlar']] },
  ],
  compute(v, h) {
    const pay = h.pos(v.pay, 'Kişi başı kenar payı');
    if (pay < 45 || pay > 100) h.err('Kişi başı kenar payı 45 ile 100 cm arasında olmalı; rahat düzen için 60 yazın.');
    const sikPay = pay - 10;
    const kat = (x, p) => Math.floor(x / p + 1e-9);
    const m = (cm) => h.fmt(cm / 100, 2);
    if (v.sekil === 'yuvarlak') {
      const cap = h.pos(v.uzunluk, 'Çap');
      if (cap > 1000) h.err('Çap 1000 cm\'den büyük olamaz; değeri santimetre olarak yazın.');
      const cevre = Math.PI * cap;
      const rahat = kat(cevre, pay);
      if (rahat < 1) h.err('Bu çapta bir masaya kişi sığmıyor; çapı santimetre olarak yazdığınızdan emin olun.');
      return {
        rows: [
          ['Rahat oturan kişi sayısı', rahat + ' kişi'],
          ['Sıkışık düzende', `${kat(cevre, sikPay)} kişi (kişi başı ${h.fmt(sikPay, 0)} cm)`],
          ['Dağılım', `Çevre boyunca ${rahat} kişi, kişi başına ${h.fmt(cevre / rahat, 1)} cm`],
          ['Masa çevresi', h.fmt(cevre, 0) + ' cm'],
          ['Masa alanı', h.fmt(Math.PI * cap * cap / 40000, 2) + ' m²'],
          ['Sandalyelerle gereken alan', `${m(cap + 180)} × ${m(cap + 180)} m`],
        ],
        note: 'Yuvarlak masada kişi sayısı çevrenin kişi başı paya bölünmesiyle bulunur. Gereken alan, masanın her yanında sandalye ve geçiş için 90 cm bırakılarak hesaplanmıştır.',
      };
    }
    let L = h.pos(v.uzunluk, 'Uzunluk');
    let W = h.pos(v.genislik, 'Genişlik');
    if (W > L) { const t = L; L = W; W = t; }
    if (L > 1000) h.err('Uzunluk 1000 cm\'den büyük olamaz; değeri santimetre olarak yazın.');
    const basVar = v.bas !== 'hayir';
    const say = (p) => {
      const yan = kat(L, p);
      const b = basVar && W >= p - 1e-9 ? 1 : 0;
      return { yan, b, top: 2 * yan + 2 * b };
    };
    const r = say(pay), s = say(sikPay);
    if (r.top < 1) h.err('Bu ölçüde bir masaya kişi sığmıyor; ölçüleri santimetre olarak yazdığınızdan emin olun.');
    return {
      rows: [
        ['Rahat oturan kişi sayısı', r.top + ' kişi'],
        ['Sıkışık düzende', `${s.top} kişi (kişi başı ${h.fmt(sikPay, 0)} cm)`],
        ['Dağılım', `Uzun kenarlarda ${r.yan}+${r.yan}` + (r.b ? ', başlarda 1+1' : ', başlar boş')],
        ['Masa çevresi', h.fmt(2 * (L + W), 0) + ' cm'],
        ['Masa alanı', h.fmt(L * W / 10000, 2) + ' m²'],
        ['Sandalyelerle gereken alan', `${m(L + 180)} × ${m(W + 180)} m`],
      ],
      note: (basVar && !r.b ? 'Masa genişliği kişi başı paydan dar olduğu için başlara oturma sayılmadı. ' : '') + 'Gereken alan, masanın her yanında sandalye ve geçiş için 90 cm bırakılarak hesaplanmıştır. Masa ayaklarının konumu köşe yerlerini kısıtlayabilir.',
    };
  },
  cases: [
    { in: { sekil: 'dikdortgen', uzunluk: '160', genislik: '90', pay: '60', bas: 'evet' }, out: { 'Rahat oturan kişi sayısı': '6 kişi', 'Sıkışık düzende': '8 kişi (kişi başı 50 cm)', 'Dağılım': 'Uzun kenarlarda 2+2, başlarda 1+1', 'Masa alanı': '1,44 m²', 'Sandalyelerle gereken alan': '3,4 × 2,7 m' } },
    { in: { sekil: 'yuvarlak', uzunluk: '120', pay: '60' }, out: { 'Rahat oturan kişi sayısı': '6 kişi', 'Sıkışık düzende': '7 kişi (kişi başı 50 cm)', 'Masa çevresi': '377 cm', 'Masa alanı': '1,13 m²', 'Sandalyelerle gereken alan': '3 × 3 m' } },
    { in: { sekil: 'dikdortgen', uzunluk: '200', genislik: '100', pay: '60', bas: 'evet' }, out: { 'Rahat oturan kişi sayısı': '8 kişi', 'Sıkışık düzende': '10 kişi (kişi başı 50 cm)', 'Masa çevresi': '600 cm' } },
    { in: { sekil: 'dikdortgen', uzunluk: '180', genislik: '90', pay: '60', bas: 'hayir' }, out: { 'Rahat oturan kişi sayısı': '6 kişi', 'Sıkışık düzende': '6 kişi (kişi başı 50 cm)', 'Dağılım': 'Uzun kenarlarda 3+3, başlar boş' } },
    { in: { sekil: 'dikdortgen', uzunluk: '80', genislik: '80', pay: '60', bas: 'evet' }, out: { 'Rahat oturan kişi sayısı': '4 kişi', 'Dağılım': 'Uzun kenarlarda 1+1, başlarda 1+1' } },
    { in: { sekil: 'yuvarlak', uzunluk: '150', pay: '60' }, out: { 'Rahat oturan kişi sayısı': '7 kişi', 'Sıkışık düzende': '9 kişi (kişi başı 50 cm)' } },
    { in: { sekil: 'dikdortgen', uzunluk: '90', genislik: '240', pay: '60', bas: 'evet' }, out: { 'Rahat oturan kişi sayısı': '10 kişi', 'Dağılım': 'Uzun kenarlarda 4+4, başlarda 1+1' } },
    { in: { sekil: 'dikdortgen', uzunluk: '160', genislik: '', pay: '60' }, error: true },
    { in: { sekil: 'yuvarlak', uzunluk: '0', pay: '60' }, error: true },
    { in: { sekil: 'dikdortgen', uzunluk: '160', genislik: '90', pay: '20' }, error: true },
  ],
  howto: [
    'Masanızın biçimini seçin; kare masalar için "Dikdörtgen / kare" seçeneğini kullanın.',
    'Dikdörtgen masada uzunluk ve genişliği, yuvarlak masada yalnızca çapı santimetre olarak yazın. Açılır masalarda açık ve kapalı hali ayrı ayrı deneyin.',
    'Kişi başı kenar payını gerekiyorsa değiştirin: günlük rahat düzen için 60 cm uygundur.',
    'Dikdörtgen masada iki başa da kişi oturtup oturtmayacağınızı seçin.',
    '"Hesapla" düğmesine basın; rahat ve sıkışık düzendeki kişi sayısını, dağılımı ve odada gereken alanı okuyun.',
  ],
  sections: [
    { h: 'Kişi başı 60 cm kuralı', p: [
      'Sofrada bir kişinin rahatça yemek yiyebilmesi için masa kenarında yaklaşık <strong>60 cm</strong> genişliğe ihtiyacı vardır. Bu pay, bir servis tabağı ile iki yanındaki çatal-bıçağı ve dirseklerin komşuya çarpmadan hareket edebileceği alanı karşılar. Mobilya üreticilerinin "6 kişilik", "8 kişilik" tanımları da büyük ölçüde bu değere dayanır. Kalabalık davetlerde, çocuklu sofralarda ya da kolçaksız dar sandalyelerle kişi başı 50 cm\'ye inilebilir; kolçaklı ve geniş sandalyelerde 65–70 cm gerekir.',
      'Derinlik yönünde de bir sınır vardır: karşılıklı oturan iki kişinin tabakları ve ortadaki servis kapları için masanın en az 80–90 cm genişliğinde olması beklenir. Daha dar masalarda ortaya servis tabağı koymak zorlaşır.',
    ] },
    { h: 'Dikdörtgen masada hesap', p: [
      'Uzun kenarın her birine sığan kişi sayısı, uzunluğun kişi başı paya bölünüp aşağı yuvarlanmasıyla bulunur. İki uzun kenar olduğu için bu sayı ikiyle çarpılır. Masa başlarına oturulacaksa ve masanın genişliği en az kişi başı pay kadarsa her başa bir kişi eklenir: <strong>kişi = 2 × ⌊uzunluk ÷ pay⌋ + 2</strong>.',
      '<strong>Örnek:</strong> 160 × 90 cm masada 160 ÷ 60 = 2,67 olduğundan her uzun kenara 2 kişi oturur; başlarla birlikte 2 + 2 + 1 + 1 = <strong>6 kişi</strong> eder. Kişi başı 50 cm\'ye inilirse 160 ÷ 50 = 3,2 ile her kenara 3 kişi sığar ve toplam 8 olur. 200 × 100 cm masa rahat düzende 3 + 3 + 1 + 1 = 8 kişiliktir, sıkışık düzende 10 kişi alır.',
      'Başlara oturulmadığında, örneğin masa duvara ya da pencere önüne dayalıysa, yalnızca uzun kenarlar sayılır: 180 × 90 cm masa bu durumda 3 + 3 = 6 kişiliktir.',
    ] },
    { h: 'Yuvarlak masada hesap', p: [
      'Yuvarlak masada kenar uzunluğu çevredir: <strong>çevre = π × çap</strong>. Kişi sayısı çevrenin kişi başı paya bölünüp aşağı yuvarlanmasıyla bulunur. 120 cm çaplı masanın çevresi 3,1416 × 120 ≈ 377 cm\'dir; 377 ÷ 60 = 6,28 olduğundan masa <strong>6 kişiliktir</strong> ve her kişiye yaklaşık 62,8 cm düşer. Sıkışık düzende 377 ÷ 50 = 7,54 ile 7 kişi oturur.',
      'Yuvarlak masanın üstünlüğü köşesinin olmaması ve herkesin birbirini görebilmesidir. Buna karşılık çap büyüdükçe masanın ortasına uzanmak zorlaşır; 150 cm\'nin üzerindeki çaplarda ortaya döner tabla koymak yaygın bir çözümdür. Ortadan tek ayaklı masalar, bacakların ayağa çarpmaması bakımından dört ayaklı olanlardan bir kişi daha fazla alabilir.',
    ] },
    { h: 'Hızlı başvuru: yaygın masa ölçüleri', ul: [
      '<strong>80 × 80 cm kare:</strong> 4 kişi',
      '<strong>120 × 80 cm:</strong> 4 kişi rahat (uzun kenarlarda 2+2), başlarla 6',
      '<strong>160 × 90 cm:</strong> 6 kişi',
      '<strong>180–200 × 100 cm:</strong> 8 kişi',
      '<strong>240 × 100 cm:</strong> 10 kişi',
      '<strong>90 cm çap yuvarlak:</strong> 4 kişi',
      '<strong>120 cm çap yuvarlak:</strong> 6 kişi',
      '<strong>150 cm çap yuvarlak:</strong> 7 kişi rahat, 9 kişi sıkışık',
    ] },
    { h: 'Masanın çevresinde ne kadar boşluk gerekir?', p: [
      'Masanın kendisi kadar çevresindeki alan da önemlidir. Bir sandalyenin geriye çekilip kişinin kalkabilmesi için masa kenarından duvara ya da mobilyaya kadar yaklaşık 75–90 cm, oturan birinin arkasından başka birinin geçebilmesi içinse 100–120 cm gerekir. Araç, her yönde 90 cm ekleyerek masanın oturtulacağı en küçük dikdörtgeni verir: 160 × 90 cm masa için 3,4 × 2,7 metre.',
      'Odanız bundan dar ise masayı bir kenarından duvara yaklaştırmak ya da duvar tarafına sandalye yerine bank koymak yer kazandırır; bu durumda duvar tarafındaki baş ya da kenar için oturma sayısını yeniden değerlendirin. Açılır masalarda kapalı halin günlük dolaşımı, açık halin ise misafir düzenini karşıladığını ayrı ayrı kontrol edin.',
    ] },
    { h: 'Sınırlar ve sık yapılan hatalar', ul: [
      'Köşe çakışması: başlara oturulduğunda uzun kenarın uçlarındaki kişilerin dizleri ve dirsekleri baştaki kişiyle paylaşılır. Uzunluk tam katında olan masalarda (ör. 120 cm\'de 2 kişi + baş) köşeler sıkışık gelebilir.',
      'Masa ayakları: köşeden içeride duran kalın ayaklar ya da çapraz kayıtlar kenardaki oturma yerini kısaltır; ayaklar arası net açıklığı ölçüp uzunluk olarak onu girmek daha gerçekçidir.',
      'Oval masalar: araçta ayrı seçenek yoktur. Oval masa aynı ölçüdeki dikdörtgen masayla aynı ya da bir eksik kişi alır.',
      'Toplantı ve çalışma masalarında dizüstü bilgisayar ve evrak için kişi başı 70–80 cm almak daha doğrudur; payı değiştirerek hesaplayabilirsiniz.',
    ] },
  ],
  faq: [
    ['160 × 90 masa kaç kişiliktir?', 'Kişi başı 60 cm ile uzun kenarlara ikişer, başlara birer kişi oturur; toplam 6 kişiliktir. Sıkışık düzende uzun kenarlara üçer kişi sığdırılarak 8 kişi ağırlanabilir.'],
    ['Yuvarlak masa çapına göre kaç kişi alır?', 'Çevre (3,14 × çap) 60\'a bölünür. 90 cm çap 4 kişi, 100–110 cm çap 5 kişi, 120 cm çap 6 kişi, 150 cm çap 7 kişi alır. Kişi başı 50 cm\'ye inildiğinde 150 cm\'lik masada 9 kişi oturabilir.'],
    ['8 kişilik masa kaç santimetre olmalı?', 'Başlara birer kişi oturacaksa uzun kenarlara üçer kişi gerekir; bu da en az 180 cm uzunluk demektir. Rahat bir 8 kişilik masa için 200 × 100 cm iyi bir ölçüdür. Yuvarlak masada 8 kişi için çevrenin 480 cm, yani çapın yaklaşık 153 cm olması gerekir.'],
    ['Kişi başı 60 cm neye göre belirlenmiş?', 'Ortalama bir yetişkinin omuz genişliği ile çatal-bıçak kullanırken dirseklerinin açıldığı mesafenin toplamına dayanan, mobilya ve restoran düzenlemesinde yaygın kullanılan pratik bir değerdir. Resmî bir standart değil, konfor ölçütüdür.'],
    ['Masa başına oturmak için masa ne kadar geniş olmalı?', 'Bir kişinin sığması için masanın genişliği en az kişi başı pay kadar, yani 60 cm olmalıdır. Uygulamada 80 cm\'den dar masalarda baştaki kişinin tabağı yandakilerle çakışır; araç genişlik paydan darsa başları saymaz.'],
    ['Masam için oda yeterli mi, nasıl anlarım?', 'Sonuçtaki "Sandalyelerle gereken alan" satırına bakın. Bu, masanın her yanında 90 cm bırakılmış halidir. Odanızın boş alanı bundan küçükse sandalyeleri çekmek ve arkadan geçmek zorlaşır; daha küçük bir masa ya da duvara yaslı yerleşim düşünün.'],
    ['Kare masa için hangi seçeneği kullanmalıyım?', 'Dikdörtgen / kare seçeneğini seçip uzunluk ve genişliğe aynı değeri yazın. 80 × 80 cm masa 4 kişi, 120 × 120 cm masa bu hesapla 6 kişi alır; büyük kare masalarda ortaya uzanmak zorlaştığı için dikdörtgen ya da yuvarlak biçim daha kullanışlıdır.'],
    ['Girdiğim ölçüler saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['davet-masa-hesapla', 'hali-boyutu-hesapla', 'avize-boyutu-hesapla', 'makarna-porsiyon-hesapla', 'cm-inc-cevir'],
};
