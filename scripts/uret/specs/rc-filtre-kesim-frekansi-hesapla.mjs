export default {
  slug: 'rc-filtre-kesim-frekansi-hesapla',
  title: 'RC Filtre Kesim Frekansı Hesaplama',
  h1Tail: 'alçak ve yüksek geçiren',
  pageTitle: 'RC Filtre Kesim Frekansı Hesaplama – Alçak ve Yüksek Geçiren Filtre',
  description: 'Direnç ve kondansatör değerinden RC filtrenin kesim frekansını (−3 dB noktası) ve zaman sabitini hesaplayın; belirli bir frekanstaki kazancı ve faz kaymasını görün.',
  card: 'Direnç ve kondansatörden RC filtrenin −3 dB kesim frekansını bulun; istediğiniz frekanstaki kazancı dB olarak görün.',
  category: 'elektrik',
  keywords: ['rc filtre hesaplama', 'kesim frekansı hesaplama', 'alçak geçiren filtre hesaplama', 'yüksek geçiren filtre hesaplama', 'rc kesim frekansı formülü', '-3 db frekansı', 'low pass filtre hesabı'],
  lead: 'Bir direnç ve bir kondansatörden oluşan birinci dereceden RC filtrenin <strong>kesim frekansını</strong> hesaplayın. Araç zaman sabitini de verir; bir test frekansı yazarsanız alçak geçiren ve yüksek geçiren bağlantıdaki kazancı desibel olarak ve faz kaymasını gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'direnc', label: 'Direnç (R)', type: 'number', placeholder: 'Örn. 10' },
    { id: 'direncBirim', label: 'Direnç birimi', type: 'select', options: [['1e3', 'kΩ'], ['1', 'Ω'], ['1e6', 'MΩ']] },
    { id: 'kapasite', label: 'Kapasite (C)', type: 'number', placeholder: 'Örn. 100' },
    { id: 'kapBirim', label: 'Kapasite birimi', type: 'select', options: [['1e-9', 'nF'], ['1e-6', 'µF'], ['1e-12', 'pF']] },
    { id: 'frekans', label: 'Test frekansı (Hz)', type: 'number', placeholder: 'İsteğe bağlı', hint: 'Yazarsanız bu frekanstaki kazanç ve faz kayması hesaplanır.' },
  ],
  compute(v, h) {
    const carp = (s, izinli, vars) => (izinli.includes(String(s)) ? Number(s) : vars);
    const R = h.pos(v.direnc, 'Direnç') * carp(v.direncBirim, ['1', '1e3', '1e6'], 1e3);
    const C = h.pos(v.kapasite, 'Kapasite') * carp(v.kapBirim, ['1e-6', '1e-9', '1e-12'], 1e-9);
    const tau = R * C;
    const fc = 1 / (2 * Math.PI * tau);
    const hz = (x) => {
      if (x < 1) return h.sig(x * 1e3, 4) + ' mHz';
      if (x < 1e3) return h.sig(x, 4) + ' Hz';
      if (x < 1e6) return h.sig(x / 1e3, 4) + ' kHz';
      if (x < 1e9) return h.sig(x / 1e6, 4) + ' MHz';
      return h.sig(x / 1e9, 4) + ' GHz';
    };
    const sn = (x) => {
      if (x >= 1) return h.sig(x, 4) + ' s';
      if (x >= 1e-3) return h.sig(x * 1e3, 4) + ' ms';
      if (x >= 1e-6) return h.sig(x * 1e6, 4) + ' µs';
      return h.sig(x * 1e9, 4) + ' ns';
    };
    const rows = [
      ['Kesim frekansı (fc)', hz(fc)],
      ['Zaman sabiti (τ = R·C)', sn(tau)],
      ['Açısal kesim frekansı', h.sig(1 / tau, 5) + ' rad/s'],
    ];
    if (String(v.frekans ?? '').trim() !== '') {
      const f = h.pos(v.frekans, 'Test frekansı');
      const o = f / fc;
      const fazA = -Math.atan(o) * 180 / Math.PI;
      rows.push(['Alçak geçiren kazancı', h.fmt(-10 * Math.log10(1 + o * o), 2) + ' dB']);
      rows.push(['Yüksek geçiren kazancı', h.fmt(-10 * Math.log10(1 + 1 / (o * o)), 2) + ' dB']);
      rows.push(['Alçak geçiren faz kayması', h.fmt(fazA, 2) + '°']);
      rows.push(['Yüksek geçiren faz kayması', h.fmt(90 + fazA, 2) + '°']);
    }
    return { rows, note: 'Kesim frekansında çıkış gerilimi girişin yaklaşık %70,7\'sine (−3 dB) düşer. Hesap, kaynağın iç direncinin sıfır ve yükün çok yüksek empedanslı olduğunu varsayar.' };
  },
  cases: [
    { in: { direnc: '1', direncBirim: '1e3', kapasite: '1', kapBirim: '1e-6' }, out: { 'Kesim frekansı (fc)': '159,2 Hz', 'Zaman sabiti (τ = R·C)': '1 ms', 'Açısal kesim frekansı': '1.000 rad/s' } },
    { in: { direnc: '4,7', direncBirim: '1e3', kapasite: '2,2', kapBirim: '1e-9', frekans: '20000' }, out: { 'Kesim frekansı (fc)': '15,39 kHz', 'Zaman sabiti (τ = R·C)': '10,34 µs', 'Alçak geçiren kazancı': '-4,29 dB', 'Yüksek geçiren kazancı': '-2,02 dB', 'Alçak geçiren faz kayması': '-52,42°', 'Yüksek geçiren faz kayması': '37,58°' } },
    { in: { direnc: '10', direncBirim: '1e3', kapasite: '100', kapBirim: '1e-9' }, out: { 'Kesim frekansı (fc)': '159,2 Hz', 'Zaman sabiti (τ = R·C)': '1 ms' } },
    { in: { direnc: '1,6', direncBirim: '1e3', kapasite: '100', kapBirim: '1e-9' }, out: { 'Kesim frekansı (fc)': '994,7 Hz', 'Zaman sabiti (τ = R·C)': '160 µs' } },
    { in: { direnc: '1', direncBirim: '1e6', kapasite: '1', kapBirim: '1e-12' }, out: { 'Kesim frekansı (fc)': '159,2 kHz', 'Zaman sabiti (τ = R·C)': '1 µs' } },
    { in: { direnc: '8', direncBirim: '1', kapasite: '100', kapBirim: '1e-6' }, out: { 'Kesim frekansı (fc)': '198,9 Hz', 'Zaman sabiti (τ = R·C)': '800 µs' } },
    { in: { direnc: '1', direncBirim: '1e3', kapasite: '1', kapBirim: '1e-6', frekans: '1000' }, out: { 'Alçak geçiren kazancı': '-16,07 dB', 'Yüksek geçiren kazancı': '-0,11 dB', 'Alçak geçiren faz kayması': '-80,96°', 'Yüksek geçiren faz kayması': '9,04°' } },
    { in: { direnc: '1', direncBirim: '1e3', kapasite: '1', kapBirim: '1e-6', frekans: '100' }, out: { 'Alçak geçiren kazancı': '-1,45 dB', 'Yüksek geçiren kazancı': '-5,48 dB', 'Alçak geçiren faz kayması': '-32,14°' } },
    { in: { direnc: '0', direncBirim: '1e3', kapasite: '100', kapBirim: '1e-9' }, error: true },
    { in: { direnc: '10', direncBirim: '1e3', kapasite: '', kapBirim: '1e-9' }, error: true },
    { in: { direnc: '10', direncBirim: '1e3', kapasite: '100', kapBirim: '1e-9', frekans: '-5' }, error: true },
  ],
  howto: [
    'Direnç değerini yazın ve birimini (Ω, kΩ, MΩ) seçin.',
    'Kondansatör değerini yazın ve birimini (pF, nF, µF) seçin. Kondansatörün üzerindeki üç haneli kodu çözmeniz gerekiyorsa önce onu değere çevirin.',
    'Filtrenin belirli bir frekansta işareti ne kadar zayıflattığını görmek istiyorsanız test frekansını hertz olarak girin; istemiyorsanız boş bırakın.',
    '"Hesapla" düğmesine basın. Kesim frekansı ve zaman sabiti uygun birimlerle gösterilir.',
    'İstediğiniz kesim frekansına ulaşana kadar R ya da C değerini standart değerler arasından değiştirerek yeniden hesaplayın.',
  ],
  sections: [
    { h: 'RC filtre nedir?', p: [
      'RC filtre, bir direnç ve bir kondansatörden oluşan en basit frekans seçici devredir. Kondansatörün reaktansı frekansla azaldığı için, direnç ve kondansatör frekansa bağlı bir gerilim bölücü gibi çalışır. Çıkış kondansatörün uçlarından alınırsa devre düşük frekansları geçirip yüksek frekansları zayıflatır; buna <strong>alçak geçiren filtre</strong> denir. Çıkış direncin uçlarından alınırsa tam tersi olur ve devre <strong>yüksek geçiren filtre</strong> olarak çalışır.',
      'Alçak geçiren RC filtreler; sensör işaretlerindeki paraziti yumuşatmak, PWM çıkışını ortalama gerilime çevirmek, mikrodenetleyici analog girişlerinden önce örnekleme gürültüsünü azaltmak ve düğme titreşimini bastırmak için kullanılır. Yüksek geçiren RC filtreler ise ses devrelerinde doğru akım bileşenini ayırmak (kuplaj), tiz hoparlörü korumak ve yavaş kaymaları gidermek için tercih edilir.',
    ] },
    { h: 'Kesim frekansı formülü', p: [
      'Her iki bağlantıda da kesim frekansı aynı formülle bulunur: <strong>f<sub>c</sub> = 1 ÷ (2π · R · C)</strong>. Direnç ohm, kapasite farad alındığında sonuç hertz çıkar. R · C çarpımı devrenin <strong>zaman sabitidir</strong> (τ) ve saniye cinsindendir; dolayısıyla f<sub>c</sub> = 1 ÷ (2πτ) de yazılabilir.',
      'Kesim frekansı, kondansatörün reaktansının direnç değerine eşit olduğu frekanstır. Bu noktada çıkış gerilimi girişin 1 ÷ √2\'si, yani yaklaşık %70,7\'sidir; güç ise yarıya düşer. Desibel karşılığı yaklaşık −3 dB olduğundan bu frekansa "−3 dB noktası" ya da "yarı güç noktası" da denir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 1 kΩ direnç ve 1 µF kondansatör için τ = 1.000 × 0,000001 = 0,001 s = 1 ms. Kesim frekansı f<sub>c</sub> = 1 ÷ (2π × 0,001) ≈ 159,2 Hz\'dir. Aynı sonucu 10 kΩ ile 100 nF de verir, çünkü R · C çarpımı değişmez.',
      '<strong>Örnek 2:</strong> 4,7 kΩ ve 2,2 nF ile τ ≈ 10,34 µs ve f<sub>c</sub> ≈ 15,39 kHz bulunur. Bu filtre alçak geçiren olarak kullanıldığında 20 kHz\'lik bir işareti −4,29 dB zayıflatır ve fazını 52,42° geciktirir.',
      '<strong>Örnek 3:</strong> 1 kΩ ve 1 µF\'lık filtreye 1 kHz uygulanırsa, bu frekans kesim frekansının yaklaşık 6,3 katı olduğundan alçak geçiren çıkışta kazanç −16,07 dB\'ye iner; yüksek geçiren çıkışta ise yalnızca −0,11 dB kayıp olur.',
    ] },
    { h: 'Kazanç ve faz nasıl değişir?', p: [
      'Alçak geçiren bağlantıda kazanç <strong>1 ÷ √(1 + (f ÷ f<sub>c</sub>)²)</strong>, yüksek geçiren bağlantıda <strong>1 ÷ √(1 + (f<sub>c</sub> ÷ f)²)</strong> bağıntısıyla hesaplanır. Araç bu değerleri desibele çevirerek gösterir. Geçirme bandında kazanç 0 dB\'ye yakındır; kesim frekansında −3 dB olur; durdurma bandında ise frekansın her on katında yaklaşık 20 dB (her iki katında yaklaşık 6 dB) düşer. Bu eğim birinci dereceden filtrelerin belirleyici özelliğidir.',
      'Faz kayması alçak geçiren filtrede 0° ile −90° arasında değişir ve kesim frekansında −45°\'dir. Yüksek geçiren filtrede +90°\'den 0°\'ye doğru iner ve kesim frekansında +45° olur.',
    ] },
    { h: 'Eleman seçimi için ipuçları', ul: [
      '<strong>Önce kondansatörü seçin:</strong> Kondansatörler dirençlere göre daha az sayıda standart değerde bulunur; uygun bir C seçip R = 1 ÷ (2π · f<sub>c</sub> · C) ile direnci hesaplayın.',
      '<strong>Direnç aralığı:</strong> İşaret devrelerinde çoğunlukla 1 kΩ ile 100 kΩ arası değerler tercih edilir; çok düşük direnç kaynağı yükler, çok yüksek direnç gürültüye ve kaçak akımlara duyarlı olur.',
      '<strong>Tolerans:</strong> Seramik ve elektrolitik kondansatörlerin toleransı geniş olabilir; kesim frekansı da aynı oranda kayar. Hassas filtrelerde film kondansatör ve %1 direnç kullanın.',
      '<strong>Yük etkisi:</strong> Filtrenin çıkışına bağlanan devrenin giriş direnci R\'ye yakınsa kesim frekansı ve kazanç değişir; gerekirse araya tampon (op-amp izleyici) koyun.',
      '<strong>Daha dik eğim:</strong> 20 dB/dekat yeterli değilse birden fazla kat ya da aktif filtre gerekir; RC katlarını doğrudan art arda bağlamak katların birbirini yüklemesine yol açar.',
    ] },
    { h: 'Zaman sabitiyle ilişkisi', p: [
      'Frekans bölgesindeki kesim frekansı ile zaman bölgesindeki zaman sabiti aynı devrenin iki farklı görünümüdür. Alçak geçiren filtreye basamak biçimli bir gerilim uygulandığında çıkış, bir zaman sabiti sonunda son değerin yaklaşık %63\'üne, beş zaman sabiti sonunda ise %99\'undan fazlasına ulaşır. Kesim frekansını düşürmek paraziti daha iyi bastırır, ancak devrenin hızlı değişimlere tepkisini de yavaşlatır; tasarımda bu ikisi arasında denge kurulur.',
    ] },
    { h: 'Uyarı', p: [
      'Sonuçlar ideal elemanlar için kuramsal değerlerdir ve bilgilendirme amaçlıdır. Kaynak direnci, yük empedansı, eleman toleransları ve kondansatörün parazitik özellikleri gerçek devrede sapmaya yol açar. Şebeke gerilimine bağlı filtre ve parazit giderici devrelerde güvenlik sınıfı uygun elemanlar kullanılmalı, tasarım için bir elektrik-elektronik mühendisine danışılmalıdır.',
    ] },
  ],
  faq: [
    ['RC filtre kesim frekansı formülü nedir?', 'f<sub>c</sub> = 1 ÷ (2π · R · C) formülüyle hesaplanır. Direnç ohm, kapasite farad cinsinden alınır; sonuç hertz çıkar. Aynı formül hem alçak geçiren hem yüksek geçiren RC filtre için geçerlidir.'],
    ['Alçak geçiren ve yüksek geçiren filtrenin farkı nedir?', 'Elemanlar aynıdır, yalnızca çıkışın alındığı yer değişir. Çıkış kondansatörden alınırsa alçak frekanslar geçer, direnç üzerinden alınırsa yüksek frekanslar geçer. Kesim frekansı iki durumda da aynıdır.'],
    ['−3 dB noktası ne anlama gelir?', 'Çıkış gücünün girişin yarısına, çıkış geriliminin ise yaklaşık %70,7\'sine düştüğü frekanstır. Filtrenin geçirme bandı ile durdurma bandı arasındaki sınır olarak kabul edilir.'],
    ['Belirli bir kesim frekansı için direnç nasıl seçilir?', 'Önce elinizdeki bir kondansatör değerini seçin, sonra R = 1 ÷ (2π · f<sub>c</sub> · C) ile direnci hesaplayın. Örneğin 1 kHz ve 100 nF için R ≈ 1.592 Ω çıkar; en yakın standart değer 1,6 kΩ ile kesim frekansı 994,7 Hz olur.'],
    ['Kesim frekansının üzerindeki işaretler tamamen kesilir mi?', 'Hayır. Birinci dereceden RC filtre keskin bir duvar değildir; alçak geçiren filtrede kesim frekansından sonra zayıflama frekansın her on katında yaklaşık 20 dB artar. Kesim frekansının on katında işaret hâlâ yaklaşık onda bir genlikle çıkışa ulaşır.'],
    ['R ve C değerlerini değiştirip aynı kesim frekansını koruyabilir miyim?', 'Evet. Önemli olan R · C çarpımıdır. Direnci on kat büyütüp kondansatörü on kat küçültürseniz kesim frekansı değişmez; ancak devrenin giriş ve çıkış empedansı değişir.'],
    ['Zaman sabiti ile kesim frekansı arasındaki ilişki nedir?', 'Zaman sabiti τ = R · C\'dir ve kesim frekansı f<sub>c</sub> = 1 ÷ (2πτ) ile bulunur. Zaman sabiti büyüdükçe kesim frekansı düşer ve devre daha yavaş tepki verir.'],
    ['Yazdığım değerler bir yere gönderiliyor mu?', 'Hayır. Hesaplama tamamen tarayıcınızda yapılır; değerler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['rc-zaman-sabiti-hesapla', 'kapasitif-reaktans-hesapla', 'lc-rezonans-frekansi-hesapla', 'empedans-hesapla', 'desibel-hesapla', 'opamp-kazanc-hesapla'],
};
