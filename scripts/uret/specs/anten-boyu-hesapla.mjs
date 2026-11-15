export default {
  slug: 'anten-boyu-hesapla',
  title: 'Anten Boyu ve Dalga Boyu Hesaplama',
  h1Tail: 'dipol, çeyrek dalga, 5/8',
  pageTitle: 'Anten Boyu ve Dalga Boyu Hesaplama – Dipol ve Çeyrek Dalga Anten',
  description: 'Frekansa göre dalga boyunu, yarım dalga dipol, çeyrek dalga ve 5/8 dalga anten boylarını hesaplayın. Kısalma katsayısını kendiniz ayarlayabilirsiniz.',
  card: 'Frekansı yazın; dalga boyunu, yarım dalga dipol, çeyrek dalga ve 5/8 dalga anten uzunluklarını görün.',
  category: 'elektrik',
  keywords: ['anten boyu hesaplama', 'dalga boyu hesaplama', 'dipol anten hesaplama', 'çeyrek dalga anten boyu', '433 mhz anten boyu', 'frekans dalga boyu', '5/8 anten hesaplama'],
  lead: `Çalışma frekansını yazın; araç boşluktaki <strong>dalga boyunu</strong> ve bu frekans için <strong>yarım dalga dipol</strong>, <strong>çeyrek dalga</strong> ve <strong>5/8 dalga</strong> anten uzunluklarını hesaplasın. Telin kalınlığından ve uç etkisinden gelen kısalmayı katsayıyla ayarlayabilirsiniz.`,
  button: 'Hesapla',
  inputs: [
    { id: 'frekans', label: 'Frekans', type: 'number', placeholder: 'Örn. 145' },
    { id: 'birim', label: 'Frekans birimi', type: 'select', options: [['MHz', 'MHz'], ['kHz', 'kHz'], ['GHz', 'GHz']] },
    { id: 'k', label: 'Kısalma katsayısı', type: 'number', value: '0,95', hint: 'Tel antenlerde tipik olarak 0,93–0,98; kuramsal boy için 1 yazın.' },
  ],
  compute(v, h) {
    const boy = (m) => {
      if (m >= 1 - 1e-9) return h.fmt(m, 3) + ' m';
      if (m >= 0.01 - 1e-12) return h.fmt(m * 100, 2) + ' cm';
      return h.fmt(m * 1000, 2) + ' mm';
    };
    const carpan = v.birim === 'kHz' ? 1e3 : v.birim === 'GHz' ? 1e9 : 1e6;
    const f = h.pos(v.frekans, 'Frekans') * carpan;
    const k = h.pos(v.k, 'Kısalma katsayısı');
    if (k > 1 || k < 0.5) h.err('"Kısalma katsayısı" 0,5 ile 1 arasında olmalı (tipik değer 0,95).');
    const c = 299792458;
    const lambda = c / f;
    return {
      rows: [
        ['Dalga boyu (boşlukta)', boy(lambda)],
        ['Yarım dalga dipol (toplam)', boy(lambda / 2 * k)],
        ['Dipolün her bir kolu', boy(lambda / 4 * k)],
        ['Çeyrek dalga anten', boy(lambda / 4 * k)],
        ['5/8 dalga anten', boy(lambda * 0.625 * k)],
      ],
      note: 'λ = c ÷ f, c = 299 792 458 m/s. Anten boyları kısalma katsayısıyla çarpılmıştır; son ayar SWR ölçümüyle yapılmalıdır.',
    };
  },
  cases: [
    { in: { frekans: '145', birim: 'MHz', k: '0,95' }, out: { 'Dalga boyu (boşlukta)': '2,068 m', 'Yarım dalga dipol (toplam)': '98,21 cm', 'Dipolün her bir kolu': '49,1 cm', '5/8 dalga anten': '1,228 m' } },
    { in: { frekans: '433,92', birim: 'MHz', k: '0,95' }, out: { 'Dalga boyu (boşlukta)': '69,09 cm', 'Çeyrek dalga anten': '16,41 cm', 'Yarım dalga dipol (toplam)': '32,82 cm' } },
    { in: { frekans: '100', birim: 'MHz', k: '1' }, out: { 'Dalga boyu (boşlukta)': '2,998 m', 'Yarım dalga dipol (toplam)': '1,499 m', 'Çeyrek dalga anten': '74,95 cm', '5/8 dalga anten': '1,874 m' } },
    { in: { frekans: '2,4', birim: 'GHz', k: '1' }, out: { 'Dalga boyu (boşlukta)': '12,49 cm', 'Çeyrek dalga anten': '3,12 cm' } },
    { in: { frekans: '27', birim: 'MHz', k: '0,95' }, out: { 'Dalga boyu (boşlukta)': '11,103 m', 'Çeyrek dalga anten': '2,637 m', 'Yarım dalga dipol (toplam)': '5,274 m' } },
    { in: { frekans: '7,1', birim: 'MHz', k: '0,95' }, out: { 'Dalga boyu (boşlukta)': '42,224 m', 'Yarım dalga dipol (toplam)': '20,057 m', 'Dipolün her bir kolu': '10,028 m' } },
    { in: { frekans: '1000', birim: 'kHz', k: '1' }, out: { 'Dalga boyu (boşlukta)': '299,792 m' } },
    { in: { frekans: '0', birim: 'MHz', k: '0,95' }, error: true },
    { in: { frekans: '145', birim: 'MHz', k: '1,2' }, error: true },
    { in: { frekans: 'yüz', birim: 'MHz', k: '0,95' }, error: true },
  ],
  howto: [
    `"Frekans" alanına antenin çalışacağı frekansı yazın ve birimini (kHz, MHz ya da GHz) seçin.`,
    `"Kısalma katsayısı" alanını tel ya da boru antenler için varsayılan 0,95 değerinde bırakın; yalnızca kuramsal boyu görmek istiyorsanız 1 yazın.`,
    `"Hesapla" düğmesine basın. Dalga boyu ve üç yaygın anten tipinin uzunlukları listelenir.`,
    `Teli hesaplanan boydan birkaç santimetre uzun kesin; SWR ölçerek ya da anten analizörüyle kontrol edip uçlardan azar azar kısaltarak ayarlayın.`,
  ],
  sections: [
    { h: 'Dalga boyu ve frekans ilişkisi', p: [
      `Elektromanyetik dalgalar boşlukta ışık hızıyla yayılır. Bir dalganın bir tam salınım boyunca kat ettiği yola dalga boyu denir ve <strong>λ = c ÷ f</strong> eşitliğiyle bulunur. Burada c ışık hızı (saniyede 299 792 458 metre), f ise hertz cinsinden frekanstır. Megahertz ile çalışırken pratik biçimi <strong>λ (metre) = 299,79 ÷ f (MHz)</strong> olur; çoğu kaynakta 300 ÷ f olarak yuvarlanır.`,
      `Frekans yükseldikçe dalga boyu kısalır. 100 MHz'lik bir FM yayınının dalga boyu yaklaşık 3 metre, 2,4 GHz'lik kablosuz ağ sinyalinin dalga boyu ise yaklaşık 12,5 santimetredir. Antenler dalga boyunun belirli kesirlerinde rezonansa girdiği için, anten boyutu doğrudan çalışma frekansına bağlıdır; kısa dalga antenlerinin metrelerce, telefon antenlerinin santimetrelerce uzunlukta olmasının nedeni budur.`,
    ] },
    { h: 'Hesaplanan anten tipleri', ul: [
      `<strong>Yarım dalga dipol:</strong> Ortasından beslenen, iki eşit koldan oluşan en temel antendir. Toplam boyu yarım dalga boyu, her kolu çeyrek dalga boyu kadardır. Boşluktaki besleme empedansı yaklaşık 73 Ω olduğundan 50 Ω ve 75 Ω koaksiyel kablolarla makul uyum sağlar.`,
      `<strong>Çeyrek dalga anten:</strong> Dipolün yarısıdır; eksik yarının görevini iletken bir zemin düzlemi ya da radyaller üstlenir. Araç antenleri, el telsizi antenleri ve küçük kumanda modüllerinin tel antenleri çoğunlukla bu tiptedir.`,
      `<strong>5/8 dalga anten:</strong> Çeyrek dalgaya göre ufka doğru daha fazla yayın yapan dikey bir antendir. Rezonansta olmadığı için tabanında bir uyumlama bobini gerektirir; yalnızca tel boyu hesaplanan değere getirilerek doğrudan kabloya bağlanamaz.`,
    ] },
    { h: 'Kısalma katsayısı neden var?', p: [
      `Kuramsal hesap sonsuz ince bir iletken ve boşluk varsayar. Gerçek bir telin kalınlığı vardır ve uçlarında oluşan kapasite, antenin elektriksel olarak olduğundan uzun görünmesine yol açar. Bu yüzden rezonans için fiziksel boy kuramsal değerden biraz kısa tutulur. Tel antenler için yaygın kabul yaklaşık %5 kısalmadır; katsayı 0,95 seçildiğinde yarım dalga dipol formülü amatör telsizcilerin bildiği <strong>142,5 ÷ f (MHz)</strong> metre biçimine dönüşür.`,
      `İletken kalınlaştıkça, tel izoleli olduğunda ya da anten yere ve başka nesnelere yaklaştıkça kısalma artar. Kalın alüminyum boruyla yapılan VHF antenlerinde katsayı 0,93'e kadar inebilir. Bu katsayıyı koaksiyel kablonun hız faktörüyle karıştırmayın; kablo içindeki dalga boyu için çok daha küçük değerler (kablo tipine göre yaklaşık 0,66–0,85) geçerlidir ve bu, kablodan yapılan faz hatları için kullanılır.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>145 MHz (2 metre amatör bandı):</strong> λ = 299,792 ÷ 145 = 2,068 m. Yarım dalga dipolün toplam boyu 2,068 ÷ 2 × 0,95 = 0,982 m, yani 98,21 cm; her kol 49,1 cm olur. 5/8 dalga dikey anten için 2,068 × 0,625 × 0,95 = 1,228 m bulunur.`,
      `<strong>433,92 MHz (kumanda ve sensör modülleri):</strong> λ = 299,792 ÷ 433,92 = 69,09 cm. Çeyrek dalga tel anten 69,09 ÷ 4 × 0,95 = 16,41 cm'dir. Modüllerin anten ucuna lehimlenen yaklaşık 16–17 cm'lik tel bu hesaptan gelir.`,
      `<strong>7,1 MHz (40 metre bandı):</strong> λ = 42,224 m. Yarım dalga dipol 20,057 m, her kol 10,028 m çıkar. Bu boydaki bir antenin iki ağaç ya da direk arasına gerilmesi gerekir.`,
    ] },
    { h: 'Sık kullanılan frekanslar için çeyrek dalga boyları', ul: [
      `<strong>27 MHz (CB):</strong> 2,637 m`,
      `<strong>100 MHz (FM yayın bandı ortası):</strong> katsayı 0,95 ile yaklaşık 71,2 cm`,
      `<strong>145 MHz:</strong> 49,1 cm`,
      `<strong>433,92 MHz:</strong> 16,41 cm`,
      `<strong>868 MHz:</strong> yaklaşık 8,2 cm`,
      `<strong>2,4 GHz:</strong> katsayı 0,95 ile yaklaşık 2,97 cm`,
    ], p: [
      `Listedeki değerler 0,95 kısalma katsayısı içindir. Kendi frekansınız için aracı kullanarak kesin sonucu alabilirsiniz.`,
    ] },
    { h: 'Uygulamada dikkat edilecekler', p: [
      `Hesaplanan boy bir başlangıç noktasıdır. Antenin yerden yüksekliği, çevredeki metal yüzeyler, izolatörlerin ve bağlantı uçlarının uzunluğu rezonansı kaydırır. Bu yüzden tel her zaman biraz uzun kesilir ve duran dalga oranı (SWR) ölçülerek kısaltılır; kesilen tel geri uzatılamaz. Çeyrek dalga antenlerde zemin düzlemi ya da radyaller en az anten boyu kadar olmalıdır; zemin yetersizse anten beklenen verimi vermez.`,
      `Baskı devre üzerindeki antenlerde ve çip antenlerde kart malzemesinin dielektrik sabiti dalga boyunu belirgin biçimde kısaltır; bu tür tasarımlar üretici referans tasarımlarına göre yapılır ve bu araçla boyutlandırılamaz.`,
    ] },
    { h: 'Güvenlik ve yasal uyarı', p: [
      `Dış mekâna anten kurarken enerji nakil hatlarından uzak durun; anten ya da direk bir hatta temas ederse ölümcül kazalar yaşanabilir. Yüksek direkler için yıldırımdan korunma ve topraklama ayrıca ele alınmalıdır. Verici kullanımı, frekans bandına ve çıkış gücüne göre lisansa ya da izne tabi olabilir; yayın yapmadan önce güncel mevzuatı kontrol edin. Bu sayfadaki sonuçlar bilgilendirme amaçlıdır ve mühendislik projesinin yerini tutmaz.`,
    ] },
  ],
  faq: [
    ['Dalga boyu nasıl hesaplanır?', `Işık hızı frekansa bölünür: λ = c ÷ f. Megahertz için pratik formül λ (m) = 299,79 ÷ f (MHz) biçimindedir. 100 MHz için dalga boyu yaklaşık 2,998 metredir.`],
    ['433 MHz için anten teli kaç cm olmalı?', `433,92 MHz için çeyrek dalga boyu, 0,95 kısalma katsayısıyla 16,41 cm'dir. Kuramsal değer (katsayı 1) 17,27 cm'dir; pratikte 16,5–17,3 cm arası teller kullanılır.`],
    ['Yarım dalga dipolün boyu nasıl bulunur?', `Dalga boyunun yarısı kısalma katsayısıyla çarpılır. 0,95 katsayısıyla kısa formül 142,5 ÷ f (MHz) metredir; bu toplam boydur ve iki eşit kola bölünür.`],
    ['Kısalma katsayısını kaç almalıyım?', `İnce çıplak tel antenlerde 0,95–0,97, izoleli telde ya da kalın boruda 0,93–0,95 iyi bir başlangıçtır. Emin değilseniz 0,95 ile hesaplayıp teli biraz uzun kesin ve ölçerek ayarlayın.`],
    ['Çeyrek dalga anten ile dipol arasındaki fark nedir?', `Dipol iki koldan oluşur ve zemine ihtiyaç duymaz. Çeyrek dalga anten tek koldur; diğer yarının yerini zemin düzlemi ya da radyaller alır. Zemin iyi değilse çeyrek dalga antenin verimi düşer.`],
    ['5/8 dalga anteni doğrudan kabloya bağlayabilir miyim?', `Hayır. 5/8 dalga boyundaki eleman rezonansta değildir; tabanına seri bir uyumlama bobini eklenmesi gerekir. Araç yalnızca elemanın boyunu verir.`],
    ['Daha uzun anten her zaman daha iyi mi?', `Hayır. Anten çalışma frekansında rezonansta ve besleme hattıyla uyumlu olmalıdır. Rastgele uzatılmış bir tel, uyumlama yapılmadıkça vericiye geri yansıma yaratır ve verimi düşürür.`],
    ['Yazdığım frekans kaydediliyor mu?', `Hayır. Hesap tarayıcınızda yapılır, girdiğiniz değerler hiçbir yere gönderilmez.`],
  ],
  related: ['dbm-watt-cevir', 'desibel-hesapla', 'lc-rezonans-frekansi-hesapla', 'cm-inc-cevir', 'empedans-hesapla'],
};
