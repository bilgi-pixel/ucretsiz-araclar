export default {
  slug: 'paskalya-tarihi-hesapla',
  title: 'Paskalya Tarihi Hesaplama',
  h1Tail: 'Batı ve Ortodoks',
  pageTitle: 'Paskalya Tarihi Hesaplama – Paskalya Hangi Gün? (Batı ve Ortodoks)',
  description: 'Bir yıl yazın; o yılın Paskalya tarihini hem Batı kiliselerine hem Ortodoks kiliselerine göre öğrenin. Kutsal Cuma, Küllü Çarşamba ve Pentekost günlerini de verir.',
  card: 'Herhangi bir yılın Paskalya tarihini Batı ve Ortodoks hesabına göre, bağlı günleriyle birlikte öğrenin.',
  category: 'zaman',
  keywords: ['paskalya tarihi hesaplama', 'paskalya ne zaman', 'paskalya hangi gün', 'ortodoks paskalyası tarihi', 'paskalya nasıl hesaplanır', 'kutsal cuma ne zaman', 'pentekost tarihi', 'computus'],
  lead: 'Paskalya her yıl başka bir tarihe denk gelen, hareketli bir bayramdır. Yılı yazın; araç Paskalya Pazarı\'nı hem <strong>Batı kiliselerinin</strong> (Gregoryen) hem de <strong>Ortodoks kiliselerinin</strong> (Jülyen) hesabına göre bulsun ve Paskalya\'ya bağlı diğer günleri listelesin.',
  button: 'Hesapla',
  inputs: [
    { id: 'yil', label: 'Yıl', type: 'number', placeholder: 'Örn. 2026', hint: '1583 ile 4099 arasında bir yıl yazın.' },
  ],
  compute(v, h) {
    const y = h.int(v.yil, 'Yıl');
    if (y < 1583 || y > 4099) h.err('Yıl 1583 ile 4099 arasında olmalı; Gregoryen takvim 1582\'de yürürlüğe girmiştir.');
    const B = (x, n) => Math.floor(x / n);
    // Batı (Gregoryen) Paskalyası: Anonim Gregoryen algoritması
    const a = y % 19, b = B(y, 100), c = y % 100, d = B(b, 4), e = b % 4;
    const f = B(b + 8, 25), g = B(b - f + 1, 3);
    const hh = (19 * a + b - d - g + 15) % 30;
    const i = B(c, 4), k = c % 4;
    const l = (32 + 2 * e + 2 * i - hh - k) % 7;
    const m = B(a + 11 * hh + 22 * l, 451);
    const t = hh + l - 7 * m + 114;
    const bati = new Date(Date.UTC(y, B(t, 31) - 1, (t % 31) + 1));
    // Ortodoks Paskalyası: Jülyen hesabı, sonra Gregoryen takvime çeviri
    const jd = (19 * (y % 19) + 15) % 30;
    const je = (2 * (y % 4) + 4 * (y % 7) - jd + 34) % 7;
    const jt = jd + je + 114;
    const fark = B(y, 100) - B(y, 400) - 2;
    const ort = h.gunEkle(new Date(Date.UTC(y, B(jt, 31) - 1, (jt % 31) + 1)), fark);
    const uzun = (x) => x.getUTCDate() + ' ' + h.ayAdi(x.getUTCMonth() + 1) + ' ' + x.getUTCFullYear();
    const ara = h.gunFarki(bati, ort);
    return {
      rows: [
        ['Paskalya (Batı kiliseleri)', uzun(bati) + ' Pazar'],
        ['Ortodoks Paskalyası', uzun(ort) + ' Pazar'],
        ['İki tarih arasındaki fark', ara === 0 ? 'Aynı gün' : ara + ' gün (' + (ara / 7) + ' hafta)'],
        ['Küllü Çarşamba (Batı)', uzun(h.gunEkle(bati, -46))],
        ['Palmiye Pazarı (Batı)', uzun(h.gunEkle(bati, -7))],
        ['Kutsal Cuma (Batı)', uzun(h.gunEkle(bati, -2))],
        ['Paskalya Pazartesisi (Batı)', uzun(h.gunEkle(bati, 1))],
        ['Göğe Yükseliş (Batı)', uzun(h.gunEkle(bati, 39))],
        ['Pentekost (Batı)', uzun(h.gunEkle(bati, 49))],
        ['Ortodoks Kutsal Cuma', uzun(h.gunEkle(ort, -2))],
        ['Ortodoks Pentekost', uzun(h.gunEkle(ort, 49))],
      ],
      note: 'Tüm tarihler bugün kullandığımız Miladi (Gregoryen) takvime göre yazılmıştır. Ortodoks tarihi Jülyen takvimiyle hesaplanıp ' + fark + ' gün eklenerek çevrilmiştir.',
    };
  },
  cases: [
    { in: { yil: '2026' }, out: { 'Paskalya (Batı kiliseleri)': '5 Nisan 2026 Pazar', 'Ortodoks Paskalyası': '12 Nisan 2026 Pazar', 'İki tarih arasındaki fark': '7 gün (1 hafta)', 'Küllü Çarşamba (Batı)': '18 Şubat 2026', 'Kutsal Cuma (Batı)': '3 Nisan 2026', 'Pentekost (Batı)': '24 Mayıs 2026' } },
    { in: { yil: '2024' }, out: { 'Paskalya (Batı kiliseleri)': '31 Mart 2024 Pazar', 'Ortodoks Paskalyası': '5 Mayıs 2024 Pazar', 'İki tarih arasındaki fark': '35 gün (5 hafta)', 'Küllü Çarşamba (Batı)': '14 Şubat 2024', 'Kutsal Cuma (Batı)': '29 Mart 2024', 'Pentekost (Batı)': '19 Mayıs 2024' } },
    { in: { yil: '2025' }, out: { 'Paskalya (Batı kiliseleri)': '20 Nisan 2025 Pazar', 'Ortodoks Paskalyası': '20 Nisan 2025 Pazar', 'İki tarih arasındaki fark': 'Aynı gün' } },
    { in: { yil: '2027' }, out: { 'Paskalya (Batı kiliseleri)': '28 Mart 2027 Pazar', 'Ortodoks Paskalyası': '2 Mayıs 2027 Pazar' } },
    { in: { yil: '2000' }, out: { 'Paskalya (Batı kiliseleri)': '23 Nisan 2000 Pazar', 'Ortodoks Paskalyası': '30 Nisan 2000 Pazar' } },
    { in: { yil: '1818' }, out: { 'Paskalya (Batı kiliseleri)': '22 Mart 1818 Pazar' } },
    { in: { yil: '2038' }, out: { 'Paskalya (Batı kiliseleri)': '25 Nisan 2038 Pazar' } },
    { in: { yil: '2016' }, out: { 'Paskalya (Batı kiliseleri)': '27 Mart 2016 Pazar', 'Ortodoks Paskalyası': '1 Mayıs 2016 Pazar' } },
    { in: { yil: '1500' }, error: true },
    { in: { yil: 'paskalya' }, error: true },
    { in: { yil: '2026,5' }, error: true },
  ],
  howto: [
    '"Yıl" alanına Paskalya tarihini öğrenmek istediğiniz yılı dört haneli olarak yazın.',
    '"Hesapla" düğmesine basın. İlk satırda Batı kiliselerinin, ikinci satırda Ortodoks kiliselerinin Paskalya Pazarı görünür.',
    'İki tarihin aynı güne mi denk geldiğini, yoksa aralarında kaç hafta olduğunu üçüncü satırdan okuyun.',
    'Kutsal Cuma, Küllü Çarşamba ve Pentekost gibi Paskalya\'ya göre belirlenen günler için alt satırlara bakın.',
  ],
  sections: [
    { h: 'Paskalya neden her yıl farklı bir tarihte?', p: [
      'Paskalya, Hristiyanlıkta İsa\'nın dirilişinin anıldığı bayramdır ve sabit bir takvim gününe bağlı değildir. Kural, 325 yılındaki İznik Konsili\'ne dayandırılır ve kabaca şöyle özetlenir: Paskalya, <strong>ilkbahar ekinoksundan sonraki ilk dolunayı izleyen ilk pazar</strong> günüdür. Hem Güneş yılına (ekinoks) hem Ay\'ın evrelerine (dolunay) hem de haftanın gününe (pazar) bağlı olduğu için tarih yıldan yıla beş haftaya varan bir aralıkta oynar.',
      'Uygulamada gökyüzündeki gerçek ekinoks ve dolunay kullanılmaz. Ekinoks her zaman 21 Mart kabul edilir; dolunay ise 19 yıllık bir döngüye dayanan tablolarla belirlenen "kilise dolunayı"dır. Bu sayede tarih, gözlem yapmadan yalnızca aritmetikle bulunabilir. Bu hesaba Latince adıyla <em>computus</em> denir.',
    ] },
    { h: 'Batı ve Ortodoks tarihleri neden ayrışıyor?', p: [
      'İki gelenek aynı kuralı izler, ancak farklı takvimler kullanır. Katolik ve Protestan kiliseleri hesabı 1582\'de kabul edilen Gregoryen takvime göre yapar. Ortodoks kiliselerinin büyük bölümü ise Paskalya için hâlâ eski Jülyen takvimini ve onun Ay tablolarını esas alır. Jülyen takvimi günümüzde Gregoryen takvimin 13 gün gerisindedir; dolayısıyla "21 Mart" iki takvimde farklı günlere denk gelir ve dolunay tabloları da birbirinden kaymıştır.',
      'Sonuç olarak Ortodoks Paskalyası ya Batı Paskalyası ile aynı gün ya da ondan bir, dört ya da beş hafta sonra kutlanır; hiçbir zaman daha önce gelmez. 2025\'te iki tarih 20 Nisan\'da çakışmış, 2024\'te ise aralarında beş hafta olmuştur (31 Mart ve 5 Mayıs).',
    ] },
    { h: 'Hesaplama yöntemi ve 2026 için çözümlü örnek', p: [
      'Araç, Batı tarihi için "Anonim Gregoryen algoritması" olarak bilinen ve yalnızca tam sayı bölmeleri kullanan yöntemi uygular. Yıl <code>Y</code> olmak üzere sırasıyla şu değerler bulunur (tüm bölmelerde yalnızca tam kısım alınır, "mod" kalanı gösterir):',
    ], ol: [
      '<code>a = Y mod 19</code>, <code>b = Y ÷ 100</code>, <code>c = Y mod 100</code> → 2026 için a = 12, b = 20, c = 26',
      '<code>d = b ÷ 4</code>, <code>e = b mod 4</code>, <code>f = (b + 8) ÷ 25</code>, <code>g = (b − f + 1) ÷ 3</code> → d = 5, e = 0, f = 1, g = 6',
      '<code>h = (19a + b − d − g + 15) mod 30</code> → (228 + 20 − 5 − 6 + 15) mod 30 = 252 mod 30 = 12',
      '<code>i = c ÷ 4</code>, <code>k = c mod 4</code> → i = 6, k = 2',
      '<code>l = (32 + 2e + 2i − h − k) mod 7</code> → (32 + 0 + 12 − 12 − 2) mod 7 = 30 mod 7 = 2',
      '<code>m = (a + 11h + 22l) ÷ 451</code> → (12 + 132 + 44) ÷ 451 = 0',
      'Ay = <code>(h + l − 7m + 114) ÷ 31</code> = 128 ÷ 31 = 4 (Nisan); gün = <code>(128 mod 31) + 1</code> = 4 + 1 = 5',
    ] },
    { h: 'Ortodoks tarihi için hesap', p: [
      'Yukarıdaki adımlar 2026 için <strong>5 Nisan</strong> sonucunu verir. Ortodoks tarihi daha kısa bir formülle bulunur: <code>d = (19 × (Y mod 19) + 15) mod 30</code> ve <code>e = (2 × (Y mod 4) + 4 × (Y mod 7) − d + 34) mod 7</code>. 2026 için d = 243 mod 30 = 3, e = (4 + 12 − 3 + 34) mod 7 = 47 mod 7 = 5 çıkar. Ay = (3 + 5 + 114) ÷ 31 = 3 (Mart), gün = (122 mod 31) + 1 = 30. Bu, Jülyen takvimine göre 30 Mart\'tır; Miladi takvime çevirmek için 13 gün eklenir ve <strong>12 Nisan 2026</strong> bulunur.',
      'İki takvim arasındaki fark sabit değildir: 1900 ile 2099 arasında 13 gündür, 2100\'den itibaren 14 güne çıkar. Araç bu farkı yıla göre kendisi hesaplar ve sonuç notunda belirtir.',
    ] },
    { h: 'Paskalya\'ya bağlı günler', ul: [
      '<strong>Küllü Çarşamba:</strong> Paskalya\'dan 46 gün önce; Batı geleneğinde Büyük Perhiz\'in başlangıcı.',
      '<strong>Palmiye Pazarı:</strong> Paskalya\'dan bir hafta önceki pazar; Kutsal Hafta\'nın ilk günü.',
      '<strong>Kutsal Cuma:</strong> Paskalya\'dan iki gün önceki cuma.',
      '<strong>Paskalya Pazartesisi:</strong> Paskalya\'nın ertesi günü; birçok Avrupa ülkesinde resmî tatildir.',
      '<strong>Göğe Yükseliş:</strong> Paskalya\'dan 39 gün sonraki perşembe.',
      '<strong>Pentekost:</strong> Paskalya\'dan 49 gün sonraki pazar; Paskalya günü de sayıldığında ellinci gün.',
    ] },
    { h: 'En erken ve en geç Paskalya', p: [
      'Gregoryen hesapta Paskalya en erken <strong>22 Mart</strong>, en geç <strong>25 Nisan</strong> tarihine denk gelebilir. İki uç da seyrek görülür: 22 Mart\'a en son 1818\'de rastlanmıştır; 25 Nisan ise 1943\'te yaşanmış olup bir sonraki sefer 2038\'dedir. Ortodoks Paskalyası, Miladi takvime çevrildiğinde bu yüzyılda 4 Nisan ile 8 Mayıs arasında bir güne düşer.',
    ] },
    { h: 'Kimler için yararlı?', p: [
      'Paskalya dönemi birçok ülkede okul tatili ve resmî tatil anlamına gelir. Yurt dışı seyahati planlayanlar uçak ve otel fiyatlarının yükseldiği haftayı, ihracat ve ithalat yapan firmalar Avrupa\'daki iş ortaklarının kapalı olacağı günleri, turizm işletmeleri ise Yunanistan, Balkanlar ve Doğu Avrupa\'dan gelecek misafirlerin tatil dönemini önceden bilmek ister. Türkiye\'de yaşayan Hristiyan cemaatler de bayramı bağlı oldukları kilisenin takvimine göre bu iki tarihten birinde kutlar.',
      'Araç 1583 ile 4099 arasındaki yıllar için çalışır. Alt sınır, Gregoryen takvimin ilk tam yılıdır; ancak her ülke bu takvime aynı anda geçmediği için eski yıllarda bir ülkede fiilen kutlanan tarih buradaki sonuçtan farklı olabilir.',
    ] },
  ],
  faq: [
    ['2026\'da Paskalya ne zaman?', 'Batı kiliselerine göre 5 Nisan 2026 Pazar, Ortodoks kiliselerine göre 12 Nisan 2026 Pazar günüdür. Aralarında bir hafta vardır.'],
    ['Paskalya neden hep pazar günüdür?', 'Kural gereği Paskalya, kilise dolunayından sonraki ilk pazara yerleştirilir. Bu nedenle hangi tarihe gelirse gelsin haftanın günü değişmez.'],
    ['Paskalya en erken ve en geç hangi tarihte olabilir?', 'Gregoryen hesapta en erken 22 Mart, en geç 25 Nisan\'dır. Yani bayram 35 günlük bir aralıkta dolaşır.'],
    ['Ortodoks Paskalyası Batı Paskalyasından önce gelebilir mi?', 'Hayır. Ortodoks tarihi ya aynı güne denk gelir ya da daha sonradır. Fark çoğu zaman bir ya da beş hafta, kimi yıllarda dört haftadır.'],
    ['Paskalya gerçek dolunaya göre mi hesaplanır?', 'Hayır. Hesapta gökyüzündeki dolunay değil, 19 yıllık döngüye dayanan tablolarla bulunan kilise dolunayı ve sabit 21 Mart ekinoksu kullanılır. Gerçek astronomik olaylarla arada bir-iki günlük fark olabilir.'],
    ['Kutsal Cuma nasıl bulunur?', 'Paskalya Pazarı\'ndan iki gün geri gidilir. 2026 için Batı kiliselerinde Kutsal Cuma 3 Nisan\'dır.'],
    ['Pentekost neden "ellinci gün" olarak anılır?', 'Paskalya günü birinci gün sayıldığında Pentekost ellinci güne denk gelir. Takvim farkı olarak Paskalya\'dan 49 gün, yani tam yedi hafta sonradır.'],
    ['Yazdığım yıl bir yere gönderiliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; hiçbir veri sunucuya iletilmez ve sayfa çevrimdışıyken de çalışır.'],
  ],
  related: ['hangi-gun-hesapla', 'julyen-gun-hesapla', 'rumi-takvim-cevir', 'artik-yil-kontrol', 'yil-takvimi-ayni-yillar'],
};
