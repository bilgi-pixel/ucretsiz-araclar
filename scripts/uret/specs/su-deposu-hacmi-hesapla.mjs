export default {
  slug: 'su-deposu-hacmi-hesapla',
  title: 'Su Deposu Hacmi Hesaplama',
  h1Tail: 'litre, m³ ve ton',
  pageTitle: 'Su Deposu Hacmi Hesaplama – Kaç Litre, Kaç Ton Su Alır?',
  description: 'Dikdörtgen ya da silindirik su deposunun ölçülerini girin; kaç litre ve kaç ton su aldığını, mevcut su miktarını ve kaç gün yeteceğini hesaplayın.',
  card: 'Dikdörtgen ya da silindirik deponun kaç litre su aldığını, doluluk oranını ve suyun kaç gün yeteceğini bulun.',
  category: 'insaat',
  keywords: ['su deposu hacmi hesaplama', 'depo kaç litre su alır', 'su deposu litre hesaplama', 'silindir depo hacmi', 'kaç tonluk depo', 'su tankı hacim hesabı', 'depo doluluk hesaplama'],
  lead: "Dikdörtgen prizma ya da dik silindir biçimli bir su deposunun <strong>kaç litre su aldığını</strong> ölçülerinden hesaplayın. Su seviyesini yazarsanız depodaki mevcut suyu, günlük tüketimi yazarsanız suyun kaç gün yeteceğini de görürsünüz.",
  button: 'Hesapla',
  inputs: [
    { id: 'sekil', label: 'Depo şekli', type: 'select', options: [['dikdortgen', 'Dikdörtgen (prizma)'], ['silindir', 'Dik silindir']] },
    { id: 'boy', label: 'Boy (cm)', type: 'number', placeholder: 'Dikdörtgen depo için' },
    { id: 'en', label: 'En (cm)', type: 'number', placeholder: 'Dikdörtgen depo için' },
    { id: 'cap', label: 'Çap (cm)', type: 'number', placeholder: 'Silindir depo için' },
    { id: 'yukseklik', label: 'Yükseklik (cm)', type: 'number', placeholder: 'Örn. 100' },
    { id: 'seviye', label: 'Su seviyesi (cm)', type: 'number', placeholder: 'Boş = tam dolu', hint: 'Tabandan su yüzeyine kadar olan yükseklik.' },
    { id: 'tuketim', label: 'Günlük su tüketimi (litre)', type: 'number', placeholder: 'Boş bırakılabilir' },
  ],
  compute(v, h) {
    const H = h.pos(v.yukseklik, 'Yükseklik');
    let taban; // cm²
    if (v.sekil === 'silindir') {
      const d = h.pos(v.cap, 'Çap');
      taban = Math.PI * d * d / 4;
    } else {
      taban = h.pos(v.boy, 'Boy') * h.pos(v.en, 'En');
    }
    const bos = (s) => String(s ?? '').trim() === '';
    const sev = bos(v.seviye) ? H : h.nonneg(v.seviye, 'Su seviyesi');
    if (sev > H + 1e-9) h.err('Su seviyesi depo yüksekliğinden büyük olamaz.');
    const toplam = taban * H / 1000; // litre
    const mevcut = taban * sev / 1000;
    const rows = [
      ['Toplam hacim', h.fmt(toplam, 1) + ' litre'],
      ['Metreküp', h.fmt(toplam / 1000, 3) + ' m³'],
      ['Depodaki su', h.fmt(mevcut, 1) + ' litre'],
      ['Doluluk oranı', '%' + h.fmt(sev / H * 100, 1)],
      ['Suyun ağırlığı', h.fmt(mevcut, 1) + ' kg'],
      ['Her 1 cm seviye', h.fmt(taban / 1000, 2) + ' litre'],
    ];
    if (!bos(v.tuketim)) {
      const t = h.pos(v.tuketim, 'Günlük su tüketimi');
      rows.push(['Yeteceği süre', h.fmt(mevcut / t, 1) + ' gün']);
    }
    return {
      rows,
      note: 'İç ölçülere göre hesaplanır; 1 litre su yaklaşık 1 kg kabul edilmiştir. Deponun kendi ağırlığı dahil değildir.',
    };
  },
  cases: [
    { in: { sekil: 'dikdortgen', boy: '100', en: '100', yukseklik: '100' }, out: { 'Toplam hacim': '1.000 litre', 'Metreküp': '1 m³', 'Depodaki su': '1.000 litre', 'Doluluk oranı': '%100', 'Suyun ağırlığı': '1.000 kg', 'Her 1 cm seviye': '10 litre' } },
    { in: { sekil: 'silindir', cap: '100', yukseklik: '150' }, out: { 'Toplam hacim': '1.178,1 litre', 'Metreküp': '1,178 m³', 'Her 1 cm seviye': '7,85 litre' } },
    { in: { sekil: 'dikdortgen', boy: '200', en: '150', yukseklik: '120', seviye: '80', tuketim: '300' }, out: { 'Toplam hacim': '3.600 litre', 'Depodaki su': '2.400 litre', 'Doluluk oranı': '%66,7', 'Yeteceği süre': '8 gün' } },
    { in: { sekil: 'silindir', cap: '120', yukseklik: '200', seviye: '50', tuketim: '150' }, out: { 'Toplam hacim': '2.261,9 litre', 'Depodaki su': '565,5 litre', 'Doluluk oranı': '%25', 'Yeteceği süre': '3,8 gün' } },
    { in: { sekil: 'dikdortgen', boy: '50', en: '40', yukseklik: '30', seviye: '0' }, out: { 'Toplam hacim': '60 litre', 'Depodaki su': '0 litre', 'Doluluk oranı': '%0' } },
    { in: { sekil: 'dikdortgen', boy: '300', en: '200', yukseklik: '250' }, out: { 'Toplam hacim': '15.000 litre', 'Metreküp': '15 m³', 'Suyun ağırlığı': '15.000 kg' } },
    { in: { sekil: 'silindir', boy: '100', en: '100', yukseklik: '100' }, error: true },
    { in: { sekil: 'dikdortgen', boy: '100', en: '100', yukseklik: '100', seviye: '120' }, error: true },
  ],
  howto: [
    "Deponuzun şeklini seçin: köşeli depolar için \"Dikdörtgen\", ayakta duran yuvarlak depolar için \"Dik silindir\".",
    "Ölçüleri <strong>santimetre</strong> olarak yazın. Dikdörtgen depoda boy, en ve yükseklik; silindir depoda çap ve yükseklik gerekir. Mümkünse iç ölçüleri kullanın.",
    "Depo tam dolu değilse tabandan su yüzeyine kadar olan yüksekliği \"Su seviyesi\" alanına girin. Boş bırakırsanız depo dolu kabul edilir.",
    "İsterseniz günlük tüketiminizi litre olarak yazın ve \"Hesapla\" düğmesine basın. Toplam hacim, mevcut su, ağırlık ve suyun yeteceği gün sayısı görünür.",
  ],
  sections: [
    { h: 'Depo hacmi nasıl hesaplanır?', p: [
      "Dik duran her deponun hacmi, taban alanı ile yüksekliğin çarpımıdır. Dikdörtgen depoda taban alanı boy × en olduğundan <strong>hacim = boy × en × yükseklik</strong> olur. Silindir depoda taban bir dairedir ve alanı π × çap² ÷ 4 ile bulunur; dolayısıyla <strong>hacim = π × çap² ÷ 4 × yükseklik</strong> formülü kullanılır.",
      "Ölçüler santimetre girildiğinde sonuç santimetreküp çıkar. 1 litre tam olarak 1.000 cm³ olduğundan sonucu 1.000'e bölmek litreyi verir. Litreyi bir kez daha 1.000'e bölerseniz metreküpe geçersiniz: 1 m³ = 1.000 litre. Su için 1 litre yaklaşık 1 kilogram geldiğinden 1 m³ su yaklaşık 1 ton eder; piyasada depoların \"1 tonluk\", \"2 tonluk\" diye anılması bundandır.",
    ] },
    { h: 'Çözümlü örnekler', p: [
      "<strong>Dikdörtgen depo:</strong> iç ölçüleri 200 × 150 × 120 cm olan bir deponun hacmi 200 × 150 × 120 = 3.600.000 cm³, yani 3.600 litredir. Su seviyesi 80 cm ise depoda 200 × 150 × 80 ÷ 1.000 = 2.400 litre su vardır ve doluluk oranı 80 ÷ 120 = yüzde 66,7'dir. Günde 300 litre tüketen bir hane için bu su 2.400 ÷ 300 = 8 gün yeter.",
      "<strong>Silindir depo:</strong> çapı 100 cm, yüksekliği 150 cm olan dik silindirin taban alanı π × 100² ÷ 4 = 7.853,98 cm²'dir. Yükseklikle çarpıldığında 1.178.097 cm³, yani yaklaşık <strong>1.178,1 litre</strong> bulunur. Bu depoda su seviyesindeki her 1 cm'lik değişim yaklaşık 7,85 litreye karşılık gelir; araç bu değeri \"Her 1 cm seviye\" satırında verir ve şamandıra ya da seviye çubuğu okurken işe yarar.",
    ] },
    { h: 'Hızlı başvuru: yaygın depo boyutları', ul: [
      "<strong>100 × 100 × 100 cm</strong> küp depo: 1.000 litre (1 ton)",
      "<strong>200 × 100 × 100 cm</strong> dikdörtgen depo: 2.000 litre (2 ton)",
      "<strong>200 × 150 × 100 cm</strong> dikdörtgen depo: 3.000 litre (3 ton)",
      "<strong>300 × 200 × 250 cm</strong> betonarme depo: 15.000 litre (15 ton)",
      "<strong>Çap 80 cm, yükseklik 100 cm</strong> silindir: yaklaşık 503 litre",
      "<strong>Çap 120 cm, yükseklik 200 cm</strong> silindir: yaklaşık 2.262 litre",
    ] },
    { h: 'İç ölçü, dış ölçü ve kullanılabilir hacim', p: [
      "Formül geometrik hacmi verir; gerçekte kullanılabilen su biraz daha azdır. Bunun birkaç nedeni vardır. Birincisi et kalınlığıdır: polyester ve paslanmaz depolarda fark küçüktür ama betonarme depolarda duvar kalınlığı hacmi belirgin biçimde azaltır, bu yüzden iç ölçülerle çalışmak gerekir. İkincisi taşma borusudur: su en üst kenara kadar değil, taşma seviyesine kadar dolar. Üçüncüsü çıkış borusunun tabandan yukarıda olmasıdır; borunun altında kalan su kullanılamaz.",
      "Plastik depolarda köşeler yuvarlatılmış, yüzeyler ise dayanım için oluklu ya da bombelidir. Bu depolarda etiketteki anma hacmi, dış ölçülerden hesaplanan hacimden küçük çıkar. Üreticinin beyan ettiği hacim varsa onu esas alın; bu aracı ölçüsü bilinmeyen ya da yerinde yapılmış depolar için kullanın.",
    ] },
    { h: 'Deponun ağırlığı ve yerleşimi', p: [
      "Dolu bir su deposu çok ağırdır: 2.000 litrelik depo, kendi ağırlığı hariç yaklaşık 2 ton yük demektir ve bu yük küçük bir taban alanına biner. 100 × 200 cm tabanlı 2 tonluk bir depo, metrekareye yaklaşık 1.000 kg yük uygular. Çatıya, terasa ya da ara kata depo koymadan önce döşemenin bu yükü taşıyıp taşımayacağı mutlaka bir inşaat mühendisine sorulmalıdır.",
      "Depo düz ve tam oturan bir zemine yerleştirilmelidir; noktasal temas plastik depolarda çatlamaya yol açar. Deprem bölgelerinde yüksek ve dar depoların devrilmeye karşı sabitlenmesi de önemlidir. Bu araç yalnızca hacim ve su ağırlığını verir; taşıyıcı sistem değerlendirmesi yapmaz.",
    ] },
    { h: 'Sınırlar', p: [
      "Araç dikdörtgen prizma ve dik (ayakta duran) silindir depolar içindir. Yatık silindirik tanklarda su seviyesi ile hacim arasındaki ilişki doğrusal değildir; bunlar için yatay tank doluluk aracını kullanın. Konik tabanlı, küresel ya da düzensiz biçimli depolar kapsam dışındadır. Kişi başı günlük su tüketimi alışkanlıklara göre çok değişir; \"Yeteceği süre\" satırı yalnızca yazdığınız tüketim değerine göre yapılmış basit bir bölmedir.",
    ] },
  ],
  faq: [
    ['1 tonluk su deposu kaç litredir?', "Su için 1 ton yaklaşık 1.000 litreye, yani 1 metreküpe karşılık gelir. 100 × 100 × 100 cm iç ölçülü küp biçimli bir depo tam 1.000 litre su alır."],
    ['Silindir depo hacmi nasıl hesaplanır?', "Çapın karesi π ile çarpılıp 4'e bölünür, sonuç yükseklikle çarpılır. Ölçüler santimetre ise çıkan değeri 1.000'e bölerek litreye çevirin. Çapı 100 cm, yüksekliği 150 cm olan depo yaklaşık 1.178 litredir."],
    ['Ölçüleri metre olarak biliyorum, nasıl girmeliyim?', "Metreyi 100 ile çarparak santimetreye çevirin: 1,5 m için 150 yazın. Metreyle elle hesaplamak isterseniz boy × en × yükseklik doğrudan metreküpü verir; 1.000 ile çarparak litreye geçersiniz."],
    ['Depodaki su kaç gün yeter?', "Mevcut su miktarını günlük tüketiminize bölün. 2.400 litre su, günde 300 litre kullanan bir hanede 8 gün yeter. Günlük tüketiminizi su faturanızdaki aylık metreküpü 30'a bölerek kestirebilirsiniz."],
    ['Hesaplanan hacim etikettekinden neden farklı?', "Plastik depoların köşeleri yuvarlak, yüzeyleri oluklu olduğundan dış ölçülerden hesaplanan hacim etiketteki anma hacminden büyük çıkar. Ayrıca taşma seviyesi üst kenarın altındadır. Üretici beyanı varsa onu esas alın."],
    ['Yatık silindir tank için bu aracı kullanabilir miyim?', "Tam dolu hacim için evet: çapı çap alanına, tankın uzunluğunu yükseklik alanına yazabilirsiniz. Ancak kısmi dolulukta sonuç yanlış olur, çünkü yatık tankta seviye ile hacim doğru orantılı değildir."],
    ['Su dışındaki sıvılar için ağırlık doğru mu?', "Hacim her sıvı için aynıdır ama ağırlık satırı suya göredir. Başka bir sıvının ağırlığını bulmak için litre değerini o sıvının yoğunluğuyla (kg/litre) çarpın; örneğin motorin için yaklaşık 0,83–0,85 kullanılır."],
    ['Girdiğim ölçüler bir yere kaydediliyor mu?', "Hayır. Hesap tarayıcınızda yapılır; depo ölçüleriniz ve tüketim bilginiz sunucuya gönderilmez, saklanmaz."],
  ],
  related: ['tank-doluluk-hesapla', 'havuz-hacmi-hesapla', 'boru-hacmi-hesapla', 'yagmur-suyu-hasadi-hesapla', 'oda-hacmi-hesapla'],
};
