export default {
  slug: 'ortalama-arteriyel-basinc-hesapla',
  title: 'Ortalama Arteriyel Basınç Hesaplama',
  h1Tail: 'OAB (MAP) ve nabız basıncı',
  pageTitle: 'Ortalama Arteriyel Basınç Hesaplama – OAB (MAP) Formülü',
  description: 'Büyük ve küçük tansiyon değerinden ortalama arteriyel basıncı (OAB, MAP) ve nabız basıncını hesaplayın. Formül, çözümlü örnekler ve değerin ne anlattığı.',
  card: 'Büyük ve küçük tansiyondan ortalama arteriyel basıncı (OAB/MAP) ve nabız basıncını hesaplayın.',
  category: 'saglik',
  keywords: ['ortalama arteriyel basınç hesaplama', 'OAB hesaplama', 'MAP hesaplama', 'ortalama kan basıncı formülü', 'nabız basıncı hesaplama', 'mean arterial pressure', 'ortalama arter basıncı normal değeri'],
  lead: 'Sistolik (büyük) ve diyastolik (küçük) tansiyon değerinizi yazın; araç <strong>ortalama arteriyel basıncı</strong> (OAB, İngilizce kısaltmasıyla MAP) ve nabız basıncını hesaplasın. Sonuç mmHg ve kPa olarak, genel başvuru aralığına göre kısa bir yorumla birlikte gösterilir.',
  button: 'Hesapla',
  inputs: [
    { id: 'sistolik', label: 'Sistolik (büyük) tansiyon – mmHg', type: 'number', placeholder: 'Örn. 120', hint: 'Tansiyon aletinde 12 olarak söylenen değer 120 mmHg\'dir.' },
    { id: 'diyastolik', label: 'Diyastolik (küçük) tansiyon – mmHg', type: 'number', placeholder: 'Örn. 80' },
  ],
  compute(v, h) {
    const s = h.pos(v.sistolik, 'Sistolik tansiyon');
    const d = h.pos(v.diyastolik, 'Diyastolik tansiyon');
    if (s < 40 && d < 30) h.err('Değerler çok küçük görünüyor. Tansiyonu mmHg olarak yazın: "12\'ye 8" için 120 ve 80 girin.');
    if (s < 40 || s > 300) h.err('Sistolik tansiyon 40 ile 300 mmHg arasında olmalı.');
    if (d < 20 || d > 200) h.err('Diyastolik tansiyon 20 ile 200 mmHg arasında olmalı.');
    if (d >= s) h.err('Diyastolik (küçük) tansiyon, sistolik (büyük) tansiyondan düşük olmalı; değerlerin yerini kontrol edin.');
    const nb = s - d;
    const oab = d + nb / 3;
    let yorum;
    if (oab < 60 - 1e-9) yorum = 'Düşük (60 mmHg altı)';
    else if (oab < 70 - 1e-9) yorum = 'Sınırda düşük (60–70 mmHg)';
    else if (oab <= 100 + 1e-9) yorum = 'Olağan aralıkta (70–100 mmHg)';
    else yorum = 'Yüksek (100 mmHg üstü)';
    return {
      rows: [
        ['Ortalama arteriyel basınç', h.fmt(oab, 1) + ' mmHg'],
        ['Nabız basıncı', h.fmt(nb, 1) + ' mmHg'],
        ['OAB (kilopaskal)', h.fmt(oab * 0.133322, 2) + ' kPa'],
        ['Genel başvuru aralığına göre', yorum],
        ['Nabız basıncının sistoliğe oranı', '%' + h.fmt(nb / s * 100, 1)],
      ],
      note: 'Formül: OAB = diyastolik + (sistolik − diyastolik) ÷ 3. Dinlenme hâlindeki kalp hızları için yaklaşık bir değerdir; tanı koymaz, hekim değerlendirmesinin yerini tutmaz.',
    };
  },
  cases: [
    { in: { sistolik: '120', diyastolik: '80' }, out: { 'Ortalama arteriyel basınç': '93,3 mmHg', 'Nabız basıncı': '40 mmHg', 'OAB (kilopaskal)': '12,44 kPa', 'Genel başvuru aralığına göre': 'Olağan aralıkta (70–100 mmHg)' } },
    { in: { sistolik: '140', diyastolik: '90' }, out: { 'Ortalama arteriyel basınç': '106,7 mmHg', 'Nabız basıncı': '50 mmHg', 'Genel başvuru aralığına göre': 'Yüksek (100 mmHg üstü)' } },
    { in: { sistolik: '90', diyastolik: '60' }, out: { 'Ortalama arteriyel basınç': '70 mmHg', 'Nabız basıncı': '30 mmHg', 'OAB (kilopaskal)': '9,33 kPa', 'Genel başvuru aralığına göre': 'Olağan aralıkta (70–100 mmHg)' } },
    { in: { sistolik: '80', diyastolik: '50' }, out: { 'Ortalama arteriyel basınç': '60 mmHg', 'Genel başvuru aralığına göre': 'Sınırda düşük (60–70 mmHg)' } },
    { in: { sistolik: '75', diyastolik: '45' }, out: { 'Ortalama arteriyel basınç': '55 mmHg', 'Genel başvuru aralığına göre': 'Düşük (60 mmHg altı)' } },
    { in: { sistolik: '160', diyastolik: '100' }, out: { 'Ortalama arteriyel basınç': '120 mmHg', 'Nabız basıncı': '60 mmHg', 'Nabız basıncının sistoliğe oranı': '%37,5' } },
    { in: { sistolik: '110', diyastolik: '70' }, out: { 'Ortalama arteriyel basınç': '83,3 mmHg', 'OAB (kilopaskal)': '11,11 kPa' } },
    { in: { sistolik: '80', diyastolik: '120' }, error: true },
    { in: { sistolik: '12', diyastolik: '8' }, error: true },
    { in: { sistolik: '', diyastolik: '80' }, error: true },
  ],
  howto: [
    'Tansiyonunuzu en az beş dakika oturup dinlendikten sonra ölçün ve cihazın gösterdiği iki değeri not edin.',
    'Büyük tansiyonu "Sistolik" alanına, küçük tansiyonu "Diyastolik" alanına mmHg olarak yazın; "12\'ye 8" için 120 ve 80 girilir.',
    '"Hesapla" düğmesine basın. Ortalama arteriyel basınç ilk satırda, nabız basıncı ve kPa karşılığı altında görünür.',
    'Sonucu düzenli izliyorsanız kopyalayıp tarihle birlikte not edin ve kontrollerde hekiminizle paylaşın.',
  ],
  sections: [
    { h: 'Ortalama arteriyel basınç nedir?', p: [
      'Tansiyon ölçümü iki sayı verir: kalbin kasılıp kanı atardamarlara pompaladığı andaki en yüksek basınç (sistolik) ve kalbin gevşeyip dolduğu andaki en düşük basınç (diyastolik). Ancak organlar bu iki uç değeri değil, bir kalp atımı boyunca atardamarlardaki <strong>ortalama</strong> basıncı "hisseder". Ortalama arteriyel basınç (OAB), bir kalp döngüsü boyunca atardamarlardaki basıncın zamana göre ortalamasıdır ve dokulara kan akışını sürükleyen itici gücü tek bir sayıyla özetler.',
      'Bu yüzden OAB özellikle yoğun bakım, anestezi ve acil tıp gibi alanlarda yakından izlenen bir değerdir. Beyin, böbrek ve kalp gibi organların yeterince kanlanıp kanlanmadığını değerlendirirken tek tek sistolik ve diyastolik değerlerden daha kullanışlı bir gösterge kabul edilir.',
    ] },
    { h: 'Formül ve mantığı', p: [
      'En yaygın kullanılan yaklaşık formül şudur: <strong>OAB = diyastolik + (sistolik − diyastolik) ÷ 3</strong>. Aynı ifade <strong>(sistolik + 2 × diyastolik) ÷ 3</strong> biçiminde de yazılabilir.',
      'Neden sistolik ile diyastoliğin düz ortalaması alınmıyor? Çünkü dinlenme hâlinde kalp, bir atım süresinin kabaca üçte birini kasılmakla (sistol), üçte ikisini gevşemekle (diyastol) geçirir. Basınç zamanın çoğunda diyastolik değere yakın seyrettiği için ortalamada diyastolik basıncın ağırlığı iki kat fazladır.',
      'Sistolik ile diyastolik arasındaki farka <strong>nabız basıncı</strong> denir. Formül, diyastolik basınca nabız basıncının üçte birini eklemekten ibarettir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Tansiyon 120/80 mmHg. Nabız basıncı 120 − 80 = 40 mmHg\'dir. OAB = 80 + 40 ÷ 3 = 80 + 13,3 = 93,3 mmHg. Kilopaskal cinsinden yaklaşık 12,44 kPa eder.',
      '<strong>Örnek 2:</strong> Tansiyon 140/90 mmHg. Nabız basıncı 50 mmHg, OAB = 90 + 50 ÷ 3 = 106,7 mmHg; genel başvuru aralığının üstündedir.',
      '<strong>Örnek 3:</strong> Tansiyon 90/60 mmHg. Nabız basıncı 30 mmHg, OAB = 60 + 10 = 70 mmHg; aralığın alt sınırındadır.',
    ] },
    { h: 'Sonuç nasıl yorumlanır?', p: [
      'Tıp kaynaklarında yetişkinler için ortalama arteriyel basıncın çoğunlukla <strong>70–100 mmHg</strong> arasında olması olağan kabul edilir. Organların yeterli kanlanması için genellikle en az 60–65 mmHg dolayında bir ortalama basınca gereksinim olduğu belirtilir; bunun altındaki değerler, özellikle uzun sürdüğünde, hayati organların beslenmesi açısından kaygı vericidir. Sürekli yüksek seyreden ortalama basınç ise kalbin daha büyük bir dirence karşı çalıştığını düşündürür.',
      'Araçtaki yorum satırı bu genel aralıklara göre yazılmıştır ve yalnızca bilgilendirme amaçlıdır. Hedef değerler kişinin yaşına, eşlik eden hastalıklarına ve klinik duruma göre değişir; bu kararı yalnızca hekim verir. Tek bir ölçümle sonuca varmayın: tansiyon gün içinde, heyecanla, ağrıyla, kafeinle ve ölçüm tekniğiyle değişir.',
    ], ul: [
      '<strong>60 mmHg altı:</strong> düşük; baş dönmesi, bayılma hissi, soğuk terleme gibi belirtiler eşlik ediyorsa gecikmeden sağlık kuruluşuna başvurun.',
      '<strong>60–70 mmHg:</strong> sınırda düşük.',
      '<strong>70–100 mmHg:</strong> genel olarak olağan kabul edilen aralık.',
      '<strong>100 mmHg üstü:</strong> yüksek; tekrarlayan ölçümlerde sürüyorsa hekiminize danışın.',
    ] },
    { h: 'Nabız basıncı ne anlatır?', p: [
      'Nabız basıncı, sistolik ile diyastolik arasındaki farktır ve her atımda atardamar duvarının ne kadar gerildiğinin kaba bir göstergesidir. Dinlenme hâlindeki sağlıklı yetişkinlerde çoğunlukla 40 mmHg dolayındadır. Yaşla birlikte büyük atardamarların esnekliği azaldıkça sistolik basınç yükselip diyastolik basınç düşebilir ve nabız basıncı genişler. Çok dar ya da çok geniş nabız basıncı, hekimin başka bulgularla birlikte değerlendirdiği bir ipucudur; tek başına tanı anlamına gelmez.',
    ] },
    { h: 'Formülün sınırları', p: [
      'Üçte bir kuralı, dinlenme hâlindeki kalp hızları için iyi bir yaklaşımdır. Kalp hızı arttıkça diyastol süresi sistole göre daha fazla kısalır ve gerçek ortalama basınç, sistolik ile diyastoliğin düz ortalamasına yaklaşır. Egzersiz sırasında ya da belirgin çarpıntıda formül gerçek değeri olduğundan düşük tahmin edebilir.',
      'Hastanelerde kullanılan otomatik (osilometrik) tansiyon cihazları ortalama basıncı çoğu zaman doğrudan ölçer ve sistolik ile diyastolik değerleri bundan türetir; atardamar içi kateterle yapılan ölçümlerde ise ortalama, basınç eğrisinin altındaki alandan hesaplanır. Dolayısıyla monitörde gördüğünüz değer bu sayfadaki formül sonucundan birkaç mmHg farklı olabilir. Araç çocuklar, gebeler ve ritim bozukluğu olanlar için ayrı bir değerlendirme yapmaz.',
    ] },
  ],
  faq: [
    ['120/80 tansiyonda ortalama arteriyel basınç kaçtır?', '80 + (120 − 80) ÷ 3 = 93,3 mmHg\'dir. Bu değer, yetişkinler için genel olarak olağan kabul edilen 70–100 mmHg aralığının içindedir.'],
    ['OAB ve MAP aynı şey mi?', 'Evet. OAB, "ortalama arteriyel basınç" ifadesinin Türkçe kısaltmasıdır; MAP ise aynı kavramın İngilizce karşılığı olan "mean arterial pressure" ifadesinin kısaltmasıdır. Ortalama arter basıncı ya da ortalama kan basıncı da denir.'],
    ['Neden büyük ve küçük tansiyonun düz ortalaması alınmıyor?', 'Çünkü kalp dinlenme hâlinde zamanın yaklaşık üçte ikisini gevşeme evresinde geçirir. Atardamar basıncı sürenin çoğunda diyastolik değere yakın olduğundan ortalamada diyastolik basınç iki kat ağırlık taşır.'],
    ['Normal ortalama arteriyel basınç kaç olmalı?', 'Yetişkinlerde genellikle 70–100 mmHg arası olağan sayılır. Bu genel bir başvuru aralığıdır; kişiye özel hedefleri hekiminiz belirler.'],
    ['Tansiyonu "12\'ye 8" olarak mı yazmalıyım?', 'Hayır, mmHg olarak yazın: 12\'ye 8 tansiyon 120 ve 80 olarak girilir. Araç 12 ve 8 gibi çok küçük değerleri kabul etmez ve sizi uyarır.'],
    ['Nabız basıncı ile nabız aynı şey mi?', 'Hayır. Nabız, kalbin bir dakikadaki atım sayısıdır. Nabız basıncı ise büyük tansiyon ile küçük tansiyon arasındaki farktır ve mmHg ile ölçülür.'],
    ['Bu hesap hastalık tanısı koyar mı?', 'Hayır. Araç yalnızca aritmetik bir hesap yapar ve genel başvuru aralığını hatırlatır. Tansiyonla ilgili şikâyetiniz varsa ya da ölçümleriniz sürekli düşük ya da yüksek çıkıyorsa bir hekime başvurun; acil belirtilerde 112\'yi arayın.'],
    ['Tansiyon değerlerim bir yere kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız değerler hiçbir sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['tansiyon-degerlendirme', 'nabiz-hesapla', 'maksimum-nabiz-hesapla', 'vki-hesapla', 'kolesterol-orani-hesapla'],
};
