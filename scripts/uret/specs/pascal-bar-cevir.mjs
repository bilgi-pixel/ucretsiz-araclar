export default {
  slug: 'pascal-bar-cevir',
  title: 'Pascal Bar Çevirici',
  h1Tail: 'Pa ↔ bar',
  pageTitle: 'Pascal Bar Çevirici – Pa, hPa, kPa ve MPa\'dan Bar\'a Çevirme',
  description: 'Pascal değerini bara, bar değerini pascala çevirin. 1 bar = 100.000 Pa tanımıyla çalışır; hektopascal (milibar), kilopascal, megapascal ve psi karşılığını da gösterir.',
  card: 'Pascalı bara, barı pascala çevirin; hPa, kPa, MPa ve psi karşılıklarıyla fizik, tesisat ve havalandırma hesapları için.',
  category: 'birim',
  keywords: ['pascal bar çevirme', '1 bar kaç pascal', 'pa bar çevirme', 'mpa bar çevirme', 'hpa bar', 'pascal hesaplama', '1 pascal kaç bar', 'basınç birimi pascal'],
  lead: 'Basıncı pascaldan bara ya da bardan pascala çevirin. Bar, tam olarak <strong>100.000 pascal</strong> olarak tanımlıdır; sonuç hektopascal, kilopascal, megapascal ve psi olarak da gösterilir.',
  button: 'Çevir',
  inputs: [
    { id: 'basinc', label: 'Basınç', type: 'number', placeholder: 'Örn. 101325', hint: 'Binlik ayraç kullanmayın: 100000 yazın, 100.000 değil.' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['pa', 'Pascal (Pa) → Bar'], ['bar', 'Bar → Pascal (Pa)']] },
  ],
  compute(v, h) {
    const x = h.num(v.basinc, 'Basınç');
    const pa = v.yon === 'bar' ? x * 100000 : x;
    const bar = v.yon === 'bar' ? x : x / 100000;
    const f = (n) => h.sig(n, 9);
    return {
      rows: [
        v.yon === 'bar' ? ['Pascal', f(pa) + ' Pa'] : ['Bar', f(bar) + ' bar'],
        v.yon === 'bar' ? ['Bar', f(bar) + ' bar'] : ['Pascal', f(pa) + ' Pa'],
        ['Hektopascal (milibar)', f(pa / 100) + ' hPa'],
        ['Kilopascal', f(pa / 1000) + ' kPa'],
        ['Megapascal', f(pa / 1e6) + ' MPa'],
        ['PSI', h.sig(pa / 6894.757293168361, 7) + ' psi'],
      ],
      note: '1 bar = 100.000 Pa = 1.000 hPa = 100 kPa = 0,1 MPa (tam tanım). Negatif değerler atmosfer altı gösterge basıncı olarak çevrilir.',
    };
  },
  cases: [
    { in: { basinc: '100000', yon: 'pa' }, out: { 'Bar': '1 bar', 'Kilopascal': '100 kPa', 'PSI': '14,50377 psi' } },
    { in: { basinc: '2,5', yon: 'bar' }, out: { 'Pascal': '250.000 Pa', 'Megapascal': '0,25 MPa' } },
    { in: { basinc: '101325', yon: 'pa' }, out: { 'Bar': '1,01325 bar', 'Hektopascal (milibar)': '1.013,25 hPa' } },
    { in: { basinc: '500', yon: 'pa' }, out: { 'Bar': '0,005 bar', 'Hektopascal (milibar)': '5 hPa' } },
    { in: { basinc: '1', yon: 'pa' }, out: { 'Bar': '0,00001 bar' } },
    { in: { basinc: '250', yon: 'bar' }, out: { 'Pascal': '25.000.000 Pa', 'Megapascal': '25 MPa' } },
    { in: { basinc: '-50000', yon: 'pa' }, out: { 'Bar': '-0,5 bar' } },
    { in: { basinc: 'yüz bin', yon: 'pa' }, error: true },
    { in: { basinc: '', yon: 'bar' }, error: true },
  ],
  howto: [
    '"Basınç" alanına değeri yazın. Büyük pascal değerlerinde binlik ayırıcı kullanmayın; ondalık için virgül ya da nokta yazabilirsiniz.',
    '"Çeviri yönü" listesinden "Pascal → Bar" ya da "Bar → Pascal" seçeneğini işaretleyin. Elinizdeki değer kPa ya da MPa ise önce pascala çevirin (kPa için üç, MPa için altı sıfır ekleyin).',
    '"Çevir" düğmesine basın. Sonuç kutusunda bar ve pascal değerlerinin yanında hPa, kPa, MPa ve psi karşılıkları listelenir.',
    'Değerleri raporunuza aktarmak için "Sonucu kopyala" düğmesini kullanın.',
  ],
  sections: [
    { h: 'Pascal nedir?', p: [
      'Pascal (Pa), Uluslararası Birim Sistemi\'nin basınç birimidir ve bir metrekarelik yüzeye dik etki eden bir newtonluk kuvvetin oluşturduğu basınç olarak tanımlanır: 1 Pa = 1 N/m². Adını, akışkanlarda basıncın iletimi üzerine çalışan Fransız bilim insanı Blaise Pascal\'dan alır.',
      'Pascal gündelik ölçekte çok küçük bir birimdir. Masaya yatırılmış bir kâğıt yaprağının yüzeye uyguladığı basınç yaklaşık 1 pascal düzeyindedir; çevremizdeki hava basıncı ise 100.000 pascal dolayındadır. Bu yüzden uygulamada pascalın katları kullanılır: hektopascal (hPa = 100 Pa), kilopascal (kPa = 1.000 Pa) ve megapascal (MPa = 1.000.000 Pa).',
    ] },
    { h: 'Bar ile ilişkisi ve formül', p: [
      'Bar, SI\'nın resmî birimi olmasa da onunla tam uyumludur: <strong>1 bar = 100.000 Pa</strong>. Dönüşümde yuvarlama yoktur, yalnızca ondalık virgül beş basamak kayar.',
      'Pascaldan bara geçmek için değeri 100.000\'e bölersiniz: <strong>bar = Pa ÷ 100.000</strong>. Bardan pascala geçmek için 100.000 ile çarparsınız: <strong>Pa = bar × 100.000</strong>. Katlar için de aynı mantık geçerlidir: 1 bar = 1.000 hPa = 100 kPa = 0,1 MPa. Tersinden, 1 MPa = 10 bar, 1 kPa = 0,01 bar ve 1 hPa = 0,001 bar = 1 milibar eder.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 – Standart atmosfer:</strong> Fizik kitaplarında açık hava basıncı 101.325 Pa olarak verilir. 101.325 ÷ 100.000 = 1,01325 bar. Aynı değer 1.013,25 hPa\'dır; hava durumu haritalarında gördüğünüz sayı budur.',
      '<strong>Örnek 2 – Lastik basıncı:</strong> 2,5 bar, 2,5 × 100.000 = 250.000 Pa eder. Bu, 250 kPa ya da 0,25 MPa olarak da yazılabilir.',
      '<strong>Örnek 3 – Havalandırma:</strong> Bir fanın 500 Pa statik basınç sağladığı belirtiliyor. 500 ÷ 100.000 = 0,005 bar, yani 5 milibardır. Havalandırma kanallarındaki basınçların bar ile ifade edilmemesinin nedeni bu kadar küçük olmalarıdır.',
      '<strong>Örnek 4 – Hidrolik:</strong> 250 bar\'lık bir hidrolik devre 25.000.000 Pa, yani 25 MPa basınçta çalışır.',
    ] },
    { h: 'Hangi alanda hangi kat kullanılır?', ul: [
      '<strong>Pascal (Pa):</strong> Havalandırma ve klima kanalları, temiz oda ve ameliyathane basınç farkları, filtre direnci, akustikte ses basıncı. Bu değerler onlarla ya da yüzlerle ifade edilir.',
      '<strong>Hektopascal (hPa):</strong> Meteoroloji. Eski adıyla milibar ile birebir aynıdır; deniz seviyesinde tipik değerler 1.000 hPa dolayındadır.',
      '<strong>Kilopascal (kPa):</strong> Lastik basınçları (özellikle Uzak Doğu ve Kuzey Amerika kaynaklı araçlarda), zemin mekaniği, tıbbi gaz sistemleri.',
      '<strong>Megapascal (MPa):</strong> Malzeme dayanımı, beton sınıfları, çelik akma gerilmesi, hidrolik sistemler ve yüksek basınçlı boru hatları. Örneğin 25 MPa, 250 bar demektir.',
      '<strong>Bar:</strong> Kompresörler, kombi ve hidrofor manometreleri, lastik saatleri, pnömatik sistemler ve gaz tüpleri.',
    ] },
    { h: 'Su sütunu ve diğer küçük birimlerle karşılaştırma', p: [
      'Havalandırma ve doğal gaz tesisatında basınç bazen milimetre su sütunu (mmSS) ile verilir. 1 mmSS, 9,80665 Pa\'ya eşittir; pratikte 10 Pa kabul edilir. Buna göre 500 Pa yaklaşık 51 mmSS, 1 bar ise yaklaşık 10,2 metre su sütunudur. Konut doğal gaz hatlarında anılan 21 milibar değeri 2.100 Pa\'dır; güncel işletme basınçları için dağıtım şirketinin ve yürürlükteki teknik şartnamelerin verilerine bakın.',
      'Basınç ile gerilme aynı boyuta sahiptir; ikisi de birim alana düşen kuvvettir. Bu yüzden malzemelerin çekme ve basma dayanımları da pascalın katlarıyla, çoğunlukla MPa ile yazılır. 1 MPa aynı zamanda 1 N/mm²\'dir; teknik çizimlerde bu iki yazım birbirinin yerine kullanılır.',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'En yaygın hata, sıfır sayısının yanlış kaydırılmasıdır. kPa ile bar arasında iki, Pa ile bar arasında beş, MPa ile bar arasında bir basamak fark vardır. 2,5 bar\'ı 25.000 Pa ya da 2.500.000 Pa yazmak sonucu on kat saptırır. Emin olamadığınızda atmosfer basıncını hatırlayın: yaklaşık 1 bar = 100 kPa = 100.000 Pa.',
      'İkinci hata önek harflerinin karıştırılmasıdır. Küçük "m" mili (binde bir), büyük "M" mega (bir milyon) demektir; mPa ile MPa arasında milyar kat fark bulunur. Benzer biçimde "mbar" milibardır, "Mbar" değil.',
      'Üçüncü nokta girişle ilgilidir: bu araçta tek noktalı sayılar ondalık kabul edilir. 100.000 yazarsanız yüz olarak okunur; yüz bin için 100000 yazın. Sonuçlar bilgilendirme amaçlıdır; basınçlı sistem tasarımı ve dayanım hesapları için ilgili standartlara ve mühendislik denetimine başvurun.',
    ] },
  ],
  faq: [
    ['1 bar kaç pascal eder?', '1 bar tam olarak 100.000 pascal eder. Bu aynı zamanda 1.000 hektopascal, 100 kilopascal ve 0,1 megapascaldır.'],
    ['1 pascal kaç bar eder?', '1 pascal 0,00001 bar eder, yani barın yüz binde biridir. Bu kadar küçük olduğu için pratikte kPa ya da MPa gibi katlar tercih edilir.'],
    ['1 MPa kaç bar eder?', '1 megapascal 10 bar eder. Dolayısıyla 16 MPa 160 bar, 0,6 MPa ise 6 bardır. Hidrolik ve malzeme dayanımı tablolarında bu çeviri sık gerekir.'],
    ['Hektopascal ile milibar aynı mı?', 'Evet. 1 hPa = 100 Pa = 1 mbar. Meteorolojide milibardan hektopascala geçilirken sayıların değişmemesi için bu kat seçilmiştir.'],
    ['Atmosfer basıncı kaç pascaldır?', 'Standart atmosfer basıncı 101.325 Pa olarak tanımlanır; bu 1,01325 bar ya da 1.013,25 hPa eder. Gerçek hava basıncı hava koşullarına ve rakıma göre bu değerin altında ya da üstünde olabilir.'],
    ['kPa değerini bu araçla nasıl çeviririm?', 'kPa değerini 1.000 ile çarpıp pascal olarak girin ya da doğrudan 100\'e bölerek bar değerini bulun. Örneğin 220 kPa, 220.000 Pa ve 2,2 bar eder. Sonuçtaki "Kilopascal" satırı da sağlama yapmanıza yardımcı olur.'],
    ['N/m² ile pascal arasındaki fark nedir?', 'Fark yoktur; pascal, newton bölü metrekarenin özel adıdır. 1 N/mm² ise 1 MPa\'ya, yani 10 bara eşittir.'],
    ['Girdiğim değerler saklanıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır, yazdıklarınız sunucuya gönderilmez ve kaydedilmez. Sayfa bir kez yüklendikten sonra çevrimdışı da çalışır.'],
  ],
  related: ['bar-kpa-cevir', 'bar-psi-cevir', 'bar-atm-cevir', 'psi-kpa-cevir', 'kgcm2-bar-cevir'],
};
