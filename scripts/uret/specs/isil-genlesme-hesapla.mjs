export default {
  slug: 'isil-genlesme-hesapla',
  title: 'Isıl Genleşme Hesaplama',
  h1Tail: 'boyca, yüzeyce, hacimce',
  pageTitle: 'Isıl Genleşme Hesaplama – Boyca, Yüzeyce ve Hacimce Genleşme',
  description: 'Sıcaklık değişiminde bir malzemenin ne kadar uzadığını ya da büzüldüğünü hesaplayın. Boyca, yüzeyce ve hacimce genleşme; hazır malzeme katsayılarıyla.',
  card: 'Isınan ya da soğuyan çubuk, levha ve cisimlerin boy, yüzey ve hacim değişimini genleşme katsayısıyla hesaplayın.',
  category: 'bilim',
  keywords: ['ısıl genleşme hesaplama', 'boyca genleşme formülü', 'genleşme katsayısı', 'ray genleşmesi hesaplama', 'hacimce genleşme', 'yüzeyce genleşme', 'termal genleşme', 'uzama miktarı hesaplama'],
  lead: 'Bir katının sıcaklığı değiştiğinde boyunun, yüzeyinin ya da hacminin ne kadar değişeceğini hesaplayın. Araç <strong>ΔL = α · L₀ · ΔT</strong> bağıntısını kullanır; yaygın malzemelerin genleşme katsayıları listede hazırdır, dilerseniz kendi katsayınızı da yazabilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'tur', label: 'Genleşme türü', type: 'select', options: [['boy', 'Boyca (uzunluk)'], ['yuzey', 'Yüzeyce (alan)'], ['hacim', 'Hacimce']] },
    { id: 'malzeme', label: 'Malzeme', type: 'select', options: [['celik', 'Çelik (12)'], ['aluminyum', 'Alüminyum (23)'], ['bakir', 'Bakır (17)'], ['pirinc', 'Pirinç (19)'], ['demir', 'Demir (12)'], ['cam', 'Adi cam (9)'], ['beton', 'Beton (12)'], ['kursun', 'Kurşun (29)'], ['gumus', 'Gümüş (19)'], ['altin', 'Altın (14)'], ['ozel', 'Özel katsayı gireceğim']] },
    { id: 'katsayi', label: 'Özel boyca genleşme katsayısı (×10⁻⁶ 1/°C)', type: 'number', placeholder: 'Örn. 12', hint: 'Yalnızca "Özel katsayı" seçiliyse kullanılır.' },
    { id: 'ilk', label: 'İlk boyut', type: 'number', placeholder: 'Örn. 100', hint: 'Boy için metre, yüzey için m², hacim için m³.' },
    { id: 't1', label: 'İlk sıcaklık (°C)', type: 'number', placeholder: 'Örn. 0' },
    { id: 't2', label: 'Son sıcaklık (°C)', type: 'number', placeholder: 'Örn. 40' },
  ],
  compute(v, h) {
    const tablo = { celik: 12, aluminyum: 23, bakir: 17, pirinc: 19, demir: 12, cam: 9, beton: 12, kursun: 29, gumus: 19, altin: 14 };
    const alfa6 = v.malzeme === 'ozel' ? h.pos(v.katsayi, 'Özel boyca genleşme katsayısı') : tablo[v.malzeme];
    if (!alfa6) h.err('Listeden bir malzeme seçin.');
    const ilk = h.pos(v.ilk, 'İlk boyut');
    const t1 = h.num(v.t1, 'İlk sıcaklık');
    const t2 = h.num(v.t2, 'Son sıcaklık');
    if (t1 < -273.15 || t2 < -273.15) h.err('Sıcaklık mutlak sıfırın (−273,15 °C) altında olamaz.');
    const kat = v.tur === 'hacim' ? 3 : v.tur === 'yuzey' ? 2 : 1;
    const birim = v.tur === 'hacim' ? 'm³' : v.tur === 'yuzey' ? 'm²' : 'm';
    const ad = v.tur === 'hacim' ? 'Hacim' : v.tur === 'yuzey' ? 'Yüzey' : 'Boy';
    const dT = t2 - t1;
    const delta = kat * alfa6 * 1e-6 * ilk * dT;
    const rows = [
      [ad + ' değişimi', h.sig(delta, 6) + ' ' + birim],
      ['Son ' + ad.toLowerCase(), h.sig(ilk + delta, 9) + ' ' + birim],
    ];
    if (v.tur === 'boy' || !v.tur) rows.push(['Boy değişimi (mm)', h.sig(delta * 1000, 6) + ' mm']);
    rows.push(['Sıcaklık farkı', h.fmt(dT, 2) + ' °C']);
    rows.push(['Bağıl değişim', '%' + h.sig(kat * alfa6 * 1e-6 * dT * 100, 4)]);
    rows.push(['Kullanılan katsayı', h.fmt(kat * alfa6, 3) + ' × 10⁻⁶ 1/°C']);
    return {
      rows,
      note: (dT < 0 ? 'Sıcaklık düştüğü için değişim negatiftir; cisim büzülür. ' : '') + 'Yüzeyce katsayı 2α, hacimce katsayı 3α alınmıştır. Katsayılar tipik ders kitabı değerleridir.',
    };
  },
  cases: [
    { in: { tur: 'boy', malzeme: 'celik', ilk: '100', t1: '0', t2: '40' }, out: { 'Boy değişimi': '0,048 m', 'Son boy': '100,048 m', 'Boy değişimi (mm)': '48 mm' } },
    { in: { tur: 'boy', malzeme: 'aluminyum', ilk: '2', t1: '20', t2: '120' }, out: { 'Boy değişimi': '0,0046 m', 'Boy değişimi (mm)': '4,6 mm', 'Sıcaklık farkı': '100 °C' } },
    { in: { tur: 'yuzey', malzeme: 'bakir', ilk: '1', t1: '20', t2: '70' }, out: { 'Yüzey değişimi': '0,0017 m²', 'Son yüzey': '1,0017 m²', 'Kullanılan katsayı': '34 × 10⁻⁶ 1/°C' } },
    { in: { tur: 'hacim', malzeme: 'ozel', katsayi: '12', ilk: '1', t1: '0', t2: '100' }, out: { 'Hacim değişimi': '0,0036 m³', 'Bağıl değişim': '%0,36' } },
    { in: { tur: 'boy', malzeme: 'celik', ilk: '50', t1: '30', t2: '-10' }, out: { 'Boy değişimi': '-0,024 m', 'Son boy': '49,976 m' } },
    { in: { tur: 'boy', malzeme: 'pirinc', ilk: '0,5', t1: '25', t2: '25' }, out: { 'Boy değişimi': '0 m', 'Son boy': '0,5 m' } },
    { in: { tur: 'boy', malzeme: 'celik', ilk: '-3', t1: '0', t2: '40' }, error: true },
    { in: { tur: 'boy', malzeme: 'ozel', katsayi: '', ilk: '10', t1: '0', t2: '40' }, error: true },
  ],
  howto: [
    'Genleşme türünü seçin: çubuk, ray, boru gibi tek boyutu önemli cisimler için boyca; levha ve saclar için yüzeyce; dolu cisimler için hacimce.',
    'Malzemeyi listeden seçin. Parantez içindeki sayı boyca genleşme katsayısının 10⁻⁶ 1/°C cinsinden değeridir. Listede yoksa "Özel katsayı" seçip katsayıyı kendiniz yazın.',
    'İlk boyutu yazın: boy için metre, yüzey için metrekare, hacim için metreküp.',
    'İlk ve son sıcaklığı santigrat derece olarak girin. Soğuma hesabı için son sıcaklığı ilkinden küçük yazmanız yeterlidir.',
    '"Hesapla" düğmesine basın; değişim miktarı, son boyut, bağıl değişim ve kullanılan katsayı listelenir.',
  ],
  sections: [
    { h: 'Isıl genleşme nedir?', p: [
      'Bir maddenin sıcaklığı arttığında onu oluşturan atom ve moleküllerin titreşim genliği büyür, tanecikler arasındaki ortalama uzaklık artar. Bunun dışarıdan görünen sonucu cismin boyutlarının büyümesidir. Sıcaklık düştüğünde süreç tersine işler ve cisim büzülür. Katılarda bu değişim gözle fark edilmeyecek kadar küçüktür; ama köprü, ray, boru hattı, cephe kaplaması gibi uzun yapılarda santimetreler mertebesine ulaşır ve hesaba katılmazsa eğilme, çatlama ya da burkulmaya yol açar.',
      'Genleşmenin büyüklüğü üç şeye bağlıdır: cismin ilk boyutu, sıcaklık farkı ve malzemenin cinsi. Malzemeye özgü olan büyüklüğe <strong>boyca genleşme katsayısı</strong> denir ve α (alfa) ile gösterilir. Birimi 1/°C ya da 1/K\'dir; sıcaklık farkı söz konusu olduğu için iki birim aynı sayısal değeri verir.',
    ] },
    { h: 'Formüller', p: [
      'Boyca genleşme: <strong>ΔL = α · L₀ · ΔT</strong>. Burada L₀ ilk boy, ΔT son sıcaklık ile ilk sıcaklığın farkıdır. Son boy L = L₀ + ΔL olur.',
      'Yüzeyce genleşme: <strong>ΔA = 2α · A₀ · ΔT</strong>. Levhanın hem eni hem boyu uzadığı için katsayı yaklaşık iki katına çıkar. Hacimce genleşme: <strong>ΔV = 3α · V₀ · ΔT</strong>. Üç boyut birlikte büyüdüğünden katsayı yaklaşık üç kattır. Bu "2α" ve "3α" yaklaşımları, α çok küçük olduğu için gündelik sıcaklık aralıklarında fazlasıyla yeterlidir ve araç da bu yaklaşımı kullanır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 – Tren rayı:</strong> 0 °C\'de 100 m uzunluğundaki çelik ray yaz günü 40 °C\'ye ısınıyor. α = 12 × 10⁻⁶ 1/°C alınırsa ΔL = 12 × 10⁻⁶ × 100 × 40 = 0,048 m, yani 48 mm bulunur. Rayların arasına genleşme boşluğu bırakılmasının ya da rayların ön gerilmeyle döşenmesinin nedeni budur.',
      '<strong>Örnek 2 – Alüminyum profil:</strong> 20 °C\'de 2 m boyundaki alüminyum çubuk 120 °C\'ye ısıtılıyor. ΔL = 23 × 10⁻⁶ × 2 × 100 = 0,0046 m = 4,6 mm. Aynı koşulda çelik çubuk yalnızca 2,4 mm uzardı; alüminyum doğramalarda derz payının daha geniş tutulmasının sebebi bu farktır.',
      '<strong>Örnek 3 – Bakır levha:</strong> 1 m² bakır levha 20 °C\'den 70 °C\'ye ısınırsa ΔA = 2 × 17 × 10⁻⁶ × 1 × 50 = 0,0017 m², yani 17 cm² artar.',
      '<strong>Örnek 4 – Soğuma:</strong> 30 °C\'de 50 m olan çelik tel −10 °C\'ye soğursa ΔT = −40 °C ve ΔL = −0,024 m olur; tel 24 mm kısalır. Enerji nakil hatlarında tellerin kışın gerilip yazın sarkması bu yüzdendir.',
    ] },
    { h: 'Yaygın malzemelerin boyca genleşme katsayıları', p: [
      'Aşağıdaki değerler oda sıcaklığı civarı için tipik ders kitabı değerleridir. Alaşımın bileşimine, üretim yöntemine ve sıcaklık aralığına göre gerçek değer bir miktar farklı olabilir.',
    ], ul: [
      '<strong>Adi cam:</strong> yaklaşık 9 × 10⁻⁶ 1/°C',
      '<strong>Çelik, demir, beton:</strong> yaklaşık 12 × 10⁻⁶ 1/°C',
      '<strong>Altın:</strong> yaklaşık 14 × 10⁻⁶ 1/°C',
      '<strong>Bakır:</strong> yaklaşık 17 × 10⁻⁶ 1/°C',
      '<strong>Pirinç, gümüş:</strong> yaklaşık 19 × 10⁻⁶ 1/°C',
      '<strong>Alüminyum:</strong> yaklaşık 23 × 10⁻⁶ 1/°C',
      '<strong>Kurşun:</strong> yaklaşık 29 × 10⁻⁶ 1/°C',
    ] },
    { h: 'Günlük hayatta ve mühendislikte genleşme', p: [
      'Beton ile çeliğin katsayılarının birbirine çok yakın olması betonarmenin mümkün olmasının nedenlerinden biridir; ikisi birlikte uzayıp kısaldığı için donatı betonu çatlatmaz. Köprülerdeki tarak biçimli genleşme derzleri, uzun boru hatlarındaki omega (lir) kıvrımları, seramik döşemelerde bırakılan derzler ve uzun bina bloklarını ayıran dilatasyon boşlukları aynı olgunun önlemidir.',
      'İki farklı metalin birbirine perçinlenmesiyle yapılan bimetal şeritler ısındığında katsayısı büyük olan metal daha çok uzar ve şerit bükülür. Ütü, fırın ve kombi termostatlarında bu bükülme devreyi açıp kapatmak için kullanılır. Sıkı geçen kavanoz kapağını sıcak suya tutmak da aynı fikre dayanır: metal kapak camdan daha fazla genleşir ve gevşer.',
    ] },
    { h: 'Sınırlar ve uyarılar', p: [
      'Hesap, katsayının sıcaklık aralığı boyunca sabit kaldığını ve cismin serbestçe genleşebildiğini varsayar. Uçları sabitlenmiş bir parçada boy değişmez, bunun yerine ısıl gerilme oluşur; bu araç gerilme hesabı yapmaz. Çok geniş sıcaklık aralıklarında, erime noktasına yakın bölgelerde ve ahşap, kompozit gibi yöne bağlı malzemelerde tek bir katsayı yeterli olmaz.',
      'Su 0–4 °C arasında ısındıkça büzülen istisnai bir maddedir; sıvılar ve gazlar için bu sayfadaki katı katsayıları kullanılmamalıdır. Sonuçlar eğitim ve ön fikir amaçlıdır; derz genişliği, boru kompansatörü ya da yapı tasarımı gibi kararlar için malzeme üreticisinin verileri ve yetkili bir mühendisin hesabı esas alınmalıdır.',
    ] },
  ],
  faq: [
    ['Boyca genleşme formülü nedir?', 'ΔL = α · L₀ · ΔT. α malzemenin boyca genleşme katsayısı, L₀ ilk boy, ΔT ise son sıcaklık eksi ilk sıcaklıktır. Son boy, ilk boya ΔL eklenerek bulunur.'],
    ['Yüzeyce ve hacimce genleşme katsayısı nasıl bulunur?', 'Her yönde aynı davranan katılarda yüzeyce katsayı yaklaşık 2α, hacimce katsayı yaklaşık 3α kabul edilir. Araç, seçtiğiniz türe göre bu çarpanı kendiliğinden uygular ve kullandığı katsayıyı sonuçta gösterir.'],
    ['Sıcaklığı Kelvin olarak girebilir miyim?', 'Formülde yalnızca sıcaklık farkı önemlidir ve bir kelvinlik fark bir santigrat derecelik farka eşittir. Alanlar °C olarak etiketlidir; elinizde Kelvin değerleri varsa ikisinden de 273,15 çıkarıp yazın, fark değişmeyeceği için sonuç aynı olur.'],
    ['Sonuç neden negatif çıktı?', 'Son sıcaklık ilk sıcaklıktan küçükse ΔT negatif olur ve cisim büzülür. Negatif değişim, boyun o kadar kısaldığını gösterir; son boy satırı buna göre ilk boydan küçüktür.'],
    ['Ortasında delik olan bir levha ısınınca delik küçülür mü?', 'Hayır, delik de büyür. Genleşme bir fotoğrafın büyütülmesi gibi düşünülebilir; cismin her boyutu, deliğin çapı dahil, aynı oranda artar. Sıkı geçme parçaların ısıtılarak takılması bu sayede mümkündür.'],
    ['Listede olmayan bir malzeme için ne yapmalıyım?', '"Özel katsayı gireceğim" seçeneğini işaretleyip malzemenizin boyca genleşme katsayısını 10⁻⁶ 1/°C biriminde yazın. Örneğin katsayı 0,000011 1/°C olarak verilmişse alana 11 yazmalısınız.'],
    ['Hangi malzeme daha çok genleşir?', 'Katsayısı büyük olan. Listedeki malzemeler içinde kurşun ve alüminyum en çok, adi cam en az genleşir. Aynı boyda ve aynı sıcaklık farkında alüminyum çubuk, çelik çubuğun yaklaşık iki katı uzar.'],
    ['Girdiğim ölçüler kaydediliyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda yapılır; yazdığınız boyut ve sıcaklıklar sunucuya gönderilmez, saklanmaz.'],
  ],
  related: ['isi-enerjisi-hesapla', 'yogunluk-hesapla', 'ideal-gaz-denklemi-hesapla', 'basinc-hesapla', 'birim-donustur'],
};
