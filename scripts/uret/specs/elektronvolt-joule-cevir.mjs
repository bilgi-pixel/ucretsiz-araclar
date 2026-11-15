export default {
  slug: 'elektronvolt-joule-cevir',
  title: 'Elektronvolt Joule Çevirici',
  h1Tail: 'eV ↔ J',
  pageTitle: 'Elektronvolt Joule Çevirici – eV\'den J\'ye, Joule\'den eV\'ye',
  description: 'Elektronvoltu joule\'e, joule\'ü elektronvolta çevirin. 1 eV = 1,602176634 × 10^-19 J tam değeriyle çalışır; keV, MeV ve GeV girişini ve bilimsel gösterimi destekler.',
  card: 'Elektronvoltu joule\'e, joule\'ü elektronvolta çevirin; keV, MeV, GeV ön ekleri ve bilimsel gösterimle.',
  category: 'birim',
  keywords: ['elektronvolt joule çevirme', '1 ev kaç joule', 'ev joule dönüştürme', 'joule elektronvolt', 'mev joule', 'kev joule çevirme', 'ev to joule', 'elektron volt hesaplama'],
  lead: 'Atom ve parçacık fiziğinde kullanılan elektronvoltu (eV) joule\'e (J) ya da joule\'ü elektronvolta çevirin. Araç, SI\'da tam olarak tanımlı <strong>1 eV = 1,602176634 × 10<sup>-19</sup> J</strong> değerini kullanır.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 13,6 ya da 4,8e-19', hint: 'Çok küçük ya da büyük sayıları 4,8e-19 biçiminde yazabilirsiniz (e-19, "çarpı 10 üzeri -19" demektir).' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['ev', 'Elektronvolt → Joule'], ['j', 'Joule → Elektronvolt']] },
    { id: 'onek', label: 'Elektronvolt ön eki', type: 'select', options: [['1', 'eV'], ['1e3', 'keV (bin eV)'], ['1e6', 'MeV (milyon eV)'], ['1e9', 'GeV (milyar eV)']], hint: 'Yalnızca "Elektronvolt → Joule" yönünde, girdiğiniz değerin birimi olarak kullanılır.' },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const E = 1.602176634e-19; // 1 eV kaç joule (tam)
    const carpan = { '1': 1, '1e3': 1e3, '1e6': 1e6, '1e9': 1e9 }[v.onek] || 1;
    const ev = v.yon === 'j' ? x / E : x * carpan;
    const j = v.yon === 'j' ? x : ev * E;
    const jRow = ['Joule', h.sig(j, 10) + ' J'];
    const evRow = ['Elektronvolt', h.sig(ev, 10) + ' eV'];
    return {
      rows: [
        ...(v.yon === 'j' ? [evRow, jRow] : [jRow, evRow]),
        ['Kiloelektronvolt', h.sig(ev / 1e3, 10) + ' keV'],
        ['Megaelektronvolt', h.sig(ev / 1e6, 10) + ' MeV'],
      ],
      note: '1 eV = 1,602176634 × 10^-19 J (tam değer). Sonuçlar on anlamlı basamağa yuvarlanır; "× 10^n" bilimsel gösterimdir.',
    };
  },
  cases: [
    { in: { deger: '1', yon: 'ev', onek: '1' }, out: { 'Joule': '1,602176634 × 10^-19 J', 'Elektronvolt': '1 eV' } },
    { in: { deger: '1', yon: 'j' }, out: { 'Elektronvolt': '6,241509074 × 10^18 eV', 'Kiloelektronvolt': '6,241509074 × 10^15 keV' } },
    { in: { deger: '13,6', yon: 'ev', onek: '1' }, out: { 'Joule': '2,178960222 × 10^-18 J' } },
    { in: { deger: '1', yon: 'ev', onek: '1e6' }, out: { 'Joule': '1,602176634 × 10^-13 J', 'Elektronvolt': '1.000.000 eV', 'Megaelektronvolt': '1 MeV' } },
    { in: { deger: '511', yon: 'ev', onek: '1e3' }, out: { 'Joule': '8,1871226 × 10^-14 J', 'Megaelektronvolt': '0,511 MeV' } },
    { in: { deger: '1,602176634e-19', yon: 'j' }, out: { 'Elektronvolt': '1 eV', 'Kiloelektronvolt': '0,001 keV' } },
    { in: { deger: '2,254', yon: 'ev', onek: '1' }, out: { 'Joule': '3,611306133 × 10^-19 J' } },
    { in: { deger: '4,8e-19', yon: 'j' }, match: { 'Elektronvolt': '^2,99592435\\d eV$' } },
    { in: { deger: '0', yon: 'ev' }, out: { 'Joule': '0 J' } },
    { in: { deger: '1,6 x 10^-19', yon: 'j' }, error: true },
    { in: { deger: '-13,6', yon: 'ev' }, error: true },
  ],
  howto: [
    '"Değer" alanına enerji miktarını yazın. Joule değerleri çok küçük olacağından 4,8e-19 gibi bilimsel gösterim kullanabilirsiniz.',
    '"Çeviri yönü" listesinden elektronvolttan joule\'e mi, joule\'den elektronvolta mı geçeceğinizi seçin.',
    'Elektronvolt giriyorsanız ve değeriniz keV, MeV ya da GeV cinsindense "Elektronvolt ön eki" listesinden uygun olanı işaretleyin.',
    '"Çevir" düğmesine basın. Sonuçta joule, eV, keV ve MeV karşılıkları birlikte gösterilir.',
    'Sonucu kopyalayıp ödev ya da rapora aktarırken "× 10^-19" gösterimini kendi yazım biçiminize uyarlayın.',
  ],
  sections: [
    { h: 'Elektronvolt nedir?', p: [
      'Elektronvolt, bir elektronun bir voltluk potansiyel farkı boyunca hızlandırıldığında kazandığı kinetik enerjidir. Enerji, yük ile potansiyel farkının çarpımına eşit olduğundan (E = q·V) bir elektronvolt, elektronun yükünün büyüklüğü ile bir voltun çarpımıdır. Adında "volt" geçse de elektronvolt bir gerilim birimi değil, <strong>enerji</strong> birimidir.',
      'Joule gündelik ölçekteki enerjiler için uygundur, ancak tek bir atomun, elektronun ya da fotonun enerjisi joule cinsinden yazıldığında virgülden sonra on sekiz, on dokuz sıfır gerekir. Elektronvolt bu ölçekte sayıları okunabilir kılar: bir kimyasal bağın enerjisi birkaç eV, görünür ışık fotonu 2–3 eV, röntgen fotonları keV, çekirdek tepkimeleri MeV düzeyindedir.',
    ] },
    { h: 'Dönüşüm katsayısı neden tam bir sayı?', p: [
      '2019\'da yürürlüğe giren SI tanımlarıyla temel yük, yani bir protonun ya da elektronun yük büyüklüğü, tam olarak 1,602176634 × 10<sup>-19</sup> coulomb olarak sabitlenmiştir. Elektronvolt bu yükün bir voltla çarpımı olduğundan <strong>1 eV = 1,602176634 × 10<sup>-19</sup> J</strong> eşitliği de ölçüm belirsizliği içermeyen tam bir değerdir.',
      'Formüller: <strong>J = eV × 1,602176634 × 10<sup>-19</sup></strong> ve <strong>eV = J ÷ 1,602176634 × 10<sup>-19</sup></strong>. Ters yönde 1 J yaklaşık 6,241509074 × 10<sup>18</sup> eV eder. Sınav sorularında katsayı çoğunlukla 1,6 × 10<sup>-19</sup> olarak yuvarlanır; sonucunuz araçtakinden binde bir kadar farklı çıkarsa nedeni budur.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Hidrojenin iyonlaşma enerjisi:</strong> Temel haldeki hidrojen atomundan elektronu koparmak için yaklaşık 13,6 eV gerekir. 13,6 × 1,602176634 × 10<sup>-19</sup> = 2,178960222 × 10<sup>-18</sup> J.',
      '<strong>Elektronun durgun kütle enerjisi:</strong> Yaklaşık 511 keV\'dir. Araçta 511 yazıp ön eki keV seçtiğinizde 8,1871226 × 10<sup>-14</sup> J ve 0,511 MeV sonuçlarını görürsünüz.',
      '<strong>Yeşil ışık fotonu:</strong> Dalga boyu 550 nm olan bir fotonun enerjisi yaklaşık 2,254 eV\'dir; bu 3,611306133 × 10<sup>-19</sup> J eder.',
      '<strong>Joule\'den eV\'ye:</strong> 4,8 × 10<sup>-19</sup> J\'lük bir enerji yaklaşık 2,9959 eV\'dir; kabaca 3 eV, yani mor ışık fotonu düzeyinde.',
    ] },
    { h: 'Ön ekler ve tipik enerji ölçekleri', ul: [
      '<strong>meV</strong> (milielektronvolt, 10<sup>-3</sup> eV): oda sıcaklığındaki ısıl enerji yaklaşık 25 meV düzeyindedir.',
      '<strong>eV</strong>: kimyasal bağlar, yarı iletken bant aralıkları, görünür ışık fotonları.',
      '<strong>keV</strong> (10<sup>3</sup> eV): X-ışınları, elektron mikroskobu demetleri.',
      '<strong>MeV</strong> (10<sup>6</sup> eV): çekirdek tepkimeleri, gama ışınları, radyoaktif bozunmalar.',
      '<strong>GeV</strong> (10<sup>9</sup> eV): protonun durgun kütle enerjisi yaklaşık 0,938 GeV\'dir.',
      '<strong>TeV</strong> (10<sup>12</sup> eV): büyük parçacık hızlandırıcılarındaki çarpışma enerjileri.',
    ] },
    { h: 'Bilimsel gösterimle giriş ve sonuç okuma', p: [
      'Joule tarafındaki sayılar çok küçük olduğu için araç bilimsel gösterimi kabul eder. "4,8e-19" yazımı 4,8 × 10<sup>-19</sup> anlamına gelir; "e" harfinden sonraki sayı 10\'un üssüdür. "x 10^-19" ya da "*10^-19" gibi yazımlar tanınmaz; bunun yerine e\'li biçimi kullanın.',
      'Sonuçlar da aynı mantıkla gösterilir: "1,602176634 × 10^-19 J" ifadesinde virgül ondalık ayraçtır, üs ise virgülün on dokuz basamak sola kaydırılacağını söyler. Çok büyük olmayan sayılar düz biçimde ve binlik ayraç olarak noktayla yazılır; örneğin 1.000.000 eV bir milyon elektronvolttur.',
    ] },
    { h: 'Nerelerde kullanılır?', p: [
      'Lise son sınıf ve üniversite fizik derslerinde fotoelektrik olay, Bohr atom modeli, Compton saçılması ve çekirdek fiziği sorularında enerji çoğunlukla eV ile verilir; ancak Planck sabiti ve ışık hızı SI birimleriyle kullanılacaksa enerjinin joule\'e çevrilmesi gerekir. Fotoelektrik denkleminde metalin iş fonksiyonu eV, foton enerjisi ise h·f çarpımından joule olarak çıkar; ikisini çıkarmadan önce aynı birime getirmek şarttır.',
      'Kimyada iyonlaşma enerjileri ve elektron ilgisi atom başına eV ya da mol başına kJ ile verilir. Atom başına 1 eV, mol başına yaklaşık 96,485 kJ\'ye karşılık gelir. Elektronik ve malzeme biliminde yarı iletkenlerin bant aralığı, LED\'lerin yaydığı ışığın rengi ve güneş hücrelerinin soğurduğu foton enerjileri de eV ile ifade edilir.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç negatif değer kabul etmez; bağlanma enerjisi gibi eksi işaretli büyüklüklerde mutlak değeri çevirip işareti kendiniz ekleyin. Sonuçlar on anlamlı basamakla sınırlıdır. Ön ek listesi yalnızca elektronvolttan joule\'e çeviride girdinin birimini belirler; ters yönde sonuç eV, keV ve MeV olarak zaten ayrı satırlarda verilir.',
    ] },
  ],
  faq: [
    ['1 eV kaç joule eder?', '1 elektronvolt tam olarak 1,602176634 × 10^-19 joule\'dür. Hızlı hesaplarda 1,6 × 10^-19 J olarak yuvarlanır.'],
    ['1 joule kaç elektronvolttur?', '1 joule yaklaşık 6,241509074 × 10^18 elektronvolttur. Bu, altı kentilyonu aşan çok büyük bir sayıdır; elektronvoltun ne kadar küçük bir enerji olduğunu gösterir.'],
    ['Elektronvolt bir gerilim birimi mi?', 'Hayır. Adında volt geçmesine rağmen elektronvolt enerji birimidir. Bir elektronun bir voltluk potansiyel farkında kazandığı enerjiyi ifade eder.'],
    ['1 MeV kaç joule eder?', '1 megaelektronvolt 1,602176634 × 10^-13 joule\'dür. Ön ek listesinden MeV seçip 1 yazarak bu sonucu görebilirsiniz.'],
    ['Sonucum kitaptakinden biraz farklı, neden?', 'Kitaplar çoğunlukla 1,6 × 10^-19 ya da 1,602 × 10^-19 yuvarlamasını kullanır. Araç tam değerle hesap yaptığı için üçüncü ya da dördüncü anlamlı basamaktan sonra küçük farklar oluşabilir.'],
    ['Foton enerjisini dalga boyundan eV olarak nasıl bulurum?', 'Yaklaşık olarak enerji (eV) = 1240 ÷ dalga boyu (nm) bağıntısı kullanılır. 620 nm\'lik kırmızı ışık için 1240 ÷ 620 = 2 eV bulunur; bu değeri araçla joule\'e çevirebilirsiniz.'],
    ['eV/c² ne demek?', 'Parçacık fiziğinde kütle, E = mc² bağıntısı üzerinden enerji birimiyle ifade edilir. Elektronun kütlesi 0,511 MeV/c² denildiğinde, durgun kütle enerjisinin 0,511 MeV olduğu anlatılır.'],
    ['Girdiğim değerler bir yere gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız sayılar sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['foton-enerjisi-hesapla', 'bilimsel-gosterim-cevir', 'kalori-joule-cevir', 'kutle-enerji-hesapla', 'kwh-joule-cevir'],
};
