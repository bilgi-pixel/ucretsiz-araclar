export default {
  slug: 'hba1c-ortalama-seker-hesapla',
  title: 'HbA1c Ortalama Kan Şekeri Hesaplama',
  h1Tail: 'HbA1c ↔ tahmini ortalama glukoz',
  pageTitle: 'HbA1c Ortalama Kan Şekeri Hesaplama – Üç Aylık Şeker Karşılığı',
  description: 'HbA1c (üç aylık şeker) değerinizin karşılık geldiği tahmini ortalama kan şekerini mg/dL ve mmol/L olarak hesaplayın; yüzde ve mmol/mol arasında çevirin.',
  card: 'HbA1c değerinizi girin; karşılık gelen tahmini ortalama kan şekerini mg/dL ve mmol/L olarak görün, tersini de hesaplayın.',
  category: 'saglik',
  keywords: ['hba1c hesaplama', 'hba1c ortalama kan şekeri', 'üç aylık şeker hesaplama', 'hba1c kaç şekere denk', 'tahmini ortalama glukoz', 'hba1c mmol/mol çevirme', 'eag hesaplama', 'hba1c 7 kaç şeker'],
  lead: 'HbA1c, halk arasındaki adıyla üç aylık şeker, son haftalardaki ortalama kan şekerinizi yansıtır. Yüzde değerini yazın; karşılık gelen <strong>tahmini ortalama kan şekerini</strong> mg/dL ve mmol/L olarak görün. Ortalama şekerden HbA1c\'ye ters hesap ve mmol/mol çevirisi de yapılır.',
  button: 'Hesapla',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 7' },
    { id: 'tur', label: 'Girilen değerin türü', type: 'select', options: [['yuzde', 'HbA1c (%)'], ['ifcc', 'HbA1c (mmol/mol)'], ['mg', 'Ortalama kan şekeri (mg/dL)'], ['mmol', 'Ortalama kan şekeri (mmol/L)']] },
  ],
  compute(v, h) {
    const x = h.pos(v.deger, 'Değer');
    let a; // HbA1c, %
    if (v.tur === 'ifcc') a = x / 10.929 + 2.15;
    else if (v.tur === 'mg') a = (x + 46.7) / 28.7;
    else if (v.tur === 'mmol') a = (x + 2.59) / 1.59;
    else a = x;
    if (a < 3 || a > 20) {
      if (v.tur === 'yuzde' || !v.tur) h.err('HbA1c değeri %3 ile %20 arasında olmalı; değer mmol/mol ise türü değiştirin.');
      h.err('Girilen değer geçerli HbA1c aralığının (%3 – %20) dışında bir sonuca karşılık geliyor; değeri ve türünü kontrol edin.');
    }
    const mg = 28.7 * a - 46.7;
    const mmol = 1.59 * a - 2.59;
    const ifcc = (a - 2.15) * 10.929;
    const a1 = Math.round(a * 10 + 1e-9) / 10;
    let aralik;
    if (a1 < 5.7) aralik = 'Normal aralık (%5,7 altı)';
    else if (a1 < 6.5) aralik = 'Prediyabet aralığı (%5,7 – %6,4)';
    else aralik = 'Diyabet aralığı (%6,5 ve üzeri)';
    const rOrt = ['Tahmini ortalama kan şekeri', h.fmt(mg, 1) + ' mg/dL'];
    const rMmol = ['Ortalama kan şekeri (mmol/L)', h.fmt(mmol, 2) + ' mmol/L'];
    const rA = ['HbA1c', '%' + h.fmt(a, 1)];
    const rI = ['HbA1c (IFCC)', h.fmt(ifcc, 0) + ' mmol/mol'];
    const rows = (v.tur === 'mg' || v.tur === 'mmol') ? [rA, rI, rOrt, rMmol] : [rOrt, rMmol, rA, rI];
    rows.push(['HbA1c aralığı', aralik]);
    return {
      rows,
      note: 'Formül: ortalama glukoz (mg/dL) = 28,7 × HbA1c − 46,7. Sonuç bir tahmindir; kansızlık, hemoglobin farklılıkları ve gebelik gibi durumlarda HbA1c gerçek ortalamayı tam yansıtmayabilir.',
    };
  },
  cases: [
    { in: { deger: '7', tur: 'yuzde' }, out: { 'Tahmini ortalama kan şekeri': '154,2 mg/dL', 'Ortalama kan şekeri (mmol/L)': '8,54 mmol/L', 'HbA1c (IFCC)': '53 mmol/mol', 'HbA1c aralığı': 'Diyabet aralığı (%6,5 ve üzeri)' } },
    { in: { deger: '6', tur: 'yuzde' }, out: { 'Tahmini ortalama kan şekeri': '125,5 mg/dL', 'Ortalama kan şekeri (mmol/L)': '6,95 mmol/L', 'HbA1c (IFCC)': '42 mmol/mol', 'HbA1c aralığı': 'Prediyabet aralığı (%5,7 – %6,4)' } },
    { in: { deger: '5', tur: 'yuzde' }, out: { 'Tahmini ortalama kan şekeri': '96,8 mg/dL', 'Ortalama kan şekeri (mmol/L)': '5,36 mmol/L', 'HbA1c (IFCC)': '31 mmol/mol', 'HbA1c aralığı': 'Normal aralık (%5,7 altı)' } },
    { in: { deger: '8', tur: 'yuzde' }, out: { 'Tahmini ortalama kan şekeri': '182,9 mg/dL', 'Ortalama kan şekeri (mmol/L)': '10,13 mmol/L', 'HbA1c (IFCC)': '64 mmol/mol' } },
    { in: { deger: '10', tur: 'yuzde' }, out: { 'Tahmini ortalama kan şekeri': '240,3 mg/dL', 'Ortalama kan şekeri (mmol/L)': '13,31 mmol/L' } },
    { in: { deger: '53', tur: 'ifcc' }, out: { 'HbA1c': '%7', 'Tahmini ortalama kan şekeri': '154,2 mg/dL' } },
    { in: { deger: '154', tur: 'mg' }, out: { 'HbA1c': '%7', 'HbA1c (IFCC)': '53 mmol/mol', 'HbA1c aralığı': 'Diyabet aralığı (%6,5 ve üzeri)' } },
    { in: { deger: '6,95', tur: 'mmol' }, out: { 'HbA1c': '%6', 'Tahmini ortalama kan şekeri': '125,5 mg/dL' } },
    { in: { deger: '6,5', tur: 'yuzde' }, out: { 'HbA1c (IFCC)': '48 mmol/mol', 'HbA1c aralığı': 'Diyabet aralığı (%6,5 ve üzeri)' } },
    { in: { deger: '53', tur: 'yuzde' }, error: true },
    { in: { deger: '', tur: 'yuzde' }, error: true },
    { in: { deger: '-7', tur: 'yuzde' }, error: true },
  ],
  howto: [
    'Tahlil raporunuzdaki HbA1c (glikozile hemoglobin) değerini "Değer" alanına yazın.',
    '"Girilen değerin türü" listesinden değerin biçimini seçin: çoğu Türkiye raporunda HbA1c yüzde olarak verilir; bazı raporlarda ayrıca mmol/mol satırı bulunur.',
    'Tersini hesaplamak, yani ortalama kan şekerinizden yaklaşık HbA1c\'yi bulmak için türü mg/dL ya da mmol/L olarak seçin.',
    '"Hesapla" düğmesine basın. Tahmini ortalama kan şekeri iki birimde, HbA1c ise hem yüzde hem mmol/mol olarak listelenir.',
  ],
  sections: [
    { h: 'HbA1c neyi ölçer?', p: [
      'Kandaki glukoz, alyuvarların içindeki hemoglobine kendiliğinden bağlanır. Kan şekeri ne kadar yüksek seyrederse hemoglobinin o kadar büyük bölümü şekerlenir. Şekerlenmiş hemoglobinin toplam hemoglobine oranına <strong>HbA1c</strong> denir. Alyuvarlar yaklaşık üç-dört ay yaşadığı için bu oran, tek bir andaki şekeri değil, son iki-üç ayın ortalamasını yansıtır; "üç aylık şeker" adı buradan gelir. Son haftaların ağırlığı, daha eski haftalara göre biraz daha fazladır.',
      'Parmak ucundan yapılan ölçüm o anki değeri gösterir ve yemek, hareket, stres gibi etkenlerle gün içinde iniş çıkış yapar. HbA1c ise bu dalgalanmalardan etkilenmez, açlık gerektirmez ve uzun dönemli gidişi tek sayıyla özetler. İki ölçüm birbirinin yerine geçmez, birbirini tamamlar.',
    ] },
    { h: 'Hesaplama formülü', p: [
      'HbA1c yüzdesini gündelik ölçümlerle aynı birime çevirmek için, sürekli glukoz ölçümleriyle HbA1c\'nin karşılaştırıldığı uluslararası bir çalışmadan türetilen doğrusal bağıntı kullanılır. Sonuca <strong>tahmini ortalama glukoz</strong> (İngilizce kısaltmasıyla eAG) denir.',
    ], ul: [
      '<strong>Ortalama glukoz (mg/dL) = 28,7 × HbA1c − 46,7</strong>',
      '<strong>Ortalama glukoz (mmol/L) = 1,59 × HbA1c − 2,59</strong>',
      'Ters hesap: <strong>HbA1c = (ortalama glukoz mg/dL + 46,7) ÷ 28,7</strong>',
      'Birim çevirisi: <strong>HbA1c (mmol/mol) = (HbA1c % − 2,15) × 10,929</strong>',
    ] },
    { h: 'Çözümlü örnek', p: [
      'HbA1c değeri %7 olan bir kişi için: 28,7 × 7 = 200,9; buradan 46,7 çıkarılınca <strong>154,2 mg/dL</strong> bulunur. mmol/L karşılığı 1,59 × 7 − 2,59 = 8,54 mmol/L\'dir. Aynı değerin IFCC birimindeki karşılığı (7 − 2,15) × 10,929 ≈ 53 mmol/mol eder.',
      'Formülden görüleceği gibi HbA1c\'deki her 1 puanlık değişim, ortalama kan şekerinde yaklaşık 28,7 mg/dL\'lik (1,59 mmol/L) bir değişime karşılık gelir. %8\'den %7\'ye inmek, ortalama şekerin yaklaşık 183 mg/dL\'den 154 mg/dL\'ye düşmesi demektir.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>%5</strong> → 96,8 mg/dL (5,36 mmol/L), 31 mmol/mol',
      '<strong>%5,7</strong> → 116,9 mg/dL (6,47 mmol/L), 39 mmol/mol',
      '<strong>%6</strong> → 125,5 mg/dL (6,95 mmol/L), 42 mmol/mol',
      '<strong>%6,5</strong> → 139,8 mg/dL (7,75 mmol/L), 48 mmol/mol',
      '<strong>%7</strong> → 154,2 mg/dL (8,54 mmol/L), 53 mmol/mol',
      '<strong>%8</strong> → 182,9 mg/dL (10,13 mmol/L), 64 mmol/mol',
      '<strong>%9</strong> → 211,6 mg/dL (11,72 mmol/L), 75 mmol/mol',
      '<strong>%10</strong> → 240,3 mg/dL (13,31 mmol/L), 86 mmol/mol',
    ] },
    { h: 'Aralıklar ne anlama gelir?', p: [
      'Tanı kılavuzlarında yaygın kullanılan eşiklere göre HbA1c\'nin %5,7\'nin altında olması normal, %5,7 ile %6,4 arasında olması prediyabet (gizli şeker) aralığı, %6,5 ve üzerinde olması diyabet aralığı kabul edilir. Araç "HbA1c aralığı" satırında bu sınıflamayı gösterir.',
      'Bu eşikler tanı içindir. Diyabet tanısı almış kişilerde hedef HbA1c ise ayrı bir konudur: yaşa, eşlik eden hastalıklara, düşük şeker riskine ve kullanılan tedaviye göre hekim tarafından kişiye özel belirlenir. Birçok erişkin için %7 dolayı bir hedef anılsa da bu herkes için geçerli bir kural değildir.',
    ] },
    { h: 'HbA1c\'nin yanıltabileceği durumlar', p: [
      'Hesap, alyuvarların ortalama ömrünün olağan olduğu varsayımına dayanır. Demir eksikliği kansızlığı, yakın zamanda geçirilmiş kanama ya da kan nakli, böbrek yetmezliği, bazı kalıtsal hemoglobin farklılıkları (örneğin talasemi taşıyıcılığı ve orak hücre özelliği) ve gebelik HbA1c\'yi gerçek ortalamadan saptırabilir. Ayrıca aynı HbA1c değerine sahip iki kişinin gerçek ortalama şekeri birbirinden bir miktar farklı olabilir; formül toplum ortalamasını verir.',
      'Ortalama, dalgalanmayı da gizler: gün içinde çok yüksek ve çok düşük değerler arasında gidip gelen biriyle dengeli seyreden birinin HbA1c\'si aynı çıkabilir. Bu nedenle sonuçlar ölçüm günlüğü ya da sensör verileriyle birlikte yorumlanır.',
      'Bu sayfa bilgilendirme amaçlıdır; tanı koymaz ve tedavi önermez. İlaç ya da insülin dozunuzu buradaki sonuca göre değiştirmeyin, tahlilinizi hekiminizle değerlendirin.',
    ] },
  ],
  faq: [
    ['HbA1c 7 kaç kan şekerine denk gelir?', '%7 HbA1c, yaklaşık 154 mg/dL (8,5 mmol/L) ortalama kan şekerine karşılık gelir. Hesap 28,7 × 7 − 46,7 formülüyle yapılır.'],
    ['HbA1c kaç olmalı?', 'Diyabeti olmayan erişkinlerde %5,7\'nin altı normal kabul edilir. Diyabetli kişilerde hedef kişiye göre değişir ve hekim tarafından belirlenir.'],
    ['Üç aylık şeker testi için aç olmak gerekir mi?', 'Hayır. HbA1c son haftaların ortalamasını yansıttığından o günkü öğünlerden etkilenmez; günün herhangi bir saatinde kan verilebilir.'],
    ['Evdeki ölçümlerimin ortalaması bu sonuçla neden uyuşmuyor?', 'Parmak ucu ölçümleri çoğunlukla günün belirli saatlerinde yapılır ve gece ile öğün sonrası değerleri tam yansıtmaz. Ayrıca formül toplum ortalamasına dayanır; kişisel farklılıklar birkaç puanlık sapmaya yol açabilir.'],
    ['mmol/mol birimi nedir?', 'HbA1c\'nin uluslararası standart (IFCC) birimidir ve bazı ülkelerde yüzde yerine kullanılır. %7 değeri 53 mmol/mol\'e, %6,5 değeri 48 mmol/mol\'e karşılık gelir.'],
    ['HbA1c ne sıklıkla ölçülmeli?', 'Sıklığı hekim belirler. Diyabetli kişilerde genellikle yılda birkaç kez bakılır; tedavi değişikliklerinden sonra daha sık istenebilir.'],
    ['Ortalama kan şekerimden HbA1c\'yi tahmin edebilir miyim?', 'Evet. Türü "Ortalama kan şekeri" olarak seçip değeri girin. Sonuç yaklaşık bir tahmindir; ölçümleriniz günün tamamını temsil etmiyorsa laboratuvar sonucundan farklı çıkabilir.'],
    ['Girdiğim tahlil değeri kaydediliyor mu?', 'Hayır. Hesaplama yalnızca tarayıcınızda yapılır; değerler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['kan-sekeri-birim-cevir', 'kolesterol-orani-hesapla', 'tansiyon-degerlendirme', 'vki-hesapla', 'kalori-hesapla'],
};
