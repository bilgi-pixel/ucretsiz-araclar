export default {
  slug: 'boru-agirligi-hesapla',
  title: 'Boru Ağırlığı Hesaplama',
  h1Tail: 'dış çap ve et kalınlığından kg/m',
  pageTitle: 'Boru Ağırlığı Hesaplama – Çelik Boru Metre Ağırlığı (kg/m)',
  description: 'Dış çap ve et kalınlığını girin; çelik, paslanmaz, alüminyum, bakır ya da plastik borunun metre ağırlığını ve toplam ağırlığını anında hesaplayın.',
  card: 'Dış çap, et kalınlığı ve boydan borunun metre ağırlığını ve toplam kilosunu bulun; çelik, paslanmaz, bakır, PVC.',
  category: 'insaat',
  keywords: ['boru ağırlığı hesaplama', 'çelik boru ağırlığı', 'boru metre ağırlığı', 'boru kg/m', 'paslanmaz boru ağırlığı', 'et kalınlığı boru ağırlık', 'boru ağırlık formülü'],
  lead: "Yuvarlak kesitli bir borunun <strong>metre ağırlığını</strong> ve toplam ağırlığını dış çap ile et kalınlığından hesaplayın. Malzemeyi listeden seçebilir ya da kendi yoğunluk değerinizi yazabilirsiniz.",
  button: 'Hesapla',
  inputs: [
    { id: 'cap', label: 'Dış çap (mm)', type: 'number', placeholder: 'Örn. 60,3' },
    { id: 'et', label: 'Et kalınlığı (mm)', type: 'number', placeholder: 'Örn. 3,2' },
    { id: 'boy', label: 'Boru boyu (m)', type: 'number', value: '6', hint: 'Tek bir borunun uzunluğu.' },
    { id: 'adet', label: 'Adet', type: 'number', value: '1' },
    { id: 'malzeme', label: 'Malzeme', type: 'select', options: [['7850', 'Çelik (7850 kg/m³)'], ['7930', 'Paslanmaz çelik 304 (7930 kg/m³)'], ['2700', 'Alüminyum (2700 kg/m³)'], ['8960', 'Bakır (8960 kg/m³)'], ['8500', 'Pirinç (8500 kg/m³)'], ['1400', 'Sert PVC (1400 kg/m³)'], ['950', 'Polietilen PE100 (950 kg/m³)']] },
    { id: 'ozel', label: 'Özel yoğunluk (kg/m³)', type: 'number', placeholder: 'Boş bırakılabilir', hint: 'Doldurursanız listedeki malzeme yerine bu değer kullanılır.' },
  ],
  compute(v, h) {
    const D = h.pos(v.cap, 'Dış çap');
    const t = h.pos(v.et, 'Et kalınlığı');
    const L = h.pos(v.boy, 'Boru boyu');
    const n = h.posint(v.adet, 'Adet');
    if (t * 2 >= D) h.err('Et kalınlığı dış çapın yarısından küçük olmalı; aksi halde boru içi boşluk kalmaz. Değerleri milimetre olarak yazdığınızı kontrol edin.');
    const ro = String(v.ozel ?? '').trim() === '' ? Number(v.malzeme) : h.pos(v.ozel, 'Özel yoğunluk');
    const alan = Math.PI * (D - t) * t; // mm²
    const kgm = alan * ro / 1e6;
    const toplamBoy = L * n;
    return {
      rows: [
        ['Metre ağırlığı', h.fmt(kgm, 3) + ' kg/m'],
        ['Toplam ağırlık', h.fmt(kgm * toplamBoy, 2) + ' kg'],
        ['Bir borunun ağırlığı', h.fmt(kgm * L, 2) + ' kg'],
        ['Toplam uzunluk', h.fmt(toplamBoy, 2) + ' m'],
        ['İç çap', h.fmt(D - 2 * t, 2) + ' mm'],
        ['Kesit alanı', h.fmt(alan, 1) + ' mm²'],
      ],
      note: 'Kuramsal ağırlıktır; üretim toleransı, kaynak dikişi, galvaniz ya da boya kaplaması gerçek tartıyı birkaç yüzde değiştirebilir.',
    };
  },
  cases: [
    { in: { cap: '60,3', et: '3,2', boy: '6', adet: '1' }, out: { 'Metre ağırlığı': '4,506 kg/m', 'Toplam ağırlık': '27,04 kg', 'İç çap': '53,9 mm' } },
    { in: { cap: '114,3', et: '3,6', boy: '6', adet: '10' }, out: { 'Metre ağırlığı': '9,828 kg/m', 'Toplam ağırlık': '589,69 kg', 'Toplam uzunluk': '60 m' } },
    { in: { cap: '21,3', et: '2,6', boy: '1', adet: '1' }, out: { 'Metre ağırlığı': '1,199 kg/m', 'Kesit alanı': '152,7 mm²' } },
    { in: { cap: '50', et: '2', boy: '6', adet: '4', malzeme: '2700' }, out: { 'Metre ağırlığı': '0,814 kg/m', 'Toplam ağırlık': '19,54 kg' } },
    { in: { cap: '110', et: '3,2', boy: '6', adet: '1', malzeme: '1400' }, out: { 'Metre ağırlığı': '1,503 kg/m', 'Bir borunun ağırlığı': '9,02 kg' } },
    { in: { cap: '100', et: '5', boy: '2', adet: '1', ozel: '1000' }, out: { 'Metre ağırlığı': '1,492 kg/m', 'İç çap': '90 mm' } },
    { in: { cap: '20', et: '10', boy: '6', adet: '1' }, error: true },
    { in: { cap: '', et: '3', boy: '6', adet: '1' }, error: true },
  ],
  howto: [
    "Borunun <strong>dış çapını</strong> ve <strong>et kalınlığını</strong> milimetre olarak yazın. Kumpasla ölçüyorsanız dış çapı borunun ucundan, et kalınlığını kesilmiş ağızdan alın.",
    "Tek bir borunun boyunu metre olarak, kaç adet boru olduğunu da adet alanına girin. Piyasada çelik borular çoğunlukla 6 metrelik boylar halinde satılır.",
    "Malzemeyi listeden seçin. Elinizde farklı bir alaşım ya da plastik varsa üreticinin verdiği yoğunluğu \"Özel yoğunluk\" alanına yazın.",
    "\"Hesapla\" düğmesine basın. Metre ağırlığı, bir borunun ve tüm partinin ağırlığı, iç çap ve kesit alanı birlikte listelenir.",
  ],
  sections: [
    { h: 'Boru ağırlığı nasıl hesaplanır?', p: [
      "Bir borunun ağırlığı, et kalınlığının oluşturduğu halka biçimli kesit alanının uzunluk ve yoğunlukla çarpılmasıyla bulunur. Halkanın alanı dış daire ile iç daire arasındaki farktır ve sadeleştirildiğinde şu biçimi alır: <strong>A = π × (D − t) × t</strong>. Burada D dış çap, t et kalınlığıdır; ikisi de milimetre yazılırsa alan mm² çıkar.",
      "Metre ağırlığı için bu alan yoğunlukla çarpılır: <strong>kg/m = π × (D − t) × t × ρ ÷ 1.000.000</strong>. Yoğunluk ρ, kg/m³ cinsindendir. Karbon çeliği için ρ = 7850 kg/m³ alındığında formül atölyelerde ezbere bilinen kısa haline dönüşür: <strong>kg/m ≈ 0,02466 × (D − t) × t</strong>. Bu araç aynı hesabı yuvarlama yapmadan uygular.",
    ] },
    { h: 'Çözümlü örnek: 60,3 × 3,2 mm çelik boru', p: [
      "2 inç anma ölçülü yaygın bir çelik borunun dış çapı 60,3 mm'dir. Et kalınlığı 3,2 mm olsun. Önce D − t = 57,1 mm bulunur. Kesit alanı π × 57,1 × 3,2 = 574,0 mm² eder. Bunu 7850 ile çarpıp bir milyona böldüğünüzde metre ağırlığı <strong>4,506 kg/m</strong> çıkar.",
      "6 metrelik tek bir boy 4,506 × 6 = 27,04 kg gelir. Aynı borudan 40 boy sipariş edecekseniz toplam yük yaklaşık 1.082 kg olur; bu bilgi hem nakliye aracını seçerken hem de teklifin kilogram fiyatı üzerinden verildiği durumlarda tutarı kontrol ederken işe yarar. İç çap ise 60,3 − 2 × 3,2 = 53,9 mm'dir.",
    ] },
    { h: 'Malzemelerin yoğunlukları', p: [
      "Aynı ölçüdeki iki borunun ağırlığı yalnızca malzemenin yoğunluğuna göre değişir. Araçtaki listede kullanılan değerler yaygın kabul gören yaklaşık yoğunluklardır:",
    ], ul: [
      "<strong>Karbon çeliği:</strong> 7850 kg/m³. Siyah boru, galvanizli boru ve dikişli/dikişsiz çelik boruların hesabında kullanılır.",
      "<strong>Paslanmaz çelik (304 kalite):</strong> yaklaşık 7930 kg/m³. 316 kalite biraz daha yoğundur; fark yüzde birin altındadır.",
      "<strong>Alüminyum:</strong> yaklaşık 2700 kg/m³. Aynı ölçüdeki çelik borunun kabaca üçte biri ağırlığındadır.",
      "<strong>Bakır:</strong> yaklaşık 8960 kg/m³. Klima ve sıhhi tesisat borularında kullanılır.",
      "<strong>Pirinç:</strong> alaşıma göre 8400–8700 kg/m³ arasında değişir; listede 8500 alınmıştır.",
      "<strong>Sert PVC:</strong> yaklaşık 1400 kg/m³. <strong>Polietilen (PE100):</strong> yaklaşık 950 kg/m³.",
    ] },
    { h: 'Anma çapı ile dış çap aynı şey değildir', p: [
      "Boru siparişlerinde en sık yapılan hata, \"2 parmak\" ya da \"DN50\" gibi anma ölçüsünü dış çap sanmaktır. Anma çapı yalnızca bir sınıf adıdır; hesapta gerçek dış çap kullanılmalıdır. Çelik borularda sık karşılaşılan dış çaplar şöyledir: 1/2 inç için 21,3 mm, 3/4 inç için 26,9 mm, 1 inç için 33,7 mm, 1 1/4 inç için 42,4 mm, 1 1/2 inç için 48,3 mm, 2 inç için 60,3 mm, 3 inç için 88,9 mm ve 4 inç için 114,3 mm.",
      "Plastik borularda ise ölçü doğrudan dış çaptır: 110'luk PVC pis su borusunun dış çapı 110 mm'dir. Emin değilseniz boruyu kumpasla ölçün ya da üzerindeki baskıyı okuyun; et kalınlığı da çoğunlukla aynı baskıda yazılıdır.",
    ] },
    { h: 'Nerelerde işe yarar?', ul: [
      "Demirciden alınan borunun kilogram fiyatı üzerinden tutarını önceden kestirmek.",
      "Korkuluk, sera iskeleti, çardak ya da sundurma gibi çelik imalatların toplam ağırlığını çıkarmak.",
      "Nakliye için kamyonet ya da kamyon kapasitesinin yetip yetmeyeceğini görmek.",
      "Askı, konsol ve kelepçe seçerken boş boru yükünü hesaba katmak.",
      "Hurda satışında ya da stok sayımında metreden kiloya geçmek.",
    ] },
    { h: 'Sınırlar ve uyarılar', p: [
      "Sonuç kuramsal ağırlıktır. Standartlar et kalınlığında ve çapta belirli bir toleransa izin verir; ayrıca galvaniz kaplama, boya, kaynak dikişi ve manşon gibi ekler tartıyı artırır. Gerçek teslimatta birkaç yüzdelik sapma olağandır.",
      "Araç borunun <strong>boş ağırlığını</strong> verir. Tesisat askılarını ya da taşıyıcı sistemi boyutlandırırken borunun içindeki akışkanın ve yalıtımın ağırlığı da eklenmelidir. Sonuçlar bilgilendirme amaçlıdır; taşıyıcı sistem, basınçlı hat ya da kaldırma işlemi gibi güvenliği ilgilendiren kararlar için yetkili bir mühendise danışın.",
    ] },
  ],
  faq: [
    ['Çelik boru ağırlığı için kısa formül nedir?', "Karbon çeliği için metre ağırlığı yaklaşık 0,02466 × (dış çap − et kalınlığı) × et kalınlığı işlemiyle bulunur. Çap ve et kalınlığı milimetre yazılır, sonuç kg/m çıkar. Katsayı, π ile 7850 kg/m³ yoğunluğun çarpımından gelir."],
    ['6 metrelik 2 inç boru kaç kilo gelir?', "Et kalınlığına bağlıdır. Dış çapı 60,3 mm, et kalınlığı 3,2 mm olan bir çelik boru metrede 4,506 kg, 6 metrelik boyda yaklaşık 27 kg gelir. Et kalınlığı 3,6 mm olursa aynı boy yaklaşık 30 kg olur."],
    ['İç çapı biliyorum, dış çapı nasıl bulurum?', "Dış çap, iç çapa et kalınlığının iki katı eklenerek bulunur. İç çapı 50 mm, et kalınlığı 3 mm olan borunun dış çapı 56 mm'dir. Bu değeri dış çap alanına yazarak hesabı yapabilirsiniz."],
    ['Galvanizli boru için ayrı bir yoğunluk var mı?', "Hayır, gövde yine çeliktir ve 7850 kg/m³ kullanılır. Çinko kaplama ağırlığı bir miktar artırır; fark borunun çapına ve kaplama kalınlığına göre değişir ve çoğu işte birkaç yüzdeyi geçmez."],
    ['Kutu profil ağırlığını bu araçla hesaplayabilir miyim?', "Hayır, bu araç yuvarlak kesitli borular içindir. Kare ve dikdörtgen kesitlerde kesit alanı farklı hesaplanır; onlar için kutu profil ağırlığı aracını kullanın."],
    ['Dolu (içi boş olmayan) çubuk için kullanılabilir mi?', "Et kalınlığı çapın yarısına eşit olduğunda boru dolu çubuğa dönüşür ve araç bu girdiyi kabul etmez. Dolu yuvarlak malzeme için alan π × D² ÷ 4 formülüyle bulunur; inşaat demiri gibi ürünler için ilgili araca bakın."],
    ['Sonuç ile kantardaki tartı neden tutmuyor?', "Üretim toleransları, kaplama, borunun gerçek boyunun 6 metreden biraz farklı olması ve kantarın duyarlılığı fark yaratır. Büyük partilerde yüzde iki üç düzeyindeki sapmalar olağan kabul edilir."],
    ['Girdiğim ölçüler kaydediliyor mu?', "Hayır. Hesap tümüyle tarayıcınızda yapılır; yazdığınız çap, kalınlık ve adet bilgileri hiçbir sunucuya gönderilmez ve saklanmaz."],
  ],
  related: ['profil-agirligi-hesapla', 'sac-agirligi-hesapla', 'insaat-demiri-agirligi-hesapla', 'boru-hacmi-hesapla', 'mm-inc-cevir'],
};
