export default {
  slug: 'ohm-kanunu-hesapla',
  title: 'Ohm Kanunu Hesaplama',
  h1Tail: 'V = I × R',
  pageTitle: 'Ohm Kanunu Hesaplama – Gerilim, Akım, Direnç ve Güç Bulma',
  description: 'Gerilim, akım, direnç ve güçten herhangi ikisini yazın; Ohm kanunu ve güç formülleriyle diğer ikisini anında hesaplayın. V = I × R, P = V × I.',
  card: 'Gerilim, akım, direnç ve güçten ikisini yazın; Ohm kanunuyla kalan iki değeri anında bulun.',
  category: 'elektrik',
  keywords: ['ohm kanunu hesaplama', 'ohm kanunu formülü', 'gerilim akım direnç hesaplama', 'V = I x R', 'direnç hesaplama', 'akım hesaplama', 'volt amper ohm'],
  lead: 'Gerilim (V), akım (I), direnç (R) ve güç (P) büyüklüklerinden <strong>bildiğiniz ikisini</strong> yazın; araç Ohm kanununu ve güç bağıntılarını kullanarak diğer ikisini hesaplasın.',
  button: 'Hesapla',
  inputs: [
    { id: 'gerilim', label: 'Gerilim (V, volt)', type: 'number', placeholder: 'Örn. 12' },
    { id: 'akim', label: 'Akım (A, amper)', type: 'number', placeholder: 'Örn. 3', hint: 'Miliamperi ampere çevirin: 20 mA = 0,02 A.' },
    { id: 'direnc', label: 'Direnç (Ω, ohm)', type: 'number', placeholder: 'Örn. 4', hint: 'Kiloohmu ohma çevirin: 4,7 kΩ = 4700 Ω.' },
    { id: 'guc', label: 'Güç (W, watt)', type: 'number', placeholder: 'Boş bırakılabilir', hint: 'Dört alandan tam olarak ikisini doldurun, diğer ikisini boş bırakın.' },
  ],
  compute(v, h) {
    const AD = { gerilim: 'Gerilim', akim: 'Akım', direnc: 'Direnç', guc: 'Güç' };
    const dolu = Object.keys(AD).filter((k) => String(v[k] ?? '').trim() !== '');
    if (dolu.length !== 2) h.err(`Tam olarak iki alan doldurulmalı; şu an ${dolu.length} alan dolu. Bilinen iki değeri yazıp diğerlerini boş bırakın.`);
    const x = {};
    for (const k of dolu) x[k] = h.pos(v[k], AD[k]);
    let V = x.gerilim, I = x.akim, R = x.direnc, P = x.guc;
    const var_ = (a, b) => dolu.includes(a) && dolu.includes(b);
    if (var_('gerilim', 'akim')) { R = V / I; P = V * I; }
    else if (var_('gerilim', 'direnc')) { I = V / R; P = V * V / R; }
    else if (var_('gerilim', 'guc')) { I = P / V; R = V * V / P; }
    else if (var_('akim', 'direnc')) { V = I * R; P = I * I * R; }
    else if (var_('akim', 'guc')) { V = P / I; R = P / (I * I); }
    else { V = Math.sqrt(P * R); I = Math.sqrt(P / R); }
    const hepsi = {
      gerilim: ['Gerilim', h.sig(V, 6) + ' V'],
      akim: ['Akım', h.sig(I, 6) + ' A'],
      direnc: ['Direnç', h.sig(R, 6) + ' Ω'],
      guc: ['Güç', h.sig(P, 6) + ' W'],
    };
    const rows = [];
    for (const k of Object.keys(AD)) if (!dolu.includes(k)) rows.push(hepsi[k]);
    for (const k of dolu) rows.push(hepsi[k]);
    rows.push(['Akım (mA)', h.sig(I * 1000, 6) + ' mA']);
    rows.push(['İletkenlik', h.sig(1 / R, 6) + ' S']);
    return { rows, note: 'Hesap, doğru akım devreleri ve yalnızca dirençten oluşan (omik) yükler için geçerlidir. İlk iki satır hesaplanan, sonraki iki satır girdiğiniz değerlerdir.' };
  },
  cases: [
    { in: { gerilim: '12', direnc: '4' }, out: { 'Akım': '3 A', 'Güç': '36 W', 'Akım (mA)': '3.000 mA' } },
    { in: { gerilim: '220', akim: '10' }, out: { 'Direnç': '22 Ω', 'Güç': '2.200 W' } },
    { in: { akim: '2', direnc: '5' }, out: { 'Gerilim': '10 V', 'Güç': '20 W' } },
    { in: { gerilim: '220', guc: '100' }, out: { 'Akım': '0,454545 A', 'Direnç': '484 Ω' } },
    { in: { akim: '0,5', guc: '60' }, out: { 'Gerilim': '120 V', 'Direnç': '240 Ω' } },
    { in: { direnc: '10', guc: '1000' }, out: { 'Gerilim': '100 V', 'Akım': '10 A' } },
    { in: { gerilim: '5', direnc: '220' }, out: { 'Akım': '0,0227273 A', 'Güç': '0,113636 W', 'Akım (mA)': '22,7273 mA' } },
    { in: { gerilim: '9', direnc: '4700' }, out: { 'Akım (mA)': '1,91489 mA', 'İletkenlik': '0,000212766 S' } },
    { in: { gerilim: '12' }, error: true },
    { in: { gerilim: '12', akim: '3', direnc: '4' }, error: true },
    { in: { gerilim: '12', direnc: '0' }, error: true },
    { in: { gerilim: 'abc', direnc: '4' }, error: true },
  ],
  howto: [
    'Dört büyüklükten elinizde olan ikisini belirleyin: örneğin kaynağın gerilimi ve direncin değeri.',
    'Bu iki değeri ilgili kutulara temel birimlerle yazın: volt, amper, ohm, watt. Miliamper ve kiloohm gibi değerleri önce çevirin.',
    'Diğer iki kutuyu boş bırakın ve "Hesapla" düğmesine basın.',
    'Sonuç kutusunun ilk iki satırı hesaplanan büyüklüklerdir; ardından girdiğiniz değerler, akımın miliamper karşılığı ve iletkenlik gelir.',
    'Farklı bir çift denemek için "Temizle" düğmesiyle alanları boşaltıp yeniden doldurun.',
  ],
  sections: [
    { h: 'Ohm kanunu nedir?', p: [
      'Ohm kanunu, bir iletkenin iki ucu arasındaki gerilim ile içinden geçen akımın doğru orantılı olduğunu söyler. Orantı sabiti iletkenin direncidir: <strong>V = I × R</strong>. Burada V volt cinsinden gerilim, I amper cinsinden akım, R ohm cinsinden dirençtir. Adını, bu ilişkiyi 19. yüzyılda deneylerle ortaya koyan Alman fizikçi Georg Simon Ohm\'dan alır.',
      'Su benzetmesi konuyu kavramayı kolaylaştırır: gerilim borudaki basınç farkına, akım birim zamanda geçen su miktarına, direnç ise borunun darlığına benzer. Basınç artarsa akış artar; boru daralırsa aynı basınçta akış azalır.',
    ] },
    { h: 'Formüller: iki değerden diğer ikisi', p: [
      'Ohm kanunu, elektriksel güç bağıntısı <strong>P = V × I</strong> ile birleştirildiğinde dört büyüklükten herhangi ikisi bilindiğinde diğer ikisi bulunabilir. Aracın kullandığı bağıntılar şunlardır:',
    ], ul: [
      '<strong>V ve I biliniyorsa:</strong> R = V ÷ I, P = V × I',
      '<strong>V ve R biliniyorsa:</strong> I = V ÷ R, P = V² ÷ R',
      '<strong>I ve R biliniyorsa:</strong> V = I × R, P = I² × R',
      '<strong>P ve V biliniyorsa:</strong> I = P ÷ V, R = V² ÷ P',
      '<strong>P ve I biliniyorsa:</strong> V = P ÷ I, R = P ÷ I²',
      '<strong>P ve R biliniyorsa:</strong> V = √(P × R), I = √(P ÷ R)',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 12 voltluk bir aküye 4 ohmluk direnç bağlanıyor. Akım I = 12 ÷ 4 = 3 A, dirençte harcanan güç P = 12² ÷ 4 = 144 ÷ 4 = 36 W olur. Bu güç ısıya dönüşür; direncin en az bu gücü taşıyabilecek tipte seçilmesi gerekir.',
      '<strong>Örnek 2:</strong> 220 volt altında 10 amper çeken bir ısıtıcının direnci R = 220 ÷ 10 = 22 Ω, gücü P = 220 × 10 = 2.200 W\'tır.',
      '<strong>Örnek 3:</strong> 5 voltluk bir mikrodenetleyici çıkışına 220 ohmluk direnç bağlanırsa akım 5 ÷ 220 = 0,0227273 A, yani yaklaşık 22,7 mA olur; dirençte harcanan güç yaklaşık 0,114 W\'tır. Bir LED\'i sürerken ise direncin üzerindeki gerilim, kaynak geriliminden LED\'in ileri gerilimi çıkarılarak bulunur; doğrudan 5 V alınmaz.',
      '<strong>Örnek 4:</strong> Etiketinde 220 V, 100 W yazan akkor bir lambanın çalışma akımı 100 ÷ 220 = 0,454545 A, çalışma sıcaklığındaki direnci 220² ÷ 100 = 484 Ω\'dur.',
    ] },
    { h: 'Birimler ve ön ekler', p: [
      'Elektronikte değerler çoğu zaman ön eklerle verilir. Hesaba girmeden önce temel birime çevirmek hataları önler:',
    ], ul: [
      '1 mA (miliamper) = 0,001 A; 1 µA (mikroamper) = 0,000001 A',
      '1 kΩ (kiloohm) = 1.000 Ω; 1 MΩ (megaohm) = 1.000.000 Ω',
      '1 mV (milivolt) = 0,001 V; 1 kV (kilovolt) = 1.000 V',
      '1 mW (miliwatt) = 0,001 W; 1 kW (kilowatt) = 1.000 W',
    ], },
    { h: 'Ohm kanunu nerede geçerli değildir?', p: [
      'Kanun, direnci gerilim ve akımla değişmeyen <strong>omik</strong> elemanlar için tam olarak geçerlidir: metal film dirençler, ısıtıcı teller (sabit sıcaklıkta), kablolar. Diyot, LED, transistör gibi yarı iletkenlerde akım-gerilim ilişkisi doğrusal değildir; bu elemanlara "direnç" değeri atayıp Ohm kanununu doğrudan uygulamak yanlış sonuç verir.',
      'Akkor lambaların direnci de sıcaklıkla belirgin biçimde değişir; soğukken ölçülen direnç, çalışırken hesaplanan değerden çok daha küçüktür. Alternatif akımda bobin ve kondansatör içeren devrelerde direnç yerine empedans kullanılır ve güç hesabına güç faktörü girer. Bu sayfa doğru akım ve saf dirençli yükler için düzenlenmiştir.',
    ] },
    { h: 'Sık yapılan hatalar ve güvenlik notu', ul: [
      'Miliamperi amper gibi yazmak: 20 mA için 20 değil 0,02 girilmelidir, aksi hâlde sonuç bin kat şaşar.',
      'Seri bağlı elemanlarda toplam gerilimi tek bir direncin gerilimi sanmak. Ohm kanunu her eleman için o elemanın kendi uçları arasındaki gerilimle uygulanır.',
      'Direncin güç değerini göz ardı etmek. Hesaplanan güç direncin anma gücünü aşıyorsa direnç aşırı ısınır; uygulamada pay bırakmak iyi bir alışkanlıktır.',
      'Kaynağın iç direncini ve kablo direncini yok saymak; yüksek akımlarda bunlar ölçülen gerilimi düşürür.',
    ], p: [
      'Sonuçlar bilgilendirme ve eğitim amaçlıdır. Şebeke gerilimi ile yapılan çalışmalar hayati tehlike taşır; tesisat ve cihaz onarımı gibi işler yetkili elektrikçiler tarafından, ilgili yönetmeliklere uygun biçimde yapılmalıdır.',
    ] },
  ],
  faq: [
    ['Ohm kanunu formülü nedir?', 'V = I × R, yani gerilim akım ile direncin çarpımına eşittir. Aynı bağıntı I = V ÷ R ve R = V ÷ I biçimlerinde de yazılır.'],
    ['Akım nasıl hesaplanır?', 'Gerilim dirence bölünür. 12 voltluk kaynağa bağlı 4 ohmluk dirençten 12 ÷ 4 = 3 amper akım geçer. Güç ve gerilim biliniyorsa akım, gücün gerilime bölünmesiyle bulunur.'],
    ['Direnç artarsa akım ne olur?', 'Gerilim sabitken direnç arttıkça akım aynı oranda azalır. Direnç iki katına çıkarsa akım yarıya, dirençte harcanan güç de yarıya iner.'],
    ['Güç formülleri Ohm kanunuyla nasıl ilişkilidir?', 'Temel güç bağıntısı P = V × I\'dir. Ohm kanunu yerine konduğunda P = I² × R ve P = V² ÷ R biçimleri elde edilir; üçü de aynı sonucu verir.'],
    ['Neden yalnızca iki alan doldurmalıyım?', 'Dört büyüklük iki bağımsız denklemle birbirine bağlıdır; ikisi verildiğinde diğer ikisi tek biçimde belirlenir. Üç değer girilirse bunlar birbiriyle çelişebilir, bu yüzden araç tam iki değer ister.'],
    ['Alternatif akımda da kullanabilir miyim?', 'Yük yalnızca dirençten oluşuyorsa (ısıtıcı, akkor lamba gibi) etkin değerlerle evet. Motor, trafo ya da kondansatör içeren devrelerde direnç yerine empedans ve güç faktörü devreye girdiği için bu basit hesap yeterli olmaz.'],
    ['İletkenlik satırı ne anlama geliyor?', 'İletkenlik direncin tersidir (G = 1 ÷ R) ve birimi siemenstir (S). Değer ne kadar büyükse eleman akımı o kadar kolay geçirir.'],
    ['Yazdığım değerler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; girdiğiniz sayılar sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['elektrik-gucu-hesapla', 'seri-direnc-hesapla', 'paralel-direnc-hesapla', 'gerilim-bolucu-hesapla', 'led-direnc-hesapla', 'amper-watt-cevir'],
};
