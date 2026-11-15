export default {
  slug: 'foton-enerjisi-hesapla',
  title: 'Foton Enerjisi Hesaplama',
  h1Tail: 'E = h·f = h·c/λ',
  pageTitle: 'Foton Enerjisi Hesaplama – Dalga Boyu, Frekans ve eV Çevirici',
  description: 'Dalga boyu, frekans ya da enerjiden birini yazın; fotonun enerjisini eV ve joule olarak, dalga boyunu, frekansını ve tayftaki yerini hesaplayın.',
  card: 'Dalga boyundan ya da frekanstan foton enerjisini eV ve joule olarak bulun; ışığın tayftaki bölgesini de görün.',
  category: 'bilim',
  keywords: ['foton enerjisi hesaplama', 'dalga boyu enerji hesaplama', 'nm eV çevirme', 'planck sabiti', 'E = hf', 'frekans enerji hesaplama', 'elektronvolt dalga boyu', 'ışığın enerjisi'],
  lead: 'Işık, foton adı verilen enerji paketleri hâlinde taşınır ve her fotonun enerjisi ışığın frekansıyla belirlenir: <strong>E = h · f = h · c / λ</strong>. Dalga boyu, frekans ya da enerjiden birini yazın; araç diğerlerini ve ışığın elektromanyetik tayftaki yerini bulsun.',
  button: 'Hesapla',
  inputs: [
    { id: 'tur', label: 'Bilinen büyüklük', type: 'select', options: [['nm', 'Dalga boyu (nm)'], ['hz', 'Frekans (Hz)'], ['ev', 'Enerji (eV)']] },
    { id: 'deger', label: 'Değer', type: 'text', placeholder: 'Örn. 500', hint: 'Bilimsel gösterim kullanılabilir: 1e15 = 10¹⁵, 100 MHz = 1e8 Hz' },
  ],
  compute(v, h) {
    const hP = 6.62607015e-34; // J·s
    const c = 299792458; // m/s
    const eV = 1.602176634e-19; // J
    const NA = 6.02214076e23;
    const x = h.pos(v.deger, 'Değer');
    let E;
    if (v.tur === 'hz') E = hP * x;
    else if (v.tur === 'ev') E = x * eV;
    else E = hP * c / (x * 1e-9);
    if (!Number.isFinite(E) || !(E > 0)) h.err('Değer hesaplanamayacak kadar büyük ya da küçük; girdiyi kontrol edin.');
    const f = E / hP;
    const lam = c / f; // metre
    const nm = lam * 1e9;
    const bil = (y) => {
      const a = Math.abs(y);
      if (a >= 1e7 || a < 1e-4) {
        const [m, e] = y.toExponential(5).split('e');
        return String(Number(m)).replace('.', ',') + ' × 10^' + Number(e);
      }
      return h.sig(y, 6);
    };
    let bolge;
    if (nm < 0.01) bolge = 'Gama ışınları';
    else if (nm < 10) bolge = 'X ışınları';
    else if (nm < 380) bolge = 'Morötesi';
    else if (nm < 450) bolge = 'Görünür ışık (mor)';
    else if (nm < 495) bolge = 'Görünür ışık (mavi)';
    else if (nm < 570) bolge = 'Görünür ışık (yeşil)';
    else if (nm < 590) bolge = 'Görünür ışık (sarı)';
    else if (nm < 620) bolge = 'Görünür ışık (turuncu)';
    else if (nm <= 750) bolge = 'Görünür ışık (kırmızı)';
    else if (nm < 1e6) bolge = 'Kızılötesi';
    else if (nm < 1e9) bolge = 'Mikrodalga';
    else bolge = 'Radyo dalgaları';
    return {
      rows: [
        ['Foton enerjisi', bil(E / eV) + ' eV'],
        ['Enerji (joule)', bil(E) + ' J'],
        ['Dalga boyu', bil(nm) + ' nm'],
        ['Dalga boyu (metre)', bil(lam) + ' m'],
        ['Frekans', bil(f) + ' Hz'],
        ['Tayf bölgesi', bolge],
        ['1 mol fotonun enerjisi', bil(E * NA / 1000) + ' kJ/mol'],
        ['Foton momentumu', bil(E / c) + ' kg·m/s'],
      ],
      note: 'h = 6,62607015 × 10⁻³⁴ J·s, c = 299 792 458 m/s, 1 eV = 1,602176634 × 10⁻¹⁹ J. Dalga boyu boşluktaki değerdir; tayf bölgelerinin ve renklerin sınırları yaklaşıktır.',
    };
  },
  cases: [
    { in: { tur: 'nm', deger: '500' }, out: { 'Foton enerjisi': '2,47968 eV', 'Enerji (joule)': '3,97289 × 10^-19 J', 'Frekans': '5,99585 × 10^14 Hz', 'Tayf bölgesi': 'Görünür ışık (yeşil)', '1 mol fotonun enerjisi': '239,253 kJ/mol' } },
    { in: { tur: 'hz', deger: '1e15' }, out: { 'Foton enerjisi': '4,13567 eV', 'Dalga boyu': '299,792 nm', 'Enerji (joule)': '6,62607 × 10^-19 J', 'Tayf bölgesi': 'Morötesi' } },
    { in: { tur: 'ev', deger: '1' }, out: { 'Dalga boyu': '1.239,84 nm', 'Frekans': '2,41799 × 10^14 Hz', 'Tayf bölgesi': 'Kızılötesi' } },
    { in: { tur: 'nm', deger: '0,1' }, out: { 'Foton enerjisi': '12.398,4 eV', 'Tayf bölgesi': 'X ışınları' } },
    { in: { tur: 'nm', deger: '650' }, out: { 'Foton enerjisi': '1,90745 eV', 'Tayf bölgesi': 'Görünür ışık (kırmızı)' } },
    { in: { tur: 'hz', deger: '1e8' }, out: { 'Foton enerjisi': '4,13567 × 10^-7 eV', 'Dalga boyu (metre)': '2,99792 m', 'Tayf bölgesi': 'Radyo dalgaları' } },
    { in: { tur: 'nm', deger: '0' }, error: true },
    { in: { tur: 'hz', deger: 'kırmızı' }, error: true },
  ],
  howto: [
    '"Bilinen büyüklük" listesinden elinizdeki veriyi seçin: nanometre cinsinden dalga boyu, hertz cinsinden frekans ya da elektronvolt cinsinden enerji.',
    'Değeri yazın. Çok büyük ya da küçük sayılar için bilimsel gösterim kullanabilirsiniz; örneğin 6 × 10¹⁴ Hz için 6e14.',
    '"Hesapla" düğmesine basın. Foton enerjisi eV ve joule olarak, dalga boyu nanometre ve metre olarak, frekans hertz olarak listelenir.',
    '"Tayf bölgesi" satırından ışığın radyo dalgası, kızılötesi, görünür ışık, morötesi, X ışını ya da gama ışını olduğunu; görünür bölgedeyse yaklaşık rengini görün.',
  ],
  sections: [
    { h: 'Foton nedir, enerjisi neye bağlıdır?', p: [
      'Max Planck 1900\'de sıcak cisimlerin yaydığı ışımayı açıklarken enerjinin ancak belirli paketler hâlinde alınıp verilebildiğini varsaymak zorunda kaldı. Einstein 1905\'te bu fikri bir adım ileri götürerek ışığın kendisinin de paketlerden oluştuğunu öne sürdü; bu paketlere bugün foton diyoruz. Her fotonun taşıdığı enerji yalnızca ışığın frekansına bağlıdır: <strong>E = h · f</strong>. Buradaki h Planck sabitidir ve değeri 6,62607015 × 10⁻³⁴ J·s\'dir.',
      'Işığın frekansı f ile dalga boyu λ arasında c = λ · f ilişkisi bulunduğundan aynı bağıntı <strong>E = h · c / λ</strong> biçiminde de yazılır. Sonuç açıktır: dalga boyu kısaldıkça foton enerjisi artar. Mavi ışığın fotonu kırmızı ışığınkinden, X ışınının fotonu ise görünür ışığınkinden binlerce kat daha enerjiktir. Işığın parlaklığı ise tek tek fotonların enerjisini değil, saniyede gelen foton sayısını gösterir.',
    ] },
    { h: 'Pratik kısayol: 1240 kuralı', p: [
      'Planck sabiti ile ışık hızının çarpımı, elektronvolt ve nanometre birimleriyle yazıldığında akılda kalıcı bir sayı verir: h · c ≈ 1239,84 eV·nm. Buna göre <strong>E (eV) ≈ 1240 / λ (nm)</strong>. Dalga boyu 620 nm olan turuncu-kırmızı ışığın fotonu yaklaşık 2 eV, 310 nm\'lik morötesi ışığın fotonu yaklaşık 4 eV enerji taşır. Sınavlarda ve laboratuvarda hızlı tahmin için bu kısayol çok kullanışlıdır; araç ise yuvarlama yapmadan tam sabitlerle hesaplar.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Yeşil ışık, 500 nm:</strong> E = h · c / λ = (6,62607 × 10⁻³⁴ × 299 792 458) / (500 × 10⁻⁹) ≈ 3,97289 × 10⁻¹⁹ J. Elektronvolta çevirmek için 1,602176634 × 10⁻¹⁹\'a bölünür: 2,47968 eV. Frekans f = c / λ ≈ 5,99585 × 10¹⁴ Hz\'dir. Bir mol foton için enerji yaklaşık 239,25 kJ eder; bu, birçok kimyasal bağın enerjisiyle aynı mertebededir ve ışığın neden kimyasal tepkime başlatabildiğini gösterir.',
      '<strong>Frekansı 10¹⁵ Hz olan ışık:</strong> E = 6,62607 × 10⁻³⁴ × 10¹⁵ = 6,62607 × 10⁻¹⁹ J = 4,13567 eV. Dalga boyu 299,792 nm çıkar; bu ışık morötesi bölgededir.',
      '<strong>1 eV enerjili foton:</strong> Dalga boyu 1239,84 nm, frekansı 2,418 × 10¹⁴ Hz\'dir ve yakın kızılötesi bölgeye düşer.',
      '<strong>FM radyo, 100 MHz:</strong> Frekans alanına 1e8 yazıldığında foton enerjisi yalnızca 4,14 × 10⁻⁷ eV, dalga boyu yaklaşık 3 metre bulunur. Radyo fotonları tek tek o kadar zayıftır ki radyo dalgalarının tanecikli yapısı gündelik hayatta hiç fark edilmez.',
    ] },
    { h: 'Elektromanyetik tayfın bölgeleri', p: [
      'Aracın "Tayf bölgesi" satırı aşağıdaki yaklaşık sınırları kullanır. Bölgeler arasında keskin çizgiler yoktur; farklı kaynaklar biraz farklı sınırlar verebilir.',
    ], ul: [
      '<strong>Gama ışınları:</strong> 0,01 nm\'den kısa dalga boyları; foton enerjisi yüz bin eV\'un üzerinde',
      '<strong>X ışınları:</strong> 0,01–10 nm',
      '<strong>Morötesi:</strong> 10–380 nm',
      '<strong>Görünür ışık:</strong> 380–750 nm (mordan kırmızıya); yaklaşık 3,26–1,65 eV',
      '<strong>Kızılötesi:</strong> 750 nm – 1 mm',
      '<strong>Mikrodalga:</strong> 1 mm – 1 m',
      '<strong>Radyo dalgaları:</strong> 1 m\'den uzun dalga boyları',
    ] },
    { h: 'Foton enerjisi neden önemlidir?', p: [
      '<strong>Fotoelektrik olay:</strong> Bir metal yüzeyden elektron sökülebilmesi için gelen fotonun enerjisinin metalin iş fonksiyonundan büyük olması gerekir. Enerji yetersizse ışık ne kadar parlak olursa olsun elektron kopmaz; yeterliyse artan enerji elektronun kinetik enerjisi olur: E<sub>k</sub> = h · f − W. Bu aracı kullanarak belirli bir dalga boyunun verilen iş fonksiyonunu aşıp aşmadığını hemen görebilirsiniz.',
      '<strong>Güneş pilleri ve LED\'ler:</strong> Yarı iletkenlerin yasak enerji aralığı eV ile ifade edilir. Bir LED\'in yaydığı ışığın rengi bu aralığa karşılık gelen dalga boyudur; bir güneş hücresi de ancak yasak aralığından daha enerjik fotonları elektriğe çevirebilir.',
      '<strong>Sağlık ve güvenlik:</strong> Morötesi ve daha kısa dalga boylu fotonlar molekül bağlarını koparacak ya da atomları iyonlaştıracak kadar enerjiktir; güneş yanığı ve X ışınlarının dikkatli kullanılması gerekliliği bununla ilgilidir. Görünür ışık, kızılötesi, mikrodalga ve radyo fotonlarının enerjisi iyonlaşma için yeterli değildir. Bu sayfa yalnızca fiziksel büyüklükleri hesaplar; maruz kalma sınırları ya da sağlık etkileri konusunda bir değerlendirme sunmaz.',
    ] },
    { h: 'Varsayımlar', p: [
      'Dalga boyu ile frekans arasındaki dönüşümde ışığın boşluktaki hızı kullanılır. Işık cam ya da su gibi bir ortama girdiğinde hızı ve dalga boyu azalır, ama frekansı ve dolayısıyla foton enerjisi değişmez. Kaynaklarda verilen dalga boyları aksi belirtilmedikçe boşluk ya da hava içindir; havadaki değer boşluktakinden yalnızca on binde üç kadar farklıdır. Renk adları insan gözünün algısına dayanır ve sınırları kişiden kişiye değişebilir.',
    ] },
  ],
  faq: [
    ['Foton enerjisi formülü nedir?', 'E = h · f ya da eşdeğeri E = h · c / λ. h Planck sabiti (6,62607015 × 10⁻³⁴ J·s), f frekans, c ışık hızı, λ dalga boyudur. Sonuç joule çıkar; elektronvolta çevirmek için 1,602176634 × 10⁻¹⁹\'a bölünür.'],
    ['Nanometreyi elektronvolta nasıl çeviririm?', '1239,84 sayısını nanometre cinsinden dalga boyuna bölün. Örneğin 400 nm için 1239,84 / 400 ≈ 3,10 eV bulunur. Araçta dalga boyunu yazmanız yeterlidir.'],
    ['Hangi renk ışığın fotonu daha enerjiktir?', 'Dalga boyu en kısa olanın. Görünür bölgede mor ve mavi fotonlar en enerjik (yaklaşık 3 eV), kırmızı fotonlar en az enerjik (yaklaşık 1,7–2 eV) olanlardır.'],
    ['Işığın şiddeti artınca foton enerjisi artar mı?', 'Hayır. Şiddet arttığında birim zamanda gelen foton sayısı artar; her bir fotonun enerjisi yalnızca frekansa bağlıdır. Fotoelektrik olayda parlak kırmızı ışığın elektron sökememesi, zayıf morötesi ışığın ise sökebilmesi bu yüzdendir.'],
    ['Elektronvolt nedir?', 'Bir elektronun bir voltluk potansiyel farkı altında kazandığı enerjidir: 1 eV = 1,602176634 × 10⁻¹⁹ J. Atom ölçeğindeki enerjiler joule ile çok küçük sayılar verdiği için eV tercih edilir.'],
    ['Frekansı MHz ya da GHz olarak nasıl girerim?', 'Frekans alanı hertz bekler. 1 MHz = 1e6 Hz, 1 GHz = 1e9 Hz olduğundan 2,4 GHz için 2.4e9, 100 MHz için 1e8 yazın.'],
    ['Fotonun momentumu var mıdır?', 'Evet. Kütlesi olmamasına karşın foton p = E / c = h / λ kadar momentum taşır. Sonuçlardaki "Foton momentumu" satırı bu değeri verir; güneş yelkenleri bu küçük itmeyi kullanma fikrine dayanır.'],
    ['Yazdığım değerler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; girdiğiniz hiçbir değer sunucuya gönderilmez ya da saklanmaz.'],
  ],
  related: ['dalga-boyu-frekans-hesapla', 'kutle-enerji-hesapla', 'kinetik-enerji-hesapla', 'bilimsel-gosterim-cevir', 'isik-siddeti-mesafe-hesapla'],
};
