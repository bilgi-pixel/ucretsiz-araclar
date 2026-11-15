export default {
  slug: 'bar-atm-cevir',
  title: 'Bar Atmosfer Çevirici',
  h1Tail: 'bar ↔ atm',
  pageTitle: 'Bar Atmosfer Çevirici – bar\'dan atm\'ye, atm\'den bar\'a Çevirme',
  description: 'Bar değerini standart atmosfere (atm), atm değerini bara çevirin. 1 atm = 1,01325 bar tanımıyla çalışır; kPa, psi, Torr ve metre su sütunu karşılığını da verir.',
  card: 'Barı atmosfere, atmosferi bara çevirin; kimya ve fizik soruları, dalış ve gaz hesapları için kPa, psi ve Torr ile.',
  category: 'birim',
  keywords: ['bar atm çevirme', '1 atm kaç bar', '1 bar kaç atm', 'atmosfer basıncı bar', 'atm bar dönüştürme', 'standart atmosfer', 'atm hesaplama', 'basınç birimleri'],
  lead: 'Basıncı bardan standart atmosfere ya da atmosferden bara çevirin. Standart atmosfer tam olarak 101.325 pascal olarak tanımlıdır; bu yüzden <strong>1 atm = 1,01325 bar</strong> eder.',
  button: 'Çevir',
  inputs: [
    { id: 'basinc', label: 'Basınç', type: 'number', placeholder: 'Örn. 1' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['bar', 'Bar → Atmosfer (atm)'], ['atm', 'Atmosfer (atm) → Bar']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.basinc, 'Basınç');
    const ATM = 101325; // 1 atm = 101.325 Pa (tam tanım)
    const pa = v.yon === 'atm' ? x * ATM : x * 100000;
    const bar = pa / 100000;
    const atm = pa / ATM;
    const f = (n) => h.sig(n, 7);
    return {
      rows: [
        v.yon === 'atm' ? ['Bar', f(bar) + ' bar'] : ['Atmosfer', f(atm) + ' atm'],
        v.yon === 'atm' ? ['Atmosfer', f(atm) + ' atm'] : ['Bar', f(bar) + ' bar'],
        ['Kilopascal', f(pa / 1000) + ' kPa'],
        ['PSI', f(pa / 6894.757293168361) + ' psi'],
        ['Torr (≈ mmHg)', f(atm * 760) + ' Torr'],
        ['Metre su sütunu', f(pa / 9806.65) + ' mSS'],
      ],
      note: '1 atm = 101.325 Pa = 1,01325 bar = 760 Torr (tam tanımlar). Buradaki atm, standart atmosferdir; teknik atmosfer (at) değildir.',
    };
  },
  cases: [
    { in: { basinc: '1', yon: 'atm' }, out: { 'Bar': '1,01325 bar', 'Kilopascal': '101,325 kPa', 'Torr (≈ mmHg)': '760 Torr' } },
    { in: { basinc: '1', yon: 'bar' }, out: { 'Atmosfer': '0,9869233 atm', 'Kilopascal': '100 kPa' } },
    { in: { basinc: '2', yon: 'atm' }, out: { 'Bar': '2,0265 bar', 'PSI': '29,3919 psi' } },
    { in: { basinc: '10', yon: 'bar' }, out: { 'Atmosfer': '9,869233 atm' } },
    { in: { basinc: '200', yon: 'atm' }, out: { 'Bar': '202,65 bar' } },
    { in: { basinc: '1,01325', yon: 'bar' }, out: { 'Atmosfer': '1 atm', 'Metre su sütunu': '10,33227 mSS' } },
    { in: { basinc: '0,5', yon: 'atm' }, out: { 'Bar': '0,506625 bar', 'Torr (≈ mmHg)': '380 Torr' } },
    { in: { basinc: '-1', yon: 'atm' }, error: true },
    { in: { basinc: 'atm', yon: 'bar' }, error: true },
  ],
  howto: [
    '"Basınç" kutusuna bar ya da atm cinsinden değeri yazın; virgüllü ve noktalı ondalık yazım kabul edilir.',
    '"Çeviri yönü" listesinden "Bar → Atmosfer" ya da "Atmosfer → Bar" seçeneğini belirleyin.',
    '"Çevir" düğmesine tıklayın. Sonuçta karşılık gelen basınçla birlikte kPa, psi, Torr ve metre su sütunu değerleri de yer alır.',
    'Sonuçları ödevinize ya da raporunuza aktarmak için "Sonucu kopyala" düğmesini kullanın.',
  ],
  sections: [
    { h: 'Bar ve atmosfer neden birbirine bu kadar yakın?', p: [
      'İki birim de deniz seviyesindeki hava basıncını temel alır, ancak tanımları farklıdır. <strong>Standart atmosfer (atm)</strong>, deniz seviyesindeki ortalama hava basıncını temsil etmek üzere seçilmiş ve tam olarak 101.325 pascal olarak sabitlenmiştir. Bu basınç, 760 milimetre yüksekliğinde bir cıva sütununu dengeleyen basınca denk gelir.',
      '<strong>Bar</strong> ise hesap kolaylığı gözetilerek yuvarlak bir sayı olarak tanımlanmıştır: tam 100.000 pascal. Böylece 1 atm, 1 bardan yalnızca yüzde 1,325 daha büyüktür. Gündelik kullanımda ikisi sıkça birbirinin yerine söylenir; "lastiğe 2 atü bas" gibi ifadeler bunun örneğidir. Ancak laboratuvar hesaplarında, gaz yasası problemlerinde ve hassas ölçümlerde bu küçük fark sonucu etkiler.',
    ] },
    { h: 'Çeviri formülü ve çözümlü örnekler', p: [
      'Atmosferden bara geçmek için değeri 1,01325 ile çarparsınız: <strong>bar = atm × 1,01325</strong>. Bardan atmosfere geçmek için 1,01325\'e bölersiniz: <strong>atm = bar ÷ 1,01325</strong>; bu, 0,9869233 ile çarpmakla aynıdır.',
      '<strong>Örnek 1:</strong> Bir kimya sorusunda gaz 2 atm basınç altında veriliyor. 2 × 1,01325 = 2,0265 bar. Aynı basınç 202,65 kPa ve 1.520 Torr eder.',
      '<strong>Örnek 2:</strong> Kompresör manometresinde 10 bar okuyorsunuz. 10 ÷ 1,01325 = 9,869 atm.',
      '<strong>Örnek 3:</strong> Bir basınçlı tüpün etiketi 200 atm dolum basıncı gösteriyor. 200 × 1,01325 = 202,65 bar. Fark 2,65 bar\'dır; yüksek basınçlarda yüzde 1,3\'lük oran mutlak değer olarak göz ardı edilemeyecek büyüklüğe ulaşır.',
    ] },
    { h: 'Kimya ve fizik derslerinde dikkat', p: [
      'Gaz problemlerinde hangi "standart basıncın" kullanıldığı sonucu değiştirir. Eski ve hâlâ yaygın olan normal koşullar tanımı 0 °C ve 1 atm\'dir; bu koşullarda bir mol ideal gaz yaklaşık 22,414 litre hacim kaplar. Standart basıncı 1 bar alan tanımda ise aynı sıcaklıkta molar hacim yaklaşık 22,711 litredir. Soru metninde hangi tanımın geçtiğine bakmadan ezberdeki sayıyı kullanmak hatalı sonuca götürür.',
      'İdeal gaz denklemi PV = nRT kullanılırken gaz sabitinin birimi basınç birimine uymalıdır: basınç atm ise R = 0,082057 L·atm/(mol·K), basınç bar ise R = 0,083145 L·bar/(mol·K) alınır. Basıncı bir birimde, sabiti diğer birimde kullanmak yüzde 1,3\'lük sistematik bir hataya yol açar. Emin değilseniz her şeyi pascal, metreküp ve kelvine çevirip R = 8,314 J/(mol·K) ile çalışmak en güvenli yoldur.',
      'Suyun kaynama noktası da basınca bağlıdır: 1 atm\'de yaklaşık 100 °C, 1 bar\'da ise biraz daha düşük, yaklaşık 99,6 °C\'dir. Kaynama noktası tablolarını okurken tablonun hangi basınca göre hazırlandığını kontrol edin.',
    ] },
    { h: 'Standart atmosfer, teknik atmosfer ve "atü"', p: [
      'Tarihsel olarak "atmosfer" adını taşıyan iki ayrı birim vardır. Bu aracın çevirdiği <strong>standart atmosfer (atm)</strong> 101.325 Pa\'dır. <strong>Teknik atmosfer (at)</strong> ise santimetrekareye bir kilogram-kuvvet, yani 98.066,5 Pa = 0,980665 bar olarak tanımlıdır. İkisi arasında yüzde 3\'ten fazla fark bulunur; eski manometrelerde ve mühendislik belgelerinde "at" ya da "kg/cm²" görürseniz bu aracı değil, kg/cm² çeviricisini kullanın.',
      'Halk arasındaki "atü" sözcüğü, Almanca kökenli bir kısaltmadan gelir ve atmosfer basıncının üzerindeki fazlalığı, yani gösterge basıncını ifade eder. Lastikçilerin "2 atü" dediği değer bugün pratikte 2 bar gösterge basıncı olarak anlaşılır.',
    ] },
    { h: 'Dalış, irtifa ve hava durumu', ul: [
      '<strong>Dalış:</strong> Deniz suyunda her 10 metre derinlik basıncı yaklaşık 1 bar artırır. Yüzeyde 1 atm olan mutlak basınç, 10 metrede yaklaşık 2, 30 metrede yaklaşık 4 atmosfere çıkar. Dalış eğitiminde bar ve atm çoğunlukla eşit kabul edilir; aradaki fark bu yaklaşıklığın içinde kalır.',
      '<strong>Su sütunu:</strong> 1 atm, tatlı suda 10,33 metrelik bir su sütununun tabanındaki basınca eşittir; 1 bar ise 10,20 metreye karşılık gelir. Yüzeyden emiş yapan pompaların suyu en fazla yaklaşık 10 metreden çekebilmesinin kuramsal sınırı buradan gelir.',
      '<strong>İrtifa:</strong> Yükseldikçe hava basıncı düşer. Yüksek rakımlı şehirlerde ve dağlarda açık hava basıncı 1 atm\'nin belirgin biçimde altındadır; bu yüzden su daha düşük sıcaklıkta kaynar.',
      '<strong>Meteoroloji:</strong> Hava haritalarındaki 1.013,25 hPa (ya da milibar) değeri tam olarak 1 atm\'dir. 1 bar ise 1.000 hPa eder.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>0,5 atm</strong> = 0,506625 bar',
      '<strong>1 atm</strong> = 1,01325 bar = 101,325 kPa = 14,696 psi',
      '<strong>2 atm</strong> = 2,0265 bar',
      '<strong>5 atm</strong> = 5,06625 bar',
      '<strong>10 atm</strong> = 10,1325 bar',
      '<strong>1 bar</strong> = 0,98692 atm',
      '<strong>5 bar</strong> = 4,93462 atm',
      '<strong>10 bar</strong> = 9,86923 atm',
      '<strong>100 bar</strong> = 98,6923 atm',
    ] },
    { h: 'Sınırlar', p: [
      'Araç negatif değer kabul etmez; standart atmosfer çoğunlukla mutlak basınç için kullanıldığından sıfırın altı fiziksel olarak anlamlı değildir. Gösterge ve mutlak basınç ayrımı birim çevirisini değiştirmez, ancak iki değeri karşılaştırırken aynı türden olduklarına dikkat edin. Sonuçlar bilgilendirme amaçlıdır; basınçlı kap, tüp ve dalış planlamasıyla ilgili kararlarda ilgili standartlara ve yetkili uzmanlara başvurun.',
    ] },
  ],
  faq: [
    ['1 atm kaç bar eder?', '1 standart atmosfer tam olarak 1,01325 bar eder. Bu, 101.325 pascal ya da 101,325 kilopascala eşittir.'],
    ['1 bar kaç atm eder?', '1 bar yaklaşık 0,98692 atm eder (1 ÷ 1,01325). Yani bar, atmosferden yüzde 1,3 kadar küçüktür.'],
    ['Bar ve atm birbirinin yerine kullanılabilir mi?', 'Kaba tahminlerde ve gündelik konuşmada evet; fark yüzde 1,3 dolayındadır. Kimya ve fizik hesaplarında, kalibrasyon ve mühendislik işlerinde ise doğru birimi kullanmak ya da çevirmek gerekir.'],
    ['atm ile at arasındaki fark nedir?', 'atm standart atmosferdir (101.325 Pa). at ise teknik atmosferdir ve 1 kgf/cm², yani 98.066,5 Pa\'ya eşittir. 1 atm yaklaşık 1,0332 at eder.'],
    ['1 atm kaç mmHg eder?', '1 atm tanım gereği 760 Torr\'dur ve bu, pratikte 760 mmHg ile aynıdır. İki birim arasındaki fark milyonda birin altındadır ve gündelik hesaplarda ihmal edilir.'],
    ['Deniz seviyesinde hava basıncı her zaman 1 atm midir?', 'Hayır. 1 atm ortalama bir referans değerdir. Gerçek hava basıncı, hava sistemlerine göre gün içinde ve günden güne değişir; alçak basınç merkezlerinde daha düşük, yüksek basınç merkezlerinde daha yüksektir.'],
    ['10 metre su derinliği kaç atmosfer basınç yapar?', 'Tatlı suda 10 metrelik su sütunu yaklaşık 0,968 atm (0,981 bar) ek basınç oluşturur. Üzerine yüzeydeki 1 atm eklendiğinde 10 metre derinlikteki mutlak basınç yaklaşık 2 atm olur.'],
    ['Bu sayfada yazdıklarım bir yere gönderiliyor mu?', 'Hayır. Çeviri tarayıcınızın içinde hesaplanır; girdiğiniz değerler sunucuya iletilmez ve kaydedilmez.'],
  ],
  related: ['bar-psi-cevir', 'bar-kpa-cevir', 'pascal-bar-cevir', 'kgcm2-bar-cevir', 'mmhg-kpa-cevir'],
};
